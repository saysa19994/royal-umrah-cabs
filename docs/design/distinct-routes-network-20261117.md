# Architecture Stage 3 / Route Network Desk

Distinct from the Home route photo atlas:
- Home: photographic four featured journeys, compact fares.
- Routes: a schematic route directory drawn on a navy operations grid with one selected route, origin/destination codes, actual existing route durations/distances explicitly described as indicative, and five vehicle fare choices from AUTHORITATIVE_TRANSFER_RATES.
- An illustrative SVG is **not** a geographic map, routing engine or live traffic estimate; the interface says so. No new geospatial data fabricated.
- Official route detail navigation remains via EXECUTIVE_ROUTES_DATA, with only 10 active approved routes in the booking directory; the inactive Riyadh airport route stays in source for legacy context, but is excluded from the selectable network and public route index. Full pricing links remain intact.
- Unsupported car fare (e.g. no Coaster for Makkah–Madinah) displays unavailable and disables booking CTA.
- Mobile layout uses a real select + two-stage diagram / horizontally selectable cars, rather than oversized cards.
- All ten locales have independent labels. No production release, DB write or changes to app routing.
