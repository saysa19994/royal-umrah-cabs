-- ====================================================================
-- Royal Umrah Cabs - Complete PostgreSQL Database Schema with RLS
-- Phase 1 Foundation & Architecture
-- ====================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. SITE SETTINGS TABLE (Single-Row Pattern with check constraint)
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
    address_cities TEXT[] NOT NULL DEFAULT ARRAY['Makkah', 'Madinah', 'Jeddah', 'Riyadh'],
    google_reviews_link TEXT NOT NULL DEFAULT 'https://g.page/r/CTL7ETeAhDVpEAI/review',
    google_reviews_rating NUMERIC(2,1) NOT NULL DEFAULT 4.9,
    google_reviews_count INTEGER NOT NULL DEFAULT 12480,
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
    label TEXT NOT NULL, -- e.g. 'Main Operations', 'Secondary Dispatch'
    number TEXT NOT NULL, -- e.g. '966567588261'
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    priority INTEGER NOT NULL DEFAULT 1,
    routing_rule TEXT NOT NULL DEFAULT 'main_with_fallback', -- 'all_to_main', 'round_robin', 'by_language', 'by_working_hours', 'main_with_fallback'
    assigned_languages TEXT[] NOT NULL DEFAULT ARRAY['en', 'ar', 'ms'],
    working_hours_start TIME,
    working_hours_end TIME,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. LEADS TABLE (Lead tracking & accountability before WhatsApp dispatch)
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ref_code TEXT UNIQUE NOT NULL, -- e.g. 'RUC-48213'
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
    status TEXT NOT NULL DEFAULT 'new', -- 'new', 'replied', 'confirmed', 'completed', 'lost'
    assigned_operator_id UUID,
    alert_sent BOOLEAN NOT NULL DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. OPERATORS / USERS TABLE
