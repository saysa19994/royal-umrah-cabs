# Distinct sitewide page architectures, stage 2: Fleet
2026-11-17

User specifically rejects cloning the new homepage or modifying the same fleet CSS stack.
Main homepage already uses separate JourneyArchitectHomepage.* modules.
Fleet showroom now has **independent markup and module CSS** in FleetAtelier.*,
directly replacing FleetCatalog on /[locale]/fleet. The old component & old fleet-editorial.css stay in the repo for rollback but are not mounted/imported.

Fleet structure:
1. Full split photographic intro (independent layout).
2. ONE automotive studio: vertical five-vehicle selector on desktop / horizontal on mobile, genuine DB photo gallery and interior/exterior switch, per-car passenger/bag spec, real example route fare from AUTHORITATIVE_TRANSFER_RATES, booking link to the existing BookingWizard, detail link to real vehicle page.
3. Compact spec ledger table, NOT five repeated cards.
4. Dark concierge invitation to Maybach & H1 detail pages and /contact, no direct book for either.

Retained:
- getDbVehiclesCached() so dashboard-controlled vehicle photos/names/desc stay live.
- itemListSchema, breadcrumbSchema and locale self canonical + metadata.
- Existing fleet detail pages, live booking, true cash policy, proper five direct-booking categories.
- All ten locales have local UI labels, no forced English UI.
- No production or Supabase writes.

Acceptance requires mobile browser visual screenshots at 375,390,430 and desktop 1280,1440 plus real click tests. Build alone does not approve the design.
