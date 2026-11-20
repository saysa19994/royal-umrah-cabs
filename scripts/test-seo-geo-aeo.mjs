import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import ts from 'typescript';

const root = resolve(import.meta.dirname, '..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');

// Compile the small policy module and stub only its existing URL helper so we
// can execute policy tests without a Next.js server or a network connection.
function loadBlogIndexability() {
  const tsCode = read('src/lib/seo/blog-indexability.ts');
  const compiled = ts.transpileModule(tsCode, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const out = {};
  const getLocalizedAlternates = (locale, path) => ({
    canonical: `https://duyufalrahmanvip.com/${locale}${path}`,
    languages: { ar: `https://duyufalrahmanvip.com/ar${path}`, en: `https://duyufalrahmanvip.com/en${path}` },
  });
  const localRequire = (id) => {
    if (id === '@/i18n/config') return { getLocalizedAlternates };
    throw new Error('Unexpected dependency: ' + id);
  };
  new Function('exports', 'require', 'process', compiled)(out, localRequire, {
    env: { NEXT_PUBLIC_SITE_URL: 'https://duyufalrahmanvip.com' },
  });
  return out;
}

test('untranslated article versions stay accessible but do not enter search clusters', () => {
  const { hasIndexableBlogTranslation, getBlogLocalizedAlternates } = loadBlogIndexability();
  for (const slug of ['makkah-to-taif-private-transfer', 'riyadh-to-makkah-private-transfer']) {
    assert.equal(hasIndexableBlogTranslation(slug, 'ar'), true);
    assert.equal(hasIndexableBlogTranslation(slug, 'en'), true);
    for (const locale of ['ms', 'id', 'ur', 'fr', 'es', 'de', 'tr', 'hi']) {
      assert.equal(hasIndexableBlogTranslation(slug, locale), false);
      const out = getBlogLocalizedAlternates(locale, slug);
      assert.equal(out.canonical, `https://duyufalrahmanvip.com/${locale}/blog/${slug}`);
      assert.equal('languages' in out, false, 'English fallback must never declare translated hreflang');
    }
    const native = getBlogLocalizedAlternates('ar', slug);
    assert.deepEqual(Object.keys(native.languages).sort(), ['ar', 'en', 'x-default']);
  }
  assert.equal(hasIndexableBlogTranslation('private-transfer-makkah-to-madinah', 'tr'), true);
});

test('blog page metadata and XML sitemap use identical translation eligibility', () => {
  const blogPage = read('src/app/[locale]/blog/[slug]/page.tsx');
  const sitemap = read('src/app/sitemap.ts');
  assert.match(blogPage, /robots: \{ index: hasIndexableBlogTranslation\(slug, locale\), follow: true \}/);
  assert.match(blogPage, /getBlogLocalizedAlternates\(locale, slug\)/);
  assert.match(sitemap, /BLOG_POSTS\.filter\(\(post\) => hasIndexableBlogTranslation\(post\.slug, locale\)\)/);
  assert.match(sitemap, /getBlogLocalizedAlternates\(locale, slug\)/);
});

test('English-only train comparison stays out of untranslated locale sitemaps', () => {
  const sitemap = read('src/app/sitemap.ts');
  const page = read('src/app/[locale]/guides/makkah-to-madinah-transport-comparison/page.tsx');
  assert.match(sitemap, /locale === 'en' \? \['\/guides\/makkah-to-madinah-transport-comparison'\] : \[\]/);
  assert.match(page, /robots: \{ index: locale === 'en', follow: true \}/);
});

test('sitemaps do not claim an artificial daily modification', () => {
  const index = read('src/app/sitemap.xml/route.ts');
  assert.doesNotMatch(index, /new Date\(\)/);
  assert.doesNotMatch(index, /<lastmod>/);
});

test('production host consolidation does not rewrite preview or POST requests', () => {
  const middleware = read('src/middleware.ts');
  assert.match(middleware, /process\.env\.VERCEL_ENV === 'production'/);
  assert.match(middleware, /request\.method === 'GET'/);
  assert.match(middleware, /request\.method === 'HEAD'/);
  assert.match(middleware, /host === 'www\.duyufalrahmanvip\.com'/);
  assert.match(middleware, /host\.endsWith\('\.vercel\.app'\)/);
  assert.match(middleware, /status: 308/);
});
