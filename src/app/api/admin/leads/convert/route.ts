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

    // 2. Generate cryptographically strong booking reference (RUC-XXXXXXXX)
    const randomHex = crypto.randomBytes(4).toString('hex').toUpperCase();
    const bookingRef = `RUC-${randomHex}`;
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
      pickup_location: lead.route_id ? lead.route_id.split('-to-')[0]?.replace(/-/g, ' ').toUpperCase() : 'Jeddah Airport',
      dropoff_location: lead.route_id ? lead.route_id.split('-to-')[1]?.replace(/-/g, ' ').toUpperCase() : 'Makkah Hotel',
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
