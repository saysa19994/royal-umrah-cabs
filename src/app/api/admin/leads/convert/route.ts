import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const { lead_id } = await request.json();

    if (!lead_id) {
      return NextResponse.json({ success: false, error: 'lead_id is required' }, { status: 400 });
    }

    const supabase = createClient();

    // 1. Fetch the lead
    const { data: lead, error: leadErr } = await supabase
      .from('leads')
      .select('*')
      .eq('id', lead_id)
      .single();

    if (leadErr || !lead) {
      return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 });
    }

    // 2. Generate unique booking reference
    const bookingRef = lead.reference || `RUC-${Math.floor(10000 + Math.random() * 90000)}`;
    const pickupDateStr = lead.pickup_date ? `${lead.pickup_date} 14:00:00` : new Date().toISOString();

    const bookingPayload = {
      reference: bookingRef,
      booking_type: 'transfer',
      route_id: lead.route_id || 'jeddah-airport-to-makkah',
      vehicle_id: lead.vehicle_id || 'staria',
      customer_name: lead.customer_name || 'Valued Pilgrim',
      customer_phone: lead.customer_phone || lead.whatsapp_number,
      customer_email: null,
      pickup_datetime: pickupDateStr,
      pickup_location: lead.route_id ? lead.route_id.split('-to-')[0]?.replace('-', ' ').toUpperCase() : 'Jeddah Airport',
      dropoff_location: lead.route_id ? lead.route_id.split('-to-')[1]?.replace('-', ' ').toUpperCase() : 'Makkah Hotel',
      passengers_count: lead.passengers || 2,
      luggage_count: 2,
      flight_number: null,
      add_ons: { child_seat: false, flight_tracking: true, zamzam_water: true },
      special_notes: lead.notes || 'Converted directly from WhatsApp lead',
      base_price_sar: lead.price_sar || 260,
      seasonal_multiplier: 1.0,
      final_price_sar: lead.price_sar || 260,
      currency_charged: 'SAR',
      final_price_currency: lead.price_sar || 260,
      payment_method: 'cash_arrival',
      payment_status: 'pending',
      status: 'confirmed',
      language: lead.language || 'en',
    };

    const { data: newBooking, error: bookErr } = await supabase
      .from('bookings')
      .insert(bookingPayload)
      .select()
      .single();

    if (bookErr) {
      console.error('Error inserting booking during lead conversion:', bookErr);
      return NextResponse.json({ success: false, error: bookErr.message }, { status: 500 });
    }

    // 3. Update lead status to 'confirmed'
    await supabase
      .from('leads')
      .update({
        status: 'confirmed',
        updated_at: new Date().toISOString(),
      })
      .eq('id', lead_id);

    // 4. Audit log
    await supabase.from('audit_log').insert({
      entity_type: 'lead',
      entity_id: lead_id,
      action: 'convert_to_booking',
      new_values: { booking_id: newBooking.id, reference: bookingRef },
      performed_by: 'admin_user',
    });

    return NextResponse.json({
      success: true,
      booking: newBooking,
      message: 'Lead successfully converted to confirmed booking',
    });
  } catch (error: any) {
    console.error('Lead convert exception:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
