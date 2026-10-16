-- ====================================================================
-- Royal Umrah Cabs - Seed Data
-- Phase 1 Foundation
-- ====================================================================

-- 1. SITE SETTINGS
INSERT INTO public.site_settings (
    lock_id,
    whatsapp_number,
    phone,
    email,
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
    ARRAY['Makkah', 'Madinah', 'Jeddah', 'Riyadh'],
    'https://g.page/r/CTL7ETeAhDVpEAI/review',
    4.9,
    12480,
    24,
    'fixed',
    '{
        "SAR": 1.0,
        "USD": 0.266,
        "MYR": 1.18,
        "GBP": 0.21,
        "EUR": 0.25,
        "EGP": 13.1
    }'::jsonb
) ON CONFLICT (lock_id) DO UPDATE SET
    whatsapp_number = EXCLUDED.whatsapp_number,
    phone = EXCLUDED.phone,
    email = EXCLUDED.email;

-- 2. VEHICLES (Staria, Yukon XL, Camry, HiAce, Coaster)
INSERT INTO public.vehicles (id, name, category, seats, bags, is_active, display_order, photos, features, translations)
VALUES
(
    'staria',
    'Hyundai Staria VIP',
    'Family Van',
    7,
    6,
    TRUE,
    1,
    '{"exterior": "/assets/images/staria_exterior.jpg", "interior": "/assets/images/staria_interior.jpg"}'::jsonb,
    ARRAY['Dual Zone AC', 'Chilled Zamzam Water', 'Fast USB-C Charging', 'Luggage Assistance', 'Reclining Comfort Seats'],
    '{
        "en": {"name": "Hyundai Staria VIP", "category": "Family Van", "description": "Space that breathes with you. Panoramic spacious cabin with individual executive reclining seats, dual-zone AC, and generous luggage capacity."},
        "ar": {"name": "هيونداي ستاريا VIP", "category": "فان عائلي فاخر", "description": "مساحة واسعة ورحابة استثنائية. مقصورة بانورامية بمقاعد منفصلة مريحة، تكييف مركزي قوي، ومساحة كافية لحقائب العائلة."},
        "ms": {"name": "Hyundai Staria VIP", "category": "Van Keluarga Premium", "description": "Keluasan dan keselesaan maksimum. Ruang kabin luas dengan tempat duduk boleh laras, penghawa dingin dwi-zon, dan muatan bagasi yang luas."}
    }'::jsonb
),
(
    'yukon',
    'GMC Yukon XL VIP',
    'VIP SUV',
    7,
    8,
    TRUE,
    2,
    '{"exterior": "/assets/images/yukon_exterior.jpg", "interior": "/assets/images/yukon_interior.jpg"}'::jsonb,
    ARRAY['Ultra-Quiet Cabin', 'Premium Leather', 'Chilled Zamzam Water', 'Executive Presence', 'Large Luggage Boot'],
    '{
        "en": {"name": "GMC Yukon XL VIP", "category": "VIP SUV", "description": "Where the journey slows down. Premium acoustic insulation, black leather upholstery, supreme road presence, and vast luggage volume."},
        "ar": {"name": "جي إم سي يوكن XL VIP", "category": "سيارة دفع رباعي VIP", "description": "قمة الفخامة والوقار في التنقل. عزل صوتي متفوق، مقاعد جلدية فاخرة، ومساحة خلفية ضخمة للحقائب والأمتعة."},
        "ms": {"name": "GMC Yukon XL VIP", "category": "SUV Mewah VIP", "description": "Puncak keselesaan dan prestij. Penebat bunyi premium, tempat duduk kulit mewah, dan ruang bagasi yang amat luas."}
    }'::jsonb
),
(
    'camry',
    'Toyota Camry Executive',
    'Executive Sedan',
    4,
    3,
    TRUE,
    3,
    '{"exterior": "/assets/images/camry_exterior.jpg", "interior": "/assets/images/camry_interior.jpg"}'::jsonb,
    ARRAY['Smooth Quiet Ride', 'Chilled Water', 'Cold AC', 'Ideal for Couples / Solo'],
    '{
        "en": {"name": "Toyota Camry Executive", "category": "Executive Sedan", "description": "Smooth, quiet, and reliable executive sedan for couples or small families up to 3-4 passengers with moderate luggage."},
        "ar": {"name": "تويوتا كامري بريميوم", "category": "سيدان تنفيذية", "description": "رحلة ناعمة، هادئة واقتصادية. مثالية للأفراد والأزواج والعائلات الصغيرة حتى 3 أو 4 ركاب مع حقائب معتدلة."},
        "ms": {"name": "Toyota Camry Executive", "category": "Sedan Eksekutif", "description": "Pilihan selesa dan tenang untuk pasangan atau keluarga kecil sehingga 4 penumpang dengan bagasi sederhana."}
    }'::jsonb
),
(
    'hiace',
    'Toyota HiAce VIP',
    'Mini Bus',
    10,
    10,
    TRUE,
    4,
    '{"exterior": "/assets/images/hiace_exterior.jpg", "interior": "/assets/images/hiace_interior.jpg"}'::jsonb,
    ARRAY['High Roof', 'Dedicated Center Aisle', 'Rear AC Vents', 'Massive Luggage Capacity'],
    '{
        "en": {"name": "Toyota HiAce VIP", "category": "Mini Bus", "description": "Together in comfort. High roof, spacious aisle, strong dual AC, and abundant room for 10 passengers with their full luggage set."},
        "ar": {"name": "تويوتا هاي إيس VIP", "category": "ميني باص عائلي", "description": "سفر العائلة معاً بكل طمأنينة. سقف مرتفع وممر مريح ومكيفات خلفية ومساحة تسع 10 ركاب مع جميع حقائبهم."},
        "ms": {"name": "Toyota HiAce VIP", "category": "Bas Mini", "description": "Perjalanan keluarga besar dengan selesa. Bumbung tinggi, laluan luas, penyaman udara belakang, dan muatan sehingga 10 penumpang."}
    }'::jsonb
),
(
    'coaster',
    'Toyota Coaster Coach',
    'Group Coach',
    21,
    20,
    TRUE,
    5,
    '{"exterior": "/assets/images/hiace_exterior.jpg", "interior": "/assets/images/hiace_interior.jpg"}'::jsonb,
    ARRAY['Commercial AC', 'Mic PA System', 'Overhead Luggage Racks', 'Professional Tour Chauffeur'],
    '{
        "en": {"name": "Toyota Coaster Coach", "category": "Group Coach", "description": "Premier group transport for Umrah delegations, large families, and travel agencies up to 21 passengers."},
        "ar": {"name": "تويوتا كوستر سياحي", "category": "حافلة ركاب متوسطة", "description": "الخيار الأمثل للوفود وحملات العمرة والعائلات الكبيرة حتى 21 راكباً مع حقائبهم كاملة."},
        "ms": {"name": "Toyota Coaster Coach", "category": "Bas Rombongan", "description": "Pengangkutan terbaik untuk kumpulan jemaah, rombongan agensi, dan keluarga besar sehingga 21 penumpang."}
    }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    category = EXCLUDED.category,
    seats = EXCLUDED.seats,
    bags = EXCLUDED.bags,
    is_active = EXCLUDED.is_active,
    photos = EXCLUDED.photos,
    features = EXCLUDED.features,
    translations = EXCLUDED.translations;

