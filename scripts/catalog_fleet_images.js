const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function run() {
  const galleryDir = path.join(__dirname, '../public/assets/images/extracted_gallery');
  const files = fs.readdirSync(galleryDir).filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.webp'));
  
  console.log(`Analyzing ${files.length} images...`);
  const results = [];

  for (const file of files) {
    const fullPath = path.join(galleryDir, file);
    const meta = await sharp(fullPath).metadata();
    const stats = await sharp(fullPath).stats();
    
    results.push({
      file,
      width: meta.width,
      height: meta.height,
      aspect: (meta.width / meta.height).toFixed(2),
      sizeKb: Math.round(fs.statSync(fullPath).size / 1024),
      channels: stats.channels.map(c => Math.round(c.mean))
    });
  }

  fs.writeFileSync(
    path.join(__dirname, '../public/assets/images/extracted_gallery/manifest.json'),
    JSON.stringify(results, null, 2)
  );

  console.log('Saved manifest.json with', results.length, 'records.');
}

run().catch(console.error);
