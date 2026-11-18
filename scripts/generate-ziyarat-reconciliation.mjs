import fs from 'fs';

const ziyaratSites = [
  { city: 'makkah', slug: 'cave-hira', name: 'Cave Hira (Jabal Al-Nour)' },
  { city: 'makkah', slug: 'jabal-thawr', name: 'Jabal Thawr' },
  { city: 'makkah', slug: 'mina', name: 'Mina Valley' },
  { city: 'makkah', slug: 'arafat', name: 'Mount Arafat (Jabal Al-Rahmah)' },
  { city: 'madinah', slug: 'masjid-quba', name: 'Quba Mosque' },
  { city: 'madinah', slug: 'mount-uhud', name: 'Mount Uhud & Martyrs Cemetery' },
  { city: 'madinah', slug: 'masjid-qiblatayn', name: 'Masjid Al-Qiblatayn' },
  { city: 'madinah', slug: 'seven-mosques', name: 'The Seven Mosques (Battle of Trench)' },
];

const ziyaratTours = [
  { slug: 'makkah-half-day', name: 'Makkah Half-Day Holy Sites Tour' },
  { slug: 'madinah-half-day', name: 'Madinah Half-Day Ziyarat Tour' },
  { slug: 'badr-historical', name: 'Badr Historical Battlefield Tour' },
  { slug: 'custom-hourly', name: 'Custom Hourly VIP Chauffeur Tour' },
];

const locales = ['ar', 'en', 'tr', 'ms', 'id', 'ur', 'fr', 'es', 'de', 'hi'];

// Locales sampled in the 150 GSC canonical mismatch report
const gscSitesSampleLocales = ['tr', 'id', 'ms']; // 14 sites sampled x 3 locales = 42 in GSC report
const gscToursSampleLocales = ['tr', 'id']; // 4 tours x 2 locales = 8 in GSC report (42 + 8 = 50 URLs)

const rows = [];
const header = [
  'Entity Type',
  'City / Category',
  'Slug',
  'Locale',
  'URL',
  'Main-Content Language',
  'Translation Status',
  'Canonical URL',
  'Robots Directive',
  'Hreflang Status',
  'Sitemap Membership',
  'GSC Mismatch Membership (50 URL Sample)',
  'Final Indexing Policy',
  'Strategic Rationale / Reconciliation Note'
];

rows.push(header.map(h => `"${h}"`).join(','));

// 1. Ziyarat Sites: 8 sites x 10 locales = 80 URLs
for (const site of ziyaratSites) {
  for (const loc of locales) {
    const isAr = loc === 'ar';
    const isEn = loc === 'en';
    const isFullyTranslated = isAr || isEn;
    const url = `https://duyufalrahmanvip.com/${loc}/ziyarat/${site.city}/${site.slug}`;
    const canonical = isFullyTranslated ? url : `https://duyufalrahmanvip.com/en/ziyarat/${site.city}/${site.slug}`;
    const mainLang = isAr ? 'Arabic' : (isEn ? 'English' : 'English (Fallback text)');
    const transStatus = isFullyTranslated ? 'Fully Localized (Native Bilingual AR/EN)' : 'English Fallback Body';
    const robots = 'index, follow';
    const hreflang = isFullyTranslated ? 'Reciprocal AR/EN Cluster' : 'Excluded from localized cluster';
    const sitemap = isFullyTranslated ? 'Included in /sitemap/[locale].xml' : 'Excluded from child sitemap';
    
    const inGscSample = gscSitesSampleLocales.includes(loc);
    const gscStatus = inGscSample
      ? 'Part of the 50 GSC Ziyarat Mismatches (Site Subset of 42)'
      : (isFullyTranslated ? 'Not in Mismatch Report (Recognized Canonical)' : 'Not in 50-URL Sample (Other 5 Fallback Locales)');

    let policy = '';
    let rationale = '';

    if (isFullyTranslated) {
      policy = 'Self-Canonical Indexable (Class A Primary)';
      rationale = 'Authoritative landmark detail with verified religious and logistical information. Fully eligible for search indexing.';
    } else if (loc === 'tr' || loc === 'id' || loc === 'ms') {
      policy = 'Prioritized for Native Ziyarat Translation (Class C) -> Then Self-Canonical Indexable';
      rationale = 'High Ziyarat tour booking volume from Turkish and Indonesian pilgrims. Currently canonicalized to /en/ to prevent duplicate index bloat.';
    } else {
      policy = 'Canonical Consolidation to English (Class A Consolidation)';
      rationale = 'English fallback text. Consolidate link equity to /en/ without sitemap inclusion.';
    }

    rows.push([
      `"Landmark Site"`,
      `"${site.city}"`,
      `"${site.slug}"`,
      `"${loc}"`,
      `"${url}"`,
      `"${mainLang}"`,
      `"${transStatus}"`,
      `"${canonical}"`,
      `"${robots}"`,
      `"${hreflang}"`,
      `"${sitemap}"`,
      `"${gscStatus}"`,
      `"${policy}"`,
      `"${rationale}"`
    ].join(','));
  }
}

