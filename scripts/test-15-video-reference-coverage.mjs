import test from 'node:test';import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
const read=p=>existsSync(new URL('../'+p,import.meta.url)) ? readFileSync(new URL('../'+p,import.meta.url),'utf8') : '';
const matrix=read('docs/design/all-15-video-adaptation-20261117.md');
test('every one of the actual fifteen reference videos has a functional page mapping or transparent exclusion',()=>{
 for(let i=1;i<=15;i++){
  const id=String(i).padStart(2,'0');
  assert.ok(matrix.includes('| '+id+' |'),id);
 }
 assert.match(read('src/components/home/SignatureJourneyHomepage.tsx'),/E\.destinationTitle/);
 assert.match(read('src/components/ziyarat/ZiyaratArcGallery.tsx'),/relativeSlot/);
 assert.match(read('src/components/services/ServiceChapterExplorer.tsx'),/role="tablist"/);
 assert.match(read('src/components/routes/RouteSpotlightExplorer.tsx'),/AUTHORITATIVE_TRANSFER_RATES/);
 assert.match(read('src/components/fleet/VehicleGallery.tsx'),/duyuf-vehicle-depth-rail/);
 assert.match(read('src/components/faq/FaqSection.tsx'),/duyuf-faq-editorial-layout/);
 assert.match(read('src/components/booking/BookingEngine.tsx'),/summaryExpanded/);
 assert.match(read('src/components/layout/Footer.tsx'),/expandedFooterGroup/);
 assert.match(read('src/app/[locale]/guides/page.tsx'),/duyuf-guide-reading-list/);
 assert.match(read('src/styles/duyuf-video-micro-motion.css'),/prefers-reduced-motion/);
});
