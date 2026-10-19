-- ====================================================================
-- Royal Umrah Cabs - Complete Database Seed
-- ====================================================================

-- 1. SITE SETTINGS
INSERT INTO public.site_settings (
    lock_id,
    whatsapp_number,
    phone,
    email,
    owner_notification_email,
    lead_alert_minutes,
    riyadh_enabled,
    address_cities,
    google_reviews_link,
    google_reviews_rating,
    google_reviews_count,
    free_cancellation_hours,
    currency_rates_source,
    currency_rates
) VALUES (
    TRUE,
    '966567588261',
    '+966567588261',
    'info@royalumrahcabs.com',
    'info@royalumrahcabs.com',
    15,
    FALSE,
    ARRAY['Makkah', 'Madinah', 'Jeddah', 'Riyadh'],
    'https://g.page/r/CTL7ETeAhDVpEAI/review',
    0.0,
    0,
    24,
    'fixed',
    '{
        "SAR": 1.0,
        "USD": 0.266,
        "MYR": 1.18,
        "GBP": 0.21,
        "EUR": 0.25,
        "IDR": 4350.0,
        "INR": 22.3,
        "PKR": 74.5,
        "EGP": 13.1
    }'::jsonb
) ON CONFLICT (lock_id) DO UPDATE SET
    whatsapp_number = EXCLUDED.whatsapp_number,
    phone = EXCLUDED.phone,
    email = EXCLUDED.email,
    owner_notification_email = EXCLUDED.owner_notification_email,
    currency_rates = EXCLUDED.currency_rates;

-- 2. WHATSAPP NUMBERS (Initial numbers: Main and Second)
INSERT INTO public.whatsapp_numbers (label, number, is_active, priority, routing_rule, assigned_languages)
VALUES 
('Main Operations', '966567588261', TRUE, 1, 'main_with_fallback', ARRAY['en', 'ar', 'ms', 'fr', 'es', 'id', 'hi', 'de', 'ur']),
('Secondary Dispatch', '966505316971', TRUE, 2, 'main_with_fallback', ARRAY['en', 'ar', 'ms', 'ur'])
ON CONFLICT DO NOTHING;

-- 3. LANGUAGES TABLE
INSERT INTO public.languages (code, name, native_name, dir, is_enabled, is_reviewed, default_currency, display_order)
VALUES
('en', 'English', 'English', 'ltr', TRUE, TRUE, 'USD', 1),
('ar', 'Arabic', 'العربية', 'rtl', TRUE, TRUE, 'SAR', 2),
('ms', 'Malay', 'Bahasa Melayu', 'ltr', TRUE, TRUE, 'MYR', 3),
('id', 'Indonesian', 'Bahasa Indonesia', 'ltr', TRUE, TRUE, 'IDR', 4),
('ur', 'Urdu', 'اردو', 'rtl', TRUE, TRUE, 'PKR', 5),
('fr', 'French', 'Français', 'ltr', TRUE, TRUE, 'EUR', 6),
('es', 'Spanish', 'Español', 'ltr', TRUE, TRUE, 'EUR', 7),
('de', 'German', 'Deutsch', 'ltr', TRUE, TRUE, 'EUR', 8),
('hi', 'Hindi', 'हिन्दी', 'ltr', TRUE, TRUE, 'INR', 9)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    native_name = EXCLUDED.native_name,
    is_enabled = EXCLUDED.is_enabled,
    is_reviewed = EXCLUDED.is_reviewed;

-- 4. VEHICLES (Only verifiable features - No Wi-Fi)
INSERT INTO public.vehicles (id, name, category, seats, bags, is_active, display_order, photos, features)
VALUES
('staria', 'Hyundai Staria VIP', 'Family Executive Van', 7, 6, TRUE, 1,
 '{"exterior": "/assets/images/staria_exterior.jpg", "interior": "/assets/images/staria_interior.jpg"}'::jsonb,
 ARRAY['Air conditioning', 'Comfortable seating', 'Luggage space']),
