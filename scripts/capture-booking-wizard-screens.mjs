import fs from 'fs';
import { spawn } from 'child_process';
import path from 'path';

const artifactDir = "C:\\Users\\PC\\.gemini\\antigravity\\brain\\028241d2-64be-4ca9-89f1-f51955dd1b75";
const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const PORT = 3009;
const nextBin = "d:\\royal-umrah-cabs\\node_modules\\next\\dist\\bin\\next";

console.log('Starting Next.js production server with bin:', nextBin);
const server = spawn(process.execPath, [nextBin, 'start', '-p', String(PORT)], {
  cwd: 'd:\\royal-umrah-cabs',
  stdio: ['ignore', 'pipe', 'pipe'],
});

server.stdout.on('data', (d) => console.log('[Next.js]', d.toString().trim()));
server.stderr.on('data', (d) => console.error('[Next.js Error]', d.toString().trim()));

// Wait for server to be ready
async function waitForServer(retries = 40) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/en/booking`);
      if (res.ok) {
        console.log('Next.js server is ready and responding HTTP 200!');
        return;
      }
    } catch (e) {
      // wait
    }
    await new Promise(r => setTimeout(r, 1000));
  }
  throw new Error('Server did not start in time');
}

try {
  await waitForServer();

  console.log('Launching headless browser...');
  const edgeProcess = spawn(edgePath, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--remote-debugging-port=9244',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  const res = await fetch('http://127.0.0.1:9244/json/list');
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

  const targets = [
    { url: `http://localhost:${PORT}/en/booking`, w: 1440, h: 900, name: 'booking_wizard_desktop_en.png' },
    { url: `http://localhost:${PORT}/ar/booking`, w: 1440, h: 900, name: 'booking_wizard_desktop_ar.png' },
    { url: `http://localhost:${PORT}/en/booking`, w: 390, h: 844, name: 'booking_wizard_mobile_en.png' },
    { url: `http://localhost:${PORT}/ar/booking`, w: 390, h: 844, name: 'booking_wizard_mobile_ar.png' },
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
    await new Promise(r => setTimeout(r, 3500));

    const shot = await sendCommand('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
    const outPath = path.join(artifactDir, t.name);
    fs.writeFileSync(outPath, Buffer.from(shot.data, 'base64'));
    console.log(`Saved screenshot: ${outPath} (${(fs.statSync(outPath).size / 1024).toFixed(1)} KB)`);
  }

  ws.close();
  edgeProcess.kill();
  console.log('All screenshots captured successfully!');
} catch (err) {
  console.error('Error during capture:', err);
} finally {
  server.kill('SIGTERM');
  setTimeout(() => process.exit(0), 1000);
}
