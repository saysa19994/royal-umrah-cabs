import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
const r=p=>readFileSync(p,'utf8');
test('booking gets only active vehicle images and capacities from the public fleet cache',()=>{
 const page=r('src/app/[locale]/booking/page.tsx');
 assert.match(page,/getDbVehiclesCached\(\)/);
 assert.match(page,/vehicleOverrides=\{bookingVehicleOverrides\}/);
 assert.match(page,/v\.gallery\.find\(photo=>photo\.type==='exterior'\)/);
});
test('booking engine does not resurrect hidden vehicles on an empty active catalog',()=>{
 const s=r('src/components/booking/BookingEngine.tsx');
 assert.match(s,/if \(!vehicleOverrides\) return VEHICLE_SPECS/);
 assert.match(s,/Object\.keys\(VEHICLE_SPECS\)\s*\.filter/);
 assert.match(s,/Object\.entries\(vehicleSpecs\)/);
 assert.match(s,/NO_PUBLIC_VEHICLE_COPY\[locale\]/);
 assert.match(s,/if \(!vehicle\) \{ setStep1Error\(vehicleError\); return; \}/);
});
test('route choices in booking reflect site hero image edits',()=>{
 assert.match(r('src/components/booking/BookingEngine.tsx'),/routeImages\?\.\[item\.id\] \|\| item\.image/);
 assert.match(r('src/components/booking/BookingWizard.tsx'),/routeImages=\{routeImages\}/);
});
