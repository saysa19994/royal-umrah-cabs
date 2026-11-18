import fs from 'fs';

const content = fs.readFileSync('D:/royal-umrah-cabs/src/lib/pricing-constants.ts', 'utf8');
console.log('--- Checking pricing-constants.ts vehicle keys ---');
const lines = content.split('\n');
for (let i = 0; i < 40; i++) {
  console.log(lines[i]);
}
