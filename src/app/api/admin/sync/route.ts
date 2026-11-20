import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { requireRole } from '@/lib/auth/server-auth';
import { logAuditEvent } from '@/lib/audit';
import { createServiceClient } from '@/lib/supabase/service';

export const dynamic = 'force-dynamic';

const KNOWN_CACHE_TAGS = [
  'site_prices',
  'site_faqs',
  'site_fleet',
  'site_settings',
  'site_cms',
  'site_media',
  'site_reviews',
];

/**
 * Health & Cache Tag Status Inspection
 */
export async function GET(req: NextRequest) {
  try {
    const authResult = await requireRole(req, ['owner', 'admin']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const supabase = createServiceClient();
    const [settingsRes, faqsRes, pricesRes] = await Promise.all([
      supabase.from('site_settings').select('id, updated_at').limit(1).maybeSingle(),
      // The live schema stores FAQ items in page_content, not a faqs table.
      supabase.from('page_content').select('page_key', { count: 'exact', head: true }).like('page_key','faq_item_%'),
      supabase.from('prices').select('id', { count: 'exact', head: true }),
    ]);

    if(settingsRes.error || faqsRes.error || pricesRes.error ||
       faqsRes.count === null || pricesRes.count === null){
      console.error('Admin sync health error:',settingsRes.error?.message || faqsRes.error?.message || pricesRes.error?.message);
      return NextResponse.json({success:false,status:'degraded',
        error:'Unable to verify live cache and database health'}, {status:503});
    }
    return NextResponse.json({
      success: true,
      status: 'operational',
      engine: 'Next.js App Router ISR + PostgreSQL Single Source of Truth',
      tags: KNOWN_CACHE_TAGS,
      database: {
        connected: !settingsRes.error,
        faqsCount: faqsRes.count ?? 0,
        pricesCount: pricesRes.count ?? 0,
        settingsLastUpdated: settingsRes.data?.updated_at || null,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('Cache sync GET error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * Trigger On-Demand Immediate Cache Tag Invalidation
 */
export async function POST(req: NextRequest) {
  try {
    const authResult = await requireRole(req, ['owner', 'admin']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }
    const { user: currentUser } = authResult;
    if(process.env.VERCEL_ENV==='preview') {
      let host='';
      try{host=new URL(process.env.NEXT_PUBLIC_SUPABASE_URL || '').hostname;}catch{}
      const isolated=process.env.PREVIEW_DATABASE_ISOLATED==='true' &&
        host.endsWith('.supabase.co') &&
        host!=='skyhpzdeapmttgmvcoeh.supabase.co';
      if(!isolated) {
        return NextResponse.json({success:false,code:'PREVIEW_DATABASE_ISOLATION_REQUIRED',
          error:'Preview cache administration is locked until a separate staging database is configured.'},
          {status:423});
      }
    }

    const body = await req.json().catch(() => ({}));
    const requestedTags = Array.isArray(body?.tags) && body.tags.length > 0
      ? body.tags.filter((t: string) => KNOWN_CACHE_TAGS.includes(t))
      : KNOWN_CACHE_TAGS;

    const revalidated: string[] = [];
    for (const tag of requestedTags) {
      try {
        revalidateTag(tag);
        revalidated.push(tag);
      } catch (e) {
        console.warn(`Tag revalidation warning for ${tag}:`, e);
      }
    }

    await logAuditEvent({
      userEmail: currentUser.email,
      userRole: currentUser.role,
      action: 'CACHE_TAGS_PURGED',
      resource: 'system_cache',
      newValues: {
        revalidatedTags: revalidated,
      },
      ip: req.headers.get('x-forwarded-for') || 'unknown',
    });

    return NextResponse.json({
      success: true,
      message: 'Cache tags purged and revalidated across all 10 locales within seconds',
      revalidatedTags: revalidated,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('Cache sync POST error:', err);
    return NextResponse.json({ success: false, error: 'Failed to purge cache tags' }, { status: 500 });
  }
}
