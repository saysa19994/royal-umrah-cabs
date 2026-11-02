'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Users,
  Briefcase,
  Snowflake,
  ShieldCheck,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
} from 'lucide-react';
import { Locale } from '@/i18n/config';
import { FleetShowcaseVehicle } from '@/data/fleet-showcase-data';
import { useCurrency } from '@/context/CurrencyContext';

interface FleetCatalogProps {
  vehicles: FleetShowcaseVehicle[];
  locale: Locale;
}

type FilterCategory = 'all' | 'sedan' | 'family' | 'group';

const FLEET_I18N: Record<string, Record<Locale, string>> = {
  breadcrumbHome: {
    en: 'Home',
    ar: 'الرئيسية',
    ms: 'Utama',
    id: 'Beranda',
    ur: 'ہوم',
    fr: 'Accueil',
    es: 'Inicio',
    de: 'Startseite',
    hi: 'होम',
    tr: 'Ana Sayfa',
  },
  breadcrumbFleet: {
    en: 'Fleet',
    ar: 'الأسطول',
    ms: 'Armada',
    id: 'Armada',
    ur: 'بیڑہ',
    fr: 'Flotte',
    es: 'Flota',
    de: 'Flotte',
    hi: 'फ्लीट',
    tr: 'Filo',
  },
  eyebrow: {
    en: 'THE FLEET COLLECTION',
    ar: 'مجموعة الأسطول الملكي',
    ms: 'KOLEKSI ARMADA DIRAJA',
    id: 'KOLEKSI ARMADA VIP DIRAJA',
    ur: 'شاہی بیڑے کا مجموعہ',
    fr: 'LA COLLECTION ROYALE',
    es: 'LA COLECCIÓN DE FLOTA REAL',
    de: 'DIE KÖNIGLICHE FLOTTENKOLLEKTION',
    hi: 'शाही फ्लीट संग्रह',
    tr: 'KRALİYET FİLO KOLEKSİYONU',
  },
  heroTitleMain: {
    en: 'Elite Fleet for',
    ar: 'أسطول النخبة',
    ms: 'Armada Elit untuk',
    id: 'Armada Elit untuk',
    ur: 'منتخب شاہی بیڑہ',
    fr: 'Flotte d’Élite pour',
    es: 'Flota de Élite para',
    de: 'Elite-Flotte für',
    hi: 'शाही यात्रा के लिए',
    tr: 'Kraliyet Yolculukları için',
  },
  heroTitleEm: {
    en: 'Royal Journeys.',
    ar: 'للرحلات الملكية.',
    ms: 'Perjalanan Diraja.',
    id: 'Perjalanan Diraja.',
    ur: 'مقدس سفر کے لیے۔',
    fr: 'Voyages Royaux.',
    es: 'Viajes Reales.',
    de: 'Königliche Reisen.',
    hi: 'विशिष्ट फ्लीट।',
    tr: 'Seçkin Filo.',
  },
  heroSubtitle: {
    en: 'Carefully curated for discerning travelers, combining uncompromising luxury, spacious comfort, and complete privacy.',
    ar: 'مجموعة مختارة بعناية لأصحاب الذوق الرفيع، تجمع بين أعلى درجات الراحة والرحابة والخصوصية.',
    ms: 'Dipilih khas untuk tetamu terhormat, menggabungkan keselesaan mewah, keluasan kabin dan privasi mutlak.',
    id: 'Dipilih khusus untuk jamaah terhormat, memadukan kenyamanan mewah, kabin lapang, dan privasi penuh.',
    ur: 'معزز مہمانوں کے لیے خاص انتخاب، جو بے مثال آرام، وسیع جگہ اور مکمل رازداری کا امتزاج ہے۔',
    fr: 'Soigneusement sélectionnée pour les voyageurs exigeants, alliant confort d’exception, espace généreux et intimité totale.',
    es: 'Cuidadosamente seleccionada para viajeros distinguidos, combinando lujo absoluto, amplitud y total privacidad.',
    de: 'Sorgfältig ausgewählt für anspruchsvolle Reisende – vereint höchsten Komfort, Großzügigkeit und vollkommene Privatsphäre.',
    hi: 'विशिष्ट यात्रियों के लिए सावधानी से चुना गया, जो सर्वोच्च आराम, विशालता और पूर्ण गोपनीयता प्रदान करता है।',
    tr: 'Seçkin yolcular için özenle seçilmiş, en üst düzey konfor, ferahlık ve tam gizliliği bir araya getiren filo.',
  },
  filterLabel: {
    en: 'Filter fleet by vehicle category',
    ar: 'تصفية الأسطول حسب فئة المركبة',
    ms: 'Tapis armada mengikut kategori kenderaan',
    id: 'Filter armada berdasarkan kategori kendaraan',
    ur: 'گاڑیوں کی قسم کے مطابق فلٹر کریں',
    fr: 'Filtrer la flotte par catégorie',
    es: 'Filtrar flota por categoría de vehículo',
    de: 'Flotte nach Fahrzeugkategorie filtern',
    hi: 'वाहन श्रेणी के अनुसार फ्लीट फ़िल्टर करें',
    tr: 'Araç kategorisine göre filtreleyin',
  },
  filterAll: {
    en: 'All',
    ar: 'الكل',
    ms: 'Semua',
    id: 'Semua',
    ur: 'تمام',
    fr: 'Tous',
    es: 'Todos',
    de: 'Alle',
    hi: 'सभी',
    tr: 'Tümü',
  },
  filterSedan: {
    en: 'Sedan',
    ar: 'سيدان',
    ms: 'Sedan',
    id: 'Sedan',
    ur: 'سیڈان',
    fr: 'Berline',
    es: 'Sedán',
    de: 'Limousine',
    hi: 'सेडान',
    tr: 'Sedan',
  },
  filterFamily: {
    en: 'Family',
    ar: 'العائلة',
    ms: 'Keluarga',
    id: 'Keluarga',
    ur: 'فیملی',
    fr: 'Famille',
    es: 'Familia',
    de: 'Familie',
    hi: 'परिवार',
    tr: 'Aile',
  },
  filterGroup: {
    en: 'Groups',
    ar: 'المجموعات',
    ms: 'Kumpulan',
    id: 'Rombongan',
    ur: 'گروپس',
    fr: 'Groupes',
    es: 'Grupos',
    de: 'Gruppen',
    hi: 'समूह',
    tr: 'Gruplar',
  },
  passengers: {
    en: 'passengers',
    ar: 'ركاب',
    ms: 'penumpang',
    id: 'penumpang',
    ur: 'مسافر',
    fr: 'passagers',
    es: 'pasajeros',
    de: 'Passagiere',
    hi: 'यात्री',
    tr: 'yolcu',
  },
  luggage: {
    en: 'luggage bags',
    ar: 'حقائب',
    ms: 'beg',
    id: 'koper',
    ur: 'بیگ',
    fr: 'bagages',
    es: 'maletas',
    de: 'Koffer',
    hi: 'सामान',
    tr: 'valiz',
  },
  fullDetails: {
    en: 'Full Details',
    ar: 'التفاصيل الكاملة',
    ms: 'Butiran Penuh',
    id: 'Detail Lengkap',
    ur: 'مکمل تفصیلات',
    fr: 'Détails Complets',
    es: 'Detalles Completos',
    de: 'Vollständige Details',
    hi: 'पूरा विवरण',
    tr: 'Tüm Detaylar',
  },
  bookVehicle: {
    en: 'Book Vehicle',
    ar: 'حجز المركبة',
    ms: 'Tempah Kenderaan',
    id: 'Pesan Kendaraan',
    ur: 'گاڑی بک کریں',
    fr: 'Réserver le Véhicule',
    es: 'Reservar Vehículo',
    de: 'Fahrzeug Buchen',
    hi: 'वाहन बुक करें',
    tr: 'Aracı Ayırtın',
  },
  conciergeEyebrow: {
    en: 'BESPOKE CONCIERGE',
    ar: 'خدمة الكونسيرج الملكي',
    ms: 'KONSIERJ KHAS DIRAJA',
    id: 'LAYANAN CONCIERGE VIP',
    ur: 'شاہی کونسیرج سروس',
    fr: 'CONCIERGE SUR MESURE',
    es: 'CONSERJERÍA A MEDIDA',
    de: 'EXKLUSIVER CONCIERGE',
    hi: 'विशिष्ट कंसीयज',
    tr: 'ÖZEL KONSİYERJ',
  },
  conciergeTitleMain: {
    en: 'VIP Concierge',
    ar: 'خدمات VIP',
    ms: 'Perkhidmatan VIP',
    id: 'Layanan VIP',
    ur: 'وی آئی پی خدمات',
    fr: 'Services VIP',
    es: 'Servicios VIP',
    de: 'VIP-Dienste',
    hi: 'वीआईपी सेवाएं',
    tr: 'VIP Hizmetler',
  },
  conciergeTitleEm: {
    en: 'Upon Special Request.',
    ar: 'عند الطلب الخاص.',
    ms: 'Atas Permintaan Khas.',
    id: 'Sesuai Permintaan Khusus.',
    ur: 'خصوصی درخواست پر۔',
    fr: 'Sur Demande Spéciale.',
    es: 'Bajo Solicitud Especial.',
    de: 'Auf Spezielle Anfrage.',
    hi: 'विशेष अनुरोध पर।',
    tr: 'Özel Talep Üzerine.',
  },
  conciergeDesc: {
    en: 'Mercedes-Maybach and Hyundai H1 are exclusively available upon direct request via our executive concierge team on WhatsApp.',
    ar: 'مرسيدس مايباخ وهيونداي H1 متاحة فقط للطلبات الخاصة عبر فريق الكونسيرج لضمان أعلى معايير العناية.',
    ms: 'Mercedes-Maybach dan Hyundai H1 hanya tersedia untuk permintaan khas melalui pasukan konsierj kami di WhatsApp.',
    id: 'Mercedes-Maybach dan Hyundai H1 hanya tersedia melalui permintaan khusus via tim concierge WhatsApp kami.',
    ur: 'مرسڈیز میباخ اور ہیونڈائی H1 صرف واٹس ایپ پر ہماری کونسیرج ٹیم سے خصوصی درخواست پر دستیاب ہیں۔',
    fr: 'La Mercedes-Maybach et le Hyundai H1 sont disponibles uniquement sur demande via notre équipe concierge WhatsApp.',
    es: 'Mercedes-Maybach y Hyundai H1 están disponibles exclusivamente mediante solicitud previa a través de WhatsApp.',
    de: 'Mercedes-Maybach und Hyundai H1 sind exklusiv auf direkte Anfrage über unser Concierge-Team via WhatsApp verfügbar.',
    hi: 'मर्सिडीज-मेबैक और हुंडई H1 विशेष रूप से हमारी व्हाट्सएप कंसीयज टीम से अनुरोध पर उपलब्ध हैं।',
    tr: 'Mercedes-Maybach ve Hyundai H1 yalnızca WhatsApp konsiyerj ekibimiz üzerinden özel taleple sunulmaktadır.',
  },
  contactConcierge: {
    en: 'Contact Concierge',
    ar: 'تواصل مع الكونسيرج',
    ms: 'Hubungi Konsierj',
    id: 'Hubungi Concierge',
    ur: 'کونسیرج سے رابطہ کریں',
    fr: 'Contacter le Concierge',
    es: 'Contactar Conserjería',
    de: 'Concierge Kontaktieren',
    hi: 'कंसीयज से संपर्क करें',
    tr: 'Konsiyerj ile İletişim',
  },
  // Comparison Matrix strings
  comparisonBadge: {
    en: 'OFFICIAL SPECIFICATION COMPARISON',
    ar: 'مقارنة مواصفات الأسطول المعتمدة',
    ms: 'PERBANDINGAN SPESIFIKASI RASMI',
    id: 'PERBANDINGAN SPESIFIKASI RESMI',
    ur: 'سرکاری تقابلی جائزہ',
    fr: 'COMPARATIF OFFICIEL DES SPÉCIFICATIONS',
    es: 'COMPARATIVA OFICIAL DE ESPECIFICACIONES',
    de: 'OFFIZIELLER SPEZIFIKATIONSVERGLEICH',
    hi: 'आधिकारिक विनिर्देश तुलना',
    tr: 'RESMİ ÖZELLİK KARŞILAŞTIRMASI',
  },
  comparisonTitle: {
    en: 'Fleet Capacity & Specification Comparison',
    ar: 'مقارنة سعات ومواصفات الأسطول الكامل',
    ms: 'Perbandingan Kapasiti & Spesifikasi Armada',
    id: 'Perbandingan Kapasitas & Spesifikasi Armada',
    ur: 'بیڑے کی گنجائش اور خصوصیات کا موازنہ',
    fr: 'Comparatif des Capacités et Spécifications',
    es: 'Comparación de Capacidad y Especificaciones',
    de: 'Vergleich von Kapazität und Spezifikationen',
    hi: 'फ्लीट क्षमता और विनिर्देश तुलना',
    tr: 'Filo Kapasitesi ve Donanım Karşılaştırması',
  },
  colVehicle: {
    en: 'Vehicle Model',
    ar: 'طراز المركبة',
    ms: 'Model Kenderaan',
    id: 'Model Kendaraan',
    ur: 'گاڑی کا ماڈل',
    fr: 'Modèle',
    es: 'Modelo',
    de: 'Fahrzeugmodell',
    hi: 'वाहन मॉडल',
    tr: 'Araç Modeli',
  },
  colClass: {
    en: 'Category',
    ar: 'الفئة',
    ms: 'Kategori',
    id: 'Kategori',
    ur: 'قسم',
    fr: 'Catégorie',
    es: 'Categoría',
    de: 'Kategorie',
    hi: 'श्रेणी',
    tr: 'Kategori',
  },
  colPax: {
    en: 'Passengers',
    ar: 'الركاب',
    ms: 'Penumpang',
    id: 'Penumpang',
    ur: 'مسافر',
    fr: 'Passagers',
    es: 'Pasajeros',
    de: 'Passagiere',
    hi: 'यात्री',
    tr: 'Yolcu',
  },
  colBags: {
    en: 'Luggage',
    ar: 'الحقائب',
    ms: 'Bagasi',
    id: 'Koper',
    ur: 'سامان',
    fr: 'Bagages',
    es: 'Equipaje',
    de: 'Gepäck',
    hi: 'सामान',
    tr: 'Bagaj',
  },
  colClimate: {
    en: 'Climate Control',
    ar: 'التكييف',
    ms: 'Penyaman Udara',
    id: 'AC',
    ur: 'ایئر کنڈیشننگ',
    fr: 'Climatisation',
    es: 'Climatización',
    de: 'Klimatisierung',
    hi: 'वातानुकूलन',
    tr: 'Klima',
  },
  colAction: {
    en: 'Action',
    ar: 'الإجراء',
    ms: 'Tindakan',
    id: 'Aksi',
    ur: 'عمل',
    fr: 'Action',
    es: 'Acción',
    de: 'Aktion',
    hi: 'कार्रवाई',
    tr: 'İşlem',
  },
};

