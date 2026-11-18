import fs from 'fs';
import os from 'os';
import { spawn } from 'child_process';
import path from 'path';

const artifactDir = 'C:\\Users\\PC\\.gemini\\antigravity\\brain\\028241d2-64be-4ca9-89f1-f51955dd1b75';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 3042;
const CDP_PORT = 9270;
const tmpProfileDir = path.join(os.tmpdir(), `edge-arc-profile-${Date.now()}`);
const nextBin = 'd:\\royal-umrah-cabs\\node_modules\\next\\dist\\bin\\next';

console.log('Starting Next.js production server on port', PORT);
const server = spawn(process.execPath, [nextBin, 'start', '-p', String(PORT)], {
  cwd: 'd:\\royal-umrah-cabs',
  stdio: ['ignore', 'pipe', 'pipe'],
});

server.stdout.on('data', (d) => console.log('[Next.js]', d.toString().trim()));
server.stderr.on('data', (d) => console.error('[Next.js Error]', d.toString().trim()));

async function waitForServer(retries = 35) {
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
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error('Server did not start in time');
}

try {
  await waitForServer();

  console.log('Launching headless Edge browser...');
  fs.mkdirSync(tmpProfileDir, { recursive: true });
  const edgeProcess = spawn(edgePath, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--user-data-dir=${tmpProfileDir}`,
    `--remote-debugging-port=${CDP_PORT}`,
    'about:blank',
  ]);

  await new Promise((r) => setTimeout(r, 2500));

  const res = await fetch(`http://127.0.0.1:${CDP_PORT}/json/list`);
  const tabs = await res.json();
  const page = tabs.find((t) => t.type === 'page') || tabs[0];
  const wsUrl = page.webSocketDebuggerUrl;

  const ws = new WebSocket(wsUrl);
  await new Promise((r) => {
    ws.onopen = r;
  });

  let id = 1;
  function sendCommand(method, params = {}, timeoutMs = 8000) {
    return new Promise((resolve) => {
      const msgId = id++;
      const timer = setTimeout(() => {
        ws.removeEventListener('message', handler);
        resolve({});
      }, timeoutMs);
      const handler = (event) => {
        try {
          const msg = JSON.parse(event.data);
          if (msg.id === msgId) {
            clearTimeout(timer);
            ws.removeEventListener('message', handler);
            resolve(msg.result);
          }
        } catch (e) {}
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await sendCommand('Page.enable');
  await sendCommand('DOM.enable');
  await sendCommand('Runtime.enable');

  const targets = [
    { url: `http://127.0.0.1:${PORT}/ar`, w: 1440, h: 920, name: 'arc_gallery_desktop_ar.png' },
    { url: `http://127.0.0.1:${PORT}/en`, w: 1440, h: 920, name: 'arc_gallery_desktop_en.png' },
    { url: `http://127.0.0.1:${PORT}/en`, w: 768, h: 900, name: 'arc_gallery_tablet_en.png' },
    { url: `http://127.0.0.1:${PORT}/ar`, w: 390, h: 844, name: 'arc_gallery_mobile_ar.png' },
    { url: `http://127.0.0.1:${PORT}/en`, w: 390, h: 844, name: 'arc_gallery_mobile_en.png' },
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
    await new Promise((r) => setTimeout(r, 2600));

    // Scroll Arc Destination Gallery into center view cleanly
    await sendCommand('Runtime.evaluate', {
      expression: `
        const sec = document.getElementById('arc-destination-gallery');
        if (sec) sec.scrollIntoView({ behavior: 'instant', block: 'center' });
      `,
    });
    await new Promise((r) => setTimeout(r, 2200));

    const audit = await sendCommand('Runtime.evaluate', {
      returnByValue: true,
      expression: `(() => {
        const sec = document.getElementById('arc-destination-gallery');
        if (!sec) return { error: 'Missing #arc-destination-gallery' };
        const driftEl = sec.querySelector('.arc-gallery-drift');
        const driftStyle = driftEl ? window.getComputedStyle(driftEl) : null;
        const stageStyle = window.getComputedStyle(sec);
        const visibleSlots = Array.from(sec.querySelectorAll('.arc-slot')).filter(el => el.offsetParent !== null);
        const visibleImgs = visibleSlots.map(s => s.querySelector('img')).filter(Boolean);
        const brokenVisibleImgs = visibleImgs.filter(img => !img.complete || img.naturalWidth === 0).map(i => i.src);
        const allAltsNonEmpty = visibleImgs.every(img => (img.getAttribute('alt') || '').trim().length > 5);
        const cta = sec.querySelector('a[href*="/ziyarat"]');
        return {
          dir: sec.getAttribute('dir'),
          arcDirVar: stageStyle.getPropertyValue('--arc-dir').trim(),
          animationName: driftStyle?.animationName || '',
          visibleCardsCount: visibleSlots.length,
          allAltsNonEmpty,
          ctaHref: cta?.getAttribute('href'),
          ctaHeight: cta ? Math.round(cta.getBoundingClientRect().height) : 0,
          horizontalOverflowPx: document.documentElement.scrollWidth - window.innerWidth,
          brokenVisibleImgs,
        };
      })()`,
    });
    console.log(`[Audit ${t.name}]`, JSON.stringify(audit?.result?.value));

    const shot = await sendCommand('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false,
    });
    if (shot && shot.data) {
      const outPath = path.join(artifactDir, t.name);
      fs.writeFileSync(outPath, Buffer.from(shot.data, 'base64'));
      console.log(`Saved screenshot: ${outPath} (${(fs.statSync(outPath).size / 1024).toFixed(1)} KB)`);
    } else {
      throw new Error(`Screenshot capture returned no data for ${t.name}`);
    }
  }

  // Test 360px mobile width & prefers-reduced-motion mode
  await sendCommand('Emulation.setDeviceMetricsOverride', {
    width: 360,
    height: 780,
    deviceScaleFactor: 1,
    mobile: true,
  });
  await sendCommand('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
  });
  await sendCommand('Page.navigate', { url: `http://127.0.0.1:${PORT}/ar` });
  await new Promise((r) => setTimeout(r, 2200));
  const reducedAudit = await sendCommand('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const sec = document.getElementById('arc-destination-gallery');
      const drift = sec?.querySelector('.arc-gallery-drift');
      return {
        overflow360px: document.documentElement.scrollWidth - window.innerWidth,
        reducedMotionAnimName: drift ? window.getComputedStyle(drift).animationName : null,
        reducedMotionTransform: drift ? window.getComputedStyle(drift).transform : null,
      };
    })()`,
  });
  console.log('[Audit 360px & Reduced Motion]', JSON.stringify(reducedAudit?.result?.value));

  ws.close();
  edgeProcess.kill();
  console.log('All Arc Gallery screenshots & audits completed successfully!');
} catch (err) {
  console.error('Error during capture:', err);
  process.exitCode = 1;
} finally {
  server.kill('SIGTERM');
  setTimeout(() => process.exit(process.exitCode || 0), 1000);
}
