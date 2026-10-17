import { NextResponse } from 'next/server';
import { BookingSchema } from '@/types/booking';
import { createClient } from '@/lib/supabase/server';
import { CURRENCIES, CurrencyCode, Locale } from '@/i18n/config';
import { getSiteSettings } from '@/lib/settings';
import { resolveWhatsAppNumber } from '@/lib/whatsapp-routing';

// Fallback pricing matrix in SAR
const BASE_RATES: Record<string, Record<string, number>> = {
  'jeddah-airport-to-makkah': { camry: 200, staria: 260, yukon: 380, hiace: 340, coaster: 650 },
  'makkah-to-jeddah-airport': { camry: 200, staria: 260, yukon: 380, hiace: 340, coaster: 650 },
  'makkah-to-madinah': { camry: 450, staria: 500, yukon: 750, hiace: 650, coaster: 1200 },
  'madinah-to-makkah': { camry: 450, staria: 500, yukon: 750, hiace: 650, coaster: 1200 },
  'madinah-airport-to-hotel': { camry: 150, staria: 200, yukon: 300, hiace: 270, coaster: 550 },
  'jeddah-to-madinah': { camry: 680, staria: 750, yukon: 1050, hiace: 950, coaster: 1600 },
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = BookingSchema.parse(body);

    const settings = await getSiteSettings();
    let basePriceSAR = 450;

    // 1. Calculate price based on booking type
    if (validated.booking_type === 'transfer' && validated.route_id) {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from('prices')
          .select('price_sar')
          .eq('route_id', validated.route_id)
          .eq('vehicle_id', validated.vehicle_id)
          .single();

        if (data && data.price_sar) {
          basePriceSAR = Number(data.price_sar);
        } else if (BASE_RATES[validated.route_id]?.[validated.vehicle_id]) {
          basePriceSAR = BASE_RATES[validated.route_id][validated.vehicle_id];
        }
      } catch {
        if (BASE_RATES[validated.route_id]?.[validated.vehicle_id]) {
          basePriceSAR = BASE_RATES[validated.route_id][validated.vehicle_id];
        }
      }
    } else if (validated.booking_type === 'hourly') {
      basePriceSAR = 400; // default 4 hours
    } else if (validated.booking_type === 'ziyarat') {
      basePriceSAR = 300; // standard holy sites
    } else if (validated.booking_type === 'group_bus') {
      basePriceSAR = 800; // coaster / bus
    }

    // 2. Check active seasonal multiplier
    let multiplier = 1.0;
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from('seasonal_multipliers')
        .select('multiplier')
        .eq('is_active', true)
        .single();

      if (data && data.multiplier) {
        multiplier = Number(data.multiplier);
      }
    } catch {
      multiplier = 1.0;
    }

    const finalPriceSAR = Math.round(basePriceSAR * multiplier);

    // 3. Convert to requested currency
    const currKey = (validated.currency || 'SAR') as CurrencyCode;
    const currRate = CURRENCIES[currKey]?.rateFromSAR || 1.0;
    const finalPriceCurrency = Math.round(finalPriceSAR * currRate);

    // 4. Generate unique reference (e.g. RUC-74198)
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const reference = `RUC-${randomSuffix}`;

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

    // 5. Persist to Supabase
    let bookingId = `temp-${Date.now()}`;
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('bookings')
        .insert([bookingPayload])
        .select('id, reference')
        .single();

      if (data && !error) {
        bookingId = data.id;

        // Audit log entry
        await supabase.from('audit_log').insert({
          entity_type: 'booking',
          entity_id: data.id,
          action: 'create',
          new_values: { reference, customer_name: validated.customer_name, finalPriceSAR },
          performed_by: 'customer_online',
        });
      }
    } catch (err) {
      console.error('Error inserting booking in database:', err);
    }

    // 6. Assign WhatsApp operator dynamically based on routing rules
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
        id: bookingId,
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
        error: error?.errors ? error.errors[0]?.message : 'Invalid booking submission',
      },
      { status: 400 }
    );
  }
}
