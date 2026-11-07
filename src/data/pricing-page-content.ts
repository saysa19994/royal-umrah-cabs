import { Locale } from '@/i18n/config';

export interface PricingFeatureCard {
  title: string;
  description: string;
  badge: string;
}

export interface PricingFaq {
  question: string;
  answer: string;
}

export interface LocalizedPricingContent {
  badge: string;
  heroTitle: string;
  heroSubtitle: string;
  // Reference B master elements
  trustSafeReliable?: string;
  trustPremiumFleet?: string;
  trustSupport247?: string;
  searchPickupLabel?: string;
  searchPickupPlaceholder?: string;
  searchDestLabel?: string;
  searchDestPlaceholder?: string;
  searchTripTypeLabel?: string;
  searchOneWay?: string;
  searchRoundTrip?: string;
  searchExploreBtn?: string;
  chooseVehicleTitle?: string;
  chooseVehicleSubtitle?: string;
  mostPopularBadge?: string;
  viewRoutePriceBtn?: string;
  passengersWord?: string;
  bagsWord?: string;
  fromPricePrefix?: string;
  routeGuideTitle?: string;
  routeGuideSubtitle?: string;
  compareVehiclesBtn?: string;
  whatsIncludedTitle?: string;
  incFareDetails?: string;
  incVehicleInfo?: string;
  incBookingSupport?: string;
  whyTravelTitle?: string;
  whyPremiumService?: string;
  whyTrustedChoice?: string;
  whyOnTime?: string;
  whyNationwide?: string;
  readyCardTitle?: string;
  readyCardSubtitle?: string;
  bookJourneyBtn?: string;
  features: {
    cashOnArrival: PricingFeatureCard;
    fixedPerVehicle: PricingFeatureCard;
    flightTracking: PricingFeatureCard;
    vipAmenities: PricingFeatureCard;
  };
  bespokeNotice: {
    title: string;
    description: string;
    cta: string;
  };
  faqTitle: string;
  faqSubtitle: string;
  faqs: PricingFaq[];
}

