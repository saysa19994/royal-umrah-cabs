import fs from 'fs';

// 1. HeroSection.tsx
let hero = fs.readFileSync('D:/royal-umrah-cabs/src/components/home/HeroSection.tsx', 'utf8');
hero = hero.replace(/جولة مزارات المدينة المنورة \(3\.5 ساعة\) - من 250 ريال/g, 'جولة مزارات المدينة المنورة - من 250 ريال');
hero = hero.replace(/Madinah Holy Sites Tour \(3\.5 Hours\) - From 250 SAR/g, 'Madinah Holy Sites Tour - From 250 SAR');
fs.writeFileSync('D:/royal-umrah-cabs/src/components/home/HeroSection.tsx', hero, 'utf8');
console.log('HeroSection.tsx updated');

// 2. HomeSections.tsx
let home = fs.readFileSync('D:/royal-umrah-cabs/src/components/home/HomeSections.tsx', 'utf8');
home = home.replace(/جولات مزارات المدينة المنورة \(٣\.٥ ساعة\)/g, 'جولات مزارات المدينة المنورة');
home = home.replace(/tag: '٣\.٥ ساعة معتمدة'/g, "tag: 'معالم تاريخية'");

home = home.replace(/Madinah Historic Ziyarat \(3\.5 Hours\)/g, 'Madinah Historic Ziyarat');
home = home.replace(/tag: 'Approved 3\.5 Hours'/g, "tag: 'Historic Landmarks'");

home = home.replace(/Ziarah Madinah Al-Munawwarah \(3\.5 Jam\)/g, 'Ziarah Madinah Al-Munawwarah');
home = home.replace(/tag: 'Diluluskan 3\.5 Jam'/g, "tag: 'Tempat Bersejarah'");

home = home.replace(/Ziarah Bersejarah Madinah \(3\.5 Jam\)/g, 'Ziarah Bersejarah Madinah');
home = home.replace(/tag: 'Resmi 3\.5 Jam'/g, "tag: 'Situs Bersejarah'");

home = home.replace(/مدینہ منورہ مقدس زیارات \(3\.5 گھنٹے\)/g, 'مدینہ منورہ مقدس زیارات');
home = home.replace(/tag: 'منظور شدہ 3\.5 گھنٹے'/g, "tag: 'مقدس مقامات'");

home = home.replace(/Medine-i Münevvere Ziyaretleri \(3\.5 Saat\)/g, 'Medine-i Münevvere Ziyaretleri');
home = home.replace(/tag: 'Onaylı 3\.5 Saat'/g, "tag: 'Kutsal Mekanlar'");

home = home.replace(/Ziyarat de Médine \(3\.5 Heures\)/g, 'Ziyarat de Médine');
home = home.replace(/tag: 'Validé 3\.5 Heures'/g, "tag: 'Lieux Saints'");

home = home.replace(/Tours Históricos Medina \(3\.5 Horas\)/g, 'Tours Históricos Medina');
home = home.replace(/tag: 'Aprobado 3\.5 Horas'/g, "tag: 'Lugares Históricos'");

home = home.replace(/Historische Ziyarat-Tour Medina \(3\.5 Stunden\)/g, 'Historische Ziyarat-Tour Medina');
home = home.replace(/tag: 'Geprüft 3\.5 Stunden'/g, "tag: 'Historische Stätten'");

home = home.replace(/मदीना ऐतिहासिक जियारत यात्रा \(3\.5 घंटे\)/g, 'मदीना ऐतिहासिक जियारत यात्रा');
home = home.replace(/tag: 'मान्यता प्राप्त 3\.5 घंटे'/g, "tag: 'पवित्र स्थल'");

// Ziyarat section card replacements
home = home.replace(/\{\/\* 5\. SACRED ZIYARAT TOURS \(MAKKAH 2\.5H & MADINAH 3\.5H\) \*\/\}/g, '{/* 5. SACRED ZIYARAT TOURS (MAKKAH 2.5H & MADINAH HISTORIC) */}');
home = home.replace(/\{\/\* Madinah Ziyarat Card \(3\.5 Hours\) \*\/\}/g, '{/* Madinah Ziyarat Card */}');
home = home.replace(/\{locale === 'ar' \? 'المدينة المنورة • ٣\.٥ ساعة' : 'Madinah • 3\.5 Hours'\}/g, "{locale === 'ar' ? 'المدينة المنورة • معالم تاريخية' : 'Madinah • Holy Sites'}");
home = home.replace(/\{locale === 'ar' \? 'جولة مزارات المدينة المنورة \(٣\.٥ ساعة\)' : 'Madinah Holy Sites Tour \(3\.5 Hours\)'\}/g, "{locale === 'ar' ? 'جولة مزارات المدينة المنورة التاريخية' : 'Madinah Historic Holy Sites Tour'}");

fs.writeFileSync('D:/royal-umrah-cabs/src/components/home/HomeSections.tsx', home, 'utf8');
console.log('HomeSections.tsx updated');

// 3. src/data/ziyarat.ts
let ziyarat = fs.readFileSync('D:/royal-umrah-cabs/src/data/ziyarat.ts', 'utf8');
ziyarat = ziyarat.replace(/Book a 3-hour private Madinah Ziyarat tour with chauffeur\./g, 'Book a private Madinah Ziyarat tour with chauffeur.');
ziyarat = ziyarat.replace(/احجز جولة مزارات المدينة المنورة الخاصة \(3 ساعات\) مع سائق خاص\./g, 'احجز جولة مزارات المدينة المنورة الخاصة مع سائق خاص.');
ziyarat = ziyarat.replace(/durationEn: '3 to 3\.5 Hours',/g, "durationEn: 'Half-Day Tour',");
ziyarat = ziyarat.replace(/durationAr: '3 إلى 3\.5 ساعات',/g, "durationAr: 'جولة نصف يوم',");
fs.writeFileSync('D:/royal-umrah-cabs/src/data/ziyarat.ts', ziyarat, 'utf8');
console.log('src/data/ziyarat.ts updated');

// 4. blog guides
let blogAr = fs.readFileSync('D:/royal-umrah-cabs/src/data/blog-content/madinah-ziyarat-private-car-guide/ar.ts', 'utf8');
blogAr = blogAr.replace(/لمدة 3 إلى 3\.5 ساعات/g, 'لجولة المزارات الكاملة');
fs.writeFileSync('D:/royal-umrah-cabs/src/data/blog-content/madinah-ziyarat-private-car-guide/ar.ts', blogAr, 'utf8');

let blogEn = fs.readFileSync('D:/royal-umrah-cabs/src/data/blog-content/madinah-ziyarat-private-car-guide/en.ts', 'utf8');
blogEn = blogEn.replace(/standard 3 to 3\.5-hour private itineraries/g, 'standard private itineraries');
fs.writeFileSync('D:/royal-umrah-cabs/src/data/blog-content/madinah-ziyarat-private-car-guide/en.ts', blogEn, 'utf8');

let blogMs = fs.readFileSync('D:/royal-umrah-cabs/src/data/blog-content/madinah-ziyarat-private-car-guide/ms.ts', 'utf8');
blogMs = blogMs.replace(/selama 3 hingga 3\.5 jam/g, 'ziarah persendirian');
fs.writeFileSync('D:/royal-umrah-cabs/src/data/blog-content/madinah-ziyarat-private-car-guide/ms.ts', blogMs, 'utf8');
console.log('Blog content updated');
