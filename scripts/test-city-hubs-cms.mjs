import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';

const read=path=>readFileSync(path,'utf8');

test('Riyadh and Taif service hub SEO and hero headings are editable in all ten locales',()=>{
 const helper=read('src/lib/public-page-copy.ts');
 assert.match(helper,/\| 'riyadh' \| 'taif'/);
 assert.match(helper,/function mergeCityHubCmsCopy\(/);
 assert.doesNotMatch(helper,/\[\s*'routes'/);
 for(const city of ['riyadh','taif']){
   const page=read(`src/app/[locale]/services/${city}/page.tsx`);
   assert.match(page,new RegExp("getPublishedPageCopy\\('"+city+"',locale\\)"));
   assert.match(page,/mergeCityHubCmsCopy\(/);
   assert.match(page,/getDbPricesCached\(\)/);
 }
 const cms=read('src/lib/cms-service.ts');
 assert.match(cms,/revalidatePath\('\/\[locale\]\/services\/' \+ record\.page_key, 'page'\)/);
 assert.match(read('src/app/admin/site-control/page.tsx'),/page=riyadh&locale=ar/);
 assert.match(read('src/app/admin/site-control/page.tsx'),/page=taif&locale=ar/);
});

test('city hub price quotes always use published authoritative route fares',()=>{
 for(const city of ['riyadh','taif']){
   const page=read(`src/app/[locale]/services/${city}/page.tsx`);
   assert.match(page,/fareFrom\(r.id\)/);
   assert.doesNotMatch(page,/\{r\.priceFromSAR\}/);
   assert.doesNotMatch(page,/\{vehicle\.priceSAR\}/);
   assert.match(page,/getDbPricesCached\(\)/);
 }
 const riyadh=read('src/app/[locale]/services/riyadh/page.tsx');
 assert.doesNotMatch(riyadh,/riyadh-airport-transfer/);
 assert.match(riyadh,/liveRates\['riyadh-to-makkah'\]/);
 assert.match(read('src/app/[locale]/services/taif/page.tsx'),/liveRates\['makkah-to-taif'\]/);
});

test('marketing CMS does not allow editing fares, approved operational terms, or routes',()=>{
 const helper=read('src/lib/public-page-copy.ts');
 assert.match(helper,/const editableFields/);
 const block=helper.slice(helper.indexOf('const editableFields'),helper.indexOf('const edits: Partial<CityServiceContent>'));
 assert.doesNotMatch(block,/['"]routes['"]|['"]faqs['"]|['"]ctaSubtitle['"]|['"]features['"]/);
 assert.match(helper,/heroTitle: cms\.h1 \|\| defaults\.heroTitle/);
});
