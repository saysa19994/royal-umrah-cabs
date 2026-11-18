import fs from 'fs';

const content = fs.readFileSync('src/data/comprehensive-guides.ts', 'utf8');

const match = content.match(/slug:\s*'makkah-to-madinah-taxi-vs-haramain-train'[\s\S]*?(?=slug:|$)/);
if (match) {
  console.log(match[0].slice(0, 1500));
}
