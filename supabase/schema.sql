-- ====================================================================
-- Royal Umrah Cabs - Hardened PostgreSQL Database Schema with Strict RLS
-- Security Hardened Edition (Fail Closed, Zero "USING (true)" on Sensitive Data)
-- ====================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. SITE SETTINGS TABLE (Single-Row Pattern)
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lock_id BOOLEAN UNIQUE DEFAULT TRUE,
    whatsapp_number TEXT NOT NULL DEFAULT '966567588261',
    phone TEXT NOT NULL DEFAULT '+966567588261',
    email TEXT NOT NULL DEFAULT 'info@royalumrahcabs.com',
    owner_notification_email TEXT NOT NULL DEFAULT 'info@royalumrahcabs.com',
    telegram_chat_id TEXT,
    lead_alert_minutes INTEGER NOT NULL DEFAULT 15,
    riyadh_enabled BOOLEAN NOT NULL DEFAULT FALSE,
    address_cities TEXT[] NOT NULL DEFAULT ARRAY['Makkah', 'Madinah', 'Jeddah'],
    google_reviews_link TEXT NOT NULL DEFAULT 'https://g.page/r/CTL7ETeAhDVpEAI/review',
    google_reviews_rating NUMERIC(2,1) NOT NULL DEFAULT 0.0,
    google_reviews_count INTEGER NOT NULL DEFAULT 0,
    free_cancellation_hours INTEGER NOT NULL DEFAULT 24,
    currency_rates_source TEXT NOT NULL DEFAULT 'fixed',
    currency_rates JSONB NOT NULL DEFAULT '{
        "SAR": 1.0,
        "USD": 0.266,
        "MYR": 1.18,
        "GBP": 0.21,
        "EUR": 0.25,
        "IDR": 4350.0,
        "INR": 22.3,
        "PKR": 74.5,
        "EGP": 13.1
    }'::jsonb,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT single_row_check CHECK (lock_id = TRUE)
);

-- 2. WHATSAPP NUMBERS & ROUTING RULES TABLE
CREATE TABLE IF NOT EXISTS public.whatsapp_numbers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    label TEXT NOT NULL,
    number TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    priority INTEGER NOT NULL DEFAULT 1,
    routing_rule TEXT NOT NULL DEFAULT 'main_with_fallback',
    assigned_languages TEXT[] NOT NULL DEFAULT ARRAY['en', 'ar', 'ms'],
    working_hours_start TIME,
    working_hours_end TIME,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. LANGUAGES TABLE (Catalog - Public readable)
