# Screenshot-first mobile layout and video ideas / 17 Nov 2026

Source evidence:
- Mobile screenshots 1000201203.jpg and 1000201207.jpg, unusually downscaled full-length page captures, show the problem: repetitive vertical stacks obscure the cinematic and interactive concepts.
- Two owner-submitted modified HTML files: booking/routes/fleet concept, and editorial services/ziyarat concept.
- Video ideas 03 (asymmetric service chapters), 06 and 15 (horizontal image / content sequences).
- DO NOT add videos/3D just to fill space.

Actual changes on branch feature/duyuf-mobile-story-services-20261117:
1. /services uses one client ServiceChapterExplorer instead of six repeated giant image/details cards. Desktop is a side navigation + selected cinematic image + one complete detail panel. Mobile uses accessible tablist as a swipeable horizontal chip rail with selected service only. Tab keyboard keys: Left, Right, Home, End. Current source details remain in expandable text, with real route links. Booking deep links use supported route/type parameters, not ignored ?service=.
2. /ziyarat: Existing historic-sites informational cards and guarantee/pillars cards change to mobile horizontal snap-scroll reading rails, retaining all content and keyboard accessibility. Curved destination gallery previously integrated stays in the hero.
3. /home: tighten booking, story, photo routes, fleet and FAQ spacing and image sizes at 560px and 390px, without changing approved hero video, prices or data flow.
4. New service section UI titles/descriptions translated across all ten locales. The pre-existing verbose service highlights and coverage (English outside ar) still need a separate editorial-language QA pass; don't mark localization complete solely from the automated dictionary key test.
5. No changed DB, public site, prices, payments or SEO alternates. Production frozen. Browser screenshot verification still needed at 375,390,430,820,1440 (RTL and LTR).

The mobile screenshots are heavily downscaled and cannot support pixel-perfect typographic claims; in-browser visual inspection remains a release gate.
