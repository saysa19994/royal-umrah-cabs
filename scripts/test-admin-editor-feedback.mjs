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

test('CMS editor blocks overwrite on failed load and verifies saved record by read-back',()=>{
 const s=r('src/app/admin/cms/page.tsx');
 assert.match(s,/const \[cmsLoaded, setCmsLoaded\] = useState\(false\)/);
 assert.match(s,/if \(!res\.ok \|\| !data\.success \|\| !Array\.isArray\(data\.pages\)\)/);
 assert.match(s,/if \(!cmsLoaded \|\| loading\)/);
 assert.match(s,/const storedPages = await fetchCmsPages\(\)/);
 assert.match(s,/Save was accepted, but database read-back did not match/);
 assert.match(s,/disabled=\{saving \|\| loading \|\| !cmsLoaded \|\| selectedPage === 'home'\}/);
 assert.match(s,/Content Blocks must be a JSON object/);
 assert.doesNotMatch(s,/text-amber-200\/90/);
});

test('admin CMS registry fails closed when Supabase cannot read saved content',()=>{
 const s=r('src/lib/cms-service.ts');
 const registry=s.slice(s.indexOf('export async function getAllCmsPagesAdmin('),s.indexOf('/**\n * Admin mutation:'));
 assert.match(registry,/if \(error\)/);
 assert.match(registry,/throw new Error\('CMS registry unavailable'\)/);
 assert.match(registry,/return \(data \|\| \[\]\) as CmsPageRecord\[\]/);
 assert.doesNotMatch(registry,/return Object\.values\(memoryCmsStore\)/);
});

test('blog admin uses strict database reads while public build has a safe availability fallback',()=>{
 const s=r('src/lib/blog-service.ts');
 const reader=s.slice(s.indexOf('async function readManagedBlogOverridesFromDb'),s.indexOf('export const getManagedBlogOverridesCached'));
 const admin=s.slice(s.indexOf('export async function getAllBlogPostsAdmin'),s.indexOf('function validImage('));
 assert.match(reader,/throw new Error\('Blog CMS registry unavailable'\)/);
 assert.match(admin,/readManagedBlogOverridesFromDb\(\)/);
 assert.doesNotMatch(admin,/getManagedBlogOverridesCached\(\)/);
 assert.match(s,/const current=\(await readManagedBlogOverridesFromDb\(\)\)/);
});

test('CMS writes use optimistic locking and read actual previous DB values for audit',()=>{
 const service=r('src/lib/cms-service.ts');
 const api=r('src/app/api/admin/cms/route.ts');
 const ui=r('src/app/admin/cms/page.tsx');
 assert.match(service,/export async function getCmsPageAdmin\(/);
 assert.match(service,/getCmsPageAdmin\(record\.page_key, record\.language\)/);
 assert.match(service,/\.eq\('updated_at', record\.expected_updated_at!\)/);
 assert.match(service,/if \(!data\) return \{ success:false, error:conflict \}/);
 assert.match(service,/error\.code === '23505'/);
 assert.match(service,/oldValues, newValues: stored/);
 assert.doesNotMatch(service,/memoryCmsStore/);
 assert.match(ui,/expected_updated_at: existing\?\.updated_at \?\? null/);
 assert.match(api,/getCmsPageAdmin\(pageKey, locale\)/);
 assert.match(api,/status: isConflict \? 409/);
});
