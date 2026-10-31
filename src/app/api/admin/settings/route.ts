import { NextResponse } from 'next/server';
import { z } from 'zod';
import { revalidateTag, revalidatePath } from 'next/cache';
import { requireRole } from '@/lib/auth/server-auth';
import { createServiceClient } from '@/lib/supabase/service';
import { logAuditEvent } from '@/lib/audit';
import { getClientIp } from '@/lib/rate-limit';
import { getMergedSiteSettings, setDynamicSettingsOverrides } from '@/lib/dynamic-settings-store';

export async function GET(request: Request) {
  try {
    const authResult = await requireRole(request, ['owner', 'admin']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    let dbSettings: any = null;
    try {
      const serviceClient = createServiceClient();
      const { data } = await serviceClient
        .from('site_settings')
        .select('*')
        .eq('lock_id', true)
        .maybeSingle();
      if (data) dbSettings = data;
    } catch (e) {
      console.warn('Notice fetching settings from DB:', e);
    }

    const mergedSettings = getMergedSiteSettings(dbSettings);

    return NextResponse.json({
      success: true,
      settings: mergedSettings,
      system_status: {
        resend_configured: Boolean(process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.includes('placeholder')),
        resend_from: process.env.RESEND_FROM || 'Duyuf Alrahman VIP Security <security@duyufalrahmanvip.com>',
      },
    });
  } catch (err: any) {
    console.error('Settings GET error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

const SettingsUpdateSchema = z.object({
  phone: z.string().max(50).optional(),
  email: z.string().email().max(100).optional(),
  whatsapp_number: z.string().regex(/^\+?[0-9]{8,15}$/, 'Must be 8-15 digits').optional(),
  whatsapp_number_secondary: z.string().regex(/^\+?[0-9]{8,15}$/, 'Must be 8-15 digits').optional(),
  riyadh_enabled: z.boolean().optional(),
  taif_enabled: z.boolean().optional(),
  address_cities: z.array(z.string().max(50)).optional(),
  google_reviews_link: z.string().url().max(255).optional().or(z.literal('')),
  google_reviews_rating: z.number().min(0).max(5).optional(),
  google_reviews_count: z.number().int().min(0).optional(),
  free_cancellation_hours: z.number().int().min(0).max(168).optional(),
  currency_rates: z.record(z.string(), z.number().positive()).optional(),
  owner_notification_email: z.string().email().max(100).optional(),
  telegram_chat_id: z.string().max(100).optional(),
  lead_alert_minutes: z.number().int().min(1).max(1440).optional(),
  founder_enabled: z.boolean().optional(),
  // Feature Flags
  flight_tracking_enabled: z.boolean().optional(),
  complimentary_water: z.boolean().optional(),
  zamzam_water: z.boolean().optional(),
  complimentary_child_seat: z.boolean().optional(),
  malay_speaking_chauffeur: z.boolean().optional(),
  free_miqat_stop: z.boolean().optional(),
  online_card_payment_enabled: z.boolean().optional(),
  bank_transfer_payment_enabled: z.boolean().optional(),
  coaster_enabled: z.boolean().optional(),
  airport_waiting_minutes: z.number().int().min(15).max(180).optional(),
  promo_banner_enabled: z.boolean().optional(),
  promo_banner_text: z.string().max(255).optional(),
});

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    // Owner-only guard for modifying production settings
    const authResult = await requireRole(request, ['owner']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { user: currentUser } = authResult;
    const body = await request.json();
    const parseResult = SettingsUpdateSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const validated = parseResult.data;
    const serviceClient = createServiceClient();
    const updates: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    if (validated.phone !== undefined) updates.phone = validated.phone;
    if (validated.email !== undefined) updates.email = validated.email;
    if (validated.whatsapp_number !== undefined) updates.whatsapp_number = validated.whatsapp_number.replace(/[^0-9]/g, '');
    if (validated.whatsapp_number_secondary !== undefined) updates.whatsapp_number_secondary = validated.whatsapp_number_secondary.replace(/[^0-9]/g, '');
    if (validated.riyadh_enabled !== undefined) updates.riyadh_enabled = validated.riyadh_enabled;
    if (validated.taif_enabled !== undefined) updates.taif_enabled = validated.taif_enabled;
    if (validated.address_cities !== undefined) updates.address_cities = validated.address_cities;
    if (validated.google_reviews_link !== undefined) updates.google_reviews_link = validated.google_reviews_link;
    if (validated.google_reviews_rating !== undefined) updates.google_reviews_rating = validated.google_reviews_rating;
    if (validated.google_reviews_count !== undefined) updates.google_reviews_count = validated.google_reviews_count;
    if (validated.free_cancellation_hours !== undefined) updates.free_cancellation_hours = validated.free_cancellation_hours;
    if (validated.currency_rates !== undefined) updates.currency_rates = validated.currency_rates;
    if (validated.owner_notification_email !== undefined) updates.owner_notification_email = validated.owner_notification_email;
    if (validated.telegram_chat_id !== undefined) updates.telegram_chat_id = validated.telegram_chat_id;
    if (validated.lead_alert_minutes !== undefined) updates.lead_alert_minutes = validated.lead_alert_minutes;
    if (validated.founder_enabled !== undefined) updates.founder_enabled = validated.founder_enabled;
    // Feature flags
    if (validated.flight_tracking_enabled !== undefined) updates.flight_tracking_enabled = validated.flight_tracking_enabled;
    if (validated.complimentary_water !== undefined) updates.complimentary_water = validated.complimentary_water;
    if (validated.zamzam_water !== undefined) updates.zamzam_water = validated.zamzam_water;
    if (validated.complimentary_child_seat !== undefined) updates.complimentary_child_seat = validated.complimentary_child_seat;
    if (validated.malay_speaking_chauffeur !== undefined) updates.malay_speaking_chauffeur = validated.malay_speaking_chauffeur;
    if (validated.free_miqat_stop !== undefined) updates.free_miqat_stop = validated.free_miqat_stop;
    if (validated.online_card_payment_enabled !== undefined) updates.online_card_payment_enabled = validated.online_card_payment_enabled;
    if (validated.bank_transfer_payment_enabled !== undefined) updates.bank_transfer_payment_enabled = validated.bank_transfer_payment_enabled;
    if (validated.coaster_enabled !== undefined) updates.coaster_enabled = validated.coaster_enabled;
    if (validated.airport_waiting_minutes !== undefined) updates.airport_waiting_minutes = validated.airport_waiting_minutes;
    if (validated.promo_banner_enabled !== undefined) updates.promo_banner_enabled = validated.promo_banner_enabled;
    if (validated.promo_banner_text !== undefined) updates.promo_banner_text = validated.promo_banner_text;

    // 1. Save immediately to dynamic runtime store
    setDynamicSettingsOverrides(updates);

    // 2. Persist to Supabase if available
    let dbData: any = null;
    try {
      const serviceClient = createServiceClient();
      const { data } = await serviceClient
        .from('site_settings')
        .upsert(
          {
            lock_id: true,
            ...updates,
          },
          { onConflict: 'lock_id' }
        )
        .select()
        .maybeSingle();

      if (data) dbData = data;
    } catch (dbErr) {
      console.warn('Notice persisting site_settings to DB:', dbErr);
    }

    try {
      await logAuditEvent({
        userEmail: currentUser.email,
        userRole: currentUser.role,
        action: 'settings_update',
        resource: 'settings',
        resourceId: 'lock_id',
        newValues: updates,
        ip: clientIp,
      });
    } catch (auditErr) {
      console.warn('Notice logging audit event:', auditErr);
    }

    // Revalidate cache tags and layouts
    try {
      revalidateTag('site_settings');

    } catch (revalErr) {
      console.warn('Cache revalidation notice:', revalErr);
    }

    return NextResponse.json({ success: true, settings: getMergedSiteSettings(dbData || updates) });
  } catch (err: any) {
    console.error('Settings update error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
