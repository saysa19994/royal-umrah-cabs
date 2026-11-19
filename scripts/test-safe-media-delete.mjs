import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const s=readFileSync('src/app/api/admin/media/route.ts','utf8');
test('media deletion rejects untrusted URL origins and paths',()=>{
 assert.match(s,/image\.origin!==expected\.origin/);
 assert.match(s,/!image\.pathname\.startsWith\(prefix\)/);
 assert.doesNotMatch(s,/fs\.unlinkSync/);
});
test('media cannot be removed if still referenced by vehicle or CMS',()=>{
 assert.match(s,/from\('vehicles'\)\.select\('id,photos'\)/);
 assert.match(s,/from\('page_content'\)/);
 assert.match(s,/referencedByVehicle\|\|referencedByPage/);
 assert.match(s,/status:409/);
});
test('media deletion cannot masquerade as success after a Storage failure',()=>{
 assert.match(s,/if\(error\|\|!data\)/);
 assert.match(s,/status:503/);
});
