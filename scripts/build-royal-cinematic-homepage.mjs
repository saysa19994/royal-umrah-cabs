import fs from 'fs';

// 1. Royal Cinematic Luxury Component
const componentCode = `'use client';

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
  Sparkles,
  ChevronDown,
  CheckCircle2,
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
  bookingGuaranteedCash: string;
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
  bookThisVehicle: string;
  routesKicker: string;
  routesTitle: string;
  routesSubtitle: string;
  routesViewAll: string;
  fromPricePrefix: string;
  routeJeddahMakkah: string;
  routeMadinahAirport: string;
  routeRiyadhMakkah: string;
  routeMakkahMadinah: string;
  conciergeKicker: string;
  conciergeTitle: string;
  conciergeSubtitle: string;
  conciergeCta: string;
  pillarsKicker: string;
  pillarsTitle: string;
  pillarsSubtitle: string;
  pillar1Title: string;
  pillar1Desc: string;
  pillar2Title: string;
  pillar2Desc: string;
  pillar3Title: string;
  pillar3Desc: string;
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
    heroBadge: 'ضيوف الرحمن VIP • ضيافة ملكية رفيعة',
    heroHeadlineMain: 'رحلتك في المملكة..',
    heroHeadlineHighlight: 'برفاهية تليق بضيوف الرحمن',
    heroSubtitle: 'خدمات نقل خاصة وسائقون معتمدون بمعايير فندقية رفيعة. تجربة سفر مصممة لراحتك المطلقة من صالة القدوم حتى باب وجهتك.',
    pickupLabel: 'من أين؟',
    pickupPlaceholder: 'اختر نقطة الانطلاق',
    dropoffLabel: 'إلى أين؟',
    dropoffPlaceholder: 'اختر الوجهة',
    dateLabel: 'تاريخ الرحلة',
    passengersLabel: 'عدد الركاب',
    bookingSubmit: 'عرض الأسطول والأسعار',
    bookingGuaranteedCash: 'دفع نقدي للسائق بعد الوصول بأمان • شامل كافة الضرائب والرسوم • بدون أي دفع مسبق',
    errorSelectFields: 'يرجى تحديد نقطة الانطلاق والوجهة وتاريخ الرحلة.',
    errorSameLocation: 'يرجى اختيار وجهتين مختلفتين.',
    locJeddahAirport: 'مطار جدة (KAIA)',
    locMakkah: 'مكة المكرمة',
    locMadinahAirport: 'مطار المدينة المنورة',
    locMadinah: 'المدينة المنورة',
    locTaif: 'الطائف',
    locRiyadh: 'الرياض',
    trustTaxesTitle: 'شامل الرسوم والضرائب',
    trustCancelTitle: 'إلغاء مجاني ومرونة كاملة',
    trustChildTitle: 'مقاعد أطفال مجانية عند الطلب',
    trustFlightTitle: 'متابعة حية للرحلات الجوية',
    trust24Title: 'خدمة كونسيرج 24/7',
    fleetKicker: 'أسطول الضيافة الفاخر • THE ROYAL FLEET',
    fleetTitle: 'مركبات صُممت لتمنحك أقصى درجات الراحة والسكينة',
    fleetSubtitle: 'مجموعة متكاملة من أحدث طرازات السيارات الفارهة، تخضع لأعلى معايير الصيانة والتعقيم اليومي.',
    fleetViewAll: 'استكشف الأسطول كاملاً',
    passengersWord: 'ركاب',
    bagsWord: 'حقائب',
    bookThisVehicle: 'احجز هذه الفئة الآن',
    routesKicker: 'المسارات المعتمدة • PILGRIMAGE CORRIDORS',
    routesTitle: 'أسعار ثابتة ومحددة لجميع وجهاتك في المملكة',
    routesSubtitle: 'تعرف على تسعيرة المسارات المعتمدة بين المطارات، الفنادق، ومواقع الزيارات بدون أي تكاليف خفية.',
    routesViewAll: 'استكشف كافة المسارات والأسعار',
    fromPricePrefix: 'من',
    routeJeddahMakkah: 'مطار جدة ↔ مكة المكرمة',
    routeMadinahAirport: 'مطار المدينة ↔ فنادق المدينة',
    routeRiyadhMakkah: 'الرياض ↔ مكة المكرمة',
    routeMakkahMadinah: 'مكة المكرمة ↔ المدينة المنورة',
    conciergeKicker: 'خدمة الكونسيرج الملكي • BESPOKE VIP MOBILITY',
    conciergeTitle: 'سيارات مايباخ وهيونداي H1 للطلبات الدبلوماسية والخاصة',
    conciergeSubtitle: 'خدمة استثنائية مخصصة للضيوف الدبلوماسيين وكبار الشخصيات ورجال الأعمال، متاحة بالتنسيق المباشر والمسبق مع فريق الكونسيرج.',
    conciergeCta: 'تواصل مع الكونسيرج الملكي عبر واتساب',
    pillarsKicker: 'معايير الضيافة الرفيعة • HOSPITALITY EXCELLENCE',
    pillarsTitle: 'لماذا يختار ضيوف الرحمن خدماتنا الخاصة؟',
    pillarsSubtitle: 'نجمع بين الخبرة العميقة في طرق المملكة وأعلى معايير اللباقة والضيافة السعودية الأصيلة.',
    pillar1Title: 'الاستقبال المسبق بالاسم',
    pillar1Desc: 'لقاء خاص بصالة القدوم فور وصول رحلتك مع لوحة اسم مخصصة ومساعدة كاملة في نقل الأمتعة.',
    pillar2Title: 'سائقون محترفون ومركبات حديثة',
    pillar2Desc: 'أسطول موديل العام مجهز بأعلى درجات النظافة والتعقيم، وسائقون على دراية تامة بمداخل الحرمين.',
    pillar3Title: 'دفع نقدي 100% بعد الوصول',
    pillar3Desc: 'لا نطلب أي دفع مسبق أو بطاقات بنكية، الدفع نقداً للسائق بعد إتمام مشوارك والاطمئنان الكامل.',
    reviewsKicker: 'ثقة ضيوفنا • GUEST TESTIMONIALS',
    reviewsTitle: 'شهادات نعتز بها من ضيوف الرحمن والعائلات',
    reviewsSubtitle: 'تجارب واقعية لضيوفنا الكرام الذين وثقوا بنا في رحلاتهم الخاصة.',
    rev1Name: 'محمد العتيبي',
    rev1Tag: 'معتمر، الرياض',
    rev1Text: 'أفضل خدمة نقل في المملكة بلا منازع. السائق كان بانتظارنا في المطار بسيارة حديثة ومعقمة، وسهولة الدفع عند الوصول تعطي طمأنينة كاملة.',
    rev2Name: 'سارة العتيبي',
    rev2Tag: 'رحلة عائلية',
    rev2Text: 'تجربة خمس نجوم بكل تفاصيلها. السيارة واسعة جداً ومريحة للأطفال وكبار السن، والتزام كامل بالمواعيد.',
    rev3Name: 'أحمد محمد',
    rev3Tag: 'معتمر، الإمارات',
    rev3Text: 'خدمة كونسيرج راقية واهتمام بأدق التفاصيل. من لحظة الحجز وحتى الوصول للفندق كانت التجربة في غاية السلاسة والاحترافية.',
    finalCtaTitle: 'احجز رحلتك الخاصة الآن واستمتع بضيافة ملكية استثنائية',
    finalCtaButton: 'ابدأ الحجز الآن',
  },
  en: {
    announcement: 'VIP private chauffeur service across Saudi Arabia',
    heroBadge: 'DUYUF ALRAHMAN VIP • ROYAL CHAUFFEUR',
    heroHeadlineMain: 'Your Journey Across the Kingdom..',
    heroHeadlineHighlight: 'With True Distinction',
    heroSubtitle: 'Private executive chauffeur services tailored for pilgrims and families. Uncompromising comfort, discretion, and hospitality from arrival to your hotel.',
    pickupLabel: 'From?',
    pickupPlaceholder: 'Select pickup point',
    dropoffLabel: 'To?',
    dropoffPlaceholder: 'Select destination',
    dateLabel: 'Travel Date',
    passengersLabel: 'Passengers',
    bookingSubmit: 'Explore Fleet & Fares',
    bookingGuaranteedCash: 'Cash to Driver Upon Safe Arrival • All Taxes & Tolls Included • Zero Prepayment Required',
    errorSelectFields: 'Please select pickup location, destination, and travel date.',
    errorSameLocation: 'Please select two different locations.',
    locJeddahAirport: 'Jeddah Airport (KAIA)',
    locMakkah: 'Makkah Al-Mukarramah',
    locMadinahAirport: 'Madinah Airport',
    locMadinah: 'Madinah Al-Munawwarah',
    locTaif: 'Taif',
    locRiyadh: 'Riyadh',
    trustTaxesTitle: 'Taxes & Tolls Included',
    trustCancelTitle: 'Flexible Free Cancellation',
    trustChildTitle: 'Complimentary Child Seats',
    trustFlightTitle: 'Active Flight Tracking',
    trust24Title: '24/7 Dedicated Concierge',
    fleetKicker: 'OUR LUXURY FLEET • THE ROYAL FLEET',
    fleetTitle: 'Distinguished Fleet Engineered for Peace of Mind',
    fleetSubtitle: 'A curated selection of late-model luxury vehicles maintained to immaculate hospitality standards.',
    fleetViewAll: 'Explore Complete Fleet',
    passengersWord: 'Pax',
    bagsWord: 'Bags',
    bookThisVehicle: 'Reserve This Class',
    routesKicker: 'PILGRIMAGE CORRIDORS',
    routesTitle: 'Fixed Approved Fares Across the Kingdom',
    routesSubtitle: 'Transparent, all-inclusive private transfer rates connecting airports, hotels, and sacred sites.',
    routesViewAll: 'View All Routes & Fares',
    fromPricePrefix: 'From',
    routeJeddahMakkah: 'Jeddah Airport ↔ Makkah',
    routeMadinahAirport: 'Madinah Airport ↔ Hotels',
    routeRiyadhMakkah: 'Riyadh ↔ Makkah',
    routeMakkahMadinah: 'Makkah ↔ Madinah',
    conciergeKicker: 'ROYAL CONCIERGE SERVICE • BESPOKE VIP MOBILITY',
    conciergeTitle: 'Maybach & Hyundai H1 for Diplomatic & Bespoke Delegations',
    conciergeSubtitle: 'An exceptional private mobility experience reserved for diplomats, dignitaries, and VIP delegations via direct concierge arrangement.',
    conciergeCta: 'Contact Royal Concierge via WhatsApp',
    pillarsKicker: 'HOSPITALITY EXCELLENCE',
    pillarsTitle: 'Why Discerning Pilgrims Choose Our Chauffeur Service',
    pillarsSubtitle: 'Combining deep highway route expertise with five-star Saudi hospitality traditions.',
    pillar1Title: 'Personalized Airport Meet & Greet',
    pillar1Desc: 'Private welcome at the terminal with personalized signage and comprehensive luggage assistance.',
    pillar2Title: 'Certified Chauffeurs & Late-Model Fleet',
    pillar2Desc: 'Pristine, sanitized vehicles driven by experienced chauffeurs who know every holy site access point.',
    pillar3Title: '100% Cash Payment Upon Safe Arrival',
    pillar3Desc: 'No card prepayment or security deposit. Pay cash to your driver only after reaching your destination safely.',
    reviewsKicker: 'GUEST TESTIMONIALS',
    reviewsTitle: 'Words of Appreciation from Our Honored Guests',
    reviewsSubtitle: 'Authentic reviews from travelers who trusted Duyuf Alrahman VIP for their sacred journey.',
    rev1Name: 'Mohamed Al-Otaibi',
    rev1Tag: 'Pilgrim, Riyadh',
    rev1Text: 'The undisputed best chauffeur service in the Kingdom. The driver was waiting at the terminal in a pristine vehicle, and paying cash upon arrival provides total peace of mind.',
    rev2Name: 'Sarah Al-Otaibi',
    rev2Tag: 'Family Journey',
    rev2Text: 'A five-star experience in every detail. The vehicle was remarkably spacious for our family, and punctuality was flawless.',
    rev3Name: 'Ahmed Mohamed',
    rev3Tag: 'Pilgrim, UAE',
    rev3Text: 'Exquisite concierge attention. From reservation to arrival at our Makkah hotel, everything was executed with seamless grace.',
    finalCtaTitle: 'Reserve Your Private Chauffeur Today & Experience Royal Hospitality',
    finalCtaButton: 'Start Your Reservation Now',
  },
  ms: {
    announcement: 'Perkhidmatan pengangkutan peribadi VIP di seluruh Arab Saudi',
    heroBadge: 'DUYUF ALRAHMAN VIP • LAYANAN DIRAJA',
    heroHeadlineMain: 'Perjalanan Anda di Arab Saudi..',
    heroHeadlineHighlight: 'Dengan Kemewahan Diraja',
    heroSubtitle: 'Pengangkutan mewah peribadi dengan pemandu profesional untuk ketenangan mutlak anda dari ketibaan hingga ke hotel.',
    pickupLabel: 'Dari mana?',
    pickupPlaceholder: 'Pilih lokasi pengambilan',
    dropoffLabel: 'Ke mana?',
    dropoffPlaceholder: 'Pilih destinasi',
    dateLabel: 'Tarikh Perjalanan',
    passengersLabel: 'Bilangan Penumpang',
    bookingSubmit: 'Lihat Armada & Harga',
    bookingGuaranteedCash: 'Bayar Tunai kepada Pemandu Selepas Tiba • Termasuk Tol & Cukai • Tanpa Deposit',
    errorSelectFields: 'Sila pilih lokasi pengambilan, destinasi, dan tarikh perjalanan.',
    errorSameLocation: 'Sila pilih dua destinasi yang berbeza.',
    locJeddahAirport: 'Lapangan Terbang Jeddah (KAIA)',
    locMakkah: 'Makkah Al-Mukarramah',
    locMadinahAirport: 'Lapangan Terbang Madinah',
    locMadinah: 'Madinah Al-Munawwarah',
    locTaif: 'Taif',
    locRiyadh: 'Riyadh',
    trustTaxesTitle: 'Semua Cukai & Tol Termasuk',
    trustCancelTitle: 'Pembatalan Percuma & Fleksibel',
    trustChildTitle: 'Kerusi Kanak-kanak Percuma',
    trustFlightTitle: 'Penjejakan Penerbangan Aktif',
    trust24Title: 'Khidmat Konsierj 24/7',
    fleetKicker: 'ARMADA MEWAH KAMI',
    fleetTitle: 'Kenderaan Terpilih untuk Keselesaan Maksimum',
    fleetSubtitle: 'Koleksi kenderaan moden yang diselenggara mengikut piawaian hospitaliti bertaraf lima bintang.',
    fleetViewAll: 'Lihat Semua Armada',
    passengersWord: 'Penumpang',
    bagsWord: 'Beg',
    bookThisVehicle: 'Tempah Kelas Ini',
    routesKicker: 'LALUAN POPULAR',
    routesTitle: 'Kadar Tetap & Telus di Seluruh Arab Saudi',
    routesSubtitle: 'Kadar perjalanan peribadi menghubungkan lapangan terbang, hotel, dan lokasi ziarah.',
    routesViewAll: 'Lihat Semua Laluan & Harga',
    fromPricePrefix: 'Dari',
    routeJeddahMakkah: 'Lap. Terbang Jeddah ↔ Makkah',
    routeMadinahAirport: 'Lap. Terbang Madinah ↔ Hotel',
    routeRiyadhMakkah: 'Riyadh ↔ Makkah',
    routeMakkahMadinah: 'Makkah ↔ Madinah',
    conciergeKicker: 'PERKHIDMATAN KONSIERJ DIRAJA',
    conciergeTitle: 'Maybach & Hyundai H1 untuk Permintaan Khas',
    conciergeSubtitle: 'Pengangkutan eksklusif untuk tetamu kehormat dan delegasi melalui WhatsApp terus.',
    conciergeCta: 'Hubungi Konsierj Diraja di WhatsApp',
    pillarsKicker: 'KECEMERLANGAN HOSPITALITI',
    pillarsTitle: 'Mengapa Jemaah Memilih Perkhidmatan Kami?',
    pillarsSubtitle: 'Gabungan kepakaran jalan raya Arab Saudi dan layanan mesra tetamu.',
    pillar1Title: 'Sambutan Peribadi di Lapangan Terbang',
    pillar1Desc: 'Pemandu menunggu di balai ketibaan dengan papan nama peribadi dan bantuan bagasi.',
    pillar2Title: 'Pemandu Berpengalaman & Kenderaan Baharu',
    pillar2Desc: 'Kenderaan bersih dan pemandu yang arif tentang semua laluan ke Masjidil Haram.',
    pillar3Title: 'Bayaran Tunai 100% Selepas Tiba',
    pillar3Desc: 'Tiada bayaran pendahuluan atau kad kredit. Bayar tunai kepada pemandu selepas tiba dengan selamat.',
    reviewsKicker: 'ULASAN JEMAAH',
    reviewsTitle: 'Penghargaan daripada Para Tetamu Kami',
    reviewsSubtitle: 'Pengalaman sebenar jemaah yang memilih Duyuf Alrahman VIP.',
    rev1Name: 'Mohamed Al-Otaibi',
    rev1Tag: 'Jemaah, Riyadh',
    rev1Text: 'Perkhidmatan terbaik di Arab Saudi. Pemandu tepat pada masanya dan bayaran tunai selepas tiba memberi keyakinan penuh.',
    rev2Name: 'Sarah Al-Otaibi',
    rev2Tag: 'Perjalanan Keluarga',
    rev2Text: 'Pengalaman bertaraf lima bintang. Kenderaan sangat luas dan selesa untuk keluarga.',
    rev3Name: 'Ahmed Mohamed',
    rev3Tag: 'Jemaah, UAE',
    rev3Text: 'Layanan konsierj yang cemerlang. Perjalanan berjalan sangat lancar dan profesional.',
    finalCtaTitle: 'Tempah Perjalanan Anda Sekarang & Nikmati Layanan Diraja',
    finalCtaButton: 'Mulakan Tempahan Sekarang',
  },
  id: {
    announcement: 'Layanan transportasi pribadi VIP di seluruh Arab Saudi',
    heroBadge: 'DUYUF ALRAHMAN VIP • LAYANAN ISTIMEWA',
    heroHeadlineMain: 'Perjalanan Anda di Arab Saudi..',
    heroHeadlineHighlight: 'Dengan Kemewahan Sempurna',
    heroSubtitle: 'Layanan sopir pribadi eksklusif untuk kenyamanan dan ketenangan mutlak jemaah dari bandara ke hotel.',
    pickupLabel: 'Dari mana?',
    pickupPlaceholder: 'Pilih lokasi penjemputan',
    dropoffLabel: 'Ke mana?',
    dropoffPlaceholder: 'Pilih tujuan',
    dateLabel: 'Tanggal Perjalanan',
    passengersLabel: 'Jumlah Penumpang',
    bookingSubmit: 'Lihat Armada & Tarif',
    bookingGuaranteedCash: 'Bayar Tunai ke Sopir Setelah Tiba • Termasuk Tol & Pajak • Tanpa Uang Muka',
    errorSelectFields: 'Silakan pilih lokasi jemput, tujuan, dan tanggal perjalanan.',
    errorSameLocation: 'Silakan pilih dua lokasi yang berbeda.',
    locJeddahAirport: 'Bandara Jeddah (KAIA)',
    locMakkah: 'Makkah Al-Mukarramah',
    locMadinahAirport: 'Bandara Madinah',
    locMadinah: 'Madinah Al-Munawwarah',
    locTaif: 'Taif',
    locRiyadh: 'Riyadh',
    trustTaxesTitle: 'Semua Pajak & Tol Termasuk',
    trustCancelTitle: 'Pembatalan Gratis & Fleksibel',
    trustChildTitle: 'Kursi Anak Gratis atas Permintaan',
    trustFlightTitle: 'Pelacakan Penerbangan Langsung',
    trust24Title: 'Layanan Concierge 24/7',
    fleetKicker: 'ARMADA MEWAH KAMI',
    fleetTitle: 'Kendaraan Pilihan untuk Kenyamanan Perjalanan Ibadah',
    fleetSubtitle: 'Koleksi kendaraan keluaran terbaru dengan standar kebersihan dan kenyamanan hotel bintang lima.',
    fleetViewAll: 'Lihat Semua Kendaraan',
    passengersWord: 'Penumpang',
    bagsWord: 'Koper',
    bookThisVehicle: 'Pesan Kelas Ini',
    routesKicker: 'RUTE UTAMA UMRAH',
    routesTitle: 'Tarif Pasti & Transparan di Seluruh Kerajaan',
    routesSubtitle: 'Tarif transfer privat antara bandara, hotel, dan lokasi ziarah tanpa biaya tersembunyi.',
    routesViewAll: 'Lihat Semua Rute & Tarif',
    fromPricePrefix: 'Mulai',
    routeJeddahMakkah: 'Bandara Jeddah ↔ Makkah',
    routeMadinahAirport: 'Bandara Madinah ↔ Hotel',
    routeRiyadhMakkah: 'Riyadh ↔ Makkah',
    routeMakkahMadinah: 'Makkah ↔ Madinah',
    conciergeKicker: 'LAYANAN CONCIERGE DIRAJA',
    conciergeTitle: 'Maybach & Hyundai H1 untuk Tamu Kehormatan',
    conciergeSubtitle: 'Layanan istimewa bagi delegasi diplomatik dan VIP melalui koordinasi WhatsApp langsung.',
    conciergeCta: 'Hubungi Concierge melalui WhatsApp',
    pillarsKicker: 'STANDAR KERAMAHAN',
    pillarsTitle: 'Mengapa Jemaah Memilih Layanan Kami?',
    pillarsSubtitle: 'Memadukan pengalaman rute antar-kota dengan keramahan khas Saudi.',
    pillar1Title: 'Penyambutan Pribadi di Bandara',
    pillar1Desc: 'Sopir menyambut di pintu kedatangan dengan papan nama dan membantu koper Anda.',
    pillar2Title: 'Sopir Bersertifikat & Armada Terawat',
    pillar2Desc: 'Kendaraan wangi dan bersih dengan sopir yang memahami akses terbaik ke hotel-hotel Haram.',
    pillar3Title: '100% Pembayaran Tunai Setelah Tiba',
    pillar3Desc: 'Tanpa perlu kartu kredit atau uang muka. Bayar tunai setelah sampai di tempat tujuan dengan aman.',
    reviewsKicker: 'TESTIMONI JEMAAH',
    reviewsTitle: 'Kepercayaan dari Para Tamu Kami',
    reviewsSubtitle: 'Pengalaman nyata dari jemaah dan keluarga bersama Duyuf Alrahman VIP.',
    rev1Name: 'Mohamed Al-Otaibi',
    rev1Tag: 'Jamaah, Riyadh',
    rev1Text: 'Layanan transportasi terbaik di Arab Saudi. Sopir menunggu tepat waktu dan pembayaran tunai di tempat sangat menenangkan.',
    rev2Name: 'Sarah Al-Otaibi',
    rev2Tag: 'Perjalanan Keluarga',
    rev2Text: 'Pengalaman luar biasa. Mobil sangat luas dan nyaman untuk seluruh keluarga.',
    rev3Name: 'Ahmed Mohamed',
    rev3Tag: 'Jamaah, UEA',
    rev3Text: 'Pelayanan istimewa dari awal pemesanan hingga tiba di hotel Makkah.',
    finalCtaTitle: 'Pesan Perjalanan Anda Sekarang & Nikmati Layanan Istimewa',
    finalCtaButton: 'Mulai Pemesanan Sekarang',
  },
  ur: {
    announcement: 'سعودی عرب میں معتمرین اور خاندانوں کے لیے خصوصی پرائیویٹ ٹرانسپورٹ سروس',
    heroBadge: 'ضیوف الرحمن VIP • شاہانہ ضیافت',
    heroHeadlineMain: 'سعودی عرب میں آپ کا سفر…',
    heroHeadlineHighlight: 'شاہانہ وقار اور آرام کے ساتھ',
    heroSubtitle: 'پرتعیش گاڑیوں اور تربیت یافتہ ڈرائیوروں کے ساتھ خصوصی سفر۔ آپ کی راحت کے لیے تیار کردہ منفرد تجربہ۔',
    pickupLabel: 'کہاں سے؟',
    pickupPlaceholder: 'روانگی کا مقام منتخب کریں',
    dropoffLabel: 'کہاں تک؟',
    dropoffPlaceholder: 'منزل منتخب کریں',
    dateLabel: 'سفر کی تاریخ',
    passengersLabel: 'مسافروں کی تعداد',
    bookingSubmit: 'گاڑیاں اور کرائے دیکھیں',
    bookingGuaranteedCash: 'منزل پر پہنچنے کے بعد ڈرائیور کو نقد ادائیگی • تمام ٹیکس شامل • پیشگی رقم کی ضرورت نہیں',
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
    trust24Title: '24/7 ہمہ وقت کونسیرج',
    fleetKicker: 'ہمارا پرتعیش فلیٹ • THE ROYAL FLEET',
    fleetTitle: 'آرام اور سکون کے لیے بہترین گاڑیاں',
    fleetSubtitle: 'جدید ترین ماڈلز کا انتخاب جو ہر سفر کے لیے مکمل صاف اور معائنہ شدہ ہیں۔',
    fleetViewAll: 'تمام فلیٹ دیکھیں',
    passengersWord: 'مسافر',
    bagsWord: 'بیگ',
    bookThisVehicle: 'یہ کلاس بک کریں',
    routesKicker: 'مقبول ترین راستے',
    routesTitle: 'سعودی عرب کے تمام اہم شہروں کے لیے فکسڈ کرائے',
    routesSubtitle: 'ایئرپورٹ، ہوٹلوں اور زیارات کے لیے بغیر کسی پوشیدہ چارجز کے شفاف کرائے۔',
    routesViewAll: 'تمام روٹس اور کرائے دیکھیں',
    fromPricePrefix: 'شروع از',
    routeJeddahMakkah: 'جدہ ایئرپورٹ ↔ مکہ مکرمہ',
    routeMadinahAirport: 'مدینہ ایئرپورٹ ↔ مدینہ ہوٹل',
    routeRiyadhMakkah: 'ریاض ↔ مکہ مکرمہ',
    routeMakkahMadinah: 'مکہ مکرمہ ↔ مدینہ منورہ',
    conciergeKicker: 'شاہی کونسیرج سروس',
    conciergeTitle: 'مے باخ اور ہیونڈائی H1 برائے وی آئی پی وفود',
    conciergeSubtitle: 'سفارتی اور معزز مہمانوں کے لیے خصوصی انتظام، براہ راست واٹس ایپ پر رابطہ کریں۔',
    conciergeCta: 'واٹس ایپ پر کونسیرج سے رابطہ کریں',
    pillarsKicker: 'اعلیٰ مہمان نوازی کے اصول',
    pillarsTitle: 'معتمرین ہمارے فلیٹ کا انتخاب کیوں کرتے ہیں؟',
    pillarsSubtitle: 'سعودی عرب کی شاہراہوں کا وسیع تجربہ اور روایتی عربی مہمان نوازی۔',
    pillar1Title: 'ایئرپورٹ پر نام کے بورڈ کے ساتھ استقبال',
    pillar1Desc: 'آمد کے لاؤنج میں ڈرائیور کا پیشگی انتظار اور سامان میں مکمل مدد۔',
    pillar2Title: 'پیشہ ور ڈرائیورز اور جدید گاڑیاں',
    pillar2Desc: 'حرمین کے تمام راستوں سے بخوبی واقف اور خاندان کی مکمل پرائیویسی کا احترام۔',
    pillar3Title: '100% آمد کے بعد نقد ادائیگی',
    pillar3Desc: 'بغیر کسی ایڈوانس ڈپازٹ کے، منزل پر بخیریت پہنچنے کے بعد ڈرائیور کو نقد ادائیگی۔',
    reviewsKicker: 'معزز مہمانوں کے تاثرات',
    reviewsTitle: 'ہمارے معزز مہمانوں کا اعتماد',
    reviewsSubtitle: 'ضیوف الرحمن VIP کے ساتھ سفر کرنے والے مہمانوں کے حقیقی تاثرات۔',
    rev1Name: 'محمد العتیبی',
    rev1Tag: 'معتمر، ریاض',
    rev1Text: 'سعودی عرب میں بلاشبہ بہترین سروس۔ ڈرائیور وقت پر موجود تھا اور پہنچنے کے بعد ادائیگی نے بے حد اطمینان دیا۔',
    rev2Name: 'سارہ العتیبی',
    rev2Tag: 'خاندانی سفر',
    rev2Text: 'پانچ ستارہ معیار کا تجربہ۔ گاڑی انتہائی کشادہ اور خاندان کے لیے پرسکون تھی۔',
    rev3Name: 'احمد محمد',
    rev3Tag: 'معتمر، امارات',
    rev3Text: 'انتہائی شاندار کونسیرج سروس۔ بکنگ سے لے کر مکہ کے ہوٹل پہنچنے تک سب کچھ شاندار تھا۔',
    finalCtaTitle: 'ابھی اپنا سفر بک کریں اور شاہانہ ضیافت کا تجربہ حاصل کریں',
    finalCtaButton: 'ابھی بکنگ شروع کریں',
  },
  fr: {
    announcement: 'Services de chauffeur privé VIP à travers l’Arabie Saoudite',
    heroBadge: 'DUYUF ALRAHMAN VIP • EXCELLENCE ROYALE',
    heroHeadlineMain: 'Votre voyage en Arabie Saoudite..',
    heroHeadlineHighlight: 'Avec une distinction royale',
    heroSubtitle: 'Services de chauffeur privé de grand prestige conçus pour votre sérénité totale, du terminal d’arrivée à votre hôtel.',
    pickupLabel: 'D’où ?',
    pickupPlaceholder: 'Lieu de départ',
    dropoffLabel: 'Vers où ?',
    dropoffPlaceholder: 'Destination',
    dateLabel: 'Date du voyage',
    passengersLabel: 'Passagers',
    bookingSubmit: 'Voir la flotte et les tarifs',
    bookingGuaranteedCash: 'Paiement en espèces au chauffeur après arrivée sécurisée • Taxes et péages inclus • Aucun acompte',
    errorSelectFields: 'Veuillez sélectionner un départ, une destination et une date.',
    errorSameLocation: 'Veuillez choisir deux destinations différentes.',
    locJeddahAirport: 'Aéroport de Djeddah (KAIA)',
    locMakkah: 'La Mecque',
    locMadinahAirport: 'Aéroport de Médine',
    locMadinah: 'Médine',
    locTaif: 'Taif',
    locRiyadh: 'Riyad',
    trustTaxesTitle: 'Taxes et péages inclus',
    trustCancelTitle: 'Annulation gratuite et flexible',
    trustChildTitle: 'Sièges enfants gracieux',
    trustFlightTitle: 'Suivi des vols en direct',
    trust24Title: 'Conciergerie dédiée 24/7',
    fleetKicker: 'NOTRE FLOTTE DE PRESTIGE',
    fleetTitle: 'Des véhicules d’exception pour votre confort absolu',
    fleetSubtitle: 'Flotte moderne de prestige inspectée et entretenue selon les normes hôtelières 5 étoiles.',
    fleetViewAll: 'Découvrir toute la flotte',
    passengersWord: 'Passagers',
    bagsWord: 'Bagages',
    bookThisVehicle: 'Réserver cette catégorie',
    routesKicker: 'CORRIDORS DE PÈLERINAGE',
    routesTitle: 'Tarifs fixes et transparents à travers le Royaume',
    routesSubtitle: 'Transferts privés fiables reliant les aéroports, hôtels et lieux sacrés sans frais cachés.',
    routesViewAll: 'Voir tous les trajets et tarifs',
    fromPricePrefix: 'Dès',
    routeJeddahMakkah: 'Aéroport Djeddah ↔ La Mecque',
    routeMadinahAirport: 'Aéroport Médine ↔ Hôtels Médine',
    routeRiyadhMakkah: 'Riyad ↔ La Mecque',
    routeMakkahMadinah: 'La Mecque ↔ Médine',
    conciergeKicker: 'SERVICE DE CONCIERGERIE ROYALE',
    conciergeTitle: 'Maybach et Hyundai H1 pour délégations VIP',
    conciergeSubtitle: 'Prestation d’exception réservée aux hôtes diplomatiques et aux délégations officielles via WhatsApp.',
    conciergeCta: 'Contacter la conciergerie royale sur WhatsApp',
    pillarsKicker: 'STANDARDS D’HOSPITALITÉ',
    pillarsTitle: 'Pourquoi les pèlerins choisissent notre service privé ?',
    pillarsSubtitle: 'La maîtrise experte des routes saoudiennes alliée à la haute hospitalité.',
    pillar1Title: 'Accueil personnalisé à l’aéroport',
    pillar1Desc: 'Accueil chaleureux dès votre sortie avec panneau nominatif et prise en charge des bagages.',
    pillar2Title: 'Chauffeurs certifiés et véhicules récents',
    pillar2Desc: 'Véhicules impeccables conduits par des professionnels connaissant chaque accès aux Lieux Saints.',
    pillar3Title: 'Paiement 100% en espèces à l’arrivée',
    pillar3Desc: 'Pas de prépaiement par carte. Réglez le chauffeur en espèces après être arrivés en toute sécurité.',
    reviewsKicker: 'AVIS DE NOS HÔTES',
    reviewsTitle: 'Témoignages de nos pèlerins et familles',
    reviewsSubtitle: 'Retours d’expérience de nos voyageurs avec Duyuf Alrahman VIP.',
    rev1Name: 'Mohamed Al-Otaibi',
    rev1Tag: 'Pèlerin, Riyad',
    rev1Text: 'Le meilleur service de transport en Arabie Saoudite. Ponctualité exemplaire et paiement à l’arrivée très rassurant.',
    rev2Name: 'Sarah Al-Otaibi',
    rev2Tag: 'Voyage en famille',
    rev2Text: 'Une expérience 5 étoiles. Véhicule très spacieux et confortable pour les enfants.',
    rev3Name: 'Ahmed Mohamed',
    rev3Tag: 'Pèlerin, Émirats',
    rev3Text: 'Prestation de conciergerie impeccable du début à la fin de notre séjour.',
    finalCtaTitle: 'Réservez votre voyage maintenant et vivez une hospitalité royale',
    finalCtaButton: 'Commencer la réservation',
  },
  es: {
    announcement: 'Servicio de chófer privado VIP en Arabia Saudita',
    heroBadge: 'DUYUF ALRAHMAN VIP • DISTINCIÓN REAL',
    heroHeadlineMain: 'Su viaje en Arabia Saudita..',
    heroHeadlineHighlight: 'Con distinción suprema',
    heroSubtitle: 'Transporte privado ejecutivo diseñado para su serenidad y confort desde su llegada hasta su hotel.',
    pickupLabel: '¿Desde dónde?',
    pickupPlaceholder: 'Punto de recogida',
    dropoffLabel: '¿Hacia dónde?',
    dropoffPlaceholder: 'Destino',
    dateLabel: 'Fecha del viaje',
    passengersLabel: 'Pasajeros',
    bookingSubmit: 'Ver flota y tarifas',
    bookingGuaranteedCash: 'Pago en efectivo al conductor a la llegada • Impuestos y peajes incluidos • Sin depósito',
    errorSelectFields: 'Por favor seleccione recogida, destino y fecha.',
    errorSameLocation: 'Por favor elija dos destinos diferentes.',
    locJeddahAirport: 'Aeropuerto de Yeda (KAIA)',
    locMakkah: 'La Meca',
    locMadinahAirport: 'Aeropuerto de Medina',
    locMadinah: 'Medina',
    locTaif: 'Taif',
    locRiyadh: 'Riad',
    trustTaxesTitle: 'Impuestos y peajes incluidos',
    trustCancelTitle: 'Cancelación gratuita y flexible',
    trustChildTitle: 'Sillas infantiles de cortesía',
    trustFlightTitle: 'Seguimiento de vuelos en directo',
    trust24Title: 'Conserjería 24/7',
    fleetKicker: 'NUESTRA FLOTA DE LUJO',
    fleetTitle: 'Vehículos diseñados para el confort y la serenidad',
    fleetSubtitle: 'Flota moderna cuidada bajo estrictos estándares hoteleros de cinco estrellas.',
    fleetViewAll: 'Ver toda la flota',
    passengersWord: 'Pasajeros',
    bagsWord: 'Maletas',
    bookThisVehicle: 'Reservar esta clase',
    routesKicker: 'RUTAS PRINCIPALES',
    routesTitle: 'Tarifas fijas y transparentes en todo el Reino',
    routesSubtitle: 'Traslados privados que conectan aeropuertos, hoteles y lugares sagrados.',
    routesViewAll: 'Ver todas las rutas y tarifas',
    fromPricePrefix: 'Desde',
    routeJeddahMakkah: 'Aeropuerto Yeda ↔ La Meca',
    routeMadinahAirport: 'Aeropuerto Medina ↔ Hoteles',
    routeRiyadhMakkah: 'Riad ↔ La Meca',
    routeMakkahMadinah: 'La Meca ↔ Medina',
    conciergeKicker: 'CONSERJERÍA REAL',
    conciergeTitle: 'Maybach y Hyundai H1 para delegaciones VIP',
    conciergeSubtitle: 'Atención exclusiva para huéspedes diplomáticos y personalidades a través de WhatsApp.',
    conciergeCta: 'Contactar a la Conserjería Real',
    pillarsKicker: 'EXCELENCIA EN HOSPITALIDAD',
    pillarsTitle: '¿Por qué nos eligen los peregrinos distinguidos?',
    pillarsSubtitle: 'Combinamos experiencia en carreteras con la calidez de la hospitalidad saudí.',
    pillar1Title: 'Recepción personalizada en el aeropuerto',
    pillar1Desc: 'Bienvenida en la terminal con cartel con su nombre y ayuda con su equipaje.',
    pillar2Title: 'Chóferes certificados y vehículos modernos',
    pillar2Desc: 'Vehículos impecables y conductores conocedores de los accesos a los Santos Lugares.',
    pillar3Title: 'Pago 100% en efectivo al llegar',
    pillar3Desc: 'Sin tarjetas ni pagos anticipados. Pague al chófer en efectivo al llegar con total seguridad.',
    reviewsKicker: 'TESTIMONIOS',
    reviewsTitle: 'Opiniones de nuestros estimados huéspedes',
    reviewsSubtitle: 'Experiencias de familias y peregrinos con Duyuf Alrahman VIP.',
    rev1Name: 'Mohamed Al-Otaibi',
    rev1Tag: 'Peregrino, Riad',
    rev1Text: 'El mejor servicio en Arabia Saudita. Puntualidad impecable y la comodidad de pagar a la llegada.',
    rev2Name: 'Sarah Al-Otaibi',
    rev2Tag: 'Viaje familiar',
    rev2Text: 'Experiencia de cinco estrellas. Vehículo muy espacioso para toda la familia.',
    rev3Name: 'Ahmed Mohamed',
    rev3Tag: 'Peregrino, EAU',
    rev3Text: 'Servicio de conserjería impecable desde el primer contacto.',
    finalCtaTitle: 'Reserve su viaje privado hoy y disfrute de una hospitalidad real',
    finalCtaButton: 'Comenzar reserva ahora',
  },
  de: {
    announcement: 'VIP-Chauffeurservice in ganz Saudi-Arabien',
    heroBadge: 'DUYUF ALRAHMAN VIP • KÖNIGLICHER CHAUFFEUR',
    heroHeadlineMain: 'Ihre Reise in Saudi-Arabien..',
    heroHeadlineHighlight: 'Mit königlicher Eleganz',
    heroSubtitle: 'Exklusiver privater Chauffeurservice für höchste Ansprüche, von der Ankunft bis zu Ihrem Hotel.',
    pickupLabel: 'Von wo?',
    pickupPlaceholder: 'Abholort wählen',
    dropoffLabel: 'Wohin?',
    dropoffPlaceholder: 'Zielort wählen',
    dateLabel: 'Reisedatum',
    passengersLabel: 'Passagiere',
    bookingSubmit: 'Flotte & Tarife ansehen',
    bookingGuaranteedCash: 'Barzahlung an den Fahrer nach sicherer Ankunft • Steuern & Maut inklusive • Keine Vorauszahlung',
    errorSelectFields: 'Bitte wählen Sie Abholort, Ziel und Datum aus.',
    errorSameLocation: 'Bitte wählen Sie zwei verschiedene Orte aus.',
    locJeddahAirport: 'Flughafen Dschidda (KAIA)',
    locMakkah: 'Mekka',
    locMadinahAirport: 'Flughafen Medina',
    locMadinah: 'Medina',
    locTaif: 'Taif',
    locRiyadh: 'Riad',
    trustTaxesTitle: 'Steuern & Maut inklusive',
    trustCancelTitle: 'Kostenlose Stornierung',
    trustChildTitle: 'Kostenlose Kindersitze',
    trustFlightTitle: 'Live-Flugverfolgung',
    trust24Title: '24/7 persönlicher Concierge',
    fleetKicker: 'UNSERE PREMIUM-FLOTTE',
    fleetTitle: 'Erlesene Fahrzeuge für höchste Ruhe und Komfort',
    fleetSubtitle: 'Modernste Fahrzeugmodelle nach 5-Sterne-Hotelstandards gepflegt.',
    fleetViewAll: 'Gesamte Flotte ansehen',
    passengersWord: 'Gäste',
    bagsWord: 'Koffer',
    bookThisVehicle: 'Diese Klasse buchen',
    routesKicker: 'BELIEBTESTE ROUTEN',
    routesTitle: 'Feste & garantierte Preise im gesamten Königreich',
    routesSubtitle: 'Transparente Transferpreise zwischen Flughäfen, Hotels und heiligen Stätten.',
    routesViewAll: 'Alle Routen & Preise ansehen',
    fromPricePrefix: 'Ab',
    routeJeddahMakkah: 'Flughafen Dschidda ↔ Mekka',
    routeMadinahAirport: 'Flughafen Medina ↔ Hotels',
    routeRiyadhMakkah: 'Riad ↔ Mekka',
    routeMakkahMadinah: 'Mekka ↔ Medina',
    conciergeKicker: 'KÖNIGLICHER CONCIERGE-SERVICE',
    conciergeTitle: 'Maybach & Hyundai H1 für VIP-Gäste',
    conciergeSubtitle: 'Exklusiv für Diplomaten und anspruchsvolle Gäste über WhatsApp buchbar.',
    conciergeCta: 'Königlichen Concierge über WhatsApp kontaktieren',
    pillarsKicker: 'GASTFREUNDSCHAFT AUF HÖCHSTEM NIVEAU',
    pillarsTitle: 'Warum Gäste unseren Fahrservice wählen',
    pillarsSubtitle: 'Tiefe Streckenkenntnis kombiniert mit traditioneller saudi-arabischer Gastfreundschaft.',
    pillar1Title: 'Persönlicher Empfang am Flughafen',
    pillar1Desc: 'Empfang am Terminal mit persönlichem Namensschild und Gepäckservice.',
    pillar2Title: 'Zertifizierte Chauffeure & neue Fahrzeuge',
    pillar2Desc: 'Makellose Fahrzeuge mit Chauffeuren, die alle Zufahrten zu den Heiligen Stätten kennen.',
    pillar3Title: '100% Barzahlung bei Ankunft',
    pillar3Desc: 'Keine Kreditkartenvorauszahlung. Zahlen Sie bar beim Fahrer nach sicherer Ankunft.',
    reviewsKicker: 'GÄSTEBEWERTUNGEN',
    reviewsTitle: 'Rückmeldungen unserer geschätzten Gäste',
    reviewsSubtitle: 'Erfahrungsberichte von Pilgern und Familien mit Duyuf Alrahman VIP.',
    rev1Name: 'Mohamed Al-Otaibi',
    rev1Tag: 'Pilger, Riad',
    rev1Text: 'Der beste Fahrdienst in Saudi-Arabien. Perfekte Pünktlichkeit und beruhigende Barzahlung vor Ort.',
    rev2Name: 'Sarah Al-Otaibi',
    rev2Tag: 'Familienreise',
    rev2Text: 'Ein 5-Sterne-Erlebnis. Das Fahrzeug war sehr geräumig und komfortabel für die Familie.',
    rev3Name: 'Ahmed Mohamed',
    rev3Tag: 'Pilger, VAE',
    rev3Text: 'Hervorragender Concierge-Service von Anfang bis Ende.',
    finalCtaTitle: 'Buchen Sie Ihre private Fahrt jetzt & erleben Sie königliche Gastfreundschaft',
    finalCtaButton: 'Jetzt Buchung starten',
  },
  tr: {
    announcement: 'Suudi Arabistan genelinde VIP özel şoför hizmeti',
    heroBadge: 'DUYUF ALRAHMAN VIP • KRALİYET AYRICALIĞI',
    heroHeadlineMain: 'Suudi Arabistan’da Yolculuğunuz..',
    heroHeadlineHighlight: 'Kraliyet Zarafetiyle',
    heroSubtitle: 'Havalimanından otelinize kadar tam bir huzur ve konfor için tasarlanmış VIP özel şoför deneyimi.',
    pickupLabel: 'Nereden?',
    pickupPlaceholder: 'Kalkış noktası seçin',
    dropoffLabel: 'Nereye?',
    dropoffPlaceholder: 'Varış noktası seçin',
    dateLabel: 'Yolculuk Tarihi',
    passengersLabel: 'Yolcu Sayısı',
    bookingSubmit: 'Filoyu ve Fiyatları Gör',
    bookingGuaranteedCash: 'Güvenli Varış Sonrası Şoföre Nakit Ödeme • Tüm Vergiler Dahil • Ön Ödeme Yok',
    errorSelectFields: 'Lütfen kalkış, varış noktası ve tarihi seçin.',
    errorSameLocation: 'Lütfen iki farklı konum seçin.',
    locJeddahAirport: 'Cidde Havalimanı (KAIA)',
    locMakkah: 'Mekke-i Mükerreme',
    locMadinahAirport: 'Medine Havalimanı',
    locMadinah: 'Medine-i Münevvere',
    locTaif: 'Taif',
    locRiyadh: 'Riyad',
    trustTaxesTitle: 'Tüm Vergiler Dahil',
    trustCancelTitle: 'Ücretsiz ve Esnek İptal',
    trustChildTitle: 'Ücretsiz Çocuk Koltuğu',
    trustFlightTitle: 'Canlı Uçuş Takibi',
    trust24Title: '7/24 Özel Konsiyerj',
    fleetKicker: 'LÜKS FİLOMUZ',
    fleetTitle: 'Huzur ve Rahatlık İçin Tasarlanmış Araçlar',
    fleetSubtitle: '5 yıldızlı otel standartlarında bakımı yapılan en yeni model lüks araçlar.',
    fleetViewAll: 'Tüm Filoyu İncele',
    passengersWord: 'Yolcu',
    bagsWord: 'Bagaj',
    bookThisVehicle: 'Bu Sınıfı Ayırt',
    routesKicker: 'HAC VE UMRE GÜZERGAHLARI',
    routesTitle: 'Sabit ve Şeffaf Krallık Genelinde Fiyatlar',
    routesSubtitle: 'Havalimanları, oteller ve kutsal mekanlar arasında sürprizsiz transferler.',
    routesViewAll: 'Tüm Güzergahları ve Fiyatları Gör',
    fromPricePrefix: '’den başlayan',
    routeJeddahMakkah: 'Cidde Havalimanı ↔ Mekke',
    routeMadinahAirport: 'Medine Havalimanı ↔ Oteller',
    routeRiyadhMakkah: 'Riyad ↔ Mekke',
    routeMakkahMadinah: 'Mekke ↔ Medine',
    conciergeKicker: 'KRALİYET KONSİYERJ HİZMETİ',
    conciergeTitle: 'Maybach ve Hyundai H1 ile VIP Hizmet',
    conciergeSubtitle: 'Diplomatik ve seçkin misafirler için doğrudan WhatsApp üzerinden özel planlama.',
    conciergeCta: 'WhatsApp Üzerinden İletişime Geçin',
    pillarsKicker: 'MİSAFİRPERVERLİK STANDARTLARI',
    pillarsTitle: 'Misafirlerimiz Neden Bizi Tercih Ediyor?',
    pillarsSubtitle: 'Yol tecrübesi ile geleneksel Suudi misafirperverliğinin mükemmel birleşimi.',
    pillar1Title: 'Havalimanında İsimle Karşılama',
    pillar1Desc: 'Terminal kapısında özel isim tabelası ile karşılama ve bagaj yardımı.',
    pillar2Title: 'Sertifikalı Şoförler ve Yeni Araçlar',
    pillar2Desc: 'Harem girişlerine hakim şoförler eşliğinde hijyenik ve bakımlı araçlar.',
    pillar3Title: 'Varışta %100 Nakit Ödeme',
    pillar3Desc: 'Kartla ön ödeme yok. Otelinize ulaştıktan sonra şoföre nakit ödeme rahatlığı.',
    reviewsKicker: 'MİSAFİR DEĞERLENDİRMELERİ',
    reviewsTitle: 'Misafirlerimizin Samimi Görüşleri',
    reviewsSubtitle: 'Duyuf Alrahman VIP ile seyahat eden misafirlerimizin deneyimleri.',
    rev1Name: 'Mohamed Al-Otaibi',
    rev1Tag: 'Hacı, Riyad',
    rev1Text: 'Suudi Arabistan’daki en iyi transfer hizmeti. Varışta nakit ödeme büyük bir güven veriyor.',
    rev2Name: 'Sarah Al-Otaibi',
    rev2Tag: 'Aile Seyahati',
    rev2Text: '5 yıldızlı bir deneyim. Araç ailemiz için çok geniş ve rahattı.',
    rev3Name: 'Ahmed Mohamed',
    rev3Tag: 'Hacı, BAE',
    rev3Text: 'Rezervasyondan otele kadar kusursuz bir konsiyerj hizmeti aldık.',
    finalCtaTitle: 'Yolculuğunuzu Hemen Ayırtın, Kraliyet Misafirperverliğini Yaşayın',
    finalCtaButton: 'Rezervasyona Başla',
  },
  hi: {
    announcement: 'सऊदी अरब में तीर्थयात्रियों और परिवारों के लिए वीआईपी निजी कार सेवा',
    heroBadge: 'DUYUF ALRAHMAN VIP • शाही आतिथ्य',
    heroHeadlineMain: 'सऊदी अरब में आपकी यात्रा..',
    heroHeadlineHighlight: 'शाही गरिमा और आराम के साथ',
    heroSubtitle: 'हवाई अड्डे से आपके होटल तक पूर्ण शांति और सुविधा के लिए तैयार की गई विशेष निजी परिवहन सेवा।',
    pickupLabel: 'कहाँ से?',
    pickupPlaceholder: 'प्रस्थान स्थल चुनें',
    dropoffLabel: 'कहाँ तक?',
    dropoffPlaceholder: 'गंतव्य चुनें',
    dateLabel: 'यात्रा की तिथि',
    passengersLabel: 'यात्रियों की संख्या',
    bookingSubmit: 'बेड़ा और किराए देखें',
    bookingGuaranteedCash: 'पहुंचने पर चालक को नकद भुगतान • सभी कर और टोल शामिल • कोई अग्रिम भुगतान नहीं',
    errorSelectFields: 'कृपया प्रस्थान, गंतव्य और तिथि का चयन करें।',
    errorSameLocation: 'कृपया दो अलग-अलग स्थान चुनें।',
    locJeddahAirport: 'जेद्दा हवाई अड्डा (KAIA)',
    locMakkah: 'मक्का अल-मुकर्रमा',
    locMadinahAirport: 'मदीना हवाई अड्डा',
    locMadinah: 'मदीना अल-मुनव्वरा',
    locTaif: 'ताइफ़',
    locRiyadh: 'रियाद',
    trustTaxesTitle: 'सभी कर और टोल शुल्क शामिल',
    trustCancelTitle: 'निःशुल्क और लचीला रद्दीकरण',
    trustChildTitle: 'अनुरोध पर निःशुल्क बाल सीटें',
    trustFlightTitle: 'उड़ानों की लाइव ट्रैकिंग',
    trust24Title: '24/7 समर्पित कॉन्सीयर्ज',
    fleetKicker: 'हमारा शानदार बेड़ा',
    fleetTitle: 'आराम और शांति के लिए विशेष वाहन',
    fleetSubtitle: '5-सितारा होटल मानकों के अनुसार सुसज्जित नए मॉडल के लक्जरी वाहन।',
    fleetViewAll: 'सभी वाहन देखें',
    passengersWord: 'यात्री',
    bagsWord: 'बैग',
    bookThisVehicle: 'यह वाहन बुक करें',
    routesKicker: 'प्रमुख तीर्थ मार्ग',
    routesTitle: 'निश्चित और पारदर्शी किराए',
    routesSubtitle: 'हवाई अड्डों, होटलों और पवित्र स्थलों के बीच निजी यात्राएं बिना किसी छिपे शुल्क के।',
    routesViewAll: 'सभी मार्ग और किराए देखें',
    fromPricePrefix: 'प्रारंभिक',
    routeJeddahMakkah: 'जेद्दा हवाई अड्डा ↔ मक्का',
    routeMadinahAirport: 'मदीना हवाई अड्डा ↔ होटल',
    routeRiyadhMakkah: 'रियाद ↔ मक्का',
    routeMakkahMadinah: 'मक्का ↔ मदीना',
    conciergeKicker: 'शाही कॉन्सीयर्ज सेवा',
    conciergeTitle: 'मेबैक और हुंडई H1 विशिष्ट अतिथियों के लिए',
    conciergeSubtitle: 'राजनयिक और वीआईपी अतिथियों के लिए व्हाट्सएप पर सीधे संपर्क द्वारा विशेष सेवा।',
    conciergeCta: 'व्हाट्सएप पर कॉन्सीयर्ज से संपर्क करें',
    pillarsKicker: 'आतिथ्य उत्कृष्टता',
    pillarsTitle: 'तीर्थयात्री हमारी सेवा क्यों चुनते हैं?',
    pillarsSubtitle: 'राजमार्गों का गहन अनुभव और पारंपरिक सऊदी आतिथ्य सत्कार।',
    pillar1Title: 'हवाई अड्डे पर नाम से स्वागत',
    pillar1Desc: 'आगमन लाउंज में नाम पट्टिका के साथ व्यक्तिगत स्वागत और सामान में सहायता।',
    pillar2Title: 'प्रमाणित चालक और नए वाहन',
    pillar2Desc: 'पवित्र स्थलों के सभी रास्तों से भली-भांति परिचित चालकों के साथ स्वच्छ वाहन।',
    pillar3Title: '100% पहुंचने पर नकद भुगतान',
    pillar3Desc: 'कार्ड से कोई अग्रिम भुगतान नहीं। सुरक्षित पहुंचने के बाद चालक को नकद भुगतान करें।',
    reviewsKicker: 'अतिथियों की प्रतिक्रियाएं',
    reviewsTitle: 'हमारे सम्मानित अतिथियों के विचार',
    reviewsSubtitle: 'Duyuf Alrahman VIP के साथ यात्रा करने वाले अतिथियों के वास्तविक अनुभव।',
    rev1Name: 'Mohamed Al-Otaibi',
    rev1Tag: 'तीर्थयात्री, रियाद',
    rev1Text: 'सऊदी अरब में सबसे बेहतरीन सेवा। समय पर चालक की उपस्थिति और पहुंचने पर नकद भुगतान बहुत भरोसेमंद है।',
    rev2Name: 'Sarah Al-Otaibi',
    rev2Tag: 'पारिवारिक यात्रा',
    rev2Text: '5-सितारा अनुभव। परिवार के लिए वाहन अत्यंत विशाल और आरामदायक था।',
    rev3Name: 'Ahmed Mohamed',
    rev3Tag: 'तीर्थयात्री, यूएई',
    rev3Text: 'बुकिंग से लेकर मक्का पहुंचने तक सब कुछ अत्यंत पेशेवर और सुखद रहा।',
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

  // Fleet Showroom State: 0: Yukon, 1: Staria, 2: Camry, 3: HiAce, 4: Coaster
  const [activeFleetIndex, setActiveFleetIndex] = useState(0);

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

  const fleetData = [
    {
      id: 'gmc-yukon-xl',
      name: 'GMC Yukon XL',
      arCategory: 'SUV فاخرة • فئة الدرجة الأولى',
      enCategory: 'Flagship Luxury SUV',
      image: '/assets/images/cinematic/fleet/yukon-dark-studio.jpg',
      pax: 7,
      bags: 8,
      arHighlight: 'هيبة الطريق وثبات لا مثيل له مع مقصورة رحبة جداً تتسع لكافة حقائب العائلة.',
      enHighlight: 'Supreme road presence and whisper-quiet serenity with extensive luggage capacity.',
    },
    {
      id: 'hyundai-staria',
      name: 'Hyundai Staria VIP',
      arCategory: 'مركبة عائلية فاخرة • مقاعد كابتن',
      enCategory: 'VIP Executive Van',
      image: '/assets/images/cinematic/fleet/staria-dark-studio.jpg',
      pax: 7,
      bags: 6,
      arHighlight: 'مقصورة طيران خاصة بمقاعد استرخاء مريحة لرحلات العائلات المعتمرة وكبار السن.',
      enHighlight: 'Private aircraft-inspired cabin with captain seating ideal for pilgrimage families.',
    },
    {
      id: 'toyota-camry',
      name: 'Toyota Camry Executive',
      arCategory: 'سيدان تنفيذية • رحلات فردية وثنائية',
      enCategory: 'Executive Sedan',
      image: '/assets/images/cinematic/fleet/camry-dark-studio.jpg',
      pax: 4,
      bags: 3,
      arHighlight: 'هدوء وانسيابية وسرعة للتنقل بين المطارات والفنادق لرجال الأعمال والمعتمرين.',
      enHighlight: 'Effortless composure and efficiency for business travelers and couples.',
    },
    {
      id: 'toyota-hiace',
      name: 'Toyota HiAce Executive',
      arCategory: 'فان وفود ومجموعات عائلية واسعة',
      enCategory: 'Spacious Group Minivan',
      image: '/assets/images/cinematic/fleet/hiace-dark-studio.jpg',
      pax: 10,
      bags: 10,
      arHighlight: 'رحابة عملية استثنائية للعائلات الكبيرة مع سعة حقائب ضخمة لجميع الأمتعة وماء زمزم.',
      enHighlight: 'Spacious group comfort accommodating extended families with generous luggage space.',
    },
    {
      id: 'toyota-coaster',
      name: 'Toyota Coaster VIP',
      arCategory: 'حافلة ضيافة ملكية للوفود الكبيرة',
      enCategory: 'VIP Hospitality Coach',
      image: '/assets/images/cinematic/fleet/coaster-dark-studio.jpg',
      pax: 21,
      bags: 20,
      arHighlight: 'الحل الأمثل لوفود العمرة والمجموعات الدبلوماسية مع مقاعد رحبة وتكييف عالي الكفاءة.',
      enHighlight: 'The quintessential delegation transport featuring executive seating and powerful climate control.',
    },
  ];

  const currentVehicle = fleetData[activeFleetIndex];

  return (
    <div className="royal-cinematic-page" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* ─────────────────────────────────────────────────────────────
          SECTION 01: IMMERSIVE CINEMATIC TWILIGHT HERO
      ────────────────────────────────────────────────────────────── */}
      <section className="rc-hero" id="top">
        <div className="rc-hero-bg-wrap">
          <Image
            src="/assets/images/cinematic/home/hero-kaaba-twilight-desktop.jpg"
            alt="Duyuf Alrahman VIP Chauffeur Kaaba Makkah"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-[1.01]"
          />
          <div className="rc-hero-vignette" />
        </div>

        <div className="rc-container rc-hero-body">
          <div className="rc-hero-text">
            <div className="rc-gold-badge">
              <span className="rc-gem-line" />
              <span>{t.heroBadge}</span>
              <span className="rc-gem-line" />
            </div>

            <h1 className="rc-hero-h1">
              <span>{t.heroHeadlineMain}</span>
              <span className="rc-h1-gold">{t.heroHeadlineHighlight}</span>
            </h1>

            <p className="rc-hero-sub">
              {t.heroSubtitle}
            </p>
          </div>

          {/* FLOATING ARCHITECTURAL RESERVATION CONSOLE */}
          <div className="rc-reservation-dock" id="booking">
            <form onSubmit={handleBookingSubmit} className="rc-dock-form">
              <div className="rc-dock-grid">
                {/* 01: Pickup */}
                <div className="rc-dock-cell">
                  <label htmlFor="rc-pickup" className="rc-cell-tag">
                    <MapPin className="w-3.5 h-3.5 text-[#D6A13A]" />
                    <span>{t.pickupLabel}</span>
                  </label>
                  <select
                    id="rc-pickup"
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

                {/* 02: Dropoff */}
                <div className="rc-dock-cell">
                  <label htmlFor="rc-dropoff" className="rc-cell-tag">
                    <MapPin className="w-3.5 h-3.5 text-[#D6A13A]" />
                    <span>{t.dropoffLabel}</span>
                  </label>
                  <select
                    id="rc-dropoff"
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

                {/* 03: Date */}
                <div className="rc-dock-cell">
                  <label htmlFor="rc-date" className="rc-cell-tag">
                    <Calendar className="w-3.5 h-3.5 text-[#D6A13A]" />
                    <span>{t.dateLabel}</span>
                  </label>
                  <input
                    type="date"
                    id="rc-date"
                    min={todayStr}
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    required
                  />
                </div>

                {/* 04: Passengers */}
                <div className="rc-dock-cell">
                  <label htmlFor="rc-pax" className="rc-cell-tag">
                    <Users className="w-3.5 h-3.5 text-[#D6A13A]" />
                    <span>{t.passengersLabel}</span>
                  </label>
                  <select
                    id="rc-pax"
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                  >
                    <option value="1">1 {t.passengersWord}</option>
                    <option value="2">2 {t.passengersWord}</option>
                    <option value="3">3 {t.passengersWord}</option>
                    <option value="4">4 {t.passengersWord}</option>
                    <option value="5">5 {t.passengersWord}</option>
                    <option value="6">6 {t.passengersWord}</option>
                    <option value="7">7 {t.passengersWord}</option>
                    <option value="8">8 {t.passengersWord}</option>
                    <option value="10">10 {t.passengersWord}</option>
                    <option value="14">14 {t.passengersWord}</option>
                    <option value="21">21 {t.passengersWord}</option>
                  </select>
                </div>

                {/* Submit Action */}
                <div className="rc-dock-action">
                  <button type="submit" className="rc-btn-gold">
                    <Search className="w-4 h-4" />
                    <span>{t.bookingSubmit}</span>
                  </button>
                </div>
              </div>

              {/* Guarantees bar underneath dock */}
              <div className="rc-dock-guarantee">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D6A13A] shrink-0" />
                <span>{t.bookingGuaranteedCash}</span>
              </div>

              {feedback && (
                <p className="rc-feedback-alert" role="alert">
                  {feedback}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 02: THE ROYAL STANDARDS (5 PILLARS ROW)
      ────────────────────────────────────────────────────────────── */}
      <section className="rc-standards-strip" id="standards">
        <div className="rc-container rc-standards-grid">
          <div className="rc-standard-item">
            <Car className="w-5 h-5 text-[#D6A13A]" />
            <span className="rc-standard-text">{t.trustTaxesTitle}</span>
          </div>

          <div className="rc-standard-item">
            <ShieldCheck className="w-5 h-5 text-[#D6A13A]" />
            <span className="rc-standard-text">{t.trustCancelTitle}</span>
          </div>

          <div className="rc-standard-item">
            <Baby className="w-5 h-5 text-[#D6A13A]" />
            <span className="rc-standard-text">{t.trustChildTitle}</span>
          </div>

          <div className="rc-standard-item">
            <Plane className="w-5 h-5 text-[#D6A13A]" />
            <span className="rc-standard-text">{t.trustFlightTitle}</span>
          </div>

          <div className="rc-standard-item">
            <Clock className="w-5 h-5 text-[#D6A13A]" />
            <span className="rc-standard-text">{t.trust24Title}</span>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 03: THE FLEET SHOWROOM (AUTOMOTIVE CONFIGURATOR)
      ────────────────────────────────────────────────────────────── */}
      <section className="rc-fleet-showroom" id="fleet">
        <div className="rc-container">
          {/* Section Header */}
          <div className="rc-section-header rc-center">
            <span className="rc-kicker">{t.fleetKicker}</span>
            <h2 className="rc-h2-light">{t.fleetTitle}</h2>
            <p className="rc-p-light">{t.fleetSubtitle}</p>
          </div>

          {/* Configurator Navigation Tabs */}
          <div className="rc-fleet-tabs">
            {fleetData.map((v, idx) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setActiveFleetIndex(idx)}
                className={\`rc-fleet-tab-btn \${activeFleetIndex === idx ? 'rc-tab-active' : ''}\`}
              >
                <span>{v.name}</span>
              </button>
            ))}
          </div>

          {/* Active Featured Vehicle Display Stage */}
          <div className="rc-showroom-stage">
            <div className="rc-stage-grid">
              {/* Vehicle Image with Reflective Floor */}
              <div className="rc-stage-visual">
                <Image
                  src={currentVehicle.image}
                  alt={currentVehicle.name}
                  width={680}
                  height={380}
                  priority
                  className="rc-stage-img"
                />
              </div>

              {/* Vehicle Specifications & Dossier */}
              <div className="rc-stage-dossier">
                <span className="rc-stage-category">
                  {isAr ? currentVehicle.arCategory : currentVehicle.enCategory}
                </span>
                <h3 className="rc-stage-title">{currentVehicle.name}</h3>
                <p className="rc-stage-desc">
                  {isAr ? currentVehicle.arHighlight : currentVehicle.enHighlight}
                </p>

                {/* Capacity Badges */}
                <div className="rc-capacity-row">
                  <div className="rc-cap-box">
                    <Users className="w-4 h-4 text-[#D6A13A]" />
                    <div>
                      <strong>{currentVehicle.pax}</strong>
                      <small>{t.passengersWord}</small>
                    </div>
                  </div>

                  <div className="rc-cap-box">
                    <Car className="w-4 h-4 text-[#D6A13A]" />
                    <div>
                      <strong>{currentVehicle.bags}</strong>
                      <small>{t.bagsWord}</small>
                    </div>
                  </div>

                  <div className="rc-cap-box">
                    <Sparkles className="w-4 h-4 text-[#D6A13A]" />
                    <div>
                      <strong>VIP</strong>
                      <small>{isAr ? 'ضيافة فندقية' : 'Chauffeur'}</small>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="rc-stage-actions">
                  <Link
                    href={\`/\${locale}/booking?vehicle=\${currentVehicle.id}\`}
                    className="rc-btn-gold rc-btn-lg"
                  >
                    <span>{t.bookThisVehicle}</span>
                    <span>{isRtl ? '←' : '→'}</span>
                  </Link>
                  <Link
                    href={\`/\${locale}/fleet\`}
                    className="rc-btn-outline"
                  >
                    <span>{t.fleetViewAll}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Quick-Switch Thumbnails Row */}
          <div className="rc-fleet-mini-grid">
            {fleetData.map((v, idx) => (
              <div
                key={v.id}
                onClick={() => setActiveFleetIndex(idx)}
                className={\`rc-mini-card \${activeFleetIndex === idx ? 'rc-mini-active' : ''}\`}
              >
                <div className="rc-mini-img-wrap">
                  <Image
                    src={v.image}
                    alt={v.name}
                    width={220}
                    height={120}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="rc-mini-meta">
                  <h4>{v.name}</h4>
                  <span>👤 {v.pax} | 💼 {v.bags}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 04: PILGRIMAGE CORRIDORS (WARM SANDSTONE BAND)
      ────────────────────────────────────────────────────────────── */}
      <section className="rc-corridors-section" id="routes">
        <div className="rc-container">
          <div className="rc-section-header rc-center">
            <span className="rc-kicker rc-kicker-dark">{t.routesKicker}</span>
            <h2 className="rc-h2-dark">{t.routesTitle}</h2>
            <p className="rc-p-dark">{t.routesSubtitle}</p>
          </div>

          <div className="rc-corridors-grid">
            {/* Corridor 01: Jeddah Airport to Makkah */}
            <Link
              href={\`/\${locale}/booking?route=jeddah-airport-to-makkah\`}
              className="rc-corridor-card"
            >
              <div className="rc-card-visual">
                <Image
                  src="/assets/images/routes/jeddah-airport-to-makkah.jpg"
                  alt="Jeddah to Makkah"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover"
                />
                <div className="rc-card-overlay" />
                <span className="rc-time-tag">60-75 min</span>
              </div>
              <div className="rc-card-details">
                <h3>{t.routeJeddahMakkah}</h3>
                <div className="rc-card-fare">
                  <small>{t.fromPricePrefix}</small>
                  <strong>{formatPrice(200)}</strong>
                </div>
              </div>
            </Link>

            {/* Corridor 02: Makkah to Madinah */}
            <Link
              href={\`/\${locale}/booking?route=makkah-to-madinah\`}
              className="rc-corridor-card"
            >
              <div className="rc-card-visual">
                <Image
                  src="/assets/images/routes/makkah-to-madinah.jpg"
                  alt="Makkah to Madinah"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover"
                />
                <div className="rc-card-overlay" />
                <span className="rc-time-tag">4-5 hrs</span>
              </div>
              <div className="rc-card-details">
                <h3>{t.routeMakkahMadinah}</h3>
                <div className="rc-card-fare">
                  <small>{t.fromPricePrefix}</small>
                  <strong>{formatPrice(400)}</strong>
                </div>
              </div>
            </Link>

            {/* Corridor 03: Madinah Airport to Hotels */}
            <Link
              href={\`/\${locale}/booking?route=madinah-airport-to-madinah\`}
              className="rc-corridor-card"
            >
              <div className="rc-card-visual">
                <Image
                  src="/assets/images/routes/madinah-airport.jpg"
                  alt="Madinah Airport"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover"
                />
                <div className="rc-card-overlay" />
                <span className="rc-time-tag">30-40 min</span>
              </div>
              <div className="rc-card-details">
                <h3>{t.routeMadinahAirport}</h3>
                <div className="rc-card-fare">
                  <small>{t.fromPricePrefix}</small>
                  <strong>{formatPrice(200)}</strong>
                </div>
              </div>
            </Link>

            {/* Corridor 04: Riyadh to Makkah */}
            <Link
              href={\`/\${locale}/booking?route=riyadh-to-makkah\`}
              className="rc-corridor-card"
            >
              <div className="rc-card-visual">
                <Image
                  src="/assets/images/routes/riyadh-to-makkah.jpg"
                  alt="Riyadh to Makkah"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover"
                />
                <div className="rc-card-overlay" />
                <span className="rc-time-tag">Private Journey</span>
              </div>
              <div className="rc-card-details">
                <h3>{t.routeRiyadhMakkah}</h3>
                <div className="rc-card-fare">
                  <small>{t.fromPricePrefix}</small>
                  <strong>{formatPrice(650)}</strong>
                </div>
              </div>
            </Link>
          </div>

          <div className="rc-corridors-footer">
            <Link href={\`/\${locale}/routes\`} className="rc-btn-sandstone">
              <span>{t.routesViewAll}</span>
              <span>{isRtl ? '←' : '→'}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 05: THE ROYAL CONCIERGE BANNER
      ────────────────────────────────────────────────────────────── */}
      <section className="rc-concierge-section" id="concierge">
        <div className="rc-container">
          <div className="rc-concierge-architectural-card">
            <Image
              src="/assets/images/cinematic/home/concierge-maybach-executive.jpg"
              alt="Mercedes Maybach VIP Chauffeur"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="rc-concierge-glass-overlay" />
            <div className="rc-concierge-copy">
              <span className="rc-kicker rc-kicker-gold">{t.conciergeKicker}</span>
              <h2>{t.conciergeTitle}</h2>
              <p>{t.conciergeSubtitle}</p>
              <a
                href="https://wa.me/966567588261"
                target="_blank"
                rel="noopener noreferrer"
                className="rc-btn-whatsapp"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{t.conciergeCta}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 06: PILLARS OF SAUDI HOSPITALITY (SANDSTONE)
      ────────────────────────────────────────────────────────────── */}
      <section className="rc-pillars-section">
        <div className="rc-container">
          <div className="rc-section-header rc-center">
            <span className="rc-kicker rc-kicker-dark">{t.pillarsKicker}</span>
            <h2 className="rc-h2-dark">{t.pillarsTitle}</h2>
            <p className="rc-p-dark">{t.pillarsSubtitle}</p>
          </div>

          <div className="rc-pillars-grid">
            <div className="rc-pillar-card">
              <span className="rc-pillar-num">01</span>
              <h3>{t.pillar1Title}</h3>
              <p>{t.pillar1Desc}</p>
            </div>

            <div className="rc-pillar-card">
              <span className="rc-pillar-num">02</span>
              <h3>{t.pillar2Title}</h3>
              <p>{t.pillar2Desc}</p>
            </div>

            <div className="rc-pillar-card">
              <span className="rc-pillar-num">03</span>
              <h3>{t.pillar3Title}</h3>
              <p>{t.pillar3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 07: VERIFIED PILGRIM TESTIMONIALS
      ────────────────────────────────────────────────────────────── */}
      <section className="rc-testimonials-section" id="reviews">
        <div className="rc-container">
          <div className="rc-section-header rc-center">
            <span className="rc-kicker rc-kicker-dark">{t.reviewsKicker}</span>
            <h2 className="rc-h2-dark">{t.reviewsTitle}</h2>
            <p className="rc-p-dark">{t.reviewsSubtitle}</p>
          </div>

          <div className="rc-testimonials-grid">
            {/* Review 01 */}
            <div className="rc-testimonial-card">
              <span className="rc-quote-mark">“</span>
              <p className="rc-testimonial-quote">{t.rev1Text}</p>
              <div className="rc-author-row">
                <Image
                  src="/assets/images/reviews/reviewer-mohamed.jpg"
                  alt={t.rev1Name}
                  width={52}
                  height={52}
                  className="rc-author-avatar"
                />
                <div>
                  <strong>{t.rev1Name}</strong>
                  <small>{t.rev1Tag}</small>
                </div>
              </div>
            </div>

            {/* Review 02 */}
            <div className="rc-testimonial-card">
              <span className="rc-quote-mark">“</span>
              <p className="rc-testimonial-quote">{t.rev2Text}</p>
              <div className="rc-author-row">
                <Image
                  src="/assets/images/reviews/reviewer-sarah.jpg"
                  alt={t.rev2Name}
                  width={52}
                  height={52}
                  className="rc-author-avatar"
                />
                <div>
                  <strong>{t.rev2Name}</strong>
                  <small>{t.rev2Tag}</small>
                </div>
              </div>
            </div>

            {/* Review 03 */}
            <div className="rc-testimonial-card">
              <span className="rc-quote-mark">“</span>
              <p className="rc-testimonial-quote">{t.rev3Text}</p>
              <div className="rc-author-row">
                <Image
                  src="/assets/images/reviews/reviewer-ahmed.jpg"
                  alt={t.rev3Name}
                  width={52}
                  height={52}
                  className="rc-author-avatar"
                />
                <div>
                  <strong>{t.rev3Name}</strong>
                  <small>{t.rev3Tag}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 08: PRE-FOOTER CINEMATIC HORIZON BANNER
      ────────────────────────────────────────────────────────────── */}
      <section className="rc-horizon-banner">
        <Image
          src="/assets/images/cinematic/services/services-suv-highway.jpg"
          alt="Royal Chauffeur Highway"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="rc-horizon-overlay" />
        <div className="rc-container rc-horizon-content">
          <h2>{t.finalCtaTitle}</h2>
          <a href="#booking" className="rc-btn-gold rc-btn-xl">
            <span>{t.finalCtaButton}</span>
            <span>{isRtl ? '←' : '→'}</span>
          </a>
        </div>
      </section>
    </div>
  );
}
`;

fs.writeFileSync('src/components/home/RoyalHomepageExperience.tsx', componentCode, 'utf8');
console.log('Successfully written new RoyalHomepageExperience.tsx');
