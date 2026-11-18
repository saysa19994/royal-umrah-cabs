import fs from 'fs';
import { spawn } from 'child_process';

const edgePath = fs.existsSync("C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe")
  ? "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
  : "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe";

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

try {
  const wsUrl = await getDebuggerUrl();
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
  await sendCommand('Runtime.enable');

  const viewports = [1440, 1024, 768, 515, 390, 360];
  for (const w of viewports) {
    await sendCommand('Emulation.setDeviceMetricsOverride', {
      width: w,
      height: 900,
      deviceScaleFactor: 1,
      mobile: w < 768,
    });
    await sendCommand('Page.navigate', { url: 'http://localhost:3000/ar/fleet' });
    await new Promise(r => setTimeout(r, 1500));

    const evalRes = await sendCommand('Runtime.evaluate', {
      expression: 'document.documentElement.scrollWidth > window.innerWidth ? document.documentElement.scrollWidth - window.innerWidth : 0',
      returnByValue: true,
    });
    console.log(`Viewport ${w}px overflow:`, evalRes.result.value, 'px');
  }

  ws.close();
} finally {
  edgeProcess.kill();
}
