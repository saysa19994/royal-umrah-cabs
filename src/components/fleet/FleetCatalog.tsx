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
  Sparkles,
  MessageCircle,
  CheckCircle2,
  Car,
  Clock,
  HeartHandshake,
  Luggage,
} from 'lucide-react';
import { Locale } from '@/i18n/config';
import { FleetShowcaseVehicle } from '@/data/fleet-showcase-data';
import { useCurrency } from '@/context/CurrencyContext';

interface FleetCatalogProps {
  vehicles: FleetShowcaseVehicle[];
  locale: Locale;
}

type FleetCategoryKey = 'all' | 'sedan' | 'suv' | 'van' | 'coach';

const FLEET_I18N: Record<string, Record<Locale, string>> = {
  heroBadge: {
    en: 'ROYAL AUTOMOTIVE SHOWROOM',
    ar: 'الأسطول الملكي لضيوف الرحمن',
    ms: 'BILIK PAMERAN AUTOMOTIF DIRAJA',
    id: 'SHOWROOM OTOMOTIF VIP DIRAJA',
    ur: 'شاہی آٹوموٹو شو روم',
    fr: 'SHOWROOM AUTOMOBILE ROYAL',
    es: 'SALÓN DE AUTOMÓVILES REAL',
    de: 'KÖNIGLICHER AUTOMOBIL-SHOWROOM',
    hi: 'रॉयल ऑटोमोटिव शोरूम',
    tr: 'KRALİYET OTOMOTİV SHOWROOM',
  },
  heroTitle: {
    en: 'Private Luxury Fleet Engineered for Sacred Journeys',
    ar: 'أسطول ملكي فاخر مخصص لراحة وسكينة ضيوف الرحمن',
    ms: 'Armada Mewah Persendirian Direka untuk Perjalanan Suci',
    id: 'Armada Mewah Privat Dirancang Khusus Perjalanan Ibadah',
    ur: 'مقدس سفر کے لیے خاص طور پر تیار کردہ شاہی لگژری بیڑا',
    fr: 'Flotte Privée de Prestige Conçue pour Vos Pèlerinages',
    es: 'Flota Privada de Lujo Diseñada para Viajes Sagrados',
    de: 'Exklusive Luxusflotte für Ihre Heilige Pilgerreise',
    hi: 'पवित्र यात्राओं के लिए तैयार किया गया निजी लक्जरी बेड़ा',
    tr: 'Kutsal Yolculuklar İçin Tasarlanmış Özel Lüks Filo',
  },
  heroSubtitle: {
    en: '100% Cash payment to driver upon arrival • Guaranteed fixed SAR fares • Sanitized 2024–2025 modern vehicles • Licensed executive chauffeurs',
    ar: 'دفع نقدي 100% مباشرة للسائق عند الوصول • أسعار ثابتة ومحددة بالريال • مركبات حديثة ومعقمة 2024–2025 • سائقون محترفون ومرخصون',
    ms: '100% Bayaran tunai kepada pemandu semasa tiba • Tambang SAR tetap • Kenderaan moden dinyahkuman 2024–2025 • Pemandu berlesen',
    id: '100% Bayar tunai ke sopir saat tiba • Tarif SAR pasti transparan • Armada modern 2024–2025 steril • Sopir berlisensi resmi',
    ur: 'آمد پر ڈرائیور کو 100% نقد ادائیگی • ضمانت شدہ مقررہ کرائے • جراثیم سے پاک جدید ترین گاڑیاں • تربیت یافتہ باحجاب و لائسنس یافتہ ڈرائیور',
    fr: '100% Paiement en espèces au chauffeur à l\'arrivée • Tarifs fixes garantis en SAR • Flotte moderne 2024–2025 • Chauffeurs agréés',
    es: '100% Pago en efectivo al chofer a la llegada • Tarifas fijas garantizadas en SAR • Flota moderna 2024–2025 • Choferes certificados',
    de: '100% Barzahlung beim Fahrer bei Ankunft • Garantierte Festpreise in SAR • Moderne Fahrzeuge 2024–2025 • Lizenzierte Chauffeure',
    hi: 'पहुंचने पर ड्राइवर को 100% नकद भुगतान • निश्चित रियाल किराया • 2024–2025 आधुनिक वाहन • प्रशिक्षित और लाइसेंस प्राप्त चौफर',
    tr: 'Varışta şoföre %100 nakit ödeme • Garantili sabit SAR tarifeleri • Steril modern 2024–2025 araçlar • Lisanslı özel şoförler',
  },
  filterAll: {
    en: 'All Vehicles',
    ar: 'كافة المركبات',
    ms: 'Semua Kenderaan',
    id: 'Semua Kendaraan',
    ur: 'تمام گاڑیاں',
    fr: 'Tous les véhicules',
    es: 'Todos los vehículos',
    de: 'Alle Fahrzeuge',
    hi: 'सभी वाहन',
    tr: 'Tüm Araçlar',
  },
  filterSedan: {
    en: 'Executive Sedans',
    ar: 'سيدان تنفيذي',
    ms: 'Sedan Eksekutif',
    id: 'Sedan Eksekutif',
    ur: 'ایگزیکٹو سیڈان',
    fr: 'Berlines Exécutives',
    es: 'Sedanes Ejecutivos',
    de: 'Business-Limousinen',
    hi: 'कार्यकारी सेडान',
    tr: 'Yönetici Sedan',
  },
  filterSuv: {
    en: 'American Luxury SUVs',
    ar: 'دفع رباعي فخم (SUV)',
    ms: 'SUV Mewah Amerika',
    id: 'SUV Mewah Amerika',
    ur: 'امریکی لگژری SUV',
    fr: 'SUV de Luxe Américains',
    es: 'SUV de Lujo Americanos',
    de: 'Amerikanische Luxus-SUVs',
    hi: 'अमेरिकी लक्जरी एसयूवी',
    tr: 'Amerikan Lüks SUV',
  },
  filterVan: {
    en: 'VIP Vans & Minibuses',
    ar: 'حافلات وفانات VIP',
    ms: 'Van & Minibas VIP',
    id: 'Van & Minibus VIP',
    ur: 'وی آئی پی وینز اور منی بس',
    fr: 'Vans & Minibus VIP',
    es: 'Furgonetas y Minibuses VIP',
    de: 'VIP-Vans & Minibusse',
    hi: 'वीआईपी वैन और मिनीबस',
    tr: 'VIP Van ve Minibüsler',
  },
  filterCoach: {
    en: 'Executive Coaches',
    ar: 'حافلات المجموعات الكبيرة',
    ms: 'Bas Eksekutif Rombongan',
    id: 'Bus Eksekutif Rombongan',
    ur: 'ایگزیکٹو گروپ کوچ',
    fr: 'Autocars VIP Grands Groupes',
    es: 'Autocares Ejecutivos',
    de: 'VIP-Reisebusse',
    hi: 'एग्जीक्यूटिव समूह कोच',
    tr: 'Grup VIP Otobüsleri',
  },
  passengers: {
    en: 'Passengers',
    ar: 'ركاب',
    ms: 'Penumpang',
    id: 'Penumpang',
    ur: 'مسافر',
    fr: 'Passagers',
    es: 'Pasajeros',
    de: 'Passagiere',
    hi: 'यात्री',
    tr: 'Yolcu',
  },
  luggage: {
    en: 'Luggage Bags',
    ar: 'حقائب كبيرة',
    ms: 'Beg Bagasi',
    id: 'Koper Besar',
    ur: 'بڑے بیگز',
    fr: 'Bagages',
    es: 'Maletas',
    de: 'Koffer',
    hi: 'बड़े बैग',
    tr: 'Büyük Valiz',
  },
  startingFrom: {
    en: 'Starting From',
    ar: 'يبدأ من',
    ms: 'Bermula dari',
    id: 'Mulai dari',
    ur: 'شروعات از',
    fr: 'À partir de',
    es: 'A partir de',
    de: 'Ab Preis',
    hi: 'शुरुआती किराया',
    tr: 'Başlangıç Fiyatı',
  },
  viewDetails: {
    en: 'View Details & Gallery',
    ar: 'التفاصيل والمعرض',
    ms: 'Butiran & Galeri',
    id: 'Detail & Galeri',
    ur: 'تفصیلات اور گیلری',
    fr: 'Détails & Galerie',
    es: 'Detalles y Galería',
    de: 'Details & Galerie',
    hi: 'विवरण और गैलरी',
    tr: 'Detaylar ve Galeri',
  },
  bookVehicle: {
    en: 'Book This Vehicle',
    ar: 'احجز هذه المركبة',
    ms: 'Tempah Kenderaan Ini',
    id: 'Pesan Kendaraan Ini',
    ur: 'یہ گاڑی بک کریں',
    fr: 'Réserver ce Véhicule',
    es: 'Reservar este Vehículo',
    de: 'Dieses Fahrzeug Buchen',
    hi: 'यह वाहन बुक करें',
    tr: 'Bu Aracı Ayırtın',
  },
  bespokeInquiry: {
    en: 'VIP Concierge Reservation',
    ar: 'حجز كونسيرج VIP خاص',
    ms: 'Tempahan Concierge VIP',
    id: 'Reservasi Concierge VIP',
    ur: 'وی آئی پی دربان بکنگ',
    fr: 'Réservation Concierge VIP',
    es: 'Reserva de Conserjería VIP',
    de: 'VIP-Concierge-Reservierung',
    hi: 'वीआईपी दरबान आरक्षण',
    tr: 'VIP Konsiyerj Rezervasyonu',
  },
  zamzamSpace: {
    en: 'Dedicated Zamzam Space',
    ar: 'مساحة مخصصة لمياه زمزم',
    ms: 'Ruang Khas Air Zamzam',
    id: 'Ruang Khusus Air Zamzam',
    ur: 'آب زمزم کے لیے مخصوص جگہ',
    fr: 'Espace Bouteilles Zamzam Dédié',
    es: 'Espacio Dedicado para Agua Zamzam',
    de: 'Separater Platz für Zamzam-Wasser',
    hi: 'ज़मज़म पानी के लिए अलग स्थान',
    tr: 'Zemzem Suyu İçin Özel Alan',
  },
  childSeatAvailable: {
    en: 'Child Safety Seat Available',
    ar: 'مقعد أمان للأطفال متوفر',
    ms: 'Kerusi Keselamatan Kanak-Kanak',
    id: 'Kursi Bayi & Anak Tersedia',
    ur: 'بچوں کی حفاظتی نشست دستیاب',
    fr: 'Siège Enfant sur Demande',
    es: 'Asiento Infantil Disponible',
    de: 'Kindersitz auf Anfrage Verfügbar',
    hi: 'बाल सुरक्षा सीट उपलब्ध',
    tr: 'Çocuk Güvenlik Koltuğu Mevcut',
  },
  climateComfort: {
    en: 'Multi-Zone Climate Control',
    ar: 'تكييف هوائي متعدد المناطق',
    ms: 'Kawalan Iklim Pelbagai Zon',
    id: 'Kontrol Pendingin Multi-Zona',
    ur: 'ملٹی زون ٹھنڈا ایئر کنڈیشننگ',
    fr: 'Climatisation Multi-Zones',
    es: 'Climatización Multizona',
    de: 'Mehrzonen-Klimaautomatik',
    hi: 'मल्टी-ज़ोन वातानुकूलन',
    tr: 'Çok Bölgeli Dijital Klima',
  },
  // Comparison Table
  comparisonTitle: {
    en: 'Fleet Capacity & Specification Comparison',
    ar: 'مقارنة سعات ومواصفات الأسطول الكامل',
    ms: 'Perbandingan Kapasiti & Spesifikasi Armada',
    id: 'Perbandingan Kapasitas & Spesifikasi Armada',
    ur: 'پورے بیڑے کی گنجائش اور خصوصیات کا موازنہ',
    fr: 'Comparatif des Capacités et Spécifications de la Flotte',
    es: 'Comparación de Capacidad y Especificaciones de la Flota',
    de: 'Vergleich der Flottenkapazität und -spezifikationen',
    hi: 'फ्लीट क्षमता और विशिष्टताओं की तुलना',
    tr: 'Filo Kapasitesi ve Özellik Karşılaştırması',
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
    ur: 'زمرہ',
    fr: 'Catégorie',
    es: 'Categoría',
    de: 'Kategorie',
    hi: 'श्रेणी',
    tr: 'Kategori',
  },
  colCapacity: {
    en: 'Capacity',
    ar: 'السعة',
    ms: 'Kapasiti',
    id: 'Kapasitas',
    ur: 'گنجائش',
    fr: 'Capacité',
    es: 'Capacidad',
    de: 'Kapazität',
    hi: 'क्षमता',
    tr: 'Kapasite',
  },
  colClimate: {
    en: 'Air Conditioning',
    ar: 'نظام التكييف',
    ms: 'Penyaman Udara',
    id: 'Sistem AC',
    ur: 'ایئر کنڈیشننگ',
    fr: 'Climatisation',
    es: 'Climatización',
    de: 'Klimaanlage',
    hi: 'वातानुकूलन',
    tr: 'Klima',
  },
  colBestFor: {
    en: 'Ideal For',
    ar: 'الأنسب لـ',
    ms: 'Paling Sesuai Untuk',
    id: 'Paling Cocok Untuk',
    ur: 'سب سے موزوں برائے',
    fr: 'Recommandé pour',
    es: 'Ideal para',
    de: 'Ideal für',
    hi: 'के लिए आदर्श',
    tr: 'En Uygun',
  },
  colStartingPrice: {
    en: 'Starting Fare',
    ar: 'السعر المبدئي',
    ms: 'Tambang Mula',
    id: 'Tarif Mulai',
    ur: 'ابتدائی کرایہ',
    fr: 'Tarif Dès',
    es: 'Tarifa Desde',
    de: 'Ab Preis',
    hi: 'शुरुआती किराया',
    tr: 'Başlangıç Fiyatı',
  },
  colAction: {
    en: 'Select',
    ar: 'اختيار',
    ms: 'Pilih',
    id: 'Pilih',
    ur: 'منتخب کریں',
    fr: 'Sélectionner',
    es: 'Seleccionar',
    de: 'Auswählen',
    hi: 'चुनें',
    tr: 'Seç',
  },
  // Pillars
  pillar1Title: {
    en: '100% Cash Upon Arrival',
    ar: 'دفع نقدي 100% عند الوصول',
    ms: '100% Tunai Semasa Tiba',
    id: '100% Bayar Tunai Saat Tiba',
    ur: 'آمد پر 100% نقد ادائیگی',
    fr: '100% Espèces à l\'Arrivée',
    es: '100% Efectivo a la Llegada',
    de: '100% Barzahlung bei Ankunft',
    hi: 'पहुंचने पर 100% नकद',
    tr: 'Varışta %100 Nakit Ödeme',
  },
  pillar1Desc: {
    en: 'Pay directly to your chauffeur in SAR or USD after safely arriving at your hotel. No deposit, advance, or card fees.',
    ar: 'ادفع مباشرة لسائقك بالريال السعودي أو الدولار بعد وصولك الآمن للفندق. لا عربون ولا دفع مسبق ولا رسوم بطاقات.',
    ms: 'Bayar terus kepada pemandu dalam SAR atau USD selepas tiba di hotel. Tiada deposit atau bayaran pendahuluan.',
    id: 'Bayar langsung ke sopir dalam SAR atau USD setelah tiba aman di hotel. Tanpa uang muka atau deposit sama sekali.',
    ur: 'اپنے ہوٹل پہنچنے کے بعد ڈرائیور کو براہ راست نقد رقم ادا کریں۔ کسی پیشگی رقم یا کارڈ فیس کی ضرورت نہیں۔',
    fr: 'Réglez directement votre chauffeur en SAR ou USD une fois à l\'hôtel. Sans acompte ni carte bancaire.',
    es: 'Pague directamente a su chofer en SAR o USD tras llegar a su hotel. Sin depósitos ni cargos con tarjeta.',
    de: 'Zahlen Sie direkt beim Chauffeur in SAR oder USD nach Ankunft im Hotel. Keine Anzahlung oder Kreditkartengebühren.',
    hi: 'होटल पहुंचने के बाद सीधे ड्राइवर को नकद भुगतान करें। कोई अग्रिम या जमा राशि की आवश्यकता नहीं है।',
    tr: 'Otele güvenle vardıktan sonra şoförünüze doğrudan SAR veya USD ile nakit ödeyin. Ön ödeme gerekmez.',
  },
  pillar2Title: {
    en: 'Flight Tracking & 60-Min Wait',
    ar: 'تتبع الرحلات وانتظار مجاني 60 دقيقة',
    ms: 'Penjejakan Penerbangan & Menunggu 60 Minit',
    id: 'Pantau Penerbangan & Tunggu 60 Menit',
    ur: 'پرواز کی نگرانی اور 60 منٹ مفت انتظار',
    fr: 'Suivi de Vol & 60 Min d\'Attente Gratuite',
    es: 'Seguimiento de Vuelo y Espera de 60 Min',
    de: 'Flugverfolgung & 60 Min. Kostenlose Wartezeit',
    hi: 'उड़ान ट्रैकिंग और 60 मिनट मुफ्त प्रतीक्षा',
    tr: 'Uçuş Takibi ve 60 Dk Ücretsiz Bekleme',
  },
  pillar2Desc: {
    en: 'Chauffeurs monitor real-time flight radar. Even if your flight is delayed, your driver greets you with a personalized name board.',
    ar: 'يرصد سائقونا مواعيد الرحلات بدقة. حتى في حال تأخر الرحلة، سينتظرك سائقك في صالة الوصول مع لوحة اسمك الترحيبية.',
    ms: 'Pemandu memantau status penerbangan secara langsung. Pemandu tetap menyambut anda walaupun penerbangan lewat.',
    id: 'Sopir memantau jadwal kedatangan pesawat secara langsung. Anda tetap disambut ramah meski penerbangan terlambat.',
    ur: 'ڈرائیور فلائٹ کا وقت براہ راست مانیٹر کرتے ہیں۔ فلائٹ لیٹ ہونے پر بھی آپ کا پرتپاک استقبال کیا جاتا ہے۔',
    fr: 'Nos chauffeurs suivent vos vols en temps réel. Même en cas de retard, votre chauffeur vous attend avec un panneau nominatif.',
    es: 'Nuestros choferes monitorean su vuelo en tiempo real y le recibirán con cartel personalizado aun con retrasos.',
    de: 'Unsere Chauffeure überwachen Ihren Flug in Echtzeit und erwarten Sie mit Namensschild auch bei Verspätung.',
    hi: 'ड्राइवर रीयल-टाइम में उड़ानों की निगरानी करते हैं। देरी होने पर भी ड्राइवर आपका नाम लेकर स्वागत करेगा।',
    tr: 'Şoförlerimiz uçuşunuzu anlık takip eder. Gecikme olsa dahi karşılama panonuzla sizi bekler.',
  },
  pillar3Title: {
    en: 'Daily Sanitized 2024–2025 Fleet',
    ar: 'مركبات حديثة 2024–2025 معقمة يومياً',
    ms: 'Armada Moden 2024–2025 Dinyahkuman',
    id: 'Armada 2024–2025 Bersih & Steril',
    ur: 'روزانہ جراثیم کش جدید گاڑیاں 2024–2025',
    fr: 'Flotte 2024–2025 Désinfectée Quotidiennement',
    es: 'Flota 2024–2025 Desinfectada Diariamente',
    de: 'Täglich Desinfizierte Flotte 2024–2025',
    hi: 'प्रतिदिन स्वच्छ व आधुनिक वाहन 2024–2025',
    tr: 'Günlük Dezenfekte Edilen 2024–2025 Filo',
  },
  pillar3Desc: {
    en: 'Spotless hygienic interiors, powerful ice-cold air conditioning, and complimentary chilled Zamzam water bottles on every private journey.',
    ar: 'نظافة فائقة وتعقيم دوري، تكييف قوي وبارد يناسب أجواء المملكة، مع ضيافة مياه زمزم المبردة في كل رحلة خاصة.',
    ms: 'Dalaman yang bersih, penyaman udara sejuk, dan botol air Zamzam dingin percuma dalam setiap perjalanan.',
    id: 'Interior bersih harum, pendingin udara super dingin, dan air Zamzam dingin gratis di setiap perjalanan.',
    ur: 'انتہائی صاف اور خوشبودار کیبن، ٹھنڈا اے سی اور ہر سفر میں ٹھنڈے آب زمزم کی پرخلوص ضیافت۔',
    fr: 'Habitacles impeccables, climatisation puissante et bouteilles d\'eau de Zamzam fraîches offertes pour votre trajet.',
    es: 'Interiores impecables, aire acondicionado de alto rendimiento y agua Zamzam fría de cortesía en cada viaje.',
    de: 'Makellose Innenräume, leistungsstarke Klimaanlage und kostenloses gekühltes Zamzam-Wasser bei jeder Fahrt.',
    hi: 'स्वच्छ इंटीरियर, शक्तिशाली वातानुकूलन और हर यात्रा पर मानार्थ ठंडा ज़मज़म पानी।',
    tr: 'Kusursuz hijyen, güçlü klima ve her özel transferde ikram edilen soğuk Zemzem suyu.',
  },
  pillar4Title: {
    en: 'Certified Holy Haramain Chauffeurs',
    ar: 'سائقون معتمدون وخبراء بطرق الحرمين',
    ms: 'Pemandu Bertauliah Pakar Laluan Dua Tanah Suci',
    id: 'Sopir Bersertifikat Ahli Rute Dua Tanah Suci',
    ur: 'حرمین شریفین کے راستوں کے ماہر لائسنس یافتہ ڈرائیور',
    fr: 'Chauffeurs Certifiés Experts des Lieux Saints',
    es: 'Choferes Certificados Expertos en los Santos Lugares',
    de: 'Zertifizierte Chauffeure für die Heiligen Stätten',
    hi: 'पवित्र हरमैन मार्गों के विशेषज्ञ प्रमाणित चौफर',
    tr: 'Kutsal Topraklar Güzergah Uzmanı Lisanslı Şoförler',
  },
  pillar4Desc: {
    en: 'Professional, courteous, multi-lingual chauffeurs intimately familiar with Makkah hotels, Madinah Miqat points, and highway protocols.',
    ar: 'سائقون مؤدبون ومتعددو اللغات، على دراية تامة بمداخل فنادق مكة، مواقيت الإحرام، ومحطات الراحة على طريق الهجرة السريع.',
    ms: 'Pemandu beradab dan berpengetahuan luas tentang hotel Makkah, titik Miqat Madinah, dan lebuh raya.',
    id: 'Sopir sopan dan berpengalaman luas tentang akses hotel Makkah, titik Miqat Madinah, serta jalan tol.',
    ur: 'شائستہ اور تجربہ کار ڈرائیور جو مکہ کے ہوٹلوں، میقات کے مقامات اور ہائی وے کے تمام پروٹوکولز سے مکمل واقف ہیں۔',
    fr: 'Chauffeurs courtois maîtrisant parfaitement les accès hôteliers à La Mecque, les arrêts Miqat et les autoroutes.',
    es: 'Choferes corteses con conocimiento exhaustivo de accesos a hoteles en La Meca, puntos de Miqat y autopistas.',
    de: 'Höfliche Chauffeure mit umfassender Kenntnis der Hotelzufahrten in Mekka, Miqat-Stationen und Autobahnen.',
    hi: 'मक्का के होटलों, मदीना मीक़ात और हाईवे प्रोटोकॉल से भली-भांति परिचित विनम्र चौफर।',
    tr: 'Mekke otel girişlerine, Medine Mikat noktalarına ve otoyol güzergahlarına hakim profesyonel şoförler.',
  },
  // Convoy Callout
  convoyTitle: {
    en: 'Need Multiple Convoy Vehicles or Bespoke Chauffeur Services?',
    ar: 'هل تحتاج إلى أسطول متعدد أو مواكب VIP لوفدك الكريم؟',
    ms: 'Perlukan Pelbagai Kenderaan Konvoi atau Perkhidmatan Khas?',
    id: 'Butuh Beberapa Kendaraan Konvoi atau Layanan VIP Khusus?',
    ur: 'کیا آپ کو وفد کے لیے متعدد گاڑیوں یا خصوصی پروٹوکول کی ضرورت ہے؟',
    fr: 'Besoin d\'un Convoi de Véhicules ou d\'un Service Chauffeur Sur Mesure ?',
    es: '¿Necesita Varios Vehículos en Convoy o Servicios a Medida?',
    de: 'Benötigen Sie Mehrere Konvoifahrzeuge oder Maßgeschneiderten VIP-Service?',
    hi: 'क्या आपको कई काफिले वाले वाहनों या विशेष चौफर सेवा की आवश्यकता है?',
    tr: 'Birden Fazla Konvoy Aracı veya Özel Şoför Hizmetine mi İhtiyacınız Var?',
  },
  convoyDesc: {
    en: 'Our 24/7 VIP Chauffeur Dispatch coordinates coordinated multi-vehicle arrivals, VIP delegations, corporate pilgrimages, and bespoke intercity itineraries.',
    ar: 'فريق عمليات الأسطول متاح على مدار الساعة لتنسيق رحلات الوفود الكبيرة، والمواكب المتزامنة، والجداول المخصصة بين كافة مدن المملكة.',
    ms: 'Pusat operasi kami beroperasi 24/7 untuk menyelaras ketibaan rombongan besar dan jadual perjalanan antara bandar.',
    id: 'Pusat operasi VIP kami siaga 24/7 mengoordinasikan rombongan besar dan rute khusus antarkota di seluruh Arab Saudi.',
    ur: 'ہمارا 24/7 وی آئی پی آپریشن سینٹر بڑے وفود اور کسٹم روٹس کے لیے مکمل ہم آہنگی فراہم کرتا ہے۔',
    fr: 'Notre équipe VIP coordonne 24h/24 les arrivées multiples, délégations officielles et itinéraires personnalisés.',
    es: 'Nuestra central VIP coordina las 24 horas del día caravanas de vehículos, delegaciones y rutas personalizadas.',
    de: 'Unsere 24/7 VIP-Zentrale koordiniert koordinierte Mehrfahrzeug-Transfers, Delegationen und individuelle Routen.',
    hi: 'हमारा 24/7 वीआईपी संचालन दल बड़े प्रतिनिधिमंडलों और कस्टम यात्रा कार्यक्रमों का समन्वय करता है।',
    tr: '7/24 VIP operasyon merkezimiz büyük heyetler, çoklu konvoylar ve özel güzergahlar için kesintisiz koordinasyon sağlar.',
  },
  convoyBtn: {
    en: 'Chat with VIP Fleet Dispatch',
    ar: 'تواصل مع عمليات الأسطول عبر واتساب',
    ms: 'Bercakap dengan Pengurusan Armada VIP',
    id: 'Hubungi Operasional Armada VIP',
    ur: 'وی آئی پی فلیٹ ڈسپیچ سے رابطہ کریں',
    fr: 'Contacter la Gestion de Flotte VIP',
    es: 'Contactar con la Central de Flota VIP',
    de: 'VIP-Flottenmanagement Kontaktieren',
    hi: 'वीआईपी फलीट्स दल से चैट करें',
    tr: 'VIP Filo Operasyonu ile WhatsApp\'tan Görüşün',
  },
};