interface StandardVehicleSpec {
  id: string;
  slug: string;
  indexStr: string;
  category: 'sedan' | 'family' | 'group';
  image: string;
  kicker: Record<Locale, string>;
  name: Record<Locale, string>;
  desc: Record<Locale, string>;
  passengers: number;
  luggage: number;
  acType: Record<Locale, string>;
  bookingVehicleId: string;
}

const APPROVED_BLUEPRINT_FLEET: StandardVehicleSpec[] = [
  {
    id: 'camry',
    slug: 'toyota-camry',
    indexStr: '01 / 05',
    category: 'sedan',
    image: '/assets/blueprint/vehicles/toyota-camry.webp',
    kicker: {
      en: 'Executive Sedan',
      ar: 'سيدان تنفيذية',
      ms: 'Sedan Eksekutif',
      id: 'Sedan Eksekutif',
      ur: 'ایگزیکٹو سیڈان',
      fr: 'Berline Exécutive',
      es: 'Sedán Ejecutivo',
      de: 'Business-Limousine',
      hi: 'एग्जीक्यूटिव सेडान',
      tr: 'Yönetici Sedan',
    },
    name: {
      en: 'Toyota Camry',
      ar: 'تويوتا كامري',
      ms: 'Toyota Camry',
      id: 'Toyota Camry',
      ur: 'ٹویوٹا کیمری',
      fr: 'Toyota Camry',
      es: 'Toyota Camry',
      de: 'Toyota Camry',
      hi: 'टोयोटा कैमरी',
      tr: 'Toyota Camry',
    },
    desc: {
      en: 'An elegant private sedan for couples and small families, featuring a smooth, quiet ride and multi-zone air conditioning.',
      ar: 'سيدان أنيقة للرحلات الفردية والأسر الصغيرة، مع تجربة قيادة مريحة ومقصورة مكيفة.',
      ms: 'Sedan peribadi elegan untuk pasangan dan keluarga kecil, menawarkan perjalanan senyap dan berhawa dingin.',
      id: 'Sedan pribadi elegan untuk pasangan dan keluarga kecil, dengan perjalanan tenang serta AC sejuk merata.',
      ur: 'جوڑوں اور چھوٹی فیملیز کے لیے پرسکون اور باوقار سیڈان، ایئر کنڈیشنڈ اور آرام دہ کیبن کے ساتھ۔',
      fr: 'Berline privée raffinée pour couples et petites familles, offrant une conduite souple et une climatisation optimale.',
      es: 'Sedán privado elegante para parejas y familias pequeñas, con marcha silenciosa y climatización confortable.',
      de: 'Elegante Privatlimousine für Paare und kleine Familien mit hohem Fahrkomfort und vollautomatischer Klimaanlage.',
      hi: 'दंपतियों और छोटे परिवारों के लिए सुरुचिपूर्ण सेडान, जिसमें शांत यात्रा और वातानुकूलित केबिन है।',
      tr: 'Çiftler ve küçük aileler için zarif özel sedan; sessiz sürüş ve ferah klima konforu.',
    },
    passengers: 4,
    luggage: 3,
    acType: {
      en: 'Dual-Zone Digital AC',
      ar: 'تكييف رقمي ثنائي المناطق',
      ms: 'AC Digital Dwi-Zon',
      id: 'AC Digital Dual-Zone',
      ur: 'ڈوئل زون ڈیجیٹل اے سی',
      fr: 'Climatisation Bi-Zone',
      es: 'Climatizador Bizona',
      de: '2-Zonen-Klimaautomatik',
      hi: 'डुअल-ज़ोन डिजिटल एसी',
      tr: 'Çift Bölgeli Dijital Klima',
    },
    bookingVehicleId: 'camry',
  },
  {
    id: 'staria',
    slug: 'hyundai-staria',
    indexStr: '02 / 05',
    category: 'family',
    image: '/assets/blueprint/vehicles/hyundai-staria.webp',
    kicker: {
      en: 'Premium Captain-Seats MPV',
      ar: 'مركبة عائلية بمقاعد كابتن فاخرة',
      ms: 'MPV Premium Kerusi Kapten',
      id: 'MPV Premium Kursi Kapten',
      ur: 'پریمیم کیپٹن سیٹس فیملی ایم پی وی',
      fr: 'Monospace Haut de Gamme Sièges Capitaine',
      es: 'Monovolumen Premium con Asientos Capitán',
      de: 'Premium-MPV mit Einzelsitzen',
      hi: 'प्रीमियम कैप्टन-सीट्स एमपीवी',
      tr: 'Kaptan Koltuklu Lüks MPV',
    },
    name: {
      en: 'Hyundai Staria VIP',
      ar: 'هيونداي ستاريا VIP',
      ms: 'Hyundai Staria VIP',
      id: 'Hyundai Staria VIP',
      ur: 'ہیونڈائی سٹاریا VIP',
      fr: 'Hyundai Staria VIP',
      es: 'Hyundai Staria VIP',
      de: 'Hyundai Staria VIP',
      hi: 'हुंडई स्टारिया VIP',
      tr: 'Hyundai Staria VIP',
    },
    desc: {
      en: 'A futuristic luxury cabin with independent captain seats, exceptionally low step-in for elderly pilgrims, and generous trunk space.',
      ar: 'مقصورة واسعة بمقاعد كابتن، مناسبة للعائلات والرحلات التي تحتاج مساحة وراحة إضافية.',
      ms: 'Kabin mewah futuristik dengan kerusi kapten bersandar, mudah dinaiki warga emas dan bagasi luas.',
      id: 'Kabin mewah futuristik dengan kursi kapten independen, lantai rendah ramah lansia, dan bagasi lega.',
      ur: 'مستقبل نما لگژری کیبن، ریكلائننگ کیپٹن سیٹس اور بزرگوں کے لیے آسان سواری کے ساتھ۔',
      fr: 'Cabine d’avant-garde avec sièges capitaine inclinables, accès aisé pour personnes âgées et grand coffre.',
      es: 'Cabina futurista de lujo con asientos capitán independientes, acceso bajo para mayores y amplio maletero.',
      de: 'Zukunftsorientierte Luxuskabine mit bequemen Einzelsitzen, seniorenfreundlichem Einstieg und großem Kofferraum.',
      hi: 'स्वतंत्र कैप्टन सीटों, बुजुर्गों के लिए आसान प्रवेश और विशाल ट्रंक के साथ भविष्य का लक्जरी केबिन।',
      tr: 'Bağımsız kaptan koltuklu, yaşlı dostu alçak tabanlı ve geniş bagajlı fütüristik lüks kabin.',
    },
    passengers: 7,
    luggage: 6, // AUTHORITATIVE LOCK: STRICTLY 6 BAGS
    acType: {
      en: 'Tri-Zone Digital Roof Diffusers',
      ar: 'تكييف ثلاثي المناطق بفتحات سقفية',
      ms: 'AC 3-Zon dengan Salur Siling',
      id: 'AC 3-Zona dengan Ventilasi Atap',
      ur: 'چھت کے اخراج کے ساتھ تھری زون اے سی',
      fr: 'Climatisation Tri-Zone Plafonnier',
      es: 'Climatizador Trizona con Difusores de Techo',
      de: '3-Zonen-Klima mit Dachausströmern',
      hi: 'त्रि-ज़ोन छत वेंटिलेशन एसी',
      tr: 'Tavan Difüzörlü Üç Bölgeli Klima',
    },
    bookingVehicleId: 'staria',
  },
  {
    id: 'yukon',
    slug: 'gmc-yukon-xl',
    indexStr: '03 / 05',
    category: 'family',
    image: '/assets/blueprint/vehicles/gmc-yukon-xl.webp',
    kicker: {
      en: 'Full-Size Luxury SUV',
      ar: 'سيارة SUV فاخرة كاملة الحجم',
      ms: 'SUV Mewah Saiz Penuh',
      id: 'SUV Mewah Berukuran Penuh',
      ur: 'فل سائز لگژری ایس یو وی',
      fr: 'Grand SUV Américain de Prestige',
      es: 'SUV de Lujo de Tamaño Completo',
      de: 'Großer Luxus-SUV der Spitzenklasse',
      hi: 'फुल-साइज़ लक्ज़री एसयूवी',
      tr: 'Tam Boyutlu Lüks SUV',
    },
    name: {
      en: 'GMC Yukon XL',
      ar: 'جي إم سي يوكن XL',
      ms: 'GMC Yukon XL',
      id: 'GMC Yukon XL',
      ur: 'جی ایم سی یوکون XL',
      fr: 'GMC Yukon XL',
      es: 'GMC Yukon XL',
      de: 'GMC Yukon XL',
      hi: 'जीएमसी युकोन XL',
      tr: 'GMC Yukon XL',
    },
    desc: {
      en: 'A commanding executive full-size SUV offering supreme road prestige, whisper-quiet highway ride, and massive 8-luggage capacity.',
      ar: 'سيارة قيادية متعددة الاستخدامات بمساحة رحبة للركاب والأمتعة، للرحلات العائلية الطويلة.',
      ms: 'SUV presiden berwibawa dengan ruang kabin luas dan kapasiti bagasi besar untuk keluarga jemaah.',
      id: 'SUV kepresidenan berwibawa dengan kabin senyap dan ruang bagasi sangat besar hingga 8 koper.',
      ur: 'حکومتی وقار کی حامل ایس یو وی، ہائی وے پر پرسکون سفر اور 8 بڑے سوٹ کیسز کی بے مثال گنجائش۔',
      fr: 'SUV imposant offrant prestige, silence acoustique de roulement et volume impressionnant de 8 bagages.',
      es: 'SUV imponente de gran presencia, aislamiento acústico superior y colosal capacidad para 8 maletas.',
      de: 'Imposanter Full-Size-SUV mit hohem Prestige, exzellenter Geräuschdämmung und Platz für 8 Koffer.',
      hi: 'प्रतिष्ठित फुल-साइज़ एसयूवी, शांत हाईवे राइड और 8 सूटकेस की विशाल क्षमता के साथ।',
      tr: 'Üstün yol prestiji, sessiz otoyol sürüşü ve 8 valizlik dev bagaj kapasitesi sunan heybetli SUV.',
    },
    passengers: 7,
    luggage: 8,
    acType: {
      en: 'Heavy-Duty Tri-Zone Climate Control',
      ar: 'تكييف قوي ثلاثي المناطق لجميع المقاعد',
      ms: 'AC Berkuasa Tinggi 3-Zon',
      id: 'AC Berat Tri-Zone Tenaga Tinggi',
      ur: 'ہیوی ڈیوٹی تھری زون ایئر کنڈیشننگ',
      fr: 'Climatisation Renforcée Tri-Zone',
      es: 'Climatización Trizona Reforzada',
      de: 'Leistungsstarke 3-Zonen-Klimaanlage',
      hi: 'हेवी-ड्यूटी त्रि-ज़ोन एसी',
      tr: 'Ağır Hizmet Üç Bölgeli İklimlendirme',
    },
    bookingVehicleId: 'yukon',
  },
  {
    id: 'hiace',
    slug: 'toyota-hiace',
    indexStr: '04 / 05',
    category: 'group',
    image: '/assets/blueprint/vehicles/toyota-hiace.webp',
    kicker: {
      en: 'Group Executive Van',
      ar: 'فان تنفيذي للمجموعات',
      ms: 'Van Eksekutif Kumpulan',
      id: 'Van Eksekutif Rombongan',
      ur: 'گروپ ایگزیکٹو وین',
      fr: 'Van Exécutif pour Groupes',
      es: 'Furgoneta Ejecutiva para Grupos',
      de: 'Executive-Großraumvan',
      hi: 'ग्रुप एग्जीक्यूटिव वैन',
      tr: 'Grup Yönetici Van',
    },
    name: {
      en: 'Toyota HiAce VIP',
      ar: 'تويوتا هايس VIP',
      ms: 'Toyota HiAce VIP',
      id: 'Toyota HiAce VIP',
      ur: 'ٹویوٹا ہائیس VIP',
      fr: 'Toyota HiAce VIP',
      es: 'Toyota HiAce VIP',
      de: 'Toyota HiAce VIP',
      hi: 'टोयोटा हायस VIP',
      tr: 'Toyota HiAce VIP',
    },
    desc: {
      en: 'A spacious high-roof passenger van uniting medium-sized families and pilgrimage groups in a single, air-conditioned vehicle.',
      ar: 'خيار عملي للمجموعات والعائلات الكبيرة، مع مساحة مخصصة للركاب والحقائب.',
      ms: 'Pilihan praktikal bumbung tinggi untuk keluarga besar dan kumpulan ziarah, berhawa dingin sepenuhnya.',
      id: 'Pilihan praktis atap tinggi untuk keluarga besar jamaah dalam satu kendaraan nyaman ber-AC dingin.',
      ur: 'بڑی فیملیز اور گروپس کے لیے اونچی چھت والی وین، کشادہ جگہ اور پرسکون سفر۔',
      fr: 'Van spacieux à toit surélevé réunissant familles nombreuses et groupes de pèlerins dans un grand confort.',
      es: 'Furgoneta espaciosa de techo alto para familias numerosas y grupos en un solo vehículo aclimatado.',
      de: 'Geräumiger Hochdach-Van, der Reisegruppen und größere Familien bequem und voll klimatisiert befördert.',
      hi: 'मध्यम आकार के परिवारों और तीर्थ समूहों को एक वातानुकूलित वाहन में ले जाने वाली वैन।',
      tr: 'Geniş aileleri ve hacı kafilelerini tek bir konforlu ve klimalı araçta buluşturan yüksek tavanlı van.',
    },
    passengers: 10,
    luggage: 10,
    acType: {
      en: 'Multi-Vent Row-by-Row Ceiling AC',
      ar: 'تكييف سقفي مستقل لكل صف من المقاعد',
      ms: 'Corong AC Siling untuk Setiap Baris',
      id: 'Saluran AC Plafon di Setiap Baris Kursi',
      ur: 'ہر نشست کی قطار کے لیے علیحدہ اے سی',
      fr: 'Ventilation Plafonnier Rangée par Rangée',
      es: 'Conductos de Techo para Cada Fila',
      de: 'Dachkanäle für jede Sitzreihe',
      hi: 'प्रत्येक पंक्ति के लिए छत एसी वेंट',
      tr: 'Her Sıra İçin Ayrı Tavan Klima Kanalları',
    },
    bookingVehicleId: 'hiace',
  },
  {
    id: 'coaster',
    slug: 'toyota-coaster',
    indexStr: '05 / 05',
    category: 'group',
    image: '/assets/blueprint/vehicles/toyota-coaster.webp',
    kicker: {
      en: 'Executive Group Coach',
      ar: 'حافلة تنفيذية للمجموعات',
      ms: 'Bas Eksekutif Kumpulan',
      id: 'Bus Eksekutif Rombongan',
      ur: 'ایگزیکٹو گروپ کوچ',
      fr: 'Autocar VIP Grands Groupes',
      es: 'Autocar Ejecutivo para Grupos',
      de: 'Executive-Reisebus für Delegationen',
      hi: 'एग्जीक्यूटिव ग्रुप कोच',
      tr: 'Grup Yönetici Otobüsü',
    },
    name: {
      en: 'Toyota Coaster VIP',
      ar: 'تويوتا كوستر VIP',
      ms: 'Toyota Coaster VIP',
      id: 'Toyota Coaster VIP',
      ur: 'ٹویوٹا کوسٹر VIP',
      fr: 'Toyota Coaster VIP',
      es: 'Toyota Coaster VIP',
      de: 'Toyota Coaster VIP',
      hi: 'टोयोटा कोस्टर VIP',
      tr: 'Toyota Coaster VIP',
    },
    desc: {
      en: 'A premier 21-passenger coach designed for large delegations and extended families, with massive dedicated rear luggage hold.',
      ar: 'حافلة واسعة للمجموعات الكبيرة والوفود، مع مساحة مريحة للجلوس والأمتعة.',
      ms: 'Bas premium 21 penumpang untuk rombongan jemaah besar dengan ruang bagasi belakang raksasa.',
      id: 'Pilihan utama rombongan jamaah besar dengan kursi nyaman dan bagasi belakang ekstra luas muat 20 koper.',
      ur: 'بڑے وفود اور قافلوں کے لیے 21 نشستوں والی کشادہ بس، پیچھے سامان کا بہت بڑا کمپارٹمنٹ۔',
      fr: 'Autocar de 21 places tout confort pour délégations et grands groupes, avec soute arrière géante.',
      es: 'Autocar de 21 plazas para delegaciones y grandes grupos familiares, con inmenso compartimento de equipaje.',
      de: 'Erstklassiger 21-Sitzer-Bus für Delegationen und große Reisegruppen mit riesigem Heckgepäckraum.',
      hi: 'बड़े प्रतिनिधिमंडलों और परिवारों के लिए 21 सीटों वाला कोच, विशाल रियर लगेज होल्ड के साथ।',
      tr: 'Geniş kafileler için tasarlanmış, arkada devasa bagaj alanına sahip 21 kişilik lüks otobüs.',
    },
    passengers: 21,
    luggage: 20,
    acType: {
      en: 'High-Capacity Industrial Central Climate System',
      ar: 'نظام تكييف مركزي عالي القدرة لجميع الركاب',
      ms: 'Sistem AC Pusat Berkuasa Perindustrian',
      id: 'Sistem Pendingin Sentral Kapasitas Industri',
      ur: 'صنعتی معیار کا ہائی کیپیسٹی سینٹرل اے سی',
      fr: 'Système de Climatisation Centrale Haute Capacité',
      es: 'Sistema Central de Alta Capacidad',
      de: 'Hochleistungs-Zentralklimaanlage',
      hi: 'उच्च क्षमता वाली औद्योगिक केंद्रीय एसी प्रणाली',
      tr: 'Yüksek Kapasiteli Merkezi Soğutma Sistemi',
    },
    bookingVehicleId: 'coaster',
  },
];

