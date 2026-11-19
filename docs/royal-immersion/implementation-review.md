# Royal Immersion implementation

The redesign is implemented in the existing Next.js App Router project for Arabic, English, Malay, Indonesian, Urdu, French, Spanish, German, Turkish, and Hindi. Arabic and Urdu use right-to-left direction. Existing locale paths, pricing rules, Supabase, operations interfaces, and customer booking endpoints are retained.

## Experience

- The opening uses the project's owner-approved arrival film and its existing mobile encode. The mobile stage uses a wide crop to show the car and chauffeur. A visible play/pause control, viewport pausing, and reduced-motion poster support let the visitor control playback.
- The booking entry groups canonical pickup and destination pairs and displays route and vehicle fares from the existing pricing service. The chosen vehicle, group size, and optional date and time carry through to the booking wizard. The selected display currency does not change the SAR calculation.
- The journey, fleet, routes, cabin, services, Ziyarat, chauffeur, reviews, FAQ, and closing chapters have distinct layouts. The fleet uses the existing approved model imagery, with the HiAce cabin corrected to the matching seat photograph. Listed capacities follow the owner fleet manifest and the operative booking catalogue. The route and passenger filters respect existing regional settings and vehicle compatibility.
- There is a short desktop story pin, a scrubbed film transition and route-line animation, and scene image reveals. Reduced-motion visitors receive full content without scroll animation. Vehicle interiors and exteriors are represented as photographs.
- The shared header exposes routes, language and currency. It transitions with scroll and exposes booking at mobile sizes. The shared footer retains its existing policy, contact, route, fleet and support links.
- Booking uses the existing confirmation and operations dispatch. Airport arrival fields include airport, airline, flight number, arrival date, and time where relevant. The server uses the existing flight-number column and booking JSON for the additional arrival details. The server verifies the reviewed fare before insertion, with cash to the driver after the journey.
- Route and fleet detail templates use dedicated itinerary and vehicle layouts. Reviews use published and approved Supabase records. FAQ structured data follows the visible published questions. Services, pricing, Ziyarat, guides, about, contact and policy routes retain their existing individual templates and use the updated global shell.

## Source and media

- [Creative direction](./design-concept.md)
- [Existing site and technical audit](./existing-site-audit.md)
- [Reference deconstruction and available keyframes](./reference-deconstruction.md)
- [Owner fleet reference manifest](../fleet/vehicle-reference-manifest.csv)
- [Browser evidence and engineering checks](./browser-qa.md)

The owner's three original inspiration recordings and original full-page screenshot were unavailable. The reference document identifies the substitute evidence precisely. The existing film files were inspected and reused. Some existing project imagery is approved creative material with limited provenance documentation.

## Run the preview locally

Use the Node.js version configured on the Vercel project, currently 24.x. For a fully configured preview, provide the existing Preview environment through your hosting or local secret manager. See [.env.example](../../.env.example) for environment variable names.

```sh
npm ci
npm run typecheck
npm run build
npm start
```

`npm run build` includes the existing repository tests and strict dictionary checks. For visual QA with the hosted preview's indexing behavior, run the build and start commands with `VERCEL_ENV=preview`. Local runs without connected services use the application's published static fare matrix and the reviews fallback. The final booking quote requires the configured server-side pricing service.

Preview review stays on a feature branch and the existing protected Vercel Preview environment. Production promotion requires explicit owner approval.
