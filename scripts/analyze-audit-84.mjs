import fs from 'fs';

const content = fs.readFileSync('docs/seo/canonical-robots-audit-84.csv', 'utf8');
const lines = content.split('\n').map(l => l.trim()).filter(Boolean).slice(1);

const byLocale = {};
let classA = 0;
let classC = 0;
let other = 0;

for (const line of lines) {
  // CSV parse simple
  const match = line.match(/^"([^"]+)","([^"]+)","([^"]+)"/);
  if (match) {
    const loc = match[2];
    byLocale[loc] = (byLocale[loc] || 0) + 1;
  }
  if (line.includes('Class A')) classA++;
  else if (line.includes('Class C')) classC++;
  else other++;
}

console.log('Total lines:', lines.length);
console.log('By locale:', byLocale);
console.log('Class A count:', classA);
console.log('Class C count:', classC);
console.log('Other count:', other);
