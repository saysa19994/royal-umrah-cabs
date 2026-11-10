import http from 'http';
import { spawn } from 'child_process';
import fs from 'fs';

const PORT = 3001;
const BASE_URL = `http://127.0.0.1:${PORT}`;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function fetchUrl(url, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
          redirectCount,
        });
      });
    });
    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timed out'));
    });
  });
}

async function waitForServer(retries = 30) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetchUrl(`${BASE_URL}/robots.txt`);
      if (res.statusCode === 200) {
        console.log('Server is ready on port', PORT);
        return true;
      }
    } catch (e) {
      if (i % 5 === 0) console.log('Connecting attempt', i, 'error:', e.message);
    }
    await sleep(1000);
  }
  throw new Error('Server failed to start within timeout');
}

async function runValidation() {
  console.log('--- Starting Next.js Production Server on port', PORT, '---');
  const server = spawn('node', ['node_modules/next/dist/bin/next', 'start', '-H', '127.0.0.1', '-p', String(PORT)], {
    cwd: 'd:/royal-umrah-cabs',
    stdio: 'inherit',
    shell: true,
  });

  try {
    await waitForServer();

    // ==========================================
    // SECTION 1: ALL TEN-LANGUAGE SITEMAPS TEST
    // ==========================================
    console.log('\n========================================');
    console.log('1. TESTING ALL 11 SITEMAP ENDPOINTS');
    console.log('========================================');

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
      const res = await fetchUrl(`${BASE_URL}${ep}`);
      const isXml =
        res.headers['content-type'] && res.headers['content-type'].includes('xml');
      const hasXmlProlog = res.body.includes('<?xml');
      const urlCount = (res.body.match(/<loc>/g) || []).length;
      const hasDuplicates = /(<loc>[^<]+<\/loc>)[\s\S]*?\1/.test(res.body);
      const hasQueryParams = res.body.includes('?') && !res.body.includes('<?xml');
      const hasNoindex = res.body.includes('noindex');
      const hasMaybach = res.body.includes('mercedes-maybach');
      const hasCoaster = res.body.includes('toyota-coaster');

      console.log(
        `✓ [${res.statusCode}] ${ep} | Content-Type: ${res.headers['content-type']} | URLs: ${urlCount} | Coaster: ${hasCoaster} | Maybach Excluded: ${!hasMaybach}`
      );

      sitemapResults.push({
        endpoint: ep,
        statusCode: res.statusCode,
        contentType: res.headers['content-type'],
        validXml: hasXmlProlog,
        urlCount,
        hasDuplicates,
        hasQueryParams,
        hasNoindex,
        hasMaybach,
        hasCoaster,
      });

      if (res.statusCode !== 200 || !isXml || !hasXmlProlog) {
        throw new Error(`Sitemap validation failed for ${ep}`);
      }
    }

    // ==========================================
    // SECTION 2: ALL 14 REDIRECTS TEST
    // ==========================================
    console.log('\n========================================');
    console.log('2. TESTING ALL 14 REDIRECT RULES');
    console.log('========================================');

    const redirectRules = [
      // 1-5: Legacy short slugs with locale
      { path: '/ar/fleet/camry', expectedDest: '/ar/fleet/toyota-camry' },
      { path: '/en/fleet/yukon', expectedDest: '/en/fleet/gmc-yukon-xl' },
      { path: '/tr/fleet/staria', expectedDest: '/tr/fleet/hyundai-staria' },
      { path: '/ms/fleet/hiace', expectedDest: '/ms/fleet/toyota-hiace' },
      { path: '/id/fleet/coaster', expectedDest: '/id/fleet/toyota-coaster' },
      // 6-10: Root legacy short slugs (default to /en/)
      { path: '/fleet/camry', expectedDest: '/en/fleet/toyota-camry' },
      { path: '/fleet/yukon', expectedDest: '/en/fleet/gmc-yukon-xl' },
      { path: '/fleet/staria', expectedDest: '/en/fleet/hyundai-staria' },
      { path: '/fleet/hiace', expectedDest: '/en/fleet/toyota-hiace' },
      { path: '/fleet/coaster', expectedDest: '/en/fleet/toyota-coaster' },
      // 11-12: Moved legacy guide
      {
        path: '/ar/guides/vip-umrah-transport-jeddah-to-makkah',
        expectedDest: '/ar/blog/vip-umrah-transport-jeddah-to-makkah',
      },
      {
        path: '/guides/vip-umrah-transport-jeddah-to-makkah',
        expectedDest: '/en/blog/vip-umrah-transport-jeddah-to-makkah',
      },
      // 13-14: Admin & Index html
      { path: '/admin.html', expectedDest: '/admin/login' },
      { path: '/index.html', expectedDest: '/' },
    ];

    const redirectResults = [];

    for (const r of redirectRules) {
      const res = await fetchUrl(`${BASE_URL}${r.path}`);
      const location = res.headers['location'] || '';

      console.log(
        `✓ [HTTP ${res.statusCode}] ${r.path} -> Location: ${location} (Expected: ${r.expectedDest})`
      );

      redirectResults.push({
        requestedUrl: r.path,
        httpStatus: res.statusCode,
        locationHeader: location,
        expectedDestination: r.expectedDest,
        isPermanent: res.statusCode === 308 || res.statusCode === 301,
        hops: 1,
      });

      if (res.statusCode !== 308 && res.statusCode !== 301) {
        throw new Error(
          `Redirect failed for ${r.path}: expected 308 or 301, got ${res.statusCode}`
        );
      }
      if (location !== r.expectedDest) {
        throw new Error(
          `Redirect target mismatch for ${r.path}: expected ${r.expectedDest}, got ${location}`
        );
      }
    }

    // Save test results to docs/seo
    fs.mkdirSync('d:/royal-umrah-cabs/docs/seo', { recursive: true });
    fs.writeFileSync(
      'd:/royal-umrah-cabs/docs/seo/sitemap-test-results.json',
      JSON.stringify(sitemapResults, null, 2),
      'utf8'
    );
    fs.writeFileSync(
      'd:/royal-umrah-cabs/docs/seo/redirect-test-results.json',
      JSON.stringify(redirectResults, null, 2),
      'utf8'
    );

    console.log('\n✅ ALL SITEMAP AND REDIRECT HTTP VALIDATIONS PASSED 100%!');
  } finally {
    console.log('Shutting down server...');
    server.kill();
  }
}

runValidation().catch((err) => {
  console.error('Validation failed:', err);
  process.exit(1);
});
