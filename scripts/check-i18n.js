const fs = require('fs');
const path = require('path');

const locales = ['en', 'ar', 'ms', 'fr', 'es', 'id', 'hi', 'de', 'ur'];
const dictDir = path.join(__dirname, '..', 'src', 'i18n', 'dictionaries');

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

console.log('--- STARTING STRICT i18n VALIDATION ---');

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

  const targetKeys = flattenKeys(targetDict);
  const missingKeys = [];
  const emptyKeys = [];

  for (const key of masterKeys) {
    const val = getValueByPath(targetDict, key);
    if (val === undefined) {
      missingKeys.push(key);
    } else if (typeof val === 'string' && val.trim() === '') {
      emptyKeys.push(key);
    }
  }

  if (missingKeys.length > 0) {
    console.error(`\n❌ [FAIL] Missing ${missingKeys.length} keys in "${loc}.json":`);
    missingKeys.forEach(k => console.error(`   - ${k}`));
    hasError = true;
  }

  if (emptyKeys.length > 0) {
    console.error(`\n❌ [FAIL] Empty string in ${emptyKeys.length} keys in "${loc}.json":`);
    emptyKeys.forEach(k => console.error(`   - ${k}`));
    hasError = true;
  }

  const extraKeys = targetKeys.filter(k => !masterKeys.includes(k));
  if (extraKeys.length > 0) {
    console.warn(`\n⚠️ [WARN] Found ${extraKeys.length} extra keys in "${loc}.json" not in en.json:`);
    extraKeys.forEach(k => console.warn(`   + ${k}`));
  }

  if (missingKeys.length === 0 && emptyKeys.length === 0) {
    console.log(`✓ [PASS] Locale "${loc}" has all ${masterKeys.length} keys populated.`);
  }
}

if (hasError) {
  console.error('\n❌ i18n VALIDATION FAILED! Build aborted to prevent missing translations.\n');
  process.exit(1);
} else {
  console.log('\n✅ ALL i18n TRANSLATION KEYS ARE 100% COMPLETE AND SYNCHRONIZED!\n');
  process.exit(0);
}
