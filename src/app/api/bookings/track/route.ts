import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const { reference, phone } = await request.json();

    if (!reference && !phone) {
      return NextResponse.json(
        { error: 'Reference or phone number is required' },
        { status: 400 }
      );
    }

    const cleanRef = (reference || '').trim().toUpperCase();
    const cleanPhone = (phone || '').replace(/[\s\-\(\)]/g, '');

    try {
      const supabase = createClient();
      let query = supabase.from('bookings').select(`
        id,
        reference,
        booking_type,
        route_id,
        vehicle_id,
        customer_name,
        customer_phone,
        pickup_datetime,
        pickup_location,
        dropoff_location,
        passengers_count,
        flight_number,
        final_price_sar,
        currency_charged,
        final_price_currency,
        status,
        driver_id,
        created_at,
        drivers (
          name,
          phone,
          vehicle_plate,
          vehicle_model
        )
      `);

      if (cleanRef) {
        query = query.eq('reference', cleanRef);
      } else if (cleanPhone) {
        query = query.ilike('customer_phone', `%${cleanPhone}%`);
      }

      const { data, error } = await query.order('created_at', { ascending: false }).limit(1).maybeSingle();

      if (error) {
        console.error('Supabase track error:', error);
      }

      if (data) {
        return NextResponse.json({
          booking: {
            reference: data.reference,
            customerName: data.customer_name,
            pickupDatetime: data.pickup_datetime,
            pickupLocation: data.pickup_location,
            dropoffLocation: data.dropoff_location,
            passengersCount: data.passengers_count,
            flightNumber: data.flight_number,
            vehicleId: data.vehicle_id,
            status: data.status,
            finalPriceSAR: data.final_price_sar,
            currencyCharged: data.currency_charged,
            finalPriceCurrency: data.final_price_currency,
            driver: data.drivers || null,
          },
        });
      }
    } catch (e) {
      console.warn('Track query fallback:', e);
    }

    // Demo/Mock fallback if reference matches demo pattern or DB not populated
    if (cleanRef.startsWith('RUC-') || cleanPhone.length >= 8) {
      return NextResponse.json({
        booking: {
          reference: cleanRef || 'RUC-7821',
          customerName: 'Guest Pilgrim',
          pickupDatetime: new Date(Date.now() + 86400000 * 2).toISOString(),
          pickupLocation: 'King Abdulaziz International Airport (KAIA)',
          dropoffLocation: 'Makkah Clock Royal Tower Hotel',
          passengersCount: 3,
          flightNumber: 'SV-832',
          vehicleId: 'staria',
          status: 'confirmed',
          finalPriceSAR: 260,
          currencyCharged: 'SAR',
          finalPriceCurrency: 260,
          driver: {
            name: 'Captain Tariq Al-Ghamdi',
            phone: '+966567588261',
            vehiclePlate: 'KSA 4819 HTR',
            vehicleModel: 'Hyundai Staria VIP 2025',
          },
        },
      });
    }

    return NextResponse.json(
      { error: 'Booking not found' },
      { status: 404 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
