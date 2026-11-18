import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const component=read('src/components/home/PrivateJourneyHomepage.tsx');
const stylesheet=read('src/components/home/PrivateJourneyHomepage.module.css');

test('real route and fare engine are preserved, with booking requests rather than fake checkout',()=>{
  assert.match(read('src/app/[locale]/page.tsx'),/<SignatureFusionHomepage/);
  assert.match(component,/AUTHORITATIVE_TRANSFER_RATES/);
  assert.match(component,/LOCALIZED_ROUTE_NAMES/);
  assert.match(component,/APPROVED_5_FLEET/);
  assert.match(component,/router\.push\(/);
  assert.match(component,/new URLSearchParams/);
  assert.match(component,/type:'transfer'/);
  assert.doesNotMatch(component,/fetch\(['"]\/api\/bookings/);
  assert.doesNotMatch(component,/\|\|\s*200|\?\?\s*200|Instant Confirmation/);
  assert.match(component,/Number\.isFinite\(price\)/);
});

test('all ten locales have original homepage decision copy without English fallback',()=>{
  const decisions=read('src/data/duyuf-homepage-decision-copy.ts');
  const localizations=read('src/data/duyuf-homepage-layout-copy.ts');
  for(const language of ['ar','en','ms','id','ur','fr','es','de','tr','hi']){
    assert.ok(component.includes(language+": { heroA:"),"Missing hero translation "+language);
    assert.ok(decisions.includes('  '+language+': {'),"Missing homepage decision copy "+language);
    assert.ok(localizations.includes('  '+language+': {'),"Missing homepage layout copy "+language);
  }
  assert.match(component,/HOMEPAGE_DECISION_COPY\[locale\]/);
  assert.match(component,/DUYUF_HOME_LAYOUT\[locale\]/);
  assert.doesNotMatch(component,/selectedFleetVehicle\.summary\.en/);
});

test('genuine responsive cinematic video remains full bleed and respects reduced motion',()=>{
  assert.match(component,/<video/);
  assert.match(component,/poster="\/assets\/homepage-v2\/hero-poster\.jpg"/);
  assert.match(component,/hero-mobile\.webm/);
  assert.match(component,/hero-mobile\.mp4/);
  assert.match(component,/hero\.webm/);
  assert.match(component,/hero\.mp4/);
  assert.match(component,/prefers-reduced-motion: reduce/);
  assert.match(stylesheet,/\.heroVideo\{position:absolute;inset:0/);
  assert.match(stylesheet,/\.heroVeil\{position:absolute/);
  for(const asset of ['hero.mp4','hero.webm','hero-mobile.mp4','hero-mobile.webm','hero-poster.jpg']){
    assert.ok(fs.existsSync(path.join(root,'public/assets/homepage-v2',asset)),asset+" missing");
  }
});

test('visually new homepage: floating booking, factual feature tiles, side-by-side comparison, fare matrix and five-car grid',()=>{
  const sections=[...component.matchAll(/<section className=\{styles\.(\w+)\}/g)].map(m=>m[1]);
  assert.deepEqual(sections,[
    'hero','bookingArea','whyChoose','compareSection',
    'pricingSection','fleetSection','trustSection','faqSection','finalBand'
  ]);
  for(const part of ['bookingPanel','featureGrid','compareGrid','pricingTable','vehicleGrid','trustGrid']){
    assert.match(component,new RegExp('styles\\.'+part));
    assert.match(stylesheet,new RegExp('\\.'+part+'\\{'));
  }
  assert.doesNotMatch(component,/fleetStage|fleetSelector|arcTrack|experienceSection|routesSection|stepsSection/);
  assert.match(stylesheet,/--cream:#faf9f6/);
  assert.match(stylesheet,/\.vehiclePhoto\{display:flex[^}]*height:176px/);
  assert.match(stylesheet,/@media\(max-width:560px\)/);
  assert.match(stylesheet,/@media\(max-width:370px\)/);
  assert.match(stylesheet,/prefers-reduced-motion:reduce/);
});

test('five approved cars come from existing data and are not hard-coded duplicates',()=>{
  assert.match(component,/APPROVED_5_FLEET\.map\(car=>/);
  assert.match(component,/car\.exteriorImage/);
  assert.match(component,/car\.passengers/);
  assert.match(component,/car\.luggage/);
  assert.match(component,/car\.bookingParam/);
  assert.doesNotMatch(component,/fake|dummy|mockVehicle|testimonials:\[/i);
});

test('homepage has precisely one custom final CTA and suppresses the generic photo banner',()=>{
  const footer=read('src/components/layout/CinematicFooterCta.tsx');
  const layout=read('src/app/[locale]/layout.tsx');
  assert.match(component,/className=\{styles\.finalBand\}/);
  assert.match(component,/className=\{styles\.finalLink\}/);
  assert.match(layout,/<CinematicFooterCta/);
  assert.match(footer,/isSubpage \|\| isHomePage/);
  assert.doesNotMatch(footer,/stripPhotos\.map/);
  assert.doesNotMatch(component,/cinematic-footer-cta-heading|footerStrip/);
});

test('homepage FAQ structured data matches the four real accordion questions',()=>{
  const jsonld=read('src/components/seo/JsonLd.tsx');
  const faq=jsonld.split('export function HomepageFaqJsonLd')[1]?.split('export function FaqJsonLd')[0];
  assert.ok(faq);
  for(const i of [2,3,5,9]){
    assert.match(faq,new RegExp('dict\\.faq\\.q'+i));
    assert.match(component,new RegExp('dict\\.faq\\.q'+i));
  }
  assert.match(component,/hidden=\{activeFaq!==i\}/);
  assert.doesNotMatch(component,/10,000\+|5[,.]0?\/5/);
});


test('public fleet slugs are mapped to authoritative short rate keys, never displayed as unavailable fares',()=>{
  for(const pair of [
    "'toyota-camry':'camry'",
    "'hyundai-staria':'staria'",
    "'gmc-yukon-xl':'yukon'",
    "'toyota-hiace':'hiace'",
    "'toyota-coaster':'coaster'",
  ])assert.ok(component.includes(pair),'Missing price normalization for '+pair);
  assert.ok(component.includes('AUTHORITATIVE_TRANSFER_RATES[item.slug]?.[FARE_VEHICLE_KEYS[car.bookingParam]]'));
  assert.match(component,/POPULAR_ROUTES\.map/);
  assert.match(component,/ROUTES\.slice\(0,4\)/);
  const publishedRoutes=[
    'jeddah-airport-to-makkah','makkah-to-madinah','madinah-airport-to-hotel',
    'jeddah-airport-to-madinah','makkah-to-taif','jeddah-to-taif',
    'riyadh-to-makkah','riyadh-to-madinah','makkah-ziyarat','madinah-ziyarat'
  ];
  for(const slug of publishedRoutes){
    assert.ok(component.includes("slug:'"+slug+"'"),'Route missing from homepage booking: '+slug);
  }
});


test('editorial v3 uses numbered service rows, one focused fleet vehicle, and unboxed trust facts',()=>{
  assert.match(component,/styles\.whyEditorial/);
  assert.match(component,/styles\.featureNumber/);
  assert.match(component,/selectedFleetIndex,setSelectedFleetIndex/);
  assert.match(component,/setSelectedFleetIndex\(index\)/);
  assert.match(component,/aria-pressed=\{selectedFleetIndex===index\}/);
  assert.match(component,/styles\.fleetShowcase/);
  assert.match(component,/styles\.trustEditorial/);
  assert.match(stylesheet,/\.fleetShowcase\{display:grid/);
  assert.match(stylesheet,/\.trustEditorial\{display:grid/);
  assert.match(stylesheet,/scroll-snap-type:x mandatory/);
});
