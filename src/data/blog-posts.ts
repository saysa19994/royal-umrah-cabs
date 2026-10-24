import { Locale } from '@/i18n/config';

export interface BlogPost {
  slug: string;
  title: Partial<Record<Locale, string>> & { ar: string; en: string };
  seoTitle: Partial<Record<Locale, string>> & { ar: string; en: string };
  metaDescription: Partial<Record<Locale, string>> & { ar: string; en: string };
  primaryKeyword: string;
  supportingKeywords: string[];
  featuredImage: string;
  imageAlt: Partial<Record<Locale, string>> & { ar: string };
  category: Partial<Record<Locale, string>> & { ar: string; en: string };
  publishedAt: string;
  updatedAt: string;
  readTime: Partial<Record<Locale, string>> & { ar: string; en: string };
  author: Partial<Record<Locale, string>> & { ar: string; en: string };
  excerpt: Partial<Record<Locale, string>> & { ar: string; en: string };
  faqs: {
    question: Partial<Record<Locale, string>> & { ar: string; en: string };
    answer: Partial<Record<Locale, string>> & { ar: string; en: string };
  }[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'vip-umrah-transport-jeddah-to-makkah',
    title: {
      ar: 'دليل اختيار سيارة VIP من مطار جدة إلى مكة المكرمة لضيوف الرحمن',
      en: 'VIP Umrah Transport from Jeddah Airport to Makkah: Complete Chauffeur Guide',
      ms: 'Panduan Pengangkutan VIP Umrah dari Lapangan Terbang Jeddah ke Makkah',
      id: 'Panduan Transportasi VIP Umrah dari Bandara Jeddah ke Makkah',
      fr: 'Transport VIP Omra de l’Aéroport de Djeddah à La Mecque : Guide Complet',
      es: 'Transporte VIP para Umrah del Aeropuerto de Yeda a La Meca: Guía Completa',
      de: 'VIP-Umrah-Transport vom Flughafen Dschidda nach Mekka: Umfassender Chauffeur-Leitfaden',
      hi: 'जेद्दा हवाई अड्डे से मक्का तक वीआईपी उमरा परिवहन: संपूर्ण गाइड',
      ur: 'جدہ ایئرپورٹ سے مکہ مکرمہ وی آئی پی ٹرانسپورٹ: مکمل گائیڈ برائے زائرین',
      tr: 'Cidde Havalimanı’ndan Mekke’ye VIP Umre Transferi: Kapsamlı Rehber',
    },
    seoTitle: {
      ar: 'نقل VIP لضيوف الرحمن | سيارة من مطار جدة إلى مكة',
      en: 'VIP Umrah Chauffeur Transport | Jeddah Airport to Makkah Cars',
      ms: 'Pengangkutan VIP Umrah | Kereta Lapangan Terbang Jeddah ke Makkah',
      id: 'Transportasi VIP Umrah | Mobil Bandara Jeddah ke Makkah',
      fr: 'Transport VIP Omra | Chauffeur Privé Djeddah - La Mecque',
      es: 'Transporte VIP Umrah | Chofer Privado de Yeda a La Meca',
      de: 'VIP-Umrah-Transport | Chauffeur Dschidda Flughafen nach Mekka',
      hi: 'वीआईपी उमरा परिवहन | जेद्दा हवाई अड्डा से मक्का कार',
      ur: 'وی آئی پی ٹرانسپورٹ برائے زائرین | جدہ ایئرپورٹ تا مکہ مکرمہ',
      tr: 'VIP Umre Transferi | Cidde Havalimanı - Mekke Özel Şoför',
    },
    metaDescription: {
      ar: 'احجز نقل VIP لضيوف الرحمن بسيارات حديثة وسائق خاص، مع أسعار ثابتة وخيارات استقبال من مطار جدة إلى مكة المكرمة.',
      en: 'Book premium VIP Umrah transport with private chauffeurs, fixed transparent fares, and complimentary flight-tracked meet & greet from Jeddah Airport to Makkah.',
      ms: 'Tempah pengangkutan VIP Umrah dengan pemandu peribadi, kadar tetap telus, dan sambutan ketibaan percuma dari Lapangan Terbang Jeddah ke Makkah.',
      id: 'Pesan transportasi VIP Umrah dengan sopir pribadi, tarif tetap transparan, dan penjemputan bandara gratis dari Bandara Jeddah ke Makkah.',
      fr: 'Réservez un transport VIP pour la Omra avec chauffeur privé, tarifs fixes et accueil personnalisé de l’aéroport de Djeddah à La Mecque.',
      es: 'Reserve transporte VIP para Umrah con chofer privado, tarifas fijas y recepción personalizada desde el aeropuerto de Yeda hasta La Meca.',
      de: 'Buchen Sie VIP-Umrah-Transport mit privatem Chauffeur, garantierten Festpreisen und kostenlosem Empfang am Flughafen Dschidda nach Mekka.',
      hi: 'जेद्दा हवाई अड्डे से मक्का तक निजी ड्राइवर, निश्चित दरों और निःशुल्क स्वागत के साथ प्रीमियम वीआईपी उमरा परिवहन बुक करें।',
      ur: 'جدہ ایئرپورٹ سے مکہ مکرمہ کے لیے پرائیویٹ کار اور ڈرائیور کے ساتھ معیاری وی آئی پی ٹرانسپورٹ فکس ریٹس اور فری استقبالیہ کے ساتھ بک کریں۔',
      tr: 'Cidde Havalimanı’ndan Mekke’ye özel şoförlü, sabit fiyatlı ve ücretsiz karşılamalı VIP umre transferinizi ayırtın.',
    },
    primaryKeyword: 'نقل VIP لضيوف الرحمن',
    supportingKeywords: [
      'نقل من مطار جدة إلى مكة',
      'سيارة VIP إلى مكة',
      'توصيل من جدة إلى مكة',
      'سائق خاص في مكة',
      'استقبال مطار جدة',
      'نقل المعتمرين',
      'سيارات فاخرة مع سائق',
      'حجز سيارة من المطار',
      'النقل بين مكة والمدينة',
      'خدمات النقل الفاخر في السعودية',
    ],
    featuredImage: '/assets/images/vip-umrah-transport-jeddah-to-makkah.jpg',
    imageAlt: {
      ar: 'سيارة VIP لنقل ضيوف الرحمن من مطار جدة إلى مكة المكرمة',
      en: 'VIP Umrah chauffeur vehicle receiving pilgrims at Jeddah Airport terminal',
      ms: 'Kenderaan VIP Umrah menyambut jemaah di Lapangan Terbang Jeddah',
      id: 'Kendaraan VIP Umrah menjemput jemaah di Bandara Jeddah',
      fr: 'Véhicule VIP Omra accueillant les pèlerins à l’aéroport de Djeddah',
      es: 'Vehículo VIP para Umrah recibiendo a los peregrinos en el aeropuerto de Yeda',
      de: 'VIP-Umrah-Fahrzeug empfängt Pilger am Terminal des Flughafens Dschidda',
      hi: 'जेद्दा हवाई अड्डे पर तीर्थयात्रियों का स्वागत करती वीआईपी उमरा गाड़ी',
      ur: 'جدہ ایئرپورٹ پر زائرین کے استقبال کے لیے تیار وی آئی پی گاڑی',
      tr: 'Cidde Havalimanı terminalinde hacıları karşılayan VIP umre aracı',
    },
    category: {
      ar: 'نقل المعتمرين VIP',
      en: 'VIP Umrah Transport',
      ms: 'Pengangkutan VIP Umrah',
      id: 'Transportasi VIP Umrah',
      fr: 'Transport VIP Omra',
      es: 'Transporte VIP Umrah',
      de: 'VIP-Umrah-Transport',
      hi: 'वीआईपी उमरा परिवहन',
      ur: 'وی آئی پی ٹرانسپورٹ',
      tr: 'VIP Umre Transferi',
    },
    publishedAt: '2026-10-24T20:00:00.000Z',
    updatedAt: '2026-10-24T20:00:00.000Z',
    readTime: {
      ar: '8 دقائق للقراءة',
      en: '8 min read',
      ms: '8 minit bacaan',
      id: '8 menit membaca',
      fr: '8 min de lecture',
      es: '8 min de lectura',
      de: '8 Min. Lesezeit',
      hi: '8 मिनट का समय',
      ur: '8 منٹ کا مطالعہ',
      tr: '8 dk okuma süresi',
    },
    author: {
      ar: 'فريق ضيوف الرحمن VIP',
      en: 'Duyuf Alrahman VIP Editorial Team',
      ms: 'Pasukan Editorial Duyuf Alrahman VIP',
      id: 'Tim Redaksi Duyuf Alrahman VIP',
      fr: 'Équipe Éditoriale Duyuf Alrahman VIP',
      es: 'Equipo Editorial Duyuf Alrahman VIP',
      de: 'Duyuf Alrahman VIP Redaktionsteam',
      hi: 'ज़ुयूफ़ अर-रहमान वीआईपी टीम',
      ur: 'ضیوف الرحمن وی آئی پی ٹیم',
      tr: 'Duyuf Alrahman VIP Editör Ekibi',
    },
    excerpt: {
      ar: 'دليل شامل لاختيار أفضل سيارة خاصة مع سائق من مطار الملك عبدالعزيز بجدة إلى فنادق مكة المكرمة: معايير الراحة، سعة الأمتعة للعائلات، وتأكيد الأسعار الثابتة بدون رسوم خفية.',
      en: 'A comprehensive guide to choosing the best private chauffeur vehicle from King Abdulaziz International Airport in Jeddah to Makkah hotels: comfort standards, family luggage capacity, and guaranteed fixed pricing.',
      ms: 'Panduan lengkap memilih kenderaan sewa peribadi dengan pemandu dari Lapangan Terbang Jeddah ke hotel Makkah: piawaian keselesaan dan kapasiti bagasi.',
      id: 'Panduan komprehensif memilih mobil pribadi dengan sopir dari Bandara Jeddah ke hotel Makkah: standar kenyamanan dan kapasitas bagasi keluarga.',
      fr: 'Guide complet pour choisir le meilleur véhicule avec chauffeur privé de l’aéroport de Djeddah aux hôtels de La Mecque.',
      es: 'Guía completa para elegir el mejor vehículo con chofer privado desde el aeropuerto de Yeda hasta los hoteles de La Meca.',
      de: 'Ein umfassender Leitfaden zur Auswahl des besten Chauffeurfahrzeugs vom Flughafen Dschidda zu den Hotels in Mekka.',
      hi: 'जेद्दा हवाई अड्डे से मक्का होटल तक सर्वश्रेष्ठ निजी वाहन चुनने की संपूर्ण मार्गदर्शिका।',
      ur: 'جدہ ایئرپورٹ سے مکہ مکرمہ کے ہوٹلوں تک پرائیویٹ کار اور ڈرائیور کے انتخاب کا جامع معلوماتی گائیڈ۔',
      tr: 'Cidde Havalimanı’ndan Mekke otellerine en uygun özel şoförlü aracı seçmek için kapsamlı rehber.',
    },
    faqs: [
      {
        question: {
          ar: 'كيف أحجز سيارة VIP من مطار جدة إلى مكة؟',
          en: 'How do I book a VIP car from Jeddah Airport to Makkah?',
        },
        answer: {
          ar: 'ابدأ بتحديد موعد الوصول والوجهة وعدد الركاب والأمتعة، ثم اختر فئة السيارة المناسبة. راجع السعر والخدمات المشمولة، وأكمل الحجز من خلال موقع مقدم الخدمة بعد التأكد من استلام التأكيد الفوري.',
          en: 'Select your arrival schedule, destination hotel, headcount, and luggage volume, then pick your vehicle class. Review the all-inclusive fare and complete your reservation with instant confirmation.',
        },
      },
      {
        question: {
          ar: 'هل يمكن حجز سيارة خاصة للعائلة؟',
          en: 'Can I book a 100% private vehicle exclusively for my family?',
        },
        answer: {
          ar: 'نعم بالتأكيد؛ يمكنك طلب مركبة عائلية مخصصة بالكامل لأسرتك (مثل هيونداي ستاريا VIP أو جي إم سي يوكون XL أو تويوتا هايس) دون أي مشاركة مع ركاب آخرين لضمان الراحة التامة والخصوصية.',
          en: 'Yes, absolutely. You can reserve vehicles dedicated exclusively to your family (such as Hyundai Staria VIP, GMC Yukon XL, or Toyota HiAce) with zero ride sharing for ultimate privacy.',
        },
      },
      {
        question: {
          ar: 'هل السعر الثابت يعني عدم وجود أي رسوم إضافية؟',
          en: 'Does fixed pricing mean there are truly zero hidden fees?',
        },
        answer: {
          ar: 'نعم؛ مع ضيوف الرحمن VIP يشمل السعر المعلن الوقود، ورسوم طريق الحرمين السريع، ومواقف صالات المطار، والضرائب، مع 60 دقيقة انتظار مجانية بعد الهبوط دون أي زيادة مفاجئة.',
          en: 'Yes. With Duyuf Alrahman VIP, the authoritative price covers fuel, expressway tolls, airport parking, and VAT, plus 60 minutes of complimentary flight-tracked waiting.',
        },
      },
      {
        question: {
          ar: 'هل أستطيع حجز سيارة من مكة إلى المدينة المنورة؟',
          en: 'Can I book private intercity transfers from Makkah to Madinah?',
        },
        answer: {
          ar: 'نعم؛ نوفر تنقلات مباشرة بين مكة المكرمة والمدينة المنورة من الباب إلى الباب مع إمكانية التوقف المجاني في ميقات ذو الحليفة (آبار علي) للإحرام والصلاة دون أي تكلفة إضافية.',
          en: 'Yes, we provide door-to-door private transfers between Makkah and Madinah with a complimentary stopover at Dhul Hulayfah (Bir Ali Miqat) for Ihram and prayer.',
        },
      },
      {
        question: {
          ar: 'متى يُفضَّل حجز النقل من المطار؟',
          en: 'When is the best time to reserve airport transport?',
        },
        answer: {
          ar: 'يُفضَّل ترتيب النقل مسبقاً قبل السفر بأيام لضمان تخصيص السيارة الفاخرة وسائقك المفضل، ومتابعة رقم رحلتك الجوية تلقائياً بالرادار الدولي ليكون في انتظارك فور وصولك.',
          en: 'It is strongly recommended to book a few days prior to flight departure to guarantee your preferred VIP vehicle and allow automated flight tracking for a seamless meet & greet.',
        },
      },
    ],
  },
];
