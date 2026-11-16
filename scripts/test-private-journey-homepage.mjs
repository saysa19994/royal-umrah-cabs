import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const component = fs.readFileSync(path.join(root, 'src/components/home/PrivateJourneyHomepage.tsx'), 'utf8');
const stylesheet = fs.readFileSync(path.join(root, 'src/components/home/PrivateJourneyHomepage.module.css'), 'utf8');
const homepage = fs.readFileSync(path.join(root, 'src/app/[locale]/page.tsx'), 'utf8');

test('localized homepage routes to original booking system instead of a fake checkout', () => {
  assert.match(homepage, /<PrivateJourneyHomepage/);
  assert.match(component, /router\.push\(`\/\$\{locale\}\/booking\?/);
  assert.doesNotMatch(component, /fetch\(['"]\/api\/bookings/);
});
test('every supported locale has bespoke headline and booking labels', () => {
  for (const locale of ['en', 'ar', 'ms', 'id', 'ur', 'fr', 'es', 'de', 'tr', 'hi']) {
    assert.match(component, new RegExp(`\\b${locale}: \\{ heroA:`));
  }
});
test('route and fleet prices come from the real configuration, not fake fixed fallback', () => {
  assert.match(component, /AUTHORITATIVE_TRANSFER_RATES/);
  assert.match(component, /LOCALIZED_ROUTE_NAMES/);
  assert.match(component, /APPROVED_5_FLEET/);
  assert.doesNotMatch(component, /Math\.min\([^\n]*200|\|\|\s*200|\?\?\s*200/);
});
test('theme variants, mobile widths and reduced motion are explicitly supported', () => {
  assert.match(stylesheet, /data-theme="dark"/);
  assert.match(stylesheet, /@media\(max-width:767px\)/);
  assert.match(stylesheet, /@media\(max-width:390px\)/);
  assert.match(stylesheet, /prefers-reduced-motion/);
});
test('no selected car by default in the quick booking form', () => {
  assert.doesNotMatch(component.split('function submitQuickBooking')[0], /setVehicle\(/);
  assert.match(component, /new URLSearchParams\(\{ route, type: 'transfer', passengers: travelers, luggage \}\)/);
});
test('all static design photographs referenced by homepage exist', () => {
  const urls = Array.from(component.matchAll(/['"](\/assets\/[^'"\n]+\.(?:jpg|webp|png))['"]/g)).map(m => m[1]);
  assert.ok(urls.length >= 8);
  for (const url of urls) assert.ok(fs.existsSync(path.join(root, 'public', url)), `${url} is missing`);
});


test('approved cinematic hero uses real mobile and desktop video assets', () => {
  assert.match(component, /<video/);
  assert.match(component, /poster="\/assets\/homepage-v2\/hero-poster\.jpg"/);
  assert.match(component, /heroA: 'Your Journey,'/);
  assert.match(component, /heroB: 'Our'/);
  assert.match(component, /heroC: 'Priority\.'/);
  assert.match(component, /heroA: 'رحلتك'/);
  assert.match(component, /heroB: 'تستحق عناية'/);
  assert.match(component, /planJourney: 'Book Your Private Ride'/);
  assert.match(component, /prefers-reduced-motion: reduce/);
  assert.doesNotMatch(component, /\/assets\/images\/yukon_exterior\.jpg/);
  for (const file of [
    'hero.mp4', 'hero.webm', 'hero-mobile.mp4', 'hero-mobile.webm', 'hero-poster.jpg',
  ]) {
    assert.ok(fs.existsSync(path.join(root, 'public/assets/homepage-v2', file)), `Hero asset missing: ${file}`);
  }
});


test('homepage follows the requested nine-part customer journey without repeating route galleries', () => {
  const sectionNames = [...component.matchAll(/<section className=\{styles\.(\w+)\}/g)].map(match => match[1]);
  assert.deepEqual(sectionNames, [
    'hero', 'assurance', 'stepsSection', 'fleetSection', 'servicesSection',
    'whySection', 'reviewsSection', 'faqSection', 'finalSection',
  ]);
  assert.doesNotMatch(component, /ARC_IMAGES|styles\.destinationSection|styles\.processSection|styles\.editorialSection|styles\.routeExplorer/);
  assert.match(component, /id="pj-steps"/);
  assert.match(component, /id="pj-fleet"/);
  assert.match(component, /id="pj-services"/);
  assert.match(component, /id="pj-why"/);
  assert.match(component, /id="pj-faq"/);
  assert.match(component, /DUYUF_HOME_LAYOUT\[locale\]/);
  assert.match(component, /href=\{\`\/\$\{locale\}\/services\`\}/);
});

test('homepage uses distinct imagery for every prominent content stage', () => {
  const imagePaths = [...component.matchAll(/['"](\/assets\/[^'"\n]+\.(?:jpg|webp|png))['"]/g)]
    .map(match => match[1]);
  assert.equal(new Set(imagePaths).size, imagePaths.length, 'Duplicate prominent photo found');
  assert.ok(imagePaths.length >= 8);
});

test('homepage styles use bounded photography and one responsive cascade', () => {
  assert.doesNotMatch(stylesheet, /\.arcTrack|\.arcPhoto|\.destinationSection/);
  assert.doesNotMatch(stylesheet, /\.processGrid|\.processStep|\.processSection/);
  assert.doesNotMatch(stylesheet, /\.editorialGrid|\.editorialCard|\.routeExplorer/);
  assert.match(stylesheet, /\.fleetImage\{height:370px/);
  assert.match(stylesheet, /\.serviceImage\{height:165px/);
  assert.match(stylesheet, /\.heroVisual\{position:absolute;inset:0;width:100%;height:100%/);
});

test('every supported locale has independently authored compact homepage copy', () => {
  const layout = fs.readFileSync(path.join(root, 'src/data/duyuf-homepage-layout-copy.ts'),'utf8');
  for (const lang of ['en','ar','ms','id','ur','fr','es','de','tr','hi']) {
    assert.ok(layout.includes('  '+lang+': {'), 'Missing editorial localization '+lang);
  }
  assert.match(layout, /arrivalDesc/);
  assert.match(layout, /miqatDesc/);
  assert.match(layout, /familyDesc/);
});

test('no instant booking confirmation or fabricated reviews in homepage', () => {
  assert.doesNotMatch(component, /Instant Confirmation|10,000\+|5[,.]0?\/5/);
  assert.match(component, /\/\$\{locale\}\/reviews/);
  assert.match(component, /\/\$\{locale\}\/booking/);
});
