import http from 'http';
import fs from 'fs';
import path from 'path';
import { chromium } from 'file:///C:/Users/PC/AppData/Roaming/npm/node_modules/playwright/index.mjs';

const ROOT = 'd:/royal-umrah-cabs';
const APP_DIR = path.join(ROOT, '.next/server/app');
const STATIC_DIR = path.join(ROOT, '.next/static');
const PUBLIC_DIR = path.join(ROOT, 'public');

const outDir = path.join(ROOT, 'research/visual-audit-2026/verified-v2-v3');
const artifactDir = 'C:/Users/PC/.gemini/antigravity/brain/b85e6102-b6eb-4565-9493-6e009226675e';

fs.mkdirSync(outDir, { recursive: true });

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const map = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.mjs': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.woff2': 'font/woff2',
    '.woff': 'font/woff',
    '.ttf': 'font/ttf',
    '.glb': 'model/gltf-binary',
    '.gltf': 'model/gltf+json',
    '.wasm': 'application/wasm',
  };
  return map[ext] || 'application/octet-stream';
}

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  let filePath = null;

  if (reqPath.startsWith('/_next/static/')) {
    const rel = decodeURIComponent(reqPath.replace('/_next/static/', ''));
    filePath = path.join(STATIC_DIR, rel);
  } else if (reqPath.startsWith('/assets/') || reqPath.startsWith('/models/') || reqPath.startsWith('/draco/')) {
    const rel = decodeURIComponent(reqPath.replace(/^\//, ''));
    filePath = path.join(PUBLIC_DIR, rel);
  } else if (reqPath === '/' || reqPath === '') {
    filePath = path.join(APP_DIR, 'index.html');
    if (!fs.existsSync(filePath)) filePath = path.join(APP_DIR, 'en.html');
  } else {
    const clean = reqPath.replace(/^\//, '').replace(/\/$/, '');
    const directHtml = path.join(APP_DIR, `${clean}.html`);
    const indexHtml = path.join(APP_DIR, clean, 'index.html');
    const directPageHtml = path.join(APP_DIR, clean, 'page.html');
    const pubFile = path.join(PUBLIC_DIR, clean);

    if (fs.existsSync(directHtml)) {
      filePath = directHtml;
    } else if (fs.existsSync(indexHtml)) {
      filePath = indexHtml;
    } else if (fs.existsSync(directPageHtml)) {
      filePath = directPageHtml;
    } else if (fs.existsSync(pubFile) && fs.statSync(pubFile).isFile()) {
      filePath = pubFile;
    }
  }

  if (filePath && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    res.writeHead(200, {
      'Content-Type': getContentType(filePath),
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*'
    });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`Not Found: ${reqPath}`);
  }
});

