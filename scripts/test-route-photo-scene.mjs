import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const read = file => readFileSync(new URL('../'+file,import.meta.url),'utf8');
const source = read('src/components/routes/RouteNetworkDesk.tsx');
const style = read('src/components/routes/RouteNetworkDesk.module.css');

test('route atlas uses only existing exact-route licensed project image assets',()=>{
 const photos = [
  'jeddah-airport-to-makkah.jpg','makkah-to-madinah.jpg',
  'jeddah-to-madinah.jpg','makkah-ziyarat.jpg',
  'madinah-airport.jpg','makkah-to-taif.jpg','riyadh-to-makkah.jpg',
 ];
 for(const photo of photos){
  assert.ok(existsSync(new URL('../public/assets/images/routes/'+photo,import.meta.url)),photo);
  assert.ok(source.includes('/assets/images/routes/'+photo),photo);
 }
 assert.match(source,/photoSource &&/);
 assert.match(source,/alt="" fill/);
 assert.match(source,/key=\{route\.slug\}/);
});

test('mobile and desktop route controls share the enabled route list',()=>{
 assert.match(source,/const visibleRoutes=ACTIVE_ROUTES\.filter\(item=>routeStatus\[item\.slug\]!==false\)/);
 const maps = [...source.matchAll(/visibleRoutes\.map\(\(item,i\)=>/g)];
 assert.equal(maps.length,2);
 assert.doesNotMatch(source,/\{ACTIVE_ROUTES\.map/);
 assert.match(source,/role="img"/);
 assert.match(source,/aria-label=\{t\.diagram/);
});

test('photography keeps original diagram, label contrast and reduced-motion alternative',()=>{
 assert.match(style,/\.routeDrawing \{ isolation:isolate; \}/);
 assert.match(style,/\.routePhoto img/);
 assert.match(style,/\.routeDrawing>svg\{position:relative;z-index:2\}/);
 assert.match(style,/@media\(prefers-reduced-motion:reduce\)/);
 assert.match(style,/@media\(max-width:700px\)/);
});
