import fs from 'fs';
import path from 'path';

const localeDir = 'D:/royal-umrah-cabs/src/app/[locale]';

const pages = [];

function scanLocalePages(dir, relativePath = '') {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const full = path.join(dir, item.name);
    const rel = relativePath ? `${relativePath}/${item.name}` : item.name;
    if (item.isDirectory()) {
      scanLocalePages(full, rel);
    } else if (item.name === 'page.tsx') {
      pages.push({ path: rel, fullPath: full });
    }
  }
}

scanLocalePages(localeDir);

const report = pages.map(p => {
  const content = fs.readFileSync(p.fullPath, 'utf8');
  const hasDarkBg = content.includes('bg-[#060A12]') || content.includes('bg-[#0A0F1D]') || content.includes('bg-navy') || content.includes('bg-black') || content.includes('bg-gray-900') || content.includes('bg-slate-900');
  const hasLightBg = content.includes('bg-[#FDFBF7]') || content.includes('bg-[#F7F5F0]') || content.includes('bg-white') || content.includes('bg-[#FAF7F2]');
  const hasRoyalNavy = content.includes('#101827') || content.includes('#111C30');
  const usesDict = content.includes('getDictionary') || content.includes('dict.');
  const usesHardcodedArabic = /[\u0600-\u06FF]/.test(content);
  const usesPricing = content.includes('pricing') || content.includes('Pricing') || content.includes('rates') || content.includes('formatPrice');

  return {
    page: p.path,
    hasDarkBg,
    hasLightBg,
    hasRoyalNavy,
    usesDict,
    usesHardcodedArabic,
    usesPricing,
    lines: content.split('\n').length
  };
});

console.log(JSON.stringify(report, null, 2));
