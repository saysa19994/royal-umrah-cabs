import fs from 'fs';
import os from 'os';
import { spawn } from 'child_process';
import path from 'path';

const artifactDir = 'C:\\Users\\PC\\.gemini\\antigravity\\brain\\028241d2-64be-4ca9-89f1-f51955dd1b75';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 3046;
const CDP_PORT = 9274;
const tmpProfileDir = path.join(os.tmpdir(), `edge-routes-profile-${Date.now()}`);
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
    { url: `http://127.0.0.1:${PORT}/ar`, w: 1440, h: 920, name: 'routes_explorer_desktop_ar.png' },
    { url: `http://127.0.0.1:${PORT}/en`, w: 1440, h: 920, name: 'routes_explorer_desktop_en.png' },
    { url: `http://127.0.0.1:${PORT}/en`, w: 768, h: 900, name: 'routes_explorer_tablet_en.png' },
    { url: `http://127.0.0.1:${PORT}/ar`, w: 390, h: 844, name: 'routes_explorer_mobile_ar.png' },
    { url: `http://127.0.0.1:${PORT}/en`, w: 390, h: 844, name: 'routes_explorer_mobile_en.png' },
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
    await new Promise((r) => setTimeout(r, 2500));

    await sendCommand('Runtime.evaluate', {
      expression: `
        const sec = document.getElementById('routes');
        if (sec) {
          const y = sec.getBoundingClientRect().top + window.scrollY - 88;
          window.scrollTo({ top: Math.max(0, y), behavior: 'instant' });
        }
      `,
    });
    await new Promise((r) => setTimeout(r, 1500));

    const audit = await sendCommand('Runtime.evaluate', {
      returnByValue: true,
      expression: `(() => {
        const sec = document.getElementById('routes');
        if (!sec) return { error: 'Missing #routes' };
        const visibleImgs = Array.from(sec.querySelectorAll('img')).filter(el => el.offsetParent !== null);
        const brokenVisibleImgs = visibleImgs.filter(img => !img.complete || img.naturalWidth === 0).map(i => i.src);
        const allAltsNonEmpty = visibleImgs.every(img => (img.getAttribute('alt') || '').trim().length > 3);
        const h2 = sec.querySelector('#routes-explorer-heading');
        const priceChip = sec.querySelector('[data-route-price-chip="true"]');
        const bookCta = Array.from(sec.querySelectorAll('a[href*="/booking?route="]')).pop();
        const prevBtn = sec.querySelector('button[aria-label*="Previous"], button[aria-label*="السابق"]');
        const nextBtn = sec.querySelector('button[aria-label*="Next"], button[aria-label*="التالي"]');
        const desktopProminent = sec.querySelector('.flex-\\\\[1\\\\.55\\\\]');
        const mobileList = sec.querySelector('[role="list"]');
        return {
          dir: sec.getAttribute('dir'),
          visibleImgsCount: visibleImgs.length,
          allAltsNonEmpty,
          brokenVisibleImgs,
          h2Text: h2?.textContent?.trim(),
          hasPriceChip: Boolean(priceChip),
          priceText: priceChip?.textContent?.replace(/\\s+/g, ' ').trim() || null,
          bookHref: bookCta?.getAttribute('href'),
          bookCtaHeight: bookCta ? Math.round(bookCta.getBoundingClientRect().height) : 0,
          prevBtnSize: prevBtn ? Math.round(prevBtn.getBoundingClientRect().height) : 0,
          nextBtnSize: nextBtn ? Math.round(nextBtn.getBoundingClientRect().height) : 0,
          horizontalOverflowPx: document.documentElement.scrollWidth - window.innerWidth,
          mobileOrderOk: t_is_mobile ? Boolean(h2 && mobileList && h2.getBoundingClientRect().bottom <= mobileList.getBoundingClientRect().top) : true,
          rtlDesktopFlipped: t_is_rtl_desktop && desktopProminent ? Math.round(h2.getBoundingClientRect().left) > Math.round(desktopProminent.getBoundingClientRect().left) : null,
        };
      })()`.replace('t_is_mobile', String(t.w < 1024)).replace('t_is_rtl_desktop', String(t.url.endsWith('/ar') && t.w >= 1024)),
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

  // Test interactive transitions on Desktop EN: Next click, ArrowRight x1 -> reaches route index 2 (Makkah -> Madinah)
  await sendCommand('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 920,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await sendCommand('Page.navigate', { url: `http://127.0.0.1:${PORT}/en` });
  await new Promise((r) => setTimeout(r, 2200));

  const initInfo = await sendCommand('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const sec = document.getElementById('routes');
      const y = sec.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top: Math.max(0, y), behavior: 'instant' });
      const nextBtn = sec.querySelector('button[aria-label="Next route"]');
      const beforeTitle = sec.querySelector('#routes-explorer-heading')?.textContent?.trim();
      const beforePrice = sec.querySelector('[data-route-price-chip="true"]')?.textContent?.replace(/\\s+/g, ' ').trim();
      const beforeHref = sec.querySelector('a[href*="/booking?route="]')?.getAttribute('href');
      nextBtn?.click();
      return { beforeTitle, beforePrice, beforeHref };
    })()`,
  });
  await new Promise((r) => setTimeout(r, 250));
  const afterNextClick = await sendCommand('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const sec = document.getElementById('routes');
      const afterNextTitle = sec.querySelector('#routes-explorer-heading')?.textContent?.trim();
      const afterNextHref = sec.querySelector('a[href*="/booking?route="]')?.getAttribute('href');
      // Press ArrowRight while focused inside section -> should move to route 03 (Makkah -> Madinah)
      const nextBtn = sec.querySelector('button[aria-label="Next route"]');
      nextBtn?.focus();
      nextBtn?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
      return { afterNextTitle, afterNextHref };
    })()`,
  });
  await new Promise((r) => setTimeout(r, 500));
  const afterArrowKey = await sendCommand('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const sec = document.getElementById('routes');
      const afterArrowTitle = sec.querySelector('#routes-explorer-heading')?.textContent?.trim();
      const afterArrowPrice = sec.querySelector('[data-route-price-chip="true"]')?.textContent?.replace(/\\s+/g, ' ').trim();
      const afterArrowHref = sec.querySelector('a[href*="/booking?route="]')?.getAttribute('href');
      return { afterArrowTitle, afterArrowPrice, afterArrowHref };
    })()`,
  });
  console.log('[Interactive EN Audit]', JSON.stringify({
    ...initInfo?.result?.value,
    ...afterNextClick?.result?.value,
    ...afterArrowKey?.result?.value,
  }));

  const interactiveShot = await sendCommand('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  if (interactiveShot && interactiveShot.data) {
    const outPath = path.join(artifactDir, 'routes_explorer_interactive_en.png');
    fs.writeFileSync(outPath, Buffer.from(interactiveShot.data, 'base64'));
    console.log(`Saved interactive screenshot: ${outPath}`);
  }

  // Test RTL reversed arrow key in /ar: pressing ArrowLeft on /ar must advance NEXT!
  await sendCommand('Page.navigate', { url: `http://127.0.0.1:${PORT}/ar` });
  await new Promise((r) => setTimeout(r, 2000));
  await sendCommand('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const sec = document.getElementById('routes');
      const nextBtn = sec.querySelector('button[aria-label="المسار التالي"]');
      nextBtn?.focus();
      nextBtn?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    })()`,
  });
  await new Promise((r) => setTimeout(r, 300));
  const rtlArrowRes = await sendCommand('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const sec = document.getElementById('routes');
      return {
        rtlAfterArrowLeftTitle: sec.querySelector('#routes-explorer-heading')?.textContent?.trim(),
        rtlAfterArrowLeftHref: sec.querySelector('a[href*="/booking?route="]')?.getAttribute('href'),
      };
    })()`,
  });
  console.log('[RTL Arrow Audit]', JSON.stringify(rtlArrowRes?.result?.value));

  // Verify Booking integration route HTTP status on selected deep-link
  const bookingUrl = `http://127.0.0.1:${PORT}/en/booking?route=makkah-to-madinah`;
  const bookingRes = await fetch(bookingUrl);
  console.log('[Deep-link HTTP Status]', bookingUrl, bookingRes.status);

  // Test 360px Mobile & prefers-reduced-motion
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
  const mobile360Audit = await sendCommand('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const sec = document.getElementById('routes');
      const img = sec?.querySelector('img');
      return {
        overflow360px: document.documentElement.scrollWidth - window.innerWidth,
        reducedMotionDuration: img ? window.getComputedStyle(img).transitionDuration : null,
      };
    })()`,
  });
  console.log('[360px & Reduced Motion Audit]', JSON.stringify(mobile360Audit?.result?.value));

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
