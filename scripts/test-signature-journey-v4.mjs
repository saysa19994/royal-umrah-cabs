import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const page=read('src/app/[locale]/page.tsx');
const source=read('src/components/home/SignatureJourneyHomepage.tsx');
const styles=read('src/components/home/SignatureJourneyHomepage.module.css');

test('the new independent architect homepage is mounted; Signature Journey V4 remains a rollback reference',()=>{
  assert.match(page,/import \{JourneyArchitectHomepage\}/);
  assert.match(page,/<JourneyArchitectHomepage locale=\{locale\} dict=\{dict\}\/>/);
  assert.doesNotMatch(page,/<SignatureJourneyHomepage/);
  assert.doesNotMatch(page,/<PrivateJourneyHomepage/);
});
test('ten independently translated signature headings and action labels',()=>{
  for(const lang of ['ar','en','ms','id','ur','fr','es','de','tr','hi']){
    assert.ok(source.includes('  '+lang+':{kicker:'),'Missing V4 UI copy '+lang);
  }
  assert.match(source,/heroLead:'رحلتك تستحق',heroAccent:'عناية استثنائية\.'/);
  assert.match(source,/heroLead:'Your Journey,',heroAccent:'Our Priority\.'/);
  assert.match(source,/UI\[locale\]/);
  assert.match(source,/HOMEPAGE_DECISION_COPY\[locale\]/);
  assert.match(source,/DUYUF_HOME_LAYOUT\[locale\]/);
});
test('approved owner hero video and responsive media, with reduced-motion video pause',()=>{
  for(const asset of ['hero.mp4','hero.webm','hero-mobile.mp4','hero-mobile.webm','hero-poster.jpg']){
    assert.ok(existsSync(new URL('../public/assets/homepage-v2/'+asset,import.meta.url)),asset);
  }
  assert.match(source,/poster="\/assets\/homepage-v2\/hero-poster\.jpg"/);
  assert.match(source,/prefers-reduced-motion: reduce/);
  assert.match(source,/video\.pause\(\)/);
  assert.match(styles,/\.heroVideo\{position:absolute;inset:0/);
});
test('quick booking forwards exact real route, date, passengers and luggage, not instant checkout',()=>{
  for(const id of ['jeddah-airport-to-makkah','makkah-to-madinah','madinah-airport-to-hotel','makkah-to-taif','jeddah-airport-to-madinah','jeddah-to-taif','riyadh-to-makkah','riyadh-to-madinah','makkah-ziyarat','madinah-ziyarat']){
    assert.ok(source.includes("slug:'"+id+"'"),'Missing route '+id);
  }
  assert.match(source,/new URLSearchParams\(\{route,type:'transfer',passengers:travelers,luggage\}\)/);
  assert.match(source,/router\.push\('/);
  assert.match(source,/min=\{minDate\}/);
  assert.doesNotMatch(source,/fetch\(['"]\/api\/bookings/);
});
test('fare explorer uses authoritative price map, normalized public vehicle IDs and never invents price',()=>{
  assert.match(source,/AUTHORITATIVE_TRANSFER_RATES\[activeRoute\.slug\]\?\.\[FARE_KEYS\[car\.bookingParam\]\]/);
  assert.match(source,/typeof price==='number' && Number\.isFinite\(price\) && price>0/);
  assert.match(source,/APPROVED_5_FLEET\.map\(car=>/);
  for(const id of ["'toyota-camry':'camry'","'hyundai-staria':'staria'","'gmc-yukon-xl':'yukon'","'toyota-hiace':'hiace'","'toyota-coaster':'coaster'"])
    assert.ok(source.includes(id),id);
  assert.doesNotMatch(source,/Instant Confirmation|fakeFare|mockPrice|\|\|\s*200/);
});
test('interaction and semantically distinct non-template layouts exist',()=>{
  for(const cls of ['routeExplorer','routeRail','routeDisplay','fleetShowroom','fleetSelector','experienceLayout','chapterList','faqLayout','finalBand']){
    assert.ok(source.includes('styles.'+cls),'Missing component '+cls);
    assert.ok(styles.includes('.'+cls+'{'),'Missing styles '+cls);
  }
  assert.match(source,/aria-selected=\{index===activeRouteIndex\}/);
  assert.match(source,/setSelectedFleetIndex\(index\)/);
  assert.match(source,/setActiveChapterIndex\(index\)/);
  assert.match(source,/aria-pressed=\{activeChapterIndex===index\}/);
  assert.match(source,/hidden=\{activeFaq!==i\}/);
});
test('supported real photos and complete mobile breakpoints',()=>{
  for(const asset of ['fleet-private.jpg','service-group-interior.jpg','route-jeddah-makkah.jpg']){
    assert.ok(existsSync(new URL('../public/assets/homepage-v2/'+asset,import.meta.url)),asset);
  }
  assert.match(source,/activeCar\.exteriorImage/);
  assert.match(source,/activeCar\.interiorImage/);
  assert.match(styles,/@media\(max-width:1100px\)/);
  assert.match(styles,/@media\(max-width:820px\)/);
  assert.match(styles,/@media\(max-width:560px\)/);
  assert.match(styles,/@media\(max-width:370px\)/);
  assert.match(styles,/@media\(prefers-reduced-motion:reduce\)/);
});
test('real owner-approved cash-only payment, not fictional star ratings or prepay checkout',()=>{
  assert.match(source,/T\.payment/);
  assert.match(source,/dict\.booking_card\.noPrepayNotice/);
  assert.match(source,/T\.included/);
  assert.doesNotMatch(source,/10,000\+|4\.9\s*\/\s*5|pay now|online checkout/i);
});
test('homepage FAQ and JSON-LD remain aligned',()=>{
  const jsonld=read('src/components/seo/JsonLd.tsx');
  for(const q of [2,3,5,9]){
    assert.match(source,new RegExp('dict\\.faq\\.q'+q));
    assert.match(jsonld,new RegExp('dict\\.faq\\.q'+q));
  }
  assert.match(page,/<HomepageFaqJsonLd dict=\{dict\}/);
});
