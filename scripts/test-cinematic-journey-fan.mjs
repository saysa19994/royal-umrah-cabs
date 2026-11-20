import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const read = path => readFileSync(new URL('../'+path,import.meta.url),'utf8');
const home = read('src/components/fusion/SignatureFusionHomepage.tsx');
const css = read('src/components/fusion/SignatureFusionHomepage.module.css');

test('one coherent homepage journey uses a five-photo fan and original hero video',()=>{
 const photos=[
  'assets/homepage-v2/chauffeur-welcome.jpg',
  'assets/images/vehicles/hyundai-staria/interior.webp',
  'assets/images/routes/makkah-to-madinah.jpg',
  'assets/images/vehicles/gmc-yukon-xl/exterior-studio.webp',
  'assets/homepage-v2/ziyarat-haram.jpg',
 ];
 for(const photo of photos){
  assert.ok(existsSync(new URL('../public/'+photo,import.meta.url)),photo);
  assert.ok(home.includes('/'+photo),photo);
 }
 assert.match(home,/const journeyDeck = \[/);
 assert.match(home,/storyPhotoDeck/);
 assert.equal((home.match(/id="fusion-story"/g)||[]).length,1);
 assert.match(home,/const FILM = '\/assets\/homepage-v2\/hero\.mp4'/);
 assert.match(home,/const MOBILE_FILM = '\/assets\/homepage-v2\/hero-mobile\.mp4'/);
 assert.match(home,/const POSTER = '\/assets\/homepage-v2\/hero-poster\.jpg'/);
});

test('every story chapter stays clickable, localized and linked to booking',()=>{
 assert.match(home,/onClick=\{\(\) => setChapter\(photo\.chapter\)\}/);
 assert.match(home,/aria-pressed=\{chapter === photo\.chapter\}/);
 assert.match(home,/aria-pressed=\{chapter === index\}/);
 assert.match(home,/href="#fusion-book"/);
 assert.match(home,/copy\.arrivalDetail/);
 assert.match(home,/copy\.cabinDetail/);
 assert.match(home,/copy\.destinationDetail/);
 assert.match(home,/ref=\{storySection\}/);
});

test('photo fan has touch-first mobile, visible focus and reduced motion fallback',()=>{
 assert.match(css,/\.storyPhotoDeck/);
 assert.match(css,/\.storyDeckCard:focus-visible/);
 assert.match(css,/scroll-snap-type:x proximity/);
 assert.match(css,/@media \(max-width:760px\)/);
 assert.match(css,/@media \(prefers-reduced-motion:reduce\)/);
 assert.match(css,/\.storyImageCaption/);
});
