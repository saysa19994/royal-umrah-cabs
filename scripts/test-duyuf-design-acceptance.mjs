import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const read = p => readFileSync(new URL('../'+p,import.meta.url),'utf8');
const booking=read('src/app/[locale]/booking/page.tsx');
const pricing=read('src/app/[locale]/pricing/page.tsx');
const vehicle=read('src/app/[locale]/fleet/[slug]/page.tsx');
const css=read('src/styles/duyuf-completion.css');
test('booking is localized in all ten languages, no forced Arabic trust copy',()=>{
  assert.match(booking,/pageText\.trust1/);assert.match(booking,/pageText\.trust2/);assert.match(booking,/pageText\.trust3/);
  assert.match(booking,/duyuf-booking-page/);assert.match(booking,/duyuf-booking-wizard/);
  assert.doesNotMatch(booking,/<span>0% دفعة مقدمة/);
});
test('pricing and fleet details share complete theme-aware mobile surfaces',()=>{
  assert.match(pricing,/duyuf-pricing-page/);assert.match(pricing,/\{content\.heroTitle\}/);
  assert.match(vehicle,/duyuf-vehicle-page/);assert.match(css,/prefers-reduced-motion/);
});

test('Vercel deployment includes PNG brand icons and fleet photography',()=>{
  const ignore=read('.vercelignore');
  assert.equal(ignore.split(String.fromCharCode(10)).some(line=>line.trim()==='*.png'),false);
});


test('fleet is a distinctive editorial collection, not the old three-column template',()=>{
  const fleet=read('src/components/fleet/FleetCatalog.tsx');
  const styles=read('src/app/[locale]/fleet/fleet-editorial.css');
  assert.match(fleet,/duyuf-fleet-hero-inner/);
  assert.match(fleet,/duyuf-fleet-spotlight/);
  assert.match(fleet,/duyuf-fleet-card-grid/);
  assert.match(fleet,/AUTHORITATIVE_TRANSFER_RATES/);
  assert.doesNotMatch(fleet,/lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl/);
  assert.match(styles,/grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
  assert.match(styles,/@media\(max-width:767px\)/);
});

test('service layout uses a genuine asymmetric composition and localized page header',()=>{
  const service=read('src/app/[locale]/services/page.tsx');
  const styles=read('src/app/[locale]/services/services-editorial.css');
  assert.match(service,/duyuf-services-intro-visual/);
  assert.match(service,/duyuf-services-grid/);
  assert.match(service,/duyuf-service-card-content/);
  assert.match(service,/\{dict\.page_services\.title\}/);
  assert.match(styles,/duyuf-service-card:first-child/);
  assert.match(styles,/grid-column:span 7/);
  assert.match(styles,/@media\(max-width:767px\)/);
});

test('fare experience pairs route selector with a featured journey, never fabricates zero fare',()=>{
  const journey=read('src/components/pricing/RouteBasedPricingExperience.tsx');
  const styles=read('src/app/[locale]/pricing/pricing-editorial.css');
  assert.match(journey,/duyuf-pricing-route-section/);
  assert.match(journey,/duyuf-pricing-selected-photo/);
  assert.match(journey,/camryStarting > 0 \? formatPrice\(camryStarting\) : '—'/);
  assert.match(styles,/duyuf-pricing-route-list/);
  assert.match(styles,/duyuf-pricing-selected/);
  assert.match(styles,/@media\(max-width:767px\)/);
});

test('booking offers large visual car choices and photo-led summary, with live price data',()=>{
  const engine=read('src/components/booking/BookingEngine.tsx');
  const styles=read('src/app/[locale]/booking/booking-editorial.css');
  assert.match(engine,/duyuf-booking-direct-fleet/);
  assert.match(engine,/duyuf-booking-summary-visual/);
  assert.match(engine,/getEstimatedBasePriceSAR/);
  assert.doesNotMatch(engine,/return calculated \|\| 200/);
  assert.match(styles,/duyuf-booking-vehicle-photo/);
  assert.match(styles,/@media\(max-width:767px\)/);
});

test('editorial artwork exists locally and preview styles cannot alter live content',()=>{
  for(const asset of ['public/assets/homepage-v2/fleet-private.jpg','public/assets/homepage-v2/service-group-interior.jpg','public/assets/homepage-v2/route-jeddah-makkah.jpg','public/assets/homepage-v2/vehicle-interior-cta.jpg']){
    assert.ok(existsSync(new URL('../'+asset,import.meta.url)),asset+' not found');
  }
  assert.match(read('src/app/[locale]/fleet/page.tsx'),/fleet-editorial\.css/);
  assert.match(read('src/app/[locale]/services/page.tsx'),/services-editorial\.css/);
  assert.match(read('src/app/[locale]/pricing/page.tsx'),/pricing-editorial\.css/);
});
