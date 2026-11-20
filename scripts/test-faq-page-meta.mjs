import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const s=p=>readFileSync(p,'utf8');
test('FAQ page localized editable heading and SEO',()=>{
 const c=s('src/app/[locale]/faq/page.tsx');
 assert.match(c,/getPublishedPageCopy\('faq',locale\)/);
 assert.match(c,/cms\.seoTitle/);assert.match(c,/cms\.seoDescription/);
 assert.match(c,/heading=\{heading\}/);assert.match(c,/subtitle=\{subtitle\}/);
});
test('FAQ page visible heading respects saved copy',()=>{
 const c=s('src/components/faq/FaqSection.tsx');
 assert.match(c,/heading \|\| dict\.faq\.heading/);
 assert.match(c,/subtitle \|\| dict\.faq\.subtitle/);
});
test('FAQ page CMS editing separated from FAQ question record registry',()=>{
 assert.match(s('src/lib/cms-service.ts'),/\'faq\'/);
 assert.match(s('src/app/admin/cms/page.tsx'),/id: 'faq'/);
 assert.match(s('src/app/admin/site-control/page.tsx'),/page=faq&locale=ar/);
});