// 2. Ziyarat Tours: 4 tours x 10 locales = 40 URLs
for (const tour of ziyaratTours) {
  for (const loc of locales) {
    const isAr = loc === 'ar';
    const isEn = loc === 'en';
    const isFullyTranslated = isAr || isEn;
    const url = `https://duyufalrahmanvip.com/${loc}/ziyarat/tours/${tour.slug}`;
    const canonical = isFullyTranslated ? url : `https://duyufalrahmanvip.com/en/ziyarat/tours/${tour.slug}`;
    const mainLang = isAr ? 'Arabic' : (isEn ? 'English' : 'English (Fallback text)');
    const transStatus = isFullyTranslated ? 'Fully Localized (Native Bilingual AR/EN)' : 'English Fallback Body';
    const robots = 'index, follow';
    const hreflang = isFullyTranslated ? 'Reciprocal AR/EN Cluster' : 'Excluded from localized cluster';
    const sitemap = isFullyTranslated ? 'Included in /sitemap/[locale].xml' : 'Excluded from child sitemap';
    
    const inGscSample = gscToursSampleLocales.includes(loc);
    const gscStatus = inGscSample
      ? 'Part of the 50 GSC Ziyarat Mismatches (Tour Subset of 8)'
      : (isFullyTranslated ? 'Not in Mismatch Report (Recognized Canonical)' : 'Not in 50-URL Sample (Other 6 Fallback Locales)');

    let policy = '';
    let rationale = '';

    if (isFullyTranslated) {
      policy = 'Self-Canonical Indexable (Class A Primary)';
      rationale = 'Commercial VIP Ziyarat package. Fully localized with fixed hourly/day rates and chauffeur service details.';
    } else if (loc === 'tr' || loc === 'id' || loc === 'ms') {
      policy = 'Prioritized for Native Tour Translation (Class C) -> Then Self-Canonical Indexable';
      rationale = 'Top booked commercial package. Translate itinerary and vehicle options to capture non-English pilgrim queries.';
    } else {
      policy = 'Canonical Consolidation to English (Class A Consolidation)';
      rationale = 'English fallback text. Consolidate link equity to /en/ without sitemap inclusion.';
    }

    rows.push([
      `"Curated Tour"`,
      `"tours"`,
      `"${tour.slug}"`,
      `"${loc}"`,
      `"${url}"`,
      `"${mainLang}"`,
      `"${transStatus}"`,
      `"${canonical}"`,
      `"${robots}"`,
      `"${hreflang}"`,
      `"${sitemap}"`,
      `"${gscStatus}"`,
      `"${policy}"`,
      `"${rationale}"`
    ].join(','));
  }
}

fs.writeFileSync('docs/seo/ziyarat-url-reconciliation.csv', rows.join('\n'), 'utf8');
console.log('Generated docs/seo/ziyarat-url-reconciliation.csv with', rows.length - 1, 'rows.');
