import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
const read=p=>readFileSync(p,'utf8');
test('home page reads localized copy overrides from Supabase',()=>{
 assert.match(read('src/app/[locale]/page.tsx'),/getHomeCopyOverridesCached\(locale\)/);
 assert.match(read('src/components/fusion/SignatureFusionHomepage.tsx'),/\.\.\.homeCopy/);
});
test('admin home copy writes one locale without automatic translation',()=>{
 const s=read('src/app/api/admin/home-copy/route.ts');
 assert.match(s,/page_key:'home_copy'/);
 assert.match(s,/language:locale/);
 assert.match(s,/revalidatePath\('\/'\+locale/);
});

test('first homepage CMS save includes mandatory page_content fields and requires a saved revision',()=>{
 const route=read('src/app/api/admin/home-copy/route.ts');
 const editor=read('src/components/admin/HomeCopyEditor.tsx');
 assert.match(route,/seo_title:'',seo_description:'',h1:''/);
 assert.match(route,/expected_updated_at/);
 assert.match(route,/\.eq\('updated_at',body\.expected_updated_at\)/);
 assert.match(route,/error\.code==='23505'/);
 assert.match(route,/status:409/);
 assert.match(editor,/expected_updated_at:loaded\.version/);
 assert.match(editor,/version:j\.version/);
});
test('homepage CMS admin reads latest DB values and does not disguise missing persistence as blank defaults',()=>{
 const route=read('src/app/api/admin/home-copy/route.ts');
 assert.doesNotMatch(route,/getHomeCopyOverridesCached/);
 assert.match(route,/Unable to read saved homepage text; editing is disabled/);
 assert.match(route,/version:data\?\.updated_at \|\| null/);
 assert.match(route,/revalidateTag\('site_home_copy'\)/);
});
