# Booking Atrium / distinct page layout
Owner specifically requested that booking not resemble Home, Fleet, or generic form template.

- New separate booking atrium module (only the page entrance), full editorial photo stage (the site's own photographed Jeddah pickup), dark typography, and slim three-part verified operator strip.
- Real existing 4-step BookingWizard/BookingEngine remain inside a **separate operational desk**, isolated from decorative hero and preserving existing route/vehicle/date/passengers/etc search params, DB pricing, draft restore error and cash-only policy.
- Do not copy the fleet museum design to booking. Booking is a utility, not a car photo gallery.
- Mobile receives a tailored short header and horizontal trust facts not giant cards.
- Legacy booking-editorial.css is still used by the real wizard (no rewrite to risk data loss); new layout module is isolated to the header and outer shell.
- Untouched: Supabase, admin, production, existing vehicle/route pricing, authentication, booking requests, cancellation and SEO alternates.
- 375/390/430 browser visual QA and actual booking submission test still outstanding; never assert completion from build only.
