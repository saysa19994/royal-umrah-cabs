import fs from 'fs';

const concepts = [
  'concept-01-serene-minimalist.html',
  'concept-02-saudi-heritage.html',
  'concept-03-hotel-concierge.html',
  'concept-04-exclusive-club.html',
  'concept-05-smart-executive.html',
  'concept-06-cinematic-story.html',
  'concept-07-bold-typography.html',
  'concept-08-refreshing-oasis.html',
  'concept-09-cockpit-dashboard.html',
  'concept-10-fluid-future.html'
];

for (const c of concepts) {
  const content = fs.readFileSync('D:/royal-umrah-cabs/design-concepts/' + c, 'utf8');
  const imgMatches = content.match(/src=["'](.*?)["']/g) || [];
  console.log(`\n=== ${c} ===`);
  console.log(`Images (${imgMatches.length}):`);
  for (const m of imgMatches) {
    const src = m.replace(/src=["']/, '').replace(/["']$/, '');
    console.log(`  - ${src}`);
  }
}
