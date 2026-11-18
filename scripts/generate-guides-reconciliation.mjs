import fs from 'fs';

const guideSlugs = [
  'jeddah-airport-to-makkah-taxi-vs-train',
  'makkah-to-madinah-taxi-vs-haramain-train',
  'umrah-taxi-prices-routes-vehicles',
  'how-to-choose-the-right-vehicle-for-umrah-group',
  'madinah-airport-to-hotel-transport',
  'jeddah-airport-to-madinah-transport-options',
  'makkah-ziyarat-places-routes-transport',
  'madinah-ziyarat-planning-transport',
  'umrah-travel-with-elderly-parents',
  'luggage-and-vehicle-capacity-for-umrah',
  'jeddah-airport-arrival-pickup-guide',
  'how-to-book-and-confirm-umrah-taxi'
];

const locales = ['ar', 'en', 'tr', 'ms', 'id', 'ur', 'fr', 'es', 'de', 'hi'];
const gscReport7Locales = ['tr', 'fr', 'de', 'es', 'id', 'ms', 'hi']; // The 7 locales that formed the 84 URLs in the 150 GSC report

const rows = [];
const header = [
  'Guide Slug',
  'Locale',
  'URL',
  'Main-Content Language',
  'Translation Completion Status',
  'Current Robots Directive',
  'Current Canonical',
  'Current Hreflang Membership',
  'Current Sitemap Inclusion',
  'GSC Mismatch Status',
  'GSC-Selected Canonical',
  'Final Recommended Indexing Policy',
  'Reason for Exclusion / Strategic Note'
];

rows.push(header.map(h => `"${h}"`).join(','));

for (const slug of guideSlugs) {
  for (const loc of locales) {
    const url = `https://duyufalrahmanvip.com/${loc}/guides/${slug}`;
    const isAr = loc === 'ar';
    const isEn = loc === 'en';
    const isFullyTranslated = isAr || isEn;

    const mainLang = isAr ? 'Arabic' : (isEn ? 'English' : 'English (Fallback text)');
    const transStatus = isFullyTranslated ? 'Fully Translated (100%)' : 'English Fallback Body';
    
    // In current build: ar and en are index, follow; non-ar/en currently have noindex, follow in preview
    const robots = isFullyTranslated ? 'index, follow' : 'noindex, follow';
    const canonical = isFullyTranslated ? url : `https://duyufalrahmanvip.com/en/guides/${slug}`;
    const hreflang = isFullyTranslated ? 'Included in ar/en reciprocal cluster' : 'Excluded from localized cluster';
    const sitemap = isFullyTranslated ? 'Included in /sitemap/[locale].xml' : 'Excluded per Condition 2';
    
    const inGsc = gscReport7Locales.includes(loc);
    const gscMismatch = inGsc ? 'Present in GSC 150 Report (Subset of 84)' : (isFullyTranslated ? 'Not in Mismatch Report (Indexed as Canonical)' : 'Not in GSC 84 Subset (Locale omitted in legacy sample)');
    const gscSelectedCanonical = inGsc ? `https://duyufalrahmanvip.com/en/guides/${slug}` : (isFullyTranslated ? 'N/A (Self-Canonical Recognized)' : 'Predicted: https://duyufalrahmanvip.com/en/guides/' + slug);

    let finalPolicy = '';
    let reason = '';

    if (isFullyTranslated) {
      finalPolicy = 'Self-Canonical Indexable (Class A Primary)';
      reason = 'Authoritative localized version. 100% human translated, fully eligible for search results and reciprocal hreflang.';
    } else if (loc === 'tr' || loc === 'id' || loc === 'ms') {
      finalPolicy = 'Prioritized for Complete Editorial Translation (Class C) -> Then Self-Canonical Indexable';
      reason = 'High organic Umrah search demand from Turkey and Southeast Asia. Currently canonicalized to /en/ to prevent duplicate indexing; convert to self-canonical upon publishing validated local translation.';
    } else {
      finalPolicy = 'Canonical Consolidation to English (Class A Consolidation)';
      reason = 'Identical English fallback text. Google consolidates signals to /en/. Remove noindex to allow clean signal transfer per Google guidance while keeping excluded from sitemaps.';
    }

    rows.push([
      `"${slug}"`,
      `"${loc}"`,
      `"${url}"`,
      `"${mainLang}"`,
      `"${transStatus}"`,
      `"${robots}"`,
      `"${canonical}"`,
      `"${hreflang}"`,
      `"${sitemap}"`,
      `"${gscMismatch}"`,
      `"${gscSelectedCanonical}"`,
      `"${finalPolicy}"`,
      `"${reason}"`
    ].join(','));
  }
}

fs.writeFileSync('docs/seo/guides-url-reconciliation.csv', rows.join('\n'), 'utf8');
console.log('Generated docs/seo/guides-url-reconciliation.csv with', rows.length - 1, 'rows.');
