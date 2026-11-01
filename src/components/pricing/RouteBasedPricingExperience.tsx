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
  Shield,
  Clock,
  Car,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Users,
  Luggage,
  Sparkles,
  Banknote,
  Search,
  MessageCircle,
  HelpCircle,
  MapPin,
  Compass,
  Check,
  ChevronDown,
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
      fr: 'Hôtel La Mecque',
      es: 'Hotel La Meca',
      de: 'Hotel Mekka Lobby',
      tr: 'Mekke Otel Lobisi',
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
      ar: 'توديع مريح من بهو الفندق مباشرة لصالة المغادرة المناسبة لرحلتك.',
      en: 'Prompt hotel pickup directly to your specific departure terminal.',
      ms: 'Pengambilan dari lobi hotel terus ke terminal pelepasan anda.',
      id: 'Penjemputan langsung dari hotel menuju terminal keberangkatan Anda.',
      ur: 'ہوٹل سے روانگی ٹرمینل تک بروقت اور آرام دہ رسائی۔',
      fr: 'Prise en charge à l\'hôtel directement vers votre terminal de départ.',
      es: 'Recogida en el hotel directamente hasta su terminal de salida.',
      de: 'Pünktliche Abholung am Hotel direkt zu Ihrem Abflugterminal.',
      tr: 'Otelinizden kalkış terminalinize zamanında ve konforlu transfer.',
      hi: 'होटल लॉबी से आपके प्रस्थान टर्मिनल तक समय पर आरामदायक परिवहन।',
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
      ur: 'شہزادہ محمد بن عبدالعزیز ہوائی اڈہ (مدینہ)',
      fr: 'Aéroport Prince Mohammad Bin Abdulaziz (MED)',
      es: 'Aeropuerto Príncipe Mohammad Bin Abdulaziz (MED)',
      de: 'Flughafen Prinz Mohammad Bin Abdulaziz (MED)',
      tr: 'Prens Muhammed Bin Abdülaziz Havalimanı (MED)',
      hi: 'प्रिंस मोहम्मद बिन अब्दुलअज़ीज़ हवाई अड्डा (MED)',
    },
    destination: {
      ar: 'فنادق المنطقة المركزية بالمدينة المنورة',
      en: 'Madinah Central Hotels (Haram)',
      ms: 'Hotel-hotel Pusat Madinah',
      id: 'Hotel Pusat Madinah (Kawasan Masjid Nabawi)',
      ur: 'مدینہ منورہ مرکزی ہوٹلز',
      fr: 'Hôtels du Centre de Médine (Masjid Nabawi)',
      es: 'Hoteles del Centro de Medina',
      de: 'Hotels in Madina Zentrum',
      tr: 'Medine Merkez Otelleri (Mescid-i Nebevi)',
      hi: 'मदीना केंद्रीय होटल (मस्जिद-ए-नबवी)',
    },
    distanceKm: 25,
    durationApprox: {
      ar: 'حوالي 30 دقيقة',
      en: 'Approx. 30 mins',
      ms: 'Kira-kira 30 minit',
      id: 'Sekitar 30 menit',
      ur: 'تقریباً 30 منٹ',
      fr: 'Env. 30 minutes',
      es: 'Aprox. 30 minutos',
      de: 'Ca. 30 Minuten',
      tr: 'Yaklaşık 30 dakika',
      hi: 'लगभग 30 मिनट',
    },
    miqatNotice: {
      ar: 'استقبال من صالة مطار المدينة وتوصيل سريع ومباشر لباب فندقكم.',
      en: 'Direct Madinah terminal greeting with swift hotel transfer.',
      ms: 'Sambutan terus di terminal Madinah dan penghantaran cepat ke hotel.',
      id: 'Penjemputan langsung di bandara Madinah dan pengantaran ke hotel.',
      ur: 'مدینہ ایئرپورٹ پر استقبال اور ہوٹل تک فوری رسائی۔',
      fr: 'Accueil personnalisé à l\'aéroport et transfert fluide vers votre hôtel.',
      es: 'Recepción directa en el aeropuerto y traslado fluido a su hotel.',
      de: 'Persönlicher Empfang am Flughafen Medina und schneller Hoteltransfer.',
      tr: 'Medine Havalimanı karşılama ve otelinize doğrudan hızlı transfer.',
      hi: 'मदीना हवाई अड्डे पर सीधा स्वागत और होटल तक त्वरित पहुँच।',
    },
  },

  // 2. Intercity
  {
    id: 'makkah-to-madinah',
    category: 'intercity',
    origin: {
      ar: 'مكة المكرمة (الفندق)',
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
      ar: 'المدينة المنورة (الفندق)',
      en: 'Madinah Hotel',
      ms: 'Hotel Madinah',
      id: 'Hotel Madinah',
      ur: 'مدینہ ہوٹل',
      fr: 'Hôtel Médine',
      es: 'Hotel Medina',
      de: 'Hotel Medina',
      tr: 'Medine Oteli',
      hi: 'मदीना होटल',
    },
    distanceKm: 440,
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
      ar: 'طريق الهجرة السريع VIP، استراحة في محطات مجهزة ونظيفة مع مياه ومشروبات مبردة.',
      en: 'VIP Hijrah Expressway travel with pristine rest stop options and chilled beverages.',
      ms: 'Perjalanan Lebuhraya Hijrah VIP dengan rehat di hentian yang bersih dan selesa.',
      id: 'Perjalanan VIP Jalan Tol Hijrah dengan perhentian istirahat bersih dan nyaman.',
      ur: 'وی آئی پی ہجرت ہائی وے سفر، معیاری ریسٹ اسٹاپس اور ٹھنڈے پانی کی سہولت۔',
      fr: 'Voyage VIP sur l\'autoroute de l\'Hégire avec arrêts de repos sélectionnés et rafraîchissements.',
      es: 'Viaje VIP por la autopista Hijrah con paradas en áreas de descanso seleccionadas.',
      de: 'VIP-Reise über die Hijrah-Fernstraße mit sauberen Raststationen und Erfrischungen.',
      tr: 'VIP Hicret Otoyolu yolculuğu, temiz dinlenme tesisleri ve ikramlar.',
      hi: 'वीआईपी हिज्रह हाईवे यात्रा, स्वच्छ विश्राम स्थल और शीतल पेय सुविधा।',
    },
  },
  {
    id: 'madinah-to-makkah',
    category: 'intercity',
    origin: {
      ar: 'المدينة المنورة (الفندق)',
      en: 'Madinah Hotel',
      ms: 'Hotel Madinah',
      id: 'Hotel Madinah',
      ur: 'مدینہ ہوٹل',
      fr: 'Hôtel Médine',
      es: 'Hotel Medina',
      de: 'Hotel Medina',
      tr: 'Medine Oteli',
      hi: 'मदीना होटल',
    },
    destination: {
      ar: 'مكة المكرمة (الفندق)',
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
    distanceKm: 440,
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
      ar: 'يشمل توقفاً مجانياً بميقات ذو الحليفة (آبار علي) للإحرام وصلاة ركعتين دون أي رسوم إضافية.',
      en: 'Includes complimentary stop at Miqat Dhu al-Hulayfah (Bir Ali) for Ihram & prayer without extra charge.',
      ms: 'Termasuk persinggahan percuma di Miqat Dzulhulaifah (Bir Ali) untuk niat Ihram & solat sunat.',
      id: 'Termasuk singgah gratis di Miqat Dzulhulaifah (Bir Ali) untuk Ihram & shalat tanpa biaya tambahan.',
      ur: 'بغیر کسی اضافی چارج کے میقات ذوالحلیفہ (بئر علی) پر احرام و نماز کے لیے مفت توقف شامل ہے۔',
      fr: 'Comprend un arrêt gratuit au Miqat Dhou al-Hulayfah (Bir Ali) pour l\'Ihram et la prière.',
      es: 'Incluye parada gratuita en Miqat Dhu al-Hulayfah (Bir Ali) para el Ihram y la oración.',
      de: 'Inklusive kostenlosem Halt am Miqat Dhu al-Hulayfah (Bir Ali) für Ihram und Gebet.',
      tr: 'İhram ve namaz için Zülhuleyfe (Bir Ali) Mikat noktasında ücretsiz mola dahildir.',
      hi: 'बिना किसी अतिरिक्त शुल्क के एहराम व नमाज़ के लिए मीक़ात ज़ुल-हुलैफ़ा (बीर अली) पर मानार्थ पड़ाव शामिल है।',
    },
  },
  {
    id: 'jeddah-to-madinah',
    category: 'intercity',
    origin: {
      ar: 'جدة (المطار أو المدينة)',
      en: 'Jeddah City or Airport',
      ms: 'Bandar Jeddah atau Lapangan Terbang',
      id: 'Kota Jeddah atau Bandara',
      ur: 'جدہ شہر یا ایئرپورٹ',
      fr: 'Ville ou Aéroport de Djeddah',
      es: 'Ciudad o Aeropuerto de Yeda',
      de: 'Dschidda Stadt oder Flughafen',
      tr: 'Cidde Şehir veya Havalimanı',
      hi: 'जेद्दा शहर या हवाई अड्डा',
    },
    destination: {
      ar: 'المدينة المنورة (الفندق)',
      en: 'Madinah Hotel',
      ms: 'Hotel Madinah',
      id: 'Hotel Madinah',
      ur: 'مدینہ ہوٹل',
      fr: 'Hôtel Médine',
      es: 'Hotel Medina',
      de: 'Hotel Medina',
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
      ar: 'مدينة الطائف (الهدا / الشفا)',
      en: 'Taif City (Al Hada / Al Shafa)',
      ms: 'Bandar Taif (Al Hada / Al Shafa)',
      id: 'Kota Taif (Al Hada / Al Shafa)',
      ur: 'طائف شہر (الھدا / الشفا)',
      fr: 'Ville de Taïf (Al Hada / Al Shafa)',
      es: 'Ciudad de Taif (Al Hada / Al Shafa)',
      de: 'Stadt Taif (Al Hada / Al Shafa)',
      tr: 'Taif Şehri (Al Hada / Al Shafa)',
      hi: 'ताइफ़ शहर (अल हदा / अल शफा)',
    },
    distanceKm: 90,
    durationApprox: {
      ar: 'حوالي 105 دقائق',
      en: 'Approx. 105 mins',
      ms: 'Kira-kira 105 minit',
      id: 'Sekitar 105 menit',
      ur: 'تقریباً 105 منٹ',
      fr: 'Env. 105 minutes',
      es: 'Aprox. 105 minutos',
      de: 'Ca. 105 Minuten',
      tr: 'Yaklaşık 105 dakika',
      hi: 'लगभग 105 मिनट',
    },
    miqatNotice: {
      ar: 'طريق جبل كرا الجبلي الخلاب، سيارات قوية ومكيفة مع سائقين خبراء بالمرتفعات.',
      en: 'Scenic Al Hada mountain pass with powerful climate-controlled vehicles and mountain-trained drivers.',
      ms: 'Laluan pergunungan Al Hada yang indah dengan kenderaan berkuasa tinggi dan pemandu berpengalaman.',
      id: 'Jalur pegunungan Al Hada yang indah dengan kendaraan bertenaga dan supir ahli jalur gunung.',
      ur: 'خوبصورت الھدا پہاڑی راستہ، طاقتور ایئر کنڈیشنڈ گاڑیاں اور ماہر ڈرائیورز۔',
      fr: 'Route de montagne panoramique d\'Al Hada avec véhicules puissants et chauffeurs expérimentés.',
      es: 'Ruta de montaña escénica de Al Hada con vehículos potentes y chóferes expertos en montaña.',
      de: 'Malerische Al Hada-Passstraße mit leistungsstarken Fahrzeugen und gebirgserfahrenen Chauffeuren.',
      tr: 'Güçlü ve klimalı araçlarla manzaralı Al Hada dağ geçidi transferi.',
      hi: 'अल हदा का मनोरम पर्वतीय मार्ग, शक्तिशाली वातानुकूलित वाहन और कुशल चालक।',
    },
  },
  {
    id: 'taif-to-makkah',
    category: 'regional',
    origin: {
      ar: 'الطائف (الهدا / الشفا / المدينة)',
      en: 'Taif (Al Hada / City)',
      ms: 'Taif (Al Hada / Bandar)',
      id: 'Taif (Al Hada / Kota)',
      ur: 'طائف (الھدا / شہر)',
      fr: 'Taïf (Al Hada / Ville)',
      es: 'Taif (Al Hada / Ciudad)',
      de: 'Taif (Al Hada / Stadt)',
      tr: 'Taif (Al Hada / Şehir)',
      hi: 'ताइफ़ (अल हदा / शहर)',
    },
    destination: {
      ar: 'فندق مكة المكرمة (عبر ميقات قرن المنازل)',
      en: 'Makkah Hotel (Via Miqat Qarn al-Manazil)',
      ms: 'Hotel Makkah (Singgah Miqat Qarnul Manazil)',
      id: 'Hotel Makkah (Via Miqat Qarnul Manazil)',
      ur: 'مکہ ہوٹل (براستہ میقات قرن المنازل)',
      fr: 'Hôtel La Mecque (Via Miqat Qarn al-Manazil)',
      es: 'Hotel La Meca (Vía Miqat Qarn al-Manazil)',
      de: 'Hotel Mekka (Über Miqat Qarn al-Manazil)',
      tr: 'Mekke Oteli (Karnülmenazil Mikat Noktası)',
      hi: 'मक्का होटल (मीक़ात क़र्न अल-मनाज़िल होकर)',
    },
    distanceKm: 90,
    durationApprox: {
      ar: 'حوالي 105 دقائق',
      en: 'Approx. 105 mins',
      ms: 'Kira-kira 105 minit',
      id: 'Sekitar 105 menit',
      ur: 'تقریباً 105 منٹ',
      fr: 'Env. 105 minutes',
      es: 'Aprox. 105 minutos',
      de: 'Ca. 105 Minuten',
      tr: 'Yaklaşık 105 dakika',
      hi: 'लगभग 105 मिनट',
    },
    miqatNotice: {
      ar: 'يشمل التوقف بميقات قرن المنازل (السيل الكبير) لنية الإحرام وصلاة ركعتين لمن أراد العمرة.',
      en: 'Includes stop at Miqat Qarn al-Manazil (As-Sayl Al-Kabeer) for Ihram and prayer.',
      ms: 'Termasuk singgah di Miqat Qarnul Manazil (As-Sayl Al-Kabir) untuk niat Ihram & solat sunat.',
      id: 'Termasuk singgah di Miqat Qarnul Manazil (As-Sayl Al-Kabir) untuk Ihram & shalat sunnah.',
      ur: 'عمرہ کے ارادے والوں کے لیے میقات قرن المنازل (السیل الکبیر) پر احرام و نماز کا توقف شامل ہے۔',
      fr: 'Comprend un arrêt au Miqat Qarn al-Manazil (As-Sayl Al-Kabeer) pour l\'Ihram et la prière.',
      es: 'Incluye parada en Miqat Qarn al-Manazil (As-Sayl Al-Kabeer) para el Ihram y la oración.',
      de: 'Inklusive Halt am Miqat Qarn al-Manazil (As-Sayl Al-Kabeer) für Ihram und Gebet.',
      tr: 'Umre niyeti için Karnülmenazil Mikat noktasında duraklama dahildir.',
      hi: 'उमरा की नीयत के लिए मीक़ात क़र्न अल-मनाज़िल (अस-सैल अल-कबीर) पर पड़ाव शामिल है।',
    },
  },
  {
    id: 'jeddah-to-taif',
    category: 'regional',
    origin: {
      ar: 'مطار جدة (KAIA)',
      en: 'Jeddah Airport (KAIA)',
      ms: 'Lapangan Terbang Jeddah (KAIA)',
      id: 'Bandara Jeddah (KAIA)',
      ur: 'جدہ ایئرپورٹ (KAIA)',
      fr: 'Aéroport de Djeddah (KAIA)',
      es: 'Aeropuerto de Yeda (KAIA)',
      de: 'Flughafen Dschidda (KAIA)',
      tr: 'Cidde Havalimanı (KAIA)',
      hi: 'जेद्दा हवाई अड्डा (KAIA)',
    },
    destination: {
      ar: 'الطائف (الهدا)',
      en: 'Taif (Al Hada)',
      ms: 'Taif (Al Hada)',
      id: 'Taif (Al Hada)',
      ur: 'طائف (الھدا)',
      fr: 'Taïf (Al Hada)',
      es: 'Taif (Al Hada)',
      de: 'Taif (Al Hada)',
      tr: 'Taif (Al Hada)',
      hi: 'ताइफ़ (अल हदा)',
    },
    distanceKm: 165,
    durationApprox: {
      ar: 'حوالي 135 دقيقة',
      en: 'Approx. 135 mins',
      ms: 'Kira-kira 135 minit',
      id: 'Sekitar 135 menit',
      ur: 'تقریباً 135 منٹ',
      fr: 'Env. 135 minutes',
      es: 'Aprox. 135 minutos',
      de: 'Ca. 135 Minuten',
      tr: 'Yaklaşık 135 dakika',
      hi: 'लगभग 135 मिनट',
    },
    miqatNotice: {
      ar: 'استقبال من مطار جدة وانطلاق مباشر إلى منتجعات وفنادق الهدا بالطائف.',
      en: 'Direct terminal pickup from Jeddah Airport to Taif and Al Hada resorts.',
      ms: 'Pengambilan terus dari Lapangan Terbang Jeddah ke pusat peranginan Taif.',
      id: 'Penjemputan langsung dari Bandara Jeddah menuju resort dan hotel Taif.',
      ur: 'جدہ ایئرپورٹ سے طائف کے ریزورٹس اور ہوٹلوں تک براہ راست رسائی۔',
      fr: 'Accueil à l\'aéroport de Djeddah et transfert direct vers les complexes de Taïf.',
      es: 'Recogida en el aeropuerto de Yeda y traslado directo a los complejos de Taif.',
      de: 'Direkte Abholung am Flughafen Dschidda zu den Resorts und Hotels in Taif.',
      tr: 'Cidde Havalimanı\'ndan Taif ve Al Hada otellerine doğrudan konforlu transfer.',
      hi: 'जेद्दा हवाई अड्डे से ताइफ़ के रिसॉर्ट और होटलों तक सीधा परिवहन।',
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
      ar: ['تكييف فندقي فائق', 'سائق محترف خبير بالطرق', 'مياه زمزم مبردة مجاناً', 'سعة 3 حقائب سفر كبيرة'],
      en: ['Dual-Zone Climate Control', 'Professional Route Chauffeur', 'Complimentary Chilled Zamzam', 'Fits 3 Standard Suitcases'],
      ms: ['Penghawa Dingin Berkembar', 'Pemandu Rute Profesional', 'Air Zamzam Sejuk Percuma', 'Muat 3 Beg Bagasi'],
      id: ['AC Ganda Super Dingin', 'Sopir Rute Profesional', 'Air Zamzam Dingin Gratis', 'Kapasitas 3 Koper Standar'],
      ur: ['ڈوئل زون طاقتور ایئر کنڈیشننگ', 'راستوں کے ماہر پیشہ ور ڈرائیور', 'ٹھنڈا آب زمزم مفت دستیاب', '3 بڑے سفری بیگز کی گنجائش'],
      fr: ['Climatisation bi-zone puissante', 'Chauffeur d\'itinéraire expert', 'Eau de Zamzam fraîche offerte', 'Capacité 3 valises standards'],
      es: ['Climatizador bizona potente', 'Chófer profesional de ruta', 'Agua Zamzam fría de cortesía', 'Capacidad 3 maletas estándar'],
      de: ['Zwei-Zonen-Klimaautomatik', 'Erfahrener Routen-Chauffeur', 'Gratis gekühltes Zamzam-Wasser', 'Platz für 3 Reisekoffer'],
      tr: ['Çift Bölgeli Güçlü Klima', 'Deneyimli Güzergah Şoförü', 'Ücretsiz Soğuk Zemzem Suyu', '3 Standart Valiz Kapasitesi'],
      hi: ['शक्तिशाली डुअल-ज़ोन एसी', 'मार्गों के अनुभवी पेशेवर चालक', 'मुफ्त शीतल ज़मज़म जल', '3 बड़े सूटकेस की क्षमता'],
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
      ar: 'الأكثر طلباً لعائلات المعتمرين',
      en: 'Most Popular for Umrah Families',
      ms: 'Paling Popular Keluarga Umrah',
      id: 'Pilihan Utama Keluarga Umrah',
      ur: 'عمرہ فیملیز کی پہلی پسند',
      fr: 'Le Plus Populaire pour Familles',
      es: 'El Más Popular para Familias',
      de: 'Beliebteste Wahl für Familien',
      tr: 'Umre Ailelerinin Tercihi',
      hi: 'उमरा परिवारों की पहली पसंद',
    },
    features: {
      ar: ['مقاعد كابتن ملكية مريحة', 'عتبة صعود منخفضة لكبار السن', 'تكييف سقف مركزي بارد', 'سعة 6 حقائب مع كراسي متحركة'],
      en: ['Independent VIP Captain Chairs', 'Low Step-in Easy for Elderly', 'Rear Overhead AC Vents', 'Holds 6 Bags & Folded Wheelchair'],
      ms: ['Kerusi Kapten VIP Selesa', 'Pijakan Rendah Mesra Warga Emas', 'Corong AC Siling Belakang', 'Muat 6 Beg & Kerusi Roda'],
      id: ['Kursi Kapten Mewah Independen', 'Pijakan Rendah Ramah Lansia', 'AC Plafon Baris Belakang', 'Kapasitas 6 Koper & Kursi Roda'],
      ur: ['انتہائی آرام دہ کیپٹن نشستیں', 'بزرگوں کے لیے آسان نچلا پائیدان', 'چھت سے ٹھنڈی ہوا کے وینٹس', '6 بیگز اور فولڈنگ وہیل چیئر کی گنجائش'],
      fr: ['Sièges capitaine indépendants', 'Marchepied bas adapté aux aînés', 'Ventilation de toit arrière', 'Capacité 6 valises & fauteuil roulant'],
      es: ['Asientos individuales de capitán', 'Acceso bajo ideal para mayores', 'Salidas de aire en el techo', 'Capacidad 6 maletas y silla de ruedas'],
      de: ['Bequeme VIP-Kapitänsstühle', 'Niedriger Einstieg für Senioren', 'Dachhimmel-Klimadüsen hinten', 'Platz für 6 Koffer & Faltrollstuhl'],
      tr: ['Bağımsız VIP Kaptan Koltukları', 'Yaşlılar İçin Alçak Giriş Eşiği', 'Arka Tavan Klima Menfezleri', '6 Valiz ve Katlanır Tekerlekli Sandalye'],
      hi: ['आरामदायक वीआईपी कैप्टन कुर्सियाँ', 'बुजुर्गों के लिए सुगम निचला पायदान', 'छत से सीधी ठंडी हवा के वेंट', '6 सूटकेस व व्हीलचेयर की जगह'],
    },
  },
  {
    id: 'yukon',
    name: {
      ar: 'جي إم سي يوكن XL VIP',
      en: 'GMC Yukon XL VIP',
      ms: 'GMC Yukon XL VIP',
      id: 'GMC Yukon XL VIP',
      ur: 'جی ایم سی یوکون XL VIP',
      fr: 'GMC Yukon XL VIP',
      es: 'GMC Yukon XL VIP',
      de: 'GMC Yukon XL VIP',
      tr: 'GMC Yukon XL VIP',
      hi: 'जीएमसी युकोन एक्सएल वीआईपी',
    },
    category: {
      ar: 'دفع رباعي ملكي رئاسي',
      en: 'Presidential Full-Size Luxury SUV',
      ms: 'SUV Mewah Presiden Saiz Penuh',
      id: 'SUV Mewah Presidensial Ukuran Penuh',
      ur: 'پریذیڈنشل فل سائز لگژری ایس یو وی',
      fr: 'Grand SUV de Luxe Présidentiel',
      es: 'SUV de Gran Lujo Presidencial',
      de: 'Präsidenten-Luxus-SUV XL',
      tr: 'Başkanlık Sınıfı Lüks SUV',
      hi: 'प्रेसिडेंशियल फुल-साइज़ लक्जरी एसयूवी',
    },
    passengers: 7,
    luggage: 8,
    image: '/assets/images/vehicles/gmc-yukon-xl/exterior-studio.webp',
    badge: {
      ar: 'الفخامة الملكية والهيبة المطلقة',
      en: 'Presidential VIP Prestige',
      ms: 'Kemewahan Presiden Tertinggi',
      id: 'Kemewahan Presidensial Tertinggi',
      ur: 'شاہی وقار اور بہترین رعب',
      fr: 'Prestige Présidentiel & Espace',
      es: 'Prestigio Presidencial y Espacio',
      de: 'Präsidialer Luxus & Souveränität',
      tr: 'Protokol ve Üstün Prestij',
      hi: 'शाही प्रतिष्ठा व सर्वोत्तम आराम',
    },
    features: {
      ar: ['شاسيه ممتد XL فائق الرحابة', 'زجاج مزدوج عازل للصوت تماماً', 'صندوق أمتعة ضخم لـ 8 حقائب', 'مقاعد جلدية فاخرة مع دعم للظهر'],
      en: ['Extended XL Long Wheelbase', 'Acoustic Laminated Quiet Glass', 'Massive Trunk for 8 Large Bags', 'Supple Leather Lumbar Seating'],
      ms: ['Jarak Roda Panjang XL Luas', 'Kaca Berlapis Penebat Bunyi', 'But Mega untuk 8 Beg Besar', 'Tempat Duduk Kulit Mewah'],
      id: ['Sasis Panjang XL Ekstra Lapang', 'Kaca Akustik Kedap Suara', 'Bagasi Ekstra Muat 8 Koper', 'Kursi Kulit Nappa Nyaman'],
      ur: ['انتہائی کشادہ طویل وہیل بیس XL', 'شور سے مکمل محفوظ ڈبل شیشہ', '8 بڑے بیگز کے لیے وسیع ڈگی', 'آرام دہ چمڑے کی وی آئی پی نشستیں'],
      fr: ['Châssis long XL ultra spacieux', 'Vitrage acoustique insonorisé', 'Coffre géant pour 8 valises', 'Sellerie cuir grand confort'],
      es: ['Batalla larga XL extra espaciosa', 'Cristales acústicos insonorizados', 'Maletero gigante para 8 maletas', 'Tapicería de cuero ergonómica'],
      de: ['Verlängerter XL-Radstand', 'Akustikverglasung für Ruhe', 'Riesiger Kofferraum für 8 Koffer', 'Ergonomische Luxus-Ledersitze'],
      tr: ['Genişletilmiş Uzun XL Şasi', 'Akustik Ses Yalıtımlı Çift Cam', '8 Büyük Valiz İçin Dev Bagaj', 'Üst Sınıf Deri Koltuklar'],
      hi: ['अत्यंत विशाल एक्सएल लॉन्ग व्हीलबेस', 'ध्वनिरोधी डबल लेमिनेटेड ग्लास', '8 बड़े सूटकेस के लिए विशाल बूट', 'उत्कृष्ट लेदर की आरामदायक सीटें'],
    },
  },
  {
    id: 'hiace',
    name: {
      ar: 'تويوتا هايس سوبر جرانديا VIP',
      en: 'Toyota HiAce Super Grandia VIP',
      ms: 'Toyota HiAce Super Grandia VIP',
      id: 'Toyota HiAce Super Grandia VIP',
      ur: 'ٹویوٹا ہائیس سپر گرینڈیا VIP',
      fr: 'Toyota HiAce Super Grandia VIP',
      es: 'Toyota HiAce Super Grandia VIP',
      de: 'Toyota HiAce Super Grandia VIP',
      tr: 'Toyota HiAce Super Grandia VIP',
      hi: 'टोयोटा हायस सुपर ग्रांडिया वीआईपी',
    },
    category: {
      ar: 'حافلة صغيرة VIP للمجموعات الكبيرة',
      en: 'Executive High-Roof Group Van',
      ms: 'Van Kumpulan Eksekutif Bumbung Tinggi',
      id: 'Van Rombongan Atap Tinggi Eksekutif',
      ur: 'ایگزیکٹو ہائی روف گروپ وین',
      fr: 'Minibus Exécutif Toit Surélevé',
      es: 'Furgoneta Ejecutiva Techo Alto',
      de: 'Hochdach-Gruppen-Minibus VIP',
      tr: 'Yüksek Tavanlı Grup Minibüsü VIP',
      hi: 'एक्जीक्यूटिव हाई-रूफ ग्रुप वैन',
    },
    passengers: 10,
    luggage: 10,
    image: '/assets/images/vehicles/toyota-hiace/exterior-studio.webp',
    badge: {
      ar: 'الأفضل للعائلات الكبيرة والوفود',
      en: 'Ideal for Extended Families (10 Pax)',
      ms: 'Paling Sesuai Keluarga Besar (10 Orang)',
      id: 'Terbaik Untuk Rombongan Besar (10 Pax)',
      ur: 'بڑے خاندانوں اور وفود کے لیے بہترین',
      fr: 'Parfait pour Grandes Familles (10 Pax)',
      es: 'Ideal Familias Grandes (10 Pax)',
      de: 'Perfekt für Reisegruppen bis 10 Personen',
      tr: 'Geniş Aileler ve Gruplar İçin İdeal (10 Kişi)',
      hi: 'बड़े परिवारों व समूहों हेतु उत्तम (10 व्यक्ति)',
    },
    features: {
      ar: ['سقف مرتفع يتيح الوقوف والراحة', '10 مقاعد فردية مريحة ومتباعدة', 'مساحة مخصصة لـ 10 حقائب سفر', 'مكيف مركزي أمامي وخلفي مزدوج'],
      en: ['Generous Stand-Up High Roof', '10 Individual Comfortable Seats', 'Spacious Area for 10 Suitcases', 'High-Output Front & Rear AC'],
      ms: ['Bumbung Tinggi Boleh Berdiri', '10 Tempat Duduk Individu', 'Ruang Khas 10 Beg Bagasi', 'AC Depan & Belakang Berkuasa'],
      id: ['Atap Tinggi Lega Leluasa', '10 Kursi Individual Nyaman', 'Ruang Luas Muat 10 Koper', 'AC Ganda Depan & Belakang'],
      ur: ['کھڑے ہونے کے لیے اونچی چھت', '10 آرام دہ انفرادی نشستیں', '10 بڑے بیگز کے لیے وسیع جگہ', 'آگے اور پیچھے طاقتور اے سی'],
      fr: ['Toit surélevé spacieux', '10 sièges individuels confortables', 'Espace pour 10 valises', 'Double climatisation avant/arrière'],
      es: ['Techo alto espacioso', '10 asientos individuales confortables', 'Espacio para 10 maletas', 'Aire acondicionado doble delantero/trasero'],
      de: ['Großzügige Stehhöhe im Innenraum', '10 bequeme Einzelsitze', 'Stauraum für 10 Reisekoffer', 'Doppelklima vorne und hinten'],
      tr: ['Geniş ve Yüksek Tavan Alanı', '10 Konforlu Bağımsız Koltuk', '10 Valiz İçin Geniş Bagaj', 'Güçlü Ön ve Arka Klima'],
      hi: ['आराम से खड़े होने योग्य ऊंची छत', '10 आरामदायक व्यक्तिगत सीटें', '10 बड़े सूटकेस के लिए सुरक्षित जगह', 'आगे व पीछे दोनों तरफ शक्तिशाली एसी'],
    },
  },
  {
    id: 'coaster',
    name: {
      ar: 'تويوتا كوستر ميني باص VIP',
      en: 'Toyota Coaster VIP Minibus',
      ms: 'Bas Mini Toyota Coaster VIP',
      id: 'Minibus Toyota Coaster VIP',
      ur: 'ٹویوٹا کوسٹر منی بس VIP',
      fr: 'Minibus Toyota Coaster VIP',
      es: 'Minibús Toyota Coaster VIP',
      de: 'Toyota Coaster VIP Minibus',
      tr: 'Toyota Coaster VIP Minibüs',
      hi: 'टोयोटा कोस्टर वीआईपी मिनीबस',
    },
    category: {
      ar: 'باص سياحي فاخر للمجموعات والوفود',
      en: 'Luxury Group Touring Minibus (21 Pax)',
      ms: 'Bas Mini Kumpulan Mewah (21 Orang)',
      id: 'Minibus Wisata Rombongan Mewah (21 Pax)',
      ur: 'لگژری ٹورنگ منی بس (21 مسافر)',
      fr: 'Minibus Grand Tourisme VIP (21 Pax)',
      es: 'Minibús Turístico de Lujo (21 Pax)',
      de: 'Luxus-Gruppenreisebus (21 Sitze)',
      tr: 'Lüks Grup Tur Minibüsü (21 Kişi)',
      hi: 'लक्जरी टूरिंग मिनीबस (21 व्यक्ति)',
    },
    passengers: 21,
    luggage: 20,
    image: '/assets/images/vehicles/toyota-coaster/exterior-studio.webp',
    badge: {
      ar: 'الخيار الأول لحملات العمرة والمجموعات',
      en: 'Top Choice for Umrah Groups (21 Pax)',
      ms: 'Pilihan Utama Rombongan Umrah',
      id: 'Pilihan Utama Rombongan Umrah (21 Pax)',
      ur: 'عمرہ قافلوں اور گروپوں کا اولین انتخاب',
      fr: 'Le Meilleur pour Groupes d\'Umrah',
      es: 'Ideal para Grupos y Delegaciones',
      de: 'Erste Wahl für Umrah-Reisegruppen',
      tr: 'Umre Kafileleri İçin En İyi Seçim',
      hi: 'उमरा जत्थों व समूहों की पहली पसंद',
    },
    features: {
      ar: ['21 مقعد مريح قابل للإمالة', 'مكبر صوت ومايكروفون للتوجيه', 'رفوف علوية لحقائب اليد', 'سعة ضخمة لـ 20 حقيبة سفر مع زمزم'],
      en: ['21 High-Comfort Reclining Seats', 'PA System & Microphone for Guide', 'Overhead Parcel Racks', 'Massive Hold for 20 Bags & Zamzam'],
      ms: ['21 Kerusi Rebah Selesa', 'Sistem PA & Mikrofon Panduan', 'Rak Beg Atas Kepala', 'Ruang Muat 20 Beg & Zamzam'],
      id: ['21 Kursi Reclining Nyaman', 'Sound System & Mikrofon Pemandu', 'Rak Bagasi Atas Kepala', 'Kapasitas Luas 20 Koper & Zamzam'],
      ur: ['21 آرام دہ جھکنے والی نشستیں', 'گائیڈ کے لیے مائیک اور پی اے سسٹم', 'اوپری سامان کی الماریاں', '20 بیگز اور آب زمزم کے لیے وسیع جگہ'],
      fr: ['21 sièges inclinables confortables', 'Système micro pour guide', 'Racks à bagages au plafond', 'Soute géante pour 20 valises et Zamzam'],
      es: ['21 asientos reclinables confortables', 'Sistema de megafonía para guía', 'Portaequipajes superior', 'Espacio masivo para 20 maletas y Zamzam'],
      de: ['21 bequeme Liegesitze', 'Beschallungsanlage mit Mikrofon', 'Obere Gepäckablagen', 'Riesiger Laderaum für 20 Koffer & Zamzam'],
      tr: ['21 Konforlu Yatar Koltuk', 'Rehber İçin Anons Sistemi ve Mikrofon', 'Başüstü El Bagajı Rafları', '20 Valiz ve Zemzem İçin Dev Bagaj'],
      hi: ['21 आरामदायक रिक्लाइनिंग सीटें', 'मार्गदर्शक हेतु माइक व साउंड सिस्टम', 'सिर के ऊपर बैग रखने के रैक', '20 बड़े सूटकेस व ज़मज़म का विशाल स्थान'],
    },
  },
];

