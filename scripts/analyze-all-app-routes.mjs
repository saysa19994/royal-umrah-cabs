import fs from 'fs';
import path from 'path';

function walkDir(dir) {
  let results = [];
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    const st = fs.statSync(full);
    if (st.isDirectory()) {
      results.push(...walkDir(full));
    } else if (item === 'page.tsx' || item === 'layout.tsx' || item === 'route.ts') {
      results.push(full);
    }
  }
  return results;
}

const appDir = 'D:/royal-umrah-cabs/src/app';
const files = walkDir(appDir);

const analysis = [];

for (const file of files) {
  const rel = path.relative(appDir, file);
  const content = fs.readFileSync(file, 'utf8');

  // Check revalidate config
  const revalMatch = content.match(/export\s+const\s+revalidate\s*=\s*([^;]+);/);
  const dynamicMatch = content.match(/export\s+const\s+dynamic\s*=\s*([^;]+);/);
  const hasGSP = content.includes('generateStaticParams');
  const hasRevalidatePath = content.includes('revalidatePath');
  const hasRevalidateTag = content.includes('revalidateTag');

  // Check imports of cache functions
  const usesDbVehicles = content.includes('getDbVehiclesCached');
  const usesDbPrices = content.includes('getDbPricesCached');
  const usesPublicFaqs = content.includes('getPublicFaqsCached');
  const usesCmsPage = content.includes('getCmsPageCached');
  const usesFleetImages = content.includes('getFleetImagesCached');
  const usesSettings = content.includes('settings') || content.includes('fetchSettingsCached');

  analysis.push({
    file: rel,
    explicitRevalidate: revalMatch ? revalMatch[1].trim() : null,
    dynamic: dynamicMatch ? dynamicMatch[1].trim() : null,
    hasGSP,
    hasRevalidatePath,
    hasRevalidateTag,
    cacheDeps: {
      getDbVehiclesCached: usesDbVehicles,
      getDbPricesCached: usesDbPrices,
      getPublicFaqsCached: usesPublicFaqs,
      getCmsPageCached: usesCmsPage,
      getFleetImagesCached: usesFleetImages,
      settings: usesSettings,
    }
  });
}

fs.writeFileSync('D:/royal-umrah-cabs/scripts/app-routes-analysis.json', JSON.stringify(analysis, null, 2));
console.log('Saved app-routes-analysis.json. Analyzed', analysis.length, 'files.');
