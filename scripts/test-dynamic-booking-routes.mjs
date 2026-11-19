import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
const r=p=>readFileSync(p,'utf8');
test('booking injects active admin-created routes with localized names and approved fares',()=>{
 const page=r('src/app/[locale]/booking/page.tsx');
 assert.match(page,/getPublishedRoutes\(locale\)/);
 assert.match(page,/getRouteCatalogCached\(\)/);
 assert.match(page,/routeOverrides=\{routeOverrides\}/);
 assert.match(page,/disabledRouteIds=\{disabledRouteIds\}/);
 assert.match(page,/Object\.values\(initialRates\[r\.slug\]/);
});
test('booking engine excludes stopped routes and prefers edited place names',()=>{
 const e=r('src/components/booking/BookingEngine.tsx');
 assert.match(e,/disabledRouteIds\?\.includes\(key\)/);
 assert.match(e,/routeOverrides\?\.\[routeId\]\?\.label/);
 assert.match(e,/routesForBooking/);
 assert.match(e,/availableRoutes\.some\(\(\[id\]\)=>id===routeId\)/);
});
