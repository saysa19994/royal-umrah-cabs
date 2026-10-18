const fs = require('fs');
const path = require('path');

const locales = ['en', 'ar', 'ms', 'fr', 'es', 'id', 'hi', 'de', 'ur'];
const dictDir = path.join(__dirname, '..', 'src', 'i18n', 'dictionaries');

// Allowed identical keys across languages (brand names, proper nouns, international acronyms)
const ALLOWED_IDENTICAL_KEYS = new Set([
  'meta.brand',
  'meta.brandSub',
  'fleet.stariaName',
  'fleet.yukonName',
  'fleet.camryName',
  'fleet.hiaceName',
  'fleet.coasterName',
  'routes.jeddahAirportMakkah',
  'routes.makkahMadinah',
  'routes.makkahJeddahAirport',
  'routes.madinahMakkah',
  'routes.madinahAirportHotel',
  'routes.jeddahMadinah',
]);

function flattenKeys(obj, prefix = '') {
  let keys = [];
  for (const k of Object.keys(obj)) {
    const fullPath = prefix ? `${prefix}.${k}` : k;
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      keys = keys.concat(flattenKeys(obj[k], fullPath));
    } else {
      keys.push(fullPath);
    }
  }
  return keys;
}

function getValueByPath(obj, pathStr) {
  return pathStr.split('.').reduce((acc, part) => acc && acc[part], obj);
}

console.log('--- STARTING STRICT i18n VALIDATION & INTEGRITY CHECK ---');

const masterPath = path.join(dictDir, 'en.json');
if (!fs.existsSync(masterPath)) {
  console.error('FATAL: Master dictionary en.json not found at:', masterPath);
  process.exit(1);
}

const masterDict = JSON.parse(fs.readFileSync(masterPath, 'utf8'));
const masterKeys = flattenKeys(masterDict);
console.log(`Found ${masterKeys.length} translation keys in master (en.json).`);

let hasError = false;

for (const loc of locales) {
  if (loc === 'en') continue;
  const targetPath = path.join(dictDir, `${loc}.json`);
  if (!fs.existsSync(targetPath)) {
    console.error(`FATAL: Dictionary for locale "${loc}" not found at:`, targetPath);
    hasError = true;
    continue;
  }

  let targetDict;
  try {
    targetDict = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
  } catch (err) {
    console.error(`FATAL: Invalid JSON syntax in ${loc}.json:`, err.message);
    hasError = true;
    continue;
  }

  const missingKeys = [];
  const emptyKeys = [];
  const untranslatedKeys = [];

  for (const key of masterKeys) {
    const masterVal = getValueByPath(masterDict, key);
    const targetVal = getValueByPath(targetDict, key);

    if (targetVal === undefined) {
      missingKeys.push(key);
    } else if (typeof targetVal === 'string' && targetVal.trim() === '') {
      emptyKeys.push(key);
    } else if (
      typeof masterVal === 'string' &&
      typeof targetVal === 'string' &&
      masterVal.trim().length > 3 &&
      targetVal.trim() === masterVal.trim() &&
      !ALLOWED_IDENTICAL_KEYS.has(key)
    ) {
      // Disallow untranslated English placeholder strings in non-English dictionaries
      untranslatedKeys.push(key);
    }
  }

  if (missingKeys.length > 0) {
    console.error(`\n❌ [FAIL] Missing ${missingKeys.length} keys in "${loc}.json":`);
    missingKeys.slice(0, 15).forEach(k => console.error(`   - ${k}`));
    hasError = true;
  }

  if (emptyKeys.length > 0) {
    console.error(`\n❌ [FAIL] Empty string in ${emptyKeys.length} keys in "${loc}.json":`);
    emptyKeys.slice(0, 15).forEach(k => console.error(`   - ${k}`));
    hasError = true;
  }

  if (untranslatedKeys.length > 0) {
    console.error(`\n❌ [FAIL] Found ${untranslatedKeys.length} untranslated English values in "${loc}.json":`);
    untranslatedKeys.slice(0, 15).forEach(k => console.error(`   - ${k}`));
    hasError = true;
  }

  if (missingKeys.length === 0 && emptyKeys.length === 0 && untranslatedKeys.length === 0) {
    console.log(`✓ [PASS] Locale "${loc}" is 100% translated and verified (${masterKeys.length} keys).`);
  }
}

if (hasError) {
  console.error('\n❌ i18n VALIDATION FAILED! Untranslated English or missing keys detected.\n');
  process.exit(1);
} else {
  console.log('\n✅ ALL i18n TRANSLATION KEYS ARE FULLY LOCALIZED AND VERIFIED!\n');
  process.exit(0);
}
