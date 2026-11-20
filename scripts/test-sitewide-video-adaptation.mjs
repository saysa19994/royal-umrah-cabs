import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');

const fleet=read('src/components/fleet/FleetCatalog.tsx');
const fleetCss=read('src/app/[locale]/fleet/fleet-editorial.css');
const routePage=read('src/app/[locale]/routes/page.tsx');
const spotlight=read('src/components/routes/RouteSpotlightExplorer.tsx');
const routeCss=read('src/components/routes/RouteSpotlightExplorer.module.css');
const guides=read('src/app/[locale]/guides/page.tsx');
const guideCss=read('src/app/[locale]/guides/guides-editorial.css');
const contact=read('src/app/[locale]/contact/page.tsx');
const contactCss=read('src/app/[locale]/contact/contact-editorial.css');

test('sitewide visual adaptations are distributed, not stacked onto the homepage',()=>{
 assert.match(routePage,/<RouteNetworkDesk locale=\{locale\} rates=\{rates\} routeStatus=\{routeStatus\} routeImages=\{routeImages\} \/>/);
 assert.match(fleet,/duyuf-fleet-gallery-controls/);
 assert.match(guides,/duyuf-guide-reading-list/);
 assert.match(contact,/duyuf-contact-layout/);
 assert.doesNotMatch(read('src/components/home/SignatureJourneyHomepage.tsx'),/RouteSpotlightExplorer|duyuf-guide-reading-list|duyuf-contact-layout/);
});
test('route spotlight has valid images and truthful dynamic route and fleet data',()=>{
 for(const p of [
  'public/assets/homepage-v2/route-jeddah-makkah.jpg',
  'public/assets/images/routes/makkah-to-madinah.jpg',
  'public/assets/images/routes/makkah-to-taif.jpg',
 ]) assert.ok(existsSync(new URL('../'+p,import.meta.url)),p);
 assert.match(spotlight,/LOCALIZED_ROUTE_NAMES\[route\.slug\]/);
 assert.match(spotlight,/AUTHORITATIVE_TRANSFER_RATES\[route\.slug\]\?\.\[FARE_KEYS\[car\.bookingParam\]\]/);
 assert.match(spotlight,/Number\.isFinite\(price\)/);
 assert.match(spotlight,/APPROVED_5_FLEET/);
 assert.match(spotlight,/\/booking\?route=/);
 assert.match(spotlight,/\/contact/);
 assert.doesNotMatch(spotlight,/fake|mockFare|Instant Confirmation|Pay Now/i);
});
test('route spotlight supports all 10 localized interfaces and controlled focus states',()=>{
 for(const loc of ['ar','en','ms','id','ur','fr','es','de','tr','hi'])
   assert.ok(spotlight.includes(' '+loc+':{overline:'),'Missing '+loc);
 assert.match(spotlight,/aria-selected=\{selectedRoute===i\}/);
 assert.match(spotlight,/aria-pressed=\{selectedCar===i\}/);
 assert.match(routeCss,/@media\(max-width:700px\)/);
 assert.match(routeCss,/@media\(prefers-reduced-motion:reduce\)/);
});
test('fleet uses the five existing vehicle assets and a keyboard accessible manual photo gallery',()=>{
 assert.match(fleet,/APPROVED_5_FLEET\.find\(/);
 assert.match(fleet,/spotlightMedia\?\.exteriorImage/);
 assert.match(fleet,/spotlightMedia\?\.interiorImage/);
 assert.match(fleet,/aria-pressed=\{spotlightPhotoMode === 'interior'\}/);
 assert.match(fleet,/aria-pressed=\{spotlightVehicleId === vehicle.id\}/);
 assert.match(fleet,/setSpotlightPhotoMode\('exterior'\)/);
 assert.match(fleet,/AUTHORITATIVE_TRANSFER_RATES/);
 assert.match(fleetCss,/@media\(max-width:767px\)/);
 assert.match(fleetCss,/prefers-reduced-motion:reduce/);
 for(const loc of ['ar','en','ms','id','ur','fr','es','de','tr','hi'])
   assert.ok(fleet.includes(' '+loc+':{label:'),'Missing photo controls '+loc);
});
test('guides adopt asymmetrical editorial grids, with real guide URLs and metadata intact',()=>{
 assert.match(guides,/COMPREHENSIVE_GUIDES\.map/);
 assert.match(guides,/duyuf-guide-categories/);
 assert.match(guides,/duyuf-guide-reading-list/);
 assert.match(guides,/getLocalizedAlternates\(locale, '\/guides'\)/);
 assert.match(guideCss,/\.duyuf-guide-reading-item:first-child/);
 assert.match(guideCss,/@media\(max-width:639px\)/);
});
test('contact uses existing live form without changing channel data or submission backend',()=>{
 assert.match(contact,/<ContactForm locale=\{locale\} dict=\{dict\} \/>/);
 assert.match(contact,/settings\.whatsapp_number/);
 assert.match(contact,/settings\.email/);
 assert.match(contact,/duyuf-contact-channels/);
 assert.match(contactCss,/\.duyuf-contact-form-panel/);
 assert.match(contactCss,/@media\(max-width:900px\)/);
});
test('booking remains untouched and cash-only flow is protected',()=>{
 const booking=read('src/app/[locale]/booking/page.tsx');
 assert.match(booking,/<BookingWizard/);
 assert.match(booking,/getBookingDraft/);
 assert.match(booking,/initialRates=\{await getDbPricesCached\(\)\}/);
 assert.match(booking,/No deposit|دون عربون/);
});
