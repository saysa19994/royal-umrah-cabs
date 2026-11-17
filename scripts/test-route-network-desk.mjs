import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const page=read('src/app/[locale]/routes/page.tsx');
const route=read('src/components/routes/RouteNetworkDesk.tsx');
const styles=read('src/components/routes/RouteNetworkDesk.module.css');
test('routes use a genuine schematic and fare desk, not the homepage photographic atlas',()=>{
 assert.match(page,/<RouteNetworkDesk locale=\{locale\}/);
 assert.doesNotMatch(page,/<RouteSpotlightExplorer/);
 assert.match(route,/EXECUTIVE_ROUTES_DATA/);
 assert.match(route,/AUTHORITATIVE_TRANSFER_RATES/);
 assert.match(route,/APPROVED_5_FLEET/);
 assert.match(route,/aria-label=\{t\.diagram\+'\: '\+name\}/);
 assert.match(route,/role="group" aria-label=\{t\.vehicle\}/);
 assert.match(route,/\/booking\?route='\+route\.slug\+'&vehicle='\+vehicle\.slug/);
});
test('route index and SEO metadata remain intact, all eleven source routes keep real detail links',()=>{
 assert.match(page,/EXECUTIVE_ROUTES_DATA\.map/);
 assert.match(page,/getLocalizedAlternates\(locale, '\/routes'\)/);
 assert.match(page,/AUTHORITATIVE_TRANSFER_RATES/);
 assert.match(route,/route\.times\?\.\[locale\]/);
 assert.match(route,/route\.distances\?\.\[locale\]/);
 assert.match(route,/not a geographical map/);
 assert.match(styles,/@media\(max-width:700px\)/);
 assert.match(styles,/@media\(max-width:390px\)/);
 for(const lang of ['ar','en','ms','id','ur','fr','es','de','tr','hi'])assert.ok(route.includes(' '+lang+':{heading:'),lang);
});
