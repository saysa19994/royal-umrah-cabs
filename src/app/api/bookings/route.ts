import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { BookingSchema } from '@/types/booking';
import { createServiceClient } from '@/lib/supabase/service';
import { CURRENCIES, CurrencyCode, Locale } from '@/i18n/config';
import { resolveWhatsAppNumber } from '@/lib/whatsapp-routing';
import { calculateServerPrice } from '@/lib/pricing-server';
import { rateLimit, getClientIp, checkRequiredEnv } from '@/lib/rate-limit';
import { verifyTurnstileToken } from '@/lib/turnstile';

export async function POST(request: Request) {
  try {
    // 1. Fail-closed check: required environment secrets in production
    const envCheck = checkRequiredEnv();
    if (!envCheck.ok && envCheck.response) {
      return envCheck.response;
    }

    const clientIp = getClientIp(request);

    // 2. Rate Limiting: 5 booking submissions per 10 minutes per IP
    const rl = await rateLimit(`booking_sub:${clientIp}`, 5, 600);
    if (!rl.success) {
      return NextResponse.json(
        { success: false, error: 'Too many booking requests. Please wait a few minutes before trying again.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // 3. Anti-bot verification (Cloudflare Turnstile)
    const turnstileToken = body['cf-turnstile-response'] || body.turnstile_token;
    const turnstileCheck = await verifyTurnstileToken(turnstileToken, clientIp);
    if (!turnstileCheck.success) {
      return NextResponse.json(
        { success: false, error: turnstileCheck.error || 'Bot verification failed.' },
        { status: 400 }
      );
    }

    // 4. Schema validation
    const validated = BookingSchema.parse(body);

    // 5. Compute price strictly server-side from database (fail closed if invalid)
    let pricingResult;
    try {
      pricingResult = await calculateServerPrice({
        bookingType: validated.booking_type,
        routeId: validated.route_id,
        vehicleId: validated.vehicle_id,
        currency: validated.currency,
        durationHours: validated.duration_hours || undefined,
      });
    } catch (calcErr: any) {
      console.error('Database pricing computation error:', calcErr);
      return NextResponse.json(
        { success: false, error: 'Unable to calculate price for the requested itinerary. Please contact dispatch via WhatsApp.' },
        { status: 400 }
      );
    }

    const { basePriceSAR, multiplier, finalPriceSAR, currency: currKey, finalPriceCurrency } = pricingResult;

    // 5. Generate cryptographically secure booking reference (10+ characters with unique retry)
    const serviceClient = createServiceClient();
    let reference = '';
    let isUnique = false;
    let attempts = 0;

    while (!isUnique && attempts < 5) {
      attempts++;
      const randToken = crypto.randomBytes(5).toString('hex').toUpperCase(); // 10 hex chars
      const candidateRef = `RUC-${randToken}`; // e.g. RUC-A7B8C9D0E1 (14 chars)

      const { data: existing } = await serviceClient
        .from('bookings')
        .select('id')
        .eq('reference', candidateRef)
        .maybeSingle();

      if (!existing) {
        reference = candidateRef;
        isUnique = true;
      }
    }

    if (!reference) {
      reference = `RUC-${crypto.randomBytes(6).toString('hex').toUpperCase()}`;
    }

    const bookingPayload = {
      reference,
      booking_type: validated.booking_type,
      route_id: validated.route_id || null,
      vehicle_id: validated.vehicle_id,
      customer_name: validated.customer_name,
      customer_phone: validated.customer_phone,
      customer_email: validated.customer_email || null,
      pickup_datetime: validated.pickup_datetime,
      pickup_location: validated.pickup_location,
      dropoff_location: validated.dropoff_location,
      passengers_count: validated.passengers_count,
      luggage_count: validated.luggage_count || 1,
      flight_number: validated.flight_number || null,
      add_ons: validated.add_ons,
      special_notes: validated.special_notes || null,
      base_price_sar: basePriceSAR,
      seasonal_multiplier: multiplier,
      final_price_sar: finalPriceSAR,
      currency_charged: currKey,
      final_price_currency: finalPriceCurrency,
      payment_method: 'cash_arrival',
      payment_status: 'pending',
      status: 'new',
      language: validated.language || 'en',
    };

    // 6. Persist to database using service-role client - FAIL CLOSED ON FAILURE
    const { data: insertedBooking, error: insertError } = await serviceClient
      .from('bookings')
      .insert([bookingPayload])
      .select('id, reference')
      .single();

    if (insertError || !insertedBooking) {
      console.error('Database insert failed for booking:', insertError);
      return NextResponse.json(
        {
          success: false,
          error: 'Could not record your reservation in the database. Please try again or book directly via WhatsApp.',
        },
        { status: 500 }
      );
    }

    // Audit log
    await serviceClient.from('audit_log').insert({
      entity_type: 'booking',
      entity_id: insertedBooking.id,
      action: 'create',
      new_values: { reference, customer_name: validated.customer_name, finalPriceSAR },
      performed_by: 'customer_online',
    });

    // 7. Resolve WhatsApp operator routing
    const lang = (validated.language as Locale) || 'en';
    const assignedOperator = await resolveWhatsAppNumber(lang);
    const currSymbol = CURRENCIES[currKey]?.symbol || 'SAR';

    const waLines = [
      `Assalamu Alaikum Royal Umrah Cabs [Ref: ${reference}]`,
      `• Name: ${validated.customer_name}`,
      `• Phone: ${validated.customer_phone}`,
      `• From: ${validated.pickup_location}`,
      `• To: ${validated.dropoff_location}`,
      `• Date & Time: ${validated.pickup_datetime}`,
      `• Vehicle: ${validated.vehicle_id.toUpperCase()}`,
      `• Passengers: ${validated.passengers_count} | Luggage: ${validated.luggage_count || 1}`,
      `• Fixed Fare: ${currSymbol}${finalPriceCurrency} (${finalPriceSAR} SAR)`,
      'Please confirm driver dispatch. Jazakum Allah Khair.',
    ];

    const waText = encodeURIComponent(waLines.join('\n'));
    const whatsappUrl = `https://wa.me/${assignedOperator.number}?text=${waText}`;

    return NextResponse.json({
      success: true,
      booking: {
        id: insertedBooking.id,
        reference,
        finalPriceSAR,
        currency: currKey,
        finalPriceCurrency,
        pickup_location: validated.pickup_location,
        dropoff_location: validated.dropoff_location,
        pickup_datetime: validated.pickup_datetime,
        vehicle_id: validated.vehicle_id,
        passengers_count: validated.passengers_count,
        luggage_count: validated.luggage_count || 1,
        whatsappUrl,
      },
    });
  } catch (error: any) {
    console.error('Booking submission error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.errors ? error.errors[0]?.message : 'Invalid booking submission data',
      },
      { status: 400 }
    );
  }
}
