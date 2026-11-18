import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const s=read('src/components/booking/BookingEngine.tsx'),css=read('src/app/[locale]/booking/booking-editorial.css');
test('video 11 keeps real booking and essential price/payment while making mobile summary expandable',()=>{
 assert.match(s,/summaryExpanded,setSummaryExpanded/);
 assert.match(s,/data-summary-expanded=\{summaryExpanded\}/);
 assert.match(s,/duyuf-booking-summary-toggle/);
 assert.match(s,/summaryTotalFare/);
 assert.match(s,/summaryPaymentValue/);
 assert.match(s,/duyuf-booking-summary-extra/);
 assert.match(css,/\[data-summary-expanded=true\]/);
 assert.match(css,/duyuf-booking-service-tabs/);
 assert.match(s,/getEstimatedBasePriceSAR/);
 for(const lang of ['ar','en','ms','id','ur','fr','es','de','tr','hi'])assert.ok(s.includes('  '+lang+':{more:'),lang);
});
