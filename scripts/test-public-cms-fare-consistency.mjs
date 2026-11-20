import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('published fare changes override approved safe defaults and 0 disables a combination', () => {
  const pricing = read('src/lib/pricing-db.ts');
  assert.match(pricing, /const rates: TransferRatesMap = JSON\.parse\(JSON\.stringify\(AUTHORITATIVE_TRANSFER_RATES\)\)/);
  assert.match(pricing, /Number\.isFinite\(price\) && price >= 0/);
  assert.match(pricing, /rates\[row\.route_id\]\[row\.vehicle_id\] = price/);
  assert.doesNotMatch(pricing, /rates\[routeId\]\[vehicleId\] = price/);
  assert.match(pricing, /tags: \['site_prices'\]/);
});

test('every major public route/vehicle discovery page consumes the same cached published fares', () => {
  for (const path of [
    'src/app/[locale]/page.tsx',
    'src/app/[locale]/booking/page.tsx',
    'src/app/[locale]/fleet/page.tsx',
    'src/app/[locale]/fleet/[slug]/page.tsx',
    'src/app/[locale]/routes/page.tsx',
    'src/app/[locale]/routes/[slug]/page.tsx',
    'src/app/[locale]/pricing/page.tsx',
  ]) assert.match(read(path), /getDbPricesCached/, path);
  assert.match(read('src/components/routes/RouteNetworkDesk.tsx'), /rates\[route\.slug\]/);
  assert.match(read('src/components/fleet/FleetAtelier.tsx'), /rates\[route\]/);
});

test('fleet filters are real, accessible, and localized in ten languages', () => {
  const fleet = read('src/components/fleet/FleetAtelier.tsx');
  const css = read('src/components/fleet/FleetAtelier.module.css');
  for (const locale of ['ar','en','ms','id','ur','fr','es','de','tr','hi']) {
    assert.match(fleet, new RegExp(' ' + locale + ':\\{route:'), locale);
  }
  assert.match(fleet, /published\.passengers>=minPassengers/);
  assert.match(fleet, /published\.luggage>=minBags/);
  assert.match(fleet, /fare>0/);
  assert.match(fleet, /!canBook/);
  assert.match(fleet, /disabled=\{!availableIndices\.includes\(i\)\}/);
  assert.match(css, /@media \(max-width: 760px\)/);
});

test('admin fare writes persist and trigger targeted cache invalidation', () => {
  const api = read('src/app/api/admin/pricing/route.ts');
  assert.match(api, /requireRole\(request, \['owner', 'admin'\]\)/);
  assert.match(api, /from\('prices'\)\.upsert/);
  assert.match(api, /revalidateTag\('site_prices'\)/);
  assert.match(api, /numericPrice < 0/);
});
