import fs from 'fs';

const content = fs.readFileSync('D:/royal-umrah-cabs/src/data/fleet-showcase-data.ts', 'utf8');
const vRegex = /id:\s*'([^']+)',\s*slug:\s*'([^']+)',\s*bookingVehicleId:\s*'([^']+)'/g;
let m;
while ((m = vRegex.exec(content)) !== null) {
  console.log(`id: ${m[1].padEnd(10)} | slug: ${m[2].padEnd(18)} | bookingId: ${m[3]}`);
}
