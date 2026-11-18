import fs from 'fs';
import { spawn } from 'child_process';

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
  `${baseUrl}/ar`
]);

await new Promise(r => setTimeout(r, 2000));

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

  async function capturePageAndSections(locale, width) {
    const isMobile = width <= 768;
    console.log(`\n======================================================`);
    console.log(`CAPTURING ${locale.toUpperCase()} AT ${width}px (${isMobile ? 'Mobile' : 'Desktop'})`);
    console.log(`======================================================`);

    await sendCommand('Emulation.setDeviceMetricsOverride', {
      width,
      height: isMobile ? 844 : 900,
      deviceScaleFactor: 1,
      mobile: isMobile,
    });

    await sendCommand('Page.navigate', { url: `${baseUrl}/${locale}` });
    await new Promise(r => setTimeout(r, 1500));

    // 1. Capture Full Page
    const fullFileName = isMobile
      ? `homepage_mobile_${locale}_full.png`
      : `homepage_desktop_${locale}_full.png`;

    console.log(`Capturing full page: ${fullFileName}...`);
    const fullRes = await sendCommand('Page.captureScreenshot', {
      captureBeyondViewport: true,
      fromSurface: true,
    });
    fs.writeFileSync(`${artifactDir}\\${fullFileName}`, Buffer.from(fullRes.data, 'base64'));
    console.log(`Saved: ${fullFileName} (${fs.statSync(`${artifactDir}\\${fullFileName}`).size} bytes)`);

    // Get Section Bounding Rects
    const sectionsRes = await sendCommand('Runtime.evaluate', {
      expression: `
      (() => {
        const sections = Array.from(document.querySelectorAll('main section, div.flex-col > section'));
        return sections.map((s, index) => {
          const rect = s.getBoundingClientRect();
          return {
            index,
            y: window.scrollY + rect.top,
            height: rect.height,
            textSnippet: s.innerText.substring(0, 40).replace(/\\n/g, ' ')
          };
        });
      })()
      `,
      returnByValue: true,
    });

    const sections = sectionsRes?.result?.value || [];
    console.log(`Found ${sections.length} sections:`, sections);

    // Section 0: Hero & Booking Console
    if (sections[0]) {
      const fn = isMobile ? 'homepage_mobile_hero_booking.png' : 'homepage_hero_booking_console.png';
      console.log(`Capturing Hero: ${fn}...`);
      const res = await sendCommand('Page.captureScreenshot', {
        clip: {
          x: 0,
          y: sections[0].y,
          width,
          height: sections[0].height,
          scale: 1,
        },
        captureBeyondViewport: true,
        fromSurface: true,
      });
      fs.writeFileSync(`${artifactDir}\\${fn}`, Buffer.from(res.data, 'base64'));
      console.log(`Saved: ${fn} (${fs.statSync(`${artifactDir}\\${fn}`).size} bytes)`);
    }

    // Section 2: Fleet Showcase (Automotive Editorial)
    if (sections[2]) {
      const fn = isMobile ? 'homepage_mobile_fleet.png' : 'homepage_fleet_showcase.png';
      console.log(`Capturing Fleet: ${fn}...`);
      const res = await sendCommand('Page.captureScreenshot', {
        clip: {
          x: 0,
          y: sections[2].y,
          width,
          height: sections[2].height,
          scale: 1,
        },
        captureBeyondViewport: true,
        fromSurface: true,
      });
      fs.writeFileSync(`${artifactDir}\\${fn}`, Buffer.from(res.data, 'base64'));
      console.log(`Saved: ${fn} (${fs.statSync(`${artifactDir}\\${fn}`).size} bytes)`);
    }

    // Section 4: VIP Concierge
    if (sections[4]) {
      const fn = isMobile ? 'homepage_mobile_concierge.png' : 'homepage_vip_concierge.png';
      console.log(`Capturing Concierge: ${fn}...`);
      const res = await sendCommand('Page.captureScreenshot', {
        clip: {
          x: 0,
          y: sections[4].y,
          width,
          height: sections[4].height,
          scale: 1,
        },
        captureBeyondViewport: true,
        fromSurface: true,
      });
      fs.writeFileSync(`${artifactDir}\\${fn}`, Buffer.from(res.data, 'base64'));
      console.log(`Saved: ${fn} (${fs.statSync(`${artifactDir}\\${fn}`).size} bytes)`);
    }

    // Section 6 & 7: Customer Reviews and Final Booking CTA
    if (sections[6]) {
      const totalHeight = sections[7]
        ? (sections[7].y + sections[7].height) - sections[6].y
        : sections[6].height;
      const fn = isMobile ? 'homepage_mobile_reviews_cta.png' : 'homepage_reviews_final_cta.png';
      console.log(`Capturing Reviews & CTA: ${fn}...`);
      const res = await sendCommand('Page.captureScreenshot', {
        clip: {
          x: 0,
          y: sections[6].y,
          width,
          height: totalHeight,
          scale: 1,
        },
        captureBeyondViewport: true,
        fromSurface: true,
      });
      fs.writeFileSync(`${artifactDir}\\${fn}`, Buffer.from(res.data, 'base64'));
      console.log(`Saved: ${fn} (${fs.statSync(`${artifactDir}\\${fn}`).size} bytes)`);
    }
  }

  // Execute captures
  await capturePageAndSections('ar', 1440);
  await capturePageAndSections('en', 1440);
  await capturePageAndSections('ar', 390);
  await capturePageAndSections('en', 390);

  ws.close();
  edgeProcess.kill();
  console.log('\n🎉 ALL HANDOFF SCREENSHOTS CAPTURED WITH 100% SUCCESS!');
  process.exit(0);
} catch (err) {
  console.error('Error in capture script:', err);
  edgeProcess.kill();
  process.exit(1);
}
