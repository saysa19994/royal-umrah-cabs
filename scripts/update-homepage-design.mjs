import fs from 'fs';

// 1. Update RoyalHomepageExperience.tsx
const experienceCode = `'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import type { SiteSettings } from '@/lib/settings';
import { useCurrency } from '@/context/CurrencyContext';
import {
  Plane,
  Clock,
  ShieldCheck,
  Baby,
  Car,
  MapPin,
  Calendar,
  Users,
  Search,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
} from 'lucide-react';

interface RoyalHomepageExperienceProps {
  locale: Locale;
  dict: Dictionary;
  settings?: SiteSettings;
  vehicles?: any[];
}

interface HomepageStrings {
  announcement: string;
  heroBadge: string;
  heroHeadlineMain: string;
  heroHeadlineHighlight: string;
  heroSubtitle: string;
  pickupLabel: string;
  pickupPlaceholder: string;
  dropoffLabel: string;
  dropoffPlaceholder: string;
  dateLabel: string;
  passengersLabel: string;
  bookingSubmit: string;
  errorSelectFields: string;
  errorSameLocation: string;
  locJeddahAirport: string;
  locMakkah: string;
  locMadinahAirport: string;
  locMadinah: string;
  locTaif: string;
  locRiyadh: string;
  trustTaxesTitle: string;
  trustCancelTitle: string;
  trustChildTitle: string;
  trustFlightTitle: string;
  trust24Title: string;
  fleetKicker: string;
  fleetTitle: string;
  fleetSubtitle: string;
  fleetViewAll: string;
  passengersWord: string;
  bagsWord: string;
  routesKicker: string;
  routesTitle: string;
  routesSubtitle: string;
  routesViewAll: string;
  fromPricePrefix: string;
  routeJeddahMakkah: string;
  routeMadinahAirport: string;
  routeRiyadhMakkah: string;
  conciergeKicker: string;
  conciergeTitle: string;
  conciergeSubtitle: string;
  conciergeCta: string;
  reviewsKicker: string;
  reviewsTitle: string;
  reviewsSubtitle: string;
  rev1Name: string;
  rev1Tag: string;
  rev1Text: string;
  rev2Name: string;
  rev2Tag: string;
  rev2Text: string;
  rev3Name: string;
  rev3Tag: string;
  rev3Text: string;
  finalCtaTitle: string;
  finalCtaButton: string;
}

const HP_STRINGS: Record<Locale, HomepageStrings> = {
  ar: {
    announcement: 'خدمة نقل خاصة لضيوف الرحمن والعائلات في مختلف أنحاء المملكة',
    heroBadge: 'ضيوف الرحمن VIP',
    heroHeadlineMain: 'رحلتك في المملكة..',
    heroHeadlineHighlight: 'برفاهية تليق بك',
    heroSubtitle: 'خدمات نقل خاصة بسيارات فاخرة، وتجربة سفر مصممة لراحتك من لحظة الانطلاق حتى الوصول.',
    pickupLabel: 'من أين؟',
    pickupPlaceholder: 'اختر المدينة',
    dropoffLabel: 'إلى أين؟',
    dropoffPlaceholder: 'اختر الوجهة',
    dateLabel: 'تاريخ الرحلة',
    passengersLabel: 'عدد الركاب',
    bookingSubmit: 'عرض السيارات والأسعار',
    errorSelectFields: 'يرجى تحديد نقطة الانطلاق والوجهة وتاريخ الرحلة.',
    errorSameLocation: 'يرجى اختيار وجهتين مختلفتين.',
    locJeddahAirport: 'مطار جدة (KAIA)',
    locMakkah: 'مكة المكرمة',
    locMadinahAirport: 'مطار المدينة',
    locMadinah: 'المدينة المنورة',
    locTaif: 'الطائف',
    locRiyadh: 'الرياض',
    trustTaxesTitle: 'شامل الرسوم والضرائب',
    trustCancelTitle: 'إلغاء مجاني حسب السياسات',
    trustChildTitle: 'مقاعد أطفال عند الطلب',
    trustFlightTitle: 'متابعة الرحلات الجوية',
    trust24Title: 'خدمة على مدار 24/24',
    fleetKicker: 'أسطولنا الفاخر',
    fleetTitle: 'مجموعة متميزة من المركبات',
    fleetSubtitle: 'اختيارك الأمثل لرحلة مريحة وآمنة',
    fleetViewAll: 'عرض جميع السيارات',
    passengersWord: 'ركاب',
    bagsWord: 'حقائب',
    routesKicker: 'أكثر المسارات طلباً',
    routesTitle: 'أكثر المسارات طلباً',
    routesSubtitle: 'رحلاتك إلى أهم الوجهات في المملكة',
    routesViewAll: 'استكشف جميع المسارات',
    fromPricePrefix: 'من',
    routeJeddahMakkah: 'جدة ↔ مكة',
    routeMadinahAirport: 'مطار المدينة ↔ المدينة',
    routeRiyadhMakkah: 'الرياض ↔ مكة',
    conciergeKicker: 'خدمة الكونسيرج الملكي',
    conciergeTitle: 'تجربة استثنائية لعملائنا المميزين',
    conciergeSubtitle: 'سيارات مايباخ وهيونداي H1 للطلبات الخاصة فقط',
    conciergeCta: 'تواصل عبر واتساب',
    reviewsKicker: 'آراء عملائنا الكرام',
    reviewsTitle: 'آراء عملائنا الكرام',
    reviewsSubtitle: 'ثقتكم هي دافعنا للمزيد',
    rev1Name: 'محمد العتيبي',
    rev1Tag: 'معتمر، الرياض',
    rev1Text: 'أفضل خدمة نقل في المملكة',
    rev2Name: 'سارة العتيبي',
    rev2Tag: 'رحلة عائلية',
    rev2Text: 'احترافية عالية والتزام بالمواعيد',
    rev3Name: 'أحمد محمد',
    rev3Tag: 'معتمر، الإمارات',
    rev3Text: 'خدمة رائعة وتجربة سفر مريحة بكل تفاصيلها',
    finalCtaTitle: 'احجز رحلتك الآن واستمتع بتجربة ضيافة ملكية',
    finalCtaButton: 'ابدأ الحجز الآن',
  },
  en: {
    announcement: 'VIP private chauffeur service across Saudi Arabia',
    heroBadge: 'DUYUF ALRAHMAN VIP',
    heroHeadlineMain: 'Your Journey in the Kingdom..',
    heroHeadlineHighlight: 'With True Distinction',
    heroSubtitle: 'Private luxury transportation designed for your absolute peace of mind from departure to arrival.',
    pickupLabel: 'From?',
    pickupPlaceholder: 'Select City',
    dropoffLabel: 'To?',
    dropoffPlaceholder: 'Select Destination',
    dateLabel: 'Travel Date',
    passengersLabel: 'Passengers',
    bookingSubmit: 'View Vehicles & Prices',
    errorSelectFields: 'Please select pickup location, destination, and travel date.',
    errorSameLocation: 'Please select two different locations.',
    locJeddahAirport: 'Jeddah Airport (KAIA)',
    locMakkah: 'Makkah Al-Mukarramah',
    locMadinahAirport: 'Madinah Airport',
    locMadinah: 'Madinah Al-Munawwarah',
    locTaif: 'Taif',
    locRiyadh: 'Riyadh',
    trustTaxesTitle: 'Taxes & Tolls Included',
    trustCancelTitle: 'Free Cancellation per Policy',
    trustChildTitle: 'Child Seats upon Request',
    trustFlightTitle: 'Active Flight Tracking',
    trust24Title: '24/7 Dedicated Support',
    fleetKicker: 'OUR LUXURY FLEET',
    fleetTitle: 'Distinguished Vehicle Fleet',
    fleetSubtitle: 'Your premier choice for a safe, serene journey',
    fleetViewAll: 'View All Vehicles',
    passengersWord: 'Pax',
    bagsWord: 'Bags',
    routesKicker: 'MOST POPULAR ROUTES',
    routesTitle: 'Most Requested Journeys',
    routesSubtitle: 'Private transfers connecting key destinations across the Kingdom',
    routesViewAll: 'Explore All Routes',
    fromPricePrefix: 'From',
    routeJeddahMakkah: 'Jeddah ↔ Makkah',
    routeMadinahAirport: 'Madinah Airport ↔ Madinah',
    routeRiyadhMakkah: 'Riyadh ↔ Makkah',
    conciergeKicker: 'ROYAL CONCIERGE SERVICE',
    conciergeTitle: 'Exceptional Experience for Distinguished Guests',
    conciergeSubtitle: 'Maybach and Hyundai H1 available for bespoke concierge requests only',
    conciergeCta: 'Contact via WhatsApp',
    reviewsKicker: 'CLIENT REVIEWS',
    reviewsTitle: 'Guest Testimonials',
    reviewsSubtitle: 'Your trust inspires our continued commitment to excellence',
    rev1Name: 'Mohamed Al-Otaibi',
    rev1Tag: 'Pilgrim, Riyadh',
    rev1Text: 'Best private chauffeur service in Saudi Arabia',
    rev2Name: 'Sarah Al-Otaibi',
    rev2Tag: 'Family Journey',
    rev2Text: 'High professionalism and flawless punctuality',
    rev3Name: 'Ahmed Mohamed',
    rev3Tag: 'Pilgrim, UAE',
    rev3Text: 'Outstanding service and a comfortable, tranquil journey throughout',
    finalCtaTitle: 'Book Your Journey Now & Experience Royal Hospitality',
    finalCtaButton: 'Start Booking Now',
  },
  ms: {
    announcement: 'Perkhidmatan pengangkutan peribadi VIP di seluruh Arab Saudi',
    heroBadge: 'DUYUF ALRAHMAN VIP',
    heroHeadlineMain: 'Perjalanan Anda di Arab Saudi..',
    heroHeadlineHighlight: 'Dengan Kemewahan Diraja',
    heroSubtitle: 'Pengangkutan mewah peribadi direka untuk ketenangan dan keselesaan anda dari mula hingga tiba.',
    pickupLabel: 'Dari mana?',
    pickupPlaceholder: 'Pilih Bandar',
    dropoffLabel: 'Ke mana?',
    dropoffPlaceholder: 'Pilih Destinasi',
    dateLabel: 'Tarikh Perjalanan',
    passengersLabel: 'Bilangan Penumpang',
    bookingSubmit: 'Lihat Kenderaan & Harga',
    errorSelectFields: 'Sila pilih lokasi pengambilan, destinasi, dan tarikh perjalanan.',
    errorSameLocation: 'Sila pilih dua destinasi yang berbeza.',
    locJeddahAirport: 'Lapangan Terbang Jeddah (KAIA)',
    locMakkah: 'Makkah Al-Mukarramah',
    locMadinahAirport: 'Lapangan Terbang Madinah',
    locMadinah: 'Madinah Al-Munawwarah',
    locTaif: 'Taif',
    locRiyadh: 'Riyadh',
    trustTaxesTitle: 'Semua Cukai & Tol Termasuk',
    trustCancelTitle: 'Pembatalan Percuma mengikut Polisi',
    trustChildTitle: 'Kerusi Kanak-kanak atas Permintaan',
    trustFlightTitle: 'Penjejakan Penerbangan Aktif',
    trust24Title: 'Sokongan Berdedikasi 24/7',
    fleetKicker: 'ARMADA MEWAH KAMI',
    fleetTitle: 'Koleksi Kenderaan Terpilih',
    fleetSubtitle: 'Pilihan utama anda untuk perjalanan yang selamat dan selesa',
    fleetViewAll: 'Lihat Semua Kenderaan',
    passengersWord: 'Penumpang',
    bagsWord: 'Beg',
    routesKicker: 'LALUAN PALING POPULAR',
    routesTitle: 'Laluan Paling Diminati',
    routesSubtitle: 'Perjalanan peribadi menghubungkan destinasi utama di Arab Saudi',
    routesViewAll: 'Terokai Semua Laluan',
    fromPricePrefix: 'Dari',
    routeJeddahMakkah: 'Jeddah ↔ Makkah',
    routeMadinahAirport: 'Lap. Terbang Madinah ↔ Madinah',
    routeRiyadhMakkah: 'Riyadh ↔ Makkah',
    conciergeKicker: 'PERKHIDMATAN KONSIERJ DIRAJA',
    conciergeTitle: 'Pengalaman Luar Biasa untuk Tetamu Terhormat',
    conciergeSubtitle: 'Maybach dan Hyundai H1 untuk permintaan khas sahaja',
    conciergeCta: 'Hubungi melalui WhatsApp',
    reviewsKicker: 'ULASAN TETAMU',
    reviewsTitle: 'Ulasan Tetamu Kami',
    reviewsSubtitle: 'Kepercayaan anda adalah inspirasi kami',
    rev1Name: 'Mohamed Al-Otaibi',
    rev1Tag: 'Jemaah, Riyadh',
    rev1Text: 'Perkhidmatan pengangkutan terbaik di Arab Saudi',
    rev2Name: 'Sarah Al-Otaibi',
    rev2Tag: 'Perjalanan Keluarga',
    rev2Text: 'Profesionalisme tinggi dan ketepatan masa yang luar biasa',
    rev3Name: 'Ahmed Mohamed',
    rev3Tag: 'Jemaah, UAE',
    rev3Text: 'Perkhidmatan hebat dan perjalanan yang sangat selesa',
    finalCtaTitle: 'Tempah Perjalanan Anda Sekarang & Nikmati Layanan Diraja',
    finalCtaButton: 'Mulakan Tempahan Sekarang',
  },
  id: {
    announcement: 'Layanan transportasi pribadi VIP di seluruh Arab Saudi',
    heroBadge: 'DUYUF ALRAHMAN VIP',
    heroHeadlineMain: 'Perjalanan Anda di Arab Saudi..',
    heroHeadlineHighlight: 'Dengan Kemewahan Tertinggi',
    heroSubtitle: 'Layanan transportasi mewah pribadi untuk kenyamanan dan ketenangan Anda dari awal hingga tujuan.',
    pickupLabel: 'Dari mana?',
    pickupPlaceholder: 'Pilih Kota',
    dropoffLabel: 'Ke mana?',
    dropoffPlaceholder: 'Pilih Tujuan',
    dateLabel: 'Tanggal Perjalanan',
    passengersLabel: 'Jumlah Penumpang',
    bookingSubmit: 'Lihat Kendaraan & Harga',
    errorSelectFields: 'Silakan pilih lokasi jemput, tujuan, dan tanggal perjalanan.',
    errorSameLocation: 'Silakan pilih dua lokasi yang berbeda.',
    locJeddahAirport: 'Bandara Jeddah (KAIA)',
    locMakkah: 'Makkah Al-Mukarramah',
    locMadinahAirport: 'Bandara Madinah',
    locMadinah: 'Madinah Al-Munawwarah',
    locTaif: 'Taif',
    locRiyadh: 'Riyadh',
    trustTaxesTitle: 'Semua Pajak & Tol Termasuk',
    trustCancelTitle: 'Pembatalan Gratis sesuai Kebijakan',
    trustChildTitle: 'Kursi Anak atas Permintaan',
    trustFlightTitle: 'Pelacakan Penerbangan Aktif',
    trust24Title: 'Layanan Pelanggan 24/7',
    fleetKicker: 'ARMADA MEWAH KAMI',
    fleetTitle: 'Koleksi Kendaraan Istimewa',
    fleetSubtitle: 'Pilihan terbaik untuk perjalanan aman dan nyaman',
    fleetViewAll: 'Lihat Semua Kendaraan',
    passengersWord: 'Penumpang',
    bagsWord: 'Koper',
    routesKicker: 'RUTE PALING POPULER',
    routesTitle: 'Rute Paling Banyak Diminati',
    routesSubtitle: 'Perjalanan privat menghubungkan destinasi utama di Arab Saudi',
    routesViewAll: 'Jelajahi Semua Rute',
    fromPricePrefix: 'Mulai',
    routeJeddahMakkah: 'Jeddah ↔ Makkah',
    routeMadinahAirport: 'Bandara Madinah ↔ Madinah',
    routeRiyadhMakkah: 'Riyadh ↔ Makkah',
    conciergeKicker: 'LAYANAN KONSIRER DIRAJA',
    conciergeTitle: 'Pengalaman Luar Biasa untuk Tamu Terhormat',
    conciergeSubtitle: 'Maybach dan Hyundai H1 khusus permintaan istimewa',
    conciergeCta: 'Hubungi via WhatsApp',
    reviewsKicker: 'ULASAN PELANGGAN',
    reviewsTitle: 'Ulasan Tamu Kami',
    reviewsSubtitle: 'Kepercayaan Anda adalah kehormatan bagi kami',
    rev1Name: 'Mohamed Al-Otaibi',
    rev1Tag: 'Jamaah, Riyadh',
    rev1Text: 'Layanan transportasi terbaik di Arab Saudi',
    rev2Name: 'Sarah Al-Otaibi',
    rev2Tag: 'Perjalanan Keluarga',
    rev2Text: 'Profesionalisme tinggi dan tepat waktu',
    rev3Name: 'Ahmed Mohamed',
    rev3Tag: 'Jamaah, UEA',
    rev3Text: 'Layanan luar biasa dan perjalanan yang sangat nyaman',
    finalCtaTitle: 'Pesan Perjalanan Anda Sekarang & Nikmati Keramahan Istimewa',
    finalCtaButton: 'Mulai Pemesanan Sekarang',
  },
  ur: {
    announcement: 'سعودی عرب میں معتمرین اور خاندانوں کے لیے خصوصی پرائیویٹ ٹرانسپورٹ سروس',
    heroBadge: 'ضیوف الرحمن VIP',
    heroHeadlineMain: 'سعودی عرب میں آپ کا سفر…',
    heroHeadlineHighlight: 'شاہانہ وقار اور آرام کے ساتھ',
    heroSubtitle: 'پرتعیش گاڑیوں کے ساتھ پرائیویٹ ٹرانسپورٹ، آپ کے سفر کے آغاز سے منزل تک مکمل راحت۔',
    pickupLabel: 'کہاں سے؟',
    pickupPlaceholder: 'شہر منتخب کریں',
    dropoffLabel: 'کہاں تک؟',
    dropoffPlaceholder: 'منزل منتخب کریں',
    dateLabel: 'سفر کی تاریخ',
    passengersLabel: 'مسافروں کی تعداد',
    bookingSubmit: 'گاڑیاں اور کرائے دیکھیں',
    errorSelectFields: 'برائے مہربانی روانگی، منزل اور تاریخ کا انتخاب کریں۔',
    errorSameLocation: 'براہ کرم دو مختلف مقامات منتخب کریں۔',
    locJeddahAirport: 'جدہ ایئرپورٹ (KAIA)',
    locMakkah: 'مکہ مکرمہ',
    locMadinahAirport: 'مدینہ ایئرپورٹ',
    locMadinah: 'مدینہ منورہ',
    locTaif: 'طائف',
    locRiyadh: 'ریاض',
    trustTaxesTitle: 'ٹول اور ٹیکس شامل',
    trustCancelTitle: 'پالیسی کے مطابق مفت منسوخی',
    trustChildTitle: 'طلب پر بچوں کی نشستیں',
    trustFlightTitle: 'پرواز کی لائیو ٹریکنگ',
    trust24Title: '24/7 ہمہ وقت معاونت',
    fleetKicker: 'ہمارا پرتعیش فلیٹ',
    fleetTitle: 'گاڑیوں کا شاندار انتخاب',
    fleetSubtitle: 'محفوظ اور آرام دہ سفر کے لیے آپ کا بہترین انتخاب',
    fleetViewAll: 'تمام گاڑیاں دیکھیں',
    passengersWord: 'مسافر',
    bagsWord: 'بیگ',
    routesKicker: 'مقبول ترین راستے',
    routesTitle: 'سب سے زیادہ مانگے جانے والے راستے',
    routesSubtitle: 'سعودی عرب کے اہم شہروں کے درمیان پرائیویٹ سفر',
    routesViewAll: 'تمام روٹس دیکھیں',
    fromPricePrefix: 'شروع از',
    routeJeddahMakkah: 'جدہ ↔ مکہ',
    routeMadinahAirport: 'مدینہ ایئرپورٹ ↔ مدینہ',
    routeRiyadhMakkah: 'ریاض ↔ مکہ',
    conciergeKicker: 'شاہی کونسیرج سروس',
    conciergeTitle: 'معزز مہمانوں کے لیے خصوصی انتظام',
    conciergeSubtitle: 'مے باخ اور ہیونڈائی H1 برائے خصوصی فرمائش',
    conciergeCta: 'واٹس ایپ پر رابطہ کریں',
    reviewsKicker: 'معزز مہمانوں کے تاثرات',
    reviewsTitle: 'ہمارے مہمانوں کے تاثرات',
    reviewsSubtitle: 'آپ کا اعتماد ہماری سب سے بڑی کامیابی ہے',
    rev1Name: 'محمد العتیبی',
    rev1Tag: 'معتمر، ریاض',
    rev1Text: 'سعودی عرب میں بہترین ٹرانسپورٹ سروس',
    rev2Name: 'سارہ العتیبی',
    rev2Tag: 'خاندانی سفر',
    rev2Text: 'شاندار پیشہ ورانہ انداز اور وقت کی مکمل پابندی',
    rev3Name: 'احمد محمد',
    rev3Tag: 'معتمر، امارات',
    rev3Text: 'بہترین سروس اور ہر لحاظ سے پُرسکون سفر',
    finalCtaTitle: 'ابھی اپنا سفر بک کریں اور شاہانہ ضیافت کا تجربہ حاصل کریں',
    finalCtaButton: 'ابھی بکنگ شروع کریں',
  },
  fr: {
    announcement: 'Services de chauffeur privé VIP à travers l’Arabie Saoudite',
    heroBadge: 'DUYUF ALRAHMAN VIP',
    heroHeadlineMain: 'Votre voyage en Arabie Saoudite..',
    heroHeadlineHighlight: 'Avec une distinction royale',
    heroSubtitle: 'Services de transport privé de luxe conçus pour votre sérénité du départ à l’arrivée.',
    pickupLabel: 'D’où ?',
    pickupPlaceholder: 'Choisir la ville',
    dropoffLabel: 'Vers où ?',
    dropoffPlaceholder: 'Choisir la destination',
    dateLabel: 'Date du voyage',
    passengersLabel: 'Passagers',
    bookingSubmit: 'Voir véhicules et tarifs',
    errorSelectFields: 'Veuillez sélectionner un départ, une destination et une date.',
    errorSameLocation: 'Veuillez choisir deux destinations différentes.',
    locJeddahAirport: 'Aéroport de Djeddah (KAIA)',
    locMakkah: 'La Mecque',
    locMadinahAirport: 'Aéroport de Médine',
    locMadinah: 'Médine',
    locTaif: 'Taif',
    locRiyadh: 'Riyad',
    trustTaxesTitle: 'Taxes et péages inclus',
    trustCancelTitle: 'Annulation gratuite selon politique',
    trustChildTitle: 'Sièges enfants sur demande',
    trustFlightTitle: 'Suivi des vols en direct',
    trust24Title: 'Service dédié 24/7',
    fleetKicker: 'NOTRE FLOTTE DE PRESTIGE',
    fleetTitle: 'Une sélection raffinée de véhicules',
    fleetSubtitle: 'Votre choix idéal pour un voyage sûr et serein',
    fleetViewAll: 'Voir toute la flotte',
    passengersWord: 'Passagers',
    bagsWord: 'Bagages',
    routesKicker: 'TRAJETS LES PLUS DEMANDÉS',
    routesTitle: 'Trajets les plus populaires',
    routesSubtitle: 'Transferts privés reliant les principales destinations saoudiennes',
    routesViewAll: 'Explorer tous les trajets',
    fromPricePrefix: 'Dès',
    routeJeddahMakkah: 'Djeddah ↔ La Mecque',
    routeMadinahAirport: 'Aéroport Médine ↔ Médine',
    routeRiyadhMakkah: 'Riyad ↔ La Mecque',
    conciergeKicker: 'CONCIERGERIE ROYALE',
    conciergeTitle: 'Une expérience d’exception pour hôtes de marque',
    conciergeSubtitle: 'Maybach et Hyundai H1 disponibles sur demande spéciale',
    conciergeCta: 'Contacter via WhatsApp',
    reviewsKicker: 'AVIS DE NOS CLIENTS',
    reviewsTitle: 'Témoignages de nos clients',
    reviewsSubtitle: 'Votre confiance est notre plus belle distinction',
    rev1Name: 'Mohamed Al-Otaibi',
    rev1Tag: 'Pèlerin, Riyad',
    rev1Text: 'Meilleur service de transport en Arabie Saoudite',
    rev2Name: 'Sarah Al-Otaibi',
    rev2Tag: 'Voyage en famille',
    rev2Text: 'Professionnalisme exemplaire et ponctualité rigoureuse',
    rev3Name: 'Ahmed Mohamed',
    rev3Tag: 'Pèlerin, Émirats',
    rev3Text: 'Service exceptionnel et voyage extrêmement confortable',
    finalCtaTitle: 'Réservez votre voyage maintenant et profitez d’une hospitalité royale',
    finalCtaButton: 'Commencer la réservation',
  },
  es: {
    announcement: 'Servicio de chófer privado VIP en Arabia Saudita',
    heroBadge: 'DUYUF ALRAHMAN VIP',
    heroHeadlineMain: 'Su viaje en Arabia Saudita..',
    heroHeadlineHighlight: 'Con distinción suprema',
    heroSubtitle: 'Transporte privado de lujo diseñado para su confort y tranquilidad absoluta.',
    pickupLabel: '¿Desde dónde?',
    pickupPlaceholder: 'Seleccionar ciudad',
    dropoffLabel: '¿Hacia dónde?',
    dropoffPlaceholder: 'Seleccionar destino',
    dateLabel: 'Fecha del viaje',
    passengersLabel: 'Pasajeros',
    bookingSubmit: 'Ver vehículos y precios',
    errorSelectFields: 'Por favor seleccione recogida, destino y fecha.',
    errorSameLocation: 'Por favor elija dos destinos diferentes.',
    locJeddahAirport: 'Aeropuerto de Yeda (KAIA)',
    locMakkah: 'La Meca',
    locMadinahAirport: 'Aeropuerto de Medina',
    locMadinah: 'Medina',
    locTaif: 'Taif',
    locRiyadh: 'Riad',
    trustTaxesTitle: 'Impuestos y peajes incluidos',
    trustCancelTitle: 'Cancelación gratuita según política',
    trustChildTitle: 'Sillas infantiles bajo petición',
    trustFlightTitle: 'Seguimiento de vuelos en tiempo real',
    trust24Title: 'Atención 24/7',
    fleetKicker: 'NUESTRA FLOTA DE LUJO',
    fleetTitle: 'Selección exclusiva de vehículos',
    fleetSubtitle: 'Su opción ideal para un viaje seguro y distinguido',
    fleetViewAll: 'Ver toda la flota',
    passengersWord: 'Pasajeros',
    bagsWord: 'Maletas',
    routesKicker: 'RUTAS MÁS POPULARES',
    routesTitle: 'Rutas más solicitadas',
    routesSubtitle: 'Traslados privados que conectan los destinos clave del Reino',
    routesViewAll: 'Explorar todas las rutas',
    fromPricePrefix: 'Desde',
    routeJeddahMakkah: 'Yeda ↔ La Meca',
    routeMadinahAirport: 'Aeropuerto Medina ↔ Medina',
    routeRiyadhMakkah: 'Riad ↔ La Meca',
    conciergeKicker: 'CONSERJERÍA REAL',
    conciergeTitle: 'Experiencia excepcional para huéspedes de distinción',
    conciergeSubtitle: 'Maybach y Hyundai H1 disponibles solo bajo petición especial',
    conciergeCta: 'Contactar por WhatsApp',
    reviewsKicker: 'OPINIONES DE CLIENTES',
    reviewsTitle: 'Testimonios de nuestros clientes',
    reviewsSubtitle: 'Su confianza inspira nuestra dedicación',
    rev1Name: 'Mohamed Al-Otaibi',
    rev1Tag: 'Peregrino, Riad',
    rev1Text: 'El mejor servicio de transporte en Arabia Saudita',
    rev2Name: 'Sarah Al-Otaibi',
    rev2Tag: 'Viaje familiar',
    rev2Text: 'Gran profesionalidad y puntualidad intachable',
    rev3Name: 'Ahmed Mohamed',
    rev3Tag: 'Peregrino, EAU',
    rev3Text: 'Servicio excelente y un trayecto cómodo en cada detalle',
    finalCtaTitle: 'Reserve su viaje ahora y disfrute de una hospitalidad real',
    finalCtaButton: 'Comenzar reserva ahora',
  },
  de: {
    announcement: 'VIP-Chauffeurservice in ganz Saudi-Arabien',
    heroBadge: 'DUYUF ALRAHMAN VIP',
    heroHeadlineMain: 'Ihre Reise in Saudi-Arabien..',
    heroHeadlineHighlight: 'Mit königlicher Eleganz',
    heroSubtitle: 'Exklusiver privater Fahrdienst für höchste Ansprüche und absolute Ruhe.',
    pickupLabel: 'Von wo?',
    pickupPlaceholder: 'Stadt auswählen',
    dropoffLabel: 'Wohin?',
    dropoffPlaceholder: 'Ziel auswählen',
    dateLabel: 'Reisedatum',
    passengersLabel: 'Passagiere',
    bookingSubmit: 'Fahrzeuge & Preise ansehen',
    errorSelectFields: 'Bitte wählen Sie Abholort, Ziel und Datum aus.',
    errorSameLocation: 'Bitte wählen Sie zwei verschiedene Orte aus.',
    locJeddahAirport: 'Flughafen Dschidda (KAIA)',
    locMakkah: 'Mekka',
    locMadinahAirport: 'Flughafen Medina',
    locMadinah: 'Medina',
    locTaif: 'Taif',
    locRiyadh: 'Riad',
    trustTaxesTitle: 'Steuern & Mautgebühren inklusive',
    trustCancelTitle: 'Kostenlose Stornierung gemäß Richtlinie',
    trustChildTitle: 'Kindersitze auf Anfrage',
    trustFlightTitle: 'Flugverfolgung in Echtzeit',
    trust24Title: '24/7 persönlicher Service',
    fleetKicker: 'UNSERE PREMIUM-FLOTTE',
    fleetTitle: 'Exklusive Fahrzeugauswahl',
    fleetSubtitle: 'Ihre erste Wahl für eine komfortable und sichere Reise',
    fleetViewAll: 'Gesamte Flotte ansehen',
    passengersWord: 'Gäste',
    bagsWord: 'Koffer',
    routesKicker: 'BELIEBTESTE ROUTEN',
    routesTitle: 'Meistgefragte Fahrten',
    routesSubtitle: 'Private Transfers zwischen den bedeutendsten Destinationen',
    routesViewAll: 'Alle Routen entdecken',
    fromPricePrefix: 'Ab',
    routeJeddahMakkah: 'Dschidda ↔ Mekka',
    routeMadinahAirport: 'Flughafen Medina ↔ Medina',
    routeRiyadhMakkah: 'Riad ↔ Mekka',
    conciergeKicker: 'KÖNIGLICHER CONCIERGE-SERVICE',
    conciergeTitle: 'Außergewöhnliches Erlebnis für geschätzte Gäste',
    conciergeSubtitle: 'Maybach und Hyundai H1 exklusiv auf persönliche Anfrage',
    conciergeCta: 'Über WhatsApp kontaktieren',
    reviewsKicker: 'KUNDENBEWERTUNGEN',
    reviewsTitle: 'Stimmen unserer Gäste',
    reviewsSubtitle: 'Ihr Vertrauen ist unser höchster Anspruch',
    rev1Name: 'Mohamed Al-Otaibi',
    rev1Tag: 'Pilger, Riad',
    rev1Text: 'Bester Fahrservice in Saudi-Arabien',
    rev2Name: 'Sarah Al-Otaibi',
    rev2Tag: 'Familienreise',
    rev2Text: 'Höchste Professionalität und absolute Pünktlichkeit',
    rev3Name: 'Ahmed Mohamed',
    rev3Tag: 'Pilger, VAE',
    rev3Text: 'Hervorragender Service und eine rundum entspannte Fahrt',
    finalCtaTitle: 'Buchen Sie jetzt Ihre Reise und erleben Sie königliche Gastfreundschaft',
    finalCtaButton: 'Jetzt Buchung starten',
  },
  tr: {
    announcement: 'Suudi Arabistan genelinde VIP özel şoför hizmeti',
    heroBadge: 'DUYUF ALRAHMAN VIP',
    heroHeadlineMain: 'Suudi Arabistan’da Yolculuğunuz..',
    heroHeadlineHighlight: 'Kraliyet Zarafetiyle',
    heroSubtitle: 'Yolculuğunuzun başından sonuna kadar tam bir huzur ve konfor için tasarlanmış lüks özel transfer.',
    pickupLabel: 'Nereden?',
    pickupPlaceholder: 'Şehir Seçin',
    dropoffLabel: 'Nereye?',
    dropoffPlaceholder: 'Varış Noktası Seçin',
    dateLabel: 'Yolculuk Tarihi',
    passengersLabel: 'Yolcu Sayısı',
    bookingSubmit: 'Araçları ve Fiyatları Gör',
    errorSelectFields: 'Lütfen kalkış, varış noktası ve tarihi seçin.',
    errorSameLocation: 'Lütfen iki farklı konum seçin.',
    locJeddahAirport: 'Cidde Havalimanı (KAIA)',
    locMakkah: 'Mekke-i Mükerreme',
    locMadinahAirport: 'Medine Havalimanı',
    locMadinah: 'Medine-i Münevvere',
    locTaif: 'Taif',
    locRiyadh: 'Riyad',
    trustTaxesTitle: 'Tüm Vergiler ve Geçiş Ücretleri Dahil',
    trustCancelTitle: 'Politikaya Uygun Ücretsiz İptal',
    trustChildTitle: 'Talep Üzerine Çocuk Koltuğu',
    trustFlightTitle: 'Aktif Uçuş Takibi',
    trust24Title: '7/24 Kesintisiz Destek',
    fleetKicker: 'LÜKS FİLOMUZ',
    fleetTitle: 'Seçkin Araç Koleksiyonu',
    fleetSubtitle: 'Güvenli ve huzurlu bir seyahat için en ideal tercihiniz',
    fleetViewAll: 'Tüm Filoyu İncele',
    passengersWord: 'Yolcu',
    bagsWord: 'Bagaj',
    routesKicker: 'EN ÇOK TERCİH EDİLEN GÜZERGAHLAR',
    routesTitle: 'En Çok Tercih Edilen Güzergahlar',
    routesSubtitle: 'Krallık genelindeki önemli noktaları birbirine bağlayan özel transferler',
    routesViewAll: 'Tüm Güzergahları Keşfet',
    fromPricePrefix: '’den başlayan',
    routeJeddahMakkah: 'Cidde ↔ Mekke',
    routeMadinahAirport: 'Medine Havalimanı ↔ Medine',
    routeRiyadhMakkah: 'Riyad ↔ Mekke',
    conciergeKicker: 'KRALİYET KONSİYERJ HİZMETİ',
    conciergeTitle: 'Seçkin Misafirlerimize Özel Bir Deneyim',
    conciergeSubtitle: 'Maybach ve Hyundai H1 yalnızca özel konsiyerj talepleriyle',
    conciergeCta: 'WhatsApp ile İletişime Geçin',
    reviewsKicker: 'MÜŞTERİ YORUMLARI',
    reviewsTitle: 'Misafirlerimizin Değerlendirmeleri',
    reviewsSubtitle: 'Güveniniz bize ilham veriyor',
    rev1Name: 'Mohamed Al-Otaibi',
    rev1Tag: 'Hacı, Riyad',
    rev1Text: 'Suudi Arabistan’daki en iyi transfer hizmeti',
    rev2Name: 'Sarah Al-Otaibi',
    rev2Tag: 'Aile Seyahati',
    rev2Text: 'Yüksek profesyonellik ve dakiklik',
    rev3Name: 'Ahmed Mohamed',
    rev3Tag: 'Hacı, BAE',
    rev3Text: 'Harika bir hizmet ve her anı konforlu bir yolculuk',
    finalCtaTitle: 'Yolculuğunuzu Hemen Ayırtın, Kraliyet Misafirperverliğini Yaşayın',
    finalCtaButton: 'Rezervasyona Başla',
  },
  hi: {
    announcement: 'सऊदी अरब में तीर्थयात्रियों और परिवारों के लिए वीआईपी निजी कार सेवा',
    heroBadge: 'DUYUF ALRAHMAN VIP',
    heroHeadlineMain: 'सऊदी अरब में आपकी यात्रा..',
    heroHeadlineHighlight: 'शाही गरिमा और आराम के साथ',
    heroSubtitle: 'शुरुआत से मंजिल तक आपकी पूर्ण शांति और आराम के लिए तैयार की गई विशेष निजी परिवहन सेवा।',
    pickupLabel: 'कहाँ से?',
    pickupPlaceholder: 'शहर चुनें',
    dropoffLabel: 'कहाँ तक?',
    dropoffPlaceholder: 'गंतव्य चुनें',
    dateLabel: 'यात्रा की तिथि',
    passengersLabel: 'यात्रियों की संख्या',
    bookingSubmit: 'वाहन और किराए देखें',
    errorSelectFields: 'कृपया प्रस्थान, गंतव्य और तिथि का चयन करें।',
    errorSameLocation: 'कृपया दो अलग-अलग स्थान चुनें।',
    locJeddahAirport: 'जेद्दा हवाई अड्डा (KAIA)',
    locMakkah: 'मक्का अल-मुकर्रमा',
    locMadinahAirport: 'मदीना हवाई अड्डा',
    locMadinah: 'मदीना अल-मुनव्वरा',
    locTaif: 'ताइफ़',
    locRiyadh: 'रियाद',
    trustTaxesTitle: 'सभी कर और टोल शुल्क शामिल',
    trustCancelTitle: 'नीति के अनुसार निःशुल्क रद्दीकरण',
    trustChildTitle: 'मांग पर बाल सीटें उपलब्ध',
    trustFlightTitle: 'उड़ानों की लाइव ट्रैकिंग',
    trust24Title: '24/7 समर्पित सहायता',
    fleetKicker: 'हमारा शानदार बेड़ा',
    fleetTitle: 'वाहनों का उत्कृष्ट चयन',
    fleetSubtitle: 'सुरक्षित और आरामदायक यात्रा के लिए आपका सबसे बेहतरीन विकल्प',
    fleetViewAll: 'सभी वाहन देखें',
    passengersWord: 'यात्री',
    bagsWord: 'बैग',
    routesKicker: 'लोकप्रिय मार्ग',
    routesTitle: 'सबसे लोकप्रिय यात्राएं',
    routesSubtitle: 'सऊदी अरब के प्रमुख शहरों को जोड़ने वाली निजी यात्राएं',
    routesViewAll: 'सभी मार्ग देखें',
    fromPricePrefix: 'प्रारंभिक',
    routeJeddahMakkah: 'जेद्दा ↔ मक्का',
    routeMadinahAirport: 'मदीना हवाई अड्डा ↔ मदीना',
    routeRiyadhMakkah: 'रियाद ↔ मक्का',
    conciergeKicker: 'शाही कॉन्सीयर्ज सेवा',
    conciergeTitle: 'विशिष्ट अतिथियों के लिए अनोखा अनुभव',
    conciergeSubtitle: 'विशेष अनुरोध पर मेबैक और हुंडई H1 उपलब्ध',
    conciergeCta: 'व्हाट्सएप पर संपर्क करें',
    reviewsKicker: 'अतिथियों के विचार',
    reviewsTitle: 'अतिथियों की प्रतिक्रियाएं',
    reviewsSubtitle: 'आपका विश्वास हमारी सबसे बड़ी उपलब्धि है',
    rev1Name: 'Mohamed Al-Otaibi',
    rev1Tag: 'तीर्थयात्री, रियाद',
    rev1Text: 'सऊदी अरब में सबसे बेहतरीन ट्रांसपोर्ट सेवा',
    rev2Name: 'Sarah Al-Otaibi',
    rev2Tag: 'पारिवारिक यात्रा',
    rev2Text: 'उत्कृष्ट व्यावसायिकता और समय की पूर्ण पाबंदी',
    rev3Name: 'Ahmed Mohamed',
    rev3Tag: 'तीर्थयात्री, यूएई',
    rev3Text: 'शानदार सेवा और हर तरह से आरामदायक यात्रा',
    finalCtaTitle: 'अपनी यात्रा अभी बुक करें और शाही आतिथ्य का आनंद लें',
    finalCtaButton: 'अभी बुकिंग शुरू करें',
  },
};

export function RoyalHomepageExperience({
  locale,
  dict,
  settings,
}: RoyalHomepageExperienceProps) {
  const router = useRouter();
  const isAr = locale === 'ar';
  const isRtl = isAr || locale === 'ur';
  const t = HP_STRINGS[locale] || HP_STRINGS.en;
  const { formatPrice } = useCurrency();

  // Booking Form State
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [passengers, setPassengers] = useState('2');
  const [feedback, setFeedback] = useState('');

  const todayStr = useMemo(() => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  }, []);

  const [travelDate, setTravelDate] = useState(todayStr);

  const resolveRouteId = (from: string, to: string): string => {
    if (from === 'jeddah-airport' && to === 'makkah') return 'jeddah-airport-to-makkah';
    if (from === 'makkah' && to === 'jeddah-airport') return 'makkah-to-jeddah-airport';
    if (from === 'makkah' && to === 'madinah') return 'makkah-to-madinah';
    if (from === 'madinah' && to === 'makkah') return 'madinah-to-makkah';
    if (from === 'madinah-airport' && to === 'madinah') return 'madinah-airport-to-madinah';
    if (from === 'madinah' && to === 'madinah-airport') return 'madinah-to-madinah-airport';
    if (from === 'jeddah-airport' && to === 'madinah') return 'jeddah-airport-to-madinah';
    if (from === 'madinah' && to === 'jeddah-airport') return 'madinah-to-jeddah-airport';
    if (from === 'makkah' && to === 'taif') return 'makkah-to-taif';
    if (from === 'taif' && to === 'makkah') return 'taif-to-makkah';
    if (from === 'riyadh' && to === 'makkah') return 'riyadh-to-makkah';
    return 'jeddah-airport-to-makkah';
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup || !dropoff || !travelDate) {
      setFeedback(t.errorSelectFields);
      return;
    }
    if (pickup === dropoff) {
      setFeedback(t.errorSameLocation);
      return;
    }
    setFeedback('');
    const routeId = resolveRouteId(pickup, dropoff);
    const query = new URLSearchParams();
    query.set('route', routeId);
    query.set('date', travelDate);
    query.set('time', '12:00');
    query.set('passengers', passengers);
    router.push(\`/\${locale}/booking?\${query.toString()}\`);
  };

  return (
    <div className="ref-homepage" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* ─────────────────────────────────────────────────────────────
          HERO SECTION (Matching Mockup with GMC Yukon & Clock Tower)
      ────────────────────────────────────────────────────────────── */}
      <section className="ref-hero" id="top">
        <div
          className="ref-hero-image"
          role="img"
          aria-label="GMC Yukon XL luxury SUV in Saudi Arabia setting"
        />
        <div className="ref-hero-shade" />

        <div className="ref-page-shell ref-hero-content">
          <div className="ref-hero-copy">
            <div className="ref-eyebrow">
              <span className="ref-eyebrow-line" />
              <span>{t.heroBadge}</span>
              <span className="ref-eyebrow-line" />
            </div>

            <h1>
              {t.heroHeadlineMain} <br />
              <span className="gold">{t.heroHeadlineHighlight}</span>
            </h1>

            <p>{t.heroSubtitle}</p>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────
            FLOATING BOOKING CONSOLE (Sleek Single Dock from Mockup)
        ────────────────────────────────────────────────────────── */}
        <div className="ref-booking-wrap" id="booking">
          <form className="ref-booking-dock" onSubmit={handleBookingSubmit}>
            <div className="ref-dock-fields">
              {/* Field 01: Pick-up */}
              <div className="ref-dock-field">
                <div className="ref-dock-label">
                  <MapPin className="w-3.5 h-3.5 text-[#D6A13A]" />
                  <span>{t.pickupLabel}</span>
                </div>
                <select
                  id="pickup"
                  value={pickup}
                  onChange={(e) => {
                    setPickup(e.target.value);
                    if (feedback) setFeedback('');
                  }}
                  required
                >
                  <option value="">{t.pickupPlaceholder}</option>
                  <option value="jeddah-airport">{t.locJeddahAirport}</option>
                  <option value="makkah">{t.locMakkah}</option>
                  <option value="madinah-airport">{t.locMadinahAirport}</option>
                  <option value="madinah">{t.locMadinah}</option>
                  <option value="riyadh">{t.locRiyadh}</option>
                  <option value="taif">{t.locTaif}</option>
                </select>
              </div>

              {/* Field 02: Drop-off */}
              <div className="ref-dock-field">
                <div className="ref-dock-label">
                  <MapPin className="w-3.5 h-3.5 text-[#D6A13A]" />
                  <span>{t.dropoffLabel}</span>
                </div>
                <select
                  id="dropoff"
                  value={dropoff}
                  onChange={(e) => {
                    setDropoff(e.target.value);
                    if (feedback) setFeedback('');
                  }}
                  required
                >
                  <option value="">{t.dropoffPlaceholder}</option>
                  <option value="makkah">{t.locMakkah}</option>
                  <option value="madinah">{t.locMadinah}</option>
                  <option value="jeddah-airport">{t.locJeddahAirport}</option>
                  <option value="madinah-airport">{t.locMadinahAirport}</option>
                  <option value="riyadh">{t.locRiyadh}</option>
                  <option value="taif">{t.locTaif}</option>
                </select>
              </div>

              {/* Field 03: Travel Date */}
              <div className="ref-dock-field">
                <div className="ref-dock-label">
                  <Calendar className="w-3.5 h-3.5 text-[#D6A13A]" />
                  <span>{t.dateLabel}</span>
                </div>
                <input
                  type="date"
                  id="travelDate"
                  min={todayStr}
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  required
                />
              </div>

              {/* Field 04: Passengers */}
              <div className="ref-dock-field">
                <div className="ref-dock-label">
                  <Users className="w-3.5 h-3.5 text-[#D6A13A]" />
                  <span>{t.passengersLabel}</span>
                </div>
                <select
                  id="passengers"
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="10">10</option>
                  <option value="14">14</option>
                  <option value="21">21</option>
                </select>
              </div>

              {/* Submit Button */}
              <button type="submit" className="ref-dock-submit">
                <Search className="w-4 h-4 text-[#090D15]" />
                <span>{t.bookingSubmit}</span>
              </button>
            </div>

            {feedback && (
              <p className="ref-booking-feedback" role="alert">
                {feedback}
              </p>
            )}
          </form>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          TRUST / ADVANTAGES STRIP (5 Columns matching Mockup)
      ────────────────────────────────────────────────────────────── */}
      <section className="ref-trust-strip" id="standards">
        <div className="ref-page-shell ref-trust-grid">
          <div className="ref-trust-item">
            <span className="ref-trust-icon">
              <Car className="w-5 h-5 text-[#D6A13A]" />
            </span>
            <span className="ref-trust-text">{t.trustTaxesTitle}</span>
          </div>

          <div className="ref-trust-item">
            <span className="ref-trust-icon">
              <ShieldCheck className="w-5 h-5 text-[#D6A13A]" />
            </span>
            <span className="ref-trust-text">{t.trustCancelTitle}</span>
          </div>

          <div className="ref-trust-item">
            <span className="ref-trust-icon">
              <Baby className="w-5 h-5 text-[#D6A13A]" />
            </span>
            <span className="ref-trust-text">{t.trustChildTitle}</span>
          </div>

          <div className="ref-trust-item">
            <span className="ref-trust-icon">
              <Plane className="w-5 h-5 text-[#D6A13A]" />
            </span>
            <span className="ref-trust-text">{t.trustFlightTitle}</span>
          </div>

          <div className="ref-trust-item">
            <span className="ref-trust-icon">
              <Clock className="w-5 h-5 text-[#D6A13A]" />
            </span>
            <span className="ref-trust-text">{t.trust24Title}</span>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          FLEET SHOWCASE (Deep Midnight Navy with 5 Dark Luxury Cards)
      ────────────────────────────────────────────────────────────── */}
      <section className="ref-fleet-section" id="fleet">
        <div className="ref-page-shell ref-fleet-wrapper">
          {/* Header block (Aligned right in RTL, left in LTR) */}
          <div className="ref-fleet-header">
            <span className="ref-section-kicker">{t.fleetKicker}</span>
            <h2>{t.fleetTitle}</h2>
            <p>{t.fleetSubtitle}</p>
            <Link href={\`/\${locale}/fleet\`} className="ref-fleet-btn">
              <span>{t.fleetViewAll}</span>
              <span>{isRtl ? '←' : '→'}</span>
            </Link>
          </div>

          {/* Cards Container */}
          <div className="ref-fleet-cards-row">
            {/* 01: Toyota Camry */}
            <article className="ref-vehicle-card-luxury">
              <div className="ref-vehicle-img-wrap">
                <Image
                  src="/assets/images/reference/toyota-camry.webp"
                  alt="Toyota Camry VIP Chauffeur"
                  width={320}
                  height={170}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="ref-vehicle-content">
                <h3>Toyota Camry</h3>
                <div className="ref-vehicle-badges">
                  <span>
                    👤 <b>4</b> <small>{t.passengersWord}</small>
                  </span>
                  <span>
                    💼 <b>3</b> <small>{t.bagsWord}</small>
                  </span>
                </div>
                <p className="ref-vehicle-desc">
                  {isAr ? 'مركبة سيدان فاخرة' : 'Executive Luxury Sedan'}
                </p>
                <Link
                  href={\`/\${locale}/booking?vehicle=toyota-camry\`}
                  className="ref-vehicle-book-pill"
                >
                  <span>{isAr ? 'احجز الآن' : 'Book Now'}</span>
                  <span>{isRtl ? '←' : '→'}</span>
                </Link>
              </div>
            </article>

            {/* 02: Hyundai Staria VIP */}
            <article className="ref-vehicle-card-luxury">
              <div className="ref-vehicle-img-wrap">
                <Image
                  src="/assets/images/reference/hyundai-staria.webp"
                  alt="Hyundai Staria VIP Chauffeur"
                  width={320}
                  height={170}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="ref-vehicle-content">
                <h3>Hyundai Staria</h3>
                <div className="ref-vehicle-badges">
                  <span>
                    👤 <b>7</b> <small>{t.passengersWord}</small>
                  </span>
                  <span>
                    💼 <b>6</b> <small>{t.bagsWord}</small>
                  </span>
                </div>
                <p className="ref-vehicle-desc">
                  {isAr ? 'مركبة عائلية فاخرة' : 'Luxury Family Van'}
                </p>
                <Link
                  href={\`/\${locale}/booking?vehicle=hyundai-staria\`}
                  className="ref-vehicle-book-pill"
                >
                  <span>{isAr ? 'احجز الآن' : 'Book Now'}</span>
                  <span>{isRtl ? '←' : '→'}</span>
                </Link>
              </div>
            </article>

            {/* 03: GMC Yukon XL */}
            <article className="ref-vehicle-card-luxury">
              <div className="ref-vehicle-img-wrap">
                <Image
                  src="/assets/images/reference/gmc-yukon-xl.webp"
                  alt="GMC Yukon XL VIP Chauffeur"
                  width={320}
                  height={170}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="ref-vehicle-content">
                <h3>GMC Yukon XL</h3>
                <div className="ref-vehicle-badges">
                  <span>
                    👤 <b>7</b> <small>{t.passengersWord}</small>
                  </span>
                  <span>
                    💼 <b>8</b> <small>{t.bagsWord}</small>
                  </span>
                </div>
                <p className="ref-vehicle-desc">
                  {isAr ? 'SUV فاخرة' : 'Luxury SUV'}
                </p>
                <Link
                  href={\`/\${locale}/booking?vehicle=gmc-yukon-xl\`}
                  className="ref-vehicle-book-pill"
                >
                  <span>{isAr ? 'احجز الآن' : 'Book Now'}</span>
                  <span>{isRtl ? '←' : '→'}</span>
                </Link>
              </div>
            </article>

            {/* 04: Toyota HiAce */}
            <article className="ref-vehicle-card-luxury">
              <div className="ref-vehicle-img-wrap">
                <Image
                  src="/assets/images/reference/toyota-hiace.webp"
                  alt="Toyota HiAce VIP Chauffeur"
                  width={320}
                  height={170}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="ref-vehicle-content">
                <h3>Toyota HiAce</h3>
                <div className="ref-vehicle-badges">
                  <span>
                    👤 <b>10</b> <small>{t.passengersWord}</small>
                  </span>
                  <span>
                    💼 <b>10</b> <small>{t.bagsWord}</small>
                  </span>
                </div>
                <p className="ref-vehicle-desc">
                  {isAr ? 'مركبة عائلية واسعة' : 'Spacious Family Van'}
                </p>
                <Link
                  href={\`/\${locale}/booking?vehicle=toyota-hiace\`}
                  className="ref-vehicle-book-pill"
                >
                  <span>{isAr ? 'احجز الآن' : 'Book Now'}</span>
                  <span>{isRtl ? '←' : '→'}</span>
                </Link>
              </div>
            </article>

            {/* 05: Toyota Coaster */}
            <article className="ref-vehicle-card-luxury">
              <div className="ref-vehicle-img-wrap">
                <Image
                  src="/assets/images/reference/toyota-coaster.webp"
                  alt="Toyota Coaster VIP Bus"
                  width={320}
                  height={170}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="ref-vehicle-content">
                <h3>Toyota Coaster</h3>
                <div className="ref-vehicle-badges">
                  <span>
                    👤 <b>21</b> <small>{t.passengersWord}</small>
                  </span>
                  <span>
                    💼 <b>20</b> <small>{t.bagsWord}</small>
                  </span>
                </div>
                <p className="ref-vehicle-desc">
                  {isAr ? 'حافلة رحلات مريحة' : 'Executive Tour Coach'}
                </p>
                <Link
                  href={\`/\${locale}/booking?vehicle=toyota-coaster\`}
                  className="ref-vehicle-book-pill"
                >
                  <span>{isAr ? 'احجز الآن' : 'Book Now'}</span>
                  <span>{isRtl ? '←' : '→'}</span>
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          POPULAR ROUTES (Warm Sandstone Band with 3 Highlight Cards)
      ────────────────────────────────────────────────────────────── */}
      <section className="ref-routes-section" id="routes">
        <div className="ref-page-shell ref-routes-wrapper">
          {/* Header block on side */}
          <div className="ref-routes-header">
            <span className="ref-section-kicker">{t.routesKicker}</span>
            <h2>{t.routesTitle}</h2>
            <p>{t.routesSubtitle}</p>
            <Link href={\`/\${locale}/routes\`} className="ref-routes-btn">
              <span>{t.routesViewAll}</span>
              <span>{isRtl ? '←' : '→'}</span>
            </Link>
          </div>

          {/* 3 Routes in row */}
          <div className="ref-routes-cards-row">
            {/* Route 01: Jeddah Airport to Makkah */}
            <Link
              href={\`/\${locale}/booking?route=jeddah-airport-to-makkah\`}
              className="ref-route-card-mockup"
            >
              <Image
                src="/assets/images/routes/jeddah-airport-to-makkah.jpg"
                alt="Jeddah to Makkah VIP Transfer"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
              <span className="ref-route-shade" />
              <div className="ref-route-badge-float">
                <span>👤</span>
              </div>
              <div className="ref-route-info">
                <h3>{t.routeJeddahMakkah}</h3>
                <span className="ref-route-fare-pill">
                  {t.fromPricePrefix} {formatPrice(200)}
                </span>
              </div>
            </Link>

            {/* Route 02: Madinah Airport to Madinah Hotels */}
            <Link
              href={\`/\${locale}/booking?route=madinah-airport-to-madinah\`}
              className="ref-route-card-mockup"
            >
              <Image
                src="/assets/images/routes/madinah-airport.jpg"
                alt="Madinah Airport VIP Transfer"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
              <span className="ref-route-shade" />
              <div className="ref-route-info">
                <h3>{t.routeMadinahAirport}</h3>
                <span className="ref-route-fare-pill">
                  {t.fromPricePrefix} {formatPrice(200)}
                </span>
              </div>
            </Link>

            {/* Route 03: Riyadh to Makkah */}
            <Link
              href={\`/\${locale}/booking?route=riyadh-to-makkah\`}
              className="ref-route-card-mockup"
            >
              <Image
                src="/assets/images/routes/riyadh-to-makkah.jpg"
                alt="Riyadh to Makkah VIP Transfer"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
              <span className="ref-route-shade" />
              <div className="ref-route-info">
                <h3>{t.routeRiyadhMakkah}</h3>
                <span className="ref-route-fare-pill">
                  {t.fromPricePrefix} {formatPrice(650)}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          ROYAL CONCIERGE BANNER (Mercedes-Maybach & Luxury Interior)
      ────────────────────────────────────────────────────────────── */}
      <section className="ref-concierge-section" id="concierge">
        <div className="ref-page-shell">
          <div className="ref-concierge-banner">
            <Image
              src="/assets/images/cinematic/home/concierge-maybach-executive.jpg"
              alt="Royal Concierge Maybach Chauffeur"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="ref-concierge-overlay" />
            <div className="ref-concierge-content">
              <span className="ref-section-kicker text-[#D6A13A]">
                {t.conciergeKicker}
              </span>
              <h2>{t.conciergeTitle}</h2>
              <p>{t.conciergeSubtitle}</p>
              <a
                className="ref-concierge-whatsapp-btn"
                href="https://wa.me/966567588261"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.conciergeCta}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          CUSTOMER REVIEWS (Warm Sandstone Band with 3 Review Cards)
      ────────────────────────────────────────────────────────────── */}
      <section className="ref-reviews-section" id="reviews">
        <div className="ref-page-shell ref-reviews-wrapper">
          {/* Header block on side */}
          <div className="ref-reviews-header">
            <h2>{t.reviewsTitle}</h2>
            <p>{t.reviewsSubtitle}</p>
          </div>

          {/* 3 Review Cards */}
          <div className="ref-reviews-cards-row">
            {/* Review 01: Mohamed Al-Otaibi */}
            <article className="ref-review-card-mockup">
              <span className="ref-review-quote-gold">“</span>
              <p className="ref-review-body">{t.rev1Text}</p>
              <div className="ref-review-profile">
                <Image
                  src="/assets/images/reviews/reviewer-mohamed.jpg"
                  alt={t.rev1Name}
                  width={48}
                  height={48}
                  className="ref-review-avatar-img"
                />
                <div>
                  <strong>{t.rev1Name}</strong>
                </div>
              </div>
            </article>

            {/* Review 02: Sarah Al-Otaibi */}
            <article className="ref-review-card-mockup">
              <span className="ref-review-quote-gold">“</span>
              <p className="ref-review-body">{t.rev2Text}</p>
              <div className="ref-review-profile">
                <Image
                  src="/assets/images/reviews/reviewer-sarah.jpg"
                  alt={t.rev2Name}
                  width={48}
                  height={48}
                  className="ref-review-avatar-img"
                />
                <div>
                  <strong>{t.rev2Name}</strong>
                </div>
              </div>
            </article>

            {/* Review 03: Ahmed Mohamed */}
            <article className="ref-review-card-mockup">
              <span className="ref-review-quote-gold">“</span>
              <p className="ref-review-body">{t.rev3Text}</p>
              <div className="ref-review-profile">
                <Image
                  src="/assets/images/reviews/reviewer-ahmed.jpg"
                  alt={t.rev3Name}
                  width={48}
                  height={48}
                  className="ref-review-avatar-img"
                />
                <div>
                  <strong>{t.rev3Name}</strong>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          PRE-FOOTER CTA BANNER (Cinematic Highway SUV Banner)
      ────────────────────────────────────────────────────────────── */}
      <section className="ref-final-banner" id="contact">
        <Image
          src="/assets/images/cinematic/services/services-suv-highway.jpg"
          alt="Luxury Chauffeur Highway Journey"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="ref-final-banner-overlay" />
        <div className="ref-page-shell ref-final-banner-content">
          <h2>{t.finalCtaTitle}</h2>
          <a href="#booking" className="ref-final-gold-btn">
            <span>{t.finalCtaButton}</span>
            <span>{isRtl ? '←' : '→'}</span>
          </a>
        </div>
      </section>
    </div>
  );
}
`;

fs.writeFileSync('src/components/home/RoyalHomepageExperience.tsx', experienceCode, 'utf8');
console.log('Successfully updated RoyalHomepageExperience.tsx');
