import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const s=readFileSync(new URL('../src/components/layout/Footer.tsx',import.meta.url),'utf8');
test('mobile footer collapses repeated long columns but desktop retains links',()=>{
 assert.match(s,/expandedFooterGroup/);
 for(const id of [0,1,2,3]){
  assert.ok(s.includes('duyuf-footer-group-'+id),'missing '+id);
  assert.ok(s.includes('aria-controls="duyuf-footer-group-'+id),'aria controls '+id);
 }
 assert.equal((s.match(/duyuf-footer-menu/g)||[]).length,4);
 assert.match(s,/md:block/);
 assert.match(s,/aria-expanded=\{expandedFooterGroup===0\}/);
});
test('footer still preserves all original routes, vehicles, SEO and payment notices',()=>{
 for(const path of ['/routes/jeddah-airport-to-makkah','/fleet/toyota-hiace','/guides/jeddah-airport-arrival-pickup-guide','/terms','/privacy','/faq','/contact'])assert.ok(s.includes(path),path);
 assert.match(s,/LOCALIZED_PAY_NOTICE/);
 assert.match(s,/LOCALES/);
 assert.match(s,/Footer Language Selector/);
 assert.match(s,/flex-nowrap overflow-x-auto md:flex-wrap/);
});
