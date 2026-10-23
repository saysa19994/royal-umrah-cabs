const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function run() {
  const srcDir = 'C:/Users/PC/Pictures/New folder (3)';
  const destDir = path.join(__dirname, '../public/assets/images/fleet_catalog');
  
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const files = fs.readdirSync(srcDir);
  console.log(`Processing ${files.length} files from ${srcDir}...`);

  const manifest = [];

  for (const file of files) {
    const fullPath = path.join(srcDir, file);
    // Copy file to destDir
    const destPath = path.join(destDir, file);
    fs.copyFileSync(fullPath, destPath);

    const meta = await sharp(fullPath).metadata();
    
    // Determine category based on filename
    let category = 'Unassigned';
    if (file.toLowerCase().includes('maybach')) category = 'Mercedes-Maybach S-Class';
    else if (file.toLowerCase().includes('yukon')) category = 'GMC Yukon XL';
    else if (file.toLowerCase().includes('camry')) category = 'Toyota Camry';
    else if (file.toLowerCase().includes('h1')) category = 'Hyundai H1 Starex';
    else if (file.toLowerCase().includes('hiace')) category = 'Toyota HiAce';
    else if (file.toLowerCase().includes('coaster')) category = 'Toyota Coaster';
    else if (file.toLowerCase().includes('hyundai_vehicle')) category = 'Hyundai Staria VIP';
    
    manifest.push({
      file,
      category,
      width: meta.width,
      height: meta.height,
      sizeKb: Math.round(fs.statSync(fullPath).size / 1024)
    });
  }

  fs.writeFileSync(path.join(destDir, 'manifest.json'), JSON.stringify(manifest, null, 2));

  // Create an HTML inspector
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Fleet Catalog Visual Inspector</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #0f172a; color: #f8fafc; padding: 24px; margin: 0; }
    h1 { font-size: 24px; margin-bottom: 20px; color: #fbbf24; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px; }
    .card { background: #1e293b; border-radius: 12px; overflow: hidden; border: 1px solid #334155; }
    .card img { width: 100%; height: 220px; object-fit: cover; display: block; }
    .info { padding: 12px; font-size: 13px; }
    .badge { display: inline-block; padding: 3px 8px; border-radius: 6px; font-size: 11px; font-weight: bold; background: #fbbf24; color: #0f172a; margin-bottom: 6px; }
    .dim { color: #94a3b8; font-size: 11px; }
  </style>
</head>
<body>
  <h1>Royal Umrah Cabs — Complete Extracted Vehicle Photo Library (${manifest.length} Images)</h1>
  <div class="grid">
    ${manifest.map((m, idx) => `
      <div class="card">
        <img src="/assets/images/fleet_catalog/${encodeURIComponent(m.file)}" alt="${m.file}" loading="lazy" />
        <div class="info">
          <span class="badge">${m.category}</span>
          <div style="font-weight:600; word-break: break-all; margin-bottom:4px;">#${idx+1}: ${m.file}</div>
          <div class="dim">${m.width}x${m.height} • ${m.sizeKb} KB</div>
        </div>
      </div>
    `).join('')}
  </div>
</body>
</html>`;

  fs.writeFileSync(path.join(__dirname, '../public/fleet_catalog_inspector.html'), html);
  console.log('Successfully generated public/fleet_catalog_inspector.html');
}

run().catch(console.error);
