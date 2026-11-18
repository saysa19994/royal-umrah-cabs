import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const home=read('src/components/home/SignatureJourneyHomepage.tsx');
const css=read('src/components/home/SignatureJourneyHomepage.module.css');
test('owner reference index3 scroll storytelling is mounted, pinned on desktop and accessible manually on mobile',()=>{
 assert.match(home,/ref=\{storyRef\}/);
 assert.match(home,/window\.requestAnimationFrame\(update\)/);
 assert.match(home,/section\.offsetHeight-window\.innerHeight/);
 assert.match(home,/prefers-reduced-motion: reduce/);
 assert.ok(home.indexOf('styles.experienceSection')<home.indexOf('styles.routesSection'));
 assert.match(css,/\.experienceSection>\.container\{position:sticky/);
 assert.match(css,/@media\(max-width:980px\),\(prefers-reduced-motion:reduce\)/);
 assert.match(home,/aria-pressed=\{activeChapterIndex===index\}/);
});
test('selected route changes an actual route photo and retains real price links',()=>{
 for(const slug of ['jeddah-airport-to-makkah','makkah-to-madinah','madinah-airport-to-hotel','makkah-to-taif'])assert.ok(home.includes("'"+slug+"':'/assets/images/routes/"),slug);
 assert.match(home,/FEATURED_ROUTE_IMAGES\[activeRoute\.slug\]/);
 assert.match(home,/styles\.routePhotoOverlay/);
 assert.match(css,/\.routePhoto\{height:240px/);
 assert.match(home,/AUTHORITATIVE_TRANSFER_RATES\[activeRoute\.slug\]\?\.\[FARE_KEYS\[car\.bookingParam\]\]/);
});
test('live hero, real booking and ten language variants remain intact',()=>{
 assert.match(home,/hero-mobile\.webm/);
 assert.match(home,/router\.push\('\/'\+locale\+'\/booking\?'/);
 assert.match(home,/APPROVED_5_FLEET\.map/);
 for(const lang of ['ar','en','ms','id','ur','fr','es','de','tr','hi'])assert.ok(home.includes('  '+lang+':{kicker:'),lang);
});
