import http from 'http';
import fs from 'fs';
import path from 'path';
import { chromium } from 'file:///C:/Users/PC/AppData/Roaming/npm/node_modules/playwright/index.mjs';

const ROOT = path.resolve('.');
const APP_DIR = path.join(ROOT, '.next/server/app');
const STATIC_DIR = path.join(ROOT, '.next/static');
const PUBLIC_DIR = path.join(ROOT, 'public');

const outDir = path.resolve('research/visual-audit-2026/verified-d01');
const artifactDir = 'C:/Users/PC/.gemini/antigravity/brain/b85e6102-b6eb-4565-9493-6e009226675e';
const downloadDir = 'C:/Users/PC/Downloads/New folder';

fs.mkdirSync(outDir, { recursive: true });

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const map = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.woff2': 'font/woff2',
    '.woff': 'font/woff',
    '.ttf': 'font/ttf',
  };
  return map[ext] || 'application/octet-stream';
}

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];

  let filePath = null;

  if (reqPath.startsWith('/_next/static/')) {
    filePath = path.join(STATIC_DIR, reqPath.replace('/_next/static/', ''));
  } else if (reqPath.startsWith('/assets/') || reqPath.startsWith('/icon-') || reqPath.startsWith('/favicon') || reqPath.endsWith('.png') || reqPath.endsWith('.svg') || reqPath.endsWith('.jpg') || reqPath.endsWith('.webp')) {
    filePath = path.join(PUBLIC_DIR, reqPath.replace(/^\//, ''));
  } else {
    // Route matching in .next/server/app
    const cleanPath = reqPath.replace(/^\//, '').replace(/\/$/, '');
    if (cleanPath === '' || cleanPath === 'ar') {
      filePath = path.join(APP_DIR, 'ar.html');
    } else if (cleanPath === 'en') {
      filePath = path.join(APP_DIR, 'en.html');
    } else {
      // Check if html file exists
      const directHtml = path.join(APP_DIR, `${cleanPath}.html`);
      const indexHtml = path.join(APP_DIR, cleanPath, 'index.html');
      if (fs.existsSync(directHtml)) {
        filePath = directHtml;
      } else if (fs.existsSync(indexHtml)) {
        filePath = indexHtml;
      }
    }
  }

  if (filePath && fs.existsSync(filePath)) {
    res.writeHead(200, { 'Content-Type': getContentType(filePath) });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

async function run() {
  const PORT = 3012;
  await new Promise((resolve) => server.listen(PORT, '127.0.0.1', resolve));
  console.log(`In-process Static Server listening on http://127.0.0.1:${PORT}`);

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const desktop = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5,
  });

  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });

  async function capture(ctx, urlPath, filename, fullPage = false) {
    console.log(`Capturing ${filename} from http://127.0.0.1:${PORT}${urlPath}...`);
    const page = await ctx.newPage();
    await page.goto(`http://127.0.0.1:${PORT}${urlPath}`, { waitUntil: 'load', timeout: 15000 });
    await page.waitForTimeout(1000);

    const local = path.join(outDir, filename);
    const art = path.join(artifactDir, filename);
    const dl = path.join(downloadDir, filename);

    await page.screenshot({ path: local, fullPage, quality: 90, type: 'jpeg' });
    fs.copyFileSync(local, art);
    try {
      fs.copyFileSync(local, dl);
    } catch (e) {}

    console.log(`✅ Saved: ${filename}`);
    await page.close();
  }

  try {
    // 1. Arabic Desktop Homepage Hero & Dock
    await capture(desktop, '/ar', 'D01_LIVE_AR_DESKTOP_HOME.jpg', false);
    // 2. Arabic Desktop Full Homepage
    await capture(desktop, '/ar', 'D01_LIVE_AR_DESKTOP_FULL.jpg', true);
    // 3. Arabic Mobile Homepage
    await capture(mobile, '/ar', 'D01_LIVE_AR_MOBILE_HOME.jpg', false);
    // 4. English Desktop Homepage
    await capture(desktop, '/en', 'D01_LIVE_EN_DESKTOP_HOME.jpg', false);
    // 5. Arabic Fleet Catalog
    await capture(desktop, '/ar/fleet', 'D01_LIVE_AR_FLEET.jpg', false);
    // 6. Arabic Pricing Page
    await capture(desktop, '/ar/pricing', 'D01_LIVE_AR_PRICING.jpg', false);
  } finally {
    await browser.close();
    server.close();
    console.log('--- ALL VERIFICATION CAPTURES FINISHED SUCCESSFULLY! ---');
  }
}

run().catch((e) => {
  console.error('Run failed:', e);
  server.close();
  process.exit(1);
});
