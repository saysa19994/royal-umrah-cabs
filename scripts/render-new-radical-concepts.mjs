import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const projectRoot = 'D:/royal-umrah-cabs';
const artifactsDir = 'C:/Users/PC/.gemini/antigravity/brain/b85e6102-b6eb-4565-9493-6e009226675e';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const fallbackEdge = 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe';
const binary = fs.existsSync(edgePath) ? edgePath : fallbackEdge;

const concepts = [
  {
    id: 'concept_01_serene_minimalist',
    title: 'المفهوم 1: الروحانية الهادئة (The Serene Minimalist)',
    file: 'design-concepts/concept-01-serene-minimalist.html',
    bg: { r: 248, g: 249, b: 250 }
  },
  {
    id: 'concept_02_saudi_heritage',
    title: 'المفهوم 2: التراث الملكي المعاصر (Modern Saudi Heritage)',
    file: 'design-concepts/concept-02-saudi-heritage.html',
    bg: { r: 41, g: 35, b: 31 }
  },
  {
    id: 'concept_03_hotel_concierge',
    title: 'المفهوم 3: كونسيرج الفنادق 5 نجوم (Hotel Concierge)',
    file: 'design-concepts/concept-03-hotel-concierge.html',
    bg: { r: 25, g: 27, b: 31 }
  },
  {
    id: 'concept_04_exclusive_club',
    title: 'المفهوم 4: نادي النخبة المغلق (The Exclusive Club)',
    file: 'design-concepts/concept-04-exclusive-club.html',
    bg: { r: 18, g: 19, b: 22 }
  }
];

async function run() {
  for (const c of concepts) {
    const filePath = path.resolve(projectRoot, c.file);
    const fileUrl = 'file:///' + filePath.replace(/\\/g, '/');

    const dtRaw = path.join(artifactsDir, c.id + '_dt_raw.png');
    const mbRaw = path.join(artifactsDir, c.id + '_mb_raw.png');
    const showcaseOut = path.join(artifactsDir, c.id + '_showcase.jpg');

    console.log(`\n========================================`);
    console.log(`Rendering: ${c.title}`);
    console.log(`Desktop (1440x2600)...`);
    const cmdDt = `"${binary}" --headless=new --disable-gpu --hide-scrollbars --window-size=1440,2600 --screenshot="${dtRaw}" "${fileUrl}"`;
    execSync(cmdDt, { stdio: 'inherit' });

    console.log(`Mobile (390x2200)...`);
    const cmdMb = `"${binary}" --headless=new --disable-gpu --hide-scrollbars --window-size=390,2200 --screenshot="${mbRaw}" "${fileUrl}"`;
    execSync(cmdMb, { stdio: 'inherit' });

    console.log(`Compositing Desktop + Mobile showcase...`);
    const dtBuf = await sharp(dtRaw)
      .extract({ left: 0, top: 0, width: 1440, height: 2300 })
      .resize(720, 1150)
      .toBuffer();

    const mbBuf = await sharp(mbRaw)
      .extract({ left: 0, top: 0, width: 390, height: 2000 })
      .resize(230, 1150)
      .toBuffer();

    await sharp({
      create: {
        width: 1000,
        height: 1150,
        channels: 3,
        background: c.bg
      }
    })
      .composite([
        { input: dtBuf, left: 15, top: 0 },
        { input: mbBuf, left: 755, top: 0 }
      ])
      .jpeg({ quality: 92 })
      .toFile(showcaseOut);

    console.log(`✓ Showcase created: ${showcaseOut}`);
  }

  console.log('\nAll 4 Radical Concepts rendered and composited successfully!');
}

run().catch(err => {
  console.error('Render error:', err);
  process.exit(1);
});
