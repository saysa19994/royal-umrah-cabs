import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireRole } from '@/lib/auth/server-auth';
import { hasPermission } from '@/lib/auth/rbac';
import { createServiceClient } from '@/lib/supabase/service';
import { logAuditEvent } from '@/lib/audit';
import { getClientIp } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

const AssignmentSchema = z.object({
  id: z.string().uuid(),
  driver_id: z.string().uuid(),
}).strict();

/**
 * Assign an existing, active driver to a confirmed booking.
 * The client cannot supply driver name, phone, or plate data.
 * This does not create bookings, modify fares, or charge customers.
 */
export async function POST(request: Request) {
  const auth = await requireRole(request, ['owner', 'admin']);
  if (auth.errorResponse) return auth.errorResponse;
  if (!(await hasPermission(auth.user.role, 'bookings', 'edit'))) {
    return NextResponse.json({ error: 'Not authorized to assign drivers' }, { status: 403 });
  }
  let payload: z.infer<typeof AssignmentSchema>;
  try {
    payload = AssignmentSchema.parse(await request.json());
  } catch {
    return NextResponse.json({ error: 'Invalid booking or driver ID' }, { status: 400 });
  }
  const db = createServiceClient();
  const { data: booking, error: bookingError } = await db.from('bookings')
    .select('id, status, driver_id, pickup_datetime, reference')
    .eq('id', payload.id).maybeSingle();
  if (bookingError) return NextResponse.json({ error: 'Unable to load booking' }, { status: 500 });
  if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
  if (booking.status !== 'confirmed' || booking.driver_id) {
    return NextResponse.json({ error: 'Only confirmed, unassigned bookings can receive a driver' }, { status: 409 });
  }

  const { data: driver, error: driverError } = await db.from('drivers')
    .select('id, name, phone, vehicle_plate, is_active')
    .eq('id', payload.driver_id).maybeSingle();
  if (driverError) return NextResponse.json({ error: 'Unable to load driver' }, { status: 500 });
  if (!driver || !driver.is_active) return NextResponse.json({ error: 'Driver is not active or does not exist' }, { status: 422 });

  const pickupMs = new Date(booking.pickup_datetime).getTime();
  if (!Number.isFinite(pickupMs)) return NextResponse.json({ error: 'Booking has an invalid pickup time' }, { status: 409 });
  const { data: conflicts, error: conflictsError } = await db.from('bookings')
    .select('id')
    .eq('driver_id', driver.id)
    .in('status', ['driver_assigned', 'en_route'])
    .gte('pickup_datetime', new Date(pickupMs - 6 * 3600000).toISOString())
    .lte('pickup_datetime', new Date(pickupMs + 6 * 3600000).toISOString())
    .neq('id', booking.id)
    .limit(1);
  if (conflictsError) return NextResponse.json({ error: 'Unable to verify driver schedule' }, { status: 500 });
  if (conflicts?.length) {
    return NextResponse.json({ error: 'This driver has another active booking within a six-hour pickup window' }, { status: 409 });
  }

  const { data: updated, error: updateError } = await db.from('bookings').update({
    driver_id: driver.id,
    driver_name: driver.name,
    driver_phone: driver.phone,
    vehicle_plate: driver.vehicle_plate,
    status: 'driver_assigned',
    updated_at: new Date().toISOString(),
  }).eq('id', booking.id).eq('status', 'confirmed').is('driver_id', null).select('*').maybeSingle();

  if (updateError) return NextResponse.json({ error: 'Unable to assign driver' }, { status: 500 });
  if (!updated) return NextResponse.json({ error: 'Booking changed during assignment. Please refresh.' }, { status: 409 });

  await logAuditEvent({
    userEmail: auth.user.email, userRole: auth.user.role,
    action: 'driver_assigned', resource: 'bookings', resourceId: updated.id,
    oldValues: { driver_id: null, status: 'confirmed' },
    newValues: { driver_id: driver.id, status: 'driver_assigned' },
    ip: getClientIp(request),
  });
  return NextResponse.json({ success: true, booking: updated }, { headers: { 'Cache-Control': 'private, no-store' } });
}
