import fs from 'fs';
import path from 'path';

const projectRoot = 'D:/royal-umrah-cabs';

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
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Check,
  Plus,
  Minus,
  MessageCircle,
  Building2,
  Compass,
} from 'lucide-react';

interface RoyalHomepageExperienceProps {
  locale: Locale;
  dict: Dictionary;
  settings?: SiteSettings;
  vehicles?: any[];
}

interface TranslationStrings {
  heroTitleTop: string;
  heroTitleGold: string;
  heroSubtitle: string;
  trust247: string;
  trustFlight: string;
  trustWaiting: string;
  planTripPill: string;
  step1: string;
  step2: string;
  step3: string;
  pickupLabel: string;
  pickupPlaceholder: string;
  destLabel: string;
  destPlaceholder: string;
  dateLabel: string;
  timeLabel: string;
  timePlaceholder: string;
  passengersLabel: string;
  searchButton: string;
  cashGuarantee: string;
  errorSelectFields: string;
  errorSameLocation: string;
  locJeddahAirport: string;
  locMakkah: string;
  locMadinahAirport: string;
  locMadinah: string;
  locTaif: string;
  locRiyadh: string;
  fleetEyebrow: string;
  fleetTitle: string;
  fleetSubtitle: string;
  passengersWord: string;
  bagsWord: string;
  fromPricePrefix: string;
  bookNowBtn: string;
  mostPopularTag: string;
  servicesTitle: string;
  servicesSubtitle: string;
  srvAirportTitle: string;
  srvAirportSub: string;
  srvZiyaratTitle: string;
  srvZiyaratSub: string;
  srvIntercityTitle: string;
  srvIntercitySub: string;
  srvHotelTitle: string;
  srvHotelSub: string;
  routesTitle: string;
  routesSubtitle: string;
  route1Title: string;
  route1Time: string;
  route2Title: string;
  route2Time: string;
  route3Title: string;
  route3Time: string;
  whyTitle: string;
  why1: string;
  why2: string;
  why3: string;
  why4: string;
  why5: string;
  faqTitle: string;
  faqSubtitle: string;
  faq1Q: string;
  faq1A: string;
  faq2Q: string;
  faq2A: string;
  faq3Q: string;
  faq3A: string;
  faq4Q: string;
  faq4A: string;
  faq5Q: string;
  faq5A: string;
  faq6Q: string;
  faq6A: string;
  ctaCardTitle: string;
  ctaCardSub: string;
  ctaCardBtn: string;
  chatWithUs: string;
}

