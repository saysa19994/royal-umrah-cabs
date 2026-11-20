import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('the eight-screenshot localized visual QA removes baked-in English poster artwork from Arabic entry points',()=>{
 const services=read('src/app/[locale]/services/page.tsx');
 const home=read('src/components/home/JourneyArchitectHomepage.tsx');
 const faq=read('src/components/faq/FaqSection.tsx');
 const booking=read('src/app/[locale]/booking/page.tsx');
 assert.doesNotMatch(services,/src="\/assets\/homepage-v2\/service-group-interior\.jpg"/);
 assert.match(services,/src="\/assets\/homepage-v2\/fleet-family\.jpg"/);
 assert.doesNotMatch(home,/service-group-interior\.jpg|service-madinah\.jpg/);
 assert.doesNotMatch(faq,/service-madinah\.jpg/);
 assert.match(home,/vehicle-interior-cta\.jpg/);
 assert.match(faq,/ziyarat-haram\.jpg/);
 assert.match(booking,/images\.booking_haram/);
 assert.match(read('src/lib/site-images.ts'),/booking_haram:.*ziyarat-haram\.jpg/);
 assert.doesNotMatch(services,/Master CTA Banner/);
});
test('route, fare and cash payment remain on the real pricing and booking paths',()=>{
 const pricing=read('src/app/[locale]/pricing/page.tsx');
 const booking=read('src/app/[locale]/booking/page.tsx');
 const main=read('src/components/home/JourneyArchitectHomepage.tsx');
 assert.match(pricing,/getDbPricesCached/);
 assert.match(booking,/getDbPricesCached/);
 assert.match(main,/AUTHORITATIVE_TRANSFER_RATES/);
 assert.match(main,/router\.push\('\/'\+locale\+'\/booking\?'/);
});
