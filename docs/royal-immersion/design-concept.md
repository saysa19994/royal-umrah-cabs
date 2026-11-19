# Royal Immersion

## Art direction

Duyuf Al Rahman VIP opens with the owner’s chauffeur film and a direct invitation to book. The rest of the page follows the passenger’s journey through choosing a route, selecting a vehicle, and arriving at a destination. Large photographs carry the transitions. Ivory reading surfaces and white booking controls give visitors a clear place to pause and act.

The visual signature is a thin bronze route line with origin and destination marks. It first appears on the scroll cue, then connects the booking steps and marks the journey in the route explorer. Deep navy frames the film, exterior fleet photography, and closing scene. Ivory carries geography, service information, and the FAQ. Use clean edges, full-bleed photography, and shadows drawn from the scene. Reserve bronze for route marks, quiet dividers, and selected states.

The brief supplies the page structure, brand palette, and campaign copy. The existing application’s Signature Fusion preview is the implementation baseline. Its opening uses `public/assets/homepage-v2/hero.mp4`, the smaller `hero-mobile.mp4`, and `hero-poster.jpg`. Retain that media family. Confirm its provenance against the owner’s original before visual acceptance. The existing screenshot and three reference films are pending. Photography, published claims, and any fare or availability shown depend on approved assets and the existing application.

The 11.8-second project film moves from an airport canopy to a desert highway and then to a chauffeur at the hotel entrance. The SUV occupies the right side in the first shot and center-right on the road. On the hotel shot, the chauffeur stands nearer the center. Keep copy in a quiet part of the opening, or give it a separate navy area where the locale and viewport demand more room. Both video encodes use a 16:9 frame. Test a focus around 65–70% from the physical left on mobile and compare it with a shallower stage that retains more of the scene. Confirm the crop in the opening, road, and final shots, plus the poster fallback.

## Visual system

| Token | Value | Role |
| --- | --- | --- |
| `surface-ivory` | `#F7F5F0` | Editorial surfaces and warm transitions |
| `surface-white` | `#FFFFFF` | Booking forms, menus and summary sheets |
| `ink-navy` | `#101827` | Primary text, buttons and cinematic backgrounds |
| `accent-bronze` | `#A97B27` | Visual markers and large decorative accents |
| `border-soft` | `#E8E6E0` | Surface separation and decorative rules |
| `ink-muted` | `#586070` | Secondary text on light backgrounds |
| `accent-ink` | `#765318` | Small accent text on white or ivory |
| `control-border` | `#747C8C` | Form boundaries when the edge is needed to identify the control |

Use navy with white text for primary actions on light surfaces and ivory with navy text over film. Use a two-tone focus ring with an offset so it remains visible across photographic and solid backgrounds. Limit corners to `6px` on controls and `10px` on functional overlays. Allow generous internal spacing around fields and keep editorial imagery square-edged. Use 4, 8, 12, 16, 24, 32, 48, 64, 96, and 128 px spacing increments, with chapter padding ranging from 56 px on handheld screens to 112 px on large displays.

| Type role | English and Latin-script locales | Arabic | Size and line height |
| --- | --- | --- | --- |
| Hero display | Cormorant Garamond 500 | Amiri 700 | 48–112 px, 0.94–1.03 Latin, 1.19–1.32 Arabic |
| Chapter display | Cormorant Garamond 500 | Amiri 700 | 38–80 px, 1.00–1.08 Latin, 1.22–1.34 Arabic |
| Editorial subhead | Cormorant Garamond 600 | Amiri 700 | 26–42 px, 1.14 Latin, 1.35 Arabic |
| Body | Manrope 400 | Tajawal 400 | 16–18 px, 1.62–1.75 |
| Field, navigation, button | Manrope 600 | Tajawal 600–700 | 14–16 px, 1.45–1.65 |
| Price and passenger figures | Existing locale-appropriate interface face and numerals | Existing locale-appropriate interface face and numerals | 14–20 px, 1.45–1.6 |

The type recommendations use the current Cormorant, Manrope, Amiri, and Tajawal token names. The repository currently resolves those tokens to a network-independent system stack. The selected typefaces need licensed local files for the final typeset appearance. Keep one semantic `h1` per page. Use balanced heading wraps where they suit the language. Set Arabic tracking to normal and leave room above and below for its letterforms. Use separate direction spans for model names and numbers inside RTL copy as needed. Use the current Urdu and Devanagari stacks as starting points and check their shaping on the tested platforms. Validate font loading, truncation, and line wrapping in Arabic, English, Malay, Indonesian, Urdu, French, Spanish, German, Turkish, and Hindi.

