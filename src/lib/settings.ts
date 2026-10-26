import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { unstable_cache } from 'next/cache';
import { getMergedSiteSettings } from './dynamic-settings-store';

export interface SiteSettings {
  whatsapp_number: string;
  whatsapp_number_secondary: string;
  phone: string;
  email: string;
  owner_notification_email: string;
  telegram_chat_id?: string;
  lead_alert_minutes: number;
  riyadh_enabled: boolean;
  taif_enabled: boolean;
  address_cities: string[];
  google_reviews_link: string;
  google_reviews_rating: number;
  google_reviews_count: number;
  free_cancellation_hours: number;
  founder_enabled?: boolean;
  currency_rates: Record<string, number>;
  // Feature Flags (Controlled from /admin/settings)
  flight_tracking_enabled: boolean;
  complimentary_water: boolean;
  zamzam_water: boolean;
  complimentary_child_seat: boolean;
  malay_speaking_chauffeur: boolean;
  free_miqat_stop: boolean;
  online_card_payment_enabled: boolean;
  bank_transfer_payment_enabled: boolean;
  coaster_enabled: boolean;
  airport_waiting_minutes: number;
  promo_banner_enabled: boolean;
  promo_banner_text: string;
}

export const DEFAULT_SETTINGS: SiteSettings = {
  whatsapp_number: process.env.NEXT_PUBLIC_DEFAULT_WHATSAPP || '966567588261',
  whatsapp_number_secondary: '966505316971',
  phone: process.env.NEXT_PUBLIC_DEFAULT_PHONE || '+966505316971',
  email: process.env.NEXT_PUBLIC_DEFAULT_EMAIL || 'info@duyufalrahmanvip.com',
  owner_notification_email: 'info@duyufalrahmanvip.com',
  telegram_chat_id: '',
  lead_alert_minutes: 15,
  riyadh_enabled: true,
  taif_enabled: true,
  address_cities: ['Makkah', 'Madinah', 'Jeddah', 'Taif', 'Riyadh'],
  google_reviews_link: '', // default empty; hides review block when empty
  google_reviews_rating: 0,
  google_reviews_count: 0,
  free_cancellation_hours: 24,
  founder_enabled: false,
  currency_rates: {
    SAR: 1.0,
    USD: 0.266,
    MYR: 1.18,
    GBP: 0.21,
    EUR: 0.25,
    IDR: 4350.0,
    INR: 22.3,
    PKR: 74.5,
    EGP: 13.1,
  },
  flight_tracking_enabled: false,
  complimentary_water: false,
  zamzam_water: false,
  complimentary_child_seat: false,
  malay_speaking_chauffeur: false,
  free_miqat_stop: false,
  online_card_payment_enabled: false,
  bank_transfer_payment_enabled: false,
  coaster_enabled: false,
  airport_waiting_minutes: 60,
  promo_banner_enabled: true,
  promo_banner_text: 'Fixed 2026 Umrah Season Rates Available • Free Cancellation up to 24h Before Arrival',
};

function getStaticSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'placeholder-anon-key';
  return createSupabaseClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

const fetchSettingsCached = unstable_cache(
  async (): Promise<SiteSettings> => {
    try {
      const supabase = getStaticSupabaseClient();
      const { data, error } = await supabase
        .from('public_site_settings')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error || !data) {
        return getMergedSiteSettings(null);
      }

      return getMergedSiteSettings({
        whatsapp_number: data.whatsapp_number,
        whatsapp_number_secondary: data.whatsapp_number_secondary,
        phone: data.phone,
        email: data.email,
        owner_notification_email: data.owner_notification_email,
        telegram_chat_id: data.telegram_chat_id,
        lead_alert_minutes: Number(data.lead_alert_minutes) || undefined,
        riyadh_enabled: Boolean(data.riyadh_enabled),
        taif_enabled: Boolean(data.taif_enabled),
        address_cities: data.address_cities,
        google_reviews_link: data.google_reviews_link,
        google_reviews_rating: Number(data.google_reviews_rating) || undefined,
        google_reviews_count: Number(data.google_reviews_count) || undefined,
        free_cancellation_hours: Number(data.free_cancellation_hours) || undefined,
        founder_enabled: Boolean(data.founder_enabled),
        currency_rates: data.currency_rates,
        flight_tracking_enabled: Boolean(data.flight_tracking_enabled),
        complimentary_water: Boolean(data.complimentary_water),
        zamzam_water: Boolean(data.zamzam_water),
        complimentary_child_seat: Boolean(data.complimentary_child_seat),
        malay_speaking_chauffeur: Boolean(data.malay_speaking_chauffeur),
        free_miqat_stop: Boolean(data.free_miqat_stop),
        online_card_payment_enabled: Boolean(data.online_card_payment_enabled),
        bank_transfer_payment_enabled: Boolean(data.bank_transfer_payment_enabled),
        coaster_enabled: Boolean(data.coaster_enabled),
        airport_waiting_minutes: Number(data.airport_waiting_minutes) || undefined,
        promo_banner_enabled: data.promo_banner_enabled !== undefined ? Boolean(data.promo_banner_enabled) : undefined,
        promo_banner_text: data.promo_banner_text,
      });
    } catch {
      return getMergedSiteSettings(null);
    }
  },
  ['site_settings_cache'],
  { revalidate: 300, tags: ['site_settings'] }
);

export async function getSiteSettings(): Promise<SiteSettings> {
  return fetchSettingsCached();
}
