import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';
import { requireRole } from '@/lib/auth/server-auth';
import { createServiceClient } from '@/lib/supabase/service';
import { getClientIp } from '@/lib/rate-limit';
import { logAuditEvent } from '@/lib/audit';
import { SITE_IMAGE_SLOTS, getSiteImagesCached, SiteImageKey } from '@/lib/site-images';

export const dynamic = 'force-dynamic';

function acceptableImageUrl(value: string) {
  if (value.startsWith('/assets/') && !value.includes('..') && !value.includes('?') && !value.includes('#')) return true;
  try {
    const u = new URL(value);
    const supabaseHost = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL || '').host;
    return u.protocol === 'https:' && u.host === supabaseHost &&
      u.pathname.startsWith('/storage/v1/object/public/media/') && !u.username && !u.password;
  } catch { return false; }
}

export async function GET(request: NextRequest) {
  const auth = await requireRole(request, ['owner', 'admin', 'content_editor']);
  if (auth.errorResponse) return auth.errorResponse;
  const assets = await getSiteImagesCached();
  return NextResponse.json({ slots: SITE_IMAGE_SLOTS, assets }, { headers: { 'Cache-Control': 'private, no-store' } });
}

export async function PATCH(request: NextRequest) {
  const auth = await requireRole(request, ['owner', 'admin', 'content_editor']);
  if (auth.errorResponse) return auth.errorResponse;
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== 'object' ||
    !Object.hasOwn(SITE_IMAGE_SLOTS, body.key) ||
    typeof body.url !== 'string' || body.url.length > 2048 || !acceptableImageUrl(body.url)) {
    return NextResponse.json({ error: 'Select a supported image slot and upload a trusted media URL' }, { status: 400 });
  }

  const key = body.key as SiteImageKey;
  const db = createServiceClient();
  const { data: current, error: readError } = await db.from('page_content')
    .select('content_blocks').eq('page_key', 'site_images').eq('language', 'all').maybeSingle();
  if (readError) return NextResponse.json({ error: 'Unable to read current image settings' }, { status: 503 });
  const previous = current?.content_blocks && typeof current.content_blocks === 'object' && !Array.isArray(current.content_blocks)
    ? current.content_blocks as Record<string, unknown> : {};
  const next = { ...previous, [key]: body.url };
  const { error } = await db.from('page_content').upsert({
    page_key: 'site_images', language: 'all',
    content_blocks: next, updated_at: new Date().toISOString(),
  }, { onConflict: 'page_key,language' });
  if (error) return NextResponse.json({ error: 'Failed to save the image setting' }, { status: 503 });
  await logAuditEvent({
    userEmail: auth.user.email, userRole: auth.user.role, action: 'site_image_updated',
    resource: 'site_images', resourceId: key,
    oldValues: { url: previous[key] || SITE_IMAGE_SLOTS[key].fallback },
    newValues: { url: body.url }, ip: getClientIp(request),
  });
  revalidateTag('site_media');
  revalidateTag('site_cms');
  if (key.startsWith('about_')) revalidatePath('/[locale]/about','page');
  else if (key.startsWith('booking_')) revalidatePath('/[locale]/booking','page');
  else if (key.startsWith('services_')) revalidatePath('/[locale]/services','page');
  else revalidatePath('/[locale]', 'page');
  return NextResponse.json({ success: true, key, url: body.url }, { headers: { 'Cache-Control': 'private, no-store' } });
}
