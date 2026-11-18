import { spawn, execSync } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

const projectRoot = 'D:/royal-umrah-cabs';
const artifactsDir = 'C:/Users/PC/.gemini/antigravity/brain/b85e6102-b6eb-4565-9493-6e009226675e';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const fallbackEdge = 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe';
const binary = fs.existsSync(edgePath) ? edgePath : fallbackEdge;

const PORT = 3006;

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
      await new Promise((r) => setTimeout(r, 600));
    }
  }
  return false;
}

async function capture() {
  console.log(`Starting Next.js production server on port ${PORT}...`);
  const server = spawn('node', ['node_modules/next/dist/bin/next', 'start', '-p', String(PORT)], {
    cwd: projectRoot,
    stdio: 'ignore',
  });

  const ready = await waitForServer(`http://localhost:${PORT}/ar/pricing`);
  if (!ready) {
    console.error('Server failed to start');
    server.kill();
    process.exit(1);
  }
  console.log('Server is ready! Capturing master pricing screenshots...');

  const targets = [
    { url: `http://localhost:${PORT}/ar/pricing`, name: 'luxury_prices_packages_ar_dt.png', w: 1440, h: 2800 },
    { url: `http://localhost:${PORT}/ar/pricing`, name: 'luxury_prices_packages_ar_mb.png', w: 390, h: 3200 },
    { url: `http://localhost:${PORT}/en/pricing`, name: 'luxury_prices_packages_en_dt.png', w: 1440, h: 2800 },
    { url: `http://localhost:${PORT}/en/pricing`, name: 'luxury_prices_packages_en_mb.png', w: 390, h: 3200 },
  ];

  for (const t of targets) {
    const outPath = path.join(artifactsDir, t.name);
    const cmd = `"${binary}" --headless --disable-gpu --window-size=${t.w},${t.h} --screenshot="${outPath}" --hide-scrollbars "${t.url}"`;
    try {
      execSync(cmd, { stdio: 'ignore', timeout: 20000 });
      console.log(`Captured ${t.name} (${fs.statSync(outPath).size} bytes)`);
    } catch (err) {
      console.error(`Failed to capture ${t.name}:`, err.message);
    }
  }

  server.kill();
  console.log('All screenshots captured successfully!');
}

capture();