// Map vehicle id to filter category
function getVehicleCategoryKey(id: string): FleetCategoryKey {
  if (id === 'camry' || id === 'maybach') return 'sedan';
  if (id === 'yukon') return 'suv';
  if (id === 'staria' || id === 'h1' || id === 'hiace') return 'van';
  if (id === 'coaster') return 'coach';
  return 'sedan';
}

// Recommended group type per vehicle for comparison table
const RECOMMENDED_FOR: Record<string, Record<Locale, string>> = {
  maybach: {
    en: 'VIP Dignitaries & First-Class Travelers (1–3 Pax)',
    ar: 'كبار الشخصيات والمسافرون الملكيون (1–3 ركاب)',
    ms: 'Tetamu VIP & Pengembara Kelas Pertama (1–3 Pax)',
    id: 'Tamu VIP & Pelancong Kelas Satu (1–3 Pax)',
    ur: 'وی آئی پی شخصیات اور فرسٹ کلاس مسافر (1-3 افراد)',
    fr: 'Dignitaires VIP & Première Classe (1–3 Passagers)',
    es: 'Dignatarios VIP y Primera Clase (1–3 Pasajeros)',
    de: 'VIP-Ehrengäste & First-Class-Reisende (1–3 Pers.)',
    hi: 'वीआईपी और प्रथम श्रेणी के यात्री (1-3 व्यक्ति)',
    tr: 'VIP Misafirler ve Birinci Sınıf Yolcular (1–3 Kişi)',
  },
  yukon: {
    en: 'VIP Families & Travelers with Heavy Luggage (4–7 Pax)',
    ar: 'العائلات الكريمة والوفود ذات الحقائب الكبيرة (4–7 ركاب)',
    ms: 'Keluarga VIP & Bagasi Banyak (4–7 Pax)',
    id: 'Keluarga VIP & Banyak Koper Besar (4–7 Pax)',
    ur: 'وی آئی پی فیملیز اور زیادہ سامان والے مسافر (4-7 افراد)',
    fr: 'Familles VIP & Bagages Volumineux (4–7 Passagers)',
    es: 'Familias VIP y Equipaje Abundante (4–7 Pasajeros)',
    de: 'VIP-Familien mit viel Gepäck (4–7 Pers.)',
    hi: 'वीआईपी परिवार और भारी सामान वाले यात्री (4-7 व्यक्ति)',
    tr: 'VIP Aileler ve Ağır Valizli Yolcular (4–7 Kişi)',
  },
  staria: {
    en: 'Umrah Families & Elderly Pilgrims (4–7 Pax)',
    ar: 'عائلات المعتمرين وكبار السن براحة فائقة (4–7 ركاب)',
    ms: 'Keluarga Umrah & Warga Emas (4–7 Pax)',
    id: 'Keluarga Umrah & Lansia Ramah Pijakan (4–7 Pax)',
    ur: 'عمرہ فیملیز اور بزرگ زائرین (4-7 افراد)',
    fr: 'Familles de Pèlerins & Seniors (4–7 Passagers)',
    es: 'Familias en Umrah y Peregrinos Mayores (4–7 Pasajeros)',
    de: 'Umrah-Familien & Senioren (4–7 Pers.)',
    hi: 'उमरा परिवार और बुजुर्ग तीर्थयात्री (4-7 व्यक्ति)',
    tr: 'Umre Aileleri ve Yaşlı Misafirler (4–7 Kişi)',
  },
  camry: {
    en: 'Solo Pilgrims & Couples with Standard Luggage (1–4 Pax)',
    ar: 'المعتمرون الأفراد والأزواج بالحقائب المعتادة (1–4 ركاب)',
    ms: 'Jemaah Solo & Pasangan Suami Isteri (1–4 Pax)',
    id: 'Jamaah Solo & Pasangan Suami Istri (1–4 Pax)',
    ur: 'تنہا زائرین اور شادی شدہ جوڑے (1-4 افراد)',
    fr: 'Pèlerins Solo & Couples (1–4 Passagers)',
    es: 'Peregrinos Solos y Parejas (1–4 Pasajeros)',
    de: 'Solo-Pilger & Paare mit Standardgepäck (1–4 Pers.)',
    hi: 'एकल तीर्थयात्री और दंपत्ति (1-4 व्यक्ति)',
    tr: 'Yalnız Seyahat Edenler ve Çiftler (1–4 Kişi)',
  },
  h1: {
    en: 'Value-Seeking Families & Small Groups (5–8 Pax)',
    ar: 'العائلات والمجموعات الصغيرة الباحثة عن العملية (5–8 ركاب)',
    ms: 'Keluarga & Kumpulan Kecil Ekonomi (5–8 Pax)',
    id: 'Keluarga & Rombongan Kecil Praktis (5–8 Pax)',
    ur: 'فیملیز اور چھوٹے گروپس (5-8 افراد)',
    fr: 'Familles Économiques & Petits Groupes (5–8 Passagers)',
    es: 'Familias y Grupos Pequeños (5–8 Pasajeros)',
    de: 'Familien & Kleine Gruppen (5–8 Pers.)',
    hi: 'परिवार और छोटे समूह (5-8 व्यक्ति)',
    tr: 'Geniş Aileler ve Küçük Gruplar (5–8 Kişi)',
  },
  hiace: {
    en: 'Medium Pilgrim Groups & Extended Families (8–10 Pax)',
    ar: 'المجموعات المتوسطة والعائلات الممتدة (8–10 ركاب)',
    ms: 'Kumpulan Sederhana & Keluarga Besar (8–10 Pax)',
    id: 'Rombongan Menengah & Keluarga Besar (8–10 Pax)',
    ur: 'درمیانے درجے کے قافلے اور مشترکہ خاندان (8-10 افراد)',
    fr: 'Groupes Moyens & Familles Nombreuses (8–10 Passagers)',
    es: 'Grupos Medianos y Familias Extensas (8–10 Pasajeros)',
    de: 'Mittelgroße Gruppen & Großfamilien (8–10 Pers.)',
    hi: 'मध्यम समूह और संयुक्त परिवार (8-10 व्यक्ति)',
    tr: 'Orta Büyüklükte Gruplar ve Geniş Aileler (8–10 Kişi)',
  },
  coaster: {
    en: 'Large Delegations & Organized Tour Groups (12–21 Pax)',
    ar: 'الوفود الكبيرة وقوافل المعتمرين المنظمة (12–21 راكب)',
    ms: 'Rombongan Besar & Agensi Pelancongan (12–21 Pax)',
    id: 'Rombongan Besar & Grup Travel Umrah (12–21 Pax)',
    ur: 'بڑے وفود اور عمرہ ٹور گروپس (12-21 افراد)',
    fr: 'Grandes Délégations & Agences de Voyage (12–21 Passagers)',
    es: 'Grandes Delegaciones y Grupos de Viaje (12–21 Pasajeros)',
    de: 'Große Delegationen & Reisegruppen (12–21 Pers.)',
    hi: 'बड़े प्रतिनिधिमंडल और संगठित समूह (12-21 व्यक्ति)',
    tr: 'Büyük Kafileler ve Tur Grupları (12–21 Kişi)',
  },
};

