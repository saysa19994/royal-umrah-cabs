import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const gallery=read('src/components/fleet/VehicleGallery.tsx');
const css=read('src/components/fleet/vehicle-gallery-cinematic.css');
test('videos 06+15 show real next vehicle photos as layered desktop peeks and mobile strip',()=>{
 assert.match(gallery,/duyuf-vehicle-depth-rail/);
 assert.match(gallery,/filteredImages\.map\(\(img,index\)=>\(\{img,index\}\)\)/);
 assert.match(gallery,/onClick=\{\(\)=>setCurrentIndex\(index\)\}/);
 assert.match(gallery,/duyuf-vehicle-filmstrip-item/);
 assert.match(css,/scroll-snap-type:x mandatory/);
 assert.match(css,/@media\(max-width:640px\)/);
 assert.match(css,/prefers-reduced-motion:reduce/);
});
test('vehicle page real gallery and booking are preserved',()=>{
 const page=read('src/app/[locale]/fleet/[slug]/page.tsx');
 assert.match(page,/VehicleGallery/);
 assert.match(page,/getDbVehiclesCached/);
 assert.match(page,/getDbPricesCached/);
 assert.match(page,/const price = rates\[routeKey\]\?\.\[v\.bookingVehicleId\]/);
 assert.match(page,/publishedPhotos/);
 assert.match(page,/isBespoke = bespokeSlug/);
});
