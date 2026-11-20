import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=path=>readFileSync(path,'utf8');

test('admin settings GET fails closed if database is unavailable and returns version',()=>{
 const s=read('src/app/api/admin/settings/route.ts');
 assert.match(s,/if\(error \|\| !data \|\| !data\.updated_at\)/);
 assert.match(s,/status:503,headers:privateHeaders/);
 assert.match(s,/version:data\.updated_at/);
 assert.match(s,/private, no-store/);
});
test('admin settings POST accepts only durable production columns and optimistic revisions',()=>{
 const s=read('src/app/api/admin/settings/route.ts');
 assert.match(s,/const durableColumns = new Set/);
 assert.match(s,/const unsupported=Object\.keys\(parsed\.data\)\.filter/);
 assert.match(s,/status:422,headers:privateHeaders/);
 assert.match(s,/\.eq\('updated_at',body\.expected_updated_at\)/);
 assert.match(s,/if\(!saved\)/);
 assert.match(s,/JSON\.stringify\(saved\[key\]\)!==JSON\.stringify\(value\)/);
 assert.doesNotMatch(s,/setDynamicSettingsOverrides\(/);
});
test('preview admin settings and cache mutation fail closed on production Supabase',()=>{
 for(const file of ['src/app/api/admin/settings/route.ts','src/app/api/admin/sync/route.ts']){
  const s=read(file);
  assert.match(s,/process\.env\.VERCEL_ENV==='preview'/);
  assert.match(s,/PREVIEW_DATABASE_ISOLATED/);
  assert.match(s,/skyhpzdeapmttgmvcoeh\.supabase\.co/);
  assert.match(s,/status:423/);
 }
});
test('settings editor requires GET version, sends changed fields and verifies readback',()=>{
 const s=read('src/app/admin/settings/page.tsx');
 assert.match(s,/typeof data\.version!=='string'/);
 assert.match(s,/setSettingsLoaded\(true\)/);
 assert.match(s,/expected_updated_at:savedVersion/);
 assert.match(s,/const after = await fetchSettings\(\)/);
 assert.match(s,/disabled=\{saving \|\| loading \|\| !settingsLoaded\}/);
});
test('saved DB values override legacy server-local settings and sync does not query missing FAQ table',()=>{
 const s=read('src/lib/dynamic-settings-store.ts');
 assert.ok(s.indexOf('...overrides,')<s.lastIndexOf('...(baseData || {}),'));
 const sync=read('src/app/api/admin/sync/route.ts');
 assert.match(sync,/\.from\('page_content'\)/);
 assert.doesNotMatch(sync,/\.from\('faqs'\)/);
 assert.match(sync,/faqsRes\.error \|\| pricesRes\.error/);
});
