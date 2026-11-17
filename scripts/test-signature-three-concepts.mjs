import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const concepts=read('src/components/design-studio/SignatureStudioConcepts.tsx');
const css=read('src/components/design-studio/SignatureStudio.module.css');
const index=read('src/components/design-studio/StudioIndex.tsx');
const routes=read('src/app/(design-studio)/studio/[concept]/page.tsx');
const layout=read('src/app/(design-studio)/studio/layout.tsx');
const middleware=read('src/middleware.ts');
test('three genuinely distinct and public-preview-only site compositions',()=>{
 for(const variant of ['DesertModernism','RoyalEditorial','CinematicSandstone'])
  assert.match(concepts,new RegExp('function '+variant+'\\('));
 for(const section of ['desertHero','desertBooking','desertFleet','desertJourney','royalOpening','royalMagazine','royalBookingPaper','royalPriceRows','cinemaHero','cinemaStory','cinemaVehicleTheater','cinemaControlDesk'])
  assert.ok(concepts.includes('styles.'+section),'missing independently composed section '+section);
 for(const key of ['desert-modernism','royal-editorial','cinematic-sandstone'])
  assert.ok(index.includes(key),'missing selection '+key);
 assert.match(routes,/generateStaticParams/);
 assert.match(layout,/robots:\{index:false,follow:false/);
 assert.match(middleware,/pathname === '\/studio' \|\| pathname\.startsWith\('\/studio\/'\)/);
 assert.match(middleware,/noindex, nofollow, noarchive/);
 assert.doesNotMatch(layout,/<Header|<Footer|Supabase|JsonLd/);
});
test('fleet images, real rate matrix and handoff remain safe',()=>{
 assert.match(concepts,/APPROVED_5_FLEET/);
 assert.match(concepts,/AUTHORITATIVE_TRANSFER_RATES/);
 assert.match(concepts,/trip\.selected\.interiorImage/);
 assert.match(concepts,/trip\.selected\.exteriorImage/);
 assert.match(concepts,/getFare\(trip\.route,v\.slug\)/);
 assert.match(concepts,/trip\.guests>trip\.selected\.passengers/);
 assert.match(concepts,/نموذج تفاعلي للتصميم — لا يتم إرسال حجوزات/);
 assert.match(concepts,/NO BOOKING SUBMISSION|لا يتم إرسال حجوزات/);
 assert.doesNotMatch(concepts,/fetch\(|supabase\.|INSERT INTO|\.from\('bookings'\)/);
 assert.doesNotMatch(concepts,/Math\.random\(|fakeReviews|reviewsCount/);
});
test('desktop and mobile compose separately, accessibility and no-index safeguarded',()=>{
 assert.match(css,/@media\(max-width:600px\)/);
 assert.match(css,/@media\(max-width:390px\)/);
 assert.match(css,/prefers-reduced-motion:reduce/);
 assert.match(concepts,/aria-pressed=\{trip\.car===v\.slug\}/);
 assert.match(concepts,/aria-pressed=\{trip\.view==='inside'\}/);
 assert.match(concepts,/role="group"/);
 assert.match(routes,/robots:\{index:false,follow:false/);
 assert.match(index,/NOINDEX \/ NO BOOKING SUBMISSION/);
});
