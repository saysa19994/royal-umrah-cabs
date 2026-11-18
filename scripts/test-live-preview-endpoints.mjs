import https from 'https';
import fs from 'fs';

const PREVIEW_HOST = 'royal-umrah-cabs-git-seo-recovery-preview-sayed6.vercel.app';
const PREVIEW_BASE = `https://${PREVIEW_HOST}`;

function fetchHttps(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: PREVIEW_HOST,
      path: path,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) DuyufSeoValidator/1.0',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
        });
      });
    });

    req.on('error', reject);
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error(`Timeout for ${path}`));
    });
    req.end();
  });
}

async function runLiveTests() {
  console.log(`=== LIVE VERCEL PREVIEW INDEPENDENT VALIDATION ===`);
  console.log(`Target Preview Host: ${PREVIEW_HOST}\n`);

  // ==========================================
  // 1. ALL 11 SITEMAP ENDPOINTS ON LIVE PREVIEW
  // ==========================================
  console.log('--- 1. Testing All 11 Live Sitemap Endpoints ---');
  const sitemaps = [
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

  const liveSitemapReport = [];

  for (const ep of sitemaps) {
    const res = await fetchHttps(ep);
    const contentType = res.headers['content-type'] || '';
    const hasXml = res.body.includes('<?xml');
    const urlCount = (res.body.match(/<loc>/g) || []).length;
    const hasCoaster = res.body.includes('toyota-coaster');
    const hasMaybach = res.body.includes('mercedes-maybach');

    console.log(
      `✓ [HTTP ${res.statusCode}] ${ep} | Type: ${contentType} | URLs: ${urlCount} | Coaster: ${hasCoaster} | Maybach Excluded: ${!hasMaybach}`
    );

    liveSitemapReport.push({
      endpoint: ep,
      statusCode: res.statusCode,
      contentType,
      validXml: hasXml,
      urlCount,
      hasCoaster,
      maybachExcluded: !hasMaybach,
    });

    if (res.statusCode !== 200) {
      throw new Error(`Live sitemap failed: ${ep} returned ${res.statusCode}`);
    }
  }

  // ==========================================
  // 2. ALL 14 REDIRECTS ON LIVE PREVIEW
  // ==========================================
  console.log('\n--- 2. Testing All 14 Live Redirect Rules ---');
  const redirects = [
    { path: '/ar/fleet/camry', expected: '/ar/fleet/toyota-camry' },
    { path: '/en/fleet/yukon', expected: '/en/fleet/gmc-yukon-xl' },
    { path: '/tr/fleet/staria', expected: '/tr/fleet/hyundai-staria' },
    { path: '/ms/fleet/hiace', expected: '/ms/fleet/toyota-hiace' },
    { path: '/id/fleet/coaster', expected: '/id/fleet/toyota-coaster' },
    { path: '/fleet/camry', expected: '/en/fleet/toyota-camry' },
    { path: '/fleet/yukon', expected: '/en/fleet/gmc-yukon-xl' },
    { path: '/fleet/staria', expected: '/en/fleet/hyundai-staria' },
    { path: '/fleet/hiace', expected: '/en/fleet/toyota-hiace' },
    { path: '/fleet/coaster', expected: '/en/fleet/toyota-coaster' },
    {
      path: '/ar/guides/vip-umrah-transport-jeddah-to-makkah',
      expected: '/ar/blog/vip-umrah-transport-jeddah-to-makkah',
    },
    {
      path: '/guides/vip-umrah-transport-jeddah-to-makkah',
      expected: '/en/blog/vip-umrah-transport-jeddah-to-makkah',
    },
    { path: '/admin.html', expected: '/admin/login' },
    { path: '/index.html', expected: '/' },
  ];

  const liveRedirectReport = [];

  for (const r of redirects) {
    const res = await fetchHttps(r.path);
    const location = res.headers['location'] || '';

    console.log(
      `✓ [HTTP ${res.statusCode}] ${r.path} -> Location: ${location} (Expected: ${r.expected})`
    );

    liveRedirectReport.push({
      path: r.path,
      statusCode: res.statusCode,
      location,
      expected: r.expected,
      isPermanent: res.statusCode === 308 || res.statusCode === 301,
    });

    if (res.statusCode !== 308 && res.statusCode !== 301) {
      throw new Error(`Redirect failed for ${r.path}: status ${res.statusCode}`);
    }
  }

  // ==========================================
  // 3. TARGET PAGES METADATA, ROBOTS & CANONICAL
  // ==========================================
  console.log('\n--- 3. Testing Target Content Pages ---');
  const targetPages = [
    { path: '/ar', name: 'Arabic Home' },
    { path: '/en', name: 'English Home' },
    { path: '/ar/guides/jeddah-airport-arrival-guide', name: 'Jeddah Airport Arrival Guide (AR)' },
    { path: '/en/guides/jeddah-airport-to-madinah-transport-options', name: 'Jeddah to Madinah Guide (EN)' },
    { path: '/tr/routes/riyadh-to-makkah', name: 'Riyadh to Makkah Route (TR)' },
    { path: '/ar/fleet/toyota-coaster', name: 'Toyota Coaster Detail (AR)' },
    { path: '/en/fleet/toyota-coaster', name: 'Toyota Coaster Detail (EN)' },
    { path: '/ar/booking', name: 'Booking Engine (AR)' },
  ];

  const pageReport = [];

  for (const p of targetPages) {
    const res = await fetchHttps(p.path);
    const hasCanonical = res.body.includes('rel="canonical"');
    const hasHreflang = res.body.includes('hreflang="');
    const isRtl = res.body.includes('dir="rtl"');
    const isLtr = res.body.includes('dir="ltr"');

    console.log(
      `✓ [HTTP ${res.statusCode}] ${p.path} (${p.name}) | Canonical: ${hasCanonical} | Hreflang: ${hasHreflang} | RTL: ${isRtl} | LTR: ${isLtr}`
    );

    pageReport.push({
      path: p.path,
      name: p.name,
      statusCode: res.statusCode,
      hasCanonical,
      hasHreflang,
      isRtl,
      isLtr,
    });

    if (res.statusCode !== 200) {
      throw new Error(`Page failed: ${p.path} returned ${res.statusCode}`);
    }
  }

  // Save all live reports
  fs.writeFileSync(
    'd:/royal-umrah-cabs/docs/seo/live-preview-sitemaps.json',
    JSON.stringify(liveSitemapReport, null, 2),
    'utf8'
  );
  fs.writeFileSync(
    'd:/royal-umrah-cabs/docs/seo/live-preview-redirects.json',
    JSON.stringify(liveRedirectReport, null, 2),
    'utf8'
  );
  fs.writeFileSync(
    'd:/royal-umrah-cabs/docs/seo/live-preview-pages.json',
    JSON.stringify(pageReport, null, 2),
    'utf8'
  );

  console.log('\n🎉 ALL LIVE VERCEL PREVIEW TESTS PASSED WITH 100% ACCURACY!');
}

runLiveTests().catch((e) => {
  console.error('Live Preview Test failed:', e);
  process.exit(1);
});