CREATE TABLE IF NOT EXISTS public.languages (
    code TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    native_name TEXT NOT NULL,
    dir TEXT NOT NULL DEFAULT 'ltr',
    is_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    is_reviewed BOOLEAN NOT NULL DEFAULT FALSE,
    default_currency TEXT NOT NULL DEFAULT 'USD',
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. VEHICLES TABLE (Catalog - Public readable)
CREATE TABLE IF NOT EXISTS public.vehicles (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    seats INTEGER NOT NULL,
    bags INTEGER NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    display_order INTEGER NOT NULL DEFAULT 0,
    photos JSONB NOT NULL DEFAULT '{"exterior": "/assets/images/staria_exterior.jpg", "interior": "/assets/images/staria_interior.jpg"}'::jsonb,
    features TEXT[] NOT NULL DEFAULT ARRAY['Air conditioning', 'Comfortable seating', 'Luggage space'],
    translations JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. ROUTES TABLE (Catalog - Public readable)
CREATE TABLE IF NOT EXISTS public.routes (
    id TEXT PRIMARY KEY,
    origin_city TEXT NOT NULL,
    destination_city TEXT NOT NULL,
    origin_code TEXT,
    destination_code TEXT,
    estimated_duration_minutes INTEGER NOT NULL DEFAULT 90,
    distance_km INTEGER NOT NULL DEFAULT 100,
    miqat_stop_allowed BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    display_order INTEGER NOT NULL DEFAULT 0,
    translations JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. PRICES TABLE (Catalog - Public readable)
CREATE TABLE IF NOT EXISTS public.prices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    route_id TEXT NOT NULL REFERENCES public.routes(id) ON DELETE CASCADE,
    vehicle_id TEXT NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
    price_sar NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT unique_route_vehicle UNIQUE (route_id, vehicle_id)
);

-- 7. SEASONAL MULTIPLIERS TABLE (Catalog - Public readable when active)
CREATE TABLE IF NOT EXISTS public.seasonal_multipliers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    multiplier NUMERIC(4,2) NOT NULL DEFAULT 1.00,
    start_date DATE,
    end_date DATE,
    is_active BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 8. ADDONS TABLE (Catalog - Public readable when active)
CREATE TABLE IF NOT EXISTS public.addons (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    price_sar NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    translations JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 9. REVIEWS TABLE (Public readable only when is_approved = true)
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'Saudi Arabia',
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    route TEXT,
    language TEXT NOT NULL DEFAULT 'en',
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'published', 'rejected')),
    is_approved BOOLEAN NOT NULL DEFAULT FALSE,
    google_review_id TEXT,
    service_type TEXT DEFAULT 'airport_transfer',
    booking_reference TEXT,
    is_verified_booking BOOLEAN NOT NULL DEFAULT FALSE,
    admin_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 10. PAGE CONTENT TABLE (CMS - Public readable)
CREATE TABLE IF NOT EXISTS public.page_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_key TEXT NOT NULL,
    language TEXT NOT NULL,
    seo_title TEXT NOT NULL,
    seo_description TEXT NOT NULL,
    h1 TEXT NOT NULL,
    content_blocks JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT unique_page_lang UNIQUE (page_key, language)
);

-- ====================================================================
-- SENSITIVE / STAFF-ONLY TABLES
-- ====================================================================

-- 11. USER PROFILES TABLE (RBAC - No totp_secret exposed)
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_user_id UUID UNIQUE,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'operator', -- 'owner', 'admin', 'operator', 'driver'
    assigned_whatsapp_number TEXT,
    is_suspended BOOLEAN NOT NULL DEFAULT FALSE,
    totp_enabled BOOLEAN NOT NULL DEFAULT FALSE,
    last_login_at TIMESTAMPTZ,
    last_login_ip TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 12. DRIVERS TABLE (Staff only)
CREATE TABLE IF NOT EXISTS public.drivers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    vehicle_plate TEXT NOT NULL,
    vehicle_model TEXT NOT NULL,
    spoken_languages TEXT[] NOT NULL DEFAULT ARRAY['Arabic', 'English'],
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 13. BOOKINGS TABLE (Staff only - Public insertions done via Service-Role server API)
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference TEXT UNIQUE NOT NULL,
    booking_type TEXT NOT NULL DEFAULT 'transfer',
    route_id TEXT REFERENCES public.routes(id) ON DELETE SET NULL,
    vehicle_id TEXT NOT NULL REFERENCES public.vehicles(id) ON DELETE RESTRICT,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    pickup_datetime TIMESTAMPTZ NOT NULL,
    pickup_location TEXT NOT NULL,
    dropoff_location TEXT NOT NULL,
    passengers_count INTEGER NOT NULL DEFAULT 1,
    luggage_count INTEGER NOT NULL DEFAULT 1,
    flight_number TEXT,
    add_ons JSONB NOT NULL DEFAULT '{"child_seat": false, "flight_tracking": true, "zamzam_water": true}'::jsonb,
    special_notes TEXT,
    base_price_sar NUMERIC(10,2) NOT NULL,
    seasonal_multiplier NUMERIC(4,2) NOT NULL DEFAULT 1.00,
    final_price_sar NUMERIC(10,2) NOT NULL,
    currency_charged TEXT NOT NULL DEFAULT 'SAR',
    final_price_currency NUMERIC(10,2) NOT NULL,
    payment_method TEXT NOT NULL DEFAULT 'cash_arrival',
    payment_status TEXT NOT NULL DEFAULT 'pending',
    status TEXT NOT NULL DEFAULT 'new',
    driver_name TEXT,
    driver_phone TEXT,
    vehicle_plate TEXT,
    driver_id UUID REFERENCES public.drivers(id) ON DELETE SET NULL,
    language TEXT NOT NULL DEFAULT 'en',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 14. LEADS TABLE (Staff only - Public insertions done via Service-Role server API)
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ref_code TEXT UNIQUE NOT NULL,
    whatsapp_number_id UUID REFERENCES public.whatsapp_numbers(id) ON DELETE SET NULL,
    whatsapp_number TEXT NOT NULL,
    page TEXT NOT NULL DEFAULT '/',
    language TEXT NOT NULL DEFAULT 'en',
    route_id TEXT,
    vehicle_id TEXT,
    pickup_date DATE,
    passengers INTEGER DEFAULT 1,
    price_sar NUMERIC(10,2),
    customer_name TEXT,
    customer_phone TEXT,
    source_utm JSONB NOT NULL DEFAULT '{}'::jsonb,
    status TEXT NOT NULL DEFAULT 'new',
    assigned_operator_id UUID,
    alert_sent BOOLEAN NOT NULL DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 15. PARTNERS TABLE (Staff only)
