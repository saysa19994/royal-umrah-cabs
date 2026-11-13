# DUYUF AL RAHMAN VIP — IMPLEMENTATION ROADMAP
## Document: IMPLEMENTATION_ROADMAP.md
### Location: `D:\royal-umrah-cabs\design-references\IMPLEMENTATION_ROADMAP.md`
### Version: 1.0.0 (Sequential Execution Protocol)
### Project: Duyuf Al Rahman VIP (`https://duyufalrahmanvip.com`)

---

## 1. Execution Principles & Protocol

This implementation follows the strict single-component, test-driven protocol mandated in **Section 10 (Phase B & C)** and **Section 11 (Visual Acceptance Tests)** of the Master Prompt:

1. **One Component at a Time:** Every component is implemented independently, tested, verified in a real headless browser across 6 viewports in both English (LTR) and Arabic (RTL), and requires explicit user approval before touching the next component.
2. **Strict Production Protection (Section 12):**
   - Work strictly on the local development branch (`seo-recovery-preview`).
   - Zero push to `main`, zero production deployment without explicit approval.
   - Zero modification of live Supabase database or production booking APIs.
   - Complete preservation of all 10 locales, existing pricing, cash-to-driver guarantee, and SEO canonical routes.
3. **No Fabricated Data:** Only authentic vehicle fleet models, real routes, and verified customer policies.

---

## 2. Prioritized 15-Component Roadmap

```
+---------------------------------------------------------------------------------------------------------+
| STEP 01 [CRITICAL]: Cinematic Travel Hero (Video 01)                                                    |
|      |                                                                                                  |
|      v (Requires User Approval)                                                                         |
| STEP 02 [CRITICAL]: Layered Premium Fleet Deck (Video 15)                                                |
|      |                                                                                                  |
|      v (Requires User Approval)                                                                         |
| STEP 03 [CRITICAL]: Cinematic Route Destination Slider (Video 04)                                       |
|      |                                                                                                  |
|      v (Requires User Approval)                                                                         |
| STEP 04 [HIGH]: Premium Transportation Service Editorial (Video 03)                                     |
|      |                                                                                                  |
|      v (Requires User Approval)                                                                         |
| STEP 05 [HIGH]: Curved Pilgrimage Destination Gallery (Video 02)                                        |
|      |                                                                                                  |
|      v (Requires User Approval)                                                                         |
| STEP 06 [HIGH]: Three-Step Journey Process (Video 05)                                                   |
|      |                                                                                                  |
|      v (Requires User Approval)                                                                         |
| STEP 07 [MED-HIGH]: Journey Service Orbit Interactive Hub (Video 07)                                    |
|      |                                                                                                  |
|      v (Requires User Approval)                                                                         |
| STEP 08 [HIGH]: Smart Vehicle & Journey Comparison (Video 08)                                           |
|      |                                                                                                  |
|      v (Requires User Approval)                                                                         |
| STEP 09 [HIGH]: Cinematic Journey Call To Action (Video 09)                                             |
|      |                                                                                                  |
|      v (Requires User Approval)                                                                         |
| STEP 10 [HIGH]: Image-Led Split FAQ Editorial (Video 10)                                                |
|      |                                                                                                  |
|      v (Requires User Approval)                                                                         |
| STEP 11 [HIGH]: Personal Concierge Contact Experience (Video 11)                                        |
|      |                                                                                                  |
|      v (Requires User Approval)                                                                         |
| STEP 12 [HIGH]: Stories From The Road (Verified Reviews) (Video 12)                                     |
|      |                                                                                                  |
|      v (Requires User Approval)                                                                         |
| STEP 13 [HIGH]: Deep Forest (#173F35) Cinematic Footer (Video 13)                                       |
|      |                                                                                                  |
|      v (Requires User Approval)                                                                         |
| STEP 14 [MED-HIGH]: Premium Interaction & Button Design Tokens (Video 14)                               |
|      |                                                                                                  |
|      v (Requires User Approval)                                                                         |
| STEP 15 [POLISH]: Comprehensive Visual Polish, Micro-Interactions & Final Verification                  |
+---------------------------------------------------------------------------------------------------------+
```

---

## 3. Milestone Specifications

