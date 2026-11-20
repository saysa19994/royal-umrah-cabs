import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const read = file => readFileSync(new URL('../'+file,import.meta.url),'utf8');
const page = read('src/app/[locale]/booking/page.tsx');
const scene = read('src/components/booking/BookingJourneyVisual.tsx');
const styles = read('src/components/booking/BookingJourneyVisual.module.css');
const layout = read('src/app/[locale]/booking/booking-visual-journey.css');

test('booking entrance replaces static composition with real three-stage cinematic imagery', () => {
 assert.match(page,/import \{ BookingJourneyVisual \}/);
 assert.match(page,/<BookingJourneyVisual locale=\{locale\} \/>/);
 assert.match(page,/\{pageText\.subtitle\}/);
 assert.doesNotMatch(page,/duyuf-booking-hero-vehicle/);
 for(const path of [
  'assets/homepage-v2/chauffeur-welcome.jpg',
  'assets/images/vehicles/hyundai-staria/interior.webp',
  'assets/homepage-v2/ziyarat-haram.jpg',
 ]) {
  assert.ok(existsSync(new URL('../public/'+path,import.meta.url)),path);
  assert.ok(scene.includes('/'+path),path);
 }
 assert.match(scene,/copy\.arrivalDetail/);
 assert.match(scene,/copy\.cabinDetail/);
 assert.match(scene,/copy\.destinationDetail/);
});

test('three stage tabs never create fake reservations or change the booking wizard',()=>{
 assert.match(scene,/useState\(0\)/);
 assert.match(scene,/setSelected\(index\)/);
 assert.match(scene,/aria-pressed=\{selected === index\}/);
 assert.match(scene,/aria-live="polite"/);
 assert.match(page,/<BookingWizard/);
 assert.match(page,/initialRates=\{await getDbPricesCached\(\)\}/);
 assert.match(page,/initialRoute=\{resolvedRoute\}/);
 assert.match(page,/initialVehicle=\{resolvedVehicle\}/);
 assert.match(page,/initialPassengers=\{resolvedPassengers\}/);
 assert.match(page,/id="booking-reservation"/);
 assert.match(page,/pageText\.trust1/);
 assert.match(page,/pageText\.trust2/);
 assert.match(page,/pageText\.trust3/);
});

test('booking hero is structurally different, mobile-first and accessible',()=>{
 assert.match(layout,/booking-visual-journey/);
 assert.match(layout,/grid-template-columns:minmax\(0,\.86fr\) minmax\(0,1\.14fr\)/);
 assert.match(layout,/flex-direction:column!important/);
 assert.match(layout,/@media\(max-width:767px\)/);
 assert.match(layout,/@media\(prefers-reduced-motion:reduce\)/);
 assert.match(styles,/\.stageTab:focus-visible/);
 assert.match(styles,/\.stageSelector/);
 assert.match(styles,/\.carouselControls/);
 assert.match(styles,/@media\(max-width:767px\)/);
 assert.match(styles,/@media\(prefers-reduced-motion:reduce\)/);
});
