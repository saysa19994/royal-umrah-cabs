'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import {
  Car,
  Train,
  Bus,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Compass,
  ArrowRight,
  Luggage,
  Users,
  MapPin,
  Sparkles,
  Banknote,
  Coffee,
  HelpCircle,
} from 'lucide-react';

export interface IntercityRouteExperienceProps {
  locale: Locale;
  slug: string;
  minPriceSAR?: number;
  rates?: Record<string, number>;
}

interface TranslationData {
  badge: string;
  title: string;
  subtitle: string;
  compareTabVip: string;
  compareTabTrain: string;
  compareTabBus: string;
  compareHeaderFeature: string;
  compareHeaderVip: string;
  compareHeaderTrain: string;
  compareHeaderBus: string;
  features: {
    name: string;
    vip: string;
    train: string;
    bus: string;
  }[];
  milestonesTitle: string;
  milestonesSubtitle: string;
  milestones: {
    num: string;
    title: string;
    subtitle: string;
    desc: string;
    highlight: string;
  }[];
  fleetTitle: string;
  fleetSubtitle: string;
  paxLabel: string;
  bagsLabel: string;
  sarLabel: string;
  fixedFareLabel: string;
  bookNowButton: string;
  guaranteeBadge: string;
  guaranteeTitle: string;
  guaranteeDesc: string;
  recommendedTag: string;
}

