# Royal Immersion — Preview Implementation & Acceptance Record

**Project:** Duyuf Al Rahman VIP  
**Scope:** Preview branch only, no production deployment  
**Source branch:** `feature/signature-fusion-preview-20261117` at `fa2e8a386badb8ec6203f59876daff1f5c869a81`  
**Working branch:** `feature/royal-immersion-preview-20261118`

## Verified project baseline

- Next.js 15 App Router, TypeScript, Tailwind and shared 10-locale layout.
- Existing production homepage is not modified: all changes remain on an isolated Git branch.
- Previous preview used `SignatureFusionHomepage` for Arabic and English only; eight other languages used `JourneyArchitectHomepage`.
- Homepage source used real `getDbPricesCached()` and handed selected vehicles and route parameters to the existing `/[locale]/booking` page.
- Supabase reviews are published through the existing `/api/reviews` endpoint. Public reviews expose approval-filtered details.
- Shared `Header`, `Footer`, `CinematicFooterCta` and floating interaction UI are already rendered by `src/app/[locale]/layout.tsx`. A second preview footer/header inside the homepage duplicated the layout experience.
- Existing repository includes `design-references/VIDEO_REFERENCE_MAP.md`, `DUYUF_ADAPTATION_MATRIX.md`, 15 sets of extracted video frames and the original hero assets under `public/assets/homepage-v2`.

## Implemented in this preview iteration

1. Full-width cinematic hero now overlays its editorial headline onto existing hero video and responsive mobile footage. Uses existing poster fallback and reduced-motion poster treatment.
2. Reverted the preview's olive-led colors to the approved navy, ivory and bronze identity.
3. Removed the internal preview status chrome and nested HTML `main` and footer, leaving the existing actual global header/footer responsible for navigation.
4. Added editorial three-stage booking explanation, using the actual cash-after-completion business policy.
5. Added transport services as spacious image-led editorial rows, rather than repeated ecommerce cards.
6. Added a separate respectful Makkah/Madinah Ziyarat photography chapter using existing project assets.
7. Added full-width chauffeur-hospitality storytelling.
8. Added real published-customer testimonial retrieval from `/api/reviews` with an explicit no-data fallback; no fabricated reviews, ratings or names.
9. Added local dictionary-backed accessible FAQ accordions with their actual published translations and a link to the dedicated FAQ.
10. Preserved the actual fare lookup/vehicle eligibility logic and original booking engine handoff. Did not create online payments.

## Sections now included on Arabic and English preview homepage

Hero → real booking entry → benefit strip → three-step process → arrival/comfort/destination story → one-at-a-time fleet showroom → approved route atlas → services editorial → Makkah/Madinah Ziyarat → chauffeur hospitality → policy clarity → real customer voices → FAQs → final booking CTA → global footer.

## Reference and source provenance

- The repository's 15-video reference dossier identifies core ideas: cinematic video, curved hospitality photography, original fleet presentation, editorial route selection and image-led FAQ.
- The current task references three earlier videos, but those original three recordings were **not separately re-opened or visually reviewed** in this iteration. This document must not be described as fresh frame-by-frame verification of those three recordings.
- Existing `/assets/homepage-v2/hero.mp4` and `hero-mobile.mp4` were reused. A new video or new stock footage was not introduced.
- No unsupported 3D/360 claim was added, since a verified accurate licensed GLB or consistent full image sequence was not validated.

## Automated release guardrails

`scripts/test-royal-immersion-preview.mjs` checks the preview-only routing, real assets, no fabricated testimonials, genuine booking path, localized FAQ, responsive layout and brand palette. The script is included in the existing `npm test` chain as part of `npm run build`.

## Known work still outstanding before full executive acceptance

- Complete visual QA at 375, 390, 430, 768, 1024 and 1440 widths with actual browser screenshots and interaction recordings.
- GSAP ScrollTrigger motion choreography and reference-accurate scroll progression (not introduced until the end-to-end browsing/performance path can be verified).
- Full design-system rollout to route, fleet, service, Ziyarat, booking and article templates, instead of only the homepage.
- Properly native art-direction copy and UI for the remaining eight languages; this branch deliberately preserves their existing localized homepages rather than falling back to English.
- Read actual three original design-reference videos and record their precise keyframes if they become directly accessible.
- Confirmation of original source video authenticity; only existing repository path reuse is confirmed.
- Final independent functional checks for complex booking submission, flight-number persistence, admin controls and protected data.
- Lighthouse/Core Web Vitals measurements; no scores claimed without evidence.

## Release gate

**Do not merge to `master` or `main` and do not publish to `duyufalrahmanvip.com` without explicit owner approval.** Preview is for design review, further engineering and real browser QA.