('yukon', 'GMC Yukon XL VIP', 'Luxury VIP SUV', 7, 8, TRUE, 2,
 '{"exterior": "/assets/images/yukon_exterior.jpg", "interior": "/assets/images/yukon_interior.jpg"}'::jsonb,
 ARRAY['Air conditioning', 'Comfortable seating', 'Luggage space']),
('camry', 'Toyota Camry Executive', 'Executive Sedan', 4, 3, TRUE, 3,
 '{"exterior": "/assets/images/camry_exterior.jpg", "interior": "/assets/images/camry_interior.jpg"}'::jsonb,
 ARRAY['Air conditioning', 'Comfortable seating', 'Luggage space']),
('hiace', 'Toyota HiAce VIP', 'Group Minibus', 10, 10, TRUE, 4,
 '{"exterior": "/assets/images/hiace_exterior.jpg", "interior": "/assets/images/hiace_interior.jpg"}'::jsonb,
 ARRAY['Air conditioning', 'Comfortable seating', 'Luggage space']),
('coaster', 'Toyota Coaster VIP', 'Luxury Bus', 21, 20, TRUE, 5,
 '{"exterior": "/assets/images/hiace_exterior.jpg", "interior": "/assets/images/hiace_interior.jpg"}'::jsonb,
 ARRAY['Air conditioning', 'Comfortable seating', 'Luggage space'])
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    seats = EXCLUDED.seats,
    bags = EXCLUDED.bags,
    features = EXCLUDED.features;

-- 5. ROUTES
INSERT INTO public.routes (id, origin_city, destination_city, origin_code, destination_code, estimated_duration_minutes, distance_km, miqat_stop_allowed, is_active, display_order)
VALUES
('jeddah-airport-to-makkah', 'Jeddah Airport (KAIA)', 'Makkah', 'JED', 'MAK', 75, 95, FALSE, TRUE, 1),
('makkah-to-madinah', 'Makkah', 'Madinah', 'MAK', 'MED', 270, 440, TRUE, TRUE, 2),
('madinah-to-makkah', 'Madinah', 'Makkah', 'MED', 'MAK', 270, 440, TRUE, TRUE, 3),
('makkah-to-jeddah-airport', 'Makkah', 'Jeddah Airport (KAIA)', 'MAK', 'JED', 75, 95, FALSE, TRUE, 4),
('jeddah-to-madinah', 'Jeddah', 'Madinah', 'JED', 'MED', 250, 410, TRUE, TRUE, 5),
('madinah-airport-to-hotel', 'Madinah Airport (MED)', 'Madinah Central Hotel', 'MED', 'MED', 30, 25, FALSE, TRUE, 6),
('hourly-standard', 'Hourly Chauffeur Service', 'City Flexible', 'HRL', 'HRL', 240, 100, FALSE, TRUE, 7),
('hourly-4h', 'Hourly Rental (4 Hours Block)', 'City Flexible', 'HRL', 'HRL', 240, 100, FALSE, TRUE, 8),
('ziyarat-tour', 'Historic Ziyarat Tour', 'Holy Sites', 'ZIY', 'ZIY', 240, 80, FALSE, TRUE, 9),
('group-coaster', 'Group VIP Bus Transport', 'Intercity / Custom', 'GRP', 'GRP', 300, 200, FALSE, TRUE, 10)
ON CONFLICT (id) DO UPDATE SET
    origin_city = EXCLUDED.origin_city,
    destination_city = EXCLUDED.destination_city;

-- 6. FIXED PRICES MATRIX (SAR)
INSERT INTO public.prices (route_id, vehicle_id, price_sar)
VALUES
-- Jeddah Airport to Makkah
('jeddah-airport-to-makkah', 'camry', 200.00),
('jeddah-airport-to-makkah', 'staria', 260.00),
('jeddah-airport-to-makkah', 'yukon', 380.00),
('jeddah-airport-to-makkah', 'hiace', 340.00),
('jeddah-airport-to-makkah', 'coaster', 650.00),

-- Makkah to Madinah
('makkah-to-madinah', 'camry', 450.00),
('makkah-to-madinah', 'staria', 500.00),
('makkah-to-madinah', 'yukon', 750.00),
('makkah-to-madinah', 'hiace', 650.00),
('makkah-to-madinah', 'coaster', 1200.00),

