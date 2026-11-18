import fs from 'fs';

const content = fs.readFileSync('d:/royal-umrah-cabs/src/data/comprehensive-guides.ts', 'utf8');

const guideBlocks = content.split('slug: \'').slice(1);
const classifications = [];

for (const b of guideBlocks) {
  const slug = b.split('\'')[0];
  const item = {
    slug,
    ar: 'A (Fully translated)',
    en: 'A (Fully translated)',
    tr: 'C (English fallback)',
    ms: 'C (English fallback)',
    id: 'C (English fallback)',
    ur: 'C (English fallback)',
    fr: 'C (English fallback)',
    de: 'C (English fallback)',
    es: 'C (English fallback)',
    hi: 'C (English fallback)',
  };

  if (b.includes('tr:')) item.tr = 'B (Partially translated)';
  if (b.includes('ms:')) item.ms = 'B (Partially translated)';
  if (b.includes('id:')) item.id = 'B (Partially translated)';
  if (b.includes('ur:')) item.ur = 'B (Partially translated)';
  if (b.includes('fr:')) item.fr = 'B (Partially translated)';
  if (b.includes('de:')) item.de = 'B (Partially translated)';
  if (b.includes('es:')) item.es = 'B (Partially translated)';
  if (b.includes('hi:')) item.hi = 'B (Partially translated)';

  classifications.push(item);
}

fs.writeFileSync('d:/royal-umrah-cabs/docs/guides-classification.json', JSON.stringify(classifications, null, 2), 'utf8');
console.log('Classified', classifications.length, 'guides');
console.log(JSON.stringify(classifications.slice(0, 3), null, 2));
