# DUYUF AL RAHMAN VIP — 15-video sitewide adaptation / 17 November 2026

## This is an implementation matrix, not a claim of browser visual acceptance
Source: owner-supplied fifteen recordings inside \`12.11.2026_03.30.31_REC.zip\`, original \`duyuf_vip_15_video_design_adaptation_blueprint.md\`, two owner HTML references, and mobile screenshots \`1000201230.jpg\`, \`1000201228.jpg\`, \`1000201226.jpg\`.

| Video | Observed pattern | Correct site placement | Actual implementation / conscious omission |
|---|---|---|---|
| 01 | Cinematic hero, sequential story | Home | Owner-approved original hero video + \`SignatureJourneyHomepage\` four image chapters, pinned on desktop, manual on mobile |
| 02 | Curved photo orbit | /ziyarat | \`ZiyaratArcGallery\` five approved location images, scroll/swipe/controls, no duplicate on homepage |
| 03 | Asymmetric service cards | /services | \`ServiceChapterExplorer\` six real services rendered in one focus panel, horizontal tabs on mobile |
| 04 | Destination spotlight changing scenes | /routes + home | \`RouteSpotlightExplorer\` + homepage \`FEATURED_ROUTE_IMAGES\`, authoritative route fares |
| 05 | Multi-step process changing with scroll | Home + /booking | Four-stage journey (arrival, comfort, eligible Miqat, destination) + real \`BookingWizard\` |
| 06 | Curved panoramic rail | /fleet/[slug] | \`VehicleGallery\` real exterior/interior images, horizontally snapping thumbs |
| 07 | Orbit around headline/services | /about | Responsive low-motion \`serviceOrbit\` facts integrated with brand story, not empty spinning bubbles |
| 08 | Giant numerical proof | /about | REAL 60 min airport waiting, 24/7 service, 30–45 min eligible Miqat. No visitor counts/ratings |
| 09 | WebGL orange balls | Cross-page | Literal 3D excluded as unrelated; small purposeful photo and CTA transitions only |
| 10 | Image alongside FAQ | /faq & home | Photo-led \`FaqSection\` using existing actual questions/answers; home FAQ photo |
| 11 | Quote / contact form | /booking, /contact | Real 4-step \`BookingWizard\` and \`BookingEngine\`, compact expandable mobile summary; original contact form |
| 12 | Editorial magazine | /guides + /blog | Existing asymmetric \`guides-editorial.css\`, genuine guide links, metadata preserved |
| 13 | Full footer + moving photo filmstrip | Global footer | Real localized navigation links and four mobile disclosure groups; removed desktop image ribbon after 8-page visual audit found that repeated images made unrelated pages resemble one template |
| 14 | Hover and glass/glow CTA | Relevant service/booking actions | \`duyuf-video-micro-motion.css\`: 180/260ms, focus-visible, reduced-motion, no fake heavy glass UI |
| 15 | Overlapping vehicle photos | /fleet/[slug] | \`VehicleGallery\` next two real photo peeks on desktop, swipeable strip on mobile; no fake vehicle rotation |

## Design logic and source of truth
- Never place all effects on homepage; the seven home scenes remain Arrival/Hero, request, experience, routes, fleet, service facts, FAQs + CTA.
- Cash SAR/USD paid directly to driver only after completion; no advance, card, transfer, wallet or online checkout. This includes /booking and FAQ.
- Fleet: five direct-booking vehicles only. Maybach and H1 are concierge-only.
- Fares read from \`AUTHORITATIVE_TRANSFER_RATES\` and server DB rates with validation; never source example values from prototype HTML.
- Preserve actual assets and 10 localizations with self-canonicals, hreflang, sitemap, RTL/LTR.
- Avoid fake satisfaction percentages, 3D balls, decorative autoplay image marquees, and unsupported free add-ons.
- New changes on \`feature/duyuf-all15-functional-design-v1-20261117\` (preview only), production stays frozen.

## Evidence / acceptance gate
- Must finish package unit/integration tests, i18n, Next.js build and Vercel preview.
- MUST verify with REAL browser screenshot/interaction tests at 1440, 820, 430, 390, 375 (ar & en) before visual approval. Passing tests is not visual QA.
- Remaining to verify: full BookingEngine submission in safe mocked test mode, all 10 detailed service translations, real mobile visual behavior, lack of horizontal overflow, correct site-owned media copyright.
- Release only when owner explicitly approves production promotion.
