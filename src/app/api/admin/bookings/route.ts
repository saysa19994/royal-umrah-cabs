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
      const allowedStatuses = BookingStatusEnum.options as readonly string[];
      if (!allowedStatuses.includes(statusFilter)) {
        return NextResponse.json({ error: 'Invalid booking status filter' }, { status: 400 });
      }
      query = query.eq('status', statusFilter);
    }

    // Server-side search across the complete dataset (not merely the visible page).
    const rawSearch = searchParams.get('q') || '';
    const safeSearch = rawSearch.normalize('NFKC').replace(/[^\p{L}\p{N} @+_-]/gu, '').trim().slice(0, 80);
    if (rawSearch && !safeSearch) {
      return NextResponse.json({ bookings: [], total: 0, limit, offset });
    }
    if (safeSearch) {
      query = query.or(
        'reference.ilike.%' + safeSearch + '%,customer_name.ilike.%' + safeSearch +
        '%,customer_phone.ilike.%' + safeSearch + '%,pickup_location.ilike.%' + safeSearch + '%'
      );
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

    return NextResponse.json({ bookings: data || [], total: count ?? (data?.length || 0), limit, offset }, { headers: { 'Cache-Control': 'private, no-store' } });
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

    // Driver details must always be resolved from the trusted driver registry.
    if (driver_name !== undefined || driver_phone !== undefined || vehicle_plate !== undefined) {
      return NextResponse.json({ error: 'Use the verified driver assignment endpoint' }, { status: 400 });
    }
    if (special_notes !== undefined &&
        (typeof special_notes !== 'string' || special_notes.length > 2000)) {
      return NextResponse.json({ error: 'Notes must be text of 2000 characters or fewer' }, { status: 400 });
    }

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

    // Re-read the current persisted state; prevent invalid jumps in booking lifecycle.
    let currentQuery = serviceClient.from('bookings').select('id, status, driver_id, whatsapp_number');
    currentQuery = id ? currentQuery.eq('id', id) : currentQuery.eq('reference', reference);
    const { data: currentBooking, error: currentError } = await currentQuery.maybeSingle();
    if (currentError) return NextResponse.json({ error: 'Unable to verify booking state' }, { status: 500 });
    if (!currentBooking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    if (status !== undefined && status !== currentBooking.status) {
      const transitions: Record<string, string[]> = {
        new: ['confirmed', 'cancelled'],
        confirmed: ['cancelled'],
        driver_assigned: ['en_route', 'cancelled'],
        en_route: ['completed'],
        completed: [], cancelled: [],
      };
      if (!(transitions[currentBooking.status] || []).includes(status)) {
        return NextResponse.json({
          error: 'This status transition is not allowed. Confirm first, then assign a registered driver.',
        }, { status: 409 });
      }
      if (status === 'en_route' && !currentBooking.driver_id) {
        return NextResponse.json({ error: 'A verified driver must be assigned first' }, { status: 409 });
      }
    }


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

      let checkQuery = serviceClient.from('bookings').select('id, whatsapp_number');
      if (id) checkQuery = checkQuery.eq('id', id);
      else if (reference) checkQuery = checkQuery.eq('reference', reference);

      const { data: existingBooking, error: checkError } = await checkQuery.maybeSingle();
      if (checkError || !existingBooking) {
        return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
      }

      if (existingBooking.whatsapp_number !== currentUser.assigned_whatsapp_number) {
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

    if (Object.keys(updateData).length === 1) {
      return NextResponse.json({ error: 'No editable fields were supplied' }, { status: 400 });
    }
    let query = serviceClient.from('bookings').update(updateData).eq('status', currentBooking.status);
    if (id) {
      query = query.eq('id', id);
    } else if (reference) {
      query = query.eq('reference', reference);
    }

    const { data, error } = await query.select().maybeSingle();
    if (error) {
      console.error('Failed to update booking in database:', error);
      return NextResponse.json({ error: 'Failed to update booking in database' }, { status: 500 });
    }
    if (!data) {
      return NextResponse.json({ error: 'Booking changed during the update. Refresh and try again.' }, { status: 409 });
    }

    await logAuditEvent({
      userEmail: currentUser.email,
      userRole: currentUser.role,
      action: 'booking_updated',
      resource: 'bookings',
      resourceId: data.id,
      oldValues: { status: currentBooking.status },
      newValues: updateData,
      ip: clientIp,
    });

    // Multilingual transactional email notification on status change (confirmed, completed, cancelled)
    if (status !== undefined && ['confirmed', 'completed', 'cancelled'].includes(status)) {
      try {
        const { dispatchBookingEmails } = await import('@/lib/booking-email-service');
        await dispatchBookingEmails({
          reference: data.reference || data.id,
          customerName: data.customer_name,
          customerEmail: data.customer_email || '',
          customerPhone: data.customer_phone,
          routeName: data.route_id || `${data.pickup_location} → ${data.dropoff_location}`,
          vehicleName: (data.vehicle_id || '').toUpperCase(),
          pickupDateTime: data.pickup_datetime || '',
          passengers: data.passengers_count || 1,
          luggage: data.luggage_count ?? 0,
          finalPriceSAR: data.final_price_sar ?? data.base_price_sar ?? 0,
          currency: data.currency_charged || data.currency || 'SAR',
          finalPriceCurrency: data.final_price_currency ?? data.final_price_sar ?? data.base_price_sar ?? 0,
          paymentMethod: data.payment_method || 'pay_upon_arrival',
          flightNumber: data.flight_number || undefined,
          specialRequests: data.special_notes || undefined,
          status: status as any,
          language: (data.language as any) || 'en',
        });
      } catch (emailErr) {
        console.warn('Admin status update email dispatch notice:', emailErr);
      }
    }

    return NextResponse.json({ success: true, booking: data });
  } catch (err: any) {
    console.error('Admin bookings PATCH error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
