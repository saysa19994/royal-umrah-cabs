import { NextRequest, NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/server-auth';
import { getAllMediaItemsAdmin, upsertMediaItemAdmin, getFleetImagesCached } from '@/lib/media-service';
import { getClientIp } from '@/lib/rate-limit';
import { createServiceClient } from '@/lib/supabase/service';
import fs from 'fs';
import path from 'path';

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

export async function DELETE(req: NextRequest) {
  try {
    const authResult = await requireRole(req, ['owner', 'admin', 'content_editor']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const url = searchParams.get('url');

    if (!id && !url) {
      return NextResponse.json({ success: false, error: 'Media ID or URL required' }, { status: 400 });
    }

    // If file is in uploads, delete from disk
    if (url && url.startsWith('/assets/images/uploads/')) {
      const filePath = path.join(process.cwd(), 'public', url.replace(/^\//, '').replace(/\//g, path.sep));
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (e) {
          console.warn('Failed unlinking file:', e);
        }
      }
    }

    // Delete from Supabase media_library if exists
    try {
      const supabase = createServiceClient();
      if (id) {
        await supabase.from('media_library').delete().eq('id', id);
      }
    } catch {}

    return NextResponse.json({ success: true, deleted: true });
  } catch (err: any) {
    console.error('Media DELETE error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error deleting media' }, { status: 500 });
  }
}