const STRINGS: Record<Locale, TranslationStrings> = {
  ar: {
    heroTitleTop: 'احجز رحلتك',
    heroTitleGold: 'الخاصة والفاخرة',
    heroSubtitle: 'استمتع برحلات مريحة وموثوقة وفاخرة تلبي تطلعاتك في جميع أنحاء المملكة العربية السعودية',
    trust247: 'خدمة 24/7',
    trustFlight: 'تتبع الرحلات الجوية',
    trustWaiting: 'انتظار مجاني (حتى 60 دقيقة)',
    planTripPill: 'خطط لرحلتك',
    step1: 'تفاصيل الرحلة',
    step2: 'اختر السيارة',
    step3: 'بياناتك',
    pickupLabel: 'موقع الانطلاق',
    pickupPlaceholder: 'اختر موقع الانطلاق',
    destLabel: 'الوجهة',
    destPlaceholder: 'اختر الوجهة',
    dateLabel: 'تاريخ الرحلة',
    timeLabel: 'الوقت',
    timePlaceholder: 'اختر الوقت',
    passengersLabel: 'الركاب',
    searchButton: 'ابحث عن السيارات',
    cashGuarantee: 'دفع نقدي للسائق بعد الوصول بأمان • شامل كافة الضرائب والرسوم • بدون أي دفع مسبق',
    errorSelectFields: 'يرجى تحديد موقع الانطلاق والوجهة وتاريخ الرحلة.',
    errorSameLocation: 'يرجى اختيار وجهتين مختلفتين.',
    locJeddahAirport: 'مطار جدة (KAIA)',
    locMakkah: 'مكة المكرمة',
    locMadinahAirport: 'مطار المدينة المنورة',
    locMadinah: 'المدينة المنورة',
    locTaif: 'الطائف',
    locRiyadh: 'الرياض',
    fleetEyebrow: 'أسطولنا الفاخر',
    fleetTitle: 'اختر فئة سيارتك',
    fleetSubtitle: 'سافر بأناقة وفخامة مع أسطولنا المتميز من السيارات الحديثة',
    passengersWord: 'ركاب',
    bagsWord: 'حقائب',
    fromPricePrefix: 'من',
    bookNowBtn: 'احجز الآن',
    mostPopularTag: 'الأكثر طلباً',
    servicesTitle: 'خدمات النقل الفاخرة',
    servicesSubtitle: 'حلول نقل متكاملة تلبي كافة احتياجات رحلتك وزياراتك في المملكة',
    srvAirportTitle: 'نقل المطارات',
    srvAirportSub: 'من مطار جدة إلى مكة والمدينة المنورة',
    srvZiyaratTitle: 'رحلات المزارات',
    srvZiyaratSub: 'زيارة المعالم الإسلامية والمشاعر المقدسة',
    srvIntercityTitle: 'التنقل بين المدن',
    srvIntercitySub: 'بين كافة مدن ومحافظات المملكة',
    srvHotelTitle: 'توصيل الفنادق',
    srvHotelSub: 'تنقل مريح وموثوق بين الفنادق والحرم',
    routesTitle: 'أشهر المسارات والأسعار',
    routesSubtitle: 'أسعار ثابتة ومحددة لراحتك بدون تكاليف خفية',
    route1Title: 'مطار جدة ➔ مكة المكرمة',
    route1Time: '60 – 75 دقيقة',
    route2Title: 'مكة المكرمة ➔ المدينة المنورة',
    route2Time: '4 – 5 ساعات',
    route3Title: 'مطار المدينة ➔ فنادق المدينة',
    route3Time: '60 – 90 دقيقة',
    whyTitle: 'لماذا تختار ضيوف الرحمن VIP؟',
    why1: 'أسطول حديث ومعقم بأعلى معايير السلامة',
    why2: 'سائقون محترفون وخبراء بطرق المملكة',
    why3: 'أسعار ثابتة وشفافة بدون أي رسوم خفية',
    why4: 'انتظار مجاني في المطار حتى 60 دقيقة',
    why5: 'خدمة عملاء وكونسيرج على مدار الساعة',
    faqTitle: 'الأسئلة الشائعة',
    faqSubtitle: 'إجابات شاملة عن استفساراتكم حول خدمات النقل وحجز الرحلات',
    faq1Q: 'كيف يمكنني حجز رحلة؟',
    faq1A: 'يمكنك اختيار مسارك وتاريخك ومركبتك عبر الموقع في دقيقة واحدة، أو التواصل مباشرة مع الكونسيرج عبر واتساب.',
    faq2Q: 'ما هي طرق الدفع المتاحة؟',
    faq2A: 'سياستنا قائمة على الدفع النقدي للسائق مباشرة بعد الوصول بأمان إلى وجهتك، دون الحاجة لأي دفع مسبق بالبطاقة.',
    faq3Q: 'كم مدة الانتظار المجانية في المطار؟',
    faq3A: 'نوفر 60 دقيقة انتظار مجاني في صالة القدوم بعد هبوط الطائرة، مع تتبع حي ومباشر لموعد وصول رحلتك الجوية.',
    faq4Q: 'هل يمكنني إلغاء الحجز؟',
    faq4A: 'نعم، الإلغاء مجاني ومرن بالكامل قبل موعد الرحلة بوقت كافٍ دون أي غرامات مالية.',
    faq5Q: 'هل تتوفر مقاعد للأطفال؟',
    faq5A: 'نعم، نوفر مقاعد أطفال آمنة ومريحة مجاناً عند طلبها أثناء تعبئة بيانات الحجز.',
    faq6Q: 'هل تغطي خدماتكم جميع مدن المملكة؟',
    faq6A: 'نعم، نغطي جدة، مكة المكرمة، المدينة المنورة، الرياض، الطائف، وكافة الطرق السريعة بين المدن.',
    ctaCardTitle: 'مستعد لرحلة عمرة يسيرة ومريحة؟',
    ctaCardSub: 'احجز وسيلة نقلك الخاصة الآن واستمتع برحلة هانئة بصحبة عائلتك.',
    ctaCardBtn: 'احجز رحلتك الآن',
    chatWithUs: 'تواصل معنا عبر واتساب',
  },
  en: {
    heroTitleTop: 'Reserve Your',
    heroTitleGold: 'Private Journey',
    heroSubtitle: 'Experience comfortable, reliable, and premium transportation across Saudi Arabia',
    trust247: '24/7 Service',
    trustFlight: 'Flight Tracking',
    trustWaiting: 'Free Waiting (up to 60 min)',
    planTripPill: 'Plan Your Trip',
    step1: 'Trip Details',
    step2: 'Choose Vehicle',
    step3: 'Your Information',
    pickupLabel: 'Pickup Location',
    pickupPlaceholder: 'Select pickup location',
    destLabel: 'Destination',
    destPlaceholder: 'Select destination',
    dateLabel: 'Travel Date',
    timeLabel: 'Time',
    timePlaceholder: 'Select time',
    passengersLabel: 'Passengers',
    searchButton: 'Search Vehicles',
    cashGuarantee: 'Cash payment to driver upon safe arrival • All tolls and taxes included • No advance deposit',
    errorSelectFields: 'Please select pickup location, destination, and travel date.',
    errorSameLocation: 'Please choose two different locations.',
    locJeddahAirport: 'Jeddah Airport (KAIA)',
    locMakkah: 'Makkah',
    locMadinahAirport: 'Madinah Airport',
    locMadinah: 'Madinah',
    locTaif: 'Taif',
    locRiyadh: 'Riyadh',
    fleetEyebrow: 'OUR FLEET',
    fleetTitle: 'Choose Your Class',
    fleetSubtitle: 'Travel in style with our premium fleet',
    passengersWord: 'Passengers',
    bagsWord: 'Bags',
    fromPricePrefix: 'From',
    bookNowBtn: 'Book Now',
    mostPopularTag: 'Most Popular',
    servicesTitle: 'Premium Transportation Services',
    servicesSubtitle: 'Comprehensive transportation solutions for your pilgrimage and travel needs',
    srvAirportTitle: 'Airport Transfers',
    srvAirportSub: 'From Jeddah to Makkah and Madinah',
    srvZiyaratTitle: 'Ziyarat Trips',
    srvZiyaratSub: 'Explore the Holy Sites',
    srvIntercityTitle: 'Intercity Travel',
    srvIntercitySub: 'Across Saudi Arabia',
    srvHotelTitle: 'Hotel Transfers',
    srvHotelSub: 'Comfortable & Reliable',
    routesTitle: 'Popular Routes & Prices',
    routesSubtitle: 'Fixed prices for your convenience',
    route1Title: 'Jeddah Airport ➔ Makkah',
    route1Time: '60 – 75 min',
    route2Title: 'Makkah ➔ Madinah',
    route2Time: '4 – 5 hrs',
    route3Title: 'Madinah Airport ➔ Hotel',
    route3Time: '60 – 90 min',
    whyTitle: 'Why Choose Duyuf Al Rahman VIP?',
    why1: 'Premium & well-maintained fleet',
    why2: 'Professional and courteous drivers',
    why3: 'Transparent pricing',
    why4: 'Complimentary waiting time',
    why5: '24/7 customer support',
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Find answers to common questions about our services',
    faq1Q: 'How to book a trip?',
    faq1A: 'Select your route, date, and preferred vehicle through our booking console or contact our 24/7 concierge directly on WhatsApp.',
    faq2Q: 'What payment methods do you accept?',
    faq2A: 'We strictly operate on cash to the driver upon safe arrival at your destination. No credit card advance payment required.',
    faq3Q: 'What is the waiting time at the airport?',
    faq3A: 'We provide up to 60 minutes of complimentary waiting time after your flight lands, with active flight radar monitoring.',
    faq4Q: 'Can I cancel my booking?',
    faq4A: 'Yes, cancellations are completely free and flexible before your scheduled pickup without any penalties.',
    faq5Q: 'Do you provide child seats?',
    faq5A: 'Yes, certified child safety seats are available free of charge upon request during reservation.',
    faq6Q: 'Do you serve all Saudi cities?',
    faq6A: 'Yes, we provide luxury private transfers between Jeddah, Makkah, Madinah, Riyadh, Taif, and all regional destinations.',
    ctaCardTitle: 'Ready for a Peaceful & Dignified Umrah?',
    ctaCardSub: 'Book your private transportation today and enjoy a seamless journey with your family.',
    ctaCardBtn: 'Book Your Journey',
    chatWithUs: 'Chat with Us',
  },
  ms: {
    heroTitleTop: 'Tempah Perjalanan',
    heroTitleGold: 'Peribadi & Mewah Anda',
    heroSubtitle: 'Alami pengangkutan yang selesa, boleh dipercayai, dan premium di seluruh Arab Saudi',
    trust247: 'Perkhidmatan 24/7',
    trustFlight: 'Penjejakan Penerbangan',
    trustWaiting: 'Menunggu Percuma (sehingga 60 min)',
    planTripPill: 'Rancang Perjalanan Anda',
    step1: 'Butiran Perjalanan',
    step2: 'Pilih Kenderaan',
    step3: 'Maklumat Anda',
    pickupLabel: 'Lokasi Pengambilan',
    pickupPlaceholder: 'Pilih lokasi pengambilan',
    destLabel: 'Destinasi',
    destPlaceholder: 'Pilih destinasi',
    dateLabel: 'Tarikh Perjalanan',
    timeLabel: 'Masa',
    timePlaceholder: 'Pilih masa',
    passengersLabel: 'Penumpang',
    searchButton: 'Cari Kenderaan',
    cashGuarantee: 'Bayaran tunai kepada pemandu selepas selamat tiba • Termasuk tol dan cukai • Tiada deposit',
    errorSelectFields: 'Sila pilih lokasi pengambilan, destinasi, dan tarikh perjalanan.',
    errorSameLocation: 'Sila pilih dua lokasi yang berbeza.',
    locJeddahAirport: 'Lapangan Terbang Jeddah (KAIA)',
    locMakkah: 'Makkah',
    locMadinahAirport: 'Lapangan Terbang Madinah',
    locMadinah: 'Madinah',
    locTaif: 'Taif',
    locRiyadh: 'Riyadh',
    fleetEyebrow: 'ARMADA KAMI',
    fleetTitle: 'Pilih Kelas Anda',
    fleetSubtitle: 'Mengembara dengan bergaya bersama armada premium kami',
    passengersWord: 'Penumpang',
    bagsWord: 'Beg',
    fromPricePrefix: 'Dari',
    bookNowBtn: 'Tempah Sekarang',
    mostPopularTag: 'Paling Popular',
    servicesTitle: 'Perkhidmatan Pengangkutan Premium',
    servicesSubtitle: 'Penyelesaian pengangkutan komprehensif untuk ziarah dan perjalanan anda',
    srvAirportTitle: 'Pemindahan Lapangan Terbang',
    srvAirportSub: 'Dari Jeddah ke Makkah dan Madinah',
    srvZiyaratTitle: 'Lawatan Ziarah',
    srvZiyaratSub: 'Meneroka Tempat Suci',
    srvIntercityTitle: 'Perjalanan Antara Bandar',
    srvIntercitySub: 'Di seluruh Arab Saudi',
    srvHotelTitle: 'Pemindahan Hotel',
    srvHotelSub: 'Selesa & Boleh Dipercayai',
    routesTitle: 'Laluan Popular & Harga',
    routesSubtitle: 'Harga tetap untuk kemudahan anda',
    route1Title: 'Lapangan Terbang Jeddah ➔ Makkah',
    route1Time: '60 – 75 min',
    route2Title: 'Makkah ➔ Madinah',
    route2Time: '4 – 5 jam',
    route3Title: 'Lapangan Terbang Madinah ➔ Hotel',
    route3Time: '60 – 90 min',
    whyTitle: 'Mengapa Memilih Duyuf Al Rahman VIP?',
    why1: 'Armada premium & diselenggara rapi',
    why2: 'Pemandu profesional dan berbudi bahasa',
    why3: 'Harga telus tanpa kos tersembunyi',
    why4: 'Masa menunggu percuma di lapangan terbang',
    why5: 'Sokongan pelanggan 24/7',
    faqTitle: 'Soalan Lazim',
    faqSubtitle: 'Cari jawapan kepada soalan biasa mengenai perkhidmatan kami',
    faq1Q: 'Bagaimana untuk menempah perjalanan?',
    faq1A: 'Pilih laluan dan kenderaan anda melalui laman web kami atau hubungi concierge kami terus di WhatsApp.',
    faq2Q: 'Apakah kaedah pembayaran yang diterima?',
    faq2A: 'Kami mengamalkan pembayaran tunai kepada pemandu setibanya di destinasi dengan selamat.',
    faq3Q: 'Berapakah masa menunggu percuma di lapangan terbang?',
    faq3A: 'Kami menyediakan masa menunggu percuma sehingga 60 minit selepas penerbangan mendarat.',
    faq4Q: 'Bolehkah saya membatalkan tempahan?',
    faq4A: 'Ya, pembatalan adalah percuma dan fleksibel sebelum waktu perjalanan.',
    faq5Q: 'Adakah anda menyediakan tempat duduk kanak-kanak?',
    faq5A: 'Ya, tempat duduk kanak-kanak disediakan secara percuma atas permintaan.',
    faq6Q: 'Adakah anda melayani semua bandar di Arab Saudi?',
    faq6A: 'Ya, kami melayani Jeddah, Makkah, Madinah, Riyadh, Taif dan banyak lagi.',
    ctaCardTitle: 'Bersedia untuk Umrah yang Tenang?',
    ctaCardSub: 'Tempah pengangkutan peribadi anda hari ini dan nikmati perjalanan yang lancar.',
    ctaCardBtn: 'Mulakan Tempahan',
    chatWithUs: 'Hubungi Kami di WhatsApp',
  },
  id: {
    heroTitleTop: 'Pesan Perjalanan',
    heroTitleGold: 'Pribadi & Mewah Anda',
    heroSubtitle: 'Nikmati transportasi nyaman, andal, dan premium di seluruh Arab Saudi',
    trust247: 'Layanan 24/7',
    trustFlight: 'Pelacakan Penerbangan',
    trustWaiting: 'Tunggu Gratis (hingga 60 mnt)',
    planTripPill: 'Rencanakan Perjalanan Anda',
    step1: 'Detail Perjalanan',
    step2: 'Pilih Kendaraan',
    step3: 'Informasi Anda',
    pickupLabel: 'Lokasi Penjemputan',
    pickupPlaceholder: 'Pilih lokasi penjemputan',
    destLabel: 'Tujuan',
    destPlaceholder: 'Pilih tujuan',
    dateLabel: 'Tanggal Perjalanan',
    timeLabel: 'Waktu',
    timePlaceholder: 'Pilih waktu',
    passengersLabel: 'Penumpang',
    searchButton: 'Cari Kendaraan',
    cashGuarantee: 'Pembayaran tunai kepada pengemudi setelah tiba dengan aman • Termasuk pajak dan tol • Tanpa uang muka',
    errorSelectFields: 'Silakan pilih lokasi penjemputan, tujuan, dan tanggal perjalanan.',
    errorSameLocation: 'Silakan pilih dua lokasi yang berbeda.',
    locJeddahAirport: 'Bandara Jeddah (KAIA)',
    locMakkah: 'Makkah',
    locMadinahAirport: 'Bandara Madinah',
    locMadinah: 'Madinah',
    locTaif: 'Taif',
    locRiyadh: 'Riyadh',
    fleetEyebrow: 'ARMADA KAMI',
    fleetTitle: 'Pilih Kelas Anda',
    fleetSubtitle: 'Bepergian dengan penuh gaya bersama armada premium kami',
    passengersWord: 'Penumpang',
    bagsWord: 'Koper',
    fromPricePrefix: 'Mulai',
    bookNowBtn: 'Pesan Sekarang',
    mostPopularTag: 'Paling Populer',
    servicesTitle: 'Layanan Transportasi Premium',
    servicesSubtitle: 'Solusi transportasi menyeluruh untuk kebutuhan ibadah dan perjalanan Anda',
    srvAirportTitle: 'Antar Jemput Bandara',
    srvAirportSub: 'Dari Jeddah ke Makkah dan Madinah',
    srvZiyaratTitle: 'Wisata Ziarah',
    srvZiyaratSub: 'Kunjungi Tempat Suci Bersejarah',
    srvIntercityTitle: 'Perjalanan Antarkota',
    srvIntercitySub: 'Di seluruh Arab Saudi',
    srvHotelTitle: 'Antar Jemput Hotel',
    srvHotelSub: 'Nyaman & Terpercaya',
    routesTitle: 'Rute Populer & Harga',
    routesSubtitle: 'Tarif tetap demi kenyamanan perjalanan Anda',
    route1Title: 'Bandara Jeddah ➔ Makkah',
    route1Time: '60 – 75 mnt',
    route2Title: 'Makkah ➔ Madinah',
    route2Time: '4 – 5 jam',
    route3Title: 'Bandara Madinah ➔ Hotel',
    route3Time: '60 – 90 mnt',
    whyTitle: 'Mengapa Memilih Duyuf Al Rahman VIP?',
    why1: 'Armada premium & terawat bersih',
    why2: 'Pengemudi profesional dan santun',
    why3: 'Tarif transparan tanpa biaya tersembunyi',
    why4: 'Waktu tunggu gratis di bandara',
    why5: 'Layanan pelanggan 24/7',
    faqTitle: 'Pertanyaan yang Sering Diajukan',
    faqSubtitle: 'Temukan jawaban seputar layanan transportasi kami',
    faq1Q: 'Bagaimana cara memesan perjalanan?',
    faq1A: 'Pilih rute dan armada Anda melalui formulir kami atau hubungi kami langsung via WhatsApp.',
    faq2Q: 'Metode pembayaran apa yang tersedia?',
    faq2A: 'Pembayaran dilakukan secara tunai kepada pengemudi setelah tiba dengan aman di tempat tujuan.',
    faq3Q: 'Berapa lama waktu tunggu gratis di bandara?',
    faq3A: 'Kami memberikan waktu tunggu gratis hingga 60 menit setelah pesawat mendarat.',
    faq4Q: 'Bisakah saya membatalkan pesanan?',
    faq4A: 'Ya, pembatalan fleksibel dan gratis tanpa denda sebelum jadwal penjemputan.',
    faq5Q: 'Apakah menyediakan kursi bayi/anak?',
    faq5A: 'Ya, kursi anak tersedia gratis sesuai permintaan.',
    faq6Q: 'Apakah melayani seluruh kota di Arab Saudi?',
    faq6A: 'Ya, kami melayani rute Jeddah, Makkah, Madinah, Taif, Riyadh, dan kota lainnya.',
    ctaCardTitle: 'Siap untuk Ibadah Umrah yang Khusyuk?',
    ctaCardSub: 'Pesan transportasi pribadi Anda hari ini dan nikmati perjalanan tenang bersama keluarga.',
    ctaCardBtn: 'Pesan Sekarang',
    chatWithUs: 'Chat dengan Kami di WhatsApp',
  },
  ur: {
    heroTitleTop: 'اپنا پرتعیش سفر',
    heroTitleGold: 'بک کریں',
    heroSubtitle: 'سعودی عرب میں بہترین، قابل اعتماد اور پرسکون نجی ٹرانسپورٹ کا لطف اٹھائیں',
    trust247: '24/7 سروس',
    trustFlight: 'پرواز کی لائیو ٹریکنگ',
    trustWaiting: 'مفت انتظار (60 منٹ تک)',
    planTripPill: 'سفر کا منصوبہ بنائیں',
    step1: 'سفر کی تفصیلات',
    step2: 'گاڑی کا انتخاب',
    step3: 'آپ کی معلومات',
    pickupLabel: 'روانگی کا مقام',
    pickupPlaceholder: 'روانگی منتخب کریں',
    destLabel: 'منزل',
    destPlaceholder: 'منزل منتخب کریں',
    dateLabel: 'سفر کی تاریخ',
    timeLabel: 'وقت',
    timePlaceholder: 'وقت منتخب کریں',
    passengersLabel: 'مسافر',
    searchButton: 'گاڑیاں تلاش کریں',
    cashGuarantee: 'منزل پر پہنچنے کے بعد ڈرائیور کو نقد ادائیگی • تمام ٹیکس شامل • بغیر پیشگی رقم کے',
    errorSelectFields: 'برائے مہربانی روانگی، منزل اور تاریخ کا انتخاب کریں۔',
    errorSameLocation: 'براہ کرم دو مختلف مقامات منتخب کریں۔',
    locJeddahAirport: 'جدہ ایئرپورٹ (KAIA)',
    locMakkah: 'مکہ مکرمہ',
    locMadinahAirport: 'مدینہ ایئرپورٹ',
    locMadinah: 'مدینہ منورہ',
    locTaif: 'طائف',
    locRiyadh: 'ریاض',
    fleetEyebrow: 'ہمارا فلیٹ',
    fleetTitle: 'گاڑی کی کلاس منتخب کریں',
    fleetSubtitle: 'ہماری شاندار گاڑیوں کے ساتھ پرسکون سفر کریں',
    passengersWord: 'مسافر',
    bagsWord: 'بیگ',
    fromPricePrefix: 'شروع از',
    bookNowBtn: 'ابھی بک کریں',
    mostPopularTag: 'سب سے مقبول',
    servicesTitle: 'پرتعیش ٹرانسپورٹ سروسز',
    servicesSubtitle: 'آپ کے عمرہ اور زیارات کے لیے مکمل اور آرام دہ سفری سہولیات',
    srvAirportTitle: 'ایئرپورٹ ٹرانسفر',
    srvAirportSub: 'جدہ ایئرپورٹ سے مکہ اور مدینہ منورہ',
    srvZiyaratTitle: 'زیارات کے سفر',
    srvZiyaratSub: 'مقدس مقامات کی تفصیلی زیارات',
    srvIntercityTitle: 'شہروں کے درمیان سفر',
    srvIntercitySub: 'سعودی عرب کے تمام شہروں میں',
    srvHotelTitle: 'ہوٹل ٹرانسفر',
    srvHotelSub: 'پرسکون اور محفوظ سواری',
    routesTitle: 'مقبول ترین راستے اور کرائے',
    routesSubtitle: 'بغیر کسی اضافی چارجز کے فکسڈ کرائے',
    route1Title: 'جدہ ایئرپورٹ ➔ مکہ مکرمہ',
    route1Time: '60 – 75 منٹ',
    route2Title: 'مکہ مکرمہ ➔ مدینہ منورہ',
    route2Time: '4 – 5 گھنٹے',
    route3Title: 'مدینہ ایئرپورٹ ➔ ہوٹل',
    route3Time: '60 – 90 منٹ',
    whyTitle: 'ضیوف الرحمن VIP کا انتخاب کیوں کریں؟',
    why1: 'جدید اور بہترین حالت میں گاڑیاں',
    why2: 'تجربہ کار اور بااخلاق ڈرائیورز',
    why3: 'شفاف کرائے بغیر کسی پوشیدہ فیس کے',
    why4: 'ایئرپورٹ پر 60 منٹ تک مفت انتظار',
    why5: '24/7 ہمہ وقت کسٹمر سپورٹ',
    faqTitle: 'اکثر پوچھے گئے سوالات',
    faqSubtitle: 'ہماری خدمات کے بارے میں عام سوالات کے جوابات',
    faq1Q: 'گاڑی کیسے بک کی جا سکتی ہے؟',
    faq1A: 'آپ ویب سائٹ پر فارم بھر کر یا واٹس ایپ پر کونسیرج سے براہ راست رابطہ کر کے بک کر سکتے ہیں۔',
    faq2Q: 'ادائیگی کا کیا طریقہ کار ہے؟',
    faq2A: 'ہماری پالیسی کے مطابق مکمل ادائیگی سفر کے اختتام پر ڈرائیور کو نقد دی جاتی ہے۔',
    faq3Q: 'ایئرپورٹ پر انتظار کا وقت کتنا ہے؟',
    faq3A: 'ہم فلائٹ لینڈنگ کے بعد 60 منٹ تک بالکل مفت انتظار کی سہولت دیتے ہیں۔',
    faq4Q: 'کیا بکنگ منسوخ کی جا سکتی ہے؟',
    faq4A: 'جی ہاں، وقت سے پہلے بکنگ منسوخ کرنا بالکل مفت اور آسان ہے۔',
    faq5Q: 'کیا بچوں کی سیٹیں دستیاب ہیں؟',
    faq5A: 'جی ہاں، طلب کرنے پر بچوں کی سیٹیں مفت فراہم کی جاتی ہیں۔',
    faq6Q: 'کیا سروس تمام شہروں میں دستیاب ہے؟',
    faq6A: 'جی ہاں، جدہ، مکہ، مدینہ، ریاض اور طائف میں سروس میسر ہے۔',
    ctaCardTitle: 'پرسکون عمرہ کے سفر کے لیے تیار ہیں؟',
    ctaCardSub: 'آج ہی اپنی نجی سواری بک کریں اور اہل خانہ کے ساتھ آرام دہ سفر سے لطف اندوز ہوں۔',
    ctaCardBtn: 'ابھی بک کریں',
    chatWithUs: 'واٹس ایپ پر رابطہ کریں',
  },
  fr: {
    heroTitleTop: 'Réservez Votre',
    heroTitleGold: 'Voyage Privé',
    heroSubtitle: 'Profitez d’un transport confortable, fiable et haut de gamme à travers l’Arabie Saoudite',
    trust247: 'Service 24/7',
    trustFlight: 'Suivi des Vols',
    trustWaiting: 'Attente Gratuite (jusqu’à 60 min)',
    planTripPill: 'Planifiez Votre Voyage',
    step1: 'Détails du Trajet',
    step2: 'Choisir le Véhicule',
    step3: 'Vos Informations',
    pickupLabel: 'Lieu de Départ',
    pickupPlaceholder: 'Sélectionner le lieu',
    destLabel: 'Destination',
    destPlaceholder: 'Sélectionner la destination',
    dateLabel: 'Date du Voyage',
    timeLabel: 'Heure',
    timePlaceholder: 'Sélectionner l’heure',
    passengersLabel: 'Passagers',
    searchButton: 'Rechercher les Véhicules',
    cashGuarantee: 'Paiement en espèces au chauffeur à l’arrivée • Taxes et péages inclus • Sans acompte',
    errorSelectFields: 'Veuillez sélectionner le départ, la destination et la date.',
    errorSameLocation: 'Veuillez choisir deux destinations différentes.',
    locJeddahAirport: 'Aéroport de Djeddah (KAIA)',
    locMakkah: 'La Mecque',
    locMadinahAirport: 'Aéroport de Médine',
    locMadinah: 'Médine',
    locTaif: 'Taif',
    locRiyadh: 'Riyad',
    fleetEyebrow: 'NOTRE FLOTTE',
    fleetTitle: 'Choisissez Votre Classe',
    fleetSubtitle: 'Voyagez avec distinction grâce à notre flotte de prestige',
    passengersWord: 'Passagers',
    bagsWord: 'Bagages',
    fromPricePrefix: 'Dès',
    bookNowBtn: 'Réserver',
    mostPopularTag: 'Plus Populaire',
    servicesTitle: 'Services de Transport Privé',
    servicesSubtitle: 'Solutions de mobilité complètes pour votre pèlerinage et vos séjours',
    srvAirportTitle: 'Transferts Aéroports',
    srvAirportSub: 'De Djeddah vers La Mecque et Médine',
    srvZiyaratTitle: 'Visites Ziyarat',
    srvZiyaratSub: 'Découvrez les Lieux Saints',
    srvIntercityTitle: 'Voyages Interurbains',
    srvIntercitySub: 'À travers toute l’Arabie Saoudite',
    srvHotelTitle: 'Transferts Hôtels',
    srvHotelSub: 'Confortable et Ponctuel',
    routesTitle: 'Trajets Populaires & Tarifs',
    routesSubtitle: 'Tarifs fixes et transparents pour votre sérénité',
    route1Title: 'Aéroport Djeddah ➔ La Mecque',
    route1Time: '60 – 75 min',
    route2Title: 'La Mecque ➔ Médine',
    route2Time: '4 – 5 heures',
    route3Title: 'Aéroport Médine ➔ Hôtels',
    route3Time: '60 – 90 min',
    whyTitle: 'Pourquoi Choisir Duyuf Al Rahman VIP ?',
    why1: 'Flotte récente et impeccablement entretenue',
    why2: 'Chauffeurs professionnels et attentionnés',
    why3: 'Tarifs transparents sans frais cachés',
    why4: 'Attente gracieuse de 60 min à l’aéroport',
    why5: 'Conciergerie et support dédiés 24/7',
    faqTitle: 'Foire Aux Questions',
    faqSubtitle: 'Réponses à toutes vos questions sur nos transferts',
    faq1Q: 'Comment réserver un transfert ?',
    faq1A: 'Sélectionnez votre trajet sur notre module ou contactez notre conciergerie WhatsApp 24/7.',
    faq2Q: 'Quels sont les modes de paiement ?',
    faq2A: 'Règlement 100% en espèces au chauffeur à votre arrivée. Pas de paiement par carte à l’avance.',
    faq3Q: 'Combien de temps le chauffeur attend-il ?',
    faq3A: 'Nous incluons 60 minutes d’attente gratuite dès l’atterrissage de votre vol.',
    faq4Q: 'Puis-je annuler ma réservation ?',
    faq4A: 'Oui, l’annulation est totalement gratuite et flexible avant le départ.',
    faq5Q: 'Fournissez-vous des sièges bébé ?',
    faq5A: 'Oui, des sièges enfants homologués sont disponibles gratuitement sur demande.',
    faq6Q: 'Desservez-vous toutes les villes saoudiennes ?',
    faq6A: 'Oui, nous couvrons Djeddah, La Mecque, Médine, Riyad, Taif et l’ensemble des régions.',
    ctaCardTitle: 'Prêt pour une Omra en toute sérénité ?',
    ctaCardSub: 'Réservez votre véhicule privé dès maintenant et voyagez en toute tranquillité.',
    ctaCardBtn: 'Réserver Maintenant',
    chatWithUs: 'Contactez-nous sur WhatsApp',
  },
  es: {
    heroTitleTop: 'Reserve Su',
    heroTitleGold: 'Viaje Privado',
    heroSubtitle: 'Disfrute de un transporte cómodo, confiable y de alta gama en Arabia Saudita',
    trust247: 'Servicio 24/7',
    trustFlight: 'Seguimiento de Vuelos',
    trustWaiting: 'Espera Gratuita (hasta 60 min)',
    planTripPill: 'Planifique Su Viaje',
    step1: 'Detalles del Viaje',
    step2: 'Elegir Vehículo',
    step3: 'Sus Datos',
    pickupLabel: 'Punto de Recogida',
    pickupPlaceholder: 'Seleccionar recogida',
    destLabel: 'Destino',
    destPlaceholder: 'Seleccionar destino',
    dateLabel: 'Fecha del Viaje',
    timeLabel: 'Hora',
    timePlaceholder: 'Seleccionar hora',
    passengersLabel: 'Pasajeros',
    searchButton: 'Buscar Vehículos',
    cashGuarantee: 'Pago en efectivo al conductor a la llegada • Impuestos y peajes incluidos • Sin depósito',
    errorSelectFields: 'Por favor seleccione recogida, destino y fecha.',
    errorSameLocation: 'Por favor elija dos destinos diferentes.',
    locJeddahAirport: 'Aeropuerto de Yeda (KAIA)',
    locMakkah: 'La Meca',
    locMadinahAirport: 'Aeropuerto de Medina',
    locMadinah: 'Medina',
    locTaif: 'Taif',
    locRiyadh: 'Riad',
    fleetEyebrow: 'NUESTRA FLOTA',
    fleetTitle: 'Elija Su Clase',
    fleetSubtitle: 'Viaje con estilo en nuestra exclusiva flota de vehículos ejecutivos',
    passengersWord: 'Pasajeros',
    bagsWord: 'Maletas',
    fromPricePrefix: 'Desde',
    bookNowBtn: 'Reservar',
    mostPopularTag: 'Más Popular',
    servicesTitle: 'Servicios de Transporte Premium',
    servicesSubtitle: 'Soluciones completas de traslado para su peregrinación y viajes de negocios',
    srvAirportTitle: 'Traslados de Aeropuerto',
    srvAirportSub: 'De Yeda a La Meca y Medina',
    srvZiyaratTitle: 'Visitas Ziyarat',
    srvZiyaratSub: 'Recorra los Lugares Sagrados',
    srvIntercityTitle: 'Viajes Interurbanos',
    srvIntercitySub: 'En toda Arabia Saudita',
    srvHotelTitle: 'Traslados a Hoteles',
    srvHotelSub: 'Cómodos y Puntuales',
    routesTitle: 'Rutas Populares y Precios',
    routesSubtitle: 'Tarifas fijas y transparentes para su tranquilidad',
    route1Title: 'Aeropuerto Yeda ➔ La Meca',
    route1Time: '60 – 75 min',
    route2Title: 'La Meca ➔ Medina',
    route2Time: '4 – 5 horas',
    route3Title: 'Aeropuerto Medina ➔ Hoteles',
    route3Time: '60 – 90 min',
    whyTitle: '¿Por Qué Elegir Duyuf Al Rahman VIP?',
    why1: 'Flota moderna e higienizada al más alto nivel',
    why2: 'Chóferes certificados y corteses',
    why3: 'Precios fijos sin cargos ocultos',
    why4: 'Tiempo de espera gratis de 60 minutos en aeropuerto',
    why5: 'Atención al cliente 24/7',
    faqTitle: 'Preguntas Frecuentes',
    faqSubtitle: 'Respuestas a las dudas más comunes sobre nuestros traslados',
    faq1Q: '¿Cómo reservo un viaje?',
    faq1A: 'Elija su ruta y vehículo en nuestro buscador o escriba a nuestro concierge en WhatsApp.',
    faq2Q: '¿Cuáles son las formas de pago?',
    faq2A: 'Pago 100% en efectivo al chófer una vez llegue a su destino.',
    faq3Q: '¿Cuánto tiempo de espera en el aeropuerto?',
    faq3A: 'Ofrecemos 60 minutos de espera gratuita después del aterrizaje.',
    faq4Q: '¿Puedo cancelar mi reserva?',
    faq4A: 'Sí, las cancelaciones son gratis y flexibles antes de la hora acordada.',
    faq5Q: '¿Tienen sillas para niños?',
    faq5A: 'Sí, disponemos de sillas para niños sin coste adicional al solicitarlas.',
    faq6Q: '¿Cubren todas las ciudades de Arabia Saudita?',
    faq6A: 'Sí, cubrimos Yeda, La Meca, Medina, Riad, Taif y trayectos interurbanos.',
    ctaCardTitle: '¿Listo para un viaje de Umrah con total serenidad?',
    ctaCardSub: 'Reserve su vehículo privado hoy y disfrute de una experiencia distinguida con su familia.',
    ctaCardBtn: 'Reservar Ahora',
    chatWithUs: 'Escríbanos por WhatsApp',
  },
  de: {
    heroTitleTop: 'Buchen Sie Ihre',
    heroTitleGold: 'Private Reise',
    heroSubtitle: 'Erleben Sie komfortable, zuverlässige und erstklassige Beförderung in Saudi-Arabien',
    trust247: '24/7 Service',
    trustFlight: 'Flugverfolgung',
    trustWaiting: 'Kostenlose Wartezeit (bis zu 60 Min)',
    planTripPill: 'Planen Sie Ihre Reise',
    step1: 'Fahrtdetails',
    step2: 'Fahrzeug Wählen',
    step3: 'Ihre Daten',
    pickupLabel: 'Abholort',
    pickupPlaceholder: 'Abholort auswählen',
    destLabel: 'Zielort',
    destPlaceholder: 'Zielort auswählen',
    dateLabel: 'Reisedatum',
    timeLabel: 'Uhrzeit',
    timePlaceholder: 'Uhrzeit auswählen',
    passengersLabel: 'Passagiere',
    searchButton: 'Fahrzeuge Suchen',
    cashGuarantee: 'Barzahlung an den Fahrer nach sicherer Ankunft • Inklusive Maut & Steuern • Keine Vorauszahlung',
    errorSelectFields: 'Bitte wählen Sie Abholort, Zielort und Datum aus.',
    errorSameLocation: 'Bitte wählen Sie zwei unterschiedliche Orte.',
    locJeddahAirport: 'Flughafen Dschidda (KAIA)',
    locMakkah: 'Mekka',
    locMadinahAirport: 'Flughafen Medina',
    locMadinah: 'Medina',
    locTaif: 'Taif',
    locRiyadh: 'Riad',
    fleetEyebrow: 'UNSERE FLOTTE',
    fleetTitle: 'Wählen Sie Ihre Klasse',
    fleetSubtitle: 'Reisen Sie stilvoll mit unserer modernen Premium-Flotte',
    passengersWord: 'Passagiere',
    bagsWord: 'Koffer',
    fromPricePrefix: 'Ab',
    bookNowBtn: 'Jetzt Buchen',
    mostPopularTag: 'Sehr Beliebt',
    servicesTitle: 'Erstklassige Transportdienste',
    servicesSubtitle: 'Umfassende Beförderungslösungen für Ihre Pilgerfahrt und Reisen',
    srvAirportTitle: 'Flughafentransfers',
    srvAirportSub: 'Von Dschidda nach Mekka und Medina',
    srvZiyaratTitle: 'Ziyarat Besichtigungen',
    srvZiyaratSub: 'Erkunden Sie die Heiligen Stätten',
    srvIntercityTitle: 'Fernfahrten',
    srvIntercitySub: 'In ganz Saudi-Arabien',
    srvHotelTitle: 'Hoteltransfers',
    srvHotelSub: 'Bequem & Zuverlässig',
    routesTitle: 'Beliebte Routen & Preise',
    routesSubtitle: 'Feste Tarife für Ihre sorgenfreie Fahrt',
    route1Title: 'Flughafen Dschidda ➔ Mekka',
    route1Time: '60 – 75 Min',
    route2Title: 'Mekka ➔ Medina',
    route2Time: '4 – 5 Std',
    route3Title: 'Flughafen Medina ➔ Hotels',
    route3Time: '60 – 90 Min',
    whyTitle: 'Warum Duyuf Al Rahman VIP wählen?',
    why1: 'Moderne, gepflegte und desinfizierte Fahrzeuge',
    why2: 'Professionelle und zuvorkommende Chauffeure',
    why3: 'Transparente Festpreise ohne versteckte Kosten',
    why4: '60 Minuten kostenlose Wartezeit am Flughafen',
    why5: '24/7 Concierge-Kundenservice',
    faqTitle: 'Häufig Gestellte Fragen',
    faqSubtitle: 'Antworten auf die wichtigsten Fragen zu unserem Service',
    faq1Q: 'Wie buche ich eine Fahrt?',
    faq1A: 'Wählen Sie Route und Fahrzeug online oder kontaktieren Sie uns direkt per WhatsApp.',
    faq2Q: 'Welche Zahlungsmethoden gibt es?',
    faq2A: 'Barzahlung direkt an den Chauffeur nach Ankunft am Zielort.',
    faq3Q: 'Wie lange wartet der Fahrer am Flughafen?',
    faq3A: 'Wir bieten 60 Minuten kostenlose Wartezeit nach der Fluglandung.',
    faq4Q: 'Kann ich die Buchung stornieren?',
    faq4A: 'Ja, Stornierungen vor der Fahrt sind kostenfrei und unkompliziert.',
    faq5Q: 'Gibt es Kindersitze?',
    faq5A: 'Ja, Kindersitze stellen wir auf Anfrage kostenlos zur Verfügung.',
    faq6Q: 'Werden alle Städte in Saudi-Arabien bedient?',
    faq6A: 'Ja, wir bedienen Dschidda, Mekka, Medina, Riad, Taif und weitere Städte.',
    ctaCardTitle: 'Bereit für eine unvergessliche Umrah?',
    ctaCardSub: 'Buchen Sie Ihren Chauffeur noch heute und reisen Sie entspannt mit der Familie.',
    ctaCardBtn: 'Fahrt Buchen',
    chatWithUs: 'WhatsApp Chat',
  },
  tr: {
    heroTitleTop: 'Özel Yolculuğunuzu',
    heroTitleGold: 'Rezerve Edin',
    heroSubtitle: 'Suudi Arabistan genelinde konforlu, güvenilir ve VIP ulaşım ayrıcalığını yaşayın',
    trust247: '7/24 Hizmet',
    trustFlight: 'Uçuş Takibi',
    trustWaiting: 'Ücretsiz Bekleme (60 dk)',
    planTripPill: 'Yolculuğunuzu Planlayın',
    step1: 'Yolculuk Detayları',
    step2: 'Araç Seçimi',
    step3: 'Bilgileriniz',
    pickupLabel: 'Kalkış Noktası',
    pickupPlaceholder: 'Kalkış noktası seçin',
    destLabel: 'Varış Noktası',
    destPlaceholder: 'Varış noktası seçin',
    dateLabel: 'Yolculuk Tarihi',
    timeLabel: 'Saat',
    timePlaceholder: 'Saat seçin',
    passengersLabel: 'Yolcu Sayısı',
    searchButton: 'Araçları Ara',
    cashGuarantee: 'Güvenle varışta şoföre nakit ödeme • Köprü ve vergiler dahil • Ön ödeme yok',
    errorSelectFields: 'Lütfen kalkış, varış ve tarih seçiniz.',
    errorSameLocation: 'Lütfen iki farklı konum seçiniz.',
    locJeddahAirport: 'Cidde Havalimanı (KAIA)',
    locMakkah: 'Mekke-i Mükerreme',
    locMadinahAirport: 'Medine Havalimanı',
    locMadinah: 'Medine-i Münevvere',
    locTaif: 'Taif',
    locRiyadh: 'Riyad',
    fleetEyebrow: 'FİLOMUZ',
    fleetTitle: 'Araç Sınıfınızı Seçin',
    fleetSubtitle: 'Lüks ve modern araç filomuzla konforlu seyahat edin',
    passengersWord: 'Yolcu',
    bagsWord: 'Valiz',
    fromPricePrefix: 'Başlayan',
    bookNowBtn: 'Rezervasyon Yap',
    mostPopularTag: 'En Çok Tercih Edilen',
    servicesTitle: 'Premium Ulaşım Hizmetleri',
    servicesSubtitle: 'Hac, Umre ve seyahatleriniz için kapsamlı VIP transfer çözümleri',
    srvAirportTitle: 'Havalimanı Transferleri',
    srvAirportSub: 'Cidde’den Mekke ve Medine’ye',
    srvZiyaratTitle: 'Ziyaret Turları',
    srvZiyaratSub: 'Kutsal Mekanları Keşfedin',
    srvIntercityTitle: 'Şehirlerarası Ulaşım',
    srvIntercitySub: 'Suudi Arabistan genelinde',
    srvHotelTitle: 'Otel Transferleri',
    srvHotelSub: 'Konforlu ve Zamanında',
    routesTitle: 'Popüler Rotalar ve Fiyatlar',
    routesSubtitle: 'Sürpriz masrafsız, sabit ve şeffaf fiyatlar',
    route1Title: 'Cidde Havalimanı ➔ Mekke',
    route1Time: '60 – 75 dk',
    route2Title: 'Mekke ➔ Medine',
    route2Time: '4 – 5 saat',
    route3Title: 'Medine Havalimanı ➔ Oteller',
    route3Time: '60 – 90 dk',
    whyTitle: 'Neden Duyuf Al Rahman VIP?',
    why1: 'Yeni, bakımlı ve hijyenik lüks araç filosu',
    why2: 'Deneyimli ve saygılı profesyonel şoförler',
    why3: 'Gizli ücret içermeyen şeffaf sabit fiyatlar',
    why4: 'Havalimanında 60 dakikaya kadar ücretsiz bekleme',
    why5: '7/24 kesintisiz müşteri desteği ve konsiyerj',
    faqTitle: 'Sıkça Sorulan Sorular',
    faqSubtitle: 'Transfer hizmetlerimizle ilgili merak ettiğiniz yanıtlar',
    faq1Q: 'Nasıl rezervasyon yapabilirim?',
    faq1A: 'Web sitemizden rota ve araç seçerek veya 7/24 WhatsApp hattımızdan kolayca rezervasyon yapabilirsiniz.',
    faq2Q: 'Ödeme yöntemleri nelerdir?',
    faq2A: 'Ödemenizi otele veya gideceğiniz yere güvenle vardığınızda şoförümüze nakit olarak yapabilirsiniz.',
    faq3Q: 'Havalimanında bekleme süresi ne kadar?',
    faq3A: 'Uçağınız indikten sonra 60 dakikaya kadar ücretsiz bekleme hizmeti sunuyoruz.',
    faq4Q: 'Rezervasyonumu iptal edebilir miyim?',
    faq4A: 'Evet, transfer saatinden önce yapılan iptaller tamamen ücretsiz ve esnektir.',
    faq5Q: 'Çocuk koltuğu temin ediyor musunuz?',
    faq5A: 'Evet, talep etmeniz halinde çocuk oto koltuğunu ücretsiz olarak sağlıyoruz.',
    faq6Q: 'Hangi şehirlere hizmet veriyorsunuz?',
    faq6A: 'Cidde, Mekke, Medine, Riyad, Taif ve çevre illerin tamamında hizmetinizdeyiz.',
    ctaCardTitle: 'Huzurlu Bir Umre Yolculuğuna Hazır mısınız?',
    ctaCardSub: 'Özel aracınızı hemen ayırtın, ailenizle huzur dolu bir seyahatin tadını çıkarın.',
    ctaCardBtn: 'Yolculuğu Başlat',
    chatWithUs: 'WhatsApp ile İletişim',
  },
  ru: {
    heroTitleTop: 'Забронируйте Вашу',
    heroTitleGold: 'Приватную Поездку',
    heroSubtitle: 'Комфортабельные, надежные и премиальные поездки по всей Саудовской Аравии',
    trust247: 'Сервис 24/7',
    trustFlight: 'Отслеживание Рейсов',
    trustWaiting: 'Бесплатное Ожидание (до 60 мин)',
    planTripPill: 'Спланируйте Поездку',
    step1: 'Детали Поездки',
    step2: 'Выбор Автомобиля',
    step3: 'Ваши Данные',
    pickupLabel: 'Место Отправления',
    pickupPlaceholder: 'Выберите место',
    destLabel: 'Место Назначения',
    destPlaceholder: 'Выберите пункт',
    dateLabel: 'Дата Поездки',
    timeLabel: 'Время',
    timePlaceholder: 'Выберите время',
    passengersLabel: 'Пассажиры',
    searchButton: 'Найти Автомобили',
    cashGuarantee: 'Оплата наличными водителю по прибытии • Все сборы включены • Без предоплаты',
    errorSelectFields: 'Пожалуйста, выберите отправление, назначение и дату.',
    errorSameLocation: 'Пожалуйста, выберите разные пункты.',
    locJeddahAirport: 'Аэропорт Джидда (KAIA)',
    locMakkah: 'Мекка',
    locMadinahAirport: 'Аэропорт Медина',
    locMadinah: 'Медина',
    locTaif: 'Таиф',
    locRiyadh: 'Эр-Рияд',
    fleetEyebrow: 'НАШ АВТОПАРК',
    fleetTitle: 'Выберите Класс Авто',
    fleetSubtitle: 'Путешествуйте со стилем на наших премиальных автомобилях',
    passengersWord: 'Пассажиров',
    bagsWord: 'Мест багажа',
    fromPricePrefix: 'От',
    bookNowBtn: 'Забронировать',
    mostPopularTag: 'Популярный Выбор',
    servicesTitle: 'Премиальные Транспортные Услуги',
    servicesSubtitle: 'Комплексные транспортные решения для паломничества и деловых поездок',
    srvAirportTitle: 'Трансферы из Аэропорта',
    srvAirportSub: 'Из Джидды в Мекку и Медину',
    srvZiyaratTitle: 'Зиярат Экскурсии',
    srvZiyaratSub: 'Посещение Святых Мест',
    srvIntercityTitle: 'Междугородние Поездки',
    srvIntercitySub: 'По всей Саудовской Аравии',
    srvHotelTitle: 'Трансферы в Отели',
    srvHotelSub: 'Удобно и Пунктуально',
    routesTitle: 'Популярные Маршруты и Цены',
    routesSubtitle: 'Фиксированные прозрачные тарифы для вашего спокойствия',
    route1Title: 'Аэропорт Джидда ➔ Мекка',
    route1Time: '60 – 75 мин',
    route2Title: 'Мекка ➔ Медина',
    route2Time: '4 – 5 часов',
    route3Title: 'Аэропорт Медина ➔ Отели',
    route3Time: '60 – 90 мин',
    whyTitle: 'Почему Выбирают Duyuf Al Rahman VIP?',
    why1: 'Новый и безупречно чистый премиальный автопарк',
    why2: 'Профессиональные и вежливые водители',
    why3: 'Фиксированные цены без скрытых доплат',
    why4: 'Бесплатное ожидание в аэропорту до 60 минут',
    why5: 'Круглосуточная поддержка 24/7',
    faqTitle: 'Часто Задаваемые Вопросы',
    faqSubtitle: 'Ответы на главные вопросы о наших услугах',
    faq1Q: 'Как забронировать поездку?',
    faq1A: 'Выберите маршрут и автомобиль на сайте или напишите нашему консьержу в WhatsApp.',
    faq2Q: 'Какие способы оплаты доступны?',
    faq2A: 'Оплата наличными водителю по безопасному прибытию в пункт назначения.',
    faq3Q: 'Сколько времени ожидает водитель в аэропорту?',
    faq3A: 'Мы предоставляем до 60 минут бесплатного ожидания после прилета рейса.',
    faq4Q: 'Можно ли отменить поездку?',
    faq4A: 'Да, отмена полностью бесплатна и гибка до назначенного времени.',
    faq5Q: 'Предоставляются ли детские кресла?',
    faq5A: 'Да, сертифицированные детские кресла предоставляются бесплатно по запросу.',
    faq6Q: 'Обслуживаете ли вы все города Саудовской Аравии?',
    faq6A: 'Да, мы обслуживаем Джидду, Мекку, Медину, Эр-Рияд, Таиф и другие города.',
    ctaCardTitle: 'Готовы к спокойному и благословенному паломничеству?',
    ctaCardSub: 'Забронируйте ваш персональный трансфер сегодня и наслаждайтесь поездкой с семьей.',
    ctaCardBtn: 'Заказать Поездку',
    chatWithUs: 'Написать в WhatsApp',
  },
};

