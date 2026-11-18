import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(path, 'utf8');

test('Ziyarat imagery allows Wikimedia photographs while preserving tight CSP', () => {
  const config = read('next.config.mjs');
  const imgSrc = config.match(/img-src ([^;]+);/)?.[1] || '';
  assert.match(imgSrc, /https:\/\/commons\.wikimedia\.org/);
  assert.match(imgSrc, /https:\/\/upload\.wikimedia\.org/);
  assert.doesNotMatch(imgSrc, /https:\/\/\*/);
  assert.match(config, /hostname: 'commons\.wikimedia\.org'/);
  assert.match(config, /hostname: 'upload\.wikimedia\.org'/);
});

test('upper arc uses nine actual mapped sacred-site photographs, not generic chauffeur shots', () => {
  const arc = read('src/components/ziyarat/ZiyaratArcGallery.tsx');
  const keys = [...arc.matchAll(/\{id:'[^']+',key:'([^']+)'/g)].map(m => m[1]);
  assert.equal(keys.length, 9);
  assert.equal(new Set(keys).size, 9);
  assert.doesNotMatch(arc, /src:'\/assets\/homepage-v2\//);
  assert.match(arc, /ZIYARAT_VISUALS\[photo\.key\]\.src/);
  assert.match(arc, /Math\.abs\(delta\)>2\?'hidden'/);
});

test('each landmark uses a distinct filename and no repeated Kaaba/Madinah fallback', () => {
  const registry = read('src/data/ziyarat-visuals.ts');
  const media = [...registry.matchAll(/src: commons\('([^']+)'\)/g)].map(m => m[1]);
  assert.equal(new Set(media).size, media.length);
  assert.ok(media.length >= 10);
  const cards = read('src/components/ziyarat/SacredZiyaratExperience.tsx');
  assert.doesNotMatch(cards, /const fallback = site\.city/);
  assert.match(cards, /ZIYARAT_CARD_TO_SITE\[site\.id\]/);
  assert.match(cards, /onError=\{\(\) => setFailed\(true\)\}/);
});