# Existing website audit

**Project** Duyuf Al Rahman VIP · ضيوف الرحمن VIP
**Phase** 01 · Source and public-site baseline
**Repository** `saysa19994/royal-umrah-cabs`, branch `feature/royal-immersion-qa-preview-20261118`, baseline commit `4c1d2e4f`
**Evidence examined** Executive creative brief, preview source, repository media and read-only production responses

The supplied brief describes an approximately 373 px Arabic full-page capture. That image remains unavailable. The preview branch contains a different, approximately 390 px first-screen QA capture. The read-only production checks below establish a reproducible URL and SEO baseline.

## Existing experience described in the brief

| Customer journey | Existing elements described | Issue reported in the brief |
| --- | --- | --- |
| Discover | Announcement, navigation, airport and vehicle imagery, first booking entry | The current booking layout is cramped and the opening needs stronger visual direction |
| Understand | Trust benefits and three booking steps | The numbered columns feel generic |
| Compare | Popular routes, fleet images and fares, transportation benefits | The fleet presentation feels conventional |
| Explore | Makkah and Madinah Ziyarat, chauffeur welcome, reviews and FAQs | Preserve the subject matter and give each section a distinct visual role |
| Convert and get support | Final booking CTA, footer, WhatsApp and utility controls | The new layout must keep conversion and support actions easy to reach |

The brief also reports earlier design iterations looked like conventional websites with animation added. The current screenshot, motion behavior and layouts at other widths require direct review.

## Asset and system inventory

| Input | Access at audit | What to capture when available |
| --- | --- | --- |
| Executive brief | Available | Section requirements, palette, mandatory copy, acceptance criteria |
| Next.js source and lockfile | Inspected at preview commit `4c1d2e4f` | npm lockfile, Next.js 15.5.28, React 18.3, TypeScript 5.6, Tailwind 3.4, App Router and Vercel config |
| Full-page Arabic mobile screenshot | Pending | Original capture and viewport, navigation and content order, observed layout defects |
| Three reference videos | Exact recordings pending | The separate repository archive includes 90 timestamped stills from 15 recordings. See the reference deconstruction for observations linked to specific files. |
| Existing project hero | Inspected | Preview uses `public/assets/homepage-v2/hero.mp4`, its 960×540 mobile encode and the matching poster. Both MP4s were decoded and sampled. |
| Fleet, interior, chauffeur and destination images | Present in source | Five primary models have dedicated exterior and interior imagery under `public/assets/images/vehicles/`. The preview uses `public/assets/homepage-v2/` for chauffeur, cabin and destination imagery. Existing media approval governs reuse. |
| Routes, fares, categories and restrictions | Source traced | `src/lib/pricing-db.ts` and `pricing-constants.ts` govern fare precedence. `src/data/approved-fleet-homepage.ts` supplies five direct-booking models. Runtime preview integration requires verification. |
| Booking, WhatsApp, admin and Supabase | Source traced | `BookingEngine`, booking API, admin routes and Supabase review integration are present. Preview credentials and write verification remain pending. |
| Localization and public SEO | Source traced and sample production endpoints checked | `src/i18n/config.ts` declares 10 locales, with Arabic and Urdu RTL. Localized layout, middleware, sitemap and robots handlers retain URL and indexing rules. |
| Preview target | Vercel Git integration verified | The project links to the GitHub origin. Git deployments for this feature branch include READY commit `4c1d2e4f` and a separate previous QA build at `77bdc1c`. Recent production deploys are on `main`. |

## Verified implementation baseline