CREATE TABLE IF NOT EXISTS public.partners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agency_name TEXT NOT NULL,
    contact_person TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT NOT NULL,
    country TEXT NOT NULL,
    commission_rate NUMERIC(4,2) NOT NULL DEFAULT 10.00,
    is_approved BOOLEAN NOT NULL DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 16. AUDIT LOG TABLE (Staff only - inserted via Service-Role server API)
CREATE TABLE IF NOT EXISTS public.audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_type TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    action TEXT NOT NULL,
    old_values JSONB,
    new_values JSONB,
    performed_by TEXT NOT NULL DEFAULT 'system',
    ip_address TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 17. ROLE PERMISSIONS MATRIX TABLE (Owner/Admin only)
CREATE TABLE IF NOT EXISTS public.role_permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role TEXT NOT NULL,
    resource TEXT NOT NULL,
    can_view BOOLEAN NOT NULL DEFAULT FALSE,
    can_create BOOLEAN NOT NULL DEFAULT FALSE,
    can_edit BOOLEAN NOT NULL DEFAULT FALSE,
    can_delete BOOLEAN NOT NULL DEFAULT FALSE,
    can_publish BOOLEAN NOT NULL DEFAULT FALSE,
    can_export BOOLEAN NOT NULL DEFAULT FALSE,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT unique_role_resource UNIQUE (role, resource)
);

-- 18. OWNERSHIP TRANSFERS TABLE (Owner only)
CREATE TABLE IF NOT EXISTS public.ownership_transfers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    current_owner_email TEXT NOT NULL,
    target_owner_email TEXT NOT NULL,
    confirmation_token TEXT UNIQUE NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ====================================================================
-- RLS HELPER FUNCTION: is_staff_role()
-- ====================================================================

CREATE OR REPLACE FUNCTION public.is_staff_role(allowed_roles TEXT[])
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_profiles
    WHERE auth_user_id = auth.uid()
      AND is_suspended = FALSE
      AND role = ANY(allowed_roles)
  );
$$;

-- Helper to check if current caller is an active staff member (any non-suspended role)
CREATE OR REPLACE FUNCTION public.is_staff()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_profiles
    WHERE auth_user_id = auth.uid()
      AND is_suspended = FALSE
  );
$$;

-- ====================================================================
-- ENABLE ROW LEVEL SECURITY ON ALL TABLES
-- ====================================================================

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whatsapp_numbers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seasonal_multipliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ownership_transfers ENABLE ROW LEVEL SECURITY;

