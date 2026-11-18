import fs from 'fs';
import path from 'path';

const ROOT = 'd:/royal-umrah-cabs';

// 1. UPDATE FloatingUI.tsx: exclude homepage from duplicate dock and make floating WhatsApp clean
console.log('--- Step 1: Updating FloatingUI.tsx ---');
const floatingUiPath = path.join(ROOT, 'src/components/layout/FloatingUI.tsx');
let floatingUiContent = fs.readFileSync(floatingUiPath, 'utf8');

// Add homepage check to isExcludedPage
floatingUiContent = floatingUiContent.replace(
  `  const isExcludedPage =
    pathname.includes('/booking') ||
    pathname.includes('/confirmation') ||
    pathname.startsWith('/admin');`,
  `  const isExcludedPage =
    pathname.includes('/booking') ||
    pathname.includes('/confirmation') ||
    pathname.startsWith('/admin') ||
    pathname === '/' ||
    pathname === \`/\${locale}\` ||
    pathname === \`/\${locale}/\`;`
);

// Make desktop WhatsApp button visible on all viewports without conflict
floatingUiContent = floatingUiContent.replace(
  `className="fixed bottom-6 right-4 rtl:right-auto rtl:left-4 z-40 hidden md:flex flex-col items-center gap-3 pointer-events-auto"`,
  `className="fixed bottom-6 right-4 rtl:right-auto rtl:left-4 z-40 flex flex-col items-center gap-3 pointer-events-auto"`
);

fs.writeFileSync(floatingUiPath, floatingUiContent);
console.log('✓ FloatingUI.tsx updated successfully');