| Step # | Milestone / Component | Priority | Reference Video | Target Page | Acceptance Gate |
|---|---|---|---|---|---|
| **01** | **Cinematic Travel Hero with Floating Reservation Bar** | **CRITICAL** | `11.11.2026_18.41.45_REC.mp4` | Homepage (Hero) | Full video hero, left 50% text, overlapping white bar, responsive 720p mobile, 0 layout shift, all 6 viewports verified. |
| **02** | **Layered Premium Fleet Deck** | **CRITICAL** | `12.11.2026_03.31.31_REC.mp4` | Homepage & Fleet | 5 verified models (Camry, Staria, Yukon XL, HiAce, Coaster), realistic shadows, card elevation, no Ferrari/GLB. |
| **03** | **Cinematic Route Destination Slider** | **CRITICAL** | `11.11.2026_18.52.27_REC.mp4` | Homepage & Routes | Full-bleed highway vistas, exact SAR pricing, duration indicators, direct pre-fill into BookingEngine. |
| **04** | **Premium Transportation Service Editorial** | **HIGH** | `11.11.2026_18.45.02_REC.mp4` | Homepage & Services | 45/55 asymmetric split, Warm Ivory background, high-res vehicle interior macros, white-glove chauffeur standards. |
| **05** | **Curved Pilgrimage Destination Gallery** | **HIGH** | `11.11.2026_18.43.34_REC.mp4` | Homepage & Guides | Arched architectural frames, smooth horizontal drag/scrub, sacred landmarks (Haram, Nabawi, Quba). |
| **06** | **Three-Step Journey Process** | **HIGH** | `12.11.2026_03.14.51_REC.mp4` | Homepage | 1. Reserve Journey, 2. Chauffeur Terminal Meeting, 3. Pay Driver in Cash Upon Arrival (0% advance payment). |
| **07** | **Journey Service Orbit** | **MED-HIGH** | `12.11.2026_03.17.55_REC.mp4` | Homepage & Services | Interactive radial explorer with 5 service nodes, pricing preview, responsive mobile segmented tabs. |
| **08** | **Smart Vehicle & Journey Comparison** | **HIGH** | `12.11.2026_03.20.23_REC.mp4` | Fleet & Booking | Party size & luggage filter, honest trunk fit dimensions, Maybach concierge banner. |
| **09** | **Cinematic Journey Call To Action** | **HIGH** | `12.11.2026_03.22.34_REC.mp4` | Homepage (Pre-Footer) | Twilight highway panorama, high emotional resonance, dual "Book Online" and "WhatsApp Concierge" CTAs. |
| **10** | **Image-Led Split FAQ** | **HIGH** | `12.11.2026_03.24.53_REC.mp4` | Homepage & FAQ | Left sticky photo portrait, right accessible accordion answering flight delay, payment, child seats. |
| **11** | **Personal Concierge Contact Experience** | **HIGH** | `12.11.2026_03.26.27_REC.mp4` | Contact & Concierge Drawer | Official transport license badge, under 5-min reply time, pre-formatted WhatsApp routing. |
| **12** | **Stories From The Road** | **HIGH** | `12.11.2026_03.27.54_REC.mp4` | Homepage & Reviews | Genuine traveler quotes from UK, US, Indonesia, Malaysia; no fake metrics. |
| **13** | **Deep Forest Cinematic Footer** | **HIGH** | `12.11.2026_03.29.25_REC.mp4` | Global Footer | Deep Forest Green (#173F35), 4-column directory, pb-40 mobile collision avoidance, 10 locales. |
| **14** | **Premium Interaction & Button System** | **MED-HIGH** | `12.11.2026_03.30.31_REC.mp4` | Global Design Tokens | Standardized button states, 48px touch targets, subtle sheen, 4.5:1 WCAG contrast rings. |
| **15** | **Comprehensive Visual Polish & Audit** | **POLISH** | All References | Global App | Full-page CDP captures across all 6 viewports, zero overlap check, final performance audit. |

---

## 4. Verification Checkpoints for Every Milestone

Every single milestone must pass the following 7-point quality gate:
1. `npx tsc --noEmit` (Zero TypeScript errors)
2. `npm run check-i18n` (All 10 locale dictionaries synchronized)
3. `npm test` (All unit and component tests passing)
4. `npm run build` (Production build succeeds with zero errors)
5. Headless Chrome/Edge CDP visual capture across:
   - Desktop: 1920px, 1440px, 1280px
   - Tablet: 768px
   - Mobile: 430px, 390px
6. Visual inspection in both English (LTR) and Arabic (RTL) ensuring:
   - Zero horizontal scroll / overflow
   - Zero overlapping floating elements
   - Flawless typography and image rendering
7. **MANDATORY STOP:** Submit full visual and technical evidence to user and pause for approval.

---
*Authored by Chief Executive AI Agent & Principal Experience Architect, Duyuf Al Rahman VIP.*