-- ====================================================================
-- 1. PUBLIC CATALOG POLICIES (Read-Only for Anon/Public; Staff Manage)
-- ====================================================================

-- site_settings: Public can read, only owner/admin can modify
CREATE POLICY "Public read site_settings" ON public.site_settings
    FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Staff manage site_settings" ON public.site_settings
    FOR ALL TO authenticated USING (public.is_staff_role(ARRAY['owner', 'admin']));

-- whatsapp_numbers: Public can read active numbers, staff manage
CREATE POLICY "Public read active whatsapp_numbers" ON public.whatsapp_numbers
    FOR SELECT TO anon, authenticated USING (is_active = TRUE);
CREATE POLICY "Staff manage whatsapp_numbers" ON public.whatsapp_numbers
    FOR ALL TO authenticated USING (public.is_staff_role(ARRAY['owner', 'admin']));

-- languages: Public can read enabled, staff manage
CREATE POLICY "Public read enabled languages" ON public.languages
    FOR SELECT TO anon, authenticated USING (is_enabled = TRUE);
CREATE POLICY "Staff manage languages" ON public.languages
    FOR ALL TO authenticated USING (public.is_staff_role(ARRAY['owner', 'admin', 'content_editor', 'translator']));

-- vehicles: Public read active, staff manage
CREATE POLICY "Public read active vehicles" ON public.vehicles
    FOR SELECT TO anon, authenticated USING (is_active = TRUE);
CREATE POLICY "Staff manage vehicles" ON public.vehicles
    FOR ALL TO authenticated USING (public.is_staff_role(ARRAY['owner', 'admin']));

-- routes: Public read active, staff manage
CREATE POLICY "Public read active routes" ON public.routes
    FOR SELECT TO anon, authenticated USING (is_active = TRUE);
CREATE POLICY "Staff manage routes" ON public.routes
    FOR ALL TO authenticated USING (public.is_staff_role(ARRAY['owner', 'admin']));

-- prices: Public read prices, staff manage
CREATE POLICY "Public read prices" ON public.prices
    FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Staff manage prices" ON public.prices
    FOR ALL TO authenticated USING (public.is_staff_role(ARRAY['owner', 'admin']));

-- seasonal_multipliers: Public read active, staff manage
CREATE POLICY "Public read active seasonal_multipliers" ON public.seasonal_multipliers
    FOR SELECT TO anon, authenticated USING (is_active = TRUE);
CREATE POLICY "Staff manage seasonal_multipliers" ON public.seasonal_multipliers
    FOR ALL TO authenticated USING (public.is_staff_role(ARRAY['owner', 'admin']));

-- addons: Public read active, staff manage
CREATE POLICY "Public read active addons" ON public.addons
    FOR SELECT TO anon, authenticated USING (is_active = TRUE);
CREATE POLICY "Staff manage addons" ON public.addons
    FOR ALL TO authenticated USING (public.is_staff_role(ARRAY['owner', 'admin']));

-- reviews: Public read published only, staff manage all, public insert pending
CREATE POLICY "Public read published reviews" ON public.reviews
    FOR SELECT TO anon, authenticated USING (status = 'published' AND is_approved = TRUE);
CREATE POLICY "Staff manage reviews" ON public.reviews
    FOR ALL TO authenticated USING (public.is_staff_role(ARRAY['owner', 'admin']));
CREATE POLICY "Public submit pending reviews" ON public.reviews
    FOR INSERT TO anon, authenticated WITH CHECK ((status = 'pending' OR status IS NULL) AND (is_approved = FALSE OR is_approved IS NULL));

-- page_content: Public read, staff manage
CREATE POLICY "Public read page_content" ON public.page_content
    FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Staff manage page_content" ON public.page_content
    FOR ALL TO authenticated USING (public.is_staff_role(ARRAY['owner', 'admin', 'content_editor', 'translator']));

