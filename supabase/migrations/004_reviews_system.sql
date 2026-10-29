-- Migration 004: Public Customer Reviews System
-- Enhances public.reviews table with moderation status, verified bookings, and robust RLS

-- 1. Ensure public.reviews has status and verification columns
ALTER TABLE public.reviews
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'published', 'rejected')),
  ADD COLUMN IF NOT EXISTS service_type TEXT DEFAULT 'airport_transfer',
  ADD COLUMN IF NOT EXISTS booking_reference TEXT,
  ADD COLUMN IF NOT EXISTS is_verified_booking BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS admin_notes TEXT,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now());

-- 2. Backfill status from is_approved
UPDATE public.reviews
SET status = 'published'
WHERE is_approved = TRUE AND (status IS NULL OR status = 'pending');

-- 3. Synchronize status and is_approved via database trigger
CREATE OR REPLACE FUNCTION public.sync_review_status_and_approval()
RETURNS TRIGGER AS $$
BEGIN
  -- Strict alignment: published means is_approved=true; pending/rejected means is_approved=false
  IF NEW.status = 'published' THEN
    NEW.is_approved := TRUE;
  ELSE
    NEW.is_approved := FALSE;
  END IF;
  NEW.updated_at := timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_sync_review_status ON public.reviews;
CREATE TRIGGER trg_sync_review_status
  BEFORE INSERT OR UPDATE ON public.reviews
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_review_status_and_approval();

-- 4. Enable Row Level Security
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies
-- Public can ONLY read published reviews (status = 'published' AND is_approved = TRUE)
DROP POLICY IF EXISTS "Public read approved reviews" ON public.reviews;
DROP POLICY IF EXISTS "Public read published reviews" ON public.reviews;
CREATE POLICY "Public read published reviews" ON public.reviews
  FOR SELECT TO anon, authenticated
  USING (status = 'published' AND is_approved = TRUE);

-- Staff (owner, admin) can read and manage all reviews
DROP POLICY IF EXISTS "Staff manage reviews" ON public.reviews;
CREATE POLICY "Staff manage reviews" ON public.reviews
  FOR ALL TO authenticated
  USING (public.is_staff_role(ARRAY['owner', 'admin']));

-- Direct public insert policy: strictly restricted to pending status and is_approved = false
DROP POLICY IF EXISTS "Public submit pending reviews" ON public.reviews;
CREATE POLICY "Public submit pending reviews" ON public.reviews
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    (status = 'pending' OR status IS NULL)
    AND (is_approved = FALSE OR is_approved IS NULL)
  );

-- 6. Permissions and Grants
GRANT SELECT, INSERT ON public.reviews TO anon, authenticated;
GRANT ALL ON public.reviews TO service_role;

-- 7. Add reviews resource to role_permissions for owner and admin
INSERT INTO public.role_permissions (role, resource, can_view, can_create, can_edit, can_delete, can_publish, can_export)
VALUES
  ('owner', 'reviews', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE),
  ('admin', 'reviews', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE)
ON CONFLICT (role, resource) DO UPDATE SET
  can_view = EXCLUDED.can_view,
  can_edit = EXCLUDED.can_edit,
  can_delete = EXCLUDED.can_delete,
  can_publish = EXCLUDED.can_publish;
