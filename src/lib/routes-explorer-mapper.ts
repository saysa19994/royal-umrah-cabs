import type { Locale } from '@/i18n/config';
import type { AdminRouteData } from '@/types/content';
import { AUTHORITATIVE_TRANSFER_RATES, LOCALIZED_ROUTE_NAMES } from '@/lib/pricing-constants';
import type { TransferRatesMap } from '@/lib/pricing-db';

export interface ExplorerRouteItem {
  id: string;
  title: string;
  origin: string;
  destination: string;
  originCode: string;
  destinationCode: string;
  description: string;
  distanceKm: number | null;
  durationMinutes: number | null;
  miqatStopAllowed: boolean;
  startingPriceSAR: number | null;
  image: string | null;
  imagePosition: string;
  hasGuidePage: boolean;
  bookingHref: string;
  guideHref: string | null;
}

const ROUTE_MEDIA_CONFIG: Record<string, { src: string; pos: string }> = {
  'jeddah-airport-to-makkah': {
    src: '/assets/images/routes/jeddah-airport-to-makkah.jpg',
    pos: 'object-[50%_55%]',
  },
  'makkah-to-jeddah-airport': {
    src: '/assets/blueprint/blog/makkah-to-jeddah-airport-transfer.webp',
    pos: 'object-[50%_45%]',
  },
  'makkah-to-madinah': {
    src: '/assets/images/routes/makkah-to-madinah.jpg',
    pos: 'object-[50%_42%]',
  },
  'madinah-to-makkah': {
    src: '/assets/blueprint/blog/private-transfer-makkah-to-madinah.webp',
    pos: 'object-center',
  },
  'madinah-airport-to-hotel': {
    src: '/assets/images/routes/madinah-airport.jpg',
    pos: 'object-[50%_42%]',
  },
  'jeddah-to-madinah': {
    src: '/assets/images/routes/jeddah-to-madinah.jpg',
    pos: 'object-[50%_42%]',
  },
  'jeddah-airport-to-madinah': {
    src: '/assets/images/routes/jeddah-to-madinah.jpg',
    pos: 'object-[50%_42%]',
  },
  'makkah-to-taif': {
    src: '/assets/images/routes/makkah-to-taif.jpg',
    pos: 'object-[50%_40%]',
  },
  'taif-to-makkah': {
    src: '/assets/blueprint/blog/makkah-to-taif-private-transfer.webp',
    pos: 'object-center',
  },
  'jeddah-to-taif': {
    src: '/assets/images/cinematic/services/services-suv-highway.jpg',
    pos: 'object-[38%_55%]',
  },
  'riyadh-airport-transfer': {
    src: '/assets/images/routes/riyadh-airport-transfer.webp',
    pos: 'object-[50%_45%]',
  },
  'riyadh-to-makkah': {
    src: '/assets/images/routes/riyadh-to-makkah.webp',
    pos: 'object-[50%_45%]',
  },
  'riyadh-to-madinah': {
    src: '/assets/images/routes/riyadh-to-makkah.webp',
    pos: 'object-[50%_45%]',
  },
};

const ROUTE_GUIDE_SLUGS = new Set([
  'jeddah-airport-to-makkah',
  'makkah-to-madinah',
  'madinah-to-makkah',
  'makkah-to-jeddah-airport',
  'jeddah-to-madinah',
  'madinah-airport-to-hotel',
  'makkah-to-taif',
  'taif-to-makkah',
  'jeddah-to-taif',
  'riyadh-airport-transfer',
  'riyadh-to-makkah',
  'riyadh-to-madinah',
]);

interface RouteCopyEntry {
  origin: Record<Locale, string>;
  destination: Record<Locale, string>;
  description: Record<Locale, string>;
}

