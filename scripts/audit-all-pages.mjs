import fs from 'fs';
import path from 'path';

const appDir = 'D:/royal-umrah-cabs/src/app';

function scanDir(dir, prefix = '') {
  let routes = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.join(prefix, entry.name);
    if (entry.isDirectory()) {
      routes = routes.concat(scanDir(fullPath, relPath));
    } else if (entry.name === 'page.tsx' || entry.name === 'page.jsx' || entry.name === 'page.js') {
      routes.push(prefix.replace(/\\/g, '/'));
    }
  }
  return routes;
}

const allRoutes = scanDir(appDir);
console.log(`Total Pages found in src/app: ${allRoutes.length}`);
console.log(JSON.stringify(allRoutes, null, 2));
