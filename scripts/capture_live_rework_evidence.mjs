import fs from 'fs';
import { spawn } from 'child_process';
import path from 'path';

const artifactDir = "C:\\Users\\PC\\.gemini\\antigravity\\brain\\028241d2-64be-4ca9-89f1-f51955dd1b75\\rework_evidence";
fs.mkdirSync(artifactDir, { recursive: true });

const baseUrl = "http://127.0.0.1:3000";

const edgePath = fs.existsSync("C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe")
  ? "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
  : "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe";

console.log('Using Edge at:', edgePath);

const edgeProcess = spawn(edgePath, [
  '--headless=new',
  '--no-sandbox',
  '--disable-gpu',
  '--remote-debugging-port=9225',
  'about:blank'
]);

await new Promise(r => setTimeout(r, 2000));

async function getDebuggerUrl() {
  const res = await fetch('http://127.0.0.1:9225/json/list');
  const tabs = await res.json();
  const page = tabs.find(t => t.type === 'page') || tabs[0];
  return page.webSocketDebuggerUrl;
}

const targets = [
  { name: 'homepage_mobile_326px.png', url: `${baseUrl}/ar`, width: 326, height: 900 },
  { name: 'fleet_desktop_1575px.png', url: `${baseUrl}/ar/fleet`, width: 1575, height: 1000 },
  { name: 'fleet_mobile_326px.png', url: `${baseUrl}/ar/fleet`, width: 326, height: 900 },
  { name: 'booking_desktop_1920px.png', url: `${baseUrl}/ar/booking`, width: 1920, height: 1080 },
  { name: 'booking_mobile_326px.png', url: `${baseUrl}/ar/booking`, width: 326, height: 900 },
  { name: 'services_desktop_1440px.png', url: `${baseUrl}/ar/services`, width: 1440, height: 900 },
  { name: 'about_desktop_1440px.png', url: `${baseUrl}/ar/about`, width: 1440, height: 900 },
  { name: 'ziyarat_desktop_1440px.png', url: `${baseUrl}/ar/ziyarat`, width: 1440, height: 900 },
  { name: 'blog_desktop_1440px.png', url: `${baseUrl}/ar/blog`, width: 1440, height: 900 },
];

try {
  const wsUrl = await getDebuggerUrl();
  console.log('Connected to CDP at:', wsUrl);

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

  for (const t of targets) {
    console.log(`Capturing ${t.name} at ${t.width}x${t.height} (${t.url})...`);
    await sendCommand('Emulation.setDeviceMetricsOverride', {
      width: t.width,
      height: t.height,
      deviceScaleFactor: 1,
      mobile: t.width < 768
    });

    await sendCommand('Page.navigate', { url: t.url });
    await new Promise(r => setTimeout(r, 2200));

    const shot = await sendCommand('Page.captureScreenshot', { format: 'png' });
    const filePath = path.join(artifactDir, t.name);
    fs.writeFileSync(filePath, Buffer.from(shot.data, 'base64'));
    console.log(`Saved screenshot to: ${filePath}`);
  }

  ws.close();
} catch (err) {
  console.error('Error during capture:', err);
} finally {
  edgeProcess.kill();
  console.log('Evidence capture completed.');
}
