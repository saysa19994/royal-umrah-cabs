import fs from 'fs';
import { spawn } from 'child_process';
import path from 'path';

const artifactDir = "C:\\Users\\PC\\.gemini\\antigravity\\brain\\b85e6102-b6eb-4565-9493-6e009226675e";
const baseUrl = "http://localhost:3008";

const edgePath = fs.existsSync("C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe")
  ? "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
  : "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe";

console.log('Using Edge at:', edgePath);

const edgeProcess = spawn(edgePath, [
  '--headless=new',
  '--no-sandbox',
  '--disable-gpu',
  '--remote-debugging-port=9227',
  'about:blank'
]);

await new Promise(r => setTimeout(r, 2500));

async function getDebuggerUrl() {
  const res = await fetch('http://127.0.0.1:9227/json/list');
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
    console.log(`Capturing ${baseUrl}${urlPath} at ${width}x${height}...`);
    await sendCommand('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: width < 768,
    });

    await sendCommand('Page.navigate', { url: `${baseUrl}${urlPath}` });
    await new Promise(r => setTimeout(r, 2000));

    const layout = await sendCommand('Page.getLayoutMetrics');
    const contentWidth = Math.min(width, Math.ceil(layout.contentSize.width));
    const contentHeight = Math.ceil(layout.contentSize.height);

    console.log(`Layout size for ${filename}: ${contentWidth}x${contentHeight}`);

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

    // Viewport-only fold capture
    const foldShot = await sendCommand('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false,
    });
    const foldPath = path.join(artifactDir, filename.replace('.png', '_fold.png'));
    fs.writeFileSync(foldPath, Buffer.from(foldShot.data, 'base64'));
    console.log(`Saved fold: ${foldPath}`);
  }

  // 1. Creative Director Master Deck
  await capturePage('/index.html', 1440, 900, 'creative_director_decision_deck.png');

  // 2. Concept A — Desert Modernism
  await capturePage('/concept-a-desktop.html', 1440, 900, 'concept_a_desert_modernism_desktop.png');
  await capturePage('/concept-a-mobile.html', 390, 844, 'concept_a_desert_modernism_mobile.png');

  // 3. Concept B — Royal Editorial
  await capturePage('/concept-b-desktop.html', 1440, 900, 'concept_b_royal_editorial_desktop.png');
  await capturePage('/concept-b-mobile.html', 390, 844, 'concept_b_royal_editorial_mobile.png');

  // 4. Concept C — Cinematic Sandstone
  await capturePage('/concept-c-desktop.html', 1440, 900, 'concept_c_cinematic_sandstone_desktop.png');
  await capturePage('/concept-c-mobile.html', 390, 844, 'concept_c_cinematic_sandstone_mobile.png');

  ws.close();
} catch (e) {
  console.error('Error during capture:', e);
} finally {
  edgeProcess.kill();
  console.log('Capture complete!');
}
