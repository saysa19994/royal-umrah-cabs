import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';
import { requireRole } from '@/lib/auth/server-auth';
import { createServiceClient } from '@/lib/supabase/service';
import { getClientIp } from '@/lib/rate-limit';
import { logAuditEvent } from '@/lib/audit';
import { SITE_IMAGE_SLOTS, defaultSiteImages, SiteImageKey } from '@/lib/site-images';

export const dynamic = 'force-dynamic';

const noStore = { 'Cache-Control': 'private, no-store' };
const recordKey = 'site_images';
const recordLanguage = 'all';

function acceptableImageUrl(value: string) {
  if (value.startsWith('/assets/') && !value.includes('..') && !value.includes('?') && !value.includes('#')) return true;
  try {
    const u = new URL(value);
    const supabaseHost = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL || '').host;
    return u.protocol === 'https:' && u.host === supabaseHost &&
      u.pathname.startsWith('/storage/v1/object/public/media/') && !u.username && !u.password;
  } catch { return false; }
}

function readOverrides(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown> : {};
}

function liveUrl(key: SiteImageKey, data: Record<string, unknown>): string {
  const url = data[key];
  return typeof url === 'string' && url ? url : SITE_IMAGE_SLOTS[key].fallback;
}

function revalidateImagePage(key: SiteImageKey) {
  revalidateTag('site_media');
  revalidateTag('site_cms');
  if (key.startsWith('about_')) revalidatePath('/[locale]/about', 'page');
  else if (key.startsWith('booking_')) revalidatePath('/[locale]/booking', 'page');
  else if (key === 'faq_visual') revalidatePath('/[locale]/faq', 'page');
  else if (key.startsWith('services_')) revalidatePath('/[locale]/services', 'page');
  else if (key.startsWith('route_')) revalidatePath('/[locale]/routes/[slug]', 'page');
  else revalidatePath('/[locale]', 'page');
}

export async function GET(request: NextRequest) {
  const auth = await requireRole(request, ['owner', 'admin', 'content_editor']);
  if (auth.errorResponse) return auth.errorResponse;
  try {
    // Admin must always see the last committed image state, not a public cache.
    const { data, error } = await createServiceClient().from('page_content')
      .select('content_blocks')
      .eq('page_key', recordKey).eq('language', recordLanguage).maybeSingle();
    if (error) throw new Error(error.message);
    const overrides = readOverrides(data?.content_blocks);
    const assets = Object.fromEntries(Object.keys(SITE_IMAGE_SLOTS).map(key => [
      key, liveUrl(key as SiteImageKey, overrides),
    ]));
    return NextResponse.json({ slots: SITE_IMAGE_SLOTS, assets }, { headers: noStore });
  } catch (err) {
    console.error('Unable to read saved site images:', err);
    return NextResponse.json({ error: 'Saved image settings could not be loaded. Editing is disabled.' },
      { status: 503, headers: noStore });
  }
}

export async function PATCH(request: NextRequest) {
  const auth = await requireRole(request, ['owner', 'admin', 'content_editor']);
  if (auth.errorResponse) return auth.errorResponse;
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== 'object' || Array.isArray(body) ||
    !Object.hasOwn(SITE_IMAGE_SLOTS, body.key) ||
    typeof body.url !== 'string' || body.url.length > 2048 || !acceptableImageUrl(body.url) ||
    typeof body.expected_url !== 'string' || body.expected_url.length > 2048) {
    return NextResponse.json({ error: 'Select a supported image slot, trusted URL and known previous image before saving.' },
      { status: 400, headers: noStore });
  }
  const key = body.key as SiteImageKey;
  const db = createServiceClient();

  try {
    // A single page_content JSONB row stores all image slots. Its updated_at
    // timestamp is our compare-and-swap version, protecting other slots against
    // simultaneous edits. An old editor may not overwrite a newly changed slot.
    for (let attempt = 0; attempt < 4; attempt += 1) {
      const { data: current, error: readError } = await db.from('page_content')
        .select('content_blocks,updated_at')
        .eq('page_key', recordKey).eq('language', recordLanguage).maybeSingle();
      if (readError) throw new Error(readError.message);
      const previous = readOverrides(current?.content_blocks);
      const actualUrl = liveUrl(key, previous);
      if (actualUrl !== body.expected_url && actualUrl !== body.url) {
        return NextResponse.json({
          error: 'This image was updated by another editor. Refresh the image registry before saving.',
        }, { status: 409, headers: noStore });
      }
      if (actualUrl === body.url) {
        return NextResponse.json({ success: true, key, url: body.url, unchanged: true },
          { headers: noStore });
      }

      const next = { ...previous, [key]: body.url };
      const updated_at = new Date().toISOString();
      if (!current) {
        // page_content has NOT NULL SEO columns with no database defaults.
        // They must be supplied on the first-ever site_images INSERT.
        const { error } = await db.from('page_content').insert({
          page_key: recordKey, language: recordLanguage,
          seo_title: '', seo_description: '', h1: '',
          content_blocks: next, updated_at,
        });
        if (error) {
          if (error.code === '23505') continue; // Concurrent first insert: reload then CAS
          throw new Error(error.message);
        }
      } else {
        const { data: saved, error } = await db.from('page_content')
          .update({ content_blocks: next, updated_at })
          .eq('page_key', recordKey).eq('language', recordLanguage)
          .eq('updated_at', current.updated_at)
          .select('updated_at').maybeSingle();
        if (error) throw new Error(error.message);
        if (!saved) continue; // Another slot changed between read and write
      }

      try {
        await logAuditEvent({
          userEmail: auth.user.email, userRole: auth.user.role, action: 'site_image_updated',
          resource: 'site_images', resourceId: key,
          oldValues: { url: actualUrl }, newValues: { url: body.url },
          ip: getClientIp(request),
        });
      } catch (err) {
        console.error('Image saved but audit log failed:', err);
      }
      revalidateImagePage(key);
      return NextResponse.json({ success: true, key, url: body.url }, { headers: noStore });
    }
    return NextResponse.json({
      error: 'Other image changes were saved concurrently. Please refresh and retry.',
    }, { status: 409, headers: noStore });
  } catch (err) {
    console.error('Site image persistence failed:', err);
    return NextResponse.json({ error: 'Failed to persist image setting. No change was confirmed.' },
      { status: 503, headers: noStore });
  }
}
