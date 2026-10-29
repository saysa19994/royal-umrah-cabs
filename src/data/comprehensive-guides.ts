import { Locale } from '@/i18n/config';

export function loc(
  ar: string,
  en: string,
  overrides?: Partial<Record<Locale, string>>
): Record<Locale, string> {
  return {
    ar,
    en,
    ms: overrides?.ms || en,
    id: overrides?.id || en,
    fr: overrides?.fr || en,
    es: overrides?.es || en,
    de: overrides?.de || en,
    hi: overrides?.hi || en,
    ur: overrides?.ur || ar,
    tr: overrides?.tr || en,
    ...overrides,
  };
}

export interface GuideSection {
  heading: Record<Locale, string>;
  body: Record<Locale, string>;
  highlight?: Record<Locale, string>;
}

export interface GuideItem {
  slug: string;
  category: 'airport' | 'transit' | 'pricing' | 'family' | 'ziyarat' | 'vehicle';
  categoryLabel: Record<Locale, string>;
  title: Record<Locale, string>;
  subtitle: Record<Locale, string>;
  summary: Record<Locale, string>;
  distanceKm?: number;
  travelTime: Record<Locale, string>;
  routeId: string;
  readTime: string;
  updatedDate: string;
  sections: GuideSection[];
  comparisonTable?: {
    headers: Record<Locale, string>[];
    rows: {
      feature: Record<Locale, string>;
      privateTaxi: Record<Locale, string>;
      haramainTrain: Record<Locale, string>;
      saptcoBus: Record<Locale, string>;
    }[];
  };
  faqs: {
    q: Record<Locale, string>;
    a: Record<Locale, string>;
  }[];
}

