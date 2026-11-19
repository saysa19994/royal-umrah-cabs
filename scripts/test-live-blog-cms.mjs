import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
const read=p=>readFileSync(p,'utf8');
test('blog edits persist in page_content, not ephemeral files',()=>{
  const s=read('src/lib/blog-service.ts');
  assert.match(s, /page_key:'blog_'\+slug/);
  assert.match(s,/getManagedBlogOverridesCached/);
  assert.doesNotMatch(s,/writeFileSync/);
});
test('public editorial and article page load published CMS edits',()=>{
  assert.match(read('src/app/[locale]/blog/page.tsx'),/getManagedEditorialPosts/);
  assert.match(read('src/app/[locale]/blog/[slug]/page.tsx'),/getManagedBlogPost/);
  assert.match(read('src/app/api/blog-article/route.ts'),/getManagedBlogPost/);
});
test('new articles are in AR and EN only until translated',()=>{
  assert.match(read('src/app/sitemap.ts'),/locale==='ar'\|\|locale==='en'/);
  assert.match(read('src/lib/blog-editorial-mapper.ts'),/locale==='ar'\|\|locale==='en'/);
});
