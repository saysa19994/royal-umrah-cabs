import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const OUT_DIR = 'C:/Users/PC/.gemini/antigravity/brain/028241d2-64be-4ca9-89f1-f51955dd1b75/verified_hospitality';
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const targets = [
  { url: 'http://localhost:3000/', name: 'homepage_desktop_1440px.png', width: 1440, height: 900 },
  { url: 'http://localhost:3000/', name: 'homepage_mobile_375px.png', width: 375, height: 812 },
  { url: 'http://localhost:3000/ar/fleet', name: 'fleet_desktop_1440px.png', width: 1440, height: 900 },
  { url: 'http://localhost:3000/ar/fleet', name: 'fleet_mobile_375px.png', width: 375, height: 812 },
  { url: 'http://localhost:3000/ar/services', name: 'services_desktop_1440px.png', width: 1440, height: 900 },
  { url: 'http://localhost:3000/ar/ziyarat', name: 'ziyarat_desktop_1440px.png', width: 1440, height: 900 },
  { url: 'http://localhost:3000/ar/blog', name: 'blog_desktop_1440px.png', width: 1440, height: 900 },
  { url: 'http://localhost:3000/ar/about', name: 'about_desktop_1440px.png', width: 1440, height: 900 },
];

async function run() {
  console.log('Launching browser...');
  const browser = await chromium.launch();
  
  for (const t of targets) {
    console.log(`Capturing ${t.name}...`);
    const page = await browser.newPage({
      viewport: { width: t.width, height: t.height },
      locale: 'ar-SA',
    });
    await page.goto(t.url, { waitUntil: 'networkidle', timeout: 30000 });
    // Wait an extra 500ms for images
    await page.waitForTimeout(1000);
    const savePath = path.join(OUT_DIR, t.name);
    await page.screenshot({ path: savePath, fullPage: true });
    console.log(`Saved: ${savePath}`);
    await page.close();
  }

  await browser.close();
  console.log('All screenshots captured successfully!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