export const COMPREHENSIVE_GUIDES: GuideItem[] = [
  // 1. Jeddah Airport to Makkah: Taxi vs Train
  {
    slug: 'jeddah-airport-to-makkah-taxi-vs-train',
    category: 'transit',
    categoryLabel: loc('مقارنة وسائل النقل', 'Transit Comparison', {
      ms: 'Perbandingan Pengangkutan',
      id: 'Perbandingan Transportasi',
      ur: 'ٹرانسپورٹ موازنہ',
    }),
    title: loc(
      'من مطار جدة إلى مكة المكرمة: التاكسي الخاص أم قطار الحرمين السريع؟',
      'Jeddah Airport to Makkah: Private Taxi vs Haramain High-Speed Train (2026)',
      {
        ms: 'Lapangan Terbang Jeddah ke Makkah: Teksi Peribadi vs Kereta Api Haramain',
        id: 'Bandara Jeddah ke Makkah: Taksi Pribadi vs Kereta Cepat Haramain',
        ur: 'جدہ ایئرپورٹ سے مکہ مکرمہ: پرائیویٹ ٹیکسی یا حرمین ٹرین؟',
      }
    ),
    subtitle: loc(
      'مقارنة عملية شاملة في التكلفة الإجمالية للعائلة، وسعة الأمتعة، وراحة التوصيل المباشر حتى باب فندقك.',
      'Comprehensive breakdown of total family costs, luggage limits, and direct terminal-to-hotel convenience.',
      {
        ms: 'Analisis kos keluarga, had bagasi, dan keselesaan penghantaran terus ke hotel.',
        id: 'Analisis biaya keluarga, batasan bagasi, dan kenyamanan antar langsung ke hotel.',
        ur: 'خاندانی اخراجات، سامان کی گنجائش اور براہ راست ہوٹل تک پہنچنے کا تفصیلی موازنہ۔',
      }
    ),
    summary: loc(
      'الخلاصة السريعة: إذا كنت مسافراً بمفردك بحقيبة يد صغيرة، فقد يكون قطار الحرمين خياراً سريعاً. أما للعائلات والمجموعات مع حقائب سفر، فإن التاكسي الخاص بالسائق يوفر نقلاً مباشراً من بوابة الصالة إلى فندق مكة بدون الحاجة لتاكسي إضافي من وإلى المحطات، وبسعر إجمالي أقل لكل فرد.',
      'Quick Answer: For solo travelers with single cabin bags, the Haramain Train is fast. However, for families and groups with suitcases, a private chauffeur transfer provides direct door-to-door convenience from KAIA arrivals to your Makkah hotel, eliminating station transfers and proving significantly more economical per passenger.',
      {
        ms: 'Jawapan Pantas: Untuk jemaah solo dengan beg kecil, kereta api pantas. Tetapi untuk keluarga dengan bagasi besar, kenderaan sewa khas terus ke hotel lebih jimat dan mudah tanpa perlu tukar teksi di stesen.',
        id: 'Jawaban Singkat: Untuk pelancong solo, kereta cepat efisien. Namun bagi keluarga dengan koper besar, sewa mobil pribadi langsung ke hotel jauh lebih hemat dan nyaman tanpa repot transit di stasiun.',
        ur: 'خلاصہ: خاندانوں اور زیادہ سامان والے معتمرین کے لیے پرائیویٹ کار بغیر کسی جھنجھٹ کے براہ راست ہوٹل تک سب سے سستی اور پرسکون رہتی ہے۔',
      }
    ),
    distanceKm: 95,
    travelTime: loc('60 إلى 75 دقيقة', '60–75 minutes', { ms: '60–75 minit', id: '60–75 menit', ur: '60 تا 75 منٹ' }),
    routeId: 'jeddah-airport-to-makkah',
    readTime: '6 min read',
    updatedDate: 'October 2026',
    sections: [
      {
        heading: loc('1. التوصيل من الباب إلى الباب مقابل محطة إلى محطة', '1. Door-to-Door vs Station-to-Station Convenience'),
        body: loc(
          'القطار يربط محطة مطار جدة بمحطة الرصيفة في مكة. من محطة الرصيفة ستحتاج إلى تاكسي إضافي للوصول لفندقك في المركزية. التاكسي الخاص يستقبلك من بوابة الصالة ويوصلك مباشرة لمدخل فندقك.',
          'The Haramain Train operates between KAIA Airport Station and Makkah Rusaifah Station. From Rusaifah, you still require a local taxi or shuttle to reach your hotel. A private chauffeur picks you up at the terminal gate and delivers you straight to your hotel lobby.'
        ),
        highlight: loc('التاكسي الخاص يجنبك سحب الحقائب وركوب سيارتين منفصلتين.', 'Private chauffeur eliminates multiple vehicle transfers and heavy luggage handling.'),
      },
      {
        heading: loc('2. مقارنة التكلفة الحقيقية للعائلات (4 ركاب فأكثر)', '2. Total Cost Analysis for Families (4+ Passengers)'),
        body: loc(
          'تذكرة القطار الاقتصادية تكلف حوالي 60-70 ريال للشخص (240-280 ريال لأربعة أفراد)، يضاف إليها 50-80 ريال لتاكسي الرصيفة إلى الحرم، ليصبح الإجمالي 290-360 ريال. سيارة خاصة مثل هيونداي ستاريا VIP أو كامري تكلف سعراً ثابتاً للمجموعة كلها مع راحة تامة.',
          'Train tickets run ~60–70 SAR per adult (240–280 SAR for 4), plus 50–80 SAR for a local taxi from Rusaifah station into central Makkah, totaling 290–360+ SAR. A private sedan or VIP Staria costs a single fixed rate for the entire family with zero luggage hassle.'
        ),
      },
    ],
    comparisonTable: {
      headers: [
        loc('المعيار', 'Feature', { ms: 'Ciri', id: 'Fitur', ur: 'خصوصیت' }),
        loc('السائق الخاص (Duyuf Alrahman VIP)', 'Private Chauffeur', { ms: 'Pemandu Khas', id: 'Sopir Pribadi', ur: 'پرائیویٹ ڈرائیور' }),
        loc('قطار الحرمين السريع', 'Haramain Train', { ms: 'Kereta Api Haramain', id: 'Kereta Cepat Haramain', ur: 'حرمین ٹرین' }),
        loc('حافلات النقل العام', 'Public Bus (SAPTCO)', { ms: 'Bas Awam', id: 'Bus Umum', ur: 'سرکاری بس' }),
      ],
      rows: [
        {
          feature: loc('نوع التوصيل', 'Pickup & Drop-off'),
          privateTaxi: loc('من بوابة المطار حتى باب فندقك بمكة', 'Door-to-door (Terminal to Hotel)'),
          haramainTrain: loc('من محطة المطار إلى محطة الرصيفة بمكة فقط', 'Station-to-station (Requires second taxi to hotel)'),
          saptcoBus: loc('من مواقف الحافلات إلى محطة كدي/جرول', 'Bus terminal to central stop'),
        },
        {
          feature: loc('سياسة الأمتعة', 'Luggage Allowance'),
          privateTaxi: loc('حقائب غير مقيدة حسب سعة السيارة المختارة', 'Generous capacity matching chosen vehicle'),
          haramainTrain: loc('حقيبة واحدة كبيرة (25 كجم) + حقيبة يد لكل راكب', 'Strict limit: 1 large suitcase (25kg) + 1 cabin bag'),
          saptcoBus: loc('حقيبتان قياسيتان لكل راكب', '2 standard bags per passenger'),
        },
        {
          feature: loc('مواعيد الانتظار والجدول', 'Schedule Flexibility'),
          privateTaxi: loc('متاح 24/7 مع تتبع الرحلات وانتظار مجاني 90 دقيقة', 'Available 24/7, live flight tracking, 90-min free wait'),
          haramainTrain: loc('مواعيد محددة (قد تنتظر ساعتين إذا تأخرت طائرتك)', 'Fixed departure times (missed train if flight delays)'),
          saptcoBus: loc('انطلاق كل ساعة أو ساعتين حسب الجدول', 'Hourly or bi-hourly departures'),
        },
      ],
    },
    faqs: [
      {
        q: loc('هل السائق ينتظرني إذا تأخرت رحلة الطيران؟', 'Does the chauffeur wait if my flight is delayed?'),
        a: loc(
          'نعم، نتابع رقم رحلتك مباشرة عبر نظام الملاحة الجوية ونوفر 90 دقيقة انتظار مجانية تبدأ من لحظة هبوط الطائرة الفعلي.',
          'Yes. We monitor your flight live via international radar. Your booking includes 90 minutes of complimentary wait time after touchdown.'
        ),
      },
    ],
  },

  // 2. Makkah to Madinah: Taxi vs Haramain Train
  {
    slug: 'makkah-to-madinah-taxi-vs-haramain-train',
    category: 'transit',
    categoryLabel: loc('مقارنة وسائل النقل', 'Transit Comparison'),
    title: loc(
      'مقارنة السفر بين مكة والمدينة: السيارة الخاصة أم قطار الحرمين؟',
      'Makkah to Madinah: Private Chauffeur vs Haramain Train (2026 Guide)'
    ),
    subtitle: loc(
      'تحليل التكلفة الحقيقية للعائلات، التوقف بميقات آبار علي، والراحة المباشرة بين الفنادق.',
      'Comprehensive comparison of door-to-door transit, Miqat stops at Bir Ali, and family luggage freedom.'
    ),
    summary: loc(
      'الخلاصة: قطار الحرمين سريع جداً (ساعتان و20 دقيقة بين المحطتين)، لكنه يتطلب حجزاً مسبقاً وتذاكر منفصلة وتقييداً صارماً بوزن وحجم الأمتعة. التاكسي الخاص يمنحك التوصيل المباشر بين أبواب الفندقين مع التوقف مجاناً في ميقات آبار علي للإحرام والصلاة دون قلق من موعد القطار.',
      'Summary: The Haramain Train is exceptionally fast (2h20m station-to-station) but enforces strict 1-bag limits and requires station taxis on both ends. A private chauffeur provides direct hotel-to-hotel transit with an included stop at Bir Ali Miqat for Ihram and prayer.'
    ),
    distanceKm: 440,
    travelTime: loc('4 إلى 4.5 ساعات', '4–4.5 hours'),
    routeId: 'makkah-to-madinah',
    readTime: '7 min read',
    updatedDate: 'October 2026',
    sections: [
      {
        heading: loc('1. التوقف بميقات ذو الحليفة (آبار علي)', '1. Stop at Bir Ali Miqat (Dhul Hulayfah)'),
        body: loc(
          'للمعتمرين المتوجهين من المدينة إلى مكة، التوقف بميقات آبار علي واجب للإحرام. القطار يمر بالميقات بسرعة ولا يتوقف فيه للنزول. سيارتنا الخاصة تتوقف لك في الميقات مع انتظار كامل حتى تفرغ من الاغتسال والإحرام وركعتي الإحرام براحة.',
          'For pilgrims traveling toward Makkah, stopping at the designated Miqat is an essential religious requirement. The train passes through without stopping for disembarkation. With our private chauffeur, a full stop at Bir Ali Miqat is included.'
        ),
      },
    ],
    comparisonTable: {
      headers: [
        loc('المقارنة', 'Aspect'),
        loc('سيارة خاصة VIP', 'Private VIP Vehicle'),
        loc('قطار الحرمين السريع', 'Haramain Train'),
        loc('حافلة سابتكو VIP', 'SAPTCO VIP Bus'),
      ],
      rows: [
        {
          feature: loc('التوقف بالميقات', 'Miqat Stopover'),
          privateTaxi: loc('توقف بميقات آبار علي للإحرام', 'Dedicated stop at Miqat Bir Ali for Ihram'),
          haramainTrain: loc('لا يتوقف (الإحرام في القطار أثناء الحركة فقط)', 'No station stop (Ihram while moving on board)'),
          saptcoBus: loc('توقف سريع محدد بالجدول', 'Quick scheduled stop'),
        },
        {
          feature: loc('سعة الأمتعة وماء زمزم', 'Luggage & Zamzam'),
          privateTaxi: loc('تتسع لكافة الحقائب ومياه زمزم دون وزن زائد', 'Ample boot space for luggage and Zamzam water'),
          haramainTrain: loc('حقيبة واحدة فقط لكل راكب بوزن 25 كجم كحد أقصى', 'Strictly 1 large bag (25kg max) per passenger'),
          saptcoBus: loc('حقيبتان لكل راكب', '2 standard bags per passenger'),
        },
      ],
    },
    faqs: [
      {
        q: loc('هل يشمل السعر التوقف في ميقات آبار علي؟', 'Is the Miqat stop at Bir Ali included in the fare?'),
        a: loc('نعم، التوقف في الميقات مشمول تلقائياً لجميع رحلات مكة والمدينة بدون أي رسوم إضافية.', 'Yes, our chauffeur will stop at Bir Ali Miqat with ample waiting time at no extra charge.'),
      },
    ],
  },

  // 3. Umrah Taxi Prices: Routes and Vehicle Types
  {
    slug: 'umrah-taxi-prices-routes-vehicles',
    category: 'pricing',
    categoryLabel: loc('دليل الأسعار', 'Fare Guide'),
    title: loc(
      'أسعار تاكسي العمرة 2026: دليل المسارات والسيارات الشامل',
      'Umrah Taxi Prices 2026: Complete Routes & Vehicle Pricing Guide'
    ),
    subtitle: loc(
      'شفافية مطلقة في الأسعار الثابتة لكل مسار وسيارة بدون رسوم خفية أو زيادات وقت الذروة.',
      'Authoritative transparent pricing across all Saudi routes. No surge pricing, no hidden baggage fees.'
    ),
    summary: loc(
      'جميع أسعار Duyuf Alrahman VIP محددة مسبقاً وتغطي السيارة بالكامل مع السائق والوقود ورسوم الطرق وضريبة القيمة المضافة. السعر ثابت سواء كان نهاراً أو ليلاً أو في مواسم الذروة مثل رمضان ورجب.',
      'All Duyuf Alrahman VIP rates are 100% fixed per vehicle, not per person. Every fare includes private vehicle, professional driver, fuel, highway toll charges, and VAT with zero hidden extras.'
    ),
    travelTime: loc('دليل تسعير فوري', 'Instant Rate Guide'),
    routeId: 'jeddah-airport-to-makkah',
    readTime: '5 min read',
    updatedDate: 'October 2026',
    sections: [
      {
        heading: loc('كيف يتم تسعير رحلات العمرة؟', 'How Are Umrah Transfers Priced?'),
        body: loc(
          'يتم التسعير بناءً على نوع المركبة والمسار، وليس بالعداد أو بعدد الأشخاص. هذا يضمن أن العائلة تعرف التكلفة مسبقاً قبل السفر وتدفع عند الوصول بعد إتمام الخدمة بأمان.',
          'Fares are fixed per vehicle class and route, never calculated on a running meter or per-head formula. You know your exact total prior to traveling, with payment safely upon arrival.'
        ),
      },
    ],
    faqs: [
      {
        q: loc('هل هناك رسوم إضافية للحقائب أو أوقات الليل؟', 'Are there extra charges for luggage or late-night arrivals?'),
        a: loc('لا، السعر المتفق عليه نهائي وشامل لكل الأمتعة وأي وقت وصول على مدار 24 ساعة.', 'No. The quoted rate is completely all-inclusive with zero night surcharges or luggage fees.'),
      },
    ],
  },

  // 4. How to Choose the Right Vehicle for Your Umrah Group
  {
    slug: 'how-to-choose-the-right-vehicle-for-umrah-group',
    category: 'vehicle',
    categoryLabel: loc('دليل الأسطول', 'Vehicle Selection'),
    title: loc(
      'دليل اختيار السيارة المناسبة لعائلتك أو مجموعتك في العمرة',
      'How to Choose the Right Vehicle for Your Umrah Group (2026 Guide)'
    ),
    subtitle: loc(
      'مقارنة سعة الركاب والأمتعة بين كامري، وهيونداي ستاريا، وجي إم سي يوكون XL، وتويوتا هايس.',
      'Practical sizing guide matching your passenger headcount and suitcase volume with the right vehicle.'
    ),
    summary: loc(
      'قاعدة ذهبية: حقائب المعتمرين تتضاعف عند العودة بسبب ماء زمزم والهدايا. لعائلة مكونة من 4 أفراد مع حقائب كبيرة، ننصح بهيونداي ستاريا VIP بدلاً من السيدان، وللمجموعات من 6 فأكثر، فإن تويوتا هايس أو يوكون XL هما الخيار الأمثل.',
      'Golden Rule: Pilgrim luggage typically doubles on the return journey due to Zamzam water and gifts. For 4 passengers with large suitcases, we recommend the Hyundai Staria VIP over a sedan. For groups of 6 or more, the Toyota HiAce or GMC Yukon XL is ideal.'
    ),
    travelTime: loc('دليل سعة الأسطول', 'Fleet Capacity Guide'),
    routeId: 'jeddah-airport-to-makkah',
    readTime: '5 min read',
    updatedDate: 'October 2026',
    sections: [
      {
        heading: loc('توزيع الفئات حسب الركاب والحقائب', 'Vehicle Categories Breakdown'),
        body: loc(
          '1. تويوتا كامري: مثالية لشخصين أو 3 بحقيبتين كبيرتين.\n2. هيونداي ستاريا VIP: أنسب خيار للعائلات (4-6 ركاب مع 5 حقائب كبيرة).\n3. يوكون XL: للفخامة والمساحة الهائلة مع 7 ركاب و8 حقائب.\n4. تويوتا هايس: المجموعات والعائلات الكبيرة حتى 10 ركاب مع 10 حقائب.',
          '1. Toyota Camry: Perfect for 1–3 passengers with 2 standard suitcases.\n2. Hyundai Staria VIP: Ideal for families of 4–6 with 5–6 suitcases.\n3. GMC Yukon XL: Ultimate luxury and deep cargo for up to 7 VIPs with 8 bags.\n4. Toyota HiAce: Extended families and groups up to 10 with 10 suitcases.'
        ),
      },
    ],
    faqs: [
      {
        q: loc('هل المقاعد مناسبة لكبار السن ومستخدمي الكراسي المتحركة؟', 'Are vehicles suitable for elderly pilgrims and wheelchair users?'),
        a: loc('نعم، تتميز ستاريا وهايس بأبواب منزلقة عريضة وارتفاع مريح يسهل الصعود والنزول، مع مساحة كافية لتخزين الكرسي المتحرك.', 'Yes. The Staria and HiAce feature wide sliding doors and low step-in heights, easily accommodating folding wheelchairs.'),
      },
    ],
  },

  // 5. Madinah Airport to Your Hotel: Transport Guide
  {
    slug: 'madinah-airport-to-hotel-transport',
    category: 'airport',
    categoryLabel: loc('دليل المطار', 'Airport Guide'),
    title: loc(
      'دليل الوصول من مطار المدينة المنورة (MED) إلى فنادق المنطقة المركزية',
      'Madinah Airport (MED) to Central Hotel Transport Guide (2026)'
    ),
    subtitle: loc(
      'كل ما تحتاج معرفته عن استقبال مطار الأمير محمد بن عبدالعزيز والوصول للحرم النبوي الشريف.',
      'Terminal guide, driver meetup steps, and smooth hotel transfers near Al-Masjid an-Nabawi.'
    ),
    summary: loc(
      'يبعد مطار الأمير محمد بن عبدالعزيز حوالي 20-25 كم عن المسجد النبوي الشريف. يستقبلك سائقنا في صالة الوصول مع لوحة تحمل اسمك، ويتولى حمل أمتعتك ونقلك مباشرة إلى بوابة فندقك في المنطقة المركزية الشمالية أو الجنوبية أو الغربية.',
      'Prince Mohammad bin Abdulaziz Airport (MED) is located approximately 20–25 km from the Prophet\'s Mosque. Your dedicated chauffeur meets you inside the arrivals hall with a personalized name card and drives you directly to your hotel entrance.'
    ),
    distanceKm: 22,
    travelTime: loc('20 إلى 25 دقيقة', '20–25 minutes'),
    routeId: 'madinah-airport-to-hotel',
    readTime: '4 min read',
    updatedDate: 'October 2026',
    sections: [
      {
        heading: loc('خطوات الاستقبال في مطار المدينة', 'Arrival & Meetup Steps at Madinah Airport'),
        body: loc(
          '1. بعد استلام الحقائب، اخرج إلى صالة الاستقبال.\n2. ستجد سائقك بانتظارك حاملاً لوحة باسمك المكتوب في الحجز.\n3. يقوم السائق بمساعدتك في نقل الحقائب إلى السيارة والانطلاق مباشرة للفندق.',
          '1. Clear customs and collect your baggage.\n2. Exit into the international arrival lobby.\n3. Spot your driver displaying your name board.\n4. Relax as your luggage is loaded and enjoy a smooth 20-minute ride to your hotel.'
        ),
      },
    ],
    faqs: [
      {
        q: loc('هل الفنادق القريبة من الحرم النبوي سهلة الوصول بالسيارة؟', 'Can the vehicle reach hotels inside the central pedestrian zone?'),
        a: loc('سائقونا على دراية تامة بمداخل مواقف الفنادق المركزية ونقاط الإنزال المعتمدة للأمتعة بجوار ساحات الحرم.', 'Yes. Our experienced chauffeurs know all underground access rings and approved drop-off points surrounding the Prophet\'s Mosque.'),
      },
    ],
  },

  // 6. Jeddah Airport to Madinah: Routes and Transport Options
  {
    slug: 'jeddah-airport-to-madinah-transport-options',
    category: 'transit',
    categoryLabel: loc('مقارنة وسائل النقل', 'Transit Comparison'),
    title: loc(
      'من مطار جدة إلى المدينة المنورة مباشرة: خيارات النقل والمقارنة الشاملة',
      'Jeddah Airport directly to Madinah: Routes, Travel Times & Transport Options'
    ),
    subtitle: loc(
      'دليل السفر المباشر من مطار الملك عبدالعزيز بجدة إلى طيبة الطيبة دون المبيت في جدة.',
      'Comprehensive guide for pilgrims landing at Jeddah KAIA and transferring directly to Madinah.'
    ),
    summary: loc(
      'للمعتمرين الذين تبدأ رحلتهم بزيارة المدينة المنورة بعد الهبوط في جدة، تتوفر ثلاثة خيارات: السيارة الخاصة المباشرة (4.5 ساعات مريحة من صالة المطار لفندق المدينة)، قطار الحرمين، أو الطيران الداخلي. توفر السيارة الخاصة راحة لا تضاهى للعائلات مع الأمتعة الكثيرة.',
      'For pilgrims starting their pilgrimage in Madinah directly from KAIA Jeddah, private chauffeur transfer offers seamless terminal-to-hotel convenience over 420 km, eliminating train transfers or domestic flight layovers.'
    ),
    distanceKm: 420,
    travelTime: loc('4 إلى 4.5 ساعات', '4–4.5 hours'),
    routeId: 'jeddah-to-madinah',
    readTime: '6 min read',
    updatedDate: 'October 2026',
    sections: [
      {
        heading: loc('مزايا السيارة الخاصة لرحلة جدة - المدينة', 'Key Advantages of Private Chauffeur'),
        body: loc(
          'الرحلة تمتد لمسافة 420 كم على طريق الهجرة السريع الحديث. التوقف للاستراحة وتناول الطعام والصلاة يتم حسب رغبتك بالكامل دون الالتزام بمواعيد قطارات أو طائرات.',
          'Traveling via the modern Al Hijrah highway allows personalized rest stops at certified travel plazas for refreshments, dining, and prayers at your own family pace.'
        ),
      },
    ],
    faqs: [
      {
        q: loc('هل يمكن التوقف للاستراحة أو الصلاة أثناء الطريق؟', 'Can we stop for prayer and refreshments during the 400km journey?'),
        a: loc('نعم، يشمل المسار توقفات مريحة في أفضل الاستراحات ومحطات الوقود المجهزة على طريق الهجرة السريع.', 'Absolutely. Your chauffeur will gladly stop at clean highway service plazas for prayers and meals as requested.'),
      },
    ],
  },

  // 7. Makkah Ziyarat: Places, Routes and Transport
  {
    slug: 'makkah-ziyarat-places-routes-transport',
    category: 'ziyarat',
    categoryLabel: loc('أدلة المزارات', 'Ziyarat Guide'),
    title: loc(
      'مزارات مكة المكرمة: المعالم التاريخية، المسارات، وتنظيم وسيلة النقل',
      'Makkah Holy Sites Ziyarat: Historical Places, Tour Routes & Chauffeur Service'
    ),
    subtitle: loc(
      'دليل زيارة جبل ثور، غار حراء، منى، مزدلفة، عرفات، ومقبرة المعلاة بسيارة خاصة وسائق مخصص.',
      'Complete private tour guide of sacred and historical landmarks in Makkah with dedicated chauffeur waiting.'
    ),
    summary: loc(
      'جولة مزارات مكة تستغرق عادة من 3 إلى 4 ساعات تغطي أهم المعالم التاريخية والإسلامية. سائقنا الخاص يرافقك طوال الجولة وينتظرك عند كل معلم لالتقاط الصور والتدبر، مع تكييف كامل وراحة تامة لكبار السن.',
      'Our Makkah Ziyarat tour spans 3–4 hours covering Cave of Hira (Jabal al-Nour), Cave of Thawr, Mina, Muzdalifah, Mount Arafat, and Masjid Nimra. Your chauffeur waits patiently at each stop in an air-conditioned vehicle.'
    ),
    travelTime: loc('جولة 3 إلى 4 ساعات', '3–4 hours tour'),
    routeId: 'makkah-ziyarat',
    readTime: '6 min read',
    updatedDate: 'October 2026',
    sections: [
      {
        heading: loc('المعالم المشمولة في جولة مزارات مكة', 'Key Highlights Included in Makkah Ziyarat'),
        body: loc(
          '1. جبل ثور وغار ثور (معلم الهجرة النبوية الشريفة).\n2. جبل النور وغار حراء (مهبط الوحي الأول).\n3. مشاعر الحج المقدسة: منى، ومزدلفة، وجبل الرحمة في عرفات.\n4. مسجد نمرة ومسجد البيعة.',
          '1. Jabal Thawr (Cave of the Hijrah).\n2. Jabal al-Nour (Cave of Hira / First Revelation).\n3. Holy Hajj Pilgrimage Sites: Mina tent city, Muzdalifah, Mount of Mercy (Jabal al-Rahmah) at Arafat.\n4. Masjid Nimra and historic mosques.'
        ),
      },
    ],
    faqs: [
      {
        q: loc('ما هو أفضل وقت لبدء جولة المزارات في مكة؟', 'What is the best time of day for Makkah Ziyarat?'),
        a: loc('ننصح بالبدء بعد صلاة الفجر مباشرة أو في ساعات العصر لتفادي حرارة الشمس والازدحام.', 'We recommend starting right after Fajr prayer (around 6:30 AM) or mid-afternoon (around 4:00 PM) for optimal weather.'),
      },
    ],
  },

  // 8. Madinah Ziyarat: Planning Your Transport
  {
    slug: 'madinah-ziyarat-planning-transport',
    category: 'ziyarat',
    categoryLabel: loc('أدلة المزارات', 'Ziyarat Guide'),
    title: loc(
      'مزارات المدينة المنورة: التخطيط لجولة المعالم النبوية الشريفة',
      'Madinah Ziyarat: Planning Your Sacred Historical Tour (2026 Guide)'
    ),
    subtitle: loc(
      'مسجد قباء، جبل أحد ومقبرة الشهداء، مسجد القبلتين، وموقع غزوة الخندق بسيارة عائلية مكيفة.',
      'Private chauffeur tour to Masjid Quba, Mount Uhud, Martyrs Cemetery, Masjid al-Qiblatayn, and the Seven Mosques.'
    ),
    summary: loc(
      'زيارة معالم المدينة المنورة سنة مؤكدة؛ حيث قال النبي ﷺ: (من تطهر في بيته ثم أتى مسجد قباء فصلى فيه كان له كأجر عمرة). توفر خدمتنا سيارة خاصة ترافقك من باب فندقك وتنتظرك في قباء حتى تؤدي الصلاة، ثم تكمل بك إلى شهداء أحد وباقي المعالم براحة تامة.',
      'Touring sacred sites in the Radiant City holds profound spiritual meaning. A visit to Masjid Quba carries the reward of an Umrah. Our private vehicle picks you up from your hotel and waits comfortably at every site.'
    ),
    travelTime: loc('جولة 3 ساعات', '3 hours tour'),
    routeId: 'madinah-ziyarat',
    readTime: '5 min read',
    updatedDate: 'October 2026',
    sections: [
      {
        heading: loc('المعالم الرئيسية في زيارة المدينة', 'Core Stops in Madinah Ziyarat'),
        body: loc(
          '1. مسجد قباء (أول مسجد أسس في الإسلام - صلاة ركعتين).\n2. جبل أحد ومقبرة شهداء أحد وموقع الرماة.\n3. مسجد القبلتين (حيث تحولت القبلة نحو الكعبة المشرفة).\n4. المساجد السبعة وموقع غزوة الخندق.',
          '1. Masjid Quba (First mosque in Islam; Sunnah prayer).\n2. Mount Uhud, Archers\' Hill, and Uhud Martyrs\' Cemetery.\n3. Masjid al-Qiblatayn (The Mosque of the Two Qiblas).\n4. The Seven Mosques (The Trench Battle site).'
        ),
      },
    ],
    faqs: [
      {
        q: loc('كم تستغرق الجولة وهل السائق ينتظرنا داخل المساجد؟', 'How long is the tour and does the chauffeur wait while we pray?'),
        a: loc('تستغرق الجولة حوالي 3 ساعات، وينتظرك السائق في المواقف المخصصة عند كل معلم حتى تفرغ من الصلاة والزيارة تماماً.', 'The tour lasts ~3 hours. Your driver waits at designated parking spots at each site until you finish praying.'),
      },
    ],
  },

  // 9. Umrah Travel with Elderly Parents
  {
    slug: 'umrah-travel-with-elderly-parents',
    category: 'family',
    categoryLabel: loc('دليل العائلات', 'Family & Elderly'),
    title: loc(
      'دليل اصطحاب الوالدين وكبار السن في رحلة العمرة: الراحة والمواصلات',
      'Performing Umrah with Elderly Parents: Comfort, Wheelchairs & Transport Guide'
    ),
    subtitle: loc(
      'كيف تضمن رحلة ميسرة بدون مشقة: اختيار السيارة المناسبة، التوصيل لأقرب نقطة للحرم، وتجنب الزحام.',
      'Practical tips for a blessed and stress-free Umrah with elderly pilgrims, mobility needs, and accessible transport.'
    ),
    summary: loc(
      'أداء العمرة برفقة الوالدين وكبار السن يحتاج إلى عناية خاصة لتقليل المسافات المقطوعة سيراً وتفادي مشقة الانتقال بين المحطات. التاكسي الخاص يضمن توصيلاً مباشراً لأقرب نقطة مسموحة للفندق، مع سيارات واسعة مثل هيونداي ستاريا VIP التي تتميز بسهولة الركوب وسعة الكراسي المتحركة.',
      'Accompanying elderly parents or grandparents for Umrah is a high honor that demands thoughtful transport planning. Private chauffeur service delivers door-to-door comfort, minimizes walking distances, and easily accommodates folding wheelchairs.'
    ),
    travelTime: loc('دليل الراحة والتنقل', 'Comfort & Accessibility'),
    routeId: 'jeddah-airport-to-makkah',
    readTime: '6 min read',
    updatedDate: 'October 2026',
    sections: [
      {
        heading: loc('أهم النصائح لرحلة مريحة لكبار السن', 'Key Recommendations for Senior Comfort'),
        body: loc(
          '1. اختر سيارة بباب منزلق واسع وارتفاع منخفض مثل هيونداي ستاريا VIP.\n2. اطلب منسق الرحلة مسبقاً لتوفير مساحة للكرسي المتحرك.\n3. تفادي ساعات الذروة في الانتقال بين المدن لاختصار وقت الرحلة.\n4. احرص على تكييف لطيف غير حاد داخل المركبة.',
          '1. Choose vehicles with low step-in height and sliding doors like the Hyundai Staria.\n2. Inform us in advance regarding folding wheelchairs to ensure ample trunk storage.\n3. Schedule intercity transfers during off-peak morning or late evening hours.\n4. Request customized AC airflow for maximum comfort.'
        ),
      },
    ],
    faqs: [
      {
        q: loc('هل تتوفر مساحة كافية للكرسي المتحرك في سياراتكم؟', 'Is there space for a folding wheelchair in your vehicles?'),
        a: loc('نعم، جميع سياراتنا من فئة ستاريا وهايس ويوكون تستوعب الكراسي المتحركة بسهولة تامة إلى جانب الحقائب.', 'Yes, our Staria, HiAce, and Yukon XL vehicles easily accommodate folding wheelchairs alongside your luggage.'),
      },
    ],
  },

  // 10. Luggage and Vehicle Capacity for Umrah
  {
    slug: 'luggage-and-vehicle-capacity-for-umrah',
    category: 'vehicle',
    categoryLabel: loc('دليل الأمتعة', 'Luggage Guide'),
    title: loc(
      'سعة الأمتعة والحقائب في سيارات العمرة: دليلك لحساب الحجم بدقة',
      'Umrah Luggage & Vehicle Capacity Guide: Plan Your Suitcase Count Accurately'
    ),
    subtitle: loc(
      'جدول المقارنة بين حقائب اليد، والحقائب الكبيرة (28 بوصة)، ومياه زمزم لضمان سفر آمن ومريح.',
      'Detailed capacity breakdown for 28" check-in suitcases, cabin trolley bags, and 5L Zamzam bottles.'
    ),
    summary: loc(
      'خطأ شائع يقع فيه الكثير من المعتمرين هو حجز سيارة سيدان صغيرة لـ 4 ركاب مع 4 حقائب سفر ضخمة، مما يؤدي إلى عدم اتساع صندوق الأمتعة. هذا الدليل يوضح السعة الحقيقية لكل سيارة لتفادي أي إحراج عند المطار.',
      'A frequent challenge at Saudi airports is booking a standard sedan for 4 passengers with oversized 28" suitcases. This guide details exact luggage allowances for each vehicle model so your group travels with complete peace of mind.'
    ),
    travelTime: loc('دليل سعة الأمتعة', 'Luggage Dimension Guide'),
    routeId: 'jeddah-airport-to-makkah',
    readTime: '5 min read',
    updatedDate: 'October 2026',
    sections: [
      {
        heading: loc('جدول سعة الحقائب لأسطول رويال', 'Royal Fleet Luggage Dimensions'),
        body: loc(
          '• كامري سيدان: 2 حقيبة كبيرة (28 بوصة) + 2 حقيبة يد صغيرة.\n• هيونداي ستاريا VIP: 5 إلى 6 حقائب كبيرة + حقائب يد.\n• جي إم سي يوكون XL: 7 إلى 8 حقائب كبيرة + مساحة إضافية لمياه زمزم.\n• تويوتا هايس: 8 إلى 10 حقائب سفر قياسية.',
          '• Camry Sedan: 2 large 28" check-in bags + 2 cabin carry-ons.\n• Hyundai Staria VIP: 5–6 large check-in bags + personal backpacks.\n• GMC Yukon XL: 7–8 large check-in bags + ample Zamzam bottle room.\n• Toyota HiAce: 8–10 large suitcases with flexible rear cargo layout.'
        ),
      },
    ],
    faqs: [
      {
        q: loc('أين يمكن وضع عبوات ماء زمزم (5 لتر)؟', 'Where can 5-liter Zamzam bottles be stowed?'),
        a: loc('عبوات زمزم المعتمدة من المطار يتم وضعها بأمان في صندوق الأمتعة الخلفي في سياراتنا العائلية دون الضغط على الحقائب.', 'Factory-sealed 5L Zamzam bottles fit securely in our vans and SUVs alongside your luggage.'),
      },
    ],
  },

  // 11. Jeddah Airport Arrival: How to Arrange Your Pickup
  {
    slug: 'jeddah-airport-arrival-pickup-guide',
    category: 'airport',
    categoryLabel: loc('دليل المطار', 'Airport Arrival'),
    title: loc(
      'كيف ترتب استقبالك في مطار جدة (KAIA): الخطوات من لحظة الهبوط',
      'Jeddah Airport Arrival: How to Arrange Your Smooth Chauffeur Pickup (2026)'
    ),
    subtitle: loc(
      'دليل خطوة بخطوة: صالة 1 الجديدة مقابل الصالة الشمالية، شراء شريحة الاتصال، ومقابلة سائقك.',
      'Terminal 1 vs North Terminal, baggage claim, acquiring a local SIM card, and meeting your chauffeur smoothly.'
    ),
    summary: loc(
      'مطار الملك عبدالعزيز الدولي بجدة من أكبر مطارات المنطقة. لضمان استقبال هادئ وسلس، يقوم منسقنا بإرسال بيانات السائق ورقم لوحة المركبة عبر واتساب فور هبوط طائرتك، وينتظرك السائق عند بوابة الوصول حاملاً لوحة باسمك.',
      'King Abdulaziz International Airport (KAIA) is a premier modern hub. Our coordination team contacts you via WhatsApp the moment your flight touches down, sharing your driver’s details and meeting point instructions.'
    ),
    distanceKm: 95,
    travelTime: loc('60 إلى 75 دقيقة لمكة', '60–75 mins to Makkah'),
    routeId: 'jeddah-airport-to-makkah',
    readTime: '5 min read',
    updatedDate: 'October 2026',
    sections: [
      {
        heading: loc('خطوات الوصول من صالة 1 (المحطة الجديدة)', 'Terminal 1 Step-by-Step Walkthrough'),
        body: loc(
          '1. بعد الخروج من الطائرة والانتهاء من الجوازات، استلم حقائبك من سيور العفش.\n2. يمكنك شراء شريحة اتصال سعودية من أكشاك STC أو Mobily أو Zain داخل الصالة.\n3. اخرج نحو صالة القدوم العامة، حيث ستجد سائقك بانتظارك بلوحة تحمل اسمك.\n4. سيرافقك السائق مباشرة إلى مواقف السيارات المخصصة.',
          '1. Disembark and proceed through electronic passport control.\n2. Collect baggage from designated carousels.\n3. Purchase a local data SIM from telecom kiosks inside the terminal.\n4. Exit into the greeting hall to meet your chauffeur holding your personalized name board.'
        ),
      },
    ],
    faqs: [
      {
        q: loc('ماذا لو تأخرت في إنهاء إجراءات الجوازات أو التفتيش؟', 'What if customs or immigration takes longer than usual?'),
        a: loc('لا داعي للقلق؛ حجزك يشمل 90 دقيقة انتظار مجانية كاملة، كما يمكنك التواصل مع منسقنا عبر واتساب المطار في أي وقت.', 'No stress at all. Your reservation includes 90 minutes of complimentary wait time, and our 24/7 dispatch is on WhatsApp.'),
      },
    ],
  },

  // 12. How to Book and Confirm an Umrah Taxi
  {
    slug: 'how-to-book-and-confirm-umrah-taxi',
    category: 'pricing',
    categoryLabel: loc('خطوات الحجز', 'Booking Guide'),
    title: loc(
      'كيف تحجز وتؤكد تاكسي العمرة: الدليل الشامل لسياسة الدفع والتأكيد',
      'How to Book & Confirm Your Umrah Taxi: Step-by-Step & Payment Policy (2026)'
    ),
    subtitle: loc(
      'خطوات الحجز الفوري، رمز التتبع المخصص، سياسة الإلغاء المرنة، والدفع عند الوصول بأمان.',
      'Instant booking workflow, dual WhatsApp routing codes, pay-on-arrival terms, and free flexible cancellation.'
    ),
    summary: loc(
      'حجز سيارتك مع Duyuf Alrahman VIP يتم في أقل من دقيقة وبدون أي دفعة مقدمة إلزامية. تختر المسار ونوع المركبة، وتصلك رسالة التأكيد عبر واتساب مع رمز تتبع خاص لرحلتك. الدفع يتم نقداً كاش فقط (ريال سعودي أو دولار) عند وصولك سالماً لوجهتك.',
      'Booking with Duyuf Alrahman VIP takes less than 60 seconds with no mandatory advance prepayment. Simply pick your route and vehicle, receive your instant confirmation code on WhatsApp, and pay safely upon reaching your destination.'
    ),
    travelTime: loc('حجز فوري في 60 ثانية', 'Instant 60s Booking'),
    routeId: 'jeddah-airport-to-makkah',
    readTime: '4 min read',
    updatedDate: 'October 2026',
    sections: [
      {
        heading: loc('خطوات الحجز السلس عبر الموقع', 'Simple 3-Step Booking Process'),
        body: loc(
          '1. حدد مسار رحلتك (مثلاً من مطار جدة إلى مكة).\n2. اختر السيارة التي تناسب عدد ركابك وأمتعتك واطلع على السعر الثابت الفعلي.\n3. أدخل موعد الرحلة وتواصل مباشرة مع منسق الحجوزات لتأكيد السائق.',
          '1. Select your desired route (e.g., Jeddah Airport to Makkah).\n2. Choose your vehicle matching your party size and view the guaranteed fixed rate.\n3. Confirm departure date/time and receive your instant reservation code via WhatsApp.'
        ),
      },
      {
        heading: loc('سياسة الدفع والإلغاء المعتمدة', 'Payment & Free Cancellation Policy'),
        body: loc(
          '• الدفع عند الوصول: لا يلزم دفع أي مبالغ قبل ركوب السيارة والوصول لوجهتك.\n• إلغاء مرن مجاني: يمكنك تعديل موعد الرحلة أو إلغائها مجاناً حتى 12 ساعة قبل الموعد.\n• لا توجد رسوم خفية: السعر يشمل الوقود، والضرائب، ورسوم الطرق السريعة.',
          '• Pay on arrival: Settle your fare with the driver upon reaching your destination.\n• Free cancellation: Modify or cancel without penalties up to 12 hours prior.\n• Zero hidden fees: All fuel, tolls, and taxes are fully covered.'
        ),
      },
    ],
    faqs: [
      {
        q: loc('هل أحتاج بطاقة ائتمانية لإتمام الحجز؟', 'Do I need a credit card to reserve my vehicle?'),
        a: loc('لا، يمكنك تأكيد حجزك فوراً والدفع نقداً بالريال السعودي أو عبر مدى/فيزا عند الوصول للفندق.', 'No credit card is required to reserve. You can pay cash in SAR or via card upon arrival at your hotel.'),
      },
    ],
  },
];
