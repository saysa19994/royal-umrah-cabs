import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const page=read('src/app/[locale]/ziyarat/page.tsx');
const experience=read('src/components/ziyarat/SacredZiyaratExperience.tsx');
const journal=read('src/components/ziyarat/ZiyaratPilgrimJournal.tsx');
const css=read('src/components/ziyarat/ZiyaratPilgrimJournal.module.css');
test('hub keeps live city selector and adopts unique editorial journal',()=>{
 assert.match(page,/<SacredZiyaratExperience locale=\{locale\}/);
 assert.match(page,/<ZiyaratArcGallery locale=\{locale\}/);
 assert.match(page,/<ZiyaratPilgrimJournal locale=\{locale\}/);
 assert.doesNotMatch(page,/duyuf-ziyarat-guides-grid|duyuf-ziyarat-steps grid|duyuf-ziyarat-answers space-y-4/);
 assert.match(journal,/ZIYARAT_GUIDES/);
 assert.match(journal,/<details key=\{q\}>/);
 assert.match(journal,/styles\.timeline/);
 assert.match(css,/@media\(max-width:767px\)/);
 assert.match(css,/@media\(max-width:390px\)/);
});
test('tour handoff, accurate Makkah duration and approved price',()=>{
 assert.match(page,/booking\?type=ziyarat&route=makkah-ziyarat/);
 assert.match(experience,/const ziyaratRoute = activeCity === 'makkah' \? 'makkah-ziyarat' : 'madinah-ziyarat'/);
 assert.match(experience,/AUTHORITATIVE_TRANSFER_RATES\[ziyaratRoute\]\?\.\[selectedVehicle\]/);
 assert.match(experience,/AUTHORITATIVE_TRANSFER_RATES\[ziyaratRoute\]\?\.\[vehKey\]/);
 assert.match(experience,/booking\?type=ziyarat&route=\$\{ziyaratRoute\}&vehicle=\$\{selectedVehicle\}/);
 assert.doesNotMatch(experience,/currentPrice = activeTour\?\.pricing\[selectedVehicle\] \|\| 250/);
 const ar=experience.slice(experience.indexOf("'makkah-tour': {"),experience.indexOf("'madinah-tour': {"));
 assert.match(ar,/duration: '2\.5 ساعة'/);
});
test('ten locale journal accurately discloses long guides only in Arabic English',()=>{
 for(const loc of ['ar','en','ms','id','ur','fr','es','de','tr','hi'])assert.ok(journal.includes(' '+loc+':{journal:'),loc);
 assert.match(journal,/Kandungan terperinci panduan/);
 assert.match(page,/getLocalizedAlternates\(locale, '\/ziyarat'\)/);
});
