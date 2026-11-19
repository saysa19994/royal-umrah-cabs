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
