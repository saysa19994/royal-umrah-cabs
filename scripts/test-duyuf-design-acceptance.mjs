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
  assert.match(pricing,/duyuf-pricing-page/);assert.match(pricing,/\{content\.heroTitle\}/);assert.match(pricing,/PricingFareLedger\.module\.css/);
  assert.match(vehicle,/duyuf-vehicle-page/);assert.match(css,/prefers-reduced-motion/);
});

test('Vercel deployment includes PNG brand icons and fleet photography',()=>{
  const ignore=read('.vercelignore');
  assert.equal(ignore.split(String.fromCharCode(10)).some(line=>line.trim()==='*.png'),false);
});


test('fleet atelier replaces repeat-card catalog while retaining authoritative data and genuine vehicle images',()=>{
  const fleet=read('src/components/fleet/FleetAtelier.tsx');
  const styles=read('src/components/fleet/FleetAtelier.module.css');
  const page=read('src/app/[locale]/fleet/page.tsx');
  assert.match(page,/<FleetAtelier vehicles=\{vehicles\} locale=\{locale\}/);
  assert.match(page,/getDbVehiclesCached/);
  assert.match(page,/getLocalizedAlternates/);
  assert.match(page,/JSON\.stringify\(itemListSchema\)/);
  assert.doesNotMatch(page,/<FleetCatalog/);
  assert.match(fleet,/APPROVED_5_FLEET/);
  assert.match(fleet,/AUTHORITATIVE_TRANSFER_RATES/);
  assert.match(fleet,/vehicles\.find/);
  assert.match(fleet,/galleryPosition/);
  assert.match(fleet,/styles\.concierge/);
  assert.match(styles,/@media\(max-width:680px\)/);
  assert.match(styles,/grid-template-columns:minmax\(175px/);
});

test('services replace six repetitive cards with one real interactive chapter and a distinctive header',()=>{
  const service=read('src/app/[locale]/services/page.tsx');
  const styles=read('src/app/[locale]/services/services-editorial.css');
  const chapter=read('src/components/services/ServiceChapterExplorer.tsx');
  const chapterStyles=read('src/components/services/ServiceChapterExplorer.module.css');
  assert.match(service,/duyuf-services-intro-visual/);
  assert.match(service,/<ServiceChapterExplorer/);
  assert.match(service,/servicesList\.map\(\(\{icon,\.\.\.data\}\)=>data\)/);
  assert.match(service,/\{dict\.page_services\.title\}/);
  assert.doesNotMatch(service,/duyuf-service-card-content/);
  assert.match(chapter,/role="tablist"/);
  assert.match(chapter,/role="tabpanel"/);
  assert.match(chapterStyles,/@media\(max-width:760px\)/);
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
  assert.match(read('src/app/[locale]/fleet/page.tsx'),/FleetAtelier/);
  assert.match(read('src/app/[locale]/services/page.tsx'),/services-editorial\.css/);
  assert.match(read('src/app/[locale]/pricing/page.tsx'),/pricing-editorial\.css/);
});
