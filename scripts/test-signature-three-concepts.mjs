import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const page=read('src/app/signature-lab/[locale]/[concept]/page.tsx');
const studio=read('src/components/signature-studio/SignatureConceptExperience.tsx');
const css=read('src/components/signature-studio/SignatureConceptExperience.module.css');
const middleware=read('src/middleware.ts');
test('three unique real Next.js concepts are preview only and noindex',()=>{
 for(const id of ['desert','editorial','cinematic']){
  assert.ok(page.includes("'"+id+"'"),id);
  assert.ok(studio.includes("concept==='"+id+"'"),id);
  assert.ok(css.includes('[data-concept="'+id+'"]'),id);
 }
 assert.match(page,/robots:\{index:false,follow:false/);
 assert.match(middleware,/pathname\.startsWith\('\/signature-lab\/'\)/);
 assert.match(middleware,/noindex, nofollow, noarchive/);
});
test('concepts read approved fleet and server fare lookup, not sample pricing',()=>{
 assert.match(page,/getDbPricesCached\(\)/);
 assert.match(page,/APPROVED_5_FLEET/);
 assert.match(studio,/s\.rates\[s\.route\]/);
 assert.match(studio,/vehicle!==null&&typeof fare==='number'/);
 assert.match(studio,/setVehicle\(null\)/);
 assert.match(studio,/passengers:String\(guests\)/);
 assert.match(studio,/route\.includes\('ziyarat'\)\?'ziyarat':'transfer'/);
 assert.doesNotMatch(studio,/Math\.random|fakeBooking|paidOnline/);
});
test('three independent layout grammars and mobile styling',()=>{
 assert.match(css,/\.desertHero\{min-height:670px;display:grid/);
 assert.match(css,/\.editorialHero\{background:#f8f4ec;display:grid/);
 assert.match(css,/\.cinemaHero\{height:clamp/);
 assert.match(css,/@media\(max-width:700px\)/);
 assert.match(css,/@media\(max-width:390px\)/);
 assert.match(css,/prefers-reduced-motion:reduce/);
 assert.match(studio,/hero-mobile\.mp4/);
 assert.match(studio,/APPROVED_5_FLEET|fleet:\s*ApprovedFleetVehicle\[\]/);
});