const TRANSLATIONS: Record<Locale, TranslationData> = {
  ar: {
    badge: 'تجربة السفر بين الحرمين الشريفين',
    title: 'رحلة طريق الهجرة السريع (مكة المكرمة ⇄ المدينة المنورة)',
    subtitle: 'انتقال خاص، مريح، ومباشر من باب فندقك الأول إلى بهو فندقك الثاني عبر طريق 15 السريع مع التوقف بمحطة الميقات والاستراحات المكيفة.',
    compareTabVip: 'سائق خاص ضيوف الرحمن VIP',
    compareTabTrain: 'قطار الحرمين السريع',
    compareTabBus: 'الحافلات الجماعية',
    compareHeaderFeature: 'وجه المقارنة',
    compareHeaderVip: 'سائق خاص ضيوف الرحمن VIP',
    compareHeaderTrain: 'قطار الحرمين السريع',
    compareHeaderBus: 'الحافلات وسيارات الأجرة العامة',
    features: [
      {
        name: 'نقطة الانطلاق والوصول',
        vip: 'من بهو فندقك مباشرة إلى بهو فندقك (الباب إلى الباب)',
        train: 'تتطلب تاكسي للذهاب لمحطة القطار وتاكسي آخر عند الوصول',
        bus: 'محطات نقل جماعي عامة بعيدة عن فنادق الحرم',
      },
      {
        name: 'التوقف بميقات الإحرام (ذي الحليفة / آبار علي)',
        vip: 'توقف مخصص مجاني (45 دقيقة) للصلاة والإحرام وتجهيز العائلة',
        train: 'لا يتوقف القطار في الميقات إطلاقاً',
        bus: 'توقف سريع ومزدحم دون خصوصية كافية',
      },
      {
        name: 'سعة ومرونة الحقائب والأمتعة',
        vip: 'حمل كافة حقائب العائلة وعربات الأطفال وماء زمزم بدون وزن أو قيود',
        train: 'حقيبة واحدة كبيرة وواحدة صغيرة لكل راكب ورسوم على الزائد',
        bus: 'محدودية في مساحة الأمتعة واحتمال ضياع الحقائب',
      },
      {
        name: 'مرونة مواعيد الانطلاق',
        vip: 'الانطلاق في أي وقت تختاره على مدار 24 ساعة حسب راحتك',
        train: 'مواعيد رحلات مجدولة وصارمة تتطلب الحضور قبل 45 دقيقة',
        bus: 'جداول مواعيد محددة مسبقاً وتأخيرات متكررة',
      },
      {
        name: 'الخصوصية وراحة كبار السن والأطفال',
        vip: 'خصوصية تامة 100% لعائلتك دون ركاب غرباء أو إزعاج',
        train: 'مقصورات ركاب عامة مشتركة',
        bus: 'حافلات عامة مكتظة ومجهدة لكبار السن',
      },
      {
        name: 'طريقة السداد والأمان المالي',
        vip: '100% كاش للسائق بعد الوصول الآمن — 0% مخاطرة أو دفع مسبق',
        train: 'دفع إلكتروني مسبق إلزامي وتذاكر غير مستردة غالباً',
        bus: 'دفع مسبق نقدي أو إلكتروني دون ضمان الراحة',
      },
    ],
    milestonesTitle: 'المسار الزمني لمحطات رحلة طريق الهجرة السريع',
    milestonesSubtitle: 'رحلة مريحة ومباركة مقسمة بانتظام لضمان السكينة وتجديد النشاط طوال مسافة 420 كم:',
    milestones: [
      {
        num: '01',
        title: 'الانطلاق من فندقك بمكة أو المدينة',
        subtitle: 'تحميل الأمتعة وتبريد المقصورة ودعاء السفر',
        desc: 'يصل سائقك في الموعد المحدد أمام بهو الفندق، ويساعدك في تحميل كافة الحقائب، لتبدأ رحلتك بأدعية السفر وضيافة ماء زمزم البارد.',
        highlight: 'انطلاق فندقي مريح',
      },
      {
        num: '02',
        title: 'التوقف في ميقات ذي الحليفة (آبار علي)',
        subtitle: 'خاص برحلات المدينة إلى مكة المكرمة لأداء العمرة',
        desc: 'توقف خاص لمدة 45 دقيقة في رحاب مسجد الميقات، لتمكين ضيوف الرحمن من الاغتسال، ولبس الإحرام، وصلاة ركعتي الإحرام، وعقد النية والتلبي.',
        highlight: 'توقف الميقات المخصص',
      },
      {
        num: '03',
        title: 'استراحة واحة وادي قديد / ساسكو بالم',
        subtitle: 'منتصف الطريق السريع (الكيلو 210)',
        desc: 'توقف مريح في مجمع استراحات حديث ومكيف يضم مصلى واسعاً، ودورات مياه عائلية نظيفة، ومقاهي راقية (بارنز وكوستا) لتناول المشروبات والوجبات الخفيفة.',
        highlight: 'استراحة عائلية مكيفة',
      },
      {
        num: '04',
        title: 'الوصول المباشر إلى بهو فندقك بالحرم',
        subtitle: 'توصيل من الباب إلى الباب وتنزيل الحقائب',
        desc: 'الوصول الآمن إلى وجهتك المركزية المطلة على الحرمين الشريفين، مع تنزيل الحقائب بعناية وتسليم الأجرة نقداً للسائق بكل سهولة.',
        highlight: 'تسليم كاش عند الوصول',
      },
    ],
    fleetTitle: 'أسطول السفر الطويل المعتمد بين مكة والمدينة',
    fleetSubtitle: 'مركبات حديثة وعازلة للصوت ومجهزة بأنظمة تعليق مريحة تضمن أعلى درجات الهدوء أثناء السفر الطويل:',
    paxLabel: 'ركاب',
    bagsLabel: 'حقائب سفر كبيرة',
    sarLabel: 'ر.س',
    fixedFareLabel: 'السعر الثابت للمسار بالكامل',
    bookNowButton: 'احجز هذا المسار الآن',
    guaranteeBadge: 'ضمان ضيوف الرحمن VIP',
    guaranteeTitle: 'السعر النهائي الشامل لكامل الطريق',
    guaranteeDesc: 'يشمل السعر الثابت: رسوم الخط السريع، والوقود، وتوقف الميقات، وضريبة القيمة المضافة. الدفع نقداً كاش للسائق بعد الوصول بسلامة الله.',
    recommendedTag: 'الخيار العائلي الأفضل',
  },
  en: {
    badge: 'Holy Cities Intercity Travel',
    title: 'The Hijrah Expressway Experience (Makkah ⇄ Madinah)',
    subtitle: 'A private, seamless intercity transfer directly from your first hotel lobby to your second hotel portico via Route 15, including complimentary Miqat and midway oasis stops.',
    compareTabVip: 'Duyuf Al Rahman VIP Chauffeur',
    compareTabTrain: 'Haramain High-Speed Train',
    compareTabBus: 'Public Buses / Shared Taxis',
    compareHeaderFeature: 'Journey Comparison',
    compareHeaderVip: 'Duyuf Al Rahman VIP Chauffeur',
    compareHeaderTrain: 'Haramain High-Speed Train',
    compareHeaderBus: 'Public Buses / Shared Taxis',
    features: [
      {
        name: 'Pick-up & Drop-off Points',
        vip: 'Direct hotel lobby to hotel lobby (True Door-to-Door)',
        train: 'Requires taxi to station in advance + taxi queue at arrival station',
        bus: 'Remote public bus terminals away from Central Haram hotels',
      },
      {
        name: 'Miqat Stop (Dhu al-Hulayfah / Bir Ali)',
        vip: 'Dedicated 45-min complimentary stop for Ihram prayers and niyyah',
        train: 'Train does not stop at the Miqat station for passengers',
        bus: 'Crowded, rushed stop with zero family privacy',
      },
      {
        name: 'Luggage Capacity & Flexibility',
        vip: 'Complete luggage capacity with zero baggage weigh-ins or extra fees',
        train: 'Strict 1 large suitcase + 1 carry-on per passenger; excess rejected',
        bus: 'Limited cargo hold space and risk of baggage misplacement',
      },
      {
        name: 'Departure Schedule Flexibility',
        vip: 'Depart anytime 24/7 on your schedule; adjusted around your prayers',
        train: 'Fixed departure slots requiring arrival 45 minutes prior',
        bus: 'Fixed schedule with frequent boarding delays',
      },
      {
        name: 'Family Privacy & Elderly Care',
        vip: '100% private sanitized cabin dedicated exclusively to your family',
        train: 'Shared public rail coaches with strangers',
        bus: 'Crowded public coach, strenuous for elderly pilgrims and children',
      },
      {
        name: 'Payment Terms & Security',
        vip: '100% Cash to Driver on arrival — 0% upfront deposit or card lock',
        train: 'Strict non-refundable advance credit card payment',
        bus: 'Advance non-refundable ticket purchase',
      },
    ],
    milestonesTitle: 'Hijrah Expressway Milestones & Oasis Schedule',
    milestonesSubtitle: 'A smooth, scenic 420 km highway transit thoughtfully structured for optimal rest, prayer, and spiritual serenity:',
    milestones: [
      {
        num: '01',
        title: 'Private Hotel Lobby Departure',
        subtitle: 'Luggage loading, cabin climate pre-cool, and travel prayer',
        desc: 'Your uniformed chauffeur arrives on time at your hotel portico, handles all bags, and starts the journey with travel prayers and chilled Zamzam water.',
        highlight: 'Lobby Curbside Departure',
      },
      {
        num: '02',
        title: 'Miqat Dhu al-Hulayfah (Bir Ali) Stop',
        subtitle: 'Dedicated for Madinah to Makkah Umrah pilgrims',
        desc: 'A relaxed 45-minute stop at the historical Miqat Mosque to perform ghusl, wear the Ihram garments, pray two raka’at, and make the sacred intention.',
        highlight: 'Complimentary Miqat Stop',
      },
      {
        num: '03',
        title: 'Wadi Qudaid / SASCO Palm Oasis Break',
        subtitle: 'Highway midpoint (KM 210)',
        desc: 'A refreshing family pause at a modern, clean rest complex featuring air-conditioned prayer halls, family restrooms, and coffee venues (Barn’s, Costa).',
        highlight: 'Pristine Highway Oasis',
      },
      {
        num: '04',
        title: 'Direct Hotel Portico Drop-off',
        subtitle: 'Luggage porterage and safe delivery to reception',
        desc: 'Smooth curbside delivery at your central destination hotel facing the Holy Mosque. Chauffeur unloads all luggage into the hotel lobby.',
        highlight: 'Door-to-Door Drop-off',
      },
    ],
    fleetTitle: 'Executive Long-Distance Highway Fleet',
    fleetSubtitle: 'Acoustically insulated, long-wheelbase luxury vehicles designed for 400+ km highway cruising:',
    paxLabel: 'Passengers',
    bagsLabel: 'Standard Luggage',
    sarLabel: 'SAR',
    fixedFareLabel: 'Fixed Total Route Fare',
    bookNowButton: 'Book This Route Now',
    guaranteeBadge: 'Duyuf Al Rahman VIP Guarantee',
    guaranteeTitle: 'All-Inclusive Intercity Fare Guarantee',
    guaranteeDesc: 'Total quoted rate covers all fuel, expressway tolls, Miqat waiting time, and taxes. Pay cash to driver upon safe hotel arrival in SAR or USD.',
    recommendedTag: 'Top Family Choice',
  },
  ms: {
    badge: 'Perjalanan Antara Dua Kota Suci',
    title: 'Pengalaman Lebuhraya Hijrah (Makkah ⇄ Madinah)',
    subtitle: 'Perjalanan peribadi dari lobi hotel pertama ke lobi hotel kedua melalui Laluan 15 dengan hentian Miqat dan rehat berhawa dingin.',
    compareTabVip: 'Pemandu Khas Duyuf Al Rahman VIP',
    compareTabTrain: 'Kereta Api Laju Haramain',
    compareTabBus: 'Bas Awam / Teksi Kongsi',
    compareHeaderFeature: 'Perbandingan Perjalanan',
    compareHeaderVip: 'Pemandu Khas Duyuf Al Rahman VIP',
    compareHeaderTrain: 'Kereta Api Laju Haramain',
    compareHeaderBus: 'Bas Awam / Teksi Kongsi',
    features: [
      {
        name: 'Lokasi Pengambilan & Penghantaran',
        vip: 'Terus dari lobi hotel ke lobi hotel (Pintu ke Pintu)',
        train: 'Perlu teksi ke stesen kereta api dan teksi lain setibanya di sana',
        bus: 'Terminal bas awam yang jauh dari kawasan hotel Masjidil Haram',
      },
      {
        name: 'Hentian Miqat (Bir Ali / Dzul Hulaifah)',
        vip: 'Hentian khas percuma (45 minit) untuk solat Ihram dan niat Umrah',
        train: 'Kereta api tidak berhenti di Miqat untuk jemaah berniat',
        bus: 'Hentian tergesa-gesa tanpa privasi keluarga yang mencukupi',
      },
      {
        name: 'Kapasiti & Had Bagasi',
        vip: 'Muat semua bagasi keluarga dan air Zamzam tanpa had berat',
        train: 'Had ketat 1 beg besar + 1 beg kecil seorang; lebihan ditolak',
        bus: 'Ruang bagasi terhad dan risiko beg tercicir',
      },
      {
        name: 'Fleksibiliti Masa Bertolak',
        vip: 'Bertolak bila-bila masa 24 jam mengikut keselesaan keluarga anda',
        train: 'Jadual waktu tetap yang memerlukan kehadiran 45 minit awal',
        bus: 'Jadual tetap dengan risiko kelewatan',
      },
      {
        name: 'Privasi Keluarga & Penjagaan Warga Emas',
        vip: '100% peribadi untuk keluarga anda tanpa penumpang asing',
        train: 'Koc awam dikongsi bersama penumpang lain',
        bus: 'Bas sesak yang memenatkan untuk warga emas dan anak kecil',
      },
      {
        name: 'Syarat Bayaran & Keselamatan',
        vip: '100% Tunai kepada pemandu selepas selamat tiba — 0% Risiko',
        train: 'Bayaran kad kredit penuh terdahulu tanpa bayaran balik',
        bus: 'Tiket dibayar awal tanpa jaminan keselesaan',
      },
    ],
    milestonesTitle: 'Garis Masa & Hentian Lebuhraya Hijrah',
    milestonesSubtitle: 'Perjalanan 420 km yang disusun rapi untuk keselesaan, solat, dan ketenangan jiwa:',
    milestones: [
      {
        num: '01',
        title: 'Bertolak dari Lobi Hotel',
        subtitle: 'Penyusunan beg dan doa bermusafir',
        desc: 'Pemandu tiba tepat pada masanya di lobi hotel anda, memuatkan semua beg, dan memulakan perjalanan dengan doa musafir dan air Zamzam.',
        highlight: 'Bertolak Dari Hotel',
      },
      {
        num: '02',
        title: 'Hentian Miqat Bir Ali (Dzul Hulaifah)',
        subtitle: 'Khas untuk perjalanan dari Madinah ke Makkah',
        desc: 'Hentian santai 45 minit di Masjid Miqat untuk berwuduk, solat sunat Ihram, dan melafazkan niat Umrah dengan tenang.',
        highlight: 'Hentian Miqat Percuma',
      },
      {
        num: '03',
        title: 'Rehat di Oasis Wadi Qudaid / SASCO Palm',
        subtitle: 'Pertengahan lebuhraya (KM 210)',
        desc: 'Hentian selesa di kawasan rehat moden berhawa dingin lengkap dengan surau, tandas bersih, dan kedai kopi.',
        highlight: 'Kawasan Rehat Selesa',
      },
      {
        num: '04',
        title: 'Tiba di Lobi Hotel Destinasi Anda',
        subtitle: 'Penghantaran beg terus ke kaunter penyambut tetamu',
        desc: 'Tiba dengan selamat di hotel anda berhampiran Masjidil Haram atau Masjid Nabawi dengan bantuan memunggah beg sepenuhnya.',
        highlight: 'Dari Pintu ke Pintu',
      },
    ],
    fleetTitle: 'Armada Perjalanan Jauh Makkah - Madinah',
    fleetSubtitle: 'Kenderaan mewah berhawa dingin tinggi dengan penebat bunyi untuk perjalanan 400+ km:',
    paxLabel: 'Penumpang',
    bagsLabel: 'Bagasi Besar',
    sarLabel: 'SAR',
    fixedFareLabel: 'Harga Tetap Satu Kenderaan',
    bookNowButton: 'Tempah Laluan Ini Sekarang',
    guaranteeBadge: 'Jaminan Duyuf Al Rahman VIP',
    guaranteeTitle: 'Harga Tetap Termasuk Semua',
    guaranteeDesc: 'Harga merangkumi tol lebuhraya, minyak, masa menunggu di Miqat, dan cukai. Bayar tunai kepada pemandu semasa tiba.',
    recommendedTag: 'Pilihan Keluarga Terbaik',
  },
  id: {
    badge: 'Perjalanan Antara Dua Kota Suci',
    title: 'Pengalaman Jalan Tol Hijrah (Makkah ⇄ Madinah)',
    subtitle: 'Perjalanan privat nyaman langsung dari lobi hotel pertama ke lobi hotel kedua via Rute 15, termasuk transit Miqat dan rest area ber-AC.',
    compareTabVip: 'Sopir Privat Duyuf Al Rahman VIP',
    compareTabTrain: 'Kereta Cepat Haramain',
    compareTabBus: 'Bus Rombongan / Taksi Umum',
    compareHeaderFeature: 'Perbandingan Perjalanan',
    compareHeaderVip: 'Sopir Privat Duyuf Al Rahman VIP',
    compareHeaderTrain: 'Kereta Cepat Haramain',
    compareHeaderBus: 'Bus Rombongan / Taksi Umum',
    features: [
      {
        name: 'Titik Jemput & Antar',
        vip: 'Langsung lobi hotel ke lobi hotel (Door-to-Door Sejati)',
        train: 'Harus naik taksi ke stasiun + antre taksi lagi setibanya di stasiun tujuan',
        bus: 'Terminal bus umum yang jauh dari hotel ring 1 Masjidil Haram',
      },
      {
        name: 'Transit Miqat (Bir Ali / Dzulhulaifah)',
        vip: 'Transit gratis 45 menit untuk salat sunah ihram, mandi, dan niat Umrah',
        train: 'Kereta cepat tidak berhenti di Miqat untuk berniat',
        bus: 'Transit tergesa-gesa dan antrean toilet yang sangat padat',
      },
      {
        name: 'Kapasitas & Batas Koper',
        vip: 'Bawa semua koper keluarga, stroller, dan air Zamzam tanpa biaya tambahan',
        train: 'Dibatasi ketat 1 koper besar + 1 tas jinjing; kelebihan bagasi ditolak',
        bus: 'Bagasi terbatas dan risiko koper tertukar',
      },
      {
        name: 'Fleksibilitas Waktu Berangkat',
        vip: 'Berangkat kapan saja 24 jam sesuai kenyamanan keluarga Anda',
        train: 'Jadwal kaku yang mengharuskan hadir 45 menit sebelum jadwal',
        bus: 'Jadwal tetap dan sering terjadi keterlambatan',
      },
      {
        name: 'Kenyamanan Lansia & Anak-anak',
        vip: '100% kabin privat bersih khusus keluarga Anda tanpa orang asing',
        train: 'Gerbong kereta umum bercampur penumpang lain',
        bus: 'Bus umum penuh sesak yang melelahkan bagi jamaah lansia',
      },
      {
        name: 'Metode Pembayaran & Keamanan',
        vip: '100% Bayar Cash ke sopir saat tiba di hotel — 0% Risiko',
        train: 'Wajib bayar lunas kartu kredit di awal tanpa pengembalian',
        bus: 'Beli tiket di awal tanpa jaminan kenyamanan',
      },
    ],
    milestonesTitle: 'Rangkaian Perjalanan & Titik Transit Tol Hijrah',
    milestonesSubtitle: 'Perjalanan 420 km yang tertata nyaman untuk ibadah, istirahat, dan ketenangan jiwa:',
    milestones: [
      {
        num: '01',
        title: 'Berangkat dari Lobi Hotel',
        subtitle: 'Pemuatan koper dan doa safar',
        desc: 'Sopir tiba tepat waktu di depan lobi hotel, membantu mengangkat seluruh koper, dan memulai perjalanan dengan doa safar dan air Zamzam dingin.',
        highlight: 'Jemput Langsung di Lobi',
      },
      {
        num: '02',
        title: 'Transit Miqat Bir Ali (Dzulhulaifah)',
        subtitle: 'Khusus rute Madinah menuju Makkah untuk Umrah',
        desc: 'Waktu transit longgar 45 menit di Masjid Miqat untuk mengambil wudhu, memakai ihram, salat dua rakaat, dan melafalkan niat Umrah.',
        highlight: 'Transit Miqat Terjadwal',
      },
      {
        num: '03',
        title: 'Istirahat di Rest Area Wadi Qudaid / SASCO Palm',
        subtitle: 'Titik tengah perjalanan (KM 210)',
        desc: 'Istirahat nyaman di rest area modern ber-AC dengan musala bersih, toilet keluarga terawat, serta kedai kopi untuk menyegarkan badan.',
        highlight: 'Rest Area Modern Bersih',
      },
      {
        num: '04',
        title: 'Tiba di Lobi Hotel Tujuan',
        subtitle: 'Bantuan koper langsung sampai meja resepsionis',
        desc: 'Tiba dengan selamat di hotel Anda di kawasan Markaziah Masjidil Haram atau Nabawi. Sopir membantu menurunkan seluruh barang bawaan.',
        highlight: 'Antar Sampai Resepsionis',
      },
    ],
    fleetTitle: 'Armada Tangguh Antar-Kota Makkah - Madinah',
    fleetSubtitle: 'Mobil mewah dengan suspensi empuk dan kedap suara untuk kenyamanan perjalanan 400+ km:',
    paxLabel: 'Penumpang',
    bagsLabel: 'Koper Besar',
    sarLabel: 'SAR',
    fixedFareLabel: 'Tarif Pasti 1 Mobil Penuh',
    bookNowButton: 'Pesan Rute Ini Sekarang',
    guaranteeBadge: 'Jaminan Duyuf Al Rahman VIP',
    guaranteeTitle: 'Harga Pasti Tanpa Biaya Tersembunyi',
    guaranteeDesc: 'Tarif sudah termasuk bensin, tol tol jalan raya, transit Miqat, dan pajak. Bayar cash saat tiba di hotel tujuan.',
    recommendedTag: 'Pilihan Utama Keluarga',
  },
  ur: {
    badge: 'حرمین شریفین کے درمیان سفر',
    title: 'شاہراہ ہجرت ایکسپریس وے کا پرسکون سفر (مکہ مکرمہ ⇄ مدینہ منورہ)',
    subtitle: 'اپنے پہلے ہوٹل کی لابی سے دوسرے ہوٹل کے پورٹیکو تک ہائی وے 15 کے ذریعے براہ راست وی آئی پی سفر، بشمول میقات اور ایئر کنڈیشنڈ ریسٹ ایریا اسٹاپس۔',
    compareTabVip: 'ضیوف الرحمن وی آئی پی ڈرائیور',
    compareTabTrain: 'حرمین ہائی اسپیڈ ٹرین',
    compareTabBus: 'پبلک بسیں اور عام ٹیکسیاں',
    compareHeaderFeature: 'سفر کا موازنہ',
    compareHeaderVip: 'ضیوف الرحمن وی آئی پی ڈرائیور',
    compareHeaderTrain: 'حرمین ہائی اسپیڈ ٹرین',
    compareHeaderBus: 'پبلک بسیں اور عام ٹیکسیاں',
    features: [
      {
        name: 'پک اپ اور ڈراپ آف پوائنٹ',
        vip: 'براہ راست ہوٹل لابی سے ہوٹل لابی (دروازے سے دروازے تک)',
        train: 'اسٹیشن تک جانے اور آمد پر ہوٹل تک پہنچنے کے لیے الگ الگ ٹیکسی کی ضرورت',
        bus: 'حرم کے مرکزی ہوٹلوں سے دور پبلک بس ٹرمینلز',
      },
      {
        name: 'میقات پر حاضری اور احرام (ذی الحلیفہ / بئر علی)',
        vip: 'احرام، نماز اور نیت کے لیے 45 منٹ کا مخصوص مفت قیام',
        train: 'ٹرین معتمرین کے احرام باندھنے کے لیے میقات پر بالکل نہیں رکتی',
        bus: 'ہجوم اور جلدی بازی میں مختصر قیام جس میں فیملی پرائیویسی نہیں ملتی',
      },
      {
        name: 'سامان اور بیگز کی گنجائش',
        vip: 'فیملی کے تمام بھاری بیگز اور آبِ زمزم بغیر کسی وزن کی پابندی کے',
        train: 'فی مسافر صرف 1 بڑا بیگ اور 1 چھوٹا بیگ؛ اضافی سامان سختی سے مسترد',
        bus: 'محدود جگہ اور سامان گم ہونے کا اندیشہ',
      },
      {
        name: 'روانگی کے اوقات میں سہولت',
        vip: '24 گھنٹے میں جب چاہیں اپنی فیملی کی سہولت کے مطابق روانہ ہوں',
        train: 'مخصوص ٹائم ٹیبل جس کے لیے 45 منٹ پہلے اسٹیشن پہنچنا لازمی ہے',
        bus: 'مخصوص اوقات اور اکثر روانگی میں تاخیر',
      },
      {
        name: 'فیملی پرائیویسی اور بزرگوں کی راحت',
        vip: '100% مکمل پرائیویسی صرف آپ کی فیملی کے لیے بغیر کسی اجنبی سواری کے',
        train: 'اجنبی مسافروں کے ساتھ مشترکہ پبلک بوگیاں',
        bus: 'پرہجوم بسیں جو ضعیف زائرین اور بچوں کے لیے بے حد تھکا دینے والی ہیں',
      },
      {
        name: 'ادائیگی کا طریقہ کار اور تحفظ',
        vip: 'ہوٹل بحفاظت پہنچنے کے بعد ڈرائیور کو نقد ادائیگی — 0% پیشگی خطرہ',
        train: 'کریڈٹ کارڈ کے ذریعے پیشگی لازمی ادائیگی جو ناقابلِ واپسی ہوتی ہے',
        bus: 'پہلے سے ٹکٹ کی خریداری بغیر کسی آرام کی ضمانت کے',
      },
    ],
    milestonesTitle: 'شاہراہ ہجرت کے اہم سنگِ میل اور قیام گاہیں',
    milestonesSubtitle: 'مکہ سے مدینہ 420 کلومیٹر کا پرسکون سفر جس میں عبادات اور راحت کا مکمل خیال رکھا گیا ہے:',
    milestones: [
      {
        num: '01',
        title: 'ہوٹل لابی سے باعزت روانگی',
        subtitle: 'سامان لوڈنگ، ٹھنڈا کیبن اور مسنون دعائے سفر',
        desc: 'ڈرائیور مقررہ وقت پر ہوٹل کے پورٹیکو پر حاضر ہوگا، تمام سامان لوڈ کرے گا اور دعائے سفر و آبِ زمزم کے ساتھ سفر شروع ہوگا۔',
        highlight: 'ہوٹل سے براہ راست روانگی',
      },
      {
        num: '02',
        title: 'مسجدِ میقات ذی الحلیفہ (بئر علی) پر قیام',
        subtitle: 'مدینہ منورہ سے مکہ مکرمہ جانے والے معتمرین کے لیے مخصوص',
        desc: 'مسجدِ میقات میں 45 منٹ کا پرسکون قیام تاکہ غسل، احرام کی تبدیلی، دو رکعت نماز اور تلبیہ و نیت سکون سے ادا کی جا سکے۔',
        highlight: 'مفت میقات اسٹاپ',
      },
      {
        num: '03',
        title: 'وادی قدید / ساسکو پام پر طعام و راحت',
        subtitle: 'ہائی وے کا درمیانی مقام (کلومیٹر 210)',
        desc: 'جدید ایئر کنڈیشنڈ ریسٹ ایریا میں قیام جہاں صاف ستھری فیملی واش رومز، کشادہ مسجد اور کیفے کی سہولت موجود ہے۔',
        highlight: 'جدید ایئرکنڈیشنڈ ریسٹ ایریا',
      },
      {
        num: '04',
        title: 'مطلوبہ ہوٹل کی لابی میں محفوظ آمد',
        subtitle: 'دروازے تک رسائی اور سامان کی منتقلی',
        desc: 'مرکزی حرم کے سامنے آپ کے ہوٹل کے گیٹ تک محفوظ رسائی۔ ڈرائیور سامان لابی کے اندر پہنچانے میں مکمل مدد کرے گا۔',
        highlight: 'دروازے سے دروازے تک',
      },
    ],
    fleetTitle: 'مکہ اور مدینہ کے طویل سفر کے لیے بہترین گاڑیاں',
    fleetSubtitle: 'آواز سے محفوظ اور آرام دہ سسپنشن والی لگژری گاڑیاں جو 400+ کلومیٹر کے سفر کو بے حد ہلکا بنا دیتی ہیں:',
    paxLabel: 'مسافر',
    bagsLabel: 'بڑے بیگز',
    sarLabel: 'ریال',
    fixedFareLabel: 'مکمل گاڑی کا طے شدہ کرایہ',
    bookNowButton: 'یہ سفر ابھی بک کریں',
    guaranteeBadge: 'ضیوف الرحمن وی آئی پی ضمانت',
    guaranteeTitle: 'مکمل طے شدہ ریٹ بشمول تمام اخراجات',
    guaranteeDesc: 'کرائے میں فیول، ہائی وے ٹول ٹیکس، میقات پر انتظار اور ٹیکس شامل ہیں۔ ادائیگی پہنچنے پر ڈرائیور کو نقد کریں۔',
    recommendedTag: 'فیملیز کے لیے بہترین انتخاب',
  },
  fr: {
    badge: 'Voyage Interurbain Entre les Lieux Saints',
    title: 'L\'Expérience de l\'Autoroute de l\'Hégire (La Mecque ⇄ Médine)',
    subtitle: 'Transfert privé d\'exception d\'hôtel à hôtel via l\'autoroute 15, incluant l\'arrêt au Miqat et une pause détente climatisée.',
    compareTabVip: 'Chauffeur Privé Duyuf Al Rahman VIP',
    compareTabTrain: 'Train à Grande Vitesse Haramain',
    compareTabBus: 'Autocars Publics / Taxis Partagés',
    compareHeaderFeature: 'Comparatif de Voyage',
    compareHeaderVip: 'Chauffeur Privé Duyuf Al Rahman VIP',
    compareHeaderTrain: 'Train à Grande Vitesse Haramain',
    compareHeaderBus: 'Autocars Publics / Taxis Partagés',
    features: [
      {
        name: 'Prise en charge et Dépose',
        vip: 'Directement de hall d\'hôtel à hall d\'hôtel (Vrai Porte-à-Porte)',
        train: 'Nécessite un taxi vers la gare + file d\'attente taxi à l\'arrivée',
        bus: 'Gares routières éloignées des hôtels du parvis du Haram',
      },
      {
        name: 'Arrêt au Miqat (Bir Ali / Dhu al-Hulayfah)',
        vip: 'Arrêt dédié gratuit de 45 min pour l\'Ihram, prière et formulation de la Niyyah',
        train: 'Le train ne s\'arrête absolument pas au Miqat pour les passagers',
        bus: 'Arrêt express dans la cohue sans intimité familiale',
      },
      {
        name: 'Capacité et Flexibilité des Bagages',
        vip: 'Toutes vos valises familiales et eau de Zamzam sans pesée ni supplément',
        train: 'Strictement limité à 1 grande valise par passager ; surplus refusé',
        bus: 'Soutes encombrées et risque de confusion de bagages',
      },
      {
        name: 'Flexibilité des Horaires',
        vip: 'Départ à l\'heure de votre choix 24h/24 selon le rythme de votre famille',
        train: 'Créneaux fixes contraignants nécessitant 45 min d\'avance',
        bus: 'Horaires fixes avec retards fréquents',
      },
      {
        name: 'Intimité Familiale et Confort Seniors',
        vip: '100% privé dans un habitacle désinfecté réservé à vos proches',
        train: 'Voitures de train partagées avec d\'autres voyageurs',
        bus: 'Car bondé, particulièrement fatigant pour les personnes âgées',
      },
      {
        name: 'Modalités de Paiement & Sérénité',
        vip: '100% Espèces au chauffeur à l\'arrivée — Zéro acompte ni risque carte',
        train: 'Paiement carte en ligne obligatoire et non remboursable',
        bus: 'Achat de billet à l\'avance sans garantie de confort',
      },
    ],
    milestonesTitle: 'Étapes et Oasis de l\'Autoroute de l\'Hégire',
    milestonesSubtitle: 'Un trajet panoramique de 420 km parfaitement orchestré pour le recueillement et le repos :',
    milestones: [
      {
        num: '01',
        title: 'Départ du Hall de Votre Hôtel',
        subtitle: 'Prise en charge des bagages et invocation du voyage',
        desc: 'Votre chauffeur ponctuel charge toutes vos valises et entame la route avec l\'invocation du voyageur et des bouteilles d\'eau de Zamzam fraîches.',
        highlight: 'Départ Personnalisé à l\'Hôtel',
      },
      {
        num: '02',
        title: 'Halte au Miqat de Dhu al-Hulayfah (Bir Ali)',
        subtitle: 'Essentiel pour le trajet de Médine vers La Mecque',
        desc: 'Pause sereine de 45 minutes pour accomplir les ablutions, revêtir l\'Ihram, prier deux raka\'at et prononcer la Talbiyah.',
        highlight: 'Arrêt Miqat Inclus',
      },
      {
        num: '03',
        title: 'Pause Oasis Wadi Qudaid / SASCO Palm',
        subtitle: 'À mi-chemin sur l\'autoroute (KM 210)',
        desc: 'Détente dans un complexe moderne climatisé avec mosquée spacieuse, sanitaires familiaux propres et cafés (Barn\'s, Costa).',
        highlight: 'Oasis Moderne et Propre',
      },
      {
        num: '04',
        title: 'Arrivée au Parvis de Votre Hôtel',
        subtitle: 'Aide complète pour le déchargement des valises',
        desc: 'Arrivée sans encombre devant votre hôtel de destination face au sanctuaire. Règlement en espèces directement au chauffeur.',
        highlight: 'Arrivée Porte-à-Porte',
      },
    ],
    fleetTitle: 'Véhicules Longue Distance La Mecque - Médine',
    fleetSubtitle: 'Berlines et vans grand confort avec insonorisation renforcée pour 400+ km d\'autoroute :',
    paxLabel: 'Passagers',
    bagsLabel: 'Grandes Valises',
    sarLabel: 'SAR',
    fixedFareLabel: 'Tarif Fixe pour Tout le Véhicule',
    bookNowButton: 'Réserver Ce Trajet Maintenant',
    guaranteeBadge: 'Garantie Duyuf Al Rahman VIP',
    guaranteeTitle: 'Tarif Tout Compris Garanti',
    guaranteeDesc: 'Le prix inclut péages, carburant, attente au Miqat et taxes. Paiement en espèces sur place à destination en SAR ou EUR/USD.',
    recommendedTag: 'Idéal pour Familles',
  },
  tr: {
    badge: 'İki Harem Arası Şehirlerarası Seyahat',
    title: 'Hicret Otoyolu VIP Deneyimi (Mekke-i Mükerreme ⇄ Medine-i Münevvere)',
    subtitle: 'İlk otelinizin lobisinden ikinci otelinizin kapısına kadar 15 Nolu Hat üzerinden, Mikat ve dinlenme tesisi molası dahil doğrudan özel transfer.',
    compareTabVip: 'Duyuf Al Rahman VIP Özel Şoför',
    compareTabTrain: 'Haramain Yüksek Hızlı Tren',
    compareTabBus: 'Toplu Taşıma Otobüsleri / Paylaşımlı Taksi',
    compareHeaderFeature: 'Yolculuk Karşılaştırması',
    compareHeaderVip: 'Duyuf Al Rahman VIP Özel Şoför',
    compareHeaderTrain: 'Haramain Yüksek Hızlı Tren',
    compareHeaderBus: 'Toplu Taşıma Otobüsleri / Paylaşımlı Taksi',
    features: [
      {
        name: 'Biniş ve İniş Noktası',
        vip: 'Doğrudan otel lobisinden otel lobisine (Gerçek Kapıdan Kapıya)',
        train: 'Önce gara taksiyle gidiş + varış garında otele gitmek için taksi kuyruğu',
        bus: 'Harem otellerinden uzak merkezi otogarlar',
      },
      {
        name: 'Mikat Noktası Molası (Zülhuleyfe / Bir Ali)',
        vip: 'İhram, namaz ve niyet için 45 dakikalık ücretsiz özel mola',
        train: 'Tren yolcuların ihrama girmesi için Mikat istasyonunda durmaz',
        bus: 'Aşırı kalabalık ve aile mahremiyeti olmayan acele duraklama',
      },
      {
        name: 'Bagaj Kapasitesi ve Serbestlik',
        vip: 'Ailenizin tüm büyük bavulları ve Zemzem bidonları ek ücret olmadan taşınır',
        train: 'Yolcu başı kesin 1 büyük bavul sınırı; fazla bagaj trene alınmaz',
        bus: 'Kısıtlı bagaj alanı ve bavul karışma riski',
      },
      {
        name: 'Kalkış Saati Esnekliği',
        vip: 'Günün 24 saati istediğiniz saatte ailenizin rahatına göre kalkış',
        train: '45 dakika önceden garda olmayı gerektiren sabit sefer saatleri',
        bus: 'Sabit saatler ve sıkça yaşanan kalkış gecikmeleri',
      },
      {
        name: 'Aile Mahremiyeti ve Yaşlı Konforu',
        vip: 'Sadece ailenize tahsis edilmiş %100 tertemiz özel VIP kabin',
        train: 'Yabancı yolcularla paylaşılan ortak tren vagonları',
        bus: 'Yaşlılar ve çocuklar için son derece yorucu olan kalabalık otobüs',
      },
      {
        name: 'Ödeme Güvencesi ve Şartlar',
        vip: 'Otele güvenle vardıktan sonra şoföre %100 Nakit Ödeme — Sıfır Risk',
        train: 'Kredi kartıyla zorunlu ön ödeme ve genellikle iadesiz biletler',
        bus: 'Konfor garantisi olmaksızın önceden bilet satın alma',
      },
    ],
    milestonesTitle: 'Hicret Otoyolu Güzergahı ve Durakları',
    milestonesSubtitle: 'Huzur, ibadet ve dinlenme için özenle planlanmış 420 kilometrelik manevi yolculuk:',
    milestones: [
      {
        num: '01',
        title: 'Otel Lobisinden Özel Hareket',
        subtitle: 'Bavul yükleme, serin kabin ve sefer duası',
        desc: 'Şoförünüz tam vaktinde otelinizin kapısında hazır bulunur, bavulları yükler ve yolculuk sefer duası ve soğuk Zemzem suyu ikramıyla başlar.',
        highlight: 'Otelden Doğrudan Kalkış',
      },
      {
        num: '02',
        title: 'Mikat Mescidi Zülhuleyfe (Bir Ali) Molası',
        subtitle: 'Medine\'den Mekke\'ye Umre için gidenlere özel',
        desc: 'Mikat mescidinde abdest tazelemek, ihrama girmek, iki rekat ihram namazı kılmak ve telbiye getirmek için 45 dakikalık rahat mola.',
        highlight: 'Ücretsiz Mikat Molası',
      },
      {
        num: '03',
        title: 'Vadi Kudaid / SASCO Palm Dinlenme Molası',
        subtitle: 'Otoyolun orta noktası (KM 210)',
        desc: 'Geniş mescidi, temiz aile lavaboları ve kaliteli kahve duraklarıyla (Barn\'s, Costa) donatılmış klimalı tesiste ferahlatıcı mola.',
        highlight: 'Klimalı Modern Tesis',
      },
      {
        num: '04',
        title: 'Hedef Otelin Lobisine Güvenli Teslim',
        subtitle: 'Bavulların otel resepsiyonuna kadar taşınması',
        desc: 'Harem-i Şerif\'e bakan otelinizin girişine doğrudan varış. Bavullar indirilir ve ücret şoföre nakit olarak güvenle takdim edilir.',
        highlight: 'Kapıdan Kapıya Teslim',
      },
    ],
    fleetTitle: 'Mekke - Medine Uzun Yolculuk Filosu',
    fleetSubtitle: '400+ km otoyol sürüşü için üstün ses yalıtımlı ve konforlu süspansiyonlu VIP araçlar:',
    paxLabel: 'Yolcu',
    bagsLabel: 'Büyük Bavul',
    sarLabel: 'SAR',
    fixedFareLabel: 'Tüm Araç İçin Sabit Toplam Fiyat',
    bookNowButton: 'Bu Rotayı Hemen Ayırtın',
    guaranteeBadge: 'Duyuf Al Rahman VIP Güvencesi',
    guaranteeTitle: 'Her Şey Dahil Sabit Fiyat',
    guaranteeDesc: 'Fiyata otoyol ücretleri, yakıt, Mikat beklemesi ve vergiler dahildir. Varışta şoföre nakit (SAR veya USD) ödeyebilirsiniz.',
    recommendedTag: 'Aileler İçin En İdeal',
  },
  de: {
    badge: 'Reisen Zwischen Den Heiligen Städten',
    title: 'Das Hijrah-Expressway-Erlebnis (Mekka ⇄ Medina)',
    subtitle: 'Ein erstklassiger privater Transfer direkt von Ihrer ersten Hotellobby zum Eingang Ihres zweiten Hotels über die Route 15, inklusive Miqat-Halt und klimatisierter Rast.',
    compareTabVip: 'Duyuf Al Rahman VIP Chauffeur',
    compareTabTrain: 'Haramain Hochgeschwindigkeitszug',
    compareTabBus: 'Öffentliche Fernbusse',
    compareHeaderFeature: 'Reisevergleich',
    compareHeaderVip: 'Duyuf Al Rahman VIP Chauffeur',
    compareHeaderTrain: 'Haramain Hochgeschwindigkeitszug',
    compareHeaderBus: 'Öffentliche Fernbusse',
    features: [
      {
        name: 'Abhol- und Zielort',
        vip: 'Direkt von Hotellobby zu Hotellobby (Echter Tür-zu-Tür-Service)',
        train: 'Erfordert Taxi zum Bahnhof + Taxiwarteschlange am Zielbahnhof',
        bus: 'Öffentliche Busbahnhöfe weit entfernt von den zentralen Haram-Hotels',
      },
      {
        name: 'Miqat-Halt (Dhu al-Hulayfah / Bir Ali)',
        vip: 'Kostenloser 45-minütiger Halt für Ihram-Gebete und Absicht',
        train: 'Der Zug hält nicht am Miqat für Pilgerabsichten',
        bus: 'Hektischer, überfüllter Halt ohne Privatsphäre für Familien',
      },
      {
        name: 'Gepäckkapazität & Flexibilität',
        vip: 'Ihr gesamtes Familiengepäck und Zamzam-Wasser ohne Begrenzung',
        train: 'Strenge Begrenzung: 1 Koffer pro Person; Übergepäck abgelehnt',
        bus: 'Begrenzter Frachtraum und Risiko von Gepäckverlust',
      },
      {
        name: 'Flexible Abfahrtszeiten',
        vip: 'Abfahrt rund um die Uhr ganz nach Ihrem persönlichen Wunsch',
        train: 'Feste Fahrpläne mit zwingender Ankunft 45 Minuten vor Abfahrt',
        bus: 'Starrer Fahrplan mit häufigen Verspätungen',
      },
      {
        name: 'Familien-Privatsphäre & Seniorenkomfort',
        vip: '100% private, klimatisierte Kabine exklusiv für Ihre Familie',
        train: 'Geteilte öffentliche Waggons mit fremden Fahrgästen',
        bus: 'Überfüllte Busse, extrem anstrengend für ältere Pilger',
      },
      {
        name: 'Zahlungsmodalitäten & Sicherheit',
        vip: '100% Barzahlung beim Fahrer bei Ankunft — 0% Risiko',
        train: 'Nicht erstattungsfähige Kreditkarten-Vorauszahlung',
        bus: 'Vorausbuchung ohne Komfortgarantie',
      },
    ],
    milestonesTitle: 'Stationen des Hijrah-Expressway',
    milestonesSubtitle: 'Eine ruhige 420-km-Reise, optimal gegliedert für Entspannung, Gebet und Andacht:',
    milestones: [
      {
        num: '01',
        title: 'Abfahrt an Ihrer Hotellobby',
        subtitle: 'Gepäckverladung und Reisegebet',
        desc: 'Ihr pünktlicher Chauffeur lädt Ihr gesamtes Gepäck ein und beginnt die Fahrt mit Reisegebeten und gekühltem Zamzam-Wasser.',
        highlight: 'Direkte Hotelabfahrt',
      },
      {
        num: '02',
        title: 'Halt am Miqat Dhu al-Hulayfah (Bir Ali)',
        subtitle: 'Speziell für Pilger von Medina nach Mekka',
        desc: '45 Minuten entspannter Aufenthalt an der Miqat-Moschee zum Vorbereiten des Ihram, Beten von zwei Raka’at und Fassen der Absicht.',
        highlight: 'Inklusiver Miqat-Halt',
      },
      {
        num: '03',
        title: 'Rast in der Oase Wadi Qudaid / SASCO Palm',
        subtitle: 'Halbzeit auf der Autobahn (KM 210)',
        desc: 'Erfrischende Pause an einer modernen Raststätte mit klimatisierter Moschee, sauberen Familien-WCs und Kaffeeshops.',
        highlight: 'Moderne klimatisierte Oase',
      },
      {
        num: '04',
        title: 'Ankunft an der Lobby Ihres Zielhotels',
        subtitle: 'Gepäckhilfe bis zur Hotelrezeption',
        desc: 'Bequeme Vorfahrt direkt am Eingang Ihres Zielhotels mit Blick auf den Haram. Bezahlung bar beim Chauffeur.',
        highlight: 'Tür-zu-Tür-Ankunft',
      },
    ],
    fleetTitle: 'Fernreiseflotte Mekka - Medina',
    fleetSubtitle: 'Schallisolierte Premiumfahrzeuge mit komfortabler Federung für 400+ km Autobahn:',
    paxLabel: 'Passagiere',
    bagsLabel: 'Große Koffer',
    sarLabel: 'SAR',
    fixedFareLabel: 'Festpreis für das gesamte Fahrzeug',
    bookNowButton: 'Diesen Transfer jetzt buchen',
    guaranteeBadge: 'Duyuf Al Rahman VIP Garantie',
    guaranteeTitle: 'All-Inclusive-Festpreis',
    guaranteeDesc: 'Mautgebühren, Treibstoff, Miqat-Wartezeit und Steuern sind vollständig abgedeckt. Barzahlung vor Ort.',
    recommendedTag: 'Beste Wahl für Familien',
  },
  es: {
    badge: 'Viaje Entre Las Ciudades Santas',
    title: 'La Experiencia de la Autovía Hijrah (La Meca ⇄ Medina)',
    subtitle: 'Un traslado privado de lujo directamente desde el lobby de su primer hotel hasta la puerta de su segundo hotel por la Ruta 15, con parada en Miqat y descanso climatizado.',
    compareTabVip: 'Chófer Privado Duyuf Al Rahman VIP',
    compareTabTrain: 'Tren de Alta Velocidad Haramain',
    compareTabBus: 'Autobuses Públicos / Taxis Compartidos',
    compareHeaderFeature: 'Comparativa de Viaje',
    compareHeaderVip: 'Chófer Privado Duyuf Al Rahman VIP',
    compareHeaderTrain: 'Tren de Alta Velocidad Haramain',
    compareHeaderBus: 'Autobuses Públicos / Taxis Compartidos',
    features: [
      {
        name: 'Puntos de Salida y Llegada',
        vip: 'Directo de lobby de hotel a lobby de hotel (Puerta a Puerta real)',
        train: 'Requiere taxi a la estación + cola de taxis en la estación de llegada',
        bus: 'Estaciones de autobuses públicas alejadas de los hoteles del Haram',
      },
      {
        name: 'Parada en el Miqat (Bir Ali / Dhu al-Hulayfah)',
        vip: 'Parada gratuita de 45 minutos para el rezo de Ihram y la formulación de la Niyyah',
        train: 'El tren no se detiene en el Miqat para que los peregrinos vistan el Ihram',
        bus: 'Parada apresurada sin privacidad familiar adecuada',
      },
      {
        name: 'Capacidad de Equipaje y Flexibilidad',
        vip: 'Todo el equipaje familiar y agua Zamzam sin restricciones de peso',
        train: 'Estrictamente 1 maleta grande por pasajero; exceso rechazado',
        bus: 'Espacio limitado en maletero y riesgo de pérdida',
      },
      {
        name: 'Flexibilidad de Horarios',
        vip: 'Salida en cualquier momento las 24 horas según la comodidad de su familia',
        train: 'Horarios fijos que exigen llegar con 45 minutos de antelación',
        bus: 'Horarios fijos con retrasos habituales',
      },
      {
        name: 'Privacidad Familiar y Confort',
        vip: '100% privado en cabina higienizada para su familia sin extraños',
        train: 'Vagones públicos compartidos con otros pasajeros',
        bus: 'Autobús abarrotado, muy agotador para personas mayores y niños',
      },
      {
        name: 'Condiciones de Pago y Seguridad',
        vip: '100% en Efectivo al chófer a la llegada — 0% Riesgo de adelanto',
        train: 'Pago con tarjeta anticipado obligatorio no reembolsable',
        bus: 'Compra anticipada sin garantía de confort',
      },
    ],
    milestonesTitle: 'Etapas y Descansos de la Autovía Hijrah',
    milestonesSubtitle: 'Un viaje panorámico de 420 km organizado para el rezo, el descanso y la tranquilidad espiritual:',
    milestones: [
      {
        num: '01',
        title: 'Salida desde su Hotel',
        subtitle: 'Carga de equipaje y oración del viajero',
        desc: 'Su chófer llega puntual al hotel, guarda las maletas y comienza el viaje con oraciones y agua Zamzam fría.',
        highlight: 'Salida Directa del Hotel',
      },
      {
        num: '02',
        title: 'Parada en el Miqat de Bir Ali (Dhu al-Hulayfah)',
        subtitle: 'Especial para el viaje de Medina a La Meca',
        desc: 'Pausa relajada de 45 minutos en la mezquita del Miqat para realizar ablución, vestir el Ihram y hacer la intención de Umrah.',
        highlight: 'Parada de Miqat Incluida',
      },
      {
        num: '03',
        title: 'Descanso en el Oasis Wadi Qudaid / SASCO Palm',
        subtitle: 'Mitad del camino (KM 210)',
        desc: 'Pausa reconfortante en un área de servicio moderna con mezquita climatizada, baños familiares y cafeterías.',
        highlight: 'Oasis Climatizado Moderno',
      },
      {
        num: '04',
        title: 'Llegada al Lobby de su Hotel Destino',
        subtitle: 'Asistencia con maletas hasta la recepción',
        desc: 'Llegada directa frente a su hotel con vistas a la Mezquita Sagrada. Pago en efectivo al chófer.',
        highlight: 'Servicio Puerta a Puerta',
      },
    ],
    fleetTitle: 'Flota de Larga Distancia La Meca - Medina',
    fleetSubtitle: 'Vehículos VIP con aislamiento acústico y suspensión suave para 400+ km de carretera:',
    paxLabel: 'Pasajeros',
    bagsLabel: 'Maletas Grandes',
    sarLabel: 'SAR',
    fixedFareLabel: 'Tarifa Fija por Vehículo Completo',
    bookNowButton: 'Reservar Este Trayecto Ahora',
    guaranteeBadge: 'Garantía Duyuf Al Rahman VIP',
    guaranteeTitle: 'Precio Fijo Todo Incluido',
    guaranteeDesc: 'Peajes, gasolina, espera en Miqat e impuestos incluidos. Pago en efectivo a la llegada.',
    recommendedTag: 'La Mejor Opción Familiar',
  },
  hi: {
    badge: 'दो पवित्र शहरों के बीच यात्रा',
    title: 'हिज्रह एक्सप्रेसवे यात्रा अनुभव (मक्का ⇄ मदीना)',
    subtitle: 'आपके पहले होटल की लॉबी से दूसरे होटल तक रूट 15 के माध्यम से सीधी निजी वीआईपी यात्रा, जिसमें मिक़ात और वातानुकूलित विश्राम स्थल शामिल हैं।',
    compareTabVip: 'दुयूफ़ अल-रहमान वीआईपी निजी ड्राइवर',
    compareTabTrain: 'हरमैन हाई-स्पीड ट्रेन',
    compareTabBus: 'सार्वजनिक बसें / साझा टैक्सियां',
    compareHeaderFeature: 'यात्रा की तुलना',
    compareHeaderVip: 'दुयूफ़ अल-रहमान वीआईपी निजी ड्राइवर',
    compareHeaderTrain: 'हरमैन हाई-स्पीड ट्रेन',
    compareHeaderBus: 'सार्वजनिक बसें / साझा टैक्सियां',
    features: [
      {
        name: 'पिक-अप और ड्रॉप-ऑफ बिंदु',
        vip: 'सीधे होटल लॉबी से होटल लॉबी तक (वास्तविक द्वार-से-द्वार सेवा)',
        train: 'स्टेशन जाने के लिए अलग टैक्सी + आगमन पर होटल जाने के लिए टैक्सी कतार',
        bus: 'हरम के केंद्रीय होटलों से दूर सार्वजनिक बस अड्डे',
      },
      {
        name: 'मिक़ात ठहराव (ज़ुल हुलैफ़ा / बीर अली)',
        vip: 'एहराम, नमाज़ और नीयत के लिए 45 मिनट का निःशुल्क विशेष ठहराव',
        train: 'ट्रेन यात्रियों के एहराम बांधने के लिए मिक़ात पर नहीं रुकती',
        bus: 'भीड़भाड़ वाला संक्षिप्त ठहराव जहां पारिवारिक गोपनीयता नहीं मिलती',
      },
      {
        name: 'सामान की क्षमता और सुविधा',
        vip: 'परिवार के सभी बैग और ज़मज़म पानी बिना किसी अतिरिक्त शुल्क के',
        train: 'प्रति यात्री केवल 1 बड़ा बैग; अतिरिक्त सामान अस्वीकार',
        bus: 'सीमित जगह और सामान खोने का जोखिम',
      },
      {
        name: 'प्रस्थान समय की सुविधा',
        vip: '24 घंटे में जब चाहें अपनी सुविधा के अनुसार प्रस्थान करें',
        train: 'निश्चित समय सारणी जिसके लिए 45 मिनट पहले पहुंचना अनिवार्य है',
        bus: 'निश्चित समय और अक्सर प्रस्थान में देरी',
      },
      {
        name: 'पारिवारिक गोपनीयता और बुजुर्गों का आराम',
        vip: 'अजनबियों के बिना केवल आपके परिवार के लिए 100% निजी केबिन',
        train: 'अन्य यात्रियों के साथ साझा सार्वजनिक डिब्बे',
        bus: 'भीड़भाड़ वाली बसें, जो बुजुर्गों और बच्चों के लिए अत्यधिक थकाऊ हैं',
      },
      {
        name: 'भुगतान और वित्तीय सुरक्षा',
        vip: 'होटल पहुंचने पर ड्राइवर को 100% नकद भुगतान — 0% जोखिम',
        train: 'क्रेडिट कार्ड द्वारा अनिवार्य अग्रिम भुगतान जो वापस नहीं होता',
        bus: 'बिना किसी आराम की गारंटी के अग्रिम टिकट खरीद',
      },
    ],
    milestonesTitle: 'हिज्रह एक्सप्रेसवे के मुख्य पड़ाव',
    milestonesSubtitle: 'इबादत और आराम के लिए सुव्यवस्थित 420 किलोमीटर की आध्यात्मिक यात्रा:',
    milestones: [
      {
        num: '01',
        title: 'होटल लॉबी से प्रस्थान',
        subtitle: 'सामान लोड करना और सफ़र की दुआ',
        desc: 'ड्राइवर समय पर होटल के द्वार पर पहुंचता है, सामान रखता है और सफ़र की दुआ व ठंडे ज़मज़म पानी के साथ यात्रा शुरू होती है।',
        highlight: 'होटल से सीधी रवानगी',
      },
      {
        num: '02',
        title: 'मस्जिद-ए-मिक़ात ज़ुल हुलैफ़ा (बीर अली) पर ठहराव',
        subtitle: 'मदीना से मक्का जाने वाले उमराह यात्रियों के लिए',
        desc: 'मस्जिद-ए-मिक़ात में 45 मिनट का शांत ठहराव ताकि वुज़ू, एहराम, दो रकअत नमाज़ और नीयत आसानी से पूरी हो सके।',
        highlight: 'निःशुल्क मिक़ात ठहराव',
      },
      {
        num: '03',
        title: 'वादी क़ुदैद / सास्को पाम विश्राम स्थल',
        subtitle: 'राजमार्ग का मध्य बिंदु (किमी 210)',
        desc: 'आधुनिक वातानुकूलित विश्राम क्षेत्र में ठहराव जहां साफ पारिवारिक शौचालय, विशाल नमाज़ हॉल और कैफे उपलब्ध हैं।',
        highlight: 'आधुनिक वातानुकूलित पड़ाव',
      },
      {
        num: '04',
        title: 'गंतव्य होटल की लॉबी में आगमन',
        subtitle: 'सामान सहित रिसेप्शन तक सीधी पहुंच',
        desc: 'हरम के सामने आपके होटल तक सुरक्षित पहुंच। ड्राइवर सामान उतारने में पूरी मदद करता है और नकद भुगतान लिया जाता है।',
        highlight: 'द्वार से द्वार तक सेवा',
      },
    ],
    fleetTitle: 'मक्का - मदीना लंबी दूरी के लिए अधिकृत वाहन',
    fleetSubtitle: 'आरामदायक सस्पेंशन और शांत केबिन वाली गाड़ियां जो 400+ किमी के सफर को बेहद हल्का बना देती हैं:',
    paxLabel: 'यात्री',
    bagsLabel: 'बड़े सूटकेस',
    sarLabel: 'SAR',
    fixedFareLabel: 'वाहन का कुल निश्चित किराया',
    bookNowButton: 'यह यात्रा अभी बुक करें',
    guaranteeBadge: 'दुयूफ़ अल-रहमान वीआईपी गारंटी',
    guaranteeTitle: 'सब कुछ शामिल निश्चित किराया',
    guaranteeDesc: 'किराए में टोल टैक्स, ईंधन, मिक़ात पर प्रतीक्षा और कर शामिल हैं। होटल पहुंचने पर नकद भुगतान करें।',
    recommendedTag: 'परिवार के लिए सर्वोत्तम',
  },
};

