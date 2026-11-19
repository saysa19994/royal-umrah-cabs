import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const r=p=>readFileSync(p,'utf8');
test('fleet gallery detaches an image without silently permanently deleting shared media',()=>{
 const s=r('src/app/admin/media/page.tsx');
 const remove=s.slice(s.indexOf('const handleDeletePhoto'),s.indexOf('// Handle modal submit'));
 assert.match(remove,/updatedPhotos/);
 assert.doesNotMatch(remove,/method: 'DELETE'/);
 assert.match(remove,/مكتبة الصور/);
});
test('blog control distinguishes unpublish from destructive delete and draft from publish',()=>{
 const s=r('src/app/admin/blog/page.tsx');
 assert.match(s,/Unpublish article/);
 assert.match(s,/saved as an unpublished draft/);
 assert.match(s,/Article unpublished/);
});
test('CMS prevents misleading homepage save success and shows dedicated editor',()=>{
 const s=r('src/app/admin/cms/page.tsx');
 assert.match(s,/selectedPage === 'home'/);
 assert.match(s,/\/admin\/home-copy/);
 assert.match(s,/Saved to CMS as a draft/);
});
test('light editorial panels use readable dark form text',()=>{
 const s=r('src/app/admin/blog/page.tsx');
 assert.match(s,/text-\[#193746\]/);
 assert.doesNotMatch(s,/font-extrabold text-white">\s*Blog/);
});
