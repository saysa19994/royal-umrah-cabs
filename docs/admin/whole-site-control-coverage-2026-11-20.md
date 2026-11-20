# Duyuf Al Rahman VIP — Whole-Website Admin Coverage

**Date:** 2026-11-20  
**Work branch:** `fix/site-controls-preview-ready-20261119`  
**Mode:** Preview-only code changes, production freeze  
**Scope:** The statements below describe code paths verified in the branch. Public UI acceptance and authenticated save-to-refresh tests have **not** been completed.

## Editorial / public experience coverage

| Public destination | Admin tool | Source of truth | Working scope | Outstanding |
| --- | --- | --- | --- | --- |
| Homepage `/[locale]` | `/admin/home-copy`, `/admin/site-assets`, `/admin/fleet`, `/admin/pricing` | `page_content` home-copy/images + published fleet/fare cache | Chosen headings/copy per locale; chosen site image slots; fleet photos and published fares | Some deeply nested decorative assets and marketing components remain code-defined; approved original hero video is deliberately preserved |
| Fleet `/[locale]/fleet` and vehicle details | `/admin/fleet`, `/admin/media` | `vehicles` and `prices` + approved fare rows | Vehicle availability, images, capacities, names, selected localized categories, rates | Concierge-only vehicles remain manual inquiry; all photo-caption/localized details not fully editable |
| Booking `/[locale]/booking` | `/admin/fleet`, `/admin/routes`, `/admin/pricing`, `/admin/site-assets`, `/admin/cms?page=booking` | Active `vehicles`, `routes`, approved fares, `page_content` | Booking cards use active fleet/photos/capacity; newly approved routes show with labels; disabled routes hidden; booking hero images and editorial heading editable | Full form layout / field schemas are still code-owned; booking request lifecycle requires live auth/sandbox acceptance |
| Route directory `/[locale]/routes` | `/admin/routes`, `/admin/pricing`, `/admin/cms?page=routes` | Active `routes`, published fare map, selected CMS fields | Named origin/destination, ten-language translations when provided, active status, prices, intro/SEO | Newly created route detail pages are not generated automatically; new entries link to booking |
| Existing route details `/[locale]/routes/[slug]` | `/admin/site-assets`, `/admin/pricing`, `/admin/routes` | Published fares + 10 route-image slots | Hero images and price snippets (including related trips) dynamically sourced from managed state | Complete route article/FAQ sections remain in code-localized templates |
| Pricing `/[locale]/pricing` | `/admin/pricing`, `/admin/cms?page=pricing` | Approved published fare rows and `page_content` | Live published price matrix, selected header/SEO | Approved payment rules are deliberately not open-ended editor fields |
| Blog `/[locale]/blog` and article pages | `/admin/blog`, `/admin/asset-library` | `page_content` article overrides + existing source articles | Titles, summaries, images, drafting/publishing, long-form AR/EN body | Eight other languages keep original localized content and should not be auto-published without real translations |
| About `/[locale]/about` | `/admin/cms?page=about`, `/admin/site-assets` | `page_content` | Heading, intro/story/value texts, SEO, 2 main images | Remaining bespoke components remain code-owned |
| Services `/[locale]/services` | `/admin/cms?page=services`, `/admin/site-assets` | `page_content` | Header/intro/SEO and 6 service images | Service-card body details and feature icon layout remain code-owned |
| Contact `/[locale]/contact` | `/admin/cms?page=contact`, `/admin/settings` | CMS page and site settings | Header, intro, form heading, SEO, published contact settings where wired | End-to-end form submission requires authenticated/staging verification |
| Ziyarat `/[locale]/ziyarat` | `/admin/cms?page=ziyarat` | `page_content` intro/SEO + existing licensed historical-photo catalog | H1/intro/SEO | Nine attributed historical-gallery images still code-owned; do not overwrite/license-misattribute them without a media-credit workflow |
| FAQ, Reviews, operators, drivers, collections, chat, dashboard | Existing admin modules | Existing operational tables/services | Routes/pages exist in repository | End-to-end verification blocked by separate authentication issues; no claim of complete live CRUD |
| Riyadh/Taif hub entries in CMS | `/admin/cms` | Stored CMS drafts | Saving allowed | The public page-specific templates are not connected; do not claim draft edits affect production |

## Data ownership and invariants

1. **Booking money:** no deposits, no card/POS/online transfer; client pays cash directly to the driver after trip completion. Neither blog nor generalized page editor may change the authoritative transaction rule.
2. **Approved fares:** new prices from the authorized pricing editor must explicitly publish the fare to the approved `page_content` record. Existing seed values are not owner approvals.
3. **Images:** uploaded files live in Supabase Storage `media`. Assigning an image to a page stores a URL in `page_content`; assigning a fleet photo stores it on `vehicles.photos`. Detaching a photo must not automatically delete an uploaded file possibly reused elsewhere.
4. **Ten locales:** `ar,en,ms,id,ur,fr,es,de,tr,hi`. Editing one locale must not silently rewrite the remaining nine. New public articles are AR/EN only pending translation and proper locale SEO.
5. **Cache:** invalidate only the appropriate `site_fleet/site_prices/site_media/site_cms/site_blog/site_routes` tags and targeted route pages; do not flush `/, layout` globally (ISR cost).
6. **Live data:** admin write endpoints require authorized roles. Avoid customer details in diagnostics, logs, public HTML or fixture data. No test bookings or fake reviews.
7. **Production:** the current branch is *not* an approved production release. Passing build and tests is necessary but not sufficient.

## Verification record

- Commit verified in isolated sandbox: `5f55c244b814b28e5a39843acb4eb86d77d9091f`
- `npm run typecheck`: PASS
- `npm test`: **251 passed / 0 failed**
- `npm run check-i18n`: PASS
- `npx next build`: PASS
- Production has not been overwritten by this work.
- Latest full Preview deploy creation was rejected by Vercel with HTTP 402 `api-deployments-free-per-day`. Earlier previews **do not include the latest branch head**.

## Mandatory acceptance gate before publishing

- [ ] Resolve Vercel deploy quota and create Preview for the exact reviewed commit.
- [ ] Use separate staging Supabase resources where possible; never write dummy bookings into live project.
- [ ] Resolve 500/login/MFA issues; confirm actual owner/admin login and restricted roles in a real browser.
- [ ] Edit a car exterior **on staging**, refresh homepage, fleet, fleet detail and booking step 2; verify all show the same photo and no hidden car appears.
- [ ] Publish a fare **on staging**, refresh pricing, route detail, booking quote and server calculation; verify exact matching SAR amounts.
- [ ] Add a named city/route and translation **on staging**, publish a fare, check booking list, then disable it and confirm it disappears without breaking old bookings.
- [ ] Publish and unpublish an AR/EN blog article with featured image; verify SEO and non-indexing of unpublished content.
- [ ] Replace an approved generic page image; verify only targeted page invalidates, video remains unchanged.
- [ ] Check mobile widths 375/390/430px and desktop 1440px for each editing flow, including error and loading states.
- [ ] Capture audit log entries, review authorization/CSRF protections and ensure no customer data leaks.
- [ ] Get owner release approval, backup confirmation, then merge/deploy via explicit production gate.

**Interpretation:** The work brings major day-to-day content controls into a central dashboard. It does **not** yet represent a universal Wix-like visual editor for every field on every route or article, nor a fully verified production operations console.
