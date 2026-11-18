# DUYUF AL RAHMAN VIP — Royal Immersion audit and preview implementation

Date: 2026-11-18
Target: \`feature/royal-immersion-qa-preview-20261118\`
Production policy: **NO production deployment, migration, database write or public URL promotion.**

## Verified architecture
- Next.js 15.5.28 App Router, React 18, TypeScript, Tailwind; existing Supabase-backed data services.
- \`src/app/[locale]/page.tsx\` preserves the original eight other-language homepage routes. The Arabic and English Royal Immersion experience is a review-only design, not a completed ten-locale rollout.
- \`src/lib/pricing-db.ts\` loads the approved pricing matrix and enforces authoritative fares; direct-booking vehicles derive from \`APPROVED_5_FLEET\`.
- \`BookingWizard\` and \`BookingEngine\` remain the source of booking validation and persistence. The homepage forwards selected route, vehicle, date/time and passengers via the existing \`/[locale]/booking\` URL.
- Five primary fleet models are unchanged. Concierge-only Maybach/H1 are not in the direct-booking selector.
- The existing locale layout owns canonical/hreflang, global Header, Footer, CurrencyProvider, structured data and WhatsApp utilities.

## Design changes under review
1. Film-backed full-bleed hero uses \`/assets/homepage-v2/hero.mp4\` and \`hero-mobile.mp4\` with their approved poster; no generated stock assets.
2. Ivory (#F7F5F0), white (#FFF), navy (#101827), bronze (#A97B27), and gray (#E8E6E0). Distinct alternating chapters, not one uniform dark/gold layout.
3. Original cinematic opening, route-specific pricing entry, three-step explanation, interactive story, five-vehicle photographic showroom, interior/cabin chapter, editorial route atlas, service/ziyarat/chauffeur chapters, real published-review view, localized FAQ and closing CTA.
4. Pickup and destination selectors resolve to a **limited set of approved route IDs** and never generate unpriced arbitrary route combinations. The existing booking flow remains authoritative.
5. Responsive design focuses on 375/390/430, 768, 1024, 1440px. Touch-friendly controls, reduced-motion poster fallback, semantic heading hierarchy and accessible buttons are included as code targets. Real device/browser screenshots remain a separate acceptance gate.

## Important design and technical risks
- The original three inspirational videos and the full-height screenshot are **not directly retrievable from this turn**. Their timestamps, frame-by-frame motion and exact video crop cannot honestly be claimed as validated. The authentic project video files are present in the repository, but frame-by-frame visual inspection remains pending.
- GSAP/ScrollTrigger has **not yet been added**; the code currently uses short CSS transitions and the project's existing interactions. Do not claim a completed GSAP motion system.
- The full site-wide reskin and all ten-language rewrite have not been completed. Existing eight non-Arabic/English homepages retain original localized content to avoid a partial English-language rollout.
- Verify that opening the page on an actual 375px browser does not truncate the hero's CTA, header controls or pickup/destination form. Also verify reduced-motion and dark/light headers.
- Review POST must return a non-2xx error if Supabase fails rather than a fabricated success (security/UX change isolated on this preview).
- No real booking or real review submission should be sent during QA; use read-only endpoint checks and form-navigation tests only.

## Release gates
- Run \`npm run build\` (executes tests, translation checks, TypeScript/Next build).
- Fetch previews \`/ar\`, \`/en\`, \`/ar/fleet\`, \`/ar/booking\`, \`/ms\` and confirm 200 status.
- Inspect \`x-robots-tag\` and locale canonicals/hreflang via browser; do not change production SEO metadata.
- Perform actual browser screenshots and interaction testing before promotion; any deployment status alone is not visual QA.
- Check that the current production deployment and branch \`main\` remain unmodified.

## Approval
Preview only. Do not merge or promote without explicit owner approval after visual review.
