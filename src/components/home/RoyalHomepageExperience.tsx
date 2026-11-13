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
  Luggage,
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
  Sparkles,
  Award,
  Phone,
  Train,
} from 'lucide-react';
import {
  Spotlight,
  BorderBeam,
  CardContainer,
  CardBody,
  CardItem,
  Meteors,
  Marquee,
  ShimmerButton,
  AnimatedShinyText,
  BentoGrid,
  BentoGridItem,
  NumberTicker,
  AuroraBackground,
} from '@/components/ui/luxury';
import { LuxuryFleetShowcase } from '@/components/fleet/LuxuryFleetShowcase';
import { CinematicTravelHero } from '@/components/home/CinematicTravelHero';
import { LayeredPremiumFleetDeck } from '@/components/home/LayeredPremiumFleetDeck';
import { PremiumHowItWorks } from '@/components/home/PremiumHowItWorks';
import { PremiumTrustStatistics } from '@/components/home/PremiumTrustStatistics';
import { ArcDestinationGallery } from '@/components/home/ArcDestinationGallery';
import { EditorialServicesSection } from '@/components/home/EditorialServicesSection';
import { InteractiveRoutesExplorer } from '@/components/home/InteractiveRoutesExplorer';
import { PremiumFaqAccordion } from '@/components/home/PremiumFaqAccordion';
import { EditorialBlogExperience } from '@/components/blog/EditorialBlogExperience';
import type { EditorialPostPreview } from '@/lib/blog-editorial-mapper';
import type { ExplorerRouteItem } from '@/lib/routes-explorer-mapper';

interface RoyalHomepageExperienceProps {
  locale: Locale;
  dict: Dictionary;
  settings?: SiteSettings;
  vehicles?: any[];
  blogPreviews?: EditorialPostPreview[];
  explorerRoutes?: ExplorerRouteItem[];
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
  hi: {
    heroTitleTop: 'अपनी निजी यात्रा',
    heroTitleGold: 'बुक करें',
    heroSubtitle: 'पूरे सऊदी अरब में आरामदायक, विश्वसनीय और प्रीमियम परिवहन का अनुभव करें',
    trust247: '24/7 सेवा',
    trustFlight: 'उड़ान ट्रैकिंग',
    trustWaiting: 'मुफ्त प्रतीक्षा (60 मिनट तक)',
    planTripPill: 'अपनी यात्रा की योजना बनाएं',
    step1: 'यात्रा विवरण',
    step2: 'वाहन चुनें',
    step3: 'आपकी जानकारी',
    pickupLabel: 'पिकअप स्थान',
    pickupPlaceholder: 'पिकअप स्थान चुनें',
    destLabel: 'गंतव्य',
    destPlaceholder: 'गंतव्य चुनें',
    dateLabel: 'यात्रा तिथि',
    timeLabel: 'समय',
    timePlaceholder: 'समय चुनें',
    passengersLabel: 'यात्री',
    searchButton: 'वाहन खोजें',
    cashGuarantee: 'सुरक्षित पहुंचने पर ड्राइवर को नकद भुगतान • सभी टोल और टैक्स शामिल • कोई अग्रिम भुगतान नहीं',
    errorSelectFields: 'कृपया पिकअप, गंतव्य और यात्रा तिथि चुनें।',
    errorSameLocation: 'कृपया दो अलग स्थान चुनें।',
    locJeddahAirport: 'जेद्दाह हवाई अड्डा (KAIA)',
    locMakkah: 'मक्का मुकर्रमा',
    locMadinahAirport: 'मदीना हवाई अड्डा',
    locMadinah: 'मदीना मुनव्वरा',
    locTaif: 'ताइफ',
    locRiyadh: 'रियाद',
    fleetEyebrow: 'हमारा बेड़ा',
    fleetTitle: 'अपनी क्लास चुनें',
    fleetSubtitle: 'हमारे प्रीमियम आधुनिक वाहनों के साथ शान से यात्रा करें',
    passengersWord: 'यात्री',
    bagsWord: 'बैग',
    fromPricePrefix: 'प्रारंभिक',
    bookNowBtn: 'अभी बुक करें',
    mostPopularTag: 'सर्वाधिक लोकप्रिय',
    servicesTitle: 'प्रीमियम परिवहन सेवाएं',
    servicesSubtitle: 'उमराह और यात्रा के लिए संपूर्ण और आरामदायक परिवहन समाधान',
    srvAirportTitle: 'हवाई अड्डा स्थानांतरण',
    srvAirportSub: 'जेद्दाह से मक्का और मदीना',
    srvZiyaratTitle: 'ज़ियारत यात्राएं',
    srvZiyaratSub: 'पवित्र स्थलों के दर्शन',
    srvIntercityTitle: 'अंतरशहरी यात्रा',
    srvIntercitySub: 'पूरे सऊदी अरब में',
    srvHotelTitle: 'होटल स्थानांतरण',
    srvHotelSub: 'आरामदायक और समयबद्ध',
    routesTitle: 'लोकप्रिय मार्ग और दरें',
    routesSubtitle: 'आपकी सुविधा के लिए बिना किसी छिपे शुल्क के निश्चित दरें',
    route1Title: 'जेद्दाह हवाई अड्डा ➔ मक्का',
    route1Time: '60 – 75 मिनट',
    route2Title: 'मक्का ➔ मदीना',
    route2Time: '4 – 5 घंटे',
    route3Title: 'मदीना हवाई अड्डा ➔ होटल',
    route3Time: '60 – 90 मिनट',
    whyTitle: 'दुयुफ अल-रहमान VIP क्यों चुनें?',
    why1: 'आधुनिक और उच्चतम स्वच्छता मानकों वाला बेड़ा',
    why2: 'अनुभवी और शिष्ट पेशेवर ड्राइवर',
    why3: 'बिना किसी छिपे शुल्क के पारदर्शी दरें',
    why4: 'हवाई अड्डे पर 60 मिनट तक मुफ्त प्रतीक्षा',
    why5: '24/7 समर्पित ग्राहक सहायता',
    faqTitle: 'अक्सर पूछे जाने वाले प्रश्न',
    faqSubtitle: 'हमारी परिवहन सेवाओं के बारे में मुख्य प्रश्नों के उत्तर',
    faq1Q: 'यात्रा कैसे बुक करें?',
    faq1A: 'वेबसाइट पर फॉर्म भरकर या सीधे व्हाट्सएप पर हमारे कंसीयज से संपर्क करके बुक करें।',
    faq2Q: 'भुगतान के कौन से तरीके उपलब्ध हैं?',
    faq2A: 'पहुंचने के बाद ड्राइवर को 100% नकद भुगतान किया जाता है। किसी अग्रिम कार्ड भुगतान की आवश्यकता नहीं है।',
    faq3Q: 'हवाई अड्डे पर मुफ्त प्रतीक्षा समय कितना है?',
    faq3A: 'फ्लाइट लैंडिंग के बाद 60 मिनट तक की मुफ्त प्रतीक्षा सुविधा उपलब्ध है।',
    faq4Q: 'क्या बुकिंग रद्द की जा सकती है?',
    faq4A: 'हाँ, यात्रा से पहले बुकिंग रद्द करना पूरी तरह से निःशुल्क और लचीला है।',
    faq5Q: 'क्या बच्चों की सीटें प्रदान की जाती हैं?',
    faq5A: 'हाँ, अनुरोध करने पर बच्चों की सुरक्षा सीटें निःशुल्क उपलब्ध कराई जाती हैं।',
    faq6Q: 'क्या आपकी सेवा पूरे सऊदी अरब में है?',
    faq6A: 'हाँ, हम जेद्दाह, मक्का, मदीना, रियाद और ताइफ सहित सभी प्रमुख शहरों में सेवाएं देते हैं।',
    ctaCardTitle: 'शांतिपूर्ण उमराह यात्रा के लिए तैयार हैं?',
    ctaCardSub: 'आज ही अपना निजी वाहन बुक करें और परिवार के साथ सुगम यात्रा का आनंद लें।',
    ctaCardBtn: 'अभी बुक करें',
    chatWithUs: 'व्हाट्सएप पर चैट करें',
  },
};