// 2. UPDATE homepage-v3.css: adjust booking shell spacing
console.log('--- Step 2: Updating homepage-v3.css ---');
const cssPath = path.join(ROOT, 'src/styles/homepage-v3.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

cssContent = cssContent.replace(
  `.booking-shell{position:relative;z-index:5;margin-top:-48px}`,
  `.booking-shell{position:relative;z-index:5;margin-top:20px;padding-top:28px}`
);

fs.writeFileSync(cssPath, cssContent);
console.log('✓ homepage-v3.css updated successfully');

// 3. UPDATE SaudiHospitalityHomepage.tsx: eager loading on critical photos
console.log('--- Step 3: Updating SaudiHospitalityHomepage.tsx ---');
const homePath = path.join(ROOT, 'src/components/home/SaudiHospitalityHomepage.tsx');
let homeContent = fs.readFileSync(homePath, 'utf8');

// Replace all loading="lazy" with loading="eager"
homeContent = homeContent.replaceAll('loading="lazy"', 'loading="eager"');

fs.writeFileSync(homePath, homeContent);
console.log('✓ SaudiHospitalityHomepage.tsx updated successfully');

// 4. UPDATE Footer.tsx: localize popular routes and fleet for Arabic
console.log('--- Step 4: Updating Footer.tsx ---');
const footerPath = path.join(ROOT, 'src/components/layout/Footer.tsx');
let footerContent = fs.readFileSync(footerPath, 'utf8');

const routeLinksOld = `            <ul className="space-y-2 text-xs text-[#C8BBA7]">
              <li>
                <Link href={\`/\${locale}/routes/jeddah-airport-to-makkah\`} className="hover:text-white transition-colors inline-block py-1">
                  Jeddah Airport to Makkah
                </Link>
              </li>
              <li>
                <Link href={\`/\${locale}/routes/makkah-to-madinah\`} className="hover:text-white transition-colors inline-block py-1">
                  Makkah to Madinah VIP
                </Link>
              </li>
              <li>
                <Link href={\`/\${locale}/routes/madinah-to-makkah\`} className="hover:text-white transition-colors inline-block py-1">
                  Madinah to Makkah
                </Link>
              </li>
              <li>
                <Link href={\`/\${locale}/routes/makkah-to-jeddah-airport\`} className="hover:text-white transition-colors inline-block py-1">
                  Makkah to Jeddah Airport
                </Link>
              </li>
              <li>
                <Link href={\`/\${locale}/routes/jeddah-to-madinah\`} className="hover:text-white transition-colors inline-block py-1">
                  Jeddah Airport to Madinah
                </Link>
              </li>
              <li>
                <Link href={\`/\${locale}/routes/madinah-airport-to-hotel\`} className="hover:text-white transition-colors inline-block py-1">
                  Madinah Airport to Hotel
                </Link>
              </li>
            </ul>`;

const routeLinksNew = `            <ul className="space-y-2 text-xs text-[#C8BBA7]">
              <li>
                <Link href={\`/\${locale}/routes/jeddah-airport-to-makkah\`} className="hover:text-white transition-colors inline-block py-1">
                  {locale === 'ar' ? 'من مطار جدة (KAIA) إلى مكة المكرمة' : 'Jeddah Airport to Makkah'}
                </Link>
              </li>
              <li>
                <Link href={\`/\${locale}/routes/makkah-to-madinah\`} className="hover:text-white transition-colors inline-block py-1">
                  {locale === 'ar' ? 'من مكة المكرمة إلى المدينة المنورة VIP' : 'Makkah to Madinah VIP'}
                </Link>
              </li>
              <li>
                <Link href={\`/\${locale}/routes/madinah-to-makkah\`} className="hover:text-white transition-colors inline-block py-1">
                  {locale === 'ar' ? 'من المدينة المنورة إلى مكة المكرمة' : 'Madinah to Makkah'}
                </Link>
              </li>
              <li>
                <Link href={\`/\${locale}/routes/makkah-to-jeddah-airport\`} className="hover:text-white transition-colors inline-block py-1">
                  {locale === 'ar' ? 'من مكة المكرمة إلى مطار جدة' : 'Makkah to Jeddah Airport'}
                </Link>
              </li>
              <li>
                <Link href={\`/\${locale}/routes/jeddah-to-madinah\`} className="hover:text-white transition-colors inline-block py-1">
                  {locale === 'ar' ? 'من مطار جدة إلى المدينة المنورة' : 'Jeddah Airport to Madinah'}
                </Link>
              </li>
              <li>
                <Link href={\`/\${locale}/routes/madinah-airport-to-hotel\`} className="hover:text-white transition-colors inline-block py-1">
                  {locale === 'ar' ? 'من مطار المدينة المنورة إلى الفندق' : 'Madinah Airport to Hotel'}
                </Link>
              </li>
            </ul>`;

const fleetLinksOld = `            <ul className="space-y-2 text-xs text-[#C8BBA7]">
              <li>
                <Link href={\`/\${locale}/fleet/gmc-yukon-xl\`} className="hover:text-white transition-colors inline-block py-1">
                  GMC Yukon XL VIP (7 Seats)
                </Link>
              </li>
              <li>
                <Link href={\`/\${locale}/fleet/hyundai-staria\`} className="hover:text-white transition-colors inline-block py-1">
                  Hyundai Staria VIP (7 Seats)
                </Link>
              </li>
              <li>
                <Link href={\`/\${locale}/fleet/toyota-camry\`} className="hover:text-white transition-colors inline-block py-1">
                  Toyota Camry Executive (4 Seats)
                </Link>
              </li>
              <li>
                <Link href={\`/\${locale}/fleet/toyota-hiace\`} className="hover:text-white transition-colors inline-block py-1">
                  Toyota HiAce Family (10 Seats)
                </Link>
              </li>
              <li>
                <Link href={\`/\${locale}/fleet/toyota-coaster\`} className="hover:text-white transition-colors inline-block py-1">
                  Toyota Coaster VIP Coach (21 Seats)
                </Link>
              </li>
              <li>
                <Link href={\`/\${locale}/services\`} className="hover:text-white transition-colors inline-block py-1">
                  Makkah & Madinah Ziyarat Tours
                </Link>
              </li>
              <li>
                <Link href={\`/\${locale}/services\`} className="hover:text-white transition-colors inline-block py-1">
                  Hourly Chauffeur Rental
                </Link>
              </li>
            </ul>`;

const fleetLinksNew = `            <ul className="space-y-2 text-xs text-[#C8BBA7]">
              <li>
                <Link href={\`/\${locale}/fleet/gmc-yukon-xl\`} className="hover:text-white transition-colors inline-block py-1">
                  {locale === 'ar' ? 'جي إم سي يوكون XL رويال (7 مقاعد)' : 'GMC Yukon XL VIP (7 Seats)'}
                </Link>
              </li>
              <li>
                <Link href={\`/\${locale}/fleet/hyundai-staria\`} className="hover:text-white transition-colors inline-block py-1">
                  {locale === 'ar' ? 'هيونداي ستاريا VIP (7 مقاعد)' : 'Hyundai Staria VIP (7 Seats)'}
                </Link>
              </li>
              <li>
                <Link href={\`/\${locale}/fleet/toyota-camry\`} className="hover:text-white transition-colors inline-block py-1">
                  {locale === 'ar' ? 'تويوتا كامري التنفيذية (4 مقاعد)' : 'Toyota Camry Executive (4 Seats)'}
                </Link>
              </li>
              <li>
                <Link href={\`/\${locale}/fleet/toyota-hiace\`} className="hover:text-white transition-colors inline-block py-1">
                  {locale === 'ar' ? 'تويوتا هايس العائلية (10 مقاعد)' : 'Toyota HiAce Family (10 Seats)'}
                </Link>
              </li>
              <li>
                <Link href={\`/\${locale}/fleet/toyota-coaster\`} className="hover:text-white transition-colors inline-block py-1">
                  {locale === 'ar' ? 'تويوتا كوستر VIP (21 مقعد)' : 'Toyota Coaster VIP Coach (21 Seats)'}
                </Link>
              </li>
              <li>
                <Link href={\`/\${locale}/services\`} className="hover:text-white transition-colors inline-block py-1">
                  {locale === 'ar' ? 'جولات مزارات مكة المكرمة والمدينة' : 'Makkah & Madinah Ziyarat Tours'}
                </Link>
              </li>
              <li>
                <Link href={\`/\${locale}/services\`} className="hover:text-white transition-colors inline-block py-1">
                  {locale === 'ar' ? 'خدمة تأجير سائق خاص بالساعة' : 'Hourly Chauffeur Rental'}
                </Link>
              </li>
            </ul>`;

if (footerContent.includes('Jeddah Airport to Makkah')) {
  footerContent = footerContent.replace(routeLinksOld, routeLinksNew);
  footerContent = footerContent.replace(fleetLinksOld, fleetLinksNew);
  fs.writeFileSync(footerPath, footerContent);
  console.log('✓ Footer.tsx updated with full Arabic localization');
} else {
  console.log('Footer.tsx already localized or links pattern differed');
}

console.log('--- All 4 polish fixes applied successfully! ---');
