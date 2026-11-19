import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const routes=read('src/app/[locale]/routes/page.tsx');
const fleet=read('src/components/fleet/FleetCatalog.tsx');
const about=read('src/app/[locale]/about/page.tsx');
const pricing=read('src/app/[locale]/pricing/page.tsx');
const ziyarat=read('src/app/[locale]/ziyarat/page.tsx');
test('route page does not bury its live selector below ten duplicate scenic cards and a second fare matrix',()=>{
 assert.match(routes,/<RouteNetworkDesk locale=\{locale\} routes=\{publicRoutes\} rates=\{liveRates\}\s*\/>/);
 assert.match(routes,/publicRoutes\.map/);
 assert.doesNotMatch(routes,/<ExecutiveRouteCard/);
 assert.doesNotMatch(routes,/<PricingTable/);
 assert.match(routes,/liveRates\[route\.slug\]\?\.camry/);
 assert.match(routes,/\/routes\/'\+route\.slug/);
 assert.match(routes,/getLocalizedAlternates\(locale, '\/routes'\)/);
 assert.match(read('src/app/[locale]/routes/routes-overhaul.module.css'),/\.list\{list-style:none/);
});
test('fleet makes one selected vehicle the actual primary view, avoids repeated cards in all-state',()=>{
 assert.match(fleet,/const directoryVehicles = activeFilter === 'all' \? \[\] : filteredVehicles/);
 assert.match(fleet,/duyuf-fleet-showroom-toolbar/);
 assert.match(fleet,/setSpotlightVehicleId\(vehicle\.id\)/);
 assert.match(fleet,/spotlightMedia\?\.interiorImage/);
 assert.match(fleet,/spotlightMedia\?\.exteriorImage/);
 assert.match(fleet,/directoryVehicles\.length > 0/);
 assert.match(read('src/app/[locale]/fleet/fleet-editorial.css'),/duyuf-fleet-showroom-toolbar/);
});
test('about page is an actual story, not an old three-card template',()=>{
 assert.match(about,/about-story\.module\.css/);
 assert.match(about,/styles\.heroImage/);
 assert.match(about,/styles\.storyGrid/);
 assert.match(about,/styles\.valueList/);
 assert.match(about,/dict\.page_about\.storyP1/);
 assert.match(about,/dict\.page_about\.storyP2/);
 assert.match(about,/getLocalizedAlternates\(locale,'\/about'\)/);
 assert.doesNotMatch(about,/grid-cols-1 md:grid-cols-3 gap-8/);
 for(const lang of ['ar','en','ms','id','ur','fr','es','de','tr','hi'])assert.ok(about.includes('  '+lang+':{story:'),'Missing about UI '+lang);
});
test('pricing keeps live comparison and one factual reassurance story instead of extra fare-card pages',()=>{
 assert.match(pricing,/<RouteBasedPricingExperience/);
 assert.match(pricing,/initialRates=\{initialRates\}/);
 assert.match(pricing,/duyuf-pricing-principles/);
 assert.match(pricing,/styles\.workspace/);
 assert.match(pricing,/styles\.signoff/);
 assert.doesNotMatch(pricing,/fixed bottom-0 inset-x-0 z-50/);
 assert.match(pricing,/dict\.booking_card\.noPrepayNotice/);
 assert.doesNotMatch(pricing,/topOverviewRoutes\.map/);
 assert.doesNotMatch(pricing,/whyChooseBadges\.map/);
 assert.doesNotMatch(pricing,/Instant confirmation|تأكيد فوري/);
 assert.match(pricing,/duyuf-pricing-page/);
});
test('ziyarat header now includes a real photo-led composition and non-card field guide',()=>{
 assert.match(ziyarat,/duyuf-ziyarat-hero-grid/);
 assert.match(ziyarat,/duyuf-ziyarat-hero-copy/);
 assert.match(ziyarat,/duyuf-ziyarat-hero-image/);
 assert.match(ziyarat,/<ZiyaratPilgrimJournal locale=\{locale\}/);
 assert.doesNotMatch(ziyarat,/duyuf-ziyarat-steps grid/);
 assert.match(ziyarat,/<SacredZiyaratExperience locale=\{locale\}/);
 assert.match(ziyarat,/getLocalizedAlternates\(locale,\s*'\/ziyarat'\)/);
 assert.match(read('src/app/[locale]/ziyarat/ziyarat-narrative.css'),/@media\(max-width:767px\)/);
});
test('do not alter the cash-only booking engine or relabel booking as checkout',()=>{
 const booking=read('src/app/[locale]/booking/page.tsx');
 assert.match(booking,/<BookingWizard/);
 assert.match(booking,/getDbPricesCached/);
 assert.match(booking,/No deposit/);
 assert.doesNotMatch(routes,/Pay now|credit card/i);
});
