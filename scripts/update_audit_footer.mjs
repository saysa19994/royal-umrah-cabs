import fs from 'fs';

const path = 'd:/royal-umrah-cabs/src/components/layout/Footer.tsx';
let content = fs.readFileSync(path, 'utf8').replace(/\r\n/g, '\n');

// 1. Add import of APPROVED_5_FLEET and ChevronDown if not present
if (!content.includes('APPROVED_5_FLEET')) {
  content = content.replace(
    "import { Locale } from '@/i18n/config';",
    "import { Locale } from '@/i18n/config';\nimport { APPROVED_5_FLEET } from '@/data/approved-fleet-homepage';"
  );
}

if (!content.includes('ChevronDown')) {
  content = content.replace(
    "import {",
    "import {\n  ChevronDown,"
  );
}

// 2. Add localized route names dictionary for Footer
const localizedRoutesDef = `
const FOOTER_LOCALIZED_ROUTES: Record<Locale, Array<{ slug: string; name: string }>> = {
  ar: [
    { slug: 'jeddah-airport-to-makkah', name: 'من مطار جدة إلى مكة المكرمة' },
    { slug: 'makkah-to-madinah', name: 'من مكة المكرمة إلى المدينة المنورة VIP' },
    { slug: 'madinah-to-makkah', name: 'من المدينة المنورة إلى مكة المكرمة' },
    { slug: 'makkah-to-jeddah-airport', name: 'من مكة المكرمة إلى مطار جدة' },
    { slug: 'jeddah-to-madinah', name: 'من مطار جدة إلى المدينة المنورة' },
    { slug: 'madinah-airport-to-hotel', name: 'من مطار المدينة المنورة إلى الفندق' },
  ],
  en: [
    { slug: 'jeddah-airport-to-makkah', name: 'From Jeddah Airport to Makkah' },
    { slug: 'makkah-to-madinah', name: 'From Makkah to Madinah VIP' },
    { slug: 'madinah-to-makkah', name: 'From Madinah to Makkah' },
    { slug: 'makkah-to-jeddah-airport', name: 'From Makkah to Jeddah Airport' },
    { slug: 'jeddah-to-madinah', name: 'From Jeddah Airport to Madinah' },
    { slug: 'madinah-airport-to-hotel', name: 'From Madinah Airport to Hotel' },
  ],
  ms: [
    { slug: 'jeddah-airport-to-makkah', name: 'Dari Lapangan Terbang Jeddah ke Makkah' },
    { slug: 'makkah-to-madinah', name: 'Dari Makkah ke Madinah VIP' },
    { slug: 'madinah-to-makkah', name: 'Dari Madinah ke Makkah' },
    { slug: 'makkah-to-jeddah-airport', name: 'Dari Makkah ke Lapangan Terbang Jeddah' },
    { slug: 'jeddah-to-madinah', name: 'Dari Lapangan Terbang Jeddah ke Madinah' },
    { slug: 'madinah-airport-to-hotel', name: 'Dari Lapangan Terbang Madinah ke Hotel' },
  ],
  id: [
    { slug: 'jeddah-airport-to-makkah', name: 'Dari Bandara Jeddah ke Makkah' },
    { slug: 'makkah-to-madinah', name: 'Dari Makkah ke Madinah VIP' },
    { slug: 'madinah-to-makkah', name: 'Dari Madinah ke Makkah' },
    { slug: 'makkah-to-jeddah-airport', name: 'Dari Makkah ke Bandara Jeddah' },
    { slug: 'jeddah-to-madinah', name: 'Dari Bandara Jeddah ke Madinah' },
    { slug: 'madinah-airport-to-hotel', name: 'Dari Bandara Madinah ke Hotel' },
  ],
  ur: [
    { slug: 'jeddah-airport-to-makkah', name: 'جدہ ایئرپورٹ سے مکہ مکرمہ' },
    { slug: 'makkah-to-madinah', name: 'مکہ مکرمہ سے مدینہ منورہ VIP' },
    { slug: 'madinah-to-makkah', name: 'مدینہ منورہ سے مکہ مکرمہ' },
    { slug: 'makkah-to-jeddah-airport', name: 'مکہ مکرمہ سے جدہ ایئرپورٹ' },
    { slug: 'jeddah-to-madinah', name: 'جدہ ایئرپورٹ سے مدینہ منورہ' },
    { slug: 'madinah-airport-to-hotel', name: 'مدینہ ایئرپورٹ سے ہوٹل' },
  ],
  fr: [
    { slug: 'jeddah-airport-to-makkah', name: 'De l’Aéroport de Djeddah à La Mecque' },
    { slug: 'makkah-to-madinah', name: 'De La Mecque à Médine VIP' },
    { slug: 'madinah-to-makkah', name: 'De Médine à La Mecque' },
    { slug: 'makkah-to-jeddah-airport', name: 'De La Mecque à l’Aéroport de Djeddah' },
    { slug: 'jeddah-to-madinah', name: 'De l’Aéroport de Djeddah à Médine' },
    { slug: 'madinah-airport-to-hotel', name: 'De l’Aéroport de Médine à l’Hôtel' },
  ],
  es: [
    { slug: 'jeddah-airport-to-makkah', name: 'Del Aeropuerto de Yeda a La Meca' },
    { slug: 'makkah-to-madinah', name: 'De La Meca a Medina VIP' },
    { slug: 'madinah-to-makkah', name: 'De Medina a La Meca' },
    { slug: 'makkah-to-jeddah-airport', name: 'De La Meca al Aeropuerto de Yeda' },
    { slug: 'jeddah-to-madinah', name: 'Del Aeropuerto de Yeda a Medina' },
    { slug: 'madinah-airport-to-hotel', name: 'Del Aeropuerto de Medina al Hotel' },
  ],
  de: [
    { slug: 'jeddah-airport-to-makkah', name: 'Vom Flughafen Dschidda nach Mekka' },
    { slug: 'makkah-to-madinah', name: 'Von Mekka nach Medina VIP' },
    { slug: 'madinah-to-makkah', name: 'Von Medina nach Mekka' },
    { slug: 'makkah-to-jeddah-airport', name: 'Von Mekka zum Flughafen Dschidda' },
    { slug: 'jeddah-to-madinah', name: 'Vom Flughafen Dschidda nach Medina' },
    { slug: 'madinah-airport-to-hotel', name: 'Vom Flughafen Medina zum Hotel' },
  ],
  tr: [
    { slug: 'jeddah-airport-to-makkah', name: 'Cidde Havalimanı’ndan Mekke’ye' },
    { slug: 'makkah-to-madinah', name: 'Mekke’den Medine’ye VIP' },
    { slug: 'madinah-to-makkah', name: 'Medine’den Mekke’ye' },
    { slug: 'makkah-to-jeddah-airport', name: 'Mekke’den Cidde Havalimanı’na' },
    { slug: 'jeddah-to-madinah', name: 'Cidde Havalimanı’ndan Medine’ye' },
    { slug: 'madinah-airport-to-hotel', name: 'Medine Havalimanı’ndan Otele' },
  ],
  hi: [
    { slug: 'jeddah-airport-to-makkah', name: 'जेद्दा हवाई अड्डे से मक्का' },
    { slug: 'makkah-to-madinah', name: 'मक्का से मदीना वीआईपी' },
    { slug: 'madinah-to-makkah', name: 'मदीना से मक्का' },
    { slug: 'makkah-to-jeddah-airport', name: 'मक्का से जेद्दा हवाई अड्डा' },
    { slug: 'jeddah-to-madinah', name: 'जेद्दा हवाई अड्डे से मदीना' },
    { slug: 'madinah-airport-to-hotel', name: 'मदीना हवाई अड्डे से होटल' },
  ],
};
`;

