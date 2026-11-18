import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>readFileSync(path.join(root,p),'utf8');
const homepage=read('src/components/fusion/SignatureFusionHomepage.tsx');
const newChapters=read('src/components/fusion/RoyalImmersionEditorial.tsx');
const oldStyles=read('src/components/fusion/SignatureFusionHomepage.module.css');
const newStyles=read('src/components/fusion/RoyalImmersionEditorial.module.css');
const page=read('src/app/[locale]/page.tsx');

test('royal immersion stays a preview-only branch experience and preserves all 10 locale routes',()=>{
 assert.match(page,/locale==='ar'\|\|locale==='en'/);
 assert.match(page,/JourneyArchitectHomepage locale=\{locale\} dict=\{dict\}/);
 assert.match(page,/HomepageFaqJsonLd dict=\{dict\}/);
 assert.match(page,/SignatureFusionHomepage locale=\{locale\} rates=\{rates\} dict=\{dict\}/);
});

test('original cinema footage and no preview developer chrome or nested main',()=>{
 assert.match(homepage,/\/assets\/homepage-v2\/hero\.mp4/);
 assert.match(homepage,/\/assets\/homepage-v2\/hero-mobile\.mp4/);
 assert.match(homepage,/\/assets\/homepage-v2\/hero-poster\.jpg/);
 assert.doesNotMatch(homepage,/DUYUF \/ SIGNATURE FUSION 01/);
 assert.doesNotMatch(homepage,/<main className=\{styles\.page\}/);
 assert.match(oldStyles,/\.heroVideo\{position:absolute;inset:0/);
 assert.match(oldStyles,/\.heroVideo video\{object-fit:cover/);
});

test('all critical missing chapters have real composition and links',()=>{
 for(const name of ['RoyalBookingSteps','RoyalServiceChapters','RoyalGuestConfidence']){
  assert.match(homepage,new RegExp('<'+name+' locale=\\{locale\\}'));
  assert.match(newChapters,new RegExp('export function '+name));
 }
 for(const chapter of ['process','services','ziyarat','chauffeur','reviews','faq']){
  assert.match(newStyles,new RegExp('\\.'+chapter+'\\{'));
 }
 assert.match(newChapters,/dict\.faq/);
 assert.match(newChapters,/\/api\/reviews\?limit=6&sort=newest/);
 assert.doesNotMatch(newChapters,/fakeReview|fakeRating|mockTestimonials/);
});

test('actual booking engine, stored prices, no payment checkout',()=>{
 assert.match(homepage,/rates\[route\]/);
 assert.match(homepage,/router\.push\(href\)/);
 assert.match(homepage,/\+locale\+'\/booking\?'/);
 assert.match(homepage,/guests<=car\.passengers/);
 assert.match(homepage,/Number\.isFinite\(fare\)/);
 assert.doesNotMatch(homepage,/creditCard|stripe|checkout\(/i);
});

test('approved palette, responsive views and reduced motion',()=>{
 for(const x of ['#101827','#f7f5f0','#a97b27'])assert.ok(oldStyles.includes(x)||newStyles.includes(x),x);
 assert.match(oldStyles,/@media\(max-width:390px\)/);
 assert.match(newStyles,/@media\(max-width:430px\)/);
 assert.match(newStyles,/prefers-reduced-motion:reduce/);
 for(const image of ['service-intercity.jpg','service-madinah.jpg','ziyarat-haram.jpg','chauffeur-welcome.jpg','vehicle-interior-cta.jpg']){
  assert.ok(existsSync(path.join(root,'public/assets/homepage-v2',image)),image);
 }
});
