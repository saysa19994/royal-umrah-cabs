import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(p,'utf8');
test('fleet editor controls its live page headline, not just SEO metadata',()=>{
 const fleet=read('src/app/[locale]/fleet/page.tsx');
 assert.match(fleet,/getPublishedPageCopy\('fleet',locale\)/);
 assert.match(fleet,/heading=\{cms\.h1\}/);
 assert.match(read('src/components/fleet/FleetAtelier.tsx'),/heading \|\| t\.title/);
});
test('pricing and routes keep cash-only operations but show editable page copy',()=>{
 for(const slug of ['pricing','routes']){
  const page=read('src/app/[locale]/'+slug+'/page.tsx');
  assert.match(page,new RegExp("getPublishedPageCopy\\('"+slug+"',locale\\)"));
  assert.match(page,/cms\.seoTitle/);
  assert.match(page,/cms\.seoDescription/);
 }
 assert.match(read('src/app/[locale]/pricing/page.tsx'),/content\.features\.cashOnArrival/);
});
test('ziyarat original heading structure is preserved without a CMS override',()=>{
 const page=read('src/app/[locale]/ziyarat/page.tsx');
 assert.match(page,/cms\.h1 \? cms\.h1 :/);
 assert.match(page,/copy\.prefix/);
 assert.match(page,/copy\.em/);
});
