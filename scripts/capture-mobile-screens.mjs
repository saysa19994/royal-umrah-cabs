import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

const projectRoot = 'D:/royal-umrah-cabs';
const artifactsDir = 'C:/Users/PC/.gemini/antigravity/brain/b85e6102-b6eb-4565-9493-6e009226675e';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const fallbackEdge = 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe';
const binary = fs.existsSync(edgePath) ? edgePath : fallbackEdge;

const PORT = 3009;
const DEBUG_PORT = 9224;

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
  console.log(`Starting Next.js on port ${PORT}...`);
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
  console.log('Next.js is ready.');

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

  // 1. Capture Top Viewport (Hero & Form)
  const topShot = await cdp.send('Page.captureScreenshot', {
    format: 'jpeg',
    quality: 90,
  });
  fs.writeFileSync(
    path.join(artifactsDir, 'mobile_viewport_top_home.jpg'),
    Buffer.from(topShot.data, 'base64')
  );
  console.log('✓ Saved mobile_viewport_top_home.jpg');

  // 2. Scroll to Fleet section and capture
  await cdp.send('Runtime.evaluate', {
    expression: `document.querySelector('#fleet')?.scrollIntoView({ behavior: 'instant', block: 'start' })`,
  });
  await new Promise((r) => setTimeout(r, 800));
  const fleetShot = await cdp.send('Page.captureScreenshot', {
    format: 'jpeg',
    quality: 90,
  });
  fs.writeFileSync(
    path.join(artifactsDir, 'mobile_viewport_screen2.jpg'),
    Buffer.from(fleetShot.data, 'base64')
  );
  console.log('✓ Saved mobile_viewport_screen2.jpg');

  // 3. Scroll to Services & Routes and capture
  await cdp.send('Runtime.evaluate', {
    expression: `window.scrollBy(0, 750)`,
  });
  await new Promise((r) => setTimeout(r, 800));
  const screen3Shot = await cdp.send('Page.captureScreenshot', {
    format: 'jpeg',
    quality: 90,
  });
  fs.writeFileSync(
    path.join(artifactsDir, 'mobile_viewport_screen3.jpg'),
    Buffer.from(screen3Shot.data, 'base64')
  );
  console.log('✓ Saved mobile_viewport_screen3.jpg');

  cdp.close();
  edgeProc.kill();
  server.kill();
  console.log('Done!');
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});
