import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
const read = p => readFileSync(p,'utf8');

test('FAQ source of truth is durable page_content, not missing faqs table or memory',()=>{
 const src=read('src/lib/faq-service.ts');
 assert.match(src,/const FAQ_KEY_PREFIX = 'faq_item_'/);
 assert.match(src,/\.from\('page_content'\)\.upsert/);
 assert.match(src,/language: 'all'/);
 assert.match(src,/onConflict: 'page_key,language'/);
 assert.doesNotMatch(src,/\.from\('faqs'\)/);
 assert.doesNotMatch(src,/runtimeFaqsStore/);
});
test('individual FAQ overrides preserve built-in defaults and respect deletion tombstones',()=>{
 const src=read('src/lib/faq-service.ts');
 assert.match(src,/new Map\(getInitialSeededFaqs\(\)\.map/);
 assert.match(src,/if \(saved\.deleted\) records\.delete\(saved\.id\)/);
 assert.match(src,/content_blocks: \{ deleted: true, previous: existing, id \}/);
});
test('FAQ saves and archives fail closed and refresh public page cache',()=>{
 const src=read('src/lib/faq-service.ts');
 assert.match(src,/Database persistence unavailable; FAQ was not saved/);
 assert.match(src,/Database persistence unavailable; FAQ was preserved/);
 assert.match(src,/revalidateTag\('site_faqs'\)/);
 assert.match(src,/revalidatePath\('\/\[locale\]\/faq', 'page'\)/);
});
test('operational FAQ editing requires manager and never promotes online payment',()=>{
 const api=read('src/app/api/admin/faqs/route.ts');
 const ui=read('src/app/admin/faqs/page.tsx');
 assert.match(api,/Only management can approve operational FAQs/);
 assert.doesNotMatch(ui,/Online Card Gateway/);
 assert.doesNotMatch(ui,/Saudi Bank Transfer/);
 assert.match(read('src/lib/faq-service.ts'),/forbiddenFlags/);
});

test('empty published FAQ registry does not resurrect hard-coded questions',()=>{
  const page=read('src/app/[locale]/faq/page.tsx');
  const section=read('src/components/faq/FaqSection.tsx');
  const seo=read('src/components/seo/JsonLd.tsx');
  assert.match(page,/const faqItems = dbFaqs;/);
  assert.match(section,/const faqItems = items \?\? fallbackItems/);
  assert.match(seo,/if \(faqList\.length === 0\) return null/);
});
