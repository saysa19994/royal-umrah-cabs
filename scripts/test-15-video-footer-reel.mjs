import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const s=read('src/components/layout/Footer.tsx');
const css=read('src/components/layout/Footer.destination-reel.css');
test('video 13 adapts moving stock photo marquee into clickable real destination imagery',()=>{
 assert.match(s,/duyuf-footer-destination-reel/);
 assert.match(s,/Image src=\{trip\.src\} fill alt=""/);
 assert.match(s,/LOCALIZED_ROUTE_NAMES\[trip\.slug\]\?\.\[locale\]/);
 for(const slug of ['jeddah-airport-to-makkah','makkah-to-madinah','madinah-airport-to-hotel','makkah-to-taif'])assert.ok(s.includes("slug:'"+slug+"'"),slug);
 assert.match(css,/@media\(min-width:1024px\)/);
 assert.match(css,/duyuf-footer-destination-reel\{display:none\}/);
 assert.match(css,/prefers-reduced-motion:reduce/);
 assert.match(s,/expandedFooterGroup/);
});