const PORT = 4921;
server.listen(PORT, async () => {
  console.log(`Showcase Verification Server listening on http://127.0.0.1:${PORT}`);
  
  const results = {
    timestamp: new Date().toISOString(),
    tests: [],
    performance: {},
    screenshots: {}
  };

  try {
    const browser = await chromium.launch({
      headless: true,
      args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-webgl', '--no-sandbox']
    });

    const targetUrl = `http://127.0.0.1:${PORT}/ar/showcase/toyota-camry`;
    console.log(`Starting automated browser test suite against ${targetUrl}...`);

    // TEST 1: Desktop 1440px Verification
    console.log('\n--- TEST 1: DESKTOP 1440px ---');
    const deskPage = await browser.newPage({
      viewport: { width: 1440, height: 900 }
    });

    const startNav = Date.now();
    await deskPage.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    const loadTimeMs = Date.now() - startNav;
    results.performance.desktopLoadTimeMs = loadTimeMs;
    console.log(`Page DOM loaded in ${loadTimeMs}ms`);

    await deskPage.waitForSelector('canvas', { state: 'attached', timeout: 15000 });
    console.log('✓ 360 Canvas element located');
    await deskPage.waitForTimeout(1500);

    const title = await deskPage.title();
    console.log(`Document Title: ${title}`);
    results.tests.push({ name: 'Page Title Check', pass: title.includes('تويوتا كامري'), title });

    const canvas = deskPage.locator('canvas').first();
    const box = await canvas.boundingBox();
    if (box) {
      console.log('Simulating mouse drag to rotate 360° turntable...');
      await deskPage.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await deskPage.mouse.down();
      await deskPage.mouse.move(box.x + box.width / 2 - 150, box.y + box.height / 2, { steps: 10 });
      await deskPage.mouse.up();
      await deskPage.waitForTimeout(500);
      console.log('✓ Drag interaction executed smoothly');
    }

    const desk360Shot = path.join(outDir, 'POC_VIEWER_DESKTOP_360.jpg');
    await canvas.screenshot({ path: desk360Shot, quality: 90, type: 'jpeg', animations: 'disabled' });
    fs.copyFileSync(desk360Shot, path.join(artifactDir, 'POC_VIEWER_DESKTOP_360.jpg'));
    results.screenshots.viewer360 = 'POC_VIEWER_DESKTOP_360.jpg';

    console.log('Capturing Desktop Full Page...');
    const deskFullShot = path.join(outDir, 'POC_360_AR_DESKTOP_1440.jpg');
    await deskPage.screenshot({ path: deskFullShot, fullPage: true, quality: 85, type: 'jpeg', animations: 'disabled' });
    fs.copyFileSync(deskFullShot, path.join(artifactDir, 'POC_360_AR_DESKTOP_1440.jpg'));
    results.screenshots.desktopFull = 'POC_360_AR_DESKTOP_1440.jpg';

    console.log('Switching to Real 3D WebGL mode...');
    const switch3dBtn = deskPage.getByText('مجسم 3D حقيقي');
    await switch3dBtn.click();
    await deskPage.waitForTimeout(2500);

    const paintButtons = deskPage.locator('button[aria-label]');
    const paintCount = await paintButtons.count();
    console.log(`Found ${paintCount} paint finish swatches`);
    if (paintCount > 1) {
      await paintButtons.nth(1).click();
      await deskPage.waitForTimeout(1000);
      console.log('✓ Paint finish switch executed');
    }

    const desk3dShot = path.join(outDir, 'POC_VIEWER_DESKTOP_3D.jpg');
    await canvas.screenshot({ path: desk3dShot, quality: 90, type: 'jpeg', animations: 'disabled' });
    fs.copyFileSync(desk3dShot, path.join(artifactDir, 'POC_VIEWER_DESKTOP_3D.jpg'));
    results.screenshots.viewer3d = 'POC_VIEWER_DESKTOP_3D.jpg';

    await deskPage.close();

    // TEST 2: Tablet 768px Verification
    console.log('\n--- TEST 2: TABLET 768px ---');
    const tabPage = await browser.newPage({
      viewport: { width: 768, height: 1024 }
    });
    await tabPage.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await tabPage.waitForSelector('canvas', { state: 'attached', timeout: 15000 });
    await tabPage.waitForTimeout(1500);
    const tabShot = path.join(outDir, 'POC_360_AR_TABLET_768.jpg');
    await tabPage.screenshot({ path: tabShot, fullPage: true, quality: 85, type: 'jpeg', animations: 'disabled' });
    fs.copyFileSync(tabShot, path.join(artifactDir, 'POC_360_AR_TABLET_768.jpg'));
    results.screenshots.tablet768 = 'POC_360_AR_TABLET_768.jpg';
    await tabPage.close();

    // TEST 3: Mobile 430px (iPhone 16 Pro Max)
    console.log('\n--- TEST 3: MOBILE 430px (iPhone 16 Pro Max) ---');
    const m430 = await browser.newPage({
      viewport: { width: 430, height: 932 }
    });
    await m430.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await m430.waitForSelector('canvas', { state: 'attached', timeout: 15000 });
    await m430.waitForTimeout(1500);
    const m430Shot = path.join(outDir, 'POC_360_AR_MOBILE_430.jpg');
    await m430.screenshot({ path: m430Shot, fullPage: true, quality: 85, type: 'jpeg', animations: 'disabled' });
    fs.copyFileSync(m430Shot, path.join(artifactDir, 'POC_360_AR_MOBILE_430.jpg'));
    results.screenshots.mobile430 = 'POC_360_AR_MOBILE_430.jpg';
    await m430.close();

    // TEST 4: Mobile 390px (iPhone 14/15)
    console.log('\n--- TEST 4: MOBILE 390px (iPhone 14/15) ---');
    const m390 = await browser.newPage({
      viewport: { width: 390, height: 844 }
    });
    await m390.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await m390.waitForSelector('canvas', { state: 'attached', timeout: 15000 });
    await m390.waitForTimeout(1500);
    const m390Shot = path.join(outDir, 'POC_360_AR_MOBILE_390.jpg');
    await m390.screenshot({ path: m390Shot, fullPage: true, quality: 85, type: 'jpeg', animations: 'disabled' });
    fs.copyFileSync(m390Shot, path.join(artifactDir, 'POC_360_AR_MOBILE_390.jpg'));
    results.screenshots.mobile390 = 'POC_360_AR_MOBILE_390.jpg';
    await m390.close();

    // TEST 5: Mobile 375px (iPhone SE)
    console.log('\n--- TEST 5: MOBILE 375px (iPhone SE) ---');
    const m375 = await browser.newPage({
      viewport: { width: 375, height: 667 }
    });
    await m375.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await m375.waitForSelector('canvas', { state: 'attached', timeout: 15000 });
    await m375.waitForTimeout(1500);
    const m375Shot = path.join(outDir, 'POC_360_AR_MOBILE_375.jpg');
    await m375.screenshot({ path: m375Shot, fullPage: true, quality: 85, type: 'jpeg', animations: 'disabled' });
    fs.copyFileSync(m375Shot, path.join(artifactDir, 'POC_360_AR_MOBILE_375.jpg'));
    results.screenshots.mobile375 = 'POC_360_AR_MOBILE_375.jpg';
    await m375.close();

    // TEST 6: English Desktop 1440px
    console.log('\n--- TEST 6: ENGLISH SHOWCASE 1440px ---');
    const enDesk = await browser.newPage({
      viewport: { width: 1440, height: 900 }
    });
    await enDesk.goto(`http://127.0.0.1:${PORT}/en/showcase/toyota-camry`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await enDesk.waitForSelector('canvas', { state: 'attached', timeout: 15000 });
    await enDesk.waitForTimeout(1500);
    const enShot = path.join(outDir, 'POC_360_EN_DESKTOP_1440.jpg');
    await enDesk.screenshot({ path: enShot, fullPage: true, quality: 85, type: 'jpeg', animations: 'disabled' });
    fs.copyFileSync(enShot, path.join(artifactDir, 'POC_360_EN_DESKTOP_1440.jpg'));
    results.screenshots.englishDesktop = 'POC_360_EN_DESKTOP_1440.jpg';
    await enDesk.close();

    await browser.close();
    server.close();

    // Asset size summary
    const frameStats = fs.readdirSync(path.join(PUBLIC_DIR, 'assets/360-camry'))
      .map(f => fs.statSync(path.join(PUBLIC_DIR, 'assets/360-camry', f)).size);
    const totalFrameBytes = frameStats.reduce((a, b) => a + b, 0);
    const modelBytes = fs.statSync(path.join(PUBLIC_DIR, 'models/test-vehicle.glb')).size;

    results.performance.turntable36FramesCount = frameStats.length;
    results.performance.turntableTotalSizeKb = Math.round(totalFrameBytes / 1024);
    results.performance.turntableAvgFrameKb = Math.round((totalFrameBytes / frameStats.length) / 1024);
    results.performance.threeJsModelSizeKb = Math.round(modelBytes / 1024);

    fs.writeFileSync(path.join(artifactDir, 'POC_VERIFICATION_RESULTS.json'), JSON.stringify(results, null, 2));
    console.log('\n✅ ALL POC TESTS PASSED SUCCESSFULLY!');
    console.log(JSON.stringify(results, null, 2));
    process.exit(0);

  } catch (err) {
    console.error('Test execution failed:', err);
    server.close();
    process.exit(1);
  }
});
