import fs from 'fs';

const content = fs.readFileSync('D:/royal-umrah-cabs/src/data/fleet-showcase-data.ts', 'utf8');

const idMatches = [...content.matchAll(/id:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
const slugMatches = [...content.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
const bookingIdMatches = [...content.matchAll(/bookingVehicleId:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);

console.log('Found IDs:', idMatches);
console.log('Found Slugs:', slugMatches);
console.log('Found Booking IDs:', bookingIdMatches);
