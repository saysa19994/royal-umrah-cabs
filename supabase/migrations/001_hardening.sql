-- ==============================================================================
-- MIGRATION 001_HARDENING.SQL
-- Royal Umrah Cabs Production Database Security Hardening
-- ==============================================================================
-- HOW TO RUN IN SUPABASE:
-- 1. Log in to your Supabase Dashboard: https://supabase.com/dashboard
-- 2. Select your project -> SQL Editor -> New Query
-- 3. Paste the entire content of this script and click "RUN"
-- 4. Verify output shows "Success. No rows returned."
-- ==============================================================================

-- 1. ROLE CHECK CONSTRAINT ON USER_PROFILES
ALTER TABLE public.user_profiles 
  DROP CONSTRAINT IF EXISTS check_valid_role;

ALTER TABLE public.user_profiles 
  ADD CONSTRAINT check_valid_role 
  CHECK (role IN ('owner', 'admin', 'operator', 'driver', 'content_editor', 'translator', 'partner'));

-- 2. STATUS & PAYMENT_METHOD CHECK CONSTRAINTS ON BOOKINGS
-- First, standardize any legacy payment method records
UPDATE public.bookings 
SET payment_method = 'pay_upon_arrival' 
WHERE payment_method = 'cash_arrival' OR payment_method IS NULL;

ALTER TABLE public.bookings 
  ALTER COLUMN payment_method SET DEFAULT 'pay_upon_arrival';

ALTER TABLE public.bookings 
  DROP CONSTRAINT IF EXISTS check_valid_booking_status;

ALTER TABLE public.bookings 
  ADD CONSTRAINT check_valid_booking_status 
  CHECK (status IN ('new', 'confirmed', 'driver_assigned', 'en_route', 'completed', 'cancelled'));

ALTER TABLE public.bookings 
  DROP CONSTRAINT IF EXISTS check_valid_payment_method;

ALTER TABLE public.bookings 
  ADD CONSTRAINT check_valid_payment_method 
  CHECK (payment_method IN ('pay_upon_arrival', 'online_card', 'bank_transfer'));

-- 3. ADD WHATSAPP_NUMBER COLUMN TO BOOKINGS FOR OPERATOR SCOPING (TASK 8)
ALTER TABLE public.bookings 
  ADD COLUMN IF NOT EXISTS whatsapp_number text;

-- Backfill existing bookings with active default operational WhatsApp number if null
UPDATE public.bookings 
SET whatsapp_number = '966567588261' 
WHERE whatsapp_number IS NULL;

-- 4. SEASONAL MULTIPLIERS CHECK CONSTRAINT
ALTER TABLE public.seasonal_multipliers 
  DROP CONSTRAINT IF EXISTS check_valid_multiplier_range;

ALTER TABLE public.seasonal_multipliers 
  ADD CONSTRAINT check_valid_multiplier_range 
  CHECK (multiplier BETWEEN 0.5 AND 5.0);

-- 5. PUBLIC SITE SETTINGS VIEW (TASK 5)
-- Reset unverified default reviews rating and count to 0
ALTER TABLE public.site_settings 
  ALTER COLUMN google_reviews_rating SET DEFAULT 0.0,
  ALTER COLUMN google_reviews_count SET DEFAULT 0;

UPDATE public.site_settings
SET google_reviews_rating = 0.0, google_reviews_count = 0
WHERE google_reviews_count = 12480;

-- Prevent public access to private columns: owner_notification_email, telegram_chat_id
DROP POLICY IF EXISTS "Public can view site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Public read-only site settings" ON public.site_settings;

-- Allow only staff (owner, admin) to read raw site_settings table directly
DROP POLICY IF EXISTS "Staff read-only raw site settings" ON public.site_settings;
CREATE POLICY "Staff read-only raw site settings"
  ON public.site_settings FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles
      WHERE user_profiles.auth_user_id = auth.uid()
        AND user_profiles.role IN ('owner', 'admin')
        AND user_profiles.is_suspended = false
    )
  );

-- Create public view exposing only customer-facing configuration
CREATE OR REPLACE VIEW public.public_site_settings AS
SELECT 
  id,
  whatsapp_number,
  phone,
  email,
  riyadh_enabled,
  address_cities,
  google_reviews_link,
  google_reviews_rating,
  google_reviews_count,
  free_cancellation_hours,
  currency_rates
FROM public.site_settings;

GRANT SELECT ON public.public_site_settings TO anon, authenticated;

-- 6. PERFORMANCE & SECURITY INDEXES
CREATE INDEX IF NOT EXISTS idx_bookings_created_at_desc ON public.bookings (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings (status);
CREATE INDEX IF NOT EXISTS idx_bookings_driver_phone ON public.bookings (driver_phone);
CREATE INDEX IF NOT EXISTS idx_bookings_whatsapp_number ON public.bookings (whatsapp_number);
CREATE INDEX IF NOT EXISTS idx_bookings_pickup_datetime ON public.bookings (pickup_datetime);

CREATE INDEX IF NOT EXISTS idx_leads_created_at_desc ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_whatsapp_number ON public.leads (whatsapp_number);

CREATE INDEX IF NOT EXISTS idx_audit_log_created_at_desc ON public.audit_log (created_at DESC);

-- NOTE FOR AUDITORS AND ENGINEERS:
-- Supabase Database Triggers and RLS policies protect client requests.
-- However, internal service-role calls (SUPABASE_SERVICE_ROLE_KEY) bypass RLS.
-- Therefore, strict API-level validation (Zod, RBAC guards, and verifyRole)
-- is the true authoritative line of defense against privilege escalation and tamper attacks.
