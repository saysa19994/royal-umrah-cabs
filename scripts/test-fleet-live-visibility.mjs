import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
const r=p=>readFileSync(p,'utf8');
test('deactivated fleet rows cannot reappear through empty-query fallback',()=>{
 const s=r('src/lib/fleet-db.ts');
 assert.match(s,/data\.length === 0\) return \[\]/);
});
test('homepage and fleet directory exclude unpublished direct-booking vehicles',()=>{
 assert.match(r('src/app/[locale]/page.tsx'),/if\(!curatedFleet\.length\)/);
 const s=r('src/components/fleet/FleetAtelier.tsx');
 assert.match(s,/visibleFleet=APPROVED_5_FLEET\.filter/);
 assert.match(s,/rates\[ROUTE\]/);
});
test('direct fleet detail uses managed photo and availability',()=>{
 const s=r('src/app/[locale]/fleet/[slug]/page.tsx');
 assert.match(s,/publishedVehicles=await getDbVehiclesCached/);
 assert.match(s,/if\(!v\)notFound/);
 assert.match(s,/galleryPhotos\[0\]\.src=ext/);
});