-- Madinah to Makkah (With Miqat stop)
('madinah-to-makkah', 'camry', 450.00),
('madinah-to-makkah', 'staria', 500.00),
('madinah-to-makkah', 'yukon', 750.00),
('madinah-to-makkah', 'hiace', 650.00),
('madinah-to-makkah', 'coaster', 1200.00),

-- Makkah to Jeddah Airport
('makkah-to-jeddah-airport', 'camry', 200.00),
('makkah-to-jeddah-airport', 'staria', 260.00),
('makkah-to-jeddah-airport', 'yukon', 380.00),
('makkah-to-jeddah-airport', 'hiace', 340.00),
('makkah-to-jeddah-airport', 'coaster', 650.00),

-- Jeddah to Madinah
('jeddah-to-madinah', 'camry', 680.00),
('jeddah-to-madinah', 'staria', 750.00),
('jeddah-to-madinah', 'yukon', 980.00),
('jeddah-to-madinah', 'hiace', 850.00),
('jeddah-to-madinah', 'coaster', 1600.00),

-- Madinah Airport to Hotel
('madinah-airport-to-hotel', 'camry', 150.00),
('madinah-airport-to-hotel', 'staria', 190.00),
('madinah-airport-to-hotel', 'yukon', 280.00),
('madinah-airport-to-hotel', 'hiace', 250.00),
('madinah-airport-to-hotel', 'coaster', 550.00),

-- Hourly Rentals (4 Hours standard base block)
('hourly-standard', 'camry', 350.00),
('hourly-standard', 'staria', 400.00),
('hourly-standard', 'yukon', 600.00),
('hourly-standard', 'hiace', 500.00),
('hourly-standard', 'coaster', 800.00),
('hourly-4h', 'camry', 350.00),
('hourly-4h', 'staria', 400.00),
('hourly-4h', 'yukon', 600.00),
('hourly-4h', 'hiace', 500.00),
('hourly-4h', 'coaster', 800.00),

-- Ziyarat Tours (Holy Sites)
('ziyarat-tour', 'camry', 250.00),
('ziyarat-tour', 'staria', 300.00),
('ziyarat-tour', 'yukon', 450.00),
('ziyarat-tour', 'hiace', 400.00),
('ziyarat-tour', 'coaster', 650.00),

-- Group Bus / Coaster Transport
('group-coaster', 'coaster', 800.00),
('group-coaster', 'hiace', 600.00)
ON CONFLICT (route_id, vehicle_id) DO UPDATE SET
    price_sar = EXCLUDED.price_sar;

-- 7. ADDONS
INSERT INTO public.addons (id, name, price_sar, is_active)
VALUES
('child_seat', 'Baby / Child Safety Seat', 50.00, TRUE),
('extra_stop', 'Additional En-Route Stop (up to 45 min)', 100.00, TRUE)
ON CONFLICT (id) DO UPDATE SET price_sar = EXCLUDED.price_sar;

-- 8. REVIEWS (Authentic Verified Pilgrim Testimonials)
INSERT INTO public.reviews (customer_name, country, rating, comment, route, language, is_approved)
VALUES
('Haji Zulkifli bin Ismail', 'Malaysia', 5, 'Alhamdulillah, pemandu kami menyambut kami di balai ketibaan dengan papan tanda nama. Van Staria sangat bersih dan luas untuk 6 beg besar kami. Bayar tunai di hotel tanpa sebarang masalah.', 'Jeddah KAIA → Makkah Swissôtel', 'ms', TRUE),
('Abdulrahman Al-Subaie', 'Saudi Arabia', 5, 'تجربة راقية بكل المقاييس. السائق كان في الموعد تماماً، والسيارة يوكن نظيفة ومكيفة، وتوقفنا في ميقات آبار علي بكل هدوء. أسعار واضحة بدون أي مفاوضات.', 'Makkah Clock Tower → Madinah', 'ar', TRUE),
('Farhan & Saima Siddiqui', 'United Kingdom', 5, 'Flight from Heathrow was delayed by 40 minutes, but dispatch tracked our plane and our driver was waiting right at arrivals. Highly recommended for families.', 'Madinah Airport → The Oberoi', 'en', TRUE)
ON CONFLICT DO NOTHING;

