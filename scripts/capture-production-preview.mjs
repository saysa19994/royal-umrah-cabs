import { spawn, execSync } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

const projectRoot = 'D:/royal-umrah-cabs';
const artifactsDir = 'C:/Users/PC/.gemini/antigravity/brain/b85e6102-b6eb-4565-9493-6e009226675e';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const fallbackEdge = 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe';
const binary = fs.existsSync(edgePath) ? edgePath : fallbackEdge;

const PORT = 3005;

async function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(url, (res) => {
          if (res.statusCode === 200) resolve();
          else reject(new Error(`Status ${res.statusCode}`));
        });
        req.on('error', reject);
        req.setTimeout(2000, () => req.destroy());
      });
      return true;
    } catch {
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
  throw new Error(`Server did not start within ${timeoutMs}ms`);
}

async function run() {
  console.log(`Starting next server on port ${PORT}...`);
  const server = spawn('npx', ['next', 'start', '-p', String(PORT)], {
    cwd: projectRoot,
    stdio: 'ignore',
    shell: true,
  });

  try {
    console.log(`Waiting for http://localhost:${PORT}/ar to respond...`);
    await waitForServer(`http://localhost:${PORT}/ar`);
    console.log('Server is UP!');

    const dtShot = path.join(artifactsDir, 'current_production_preview_ar_dt.png');
    const mbShot = path.join(artifactsDir, 'current_production_preview_ar_mb.png');

    console.log('Capturing Desktop (1440x2600)...');
    execSync(`"${binary}" --headless=new --disable-gpu --hide-scrollbars --window-size=1440,2600 --screenshot="${dtShot}" "http://localhost:${PORT}/ar"`, { stdio: 'inherit' });

    console.log('Capturing Mobile (390x2400)...');
    execSync(`"${binary}" --headless=new --disable-gpu --hide-scrollbars --window-size=390,2400 --screenshot="${mbShot}" "http://localhost:${PORT}/ar"`, { stdio: 'inherit' });

    console.log(`✓ Previews saved to artifacts:`);
    console.log(`- ${dtShot}`);
    console.log(`- ${mbShot}`);
  } finally {
    console.log('Stopping server...');
    server.kill();
    try {
      execSync(`Stop-Process -Name node -Force -ErrorAction SilentlyContinue`, { shell: 'powershell' });
    } catch {}
  }
}

run().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
