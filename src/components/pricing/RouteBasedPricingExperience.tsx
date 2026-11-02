'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { useCurrency } from '@/context/CurrencyContext';
import {
  Plane,
  Building,
  Palmtree,
  Compass,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Users,
  Luggage,
  Sparkles,
  Banknote,
  MapPin,
  Clock,
  Shield,
  Check,
} from 'lucide-react';
import {
  LOCALIZED_ROUTE_NAMES,
  AUTHORITATIVE_TRANSFER_RATES,
} from '@/lib/pricing-constants';

interface RouteBasedPricingExperienceProps {
  locale: Locale;
  dict: Dictionary;
  initialRates?: Record<string, Record<string, number>>;
  taifEnabled?: boolean;
  riyadhEnabled?: boolean;
}

export type RouteCategoryKey = 'airports' | 'intercity' | 'ziyarat' | 'regional';

export interface RouteItem {
  id: string;
  category: RouteCategoryKey;
  origin: Record<Locale, string>;
  destination: Record<Locale, string>;
  distanceKm: number;
  durationApprox: Record<Locale, string>;
  miqatNotice?: Record<Locale, string>;
}

export const ROUTE_DIRECTORY: RouteItem[] = [
  // 1. Airports
  {
    id: 'jeddah-airport-to-makkah',
    category: 'airports',
    origin: {
      ar: 'مطار الملك عبدالعزيز الدولي (جدة)',
      en: 'King Abdulaziz International Airport (JED)',
      ms: 'Lapangan Terbang Antarabangsa King Abdulaziz (JED)',
      id: 'Bandara Internasional King Abdulaziz (JED)',
      ur: 'شاہ عبدالعزیز بین الاقوامی ہوائی اڈہ (جدہ)',
      fr: 'Aéroport International Roi Abdelaziz (JED)',
      es: 'Aeropuerto Internacional Rey Abdulaziz (JED)',
      de: 'Flughafen König Abd al-Aziz (JED)',
      tr: 'Kral Abdülaziz Uluslararası Havalimanı (JED)',
      hi: 'किंग अब्दुलअज़ीज़ अंतर्राष्ट्रीय हवाई अड्डा (JED)',
    },
    destination: {
      ar: 'فنادق مكة المكرمة (الحرم)',
      en: 'Makkah Hotels (Haram Vicinity)',
      ms: 'Hotel-hotel Makkah (Sekitar Haram)',
      id: 'Hotel Makkah (Kawasan Haram)',
      ur: 'مکہ مکرمہ ہوٹلز (حرم کے قریب)',
      fr: 'Hôtels de La Mecque (Proche Haram)',
      es: 'Hoteles de La Meca (Cerca del Haram)',
      de: 'Hotels in Mekka (Haram-Nähe)',
      tr: 'Mekke Otelleri (Harem Çevresi)',
      hi: 'मक्का होटल (हरम के पास)',
    },
    distanceKm: 95,
    durationApprox: {
      ar: 'حوالي 75 دقيقة',
      en: 'Approx. 75 mins',
      ms: 'Kira-kira 75 minit',
      id: 'Sekitar 75 menit',
      ur: 'تقریباً 75 منٹ',
      fr: 'Env. 75 minutes',
      es: 'Aprox. 75 minutos',
      de: 'Ca. 75 Minuten',
      tr: 'Yaklaşık 75 dakika',
      hi: 'लगभग 75 मिनट',
    },
    miqatNotice: {
      ar: 'استقبال بصالة الوصول بالاسم ومساعدة كاملة في الأمتعة وعبوات زمزم.',
      en: 'Personalized terminal meet & greet with luggage & Zamzam assistance.',
      ms: 'Sambutan nama di balai ketibaan dengan bantuan bagasi dan Zamzam.',
      id: 'Penyambutan nama di terminal kedatangan dengan bantuan bagasi & Zamzam.',
      ur: 'آمد ٹرمینل پر نام کا بورڈ اور سامان و آب زمزم میں مکمل مدد۔',
      fr: 'Accueil nominatif au terminal avec assistance bagages et eau de Zamzam.',
      es: 'Recepción con cartel en terminal y asistencia con equipaje y agua Zamzam.',
      de: 'Persönlicher Empfang am Gate mit Gepäck- und Zamzam-Service.',
      tr: 'Terminalde isim levhası ile karşılama, bagaj ve Zemzem yardımı.',
      hi: 'टर्मिनल पर नाम पट्टिका से स्वागत और सामान व ज़मज़म में सहायता।',
    },
  },
  {
    id: 'makkah-to-jeddah-airport',
    category: 'airports',
    origin: {
      ar: 'فندق مكة المكرمة',
      en: 'Makkah Hotel Lobby',
      ms: 'Lobi Hotel Makkah',
      id: 'Lobi Hotel Makkah',
      ur: 'مکہ ہوٹل لابی',
      fr: 'Hôtel de La Mecque',
      es: 'Hotel en La Meca',
      de: 'Hotel in Mekka',
      tr: 'Mekke Oteli',
      hi: 'मक्का होटल लॉबी',
    },
    destination: {
      ar: 'مطار الملك عبدالعزيز الدولي (جدة)',
      en: 'King Abdulaziz International Airport (JED)',
      ms: 'Lapangan Terbang Antarabangsa King Abdulaziz (JED)',
      id: 'Bandara Internasional King Abdulaziz (JED)',
      ur: 'شاہ عبدالعزیز بین الاقوامی ہوائی اڈہ (جدہ)',
      fr: 'Aéroport International Roi Abdelaziz (JED)',
      es: 'Aeropuerto Internacional Rey Abdulaziz (JED)',
      de: 'Flughafen König Abd al-Aziz (JED)',
      tr: 'Kral Abdülaziz Uluslararası Havalimanı (JED)',
      hi: 'किंग अब्दुलअज़ीज़ अंतर्राष्ट्रीय हवाई अड्डा (JED)',
    },
    distanceKm: 95,
    durationApprox: {
      ar: 'حوالي 75 دقيقة',
      en: 'Approx. 75 mins',
      ms: 'Kira-kira 75 minit',
      id: 'Sekitar 75 menit',
      ur: 'تقریباً 75 منٹ',
      fr: 'Env. 75 minutes',
      es: 'Aprox. 75 minutos',
      de: 'Ca. 75 Minuten',
      tr: 'Yaklaşık 75 dakika',
      hi: 'लगभग 75 मिनट',
    },
    miqatNotice: {
      ar: 'انطلاق مريح من بهو الفندق مع مراعاة مواعيد رحلات الطيران الدولية وشحن زمزم.',
      en: 'Punctual hotel pickup scheduled with ample time for international check-in and Zamzam packing.',
      ms: 'Pengambilan hotel tepat pada masanya dengan masa mencukupi untuk daftar masuk antarabangsa.',
      id: 'Penjemputan tepat waktu dari lobi hotel dengan waktu leluasa untuk check-in penerbangan.',
      ur: 'ہوٹل لابی سے بروقت روانگی اور ایئرپورٹ پر پرواز سے قبل وافر وقت کی یقین دہانی۔',
      fr: 'Prise en charge ponctuelle à l\'hôtel avec marge généreuse pour l\'enregistrement des vols.',
      es: 'Puntual recogida en hotel con margen adecuado para facturación y embarque internacional.',
      de: 'Pünktliche Abholung im Hotel mit ausreichend Puffer für den internationalen Check-in.',
      tr: 'Otel lobisinden zamanında alış ve uluslararası uçuş işlemleri için bol vakit güvencesi.',
      hi: 'होटल से समय पर पिकअप और अंतरराष्ट्रीय चेक-इन के लिए पर्याप्त समय की सुविधा।',
    },
  },
  {
    id: 'madinah-airport-to-hotel',
    category: 'airports',
    origin: {
      ar: 'مطار الأمير محمد بن عبدالعزيز (المدينة)',
      en: 'Prince Mohammad Bin Abdulaziz Airport (MED)',
      ms: 'Lapangan Terbang Putera Mohammad Bin Abdulaziz (MED)',
      id: 'Bandara Pangeran Mohammad Bin Abdulaziz (MED)',
      ur: 'پرنس محمد بن عبدالعزیز ہوائی اڈہ (مدینہ)',
      fr: 'Aéroport Prince Mohammad Bin Abdulaziz (MED)',
      es: 'Aeropuerto Príncipe Mohammad Bin Abdulaziz (MED)',
      de: 'Flughafen Prinz Mohammad Bin Abdulaziz (MED)',
      tr: 'Prens Muhammed Bin Abdülaziz Havalimanı (MED)',
      hi: 'प्रिंस मोहम्मद बिन अब्दुलअज़ीज़ हवाई अड्डा (MED)',
    },
    destination: {
      ar: 'فنادق المدينة المنورة (المنطقة المركزية)',
      en: 'Madinah Hotels (Markaziyah / Haram)',
      ms: 'Hotel-hotel Madinah (Zon Markaziyah)',
      id: 'Hotel Madinah (Kawasan Markaziyah)',
      ur: 'مدینہ منورہ ہوٹلز (مرکزیہ حرم)',
      fr: 'Hôtels de Médine (Zone Markaziyah)',
      es: 'Hoteles de Medina (Zona Markaziyah)',
      de: 'Hotels in Madina (Markaziyah-Bereich)',
      tr: 'Medine Otelleri (Merkeziye Bölgesi)',
      hi: 'मदीना होटल (मरकज़िया क्षेत्र)',
    },
    distanceKm: 25,
    durationApprox: {
      ar: 'حوالي 25 - 30 دقيقة',
      en: 'Approx. 25 - 30 mins',
      ms: 'Kira-kira 25 - 30 minit',
      id: 'Sekitar 25 - 30 menit',
      ur: 'تقریباً 25 تا 30 منٹ',
      fr: 'Env. 25 - 30 minutes',
      es: 'Aprox. 25 - 30 minutos',
      de: 'Ca. 25 - 30 Minuten',
      tr: 'Yaklaşık 25 - 30 dakika',
      hi: 'लगभग 25 - 30 मिनट',
    },
    miqatNotice: {
      ar: 'استقبال هادئ وسلس مع مساعدة كاملة في الأمتعة مباشرة إلى فندقك بجوار الحرم النبوي الشريف.',
      en: 'Serene terminal meet & greet with luggage assistance directly to your hotel next to the Prophet\'s Mosque.',
      ms: 'Sambutan tenang di balai ketibaan dengan bantuan bagasi terus ke hotel berdekatan Masjid Nabawi.',
      id: 'Penyambutan penuh khidmat di terminal kedatangan dengan bantuan bagasi langsung ke hotel dekat Masjid Nabawi.',
      ur: 'ٹرمینل پر شاندار استقبال اور مسجد نبوی کے قریب ہوٹل تک براہ راست پرسکون سفر۔',
      fr: 'Accueil personnalisé au terminal avec transport direct vers votre hôtel proche de la Mosquée du Prophète.',
      es: 'Recepción serena en terminal y traslado directo a su hotel junto a la Mezquita del Profeta.',
      de: 'Ruhiger Empfang am Gate mit direktem Gepäckservice zu Ihrem Hotel an der Prophetenmoschee.',
      tr: 'Terminalde özel karşılama ve Mescid-i Nebevi yanındaki otelinize doğrudan konforlu transfer.',
      hi: 'टर्मिनल पर गरिमामय स्वागत और मस्जिद-ए-नबवी के पास स्थित होटल तक सीधा आरामदायक सफर।',
    },
  },

  // 2. Intercity
  {
    id: 'makkah-to-madinah',
    category: 'intercity',
    origin: {
      ar: 'فندق مكة المكرمة',
      en: 'Makkah Hotel',
      ms: 'Hotel Makkah',
      id: 'Hotel Makkah',
      ur: 'مکہ مکرمہ ہوٹل',
      fr: 'Hôtel de La Mecque',
      es: 'Hotel en La Meca',
      de: 'Hotel in Mekka',
      tr: 'Mekke Oteli',
      hi: 'मक्का होटल',
    },
    destination: {
      ar: 'فندق المدينة المنورة',
      en: 'Madinah Hotel',
      ms: 'Hotel Madinah',
      id: 'Hotel Madinah',
      ur: 'مدینہ منورہ ہوٹل',
      fr: 'Hôtel de Médine',
      es: 'Hotel en Medina',
      de: 'Hotel in Madina',
      tr: 'Medine Oteli',
      hi: 'मदीना होटल',
    },
    distanceKm: 450,
    durationApprox: {
      ar: 'حوالي 4.5 ساعات',
      en: 'Approx. 4.5 hours',
      ms: 'Kira-kira 4.5 jam',
      id: 'Sekitar 4.5 jam',
      ur: 'تقریباً 4.5 گھنٹے',
      fr: 'Env. 4.5 heures',
      es: 'Aprox. 4.5 horas',
      de: 'Ca. 4,5 Stunden',
      tr: 'Yaklaşık 4.5 saat',
      hi: 'लगभग 4.5 घंटे',
    },
    miqatNotice: {
      ar: 'رحلة الحرمين الشريفين المباشرة عبر طريق الهجرة السريع، مع توقفات استراحة وصلاة حسب رغبة الضيف.',
      en: 'Direct highway journey via Hijrah Highway with comfortable stops for refreshments and prayer.',
      ms: 'Perjalanan lebuhraya terus melalui Lebuhraya Hijrah dengan hentian rehat dan solat.',
      id: 'Perjalanan langsung jalan tol Hijrah dengan perhentian istirahat dan shalat sesuai kenyamanan jamaah.',
      ur: 'طریق ہجرہ کے ذریعے مکہ مکرمہ سے مدینہ منورہ کا پرسکون سفر، راستے میں نماز و طعام کے توقفات کے ساتھ۔',
      fr: 'Voyage autoroutier direct par la route de l\'Hégire avec pauses confort et prières modulables.',
      es: 'Viaje directo por la autopista de la Hégira con paradas de descanso y oración a su conveniencia.',
      de: 'Direkte Fahrt über die Hidschra-Autobahn mit flexiblen Pausen für Erfrischungen und Gebete.',
      tr: 'Hicret Otoyolu üzerinden namaz ve dinlenme molaları eşliğinde doğrudan VIP seyahat.',
      hi: 'हिजरत हाईवे से सीधा आरामदायक सफर, प्रार्थना और विश्राम के लिए सुविधाजनक पड़ावों के साथ।',
    },
  },
  {
    id: 'madinah-to-makkah',
    category: 'intercity',
    origin: {
      ar: 'فندق المدينة المنورة',
      en: 'Madinah Hotel',
      ms: 'Hotel Madinah',
      id: 'Hotel Madinah',
      ur: 'مدینہ منورہ ہوٹل',
      fr: 'Hôtel de Médine',
      es: 'Hotel en Medina',
      de: 'Hotel in Madina',
      tr: 'Medine Oteli',
      hi: 'मदीना होटल',
    },
    destination: {
      ar: 'فندق مكة المكرمة',
      en: 'Makkah Hotel',
      ms: 'Hotel Makkah',
      id: 'Hotel Makkah',
      ur: 'مکہ مکرمہ ہوٹل',
      fr: 'Hôtel de La Mecque',
      es: 'Hotel en La Meca',
      de: 'Hotel in Mekka',
      tr: 'Mekke Oteli',
      hi: 'मक्का होटल',
    },
    distanceKm: 450,
    durationApprox: {
      ar: 'حوالي 4.5 ساعات',
      en: 'Approx. 4.5 hours',
      ms: 'Kira-kira 4.5 jam',
      id: 'Sekitar 4.5 jam',
      ur: 'تقریباً 4.5 گھنٹے',
      fr: 'Env. 4.5 heures',
      es: 'Aprox. 4.5 horas',
      de: 'Ca. 4,5 Stunden',
      tr: 'Yaklaşık 4.5 saat',
      hi: 'लगभग 4.5 घंटे',
    },
    miqatNotice: {
      ar: 'التوقف المؤكد عند ميقات ذي الحليفة (مسجد الشجرة) للإحرام وصلاة ركعتي الإحرام مشمول دون أي رسوم إضافية.',
      en: 'Guaranteed complimentary stop at Miqat Dhu al-Hulayfah (Masjid ash-Shajarah) for Ihram & prayer.',
      ms: 'Hentian Miqat Dzulhulaifah (Masjid Syajarah) untuk niat ihram dan solat sunat tanpa bayaran tambahan.',
      id: 'Perhentian resmi di Miqat Dzulhulaifah (Masjid asy-Syajarah) untuk niat ihram dan shalat sunnah tanpa biaya tambahan.',
      ur: 'میقات ذوالحلیفہ (مسجد شجرہ) پر احرام باندھنے اور نماز ادا کرنے کے لیے مفت توقف شامل ہے۔',
      fr: 'Arrêt garanti au Miqat Dhou al-Hulayfah (Masjid ash-Shajarah) pour l\'Ihram et la prière sans supplément.',
      es: 'Parada garantizada en el Miqat Dhu al-Hulayfah para vestir el Ihram y rezar sin coste adicional.',
      de: 'Garantierter Halt am Miqat Dhu al-Hulayfah (Masjid ash-Shajarah) für Ihram und Gebet inklusive.',
      tr: 'Zülhuleyfe Mikat noktasında (Şecere Mescidi) ihram ve namaz için ücretsiz bekleme dahildir.',
      hi: 'मीक़ात ज़ुल-हुलेफ़ा (मस्जिद-ए-शजरा) पर एहराम और नमाज़ के लिए निःशुल्क पड़ाव शामिल है।',
    },
  },
  {
    id: 'jeddah-to-madinah',
    category: 'intercity',
    origin: {
      ar: 'مطار الملك عبدالعزيز أو فنادق جدة',
      en: 'Jeddah Airport (JED) or Hotel',
      ms: 'Lapangan Terbang atau Hotel Jeddah',
      id: 'Bandara atau Hotel Jeddah',
      ur: 'جدہ ایئرپورٹ یا ہوٹل',
      fr: 'Aéroport de Djeddah (JED) ou Hôtel',
      es: 'Aeropuerto o Hotel en Yeda',
      de: 'Flughafen Dschidda (JED) oder Hotel',
      tr: 'Cidde Havalimanı veya Oteli',
      hi: 'जेद्दा हवाई अड्डा या होटल',
    },
    destination: {
      ar: 'فنادق المدينة المنورة',
      en: 'Madinah Hotel',
      ms: 'Hotel Madinah',
      id: 'Hotel Madinah',
      ur: 'مدینہ منورہ ہوٹل',
      fr: 'Hôtel de Médine',
      es: 'Hotel en Medina',
      de: 'Hotel in Madina',
      tr: 'Medine Oteli',
      hi: 'मदीना होटल',
    },
    distanceKm: 410,
    durationApprox: {
      ar: 'حوالي 4 ساعات',
      en: 'Approx. 4 hours',
      ms: 'Kira-kira 4 jam',
      id: 'Sekitar 4 jam',
      ur: 'تقریباً 4 گھنٹے',
      fr: 'Env. 4 heures',
      es: 'Aprox. 4 horas',
      de: 'Ca. 4 Stunden',
      tr: 'Yaklaşık 4 saat',
      hi: 'लगभग 4 घंटे',
    },
    miqatNotice: {
      ar: 'نقل سريع ومريح عبر الطريق السريع المباشر إلى المدينة المنورة.',
      en: 'Direct highway transfer connecting Jeddah and Madinah with supreme comfort.',
      ms: 'Perjalanan lebuhraya terus dari Jeddah ke Madinah dengan keselesaan tinggi.',
      id: 'Perjalanan langsung jalan tol menghubungkan Jeddah dan Madinah dengan nyaman.',
      ur: 'جدہ سے مدینہ منورہ تک براہ راست ہائی وے سفر انتہائی آرام کے ساتھ۔',
      fr: 'Transfert direct par autoroute reliant Djeddah à Médine dans un confort royal.',
      es: 'Traslado directo por autopista entre Yeda y Medina con máximo confort.',
      de: 'Direkte Autobahnfahrt von Dschidda nach Madina mit höchstem Komfort.',
      tr: 'Cidde ile Medine arasında doğrudan otoyol üzerinden üstün konforlu transfer.',
      hi: 'जेद्दा से मदीना तक सीधी हाईवे यात्रा संपूर्ण आराम के साथ।',
    },
  },

  // 3. Sacred Ziyarat
  {
    id: 'makkah-ziyarat',
    category: 'ziyarat',
    origin: {
      ar: 'فندق مكة المكرمة (انطلاق)',
      en: 'Makkah Hotel Pickup',
      ms: 'Pengambilan Hotel Makkah',
      id: 'Penjemputan Hotel Makkah',
      ur: 'مکہ ہوٹل سے روانگی',
      fr: 'Prise en charge à l\'hôtel de La Mecque',
      es: 'Recogida en Hotel de La Meca',
      de: 'Abholung am Hotel in Mekka',
      tr: 'Mekke Otelinden Alınış',
      hi: 'मक्का होटल से पिकअप',
    },
    destination: {
      ar: 'المشاعر وجبل النور وغار حراء وثور وعرفات',
      en: 'Holy Sites, Jabal al-Noor, Hira, Thawr & Arafat',
      ms: 'Masyair, Jabal Nur, Gua Hira, Tsur & Arafah',
      id: 'Masyair, Jabal Nur, Gua Hira, Tsur & Arafah',
      ur: 'مشاعر مقدسہ، جبل النور، غار حراء، ثور و عرفات',
      fr: 'Lieux Saints, Jabal al-Noor, Hira, Thawr et Arafat',
      es: 'Lugares Santos, Jabal al-Noor, Hira, Thawr y Arafat',
      de: 'Heilige Stätten, Jabal al-Nur, Hira, Thawr & Arafat',
      tr: 'Kutsal Mekanlar, Nur Dağı, Hira, Sevr ve Arafat',
      hi: 'पवित्र स्थल, जबल अल-नूर, हिरा, सौर और अराफात',
    },
    distanceKm: 70,
    durationApprox: {
      ar: 'المدة المعتمدة: 2.5 ساعة',
      en: 'Approved Duration: 2.5 Hours',
      ms: 'Tempoh Diluluskan: 2.5 Jam',
      id: 'Durasi Resmi: 2.5 Jam',
      ur: 'منظور شدہ دورانیہ: 2.5 گھنٹے',
      fr: 'Durée approuvée: 2.5 Heures',
      es: 'Duración aprobada: 2.5 Horas',
      de: 'Genehmigte Dauer: 2,5 Stunden',
      tr: 'Onaylanan Süre: 2.5 Saat',
      hi: 'मान्य अवधि: 2.5 घंटे',
    },
    miqatNotice: {
      ar: 'جولة خاصة معتمدة (2.5 ساعة) تشمل جبل ثور، عرفات، جبل الرحمة، مزدلفة، منى، وجبل النور وحي حراء الثقافي.',
      en: 'Approved 2.5-hour private tour covering Mount Thawr, Arafat, Jabal ar-Rahmah, Muzdalifah, Mina, and Mount Noor / Hira District.',
      ms: 'Lawatan persendirian diluluskan 2.5 jam merangkumi Jabal Tsur, Arafah, Jabal Rahmah, Muzdalifah, Mina, dan Jabal Nur / Hira.',
      id: 'Tur privat resmi 2.5 jam mencakup Jabal Tsur, Arafah, Jabal Rahmah, Muzdalifah, Mina, dan Jabal Nur / Hira.',
      ur: 'منظور شدہ 2.5 گھنٹے کا نجی ٹور: جبل ثور، عرفات، جبل الرحمہ، مزدلفہ، منیٰ، جبل النور اور حراء کلچرل ڈسٹرکٹ۔',
      fr: 'Visite privée approuvée de 2.5 heures: Mont Thawr, Arafat, Mont Rahmah, Muzdalifah, Mina, et Mont Noor / Hira.',
      es: 'Tour privado aprobado de 2.5 horas que cubre Monte Thawr, Arafat, Monte Rahmah, Muzdalifah, Mina y Monte Noor / Hira.',
      de: 'Offizielle 2,5-stündige Tour: Berg Thawr, Arafat, Berg Rahmah, Muzdalifah, Mina und Berg Nur / Hira-Viertel.',
      tr: 'Sevr Dağı, Arafat, Rahmet Dağı, Müzdelife, Mina ve Nur Dağı / Hira Kültür Bölgesini kapsayan onaylı 2.5 saatlik özel tur.',
      hi: 'अनुमोदित 2.5 घंटे का निजी दौरा: जबल सौर, अराफात, जबल-ए-रहमत, मुजदलिफा, मिना और जबल-ए-नूर / हिरा सांस्कृतिक क्षेत्र।',
    },
  },
  {
    id: 'madinah-ziyarat',
    category: 'ziyarat',
    origin: {
      ar: 'فندق المدينة المنورة (انطلاق)',
      en: 'Madinah Hotel Pickup',
      ms: 'Pengambilan Hotel Madinah',
      id: 'Penjemputan Hotel Madinah',
      ur: 'مدینہ ہوٹل سے روانگی',
      fr: 'Prise en charge à l\'hôtel de Médine',
      es: 'Recogida en Hotel de Medina',
      de: 'Abholung am Hotel in Madina',
      tr: 'Medine Otelinden Alınış',
      hi: 'मदीना होटल से पिकअप',
    },
    destination: {
      ar: 'مسجد قباء، جبل أحد، الشهداء، القبلتين، المساجد السبعة',
      en: 'Masjid Quba, Mount Uhud, Martyrs, Qiblatayn & Seven Mosques',
      ms: 'Masjid Quba, Gunung Uhud, Syuhada, Qiblatain & Tujuh Masjid',
      id: 'Masjid Quba, Gunung Uhud, Syuhada Uhud, Qiblatain & Masjid Tujuh',
      ur: 'مسجد قباء، جبل احد، شہداء احد، قبلتین اور مساجد سبعہ',
      fr: 'Mosquée Quba, Mont Uhud, Martyrs, Qiblatayn et Sept Mosquées',
      es: 'Mezquita Quba, Monte Uhud, Mártires, Qiblatayn y Siete Mezquitas',
      de: 'Quba-Moschee, Berg Uhud, Märtyrer, Qiblatayn & Sieben Moscheen',
      tr: 'Kuba Mescidi, Uhud Dağı, Şehitlik, Kıbleteyn ve Yedi Mescitler',
      hi: 'मस्जिद क़ुबा, जबल उहुद, शोहदा, क़िबलतैन और सात मस्जिदें',
    },
    distanceKm: 40,
    durationApprox: {
      ar: 'جولة نبوية برحابة وسكينة',
      en: 'Unhurried Sacred Sites Tour',
      ms: 'Lawatan Ziarah Nabawi yang Tenang',
      id: 'Tur Ziarah Nabawi Penuh Khidmat',
      ur: 'پرسکون زیارات نبوی ٹور',
      fr: 'Visite sereine des sanctuaires prophétiques',
      es: 'Visita sosegada a los lugares santos',
      de: 'Besinnliche Tour zu den prophetischen Stätten',
      tr: 'Huzurlu ve esnek Nebevi ziyaret turu',
      hi: 'शांतिपूर्ण व सुगम ज़ियारत टूर',
    },
    miqatNotice: {
      ar: 'رحلة مقدسة خاصة بالسيارة بسعر ثابت، مع وقت كافٍ للصلاة في قباء والسلام على شهداء أحد دون استعجال.',
      en: 'Private pilgrimage tour with generous wait time for prayer at Masjid Quba and visiting the Uhud martyrs.',
      ms: 'Lawatan peribadi dengan masa menunggu yang luas untuk solat di Masjid Quba dan menziarahi syuhada Uhud.',
      id: 'Tur ziarah privat dengan waktu luang untuk shalat di Masjid Quba dan menyapa syuhada Uhud tanpa terburu-buru.',
      ur: 'مسجد قباء میں نماز اور شہدائے احد پر سلام کے لیے مکمل وقت کے ساتھ پرسکون نجی گاڑی کی سہولت۔',
      fr: 'Circuit privé avec temps d\'attente généreux pour la prière à la mosquée Quba et la visite des martyrs d\'Uhud.',
      es: 'Recorrido privado con tiempo suficiente para orar en la Mezquita de Quba y visitar a los mártires de Uhud.',
      de: 'Private Ziyarat-Fahrt mit ausreichend Zeit zum Gebet in der Quba-Moschee und Besuch der Uhud-Märtyrer.',
      tr: 'Kuba Mescidi\'nde namaz kılmak ve Uhud şehitlerini ziyaret etmek için bol bekleme süreli özel tur.',
      hi: 'मस्जिद क़ुबा में नमाज़ और उहुद के शहीदों की ज़ियारत के लिए पर्याप्त समय के साथ निजी वाहन यात्रा।',
    },
  },

  // 4. Regional
  {
    id: 'makkah-to-taif',
    category: 'regional',
    origin: {
      ar: 'فندق مكة المكرمة',
      en: 'Makkah Hotel',
      ms: 'Hotel Makkah',
      id: 'Hotel Makkah',
      ur: 'مکہ ہوٹل',
      fr: 'Hôtel La Mecque',
      es: 'Hotel La Meca',
      de: 'Hotel Mekka',
      tr: 'Mekke Oteli',
      hi: 'मक्का होटल',
    },
    destination: {
      ar: 'مدينة الطائف والهدا ومزارع الورد',
      en: 'Taif City, Al Hada & Rose Farms',
      ms: 'Bandar Taif, Al Hada & Ladang Mawar',
      id: 'Kota Taif, Al Hada & Kebun Mawar',
      ur: 'طائف شہر، الہدا و گلاب کے باغات',
      fr: 'Ville de Taïf, Al Hada et Champs de Roses',
      es: 'Ciudad de Taif, Al Hada y Granjas de Rosas',
      de: 'Taif, Al Hada & Rosenfarmen',
      tr: 'Taif Şehri, Al Hada ve Gül Çiftlikleri',
      hi: 'ताइफ़ शहर, अल हदा और गुलाब के बाग',
    },
    distanceKm: 90,
    durationApprox: {
      ar: 'حوالي 75 دقيقة',
      en: 'Approx. 75 mins',
      ms: 'Kira-kira 75 minit',
      id: 'Sekitar 75 menit',
      ur: 'تقریباً 75 منٹ',
      fr: 'Env. 75 minutes',
      es: 'Aprox. 75 minutos',
      de: 'Ca. 75 Minuten',
      tr: 'Yaklaşık 75 dakika',
      hi: 'लगभग 75 मिनट',
    },
    miqatNotice: {
      ar: 'رحلة جبلية خلابة عبر عقبة الهدا مع سيارات حديثة وسائقين خبراء بالمسارات الجبلية.',
      en: 'Scenic mountain ascent via Al Hada road with experienced mountain chauffeurs.',
      ms: 'Perjalanan mendaki gunung yang indah melalui laluan Al Hada bersama pemandu berpengalaman.',
      id: 'Perjalanan menembus pegunungan indah via Al Hada dengan sopir berpengalaman.',
      ur: 'الہدا کی خوبصورت پہاڑی شاہراہ سے طائف کا خوشگوار اور محفوظ سفر۔',
      fr: 'Ascension panoramique par la route d\'Al Hada avec des chauffeurs chevronnés.',
      es: 'Ascenso montañoso panorámico por la ruta Al Hada con chóferes de alta experiencia.',
      de: 'Spektakuläre Bergfahrt über den Al-Hada-Pass mit erfahrenen Chauffeuren.',
      tr: 'Al Hada dağ yolu üzerinden tecrübeli şoförlerle güvenli ve panoramik seyahat.',
      hi: 'अल हदा के मनोरम पर्वतीय मार्ग से ताइफ़ की सुरक्षित एवं सुरम्य यात्रा।',
    },
  },
  {
    id: 'jeddah-to-taif',
    category: 'regional',
    origin: {
      ar: 'جدة (المطار أو الفندق)',
      en: 'Jeddah Airport or Hotel',
      ms: 'Lapangan Terbang atau Hotel Jeddah',
      id: 'Bandara atau Hotel Jeddah',
      ur: 'جدہ ایئرپورٹ یا ہوٹل',
      fr: 'Aéroport ou Hôtel de Djeddah',
      es: 'Aeropuerto o Hotel de Yeda',
      de: 'Flughafen oder Hotel Dschidda',
      tr: 'Cidde Havalimanı veya Oteli',
      hi: 'जेद्दा हवाई अड्डा या होटल',
    },
    destination: {
      ar: 'مدينة الطائف والهدا',
      en: 'Taif City & Al Hada',
      ms: 'Bandar Taif & Al Hada',
      id: 'Kota Taif & Al Hada',
      ur: 'طائف شہر و الہدا',
      fr: 'Ville de Taïf et Al Hada',
      es: 'Ciudad de Taif y Al Hada',
      de: 'Taif & Al Hada',
      tr: 'Taif Şehri ve Al Hada',
      hi: 'ताइफ़ शहर व अल हदा',
    },
    distanceKm: 170,
    durationApprox: {
      ar: 'حوالي ساعتين',
      en: 'Approx. 2 hours',
      ms: 'Kira-kira 2 jam',
      id: 'Sekitar 2 jam',
      ur: 'تقریباً 2 گھنٹے',
      fr: 'Env. 2 heures',
      es: 'Aprox. 2 horas',
      de: 'Ca. 2 Stunden',
      tr: 'Yaklaşık 2 saat',
      hi: 'लगभग 2 घंटे',
    },
    miqatNotice: {
      ar: 'توصيل مباشر من جدة إلى عروس المصائف الطائف مع راحة مطلقة.',
      en: 'Direct intercity transit from Jeddah to the mountain retreat of Taif in pristine comfort.',
      ms: 'Pengangkutan terus dari Jeddah ke percutian pergunungan Taif dengan keselesaan murni.',
      id: 'Perjalanan langsung dari Jeddah ke kawasan sejuk pegunungan Taif dengan armada VIP.',
      ur: 'جدہ سے طائف تک براہ راست کشادہ لگژری گاڑی میں پُرسکون سفر۔',
      fr: 'Liaison directe depuis Djeddah vers les hauteurs fraîches de Taïf.',
      es: 'Conexión directa entre Yeda y el retiro montañoso de Taif con máximo confort.',
      de: 'Direkttransfer von Dschidda in das Bergresort Taif in luxuriösen Fahrzeugen.',
      tr: 'Cidde\'den dağ kenti Taif\'e doğrudan, lüks ve konforlu VIP ulaşım.',
      hi: 'जेद्दा से ताइफ़ के सुरम्य पर्वतीय स्थल तक सीधी प्रीमियम वीआईपी यात्रा।',
    },
  },
  {
    id: 'riyadh-to-makkah',
    category: 'regional',
    origin: {
      ar: 'فنادق أو مطار الرياض',
      en: 'Riyadh Hotel or Airport',
      ms: 'Hotel atau Lapangan Terbang Riyadh',
      id: 'Hotel atau Bandara Riyadh',
      ur: 'ریاض ہوٹل یا ایئرپورٹ',
      fr: 'Hôtel ou Aéroport de Riyad',
      es: 'Hotel o Aeropuerto de Riad',
      de: 'Hotel oder Flughafen Riad',
      tr: 'Riyad Oteli veya Havalimanı',
      hi: 'रियाद होटल या हवाई अड्डा',
    },
    destination: {
      ar: 'فنادق مكة المكرمة (الحرم)',
      en: 'Makkah Hotels (Haram)',
      ms: 'Hotel Makkah (Haram)',
      id: 'Hotel Makkah (Haram)',
      ur: 'مکہ ہوٹلز (حرم)',
      fr: 'Hôtels de La Mecque (Haram)',
      es: 'Hoteles de La Meca (Haram)',
      de: 'Hotels in Mekka (Haram)',
      tr: 'Mekke Otelleri (Harem)',
      hi: 'मक्का होटल (हरम)',
    },
    distanceKm: 870,
    durationApprox: {
      ar: 'حوالي 9 ساعات (طريق سريع)',
      en: 'Approx. 9 hours (Highway)',
      ms: 'Kira-kira 9 jam (Lebuhraya)',
      id: 'Sekitar 9 jam (Jalan Tol)',
      ur: 'تقریباً 9 گھنٹے (ہائی وے)',
      fr: 'Env. 9 heures (Autoroute)',
      es: 'Aprox. 9 horas (Autopista)',
      de: 'Ca. 9 Stunden (Fernstraße)',
      tr: 'Yaklaşık 9 saat (Otoyol)',
      hi: 'लगभग 9 घंटे (हाईवे)',
    },
    miqatNotice: {
      ar: 'خدمة نقل خاصة بين العاصمة الرياض ومكة المكرمة بسيارات حديثة ومجهزة للمسافات الطويلة.',
      en: 'VIP intercity executive highway transport between Riyadh and Makkah.',
      ms: 'Pengangkutan eksekutif VIP antara Riyadh dan Makkah dengan kenderaan jarak jauh.',
      id: 'Transportasi eksekutif VIP antara Riyadh dan Makkah dengan kenyamanan maksimal.',
      ur: 'ریاض اور مکہ مکرمہ کے درمیان طویل مسافت کے لیے آرام دہ ایگزیکٹو گاڑی۔',
      fr: 'Transport autoroutier exécutif VIP entre Riyad et La Mecque avec grand confort.',
      es: 'Transporte ejecutivo VIP por autopista entre Riad y La Meca con máximo confort.',
      de: 'VIP-Fernreise zwischen Riad und Mekka in Langstrecken-Komfortlimousinen.',
      tr: 'Riyad ile Mekke arasında uzun mesafe için donanımlı VIP transfer.',
      hi: 'रियाद और मक्का के बीच लंबी दूरी की यात्रा के लिए सुसज्जित वीआईपी वाहन।',
    },
  },
  {
    id: 'riyadh-to-madinah',
    category: 'regional',
    origin: {
      ar: 'فنادق أو مطار الرياض',
      en: 'Riyadh Hotel or Airport',
      ms: 'Hotel atau Lapangan Terbang Riyadh',
      id: 'Hotel atau Bandara Riyadh',
      ur: 'ریاض ہوٹل یا ایئرپورٹ',
      fr: 'Hôtel ou Aéroport de Riyad',
      es: 'Hotel o Aeropuerto de Riad',
      de: 'Hotel oder Flughafen Riad',
      tr: 'Riyad Oteli veya Havalimanı',
      hi: 'रियाद होटल या हवाई अड्डा',
    },
    destination: {
      ar: 'فنادق المدينة المنورة (الحرم النبوي)',
      en: 'Madinah Hotels (Prophet\'s Mosque)',
      ms: 'Hotel Madinah (Masjid Nabawi)',
      id: 'Hotel Madinah (Masjid Nabawi)',
      ur: 'مدینہ ہوٹلز (مسجد نبوی)',
      fr: 'Hôtels de Médine (Masjid Nabawi)',
      es: 'Hoteles de Medina (Masjid Nabawi)',
      de: 'Hotels in Madina (Prophetenmoschee)',
      tr: 'Medine Otelleri (Mescid-i Nebevi)',
      hi: 'मदीना होटल (मस्जिद-ए-नबवी)',
    },
    distanceKm: 840,
    durationApprox: {
      ar: 'حوالي 8.5 ساعات (طريق سريع)',
      en: 'Approx. 8.5 hours (Highway)',
      ms: 'Kira-kira 8.5 jam (Lebuhraya)',
      id: 'Sekitar 8.5 jam (Jalan Tol)',
      ur: 'تقریباً 8.5 گھنٹے (ہائی وے)',
      fr: 'Env. 8.5 heures (Autoroute)',
      es: 'Aprox. 8.5 horas (Autopista)',
      de: 'Ca. 8,5 Stunden (Fernstraße)',
      tr: 'Yaklaşık 8.5 saat (Otoyol)',
      hi: 'लगभग 8.5 घंटे (हाईवे)',
    },
    miqatNotice: {
      ar: 'خدمة نقل خاصة ومريحة بين الرياض والمدينة المنورة مع سائق محترف وتوقفات استراحة حسب الطلب.',
      en: 'Direct highway transport connecting Riyadh and Madinah with flexible rest stops.',
      ms: 'Pengangkutan lebuhraya terus antara Riyadh dan Madinah dengan hentian rehat fleksibel.',
      id: 'Transportasi langsung jalan tol antara Riyadh dan Madinah dengan perhentian istirahat fleksibel.',
      ur: 'ریاض اور مدینہ منورہ کے درمیان مرضی کے مطابق توقفات کے ساتھ براہ راست سفر۔',
      fr: 'Transport direct par autoroute reliant Riyad à Médine avec arrêts modulables.',
      es: 'Transporte directo por autopista entre Riad y Medina con paradas de descanso a petición.',
      de: 'Direkte Fernfahrt zwischen Riad und Madina mit flexiblen Rastmöglichkeiten.',
      tr: 'Riyad ile Medine arasında isteğe bağlı dinlenme molalı doğrudan VIP transfer.',
      hi: 'रियाद और मदीना के बीच इच्छानुसार विश्राम पड़ावों के साथ सीधी हाईवे यात्रा।',
    },
  },
];

