import fs from 'fs';
import { spawn } from 'child_process';
import path from 'path';

const artifactDir = 'C:\\Users\\PC\\.gemini\\antigravity\\brain\\028241d2-64be-4ca9-89f1-f51955dd1b75';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 3040;
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
  const edgeProcess = spawn(edgePath, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--remote-debugging-port=9266',
    'about:blank',
  ]);

  await new Promise((r) => setTimeout(r, 2000));

  const res = await fetch('http://127.0.0.1:9266/json/list');
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
    { url: `http://127.0.0.1:${PORT}/ar`, w: 1440, h: 920, name: 'footer_cta_desktop_ar.png' },
    { url: `http://127.0.0.1:${PORT}/en`, w: 1440, h: 920, name: 'footer_cta_desktop_en.png' },
    { url: `http://127.0.0.1:${PORT}/ar`, w: 390, h: 844, name: 'footer_cta_mobile_ar.png' },
    { url: `http://127.0.0.1:${PORT}/en`, w: 390, h: 844, name: 'footer_cta_mobile_en.png' },
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
    await new Promise((r) => setTimeout(r, 2800));

    // Scroll Cinematic Footer CTA into view cleanly & wait for lazy images to finish loading
    await sendCommand('Runtime.evaluate', {
      expression: `
        const h = document.getElementById('cinematic-footer-cta-heading');
        const sec = h ? h.closest('section') : null;
        if (sec) {
          sec.scrollIntoView({ behavior: 'instant', block: 'start' });
        }
      `,
    });
    await new Promise((r) => setTimeout(r, 2500));

    const audit = await sendCommand('Runtime.evaluate', {
      returnByValue: true,
      expression: `(() => {
        const h = document.getElementById('cinematic-footer-cta-heading');
        const sec = h ? h.closest('section') : null;
        const footer = document.querySelector('footer');
        const imgs = sec ? Array.from(sec.querySelectorAll('img')).filter(img => {
          const style = window.getComputedStyle(img);
          return style.display !== 'none' && style.visibility !== 'hidden';
        }) : [];
        const brokenImgs = imgs.filter(img => !img.complete || img.naturalWidth === 0).map(i => i.src);
        const bookLink = sec ? sec.querySelector('a[href*="/booking"]') : null;
        const waLink = sec ? sec.querySelector('a[href*="wa.me"]') : null;
        return {
          headingText: h?.textContent?.trim() || '',
          hasSection: Boolean(sec),
          hasFooter: Boolean(footer),
          footerLinksCount: footer ? footer.querySelectorAll('a').length : 0,
          bookHref: bookLink ? bookLink.getAttribute('href') : null,
          bookHeight: bookLink ? Math.round(bookLink.getBoundingClientRect().height) : 0,
          waHref: waLink ? waLink.getAttribute('href') : null,
          waHeight: waLink ? Math.round(waLink.getBoundingClientRect().height) : 0,
          horizontalOverflowPx: document.documentElement.scrollWidth - window.innerWidth,
          brokenImages: brokenImgs,
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
    }
  }

  // Also capture 360px overflow check and Urdu + verify hidden on /booking + Footer preservation
  await sendCommand('Emulation.setDeviceMetricsOverride', {
    width: 360,
    height: 780,
    deviceScaleFactor: 1,
    mobile: true,
  });
  await sendCommand('Page.navigate', { url: `http://127.0.0.1:${PORT}/ur` });
  await new Promise((r) => setTimeout(r, 2200));
  const ur360Audit = await sendCommand('Runtime.evaluate', {
    returnByValue: true,
    expression: `({
      dir: document.documentElement.dir,
      ctaHeadingUr: document.getElementById('cinematic-footer-cta-heading')?.textContent?.trim() || '',
      overflow360px: document.documentElement.scrollWidth - window.innerWidth,
    })`,
  });
  console.log('[Audit UR 360px]', JSON.stringify(ur360Audit?.result?.value));

  await sendCommand('Page.navigate', { url: `http://127.0.0.1:${PORT}/ar/booking` });
  await new Promise((r) => setTimeout(r, 2000));
  const bookingSuppressionAudit = await sendCommand('Runtime.evaluate', {
    returnByValue: true,
    expression: `({
      ctaPresentOnBookingPage: Boolean(document.getElementById('cinematic-footer-cta-heading')),
      footerPresentOnBookingPage: Boolean(document.querySelector('footer')),
    })`,
  });
  console.log('[Audit Booking Suppression]', JSON.stringify(bookingSuppressionAudit?.result?.value));

  ws.close();
  edgeProcess.kill();
  console.log('All Footer CTA screenshots & audits completed successfully!');
} catch (err) {
  console.error('Error during capture:', err);
  process.exitCode = 1;
} finally {
  server.kill('SIGTERM');
  setTimeout(() => process.exit(process.exitCode || 0), 1000);
}
