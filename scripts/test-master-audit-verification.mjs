import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const LOCALES = ['ar', 'en', 'ms', 'id', 'ur', 'fr', 'es', 'de', 'tr', 'hi'];
const readRepoFile = (relPath) => fs.readFileSync(path.join(ROOT, relPath), 'utf8');

test('1. Global Theme System: Light & Dark Mode tokens, no circular CSS variables, 10-locale ThemeToggle', () => {
  const globalsCss = readRepoFile('src/app/globals.css');
  const homepageCss = readRepoFile('src/styles/homepage-v3.css');
  const subpagesCss = readRepoFile('src/styles/luxury-subpages.css');
  const themeToggle = readRepoFile('src/components/common/ThemeToggle.tsx');

  assert.ok(globalsCss.includes('--bg-base: #F7F5F0'), 'Light mode base token #F7F5F0 present');
  assert.ok(globalsCss.includes('--bg-base: #0B111A'), 'Dark mode base token #0B111A present');
  assert.ok(!homepageCss.includes('--ink: var(--ink)'), 'No circular --ink variable in homepage-v3.css');
  assert.ok(!subpagesCss.includes('--ink: var(--ink)'), 'No circular --ink variable in luxury-subpages.css');

  for (const loc of LOCALES) {
    assert.ok(themeToggle.includes(`${loc}: {`), `ThemeToggle has localized labels for ${loc}`);
  }
});

test('2. Automatic Language Detection & Middleware: Cookie + Accept-Language + HTTP 307 + Vary header', () => {
  const mw = readRepoFile('src/middleware.ts');
  assert.ok(mw.includes('duyuf_locale_preference'), 'Middleware checks duyuf_locale_preference cookie');
  assert.ok(mw.includes('accept-language'), 'Middleware parses Accept-Language header');
  assert.ok(mw.includes('307'), 'Middleware issues HTTP 307 temporary redirect');
  assert.ok(mw.includes('Vary') && mw.includes('Accept-Language, Cookie'), 'Middleware sets Vary: Accept-Language, Cookie');
});

test('3. Booking 4-Step Flow & Pricing Integrity: Journey -> Details -> Vehicle -> Review & Request, no 200 SAR fallback', () => {
  const bookingEngine = readRepoFile('src/components/booking/BookingEngine.tsx');
  const bookingWizard = readRepoFile('src/components/booking/BookingWizard.tsx');

  assert.ok(!bookingWizard.includes("|| 200"), 'BookingWizard does not invent 200 SAR fallback fare');
  assert.ok(!bookingEngine.includes("rates['camry'] || 200"), 'BookingEngine does not invent 200 SAR fallback fare');
  assert.ok(bookingEngine.includes('step1Title') && bookingEngine.includes('step2Title') && bookingEngine.includes('step3Title') && bookingEngine.includes('step4Title'), 'BookingEngine defines all 4 steps');
});

test('4. Pricing Page Redesign: Single Smart Price Explorer without duplicate matrix table', () => {
  const pricingPage = readRepoFile('src/app/[locale]/pricing/page.tsx');
  const pricingExp = readRepoFile('src/components/pricing/RouteBasedPricingExperience.tsx');

  assert.ok(pricingPage.includes('RouteBasedPricingExperience'), 'Pricing page renders RouteBasedPricingExperience');
  assert.ok(!pricingExp.includes('completeMatrixTitle'), 'Removed redundant full route matrix table from Pricing page');
});

test('5. Fleet & Vehicle Detail Pages: 3 features, starting price, synchronized capacities, Light/Dark theme support', () => {
  const fleetCatalog = readRepoFile('src/components/fleet/FleetCatalog.tsx');
  const fleetDetail = readRepoFile('src/app/[locale]/fleet/[slug]/page.tsx');
  const autoShowroom = readRepoFile('src/components/fleet/AutomotiveShowroomExperience.tsx');

  assert.ok(fleetCatalog.includes('.slice(0, 3)'), 'FleetCatalog limits vehicle card features to 3');
  assert.ok(fleetCatalog.includes('startingFrom'), 'FleetCatalog shows route-based starting price on each card');
  const showcaseData = readRepoFile('src/data/fleet-showcase-data.ts');
  assert.ok(showcaseData.includes("id: \'camry\'") && showcaseData.includes("passengers: 4") && showcaseData.includes("luggage: 3"), 'Fleet detail page Camry capacity is 4 seats / 3 bags');
  assert.ok(!autoShowroom.includes("seats: '3 الركاب'"), 'AutomotiveShowroomExperience Camry capacity fixed to 4 passengers');
});

test('6. Security & Infrastructure Hardening: No hardcoded admin password backdoor or hardcoded Supabase URL', () => {
  const ownerSession = readRepoFile('src/lib/auth/owner-session.ts');
  const loginRoute = readRepoFile('src/app/api/admin/auth/login/route.ts');
  const fleetDb = readRepoFile('src/lib/fleet-db.ts');
  const pricingDb = readRepoFile('src/lib/pricing-db.ts');

  assert.ok(!ownerSession.includes("'admin'"), 'Removed hardcoded admin password from owner-session.ts');
  assert.ok(!loginRoute.includes("password === 'admin'"), 'Removed hardcoded admin password from login/route.ts');
  assert.ok(!fleetDb.includes('https://xqqrzzfdxfbznxwgxphu.supabase.co'), 'Removed hardcoded project Supabase URL from fleet-db.ts');
  assert.ok(pricingDb.includes('persistSession: false'), 'Disabled client session persistence in server pricing-db.ts');
});

