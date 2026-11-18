import fs from 'fs';
import path from 'path';

const routePath = 'd:/royal-umrah-cabs/src/app/sitemap.xml/route.ts';
const disabledPath = 'd:/royal-umrah-cabs/src/app/sitemap.xml/_route.ts.disabled';

// If route.ts exists, rename to _route.ts.disabled
if (fs.existsSync(routePath)) {
  fs.renameSync(routePath, disabledPath);
  console.log('Renamed route.ts to _route.ts.disabled');
} else {
  console.log('route.ts does not exist or already renamed');
}
