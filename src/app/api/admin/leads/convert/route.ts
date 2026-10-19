import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { requireRole } from '@/lib/auth/server-auth';
import { createServiceClient } from '@/lib/supabase/service';
import { logAuditEvent } from '@/lib/audit';
import { getClientIp } from '@/lib/rate-limit';

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const authResult = await requireRole(request, ['owner', 'admin', 'operator']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { user: currentUser } = authResult;
    const { lead_id } = await request.json();

    if (!lead_id) {
      return NextResponse.json({ success: false, error: 'lead_id is required' }, { status: 400 });
    }

    const serviceClient = createServiceClient();

    // 1. Fetch the lead
    const { data: lead, error: leadErr } = await serviceClient
      .from('leads')
      .select('*')
      .eq('id', lead_id)
      .maybeSingle();

    if (leadErr || !lead) {
      return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 });
    }

    // Verify operator scope
    if (currentUser.role === 'operator') {
      if (lead.whatsapp_number !== currentUser.assigned_whatsapp_number) {
        return NextResponse.json(
          { success: false, error: 'Forbidden: Cannot convert leads outside your assigned channel' },
          { status: 403 }
        );
      }
    }

    // Refuse if already confirmed
    if (lead.status === 'confirmed') {
      return NextResponse.json(
        { success: false, error: 'Lead has already been converted to a booking' },
        { status: 400 }
      );
    }

    // Refuse if booking already exists for this lead reference
    const { data: existingBooking } = await serviceClient
      .from('bookings')
      .select('id, reference')
      .ilike('special_notes', `%${lead.ref_code}%`)
      .maybeSingle();

    if (existingBooking) {
      return NextResponse.json(
        { success: false, error: `A booking (${existingBooking.reference}) already exists for this lead` },
        { status: 400 }
      );
    }

    // Require route, vehicle, and pickup date (no fabricated fallbacks)
    if (!lead.route_id || !lead.vehicle_id || !lead.pickup_date) {
      return NextResponse.json(
        { success: false, error: 'Lead cannot be converted: missing route_id, vehicle_id, or pickup_date' },
        { status: 400 }
      );
    }

    // Recompute price strictly server-side from database
    const { calculateServerPrice } = await import('@/lib/pricing-server');
    let priceCalc;
    try {
      priceCalc = await calculateServerPrice({
        bookingType: 'transfer',
        routeId: lead.route_id,
        vehicleId: lead.vehicle_id,
        pickupDatetime: `${lead.pickup_date}T12:00:00Z`,
        passengersCount: lead.passengers || 1,
        currency: 'SAR',
      });
    } catch (calcErr: any) {
      return NextResponse.json(
        { success: false, error: `Cannot calculate price for lead conversion: ${calcErr.message}` },
        { status: 400 }
      );
    }

    if (!priceCalc || !priceCalc.finalPriceSAR || priceCalc.finalPriceSAR <= 0) {
      return NextResponse.json(
        { success: false, error: 'Calculated price is missing or invalid' },
        { status: 400 }
      );
    }

    // Retrieve route locations
    const { data: routeInfo } = await serviceClient
      .from('routes')
      .select('origin_city, destination_city')
      .eq('id', lead.route_id)
      .maybeSingle();

    const pickupLocation =
      routeInfo?.origin_city || lead.route_id.split('-to-')[0]?.replace(/-/g, ' ').toUpperCase() || 'Origin';
    const dropoffLocation =
      routeInfo?.destination_city || lead.route_id.split('-to-')[1]?.replace(/-/g, ' ').toUpperCase() || 'Destination';

    // 2. Generate cryptographically strong booking reference (RUC-XXXXXXXX)
    const randomHex = crypto.randomBytes(4).toString('hex').toUpperCase();
    const bookingRef = `RUC-${randomHex}`;
    const pickupDateStr = `${lead.pickup_date}T14:00:00+03:00`;

    const bookingPayload = {
      reference: bookingRef,
      booking_type: 'transfer',
      route_id: lead.route_id,
      vehicle_id: lead.vehicle_id,
      customer_name: lead.customer_name || 'Valued Pilgrim',
      customer_phone: lead.customer_phone || lead.whatsapp_number,
      customer_email: null,
      pickup_datetime: pickupDateStr,
      pickup_location: pickupLocation,
      dropoff_location: dropoffLocation,
      passengers_count: lead.passengers || 2,
      luggage_count: 2,
      flight_number: null,
      add_ons: { child_seat: false, flight_tracking: true, zamzam_water: true },
      special_notes: lead.notes
        ? `${lead.notes} (Ref: ${lead.ref_code})`
        : `Converted from Lead Ref: ${lead.ref_code}`,
      base_price_sar: priceCalc.basePriceSAR,
      seasonal_multiplier: priceCalc.multiplier,
      final_price_sar: priceCalc.finalPriceSAR,
      currency_charged: 'SAR',
      final_price_currency: priceCalc.finalPriceSAR,
      payment_method: 'pay_upon_arrival',
      payment_status: 'pending',
      status: 'confirmed',
      language: lead.language || 'en',
      whatsapp_number: lead.whatsapp_number,
    };

    const { data: newBooking, error: bookErr } = await serviceClient
      .from('bookings')
      .insert(bookingPayload)
      .select()
      .single();

    if (bookErr || !newBooking) {
      console.error('Error inserting booking during lead conversion:', bookErr);
      return NextResponse.json(
        { success: false, error: 'Failed to create booking in database' },
        { status: 500 }
      );
    }

    // 3. Update lead status to 'confirmed'
    await serviceClient
      .from('leads')
      .update({
        status: 'confirmed',
        updated_at: new Date().toISOString(),
      })
      .eq('id', lead_id);

    // 4. Audit log
    await logAuditEvent({
      userEmail: currentUser.email,
      userRole: currentUser.role,
      action: 'convert_to_booking',
      resource: 'leads',
      resourceId: lead_id,
      newValues: { booking_id: newBooking.id, reference: bookingRef },
      ip: clientIp,
    });

    return NextResponse.json({
      success: true,
      booking: newBooking,
      message: 'Lead successfully converted to confirmed booking',
    });
  } catch (error: any) {
    console.error('Lead convert exception:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
