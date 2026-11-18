import fs from 'fs';

const content = fs.readFileSync('src/data/ziyarat.ts', 'utf8');

// Find exports
const exports = content.match(/export const [A-Za-z0-9_]+/g);
console.log('Exports:', exports);

// Check sites and tours
const siteMatches = content.match(/slug:\s*['"]([^'"]+)['"]/g) || [];
console.log('Slug matches count:', siteMatches.length);
console.log('Sample slugs:', siteMatches.slice(0, 10));
