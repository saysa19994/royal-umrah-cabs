import { NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/server-auth';
import { createServiceClient } from '@/lib/supabase/service';
import { logAuditEvent } from '@/lib/audit';
import { getClientIp } from '@/lib/rate-limit';

export async function GET(request: Request) {
  try {
    const authResult = await requireRole(request, ['owner', 'admin']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const serviceClient = createServiceClient();
    const { data, error } = await serviceClient
      .from('site_settings')
      .select('*')
      .eq('lock_id', true)
      .maybeSingle();

    if (error || !data) {
      return NextResponse.json({ error: 'Failed to retrieve settings from database' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      settings: data,
      system_status: {
        resend_configured: Boolean(process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.includes('placeholder')),
        resend_from: process.env.RESEND_FROM || 'Royal Umrah Cabs Security <security@royalumrahcabs.com>',
      },
    });
  } catch (err: any) {
    console.error('Settings GET error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const authResult = await requireRole(request, ['owner', 'admin']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { user: currentUser } = authResult;
    const body = await request.json();
    const {
      phone,
      email,
      whatsapp_number,
      riyadh_enabled,
      address_cities,
      google_reviews_link,
      google_reviews_rating,
      google_reviews_count,
      free_cancellation_hours,
      currency_rates,
    } = body;

    const serviceClient = createServiceClient();
    const updates: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    if (phone !== undefined) updates.phone = phone;
    if (email !== undefined) updates.email = email;
    if (whatsapp_number !== undefined) updates.whatsapp_number = whatsapp_number.replace(/[^0-9]/g, '');
    if (riyadh_enabled !== undefined) updates.riyadh_enabled = Boolean(riyadh_enabled);
    if (address_cities !== undefined) updates.address_cities = address_cities;
    if (google_reviews_link !== undefined) updates.google_reviews_link = google_reviews_link;
    if (google_reviews_rating !== undefined) updates.google_reviews_rating = Number(google_reviews_rating);
    if (google_reviews_count !== undefined) updates.google_reviews_count = Number(google_reviews_count);
    if (free_cancellation_hours !== undefined) updates.free_cancellation_hours = Number(free_cancellation_hours);
    if (currency_rates !== undefined) updates.currency_rates = currency_rates;

    const { data, error } = await serviceClient
      .from('site_settings')
      .update(updates)
      .eq('lock_id', true)
      .select()
      .single();

    if (error || !data) {
      console.error('Error updating site_settings:', error);
      return NextResponse.json({ success: false, error: 'Failed to update settings in database' }, { status: 500 });
    }

    await logAuditEvent({
      userEmail: currentUser.email,
      userRole: currentUser.role,
      action: 'settings_update',
      resource: 'settings',
      resourceId: 'lock_id',
      newValues: updates,
      ip: clientIp,
    });

    return NextResponse.json({ success: true, settings: data });
  } catch (err: any) {
    console.error('Settings update error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