export const UI_I18N = {
  ar: {
    selectCategory: 'اختر تصنيف مسار الرحلة',
    catAirports: 'خدمات استقبال وتوديع المطارات',
    catIntercity: 'النقل بين مكة والمدينة وجدة',
    catZiyarat: 'مزارات المعالم التاريخية النبوية',
    catRegional: 'طرق الطائف والرياض',
    activeRoute: 'المسار المحدد حالياً',
    changeRoute: 'تغيير المسار',
    viewAllPrices: 'عرض جدول جميع الأسعار المعتمدة',
    hideAllPrices: 'إخفاء جدول الأسعار المعتمدة',
    perVehicleNotice: 'الأسعار ثابتة للمركبة بالكامل وليست للشخص الواحد',
    cashOnArrivalNotice: 'سداد نقدي 100% مباشرة للسائق عند الوصول بعد انتهاء الرحلة (بالريال أو الدولار)',
    zeroDeposit: 'بدون أي عربون أو دفع مسبق أو بطاقة بنكية',
    selectVehicle: 'اختر المركبة المناسبة لحجز هذا المسار',
    fixedFare: 'السعر الثابت للمركبة',
    bookVehicleCTA: 'احجز هذه المركبة الآن',
    sarEquivalent: 'بالريال السعودي:',
    distance: 'المسافة:',
    duration: 'المدة التقديرية:',
    includedTitle: 'ما تشمله الأجرة الثابتة المعتمدة:',
    inclusions: [
      'سعر ثابت ونهائي للمركبة بالكامل دون أي رسوم خفية',
      'سداد نقدي 100% بعد الوصول وفحص الراحة بسلام',
      'كافة رسوم بوابات الطرق السريعة وضريبة القيمة المضافة',
      'تتبع راداري للرحلات وانتظار مجاني 60 دقيقة بالمطارات',
      'عبوات مياه زمزم مبردة ومساعدة كاملة في تحميل الأمتعة',
      'سائقون نظاميون ذوو خبرة عالية بالمسارات والمواقيت',
    ],
    currencyLabel: 'اختر العملة المفضلة:',
    pax: 'ركاب',
    bags: 'حقائب',
    searchRoutePlaceholder: 'ابحث عن مسار أو مدينة (مكة، المدينة، مطار جدة...)...',
    allApprovedRoutesTitle: 'دليل جميع مسارات وأسعار ضيوف الرحمن VIP',
    allApprovedRoutesSubtitle: 'أسعار معتمدة ومحدثة لجميع الوجهات والمركبات',
  },
  en: {
    selectCategory: 'Select Transfer Category',
    catAirports: 'Airport Transfers (JED & MED)',
    catIntercity: 'Intercity Corridors (Makkah & Madinah)',
    catZiyarat: 'Sacred Prophetic Ziyarat Tours',
    catRegional: 'Taif & Riyadh Regional Routes',
    activeRoute: 'Currently Selected Route',
    changeRoute: 'Change Route',
    viewAllPrices: 'View All Approved Routes & Fares Directory',
    hideAllPrices: 'Hide All Routes Directory',
    perVehicleNotice: 'All rates are fixed per vehicle, never per passenger',
    cashOnArrivalNotice: '100% Cash payment directly to chauffeur upon arrival (in SAR or USD)',
    zeroDeposit: 'Zero advance deposit, zero prepayment, no online card required',
    selectVehicle: 'Select Vehicle to Book This Route',
    fixedFare: 'Guaranteed Fixed Fare',
    bookVehicleCTA: 'Book This Vehicle Now',
    sarEquivalent: 'Base in SAR:',
    distance: 'Distance:',
    duration: 'Estimated Duration:',
    includedTitle: 'What is Included in Your Guaranteed Fare:',
    inclusions: [
      'Fixed final rate per entire vehicle with zero hidden charges',
      '100% Cash payment upon safe hotel arrival',
      'All highway toll gates and taxes fully covered',
      'Live flight radar tracking with 60 mins complimentary airport wait',
      'Chilled Zamzam water bottles and complete luggage assistance',
      'Licensed professional chauffeurs expert in Miqat & holy sites',
    ],
    currencyLabel: 'Select Display Currency:',
    pax: 'Passengers',
    bags: 'Bags',
    searchRoutePlaceholder: 'Search route or city (Makkah, Madinah, Jeddah Airport...)...',
    allApprovedRoutesTitle: 'Complete Approved Fares & Routes Directory',
    allApprovedRoutesSubtitle: 'Official verified rates across all vehicles and corridors',
  },
  ms: {
    selectCategory: 'Pilih Kategori Perjalanan',
    catAirports: 'Perkhidmatan Lapangan Terbang (JED & MED)',
    catIntercity: 'Laluan Antara Bandar (Makkah & Madinah)',
    catZiyarat: 'Lawatan Ziarah Nabawi & Tapak Suci',
    catRegional: 'Laluan Wilayah Taif & Riyadh',
    activeRoute: 'Laluan Yang Dipilih',
    changeRoute: 'Tukar Laluan',
    viewAllPrices: 'Lihat Direktori Semua Harga Rasmi',
    hideAllPrices: 'Tutup Direktori Harga Rasmi',
    perVehicleNotice: 'Semua harga adalah tetap bagi setiap kenderaan, bukan per individu',
    cashOnArrivalNotice: 'Bayaran tunai 100% terus kepada pemandu semasa ketibaan (SAR atau USD)',
    zeroDeposit: 'Tanpa deposit awal, tanpa prabayaran, tanpa kad kredit',
    selectVehicle: 'Pilih Kenderaan Untuk Menempah Laluan Ini',
    fixedFare: 'Tambang Tetap Dijamin',
    bookVehicleCTA: 'Tempah Kenderaan Ini',
    sarEquivalent: 'Asas SAR:',
    distance: 'Jarak:',
    duration: 'Anggaran Masa:',
    includedTitle: 'Perkhidmatan Yang Termasuk Dalam Tambang:',
    inclusions: [
      'Harga tetap bagi setiap kenderaan tanpa sebarang caj tersembunyi',
      'Bayaran tunai 100% setelah selamat tiba di hotel',
      'Semua tol lebuhraya dan cukai ditanggung sepenuhnya',
      'Penjejakan radar penerbangan langsung & 60 minit masa menunggu percuma',
      'Air Zamzam sejuk percuma dan bantuan bagasi penuh',
      'Pemandu profesional yang berpengalaman di Tanah Suci',
    ],
    currencyLabel: 'Pilih Mata Wang:',
    pax: 'Penumpang',
    bags: 'Beg',
    searchRoutePlaceholder: 'Cari laluan atau bandar...',
    allApprovedRoutesTitle: 'Direktori Lengkap Tambang & Laluan Duyuf Alrahman VIP',
    allApprovedRoutesSubtitle: 'Kadar rasmi yang disahkan untuk semua kenderaan',
  },
  id: {
    selectCategory: 'Pilih Kategori Perjalanan',
    catAirports: 'Layanan Antar Jemput Bandara (JED & MED)',
    catIntercity: 'Rute Antar Kota (Makkah & Madinah)',
    catZiyarat: 'Tur Ziarah Bersejarah & Makam Nabi',
    catRegional: 'Rute Regional Taif & Riyadh',
    activeRoute: 'Rute Yang Dipilih',
    changeRoute: 'Ganti Rute',
    viewAllPrices: 'Lihat Direktori Semua Tarif Resmi',
    hideAllPrices: 'Tutup Direktori Tarif Resmi',
    perVehicleNotice: 'Semua tarif bersifat tetap per armada mobil, bukan per orang',
    cashOnArrivalNotice: 'Pembayaran tunai 100% langsung ke pengemudi saat tiba (SAR atau USD)',
    zeroDeposit: 'Tanpa uang muka, tanpa kartu kredit, tanpa deposit awal',
    selectVehicle: 'Pilih Armada Untuk Memesan Rute Ini',
    fixedFare: 'Tarif Tetap Terjamin',
    bookVehicleCTA: 'Pesan Armada Ini',
    sarEquivalent: 'Dasar SAR:',
    distance: 'Jarak:',
    duration: 'Estimasi Waktu:',
    includedTitle: 'Fasilitas Yang Termasuk Dalam Tarif:',
    inclusions: [
      'Tarif tetap per kendaraan tanpa biaya tersembunyi',
      'Pembayaran tunai 100% setelah tiba dengan selamat di hotel',
      'Semua tol jalan raya dan pajak sudah termasuk',
      'Pelacakan radar penerbangan langsung & 60 menit gratis tunggu bandara',
      'Air Zamzam dingin gratis dan bantuan bagasi penuh',
      'Sopir resmi bersertifikat dan memahami rute Miqat & tempat ziarah',
    ],
    currencyLabel: 'Pilih Mata Uang:',
    pax: 'Penumpang',
    bags: 'Koper',
    searchRoutePlaceholder: 'Cari rute atau kota...',
    allApprovedRoutesTitle: 'Direktori Lengkap Tarif & Rute Resmi',
    allApprovedRoutesSubtitle: 'Tarif resmi terverifikasi untuk semua armada',
  },
  ur: {
    selectCategory: 'سفر کی کیٹیگری منتخب کریں',
    catAirports: 'ایئرپورٹ ٹرانسفرز (جدہ اور مدینہ)',
    catIntercity: 'شہروں کے درمیان سفر (مکہ اور مدینہ)',
    catZiyarat: 'مقدس نبوی زیارات ٹورز',
    catRegional: 'طائف اور ریاض ریجنل روٹس',
    activeRoute: 'منتخب کردہ راستہ',
    changeRoute: 'راستہ تبدیل کریں',
    viewAllPrices: 'تمام منظور شدہ کرایوں کی فہرست دیکھیں',
    hideAllPrices: 'کرایوں کی فہرست چھپائیں',
    perVehicleNotice: 'تمام کرائے فی گاڑی مقرر ہیں، فی مسافر نہیں',
    cashOnArrivalNotice: 'پہنچنے پر ڈرائیور کو براہ راست 100% نقد ادائیگی (ریال یا ڈالر میں)',
    zeroDeposit: 'بغیر کسی ایڈوانس، پیشگی ادائیگی یا کریڈٹ کارڈ کے',
    selectVehicle: 'اس راستے کے لیے گاڑی کا انتخاب کریں',
    fixedFare: 'مقررہ ضمانتی کرایہ',
    bookVehicleCTA: 'یہ گاڑی ابھی بک کریں',
    sarEquivalent: 'بنیادی قیمت ریال میں:',
    distance: 'فاصلہ:',
    duration: 'متوقع وقت:',
    includedTitle: 'مقررہ کرائے میں کیا شامل ہے:',
    inclusions: [
      'پوری گاڑی کا حتمی مقررہ کرایہ، کوئی پوشیدہ چارجز نہیں',
      'ہوٹل پہنچنے کے بعد 100% نقد ادائیگی کی مکمل آزادی',
      'تمام ہائی وے ٹول ٹیکس اور تمام چارجز شامل ہیں',
      'لائیو فلائٹ ٹریکنگ اور ایئرپورٹ پر 60 منٹ کا مفت انتظار',
      'ٹھنڈا آب زمزم اور سامان اٹھانے میں مکمل معاونت',
      'میقات اور مقدس مقامات سے واقف تجربہ کار بااعتماد ڈرائیورز',
    ],
    currencyLabel: 'کرنسی منتخب کریں:',
    pax: 'مسافر',
    bags: 'بیگز',
    searchRoutePlaceholder: 'راستہ یا شہر تلاش کریں...',
    allApprovedRoutesTitle: 'تمام منظور شدہ راستوں اور کرایوں کی مکمل ڈائریکٹری',
    allApprovedRoutesSubtitle: 'تمام گاڑیوں کے سرکاری تصدیق شدہ نرخ',
  },
  fr: {
    selectCategory: 'Choisir la catégorie de trajet',
    catAirports: 'Transferts Aéroport (JED & MED)',
    catIntercity: 'Trajets Interurbains (La Mecque & Médine)',
    catZiyarat: 'Visites Sacrées de Ziyarat',
    catRegional: 'Liaisons Régionales Taïf & Riyad',
    activeRoute: 'Itinéraire sélectionné',
    changeRoute: 'Changer d\'itinéraire',
    viewAllPrices: 'Voir le répertoire complet des tarifs approuvés',
    hideAllPrices: 'Masquer le répertoire des tarifs',
    perVehicleNotice: 'Tous les tarifs sont fixés par véhicule entier, jamais par passager',
    cashOnArrivalNotice: 'Paiement 100% en espèces directement au chauffeur à l\'arrivée (en SAR ou USD)',
    zeroDeposit: 'Zéro acompte, zéro paiement en ligne, aucune carte requise',
    selectVehicle: 'Choisir le véhicule pour ce trajet',
    fixedFare: 'Tarif Fixe Garanti',
    bookVehicleCTA: 'Réserver ce véhicule',
    sarEquivalent: 'Base en SAR:',
    distance: 'Distance:',
    duration: 'Durée estimée:',
    includedTitle: 'Ce qui est inclus dans votre tarif garanti:',
    inclusions: [
      'Tarif fixe pour l\'ensemble du véhicule sans frais cachés',
      'Paiement en espèces à votre arrivée à l\'hôtel',
      'Péages d\'autoroute et taxes entièrement inclus',
      'Suivi de vol en direct et 60 minutes d\'attente gratuite à l\'aéroport',
      'Bouteilles d\'eau de Zamzam fraîches et aide aux bagages',
      'Chauffeurs professionnels connaissant les Miqats et sites sacrés',
    ],
    currencyLabel: 'Choisir la devise:',
    pax: 'Passagers',
    bags: 'Bagages',
    searchRoutePlaceholder: 'Rechercher un trajet...',
    allApprovedRoutesTitle: 'Répertoire Officiel des Tarifs et Itinéraires',
    allApprovedRoutesSubtitle: 'Tarifs vérifiés pour tous les véhicules et corridors',
  },
  es: {
    selectCategory: 'Seleccione la categoría de traslado',
    catAirports: 'Traslados de Aeropuerto (JED y MED)',
    catIntercity: 'Rutas Interurbanas (La Meca y Medina)',
    catZiyarat: 'Tours Sagrados de Ziyarat',
    catRegional: 'Rutas Regionales Taif y Riad',
    activeRoute: 'Ruta seleccionada',
    changeRoute: 'Cambiar de ruta',
    viewAllPrices: 'Ver directorio completo de tarifas aprobadas',
    hideAllPrices: 'Ocultar directorio de tarifas',
    perVehicleNotice: 'Todas las tarifas son fijas por vehículo, nunca por persona',
    cashOnArrivalNotice: 'Pago 100% en efectivo directamente al chófer a la llegada (en SAR o USD)',
    zeroDeposit: 'Sin depósito previo, sin prepago, sin tarjeta de crédito online',
    selectVehicle: 'Seleccione el vehículo para esta ruta',
    fixedFare: 'Tarifa Fija Garantizada',
    bookVehicleCTA: 'Reservar este vehículo',
    sarEquivalent: 'Base en SAR:',
    distance: 'Distancia:',
    duration: 'Duración estimada:',
    includedTitle: 'Lo que incluye su tarifa garantizada:',
    inclusions: [
      'Tarifa fija final por vehículo sin cargos ocultos',
      'Pago en efectivo al llegar con seguridad a su hotel',
      'Peajes de autopista e impuestos incluidos',
      'Rastreo de vuelos en vivo y 60 min de espera gratuita en aeropuerto',
      'Botellas de agua Zamzam fría y asistencia completa con equipaje',
      'Chóferes profesionales expertos en Miqats y lugares sagrados',
    ],
    currencyLabel: 'Seleccionar moneda:',
    pax: 'Pasajeros',
    bags: 'Maletas',
    searchRoutePlaceholder: 'Buscar ruta o ciudad...',
    allApprovedRoutesTitle: 'Directorio Completo de Rutas y Tarifas Aprobadas',
    allApprovedRoutesSubtitle: 'Tarifas oficiales verificadas para todos los vehículos',
  },
  de: {
    selectCategory: 'Fahrtkategorie auswählen',
    catAirports: 'Flughafentransfers (JED & MED)',
    catIntercity: 'Fernstrecken (Mekka & Medina)',
    catZiyarat: 'Heilige Ziyarat-Besichtigungen',
    catRegional: 'Regionalstrecken Taif & Riad',
    activeRoute: 'Ausgewählte Route',
    changeRoute: 'Route ändern',
    viewAllPrices: 'Vollständiges Tarifverzeichnis anzeigen',
    hideAllPrices: 'Tarifverzeichnis ausblenden',
    perVehicleNotice: 'Alle Preise sind Festpreise pro Fahrzeug, niemals pro Person',
    cashOnArrivalNotice: '100% Barzahlung direkt beim Chauffeur bei Ankunft (in SAR oder USD)',
    zeroDeposit: 'Keine Anzahlung, keine Online-Kreditkarte erforderlich',
    selectVehicle: 'Fahrzeug für diese Route wählen',
    fixedFare: 'Garantierter Festpreis',
    bookVehicleCTA: 'Dieses Fahrzeug buchen',
    sarEquivalent: 'Basis in SAR:',
    distance: 'Entfernung:',
    duration: 'Geschätzte Dauer:',
    includedTitle: 'In Ihrem garantierten Festpreis enthalten:',
    inclusions: [
      'Garantierter Festpreis pro Gesamtfahrzeug ohne versteckte Kosten',
      '100% Barzahlung nach sicherer Ankunft im Hotel',
      'Mautgebühren und Steuern vollständig inbegriffen',
      'Flugradar-Tracking & 60 Minuten kostenlose Wartezeit am Gate',
      'Kostenloses gekühltes Zamzam-Wasser und Gepäckhilfe',
      'Erfahrene Chauffeure mit genauer Kenntnis der Miqat-Stätten',
    ],
    currencyLabel: 'Währung wählen:',
    pax: 'Passagiere',
    bags: 'Koffer',
    searchRoutePlaceholder: 'Route suchen...',
    allApprovedRoutesTitle: 'Offizielles Verzeichnis aller Strecken und Tarife',
    allApprovedRoutesSubtitle: 'Verifizierte Tarife für alle Fahrzeugklassen',
  },
  tr: {
    selectCategory: 'Transfer Kategorisi Seçin',
    catAirports: 'Havalimanı Transferleri (Cidde & Medine)',
    catIntercity: 'Şehirlerarası Hatlar (Mekke & Medine)',
    catZiyarat: 'Kutsal Ziyaret Turları (Ziyarat)',
    catRegional: 'Taif ve Riyad Bölgesel Hatları',
    activeRoute: 'Seçili Güzergah',
    changeRoute: 'Güzergahı Değiştir',
    viewAllPrices: 'Onaylı Tüm Fiyatlar Rehberini Görüntüle',
    hideAllPrices: 'Fiyat Rehberini Gizle',
    perVehicleNotice: 'Tüm fiyatlar araç başınadır, asla kişi başı değildir',
    cashOnArrivalNotice: 'Otele varışta şoföre doğrudan %100 nakit ödeme (SAR veya USD)',
    zeroDeposit: 'Ön ödeme yok, depozito yok, kredi kartı gerekmez',
    selectVehicle: 'Bu Güzergah İçin Araç Seçin',
    fixedFare: 'Garantili Sabit Fiyat',
    bookVehicleCTA: 'Bu Aracı Şimdi Ayırtın',
    sarEquivalent: 'SAR Baz Fiyat:',
    distance: 'Mesafe:',
    duration: 'Tahmini Süre:',
    includedTitle: 'Sabit Fiyata Dahil Olan Hizmetler:',
    inclusions: [
      'Aracın tamamı için net sabit fiyat, gizli masraf yok',
      'Otele güvenle ulaşıldığında doğrudan nakit ödeme',
      'Tüm otoyol geçiş ücretleri ve vergiler dahil',
      'Canlı uçuş takibi ve havalimanında 60 dakika ücretsiz bekleme',
      'Ücretsiz soğuk Zemzem suyu ve bagaj taşıma yardımı',
      'Mikat noktaları ve kutsal mekanlarda uzman şoförler',
    ],
    currencyLabel: 'Para Birimi Seçin:',
    pax: 'Yolcu',
    bags: 'Valiz',
    searchRoutePlaceholder: 'Güzergah veya şehir ara...',
    allApprovedRoutesTitle: 'Duyuf Alrahman VIP Onaylı Güzergah ve Fiyat Rehberi',
    allApprovedRoutesSubtitle: 'Tüm araçlar için doğrulanmış resmi fiyatlar',
  },
  hi: {
    selectCategory: 'यात्रा श्रेणी चुनें',
    catAirports: 'हवाई अड्डा ट्रांसफर (जेद्दा और मदीना)',
    catIntercity: 'अंतर-शहर मार्ग (मक्का और मदीना)',
    catZiyarat: 'पवित्र पैगंबर ज़ियारत टूर',
    catRegional: 'ताइफ़ व रियाद क्षेत्रीय मार्ग',
    activeRoute: 'वर्तमान में चयनित मार्ग',
    changeRoute: 'मार्ग बदलें',
    viewAllPrices: 'सभी स्वीकृत किरायों की निर्देशिका देखें',
    hideAllPrices: 'किराया निर्देशिका छिपाएं',
    perVehicleNotice: 'सभी दरें प्रति वाहन निश्चित हैं, प्रति व्यक्ति नहीं',
    cashOnArrivalNotice: 'होटल पहुँचने पर ड्राइवर को 100% नकद भुगतान (रियाल या डॉलर)',
    zeroDeposit: 'शून्य अग्रिम भुगतान, कोई क्रेडिट कार्ड आवश्यक नहीं',
    selectVehicle: 'इस मार्ग के लिए वाहन चुनें',
    fixedFare: 'निश्चित किराया गारंटी',
    bookVehicleCTA: 'यह वाहन अभी बुक करें',
    sarEquivalent: 'सऊदी रियाल में:',
    distance: 'दूरी:',
    duration: 'अनुमानित समय:',
    includedTitle: 'किराए में क्या शामिल है:',
    inclusions: [
      'पूरे वाहन के लिए अंतिम निश्चित किराया, कोई छिपा शुल्क नहीं',
      'होटल सुरक्षित पहुँचने के बाद 100% नकद भुगतान',
      'सभी हाईवे टोल और टैक्स पूरी तरह शामिल',
      'लाइव फ्लाइट ट्रैकिंग और 60 मिनट की मुफ्त हवाई अड्डा प्रतीक्षा',
      'ठंडा ज़मज़म जल और सामान उठाने में संपूर्ण सहायता',
      'मीक़ात व धार्मिक स्थलों से भलीभाँति परिचित अधिकृत चालक',
    ],
    currencyLabel: 'मुद्रा चुनें:',
    pax: 'यात्री',
    bags: 'सूटकेस',
    searchRoutePlaceholder: 'मार्ग या शहर खोजें...',
    allApprovedRoutesTitle: 'दुयूफ़ अल-रहमान वीआईपी संपूर्ण किराया व मार्ग निर्देशिका',
    allApprovedRoutesSubtitle: 'सभी वाहनों के लिए आधिकारिक सत्यापित दरें',
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
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllDirectory, setShowAllDirectory] = useState(false);

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

  // Search filtered routes
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return availableRoutes.filter((r) => {
      const orig = (r.origin[locale] || r.origin.en || '').toLowerCase();
      const dest = (r.destination[locale] || r.destination.en || '').toLowerCase();
      const name = (LOCALIZED_ROUTE_NAMES[r.id]?.[locale] || '').toLowerCase();
      return orig.includes(q) || dest.includes(q) || name.includes(q);
    });
  }, [availableRoutes, searchQuery, locale]);

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
      {/* 1. CURRENCY SWITCHER & REASSURANCE BANNER */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-[#E8E3DA] shadow-2xs mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FAF7F0] border border-[#C5A15D]/30 flex items-center justify-center text-[#8C6D2D] shrink-0">
            <Banknote className="w-5 h-5 text-[#C5A15D]" />
          </div>
          <div>
            <span className="text-xs sm:text-sm font-bold text-[#101827] block">
              {t.cashOnArrivalNotice}
            </span>
            <span className="text-[11px] text-[#687386]">
              {t.zeroDeposit} • {t.perVehicleNotice}
            </span>
          </div>
        </div>

        {/* Currency Toggle */}
        <div className="flex items-center gap-2 bg-[#FAF7F0] p-1.5 rounded-xl border border-[#E8E3DA] shrink-0">
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

      {/* 2. SECTION B — SELECT YOUR ROUTE */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F0] border border-[#C5A15D]/40 text-xs font-bold text-[#8C6D2D] uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A15D]" />
              <span>{t.selectCategory}</span>
            </div>
            <h2 className="font-playfair font-serif text-2xl sm:text-3xl font-bold text-[#101827]">
              {isAr ? 'اختر وجهتك ومسار رحلتك' : 'Select Your Route & Holy Destination'}
            </h2>
          </div>

          {/* Quick Route Search Input */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchRoutePlaceholder}
              className="w-full h-11 pl-10 pr-4 rtl:pr-10 rtl:pl-4 rounded-xl border border-[#E8E3DA] bg-white text-xs text-[#101827] placeholder-[#8F9CA9] focus:outline-hidden focus:border-[#C5A15D] focus:ring-1 focus:ring-[#C5A15D]"
            />
            <Search className="w-4 h-4 text-[#8F9CA9] absolute left-3.5 rtl:left-auto rtl:right-3.5 top-3.5" />
          </div>
        </div>

        {/* Search Results Dropdown If Searching */}
        {searchQuery.trim().length > 0 && (
          <div className="mb-6 p-4 rounded-2xl bg-white border border-[#C5A15D] shadow-lg">
            <span className="text-xs font-bold text-[#101827] block mb-3">
              {isAr ? 'نتائج البحث عن المسار:' : 'Search Results:'} ({searchResults.length})
            </span>
            {searchResults.length === 0 ? (
              <p className="text-xs text-[#687386]">
                {isAr ? 'لم يتم العثور على مسارات تطابق بحثك.' : 'No routes matched your query.'}
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {searchResults.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => {
                      setSelectedRouteId(r.id);
                      setActiveCategory(r.category);
                      setSearchQuery('');
                    }}
                    className={`p-3 rounded-xl border text-start transition-all ${
                      selectedRouteId === r.id
                        ? 'border-[#C5A15D] bg-[#FAF7F0]'
                        : 'border-[#E8E3DA] bg-white hover:border-[#C5A15D]/60'
                    }`}
                  >
                    <span className="text-xs font-bold text-[#101827] block leading-snug">
                      {LOCALIZED_ROUTE_NAMES[r.id]?.[locale] || r.id}
                    </span>
                    <span className="text-[11px] text-[#687386]">
                      {r.distanceKm} km • {r.durationApprox[locale] || r.durationApprox.en}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 4 CATEGORY TABS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-6">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => handleCategorySwitch(cat.key)}
                className={`flex items-center gap-2.5 p-3 sm:p-4 rounded-xl text-start font-bold transition-all border ${
                  isActive
                    ? 'bg-[#101827] text-white border-[#101827] shadow-sm'
                    : 'bg-white text-[#4B5565] border-[#E8E3DA] hover:border-[#C5A15D] hover:text-[#101827]'
                }`}
              >
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    isActive ? 'bg-[#C5A15D] text-[#101827]' : 'bg-[#FAF7F0] text-[#C5A15D]'
                  }`}
                >
                  {cat.icon}
                </div>
                <span className="text-xs sm:text-sm leading-tight">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* ROUTE CARDS WITHIN ACTIVE CATEGORY */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {categoryRoutes.map((route) => {
            const isSelected = selectedRouteId === route.id;
            const routeTitle = LOCALIZED_ROUTE_NAMES[route.id]?.[locale] || route.id;
            const camryStarting = getVehicleFare(route.id, 'camry');

            return (
              <button
                key={route.id}
                type="button"
                onClick={() => setSelectedRouteId(route.id)}
                className={`relative p-4 sm:p-5 rounded-2xl border text-start transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#FAF7F0] border-[#C5A15D] shadow-md ring-2 ring-[#C5A15D]/20'
                    : 'bg-white border-[#E8E3DA] hover:border-[#C5A15D]/60 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#8C6D2D] bg-white px-2 py-0.5 rounded-full border border-[#E8E3DA]">
                      <MapPin className="w-3 h-3 text-[#C5A15D]" />
                      <span>{route.distanceKm} km</span>
                    </span>
                    {isSelected && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-[#188567] bg-[#E8F5EE] px-2 py-0.5 rounded-full">
                        <Check className="w-3 h-3" />
                        <span>{isAr ? 'محدد' : 'Selected'}</span>
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

                <div className="mt-4 pt-3 border-t border-[#E8E3DA]/80 flex items-center justify-between">
                  <span className="text-[11px] text-[#687386]">
                    {isAr ? 'تبدأ من:' : 'From:'}
                  </span>
                  <span className="text-sm font-black text-[#101827]">
                    {formatPrice(camryStarting)}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. SECTION C — VEHICLE COMPARISON CARDS FOR THE ACTIVE ROUTE */}
      <div className="mb-12">
        <div className="rounded-3xl bg-[#101827] text-white p-6 sm:p-8 mb-8 border border-[#C5A15D]/30 shadow-lg">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold text-[#C5A15D] uppercase tracking-wider block mb-1">
                {t.activeRoute}
              </span>
              <h2 className="font-playfair font-serif text-2xl sm:text-3xl text-white font-bold leading-snug">
                {LOCALIZED_ROUTE_NAMES[activeRoute.id]?.[locale] || activeRoute.id}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mt-2 font-light">
                <span>
                  {t.distance} <strong className="text-white font-bold">{activeRoute.distanceKm} km</strong>
                </span>
                <span>•</span>
                <span>
                  {t.duration} <strong className="text-white font-bold">{activeRoute.durationApprox[locale] || activeRoute.durationApprox.en}</strong>
                </span>
              </div>
            </div>

            <div className="text-start md:text-end shrink-0">
              <span className="text-[10px] text-[#C5A15D] uppercase tracking-widest block font-bold">
                {t.fixedFare}
              </span>
              <span className="text-xs text-slate-300">
                {t.perVehicleNotice}
              </span>
            </div>
          </div>

          {activeRoute.miqatNotice?.[locale] && (
            <div className="mt-4 pt-4 border-t border-white/10 text-xs text-slate-300 flex items-start gap-2 leading-relaxed">
              <Compass className="w-4 h-4 text-[#C5A15D] shrink-0 mt-0.5" />
              <span>{activeRoute.miqatNotice[locale]}</span>
            </div>
          )}
        </div>

        {/* 5 VEHICLE COMPARISON CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                className={`rounded-3xl p-6 flex flex-col justify-between transition-all bg-white border ${
                  isStaria
                    ? 'border-[#C5A15D] ring-2 ring-[#C5A15D]/25 shadow-md relative'
                    : 'border-[#E8E3DA] shadow-xs hover:border-[#C5A15D]/60'
                }`}
              >
                {/* Vehicle Badge */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold text-[#8C6D2D] bg-[#FAF7F0] px-3 py-1 rounded-full uppercase tracking-wider border border-[#C5A15D]/30">
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

                  {/* Vehicle Studio Photography */}
                  <div className="relative w-full h-44 sm:h-48 my-3 rounded-2xl overflow-hidden bg-gradient-to-b from-[#F7F5F0] to-white border border-[#E8E3DA]/60">
                    <Image
                      src={vehicle.image}
                      alt={vehicle.name[locale] || vehicle.name.en}
                      fill
                      className="object-contain p-2 hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  {/* Title & Capacities */}
                  <h3 className="font-playfair font-serif text-xl font-bold text-[#101827] mb-2">
                    {vehicle.name[locale] || vehicle.name.en}
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-[#687386] mb-4 pb-4 border-b border-[#E8E3DA]">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-[#C5A15D]" />
                      <span>
                        {vehicle.passengers} {t.pax}
                      </span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Luggage className="w-4 h-4 text-[#C5A15D]" />
                      <span>
                        {vehicle.luggage} {t.bags}
                      </span>
                    </span>
                  </div>

                  {/* Features Checklist */}
                  <ul className="space-y-2 mb-6">
                    {(vehicle.features[locale] || vehicle.features.en).map((feat, fIdx) => (
                      <li key={fIdx} className="text-xs text-[#4B5565] flex items-start gap-2 font-normal">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A15D] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing Block & Booking CTA */}
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

      {/* 4. SECTION D — WHAT'S INCLUDED IN ALL FARES */}
      <div className="rounded-3xl bg-white p-6 sm:p-8 md:p-10 border border-[#E8E3DA] shadow-xs mb-12">
        <div className="max-w-2xl mb-6">
          <span className="text-xs font-bold text-[#8C6D2D] uppercase tracking-wider block mb-1">
            {isAr ? 'ضمان ضيوف الرحمن VIP' : 'The Royal Assurance'}
          </span>
          <h2 className="font-playfair font-serif text-2xl sm:text-3xl font-bold text-[#101827]">
            {t.includedTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

      {/* 5. SECTION G — ALL APPROVED ROUTES & FARES DIRECTORY (ACCORDION / DIRECTORY) */}
      <div className="mb-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-playfair font-serif text-2xl sm:text-3xl font-bold text-[#101827]">
              {t.allApprovedRoutesTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#687386] mt-1">
              {t.allApprovedRoutesSubtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowAllDirectory((prev) => !prev)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#C5A15D] text-xs font-bold text-[#101827] hover:bg-[#FAF7F0] transition-colors shadow-2xs"
          >
            <span>{showAllDirectory ? t.hideAllPrices : t.viewAllPrices}</span>
            <ChevronDown className={`w-4 h-4 text-[#C5A15D] transition-transform ${showAllDirectory ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {showAllDirectory && (
          <div className="space-y-4">
            {availableRoutes.map((r) => {
              const camryP = getVehicleFare(r.id, 'camry');
              const stariaP = getVehicleFare(r.id, 'staria');
              const hiaceP = getVehicleFare(r.id, 'hiace');
              const yukonP = getVehicleFare(r.id, 'yukon');
              const coasterP = getVehicleFare(r.id, 'coaster');

              return (
                <div
                  key={r.id}
                  className="rounded-2xl bg-white p-5 sm:p-6 border border-[#E8E3DA] shadow-2xs hover:border-[#C5A15D] transition-all"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4 pb-4 border-b border-[#E8E3DA]">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-[#8C6D2D] bg-[#FAF7F0] px-2 py-0.5 rounded-full border border-[#C5A15D]/30 uppercase">
                          {r.category.toUpperCase()}
                        </span>
                        <span className="text-xs text-[#687386]">
                          {r.distanceKm} km • {r.durationApprox[locale] || r.durationApprox.en}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-[#101827]">
                        {LOCALIZED_ROUTE_NAMES[r.id]?.[locale] || r.id}
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedRouteId(r.id);
                        setActiveCategory(r.category);
                        window.scrollTo({ top: 350, behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8C6D2D] hover:text-[#101827] self-start lg:self-auto"
                    >
                      <span>{isAr ? 'مقارنة هذه الرحلة بالأعلى' : 'Compare Above'}</span>
                      {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* 5-Vehicle Price Pills Responsive Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    <div className="p-3 rounded-xl bg-[#FAF7F0] border border-[#E8E3DA] text-center">
                      <span className="text-[10px] font-semibold text-[#687386] block">Camry (4 Pax)</span>
                      <span className="text-sm font-extrabold text-[#101827] block mt-0.5">
                        {formatPrice(camryP)}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#FAF7F0] border border-[#C5A15D]/60 text-center">
                      <span className="text-[10px] font-bold text-[#8C6D2D] block">Staria VIP (7 Pax)</span>
                      <span className="text-sm font-extrabold text-[#101827] block mt-0.5">
                        {formatPrice(stariaP)}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#FAF7F0] border border-[#E8E3DA] text-center">
                      <span className="text-[10px] font-semibold text-[#687386] block">HiAce (10 Pax)</span>
                      <span className="text-sm font-extrabold text-[#101827] block mt-0.5">
                        {formatPrice(hiaceP)}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#FAF7F0] border border-[#E8E3DA] text-center">
                      <span className="text-[10px] font-semibold text-[#687386] block">Yukon XL (7 Pax)</span>
                      <span className="text-sm font-extrabold text-[#101827] block mt-0.5">
                        {formatPrice(yukonP)}
                      </span>
                    </div>

                    {coasterP > 0 ? (
                      <div className="p-3 rounded-xl bg-[#FAF7F0] border border-[#E8E3DA] text-center">
                        <span className="text-[10px] font-semibold text-[#687386] block">Coaster (21 Pax)</span>
                        <span className="text-sm font-extrabold text-[#101827] block mt-0.5">
                          {formatPrice(coasterP)}
                        </span>
                      </div>
                    ) : (
                      <div className="p-3 rounded-xl bg-[#F7F5F0] border border-[#E8E3DA] text-center">
                        <span className="text-[10px] font-semibold text-[#8F9CA9] block">Coaster</span>
                        <span className="text-[11px] font-medium text-[#8F9CA9] block mt-0.5">
                          {isAr ? 'حسب الطلب' : 'On Demand'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
