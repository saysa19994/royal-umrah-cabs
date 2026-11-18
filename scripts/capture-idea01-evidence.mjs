import { spawn, execSync } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

const projectRoot = 'D:/royal-umrah-cabs';
const artifactsDir = 'C:/Users/PC/.gemini/antigravity/brain/028241d2-64be-4ca9-89f1-f51955dd1b75';
const evidenceDir = 'D:/royal-umrah-cabs/design-references/evidence/idea-01';

if (!fs.existsSync(evidenceDir)) {
  fs.mkdirSync(evidenceDir, { recursive: true });
}

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const fallbackEdge = 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
let binary = '';
if (fs.existsSync(edgePath)) binary = edgePath;
else if (fs.existsSync(fallbackEdge)) binary = fallbackEdge;
else if (fs.existsSync(chromePath)) binary = chromePath;

console.log('Using browser binary:', binary);

const PORT = 3008;

async function waitForServer(url, timeoutMs = 35000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(url, (res) => {
          if (res.statusCode === 200) resolve();
          else reject(new Error(`Status ${res.statusCode}`));
        });
        req.on('error', reject);
        req.setTimeout(2500, () => req.destroy());
      });
      return true;
    } catch {
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
  throw new Error(`Server did not start within ${timeoutMs}ms`);
}

const viewports = [
  { name: 'desktop_1920', width: 1920, height: 1100 },
  { name: 'desktop_1440', width: 1440, height: 1050 },
  { name: 'desktop_1280', width: 1280, height: 950 },
  { name: 'tablet_768', width: 768, height: 1150 },
  { name: 'mobile_430', width: 430, height: 1000 },
  { name: 'mobile_390', width: 390, height: 950 }
];

async function capture() {
  console.log(`Starting next server on port ${PORT}...`);
  const nextBin = path.join(projectRoot, 'node_modules', 'next', 'dist', 'bin', 'next');
  const server = spawn(process.execPath, [nextBin, 'start', '-p', String(PORT)], {
    cwd: projectRoot,
    stdio: 'pipe',
  });
  server.stdout.on('data', d => {
    const s = d.toString();
    if (s.includes('Ready') || s.includes('Local:')) console.log('[NEXT]', s.trim());
  });
  server.stderr.on('data', d => console.error('[NEXT ERR]', d.toString().trim()));

  try {
    console.log(`Waiting for server on http://localhost:${PORT}/en ...`);
    await waitForServer(`http://localhost:${PORT}/en`);
    console.log('Server is UP and ready!');

    const locales = ['en', 'ar'];

    for (const vp of viewports) {
      for (const loc of locales) {
        const fileName = `hero_idea01_${vp.name}_${loc}.png`;
        const artifactPath = path.join(artifactsDir, fileName);
        const refPath = path.join(evidenceDir, fileName);

        console.log(`Capturing ${vp.name} (${vp.width}x${vp.height}) - [${loc.toUpperCase()}]...`);
        const url = `http://localhost:${PORT}/${loc}`;
        execSync(
          `"${binary}" --headless=new --disable-gpu --hide-scrollbars --window-size=${vp.width},${vp.height} --screenshot="${artifactPath}" "${url}"`,
          { stdio: 'pipe' }
        );

        if (fs.existsSync(artifactPath)) {
          fs.copyFileSync(artifactPath, refPath);
          console.log(`  ✓ Saved: ${fileName} (${(fs.statSync(artifactPath).size / 1024).toFixed(1)} KB)`);
        }
      }
    }

    console.log('\nAll 12 screenshots captured successfully!');
  } finally {
    console.log('Stopping local server...');
    server.kill();
  }
}

capture().catch((err) => {
  console.error('Capture failed:', err);
  process.exit(1);
});