## Responsive composition

| Viewport | Grid | Layout decisions |
| --- | --- | --- |
| 375 px | Four columns, 16 px gutters, 12 px gaps | Compact header with brand, booking action, and menu. Hero copy follows the subject area in the crop. Booking starts immediately below the film with one field per row. |
| 390 px | Four columns, 18 px gutters, 12 px gaps | Keep the same reading order. Use the wider measure for Arabic wrapping and model names. |
| 430 px | Four columns, 20 px gutters, 16 px gaps | Maintain the vertical booking sequence. Allow paired summary details when the locale can fit both. |
| 768 px | Eight columns, 32 px gutters, 20 px gaps | Place hero text across five columns where framing allows. Open booking into two columns. Expose route titles beside the selected photography when they fit at full size. |
| 1024 px | Twelve columns, 40 px gutters, 24 px gaps | Use full navigation when translated labels fit. Maintain two booking rows and a landscape route stage. |
| 1440 px | Twelve columns, 56 px gutters, 24 px gaps, 1,440 px max content width | Give the opening film a full-bleed stage. Hold copy within five or six columns and let the vehicle occupy up to three quarters of its stage. |

Desktop opening order is announcement, over-film header, main headline and both actions, then booking along the lower edge of the film. On short viewports the primary action takes visitors directly to the form. On handheld screens, keep the announcement brief, the hero compact, and the form beginning visible when height allows. Keep the booking CTA in the header and within the hero at each breakpoint. At an open menu, manage focus and keep booking, language, and currency available. Use 44 px minimum action targets and logical CSS properties for alignment and spacing. Position utility actions clear of booking controls and device insets.

## Homepage composition

| Chapter | Desktop and tablet | Handheld screens and interaction |
| --- | --- | --- |
| Announcement and navigation | Brief announcement above a transparent header. Brand at inline start, main navigation in the center, language, currency and booking at inline end. Transition to an opaque high-contrast header after the hero. | Brand, booking, menu. Put the full navigation, language, and currency selectors in a keyboard-accessible menu. |
| Cinematic opening | Use the current project film and poster pending owner-source confirmation. Place “Your Journey, Our Priority.” and the private chauffeur message beside the identified subject area. Use “رحلتك تستحق عناية استثنائية.” in Arabic. Pair “Book Your Private Ride.” with an exploration link, quiet verified trust detail, and scroll cue. | Establish a crop for the current film after checking its changing subject position. Keep copy and actions within the visible safe area. Show the poster when autoplay is unavailable or reduced motion is enabled. |
| Booking entry | White form at the film’s lower edge. Give pickup and destination the widest columns. Travel date, time and passengers follow, with vehicle preference where supported. “Find Vehicles & Prices.” submits to the existing availability or pricing flow. | Full-width labeled fields, clear error placement and a touch-friendly primary action. Preserve any route or vehicle selected elsewhere on the page. |
| Trust | Ivory band in two short rows of verified service statements with thin rules. Draw approved waiting, tracking, cancellation, child-seat, fare, payment and availability details from the appropriate sources. | Legible vertical groups with short headings and relevant detail. |
| Three booking steps | Large editorial numerals and a shared route line. Move from choosing the journey through confirming the ride to traveling and paying the driver. | Stack the steps along a vertical route line. Keep each description to one or two short sentences. |
| Popular routes | One large destination photograph and a right-aligned or mirrored index of active routes. Selecting a route updates the scene and reveals its real starting fare where supported, details link, and booking action. | Lead with the featured image and provide a simple list of route choices. Keep subject and fare legible and link to the existing route detail. |
| Fleet | Deep navy automotive stage titled “The Art of Private Travel.” Put one accurately depicted approved model in the center, with a model selector across the bottom and a compact specifications panel at the edge. | Fit the whole vehicle within the scene. Give model controls space to wrap or scroll horizontally. Show approved details in normal flow and offer distinct view-details and select-vehicle actions. |
| Comfort | Move from the exterior stage into a wide cabin composition. Follow with two inset detail crops covering supported aspects such as seating or luggage. | Lead with the strongest approved photograph and use concise captions. Include only verified equipment and features. |
| Transportation services | White service index beside a full-height feature image, with strong typographic hierarchy and direct links to the existing airport, intercity, hotel, Ziyarat, family, and group service pages where available. | Use an editorial lead photograph followed by readable service rows. Preserve concierge actions for restricted services. |
| Makkah and Madinah Ziyarat | Give each city its own captioned editorial scene. Set one image wider and place the second against an ivory surface with room for respectful architectural framing. | Stack scenes in natural reading order. Each scene includes practical service details and the appropriate existing action. |
| Chauffeur | Use an approved team photo showing an actual pickup or welcome. Place a short account of the passenger handoff next to the visible gesture. | Put the photograph first and include confirmed details about pickup, monitoring, assistance, and onward travel. |
| Reviews or customer experience | Feature one authentic quote at a time with the verified source and previous/next controls. If published reviews are unavailable, use the space to describe the established journey. | Present readable excerpts and manual review controls. Keep the contents in reading order without automatic advancement. |
| FAQ | A short topic index and accessible accordions for booking, pickup, monitoring, waiting, vehicles, luggage, pricing, payment, cancellation and Ziyarat. | Group questions vertically with large controls, natural keyboard order and translated answers. |
| Closing | Use a still composition with the road or destination visible behind the vehicle. Pair “Your Journey Deserves More.” or “رحلتك تستحق الأفضل.” with the approved closing message and booking action. | Use the still as a wide photograph above a navy copy block, with a clear full-width action. |
| Footer | Navy surface. Brand and contact information lead into navigation for services, popular routes, fleet, Ziyarat, support, cancellation, legal policies and verified social channels. | Keep support and contact easy to find. Organize long navigation groups into expandable lists when needed. Keep WhatsApp accessible across the site through its current destination. |

