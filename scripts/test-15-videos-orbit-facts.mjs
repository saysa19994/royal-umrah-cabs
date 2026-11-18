import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const a=read('src/app/[locale]/about/page.tsx'),s=read('src/app/[locale]/about/about-story.module.css');
test('videos 07 & 08 use real 60-minute / 24/7 / 30-45 Miqat facts in a responsive mini-orbit',()=>{
 assert.match(a,/className=\{styles\.serviceOrbit\}/);
 assert.match(a,/className=\{styles\.orbitWait\}><dt>60<\/dt>/);
 assert.match(a,/className=\{styles\.orbitSupport\}><dt>24\/7<\/dt>/);
 assert.match(a,/className=\{styles\.orbitMiqat\}><dt>30–45<\/dt>/);
 for(const lang of ['ar','en','ms','id','ur','fr','es','de','tr','hi'])assert.ok(a.includes('  '+lang+':{wait:'),lang);
 assert.match(s,/grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/);
 assert.doesNotMatch(a,/95%|1\.9M|100,000\+/);
});
