import fs from 'fs';

// 1. Update config.ts
const configPath = 'D:/royal-umrah-cabs/src/i18n/config.ts';
let configCode = fs.readFileSync(configPath, 'utf8');
if (!configCode.includes('faq:')) {
  configCode = configCode.replace(
    "  partners: {",
    "  faq: { en: 'faq', ar: 'faq', ms: 'faq', id: 'faq', fr: 'faq', es: 'faq', de: 'faq', ur: 'faq', hi: 'faq', tr: 'faq' },\n  partners: {"
  );
  fs.writeFileSync(configPath, configCode, 'utf8');
  console.log('Updated config.ts with PAGE_SLUGS.faq');
}

// 2. Update sitemap.ts
const sitemapPath = 'D:/royal-umrah-cabs/src/app/sitemap.ts';
let sitemapCode = fs.readFileSync(sitemapPath, 'utf8');
if (!sitemapCode.includes("'/faq'")) {
  sitemapCode = sitemapCode.replace(
    "    '/booking',",
    "    '/faq',\n    '/booking',"
  );
  fs.writeFileSync(sitemapPath, sitemapCode, 'utf8');
  console.log('Updated sitemap.ts with /faq');
}

// 3. Update Footer.tsx
const footerPath = 'D:/royal-umrah-cabs/src/components/layout/Footer.tsx';
let footerCode = fs.readFileSync(footerPath, 'utf8');
footerCode = footerCode.replace(
  "href={`/${locale}#faq`}",
  "href={`/${locale}/faq`}"
);
footerCode = footerCode.replace(
  "{locale === 'ar' ? 'الأسئلة الشائعة' : 'FAQs'}",
  "{dict.faq?.heading || (locale === 'ar' ? 'الأسئلة الشائعة' : 'FAQs')}"
);
fs.writeFileSync(footerPath, footerCode, 'utf8');
console.log('Updated Footer.tsx to link to /{locale}/faq with localized heading');
