'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Locale } from '@/i18n/config';
import { MapPin, Search, X, Building2, Plane, Landmark, Train, Navigation } from 'lucide-react';

export interface LocationItem {
  id: string;
  name: Record<Locale, string>;
  address: Record<Locale, string>;
  category: 'airport' | 'hotel' | 'haram' | 'ziyarat' | 'station' | 'city';
  city: 'jeddah' | 'makkah' | 'madinah' | 'taif' | 'riyadh';
  defaultRouteCode: string;
}

export const SAUDI_LOCATIONS: LocationItem[] = [
  // AIRPORTS
  {
    id: 'jeddah-airport',
    name: {
      en: 'Jeddah Airport (KAIA) Terminal 1',
      ar: 'مطار الملك عبدالعزيز الدولي بجدة (صالة 1)',
      ms: 'Lapangan Terbang Jeddah (KAIA) Terminal 1',
      id: 'Bandara Jeddah (KAIA) Terminal 1',
      ur: 'جدہ ایئرپورٹ (KAIA) ٹرمینل 1',
      fr: 'Aéroport de Djeddah (KAIA) Terminal 1',
      es: 'Aeropuerto de Yeda (KAIA) Terminal 1',
      de: 'Flughafen Dschidda (KAIA) Terminal 1',
      hi: 'जेद्दा हवाई अड्डा (KAIA) टर्मिनल 1',
      tr: 'Cidde Havalimanı (KAIA) Terminal 1',
    },
    address: {
      en: 'Airport Road, King Abdulaziz International, Jeddah',
      ar: 'طريق المطار، مطار الملك عبدالعزيز الدولي، جدة',
      ms: 'Jalan Lapangan Terbang, Jeddah',
      id: 'Jalan Bandara, Jeddah',
      ur: 'ایئرپورٹ روڈ، جدہ',
      fr: 'Route de l\'Aéroport, Djeddah',
      es: 'Carretera del Aeropuerto, Yeda',
      de: 'Flughafenstraße, Dschidda',
      hi: 'हवाई अड्डा मार्ग, जेद्दा',
      tr: 'Havalimanı Yolu, Cidde',
    },
    category: 'airport',
    city: 'jeddah',
    defaultRouteCode: 'jeddah-airport',
  },
  {
    id: 'jeddah-airport-north',
    name: {
      en: 'Jeddah Airport (KAIA) North Terminal',
      ar: 'مطار الملك عبدالعزيز الدولي (الصالة الشمالية)',
      ms: 'Lapangan Terbang Jeddah (KAIA) Terminal Utara',
      id: 'Bandara Jeddah (KAIA) Terminal Utara',
      ur: 'جدہ ایئرپورٹ (KAIA) شمالی ٹرمینل',
      fr: 'Aéroport de Djeddah (KAIA) Terminal Nord',
      es: 'Aeropuerto de Yeda (KAIA) Terminal Norte',
      de: 'Flughafen Dschidda (KAIA) Nordterminal',
      hi: 'जेद्दा हवाई अड्डा (KAIA) उत्तरी टर्मिनल',
      tr: 'Cidde Havalimanı (KAIA) Kuzey Terminali',
    },
    address: {
      en: 'North Terminal Road, Jeddah',
      ar: 'طريق الصالة الشمالية، جدة',
      ms: 'Jalan Terminal Utara, Jeddah',
      id: 'Jalan Terminal Utara, Jeddah',
      ur: 'نارتھ ٹرمینل روڈ، جدہ',
      fr: 'Route du Terminal Nord, Djeddah',
      es: 'Carretera Terminal Norte, Yeda',
      de: 'Nordterminalstraße, Dschidda',
      hi: 'उत्तरी टर्मिनल मार्ग, जेद्दा',
      tr: 'Kuzey Terminal Yolu, Cidde',
    },
    category: 'airport',
    city: 'jeddah',
    defaultRouteCode: 'jeddah-airport',
  },
  {
    id: 'madinah-airport',
    name: {
      en: 'Madinah Airport (Prince Mohammad Bin Abdulaziz - MED)',
      ar: 'مطار الأمير محمد بن عبدالعزيز الدولي بالمدينة (MED)',
      ms: 'Lapangan Terbang Madinah (MED)',
      id: 'Bandara Madinah (MED)',
      ur: 'مدینہ منورہ ایئرپورٹ (MED)',
      fr: 'Aéroport de Médine (MED)',
      es: 'Aeropuerto de Medina (MED)',
      de: 'Flughafen Medina (MED)',
      hi: 'मदीना हवाई अड्डा (MED)',
      tr: 'Medine Havalimanı (MED)',
    },
    address: {
      en: 'Airport Road, Madinah Al-Munawwarah',
      ar: 'طريق المطار، المدينة المنورة',
      ms: 'Jalan Lapangan Terbang, Madinah',
      id: 'Jalan Bandara, Madinah',
      ur: 'ایئرپورٹ روڈ، مدینہ منورہ',
      fr: 'Route de l\'Aéroport, Médine',
      es: 'Carretera del Aeropuerto, Medina',
      de: 'Flughafenstraße, Medina',
      hi: 'हवाई अड्डा मार्ग, मदीना',
      tr: 'Havalimanı Yolu, Medine',
    },
    category: 'airport',
    city: 'madinah',
    defaultRouteCode: 'madinah-airport',
  },

  // MAKKAH HARAM & HOTELS
  {
    id: 'makkah-hotel',
    name: {
      en: 'Makkah Hotel / Haram Central Area',
      ar: 'فنادق مكة المكرمة / المنطقة المركزية للحرم',
      ms: 'Hotel Makkah / Kawasan Pusat Haram',
      id: 'Hotel Makkah / Kawasan Masjidil Haram',
      ur: 'مکہ مکرمہ ہوٹل / حرم سینٹرل ایریا',
      fr: 'Hôtel La Mecque / Zone Centrale du Haram',
      es: 'Hotel La Meca / Zona Central de Haram',
      de: 'Hotel Mekka / Zentralbereich Haram',
      hi: 'मक्का होटल / हरम केंद्रीय क्षेत्र',
      tr: 'Mekke Oteli / Harem Merkez Bölgesi',
    },
    address: {
      en: 'Ibrahim Al Khalil & Ajyad Districts, Makkah',
      ar: 'شارع إبراهيم الخليل وأجياد، مكة المكرمة',
      ms: 'Kawasan Ibrahim Al Khalil & Ajyad, Makkah',
      id: 'Kawasan Ibrahim Al Khalil & Ajyad, Makkah',
      ur: 'ابراہیم الخلیل و اجیاد، مکہ مکرمہ',
      fr: 'Districts Ibrahim Al Khalil & Ajyad, La Mecque',
      es: 'Distritos de Ibrahim Al Khalil y Ajyad, La Meca',
      de: 'Bezirke Ibrahim Al Khalil & Ajyad, Mekka',
      hi: 'इब्राहिम अल खलील और अज्याद, मक्का',
      tr: 'İbrahim Halil ve Ecyad Bölgeleri, Mekke',
    },
    category: 'haram',
    city: 'makkah',
    defaultRouteCode: 'makkah-hotel',
  },
  {
    id: 'makkah-fairmont',
    name: {
      en: 'Makkah Clock Royal Tower (Fairmont)',
      ar: 'فندق فيرمونت برج الساعة مكة',
      ms: 'Makkah Clock Royal Tower (Fairmont)',
      id: 'Makkah Clock Royal Tower (Fairmont)',
      ur: 'مکہ کلاک رائل ٹاور (فیرمونٹ)',
      fr: 'Makkah Clock Royal Tower (Fairmont)',
      es: 'Makkah Clock Royal Tower (Fairmont)',
      de: 'Makkah Clock Royal Tower (Fairmont)',
      hi: 'मक्का क्लॉक रॉयल टॉवर (फेयरमोंट)',
      tr: 'Makkah Clock Royal Tower (Fairmont)',
    },
    address: {
      en: 'Abraj Al Bait Complex, King Abdulaziz Endowment, Makkah',
      ar: 'مجمع أبراج البيت، وقف الملك عبدالعزيز، مكة المكرمة',
      ms: 'Kompleks Abraj Al Bait, Makkah',
      id: 'Kompleks Abraj Al Bait, Makkah',
      ur: 'ابراج البیت کمپلیکس، مکہ مکرمہ',
      fr: 'Complexe Abraj Al Bait, La Mecque',
      es: 'Complejo Abraj Al Bait, La Meca',
      de: 'Abraj Al Bait Komplex, Mekka',
      hi: 'अबराज अल बैत कॉम्प्लेक्स, मक्का',
      tr: 'Abraj Al Bait Kompleksi, Mekke',
    },
    category: 'hotel',
    city: 'makkah',
    defaultRouteCode: 'makkah-hotel',
  },
  {
    id: 'makkah-raffles',
    name: {
      en: 'Raffles Makkah Palace',
      ar: 'فندق رافلز قصر مكة',
      ms: 'Raffles Makkah Palace',
      id: 'Raffles Makkah Palace',
      ur: 'رافلز مکہ پیلس ہوٹل',
      fr: 'Raffles Makkah Palace',
      es: 'Raffles Makkah Palace',
      de: 'Raffles Makkah Palace',
      hi: 'राफल्स मक्का पैलेस',
      tr: 'Raffles Makkah Palace',
    },
    address: {
      en: 'Abraj Al Bait, South Gate, Makkah',
      ar: 'أبراج البيت، البوابة الجنوبية، مكة المكرمة',
      ms: 'Abraj Al Bait, Makkah',
      id: 'Abraj Al Bait, Makkah',
      ur: 'ابراج البیت، مکہ مکرمہ',
      fr: 'Abraj Al Bait, La Mecque',
      es: 'Abraj Al Bait, La Meca',
      de: 'Abraj Al Bait, Mekka',
      hi: 'अबराज अल बैत, मक्का',
      tr: 'Abraj Al Bait, Mekke',
    },
    category: 'hotel',
    city: 'makkah',
    defaultRouteCode: 'makkah-hotel',
  },
  {
    id: 'makkah-swissotel',
    name: {
      en: 'Swissôtel Al Maqam Makkah',
      ar: 'فندق سويس أوتيل المقام مكة',
      ms: 'Swissôtel Al Maqam Makkah',
      id: 'Swissôtel Al Maqam Makkah',
      ur: 'سوئس ہوٹل المقام مکہ',
      fr: 'Swissôtel Al Maqam Makkah',
      es: 'Swissôtel Al Maqam Makkah',
      de: 'Swissôtel Al Maqam Makkah',
      hi: 'स्विसोटेल अल मक़ाम मक्का',
      tr: 'Swissôtel Al Maqam Makkah',
    },
    address: {
      en: 'Abraj Al Bait Complex, Ibrahim Al Khalil, Makkah',
      ar: 'مجمع أبراج البيت، شارع إبراهيم الخليل، مكة المكرمة',
      ms: 'Abraj Al Bait, Makkah',
      id: 'Abraj Al Bait, Makkah',
      ur: 'ابراج البیت، مکہ مکرمہ',
      fr: 'Abraj Al Bait, La Mecque',
      es: 'Abraj Al Bait, La Meca',
      de: 'Abraj Al Bait, Mekka',
      hi: 'अबराज अल बैत, मक्का',
      tr: 'Abraj Al Bait, Mekke',
    },
    category: 'hotel',
    city: 'makkah',
    defaultRouteCode: 'makkah-hotel',
  },
  {
    id: 'makkah-jabal-omar-hyatt',
    name: {
      en: 'Jabal Omar Hyatt Regency Makkah',
      ar: 'فندق حياة ريجنسي جبل عمر مكة',
      ms: 'Jabal Omar Hyatt Regency Makkah',
      id: 'Jabal Omar Hyatt Regency Makkah',
      ur: 'جبل عمر حیات ریجنسی مکہ',
      fr: 'Jabal Omar Hyatt Regency Makkah',
      es: 'Jabal Omar Hyatt Regency Makkah',
      de: 'Jabal Omar Hyatt Regency Makkah',
      hi: 'जबल उमर हयात रीजेंसी मक्का',
      tr: 'Jabal Omar Hyatt Regency Makkah',
    },
    address: {
      en: 'Jabal Omar Development, Ibrahim Al Khalil St, Makkah',
      ar: 'مشروع جبل عمر، شارع إبراهيم الخليل، مكة المكرمة',
      ms: 'Jabal Omar, Jalan Ibrahim Al Khalil, Makkah',
      id: 'Jabal Omar, Jalan Ibrahim Al Khalil, Makkah',
      ur: 'جبل عمر، ابراہیم الخلیل اسٹریٹ، مکہ',
      fr: 'Jabal Omar, Rue Ibrahim Al Khalil, La Mecque',
      es: 'Jabal Omar, Calle Ibrahim Al Khalil, La Meca',
      de: 'Jabal Omar, Ibrahim Al Khalil Straße, Mekka',
      hi: 'जबल उमर, इब्राहिम अल खलील स्ट्रीट, मक्का',
      tr: 'Jabal Omar, İbrahim Halil Caddesi, Mekke',
    },
    category: 'hotel',
    city: 'makkah',
    defaultRouteCode: 'makkah-hotel',
  },
  {
    id: 'makkah-jabal-omar-conrad',
    name: {
      en: 'Jabal Omar Conrad Makkah',
      ar: 'فندق كونراد جبل عمر مكة',
      ms: 'Jabal Omar Conrad Makkah',
      id: 'Jabal Omar Conrad Makkah',
      ur: 'کونراڈ جبل عمر مکہ ہوٹل',
      fr: 'Jabal Omar Conrad Makkah',
      es: 'Jabal Omar Conrad Makkah',
      de: 'Jabal Omar Conrad Makkah',
      hi: 'जबल उमर कोनराड मक्का',
      tr: 'Jabal Omar Conrad Makkah',
    },
    address: {
      en: 'Ibrahim Al Khalil Street, Central Area, Makkah',
      ar: 'شارع إبراهيم الخليل، المنطقة المركزية، مكة المكرمة',
      ms: 'Jalan Ibrahim Al Khalil, Makkah',
      id: 'Jalan Ibrahim Al Khalil, Makkah',
      ur: 'ابراہیم الخلیل روڈ، مکہ',
      fr: 'Rue Ibrahim Al Khalil, La Mecque',
      es: 'Calle Ibrahim Al Khalil, La Meca',
      de: 'Ibrahim Al Khalil Straße, Mekka',
      hi: 'इब्राहिम अल खलील स्ट्रीट, मक्का',
      tr: 'İbrahim Halil Caddesi, Mekke',
    },
    category: 'hotel',
    city: 'makkah',
    defaultRouteCode: 'makkah-hotel',
  },
  {
    id: 'makkah-jabal-omar-hilton',
    name: {
      en: 'Jabal Omar Hilton Suites Makkah',
      ar: 'أجنحة هيلتون جبل عمر مكة',
      ms: 'Jabal Omar Hilton Suites Makkah',
      id: 'Jabal Omar Hilton Suites Makkah',
      ur: 'ہلٹن سویٹس جبل عمر مکہ',
      fr: 'Jabal Omar Hilton Suites Makkah',
      es: 'Jabal Omar Hilton Suites Makkah',
      de: 'Jabal Omar Hilton Suites Makkah',
      hi: 'जबल उमर हिल्टन सुइट्स मक्का',
      tr: 'Jabal Omar Hilton Suites Makkah',
    },
    address: {
      en: 'Ibrahim Al Khalil Street, Jabal Omar, Makkah',
      ar: 'شارع إبراهيم الخليل، جبل عمر، مكة المكرمة',
      ms: 'Jalan Ibrahim Al Khalil, Makkah',
      id: 'Jalan Ibrahim Al Khalil, Makkah',
      ur: 'ابراہیم الخلیل روڈ، مکہ',
      fr: 'Rue Ibrahim Al Khalil, La Mecque',
      es: 'Calle Ibrahim Al Khalil, La Meca',
      de: 'Ibrahim Al Khalil Straße, Mekka',
      hi: 'इब्राहिम अल खलील स्ट्रीट, मक्का',
      tr: 'İbrahim Halil Caddesi, Mekke',
    },
    category: 'hotel',
    city: 'makkah',
    defaultRouteCode: 'makkah-hotel',
  },
  {
    id: 'makkah-pullman-zamzam',
    name: {
      en: 'Pullman Zamzam Makkah',
      ar: 'فندق بولمان زمزم مكة',
      ms: 'Pullman Zamzam Makkah',
      id: 'Pullman Zamzam Makkah',
      ur: 'بولمین زمزم ہوٹل مکہ',
      fr: 'Pullman Zamzam Makkah',
      es: 'Pullman Zamzam Makkah',
      de: 'Pullman Zamzam Makkah',
      hi: 'पुलमैन ज़मज़म मक्का',
      tr: 'Pullman Zamzam Makkah',
    },
    address: {
      en: 'Abraj Al Bait Complex, Ajyad, Makkah',
      ar: 'مجمع أبراج البيت، أجياد، مكة المكرمة',
      ms: 'Abraj Al Bait, Makkah',
      id: 'Abraj Al Bait, Makkah',
      ur: 'ابراج البیت، مکہ',
      fr: 'Abraj Al Bait, La Mecque',
      es: 'Abraj Al Bait, La Meca',
      de: 'Abraj Al Bait, Mekka',
      hi: 'अबराज अल बैत, मक्का',
      tr: 'Abraj Al Bait, Mekke',
    },
    category: 'hotel',
    city: 'makkah',
    defaultRouteCode: 'makkah-hotel',
  },

  // MADINAH HARAM & HOTELS
  {
    id: 'madinah-hotel',
    name: {
      en: 'Madinah Hotel / Prophet\'s Mosque Area',
      ar: 'فنادق المدينة المنورة / المنطقة المركزية للحرم النبوي',
      ms: 'Hotel Madinah / Kawasan Masjid Nabawi',
      id: 'Hotel Madinah / Kawasan Masjid Nabawi',
      ur: 'مدینہ منورہ ہوٹل / مسجد نبوی سینٹرل ایریا',
      fr: 'Hôtel Médine / Zone Centrale de la Mosquée du Prophète',
      es: 'Hotel Medina / Zona de la Mezquita del Profeta',
      de: 'Hotel Medina / Prophetenmoschee Zentralbereich',
      hi: 'मदीना होटल / पैगंबर की मस्जिद क्षेत्र',
      tr: 'Medine Oteli / Mescid-i Nebevi Bölgesi',
    },
    address: {
      en: 'Central Area (North/South Markaziyah), Madinah',
      ar: 'المنطقة المركزية (الشمالية / الجنوبية)، المدينة المنورة',
      ms: 'Kawasan Pusat Markaziyah, Madinah',
      id: 'Kawasan Pusat Markaziyah, Madinah',
      ur: 'مرکزیہ علاقہ، مدینہ منورہ',
      fr: 'Zone Centrale (Markaziyah), Médine',
      es: 'Zona Central (Markaziyah), Medina',
      de: 'Zentralbereich (Markaziyah), Medina',
      hi: 'केंद्रीय क्षेत्र, मदीना',
      tr: 'Merkezi Bölge (Merkeziye), Medine',
    },
    category: 'haram',
    city: 'madinah',
    defaultRouteCode: 'madinah-hotel',
  },
  {
    id: 'madinah-oberoi',
    name: {
      en: 'The Oberoi Madinah',
      ar: 'فندق أوبروي المدينة المنورة',
      ms: 'The Oberoi Madinah',
      id: 'The Oberoi Madinah',
      ur: 'دی اوبرائے مدینہ ہوٹل',
      fr: 'The Oberoi Madinah',
      es: 'The Oberoi Madinah',
      de: 'The Oberoi Madinah',
      hi: 'द ओबेरॉय मदीना',
      tr: 'The Oberoi Madinah',
    },
    address: {
      en: 'North Central Area, Opposite Prophet\'s Mosque, Madinah',
      ar: 'المنطقة المركزية الشمالية، أمام المسجد النبوي، المدينة المنورة',
      ms: 'Kawasan Pusat Utara, Madinah',
      id: 'Kawasan Pusat Utara, Madinah',
      ur: 'شمالی مرکزیہ، مدینہ منورہ',
      fr: 'Zone Centrale Nord, Médine',
      es: 'Zona Central Norte, Medina',
      de: 'Nördlicher Zentralbereich, Medina',
      hi: 'उत्तरी केंद्रीय क्षेत्र, मदीना',
      tr: 'Kuzey Merkezi Bölge, Medine',
    },
    category: 'hotel',
    city: 'madinah',
    defaultRouteCode: 'madinah-hotel',
  },
  {
    id: 'madinah-dar-al-taqwa',
    name: {
      en: 'Dar Al Taqwa Hotel Madinah',
      ar: 'فندق دار التقوى المدينة المنورة',
      ms: 'Dar Al Taqwa Hotel Madinah',
      id: 'Dar Al Taqwa Hotel Madinah',
      ur: 'دار التقویٰ ہوٹل مدینہ',
      fr: 'Dar Al Taqwa Hotel Madinah',
      es: 'Dar Al Taqwa Hotel Madinah',
      de: 'Dar Al Taqwa Hotel Madinah',
      hi: 'दार अल तक़वा होटल मदीना',
      tr: 'Dar Al Taqwa Hotel Madinah',
    },
    address: {
      en: 'Northern Courtyard, Al-Masjid an-Nabawi, Madinah',
      ar: 'الساحات الشمالية، المسجد النبوي، المدينة المنورة',
      ms: 'Pekarangan Utara Masjid Nabawi, Madinah',
      id: 'Pelataran Utara Masjid Nabawi, Madinah',
      ur: 'مسجد نبوی، مدینہ منورہ',
      fr: 'Esplanade Nord, Médine',
      es: 'Explanada Norte, Medina',
      de: 'Nordplatz, Medina',
      hi: 'उत्तरी प्रांगण, मदीना',
      tr: 'Kuzey Avlu, Medine',
    },
    category: 'hotel',
    city: 'madinah',
    defaultRouteCode: 'madinah-hotel',
  },
  {
    id: 'madinah-dar-al-iman',
    name: {
      en: 'Dar Al Iman InterContinental Madinah',
      ar: 'فندق دار الإيمان إنتركونتيننتال المدينة',
      ms: 'Dar Al Iman InterContinental Madinah',
      id: 'Dar Al Iman InterContinental Madinah',
      ur: 'دار الایمان انٹرکانٹینینٹل مدینہ',
      fr: 'Dar Al Iman InterContinental Madinah',
      es: 'Dar Al Iman InterContinental Madinah',
      de: 'Dar Al Iman InterContinental Madinah',
      hi: 'दार अल ईमान इंटरकांटिनेंटल मदीना',
      tr: 'Dar Al Iman InterContinental Madinah',
    },
    address: {
      en: 'Central Area, Adjacent to Prophet\'s Mosque, Madinah',
      ar: 'المنطقة المركزية، بجوار المسجد النبوي، المدينة المنورة',
      ms: 'Kawasan Pusat, Madinah',
      id: 'Kawasan Pusat, Madinah',
      ur: 'مرکزیہ ایریا، مدینہ منورہ',
      fr: 'Zone Centrale, Médine',
      es: 'Zona Central, Medina',
      de: 'Zentralbereich, Medina',
      hi: 'केंद्रीय क्षेत्र, मदीना',
      tr: 'Merkezi Bölge, Medine',
    },
    category: 'hotel',
    city: 'madinah',
    defaultRouteCode: 'madinah-hotel',
  },
  {
    id: 'madinah-anwar-movenpick',
    name: {
      en: 'Anwar Al Madinah Mövenpick Hotel',
      ar: 'فندق أنوار المدينة موفنبيك',
      ms: 'Anwar Al Madinah Mövenpick Hotel',
      id: 'Anwar Al Madinah Mövenpick Hotel',
      ur: 'انوار المدینہ موونپک ہوٹل',
      fr: 'Anwar Al Madinah Mövenpick Hotel',
      es: 'Anwar Al Madinah Mövenpick Hotel',
      de: 'Anwar Al Madinah Mövenpick Hotel',
      hi: 'अनवार अल मदीना मोवेनपिक होटल',
      tr: 'Anwar Al Madinah Mövenpick Hotel',
    },
    address: {
      en: 'Central Area, Northern District, Madinah',
      ar: 'المنطقة المركزية الشمالية، المدينة المنورة',
      ms: 'Kawasan Pusat Utara, Madinah',
      id: 'Kawasan Pusat Utara, Madinah',
      ur: 'شمالی مرکزیہ، مدینہ',
      fr: 'District Nord, Médine',
      es: 'Distrito Norte, Medina',
      de: 'Nordbezirk, Medina',
      hi: 'उत्तरी जिला, मदीना',
      tr: 'Kuzey Bölgesi, Medine',
    },
    category: 'hotel',
    city: 'madinah',
    defaultRouteCode: 'madinah-hotel',
  },

  // ZIYARAT & HISTORICAL LANDMARKS
  {
    id: 'makkah-ziyarat',
    name: {
      en: 'Makkah Holy Sites / Ziyarat (Hira, Arafat, Mina)',
      ar: 'مزارات مكة المكرمة والمشاعر (حراء، عرفات، منى)',
      ms: 'Ziarah Makkah / Tapak Suci (Hira, Arafat, Mina)',
      id: 'Ziarah Makkah / Tempat Suci (Hira, Arafah, Mina)',
      ur: 'مکہ مکرمہ زیارات و مشاعر مقدسہ (حرا، عرفات، منیٰ)',
      fr: 'Lieux Saints de La Mecque / Ziyarat (Hira, Arafat, Mina)',
      es: 'Lugares Sagrados de La Meca (Hira, Arafat, Mina)',
      de: 'Heilige Stätten Mekka / Ziyarat (Hira, Arafat, Mina)',
      hi: 'मक्का पवित्र स्थल / ज़ियारत (हिरा, अराफात, मीना)',
      tr: 'Mekke Ziyaret Yerleri (Hira, Arafat, Mina)',
    },
    address: {
      en: 'Cave of Hira, Jabal Al-Rahmah, Mina & Muzdalifah, Makkah',
      ar: 'غار حراء، جبل الرحمة، مشعر منى ومزدلفة، مكة المكرمة',
      ms: 'Gua Hira, Jabal Rahmah, Mina & Muzdalifah, Makkah',
      id: 'Gua Hira, Jabal Rahmah, Mina & Muzdalifah, Makkah',
      ur: 'غار حرا، جبل الرحمہ، منیٰ و مزدلفہ، مکہ',
      fr: 'Grotte de Hira, Jabal Al-Rahmah, Mina, La Mecque',
      es: 'Cueva de Hira, Jabal Al-Rahmah, Mina, La Meca',
      de: 'Hira-Höhle, Dschabal ar-Rahma, Mina, Mekka',
      hi: 'हिरा गुफा, जबल अर-रहमा, मीना, मक्का',
      tr: 'Hira Mağarası, Arafat, Mina, Mekke',
    },
    category: 'ziyarat',
    city: 'makkah',
    defaultRouteCode: 'makkah-ziyarat',
  },
  {
    id: 'madinah-ziyarat',
    name: {
      en: 'Madinah Holy Sites / Ziyarat (Quba, Uhud, Qiblatayn)',
      ar: 'مزارات المدينة المنورة (مسجد قباء، جبل أحد، القبلتين)',
      ms: 'Ziarah Madinah (Masjid Quba, Bukit Uhud, Qiblatain)',
      id: 'Ziarah Madinah (Masjid Quba, Gunung Uhud, Qiblatain)',
      ur: 'مدینہ منورہ زیارات (مسجد قباء، جبل احد، قبلتین)',
      fr: 'Lieux Saints de Médine (Quba, Uhud, Qiblatayn)',
      es: 'Lugares Sagrados de Medina (Quba, Uhud, Qiblatayn)',
      de: 'Heilige Stätten Medina (Quba, Uhud, Qiblatayn)',
      hi: 'मदीना पवित्र स्थल (क़ुबा, उहुद, क़िबलतैन)',
      tr: 'Medine Ziyaret Yerleri (Kuba, Uhud, Kıbleteyn)',
    },
    address: {
      en: 'Masjid Quba, Mount Uhud & Martyrs, Qiblatayn, Madinah',
      ar: 'مسجد قباء، جبل أحد والشهداء، مسجد القبلتين، المدينة المنورة',
      ms: 'Masjid Quba, Bukit Uhud & Syuhada, Madinah',
      id: 'Masjid Quba, Gunung Uhud & Syuhada, Madinah',
      ur: 'مسجد قباء، جبل احد، مسجد قبلتین، مدینہ',
      fr: 'Masjid Quba, Mont Uhud, Médine',
      es: 'Mezquita Quba, Monte Uhud, Medina',
      de: 'Quba-Moschee, Berg Uhud, Medina',
      hi: 'मस्जिद क़ुबा, माउंट उहुद, मदीना',
      tr: 'Kuba Mescidi, Uhud Dağı, Medine',
    },
    category: 'ziyarat',
    city: 'madinah',
    defaultRouteCode: 'madinah-ziyarat',
  },

  // CITIES & STATIONS
  {
    id: 'jeddah-city',
    name: {
      en: 'Jeddah City / Corniche Hotels & Al-Balad',
      ar: 'مدينة جدة / فنادق الكورنيش والبلد التاريخية',
      ms: 'Bandar Jeddah / Kawasan Corniche & Al-Balad',
      id: 'Kota Jeddah / Kawasan Corniche & Al-Balad',
      ur: 'جدہ سٹی / کورنیش ہوٹلز و البلد تاریخی علاقہ',
      fr: 'Ville de Djeddah / Hôtels Corniche & Al-Balad',
      es: 'Ciudad de Yeda / Hoteles Corniche y Al-Balad',
      de: 'Stadt Dschidda / Corniche-Hotels & Al-Balad',
      hi: 'जेद्दा शहर / कॉर्निश होटल और अल-बलाद',
      tr: 'Cidde Şehir / Kordon Otelleri ve El-Beled',
    },
    address: {
      en: 'Corniche Rd, Al Andalus, Al Hamra, Jeddah',
      ar: 'طريق الكورنيش، الأندلس، الحمراء، جدة',
      ms: 'Jalan Corniche, Al Andalus, Jeddah',
      id: 'Jalan Corniche, Al Andalus, Jeddah',
      ur: 'کورنیش روڈ، الحمراء، جدہ',
      fr: 'Route de la Corniche, Djeddah',
      es: 'Carretera de la Corniche, Yeda',
      de: 'Corniche-Straße, Dschidda',
      hi: 'कॉर्निश रोड, जेद्दा',
      tr: 'Kordon Yolu, Cidde',
    },
    category: 'city',
    city: 'jeddah',
    defaultRouteCode: 'jeddah-city',
  },
  {
    id: 'makkah-haramain-station',
    name: {
      en: 'Makkah Haramain High-Speed Train Station',
      ar: 'محطة قطار الحرمين السريع بمكة المكرمة (الرصيفة)',
      ms: 'Stesen Kereta Api Laju Haramain Makkah',
      id: 'Stasiun Kereta Cepat Haramain Makkah',
      ur: 'مکہ حرمین ہائی اسپیڈ ریلوے اسٹیشن (الرصیفہ)',
      fr: 'Gare TGV Haramain La Mecque (Rusaifah)',
      es: 'Estación de Tren de Alta Velocidad Haramain La Meca',
      de: 'Haramain Hochgeschwindigkeits-Bahnhof Mekka',
      hi: 'मक्का हरमैन हाई-स्पीड ट्रेन स्टेशन',
      tr: 'Mekke Haremeyn Hızlı Tren İstasyonu',
    },
    address: {
      en: 'Al Rusaifah District, Makkah Al-Mukarramah',
      ar: 'حي الرصيفة، مكة المكرمة',
      ms: 'Kawasan Al Rusaifah, Makkah',
      id: 'Kawasan Al Rusaifah, Makkah',
      ur: 'الرصیفہ، مکہ مکرمہ',
      fr: 'District Al Rusaifah, La Mecque',
      es: 'Distrito Al Rusaifah, La Meca',
      de: 'Bezirk Al Rusaifah, Mekka',
      hi: 'अल रुसैफाह, मक्का',
      tr: 'El Ruseyfe Bölgesi, Mekke',
    },
    category: 'station',
    city: 'makkah',
    defaultRouteCode: 'makkah-hotel',
  },
  {
    id: 'madinah-haramain-station',
    name: {
      en: 'Madinah Haramain High-Speed Train Station',
      ar: 'محطة قطار الحرمين السريع بالمدينة المنورة',
      ms: 'Stesen Kereta Api Laju Haramain Madinah',
      id: 'Stasiun Kereta Cepat Haramain Madinah',
      ur: 'مدینہ حرمین ہائی اسپیڈ ریلوے اسٹیشن',
      fr: 'Gare TGV Haramain Médine',
      es: 'Estación de Tren de Alta Velocidad Haramain Medina',
      de: 'Haramain Hochgeschwindigkeits-Bahnhof Medina',
      hi: 'मदीना हरमैन हाई-स्पीड ट्रेन स्टेशन',
      tr: 'Medine Haremeyn Hızlı Tren İstasyonu',
    },
    address: {
      en: 'Knowledge Economic City, Madinah Al-Munawwarah',
      ar: 'مدينة المعرفة الاقتصادية، المدينة المنورة',
      ms: 'Knowledge Economic City, Madinah',
      id: 'Knowledge Economic City, Madinah',
      ur: 'نالج اکنامک سٹی، مدینہ منورہ',
      fr: 'Knowledge Economic City, Médine',
      es: 'Knowledge Economic City, Medina',
      de: 'Knowledge Economic City, Medina',
      hi: 'नॉलेज इकोनॉमिक सिटी, मदीना',
      tr: 'Bilgi Ekonomi Şehri, Medine',
    },
    category: 'station',
    city: 'madinah',
    defaultRouteCode: 'madinah-hotel',
  },
  {
    id: 'taif-city',
    name: {
      en: 'Taif City / Al Hada & Shafa Resorts',
      ar: 'مدينة الطائف / منتجعات الهدا والشفا',
      ms: 'Bandar Taif / Kawasan Peranginan Al Hada',
      id: 'Kota Taif / Resor Al Hada & Shafa',
      ur: 'طائف سٹی / الہدا اور الشفا ریزورٹس',
      fr: 'Ville de Taïf / Stations Al Hada & Shafa',
      es: 'Ciudad de Taif / Resorts Al Hada y Shafa',
      de: 'Stadt Taif / Al Hada & Shafa Resorts',
      hi: 'ताइफ़ शहर / अल हदा और शफ़ा रिसॉर्ट्स',
      tr: 'Taif Şehir / El Hada ve Şefa Tesisleri',
    },
    address: {
      en: 'Al Hada Ring Rd, Taif Province',
      ar: 'طريق الهدا الدائري، محافظة الطائف',
      ms: 'Jalan Al Hada, Taif',
      id: 'Jalan Al Hada, Taif',
      ur: 'الہدا رنگ روڈ، طائف',
      fr: 'Route Al Hada, Taïf',
      es: 'Carretera Al Hada, Taif',
      de: 'Al Hada Ringstraße, Taif',
      hi: 'अल हदा रोड, ताइफ़',
      tr: 'El Hada Yolu, Taif',
    },
    category: 'city',
    city: 'taif',
    defaultRouteCode: 'makkah-to-taif',
  },
];

