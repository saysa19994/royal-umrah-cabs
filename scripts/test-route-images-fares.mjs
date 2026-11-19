import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(p,'utf8');
test('route detail uses saved approved fare rather than a static matrix',()=>{
 const s=read('src/app/[locale]/routes/[slug]/page.tsx');
 assert.match(s,/getDbPricesCached\(\)/);
 assert.match(s,/const routeRates = publishedRates\[slug\]/);
 assert.doesNotMatch(s,/AUTHORITATIVE_TRANSFER_RATES/);
 assert.match(s,/minPriceSAR=\{minPriceSAR\}/);
});
test('every main route hero is editable through the site image registry',()=>{
 const s=read('src/lib/site-images.ts');
 for(const key of ['jeddah_airport_to_makkah','makkah_to_madinah','jeddah_to_madinah','makkah_ziyarat','madinah_airport_to_hotel','makkah_to_taif','jeddah_to_taif','madinah_ziyarat','riyadh_to_makkah','riyadh_to_madinah']){
   assert.match(s,new RegExp('route_'+key+':'));
 }
 const route=read('src/app/[locale]/routes/[slug]/page.tsx');
 assert.match(route,/ROUTE_IMAGE_SLOTS\[slug\]/);
 assert.match(route,/siteImages\[routeImageKey\]/);
});
test('changing route image or approved fare revalidates route detail pages',()=>{
 const media=read('src/app/api/admin/site-assets/route.ts');
 const pricing=read('src/app/api/admin/pricing/route.ts');
 assert.match(media,/key\.startsWith\('route_'\)/);
 assert.match(media,/revalidatePath\('\/\[locale\]\/routes\/\[slug\]'/);
 assert.match(pricing,/revalidatePath\('\/\[locale\]\/routes\/\[slug\]'/);
});