-- 3. ROUTES
INSERT INTO public.routes (id, origin_city, destination_city, origin_code, destination_code, estimated_duration_minutes, distance_km, miqat_stop_allowed, is_active, display_order, translations)
VALUES
(
    'jeddah-airport-to-makkah',
    'Jeddah',
    'Makkah',
    'JED',
    'MAK',
    75,
    95,
    FALSE, -- Flight arrivals typically assume Ihram on plane or at Miqat before flight
    TRUE,
    1,
    '{
        "en": {"title": "Jeddah Airport to Makkah Taxi", "desc": "Direct private airport pickup from King Abdulaziz International Airport (JED) to your hotel doorstep in Makkah."},
        "ar": {"title": "توصيل من مطار جدة إلى مكة المكرمة", "desc": "استقبال خاص ومباشر من صالات مطار الملك عبدالعزيز بجدة إلى باب فندقك في مكة المكرمة."},
        "ms": {"title": "Teksi Lapangan Terbang Jeddah ke Makkah", "desc": "Pengambilan terus dari Lapangan Terbang Antarabangsa King Abdulaziz (JED) ke pintu hotel anda di Makkah."}
    }'::jsonb
),
(
    'makkah-to-jeddah-airport',
    'Makkah',
    'Jeddah',
    'MAK',
    'JED',
    75,
    95,
    FALSE,
    TRUE,
    2,
    '{
        "en": {"title": "Makkah to Jeddah Airport Taxi", "desc": "Punctual departure transfer from your Makkah hotel to King Abdulaziz Airport (JED). Arrive relaxed 3 hours before flight."},
        "ar": {"title": "توصيل من مكة إلى مطار جدة", "desc": "نقل موثوق ودقيق بالمواعيد من فندقك بمكة إلى صالات المغادرة بمطار الملك عبدالعزيز بجدة."},
        "ms": {"title": "Teksi Makkah ke Lapangan Terbang Jeddah", "desc": "Penghantaran tepat pada masanya dari hotel Makkah ke Lapangan Terbang Jeddah untuk penerbangan pulang anda."}
    }'::jsonb
),
(
    'makkah-to-madinah',
    'Makkah',
    'Madinah',
    'MAK',
    'MED',
    270,
    440,
    TRUE, -- Stops at Bir Ali / Miqat can be configured
    TRUE,
    3,
    '{
        "en": {"title": "Makkah to Madinah Private Taxi", "desc": "Direct comfortable highway transfer between the two Holy Cities with optional prayer and rest stops."},
        "ar": {"title": "توصيل خاص من مكة إلى المدينة المنورة", "desc": "رحلة مريحة وسلسة عبر طريق الهجرة السريع بين الحرمين الشريفين مع استراحات مريحة."},
        "ms": {"title": "Teksi Persendirian Makkah ke Madinah", "desc": "Perjalanan selesa merentasi Lebuhraya Hijrah antara dua Tanah Suci dengan perhentian rehat yang selesa."}
    }'::jsonb
),
(
    'madinah-to-makkah',
    'Madinah',
    'Makkah',
    'MED',
    'MAK',
    270,
    440,
    TRUE, -- Complimentary stop at Miqat Dhu al-Hulayfah (Bir Ali) for Ihram
    TRUE,
    4,
    '{
        "en": {"title": "Madinah to Makkah Private Taxi", "desc": "Smooth journey with scheduled stop at Masjid Miqat Bir Ali (Dhu al-Hulayfah) to enter the state of Ihram and perform prayers."},
        "ar": {"title": "توصيل من المدينة إلى مكة مع التوقف بالميقات", "desc": "رحلة مباركة مع توقف مؤكد في مسجد ميقات ذي الحليفة (آبار علي) لعقد نية الإحرام وصلاة ركعتي الإحرام."},
        "ms": {"title": "Teksi Madinah ke Makkah (Singgah Miqat Bir Ali)", "desc": "Perjalanan lancar dengan singgah di Masjid Miqat Bir Ali untuk berniat Ihram sebelum meneruskan perjalanan ke Makkah."}
    }'::jsonb
),
(
    'madinah-airport-to-hotel',
    'Madinah',
    'Madinah',
    'MED_AIRPORT',
    'MED_HOTEL',
    30,
    25,
    FALSE,
    TRUE,
    5,
    '{
        "en": {"title": "Madinah Airport to Hotel Transfer", "desc": "Quick and dignified meet-and-greet pickup from Prince Mohammad Bin Abdulaziz Airport (MED) to Central Area hotels."},
        "ar": {"title": "توصيل من مطار المدينة إلى فنادق الحرم", "desc": "استقبال سريع وخاص من مطار الأمير محمد بن عبدالعزيز بالمدينة إلى فنادق المنطقة المركزية."},
        "ms": {"title": "Pengambilan Lapangan Terbang Madinah ke Hotel", "desc": "Pengambilan pantas dari Lapangan Terbang Madinah (MED) ke hotel sekitar Masjid Nabawi."}
    }'::jsonb
),
(
    'jeddah-to-madinah',
    'Jeddah',
    'Madinah',
    'JED',
    'MED',
    260,
    410,
    FALSE,
    TRUE,
    6,
    '{
        "en": {"title": "Jeddah to Madinah Direct Chauffeur", "desc": "Direct non-stop transfer from Jeddah Airport or hotel straight to Madinah Al-Munawwarah."},
        "ar": {"title": "توصيل مباشر من جدة إلى المدينة المنورة", "desc": "نقل خاص ومباشر من مطار أو فنادق جدة إلى المدينة المنورة دون عناء."},
        "ms": {"title": "Pengangkutan Terus Jeddah ke Madinah", "desc": "Penghantaran terus dari Jeddah ke Madinah Al-Munawwarah dengan selesa."}
    }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
    origin_city = EXCLUDED.origin_city,
    destination_city = EXCLUDED.destination_city,
    estimated_duration_minutes = EXCLUDED.estimated_duration_minutes,
    distance_km = EXCLUDED.distance_km,
    miqat_stop_allowed = EXCLUDED.miqat_stop_allowed,
    translations = EXCLUDED.translations;