interface LocationAutocompleteProps {
  label: string;
  value: string;
  onChange: (locationId: string, item?: LocationItem) => void;
  placeholder?: string;
  locale: Locale;
  excludeId?: string;
}

export function LocationAutocomplete({
  label,
  value,
  onChange,
  placeholder,
  locale,
  excludeId,
}: LocationAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isRtl = locale === 'ar' || locale === 'ur';

  // Find currently selected location object
  const selectedItem = useMemo(() => {
    return SAUDI_LOCATIONS.find((loc) => loc.id === value);
  }, [value]);

  // Display text in input
  const displayText = useMemo(() => {
    if (!selectedItem) return '';
    return selectedItem.name[locale] || selectedItem.name.en;
  }, [selectedItem, locale]);

  // Filter locations based on query
  const filteredLocations = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = SAUDI_LOCATIONS.filter((item) => item.id !== excludeId);

    if (!q) {
      return list;
    }

    return list.filter((item) => {
      const nameEn = (item.name.en || '').toLowerCase();
      const nameAr = (item.name.ar || '').toLowerCase();
      const addrEn = (item.address.en || '').toLowerCase();
      const addrAr = (item.address.ar || '').toLowerCase();
      const city = item.city.toLowerCase();

      return (
        nameEn.includes(q) ||
        nameAr.includes(q) ||
        addrEn.includes(q) ||
        addrAr.includes(q) ||
        city.includes(q)
      );
    });
  }, [query, excludeId]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setActiveIndex(-1);
        setQuery('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = useCallback(
    (item: LocationItem) => {
      onChange(item.id, item);
      setIsOpen(false);
      setQuery('');
      setActiveIndex(-1);
    },
    [onChange]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < filteredLocations.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : filteredLocations.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && filteredLocations[activeIndex]) {
        handleSelect(filteredLocations[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  const getCategoryIcon = (category: LocationItem['category']) => {
    switch (category) {
      case 'airport':
        return <Plane className="w-4 h-4 text-[#C5A059] shrink-0" />;
      case 'hotel':
        return <Building2 className="w-4 h-4 text-[#C5A059] shrink-0" />;
      case 'haram':
        return <Landmark className="w-4 h-4 text-[#C5A059] shrink-0" />;
      case 'station':
        return <Train className="w-4 h-4 text-[#C5A059] shrink-0" />;
      case 'ziyarat':
        return <Navigation className="w-4 h-4 text-[#C5A059] shrink-0" />;
      default:
        return <MapPin className="w-4 h-4 text-[#C5A059] shrink-0" />;
    }
  };

  const getCategoryBadgeText = (category: LocationItem['category']) => {
    if (locale === 'ar') {
      switch (category) {
        case 'airport':
          return 'مطار';
        case 'hotel':
          return 'فندق';
        case 'haram':
          return 'الحرم';
        case 'station':
          return 'قطار';
        case 'ziyarat':
          return 'مزارات';
        default:
          return 'مدينة';
      }
    }
    switch (category) {
      case 'airport':
        return 'AIRPORT';
      case 'hotel':
        return 'HOTEL';
      case 'haram':
        return 'HARAM';
      case 'station':
        return 'TRAIN';
      case 'ziyarat':
        return 'ZIYARAT';
      default:
        return 'CITY';
    }
  };

  return (
    <div ref={containerRef} className="relative flex-1 min-w-0">
      {/* Clickable Field Trigger */}
      <div
        onClick={() => {
          setIsOpen((prev) => !prev);
          if (!isOpen) {
            setTimeout(() => inputRef.current?.focus(), 50);
          }
        }}
        className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group py-1 px-1 sm:px-2 rounded-xl transition-colors hover:bg-white/[0.04]"
      >
        {/* Left Circular Golden Pin Badge (Matching Reference 2) */}
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-b from-[#1C181A] to-[#120F12] border border-[#C5A059]/60 flex items-center justify-center text-[#D8B174] shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),_0_2px_8px_rgba(0,0,0,0.6)] group-hover:border-[#C5A059] group-hover:scale-105 transition-all shrink-0">
          <MapPin className="w-5 h-5 text-[#C5A059] drop-shadow-sm" />
        </div>

        {/* Input Details */}
        <div className="flex-1 min-w-0 text-start">
          <label className="text-[10px] sm:text-[11px] font-bold text-[#8E8B85] uppercase tracking-wider block leading-none mb-1">
            {label}
          </label>
          <div className="flex items-center justify-between gap-1">
            <span className="font-semibold text-xs sm:text-sm text-[#F7F3EE] truncate block leading-tight">
              {displayText || placeholder || (locale === 'ar' ? 'اختر الموقع...' : 'Select location...')}
            </span>
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`w-3.5 h-3.5 text-[#C5A059] shrink-0 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LUXURY AUTOCOMPLETE DROPDOWN (Directly below active input)                 */}
      {/* ========================================================================= */}
      {isOpen && (
        <div
          className={`absolute top-full mt-2.5 z-50 w-[300px] sm:w-[380px] max-w-[95vw] ${
            isRtl ? 'right-0' : 'left-0'
          } bg-[#0D111A] text-[#F7F3EE] rounded-2xl border border-[#C5A059]/65 shadow-[0_25px_60px_rgba(0,0,0,0.95),_0_0_30px_rgba(197,160,89,0.2)] overflow-hidden backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-200`}
        >
          {/* Top Search Bar inside Dropdown */}
          <div className="p-3 border-b border-white/10 bg-white/[0.02] flex items-center gap-2">
            <Search className="w-4 h-4 text-[#C5A059] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder={
                locale === 'ar'
                  ? 'ابحث باسم الفندق، المطار، أو المعلم...'
                  : 'Search hotel, airport, or landmark...'
              }
              className="w-full bg-transparent text-xs sm:text-sm text-[#F7F3EE] placeholder-[#7F7B75] focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  inputRef.current?.focus();
                }}
                className="text-[#9E978E] hover:text-white p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Results List */}
          <div className="max-h-[290px] overflow-y-auto divide-y divide-white/5 py-1">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((item, index) => {
                const isSelected = item.id === value;
                const isFocused = index === activeIndex;

                return (
                  <button
                    key={`loc-${item.id}`}
                    type="button"
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`w-full text-start p-3 sm:px-4 sm:py-3 transition-colors flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-[#C5A059]/20 border-s-2 border-[#C5A059]'
                        : isFocused
                        ? 'bg-white/[0.06] border-s-2 border-[#C5A059]/50'
                        : 'hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="mt-0.5">{getCategoryIcon(item.category)}</div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-xs sm:text-sm text-[#F7F3EE] truncate block">
                          {item.name[locale] || item.name.en}
                        </span>
                        <span className="text-[9px] font-bold text-[#DDBA8F] bg-[#C5A059]/15 border border-[#C5A059]/30 px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0">
                          {getCategoryBadgeText(item.category)}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#9E978E] truncate block mt-0.5">
                        {item.address[locale] || item.address.en}
                      </span>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="p-6 text-center text-xs text-[#9E978E]">
                {locale === 'ar'
                  ? 'لم يتم العثور على نتائج مطابقة'
                  : 'No matching locations found'}
              </div>
            )}
          </div>

          {/* Bottom attribution/help note */}
          <div className="p-2.5 bg-[#080B10] border-t border-white/5 text-[10px] text-[#7E7972] flex items-center justify-between px-3">
            <span>
              {locale === 'ar'
                ? 'مواقع معتمدة لنقل ضيوف الرحمن'
                : 'Official VIP Umrah Transfer Locations'}
            </span>
            <span className="text-[#C5A059] font-medium">Duyuf Al Rahman VIP</span>
          </div>
        </div>
      )}
    </div>
  );
}
