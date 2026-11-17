import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const page=read('src/app/[locale]/page.tsx');
const jsx=read('src/components/home/JourneyArchitectHomepage.tsx');
const css=read('src/components/home/JourneyArchitectHomepage.module.css');
test('homepage switches to new isolated architecture, not another old CSS override',()=>{
 assert.match(page,/JourneyArchitectHomepage locale=\{locale\} dict=\{dict\}/);
 assert.doesNotMatch(page,/SignatureJourneyHomepage/);
 assert.match(page,/<HomepageFaqJsonLd dict=\{dict\}/);
 assert.doesNotMatch(css,/SignatureJourneyHomepage|\\.container/);
 for(const name of ['cinema','ticketZone','routeAtlas','fleetMuseum','travelEssay','truthStrip','questionRoom']) {
  assert.ok(jsx.includes('styles.'+name),'missing structural act '+name);
  assert.ok(css.includes('.'+name+'{'),'missing clean style '+name);
 }
});
test('one original hero video, six fundamentally distinct layouts, independent mobile designs',()=>{
 for(const src of ['hero-mobile.webm','hero-mobile.mp4','hero.webm','hero.mp4'])
  assert.ok(jsx.includes('/assets/homepage-v2/'+src),src);
 assert.match(css,/grid-template-areas:"names car info"/);
 assert.match(css,/grid-template-areas:"car" "names" "info"/);
 assert.match(css,/\.atlasStage\{max-width:1380px/);
 assert.match(css,/\.truthCells\{display:grid;grid-template-columns:repeat\(3/);
 assert.match(css,/@media\(max-width:700px\)/);
 assert.match(css,/@media\(max-width:390px\)/);
 assert.match(css,/prefers-reduced-motion:reduce/);
});
test('booking is live route/date/guests handoff, and all fares remain authoritative',()=>{
 assert.match(jsx,/router\.push\('\/'\+locale\+'\/booking\?'/);
 assert.match(jsx,/new URLSearchParams\(\{route,passengers:people,type:/);
 assert.match(jsx,/AUTHORITATIVE_TRANSFER_RATES/);
 assert.match(jsx,/APPROVED_5_FLEET/);
 assert.match(jsx,/LOCALIZED_ROUTE_NAMES/);
 assert.doesNotMatch(jsx,/customerCount|fakeReviews|Math\.random\(/);
});