-- 4. PRICES (route x vehicle matrix)
INSERT INTO public.prices (route_id, vehicle_id, price_sar)
VALUES
-- Jeddah Airport to Makkah
('jeddah-airport-to-makkah', 'camry', 200.00),
('jeddah-airport-to-makkah', 'staria', 260.00),
('jeddah-airport-to-makkah', 'yukon', 380.00),
('jeddah-airport-to-makkah', 'hiace', 340.00),
('jeddah-airport-to-makkah', 'coaster', 650.00),

-- Makkah to Jeddah Airport
('makkah-to-jeddah-airport', 'camry', 200.00),
('makkah-to-jeddah-airport', 'staria', 260.00),
('makkah-to-jeddah-airport', 'yukon', 380.00),
('makkah-to-jeddah-airport', 'hiace', 340.00),
('makkah-to-jeddah-airport', 'coaster', 650.00),

-- Makkah to Madinah
('makkah-to-madinah', 'camry', 450.00),
('makkah-to-madinah', 'staria', 500.00),
('makkah-to-madinah', 'yukon', 750.00),
('makkah-to-madinah', 'hiace', 650.00),
('makkah-to-madinah', 'coaster', 1200.00),

-- Madinah to Makkah (With Miqat Bir Ali stop)
('madinah-to-makkah', 'camry', 450.00),
('madinah-to-makkah', 'staria', 500.00),
('madinah-to-makkah', 'yukon', 750.00),
('madinah-to-makkah', 'hiace', 650.00),
('madinah-to-makkah', 'coaster', 1200.00),