- `src/app/[locale]/page.tsx` serves the redesigned `SignatureFusionHomepage` for Arabic and English. Eight other locales have their existing `JourneyArchitectHomepage`. The preview therefore has two homepage designs at baseline.
- Within `src/components/fusion/`, the booking entry passes route, vehicle, date, time and passengers to `/[locale]/booking`. Fare and seating guards reference the rates and approved fleet constants. `getDbPricesCached` applies the authoritative transfer matrix over matching Supabase rows and explicitly excludes the inactive Riyadh Airport product.
- `BookingEngine` sends `flight_number`, the booking schema validates it, the POST route inserts it and the track endpoint reads it back. The inspected contract has no dedicated fields for airport, airline, arrival date or scheduled arrival time. Those four requirements need a compatible integration change.
- Public reviews pass through `getPublishedReviews`. The repository supports current `status` and legacy `is_approved` values. Verify both against the preview’s actual migration state and check the customer-experience fallback with zero published results.
- The repository includes localized public templates, a separate admin route group, global header/footer, structured data, booking tracking and management, WhatsApp UI and core pricing/locale tests. Use `npm ci`, `npm run typecheck`, `npm test`, `npm run check-i18n` and `npm run build` for repeatable baseline and final checks.
- The baseline preview copy includes a design-approval announcement and implementation language in the customer-visible homepage. Internal review status belongs outside customer-facing copy. Audit customer navigation and sitemap for design-lab links.
- On 18 November 2026, read-only GET requests returned 200 for production Arabic home, robots and sitemap. The Arabic page reported `lang=ar`, `dir=rtl`, `index, follow`, its self-canonical and the ten language alternates plus x-default. The sitemap index contains ten children. Robots allow public paths and disallow admin and API paths. [Arabic home](https://duyufalrahmanvip.com/ar) · [Robots](https://duyufalrahmanvip.com/robots.txt) · [Sitemap](https://duyufalrahmanvip.com/sitemap.xml)

## Read-only production sample

All 20 public page requests below returned 200, preserved the requested path as canonical, included 11 hreflang entries and reported `index, follow`.

| Page family | Paths sampled |
| --- | --- |
| Locale homepages | `/ar`, `/en`, `/ms`, `/ur` |
| Fleet and routes | `/ar/fleet`, `/ar/fleet/toyota-camry`, `/ar/routes`, `/ar/routes/jeddah-airport-to-makkah` |
| Services and company | `/ar/services`, `/ar/ziyarat`, `/ar/pricing`, `/ar/about`, `/ar/reviews` |
| Guides, booking and support | `/ar/guides`, `/ar/booking`, `/ar/faq`, `/ar/contact` |
| Policies | `/ar/cancellation`, `/ar/terms`, `/ar/privacy` |

The ten locale sitemap children returned 200 and contained 86 entries each, for 860 entries in total. These counts describe the observed production baseline on 18 November 2026. [Sitemap index](https://duyufalrahmanvip.com/sitemap.xml)

## Preview environment

The Vercel project has Preview-scoped Supabase URL, anonymous key, publishable key and service role settings. The feature branch has no branch-specific overrides in the environment metadata. Preview database isolation and write permissions remain unverified, so credential presence alone does not establish a safe end-to-end test target. The Git-linked baseline for this feature branch is a separate Vercel deployment. [Baseline preview](https://royal-umrah-cabs-d9s4mytlw-sayed6.vercel.app)

## Baseline still worth capturing

- Record live and preview examples for all existing page families, including deep routes, fleet, services, Ziyarat, pricing, about, reviews, guides, booking, FAQ, contact and policies. Save status, redirect target, canonical, hreflang, schema and sitemap inclusion.
- Diff existing exit paths and customer policies for cancellation, airport waiting, child seats, restricted services, WhatsApp, payment and legal links against the live project configuration.
- Verify isolated preview writes and readback only when the booking, notifications and review integrations point to an authorized testing environment. Redact customer information and integration credentials from evidence.

## Integration risks and acceptance checks

| Risk | Executable check after source and preview access |
| --- | --- |
| Wrong fare or newly bookable route | For the same active route, vehicle, passengers and date, compare authoritative calculator, listing fare, vehicle options and final summary. Exercise disabled and concierge-only routes and passenger limits through both the UI and existing validation path. |
| Booking payload regression | In an authorized preview test environment, complete an eligible ordinary transfer and an airport transfer. Compare submitted request with the stored record. Confirm airport, airline, flight number, arrival date and scheduled time follow the actual contract. Verify the regular transfer leaves airport-only fields inactive. |
| False success or duplicate records | Exercise positive response, validation failure, failed request and rapid repeat submission in the preview. Verify confirmation follows a successful backend result, failed entries remain correctable and repeat submissions follow the existing duplicate policy. |
| Payment and contact policy drift | Check that the published summary and localized FAQ agree with the approved cash-to-driver policy. Follow WhatsApp and contact links to the business destinations without sending a live message. |
| Missing localization or RTL defects | Visit each shipped locale through its real URL and change language on representative deep links. Verify dictionary completeness, translated form states and confirmations, language and direction attributes, field ordering, currency and number formatting, text wrapping and keyboard focus. Inspect Arabic and Urdu at mobile widths. |
| Regressed search visibility | Compare the before and after route snapshot by status, canonical, hreflang, metadata, schema and internal links. Compare sitemap coverage and robots behavior, including the preview’s access settings. |
| Hero crop or playback failure | Test approved video at all six requested widths, verify muted inline playback, MIME and poster fallback, then test reduced motion and a constrained network. Confirm important action and button contrast throughout the loop. |
| Keyboard, touch or motion failure | At 375, 390, 430, 768, 1024 and 1440 px, walk desktop and mobile navigation, route exploration, fleet selection, FAQs, booking focus and utility controls. Check horizontal scroll, overlap, reduced motion, focus visibility and any short pinned chapter after resize, orientation change and client-side navigation. |
| Performance or runtime regression | Build with the repository scripts. Run existing tests and capture the actual browser console and network failures. Measure preview and baseline on comparable desktop and mobile settings, recording LCP, CLS, main-thread behavior, request activity and hero media transfer where available. |
| Admin or review regression | Verify authorized admin access and relevant read/write behavior in the test environment. Check published, unpublished and empty review states. |
| Accidental production release | Identify preview origin and commit before testing. Keep test submissions isolated from live booking and notifications. The brief reserves the production domain for an explicitly approved release. |

## Evidence to attach after integration

- Report the exact tested commit, preview URL, browser and viewport, locale, evidence files, build and test output, console errors, performance observations, SEO deltas and known limitations.
- Save desktop and mobile full-page captures, dedicated hero, fleet and booking captures, and actual desktop and mobile recordings. Record one end-to-end bookable path, one blocked or failed booking path and the visible preview origin used for testing.