if (!content.includes('FOOTER_LOCALIZED_ROUTES')) {
  content = content.replace(
    'export function Footer({ locale, dict, settings = DEFAULT_SETTINGS }: FooterProps) {',
    `${localizedRoutesDef}\nexport function Footer({ locale, dict, settings = DEFAULT_SETTINGS }: FooterProps) {`
  );
}

// 3. Replace Columns 2-5 using index slice
const startIndex = content.indexOf('{/* COL 2: POPULAR ROUTES */}');
const endIndex = content.indexOf('{/* PAYMENT BADGES STRIP');

if (startIndex !== -1 && endIndex !== -1) {
  const replacement = `{/* COL 2: POPULAR ROUTES (COLLAPSIBLE ON MOBILE, FULLY LOCALIZED) */}
          <div className="border-b md:border-b-0 border-white/10 pb-3 md:pb-0">
            <button
              type="button"
              onClick={() => toggleSection('routes')}
              className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider text-[#F7F5F0] mb-2 md:mb-3.5 font-serif text-sm border-b border-[#A97B27]/40 pb-1.5 text-start md:cursor-default"
            >
              <span>{dict.footer.popularRoutes}</span>
              <ChevronDown className={\`w-4 h-4 text-[#A97B27] md:hidden transition-transform duration-200 \${openSections.routes ? 'rotate-180' : ''}\`} />
            </button>
            <ul className={\`space-y-2 text-xs text-[#C8BBA7] \${openSections.routes ? 'block' : 'hidden md:block'}\`}>
              {(FOOTER_LOCALIZED_ROUTES[locale] || FOOTER_LOCALIZED_ROUTES.en).map((route) => (
                <li key={route.slug}>
                  <Link href={\`/\${locale}/routes/\${route.slug}\`} className="hover:text-white transition-colors inline-block py-1">
                    {route.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 3: SERVICES & FLEET (COLLAPSIBLE ON MOBILE, AUTHORITATIVE 5-FLEET) */}
          <div className="border-b md:border-b-0 border-white/10 pb-3 md:pb-0">
            <button
              type="button"
              onClick={() => toggleSection('fleet')}
              className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider text-[#F7F5F0] mb-2 md:mb-3.5 font-serif text-sm border-b border-[#A97B27]/40 pb-1.5 text-start md:cursor-default"
            >
              <span>{dict.footer.servicesFleet}</span>
              <ChevronDown className={\`w-4 h-4 text-[#A97B27] md:hidden transition-transform duration-200 \${openSections.fleet ? 'rotate-180' : ''}\`} />
            </button>
            <ul className={\`space-y-2 text-xs text-[#C8BBA7] \${openSections.fleet ? 'block' : 'hidden md:block'}\`}>
              {APPROVED_5_FLEET.map((veh) => (
                <li key={veh.id}>
                  <Link href={\`/\${locale}/fleet/\${veh.slug}\`} className="hover:text-white transition-colors inline-block py-1">
                    {veh.name[locale] || veh.name.en} ({veh.passengers} {locale === 'ar' ? 'ركاب' : 'Pax'} • {veh.luggage} {locale === 'ar' ? 'حقائب' : 'Bags'})
                  </Link>
                </li>
              ))}
              <li>
                <Link href={\`/\${locale}/ziyarat\`} className="hover:text-white transition-colors inline-block py-1 text-[#A97B27]">
                  {locale === 'ar' ? 'جولات مزارات مكة والمدينة الشريفة (2.5 س)' : 'Makkah & Madinah Ziyarat Tours (2.5h)'}
                </Link>
              </li>
            </ul>
          </div>

          {/* COL 4: PILGRIM GUIDES & TOOLS (COLLAPSIBLE ON MOBILE) */}
          <div className="border-b md:border-b-0 border-white/10 pb-3 md:pb-0">
            <button
              type="button"
              onClick={() => toggleSection('guides')}
              className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider text-[#F7F5F0] mb-2 md:mb-3.5 font-serif text-sm border-b border-[#A97B27]/40 pb-1.5 text-start md:cursor-default"
            >
              <span>{t.guidesHeader}</span>
              <ChevronDown className={\`w-4 h-4 text-[#A97B27] md:hidden transition-transform duration-200 \${openSections.guides ? 'rotate-180' : ''}\`} />
            </button>
            <ul className={\`space-y-2 text-xs text-[#C8BBA7] \${openSections.guides ? 'block' : 'hidden md:block'}\`}>
              <li>
                <Link href={\`/\${locale}/blog\`} className="hover:text-white transition-colors inline-block py-1 text-[#B77C4D] font-bold">
                  {t.vipBlog}
                </Link>
              </li>
              <li>
                <Link href={\`/\${locale}/guides/umrah-guide\`} className="hover:text-white transition-colors inline-block py-1">
                  {t.umrahGuide}
                </Link>
              </li>
              <li>
                <Link href={\`/\${locale}/guides/ziyarat-guide\`} className="hover:text-white transition-colors inline-block py-1">
                  {t.ziyaratGuide}
                </Link>
              </li>
              <li>
                <Link href={\`/\${locale}/guides/jeddah-airport-guide\`} className="hover:text-white transition-colors inline-block py-1">
                  {t.airportGuide}
                </Link>
              </li>
              <li>
                <Link href={\`/\${locale}/tracking\`} className="hover:text-white transition-colors inline-block py-1 text-emerald-400 font-semibold">
                  {dict.nav.trackBooking || t.trackBooking}
                </Link>
              </li>
            </ul>
          </div>

          {/* COL 5: LEGAL & TRUST (COLLAPSIBLE ON MOBILE) */}
          <div className="border-b md:border-b-0 border-white/10 pb-3 md:pb-0">
            <button
              type="button"
              onClick={() => toggleSection('legal')}
              className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider text-[#F7F5F0] mb-2 md:mb-3.5 font-serif text-sm border-b border-[#A97B27]/40 pb-1.5 text-start md:cursor-default"
            >
              <span>{t.legalHeader}</span>
              <ChevronDown className={\`w-4 h-4 text-[#A97B27] md:hidden transition-transform duration-200 \${openSections.legal ? 'rotate-180' : ''}\`} />
            </button>
            <ul className={\`space-y-2 text-xs text-[#C8BBA7] \${openSections.legal ? 'block' : 'hidden md:block'}\`}>
              <li>
                <Link href={\`/\${locale}/cancellation\`} className="hover:text-white transition-colors inline-block py-1">
                  {dict.footer.refunds || 'Cancellation & Refunds'}
                </Link>
              </li>
              <li>
                <Link href={\`/\${locale}/terms\`} className="hover:text-white transition-colors inline-block py-1">
                  {dict.footer.terms || 'Terms & Conditions'}
                </Link>
              </li>
              <li>
                <Link href={\`/\${locale}/privacy\`} className="hover:text-white transition-colors inline-block py-1">
                  {dict.footer.privacy || 'Privacy Policy'}
                </Link>
              </li>
              <li>
                <Link href={\`/\${locale}/safety\`} className="hover:text-white transition-colors inline-block py-1">
                  {t.safety}
                </Link>
              </li>
              <li>
                <Link href={\`/\${locale}/reviews\`} className="hover:text-white transition-colors inline-block py-1">
                  {dict.reviews?.heading || t.reviews}
                </Link>
              </li>
              <li>
                <Link href={\`/\${locale}/faq\`} className="hover:text-white transition-colors inline-block py-1">
                  {dict.faq?.heading || t.faqs}
                </Link>
              </li>
            </ul>
          </div>
        </div>\n\n`;

  content = content.slice(0, startIndex) + replacement + content.slice(endIndex);
}

