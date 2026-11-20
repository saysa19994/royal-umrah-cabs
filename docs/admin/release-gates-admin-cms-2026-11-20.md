# Duyuf Al Rahman VIP — Admin CMS release gates
Date: 2026-11-20
Branch: `fix/site-controls-preview-ready-20261119`
Target: **Preview only**, never promote or merge by default.

## Verified facts

- `public.page_content` exists with `UNIQUE(page_key, language)`, RLS enabled and an `updated_at` timestamp. Read-only production inventory on 2026-11-20 returned **zero** rows; missing rows therefore use the existing in-code localized text until a legitimate administrator publishes an override.
- The production schema has no `public.faqs`. The current FAQ editor correctly stores `faq_item_<id>` in `page_content` with `language=all`. Do not apply the old `005_phase1_single_source_of_truth.sql` to production without reconciling that discrepancy; it creates incompatible parallel CMS tables.
- CMS edits now use a fresh authenticated admin read and versioned save. Conflict response is HTTP **409**; the UI must reload and manually reconcile instead of overwriting concurrent edits.
- FAQ editor refuses updates if the registry cannot be loaded and checks the stored question after save/archive.
- The website's published payments rule is **cash directly to the driver after completing the journey; no advance payment, credit card, POS, bank transfer, or online payment**.
- The existing original hero video remains code-controlled; this admin work must not replace the approved video.

## Production acceptance blockers

1. **Vercel deployment quota:** latest exact branch Preview cannot be declared READY until the actual current commit has a READY deployment and browser acceptance. A previous READY Preview at commit `8e244cb` is not equivalent.
2. **Staging isolation:** the Vercel project currently assigns its `NEXT_PUBLIC_SUPABASE_URL` environment value to Preview, Production, and Development. A preview deployment **must not be used for mutations** until its DB, Auth, Storage, and service-role key are isolated from production.
3. **Authentication:** production `auth.users` has one account; read-only counts found that account has NULL `confirmation_token`, `recovery_token`, and `email_change_token_new`. This is a diagnostic finding, **not** proof of a specific login root cause. Do not patch production auth columns until a verified restorable backup, owner authorization, and staging reproduction exist.
4. **Security advisors:** four public `SECURITY DEFINER` functions are callable by `anon` and `authenticated`: `is_staff()`, `is_staff_role(text[])`, and two operator-update trigger functions. `is_staff*` are referenced by many RLS policies; do not blindly revoke `authenticated` access without rewriting those policies. Password breach protection is also disabled. See the official Supabase linter and Auth settings.
5. **CMS breadth:** some bespoke page components, Riyadh/Taif hubs and localized long-form article bodies are not editable from the generic CMS. Never label these as fully live-editable.
6. **Durable audit:** `logAuditEvent` currently falls back to memory if its database insertion fails. Audit durability and event completeness must be confirmed in staging before launch.

## Required manual staging acceptance matrix

- Owner/admin auth, MFA enrollment/challenge, operator role denial, unauthorized content APIs.
- CMS edit AR page header/SEO; save → fresh DB read-back → public AR page reload → fresh HTML/metadata. Simulate a second editor with a stale `updated_at` and require 409, with zero silent overwrite.
- FAQ: add, edit, translate, hide, restore; confirm page and FAQPage JSON-LD exactly match published entries and previous deleted defaults do not return.
- Fleet image: upload licensed photo, assign to active Camry, reload home/fleet/details/booking on 375/390/430px and desktop, verify old image no longer displayed.
- Published fare: change authorized test fare (staging only), confirm pricing/booking/route/server quote all match; never change live rates as a test.
- Route and city: add localized city, publish approved route and fare; verify booking selector and disabled-state handling.
- Blog: create draft, publish Arabic+English, verify both featured image and article bodies, unpublish and confirm **404 and non-indexing**.
- Review signed-in audit entries, cache invalidation tags, regional metadata, self-canonical and reciprocal hreflang links.
- Verify no deposits/cards, no exposure of customer PII or service-role key.
- Roll back using known reviewed commit/build; never publish after only unit tests.

## Evidence and statuses

All code tests are useful indicators but **do not demonstrate authenticated save → database → refreshed visitor page** in an isolated browser session. Until staging acceptance is completed, this PR remains draft and is not release-approved.

Reference: https://supabase.com/docs/guides/database/database-linter?lint=0028_anon_security_definer_function_executable
Reference: https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection
