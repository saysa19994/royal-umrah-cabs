# Screenshot-based visual acceptance reset — 2026-11-17

## User evidence
Six real preview screenshots captured 2026-11-17 (home, routes, fleet, pricing, ziyarat, about). The owner correctly identified that previous component additions were visually buried in repeated old templates.

## Concrete structural changes (preview only)
- Routes hub: retain real interactive RouteSpotlightExplorer, but remove 10 huge duplicate ExecutiveRouteCard image panels and redundant full PricingTable. Replace them with a compact 2-column route directory using localized route data and authoritative Camry route prices; full fare comparison lives at /pricing.
- Fleet hub: move the five vehicle controls above the focused showroom. In All filter show one vehicle at a time, exterior/interior switch, and never repeat the other four cards; category-specific filtered inventory remains available.
- About: replace entire equal-box template with split documentary arrival photo, first-person mission, editorial three-value rows with a second real photo, and the final booking CTA. Existing localized mission and values retained.
- Pricing: keep real RouteBasedPricingExperience and DB-approved initial rates. Delete the duplicated four route price-card section and redundant five-card reassurance section. Replace with a concise four-row explanation of fixed fares, cash, flights and vehicle comfort; remove unapproved "Instant confirmation" wording.
- Ziyarat: split hero with existing local destination image. Preserve SacredZiyaratExperience and all guide/article links, but present supporting guides as editorial index, booking process as a timeline and FAQ as readable plain answers. No new unlicensed tour guide claim.

## Non-negotiables
- Only work on feature/duyuf-visual-reset-screenshot-audit-20261117, leave main/master production unchanged.
- 10 locales and locale-specific canonicals/hreflang intact.
- Approved five directly bookable cars; concierge-only Maybach/H1.
- Prices from AUTHORITATIVE_TRANSFER_RATES / getDbPricesCached only, never placeholder fares.
- Cash to driver after completed ride; no deposit, cards, online payment or false instant confirmation.
- Do not infer screenshot success from tests/build. Visual QA still required at 1440x900 and 430/390/375 widths for RTL and LTR.
- Never promote this branch to production without owner visual approval.

## Acceptance criteria
1. /routes one visual selector, below a concise directory (no 10 giant scenic panels and no second giant fare table).
2. /fleet focused showroom with five selectors visible before vehicle detail; no duplicated fleet grid in All.
3. /about clearly distinct full-height split photo + narrative + rows, not identical cards.
4. /pricing one live rate chooser, no repeat of same fares in four more panels.
5. /ziyarat hero uses real destination photo and later content follows three distinct layouts.
6. Follow mobile, RTL, accessibility, real fares, booking handoff; record actual browser screenshots rather than only green CI logs.
