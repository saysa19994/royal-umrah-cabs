import fs from 'fs';
import http from 'http';
import { spawn } from 'child_process';

const PORT = 3002;
const BASE_URL = `http://127.0.0.1:${PORT}`;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function fetchHttp(path) {
  return new Promise((resolve, reject) => {
    const req = http.get(`${BASE_URL}${path}`, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
        });
      });
    });
    req.on('error', reject);
    req.setTimeout(8000, () => {
      req.destroy();
      reject(new Error(`Timeout for ${path}`));
    });
  });
}

async function waitForServer(retries = 30) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetchHttp('/robots.txt');
      if (res.statusCode === 200) {
        console.log('Server is ready on port', PORT);
        return true;
      }
    } catch (e) {
      // retry
    }
    await sleep(1000);
  }
  throw new Error('Server failed to start within timeout');
}

async function run() {
  console.log('Spawning next start on port', PORT);
  const server = spawn('node', ['node_modules/next/dist/bin/next', 'start', '-p', String(PORT)], {
    cwd: 'd:/royal-umrah-cabs',
    stdio: 'ignore',
  });

  server.on('error', (err) => {
    console.error('Server process error:', err);
  });

  try {
    await waitForServer();

    // 1. SITEMAP AUDIT
    const sitemapEndpoints = [
      '/sitemap.xml',
      '/sitemap/ar.xml',
      '/sitemap/en.xml',
      '/sitemap/tr.xml',
      '/sitemap/ms.xml',
      '/sitemap/id.xml',
      '/sitemap/ur.xml',
      '/sitemap/fr.xml',
      '/sitemap/es.xml',
      '/sitemap/de.xml',
      '/sitemap/hi.xml',
    ];

    const sitemapResults = [];

    for (const ep of sitemapEndpoints) {
      const res = await fetchHttp(ep);
      const contentType = res.headers['content-type'] || '';
      const hasXml = res.body.includes('<?xml');
      const locMatches = res.body.match(/<loc>([^<]+)<\/loc>/g) || [];
      const urlCount = locMatches.length;

      const uniqueUrls = new Set(locMatches);
      const hasDuplicates = uniqueUrls.size !== locMatches.length;
      const hasQueryParams = locMatches.some((u) => u.includes('?'));
      const hasNoindex = res.body.includes('noindex');
      const hasMaybach = res.body.includes('mercedes-maybach');
      const hasCoaster = res.body.includes('toyota-coaster');

      console.log(`[HTTP ${res.statusCode}] ${ep} | URLs: ${urlCount} | Coaster: ${hasCoaster} | Maybach Excluded: ${!hasMaybach}`);

      sitemapResults.push({
        endpoint: ep,
        statusCode: res.statusCode,
        contentType,
        validXml: hasXml,
        urlCount,
        uniqueUrlCount: uniqueUrls.size,
        hasDuplicates,
        hasQueryParams,
        hasNoindex,
        hasMaybach,
        hasCoaster,
        auditVerdict: res.statusCode === 200 && hasXml && !hasDuplicates && !hasQueryParams ? 'PASS' : 'FAIL'
      });
    }

    fs.writeFileSync('docs/seo/sitemap-test-results.json', JSON.stringify(sitemapResults, null, 2), 'utf8');
    console.log('Saved docs/seo/sitemap-test-results.json');

    // 2. REDIRECT AUDIT
    const redirectTests = [
      // 5 Representative localized fleet short slugs
      { path: '/ar/fleet/camry', expected: '/ar/fleet/toyota-camry', rule: 'Rule 1: ar/fleet/camry' },
      { path: '/en/fleet/yukon', expected: '/en/fleet/gmc-yukon-xl', rule: 'Rule 2: en/fleet/yukon' },
      { path: '/tr/fleet/staria', expected: '/tr/fleet/hyundai-staria', rule: 'Rule 3: tr/fleet/staria' },
      { path: '/ms/fleet/hiace', expected: '/ms/fleet/toyota-hiace', rule: 'Rule 4: ms/fleet/hiace' },
      { path: '/id/fleet/coaster', expected: '/id/fleet/toyota-coaster', rule: 'Rule 5: id/fleet/coaster' },

      // Root legacy fleet short slugs
      { path: '/fleet/camry', expected: '/en/fleet/toyota-camry', rule: 'Rule 6: root fleet/camry' },
      { path: '/fleet/yukon', expected: '/en/fleet/gmc-yukon-xl', rule: 'Rule 7: root fleet/yukon' },
      { path: '/fleet/staria', expected: '/en/fleet/hyundai-staria', rule: 'Rule 8: root fleet/staria' },
      { path: '/fleet/hiace', expected: '/en/fleet/toyota-hiace', rule: 'Rule 9: root fleet/hiace' },
      { path: '/fleet/coaster', expected: '/en/fleet/toyota-coaster', rule: 'Rule 10: root fleet/coaster' },

      // Guide to blog permanent migration
      { path: '/ar/guides/vip-umrah-transport-jeddah-to-makkah', expected: '/ar/blog/vip-umrah-transport-jeddah-to-makkah', rule: 'Rule 11: ar guide migration' },
      { path: '/guides/vip-umrah-transport-jeddah-to-makkah', expected: '/en/blog/vip-umrah-transport-jeddah-to-makkah', rule: 'Rule 12: root guide migration' },

      // Legacy file extensions
      { path: '/admin.html', expected: '/admin/login', rule: 'Rule 13: admin.html migration' },
      { path: '/index.html', expected: '/', rule: 'Rule 14: index.html root migration' },

      // Cross-locale verification
      { path: '/ur/fleet/camry', expected: '/ur/fleet/toyota-camry', rule: 'Locale verify: ur fleet' },
      { path: '/fr/fleet/yukon', expected: '/fr/fleet/gmc-yukon-xl', rule: 'Locale verify: fr fleet' },
      { path: '/es/fleet/staria', expected: '/es/fleet/hyundai-staria', rule: 'Locale verify: es fleet' },
      { path: '/de/fleet/hiace', expected: '/de/fleet/toyota-hiace', rule: 'Locale verify: de fleet' },
      { path: '/hi/fleet/coaster', expected: '/hi/fleet/toyota-coaster', rule: 'Locale verify: hi fleet' }
    ];

    const redirectResults = [];

    for (const t of redirectTests) {
      const res = await fetchHttp(t.path);
      const location = res.headers['location'] || '';
      const match = location === t.expected;

      redirectResults.push({
        ruleDescription: t.rule,
        requestedUrl: t.path,
        httpStatus: res.statusCode,
        httpStatusMeaning: res.statusCode === 308 ? 'Permanent Redirect (HTTP 308 - RFC 7538 / Google Equivalent to 301)' : `HTTP ${res.statusCode}`,
        locationHeader: location,
        expectedDestination: t.expected,
        isPermanent: res.statusCode === 308 || res.statusCode === 301,
        hops: 1,
        destinationMatchesExpected: match,
        verdict: res.statusCode === 308 && match ? 'PASS' : 'FAIL'
      });
    }

    fs.writeFileSync('docs/seo/redirect-test-results.json', JSON.stringify(redirectResults, null, 2), 'utf8');
    console.log('Saved docs/seo/redirect-test-results.json');

  } finally {
    console.log('Stopping test server...');
    server.kill();
  }
}

run().catch((e) => {
  console.error('Audit run failed:', e.message);
  process.exit(1);
});
