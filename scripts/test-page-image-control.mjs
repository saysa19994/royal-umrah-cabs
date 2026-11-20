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

test('site images first insert supplies all page_content required SEO columns',()=>{
 const s=r('src/app/api/admin/site-assets/route.ts');
 assert.match(s,/\.insert\(\{/);
 assert.match(s,/seo_title: '', seo_description: '', h1: ''/);
 assert.match(s,/page_key: recordKey, language: recordLanguage/);
});
test('two admins editing site images cannot silently overwrite other slots',()=>{
 const api=r('src/app/api/admin/site-assets/route.ts');
 const editor=r('src/components/admin/SiteImageControl.tsx');
 assert.match(api,/\.eq\('updated_at', current\.updated_at\)/);
 assert.match(api,/if \(!saved\) continue/);
 assert.match(api,/error\.code === '23505'/);
 assert.match(api,/actualUrl !== body\.expected_url/);
 assert.match(api,/status: 409/);
 assert.match(editor,/expected_url:savedAssets\[key\]/);
 assert.match(editor,/setSavedAssets/);
});
test('image editor fetches fresh saved images rather than cached fallback in admin',()=>{
 const api=r('src/app/api/admin/site-assets/route.ts');
 assert.doesNotMatch(api,/getSiteImagesCached\(/);
 assert.match(api,/private, no-store/);
 assert.match(api,/Saved image settings could not be loaded/);
});
