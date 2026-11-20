import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=(p)=>readFileSync(p,'utf8');
test('both admin chat methods enforce owner/admin before returning settings or updating',()=>{
 const s=read('src/app/api/admin/chat/route.ts');
 const get=s.slice(s.indexOf('export async function GET'),s.indexOf('export async function POST'));
 const post=s.slice(s.indexOf('export async function POST'));
 for(const method of [get,post]){
  assert.match(method,/requireRole\(request, \['owner', 'admin'\]\)/);
  assert.match(method,/if \(auth\.errorResponse\) return auth\.errorResponse/);
  assert.match(method,/private, no-store/);
 }
 assert.ok(get.indexOf('requireRole(')<get.indexOf('getChatSettings('));
 assert.ok(post.indexOf('requireRole(')<post.indexOf('updateChatSettings('));
});
test('FAQ pages and mutations use durable page_content, not absent faqs table',()=>{
 const s=read('src/lib/faq-service.ts');
 assert.match(s,/\.from\('page_content'\)/);
 assert.doesNotMatch(s,/\.from\(['"]faqs['"]\)/);
 assert.match(s,/FAQ_KEY_PREFIX/);
 assert.match(s,/getPublicFaqsCached/);
});
test('public reviews read real production columns only',()=>{
 const s=read('src/lib/reviews.ts');
 assert.match(s,/\.eq\('is_approved', true\)/);
 assert.doesNotMatch(s,/\.eq\('status',/);
 assert.doesNotMatch(s,/\.select\([^)]*(?:status|service_type|is_verified_booking)/);
 assert.match(s,/is_verified_booking: false/);
});
test('public review API does not silently cache DB failures as success',()=>{
 const s=read('src/app/api/reviews/route.ts');
 assert.match(s,/status: result\.success \? 200 : 503/);
 assert.match(s,/private, no-store/);
 assert.doesNotMatch(s,/status: 'pending'/);
});