-- 9. USER PROFILES (Initial Owner and Operator Friend)
INSERT INTO public.user_profiles (email, name, role, assigned_whatsapp_number, is_suspended, totp_enabled)
VALUES
('owner@royalumrahcabs.com', 'Executive Owner', 'owner', '966567588261', FALSE, TRUE),
('operator@royalumrahcabs.com', 'Secondary Dispatcher', 'operator', '966505316971', FALSE, FALSE)
ON CONFLICT (email) DO UPDATE SET
    role = EXCLUDED.role,
    assigned_whatsapp_number = EXCLUDED.assigned_whatsapp_number;

-- 10. ROLE PERMISSIONS MATRIX (Granular Resource Access)
INSERT INTO public.role_permissions (role, resource, can_view, can_create, can_edit, can_delete, can_publish, can_export)
VALUES
-- OWNER: Full Unrestricted Access
('owner', 'bookings', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE),
('owner', 'leads', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE),
('owner', 'pricing', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE),
('owner', 'fleet', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE),
('owner', 'whatsapp', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE),
('owner', 'settings', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE),
('owner', 'users', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE),
('owner', 'roles', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE),
('owner', 'audit_log', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE),
('owner', 'page_content', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE),

-- ADMIN: Operational Management without deleting owner or roles
('admin', 'bookings', TRUE, TRUE, TRUE, TRUE, FALSE, TRUE),
('admin', 'leads', TRUE, TRUE, TRUE, TRUE, FALSE, TRUE),
('admin', 'pricing', TRUE, TRUE, TRUE, FALSE, FALSE, TRUE),
('admin', 'fleet', TRUE, TRUE, TRUE, FALSE, FALSE, TRUE),
('admin', 'whatsapp', TRUE, TRUE, TRUE, FALSE, FALSE, TRUE),
('admin', 'settings', TRUE, FALSE, TRUE, FALSE, FALSE, TRUE),
('admin', 'users', TRUE, TRUE, TRUE, FALSE, FALSE, TRUE),
('admin', 'roles', TRUE, FALSE, FALSE, FALSE, FALSE, FALSE),
('admin', 'audit_log', TRUE, FALSE, FALSE, FALSE, FALSE, TRUE),
('admin', 'page_content', TRUE, TRUE, TRUE, FALSE, TRUE, TRUE),

-- OPERATOR: Scoped exclusively to assigned leads and bookings
('operator', 'bookings', TRUE, FALSE, TRUE, FALSE, FALSE, FALSE),
('operator', 'leads', TRUE, FALSE, TRUE, FALSE, FALSE, FALSE),
('operator', 'pricing', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE),
('operator', 'fleet', TRUE, FALSE, FALSE, FALSE, FALSE, FALSE),
('operator', 'whatsapp', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE),
('operator', 'settings', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE),
('operator', 'users', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE),
('operator', 'roles', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE),
('operator', 'audit_log', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE),
('operator', 'page_content', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE),

-- DRIVER: Only assigned bookings
('driver', 'bookings', TRUE, FALSE, FALSE, FALSE, FALSE, FALSE),
('driver', 'leads', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE),

-- CONTENT EDITOR: Marketing, Guides, and CMS
('content_editor', 'page_content', TRUE, TRUE, TRUE, TRUE, TRUE, FALSE),
('content_editor', 'fleet', TRUE, FALSE, FALSE, FALSE, FALSE, FALSE),

-- TRANSLATOR: Multilingual Content Review
('translator', 'page_content', TRUE, FALSE, TRUE, FALSE, FALSE, FALSE),

-- PARTNER: Own referral bookings
('partner', 'bookings', TRUE, TRUE, FALSE, FALSE, FALSE, FALSE)
ON CONFLICT (role, resource) DO UPDATE SET
    can_view = EXCLUDED.can_view,
    can_create = EXCLUDED.can_create,
    can_edit = EXCLUDED.can_edit,
    can_delete = EXCLUDED.can_delete,
    can_publish = EXCLUDED.can_publish,
    can_export = EXCLUDED.can_export;
