import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const read=(file)=>fs.readFileSync(path.join(root,file),'utf8');
const homepage=read('src/components/fusion/SignatureFusionHomepage.tsx');
const css=read('src/components/fusion/SignatureFusionHomepage.module.css');
const app=read('src/app/[locale]/page.tsx');
const cabin=read('src/components/royal/RoyalCabinChapter.tsx');
const reviews=read('src/app/api/reviews/route.ts');
const layout=read('src/app/[locale]/layout.tsx');

test('Royal Immersion uses only the existing original hero video assets',()=>{
 assert.match(homepage,/hero-mobile\.mp4/);
 assert.match(homepage,/hero\.mp4/);
 assert.match(homepage,/hero-poster\.jpg/);
 assert.doesNotMatch(homepage,/stock\.mp4|fake-360|\.glb/);
});
test('Approved pickup-destination pair selector passes canonical route ids',()=>{
 assert.match(homepage,/ROUTE_PAIRS/);
 assert.match(homepage,/availableDestinations/);
 assert.match(homepage,/Pickup location/);
 assert.match(homepage,/Destination/);
 assert.match(homepage,/jeddah-airport-to-madinah/);
 assert.match(homepage,/URLSearchParams/);
 assert.match(homepage,/rates\[route\]/);
 assert.match(homepage,/router\.push\(href\)/);
});
test('Five approved vehicles and their genuine images are reused',()=>{
 assert.match(homepage,/APPROVED_5_FLEET/);
 assert.match(homepage,/car\.interiorImage:car\.exteriorImage/);
 assert.match(homepage,/car\.passengers/);
 assert.match(homepage,/car\.luggage/);
 assert.match(cabin,/vehicle-interior-cta\.jpg/);
 assert.doesNotMatch(homepage,/mercedes-maybach.*bookingParam/);
});
test('Editorial chapters and genuine reviews are in the active homepage composition',()=>{
 assert.match(homepage,/RoyalBookingSteps/);
 assert.match(homepage,/RoyalServiceChapters/);
 assert.match(homepage,/RoyalGuestConfidence/);
 assert.match(homepage,/RoyalCabinChapter/);
 assert.match(read('src/components/fusion/RoyalImmersionEditorial.tsx'),/fetch\('\/api\/reviews\?limit=6/);
});
test('Responsive film/booking layouts cover mobile and reduced-motion',()=>{
 assert.match(css,/@media\(max-width:390px\)/);
 assert.match(css,/@media\(max-width:640px\)/);
 assert.match(css,/@media\(max-width:900px\)/);
 assert.match(css, /destinationField/);
 assert.match(css,/prefers-reduced-motion/);
});
test('Localized metadata and complete existing booking architecture remain',()=>{
 assert.match(layout,/getLocalizedAlternates/);
 assert.match(app,/HomepageFaqJsonLd/);
 assert.match(app,/JourneyArchitectHomepage/);
 assert.match(app,/getDbPricesCached/);
 const booking=read('src/app/[locale]/booking/page.tsx');
 assert.match(booking,/BookingWizard/);
 assert.match(booking,/initialRates/);
});
test('Review API must not claim success after database insertion failure',()=>{
 assert.doesNotMatch(reviews,/Seamless fallback: Acknowledge submission/);
 assert.match(reviews,/The review could not be saved/);
 assert.match(reviews,/Could not verify that the review was saved/);
});


test('Preview never requests indexing; production keeps its original SEO rules',()=>{
 const localeLayout=read('src/app/[locale]/layout.tsx');
 assert.match(localeLayout,/VERCEL_ENV === 'preview'/);
 assert.match(localeLayout,/index: false, follow: false/);
 assert.match(localeLayout,/index: true/);
});
test('Subtle ScrollTrigger animation exists with reduced-motion opt out and cleanup',()=>{
 const motion=read('src/components/royal/RoyalMotion.tsx');
 assert.match(motion,/import\('gsap'\)/);
 assert.match(motion,/import\('gsap\/ScrollTrigger'\)/);
 assert.match(motion,/prefers-reduced-motion: reduce/);
 assert.match(motion,/context\.revert\(\)/);
 assert.match(homepage,/<RoyalMotion\/>/);
});