// 4. Update phone number to use dir="ltr" and strict international prefix
content = content.replace(
  `<span>{t.voiceDispatch}: {settings.phone || '+966505316971'}</span>`,
  `<span>{t.voiceDispatch}: <span dir="ltr" className="inline-block font-sans font-bold">+966 50 531 6971</span></span>`
);

// 5. Replace Payment & Trust Strip
const payStartIndex = content.indexOf('{/* PAYMENT BADGES STRIP');
const payEndIndex = content.indexOf('{/* BOTTOM LEGAL & COPYRIGHT BAR');

if (payStartIndex !== -1 && payEndIndex !== -1) {
  const unifiedStrip = `{/* UNIFIED PAYMENT & TRUST POLICY STATEMENT */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-2 rounded-xl bg-gold/15 border border-[#C5A15D]/40 text-[#E5C378] text-xs font-bold inline-flex items-center gap-2">
              <HandCoins className="w-4 h-4 text-[#A97B27]" />
              <span>{LOCALIZED_PAY_NOTICE[locale] || LOCALIZED_PAY_NOTICE.en}</span>
            </span>
            <span className="text-xs text-[#C8BBA7]">
              {t.assuranceBody}
            </span>
          </div>
          <div className="text-xs text-[#AEB7C4] flex items-center gap-4">
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#A97B27]" /> {settings.airport_waiting_minutes || 60} {t.waitSuffix}</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> {locale === 'ar' ? 'سعر ثابت شامل الضريبة' : 'Fixed fares with VAT'}</span>
          </div>
        </div>
      </div>\n\n      `;
  content = content.slice(0, payStartIndex) + unifiedStrip + content.slice(payEndIndex);
}

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully updated Footer.tsx with localized routes, authoritative fleet, and collapsible accordions');
