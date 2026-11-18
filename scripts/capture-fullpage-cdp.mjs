import { spawn, execSync } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

const projectRoot = 'D:/royal-umrah-cabs';
const artifactsDir = 'C:/Users/PC/.gemini/antigravity/brain/b85e6102-b6eb-4565-9493-6e009226675e';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const fallbackEdge = 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe';
const binary = fs.existsSync(edgePath) ? edgePath : fallbackEdge;

const PORT = 3007;
const DEBUG_PORT = 9222;

async function waitForHttp(url, timeoutMs = 25000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(url, (res) => {
          if (res.statusCode === 200) resolve();
          else reject(new Error(`Status ${res.statusCode}`));
        });
        req.on('error', reject);
        req.setTimeout(1500, () => req.destroy());
      });
      return true;
    } catch {
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  return false;
}

class CdpSession {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.id = 0;
    this.callbacks = new Map();
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws = new globalThis.WebSocket(this.wsUrl);
      this.ws.onopen = () => resolve();
      this.ws.onerror = (err) => reject(err);
      this.ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id && this.callbacks.has(msg.id)) {
          const { resolve, reject } = this.callbacks.get(msg.id);
          this.callbacks.delete(msg.id);
          if (msg.error) reject(new Error(msg.error.message));
          else resolve(msg.result);
        }
      };
    });
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = ++this.id;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function captureAll() {
  console.log(`Starting Next.js server on port ${PORT}...`);
  const server = spawn('node', ['node_modules/next/dist/bin/next', 'start', '-p', String(PORT)], {
    cwd: projectRoot,
    stdio: 'ignore',
  });

  const ready = await waitForHttp(`http://localhost:${PORT}/ar/pricing`);
  if (!ready) {
    console.error('Server failed to start');
    server.kill();
    process.exit(1);
  }
  console.log('Next.js is ready.');

  console.log(`Starting Edge with debugging on port ${DEBUG_PORT}...`);
  const edgeProc = spawn(binary, [
    '--headless=new',
    '--disable-gpu',
    `--remote-debugging-port=${DEBUG_PORT}`,
    'about:blank',
  ]);

  const edgeReady = await waitForHttp(`http://127.0.0.1:${DEBUG_PORT}/json/version`);
  if (!edgeReady) {
    console.error('Edge debugging not available');
    edgeProc.kill();
    server.kill();
    process.exit(1);
  }

  // Get active tab WS
  const tabsRes = await fetch(`http://127.0.0.1:${DEBUG_PORT}/json`);
  const tabs = await tabsRes.json();
  const pageTab = tabs.find((t) => t.type === 'page') || tabs[0];
  const wsUrl = pageTab.webSocketDebuggerUrl;

  const cdp = new CdpSession(wsUrl);
  await cdp.connect();
  console.log('Connected to CDP session.');

  await cdp.send('Page.enable');
  await cdp.send('DOM.enable');

  const jobs = [
    // 1. Master Prices & Packages - Mobile 390px (Full page)
    {
      name: 'luxury_prices_packages_ar_mb_full.png',
      url: `http://localhost:${PORT}/ar/pricing`,
      isMobile: true,
      w: 390,
      h: 844,
      dpr: 2,
    },
    // 2. Master Prices & Packages - Desktop 1440px (Full page)
    {
      name: 'luxury_prices_packages_ar_dt_full.png',
      url: `http://localhost:${PORT}/ar/pricing`,
      isMobile: false,
      w: 1440,
      h: 900,
      dpr: 1.5,
    },
    // 3. Homepage - Mobile 390px (Full page)
    {
      name: 'luxury_home_ar_mb_full.png',
      url: `http://localhost:${PORT}/ar`,
      isMobile: true,
      w: 390,
      h: 844,
      dpr: 2,
    },
    // 4. Fleet Catalog - Mobile 390px (Full page)
    {
      name: 'luxury_fleet_ar_mb_full.png',
      url: `http://localhost:${PORT}/ar/fleet`,
      isMobile: true,
      w: 390,
      h: 844,
      dpr: 2,
    },
  ];

  for (const job of jobs) {
    console.log(`Processing: ${job.name} (mobile: ${job.isMobile})...`);
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: job.w,
      height: job.h,
      deviceScaleFactor: job.dpr,
      mobile: job.isMobile,
    });

    if (job.isMobile) {
      await cdp.send('Emulation.setUserAgentOverride', {
        userAgent:
          'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
      });
    } else {
      await cdp.send('Emulation.setUserAgentOverride', {
        userAgent:
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      });
    }

    await cdp.send('Page.navigate', { url: job.url });
    // Wait for network and render
    await new Promise((r) => setTimeout(r, 2200));

    // Capture FULL height page
    const screenshot = await cdp.send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: true,
      fromSurface: true,
    });

    const buffer = Buffer.from(screenshot.data, 'base64');
    const outPath = path.join(artifactsDir, job.name);
    fs.writeFileSync(outPath, buffer);
    console.log(`✓ Saved: ${job.name} (${buffer.length} bytes)`);
  }

  cdp.close();
  edgeProc.kill();
  server.kill();
  console.log('All full-page screenshots captured successfully!');
}

captureAll().catch((err) => {
  console.error('Capture error:', err);
  process.exit(1);
});
