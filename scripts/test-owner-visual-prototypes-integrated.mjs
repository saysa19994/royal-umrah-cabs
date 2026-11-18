import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const arc=read('src/components/ziyarat/ZiyaratArcGallery.tsx');
const ziy=read('src/app/[locale]/ziyarat/page.tsx');
const wiz=read('src/components/booking/BookingWizard.tsx');
const booking=read('src/app/[locale]/booking/page.tsx');
const zcss=read('src/components/ziyarat/ZiyaratArcGallery.module.css');
const bcss=read('src/app/[locale]/booking/booking-editorial.css');
test('owner prototype second HTML arc now replaces old static ziyarat photo',()=>{
 assert.match(ziy,/import \{ZiyaratArcGallery\}/);
 assert.match(ziy,/<ZiyaratArcGallery locale=\{locale\}/);
 assert.doesNotMatch(ziy,/src="\/assets\/images\/routes\/makkah-ziyarat\.jpg"/);
 assert.match(zcss,/\.card\[data-slot="0"\]/);
 assert.match(zcss,/@media\(max-width:520px\)/);
});
test('arc renders nine distinct landmark images and links to real details or booking tours',()=>{
 const visuals=read('src/data/ziyarat-visuals.ts');
 for(const key of ['cave-hira','jabal-thawr','mina','arafat','masjid-aisha',
   'masjid-quba','mount-uhud','masjid-qiblatayn','seven-mosques']) {
   assert.ok(arc.includes("key:'"+key+"'"),key);
   assert.ok(visuals.includes("'"+key+"':"),key);
 }
 assert.match(arc,/currentHref/);
 assert.match(arc,/ZIYARAT_VISUALS\[photo\.key\]\.src/);
 assert.match(arc,/makkah-half-day/);
 assert.match(arc,/madinah-half-day/);
 assert.doesNotMatch(arc,/src:'\/assets\/homepage-v2\//);
 assert.doesNotMatch(arc,/SAR \d+|fakeFare|tourGuideFee/);
});
test('arc supports 10 locales, accessible controls, swipe and reduced motion',()=>{
 for(const locale of ['ar','en','ms','id','ur','fr','es','de','tr','hi'])assert.ok(arc.includes(' '+locale+':{eyebrow:'),locale);
 assert.match(arc,/onTouchEnd=\{onTouchEnd\}/);
 assert.match(arc,/aria-pressed=\{i===active\}/);
 assert.match(arc,/aria-live="polite"/);
 assert.match(arc,/prefers-reduced-motion: reduce/);
 assert.match(arc,/onMouseEnter=\{\(\)=>setPaused\(true\)\}/);
 assert.match(zcss,/left:50%;width/);
 assert.match(zcss,/prefers-reduced-motion:reduce/);
});
test('owner prototype one booking sidebar uses real booking engine, not HTML mock checkout',()=>{
 assert.match(wiz,/duyuf-prototype-booking-desk/);
 assert.match(wiz,/duyuf-prototype-booking-label/);
 assert.match(wiz,/<BookingEngine/);
 assert.match(wiz,/onStepChange=\{\(s\) => goToStep\(s\)\}/);
 assert.match(wiz,/aria-current=\{isActive \? 'step'/);
 assert.match(bcss,/\.duyuf-prototype-booking-desk/);
 assert.match(bcss,/@media\(max-width:767px\)/);
 assert.match(booking,/initialRates=\{await getDbPricesCached\(\)\}/);
});
