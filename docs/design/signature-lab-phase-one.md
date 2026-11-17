# DUYUF VIP — Phase 1: three distinct on-site Vercel design concepts

Based on live GitHub source (preview branch) and current approval directive.
Target repository: saysa19994/royal-umrah-cabs.
Base: 34f0d9df43b493ca57be99b2db85f940463f1579.
Branch: feature/signature-3-concepts-preview-20261117.
Production/main and Supabase: NO CHANGES.

Three actual pages (both ar RTL and en LTR):
/signature-lab/ar/desert — Desert Modernism
/signature-lab/ar/editorial — Royal Editorial
/signature-lab/ar/cinematic — Cinematic Sandstone
Comparison: /signature-lab/ar

A = Split-screen architectural video, limestone ivory, olive/copper, concierge desk, light airy showroom.
B = Burgundy editorial masthead, off-center video, printed reservation folio, catalog-car selection and fare index.
C = Full-bleed hero video, espresso/terracotta, dramatic oversized type, dark route/vehicle console and panoramic fleet.

Design pages include home, vehicle showcase, vehicle interior/exterior, click-through real vehicle detail, booking controls and source-backed vehicle comparison.
Image integrity: Approved 5 Fleet data and actual user-provided hero video, no AI-generated car claim.
Fares: Passed from getDbPricesCached() server query; unused/inactive Riyadh Airport route excluded from choice. No price invented.
Booking is a HANDOFF to existing live booking page, with explicit vehicle choice; no double engine, no fabricated booking state.
Concierge Maybach/H1 separate enquiry /contact only.
Two demo languages only; production ten locales unmodified. No cross-indexed new SEO pages.
Metadata and middleware mark lab noindex, nofollow, noarchive.
Test and TypeScript build are technical gates. Screenshots in actual desktop/mobile browsers remain acceptance gates.
Do not merge, production deploy, database migrate, replace public articles, or modify any 10-locale SEO page prior to owner visual approval.
