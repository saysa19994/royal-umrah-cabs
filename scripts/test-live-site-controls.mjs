import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
const read=p=>readFileSync(p,'utf8');
test('live trip pricing is database-first and respects deactivation',()=>{
  const s=read('src/lib/pricing-server.ts');
  assert.match(s,/getPublishedFare/);
  assert.match(s,/Approved fare|published fare|approved published/i);
  assert.match(s,/getPublishedFare/);
  assert.match(s,/Vehicle is disabled in administration/);
  assert.match(s,/This route is disabled in administration/);
});
test('public pricing previews no longer overwrite database rates with constants',()=>{
  const s=read('src/lib/pricing-db.ts');
  assert.doesNotMatch(s,/Preserve authoritative commercial fare/);
  assert.match(s,/getPublishedFareOverridesCached/);
  assert.match(s,/AUTHORITATIVE_TRANSFER_RATES\[row.route_id\]/);
  const routes=read('src/lib/routes-service.ts');
  assert.match(routes,/publicRates\['camry'\] \?\? auth\?\.camry/);
});
test('homepage images and fleet reference live admin stores',()=>{
 const s=read('src/app/[locale]/page.tsx');
 assert.match(s,/getSiteImagesCached/); assert.match(s,/getDbVehiclesCached/);
 const f=read('src/components/fusion/SignatureFusionHomepage.tsx');
 assert.match(f,/siteImages.hero_poster/);
 assert.match(f,/fleetVehicles/);
});

test('only a deliberate administrator save publishes company-approved fares',()=>{
  const s=read('src/app/api/admin/pricing/route.ts');
  assert.match(s,/await publishFares/);
  const f=read('src/lib/published-fares.ts');
  assert.match(f,/published_fare_/);
  assert.match(f,/page_content/);
});
