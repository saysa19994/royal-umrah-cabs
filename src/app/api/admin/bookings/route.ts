import { NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/server-auth';
import { createServiceClient } from '@/lib/supabase/service';
import { logAuditEvent } from '@/lib/audit';
import { getClientIp } from '@/lib/rate-limit';

export async function GET(request: Request) {
  try {
    // 1. Require staff session (owner, admin, operator)
    const authResult = await requireRole(request, ['owner', 'admin', 'operator']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { user: currentUser } = authResult;
    const { searchParams } = new URL(request.url);
    const statusFilter = searchParams.get('status');

    const serviceClient = createServiceClient();
    let query = serviceClient
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (statusFilter && statusFilter !== 'all') {
      query = query.eq('status', statusFilter);
    }

    // Server-side Operator Scoping:
    // If the caller is an operator, strictly restrict queries to their assigned WhatsApp number
    if (currentUser.role === 'operator') {
      if (!currentUser.assigned_whatsapp_number) {
        return NextResponse.json({ bookings: [] });
      }
      query = query.eq('driver_phone', currentUser.assigned_whatsapp_number);
    }

    const { data, error } = await query;
    if (error) {
      console.error('Failed to query bookings from database:', error);
      return NextResponse.json(
        { error: 'Failed to retrieve bookings from database' },
        { status: 500 }
      );
    }

    return NextResponse.json({ bookings: data || [] });
  } catch (err: any) {
    console.error('Admin bookings GET error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const clientIp = getClientIp(request);
    // 1. Require staff session (owner, admin, operator)
    const authResult = await requireRole(request, ['owner', 'admin', 'operator']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { user: currentUser } = authResult;
    const body = await request.json();
    const { id, reference, status, driver_name, driver_phone, vehicle_plate } = body;

    if (!id && !reference) {
      return NextResponse.json(
        { error: 'Booking id or reference is required' },
        { status: 400 }
      );
    }

    const serviceClient = createServiceClient();

    // If operator, verify that the booking belongs to their assigned WhatsApp scope
    if (currentUser.role === 'operator') {
      let checkQuery = serviceClient.from('bookings').select('id, driver_phone');
      if (id) checkQuery = checkQuery.eq('id', id);
      else if (reference) checkQuery = checkQuery.eq('reference', reference);

      const { data: existingBooking, error: checkError } = await checkQuery.maybeSingle();
      if (checkError || !existingBooking) {
        return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
      }

      if (existingBooking.driver_phone !== currentUser.assigned_whatsapp_number) {
        return NextResponse.json(
          { error: 'Forbidden: You cannot modify bookings outside your assigned scope' },
          { status: 403 }
        );
      }
    }

    const updateData: any = {};
    if (status) updateData.status = status;
    if (driver_name !== undefined) updateData.driver_name = driver_name;
    if (driver_phone !== undefined) updateData.driver_phone = driver_phone;
    if (vehicle_plate !== undefined) updateData.vehicle_plate = vehicle_plate;
    updateData.updated_at = new Date().toISOString();

    let query = serviceClient.from('bookings').update(updateData);
    if (id) {
      query = query.eq('id', id);
    } else if (reference) {
      query = query.eq('reference', reference);
    }

    const { data, error } = await query.select().single();
    if (error || !data) {
      console.error('Failed to update booking in database:', error);
      return NextResponse.json(
        { error: 'Failed to update booking in database' },
        { status: 500 }
      );
    }

    await logAuditEvent({
      userEmail: currentUser.email,
      userRole: currentUser.role,
      action: 'booking_updated',
      resource: 'bookings',
      resourceId: data.id,
      newValues: updateData,
      ip: clientIp,
    });

    return NextResponse.json({ success: true, booking: data });
  } catch (err: any) {
    console.error('Admin bookings PATCH error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
