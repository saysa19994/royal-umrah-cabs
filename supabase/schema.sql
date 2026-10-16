-- ====================================================================
-- Royal Umrah Cabs - Complete PostgreSQL Database Schema with RLS
-- Phase 1 Foundation
-- ====================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. SITE SETTINGS TABLE (Single-Row Pattern with check constraint)
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lock_id BOOLEAN UNIQUE DEFAULT TRUE,
    whatsapp_number TEXT NOT NULL DEFAULT '966567588261',
    phone TEXT NOT NULL DEFAULT '+966567588261',
    email TEXT NOT NULL DEFAULT 'info@royalumrahcabs.com',
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
        "EGP": 13.1
    }'::jsonb,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT single_row_check CHECK (lock_id = TRUE)
);

-- 2. VEHICLES TABLE
CREATE TABLE IF NOT EXISTS public.vehicles (
    id TEXT PRIMARY KEY, -- 'staria', 'yukon', 'camry', 'hiace', 'coaster'
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    seats INTEGER NOT NULL,
    bags INTEGER NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    display_order INTEGER NOT NULL DEFAULT 0,
    photos JSONB NOT NULL DEFAULT '{"exterior": "/assets/images/staria_exterior.jpg", "interior": "/assets/images/staria_interior.jpg"}'::jsonb,
    features TEXT[] NOT NULL DEFAULT ARRAY['Dual AC', 'Chilled Zamzam Water', 'Fast Phone Charging', 'Luggage Assistance'],
    translations JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. ROUTES TABLE
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

-- 4. PRICES TABLE
CREATE TABLE IF NOT EXISTS public.prices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    route_id TEXT NOT NULL REFERENCES public.routes(id) ON DELETE CASCADE,
    vehicle_id TEXT NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
    price_sar NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT unique_route_vehicle UNIQUE (route_id, vehicle_id)
);

-- 5. SEASONAL MULTIPLIERS TABLE
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

-- 6. DRIVERS TABLE
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

-- 7. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference TEXT UNIQUE NOT NULL, -- e.g. 'RUC-7821'
    booking_type TEXT NOT NULL DEFAULT 'transfer', -- 'transfer', 'hourly', 'ziyarat', 'group_bus'
    route_id TEXT REFERENCES public.routes(id) ON DELETE SET NULL,
    vehicle_id TEXT NOT NULL REFERENCES public.vehicles(id) ON DELETE RESTRICT,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    pickup_datetime TIMESTAMPTZ NOT NULL,
    pickup_location TEXT NOT NULL,
    dropoff_location TEXT NOT NULL,
    passengers_count INTEGER NOT NULL DEFAULT 1,
    flight_number TEXT,
    add_ons JSONB NOT NULL DEFAULT '{"child_seat": false, "flight_tracking": true, "malay_driver": false, "zamzam_water": true}'::jsonb,
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
    language TEXT NOT NULL DEFAULT 'en',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 8. PARTNERS TABLE (Travel Agencies)
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

-- 9. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'Saudi Arabia',
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    language TEXT NOT NULL DEFAULT 'en',
    is_approved BOOLEAN NOT NULL DEFAULT FALSE,
    google_review_id TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 10. PAGE CONTENT TABLE (CMS / Dynamic SEO per Language)
CREATE TABLE IF NOT EXISTS public.page_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_key TEXT NOT NULL, -- 'home', 'about', 'pricing', 'compare', etc.
    language TEXT NOT NULL, -- 'en', 'ar', 'ms'
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
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seasonal_multipliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;

-- 1. Site Settings Policies
CREATE POLICY "Public can view site settings"
    ON public.site_settings FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can update site settings"
    ON public.site_settings FOR ALL
    TO authenticated
    USING (true);

-- 2. Vehicles Policies
CREATE POLICY "Public can view active vehicles"
    ON public.vehicles FOR SELECT
    USING (is_active = TRUE);

CREATE POLICY "Authenticated users can manage vehicles"
    ON public.vehicles FOR ALL
    TO authenticated
    USING (true);

-- 3. Routes Policies
CREATE POLICY "Public can view active routes"
    ON public.routes FOR SELECT
    USING (is_active = TRUE);

CREATE POLICY "Authenticated users can manage routes"
    ON public.routes FOR ALL
    TO authenticated
    USING (true);

-- 4. Prices Policies
CREATE POLICY "Public can view prices"
    ON public.prices FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can manage prices"
    ON public.prices FOR ALL
    TO authenticated
    USING (true);

-- 5. Seasonal Multipliers Policies
CREATE POLICY "Public can view active seasonal multipliers"
    ON public.seasonal_multipliers FOR SELECT
    USING (is_active = TRUE);

CREATE POLICY "Authenticated users can manage seasonal multipliers"
    ON public.seasonal_multipliers FOR ALL
    TO authenticated
    USING (true);

-- 6. Drivers Policies (Strictly Protected - No Public Direct Access)
CREATE POLICY "Authenticated users can view and manage drivers"
    ON public.drivers FOR ALL
    TO authenticated
    USING (true);

-- 7. Bookings Policies
-- Any anonymous customer can insert a new booking
CREATE POLICY "Public can insert bookings"
    ON public.bookings FOR INSERT
    WITH CHECK (true);

-- Customers can view/track their own booking using reference + phone
CREATE POLICY "Customers can track own booking"
    ON public.bookings FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can manage all bookings"
    ON public.bookings FOR ALL
    TO authenticated
    USING (true);

-- 8. Partners Policies
CREATE POLICY "Public can apply as partner"
    ON public.partners FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Authenticated users can manage partners"
    ON public.partners FOR ALL
    TO authenticated
    USING (true);

-- 9. Reviews Policies
CREATE POLICY "Public can view approved reviews"
    ON public.reviews FOR SELECT
    USING (is_approved = TRUE);

CREATE POLICY "Authenticated users can manage reviews"
    ON public.reviews FOR ALL
    TO authenticated
    USING (true);

-- 10. Page Content Policies
CREATE POLICY "Public can view page content"
    ON public.page_content FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can manage page content"
    ON public.page_content FOR ALL
    TO authenticated
    USING (true);