export interface VehicleCardSpec {
  id: string;
  name: Record<Locale, string>;
  category: Record<Locale, string>;
  passengers: number;
  luggage: number;
  image: string;
  badge?: Record<Locale, string>;
  features: Record<Locale, string[]>;
}

export const FLEET_SPECS: VehicleCardSpec[] = [
  {
    id: 'camry',
    name: {
      ar: 'تويوتا كامري التنفيذية',
      en: 'Toyota Camry Executive',
      ms: 'Toyota Camry Eksekutif',
      id: 'Toyota Camry Eksekutif',
      ur: 'ٹویوٹا کیمری ایگزیکٹو',
      fr: 'Toyota Camry Executive',
      es: 'Toyota Camry Executive',
      de: 'Toyota Camry Executive',
      tr: 'Toyota Camry Executive',
      hi: 'टोयोटा कैमरी एक्जीक्यूटिव',
    },
    category: {
      ar: 'سيدان تنفيذي فاخر',
      en: 'Executive Luxury Sedan',
      ms: 'Sedan Eksekutif Mewah',
      id: 'Sedan Eksekutif Mewah',
      ur: 'ایگزیکٹو لگژری سیڈان',
      fr: 'Berline de Luxe Exécutive',
      es: 'Sedán Ejecutivo de Lujo',
      de: 'Exklusive Luxuslimousine',
      tr: 'Yönetici Lüks Sedan',
      hi: 'कार्यकारी लक्जरी सेडान',
    },
    passengers: 4,
    luggage: 3,
    image: '/assets/images/vehicles/toyota-camry/exterior-studio.webp',
    badge: {
      ar: 'الخيار الاقتصادي الفاخر',
      en: 'Best Value for Couples & Solo',
      ms: 'Pilihan Terbaik Pasangan & Solo',
      id: 'Pilihan Terbaik Pasangan & Solo',
      ur: 'جوڑوں اور انفرادی مسافروں کے لیے بہترین',
      fr: 'Idéal Couples & Voyageurs Solo',
      es: 'Ideal Parejas y Solos',
      de: 'Ideal für Paare & Alleinreisende',
      tr: 'Çiftler ve Bireysel Yolcular İçin İdeal',
      hi: 'जोड़ों व एकल यात्रियों हेतु श्रेष्ठ',
    },
    features: {
      ar: ['تكييف فندقي فائق', 'سائق محترف خبير بالطرق', 'مياه زمزم مبردة مجاناً'],
      en: ['Dual-Zone Climate Control', 'Professional Route Chauffeur', 'Complimentary Chilled Zamzam'],
      ms: ['Penghawa Dingin Berkembar', 'Pemandu Rute Profesional', 'Air Zamzam Sejuk Percuma'],
      id: ['AC Ganda Super Dingin', 'Sopir Rute Profesional', 'Air Zamzam Dingin Gratis'],
      ur: ['ڈوئل زون طاقتور ایئر کنڈیشننگ', 'راستوں کے ماہر پیشہ ور ڈرائیور', 'ٹھنڈا آب زمزم مفت دستیاب'],
      fr: ['Climatisation bi-zone puissante', 'Chauffeur d\'itinéraire expert', 'Eau de Zamzam fraîche offerte'],
      es: ['Climatizador bizona potente', 'Chófer profesional de ruta', 'Agua Zamzam fría de cortesía'],
      de: ['Zwei-Zonen-Klimaautomatik', 'Erfahrener Routen-Chauffeur', 'Gratis gekühltes Zamzam-Wasser'],
      tr: ['Çift Bölgeli Güçlü Klima', 'Deneyimli Güzergah Şoförü', 'Ücretsiz Soğuk Zemzem Suyu'],
      hi: ['शक्तिशाली डुअल-ज़ोन एसी', 'मार्गों के अनुभवी पेशेवर चालक', 'मुफ्त शीतल ज़मज़म जल'],
    },
  },
  {
    id: 'staria',
    name: {
      ar: 'هيونداي ستاريا VIP',
      en: 'Hyundai Staria VIP',
      ms: 'Hyundai Staria VIP',
      id: 'Hyundai Staria VIP',
      ur: 'ہنڈائی اسٹاریا VIP',
      fr: 'Hyundai Staria VIP',
      es: 'Hyundai Staria VIP',
      de: 'Hyundai Staria VIP',
      tr: 'Hyundai Staria VIP',
      hi: 'हुंडई स्टारिया वीआईपी',
    },
    category: {
      ar: 'فان عائلي فاخر بمقاعد كابتن',
      en: 'Luxury Family MPV (Captain Chairs)',
      ms: 'MPV Keluarga Mewah (Kerusi Kapten)',
      id: 'MPV Keluarga Mewah (Kursi Kapten)',
      ur: 'لگژری فیملی ایم پی وی (کیپٹن سیٹس)',
      fr: 'Monospace Familial Luxe (Sièges Capitaine)',
      es: 'Monovolumen Familiar VIP (Asientos Capitán)',
      de: 'Familien-Großraumlimousine VIP',
      tr: 'Lüks Aile Minibüsü (Kaptan Koltukları)',
      hi: 'लक्जरी पारिवारिक वैन (कैप्टन सीट्स)',
    },
    passengers: 7,
    luggage: 6,
    image: '/assets/images/vehicles/hyundai-staria/exterior-studio.webp',
    badge: {
      ar: 'الأكثر طلباً للعائلات',
      en: 'Most Popular for Families',
      ms: 'Paling Popular untuk Keluarga',
      id: 'Paling Populer untuk Keluarga',
      ur: 'خاندانوں کا پسندیدہ ترین انتخاب',
      fr: 'Le Plus Populaire pour Familles',
      es: 'El Más Solicitado por Familias',
      de: 'Sehr beliebt bei Familien',
      tr: 'Ailelerin En Çok Tercih Ettiği',
      hi: 'परिवारों की पहली पसंद',
    },
    features: {
      ar: ['مقاعد كابتن فردية جلدية', 'أبواب كهربائية ومساحة رحبة', 'تكييف مركزي لكافة الصفوف'],
      en: ['Luxury Captain Reclining Chairs', 'Power Sliding Doors & Spacious Aisles', 'Tri-Zone Panoramic Climate Control'],
      ms: ['Kerusi Kapten Kulit Mewah', 'Pintu Gelangsar Berkuasa & Ruang Luas', 'Penghawa Dingin Tiga Zon'],
      id: ['Kursi Kapten Kulit Mewah', 'Pintu Geser Elektrik & Kabin Lapang', 'AC Tiga Zona Sangat Sejuk'],
      ur: ['لگژری کیپٹن سیٹس', 'آٹو پاور سلائیڈنگ ڈورز اور وسیع جگہ', 'ہر نشست کے لیے الگ اے سی وینٹس'],
      fr: ['Sièges Capitaine inclinables en cuir', 'Portes coulissantes électriques spacieuses', 'Climatisation tri-zone panoramique'],
      es: ['Asientos Capitán reclinables de cuero', 'Puertas corredizas eléctricas amplias', 'Climatización trizona panorámica'],
      de: ['Exklusive Leder-Einzelsitze (Kapitänssitze)', 'Elektrische Schiebetüren & viel Beinfreiheit', 'Drei-Zonen-Klimaautomatik'],
      tr: ['Lüks Deri Kaptan Koltuklar', 'Otomatik Kayan Kapılar ve Ferah Kabin', 'Üç Bölgeli Panoramik Klima'],
      hi: ['आलीशान लेदर कैप्टन सीटें', 'ऑटो स्लाइडिंग दरवाजे व विशाल केबिन', 'प्रत्येक पंक्ति हेतु शक्तिशाली एसी'],
    },
  },
  {
    id: 'yukon',
    name: {
      ar: 'جي إم سي يوكون XL الملكي',
      en: 'GMC Yukon XL VIP',
      ms: 'GMC Yukon XL VIP',
      id: 'GMC Yukon XL VIP',
      ur: 'جی ایم سی یوکون XL رائل',
      fr: 'GMC Yukon XL VIP',
      es: 'GMC Yukon XL VIP',
      de: 'GMC Yukon XL VIP',
      tr: 'GMC Yukon XL VIP',
      hi: 'जीएमसी युकोन एक्सएल वीआईपी',
    },
    category: {
      ar: 'دفع رباعي ملكي فاخر',
      en: 'Full-Size Presidential SUV',
      ms: 'SUV Presiden Saiz Penuh',
      id: 'SUV Kepresidenan Ukuran Penuh',
      ur: 'صدارتی فل سائز لگژری ایس یو وی',
      fr: 'SUV Présidentiel Pleine Grandeur',
      es: 'SUV Presidencial de Gran Tamaño',
      de: 'Repräsentativer Luxus-SUV (Langversion)',
      tr: 'Başkanlık Sınıfı Lüks SUV',
      hi: 'शाही पूर्ण आकार लक्जरी एसयूवी',
    },
    passengers: 7,
    luggage: 8,
    image: '/assets/images/vehicles/gmc-yukon-xl/exterior-studio.webp',
    badge: {
      ar: 'فخامة ملكية لكبار الشخصيات',
      en: 'Royal Luxury & Maximum Comfort',
      ms: 'Kemewahan Diraja & Keselesaan Maksimum',
      id: 'Kemewahan Kerajaan & Kenyamanan Tertinggi',
      ur: 'شاہی وقار اور بے مثال آرام',
      fr: 'Luxe Royal & Confort Suprême',
      es: 'Lujo Real y Máximo Confort',
      de: 'Königlicher Luxus & Höchster Komfort',
      tr: 'Kraliyet Lüksü ve Üst Düzey Konfor',
      hi: 'शाही गरिमा एवं सर्वोच्च आराम',
    },
    features: {
      ar: ['عزل صوتي فندقي كامل', 'صندوق أمتعة فائق الاتساع (8 حقائب)', 'ثلاجة مقصورة مدمجة'],
      en: ['Acoustic Laminated Ultra-Quiet Cabin', 'Massive Extended Trunk (8 Suitcases)', 'Integrated Console Refrigerator'],
      ms: ['Kabin Penebat Bunyi Tahap Hotel', 'Ruang Bagasi Sangat Luas (8 Beg)', 'Peti Sejuk Konsol Bersepadu'],
      id: ['Kabin Kedap Suara Super Senyap', 'Bagasi Ekstra Luas (8 Koper Besar)', 'Kulkas Konsol Terintegrasi'],
      ur: ['مکمل ساؤنڈ پروف پُرسکون کیبن', 'سامان کے لیے وسیع ترین ڈگی (8 بیگز)', 'گاڑی کے اندر کولڈ ریفریجریٹر'],
      fr: ['Cabine ultra-silencieuse haut de gamme', 'Coffre géant pour 8 grandes valises', 'Réfrigérateur de console intégré'],
      es: ['Cabina acústica ultrasilenciosa de lujo', 'Maletero gigante para 8 maletas', 'Refrigerador de consola integrado'],
      de: ['Flüsterleise Akustik-Fahrgastzelle', 'Riesiger Kofferraum für 8 Koffer', 'Integriertes Kühlfach für Erfrischungen'],
      tr: ['Özel Akustik İzolasyonlu Sessiz Kabin', 'Genişletilmiş Dev Bagaj (8 Valiz)', 'Entegre Konsol İçi Soğutucu Dolap'],
      hi: ['शांत एवं ध्वनि-रहित प्रीमियम केबिन', 'विशाल बूट स्पेस (8 बड़े सूटकेस)', 'शीतल पेय हेतु इन-बिल्ट रेफ्रिजरेटर'],
    },
  },
  {
    id: 'hiace',
    name: {
      ar: 'تويوتا هايس VIP',
      en: 'Toyota HiAce VIP',
      ms: 'Toyota HiAce VIP',
      id: 'Toyota HiAce VIP',
      ur: 'ٹویوٹا ہائی ایس VIP',
      fr: 'Toyota HiAce VIP',
      es: 'Toyota HiAce VIP',
      de: 'Toyota HiAce VIP',
      tr: 'Toyota HiAce VIP',
      hi: 'टोयोटा हाईएस वीआईपी',
    },
    category: {
      ar: 'ميني باص عائلي للمجموعات',
      en: 'Executive Group Minibus',
      ms: 'Minibus Eksekutif Kumpulan',
      id: 'Minibus Eksekutif Rombongan',
      ur: 'ایگزیکٹو گروپ منی بس',
      fr: 'Minibus Exécutif pour Groupes',
      es: 'Minibús Ejecutivo para Grupos',
      de: 'Exklusiver Gruppen-Minibus',
      tr: 'Yönetici Grup Minibüsü',
      hi: 'कार्यकारी समूह मिनीबस',
    },
    passengers: 10,
    luggage: 10,
    image: '/assets/images/vehicles/toyota-hiace/exterior-studio.webp',
    badge: {
      ar: 'مثالي للعائلات الكبيرة (10 ركاب)',
      en: 'Ideal for Large Groups (10 Pax)',
      ms: 'Sangat Sesuai Kumpulan Besar (10 Pax)',
      id: 'Ideal untuk Rombongan Besar (10 Pax)',
      ur: 'بڑے خاندانوں اور گروپس کے لیے بہترین (10 مسافر)',
      fr: 'Idéal pour Grands Groupes (10 Pax)',
      es: 'Ideal para Grupos Grandes (10 Pax)',
      de: 'Ideal für Reisegruppen (bis 10 Pers.)',
      tr: 'Geniş Gruplar İçin İdeal (10 Kişi)',
      hi: 'बड़े समूहों हेतु सर्वोपरि (10 यात्री)',
    },
    features: {
      ar: ['سعة 10 ركاب مع 10 حقائب', 'سقف مرتفع وممرات مريحة', 'تكييف قوي مخصص للمجموعات'],
      en: ['Generous 10 Passenger + 10 Bag Capacity', 'High-Roof Clearance & Easy Walk-Through', 'Powerful Group Climate System'],
      ms: ['Muatan 10 Penumpang + 10 Beg', 'Bumbung Tinggi & Laluan Berjalan Selesa', 'Penghawa Dingin Kumpulan Berkuasa'],
      id: ['Kapasitas 10 Penumpang + 10 Koper', 'Atap Tinggi & Ruang Berdiri Nyaman', 'AC Kuat Merata ke Seluruh Kabin'],
      ur: ['10 مسافروں اور 10 بڑے بیگز کی مکمل گنجائش', 'ہائی روف ڈیزائن اور چلنے کی آسان جگہ', 'طاقتور سنٹرل ایئر کنڈیشننگ سسٹم'],
      fr: ['Capacité 10 passagers + 10 valises', 'Toit surélevé et couloir spacieux', 'Climatisation puissante multi-diffuseurs'],
      es: ['Capacidad 10 pasajeros + 10 maletas', 'Techo alto y pasillo de fácil acceso', 'Potente sistema de aire acondicionado'],
      de: ['Platz für 10 Passagiere + 10 Koffer', 'Hohes Dach für bequemes Einsteigen', 'Leistungsstarke Gruppen-Klimaanlage'],
      tr: ['10 Yolcu ve 10 Büyük Valiz Kapasitesi', 'Yüksek Tavan ve Kolay Geçiş Koridoru', 'Tüm Kabini Kapsayan Güçlü Klima'],
      hi: ['10 यात्रियों व 10 बड़े सूटकेस की क्षमता', 'ऊंची छत व आसान आवागमन गलियारा', 'पूरे केबिन हेतु शक्तिशाली एसी प्रवाह'],
    },
  },
  {
    id: 'coaster',
    name: {
      ar: 'تويوتا كوستر VIP',
      en: 'Toyota Coaster VIP Bus',
      ms: 'Bas VIP Toyota Coaster',
      id: 'Bus VIP Toyota Coaster',
      ur: 'ٹویوٹا کوسٹر VIP بس',
      fr: 'Autocar VIP Toyota Coaster',
      es: 'Autobús VIP Toyota Coaster',
      de: 'VIP-Reisebus Toyota Coaster',
      tr: 'Toyota Coaster VIP Otobüs',
      hi: 'टोयोटा कोस्टर वीआईपी बस',
    },
    category: {
      ar: 'حافلة VIP فاخرة للوفود',
      en: 'VIP Delegation Coach',
      ms: 'Bas Mewah Delegasi VIP',
      id: 'Bus Mewah Delegasi VIP',
      ur: 'وفود و حجاج کے لیے لگژری بس',
      fr: 'Autocar de Délégation VIP',
      es: 'Autocar para Delegaciones VIP',
      de: 'Luxus-Reisebus für Delegationen',
      tr: 'VIP Delegasyon ve Heyet Otobüsü',
      hi: 'वीआईपी प्रतिनिधिमंडल बस',
    },
    passengers: 21,
    luggage: 20,
    image: '/assets/images/vehicles/toyota-coaster/exterior-studio.webp',
    badge: {
      ar: 'للوفود وحملات العمرة (21 راكب)',
      en: 'For Delegations & Tour Groups',
      ms: 'Untuk Rombongan & Jemaah Umrah',
      id: 'Untuk Delegasi & Jamaah Umrah',
      ur: 'وفود اور عمرہ گروپس کے لیے (21 مسافر)',
      fr: 'Pour Délégations & Groupes Omra',
      es: 'Para Delegaciones y Grupos Umrah',
      de: 'Für Delegationen & Umrah-Gruppen',
      tr: 'Heyetler ve Umre Grupları İçin',
      hi: 'प्रतिनिधिमंडलों व उमरा समूहों हेतु',
    },
    features: {
      ar: ['سعة 21 راكباً مع 20 حقيبة', 'مقاعد مريحة وممر وسيع', 'نظام صوتي وتكييف هوائي شامل'],
      en: ['21 Seated Passengers + 20 Bag Storage', 'Ergonomic High-Back Reclining Seats', 'PA Audio System & Dual Air Blowers'],
      ms: ['21 Tempat Duduk + Ruang 20 Beg', 'Kerusi Ergonomik Bersandar Selesa', 'Sistem PA Audio & Penghawa Dingin Penuh'],
      id: ['21 Kursi Nyaman + Ruang 20 Koper', 'Kursi Reclining Ergonomis', 'Sistem Audio Mikrofon & Pendingin Maksimal'],
      ur: ['21 مسافروں اور 20 بیگز کی زبردست گنجائش', 'آرام دہ نشستیں اور کشادہ سینٹرل کوریڈور', 'اعلیٰ کوالٹی ساؤنڈ سسٹم اور زبردست کولنگ'],
      fr: ['21 sièges passagers + soute 20 valises', 'Sièges inclinables ergonomiques confortables', 'Système audio micro et ventilation double'],
      es: ['21 plazas + maletero para 20 maletas', 'Asientos reclinables ergonómicos', 'Megafonía y climatización integral'],
      de: ['21 bequeme Sitze + Stauraum für 20 Koffer', 'Ergonomische Sitze mit verstellbarer Lehne', 'Mikrofonanlage & doppelte Klimatisierung'],
      tr: ['21 Yolcu Koltuğu + 20 Büyük Bagaj Alanı', 'Ergonometrik Yatar Koltuklar ve Geniş Koridor', 'Anons Sistemi ve Çift Klimalı Havalandırma'],
      hi: ['21 आरामदायक सीटें व 20 बैग रखने की जगह', 'आरामदायक रिक्लिनिंग सीटें व सुगम गलियारा', 'माइक ऑडियो सिस्टम व समग्र वातानुकूलन'],
    },
  },
];

