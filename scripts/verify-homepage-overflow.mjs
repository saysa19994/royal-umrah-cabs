import http from 'http';
import { spawn } from 'child_process';
import fs from 'fs';

const edgePath = fs.existsSync("C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe")
  ? "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
  : "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe";

console.log('Using Edge at:', edgePath);

const edgeProcess = spawn(edgePath, [
  '--headless=new',
  '--no-sandbox',
  '--disable-gpu',
  '--remote-debugging-port=9223',
  'http://localhost:3000/ar'
]);

// Wait 2.5 seconds for Edge to initialize
await new Promise(r => setTimeout(r, 2500));

async function getDebuggerUrl() {
  const res = await fetch('http://127.0.0.1:9223/json/list');
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

  // Enable Page & Emulation
  await sendCommand('Page.enable');

  const viewports = [
    { width: 360, height: 800, label: '360px Mobile (Compact)' },
    { width: 390, height: 844, label: '390px Mobile (iPhone 14/15)' },
    { width: 430, height: 932, label: '430px Mobile (iPhone Pro Max)' },
    { width: 515, height: 900, label: '515px Mobile/Small Viewport' },
    { width: 768, height: 1024, label: '768px Tablet (iPad Mini)' },
    { width: 1024, height: 768, label: '1024px Small Laptop / iPad Pro' },
    { width: 1440, height: 900, label: '1440px Standard Desktop' },
    { width: 1920, height: 1080, label: '1920px Large Desktop' },
  ];

  console.log('\n======================================================');
  console.log('VERIFYING ZERO HORIZONTAL OVERFLOW ON HOMEPAGE /ar:');
  console.log('======================================================');

  let allPassed = true;

  for (const vp of viewports) {
    await sendCommand('Emulation.setDeviceMetricsOverride', {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 1,
      mobile: vp.width <= 768,
    });

    await new Promise(r => setTimeout(r, 400));

    const evalRes = await sendCommand('Runtime.evaluate', {
      expression: `
      (() => {
        const sw = document.documentElement.scrollWidth;
        const bw = document.body.scrollWidth;
        const iw = window.innerWidth;
        const maxScroll = Math.max(sw, bw);
        const hasOverflow = maxScroll > iw;
        return {
          scrollWidth: maxScroll,
          innerWidth: iw,
          hasOverflow,
          difference: maxScroll - iw
        };
      })()
      `,
      returnByValue: true,
    });

    const data = evalRes?.result?.value;
    if (!data) {
      console.error('Eval error:', evalRes);
      allPassed = false;
      continue;
    }
    const status = !data.hasOverflow ? '✅ PASS (ZERO OVERFLOW)' : '❌ FAIL (OVERFLOW DETECTED)';
    if (data.hasOverflow) allPassed = false;

    console.log(
      `${vp.label.padEnd(36)} -> innerWidth: ${String(data.innerWidth).padStart(4)}px | scrollWidth: ${String(data.scrollWidth).padStart(4)}px | Diff: ${data.difference}px [${status}]`
    );
  }

  // Also test English: /en
  console.log('\n======================================================');
  console.log('VERIFYING ZERO HORIZONTAL OVERFLOW ON HOMEPAGE /en:');
  console.log('======================================================');

  await sendCommand('Page.navigate', { url: 'http://localhost:3000/en' });
  await new Promise(r => setTimeout(r, 1200));

  for (const vp of viewports) {
    await sendCommand('Emulation.setDeviceMetricsOverride', {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 1,
      mobile: vp.width <= 768,
    });

    await new Promise(r => setTimeout(r, 400));

    const evalRes = await sendCommand('Runtime.evaluate', {
      expression: `
      (() => {
        const sw = document.documentElement.scrollWidth;
        const bw = document.body.scrollWidth;
        const iw = window.innerWidth;
        const maxScroll = Math.max(sw, bw);
        const hasOverflow = maxScroll > iw;
        return {
          scrollWidth: maxScroll,
          innerWidth: iw,
          hasOverflow,
          difference: maxScroll - iw
        };
      })()
      `,
      returnByValue: true,
    });

    const data = evalRes?.result?.value;
    if (!data) {
      console.error('Eval error:', evalRes);
      allPassed = false;
      continue;
    }
    const status = !data.hasOverflow ? '✅ PASS (ZERO OVERFLOW)' : '❌ FAIL (OVERFLOW DETECTED)';
    if (data.hasOverflow) allPassed = false;

    console.log(
      `${vp.label.padEnd(36)} -> innerWidth: ${String(data.innerWidth).padStart(4)}px | scrollWidth: ${String(data.scrollWidth).padStart(4)}px | Diff: ${data.difference}px [${status}]`
    );
  }

  ws.close();
  edgeProcess.kill();

  if (!allPassed) {
    console.error('\n❌ Responsive overflow test FAILED! Horizontal scroll detected on one or more viewports.');
    process.exit(1);
  } else {
    console.log('\n🎉 ALL HOMEPAGE VIEWPORTS PASSED WITH EXACT ZERO HORIZONTAL OVERFLOW!');
    process.exit(0);
  }
} catch (err) {
  console.error('Error during CDP testing:', err);
  edgeProcess.kill();
  process.exit(1);
}