export function FleetCatalog({ vehicles, locale }: FleetCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<FleetCategoryKey>('all');
  const { formatPrice } = useCurrency();
  const isAr = locale === 'ar';
  const isRtl = isAr || locale === 'ur';

  const t = (key: string): string => {
    return FLEET_I18N[key]?.[locale] || FLEET_I18N[key]?.en || key;
  };

  const filteredVehicles = useMemo(() => {
    if (selectedCategory === 'all') return vehicles;
    return vehicles.filter((v) => getVehicleCategoryKey(v.id) === selectedCategory);
  }, [vehicles, selectedCategory]);

  const categories: { key: FleetCategoryKey; label: string }[] = [
    { key: 'all', label: t('filterAll') },
    { key: 'sedan', label: t('filterSedan') },
    { key: 'suv', label: t('filterSuv') },
    { key: 'van', label: t('filterVan') },
    { key: 'coach', label: t('filterCoach') },
  ];

  const whatsappBaseUrl = 'https://wa.me/966567554988';

  return (
    <div className="text-start" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* 1. HERO SHOWROOM BANNER */}
      <section className="relative bg-[#101827] text-white pt-16 pb-20 md:pt-20 md:pb-28 overflow-hidden border-b border-[#C5A15D]/20">
        {/* Luxury geometric ambient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#C5A15D_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        <div className="absolute -top-32 end-0 w-96 h-96 bg-[#C5A15D]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 start-0 w-96 h-96 bg-[#111C30] rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111C30] border border-[#C5A15D]/40 text-[#C5A15D] text-xs font-black uppercase tracking-widest mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('heroBadge')}</span>
          </div>

          {/* Heading */}
          <h1 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight max-w-4xl mx-auto mb-4">
            {t('heroTitle')}
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed font-light mb-8">
            {t('heroSubtitle')}
          </p>

          {/* Quick trust metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto pt-4 border-t border-white/10">
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-200 font-semibold py-2">
              <ShieldCheck className="w-4 h-4 text-[#C5A15D] shrink-0" />
              <span>100% Pay on Arrival</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-200 font-semibold py-2">
              <Clock className="w-4 h-4 text-[#C5A15D] shrink-0" />
              <span>Flight Delay Protected</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-200 font-semibold py-2">
              <Sparkles className="w-4 h-4 text-[#C5A15D] shrink-0" />
              <span>2024–2025 Sanitized</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-200 font-semibold py-2">
              <HeartHandshake className="w-4 h-4 text-[#C5A15D] shrink-0" />
              <span>Certified Chauffeurs</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY FILTER BAR */}
      <section className="sticky top-16 md:top-20 z-30 bg-[#F7F5F0]/95 backdrop-blur-md border-b border-[#E8E3DA] py-3.5 shadow-xs">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#101827] text-white shadow-sm ring-1 ring-[#C5A15D]/40'
                      : 'bg-white text-slate-700 hover:text-slate-950 border border-[#E8E3DA] hover:border-[#C5A15D]/60'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. SHOWROOM CATALOG GRID */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#F7F5F0]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredVehicles.map((vehicle) => {
              const vName = vehicle.name[locale] || vehicle.name.en;
              const vCategory = vehicle.category[locale] || vehicle.category.en;
              const vDesc = vehicle.desc[locale] || vehicle.desc.en;
              const isBespoke = vehicle.id === 'maybach' || vehicle.id === 'h1';

              // Primary studio photograph
              const mainPhoto =
                vehicle.gallery?.[0]?.src ||
                `/assets/images/vehicles/${vehicle.slug}/exterior-studio.webp`;

              // Direct WhatsApp inquiry URL for bespoke/concierge
              const whatsappMsg = encodeURIComponent(
                isAr
                  ? `السلام عليكم، أود حجز سيارة (${vName}) لرحلتنا في العمرة.`
                  : `Hello, I would like to inquire about reserving the (${vName}) for our Umrah transfer.`
              );
              const customWhatsappUrl = `${whatsappBaseUrl}?text=${whatsappMsg}`;

              // Standard booking URL
              const bookingUrl = `/${locale}/booking?vehicle=${vehicle.bookingVehicleId}`;

              return (
                <div
                  key={vehicle.id}
                  className="bg-white rounded-3xl border border-[#E8E3DA] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                >
                  {/* Top Image Stage */}
                  <div className="relative aspect-[16/10] bg-[#101827] overflow-hidden">
                    <Image
                      src={mainPhoto}
                      alt={`${vName} - Duyuf Alrahman VIP`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Category pill */}
                    <div className="absolute top-3.5 start-3.5 z-10">
                      <span className="inline-block px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider bg-[#101827]/85 backdrop-blur-md text-[#C5A15D] border border-[#C5A15D]/30 shadow-xs">
                        {vCategory}
                      </span>
                    </div>

                    {/* Price tag badge */}
                    <div className="absolute bottom-3 end-3 z-10">
                      <div className="px-3 py-1 rounded-xl bg-white/95 backdrop-blur-md border border-[#E8E3DA] text-slate-900 shadow-md flex items-center gap-1.5">
                        <span className="text-[10px] uppercase font-bold text-slate-500">
                          {t('startingFrom')}
                        </span>
                        <span className="font-display font-extrabold text-sm text-[#101827]">
                          {formatPrice(vehicle.startingPriceSAR)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-[#101827] tracking-tight mb-2">
                        {vName}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-5 font-normal">
                        {vDesc}
                      </p>

                      {/* Specifications Badges */}
                      <div className="grid grid-cols-2 gap-2 mb-5">
                        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F7F5F0] border border-[#E8E3DA] text-slate-800 text-xs font-semibold">
                          <Users className="w-4 h-4 text-[#C5A15D] shrink-0" />
                          <span>
                            {vehicle.passengers} {t('passengers')}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F7F5F0] border border-[#E8E3DA] text-slate-800 text-xs font-semibold">
                          <Briefcase className="w-4 h-4 text-[#C5A15D] shrink-0" />
                          <span>
                            {vehicle.luggage} {t('luggage')}
                          </span>
                        </div>
                      </div>

                      {/* Trust inclusions */}
                      <div className="space-y-1.5 mb-6 text-xs text-slate-700">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{t('climateComfort')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{t('zamzamSpace')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{t('childSeatAvailable')}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-4 border-t border-[#E8E3DA]">
                      {/* View Details */}
                      <Link
                        href={`/${locale}/fleet/${vehicle.slug}`}
                        className="w-full sm:flex-1 h-11 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 hover:border-[#C5A15D] text-slate-900 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all text-center"
                      >
                        <span>{t('viewDetails')}</span>
                      </Link>

                      {/* Book Button */}
                      {isBespoke ? (
                        <a
                          href={customWhatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:flex-1 h-11 px-4 rounded-xl bg-[#C5A15D] hover:bg-[#b5924f] text-[#101827] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95 text-center"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>{t('bespokeInquiry')}</span>
                        </a>
                      ) : (
                        <Link
                          href={bookingUrl}
                          className="w-full sm:flex-1 h-11 px-4 rounded-xl bg-[#101827] hover:bg-[#111C30] text-[#C5A15D] hover:text-white border border-[#C5A15D]/40 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95 text-center"
                        >
                          <span>{t('bookVehicle')}</span>
                          <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. FLEET COMPARISON MATRIX TABLE */}
      <section className="py-12 sm:py-16 md:py-20 bg-white border-t border-[#E8E3DA]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-[#F7F5F0] border border-[#E8E3DA] text-[#C5A15D] mb-3">
              VIP Comparison Matrix
            </span>
            <h2 className="font-display font-semibold text-2xl sm:text-3xl md:text-4xl text-[#101827] tracking-tight">
              {t('comparisonTitle')}
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#E8E3DA] shadow-xs">
            <table className="w-full text-start border-collapse">
              <thead>
                <tr className="bg-[#101827] text-white text-xs font-extrabold uppercase tracking-wider border-b border-[#C5A15D]/30">
                  <th className="py-4 px-4 sm:px-6">{t('colVehicle')}</th>
                  <th className="py-4 px-4">{t('colClass')}</th>
                  <th className="py-4 px-4 text-center">{t('colCapacity')}</th>
                  <th className="py-4 px-4 hidden md:table-cell">{t('colClimate')}</th>
                  <th className="py-4 px-4 hidden lg:table-cell">{t('colBestFor')}</th>
                  <th className="py-4 px-4 text-center">{t('colStartingPrice')}</th>
                  <th className="py-4 px-4 text-center">{t('colAction')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E3DA] text-xs sm:text-sm text-slate-800">
                {vehicles.map((v, idx) => {
                  const vName = v.name[locale] || v.name.en;
                  const vCat = v.category[locale] || v.category.en;
                  const bestFor =
                    RECOMMENDED_FOR[v.id]?.[locale] ||
                    RECOMMENDED_FOR[v.id]?.en ||
                    'Pilgrim Groups';
                  const isBespoke = v.id === 'maybach' || v.id === 'h1';

                  return (
                    <tr
                      key={v.id}
                      className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F7F5F0]/60 hover:bg-[#F7F5F0]'}
                    >
                      {/* Vehicle Name & Thumbnail */}
                      <td className="py-4 px-4 sm:px-6 font-bold text-[#101827]">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-8 rounded-md overflow-hidden bg-[#101827] shrink-0 border border-slate-200">
                            <Image
                              src={
                                v.gallery?.[0]?.src ||
                                `/assets/images/vehicles/${v.slug}/exterior-studio.webp`
                              }
                              alt={vName}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <span className="block">{vName}</span>
                            <span className="text-[11px] font-normal text-slate-500 md:hidden">
                              {vCat}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Class */}
                      <td className="py-4 px-4 text-slate-600 font-medium">
                        <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#F7F5F0] border border-[#E8E3DA] text-[11px] font-bold text-slate-700">
                          {vCat}
                        </span>
                      </td>

                      {/* Capacity */}
                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        <div className="inline-flex items-center gap-2 text-xs font-bold">
                          <span className="flex items-center gap-1 text-slate-800">
                            <Users className="w-3.5 h-3.5 text-[#C5A15D]" />
                            {v.passengers}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="flex items-center gap-1 text-slate-800">
                            <Briefcase className="w-3.5 h-3.5 text-[#C5A15D]" />
                            {v.luggage}
                          </span>
                        </div>
                      </td>

                      {/* Climate */}
                      <td className="py-4 px-4 text-slate-600 text-xs hidden md:table-cell">
                        <div className="flex items-center gap-1.5">
                          <Snowflake className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                          <span>{t('climateComfort')}</span>
                        </div>
                      </td>

                      {/* Best for */}
                      <td className="py-4 px-4 text-slate-600 text-xs hidden lg:table-cell max-w-xs">
                        {bestFor}
                      </td>

                      {/* Price */}
                      <td className="py-4 px-4 text-center font-bold text-[#101827] whitespace-nowrap">
                        <span className="text-[10px] text-slate-400 block font-normal">
                          {t('startingFrom')}
                        </span>
                        {formatPrice(v.startingPriceSAR)}
                      </td>

                      {/* Action */}
                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        <Link
                          href={`/${locale}/fleet/${v.slug}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#101827] hover:bg-[#C5A15D] text-white hover:text-slate-950 font-bold text-xs transition-colors"
                        >
                          <span>{t('colAction')}</span>
                          <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. LUXURY STANDARDS & CHAUFFEUR PROTOCOLS */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#F7F5F0] border-t border-[#E8E3DA]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1 */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8E3DA] shadow-2xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#101827] text-[#C5A15D] flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#101827] mb-2">
                  {t('pillar1Title')}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                  {t('pillar1Desc')}
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8E3DA] shadow-2xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#101827] text-[#C5A15D] flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#101827] mb-2">
                  {t('pillar2Title')}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                  {t('pillar2Desc')}
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8E3DA] shadow-2xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#101827] text-[#C5A15D] flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#101827] mb-2">
                  {t('pillar3Title')}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                  {t('pillar3Desc')}
                </p>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8E3DA] shadow-2xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#101827] text-[#C5A15D] flex items-center justify-center mb-4">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#101827] mb-2">
                  {t('pillar4Title')}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                  {t('pillar4Desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONVOY & BESPOKE CHAUFFEUR CALLOUT */}
      <section className="py-12 sm:py-16 bg-[#101827] text-white relative overflow-hidden border-t border-[#C5A15D]/20">
        <div className="container mx-auto px-4 max-w-5xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111C30] border border-[#C5A15D]/30 text-[#C5A15D] text-xs font-black uppercase tracking-wider mb-3">
            <Car className="w-3.5 h-3.5" />
            <span>VIP Delegations & Multi-Vehicle Convoy</span>
          </div>

          <h2 className="font-display font-semibold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight mb-3">
            {t('convoyTitle')}
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-6 font-light">
            {t('convoyDesc')}
          </p>

          <a
            href="https://wa.me/966567554988?text=Hello%20Duyuf%20Alrahman%20VIP%2C%20I%20would%20like%20to%20inquire%20about%20booking%20multiple%20vehicles%20%2F%20VIP%20convoy%20transfers."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 h-13 px-8 rounded-xl bg-[#C5A15D] hover:bg-[#b5924f] text-[#101827] font-black text-sm uppercase tracking-wider transition-all shadow-lg active:scale-95"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{t('convoyBtn')}</span>
          </a>
        </div>
      </section>
    </div>
  );
}
