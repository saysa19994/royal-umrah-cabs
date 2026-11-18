import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

// Import Playwright
import { chromium } from 'file:///C:/Users/PC/AppData/Roaming/npm/node_modules/playwright/index.mjs';

const outDir = path.resolve('research/visual-audit-2026/verified-d01');
const artifactDir = 'C:/Users/PC/.gemini/antigravity/brain/b85e6102-b6eb-4565-9493-6e009226675e';
const downloadDir = 'C:/Users/PC/Downloads/New folder';

fs.mkdirSync(outDir, { recursive: true });

async function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  console.log(`Checking ${url}...`);
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      console.log(`Probe status: ${res.status}`);
      if (res.status === 200 || res.status === 304 || res.status === 307 || res.status === 308) {
        return true;
      }
    } catch (e) {
      // console.log('Waiting... ', e.message);
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error(`Server did not respond at ${url} within ${timeoutMs}ms`);
}

async function run() {
  console.log('--- STARTING LIVE VERIFICATION OF D01 SAUDI HOSPITALITY ---');

  const PORT = 3008;
  const HOST = '127.0.0.1';
  const server = spawn('npx', ['next', 'start', '-H', HOST, '-p', String(PORT)], {
    stdio: 'pipe',
    shell: true,
  });

  server.stdout.on('data', (d) => console.log(`[Next] ${d.toString().trim()}`));
  server.stderr.on('data', (d) => console.log(`[Next err] ${d.toString().trim()}`));

  try {
    console.log(`Waiting for Next.js production server on http://${HOST}:${PORT}/ar...`);
    await waitForServer(`http://${HOST}:${PORT}/ar`);
    console.log('Server is UP! Launching browser...');

    const browser = await chromium.launch({ headless: true });

    const tests = [
      {
        name: 'D01_LIVE_AR_DESKTOP',
        url: `http://${HOST}:${PORT}/ar`,
        width: 1440,
        height: 900,
      },
      {
        name: 'D01_LIVE_AR_MOBILE',
        url: `http://${HOST}:${PORT}/ar`,
        width: 390,
        height: 844,
      },
      {
        name: 'D01_LIVE_EN_DESKTOP',
        url: `http://${HOST}:${PORT}/en`,
        width: 1440,
        height: 900,
      },
      {
        name: 'D01_LIVE_FLEET_AR',
        url: `http://${HOST}:${PORT}/ar/fleet`,
        width: 1440,
        height: 900,
      },
      {
        name: 'D01_LIVE_BOOKING_AR',
        url: `http://${HOST}:${PORT}/ar/booking`,
        width: 1440,
        height: 900,
      },
    ];

    for (const test of tests) {
      console.log(`Capturing: ${test.name} (${test.url})...`);
      const context = await browser.newContext({
        viewport: { width: test.width, height: test.height },
      });
      const page = await context.newPage();
      await page.goto(test.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(2000);

      const filePath = path.join(outDir, `${test.name}.jpg`);
      await page.screenshot({ path: filePath, quality: 90, type: 'jpeg' });
      console.log(`Saved: ${filePath}`);

      // Copy to artifact directory
      const artPath = path.join(artifactDir, `${test.name}.jpg`);
      fs.copyFileSync(filePath, artPath);

      // Copy to downloads folder
      try {
        const dlPath = path.join(downloadDir, `${test.name}.jpg`);
        fs.copyFileSync(filePath, dlPath);
      } catch (e) {}

      await context.close();
    }

    await browser.close();
    console.log('✅ ALL D01 VERIFICATION SCREENSHOTS CAPTURED SUCCESSFULLY!');
  } finally {
    server.kill();
  }
}

run().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