export function IntercityRouteExperience({
  locale,
  slug,
  minPriceSAR = 400,
  rates = {},
}: IntercityRouteExperienceProps) {
  const [activeCompareTab, setActiveCompareTab] = useState<'vip' | 'train' | 'bus'>('vip');
  const t = TRANSLATIONS[locale] || TRANSLATIONS.en;
  const isRtl = locale === 'ar' || locale === 'ur';

  // Authoritative database rates for intercity routes
  const stariaPrice = rates['staria'] || 550;
  const yukonPrice = rates['yukon'] || 750;
  const hiacePrice = rates['hiace'] || 750;
  const maybachPrice = rates['maybach'] || 1800;

  const highwayFleet = [
    {
      id: 'staria',
      name: locale === 'ar' ? 'هيونداي ستاريا VIP' : 'Hyundai Staria VIP',
      category: locale === 'ar' ? 'فان عائلي فاخر' : 'Luxury Family Van',
      image: '/assets/images/studio-2k/hyundai-staria-studio-2k.webp',
      pax: 6,
      bags: 4,
      price: stariaPrice,
      isRecommended: true,
    },
    {
      id: 'yukon',
      name: locale === 'ar' ? 'جي إم سي يوكن XL برستيج' : 'GMC Yukon XL Prestige',
      category: locale === 'ar' ? 'دفع رباعي رئاسي' : 'Presidential SUV',
      image: '/assets/images/studio-2k/gmc-yukon-studio-2k.webp',
      pax: 6,
      bags: 6,
      price: yukonPrice,
      isRecommended: false,
    },
    {
      id: 'hiace',
      name: locale === 'ar' ? 'تويوتا هاي إيس VIP' : 'Toyota HiAce Family Van',
      category: locale === 'ar' ? 'فان عائلي كبير' : 'Executive Minibus',
      image: '/assets/images/studio-2k/toyota-hiace-studio-2k.webp',
      pax: 10,
      bags: 8,
      price: hiacePrice,
      isRecommended: false,
    },
    {
      id: 'maybach',
      name: locale === 'ar' ? 'مرسيدس مايباخ S-Class' : 'Mercedes-Maybach S-Class',
      category: locale === 'ar' ? 'ملكي فئة أولى' : 'Royal First Class',
      image: '/assets/images/studio-2k/mercedes-s-class-studio-2k.webp',
      pax: 3,
      bags: 3,
      price: maybachPrice,
      isRecommended: false,
    },
  ];

  return (
    <section className="mt-8 mb-16 relative" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>{t.badge}</span>
        </div>
        <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-tight mb-3">
          {t.title}
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
          {t.subtitle}
        </p>
      </div>

      {/* 1. FACTUAL INTERCITY TRANSPORT COMPARISON MATRIX */}
      <div className="bg-[#101725] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl mb-12 overflow-hidden">
        <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
          <div>
            <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">
              Objective Travel Analysis
            </span>
            <h3 className="font-display font-black text-lg sm:text-xl text-white">
              {t.compareHeaderFeature}
            </h3>
          </div>

          {/* MOBILE TABS */}
          <div className="flex md:hidden p-1 bg-[#141D2C] rounded-xl border border-white/5 w-full">
            <button
              onClick={() => setActiveCompareTab('vip')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeCompareTab === 'vip'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B38F2B] text-[#0A0A0C]'
                  : 'text-slate-400'
              }`}
            >
              Duyuf VIP
            </button>
            <button
              onClick={() => setActiveCompareTab('train')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeCompareTab === 'train'
                  ? 'bg-[#D4AF37]/20 text-[#D4AF37]'
                  : 'text-slate-400'
              }`}
            >
              Haramain Train
            </button>
            <button
              onClick={() => setActiveCompareTab('bus')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeCompareTab === 'bus'
                  ? 'bg-[#D4AF37]/20 text-[#D4AF37]'
                  : 'text-slate-400'
              }`}
            >
              Public Bus
            </button>
          </div>
        </div>

        {/* COMPARISON TABLE */}
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-start border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#141D2C] text-slate-300 border-b border-white/10">
                <th className="py-4 px-4 sm:px-6 font-bold uppercase tracking-wider text-start">
                  Criterion
                </th>
                <th className="py-4 px-4 sm:px-6 font-extrabold text-[#D4AF37] bg-[#D4AF37]/10 text-start">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>{t.compareHeaderVip}</span>
                  </div>
                </th>
                <th className="py-4 px-4 sm:px-6 font-semibold text-slate-300 text-start hidden md:table-cell">
                  {t.compareHeaderTrain}
                </th>
                <th className="py-4 px-4 sm:px-6 font-semibold text-slate-400 text-start hidden md:table-cell">
                  {t.compareHeaderBus}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {t.features.map((feat, idx) => (
                <tr
                  key={idx}
                  className={`${idx % 2 === 0 ? 'bg-[#101725]' : 'bg-[#141D2C]/40'} hover:bg-white/5 transition-colors`}
                >
                  <td className="py-4 px-4 sm:px-6 font-bold text-white whitespace-nowrap">
                    {feat.name}
                  </td>

                  {/* VIP COLUMN */}
                  <td className="py-4 px-4 sm:px-6 bg-[#D4AF37]/5 text-slate-200 font-medium">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>{feat.vip}</span>
                    </div>
                  </td>

                  {/* TRAIN COLUMN */}
                  <td className="py-4 px-4 sm:px-6 text-slate-400 font-light hidden md:table-cell">
                    {feat.train}
                  </td>

                  {/* BUS COLUMN */}
                  <td className="py-4 px-4 sm:px-6 text-slate-500 font-light hidden md:table-cell">
                    {feat.bus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. HIJRAH EXPRESSWAY 4-STAGE MILESTONES */}
      <div className="bg-[#101725] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl mb-12 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-widest block">
            Sacred Expressway Journey
          </span>
          <h3 className="font-display font-black text-xl sm:text-2xl text-white">
            {t.milestonesTitle}
          </h3>
          <p className="text-xs text-slate-400 font-light">
            {t.milestonesSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {t.milestones.map((m, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#141D2C] border border-white/5 space-y-3 relative overflow-hidden group hover:border-[#D4AF37]/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-9 h-9 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] font-black text-xs flex items-center justify-center">
                    {m.num}
                  </span>
                  <span className="text-[10px] font-bold text-[#D4AF37] px-2 py-0.5 rounded-full bg-[#D4AF37]/10">
                    {m.highlight}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-white group-hover:text-[#D4AF37] transition-colors mb-0.5">
                    {m.title}
                  </h4>
                  <span className="text-[11px] text-slate-400 block font-light">
                    {m.subtitle}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  {m.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center gap-1.5 text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider">
                <Coffee className="w-3.5 h-3.5" />
                <span>Executive Rest Facility</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. HIGHWAY FLEET WITH REAL 2K TRANSPARENT CAR IMAGES */}
      <div className="bg-[#101725] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl mb-12 space-y-6">
        <div className="text-center sm:text-start">
          <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">
            Long-Distance Executive Fleet
          </span>
          <h3 className="font-display font-black text-xl sm:text-2xl text-white">
            {t.fleetTitle}
          </h3>
          <p className="text-xs text-slate-400 font-light mt-0.5">
            {t.fleetSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {highwayFleet.map((veh) => (
            <div
              key={veh.id}
              className="bg-[#141D2C] rounded-2xl p-5 border border-white/10 hover:border-[#D4AF37]/60 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4AF37]">
                    {veh.category}
                  </span>
                  {veh.isRecommended && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] font-bold">
                      {t.recommendedTag}
                    </span>
                  )}
                </div>

                <h4 className="font-extrabold text-base text-white group-hover:text-[#D4AF37] transition-colors">
                  {veh.name}
                </h4>

                {/* REAL TRANSPARENT CAR PHOTO */}
                <div className="relative h-44 w-full my-3 flex items-center justify-center overflow-hidden">
                  <Image
                    src={veh.image}
                    alt={veh.name}
                    width={300}
                    height={160}
                    className="object-contain max-h-36 group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)]"
                  />
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-300 py-2 border-y border-white/5">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Users className="w-4 h-4 text-[#D4AF37]" /> {veh.pax} {t.paxLabel}
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <Luggage className="w-4 h-4 text-[#D4AF37]" /> {veh.bags} {t.bagsLabel}
                  </span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between mt-4">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wider">
                    {t.fixedFareLabel}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-[#D4AF37]">
                      {veh.price}
                    </span>
                    <span className="text-xs font-bold text-white">{t.sarLabel}</span>
                  </div>
                </div>

                <Link
                  href={`/${locale}/booking?route=${slug}&vehicle=${veh.id}`}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38F2B] hover:from-[#E5C158] hover:to-[#C49E34] text-[#0A0A0C] text-xs font-extrabold uppercase tracking-wider transition-all shadow-md shadow-[#D4AF37]/20 flex items-center gap-1 active:scale-95"
                >
                  <span>{t.bookNowButton}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. CASH ON ARRIVAL GUARANTEE SHIELD */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#D4AF37]/15 via-[#D4AF37]/5 to-transparent border border-[#D4AF37]/30 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center shrink-0 shadow-lg">
          <Banknote className="w-7 h-7" />
        </div>

        <div className="space-y-1 flex-1 text-center sm:text-start">
          <span className="text-[11px] font-bold tracking-wider text-[#D4AF37] uppercase">
            {t.guaranteeBadge}
          </span>
          <h4 className="text-lg font-bold text-white">{t.guaranteeTitle}</h4>
          <p className="text-xs text-slate-300 font-light leading-relaxed">
            {t.guaranteeDesc}
          </p>
        </div>

        <a
          href={`https://wa.me/966567588261?text=${encodeURIComponent(
            locale === 'ar'
              ? 'السلام عليكم، أود حجز سيارة خاصة وسائق لمسار طريق الهجرة بين مكة المكرمة والمدينة المنورة.'
              : 'Hello, I would like to book a private VIP highway chauffeur between Makkah and Madinah.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap shrink-0"
        >
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>WhatsApp Concierge</span>
        </a>
      </div>
    </section>
  );
}
