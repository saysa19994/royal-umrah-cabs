import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';
const source=path=>readFileSync(path,'utf8');
test('About content and SEO are sourced from saved localized CMS rows',()=>{
 const s=source('src/app/[locale]/about/page.tsx');
 assert.match(s,/getPublishedPageCopy\('about',locale\)/);
 assert.match(s,/mergeCmsTranslatedCopy\(dict\.page_about,cms\)/);
 assert.match(s,/cms\.h1 \|\| aboutCopy\.title/);
});
test('Services and Contact read saved headings/SEO from CMS',()=>{
 for(const page of ['services','contact']){
  const s=source('src/app/[locale]/'+page+'/page.tsx');
  assert.match(s,new RegExp("getPublishedPageCopy\\('"+page+"',locale\\)"));
  assert.match(s,/cms\.seoTitle/);
  assert.match(s,/cms\.seoDescription/);
 }
});
test('CMS mutations do not report success after a database exception',()=>{
 const s=source('src/lib/cms-service.ts');
 assert.match(s,/Database persistence unavailable: CMS edit was not saved/);
 assert.match(s,/revalidatePath\('\/\[locale\]\/' \+ record\.page_key, 'page'\)/);
});
