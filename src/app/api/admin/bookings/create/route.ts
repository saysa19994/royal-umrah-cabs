import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireRole } from '@/lib/auth/server-auth';
import { hasPermission } from '@/lib/auth/rbac';
import { createServiceClient } from '@/lib/supabase/service';
import { calculateServerPrice } from '@/lib/pricing-server';
import { normalizePhoneNumber } from '@/lib/phone';
import { resolveWhatsAppNumber } from '@/lib/whatsapp-routing';
import { logAuditEvent } from '@/lib/audit';
import { getClientIp } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

const NewBookingSchema = z.object({
  route_id: z.string().min(1).max(120),
  vehicle_id: z.string().min(1).max(120),
  customer_name: z.string().trim().min(2).max(120),
  customer_phone: z.string().trim().regex(/^\+?[0-9 ()-]{8,25}$/),
  customer_email: z.union([z.string().email().max(200), z.literal('')]).optional(),
  pickup_local: z.string().regex(/^\d{4}-\d{2}-\d{2}T(?:[01]\d|2[0-3]):[0-5]\d$/),
  pickup_location: z.string().trim().min(3).max(200),
  dropoff_location: z.string().trim().min(3).max(200),
  passengers_count: z.number().int().min(1).max(50),
  luggage_count: z.number().int().min(0).max(50),
  flight_number: z.string().trim().max(30).optional(),
  special_notes: z.string().trim().max(2000).optional(),
}).strict();

/** Create a request from a customer call; never invent a fare or collect advance payment. */
export async function POST(request: Request) {
  const auth = await requireRole(request, ['owner', 'admin']);
  if (auth.errorResponse) return auth.errorResponse;
  if (!(await hasPermission(auth.user.role, 'bookings', 'create'))) {
    return NextResponse.json({ error: 'You cannot create a booking' }, { status: 403 });
  }
  const parsed = NewBookingSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({
    error: 'Check customer, trip, passengers, luggage and pickup information',
  }, { status: 400 });
  const p = parsed.data;
  const pickup = new Date(p.pickup_local + ':00+03:00');
  const iso = pickup.toISOString();
  if (!Number.isFinite(pickup.getTime()) ||
    new Date(iso).toLocaleDateString('en-CA', { timeZone: 'Asia/Riyadh' }) !== p.pickup_local.slice(0,10) ||
    pickup.getTime() < Date.now() + 3600000) {
    return NextResponse.json({ error: 'Pickup must be a valid Saudi date at least one hour ahead' }, { status: 400 });
  }
  const db = createServiceClient();
  const [routeResult, vehicleResult] = await Promise.all([
    db.from('routes').select('id,origin_city,destination_city,is_active').eq('id', p.route_id).maybeSingle(),
    db.from('vehicles').select('id,name,seats,bags,is_active').eq('id', p.vehicle_id).maybeSingle(),
  ]);
  const route = routeResult.data;
  const vehicle = vehicleResult.data;
  if (routeResult.error || vehicleResult.error) return NextResponse.json({ error: 'Unable to verify route and vehicle' }, { status: 500 });
  if (!route?.is_active || !vehicle?.is_active) return NextResponse.json({ error: 'Select active route and vehicle' }, { status: 422 });
  if (p.passengers_count > Number(vehicle.seats) || p.luggage_count > Number(vehicle.bags)) {
    return NextResponse.json({ error: 'Vehicle capacity is insufficient' }, { status: 422 });
  }
  if (/airport|مطار/i.test(route.origin_city + ' ' + p.pickup_location) && !p.flight_number) {
    return NextResponse.json({ error: 'Flight number is required for airport collection' }, { status: 422 });
  }

  let price;
  try {
    price = await calculateServerPrice({
      bookingType: 'transfer', routeId: p.route_id, vehicleId: p.vehicle_id,
      currency: 'SAR', pickupDatetime: iso,
      passengersCount: p.passengers_count, luggageCount: p.luggage_count,
    });
  } catch (e) {
    console.error('Manual booking fare unavailable', e);
    return NextResponse.json({ error: 'Unable to verify the fare. No booking was saved.' }, { status: 422 });
  }
  if (!price || !Number.isFinite(price.finalPriceSAR) || price.finalPriceSAR <= 0) {
    return NextResponse.json({ error: 'Missing authoritative fare' }, { status: 422 });
  }

  const assigned = await resolveWhatsAppNumber('ar');
  const ref = 'RUC-' + crypto.randomBytes(7).toString('hex').toUpperCase();
  const payload = {
    reference: ref,
    booking_type: 'transfer',
    route_id: route.id, vehicle_id: vehicle.id,
    customer_name: p.customer_name, customer_phone: normalizePhoneNumber(p.customer_phone),
    customer_email: p.customer_email || null,
    pickup_datetime: iso, pickup_location: p.pickup_location,
    dropoff_location: p.dropoff_location,
    passengers_count: p.passengers_count, luggage_count: p.luggage_count,
    flight_number: p.flight_number || null,
    add_ons: { child_seat: false, flight_tracking: true },
    special_notes: p.special_notes || null,
    base_price_sar: price.basePriceSAR,
    seasonal_multiplier: price.multiplier,
    final_price_sar: price.finalPriceSAR,
    currency_charged: 'SAR', final_price_currency: price.finalPriceSAR,
    payment_method: 'pay_upon_arrival', payment_status: 'pending',
    status: 'new', language: 'ar', whatsapp_number: assigned.number,
  };

  const { data, error } = await db.from('bookings').insert(payload)
    .select('id,reference,final_price_sar,status').single();
  if (error || !data) {
    console.error('Manual booking insert failed', error);
    return NextResponse.json({ error: 'Unable to save the booking' }, { status: 500 });
  }
  await logAuditEvent({
    userEmail: auth.user.email, userRole: auth.user.role,
    action: 'manual_booking_created', resource: 'bookings', resourceId: data.id,
    newValues: { reference: data.reference, status: data.status, source: 'admin_manual' },
    ip: getClientIp(request),
  });
  return NextResponse.json({ success: true, booking: data }, {
    status: 201, headers: { 'Cache-Control': 'private, no-store' },
  });
}
