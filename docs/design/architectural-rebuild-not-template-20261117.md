# DUYUF VIP / Architectural rebuild of the HOMEPAGE, not another design patch

The owner repeatedly rejected shared-template section stacks. Root cause confirmed in the code: SignatureJourneyHomepage had one 1250px container repeated across seven sections and more than 29KB layered module CSS. Prior interventions only appended CSS and effects.

## Implemented on an isolated preview branch
- A brand-new client component \`JourneyArchitectHomepage.tsx\` with its own new CSS module, mounted at \`src/app/[locale]/page.tsx\`. The previous SignatureJourneyHomepage is retained unchanged only as a rollback reference. The new page does not import any old homepage CSS.
- Act 1: true full-height owner-approved hero video, giant editorial typography + modest service notices, not a hero inside a white content card.
- Act 2: airline-ticket-style functional booking desk overlapping the film edge, accessible route/date/passenger controls handing parameters off to the real /booking wizard. This is not a disconnected mock form.
- Act 3: image-led route atlas with a navigable side ledger and the authorized Camry route fare from AUTHORITATIVE_TRANSFER_RATES. No five extra route cards.
- Act 4: an automotive museum with vertical selector, one large vehicle, interior/exterior switch, actual approved vehicle data, fare tied to the named Jeddah Airport -> Makkah route and booking/detail links. No grid of five cars.
- Act 5: a dark narrative travel essay with an image and four selectable journey chapters; eligible Miqat details apply only where appropriate.
- Act 6: verified typographic service facts 60 minutes, 24/7 and 30–45 minute eligible Miqat stop. No fake ratings or customer numbers.
- Act 7: a quiet photographic FAQ reading room using the existing localized questions/answers and existing HomepageFaqJsonLd.
- Mobile has its **own** vertical ticket, horizontal route and fleet selectors, compact stage layouts and four-step travel essay, with dedicated 700px and 390px styles; no horizontal overflow by construction.
- 10-language UI labels author-written and locale-appropriate; hero uses the user's exact Arabic/English approved copy. All 10 dictionary structures used and preexisting SEO metadata untouched.
- No changes to Supabase, paid journey terms, booking backend, prices, production branch, hero assets, global header or global footer.

## Independent design architecture
Home = cinematic film and route atlas.
Routes = photographic geographical ledger.
Fleet = automotive vehicle museum.
Booking = real four-step wizard/concierge desk.
Ziyarat = destination arc and reading guide.
Guides = magazine.
FAQ = photographic reading room.
No claim of visual acceptance until real browser screenshots demonstrate desktop 1440/1280 and mobile 430/390/375 for ar and en. A successful Vercel build is a technical gate, not aesthetic sign-off.

## Constraints to inspect before owner acceptance
Ensure body scroll, locale labels and subtitles, meaningful alt text, vehicle image quality, pricing deep links, 100svh film on small devices, selected itinerary and keyboard controls. Honor prefers-reduced-motion. The live production site must remain untouched until explicit owner approval.
