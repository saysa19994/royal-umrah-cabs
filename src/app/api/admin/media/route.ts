import { NextRequest, NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/server-auth';
import { getAllMediaItemsAdmin, upsertMediaItemAdmin, getFleetImagesCached } from '@/lib/media-service';
import { getClientIp } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const authResult = await requireRole(req, ['owner', 'admin', 'content_editor']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') || undefined;
    const type = searchParams.get('type');

    if (type === 'fleet') {
      const vehicleId = searchParams.get('vehicleId') || undefined;
      const images = await getFleetImagesCached(vehicleId);
      return NextResponse.json({ success: true, images });
    }

    const items = await getAllMediaItemsAdmin(category);
    return NextResponse.json({ success: true, items });
  } catch (err: any) {
    console.error('Media GET error:', err);
    return NextResponse.json({ success: false, error: 'Failed to retrieve media items' }, { status: 500 });
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
    const result = await upsertMediaItemAdmin(body, currentUser.email, currentUser.role, clientIp);

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, item: result.item });
  } catch (err: any) {
    console.error('Media POST error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error saving media item' }, { status: 500 });
  }
}
