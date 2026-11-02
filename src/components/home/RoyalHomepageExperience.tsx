'use client';

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
  ArrowUpRight,
  MessageCircle,
  Sparkles,
} from 'lucide-react';

interface RoyalHomepageExperienceProps {
  locale: Locale;
  dict: Dictionary;
  settings?: SiteSettings;
  vehicles?: any[];
}

// ─────────────────────────────────────────────────────────────────────────────
// 10-LANGUAGE STRINGS FOR HOMEPAGE REFERENCE IMPLEMENTATION
// ─────────────────────────────────────────────────────────────────────────────
interface HomepageStrings {
  announcement: string;
  heroBadge: string;
  heroHeadlineMain: string;
  heroHeadlineHighlight: string;
  heroSubtitle: string;
  heroCtaStart: string;
  heroCtaFleet: string;
  bookingKicker: string;
  bookingTitle: string;
  bookingNote: string;
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
  trustTaxesTitle: string;
  trustTaxesSub: string;
  trustCancelTitle: string;
  trustCancelSub: string;
  trustChildTitle: string;
  trustChildSub: string;
  trustFlightTitle: string;
  trustFlightSub: string;
  trust24Title: string;
  trust24Sub: string;
  fleetKicker: string;
  fleetTitle: string;
  fleetSubtitle: string;
  fleetViewAll: string;
  passengersWord: string;
  bagsWord: string;
  selectVehicleCta: string;
  fleetFootnote: string;
  routesKicker: string;
  routesTitle: string;
  routesSubtitle: string;
  routesViewAll: string;
  fromPricePrefix: string;
  discoverJourney: string;
  tagAirport: string;
  tagIntercity: string;
  conciergeKicker: string;
  conciergeTitle: string;
  conciergeSubtitle: string;
  conciergeCta: string;
  conciergeDisclaimer: string;
  experienceKicker: string;
  experienceTitle: string;
  experienceSubtitle: string;
  exp1Title: string;
  exp1Desc: string;
  exp2Title: string;
  exp2Desc: string;
  exp3Title: string;
  exp3Desc: string;
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
  finalCtaKicker: string;
  finalCtaTitle: string;
  finalCtaSubtitle: string;
  finalCtaButton: string;
}

