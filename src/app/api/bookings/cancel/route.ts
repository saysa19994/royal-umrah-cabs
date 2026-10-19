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

    // Rate limiting: 5 cancellations per 15 minutes per IP
    const rl = await rateLimit(`cancel_booking:${clientIp}`, 5, 900);
    if (!rl.success) {
      return NextResponse.json(
        { error: 'Too many cancellation attempts. Please wait.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Anti-bot verification (Cloudflare Turnstile)
    const turnstileToken = body['cf-turnstile-response'] || body.turnstile_token;
    const turnstileCheck = await verifyTurnstileToken(turnstileToken, clientIp);
    if (!turnstileCheck.success) {
      return NextResponse.json(
        { error: turnstileCheck.error || 'Anti-bot verification failed.' },
        { status: 400 }
      );
    }

    const { reference, phone } = body;

    if (!reference || !phone) {
      return NextResponse.json(
        { error: 'Both reference and phone number are required to verify cancellation eligibility.' },
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
    const { data, error } = await serviceClient
      .from('bookings')
      .select('id, reference, customer_phone, pickup_datetime, status')
      .eq('reference', cleanRef)
      .maybeSingle();

    if (error) {
      console.error('Cancellation lookup error:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    // Generic error to prevent enumeration of booking references or phone numbers
    if (!data || !verifyPhoneMatch(phone, data.customer_phone)) {
      return NextResponse.json(
        { error: 'No reservation found matching the provided reference and telephone number.' },
        { status: 404 }
      );
    }

    // Idempotency: If already cancelled, return success without re-updating
    if (data.status === 'cancelled') {
      return NextResponse.json({
        success: true,
        message: 'This booking has already been cancelled.',
      });
    }

    // State transition guard: cannot cancel completed or en-route rides online
    if (data.status === 'completed' || data.status === 'en_route') {
      return NextResponse.json(
        {
          error: 'This booking is already in progress or completed and cannot be cancelled online. Please contact dispatch via WhatsApp.',
        },
        { status: 400 }
      );
    }

    const pickupTime = new Date(data.pickup_datetime).getTime();
    const now = Date.now();
    const diffHours = (pickupTime - now) / (1000 * 60 * 60);

    if (diffHours < 24) {
      return NextResponse.json(
        {
          error: 'Pickup is scheduled in less than 24 hours. Please contact dispatch via WhatsApp for late cancellation assistance.',
          allowed: false,
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

    // Audit log
    await serviceClient.from('audit_log').insert({
      entity_type: 'booking',
      entity_id: data.id,
      action: 'cancel',
      new_values: { status: 'cancelled', cancelled_by: 'customer_online' },
      performed_by: 'customer_online',
    });

    return NextResponse.json({
      success: true,
      message: 'Booking cancelled successfully',
    });
  } catch (err: any) {
    console.error('Cancellation error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
