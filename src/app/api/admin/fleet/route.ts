import { NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/server-auth';
import { createServiceClient } from '@/lib/supabase/service';
import { logAuditEvent } from '@/lib/audit';
import { getClientIp } from '@/lib/rate-limit';

export async function GET(request: Request) {
  try {
    const authResult = await requireRole(request, ['owner', 'admin']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const serviceClient = createServiceClient();
    const { data, error } = await serviceClient
      .from('vehicles')
      .select('*')
      .order('display_order');

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

export async function PATCH(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const authResult = await requireRole(request, ['owner', 'admin']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { user: currentUser } = authResult;
    const { id, is_active, seats, bags } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Vehicle ID required' }, { status: 400 });
    }

    const serviceClient = createServiceClient();
    const updates: any = { updated_at: new Date().toISOString() };
    if (is_active !== undefined) updates.is_active = is_active;
    if (seats !== undefined) updates.seats = seats;
    if (bags !== undefined) updates.bags = bags;

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

    return NextResponse.json({ success: true, vehicle: data });
  } catch (err: any) {
    console.error('Fleet PATCH error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
