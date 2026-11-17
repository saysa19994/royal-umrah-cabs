import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('video 10 adds a photographic FAQ beside the existing real accordion',()=>{
 const faq=read('src/components/faq/FaqSection.tsx'),css=read('src/components/faq/FaqSection.editorial.css');
 assert.match(faq,/duyuf-faq-editorial-layout/);
 assert.match(faq,/duyuf-faq-editorial-photo/);
 assert.match(faq,/faqItems\.map/);
 assert.match(faq,/\/assets\/homepage-v2\/service-madinah\.jpg/);
 assert.match(faq,/aria-expanded=\{isOpen\}/);
 assert.match(css,/@media\(max-width:420px\)/);
 assert.match(css,/prefers-reduced-motion:reduce/);
});
