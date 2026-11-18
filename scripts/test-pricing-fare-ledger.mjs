import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const page=read('src/app/[locale]/pricing/page.tsx');
const css=read('src/app/[locale]/pricing/PricingFareLedger.module.css');
test('pricing page has its own receipt-like typography and a real fare explorer',()=>{
 assert.match(page,/styles\.headerAside/);
 assert.match(page,/styles\.workspaceInner/);
 assert.match(page,/styles\.policyLines/);
 assert.match(page,/styles\.signoff/);
 assert.match(page,/<RouteBasedPricingExperience/);
 assert.match(page,/initialRates=\{initialRates\}/);
 assert.match(page,/getMergedSiteSettings/);
 assert.doesNotMatch(page,/fixed bottom-0 inset-x-0 z-50/);
 assert.doesNotMatch(page,/duyuf-pricing-assurance grid grid-cols-2/);
});
test('pricing keeps ten locale text, alternatives and cash-only booking',()=>{
 for(const l of ['ar','en','ms','id','ur','fr','es','de','tr','hi'])assert.ok(page.includes(' '+l+':{eyebrow:'),l);
 assert.match(page,/getLocalizedAlternates\(locale,'\/pricing'\)/);
 assert.match(page,/dict\.booking_card\.noPrepayNotice/);
 assert.match(page,/getDbPricesCached\(\)/);
 assert.match(page,/taifEnabled=\{settings\.taif_enabled!==false\}/);
 assert.match(page,/riyadhEnabled=\{settings\.riyadh_enabled!==false\}/);
 assert.match(css,/@media\(max-width:767px\)/);
 assert.match(css,/@media\(max-width:390px\)/);
 assert.match(css,/prefers-reduced-motion:reduce/);
});