export const PRICING_PAGE_CONTENT: Record<Locale, LocalizedPricingContent> = {
  ar: {
    badge: 'شفافية مطلقة • أسعار معتمدة',
    heroTitle: 'أسعارنا وباقاتنا الفاخرة',
    heroSubtitle:
      'خدمات نقل فاخرة بأسعار تنافسية ومحددة عبر جميع مدن المملكة العربية السعودية. دفع نقدي 100% للسائق عند الوصول بعد إتمام الرحلة وبدون أي عربون مسبق.',
    trustSafeReliable: 'نقل آمن وموثوق',
    trustPremiumFleet: 'أسطول سيارات فاخر',
    trustSupport247: 'دعم عملاء 24/7',
    searchPickupLabel: 'موقع الانطلاق',
    searchPickupPlaceholder: 'اختر موقع الانطلاق',
    searchDestLabel: 'الوجهة',
    searchDestPlaceholder: 'اختر الوجهة',
    searchTripTypeLabel: 'نوع الرحلة',
    searchOneWay: 'ذهاب فقط',
    searchRoundTrip: 'ذهاب وعودة',
    searchExploreBtn: 'استكشف الأسعار',
    chooseVehicleTitle: 'اختر سيارتك الفاخرة',
    chooseVehicleSubtitle: 'سافر بأناقة وفخامة مع أسطولنا المتميز',
    mostPopularBadge: 'الأكثر طلباً',
    viewRoutePriceBtn: 'عرض سعر المسار',
    passengersWord: 'ركاب',
    bagsWord: 'حقائب',
    fromPricePrefix: 'من',
    routeGuideTitle: 'دليل أسعار المسارات',
    routeGuideSubtitle: 'ابحث عن أفضل الأسعار والمسارات المعتمدة لرحلتك',
    compareVehiclesBtn: 'مقارنة السيارات',
    whatsIncludedTitle: 'ما تشمله باقتك',
    incFareDetails: 'تفاصيل الأجرة الشاملة',
    incVehicleInfo: 'مركبة حديثة ومعقمة',
    incBookingSupport: 'دعم وإرشاد الحجز 24/7',
    whyTravelTitle: 'لماذا السفر مع ضيوف الرحمن VIP؟',
    whyPremiumService: 'خدمة ليموزين فاخرة',
    whyTrustedChoice: 'خيار معتمد وموثوق',
    whyOnTime: 'التزام تام بالمواعيد',
    whyNationwide: 'تغطية لكافة مدن المملكة',
    readyCardTitle: 'مستعد لرحلتك؟',
    readyCardSubtitle: 'احجز وسيلة نقلك الخاصة الآن وسافر بكل طمأنينة ووقار.',
    bookJourneyBtn: 'احجز رحلتك الآن',
    features: {
      cashOnArrival: {
        badge: 'بدون دفعة مسبقة',
        title: 'سداد نقدي عند الوصول',
        description: 'ادفع للسائق مباشرة نقداً (بالريال أو الدولار) بعد وصولك إلى وجهتك وفندقك بسلام وبدون أي عربون.',
      },
      fixedPerVehicle: {
        badge: 'سعر ثابت معتمد',
        title: 'الأجرة للسيارة بالكامل',
        description: 'السعر محدد للمركبة كاملة وليس لكل راكب، وشامل لكافة رسوم الطرق السريعة وضريبة القيمة المضافة.',
      },
      flightTracking: {
        badge: 'تتبع راداري مباشر',
        title: 'استقبال المطار وانتظار مجاني',
        description: 'متابعة حية لرقم الرحلة وتعديل الموعد تلقائياً عند التأخير مع 60 دقيقة انتظار مجاني بعد الهبوط.',
      },
      vipAmenities: {
        badge: 'ضيافة ملكية',
        title: 'مركبات مجهزة وسائقون محترفون',
        description: 'سيارات معقمة ومكيفة مسبقاً، مساعدة كاملة في تحميل الأمتعة وعبوات زمزم، وسائقون ذوو خبرة بالحرمين.',
      },
    },
    bespokeNotice: {
      title: 'طلب سيارات حصرية خاصة (مرسيدس مايباخ وهيونداي H1)',
      description:
        'لحجوزات كبار الشخصيات والرؤساء والوفود الدبلوماسية، نوفر سيارات مرسيدس مايباخ وهيونداي H1 الفارهة بعروض أسعار خاصة وفورية عبر خدمة الكونسيرج الخاصة على واتساب.',
      cta: 'تواصل مع الكونسيرج الفاخر عبر واتساب',
    },
    faqTitle: 'الأسئلة الشائعة حول الأسعار والدفع',
    faqSubtitle: 'كل ما تحتاج لمعرفته حول سياسات الحجز والأسعار الشفافة',
    faqs: [
      {
        question: 'هل الأسعار المذكورة للشخص الواحد أم للمركبة بالكامل؟',
        answer: 'جميع الأسعار الموضحة هي للمركبة بالكامل بسعتها المعتمدة من الركاب والحقائب، وليست للشخص الواحد.',
      },
      {
        question: 'كيف ومتى يتم سداد قيمة الرحلة؟',
        answer: 'لا نطلب أي بطاقة ائتمانية أو دفعة مسبقة. يتم السداد نقداً 100% مباشرة للسائق عند الوصول إلى وجهتك وفندقك (بالريال السعودي أو الدولار الأمريكي).',
      },
      {
        question: 'ماذا يحدث إذا تأخرت رحلة الطيران القادمة إلى جدة أو المدينة؟',
        answer: 'يتتبع فريقنا رحلتك عبر رادار الطيران المباشر، ويصل السائق بناءً على وقت الهبوط الفعلي، مع فترة انتظار مجانية تمتد إلى 60 دقيقة من لحظة الهبوط.',
      },
      {
        question: 'هل تشمل الأسعار رسوم الطرق السريعة وضريبة القيمة المضافة؟',
        answer: 'نعم، كافة الأسعار نهائية وشاملة لكافة بوابات رسوم الطرق السريعة والضرائب ولا توجد أي مبالغ إضافية أو رسوم خفية.',
      },
    ],
  },

  en: {
    badge: 'Transparent Rates • Guaranteed Fares',
    heroTitle: 'Our Prices & Packages',
    heroSubtitle:
      'Premium transportation at competitive prices across Saudi Arabia. 100% cash upon arrival after journey completion with zero advance deposit required.',
    trustSafeReliable: 'Safe & Reliable Transportation',
    trustPremiumFleet: 'Premium Fleet',
    trustSupport247: '24/7 Customer Support',
    searchPickupLabel: 'Pickup Location',
    searchPickupPlaceholder: 'Select pickup location',
    searchDestLabel: 'Destination',
    searchDestPlaceholder: 'Select destination',
    searchTripTypeLabel: 'Trip Type',
    searchOneWay: 'One Way',
    searchRoundTrip: 'Round Trip',
    searchExploreBtn: 'Explore Prices',
    chooseVehicleTitle: 'Choose Your Vehicle',
    chooseVehicleSubtitle: 'Travel in style with our premium fleet',
    mostPopularBadge: 'Most Popular',
    viewRoutePriceBtn: 'View route price',
    passengersWord: 'Passengers',
    bagsWord: 'Bags',
    fromPricePrefix: 'From',
    routeGuideTitle: 'Route Price Guide',
    routeGuideSubtitle: 'Find the best prices for your journey',
    compareVehiclesBtn: 'Compare Vehicles',
    whatsIncludedTitle: "What's Included",
    incFareDetails: 'Clear Fare Details',
    incVehicleInfo: 'Vehicle Information',
    incBookingSupport: 'Booking Support',
    whyTravelTitle: 'Why Travel with Duyuf Al Rahman VIP?',
    whyPremiumService: 'Premium Service',
    whyTrustedChoice: 'Trusted Choice',
    whyOnTime: 'On-Time Service',
    whyNationwide: 'Nationwide Coverage',
    readyCardTitle: 'Ready for Your Journey?',
    readyCardSubtitle: 'Book now and travel with confidence across Saudi Arabia.',
    bookJourneyBtn: 'Book Your Journey',
    features: {
      cashOnArrival: {
        badge: 'Zero Prepayment',
        title: '100% Cash on Arrival',
        description: 'Pay your chauffeur directly in cash (SAR or USD) after arriving safely at your hotel. No deposit needed.',
      },
      fixedPerVehicle: {
        badge: 'Fixed Fare Guarantee',
        title: 'Price Per Vehicle',
        description: 'Fares are strictly per vehicle, never per passenger. All highway tolls, parking fees, and VAT included.',
      },
      flightTracking: {
        badge: 'Live Radar Tracking',
        title: 'Airport Meet & Greet',
        description: 'Automated flight radar tracking adjusts for flight delays automatically, with 60 minutes complimentary wait time.',
      },
      vipAmenities: {
        badge: 'Royal Hospitality',
        title: 'Pristine Fleet & Chauffeurs',
        description: 'Pre-cooled cabins, luggage assistance, child seats on request, and licensed English/Arabic speaking chauffeurs.',
      },
    },
    bespokeNotice: {
      title: 'Bespoke Executive Fleet (Mercedes-Maybach & Hyundai H1)',
      description:
        'For diplomatic delegations, VIP dignitaries, and bespoke luxury requirements, Mercedes-Maybach and Hyundai H1 are quoted exclusively via our 24/7 VIP Concierge on WhatsApp.',
      cta: 'Contact VIP Concierge on WhatsApp',
    },
    faqTitle: 'Frequently Asked Questions About Pricing',
    faqSubtitle: 'Everything you need to know about our clear, fixed-rate chauffeur service',
    faqs: [
      {
        question: 'Are fares charged per person or per vehicle?',
        answer: 'All rates are strictly per vehicle for your private party up to maximum passenger capacity, never per seat or per person.',
      },
      {
        question: 'When and how do I pay for my transfer?',
        answer: 'No credit card or deposit is required in advance. Payment is made 100% in cash directly to your chauffeur upon arrival at your destination (in SAR or USD).',
      },
      {
        question: 'What happens if my inbound flight is delayed?',
        answer: 'Our dispatch team tracks your flight radar continuously. Chauffeur pickup is automatically rescheduled to your actual touchdown time with 60 minutes free waiting time.',
      },
      {
        question: 'Are highway tolls and taxes included in the price?',
        answer: 'Yes, all prices are all-inclusive. Express highway tolls, fuel, airport parking, and VAT are fully covered with zero surcharge.',
      },
    ],
  },

  ms: {
    badge: 'Kadar Telus • Tambang Dijamin',
    heroTitle: 'Kadar Tambang VIP Duyuf Alrahman',
    heroSubtitle:
      'Tambang tetap terjamin untuk setiap kenderaan tanpa caj tersembunyi. Bayaran tunai 100% semasa ketibaan (SAR atau USD) tanpa sebarang wang pendahuluan.',
    features: {
      cashOnArrival: {
        badge: 'Tanpa Bayaran Pendahuluan',
        title: 'Bayar Tunai Semasa Tiba',
        description: 'Bayar terus kepada pemandu secara tunai (SAR atau USD) setelah selamat tiba di hotel anda tanpa deposit.',
      },
      fixedPerVehicle: {
        badge: 'Jaminan Harga Tetap',
        title: 'Kadar Setiap Kenderaan',
        description: 'Harga adalah untuk sebuah kenderaan penuh, bukan per orang. Termasuk semua tol lebuh raya dan cukai.',
      },
      flightTracking: {
        badge: 'Penjejakan Radar Penerbangan',
        title: 'Sambutan Lapangan Terbang',
        description: 'Penjejakan automatik jadual penerbangan dengan masa menunggu percuma 60 minit selepas mendarat.',
      },
      vipAmenities: {
        badge: 'Layanan Diraja',
        title: 'Kenderaan Selesa & Pemandu Mesra',
        description: 'Hawa dingin sejuk, bantuan bagasi dan air zamzam, serta pemandu berpengalaman di laluan Makkah-Madinah.',
      },
    },
    bespokeNotice: {
      title: 'Tempahan Khas Armada Eksekutif (Mercedes-Maybach & Hyundai H1)',
      description:
        'Untuk tetamu VIP dan rombongan khas, Mercedes-Maybach dan Hyundai H1 disediakan melalui perkhidmatan Concierge WhatsApp kami.',
      cta: 'Hubungi VIP Concierge di WhatsApp',
    },
    faqTitle: 'Soalan Lazim Mengenai Harga & Bayaran',
    faqSubtitle: 'Segala maklumat mengenai polisi harga telus kami',
    faqs: [
      {
        question: 'Adakah tambang dikira setiap orang atau setiap kenderaan?',
        answer: 'Semua harga adalah untuk satu kenderaan persendirian mengikut kapasiti penuh, bukan dikira setiap individu.',
      },
      {
        question: 'Bagaimanakah cara bayaran dibuat?',
        answer: 'Tiada deposit atau kad kredit diperlukan. Bayaran adalah tunai 100% terus kepada pemandu setibanya di hotel anda (SAR atau USD).',
      },
      {
        question: 'Bagaimana jika penerbangan saya mengalami kelewatan?',
        answer: 'Pemandu kami menjejaki radar penerbangan anda secara automatik. Waktu menunggu percuma 60 minit bermula dari masa mendarat sebenar.',
      },
      {
        question: 'Adakah tol dan cukai termasuk dalam harga?',
        answer: 'Ya, semua harga adalah muktamad dan merangkumi tol lebuh raya, minyak, dan cukai tanpa sebarang caj tambahan.',
      },
    ],
  },

  id: {
    badge: 'Tarif Transparan • Harga Pasti',
    heroTitle: 'Tarif Transfer Mewah & Harga Pasti',
    heroSubtitle:
      'Harga tetap terjamin per kendaraan tanpa biaya tersembunyi. Pembayaran tunai 100% saat tiba di hotel tujuan (SAR atau USD) tanpa uang muka.',
    features: {
      cashOnArrival: {
        badge: 'Tanpa DP / Uang Muka',
        title: 'Bayar Tunai Saat Tiba',
        description: 'Bayar langsung ke pengemudi secara tunai (SAR atau USD) setelah tiba di hotel tujuan Anda dengan aman.',
      },
      fixedPerVehicle: {
        badge: 'Garansi Harga Pasti',
        title: 'Harga Per Kendaraan',
        description: 'Harga dihitung untuk satu mobil penuh, bukan per orang. Sudah termasuk tol jalan raya dan pajak.',
      },
      flightTracking: {
        badge: 'Pelacakan Radar Pesawat',
        title: 'Penjemputan Bandara',
        description: 'Pelacakan otomatis status penerbangan Anda dengan gratis waktu tunggu 60 menit setelah mendarat.',
      },
      vipAmenities: {
        badge: 'Layanan Istimewa',
        title: 'Armada Nyaman & Sopir Ramah',
        description: 'Kabin dingin ber-AC, bantuan angkut koper dan air zamzam, serta sopir berpengalaman di Tanah Suci.',
      },
    },
    bespokeNotice: {
      title: 'Layanan Khusus VIP (Mercedes-Maybach & Hyundai H1)',
      description:
        'Untuk tamu kehormatan dan rombongan keluarga VIP, Mercedes-Maybach dan Hyundai H1 tersedia melalui layanan Concierge WhatsApp.',
      cta: 'Hubungi VIP Concierge via WhatsApp',
    },
    faqTitle: 'Pertanyaan Umum Tentang Harga & Pembayaran',
    faqSubtitle: 'Semua informasi mengenai transparansi tarif perjalanan Anda',
    faqs: [
      {
        question: 'Apakah harga dihitung per orang atau per kendaraan?',
        answer: 'Semua harga adalah untuk satu mobil penuh sesuai kapasitas tempat duduk, bukan dihitung per orang.',
      },
      {
        question: 'Bagaimana dan kapan pembayaran dilakukan?',
        answer: 'Tanpa kartu kredit atau DP. Pembayaran dilakukan 100% tunai langsung kepada sopir saat Anda tiba di tujuan (SAR atau USD).',
      },
      {
        question: 'Bagaimana jika pesawat saya mengalami keterlambatan?',
        answer: 'Kami memantau jadwal kedatangan pesawat secara langsung. Penjemputan disesuaikan dengan gratis waktu tunggu 60 menit.',
      },
      {
        question: 'Apakah tarif sudah termasuk biaya tol jalan raya?',
        answer: 'Ya, tarif sudah mencakup tol jalan raya, bensin, dan pajak tanpa ada tambahan biaya tersembunyi.',
      },
    ],
  },

  ur: {
    badge: 'شفاف نرخیں • یقینی کرائے',
    heroTitle: 'ضیوف الرحمن وی آئی پی پریمیم ٹرانسفر ریٹس',
    heroSubtitle:
      'بغیر کسی چھپی فیس کے فی گاڑی یقینی اور مقررہ کرائے۔ منزل پر بحفاظت پہنچنے کے بعد ڈرائیور کو 100% نقد ادائیگی (سعودی ریال یا امریکی ڈالر) بغیر کسی پیشگی ایڈوانس کے۔',
    features: {
      cashOnArrival: {
        badge: 'بغیر پیشگی رقم',
        title: 'منزل پر نقد ادائیگی',
        description: 'ہوٹل پر بحفاظت پہنچنے کے بعد کرایہ براہ راست ڈرائیور کو نقد (ریال یا ڈالر میں) ادا کریں۔ کوئی ایڈوانس نہیں۔',
      },
      fixedPerVehicle: {
        badge: 'مقررہ کرایہ گارنٹی',
        title: 'کرایہ مکمل گاڑی کا',
        description: 'تمام کرائے مکمل گاڑی کے لیے ہیں، فی سواری نہیں۔ تمام ہائی وے ٹول ٹیکس اور ویٹ شامل ہے۔',
      },
      flightTracking: {
        badge: 'پروازوں کی لائیو ٹریکنگ',
        title: 'ایئرپورٹ استقبال اور مفت انتظار',
        description: 'پرواز کی خودکار ٹریکنگ اور فلائٹ لینڈ کرنے کے بعد 60 منٹ تک مفت انتظار کی سہولت شامل ہے۔',
      },
      vipAmenities: {
        badge: 'شاہی ضیافت',
        title: 'آرام دہ گاڑیاں اور ماہر ڈرائیورز',
        description: 'پہلے سے ٹھنڈی اور صاف ستھری گاڑیاں، سامان اور زمزم کین اٹھانے میں مدد، اور مکہ مدینہ کے راستوں کے ماہر ڈرائیورز۔',
      },
    },
    bespokeNotice: {
      title: 'خصوصی وی آئی پی گاڑیاں (مرسڈیز مے بیک اور ہیونڈائی H1)',
      description:
        'وی آئی پی وفود اور خاص مہمانوں کے لیے مرسڈیز مے بیک اور ہیونڈائی H1 ہمارے واٹس ایپ کونسیرج کے ذریعے خصوصی کوٹیشن پر دستیاب ہیں۔',
      cta: 'واٹس ایپ پر وی آئی پی کونسیرج سے رابطہ کریں',
    },
    faqTitle: 'کرایوں اور ادائیگی کے بارے میں اکثر پوچھے گئے سوالات',
    faqSubtitle: 'ہمارے شفاف اور مقررہ کرایوں کے نظام کے بارے میں مکمل رہنمائی',
    faqs: [
      {
        question: 'کیا کرایہ فی سواری ہے یا پوری گاڑی کا؟',
        answer: 'تمام کرائے مکمل گاڑی کے لیے مقرر ہیں اور نشستوں کی گنجائش کے مطابق پوری فیملی کے لیے ہیں، فی سواری نہیں۔',
      },
      {
        question: 'ادائیگی کب اور کیسے کی جاتی ہے؟',
        answer: 'ہمیں کسی ایڈوانس یا کریڈٹ کارڈ کی ضرورت نہیں۔ ادائیگی 100% نقد ہوٹل پہنچنے کے بعد براہ راست ڈرائیور کو کی جاتی ہے۔',
      },
      {
        question: 'اگر پرواز لیٹ ہو جائے تو کیا ہوتا ہے؟',
        answer: 'ہماری ٹیم فلائٹ ریڈار کے ذریعے پرواز پر نظر رکھتی ہے اور لینڈنگ کے بعد 60 منٹ کا مفت انتظار فراہم کیا جاتا ہے۔',
      },
      {
        question: 'کیا ہائی وے ٹول ٹیکس کرائے میں شامل ہیں؟',
        answer: 'جی ہاں، تمام کرائے حتمی ہیں اور ان میں ہائی وے ٹول، پارکنگ اور ٹیکس شامل ہیں، کوئی پوشیدہ چارجز نہیں۔',
      },
    ],
  },

  fr: {
    badge: 'Tarifs Transparents • Prix Fixes Garantis',
    heroTitle: 'Tarifs et Forfaits de Chauffeur VIP Duyuf Alrahman',
    heroSubtitle:
      'Tarifs garantis par véhicule sans aucun frais caché. Paiement 100% en espèces à l’arrivée à votre hôtel (en SAR ou USD) sans aucun acompte préalable.',
    features: {
      cashOnArrival: {
        badge: 'Zéro Acompte',
        title: 'Paiement en Espèces à l’Arrivée',
        description: 'Payez directement votre chauffeur en espèces (SAR ou USD) une fois arrivé à bon port à votre hôtel.',
      },
      fixedPerVehicle: {
        badge: 'Prix Fixe Garanti',
        title: 'Tarif Par Véhicule',
        description: 'Prix pour le véhicule entier, jamais par personne. Tous les péages autoroutiers et taxes sont inclus.',
      },
      flightTracking: {
        badge: 'Suivi Radar des Vols',
        title: 'Accueil Aéroport & Attente Gratuite',
        description: 'Suivi automatique de votre vol en temps réel avec 60 minutes d’attente gratuite après atterrissage effectif.',
      },
      vipAmenities: {
        badge: 'Hospitalité Royale',
        title: 'Flotte Impeccable & Chauffeurs Courtois',
        description: 'Climatisation pré-réglée, assistance complète pour bagages et eau de Zamzam, chauffeurs expérimentés.',
      },
    },
    bespokeNotice: {
      title: 'Véhicules Diplomatiques & Sur-Mesure (Mercedes-Maybach & Hyundai H1)',
      description:
        'Pour les délégations officielles et invités d’honneur, la Mercedes-Maybach et le Hyundai H1 sont réservés via notre Conciergerie WhatsApp.',
      cta: 'Contacter le Concierge VIP sur WhatsApp',
    },
    faqTitle: 'Foire Aux Questions sur les Tarifs & Paiements',
    faqSubtitle: 'Tout ce que vous devez savoir sur nos tarifs transparents',
    faqs: [
      {
        question: 'Les prix sont-ils par passager ou par véhicule ?',
        answer: 'Tous nos tarifs sont pour le véhicule privatif complet dans la limite de sa capacité légale, jamais par personne.',
      },
      {
        question: 'Comment et quand s’effectue le paiement ?',
        answer: 'Aucun prépaiement ni carte bancaire requise. Vous réglez 100% en espèces au chauffeur à votre arrivée à destination (en SAR ou USD).',
      },
      {
        question: 'Que se passe-t-il en cas de retard de vol ?',
        answer: 'Nous suivons votre vol sur radar. Votre chauffeur s’adapte sans frais supplémentaires avec 60 minutes d’attente offertes.',
      },
      {
        question: 'Les péages et taxes sont-ils inclus ?',
        answer: 'Oui, tous les prix affichés sont nets et comprennent péages d’autoroute, carburant et taxes applicables.',
      },
    ],
  },

  es: {
    badge: 'Tarifas Transparentes • Precios Fijos Garantizados',
    heroTitle: 'Tarifas de Traslado VIP y Chófer Privado',
    heroSubtitle:
      'Precios fijos garantizados por vehículo sin costos ocultos. Pago 100% en efectivo a la llegada al hotel (en SAR o USD) sin depósito previo.',
    features: {
      cashOnArrival: {
        badge: 'Sin Anticipo',
        title: 'Pago en Efectivo al Llegar',
        description: 'Pague directamente a su chófer en efectivo (SAR o USD) tras llegar seguro a su hotel de destino.',
      },
      fixedPerVehicle: {
        badge: 'Precio Fijo Garantizado',
        title: 'Tarifa Por Vehículo Completo',
        description: 'El precio es por el vehículo completo, nunca por persona. Incluye todos los peajes de autopista e impuestos.',
      },
      flightTracking: {
        badge: 'Rastreo de Vuelos en Vivo',
        title: 'Bienvenida en Aeropuerto',
        description: 'Rastreo automático de su vuelo con 60 minutos de espera de cortesía incluidos tras el aterrizaje.',
      },
      vipAmenities: {
        badge: 'Hospitalidad Real',
        title: 'Flota Impecable y Chóferes Expertos',
        description: 'Vehículos climatizados, asistencia con equipaje y agua Zamzam, chóferes profesionales y discretos.',
      },
    },
    bespokeNotice: {
      title: 'Flota Presidencial Exclusiva (Mercedes-Maybach y Hyundai H1)',
      description:
        'Para personalidades y servicios diplomáticos a medida, Mercedes-Maybach y Hyundai H1 se cotizan directamente a través de nuestro Concierge en WhatsApp.',
      cta: 'Contactar al Concierge VIP en WhatsApp',
    },
    faqTitle: 'Preguntas Frecuentes sobre Tarifas y Pagos',
    faqSubtitle: 'Transparencia absoluta en cada trayecto sagrado',
    faqs: [
      {
        question: '¿Los precios son por persona o por vehículo?',
        answer: 'Todas las tarifas son por el vehículo privado completo según su capacidad homologada, nunca por pasajero individual.',
      },
      {
        question: '¿Cómo y cuándo se realiza el pago?',
        answer: 'Sin tarjeta de crédito ni depósito previo. El pago se efectúa 100% en efectivo al chófer al llegar a su hotel (en SAR o USD).',
      },
      {
        question: '¿Qué ocurre si mi vuelo se retrasa?',
        answer: 'Monitoreamos su vuelo por radar. El horario del chófer se recalcula automáticamente con 60 minutos de espera gratuita.',
      },
      {
        question: '¿Están incluidos los peajes e impuestos?',
        answer: 'Sí, todas las tarifas son finales e incluyen peajes de autopista, combustible e impuestos sin recargo adicional.',
      },
    ],
  },

  de: {
    badge: 'Transparente Tarife • Garantierte Festpreise',
    heroTitle: 'Feste Transfertarife für Duyuf Alrahman VIP',
    heroSubtitle:
      'Garantierte Festpreise pro Fahrzeug ohne versteckte Kosten. 100% Barzahlung bei Ankunft am Hotel (in SAR oder USD) ohne Vorauszahlung.',
    features: {
      cashOnArrival: {
        badge: 'Keine Anzahlung',
        title: 'Barzahlung bei Ankunft',
        description: 'Zahlen Sie direkt bar (in SAR oder USD) bei Ihrem Chauffeur nach sicherer Ankunft an Ihrem Hotel.',
      },
      fixedPerVehicle: {
        badge: 'Festpreisgarantie',
        title: 'Preis Pro Fahrzeug',
        description: 'Preise gelten für das gesamte Privatfahrzeug, niemals pro Person. Inklusive aller Autobahngebühren und Steuern.',
      },
      flightTracking: {
        badge: 'Flugradar-Tracking',
        title: 'Flughafenempfang & Wartezeit',
        description: 'Automatische Flugüberwachung mit 60 Minuten kostenloser Wartezeit ab tatsächlicher Landung.',
      },
      vipAmenities: {
        badge: 'Königliche Gastfreundschaft',
        title: 'Erstklassige Flotte & Chauffeure',
        description: 'Vorgekühlte Kabinen, umfassende Gepäckhilfe, Zamzam-Transport und erfahrene Chauffeure.',
      },
    },
    bespokeNotice: {
      title: 'Exklusive Luxusflotte (Mercedes-Maybach & Hyundai H1)',
      description:
        'Für Staatsgäste, Diplomaten und individuelle Wünsche stehen Mercedes-Maybach und Hyundai H1 über unseren WhatsApp-VIP-Concierge bereit.',
      cta: 'VIP-Concierge auf WhatsApp kontaktieren',
    },
    faqTitle: 'Häufig gestellte Fragen zu Preisen & Zahlung',
    faqSubtitle: 'Vollständige Transparenz für Ihre heilige Reise',
    faqs: [
      {
        question: 'Gelten die Preise pro Person oder pro Fahrzeug?',
        answer: 'Alle Tarife verstehen sich für das gesamte Fahrzeug bis zur maximalen Sitzplatzkapazität, niemals pro Person.',
      },
      {
        question: 'Wann und wie erfolgt die Bezahlung?',
        answer: 'Keine Vorauskasse oder Kreditkarte erforderlich. Die Bezahlung erfolgt zu 100% bar direkt beim Chauffeur bei Ankunft (SAR oder USD).',
      },
      {
        question: 'Was geschieht bei einer Flugverspätung?',
        answer: 'Wir verfolgen Ihren Flug live per Radar. Ihr Chauffeur passt sich kostenlos an und wartet bis zu 60 Minuten nach Landung.',
      },
      {
        question: 'Sind Autobahngebühren und Steuern im Preis enthalten?',
        answer: 'Ja, alle Preise sind Endpreise inklusive aller Mautgebühren, Treibstoff und Steuern ohne versteckte Aufschläge.',
      },
    ],
  },

  tr: {
    badge: 'Şeffaf Tarifeler • Sabit Fiyat Garantisi',
    heroTitle: 'Duyuf Alrahman VIP Transfer Fiyatları',
    heroSubtitle:
      'Gizli ücret olmadan araç başına garantili sabit fiyatlar. Ön ödeme veya kapora olmadan, otele varışta şoföre %100 nakit ödeme (SAR veya USD).',
    features: {
      cashOnArrival: {
        badge: 'Ön Ödemesiz',
        title: 'Varışta Nakit Ödeme',
        description: 'Otelinizin kapısına güvenle ulaştıktan sonra ücreti şoföre nakit olarak (SAR veya USD) elden ödeyin.',
      },
      fixedPerVehicle: {
        badge: 'Sabit Fiyat Garantisi',
        title: 'Araç Başına Net Fiyat',
        description: 'Fiyatlar kişi başı değil, tüm özel araç içindir. Otoyol geçiş ücretleri ve vergiler dahildir.',
      },
      flightTracking: {
        badge: 'Canlı Uçuş Radarı',
        title: 'Havalimanı Karşılama',
        description: 'Uçuşunuz canlı radardan takip edilir. İniş sonrasında 60 dakika ücretsiz bekleme süresi dahildir.',
      },
      vipAmenities: {
        badge: 'Kraliyet Konforu',
        title: 'Lüks Araçlar & Tecrübeli Şoförler',
        description: 'Önceden soğutulmuş klimalı araçlar, bagaj ve zemzem taşıma yardımı, Haremeyn yollarını iyi bilen şoförler.',
      },
    },
    bespokeNotice: {
      title: 'Özel Protokol Filosu (Mercedes-Maybach & Hyundai H1)',
      description:
        'Devlet heyetleri, özel misafirler ve VIP kafileler için Mercedes-Maybach ve Hyundai H1 araçlarımız WhatsApp Concierge hattımızdan kiralanır.',
      cta: 'WhatsApp VIP Concierge ile İletişime Geçin',
    },
    faqTitle: 'Fiyatlar ve Ödemeler Hakkında Sıkça Sorulan Sorular',
    faqSubtitle: 'Kutsal yolculuğunuzda tam şeffaflık ve güvenilir hizmet',
    faqs: [
      {
        question: 'Fiyatlar kişi başı mı yoksa araç başı mıdır?',
        answer: 'Tüm fiyatlarımız kişi başı değil, araç kapasitesine göre tahsis edilen özel aracın tamamı içindir.',
      },
      {
        question: 'Ödeme ne zaman ve nasıl yapılır?',
        answer: 'Kredi kartı veya ön ödeme gerekmez. Ödemenizi otelinize güvenle ulaştığınızda doğrudan şoföre nakit olarak yaparsınız (SAR veya USD).',
      },
      {
        question: 'Uçağım rötarlı inerse ne olur?',
        answer: 'Uçuşunuzu radardan canlı takip ediyoruz. Şoförünüz iniş saatine göre hazır olur ve 60 dakika ücretsiz bekleme süresi tanınır.',
      },
      {
        question: 'Otoyol geçiş ücretleri ve vergiler fiyata dahil midir?',
        answer: 'Evet, belirtilen tüm fiyatlar nihaidir ve otoyol gişeleri, yakıt ve vergiler fiyata tamamen dahildir.',
      },
    ],
  },

  hi: {
    badge: 'पारदर्शी दरें • निश्चित मूल्य गारंटी',
    heroTitle: 'दुयूफ़ अल-रहमान वीआईपी ट्रांसफर दरें',
    heroSubtitle:
      'बिना किसी छिपे शुल्क के प्रति वाहन निश्चित दरें। गंतव्य होटल पहुँचने के बाद ड्राइवर को 100% नकद भुगतान (सऊदी रियाल या अमेरिकी डॉलर) बिना किसी अग्रिम जमा के।',
    features: {
      cashOnArrival: {
        badge: 'कोई अग्रिम भुगतान नहीं',
        title: 'आगमन पर 100% नकद भुगतान',
        description: 'होटल पर सुरक्षित पहुंचने के बाद ड्राइवर को सीधे नकद (रियाल या डॉलर में) भुगतान करें। कोई एडवांस नहीं।',
      },
      fixedPerVehicle: {
        badge: 'निश्चित किराया गारंटी',
        title: 'किराया प्रति वाहन',
        description: 'सभी दरें पूरे वाहन के लिए हैं, प्रति व्यक्ति नहीं। सभी हाईवे टोल और टैक्स पहले से शामिल हैं।',
      },
      flightTracking: {
        badge: 'लाइव फ्लाइट रडार ट्रैकिंग',
        title: 'हवाई अड्डे पर स्वागत व मुफ्त प्रतीक्षा',
        description: 'उड़ान में देरी होने पर समय का स्वचालित समायोजन और विमान उतरने के बाद 60 मिनट की मानार्थ प्रतीक्षा शामिल है।',
      },
      vipAmenities: {
        badge: 'शाही आतिथ्य',
        title: 'उत्कृष्ट गाड़ियाँ व कुशल ड्राइवर',
        description: 'पूर्व-वातानुकूलित केबिन, सामान व ज़मज़म ले जाने में पूरी सहायता, और हरमैन शरीफ़ैन के अनुभवी ड्राइवर।',
      },
    },
    bespokeNotice: {
      title: 'विशेष वीआईपी गाड़ियाँ (मर्सिडीज-मेबैक और हुंडई H1)',
      description:
        'वीआईपी मेहमानों और विशेष प्रतिनिधिमंडलों के लिए मर्सिडीज-मेबैक और हुंडई H1 हमारे व्हाट्सएप कंसीयज के माध्यम से उपलब्ध हैं।',
      cta: 'व्हाट्सएप पर वीआईपी कंसीयज से संपर्क करें',
    },
    faqTitle: 'मूल्य निर्धारण और भुगतान से संबंधित अक्सर पूछे जाने वाले प्रश्न',
    faqSubtitle: 'हमारी पारदर्शी सेवा के बारे में संपूर्ण जानकारी',
    faqs: [
      {
        question: 'क्या किराया प्रति व्यक्ति है या पूरे वाहन का?',
        answer: 'सभी दरें वाहन की क्षमता के अनुसार पूरे वाहन के लिए हैं, प्रति व्यक्ति या प्रति सीट नहीं।',
      },
      {
        question: 'भुगतान कब और कैसे करना है?',
        answer: 'किसी अग्रिम राशि या क्रेडिट कार्ड की आवश्यकता नहीं है। होटल पहुँचने पर ड्राइवर को सीधे 100% नकद भुगतान किया जाता है।',
      },
      {
        question: 'यदि मेरी उड़ान में देरी हो जाए तो क्या होगा?',
        answer: 'हम फ्लाइट रडार से आपकी उड़ान पर नज़र रखते हैं। लैंडिंग के बाद 60 मिनट की मुफ्त प्रतीक्षा सुविधा उपलब्ध है।',
      },
      {
        question: 'क्या हाईवे टोल और टैक्स किराए में शामिल हैं?',
        answer: 'हाँ, सभी दरें अंतिम हैं और इनमें हाईवे टोल, पार्किंग और टैक्स शामिल हैं, कोई छुपा हुआ शुल्क नहीं है।',
      },
    ],
  },
};
