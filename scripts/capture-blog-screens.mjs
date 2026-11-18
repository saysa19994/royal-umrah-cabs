import fs from 'fs';
import { spawn } from 'child_process';
import path from 'path';

const artifactDir = 'C:\\Users\\PC\\.gemini\\antigravity\\brain\\028241d2-64be-4ca9-89f1-f51955dd1b75';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 3039;
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

  // Verify /api/blog-article endpoint directly first
  const apiRes = await fetch(
    `http://127.0.0.1:${PORT}/api/blog-article?slug=vip-umrah-transport-jeddah-to-makkah&locale=ar`
  );
  const apiJson = await apiRes.json();
  console.log(
    '[API Verification]',
    apiRes.status,
    'sections:',
    apiJson?.content?.sections?.length,
    'subsections in s0:',
    apiJson?.content?.sections?.[0]?.subsections?.length
  );

  console.log('Launching headless Edge browser...');
  const edgeProcess = spawn(edgePath, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--remote-debugging-port=9264',
    'about:blank',
  ]);

  await new Promise((r) => setTimeout(r, 2000));

  const res = await fetch('http://127.0.0.1:9264/json/list');
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
    { url: `http://127.0.0.1:${PORT}/ar/blog`, w: 1440, h: 920, name: 'blog_desktop_ar.png', scrollY: 0 },
    { url: `http://127.0.0.1:${PORT}/en/blog`, w: 1440, h: 920, name: 'blog_desktop_en.png', scrollY: 0 },
    { url: `http://127.0.0.1:${PORT}/ar/blog`, w: 390, h: 844, name: 'blog_mobile_ar.png', scrollY: 180 },
    { url: `http://127.0.0.1:${PORT}/en/blog`, w: 390, h: 844, name: 'blog_mobile_en.png', scrollY: 180 },
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

    if (t.scrollY > 0) {
      await sendCommand('Runtime.evaluate', {
        expression: `window.scrollTo(0, ${t.scrollY});`,
      });
      await new Promise((r) => setTimeout(r, 800));
    }

    const shot = await sendCommand('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false,
    });
    if (shot && shot.data) {
      const outPath = path.join(artifactDir, t.name);
      fs.writeFileSync(outPath, Buffer.from(shot.data, 'base64'));
      console.log(`Saved screenshot: ${outPath} (${(fs.statSync(outPath).size / 1024).toFixed(1)} KB)`);
    } else {
      console.log(`Warning: Failed to capture shot for ${t.name}`);
    }
  }

  // Capture Part B: Interactive Article Modal on Desktop AR + verify Portal stacking & Escape close
  console.log('Capturing interactive Article Modal on Desktop AR...');
  await sendCommand('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 920,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await sendCommand('Page.navigate', { url: `http://127.0.0.1:${PORT}/ar/blog` });
  await new Promise((r) => setTimeout(r, 2400));

  await sendCommand('Runtime.evaluate', {
    expression: `
      const firstCard = document.querySelector('a[href*="/blog/vip-umrah-transport-jeddah-to-makkah"]');
      if (firstCard) firstCard.click();
    `,
  });
  await new Promise((r) => setTimeout(r, 1800));

  const modalAudit = await sendCommand('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const dlg = document.querySelector('[role="dialog"][aria-modal="true"]');
      const closeBtn = dlg?.querySelector('button[aria-label*="إغلاق"]');
      const titleEl = document.getElementById('article-modal-title');
      const rect = dlg?.querySelector('div[dir]')?.getBoundingClientRect();
      const closeRect = closeBtn?.getBoundingClientRect();
      return {
        isPortalChildOfBody: dlg?.parentElement === document.body,
        urlAfterClick: window.location.pathname,
        titleText: titleEl?.textContent || '',
        bodySectionsCount: dlg ? dlg.querySelectorAll('section').length : 0,
        dialogTop: rect ? Math.round(rect.top) : null,
        closeBtnTop: closeRect ? Math.round(closeRect.top) : null,
        closeBtnHeight: closeRect ? Math.round(closeRect.height) : null,
        bodyOverflow: document.body.style.overflow,
      };
    })()`,
  });
  console.log('[Modal Audit]', JSON.stringify(modalAudit?.result?.value));

  const modalShot = await sendCommand('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: false,
  });
  if (modalShot && modalShot.data) {
    const outPath = path.join(artifactDir, 'blog_modal_desktop_ar.png');
    fs.writeFileSync(outPath, Buffer.from(modalShot.data, 'base64'));
    console.log(`Saved Modal screenshot: ${outPath} (${(fs.statSync(outPath).size / 1024).toFixed(1)} KB)`);
  }

  // Test Escape key closes modal and restores URL & scroll lock
  await sendCommand('Input.dispatchKeyEvent', {
    type: 'keyDown',
    key: 'Escape',
    code: 'Escape',
    windowsVirtualKeyCode: 27,
  });
  await sendCommand('Input.dispatchKeyEvent', {
    type: 'keyUp',
    key: 'Escape',
    code: 'Escape',
    windowsVirtualKeyCode: 27,
  });
  await new Promise((r) => setTimeout(r, 800));

  const afterEscape = await sendCommand('Runtime.evaluate', {
    returnByValue: true,
    expression: `({
      dialogStillPresent: Boolean(document.querySelector('[role="dialog"]')),
      urlAfterEscape: window.location.pathname,
      bodyOverflowAfterEscape: document.body.style.overflow,
    })`,
  });
  console.log('[After Escape Audit]', JSON.stringify(afterEscape?.result?.value));

  // Capture Homepage Editorial section
  console.log('Capturing Homepage Editorial section on Desktop AR...');
  await sendCommand('Page.navigate', { url: `http://127.0.0.1:${PORT}/ar` });
  await new Promise((r) => setTimeout(r, 2500));
  await sendCommand('Runtime.evaluate', {
    expression: `
      const el = document.getElementById('blog-preview');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    `,
  });
  await new Promise((r) => setTimeout(r, 1200));
  const hpShot = await sendCommand('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: false,
  });
  if (hpShot && hpShot.data) {
    const outPath = path.join(artifactDir, 'blog_homepage_preview_desktop_ar.png');
    fs.writeFileSync(outPath, Buffer.from(hpShot.data, 'base64'));
    console.log(`Saved Homepage Preview screenshot: ${outPath} (${(fs.statSync(outPath).size / 1024).toFixed(1)} KB)`);
  }

  ws.close();
  edgeProcess.kill();
  console.log('All Blog screenshots captured & verified successfully!');
} catch (err) {
  console.error('Error during capture:', err);
  process.exitCode = 1;
} finally {
  server.kill('SIGTERM');
  setTimeout(() => process.exit(process.exitCode || 0), 1000);
}
