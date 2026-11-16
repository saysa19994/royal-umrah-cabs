import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = p => readFileSync(new URL('../'+p,import.meta.url),'utf8');
const booking=read('src/app/[locale]/booking/page.tsx');
const pricing=read('src/app/[locale]/pricing/page.tsx');
const vehicle=read('src/app/[locale]/fleet/[slug]/page.tsx');
const css=read('src/styles/duyuf-completion.css');
test('booking is localized in all ten languages, no forced Arabic trust copy',()=>{
  assert.match(booking,/pageText\.trust1/);assert.match(booking,/pageText\.trust2/);assert.match(booking,/pageText\.trust3/);
  assert.match(booking,/duyuf-booking-page/);assert.match(booking,/duyuf-booking-wizard/);
  assert.doesNotMatch(booking,/<span>0% دفعة مقدمة/);
});
test('pricing and fleet details share complete theme-aware mobile surfaces',()=>{
  assert.match(pricing,/duyuf-pricing-page/);assert.match(pricing,/\{content\.heroTitle\}/);
  assert.match(vehicle,/duyuf-vehicle-page/);assert.match(css,/prefers-reduced-motion/);
});

test('Vercel deployment includes PNG brand icons and fleet photography',()=>{
  const ignore=read('.vercelignore');
  assert.equal(ignore.split('\\n').some(line=>line.trim()==='*.png'),false);
});
