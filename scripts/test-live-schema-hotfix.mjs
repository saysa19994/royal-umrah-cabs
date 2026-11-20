import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(p,'utf8');

test('public FAQs use existing page_content records, never the absent faqs table',()=>{
 const s=read('src/lib/faq-service.ts');
 assert.doesNotMatch(s,/\.from\(['"]faqs['"]\)/);
 assert.match(s,/\.from\('page_content'\)/);
 assert.match(s,/FAQ_KEY_PREFIX/);
 assert.match(s,/seo_title:/);
 assert.match(s,/if \(error \|\| count === null/);
});
test('public reviews only read production columns and return failure on storage errors',()=>{
 const s=read('src/lib/reviews.ts');
 const api=read('src/app/api/reviews/route.ts');
 assert.doesNotMatch(s,/\.eq\('status',/);
 assert.doesNotMatch(s,/\.select\([^)]*(?:service_type|is_verified_booking|status)/);
 assert.match(s,/\.eq\('is_approved', true\)/);
 assert.match(s,/is_verified_booking: false/);
 assert.match(api,/status: result\.success \? 200 : 503/);
 assert.match(api,/private, no-store/);
});
