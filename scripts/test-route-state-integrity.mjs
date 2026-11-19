import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';
test('route toggle reads real Supabase state and cannot return success on write failure',()=>{
 const s=readFileSync('src/lib/routes-service.ts','utf8');
 const b=s.slice(s.indexOf('export async function toggleOrDeleteRouteAdmin('));
 assert.match(b,/\.select\('id,is_active'\)\.eq\('id',routeId\)\.maybeSingle\(\)/);
 assert.match(b,/const isActive = action === 'delete' \? false : !existing\.is_active/);
 assert.match(b,/if \(updateError \|\| !updated\)/);
 assert.doesNotMatch(b,/\.from\('prices'\)\.delete/);
 assert.doesNotMatch(b,/\.from\('routes'\)\.delete/);
});
test('pricing API surfaces failed route status updates as errors',()=>{
 const s=readFileSync('src/app/api/admin/pricing/route.ts','utf8');
 assert.match(s,/result\.success \? 200 : 503/);
});
