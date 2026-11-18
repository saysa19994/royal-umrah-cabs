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
  };
  return map[ext] || 'application/octet-stream';
}

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  let filePath = null;

  if (reqPath.startsWith('/_next/static/')) {
    const rel = decodeURIComponent(reqPath.replace('/_next/static/', ''));
    filePath = path.join(STATIC_DIR, rel);
  } else if (reqPath.startsWith('/assets/')) {
    const rel = decodeURIComponent(reqPath.replace(/^\//, ''));
    filePath = path.join(PUBLIC_DIR, rel);
  } else if (reqPath === '/' || reqPath === '') {
    filePath = path.join(APP_DIR, 'index.html');
    if (!fs.existsSync(filePath)) filePath = path.join(APP_DIR, 'en.html');
  } else {
    const clean = decodeURIComponent(reqPath.replace(/^\//, ''));
    const directHtml = path.join(APP_DIR, clean + '.html');
    const indexHtml = path.join(APP_DIR, clean, 'index.html');
    const directFile = path.join(PUBLIC_DIR, clean);

    if (fs.existsSync(directHtml)) filePath = directHtml;
    else if (fs.existsSync(indexHtml)) filePath = indexHtml;
    else if (fs.existsSync(directFile)) filePath = directFile;
  }

  if (filePath && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const contentType = getContentType(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found: ' + reqPath);
  }
});

server.listen(0, '127.0.0.1', async () => {
  const port = server.address().port;
  console.log(`In-process static server listening on http://127.0.0.1:${port}`);

  const browser = await chromium.launch({ headless: true });

  const tasks = [
    {
      name: 'REFINED_AR_DESKTOP_HOME.jpg',
      url: `http://127.0.0.1:${port}/ar`,
      viewport: { width: 1440, height: 900 },
      fullPage: false,
    },
    {
      name: 'REFINED_AR_DESKTOP_FULL.jpg',
      url: `http://127.0.0.1:${port}/ar`,
      viewport: { width: 1440, height: 900 },
      fullPage: true,
      autoScroll: true,
    },
    {
      name: 'REFINED_AR_MOBILE_390.jpg',
      url: `http://127.0.0.1:${port}/ar`,
      viewport: { width: 390, height: 844 },
      fullPage: true,
      autoScroll: true,
    },
    {
      name: 'REFINED_AR_MOBILE_430.jpg',
      url: `http://127.0.0.1:${port}/ar`,
      viewport: { width: 430, height: 932 },
      fullPage: true,
      autoScroll: true,
    },
    {
      name: 'REFINED_AR_MOBILE_375.jpg',
      url: `http://127.0.0.1:${port}/ar`,
      viewport: { width: 375, height: 667 },
      fullPage: true,
      autoScroll: true,
    },
    {
      name: 'REFINED_AR_TABLET_768.jpg',
      url: `http://127.0.0.1:${port}/ar`,
      viewport: { width: 768, height: 1024 },
      fullPage: true,
      autoScroll: true,
    },
    {
      name: 'REFINED_EN_DESKTOP_HOME.jpg',
      url: `http://127.0.0.1:${port}/en`,
      viewport: { width: 1440, height: 900 },
      fullPage: false,
    },
    {
      name: 'REFINED_EN_MOBILE_390.jpg',
      url: `http://127.0.0.1:${port}/en`,
      viewport: { width: 390, height: 844 },
      fullPage: true,
      autoScroll: true,
    },
  ];

  for (const t of tasks) {
    const context = await browser.newContext({
      viewport: t.viewport,
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();
    try {
      await page.goto(t.url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForTimeout(1500);

      // Check horizontal overflow
      const overflow = await page.evaluate(() => {
        return {
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        };
      });
      console.log(`[${t.name}] Viewport ${t.viewport.width}x${t.viewport.height} - Overflow: ${overflow.hasOverflow ? 'FAIL (' + overflow.scrollWidth + ' > ' + overflow.clientWidth + ')' : 'PASS'}`);

      if (t.autoScroll) {
        await page.evaluate(async () => {
          await new Promise((resolve) => {
            let totalHeight = 0;
            const distance = 350;
            const timer = setInterval(() => {
              const scrollHeight = document.body.scrollHeight;
              window.scrollBy(0, distance);
              totalHeight += distance;
              if (totalHeight >= scrollHeight) {
                clearInterval(timer);
                window.scrollTo(0, 0);
                setTimeout(resolve, 300);
              }
            }, 80);
          });
        });
        await page.waitForTimeout(600);
      }

      const outPath = path.join(outDir, t.name);
      await page.screenshot({ path: outPath, fullPage: t.fullPage, quality: 90, type: 'jpeg' });
      console.log(`Saved ${t.name}`);

      // Copy to artifact dir
      try {
        fs.copyFileSync(outPath, path.join(artifactDir, t.name));
      } catch (e) {}
    } catch (err) {
      console.error(`Error capturing ${t.name}:`, err.message);
    } finally {
      await context.close();
    }
  }

  await browser.close();
  server.close();
  console.log('Master capture completed successfully!');
});