const ROUTE_LOCALIZED_COPY: Record<string, RouteCopyEntry> = {
  'jeddah-airport-to-makkah': {
    origin: {
      en: 'Jeddah Airport (KAIA)',
      ar: 'مطار جدة (KAIA)',
      ms: 'Lapangan Terbang Jeddah (KAIA)',
      id: 'Bandara Jeddah (KAIA)',
      ur: 'جدہ ایئرپورٹ (KAIA)',
      fr: 'Aéroport de Djeddah (KAIA)',
      es: 'Aeropuerto de Yeda (KAIA)',
      de: 'Flughafen Dschidda (KAIA)',
      tr: 'Cidde Havalimanı (KAIA)',
      hi: 'जेद्दा हवाई अड्डा (KAIA)',
    },
    destination: {
      en: 'Makkah Hotel Lobby',
      ar: 'فنادق مكة المكرمة',
      ms: 'Lobi Hotel Makkah',
      id: 'Lobi Hotel Makkah',
      ur: 'مکہ ہوٹل لابی',
      fr: 'Hôtel à La Mecque',
      es: 'Hotel en La Meca',
      de: 'Hotel in Mekka',
      tr: 'Mekke Oteli',
      hi: 'मक्का होटल लॉबी',
    },
    description: {
      en: 'Direct private terminal meet and greet at KAIA (Terminal 1 & North) with live flight monitoring, full luggage assistance, and smooth expressway delivery straight to your Makkah hotel.',
      ar: 'استقبال شخصي داخل صالات مطار الملك عبدالعزيز بجدة (الصالة 1 والشمالية) مع تتبع حي للرحلة ومساعدة الحقائب وإيصال مباشر لبهو فندقك بمكة.',
      ms: 'Sambutan peribadi terus di balai ketibaan KAIA Jeddah dengan penjejakan penerbangan masa nyata, bantuan bagasi dan terus ke lobi hotel di Makkah.',
      id: 'Penyambutan pribadi langsung di terminal kedatangan Bandara Jeddah KAIA dengan pantauan pesawat real-time, bantuan bagasi, langsung ke hotel Makkah.',
      ur: 'جدہ ایئرپورٹ کی آمد ہال میں ذاتی استقبال، براہِ راست فلائٹ ٹریکنگ، سامان کی سہولت اور مکہ مکرمہ میں آپ کے ہوٹل تک سیدھی رسائی۔',
      fr: 'Accueil nominatif au terminal de Djeddah (KAIA) avec suivi des vols en temps réel, aide aux bagages et trajet direct jusqu’à votre hôtel à La Mecque.',
      es: 'Bienvenida privada en la terminal de Yeda (KAIA) con seguimiento de vuelos en vivo, asistencia de equipaje y traslado directo a su hotel en La Meca.',
      de: 'Persönlicher Empfang am Terminal in Dschidda (KAIA) mit Live-Flugverfolgung, Gepäckhilfe und direkter Fahrt bis zu Ihrem Hotel in Mekka.',
      tr: 'Cidde Havalimanı gelen yolcu kapısında isimle karşılama, canlı uçuş takibi, bagaj yardımı ve Mekke otelinize doğrudan özel ulaşım.',
      hi: 'जेद्दा एयरपोर्ट टर्मिनल पर व्यक्तिगत स्वागत, लाइव फ्लाइट ट्रैकिंग, सामान सहायता और सीधे आपके मक्का होटल तक आरामदायक यात्रा।',
    },
  },
  'makkah-to-jeddah-airport': {
    origin: {
      en: 'Makkah Hotel',
      ar: 'فنادق مكة المكرمة',
      ms: 'Hotel Makkah',
      id: 'Hotel Makkah',
      ur: 'مکہ ہوٹل',
      fr: 'Hôtel La Mecque',
      es: 'Hotel La Meca',
      de: 'Hotel Mekka',
      tr: 'Mekke Oteli',
      hi: 'मक्का होटल',
    },
    destination: {
      en: 'Jeddah Airport (KAIA)',
      ar: 'مطار جدة (KAIA)',
      ms: 'Lapangan Terbang Jeddah (KAIA)',
      id: 'Bandara Jeddah (KAIA)',
      ur: 'جدہ ایئرپورٹ (KAIA)',
      fr: 'Aéroport de Djeddah (KAIA)',
      es: 'Aeropuerto de Yeda (KAIA)',
      de: 'Flughafen Dschidda (KAIA)',
      tr: 'Cidde Havalimanı (KAIA)',
      hi: 'जेद्दा हवाई अड्डा (KAIA)',
    },
    description: {
      en: 'Punctual hotel lobby pickup in Makkah timed around your flight departure, offering generous trunk capacity for large luggage and 5-liter Zamzam containers straight to KAIA terminals.',
      ar: 'التزام دقيق بالانطلاق من بهو فندقك بمكة حسب موعد رحلتك، مع مساحات أمتعة وفيرة تتسع للحقائب وعبوات مياه زمزم حتى صالات المغادرة بجدة.',
      ms: 'Pengambilan tepat masa dari hotel Makkah mengikut jadual pelepasan anda dengan ruang bagasi yang luas termasuk kotak air Zamzam terus ke terminal KAIA.',
      id: 'Penjemputan tepat waktu dari hotel Makkah menuju terminal keberangkatan Bandara Jeddah dengan bagasi luas untuk koper dan galon air Zamzam.',
      ur: 'فلائٹ کے وقت کے عین مطابق مکہ کے ہوٹل سے روانگی، بڑے سوٹ کیسز اور آبِ زمزم کے لیے کشادہ گنجائش کے ساتھ جدہ ایئرپورٹ روانگی ٹرمینل تک رسائی۔',
      fr: 'Départ ponctuel de votre hôtel à La Mecque vers les terminaux de Djeddah, avec un vaste coffre prévu pour vos valises et bidons de Zamzam.',
      es: 'Recogida puntual en su hotel de La Meca rumbo a las terminales de salida de Yeda, con amplio espacio para equipaje y envases de agua Zamzam.',
      de: 'Pünktliche Abholung an Ihrem Hotel in Mekka direkt zum Abflugterminal in Dschidda, mit großzügigem Kofferraum für Gepäck und Zamzam-Kanister.',
      tr: 'Uçuş saatinize tam uyumlu olarak Mekke otelinizden alınıp valizleriniz ve Zemzem bidonlarınız için geniş bagajla Cidde terminallerine ulaşım.',
      hi: 'आपकी उड़ान के अनुसार मक्का होटल से समयबद्ध पिकअप, बड़े सूटकेस और 5-लीटर जमजम बॉक्स के लिए पर्याप्त स्थान के साथ सीधे जेद्दा टर्मिनल तक सफर।',
    },
  },
  'makkah-to-madinah': {
    origin: {
      en: 'Makkah Hotel',
      ar: 'مكة المكرمة',
      ms: 'Hotel Makkah',
      id: 'Hotel Makkah',
      ur: 'مکہ مکرمہ',
      fr: 'La Mecque',
      es: 'La Meca',
      de: 'Mekka',
      tr: 'Mekke',
      hi: 'मक्का',
    },
    destination: {
      en: 'Madinah Hotel',
      ar: 'المدينة المنورة',
      ms: 'Hotel Madinah',
      id: 'Hotel Madinah',
      ur: 'مدینہ منورہ',
      fr: 'Médine',
      es: 'Medina',
      de: 'Medina',
      tr: 'Medine',
      hi: 'मदीना',
    },
    description: {
      en: 'Serene 440 km door-to-door highway transfer linking the Two Holy Cities via the Hijrah Expressway with clean rest stops for prayer and family refreshment along the way.',
      ar: 'رحلة برية هادئة ومباشرة لمسافة 440 كم عبر طريق الهجرة السريع بين الحرمين الشريفين مع وقفات منظمة للصلاة والاستراحة في محطات نموذجية.',
      ms: 'Perjalanan lebuh raya 440 km yang tenang menghubungkan Dua Tanah Suci dari pintu hotel ke hotel dengan hentian rehat dan solat yang selesa.',
      id: 'Perjalanan tol Hijrah 440 km yang tenang dari hotel ke hotel antara Dua Tanah Suci dengan fasilitas berhenti salat dan istirahat.',
      ur: 'حرمین شریفین کے درمیان شاہراہِ ہجرت پر 440 کلومیٹر کا پُرسکون اور براہِ راست سفر، راستے میں نماز اور آرام کے معیاری وقفوں سمیت۔',
      fr: 'Liaison autoroutière sereine de 440 km d’hôtel à hôtel entre les Deux Saintes Mosquées avec haltes prière et repos tout au long du trajet.',
      es: 'Travesía serena de 440 km por autopista entre las Dos Ciudades Santas de hotel a hotel, con cómodas paradas para descanso y oración.',
      de: 'Ruhige 440-km-Autobahnfahrt von Hotel zu Hotel zwischen den beiden Heiligen Städten inklusive sauberer Gebets- und Rastpausen.',
      tr: 'İki Harem arasında Hicret otoyolu üzerinden 440 km’lik huzurlu otelden otele yolculuk, namaz ve dinlenme molaları dahil.',
      hi: 'दोनों पवित्र मस्जिदों के बीच 440 किमी की शांत हिजरत हाईवे यात्रा, रास्ते में नमाज और विश्राम के आरामदायक स्टॉप सहित।',
    },
  },
  'madinah-to-makkah': {
    origin: {
      en: 'Madinah Hotel',
      ar: 'المدينة المنورة',
      ms: 'Hotel Madinah',
      id: 'Hotel Madinah',
      ur: 'مدینہ منورہ',
      fr: 'Médine',
      es: 'Medina',
      de: 'Medina',
      tr: 'Medine',
      hi: 'मदीना',
    },
    destination: {
      en: 'Makkah Hotel',
      ar: 'مكة المكرمة',
      ms: 'Hotel Makkah',
      id: 'Hotel Makkah',
      ur: 'مکہ مکرمہ',
      fr: 'La Mecque',
      es: 'La Meca',
      de: 'Mekka',
      tr: 'Mekke',
      hi: 'मक्का',
    },
    description: {
      en: 'Sacred Umrah journey from Madinah to Makkah featuring a dedicated, unhurried stop at Masjid Miqat Dhu al-Hulayfah (Bir Ali) to perform Ihram preparations before direct hotel delivery.',
      ar: 'رحلة العمرة من المدينة إلى مكة تتضمن توقفاً مخصصاً ومريحاً في مسجد ميقات ذي الحليفة (آبار علي) للإحرام وصلاة الركعتين قبل التوجه المباشر لفندقكم بمكة.',
      ms: 'Perjalanan Umrah dari Madinah ke Makkah lengkap dengan hentian khas tanpa tergesa-gesa di Masjid Miqat Bir Ali untuk persiapan Ihram terus ke hotel Makkah.',
      id: 'Perjalanan Umrah dari Madinah ke Makkah disertai waktu tunggu khusus di Masjid Miqat Bir Ali untuk persiapan Ihram sebelum diantar ke hotel.',
      ur: 'مدینہ منورہ سے مکہ مکرمہ کا مبارک سفر جس میں مسجد میقات ذوالحلیفہ (بیئر علی) پر احرام اور نماز کے لیے اطمینان بخش توقف شامل ہے۔',
      fr: 'Voyage spirituel de Médine vers La Mecque incluant un arrêt paisible au Miqat de Bir Ali pour l’entrée en Ihram avant votre arrivée à l’hôtel.',
      es: 'Ruta sagrada de Medina a La Meca con parada dedicada y sin prisas en Miqat Bir Ali para vestir el Ihram antes de llegar a su hotel.',
      de: 'Umrah-Fahrt von Medina nach Mekka inklusive ruhigem Halt an der Miqat-Moschee Bir Ali zur Ihram-Vorbereitung vor direkter Hotelankunft.',
      tr: 'Medine’den Mekke’ye umre yolculuğu; İhram hazırlığı için Zülhuleyfe (Bir Ali) Mikat Mescidi’nde acele etmeden bekleme durağı dahildir.',
      hi: 'मदीना से मक्का की पावन उमराह यात्रा, जिसमें एहराम की तैयारी के लिए मस्जिदे मीक़ात बीर अली पर आराम से रुकने की सुविधा शामिल है।',
    },
  },
  'madinah-airport-to-hotel': {
    origin: {
      en: 'Madinah Airport (MED)',
      ar: 'مطار المدينة (MED)',
      ms: 'Lapangan Terbang Madinah (MED)',
      id: 'Bandara Madinah (MED)',
      ur: 'مدینہ ایئرپورٹ (MED)',
      fr: 'Aéroport de Médine (MED)',
      es: 'Aeropuerto de Medina (MED)',
      de: 'Flughafen Medina (MED)',
      tr: 'Medine Havalimanı (MED)',
      hi: 'मदीना हवाई अड्डा (MED)',
    },
    destination: {
      en: 'Central Haram Hotel',
      ar: 'فنادق المنطقة المركزية',
      ms: 'Hotel Pusat Haram',
      id: 'Hotel Pusat Haram',
      ur: 'مرکزی حرم ہوٹل',
      fr: 'Hôtel Proche du Haram',
      es: 'Hotel Zona Central',
      de: 'Hotel im Zentralbereich',
      tr: 'Merkezi Otel Bölgesi',
      hi: 'सेंट्रल हरम होटल',
    },
    description: {
      en: 'Swift private pickup from Prince Mohammad Bin Abdulaziz Airport (MED) arrivals straight to central hotels surrounding Al-Masjid an-Nabawi in 25 to 30 minutes.',
      ar: 'استقبال سريع من مطار الأمير محمد بن عبدالعزيز بالمدينة المنورة وإيصال مباشر إلى فنادق المنطقة المركزية المحيطة بالمسجد النبوي خلال 25 إلى 30 دقيقة.',
      ms: 'Pengambilan pantas dari Lapangan Terbang Madinah (MED) terus ke hotel sekitar Masjid Nabawi dalam masa sekitar 25 hingga 30 minit.',
      id: 'Jemputan cepat dari Bandara Madinah (MED) langsung ke hotel area Masjid Nabawi hanya dalam waktu sekitar 25 hingga 30 menit.',
      ur: 'مدینہ ایئرپورٹ (MED) سے استقبال اور صرف 25 تا 30 منٹ میں مسجدِ نبوی شریف کے گرد مرکزی ہوٹل تک باوقار رسائی۔',
      fr: 'Prise en charge rapide dès l’aéroport de Médine (MED) jusqu’à votre hôtel aux abords de la Mosquée du Prophète en 25 à 30 minutes.',
      es: 'Recogida ágil en el aeropuerto de Medina (MED) directamente hasta su hotel en la zona central junto a la Mezquita del Profeta en 25–30 min.',
      de: 'Schnelle Abholung am Flughafen Medina (MED) direkt zu den zentralen Hotels rund um die Prophetenmoschee in 25 bis 30 Minuten.',
      tr: 'Medine Havalimanı (MED) çıkışından Mescid-i Nebevî çevresindeki otellere 25–30 dakika içinde konforlu özel transfer.',
      hi: 'मदीना एयरपोर्ट (MED) से त्वरित पिकअप और 25 से 30 मिनट में मस्जिदे नबवी के पास आपके होटल तक सीधी डिलीवरी।',
    },
  },
  'jeddah-to-madinah': {
    origin: {
      en: 'Jeddah Airport / City',
      ar: 'مطار أو مدينة جدة',
      ms: 'Bandar / Lapangan Terbang Jeddah',
      id: 'Bandara / Kota Jeddah',
      ur: 'جدہ ایئرپورٹ / شہر',
      fr: 'Djeddah Aéroport / Ville',
      es: 'Yeda Aeropuerto / Ciudad',
      de: 'Dschidda Flughafen / Stadt',
      tr: 'Cidde Havalimanı / Şehir',
      hi: 'जेद्दा एयरपोर्ट / शहर',
    },
    destination: {
      en: 'Madinah Hotel',
      ar: 'المدينة المنورة',
      ms: 'Hotel Madinah',
      id: 'Hotel Madinah',
      ur: 'مدینہ منورہ',
      fr: 'Hôtel Médine',
      es: 'Hotel Medina',
      de: 'Hotel Medina',
      tr: 'Medine Oteli',
      hi: 'मदीना होटल',
    },
    description: {
      en: 'Direct 410 km private expressway journey tailored for guests landing at Jeddah Airport who prefer beginning their pilgrimage peacefully in Madinah Al-Munawwarah.',
      ar: 'نقل مباشر لمسافة 410 كم من صالات مطار جدة أو فنادقها إلى المدينة المنورة للضيوف الراغبين في استهلال رحلتهم بجوار المسجد النبوي الشريف.',
      ms: 'Perjalanan terus 410 km dari Jeddah bagi jemaah yang memulakan ziarah Umrah di Madinah Al-Munawwarah dalam keselesaan peribadi.',
      id: 'Perjalanan langsung 410 km dari Jeddah menuju Madinah Al-Munawwarah bagi jamaah yang mengawali ibadah dengan berziarah ke Masjid Nabawi.',
      ur: 'جدہ سے مدینہ منورہ تک 410 کلومیٹر کا براہِ راست پرائیویٹ سفر ان زائرین کے لیے جو اپنے سفر کا آغاز مدینہ طیبہ سے کرنا چاہتے ہیں۔',
      fr: 'Trajet direct de 410 km idéal pour les pèlerins atterrissant à Djeddah et souhaitant entamer leur séjour spirituel à Médine.',
      es: 'Viaje directo de 410 km para peregrinos que aterrizan en Yeda y desean iniciar su estancia espiritual en Medina.',
      de: 'Direkte 410-km-Fahrt für Pilger, die in Dschidda landen und ihren Aufenthalt zunächst in Medina beginnen möchten.',
      tr: 'Cidde’ye inip ziyaretine doğrudan Medine-i Münevvere’de başlamak isteyen misafirler için 410 km kesintisiz özel transfer.',
      hi: 'जेद्दा में उतरकर अपनी यात्रा की शांतिपूर्ण शुरुआत मदीना अल-मुनव्वरा से करने के इच्छुक तीर्थयात्रियों के लिए 410 किमी की सीधी यात्रा।',
    },
  },
  'makkah-to-taif': {
    origin: {
      en: 'Makkah Hotel',
      ar: 'مكة المكرمة',
      ms: 'Hotel Makkah',
      id: 'Hotel Makkah',
      ur: 'مکہ مکرمہ',
      fr: 'La Mecque',
      es: 'La Meca',
      de: 'Mekka',
      tr: 'Mekke',
      hi: 'मक्का',
    },
    destination: {
      en: 'Taif & Al Hada',
      ar: 'الطائف والهدا',
      ms: 'Taif & Al Hada',
      id: 'Taif & Al Hada',
      ur: 'طائف اور الھدا',
      fr: 'Taïf & Al Hada',
      es: 'Taif y Al Hada',
      de: 'Taif & Al Hada',
      tr: 'Taif & El-Hada',
      hi: 'ताइफ़ व अल हदा',
    },
    description: {
      en: 'Scenic 90 km climb along the winding Al Hada mountain route from Makkah hotels up to the cool highlands, traditional rose farms, and resorts of Taif.',
      ar: 'صعود بانورامي لمسافة 90 كم من فنادق مكة عبر عقبة الهدا إلى مرتفعات الطائف المعتدلة، مزارع الورد الطائفي، والتلفريك بقيادة جبلية آمنة.',
      ms: 'Laluan indah 90 km mendaki pergunungan Al Hada dari Makkah menuju ladang mawar dan udara dingin tanah tinggi Taif.',
      id: 'Perjalanan pegunungan indah 90 km melintasi jalur Al Hada dari Makkah menuju kebun mawar dan kawasan sejuk kota Taif.',
      ur: 'مکہ مکرمہ سے الھدا کے خوبصورت پہاڑی راستے سے 90 کلومیٹر کا پُرفضا سفر طائف کے باغات اور سرد مقامات تک۔',
      fr: 'Montée panoramique de 90 km depuis La Mecque via le col d’Al Hada vers les roseraies et les hauteurs fraîches de Taïf.',
      es: 'Ascenso panorámico de 90 km desde La Meca por la ruta de Al Hada hasta las montañas frescas y campos de rosas de Taif.',
      de: 'Panoramafahrt über 90 km von Mekka über die Al-Hada-Bergstraße hinauf in das kühle Hochland und zu den Rosenfarmen von Taif.',
      tr: 'Mekke’den El-Hada dağ geçidi üzerinden Taif’in serin yaylalarına ve gül bahçelerine uzanan 90 km panoramik özel yolculuk.',
      hi: 'मक्का होटल से अल हदा पर्वतीय मार्ग होते हुए ताइफ़ के गुलाब बागानों और ठंडी वादियों तक 90 किमी का मनोरम सफर।',
    },
  },
  'taif-to-makkah': {
    origin: {
      en: 'Taif City / Resorts',
      ar: 'الطائف والهدا',
      ms: 'Bandar Taif',
      id: 'Kota Taif',
      ur: 'طائف شہر',
      fr: 'Taïf',
      es: 'Taif',
      de: 'Taif',
      tr: 'Taif',
      hi: 'ताइफ़',
    },
    destination: {
      en: 'Makkah Hotel',
      ar: 'فنادق مكة المكرمة',
      ms: 'Hotel Makkah',
      id: 'Hotel Makkah',
      ur: 'مکہ مکرمہ',
      fr: 'Hôtel La Mecque',
      es: 'Hotel La Meca',
      de: 'Hotel Mekka',
      tr: 'Mekke Oteli',
      hi: 'मक्का होटल',
    },
    description: {
      en: 'Return private transfer from Taif highlands down to Makkah hotels with a scheduled stop at Miqat Qarn al-Manazil for ablution, Ihram garments, and Umrah prayer.',
      ar: 'رحلة العودة الخاصة من مرتفعات الطائف إلى فنادق مكة شاملة التوقف في ميقات قرن المنازل للاغتسال وارتداء الإحرام وصلاة الركعتين بكل طمأنينة.',
      ms: 'Perjalanan balik dari tanah tinggi Taif ke Makkah termasuk singgahan khusus di Miqat Qarnul Manazil untuk mandi sunat dan memakai Ihram.',
      id: 'Perjalanan pulang pribadi dari dataran tinggi Taif ke hotel Makkah beserta singgah resmi di Miqat Qarnul Manazil untuk mengenakan Ihram.',
      ur: 'طائف سے مکہ واپسی کا سفر جس میں میقات قرن المنازل پر غسل، احرام باندھنے اور نماز کے لیے باقاعدہ وقفہ شامل ہے۔',
      fr: 'Trajet retour de Taïf vers La Mecque avec pause dédiée au Miqat Qarn al-Manazil pour les ablutions et l’entrée en Ihram.',
      es: 'Regreso privado desde Taif hasta los hoteles de La Meca con parada en Miqat Qarn al-Manazil para la preparación del Ihram.',
      de: 'Rückfahrt von Taif nach Mekka mit eingeplantem Aufenthalt am Miqat Qarn al-Manazil zum Anlegen des Ihram.',
      tr: 'Taif yaylalarından Mekke’ye dönüşte İhram ve namaz hazırlığı için Karnü’l-Menazil Mikat durağını içeren özel transfer.',
      hi: 'ताइफ़ से मक्का वापसी की निजी यात्रा, जिसमें मीक़ात क़र्न अल-मनाज़िल पर स्नान और एहराम की तैयारी का ठहराव शामिल है।',
    },
  },
  'jeddah-to-taif': {
    origin: {
      en: 'Jeddah Airport (KAIA)',
      ar: 'مطار جدة (KAIA)',
      ms: 'Lapangan Terbang Jeddah (KAIA)',
      id: 'Bandara Jeddah (KAIA)',
      ur: 'جدہ ایئرپورٹ (KAIA)',
      fr: 'Aéroport de Djeddah (KAIA)',
      es: 'Aeropuerto de Yeda (KAIA)',
      de: 'Flughafen Dschidda (KAIA)',
      tr: 'Cidde Havalimanı (KAIA)',
      hi: 'जेद्दा हवाई अड्डा (KAIA)',
    },
    destination: {
      en: 'Taif & Al Hada',
      ar: 'الطائف والهدا',
      ms: 'Taif & Al Hada',
      id: 'Taif & Al Hada',
      ur: 'طائف اور الھدا',
      fr: 'Taïf & Al Hada',
      es: 'Taif y Al Hada',
      de: 'Taif & Al Hada',
      tr: 'Taif & El-Hada',
      hi: 'ताइफ़ व अल हदा',
    },
    description: {
      en: 'Seamless 165 km executive pickup directly from Jeddah KAIA arrivals straight up to Taif resorts, Shafa mountains, and seasonal rose farms in around 2 hours.',
      ar: 'استقبال مباشر من صالات مطار الملك عبدالعزيز بجدة والانطلاق على الطريق السريع لمسافة 165 كم إلى منتجعات الطائف والشفا والهدا في نحو ساعتين.',
      ms: 'Pemindahan terus 165 km dari ketibaan Lapangan Terbang Jeddah terus ke pusat peranginan Taif dan pergunungan Shafa dalam sekitar 2 jam.',
      id: 'Pengantaran langsung 165 km dari Bandara Jeddah menuju resor Taif, pegunungan Shafa, dan kebun mawar dalam waktu sekitar 2 jam.',
      ur: 'جدہ ایئرپورٹ سے براہِ راست 165 کلومیٹر کا پُرآسائش سفر طائف کے تفریحی مقامات، الشفا اور گلاب کے باغات تک تقریباً 2 گھنٹے میں۔',
      fr: 'Transfert direct de 165 km depuis l’aéroport de Djeddah jusqu’aux complexes hôteliers et montagnes de Taïf en environ 2 heures.',
      es: 'Traslado directo de 165 km desde el aeropuerto de Yeda hasta los complejos turísticos y valles montañosos de Taif en unas 2 horas.',
      de: 'Direkter 165-km-Transfer vom Flughafen Dschidda zu den Resorts und Bergzielen von Taif in rund 2 Stunden.',
      tr: 'Cidde Havalimanı’ndan doğrudan Taif yaylalarına, Şefa dağlarına ve gül bahçelerine yaklaşık 2 saatlik özel ulaşım.',
      hi: 'जेद्दाह एयरपोर्ट से सीधे ताइफ़ रिसॉर्ट्स, शफ़ा पहाड़ियों और गुलाब बागानों तक लगभग 2 घंटे में 165 किमी की आरामदायक यात्रा।',
    },
  },
  'riyadh-airport-transfer': {
    origin: {
      en: 'Riyadh Airport (RUH)',
      ar: 'مطار الرياض (RUH)',
      ms: 'Lapangan Terbang Riyadh (RUH)',
      id: 'Bandara Riyadh (RUH)',
      ur: 'ریاض ایئرپورٹ (RUH)',
      fr: 'Aéroport de Riyad (RUH)',
      es: 'Aeropuerto de Riad (RUH)',
      de: 'Flughafen Riad (RUH)',
      tr: 'Riyad Havalimanı (RUH)',
      hi: 'रियाद हवाई अड्डा (RUH)',
    },
    destination: {
      en: 'Riyadh City Hotels',
      ar: 'فنادق الرياض',
      ms: 'Hotel Bandar Riyadh',
      id: 'Hotel Kota Riyadh',
      ur: 'ریاض ہوٹلز',
      fr: 'Hôtels à Riyad',
      es: 'Hoteles en Riad',
      de: 'Hotels in Riad',
      tr: 'Riyad Otelleri',
      hi: 'रियाद शहर होटल',
    },
    description: {
      en: 'Executive private chauffeur pickup from King Khalid International Airport (RUH) terminals to business districts and hotels across Riyadh.',
      ar: 'استقبال تنفيذي خاص من صالات مطار الملك خالد الدولي (RUH) إلى كافة فنادق ووجهات الأعمال في العاصمة الرياض.',
      ms: 'Pengambilan pemandu eksekutif dari terminal Lapangan Terbang Raja Khalid (RUH) ke hotel dan daerah perniagaan di Riyadh.',
      id: 'Penjemputan sopir eksekutif dari terminal Bandara Raja Khalid (RUH) menuju berbagai hotel dan pusat kota Riyadh.',
      ur: 'کنگ خالد انٹرنیشنل ایئرپورٹ (RUH) سے ریاض کے تمام بڑے ہوٹلوں اور کاروباری مراکز تک ایگزیکٹو ٹرانسفر۔',
      fr: 'Prise en charge exécutive depuis l’aéroport international du Roi Khalid (RUH) jusqu’aux hôtels et quartiers d’affaires de Riyad.',
      es: 'Recogida ejecutiva en el Aeropuerto Internacional Rey Khalid (RUH) con traslado directo a hoteles de Riad.',
      de: 'Exklusive Abholung am Flughafen King Khalid (RUH) mit direkter Fahrt zu allen Hotels und Geschäftsvierteln in Riad.',
      tr: 'Kral Halid Uluslararası Havalimanı’ndan (RUH) Riyad genelindeki tüm otellere özel şoförlü ulaşım.',
      hi: 'किंग खालिद इंटरनेशनल एयरपोर्ट (RUH) से रियाद के सभी होटलों और व्यावसायिक केंद्रों तक सीधी यात्रा।',
    },
  },
  'riyadh-to-makkah': {
    origin: {
      en: 'Riyadh City / Airport',
      ar: 'الرياض',
      ms: 'Riyadh',
      id: 'Riyadh',
      ur: 'ریاض',
      fr: 'Riyad',
      es: 'Riad',
      de: 'Riad',
      tr: 'Riyad',
      hi: 'रियाद',
    },
    destination: {
      en: 'Makkah Hotel',
      ar: 'فنادق مكة المكرمة',
      ms: 'Hotel Makkah',
      id: 'Hotel Makkah',
      ur: 'مکہ مکرمہ',
      fr: 'Hôtel La Mecque',
      es: 'Hotel La Meca',
      de: 'Hotel Mekka',
      tr: 'Mekke Oteli',
      hi: 'मक्का होटल',
    },
    description: {
      en: 'Long-distance private highway journey (870 km) from Riyadh directly to Makkah hotels with comfort rest stops and Miqat preparation.',
      ar: 'رحلة برية خاصة لمسافة 870 كم من الرياض مباشرة إلى فنادق مكة المكرمة شاملة محطات الاستراحة والاستعداد في الميقات.',
      ms: 'Perjalanan lebuh raya jarak jauh (870 km) dari Riyadh ke hotel Makkah dengan hentian rehat dan persiapan Miqat.',
      id: 'Perjalanan tol jarak jauh (870 km) dari Riyadh langsung ke hotel Makkah disertai waktu istirahat dan singgah Miqat.',
      ur: 'ریاض سے مکہ مکرمہ تک 870 کلومیٹر کا پرائیویٹ ہائی وے سفر آرام کے وقفوں اور میقات کی سہولت کے ساتھ۔',
      fr: 'Trajet autoroutier longue distance (870 km) de Riyad vers La Mecque avec pauses confort et halte au Miqat.',
      es: 'Viaje privado de larga distancia (870 km) desde Riad hacia La Meca con paradas de descanso y Miqat.',
      de: 'Langstreckenfahrt (870 km) von Riad direkt zu Hotels in Mekka inklusive bequemer Pausen und Miqat-Stopp.',
      tr: 'Riyad’dan Mekke otellerine dinlenme ve Mikat duraklarıyla 870 km özel otoyol yolculuğu.',
      hi: 'रियाद से मक्का होटल तक विश्राम स्टॉप और मीक़ात तैयारी के साथ 870 किमी की सीधी निजी हाईवे यात्रा।',
    },
  },
  'riyadh-to-madinah': {
    origin: {
      en: 'Riyadh City / Airport',
      ar: 'الرياض',
      ms: 'Riyadh',
      id: 'Riyadh',
      ur: 'ریاض',
      fr: 'Riyad',
      es: 'Riad',
      de: 'Riad',
      tr: 'Riyad',
      hi: 'रियाद',
    },
    destination: {
      en: 'Madinah Hotel',
      ar: 'فنادق المدينة المنورة',
      ms: 'Hotel Madinah',
      id: 'Hotel Madinah',
      ur: 'مدینہ منورہ',
      fr: 'Hôtel Médine',
      es: 'Hotel Medina',
      de: 'Hotel Medina',
      tr: 'Medine Oteli',
      hi: 'मदीना होटल',
    },
    description: {
      en: 'Executive 840 km highway transfer linking Riyadh directly with Al-Masjid an-Nabawi hotels in Madinah with scheduled prayer and rest stops.',
      ar: 'انتقال تنفيذي عبر الطريق السريع لمسافة 840 كم يربط الرياض مباشرة بفنادق المسجد النبوي بالمدينة المنورة مع وقفات للصلاة والراحة.',
      ms: 'Pemindahan lebuh raya eksekutif 840 km menghubungkan Riyadh terus ke hotel sekitar Masjid Nabawi di Madinah.',
      id: 'Transfer tol eksekutif 840 km menghubungkan Riyadh langsung ke hotel sekitar Masjid Nabawi di Madinah.',
      ur: 'ریاض کو مدینہ منورہ میں مسجد نبوی کے ہوٹلوں سے ملانے والا 840 کلومیٹر کا ایگزیکٹو ہائی وے سفر۔',
      fr: 'Transfert routier exécutif de 840 km reliant directement Riyad aux hôtels proches du Haram à Médine.',
      es: 'Traslado ejecutivo de 840 km conectando directamente Riad con los hoteles junto al Haram en Medina.',
      de: 'Exklusiver 840-km-Transfer von Riad direkt zu den Hotels in unmittelbarer Nähe der Prophetenmoschee.',
      tr: 'Riyad’ı doğrudan Medine Mescid-i Nebevî otellerine bağlayan 840 km özel otoyol transferi.',
      hi: 'रियाद को मदीना में मस्जिदे नबवी के होटलों से जोड़ने वाला 840 किमी का सीधा कार्यकारी हाईवे सफर।',
    },
  },
};

