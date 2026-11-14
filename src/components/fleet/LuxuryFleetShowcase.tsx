'use client';

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { useCurrency } from '@/context/CurrencyContext';
import {
  Users,
  Luggage,
  Snowflake,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  X,
  Camera,
  Sparkles,
  Star,
  MessageCircle,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
} from 'lucide-react';

// ============================================================================
// TYPES & DATA DEFINITIONS
// ============================================================================

export interface ShowcaseFeature {
  title: Record<Locale, string>;
  icon: 'climate' | 'chauffeur' | 'leather' | 'zamzam' | 'space' | 'recline';
}

export interface ShowcasePhoto {
  src: string;
  alt: Record<Locale, string>;
  label: Record<Locale, string>;
}

export interface ShowcaseVehicle {
  id: string;
  slug: string;
  bookingVehicleId: string;
  isConcierge: boolean;
  passengers: number;
  luggage: number;
  startingPriceSAR: number;
  name: Record<Locale, string>;
  categoryBadge: Record<Locale, string>;
  summary: Record<Locale, string>;
  exteriorImage: string;
  gallery: ShowcasePhoto[];
  features: ShowcaseFeature[];
}

// 7 REAL APPROVED VEHICLES (5 DIRECT + 2 CONCIERGE)
export const SHOWCASE_VEHICLES: ShowcaseVehicle[] = [
  // 1. Toyota Camry Executive (Direct)
  {
    id: 'camry',
    slug: 'toyota-camry',
    bookingVehicleId: 'camry',
    isConcierge: false,
    passengers: 3,
    luggage: 3,
    startingPriceSAR: 200,
    name: {
      ar: 'تويوتا كامري التنفيذية',
      en: 'Toyota Camry Executive',
      ms: 'Toyota Camry Eksekutif',
      id: 'Toyota Camry Eksekutif',
      ur: 'ٹویوٹا کیمری ایگزیکٹو',
      fr: 'Toyota Camry Exécutive',
      es: 'Toyota Camry Ejecutiva',
      de: 'Toyota Camry Executive',
      tr: 'Toyota Camry Executive',
      hi: 'टोयोटा कैमरी कार्यकारी',
    },
    categoryBadge: {
      ar: 'سيدان تنفيذية VIP (1–3 ركاب)',
      en: 'VIP Executive Sedan (1–3 Pax)',
      ms: 'Sedan Eksekutif VIP (1–3 Pax)',
      id: 'Sedan Eksekutif VIP (1–3 Pax)',
      ur: 'وی آئی پی ایگزیکٹو سیڈان (1–3 مسافر)',
      fr: 'Berline VIP Exécutive (1–3 Pax)',
      es: 'Sedán VIP Ejecutivo (1–3 Pasajeros)',
      de: 'VIP Executive Limousine (1–3 Pers.)',
      tr: 'VIP Executive Sedan (1–3 Kişi)',
      hi: 'वीआईपी कार्यकारी सेडान (1–3 यात्री)',
    },
    summary: {
      ar: 'الخيار المريح والعملي للأفراد والأزواج والعائلات الصغيرة مع حقائب السفر القياسية.',
      en: 'The prime private choice for solo pilgrims, couples and small families with standard luggage.',
      ms: 'Pilihan peribadi yang selesa untuk jemaah solo, pasangan dan keluarga kecil dengan bagasi biasa.',
      id: 'Pilihan privat yang nyaman untuk jamaah solo, pasangan, dan keluarga kecil dengan koper standar.',
      ur: 'انفرادی زائرین، جوڑوں اور چھوٹے خاندانوں کے لیے آرام دہ اور پرسکون پرائیویٹ انتخاب۔',
      fr: 'Le choix privé optimal pour pèlerins seuls, couples et petites familles avec bagages standards.',
      es: 'La opción privada ideal para peregrinos solos, parejas y familias pequeñas con equipaje estándar.',
      de: 'Die erstklassige Privatwahl für Einzelpilger, Paare und kleine Familien mit Standardgepäck.',
      tr: 'Yalnız seyahat edenler, çiftler ve küçük aileler için ideal özel konfor seçeneği.',
      hi: 'एकल यात्रियों, जोड़ों और छोटे परिवारों के लिए मानक सामान के साथ आदर्श निजी विकल्प।',
    },
    exteriorImage: '/assets/images/vehicles/toyota-camry/exterior-studio.webp',
    gallery: [
      {
        src: '/assets/images/vehicles/toyota-camry/exterior-studio.webp',
        alt: {
          ar: 'تويوتا كامري التنفيذية - استوديو خارجي',
          en: 'Toyota Camry Executive - Exterior Studio',
          ms: 'Toyota Camry Eksekutif - Luaran Studio',
          id: 'Toyota Camry Eksekutif - Eksterior Studio',
          ur: 'ٹویوٹا کیمری ایگزیکٹو - بیرونی منظر',
          fr: 'Toyota Camry Exécutive - Studio Extérieur',
          es: 'Toyota Camry Ejecutiva - Estudio Exterior',
          de: 'Toyota Camry Executive - Exterieur Studio',
          tr: 'Toyota Camry Executive - Stüdyo Dış Görünüm',
          hi: 'टोयोटा कैमरी कार्यकारी - बाहरी स्टूडियो',
        },
        label: {
          ar: 'استوديو خارجي',
          en: 'Exterior Studio',
          ms: 'Luaran Studio',
          id: 'Studio Eksterior',
          ur: 'بیرونی اسٹوڈیو',
          fr: 'Studio Extérieur',
          es: 'Estudio Exterior',
          de: 'Exterieur Studio',
          tr: 'Stüdyo Dış Görünüm',
          hi: 'बाहरी स्टूडियो',
        },
      },
      {
        src: '/assets/images/vehicles/toyota-camry/interior.webp',
        alt: {
          ar: 'تويوتا كامري - المقصورة الداخلية VIP',
          en: 'Toyota Camry - VIP Cabin Interior',
          ms: 'Toyota Camry - Kabin Dalaman VIP',
          id: 'Toyota Camry - Interior Kabin VIP',
          ur: 'ٹویوٹا کیمری - اندرونی کیبن',
          fr: 'Toyota Camry - Intérieur VIP',
          es: 'Toyota Camry - Interior VIP',
          de: 'Toyota Camry - Innenraum VIP',
          tr: 'Toyota Camry - VIP İç Mekan',
          hi: 'टोयोटा कैमरी - आंतरिक केबिन',
        },
        label: {
          ar: 'المقصورة الداخلية',
          en: 'VIP Cabin',
          ms: 'Kabin Dalaman',
          id: 'Kabin VIP',
          ur: 'اندرونی کیبن',
          fr: 'Cabine VIP',
          es: 'Cabina VIP',
          de: 'VIP Kabine',
          tr: 'VIP Kabin',
          hi: 'केबिन',
        },
      },
      {
        src: '/assets/images/vehicles/toyota-camry/interior_seats.jpg',
        alt: {
          ar: 'مقاعد تويوتا كامري المريحة',
          en: 'Toyota Camry Comfortable Leather Seats',
          ms: 'Tempat Duduk Toyota Camry',
          id: 'Kursi Nyaman Toyota Camry',
          ur: 'آرام دہ نشستیں',
          fr: 'Sièges Confortables Toyota Camry',
          es: 'Asientos Cómodos Toyota Camry',
          de: 'Komfortable Sitze Toyota Camry',
          tr: 'Konforlu Koltuklar Toyota Camry',
          hi: 'आरामदायक सीटें',
        },
        label: {
          ar: 'المقاعد الخلفية',
          en: 'Rear Seating',
          ms: 'Tempat Duduk Belakang',
          id: 'Kursi Belakang',
          ur: 'پچھلی نشستیں',
          fr: 'Sièges Arrière',
          es: 'Asientos Traseros',
          de: 'Rücksitzbank',
          tr: 'Arka Koltuklar',
          hi: 'पिछली सीटें',
        },
      },
      {
        src: '/assets/images/vehicles/toyota-camry/exterior_front.jpg',
        alt: {
          ar: 'واجهة تويوتا كامري التنفيذية',
          en: 'Toyota Camry Executive Front Fascia',
          ms: 'Muka Hadapan Toyota Camry',
          id: 'Tampak Depan Toyota Camry',
          ur: 'سامنے کا منظر',
          fr: 'Face Avant Toyota Camry',
          es: 'Frontal Toyota Camry',
          de: 'Frontansicht Toyota Camry',
          tr: 'Ön Tasarım Toyota Camry',
          hi: 'सामने का दृश्य',
        },
        label: {
          ar: 'الواجهة الأمامية',
          en: 'Front View',
          ms: 'Pandangan Hadapan',
          id: 'Tampak Depan',
          ur: 'سامنے کا رخ',
          fr: 'Vue Avant',
          es: 'Vista Frontal',
          de: 'Frontansicht',
          tr: 'Ön Görünüm',
          hi: 'सामने का कोण',
        },
      },
      {
        src: '/assets/images/vehicles/toyota-camry/side_profile.jpg',
        alt: {
          ar: 'الملامح الجانبية لتويوتا كامري',
          en: 'Toyota Camry Sleek Side Profile',
          ms: 'Profil Sisi Toyota Camry',
          id: 'Profil Samping Toyota Camry',
          ur: 'سائیڈ پروفائل',
          fr: 'Profil Latéral Toyota Camry',
          es: 'Perfil Lateral Toyota Camry',
          de: 'Seitenprofil Toyota Camry',
          tr: 'Yan Profil Toyota Camry',
          hi: 'साइड प्रोफाइल',
        },
        label: {
          ar: 'الملف الجانبي',
          en: 'Side Profile',
          ms: 'Profil Sisi',
          id: 'Profil Samping',
          ur: 'سائیڈ ویو',
          fr: 'Profil Latéral',
          es: 'Perfil Lateral',
          de: 'Seitenprofil',
          tr: 'Yan Profil',
          hi: 'साइड प्रोफाइल',
        },
      },
    ],
    features: [
      {
        title: {
          ar: 'تكييف هوائي فائق البرودة',
          en: 'Dual Climate Control',
          ms: 'Penyejuk Hawa Dwi-Zon',
          id: 'AC Ganda Dingin Merata',
          ur: 'بہترین ایئر کنڈیشننگ',
          fr: 'Climatisation Bi-Zone',
          es: 'Climatizador Bizona',
          de: 'Zwei-Zonen-Klimaautomatik',
          tr: 'Çift Bölgeli Klima',
          hi: 'डुअल क्लाइमेट कंट्रोल',
        },
        icon: 'climate',
      },
      {
        title: {
          ar: 'سائق كونسيرج خاص معتمد',
          en: 'Vetted Private Chauffeur',
          ms: 'Pemandu Eksekutif Berpengalaman',
          id: 'Sopir Pribadi Profesional',
          ur: 'ماہر اور معتمد پرائیویٹ ڈرائیور',
          fr: 'Chauffeur Privé Agréé',
          es: 'Chófer Privado Homologado',
          de: 'Geprüfter Privat-Chauffeur',
          tr: 'Deneyimli Özel VIP Şoför',
          hi: 'अनुभवी निजी ड्राइवर',
        },
        icon: 'chauffeur',
      },
      {
        title: {
          ar: 'ضيافة بماء زمزم المبرد',
          en: 'Complimentary Zamzam Water',
          ms: 'Air Zamzam Sejuk Percuma',
          id: 'Air Zamzam Dingin Gratis',
          ur: 'ٹھنڈے آب زمزم کی ضیافت',
          fr: 'Eau de Zamzam Fraîche Offerte',
          es: 'Agua de Zamzam Fría de Cortesía',
          de: 'Gekühltes Zamzam-Wasser Gratis',
          tr: 'İkram Soğuk Zemzem Suyu',
          hi: 'निःशुल्क ठंडा ज़मज़म जल',
        },
        icon: 'zamzam',
      },
      {
        title: {
          ar: 'عزل صوتي ومقاعد مريحة',
          en: 'Quiet & Relaxed Ride',
          ms: 'Perjalanan Tenang & Selesa',
          id: 'Kabin Senyap & Nyaman',
          ur: 'پرسکون اور آرام دہ سفر',
          fr: 'Silence & Confort Supérieur',
          es: 'Viaje Silencioso y Confortable',
          de: 'Ruhige & Sanfte Fahrt',
          tr: 'Sessiz ve Konforlu Sürüş',
          hi: 'शांत व आरामदायक यात्रा',
        },
        icon: 'space',
      },
    ],
  },

  // 2. Hyundai Staria VIP (Direct)
  {
    id: 'staria',
    slug: 'hyundai-staria',
    bookingVehicleId: 'staria',
    isConcierge: false,
    passengers: 5,
    luggage: 6,
    startingPriceSAR: 250,
    name: {
      ar: 'هيونداي ستاريا VIP',
      en: 'Hyundai Staria VIP',
      ms: 'Hyundai Staria VIP',
      id: 'Hyundai Staria VIP',
      ur: 'ہیونڈائی سٹاریا VIP',
      fr: 'Hyundai Staria VIP',
      es: 'Hyundai Staria VIP',
      de: 'Hyundai Staria VIP',
      tr: 'Hyundai Staria VIP',
      hi: 'हुंडई स्टारिया वीआईपी',
    },
    categoryBadge: {
      ar: 'فان عائلي فاخر (4–5 ركاب)',
      en: 'Luxury Family MPV (4–5 Pax)',
      ms: 'MPV Keluarga Mewah (4–5 Pax)',
      id: 'MPV Keluarga Mewah (4–5 Pax)',
      ur: 'لگژری فیملی MPV (4–5 مسافر)',
      fr: 'Monospace Familial Luxe (4–5 Pax)',
      es: 'Monovolumen Familiar VIP (4–5 Pasajeros)',
      de: 'Luxus Familien-Van (4–5 Pers.)',
      tr: 'Lüks Aile MPV (4–5 Kişi)',
      hi: 'लक्जरी पारिवारिक एमपीवी (4–5 यात्री)',
    },
    summary: {
      ar: 'الخيار العائلي الأول المفضل للمعتمرين، مع سهولة تامة في صعود كبار السن وحقائب العائلة.',
      en: 'The prime choice for Umrah families, offering elderly-friendly low-step access and generous luggage space.',
      ms: 'Pilihan utama keluarga Umrah, menawarkan akses mudah untuk warga emas dan ruang kabin luas.',
      id: 'Pilihan utama keluarga Umrah dengan pijakan rendah ramah lansia dan bagasi keluarga yang lega.',
      ur: 'عمرہ خاندانوں کا پہلا انتخاب، بزرگوں کے لیے آسان سواری اور کشادہ سامان کی گنجائش۔',
      fr: 'Le choix privilégié des familles, avec accès surbaissé pour aînés et volume de bagages généreux.',
      es: 'La elección predilecta para familias de Umrah, con escalón bajo para mayores y amplio maletero.',
      de: 'Erste Wahl für Familien mit bequemen Einstieg für Senioren und großzügigem Stauraum.',
      tr: 'Yaşlılar için alçak basamak ve geniş bagaj alanıyla Umre ailelerinin ilk tercihi.',
      hi: 'उमरा परिवारों की पहली पसंद, बुजुर्गों के लिए आसान प्रवेश और विशाल लगेज स्थान।',
    },
    exteriorImage: '/assets/images/vehicles/hyundai-staria/exterior-studio.webp',
    gallery: [
      {
        src: '/assets/images/vehicles/hyundai-staria/exterior-studio.webp',
        alt: {
          ar: 'هيونداي ستاريا VIP - استوديو خارجي',
          en: 'Hyundai Staria VIP - Exterior Studio',
          ms: 'Hyundai Staria VIP - Luaran Studio',
          id: 'Hyundai Staria VIP - Eksterior Studio',
          ur: 'ہیونڈائی سٹاریا VIP - بیرونی منظر',
          fr: 'Hyundai Staria VIP - Studio Extérieur',
          es: 'Hyundai Staria VIP - Estudio Exterior',
          de: 'Hyundai Staria VIP - Exterieur Studio',
          tr: 'Hyundai Staria VIP - Stüdyo Dış Görünüm',
          hi: 'हुंडई स्टारिया वीआईपी - बाहरी स्टूडियो',
        },
        label: {
          ar: 'استوديو خارجي',
          en: 'Exterior Studio',
          ms: 'Luaran Studio',
          id: 'Studio Eksterior',
          ur: 'بیرونی اسٹوڈیو',
          fr: 'Studio Extérieur',
          es: 'Estudio Exterior',
          de: 'Exterieur Studio',
          tr: 'Stüdyo Dış Görünüm',
          hi: 'बाहरी स्टूडियो',
        },
      },
      {
        src: '/assets/images/vehicles/hyundai-staria/interior.webp',
        alt: {
          ar: 'هيونداي ستاريا - المقصورة الفاخرة',
          en: 'Hyundai Staria - Panoramic VIP Interior',
          ms: 'Hyundai Staria - Dalaman Panoramik VIP',
          id: 'Hyundai Staria - Kabin Panoramik VIP',
          ur: 'ہیونڈائی سٹاریا - پینورامک کیبن',
          fr: 'Hyundai Staria - Intérieur Panoramique',
          es: 'Hyundai Staria - Interior Panorámico',
          de: 'Hyundai Staria - Panorama-Innenraum',
          tr: 'Hyundai Staria - Panoramik İç Mekan',
          hi: 'हुंडई स्टारिया - पैनोरमिक केबिन',
        },
        label: {
          ar: 'المقصورة البانورامية',
          en: 'Panoramic Cabin',
          ms: 'Kabin Panoramik',
          id: 'Kabin Panoramik',
          ur: 'پینورامک کیبن',
          fr: 'Cabine Panoramique',
          es: 'Cabina Panorámica',
          de: 'Panorama-Kabine',
          tr: 'Panoramik Kabin',
          hi: 'पैनोरमिक केबिन',
        },
      },
      {
        src: '/assets/images/vehicles/hyundai-staria/interior_seats.jpg',
        alt: {
          ar: 'مقاعد كابتن استرخاء فردية في ستاريا',
          en: 'Hyundai Staria Captain Reclining Seats',
          ms: 'Tempat Duduk Kapten Hyundai Staria',
          id: 'Kursi Kapten Hyundai Staria',
          ur: 'سٹاریا کیپٹن نشستیں',
          fr: 'Sièges Capitaine Hyundai Staria',
          es: 'Asientos Capitán Hyundai Staria',
          de: 'Captain-Seats Hyundai Staria',
          tr: 'Kaptan Koltuklar Hyundai Staria',
          hi: 'कैप्टन आरामदायक सीटें',
        },
        label: {
          ar: 'مقاعد الكابتن',
          en: 'Captain Seats',
          ms: 'Kerusi Kapten',
          id: 'Kursi Kapten',
          ur: 'کیپٹن نشستیں',
          fr: 'Sièges Capitaine',
          es: 'Asientos Capitán',
          de: 'Captain-Seats',
          tr: 'Kaptan Koltuklar',
          hi: 'कैप्टन सीटें',
        },
      },
      {
        src: '/assets/images/vehicles/hyundai-staria/exterior_front.jpg',
        alt: {
          ar: 'الواجهة المستقبلية لهيونداي ستاريا',
          en: 'Futuristic Front Lightbar of Hyundai Staria',
          ms: 'Muka Hadapan Futuristik Hyundai Staria',
          id: 'Tampak Depan Futuristik Hyundai Staria',
          ur: 'ہیونڈائی سٹاریا کا سامنے کا رخ',
          fr: 'Design Avant Futuriste Hyundai Staria',
          es: 'Diseño Frontal Futurista Hyundai Staria',
          de: 'Futuristische Front Hyundai Staria',
          tr: 'Fütüristik Ön Tasarım Hyundai Staria',
          hi: 'हुंडई स्टारिया का फ्रंट व्यू',
        },
        label: {
          ar: 'الواجهة المستقبلية',
          en: 'Futuristic Front',
          ms: 'Hadapan Futuristik',
          id: 'Tampak Depan',
          ur: 'سامنے کا رخ',
          fr: 'Avant Futuriste',
          es: 'Frontal Futurista',
          de: 'Frontdesign',
          tr: 'Ön Tasarım',
          hi: 'सामने का रुख',
        },
      },
      {
        src: '/assets/images/vehicles/hyundai-staria/side_profile.jpg',
        alt: {
          ar: 'الملامح الجانبية لهيونداي ستاريا',
          en: 'Hyundai Staria Streamlined Side View',
          ms: 'Profil Sisi Hyundai Staria',
          id: 'Profil Samping Hyundai Staria',
          ur: 'سٹاریا سائیڈ ویو',
          fr: 'Profil Aérodynamique Hyundai Staria',
          es: 'Perfil Aerodinámico Hyundai Staria',
          de: 'Seitenansicht Hyundai Staria',
          tr: 'Yan Görünüm Hyundai Staria',
          hi: 'स्टारिया साइड प्रोफाइल',
        },
        label: {
          ar: 'الملف الجانبي',
          en: 'Side Profile',
          ms: 'Profil Sisi',
          id: 'Profil Samping',
          ur: 'سائیڈ ویو',
          fr: 'Profil Latéral',
          es: 'Perfil Lateral',
          de: 'Seitenprofil',
          tr: 'Yan Profil',
          hi: 'साइड प्रोफाइल',
        },
      },
    ],
    features: [
      {
        title: {
          ar: 'مقاعد كابتن استرخاء فردية',
          en: 'Captain Reclining Seats',
          ms: 'Kerusi Kapten Selesa',
          id: 'Kursi Kapten Mewah & Empuk',
          ur: 'انفرادی کیپٹن آرام دہ نشستیں',
          fr: 'Fauteuils Capitaine Inclinables',
          es: 'Asientos Capitán Reclinables',
          de: 'Verstellbare Captain-Seats',
          tr: 'Yatırılabilir Kaptan Koltukları',
          hi: 'कैप्टन रिक्लाइनिंग सीटें',
        },
        icon: 'recline',
      },
      {
        title: {
          ar: 'عتبة منخفضة مريحة لكبار السن',
          en: 'Low-Step Elderly Access',
          ms: 'Pijakan Rendah Ramah Warga Emas',
          id: 'Pijakan Rendah Ramah Lansia',
          ur: 'بزرگوں کے لیے آسان کم اونچائی',
          fr: 'Accès Surbaissé Seniors',
          es: 'Escalón Bajo Fácil Acceso',
          de: 'Bequemer Senioren-Einstieg',
          tr: 'Yaşlılar İçin Alçak Giriş',
          hi: 'बुजुर्गों के लिए सुगम प्रवेश',
        },
        icon: 'space',
      },
      {
        title: {
          ar: 'تكييف سقف خلفي مستقل',
          en: 'Independent Rear Climate',
          ms: 'Kawalan Hawa Dingin Belakang',
          id: 'AC Siling Belakang Mandiri',
          ur: 'پچھلی نشستوں کے لیے الگ اے سی',
          fr: 'Climatisation Arrière Dédiée',
          es: 'Clima Trasero Independiente',
          de: 'Separate Fond-Klimaanlage',
          tr: 'Bağımsız Arka Klima Kanalları',
          hi: 'स्वतंत्र रियर एसी कंट्रोल',
        },
        icon: 'climate',
      },
      {
        title: {
          ar: 'سعة رحبة لـ 6 حقائب وعربة أطفال',
          en: 'Holds 6 Large Bags & Stroller',
          ms: 'Muat 6 Beg & Kereta Tolak',
          id: 'Kapasitas 6 Koper & Kursi Roda',
          ur: '6 بڑے بیگز اور وہیل چیئر کی جگہ',
          fr: 'Capacité 6 Valises & Poussette',
          es: 'Espacio para 6 Maletas y Carrito',
          de: 'Platz für 6 Koffer & Kinderwagen',
          tr: '6 Büyük Valiz ve Bebek Arabası Alanı',
          hi: '6 बड़े बैग और ट्रॉली हेतु स्थान',
        },
        icon: 'space',
      },
    ],
  },

  // 3. GMC Yukon XL VIP (Direct)
  {
    id: 'yukon',
    slug: 'gmc-yukon-xl',
    bookingVehicleId: 'yukon',
    isConcierge: false,
    passengers: 7,
    luggage: 8,
    startingPriceSAR: 350,
    name: {
      ar: 'جي إم سي يوكون XL الفاخرة',
      en: 'GMC Yukon XL VIP',
      ms: 'GMC Yukon XL VIP',
      id: 'GMC Yukon XL VIP',
      ur: 'جی ایم سی یوکون XL',
      fr: 'GMC Yukon XL VIP',
      es: 'GMC Yukon XL VIP',
      de: 'GMC Yukon XL VIP',
      tr: 'GMC Yukon XL VIP',
      hi: 'जीएमसी युकोन एक्सएल वीआईपी',
    },
    categoryBadge: {
      ar: 'دفع رباعي رئاسي ممتد (6–7 ركاب)',
      en: 'Presidential Luxury SUV (6–7 Pax)',
      ms: 'SUV Mewah Presiden (6–7 Pax)',
      id: 'SUV Mewah Presidensial (6–7 Pax)',
      ur: 'صدارتی لگژری SUV (6–7 مسافر)',
      fr: 'SUV Présidentiel Luxe (6–7 Pax)',
      es: 'SUV Presidencial VIP (6–7 Pasajeros)',
      de: 'Präsidenten-SUV (6–7 Pers.)',
      tr: 'Başkanlık Lüks SUV (6–7 Kişi)',
      hi: 'राष्ट्रपति स्तर की लक्जरी एसयूवी (6–7 यात्री)',
    },
    summary: {
      ar: 'هيبة رئاسية وراحة فائقة على الطرق السريعة بين جدة ومكة والمدينة لكبار الشخصيات والعائلات.',
      en: 'Presidential stature and supreme highway comfort for VIPs and families traveling between Holy Cities.',
      ms: 'Prestij presidensial dan keselesaan lebuh raya tertinggi untuk VIP dan keluarga Umrah.',
      id: 'Prestise presidensial dan bagasi super lega untuk delegasi VIP serta keluarga jamaah Umrah.',
      ur: 'شاندار صدارتی وقار اور جدہ، مکہ و مدینہ کے شاہراہوں پر بے پناہ آرام۔',
      fr: 'Prestige présidentiel et confort souverain sur autoroute pour VIPs et familles.',
      es: 'Porte presidencial y máximo confort en carretera para VIPs y familias de Umrah.',
      de: 'Präsidiale Souveränität und höchster Fahrkomfort auf den Fernstraßen zwischen den Heiligen Städten.',
      tr: 'VIP konuklar ve aileler için otoyolda üstün konfor ve prestijli seyahat.',
      hi: 'पवित्र शहरों के बीच राजमार्गों पर सर्वोच्च आराम और राष्ट्रपति जैसी गरिमा।',
    },
    exteriorImage: '/assets/images/vehicles/gmc-yukon-xl/exterior-studio.webp',
    gallery: [
      {
        src: '/assets/images/vehicles/gmc-yukon-xl/exterior-studio.webp',
        alt: {
          ar: 'جي إم سي يوكون XL - استوديو خارجي',
          en: 'GMC Yukon XL VIP - Exterior Studio',
          ms: 'GMC Yukon XL VIP - Luaran Studio',
          id: 'GMC Yukon XL VIP - Eksterior Studio',
          ur: 'جی ایم سی یوکون XL - بیرونی منظر',
          fr: 'GMC Yukon XL VIP - Studio Extérieur',
          es: 'GMC Yukon XL VIP - Estudio Exterior',
          de: 'GMC Yukon XL VIP - Exterieur Studio',
          tr: 'GMC Yukon XL VIP - Stüdyo Dış Görünüm',
          hi: 'जीएमसी युकोन एक्सएल वीआईपी - बाहरी स्टूडियो',
        },
        label: {
          ar: 'استوديو خارجي',
          en: 'Exterior Studio',
          ms: 'Luaran Studio',
          id: 'Studio Eksterior',
          ur: 'بیرونی اسٹوڈیو',
          fr: 'Studio Extérieur',
          es: 'Estudio Exterior',
          de: 'Exterieur Studio',
          tr: 'Stüdyo Dış Görünüm',
          hi: 'बाहरी स्टूडियो',
        },
      },
      {
        src: '/assets/images/vehicles/gmc-yukon-xl/interior.webp',
        alt: {
          ar: 'جي إم سي يوكون XL - المقصورة الجلدية الفاخرة',
          en: 'GMC Yukon XL VIP - Luxury Leather Cabin',
          ms: 'GMC Yukon XL VIP - Kabin Mewah Kulit',
          id: 'GMC Yukon XL VIP - Kabin Mewah Kulit',
          ur: 'یوکون XL پریمیم لیدر کیبن',
          fr: 'GMC Yukon XL VIP - Habitacle Cuir Haut de Gamme',
          es: 'GMC Yukon XL VIP - Cabina de Cuero de Lujo',
          de: 'GMC Yukon XL VIP - Luxus-Lederinterieur',
          tr: 'GMC Yukon XL VIP - Lüks Deri Kabin',
          hi: 'युकोन एक्सएल लक्जरी लेदर केबिन',
        },
        label: {
          ar: 'مقصورة الجلد الفاخر',
          en: 'Luxury Cabin',
          ms: 'Kabin Mewah',
          id: 'Kabin Mewah',
          ur: 'لگژری کیبن',
          fr: 'Cabine Luxe',
          es: 'Cabina de Lujo',
          de: 'Luxus-Kabine',
          tr: 'Lüks Kabin',
          hi: 'लक्जरी केबिन',
        },
      },
      {
        src: '/assets/images/vehicles/gmc-yukon-xl/interior_seats.jpg',
        alt: {
          ar: 'صفوف المقاعد الجلدية في يوكون XL',
          en: 'GMC Yukon XL 3-Row Leather Seating',
          ms: '3 Barisan Tempat Duduk GMC Yukon XL',
          id: '3 Baris Kursi Kulit GMC Yukon XL',
          ur: 'تین قطاروں پر مشتمل چمڑے کی نشستیں',
          fr: '3 Rangées de Sièges en Cuir Yukon XL',
          es: '3 Filas de Asientos de Cuero Yukon XL',
          de: '3 Sitzreihen in Leder Yukon XL',
          tr: 'Yukon XL 3 Sıra Deri Koltuk',
          hi: '3 पंक्तियों वाली चमड़ा सीटें',
        },
        label: {
          ar: 'صفوف المقاعد الثلاثة',
          en: '3-Row Seating',
          ms: '3 Baris Kerusi',
          id: '3 Baris Kursi',
          ur: '3 قطاریں نشستیں',
          fr: '3 Rangées',
          es: '3 Filas',
          de: '3 Sitzreihen',
          tr: '3 Sıra Koltuk',
          hi: '3 पंक्तियाँ',
        },
      },
      {
        src: '/assets/images/vehicles/gmc-yukon-xl/exterior_front.jpg',
        alt: {
          ar: 'الواجهة المهيبة لجي إم سي يوكون XL',
          en: 'GMC Yukon XL Imposing Grille & Front Profile',
          ms: 'Pandangan Hadapan Gagah GMC Yukon XL',
          id: 'Tampak Depan Gagah GMC Yukon XL',
          ur: 'سامنے کی شاندار گرل',
          fr: 'Grille Avant Imposante GMC Yukon XL',
          es: 'Frontal Imponente GMC Yukon XL',
          de: 'Imposante Front GMC Yukon XL',
          tr: 'Heybetli Ön Tasarım GMC Yukon XL',
          hi: 'युकोन एक्सएल का फ्रंट लुक',
        },
        label: {
          ar: 'الواجهة الهجومية',
          en: 'Imposing Grille',
          ms: 'Gril Hadapan',
          id: 'Gril Depan',
          ur: 'فرنٹ گرل',
          fr: 'Grille Avant',
          es: 'Parrilla Frontal',
          de: 'Frontgrill',
          tr: 'Ön Izgara',
          hi: 'फ्रंट ग्रिल',
        },
      },
      {
        src: '/assets/images/vehicles/gmc-yukon-xl/side_profile.jpg',
        alt: {
          ar: 'الشاسيه الممتد الطويل ليوكون XL',
          en: 'GMC Yukon XL Extended Long Wheelbase Profile',
          ms: 'Profil Panjang XL GMC Yukon',
          id: 'Profil Sasis Panjang XL GMC Yukon',
          ur: 'لمبا ایکسٹینڈڈ شاسیس',
          fr: 'Profil Empattement Long XL',
          es: 'Perfil Chasis Extendido XL',
          de: 'Langer Radstand XL Profil',
          tr: 'Uzatılmış Uzun Şasi XL Profili',
          hi: 'लंबा एक्सएल व्हीलबेस',
        },
        label: {
          ar: 'الشاسيه الممتد XL',
          en: 'XL Long Wheelbase',
          ms: 'Sasis Panjang XL',
          id: 'Sasis Panjang XL',
          ur: 'لمبا شاسیس',
          fr: 'Châssis Long XL',
          es: 'Chasis Largo XL',
          de: 'XL Radstand',
          tr: 'XL Uzun Şasi',
          hi: 'लंबा व्हीलबेस',
        },
      },
    ],
    features: [
      {
        title: {
          ar: 'شاسيه ممتد XL فسيح للحقائب',
          en: 'Extended XL Wheelbase Space',
          ms: 'Sasis Panjang XL Sangat Luas',
          id: 'Sasis Panjang XL Kapasitas Jumbo',
          ur: 'بڑا ایکسٹینڈڈ شاسیس اور کشادہ جگہ',
          fr: 'Châssis Long XL Espace Supérieur',
          es: 'Chasis Extendido XL Extra Espacioso',
          de: 'Verlängerter XL-Radstand',
          tr: 'Genişletilmiş XL Bagaj Hacmi',
          hi: 'अतिरिक्त विशाल लगेज स्थान',
        },
        icon: 'space',
      },
      {
        title: {
          ar: 'عزل صوتي فائق وزجاج معزول',
          en: 'Acoustic Glass Silence',
          ms: 'Kaca Kedap Bunyi Senyap',
          id: 'Kaca Kedap Suara Akustik',
          ur: 'آواز روکنے والا خصوصی شیشہ',
          fr: 'Vitrage Acoustique Silencieux',
          es: 'Cristal Acústico Silencioso',
          de: 'Akustikverglasung & Ruhe',
          tr: 'Akustik Yalıtımlı Sessiz Camlar',
          hi: 'ध्वनिरोधी शांत केबिन',
        },
        icon: 'leather',
      },
      {
        title: {
          ar: 'مقاعد جلدية بثلاثة صفوف رحبة',
          en: '3 Rows of Luxury Leather',
          ms: '3 Barisan Kulit Mewah',
          id: '3 Baris Kulit Mewah Asli',
          ur: 'چمڑے کی تین قطاروں والی نشستیں',
          fr: '3 Rangées de Cuir Précieux',
          es: '3 Filas de Cuero de Primera',
          de: '3 Sitzreihen in Premium-Leder',
          tr: '3 Sıra Birinci Sınıf Deri',
          hi: '3 पंक्तियों वाली लेदर सीटें',
        },
        icon: 'recline',
      },
      {
        title: {
          ar: 'سعة استثنائية لـ 8 حقائب مع مياه زمزم',
          en: 'Superior Cargo for 8 Bags & Zamzam',
          ms: 'Muat 8 Beg Besar & Kotak Zamzam',
          id: 'Kapasitas 8 Koper Besar & Zamzam',
          ur: '8 بڑے بیگز اور آب زمزم کی گنجائش',
          fr: 'Capacité 8 Valises & Coffrets Zamzam',
          es: 'Capacidad para 8 Maletas y Zamzam',
          de: 'Ladevolumen für 8 Koffer & Zamzam',
          tr: '8 Büyük Valiz ve Zemzem Alanı',
          hi: '8 बड़े बैग और ज़मज़म हेतु विशाल क्षमता',
        },
        icon: 'space',
      },
    ],
  },

  // 4. Toyota HiAce VIP (Direct)
  {
    id: 'hiace',
    slug: 'toyota-hiace',
    bookingVehicleId: 'hiace',
    isConcierge: false,
    passengers: 10,
    luggage: 10,
    startingPriceSAR: 300,
    name: {
      ar: 'تويوتا هايس رويال للمجموعات',
      en: 'Toyota HiAce Royal',
      ms: 'Toyota HiAce Royal',
      id: 'Toyota HiAce Royal',
      ur: 'ٹویوٹا ہائیس رائل',
      fr: 'Toyota HiAce Royal',
      es: 'Toyota HiAce Royal',
      de: 'Toyota HiAce Royal',
      tr: 'Toyota HiAce Royal',
      hi: 'टोयोटा हायस रॉयल',
    },
    categoryBadge: {
      ar: 'حافلة عائلية ومجموعات (حتى 10 ركاب)',
      en: 'Executive Group Van (Up to 10 Pax)',
      ms: 'Van Kumpulan Eksekutif (Hingga 10 Pax)',
      id: 'Van Rombongan Eksekutif (Hingga 10 Pax)',
      ur: 'گروپ وین (10 مسافروں تک)',
      fr: 'Van Groupe Exécutif (Jusqu\'à 10 Pax)',
      es: 'Van Ejecutiva de Grupo (Hasta 10 Pasajeros)',
      de: 'Executive Gruppen-Van (Bis zu 10 Pers.)',
      tr: 'Executive Grup Minibüsü (10 Kişiye Kadar)',
      hi: 'कार्यकारी समूह वैन (10 यात्रियों तक)',
    },
    summary: {
      ar: 'الحل الأمثل والرحيب للعائلات الممتدة ورفقاء العمرة للسفر معاً في سيارة واحدة مريحة.',
      en: 'The spacious, unified transfer solution for extended families and pilgrimage groups traveling together.',
      ms: 'Penyelesaian perjalanan yang luas untuk keluarga besar dan kumpulan jemaah bersama-sama.',
      id: 'Solusi perjalanan bersama yang lapang untuk keluarga besar dan rombongan jamaah dalam satu mobil.',
      ur: 'بڑے خاندانوں اور عمرہ گروپوں کے لیے ایک ساتھ سفر کرنے کا کشادہ اور بہترین حل۔',
      fr: 'La solution unifiée et spacieuse pour familles nombreuses et groupes voyageant ensemble.',
      es: 'La solución espaciosa y confortable para familias numerosas y grupos que viajan juntos.',
      de: 'Die geräumige Gruppenlösung für Großfamilien und Pilgergruppen in einem Fahrzeug.',
      tr: 'Geniş aileler ve Umre gruplarının bir arada konforla seyahat etmesi için ideal çözüm.',
      hi: 'संयुक्त परिवारों और तीर्थयात्री समूहों के लिए एक साथ आरामदायक यात्रा का आदर्श समाधान।',
    },
    exteriorImage: '/assets/images/vehicles/toyota-hiace/exterior-studio.webp',
    gallery: [
      {
        src: '/assets/images/vehicles/toyota-hiace/exterior-studio.webp',
        alt: {
          ar: 'تويوتا هايس رويال - استوديو خارجي',
          en: 'Toyota HiAce Royal - Exterior Studio',
          ms: 'Toyota HiAce Royal - Luaran Studio',
          id: 'Toyota HiAce Royal - Eksterior Studio',
          ur: 'ٹویوٹا ہائیس رائل - بیرونی منظر',
          fr: 'Toyota HiAce Royal - Studio Extérieur',
          es: 'Toyota HiAce Royal - Estudio Exterior',
          de: 'Toyota HiAce Royal - Exterieur Studio',
          tr: 'Toyota HiAce Royal - Stüdyo Dış Görünüm',
          hi: 'टोयोटा हायस रॉयल - बाहरी स्टूडियो',
        },
        label: {
          ar: 'استوديو خارجي',
          en: 'Exterior Studio',
          ms: 'Luaran Studio',
          id: 'Studio Eksterior',
          ur: 'بیرونی اسٹوڈیو',
          fr: 'Studio Extérieur',
          es: 'Estudio Exterior',
          de: 'Exterieur Studio',
          tr: 'Stüdyo Dış Görünüm',
          hi: 'बाहरी स्टूडियो',
        },
      },
      {
        src: '/assets/images/vehicles/toyota-hiace/interior.webp',
        alt: {
          ar: 'تويوتا هايس - المقصورة الرحبة',
          en: 'Toyota HiAce VIP - Spacious Passenger Cabin',
          ms: 'Toyota HiAce VIP - Kabin Penumpang Luas',
          id: 'Toyota HiAce VIP - Kabin Penumpang Lapang',
          ur: 'ٹویوٹا ہائیس کی کشادہ کیبن',
          fr: 'Toyota HiAce VIP - Cabine Passagers Spacieuse',
          es: 'Toyota HiAce VIP - Cabina de Pasajeros Amplia',
          de: 'Toyota HiAce VIP - Großzügiger Fahrgastraum',
          tr: 'Toyota HiAce VIP - Ferah Yolcu Kabini',
          hi: 'टोयोटा हायस का विशाल केबिन',
        },
        label: {
          ar: 'المقصورة الجماعية',
          en: 'Group Cabin',
          ms: 'Kabin Kumpulan',
          id: 'Kabin Rombongan',
          ur: 'گروپ کیبن',
          fr: 'Cabine Groupe',
          es: 'Cabina de Grupo',
          de: 'Fahrgastraum',
          tr: 'Grup Kabini',
          hi: 'समूह केबिन',
        },
      },
      {
        src: '/assets/images/vehicles/toyota-hiace/seats.webp',
        alt: {
          ar: 'ترتيب المقاعد الرحب في تويوتا هايس',
          en: 'Toyota HiAce Ergonomic Seating Layout',
          ms: 'Penataan Kerusi Toyota HiAce',
          id: 'Penataan Kursi Ergonomis Toyota HiAce',
          ur: 'ہائیس کی نشستوں کی ترتیب',
          fr: 'Disposition Confortable des Sièges HiAce',
          es: 'Disposición Ergonómica de Asientos HiAce',
          de: 'Ergonomische Sitzanordnung HiAce',
          tr: 'Ergonomik Koltuk Düzeni HiAce',
          hi: 'हायस की आरामदायक सीट व्यवस्था',
        },
        label: {
          ar: 'ترتيب المقاعد',
          en: 'Seating Layout',
          ms: 'Susunan Kerusi',
          id: 'Susunan Kursi',
          ur: 'نشستوں کی ترتیب',
          fr: 'Disposition Sièges',
          es: 'Distribución',
          de: 'Sitzanordnung',
          tr: 'Koltuk Düzeni',
          hi: 'सीट व्यवस्था',
        },
      },
      {
        src: '/assets/images/vehicles/toyota-hiace/exterior_front.jpg',
        alt: {
          ar: 'الواجهة المرتفعة لتويوتا هايس',
          en: 'Toyota HiAce High-Roof Front View',
          ms: 'Tampak Hadapan Toyota HiAce',
          id: 'Tampak Depan Toyota HiAce',
          ur: 'سامنے کا منظر',
          fr: 'Vue Avant Toit Haut HiAce',
          es: 'Vista Frontal Techo Alto HiAce',
          de: 'Frontansicht Hochdach HiAce',
          tr: 'Yüksek Tavan Ön Görünüm HiAce',
          hi: 'हायस का फ्रंट लुक',
        },
        label: {
          ar: 'الواجهة الأمامية',
          en: 'Front View',
          ms: 'Pandangan Hadapan',
          id: 'Tampak Depan',
          ur: 'سامنے کا رخ',
          fr: 'Vue Avant',
          es: 'Vista Frontal',
          de: 'Frontansicht',
          tr: 'Ön Görünüm',
          hi: 'सामने का कोण',
        },
      },
    ],
    features: [
      {
        title: {
          ar: 'سعة 10 ركاب بمقاعد مريحة',
          en: 'Comfortable 10-Passenger Cabin',
          ms: '10 Penumpang Sangat Selesa',
          id: 'Kapasitas 10 Penumpang Nyaman',
          ur: '10 مسافروں کے لیے آرام دہ جگہ',
          fr: 'Capacité 10 Passagers Spacieuse',
          es: 'Capacidad Cómoda 10 Pasajeros',
          de: '10 vollwertige Komfort-Sitzplätze',
          tr: '10 Kişilik Konforlu Yolcu Kapasitesi',
          hi: '10 यात्रियों के लिए आरामदायक सीटें',
        },
        icon: 'space',
      },
      {
        title: {
          ar: 'تكييف سقف مركزي مزدوج قوي',
          en: 'Roof Multi-Vent Heavy A/C',
          ms: 'Corong AC Siling Setiap Baris',
          id: 'AC Siling Sentral Dingin Maksimal',
          ur: 'چھت کے طاقتور ایئر کنڈیشننگ وینٹس',
          fr: 'Climatisation Plafonnier Puissante',
          es: 'Climatización Central en Techo',
          de: 'Leistungsstarke Dachklimaanlage',
          tr: 'Tavan Boyu Çift Kanallı Güçlü Klima',
          hi: 'छत पर लगा शक्तिशाली मल्टी-वेंट एसी',
        },
        icon: 'climate',
      },
      {
        title: {
          ar: 'مساحة مخصصة لـ 10 حقائب سفر كبيرة',
          en: 'Dedicated 10-Bag Luggage Space',
          ms: 'Ruang Khas 10 Beg Besar',
          id: 'Ruang Khusus 10 Koper Besar',
          ur: '10 بڑے بیگز کے لیے مخصوص جگہ',
          fr: 'Espace Dédié pour 10 Grandes Valises',
          es: 'Espacio Exclusivo para 10 Maletas',
          de: 'Separates Abteil für 10 große Koffer',
          tr: '10 Büyük Valiz İçin Özel Bagaj Alanı',
          hi: '10 बड़े बैग हेतु समर्पित स्थान',
        },
        icon: 'space',
      },
      {
        title: {
          ar: 'سقف مرتفع يتيح حرية الحركة',
          en: 'High-Roof Cabin Freedom',
          ms: 'Bumbung Tinggi Mudah Bergerak',
          id: 'Atap Tinggi Leluasa Bergerak',
          ur: 'اونچی چھت اور آسانی سے حرکت',
          fr: 'Toit Surélevé Mobilité Facile',
          es: 'Techo Alto Movilidad Sencilla',
          de: 'Hohes Dach für bequemes Bewegen',
          tr: 'Yüksek Tavan ile Rahat Hareket İmkanı',
          hi: 'हाई-रूफ से सुगम आवागमन',
        },
        icon: 'recline',
      },
    ],
  },

  // 5. Toyota Coaster VIP Coach (Direct)
  {
    id: 'coaster',
    slug: 'toyota-coaster',
    bookingVehicleId: 'coaster',
    isConcierge: false,
    passengers: 21,
    luggage: 20,
    startingPriceSAR: 500,
    name: {
      ar: 'حافلة تويوتا كوستر VIP',
      en: 'Toyota Coaster VIP Coach',
      ms: 'Bas Mini Toyota Coaster VIP',
      id: 'Minibus Toyota Coaster VIP',
      ur: 'ٹویوٹا کوسٹر وی آئی پی کوچ',
      fr: 'Minibus Toyota Coaster VIP',
      es: 'Minibús Toyota Coaster VIP',
      de: 'Toyota Coaster VIP Minibus',
      tr: 'Toyota Coaster VIP Minibüs',
      hi: 'टोयोटा कोस्टर वीआईपी मिनीबस',
    },
    categoryBadge: {
      ar: 'حافلة وفود وحملات (حتى 21 راكب)',
      en: 'VIP Delegation Coach (Up to 21 Pax)',
      ms: 'Bas Rombongan VIP (Hingga 21 Pax)',
      id: 'Bus Delegasi VIP (Hingga 21 Pax)',
      ur: 'وی آئی پی وفود کوچ (21 مسافروں تک)',
      fr: 'Minibus Délégation VIP (Jusqu\'à 21 Pax)',
      es: 'Minibús Delegación VIP (Hasta 21 Pasajeros)',
      de: 'VIP Delegations-Bus (Bis zu 21 Pers.)',
      tr: 'VIP Heyet Otobüsü (21 Kişiye Kadar)',
      hi: 'वीआईपी प्रतिनिधिमंडल कोच (21 यात्रियों तक)',
    },
    summary: {
      ar: 'حافلة خاصة فاخرة ومكيفة لنقل الوفود الكبيرة وحملات العمرة بين المطارات والفنادق والمزارات.',
      en: 'A premier private luxury coach for large tour delegations traveling seamlessly between airports, hotels and Ziyarat.',
      ms: 'Bas mini mewah persendirian untuk rombongan jemaah antara lapangan terbang, hotel dan ziarah.',
      id: 'Pilihan utama rombongan jamaah besar dengan pendingin kabin merata dan bagasi super besar.',
      ur: 'بڑے وفود اور قافلوں کے لیے ایئرپورٹس، ہوٹلوں اور زیارات کے درمیان لگژری سفر۔',
      fr: 'Minibus de prestige dédié aux délégations et groupes de pèlerinage pour transferts et Ziyarat.',
      es: 'Minibús privado de lujo para grupos grandes entre aeropuertos, hoteles y visitas de Ziyarat.',
      de: 'Der exklusive Reisebus für größere Pilgerdelegationen zwischen Flughafen, Hotel und Ziyarat.',
      tr: 'Büyük Umre kafileleri için havalimanı, otel ve Ziyaret turlarında özel lüks otobüs.',
      hi: 'बड़े प्रतिनिधिमंडलों और तीर्थयात्री समूहों के लिए एयरपोर्ट, होटल और ज़ियारत हेतु लक्जरी कोच।',
    },
    exteriorImage: '/assets/images/vehicles/toyota-coaster/exterior-studio.webp',
    gallery: [
      {
        src: '/assets/images/vehicles/toyota-coaster/exterior-studio.webp',
        alt: {
          ar: 'حافلة تويوتا كوستر VIP - استوديو خارجي',
          en: 'Toyota Coaster VIP Coach - Exterior Studio',
          ms: 'Toyota Coaster VIP Coach - Luaran Studio',
          id: 'Toyota Coaster VIP Coach - Eksterior Studio',
          ur: 'ٹویوٹا کوسٹر وی آئی پی - بیرونی منظر',
          fr: 'Toyota Coaster VIP Coach - Studio Extérieur',
          es: 'Toyota Coaster VIP Coach - Estudio Exterior',
          de: 'Toyota Coaster VIP Minibus - Exterieur Studio',
          tr: 'Toyota Coaster VIP Minibüs - Stüdyo Dış Görünüm',
          hi: 'टोयोटा कोस्टर वीआईपी कोच - बाहरी स्टूडियो',
        },
        label: {
          ar: 'استوديو خارجي',
          en: 'Exterior Studio',
          ms: 'Luaran Studio',
          id: 'Studio Eksterior',
          ur: 'بیرونی اسٹوڈیو',
          fr: 'Studio Extérieur',
          es: 'Estudio Exterior',
          de: 'Exterieur Studio',
          tr: 'Stüdyo Dış Görünüm',
          hi: 'बाहरी स्टूडियो',
        },
      },
      {
        src: '/assets/images/vehicles/toyota-coaster/interior.webp',
        alt: {
          ar: 'المقصورة المكيفة لحافلة تويوتا كوستر',
          en: 'Toyota Coaster Executive VIP Cabin',
          ms: 'Kabin Eksekutif Toyota Coaster VIP',
          id: 'Kabin Eksekutif Toyota Coaster VIP',
          ur: 'کوسٹر کی ایگزیکٹو کیبن',
          fr: 'Habitacle Exécutif Toyota Coaster',
          es: 'Cabina Ejecutiva Toyota Coaster',
          de: 'Fahrgastraum Toyota Coaster',
          tr: 'Toyota Coaster Executive Kabin',
          hi: 'टोयोटा कोस्टर कार्यकारी केबिन',
        },
        label: {
          ar: 'المقصورة التنفيذية',
          en: 'Executive Cabin',
          ms: 'Kabin Eksekutif',
          id: 'Kabin Eksekutif',
          ur: 'ایگزیکٹو کیبن',
          fr: 'Cabine Exécutive',
          es: 'Cabina Ejecutiva',
          de: 'Fahrgastraum',
          tr: 'Executive Kabin',
          hi: 'कार्यकारी केबिन',
        },
      },
      {
        src: '/assets/images/vehicles/toyota-coaster/interior_seats.jpg',
        alt: {
          ar: 'المقاعد المريحة لحافلة كوستر',
          en: 'Toyota Coaster Comfortable Coach Seats',
          ms: 'Kerusi Bas Toyota Coaster',
          id: 'Kursi Bus Rebah Toyota Coaster',
          ur: 'کوسٹر کی کشادہ نشستیں',
          fr: 'Sièges Confortables Toyota Coaster',
          es: 'Asientos Confortables Coaster',
          de: 'Komfort-Bestuhlung Coaster',
          tr: 'Konforlu Otobüs Koltukları Coaster',
          hi: 'कोस्टर की आरामदायक बस सीटें',
        },
        label: {
          ar: 'المقاعد المريحة',
          en: 'Coach Seats',
          ms: 'Kerusi Bas',
          id: 'Kursi Bus',
          ur: 'کوچ نشستیں',
          fr: 'Sièges Bus',
          es: 'Asientos',
          de: 'Reisebestuhlung',
          tr: 'Otobüs Koltukları',
          hi: 'बस सीटें',
        },
      },
      {
        src: '/assets/images/vehicles/toyota-coaster/side_profile.jpg',
        alt: {
          ar: 'الملامح الجانبية لحافلة كوستر',
          en: 'Toyota Coaster Full Coach Profile',
          ms: 'Profil Sisi Penuh Toyota Coaster',
          id: 'Profil Samping Toyota Coaster',
          ur: 'کوسٹر کا سائیڈ ویو',
          fr: 'Profil Intégral Minibus Coaster',
          es: 'Perfil Completo Minibús Coaster',
          de: 'Vollständiges Profil Minibus Coaster',
          tr: 'Tam Yan Profil Minibüs Coaster',
          hi: 'कोस्टर का साइड प्रोफाइल',
        },
        label: {
          ar: 'الملف الجانبي الكامل',
          en: 'Coach Profile',
          ms: 'Profil Bas',
          id: 'Profil Bus',
          ur: 'کوچ پروفائل',
          fr: 'Profil Minibus',
          es: 'Perfil Minibús',
          de: 'Seitenprofil',
          tr: 'Otobüs Profili',
          hi: 'कोच प्रोफाइल',
        },
      },
    ],
    features: [
      {
        title: {
          ar: 'سعة 21 مقعداً مريحاً للرحلات الطويلة',
          en: '21 Long-Distance Seats',
          ms: '21 Kerusi Selesa Perjalanan Jauh',
          id: '21 Kursi Empuk Perjalanan Panjang',
          ur: 'طویل سفر کے لیے 21 آرام دہ نشستیں',
          fr: '21 Sièges Confort Longue Distance',
          es: '21 Asientos para Largas Distancias',
          de: '21 bequeme Langstreckensitze',
          tr: '21 Uzun Yol Konfor Koltuğu',
          hi: 'लंबी दूरी के लिए 21 आरामदायक सीटें',
        },
        icon: 'recline',
      },
      {
        title: {
          ar: 'ممر وسطي رحب وسهل التنقل',
          en: 'Easy-Access Central Aisle',
          ms: 'Lorong Tengah Luas & Mudah',
          id: 'Lorong Tengah Luas & Leluasa',
          ur: 'آسان اور کشادہ درمیانی راستہ',
          fr: 'Allée Centrale Spacieuse',
          es: 'Pasillo Central Amplio',
          de: 'Breiter Mittelgang',
          tr: 'Geniş ve Ferah Orta Koridor',
          hi: 'आसान केंद्रीय गलियारा',
        },
        icon: 'space',
      },
      {
        title: {
          ar: 'تكييف عالي الكفاءة يغطي كامل الحافلة',
          en: 'Multi-Zone Comprehensive A/C',
          ms: 'Sistem AC Menyeluruh Berkuasa',
          id: 'AC Sentral Bertenaga Tinggi',
          ur: 'مکمل بس کے لیے مرکزی ٹھنڈک',
          fr: 'Climatisation Intégrale Haute Capacité',
          es: 'Clima Integral de Gran Capacidad',
          de: 'Flächendeckende Hochleistungs-Klima',
          tr: 'Tüm Aracı Kapsayan Güçlü Klima',
          hi: 'पूरे कोच में व्यापक हाई-पावर एसी',
        },
        icon: 'climate',
      },
      {
        title: {
          ar: 'سعة خلفية هائلة لـ 20 حقيبة وزمزم',
          en: 'Holds 20 Large Bags & Zamzam',
          ms: 'Muat 20 Beg Besar & Kotak Zamzam',
          id: 'Muat 20 Koper Besar & Zamzam',
          ur: '20 بڑے بیگز اور آب زمزم کی گنجائش',
          fr: 'Capacité 20 Grandes Valises & Zamzam',
          es: 'Capacidad 20 Maletas Grandes y Zamzam',
          de: 'Gepäckraum für 20 Koffer & Zamzam',
          tr: '20 Büyük Valiz ve Zemzem Kutusu Alanı',
          hi: '20 बड़े बैग और ज़मज़म हेतु विशाल क्षमता',
        },
        icon: 'space',
      },
    ],
  },

  // 6. Mercedes-Maybach S-Class VIP (Concierge Only)
  {
    id: 'maybach',
    slug: 'mercedes-maybach',
    bookingVehicleId: 'maybach',
    isConcierge: true,
    passengers: 3,
    luggage: 3,
    startingPriceSAR: 0,
    name: {
      ar: 'مرسيدس مايباخ S-Class VIP',
      en: 'Mercedes-Maybach S-Class VIP',
      ms: 'Mercedes-Maybach S-Class VIP',
      id: 'Mercedes-Maybach S-Class VIP',
      ur: 'مرسڈیز میباخ S-Class VIP',
      fr: 'Mercedes-Maybach Classe S VIP',
      es: 'Mercedes-Maybach Clase S VIP',
      de: 'Mercedes-Maybach S-Klasse VIP',
      tr: 'Mercedes-Maybach S-Serisi VIP',
      hi: 'मर्सिडीज-मेबैक एस-क्लास वीआईपी',
    },
    categoryBadge: {
      ar: '★ كونسيرج خاص • درجة أولى رئاسية (1–3 ركاب)',
      en: '★ VIP Concierge • Ultra VIP First Class (1–3 Pax)',
      ms: '★ Konsierj VIP • Kelas Pertama Presidensial (1–3 Pax)',
      id: '★ Concierge VIP • Kelas Satu Presidensial (1–3 Pax)',
      ur: '★ وی آئی پی کونسیرج • فرسٹ کلاس صدارتی (1–3 مسافر)',
      fr: '★ Concierge VIP • Première Classe Présidentielle (1–3 Pax)',
      es: '★ Conserjería VIP • Primera Clase Presidencial (1–3 Pasajeros)',
      de: '★ VIP-Concierge • First Class Präsidial (1–3 Pers.)',
      tr: '★ VIP Konsiyerj • Başkanlık Birinci Sınıf (1–3 Kişi)',
      hi: '★ वीआईपी कंसीयज • प्रथम श्रेणी राष्ट्रपति स्तर (1–3 यात्री)',
    },
    summary: {
      ar: 'قمة الفخامة والخصوصية المطلقة لكبار الشخصيات ورجال الأعمال مع مقاعد الدرجة الأولى الفاخرة وسائق كونسيرج خاص.',
      en: 'The pinnacle of presidential luxury and discretion for dignitaries, featuring first-class reclining seats and private concierge chauffeur.',
      ms: 'Kemuncak kemewahan presidensial dengan kerusi rehat kelas pertama dan ketenangan perjalanan mutlak.',
      id: 'Puncak kemewahan presidensial dengan kursi rebah kelas satu dan ketenangan perjalanan paripurna.',
      ur: 'انتہائی درجے کی صدارتی لگژری، فرسٹ کلاس نشستیں اور خصوصی کونسیرج سروس۔',
      fr: 'Le summum du luxe présidentiel et de la discrétion, avec sièges première classe et chauffeur concierge.',
      es: 'El cenit del lujo presidencial y la privacidad para dignatarios, con asientos de primera clase.',
      de: 'Der Gipfel präsidialen Luxus mit First-Class-Liegesitzen und exklusivem Concierge-Chauffeur.',
      tr: 'Birinci sınıf yatırılabilir koltuklar ve özel konsiyerj şoförüyle başkanlık lüksünün zirvesi.',
      hi: 'गणमान्य व्यक्तियों के लिए राष्ट्रपति स्तर की लक्जरी और पूर्ण गोपनीयता का शिखर।',
    },
    exteriorImage: '/assets/images/vehicles/mercedes-maybach/exterior-studio.webp',
    gallery: [
      {
        src: '/assets/images/vehicles/mercedes-maybach/exterior-studio.webp',
        alt: {
          ar: 'مرسيدس مايباخ S-Class VIP - استوديو خارجي',
          en: 'Mercedes-Maybach S-Class VIP - Exterior Studio',
          ms: 'Mercedes-Maybach S-Class VIP - Luaran Studio',
          id: 'Mercedes-Maybach S-Class VIP - Eksterior Studio',
          ur: 'مرسڈیز میباخ VIP - بیرونی منظر',
          fr: 'Mercedes-Maybach S-Class VIP - Studio Extérieur',
          es: 'Mercedes-Maybach S-Class VIP - Estudio Exterior',
          de: 'Mercedes-Maybach S-Class VIP - Exterieur Studio',
          tr: 'Mercedes-Maybach S-Serisi VIP - Stüdyo Dış Görünüm',
          hi: 'मर्सिडीज-मेबैक वीआईपी - बाहरी स्टूडियो',
        },
        label: {
          ar: 'استوديو خارجي',
          en: 'Exterior Studio',
          ms: 'Luaran Studio',
          id: 'Studio Eksterior',
          ur: 'بیرونی اسٹوڈیو',
          fr: 'Studio Extérieur',
          es: 'Estudio Exterior',
          de: 'Exterieur Studio',
          tr: 'Stüdyo Dış Görünüm',
          hi: 'बाहरी स्टूडियो',
        },
      },
      {
        src: '/assets/images/vehicles/mercedes-maybach/interior.webp',
        alt: {
          ar: 'مقصورة الدرجة الأولى في مرسيدس مايباخ',
          en: 'Mercedes-Maybach First-Class Executive Cabin',
          ms: 'Kabin Eksekutif Kelas Pertama Mercedes-Maybach',
          id: 'Kabin Eksekutif Kelas Satu Mercedes-Maybach',
          ur: 'مايباخ کی فرسٹ کلاس کیبن',
          fr: 'Cabine Première Classe Mercedes-Maybach',
          es: 'Cabina Primera Clase Mercedes-Maybach',
          de: 'First-Class-Kabine Mercedes-Maybach',
          tr: 'Mercedes-Maybach Birinci Sınıf Kabin',
          hi: 'मेबैक प्रथम श्रेणी केबिन',
        },
        label: {
          ar: 'مقصورة الدرجة الأولى',
          en: 'First-Class Cabin',
          ms: 'Kabin Kelas Pertama',
          id: 'Kabin Kelas Satu',
          ur: 'فرسٹ کلاس کیبن',
          fr: 'Première Classe',
          es: 'Primera Clase',
          de: 'First Class',
          tr: 'Birinci Sınıf Kabin',
          hi: 'प्रथम श्रेणी केबिन',
        },
      },
      {
        src: '/assets/images/vehicles/mercedes-maybach/interior_seats.jpg',
        alt: {
          ar: 'مقاعد جلد نابا الفاخرة مع الاسترخاء التام في مايباخ',
          en: 'Mercedes-Maybach Nappa Leather Reclining Lounge Seats',
          ms: 'Kerusi Kulit Nappa Mercedes-Maybach',
          id: 'Kursi Kulit Nappa Mercedes-Maybach',
          ur: 'مايباخ ناپا چمڑے کی پرتعیش نشستیں',
          fr: 'Sièges Lounge Cuir Nappa Maybach',
          es: 'Asientos Lounge Cuero Nappa Maybach',
          de: 'Nappa-Leder Lounge-Sitze Maybach',
          tr: 'Maybach Nappa Deri Lounge Koltuklar',
          hi: 'मेबैक नापा लेदर लाउंज सीटें',
        },
        label: {
          ar: 'مقاعد لاونج نابا',
          en: 'Nappa Lounge Seats',
          ms: 'Kerusi Lounge Nappa',
          id: 'Kursi Lounge Nappa',
          ur: 'ناپا نشستیں',
          fr: 'Sièges Nappa',
          es: 'Asientos Nappa',
          de: 'Nappa-Sitze',
          tr: 'Nappa Koltuklar',
          hi: 'नापा लेदर सीटें',
        },
      },
      {
        src: '/assets/images/vehicles/mercedes-maybach/exterior_front.jpg',
        alt: {
          ar: 'الشبك الأمامي الأيقوني لمرسيدس مايباخ',
          en: 'Iconic Front Chrome Grille of Mercedes-Maybach',
          ms: 'Gril Krom Ikonik Mercedes-Maybach',
          id: 'Gril Krom Ikonik Mercedes-Maybach',
          ur: 'مايباخ کی فرنٹ کروم گرل',
          fr: 'Calandre Chromée Emblématique Maybach',
          es: 'Parrilla Cromada Emblemática Maybach',
          de: 'Ikonischer Chromgrill Maybach',
          tr: 'İkonik Ön Krom Izgara Maybach',
          hi: 'मेबैक का क्रोम फ्रंट ग्रिल',
        },
        label: {
          ar: 'الواجهة الأيقونية',
          en: 'Iconic Front',
          ms: 'Hadapan Ikonik',
          id: 'Tampak Depan Ikonik',
          ur: 'آئیکونک فرنٹ',
          fr: 'Avant Emblématique',
          es: 'Frontal Icónico',
          de: 'Ikonische Front',
          tr: 'İkonik Ön Görünüm',
          hi: 'आईकॉनिक फ्रंट',
        },
      },
      {
        src: '/assets/images/vehicles/mercedes-maybach/side_profile.jpg',
        alt: {
          ar: 'الملامح الجانبية الملكية لمرسيدس مايباخ',
          en: 'Royal Side Profile of Mercedes-Maybach',
          ms: 'Profil Sisi Diraja Mercedes-Maybach',
          id: 'Profil Samping Diraja Mercedes-Maybach',
          ur: 'مايباخ کا شاہی سائیڈ ویو',
          fr: 'Silhouette Royale Mercedes-Maybach',
          es: 'Silueta Real Mercedes-Maybach',
          de: 'Königliches Seitenprofil Maybach',
          tr: 'Kraliyet Yan Profili Maybach',
          hi: 'मेबैक का शाही साइड प्रोफाइल',
        },
        label: {
          ar: 'الملف الجانبي الملكي',
          en: 'Royal Profile',
          ms: 'Profil Diraja',
          id: 'Profil Diraja',
          ur: 'شاہی سائیڈ ویو',
          fr: 'Profil Royal',
          es: 'Perfil Real',
          de: 'Königliches Profil',
          tr: 'Kraliyet Profili',
          hi: 'शाही प्रोफाइल',
        },
      },
    ],
    features: [
      {
        title: {
          ar: 'مقاعد استرخاء درجة أولى مع مساج',
          en: 'First-Class Reclining Seats',
          ms: 'Kerusi Rehat Kelas Pertama',
          id: 'Kursi Rebah Kelas Satu & Pijat',
          ur: 'فرسٹ کلاس ریکلایننگ نشستیں',
          fr: 'Sièges Première Classe Inclinables',
          es: 'Asientos Reclinables Primera Clase',
          de: 'First-Class-Liegesitze mit Massage',
          tr: 'Masajlı Birinci Sınıf Koltuklar',
          hi: 'मसाज सहित प्रथम श्रेणी सीटें',
        },
        icon: 'recline',
      },
      {
        title: {
          ar: 'جلد نابا فائق النعومة وخشب فاخر',
          en: 'Ultra-Fine Nappa Leather & Wood',
          ms: 'Kulit Nappa & Kemasan Kayu',
          id: 'Kulit Nappa & Panel Kayu Mewah',
          ur: 'پریمیم ناپا چمڑا اور خوبصورت لکڑی',
          fr: 'Cuir Nappa Exclusif & Boiseries',
          es: 'Cuero Nappa Exclusivo y Madera',
          de: 'Exklusives Nappaleder & Edelholz',
          tr: 'Özel Nappa Deri ve Ahşap Kaplama',
          hi: 'अल्ट्रा-फाइन नापा लेदर फिनिश',
        },
        icon: 'leather',
      },
      {
        title: {
          ar: 'سائق كونسيرج خاص بالزي الرسمي',
          en: 'Bespoke Uniformed Chauffeur',
          ms: 'Pemandu Berseragam Rasmi',
          id: 'Sopir Eksekutif Berseragam',
          ur: 'سرکاری وردی میں ملبوس خصوصی ڈرائیور',
          fr: 'Chauffeur Concierge en Uniforme',
          es: 'Chófer de Uniforme Exclusivo',
          de: 'Uniformierter Concierge-Chauffeur',
          tr: 'Özel Üniformalı VIP Şoför',
          hi: 'वर्दीधारी विशेष कंसीयज ड्राइवर',
        },
        icon: 'chauffeur',
      },
      {
        title: {
          ar: 'ضيافة فضية بماء زمزم المبرد',
          en: 'Silver Chilled Zamzam Service',
          ms: 'Servis Air Zamzam Sejuk Eksklusif',
          id: 'Layanan Perak Air Zamzam Dingin',
          ur: 'خصوصی ٹھنڈا آب زمزم سروس',
          fr: 'Service d’Eau de Zamzam Argentée',
          es: 'Servicio Exclusivo de Agua Zamzam',
          de: 'Exklusiver Zamzam-Silberservice',
          tr: 'Özel Soğuk Zemzem Servisi',
          hi: 'विशेष ठंडा ज़मज़म सिल्वर सर्विस',
        },
        icon: 'zamzam',
      },
    ],
  },

  // 7. Hyundai H1 Starex VIP (Concierge Only)
  {
    id: 'h1',
    slug: 'hyundai-h1',
    bookingVehicleId: 'h1',
    isConcierge: true,
    passengers: 7,
    luggage: 6,
    startingPriceSAR: 0,
    name: {
      ar: 'هيونداي H1 ستاريكس VIP',
      en: 'Hyundai H1 Starex VIP',
      ms: 'Hyundai H1 Starex VIP',
      id: 'Hyundai H1 Starex VIP',
      ur: 'ہیونڈائی H1 سٹاریکس VIP',
      fr: 'Hyundai H1 Starex VIP',
      es: 'Hyundai H1 Starex VIP',
      de: 'Hyundai H1 Starex VIP',
      tr: 'Hyundai H1 Starex VIP',
      hi: 'हुंडई H1 स्टारेक्स वीआईपी',
    },
    categoryBadge: {
      ar: '★ كونسيرج خاص • فان عائلي رحب (حتى 7 ركاب)',
      en: '★ VIP Concierge • Practical Family Van (Up to 7 Pax)',
      ms: '★ Konsierj VIP • Minivan Keluarga Praktikal (Hingga 7 Pax)',
      id: '★ Concierge VIP • Minivan Keluarga Lapang (Hingga 7 Pax)',
      ur: '★ وی آئی پی کونسیرج • فیملی وین (7 مسافروں تک)',
      fr: '★ Concierge VIP • Minivan Familial Spacieux (Jusqu\'à 7 Pax)',
      es: '★ Conserjería VIP • Miniván Familiar Confortable (Hasta 7 Pax)',
      de: '★ VIP-Concierge • Geräumiger Familien-Van (Bis zu 7 Pers.)',
      tr: '★ VIP Konsiyerj • Geniş Aile Minivanı (7 Kişiye Kadar)',
      hi: '★ वीआईपी कंसीयज • विशाल पारिवारिक वैन (7 यात्रियों तक)',
    },
    summary: {
      ar: 'فان عائلي عملي ومريح متاح للطلبات الخاصة مع أبواب سحابية ومساحة ممتازة للحقائب والعائلة.',
      en: 'Reliable, practical family minivan available upon special request, featuring sliding access doors and generous cargo capacity.',
      ms: 'Minivan keluarga praktikal yang luas dengan pintu gelongsor dan ruang bagasi lapang.',
      id: 'Minivan keluarga yang tangguh dengan pintu geser, AC dingin merata, dan ruang bagasi lapang.',
      ur: 'سلائیڈنگ ڈورز اور کشادہ سامان کی جگہ کے ساتھ خصوصی فیملی وین۔',
      fr: 'Minivan familial fiable et pratique avec portes coulissantes et volume de chargement appréciable.',
      es: 'Miniván familiar práctico y confortable con puertas correderas y gran espacio de carga.',
      de: 'Praktischer und geräumiger Familienvan mit Schiebetüren für bequemen Zustieg.',
      tr: 'Kayar kapıları ve geniş bagaj alanıyla özel talep üzerine sunulan pratik aile minivanı.',
      hi: 'स्लाइडिंग दरवाजों और विशाल लगेज क्षमता वाली व्यावहारिक पारिवारिक वैन।',
    },
    exteriorImage: '/assets/images/vehicles/hyundai-h1/exterior-studio.webp',
    gallery: [
      {
        src: '/assets/images/vehicles/hyundai-h1/exterior-studio.webp',
        alt: {
          ar: 'هيونداي H1 ستاريكس VIP - استوديو خارجي',
          en: 'Hyundai H1 Starex VIP - Exterior Studio',
          ms: 'Hyundai H1 Starex VIP - Luaran Studio',
          id: 'Hyundai H1 Starex VIP - Eksterior Studio',
          ur: 'ہیونڈائی H1 سٹاریکس VIP - بیرونی منظر',
          fr: 'Hyundai H1 Starex VIP - Studio Extérieur',
          es: 'Hyundai H1 Starex VIP - Estudio Exterior',
          de: 'Hyundai H1 Starex VIP - Exterieur Studio',
          tr: 'Hyundai H1 Starex VIP - Stüdyo Dış Görünüm',
          hi: 'हुंडई H1 स्टारेक्स वीआईपी - बाहरी स्टूडियो',
        },
        label: {
          ar: 'استوديو خارجي',
          en: 'Exterior Studio',
          ms: 'Luaran Studio',
          id: 'Studio Eksterior',
          ur: 'بیرونی اسٹوڈیو',
          fr: 'Studio Extérieur',
          es: 'Estudio Exterior',
          de: 'Exterieur Studio',
          tr: 'Stüdyo Dış Görünüm',
          hi: 'बाहरी स्टूडियो',
        },
      },
      {
        src: '/assets/images/vehicles/hyundai-h1/interior.webp',
        alt: {
          ar: 'المقصورة الداخلية لهيونداي H1',
          en: 'Hyundai H1 VIP - Spacious Passenger Cabin',
          ms: 'Kabin Hyundai H1 Starex VIP',
          id: 'Kabin Hyundai H1 Starex VIP',
          ur: 'ہیونڈائی H1 اندرونی کیبن',
          fr: 'Habitacle Hyundai H1 Starex',
          es: 'Cabina Hyundai H1 Starex',
          de: 'Innenraum Hyundai H1',
          tr: 'Hyundai H1 VIP İç Mekan',
          hi: 'हुंडई H1 का केबिन',
        },
        label: {
          ar: 'المقصورة العائلية',
          en: 'Family Cabin',
          ms: 'Kabin Keluarga',
          id: 'Kabin Keluarga',
          ur: 'فیملی کیبن',
          fr: 'Cabine Famille',
          es: 'Cabina Familiar',
          de: 'Familien-Innenraum',
          tr: 'Aile Kabini',
          hi: 'पारिवारिक केबिन',
        },
      },
      {
        src: '/assets/images/vehicles/hyundai-h1/interior_seats.jpg',
        alt: {
          ar: 'مقاعد هيونداي H1 المريحة',
          en: 'Hyundai H1 Comfortable Passenger Seating',
          ms: 'Tempat Duduk Hyundai H1',
          id: 'Kursi Penumpang Hyundai H1',
          ur: 'H1 کی آرام دہ نشستیں',
          fr: 'Disposition des Sièges Hyundai H1',
          es: 'Asientos Confortables Hyundai H1',
          de: 'Komfortsitze Hyundai H1',
          tr: 'Hyundai H1 Konforlu Koltuklar',
          hi: 'H1 की आरामदायक सीटें',
        },
        label: {
          ar: 'المقاعد المريحة',
          en: 'Comfort Seats',
          ms: 'Kerusi Selesa',
          id: 'Kursi Nyaman',
          ur: 'آرام دہ نشستیں',
          fr: 'Sièges Confort',
          es: 'Asientos Confort',
          de: 'Komfortsitze',
          tr: 'Konforlu Koltuklar',
          hi: 'आरामदायक सीटें',
        },
      },
      {
        src: '/assets/images/vehicles/hyundai-h1/exterior_front.jpg',
        alt: {
          ar: 'الواجهة الأمامية لهيونداي H1',
          en: 'Hyundai H1 Front Grille & Headlamps',
          ms: 'Tampak Hadapan Hyundai H1',
          id: 'Tampak Depan Hyundai H1',
          ur: 'سامنے کا منظر',
          fr: 'Face Avant Hyundai H1',
          es: 'Frontal Hyundai H1',
          de: 'Frontansicht Hyundai H1',
          tr: 'Ön Görünüm Hyundai H1',
          hi: 'सामने का दृश्य',
        },
        label: {
          ar: 'الواجهة الأمامية',
          en: 'Front View',
          ms: 'Pandangan Hadapan',
          id: 'Tampak Depan',
          ur: 'سامنے کا رخ',
          fr: 'Vue Avant',
          es: 'Vista Frontal',
          de: 'Frontansicht',
          tr: 'Ön Görünüm',
          hi: 'सामने का रुख',
        },
      },
    ],
    features: [
      {
        title: {
          ar: 'تكييف هواء مزدوج عالي التبريد',
          en: 'Dual High-Power Climate',
          ms: 'AC Ganda Berkuasa Tinggi',
          id: 'AC Ganda Bertenaga Tinggi',
          ur: 'طاقتور ڈبل ایئر کنڈیشننگ',
          fr: 'Climatisation Double Puissance',
          es: 'Doble Climatización Potente',
          de: 'Duale Hochleistungs-Klimaanlage',
          tr: 'Yüksek Performanslı Çift Klima',
          hi: 'डुअल हाई-पावर एसी सिस्टम',
        },
        icon: 'climate',
      },
      {
        title: {
          ar: 'أبواب جانبية منزلقة لسهولة الركوب',
          en: 'Sliding Side Access Doors',
          ms: 'Pintu Gelongsor Mudah Masuk',
          id: 'Pintu Geser Lebar & Praktis',
          ur: 'آسان داخلے کے لیے سلائیڈنگ دروازے',
          fr: 'Portes Coulissantes Latérales',
          es: 'Puertas Correderas Laterales',
          de: 'Seitliche Schiebetüren',
          tr: 'Kolay Biniş İçin Kayar Yan Kapılar',
          hi: 'सुगम प्रवेश हेतु स्लाइडिंग दरवाजे',
        },
        icon: 'space',
      },
      {
        title: {
          ar: 'سعة 7 ركاب براحة وسهولة',
          en: '7-Passenger Cabin Capacity',
          ms: 'Kapasiti 7 Penumpang Selesa',
          id: 'Kapasitas 7 Penumpang Luas',
          ur: '7 مسافروں کے لیے آرام دہ گنجائش',
          fr: 'Capacité 7 Passagers Aisée',
          es: 'Capacidad para 7 Pasajeros',
          de: 'Platz für bis zu 7 Personen',
          tr: '7 Kişilik Konforlu Alan',
          hi: '7 यात्रियों के लिए उपयुक्त क्षमता',
        },
        icon: 'space',
      },
      {
        title: {
          ar: 'مساحة خلفية ممتازة لـ 6 حقائب',
          en: 'Spacious Trunk for 6 Bags',
          ms: 'Ruang Bagasi Lapang 6 Beg',
          id: 'Ruang Bagasi Lapang 6 Koper Besar',
          ur: '6 بڑے بیگز کے لیے کشادہ ڈگی',
          fr: 'Coffre Spacieux pour 6 Valises',
          es: 'Maletero Espacioso para 6 Maletas',
          de: 'Geräumiger Kofferraum für 6 Koffer',
          tr: '6 Valiz İçin Geniş Bagaj Hacmi',
          hi: '6 बैग हेतु विशाल बूट स्पेस',
        },
        icon: 'space',
      },
    ],
  },
];

