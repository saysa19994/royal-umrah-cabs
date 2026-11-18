import { execSync } from 'child_process';
import fs from 'fs';

console.log('Fetching CDN request logs from Vercel...');

let logsRaw;
try {
  logsRaw = execSync(
    'npx vercel logs requests --project royal-umrah-cabs --environment production --limit 1000 --since 4h --json',
    { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 }
  );
} catch (e) {
  console.error('Error running vercel logs:', e.message);
  process.exit(1);
}

const lines = logsRaw.split('\n').filter(Boolean);
const requests = [];
for (const line of lines) {
  try {
    const parsed = JSON.parse(line);
    if (parsed.type === 'request' && parsed.data) {
      requests.push(parsed.data);
    }
  } catch {}
}

console.log(`Parsed ${requests.length} request logs from the last 24h.`);

// Breakdown by cacheResult
const cacheResults = {};
const staleOrRevalPaths = {};
const userAgents = {};
const routesBreakdown = {};

for (const req of requests) {
  const cr = req.cacheResult || 'UNKNOWN';
  cacheResults[cr] = (cacheResults[cr] || 0) + 1;

  if (cr === 'STALE' || cr === 'REVALIDATED' || cr === 'MISS') {
    const p = req.requestPath?.split('?')[0] || req.requestPath;
    staleOrRevalPaths[p] = (staleOrRevalPaths[p] || 0) + 1;
    
    // Check route
    const route = req.route || 'unknown';
    routesBreakdown[route] = (routesBreakdown[route] || 0) + 1;
  }

  // Identify crawler / client
  const ua = req.clientUserAgent || 'empty';
  let category = 'Other Browser';
  if (/googlebot/i.test(ua)) category = 'Googlebot';
  else if (/bingbot/i.test(ua)) category = 'Bingbot';
  else if (/yandex/i.test(ua)) category = 'YandexBot';
  else if (/ahrefs/i.test(ua)) category = 'AhrefsBot';
  else if (/semrush/i.test(ua)) category = 'SemrushBot';
  else if (/bot|crawler|spider|curl|wget/i.test(ua)) category = 'Other Bot/Crawler';
  else if (/mobile/i.test(ua)) category = 'Mobile User';
  else category = 'Desktop User';

  userAgents[category] = (userAgents[category] || 0) + 1;
}

console.log('\n--- CACHE RESULTS BREAKDOWN ---');
console.log(cacheResults);

console.log('\n--- TRAFFIC SOURCE (USER-AGENT) ---');
console.log(userAgents);

console.log('\n--- TOP 20 ROUTES WITH STALE/REVALIDATED/MISS ---');
const sortedRoutes = Object.entries(routesBreakdown).sort((a, b) => b[1] - a[1]);
console.log(sortedRoutes.slice(0, 20));

console.log('\n--- TOP 20 EXACT PATHS WITH STALE/REVALIDATED/MISS ---');
const sortedPaths = Object.entries(staleOrRevalPaths).sort((a, b) => b[1] - a[1]);
console.log(sortedPaths.slice(0, 20));
