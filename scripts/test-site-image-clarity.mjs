import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import sharp from 'sharp';

const read = file=>readFileSync(new URL('../'+file,import.meta.url),'utf8');
const services=read('src/app/[locale]/services/page.tsx');
const explorer=read('src/components/services/ServiceChapterExplorer.tsx');
const explorerStyle=read('src/components/services/ServiceChapterExplorer.module.css');
const home=read('src/components/fusion/SignatureFusionHomepage.tsx');
const routeMedia=read('src/components/fusion/royal-home-routes.ts');
const homeStyle=read('src/components/fusion/SignatureFusionHomepage.module.css');
const fleet=read('src/components/fleet/FleetAtelier.tsx');
const booking=read('src/components/booking/BookingJourneyVisual.tsx');
const config=read('next.config.mjs');

const serviceSources=[
 '/assets/blueprint/routes/hero-arrival.webp',
 '/assets/blueprint/routes/madinah-ziyarat.webp',
 '/assets/blueprint/routes/makkah-madinah.webp',
 '/assets/blueprint/blog/vip-umrah-transport-jeddah-to-makkah.webp',
 '/assets/blueprint/vehicles/toyota-coaster.webp',
 '/assets/homepage-v2/chauffeur-welcome.jpg'
];

test('all six service photographs are real project files and suitably resolved',async()=>{
 for(const file of serviceSources){
  assert.ok(services.includes("image: '"+file+"'"),file);
  const original=new URL('../public'+file,import.meta.url);
  assert.ok(existsSync(original),file);
  const meta=await sharp(original.pathname).metadata();
  assert.ok(meta.width>=1000,file+' width='+meta.width);
  assert.ok(meta.height>=700,file+' height='+meta.height);
 }
 assert.doesNotMatch(services,/image: '\/assets\/images\/cinematic\/home\/hero-mercedes-kaaba-retina\.jpg'/);
 assert.match(config,/formats: \['image\/avif', 'image\/webp'\]/);
});

test('unmodified route, fare, accessibility and localization logic stays in services',()=>{
 assert.match(explorer,/role="tablist"/);
 assert.match(explorer,/role="tabpanel"/);
 assert.match(explorer,/setActive\(i\)/);
 assert.match(explorer,/BOOKING\[item\.id\]/);
 assert.match(explorer,/quality=\{88\}/);
 assert.match(explorer,/quality=\{87\}/);
 assert.match(explorer,/data-service-id=\{service\.id\}/);
 assert.match(explorer,/data-service-id=\{item\.id\}/);
 assert.match(explorerStyle,/data-service-id="group-travel"\] \.photo/);
 assert.match(explorerStyle,/object-fit:contain/);
});

test('homepage route atlas has legible cards, preserved booking action and higher quality destinations',()=>{
 assert.match(homeStyle,/grid-template-columns:repeat\(5,minmax\(0,1fr\)\)/);
 assert.match(homeStyle,/grid-template-columns:repeat\(2,minmax\(0,1fr\)\)!important/);
 assert.match(homeStyle,/\.routeCurtainPanel:focus-visible/);
 assert.match(home,/quality=\{86\}/);
 assert.match(home,/onClick=\{\(\) => changeSelection\(item\.id, guests\)\}/);
 assert.match(home,/disabled=\{!href\} onClick=\{book\}/);
 assert.match(home, /const FILM = '\/assets\/homepage-v2\/hero\.mp4'/);
});

test('other full-bleed site imagery uses adequate sources and responsive optimized images',async()=>{
 const image='/assets/images/cinematic/fleet/yukon-dark-studio.jpg';
 assert.ok(home.includes(image));
 const meta=await sharp(new URL('../public'+image,import.meta.url).pathname).metadata();
 assert.ok(meta.width>=1300&&meta.height>=700);
 assert.match(home,/quality=\{88\}/);
 assert.match(fleet,/quality=\{88\}/);
 assert.match(fleet,/quality=\{87\}/);
 assert.match(booking,/quality=\{88\}/);
});

test('all official homepage route curtains use vetted high-resolution route WebP assets',async()=>{
 const images=[
  '/assets/blueprint/routes/jeddah-makkah.webp',
  '/assets/blueprint/routes/makkah-madinah.webp',
  '/assets/blueprint/routes/hero-arrival.webp',
  '/assets/blueprint/routes/makkah-taif.webp',
  '/assets/blueprint/blog/riyadh-to-makkah-private-transfer.webp'
 ];
 for (const file of images) {
  assert.ok(routeMedia.includes(file),file);
  const meta=await sharp(new URL('../public'+file,import.meta.url).pathname).metadata();
  assert.ok(meta.width>=1500&&meta.height>=1000,file+' '+meta.width+'x'+meta.height);
  assert.equal(meta.format,'webp');
 }
 assert.match(routeMedia,/image: sharpEditorialPhotos\[route\.id\] \|\| media \+ route\.image/);
 assert.match(home,/route === item\.id \? "\(max-width:760px\) 100vw/);
});

test('all executive route gallery file paths exist, including GMC Yukon XL',()=>{
 const routeData=read('src/data/executive-routes-data.ts');
 assert.doesNotMatch(routeData,/\/assets\/images\/vehicles\/gmc-yukon\//);
 const assetPaths=[...routeData.matchAll(/['"]((?:\/assets\/)[^'"]+?\.(?:webp|jpg|jpeg|png|avif))['"]/g)].map(x=>x[1]);
 for(const file of [...new Set(assetPaths)]) {
  assert.ok(existsSync(new URL('../public'+file,import.meta.url)),file);
 }
 assert.ok(assetPaths.some(x=>x.includes('gmc-yukon-xl/')));
});