export const UI_I18N: Record<Locale, {
  step1Category: string;
  step2Route: string;
  step3Vehicle: string;
  catAirports: string;
  catIntercity: string;
  catZiyarat: string;
  catRegional: string;
  selectedJourney: string;
  distance: string;
  duration: string;
  fixedFare: string;
  perVehicle: string;
  cashOnArrival: string;
  bookVehicleCTA: string;
  sarEquivalent: string;
  currencyLabel: string;
  pax: string;
  bags: string;
  inclusionsTitle: string;
  inclusions: string[];
}> = {
  ar: {
    step1Category: '1. اختر نوع الرحلة',
    step2Route: '2. حدد المسار المطلوب',
    step3Vehicle: '3. قارن الأسطول واحجز المركبة',
    catAirports: 'توصيل المطارات',
    catIntercity: 'بين المدن والحرمين',
    catZiyarat: 'المزارات المقدسة',
    catRegional: 'الطائف والرياض',
    selectedJourney: 'المسار المحدد لرحلتك',
    distance: 'المسافة:',
    duration: 'المدة التقريبية:',
    fixedFare: 'سعر ثابت معتمد',
    perVehicle: 'الأجرة للسيارة بالكامل',
    cashOnArrival: 'الدفع نقداً 100% للسائق عند الوصول بعد إتمام الرحلة بأمان',
    bookVehicleCTA: 'احجز هذه السيارة الآن',
    sarEquivalent: 'المقابل بالريال:',
    currencyLabel: 'العملة:',
    pax: 'ركاب',
    bags: 'حقائب',
    inclusionsTitle: 'مزايا وضمانات ضيوف الرحمن VIP الشاملة في كل رحلة:',
    inclusions: [
      'سعر ثابت ونهائي للمركبة بالكامل دون أي رسوم إضافية خفية',
      'سداد نقدي 100% للسائق عند الوصول إلى فندقك بكل أمان',
      'شامل لكافة رسوم الطرق السريعة وضريبة القيمة المضافة ومواقف المطار',
      'تتبع راداري لرحلات الطيران مع 60 دقيقة انتظار مجاني في المطار',
      'مياه زمزم مبردة مجاناً مع مساعدة كاملة في تحميل الأمتعة',
      'سائقون محترفون ومرخصون على دراية كاملة بالمواقيت والمشاعر المقدسة',
    ],
  },
  en: {
    step1Category: '1. Choose Trip Category',
    step2Route: '2. Select Your Route',
    step3Vehicle: '3. Compare Fleet & Book',
    catAirports: 'Airport Transfers',
    catIntercity: 'Intercity Corridors',
    catZiyarat: 'Sacred Ziyarat Tours',
    catRegional: 'Taif & Riyadh Regional',
    selectedJourney: 'Selected Journey',
    distance: 'Distance:',
    duration: 'Estimated Duration:',
    fixedFare: 'Guaranteed Fixed Rate',
    perVehicle: 'Price per Entire Vehicle',
    cashOnArrival: '100% Cash paid directly to chauffeur upon safe arrival at destination',
    bookVehicleCTA: 'Book This Vehicle',
    sarEquivalent: 'Base in SAR:',
    currencyLabel: 'Currency:',
    pax: 'Passengers',
    bags: 'Luggage',
    inclusionsTitle: 'Royal Inclusions Guaranteed With Every Booking:',
    inclusions: [
      'Guaranteed fixed rate per vehicle with zero hidden charges or surcharges',
      '100% cash paid directly to your chauffeur upon safe hotel arrival',
      'All highway tolls, fuel, airport parking, and taxes fully included',
      'Live flight radar tracking with 60 minutes complimentary airport wait time',
      'Complimentary chilled Zamzam water and complete luggage handling assistance',
      'Licensed professional route chauffeurs well-versed in Miqats and sacred sites',
    ],
  },
  ms: {
    step1Category: '1. Pilih Kategori Perjalanan',
    step2Route: '2. Pilih Laluan Anda',
    step3Vehicle: '3. Bandingkan Armada & Tempah',
    catAirports: 'Pemindahan Lapangan Terbang',
    catIntercity: 'Antara Bandar Haramain',
    catZiyarat: 'Ziarah Tempat Suci',
    catRegional: 'Wilayah Taif & Riyadh',
    selectedJourney: 'Laluan Terpilih',
    distance: 'Jarak:',
    duration: 'Anggaran Masa:',
    fixedFare: 'Kadar Tetap Dijamin',
    perVehicle: 'Kadar Setiap Kenderaan Penuh',
    cashOnArrival: '100% Tunai dibayar terus kepada pemandu setibanya di hotel',
    bookVehicleCTA: 'Tempah Kenderaan Ini',
    sarEquivalent: 'Asas dalam SAR:',
    currencyLabel: 'Mata Wang:',
    pax: 'Penumpang',
    bags: 'Bagasi',
    inclusionsTitle: 'Jaminan Diraja Termasuk Dalam Setiap Tempahan:',
    inclusions: [
      'Kadar tetap muktamad bagi setiap kenderaan penuh tanpa caj tersembunyi',
      'Bayaran 100% tunai terus kepada pemandu setelah selamat sampai di hotel',
      'Semua tol lebuh raya, bahan api, dan cukai disertakan sepenuhnya',
      'Penjejakan penerbangan langsung dengan 60 minit masa menunggu percuma',
      'Air Zamzam sejuk percuma dan bantuan mengangkat bagasi sepenuhnya',
      'Pemandu profesional berlesen yang mahir dengan Miqat dan kawasan suci',
    ],
  },
  id: {
    step1Category: '1. Pilih Kategori Perjalanan',
    step2Route: '2. Pilih Rute Perjalanan',
    step3Vehicle: '3. Bandingkan Armada & Pesan',
    catAirports: 'Antar-Jemput Bandara',
    catIntercity: 'Antarkota Makkah-Madinah',
    catZiyarat: 'Ziarah Tempat Bersejarah',
    catRegional: 'Rute Regional Taif & Riyadh',
    selectedJourney: 'Rute Perjalanan Terpilih',
    distance: 'Jarak:',
    duration: 'Estimasi Durasi:',
    fixedFare: 'Tarif Tetap Terjamin',
    perVehicle: 'Tarif per Satu Kenderaan Penuh',
    cashOnArrival: 'Bayar tunai 100% langsung ke sopir setelah tiba di hotel tujuan',
    bookVehicleCTA: 'Pesan Kendaraan Ini',
    sarEquivalent: 'Dasar dalam SAR:',
    currencyLabel: 'Mata Uang:',
    pax: 'Penumpang',
    bags: 'Koper',
    inclusionsTitle: 'Fasilitas Layanan Termasuk dalam Setiap Pesanan:',
    inclusions: [
      'Tarif tetap final per kendaraan tanpa ada biaya tersembunyi',
      'Pembayaran tunai 100% ke sopir saat tiba di hotel dengan aman',
      'Termasuk seluruh biaya jalan tol, bensin, dan pajak',
      'Pelacakan penerbangan langsung dengan gratis waktu tunggu 60 menit',
      'Air Zamzam dingin gratis dan bantuan penuh mengangkat bagasi',
      'Sopir profesional berpengalaman yang paham Miqat dan tempat ibadah',
    ],
  },
  ur: {
    step1Category: '1. سفر کی قسم منتخب کریں',
    step2Route: '2. مطلوبہ راستہ منتخب کریں',
    step3Vehicle: '3. گاڑی منتخب کریں اور بکنگ کریں',
    catAirports: 'ایئرپورٹ ٹرانسفرز',
    catIntercity: 'مکہ و مدینہ کے درمیان',
    catZiyarat: 'مقدس زیارات ٹورز',
    catRegional: 'طائف و ریاض کے راستے',
    selectedJourney: 'منتخب کردہ راستہ',
    distance: 'فاصلہ:',
    duration: 'تخمینی وقت:',
    fixedFare: 'گارنٹی شدہ مقررہ کرایہ',
    perVehicle: 'پوری گاڑی کا مکمل کرایہ',
    cashOnArrival: 'منزل پر بحفاظت پہنچنے کے بعد ڈرائیور کو 100% نقد ادائیگی',
    bookVehicleCTA: 'یہ گاڑی ابھی بک کریں',
    sarEquivalent: 'سعودی ریال میں:',
    currencyLabel: 'کرنسی:',
    pax: 'مسافر',
    bags: 'بیگز',
    inclusionsTitle: 'ہر بکنگ میں شامل شاہی سہولیات اور ضمانتیں:',
    inclusions: [
      'پوری گاڑی کا حتمی مقررہ کرایہ، کوئی پوشیدہ چارجز نہیں',
      'ہوٹل پہنچنے کے بعد 100% نقد ادائیگی کی مکمل آزادی',
      'تمام ہائی وے ٹول ٹیکس اور تمام چارجز شامل ہیں',
      'لائیو فلائٹ ٹریکنگ اور ایئرپورٹ پر 60 منٹ کا مفت انتظار',
      'ٹھنڈا آب زمزم اور سامان اٹھانے میں مکمل معاونت',
      'میقات اور مقدس مقامات سے واقف تجربہ کار بااعتماد ڈرائیورز',
    ],
  },
  fr: {
    step1Category: '1. Choisir la catégorie de trajet',
    step2Route: '2. Sélectionner l\'itinéraire',
    step3Vehicle: '3. Comparer la flotte et réserver',
    catAirports: 'Transferts Aéroport',
    catIntercity: 'Liaisons Interurbaines',
    catZiyarat: 'Visites Sacrées de Ziyarat',
    catRegional: 'Régions Taïf & Riyad',
    selectedJourney: 'Itinéraire sélectionné',
    distance: 'Distance:',
    duration: 'Durée estimée:',
    fixedFare: 'Tarif Fixe Garanti',
    perVehicle: 'Prix par véhicule complet',
    cashOnArrival: 'Paiement 100% en espèces directement au chauffeur à l\'arrivée',
    bookVehicleCTA: 'Réserver ce véhicule',
    sarEquivalent: 'Base en SAR:',
    currencyLabel: 'Devise:',
    pax: 'Passagers',
    bags: 'Bagages',
    inclusionsTitle: 'Garanties Royales Incluses Dans Chaque Réservation:',
    inclusions: [
      'Tarif fixe garanti pour l\'ensemble du véhicule sans frais cachés',
      'Paiement en espèces à votre arrivée sécurisée à l\'hôtel',
      'Tous les péages d\'autoroute, carburant et taxes entièrement inclus',
      'Suivi de vol en direct et 60 minutes d\'attente gratuite à l\'aéroport',
      'Bouteilles d\'eau de Zamzam fraîches et aide complète aux bagages',
      'Chauffeurs professionnels connaissant parfaitement les Miqats et lieux saints',
    ],
  },
  es: {
    step1Category: '1. Seleccione la categoría de viaje',
    step2Route: '2. Elija la ruta deseada',
    step3Vehicle: '3. Compare la flota y reserve',
    catAirports: 'Traslados de Aeropuerto',
    catIntercity: 'Rutas Interurbanas',
    catZiyarat: 'Tours Sagrados Ziyarat',
    catRegional: 'Regionales Taif y Riad',
    selectedJourney: 'Ruta seleccionada',
    distance: 'Distancia:',
    duration: 'Duración estimada:',
    fixedFare: 'Tarifa Fija Garantizada',
    perVehicle: 'Precio por vehículo completo',
    cashOnArrival: 'Pago 100% en efectivo directamente al chófer a la llegada al hotel',
    bookVehicleCTA: 'Reservar este vehículo',
    sarEquivalent: 'Base en SAR:',
    currencyLabel: 'Moneda:',
    pax: 'Pasajeros',
    bags: 'Maletas',
    inclusionsTitle: 'Inclusiones Reales Garantizadas En Cada Reserva:',
    inclusions: [
      'Tarifa fija final por vehículo sin cargos ocultos ni sorpresas',
      'Pago en efectivo al llegar con seguridad a su hotel de destino',
      'Peajes de autopista, combustible e impuestos totalmente incluidos',
      'Rastreo de vuelos en vivo y 60 min de espera gratuita en aeropuerto',
      'Botellas de agua Zamzam fría y asistencia completa con equipaje',
      'Chóferes profesionales expertos en Miqats y lugares sagrados',
    ],
  },
  de: {
    step1Category: '1. Fahrtkategorie wählen',
    step2Route: '2. Gewünschte Route wählen',
    step3Vehicle: '3. Flotte vergleichen & buchen',
    catAirports: 'Flughafentransfers',
    catIntercity: 'Fernstrecken Haramain',
    catZiyarat: 'Heilige Ziyarat-Touren',
    catRegional: 'Regionen Taif & Riad',
    selectedJourney: 'Ausgewählte Route',
    distance: 'Entfernung:',
    duration: 'Geschätzte Dauer:',
    fixedFare: 'Garantierter Festpreis',
    perVehicle: 'Preis pro Gesamtfahrzeug',
    cashOnArrival: '100% Barzahlung direkt beim Chauffeur bei sicherer Ankunft am Hotel',
    bookVehicleCTA: 'Dieses Fahrzeug buchen',
    sarEquivalent: 'Basis in SAR:',
    currencyLabel: 'Währung:',
    pax: 'Passagiere',
    bags: 'Koffer',
    inclusionsTitle: 'In Jeder Buchung Garantierte Leistungen:',
    inclusions: [
      'Garantierter Festpreis pro Gesamtfahrzeug ohne versteckte Gebühren',
      '100% Barzahlung nach sicherer Ankunft im Hotel beim Chauffeur',
      'Mautgebühren, Treibstoff und Steuern vollständig inbegriffen',
      'Flugradar-Tracking & 60 Minuten kostenlose Wartezeit am Terminal',
      'Kostenloses gekühltes Zamzam-Wasser und umfassende Gepäckhilfe',
      'Erfahrene lizenzierte Chauffeure mit genauer Kenntnis der Miqat-Stätten',
    ],
  },
  tr: {
    step1Category: '1. Seyahat Kategorisini Seçin',
    step2Route: '2. Güzergahınızı Belirleyin',
    step3Vehicle: '3. Araçları Karşılaştırın ve Ayırtın',
    catAirports: 'Havalimanı Transferleri',
    catIntercity: 'Haremeyn Şehirlerarası',
    catZiyarat: 'Kutsal Ziyaret Turları',
    catRegional: 'Taif ve Riyad Hatları',
    selectedJourney: 'Seçili Güzergah',
    distance: 'Mesafe:',
    duration: 'Tahmini Süre:',
    fixedFare: 'Garantili Sabit Fiyat',
    perVehicle: 'Tüm Araç İçin Net Fiyat',
    cashOnArrival: 'Otele varışta doğrudan şoföre %100 nakit ödeme',
    bookVehicleCTA: 'Bu Aracı Şimdi Ayırtın',
    sarEquivalent: 'SAR Karşılığı:',
    currencyLabel: 'Para Birimi:',
    pax: 'Yolcu',
    bags: 'Valiz',
    inclusionsTitle: 'Her Rezervasyona Dahil Olan Kraliyet Ayrıcalıkları:',
    inclusions: [
      'Aracın tamamı için net sabit fiyat, hiçbir gizli masraf yok',
      'Otele güvenle ulaşıldığında doğrudan nakit ödeme kolaylığı',
      'Tüm otoyol geçiş ücretleri, yakıt ve vergiler dahildir',
      'Canlı uçuş takibi ve havalimanında 60 dakika ücretsiz bekleme',
      'Ücretsiz soğuk Zemzem suyu ve bagaj taşıma yardımı',
      'Mikat noktaları ve kutsal mekanlarda uzman lisanslı şoförler',
    ],
  },
  hi: {
    step1Category: '1. यात्रा श्रेणी चुनें',
    step2Route: '2. अपना मार्ग चुनें',
    step3Vehicle: '3. वाहनों की तुलना करें और बुक करें',
    catAirports: 'हवाई अड्डा ट्रांसफर',
    catIntercity: 'हरमैन अंतर-शहर मार्ग',
    catZiyarat: 'पवित्र ज़ियारत टूर',
    catRegional: 'ताइफ़ व रियाद क्षेत्रीय',
    selectedJourney: 'चयनित यात्रा मार्ग',
    distance: 'दूरी:',
    duration: 'अनुमानित समय:',
    fixedFare: 'गारंटीकृत निश्चित दर',
    perVehicle: 'प्रति वाहन निश्चित किराया',
    cashOnArrival: 'गंतव्य पर सुरक्षित पहुँचने के बाद ड्राइवर को 100% नकद भुगतान',
    bookVehicleCTA: 'यह वाहन अभी बुक करें',
    sarEquivalent: 'सऊदी रियाल में:',
    currencyLabel: 'मुद्रा:',
    pax: 'यात्री',
    bags: 'सूटकेस',
    inclusionsTitle: 'प्रत्येक बुकिंग में शामिल विशिष्ट सुविधाएं:',
    inclusions: [
      'पूरे वाहन के लिए अंतिम निश्चित किराया, कोई छिपा शुल्क नहीं',
      'होटल सुरक्षित पहुँचने के बाद 100% नकद भुगतान की सुविधा',
      'सभी हाईवे टोल, ईंधन और टैक्स पूरी तरह शामिल',
      'लाइव फ्लाइट ट्रैकिंग और 60 मिनट की मुफ्त हवाई अड्डा प्रतीक्षा',
      'ठंडा ज़मज़म जल और सामान उठाने में संपूर्ण सहायता',
      'मीक़ात व धार्मिक स्थलों से भलीभाँति परिचित अधिकृत चालक',
    ],
  },
};

