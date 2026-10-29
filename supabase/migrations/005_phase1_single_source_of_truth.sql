-- Migration 005: Phase 1 Single Source of Truth
-- Creates dedicated tables for faqs, media_library, fleet_images, and configures seed permissions and data.

-- 1. Dedicated FAQs Table with full 10-locale translation support & feature flag linkage
CREATE TABLE IF NOT EXISTS public.faqs (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL DEFAULT 'general',
    question_translations JSONB NOT NULL DEFAULT '{}'::jsonb,
    answer_translations JSONB NOT NULL DEFAULT '{}'::jsonb,
    feature_flag_key TEXT,
    answer_flag_off_translations JSONB NOT NULL DEFAULT '{}'::jsonb,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'draft', 'needs_owner_confirmation')),
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_operational BOOLEAN NOT NULL DEFAULT TRUE,
    last_verified_date TEXT NOT NULL DEFAULT 'October 2026',
    source TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read published faqs" ON public.faqs;
CREATE POLICY "Public read published faqs" ON public.faqs
  FOR SELECT TO anon, authenticated
  USING (status = 'published');

DROP POLICY IF EXISTS "Staff manage faqs" ON public.faqs;
CREATE POLICY "Staff manage faqs" ON public.faqs
  FOR ALL TO authenticated
  USING (public.is_staff_role(ARRAY['owner', 'admin']));

GRANT SELECT ON public.faqs TO anon, authenticated;
GRANT ALL ON public.faqs TO service_role;

-- 2. Media Library for Image Manager
CREATE TABLE IF NOT EXISTS public.media_library (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    file_url TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_size INTEGER,
    mime_type TEXT NOT NULL DEFAULT 'image/webp',
    category TEXT NOT NULL DEFAULT 'general',
    target_id TEXT,
    alt_translations JSONB NOT NULL DEFAULT '{}'::jsonb,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.media_library ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read media_library" ON public.media_library;
CREATE POLICY "Public read media_library" ON public.media_library
  FOR SELECT TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Staff manage media_library" ON public.media_library;
CREATE POLICY "Staff manage media_library" ON public.media_library
  FOR ALL TO authenticated
  USING (public.is_staff_role(ARRAY['owner', 'admin', 'content_editor']));

GRANT SELECT ON public.media_library TO anon, authenticated;
GRANT ALL ON public.media_library TO service_role;

-- 3. Fleet Images Gallery with Order & Interior/Exterior Types
CREATE TABLE IF NOT EXISTS public.fleet_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id TEXT NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
    image_type TEXT NOT NULL DEFAULT 'exterior' CHECK (image_type IN ('exterior', 'interior', 'hero')),
    url TEXT NOT NULL,
    alt_translations JSONB NOT NULL DEFAULT '{}'::jsonb,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.fleet_images ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read fleet_images" ON public.fleet_images;
CREATE POLICY "Public read fleet_images" ON public.fleet_images
  FOR SELECT TO anon, authenticated
  USING (is_active = TRUE);

DROP POLICY IF EXISTS "Staff manage fleet_images" ON public.fleet_images;
CREATE POLICY "Staff manage fleet_images" ON public.fleet_images
  FOR ALL TO authenticated
  USING (public.is_staff_role(ARRAY['owner', 'admin', 'content_editor']));

GRANT SELECT ON public.fleet_images TO anon, authenticated;
GRANT ALL ON public.fleet_images TO service_role;

-- 4. Site Settings enhancement (announcement translations & taif flag)
ALTER TABLE public.site_settings
  ADD COLUMN IF NOT EXISTS announcement_translations JSONB DEFAULT '{"en": "Fixed 2026 Umrah Season Rates Available • Free Cancellation up to 24h Before Arrival", "ar": "أسعار موسم العمرة 2026 مضمونة وثابتة • إمكانية الإلغاء المجاني حتى 24 ساعة قبل الموعد"}'::jsonb,
  ADD COLUMN IF NOT EXISTS taif_enabled BOOLEAN DEFAULT TRUE;

-- 5. Seed default operators if empty
INSERT INTO public.whatsapp_numbers (label, number, is_active, priority, routing_rule, assigned_languages)
VALUES
  ('Main Operations (Line 1)', '966567588261', TRUE, 1, 'main_with_fallback', ARRAY['en', 'ar', 'ms', 'id', 'ur', 'fr', 'es', 'de', 'tr', 'hi']),
  ('Secondary Dispatch (Line 2)', '966505316971', TRUE, 2, 'main_with_fallback', ARRAY['en', 'ar', 'ms', 'id', 'ur', 'fr', 'es', 'de', 'tr', 'hi'])
ON CONFLICT DO NOTHING;

-- 6. Role Permissions default matrix
INSERT INTO public.role_permissions (role, resource, can_view, can_create, can_edit, can_delete, can_publish, can_export)
VALUES
  ('operator', 'bookings', TRUE, FALSE, TRUE, FALSE, FALSE, FALSE),
  ('operator', 'leads', TRUE, FALSE, TRUE, FALSE, FALSE, FALSE),
  ('operator', 'whatsapp', TRUE, FALSE, FALSE, FALSE, FALSE, FALSE),
  ('operator', 'fleet', TRUE, FALSE, FALSE, FALSE, FALSE, FALSE),
  ('operator', 'reviews', TRUE, FALSE, FALSE, FALSE, FALSE, FALSE),
  ('owner', 'cms', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE),
  ('admin', 'cms', TRUE, TRUE, TRUE, FALSE, TRUE, TRUE),
  ('content_editor', 'cms', TRUE, TRUE, TRUE, FALSE, TRUE, FALSE),
  ('owner', 'media', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE),
  ('admin', 'media', TRUE, TRUE, TRUE, FALSE, TRUE, TRUE),
  ('content_editor', 'media', TRUE, TRUE, TRUE, FALSE, TRUE, FALSE)
ON CONFLICT DO NOTHING;
