import fs from 'fs';
import os from 'os';
import { spawn } from 'child_process';
import path from 'path';

const artifactDir = 'C:\\Users\\PC\\.gemini\\antigravity\\brain\\028241d2-64be-4ca9-89f1-f51955dd1b75';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 3048;
const CDP_PORT = 9276;
const tmpProfileDir = path.join(os.tmpdir(), `edge-whatsapp-profile-${Date.now()}`);
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
    { url: `http://127.0.0.1:${PORT}/ar`, w: 1440, h: 920, name: 'whatsapp_concierge_desktop_ar.png', scrollY: 700 },
    { url: `http://127.0.0.1:${PORT}/en`, w: 1440, h: 920, name: 'whatsapp_concierge_desktop_en.png', scrollY: 700 },
    { url: `http://127.0.0.1:${PORT}/en`, w: 768, h: 900, name: 'whatsapp_concierge_tablet_en.png', scrollY: 700 },
    { url: `http://127.0.0.1:${PORT}/ar`, w: 390, h: 844, name: 'whatsapp_concierge_mobile_ar.png', scrollY: 950 },
    { url: `http://127.0.0.1:${PORT}/en`, w: 390, h: 844, name: 'whatsapp_concierge_mobile_en.png', scrollY: 950 },
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
    await new Promise((r) => setTimeout(r, 2400));

    await sendCommand('Runtime.evaluate', {
      expression: `window.scrollTo({ top: ${t.scrollY}, behavior: 'instant' });`,
    });
    await new Promise((r) => setTimeout(r, 900));

    const audit = await sendCommand('Runtime.evaluate', {
      returnByValue: true,
      expression: `(() => {
        const aside = document.querySelector('[data-whatsapp-concierge="true"]');
        if (!aside) return { error: 'Missing [data-whatsapp-concierge]' };
        const link = aside.querySelector('a');
        const img = aside.querySelector('img');
        const backTop = aside.querySelector('button');
        const mobileDock = document.querySelector('[aria-label="Mobile Chauffeur Dock"]');
        const aiWidget = document.querySelector('button[aria-label="Open AI Chauffeur Assistant"]');

        const linkRect = link?.getBoundingClientRect();
        const backTopRect = backTop?.getBoundingClientRect();
        const dockRect = mobileDock?.getBoundingClientRect();
        const aiRect = aiWidget?.getBoundingClientRect();

        return {
          dir: aside.getAttribute('dir'),
          href: link?.getAttribute('href'),
          ariaLabel: link?.getAttribute('aria-label'),
          text: link?.textContent?.replace(/\\s+/g, ' ').trim(),
          logoLoaded: Boolean(img && img.complete && img.naturalWidth > 0),
          pillHeight: linkRect ? Math.round(linkRect.height) : 0,
          pillWidth: linkRect ? Math.round(linkRect.width) : 0,
          pillLeft: linkRect ? Math.round(linkRect.left) : 0,
          pillRight: linkRect ? Math.round(linkRect.right) : 0,
          pillBottom: linkRect ? Math.round(linkRect.bottom) : 0,
          dockTop: dockRect && dockRect.height > 0 ? Math.round(dockRect.top) : null,
          dockGapPx: dockRect && linkRect && dockRect.height > 0 ? Math.round(dockRect.top - linkRect.bottom) : null,
          viewportWidth: window.innerWidth,
          backToTopNonOverlap: backTopRect && linkRect ? Math.round(backTopRect.bottom) <= Math.round(linkRect.top) : true,
          mobileDockNonOverlap: dockRect && linkRect && dockRect.height > 0 ? Math.round(linkRect.bottom) <= Math.round(dockRect.top) : true,
          aiWidgetNonOverlap: aiRect && linkRect && aiRect.width > 0 ? (linkRect.right < aiRect.left || linkRect.left > aiRect.right) : true,
          horizontalOverflowPx: document.documentElement.scrollWidth - window.innerWidth,
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

  // Verify Booking Wizard Step 1 visible -> Step 4 final submission hides Floating WhatsApp Concierge
  await sendCommand('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 920,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await sendCommand('Page.navigate', { url: `http://127.0.0.1:${PORT}/en/booking` });
  await new Promise((r) => setTimeout(r, 2400));

  const step1Audit = await sendCommand('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const visibleOnStep1 = document.querySelectorAll('[data-whatsapp-concierge="true"]').length;
      const step1Btn = Array.from(document.querySelectorAll('button')).find(
        b => b.offsetParent !== null && (b.textContent || '').includes('Continue to Select Vehicle')
      );
      step1Btn?.click();
      return {
        visibleOnStep1,
        foundStep1Btn: Boolean(step1Btn),
        initialDatasetStep: document.documentElement.dataset.bookingWizardStep,
      };
    })()`,
  });
  await new Promise((r) => setTimeout(r, 400));

  await sendCommand('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const step2Btn = Array.from(document.querySelectorAll('button')).find(
        b => b.offsetParent !== null && (b.textContent || '').includes('Continue to Passenger Details')
      );
      step2Btn?.click();
      return Boolean(step2Btn);
    })()`,
  });
  await new Promise((r) => setTimeout(r, 500));

  await sendCommand('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const step3Btn = Array.from(document.querySelectorAll('button')).find(
        b => b.offsetParent !== null && (b.textContent || '').includes('Confirm Booking Request')
      );
      step3Btn?.click();
      return Boolean(step3Btn);
    })()`,
  });
  await new Promise((r) => setTimeout(r, 600));

  const step4Audit = await sendCommand('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => ({
      visibleOnStep4: document.querySelectorAll('[data-whatsapp-concierge="true"]').length,
      datasetStepOn4: document.documentElement.dataset.bookingWizardStep,
      step4HeadingVisible: Boolean(
        Array.from(document.querySelectorAll('h3')).find(h => h.offsetParent !== null && (h.textContent || '').includes('Passenger'))
      ),
    }))()`,
  });
  console.log('[Booking Step 4 Hide Audit]', JSON.stringify({
    ...step1Audit?.result?.value,
    ...step4Audit?.result?.value,
  }));

  const step4Shot = await sendCommand('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  if (step4Shot && step4Shot.data) {
    const outPath = path.join(artifactDir, 'whatsapp_concierge_booking_step4_hidden.png');
    fs.writeFileSync(outPath, Buffer.from(step4Shot.data, 'base64'));
    console.log(`Saved booking step 4 screenshot: ${outPath}`);
  }

  // Test 360px Mobile Overflow & Reduced Motion
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
  await sendCommand('Runtime.evaluate', { expression: `window.scrollTo({ top: 900, behavior: 'instant' });` });
  await new Promise((r) => setTimeout(r, 600));
  const m360Audit = await sendCommand('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const aside = document.querySelector('[data-whatsapp-concierge="true"]');
      const link = aside?.querySelector('a');
      return {
        overflow360px: document.documentElement.scrollWidth - window.innerWidth,
        pillWidth360: link ? Math.round(link.getBoundingClientRect().width) : 0,
        reducedMotionDuration: link ? window.getComputedStyle(link).transitionDuration : null,
      };
    })()`,
  });
  console.log('[360px & Reduced Motion Audit]', JSON.stringify(m360Audit?.result?.value));

  try {
    ws.close();
  } catch (e) {}
  try {
    edgeProcess.kill();
  } catch (e) {}
  try {
    fs.rmSync(tmpProfileDir, { recursive: true, force: true });
  } catch (e) {}
} finally {
  try {
    server.kill();
  } catch (e) {}
  process.exit(0);
}
