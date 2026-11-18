# Royal Immersion — Browser QA and source evidence

**Run date:** 2026-11-18
**Git branch:** \`feature/royal-immersion-qa-preview-20261118\`
**Tested Preview commit:** \`77bdc1c24886168559a170d86782773e80d880b0\`
**Preview host:** \`royal-umrah-cabs-ktzpn518w-sayed6.vercel.app\`
**Tool:** Headless Chromium 159 / Playwright 1.65 in isolated Vercel Sandbox. No actual booking or review was submitted.

## Responsive visual test
| Browser viewport | Horizontal overflow | Cinematic hero height | FAQ heading exists |
|---|---|---|---|
| 375×844 | NO | 640px | YES |
| 390×844 | NO | 640px | YES |
| 430×932 | NO | 660px | YES |
| 768×1024 | NO | 660px | YES |
| 1024×768 | NO | 740px | YES |
| 1440×900 | NO | 780px | YES |

All rendered the Arabic headline \`رحلتك تستحق / عناية استثنائية.\`. The browser loaded the mobile video with \`readyState=4\`, muted, using approved \`hero-mobile.mp4\` and \`hero-poster.jpg\`.

### Screenshot evidence
- [Mobile first-screen capture — Chromium at 390px](./evidence/mobile-390.jpg). This is a downsampled **real browser screenshot**, not an AI-generated rendering.
- Desktop at 1440px was screenshotted and inspected during the sandbox QA session. The full-resolution desktop file was not retained when the ephemeral sandbox stopped; do not represent it as a permanent artifact.
- No full-page source screenshot or the original three third-party reference videos were recoverable from current accessible attachments. No invented timestamps.

## Booking and controls
- Browser selected \`Makkah\` as pickup, \`Taif\` as destination, \`Toyota Camry\`, and 2 guests.
- Fare shown: **400 SAR** (matches approved \`makkah-to-taif/camry\`).
- Continue button enabled and navigated using **GET only** to:
  \`/ar/booking?route=makkah-to-taif&vehicle=toyota-camry&passengers=2&type=transfer\`
- Existing \`.duyuf-booking-wizard\` was detected (1 instance). No test reservation was submitted.
- Changing fleet selection to the interior photo changed the image as expected.
- Six FAQ accordion buttons were present; toggling the first changed \`aria-expanded\`.
- Public GET \`/api/reviews\` returned HTTP 200 and \`success:true\`. This does **not** prove writes; review POST was not invoked.

## Page reachability
- \`/ar\`, \`/en\`, \`/ar/fleet\`, \`/ar/booking\`, \`/ms\`: HTTP 200 via browser/Vercel preview access.
- No unhandled app JS exceptions were observed in the tested browser run.
- Five console messages were blocked attempts from Vercel's own \`vercel.live\` feedback overlay script due to site Content Security Policy. These are **Preview overlay CSP** messages, not app runtime failures.

## Last source improvements (following the browser test)
- GSAP 3.15.1 / ScrollTrigger only for restrained in-view heading reveals; respects \`prefers-reduced-motion\` and cleans up effects on unmount.
- Next metadata should return \`noindex,nofollow\` on Vercel Preview, preserving full canonical/hreflang metadata and production indexing on the official domain.
- Final Vercel build and metadata check required after this change.

## Explicit acceptance gaps
- The design is **not yet completed across all 10 locales**: Arabic and English have the new homepage; the eight other locale homepages are preserved as functional originals rather than replaced with English.
- Not all page templates have been completely redesigned, although booking/fleet retain earlier preview visual adaptation.
- No honest frame-accurate breakdown of the three reference videos was possible without the source video files.
- No actual user conversion or performance benchmark/field Core Web Vitals has been measured.
- Do not merge/promote to production without owner visual approval.
