import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const cmp=read('src/components/services/ServiceChapterExplorer.tsx'),css=read('src/components/services/ServiceChapterExplorer.module.css');
test('video 03 mobile service scenes are separate from the existing desktop selector and use real service assets',()=>{
 assert.match(cmp,/styles\.mobileJournal/);
 assert.match(cmp,/styles\.mobileScenePhoto/);
 assert.match(cmp,/services\.map\(\(item,index\)=>/);
 assert.match(cmp,/BOOKING\[item\.id\]/);
 assert.match(cmp,/item\.relatedRoutes\[0\]/);
 assert.match(cmp,/role="tablist"/);
 assert.match(cmp,/role="tabpanel"/);
 assert.match(css,/\.mobileJournal\{display:none\}/);
 assert.match(css,/scroll-snap-type:x mandatory/);
 assert.match(css,/@media\(max-width:390px\)/);
});