export function FleetCatalog({ locale }: FleetCatalogProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const isAr = locale === 'ar';
  const isRtl = isAr || locale === 'ur';

  const t = (key: string): string => {
    return FLEET_I18N[key]?.[locale] || FLEET_I18N[key]?.en || key;
  };

  const filteredVehicles = useMemo(() => {
    if (activeFilter === 'all') return APPROVED_BLUEPRINT_FLEET;
    return APPROVED_BLUEPRINT_FLEET.filter((v) => v.category === activeFilter);
  }, [activeFilter]);

  const whatsappMessage = encodeURIComponent(
    isAr
      ? 'السلام عليكم، أرغب في الاستفسار عن حجز كونسيرج خاص (مرسيدس مايباخ / هيونداي H1).'
      : 'Hello, I would like to inquire about VIP Concierge reservation (Mercedes-Maybach / Hyundai H1).'
  );
  const whatsappUrl = `https://wa.me/966567588261?text=${whatsappMessage}`;

  return (
    <div className="ref-fleet-page">
      {/* 1. BLUEPRINT PAGE HERO */}
      <section className="page-hero page-hero-light">
        <div className="wrap">
          <div className="breadcrumbs">
            <Link href={`/${locale}`}>{t('breadcrumbHome')}</Link>
            <span>/</span>
            <span>{t('breadcrumbFleet')}</span>
          </div>
          <span className="eyebrow">{t('eyebrow')}</span>
          <h1>
            {t('heroTitleMain')}
            <br />
            <em>{t('heroTitleEm')}</em>
          </h1>
          <p>{t('heroSubtitle')}</p>
        </div>
      </section>

      {/* 2. FLEET DIRECTORY SECTION */}
      <section className="section fleet-directory">
        <div className="wrap">
          <div className="filter-row">
            <span>{t('filterLabel')}</span>
            <div className="filter-pills" role="tablist">
              <button
                type="button"
                className={`filter ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                {t('filterAll')}
              </button>
              <button
                type="button"
                className={`filter ${activeFilter === 'sedan' ? 'active' : ''}`}
                onClick={() => setActiveFilter('sedan')}
              >
                {t('filterSedan')}
              </button>
              <button
                type="button"
                className={`filter ${activeFilter === 'family' ? 'active' : ''}`}
                onClick={() => setActiveFilter('family')}
              >
                {t('filterFamily')}
              </button>
              <button
                type="button"
                className={`filter ${activeFilter === 'group' ? 'active' : ''}`}
                onClick={() => setActiveFilter('group')}
              >
                {t('filterGroup')}
              </button>
            </div>
          </div>

          {/* LARGE EDITORIAL VEHICLE CARDS */}
          <div className="fleet-grid-large">
            {filteredVehicles.map((vehicle) => {
              const vKicker = vehicle.kicker[locale] || vehicle.kicker.en;
              const vName = vehicle.name[locale] || vehicle.name.en;
              const vDesc = vehicle.desc[locale] || vehicle.desc.en;

              return (
                <article
                  key={vehicle.id}
                  className="vehicle-card"
                  data-category={vehicle.category}
                >
                  <Link
                    href={`/${locale}/fleet/${vehicle.slug}`}
                    className="vehicle-card-image"
                    aria-label={vName}
                  >
                    <Image
                      src={vehicle.image}
                      alt={vName}
                      width={520}
                      height={320}
                      priority={vehicle.id === 'camry' || vehicle.id === 'staria'}
                      className="object-contain"
                    />
                    <span className="vehicle-index">{vehicle.indexStr}</span>
                  </Link>

                  <div className="vehicle-card-body">
                    <div className="card-kicker">{vKicker}</div>
                    <h2>{vName}</h2>
                    <p>{vDesc}</p>

                    <div className="vehicle-specs">
                      <span className="inline-flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#9C815A]" />
                        <strong>{vehicle.passengers}</strong> {t('passengers')}
                      </span>
                      <span className="text-[#DEDBD4]">•</span>
                      <span className="inline-flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-[#9C815A]" />
                        <strong>{vehicle.luggage}</strong> {t('luggage')}
                      </span>
                    </div>

                    <div className="vehicle-card-actions">
                      <Link
                        href={`/${locale}/fleet/${vehicle.slug}`}
                        className="text-link"
                      >
                        <span>{t('fullDetails')}</span>
                        <span aria-hidden="true">{isRtl ? '←' : '→'}</span>
                      </Link>
                      <Link
                        href={`/${locale}/booking?vehicle=${vehicle.bookingVehicleId}`}
                        className="btn btn-dark btn-small"
                      >
                        {t('bookVehicle')}
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. BESPOKE CONCIERGE BAND */}
      <section className="concierge-band concierge-light">
        <div className="wrap concierge-inner">
          <div>
            <span className="eyebrow">{t('conciergeEyebrow')}</span>
            <h2>
              {t('conciergeTitleMain')}
              <br />
              <em>{t('conciergeTitleEm')}</em>
            </h2>
            <p>{t('conciergeDesc')}</p>
            <a
              className="btn btn-dark"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{t('contactConcierge')}</span>
              <span aria-hidden="true">{isRtl ? '←' : '→'}</span>
            </a>
          </div>

          <div className="concierge-vehicles">
            <Link
              href={`/${locale}/fleet/mercedes-maybach`}
              aria-label="Mercedes-Maybach S-Class"
            >
              <Image
                src="/assets/blueprint/vehicles/mercedes-maybach.webp"
                alt="Mercedes Maybach S-Class"
                width={360}
                height={200}
                className="object-contain"
              />
              <span>Mercedes-Maybach S-Class</span>
            </Link>
            <Link
              href={`/${locale}/fleet/hyundai-h1`}
              aria-label="Hyundai H1"
            >
              <Image
                src="/assets/blueprint/vehicles/hyundai-h1.webp"
                alt="Hyundai H1 Starex"
                width={360}
                height={200}
                className="object-contain"
              />
              <span>Hyundai H1</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. COMPARISON SPECIFICATION MATRIX */}
      <section className="section bg-white border-t border-[#DEDBD4]">
        <div className="wrap">
          <div className="mb-8 text-center sm:text-start">
            <span className="eyebrow">{t('comparisonBadge')}</span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#101A27]">
              {t('comparisonTitle')}
            </h2>
          </div>

          <div className="overflow-x-auto rounded-lg border border-[#DEDBD4] shadow-xs">
            <table className="w-full text-start border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#101A27] text-white text-[11px] font-bold uppercase tracking-wider border-b border-[#C5A15D]/40">
                  <th className="py-3.5 px-4 text-start">{t('colVehicle')}</th>
                  <th className="py-3.5 px-3 text-start">{t('colClass')}</th>
                  <th className="py-3.5 px-3 text-center">{t('colPax')}</th>
                  <th className="py-3.5 px-3 text-center">{t('colBags')}</th>
                  <th className="py-3.5 px-4 text-start hidden md:table-cell">{t('colClimate')}</th>
                  <th className="py-3.5 px-4 text-center">{t('colAction')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DEDBD4]">
                {APPROVED_BLUEPRINT_FLEET.map((v, idx) => (
                  <tr
                    key={v.id}
                    className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F7F5F0]/70 hover:bg-[#F7F5F0]'}
                  >
                    <td className="py-3.5 px-4 font-bold text-[#101A27]">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-8 rounded bg-[#EDEAE4] overflow-hidden shrink-0 flex items-center justify-center p-1">
                          <Image
                            src={v.image}
                            alt={v.name[locale] || v.name.en}
                            width={48}
                            height={32}
                            className="object-contain mix-blend-multiply"
                          />
                        </div>
                        <span>{v.name[locale] || v.name.en}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-slate-600">
                      {v.kicker[locale] || v.kicker.en}
                    </td>
                    <td className="py-3.5 px-3 text-center font-bold text-[#101A27]">
                      {v.passengers}
                    </td>
                    <td className="py-3.5 px-3 text-center font-bold text-[#101A27]">
                      {v.luggage}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 hidden md:table-cell">
                      {v.acType[locale] || v.acType.en}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <Link
                        href={`/${locale}/booking?vehicle=${v.bookingVehicleId}`}
                        className="inline-flex items-center justify-center px-3 py-1.5 rounded bg-[#101A27] text-[#C5A15D] hover:text-white text-xs font-bold transition-colors"
                      >
                        {t('bookVehicle')}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
