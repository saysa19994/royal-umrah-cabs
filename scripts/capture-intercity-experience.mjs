import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

const projectRoot = 'D:/royal-umrah-cabs';
const artifactsDir = 'C:/Users/PC/.gemini/antigravity/brain/b85e6102-b6eb-4565-9493-6e009226675e';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const fallbackEdge = 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe';
const binary = fs.existsSync(edgePath) ? edgePath : fallbackEdge;

const PORT = 3038;
const DEBUG_PORT = 9248;

async function waitForHttp(url, timeoutMs = 35000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(url, (res) => {
          if (res.statusCode === 200) resolve();
          else reject(new Error(`Status ${res.statusCode}`));
        });
        req.on('error', reject);
        req.setTimeout(2000, () => req.destroy());
      });
      return true;
    } catch {
      await new Promise((r) => setTimeout(r, 600));
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

async function run() {
  console.log(`Starting Next.js dev server on port ${PORT}...`);
  const server = spawn('node', ['node_modules/next/dist/bin/next', 'dev', '-p', String(PORT)], {
    cwd: projectRoot,
    stdio: 'ignore',
  });

  const ready = await waitForHttp(`http://localhost:${PORT}/ar/routes/makkah-to-madinah`, 45000);
  if (!ready) {
    console.error('Server failed to start or route not ready');
    server.kill();
    process.exit(1);
  }
  console.log('Next.js dev server is ready.');

  console.log(`Starting Edge with debugging on port ${DEBUG_PORT}...`);
  const edgeProc = spawn(binary, [
    '--headless=new',
    '--disable-gpu',
    `--remote-debugging-port=${DEBUG_PORT}`,
    'about:blank',
  ]);

  const edgeReady = await waitForHttp(`http://127.0.0.1:${DEBUG_PORT}/json/version`, 15000);
  if (!edgeReady) {
    console.error('Edge debugging not available');
    edgeProc.kill();
    server.kill();
    process.exit(1);
  }

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
    {
      name: 'intercity_route_desktop_ar.jpg',
      url: `http://localhost:${PORT}/ar/routes/makkah-to-madinah`,
      width: 1440,
      height: 900,
      fullPage: false,
    },
    {
      name: 'intercity_route_mobile_ar.jpg',
      url: `http://localhost:${PORT}/ar/routes/makkah-to-madinah`,
      width: 390,
      height: 844,
      mobile: true,
      fullPage: false,
    },
    {
      name: 'intercity_route_desktop_en.jpg',
      url: `http://localhost:${PORT}/en/routes/makkah-to-madinah`,
      width: 1440,
      height: 900,
      fullPage: false,
    },
    {
      name: 'intercity_comparison_guide_desktop.jpg',
      url: `http://localhost:${PORT}/en/guides/makkah-to-madinah-transport-comparison`,
      width: 1440,
      height: 900,
      fullPage: false,
    },
  ];

  for (const job of jobs) {
    console.log(`Capturing ${job.name} at ${job.width}x${job.height}...`);
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: job.width,
      height: job.height,
      deviceScaleFactor: 2,
      mobile: Boolean(job.mobile),
    });

    await cdp.send('Page.navigate', { url: job.url });
    await new Promise((r) => setTimeout(r, 4500));

    const result = await cdp.send('Page.captureScreenshot', {
      format: 'jpeg',
      quality: 90,
      captureBeyondViewport: false,
    });

    const outPath = path.join(artifactsDir, job.name);
    fs.writeFileSync(outPath, Buffer.from(result.data, 'base64'));
    console.log(`Saved: ${outPath} (${(result.data.length / 1024).toFixed(1)} KB base64)`);
  }

  cdp.close();
  edgeProc.kill();
  server.kill();
  console.log('Capture completed successfully.');
}

run().catch((err) => {
  console.error('Fatal error during capture:', err);
  process.exit(1);
});
