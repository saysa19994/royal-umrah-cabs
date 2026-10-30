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
    const body = await request.json();
    const {
      lead_id,
      route_id: overrideRouteId,
      vehicle_id: overrideVehicleId,
      pickup_date: overridePickupDate,
      pickup_time: overridePickupTime,
      customer_name: overrideCustomerName,
      customer_phone: overrideCustomerPhone,
      passengers_count: overridePax,
      special_notes: overrideNotes,
    } = body;

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
        { success: false, error: 'Lead has already been converted to an official booking' },
        { status: 400 }
      );
    }

    // Refuse if booking already exists for this lead reference
    const leadRefCode = lead.ref_code || lead.reference;
    if (leadRefCode) {
      const { data: existingBooking } = await serviceClient
        .from('bookings')
        .select('id, reference')
        .ilike('special_notes', `%${leadRefCode}%`)
        .maybeSingle();

      if (existingBooking) {
        return NextResponse.json(
          { success: false, error: `A booking (${existingBooking.reference}) already exists for this lead` },
          { status: 400 }
        );
      }
    }

    const effectiveRouteId = overrideRouteId || lead.route_id;
    const effectiveVehicleId = overrideVehicleId || lead.vehicle_id;
    const effectivePickupDate = overridePickupDate || lead.pickup_date;
    const effectiveCustomerName = overrideCustomerName || lead.customer_name || 'Valued Pilgrim';
    const effectiveCustomerPhone = overrideCustomerPhone || lead.customer_phone || lead.whatsapp_number;
    const effectivePax = Number(overridePax) || lead.passengers || 2;

    // Require route, vehicle, and pickup date
    if (!effectiveRouteId || !effectiveVehicleId || !effectivePickupDate) {
      return NextResponse.json(
        { success: false, error: 'Lead cannot be converted: missing route, vehicle, or pickup date. Please provide them in the conversion form.' },
        { status: 400 }
      );
    }

    // Recompute price strictly server-side from database
    const { calculateServerPrice } = await import('@/lib/pricing-server');
    let priceCalc;
    try {
      priceCalc = await calculateServerPrice({
        bookingType: 'transfer',
        routeId: effectiveRouteId,
        vehicleId: effectiveVehicleId,
        pickupDatetime: `${effectivePickupDate}T12:00:00Z`,
        passengersCount: effectivePax,
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
        { success: false, error: 'Calculated fare is missing or invalid' },
        { status: 400 }
      );
    }

    // Retrieve route locations
    const { data: routeInfo } = await serviceClient
      .from('routes')
      .select('origin_city, destination_city')
      .eq('id', effectiveRouteId)
      .maybeSingle();

    const pickupLocation =
      routeInfo?.origin_city || effectiveRouteId.split('-to-')[0]?.replace(/-/g, ' ').toUpperCase() || 'Origin Location';
    const dropoffLocation =
      routeInfo?.destination_city || effectiveRouteId.split('-to-')[1]?.replace(/-/g, ' ').toUpperCase() || 'Destination Location';

    // 2. Generate cryptographically strong booking reference (RUC-XXXXXXXX)
    const randomHex = crypto.randomBytes(4).toString('hex').toUpperCase();
    const bookingRef = `RUC-${randomHex}`;
    const pickupTimeStr = overridePickupTime || '14:00';
    const pickupDateStr = `${effectivePickupDate}T${pickupTimeStr}:00+03:00`;

    const notesSummary = [
      overrideNotes || lead.notes,
      `Converted from Lead Ref: ${leadRefCode || lead.id.slice(0, 8)}`,
    ]
      .filter(Boolean)
      .join(' | ');

    const bookingPayload = {
      reference: bookingRef,
      booking_type: 'transfer',
      route_id: effectiveRouteId,
      vehicle_id: effectiveVehicleId,
      customer_name: effectiveCustomerName,
      customer_phone: effectiveCustomerPhone,
      customer_email: null,
      pickup_datetime: pickupDateStr,
      pickup_location: pickupLocation,
      dropoff_location: dropoffLocation,
      passengers_count: effectivePax,
      luggage_count: Math.min(effectivePax, 6),
      flight_number: null,
      add_ons: { child_seat: false, flight_tracking: true, zamzam_water: true },
      special_notes: notesSummary,
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
