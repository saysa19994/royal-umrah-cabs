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
  console.log(`Server listening on http://127.0.0.1:${port}`);

  const browser = await chromium.launch({ headless: true });

  const tasks = [
    {
      name: 'AUDIT_AR_DESKTOP_HOME.jpg',
      url: `http://127.0.0.1:${port}/ar`,
      viewport: { width: 1440, height: 900 },
      fullPage: false,
    },
    {
      name: 'AUDIT_AR_DESKTOP_FULL.jpg',
      url: `http://127.0.0.1:${port}/ar`,
      viewport: { width: 1440, height: 900 },
      fullPage: true,
      autoScroll: true,
    },
    {
      name: 'AUDIT_AR_TABLET_768.jpg',
      url: `http://127.0.0.1:${port}/ar`,
      viewport: { width: 768, height: 1024 },
      fullPage: true,
      autoScroll: true,
    },
    {
      name: 'AUDIT_AR_MOBILE_430.jpg',
      url: `http://127.0.0.1:${port}/ar`,
      viewport: { width: 430, height: 932 },
      fullPage: true,
      autoScroll: true,
    },
    {
      name: 'AUDIT_AR_MOBILE_390.jpg',
      url: `http://127.0.0.1:${port}/ar`,
      viewport: { width: 390, height: 844 },
      fullPage: true,
      autoScroll: true,
    },
    {
      name: 'AUDIT_AR_MOBILE_375.jpg',
      url: `http://127.0.0.1:${port}/ar`,
      viewport: { width: 375, height: 667 },
      fullPage: true,
      autoScroll: true,
    },
    {
      name: 'AUDIT_EN_DESKTOP_HOME.jpg',
      url: `http://127.0.0.1:${port}/en`,
      viewport: { width: 1440, height: 900 },
      fullPage: false,
    },
    {
      name: 'AUDIT_EN_MOBILE_390.jpg',
      url: `http://127.0.0.1:${port}/en`,
      viewport: { width: 390, height: 844 },
      fullPage: true,
      autoScroll: true,
    },
  ];

  const verificationReport = [];

  for (const t of tasks) {
    const page = await browser.newPage({
      viewport: t.viewport,
      deviceScaleFactor: 2,
    });

    console.log(`Auditing & capturing: ${t.name} (${t.viewport.width}x${t.viewport.height})...`);
    await page.goto(t.url, { waitUntil: 'domcontentloaded', timeout: 25000 });
    await page.waitForTimeout(1000);

    if (t.autoScroll) {
      await page.evaluate(async () => {
        const scrollStep = 600;
        const totalHeight = document.body.scrollHeight;
        for (let current = 0; current < totalHeight; current += scrollStep) {
          window.scrollTo(0, current);
          await new Promise((r) => setTimeout(r, 60));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(800);
    }

    // 1. Check Horizontal Overflow
    const overflowCheck = await page.evaluate(() => {
      return {
        windowWidth: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        bodyWidth: document.body.scrollWidth,
        hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
      };
    });

    // 2. Check Floating Element Non-Overlap
    const overlapAudit = await page.evaluate(() => {
      const booking = document.querySelector('#quickBooking');
      const aside = document.querySelector('aside[aria-label="Quick Actions"]');
      const mobileDock = document.querySelector('div[aria-label="Mobile Chauffeur Dock"]');
      const botBtn = document.querySelector('button[aria-label="Open AI Chauffeur Assistant"]');

      if (!booking) return { hasOverlap: false, reason: 'No booking form found' };

      const bRect = booking.getBoundingClientRect();
      const isVisibleAndOverlapping = (el) => {
        if (!el) return false;
        const s = window.getComputedStyle(el);
        if (s.opacity === '0' || s.display === 'none' || s.visibility === 'hidden') return false;
        const r = el.getBoundingClientRect();
        return !(r.right < bRect.left || r.left > bRect.right || r.bottom < bRect.top || r.top > bRect.bottom);
      };

      const overlap = isVisibleAndOverlapping(aside) || isVisibleAndOverlapping(mobileDock) || isVisibleAndOverlapping(botBtn);
      return { hasOverlap: overlap };
    });

    // 3. Check Tablet Layout at 768px
    let tabletAudit = null;
    if (t.viewport.width === 768) {
      tabletAudit = await page.evaluate(() => {
        const panel = document.querySelector('.booking-panel');
        if (!panel) return { valid: false };
        const style = window.getComputedStyle(panel);
        return {
          valid: true,
          gridTemplateColumns: style.gridTemplateColumns,
          isTwoColumn: style.gridTemplateColumns.split(' ').length === 2,
        };
      });
    }

    const localPath = path.join(outDir, t.name);
    const brainPath = path.join(artifactDir, t.name);

    await page.screenshot({
      path: localPath,
      fullPage: t.fullPage,
      quality: 90,
      type: 'jpeg',
    });

    fs.copyFileSync(localPath, brainPath);

    verificationReport.push({
      task: t.name,
      viewport: `${t.viewport.width}x${t.viewport.height}`,
      overflowCheck,
      overlapAudit,
      tabletAudit,
    });

    console.log(`✓ Saved ${t.name} (Overflow: ${overflowCheck.hasOverflow ? 'FAIL' : 'PASS'}, Overlap: ${overlapAudit.hasOverlap ? 'FAIL' : 'PASS'})`);
    await page.close();
  }

  await browser.close();
  server.close();

  const reportPath = path.join(outDir, 'AUDIT_VERIFICATION_RESULTS.json');
  fs.writeFileSync(reportPath, JSON.stringify(verificationReport, null, 2), 'utf8');
  fs.copyFileSync(reportPath, path.join(artifactDir, 'AUDIT_VERIFICATION_RESULTS.json'));

  console.log('\n=== AUDIT VERIFICATION COMPLETE ===');
  console.log(JSON.stringify(verificationReport, null, 2));
});
