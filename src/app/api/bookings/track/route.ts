import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/service';
import { rateLimit, getClientIp, checkRequiredEnv } from '@/lib/rate-limit';
import { verifyTurnstileToken } from '@/lib/turnstile';
import { normalizePhoneNumber, verifyPhoneMatch } from '@/lib/phone';

export async function POST(request: Request) {
  try {
    const envCheck = checkRequiredEnv();
    if (!envCheck.ok && envCheck.response) {
      return envCheck.response;
    }

    const clientIp = getClientIp(request);

    // 1. Rate limiting: 10 queries per minute per IP
    const rl = await rateLimit(`track_booking:${clientIp}`, 10, 60);
    if (!rl.success) {
      return NextResponse.json(
        { error: 'Too many tracking requests. Please wait a moment.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // 2. Anti-bot verification (Cloudflare Turnstile)
    const turnstileToken = body['cf-turnstile-response'] || body.turnstile_token;
    const turnstileCheck = await verifyTurnstileToken(turnstileToken, clientIp);
    if (!turnstileCheck.success) {
      return NextResponse.json(
        { error: turnstileCheck.error || 'Anti-bot verification failed.' },
        { status: 400 }
      );
    }

    const { reference, phone } = body;

    // 3. Require BOTH reference AND phone
    if (!reference || !phone) {
      return NextResponse.json(
        { error: 'Both booking reference and telephone number are strictly required for security.' },
        { status: 400 }
      );
    }

    const cleanRef = reference.trim().toUpperCase();
    const cleanPhone = normalizePhoneNumber(phone);

    if (cleanPhone.length < 8) {
      return NextResponse.json(
        { error: 'Please enter a valid telephone number with country code.' },
        { status: 400 }
      );
    }

    const serviceClient = createServiceClient();

    // 4. Exact match on reference (NO ilike wildcards)
    const { data: booking, error } = await serviceClient
      .from('bookings')
      .select(`
        reference,
        customer_phone,
        pickup_datetime,
        pickup_location,
        dropoff_location,
        vehicle_id,
        status,
        final_price_sar,
        driver_id,
        drivers (
          name,
          phone,
          vehicle_plate,
          vehicle_model
        )
      `)
      .eq('reference', cleanRef)
      .maybeSingle();

    if (error) {
      console.error('Database query error in tracking:', error);
      return NextResponse.json(
        { error: 'Unable to query reservation status at this time' },
        { status: 500 }
      );
    }

    // Generic response if booking not found OR phone does NOT match exactly
    if (!booking || !verifyPhoneMatch(phone, booking.customer_phone)) {
      return NextResponse.json(
        { error: 'No reservation found matching the provided reference and phone number.' },
        { status: 404 }
      );
    }

    // 5. Driver details only exposed when actively assigned/en route
    const isDriverActive = booking.status === 'driver_assigned' || booking.status === 'en_route';
    const driverInfo = isDriverActive && booking.drivers
      ? {
          name: (booking.drivers as any).name,
          phone: (booking.drivers as any).phone,
          vehiclePlate: (booking.drivers as any).vehicle_plate,
          vehicleModel: (booking.drivers as any).vehicle_model,
        }
      : null;

    // 6. Return ONLY minimal, safe public fields
    return NextResponse.json({
      booking: {
        reference: booking.reference,
        pickupDatetime: booking.pickup_datetime,
        pickupLocation: booking.pickup_location,
        dropoffLocation: booking.dropoff_location,
        vehicleId: booking.vehicle_id,
        status: booking.status,
        finalPriceSAR: booking.final_price_sar,
        driver: driverInfo,
      },
    });
  } catch (err: any) {
    console.error('Booking tracking error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
