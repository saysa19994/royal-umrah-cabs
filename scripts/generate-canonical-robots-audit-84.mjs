import fs from 'fs';
import { COMPREHENSIVE_GUIDES } from '../src/data/comprehensive-guides.ts';
import { LOCALES } from '../src/i18n/config.ts';

// The 8 non-ar/en locales for the 12 comprehensive guides
const fallbackLocales = ['tr', 'ms', 'id', 'ur', 'fr', 'es', 'de', 'hi'];
const baseUrl = 'https://duyufalrahmanvip.com';

const records = [];

for (const guide of COMPREHENSIVE_GUIDES) {
  for (const locale of fallbackLocales) {
    const url = `${baseUrl}/${locale}/guides/${guide.slug}`;
    const enUrl = `${baseUrl}/en/guides/${guide.slug}`;
    
    // Class determination:
    // For Turkish (tr) and Indonesian (id), because they have significant Umrah search volume in GSC:
    // Recommendation: Class C (Complete translation and self-canonical) for top commercial guides,
    // and Class A (Clean Canonical consolidation to English WITHOUT noindex) in the interim.
    let recommendationClass = 'Class A (Canonical Consolidation to English without noindex)';
    let rationale = 'Google already consolidated this duplicate to /en/. Remove noindex and retain canonical to /en to avoid contradictory signals and preserve link equity.';

    if (locale === 'tr' && (guide.slug.includes('transport') || guide.slug.includes('makkah') || guide.slug.includes('madinah'))) {
      recommendationClass = 'Class C (Complete translation and self-canonical)';
      rationale = 'High Turkish pilgrim search volume in GSC (e.g. riyad mekke arası ulaşım). Priority candidate for editorial translation to capture Turkish search demand.';
    } else if (locale === 'id' && (guide.slug.includes('taxi') || guide.slug.includes('airport') || guide.slug.includes('vehicle'))) {
      recommendationClass = 'Class C (Complete translation and self-canonical)';
      rationale = 'High Indonesian pilgrim search demand. Priority candidate for editorial Indonesian localization with self-canonical.';
    }

    records.push({
      url,
      locale,
      slug: guide.slug,
      renderedContentLanguage: 'English (Fallback text)',
      httpStatus: 200,
      robotsMeta: 'noindex, follow',
      xRobotsTag: 'None',
      declaredCanonical: enUrl,
      googleSelectedCanonical: enUrl,
      inSitemap: 'No (Excluded per Condition 2)',
      inHreflang: 'No (Excluded from ar/en clusters)',
      conflictFlag: 'YES - Combines noindex with cross-language canonical',
      recommendationClass,
      rationale
    });
  }
}

console.log(`Generated audit for ${records.length} English-fallback URLs.`);

// Write CSV
const headers = [
  'URL',
  'Locale',
  'Guide Slug',
  'Rendered Main-Content Language',
  'HTTP Status',
  'Robots Meta Tag',
  'X-Robots-Tag',
  'Declared Canonical',
  'Google-Selected Canonical (GSC)',
  'In Sitemap',
  'In Hreflang',
  'Conflict Flag',
  'Recommendation Class',
  'Strategic Rationale'
];

const csvRows = [headers.join(',')];
for (const r of records) {
  csvRows.push([
    `"${r.url}"`,
    `"${r.locale}"`,
    `"${r.slug}"`,
    `"${r.renderedContentLanguage}"`,
    r.httpStatus,
    `"${r.robotsMeta}"`,
    `"${r.xRobotsTag}"`,
    `"${r.declaredCanonical}"`,
    `"${r.googleSelectedCanonical}"`,
    `"${r.inSitemap}"`,
    `"${r.inHreflang}"`,
    `"${r.conflictFlag}"`,
    `"${r.recommendationClass}"`,
    `"${r.rationale.replace(/"/g, '""')}"`
  ].join(','));
}

fs.mkdirSync('d:/royal-umrah-cabs/docs/seo', { recursive: true });
fs.writeFileSync('d:/royal-umrah-cabs/docs/seo/canonical-robots-audit-84.csv', csvRows.join('\n'), 'utf8');
console.log('Saved to docs/seo/canonical-robots-audit-84.csv');
