import fs from 'fs';
import { spawn } from 'child_process';
import path from 'path';

const artifactDir = "C:\\Users\\PC\\.gemini\\antigravity\\brain\\028241d2-64be-4ca9-89f1-f51955dd1b75";
const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const PORT = 3020;
const nextBin = "d:\\royal-umrah-cabs\\node_modules\\next\\dist\\bin\\next";

console.log('Starting Next.js production server on port', PORT);
const server = spawn(process.execPath, [nextBin, 'start', '-p', String(PORT)], {
  cwd: 'd:\\royal-umrah-cabs',
  stdio: ['ignore', 'pipe', 'pipe'],
});

server.stdout.on('data', (d) => console.log('[Next.js]', d.toString().trim()));
server.stderr.on('data', (d) => console.error('[Next.js Error]', d.toString().trim()));

async function waitForServer(retries = 30) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/en`);
      if (res.ok) {
        console.log('Next.js server is ready and responding HTTP 200!');
        return;
      }
    } catch (e) {
      if (i % 5 === 0) console.log(`[Wait probe ${i}]`, e.code || e.message);
    }
    await new Promise(r => setTimeout(r, 1000));
  }
  throw new Error('Server did not start in time');
}

try {
  await waitForServer();

  console.log('Launching headless Edge browser...');
  const edgeProcess = spawn(edgePath, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--remote-debugging-port=9248',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  const res = await fetch('http://127.0.0.1:9248/json/list');
  const tabs = await res.json();
  const page = tabs.find(t => t.type === 'page') || tabs[0];
  const wsUrl = page.webSocketDebuggerUrl;

  const ws = new WebSocket(wsUrl);
  await new Promise(r => { ws.onopen = r; });

  let id = 1;
  function sendCommand(method, params = {}) {
    return new Promise((resolve) => {
      const msgId = id++;
      const handler = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === msgId) {
          ws.removeEventListener('message', handler);
          resolve(msg.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await sendCommand('Page.enable');
  await sendCommand('DOM.enable');
  await sendCommand('Runtime.enable');

  const targets = [
    { url: `http://127.0.0.1:${PORT}/ar/pricing`, w: 1440, h: 950, name: 'pricing_desktop_ar.png', scrollY: 350 },
    { url: `http://127.0.0.1:${PORT}/en/pricing`, w: 1440, h: 950, name: 'pricing_desktop_en.png', scrollY: 350 },
    { url: `http://127.0.0.1:${PORT}/ar/pricing`, w: 390, h: 844, name: 'pricing_mobile_ar.png', scrollY: 380 },
    { url: `http://127.0.0.1:${PORT}/en/pricing`, w: 390, h: 844, name: 'pricing_mobile_en.png', scrollY: 380 },
    { url: `http://127.0.0.1:${PORT}/ar/pricing`, w: 1440, h: 950, name: 'pricing_matrix_desktop.png', scrollY: 1550 },
  ];

  for (const t of targets) {
    console.log(`Navigating to ${t.url} (${t.w}x${t.h})...`);
    await sendCommand('Emulation.setDeviceMetricsOverride', {
      width: t.w,
      height: t.h,
      deviceScaleFactor: 1,
      mobile: t.w < 768,
    });

    await sendCommand('Page.navigate', { url: t.url });
    await new Promise(r => setTimeout(r, 3000));

    if (t.scrollY) {
      await sendCommand('Runtime.evaluate', {
        expression: `window.scrollTo({ top: ${t.scrollY}, behavior: 'instant' });`,
      });
      await new Promise(r => setTimeout(r, 1500));
    }

    const shot = await sendCommand('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
    const outPath = path.join(artifactDir, t.name);
    fs.writeFileSync(outPath, Buffer.from(shot.data, 'base64'));
    console.log(`Saved screenshot: ${outPath} (${(fs.statSync(outPath).size / 1024).toFixed(1)} KB)`);
  }

  ws.close();
  edgeProcess.kill();
  console.log('All pricing screenshots captured successfully!');
} catch (err) {
  console.error('Error during capture:', err);
} finally {
  server.kill('SIGTERM');
  setTimeout(() => process.exit(0), 1000);
}
