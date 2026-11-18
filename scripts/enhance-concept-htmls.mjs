import fs from 'fs';

const c2Path = 'D:/royal-umrah-cabs/design-concepts/concept-02-saudi-heritage.html';
let c2 = fs.readFileSync(c2Path, 'utf8');
if (!c2.includes('services-suv-highway.jpg')) {
  c2 = c2.replace(
    '<section class="relative min-h-[580px] flex items-center px-6 py-12 overflow-hidden bg-gradient-to-b from-[#EFE8E1] to-[#F4EFEB]">',
    `<section class="relative min-h-[580px] flex items-center px-6 py-12 overflow-hidden bg-gradient-to-b from-[#EFE8E1] to-[#F4EFEB]">
    <div class="absolute inset-0 z-0 opacity-25">
      <img src="../public/assets/images/cinematic/services/services-suv-highway.jpg" alt="Desert Majesty" class="w-full h-full object-cover filter sepia-[0.5] contrast-125 scale-105" />
      <div class="absolute inset-0 bg-gradient-to-t from-[#F4EFEB] via-[#F4EFEB]/80 to-[#EFE8E1]/90"></div>
    </div>`
  );
  fs.writeFileSync(c2Path, c2, 'utf8');
  console.log('✓ Enhanced Concept 02 with Desert Highway Hero backdrop');
}

const c4Path = 'D:/royal-umrah-cabs/design-concepts/concept-04-exclusive-club.html';
let c4 = fs.readFileSync(c4Path, 'utf8');
if (!c4.includes('concierge-maybach-executive.jpg')) {
  c4 = c4.replace(
    '<section class="min-h-[580px] flex items-center px-8 py-20 relative overflow-hidden">',
    `<section class="min-h-[580px] flex items-center px-8 py-20 relative overflow-hidden">
    <div class="absolute inset-0 z-0 opacity-20">
      <img src="../public/assets/images/cinematic/home/concierge-maybach-executive.jpg" alt="Private Chauffeur" class="w-full h-full object-cover filter grayscale contrast-150 scale-105" />
      <div class="absolute inset-0 bg-gradient-to-t from-[#121316] via-[#121316]/90 to-[#121316]/80"></div>
    </div>`
  );
  fs.writeFileSync(c4Path, c4, 'utf8');
  console.log('✓ Enhanced Concept 04 with Matte Obsidian Chauffeur backdrop');
}

const c8Path = 'D:/royal-umrah-cabs/design-concepts/concept-08-refreshing-oasis.html';
let c8 = fs.readFileSync(c8Path, 'utf8');
if (!c8.includes('haram.webp')) {
  c8 = c8.replace(
    '<section class="relative min-h-[560px] flex items-center px-6 py-14 overflow-hidden bg-gradient-to-b from-[#E7F3ED] to-[#F1F7F4]">',
    `<section class="relative min-h-[560px] flex items-center px-6 py-14 overflow-hidden bg-gradient-to-b from-[#E7F3ED] to-[#F1F7F4]">
    <div class="absolute inset-0 z-0 opacity-20">
      <img src="../public/assets/blueprint/routes/haram.webp" alt="Sanctuary Serenity" class="w-full h-full object-cover filter blur-[10px] scale-105" />
      <div class="absolute inset-0 bg-gradient-to-t from-[#F1F7F4] via-[#F1F7F4]/85 to-[#E7F3ED]/90"></div>
    </div>`
  );
  fs.writeFileSync(c8Path, c8, 'utf8');
  console.log('✓ Enhanced Concept 08 with Oasis Haram backdrop');
}

console.log('HTML enhancements complete.');