// ============================================================================
// 10-LOCALE UI STRINGS DICTIONARY
// ============================================================================

const SHOWCASE_I18N: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filterDirect: string;
    filterConcierge: string;
    badgeDirect: string;
    badgeConcierge: string;
    fromPrice: string;
    conciergeQuote: string;
    bookNow: string;
    whatsappInquiry: string;
    viewGallery: string;
    photosLabel: string;
    passengers: string;
    bags: string;
    prevCar: string;
    nextCar: string;
    closeModal: string;
    prevPhoto: string;
    nextPhoto: string;
    photoCounter: string;
    cashOnArrival: string;
    whatsappMessagePrefix: string;
  }
> = {
  ar: {
    eyebrow: 'أسطول ضيوف الرحمن الملكي الفاخر',
    title: 'اختر فئة رحلتك الملكية الخاصة',
    subtitle: 'أسطول معقم وفائق الفخامة، وسائقون معتمدون، وضيافة بماء زمزم المبرد لرحلة روحانية استثنائية بين الحرمين الشريفين.',
    filterAll: 'كافة الأسطول (7)',
    filterDirect: 'حجز فوري مباشر (5)',
    filterConcierge: 'كونسيرج خاص VIP (2)',
    badgeDirect: 'حجز مباشر فوري',
    badgeConcierge: '★ كونسيرج خاص • عند الطلب',
    fromPrice: 'يبدأ من',
    conciergeQuote: 'تسعير مخصص عند الطلب',
    bookNow: 'احجز هذه المركبة',
    whatsappInquiry: 'استفسار VIP عبر واتساب',
    viewGallery: 'عرض استوديو الصور',
    photosLabel: 'صور حقيقية',
    passengers: 'ركاب',
    bags: 'حقائب',
    prevCar: 'المركبة السابقة',
    nextCar: 'المركبة التالية',
    closeModal: 'إغلاق المعرض',
    prevPhoto: 'الصورة السابقة',
    nextPhoto: 'الصورة التالية',
    photoCounter: 'من',
    cashOnArrival: 'الدفع نقداً للسائق عند الوصول • 0% دفعة مقدمة',
    whatsappMessagePrefix: 'السلام عليكم، أود الاستفسار عن حجز سيارة كونسيرج خاصة مع سائق VIP لرحلة الحرمين: ',
  },
  en: {
    eyebrow: 'THE SOVEREIGN LUXURY FLEET',
    title: 'Choose Your Sovereign Umrah Class',
    subtitle: 'Meticulously maintained, vetted executive chauffeurs, and complimentary chilled Zamzam water for an unparalleled journey between the Holy Cities.',
    filterAll: 'All Vehicles (7)',
    filterDirect: 'Direct Booking (5)',
    filterConcierge: 'VIP Concierge (2)',
    badgeDirect: 'Direct Instant Booking',
    badgeConcierge: '★ VIP Concierge • Upon Request',
    fromPrice: 'From',
    conciergeQuote: 'Custom Concierge Quote',
    bookNow: 'Book This Vehicle',
    whatsappInquiry: 'WhatsApp VIP Inquiry',
    viewGallery: 'View Studio Gallery',
    photosLabel: 'Genuine Photos',
    passengers: 'Passengers',
    bags: 'Bags',
    prevCar: 'Previous Vehicle',
    nextCar: 'Next Vehicle',
    closeModal: 'Close Gallery',
    prevPhoto: 'Previous Photo',
    nextPhoto: 'Next Photo',
    photoCounter: 'of',
    cashOnArrival: 'Cash to Driver Upon Arrival • 0% Advance Deposit',
    whatsappMessagePrefix: 'Hello, I would like to inquire about reserving a private VIP concierge vehicle: ',
  },
  ms: {
    eyebrow: 'ARMADA MEWAH DIRAJA',
    title: 'Pilih Kelas Kenderaan Umrah Anda',
    subtitle: 'Kenderaan premium yang dijaga rapi, pemandu peribadi berpengalaman, dan air Zamzam sejuk percuma untuk perjalanan ibadah yang selesa.',
    filterAll: 'Semua Kenderaan (7)',
    filterDirect: 'Tempahan Terus (5)',
    filterConcierge: 'Konsierj VIP (2)',
    badgeDirect: 'Tempahan Terus Segera',
    badgeConcierge: '★ Konsierj VIP • Atas Permintaan',
    fromPrice: 'Bermula dari',
    conciergeQuote: 'Sebut Harga Konsierj Khas',
    bookNow: 'Tempah Kenderaan Ini',
    whatsappInquiry: 'Pertanyaan WhatsApp VIP',
    viewGallery: 'Galeri Studio Penuh',
    photosLabel: 'Foto Asli',
    passengers: 'Penumpang',
    bags: 'Bagasi',
    prevCar: 'Kenderaan Sebelumnya',
    nextCar: 'Kenderaan Seterusnya',
    closeModal: 'Tutup Galeri',
    prevPhoto: 'Foto Sebelumnya',
    nextPhoto: 'Foto Seterusnya',
    photoCounter: 'daripada',
    cashOnArrival: 'Bayaran Tunai Semasa Tiba • 0% Deposit',
    whatsappMessagePrefix: 'Salam, saya ingin bertanya tentang tempahan kenderaan VIP konsierj peribadi: ',
  },
  id: {
    eyebrow: 'KOLEKSI ARMADA VIP DIRAJA',
    title: 'Pilih Kelas Perjalanan Umrah Anda',
    subtitle: 'Armada bersih dan mewah, sopir profesional berpengalaman, serta air Zamzam dingin gratis untuk perjalanan ibadah yang tenang dan nyaman.',
    filterAll: 'Semua Armada (7)',
    filterDirect: 'Pemesanan Langsung (5)',
    filterConcierge: 'Layanan Concierge VIP (2)',
    badgeDirect: 'Pemesanan Langsung Instan',
    badgeConcierge: '★ Concierge VIP • Sesuai Permintaan',
    fromPrice: 'Mulai dari',
    conciergeQuote: 'Harga Khusus Concierge',
    bookNow: 'Pesan Mobil Ini',
    whatsappInquiry: 'Tanya via WhatsApp VIP',
    viewGallery: 'Lihat Galeri Studio',
    photosLabel: 'Foto Asli',
    passengers: 'Penumpang',
    bags: 'Koper',
    prevCar: 'Kendaraan Sebelumnya',
    nextCar: 'Kendaraan Selanjutnya',
    closeModal: 'Tutup Galeri',
    prevPhoto: 'Foto Sebelumnya',
    nextPhoto: 'Foto Selanjutnya',
    photoCounter: 'dari',
    cashOnArrival: 'Bayar Tunai ke Sopir Saat Tiba • 0% Uang Muka',
    whatsappMessagePrefix: 'Halo, saya ingin menanyakan pemesanan armada VIP concierge privat: ',
  },
  ur: {
    eyebrow: 'شاہی لگژری بیڑے کا انتخاب',
    title: 'اپنے مقدس سفر کے لیے گاڑی منتخب کریں',
    subtitle: 'مکمل سینیٹائزڈ اور آرام دہ گاڑیاں، تربیت یافتہ باحیا ڈرائیورز، اور ٹھنڈے آب زمزم کی مفت ضیافت۔',
    filterAll: 'تمام گاڑیاں (7)',
    filterDirect: 'براہ راست بکنگ (5)',
    filterConcierge: 'وی آئی پی کونسیرج (2)',
    badgeDirect: 'فوری براہ راست بکنگ',
    badgeConcierge: '★ وی آئی پی کونسیرج • خصوصی درخواست پر',
    fromPrice: 'سے شروع',
    conciergeQuote: 'خصوصی کوٹیشن',
    bookNow: 'یہ گاڑی بک کریں',
    whatsappInquiry: 'واٹس ایپ پر وی آئی پی رابطہ',
    viewGallery: 'اسٹوڈیو گیلری دیکھیں',
    photosLabel: 'اصلی تصاویر',
    passengers: 'مسافر',
    bags: 'بیگز',
    prevCar: 'پچھلی گاڑی',
    nextCar: 'اگلی گاڑی',
    closeModal: 'گیلری بند کریں',
    prevPhoto: 'پچھلی تصویر',
    nextPhoto: 'اگلی تصویر',
    photoCounter: 'از',
    cashOnArrival: 'پہنچنے پر ڈرائیور کو نقد ادائیگی • کوئی پیشگی رقم نہیں',
    whatsappMessagePrefix: 'السلام علیکم، مجھے اس گاڑی کی بکنگ کے بارے میں معلومات درکار ہیں: ',
  },
  fr: {
    eyebrow: 'LA COLLECTION ROYALE D’ÉLITE',
    title: 'Choisissez Votre Catégorie Privée',
    subtitle: 'Flotte d’exception entretenue avec soin, chauffeurs privés chevronnés et eau de Zamzam fraîche offerte pour un pèlerinage en toute sérénité.',
    filterAll: 'Tous les Véhicules (7)',
    filterDirect: 'Réservation Directe (5)',
    filterConcierge: 'Conciergerie VIP (2)',
    badgeDirect: 'Réservation Directe Immédiate',
    badgeConcierge: '★ Concierge VIP • Sur Demande',
    fromPrice: 'À partir de',
    conciergeQuote: 'Tarif Concierge sur Devis',
    bookNow: 'Réserver ce Véhicule',
    whatsappInquiry: 'Demande VIP WhatsApp',
    viewGallery: 'Voir la Galerie Studio',
    photosLabel: 'Photos Réelles',
    passengers: 'Passagers',
    bags: 'Bagages',
    prevCar: 'Véhicule précédent',
    nextCar: 'Véhicule suivant',
    closeModal: 'Fermer la galerie',
    prevPhoto: 'Photo précédente',
    nextPhoto: 'Photo suivante',
    photoCounter: 'sur',
    cashOnArrival: 'Paiement en espèces au chauffeur à l\'arrivée • 0% Acompte',
    whatsappMessagePrefix: 'Bonjour, je souhaite me renseigner pour réserver ce véhicule VIP : ',
  },
  es: {
    eyebrow: 'LA COLECCIÓN DE FLOTA REAL',
    title: 'Elija Su Clase Ejecutiva Privada',
    subtitle: 'Flota exclusiva con mantenimiento impecable, chóferes ejecutivos acreditados y agua de Zamzam fría de cortesía para su viaje sagrado.',
    filterAll: 'Todos los Vehículos (7)',
    filterDirect: 'Reserva Directa (5)',
    filterConcierge: 'Conserjería VIP (2)',
    badgeDirect: 'Reserva Directa Inmediata',
    badgeConcierge: '★ Conserjería VIP • Bajo Solicitud',
    fromPrice: 'Desde',
    conciergeQuote: 'Presupuesto Concierge VIP',
    bookNow: 'Reservar este Vehículo',
    whatsappInquiry: 'Consulta VIP por WhatsApp',
    viewGallery: 'Ver Galería de Estudio',
    photosLabel: 'Fotos Reales',
    passengers: 'Pasajeros',
    bags: 'Maletas',
    prevCar: 'Vehículo anterior',
    nextCar: 'Vehículo siguiente',
    closeModal: 'Cerrar galería',
    prevPhoto: 'Foto anterior',
    nextPhoto: 'Foto siguiente',
    photoCounter: 'de',
    cashOnArrival: 'Pago en efectivo al conductor a la llegada • 0% Depósito',
    whatsappMessagePrefix: 'Hola, deseo consultar sobre la reserva de este vehículo VIP: ',
  },
  de: {
    eyebrow: 'DIE KÖNIGLICHE LUXUSFLOTTE',
    title: 'Wählen Sie Ihre Private Reiseklasse',
    subtitle: 'Erstklassig gepflegte Premium-Fahrzeuge, geprüfte Chauffeure und gekühltes Zamzam-Wasser für Ihre würdevolle Reise zwischen den Heiligen Stätten.',
    filterAll: 'Alle Fahrzeuge (7)',
    filterDirect: 'Direktbuchung (5)',
    filterConcierge: 'VIP-Concierge (2)',
    badgeDirect: 'Sofortige Direktbuchung',
    badgeConcierge: '★ VIP-Concierge • Auf Anfrage',
    fromPrice: 'Ab',
    conciergeQuote: 'Individuelles VIP-Angebot',
    bookNow: 'Dieses Fahrzeug buchen',
    whatsappInquiry: 'VIP-Anfrage via WhatsApp',
    viewGallery: 'Studio-Galerie ansehen',
    photosLabel: 'Echte Fotos',
    passengers: 'Passagiere',
    bags: 'Koffer',
    prevCar: 'Vorheriges Fahrzeug',
    nextCar: 'Nächstes Fahrzeug',
    closeModal: 'Galerie schließen',
    prevPhoto: 'Vorheriges Foto',
    nextPhoto: 'Nächstes Foto',
    photoCounter: 'von',
    cashOnArrival: 'Barzahlung beim Fahrer bei Ankunft • 0% Vorkasse',
    whatsappMessagePrefix: 'Guten Tag, ich möchte mich über dieses VIP-Fahrzeug erkundigen: ',
  },
  tr: {
    eyebrow: 'KRALİYET LÜKS FİLO KOLEKSİYONU',
    title: 'Özel Umre Seyahat Sınıfınızı Seçin',
    subtitle: 'Özenle bakımı yapılan araçlar, deneyimli özel şoförler ve kutsal yolculuğunuz için ücretsiz soğuk Zemzem ikramı.',
    filterAll: 'Tüm Araçlar (7)',
    filterDirect: 'Doğrudan Rezervasyon (5)',
    filterConcierge: 'VIP Konsiyerj (2)',
    badgeDirect: 'Hızlı Doğrudan Rezervasyon',
    badgeConcierge: '★ VIP Konsiyerj • Özel Talep',
    fromPrice: 'Başlangıç',
    conciergeQuote: 'Özel Konsiyerj Teklifi',
    bookNow: 'Bu Aracı Ayırtın',
    whatsappInquiry: 'WhatsApp VIP Bilgi Al',
    viewGallery: 'Stüdyo Galerisini Aç',
    photosLabel: 'Gerçek Fotoğraflar',
    passengers: 'Yolcu',
    bags: 'Bavul',
    prevCar: 'Önceki Araç',
    nextCar: 'Sonraki Araç',
    closeModal: 'Galeriyi Kapat',
    prevPhoto: 'Önceki Fotoğraf',
    nextPhoto: 'Sonraki Fotoğraf',
    photoCounter: '/',
    cashOnArrival: 'Varışta Şoföre Nakit Ödeme • 0% Ön Ödeme',
    whatsappMessagePrefix: 'Merhaba, bu VIP araç rezervasyonu hakkında bilgi almak istiyorum: ',
  },
  hi: {
    eyebrow: 'शाही लक्जरी फ्लीट संग्रह',
    title: 'अपनी निजी उमरा यात्रा श्रेणी चुनें',
    subtitle: 'उच्च स्तर पर सुسज्जित वाहन, अनुभवी निजी ड्राइवर और पवित्र स्थलों के बीच आपकी यात्रा के लिए निःशुल्क ठंडा ज़मज़म पानी।',
    filterAll: 'सभी वाहन (7)',
    filterDirect: 'सीधी बुकिंग (5)',
    filterConcierge: 'वीआईपी कंसीयज (2)',
    badgeDirect: 'त्वरित सीधी बुकिंग',
    badgeConcierge: '★ वीआईपी कंसीयज • विशेष अनुरोध पर',
    fromPrice: 'शुरुआती',
    conciergeQuote: 'विशेष वीआईपी उद्धरण',
    bookNow: 'यह वाहन बुक करें',
    whatsappInquiry: 'व्हाट्सएप वीआईपी पूछताछ',
    viewGallery: 'स्टूडियो गैलरी देखें',
    photosLabel: 'वास्तविक तस्वीरें',
    passengers: 'यात्री',
    bags: 'बैग',
    prevCar: 'पिछला वाहन',
    nextCar: 'अगला वाहन',
    closeModal: 'गैलरी बंद करें',
    prevPhoto: 'पिछली तस्वीर',
    nextPhoto: 'अगली तस्वीर',
    photoCounter: 'में से',
    cashOnArrival: 'आगमन पर ड्राइवर को नकद भुगतान • शून्य अग्रिम भुगतान',
    whatsappMessagePrefix: 'नमस्ते, मुझे इस वीआईपी वाहन के बारे में जानकारी चाहिए: ',
  },
};

