import fs from 'fs';
import { spawn } from 'child_process';
import path from 'path';

const artifactDir = "C:\\Users\\PC\\.gemini\\antigravity\\brain\\b85e6102-b6eb-4565-9493-6e009226675e";
const baseUrl = "http://localhost:3000";

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

await new Promise(r => setTimeout(r, 2500));

async function getDebuggerUrl() {
  const res = await fetch('http://127.0.0.1:9225/json/list');
  const tabs = await res.json();
  const page = tabs.find(t => t.type === 'page') || tabs[0];
  return page.webSocketDebuggerUrl;
}

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

  async function capturePage(urlPath, width, height, filename) {
    console.log(`Navigating to ${baseUrl}${urlPath} at ${width}x${height}...`);
    await sendCommand('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: width < 768,
    });

    await sendCommand('Page.navigate', { url: `${baseUrl}${urlPath}` });
    await new Promise(r => setTimeout(r, 2500));

    // Get full layout metrics for clean full-page capture
    const layout = await sendCommand('Page.getLayoutMetrics');
    const contentWidth = Math.min(width, Math.ceil(layout.contentSize.width));
    const contentHeight = Math.ceil(layout.contentSize.height);

    console.log(`Layout size: ${contentWidth}x${contentHeight}`);

    const shot = await sendCommand('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: true,
      clip: {
        x: 0,
        y: 0,
        width: contentWidth,
        height: contentHeight,
        scale: 1,
      }
    });

    const targetPath = path.join(artifactDir, filename);
    fs.writeFileSync(targetPath, Buffer.from(shot.data, 'base64'));
    console.log(`Saved: ${targetPath} (${Math.round(shot.data.length / 1024)} KB)`);

    // Also take viewport-only fold screenshot
    const foldShot = await sendCommand('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false,
    });
    const foldPath = path.join(artifactDir, filename.replace('.png', '_fold.png'));
    fs.writeFileSync(foldPath, Buffer.from(foldShot.data, 'base64'));
    console.log(`Saved fold: ${foldPath}`);
  }

  // 1. Arabic Fleet Index across viewports
  await capturePage('/ar/fleet', 1440, 900, 'fleet_ar_1440.png');
  await capturePage('/ar/fleet', 1024, 768, 'fleet_ar_1024.png');
  await capturePage('/ar/fleet', 768, 1024, 'fleet_ar_768.png');
  await capturePage('/ar/fleet', 515, 844, 'fleet_ar_515.png');
  await capturePage('/ar/fleet', 390, 844, 'fleet_ar_390.png');
  await capturePage('/ar/fleet', 360, 800, 'fleet_ar_360.png');

  // 2. English Fleet Index desktop & mobile
  await capturePage('/en/fleet', 1440, 900, 'fleet_en_1440.png');
  await capturePage('/en/fleet', 390, 844, 'fleet_en_390.png');

  // 3. Vehicle Detail: Toyota Camry & Hyundai Staria
  await capturePage('/ar/fleet/toyota-camry', 1440, 900, 'vehicle_camry_ar_1440.png');
  await capturePage('/ar/fleet/toyota-camry', 390, 844, 'vehicle_camry_ar_390.png');
  await capturePage('/ar/fleet/hyundai-staria', 1440, 900, 'vehicle_staria_ar_1440.png');
  await capturePage('/ar/fleet/hyundai-staria', 390, 844, 'vehicle_staria_ar_390.png');

  ws.close();
} catch (e) {
  console.error('Error during capture:', e);
} finally {
  edgeProcess.kill();
  console.log('Done!');
}