export function RoyalHomepageExperience({
  locale,
  dict,
  settings,
  vehicles = [],
}: RoyalHomepageExperienceProps) {
  const router = useRouter();
  const { formatPrice } = useCurrency();
  const isAr = locale === 'ar';
  const isRtl = isAr || locale === 'ur';

  const t = STRINGS[locale] || STRINGS.en;

  // Booking Form State
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);
  const [travelDate, setTravelDate] = useState(todayStr);
  const [travelTime, setTravelTime] = useState('12:00');
  const [passengers, setPassengers] = useState('1');
  const [feedback, setFeedback] = useState('');

  // Fleet Carousel State
  const [carouselIndex, setCarouselIndex] = useState(0);

  // FAQ Accordion State (6 items)
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  // Fleet Data (5 exact vehicles matching user mockup)
  const fleetCards = useMemo(() => {
    return [
      {
        id: 'mercedes-s-class',
        name: isAr ? 'مرسيدس الفئة S' : 'Mercedes S-Class',
        image: '/assets/images/cinematic/fleet/mercedes-s-class-retina.jpg',
        pax: 3,
        bags: 3,
        fromPrice: 200,
        isPopular: false,
      },
      {
        id: 'hyundai-staria',
        name: isAr ? 'هيونداي ستاريا' : 'Hyundai Staria',
        image: '/assets/images/cinematic/fleet/ref-hyundai-staria-retina.jpg',
        pax: 6,
        bags: 6,
        fromPrice: 260,
        isPopular: false,
      },
      {
        id: 'toyota-camry',
        name: isAr ? 'تويوتا كامري' : 'Toyota Camry',
        image: '/assets/images/cinematic/fleet/ref-toyota-camry-retina.jpg',
        pax: 3,
        bags: 3,
        fromPrice: 200,
        isPopular: true, // Most Popular featured card with gold border
      },
      {
        id: 'gmc-yukon-xl',
        name: isAr ? 'جي إم سي يوكون XL' : 'GMC Yukon XL',
        image: '/assets/images/cinematic/fleet/ref-gmc-yukon-retina.jpg',
        pax: 6,
        bags: 6,
        fromPrice: 380,
        isPopular: false,
      },
      {
        id: 'toyota-hiace',
        name: isAr ? 'تويوتا هايس' : 'Hiace Van',
        image: '/assets/images/cinematic/fleet/ref-hiace-van-retina.jpg',
        pax: 10,
        bags: 12,
        fromPrice: 360,
        isPopular: false,
      },
    ];
  }, [isAr]);

  const handleNextCar = () => {
    setCarouselIndex((prev) => (prev + 1) % fleetCards.length);
  };

  const handlePrevCar = () => {
    setCarouselIndex((prev) => (prev - 1 + fleetCards.length) % fleetCards.length);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
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
    router.push(
      \`/\${locale}/booking?pickup=\${encodeURIComponent(pickup)}&destination=\${encodeURIComponent(
        dropoff
      )}&date=\${encodeURIComponent(travelDate)}&time=\${encodeURIComponent(
        travelTime
      )}&passengers=\${encodeURIComponent(passengers)}\`
    );
  };

  const faqs = [
    { q: t.faq1Q, a: t.faq1A },
    { q: t.faq2Q, a: t.faq2A },
    { q: t.faq3Q, a: t.faq3A },
    { q: t.faq4Q, a: t.faq4A },
    { q: t.faq5Q, a: t.faq5A },
    { q: t.faq6Q, a: t.faq6A },
  ];

  return (
    <div className="rc-master-page" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* ─────────────────────────────────────────────────────────────
          SECTION 01: HERO WITH SPLIT VISUAL & STEPPED CONSOLE
      ────────────────────────────────────────────────────────────── */}
      <section className="rc-hero-section">
        {/* Full-width panoramic background visual */}
        <div className="rc-hero-bg-wrapper">
          <div className="rc-hero-bg-image">
            <Image
              src="/assets/images/cinematic/home/hero-mercedes-kaaba-retina.jpg"
              alt="Duyuf Al Rahman VIP - Kaaba Courtyard with Mercedes S-Class"
              fill
              priority
              sizes="100vw"
              className="object-cover object-right-top"
            />
          </div>
          {/* Subtle gradient vignette to blend seamlessly into #090D15 on left */}
          <div className="rc-hero-vignette" />
        </div>

        <div className="rc-container relative z-10">
          <div className="rc-hero-content-col">
            {/* Headline */}
            <h1 className="rc-hero-headline">
              <span className="rc-hero-white">{t.heroTitleTop} </span>
              <span className="rc-hero-gold">{t.heroTitleGold}</span>
            </h1>

            {/* Subtitle */}
            <p className="rc-hero-subtitle">{t.heroSubtitle}</p>

            {/* Trust Badges */}
            <div className="rc-hero-trust-row">
              <div className="rc-trust-badge">
                <Clock className="w-4 h-4 text-[#D6A13A]" />
                <span>{t.trust247}</span>
              </div>
              <div className="rc-trust-badge">
                <Plane className="w-4 h-4 text-[#D6A13A]" />
                <span>{t.trustFlight}</span>
              </div>
              <div className="rc-trust-badge">
                <ShieldCheck className="w-4 h-4 text-[#D6A13A]" />
                <span>{t.trustWaiting}</span>
              </div>
            </div>

            {/* Stepped Architectural Reservation Console */}
            <div className="rc-stepper-console" id="booking">
              {/* Top Tag Pill */}
              <div className="rc-console-tag-wrap">
                <span className="rc-console-tag">{t.planTripPill}</span>
              </div>

              {/* 1 - 2 - 3 Stepper Header */}
              <div className="rc-stepper-header">
                <div className="rc-step-node rc-step-active">
                  <span className="rc-step-num">1</span>
                  <span className="rc-step-label">{t.step1}</span>
                </div>
                <div className="rc-step-line rc-line-active" />
                <div className="rc-step-node">
                  <span className="rc-step-num">2</span>
                  <span className="rc-step-label">{t.step2}</span>
                </div>
                <div className="rc-step-line" />
                <div className="rc-step-node">
                  <span className="rc-step-num">3</span>
                  <span className="rc-step-label">{t.step3}</span>
                </div>
              </div>

              {/* Form Input Row */}
              <form onSubmit={handleSearchSubmit} className="rc-booking-form">
                <div className="rc-form-grid">
                  {/* Field 01: Pickup */}
                  <div className="rc-field-col">
                    <label className="rc-field-label">
                      <MapPin className="w-3.5 h-3.5 text-[#D6A13A]" />
                      <span>{t.pickupLabel}</span>
                    </label>
                    <div className="rc-input-box">
                      <select
                        value={pickup}
                        onChange={(e) => {
                          setPickup(e.target.value);
                          if (feedback) setFeedback('');
                        }}
                        required
                        className="rc-select"
                      >
                        <option value="">{t.pickupPlaceholder}</option>
                        <option value="jeddah-airport">{t.locJeddahAirport}</option>
                        <option value="makkah">{t.locMakkah}</option>
                        <option value="madinah-airport">{t.locMadinahAirport}</option>
                        <option value="madinah">{t.locMadinah}</option>
                        <option value="riyadh">{t.locRiyadh}</option>
                        <option value="taif">{t.locTaif}</option>
                      </select>
                      <ChevronDown className="rc-chevron" />
                    </div>
                  </div>

                  {/* Field 02: Destination */}
                  <div className="rc-field-col">
                    <label className="rc-field-label">
                      <MapPin className="w-3.5 h-3.5 text-[#D6A13A]" />
                      <span>{t.destLabel}</span>
                    </label>
                    <div className="rc-input-box">
                      <select
                        value={dropoff}
                        onChange={(e) => {
                          setDropoff(e.target.value);
                          if (feedback) setFeedback('');
                        }}
                        required
                        className="rc-select"
                      >
                        <option value="">{t.destPlaceholder}</option>
                        <option value="makkah">{t.locMakkah}</option>
                        <option value="madinah">{t.locMadinah}</option>
                        <option value="jeddah-airport">{t.locJeddahAirport}</option>
                        <option value="madinah-airport">{t.locMadinahAirport}</option>
                        <option value="riyadh">{t.locRiyadh}</option>
                        <option value="taif">{t.locTaif}</option>
                      </select>
                      <ChevronDown className="rc-chevron" />
                    </div>
                  </div>

                  {/* Field 03: Date */}
                  <div className="rc-field-col">
                    <label className="rc-field-label">
                      <Calendar className="w-3.5 h-3.5 text-[#D6A13A]" />
                      <span>{t.dateLabel}</span>
                    </label>
                    <div className="rc-input-box">
                      <input
                        type="date"
                        min={todayStr}
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        required
                        className="rc-input"
                      />
                    </div>
                  </div>

                  {/* Field 04: Time */}
                  <div className="rc-field-col">
                    <label className="rc-field-label">
                      <Clock className="w-3.5 h-3.5 text-[#D6A13A]" />
                      <span>{t.timeLabel}</span>
                    </label>
                    <div className="rc-input-box">
                      <select
                        value={travelTime}
                        onChange={(e) => setTravelTime(e.target.value)}
                        className="rc-select"
                      >
                        <option value="12:00">12:00 PM</option>
                        <option value="13:00">01:00 PM</option>
                        <option value="14:00">02:00 PM</option>
                        <option value="15:00">03:00 PM</option>
                        <option value="16:00">04:00 PM</option>
                        <option value="17:00">05:00 PM</option>
                        <option value="18:00">06:00 PM</option>
                        <option value="19:00">07:00 PM</option>
                        <option value="20:00">08:00 PM</option>
                        <option value="21:00">09:00 PM</option>
                        <option value="22:00">10:00 PM</option>
                        <option value="23:00">11:00 PM</option>
                        <option value="00:00">12:00 AM</option>
                        <option value="01:00">01:00 AM</option>
                        <option value="02:00">02:00 AM</option>
                        <option value="03:00">03:00 AM</option>
                        <option value="04:00">04:00 AM</option>
                        <option value="05:00">05:00 AM</option>
                        <option value="06:00">06:00 AM</option>
                        <option value="07:00">07:00 AM</option>
                        <option value="08:00">08:00 AM</option>
                        <option value="09:00">09:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                      </select>
                      <ChevronDown className="rc-chevron" />
                    </div>
                  </div>

                  {/* Field 05: Passengers */}
                  <div className="rc-field-col">
                    <label className="rc-field-label">
                      <Users className="w-3.5 h-3.5 text-[#D6A13A]" />
                      <span>{t.passengersLabel}</span>
                    </label>
                    <div className="rc-input-box">
                      <select
                        value={passengers}
                        onChange={(e) => setPassengers(e.target.value)}
                        className="rc-select"
                      >
                        <option value="1">1 {t.passengersWord}</option>
                        <option value="2">2 {t.passengersWord}</option>
                        <option value="3">3 {t.passengersWord}</option>
                        <option value="4">4 {t.passengersWord}</option>
                        <option value="6">6 {t.passengersWord}</option>
                        <option value="7">7 {t.passengersWord}</option>
                        <option value="10">10 {t.passengersWord}</option>
                        <option value="14">14 {t.passengersWord}</option>
                      </select>
                      <ChevronDown className="rc-chevron" />
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="rc-form-action">
                    <button type="submit" className="rc-btn-search">
                      <span>{t.searchButton}</span>
                      <span>{isRtl ? '←' : '→'}</span>
                    </button>
                  </div>
                </div>

                {/* Cash Guarantee Notice */}
                <div className="rc-form-guarantee">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D6A13A] shrink-0" />
                  <span>{t.cashGuarantee}</span>
                </div>

                {feedback && (
                  <p className="rc-feedback-alert" role="alert">
                    {feedback}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 02: OUR FLEET ("CHOOSE YOUR CLASS")
      ────────────────────────────────────────────────────────────── */}
      <section className="rc-fleet-section" id="fleet">
        <div className="rc-container">
          {/* Eyebrow & Title */}
          <div className="rc-section-header-center">
            <div className="rc-eyebrow-divider">
              <span className="rc-eyebrow-line" />
              <span className="rc-eyebrow-text">{t.fleetEyebrow}</span>
              <span className="rc-eyebrow-line" />
            </div>
            <h2 className="rc-h2-light">{t.fleetTitle}</h2>
            <p className="rc-p-light">{t.fleetSubtitle}</p>
          </div>

          {/* Carousel Layout with Controls */}
          <div className="rc-carousel-wrapper">
            {/* Left arrow button */}
            <button
              type="button"
              onClick={handlePrevCar}
              aria-label="Previous Vehicle"
              className="rc-carousel-nav rc-nav-prev"
            >
              {isRtl ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>

            {/* Fleet Cards Grid / Carousel */}
            <div className="rc-fleet-grid">
              {fleetCards.map((car, idx) => (
                <div
                  key={car.id}
                  className={\`rc-car-card \${car.isPopular ? 'rc-card-featured' : ''} \${
                    idx === carouselIndex ? 'rc-card-active-mobile' : ''
                  }\`}
                >
                  {/* Top Badge for Most Popular */}
                  {car.isPopular && (
                    <div className="rc-badge-popular">
                      <span>{t.mostPopularTag}</span>
                    </div>
                  )}

                  {/* Vehicle Image */}
                  <div className="rc-car-img-wrap">
                    <Image
                      src={car.image}
                      alt={car.name}
                      width={320}
                      height={180}
                      className="rc-car-img"
                    />
                  </div>

                  {/* Vehicle Title */}
                  <h3 className="rc-car-title">{car.name}</h3>

                  {/* Specifications */}
                  <div className="rc-car-specs">
                    <span>👤 {car.pax} {t.passengersWord}</span>
                    <span className="rc-spec-divider">•</span>
                    <span>🧳 {car.bags} {t.bagsWord}</span>
                  </div>

                  {/* Price */}
                  <div className="rc-car-price">
                    <span className="rc-price-prefix">{t.fromPricePrefix}</span>
                    <strong className="rc-price-amount">{formatPrice(car.fromPrice)}</strong>
                  </div>

                  {/* Booking CTA Button */}
                  <Link
                    href={\`/\${locale}/booking?vehicle=\${car.id}\`}
                    className="rc-btn-book-card"
                  >
                    <span>{t.bookNowBtn}</span>
                    <span>{isRtl ? '←' : '→'}</span>
                  </Link>
                </div>
              ))}
            </div>

            {/* Right arrow button */}
            <button
              type="button"
              onClick={handleNextCar}
              aria-label="Next Vehicle"
              className="rc-carousel-nav rc-nav-next"
            >
              {isRtl ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Pagination Dots */}
          <div className="rc-carousel-dots sm:hidden">
            {fleetCards.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCarouselIndex(i)}
                aria-label={\`Go to slide \${i + 1}\`}
                className={\`rc-dot \${carouselIndex === i ? 'rc-dot-active' : ''}\`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 03: PREMIUM TRANSPORTATION SERVICES
      ────────────────────────────────────────────────────────────── */}
      <section className="rc-services-section" id="services">
        <div className="rc-container">
          <div className="rc-services-header">
            <h2 className="rc-h2-light">{t.servicesTitle}</h2>
            <p className="rc-p-light">{t.servicesSubtitle}</p>
          </div>

          <div className="rc-services-split-grid">
            {/* Left: 2x2 Services Cards */}
            <div className="rc-services-cards-grid">
              {/* Service 1: Airport Transfers */}
              <div className="rc-srv-card">
                <div className="rc-srv-icon-wrap">
                  <Plane className="w-5 h-5 text-[#D6A13A]" />
                </div>
                <div>
                  <h3 className="rc-srv-title">{t.srvAirportTitle}</h3>
                  <p className="rc-srv-sub">{t.srvAirportSub}</p>
                </div>
              </div>

              {/* Service 2: Ziyarat Trips */}
              <div className="rc-srv-card">
                <div className="rc-srv-icon-wrap">
                  <Compass className="w-5 h-5 text-[#D6A13A]" />
                </div>
                <div>
                  <h3 className="rc-srv-title">{t.srvZiyaratTitle}</h3>
                  <p className="rc-srv-sub">{t.srvZiyaratSub}</p>
                </div>
              </div>

              {/* Service 3: Intercity Travel */}
              <div className="rc-srv-card">
                <div className="rc-srv-icon-wrap">
                  <Car className="w-5 h-5 text-[#D6A13A]" />
                </div>
                <div>
                  <h3 className="rc-srv-title">{t.srvIntercityTitle}</h3>
                  <p className="rc-srv-sub">{t.srvIntercitySub}</p>
                </div>
              </div>

              {/* Service 4: Hotel Transfers */}
              <div className="rc-srv-card">
                <div className="rc-srv-icon-wrap">
                  <Building2 className="w-5 h-5 text-[#D6A13A]" />
                </div>
                <div>
                  <h3 className="rc-srv-title">{t.srvHotelTitle}</h3>
                  <p className="rc-srv-sub">{t.srvHotelSub}</p>
                </div>
              </div>
            </div>

            {/* Right: Featured Cinematic SUV Landscape Image */}
            <div className="rc-services-visual-wrap">
              <Image
                src="/assets/images/cinematic/services/services-suv-retina.jpg"
                alt="Premium Chauffeur SUV overlooking Saudi Arabia"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="rc-services-visual-overlay" />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 04: POPULAR ROUTES & WHY CHOOSE US (WARM SANDSTONE #F7F4EE)
      ────────────────────────────────────────────────────────────── */}
      <section className="rc-sandstone-section" id="routes">
        <div className="rc-container">
          <div className="rc-sandstone-split-grid">
            {/* Left 60%: Popular Routes & Prices */}
            <div className="rc-routes-col">
              <h2 className="rc-h2-dark">{t.routesTitle}</h2>
              <p className="rc-p-dark">{t.routesSubtitle}</p>

              <div className="rc-routes-list">
                {/* Route 1: Jeddah Airport to Makkah */}
                <Link
                  href={\`/\${locale}/booking?route=jeddah-airport-to-makkah\`}
                  className="rc-route-white-card"
                >
                  <div className="rc-route-thumb">
                    <Image
                      src="/assets/images/routes/jeddah-airport-to-makkah.jpg"
                      alt="Jeddah to Makkah"
                      fill
                      sizes="120px"
                      className="object-cover"
                    />
                  </div>
                  <div className="rc-route-info">
                    <h3 className="rc-route-name">{t.route1Title}</h3>
                    <div className="rc-route-meta">
                      <Clock className="w-3.5 h-3.5 text-[#D6A13A]" />
                      <span>{t.route1Time}</span>
                    </div>
                  </div>
                  <div className="rc-route-fare-box">
                    <span className="rc-route-fare-val">{t.fromPricePrefix} {formatPrice(200)}</span>
                    <div className="rc-route-arrow-btn">
                      <span>{isRtl ? '←' : '→'}</span>
                    </div>
                  </div>
                </Link>

                {/* Route 2: Makkah to Madinah */}
                <Link
                  href={\`/\${locale}/booking?route=makkah-to-madinah\`}
                  className="rc-route-white-card"
                >
                  <div className="rc-route-thumb">
                    <Image
                      src="/assets/images/routes/makkah-to-madinah.jpg"
                      alt="Makkah to Madinah"
                      fill
                      sizes="120px"
                      className="object-cover"
                    />
                  </div>
                  <div className="rc-route-info">
                    <h3 className="rc-route-name">{t.route2Title}</h3>
                    <div className="rc-route-meta">
                      <Clock className="w-3.5 h-3.5 text-[#D6A13A]" />
                      <span>{t.route2Time}</span>
                    </div>
                  </div>
                  <div className="rc-route-fare-box">
                    <span className="rc-route-fare-val">{t.fromPricePrefix} {formatPrice(400)}</span>
                    <div className="rc-route-arrow-btn">
                      <span>{isRtl ? '←' : '→'}</span>
                    </div>
                  </div>
                </Link>

                {/* Route 3: Madinah Airport to Hotel */}
                <Link
                  href={\`/\${locale}/booking?route=madinah-airport-to-madinah\`}
                  className="rc-route-white-card"
                >
                  <div className="rc-route-thumb">
                    <Image
                      src="/assets/images/routes/madinah-airport.jpg"
                      alt="Madinah Airport"
                      fill
                      sizes="120px"
                      className="object-cover"
                    />
                  </div>
                  <div className="rc-route-info">
                    <h3 className="rc-route-name">{t.route3Title}</h3>
                    <div className="rc-route-meta">
                      <Clock className="w-3.5 h-3.5 text-[#D6A13A]" />
                      <span>{t.route3Time}</span>
                    </div>
                  </div>
                  <div className="rc-route-fare-box">
                    <span className="rc-route-fare-val">{t.fromPricePrefix} {formatPrice(200)}</span>
                    <div className="rc-route-arrow-btn">
                      <span>{isRtl ? '←' : '→'}</span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Right 40%: Why Choose Duyuf Al Rahman VIP */}
            <div className="rc-why-col">
              {/* Islamic Calligraphy Watermark in corner */}
              <div className="rc-why-watermark">
                <Image
                  src="/assets/brand/calligraphy-watermark.svg"
                  alt="Islamic Emblem Watermark"
                  width={240}
                  height={240}
                  className="object-contain"
                />
              </div>

              <h2 className="rc-h2-dark">{t.whyTitle}</h2>

              <ul className="rc-why-checklist">
                <li className="rc-why-item">
                  <div className="rc-why-check">
                    <Check className="w-4 h-4 text-[#D6A13A]" />
                  </div>
                  <span>{t.why1}</span>
                </li>
                <li className="rc-why-item">
                  <div className="rc-why-check">
                    <Check className="w-4 h-4 text-[#D6A13A]" />
                  </div>
                  <span>{t.why2}</span>
                </li>
                <li className="rc-why-item">
                  <div className="rc-why-check">
                    <Check className="w-4 h-4 text-[#D6A13A]" />
                  </div>
                  <span>{t.why3}</span>
                </li>
                <li className="rc-why-item">
                  <div className="rc-why-check">
                    <Check className="w-4 h-4 text-[#D6A13A]" />
                  </div>
                  <span>{t.why4}</span>
                </li>
                <li className="rc-why-item">
                  <div className="rc-why-check">
                    <Check className="w-4 h-4 text-[#D6A13A]" />
                  </div>
                  <span>{t.why5}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 05: FREQUENTLY ASKED QUESTIONS & UMRAH CTA CARD
      ────────────────────────────────────────────────────────────── */}
      <section className="rc-faq-section" id="faq">
        <div className="rc-container">
          <div className="rc-faq-split-grid">
            {/* Left 60%: FAQ Accordion */}
            <div className="rc-faq-col">
              <h2 className="rc-h2-light">{t.faqTitle}</h2>
              <p className="rc-p-light">{t.faqSubtitle}</p>

              <div className="rc-faq-accordion-grid">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className={\`rc-faq-pill \${isOpen ? 'rc-faq-open' : ''}\`}
                      onClick={() => toggleFaq(idx)}
                    >
                      <div className="rc-faq-pill-header">
                        <span className="rc-faq-q">{faq.q}</span>
                        <div className="rc-faq-toggle-icon">
                          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </div>
                      </div>
                      {isOpen && (
                        <div className="rc-faq-pill-body">
                          <p>{faq.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right 40%: Umrah CTA Card */}
            <div className="rc-cta-card-col">
              <div className="rc-umrah-cta-card">
                <Image
                  src="/assets/images/cinematic/home/faq-cta-retina.jpg"
                  alt="Ready for Umrah Journey"
                  fill
                  sizes="(max-width: 1024px) 100vw, 38vw"
                  className="object-cover"
                />
                <div className="rc-cta-card-overlay" />
                <div className="rc-cta-card-content">
                  <h3 className="rc-cta-card-title">{t.ctaCardTitle}</h3>
                  <p className="rc-cta-card-sub">{t.ctaCardSub}</p>
                  <Link href={\`/\${locale}/booking\`} className="rc-btn-gold-cta">
                    <span>{t.ctaCardBtn}</span>
                    <span>{isRtl ? '←' : '→'}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 06: MOBILE FLOATING WHATSAPP BUTTON
      ────────────────────────────────────────────────────────────── */}
      <aside
        aria-label="WhatsApp Support"
        className="fixed bottom-5 right-5 sm:hidden z-40"
      >
        <a
          href="https://wa.me/966567588261"
          target="_blank"
          rel="noopener noreferrer"
          className="rc-floating-whatsapp"
        >
          <div className="rc-wa-icon-circle">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <span className="rc-wa-text">{t.chatWithUs}</span>
        </a>
      </aside>
    </div>
  );
}
`;

fs.writeFileSync(path.join(projectRoot, 'src/components/home/RoyalHomepageExperience.tsx'), componentCode, 'utf8');
console.log('RoyalHomepageExperience.tsx written successfully');
`;

const scriptPath = path.join(projectRoot, 'scripts/build-master-mockup-homepage.mjs');
fs.writeFileSync(scriptPath, componentCode, 'utf8');
