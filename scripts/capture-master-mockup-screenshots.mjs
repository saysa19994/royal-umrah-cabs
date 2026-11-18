import { spawn, execSync } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

const projectRoot = 'D:/royal-umrah-cabs';
const artifactsDir = 'C:/Users/PC/.gemini/antigravity/brain/b85e6102-b6eb-4565-9493-6e009226675e';

// Kill any stray node or msedge instances
try {
  execSync('taskkill /F /IM msedge.exe /T', { stdio: 'ignore' });
} catch (e) {}

console.log('Starting Next.js production server on port 3000...');
const server = spawn('cmd.exe', ['/c', 'npx', 'next', 'start', '-p', '3000'], {
  cwd: projectRoot,
  stdio: 'inherit',
});

function waitForServer(url, timeout = 30000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const check = () => {
      http.get(url, (res) => {
        if (res.statusCode === 200) {
          resolve();
        } else {
          setTimeout(check, 500);
        }
      }).on('error', () => {
        if (Date.now() - start > timeout) {
          reject(new Error('Server timeout'));
        } else {
          setTimeout(check, 500);
        }
      });
    };
    check();
  });
}

async function run() {
  try {
    await waitForServer('http://localhost:3000/ar');
    console.log('Server is responding on port 3000! Capturing screenshots...');

    const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
    const fallbackEdge = 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe';
    const binary = fs.existsSync(edgePath) ? edgePath : fallbackEdge;

    const targets = [
      {
        url: 'http://localhost:3000/ar',
        w: 1440,
        h: 3400,
        out: path.join(artifactsDir, 'master_mockup_ar_desktop.png'),
      },
      {
        url: 'http://localhost:3000/ar',
        w: 390,
        h: 2800,
        out: path.join(artifactsDir, 'master_mockup_ar_mobile.png'),
      },
      {
        url: 'http://localhost:3000/en',
        w: 1440,
        h: 3400,
        out: path.join(artifactsDir, 'master_mockup_en_desktop.png'),
      },
      {
        url: 'http://localhost:3000/en',
        w: 390,
        h: 2800,
        out: path.join(artifactsDir, 'master_mockup_en_mobile.png'),
      },
    ];

    for (const t of targets) {
      console.log('Capturing ' + path.basename(t.out) + ' (' + t.w + 'x' + t.h + ')...');
      const cmd = '"' + binary + '" --headless=new --disable-gpu --hide-scrollbars --window-size=' + t.w + ',' + t.h + ' --screenshot="' + t.out + '" "' + t.url + '"';
      execSync(cmd, { stdio: 'inherit' });
      await new Promise((r) => setTimeout(r, 1000));
    }

    console.log('All screenshots captured successfully!');
  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    console.log('Shutting down server...');
    server.kill();
    try {
      execSync('taskkill /F /IM node.exe /T', { stdio: 'ignore' });
    } catch (e) {}
  }
}

run();
