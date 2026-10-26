import fs from 'fs';
import path from 'path';

const DICT_DIR = 'D:/royal-umrah-cabs/src/i18n/dictionaries';
const LOCALES = ['en', 'ar', 'ms', 'fr', 'es', 'id', 'hi', 'de', 'ur', 'tr'];

const results = [];

console.log('================================================================');
console.log('FAQ SYSTEM MULTILINGUAL VALIDATION MATRIX (10 LOCALES x 12 TOPICS)');
console.log('================================================================\n');

let totalChecks = 0;
let passedChecks = 0;

for (const loc of LOCALES) {
  const filePath = path.join(DICT_DIR, `${loc}.json`);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ [${loc}] Dictionary file missing: ${filePath}`);
    continue;
  }

  const dict = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const faq = dict.faq;

  const row = {
    locale: loc,
    questionsCount: 0,
    answersCount: 0,
    hasHeaders: false,
    hasCta: false,
    emptyFields: [],
    sampleQ1: '',
    sampleQ2: '',
    status: 'PASS',
  };

  if (!faq) {
    row.status = 'FAIL - No FAQ Object';
    results.push(row);
    continue;
  }

  // Check header fields
  totalChecks += 3;
  if (faq.sectionPill && faq.heading && faq.subtitle) {
    row.hasHeaders = true;
    passedChecks += 3;
  } else {
    row.emptyFields.push('headers');
  }

  // Check CTA fields
  totalChecks += 4;
  if (faq.ctaTitle && faq.ctaSubtitle && faq.ctaButton && faq.ctaWhatsapp) {
    row.hasCta = true;
    passedChecks += 4;
  } else {
    row.emptyFields.push('cta');
  }

  // Check all 12 questions & answers
  for (let i = 1; i <= 12; i++) {
    totalChecks += 2;
    const qKey = `q${i}`;
    const aKey = `a${i}`;

    const qVal = faq[qKey];
    const aVal = faq[aKey];

    if (qVal && typeof qVal === 'string' && qVal.trim().length > 5) {
      row.questionsCount++;
      passedChecks++;
    } else {
      row.emptyFields.push(qKey);
    }

    if (aVal && typeof aVal === 'string' && aVal.trim().length > 10) {
      row.answersCount++;
      passedChecks++;
    } else {
      row.emptyFields.push(aKey);
    }
  }

  row.sampleQ1 = faq.q1;
  row.sampleQ2 = faq.q2;

  if (row.questionsCount !== 12 || row.answersCount !== 12 || !row.hasHeaders || !row.hasCta) {
    row.status = 'FAIL';
  }

  results.push(row);
}

// Print Validation Matrix
console.table(
  results.map((r) => ({
    Locale: r.locale,
    'Questions (12)': `${r.questionsCount}/12`,
    'Answers (12)': `${r.answersCount}/12`,
    Headers: r.hasHeaders ? '✓ OK' : '❌ Missing',
    'CTA Elements': r.hasCta ? '✓ OK' : '❌ Missing',
    Status: r.status,
  }))
);

console.log('\nSample Translated Questions:');
results.forEach((r) => {
  console.log(`[${r.locale.toUpperCase()}] Q1: "${r.sampleQ1}"`);
});

console.log(`\nValidation Summary: ${passedChecks}/${totalChecks} checks passed.`);
if (passedChecks === totalChecks) {
  console.log('🎉 ALL 10 LOCALES VALIDATED SUCCESSFULLY WITH ZERO DEFECTS!');
} else {
  console.error('⚠️ SOME CHECKS FAILED!');
  process.exit(1);
}
