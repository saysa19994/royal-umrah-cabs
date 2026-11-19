import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
const r=p=>readFileSync(p,'utf8');
test('media picker reads real Supabase Storage rather than absent legacy table',()=>{
  const source=r('src/lib/media-service.ts');
  const segment=source.slice(source.indexOf('export async function getAllMediaItemsAdmin('),
    source.indexOf('Admin: Save or update media library item'));
  assert.match(segment,/storage\.from\('media'\)/);
  assert.match(segment,/\.list\(folder/);
  assert.doesNotMatch(segment,/from\('media_library'\)/);
});
test('uploaded files do not query missing media_library on every upload',()=>{
  assert.doesNotMatch(r('src/app/api/admin/media/upload/route.ts'),/from\('media_library'\)/);
});
test('admin image library allows read, upload and copy',()=>{
  const s=r('src/components/admin/AssetLibrary.tsx');
  assert.match(s,/\/api\/admin\/media\?category=/);
  assert.match(s,/\/api\/admin\/media\/upload/);
  assert.match(s,/clipboard\.writeText/);
});
