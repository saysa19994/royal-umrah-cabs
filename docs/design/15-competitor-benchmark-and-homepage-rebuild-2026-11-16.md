# DUYUF AL RAHMAN VIP — 15-SITE DESIGN BENCHMARK & HOMEPAGE DE-DUPLICATION
Date: 2026-11-16 | Branch: `feature/duyuf-private-journey-review-20261116` | Preview only.

## Method and limitations
This is a **curated set of 15 relevant competitors** with websites available on 2026-11-16, **not an independently verified revenue, traffic or market-share ranking**. It combines a review of live public pages with the operator-supplied competitor screenshots (including UmrahTransit booking/fleet, Al Kiswah pages, Al Haram and other providers). Interface observations are not evidence that other providers' legal, fleet, review or licensing claims are true. No competitor visuals, code or claims have been copied.

## Direct-service benchmarking — 15 sites

| # | Website | Design or conversion idea worth studying | Pitfall / not to copy |
|---|---|---|---|
| 01 | [Al Kiswah](https://kiswahumrahcab.com/) | Image-first route hero; interior/exterior imagery; individual vehicle-detail narrative; route pricing search | Avoid noisy badges, unverifiable regulatory claims and pricing structures |
| 02 | [UmrahTransit](https://umrahtransit.com/) | Booking steps with visible summary; descriptive route stories; vehicle choices | Its online **20% deposit** conflicts with Duyuf's strict **zero-deposit cash-after-ride** rule |
| 03 | [Mashaer Fleet](https://mashaerfleet.com/) | Immediate booking search with a concise promise and journey steps | Repeating the same 4-step process beneath an existing form |
| 04 | [Umrah Taxi SA](https://www.umrahtaxisa.com/) | Route + vehicle + current fare on one decision surface | Crowding too many controls and long form fields into the first fold |
| 05 | [Hussain Travels](https://hussaintravels.com/) | Route-first price comparison and concise service class | Endless route cards without a clear visual hierarchy |
| 06 | [UmrahCab](https://umrahcab.com/) | Segmented fleet by sedan, SUV and group vehicle | Repeated similar vehicle cards and imprecise comparable starting fares |
| 07 | [Hire My Chauffeur](https://hiremychauffeur.com/umrah/) | Umrah-specific logistics and direct route journeys | Generic countrywide claims beyond our approved operational scope |
| 08 | [The Umrah Taxi](https://theumrahtaxi.com/) | Side-by-side route-to-vehicle fare table for research-phase visitors | Copying their inventory, prices or luggage capacities |
| 09 | [UmrahTaxi.net](https://umrahtaxi.net/) | Clear airport/Miqat copy and a direct contact path | Using unverified driver-language claims |
| 10 | [BookUmrahCabs](https://bookumrahcabs.com/) | Fast route and car selector, on-screen fare and WhatsApp progression | User-specific reviews, badges or government status cannot be imported as claims |
| 11 | [Umrah Online Taxi](https://umrahonline.taxi/) | Vehicle comparison with a persistent route/date/price summary | Their bank-transfer payment option is **not accepted** by Duyuf |
| 12 | [Al Haram Cabs](https://www.alharamcabs.com/) | Practical airport pickup details and step-by-step arrival context | Extra-fee policy and all operational claims differ from Duyuf |
| 13 | [ZiyaraWay](https://ziyaraway.com/) | Destination shortcuts, image-forward car selector and good service grouping | Do not imply services that Duyuf does not provide (hotel packages, cargo etc.) |
| 14 | [Saudia Cabs](https://saudiacabs.com/) | Short, immediately recognizable route links and WhatsApp handoff | Generic homepage without a compelling branded experience |
| 15 | [UmrahRide](https://www.umrahride.co/) | Distinct arrival hero, single CTA and popular-route shortcuts | Unverified certification, traveler or rating statistics |

## International premium UX benchmarks (separate, not direct operators)
- [Blacklane](https://www.blacklane.com/en/app/booking/) — one strong headline, flight/airport assurance, compact one-way/hourly quote form, quiet deliberate white space.
- [Wheely](https://wheely.com/en/classes/luxe) — exceptionally restrained typography, one big editorial photograph, precise interior details and non-repeating section composition.
- [SIXT ride](https://www.sixt.com/ride/) — practical service-class comparison and passenger/luggage specs.

## Confirmed local homepage design fault
The former `PrivateJourneyHomepage.tsx` included: 
1. a video hero **and** its booking form;
2. trust promises;
3. a 7-image curved destination collage;
4. a 3-card service gallery with the **same airport and intercity imagery**;
5. an interactive route selector showing **the same journeys and photographs again**;
6. a vehicle showroom;
7. another 4-step explanation of the booking already available in the hero;
8. a 3-card guide grid and FAQ.

`PrivateJourneyHomepage.module.css` also retained old 960px, 767px and 390px split-hero rules followed by new full-bleed hero overrides. That layered cascade is why subsequent cosmetic changes felt fragile or negligible.

## New one-purpose-per-section information architecture
1. **Full-bleed owner-supplied cinematic hero:** approved Arabic/English headline, one primary booking CTA and existing actual quick booking route/date/passengers/bags search.
2. **One thin operational assurances strip:** all four approved guarantees once, not repeated in four visual formats.
3. **One hospitality story (arrival + cabin):** independent chauffeur greeting and interior images, one editorial typographic composition, a services link; replaces duplicated destination arc and service cards.
4. **Interactive popular journey:** four route choices, grounded per-vehicle fare and a booking hand-off. The **only** homepage route explorer.
5. **Single-focus fleet selector:** one vehicle at a time, separate interior/exterior gallery, seats, luggage and book/details links.
6. **Useful editorial guides:** distinct image/copy for visitors planning Umrah; avoid same hero/route photography.
7. **Short, useful FAQ:** link to full FAQ and verified reviews; a single factual contact/decision support block.

The independent **/fleet, /services, /pricing, /booking** pages now have their own differentiated compositions on the preview branch; do not import them back as clone sections on the homepage.

## Design acceptance criteria
- No more than one destination/route showcase and no redundant "how it works" section on the homepage.
- No duplicated prominent asset among main service story, guide cards, route stage and FAQ photograph.
- Hero video remains full-bleed with a 100%-width media layer; fixed/floating overlay legible at 375, 390, 430, 768, 1024 and 1440px.
- Arabic RTL, Urdu RTL and other eight locales preserve correct translations, focus order and usable controls.
- No generic fake five-star counters, fabricated testimonials, actor names, claims about multilingual chauffeurs or vehicle capabilities.
- Cash paid directly to the driver **after completed journey**, SAR/USD only, zero deposit or advance payment. No card, POS, online or bank transfer.
- Hero booking continues to established /booking engine; rates from authoritative route/fleet data only.
- Verify real screenshots and form interactions (not simply HTTP 200 or a successful build) before launch.
- Preserve existing canonical, hreflang, sitemap, noindex and no-production-write protections.

## Delivery
Changes on preview only. Build/test status should be checked at the exact branch HEAD before considering approval. **Visual accept/reject remains unverified until 375/390/430 mobile and desktop screenshots have been reviewed.**
