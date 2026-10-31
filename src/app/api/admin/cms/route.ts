import { NextRequest, NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/server-auth';
import { getAllCmsPagesAdmin, getCmsPageCached, upsertCmsPageAdmin } from '@/lib/cms-service';
import { getClientIp } from '@/lib/rate-limit';
import { Locale } from '@/i18n/config';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const authResult = await requireRole(req, ['owner', 'admin', 'content_editor', 'translator']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { searchParams } = new URL(req.url);
    const pageKey = searchParams.get('pageKey');
    const locale = searchParams.get('locale') as Locale | null;

    if (pageKey && locale) {
      const page = await getCmsPageCached(pageKey, locale);
      return NextResponse.json({ success: true, page });
    }

    const pages = await getAllCmsPagesAdmin();
    return NextResponse.json({ success: true, pages });
  } catch (err: any) {
    console.error('CMS GET error:', err);
    return NextResponse.json({ success: false, error: 'Failed to retrieve CMS content' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authResult = await requireRole(req, ['owner', 'admin', 'content_editor']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }
    const { user: currentUser } = authResult;
    const clientIp = getClientIp(req);

    const body = await req.json();
    const result = await upsertCmsPageAdmin(body, currentUser.email, currentUser.role, clientIp);

    if (!result.success) {
      const is503 = result.error?.includes('persistence unavailable');
      return NextResponse.json({ success: false, error: result.error }, { status: is503 ? 503 : 400 });
    }

    return NextResponse.json({ success: true, record: result.record });
  } catch (err: any) {
    console.error('CMS POST error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error saving CMS page' }, { status: 500 });
  }
}
