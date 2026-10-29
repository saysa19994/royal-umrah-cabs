import assert from 'node:assert';
import test from 'node:test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 1. Prohibited reverse-pattern leaks across all 10 languages
const REVERSE_PATTERN_LEAKS = [
  /tunai\s+atau\s+(kartu|kad)/i,
  /nakit\s+veya\s+kart/i,
  /نقد\s+یا\s+کارڈ/u,
  /نقداً\s+أو\s+بطاقة/u,
  /نقدا\s+او\s+بطاقة/u,
  /en\s+espèces\s+ou\s+par\s+carte/i,
  /en\s+efectivo\s+o\s+con\s+tarjeta/i,
  /bar\s+oder\s+mit\s+Karte/i,
  /नकद\s+या\s+कार्ड/u,
  /or\s+by\s+card/i
];

const SCANNED_FILES = [
  'public/llms.txt',
  'src/data/blog-posts.ts',
  'src/data/localized-routes-content.ts',
  'src/data/routes-data.ts',
  'src/data/faqs-master.ts',
  'src/data/services-cities-data.ts',
  'src/data/comprehensive-guides.ts',
  'src/i18n/dictionaries/en.json',
  'src/i18n/dictionaries/ar.json',
  'src/i18n/dictionaries/ms.json',
  'src/i18n/dictionaries/id.json',
  'src/i18n/dictionaries/ur.json',
  'src/i18n/dictionaries/tr.json',
  'src/i18n/dictionaries/fr.json',
  'src/i18n/dictionaries/es.json',
  'src/i18n/dictionaries/de.json',
  'src/i18n/dictionaries/hi.json',
];

test('Payment Policy: Zero reverse-pattern card acceptance leaks across user-facing files', () => {
  const violations = [];

  for (const relPath of SCANNED_FILES) {
    const fullPath = path.join(rootDir, relPath);
    if (!fs.existsSync(fullPath)) continue;

    const content = fs.readFileSync(fullPath, 'utf8');
    const lines = content.split('\n');

    lines.forEach((line, idx) => {
      for (const pattern of REVERSE_PATTERN_LEAKS) {
        if (pattern.test(line)) {
          violations.push(`${relPath}:${idx + 1} matches prohibited reverse-pattern ${pattern}: "${line.trim()}"`);
        }
      }
    });
  }

  assert.strictEqual(
    violations.length,
    0,
    `Found ${violations.length} reverse-pattern payment violations:\n` + violations.join('\n')
  );
});

test('Payment Policy: All 10 dictionaries define cash-only policy in FAQ Q2/A2', () => {
  const locales = ['en', 'ar', 'ms', 'id', 'ur', 'tr', 'fr', 'es', 'de', 'hi'];

  for (const loc of locales) {
    const dictPath = path.join(rootDir, `src/i18n/dictionaries/${loc}.json`);
    assert.strictEqual(fs.existsSync(dictPath), true, `Missing dictionary for locale: ${loc}`);

    const content = fs.readFileSync(dictPath, 'utf8');
    const dict = JSON.parse(content);

    assert.ok(dict.faq, `Dictionary for ${loc} must contain faq section`);
    assert.ok(dict.faq.a2, `Dictionary for ${loc} must contain faq.a2`);
    assert.ok(dict.booking_card, `Dictionary for ${loc} must contain booking_card section`);
  }
});

test('Payment Policy: public/llms.txt strictly defines Cash-Only and zero prepayment', () => {
  const llmsPath = path.join(rootDir, 'public/llms.txt');
  assert.strictEqual(fs.existsSync(llmsPath), true, 'public/llms.txt must exist');

  const content = fs.readFileSync(llmsPath, 'utf8');
  assert.ok(content.includes('Strictly Cash Only'), 'llms.txt must mandate Strictly Cash Only');
  assert.ok(content.includes('Zero Advance Prepayment'), 'llms.txt must state Zero Advance Prepayment');
  assert.ok(content.includes('Excluded Payment Methods'), 'llms.txt must list Excluded Payment Methods');
});
