import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const page=read('src/app/[locale]/booking/page.tsx');
const css=read('src/app/[locale]/booking/booking-atrium.module.css');
test('booking is an independent journey atrium, not another card hero',()=>{
 assert.match(page,/styles\.introMedia/);
 assert.match(page,/styles\.operationalLine/);
 assert.match(page,/styles\.reservationDesk/);
 assert.doesNotMatch(page,/duyuf-booking-intro-main/);
 assert.match(css,/grid-template-columns:minmax\(0,1\.08fr\) minmax\(0,\.92fr\)/);
 assert.match(css,/@media\(max-width:767px\)/);
 assert.match(css,/@media\(max-width:390px\)/);
});
test('booking engine receives all live prefilled fields and data without fake checkout',()=>{
 for(const name of ['resolvedRoute','resolvedVehicle','resolvedDate','resolvedTime','resolvedPassengers','resolvedLuggage','resolvedType','resolvedPickup','resolvedDropoff']){
  assert.ok(page.includes('initial'+name.slice(8)+'={'+name+'}'),name);
 }
 assert.match(page,/initialRates=\{initialRates\}/);
 assert.match(page,/getDbPricesCached\(\)/);
 assert.match(page,/getBookingDraft\(searchParams\.draft\)/);
 assert.match(page,/role="status"/);
 assert.match(page,/getLocalizedAlternates\(locale, '\/booking'\)/);
 assert.match(page,/pageText\.trust1/);
 assert.match(page,/pageText\.trust2/);
 assert.match(page,/pageText\.trust3/);
 assert.match(css,/prefers-reduced-motion:reduce/);
});
