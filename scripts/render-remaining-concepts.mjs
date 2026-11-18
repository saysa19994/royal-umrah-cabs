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
    id: 'concept_05_smart_executive',
    title: 'المفهوم 5: التنفيذي الذكي (The Smart Executive)',
    file: 'design-concepts/concept-05-smart-executive.html',
    bg: { r: 11, g: 15, b: 23 }
  },
  {
    id: 'concept_06_cinematic_story',
    title: 'المفهوم 6: الرحلة السينمائية (The Cinematic Story)',
    file: 'design-concepts/concept-06-cinematic-story.html',
    bg: { r: 10, g: 10, b: 12 }
  },
  {
    id: 'concept_07_bold_typography',
    title: 'المفهوم 7: التايبوجرافي الجريء (Bold Typography)',
    file: 'design-concepts/concept-07-bold-typography.html',
    bg: { r: 245, g: 245, b: 245 }
  },
  {
    id: 'concept_08_refreshing_oasis',
    title: 'المفهوم 8: واحة الاسترخاء (The Refreshing Oasis)',
    file: 'design-concepts/concept-08-refreshing-oasis.html',
    bg: { r: 241, g: 247, b: 244 }
  },
  {
    id: 'concept_09_cockpit_dashboard',
    title: 'المفهوم 9: لوحة القيادة المتقدمة (The Cockpit Experience)',
    file: 'design-concepts/concept-09-cockpit-dashboard.html',
    bg: { r: 10, g: 11, b: 14 }
  },
  {
    id: 'concept_10_fluid_future',
    title: 'المفهوم 10: المستقبل الانسيابي (The Fluid Future)',
    file: 'design-concepts/concept-10-fluid-future.html',
    bg: { r: 6, g: 7, b: 19 }
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

  console.log('\nAll remaining concepts (5 through 10) rendered and composited successfully!');
}

run().catch(err => {
  console.error('Render error:', err);
  process.exit(1);
});
