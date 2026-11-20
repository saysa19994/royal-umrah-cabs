import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const routeStatus = read('src/lib/public-route-availability.ts');
const fleet = read('src/components/fleet/FleetAtelier.tsx');
const fleetPage = read('src/app/[locale]/fleet/page.tsx');
const routeDesk = read('src/components/routes/RouteNetworkDesk.tsx');
const routePage = read('src/app/[locale]/routes/page.tsx');

test('route availability comes from editable Supabase records and revalidates by tag', () => {
  assert.match(routeStatus, /\.from\('routes'\)/);
  assert.match(routeStatus, /\.select\('id,is_active'\)/);
  assert.match(routeStatus, /tags: \['site_routes'\]/);
  assert.match(fleetPage, /getPublishedRouteStatusCached\(\)/);
  assert.match(routePage, /getPublishedRouteStatusCached\(\)/);
  assert.match(read('src/lib/routes-service.ts'), /revalidateTag\('site_routes'\)/);
});

test('disabled routes are excluded from public booking selectors and route directory', () => {
  assert.match(fleet, /routeStatus\[item\.id\]!==false/);
  assert.match(fleet, /routeStatus\[selectedRoute\]!==false/);
  assert.match(routeDesk, /ACTIVE_ROUTES\.filter\(item=>routeStatus\[item\.slug\]!==false\)/);
  assert.match(routePage, /routeStatus\[route\.slug\]!==false/);
  assert.match(routeDesk, /Number\.isFinite\(fare\)&&fare>0\?<Link/);
});

test('the real five fleet categories are selectable in every locale', () => {
  for(const language of ['ar','en','ms','id','ur','fr','es','de','tr','hi']) {
    assert.match(fleet, new RegExp(' ' + language + ':\\{label:'));
  }
  for(const slug of ['toyota-camry','hyundai-staria','gmc-yukon-xl','toyota-hiace','toyota-coaster']) {
    assert.ok(fleet.includes("'" + slug + "':"), slug);
  }
  assert.match(fleet, /const \[category,setCategory\]=useState<FleetCategory>\('all'\)/);
  assert.match(fleet, /VEHICLE_CATEGORY\[item\.slug\]===category/);
  assert.match(fleet, /value=\{category\}/);
  assert.match(read('src/components/fleet/FleetAtelier.module.css'), /\.filters label\.nth-child\(2\)/);
});
