import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const fleet=read('src/components/fleet/FleetAtelier.tsx');
const css=read('src/components/fleet/FleetAtelier.module.css');
const page=read('src/app/[locale]/fleet/page.tsx');
test('fleet direct book contains only five real approved vehicles and route price matrix',()=>{
 assert.match(fleet,/APPROVED_5_FLEET\.map/);
 assert.match(fleet,/rates\[selectedRoute\]\?\.\[FARE_IDS\[approved\.slug\]\]/);
 assert.match(fleet,/\/booking\?route='\+encodeURIComponent\(route\)\+'&vehicle='\+approved\.slug/);
 assert.doesNotMatch(fleet,/startingPriceSAR\}/);
 assert.match(fleet,/\/fleet\/mercedes-maybach/);
 assert.match(fleet,/\/fleet\/hyundai-h1/);
 assert.match(fleet,/\/contact/);
 assert.match(page,/getDbVehiclesCached\(\)/);
 assert.match(page,/itemListSchema/);
});
test('fleet photograph selector and real preview assets are accessible in all ten locales',()=>{
 for(const locale of ['ar','en','ms','id','ur','fr','es','de','tr','hi'])assert.ok(fleet.includes(' '+locale+':{label:'),locale);
 assert.match(fleet,/galleryPosition/);
 assert.match(fleet,/aria-pressed=\{displayIndex===i\}/);
 assert.match(fleet,/onClick=\{\(\)=>setGalleryPosition\(photo\.src\)\}/);
 assert.match(fleet,/interior\?cabinPhoto:extPhoto/);
 assert.match(css,/@media\(max-width:680px\)/);
 assert.match(css,/@media\(max-width:390px\)/);
 assert.match(css,/prefers-reduced-motion:reduce/);
});
