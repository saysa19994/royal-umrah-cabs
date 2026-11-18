import fs from 'fs';

const content = fs.readFileSync('D:/royal-umrah-cabs/src/data/routes-data.ts', 'utf8');
const idMatches = content.match(/id:\s*['"]([^'"]+)['"]/g) || [];
const uniqueIds = [...new Set(idMatches.map(m => m.replace(/id:\s*['"]/, '').replace(/['"]$/, '')))];

console.log(`Routes found in routes-data.ts: ${uniqueIds.length}`);
console.log(uniqueIds);
