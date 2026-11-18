import fs from 'fs';
import { spawn } from 'child_process';
import path from 'path';

const artifactDir = "C:\\Users\\PC\\.gemini\\antigravity\\brain\\b85e6102-b6eb-4565-9493-6e009226675e";
const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

const edgeProcess = spawn(edgePath, [
  '--headless=new',
  '--no-sandbox',
  '--disable-gpu',
  '--remote-debugging-port=9230',
  'about:blank'
]);

await new Promise(r => setTimeout(r, 2000));

async function getDebuggerUrl() {
  const res = await fetch('http://127.0.0.1:9230/json/list');
  const tabs = await res.json();
  const page = tabs.find(t => t.type === 'page') || tabs[0];
  return page.webSocketDebuggerUrl;
}

try {
  const wsUrl = await getDebuggerUrl();
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
    { url: 'http://localhost:3000/ar/booking', w: 1440, h: 900, name: 'current_booking_ar_desktop' },
    { url: 'http://localhost:3000/ar/booking', w: 390, h: 844, name: 'current_booking_ar_mobile' },
  ];

  for (const t of targets) {
    console.log(`Navigating to ${t.url} (${t.w}x${t.h})...`);
    await sendCommand('Emulation.setDeviceMetricsOverride', {
      width: t.w,
      height: t.h,
      deviceScaleFactor: 1,
      mobile: t.w < 768
    });

    await sendCommand('Page.navigate', { url: t.url });
    await new Promise(r => setTimeout(r, 3500));

    // Full page screenshot
    const layout = await sendCommand('Page.getLayoutMetrics');
    const contentHeight = Math.ceil(layout.contentSize.height);

    await sendCommand('Emulation.setDeviceMetricsOverride', {
      width: t.w,
      height: contentHeight,
      deviceScaleFactor: 1,
      mobile: t.w < 768
    });
    await new Promise(r => setTimeout(r, 500));

    const shot = await sendCommand('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
    fs.writeFileSync(path.join(artifactDir, `${t.name}.png`), Buffer.from(shot.data, 'base64'));
    console.log(`Saved ${t.name}.png`);
  }

  ws.close();
} catch (e) {
  console.error(e);
} finally {
  edgeProcess.kill();
  process.exit(0);
}