## Motion direction

| Scene | Wide-screen behavior | Handheld and reduced-motion behavior |
| --- | --- | --- |
| Opening | Masked headline lines reveal over 380–620 ms, with a small delay before supporting copy. Over the normal hero exit, a ScrollTrigger scrub shifts/zooms the film modestly toward its focal point while the booking surface comes into focus. | Limit the opening to a brief opacity transition on handheld screens. For reduced motion, show the poster and content immediately. |
| Arrival and three steps | Transition from the film into ivory with a shallow image mask and draw the bronze route line between the step marks. Give each step a single reveal as it enters. | Use a static vertical line and allow the reading order to carry progression. |
| Route explorer | On explicit selection, crossfade the active image and reveal the new city caption within 260–440 ms. Keep the index, price and actions in stable positions. | Keep controls immediately responsive. Make the reduced-motion change instantaneous. |
| Fleet | On large screens, briefly pin the image stage for an exterior framing transition, with the specifications and actions accessible. Cap the scroll interval around 30% of the viewport height subject to QA. Change accurate model images on explicit selection. | Use a stable stage with a quick crossfade on selection. Keep the stage in normal flow. Reduced-motion changes are instantaneous. |
| Comfort and Ziyarat | Reveal the cabin with a shallow mask. For the cities, let a calm, short fade connect the photographs to the next surface. | Keep subjects framed at rest. Use static content for reduced motion. |

Scope GSAP and ScrollTrigger to the rendered experience, with `gsap.matchMedia()` for breakpoints and `prefers-reduced-motion`. Cancel timelines and revert trigger styles on unmount or locale navigation. Keep content and booking usable before animation loads. Use opacity and transforms for moving elements, pause autoplay when the document is hidden, and preserve stable image dimensions. Confirm opening-film controls and poster availability during media review. Check pin cleanup after resizing and navigation, including restoration of natural order after an interrupted transition.

## Existing page templates

| Template | Presentation and continuity |
| --- | --- |
| Fleet and vehicle detail | Fleet shares the featured stage and selector. Each model detail opens on accurate vehicle photography, followed by its verified specification and route availability, with direct selection into the existing flow. |
| Routes and route detail | Route listing shares the active route index. Individual route pages make pickup and destination prominent, place verified fares beside the available vehicles, and retain route-specific booking links. |
| Services and Ziyarat | Use service or destination photography followed by practical details and the current booking or concierge action. |
| Pricing and booking | Use white transactional surfaces, clear validation, and a persistent desktop journey summary that becomes an inline summary on mobile. Show airport arrival fields only when relevant and save the flight number to the existing booking record. Present the current cash-to-driver policy and confirm only from the backend response. |
| About, reviews and contact | Use restrained introductions that lead directly to approved team imagery, published reviews, and verified contact methods. |
| Guides, FAQ and policies | Prioritize comfortable reading width, meaningful headings, and existing internal links. Keep guides and policy metadata, locale URLs, canonical tags and structured data connected to their current route templates. |
