import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const read = (path) => readFileSync(new URL('../'+path,import.meta.url),'utf8');
const source = read('src/lib/route-media.ts');
const js = ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS}}).outputText;
const exports = {};
vm.runInNewContext(js, {exports,URL,process:{env:{NEXT_PUBLIC_SUPABASE_URL:'https://skyhpzdeapmttgmvcoeh.supabase.co'}}});
const {normalizeRoutePhotoUrl,getRoutePhotoFromTranslations,withRoutePhoto} = exports;

test('route photos allow only verified local assets and project public route uploads',()=>{
 const local='/assets/images/routes/makkah-to-madinah.jpg';
 const remote='https://skyhpzdeapmttgmvcoeh.supabase.co/storage/v1/object/public/media/routes/makkah-to-madinah_1740000000_photo.webp';
 assert.equal(normalizeRoutePhotoUrl(local),local);
 assert.equal(normalizeRoutePhotoUrl(remote),remote);
 assert.equal(normalizeRoutePhotoUrl(''),null);
 for(const unsafe of [
  'javascript:alert(1)','http://skyhpzdeapmttgmvcoeh.supabase.co/storage/v1/object/public/media/routes/test.webp',
  'https://evil.example/storage/v1/object/public/media/routes/test.webp',
  'https://skyhpzdeapmttgmvcoeh.supabase.co/storage/v1/object/sign/media/routes/test.webp',
  'https://skyhpzdeapmttgmvcoeh.supabase.co/storage/v1/object/public/media/fleet/test.webp',
  '/admin/login','/assets/images/routes/../../secret.jpg',
  'https://skyhpzdeapmttgmvcoeh.supabase.co/storage/v1/object/public/media/routes/x.webp?token=secret',
 ])assert.equal(normalizeRoutePhotoUrl(unsafe),undefined,unsafe);
 assert.equal(normalizeRoutePhotoUrl(null),undefined);
});

test('photo edits never discard localized route content and can revert to default',()=>{
 const original={en:{origin:'Jeddah',destination:'Makkah'},ar:{origin:'جدة',destination:'مكة'},__media:{copyright:'owned'}};
 const url='/assets/images/routes/jeddah-airport-to-makkah.jpg';
 const revised=withRoutePhoto(original,url);
 assert.equal(getRoutePhotoFromTranslations(revised),url);
 assert.deepEqual(JSON.parse(JSON.stringify(revised.en)),original.en);
 assert.deepEqual(JSON.parse(JSON.stringify(revised.ar)),original.ar);
 assert.equal(revised.__media.copyright,'owned');
 assert.equal(getRoutePhotoFromTranslations(withRoutePhoto(revised,null)),null);
 assert.equal(getRoutePhotoFromTranslations({__media:{cover_image_url:'https://evil.example/img.jpg'}}),null);
});

test('route editor uploads to Supabase and saves a validated per-route cover',()=>{
 const admin=read('src/app/admin/routes/page.tsx');
 const api=read('src/app/api/admin/routes/route.ts');
 const upload=read('src/app/api/admin/media/upload/route.ts');
 assert.match(admin,/data\.append\('category', 'routes'\)/);
 assert.match(admin,/fetch\('\/api\/admin\/media\/upload'/);
 assert.match(admin,/route_image_url: publishedPhoto/);
 assert.match(admin,/Restore default/);
 assert.match(api,/normalizeRoutePhotoUrl\(body\.route_image_url\)/);
 assert.match(api,/withRoutePhoto\(existing\.translations, photo \?\? null\)/);
 assert.match(api,/requireRole\(request, \['owner', 'admin'\]\)/);
 assert.match(api,/revalidateTag\('site_routes'\)/);
 assert.match(upload,/\.from\('media'\)/);
});

test('published route cover appears in route atlas, detail hero and social metadata',()=>{
 const cache=read('src/lib/public-route-availability.ts');
 const listing=read('src/app/[locale]/routes/page.tsx');
 const atlas=read('src/components/routes/RouteNetworkDesk.tsx');
 const detail=read('src/app/[locale]/routes/[slug]/page.tsx');
 assert.match(cache,/export const getPublishedRouteImagesCached/);
 assert.match(cache,/tags: \['site_routes'\]/);
 assert.match(listing,/getPublishedRouteImagesCached\(\)/);
 assert.match(atlas,/routeImages\[route\.slug\] \|\| ROUTE_PHOTOS\[route\.slug\]/);
 assert.match(detail,/publishedCovers\[slug\]/);
 assert.match(detail,/images: \[\{ url: editorialCover/);
});