export function RoyalHomepageExperience({
  locale,
  dict,
  settings,
  vehicles = [],
  blogPreviews = [],
  explorerRoutes = [],
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

  // Showroom & Ziyarat States
  const [selectedShowroomCar, setSelectedShowroomCar] = useState(0);
  const [selectedZiyaratCity, setSelectedZiyaratCity] = useState<'makkah' | 'madinah'>('makkah');
  const [ziyaratHours, setZiyaratHours] = useState(4);

  const showroomVehicles = useMemo(() => [
    {
      id: 'gmc-yukon-xl',
      name: isAr ? 'جي إم سي يوكون XL برستيج' : 'GMC Yukon XL VIP Prestige',
      subtitle: isAr ? 'الخيار الرئاسي الأول للعائلات والوفود الدبلوماسية' : 'The Presidential Choice for Large Families & Diplomatic Delegations',
      image: '/assets/images/studio-2k/gmc-yukon-studio-2k.webp',
      pax: 7,
      bags: 8,
      zamzam: 4,
      seniorAccess: isAr ? 'عتبة صعود كهربائية متحركة لسهولة ركوب كبار السن' : 'Electric Retractable Step for Senior Ease-of-Access',
      climate: isAr ? 'تكييف ثلاثي المناطق عالي التبريد' : 'Tri-Zone Automatic Climate Control',
      isolation: isAr ? 'عزل صوتي فائق الهدوء للسكينة التامة' : 'Acoustic Sound Isolation & Privacy Glass',
      luggageDesc: isAr ? 'تتسع لـ 8 حقائب سفر كبيرة + 4 عبوات ماء زمزم 5 لتر' : 'Accommodates 8 large suitcases + 4 Zamzam water containers',
      rates: [
        { route: isAr ? 'مطار جدة ➔ مكة المكرمة' : 'Jeddah Airport ➔ Makkah', price: 380 },
        { route: isAr ? 'مكة المكرمة ➔ المدينة المنورة' : 'Makkah ➔ Madinah', price: 800 },
        { route: isAr ? 'جولة مزارات مكة المكرمة' : 'Makkah Ziyarat Tour', price: 400 },
      ]
    },
    {
      id: 'mercedes-s-class',
      name: isAr ? 'مرسيدس الفئة S رويال VIP' : 'Mercedes S-Class Royal VIP',
      subtitle: isAr ? 'قمة الفخامة الألمانية لرجال الأعمال والرحلات الخاصة' : 'The Pinnacle of German Luxury for VIPs & Business Chauffeurs',
      image: '/assets/images/studio-2k/mercedes-s-class-studio-2k.webp',
      pax: 3,
      bags: 3,
      zamzam: 2,
      seniorAccess: isAr ? 'مقاعد جلد نابا فائقة النعومة مع نظام مساج وتبريد' : 'Executive Nappa Leather Seats with Massage & Cooling',
      climate: isAr ? 'تكييف هوائي ذكي مع منقي الروائح والأيونات' : 'Intelligent Dual Climate with Air Ionizer',
      isolation: isAr ? 'زجاج مزدوج مصفح عازل للضوضاء وحرارة الشمس' : 'Double Acoustic Laminated Solar Glass',
      luggageDesc: isAr ? 'تتسع لـ 3 حقائب سفر قياسية + 2 عبوة ماء زمزم' : 'Accommodates 3 standard bags + 2 Zamzam water containers',
      rates: [
        { route: isAr ? 'مطار جدة ➔ مكة المكرمة' : 'Jeddah Airport ➔ Makkah', price: 350 },
        { route: isAr ? 'مكة المكرمة ➔ المدينة المنورة' : 'Makkah ➔ Madinah', price: 950 },
        { route: isAr ? 'جولة مزارات خاصة' : 'Private VIP Ziyarat', price: 600 },
      ]
    },
    {
      id: 'hyundai-staria',
      name: isAr ? 'هيونداي ستاريا كابتن VIP' : 'Hyundai Staria VIP Captain',
      subtitle: isAr ? 'مقصورة صالون مستقبلية بمقاعد مفردة فاخرة وأبواب كهربائية' : 'Futuristic Lounge Cabin with Captain Chairs & Smart Sliding Doors',
      image: '/assets/images/studio-2k/hyundai-staria-studio-2k.webp',
      pax: 6,
      bags: 6,
      zamzam: 4,
      seniorAccess: isAr ? 'أبواب منزلقة أوتوماتيكية بنزول منخفض مثالي لكبار السن' : 'Smart Sliding Electric Doors with Low Ground Clearance',
      climate: isAr ? 'تكييف سقف خلفي موزع بالكامل لكل راكب' : 'Rear Roof AC Vents with Individual Zone Control',
      isolation: isAr ? 'مقاعد كابتن مفردة قابلة للانحناء والاسترخاء' : 'Independent Reclining Captain Seats with Leg Rest',
      luggageDesc: isAr ? 'تتسع لـ 6 حقائب سفر كبيرة + كرسي متحرك لكبار السن' : 'Accommodates 6 large bags + Wheelchair & Stroller space',
      rates: [
        { route: isAr ? 'مطار جدة ➔ مكة المكرمة' : 'Jeddah Airport ➔ Makkah', price: 260 },
        { route: isAr ? 'مكة المكرمة ➔ المدينة المنورة' : 'Makkah ➔ Madinah', price: 600 },
        { route: isAr ? 'جولة مزارات مكة أو المدينة' : 'Makkah or Madinah Ziyarat', price: 350 },
      ]
    },
    {
      id: 'toyota-camry',
      name: isAr ? 'تويوتا كامري التنفيذية' : 'Toyota Camry Executive',
      subtitle: isAr ? 'الخيار الذكي والحديث للأفراد والأزواج والوصول السريع' : 'The Smart & Swift Choice for Individuals, Couples & Fast Airport Transfers',
      image: '/assets/images/studio-2k/toyota-camry-studio-2k.webp',
      pax: 3,
      bags: 3,
      zamzam: 2,
      seniorAccess: isAr ? 'دخول سلس وارتفاع متزن لركوب مريح بدون عناء' : 'Smooth Low-Profile Entry for Effortless Access',
      climate: isAr ? 'تكييف تويوتا الأسطوري شديد التبريد' : 'Legendary Rapid-Cooling Air Conditioning',
      isolation: isAr ? 'قيادة هادئة ومقاعد مريحة للرحلات السريعة' : 'Serene Ride Quality & Ergonomic Seating',
      luggageDesc: isAr ? 'تتسع لـ 3 حقائب سفر قياسية بكل سهولة' : 'Accommodates 3 standard travel bags with ease',
      rates: [
        { route: isAr ? 'مطار جدة ➔ مكة المكرمة' : 'Jeddah Airport ➔ Makkah', price: 200 },
        { route: isAr ? 'مكة المكرمة ➔ المدينة المنورة' : 'Makkah ➔ Madinah', price: 450 },
        { route: isAr ? 'مطار المدينة ➔ فنادق الحرم' : 'Madinah Airport ➔ Hotels', price: 200 },
      ]
    },
    {
      id: 'toyota-hiace',
      name: isAr ? 'تويوتا هايس جراند VIP' : 'Toyota HiAce Grand VIP',
      subtitle: isAr ? 'سعة رحبة فائقة للمجموعات والوفود العائلية الكبيرة' : 'Generous Passenger & Luggage Capacity for Extended Families & Groups',
      image: '/assets/images/studio-2k/toyota-hiace-studio-2k.webp',
      pax: 10,
      bags: 12,
      zamzam: 6,
      seniorAccess: isAr ? 'ممر وسطي واسع ومقابض صعود مريحة لكبار السن' : 'Spacious Center Aisle with Sturdy Assist Handrails',
      climate: isAr ? 'تكييف مركزي مزدوج يغطي كافة المقاعد الخلفية' : 'Dual High-Output Climate Control for All 10 Rows',
      isolation: isAr ? 'مقاعد فردية مريحة مع مساند رأس مخصصة' : 'Contoured Individual High-Back Seats',
      luggageDesc: isAr ? 'سعة هائلة تتسع لـ 12 حقيبة سفر كبيرة + كراسٍ متحركة' : 'Huge cargo hold for 12 large bags + Wheelchairs & Strollers',
      rates: [
        { route: isAr ? 'مطار جدة ➔ مكة المكرمة' : 'Jeddah Airport ➔ Makkah', price: 360 },
        { route: isAr ? 'مكة المكرمة ➔ المدينة المنورة' : 'Makkah ➔ Madinah', price: 750 },
        { route: isAr ? 'جولة مزارات المشاعر والآثار' : 'Extended Holy Sites Ziyarat', price: 450 },
      ]
    }
  ], [isAr]);

  const ziyaratSites = useMemo(() => {
    if (selectedZiyaratCity === 'makkah') {
      return [
        {
          name: isAr ? 'غار حراء وجبل النور' : 'Cave Hira & Jabal Al-Nour',
          sub: isAr ? 'مهبط الوحي الأول والمكان الخالد' : 'Site of First Divine Revelation',
          image: '/assets/images/routes/jeddah-airport-to-makkah.jpg',
          stop: isAr ? '45 دقيقة' : '45 mins'
        },
        {
          name: isAr ? 'غار ثور المبارك' : 'Mount Thawr & Sacred Cave',
          sub: isAr ? 'معلم الهجرة النبوية الشريفة' : 'Historic Hijrah Sanctuary',
          image: '/assets/images/routes/makkah-to-madinah.jpg',
          stop: isAr ? '30 دقيقة' : '30 mins'
        },
        {
          name: isAr ? 'المشاعر المقدسة (منى وعرفات)' : 'Holy Sites (Mina & Arafat)',
          sub: isAr ? 'مشاعر الحج الكبرى وجبل الرحمة' : 'Grand Hajj Sanctuaries & Mount Rahmah',
          image: '/assets/images/cinematic/services/services-suv-highway.jpg',
          stop: isAr ? '60 دقيقة' : '60 mins'
        }
      ];
    } else {
      return [
        {
          name: isAr ? 'مسجد قباء' : 'Masjid Quba',
          sub: isAr ? 'أول مسجد أسس على التقوى (صلاة تعدل عمرة)' : 'First Mosque in Islam (Reward of Umrah)',
          image: '/assets/images/routes/madinah-airport.jpg',
          stop: isAr ? '45 دقيقة' : '45 mins'
        },
        {
          name: isAr ? 'جبل أحد ومقبرة الشهداء' : 'Mount Uhud & Martyrs Cemetery',
          sub: isAr ? 'جبل يحبنا ونحبه وروضة الشهداء' : 'A Mountain that Loves Us & Martyrs Memorial',
          image: '/assets/images/routes/makkah-to-madinah.jpg',
          stop: isAr ? '40 دقيقة' : '40 mins'
        },
        {
          name: isAr ? 'مسجد القبلتين' : 'Masjid Al-Qiblatain',
          sub: isAr ? 'معلم تحويل القبلة في الإسلام' : 'Site of the Historic Change of Qibla',
          image: '/assets/images/routes/jeddah-airport-to-makkah.jpg',
          stop: isAr ? '35 دقيقة' : '35 mins'
        }
      ];
    }
  }, [selectedZiyaratCity, isAr]);

  const highwayMilestones = useMemo(() => [
    {
      num: '1',
      title: isAr ? 'الانطلاق من فندق مكة' : 'Makkah Hotel Departure',
      desc: isAr ? 'سائقك الخاص يستقبلك عند بهو الفندق مع مساعدة كاملة في تحميل الأمتعة.' : 'Your private chauffeur meets you at hotel lobby with luggage service.'
    },
    {
      num: '2',
      title: isAr ? 'استراحة ساسكو VIP' : 'Sasco Palm VIP Lounge',
      desc: isAr ? 'توقف مجاني مريح لتناول القهوة، مصلى مكيف، ومرافق نموذجية عالية النظافة.' : 'Complimentary stop for coffee, sanitized restrooms, and prayer hall.'
    },
    {
      num: '3',
      title: isAr ? 'راحة طريق الهجرة السريع' : 'Scenic Hijrah Highway',
      desc: isAr ? 'انسيابية القيادة الهادئة بسرعة قانونية مع مياه زمزم ومشروبات الضيافة.' : 'Serene cruising at legal highway speeds with chilled Zamzam water.'
    },
    {
      num: '4',
      title: isAr ? 'الوصول لفنادق المدينة' : 'Madinah Hotel Arrival',
      desc: isAr ? 'توصيل مباشر إلى بهو فندقكم بجوار المسجد النبوي والدفع نقداً للسائق.' : 'Direct drop-off at your hotel next to the Prophet’s Mosque. Pay cash to driver.'
    }
  ], [isAr]);

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
        image: '/assets/images/studio-2k/mercedes-s-class-studio-2k.webp',
        pax: 3,
        bags: 3,
        fromPrice: 200,
        isPopular: false,
      },
      {
        id: 'hyundai-staria',
        name: isAr ? 'هيونداي ستاريا' : 'Hyundai Staria',
        image: '/assets/images/studio-2k/hyundai-staria-studio-2k.webp',
        pax: 6,
        bags: 6,
        fromPrice: 260,
        isPopular: false,
      },
      {
        id: 'toyota-camry',
        name: isAr ? 'تويوتا كامري' : 'Toyota Camry',
        image: '/assets/images/studio-2k/toyota-camry-studio-2k.webp',
        pax: 3,
        bags: 3,
        fromPrice: 200,
        isPopular: true, // Most Popular featured card with gold border
      },
      {
        id: 'gmc-yukon-xl',
        name: isAr ? 'جي إم سي يوكون XL' : 'GMC Yukon XL',
        image: '/assets/images/studio-2k/gmc-yukon-studio-2k.webp',
        pax: 6,
        bags: 6,
        fromPrice: 380,
        isPopular: false,
      },
      {
        id: 'toyota-hiace',
        name: isAr ? 'تويوتا هايس' : 'Hiace Van',
        image: '/assets/images/studio-2k/toyota-hiace-studio-2k.webp',
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
      `/${locale}/booking?pickup=${encodeURIComponent(pickup)}&destination=${encodeURIComponent(
        dropoff
      )}&date=${encodeURIComponent(travelDate)}&time=${encodeURIComponent(
        travelTime
      )}&passengers=${encodeURIComponent(passengers)}`
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
    <div className="rc-master-page w-full max-w-full overflow-x-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* ─────────────────────────────────────────────────────────────
          SECTION 01: CINEMATIC TRAVEL HERO (IDEA 01 - VIDEO 01)
      ────────────────────────────────────────────────────────────── */}
      <CinematicTravelHero locale={locale} dict={dict} />

      {/* ─────────────────────────────────────────────────────────────
          VIP LIVE RUNNING MARQUEE TICKER (OPEN-SOURCE MAGIC UI)
      ────────────────────────────────────────────────────────────── */}
      <section className="relative z-20 w-full max-w-full bg-[#090D15] border-y border-[rgba(214,161,58,0.25)] py-3.5 overflow-hidden">
        <Marquee pauseOnHover repeat={4} duration={35} className="[--gap:2.5rem] w-full max-w-full">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#F6F3ED] font-medium whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <span>{isAr ? 'سائقون معتمدون متاحون الآن في مطار جدة والحرم المكي' : 'Chauffeurs on standby at Jeddah Airport & Makkah'}</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#D6A13A] font-semibold whitespace-nowrap">
            <CheckCircle2 className="w-4 h-4 text-[#D6A13A]" />
            <span>{isAr ? '0% دفعة مقدمة • الدفع 100% نقداً للسائق عند الوصول' : '0% Prepayment • 100% Cash-on-Arrival'}</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#F6F3ED] font-medium whitespace-nowrap">
            <Plane className="w-4 h-4 text-[#D6A13A]" />
            <span>{isAr ? 'تتبع مجاني لرحلات الطيران وانتظار 60 دقيقة في الصالة' : 'Free Flight Tracking & 60-Min Airport Waiting'}</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#AEB7C4] whitespace-nowrap">
            <Car className="w-4 h-4 text-[#D6A13A]" />
            <span>{isAr ? 'أسطول حصري موديل 2024 - 2026 معقم ومجهز بزمزم' : 'Exclusive 2024-2026 Fleet with Zamzam Water'}</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#25D366] font-semibold whitespace-nowrap">
            <MessageCircle className="w-4 h-4" />
            <span>{isAr ? 'تنسيق مباشر وسريع عبر الواتساب على مدار 24 ساعة' : '24/7 Direct WhatsApp Dispatch Coordination'}</span>
          </div>
        </Marquee>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          PROMPT 7: VERIFIED TRUST AND OPERATIONAL STATISTICS
      ────────────────────────────────────────────────────────────── */}
      <PremiumTrustStatistics locale={locale} dict={dict} />

      {/* ─────────────────────────────────────────────────────────────
          PROMPT 1: PREMIUM ARC DESTINATION GALLERY (MAKKAH & MADINAH)
      ────────────────────────────────────────────────────────────── */}
      <ArcDestinationGallery locale={locale} dict={dict} />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 02: LAYERED PREMIUM FLEET DECK (IDEA 15 - VIDEO 15)
      ────────────────────────────────────────────────────────────── */}
      <LayeredPremiumFleetDeck locale={locale} dict={dict} />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 02C: PREMIUM HOW IT WORKS EXPERIENCE (3-STEP CUSTOMER JOURNEY)
      ────────────────────────────────────────────────────────────── */}
      <PremiumHowItWorks locale={locale} dict={dict} />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 03: PROMPT 2 — EDITORIAL SERVICES EXPERIENCE
      ────────────────────────────────────────────────────────────── */}
      <EditorialServicesSection locale={locale} dict={dict} />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 03B: SCENIC HIJRAH HIGHWAY MILESTONE CORRIDOR (ROUTE 15)
      ────────────────────────────────────────────────────────────── */}
      <section className="rc-corridor-master" id="corridor">
        <div className="rc-container">
          <div className="rc-section-header-center">
            <div className="rc-eyebrow-divider">
              <span className="rc-eyebrow-line" />
              <span className="rc-eyebrow-text">{isAr ? 'رحلة الهجرة النبوية المباركة' : 'THE SCENIC HIJRAH CORRIDOR'}</span>
              <span className="rc-eyebrow-line" />
            </div>
            <h2 className="rc-h2-light">{isAr ? 'من مكة المكرمة إلى المدينة المنورة' : 'Makkah to Madinah Private Highway Journey'}</h2>
            <p className="rc-p-light">
              {isAr
                ? 'تجربة نقل خاصة من الباب إلى الباب عبر طريق الهجرة السريع (450 كم) بخصوصية وسكينة تامة'
                : 'Direct door-to-door VIP chauffeur travel across Highway 15 (450 km) with total serenity'}
            </p>
          </div>

          {/* 4 Milestones */}
          <div className="rc-milestone-bar">
            {highwayMilestones.map((m, idx) => (
              <div key={idx} className="rc-milestone-node">
                <div className="rc-node-num">{m.num}</div>
                <h3 className="text-white font-bold text-base mb-2">{m.title}</h3>
                <p className="text-xs text-[#AEB7C4] leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>

          {/* Objective Comparison: Duyuf VIP vs Haramain Train */}
          <div className="rc-compare-grid">
            {/* VIP Chauffeur with Animated Gold BorderBeam */}
            <div className="rc-compare-vip relative overflow-hidden">
              <BorderBeam size={240} duration={14} colorFrom="#D6A13A" colorTo="#E5B14B" />
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(214,161,58,0.2)] text-[#D6A13A] font-bold text-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isAr ? 'خيار العائلات وكبار السن المفضل' : 'Preferred for Families & Seniors'}</span>
                </span>
                <span className="text-xs text-[#AEB7C4]">{isAr ? 'من الباب إلى الباب' : 'Door-to-Door'}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {isAr ? 'سائق ضيوف الرحمن الخاص VIP' : 'Duyuf Al Rahman VIP Private Chauffeur'}
              </h3>
              <ul className="space-y-2.5 text-xs text-white">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#D6A13A] shrink-0" />
                  <span>{isAr ? 'استقبال مباشر من بهو فندق مكة وتوصيل لبهو فندق المدينة' : 'Direct lobby-to-lobby pickup and drop-off without transit hassle'}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#D6A13A] shrink-0" />
                  <span>{isAr ? 'سعة أمتعة غير محدودة تشمل 8 حقائب وماء زمزم مجاناً' : 'Unlimited luggage capacity for up to 8 bags & Zamzam water'}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#D6A13A] shrink-0" />
                  <span>{isAr ? 'توقف مرن عند ميقات السيل الكبير أو الجعرانة حسب رغبتكم' : 'Complimentary 30-45 min Miqat stop included on demand'}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#D6A13A] shrink-0" />
                  <span>{isAr ? 'دفع نقدي للسائق عند الوصول بدون أي دفع مسبق' : 'Pay cash to driver upon arrival with 0% prepayment'}</span>
                </li>
              </ul>
              <div className="mt-6 pt-4 border-t border-[rgba(214,161,58,0.3)] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#AEB7C4] block">{isAr ? 'سعر الرحلة بالكامل (لكل المركبة)' : 'Total vehicle fare'}</span>
                  <strong className="text-lg text-[#D6A13A] font-bold">{formatPrice(400)} - {formatPrice(650)}</strong>
                </div>
                <Link
                  href={`/${locale}/booking?route=makkah-to-madinah`}
                  className="rc-btn-search px-5 py-2 text-xs font-bold"
                >
                  <span>{isAr ? 'احجز الرحلة الخاصة' : 'Book Private Transfer'}</span>
                  <span>{isRtl ? '←' : '→'}</span>
                </Link>
              </div>
            </div>

            {/* Haramain High-Speed Train (Neutral Context) */}
            <div className="rc-compare-train">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(255,255,255,0.08)] text-[#AEB7C4] font-semibold text-xs">
                  <Train className="w-3.5 h-3.5" />
                  <span>{isAr ? 'قطار الحرمين السريع' : 'Haramain High-Speed Train'}</span>
                </span>
                <span className="text-xs text-[#AEB7C4]">{isAr ? 'من محطة لمحطة' : 'Station-to-Station'}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {isAr ? 'القطار السريع (مقارنة واقعية)' : 'Haramain Train (Comparative Context)'}
              </h3>
              <ul className="space-y-2.5 text-xs text-[#AEB7C4]">
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AEB7C4] shrink-0" />
                  <span>{isAr ? 'سرعة فائقة (ساعتان و20 دقيقة بين المحطتين)' : 'Fast transit: 2h 20m rail travel time between stations'}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AEB7C4] shrink-0" />
                  <span>{isAr ? 'يتطلب تاكسي من الفندق للمحطة + تاكسي من المحطة للفندق' : 'Requires taxis to/from stations at both departure & arrival'}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AEB7C4] shrink-0" />
                  <span>{isAr ? 'حقيبة سفر واحدة فقط لكل مسافر وتكلفة تذاكر مضاعفة للعوائل' : 'Strict 1-bag limit per person + multiplying ticket costs for families'}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AEB7C4] shrink-0" />
                  <span>{isAr ? 'يتطلب الدفع الإلكتروني المسبق وحجز مبكر قبل نفاد التذاكر' : 'Requires mandatory advance booking & card prepayment'}</span>
                </li>
              </ul>
              <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.1)] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#AEB7C4] block">{isAr ? 'تكلفة عائلة (4 أفراد + تاكسي)' : 'Family cost (4 pax + taxis)'}</span>
                  <strong className="text-base text-white font-semibold">{formatPrice(750)}+</strong>
                </div>
                <span className="text-xs text-[#AEB7C4] italic">{isAr ? 'مناسب للمسافر الفردي الخفيف' : 'Best for solo light travelers'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 03C: SACRED ZIYARAT HUB PREVIEW
      ────────────────────────────────────────────────────────────── */}
      <section className="rc-ziyarat-master" id="ziyarat">
        <div className="rc-container">
          <div className="rc-section-header-center">
            <div className="rc-eyebrow-divider">
              <span className="rc-eyebrow-line" />
              <span className="rc-eyebrow-text">{isAr ? 'المزارات والمعالم الإسلامية' : 'SACRED ZIYARAT HERITAGE'}</span>
              <span className="rc-eyebrow-line" />
            </div>
            <h2 className="rc-h2-light">{isAr ? 'جولات المزارات في مكة المكرمة والمدينة المنورة' : 'Curated Holy Sites Ziyarat Tours'}</h2>
            <p className="rc-p-light">
              {isAr
                ? 'مركبة خاصة تنتظركم في كل معلم، مع سائق عارف بالآثار الإسلامية وأوقات مريحة للاستكشاف والدعاء'
                : 'Dedicated private vehicle with expert chauffeur waiting at each site with total flexibility'}
            </p>
          </div>

          {/* City Switcher + Duration Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <div className="inline-flex p-1 rounded-xl bg-[rgba(16,23,37,0.9)] border border-[rgba(255,255,255,0.12)]">
              <button
                type="button"
                onClick={() => setSelectedZiyaratCity('makkah')}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                  selectedZiyaratCity === 'makkah'
                    ? 'bg-[#D6A13A] text-[#090D15] shadow-md'
                    : 'text-[#AEB7C4] hover:text-white'
                }`}
              >
                {isAr ? 'مزارات مكة المكرمة' : 'Makkah Ziyarat'}
              </button>
              <button
                type="button"
                onClick={() => setSelectedZiyaratCity('madinah')}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                  selectedZiyaratCity === 'madinah'
                    ? 'bg-[#D6A13A] text-[#090D15] shadow-md'
                    : 'text-[#AEB7C4] hover:text-white'
                }`}
              >
                {isAr ? 'مزارات المدينة المنورة' : 'Madinah Ziyarat'}
              </button>
            </div>

            <div className="inline-flex p-1 rounded-xl bg-[rgba(16,23,37,0.9)] border border-[rgba(255,255,255,0.12)]">
              <button
                type="button"
                onClick={() => setZiyaratHours(3)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  ziyaratHours === 3
                    ? 'bg-white text-[#090D15]'
                    : 'text-[#AEB7C4] hover:text-white'
                }`}
              >
                {isAr ? 'جولة قياسية (3 ساعات)' : 'Standard (3 Hours)'}
              </button>
              <button
                type="button"
                onClick={() => setZiyaratHours(5)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  ziyaratHours === 5
                    ? 'bg-white text-[#090D15]'
                    : 'text-[#AEB7C4] hover:text-white'
                }`}
              >
                {isAr ? 'جولة متكاملة (5 ساعات)' : 'Comprehensive (5 Hours)'}
              </button>
            </div>
          </div>

          {/* Ziyarat Cards Grid */}
          <div className="rc-ziyarat-grid">
            {ziyaratSites.map((site, idx) => (
              <div key={idx} className="rc-ziyarat-card">
                <div className="rc-ziyarat-thumb">
                  <Image
                    src={site.image}
                    alt={site.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090D15] via-transparent to-transparent" />
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded bg-[rgba(9,13,21,0.85)] border border-[rgba(214,161,58,0.4)] text-[#D6A13A] text-xs font-semibold backdrop-blur-sm">
                    {site.stop} {isAr ? 'توقف مريح' : 'stop'}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-bold text-sm mb-1">{site.name}</h3>
                  <p className="text-xs text-[#AEB7C4] leading-relaxed mb-4">{site.sub}</p>
                  <div className="pt-3 border-t border-[rgba(255,255,255,0.08)] flex items-center justify-between">
                    <span className="text-xs text-[#AEB7C4]">
                      {isAr ? 'شامل الانتظار والمركبة' : 'Includes private standby'}
                    </span>
                    <strong className="text-sm text-[#D6A13A] font-bold">
                      {formatPrice(ziyaratHours === 3 ? 300 : 450)}
                    </strong>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href={`/${locale}/booking?type=ziyarat&city=${selectedZiyaratCity}&hours=${ziyaratHours}`}
              className="rc-btn-search px-8 py-3 text-sm font-bold inline-flex items-center gap-2"
            >
              <span>{isAr ? `احجز جولة ${selectedZiyaratCity === 'makkah' ? 'مكة' : 'المدينة'} (${ziyaratHours} ساعات)` : `Reserve ${selectedZiyaratCity === 'makkah' ? 'Makkah' : 'Madinah'} Tour (${ziyaratHours} Hours)`}</span>
              <span>{isRtl ? '←' : '→'}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 04: PROMPT 3 — INTERACTIVE ROUTES EXPLORER
      ────────────────────────────────────────────────────────────── */}
      <InteractiveRoutesExplorer locale={locale} dict={dict} routes={explorerRoutes} />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 04B: WHY CHOOSE DUYUF AL RAHMAN VIP (PRESERVED TRUST BAND)
      ────────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-16 bg-[#0B101C] border-b border-[rgba(255,255,255,0.06)] relative overflow-hidden" id="why-choose-us">
        <div className="rc-container relative z-10">
          <div className="rc-why-col max-w-4xl mx-auto">
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
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 04.5: LATEST EDITORIAL GUIDES & VIP BLOG SHOWCASE
      ────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#090D15] border-t border-[rgba(214,161,58,0.2)]" id="blog-preview">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101827] border border-[rgba(214,161,58,0.3)] mb-3">
                <span className="w-2 h-2 rounded-full bg-[#D6A13A] animate-pulse" />
                <span className="text-[12px] font-semibold text-[#D6A13A]">
                  {isRtl ? 'ثقافة وإرشادات ضيوف الرحمن' : 'Pilgrim Insights & Travel Guides'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-serif">
                {isRtl ? 'مدونة ومقالات ضيوف الرحمن VIP' : 'Duyuf Alrahman VIP Editorial & Guides'}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
                {isRtl
                  ? 'أدلة حصرية وإرشادات موثوقة لمساعدتكم في تخطيط رحلات العمرة والتنقل بين مكة المكرمة والمدينة المنورة والمطارات'
                  : 'Exclusive insights, pilgrim checklists, and comprehensive chauffeur transport guides for your sacred journey.'}
              </p>
            </div>
            <div>
              <Link
                href={`/${locale}/blog`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[rgba(214,161,58,0.4)] bg-[#101827] text-[#D6A13A] hover:bg-[#D6A13A] hover:text-black font-semibold text-sm transition-all duration-300 shadow-lg shadow-black/40 group"
              >
                <span>{isRtl ? 'تصفح كافة مقالات المدونة' : 'Explore All Articles'}</span>
                <span className="transition-transform group-hover:translate-x-1 duration-200">
                  {isRtl ? '←' : '→'}
                </span>
              </Link>
            </div>
          </div>

          <EditorialBlogExperience
            locale={locale}
            posts={blogPreviews}
            limit={3}
            whatsappNumber={settings?.whatsapp_number}
          />
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 05: PROMPT 8 — PREMIUM INTERACTIVE FAQ EXPERIENCE
      ────────────────────────────────────────────────────────────── */}
      <PremiumFaqAccordion locale={locale} dict={dict} settings={settings} />
    </div>
  );
}