const VEHICLE_PRICE_KEYS = ['camry', 'staria', 'hiace', 'yukon', 'coaster'] as const;

export function getStartingPriceSAR(
  route: AdminRouteData,
  dbRates?: TransferRatesMap
): number | null {
  const candidates: number[] = [];

  for (const key of VEHICLE_PRICE_KEYS) {
    const dbVal = dbRates?.[route.id]?.[key];
    const routeVal = route.rates?.[key];
    const authVal = AUTHORITATIVE_TRANSFER_RATES?.[route.id]?.[key];

    const resolved =
      typeof dbVal === 'number' && dbVal > 0
        ? dbVal
        : typeof routeVal === 'number' && routeVal > 0
          ? routeVal
          : typeof authVal === 'number' && authVal > 0
            ? authVal
            : null;

    if (resolved !== null) {
      candidates.push(resolved);
    }
  }

  return candidates.length > 0 ? Math.min(...candidates) : null;
}

export function buildExplorerRoutes(
  rawRoutes: AdminRouteData[],
  locale: Locale,
  dbRates?: TransferRatesMap
): ExplorerRouteItem[] {
  const activeTransfers = rawRoutes
    .filter((r) => r.is_active && r.id !== 'ziyarat-tour' && r.id !== 'hourly-4h')
    .sort((a, b) => (a.display_order ?? 99) - (b.display_order ?? 99));

  return activeTransfers.map((r) => {
    const media = ROUTE_MEDIA_CONFIG[r.id];
    const localizedCopy = ROUTE_LOCALIZED_COPY[r.id];
    const localizedTitle = LOCALIZED_ROUTE_NAMES[r.id]?.[locale] || LOCALIZED_ROUTE_NAMES[r.id]?.en || r.title;
    const startingPriceSAR = getStartingPriceSAR(r, dbRates);
    const hasGuidePage = ROUTE_GUIDE_SLUGS.has(r.id);

    if (!media) {
      // Log missing photograph once on server per unmapped DB route so asset team can inspect
      console.warn(`[InteractiveRoutesExplorer] Missing mapped destination photograph for active route "${r.id}". Using Deep Navy treatment.`);
    }

    return {
      id: r.id,
      title: localizedTitle,
      origin: localizedCopy?.origin[locale] || localizedCopy?.origin.en || r.origin_city,
      destination: localizedCopy?.destination[locale] || localizedCopy?.destination.en || r.destination_city,
      originCode: r.origin_code || '',
      destinationCode: r.destination_code || '',
      description:
        localizedCopy?.description[locale] ||
        localizedCopy?.description.en ||
        `${r.origin_city} — ${r.destination_city}`,
      distanceKm: typeof r.distance_km === 'number' && r.distance_km > 0 ? r.distance_km : null,
      durationMinutes:
        typeof r.estimated_duration_minutes === 'number' && r.estimated_duration_minutes > 0
          ? r.estimated_duration_minutes
          : null,
      miqatStopAllowed: Boolean(r.miqat_stop_allowed),
      startingPriceSAR,
      image: media ? media.src : null,
      imagePosition: media ? media.pos : 'object-center',
      hasGuidePage,
      bookingHref: `/${locale}/booking?route=${encodeURIComponent(r.id)}`,
      guideHref: hasGuidePage ? `/${locale}/routes/${encodeURIComponent(r.id)}` : null,
    };
  });
}
