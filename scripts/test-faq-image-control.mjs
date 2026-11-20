import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const source=p=>readFileSync(p,'utf8');
test('FAQ imagery can be replaced from site-assets without a redeploy',()=>{
 assert.match(source('src/lib/site-images.ts'),/faq_visual:/);
 assert.match(source('src/app/[locale]/faq/page.tsx'),/visualImage=\{siteImages\.faq_visual\}/);
 assert.match(source('src/components/faq/FaqSection.tsx'),/src=\{visualImage \|\|/);
 assert.match(source('src/app/api/admin/site-assets/route.ts'),/key === 'faq_visual'/);
 assert.match(source('src/app/api/admin/site-assets/route.ts'),/revalidatePath\('\/\[locale\]\/faq'/);
});
test('media upload accepts every browseable folder category',()=>{
 const sourceCode=source('src/app/api/admin/media/upload/route.ts');
 for(const c of ['fleet','blog','site','cms','general','hubs','ziyarat'])
  assert.match(sourceCode,new RegExp("'"+c+"'"));
});