const HP_STRINGS: Record<Locale, HomepageStrings> = {
  ar: {
    announcement: 'خدمة نقل خاصة لضيوف الرحمن والعائلات في مختلف أنحاء المملكة',
    heroBadge: 'ضيوف الرحمن VIP',
    heroHeadlineMain: 'رحلتك في المملكة..',
    heroHeadlineHighlight: 'برفاهية تليق بك',
    heroSubtitle: 'خدمات نقل خاصة بسيارات فاخرة وسائقين محترفين. تجربة سفر مصممة لراحتك من لحظة الانطلاق حتى الوصول.',
    heroCtaStart: 'ابدأ حجز رحلتك',
    heroCtaFleet: 'اكتشف الأسطول',
    bookingKicker: 'ابدأ رحلتك',
    bookingTitle: 'احجز مشوارك بكل سهولة',
    bookingNote: 'دفع نقدي للسائق بعد الوصول بأمان',
    pickupLabel: 'من أين؟',
    pickupPlaceholder: 'اختر نقطة الانطلاق',
    dropoffLabel: 'إلى أين؟',
    dropoffPlaceholder: 'اختر وجهتك',
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
    trustTaxesTitle: 'شامل الرسوم والضرائب',
    trustTaxesSub: 'وفق شروط المسار المعتمد',
    trustCancelTitle: 'إلغاء مجاني حسب السياسات',
    trustCancelSub: 'مرونة كاملة في خطط السفر',
    trustChildTitle: 'مقاعد أطفال عند الطلب',
    trustChildSub: 'راحة العائلة أولويتنا',
    trustFlightTitle: 'متابعة الرحلات الجوية',
    trustFlightSub: 'متابعة موعد الوصول بدقة',
    trust24Title: 'خدمة على مدار 24/24',
    trust24Sub: 'تنسيق ومساندة متواصلة',
    fleetKicker: 'أسطولنا الفاخر',
    fleetTitle: 'مجموعة متميزة من المركبات',
    fleetSubtitle: 'اختر المركبة التي تناسب عدد ركابك واحتياجات رحلتك.',
    fleetViewAll: 'عرض جميع السيارات',
    passengersWord: 'ركاب',
    bagsWord: 'حقائب',
    selectVehicleCta: 'اختر هذه المركبة',
    fleetFootnote: 'السعات المعروضة معتمدة رسميًا وتخضع لمعايير السلامة والراحة لضيوف الرحمن.',
    routesKicker: 'أكثر المسارات طلباً',
    routesTitle: 'مساراتك… برحلة أكثر راحة',
    routesSubtitle: 'تنقل خاص يربط أهم الوجهات في المملكة بأسعار معتمدة وشفافة.',
    routesViewAll: 'استكشف جميع المسارات',
    fromPricePrefix: 'من',
    discoverJourney: 'اكتشف الرحلة',
    tagAirport: 'استقبال المطار',
    tagIntercity: 'بين المدن',
    conciergeKicker: 'خدمة الكونسيرج الملكي',
    conciergeTitle: 'تجربة استثنائية لعملائنا المميزين',
    conciergeSubtitle: 'سيارات مايباخ وهيونداي H1 للطلبات الخاصة وخدمات كبار الشخصيات.',
    conciergeCta: 'تواصل عبر واتساب',
    conciergeDisclaimer: 'هذه المركبات متاحة بطلب خاص عبر الكونسيرج، وليست ضمن الحجز الفوري.',
    experienceKicker: 'تفاصيل تصنع الفرق',
    experienceTitle: 'من لحظة الاستقبال… حتى الوصول',
    experienceSubtitle: 'ننسق تفاصيل رحلتك بعناية فائقة، لتستمتع بوقت أكثر وقلق أقل.',
    exp1Title: 'تخطيط واضح قبل الانطلاق',
    exp1Desc: 'تفاصيل الرحلة والمسار والسعر تُعرض بوضوح تام دون أي تكاليف خفية.',
    exp2Title: 'تنسيق ومتابعة الرحلة',
    exp2Desc: 'متابعة الرحلات الجوية والتنسيق مع السائق لضمان استقبالك في الموعد.',
    exp3Title: 'دفع مريح بعد الوصول',
    exp3Desc: 'الدفع نقدًا للسائق بعد إتمام الرحلة والوصول إلى وجهتك بسلام، دون دفعة مسبقة.',
    reviewsKicker: 'آراء عملائنا الكرام',
    reviewsTitle: 'ثقتكم هي دافعنا للمزيد',
    reviewsSubtitle: 'تجارب حقيقية لضيوف الرحمن مع خدماتنا الخاصة.',
    rev1Name: 'محمد العتيبي',
    rev1Tag: 'معتمر من الرياض',
    rev1Text: 'أفضل خدمة نقل في المملكة. السائق كان في انتظارنا بالمطار بسيارة نظيفة وراقية، ورحلة مريحة جدًا إلى مكة المكرمة.',
    rev2Name: 'سارة العتيبي',
    rev2Tag: 'رحلة عائلية',
    rev2Text: 'احترافية عالية والتزام دقيق بالمواعيد. تعامل السائق راقٍ وقمة في الأخلاق. شكراً لفريق ضيوف الرحمن.',
    rev3Name: 'أحمد محمد',
    rev3Tag: 'معتمر من الإمارات',
    rev3Text: 'خدمة رائعة وتجربة سفر مريحة بكل تفاصيلها. ميزة الدفع بعد الوصول تمنح راحة بال وثقة كاملة.',
    finalCtaKicker: 'ضيوف الرحمن VIP',
    finalCtaTitle: 'احجز رحلتك الآن واستمتع بتجربة ضيافة ملكية',
    finalCtaSubtitle: 'اختر وجهتك ودعنا نهتم بباقي التفاصيل بعناية واحتراف.',
    finalCtaButton: 'ابدأ الحجز الآن',
  },
  en: {
    announcement: 'Private chauffeur services for pilgrims, families and executive travellers across Saudi Arabia',
    heroBadge: 'DUYUF ALRAHMAN VIP',
    heroHeadlineMain: 'Your journey in Saudi Arabia…',
    heroHeadlineHighlight: 'elevated with distinction',
    heroSubtitle: 'Private chauffeur services with a considered fleet and professional drivers. A refined journey from departure to arrival.',
    heroCtaStart: 'Plan your journey',
    heroCtaFleet: 'Explore the fleet',
    bookingKicker: 'BEGIN YOUR JOURNEY',
    bookingTitle: 'Reserve with confidence',
    bookingNote: 'Cash paid to driver after safe arrival',
    pickupLabel: 'PICK-UP',
    pickupPlaceholder: 'Choose pick-up point',
    dropoffLabel: 'DROP-OFF',
    dropoffPlaceholder: 'Choose destination',
    dateLabel: 'TRAVEL DATE',
    passengersLabel: 'PASSENGERS',
    bookingSubmit: 'View vehicles & fares',
    errorSelectFields: 'Please select a pick-up point, destination and travel date.',
    errorSameLocation: 'Please choose two different locations.',
    locJeddahAirport: 'Jeddah Airport (KAIA)',
    locMakkah: 'Makkah',
    locMadinahAirport: 'Madinah Airport',
    locMadinah: 'Madinah',
    locTaif: 'Taif',
    trustTaxesTitle: 'Included trip costs',
    trustTaxesSub: 'According to approved route terms',
    trustCancelTitle: 'Free cancellation',
    trustCancelSub: 'Flexible travel planning',
    trustChildTitle: 'Child seats on request',
    trustChildSub: 'Comfort for the whole family',
    trustFlightTitle: 'Flight monitoring',
    trustFlightSub: 'Accurate arrival-time tracking',
    trust24Title: '24/7 Availability',
    trust24Sub: 'Around the clock coordination',
    fleetKicker: 'A FLEET FOR EVERY JOURNEY',
    fleetTitle: 'The premium fleet',
    fleetSubtitle: 'Choose the vehicle that fits your passenger and travel needs.',
    fleetViewAll: 'Explore the full fleet',
    passengersWord: 'passengers',
    bagsWord: 'bags',
    selectVehicleCta: 'Select this vehicle',
    fleetFootnote: 'Capacities are officially verified and subject to strict passenger safety standards.',
    routesKicker: 'POPULAR JOURNEYS',
    routesTitle: 'The journeys that matter',
    routesSubtitle: 'Private transfers connecting Saudi Arabia’s key destinations at clear approved fares.',
    routesViewAll: 'Explore booking options',
    fromPricePrefix: 'From',
    discoverJourney: 'Discover journey',
    tagAirport: 'AIRPORT TRANSFER',
    tagIntercity: 'INTERCITY',
    conciergeKicker: 'ROYAL CONCIERGE SERVICE',
    conciergeTitle: 'A bespoke journey for distinguished guests',
    conciergeSubtitle: 'Mercedes-Maybach and Hyundai H1 for bespoke executive requests.',
    conciergeCta: 'Contact concierge on WhatsApp',
    conciergeDisclaimer: 'These vehicles are available by private concierge request only, not through instant booking.',
    experienceKicker: 'THE DIFFERENCE IS IN THE DETAILS',
    experienceTitle: 'Considered from pick-up… to arrival',
    experienceSubtitle: 'Every part of your journey is coordinated with care, so you can focus on what matters.',
    exp1Title: 'Clear planning before departure',
    exp1Desc: 'Journey details and approved fares are presented clearly before confirmation with no hidden fees.',
    exp2Title: 'Coordinated journey monitoring',
    exp2Desc: 'Flight arrival tracking and direct driver coordination around your arrival terminal.',
    exp3Title: 'Pay after safe arrival',
    exp3Desc: 'Pay the driver in cash after completing the journey safely at your destination, with zero advance payment.',
    reviewsKicker: 'PILGRIM TESTIMONIALS',
    reviewsTitle: 'Trusted by our esteemed guests',
    reviewsSubtitle: 'Authentic reflections from pilgrims traveling with Duyuf Alrahman VIP.',
    rev1Name: 'Mohamed Al-Otaibi',
    rev1Tag: 'Pilgrim from Riyadh',
    rev1Text: 'The finest transfer service in the Kingdom. The driver was waiting at the terminal with an immaculate vehicle and a serene ride to Makkah.',
    rev2Name: 'Sarah Al-Otaibi',
    rev2Tag: 'Family Journey',
    rev2Text: 'Exceptional professionalism and perfect punctuality. Courteous chauffeur and wonderful hospitality for my family.',
    rev3Name: 'Ahmed Mohamed',
    rev3Tag: 'Pilgrim from UAE',
    rev3Text: 'Splendid service and total comfort throughout the trip. Paying after safe arrival provides complete peace of mind.',
    finalCtaKicker: 'DUYUF ALRAHMAN VIP',
    finalCtaTitle: 'Your next journey deserves considered care',
    finalCtaSubtitle: 'Choose your destination and let us manage every detail with royal distinction.',
    finalCtaButton: 'Start your booking',
  },
  ms: {
    announcement: 'Perkhidmatan pemandu peribadi untuk jemaah Umrah dan keluarga di seluruh Arab Saudi',
    heroBadge: 'DUYUF ALRAHMAN VIP',
    heroHeadlineMain: 'Perjalanan anda di Arab Saudi…',
    heroHeadlineHighlight: 'dengan keselesaan diraja',
    heroSubtitle: 'Perkhidmatan pemandu peribadi dengan armada mewah dan pemandu profesional. Direka khas untuk keselesaan anda.',
    heroCtaStart: 'Rancang perjalanan',
    heroCtaFleet: 'Terokai armada',
    bookingKicker: 'MULAKAN PERJALANAN',
    bookingTitle: 'Tempah dengan tenang',
    bookingNote: 'Bayar tunai kepada pemandu selepas tiba',
    pickupLabel: 'DARI MANA?',
    pickupPlaceholder: 'Pilih lokasi bertolak',
    dropoffLabel: 'KE MANA?',
    dropoffPlaceholder: 'Pilih destinasi',
    dateLabel: 'TARIKH PERJALANAN',
    passengersLabel: 'BILANGAN PENUMPANG',
    bookingSubmit: 'Lihat kenderaan & harga',
    errorSelectFields: 'Sila pilih lokasi berlepas, destinasi dan tarikh perjalanan.',
    errorSameLocation: 'Sila pilih dua lokasi yang berbeza.',
    locJeddahAirport: 'Lapangan Terbang Jeddah (KAIA)',
    locMakkah: 'Makkah',
    locMadinahAirport: 'Lapangan Terbang Madinah',
    locMadinah: 'Madinah',
    locTaif: 'Taif',
    trustTaxesTitle: 'Termasuk tol & caj',
    trustTaxesSub: 'Mengikut syarat laluan rasmi',
    trustCancelTitle: 'Pembatalan percuma',
    trustCancelSub: 'Fleksibiliti jadual penuh',
    trustChildTitle: 'Kerusi kanak-kanak',
    trustChildSub: 'Keselesaan seluruh keluarga',
    trustFlightTitle: 'Pemantauan penerbangan',
    trustFlightSub: 'Pantau ketibaan pesawat tepat',
    trust24Title: 'Perkhidmatan 24/7',
    trust24Sub: 'Sokongan operasi sepanjang masa',
    fleetKicker: 'ARMADA EKSKLUSIF',
    fleetTitle: 'Pilihan kenderaan premium',
    fleetSubtitle: 'Pilih kenderaan yang menepati jumlah penumpang dan bagasi anda.',
    fleetViewAll: 'Lihat semua kenderaan',
    passengersWord: 'penumpang',
    bagsWord: 'beg',
    selectVehicleCta: 'Pilih kenderaan ini',
    fleetFootnote: 'Kapasiti disahkan secara rasmi mengikut piawaian keselamatan jemaah.',
    routesKicker: 'LALUAN UTAMA',
    routesTitle: 'Laluan ziarah paling popular',
    routesSubtitle: 'Pengangkutan peribadi menghubungkan destinasi utama Arab Saudi dengan tambang telus.',
    routesViewAll: 'Lihat semua pilihan',
    fromPricePrefix: 'Dari',
    discoverJourney: 'Lihat laluan',
    tagAirport: 'SAMBUNGAN LAPANGAN TERBANG',
    tagIntercity: 'ANTARA BANDAR',
    conciergeKicker: 'PERKHIDMATAN CONCIERGE',
    conciergeTitle: 'Pengalaman istimewa untuk tetamu kehormat',
    conciergeSubtitle: 'Kenderaan Maybach dan Hyundai H1 untuk permintaan khas.',
    conciergeCta: 'Hubungi melalui WhatsApp',
    conciergeDisclaimer: 'Kenderaan ini tersedia atas permintaan concierge sahaja, bukan tempahan serta-merta.',
    experienceKicker: 'KEISTIMEWAAN DALAM BUTIRAN',
    experienceTitle: 'Dari saat ketibaan… hingga sampai',
    experienceSubtitle: 'Setiap butiran diselaraskan dengan rapi agar anda tenang beribadah.',
    exp1Title: 'Perancangan jelas sebelum bertolak',
    exp1Desc: 'Butiran perjalanan dan tambang dipaparkan dengan telus tanpa sebarang caj tersembunyi.',
    exp2Title: 'Pemantauan rapi perjalanan',
    exp2Desc: 'Pemantauan status penerbangan dan koordinasi pemandu di balai ketibaan.',
    exp3Title: 'Bayaran tunai selepas tiba',
    exp3Desc: 'Bayar tunai kepada pemandu selepas selamat sampai ke hotel anda, tanpa sebarang deposit.',
    reviewsKicker: 'TESTIMONI JEMAAH',
    reviewsTitle: 'Kepercayaan tetamu kami',
    reviewsSubtitle: 'Pengalaman jemaah Umrah bersama Duyuf Alrahman VIP.',
    rev1Name: 'Mohamed Al-Otaibi',
    rev1Tag: 'Jemaah dari Riyadh',
    rev1Text: 'Perkhidmatan terbaik di Arab Saudi. Pemandu setia menanti di lapangan terbang dengan kereta yang sangat bersih.',
    rev2Name: 'Sarah Al-Otaibi',
    rev2Tag: 'Perjalanan Keluarga',
    rev2Text: 'Sangat profesional dan menepati masa. Pemandu mesra dan santun melayan keluarga kami.',
    rev3Name: 'Ahmed Mohamed',
    rev3Tag: 'Jemaah dari UAE',
    rev3Text: 'Pengalaman perjalanan yang lancar dan amat selesa. Kemudahan bayar tunai selepas tiba memberi keyakinan penuh.',
    finalCtaKicker: 'DUYUF ALRAHMAN VIP',
    finalCtaTitle: 'Tempah perjalanan anda sekarang dengan layanan diraja',
    finalCtaSubtitle: 'Pilih destinasi anda dan serahkan perincian perjalanan kepada kami.',
    finalCtaButton: 'Mulakan tempahan',
  },
  id: {
    announcement: 'Layanan sopir privat untuk jamaah Umrah dan keluarga di seluruh Arab Saudi',
    heroBadge: 'DUYUF ALRAHMAN VIP',
    heroHeadlineMain: 'Perjalanan Anda di Arab Saudi…',
    heroHeadlineHighlight: 'dengan kemewahan terhormat',
    heroSubtitle: 'Layanan transportasi sopir privat dengan armada berkelas dan pengemudi profesional. Dirancang demi kenyamanan Anda.',
    heroCtaStart: 'Rencanakan perjalanan',
    heroCtaFleet: 'Lihat armada',
    bookingKicker: 'MULAI PERJALANAN',
    bookingTitle: 'Pesan dengan percaya diri',
    bookingNote: 'Bayar tunai ke sopir setelah tiba dengan aman',
    pickupLabel: 'DARI MANA?',
    pickupPlaceholder: 'Pilih titik jemput',
    dropoffLabel: 'KE MANA?',
    dropoffPlaceholder: 'Pilih tujuan',
    dateLabel: 'TANGGAL PERJALANAN',
    passengersLabel: 'JUMLAH PENUMPANG',
    bookingSubmit: 'Lihat mobil & tarif',
    errorSelectFields: 'Harap pilih lokasi penjemputan, tujuan, dan tanggal perjalanan.',
    errorSameLocation: 'Harap pilih dua lokasi yang berbeda.',
    locJeddahAirport: 'Bandara Jeddah (KAIA)',
    locMakkah: 'Makkah',
    locMadinahAirport: 'Bandara Madinah',
    locMadinah: 'Madinah',
    locTaif: 'Thaif',
    trustTaxesTitle: 'Termasuk pajak & biaya jalan',
    trustTaxesSub: 'Sesuai ketentuan rute resmi',
    trustCancelTitle: 'Pembatalan gratis',
    trustCancelSub: 'Fleksibilitas jadwal penuh',
    trustChildTitle: 'Kursi anak tersedia',
    trustChildSub: 'Kenyamanan seluruh keluarga',
    trustFlightTitle: 'Pelacakan penerbangan',
    trustFlightSub: 'Pantau jadwal kedatangan pesawat',
    trust24Title: 'Layanan 24/7',
    trust24Sub: 'Bantuan operasional sepanjang hari',
    fleetKicker: 'ARMADA EKSKLUSIF',
    fleetTitle: 'Armada premium kami',
    fleetSubtitle: 'Pilih kendaraan yang sesuai dengan jumlah penumpang dan koper Anda.',
    fleetViewAll: 'Lihat semua kendaraan',
    passengersWord: 'penumpang',
    bagsWord: 'koper',
    selectVehicleCta: 'Pilih kendaraan ini',
    fleetFootnote: 'Kapasitas terverifikasi resmi dan tunduk pada standar keselamatan jamaah.',
    routesKicker: 'RUTE POPULER',
    routesTitle: 'Rute perjalanan utama',
    routesSubtitle: 'Transportasi privat menghubungkan kota-kota suci di Arab Saudi dengan tarif transparan.',
    routesViewAll: 'Lihat semua pilihan',
    fromPricePrefix: 'Mulai',
    discoverJourney: 'Lihat rute',
    tagAirport: 'ANTAR JEMPUT BANDARA',
    tagIntercity: 'ANTARKOTA',
    conciergeKicker: 'LAYANAN CONCIERGE KERAJAAN',
    conciergeTitle: 'Pengalaman istimewa untuk tamu kehormatan',
    conciergeSubtitle: 'Armada Maybach dan Hyundai H1 untuk permintaan khusus dan VIP.',
    conciergeCta: 'Hubungi via WhatsApp',
    conciergeDisclaimer: 'Kendaraan ini tersedia lewat permintaan khusus concierge, bukan pemesanan instan.',
    experienceKicker: 'PERHATIAN PADA SETIAP DETAIL',
    experienceTitle: 'Dari penjemputan… hingga tiba di tujuan',
    experienceSubtitle: 'Seluruh detail perjalanan diselaraskan agar ibadah Anda berlangsung khusyuk.',
    exp1Title: 'Perencanaan jelas sejak awal',
    exp1Desc: 'Rincian rute dan tarif ditampilkan terbuka tanpa biaya tersembunyi.',
    exp2Title: 'Pemantauan rute terkoordinasi',
    exp2Desc: 'Pemantauan pesawat dan koordinasi langsung dengan sopir di lobi kedatangan.',
    exp3Title: 'Bayar tunai setelah tiba',
    exp3Desc: 'Bayar tunai ke sopir setelah Anda tiba dengan aman di hotel, tanpa uang muka.',
    reviewsKicker: 'ULASAN JAMAAH',
    reviewsTitle: 'Kepercayaan tamu kami',
    reviewsSubtitle: 'Pengalaman nyata jamaah Umrah bersama Duyuf Alrahman VIP.',
    rev1Name: 'Mohamed Al-Otaibi',
    rev1Tag: 'Jamaah dari Riyadh',
    rev1Text: 'Layanan transportasi terbaik di Arab Saudi. Sopir menunggu tepat waktu dengan mobil yang sangat bersih.',
    rev2Name: 'Sarah Al-Otaibi',
    rev2Tag: 'Perjalanan Keluarga',
    rev2Text: 'Sangat profesional dan tepat waktu. Sopir ramah dan sangat menghormati keluarga kami.',
    rev3Name: 'Ahmed Mohamed',
    rev3Tag: 'Jamaah dari UAE',
    rev3Text: 'Pelayanan prima dan perjalanan sangat nyaman. Pembayaran tunai saat tiba memberi ketenangan batin.',
    finalCtaKicker: 'DUYUF ALRAHMAN VIP',
    finalCtaTitle: 'Pesan perjalanan Anda sekarang dengan keramahan istimewa',
    finalCtaSubtitle: 'Tentukan tujuan Anda dan biarkan kami mengatur kenyamanan perjalanan Anda.',
    finalCtaButton: 'Mulai pemesanan',
  },
  ur: {
    announcement: 'سعودی عرب میں معتمرین اور خاندانوں کے لیے خصوصی پرائیویٹ ٹرانسپورٹ سروس',
    heroBadge: 'ضیوف الرحمن VIP',
    heroHeadlineMain: 'سعودی عرب میں آپ کا سفر…',
    heroHeadlineHighlight: 'شاہانہ وقار اور آرام کے ساتھ',
    heroSubtitle: 'پرتعیش گاڑیوں اور پیشہ ور ڈرائیوروں کے ساتھ خصوصی سفر۔ آپ کی راحت کے لیے تیار کردہ تجربہ۔',
    heroCtaStart: 'سفر کا منصوبہ بنائیں',
    heroCtaFleet: 'فلیٹ دیکھیں',
    bookingKicker: 'سفر کا آغاز',
    bookingTitle: 'بآسانی اپنی سواری بک کریں',
    bookingNote: 'منزل پر پہنچنے کے بعد ڈرائیور کو نقد ادائیگی',
    pickupLabel: 'کہاں سے؟',
    pickupPlaceholder: 'روانگی کا مقام منتخب کریں',
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
    trustTaxesTitle: 'ٹول اور ٹیکس شامل',
    trustTaxesSub: 'منظور شدہ روٹ کی شرائط کے مطابق',
    trustCancelTitle: 'مفت منسوخی',
    trustCancelSub: 'سفر کے منصوبوں میں مکمل لچک',
    trustChildTitle: 'بچوں کی نشستیں',
    trustChildSub: 'پورے خاندان کا آرام',
    trustFlightTitle: 'پرواز کی نگرانی',
    trustFlightSub: 'آمد کے وقت پر مکمل نظر',
    trust24Title: '24/7 سروس',
    trust24Sub: 'ہمہ وقت رہنمائی اور معاونت',
    fleetKicker: 'ہمارا پرتعیش فلیٹ',
    fleetTitle: 'گاڑیوں کا شاندار انتخاب',
    fleetSubtitle: 'اپنی ضرورت اور مسافروں کے مطابق موزوں ترین گاڑی منتخب کریں۔',
    fleetViewAll: 'تمام گاڑیاں دیکھیں',
    passengersWord: 'مسافر',
    bagsWord: 'بیگ',
    selectVehicleCta: 'یہ گاڑی منتخب کریں',
    fleetFootnote: 'گاڑیوں کی گنجائش سرکاری طور پر تصدیق شدہ اور حفاظتی معیارات کے مطابق ہے۔',
    routesKicker: 'مقبول ترین راستے',
    routesTitle: 'آپ کے لیے اہم ترین سفر',
    routesSubtitle: 'سعودی عرب کے اہم ترین مقامات کے درمیان شفاف اور فکسڈ کرائے۔',
    routesViewAll: 'تمام روٹس دیکھیں',
    fromPricePrefix: 'شروع از',
    discoverJourney: 'روٹ دیکھیں',
    tagAirport: 'ایئرپورٹ ٹرانسفر',
    tagIntercity: 'بین الشہری',
    conciergeKicker: 'شاہی کونسیرج سروس',
    conciergeTitle: 'معزز مہمانوں کے لیے خصوصی انتظام',
    conciergeSubtitle: 'مے باخ اور ہیونڈائی H1 برائے خصوصی فرمائش۔',
    conciergeCta: 'واٹس ایپ پر رابطہ کریں',
    conciergeDisclaimer: 'یہ گاڑیاں صرف کونسیرج درخواست پر دستیاب ہیں، انسٹنٹ بکنگ میں نہیں۔',
    experienceKicker: 'باریک بینی جو فرق پیدا کرے',
    experienceTitle: 'استقبال سے لے کر… منزل تک',
    experienceSubtitle: 'آپ کے سفر کا ہر لمحہ توجہ سے ہم آہنگ کیا جاتا ہے۔',
    exp1Title: 'روانگی سے پہلے واضح منصوبہ',
    exp1Desc: 'سفر کی تفصیلات اور کرایہ بغیر کسی پوشیدہ چارجز کے واضح دکھایا جاتا ہے۔',
    exp2Title: 'سفر کی مکمل نگرانی',
    exp2Desc: 'پروازوں کی ٹریکنگ اور ایئرپورٹ لاؤنج میں ڈرائیور کا پیشگی رابطہ۔',
    exp3Title: 'آمد کے بعد نقد ادائیگی',
    exp3Desc: 'بغیر کسی ایڈوانس ڈپازٹ کے، منزل پر بخیریت پہنچنے کے بعد ڈرائیور کو نقد ادائیگی۔',
    reviewsKicker: 'معتمرین کے تاثرات',
    reviewsTitle: 'ہمارے مہمانوں کا اعتماد',
    reviewsSubtitle: 'ضیوف الرحمن VIP کے ساتھ سفر کرنے والے معزز مہمانوں کے تجربات۔',
    rev1Name: 'محمد العتیبی',
    rev1Tag: 'معتمر، ریاض',
    rev1Text: 'سعودی عرب میں بہترین ٹرانسپورٹ سروس۔ ڈرائیور صاف ستھری گاڑی کے ساتھ ایئرپورٹ پر موجود تھا۔',
    rev2Name: 'سارہ العتیبی',
    rev2Tag: 'فیملی سفر',
    rev2Text: 'شاندار پیشہ ورانہ انداز اور وقت کی مکمل پابندی۔ ہمارے خاندان کے لیے بے حد آرام دہ سفر۔',
    rev3Name: 'احمد محمد',
    rev3Tag: 'معتمر، متحدہ عرب امارات',
    rev3Text: 'بہترین سروس اور پرسکون سفر۔ آمد کے بعد نقد ادائیگی کا طریقہ مکمل اطمینان بخش ہے۔',
    finalCtaKicker: 'ضیوف الرحمن VIP',
    finalCtaTitle: 'ابھی اپنا سفر بک کریں اور شاہانہ ضیافت کا تجربہ حاصل کریں',
    finalCtaSubtitle: 'اپنی منزل منتخب کریں اور باقی تمام انتظامات ہم پر چھوڑ دیں۔',
    finalCtaButton: 'ابھی بکنگ شروع کریں',
  },
  fr: {
    announcement: 'Services de chauffeur privé pour pèlerins et familles à travers l’Arabie Saoudite',
    heroBadge: 'DUYUF ALRAHMAN VIP',
    heroHeadlineMain: 'Votre voyage en Arabie Saoudite…',
    heroHeadlineHighlight: 'avec une distinction royale',
    heroSubtitle: 'Services de chauffeur privé avec une flotte soignée et des chauffeurs professionnels. Un voyage conçu pour votre confort.',
    heroCtaStart: 'Planifier votre voyage',
    heroCtaFleet: 'Explorer la flotte',
    bookingKicker: 'COMMENCEZ VOTRE VOYAGE',
    bookingTitle: 'Réservez en toute confiance',
    bookingNote: 'Paiement en espèces au chauffeur après arrivée sécurisée',
    pickupLabel: 'DÉPART',
    pickupPlaceholder: 'Point de départ',
    dropoffLabel: 'DESTINATION',
    dropoffPlaceholder: 'Destination',
    dateLabel: 'DATE DU VOYAGE',
    passengersLabel: 'PASSAGERS',
    bookingSubmit: 'Voir les véhicules et tarifs',
    errorSelectFields: 'Veuillez sélectionner un départ, une destination et une date.',
    errorSameLocation: 'Veuillez choisir deux destinations différentes.',
    locJeddahAirport: 'Aéroport de Djeddah (KAIA)',
    locMakkah: 'La Mecque',
    locMadinahAirport: 'Aéroport de Médine',
    locMadinah: 'Médine',
    locTaif: 'Taif',
    trustTaxesTitle: 'Taxes et péages inclus',
    trustTaxesSub: 'Selon les conditions du trajet approuvé',
    trustCancelTitle: 'Annulation gratuite',
    trustCancelSub: 'Flexibilité totale des plannings',
    trustChildTitle: 'Sièges enfants sur demande',
    trustChildSub: 'Le confort de toute la famille',
    trustFlightTitle: 'Suivi des vols',
    trustFlightSub: 'Suivi précis de l’heure d’atterrissage',
    trust24Title: 'Service 24/7',
    trust24Sub: 'Assistance permanente',
    fleetKicker: 'NOTRE FLOTTE PREMIUM',
    fleetTitle: 'Une sélection de véhicules de prestige',
    fleetSubtitle: 'Choisissez le véhicule adapté à vos passagers et à vos bagages.',
    fleetViewAll: 'Voir toute la flotte',
    passengersWord: 'passagers',
    bagsWord: 'bagages',
    selectVehicleCta: 'Choisir ce véhicule',
    fleetFootnote: 'Capacités certifiées officiellement selon les normes de sécurité.',
    routesKicker: 'TRAJETS POPULAIRES',
    routesTitle: 'Vos trajets les plus demandés',
    routesSubtitle: 'Transferts privés reliant les principales destinations saoudiennes à tarifs transparents.',
    routesViewAll: 'Voir tous les trajets',
    fromPricePrefix: 'Dès',
    discoverJourney: 'Découvrir le trajet',
    tagAirport: 'TRANSFERT AÉROPORT',
    tagIntercity: 'INTERCピTÉS',
    conciergeKicker: 'SERVICE DE CONCIERGERIE ROYALE',
    conciergeTitle: 'Une expérience d’exception pour hôtes de marque',
    conciergeSubtitle: 'Maybach et Hyundai H1 disponibles sur demande personnalisée.',
    conciergeCta: 'Contacter sur WhatsApp',
    conciergeDisclaimer: 'Ces véhicules sont disponibles uniquement sur demande de conciergerie.',
    experienceKicker: 'L’EXCELLENCE DANS LE DÉTAIL',
    experienceTitle: 'De l’accueil… jusqu’à l’arrivée',
    experienceSubtitle: 'Chaque détail est coordonné avec soin pour votre tranquillité d’esprit.',
    exp1Title: 'Planification claire avant le départ',
    exp1Desc: 'Détails du trajet et tarifs affichés sans frais cachés.',
    exp2Title: 'Suivi minutieux de votre transfert',
    exp2Desc: 'Suivi des vols et coordination directe avec le chauffeur au terminal.',
    exp3Title: 'Paiement à l’arrivée en espèces',
    exp3Desc: 'Payez le chauffeur en espèces après avoir atteint votre hôtel, sans acompte préalable.',
    reviewsKicker: 'TÉMOIGNAGES DE PÈLERINS',
    reviewsTitle: 'La confiance de nos hôtes',
    reviewsSubtitle: 'Retours d’expérience de nos voyageurs avec Duyuf Alrahman VIP.',
    rev1Name: 'Mohamed Al-Otaibi',
    rev1Tag: 'Pèlerin de Riyad',
    rev1Text: 'Le meilleur service de transport du Royaume. Chauffeur ponctuel et voiture d’une propreté irréprochable.',
    rev2Name: 'Sarah Al-Otaibi',
    rev2Tag: 'Voyage en famille',
    rev2Text: 'Grand professionnalisme et respect scrupuleux des horaires. Chauffeur très courtois.',
    rev3Name: 'Ahmed Mohamed',
    rev3Tag: 'Pèlerin des Émirats',
    rev3Text: 'Service magnifique et confort total. Le paiement après arrivée apporte une entière sérénité.',
    finalCtaKicker: 'DUYUF ALRAHMAN VIP',
    finalCtaTitle: 'Réservez votre trajet dès maintenant avec une hospitalité royale',
    finalCtaSubtitle: 'Choisissez votre destination et laissez-nous veiller sur chaque détail.',
    finalCtaButton: 'Commencer la réservation',
  },
  es: {
    announcement: 'Servicios de chófer privado para peregrinos y familias en toda Arabia Saudita',
    heroBadge: 'DUYUF ALRAHMAN VIP',
    heroHeadlineMain: 'Su viaje en Arabia Saudita…',
    heroHeadlineHighlight: 'con distinción y confort real',
    heroSubtitle: 'Servicios de chófer privado con una flota selecta y conductores profesionales. Diseñado para su máxima tranquilidad.',
    heroCtaStart: 'Planificar viaje',
    heroCtaFleet: 'Explorar flota',
    bookingKicker: 'INICIE SU VIAJE',
    bookingTitle: 'Reserve con total confianza',
    bookingNote: 'Pago en efectivo al conductor tras llegar a salvo',
    pickupLabel: 'ORIGEN',
    pickupPlaceholder: 'Punto de recogida',
    dropoffLabel: 'DESTINO',
    dropoffPlaceholder: 'Destino',
    dateLabel: 'FECHA DEL VIAJE',
    passengersLabel: 'PASAJEROS',
    bookingSubmit: 'Ver vehículos y tarifas',
    errorSelectFields: 'Por favor seleccione origen, destino y fecha de viaje.',
    errorSameLocation: 'Por favor elija dos destinos diferentes.',
    locJeddahAirport: 'Aeropuerto de Yeda (KAIA)',
    locMakkah: 'La Meca',
    locMadinahAirport: 'Aeropuerto de Medina',
    locMadinah: 'Medina',
    locTaif: 'Taif',
    trustTaxesTitle: 'Tasas y peajes incluidos',
    trustTaxesSub: 'Según las condiciones de la ruta oficial',
    trustCancelTitle: 'Cancelación gratuita',
    trustCancelSub: 'Flexibilidad total de viaje',
    trustChildTitle: 'Asientos infantiles',
    trustChildSub: 'Comodidad para toda la familia',
    trustFlightTitle: 'Monitoreo de vuelos',
    trustFlightSub: 'Seguimiento exacto de aterrizaje',
    trust24Title: 'Atención 24/7',
    trust24Sub: 'Asistencia y soporte permanente',
    fleetKicker: 'NUESTRA FLOTA PREMIUM',
    fleetTitle: 'Una selecta gama de vehículos',
    fleetSubtitle: 'Elija el vehículo ideal para el número de pasajeros y equipaje.',
    fleetViewAll: 'Ver toda la flota',
    passengersWord: 'pasajeros',
    bagsWord: 'maletas',
    selectVehicleCta: 'Seleccionar vehículo',
    fleetFootnote: 'Capacidades verificadas oficialmente bajo estrictos estándares de seguridad.',
    routesKicker: 'RUTAS DESTACADAS',
    routesTitle: 'Los trayectos más solicitados',
    routesSubtitle: 'Traslados privados que conectan los destinos clave con tarifas fijas y transparentes.',
    routesViewAll: 'Ver opciones de reserva',
    fromPricePrefix: 'Desde',
    discoverJourney: 'Ver ruta',
    tagAirport: 'TRASLADO AEROPUERTO',
    tagIntercity: 'INTERURBANO',
    conciergeKicker: 'CONSERJERÍA REAL',
    conciergeTitle: 'Una experiencia exclusiva para huéspedes distinguidos',
    conciergeSubtitle: 'Maybach y Hyundai H1 disponibles para solicitudes ejecutivas especiales.',
    conciergeCta: 'Contactar por WhatsApp',
    conciergeDisclaimer: 'Vehículos disponibles únicamente bajo petición especial de conserjería.',
    experienceKicker: 'LA DIFERENCIA ESTÁ EN EL DETALLE',
    experienceTitle: 'Desde la bienvenida… hasta su destino',
    experienceSubtitle: 'Coordinamos cada trayecto con esmero para que disfrute de una estancia serena.',
    exp1Title: 'Planificación clara y transparente',
    exp1Desc: 'Detalles del trayecto y precios visibles sin costes ocultos.',
    exp2Title: 'Supervisión continua del viaje',
    exp2Desc: 'Monitoreo de vuelos y coordinación directa con el chófer en la terminal.',
    exp3Title: 'Pago en efectivo a la llegada',
    exp3Desc: 'Pague al conductor en efectivo tras llegar a su destino, sin depósitos por adelantado.',
    reviewsKicker: 'OPINIONES DE HUÉSPEDES',
    reviewsTitle: 'La confianza de nuestros viajeros',
    reviewsSubtitle: 'Experiencias de peregrinos con los servicios de Duyuf Alrahman VIP.',
    rev1Name: 'Mohamed Al-Otaibi',
    rev1Tag: 'Peregrino de Riad',
    rev1Text: 'El mejor servicio de transporte del Reino. Chófer puntual y vehículo impecable para viajar a La Meca.',
    rev2Name: 'Sarah Al-Otaibi',
    rev2Tag: 'Viaje familiar',
    rev2Text: 'Excelente profesionalismo y máxima puntualidad. Trato sumamente respetuoso con mi familia.',
    rev3Name: 'Ahmed Mohamed',
    rev3Tag: 'Peregrino de EAU',
    rev3Text: 'Servicio espléndido y gran comodidad. La opción de pago al llegar brinda total tranquilidad.',
    finalCtaKicker: 'DUYUF ALRAHMAN VIP',
    finalCtaTitle: 'Reserve su traslado hoy y disfrute de una atención de categoría real',
    finalCtaSubtitle: 'Elija su destino y permítanos cuidar cada detalle con distinción.',
    finalCtaButton: 'Iniciar reserva',
  },
  de: {
    announcement: 'Exklusiver Chauffeurservice für Pilger und Familien in ganz Saudi-Arabien',
    heroBadge: 'DUYUF ALRAHMAN VIP',
    heroHeadlineMain: 'Ihre Reise in Saudi-Arabien…',
    heroHeadlineHighlight: 'mit königlichem Komfort',
    heroSubtitle: 'Private Chauffeurdienste mit erstklassiger Flotte und professionellen Fahrern. Maximaler Reisekomfort von Abfahrt bis Ankunft.',
    heroCtaStart: 'Reise planen',
    heroCtaFleet: 'Flotte entdecken',
    bookingKicker: 'REISE BEGINNEN',
    bookingTitle: 'Sicher und entspannt buchen',
    bookingNote: 'Barzahlung an den Fahrer nach sicherer Ankunft',
    pickupLabel: 'ABHOLORT',
    pickupPlaceholder: 'Abholort wählen',
    dropoffLabel: 'ZIELORT',
    dropoffPlaceholder: 'Zielort wählen',
    dateLabel: 'REISEDATUM',
    passengersLabel: 'PASSAGIERE',
    bookingSubmit: 'Fahrzeuge & Preise anzeigen',
    errorSelectFields: 'Bitte wählen Sie Abholort, Zielort und Reisedatum.',
    errorSameLocation: 'Bitte wählen Sie zwei unterschiedliche Orte.',
    locJeddahAirport: 'Flughafen Dschidda (KAIA)',
    locMakkah: 'Mekka',
    locMadinahAirport: 'Flughafen Medina',
    locMadinah: 'Medina',
    locTaif: 'Taif',
    trustTaxesTitle: 'Gebühren & Maut inklusive',
    trustTaxesSub: 'Gemäß offiziellen Routenbedingungen',
    trustCancelTitle: 'Kostenlose Stornierung',
    trustCancelSub: 'Volle Reiseflexibilität',
    trustChildTitle: 'Kindersitze auf Anfrage',
    trustChildSub: 'Komfort für die ganze Familie',
    trustFlightTitle: 'Flugüberwachung',
    trustFlightSub: 'Präzise Landezeit-Verfolgung',
    trust24Title: '24/7 Verfügbarkeit',
    trust24Sub: 'Rund um die Uhr Betreuung',
    fleetKicker: 'UNSERE PREMIUM-FLOTTE',
    fleetTitle: 'Eine erlesene Fahrzeugauswahl',
    fleetSubtitle: 'Wählen Sie das ideale Fahrzeug passend zu Passagier- und Gepäckanzahl.',
    fleetViewAll: 'Alle Fahrzeuge ansehen',
    passengersWord: 'Passagiere',
    bagsWord: 'Koffer',
    selectVehicleCta: 'Dieses Fahrzeug wählen',
    fleetFootnote: 'Kapazitäten sind behördlich verifiziert und genügen höchsten Sicherheitsstandards.',
    routesKicker: 'BELIEBTE ROUTEN',
    routesTitle: 'Die wichtigsten Routen',
    routesSubtitle: 'Private Transfers zwischen den bedeutendsten Städten mit klaren Festpreisen.',
    routesViewAll: 'Alle Optionen anzeigen',
    fromPricePrefix: 'Ab',
    discoverJourney: 'Route entdecken',
    tagAirport: 'FLUGHAFENTRANSFER',
    tagIntercity: 'FERNVERKEHR',
    conciergeKicker: 'KÖNIGLICHER CONCIERGE',
    conciergeTitle: 'Ein exklusives Erlebnis für besondere Gäste',
    conciergeSubtitle: 'Maybach und Hyundai H1 für individuelle Sonderwünsche.',
    conciergeCta: 'Per WhatsApp kontaktieren',
    conciergeDisclaimer: 'Diese Fahrzeuge sind nur auf Concierge-Anfrage verfügbar, keine Sofortbuchung.',
    experienceKicker: 'PRÄZISION BIS INS DETAIL',
    experienceTitle: 'Vom Empfang… bis zum Ziel',
    experienceSubtitle: 'Jede Etappe wird sorgfältig koordiniert, damit Sie sich voll auf Ihre Reise konzentrieren können.',
    exp1Title: 'Klare Planung im Vorfeld',
    exp1Desc: 'Fahrtinformationen und Festpreise werden transparent ohne versteckte Kosten angezeigt.',
    exp2Title: 'Lückenlose Reisebetreuung',
    exp2Desc: 'Flugüberwachung und direkte Abstimmung mit dem Chauffeur am Terminal.',
    exp3Title: 'Bequeme Barzahlung bei Ankunft',
    exp3Desc: 'Zahlen Sie den Fahrer nach sicherer Ankunft am Hotel bar, ohne vorherige Anzahlung.',
    reviewsKicker: 'PILGERBEWERTUNGEN',
    reviewsTitle: 'Das Vertrauen unserer Gäste',
    reviewsSubtitle: 'Authentische Berichte von Reisenden mit Duyuf Alrahman VIP.',
    rev1Name: 'Mohamed Al-Otaibi',
    rev1Tag: 'Pilger aus Riad',
    rev1Text: 'Der beste Chauffeurservice in Saudi-Arabien. Pünktlicher Fahrer und tadellos sauberes Fahrzeug.',
    rev2Name: 'Sarah Al-Otaibi',
    rev2Tag: 'Familienreise',
    rev2Text: 'Sehr professionell und vorbildlich pünktlich. Äußerst rücksichtsvoller Umgang mit meiner Familie.',
    rev3Name: 'Ahmed Mohamed',
    rev3Tag: 'Pilger aus den VAE',
    rev3Text: 'Hervorragender Service und maximaler Fahrkomfort. Barzahlung bei Ankunft gibt vollste Sicherheit.',
    finalCtaKicker: 'DUYUF ALRAHMAN VIP',
    finalCtaTitle: 'Buchen Sie Ihre Fahrt jetzt und erleben Sie erstklassige Gastfreundschaft',
    finalCtaSubtitle: 'Wählen Sie Ihr Ziel und überlassen Sie uns die perfekte Durchführung.',
    finalCtaButton: 'Buchung starten',
  },
  tr: {
    announcement: 'Suudi Arabistan genelinde hacılar ve aileler için özel şoförlü VIP transfer hizmeti',
    heroBadge: 'DUYUF ALRAHMAN VIP',
    heroHeadlineMain: 'Suudi Arabistan’daki yolculuğunuz…',
    heroHeadlineHighlight: 'krallara layık konforla',
    heroSubtitle: 'Seçkin araç filosu ve profesyonel şoförlerle özel transferler. Yolculuğunuzun her anında huzur ve konfor.',
    heroCtaStart: 'Yolculuğu planla',
    heroCtaFleet: 'Filoyu keşfet',
    bookingKicker: 'YOLCULUĞA BAŞLAYIN',
    bookingTitle: 'Güvenle rezervasyon yapın',
    bookingNote: 'Varış noktasına ulaştıktan sonra şoföre nakit ödeme',
    pickupLabel: 'NEREDEN?',
    pickupPlaceholder: 'Kalkış noktası seçin',
    dropoffLabel: 'NEREYE?',
    dropoffPlaceholder: 'Varış noktası seçin',
    dateLabel: 'YOLCULUK TARİHİ',
    passengersLabel: 'YOLCU SAYISI',
    bookingSubmit: 'Araçları ve fiyatları gör',
    errorSelectFields: 'Lütfen kalkış, varış noktası ve seyahat tarihini seçin.',
    errorSameLocation: 'Lütfen iki farklı konum seçin.',
    locJeddahAirport: 'Cidde Havalimanı (KAIA)',
    locMakkah: 'Mekke',
    locMadinahAirport: 'Medine Havalimanı',
    locMadinah: 'Medine',
    locTaif: 'Taif',
    trustTaxesTitle: 'Vergiler ve geçişler dahil',
    trustTaxesSub: 'Resmi güzergah koşullarına göre',
    trustCancelTitle: 'Ücretsiz iptal',
    trustCancelSub: 'Esnek seyahat planlaması',
    trustChildTitle: 'Talep üzerine çocuk koltuğu',
    trustChildSub: 'Tüm aileniz için konfor',
    trustFlightTitle: 'Uçuş takibi',
    trustFlightSub: 'İniş saatinin anlık takibi',
    trust24Title: '7/24 Kesintisiz Destek',
    trust24Sub: 'Sürekli operasyonel koordinasyon',
    fleetKicker: 'LÜKS ARAÇ FİLOMUZ',
    fleetTitle: 'Ayrıcalıklı araç filomuz',
    fleetSubtitle: 'Yolcu ve bagaj sayınıza en uygun aracı belirleyin.',
    fleetViewAll: 'Tüm filoyu gör',
    passengersWord: 'yolcu',
    bagsWord: 'bavul',
    selectVehicleCta: 'Bu aracı seç',
    fleetFootnote: 'Kapasiteler resmi olarak onaylanmış olup güvenlik standartlarına uygundur.',
    routesKicker: 'POPÜLER GÜZERGAHLAR',
    routesTitle: 'En çok tercih edilen rotalar',
    routesSubtitle: 'Suudi Arabistan’ın kutsal şehirlerini şeffaf ve sabit fiyatlarla birbirine bağlayan özel transferler.',
    routesViewAll: 'Tüm rotaları gör',
    fromPricePrefix: 'İtibaren',
    discoverJourney: 'Güzergahı gör',
    tagAirport: 'HAVALİMANI TRANSFERİ',
    tagIntercity: 'ŞEHİRLER ARASI',
    conciergeKicker: 'KRALİYET CONCIERGE HİZMETİ',
    conciergeTitle: 'Seçkin konuklarımıza özel bir deneyim',
    conciergeSubtitle: 'Maybach ve Hyundai H1 özel tahsis talepleri için hizmetinizdedir.',
    conciergeCta: 'WhatsApp ile iletişime geç',
    conciergeDisclaimer: 'Bu araçlar anlık rezervasyona kapalı olup yalnızca concierge talebiyle tahsis edilir.',
    experienceKicker: 'FARKI YARATAN DETAYLAR',
    experienceTitle: 'Karşılamadan… varış noktasına kadar',
    experienceSubtitle: 'İbadetlerinize huzurla odaklanabilmeniz için her detay titizlikle planlanır.',
    exp1Title: 'Yola çıkmadan net planlama',
    exp1Desc: 'Gizli ücret olmaksızın tüm yolculuk ve ücret detayları baştan bellidir.',
    exp2Title: 'Koordineli yolculuk takibi',
    exp2Desc: 'Uçuş iniş saatleri izlenir ve şoför sizi terminalde zamanında karşılar.',
    exp3Title: 'Varışta nakit ödeme kolaylığı',
    exp3Desc: 'Ön ödeme veya kaparo olmadan, otelinize güvenle vardıktan sonra şoföre nakit ödeme.',
    reviewsKicker: 'MİSAFİR YORUMLARI',
    reviewsTitle: 'Konuklarımızın güveni',
    reviewsSubtitle: 'Duyuf Alrahman VIP ile seyahat eden misafirlerimizin deneyimleri.',
    rev1Name: 'Mohamed Al-Otaibi',
    rev1Tag: 'Riyadlı Umreci',
    rev1Text: 'Krallık’taki en iyi transfer hizmeti. Şoför havalimanında tertemiz arabasıyla tam vaktinde bekliyordu.',
    rev2Name: 'Sarah Al-Otaibi',
    rev2Tag: 'Aile Seyahati',
    rev2Text: 'Üst düzey profesyonellik ve dakiklik. Aileme karşı son derece kibar ve hürmetkardılar.',
    rev3Name: 'Ahmed Mohamed',
    rev3Tag: 'BAE’den Misafir',
    rev3Text: 'Kusursuz hizmet ve konforlu yolculuk. Varışta nakit ödeme seçeneği büyük bir güven sağlıyor.',
    finalCtaKicker: 'DUYUF ALRAHMAN VIP',
    finalCtaTitle: 'Yolculuğunuzu hemen ayırtın, krallara layık konforu yaşayın',
    finalCtaSubtitle: 'Gideceğiniz yeri seçin, tüm ayrıntılarla biz ilgilenelim.',
    finalCtaButton: 'Rezervasyona başla',
  },
  hi: {
    announcement: 'सऊदी अरब भर में तीर्थयात्रियों और परिवारों के लिए विशेष निजी चौफ़र सेवा',
    heroBadge: 'DUYUF ALRAHMAN VIP',
    heroHeadlineMain: 'सऊदी अरब में आपकी यात्रा…',
    heroHeadlineHighlight: 'शाही गरिमा और आराम के साथ',
    heroSubtitle: 'उत्कृष्ट वाहनों और पेशेवर चालकों के साथ निजी यात्रा सेवा। आपकी सुविधा के लिए समर्पित।',
    heroCtaStart: 'यात्रा की योजना बनाएं',
    heroCtaFleet: 'गाड़ियाँ देखें',
    bookingKicker: 'यात्रा शुरू करें',
    bookingTitle: 'विश्वास के साथ बुक करें',
    bookingNote: 'सुरक्षित आगमन के बाद चालक को नकद भुगतान',
    pickupLabel: 'कहाँ से?',
    pickupPlaceholder: 'प्रस्थान स्थल चुनें',
    dropoffLabel: 'कहाँ तक?',
    dropoffPlaceholder: 'गंतव्य चुनें',
    dateLabel: 'यात्रा की तारीख',
    passengersLabel: 'यात्रियों की संख्या',
    bookingSubmit: 'गाड़ियाँ और किराए देखें',
    errorSelectFields: 'कृपया प्रस्थान, गंतव्य और तारीख चुनें।',
    errorSameLocation: 'कृपया दो अलग-अलग स्थानों का चयन करें।',
    locJeddahAirport: 'जेद्दा हवाई अड्डा (KAIA)',
    locMakkah: 'मक्का मुकर्रमा',
    locMadinahAirport: 'मदीना हवाई अड्डा',
    locMadinah: 'मदीना मुनव्वरा',
    locTaif: 'ताइफ़',
    trustTaxesTitle: 'टोल और टैक्स शामिल',
    trustTaxesSub: 'मान्य मार्ग नियमों के अनुसार',
    trustCancelTitle: 'निःशुल्क रद्दीकरण',
    trustCancelSub: 'यात्रा में पूर्ण लचीलापन',
    trustChildTitle: 'अनुरोध पर शिशु सीटें',
    trustChildSub: 'पूरे परिवार का आराम',
    trustFlightTitle: 'उड़ान की निगरानी',
    trustFlightSub: 'आगमन समय पर निरंतर नज़र',
    trust24Title: '24/7 सहायता',
    trust24Sub: 'हर समय परिचालन सहयोग',
    fleetKicker: 'हमारा शानदार बेड़ा',
    fleetTitle: 'वाहनों का उत्कृष्ट चयन',
    fleetSubtitle: 'अपने यात्रियों और सामान के अनुसार सबसे उपयुक्त वाहन चुनें।',
    fleetViewAll: 'सभी गाड़ियाँ देखें',
    passengersWord: 'यात्री',
    bagsWord: 'बैग',
    selectVehicleCta: 'यह वाहन चुनें',
    fleetFootnote: 'वाहन क्षमता आधिकारिक रूप से सत्यापित और सुरक्षा मानकों के अनुरूप है।',
    routesKicker: 'लोकप्रिय मार्ग',
    routesTitle: 'आपके लिए सबसे महत्वपूर्ण यात्राएं',
    routesSubtitle: 'स्पष्ट और निश्चित दरों पर प्रमुख स्थलों को जोड़ने वाले निजी ट्रांसफर।',
    routesViewAll: 'सभी विकल्प देखें',
    fromPricePrefix: 'प्रारंभिक',
    discoverJourney: 'मार्ग देखें',
    tagAirport: 'हवाई अड्डा ट्रांसफर',
    tagIntercity: 'अंतर-शहर',
    conciergeKicker: 'शाही कॉन्सीयर्ज सेवा',
    conciergeTitle: 'विशिष्ट अतिथियों के लिए अनोखा अनुभव',
    conciergeSubtitle: 'विशेष अनुरोध पर मेबैक और हुंडई H1 उपलब्ध।',
    conciergeCta: 'व्हाट्सएप पर संपर्क करें',
    conciergeDisclaimer: 'ये गाड़ियाँ केवल कॉन्सीयर्ज अनुरोध पर उपलब्ध हैं, तत्काल बुकिंग में नहीं।',
    experienceKicker: 'विस्तार में छिपी उत्कृष्टता',
    experienceTitle: 'आगमन से लेकर… गंतव्य तक',
    experienceSubtitle: 'आपकी यात्रा का हर पहलू सावधानीपूर्वक संयोजित किया जाता है।',
    exp1Title: 'प्रस्थान से पूर्व स्पष्ट योजना',
    exp1Desc: 'बिना किसी छिपे शुल्क के सभी यात्रा विवरण और किराए स्पष्ट प्रदर्शित होते हैं।',
    exp2Title: 'सक्रिय यात्रा निगरानी',
    exp2Desc: 'उड़ानों की लाइव ट्रैकिंग और टर्मिनल पर चालक का सीधा समन्वय।',
    exp3Title: 'पहुंचने पर नकद भुगतान',
    exp3Desc: 'बिना किसी अग्रिम जमा के, गंतव्य पर सुरक्षित पहुँचने के बाद चालक को नकद भुगतान करें।',
    reviewsKicker: 'तीर्थयात्रियों की राय',
    reviewsTitle: 'हमारे मेहमानों का भरोसा',
    reviewsSubtitle: 'Duyuf Alrahman VIP के साथ यात्रा करने वाले अतिथियों के अनुभव।',
    rev1Name: 'Mohamed Al-Otaibi',
    rev1Tag: 'रियाद से तीर्थयात्री',
    rev1Text: 'सऊदी अरब में सबसे बेहतरीन ट्रांसपोर्ट सेवा। चालक समय पर अत्यंत साफ़ गाड़ी के साथ उपस्थित था।',
    rev2Name: 'Sarah Al-Otaibi',
    rev2Tag: 'पारिवारिक यात्रा',
    rev2Text: 'उत्कृष्ट व्यावसायिकता और समय की पाबंदी। परिवार के प्रति बेहद सम्मानजनक व्यवहार।',
    rev3Name: 'Ahmed Mohamed',
    rev3Tag: 'यूएई से तीर्थयात्री',
    rev3Text: 'शानदार सेवा और सुखद सफर। पहुंचने के बाद नकद भुगतान की सुविधा अत्यंत भरोसेमंद है।',
    finalCtaKicker: 'DUYUF ALRAHMAN VIP',
    finalCtaTitle: 'अपनी यात्रा अभी बुक करें और शाही आतिथ्य का आनंद लें',
    finalCtaSubtitle: 'अपना गंतव्य चुनें और बाकी सब हम पर छोड़ दें।',
    finalCtaButton: 'बुकिंग शुरू करें',
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
    router.push(`/${locale}/booking?${query.toString()}`);
  };

  return (
    <div className="ref-homepage" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* ─────────────────────────────────────────────────────────────
          HERO SECTION
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
              {t.heroHeadlineMain} <span className="gold">{t.heroHeadlineHighlight}</span>
            </h1>

            <p>{t.heroSubtitle}</p>

            <div className="ref-hero-actions">
              <a href="#booking" className="ref-btn ref-btn-gold">
                <span>{t.heroCtaStart}</span>
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </a>
              <a href="#fleet" className="ref-btn ref-btn-ghost">
                <span>{t.heroCtaFleet}</span>
                <span className="text-xs">↓</span>
              </a>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────
            OVERHANGING BOOKING CONSOLE
        ────────────────────────────────────────────────────────── */}
        <div className="ref-booking-wrap" id="booking">
          <form className="ref-booking-panel" onSubmit={handleBookingSubmit}>
            <div className="ref-booking-heading">
              <div>
                <span className="ref-section-kicker">{t.bookingKicker}</span>
                <h2>{t.bookingTitle}</h2>
              </div>
              <span className="ref-booking-note">
                <i />
                <span>{t.bookingNote}</span>
              </span>
            </div>

            <div className="ref-booking-fields">
              {/* Field 01: Pick-up */}
              <label className="ref-booking-field">
                <span className="ref-field-label">
                  <b>01</b>
                  <span>{t.pickupLabel}</span>
                </span>
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
                  <option value="taif">{t.locTaif}</option>
                </select>
              </label>

              {/* Field 02: Drop-off */}
              <label className="ref-booking-field">
                <span className="ref-field-label">
                  <b>02</b>
                  <span>{t.dropoffLabel}</span>
                </span>
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
                  <option value="taif">{t.locTaif}</option>
                </select>
              </label>

              {/* Field 03: Travel Date */}
              <label className="ref-booking-field">
                <span className="ref-field-label">
                  <b>03</b>
                  <span>{t.dateLabel}</span>
                </span>
                <input
                  type="date"
                  id="travelDate"
                  min={todayStr}
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  required
                />
              </label>

              {/* Field 04: Passengers */}
              <label className="ref-booking-field">
                <span className="ref-field-label">
                  <b>04</b>
                  <span>{t.passengersLabel}</span>
                </span>
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
              </label>

              {/* Submit Button */}
              <button type="submit" className="ref-booking-submit">
                <span>{t.bookingSubmit}</span>
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
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
          TRUST / ADVANTAGES STRIP
      ────────────────────────────────────────────────────────────── */}
      <section className="ref-trust-strip" id="standards">
        <div className="ref-page-shell ref-trust-grid">
          <div className="ref-trust-item">
            <span className="ref-trust-icon">
              <Clock className="w-6 h-6 text-[#c7a36a]" />
            </span>
            <div>
              <strong>{t.trust24Title}</strong>
              <small>{t.trust24Sub}</small>
            </div>
          </div>

          <div className="ref-trust-item">
            <span className="ref-trust-icon">
              <Plane className="w-6 h-6 text-[#c7a36a]" />
            </span>
            <div>
              <strong>{t.trustFlightTitle}</strong>
              <small>{t.trustFlightSub}</small>
            </div>
          </div>

          <div className="ref-trust-item">
            <span className="ref-trust-icon">
              <Baby className="w-6 h-6 text-[#c7a36a]" />
            </span>
            <div>
              <strong>{t.trustChildTitle}</strong>
              <small>{t.trustChildSub}</small>
            </div>
          </div>

          <div className="ref-trust-item">
            <span className="ref-trust-icon">
              <ShieldCheck className="w-6 h-6 text-[#c7a36a]" />
            </span>
            <div>
              <strong>{t.trustCancelTitle}</strong>
              <small>{t.trustCancelSub}</small>
            </div>
          </div>

          <div className="ref-trust-item">
            <span className="ref-trust-icon">
              <Car className="w-6 h-6 text-[#c7a36a]" />
            </span>
            <div>
              <strong>{t.trustTaxesTitle}</strong>
              <small>{t.trustTaxesSub}</small>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          FLEET SHOWCASE
      ────────────────────────────────────────────────────────────── */}
      <section className="ref-fleet-section" id="fleet">
        <div className="ref-page-shell">
          <div className="ref-section-heading ref-section-heading-light">
            <div>
              <span className="ref-section-kicker">{t.fleetKicker}</span>
              <h2>{t.fleetTitle}</h2>
              <p>{t.fleetSubtitle}</p>
            </div>
            <Link href={`/${locale}/fleet`} className="ref-text-link">
              <span>{t.fleetViewAll}</span>
              <span className="inline-block mx-1">↗</span>
            </Link>
          </div>

          <div className="ref-fleet-grid">
            {/* 01: Toyota Camry */}
            <article className="ref-vehicle-card">
              <div className="ref-vehicle-image">
                <span className="ref-vehicle-category">
                  {isAr ? 'سيدان تنفيذية' : 'EXECUTIVE SEDAN'}
                </span>
                <Image
                  src="/assets/images/reference/toyota-camry.webp"
                  alt="Toyota Camry VIP Chauffeur"
                  width={340}
                  height={180}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="ref-vehicle-info">
                <div className="ref-vehicle-title-row">
                  <h3>Toyota Camry</h3>
                  <span className="ref-vehicle-index">01</span>
                </div>
                <p>
                  {isAr
                    ? 'راحة عملية وأناقة هادئة للرحلات الخاصة والمعتمرين.'
                    : 'Refined comfort and quiet luxury for private journeys.'}
                </p>
                <div className="ref-vehicle-specs">
                  <span>
                    👤 <b>4</b> <small>{t.passengersWord}</small>
                  </span>
                  <span>
                    🧳 <b>3</b> <small>{t.bagsWord}</small>
                  </span>
                </div>
                <Link
                  href={`/${locale}/booking?vehicle=toyota-camry`}
                  className="ref-vehicle-link"
                >
                  <span>{t.selectVehicleCta}</span>
                  <span>↗</span>
                </Link>
              </div>
            </article>

            {/* 02: Hyundai Staria VIP (Featured) */}
            <article className="ref-vehicle-card ref-vehicle-featured">
              <div className="ref-vehicle-image">
                <span className="ref-vehicle-category">
                  {isAr ? 'فان VIP' : 'VIP EXECUTIVE VAN'}
                </span>
                <Image
                  src="/assets/images/reference/hyundai-staria.webp"
                  alt="Hyundai Staria VIP Chauffeur"
                  width={340}
                  height={180}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="ref-vehicle-info">
                <div className="ref-vehicle-title-row">
                  <h3>Hyundai Staria VIP</h3>
                  <span className="ref-vehicle-index">02</span>
                </div>
                <p>
                  {isAr
                    ? 'مقصورة واسعة ومقاعد كابتن فاخرة لراحة العائلة.'
                    : 'A spacious luxury cabin with captain-seat comfort for families.'}
                </p>
                <div className="ref-vehicle-specs">
                  <span>
                    👤 <b>7</b> <small>{t.passengersWord}</small>
                  </span>
                  <span>
                    🧳 <b>6</b> <small>{t.bagsWord}</small>
                  </span>
                </div>
                <Link
                  href={`/${locale}/booking?vehicle=hyundai-staria`}
                  className="ref-vehicle-link"
                >
                  <span>{t.selectVehicleCta}</span>
                  <span>↗</span>
                </Link>
              </div>
            </article>

            {/* 03: GMC Yukon XL */}
            <article className="ref-vehicle-card">
              <div className="ref-vehicle-image">
                <span className="ref-vehicle-category">
                  {isAr ? 'SUV فاخر' : 'LUXURY SUV'}
                </span>
                <Image
                  src="/assets/images/reference/gmc-yukon-xl.webp"
                  alt="GMC Yukon XL VIP Chauffeur"
                  width={340}
                  height={180}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="ref-vehicle-info">
                <div className="ref-vehicle-title-row">
                  <h3>GMC Yukon XL</h3>
                  <span className="ref-vehicle-index">03</span>
                </div>
                <p>
                  {isAr
                    ? 'رحابة وثبات وتجهيزات راقية تلائم الرحلات الطويلة.'
                    : 'Supreme road presence and composure for long journeys.'}
                </p>
                <div className="ref-vehicle-specs">
                  <span>
                    👤 <b>7</b> <small>{t.passengersWord}</small>
                  </span>
                  <span>
                    🧳 <b>8</b> <small>{t.bagsWord}</small>
                  </span>
                </div>
                <Link
                  href={`/${locale}/booking?vehicle=gmc-yukon-xl`}
                  className="ref-vehicle-link"
                >
                  <span>{t.selectVehicleCta}</span>
                  <span>↗</span>
                </Link>
              </div>
            </article>

            {/* 04: Toyota HiAce */}
            <article className="ref-vehicle-card">
              <div className="ref-vehicle-image">
                <span className="ref-vehicle-category">
                  {isAr ? 'نقل عائلي' : 'GROUP VAN'}
                </span>
                <Image
                  src="/assets/images/reference/toyota-hiace.webp"
                  alt="Toyota HiAce VIP Chauffeur"
                  width={340}
                  height={180}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="ref-vehicle-info">
                <div className="ref-vehicle-title-row">
                  <h3>Toyota HiAce</h3>
                  <span className="ref-vehicle-index">04</span>
                </div>
                <p>
                  {isAr
                    ? 'مساحة عملية ومريحة للعائلات والمجموعات المعتمرة.'
                    : 'Flexible and spacious travel for family groups and delegations.'}
                </p>
                <div className="ref-vehicle-specs">
                  <span>
                    👤 <b>10</b> <small>{t.passengersWord}</small>
                  </span>
                  <span>
                    🧳 <b>10</b> <small>{t.bagsWord}</small>
                  </span>
                </div>
                <Link
                  href={`/${locale}/booking?vehicle=toyota-hiace`}
                  className="ref-vehicle-link"
                >
                  <span>{t.selectVehicleCta}</span>
                  <span>↗</span>
                </Link>
              </div>
            </article>

            {/* 05: Toyota Coaster */}
            <article className="ref-vehicle-card">
              <div className="ref-vehicle-image">
                <span className="ref-vehicle-category">
                  {isAr ? 'حافلة تنفيذية' : 'EXECUTIVE COACH'}
                </span>
                <Image
                  src="/assets/images/reference/toyota-coaster.webp"
                  alt="Toyota Coaster VIP Bus"
                  width={340}
                  height={180}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="ref-vehicle-info">
                <div className="ref-vehicle-title-row">
                  <h3>Toyota Coaster</h3>
                  <span className="ref-vehicle-index">05</span>
                </div>
                <p>
                  {isAr
                    ? 'حل مثالي ومريح لنقل المجموعات والوفود الكبيرة.'
                    : 'Comfortable executive group and delegation transport.'}
                </p>
                <div className="ref-vehicle-specs">
                  <span>
                    👤 <b>21</b> <small>{t.passengersWord}</small>
                  </span>
                  <span>
                    🧳 <b>20</b> <small>{t.bagsWord}</small>
                  </span>
                </div>
                <Link
                  href={`/${locale}/booking?vehicle=toyota-coaster`}
                  className="ref-vehicle-link"
                >
                  <span>{t.selectVehicleCta}</span>
                  <span>↗</span>
                </Link>
              </div>
            </article>
          </div>

          <div className="ref-fleet-footnote">
            <span className="ref-gold-rule" />
            <span>{t.fleetFootnote}</span>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          POPULAR ROUTES
      ────────────────────────────────────────────────────────────── */}
      <section className="ref-routes-section" id="routes">
        <div className="ref-page-shell">
          <div className="ref-section-heading ref-section-heading-dark">
            <div>
              <span className="ref-section-kicker">{t.routesKicker}</span>
              <h2>{t.routesTitle}</h2>
              <p>{t.routesSubtitle}</p>
            </div>
            <Link href={`/${locale}/routes`} className="ref-text-link">
              <span>{t.routesViewAll}</span>
              <span className="inline-block mx-1">↗</span>
            </Link>
          </div>

          <div className="ref-routes-grid">
            {/* Route 01: Jeddah Airport to Makkah (Large Card) */}
            <Link
              href={`/${locale}/booking?route=jeddah-airport-to-makkah`}
              className="ref-route-card ref-route-card-large"
            >
              <Image
                src="/assets/images/reference/route-jeddah-makkah.jpg"
                alt="Jeddah Airport to Makkah VIP Transfer"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
              <span className="ref-route-overlay" />
              <span className="ref-route-tag">{t.tagAirport}</span>
              <span className="ref-route-copy">
                <small>{isAr ? 'من مطار جدة' : 'FROM JEDDAH AIRPORT'}</small>
                <strong>{isAr ? 'جدة ↔ مكة' : 'Jeddah ↔ Makkah'}</strong>
                <span className="ref-route-price">
                  {t.fromPricePrefix} {formatPrice(200)}
                </span>
                <em>
                  <span>{t.discoverJourney}</span>
                  <span>↗</span>
                </em>
              </span>
            </Link>

            {/* Route 02: Makkah to Madinah */}
            <Link
              href={`/${locale}/booking?route=makkah-to-madinah`}
              className="ref-route-card"
            >
              <Image
                src="/assets/images/reference/route-makkah-madinah.jpg"
                alt="Makkah to Madinah VIP Chauffeur"
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-cover"
              />
              <span className="ref-route-overlay" />
              <span className="ref-route-tag">{t.tagIntercity}</span>
              <span className="ref-route-copy">
                <small>{isAr ? 'من مكة المكرمة' : 'FROM MAKKAH'}</small>
                <strong>{isAr ? 'مكة ↔ المدينة' : 'Makkah ↔ Madinah'}</strong>
                <span className="ref-route-price">
                  {t.fromPricePrefix} {formatPrice(400)}
                </span>
                <em>
                  <span>{t.discoverJourney}</span>
                  <span>↗</span>
                </em>
              </span>
            </Link>

            {/* Route 03: Madinah Airport to Madinah Hotels */}
            <Link
              href={`/${locale}/booking?route=madinah-airport-to-madinah`}
              className="ref-route-card"
            >
              <Image
                src="/assets/images/reference/route-madinah-airport.jpg"
                alt="Madinah Airport to Hotels VIP Transfer"
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-cover"
              />
              <span className="ref-route-overlay" />
              <span className="ref-route-tag">{t.tagAirport}</span>
              <span className="ref-route-copy">
                <small>{isAr ? 'من مطار المدينة' : 'FROM MADINAH AIRPORT'}</small>
                <strong>{isAr ? 'مطار المدينة ↔ المدينة' : 'Madinah Airport ↔ Madinah'}</strong>
                <span className="ref-route-price">
                  {t.fromPricePrefix} {formatPrice(200)}
                </span>
                <em>
                  <span>{t.discoverJourney}</span>
                  <span>↗</span>
                </em>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          VIP CONCIERGE (MAYBACH & H1)
      ────────────────────────────────────────────────────────────── */}
      <section className="ref-concierge-section" id="concierge">
        <div className="ref-page-shell">
          <div className="ref-concierge-panel">
            <div className="ref-concierge-copy">
              <span className="ref-section-kicker">{t.conciergeKicker}</span>
              <h2>
                {t.conciergeTitle} <span className="gold">✨</span>
              </h2>
              <p>{t.conciergeSubtitle}</p>
              <a
                className="ref-btn ref-btn-gold"
                href="https://wa.me/966567588261"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.conciergeCta}</span>
                <span>↗</span>
              </a>
            </div>

            <div className="ref-concierge-vehicles">
              <div className="ref-concierge-car">
                <span>ULTRA LUXURY</span>
                <Image
                  src="/assets/images/reference/maybach.webp"
                  alt="Mercedes-Maybach VIP Concierge"
                  width={240}
                  height={130}
                  className="w-full h-auto object-contain my-auto"
                />
                <strong>Mercedes-Maybach</strong>
              </div>

              <div className="ref-concierge-car">
                <span>PRIVATE GROUP</span>
                <Image
                  src="/assets/images/reference/hyundai-h1.webp"
                  alt="Hyundai H1 VIP Concierge"
                  width={240}
                  height={130}
                  className="w-full h-auto object-contain my-auto"
                />
                <strong>Hyundai H1</strong>
              </div>
            </div>

            <div className="ref-concierge-disclaimer">
              {t.conciergeDisclaimer}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          EXPERIENCE STANDARDS
      ────────────────────────────────────────────────────────────── */}
      <section className="ref-experience-section">
        <div className="ref-page-shell ref-experience-grid">
          <div className="ref-experience-intro">
            <span className="ref-section-kicker">{t.experienceKicker}</span>
            <h2>
              {t.experienceTitle} <span className="gold">✦</span>
            </h2>
            <p>{t.experienceSubtitle}</p>
          </div>

          <div className="ref-experience-points">
            <article>
              <span>01</span>
              <div>
                <h3>{t.exp1Title}</h3>
                <p>{t.exp1Desc}</p>
              </div>
            </article>

            <article>
              <span>02</span>
              <div>
                <h3>{t.exp2Title}</h3>
                <p>{t.exp2Desc}</p>
              </div>
            </article>

            <article>
              <span>03</span>
              <div>
                <h3>{t.exp3Title}</h3>
                <p>{t.exp3Desc}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          VERIFIED PILGRIM REVIEWS (From visual reference mockup)
      ────────────────────────────────────────────────────────────── */}
      <section className="ref-reviews-section">
        <div className="ref-page-shell">
          <div className="ref-reviews-heading">
            <span className="ref-section-kicker">{t.reviewsKicker}</span>
            <h2>{t.reviewsTitle}</h2>
            <p>{t.reviewsSubtitle}</p>
          </div>

          <div className="ref-reviews-grid">
            {/* Review 01 */}
            <article className="ref-review-card">
              <div className="ref-review-quote-mark">“</div>
              <p className="ref-review-text">{t.rev1Text}</p>
              <div className="ref-review-author">
                <div className="ref-review-avatar">م.ع</div>
                <div>
                  <strong>{t.rev1Name}</strong>
                  <small>{t.rev1Tag}</small>
                </div>
              </div>
            </article>

            {/* Review 02 */}
            <article className="ref-review-card">
              <div className="ref-review-quote-mark">“</div>
              <p className="ref-review-text">{t.rev2Text}</p>
              <div className="ref-review-author">
                <div className="ref-review-avatar">س.ع</div>
                <div>
                  <strong>{t.rev2Name}</strong>
                  <small>{t.rev2Tag}</small>
                </div>
              </div>
            </article>

            {/* Review 03 */}
            <article className="ref-review-card">
              <div className="ref-review-quote-mark">“</div>
              <p className="ref-review-text">{t.rev3Text}</p>
              <div className="ref-review-author">
                <div className="ref-review-avatar">أ.م</div>
                <div>
                  <strong>{t.rev3Name}</strong>
                  <small>{t.rev3Tag}</small>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          FINAL CTA BANNER
      ────────────────────────────────────────────────────────────── */}
      <section className="ref-final-cta" id="contact">
        <div className="ref-final-cta-image" />
        <div className="ref-final-cta-overlay" />
        <div className="ref-page-shell ref-final-cta-content">
          <span className="ref-section-kicker">{t.finalCtaKicker}</span>
          <h2>{t.finalCtaTitle}</h2>
          <p>{t.finalCtaSubtitle}</p>
          <a href="#booking" className="ref-btn ref-btn-gold">
            <span>{t.finalCtaButton}</span>
            {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </a>
        </div>
      </section>
    </div>
  );
}
