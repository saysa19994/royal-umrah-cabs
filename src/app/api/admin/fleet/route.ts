import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { requireRole } from '@/lib/auth/server-auth';
import { createServiceClient } from '@/lib/supabase/service';
import { logAuditEvent } from '@/lib/audit';
import { getClientIp } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const authResult = await requireRole(request, ['owner', 'admin', 'operator', 'content_editor']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const serviceClient = createServiceClient();
    const { data, error } = await serviceClient
      .from('vehicles')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Fleet DB error:', error);
      return NextResponse.json({ error: 'Failed to retrieve fleet from database' }, { status: 500 });
    }

    return NextResponse.json({ fleet: data || [] });
  } catch (err: any) {
    console.error('Fleet GET error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);
    const authResult = await requireRole(request, ['owner', 'admin', 'content_editor']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { user: currentUser } = authResult;
    const body = await request.json();
    const { id, is_active, seats, bags, name, category, display_order, photos, translations } = body;

    if (!id) {
      return NextResponse.json({ error: 'Vehicle ID required' }, { status: 400 });
    }

    const serviceClient = createServiceClient();
    const updates: Record<string, any> = { updated_at: new Date().toISOString() };
    if (is_active !== undefined) updates.is_active = is_active;
    if (seats !== undefined) updates.seats = Number(seats);
    if (bags !== undefined) updates.bags = Number(bags);
    if (name !== undefined) updates.name = name;
    if (category !== undefined) updates.category = category;
    if (display_order !== undefined) updates.display_order = Number(display_order);
    if (photos !== undefined) updates.photos = photos;
    if (translations !== undefined) updates.translations = translations;

    const { data, error } = await serviceClient
      .from('vehicles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      console.error('Fleet update DB error:', error);
      return NextResponse.json({ error: 'Failed to update vehicle in database' }, { status: 500 });
    }

    await logAuditEvent({
      userEmail: currentUser.email,
      userRole: currentUser.role,
      action: 'vehicle_updated',
      resource: 'fleet',
      resourceId: id,
      newValues: updates,
      ip: clientIp,
    });

    revalidateTag('site_fleet');
    revalidatePath('/', 'layout');

    return NextResponse.json({ success: true, vehicle: data });
  } catch (err: any) {
    console.error('Fleet PATCH error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
