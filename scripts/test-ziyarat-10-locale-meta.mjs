import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const p=readFileSync(new URL('../src/app/[locale]/ziyarat/page.tsx',import.meta.url),'utf8');
test('Ziyarat has locale-specific metadata, hero and contact CTAs rather than 8 English fallbacks',()=>{
 for(const loc of ['ar','en','ms','id','ur','fr','es','de','tr','hi'])assert.ok(p.includes(' '+loc+':{title:'),loc);
 assert.match(p,/title: cms\.seoTitle \|\| copy\.title\+' \| Duyuf Alrahman VIP'/);
 assert.match(p,/description: cms\.seoDescription \|\| copy\.description/);
 assert.match(p,/alternates:getLocalizedAlternates\(locale,'\/ziyarat'\)/);
 assert.match(p,/\{copy\.prefix\}/);
 assert.match(p,/\{copy\.em\}/);
 assert.match(p,/\{copy\.book\}/);
 assert.match(p,/\{copy\.inquire\}/);
 assert.match(p,/type=ziyarat&route=makkah-ziyarat/);
});
