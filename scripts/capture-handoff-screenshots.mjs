import fs from 'fs';
import { spawn } from 'child_process';

const artifactDir = "C:\\Users\\PC\\.gemini\\antigravity\\brain\\b85e6102-b6eb-4565-9493-6e009226675e";
const baseUrl = "https://royal-umrah-cabs-g2u84xou8-sayed6.vercel.app";

const edgePath = fs.existsSync("C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe")
  ? "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
  : "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe";

console.log('Using Edge at:', edgePath);

const edgeProcess = spawn(edgePath, [
  '--headless=new',
  '--no-sandbox',
  '--disable-gpu',
  '--remote-debugging-port=9224',
  `${baseUrl}/ar`
]);

await new Promise(r => setTimeout(r, 2500));

async function getDebuggerUrl() {
  const res = await fetch('http://127.0.0.1:9224/json/list');
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

  async function captureSectionScreenshot(url, width, height, selector, filename) {
    console.log(`Capturing ${filename} (${width}x${height}) for selector: ${selector}...`);
    await sendCommand('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: width <= 768,
    });
    await sendCommand('Page.navigate', { url });
    await new Promise(r => setTimeout(r, 2000));

    if (selector === 'FULL_PAGE') {
      const res = await sendCommand('Page.captureScreenshot', {
        captureBeyondViewport: true,
        fromSurface: true,
      });
      fs.writeFileSync(`${artifactDir}\\${filename}`, Buffer.from(res.data, 'base64'));
    } else {
      const rectRes = await sendCommand('Runtime.evaluate', {
        expression: `
        (() => {
          const el = document.querySelector('${selector}');
          if (!el) return null;
          el.scrollIntoView({ block: 'start' });
          const rect = el.getBoundingClientRect();
          return {
            x: window.scrollX + rect.left,
            y: window.scrollY + rect.top,
            width: rect.width,
            height: rect.height
          };
        })()
        `,
        returnByValue: true,
      });

      await new Promise(r => setTimeout(r, 600));

      const rect = rectRes?.result?.value;
      if (!rect) {
        console.warn(`Selector ${selector} not found, falling back to viewport screenshot`);
        const res = await sendCommand('Page.captureScreenshot', { fromSurface: true });
        fs.writeFileSync(`${artifactDir}\\${filename}`, Buffer.from(res.data, 'base64'));
      } else {
        const res = await sendCommand('Page.captureScreenshot', {
          clip: {
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height,
            scale: 1,
          },
          captureBeyondViewport: true,
          fromSurface: true,
        });
        fs.writeFileSync(`${artifactDir}\\${filename}`, Buffer.from(res.data, 'base64'));
      }
    }
    console.log(`Saved: ${filename}`);
  }

  // 1. Complete Arabic Homepage at 1440px
  await captureSectionScreenshot(`${baseUrl}/ar`, 1440, 900, 'FULL_PAGE', 'homepage_desktop_ar_full.png');

  // 2. Complete English Homepage at 1440px
  await captureSectionScreenshot(`${baseUrl}/en`, 1440, 900, 'FULL_PAGE', 'homepage_desktop_en_full.png');

  // 3. Homepage Hero & Booking Console (Desktop 1440px)
  await captureSectionScreenshot(`${baseUrl}/ar`, 1440, 1100, 'header + section, section:first-of-type', 'homepage_hero_booking_console.png');

  // 4. Premium Fleet Showcase Section (Desktop 1440px)
  await captureSectionScreenshot(`${baseUrl}/ar`, 1440, 1200, '#fleet', 'homepage_fleet_showcase.png');

  // 5. VIP Concierge Section (Desktop 1440px)
  await captureSectionScreenshot(`${baseUrl}/ar`, 1440, 1000, '#vip-concierge', 'homepage_vip_concierge.png');

  // 6. Customer Reviews & Final Booking CTA (Desktop 1440px)
  await captureSectionScreenshot(`${baseUrl}/ar`, 1440, 1200, '#reviews', 'homepage_reviews_final_cta.png');

  // 7. Complete Arabic Mobile Homepage at 390px
  await captureSectionScreenshot(`${baseUrl}/ar`, 390, 844, 'FULL_PAGE', 'homepage_mobile_ar_full.png');

  // 8. Complete English Mobile Homepage at 390px
  await captureSectionScreenshot(`${baseUrl}/en`, 390, 844, 'FULL_PAGE', 'homepage_mobile_en_full.png');

  // 9. Mobile Hero & Booking Console (390px)
  await captureSectionScreenshot(`${baseUrl}/ar`, 390, 1000, 'header + section, section:first-of-type', 'homepage_mobile_hero_booking.png');

  // 10. Mobile Fleet Showcase (390px)
  await captureSectionScreenshot(`${baseUrl}/ar`, 390, 1200, '#fleet', 'homepage_mobile_fleet.png');

  // 11. Mobile VIP Concierge (390px)
  await captureSectionScreenshot(`${baseUrl}/ar`, 390, 1000, '#vip-concierge', 'homepage_mobile_concierge.png');

  // 12. Mobile Reviews & Final CTA (390px)
  await captureSectionScreenshot(`${baseUrl}/ar`, 390, 1200, '#reviews', 'homepage_mobile_reviews_cta.png');

  ws.close();
  edgeProcess.kill();
  console.log('All handoff screenshots captured successfully!');
  process.exit(0);
} catch (err) {
  console.error('Error during screenshot capture:', err);
  edgeProcess.kill();
  process.exit(1);
}
