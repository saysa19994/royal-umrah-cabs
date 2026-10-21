-- Migration 002: Phase 1 Feature Flags & Settings Hygiene
-- Adds customer-facing feature flags (default false / off) and single waiting time value

ALTER TABLE public.site_settings 
  ADD COLUMN IF NOT EXISTS flight_tracking_enabled BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS complimentary_water BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS zamzam_water BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS complimentary_child_seat BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS malay_speaking_chauffeur BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS free_miqat_stop BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS online_card_payment_enabled BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS bank_transfer_payment_enabled BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS coaster_enabled BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS airport_waiting_minutes INTEGER DEFAULT 60,
  ADD COLUMN IF NOT EXISTS whatsapp_number_secondary TEXT DEFAULT '966505316971';

-- Recreate public view to safely expose customer-facing feature flags
DROP VIEW IF EXISTS public.public_site_settings;
CREATE VIEW public.public_site_settings AS
SELECT 
  id,
  whatsapp_number,
  whatsapp_number_secondary,
  phone,
  email,
  riyadh_enabled,
  address_cities,
  google_reviews_link,
  google_reviews_rating,
  google_reviews_count,
  free_cancellation_hours,
  currency_rates,
  flight_tracking_enabled,
  complimentary_water,
  zamzam_water,
  complimentary_child_seat,
  malay_speaking_chauffeur,
  free_miqat_stop,
  online_card_payment_enabled,
  bank_transfer_payment_enabled,
  coaster_enabled,
  airport_waiting_minutes
FROM public.site_settings;

GRANT SELECT ON public.public_site_settings TO anon, authenticated;
