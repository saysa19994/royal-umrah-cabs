import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const servicesPage=read('src/app/[locale]/services/page.tsx');
const chapter=read('src/components/services/ServiceChapterExplorer.tsx');
const chapterCss=read('src/components/services/ServiceChapterExplorer.module.css');
const ziyarat=read('src/components/ziyarat/SacredZiyaratExperience.tsx');
const ziyaratCss=read('src/app/[locale]/ziyarat/ziyarat-narrative.css');
const homeCss=read('src/components/home/SignatureJourneyHomepage.module.css');
test('services use one interactive visual chapter instead of six card wall',()=>{
 assert.match(servicesPage,/<ServiceChapterExplorer/);
 assert.match(servicesPage,/servicesList\.map\(\(\{icon,\.\.\.data\}\)=>data\)/);
 assert.doesNotMatch(servicesPage,/duyuf-service-card-content/);
 assert.match(chapter,/role="tablist"/);
 assert.match(chapter,/aria-selected=\{i===active\}/);
 assert.match(chapter,/role="tabpanel"/);
 assert.match(chapter,/onKeyDown=\{e=>keyboard\(e,i\)\}/);
});
test('services preserve real booking route/type, no dummy links',()=>{
 for(const route of ['jeddah-airport-to-makkah','makkah-ziyarat','makkah-to-madinah'])assert.ok(chapter.includes(route),route);
 assert.match(chapter,/group-travel':'booking\?type=group_bus'/);
 assert.match(chapter,/24-7-support':'contact'/);
 assert.match(chapter,/LOCALIZED_ROUTE_NAMES/);
 assert.doesNotMatch(chapter,/mock|fakeFare|instant confirmation/i);
});
test('ten service tab labels have localized copy and mobile layouts',()=>{
 for(const loc of ['ar','en','ms','id','ur','fr','es','de','tr','hi'])assert.ok(chapter.includes(' '+loc+':{kicker:'),loc);
 assert.match(chapterCss,/@media\(max-width:760px\)/);
 assert.match(chapterCss,/@media\(max-width:390px\)/);
 assert.match(chapterCss,/prefers-reduced-motion:reduce/);
});
test('ziyarat long site and promise cards become swipeable mobile field guides',()=>{
 assert.match(ziyarat,/duyuf-ziyarat-sites-rail/);
 assert.match(ziyarat,/duyuf-ziyarat-pillars-rail/);
 assert.match(ziyarat,/role="region"/);
 assert.match(ziyarat,/tabIndex=\{0\}/);
 assert.match(ziyaratCss,/scroll-snap-type:x mandatory/);
 assert.match(ziyaratCss,/@media\(max-width:390px\)/);
});
test('homepage mobile screenshot corrective breakpoints preserve real routing',()=>{
 assert.match(homeCss,/@media\(max-width:560px\)/);
 assert.match(homeCss,/@media\(max-width:390px\)/);
 assert.match(homeCss,/\.experienceMedia\{height:210px\}/);
 const home=read('src/components/home/SignatureJourneyHomepage.tsx');
 assert.match(home,/AUTHORITATIVE_TRANSFER_RATES/);
 assert.match(home,/APPROVED_5_FLEET/);
});
