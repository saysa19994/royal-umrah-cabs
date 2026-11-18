import fs from 'fs';

const filePath = 'd:/royal-umrah-cabs/src/app/[locale]/fleet/[slug]/page.tsx';
let s = fs.readFileSync(filePath, 'utf8');

// 1. Update generateStaticParams
s = s.replace(
  /export function generateStaticParams\(\)[\s\S]*?return allSlugs\.map\(\(slug\) => \(\{ slug \}\)\);\r?\n\}/,
  `// Canonical official vehicle slugs (strictly excludes duplicate aliases from pre-rendering)
const OFFICIAL_FLEET_SLUGS = [
  'toyota-camry',
  'gmc-yukon-xl',
  'hyundai-staria',
  'toyota-hiace',
  'toyota-coaster',
];

export function generateStaticParams() {
  return OFFICIAL_FLEET_SLUGS.map((slug) => ({ slug }));
}`
);

// 2. Update canonical alternates in generateMetadata
s = s.replace(
  /alternates:\s*getLocalizedAlternates\(locale,\s*`\/fleet\/\$\{slug\}`\)/,
  'alternates: getLocalizedAlternates(locale, `/fleet/${resolvedSlug}`)'
);

// 3. Add 301 redirect for alias slugs in FleetDetailPage
s = s.replace(
  /const resolvedSlug = SLUG_ALIASES\[slug\];\r?\n\s*if \(!resolvedSlug\) \{\r?\n\s*notFound\(\);\r?\n\s*\}/,
  `const resolvedSlug = SLUG_ALIASES[slug];
  if (!resolvedSlug) {
    notFound();
  }

  // 301 Permanent Redirect legacy short slugs to official canonical URLs
  if (slug !== resolvedSlug) {
    redirect(\`/\${locale}/fleet/\${resolvedSlug}\`);
  }`
);

fs.writeFileSync(filePath, s, 'utf8');
console.log('Successfully updated fleet/[slug]/page.tsx with redirect and canonical normalization');
