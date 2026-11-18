const sharp = require('sharp');
const fs = require('fs');

async function makeTransparent(inputPath, outputPath) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  // If a pixel is very close to the light grey background (r, g, b > 210 and diff < 15), make alpha 0 or gradual
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const brightness = (r + g + b) / 3;
    const diff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));

    // Studio background is near-neutral grey/white with low saturation
    if (brightness > 220 && diff < 12) {
      data[i + 3] = 0; // completely transparent
    } else if (brightness > 200 && diff < 12) {
      // Smooth feather transition
      const alpha = Math.round(((220 - brightness) / 20) * 255);
      data[i + 3] = Math.min(data[i + 3], alpha);
    }
  }

  await sharp(data, {
    raw: {
      width,
      height,
      channels: 4,
    },
  })
    .webp({ quality: 90 })
    .toFile(outputPath);

  console.log('Saved transparent image to:', outputPath);
}

const vehicles = [
  'toyota-camry',
  'hyundai-staria',
  'gmc-yukon-xl',
  'toyota-hiace',
  'toyota-coaster',
];

(async () => {
  for (const v of vehicles) {
    const inPath = `public/assets/images/reference/${v}.webp`;
    const outPath = `public/assets/images/reference/${v}-transparent.webp`;
    if (fs.existsSync(inPath)) {
      await makeTransparent(inPath, outPath);
    }
  }
})();
