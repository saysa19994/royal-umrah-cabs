import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
const r=p=>readFileSync(p,'utf8');
test('about photographs are controlled by site media slots',()=>{
 const s=r('src/app/[locale]/about/page.tsx');
 assert.match(s,/getSiteImagesCached/);
 assert.match(s,/images\.about_arrival/);
 assert.match(s,/images\.about_comfort/);
});
test('booking editorial images are editable without changing cash-on-arrival booking',()=>{
 const s=r('src/app/[locale]/booking/page.tsx');
 assert.match(s,/images\.booking_haram/);
 assert.match(s,/images\.booking_vehicle/);
 assert.match(s,/<BookingWizard/);
});
test('six service images read from the media registry',()=>{
 const s=r('src/app/[locale]/services/page.tsx');
 for(const key of ['services_airport','services_ziyarat','services_intercity','services_family','services_group','services_chauffeur'])
   assert.match(s,new RegExp('images\\.'+key));
 assert.match(r('src/app/api/admin/site-assets/route.ts'),/revalidatePath\('\/\[locale\]\/services'/);
});
