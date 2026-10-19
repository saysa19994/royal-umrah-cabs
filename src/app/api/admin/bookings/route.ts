import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireRole } from '@/lib/auth/server-auth';
import { hasPermission } from '@/lib/auth/rbac';
import { createServiceClient } from '@/lib/supabase/service';
import { logAuditEvent } from '@/lib/audit';
import { getClientIp } from '@/lib/rate-limit';

const BookingStatusEnum = z.enum([
  'new',
  'confirmed',
  'driver_assigned',
  'en_route',
  'completed',
  'cancelled',
]);

export async function GET(request: Request) {
  try {
    // 1. Require staff session (owner, admin, operator)
    const authResult = await requireRole(request, ['owner', 'admin', 'operator']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { user: currentUser } = authResult;
    if (!(await hasPermission(currentUser.role, 'bookings', 'view'))) {
      return NextResponse.json({ error: 'Forbidden: Insufficient permissions to view bookings' }, { status: 403 });
    }
    const { searchParams } = new URL(request.url);
    const statusFilter = searchParams.get('status');
    const limit = Math.min(Math.max(parseInt(searchParams.get('limit') || '50', 10), 1), 100);
    const offset = Math.max(parseInt(searchParams.get('offset') || '0', 10), 0);

    const serviceClient = createServiceClient();
    let query = serviceClient
      .from('bookings')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (statusFilter && statusFilter !== 'all') {
      query = query.eq('status', statusFilter);
    }

    // Server-side Operator Scoping:
    // If the caller is an operator, strictly restrict queries to their assigned WhatsApp number
    if (currentUser.role === 'operator') {
      if (!currentUser.assigned_whatsapp_number) {
        return NextResponse.json({ bookings: [], total: 0, limit, offset });
      }
      query = query.eq('whatsapp_number', currentUser.assigned_whatsapp_number);
    }

    query = query.range(offset, offset + limit - 1);

    const { data, count, error } = await query;
    if (error) {
      console.error('Failed to query bookings from database:', error);
      return NextResponse.json(
        { error: 'Failed to retrieve bookings from database' },
        { status: 500 }
      );
    }

    return NextResponse.json({ bookings: data || [], total: count ?? (data?.length || 0), limit, offset });
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
    if (!(await hasPermission(currentUser.role, 'bookings', 'edit'))) {
      return NextResponse.json({ error: 'Forbidden: Insufficient permissions to edit bookings' }, { status: 403 });
    }
    const body = await request.json();
    const { id, reference, status, special_notes, driver_name, driver_phone, vehicle_plate } = body;

    if (!id && !reference) {
      return NextResponse.json(
        { error: 'Booking id or reference is required' },
        { status: 400 }
      );
    }

    if (status !== undefined) {
      const parsedStatus = BookingStatusEnum.safeParse(status);
      if (!parsedStatus.success) {
        return NextResponse.json(
          { error: 'Invalid booking status provided. Allowed: new, confirmed, driver_assigned, en_route, completed, cancelled' },
          { status: 400 }
        );
      }
    }

    const serviceClient = createServiceClient();

    // If operator, verify that the booking belongs to their assigned WhatsApp scope and restrict fields
    if (currentUser.role === 'operator') {
      const disallowedKeys = Object.keys(body).filter(
        (key) => !['id', 'reference', 'status', 'special_notes'].includes(key)
      );
      if (disallowedKeys.length > 0) {
        return NextResponse.json(
          { error: `Forbidden: Operators are permitted to update status and special_notes only (disallowed: ${disallowedKeys.join(', ')})` },
          { status: 403 }
        );
      }

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
    if (status !== undefined) updateData.status = status;
    if (special_notes !== undefined) updateData.special_notes = special_notes;

    if (currentUser.role !== 'operator') {
      if (driver_name !== undefined) updateData.driver_name = driver_name;
      if (driver_phone !== undefined) updateData.driver_phone = driver_phone;
      if (vehicle_plate !== undefined) updateData.vehicle_plate = vehicle_plate;
    }
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
