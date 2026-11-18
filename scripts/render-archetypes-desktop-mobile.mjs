import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const projectRoot = 'D:/royal-umrah-cabs';
const artifactsDir = 'C:/Users/PC/.gemini/antigravity/brain/b85e6102-b6eb-4565-9493-6e009226675e';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const fallbackEdge = 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe';
const binary = fs.existsSync(edgePath) ? edgePath : fallbackEdge;

const archetypes = [
  {
    id: 'archetype_01_presidential',
    title: 'Archetype 01: Presidential Editorial',
    file: 'design-concepts/prototype-1-presidential.html',
  },
  {
    id: 'archetype_02_sanctuary',
    title: 'Archetype 02: Architectural Sanctuary',
    file: 'design-concepts/prototype-2-sanctuary.html',
  },
  {
    id: 'archetype_03_glass_mobility',
    title: 'Archetype 03: Ultra-Modern Glass Mobility',
    file: 'design-concepts/prototype-3-glass-mobility.html',
  },
];

async function run() {
  for (const arch of archetypes) {
    const filePath = path.resolve(projectRoot, arch.file);
    const fileUrl = 'file:///' + filePath.replace(/\\\\/g, '/');

    const dtRaw = path.join(artifactsDir, arch.id + '_dt_raw.png');
    const mbRaw = path.join(artifactsDir, arch.id + '_mb_raw.png');
    const compositeOut = path.join(artifactsDir, arch.id + '_showcase.jpg');

    console.log('Rendering Desktop for ' + arch.id + '...');
    const cmdDt = '"' + binary + '" --headless=new --disable-gpu --hide-scrollbars --window-size=1440,2400 --screenshot="' + dtRaw + '" "' + fileUrl + '"';
    execSync(cmdDt, { stdio: 'inherit' });

    console.log('Rendering Mobile for ' + arch.id + '...');
    const cmdMb = '"' + binary + '" --headless=new --disable-gpu --hide-scrollbars --window-size=390,2000 --screenshot="' + mbRaw + '" "' + fileUrl + '"';
    execSync(cmdMb, { stdio: 'inherit' });

    // Build side-by-side composite
    console.log('Compositing ' + arch.id + '...');
    const dtBuf = await sharp(dtRaw)
      .extract({ left: 0, top: 0, width: 1440, height: 2200 })
      .resize(720, 1100)
      .toBuffer();

    const mbBuf = await sharp(mbRaw)
      .extract({ left: 0, top: 0, width: 390, height: 2000 })
      .resize(220, 1100)
      .toBuffer();

    await sharp({
      create: {
        width: 980,
        height: 1100,
        channels: 3,
        background: { r: 10, g: 12, b: 18 },
      },
    })
      .composite([
        { input: dtBuf, left: 0, top: 0 },
        { input: mbBuf, left: 740, top: 0 },
      ])
      .jpeg({ quality: 90 })
      .toFile(compositeOut);

    console.log('Created showcase: ' + compositeOut);
  }

  console.log('All archetypes rendered successfully!');
}

run();
