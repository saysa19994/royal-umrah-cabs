import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

const projectRoot = 'D:/royal-umrah-cabs';
const artifactsDir = 'C:/Users/PC/.gemini/antigravity/brain/b85e6102-b6eb-4565-9493-6e009226675e';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const fallbackEdge = 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe';
const binary = fs.existsSync(edgePath) ? edgePath : fallbackEdge;

const PORT = 3021;
const DEBUG_PORT = 9234;

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

async function capture() {
  console.log('Starting Next.js on port ' + PORT + '...');
  const server = spawn('node', ['node_modules/next/dist/bin/next', 'start', '-p', String(PORT)], {
    cwd: projectRoot,
    stdio: 'ignore',
  });

  const ready = await waitForHttp(`http://localhost:${PORT}/ar`);
  if (!ready) {
    console.error('Server failed to start');
    server.kill();
    process.exit(1);
  }

  const edgeProc = spawn(binary, [
    '--headless=new',
    '--disable-gpu',
    `--remote-debugging-port=${DEBUG_PORT}`,
    'about:blank',
  ]);

  const edgeReady = await waitForHttp(`http://127.0.0.1:${DEBUG_PORT}/json/version`);
  if (!edgeReady) {
    console.error('Edge debugging not ready');
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
  await cdp.send('Page.enable');
  await cdp.send('DOM.enable');
  await cdp.send('Runtime.enable');

  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
  });

  await cdp.send('Emulation.setUserAgentOverride', {
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  });

  await cdp.send('Page.navigate', { url: `http://localhost:${PORT}/ar` });
  await new Promise((r) => setTimeout(r, 2500));

  // Reset scroll and prepare static layout for seamless fullpage capture
  await cdp.send('Runtime.evaluate', {
    expression: `
      window.scrollTo(0, 0);
      const header = document.querySelector('header');
      if (header) {
        header.style.position = 'absolute';
        header.style.top = '0';
      }
      const hero = document.querySelector('.rc-hero-section');
      if (hero) {
        hero.style.paddingTop = '80px';
      }
    `,
  });
  await new Promise((r) => setTimeout(r, 600));

  console.log('Capturing pristine full-page mobile screenshot...');
  const shot = await cdp.send('Page.captureScreenshot', {
    format: 'jpeg',
    quality: 92,
    captureBeyondViewport: true,
    fromSurface: true,
  });

  const outPathJpg = path.join(artifactsDir, 'full_mobile_website.jpg');
  fs.writeFileSync(outPathJpg, Buffer.from(shot.data, 'base64'));
  console.log('✓ Successfully written full_mobile_website.jpg');

  const pngShot = await cdp.send('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: true,
    fromSurface: true,
  });
  const outPathPng = path.join(artifactsDir, 'luxury_home_ar_mb_full.png');
  fs.writeFileSync(outPathPng, Buffer.from(pngShot.data, 'base64'));
  console.log('✓ Successfully written luxury_home_ar_mb_full.png');

  cdp.close();
  edgeProc.kill();
  server.kill();
  console.log('DONE ALL!');
  process.exit(0);
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});
