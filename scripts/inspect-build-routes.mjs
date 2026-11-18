import fs from 'fs';

const prerender = JSON.parse(fs.readFileSync('.next/prerender-manifest.json', 'utf8'));
const routesManifest = JSON.parse(fs.readFileSync('.next/routes-manifest.json', 'utf8'));

console.log('Prerender routes count:', Object.keys(prerender.routes).length);
console.log('Dynamic routes count in prerender:', Object.keys(prerender.dynamicRoutes).length);
console.log('Static routes count in routes-manifest:', (routesManifest.staticRoutes || []).length);
console.log('Dynamic routes count in routes-manifest:', (routesManifest.dynamicRoutes || []).length);

const routeList = Object.keys(prerender.routes);
console.log('Total SSG prerendered routes:', routeList.length);

// Categorize
const categories = {};
for (const r of routeList) {
  const parts = r.split('/').filter(Boolean);
  const loc = parts[0];
  const section = parts[1] || 'home';
  categories[section] = (categories[section] || 0) + 1;
}
console.log('Prerendered routes by section:', categories);