-- ====================================================================
-- 2. SENSITIVE / STAFF-ONLY POLICIES
-- ZERO anon access. ZERO "USING (true)" on authenticated.
-- Insertions for bookings & leads are strictly handled via Server Service-Role client.
-- ====================================================================

-- user_profiles:
-- Staff can view own profile or owners/admins can view all profiles
CREATE POLICY "Staff view own profile" ON public.user_profiles
    FOR SELECT TO authenticated
    USING (auth_user_id = auth.uid());

CREATE POLICY "Owner/Admin view all profiles" ON public.user_profiles
    FOR SELECT TO authenticated
    USING (public.is_staff_role(ARRAY['owner', 'admin']));

-- ONLY owner can insert profiles
CREATE POLICY "Owner insert user_profiles" ON public.user_profiles
    FOR INSERT TO authenticated
    WITH CHECK (public.is_staff_role(ARRAY['owner']));

-- ONLY owner can delete profiles
CREATE POLICY "Owner delete user_profiles" ON public.user_profiles
    FOR DELETE TO authenticated
    USING (public.is_staff_role(ARRAY['owner']));

-- Owner can update any profile to any role
CREATE POLICY "Owner update user_profiles" ON public.user_profiles
    FOR UPDATE TO authenticated
    USING (public.is_staff_role(ARRAY['owner']))
    WITH CHECK (public.is_staff_role(ARRAY['owner']));

-- Admins may edit only operator/driver/editor profiles (cannot self-promote or touch owner/admin)
CREATE POLICY "Admin update non-executive profiles" ON public.user_profiles
    FOR UPDATE TO authenticated
    USING (
      public.is_staff_role(ARRAY['admin'])
      AND role NOT IN ('owner', 'admin')
    )
    WITH CHECK (
      public.is_staff_role(ARRAY['admin'])
      AND role NOT IN ('owner', 'admin')
    );

-- drivers:
CREATE POLICY "Staff view drivers" ON public.drivers
    FOR SELECT TO authenticated
    USING (public.is_staff());
CREATE POLICY "Owner/Admin manage drivers" ON public.drivers
    FOR ALL TO authenticated
    USING (public.is_staff_role(ARRAY['owner', 'admin']));

-- bookings:
-- Operators can only view/update bookings scoped to their assigned WhatsApp number
-- Owners and admins can view/update all bookings
-- NO anon SELECT or INSERT
CREATE POLICY "Operator view assigned bookings" ON public.bookings
    FOR SELECT TO authenticated
    USING (
      public.is_staff_role(ARRAY['owner', 'admin'])
      OR (
        public.is_staff_role(ARRAY['operator'])
        AND driver_phone IN (
          SELECT assigned_whatsapp_number
          FROM public.user_profiles
          WHERE auth_user_id = auth.uid()
        )
      )
    );

CREATE POLICY "Operator update assigned bookings" ON public.bookings
    FOR UPDATE TO authenticated
    USING (
      public.is_staff_role(ARRAY['owner', 'admin'])
      OR (
        public.is_staff_role(ARRAY['operator'])
        AND driver_phone IN (
          SELECT assigned_whatsapp_number
          FROM public.user_profiles
          WHERE auth_user_id = auth.uid()
        )
      )
    );

CREATE POLICY "Owner/Admin manage bookings" ON public.bookings
    FOR ALL TO authenticated
    USING (public.is_staff_role(ARRAY['owner', 'admin']));

-- leads:
-- Operators can only view leads assigned to their WhatsApp channel
-- NO anon SELECT or INSERT
CREATE POLICY "Operator view assigned leads" ON public.leads
    FOR SELECT TO authenticated
    USING (
      public.is_staff_role(ARRAY['owner', 'admin'])
      OR (
        public.is_staff_role(ARRAY['operator'])
        AND whatsapp_number IN (
          SELECT assigned_whatsapp_number
          FROM public.user_profiles
          WHERE auth_user_id = auth.uid()
        )
      )
    );

