import fs from 'fs';
import path from 'path';

// Read routes-data.ts
const routesDataFile = fs.readFileSync('src/data/routes-data.ts', 'utf8');
const routeMatches = [...routesDataFile.matchAll(/^\s*['"]([a-z0-9\-]+)['"]:\s*\{/gm)].map(m => m[1]);

// Read fleet-showcase-data.ts
const fleetDataFile = fs.readFileSync('src/data/fleet-showcase-data.ts', 'utf8');
const vehicleMatches = [...fleetDataFile.matchAll(/slug:\s*['"]([a-z0-9\-]+)['"]/g)].map(m => m[1]);

console.log('--- AUDIT RESULTS ---');
console.log('Routes in routes-data.ts:', [...new Set(routeMatches)]);
console.log('Vehicles in fleet-showcase-data.ts:', [...new Set(vehicleMatches)]);

// Check blog articles
if (fs.existsSync('src/data/blog-articles.ts')) {
  const blogDataFile = fs.readFileSync('src/data/blog-articles.ts', 'utf8');
  const blogMatches = [...blogDataFile.matchAll(/slug:\s*['"]([a-z0-9\-]+)['"]/g)].map(m => m[1]);
  console.log('Blog articles:', [...new Set(blogMatches)]);
}

// Check ziyarat data
const ziyaratFiles = fs.readdirSync('src/data').filter(f => f.includes('ziyarat'));
console.log('Ziyarat data files:', ziyaratFiles);
