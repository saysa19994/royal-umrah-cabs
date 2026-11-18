import fs from 'fs';

const content = fs.readFileSync('D:/royal-umrah-cabs/src/data/fleet-showcase-data.ts', 'utf8');
const vRegex = /id:\s*'([^']+)',\s*slug:\s*'([^']+)'/g;
let v;
const counts = {};
const sections = content.split('// ');
sections.forEach(sec => {
  const m = sec.match(/id:\s*'([^']+)'/);
  if (m) {
    const id = m[1];
    const gCount = (sec.match(/src:\s*'[^']+'/g) || []).length;
    counts[id] = gCount;
  }
});
console.log('Gallery counts per vehicle in fleet-showcase-data.ts:', counts);