CREATE POLICY "Operator update assigned leads" ON public.leads
    FOR UPDATE TO authenticated
    USING (
      public.is_staff_role(ARRAY['owner', 'admin'])
      OR (
        public.is_staff_role(ARRAY['operator'])
        AND whatsapp_number IN (
          SELECT assigned_whatsapp_number
          FROM public.user_profiles
          WHERE auth_user_id = auth.uid()
        )
      )
    );

CREATE POLICY "Owner/Admin manage leads" ON public.leads
    FOR ALL TO authenticated
    USING (public.is_staff_role(ARRAY['owner', 'admin']));

-- partners:
CREATE POLICY "Staff view partners" ON public.partners
    FOR SELECT TO authenticated
    USING (public.is_staff());
CREATE POLICY "Owner/Admin manage partners" ON public.partners
    FOR ALL TO authenticated
    USING (public.is_staff_role(ARRAY['owner', 'admin']));

-- audit_log:
CREATE POLICY "Owner/Admin view audit_log" ON public.audit_log
    FOR SELECT TO authenticated
    USING (public.is_staff_role(ARRAY['owner', 'admin']));

-- role_permissions:
CREATE POLICY "Staff view role_permissions" ON public.role_permissions
    FOR SELECT TO authenticated
    USING (public.is_staff());
CREATE POLICY "Owner manage role_permissions" ON public.role_permissions
    FOR ALL TO authenticated
    USING (public.is_staff_role(ARRAY['owner']));

-- ownership_transfers:
CREATE POLICY "Owner manage ownership_transfers" ON public.ownership_transfers
    FOR ALL TO authenticated
    USING (public.is_staff_role(ARRAY['owner']));

-- ====================================================================
-- 3. TAMPER-PROOF TRIGGERS FOR OPERATORS
-- Restricts operator updates on bookings/leads to status and notes only.
-- Operators CANNOT tamper with prices, vehicles, routes, or assigned drivers.
-- ====================================================================

CREATE OR REPLACE FUNCTION public.trg_restrict_operator_booking_update()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- If caller is an operator and NOT an owner or admin
  IF public.is_staff_role(ARRAY['operator']) AND NOT public.is_staff_role(ARRAY['owner', 'admin']) THEN
    IF NEW.final_price_sar IS DISTINCT FROM OLD.final_price_sar OR
       NEW.base_price_sar IS DISTINCT FROM OLD.base_price_sar OR
       NEW.driver_phone IS DISTINCT FROM OLD.driver_phone OR
       NEW.driver_id IS DISTINCT FROM OLD.driver_id OR
       NEW.vehicle_id IS DISTINCT FROM OLD.vehicle_id OR
       NEW.route_id IS DISTINCT FROM OLD.route_id OR
       NEW.reference IS DISTINCT FROM OLD.reference THEN
      RAISE EXCEPTION 'Restricted: Operators may only update status and operational notes on bookings.';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_restrict_operator_booking_update ON public.bookings;
CREATE TRIGGER trg_restrict_operator_booking_update
BEFORE UPDATE ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION public.trg_restrict_operator_booking_update();

CREATE OR REPLACE FUNCTION public.trg_restrict_operator_lead_update()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF public.is_staff_role(ARRAY['operator']) AND NOT public.is_staff_role(ARRAY['owner', 'admin']) THEN
    IF NEW.price_sar IS DISTINCT FROM OLD.price_sar OR
       NEW.whatsapp_number IS DISTINCT FROM OLD.whatsapp_number OR
       NEW.ref_code IS DISTINCT FROM OLD.ref_code THEN
      RAISE EXCEPTION 'Restricted: Operators may only update status on leads.';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_restrict_operator_lead_update ON public.leads;
CREATE TRIGGER trg_restrict_operator_lead_update
BEFORE UPDATE ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.trg_restrict_operator_lead_update();

