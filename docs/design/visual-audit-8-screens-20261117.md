# 8-page visual audit — Duyuf Al Rahman VIP — 17 November 2026

## Input, not guessed
Owner provided ZIP `screencapture-royal-umrah-cabs-mtzzhz190-sayed6-vercel-app-ar-2026-11-17-21_33_26.zip`, 8 real screenshots, each 1920px wide: homepage, booking, pricing, fleet, services, ziyarat, about, blog.

## Blockers from visual evidence
1. SERVICES INTRO (P0): left image displays baked-in English “Family and Group Transportation” and button text cropped off the left side. Cannot repair using HTML/CSS translations because text is part of JPG. Replace with approved text-free `fleet-family.jpg`. The text-free candidate was manually inspected via GitHub base64 image.
2. SHARED FOOTER (P1): same four-destination image reel is appended at the bottom of unrelated pages. Another photo strip in `CinematicFooterCta` duplicates imagery on some pages. Remove both repetitive rails; preserve meaningful route links already present in footer and the cash-only policy.
3. SERVICES CTA (P1): “Book journey” is repeated after every service's CTA in the selector and again at the footer. Remove the redundant one; do not remove booking route controls.
4. HOME FAMILY STORY (P0): `service-group-interior.jpg` is a marketing JPG with baked-in English content, despite being used as an image scene for 10 locales. Replace with text-free `vehicle-interior-cta.jpg`.
5. FAQ (P0): `service-madinah.jpg` is a marketing JPG with “Madinah Ziyarat” English text and faux button baked into image. Replace its two mounted FAQ uses with the text-free `ziyarat-haram.jpg`.
6. BOOKING (P1): same `route-jeddah-makkah.jpg` image is used by multiple unrelated hero/story stages. Give the booking intro its own suitable text-free chauffeur arrival photo: `chauffeur-welcome.jpg`.
7. PRICING (P2): the old `RouteBasedPricingExperience` still renders repeated car cards even though the page wrapper got restyled. **Not fixed** here: needs UX redesign within the actual pricing component without affecting authoritative fares.
8. REST OF DESIGN (P2): same type scale, content width and large footer still dominate. Not fixed by one media patch. Requires actual desktop and mobile browser screenshot comparison before approval.

## Technical preservation
No modifications to source fare tables, booking backend, Supabase, GSC, main/master, sitemap, JSON-LD or 10-locale alternates. No invented ratings/reviews, no card payments; cash SAR/USD only to chauffeur after trip. No claim that screenshot visual QA on deployed site has been completed: this is a screenshot-based forensic audit plus technical guard tests.

## Search / GEO stance
Google Search Central current AI features guidance says foundation SEO applies to AI surfaces; there is **no required GEO-only schema**. Structured data must match rendered content. The multilingual 10-locale pages should each have self-canonical, reciprocal hreflang and genuinely localized primary copy. English baked into Arabic JPGs harms UX and cannot be translated. Sources:
https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
https://developers.google.com/search/docs/specialty/international/localized-versions
https://developers.google.com/search/docs/appearance/ai-features
