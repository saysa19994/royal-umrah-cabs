import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = (name) => readFileSync(resolve(root, name), 'utf8');

test('CMS content has a long cache fallback, but remains editable on demand', () => {
  const code = read('src/lib/cms-service.ts');
  assert.ok(code.includes("{ tags: ['site_cms'], revalidate: 86400 }"));
  assert.ok(code.includes("revalidateTag('site_cms')"));
  assert.ok(code.includes("revalidatePath('/[locale]', 'page')"));
  assert.ok(code.indexOf("revalidateTag('site_cms')") > code.indexOf("memoryCmsStore[key] = record"));
});

test('fleet images use a long cache fallback, with immediate invalidation on edit', () => {
  const code = read('src/lib/media-service.ts');
  assert.ok(code.includes("{ tags: ['site_media', 'site_fleet'], revalidate: 86400 }"));
  assert.ok(code.includes("revalidateTag('site_media')"));
  assert.ok(code.includes("revalidatePath('/[locale]/fleet', 'page')"));
});

test('booking, SEO, pricing, and production config remain outside the change scope', () => {
  const settings = read('src/lib/cache-revalidate.ts');
  assert.ok(settings.includes("revalidateTag(tag)"), 'targeted cache invalidation is preserved');
  assert.ok(!settings.includes("revalidatePath('/', 'layout')"), 'avoid broad root-layout regeneration');
  const prices = read('src/lib/pricing-db.ts');
  assert.ok(prices.includes("tags: ['site_prices']"));
});
