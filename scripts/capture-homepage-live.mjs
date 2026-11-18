import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

const projectRoot = 'D:/royal-umrah-cabs';
const artifactsDir = 'C:/Users/PC/.gemini/antigravity/brain/b85e6102-b6eb-4565-9493-6e009226675e';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const fallbackEdge = 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe';
const binary = fs.existsSync(edgePath) ? edgePath : fallbackEdge;

const PORT = 3029;
const DEBUG_PORT = 9246;

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

async function captureTarget(cdp, { url, isMobile, width, height, filename }) {
  console.log(`Capturing ${filename} (${isMobile ? 'Mobile' : 'Desktop'} from ${url})...`);
  
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: width || (isMobile ? 390 : 1440),
    height: height || (isMobile ? 844 : 900),
    deviceScaleFactor: 2,
    mobile: isMobile,
  });

  if (isMobile) {
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

  await cdp.send('Page.navigate', { url });
  await new Promise((r) => setTimeout(r, 2500));

  await cdp.send('Runtime.evaluate', {
    expression: `
      window.scrollTo(0, 0);
      const header = document.querySelector('header');
      if (header) {
        header.style.position = 'absolute';
        header.style.top = '0';
      }
    `,
  });
  await new Promise((r) => setTimeout(r, 600));

  const shot = await cdp.send('Page.captureScreenshot', {
    format: 'jpeg',
    quality: 92,
    captureBeyondViewport: true,
    fromSurface: true,
  });

  const outPath = path.join(artifactsDir, filename);
  fs.writeFileSync(outPath, Buffer.from(shot.data, 'base64'));
  console.log(`✓ Saved ${filename} (${(shot.data.length * 0.75 / 1024).toFixed(0)} KB)`);
}

async function main() {
  console.log('Starting Next.js production server on port ' + PORT + '...');
  const server = spawn('node', ['node_modules/next/dist/bin/next', 'start', '-p', String(PORT)], {
    cwd: projectRoot,
    stdio: 'ignore',
  });

  const ready = await waitForHttp(`http://localhost:${PORT}/en`);
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
  const cdp = new CdpSession(pageTab.webSocketDebuggerUrl);
  await cdp.connect();
  await cdp.send('Page.enable');
  await cdp.send('DOM.enable');
  await cdp.send('Runtime.enable');

  try {
    await captureTarget(cdp, {
      url: `http://localhost:${PORT}/en`,
      isMobile: false,
      filename: 'home_desktop_live.jpg',
    });

    await captureTarget(cdp, {
      url: `http://localhost:${PORT}/en`,
      isMobile: true,
      filename: 'home_mobile_live.jpg',
    });
  } finally {
    cdp.close();
    edgeProc.kill();
    server.kill();
  }

  console.log('HOMEPAGE CAPTURED!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
