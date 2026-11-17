import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const home=read('src/components/home/SignatureJourneyHomepage.tsx');
const copy=read('src/data/duyuf-homepage-layout-copy.ts');
const css=read('src/components/home/SignatureJourneyHomepage.module.css');
test('video 01+05 owner journey story really has four phases with actual destination',()=>{
 assert.match(home,/const next=Math.min\(3,Math.floor\(progress\*4\)\)/);
 assert.match(home,/E\.destinationTitle/);
 assert.match(home,/activeChapterIndex\+1\)\.padStart\(2,'0'\)\} \/ 04/);
 assert.doesNotMatch(home,/E\.miqatTitle,desc:E\.miqatDesc,image:'\/assets\/homepage-v2\/fleet-private\.jpg'/);
 assert.match(home,/E\.destinationDesc/);
 assert.match(home,/\/assets\/homepage-v2\/route-madinah-hotel\.jpg/);
 assert.match(home,/ref=\{storyRef\}/);
 assert.match(css,/\.experienceSection\{background:#101827;color:#f5f5ef;min-height:280vh/);
 for(const lang of ['ar','en','ms','id','ur','fr','es','de','tr','hi'])
 assert.ok(copy.includes('  '+lang+': {\n    destinationTitle:'),lang);
});
test('video 10 contextual photographic FAQ still shows real localized JSONLD-compatible questions',()=>{
 assert.match(home,/faqEditorialPhoto/);
 assert.match(home,/\/assets\/homepage-v2\/vehicle-interior-cta\.jpg/);
 assert.match(home,/dict\.faq\.q2/);
 assert.match(home,/dict\.faq\.a2/);
 assert.match(css,/@media\(max-width:560px\)/);
});
