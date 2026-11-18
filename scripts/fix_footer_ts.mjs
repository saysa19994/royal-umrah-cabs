import fs from 'fs';

const path = 'd:/royal-umrah-cabs/src/components/layout/Footer.tsx';
let content = fs.readFileSync(path, 'utf8').replace(/\r\n/g, '\n');

const localizedRoutesDef = `const FOOTER_LOCALIZED_ROUTES: Record<Locale, Array<{ slug: string; name: string }>> = {
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

// Insert localized routes before FooterProps
if (!content.includes('const FOOTER_LOCALIZED_ROUTES')) {
  content = content.replace(
    'interface FooterProps {',
    `${localizedRoutesDef}\ninterface FooterProps {`
  );
}

// Replace guide keys
content = content.replace('{t.umrahGuide}', '{t.vipGuide}');
content = content.replace('{t.airportGuide}', '{t.arrivalGuide}');

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully fixed Footer.tsx TypeScript definitions');
