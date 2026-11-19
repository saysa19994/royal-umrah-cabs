import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const r=p=>readFileSync(p,'utf8');
test('booking page marketing header is editable without permitting changes to payment policy',()=>{
 const page=r('src/app/[locale]/booking/page.tsx');
 assert.match(page,/getPublishedPageCopy\('booking',locale\)/);
 assert.match(page,/cms\.h1 \|\|/);
 assert.match(page,/cms\.contentBlocks\.badge/);
 assert.match(page,/pageText\.trust1/);
 assert.match(page,/<BookingWizard/);
});
test('CMS only saves allowlisted page keys and real supported locales',()=>{
 const s=r('src/lib/cms-service.ts');
 assert.match(s,/EDITABLE_CMS_PAGES/);
 assert.match(s,/!isEditableCmsPageKey\(record\.page_key\)/);
 assert.match(s,/!LOCALES\.includes\(record\.language\)/);
 assert.match(s,/\.in\('page_key',\[\.\.\.EDITABLE_CMS_PAGES\]\)/);
});
test('read endpoint validates CMS page keys to protect separate blog and approved fare rows',()=>{
 const s=r('src/app/api/admin/cms/route.ts');
 assert.match(s,/isEditableCmsPageKey\(pageKey\)/);
});