-- Madinah Airport to Hotel
('madinah-airport-to-hotel', 'camry', 150.00),
('madinah-airport-to-hotel', 'staria', 200.00),
('madinah-airport-to-hotel', 'yukon', 300.00),
('madinah-airport-to-hotel', 'hiace', 270.00),
('madinah-airport-to-hotel', 'coaster', 550.00),

-- Jeddah to Madinah
('jeddah-to-madinah', 'camry', 680.00),
('jeddah-to-madinah', 'staria', 750.00),
('jeddah-to-madinah', 'yukon', 1050.00),
('jeddah-to-madinah', 'hiace', 950.00),
('jeddah-to-madinah', 'coaster', 1600.00)
ON CONFLICT (route_id, vehicle_id) DO UPDATE SET
    price_sar = EXCLUDED.price_sar;

-- 5. SEASONAL MULTIPLIERS
INSERT INTO public.seasonal_multipliers (name, multiplier, start_date, end_date, is_active)
VALUES
('Standard Rate', 1.00, NULL, NULL, TRUE),
('Umrah High Season', 1.15, '2026-11-01', '2027-01-15', FALSE),
('Ramadan Last 10 Nights', 1.35, '2027-03-20', '2027-03-31', FALSE),
('Hajj Season Peak', 1.50, '2027-05-15', '2027-06-05', FALSE);

-- 6. STARTER REVIEWS (Real pilgrim feedback from settings link)
INSERT INTO public.reviews (customer_name, country, rating, comment, language, is_approved)
VALUES
(
    'Haji Zulkifli & Keluarga',
    'Malaysia',
    5,
    'Alhamdulillah, perkhidmatan yang sangat memuaskan dari Lapangan Terbang Jeddah ke Makkah. Pemandu sangat sopan, kereta Staria yang luas dan bersih. Sangat disyorkan untuk jemaah dari Malaysia!',
    'ms',
    TRUE
),
(
    'Dr. Tariq Mahmood',
    'United Kingdom',
    5,
    'Booking from Birmingham was completely seamless. The driver was waiting at Terminal 1 with my name despite our flight delay. Spotless GMC Yukon XL. Truly respectful service.',
    'en',
    TRUE
),
(
    'أبو عبدالرحمن الشمري',
    'Saudi Arabia',
    5,
    'خدمة ممتازة ودقة عالية في المواعيد بين مكة والمدينة. السيارة نظيفة والتكييف بارد وتوفر ماء زمزم بارد. جزاكم الله خيراً على حسن التعامل.',
    'ar',
    TRUE
),
(
    'Bapak Hendra & Rombongan',
    'Indonesia',
    5,
    'Pelayanan istimewa dari Makkah ke Madinah. Singgah di Bir Ali untuk berniat Ihram tanpa tergesa-gesa. Air zamzam dingin tersedia. Sangat amanah dan ramah!',
    'ms',
    TRUE
);