test('7. SEO & GEO Compliance: TravelAgency JSON-LD and 10-Locale llms.txt / llms-full.txt', () => {
  const ziyaratJsonLd = readRepoFile('src/components/seo/ZiyaratJsonLd.tsx');
  const llmsTxt = readRepoFile('public/llms.txt');
  const llmsFullTxt = readRepoFile('public/llms-full.txt');

  assert.ok(!ziyaratJsonLd.includes("'@type': 'TourOperator'"), 'Replaced TourOperator schema with TravelAgency');
  assert.ok(llmsTxt.includes('10 Supported Locales') || llmsTxt.includes('/tr') && llmsTxt.includes('/hi'), 'llms.txt documents all 10 locales');
  assert.ok(llmsFullTxt.includes('Makkah Hotel to Madinah Hotel') && llmsFullTxt.includes('1,000 SAR'), 'llms-full.txt documents authoritative Yukon XL 1,000 SAR Makkah-Madinah fare');
});

test('8. Global Footer & Services Page Redesign: 10-locale selector, real photography, locations, 24/7 badge & related routes', () => {
  const footer = readRepoFile('src/components/layout/Footer.tsx');
  assert.ok(footer.includes('Footer Language Selector'), 'Footer must include a 10-locale language selector');
  assert.ok(footer.includes('LOCALIZED_ROUTE_NAMES'), 'Footer must localize popular route links');

  const services = readRepoFile('src/app/[locale]/services/page.tsx');
  assert.ok(services.includes('<Image'), 'Services page must display real photography for each service');
  assert.ok(services.includes('locationsLabel'), 'Services page must display relevant locations for each service');
  assert.ok(services.includes('availabilityLabel'), 'Services page must display 24/7 availability badge');
  assert.ok(services.includes('relatedRoutesLabel'), 'Services page must display related route links');
});

test('9. Ziyarat & Routes Integrity: Authoritative Ziyarat fares, verified capacities, zero bank transfer or complimentary Zamzam claims', () => {
  const sacredZiyarat = readRepoFile('src/components/ziyarat/SacredZiyaratExperience.tsx');
  assert.ok(!sacredZiyarat.includes('نقداً أو بالتحويل الفوري'), 'SacredZiyaratExperience must not claim bank transfer');
  assert.ok(!sacredZiyarat.includes('instantaneous local transfer'), 'SacredZiyaratExperience must not claim local transfer');
  assert.ok(sacredZiyarat.includes('camry: 250,') && sacredZiyarat.includes('yukon: 450,'), 'SacredZiyaratExperience must use authoritative Ziyarat tour fares');
  assert.ok(sacredZiyarat.includes('pax: 4,\n      bags: 3,'), 'SacredZiyaratExperience must use verified Camry 4/3 capacity');

  const airportExp = readRepoFile('src/components/routes/AirportTransferExperience.tsx');
  assert.ok(!airportExp.includes('Chilled Zamzam Hospitality'), 'AirportTransferExperience must not claim complimentary chilled Zamzam');
  assert.ok(!airportExp.includes('bg-[#101725]'), 'AirportTransferExperience must use theme-aware surface tokens instead of hardcoded dark hex');

  const intercityExp = readRepoFile('src/components/routes/IntercityRouteExperience.tsx');
  assert.ok(!intercityExp.includes('chilled Zamzam water'), 'IntercityRouteExperience must not claim complimentary chilled Zamzam');
  assert.ok(!intercityExp.includes('bg-[#101725]'), 'IntercityRouteExperience must use theme-aware surface tokens instead of hardcoded dark hex');

  const pricingTable = readRepoFile('src/components/pricing/PricingTable.tsx');
  assert.ok(!pricingTable.includes('?? 1000'), 'PricingTable must not invent 1000 SAR fallback for Makkah-Madinah Coaster');
  assert.ok(!pricingTable.includes('?? 3500'), 'PricingTable must not invent 3500 SAR fallback for Riyadh Coaster');
});

test('10. Editorial guides use genuine-localization canonical, robots and hreflang', () => {
  const guideSlug = readRepoFile('src/app/[locale]/guides/[slug]/page.tsx');
  assert.ok(guideSlug.includes("editorialAlternates(locale, `/guides/${slug}`)"), 'Guides must only publish hreflang for genuinely localized bodies');
  assert.ok(guideSlug.includes("editorialRobots(locale)"), 'English-fallback guide versions must remain noindex until translated');
  assert.ok(!guideSlug.includes('bg-charcoal text-white'), 'Guide detail pages must use theme-aware surface tokens');
  assert.ok(guideSlug.includes('GUIDE_UI_I18N'), 'Guide detail pages must localize all UI labels across all 10 languages');
});
