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
  assert.match(stylesheet, /@media \(max-width:767px\)/);
  assert.match(stylesheet, /@media \(max-width:390px\)/);
  assert.match(stylesheet, /prefers-reduced-motion/);
});
test('no selected car by default in the quick booking form', () => {
  assert.doesNotMatch(component.split('function submitQuickBooking')[0], /setVehicle\(/);
  assert.match(component, /new URLSearchParams\(\{ route, type: 'transfer', passengers: travelers, luggage \}\)/);
});
test('all static design photographs referenced by homepage exist', () => {
  const urls = Array.from(component.matchAll(/['"](\/assets\/[^'"\n]+\.(?:jpg|webp|png))['"]/g)).map(m => m[1]);
  assert.ok(urls.length >= 10);
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
