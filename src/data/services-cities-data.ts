import { Locale } from '@/i18n/config';

export interface CityServiceFaq {
  question: string;
  answer: string;
}

export interface CityServiceRouteItem {
  id: string;
  title: string;
  distance: string;
  duration: string;
  priceFromSAR: number;
  description: string;
  badge: string;
}

export interface CityServiceContent {
  metaTitle: string;
  metaDescription: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  overviewTitle: string;
  overviewParagraphs: string[];
  routesTitle: string;
  routesSubtitle: string;
  routes: CityServiceRouteItem[];
  fleetTitle: string;
  fleetSubtitle: string;
  featuresTitle: string;
  features: { title: string; desc: string }[];
  faqsTitle: string;
  faqs: CityServiceFaq[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaBtn: string;
  ctaSecondaryBtn: string;
}

export const TAIF_SERVICE_DATA: Record<Locale, CityServiceContent> = {
  ar: {
    metaTitle: 'خدمة سيارات وسائق VIP في الطائف وجبال الهدا | ضيوف الرحمن',
    metaDescription:
      'احجز سيارة خاصة وسائق VIP للتنقل بين مكة وجدة والطائف وجبال الهدا ومزارع الورد. أسعار ثابتة معتمدة، توقف في الميقات، والدفع للسائق عند الوصول دون عربون.',
    heroBadge: 'توسع خدمات ضيوف الرحمن VIP • الطائف والهدا',
    heroTitle: 'خدمة سيارات وسائق VIP في الطائف وجبال الهدا ومزارع الورد',
    heroSubtitle:
      'تنقلات خاصة وفارهة تربط مكة المكرمة وجدة بمرتفعات الطائف الباردة. رحلات آمنة عبر عقبة الهدا، توقف مريح في ميقات قرن المنازل للإحرام، وأسطول عائلي حديث مع سياسة الدفع عند الوصول 100%.',
    overviewTitle: 'مصيف الحجاز الجبلي برعاية وضيافة راقية',
    overviewParagraphs: [
      'تقع مدينة الطائف على ارتفاع يتجاوز 1800 متر فوق سطح البحر، وتعد المتنفس الجبلي الأبرز لضيوف الرحمن والزوار الراغبين في الاستمتاع بالطقس المعتدل وزيارة مزارع ومصانع الورد الطائفي العريق، تلفريك الهدا، ومواقع الجولات التاريخية.',
      'نوفر في ضيوف الرحمن VIP رحلات مباشرة من بهو فندقك بمكة المكرمة أو صالة مطار الملك عبدالعزيز بجدة إلى قلب الطائف بسيارات حديثة مجهزة للقيادة الجبلية الآمنة مع سائقين محترفين ملمين بتضاريس المنطقة ومواقيتها الشرعية.',
      'للمعتمرين المتوجهين من الطائف إلى مكة المكرمة، تشمل الخدمة توقفاً مخصصاً ومريحاً في ميقات قرن المنازل (السيل الكبير أو وادي محرم) للاغتسال وارتداء ملابس الإحرام وصلاة ركعتين قبل إكمال الطريق إلى الحرم الشريف.',
    ],
    routesTitle: 'المسارات المعتمدة والأسعار الثابتة لمدينة الطائف',
    routesSubtitle: 'أسعار نهائية مضمونة بالريال السعودي تشمل الوقود والرسوم دون أي مبالغ خفية',
    routes: [
      {
        id: 'makkah-to-taif',
        title: 'من فنادق مكة المكرمة إلى الطائف والهدا',
        distance: '85 كم',
        duration: '75-90 دقيقة',
        priceFromSAR: 350,
        description: 'صعود بانورامي سلس عبر عقبة الهدا إلى مزارع الورد ومنتجعات الطائف مع إمكانية التوقف للتصوير.',
        badge: 'الأكثر طلباً',
      },
      {
        id: 'taif-to-makkah',
        title: 'من الطائف إلى مكة المكرمة (عبر الميقات)',
        distance: '85 كم',
        duration: '75-90 دقيقة',
        priceFromSAR: 350,
        description: 'رحلة عمرة ميسرة مع توقف مجدول لمدة 45 دقيقة في ميقات قرن المنازل للإحرام والتلبية.',
        badge: 'عمرة وميقات',
      },
      {
        id: 'jeddah-to-taif',
        title: 'من مطار جدة (KAIA) إلى الطائف',
        distance: '175 كم',
        duration: '120-135 دقيقة',
        priceFromSAR: 550,
        description: 'استقبال شخصي من صالة الوصول بمطار جدة مع تتبع الرحلات والانطلاق المباشر لمرتفعات الطائف.',
        badge: 'استقبال مطار',
      },
    ],
    fleetTitle: 'أسطول السيارات الفاخرة المخصصة للرحلات الجبلية',
    fleetSubtitle: 'مركبات حديثة مكيفة بالكامل تتسع للعائلات والحقائب براحة تامة',
    featuresTitle: 'لماذا تختار ضيوف الرحمن لرحلتك إلى الطائف؟',
    features: [
      {
        title: 'سائقون متمرسون في الطرق الجبلية',
        desc: 'سائقون ذوو خبرة وافية في القيادة الآمنة والرزينة عبر عقبة الهدا وطرق الشفا الوعرة.',
      },
      {
        title: 'توقف مريح في الميقات الشرعي',
        desc: 'توقف كافٍ للاغتسال وارتداء الإحرام في ميقات السيل الكبير أو وادي محرم دون استعجال.',
      },
      {
        title: 'الدفع للسائق عند الوصول 100%',
        desc: 'لا حاجة لبطاقات ائتمان مسبقة أو دفع أي عربون — السداد نقداً أو بالبطاقة عند بلوغ وجهتك.',
      },
      {
        title: 'مساحة وفيرة للأمتعة العائلية',
        desc: 'صناديق أمتعة رحبة تتسع لكافة الحقائب الكبيرة وعربات الأطفال ومشتريات الورد الطائفي.',
      },
    ],
    faqsTitle: 'الأسئلة الشائعة حول خدمات النقل في الطائف',
    faqs: [
      {
        question: 'كم تستغرق الرحلة من مكة المكرمة إلى الطائف بالسيارة الخاصة؟',
        answer:
          'تستغرق الرحلة بين 75 إلى 90 دقيقة تقريباً (مسافة 85 كم) عبر طريق عقبة الهدا، وتعتمد المدة على حركة السير والظروف المناخية في الجبل.',
      },
      {
        question: 'هل ينتظر السائق أثناء استعدادنا للإحرام في ميقات قرن المنازل؟',
        answer:
          'نعم بالتأكيد. التوقف في الميقات مشمول بالكامل في الرحلة، حيث ينتظركم السائق في مواقف الميقات المخصصة لحين إتمام الاغتسال والصلاة ولبس الإحرام.',
      },
      {
        question: 'هل يمكن تنظيم جولة سياحية لزيارة مزارع الورد وتلفريك الهدا؟',
        answer:
          'نعم، يمكنك حجز سيارة بسائق خاص بالساعة أو لليوم الكامل لزيارة مصانع تقطير الورد، تلفريك الهدا، منتزه الردف، وقصر شبرا التاريخي.',
      },
      {
        question: 'ماذا لو أغلقت عقبة الهدا مؤقتاً بسبب هطول الأمطار؟',
        answer:
          'في الحالات الاحترازية لسلامة المسافرين، يتخذ سائقونا المحترفون طريق السيل الكبير السريع كمسار بديل آمن يضمن وصولكم دون قلق.',
      },
    ],
    ctaTitle: 'احجز رحلتك الخاصة إلى الطائف الآن',
    ctaSubtitle: 'سائقك الخاص بانتظارك • أسعار ثابتة ومؤكدة • الدفع عند الوصول نقداً أو بالبطاقة',
    ctaBtn: 'احجز سيارتك للطائف الآن',
    ctaSecondaryBtn: 'تواصل عبر واتساب',
  },
  en: {
    metaTitle: 'VIP Private Chauffeur & Transfers in Taif & Al Hada | Duyuf Alrahman',
    metaDescription:
      'Book private VIP chauffeur transfers between Makkah, Jeddah, and Taif. Guaranteed fixed fares, mountain scenic routes, Miqat stop, and 100% pay upon arrival.',
    heroBadge: 'Service Expansion • Taif & Al Hada Mountain Hub',
    heroTitle: 'VIP Private Chauffeur Transfers in Taif, Al Hada & Rose Farms',
    heroSubtitle:
      'Executive door-to-door transport connecting Makkah and Jeddah to the refreshing highlands of Taif. Scenic mountain highway drives, dedicated Miqat stop for Umrah pilgrims, and late-model family fleet with zero advance payment.',
    overviewTitle: 'Discover the Highland Rose Capital with Executive Peace of Mind',
    overviewParagraphs: [
      'Perched at an altitude of over 1,800 meters, Taif is the historic mountain retreat of the Hijaz, celebrated for its temperate climate, dramatic mountain peaks, world-famous rose water factories, and scenic cable car.',
      'Duyuf Alrahman VIP provides seamless private chauffeur transfers directly from your hotel lobby in Makkah or Jeddah KAIA Airport straight to your Taif mountain resort or city hotel. Travel in air-conditioned comfort with chauffeurs certified for safe mountain navigation.',
      'For pilgrims journeying from Taif to Makkah to perform Umrah, our service includes a dedicated, unhurried stop at Miqat Qarn al-Manazil (As-Sayl Al-Kabeer or Wadi Muharram) to perform ablutions, don the Ihram garments, and formulate your pilgrimage intention.',
    ],
    routesTitle: 'Fixed-Rate Verified Routes for Taif',
    routesSubtitle: 'Guaranteed total fares in SAR including all fuel, highway tolls, and mountain navigation',
    routes: [
      {
        id: 'makkah-to-taif',
        title: 'Makkah Hotels → Taif & Al Hada',
        distance: '85 km',
        duration: '75-90 mins',
        priceFromSAR: 350,
        description: 'Scenic ascent up the Al Hada escarpment directly to your resort or rose farm with optional photo stops.',
        badge: 'Most Popular',
      },
      {
        id: 'taif-to-makkah',
        title: 'Taif → Makkah Hotel (Via Miqat)',
        distance: '85 km',
        duration: '75-90 mins',
        priceFromSAR: 350,
        description: 'Smooth pilgrimage descent with a dedicated 45-minute stop at Miqat Qarn al-Manazil for Ihram preparations.',
        badge: 'Umrah & Miqat',
      },
      {
        id: 'jeddah-to-taif',
        title: 'Jeddah Airport (KAIA) → Taif',
        distance: '175 km',
        duration: '120-135 mins',
        priceFromSAR: 550,
        description: 'Direct terminal meet & greet at KAIA with flight radar monitoring, heading straight up to Taif mountains.',
        badge: 'Airport Transfer',
      },
    ],
    fleetTitle: 'Executive Fleet Engineered for Mountain Comfort',
    fleetSubtitle: 'Modern sedans, luxury VIP vans, and high-capacity coaches with multi-zone climate control',
    featuresTitle: 'Why Choose Duyuf Alrahman VIP for Your Taif Journey?',
    features: [
      {
        title: 'Mountain-Experienced Chauffeurs',
        desc: 'Chauffeurs skilled in safe, gentle navigation through the sweeping curves of the Al Hada mountain highway.',
      },
      {
        title: 'Dedicated Miqat Stop Included',
        desc: 'Comfortable waiting time at Miqat Qarn al-Manazil or Wadi Muharram for ghusl, prayer, and Ihram donning.',
      },
      {
        title: '100% Pay Upon Arrival',
        desc: 'No advance credit card charges or deposits required. Pay your driver upon arrival in cash (SAR) or card.',
      },
      {
        title: 'Generous Luggage Capacity',
        desc: 'Ample trunk space for large suitcases, foldable strollers, and delicate Taif rose water souvenirs.',
      },
    ],
    faqsTitle: 'Frequently Asked Questions — Taif Chauffeur Services',
    faqs: [
      {
        question: 'How long does the drive between Makkah and Taif take?',
        answer:
          'The private drive takes approximately 75 to 90 minutes (approx. 85 km) via the modern Al Hada highway, depending on road conditions.',
      },
      {
        question: 'Does the chauffeur wait while we prepare for Ihram at the Miqat?',
        answer:
          'Yes, absolutely. The Miqat stop is fully integrated into the service. Your driver waits parked outside while you use the facilities and pray.',
      },
      {
        question: 'Can we book a day tour to visit Taif rose factories and the cable car?',
        answer:
          'Yes. You can book an hourly chauffeur package to visit local rose distilleries, Al Hada viewpoints, the cable car, and Shubra Palace.',
      },
      {
        question: 'What happens if the Al Hada mountain pass is closed due to dense fog or rain?',
        answer:
          'In rare weather closures, our drivers automatically take the well-paved As-Sayl Al-Kabeer Highway (Route 287) to ensure safe, timely arrival.',
      },
    ],
    ctaTitle: 'Reserve Your Private Chauffeur to Taif Today',
    ctaSubtitle: 'Guaranteed fixed fares • Zero advance deposit • Pay your driver upon arrival in cash or card',
    ctaBtn: 'Book Taif Transfer Now',
    ctaSecondaryBtn: 'Chat on WhatsApp',
  },
  ms: {
    metaTitle: 'Perkhidmatan Pemandu VIP & Pengangkutan Taif | Duyuf Alrahman',
    metaDescription:
      'Tempah pemandu VIP peribadi antara Makkah, Jeddah dan Taif. Kadar tetap terjamin, singgah Miqat Qarnul Manazil, dan bayar kepada pemandu semasa tiba.',
    heroBadge: 'Pelanjutan Perkhidmatan • Hab Pergunungan Taif & Al Hada',
    heroTitle: 'Pemandu VIP Peribadi ke Taif, Al Hada & Ladang Mawar',
    heroSubtitle:
      'Pengangkutan pintu-ke-pintu eksklusif menghubungkan Makkah dan Jeddah ke tanah tinggi Taif yang nyaman. Perjalanan gunung yang indah, singgah Miqat untuk Umrah, dan sifar bayaran pendahuluan.',
    overviewTitle: 'Nikmati Keindahan Bandar Mawar Taif dengan Keselesaan VIP',
    overviewParagraphs: [
      'Terletak pada ketinggian melebihi 1,800 meter dari paras laut, Taif adalah kawasan peranginan tanah tinggi Hijaz yang terkenal dengan cuaca sejuk, pemandangan gunung, kilang air mawar, dan kereta kabel.',
      'Duyuf Alrahman VIP menyediakan pemindahan peribadi terus dari hotel Makkah atau Lapangan Terbang Jeddah ke penginapan anda di Taif dengan kenderaan berhawa dingin dan pemandu berpengalaman.',
      'Bagi jemaah yang berangkat dari Taif ke Makkah untuk menunaikan Umrah, perkhidmatan kami merangkumi hentian khas di Miqat Qarnul Manazil (As-Sayl Al-Kabeer) untuk mandi sunat dan berniat ihram.',
    ],
    routesTitle: 'Laluan Disahkan & Kadar Tetap untuk Taif',
    routesSubtitle: 'Harga mutlak dalam SAR termasuk minyak, tol lebuh raya, dan pemanduan gunung',
    routes: [
      {
        id: 'makkah-to-taif',
        title: 'Hotel Makkah → Taif & Al Hada',
        distance: '85 km',
        duration: '75-90 minit',
        priceFromSAR: 350,
        description: 'Perjalanan mendaki lereng Al Hada terus ke pusat peranginan atau ladang mawar anda.',
        badge: 'Paling Popular',
      },
      {
        id: 'taif-to-makkah',
        title: 'Taif → Hotel Makkah (Singgah Miqat)',
        distance: '85 km',
        duration: '75-90 minit',
        priceFromSAR: 350,
        description: 'Perjalanan Umrah lancar dengan hentian 45 minit di Miqat Qarnul Manazil untuk berniat ihram.',
        badge: 'Umrah & Miqat',
      },
      {
        id: 'jeddah-to-taif',
        title: 'Lapangan Terbang Jeddah (KAIA) → Taif',
        distance: '175 km',
        duration: '120-135 minit',
        priceFromSAR: 550,
        description: 'Sambutan ketibaan di KAIA dengan pemantauan radar penerbangan terus ke pergunungan Taif.',
        badge: 'Pemindahan Lapangan Terbang',
      },
    ],
    fleetTitle: 'Armada Mewah Disesuaikan untuk Laluan Pergunungan',
    fleetSubtitle: 'Sedan moden, van VIP eksklusif, dan bas kapasiti tinggi dengan penghawa dingin berkuasa',
    featuresTitle: 'Kelebihan Menggunakan Duyuf Alrahman VIP ke Taif',
    features: [
      {
        title: 'Pemandu Berpengalaman Jalan Gunung',
        desc: 'Pemandu mahir mengendalikan laluan berliku di lereng Al Hada dengan selamat dan tenang.',
      },
      {
        title: 'Hentian Miqat Disediakan',
        desc: 'Masa yang cukup di Miqat Qarnul Manazil untuk mandi, bersolat sunat, dan memakai pakaian ihram.',
      },
      {
        title: 'Bayar Terus kepada Pemandu 100%',
        desc: 'Tiada deposit atau kad kredit diperlukan dalam talian. Bayar tunai (SAR) atau kad semasa tiba.',
      },
      {
        title: 'Ruang Bagasi Luas',
        desc: 'Ruang yang mencukupi untuk bagasi besar keluarga, kereta tolak bayi, dan cenderamata air mawar.',
      },
    ],
    faqsTitle: 'Soalan Lazim — Perkhidmatan Pengangkutan Taif',
    faqs: [
      {
        question: 'Berapa lamakah perjalanan dari Makkah ke Taif?',
        answer: 'Perjalanan mengambil masa sekitar 75 hingga 90 minit (kira-kira 85 km) melalui lebuh raya Al Hada.',
      },
      {
        question: 'Adakah pemandu menunggu semasa kami berihram di Miqat?',
        answer: 'Ya, pasti. Hentian Miqat termasuk sepenuhnya dalam perkhidmatan tanpa sebarang bayaran tambahan.',
      },
      {
        question: 'Bolehkah kami menempah lawatan ke kilang mawar dan kereta kabel?',
        answer: 'Boleh. Kami menawarkan pakej sewaan mengikut jam untuk melawat tarikan utama sekitar Taif.',
      },
      {
        question: 'Bagaimana jika jalan Al Hada ditutup akibat kabus tebal atau hujan?',
        answer: 'Pemandu kami akan beralih ke Lebuhraya As-Sayl Al-Kabeer alternatif untuk memastikan ketibaan selamat.',
      },
    ],
    ctaTitle: 'Tempah Pemandu Peribadi ke Taif Hari Ini',
    ctaSubtitle: 'Kadar tetap terjamin • Sifar deposit • Bayar kepada pemandu semasa tiba',
    ctaBtn: 'Tempah Pengangkutan Taif',
    ctaSecondaryBtn: 'Hubungi WhatsApp',
  },
  id: {
    metaTitle: 'Layanan Sopir VIP & Transportasi Privat Taif | Duyuf Alrahman',
    metaDescription:
      'Pesan sopir pribadi VIP untuk rute Makkah, Jeddah, dan Taif. Tarif tetap transparan, singgah Miqat Qarnul Manazil, dan bayar langsung ke sopir saat tiba.',
    heroBadge: 'Ekspansi Layanan • Wilayah Pegunungan Taif & Al Hada',
    heroTitle: 'Sopir Pribadi VIP ke Taif, Al Hada & Kebun Mawar',
    heroSubtitle:
      'Layanan antar jemput eksklusif menghubungkan Makkah dan Jeddah ke dataran tinggi Taif yang sejuk. Perjalanan pegunungan yang nyaman, singgah Miqat untuk Umrah, tanpa uang muka.',
    overviewTitle: 'Kunjungi Kota Sejuk Taif dengan Layanan VIP Eksklusif',
    overviewParagraphs: [
      'Berada di ketinggian lebih dari 1.800 meter di atas permukaan laut, Taif adalah kota peristirahatan pegunungan yang terkenal dengan iklim sejuk, perkebunan mawar legendaris, dan kereta gantung.',
      'Duyuf Alrahman VIP menyediakan penjemputan langsung dari hotel Makkah atau Bandara Jeddah KAIA menuju hotel atau resor Anda di Taif dengan armada modern ber-AC dan sopir profesional.',
      'Bagi jamaah yang bepergian dari Taif ke Makkah untuk Umrah, layanan kami mencakup perhentian khusus di Miqat Qarnul Manazil (As-Sayl Al-Kabeer) untuk bersuci dan berniat ihram.',
    ],
    routesTitle: 'Rute Terverifikasi & Tarif Pasti untuk Taif',
    routesSubtitle: 'Harga final dalam SAR mencakup bensin, tol, dan navigasi pegunungan',
    routes: [
      {
        id: 'makkah-to-taif',
        title: 'Hotel Makkah → Taif & Al Hada',
        distance: '85 km',
        duration: '75-90 menit',
        priceFromSAR: 350,
        description: 'Perjalanan menaiki tebing Al Hada langsung ke resor atau kebun mawar Anda.',
        badge: 'Paling Diminati',
      },
      {
        id: 'taif-to-makkah',
        title: 'Taif → Hotel Makkah (Via Miqat)',
        distance: '85 km',
        duration: '75-90 menit',
        priceFromSAR: 350,
        description: 'Perjalanan Umrah tenang dengan waktu henti 45 menit di Miqat Qarnul Manazil.',
        badge: 'Umrah & Miqat',
      },
      {
        id: 'jeddah-to-taif',
        title: 'Bandara Jeddah (KAIA) → Taif',
        distance: '175 km',
        duration: '120-135 menit',
        priceFromSAR: 550,
        description: 'Penjemputan kedatangan di KAIA dengan radar penerbangan langsung ke pegunungan Taif.',
        badge: 'Antar Jemput Bandara',
      },
    ],
    fleetTitle: 'Armada Mewah Nyaman untuk Rute Pegunungan',
    fleetSubtitle: 'Sedan eksekutif, van VIP luas, dan bus berkapasitas besar dengan pendingin udara prima',
    featuresTitle: 'Keunggulan Memilih Duyuf Alrahman VIP ke Taif',
    features: [
      {
        title: 'Sopir Ahli Jalur Pegunungan',
        desc: 'Pengemudi berpengalaman yang mengutamakan keselamatan saat melintasi jalur tebing Al Hada.',
      },
      {
        title: 'Perhentian Miqat Termasuk',
        desc: 'Waktu yang leluasa di Miqat Qarnul Manazil untuk mandi sunnah, salat, dan mengenakan kain ihram.',
      },
      {
        title: 'Bayar ke Sopir 100% Saat Tiba',
        desc: 'Tanpa DP atau kartu kredit online. Bayar tunai (SAR) atau kartu langsung ke sopir saat sampai.',
      },
      {
        title: 'Kapasitas Bagasi Luas',
        desc: 'Bagasi lega untuk koper besar keluarga, kereta dorong bayi, dan oleh-oleh khas Taif.',
      },
    ],
    faqsTitle: 'Tanya Jawab Seputar Layanan Transportasi Taif',
    faqs: [
      {
        question: 'Berapa lama perjalanan mobil dari Makkah ke Taif?',
        answer: 'Perjalanan memakan waktu sekitar 75 hingga 90 menit (sekitar 85 km) melewati jalan raya Al Hada.',
      },
      {
        question: 'Apakah sopir bersedia menunggu saat kami berihram di Miqat?',
        answer: 'Ya, tentu saja. Perhentian di Miqat sudah termasuk dalam paket perjalanan kami.',
      },
      {
        question: 'Bisakah memesan tur wisata ke pabrik mawar dan kereta gantung Taif?',
        answer: 'Bisa. Kami melayani sewa mobil dengan sopir per jam untuk keliling tempat wisata di Taif.',
      },
      {
        question: 'Bagaimana jika jalur Al Hada ditutup karena cuaca hujan atau kabut tebal?',
        answer: 'Sopir kami akan mengalihkan rute melalui jalur As-Sayl Al-Kabeer yang aman dan terawat.',
      },
    ],
    ctaTitle: 'Pesan Sopir Privat Anda ke Taif Sekarang',
    ctaSubtitle: 'Tarif tetap terjamin • Bebas uang muka • Bayar langsung ke sopir saat tiba',
    ctaBtn: 'Pesan Antar Jemput Taif',
    ctaSecondaryBtn: 'Hubungi via WhatsApp',
  },
  ur: {
    metaTitle: 'طائف اور الھدا کے لیے وی آئی پی پرائیویٹ کار و ڈرائیور | ضیوف الرحمن',
    metaDescription:
      'مکہ مکرمہ، جدہ اور طائف کے درمیان پرائیویٹ وی آئی پی ٹرانسپورٹ۔ فکس ریٹس، میقات پر قیام، اور بغیر پیشگی رقم کے آمد پر ادائیگی۔',
    heroBadge: 'سروسز میں توسیع • طائف اور الھدا ماؤنٹین ہب',
    heroTitle: 'طائف، الھدا اور گلاب کے باغات کے لیے وی آئی پی پرائیویٹ ڈرائیور',
    heroSubtitle:
      'مکہ مکرمہ اور جدہ سے طائف کے خوشگوار پہاڑی مقامات تک محفوظ اور پرسکون سفر۔ عقبة الھدا کا خوبصورت راستہ، عمرہ کے لیے میقات پر قیام، اور 100% آمد پر ادائیگی کی سہولت۔',
    overviewTitle: 'طائف کے خوشگوار موسم اور گلاب کے باغات کا وی آئی پی سفر',
    overviewParagraphs: [
      'سطح سمندر سے 1,800 میٹر سے زیادہ کی بلندی پر واقع طائف اپنے معتدل موسم، قدرتی مناظر، مشہور گلاب کے عرق کے کارخانوں اور کیبل کار کی بدولت زائرین کا پسندیدہ مقام ہے۔',
      'ضیوف الرحمن آپ کو مکہ مکرمہ کے ہوٹل یا جدہ ایئرپورٹ سے طائف کے پہاڑی ریزورٹس تک آرام دہ جدید گاڑیوں اور تجربہ کار ڈرائیورز کے ساتھ براہ راست ٹرانسپورٹ فراہم کرتی ہے۔',
      'طائف سے مکہ مکرمہ عمرہ کے لیے جانے والے زائرین کے لیے سروس میں میقات قرن المنازل (السیل الکبیر) پر غسل اور احرام کے لیے باقاعدہ قیام شامل ہے۔',
    ],
    routesTitle: 'طائف کے لیے تصدیق شدہ روٹس اور فکسڈ کرائے',
    routesSubtitle: 'سعودی ریال میں حتمی کرائے جن میں فیول اور تمام اخراجات شامل ہیں',
    routes: [
      {
        id: 'makkah-to-taif',
        title: 'مکہ ہوٹل تا طائف اور الھدا',
        distance: '85 کلومیٹر',
        duration: '75-90 منٹ',
        priceFromSAR: 350,
        description: 'عقبة الھدا کے پہاڑی راستے سے طائف کے ریزورٹ یا گلاب کے باغات تک کا پرلطف سفر۔',
        badge: 'سب سے مقبول',
      },
      {
        id: 'taif-to-makkah',
        title: 'طائف تا مکہ مکرمہ (براستہ میقات)',
        distance: '85 کلومیٹر',
        duration: '75-90 منٹ',
        priceFromSAR: 350,
        description: 'میقات قرن المنازل پر احرام باندھنے کے لیے 45 منٹ کے خصوصی قیام کے ساتھ عمرہ سفر۔',
        badge: 'عمرہ و میقات',
      },
      {
        id: 'jeddah-to-taif',
        title: 'جدہ ایئرپورٹ (KAIA) تا طائف',
        distance: '175 کلومیٹر',
        duration: '120-135 منٹ',
        priceFromSAR: 550,
        description: 'جدہ ایئرپورٹ کے ٹرمینل سے فلائٹ ٹریکنگ کے ساتھ براہ راست طائف روانگی۔',
        badge: 'ایئرپورٹ ٹرانسفر',
      },
    ],
    fleetTitle: 'پہاڑی سفر کے لیے خصوصی و آرام دہ گاڑیاں',
    fleetSubtitle: 'فیملی اور سامان کی مکمل گنجائش والی نئی اور ایئرکنڈیشنڈ گاڑیاں',
    featuresTitle: 'طائف کے سفر کے لیے ضیوف الرحمن کا انتخاب کیوں؟',
    features: [
      {
        title: 'پہاڑی راستوں کے ماہر ڈرائیورز',
        desc: 'عقبة الھدا کے موڑ دار راستوں پر محفوظ اور پرسکون ڈرائیونگ کا وسیع تجربہ۔',
      },
      {
        title: 'میقات پر قیام شامل',
        desc: 'میقات قرن المنازل پر غسل، نماز اور احرام کے لیے اطمینان بخش وقت۔',
      },
      {
        title: 'منزل پر ڈرائیور کو 100% ادائیگی',
        desc: 'کوئی پیشگی رقم یا ایڈوانس نہیں — رقم منزل پر پہنچ کر نقد یا کارڈ سے ادا کریں۔',
      },
      {
        title: 'سامان کی وسیع گنجائش',
        desc: 'بڑے بیگز، بچوں کے پرام اور طائف کے تحائف کے لیے کشادہ ڈگی۔',
      },
    ],
    faqsTitle: 'طائف ٹرانسپورٹ کے بارے میں عام سوالات',
    faqs: [
      {
        question: 'مکہ مکرمہ سے طائف تک کار سے کتنا وقت لگتا ہے؟',
        answer: 'عقبة الھدا کے راستے سفر میں تقریباً 75 سے 90 منٹ (85 کلومیٹر) لگتے ہیں۔',
      },
      {
        question: 'کیا ڈرائیور میقات پر احرام باندھنے تک انتظار کرے گا؟',
        answer: 'جی ہاں، بالکل۔ میقات پر قیام سروس میں مکمل طور پر شامل ہے۔',
      },
      {
        question: 'کیا ہم طائف میں مزارات اور گلاب کے کارخانوں کی سیر کے لیے بکنگ کر سکتے ہیں؟',
        answer: 'جی ہاں، آپ گھنٹوں کے حساب سے گاڑی بک کر کے طائف کے تاریخی مقامات کی سیر کر سکتے ہیں۔',
      },
      {
        question: 'اگر بارش کی وجہ سے عقبة الھدا بند ہو جائے تو کیا متبادل راستہ ہے؟',
        answer: 'ایسی صورت میں ڈرائیور السیل الکبیر والا محفوظ متبادل روٹ اختیار کرتے ہیں۔',
      },
    ],
    ctaTitle: 'طائف کے لیے اپنی پرائیویٹ کار ابھی بک کریں',
    ctaSubtitle: 'طے شدہ کرائے • کوئی ایڈوانس نہیں • منزل پر نقد یا کارڈ سے ادائیگی',
    ctaBtn: 'طائف کی سواری بک کریں',
    ctaSecondaryBtn: 'واٹس ایپ پر رابطہ کریں',
  },
  fr: {
    metaTitle: 'Chauffeur Privé VIP & Transferts à Taïf et Al Hada | Duyuf Alrahman',
    metaDescription:
      'Réservez un chauffeur privé VIP entre La Mecque, Djeddah et Taïf. Tarifs fixes garantis, arrêt au Miqat, et paiement au chauffeur à l’arrivée sans avance.',
    heroBadge: 'Extension des Services • Pôle Montagneux de Taïf & Al Hada',
    heroTitle: 'Chauffeur Privé VIP à Taïf, Al Hada & Distilleries de Roses',
    heroSubtitle:
      'Transport exclusif de porte-à-porte reliant La Mecque et Djeddah aux hauteurs fraîches de Taïf. Trajet panoramique en montagne, arrêt au Miqat pour la Omra, sans aucun acompte.',
    overviewTitle: 'Découvrez la Capitale des Roses de Taïf en Confort VIP',
    overviewParagraphs: [
      'Située à plus de 1 800 mètres d’altitude, Taïf est le refuge d’altitude historique du Hedjaz, réputée pour sa douceur climatique, ses vergers et ses célèbres fabriques d’eau de rose.',
      'Duyuf Alrahman VIP propose des transferts privés directs depuis votre hôtel à La Mecque ou l’aéroport de Djeddah jusqu’à votre résidence à Taïf avec des chauffeurs professionnels formés à la conduite en montagne.',
      'Pour les pèlerins se rendant à La Mecque pour la Omra, le service comprend un arrêt dédié au Miqat Qarn al-Manazil (As-Sayl Al-Kabeer) pour le ghusl et la mise en état d’Ihram.',
    ],
    routesTitle: 'Itinéraires Vérifiés et Tarifs Fixes pour Taïf',
    routesSubtitle: 'Tarifs fermes en SAR comprenant carburant, péages et conduite sécurisée',
    routes: [
      {
        id: 'makkah-to-taif',
        title: 'Hôtels La Mecque → Taïf & Al Hada',
        distance: '85 km',
        duration: '75-90 min',
        priceFromSAR: 350,
        description: 'Montée panoramique le long de la falaise d’Al Hada jusqu’à votre hôtel avec arrêts photos.',
        badge: 'Le Plus Demandé',
      },
      {
        id: 'taif-to-makkah',
        title: 'Taïf → Hôtel La Mecque (Via Miqat)',
        distance: '85 km',
        duration: '75-90 min',
        priceFromSAR: 350,
        description: 'Trajet pour la Omra avec arrêt de 45 minutes au Miqat Qarn al-Manazil pour l’Ihram.',
        badge: 'Omra & Miqat',
      },
      {
        id: 'jeddah-to-taif',
        title: 'Aéroport Djeddah (KAIA) → Taïf',
        distance: '175 km',
        duration: '120-135 min',
        priceFromSAR: 550,
        description: 'Accueil personnalisé à l’aéroport de Djeddah et trajet direct vers les hauteurs de Taïf.',
        badge: 'Transfert Aéroport',
      },
    ],
    fleetTitle: 'Flotte VIP Conçue pour la Montagne',
    fleetSubtitle: 'Berlines confortables, vans VIP spacieux et autocars climatisés',
    featuresTitle: 'Pourquoi Choisir Duyuf Alrahman VIP pour Taïf ?',
    features: [
      {
        title: 'Chauffeurs Expérimentés en Montagne',
        desc: 'Conduite souple et sécurisée sur les routes en lacets d’Al Hada.',
      },
      {
        title: 'Arrêt Miqat Inclus',
        desc: 'Temps suffisant au Miqat Qarn al-Manazil pour les ablutions et la prière de l’Ihram.',
      },
      {
        title: '100% Paiement au Chauffeur',
        desc: 'Aucun paiement en ligne ni avance requise. Réglez à l’arrivée en espèces ou par carte.',
      },
      {
        title: 'Grand Espace Bagages',
        desc: 'Coffre volumineux adapté aux grandes valises familiales et achats de produits locaux.',
      },
    ],
    faqsTitle: 'Questions Fréquentes — Transferts Taïf',
    faqs: [
      {
        question: 'Combien de temps dure le trajet entre La Mecque et Taïf ?',
        answer: 'Le trajet dure environ 75 à 90 minutes (85 km) par la route d’Al Hada.',
      },
      {
        question: 'Le chauffeur attend-il pendant notre préparation au Miqat ?',
        answer: 'Oui, l’arrêt au Miqat est entièrement inclus sans frais supplémentaires.',
      },
      {
        question: 'Peut-on réserver une excursion d’une journée à Taïf ?',
        answer: 'Oui, nous proposons des forfaits avec chauffeur à l’heure pour visiter les sites de Taïf.',
      },
      {
        question: 'Que se passe-t-il si la route d’Al Hada est fermée pour cause de brouillard ?',
        answer: 'Nos chauffeurs empruntent automatiquement la route sécurisée d’As-Sayl Al-Kabeer.',
      },
    ],
    ctaTitle: 'Réservez Votre Chauffeur Privé pour Taïf',
    ctaSubtitle: 'Tarifs fixes garantis • Zéro avance • Paiement direct au chauffeur à l’arrivée',
    ctaBtn: 'Réserver Mon Transfert',
    ctaSecondaryBtn: 'Contacter sur WhatsApp',
  },
  es: {
    metaTitle: 'Chofer Privado VIP y Traslados en Taif y Al Hada | Duyuf Alrahman',
    metaDescription:
      'Reserve traslados con chofer privado VIP entre La Meca, Yeda y Taif. Precios fijos garantizados, parada en el Miqat y pago directo al conductor a la llegada sin anticipo.',
    heroBadge: 'Expansión de Servicios • Taif y Región de Al Hada',
    heroTitle: 'Chofer Privado VIP en Taif, Al Hada y Destilerías de Rosas',
    heroSubtitle:
      'Transporte exclusivo de puerta a puerta conectando La Meca y Yeda con el agradable clima montañoso de Taif. Ruta panorámica, parada en el Miqat para la Umrah, y 0% pago por adelantado.',
    overviewTitle: 'Descubra la Capital de las Rosas de Taif con Confort Ejecutivo',
    overviewParagraphs: [
      'Ubicada a más de 1.800 metros de altitud, Taif es el clásico destino de montaña del Hiyaz, célebre por su agradable clima, cultivos de rosas y teleférico.',
      'Duyuf Alrahman VIP ofrece traslados directos desde su hotel en La Meca o el aeropuerto de Yeda hasta su alojamiento en Taif con vehículos modernos y choferes expertos.',
      'Para los peregrinos que viajan de Taif a La Meca para la Umrah, el servicio incluye una parada en el Miqat Qarn al-Manazil (As-Sayl Al-Kabeer) para el estado de Ihram.',
    ],
    routesTitle: 'Rutas Verificadas y Tarifas Fijas para Taif',
    routesSubtitle: 'Precios garantizados en SAR incluyendo peajes y combustible sin cargos ocultos',
    routes: [
      {
        id: 'makkah-to-taif',
        title: 'Hoteles La Meca → Taif y Al Hada',
        distance: '85 km',
        duration: '75-90 min',
        priceFromSAR: 350,
        description: 'Ascenso panorámico por la carretera de Al Hada hasta su hotel o plantación de rosas.',
        badge: 'Más Popular',
      },
      {
        id: 'taif-to-makkah',
        title: 'Taif → Hotel La Meca (Vía Miqat)',
        distance: '85 km',
        duration: '75-90 min',
        priceFromSAR: 350,
        description: 'Viaje para la Umrah con parada de 45 minutos en el Miqat Qarn al-Manazil para el Ihram.',
        badge: 'Umrah y Miqat',
      },
      {
        id: 'jeddah-to-taif',
        title: 'Aeropuerto Yeda (KAIA) → Taif',
        distance: '175 km',
        duration: '120-135 min',
        priceFromSAR: 550,
        description: 'Recepción en el aeropuerto de Yeda y traslado directo a las montañas de Taif.',
        badge: 'Traslado Aeropuerto',
      },
    ],
    fleetTitle: 'Flota VIP Preparada para la Montaña',
    fleetSubtitle: 'Sedanes ejecutivos, vans VIP amplias y minibuses con climatización completa',
    featuresTitle: '¿Por qué Elegir Duyuf Alrahman VIP para Taif?',
    features: [
      {
        title: 'Choferes Expertos en Montaña',
        desc: 'Conducción segura en las curvas de la autopista de Al Hada.',
      },
      {
        title: 'Parada en el Miqat Incluida',
        desc: 'Tiempo suficiente en el Miqat para realizar abluciones, orar y colocarse el Ihram.',
      },
      {
        title: '100% Pago a la Llegada',
        desc: 'Sin depósitos ni cargos en línea. Pague al chofer al llegar en efectivo o tarjeta.',
      },
      {
        title: 'Amplio Espacio para Maletas',
        desc: 'Maletero espacioso para maletas familiares grandes y compras locales.',
      },
    ],
    faqsTitle: 'Preguntas Frecuentes — Servicios en Taif',
    faqs: [
      {
        question: '¿Cuánto dura el viaje en coche entre La Meca y Taif?',
        answer: 'El viaje dura aproximadamente entre 75 y 90 minutos (85 km) por la autopista de Al Hada.',
      },
      {
        question: '¿El chofer espera mientras nos preparamos en el Miqat?',
        answer: 'Sí, la parada en el Miqat está totalmente incluida en el servicio.',
      },
      {
        question: '¿Se pueden reservar excursiones de un día en Taif?',
        answer: 'Sí, disponemos de servicio por horas para visitar los principales atractivos de Taif.',
      },
      {
        question: '¿Qué sucede si la carretera de Al Hada se cierra por lluvia o niebla?',
        answer: 'Nuestros choferes utilizan la ruta alternativa de As-Sayl Al-Kabeer para garantizar su llegada.',
      },
    ],
    ctaTitle: 'Reserve su Chofer Privado a Taif Hoy',
    ctaSubtitle: 'Tarifas fijas garantizadas • Sin depósito • Pago directo al chofer a la llegada',
    ctaBtn: 'Reservar Traslado a Taif',
    ctaSecondaryBtn: 'Contactar por WhatsApp',
  },
  de: {
    metaTitle: 'VIP Chauffeur & Transfers in Taif und Al Hada | Duyuf Alrahman',
    metaDescription:
      'Buchen Sie private VIP-Chauffeurtransfers zwischen Mekka, Dschidda und Taif. Garantierte Festpreise, Halt am Miqat und Zahlung beim Fahrer bei Ankunft.',
    heroBadge: 'Service-Erweiterung • Taif & Al Hada Gebirgs-Hub',
    heroTitle: 'VIP-Chauffeurtransfer nach Taif, Al Hada & zu den Rosenfarmen',
    heroSubtitle:
      'Exklusiver Haustürtransfer von Mekka und Dschidda in das kühle Hochland von Taif. Malerische Gebirgsstraße, planmäßiger Halt am Miqat für die Umrah und 0 % Vorauszahlung.',
    overviewTitle: 'Entdecken Sie die Rosenstadt Taif mit exzellentem VIP-Komfort',
    overviewParagraphs: [
      'Auf über 1.800 Metern Höhe gelegen, ist Taif die historische Sommerfrische des Hedschas, berühmt für ihr angenehmes Klima, imposante Bergzüge, Rosenwasser-Destillerien und die Seilbahn.',
      'Duyuf Alrahman VIP bietet private Direkttransfers von Ihrem Hotel in Mekka oder vom Flughafen Dschidda direkt zu Ihrem Hotel in Taif mit modernen, klimatisierten Fahrzeugen.',
      'Für Pilger, die von Taif nach Mekka zur Umrah reisen, beinhaltet der Service einen entspannten Halt am Miqat Qarn al-Manazil (As-Sayl Al-Kabeer) für die Vorbereitung auf den Ihram.',
    ],
    routesTitle: 'Geprüfte Routen und Festpreise für Taif',
    routesSubtitle: 'Garantierte Gesamtpreise in SAR inklusive Kraftstoff und Maut ohne versteckte Gebühren',
    routes: [
      {
        id: 'makkah-to-taif',
        title: 'Hotels Mekka → Taif & Al Hada',
        distance: '85 km',
        duration: '75-90 Min.',
        priceFromSAR: 350,
        description: 'Malerische Auffahrt über den Al-Hada-Pass direkt zu Ihrem Hotel oder Ihrer Rosenfarm.',
        badge: 'Am Beliebtesten',
      },
      {
        id: 'taif-to-makkah',
        title: 'Taif → Hotel Mekka (Über Miqat)',
        distance: '85 km',
        duration: '75-90 Min.',
        priceFromSAR: 350,
        description: 'Reise zur Umrah mit 45-minütigem Halt am Miqat Qarn al-Manazil für das Anlegen des Ihram.',
        badge: 'Umrah & Miqat',
      },
      {
        id: 'jeddah-to-taif',
        title: 'Flughafen Dschidda (KAIA) → Taif',
        distance: '175 km',
        duration: '120-135 Min.',
        priceFromSAR: 550,
        description: 'Persönlicher Empfang am Flughafen Dschidda mit Flugüberwachung und Fahrt nach Taif.',
        badge: 'Flughafentransfer',
      },
    ],
    fleetTitle: 'VIP-Flotte für Gebirgsfahrten',
    fleetSubtitle: 'Moderne Limousinen, luxuriöse VIP-Vans und Reisebusse mit bester Klimatisierung',
    featuresTitle: 'Warum Duyuf Alrahman VIP für Taif wählen?',
    features: [
      {
        title: 'Erfahrene Gebirgs-Chauffeure',
        desc: 'Sichere und ruhige Fahrweise auf den Serpentinen der Al-Hada-Hochstraße.',
      },
      {
        title: 'Miqat-Halt Inklusive',
        desc: 'Ausreichend Zeit am Miqat für rituelle Waschungen, Gebet und das Anlegen des Ihram.',
      },
      {
        title: '100% Zahlung beim Fahrer',
        desc: 'Keine Vorauszahlung nötig. Zahlen Sie bei Ankunft in bar (SAR) oder per EC-/Kreditkarte.',
      },
      {
        title: 'Großzügiger Gepäckraum',
        desc: 'Viel Platz für Familienkoffer, Kinderwagen und lokale Andenken.',
      },
    ],
    faqsTitle: 'Häufig gestellte Fragen zu Taif-Fahrten',
    faqs: [
      {
        question: 'Wie lange dauert die Fahrt von Mekka nach Taif?',
        answer: 'Die Fahrt dauert etwa 75 bis 90 Minuten (ca. 85 km) über die Al-Hada-Hochstraße.',
      },
      {
        question: 'Wartet der Chauffeur während des Miqat-Aufenthalts?',
        answer: 'Ja, der Halt am Miqat ist vollständig im Service ohne Aufpreis enthalten.',
      },
      {
        question: 'Können Tagestouren zu den Rosenfarmen gebucht werden?',
        answer: 'Ja, wir bieten stundenweise buchbare Fahrzeuge für Ausflüge in Taif an.',
      },
      {
        question: 'Was passiert bei wetterbedingter Sperrung der Al-Hada-Straße?',
        answer: 'Unsere Fahrer weichen auf die gut ausgebaute Route über As-Sayl Al-Kabeer aus.',
      },
    ],
    ctaTitle: 'Buchen Sie Ihren Chauffeur nach Taif',
    ctaSubtitle: 'Garantierte Festpreise • Keine Anzahlung • Bezahlung bei Ankunft beim Fahrer',
    ctaBtn: 'Fahrt nach Taif buchen',
    ctaSecondaryBtn: 'Über WhatsApp anfragen',
  },
  hi: {
    metaTitle: 'ताइफ़ और अल हदा वीआईपी प्राइवेट कार व चौफ़र | दुयूफ़ अल-रहमान',
    metaDescription:
      'मक्का, जेद्दा और ताइफ़ के बीच वीआईपी प्राइवेट चौफ़र सेवा बुक करें। निश्चित दरें, मीक़ात पर ठहराव, और पहुंचने पर सीधे ड्राइवर को भुगतान।',
    heroBadge: 'सेवा विस्तार • ताइफ़ और अल हदा पर्वतीय केंद्र',
    heroTitle: 'ताइफ़, अल हदा और गुलाब के बागानों के लिए वीआईपी प्राइवेट चौफ़र',
    heroSubtitle:
      'मक्का और जेद्दा से ताइफ़ के खुशनुमा पहाड़ी इलाके के लिए सीधी लग्जरी यात्रा। अल हदा का मनोरम मार्ग, उमरा के लिए मीक़ात पर ठहराव, और बिना किसी अग्रिम भुगतान की सुविधा।',
    overviewTitle: 'ताइफ़ के सुहावने मौसम और गुलाब के बागानों की वीआईपी यात्रा',
    overviewParagraphs: [
      'समुद्र तल से 1,800 मीटर से अधिक की ऊंचाई पर स्थित ताइफ़ अपने शांत मौसम, पहाड़ों, प्रसिद्ध गुलाब के इत्र कारखानों और केबल कार के लिए विख्यात है।',
      'दुयूफ़ अल-रहमान मक्का के होटलों या जेद्दा एयरपोर्ट से ताइफ़ तक अनुभवी ड्राइवरों और आधुनिक एयर-कंडीशंड गाड़ियों के साथ सुरक्षित यात्रा प्रदान करता है।',
      'ताइफ़ से मक्का उमरा के लिए जाने वाले तीर्थयात्रियों के लिए मीक़ात क़र्न अल-मनाज़िल पर एहराम बांधने हेतु विशेष ठहराव शामिल है।',
    ],
    routesTitle: 'ताइफ़ के लिए निर्धारित मार्ग और निश्चित दरें',
    routesSubtitle: 'सऊदी रियाल में निश्चित मूल्य जिसमें ईंधन और सभी टैक्स शामिल हैं',
    routes: [
      {
        id: 'makkah-to-taif',
        title: 'मक्का होटल → ताइफ़ और अल हदा',
        distance: '85 किमी',
        duration: '75-90 मिनट',
        priceFromSAR: 350,
        description: 'अल हदा के पहाड़ों से होते हुए ताइफ़ के रिसॉर्ट या गुलाब के बागानों तक का सफर।',
        badge: 'सर्वाधिक लोकप्रिय',
      },
      {
        id: 'taif-to-makkah',
        title: 'ताइफ़ → मक्का होटल (मीक़ात होकर)',
        distance: '85 किमी',
        duration: '75-90 मिनट',
        priceFromSAR: 350,
        description: 'मीक़ात क़र्न अल-मनाज़िल पर एहराम के लिए 45 मिनट के ठहराव के साथ उमरा यात्रा।',
        badge: 'उमरा और मीक़ात',
      },
      {
        id: 'jeddah-to-taif',
        title: 'जेद्दा एयरपोर्ट (KAIA) → ताइफ़',
        distance: '175 किमी',
        duration: '120-135 मिनट',
        priceFromSAR: 550,
        description: 'जेद्दा एयरपोर्ट से सीधे ताइफ़ के पहाड़ों के लिए प्राइवेट वीआईपी ट्रांसफर।',
        badge: 'एयरपोर्ट ट्रांसफर',
      },
    ],
    fleetTitle: 'पहाड़ी रास्तों के लिए उपयुक्त लग्जरी फ्लीट',
    fleetSubtitle: 'आधुनिक सेडान, वीआईपी वैन और बड़े वाहन जो परिवार और सामान के लिए पूर्णतः अनुकूल हैं',
    featuresTitle: 'ताइफ़ यात्रा के लिए दुयूफ़ अल-रहमान क्यों चुनें?',
    features: [
      {
        title: 'पहाड़ी रास्तों के अनुभवी ड्राइवर',
        desc: 'अल हदा के घुमावदार पहाड़ी रास्तों पर सुरक्षित और आरामदायक ड्राइविंग का अनुभव।',
      },
      {
        title: 'मीक़ात पर ठहराव शामिल',
        desc: 'मीक़ात क़र्न अल-मनाज़िल पर स्नान, नमाज़ और एहराम बांधने का पूरा समय।',
      },
      {
        title: 'पहुंचने पर 100% भुगतान',
        desc: 'कोई अग्रिम भुगतान या ऑनलाइन कार्ड की आवश्यकता नहीं। पहुंचने पर नकद या कार्ड से दें।',
      },
      {
        title: 'सामान के लिए पर्याप्त स्थान',
        desc: 'बड़े सूटकेस, बच्चों की गाड़ियां और ताइफ़ की खरीदारी के लिए बड़ा बूट स्पेस।',
      },
    ],
    faqsTitle: 'ताइफ़ यात्रा से जुड़े सामान्य प्रश्न',
    faqs: [
      {
        question: 'मक्का से ताइफ़ कार से जाने में कितना समय लगता है?',
        answer: 'अल हदा मार्ग से यात्रा में लगभग 75 से 90 मिनट (85 किमी) का समय लगता है।',
      },
      {
        question: 'क्या ड्राइवर मीक़ात पर रुककर हमारा इंतज़ार करेगा?',
        answer: 'हाँ, मीक़ात पर ठहराव सेवा में पूरी तरह शामिल है।',
      },
      {
        question: 'क्या हम ताइफ़ के गुलाब कारखानों के लिए डे-टूर बुक कर सकते हैं?',
        answer: 'हाँ, आप घंटे के हिसाब से प्राइवेट कार बुक करके ताइफ़ के पर्यटन स्थल देख सकते हैं।',
      },
      {
        question: 'यदि मौसम के कारण अल हदा मार्ग बंद हो तो क्या होगा?',
        answer: 'हमारे ड्राइवर अस-सैल अल-कबीर के सुरक्षित वैकल्पिक मार्ग से आपको सुरक्षित पहुंचाते हैं।',
      },
    ],
    ctaTitle: 'ताइफ़ के लिए अपनी प्राइवेट गाड़ी अभी बुक करें',
    ctaSubtitle: 'निश्चित किराया • शून्य अग्रिम भुगतान • पहुंचने पर नकद या कार्ड से भुगतान करें',
    ctaBtn: 'ताइफ़ यात्रा बुक करें',
    ctaSecondaryBtn: 'व्हाट्सएप पर बात करें',
  },
  tr: {
    metaTitle: 'Taif ve El Hada VIP Özel Şoförlü Transfer | Duyuf Alrahman',
    metaDescription:
      'Mekke, Cidde ve Taif arasında VIP özel şoförlü transfer ayırtın. Garantili sabit fiyatlar, Mikat noktasında duraklama ve varışta şoföre ödeme kolaylığı.',
    heroBadge: 'Hizmet Genişletme • Taif ve El Hada Dağ Merkezi',
    heroTitle: 'Taif, El Hada ve Gül Bahçeleri İçin VIP Özel Şoför',
    heroSubtitle:
      'Mekke ve Cidde’den Taif’in serin yaylalarına kapıdan kapıya özel transfer. Manzaralı dağ yolu, Umre için Mikat noktasında mola ve sıfır ön ödeme avantajı.',
    overviewTitle: 'Hicaz’ın Gül Başkenti Taif’i VIP Konforuyla Keşfedin',
    overviewParagraphs: [
      'Deniz seviyesinden 1.800 metre yükseklikte bulunan Taif, ılıman havası, dağ manzaraları, gül suyu fabrikaları ve teleferiğiyle öne çıkan tarihi bir yayla kentidir.',
      'Duyuf Alrahman VIP, Mekke otellerinden veya Cidde Havalimanı’ndan Taif’e dağ sürüşüne uygun lüks araçlar ve deneyimli şoförlerle direkt transfer sunar.',
      'Taif’ten Mekke’ye Umre için giden ziyaretçilerimiz için Karnülmenazil Mikat noktasında ihrama girmek üzere özel bir mola hizmete dahildir.',
    ],
    routesTitle: 'Taif İçin Doğrulanmış Güzergahlar ve Sabit Fiyatlar',
    routesSubtitle: 'Yakıt ve otoyol ücretleri dahil SAR cinsinden garantili net fiyatlar',
    routes: [
      {
        id: 'makkah-to-taif',
        title: 'Mekke Otelleri → Taif ve El Hada',
        distance: '85 km',
        duration: '75-90 dk',
        priceFromSAR: 350,
        description: 'El Hada dağ geçidinden otelinize veya gül bahçelerine manzaralı konforlu yolculuk.',
        badge: 'En Çok Tercih Edilen',
      },
      {
        id: 'taif-to-makkah',
        title: 'Taif → Mekke Oteli (Mikat Üzerinden)',
        distance: '85 km',
        duration: '75-90 dk',
        priceFromSAR: 350,
        description: 'Karnülmenazil Mikat noktasında ihram hazırlığı için 45 dakikalık mola ile Umre yolculuğu.',
        badge: 'Umre ve Mikat',
      },
      {
        id: 'jeddah-to-taif',
        title: 'Cidde Havalimanı (KAIA) → Taif',
        distance: '175 km',
        duration: '120-135 dk',
        priceFromSAR: 550,
        description: 'KAIA terminalinden uçuş takip sistemi ile karşılanıp doğrudan Taif dağlarına transfer.',
        badge: 'Havalimanı Transferi',
      },
    ],
    fleetTitle: 'Dağ Yollarına Uygun VIP Araç Filosu',
    fleetSubtitle: 'Geniş aileler ve bagajlar için tam klimalı sedan, lüks van ve otobüsler',
    featuresTitle: 'Taif Transferiniz İçin Neden Duyuf Alrahman VIP?',
    features: [
      {
        title: 'Dağ Yollarında Uzman Şoförler',
        desc: 'El Hada dağ yolunun virajlarında güvenli ve sarsıntısız sürüş deneyimi.',
      },
      {
        title: 'Mikat Molası Dahil',
        desc: 'Karnülmenazil Mikat noktasında abdest, namaz ve ihram için yeterli bekleme süresi.',
      },
      {
        title: '%100 Varışta Şoföre Ödeme',
        desc: 'Ön ödeme veya kredi kartı gerekmez. Ücreti varışta nakit (SAR) veya kartla ödeyin.',
      },
      {
        title: 'Geniş Bagaj Hacmi',
        desc: 'Büyük bavullar, pusetler ve Taif’ten alınan hediyelikler için ferah bagaj alanı.',
      },
    ],
    faqsTitle: 'Taif Ulaşımı Hakkında Sıkça Sorulan Sorular',
    faqs: [
      {
        question: 'Mekke’den Taif’e özel araçla yolculuk ne kadar sürer?',
        answer: 'Yolculuk El Hada dağ yolu üzerinden yaklaşık 75 ila 90 dakika (85 km) sürer.',
      },
      {
        question: 'Mikat noktasında ihrama girerken şoför bizi bekler mi?',
        answer: 'Evet, Mikat noktasında duraklama hizmetimize tamamen dahildir.',
      },
      {
        question: 'Taif gül fabrikaları ve teleferik için günübirlik tur yapılabilir mi?',
        answer: 'Evet, Taif’in turistik yerlerini gezmek için saatlik şoförlü araç kiralayabilirsiniz.',
      },
      {
        question: 'El Hada dağ yolu sis veya yağmur nedeniyle kapanırsa ne yapılır?',
        answer: 'Şoförlerimiz güvenli alternatif olan Seylülkebir otoyolunu kullanarak sizi ulaştırır.',
      },
    ],
    ctaTitle: 'Taif İçin Özel Şoförünüzü Şimdi Ayırtın',
    ctaSubtitle: 'Garantili sabit fiyatlar • Sıfır ön ödeme • Varışta nakit veya kartla ödeyin',
    ctaBtn: 'Taif Transferi Ayırtın',
    ctaSecondaryBtn: "WhatsApp'tan Yazın",
  },
};

export const RIYADH_SERVICE_DATA: Record<Locale, CityServiceContent> = {
  ar: {
    metaTitle: 'خدمة سيارات وسائق VIP في الرياض ومطار الملك خالد | ضيوف الرحمن',
    metaDescription:
      'خدمة سائق VIP وتنقلات تنفيذية في الرياض. توصيل من مطار الملك خالد (RUH)، رحلات طويلة إلى مكة والمدينة، وسيارات فارهة بالساعة مع سياسة الدفع عند الوصول.',
    heroBadge: 'توسع خدمات ضيوف الرحمن VIP • العاصمة الرياض',
    heroTitle: 'خدمة سائق VIP وتنقلات تنفيذية في مدينة ومطار الرياض',
    heroSubtitle:
      'تنقلات فاخرة تلبي تطلعات رجال الأعمال والوفود الدبلوماسية والعائلات في العاصمة الرياض. استقبال رسمي من مطار الملك خالد الدولي (RUH)، رحلات برية طويلة لكبار الشخصيات إلى مكة والمدينة، وسداد عند الوصول 100%.',
    overviewTitle: 'تنقلات تنفيذية تليق بمكانة العاصمة السعودية',
    overviewParagraphs: [
      'تعد الرياض مركز الاقتصاد والأعمال والدبلوماسية في المملكة العربية السعودية. تتطلب تنقلات رجال الأعمال والزوار والوفود معايير استثنائية من الالتزام بالمواعيد والخصوصية والفخامة.',
      'تقدم ضيوف الرحمن VIP خدمات الاستقبال من كافة صالات مطار الملك خالد الدولي (RUH) وصالة الطيران الخاص، مع متابعة دقيقة لحركة الطيران، وتوفير تنقلات راقية نحو مركز الملك عبدالله المالي (KAFD)، العليا، والحي الدبلوماسي.',
      'كما نتميز بتقديم خدمات السفر البري الفاخر لمسافات طويلة بين الرياض ومكة المكرمة أو المدينة المنورة بسيارات دفع رباعي فاخرة مثل جي إم سي يوكون إكس إل، لتجربة سفر مريحة ومستقلة تماماً عن مواعيد المطارات.',
    ],
    routesTitle: 'المسارات التنفيذية والأسعار الثابتة بالرياض',
    routesSubtitle: 'أسعار نهائية شفافة تشمل كافة الخدمات وتضمن أرقى مستويات الراحة',
    routes: [
      {
        id: 'riyadh-airport-transfer',
        title: 'مطار الملك خالد الدولي (RUH) ⇄ فنادق الرياض',
        distance: '45 كم',
        duration: '35-50 دقيقة',
        priceFromSAR: 200,
        description: 'استقبال شخصي باللوحة الرقمية من صالات المطار مع 60 دقيقة انتظار مجاني وتوصيل لباب فندقك.',
        badge: 'استقبال مطار',
      },
      {
        id: 'riyadh-to-makkah',
        title: 'الرياض ⇄ مكة المكرمة (طريق سريع VIP)',
        distance: '870 كم',
        duration: '8-9 ساعات',
        priceFromSAR: 2200,
        description: 'رحلة سفر برية فاخرة وخاصة بالكامل عبر طريق 40 مع استراحات نموذجية وتوقف في الميقات للإحرام.',
        badge: 'رحلات طويلة VIP',
      },
      {
        id: 'riyadh-to-madinah',
        title: 'الرياض ⇄ المدينة المنورة (طريق سريع VIP)',
        distance: '840 كم',
        duration: '8-9 ساعات',
        priceFromSAR: 2200,
        description: 'تنقل فاخر ومستقل من الرياض مباشرة إلى المنطقة المركزية بجوار المسجد النبوي الشريف.',
        badge: 'رحلات طويلة VIP',
      },
    ],
    fleetTitle: 'أسطول السيارات التنفيذية المتاح في الرياض',
    fleetSubtitle: 'سيارات سيدان فارهة، فانات VIP بمقاعد كابتن، وسيارات SUV أمريكية فخمة',
    featuresTitle: 'مميزات خدمة السائق التنفيذي بالرياض',
    features: [
      {
        title: 'استقبال تنفيذي من صالات المطار',
        desc: 'استقبال احترافي بلوحة اسم رقمية ومساعدة فورية في حمل الحقائب في مطار الملك خالد (RUH).',
      },
      {
        title: 'رحلات برية طويلة كاملة الخصوصية',
        desc: 'بديل راقٍ ومريح لرحلات الطيران والقطار يمنحك حرية التوقف والخصوصية التامة مع عائلتك.',
      },
      {
        title: 'دفع مباشر للسائق دون عربون',
        desc: 'سداد كامل المبلغ للسائق عند الوصول نقداً أو عبر أجهزة الدفع الإلكتروني (مدى/فيزا/ماستركارد).',
      },
      {
        title: 'خدمة رجال الأعمال بالساعة واليوم',
        desc: 'سائق خاص تحت الطلب لحضور الاجتماعات والفعاليات في كافد وموسم الرياض والمراكز الحيوية.',
      },
    ],
    faqsTitle: 'الأسئلة الشائعة حول خدمات النقل في الرياض',
    faqs: [
      {
        question: 'هل توفرون استقبالاً من صالة الطيران الخاص بمطار الملك خالد؟',
        answer:
          'نعم، نوفر خدمات الاستقبال الراقي لرحلات الطيران الخاص ورجال الأعمال بسيارات دفع رباعي فاخرة.',
      },
      {
        question: 'كم تستغرق الرحلة بالسيارة الخاصة من الرياض إلى مكة المكرمة؟',
        answer:
          'تستغرق الرحلة ما بين 8 إلى 9 ساعات عبر طريق مكة السريع (طريق 40)، ويتخللها توقفات مريحة للصلاة والطعام والتوقف في الميقات.',
      },
      {
        question: 'هل يمكن الدفع ببطاقات الشركات أو بطاقات الائتمان؟',
        answer:
          'نعم، جميع سياراتنا مجهزة بأجهزة نقاط بيع بنكية تقبل بطاقات مدى، فيزا، وماستركارد، ويتم إصدار إيصال رسمي فوري.',
      },
      {
        question: 'هل يتابع السائق موعد هبوط الطائرة في حال تأخرت الرحلة؟',
        answer:
          'نعم، ترتبط عملياتنا برادار الطيران الحي مع منح 60 دقيقة انتظار مجاني بعد هبوط الطائرة الفعلي.',
      },
    ],
    ctaTitle: 'احجز سائقك الخاص في الرياض الآن',
    ctaSubtitle: 'خدمة تنفيذية راقية • سيارات فارهة • أسعار ثابتة معتمدة والدفع عند الوصول',
    ctaBtn: 'احجز سيارتك في الرياض',
    ctaSecondaryBtn: 'تواصل عبر واتساب',
  },
  en: {
    metaTitle: 'VIP Chauffeur & Executive Transfers in Riyadh & RUH Airport | Duyuf Alrahman',
    metaDescription:
      'Book executive VIP chauffeur transfers in Riyadh. King Khalid Airport (RUH) meet & greet, long-distance luxury travel to Makkah & Madinah, and 100% pay upon arrival.',
    heroBadge: 'Service Expansion • Capital City Riyadh Hub',
    heroTitle: 'VIP Chauffeur & Executive Transfers in Riyadh & RUH Airport',
    heroSubtitle:
      'High-end chauffeur service catering to business executives, diplomatic missions, and VIP families in Saudi Arabia’s capital. Terminal meet & greet at King Khalid International Airport (RUH), door-to-door long-distance highway transfers to Makkah and Madinah, with zero advance prepayment.',
    overviewTitle: 'Executive Ground Mobility Befitting Saudi Arabia’s Capital',
    overviewParagraphs: [
      'As the diplomatic and financial powerhouse of Saudi Arabia, Riyadh commands the highest standards of punctuality, privacy, and vehicular luxury.',
      'Duyuf Alrahman VIP provides seamless arrivals across all terminals of King Khalid International Airport (RUH) and the Private Aviation Terminal. Enjoy smooth, Wi-Fi-equipped transport to the King Abdullah Financial District (KAFD), Olaya business towers, and the Diplomatic Quarter.',
      'For high-profile guests seeking total autonomy from domestic flight queues and train transfers, we specialize in long-distance intercity chauffeur journeys between Riyadh and Makkah or Madinah in premium GMC Yukon XL SUVs and Hyundai Staria VIP vans.',
    ],
    routesTitle: 'Executive Routes & Guaranteed Rates in Riyadh',
    routesSubtitle: 'All-inclusive transparent rates in SAR with premium amenities and flight tracking',
    routes: [
      {
        id: 'riyadh-airport-transfer',
        title: 'King Khalid Airport (RUH) ⇄ Riyadh Hotels',
        distance: '45 km',
        duration: '35-50 mins',
        priceFromSAR: 200,
        description: 'Executive terminal meet & greet with personalized digital signboard, 60 minutes free waiting, and luggage care.',
        badge: 'Airport Transfer',
      },
      {
        id: 'riyadh-to-makkah',
        title: 'Riyadh ⇄ Makkah Hotel (VIP Highway Transfer)',
        distance: '870 km',
        duration: '8-9 hours',
        priceFromSAR: 2200,
        description: 'Autonomous luxury travel across Route 40 with premium rest stops and a dedicated Miqat stop for Umrah.',
        badge: 'VIP Long-Haul',
      },
      {
        id: 'riyadh-to-madinah',
        title: 'Riyadh ⇄ Madinah Hotel (VIP Highway Transfer)',
        distance: '840 km',
        duration: '8-9 hours',
        priceFromSAR: 2200,
        description: 'Door-to-door highway cruise connecting Riyadh directly to your hotel lobby near the Prophet’s Mosque.',
        badge: 'VIP Long-Haul',
      },
    ],
    fleetTitle: 'Executive Fleet for Business & Luxury Travel in Riyadh',
    fleetSubtitle: 'Premium sedans, captain-seat VIP vans, and extended-wheelbase American SUVs',
    featuresTitle: 'Why Choose Duyuf Alrahman VIP in Riyadh?',
    features: [
      {
        title: 'Airport Meet & Greet at RUH',
        desc: 'Professional greeting at arrivals with digital name boards and courteous luggage assistance.',
      },
      {
        title: 'Total Autonomy on Long-Haul Trips',
        desc: 'Avoid airport security lines and train luggage limits with door-to-door private highway travel.',
      },
      {
        title: '100% Pay Upon Arrival',
        desc: 'Zero advance deposits or online card holds. Settle upon destination arrival via cash or card machine.',
      },
      {
        title: 'Hourly Corporate Chauffeurs',
        desc: 'Dedicated chauffeur standby for back-to-back meetings at KAFD, exhibitions, and diplomatic venues.',
      },
    ],
    faqsTitle: 'Frequently Asked Questions — Riyadh Chauffeur Services',
    faqs: [
      {
        question: 'Do you provide transfers from the Private Aviation Terminal at RUH?',
        answer:
          'Yes. We provide executive transfers from the Private Aviation Terminal with luxury GMC Yukon XL vehicles.',
      },
      {
        question: 'How long does the private drive from Riyadh to Makkah take?',
        answer:
          'The drive takes 8 to 9 hours via the multi-lane Route 40, including comfortable stops for meals and Miqat.',
      },
      {
        question: 'Can we pay with a corporate card or receive an official receipt?',
        answer:
          'Yes. Chauffeurs carry electronic POS terminals accepting Mada, Visa, and Mastercard, with instant digital receipts.',
      },
      {
        question: 'Does the driver monitor our flight if delayed into Riyadh?',
        answer:
          'Yes. All airport reservations include automated flight radar tracking and 60 minutes of complimentary waiting.',
      },
    ],
    ctaTitle: 'Book Your Executive Chauffeur in Riyadh',
    ctaSubtitle: 'Fixed rates • Premium fleet • 100% pay upon arrival to your driver in cash or card',
    ctaBtn: 'Reserve Riyadh Chauffeur',
    ctaSecondaryBtn: 'Chat on WhatsApp',
  },
  ms: {
    metaTitle: 'Pemandu VIP & Pengangkutan Eksekutif di Riyadh | Duyuf Alrahman',
    metaDescription:
      'Tempah pemandu VIP eksekutif di Riyadh. Sambutan Lapangan Terbang King Khalid (RUH), perjalanan jauh ke Makkah & Madinah, bayar semasa tiba.',
    heroBadge: 'Pelanjutan Perkhidmatan • Hab Ibu Negara Riyadh',
    heroTitle: 'Pemandu VIP & Pengangkutan Eksekutif di Riyadh & Lapangan Terbang RUH',
    heroSubtitle:
      'Perkhidmatan pemandu bertaraf tinggi untuk eksekutif perniagaan dan keluarga di Riyadh. Sambutan lapangan terbang, pemindahan jarak jauh ke Makkah dan Madinah tanpa deposit pendahuluan.',
    overviewTitle: 'Pengangkutan Eksekutif Bertaraf Dunia di Ibu Negara Arab Saudi',
    overviewParagraphs: [
      'Sebagai pusat kewangan dan diplomatik Arab Saudi, Riyadh memerlukan standard ketepatan masa dan kemewahan yang tinggi.',
      'Duyuf Alrahman VIP menyediakan sambutan ketibaan di Lapangan Terbang Antarabangsa King Khalid (RUH) dan terminal penerbangan peribadi, terus ke KAFD, Olaya dan Diplomatic Quarter.',
      'Bagi tetamu yang mahukan privasi penuh, kami menawarkan perjalanan lebuh raya mewah jarak jauh dari Riyadh terus ke Makkah atau Madinah.',
    ],
    routesTitle: 'Laluan Eksekutif & Kadar Tetap di Riyadh',
    routesSubtitle: 'Kadar telus dalam SAR dengan kemudahan premium dan pemantauan penerbangan',
    routes: [
      {
        id: 'riyadh-airport-transfer',
        title: 'Lapangan Terbang King Khalid (RUH) ⇄ Hotel Riyadh',
        distance: '45 km',
        duration: '35-50 minit',
        priceFromSAR: 200,
        description: 'Sambutan di terminal ketibaan dengan kad nama digital dan 60 minit masa menunggu percuma.',
        badge: 'Pemindahan Lapangan Terbang',
      },
      {
        id: 'riyadh-to-makkah',
        title: 'Riyadh ⇄ Hotel Makkah (Lebuhraya VIP)',
        distance: '870 km',
        duration: '8-9 jam',
        priceFromSAR: 2200,
        description: 'Perjalanan mewah jarak jauh melalui Laluan 40 dengan hentian rehat dan singgah di Miqat.',
        badge: 'Jarak Jauh VIP',
      },
      {
        id: 'riyadh-to-madinah',
        title: 'Riyadh ⇄ Hotel Madinah (Lebuhraya VIP)',
        distance: '840 km',
        duration: '8-9 jam',
        priceFromSAR: 2200,
        description: 'Perjalanan peribadi dari Riyadh terus ke pintu hotel anda berhampiran Masjid Nabawi.',
        badge: 'Jarak Jauh VIP',
      },
    ],
    fleetTitle: 'Armada Eksekutif untuk Perjalanan di Riyadh',
    fleetSubtitle: 'Sedan premium, van VIP kerusi kapten, dan SUV mewah Amerika',
    featuresTitle: 'Kelebihan Duyuf Alrahman VIP di Riyadh',
    features: [
      {
        title: 'Sambutan Ketibaan di RUH',
        desc: 'Pemandu menyambut dengan papan tanda digital dan bantuan bagasi profesional.',
      },
      {
        title: 'Privasi Penuh Perjalanan Jauh',
        desc: 'Elakkan kesesakan lapangan terbang domestik dengan perjalanan darat terus ke destinasi.',
      },
      {
        title: '100% Bayar Semasa Tiba',
        desc: 'Tiada deposit dalam talian. Bayar terus kepada pemandu secara tunai atau kad.',
      },
      {
        title: 'Pemandu Mengikut Jam',
        desc: 'Pemandu siap siaga untuk mesyuarat perniagaan dan urusan rasmi di sekitar Riyadh.',
      },
    ],
    faqsTitle: 'Soalan Lazim — Perkhidmatan Pemandu di Riyadh',
    faqs: [
      {
        question: 'Adakah anda menyediakan perkhidmatan dari Terminal Penerbangan Peribadi?',
        answer: 'Ya, kami menyediakan pemindahan VIP dengan kenderaan GMC Yukon XL yang mewah.',
      },
      {
        question: 'Berapa lamakah perjalanan darat dari Riyadh ke Makkah?',
        answer: 'Perjalanan mengambil masa 8 hingga 9 jam melalui Laluan 40 termasuk hentian rehat dan Miqat.',
      },
      {
        question: 'Bolehkah kami membayar dengan kad syarikat?',
        answer: 'Boleh, pemandu dilengkapi terminal kad tanpa wayar yang menerima Visa, Mastercard, dan Mada.',
      },
      {
        question: 'Adakah pemandu memantau penerbangan kami sekiranya lewat?',
        answer: 'Ya, semua tempahan lapangan terbang dipantau secara langsung dengan 60 minit menunggu percuma.',
      },
    ],
    ctaTitle: 'Tempah Pemandu Eksekutif Anda di Riyadh',
    ctaSubtitle: 'Kadar tetap • Armada mewah • 100% bayar kepada pemandu semasa tiba',
    ctaBtn: 'Tempah Pemandu Riyadh',
    ctaSecondaryBtn: 'Hubungi WhatsApp',
  },
  id: {
    metaTitle: 'Layanan Sopir VIP & Eksekutif di Riyadh | Duyuf Alrahman',
    metaDescription:
      'Pesan sopir VIP eksekutif di Riyadh. Penjemputan Bandara King Khalid (RUH), perjalanan jauh ke Makkah & Madinah, bayar saat tiba.',
    heroBadge: 'Ekspansi Layanan • Wilayah Ibu Kota Riyadh',
    heroTitle: 'Sopir VIP & Transportasi Eksekutif di Riyadh & Bandara RUH',
    heroSubtitle:
      'Layanan sopir privat kelas atas untuk eksekutif bisnis dan keluarga di Riyadh. Penjemputan bandara, perjalanan tol jarak jauh ke Makkah dan Madinah tanpa deposit.',
    overviewTitle: 'Transportasi Eksekutif Berstandar Tinggi di Ibu Kota Saudi',
    overviewParagraphs: [
      'Sebagai pusat diplomasi dan ekonomi Arab Saudi, Riyadh menuntut standar ketepatan waktu dan kemewahan yang tinggi.',
      'Duyuf Alrahman VIP melayani kedatangan di Bandara Internasional King Khalid (RUH) dan terminal penerbangan privat, menuju KAFD, Olaya, dan Diplomatic Quarter.',
      'Kami juga menghadirkan rute jarak jauh mewah dari Riyadh ke Makkah atau Madinah dengan kenyamanan kelas utama.',
    ],
    routesTitle: 'Rute Eksekutif & Tarif Pasti di Riyadh',
    routesSubtitle: 'Tarif pasti dalam SAR dengan fasilitas premium dan pelacakan penerbangan',
    routes: [
      {
        id: 'riyadh-airport-transfer',
        title: 'Bandara King Khalid (RUH) ⇄ Hotel Riyadh',
        distance: '45 km',
        duration: '35-50 menit',
        priceFromSAR: 200,
        description: 'Penjemputan di terminal dengan papan nama digital dan gratis waktu tunggu 60 menit.',
        badge: 'Antar Jemput Bandara',
      },
      {
        id: 'riyadh-to-makkah',
        title: 'Riyadh ⇄ Hotel Makkah (Jalan Tol VIP)',
        distance: '870 km',
        duration: '8-9 jam',
        priceFromSAR: 2200,
        description: 'Perjalanan tol jarak jauh melalui Rute 40 dengan rest area berstandar tinggi dan singgah Miqat.',
        badge: 'Jarak Jauh VIP',
      },
      {
        id: 'riyadh-to-madinah',
        title: 'Riyadh ⇄ Hotel Madinah (Jalan Tol VIP)',
        distance: '840 km',
        duration: '8-9 jam',
        priceFromSAR: 2200,
        description: 'Perjalanan privat dari Riyadh langsung ke depan lobi hotel dekat Masjid Nabawi.',
        badge: 'Jarak Jauh VIP',
      },
    ],
    fleetTitle: 'Armada Eksekutif untuk Perjalanan di Riyadh',
    fleetSubtitle: 'Sedan mewah, van VIP kursi kapten, dan SUV premium Amerika',
    featuresTitle: 'Keunggulan Duyuf Alrahman VIP di Riyadh',
    features: [
      {
        title: 'Penjemputan di Bandara RUH',
        desc: 'Sopir menyambut ramah dengan papan nama digital dan bantuan penanganan koper.',
      },
      {
        title: 'Privasi Perjalanan Jarak Jauh',
        desc: 'Bebas dari antrean bandara domestik dengan perjalanan darat yang leluasa dan privat.',
      },
      {
        title: 'Bayar 100% Saat Tiba',
        desc: 'Tanpa uang muka. Bayar langsung ke sopir saat sampai dengan tunai atau kartu.',
      },
      {
        title: 'Sopir Siaga Per Jam',
        desc: 'Layanan sopir pribadi siap siaga untuk urusan bisnis dan agenda penting di Riyadh.',
      },
    ],
    faqsTitle: 'Tanya Jawab Seputar Layanan di Riyadh',
    faqs: [
      {
        question: 'Apakah melayani penjemputan dari Terminal Penerbangan Privat?',
        answer: 'Ya, kami melayani penerbangan privat dengan armada GMC Yukon XL eksklusif.',
      },
      {
        question: 'Berapa lama perjalanan darat dari Riyadh ke Makkah?',
        answer: 'Perjalanan memakan waktu 8 hingga 9 jam melalui Rute 40 termasuk istirahat dan Miqat.',
      },
      {
        question: 'Bisakah membayar dengan kartu kredit atau kartu perusahaan?',
        answer: 'Bisa, seluruh armada dilengkapi mesin EDC yang menerima kartu Mada, Visa, dan Mastercard.',
      },
      {
        question: 'Apakah sopir memantau jika penerbangan kami delay?',
        answer: 'Ya, sistem kami memantau radar kedatangan dan memberikan 60 menit gratis menunggu.',
      },
    ],
    ctaTitle: 'Pesan Sopir Eksekutif Anda di Riyadh',
    ctaSubtitle: 'Tarif pasti • Armada mewah • Bayar langsung ke sopir saat tiba',
    ctaBtn: 'Pesan Sopir Riyadh',
    ctaSecondaryBtn: 'Hubungi via WhatsApp',
  },
  ur: {
    metaTitle: 'ریاض اور کنگ خالد ایئرپورٹ پر وی آئی پی کار و ڈرائیور | ضیوف الرحمن',
    metaDescription:
      'ریاض میں وی آئی پی ایگزیکٹو ڈرائیور بک کریں۔ کنگ خالد ایئرپورٹ استقبال، مکہ اور مدینہ کے لیے طویل مسافت کا سفر، اور بغیر ایڈوانس ادائیگی۔',
    heroBadge: 'سروسز میں توسیع • دارالحکومت ریاض ہب',
    heroTitle: 'ریاض شہر اور ایئرپورٹ کے لیے وی آئی پی ایگزیکٹو ڈرائیور',
    heroSubtitle:
      'کاروباری شخصیات، سفارتی وفود اور فیملیز کے لیے پرائیویٹ ٹرانسپورٹ۔ کنگ خالد انٹرنیشنل ایئرپورٹ (RUH) سے استقبال، مکہ اور مدینہ کے لیے شاہراہ کا وی آئی پی سفر، اور 100% آمد پر ادائیگی۔',
    overviewTitle: 'سعودی دارالحکومت کے شایانِ شان ایگزیکٹو ٹرانسپورٹ',
    overviewParagraphs: [
      'سعودی عرب کے اقتصادی اور سفارتی مرکز کے طور پر ریاض میں اعلیٰ ترین معیار اور وقت کی پابندی ناگزیر ہے۔',
      'ضیوف الرحمن کنگ خالد ایئرپورٹ کے تمام ٹرمینلز اور پرائیویٹ ایوی ایشن سے کے اے ایف ڈی (KAFD)، اولیا اور ڈپلومیٹک کوارٹر کے لیے شاندار ٹرانسپورٹ فراہم کرتی ہے۔',
      'فلائٹس کی قطاروں سے بے نیاز ہو کر مکہ مکرمہ اور مدینہ منورہ کے لیے یوکون ایکس ایل اور اسٹاریا وی آئی پی میں طویل مسافت کا پرتعیش سفر ہماری خاص پہچان ہے۔',
    ],
    routesTitle: 'ریاض کے لیے ایگزیکٹو روٹس اور فکسڈ کرائے',
    routesSubtitle: 'سعودی ریال میں حتمی کرائے جن میں مکمل سروس اور فلائٹ ٹریکنگ شامل ہے',
    routes: [
      {
        id: 'riyadh-airport-transfer',
        title: 'کنگ خالد ایئرپورٹ (RUH) ⇄ ریاض ہوٹلز',
        distance: '45 کلومیٹر',
        duration: '35-50 منٹ',
        priceFromSAR: 200,
        description: 'ڈیجیٹل نیم بورڈ کے ساتھ استقبال، 60 منٹ مفت انتظار، اور ہوٹل تک باوقار منتقلی۔',
        badge: 'ایئرپورٹ ٹرانسفر',
      },
      {
        id: 'riyadh-to-makkah',
        title: 'ریاض ⇄ مکہ ہوٹل (شاہراہ وی آئی پی)',
        distance: '870 کلومیٹر',
        duration: '8-9 گھنٹے',
        priceFromSAR: 2200,
        description: 'طریق 40 پر مکمل پرائیویٹ سفر، معیاری استراحت گاہیں اور میقات پر عمرہ احرام کا قیام۔',
        badge: 'لانگ ہال وی آئی پی',
      },
      {
        id: 'riyadh-to-madinah',
        title: 'ریاض ⇄ مدینہ ہوٹل (شاہراہ وی آئی پی)',
        distance: '840 کلومیٹر',
        duration: '8-9 گھنٹے',
        priceFromSAR: 2200,
        description: 'ریاض سے براہ راست مسجد نبوی کے قریبی ہوٹل تک کا پرسکون طویل سفر۔',
        badge: 'لانگ ہال وی آئی پی',
      },
    ],
    fleetTitle: 'ریاض کے لیے جدید ایگزیکٹو گاڑیاں',
    fleetSubtitle: 'پریمیم سیڈان، کیپٹن سیٹس والی وی آئی پی وینز، اور لگژری امریکن ایس یو وی',
    featuresTitle: 'ریاض میں ضیوف الرحمن کے انتخاب کے فوائد',
    features: [
      {
        title: 'ایئرپورٹ پر باوقار استقبال',
        desc: 'کنگ خالد ایئرپورٹ پر ڈیجیٹل تختی کے ساتھ استقبال اور سامان کی مکمل مدد۔',
      },
      {
        title: 'طویل سفر میں مکمل پرائیویسی',
        desc: 'ڈومیسٹک ایئرپورٹ کی زحمت سے پاک اپنی گاڑی میں اپنی مرضی کا سفر۔',
      },
      {
        title: '100% منزل پر ادائیگی',
        desc: 'کوئی پیشگی رقم درکار نہیں۔ منزل پر پہنچ کر نقد یا کارڈ سے ادائیگی کریں۔',
      },
      {
        title: 'گھنٹوں کے حساب سے گاڑی کی دستیابی',
        desc: 'کے اے ایف ڈی اور شہر کے دیگر مقامات پر میٹنگز کے لیے ڈرائیور ہمہ وقت حاضر۔',
      },
    ],
    faqsTitle: 'ریاض سروسز کے بارے میں عام سوالات',
    faqs: [
      {
        question: 'کیا آپ پرائیویٹ ایوی ایشن ٹرمینل سے بھی پک اپ فراہم کرتے ہیں؟',
        answer: 'جی ہاں، پرائیویٹ جیٹ ٹرمینل سے یوکون ایکس ایل گاڑیوں کے ساتھ وی آئی پی سروس میسر ہے۔',
      },
      {
        question: 'ریاض سے مکہ مکرمہ تک گاڑی میں کتنا وقت لگتا ہے؟',
        answer: 'طریق 40 کے ذریعے سفر میں استراحت اور میقات کے وقفے سمیت تقریباً 8 سے 9 گھنٹے لگتے ہیں۔',
      },
      {
        question: 'کیا ہم کمپنی کارڈ یا کریڈٹ کارڈ سے ادائیگی کر سکتے ہیں؟',
        answer: 'جی ہاں، ڈرائیور کے پاس وائرلیس پی او ایس مشین موجود ہوتی ہے اور فوری رسید دی جاتی ہے۔',
      },
      {
        question: 'اگر ہماری فلائٹ لیٹ ہو جائے تو کیا ڈرائیور انتظار کرے گا؟',
        answer: 'جی ہاں، رڈار کے ذریعے فلائٹ مانیٹر کی جاتی ہے اور لینڈنگ کے بعد 60 منٹ انتظار بالکل مفت ہے۔',
      },
    ],
    ctaTitle: 'ریاض میں اپنا ایگزیکٹو ڈرائیور ابھی بک کریں',
    ctaSubtitle: 'فکسڈ کرائے • لگژری گاڑیاں • 100% منزل پر نقد یا کارڈ سے ادائیگی',
    ctaBtn: 'ریاض ڈرائیور بک کریں',
    ctaSecondaryBtn: 'واٹس ایپ پر رابطہ کریں',
  },
  fr: {
    metaTitle: 'Chauffeur VIP & Transferts Exécutifs à Riyad | Duyuf Alrahman',
    metaDescription:
      'Réservez un chauffeur VIP à Riyad. Accueil à l’Aéroport King Khalid (RUH), trajets longue distance vers La Mecque & Médine, et paiement direct à l’arrivée.',
    heroBadge: 'Extension des Services • Capitale Riyad',
    heroTitle: 'Chauffeur VIP & Transferts Exécutifs à Riyad et Aéroport RUH',
    heroSubtitle:
      'Service haut de gamme pour les affaires, missions diplomatiques et familles à Riyad. Accueil personnalisé à l’Aéroport King Khalid (RUH) et trajets interurbains vers La Mecque et Médine sans acompte.',
    overviewTitle: 'Transport Exécutif d’Exception au Cœur de la Capitale',
    overviewParagraphs: [
      'Centre économique et diplomatique d’Arabie Saoudite, Riyad exige les plus hauts standards de ponctualité et d’élégance.',
      'Duyuf Alrahman VIP assure des transferts fluides depuis tous les terminaux de l’Aéroport King Khalid (RUH) et le terminal d’aviation privée vers le KAFD et Olaya.',
      'Pour les voyageurs recherchant une autonomie totale, nous proposons des liaisons routières VIP entre Riyad et La Mecque ou Médine.',
    ],
    routesTitle: 'Itinéraires Exécutifs & Tarifs Garantis à Riyad',
    routesSubtitle: 'Tarifs transparents en SAR comprenant toutes les prestations haut de gamme',
    routes: [
      {
        id: 'riyadh-airport-transfer',
        title: 'Aéroport King Khalid (RUH) ⇄ Hôtels de Riyad',
        distance: '45 km',
        duration: '35-50 min',
        priceFromSAR: 200,
        description: 'Accueil personnalisé avec tablette nominative, 60 minutes d’attente gratuite et prise en charge des bagages.',
        badge: 'Transfert Aéroport',
      },
      {
        id: 'riyadh-to-makkah',
        title: 'Riyad ⇄ Hôtel La Mecque (Autoroute VIP)',
        distance: '870 km',
        duration: '8-9 heures',
        priceFromSAR: 2200,
        description: 'Voyage d’exception sur la Route 40 avec pauses de confort et arrêt au Miqat pour la Omra.',
        badge: 'Longue Distance VIP',
      },
      {
        id: 'riyadh-to-madinah',
        title: 'Riyad ⇄ Hôtel Médine (Autoroute VIP)',
        distance: '840 km',
        duration: '8-9 heures',
        priceFromSAR: 2200,
        description: 'Liaison directe depuis Riyad jusqu’à la porte de votre hôtel proche de la Mosquée du Prophète.',
        badge: 'Longue Distance VIP',
      },
    ],
    fleetTitle: 'Flotte Exécutive pour Riyad',
    fleetSubtitle: 'Berlines de prestige, vans VIP à sièges capitaine et grands SUV américains',
    featuresTitle: 'Pourquoi Choisir Duyuf Alrahman VIP à Riyad ?',
    features: [
      {
        title: 'Accueil Exécutif à RUH',
        desc: 'Accueil en salle des arrivées avec pancarte numérique et assistance bagages soignée.',
      },
      {
        title: 'Autonomie Totale Longue Distance',
        desc: 'Évitez les files d’attente des vols intérieurs grâce à un transport routier direct.',
      },
      {
        title: '100% Paiement à l’Arrivée',
        desc: 'Aucun acompte en ligne. Réglez directement auprès du chauffeur en espèces ou par carte.',
      },
      {
        title: 'Chauffeur à l’Heure',
        desc: 'Mise à disposition pour vos rendez-vous au KAFD et déplacements officiels à Riyad.',
      },
    ],
    faqsTitle: 'Questions Fréquentes — Transferts Riyad',
    faqs: [
      {
        question: 'Assurez-vous les transferts depuis le Terminal Privé à RUH ?',
        answer: 'Oui, nous intervenons au terminal d’aviation privée avec des véhicules GMC Yukon XL.',
      },
      {
        question: 'Combien de temps dure le trajet routier de Riyad à La Mecque ?',
        answer: 'Le trajet dure environ 8 à 9 heures par la Route 40 avec arrêts et passage au Miqat.',
      },
      {
        question: 'Peut-on payer par carte bancaire d’entreprise ?',
        answer: 'Oui, nos chauffeurs disposent de terminaux bancaires acceptant Visa, Mastercard et Mada.',
      },
      {
        question: 'Le chauffeur suit-il notre vol en cas de retard ?',
        answer: 'Oui, le suivi radar est inclus avec 60 minutes d’attente gratuite après l’atterrissage.',
      },
    ],
    ctaTitle: 'Réservez Votre Chauffeur Exécutif à Riyad',
    ctaSubtitle: 'Tarifs fixes garantis • Flotte de prestige • Paiement direct à l’arrivée',
    ctaBtn: 'Réserver Chauffeur Riyad',
    ctaSecondaryBtn: 'Contacter sur WhatsApp',
  },
  es: {
    metaTitle: 'Chofer VIP y Traslados Ejecutivos en Riad | Duyuf Alrahman',
    metaDescription:
      'Reserve chofer VIP ejecutivo en Riad. Recepción en el Aeropuerto King Khalid (RUH), viajes de larga distancia a La Meca y Medina, y pago a la llegada.',
    heroBadge: 'Expansión de Servicios • Capital Riad',
    heroTitle: 'Chofer VIP y Traslados Ejecutivos en Riad y Aeropuerto RUH',
    heroSubtitle:
      'Servicio de chofer de alta gama para ejecutivos, delegaciones y familias en Riad. Recepción en el Aeropuerto King Khalid (RUH) y traslados de larga distancia a La Meca y Medina sin depósito previo.',
    overviewTitle: 'Transporte Ejecutivo al Nivel de la Capital Saudí',
    overviewParagraphs: [
      'Como centro financiero y diplomático de Arabia Saudita, Riad exige puntualidad absoluta y vehículos de máximo lujo.',
      'Duyuf Alrahman VIP ofrece traslados desde todas las terminales del Aeropuerto King Khalid (RUH) y aviación privada hacia KAFD y Olaya.',
      'Especialistas en traslados interurbanos de larga distancia entre Riad y La Meca o Medina en todoterrenos GMC Yukon XL.',
    ],
    routesTitle: 'Rutas Ejecutivas y Tarifas Fijas en Riad',
    routesSubtitle: 'Precios transparentes en SAR con servicios de primera clase',
    routes: [
      {
        id: 'riyadh-airport-transfer',
        title: 'Aeropuerto King Khalid (RUH) ⇄ Hoteles de Riad',
        distance: '45 km',
        duration: '35-50 min',
        priceFromSAR: 200,
        description: 'Recepción ejecutiva con cartel digital, 60 minutos de espera gratuita y asistencia con maletas.',
        badge: 'Traslado Aeropuerto',
      },
      {
        id: 'riyadh-to-makkah',
        title: 'Riad ⇄ Hotel La Meca (Autopista VIP)',
        distance: '870 km',
        duration: '8-9 horas',
        priceFromSAR: 2200,
        description: 'Viaje exclusivo por la Ruta 40 con paradas de descanso y parada en el Miqat para la Umrah.',
        badge: 'Larga Distancia VIP',
      },
      {
        id: 'riyadh-to-madinah',
        title: 'Riad ⇄ Hotel Medina (Autopista VIP)',
        distance: '840 km',
        duration: '8-9 horas',
        priceFromSAR: 2200,
        description: 'Traslado privado desde Riad hasta la puerta de su hotel junto a la Mezquita del Profeta.',
        badge: 'Larga Distancia VIP',
      },
    ],
    fleetTitle: 'Flota Ejecutiva en Riad',
    fleetSubtitle: 'Sedanes de lujo, vans VIP y grandes camionetas americanas',
    featuresTitle: 'Ventajas de Duyuf Alrahman VIP en Riad',
    features: [
      {
        title: 'Recepción en el Aeropuerto RUH',
        desc: 'Recepción en llegadas con letrero digital y manejo cuidadoso de equipaje.',
      },
      {
        title: 'Privacidad en Larga Distancia',
        desc: 'Evite las colas de vuelos domésticos con transporte terrestre directo y privado.',
      },
      {
        title: '100% Pago a la Llegada',
        desc: 'Sin pagos por adelantado. Pague al chofer al llegar en efectivo o tarjeta.',
      },
      {
        title: 'Chofer por Horas',
        desc: 'Vehículo a su disposición para reuniones de negocios y eventos en Riad.',
      },
    ],
    faqsTitle: 'Preguntas Frecuentes — Servicios en Riad',
    faqs: [
      {
        question: '¿Ofrecen servicio desde la Terminal de Aviación Privada?',
        answer: 'Sí, atendemos vuelos privados con vehículos GMC Yukon XL de alta gama.',
      },
      {
        question: '¿Cuánto dura el viaje por carretera de Riad a La Meca?',
        answer: 'El trayecto dura entre 8 y 9 horas por la Ruta 40, incluyendo paradas y visita al Miqat.',
      },
      {
        question: '¿Se puede pagar con tarjeta corporativa?',
        answer: 'Sí, los choferes cuentan con datáfonos inalámbricos que aceptan Visa, Mastercard y Mada.',
      },
      {
        question: '¿El chofer monitoriza los retrasos de nuestro vuelo?',
        answer: 'Sí, monitoreamos los vuelos con 60 minutos de espera gratuita tras el aterrizaje.',
      },
    ],
    ctaTitle: 'Reserve su Chofer Ejecutivo en Riad',
    ctaSubtitle: 'Tarifas fijas • Vehículos de lujo • Pago directo al chofer a la llegada',
    ctaBtn: 'Reservar Chofer en Riad',
    ctaSecondaryBtn: 'Contactar por WhatsApp',
  },
  de: {
    metaTitle: 'VIP Chauffeur & Executive Transfers in Riad | Duyuf Alrahman',
    metaDescription:
      'Buchen Sie VIP-Chauffeurtransfers in Riad. Abholung am Flughafen King Khalid (RUH), Langstreckenfahrten nach Mekka & Medina, und Bezahlung bei Ankunft.',
    heroBadge: 'Service-Erweiterung • Hauptstadt Riad',
    heroTitle: 'VIP-Chauffeur & Executive Transfers in Riad & Flughafen RUH',
    heroSubtitle:
      'Erstklassiger Chauffeurservice für Geschäftsreisende und anspruchsvolle Familien in Riad. Empfang am Flughafen King Khalid (RUH) und Langstreckenfahrten nach Mekka und Medina ohne Anzahlung.',
    overviewTitle: 'Exekutive Mobilität auf höchstem Niveau in Riad',
    overviewParagraphs: [
      'Als diplomatisches und wirtschaftliches Zentrum Saudi-Arabiens verlangt Riad absolute Verlässlichkeit und erstklassigen Komfort.',
      'Duyuf Alrahman VIP bietet nahtlose Transfers von allen Terminals des Flughafens King Khalid (RUH) und dem VIP-Privatjet-Terminal nach KAFD und Olaya.',
      'Für Gäste, die Unabhängigkeit von Inlandsflügen schätzen, bieten wir exklusive Langstreckenfahrten von Riad nach Mekka oder Medina in GMC Yukon XL SUVs.',
    ],
    routesTitle: 'Executive Routen & Festpreise in Riad',
    routesSubtitle: 'Transparente Komplettpreise in SAR inklusive Flugverfolgung',
    routes: [
      {
        id: 'riyadh-airport-transfer',
        title: 'Flughafen King Khalid (RUH) ⇄ Hotels in Riad',
        distance: '45 km',
        duration: '35-50 Min.',
        priceFromSAR: 200,
        description: 'Empfang am Terminal mit digitalem Namensschild, 60 Min. kostenfreie Wartezeit und Gepäckservice.',
        badge: 'Flughafentransfer',
      },
      {
        id: 'riyadh-to-makkah',
        title: 'Riad ⇄ Hotel Mekka (VIP-Fernstraße)',
        distance: '870 km',
        duration: '8-9 Stunden',
        priceFromSAR: 2200,
        description: 'Exklusive Fernreise über Route 40 mit erstklassigen Raststätten und Miqat-Halt für die Umrah.',
        badge: 'Langstrecke VIP',
      },
      {
        id: 'riyadh-to-madinah',
        title: 'Riad ⇄ Hotel Medina (VIP-Fernstraße)',
        distance: '840 km',
        duration: '8-9 Stunden',
        priceFromSAR: 2200,
        description: 'Direkter Chauffeurtransfer von Riad bis vor Ihr Hotel nahe der Prophetenmoschee in Medina.',
        badge: 'Langstrecke VIP',
      },
    ],
    fleetTitle: 'Executive Flotte in Riad',
    fleetSubtitle: 'Premium-Limousinen, VIP-Vans mit Einzelsitzen und amerikanische Luxus-SUVs',
    featuresTitle: 'Ihre Vorteile mit Duyuf Alrahman VIP in Riad',
    features: [
      {
        title: 'Empfang am Flughafen RUH',
        desc: 'Diskreter Empfang mit digitalem Namensschild und zuvorkommender Gepäckhilfe.',
      },
      {
        title: 'Vollkommene Privatsphäre',
        desc: 'Reisen Sie unabhängig von Flugplänen direkt von Haustür zu Haustür.',
      },
      {
        title: '100% Zahlung bei Ankunft',
        desc: 'Keine Anzahlung. Zahlen Sie bequem am Zielort bar oder mit Karte beim Fahrer.',
      },
      {
        title: 'Chauffeur auf Stundenbasis',
        desc: 'Bereitstellung für Termine im KAFD, Botschaftsbesuche und exklusive Anlässe.',
      },
    ],
    faqsTitle: 'Häufig gestellte Fragen — Chauffeur in Riad',
    faqs: [
      {
        question: 'Bieten Sie Transfers vom Privatjet-Terminal an?',
        answer: 'Ja, wir bedienen das Private Aviation Terminal mit GMC Yukon XL Luxusfahrzeugen.',
      },
      {
        question: 'Wie lange dauert die Fahrt von Riad nach Mekka?',
        answer: 'Die Fahrt dauert etwa 8 bis 9 Stunden über Route 40 inklusive Pausen und Miqat-Aufenthalt.',
      },
      {
        question: 'Kann mit Firmenkarte gezahlt werden?',
        answer: 'Ja, unsere Fahrer führen mobile Kartenterminals mit (Visa, Mastercard, Mada) und stellen Belege aus.',
      },
      {
        question: 'Was passiert bei Flugverspätungen nach Riad?',
        answer: 'Wir überwachen die Flüge live; 60 Minuten Wartezeit nach Landung sind kostenfrei inkludiert.',
      },
    ],
    ctaTitle: 'Buchen Sie Ihren Executive Chauffeur in Riad',
    ctaSubtitle: 'Garantierte Festpreise • Premium-Fahrzeuge • Zahlung bei Ankunft beim Fahrer',
    ctaBtn: 'Chauffeur in Riad buchen',
    ctaSecondaryBtn: 'Über WhatsApp anfragen',
  },
  hi: {
    metaTitle: 'रियाद और किंग खालिद एयरपोर्ट वीआईपी चौफ़र | दुयूफ़ अल-रहमान',
    metaDescription:
      'रियाद में वीआईपी एग्जीक्यूटिव चौफ़र ट्रांसफर बुक करें। किंग खालिद एयरपोर्ट (RUH) पिकअप, मक्का और मदीना के लिए लंबी दूरी का सफर, पहुंचने पर भुगतान।',
    heroBadge: 'सेवा विस्तार • राजधानी रियाद केंद्र',
    heroTitle: 'रियाद और किंग खालिद एयरपोर्ट के लिए वीआईपी एग्जीक्यूटिव चौफ़र',
    heroSubtitle:
      'कारोबारी अधिकारियों और वीआईपी परिवारों के लिए रियाद में प्रीमियम सेवा। किंग खालिद इंटरनेशनल एयरपोर्ट (RUH) से स्वागत, मक्का और मदीना के लिए लंबी दूरी की सीधी यात्रा बिना अग्रिम भुगतान।',
    overviewTitle: 'सऊदी राजधानी के अनुरूप एग्जीक्यूटिव वीआईपी सेवा',
    overviewParagraphs: [
      'सऊदी अरब के कूटनीतिक और आर्थिक केंद्र के रूप में रियाद में समय की पाबंदी और गोपनीयता अत्यंत महत्वपूर्ण है।',
      'दुयूफ़ अल-रहमान किंग खालिद एयरपोर्ट (RUH) के सभी टर्मिनलों और प्राइवेट जेट टर्मिनल से केएएफडी (KAFD) और ओलाया के लिए लग्जरी गाड़ियां उपलब्ध कराता है।',
      'घरेलू उड़ानों की कतारों से बचते हुए मक्का और मदीना के लिए जीएमसी यूकॉन एक्सएल में सीधी व आरामदायक हाईवे यात्रा हमारी विशेषता है।',
    ],
    routesTitle: 'रियाद के लिए एग्जीक्यूटिव मार्ग और निश्चित दरें',
    routesSubtitle: 'सऊदी रियाल में निश्चित मूल्य जिसमें सभी सुविधाएं व फ्लाइट ट्रैकिंग शामिल हैं',
    routes: [
      {
        id: 'riyadh-airport-transfer',
        title: 'किंग खालिद एयरपोर्ट (RUH) ⇄ रियाद होटल',
        distance: '45 किमी',
        duration: '35-50 मिनट',
        priceFromSAR: 200,
        description: 'डिजिटल नेम बोर्ड के साथ टर्मिनल पर स्वागत, 60 मिनट निःशुल्क प्रतीक्षा और होटल तक सुरक्षित ड्रॉप।',
        badge: 'एयरपोर्ट ट्रांसफर',
      },
      {
        id: 'riyadh-to-makkah',
        title: 'रियाद ⇄ मक्का होटल (वीआईपी हाईवे)',
        distance: '870 किमी',
        duration: '8-9 घंटे',
        priceFromSAR: 2200,
        description: 'रूट 40 पर पूर्णतः निजी लग्जरी सफर जिसमें उत्तम रेस्ट स्टॉप और उमरा के लिए मीक़ात पर ठहराव शामिल है।',
        badge: 'लंबी दूरी वीआईपी',
      },
      {
        id: 'riyadh-to-madinah',
        title: 'रियाद ⇄ मदीना होटल (वीआईपी हाईवे)',
        distance: '840 किमी',
        duration: '8-9 घंटे',
        priceFromSAR: 2200,
        description: 'रियाद से सीधे मस्जिद-ए-नबवी के पास स्थित आपके होटल तक का निर्बाध और आरामदायक सफर।',
        badge: 'लंबी दूरी वीआईपी',
      },
    ],
    fleetTitle: 'रियाद के लिए एग्जीक्यूटिव फ्लीट',
    fleetSubtitle: 'प्रीमियम सेडान, कैप्टन सीट वाली वीआईपी वैन और बड़ी अमेरिकी लग्जरी एसयूवी',
    featuresTitle: 'रियाद में दुयूफ़ अल-रहमान क्यों चुनें?',
    features: [
      {
        title: 'RUH एयरपोर्ट पर स्वागत',
        desc: 'डिजिटल नेम बोर्ड के साथ आगमन हॉल में स्वागत और सामान में पेशेवर मदद।',
      },
      {
        title: 'लंबी दूरी के सफर में पूर्ण गोपनीयता',
        desc: 'घरेलू उड़ानों की लंबी कतारों से बचते हुए सीधे गंतव्य तक निजी यात्रा।',
      },
      {
        title: 'पहुंचने पर 100% भुगतान',
        desc: 'कोई अग्रिम भुगतान नहीं। पहुंचने पर नकद या कार्ड से ड्राइवर को भुगतान करें।',
      },
      {
        title: 'घंटे के आधार पर चौफ़र',
        desc: 'केएएफडी में व्यावसायिक बैठकों और कार्यक्रमों के लिए गाड़ी आपके पास उपलब्ध।',
      },
    ],
    faqsTitle: 'रियाद चौफ़र सेवा से जुड़े सामान्य प्रश्न',
    faqs: [
      {
        question: 'क्या आप प्राइवेट एविएशन टर्मिनल से भी पिकअप देते हैं?',
        answer: 'हाँ, हम प्राइवेट जेट टर्मिनल से जीएमसी यूकॉन एक्सएल गाड़ियों के साथ वीआईपी सेवा देते हैं।',
      },
      {
        question: 'रियाद से मक्का जाने में कितना समय लगता है?',
        answer: 'रूट 40 से यात्रा में ठहराव और मीक़ात सहित लगभग 8 से 9 घंटे का समय लगता है।',
      },
      {
        question: 'क्या हम कॉरपोरेट या क्रेडिट कार्ड से भुगतान कर सकते हैं?',
        answer: 'हाँ, हमारे ड्राइवरों के पास कार्ड मशीन होती है जिससे वीजा, मास्टरकार्ड स्वीकार होते हैं।',
      },
      {
        question: 'यदि फ्लाइट लेट हो जाए तो क्या होगा?',
        answer: 'हम फ्लाइट को लाइव ट्रैक करते हैं और लैंडिंग के बाद 60 मिनट का इंतजार बिल्कुल मुफ्त है।',
      },
    ],
    ctaTitle: 'रियाद में अपना एग्जीक्यूटिव चौफ़र बुक करें',
    ctaSubtitle: 'निश्चित किराया • लग्जरी गाड़ियां • पहुंचने पर नकद या कार्ड से भुगतान',
    ctaBtn: 'रियाद चौफ़र बुक करें',
    ctaSecondaryBtn: 'व्हाट्सएप पर बात करें',
  },
  tr: {
    metaTitle: 'Riyad ve King Khalid Havalimanı VIP Özel Şoför | Duyuf Alrahman',
    metaDescription:
      'Riyad’da VIP özel şoförlü transfer ayırtın. King Khalid Havalimanı (RUH) karşılama, Mekke ve Medine’ye uzun mesafe lüks transfer, varışta ödeme.',
    heroBadge: 'Hizmet Genişletme • Başkent Riyad Merkezi',
    heroTitle: 'Riyad Şehir ve RUH Havalimanı İçin VIP Özel Şoför',
    heroSubtitle:
      'Riyad’da iş insanları ve aileler için üst düzey özel transfer. King Khalid Uluslararası Havalimanı (RUH) karşılaması, Mekke ve Medine’ye konforlu otoyol transferleri ve sıfır ön ödeme.',
    overviewTitle: 'Suudi Başkentine Yakışır Seçkin Ulaşım',
    overviewParagraphs: [
      'Suudi Arabistan’ın diplomatik ve ticari kalbi olan Riyad, dakiklik ve lüks standartlarının en üst düzeyde olmasını gerektirir.',
      'Duyuf Alrahman VIP, King Khalid Havalimanı (RUH) ve Özel Havacılık Terminali’nden KAFD, Olaya ve Diplomatik Bölge’ye lüks araçlarla transfer sağlar.',
      'İç hat uçuş sıralarından kaçınmak isteyenler için Riyad’dan Mekke ve Medine’ye GMC Yukon XL araçlarımızla uzun yol konforu sunuyoruz.',
    ],
    routesTitle: 'Riyad İçin Özel Güzergahlar ve Sabit Fiyatlar',
    routesSubtitle: 'Uçuş takibi ve birinci sınıf konfor dahil SAR cinsinden garantili net fiyatlar',
    routes: [
      {
        id: 'riyadh-airport-transfer',
        title: 'King Khalid Havalimanı (RUH) ⇄ Riyad Otelleri',
        distance: '45 km',
        duration: '35-50 dk',
        priceFromSAR: 200,
        description: 'Dijital isimlikle karşılama, 60 dakika ücretsiz bekleme ve otele direkt konforlu ulaşım.',
        badge: 'Havalimanı Transferi',
      },
      {
        id: 'riyadh-to-makkah',
        title: 'Riyad ⇄ Mekke Oteli (VIP Otoyol)',
        distance: '870 km',
        duration: '8-9 saat',
        priceFromSAR: 2200,
        description: '40 numaralı otoyolda mola yerleri ve Umre için Mikat ziyareti dahil lüks uzun mesafe yolculuk.',
        badge: 'Uzun Yol VIP',
      },
      {
        id: 'riyadh-to-madinah',
        title: 'Riyad ⇄ Medine Oteli (VIP Otoyol)',
        distance: '840 km',
        duration: '8-9 saat',
        priceFromSAR: 2200,
        description: 'Riyad’dan Mescid-i Nebevi yakınındaki otelinize doğrudan kesintisiz özel transfer.',
        badge: 'Uzun Yol VIP',
      },
    ],
    fleetTitle: 'Riyad İçin Lüks VIP Araç Filosu',
    fleetSubtitle: 'Prestijli sedanlar, kaptan koltuklu VIP vanlar ve Amerikan lüks SUV araçları',
    featuresTitle: 'Riyad’da Duyuf Alrahman VIP Tercih Nedenleri',
    features: [
      {
        title: 'RUH Havalimanında Karşılama',
        desc: 'Geliş salonunda dijital isimlikle karşılama ve bagaj yardım hizmeti.',
      },
      {
        title: 'Uzun Yolda Tam Mahremiyet',
        desc: 'İç hat uçuş zahmetine girmeden ailenizle kapıdan kapıya özel seyahat.',
      },
      {
        title: '%100 Varışta Şoföre Ödeme',
        desc: 'Ön ödeme yok. Ücreti varışta şoföre nakit veya kartla ödeyin.',
      },
      {
        title: 'Saatlik Şoför Hizmeti',
        desc: 'KAFD ve Riyad’daki iş toplantılarınız için gün boyu hazır bekleyen özel şoför.',
      },
    ],
    faqsTitle: 'Riyad Ulaşımı Hakkında Sıkça Sorulan Sorular',
    faqs: [
      {
        question: 'Özel Havacılık Terminali’nden karşılama yapıyor musunuz?',
        answer: 'Evet, özel jet terminalinden GMC Yukon XL araçlarımızla karşılama yapıyoruz.',
      },
      {
        question: 'Riyad’dan Mekke’ye karayoluyla gitmek ne kadar sürer?',
        answer: 'Mola ve Mikat duraklamalarıyla birlikte yolculuk yaklaşık 8 ila 9 saat sürer.',
      },
      {
        question: 'Şirket kartı veya kredi kartı ile ödeme yapabilir miyiz?',
        answer: 'Evet, şoförlerimizde Visa, Mastercard ve Mada kabul eden POS cihazları bulunmaktadır.',
      },
      {
        question: 'Uçağımız rötarlı inerse şoför bekler mi?',
        answer: 'Evet, uçuşlar canlı takip edilir ve inişten sonra 60 dakika bekleme tamamen ücretsizdir.',
      },
    ],
    ctaTitle: 'Riyad’da Özel Şoförünüzü Şimdi Ayırtın',
    ctaSubtitle: 'Sabit fiyatlar • Lüks araçlar • Varışta nakit veya kartla ödeme imkanı',
    ctaBtn: 'Riyad Şoförü Ayırtın',
    ctaSecondaryBtn: "WhatsApp'tan Yazın",
  },
};
