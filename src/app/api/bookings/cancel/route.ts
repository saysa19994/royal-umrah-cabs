import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/service';
import { rateLimit, getClientIp, checkRequiredEnv } from '@/lib/rate-limit';

export async function POST(request: Request) {
  try {
    const envCheck = checkRequiredEnv();
    if (!envCheck.ok && envCheck.response) {
      return envCheck.response;
    }

    const clientIp = getClientIp(request);

    // Rate limiting: 5 cancellations per 15 minutes per IP
    const rl = await rateLimit(`cancel_booking:${clientIp}`, 5, 900);
    if (!rl.success) {
      return NextResponse.json(
        { error: 'Too many cancellation attempts. Please wait.' },
        { status: 429 }
      );
    }

    const { reference, phone } = await request.json();

    if (!reference || !phone) {
      return NextResponse.json(
        { error: 'Both reference and phone number are required to verify cancellation eligibility.' },
        { status: 400 }
      );
    }

    const cleanRef = reference.trim().toUpperCase();
    const cleanPhone = phone.replace(/[^0-9]/g, '');

    const serviceClient = createServiceClient();
    const { data, error } = await serviceClient
      .from('bookings')
      .select('id, reference, customer_phone, pickup_datetime, status')
      .eq('reference', cleanRef)
      .maybeSingle();

    if (error) {
      console.error('Cancellation lookup error:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Booking not found', message: 'No active booking found with this reference number.' },
        { status: 404 }
      );
    }

    // Verify phone match
    const dbPhoneDigits = (data.customer_phone || '').replace(/[^0-9]/g, '');
    const phoneMatches =
      dbPhoneDigits === cleanPhone ||
      dbPhoneDigits.endsWith(cleanPhone) ||
      cleanPhone.endsWith(dbPhoneDigits);

    if (!phoneMatches) {
      return NextResponse.json(
        { error: 'Verification failed', message: 'The phone number provided does not match this booking record.' },
        { status: 403 }
      );
    }

    const pickupTime = new Date(data.pickup_datetime).getTime();
    const now = Date.now();
    const diffHours = (pickupTime - now) / (1000 * 60 * 60);

    if (diffHours < 24) {
      return NextResponse.json(
        {
          error: 'Late cancellation',
          allowed: false,
          message: 'Pickup is scheduled in less than 24 hours. Please contact dispatch via WhatsApp for assistance.',
        },
        { status: 400 }
      );
    }

    const { error: updateError } = await serviceClient
      .from('bookings')
      .update({ status: 'cancelled', updated_at: new Date().toISOString() })
      .eq('id', data.id);

    if (updateError) {
      throw updateError;
    }

    return NextResponse.json({
      success: true,
      message: 'Booking cancelled successfully',
    });
  } catch (err: any) {
    console.error('Cancellation error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
