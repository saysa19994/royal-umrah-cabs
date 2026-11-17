# Owner HTML prototype integration — preview only (17 Nov 2026)

Source files inspected directly:
- \`/mnt/data/DUYUF_reworked_designs/01_booking_routes_fleet_from_vip_vip.html\` — navy four-step booking sidebar, fleet switch, route switch.
- \`/mnt/data/DUYUF_reworked_designs/02_services_ziyarat_story_guides_from_chauffeur.html\` — curved photographic destination gallery and editorial services.
- The source comparison \`COMPARISON_AND_IMPLEMENTATION_AR.md\` maps both files against the video concepts.

## Implemented
1. \`/ziyarat\`: replace static hero photo with a five-scene **curved selectable destination gallery** based on the second source. Uses actual existing images and real \`/ziyarat/tours/makkah-half-day\` and \`/ziyarat/tours/madinah-half-day\` links, touch/swipe, keyboard-operable buttons, reduced-motion.
2. \`/booking\`: original 4-step BookingWizard remains live, with **navy vertical step rail on desktop** from the first HTML source and native mobile stepper. No new mock form, no duplicate checkout, no payment API changes.
3. Existing earlier preview changes remain for \`/routes\` route photo explorer, \`/fleet\` exterior/interior gallery, and \`/guides\` editorial grid. Do not stack another full source page into homepage.
4. New UI labels for gallery across ten locales, RTL/LTR supported.

## Must preserve
- Cash SAR/USD directly to driver after completed trip; no online payment, card, advance/deposit.
- Five direct-booking cars: Camry, Staria, Yukon XL, HiAce, Coaster. Maybach and H1 concierge-only.
- Approved prices from application data and DB, never amounts from HTML prototypes.
- Original hero video, genuine localized SEO canonical/hreflang and booking backend.
- Production branch untouched; no database write in this change.
- Build/tests are technical gates; real visual sign-off must use browser preview at 1440/1280/430/390/375 and RTL/LTR.
