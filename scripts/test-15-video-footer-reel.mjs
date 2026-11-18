import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const footer=read('src/components/layout/Footer.tsx');
const cta=read('src/components/layout/CinematicFooterCta.tsx');
test('video 13 uses focused live route links instead of global image rails on every page',()=>{
  assert.match(footer,/LOCALIZED_ROUTE_NAMES\['jeddah-airport-to-makkah'\]/);
  assert.match(footer,/expandedFooterGroup/);
  assert.doesNotMatch(footer,/duyuf-footer-destination-reel/);
  assert.doesNotMatch(footer,/Footer\.destination-reel\.css/);
  assert.doesNotMatch(cta,/stripPhotos|strip-\$\{idx\}/);
  assert.match(cta,/ziyarat\|pricing\|routes\|guides/);
});
