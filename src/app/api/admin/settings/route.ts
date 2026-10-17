import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { DEFAULT_SETTINGS, getSiteSettings } from '@/lib/settings';

export async function GET() {
  try {
    const settings = await getSiteSettings();
    return NextResponse.json({ success: true, settings });
  } catch (err: any) {
    return NextResponse.json({ success: true, settings: DEFAULT_SETTINGS });
  }
}

export async function POST(request: Request) {
  try {
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

    const supabase = createClient();

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

    const { data, error } = await supabase
      .from('site_settings')
      .update(updates)
      .eq('lock_id', true)
      .select()
      .single();

    if (error) {
      console.error('Error updating site_settings:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    // Log in audit log
    await supabase.from('audit_log').insert({
      entity_type: 'site_settings',
      entity_id: 'lock_id',
      action: 'update',
      new_values: updates,
      performed_by: 'admin_user',
    });

    return NextResponse.json({ success: true, settings: data });
  } catch (err: any) {
    console.error('Settings update error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