CREATE TABLE IF NOT EXISTS public.operators (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_user_id UUID, -- Links to Supabase auth.users
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'operator', -- 'admin', 'operator'
    whatsapp_number_id UUID REFERENCES public.whatsapp_numbers(id) ON DELETE SET NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. AUDIT LOG TABLE (Every lead/booking/price change logged with user and time)
CREATE TABLE IF NOT EXISTS public.audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_type TEXT NOT NULL, -- 'lead', 'booking', 'price', 'settings', 'whatsapp_number'
    entity_id TEXT NOT NULL,
    action TEXT NOT NULL, -- 'create', 'status_change', 'update', 'delete'
    old_values JSONB,
    new_values JSONB,
    performed_by TEXT NOT NULL DEFAULT 'system',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. LANGUAGES TABLE (Enabled + Reviewed flags, admin toggleable)
CREATE TABLE IF NOT EXISTS public.languages (
    code TEXT PRIMARY KEY, -- 'en', 'ar', 'ms', 'fr', 'es', 'id', 'hi', 'de', 'ur'
    name TEXT NOT NULL,
    native_name TEXT NOT NULL,
    dir TEXT NOT NULL DEFAULT 'ltr', -- 'ltr' or 'rtl'
    is_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    is_reviewed BOOLEAN NOT NULL DEFAULT FALSE,
    default_currency TEXT NOT NULL DEFAULT 'USD',
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 7. VEHICLES TABLE (Only verifiable features stored, default: AC, Seating, Luggage)
CREATE TABLE IF NOT EXISTS public.vehicles (
    id TEXT PRIMARY KEY, -- 'staria', 'yukon', 'camry', 'hiace'
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

-- 8. ROUTES TABLE
CREATE TABLE IF NOT EXISTS public.routes (
    id TEXT PRIMARY KEY, -- e.g. 'jeddah-airport-to-makkah'
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

-- 9. PRICES TABLE
CREATE TABLE IF NOT EXISTS public.prices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    route_id TEXT NOT NULL REFERENCES public.routes(id) ON DELETE CASCADE,
    vehicle_id TEXT NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
    price_sar NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT unique_route_vehicle UNIQUE (route_id, vehicle_id)
);

-- 10. SEASONAL MULTIPLIERS TABLE
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

-- 11. ADDONS TABLE
CREATE TABLE IF NOT EXISTS public.addons (
    id TEXT PRIMARY KEY, -- 'child_seat', 'extra_luggage_van', 'special_meet_greet'
    name TEXT NOT NULL,
    price_sar NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    translations JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 12. DRIVERS TABLE
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

-- 13. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference TEXT UNIQUE NOT NULL, -- e.g. 'RUC-78219'
    booking_type TEXT NOT NULL DEFAULT 'transfer', -- 'transfer', 'hourly', 'ziyarat', 'group_transport'
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
    payment_method TEXT NOT NULL DEFAULT 'cash_arrival', -- 'cash_arrival', 'card_arrival', 'online'
    payment_status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'paid', 'refunded'
    status TEXT NOT NULL DEFAULT 'new', -- 'new', 'confirmed', 'driver_assigned', 'en_route', 'completed', 'cancelled'
    driver_id UUID REFERENCES public.drivers(id) ON DELETE SET NULL,
    assigned_operator_id UUID REFERENCES public.operators(id) ON DELETE SET NULL,
    language TEXT NOT NULL DEFAULT 'en',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 14. PARTNERS TABLE (Travel Agencies & Tour Operators)
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

-- 15. REVIEWS TABLE (Verifiable Google reviews and approved guest quotes)
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'Saudi Arabia',
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    route TEXT,
    language TEXT NOT NULL DEFAULT 'en',
    is_approved BOOLEAN NOT NULL DEFAULT FALSE,
    google_review_id TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 16. PAGE CONTENT TABLE (CMS / Dynamic SEO per Language)
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
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whatsapp_numbers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.operators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seasonal_multipliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;

-- 1. Site Settings Policies
CREATE POLICY "Public can view site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Authenticated users can update site settings" ON public.site_settings FOR ALL TO authenticated USING (true);

-- 2. WhatsApp Numbers Policies
CREATE POLICY "Public can view active whatsapp numbers" ON public.whatsapp_numbers FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Authenticated users can manage whatsapp numbers" ON public.whatsapp_numbers FOR ALL TO authenticated USING (true);

-- 3. Leads Policies
CREATE POLICY "Public can insert leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can manage leads" ON public.leads FOR ALL TO authenticated USING (true);

-- 4. Operators Policies
CREATE POLICY "Authenticated users can view and manage operators" ON public.operators FOR ALL TO authenticated USING (true);

-- 5. Audit Log Policies
CREATE POLICY "Authenticated users can view audit log" ON public.audit_log FOR SELECT TO authenticated USING (true);
CREATE POLICY "System can insert audit log" ON public.audit_log FOR INSERT WITH CHECK (true);

-- 6. Languages Policies
CREATE POLICY "Public can view enabled languages" ON public.languages FOR SELECT USING (is_enabled = TRUE);
CREATE POLICY "Authenticated users can manage languages" ON public.languages FOR ALL TO authenticated USING (true);

-- 7. Vehicles Policies
CREATE POLICY "Public can view active vehicles" ON public.vehicles FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Authenticated users can manage vehicles" ON public.vehicles FOR ALL TO authenticated USING (true);

-- 8. Routes Policies
CREATE POLICY "Public can view active routes" ON public.routes FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Authenticated users can manage routes" ON public.routes FOR ALL TO authenticated USING (true);

-- 9. Prices Policies
CREATE POLICY "Public can view prices" ON public.prices FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage prices" ON public.prices FOR ALL TO authenticated USING (true);

-- 10. Seasonal Multipliers Policies
CREATE POLICY "Public can view active seasonal multipliers" ON public.seasonal_multipliers FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Authenticated users can manage seasonal multipliers" ON public.seasonal_multipliers FOR ALL TO authenticated USING (true);

-- 11. Addons Policies
CREATE POLICY "Public can view active addons" ON public.addons FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Authenticated users can manage addons" ON public.addons FOR ALL TO authenticated USING (true);

-- 12. Drivers Policies
CREATE POLICY "Authenticated users can view and manage drivers" ON public.drivers FOR ALL TO authenticated USING (true);

-- 13. Bookings Policies
CREATE POLICY "Public can insert bookings" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Customers can track own booking" ON public.bookings FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage all bookings" ON public.bookings FOR ALL TO authenticated USING (true);

-- 14. Partners Policies
CREATE POLICY "Public can apply as partner" ON public.partners FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can manage partners" ON public.partners FOR ALL TO authenticated USING (true);

-- 15. Reviews Policies
CREATE POLICY "Public can view approved reviews" ON public.reviews FOR SELECT USING (is_approved = TRUE);
CREATE POLICY "Authenticated users can manage reviews" ON public.reviews FOR ALL TO authenticated USING (true);

-- 16. Page Content Policies
CREATE POLICY "Public can view page content" ON public.page_content FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage page content" ON public.page_content FOR ALL TO authenticated USING (true);
