import fs from 'fs';

// 1. Update comprehensive-guides.ts
let compPath = 'd:/royal-umrah-cabs/src/data/comprehensive-guides.ts';
let comp = fs.readFileSync(compPath, 'utf8');
comp = comp.replace('حتى 18 راكباً مع 18 حقيبة سفر', 'حتى 21 راكباً مع 20 حقيبة سفر كبيرة');
comp = comp.replace('up to 18 with 18 suitcases', 'up to 21 passengers with 20 large suitcases');
fs.writeFileSync(compPath, comp, 'utf8');

// 2. Update transport-planning/ar.ts
let arPath = 'd:/royal-umrah-cabs/src/data/blog-content/transport-planning/ar.ts';
let ar = fs.readFileSync(arPath, 'utf8');
ar = ar.replace('حتى 18 راكباً', 'حتى 21 راكباً مع 20 حقيبة سفر');
fs.writeFileSync(arPath, ar, 'utf8');

// 3. Update transport-planning/en.ts
let enPath = 'd:/royal-umrah-cabs/src/data/blog-content/transport-planning/en.ts';
let en = fs.readFileSync(enPath, 'utf8');
en = en.replace('up to 18 passengers with ample luggage', 'up to 21 passengers with 20 large suitcases');
fs.writeFileSync(enPath, en, 'utf8');

// 4. Update transport-planning/tr.ts
let trPath = 'd:/royal-umrah-cabs/src/data/blog-content/transport-planning/tr.ts';
let tr = fs.readFileSync(trPath, 'utf8');
tr = tr.replace('(18 yolcuya kadar)', '(21 yolcu ve 20 valize kadar)');
fs.writeFileSync(trPath, tr, 'utf8');

console.log('Successfully aligned Toyota Coaster specifications to authoritative 21 passengers / 20 bags across all files.');
