-- Migration 003: Owner Account Protection & RLS Hardening
-- Enforces at the database level that only the owner can modify the owner's record,
-- and admins/operators cannot modify, demote, or suspend the owner.

CREATE OR REPLACE FUNCTION public.check_owner_protection()
RETURNS TRIGGER AS $$
BEGIN
  -- If target is owner and someone attempts to modify role or suspend
  IF OLD.role = 'owner' THEN
    -- Check if calling user is the owner themselves
    IF auth.uid() IS NOT NULL AND auth.uid() <> OLD.auth_user_id THEN
      RAISE EXCEPTION 'Forbidden: Only the owner can modify owner account credentials or profile.';
    END IF;

    -- Forbid demoting owner role directly
    IF NEW.role <> 'owner' THEN
      RAISE EXCEPTION 'Forbidden: Owner role cannot be demoted. Use official ownership transfer process.';
    END IF;

    -- Forbid suspending the owner
    IF NEW.is_suspended = true THEN
      RAISE EXCEPTION 'Forbidden: The platform owner cannot be suspended.';
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_owner_protection ON public.user_profiles;
CREATE TRIGGER trg_owner_protection
  BEFORE UPDATE OR DELETE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.check_owner_protection();

-- Promo banner & full feature flag persistence
ALTER TABLE public.site_settings 
  ADD COLUMN IF NOT EXISTS promo_banner_enabled BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS promo_banner_text TEXT DEFAULT 'Fixed 2026 Umrah Season Rates Available • Free Cancellation up to 24h Before Arrival';

-- Refresh public view
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
  airport_waiting_minutes,
  promo_banner_enabled,
  promo_banner_text
FROM public.site_settings;

GRANT SELECT ON public.public_site_settings TO anon, authenticated;