export function RouteBasedPricingExperience({
  locale,
  dict,
  initialRates,
  taifEnabled = true,
  riyadhEnabled = true,
}: RouteBasedPricingExperienceProps) {
  const isAr = locale === 'ar';
  const isRtl = isAr || locale === 'ur';
  const t = UI_I18N[locale] || UI_I18N.en;
  const { currency, setCurrency, formatPrice } = useCurrency();

  const [activeCategory, setActiveCategory] = useState<RouteCategoryKey>('airports');
  const [selectedRouteId, setSelectedRouteId] = useState<string>('jeddah-airport-to-makkah');

  // Filter routes based on taif and riyadh flags
  const availableRoutes = useMemo(() => {
    return ROUTE_DIRECTORY.filter((r) => {
      if (r.id.includes('taif') && !taifEnabled) return false;
      if (r.id.includes('riyadh') && !riyadhEnabled) return false;
      return true;
    });
  }, [taifEnabled, riyadhEnabled]);

  // Routes in active category
  const categoryRoutes = useMemo(() => {
    return availableRoutes.filter((r) => r.category === activeCategory);
  }, [availableRoutes, activeCategory]);

  // Active selected route object
  const activeRoute = useMemo(() => {
    const found = availableRoutes.find((r) => r.id === selectedRouteId);
    return found || availableRoutes[0];
  }, [availableRoutes, selectedRouteId]);

  // Get price for a vehicle on a route
  const getVehicleFare = (routeId: string, vehicleId: string): number => {
    const rateFromDb = initialRates?.[routeId]?.[vehicleId];
    if (rateFromDb && rateFromDb > 0) return rateFromDb;
    return AUTHORITATIVE_TRANSFER_RATES[routeId]?.[vehicleId] ?? 0;
  };

  const handleCategorySwitch = (cat: RouteCategoryKey) => {
    setActiveCategory(cat);
    const firstInCat = availableRoutes.find((r) => r.category === cat);
    if (firstInCat) {
      setSelectedRouteId(firstInCat.id);
    }
  };

  const categories = [
    { key: 'airports' as RouteCategoryKey, label: t.catAirports, icon: <Plane className="w-4 h-4" /> },
    { key: 'intercity' as RouteCategoryKey, label: t.catIntercity, icon: <Building className="w-4 h-4" /> },
    { key: 'ziyarat' as RouteCategoryKey, label: t.catZiyarat, icon: <Compass className="w-4 h-4" /> },
    { key: 'regional' as RouteCategoryKey, label: t.catRegional, icon: <Palmtree className="w-4 h-4" /> },
  ];

  return (
    <div className="w-full text-start" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* ─────────────────────────────────────────────────────────────
          STEP 1: CHOOSE TRIP CATEGORY
      ────────────────────────────────────────────────────────────── */}
      <div className="mb-8 sm:mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-6 h-6 rounded-full bg-[#101827] text-[#C5A15D] text-xs font-bold flex items-center justify-center shrink-0">
            1
          </span>
          <h2 className="font-playfair font-serif text-lg sm:text-2xl font-bold text-[#101827]">
            {t.step1Category}
          </h2>
        </div>

        {/* 4 Clean, Elegant Category Segmented Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => handleCategorySwitch(cat.key)}
                className={`flex items-center gap-2.5 sm:gap-3 p-3.5 sm:p-4 rounded-2xl text-start font-bold transition-all border min-h-[52px] cursor-pointer ${
                  isActive
                    ? 'bg-[#101827] text-white border-[#101827] shadow-md ring-2 ring-[#C5A15D]/30'
                    : 'bg-white text-[#4B5565] border-[#E8E3DA] hover:border-[#C5A15D] hover:text-[#101827]'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isActive ? 'bg-[#C5A15D] text-[#101827]' : 'bg-[#FAF7F0] text-[#C5A15D]'
                  }`}
                >
                  {cat.icon}
                </div>
                <span className="text-xs sm:text-sm font-semibold leading-tight line-clamp-2">
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          STEP 2: SELECT ROUTE & PROMINENT ROUTE SHOWCASE
      ────────────────────────────────────────────────────────────── */}
      <div className="mb-10 sm:mb-12">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-6 h-6 rounded-full bg-[#101827] text-[#C5A15D] text-xs font-bold flex items-center justify-center shrink-0">
            2
          </span>
          <h2 className="font-playfair font-serif text-lg sm:text-2xl font-bold text-[#101827]">
            {t.step2Route}
          </h2>
        </div>

        {/* Route Selector Ribbon */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {categoryRoutes.map((route) => {
            const isSelected = selectedRouteId === route.id;
            const routeTitle = LOCALIZED_ROUTE_NAMES[route.id]?.[locale] || route.id;
            const camryStarting = getVehicleFare(route.id, 'camry');

            return (
              <button
                key={route.id}
                type="button"
                onClick={() => setSelectedRouteId(route.id)}
                className={`p-4 sm:p-5 rounded-2xl border text-start transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-[#C5A15D] shadow-md ring-2 ring-[#C5A15D]/30'
                    : 'bg-white/80 border-[#E8E3DA] hover:border-[#C5A15D]/60 hover:bg-white'
                }`}
              >
                <div className="w-full">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold text-[#8C6D2D] bg-[#FAF7F0] px-2.5 py-0.5 rounded-full border border-[#C5A15D]/20">
                      {route.distanceKm} km
                    </span>
                    {isSelected && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-[#188567] bg-[#E8F5EE] px-2 py-0.5 rounded-full">
                        <Check className="w-3 h-3" />
                        <span>{isAr ? 'المسار المختار' : 'Active'}</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-[#101827] leading-snug mb-1">
                    {routeTitle}
                  </h3>
                  <p className="text-xs text-[#687386]">
                    {route.durationApprox[locale] || route.durationApprox.en}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E8E3DA] flex items-center justify-between w-full">
                  <span className="text-[11px] text-[#687386]">
                    {isAr ? 'تبدأ من:' : 'From:'}
                  </span>
                  <span className="text-sm font-extrabold text-[#101827]">
                    {formatPrice(camryStarting)}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Route Showcase Card (Prominent & Regal) */}
        <div className="rounded-2xl sm:rounded-3xl bg-[#101827] text-white p-5 sm:p-8 border border-[#C5A15D]/40 shadow-lg">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-[#C5A15D] uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.selectedJourney}</span>
              </div>
              <h3 className="font-playfair font-serif text-xl sm:text-2xl md:text-3xl text-white font-bold leading-tight">
                {LOCALIZED_ROUTE_NAMES[activeRoute.id]?.[locale] || activeRoute.id}
              </h3>
              <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-xs text-slate-300 mt-2 font-light">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A15D]" />
                  <span>{t.distance} <strong className="text-white font-bold">{activeRoute.distanceKm} km</strong></span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#C5A15D]" />
                  <span>{t.duration} <strong className="text-white font-bold">{activeRoute.durationApprox[locale] || activeRoute.durationApprox.en}</strong></span>
                </span>
              </div>
            </div>

            <div className="text-start md:text-end shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/10 w-full md:w-auto">
              <span className="text-[10px] text-[#C5A15D] uppercase tracking-wider block font-bold">
                {t.fixedFare}
              </span>
              <span className="text-xs text-slate-300">
                {t.perVehicle}
              </span>
            </div>
          </div>

          {activeRoute.miqatNotice?.[locale] && (
            <div className="mt-4 pt-4 border-t border-white/10 text-xs text-slate-300 flex items-start gap-2.5 leading-relaxed">
              <Compass className="w-4 h-4 text-[#C5A15D] shrink-0 mt-0.5" />
              <span>{activeRoute.miqatNotice[locale]}</span>
            </div>
          )}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          STEP 3: COMPARE VEHICLES & INSTANT LUXURY BOOKING
      ────────────────────────────────────────────────────────────── */}
      <div className="mb-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#101827] text-[#C5A15D] text-xs font-bold flex items-center justify-center shrink-0">
              3
            </span>
            <div>
              <h2 className="font-playfair font-serif text-lg sm:text-2xl font-bold text-[#101827]">
                {t.step3Vehicle}
              </h2>
              <span className="text-xs text-[#687386]">
                {t.cashOnArrival}
              </span>
            </div>
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-[#E8E3DA] shadow-2xs shrink-0 self-end sm:self-auto">
            <span className="text-xs font-semibold text-[#687386] px-2 hidden sm:inline">
              {t.currencyLabel}
            </span>
            <button
              type="button"
              onClick={() => setCurrency('SAR')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                currency === 'SAR'
                  ? 'bg-[#101827] text-[#C5A15D] shadow-xs'
                  : 'text-[#4B5565] hover:text-[#101827]'
              }`}
            >
              SAR (ر.س)
            </button>
            <button
              type="button"
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                currency === 'USD'
                  ? 'bg-[#101827] text-[#C5A15D] shadow-xs'
                  : 'text-[#4B5565] hover:text-[#101827]'
              }`}
            >
              USD ($)
            </button>
          </div>
        </div>

        {/* 5 VEHICLE CARDS (Generous, High-End Presentation) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {FLEET_SPECS.map((vehicle) => {
            const fareSAR = getVehicleFare(activeRoute.id, vehicle.id);
            if (fareSAR <= 0 && (vehicle.id === 'coaster' || activeRoute.id.includes('riyadh'))) {
              return null; // Skip non-applicable vehicle on this specific route
            }

            const isStaria = vehicle.id === 'staria';
            const bookingHref = `/${locale}/booking?route=${encodeURIComponent(activeRoute.id)}&vehicle=${encodeURIComponent(vehicle.id)}`;

            return (
              <div
                key={vehicle.id}
                className={`rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition-all bg-white border ${
                  isStaria
                    ? 'border-[#C5A15D] ring-2 ring-[#C5A15D]/25 shadow-md'
                    : 'border-[#E8E3DA] shadow-xs hover:border-[#C5A15D]/60 hover:shadow-sm'
                }`}
              >
                <div>
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold text-[#8C6D2D] bg-[#FAF7F0] px-2.5 py-1 rounded-full uppercase tracking-wider border border-[#C5A15D]/30">
                      {vehicle.category[locale] || vehicle.category.en}
                    </span>
                    {vehicle.badge?.[locale] && (
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          isStaria
                            ? 'bg-[#FAF7F0] text-[#8C6D2D] border border-[#C5A15D]/40'
                            : 'bg-[#F1F3F7] text-[#4B5565]'
                        }`}
                      >
                        {vehicle.badge[locale]}
                      </span>
                    )}
                  </div>

                  {/* Studio Vehicle Photography (Generous Size) */}
                  <div className="relative w-full h-44 sm:h-52 my-2 rounded-2xl overflow-hidden bg-gradient-to-b from-[#FAF7F0] to-white border border-[#E8E3DA]/60">
                    <Image
                      src={vehicle.image}
                      alt={vehicle.name[locale] || vehicle.name.en}
                      fill
                      className="object-contain p-2 hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  {/* Vehicle Name & Capacity Specs */}
                  <h3 className="font-playfair font-serif text-lg sm:text-xl font-bold text-[#101827] mt-3 mb-2">
                    {vehicle.name[locale] || vehicle.name.en}
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-[#687386] mb-4 pb-3 border-b border-[#E8E3DA]">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Users className="w-4 h-4 text-[#C5A15D]" />
                      <span>
                        {vehicle.passengers} {t.pax}
                      </span>
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <Luggage className="w-4 h-4 text-[#C5A15D]" />
                      <span>
                        {vehicle.luggage} {t.bags}
                      </span>
                    </span>
                  </div>

                  {/* 3 Crisp Features */}
                  <ul className="space-y-2 mb-6">
                    {(vehicle.features[locale] || vehicle.features.en).map((feat, fIdx) => (
                      <li key={fIdx} className="text-xs text-[#4B5565] flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A15D] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price Display & Booking CTA */}
                <div className="pt-4 border-t border-[#E8E3DA]">
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <span className="text-[10px] text-[#687386] block font-medium">
                        {t.fixedFare}
                      </span>
                      <span className="text-2xl sm:text-3xl font-extrabold text-[#101827] tracking-tight">
                        {formatPrice(fareSAR)}
                      </span>
                    </div>
                    {currency !== 'SAR' && (
                      <span className="text-xs text-[#8C6D2D] font-bold">
                        {t.sarEquivalent} {fareSAR} SAR
                      </span>
                    )}
                  </div>

                  <Link
                    href={bookingHref}
                    className="w-full h-12 rounded-xl bg-[#101827] hover:bg-[#18263e] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 group"
                  >
                    <span>{t.bookVehicleCTA}</span>
                    {isRtl ? (
                      <ArrowLeft className="w-4 h-4 text-[#C5A15D] group-hover:-translate-x-1 transition-transform" />
                    ) : (
                      <ArrowRight className="w-4 h-4 text-[#C5A15D] group-hover:translate-x-1 transition-transform" />
                    )}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          CONSOLIDATED ROYAL INCLUSIONS (SINGLE SOURCE, NO DUPLICATION)
      ────────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl sm:rounded-3xl bg-white p-6 sm:p-8 md:p-10 border border-[#E8E3DA] shadow-xs">
        <div className="max-w-2xl mb-6">
          <span className="text-xs font-bold text-[#8C6D2D] uppercase tracking-wider block mb-1">
            {isAr ? 'ضمان ضيوف الرحمن VIP' : 'The Royal Assurance'}
          </span>
          <h2 className="font-playfair font-serif text-xl sm:text-2xl md:text-3xl font-bold text-[#101827]">
            {t.inclusionsTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {t.inclusions.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-4 rounded-xl bg-[#FAF7F0] border border-[#E8E3DA]/80"
            >
              <CheckCircle2 className="w-4 h-4 text-[#188567] shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-[#182235] font-normal leading-relaxed">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
