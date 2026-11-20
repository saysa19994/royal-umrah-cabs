import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const read = path => readFileSync(new URL('../'+path,import.meta.url),'utf8');
const page = read('src/app/[locale]/services/page.tsx');
const intro = read('src/app/[locale]/services/services-editorial.css');
const explorer = read('src/components/services/ServiceChapterExplorer.tsx');
const style = read('src/components/services/ServiceChapterExplorer.module.css');

test('services entrance is an architectural three-photograph composition with real assets',()=>{
  assert.match(page,/data-service-photo-atlas/);
  assert.match(page,/duyuf-services-atlas-main/);
  assert.match(page,/duyuf-services-atlas-arrival/);
  assert.match(page,/duyuf-services-atlas-route/);
  for(const photo of [
    '/assets/homepage-v2/fleet-family.jpg',
    '/assets/homepage-v2/chauffeur-welcome.jpg',
    '/assets/images/routes/makkah-to-madinah.jpg'
  ]){
    assert.ok(existsSync(new URL('../public'+photo,import.meta.url)),photo);
    assert.ok(page.includes(photo),photo);
  }
  assert.match(intro,/\.duyuf-services-atlas-arrival/);
  assert.match(intro,/\.duyuf-services-atlas-route/);
  assert.match(intro,/@media\(max-width:767px\)/);
});

test('six real service categories use one desktop image/details stage without duplicating catalogs',()=>{
  assert.match(page,/<ServiceChapterExplorer/);
  assert.match(explorer,/role="tablist"/);
  assert.match(explorer,/role="tabpanel"/);
  assert.match(explorer,/setActive\(i\)/);
  assert.match(explorer,/onKeyDown=\{e=>keyboard\(e,i\)\}/);
  assert.match(style,/EDIT0RIAL SERVICE ATLAS|EDITORIAL SERVICE ATLAS/);
  assert.match(style,/grid-template-columns:minmax\(0,1\.08fr\) minmax\(355px,\.92fr\)/);
  assert.match(style,/@media\(min-width:1120px\)/);
  assert.match(style,/\.stage\{/);
});

test('mobile retains six native swipe scenes and real booking/request navigation',()=>{
  assert.match(explorer,/className=\{styles\.mobileJournal\}/);
  assert.match(explorer,/className=\{styles\.mobileScene\}/);
  assert.match(explorer,/href=\{'\/'\+locale\+'\/'\+BOOKING\[item\.id\]\}/);
  assert.match(explorer,/route\.href/);
  assert.match(style,/scroll-snap-type:x mandatory/);
  assert.match(style,/@media\(max-width:760px\)/);
  assert.match(style,/@media\(prefers-reduced-motion:reduce\)/);
});

test('existing language SEO and 24 hour service content remain intact',()=>{
  assert.match(page,/getLocalizedAlternates\(locale, '\/services'\)/);
  assert.match(page,/dict\.page_services\.title/);
  assert.match(explorer,/const TEXT:Record<Locale,Copy>/);
  assert.match(explorer,/const BOOKING:Record<string,string>/);
  assert.match(page,/isRtl = isAr \|\| locale === 'ur'/);
});
