import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(p,'utf8');
test('website control center links real administrator modules',()=>{
 const s=read('src/app/admin/site-control/page.tsx');
 for(const route of ['home-copy','site-assets','asset-library','cms','blog','fleet','routes','pricing','bookings','settings','reviews'])
   assert.match(s,new RegExp('admin/'+route));
 assert.match(s,/الحجوزات الحقيقية/);
});
test('CMS editor supports direct page & locale links from site control center',()=>{
 const s=read('src/app/admin/cms/page.tsx');
 assert.match(s,/new URLSearchParams\(window\.location\.search\)/);
 assert.match(s,/setSelectedPage\(page\)/);
 assert.match(s,/setSelectedLocale\(locale as Locale\)/);
});
