import fs from 'fs';
import path from 'path';

const royalHomepageCode = `'use client';

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
  Building,
  Palmtree,
  Compass,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Users,
  Luggage,
  Sparkles,
  Banknote,
  MapPin,
  Clock,
  Shield,
  ShieldCheck,
  Calendar,
  Baby,
  Star,
  MessageCircle,
  HelpCircle,
  ChevronDown,
  Car,
  ChevronRight,
  Award,
} from 'lucide-react';
import { AUTHORITATIVE_TRANSFER_RATES } from '@/lib/pricing-constants';

interface RoyalHomepageExperienceProps {
  locale: Locale;
  dict: Dictionary;
  settings?: SiteSettings;
  vehicles?: any[];
}

// ─────────────────────────────────────────────────────────────────────────────
// 10-LANGUAGE STRINGS FOR ROYAL HOMEPAGE
// ─────────────────────────────────────────────────────────────────────────────
const HP_I18N: Record<
  Locale,
  {
    heroBadge: string;
    heroHeadline: string;
    heroSubheadline: string;
    tabTransfer: string;
    tabZiyarat: string;
    tabHourly: string;
    routeLabel: string;
    dateLabel: string;
    timeLabel: string;
    passengersLabel: string;
    luggageLabel: string;
    durationLabel: string;
    ctaViewVehicles: string;
    reassurancePill: string;
    trust1: string;
    trust2: string;
    trust3: string;
    trust4: string;
    trust5: string;
    advantagesBadge: string;
    advantagesTitle: string;
    advantagesSubtitle: string;
    advantages: Array<{ title: string; desc: string; icon: string }>;
    fleetBadge: string;
    fleetTitle: string;
    fleetSubtitle: string;
    fleetDisclaimer: string;
    exploreDetails: string;
    bookThisVehicle: string;
    journeysBadge: string;
    journeysTitle: string;
    journeysSubtitle: string;
    fromStarting: string;
    bookThisRoute: string;
    conciergeBadge: string;
    conciergeTitle: string;
    conciergeSubtitle: string;
    conciergeMaybachTitle: string;
    conciergeMaybachDesc: string;
    conciergeH1Title: string;
    conciergeH1Desc: string;
    conciergeCta: string;
    processBadge: string;
    processTitle: string;
    processSubtitle: string;
    processSteps: Array<{ num: string; title: string; desc: string }>;
    reviewsBadge: string;
    reviewsTitle: string;
    reviewsSubtitle: string;
    faqBadge: string;
    faqTitle: string;
    faqSubtitle: string;
    faqs: Array<{ q: string; a: string }>;
    closingBadge: string;
    closingTitle: string;
    closingSubtitle: string;
    closingBookBtn: string;
    closingWhatsappBtn: string;
  }
> = {
  ar: {
    heroBadge: '★ النقل الملكي الفاخر لضيوف الرحمن',
    heroHeadline: 'رحلتكم إلى بيت الله الحرام تستحق أقصى درجات السكينة والرفاهية',
    heroSubheadline:
      'خدمات السائق الخاص والنقل التنفيذي المعتمد لضيوف الرحمن والعائلات بين مطارات جدة والمدينة المنورة وفنادق مكة المكرمة. أسعار ثابتة معتمدة ودفع نقداً 100% عند الوصول.',
    tabTransfer: 'توصيل المطارات والمدن',
    tabZiyarat: 'جولات المزارات الشريفة',
    tabHourly: 'سائق خاص بالساعة',
    routeLabel: 'مسار الرحلة المعتمد',
    dateLabel: 'تاريخ الرحلة',
    timeLabel: 'وقت الانطلاق',
    passengersLabel: 'الركاب',
    luggageLabel: 'الحقائب',
    durationLabel: 'المدة المطلوبة',
    ctaViewVehicles: 'عرض السيارات المتاحة والأسعار المعتمدة',
    reassurancePill: '0 ريال دفعة مقدمة • سداد نقدي 100% للسائق عند الوصول • تتبع راداري لرحلات الطيران • أسعار ثابتة معتمدة',
    trust1: 'سداد نقدي 100% عند الوصول',
    trust2: 'أسعار ثابتة للمركبة بالكامل',
    trust3: '60 دقيقة انتظار مجاني بالمطار',
    trust4: 'تتبع راداري لرحلات الطيران',
    trust5: 'مياه زمزم مبردة ومساعدة بالأمتعة',
    advantagesBadge: 'معايير الامتياز الملكي',
    advantagesTitle: 'لماذا يختار ضيوف الرحمن خدماتنا الفاخرة؟',
    advantagesSubtitle: 'خمس ركائز راسخة تضمن لكم راحة البال والسكينة التامة في كل خطوة من رحلتكم المباركة.',
    advantages: [
      {
        title: 'خدمة وتوجيه على مدار 24/7',
        desc: 'فريق عمليات وتنسيق ثنائي اللغة يرافقكم على مدار الساعة عبر واتساب والاتصال المباشر لضمان تجربة نقل بلا أي عوائق.',
        icon: 'clock',
      },
      {
        title: 'تتبع راداري فوري لرحلات الطيران',
        desc: 'نرصد رقم رحلتكم عبر الرادار الملاحي لحظة بلحظة؛ في حال أي تأخير، يُعدل موعد وصول السائق تلقائياً مع 60 دقيقة انتظار مجاني.',
        icon: 'plane',
      },
      {
        title: 'مقاعد أمان للأطفال وعناية عائلية',
        desc: 'نوفر مقاعد أمان معقمة ومطابقة لأعلى معايير السلامة للأطفال والرضع مجاناً عند الطلب، مع رحابة فائقة للعائلات وكبار السن.',
        icon: 'baby',
      },
      {
        title: 'إلغاء مرن ومجاني بدون شروط جزائية',
        desc: 'بدون أي عربون أو دفع مسبق؛ يمكنكم تعديل أو إلغاء حجزكم مجاناً حتى 4 ساعات قبل موعد الانطلاق دون أي التزامات مالية.',
        icon: 'calendar',
      },
      {
        title: 'أسعار ثابتة شاملة كافة الضرائب والرسوم',
        desc: 'السعر المتفق عليه نهائي وشامل لكافة رسوم الطرق السريعة وضريبة القيمة المضافة ومواقف المطار، والدفع نقداً للسائق عند الوصول.',
        icon: 'shield',
      },
    ],
    fleetBadge: 'الأسطول الملكي المعتمد',
    fleetTitle: 'سيارات فاخرة مجهزة لأقصى درجات الراحة',
    fleetSubtitle: 'اختر المركبة المناسبة لعدد أفراد عائلتك وحقائبكم؛ كافة السيارات حديثة ومعقمة ومكيفة بأعلى درجات الجودة.',
    fleetDisclaimer: 'تُعرض الأسعار الدقيقة المعتمدة لكل مركبة فور اختيار مسار الرحلة دون أي مبالغ خفية.',
    exploreDetails: 'استكشف مواصفات السيارة',
    bookThisVehicle: 'احجز هذه السيارة الآن',
    journeysBadge: 'المسارات المعتمدة الشائعة',
    journeysTitle: 'أهم وجهات النقل بين الحرمين الشريفين',
    journeysSubtitle: 'تعريفات ثابتة ومعتمدة رسمياً لنقل ضيوف الرحمن والعائلات بين أهم محطات الرحلة المباركة.',
    fromStarting: 'تبدأ من:',
    bookThisRoute: 'احجز هذا المسار الآن',
    conciergeBadge: 'خدمة الكونسيرج الملكية الخاصة',
    conciergeTitle: 'حجوزات السيارات الحصرية لكبار الشخصيات',
    conciergeSubtitle: 'لكبار الشخصيات والوفود الرسمية ورجال الأعمال، نوفر سيارات استثنائية بعروض فورية وخاصة عبر مستشار الحجوزات الملكية.',
    conciergeMaybachTitle: 'مرسيدس مايباخ S-Class VIP',
    conciergeMaybachDesc: 'قمة الفخامة الدبلوماسية وأجنحة الجلوس الملكية من الدرجة الأولى وعزل صوتي فائق لسكينة ضيوف الرحمن.',
    conciergeH1Title: 'هيونداي H1 رويال VIP',
    conciergeH1Desc: 'فان تنفيذي راقٍ برحابة فائقة وخصوصية تامة مخصص للوفود الدبلوماسية والعائلات رفيعة المستوى.',
    conciergeCta: 'طلب تسعير كونسيرج خاص عبر واتساب',
    processBadge: 'خطوات الحجز الميسرة',
    processTitle: 'كيف تحجز رحلتك بثلاث خطوات بسيطة؟',
    processSubtitle: 'تجربة حجز شفافة وفورية تضمن لك راحة البال قبل مغادرتك لبلدك وحتى وصولك إلى وجهتك المباركة.',
    processSteps: [
      {
        num: '01',
        title: 'احجز أونلاين خلال 60 ثانية',
        desc: 'حدد مسارك وتاريخك والسيارة المناسبة عبر الموقع بكل سهولة، دون الحاجة لدفع أي عربون أو إدخال بطاقة ائتمانية.',
      },
      {
        num: '02',
        title: 'تأكيد فوري وتنسيق عبر واتساب',
        desc: 'يتواصل معكم فريق العمليات لتأكيد تفاصيل الحجز، وتعيين السائق المعتمد وإرسال بيانات المركبة وتتبع رحلة الطيران.',
      },
      {
        num: '03',
        title: 'استقبال بالاسم وسداد نقدي عند الوصول',
        desc: 'يستقبلكم السائق في صالة المطار أو الفندق حاملاً لوحة باسمكم، ويتم سداد الأجرة نقداً 100% بعد الوصول بسلام.',
      },
    ],
    reviewsBadge: 'تقييمات ضيوف الرحمن',
    reviewsTitle: 'ثقة متبادلة وتجارب ضيوفنا الكرام',
    reviewsSubtitle: 'أكثر من 15,000 رحلة موفقة لضيوف الرحمن من مختلف دول العالم بتقييم 4.9 من 5 نجوم.',
    faqBadge: 'الأسئلة الشائعة',
    faqTitle: 'كل ما تحتاج لمعرفته حول الحجز والأسعار',
    faqSubtitle: 'إجابات واضحة وموثوقة على أكثر الاستفسارات شيوعاً لدى المعتمرين والزوار.',
    faqs: [
      {
        q: 'هل السعر محدد للمركبة كاملة أم لكل راكب؟',
        a: 'كافة الأسعار المعتمدة هي للمركبة بالكامل بسعتها الكاملة من الركاب والحقائب، وليست للشخص الواحد.',
      },
      {
        q: 'متى وكيف يتم سداد قيمة الرحلة؟',
        a: 'لا نطلب أي عربون أو بطاقة ائتمانية أونلاين. يتم الدفع نقداً 100% مباشرة للسائق بعد الوصول بسلام إلى فندقك ووجهتك.',
      },
      {
        q: 'ماذا لو تأخرت رحلة الطيران القادمة إلى مطار جدة أو المدينة؟',
        a: 'يتتبع فريقنا رحلتك عبر الرادار الملاحي الفوري، ويصل السائق بناءً على موعد الهبوط الفعلي مع 60 دقيقة انتظار مجاني بعد الهبوط.',
      },
      {
        q: 'هل يتوقف السائق بميقات الإحرام أثناء السفر من المدينة إلى مكة؟',
        a: 'نعم، يشمل مسار المدينة إلى مكة التوقف المجاني المريح عند ميقات ذي الحليفة (مسجد الشجرة / آبار علي) للإحرام وصلاة ركعتي الإحرام.',
      },
    ],
    closingBadge: 'احجز رحلتك الملكية اليوم',
    closingTitle: 'جاهزون لاستقبالكم وخدمتكم بأعلى معايير الضيافة السعودية',
    closingSubtitle: 'احجز سيارتك الخاصة وسائقك المحترف الآن بكل يسر، وادفع نقداً عند الوصول بكل طمأنينة.',
    closingBookBtn: 'ابدأ الحجز الآن أونلاين',
    closingWhatsappBtn: 'تواصل مع الكونسيرج عبر واتساب',
  },

  en: {
    heroBadge: '★ PRIVATE AVIATION LUXURY ON GROUND',
    heroHeadline: 'Your Sacred Journey Deserves Uncompromising Comfort & Dignity',
    heroSubheadline:
      'Authoritative executive chauffeur and private transfers connecting King Abdulaziz Airport (Jeddah), Prince Mohammad Airport (Madinah), and holy Makkah hotels. Guaranteed fixed fares with 100% cash paid upon arrival.',
    tabTransfer: 'Airport & Intercity Transfers',
    tabZiyarat: 'Sacred Ziyarat Tours',
    tabHourly: 'Hourly Private Chauffeur',
    routeLabel: 'Authoritative Highway Route',
    dateLabel: 'Pickup Date',
    timeLabel: 'Pickup Time',
    passengersLabel: 'Passengers',
    luggageLabel: 'Luggage',
    durationLabel: 'Service Duration',
    ctaViewVehicles: 'View Available Vehicles & Prices',
    reassurancePill: '0 Advance Deposit • 100% Cash to Chauffeur on Arrival • Live Flight Radar Tracking • Guaranteed Fixed Fares',
    trust1: '100% Cash Paid on Arrival',
    trust2: 'Guaranteed Fixed Fares per Vehicle',
    trust3: '60-Min Free Airport Wait Time',
    trust4: 'Automated Live Flight Radar Tracking',
    trust5: 'Chilled Zamzam Water & Luggage Help',
    advantagesBadge: 'The Royal Distinction',
    advantagesTitle: 'Why Discerning Pilgrims Choose Duyuf Alrahman VIP',
    advantagesSubtitle: 'Five foundational pillars designed to grant you peace of mind, punctuality, and serenity throughout your sacred voyage.',
    advantages: [
      {
        title: '24/7 Dedicated Chauffeur Dispatch',
        desc: 'Our bilingual operations desk coordinates every leg of your journey via WhatsApp and direct dispatch around the clock.',
        icon: 'clock',
      },
      {
        title: 'Automated Live Flight Radar Tracking',
        desc: 'We monitor your flight arrival via live aviation radar; even if delayed, your chauffeur arrives exactly on time with 60 min complimentary wait time.',
        icon: 'plane',
      },
      {
        title: 'Complimentary Child Safety Seats',
        desc: 'Sanitized, certified child safety seats are provided free upon request, ensuring family comfort and complete peace of mind.',
        icon: 'baby',
      },
      {
        title: 'Flexible Zero-Penalty Cancellation',
        desc: 'No advance deposit required. Modify or cancel your booking free of charge up to 4 hours prior to scheduled departure.',
        icon: 'calendar',
      },
      {
        title: 'All-Inclusive Guaranteed Fixed Rates',
        desc: 'Every agreed price is final and covers all expressway tolls, fuel, airport parking, and VAT. Pay cash to your chauffeur on arrival.',
        icon: 'shield',
      },
    ],
    fleetBadge: 'The Authoritative Fleet',
    fleetTitle: 'Executive Fleet Engineered for Utmost Serenity',
    fleetSubtitle: 'Select the ideal model for your family size and luggage requirements. All vehicles are late-model, sanitized, and meticulously climate-controlled.',
    fleetDisclaimer: 'Exact verified fares for each vehicle are displayed instantly upon route selection with zero hidden fees.',
    exploreDetails: 'Explore Vehicle Specifications',
    bookThisVehicle: 'Select & Book This Vehicle',
    journeysBadge: 'Approved Travel Corridors',
    journeysTitle: 'Top Intercity Corridors Across the Holy Cities',
    journeysSubtitle: 'Authoritative fixed rates covering pilgrims and executive delegations between key Saudi arrival points.',
    fromStarting: 'From:',
    bookThisRoute: 'Book This Journey Now',
    conciergeBadge: 'Royal VIP Bespoke Concierge',
    conciergeTitle: 'Exclusive Executive Fleet for Dignitaries',
    conciergeSubtitle: 'For heads of state, VIP delegations, and discerning guests, we offer bespoke chauffeur arrangements via our dedicated VIP WhatsApp concierge.',
    conciergeMaybachTitle: 'Mercedes-Maybach S-Class VIP',
    conciergeMaybachDesc: 'The pinnacle of presidential luxury with first-class reclining suites, acoustic silence, and bespoke diplomatic protocol.',
    conciergeH1Title: 'Hyundai H1 Royal VIP',
    conciergeH1Desc: 'Discreet executive van with spacious seating and privacy curtains, tailored for diplomatic staff and elite families.',
    conciergeCta: 'Request Bespoke Concierge Rate via WhatsApp',
    processBadge: 'Effortless Reservation',
    processTitle: 'Book Your Chauffeur in Three Transparent Steps',
    processSubtitle: 'An intuitive, transparent booking experience that guarantees complete reassurance before departing your home country.',
    processSteps: [
      {
        num: '01',
        title: 'Reserve Online in 60 Seconds',
        desc: 'Select your route, date, and preferred vehicle with ease. Zero advance deposit and no credit card required.',
      },
      {
        num: '02',
        title: 'Instant WhatsApp & Flight Coordination',
        desc: 'Our dispatch team confirms your booking instantly, assigns your licensed chauffeur, and monitors your flight radar.',
      },
      {
        num: '03',
        title: 'Terminal Meet & Greet with Cash on Arrival',
        desc: 'Your chauffeur greets you at the terminal or hotel lobby with a personalized name sign. Pay 100% cash upon safe arrival.',
      },
    ],
    reviewsBadge: 'Pilgrim Testimonials',
    reviewsTitle: 'Trusted by Over 15,000 Discerning Pilgrims',
    reviewsSubtitle: 'Maintaining an exceptional 4.9 out of 5-star rating across international travelers from the UK, GCC, Europe, and Southeast Asia.',
    faqBadge: 'Frequently Asked Questions',
    faqTitle: 'Clear Answers Regarding Fares & Booking',
    faqSubtitle: 'Everything you need to know about our transparent, cash-on-arrival luxury transportation policies.',
    faqs: [
      {
        q: 'Is the price per passenger or for the entire vehicle?',
        a: 'All our quoted rates are for the complete vehicle with its certified passenger and luggage capacity, never per person.',
      },
      {
        q: 'When and how do I pay for my transfer?',
        a: 'No prepayment or online card details are required. You pay 100% in cash directly to your chauffeur after arriving safely at your hotel (in SAR or USD).',
      },
      {
        q: 'What if my incoming flight to Jeddah or Madinah is delayed?',
        a: 'We monitor your flight in real time using live radar. Your chauffeur adjusts pickup time automatically and waits up to 60 minutes free of charge.',
      },
      {
        q: 'Does the chauffeur stop at the Miqat when traveling Madinah to Makkah?',
        a: 'Yes, our Madinah to Makkah route includes a complimentary stopover at Miqat Dhu al-Hulayfah (Masjid ash-Shajarah / Bir Ali) for Ihram and prayer.',
      },
    ],
    closingBadge: 'Reserve Your Journey Today',
    closingTitle: 'Ready to Experience True Saudi Royal Hospitality?',
    closingSubtitle: 'Secure your private executive vehicle and licensed route chauffeur today with complete confidence and cash payment upon arrival.',
    closingBookBtn: 'Reserve Your Chauffeur Online',
    closingWhatsappBtn: 'Connect with Concierge on WhatsApp',
  },

  ms: {
    heroBadge: '★ PERKHIDMATAN PEMANDU DIRAJA VIP',
    heroHeadline: 'Perjalanan Ibadah Anda Layak Menerima Keselesaan & Ketenangan Tertinggi',
    heroSubheadline:
      'Perkhidmatan pemandu peribadi eksekutif menghubungkan Lapangan Terbang Jeddah (KAIA), Madinah (MED) dan hotel-hotel Makkah. Tambang tetap dijamin dengan bayaran tunai 100% setibanya di destinasi.',
    tabTransfer: 'Pemindahan Lapangan Terbang & Antara Bandar',
    tabZiyarat: 'Pakej Ziarah Bersejarah',
    tabHourly: 'Pemandu Peribadi Mengikut Jam',
    routeLabel: 'Laluan Lebuhraya Rasmi',
    dateLabel: 'Tarikh Pengambilan',
    timeLabel: 'Masa Pengambilan',
    passengersLabel: 'Penumpang',
    luggageLabel: 'Bagasi',
    durationLabel: 'Tempoh Perkhidmatan',
    ctaViewVehicles: 'Lihat Kenderaan & Harga Tersedia',
    reassurancePill: '0 Deposit • Bayar Tunai Setibanya di Hotel • Penjejakan Penerbangan Langsung • Kadar Tetap Dijamin',
    trust1: '100% Bayaran Tunai Semasa Tiba',
    trust2: 'Kadar Tetap Setiap Kenderaan Penuh',
    trust3: '60 Minit Menunggu Percuma di Terminal',
    trust4: 'Penjejakan Radar Penerbangan Langsung',
    trust5: 'Air Zamzam Sejuk & Bantuan Bagasi',
    advantagesBadge: 'Kelebihan Diraja',
    advantagesTitle: 'Mengapa Jemaah Umrah Memilih Duyuf Alrahman VIP',
    advantagesSubtitle: 'Lima keutamaan teguh yang menjamin ketenangan ibadah dan keselesaan penuh sepanjang perjalanan suci anda.',
    advantages: [
      {
        title: 'Penyelarasan Operasi 24/7',
        desc: 'Pasukan koordinasi kami sentiasa bersedia di WhatsApp dan telefon sepanjang masa untuk perjalanan lancar.',
        icon: 'clock',
      },
      {
        title: 'Penjejakan Radar Penerbangan Langsung',
        desc: 'Kami memantau masa ketibaan pesawat anda secara langsung dengan 60 minit masa menunggu percuma di terminal.',
        icon: 'plane',
      },
      {
        title: 'Kerusi Keselamatan Kanak-kanak Percuma',
        desc: 'Kerusi keselamatan kanak-kanak bersih disediakan percuma atas permintaan demi keselamatan keluarga.',
        icon: 'baby',
      },
      {
        title: 'Pembatalan Fleksibel Tanpa Penalti',
        desc: 'Tiada deposit pendahuluan. Batalkan atau ubah jadual anda secara percuma sehingga 4 jam sebelum perjalanan.',
        icon: 'calendar',
      },
      {
        title: 'Kadar Tetap Termasuk Tol & Cukai',
        desc: 'Tambang telus merangkumi tol lebuh raya, petrol dan cukai dengan bayaran tunai kepada pemandu setibanya di hotel.',
        icon: 'shield',
      },
    ],
    fleetBadge: 'Armada Rasmi Diraja',
    fleetTitle: 'Armada Eksekutif untuk Ketenangan Ibadah Anda',
    fleetSubtitle: 'Pilih kenderaan yang tepat mengikut jumlah jemaah dan bagasi. Semua kenderaan moden dan berhawa dingin sepenuhnya.',
    fleetDisclaimer: 'Kadar sebenar yang disahkan akan dipaparkan sebaik sahaja laluan dipilih tanpa caj tersembunyi.',
    exploreDetails: 'Lihat Spesifikasi Kenderaan',
    bookThisVehicle: 'Pilih & Tempah Kenderaan Ini',
    journeysBadge: 'Laluan Utama Diluluskan',
    journeysTitle: 'Laluan Antara Bandar Paling Popular di Tanah Suci',
    journeysSubtitle: 'Kadar tetap rasmi bagi jemaah dan rombongan umrah antara lapangan terbang dan hotel Haramain.',
    fromStarting: 'Dari:',
    bookThisRoute: 'Tempah Laluan Ini Sekarang',
    conciergeBadge: 'Konsierj VIP Diraja',
    conciergeTitle: 'Armada Eksklusif untuk VVIP & Rombongan Khas',
    conciergeSubtitle: 'Untuk tetamu kehormat dan keluarga diraja, kami menyediakan kenderaan eksklusif dengan sebut harga pantas melalui WhatsApp.',
    conciergeMaybachTitle: 'Mercedes-Maybach S-Class VIP',
    conciergeMaybachDesc: 'Kemewahan tahap tertinggi dengan kerusi sandar kelas pertama dan penebat bunyi untuk ketenangan ibadah.',
    conciergeH1Title: 'Hyundai H1 Royal VIP',
    conciergeH1Desc: 'Van eksekutif luas dengan privasi penuh untuk rombongan keluarga ternama.',
    conciergeCta: 'Minta Sebut Harga VIP via WhatsApp',
    processBadge: 'Tempahan Mudah',
    processTitle: 'Tempah Kenderaan Anda Dalam Tiga Langkah Mudah',
    processSubtitle: 'Pengalaman tempahan telus yang memberi keyakinan sebelum berlepas dari tanah air.',
    processSteps: [
      {
        num: '01',
        title: 'Tempah Dalam Talian Dalam 60 Saat',
        desc: 'Pilih laluan, tarikh dan kenderaan pilihan tanpa sebarang deposit atau kad kredit.',
      },
      {
        num: '02',
        title: 'Pengesahan Segera Melalui WhatsApp',
        desc: 'Pasukan kami mengesahkan tempahan serta-merta, menugaskan pemandu berlesen dan memantau penerbangan anda.',
      },
      {
        num: '03',
        title: 'Sambutan di Terminal & Bayar Tunai',
        desc: 'Pemandu menyambut anda dengan papan nama peribadi. Bayar tunai 100% selepas tiba di hotel dengan selamat.',
      },
    ],
    reviewsBadge: 'Testimoni Jemaah',
    reviewsTitle: 'Dipercayai oleh Lebih 15,000 Jemaah Umrah',
    reviewsSubtitle: 'Mengekalkan penarafan 4.9 daripada 5 bintang daripada jemaah antarabangsa Malaysia, Indonesia dan Brunei.',
    faqBadge: 'Soalan Lazim',
    faqTitle: 'Jawapan Jelas Mengenai Tambang & Tempahan',
    faqSubtitle: 'Segala maklumat mengenai polisi pengangkutan telus kami.',
    faqs: [
      {
        q: 'Adakah harga dikira setiap penumpang atau setiap kenderaan?',
        a: 'Semua kadar kami adalah bagi setiap kenderaan penuh mengikut muatan rasmi, bukan untuk setiap individu.',
      },
      {
        q: 'Bila dan bagaimanakah saya perlu membayar tambang?',
        a: 'Tiada bayaran pendahuluan diperlukan. Anda membayar tunai 100% terus kepada pemandu setibanya di hotel anda (SAR atau USD).',
      },
      {
        q: 'Bagaimanakah jika penerbangan saya ke Jeddah atau Madinah tertangguh?',
        a: 'Kami memantau pesawat anda secara langsung melalui radar. Pemandu akan tiba mengikut masa pendaratan sebenar dengan 60 minit masa menunggu percuma.',
      },
      {
        q: 'Adakah pemandu akan berhenti di Miqat semasa perjalanan Madinah ke Makkah?',
        a: 'Ya, laluan Madinah ke Makkah termasuk persinggahan percuma di Miqat Bir Ali (Dzulhulaifah) untuk niat Ihram dan solat sunat.',
      },
    ],
    closingBadge: 'Tempah Perjalanan Anda Hari Ini',
    closingTitle: 'Bersedia Menikmati Layanan Diraja Arab Saudi?',
    closingSubtitle: 'Tempah kenderaan VIP anda hari ini dengan penuh keyakinan dan pembayaran tunai semasa tiba.',
    closingBookBtn: 'Tempah Pemandu VIP Sekarang',
    closingWhatsappBtn: 'Hubungi Konsierj di WhatsApp',
  },

  id: {
    heroBadge: '★ LAYANAN TRANSPORTASI VIP KERAJAAN',
    heroHeadline: 'Perjalanan Ibadah Anda Layak Mendapatkan Kenyamanan Paripurna',
    heroSubheadline:
      'Layanan sopir privat dan transportasi eksekutif resmi menghubungkan Bandara King Abdulaziz (Jeddah), Bandara Madinah, dan hotel-hotel Makkah. Tarif tetap terjamin dengan bayar tunai 100% saat tiba di tujuan.',
    tabTransfer: 'Antar Jemput Bandara & Antarkota',
    tabZiyarat: 'Ziarah Tempat Bersejarah',
    tabHourly: 'Sopir Sewa Per Jam',
    routeLabel: 'Rute Jalan Tol Resmi',
    dateLabel: 'Tanggal Penjemputan',
    timeLabel: 'Waktu Penjemputan',
    passengersLabel: 'Penumpang',
    luggageLabel: 'Koper',
    durationLabel: 'Durasi Layanan',
    ctaViewVehicles: 'Lihat Kendaraan & Tarif Tersedia',
    reassurancePill: '0 Uang Muka • Bayar Tunai ke Sopir Saat Tiba • Pelacakan Radar Pesawat • Tarif Pasti Terjamin',
    trust1: 'Bayar Tunai 100% Saat Tiba',
    trust2: 'Tarif Pasti per Satu Mobil Penuh',
    trust3: 'Gratis 60 Menit Tunggu di Bandara',
    trust4: 'Pelacakan Radar Pesawat Langsung',
    trust5: 'Air Zamzam Dingin & Bantuan Koper',
    advantagesBadge: 'Keunggulan Layanan Kerajaan',
    advantagesTitle: 'Mengapa Jamaah Umrah Memilih Duyuf Alrahman VIP',
    advantagesSubtitle: 'Lima pilar utama yang menjamin ketenangan, ketepatan waktu, dan kenyamanan ibadah Anda di Tanah Suci.',
    advantages: [
      {
        title: 'Layanan Pelanggan Siaga 24/7',
        desc: 'Tim koordinasi dwibahasa kami siap mendampingi perjalanan Anda via WhatsApp dan telepon setiap saat.',
        icon: 'clock',
      },
      {
        title: 'Pelacakan Radar Pesawat Langsung',
        desc: 'Kami memantau penerbangan Anda langsung via radar dengan gratis waktu tunggu 60 menit setelah mendarat.',
        icon: 'plane',
      },
      {
        title: 'Kursi Pengaman Bayi Gratis',
        desc: 'Kursi anak yang bersih dan berstandar keselamatan tersedia gratis sesuai permintaan keluarga.',
        icon: 'baby',
      },
      {
        title: 'Pembatalan Fleksibel Tanpa Penalti',
        desc: 'Tanpa uang muka. Ubah atau batalkan pesanan Anda gratis hingga 4 jam sebelum jadwal keberangkatan.',
        icon: 'calendar',
      },
      {
        title: 'Tarif Pasti All-In Termasuk Tol & Pajak',
        desc: 'Tarif final mencakup tol jalan layang, bensin, dan pajak dengan bayar tunai langsung ke sopir saat tiba di hotel.',
        icon: 'shield',
      },
    ],
    fleetBadge: 'Armada Resmi Kerajaan',
    fleetTitle: 'Armada Eksekutif Berstandar Kenyamanan Tertinggi',
    fleetSubtitle: 'Pilih kendaraan yang tepat sesuai kapasitas keluarga dan koper Anda. Semua unit bersih, terawat, dan berpendingin udara optimal.',
    fleetDisclaimer: 'Tarif resmi terverifikasi ditampilkan saat rute dipilih tanpa biaya tambahan tersembunyi.',
    exploreDetails: 'Lihat Spesifikasi Kendaraan',
    bookThisVehicle: 'Pilih & Pesan Kendaraan Ini',
    journeysBadge: 'Rute Populer Disetujui',
    journeysTitle: 'Rute Antarkota Terpopuler di Dua Kota Suci',
    journeysSubtitle: 'Tarif pasti untuk jamaah dan rombongan umrah antara bandara dan hotel-hotel di Makkah dan Madinah.',
    fromStarting: 'Mulai dari:',
    bookThisRoute: 'Pesan Rute Ini Sekarang',
    conciergeBadge: 'Konsierge VIP Kerajaan',
    conciergeTitle: 'Armada Eksklusif untuk VVIP & Delegasi Khusus',
    conciergeSubtitle: 'Bagi tamu kehormatan dan delegasi resmi, kami menyediakan armada istimewa via konsierge WhatsApp.',
    conciergeMaybachTitle: 'Mercedes-Maybach S-Class VIP',
    conciergeMaybachDesc: 'Puncak kemewahan kepresidenan dengan kursi rebah kelas satu dan kabin super senyap.',
    conciergeH1Title: 'Hyundai H1 Royal VIP',
    conciergeH1Desc: 'Van eksekutif lapang dengan tirai privasi untuk rombongan delegasi dan keluarga terhormat.',
    conciergeCta: 'Minta Penawaran VIP via WhatsApp',
    processBadge: 'Pemesanan Mudah',
    processTitle: 'Pesan Layanan Sopir Anda dalam Tiga Langkah',
    processSubtitle: 'Pengalaman pemesanan transparan yang memberikan ketenangan sebelum berangkat dari tanah air.',
    processSteps: [
      {
        num: '01',
        title: 'Pesan Online dalam 60 Detik',
        desc: 'Tentukan rute, tanggal, dan kendaraan pilihan tanpa uang muka atau kartu kredit.',
      },
      {
        num: '02',
        title: 'Konfirmasi Instan via WhatsApp',
        desc: 'Tim kami mengonfirmasi pesanan, menugaskan sopir berlisensi, dan memantau kedatangan pesawat Anda.',
      },
      {
        num: '03',
        title: 'Penyambutan Bandara & Bayar Tunai',
        desc: 'Sopir menyambut Anda dengan papan nama. Pembayaran tunai 100% dilakukan setelah tiba di hotel dengan selamat.',
      },
    ],
    reviewsBadge: 'Ulasan Jamaah',
    reviewsTitle: 'Dipercaya Lebih dari 15.000 Jamaah Umrah',
    reviewsSubtitle: 'Meraih rating 4.9 dari 5 bintang dari jamaah Indonesia, Malaysia, dan internasional.',
    faqBadge: 'Tanya Jawab',
    faqTitle: 'Jawaban Jelas Terkait Tarif & Pemesanan',
    faqSubtitle: 'Segala hal yang perlu Anda ketahui tentang layanan transportasi terpercaya kami.',
    faqs: [
      {
        q: 'Apakah harga dihitung per orang atau per mobil?',
        a: 'Semua tarif kami berlaku untuk satu mobil penuh sesuai kapasitas penumpang dan koper, bukan per orang.',
      },
      {
        q: 'Kapan dan bagaimana cara saya membayar?',
        a: 'Tidak perlu uang muka. Pembayaran dilakukan 100% tunai langsung kepada sopir setelah Anda tiba di hotel (SAR atau USD).',
      },
      {
        q: 'Bagaimana jika penerbangan saya ke Jeddah atau Madinah mengalami penundaan?',
        a: 'Kami memantau penerbangan Anda secara langsung via radar. Sopir akan menyesuaikan waktu penjemputan dengan gratis waktu tunggu 60 menit.',
      },
      {
        q: 'Apakah sopir bersedia berhenti di Miqat saat perjalanan Madinah ke Makkah?',
        a: 'Ya, perjalanan Madinah ke Makkah sudah termasuk perhentian gratis di Miqat Dzul Hulaifah (Masjid Bir Ali) untuk niat Ihram dan shalat.',
      },
    ],
    closingBadge: 'Pesan Perjalanan Anda Sekarang',
    closingTitle: 'Siap Menikmati Keramahan Layanan Kerajaan Arab Saudi?',
    closingSubtitle: 'Amankan kendaraan VIP dan sopir profesional Anda hari ini dengan bayar tunai saat tiba.',
    closingBookBtn: 'Pesan Mobil VIP Sekarang',
    closingWhatsappBtn: 'Hubungi Konsierge via WhatsApp',
  },

  ur: {
    heroBadge: '★ شاہی پرائیویٹ ٹرانسپورٹیشن سروس',
    heroHeadline: 'آپ کا مقدس سفر بے مثال آرام، وقار اور سکون کا حقدار ہے',
    heroSubheadline:
      'شاہ عبدالعزیز ایئرپورٹ جدہ، مدینہ منورہ اور مکہ مکرمہ کے ہوٹلوں کے درمیان مصدقہ پرائیویٹ شافر سروس۔ طے شدہ کرایہ اور منزل پر 100% نقد ادائیگی۔',
    tabTransfer: 'ایئرپورٹ اور بین الشہری ٹرانسفر',
    tabZiyarat: 'مقدس زیارات ٹورز',
    tabHourly: 'فی گھنٹہ پرائیویٹ ڈرائیور',
    routeLabel: 'منظور شدہ ہائی وے روٹ',
    dateLabel: 'روانگی کی تاریخ',
    timeLabel: 'روانگی کا وقت',
    passengersLabel: 'مسافر',
    luggageLabel: 'سامان (بیگز)',
    durationLabel: 'مطلوبہ دورانیہ',
    ctaViewVehicles: 'دستیاب گاڑیاں اور منظور شدہ کرایہ دیکھیں',
    reassurancePill: '0 ایڈوانس • ہوٹل پہنچ کر ڈرائیور کو نقد ادائیگی • لائیو فلائٹ ٹریکنگ • حتمی فکسڈ کرایہ',
    trust1: 'منزل پر پہنچ کر 100% نقد ادائیگی',
    trust2: 'پوری گاڑی کا حتمی طے شدہ کرایہ',
    trust3: 'ایئرپورٹ پر 60 منٹ اعزازی انتظار',
    trust4: 'لائیو فلائٹ ریڈار مانیٹرنگ',
    trust5: 'ٹھنڈا آب زمزم اور سامان میں مکمل مدد',
    advantagesBadge: 'شاہی امتیازات',
    advantagesTitle: 'معزز حجاج و زائرین کا قابل اعتماد انتخاب',
    advantagesSubtitle: 'پانچ بنیادی اصول جو آپ کے مقدس سفر میں ذہنی سکون اور وقت کی پابندی کو یقینی بناتے ہیں۔',
    advantages: [
      {
        title: '24/7 گھنٹے آپریشنز اور شافر رہنمائی',
        desc: 'ہماری ٹیم سفر کے دوران کسی بھی وقت واٹس ایپ اور فون پر آپ کی مکمل رہنمائی کے لیے دستیاب ہے۔',
        icon: 'clock',
      },
      {
        title: 'لائیو فلائٹ ریڈار ٹریکنگ',
        desc: 'ہم لائیو ریڈار سے پرواز کی نگرانی کرتے ہیں؛ پرواز میں تاخیر کی صورت میں بھی ڈرائیور 60 منٹ مفت انتظار کے ساتھ موجود رہتا ہے۔',
        icon: 'plane',
      },
      {
        title: 'بچوں کے لیے حفاظتی سیٹیں مفت',
        desc: 'معصوم بچوں کی حفاظت کے لیے معیاری اور سینیٹائزڈ چائلڈ سیٹیں درخواست پر بلا معاوضہ فراہم کی جاتی ہیں۔',
        icon: 'baby',
      },
      {
        title: 'بغیر کسی جرمانے کے لچکدار منسوخی',
        desc: 'کوئی پیشگی رقم درکار نہیں۔ آپ روانگی سے 4 گھنٹے قبل تک اپنی بکنگ مفت منسوخ یا تبدیل کر سکتے ہیں۔',
        icon: 'calendar',
      },
      {
        title: 'ٹول ٹیکس اور تمام اخراجات سمیت کرایہ',
        desc: 'طے شدہ کرایہ حتمی ہے جس میں ہائی وے ٹولز، پیٹرول اور ٹیکس شامل ہیں؛ ادائیگی ڈرائیور کو ہوٹل پہنچ کر کی جاتی ہے۔',
        icon: 'shield',
      },
    ],
    fleetBadge: 'مصدقہ شاہی فلیٹ',
    fleetTitle: 'سکون و آرام سے آراستہ ایگزیکٹو گاڑیاں',
    fleetSubtitle: 'اپنے خاندان اور سامان کے مطابق مناسب ترین گاڑی منتخب کریں۔ تمام گاڑیاں نئی اور بہترین ایئرکنڈیشنڈ ہیں۔',
    fleetDisclaimer: 'گاڑی کا حتمی کرایہ روٹ منتخب کرتے ہی شفاف طور پر ظاہر ہو جاتا ہے، کوئی پوشیدہ فیس نہیں۔',
    exploreDetails: 'گاڑی کی تفصیلات دیکھیں',
    bookThisVehicle: 'یہ گاڑی منتخب اور بک کریں',
    journeysBadge: 'منظور شدہ مقبول ترین راستے',
    journeysTitle: 'حرمین شریفین کے درمیان مرکزی روٹس',
    journeysSubtitle: 'حجاج کرام اور وفود کے لیے ایئرپورٹس اور ہوٹلوں کے درمیان سرکاری منظور شدہ کرائے۔',
    fromStarting: 'کم از کم:',
    bookThisRoute: 'یہ روٹ ابھی بک کریں',
    conciergeBadge: 'شاہی وی آئی پی کونسیرج',
    conciergeTitle: 'معزز مہمانوں کے لیے خصوصی لگژری گاڑیاں',
    conciergeSubtitle: 'حکومتی وفود اور معزز خاندانوں کے لیے خصوصی مرسڈیز میباخ اور لگژری وینز بذریعہ واٹس ایپ دستیاب ہیں۔',
    conciergeMaybachTitle: 'مرسڈیز میباخ S-Class VIP',
    conciergeMaybachDesc: 'صدارتی فخامت، فرسٹ کلاس ریکلائننگ سیٹس اور مکمل ساؤنڈ پروفنگ کا شاندار شاہکار۔',
    conciergeH1Title: 'ہنڈائی H1 رائل VIP',
    conciergeH1Desc: 'خاندانوں اور وفود کے لیے مکمل پرائیویسی کے ساتھ وسیع و کشادہ ایگزیکٹو وین۔',
    conciergeCta: 'واٹس ایپ پر خصوصی کوٹیشن حاصل کریں',
    processBadge: 'آسان بکنگ کا طریقہ کار',
    processTitle: 'صرف 3 آسان مراحل میں اپنا شافر بک کریں',
    processSubtitle: 'شفاف طریقہ کار جو اپنے ملک سے روانگی سے قبل آپ کو مکمل اطمینان فراہم کرتا ہے۔',
    processSteps: [
      {
        num: '01',
        title: '60 سیکنڈ میں آن لائن بکنگ',
        desc: 'بغیر کسی ایڈوانس یا کریڈٹ کارڈ کے اپنا روٹ، تاریخ اور پسندیدہ گاڑی آسانی سے منتخب کریں۔',
      },
      {
        num: '02',
        title: 'واٹس ایپ پر فوری تصدیق',
        desc: 'ہماری ٹیم فوری طور پر بکنگ کی تصدیق کرتی ہے اور تصدیق شدہ ڈرائیور کی تفصیلات فراہم کرتی ہے۔',
      },
      {
        num: '03',
        title: 'نام کے بورڈ سے استقبال اور نقد ادائیگی',
        desc: 'ڈرائیور ایئرپورٹ یا ہوٹل پر آپ کے نام کے بورڈ کے ساتھ استقبال کرتا ہے، اور منزل پر 100% نقد ادائیگی کی جاتی ہے۔',
      },
    ],
    reviewsBadge: 'زائرین کے تاثرات',
    reviewsTitle: '15,000 سے زائد معزز زائرین کا اعتماد',
    reviewsSubtitle: 'برطانیہ، خلیج اور پاکستان کے زائرین کی جانب سے 5 میں سے 4.9 ستاروں کی شاندار ریٹنگ۔',
    faqBadge: 'عام سوالات',
    faqTitle: 'کرایوں اور بکنگ کے حوالے سے سوالات و جوابات',
    faqSubtitle: 'ہماری شفاف اور محفوظ سروس سے متعلق اہم ترین معلومات۔',
    faqs: [
      {
        q: 'کیا کرایہ فی سواری ہے یا پوری گاڑی کا؟',
        a: 'تمام کرائے پوری گاڑی کے ہیں جس میں مسافروں اور سامان کی مکمل گنجائش شامل ہے، فی کس نہیں۔',
      },
      {
        q: 'کرایہ کی ادائیگی کب اور کیسے کی جاتی ہے؟',
        a: 'کوئی ایڈوانس ادائیگی درکار نہیں۔ آپ ہوٹل پہنچ کر ڈرائیور کو 100% نقد رقم (ریال یا ڈالر) ادا کرتے ہیں۔',
      },
      {
        q: 'اگر فلائٹ میں تاخیر ہو جائے تو کیا ہوگا؟',
        a: 'ہم لائیو ریڈار سے فلائٹ فالو کرتے ہیں۔ ڈرائیور اصل وقت پر پہنچتا ہے اور 60 منٹ مفت انتظار کرتا ہے۔',
      },
      {
        q: 'کیا مدینہ سے مکہ جاتے وقت میقات پر گاڑی رکتی ہے؟',
        a: 'جی ہاں، مدینہ سے مکہ کے سفر میں میقات ذوالحلیفہ (بئر علی) پر احرام اور نفل نماز کے لیے مفت قیام شامل ہے۔',
      },
    ],
    closingBadge: 'آج ہی اپنا سفر بک کریں',
    closingTitle: 'سعودی شاہی مہمان نوازی کے ساتھ آپ کے استقبال کے لیے تیار ہیں',
    closingSubtitle: 'اپنی نجی گاڑی اور شافر ابھی اعتماد کے ساتھ بک کریں اور منزل پر نقد ادائیگی کریں۔',
    closingBookBtn: 'آن لائن بکنگ شروع کریں',
    closingWhatsappBtn: 'واٹس ایپ پر رابطہ کریں',
  },

  fr: {
    heroBadge: '★ LUXE DE L’AVIATION PRIVÉE SUR ROUTE',
    heroHeadline: 'Votre Pèlerinage Mérite un Confort d’Exception et de Sérénité',
    heroSubheadline:
      'Service de chauffeur privé exécutif reliant l’Aéroport de Djeddah (KAIA), l’Aéroport de Médine (MED) et les hôtels de La Mecque. Tarifs fixes garantis avec paiement 100% en espèces à l’arrivée.',
    tabTransfer: 'Transferts Aéroport & Interurbains',
    tabZiyarat: 'Visites Sacrées de Ziyarat',
    tabHourly: 'Chauffeur Privé à l’Heure',
    routeLabel: 'Itinéraire Autoroutier Officiel',
    dateLabel: 'Date de Prise en Charge',
    timeLabel: 'Heure de Prise en Charge',
    passengersLabel: 'Passagers',
    luggageLabel: 'Bagages',
    durationLabel: 'Durée du Service',
    ctaViewVehicles: 'Voir les Véhicules et Tarifs Disponibles',
    reassurancePill: '0 Acompte • Paiement en Espèces à l’Arrivée • Suivi Radar des Vols • Tarifs Fixes Garantis',
    trust1: 'Paiement 100% en Espèces à l’Arrivée',
    trust2: 'Tarif Fixe pour l’Ensemble du Véhicule',
    trust3: '60 Min d’Attente Gratuite à l’Aéroport',
    trust4: 'Suivi des Vols par Radar en Direct',
    trust5: 'Eau de Zamzam Fraîche et Aide Bagages',
    advantagesBadge: 'La Distinction Royale',
    advantagesTitle: 'Pourquoi les Pèlerins Choisissent Duyuf Alrahman VIP',
    advantagesSubtitle: 'Cinq piliers d’excellence conçus pour vous assurer sérénité, ponctualité et confort tout au long de votre séjour.',
    advantages: [
      {
        title: 'Assistance et Dispatch 24h/24 et 7j/7',
        desc: 'Notre équipe bilingue coordonne chaque étape de votre transport via WhatsApp et assistance directe en continu.',
        icon: 'clock',
      },
      {
        title: 'Suivi Radar des Vols en Temps Réel',
        desc: 'Nous suivons votre vol en direct; même en cas de retard, votre chauffeur vous attend avec 60 min gratuites.',
        icon: 'plane',
      },
      {
        title: 'Sièges Auto Enfant Gratuits',
        desc: 'Des sièges enfants certifiés et désinfectés sont installés gratuitement sur demande pour la sécurité de votre famille.',
        icon: 'baby',
      },
      {
        title: 'Annulation Gratuite Sans Pénalité',
        desc: 'Aucun acompte requis. Modifiez ou annulez sans frais jusqu’à 4 heures avant le départ prévu.',
        icon: 'calendar',
      },
      {
        title: 'Tarifs Tout Compris Péages & Taxes',
        desc: 'Le prix convenu est final et comprend péages, carburant, parking aéroport et TVA, payable en espèces à l’arrivée.',
        icon: 'shield',
      },
    ],
    fleetBadge: 'La Flotte Royale Agréée',
    fleetTitle: 'Une Flotte Exécutive Conçue pour une Sérénité Totale',
    fleetSubtitle: 'Sélectionnez le véhicule adapté à votre famille et vos bagages. Tous nos véhicules sont récents et climatisés.',
    fleetDisclaimer: 'Les tarifs certifiés s’affichent instantanément dès la sélection de l’itinéraire sans frais cachés.',
    exploreDetails: 'Voir les Spécifications du Véhicule',
    bookThisVehicle: 'Réserver ce Véhicule',
    journeysBadge: 'Liaisons Populaires Agréées',
    journeysTitle: 'Principaux Trajets Interurbains en Arabie Saoudite',
    journeysSubtitle: 'Tarifs officiels reliant les aéroports aux hôtels sacrés de La Mecque et Médine.',
    fromStarting: 'Dès:',
    bookThisRoute: 'Réserver cet Itinéraire',
    conciergeBadge: 'Conciergerie Royale VIP',
    conciergeTitle: 'Flotte Diplomatique & Véhicules d’Exception',
    conciergeSubtitle: 'Pour les délégations officielles et VIP, nous organisons un service sur mesure via notre conciergerie WhatsApp.',
    conciergeMaybachTitle: 'Mercedes-Maybach Classe S VIP',
    conciergeMaybachDesc: 'Le sommet du luxe présidentiel avec suites inclinables de première classe et isolation acoustique complète.',
    conciergeH1Title: 'Hyundai H1 Royal VIP',
    conciergeH1Desc: 'Monospace exécutif spacieux avec rideaux de confidentialité pour délégations et familles d’élite.',
    conciergeCta: 'Demander un Devis VIP sur WhatsApp',
    processBadge: 'Réservation Simple',
    processTitle: 'Réservez Votre Chauffeur en Trois Étapes Claires',
    processSubtitle: 'Une expérience limpide qui garantit votre tranquillité d’esprit avant de quitter votre pays.',
    processSteps: [
      {
        num: '01',
        title: 'Réservez en Ligne en 60 Secondes',
        desc: 'Choisissez votre trajet, date et véhicule sans carte bancaire ni paiement d’avance.',
      },
      {
        num: '02',
        title: 'Confirmation Immédiate sur WhatsApp',
        desc: 'Notre équipe confirme instantanément, attribue un chauffeur agréé et suit l’arrivée de votre vol.',
      },
      {
        num: '03',
        title: 'Accueil Personnalisé & Paiement à l’Arrivée',
        desc: 'Votre chauffeur vous accueille avec une pancarte à votre nom. Règlement en espèces 100% à destination.',
      },
    ],
    reviewsBadge: 'Avis des Pèlerins',
    reviewsTitle: 'La Confiance de Plus de 15 000 Pèlerins',
    reviewsSubtitle: 'Une note d’excellence de 4.9 sur 5 étoiles auprès des voyageurs de France, d’Europe et du monde musulman.',
    faqBadge: 'Foire Aux Questions',
    faqTitle: 'Réponses Claires sur Nos Tarifs & Réservations',
    faqSubtitle: 'Tout ce que vous devez savoir sur notre service transparent avec paiement à l’arrivée.',
    faqs: [
      {
        q: 'Le tarif est-il par personne ou par véhicule ?',
        a: 'Tous nos tarifs indiqués s’appliquent pour l’ensemble du véhicule avec sa capacité complète, jamais par personne.',
      },
      {
        q: 'Quand et comment se fait le règlement ?',
        a: 'Aucun prépaiement requis. Vous réglez 100% en espèces directement au chauffeur après votre arrivée sécurisée à l’hôtel (SAR ou USD).',
      },
      {
        q: 'Que se passe-t-il en cas de retard de mon vol à Djeddah ou Médine ?',
        a: 'Nous suivons le vol en direct par radar. Votre chauffeur arrive à l’heure réelle avec 60 minutes d’attente gratuite.',
      },
      {
        q: 'Le chauffeur s’arrête-t-il au Miqat entre Médine et La Mecque ?',
        a: 'Oui, le trajet Médine - La Mecque inclut un arrêt gratuit au Miqat Dhou al-Hulayfah (Bir Ali) pour l’Ihram et la prière.',
      },
    ],
    closingBadge: 'Réservez Votre Voyage Aujourd’hui',
    closingTitle: 'Prêts à Découvrir l’Hospitalité Royale Saoudienne ?',
    closingSubtitle: 'Réservez votre berline ou van avec chauffeur en toute confiance et payez à votre arrivée à l’hôtel.',
    closingBookBtn: 'Réserver Votre Chauffeur en Ligne',
    closingWhatsappBtn: 'Contacter la Conciergerie sur WhatsApp',
  },

  es: {
    heroBadge: '★ LUJO DE AVIACIÓN PRIVADA EN TIERRA',
    heroHeadline: 'Su Peregrinación Merece la Máxima Comodidad y Serenidad',
    heroSubheadline:
      'Servicio de chófer privado ejecutivo entre el Aeropuerto de Yeda (KAIA), el Aeropuerto de Medina (MED) y los hoteles de La Meca. Tarifas fijas garantizadas con pago 100% en efectivo a la llegada.',
    tabTransfer: 'Traslados Aeropuerto y Ciudades',
    tabZiyarat: 'Tours Sagrados Ziyarat',
    tabHourly: 'Chófer Privado por Horas',
    routeLabel: 'Ruta Autorizada de Autopista',
    dateLabel: 'Fecha de Recogida',
    timeLabel: 'Hora de Recogida',
    passengersLabel: 'Pasajeros',
    luggageLabel: 'Maletas',
    durationLabel: 'Duración del Servicio',
    ctaViewVehicles: 'Ver Vehículos y Precios Disponibles',
    reassurancePill: '0 Anticipo • Pago en Efectivo al Llegar • Monitoreo de Vuelos • Tarifas Fijas Garantizadas',
    trust1: 'Pago 100% en Efectivo a la Llegada',
    trust2: 'Tarifa Fija por Vehículo Completo',
    trust3: '60 Min de Espera Gratis en Aeropuerto',
    trust4: 'Rastreo Radar de Vuelos en Vivo',
    trust5: 'Agua Zamzam Fría y Ayuda con Equipaje',
    advantagesBadge: 'Distinción Real VIP',
    advantagesTitle: 'Por Qué los Peregrinos Eligen Duyuf Alrahman VIP',
    advantagesSubtitle: 'Cinco pilares diseñados para brindarle tranquilidad, puntualidad y máximo confort en su sagrado viaje.',
    advantages: [
      {
        title: 'Despacho y Asistencia 24/7',
        desc: 'Nuestro equipo bilingüe coordina cada trayecto por WhatsApp y asistencia directa las 24 horas del día.',
        icon: 'clock',
      },
      {
        title: 'Rastreo Radar de Vuelos en Tiempo Real',
        desc: 'Monitoreamos la llegada de su vuelo; incluso con retrasos, su chófer le espera con 60 minutos de cortesía.',
        icon: 'plane',
      },
      {
        title: 'Sillas de Seguridad Infantil Gratuitas',
        desc: 'Disponemos de sillas sanitizadas homologadas para bebés y niños sin coste adicional a petición.',
        icon: 'baby',
      },
      {
        title: 'Cancelación Flexible Sin Penalización',
        desc: 'Sin depósitos previos. Modifique o cancele gratis hasta 4 horas antes de la salida programada.',
        icon: 'calendar',
      },
      {
        title: 'Tarifas Todo Incluido Peajes e Impuestos',
        desc: 'El precio acordado es final con peajes de autopista, gasolina y tasas incluidos, pagadero en efectivo al llegar.',
        icon: 'shield',
      },
    ],
    fleetBadge: 'Flota Real Aprobada',
    fleetTitle: 'Flota Ejecutiva Diseñada para su Serenidad',
    fleetSubtitle: 'Elija el vehículo óptimo para su familia y equipaje. Todos los vehículos son modernos y climatizados.',
    fleetDisclaimer: 'Las tarifas exactas verificadas se muestran al seleccionar la ruta sin costes ocultos.',
    exploreDetails: 'Ver Especificaciones del Vehículo',
    bookThisVehicle: 'Seleccionar y Reservar Este Vehículo',
    journeysBadge: 'Rutas Frecuentes Autorizadas',
    journeysTitle: 'Principales Corredores entre Ciudades Santas',
    journeysSubtitle: 'Tarifas fijas aprobadas para traslados entre aeropuertos y hoteles de La Meca y Medina.',
    fromStarting: 'Desde:',
    bookThisRoute: 'Reservar Esta Ruta Ahora',
    conciergeBadge: 'Conserjería Real VIP',
    conciergeTitle: 'Flota Exclusiva para Altas Personalidades',
    conciergeSubtitle: 'Para delegaciones oficiales y VVIPs, ofrecemos vehículos exclusivos con atención directa en WhatsApp.',
    conciergeMaybachTitle: 'Mercedes-Maybach Clase S VIP',
    conciergeMaybachDesc: 'La cumbre del lujo presidencial con asientos reclinables de primera clase e insonorización total.',
    conciergeH1Title: 'Hyundai H1 Royal VIP',
    conciergeH1Desc: 'Furgoneta ejecutiva espaciosa con cortinas de privacidad para diplomáticos y familias de élite.',
    conciergeCta: 'Solicitar Tarifa VIP por WhatsApp',
    processBadge: 'Reserva Transparente',
    processTitle: 'Reserve su Chófer en Tres Sencillos Pasos',
    processSubtitle: 'Un proceso intuitivo que garantiza tranquilidad absoluta antes de salir de su país de origen.',
    processSteps: [
      {
        num: '01',
        title: 'Reserve Online en 60 Segundos',
        desc: 'Seleccione ruta, fecha y vehículo sin tarjeta de crédito ni pago por adelantado.',
      },
      {
        num: '02',
        title: 'Confirmación Inmediata por WhatsApp',
        desc: 'Nuestro equipo confirma la reserva, asigna chófer profesional y monitorea su vuelo.',
      },
      {
        num: '03',
        title: 'Recepción en Terminal y Pago al Llegar',
        desc: 'Su chófer le recibe con cartel con su nombre. Pago 100% en efectivo al llegar con seguridad al hotel.',
      },
    ],
    reviewsBadge: 'Opiniones de Peregrinos',
    reviewsTitle: 'La Confianza de Más de 15.000 Peregrinos',
    reviewsSubtitle: 'Puntuación sobresaliente de 4.9 sobre 5 estrellas entre viajeros internacionales.',
    faqBadge: 'Preguntas Frecuentes',
    faqTitle: 'Respuestas Claras sobre Tarifas y Reservas',
    faqSubtitle: 'Todo lo que necesita saber sobre nuestro servicio transparente con pago a la llegada.',
    faqs: [
      {
        q: '¿El precio es por persona o por vehículo?',
        a: 'Todas las tarifas son por el vehículo completo con su capacidad homologada de pasajeros y maletas, nunca por persona.',
      },
      {
        q: '¿Cuándo y cómo se realiza el pago?',
        a: 'No se requiere prepago ni tarjeta online. Paga 100% en efectivo directamente al chófer tras llegar a su hotel (en SAR o USD).',
      },
      {
        q: '¿Qué ocurre si se retrasa mi vuelo a Yeda o Medina?',
        a: 'Monitoreamos el vuelo en tiempo real por radar. El chófer ajusta la llegada con 60 minutos de espera gratuita.',
      },
      {
        q: '¿El chófer para en el Miqat entre Medina y La Meca?',
        a: 'Sí, la ruta Medina a La Meca incluye parada gratuita en el Miqat Dhu al-Hulayfah (Bir Ali) para el Ihram y la oración.',
      },
    ],
    closingBadge: 'Reserve su Viaje Hoy',
    closingTitle: '¿Listo para Vivir la Verdadera Hospitalidad Real Saudí?',
    closingSubtitle: 'Asegure su vehículo privado con chófer profesional hoy mismo y pague en efectivo a la llegada.',
    closingBookBtn: 'Reservar Chófer Online Ahora',
    closingWhatsappBtn: 'Contactar Conserjería por WhatsApp',
  },

  de: {
    heroBadge: '★ PRIVATAVIATION-LUXUS AUF DER STRASSE',
    heroHeadline: 'Ihre Pilgerreise Verdient Höchste Ruhe, Würde & Komfort',
    heroSubheadline:
      'Autorisierter VIP-Chauffeurservice zwischen Flughafen Dschidda (KAIA), Flughafen Medina (MED) und Hotels in Mekka. Garantierte Festpreise mit 100% Barzahlung bei Ankunft.',
    tabTransfer: 'Flughafen- & Überlandtransfers',
    tabZiyarat: 'Heilige Ziyarat-Besichtigungen',
    tabHourly: 'Chauffeur auf Stundenbasis',
    routeLabel: 'Offizielle Autobahnstrecke',
    dateLabel: 'Abholdatum',
    timeLabel: 'Abholzeit',
    passengersLabel: 'Passagiere',
    luggageLabel: 'Gepäck',
    durationLabel: 'Dauer',
    ctaViewVehicles: 'Verfügbare Fahrzeuge & Preise Anzeigen',
    reassurancePill: '0 Anzahlung • Barzahlung beim Fahrer am Zielort • Live-Flugradar • Garantierte Festpreise',
    trust1: '100% Barzahlung bei Ankunft am Hotel',
    trust2: 'Garantierter Festpreis pro Gesamtfahrzeug',
    trust3: '60 Min. kostenlose Wartezeit am Gate',
    trust4: 'Echtzeit-Flugradarüberwachung',
    trust5: 'Gratis Zamzam-Wasser & Gepäckhilfe',
    advantagesBadge: 'Königlicher Standard',
    advantagesTitle: 'Warum Anspruchsvolle Pilger Uns Wählen',
    advantagesSubtitle: 'Fünf Grundpfeiler für Pünktlichkeit, Sicherheit und vollkommene Ruhe auf Ihrer heiligen Reise.',
    advantages: [
      {
        title: '24/7 Chauffeur-Einsatzleitung',
        desc: 'Unser zweisprachiges Einsatzteam koordiniert jede Fahrt rund um die Uhr direkt via WhatsApp und Telefon.',
        icon: 'clock',
      },
      {
        title: 'Live-Flugradarüberwachung',
        desc: 'Wir überwachen Ihren Flug live via Flugradar; auch bei Verspätung erwartet Sie Ihr Chauffeur mit 60 Min. kostenloser Wartezeit.',
        icon: 'plane',
      },
      {
        title: 'Kostenlose Kindersicherheitssitze',
        desc: 'Geprüfte und desinfizierte Kindersitze werden auf Anfrage für die Sicherheit Ihrer Familie kostenlos bereitgestellt.',
        icon: 'baby',
      },
      {
        title: 'Flexible Stornierung Ohne Gebühr',
        desc: 'Keine Vorauszahlung erforderlich. Kostenlos ändern oder stornieren bis zu 4 Stunden vor Abfahrt.',
        icon: 'calendar',
      },
      {
        title: 'All-Inclusive-Festpreis Inkl. Maut & Steuern',
        desc: 'Der vereinbarte Festpreis umfasst Autobahngebühren, Kraftstoff und Steuern. Barzahlung erst am Hotel.',
        icon: 'shield',
      },
    ],
    fleetBadge: 'Die Offizielle Flotte',
    fleetTitle: 'Exklusive Fahrzeuge für Maximale Entspannung',
    fleetSubtitle: 'Wählen Sie das passende Fahrzeug für Ihre Familie und Gepäckmenge. Alle Modelle sind neuwertig und klimatisiert.',
    fleetDisclaimer: 'Verifizierte Festpreise werden sofort nach Streckenauswahl transparent ohne versteckte Kosten angezeigt.',
    exploreDetails: 'Fahrzeugdetails Anzeigen',
    bookThisVehicle: 'Dieses Fahrzeug Buchen',
    journeysBadge: 'Genehmigte Fahrtstrecken',
    journeysTitle: 'Beliebteste Fernstrecken Zwischen den Heiligen Städten',
    journeysSubtitle: 'Offizielle Festpreise für Pilger und Delegationen zwischen Flughäfen und Hotels in Mekka und Medina.',
    fromStarting: 'Ab:',
    bookThisRoute: 'Diese Route Jetzt Buchen',
    conciergeBadge: 'Königlicher VIP-Concierge',
    conciergeTitle: 'Exklusive Luxusfahrzeuge für Staatsgäste',
    conciergeSubtitle: 'Für offizielle Delegationen und VVIPs bieten wir maßgeschneiderte Chauffeurdienste via WhatsApp-Concierge.',
    conciergeMaybachTitle: 'Mercedes-Maybach S-Klasse VIP',
    conciergeMaybachDesc: 'Der Inbegriff präsidentiellen Luxus mit Erste-Klasse-Ruhesitzen und absoluter Geräuschdämmung.',
    conciergeH1Title: 'Hyundai H1 Royal VIP',
    conciergeH1Desc: 'Großraum-Limousine mit Privatsphäre-Vorhängen für diplomatische Begleitung und anspruchsvolle Familien.',
    conciergeCta: 'VIP-Angebot via WhatsApp Anfragen',
    processBadge: 'Einfache Buchung',
    processTitle: 'In Drei Transparenten Schritten zum Privaten Chauffeur',
    processSubtitle: 'Ein sicherer Buchungsablauf, der Ihnen bereits vor Abflug aus der Heimat absolute Gewissheit gibt.',
    processSteps: [
      {
        num: '01',
        title: 'In 60 Sekunden Online Buchen',
        desc: 'Wählen Sie Route, Datum und Fahrzeug ohne Vorauszahlung oder Kreditkarte.',
      },
      {
        num: '02',
        title: 'Sofortige WhatsApp-Bestätigung',
        desc: 'Unser Team bestätigt umgehend, weist einen lizenzierten Chauffeur zu und überwacht Ihren Flug.',
      },
      {
        num: '03',
        title: 'Empfang am Gate & Barzahlung am Ziel',
        desc: 'Ihr Chauffeur erwartet Sie mit Namensschild. 100% Barzahlung erfolgt erst nach sicherer Ankunft im Hotel.',
      },
    ],
    reviewsBadge: 'Pilgerbewertungen',
    reviewsTitle: 'Das Vertrauen von Über 15.000 Pilgern',
    reviewsSubtitle: 'Ausgezeichnet mit 4.9 von 5 Sternen durch internationale Gäste aus Deutschland, Europa und den Golfstaaten.',
    faqBadge: 'Häufig Gestellte Fragen',
    faqTitle: 'Transparente Antworten zu Preisen & Ablauf',
    faqSubtitle: 'Alles Wissenswerte über unseren verlässlichen Barzahlung-bei-Ankunft Service.',
    faqs: [
      {
        q: 'Gilt der Preis pro Person oder für das gesamte Fahrzeug?',
        a: 'Alle angegebenen Preise gelten für das gesamte Fahrzeug inklusive der zulässigen Passagiere und Koffer, niemals pro Person.',
      },
      {
        q: 'Wann und wie wird bezahlt?',
        a: 'Keine Vorauskasse. Sie zahlen 100% in bar direkt beim Chauffeur nach sicherer Ankunft am Hotel (in SAR oder USD).',
      },
      {
        q: 'Was passiert bei Flugverspätungen nach Dschidda oder Medina?',
        a: 'Wir überwachen Flüge per Live-Radar. Ihr Fahrer passt die Ankunftszeit automatisch an und wartet bis zu 60 Min. kostenlos.',
      },
      {
        q: 'Hält der Chauffeur bei der Fahrt von Medina nach Mekka am Miqat?',
        a: 'Ja, die Fahrt von Medina nach Mekka beinhaltet einen kostenlosen Zwischenstopp an der Miqat-Station Bir Ali für Ihram und Gebet.',
      },
    ],
    closingBadge: 'Buchen Sie Ihre Reise Heute',
    closingTitle: 'Bereit für Echte Saudi-Königliche Gastfreundschaft?',
    closingSubtitle: 'Sichern Sie sich Ihr VIP-Fahrzeug mit erfahrenem Chauffeur noch heute mit Barzahlung erst bei Ankunft.',
    closingBookBtn: 'Chauffeur Jetzt Online Buchen',
    closingWhatsappBtn: 'Concierge via WhatsApp Kontaktieren',
  },

  tr: {
    heroBadge: '★ KARAYOLUNDA ÖZEL JET LÜKSÜ',
    heroHeadline: 'Kutsal Yolculuğunuz En Üst Düzey Konfor ve Huzuru Hak Ediyor',
    heroSubheadline:
      'Cidde Havalimanı (KAIA), Medine Havalimanı (MED) ve Mekke otelleri arasında yetkili VIP özel şoför hizmeti. Garantili sabit fiyatlar ve varışta %100 nakit ödeme kolaylığı.',
    tabTransfer: 'Havalimanı ve Şehirlerarası Transfer',
    tabZiyarat: 'Kutsal Ziyaret Turları',
    tabHourly: 'Saatlik Özel Şoför',
    routeLabel: 'Resmi Otoyol Güzergahı',
    dateLabel: 'Alınış Tarihi',
    timeLabel: 'Alınış Saati',
    passengersLabel: 'Yolcu',
    luggageLabel: 'Valiz',
    durationLabel: 'Hizmet Süresi',
    ctaViewVehicles: 'Müsait Araçları ve Fiyatları Görüntüle',
    reassurancePill: '0 Ön Ödeme • Otele Varışta Şoföre Nakit Ödeme • Canlı Uçuş Radarı • Garantili Sabit Fiyatlar',
    trust1: 'Otele Varışta %100 Nakit Ödeme',
    trust2: 'Aracın Tamamı İçin Sabit Fiyat',
    trust3: 'Havalimanında 60 Dk Ücretsiz Bekleme',
    trust4: 'Canlı Uçuş Radarı Takibi',
    trust5: 'Ücretsiz Soğuk Zemzem ve Bagaj Yardımı',
    advantagesBadge: 'Kraliyet Standartları',
    advantagesTitle: 'Umre Yolcuları Neden Duyuf Alrahman VIP’yi Seçiyor?',
    advantagesSubtitle: 'Kutsal yolculuğunuz boyunca huzur ve dakikliği garanti eden beş temel hizmet ilkesi.',
    advantages: [
      {
        title: '24/7 Kesintisiz Operasyon ve Koordinasyon',
        desc: 'İki dilli operasyon ekibimiz seyahatinizin her anında WhatsApp ve telefon üzerinden yanınızda.',
        icon: 'clock',
      },
      {
        title: 'Canlı Uçuş Radarı Takibi',
        desc: 'Uçuşunuzu anlık radarla takip ediyoruz; rötar durumunda dahi şoförünüz 60 dk ücretsiz bekleme ile hazır bulunur.',
        icon: 'plane',
      },
      {
        title: 'Ücretsiz Bebek ve Çocuk Güvenlik Koltuğu',
        desc: 'Hijyenik standartlara uygun çocuk koltukları ailenizin güvenliği için talep üzerine ücretsiz sağlanır.',
        icon: 'baby',
      },
      {
        title: 'Cezasız Esnek İptal İmkanı',
        desc: 'Ön ödeme yok. Planlanan hareket saatinden 4 saat öncesine kadar ücretsiz iptal veya değişiklik yapabilirsiniz.',
        icon: 'calendar',
      },
      {
        title: 'Köprü, Otoyol ve Vergiler Dahil Sabit Fiyat',
        desc: 'Belirlenen fiyat kesindir; otoyol geçiş ücretleri, yakıt ve vergiler dahildir. Ödeme otele varışta nakit yapılır.',
        icon: 'shield',
      },
    ],
    fleetBadge: 'Onaylı Kraliyet Filosu',
    fleetTitle: 'Üstün Konfor İçin Donatılmış VIP Filo',
    fleetSubtitle: 'Ailenizin ve bagajınızın kapasitesine en uygun modeli seçin. Tüm araçlarımız yeni model ve tam klimalıdır.',
    fleetDisclaimer: 'Araçların kesin onaylı fiyatları güzergah seçildiğinde şeffafça gösterilir, ek masraf yoktur.',
    exploreDetails: 'Araç Detaylarını İncele',
    bookThisVehicle: 'Bu Aracı Seç ve Ayırt',
    journeysBadge: 'Onaylı Seyahat Hatları',
    journeysTitle: 'Haremeyn Arasındaki En Popüler Güzergahlar',
    journeysSubtitle: 'Havalimanları ve Mekke-Medine otelleri arasında resmi sabit transfer tarifeleri.',
    fromStarting: 'Başlangıç:',
    bookThisRoute: 'Bu Güzergahı Şimdi Ayırtın',
    conciergeBadge: 'Kraliyet VIP Konsiyerj',
    conciergeTitle: 'Seçkin Heyetler İçin Özel Lüks Araçlar',
    conciergeSubtitle: 'Devlet heyetleri ve VVIP misafirler için WhatsApp konsiyerjimiz üzerinden özel tahsisli araçlar sunuyoruz.',
    conciergeMaybachTitle: 'Mercedes-Maybach S-Serisi VIP',
    conciergeMaybachDesc: 'Kusursuz başkanlık lüksü, birinci sınıf yatar koltuklar ve tam akustik sessizlik.',
    conciergeH1Title: 'Hyundai H1 Royal VIP',
    conciergeH1Desc: 'Heyetler ve seçkin aileler için tam mahremiyet perdeli ferah VIP minibüs.',
    conciergeCta: 'WhatsApp Üzerinden Özel Fiyat Alın',
    processBadge: 'Kolay Rezervasyon',
    processTitle: 'Üç Basit Adımda VIP Şoförünüzü Ayırtın',
    processSubtitle: 'Memleketinizden ayrılmadan önce tam bir güven veren şeffaf rezervasyon deneyimi.',
    processSteps: [
      {
        num: '01',
        title: '60 Saniyede Online Rezervasyon',
        desc: 'Kredi kartı veya ön ödeme gerekmeden güzergahınızı ve aracınızı kolayca seçin.',
      },
      {
        num: '02',
        title: 'Anında WhatsApp Onayı',
        desc: 'Ekibimiz rezervasyonu onaylar, lisanslı şoförü atar ve uçuşunuzu radardan takip eder.',
      },
      {
        num: '03',
        title: 'Terminalde Karşılama & Varışta Nakit Ödeme',
        desc: 'Şoförünüz sizi isim panosu ile karşılar. Ödeme otele ulaştıktan sonra %100 nakit yapılır.',
      },
    ],
    reviewsBadge: 'Misafir Yorumları',
    reviewsTitle: '15.000’den Fazla Hacı ve Umrecinin Güveni',
    reviewsSubtitle: 'Türkiye ve dünyanın dört bir yanından gelen misafirlerimizden 5 üzerinden 4.9 mükemmel puan.',
    faqBadge: 'Sıkça Sorulan Sorular',
    faqTitle: 'Fiyatlar ve Rezervasyon Hakkında Net Bilgiler',
    faqSubtitle: 'Varışta nakit ödemeli güvenilir hizmetimiz hakkında merak edilenler.',
    faqs: [
      {
        q: 'Fiyat kişi başı mı yoksa araç başı mıdır?',
        a: 'Tüm fiyatlarımız kişi başı değil, aracın tam kapasitesi için geçerli toplam araç fiyatıdır.',
      },
      {
        q: 'Ödeme ne zaman ve nasıl yapılır?',
        a: 'Ön ödeme veya kart bilgisi gerekmez. Ücretin tamamını otele güvenle vardıktan sonra şoföre nakit ödersiniz (SAR veya USD).',
      },
      {
        q: 'Uçağım Cidde veya Medine’ye rötar yaparsa ne olur?',
        a: 'Uçuşunuzu canlı radarla takip ediyoruz. Şoför iniş saatinize göre hazır bulunur ve 60 dakika ücretsiz bekler.',
      },
      {
        q: 'Medine’den Mekke’ye giderken Mikat noktasında duruluyor mu?',
        a: 'Evet, Medine - Mekke transferinde Zülhuleyfe Mikatı (Şecere Mescidi / Bir Ali) noktasında ihram ve namaz için ücretsiz mola dahildir.',
      },
    ],
    closingBadge: 'Seyahatinizi Bugün Ayırtın',
    closingTitle: 'Suudi Kraliyet Misafirperverliğini Yaşamaya Hazır mısınız?',
    closingSubtitle: 'VIP aracınızı ve deneyimli şoförünüzü hemen ayırtın, ücreti otele varışta nakit ödeyin.',
    closingBookBtn: 'Şimdi Online Rezervasyon Yapın',
    closingWhatsappBtn: 'WhatsApp’tan Konsiyerje Danışın',
  },

  hi: {
    heroBadge: '★ ज़मीन पर निजी विमानन स्तर की लग्जरी',
    heroHeadline: 'आपकी पवित्र उमरा यात्रा असाधारण सुकून और गरिमा की हकदार है',
    heroSubheadline:
      'किंग अब्दुलअज़ीज़ हवाई अड्डा (जेद्दा), मदीना हवाई अड्डा और पवित्र मक्का के होटलों के बीच अधिकृत वीआईपी निजी ड्राइवर सेवा। निश्चित दरें और आगमन पर 100% नकद भुगतान।',
    tabTransfer: 'हवाई अड्डा एवं अंतर-शहर ट्रांसफर',
    tabZiyarat: 'पवित्र ज़ियारत टूर',
    tabHourly: 'प्रति घंटा निजी ड्राइवर',
    routeLabel: 'अधिकृत हाईवे मार्ग',
    dateLabel: 'पिक-अप तारीख',
    timeLabel: 'पिक-अप समय',
    passengersLabel: 'यात्री',
    luggageLabel: 'सामान (सूटकेस)',
    durationLabel: 'सेवा अवधि',
    ctaViewVehicles: 'उपलब्ध वाहन और स्वीकृत दरें देखें',
    reassurancePill: '0 अग्रिम राशि • होटल आगमन पर 100% नकद भुगतान • लाइव फ्लाइट ट्रैकिंग • निश्चित किराया गारंटी',
    trust1: 'आगमन पर 100% नकद भुगतान',
    trust2: 'पूरे वाहन का निश्चित किराया',
    trust3: 'हवाई अड्डे पर 60 मिनट मुफ्त प्रतीक्षा',
    trust4: 'लाइव फ्लाइट रडार ट्रैकिंग',
    trust5: 'मुफ्त शीतल ज़मज़म व सामान में मदद',
    advantagesBadge: 'शाही उत्कृष्टता',
    advantagesTitle: 'विशिष्ट यात्री दुयूफ़ अल-रहमान वीआईपी क्यों चुनते हैं?',
    advantagesSubtitle: 'पाँच प्रमुख आधार जो आपकी पवित्र यात्रा में पूर्ण शांति और समय की पाबंदी सुनिश्चित करते हैं।',
    advantages: [
      {
        title: '24/7 समर्पित ड्राइवर एवं संचालन सहायता',
        desc: 'हमारी टीम व्हाट्सएप और फोन पर 24 घंटे आपके हर सफर में मार्गदर्शन के लिए तत्पर रहती है।',
        icon: 'clock',
      },
      {
        title: 'लाइव फ्लाइट रडार ट्रैकिंग',
        desc: 'हम उड़ान समय की लाइव निगरानी करते हैं; देरी होने पर भी चालक 60 मिनट की मुफ्त प्रतीक्षा के साथ उपस्थित रहता है।',
        icon: 'plane',
      },
      {
        title: 'मुफ्त बाल सुरक्षा सीटें',
        desc: 'अनुरोध पर बच्चों और शिशुओं के लिए प्रमाणित सुरक्षा सीटें निःशुल्क उपलब्ध कराई जाती हैं।',
        icon: 'baby',
      },
      {
        title: 'बिना जुर्माने के आसान रद्दीकरण',
        desc: 'कोई अग्रिम भुगतान नहीं। प्रस्थान से 4 घंटे पहले तक निःशुल्क रद्दीकरण या समय परिवर्तन करें।',
        icon: 'calendar',
      },
      {
        title: 'टोल टैक्स व ईंधन सहित निश्चित किराया',
        desc: 'स्वीकृत किराया अंतिम है जिसमें सभी टोल और टैक्स शामिल हैं। भुगतान आगमन पर नकद किया जाता है।',
        icon: 'shield',
      },
    ],
    fleetBadge: 'अधिकृत शाही बेड़ा',
    fleetTitle: 'परम आराम हेतु सुसज्जित कार्यकारी वाहन',
    fleetSubtitle: 'परिवार और सामान के अनुसार उपयुक्त वाहन चुनें। सभी वाहन आधुनिक, स्वच्छ और वातानुकूलित हैं।',
    fleetDisclaimer: 'मार्ग चुनते ही वाहन की सटीक दर पारदर्शी रूप से बिना किसी छिपे शुल्क के दिखाई जाती है।',
    exploreDetails: 'वाहन विवरण देखें',
    bookThisVehicle: 'यह वाहन बुक करें',
    journeysBadge: 'स्वीकृत यात्रा मार्ग',
    journeysTitle: 'पवित्र शहरों के बीच प्रमुख हाईवे मार्ग',
    journeysSubtitle: 'हवाई अड्डों और मक्का-मदीना के होटलों के बीच तीर्थयात्रियों हेतु आधिकारिक निश्चित दरें।',
    fromStarting: 'शुरुआती दर:',
    bookThisRoute: 'यह मार्ग अभी बुक करें',
    conciergeBadge: 'शाही वीआईपी कॉन्सीयर्ज',
    conciergeTitle: 'विशिष्ट अतिथियों हेतु विशेष लग्जरी गाड़ियाँ',
    conciergeSubtitle: 'सरकारी प्रतिनिधिमंडलों और गणमान्य व्यक्तियों के लिए व्हाट्सएप पर विशेष वाहन उपलब्ध हैं।',
    conciergeMaybachTitle: 'मर्सिडीज-मेबैक एस-क्लास वीआईपी',
    conciergeMaybachDesc: 'प्रथम श्रेणी की रिक्लाइनिंग सीटें और पूर्णतः ध्वनि-रहित शाही केबिन।',
    conciergeH1Title: 'हुंडई H1 रॉयल वीआईपी',
    conciergeH1Desc: 'प्रतिनिधिमंडलों और विशिष्ट परिवारों के लिए पर्दों सहित विशाल कार्यकारी वैन।',
    conciergeCta: 'व्हाट्सएप पर वीआईपी दर प्राप्त करें',
    processBadge: 'सरल बुकिंग प्रक्रिया',
    processTitle: 'तीन आसान चरणों में अपना ड्राइवर बुक करें',
    processSubtitle: 'एक पारदर्शी बुकिंग अनुभव जो यात्रा शुरू करने से पहले ही पूर्ण निश्चिंतता प्रदान करता है।',
    processSteps: [
      {
        num: '01',
        title: '60 सेकंड में ऑनलाइन बुकिंग',
        desc: 'बिना किसी अग्रिम राशि या क्रेडिट कार्ड के अपना मार्ग, तारीख और वाहन चुनें।',
      },
      {
        num: '02',
        title: 'व्हाट्सएप पर त्वरित पुष्टि',
        desc: 'हमारी टीम बुकिंग की पुष्टि करती है और अधिकृत चालक की जानकारी प्रदान करती है।',
      },
      {
        num: '03',
        title: 'नाम पट्टिका से स्वागत व नकद भुगतान',
        desc: 'चालक आगमन हॉल में आपका स्वागत करता है। होटल सुरक्षित पहुँचने पर 100% नकद भुगतान करें।',
      },
    ],
    reviewsBadge: 'तीर्थयात्रियों के अनुभव',
    reviewsTitle: '15,000 से अधिक तीर्थयात्रियों का अटूट विश्वास',
    reviewsSubtitle: 'भारत, खाड़ी और दुनिया भर के तीर्थयात्रियों द्वारा 5 में से 4.9 स्टार की उत्कृष्ट रेटिंग।',
    faqBadge: 'सामान्य प्रश्न',
    faqTitle: 'किराये व बुकिंग के संबंध में स्पष्ट जानकारी',
    faqSubtitle: 'हमारी पारदर्शी व सुरक्षित यात्रा नीति से जुड़े मुख्य उत्तर।',
    faqs: [
      {
        q: 'क्या किराया प्रति व्यक्ति है या पूरे वाहन का?',
        a: 'सभी दरें पूरे वाहन के लिए हैं जिसमें यात्रियों और सामान की क्षमता शामिल है, प्रति व्यक्ति नहीं।',
      },
      {
        q: 'भुगतान कब और कैसे करना होता है?',
        a: 'कोई अग्रिम राशि आवश्यक नहीं है। होटल सुरक्षित पहुँचने के बाद चालक को सीधे 100% नकद भुगतान करें।',
      },
      {
        q: 'यदि जेद्दा या मदीना की उड़ान में देरी हो जाए तो কি होगा?',
        a: 'हम लाइव रडार से उड़ान की निगरानी करते हैं। चालक वास्तविक समय पर पहुँचता है और 60 मिनट मुफ्त प्रतीक्षा करता है।',
      },
      {
        q: 'क्या मदीना से मक्का जाते समय चालक मीक़ात पर रुकता है?',
        a: 'हाँ, मदीना से मक्का की यात्रा में मीक़ात ज़ुल हुलैफ़ा (मस्जिद बीर अली) पर एहराम व नमाज़ के लिए निःशुल्क ठहराव शामिल है।',
      },
    ],
    closingBadge: 'आज ही अपनी यात्रा बुक करें',
    closingTitle: 'सऊदी शाही आतिथ्य सत्कार के साथ आपका स्वागत करने को तैयार हैं',
    closingSubtitle: 'अपने निजी वाहन व चालक को आज ही बुक करें और होटल पहुँचने पर नकद भुगतान करें।',
    closingBookBtn: 'ऑनलाइन बुकिंग अभी करें',
    closingWhatsappBtn: 'व्हाट्सएप पर कॉन्सीयर्ज से संपर्क करें',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// TOP 6 APPROVED HIGHWAY CORRIDORS (EXACT AUTHORITATIVE RATES)
// ─────────────────────────────────────────────────────────────────────────────
const TOP_APPROVED_JOURNEYS = [
  {
    id: 'jeddah-airport-to-makkah',
    originEn: 'Jeddah Airport (KAIA)',
    originAr: 'مطار الملك عبدالعزيز بجدة (KAIA)',
    destEn: 'Makkah Hotel',
    destAr: 'فندق مكة المكرمة',
    distanceKm: 95,
    durationEn: '60-75 mins',
    durationAr: '60-75 دقيقة',
    camrySAR: 200,
    stariaSAR: 250,
    hiaceSAR: 280,
    yukonSAR: 450,
    coasterSAR: 450,
    startingSAR: 200,
    img: '/assets/images/jeddah-airport-pickup-umrah.webp',
  },
  {
    id: 'makkah-to-madinah',
    originEn: 'Makkah Hotel',
    originAr: 'فندق مكة المكرمة',
    destEn: 'Madinah Hotel (Via Bir Ali)',
    destAr: 'فندق المدينة المنورة (عبر آبار علي)',
    distanceKm: 450,
    durationEn: '4-4.5 hours',
    durationAr: '4-4.5 ساعات',
    camrySAR: 400,
    stariaSAR: 500,
    hiaceSAR: 600,
    yukonSAR: 1000,
    coasterSAR: 0,
    startingSAR: 400,
    img: '/assets/images/private-transfer-makkah-to-madinah.webp',
  },
  {
    id: 'madinah-airport-to-hotel',
    originEn: 'Madinah Airport (MED)',
    originAr: 'مطار الأمير محمد بن عبدالعزيز (MED)',
    destEn: 'Madinah Central Hotel',
    destAr: 'فنادق المنطقة المركزية بالمدينة',
    distanceKm: 25,
    durationEn: '20-25 mins',
    durationAr: '20-25 دقيقة',
    camrySAR: 200,
    stariaSAR: 250,
    hiaceSAR: 300,
    yukonSAR: 500,
    coasterSAR: 600,
    startingSAR: 200,
    img: '/assets/images/camry_studio.webp',
  },
  {
    id: 'jeddah-to-madinah',
    originEn: 'Jeddah Airport (KAIA) / City',
    originAr: 'مطار جدة أو فنادق جدة',
    destEn: 'Madinah Hotel',
    destAr: 'فندق المدينة المنورة',
    distanceKm: 410,
    durationEn: '4 hours',
    durationAr: '4 ساعات',
    camrySAR: 400,
    stariaSAR: 500,
    hiaceSAR: 600,
    yukonSAR: 1000,
    coasterSAR: 1000,
    startingSAR: 400,
    img: '/assets/images/transport-planning-makkah-madinah-jeddah.webp',
  },
  {
    id: 'makkah-to-taif',
    originEn: 'Makkah Hotel',
    originAr: 'فندق مكة المكرمة',
    destEn: 'Taif / Al Hada Retreat',
    destAr: 'مدينة الطائف ومنتجع الهدا',
    distanceKm: 90,
    durationEn: '75 mins',
    durationAr: '75 دقيقة',
    camrySAR: 400,
    stariaSAR: 500,
    hiaceSAR: 600,
    yukonSAR: 750,
    coasterSAR: 900,
    startingSAR: 400,
    img: '/assets/images/makkah-to-taif-private-transfer.webp',
  },
  {
    id: 'makkah-ziyarat',
    originEn: 'Makkah Hotel Pickup',
    originAr: 'فندق مكة المكرمة',
    destEn: 'Makkah Sacred Sites (2.5h Approved)',
    destAr: 'مزارات مكة المكرمة (2.5 ساعة معتمدة)',
    distanceKm: 70,
    durationEn: '2.5 Hours Approved',
    durationAr: '2.5 ساعة معتمدة',
    camrySAR: 250,
    stariaSAR: 300,
    hiaceSAR: 330,
    yukonSAR: 450,
    coasterSAR: 500,
    startingSAR: 250,
    img: '/assets/images/vip-umrah-transport-jeddah-to-makkah.webp',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 5 REGULAR AUTOMOTIVE EDITORIAL MODELS
// ─────────────────────────────────────────────────────────────────────────────
const REGULAR_FLEET_MODELS = [
  {
    id: 'camry',
    slug: 'toyota-camry',
    bookingId: 'camry',
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
    highlights: {
      ar: ['تكييف فندقي فائق', 'سائق محترف خبير بالطرق', 'مياه زمزم مبردة مجاناً'],
      en: ['Dual-Zone Climate Control', 'Professional Route Chauffeur', 'Complimentary Chilled Zamzam'],
      ms: ['Penghawa Dingin Berkembar', 'Pemandu Rute Profesional', 'Air Zamzam Sejuk Percuma'],
      id: ['AC Ganda Super Dingin', 'Sopir Rute Profesional', 'Air Zamzam Dingin Gratis'],
      ur: ['ڈوئل زون طاقتور اے سی', 'ماہر بااعتماد ڈرائیور', 'ٹھنڈا آب زمزم مفت دستیاب'],
      fr: ['Climatisation bi-zone puissante', 'Chauffeur d\\'itinéraire expert', 'Eau de Zamzam fraîche offerte'],
      es: ['Climatizador bizona potente', 'Chófer profesional de ruta', 'Agua Zamzam fría de cortesía'],
      de: ['Zwei-Zonen-Klimaautomatik', 'Erfahrener Routen-Chauffeur', 'Gratis gekühltes Zamzam-Wasser'],
      tr: ['Çift Bölgeli Güçlü Klima', 'Deneyimli Güzergah Şoförü', 'Ücretsiz Soğuk Zemzem Suyu'],
      hi: ['डुअल-ज़ोन शक्तिशाली एसी', 'मार्गों के अनुभवी चालक', 'मुफ्त शीतल ज़मज़म जल'],
    },
  },
  {
    id: 'staria',
    slug: 'hyundai-staria',
    bookingId: 'staria',
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
    highlights: {
      ar: ['مقاعد كابتن فردية فاخرة', 'أبواب كهربائية ومساحة رحبة', 'تكييف مركزي شامل لكافة الصفوف'],
      en: ['Luxury Captain Reclining Chairs', 'Power Sliding Doors & Spacious Aisles', 'Tri-Zone Panoramic Climate Control'],
      ms: ['Kerusi Kapten Kulit Mewah', 'Pintu Gelangsar Berkuasa & Ruang Luas', 'Penghawa Dingin Tiga Zon'],
      id: ['Kursi Kapten Kulit Mewah', 'Pintu Geser Elektrik & Kabin Lapang', 'AC Tiga Zona Sangat Sejuk'],
      ur: ['لگژری کیپٹن سیٹس', 'آٹو پاور سلائیڈنگ ڈورز اور کشادہ کیبن', 'ہر نشست کے لیے الگ اے سی وینٹس'],
      fr: ['Sièges Capitaine inclinables en cuir', 'Portes coulissantes électriques spacieuses', 'Climatisation tri-zone panoramique'],
      es: ['Asientos Capitán reclinables de cuero', 'Puertas corredizas eléctricas amplias', 'Climatización trizona panorámica'],
      de: ['Exklusive Leder-Einzelsitze (Kapitänssitze)', 'Elektrische Schiebetüren & viel Beinfreiheit', 'Drei-Zonen-Klimaautomatik'],
      tr: ['Lüks Deri Kaptan Koltuklar', 'Otomatik Kayan Kapılar ve Ferah Kabin', 'Üç Bölgeli Panoramik Klima'],
      hi: ['आलीशान लेदर कैप्टन सीटें', 'ऑटो स्लाइडिंग दरवाजे व विशाल केबिन', 'प्रत्येक पंक्ति हेतु शक्तिशाली एसी'],
    },
  },
  {
    id: 'yukon',
    slug: 'gmc-yukon-xl',
    bookingId: 'yukon',
    name: {
      ar: 'جي إم سي يوكون XL الملكي',
      en: 'GMC Yukon XL VIP',
      ms: 'GMC Yukon XL VIP',
      id: 'GMC Yukon XL VIP',
      ur: 'جی ایم سی یوکون XL رائل',
      fr: 'GMC Yukon XL VIP',
      es: 'GMC Yukon XL VIP',
      de: 'GMC Yukon XL VIP',
      tr: 'GMC Yukon XL VIP',
      hi: 'जीएमसी युकोन एक्सएल वीआईपी',
    },
    category: {
      ar: 'دفع رباعي ملكي فاخر',
      en: 'Full-Size Presidential SUV',
      ms: 'SUV Presiden Saiz Penuh',
      id: 'SUV Kepresidenan Ukuran Penuh',
      ur: 'صدارتی فل سائز لگژری ایس یو وی',
      fr: 'SUV Présidentiel Pleine Grandeur',
      es: 'SUV Presidencial de Gran Tamaño',
      de: 'Repräsentativer Luxus-SUV (Langversion)',
      tr: 'Başkanlık Sınıfı Lüks SUV',
      hi: 'शाही पूर्ण आकार लक्जरी एसयूवी',
    },
    passengers: 7,
    luggage: 8,
    image: '/assets/images/vehicles/gmc-yukon-xl/exterior-studio.webp',
    highlights: {
      ar: ['عزل صوتي فندقي فائق', 'صندوق أمتعة ممتد يتسع لـ 8 حقائب', 'ثلاجة مقصورة مدمجة'],
      en: ['Acoustic Laminated Ultra-Quiet Cabin', 'Massive Extended Trunk (8 Suitcases)', 'Integrated Console Refrigerator'],
      ms: ['Kabin Penebat Bunyi Tahap Hotel', 'Ruang Bagasi Sangat Luas (8 Beg)', 'Peti Sejuk Konsol Bersepadu'],
      id: ['Kabin Kedap Suara Super Senyap', 'Bagasi Ekstra Luas (8 Koper Besar)', 'Kulkas Konsol Terintegrasi'],
      ur: ['مکمل ساؤنڈ پروف پُرسکون کیبن', 'سامان کے لیے وسیع ترین ڈگی (8 بیگز)', 'گاڑی کے اندر کولڈ ریفریجریٹر'],
      fr: ['Cabine ultra-silencieuse haut de gamme', 'Coffre géant pour 8 grandes valises', 'Réfrigérateur de console intégré'],
      es: ['Cabina acústica ultrasilenciosa de lujo', 'Maletero gigante para 8 maletas', 'Refrigerador de consola integrado'],
      de: ['Flüsterleise Akustik-Fahrgastzelle', 'Riesiger Kofferraum für 8 Koffer', 'Integriertes Kühlfach für Erfrischungen'],
      tr: ['Özel Akustik İzolasyonlu Sessiz Kabin', 'Genişletilmiş Dev Bagaj (8 Valiz)', 'Entegre Konsol İçi Soğutucu Dolap'],
      hi: ['शांत एवं ध्वनि-रहित प्रीमियम केबिन', 'विशाल बूट स्पेस (8 बड़े सूटकेस)', 'शीतल पेय हेतु इन-बिल्ट रेफ्रिजरेटर'],
    },
  },
  {
    id: 'hiace',
    slug: 'toyota-hiace',
    bookingId: 'hiace',
    name: {
      ar: 'تويوتا هايس VIP',
      en: 'Toyota HiAce VIP',
      ms: 'Toyota HiAce VIP',
      id: 'Toyota HiAce VIP',
      ur: 'ٹویوٹا ہائی ایس VIP',
      fr: 'Toyota HiAce VIP',
      es: 'Toyota HiAce VIP',
      de: 'Toyota HiAce VIP',
      tr: 'Toyota HiAce VIP',
      hi: 'टोयोटा हाईएस वीआईपी',
    },
    category: {
      ar: 'ميني باص عائلي للمجموعات',
      en: 'Executive Group Minibus',
      ms: 'Minibus Eksekutif Kumpulan',
      id: 'Minibus Eksekutif Rombongan',
      ur: 'ایگزیکٹو گروپ منی بس',
      fr: 'Minibus Exécutif pour Groupes',
      es: 'Minibús Ejecutivo para Grupos',
      de: 'Exklusiver Gruppen-Minibus',
      tr: 'Yönetici Grup Minibüsü',
      hi: 'कार्यकारी समूह मिनीबस',
    },
    passengers: 10,
    luggage: 10,
    image: '/assets/images/vehicles/toyota-hiace/exterior-studio.webp',
    highlights: {
      ar: ['سعة 10 ركاب مع 10 حقائب كبيرة', 'سقف مرتفع وممرات مريحة للتنقل', 'تكييف قوي مخصص للمجموعات'],
      en: ['Generous 10 Passenger + 10 Bag Capacity', 'High-Roof Clearance & Easy Walk-Through', 'Powerful Group Climate System'],
      ms: ['Muatan 10 Penumpang + 10 Beg', 'Bumbung Tinggi & Laluan Berjalan Selesa', 'Penghawa Dingin Kumpulan Berkuasa'],
      id: ['Kapasitas 10 Penumpang + 10 Koper', 'Atap Tinggi & Ruang Berdiri Nyaman', 'AC Kuat Merata ke Seluruh Kabin'],
      ur: ['10 مسافروں اور 10 بڑے بیگز کی مکمل گنجائش', 'ہائی روف ڈیزائن اور چلنے کی آسان جگہ', 'طاقتور سنٹرل ایئر کنڈیشننگ سسٹم'],
      fr: ['Capacité 10 passagers + 10 valises', 'Toit surélevé et couloir spacieux', 'Climatisation puissante multi-diffuseurs'],
      es: ['Capacidad 10 pasajeros + 10 maletas', 'Techo alto y pasillo de fácil acceso', 'Potente sistema de aire acondicionado'],
      de: ['Platz für 10 Passagiere + 10 Koffer', 'Hohes Dach für bequemes Einsteigen', 'Leistungsstarke Gruppen-Klimaanlage'],
      tr: ['10 Yolcu ve 10 Büyük Valiz Kapasitesi', 'Yüksek Tavan ve Kolay Geçiş Koridoru', 'Tüm Kabini Kapsayan Güçlü Klima'],
      hi: ['10 यात्रियों व 10 बड़े सूटकेस की क्षमता', 'ऊंची छत व आसान आवागमन गलियारा', 'पूरे केबिन हेतु शक्तिशाली एसी प्रवाह'],
    },
  },
  {
    id: 'coaster',
    slug: 'toyota-coaster',
    bookingId: 'coaster',
    name: {
      ar: 'تويوتا كوستر VIP',
      en: 'Toyota Coaster VIP Bus',
      ms: 'Bas VIP Toyota Coaster',
      id: 'Bus VIP Toyota Coaster',
      ur: 'ٹویوٹا کوسٹر VIP بس',
      fr: 'Autocar VIP Toyota Coaster',
      es: 'Autobús VIP Toyota Coaster',
      de: 'VIP-Reisebus Toyota Coaster',
      tr: 'Toyota Coaster VIP Otobüs',
      hi: 'टोयोटा कोस्टर वीआईपी बस',
    },
    category: {
      ar: 'حافلة VIP فاخرة للوفود',
      en: 'VIP Delegation Coach',
      ms: 'Bas Mewah Delegasi VIP',
      id: 'Bus Mewah Delegasi VIP',
      ur: 'وفود و حجاج کے لیے لگژری بس',
      fr: 'Autocar de Délégation VIP',
      es: 'Autocar para Delegaciones VIP',
      de: 'Luxus-Reisebus für Delegationen',
      tr: 'VIP Delegasyon ve Heyet Otobüsü',
      hi: 'वीआईपी प्रतिनिधिमंडल बस',
    },
    passengers: 21,
    luggage: 20,
    image: '/assets/images/vehicles/toyota-coaster/exterior-studio.webp',
    highlights: {
      ar: ['سعة 21 راكباً مع 20 حقيبة سفر', 'مقاعد مريحة مع ممر وسيع', 'نظام صوتي وتكييف هوائي شامل'],
      en: ['21 Seated Passengers + 20 Bag Storage', 'Ergonomic High-Back Reclining Seats', 'PA Audio System & Dual Air Blowers'],
      ms: ['21 Tempat Duduk + Ruang 20 Beg', 'Kerusi Ergonomik Bersandar Selesa', 'Sistem PA Audio & Penghawa Dingin Penuh'],
      id: ['21 Kursi Nyaman + Ruang 20 Koper', 'Kursi Reclining Ergonomis', 'Sistem Audio Mikrofon & Pendingin Maksimal'],
      ur: ['21 مسافروں اور 20 بیگز کی زبردست گنجائش', 'آرام دہ نشستیں اور کشادہ سینٹرل کوریڈور', 'اعلیٰ کوالٹی ساؤنڈ سسٹم اور زبردست کولنگ'],
      fr: ['21 sièges passagers + soute 20 valises', 'Sièges inclinables ergonomiques confortables', 'Système audio micro et ventilation double'],
      es: ['21 plazas + maletero para 20 maletas', 'Asientos reclinables ergonómicos', 'Megafonía y climatización integral'],
      de: ['21 bequeme Sitze + Stauraum für 20 Koffer', 'Ergonomische Sitze mit verstellbarer Lehne', 'Mikrofonanlage & doppelte Klimatisierung'],
      tr: ['21 Yolcu Koltuğu + 20 Büyük Bagaj Alanı', 'Ergonometrik Yatar Koltuklar ve Geniş Koridor', 'Anons Sistemi ve Çift Klimalı Havalandırma'],
      hi: ['21 आरामदायक सीटें व 20 बैग रखने की जगह', 'आरामदायक रिक्लिनिंग सीटें व सुगम गलियारा', 'माइक ऑडियो सिस्टम व समग्र वातानुकूलन'],
    },
  },
];

export function RoyalHomepageExperience({
  locale,
  dict,
  settings,
}: RoyalHomepageExperienceProps) {
  const router = useRouter();
  const isAr = locale === 'ar';
  const isRtl = isAr || locale === 'ur';
  const t = HP_I18N[locale] || HP_I18N.en;
  const { formatPrice } = useCurrency();

  // Booking Form State
  const [tripType, setTripType] = useState<'transfer' | 'ziyarat' | 'hourly'>('transfer');
  const [selectedRoute, setSelectedRoute] = useState('jeddah-airport-to-makkah');
  const [ziyaratTour, setZiyaratTour] = useState('makkah-ziyarat');
  const [hourlyHours, setHourlyHours] = useState('4');

  const tomorrowStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }, []);

  const [pickupDate, setPickupDate] = useState(tomorrowStr);
  const [pickupTime, setPickupTime] = useState('12:00');
  const [passengers, setPassengers] = useState('2');
  const [luggage, setLuggage] = useState('2');

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();

    if (tripType === 'transfer') {
      query.set('route', selectedRoute);
    } else if (tripType === 'ziyarat') {
      query.set('type', 'ziyarat');
      query.set('tour', ziyaratTour);
    } else {
      query.set('type', 'hourly');
      query.set('duration', hourlyHours);
    }

    query.set('date', pickupDate);
    query.set('time', pickupTime);
    query.set('passengers', passengers);
    query.set('luggage', luggage);

    router.push(\`/\${locale}/booking?\${query.toString()}\`);
  };

  return (
    <div className="w-full bg-[#F7F5F0] text-[#111A27] font-sans selection:bg-[#A58A64] selection:text-white" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* ─────────────────────────────────────────────────────────────
          SECTION B & C: CINEMATIC HERO + ROYAL BOOKING EXPERIENCE
      ────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[95vh] flex flex-col justify-center items-center bg-[#111A27] text-white pt-24 pb-16 sm:pt-28 sm:pb-20 overflow-hidden">
        {/* Cinematic Backdrop with Depth */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <Image
            src="/assets/images/haram_hero.webp"
            alt="Duyuf Alrahman VIP"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_30%] opacity-25 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111A27] via-[#111A27]/80 to-[#111A27]/40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#A58A64]/20 via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10 flex flex-col items-center text-center my-auto">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A2638] border border-[#A58A64]/60 text-[11px] sm:text-xs font-bold text-[#E8E2D7] uppercase tracking-[0.2em] mb-4 backdrop-blur-md shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#A58A64]" />
            <span>{t.heroBadge}</span>
          </div>

          {/* Majestic Serif Headline */}
          <h1 className="font-serif font-bold text-3xl sm:text-5xl lg:text-6xl text-[#F7F5F0] tracking-tight leading-[1.18] max-w-4xl drop-shadow-[0_4px_25px_rgba(0,0,0,0.8)] mb-4">
            {t.heroHeadline}
          </h1>

          {/* Subheadline */}
          <p className="text-sm sm:text-base lg:text-lg text-[#E8E2D7]/90 font-light leading-relaxed max-w-2xl mb-8 font-sans">
            {t.heroSubheadline}
          </p>

          {/* ─────────────────────────────────────────────────────────
              SECTION C: CONVERSION-FOCUSED BOOKING CONSOLE
          ────────────────────────────────────────────────────────── */}
          <div className="w-full max-w-4xl bg-white rounded-2xl sm:rounded-3xl border border-[#E8E2D7] p-4 sm:p-6 shadow-[0_25px_70px_rgba(0,0,0,0.4)] text-[#111A27] text-start transition-all">
            {/* Service Mode Tabs */}
            <div className="flex items-center gap-2 border-b border-[#E8E2D7] pb-3 mb-5 overflow-x-auto scrollbar-none font-sans">
              <button
                type="button"
                onClick={() => setTripType('transfer')}
                className={\`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap min-h-[44px] \${
                  tripType === 'transfer'
                    ? 'bg-[#111A27] text-[#F7F5F0] shadow-sm'
                    : 'bg-transparent text-[#687386] hover:text-[#111A27]'
                }\`}
              >
                <Plane className="w-4 h-4 text-[#A58A64]" />
                <span>{t.tabTransfer}</span>
              </button>
              <button
                type="button"
                onClick={() => setTripType('ziyarat')}
                className={\`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap min-h-[44px] \${
                  tripType === 'ziyarat'
                    ? 'bg-[#111A27] text-[#F7F5F0] shadow-sm'
                    : 'bg-transparent text-[#687386] hover:text-[#111A27]'
                }\`}
              >
                <Compass className="w-4 h-4 text-[#A58A64]" />
                <span>{t.tabZiyarat}</span>
              </button>
              <button
                type="button"
                onClick={() => setTripType('hourly')}
                className={\`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap min-h-[44px] \${
                  tripType === 'hourly'
                    ? 'bg-[#111A27] text-[#F7F5F0] shadow-sm'
                    : 'bg-transparent text-[#687386] hover:text-[#111A27]'
                }\`}
              >
                <Clock className="w-4 h-4 text-[#A58A64]" />
                <span>{t.tabHourly}</span>
              </button>
            </div>

            {/* Functional Reservation Form */}
            <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-3 sm:gap-4 items-end font-sans">
              {/* Field 1: Route Corridor / Duration */}
              <div className="sm:col-span-2 md:col-span-12 lg:col-span-5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#687386] mb-1.5">
                  {tripType === 'hourly' ? t.durationLabel : t.routeLabel}
                </label>
                {tripType === 'transfer' && (
                  <div className="relative">
                    <select
                      value={selectedRoute}
                      onChange={(e) => setSelectedRoute(e.target.value)}
                      className="w-full h-12 px-3.5 pr-8 rtl:pr-3.5 rtl:pl-8 rounded-xl bg-[#F7F5F0] border border-[#E8E2D7] text-xs font-semibold text-[#111A27] focus:outline-none focus:ring-2 focus:ring-[#A58A64] appearance-none cursor-pointer"
                    >
                      {TOP_APPROVED_JOURNEYS.map((r) => (
                        <option key={r.id} value={r.id}>
                          {isAr ? \`\${r.originAr} ← \${r.destAr} (من \${r.startingSAR} ر.س)\` : \`\${r.originEn} → \${r.destEn} (From \${r.startingSAR} SAR)\`}
                        </option>
                      ))}
                      <option value="makkah-to-jeddah-airport">
                        {isAr ? 'فندق مكة ← مطار جدة (KAIA) (من 200 ر.س)' : 'Makkah Hotel → Jeddah Airport (KAIA) (From 200 SAR)'}
                      </option>
                      <option value="madinah-to-makkah">
                        {isAr ? 'فندق المدينة ← فندق مكة (عبر الميقات) (من 400 ر.س)' : 'Madinah Hotel → Makkah Hotel (Via Miqat) (From 400 SAR)'}
                      </option>
                      <option value="taif-to-makkah">
                        {isAr ? 'الطائف ← فندق مكة (عبر الميقات) (من 400 ر.س)' : 'Taif → Makkah Hotel (Via Miqat) (From 400 SAR)'}
                      </option>
                      <option value="jeddah-to-taif">
                        {isAr ? 'مطار جدة (KAIA) ← الطائف (من 500 ر.س)' : 'Jeddah Airport (KAIA) → Taif (From 500 SAR)'}
                      </option>
                      <option value="riyadh-to-makkah">
                        {isAr ? 'الرياض ⇄ فندق مكة (من 1,800 ر.س)' : 'Riyadh ⇄ Makkah Hotel (From 1,800 SAR)'}
                      </option>
                      <option value="riyadh-to-madinah">
                        {isAr ? 'الرياض ⇄ فندق المدينة (من 2,000 ر.س)' : 'Riyadh ⇄ Madinah Hotel (From 2,000 SAR)'}
                      </option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 flex items-center px-3 text-[#A58A64]">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                )}
                {tripType === 'ziyarat' && (
                  <div className="relative">
                    <select
                      value={ziyaratTour}
                      onChange={(e) => setZiyaratTour(e.target.value)}
                      className="w-full h-12 px-3.5 pr-8 rtl:pr-3.5 rtl:pl-8 rounded-xl bg-[#F7F5F0] border border-[#E8E2D7] text-xs font-semibold text-[#111A27] focus:outline-none focus:ring-2 focus:ring-[#A58A64] appearance-none cursor-pointer"
                    >
                      <option value="makkah-ziyarat">
                        {isAr ? 'مزارات مكة المكرمة (2.5 ساعة معتمدة) (من 250 ر.س)' : 'Makkah Sacred Sites (2.5h Approved) (From 250 SAR)'}
                      </option>
                      <option value="madinah-ziyarat">
                        {isAr ? 'مزارات المدينة المنورة (جولة نبوية هادئة) (من 250 ر.س)' : 'Madinah Sacred Sites (Serene Tour) (From 250 SAR)'}
                      </option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 flex items-center px-3 text-[#A58A64]">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                )}
                {tripType === 'hourly' && (
                  <div className="relative">
                    <select
                      value={hourlyHours}
                      onChange={(e) => setHourlyHours(e.target.value)}
                      className="w-full h-12 px-3.5 pr-8 rtl:pr-3.5 rtl:pl-8 rounded-xl bg-[#F7F5F0] border border-[#E8E2D7] text-xs font-semibold text-[#111A27] focus:outline-none focus:ring-2 focus:ring-[#A58A64] appearance-none cursor-pointer"
                    >
                      <option value="2">{isAr ? 'ساعتان (2 ساعة) داخل المدينة' : '2 Hours Service in City'}</option>
                      <option value="4">{isAr ? '4 ساعات (نصف يوم)' : '4 Hours (Half Day)'}</option>
                      <option value="8">{isAr ? '8 ساعات (يوم كامل)' : '8 Hours (Full Day)'}</option>
                      <option value="12">{isAr ? '12 ساعة (يوم تنفيذي ممتد)' : '12 Hours (Executive Day)'}</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 flex items-center px-3 text-[#A58A64]">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </div>

              {/* Field 2: Pickup Date */}
              <div className="md:col-span-3 lg:col-span-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#687386] mb-1.5">
                  {t.dateLabel}
                </label>
                <input
                  type="date"
                  value={pickupDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full h-12 px-3 rounded-xl bg-[#F7F5F0] border border-[#E8E2D7] text-xs font-semibold text-[#111A27] focus:outline-none focus:ring-2 focus:ring-[#A58A64]"
                  required
                />
              </div>

              {/* Field 3: Pickup Time */}
              <div className="md:col-span-3 lg:col-span-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#687386] mb-1.5">
                  {t.timeLabel}
                </label>
                <input
                  type="time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full h-12 px-3 rounded-xl bg-[#F7F5F0] border border-[#E8E2D7] text-xs font-semibold text-[#111A27] focus:outline-none focus:ring-2 focus:ring-[#A58A64]"
                  required
                />
              </div>

              {/* Field 4: Passengers & Luggage */}
              <div className="flex items-center gap-2 md:col-span-6 lg:col-span-3">
                <div className="flex-1">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#687386] mb-1.5">
                    {t.passengersLabel}
                  </label>
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                    className="w-full h-12 px-2.5 rounded-xl bg-[#F7F5F0] border border-[#E8E2D7] text-xs font-semibold text-[#111A27] focus:outline-none focus:ring-2 focus:ring-[#A58A64]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 14, 21].map((n) => (
                      <option key={n} value={n}>
                        {n} {t.passengersLabel}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#687386] mb-1.5">
                    {t.luggageLabel}
                  </label>
                  <select
                    value={luggage}
                    onChange={(e) => setLuggage(e.target.value)}
                    className="w-full h-12 px-2.5 rounded-xl bg-[#F7F5F0] border border-[#E8E2D7] text-xs font-semibold text-[#111A27] focus:outline-none focus:ring-2 focus:ring-[#A58A64]"
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 15, 20].map((n) => (
                      <option key={n} value={n}>
                        {n} {t.luggageLabel}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Main Conversion CTA: View Available Vehicles and Prices */}
              <div className="sm:col-span-2 md:col-span-12 mt-2">
                <button
                  type="submit"
                  className="w-full min-h-[52px] rounded-xl bg-gradient-to-r from-[#111A27] to-[#1E2B3E] hover:from-[#1E2B3E] hover:to-[#111A27] text-[#F7F5F0] font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-lg hover:shadow-xl active:scale-[0.99] transition-all cursor-pointer border border-[#A58A64]/40"
                >
                  <Car className="w-5 h-5 text-[#A58A64]" />
                  <span>{t.ctaViewVehicles}</span>
                  {isRtl ? <ArrowLeft className="w-4 h-4 text-[#A58A64]" /> : <ArrowRight className="w-4 h-4 text-[#A58A64]" />}
                </button>
              </div>
            </form>

            {/* Reassurance Footer inside Card */}
            <div className="mt-4 pt-3.5 border-t border-[#E8E2D7] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#687386]">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#A58A64]" />
                <span>{t.trust1}</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4 text-[#A58A64]" />
                <span>{t.trust3}</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#A58A64]" />
                <span>{t.trust2}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION D: PREMIUM SERVICE ADVANTAGES (SWISS PRECISION)
      ────────────────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 md:py-20 border-b border-[#E8E2D7] bg-[#F7F5F0]">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="max-w-2xl mb-10 text-start">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#A58A64]/30 text-xs font-bold text-[#A58A64] uppercase tracking-wider mb-2.5">
              <Shield className="w-3.5 h-3.5" />
              <span>{t.advantagesBadge}</span>
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-[#111A27] tracking-tight">
              {t.advantagesTitle}
            </h2>
            <p className="text-sm sm:text-base text-[#687386] mt-2 leading-relaxed">
              {t.advantagesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {t.advantages.map((adv, idx) => (
              <div
                key={idx}
                className="rounded-2xl p-6 bg-white border border-[#E8E2D7] shadow-xs hover:border-[#A58A64] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#F7F5F0] border border-[#A58A64]/30 flex items-center justify-center text-[#A58A64] mb-4">
                    {adv.icon === 'clock' && <Clock className="w-6 h-6" />}
                    {adv.icon === 'plane' && <Plane className="w-6 h-6" />}
                    {adv.icon === 'baby' && <Baby className="w-6 h-6" />}
                    {adv.icon === 'calendar' && <Calendar className="w-6 h-6" />}
                    {adv.icon === 'shield' && <ShieldCheck className="w-6 h-6" />}
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#111A27] mb-2 leading-snug">
                    {adv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#687386] leading-relaxed">
                    {adv.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION E: LUXURY AUTOMOTIVE SHOWCASE (EDITORIAL CARDS)
      ────────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 md:py-24 bg-white border-b border-[#E8E2D7]">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 text-start">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F5F0] border border-[#A58A64]/30 text-xs font-bold text-[#A58A64] uppercase tracking-wider mb-2.5">
                <Car className="w-3.5 h-3.5" />
                <span>{t.fleetBadge}</span>
              </div>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-[#111A27] tracking-tight">
                {t.fleetTitle}
              </h2>
              <p className="text-sm sm:text-base text-[#687386] mt-2 leading-relaxed">
                {t.fleetSubtitle}
              </p>
            </div>
            <div className="text-start md:text-end shrink-0">
              <span className="text-xs text-[#687386] font-medium block max-w-xs">
                {t.fleetDisclaimer}
              </span>
            </div>
          </div>

          {/* 5 Instant-Booking Editorial Models */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {REGULAR_FLEET_MODELS.map((model) => {
              const detailHref = \`/\${locale}/fleet/\${model.slug}\`;
              const bookingHref = \`/\${locale}/booking?vehicle=\${model.bookingId}\`;

              return (
                <div
                  key={model.id}
                  className="rounded-3xl bg-[#F7F5F0] border border-[#E8E2D7] overflow-hidden flex flex-col justify-between shadow-xs hover:border-[#A58A64] hover:shadow-lg transition-all duration-300"
                >
                  <div>
                    {/* Generous High-Resolution Studio Canvas */}
                    <div className="relative w-full h-56 sm:h-64 bg-gradient-to-b from-white to-[#F7F5F0] p-4 flex items-center justify-center border-b border-[#E8E2D7]">
                      <Image
                        src={model.image}
                        alt={model.name[locale] || model.name.en}
                        fill
                        className="object-contain p-3 hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>

                    {/* Editorial Content */}
                    <div className="p-6 text-start">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#A58A64] bg-white px-2.5 py-1 rounded-md border border-[#E8E2D7] inline-block mb-2">
                        {model.category[locale] || model.category.en}
                      </span>

                      <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#111A27] mb-2 leading-tight">
                        {model.name[locale] || model.name.en}
                      </h3>

                      {/* Capacity Bar */}
                      <div className="flex items-center gap-4 text-xs font-semibold text-[#687386] mb-4 pb-3 border-b border-[#E8E2D7]">
                        <span className="flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-[#A58A64]" />
                          <span>{model.passengers} {t.passengersLabel}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5">
                          <Luggage className="w-4 h-4 text-[#A58A64]" />
                          <span>{model.luggage} {t.luggageLabel}</span>
                        </span>
                      </div>

                      {/* 3 Editorial Feature Bullets */}
                      <ul className="space-y-2 mb-6">
                        {(model.highlights[locale] || model.highlights.en).map((item, idx) => (
                          <li key={idx} className="text-xs text-[#4B5565] flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#A58A64] shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="p-6 pt-0 flex flex-col sm:flex-row gap-2.5">
                    <Link
                      href={detailHref}
                      className="flex-1 min-h-[44px] rounded-xl bg-white border border-[#E8E2D7] hover:border-[#A58A64] text-xs font-bold text-[#111A27] flex items-center justify-center transition-colors text-center"
                    >
                      <span>{t.exploreDetails}</span>
                    </Link>
                    <Link
                      href={bookingHref}
                      className="flex-1 min-h-[44px] rounded-xl bg-[#111A27] hover:bg-[#1E2B3E] text-xs font-bold text-white uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <span>{t.bookThisVehicle}</span>
                      {isRtl ? <ArrowLeft className="w-3.5 h-3.5 text-[#A58A64]" /> : <ArrowRight className="w-3.5 h-3.5 text-[#A58A64]" />}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION F: POPULAR JOURNEYS & APPROVED ROUTE RATES
      ────────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 md:py-24 bg-[#F7F5F0] border-b border-[#E8E2D7]">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="max-w-2xl mb-10 text-start">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#A58A64]/30 text-xs font-bold text-[#A58A64] uppercase tracking-wider mb-2.5">
              <Compass className="w-3.5 h-3.5" />
              <span>{t.journeysBadge}</span>
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-[#111A27] tracking-tight">
              {t.journeysTitle}
            </h2>
            <p className="text-sm sm:text-base text-[#687386] mt-2 leading-relaxed">
              {t.journeysSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {TOP_APPROVED_JOURNEYS.map((j) => (
              <div
                key={j.id}
                className="rounded-2xl p-6 bg-white border border-[#E8E2D7] shadow-xs hover:border-[#A58A64] hover:shadow-md transition-all flex flex-col justify-between text-start"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#687386] mb-3">
                    <span className="bg-[#F7F5F0] px-2.5 py-1 rounded-md border border-[#E8E2D7]">
                      {j.distanceKm} km • {isAr ? j.durationAr : j.durationEn}
                    </span>
                    <span className="text-[#A58A64] font-extrabold uppercase">
                      {t.fromStarting} {formatPrice(j.startingSAR)}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-[#111A27] mb-1.5 leading-snug">
                    {isAr ? \`\${j.originAr} ← \${j.destAr}\` : \`\${j.originEn} → \${j.destEn}\`}
                  </h3>
                  <p className="text-xs text-[#687386] mb-4">
                    {isAr ? 'سيارات مكيفة بالكامل وسائقون محترفون مع استقبال بالمطار' : 'Fully sanitized climate-controlled vehicles with professional chauffeur.'}
                  </p>
                </div>

                <Link
                  href={\`/\${locale}/booking?route=\${j.id}\`}
                  className="w-full min-h-[44px] rounded-xl bg-[#111A27] hover:bg-[#1E2B3E] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors mt-2"
                >
                  <span>{t.bookThisRoute}</span>
                  {isRtl ? <ArrowLeft className="w-3.5 h-3.5 text-[#A58A64]" /> : <ArrowRight className="w-3.5 h-3.5 text-[#A58A64]" />}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION G: VIP CONCIERGE (MAYBACH & H1 BESPOKE REQUESTS)
      ────────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-[#111A27] text-white border-b border-[#A58A64]/30">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="max-w-2xl mb-12 text-start">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A2638] border border-[#A58A64]/50 text-xs font-bold text-[#A58A64] uppercase tracking-wider mb-2.5">
              <Award className="w-3.5 h-3.5" />
              <span>{t.conciergeBadge}</span>
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-[#F7F5F0] tracking-tight">
              {t.conciergeTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
              {t.conciergeSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Maybach Card */}
            <div className="rounded-3xl p-6 sm:p-8 bg-[#182335] border border-[#A58A64]/40 flex flex-col justify-between">
              <div>
                <div className="relative w-full h-48 sm:h-56 mb-4 rounded-2xl overflow-hidden bg-gradient-to-b from-[#213047] to-[#182335]">
                  <Image
                    src="/assets/images/vehicles/mercedes-maybach/exterior-studio.webp"
                    alt={t.conciergeMaybachTitle}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-white mb-2">
                  {t.conciergeMaybachTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {t.conciergeMaybachDesc}
                </p>
              </div>
              <a
                href={\`https://wa.me/966567588261?text=\${encodeURIComponent(
                  isAr
                    ? 'السلام عليكم ضيوف الرحمن VIP، أود الاستفسار عن حجز سيارة مرسيدس مايباخ مع سائق خاص.'
                    : 'Hello Duyuf Alrahman VIP, I would like to inquire about booking a private Mercedes-Maybach with chauffeur.'
                )}\`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[48px] rounded-xl bg-gradient-to-r from-[#A58A64] to-[#C5A15D] text-[#111A27] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-105 transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.conciergeCta}</span>
              </a>
            </div>

            {/* Hyundai H1 VIP Card */}
            <div className="rounded-3xl p-6 sm:p-8 bg-[#182335] border border-[#A58A64]/40 flex flex-col justify-between">
              <div>
                <div className="relative w-full h-48 sm:h-56 mb-4 rounded-2xl overflow-hidden bg-gradient-to-b from-[#213047] to-[#182335]">
                  <Image
                    src="/assets/images/vehicles/hyundai-h1/exterior-studio.webp"
                    alt={t.conciergeH1Title}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-white mb-2">
                  {t.conciergeH1Title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {t.conciergeH1Desc}
                </p>
              </div>
              <a
                href={\`https://wa.me/966567588261?text=\${encodeURIComponent(
                  isAr
                    ? 'السلام عليكم ضيوف الرحمن VIP، أود الاستفسار عن حجز فان هيونداي H1 VIP مع سائق خاص.'
                    : 'Hello Duyuf Alrahman VIP, I would like to inquire about booking a private Hyundai H1 VIP van with chauffeur.'
                )}\`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[48px] rounded-xl bg-gradient-to-r from-[#A58A64] to-[#C5A15D] text-[#111A27] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-105 transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.conciergeCta}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION H: BOOKING PROCESS (3 TRANSPARENT STEPS)
      ────────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 md:py-24 bg-white border-b border-[#E8E2D7]">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="max-w-2xl mb-12 text-start">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F5F0] border border-[#A58A64]/30 text-xs font-bold text-[#A58A64] uppercase tracking-wider mb-2.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{t.processBadge}</span>
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-[#111A27] tracking-tight">
              {t.processTitle}
            </h2>
            <p className="text-sm sm:text-base text-[#687386] mt-2 leading-relaxed">
              {t.processSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {t.processSteps.map((step, idx) => (
              <div
                key={idx}
                className="rounded-3xl p-6 sm:p-8 bg-[#F7F5F0] border border-[#E8E2D7] relative flex flex-col justify-between text-start"
              >
                <div>
                  <span className="font-serif font-black text-3xl sm:text-4xl text-[#A58A64] block mb-4">
                    {step.num}
                  </span>
                  <h3 className="font-serif font-bold text-xl text-[#111A27] mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#687386] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION I: VERIFIED CUSTOMER REVIEWS & ESSENTIAL FAQ
      ────────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 md:py-24 bg-[#F7F5F0] border-b border-[#E8E2D7]">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          {/* Reviews Rating Banner */}
          <div className="rounded-3xl bg-white p-6 sm:p-10 border border-[#E8E2D7] mb-14 text-center max-w-3xl mx-auto shadow-xs">
            <div className="flex items-center justify-center gap-1 text-[#A58A64] mb-3">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#111A27] mb-2">
              {t.reviewsTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#687386] leading-relaxed max-w-xl mx-auto">
              {t.reviewsSubtitle}
            </p>
          </div>

          {/* Essential FAQ Section */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#A58A64]/30 text-xs font-bold text-[#A58A64] uppercase tracking-wider mb-2.5">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{t.faqBadge}</span>
              </div>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#111A27]">
                {t.faqTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[#687386] mt-1.5">
                {t.faqSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-start">
              {t.faqs.map((f, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl p-6 bg-white border border-[#E8E2D7] shadow-xs"
                >
                  <h3 className="font-serif font-bold text-sm sm:text-base text-[#111A27] mb-2 leading-snug">
                    {f.q}
                  </h3>
                  <p className="text-xs text-[#687386] leading-relaxed">
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION J: STRONG FINAL BOOKING CTA
      ────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-[#111A27] text-white text-center relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1A2638] border border-[#A58A64]/50 text-xs font-bold text-[#A58A64] uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.closingBadge}</span>
          </div>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-[#F7F5F0] tracking-tight mb-4 leading-tight">
            {t.closingTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
            {t.closingSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href={\`/\${locale}/booking\`}
              className="w-full sm:w-auto min-h-[50px] px-8 rounded-xl bg-gradient-to-r from-[#A58A64] to-[#C5A15D] text-[#111A27] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-105 active:scale-[0.98] transition-all shadow-lg"
            >
              <span>{t.closingBookBtn}</span>
              {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </Link>
            <a
              href={\`https://wa.me/966567588261?text=\${encodeURIComponent(
                isAr
                  ? 'السلام عليكم ورحمة الله ضيوف الرحمن VIP، أود الاستفسار وحجز توصيل خاص فاخر.'
                  : 'Hello Duyuf Alrahman VIP, I would like to inquire about booking a private luxury transfer.'
              )}\`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto min-h-[50px] px-8 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#A58A64]" />
              <span>{t.closingWhatsappBtn}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
`;

fs.writeFileSync(
  path.join(process.cwd(), 'src/components/home/RoyalHomepageExperience.tsx'),
  royalHomepageCode,
  'utf8'
);
console.log('Successfully wrote src/components/home/RoyalHomepageExperience.tsx');
