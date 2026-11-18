import fs from 'fs';
import { spawn } from 'child_process';
import path from 'path';

const evidenceDir = "C:\\Users\\PC\\.gemini\\antigravity\\brain\\028241d2-64be-4ca9-89f1-f51955dd1b75\\dual_theme_evidence";
fs.mkdirSync(evidenceDir, { recursive: true });

const baseUrl = "http://127.0.0.1:3000";

const edgePath = fs.existsSync("C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe")
  ? "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
  : "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe";

console.log('Using Edge at:', edgePath);

const edgeProcess = spawn(edgePath, [
  '--headless=new',
  '--no-sandbox',
  '--disable-gpu',
  '--remote-debugging-port=9226',
  'about:blank'
]);

await new Promise(r => setTimeout(r, 2000));

async function getDebuggerUrl() {
  const res = await fetch('http://127.0.0.1:9226/json/list');
  const tabs = await res.json();
  const page = tabs.find(t => t.type === 'page') || tabs[0];
  return page.webSocketDebuggerUrl;
}

const pages = [
  { name: 'homepage', path: '/ar' },
  { name: 'booking', path: '/ar/booking' },
  { name: 'pricing', path: '/ar/pricing' },
  { name: 'fleet', path: '/ar/fleet' },
  { name: 'vehicle_camry', path: '/ar/fleet/toyota-camry' },
  { name: 'services', path: '/ar/services' },
  { name: 'ziyarat', path: '/ar/ziyarat' },
  { name: 'blog', path: '/ar/blog' },
  { name: 'about', path: '/ar/about' },
  { name: 'contact', path: '/ar/contact' }
];

try {
  const wsUrl = await getDebuggerUrl();
  console.log('Connected to CDP at:', wsUrl);

  const ws = new WebSocket(wsUrl);
  await new Promise(r => { ws.onopen = r; });

  let id = 1;
  function sendCommand(method, params = {}) {
    return new Promise((resolve, reject) => {
      const msgId = id++;
      const handler = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === msgId) {
          ws.removeEventListener('message', handler);
          if (msg.error) reject(msg.error);
          else resolve(msg.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await sendCommand('Page.enable');
  await sendCommand('DOM.enable');

  const themes = ['light', 'dark'];
  const viewports = [
    { label: 'desktop', width: 1440, height: 900, mobile: false },
    { label: 'mobile', width: 390, height: 844, mobile: true }
  ];

  for (const page of pages) {
    const pageUrl = `${baseUrl}${page.path}`;
    for (const theme of themes) {
      for (const vp of viewports) {
        const screenshotName = `${page.name}_${theme}_${vp.label}.png`;
        console.log(`Capturing: ${screenshotName} (${pageUrl})...`);

        await sendCommand('Emulation.setDeviceMetricsOverride', {
          width: vp.width,
          height: vp.height,
          deviceScaleFactor: 1,
          mobile: vp.mobile
        });

        await sendCommand('Page.navigate', { url: pageUrl });
        await new Promise(r => setTimeout(r, 1800));

        // Enforce the exact theme via DOM and localStorage
        await sendCommand('Runtime.evaluate', {
          expression: `
            (function() {
              const theme = '${theme}';
              document.documentElement.setAttribute('data-theme', theme);
              if (theme === 'dark') {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
              try { localStorage.setItem('duyuf_theme_preference', theme); } catch (e) {}
            })();
          `
        });

        await new Promise(r => setTimeout(r, 500));

        // Capture full-page or tall screenshot
        const shot = await sendCommand('Page.captureScreenshot', {
          format: 'png',
          captureBeyondViewport: false
        });

        const filePath = path.join(evidenceDir, screenshotName);
        fs.writeFileSync(filePath, Buffer.from(shot.data, 'base64'));
        console.log(`Saved: ${filePath}`);
      }
    }
  }

  ws.close();
  console.log('All dual-theme screenshots successfully captured!');
} catch (err) {
  console.error('Error during capture:', err);
} finally {
  edgeProcess.kill();
}
