# The Signature Experience — Three distinct Vercel design prototypes (PREVIEW ONLY)
2026-11-17 • Project: saysa19994/royal-umrah-cabs

## Scope and acceptance
Owner requested exactly three real clickable design directions on Vercel before implementing the existing website. No production, main/master branch, Supabase, API, pricing database, articles, booking engine, or SEO URLs modified. This preview branch is a **non-production design laboratory** only. User approval is required before any identity or homepage replacement.

## Paths
- /studio — one comparison gallery, live links.
- /studio/desert-modernism — an architectural, asymmetric hospitality layout: large photo + copy, olive horizontal booking ribbon, five-vehicle showroom, warm photographic travel essay.
- /studio/royal-editorial — a magazine-inspired portfolio, huge title typography, burgundy spine, asymmetric motor editorial spread, reservation folio, price-ledger rows.
- /studio/cinematic-sandstone — user-provided hero video, full-screen film typography, multi-scene journey storytelling, dark interactive vehicle theater, cockpit-style fare enquiry.

### Why these are not recolors
Three distinct component trees and layout primitives under one component module: A (architecture/ribbon), B (editorial/folio), C (film/theater). Their CSS uses independent compositional classes and mobile rearrangement, not the existing Homepage components or global site's Header/Footer.

## Technical facts preserved
- APPROVED_5_FLEET assets supply five real fleet photos and published passenger/luggage capacities. Concept image backgrounds use *existing project assets*; never advertise conceptual generated imagery as the actual fleet.
- AUTHORITATIVE_TRANSFER_RATES supplies display examples for the selected route and vehicle, not made-up prices. The preview does NOT call production DB, send booking requests or collect name/phone/email.
- Airport pickup/vehicle fit, 24/7, cash after completed journey are factual commercial policies. No deposit/card payments offered.
- Preview routes explicitly noindex via middleware header and metadata. They are deliberately **not added to sitemap** and have an isolated HTML shell with no current Footer/Header widgets. 
- Design is drafted Arabic/RTL first; ten-locale implementation and SEO fidelity occur only after user selects a direction. Do not treat these three concepts as 10 translated production pages.

## QA / approval gate
Run actual live Vercel build and check preview URLs. Technical tests do NOT replace visual review. Required after live: screenshots at 1440 / 1280 / 430 / 390 / 375 for each concept, checks for car picker, pricing date/route, mobile horizontal overflow, image assets, booking-demo states and text legibility. No real booking confirmation in a visual demo.
