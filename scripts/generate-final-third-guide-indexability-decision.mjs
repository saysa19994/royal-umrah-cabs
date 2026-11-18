import fs from 'fs';
import path from 'path';

const locales = ['ar', 'en', 'ms', 'fr', 'es', 'id', 'hi', 'de', 'ur', 'tr'];

const header = [
  'Locale',
  'Route Path',
  'Full URL',
  'Main Body Language',
  'Main Content Uniqueness',
  'Current Rendered Canonical',
  'Rendered Robots Directive',
  'Hreflang Reciprocal Cluster',
  'Internal Inbound Linking',
  'Is Genuine Index-Worthy Landing Page',
  'Final Indexability Decision Status',
  'Technical Justification & Recommended Action'
];

const rows = [header.map(h => `"${h}"`).join(',')];

for (const loc of locales) {
  const routePath = `/${loc}/guides/makkah-to-madinah-transport-comparison`;
  const fullUrl = `https://duyufalrahmanvip.com${routePath}`;
  
  let mainBodyLang = 'English (Hardcoded Sections 1-4)';
  let contentUniqueness = 'Low (Duplicates /guides/makkah-to-madinah-taxi-vs-haramain-train)';
  let canonical = `https://duyufalrahmanvip.com/${loc}/guides/makkah-to-madinah-transport-comparison`;
  let robots = 'index, follow';
  let hreflang = '11 alternate tags (10 locales + x-default)';
  let internalLinking = '0 inbound links (Orphan route; omitted from /guides index)';
  let isIndexWorthy = 'NO';
  let decisionStatus = '';
  let justification = '';

  if (loc === 'en') {
    mainBodyLang = 'English';
    contentUniqueness = 'Duplicate Intent (Competes directly with comprehensive guide /en/guides/makkah-to-madinah-taxi-vs-haramain-train)';
    decisionStatus = 'DUPLICATE — CONSOLIDATE WITH THE CORRECT PRIMARY PAGE';
    justification = 'Targets identical search query ("Makkah to Madinah taxi vs train") as the authoritative comprehensive guide. Retaining both causes keyword cannibalization. Must remain excluded from sitemap and consolidate to /en/guides/makkah-to-madinah-taxi-vs-haramain-train via 301 redirect or canonical.';
  } else if (loc === 'ar') {
    mainBodyLang = 'Mixed (Arabic Title/Meta; English Core Body Paragraphs 1-4)';
    contentUniqueness = 'Defective / Duplicate (English body copy shown to Arabic users; native Arabic guide /ar/guides/makkah-to-madinah-taxi-vs-haramain-train already exists)';
    decisionStatus = 'DUPLICATE — CONSOLIDATE WITH THE CORRECT PRIMARY PAGE';
    justification = 'The 4 comparison body paragraphs are hardcoded in English, presenting poor UX for Arabic searchers when a fully translated, comprehensive Arabic guide already exists. Must remain excluded from ar.xml and consolidate to /ar/guides/makkah-to-madinah-taxi-vs-haramain-train.';
  } else if (loc === 'tr') {
    mainBodyLang = 'English (Hardcoded Sections 1-4)';
    contentUniqueness = 'Defective Metadata (Title and H1 display luggage capacity translation: "2026 Umre Sezonunda Araç Seçimi ve Bagaj Kapasiteleri")';
    decisionStatus = 'DRAFT / NON-INDEXABLE — DOCUMENT THE REASON';
    justification = 'Metadata key mismatch in Turkish dictionary causes misleading luggage title on a transit comparison route, coupled with unlocalized English body text. Unfit for indexing; must remain excluded from sitemap until content and dictionary keys are corrected.';
  } else {
    // ms, fr, es, id, hi, de, ur
    mainBodyLang = 'English Fallback (Hardcoded Sections 1-4)';
    contentUniqueness = 'English Fallback Copy with Localized Meta/UI';
    decisionStatus = 'ENGLISH FALLBACK — CANONICAL TO ENGLISH, EXCLUDE FROM LOCALE SITEMAP';
    justification = 'Page body is unlocalized English fallback copy. Per Approved Sitemap Condition 2 and Google duplicate content guidelines, English-fallback pages must not be included in localized XML sitemaps and should canonicalize to the primary English equivalent.';
  }

  rows.push([
    `"${loc}"`,
    `"${routePath}"`,
    `"${fullUrl}"`,
    `"${mainBodyLang}"`,
    `"${contentUniqueness}"`,
    `"${canonical}"`,
    `"${robots}"`,
    `"${hreflang}"`,
    `"${internalLinking}"`,
    `"${isIndexWorthy}"`,
    `"${decisionStatus}"`,
    `"${justification}"`
  ].join(','));
}

fs.writeFileSync('docs/seo/final-third-guide-indexability-decision.csv', rows.join('\n'), 'utf8');
console.log('Saved docs/seo/final-third-guide-indexability-decision.csv with', rows.length - 1, 'rows');
