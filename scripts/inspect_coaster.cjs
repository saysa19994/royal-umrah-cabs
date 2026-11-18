const sharp = require('sharp');
const fs = require('fs');

async function run() {
  const { data, info } = await sharp('public/assets/images/fleet_catalog/The Toyota Coaster.jpg')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const visited = new Uint8Array(width * height);
  const isBg = new Uint8Array(width * height);

  // Studio background color reference at top
  // Let's sample background from top-left, top-center, top-right
  const queue = [];

  // Seed the queue with all border pixels except the very bottom middle (where tires shadow might touch)
  // Let's seed top edge, left edge (y < height - 100), right edge (y < height - 100)
  for (let x = 0; x < width; x++) {
    queue.push(x, 0); // (x, 0)
    visited[0 * width + x] = 1;
    isBg[0 * width + x] = 1;
  }
  for (let y = 1; y < height; y++) {
    queue.push(0, y);
    visited[y * width + 0] = 1;
    isBg[y * width + 0] = 1;

    queue.push(width - 1, y);
    visited[y * width + (width - 1)] = 1;
    isBg[y * width + (width - 1)] = 1;
  }
  // Bottom corners
  for (let x = 0; x < 400; x++) {
    queue.push(x, height - 1);
    visited[(height - 1) * width + x] = 1;
    isBg[(height - 1) * width + x] = 1;
  }
  for (let x = width - 400; x < width; x++) {
    queue.push(x, height - 1);
    visited[(height - 1) * width + x] = 1;
    isBg[(height - 1) * width + x] = 1;
  }

  let head = 0;
  while (head < queue.length) {
    const x = queue[head++];
    const y = queue[head++];

    const idx = (y * width + x) * 3;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];

    const neighbors = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ];

    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nPos = ny * width + nx;
        if (!visited[nPos]) {
          visited[nPos] = 1;
          const nIdx = nPos * 3;
          const nr = data[nIdx];
          const ng = data[nIdx + 1];
          const nb = data[nIdx + 2];

          const brightness = (nr + ng + nb) / 3;
          const sat = Math.max(nr, ng, nb) - Math.min(nr, ng, nb);

          // Studio backdrop: high brightness, low saturation
          // Studio background in this photo is grey/blue-grey: brightness > 185, sat < 25
          // or close to the neighbor
          const diff = Math.abs(r - nr) + Math.abs(g - ng) + Math.abs(b - nb);

          if (brightness > 185 && sat < 25 && diff < 30) {
            isBg[nPos] = 1;
            queue.push(nx, ny);
          } else if (brightness > 200 && sat < 20) {
            isBg[nPos] = 1;
            queue.push(nx, ny);
          }
        }
      }
    }
  }

  // Count background vs foreground
  let bgCount = 0;
  for (let i = 0; i < isBg.length; i++) {
    if (isBg[i]) bgCount++;
  }
  console.log('Total pixels:', width * height, 'Background pixels:', bgCount, 'Ratio:', bgCount / (width * height));

  // Build RGBA output
  const outData = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pos = y * width + x;
      const srcIdx = pos * 3;
      const dstIdx = pos * 4;

      outData[dstIdx] = data[srcIdx];
      outData[dstIdx + 1] = data[srcIdx + 1];
      outData[dstIdx + 2] = data[srcIdx + 2];

      if (isBg[pos]) {
        outData[dstIdx + 3] = 0;
      } else {
        outData[dstIdx + 3] = 255;
      }
    }
  }

  // Resize to 1400x781 to match other studio-2k images!
  await sharp(outData, {
    raw: {
      width,
      height,
      channels: 4,
    },
  })
    .resize(1400, 781, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 90 })
    .toFile('public/assets/images/studio-2k/toyota-coaster-studio-2k.webp');

  console.log('Saved public/assets/images/studio-2k/toyota-coaster-studio-2k.webp');
}

run().catch(console.error);
