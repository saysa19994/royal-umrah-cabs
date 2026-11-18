import fs from 'fs';
import path from 'path';

const content = fs.readFileSync('D:/royal-umrah-cabs/src/data/fleet-showcase-data.ts', 'utf8');
const regex = /src:\s*'([^']+)'/g;
let m;
const missing = [];
const found = [];
while ((m = regex.exec(content)) !== null) {
  const rel = m[1];
  const full = path.join('D:/royal-umrah-cabs/public', rel);
  if (!fs.existsSync(full)) {
    missing.push(rel);
  } else {
    found.push(rel);
  }
}
console.log(`Found: ${found.length} images. Missing: ${missing.length}`);
if (missing.length > 0) {
  console.log('Missing images:', missing);
}
