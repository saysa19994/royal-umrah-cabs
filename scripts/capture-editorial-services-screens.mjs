import fs from 'fs';
import os from 'os';
import { spawn } from 'child_process';
import path from 'path';

const artifactDir = 'C:\\Users\\PC\\.gemini\\antigravity\\brain\\028241d2-64be-4ca9-89f1-f51955dd1b75';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 3044;
const CDP_PORT = 9272;
const tmpProfileDir = path.join(os.tmpdir(), `edge-services-profile-${Date.now()}`);
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
    { url: `http://127.0.0.1:${PORT}/ar`, w: 1440, h: 920, name: 'editorial_services_desktop_ar.png', block: 'center' },
    { url: `http://127.0.0.1:${PORT}/en`, w: 1440, h: 920, name: 'editorial_services_desktop_en.png', block: 'center' },
    { url: `http://127.0.0.1:${PORT}/en`, w: 768, h: 900, name: 'editorial_services_tablet_en.png', block: 'start' },
    { url: `http://127.0.0.1:${PORT}/ar`, w: 390, h: 844, name: 'editorial_services_mobile_ar.png', block: 'start' },
    { url: `http://127.0.0.1:${PORT}/en`, w: 390, h: 844, name: 'editorial_services_mobile_en.png', block: 'start' },
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
        const sec = document.getElementById('services');
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
        const sec = document.getElementById('services');
        if (!sec) return { error: 'Missing #services' };
        const imgs = Array.from(sec.querySelectorAll('img')).filter(el => {
          const st = window.getComputedStyle(el.parentElement || el);
          return st.opacity !== '0' && el.offsetParent !== null;
        });
        const brokenVisibleImgs = imgs.filter(img => !img.complete || img.naturalWidth === 0).map(i => i.src);
        const allAltsNonEmpty = imgs.every(img => (img.getAttribute('alt') || '').trim().length > 5);
        const h2 = sec.querySelector('h2');
        const h3 = sec.querySelector('h3');
        const links = Array.from(sec.querySelectorAll('a'));
        const primaryCta = links.find(l => l.getAttribute('href')?.includes('booking') || l.getAttribute('href')?.includes('routes') || l.getAttribute('href')?.includes('ziyarat'));
        const secondaryCta = sec.querySelector('a[href$="/services"]');
        const mainPhotoFrame = sec.querySelector('.lg\\\\:col-span-4');
        const supportingCol = sec.querySelector('.lg\\\\:col-span-3');

        const h2Rect = h2 ? h2.getBoundingClientRect() : null;
        const mainRect = mainPhotoFrame ? mainPhotoFrame.getBoundingClientRect() : null;
        const h3Rect = h3 ? h3.getBoundingClientRect() : null;
        const suppRect = supportingCol ? supportingCol.getBoundingClientRect() : null;

        return {
          dir: sec.getAttribute('dir'),
          visibleImgsCount: imgs.length,
          allAltsNonEmpty,
          brokenVisibleImgs,
          h3Text: h3?.textContent?.trim(),
          primaryCtaHeight: primaryCta ? Math.round(primaryCta.getBoundingClientRect().height) : 0,
          secondaryCtaHeight: secondaryCta ? Math.round(secondaryCta.getBoundingClientRect().height) : 0,
          horizontalOverflowPx: document.documentElement.scrollWidth - window.innerWidth,
          layoutPositions: {
            h2Top: h2Rect ? Math.round(h2Rect.top) : null,
            h2Left: h2Rect ? Math.round(h2Rect.left) : null,
            mainTop: mainRect ? Math.round(mainRect.top) : null,
            mainBottom: mainRect ? Math.round(mainRect.bottom) : null,
            mainLeft: mainRect ? Math.round(mainRect.left) : null,
            h3Top: h3Rect ? Math.round(h3Rect.top) : null,
            suppTop: suppRect ? Math.round(suppRect.top) : null,
            suppLeft: suppRect ? Math.round(suppRect.left) : null,
          }
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

  // Interactive Keyboard + Click Chapter Switching & 360px + Reduced Motion Test
  await sendCommand('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 920,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await sendCommand('Page.navigate', { url: `http://127.0.0.1:${PORT}/en` });
  await new Promise((r) => setTimeout(r, 2200));

    const yPos = await sendCommand('Runtime.evaluate', {
      returnByValue: true,
      expression: `(() => {
        const sec = document.getElementById('services');
        if (!sec) return null;
        const y = sec.getBoundingClientRect().top + window.scrollY - 88;
        window.scrollTo({ top: Math.max(0, y), behavior: 'instant' });
        return {
          beforeH3: sec.querySelector('h3')?.textContent?.trim(),
          beforeHeight: Math.round(sec.getBoundingClientRect().height),
        };
      })()`,
    });
    const interactiveStep1 = await sendCommand('Runtime.evaluate', {
      returnByValue: true,
      expression: `(() => {
        const sec = document.getElementById('services');
        const chapterBtns = Array.from(sec.querySelectorAll('div[role="group"] button'));
        chapterBtns[0]?.focus();
        chapterBtns[0]?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        return chapterBtns.length;
      })()`,
    });
    await new Promise((r) => setTimeout(r, 250));
    const afterArrowAudit = await sendCommand('Runtime.evaluate', {
      returnByValue: true,
      expression: `(() => {
        const sec = document.getElementById('services');
        const afterArrowH3 = sec.querySelector('h3')?.textContent?.trim();
        const chapterBtns = Array.from(sec.querySelectorAll('div[role="group"] button'));
        chapterBtns[3]?.focus();
        chapterBtns[3]?.click();
        return { afterArrowH3 };
      })()`,
    });
    await new Promise((r) => setTimeout(r, 450));
    const afterClickAudit = await sendCommand('Runtime.evaluate', {
      returnByValue: true,
      expression: `(() => {
        const sec = document.getElementById('services');
        const afterH3 = sec.querySelector('h3')?.textContent?.trim();
        const afterHeight = Math.round(sec.getBoundingClientRect().height);
        const ziyaratLink = sec.querySelector('a[href="/en/ziyarat"]');
        return { afterH3, afterHeight, ziyaratHref: ziyaratLink?.getAttribute('href') };
      })()`,
    });
    console.log('[Interactive Audit]', JSON.stringify({
      ...yPos?.result?.value,
      btnCount: interactiveStep1?.result?.value,
      ...afterArrowAudit?.result?.value,
      ...afterClickAudit?.result?.value,
    }));

  const interactiveShot = await sendCommand('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: false,
  });
  if (interactiveShot && interactiveShot.data) {
    const outPath = path.join(artifactDir, 'editorial_services_interactive_en.png');
    fs.writeFileSync(outPath, Buffer.from(interactiveShot.data, 'base64'));
    console.log(`Saved interactive screenshot: ${outPath}`);
  }

  // Also capture lower section on 390px Mobile AR to verify supporting content & photos
  await sendCommand('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true,
  });
  await sendCommand('Page.navigate', { url: `http://127.0.0.1:${PORT}/ar` });
  await new Promise((r) => setTimeout(r, 2000));
  await sendCommand('Runtime.evaluate', {
    expression: `
      const sec = document.getElementById('services');
      const h3 = sec?.querySelector('h3');
      if (h3) {
        const y = h3.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top: Math.max(0, y), behavior: 'instant' });
      }
    `,
  });
  await new Promise((r) => setTimeout(r, 600));
  const mobLowerShot = await sendCommand('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  if (mobLowerShot && mobLowerShot.data) {
    const outPath = path.join(artifactDir, 'editorial_services_mobile_ar_lower.png');
    fs.writeFileSync(outPath, Buffer.from(mobLowerShot.data, 'base64'));
    console.log(`Saved mobile lower screenshot: ${outPath}`);
  }

  // Test 360px mobile overflow + reduced motion + mobile DOM vertical sequence
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
      const sec = document.getElementById('services');
      sec?.scrollIntoView({ behavior: 'instant', block: 'start' });
      const activeImg = sec?.querySelector('img');
      const h2 = sec?.querySelector('h2')?.getBoundingClientRect();
      const mainImg = sec?.querySelector('.lg\\\\:col-span-4')?.getBoundingClientRect();
      const spotlight = sec?.querySelector('h3')?.getBoundingClientRect();
      const suppGrid = sec?.querySelector('.lg\\\\:col-span-3')?.getBoundingClientRect();
      return {
        overflow360px: document.documentElement.scrollWidth - window.innerWidth,
        reducedMotionTransitionDuration: activeImg ? window.getComputedStyle(activeImg).transitionDuration : null,
        mobileOrderStrict: Boolean(h2 && mainImg && spotlight && suppGrid && h2.bottom <= mainImg.top && mainImg.bottom <= spotlight.top && spotlight.bottom <= suppGrid.top),
        rects360: {
          h2Bottom: h2 ? Math.round(h2.bottom) : null,
          mainTop: mainImg ? Math.round(mainImg.top) : null,
          mainBottom: mainImg ? Math.round(mainImg.bottom) : null,
          spotlightTop: spotlight ? Math.round(spotlight.top) : null,
          suppTop: suppGrid ? Math.round(suppGrid.top) : null,
        },
      };
    })()`,
  });
  console.log('[360px & Reduced Motion Audit]', JSON.stringify(reducedAudit?.result?.value));

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
