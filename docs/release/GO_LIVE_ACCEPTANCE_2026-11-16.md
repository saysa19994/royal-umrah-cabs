# DUYUF AL RAHMAN VIP — PREVIEW RELEASE ACCEPTANCE GATE
_Date: 2026-11-16 | Branch: `feature/duyuf-private-journey-review-20261116` | Production remains frozen_

## Owner-approved non-negotiables
- Payment **cash directly to driver after journey completion** in **SAR or USD** only; zero advance/deposit; no card, POS, bank transfer or online payment.
- Fixed vehicle fares include VAT, fuel, tolls, airport parking. Preserve the 10 official routes and approved fleet; Maybach / Hyundai H1 are concierge only.
- Ten independent localized experiences: ar, en, ms, id, ur, fr, es, de, tr, hi. Each indexable page needs genuine locale content, self-canonical and reciprocal hreflang. Do not redirect non-English canonical tags to English.
- Existing Supabase production database, admin permissions, and Vercel production domain must not be changed without an approved launch.
- The supplied homepage hero video, not stock video, with approved bilingual headline and mobile optimization.

## Confirmed via non-mutating preview checks
- Build succeeded for the branch, including unit tests, i18n checks, TypeScript/Next build, on commit `a68e970666578bdbc180d37f02f12afb1b08bdbd`.
- HTML GET returned 200 for all ten locale homepages; /en/booking, /en/fleet, /en/routes, /en/guides returned 200.
- /en and /ar H1 matched **Your Journey, Our Priority.** and **رحلتك تستحق عناية استثنائية.**
- Desktop/mobile hero media paths were present in the HTML. Files were confirmed present in the GitHub repository.
- Preview responses returned `X-Robots-Tag: noindex, nofollow` while keeping the official production-domain canonical.
- /en/pilgrims/indonesia returned meta robots `noindex, follow` because country editorial material is not yet approved.
- GET /api/bookings/draft?id=invalid returned 404, not a server error. This is **not** a successful Redis read/write test.
- Vercel project-environment key inventory only exposed Supabase variables; Upstash, Turnstile and Resend keys were **not visible in that result**. No secrets were retrieved.

## BLOCKERS — do not publish to the live domain until resolved
1. **Real Cloudflare Turnstile:** configure `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` for preview, with valid real credentials scoped to intended hostnames. Deployed runtimes reject dummy/test keys and fail closed. Test successful and expired challenges on 375/390/430px phones and desktop. Never send tokens in public logs.
2. **Distributed booking drafts:** configure `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` for a *separate preview Redis*, if keeping this feature. Verify POST /api/bookings/draft creates a 2-hour draft and GET retrieves it across distinct function instances. Verify expiry and failed-Redis UX. Existing query-parameter fallback remains available.
3. **Resend:** configure verified sender domain and `RESEND_API_KEY`, `BOOKING_FROM_EMAIL`, `BOOKING_NOTIFICATION_EMAIL` in preview; send an owner-approved test message. Verify customer and operations delivery, bounce handling and no payment instruction conflict. Provider acceptance is not inbox delivery.
4. **Database isolation:** preview might share the live Supabase project. Before any POST to /api/bookings, confirm separate preview project or a safe test mode with no real booking/customer records and no real WhatsApp notifications. Do not use customer data in tests.
5. **Editorial approvals:** all 15 country landing page records remain marked `draft, needs human review`; they are temporarily noindex/removed from sitemap. Review accuracy, native-language body, travel claims and conversion links; mark only individually verified records published.
6. **Visual QA:** review rendered homepage and complete four-step booking flow at 375, 390, 430, 768, 1024, 1440px, in Arabic RTL and all ten locales; video loading/contrast, visible Turnstile, touch targets, focus, animation and keyboard access. A successful build is not visual QA.
7. **Operational tests:** admin owner/admin/operator roles, price change persistence, booking confirmation and cancellation, flight number for airport pickup, WhatsApp handoff, logs and alerts, SEO sitemap/hreflang parity, mobile performance/Core Web Vitals.
8. **Monitoring:** inspect fresh GSC Coverage, Indexing and query metrics after controlled launch. Do not imply an SEO ranking or booking-volume guarantee without measured results.

## Safe smoke sequence (preview only)
1. Record exact commit SHA and verify Vercel `READY`, build/test logs, preview domain and its `noindex` header.
2. GET 10 locale roots; ensure status 200 and correct self-canonical. Check Arabic RTL, hero video sources, poster and copy.
3. GET routes, fleet, guides, booking, policy pages. No automated mutations.
4. Test invalid draft IDs and malformed/oversized chat bodies with a **separate test environment**; no customer data.
5. Once environment and database isolation are confirmed, perform a controlled booking journey and verify authoritative price, saved record, receipt/reference, distinct WhatsApp routing, notification acceptance and cancellation.
6. Compare production and preview rates and policy copy; approve owner-visible changes. Back up/record rollback instructions.
7. Only after an explicit release decision, prepare a tested production build with production environment, validate it and promote using the approved launch path.

## Go/no-go
**Current decision: NO GO for production.** Preview build/GET checks are green; secret-backed services, safe end-to-end booking, email deliverability, visual QA and human editorial review remain unverified. The production website must stay unchanged.