// ============================================================================
// COMPONENT PROPS
// ============================================================================

interface LuxuryFleetShowcaseProps {
  locale: Locale;
  dict?: Dictionary;
  initialVehicleSlug?: string;
}

export function LuxuryFleetShowcase({
  locale,
  dict,
  initialVehicleSlug,
}: LuxuryFleetShowcaseProps) {
  const isRtl = locale === 'ar' || locale === 'ur';
  const t = SHOWCASE_I18N[locale] || SHOWCASE_I18N.en;
  const { formatPrice } = useCurrency();

  // Filter state
  const [activeFilter, setActiveFilter] = useState<'all' | 'direct' | 'concierge'>('all');

  // Filtered vehicles
  const displayedVehicles = useMemo(() => {
    if (activeFilter === 'direct') {
      return SHOWCASE_VEHICLES.filter((v) => !v.isConcierge);
    }
    if (activeFilter === 'concierge') {
      return SHOWCASE_VEHICLES.filter((v) => v.isConcierge);
    }
    return SHOWCASE_VEHICLES;
  }, [activeFilter]);

  // Active vehicle index in current filtered list
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Initialize or reset activeIndex if filter changes
  useEffect(() => {
    setActiveIndex(0);
  }, [activeFilter]);

  // Handle initialVehicleSlug if provided
  useEffect(() => {
    if (initialVehicleSlug) {
      const foundIdx = displayedVehicles.findIndex(
        (v) => v.slug === initialVehicleSlug || v.id === initialVehicleSlug
      );
      if (foundIdx !== -1) {
        setActiveIndex(foundIdx);
      }
    }
  }, [initialVehicleSlug, displayedVehicles]);

  const total = displayedVehicles.length;
  const currentVehicle = displayedVehicles[activeIndex] || displayedVehicles[0];

  // Navigation handlers
  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : total - 1));
  }, [total]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev < total - 1 ? prev + 1 : 0));
  }, [total]);

  // Lightbox Modal State
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [lightboxPhotoIndex, setLightboxPhotoIndex] = useState<number>(0);

  const openLightbox = (photoIdx: number = 0) => {
    setLightboxPhotoIndex(photoIdx);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  // Body scroll locking when lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isLightboxOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLightboxOpen) {
        if (e.key === 'Escape') {
          closeLightbox();
        } else if (e.key === 'ArrowRight') {
          setLightboxPhotoIndex((prev) =>
            prev < currentVehicle.gallery.length - 1 ? prev + 1 : 0
          );
        } else if (e.key === 'ArrowLeft') {
          setLightboxPhotoIndex((prev) =>
            prev > 0 ? prev - 1 : currentVehicle.gallery.length - 1
          );
        }
        return;
      }

      if (e.key === 'ArrowRight') {
        if (isRtl) handlePrev();
        else handleNext();
      } else if (e.key === 'ArrowLeft') {
        if (isRtl) handleNext();
        else handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, isRtl, handlePrev, handleNext, currentVehicle.gallery.length]);

  // Touch swipe handling for mobile
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance) {
      // Swiped left
      if (isRtl) handlePrev();
      else handleNext();
    } else if (distance < -minSwipeDistance) {
      // Swiped right
      if (isRtl) handleNext();
      else handlePrev();
    }
  };

  // WhatsApp concierge prefilled URL
  const getWhatsAppUrl = (vehicleName: string) => {
    const phone = '966567588261';
    const text = encodeURIComponent(`${t.whatsappMessagePrefix}${vehicleName}`);
    return `https://wa.me/${phone}?text=${text}`;
  };

  return (
    <section
      id="fleet"
      className="relative py-10 md:py-16 bg-[#080C14] text-[#FAF6F0] overflow-hidden select-none scroll-mt-20"
      role="region"
      aria-roledescription="carousel"
      aria-label="Luxury Fleet Showcase"
    >
      {/* Background cinematic radial glows */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D6A13A]/12 via-[#111827]/40 to-transparent blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-32 right-1/4 w-[600px] h-[400px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-[#0E1B38]/60 via-transparent to-transparent blur-[120px]" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-6 md:mb-8">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141C2E] border border-[#D6A13A]/40 text-[11px] font-semibold text-[#E5C189] uppercase tracking-widest mb-2 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D6A13A]" />
            <span>{t.eyebrow}</span>
          </div>

          {/* Title */}
          <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-[#F5EEDB] tracking-tight leading-tight">
            {t.title}
          </h2>

          {/* Subtitle */}
          <p className="mt-2 text-xs sm:text-sm text-[#C2B7AC] font-light leading-relaxed max-w-2xl mx-auto">
            {t.subtitle}
          </p>

          {/* CATEGORY FILTER TABS */}
          <div
            className="mt-4 inline-flex items-center p-1 rounded-2xl bg-[#0D1322] border border-[#D6A13A]/25 shadow-lg"
            role="tablist"
            aria-label="Fleet Categories"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === 'all'}
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                activeFilter === 'all'
                  ? 'bg-gradient-to-r from-[#D6A13A] to-[#B38226] text-[#0A0E17] shadow-md shadow-[#D6A13A]/20'
                  : 'text-[#A69E96] hover:text-[#FAF6F0]'
              }`}
            >
              {t.filterAll}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === 'direct'}
              onClick={() => setActiveFilter('direct')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                activeFilter === 'direct'
                  ? 'bg-gradient-to-r from-[#D6A13A] to-[#B38226] text-[#0A0E17] shadow-md shadow-[#D6A13A]/20'
                  : 'text-[#A69E96] hover:text-[#FAF6F0]'
              }`}
            >
              {t.filterDirect}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === 'concierge'}
              onClick={() => setActiveFilter('concierge')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                activeFilter === 'concierge'
                  ? 'bg-gradient-to-r from-[#D6A13A] to-[#B38226] text-[#0A0E17] shadow-md shadow-[#D6A13A]/20'
                  : 'text-[#A69E96] hover:text-[#FAF6F0]'
              }`}
            >
              {t.filterConcierge}
            </button>
          </div>
        </div>

        {/* STACKED-CARD DECK CAROUSEL CONTAINER */}
        <div
          className="relative max-w-5xl mx-auto min-h-[500px] sm:min-h-[540px] md:min-h-[560px] flex items-center justify-center"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* CARDS LOOP */}
          {displayedVehicles.map((vehicle, idx) => {
            // Calculate distance in circular array
            let diff = idx - activeIndex;
            // Shortest circular offset
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;

            const isCurrent = diff === 0;
            const isVisible = Math.abs(diff) <= 2;

            if (!isVisible) {
              return null;
            }

            // Depth calculation based on diff
            // In RTL: positive diff is leftward, negative is rightward
            const dirMultiplier = isRtl ? -1 : 1;
            let translateX = 0;
            let translateY = 0;
            let rotate = 0;
            let scale = 1;
            let zIndex = 30;
            let opacity = 1;

            if (diff === 0) {
              zIndex = 30;
              scale = 1;
              opacity = 1;
              translateX = 0;
              translateY = 0;
              rotate = 0;
            } else if (Math.abs(diff) === 1) {
              zIndex = 20;
              scale = 0.92;
              opacity = 0.72;
              translateX = diff * 45 * dirMultiplier;
              translateY = -10;
              rotate = diff * 2.5 * dirMultiplier;
            } else if (Math.abs(diff) === 2) {
              zIndex = 10;
              scale = 0.85;
              opacity = 0.35;
              translateX = diff * 80 * dirMultiplier;
              translateY = -20;
              rotate = diff * 4.5 * dirMultiplier;
            }

            const vehicleName = vehicle.name[locale] || vehicle.name.en;
            const categoryBadge = vehicle.categoryBadge[locale] || vehicle.categoryBadge.en;
            const summaryText = vehicle.summary[locale] || vehicle.summary.en;

            return (
              <div
                key={vehicle.id}
                onClick={() => {
                  if (!isCurrent) {
                    setActiveIndex(idx);
                  }
                }}
                style={{
                  transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale}) rotate(${rotate}deg)`,
                  zIndex,
                  opacity,
                  transition: 'transform 450ms cubic-bezier(0.16, 1, 0.3, 1), opacity 450ms ease',
                }}
                className={`absolute w-full max-w-[340px] sm:max-w-[420px] md:max-w-[500px] lg:max-w-[540px] rounded-[28px] p-5 sm:p-6 md:p-7 bg-gradient-to-b from-[#131B2C] via-[#0E1524] to-[#0A0F1A] border ${
                  isCurrent
                    ? 'border-[#D6A13A] shadow-[0_25px_60px_rgba(0,0,0,0.85),_0_0_35px_rgba(214,161,58,0.22)] cursor-default'
                    : 'border-[#D6A13A]/30 shadow-xl cursor-pointer hover:border-[#D6A13A]/60'
                }`}
                aria-hidden={!isCurrent}
              >
                {/* CARD TOP ROW: CATEGORY BADGE & SPECS PILL */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider ${
                      vehicle.isConcierge
                        ? 'bg-amber-950/70 border border-amber-500/70 text-amber-300'
                        : 'bg-[#18233C] border border-[#D6A13A]/50 text-[#E5C189]'
                    }`}
                  >
                    {vehicle.isConcierge && <Star className="w-3 h-3 text-amber-400 fill-amber-400" />}
                    <span>{categoryBadge}</span>
                  </span>

                  {/* Capacity Pill */}
                  <div className="flex items-center gap-2.5 text-[11px] sm:text-xs text-[#D8CFBF] font-medium bg-[#0A0F1A]/80 border border-white/10 px-2.5 py-0.5 rounded-full">
                    <span className="inline-flex items-center gap-1">
                      <Users className="w-3 h-3 text-[#D6A13A]" />
                      <span>{vehicle.passengers} {t.passengers}</span>
                    </span>
                    <span className="text-white/20">•</span>
                    <span className="inline-flex items-center gap-1">
                      <Luggage className="w-3 h-3 text-[#D6A13A]" />
                      <span>{vehicle.luggage} {t.bags}</span>
                    </span>
                  </div>
                </div>

                {/* VEHICLE MODEL NAME */}
                <h3 className="font-serif font-bold text-xl sm:text-2xl md:text-3xl text-[#FAF4E6] tracking-tight">
                  {vehicleName}
                </h3>

                {/* REAL APPROVED EXTERIOR HERO PHOTOGRAPH */}
                <div
                  className="relative w-full aspect-[16/9] my-2 rounded-2xl overflow-hidden bg-radial from-[#1A253E] to-[#0A0F1A] border border-white/10 group cursor-pointer"
                  onClick={(e) => {
                    if (isCurrent) {
                      e.stopPropagation();
                      openLightbox(0);
                    }
                  }}
                  title={t.viewGallery}
                >
                  <Image
                    src={vehicle.exteriorImage}
                    alt={vehicleName}
                    fill
                    sizes="(max-width: 768px) 100vw, 540px"
                    priority={idx === 0}
                    className="object-contain p-2 drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Interactive Camera Badge */}
                  <div className="absolute bottom-2.5 right-2.5 rtl:right-auto rtl:left-2.5 px-2.5 py-0.5 rounded-full bg-[#080C14]/85 backdrop-blur-md border border-[#D6A13A]/40 text-[10px] font-semibold text-[#E5C189] flex items-center gap-1.5 shadow-md opacity-90 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-3 h-3 text-[#D6A13A]" />
                    <span>{vehicle.gallery.length} {t.photosLabel}</span>
                  </div>
                </div>

                {/* SUMMARY SENTENCE */}
                <p className="text-[11px] sm:text-xs text-[#BDB2A4] font-light leading-relaxed line-clamp-2 mb-3">
                  {summaryText}
                </p>

                {/* 4 VERIFIED FEATURES GRID */}
                <div className="grid grid-cols-2 gap-2 pt-2.5 border-t border-white/10 mb-3.5">
                  {vehicle.features.map((feat, fIdx) => (
                    <div
                      key={`feat-${fIdx}`}
                      className="flex items-center gap-1.5 p-1 rounded-lg bg-white/[0.03] border border-white/[0.05]"
                    >
                      <CheckCircle2 className="w-3 h-3 text-[#D6A13A] shrink-0" />
                      <span className="text-[11px] font-medium text-[#EDE5D8] truncate">
                        {feat.title[locale] || feat.title.en}
                      </span>
                    </div>
                  ))}
                </div>

                {/* BOTTOM ACTION BAR */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2.5">
                  {/* Price Block */}
                  <div className="shrink-0 text-start">
                    {!vehicle.isConcierge ? (
                      <>
                        <span className="text-[10px] text-[#A69B92] block leading-none mb-0.5">
                          {t.fromPrice}
                        </span>
                        <span className="font-serif font-bold text-xl sm:text-2xl text-[#E5C189] tracking-tight">
                          {formatPrice(vehicle.startingPriceSAR)}
                        </span>
                      </>
                    ) : (
                      <div className="space-y-0.5">
                        <span className="text-[9px] text-amber-400 font-bold uppercase tracking-wider block">
                          {t.badgeConcierge}
                        </span>
                        <span className="font-serif font-semibold text-xs sm:text-sm text-[#FAF4E6]">
                          {t.conciergeQuote}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex items-center gap-2">
                    {/* View Studio Photos Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openLightbox(0);
                      }}
                      className="h-10 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-[#E0D5C3] font-medium text-xs flex items-center gap-1.5 transition-all active:scale-95"
                      aria-label={`${t.viewGallery} - ${vehicleName}`}
                    >
                      <Camera className="w-3.5 h-3.5 text-[#D6A13A]" />
                      <span className="hidden sm:inline">{t.viewGallery}</span>
                    </button>

                    {/* Primary Booking or WhatsApp CTA */}
                    {!vehicle.isConcierge ? (
                      <Link
                        href={`/${locale}/booking?vehicle=${vehicle.bookingVehicleId}`}
                        className="h-10 px-4 sm:px-5 rounded-xl bg-gradient-to-r from-[#D6A13A] via-[#E8BE65] to-[#D6A13A] hover:brightness-110 active:scale-95 text-[#0A0E17] font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#D6A13A]/25 flex items-center justify-center gap-1.5 transition-all"
                      >
                        <span>{t.bookNow}</span>
                        {isRtl ? (
                          <ArrowLeft className="w-3.5 h-3.5" />
                        ) : (
                          <ArrowRight className="w-3.5 h-3.5" />
                        )}
                      </Link>
                    ) : (
                      <a
                        href={getWhatsAppUrl(vehicleName)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-10 px-4 sm:px-5 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:brightness-110 active:scale-95 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-1.5 transition-all"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-white" />
                        <span>{t.whatsappInquiry}</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* DESKTOP / TABLET CIRCULAR PREV & NEXT CONTROLS */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label={t.prevCar}
            className="absolute left-0 lg:-left-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-[#111827]/90 hover:bg-[#1C273E] border border-[#D6A13A]/60 text-[#E5C189] flex items-center justify-center transition-all shadow-xl active:scale-95 backdrop-blur-md"
          >
            {isRtl ? (
              <ChevronRight className="w-6 h-6 text-[#D6A13A]" />
            ) : (
              <ChevronLeft className="w-6 h-6 text-[#D6A13A]" />
            )}
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label={t.nextCar}
            className="absolute right-0 lg:-right-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-[#111827]/90 hover:bg-[#1C273E] border border-[#D6A13A]/60 text-[#E5C189] flex items-center justify-center transition-all shadow-xl active:scale-95 backdrop-blur-md"
          >
            {isRtl ? (
              <ChevronLeft className="w-6 h-6 text-[#D6A13A]" />
            ) : (
              <ChevronRight className="w-6 h-6 text-[#D6A13A]" />
            )}
          </button>
        </div>

        {/* BOTTOM QUICK-SELECTOR THUMBNAIL STRIP & DOTS */}
        <div className="mt-8 flex flex-col items-center gap-4">
          {/* Quick Vehicle Selector Strip */}
          <div
            className="flex items-center gap-2 sm:gap-3 overflow-x-auto max-w-full px-2 py-2"
            role="tablist"
            aria-label="Direct Vehicle Selection"
          >
            {displayedVehicles.map((veh, i) => (
              <button
                key={`selector-${veh.id}`}
                type="button"
                role="tab"
                aria-selected={activeIndex === i}
                onClick={() => setActiveIndex(i)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 flex items-center gap-2 border ${
                  activeIndex === i
                    ? 'bg-[#18233C] border-[#D6A13A] text-[#F5EEDB] shadow-md shadow-[#D6A13A]/20 scale-105'
                    : 'bg-white/5 border-white/10 text-[#A69E96] hover:text-[#FAF6F0] hover:bg-white/10'
                }`}
              >
                {veh.isConcierge && <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />}
                <span>{veh.name[locale] || veh.name.en}</span>
              </button>
            ))}
          </div>

          {/* Trust Guarantee Note */}
          <p className="text-xs text-[#8E867E] text-center font-light">
            ★ {t.cashOnArrival}
          </p>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* FULLSCREEN ACCESSIBLE PHOTO VIEWER LIGHTBOX MODAL                     */}
      {/* ===================================================================== */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${currentVehicle.name[locale] || currentVehicle.name.en} Gallery`}
          className="fixed inset-0 z-50 bg-[#050810]/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8 animate-fadeIn"
        >
          {/* Top Bar: Vehicle Info + Counter + Close Button */}
          <div className="flex items-center justify-between text-white border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#D6A13A] block">
                {currentVehicle.categoryBadge[locale] || currentVehicle.categoryBadge.en}
              </span>
              <h4 className="font-serif font-bold text-xl sm:text-2xl text-[#FAF4E6]">
                {currentVehicle.name[locale] || currentVehicle.name.en}
              </h4>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-[#D6A13A] bg-white/5 border border-white/15 px-3.5 py-1.5 rounded-full">
                {String(lightboxPhotoIndex + 1).padStart(2, '0')}{' '}
                {t.photoCounter}{' '}
                {String(currentVehicle.gallery.length).padStart(2, '0')}
              </span>

              <button
                type="button"
                onClick={closeLightbox}
                aria-label={t.closeModal}
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition-all active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Photo Area */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            {/* Previous Photo Button */}
            <button
              type="button"
              onClick={() =>
                setLightboxPhotoIndex((prev) =>
                  prev > 0 ? prev - 1 : currentVehicle.gallery.length - 1
                )
              }
              aria-label={t.prevPhoto}
              className="absolute left-2 sm:left-6 z-10 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-[#E5C189] flex items-center justify-center transition-all backdrop-blur-md active:scale-95"
            >
              {isRtl ? (
                <ChevronRight className="w-6 h-6 text-[#D6A13A]" />
              ) : (
                <ChevronLeft className="w-6 h-6 text-[#D6A13A]" />
              )}
            </button>

            {/* Photo Container */}
            <div className="relative w-full h-full max-w-5xl max-h-[68vh] flex flex-col items-center justify-center">
              {currentVehicle.gallery[lightboxPhotoIndex] && (
                <>
                  <div className="relative w-full h-full">
                    <Image
                      src={currentVehicle.gallery[lightboxPhotoIndex].src}
                      alt={
                        currentVehicle.gallery[lightboxPhotoIndex].alt[locale] ||
                        currentVehicle.gallery[lightboxPhotoIndex].alt.en
                      }
                      fill
                      className="object-contain"
                      sizes="100vw"
                      priority
                    />
                  </div>
                  {/* Photo Label */}
                  <span className="mt-2 text-xs font-semibold uppercase tracking-widest text-[#E5C189] bg-black/50 border border-white/10 px-4 py-1 rounded-full">
                    {currentVehicle.gallery[lightboxPhotoIndex].label[locale] ||
                      currentVehicle.gallery[lightboxPhotoIndex].label.en}
                  </span>
                </>
              )}
            </div>

            {/* Next Photo Button */}
            <button
              type="button"
              onClick={() =>
                setLightboxPhotoIndex((prev) =>
                  prev < currentVehicle.gallery.length - 1 ? prev + 1 : 0
                )
              }
              aria-label={t.nextPhoto}
              className="absolute right-2 sm:right-6 z-10 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-[#E5C189] flex items-center justify-center transition-all backdrop-blur-md active:scale-95"
            >
              {isRtl ? (
                <ChevronLeft className="w-6 h-6 text-[#D6A13A]" />
              ) : (
                <ChevronRight className="w-6 h-6 text-[#D6A13A]" />
              )}
            </button>
          </div>

          {/* Footer Thumbnails & Fast Booking Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-white/10">
            {/* Thumbnail Strip */}
            <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1">
              {currentVehicle.gallery.map((photo, pIdx) => (
                <button
                  key={`thumb-${photo.src}-${pIdx}`}
                  type="button"
                  onClick={() => setLightboxPhotoIndex(pIdx)}
                  className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                    lightboxPhotoIndex === pIdx
                      ? 'border-[#D6A13A] scale-105 shadow-md shadow-[#D6A13A]/40'
                      : 'border-white/20 opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={photo.src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>

            {/* Modal Direct Booking / WhatsApp Action */}
            <div className="flex items-center gap-3">
              {!currentVehicle.isConcierge ? (
                <Link
                  href={`/${locale}/booking?vehicle=${currentVehicle.bookingVehicleId}`}
                  onClick={closeLightbox}
                  className="h-11 px-6 rounded-xl bg-gradient-to-r from-[#D6A13A] via-[#E8BE65] to-[#D6A13A] hover:brightness-110 active:scale-95 text-[#0A0E17] font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#D6A13A]/25 flex items-center gap-2"
                >
                  <span>{t.bookNow}</span>
                  {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </Link>
              ) : (
                <a
                  href={getWhatsAppUrl(
                    currentVehicle.name[locale] || currentVehicle.name.en
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 px-6 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:brightness-110 active:scale-95 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/30 flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                  <span>{t.whatsappInquiry}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
