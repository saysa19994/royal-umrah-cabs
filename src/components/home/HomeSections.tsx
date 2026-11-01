'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import type { SiteSettings } from '@/lib/settings';
import { useCurrency } from '@/context/CurrencyContext';
import { FleetSection } from '@/components/home/FleetSection';
import { ReviewsSection } from '@/components/reviews/ReviewsSection';
import { FaqSection } from '@/components/faq/FaqSection';
import {
  Calendar,
  Car,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Clock,
  Compass,
  MapPin,
  Plane,
  Landmark,
  MessageCircle,
  Sparkles,
  Award,
  Building2,
  Users,
  Luggage,
  Baby,
  HandCoins,
} from 'lucide-react';

interface HomeSectionsProps {
  locale: Locale;
  dict: Dictionary;
  settings: SiteSettings;
  vehicles?: import('@/data/fleet-showcase-data').FleetShowcaseVehicle[];
}

// ============================================================================
// 1. WHY US: 8 VERIFIED COMMITMENTS & PILLARS OF TRUST
// ============================================================================
const WHY_US_8_ITEMS: Record<
  Locale,
  Array<{ title: string; desc: string }>
> = {
  ar: [
    { title: 'مرخصون ومؤمنون رسمياً', desc: 'سائقون محترفون ومركبات حديثة مؤمنة بالكامل لضمان راحة وطمأنينة ضيوف الرحمن.' },
    { title: 'تتبع آلي لرحلات الطيران', desc: 'نتابع موعد وصول طائرتك بالرادار الملاحي ليتواجد سائقك بالموعد تماماً حتى في حال تأخر الرحلة.' },
    { title: 'استقبال مجاني بصالة المطار', desc: 'سائقك ينتظرك حاملاً لوحة باسمك في بهو الوصول مع 60 دقيقة انتظار مجاني.' },
    { title: 'سعر ثابت وشامل بالكامل', desc: 'سعر محدد مسبقاً يشمل الوقود ورسوم الطرق السريعة والضريبة دون أي رسوم خفية.' },
    { title: 'توقف مجاني بميقات الإحرام', desc: 'توقف مريح في ميقات ذو الحليفة (آبار علي) أو قرن المنازل للإحرام والصلاة دون تكلفة إضافية.' },
    { title: 'مقاعد أمان للأطفال وعناية عائلية', desc: 'نوفر مقاعد مخصصة للأطفال ومساحات رحبة تناسب كافة أفراد الأسرة وكبار السن.' },
    { title: 'الدفع نقدًا بعد انتهاء الرحلة', desc: '0 ريال دفعة مقدمة؛ الدفع نقدًا للسائق بعد وصول العميل إلى وجهته المطلوبة وانتهاء الرحلة بالكامل (بالريال أو الدولار).' },
    { title: 'عناية ومتابعة على مدار الساعة', desc: 'فريق عمليات وتوجيه متخصص لمرافقتكم وخدمتكم عبر واتساب في كل خطوة.' },
  ],
  en: [
    { title: 'Officially Licensed & Insured', desc: 'Professional chauffeurs and fully insured late-model vehicles for complete peace of mind.' },
    { title: 'Live Flight Radar Tracking', desc: 'We monitor flight arrivals in real time so your chauffeur greets you on time, even if delayed.' },
    { title: '60-Min Airport Meet & Greet', desc: 'Your private chauffeur awaits with a personalized name board and 60 minutes of complimentary waiting.' },
    { title: 'Guaranteed All-Inclusive Rates', desc: 'Transparent fixed pricing covering expressway tolls, fuel, and taxes with zero hidden surcharges.' },
    { title: 'Complimentary Miqat Stopover', desc: 'Free stopover at Dhul Hulayfah (Bir Ali) or Qarn al-Manazil for Ihram preparations and prayer.' },
    { title: 'Child Safety Seats & Family Care', desc: 'Complimentary child safety seats upon request and dedicated assistance for elderly pilgrims.' },
    { title: 'Pay Cash to Driver Upon Arrival', desc: 'Zero advance deposit required. Cash paid to the driver after journey completion (SAR or USD).' },
    { title: '24/7 Dedicated Concierge Support', desc: 'Our bilingual dispatch team coordinates every leg of your journey via WhatsApp around the clock.' },
  ],
  ms: [
    { title: 'Berlesen & Diinsuranskan Penuh', desc: 'Pemandu profesional berlesen dan kenderaan moden diinsuranskan untuk ketenangan ibadah anda.' },
    { title: 'Penjejakan Radar Penerbangan Langsung', desc: 'Kami memantau masa ketibaan penerbangan secara langsung agar pemandu sentiasa bersedia di terminal.' },
    { title: 'Sambutan Percuma di Lapangan Terbang', desc: 'Pemandu menanti dengan papan nama peribadi berserta 60 minit masa menunggu percuma.' },
    { title: 'Kadar Tetap Termasuk Semua', desc: 'Tambang telus merangkumi tol lebuh raya, petrol dan cukai tanpa sebarang caj tersembunyi.' },
    { title: 'Singgah Percuma di Miqat', desc: 'Persinggahan di Miqat Bir Ali untuk berniat Ihram dan solat sunat tanpa caj tambahan.' },
    { title: 'Kerusi Keselamatan Kanak-kanak', desc: 'Kerusi keselamatan kanak-kanak disediakan atas permintaan serta bantuan mesra warga emas.' },
    { title: 'Bayar Tunai Selepas Perjalanan Selesai', desc: 'Tiada deposit pendahuluan. Bayaran tunai kepada pemandu selepas perjalanan selesai (SAR / USD).' },
    { title: 'Sokongan Operasi 24/7', desc: 'Pasukan koordinasi kami sentiasa bersedia di WhatsApp pada bila-bila masa siang dan malam.' },
  ],
  id: [
    { title: 'Resmi Berlisensi & Berasuransi', desc: 'Pengemudi profesional dan armada modern berasuransi penuh demi ketenangan ibadah Umrah Anda.' },
    { title: 'Pelacakan Radar Pesawat Langsung', desc: 'Kami memantau kedatangan penerbangan langsung via radar agar sopir menyambut tepat waktu.' },
    { title: 'Penyambutan Bandara Gratis 60 Menit', desc: 'Sopir menyambut dengan papan nama dan waktu tunggu gratis 60 menit setelah mendarat.' },
    { title: 'Tarif Pasti Tanpa Biaya Tersembunyi', desc: 'Tarif pasti mencakup bbm, jalan tol, dan pajak tanpa pungutan tambahan apa pun.' },
    { title: 'Singgah Miqat Bir Ali Gratis', desc: 'Persinggahan gratis di Miqat Dzul Hulaifah (Bir Ali) untuk niat Ihram dan shalat tanpa biaya tambahan.' },
    { title: 'Kursi Bayi & Kenyamanan Lansia', desc: 'Kursi pengaman anak tersedia atas permintaan serta layanan ramah untuk jamaah lansia.' },
    { title: 'Bayar Tunai ke Sopir Saat Tiba', desc: 'Tanpa uang muka atau deposit. Pembayaran tunai kepada pengemudi setelah tiba di tujuan (SAR / USD).' },
    { title: 'Layanan Pelanggan 24/7', desc: 'Tim operasional kami siap membantu koordinasi perjalanan via WhatsApp setiap saat.' },
  ],
  ur: [
    { title: 'مستند اور مکمل بیمہ شدہ', desc: 'ہر سفر میں مستند شافر اور مکمل انشورڈ گاڑیاں آپ کے ذہنی سکون کی ضامن ہیں۔' },
    { title: 'فلائٹ ریڈار لائیو ٹریکنگ', desc: 'ہم لائیو ریڈار کے ذریعے پرواز کی نگرانی کرتے ہیں تاکہ تاخیر کی صورت میں بھی وقت پر استقبال ہو۔' },
    { title: 'ائیرپورٹ پر 60 منٹ مفت انتظار', desc: 'شافر آپ کے نام کے بورڈ اور 60 منٹ اعزازی انتظار کے ساتھ ائیرپورٹ پر موجود رہتا ہے۔' },
    { title: 'مکمل فکسڈ طے شدہ کرایہ', desc: 'کرایہ میں پیٹرول، ٹول ٹیکس اور تمام اخراجات شامل ہیں، کوئی پوشیدہ فیس نہیں۔' },
    { title: 'میقات پر اعزازی توقف', desc: 'احرام اور نماز کے لیے میقات ذو الحلیفہ (بئر علی) پر بغیر کسی اضافی چارج کے توقف۔' },
    { title: 'چائلڈ سیفٹی سیٹ اور فیملی کیئر', desc: 'بچوں کے لیے حفاظتی سیٹیں اور بزرگ زائرین کے لیے خصوصی معاونت دستیاب ہے۔' },
    { title: 'سفر مکمل ہونے پر نقد ادائیگی', desc: '0 روپے ایڈوانس؛ سفر مکمل ہونے اور منزل پر پہنچنے کے بعد ڈرائیور کو نقد ادائیگی (ریال یا ڈالر)۔' },
    { title: '24/7 گھنٹے واٹس ایپ رابطہ', desc: 'سفر کے دوران کسی بھی وقت ہماری ٹیم سے واٹس ایپ پر براہ راست رابطہ کریں۔' },
  ],
  tr: [
    { title: 'Lisanslı ve Sigortalı VIP Filo', desc: 'Huzur ve güvenliğiniz için profesyonel şoförler ve tam kaskolu lüks araçlar.' },
    { title: 'Canlı Uçuş Radarı Takibi', desc: 'Uçuşunuz rötar yapsa dahi şoförünüz sizi zamanında karşılamak için hazır bekler.' },
    { title: 'Havalimanında 60 Dk Ücretsiz Bekleme', desc: 'İsminizin yazılı olduğu karşılama panosu ve 60 dakika ücretsiz bekleme süresi.' },
    { title: 'Sabit ve Şeffaf Fiyat Garantisi', desc: 'Otoyol geçişleri, yakıt ve vergiler dahil kesin sabit fiyat, gizli ek ücret yok.' },
    { title: 'Mikat Noktasında Ücretsiz Mola', desc: 'İhram ve namaz için Bir Ali Mikatı noktasında ek ücret ödemeden bekleme.' },
    { title: 'Çocuk Koltuğu ve Aile Konforu', desc: 'Talep üzerine ücretsiz çocuk güvenlik koltuğu ve yaşlı yolculara özel ilgi.' },
    { title: 'Varışta Şoföre Nakit Ödeme', desc: 'Sıfır ön ödeme; yolculuk tamamlandıktan sonra şoföre doğrudan nakit ödeme (SAR / USD).' },
    { title: '24/7 WhatsApp Konsiyerj Desteği', desc: 'Operasyon ekibimiz seyahatinizin her adımında WhatsApp üzerinden yanınızda.' },
  ],
  fr: [
    { title: 'Agréé et Entièrement Assuré', desc: 'Chauffeurs professionnels et véhicules récents assurés pour une totale sérénité.' },
    { title: 'Suivi Radar des Vols en Direct', desc: 'Nous surveillons votre vol en temps réel afin que votre chauffeur soit ponctuel même en cas de retard.' },
    { title: 'Accueil VIP Aéroport (60 min offertes)', desc: 'Votre chauffeur vous attend avec une pancarte à votre nom et 60 minutes d’attente sans frais.' },
    { title: 'Tarif Fixe Tout Compris Garanti', desc: 'Prix clair incluant péages autoroutiers, carburant et taxes, sans aucun frais caché.' },
    { title: 'Arrêt Gratuit au Miqat pour l’Ihram', desc: 'Pause paisible au Miqat Dhul Hulayfah (Bir Ali) pour l’Ihram et la prière sans surcoût.' },
    { title: 'Sièges Enfant & Confort Familial', desc: 'Sièges de sécurité enfant disponibles sur demande et assistance bienveillante pour les aînés.' },
    { title: 'Paiement en Espèces à l’Arrivée', desc: '0 € d’acompte; règlement en espèces au chauffeur après l’arrivée à l’hôtel (SAR ou USD).' },
    { title: 'Concierge WhatsApp 24h/24', desc: 'Notre équipe d’assistance vous accompagne à chaque étape de votre pèlerinage.' },
  ],
  es: [
    { title: 'Oficialmente Licenciado y Asegurado', desc: 'Chóferes profesionales y vehículos modernos con seguro integral para su tranquilidad.' },
    { title: 'Rastreo Radar de Vuelos en Vivo', desc: 'Monitoreamos su vuelo en tiempo real para que el chófer esté puntual incluso con retrasos.' },
    { title: 'Recepción VIP en Aeropuerto (60 min)', desc: 'Su chófer le espera con cartel con su nombre y 60 minutos de cortesía.' },
    { title: 'Tarifa Fija Todo Incluido', desc: 'Tarifa garantizada con peajes, combustible e impuestos incluidos sin costes ocultos.' },
    { title: 'Parada Gratuita en el Miqat', desc: 'Parada cómoda en el Miqat Bir Ali para el Ihram y la oración sin coste adicional.' },
    { title: 'Sillas de Niño y Cuidado Familiar', desc: 'Sillas de seguridad para niños a petición y atención preferente para personas mayores.' },
    { title: 'Pago en Efectivo al Conductor', desc: 'Cero anticipos; pago en efectivo al chófer tras llegar a su destino final (SAR o USD).' },
    { title: 'Asistencia WhatsApp 24/7', desc: 'Nuestro equipo de despacho le asiste y coordina su viaje las 24 horas del día.' },
  ],
  de: [
    { title: 'Offiziell Lizenziert & Versichert', desc: 'Professionelle Chauffeure und moderne, voll versicherte Fahrzeuge für absolute Sicherheit.' },
    { title: 'Echtzeit-Flugradarüberwachung', desc: 'Wir überwachen Ihren Flug live, sodass Ihr Chauffeur Sie auch bei Verspätung pünktlich empfängt.' },
    { title: '60 Min. Kostenlose Wartezeit', desc: 'Ihr Chauffeur erwartet Sie mit persönlichem Namensschild und 60 Minuten kostenloser Wartezeit.' },
    { title: 'Garantierter All-Inclusive Festpreis', desc: 'Transparente Festpreise inklusive Autobahnmaut, Treibstoff und Steuern ohne Zusatzkosten.' },
    { title: 'Kostenloser Zwischenstopp am Miqat', desc: 'Kostenlose Pause an der Miqat-Station Bir Ali für Ihram und Gebet.' },
    { title: 'Kindersitze & Familienbetreuung', desc: 'Kindersitze auf Anfrage und zuvorkommende Betreuung für ältere Reisende.' },
    { title: 'Barzahlung beim Fahrer am Zielort', desc: '0 € Anzahlung; Barzahlung erst nach Beendigung der Fahrt am Zielort (SAR oder USD).' },
    { title: '24/7 Betreuung via WhatsApp', desc: 'Unser Betreuungsteam steht Ihnen rund um die Uhr per WhatsApp zur Seite.' },
  ],
  hi: [
    { title: 'आधिकारिक तौर पर लाइसेंस प्राप्त एवं सुरक्षित', desc: 'आपकी मन की शांति के लिए पेशेवर निजी ड्राइवर और पूर्णतः बीमाकृत आधुनिक वाहन।' },
    { title: 'लाइव फ्लाइट रडार ट्रैकिंग', desc: 'हम आगमन समय की निगरानी करते हैं ताकि विमान में देरी होने पर भी चालक समय पर मिले।' },
    { title: 'हवाई अड्डे पर 60 मिनट निःशुल्क प्रतीक्षा', desc: 'चालक आपके नाम के बोर्ड के साथ आगमन हॉल में 60 मिनट तक निःशुल्क प्रतीक्षा करता है।' },
    { title: 'गारंटीकृत निश्चित एवं पारदर्शी दरें', desc: 'टोल टैक्स, ईंधन और कर सहित निश्चित किराया, कोई छिपा हुआ शुल्क नहीं।' },
    { title: 'मीक़ात पर निःशुल्क ठहराव', desc: 'एहराम और नमाज़ के लिए मीक़ात ज़ुल हुलैफ़ा (बीर अली) पर निःशुल्क ठहराव।' },
    { title: 'चाइल्ड सेफ्टी सीट एवं पारिवारिक सुविधा', desc: 'अनुरोध पर निःशुल्क चाइल्ड सीट और वरिष्ठ नागरिकों के लिए विशेष सहयोग।' },
    { title: 'आगमन पर चालक को नकद भुगतान', desc: '0 अग्रिम राशि; यात्रा समाप्त होने पर चालक को सीधे नकद भुगतान (SAR / USD)।' },
    { title: '24/7 समर्पित व्हाट्सएप सहायता', desc: 'हमारी टीम व्हाट्सएप पर 24 घंटे आपके हर सफर में समन्वय के लिए उपलब्ध है।' },
  ],
};

// ============================================================================
// 2. POPULAR SUPPORTED HIGHWAY CORRIDORS (VERIFIED RATES)
// ============================================================================
const TOP_ROUTES = [
  {
    id: 'jeddah-airport-to-makkah',
    titleEn: 'Jeddah Airport (KAIA) → Makkah Hotel',
    titleAr: 'مطار جدة (KAIA) ← فندق مكة المكرمة',
    descEn: 'Direct private transfer from King Abdulaziz Airport (Terminal 1 & North) to your Makkah hotel door.',
    descAr: 'استقبال من بوابة صالة المطار وتوصيل مباشر حتى باب فندقكم بمكة المكرمة براحة تامة وسرعة إنجاز.',
    duration: '60-75 mins',
    durationAr: '60-75 دقيقة',
    distance: '95 km',
    distanceAr: '95 كم',
    startingFareSAR: 200,
    img: '/assets/images/jeddah-airport-pickup-umrah.webp',
  },
  {
    id: 'makkah-to-madinah',
    titleEn: 'Makkah Hotel → Madinah Hotel',
    titleAr: 'فندق مكة المكرمة ← فندق المدينة المنورة',
    descEn: 'Scenic VIP highway journey along the Hijrah Expressway with optional prayer and refreshment stops.',
    descAr: 'رحلة طريق الهجرة السريع المريحة بسيارة VIP مكيفة وسائق خبير مع توقفات استراحة وصلاة حسب رغبتكم.',
    duration: '4-4.5 hours',
    durationAr: '4-4.5 ساعات',
    distance: '440 km',
    distanceAr: '440 كم',
    startingFareSAR: 400,
    img: '/assets/images/private-transfer-makkah-to-madinah.webp',
  },
  {
    id: 'madinah-to-makkah',
    titleEn: 'Madinah Hotel → Makkah Hotel (Via Miqat)',
    titleAr: 'فندق المدينة المنورة ← فندق مكة المكرمة (عبر الميقات)',
    descEn: 'Direct intercity chauffeur journey with complimentary stopover at Miqat Dhul Hulayfah (Bir Ali) for Ihram.',
    descAr: 'رحلة مباشرة بين الحرمين مع توقف مريح بميقات ذو الحليفة (آبار علي) لارتداء الإحرام وعقد نية العمرة.',
    duration: '4.5 hours',
    durationAr: '4.5 ساعات',
    distance: '440 km',
    distanceAr: '440 كم',
    startingFareSAR: 400,
    img: '/assets/images/vip-umrah-transport-jeddah-to-makkah.webp',
  },
  {
    id: 'madinah-airport-to-hotel',
    titleEn: 'Madinah Airport (MED) → Madinah Hotel',
    titleAr: 'مطار المدينة المنورة (MED) ← فنادق الحرم',
    descEn: 'Personalized meet & greet at Prince Mohammad bin Abdulaziz Airport with direct drop-off at Central hotels.',
    descAr: 'استقبال فوري بصالة مطار الأمير محمد بن عبدالعزيز بالمدينة وتوصيل مباشر لباب فندقكم بالمنطقة المركزية.',
    duration: '20-25 mins',
    durationAr: '20-25 دقيقة',
    distance: '22 km',
    distanceAr: '22 كم',
    startingFareSAR: 200,
    img: '/assets/images/camry_studio.webp',
  },
  {
    id: 'jeddah-to-madinah',
    titleEn: 'Jeddah Airport (KAIA) → Madinah Hotel',
    titleAr: 'مطار جدة (KAIA) ← فندق المدينة المنورة',
    descEn: 'Comfortable expressway intercity transfer connecting KAIA airport directly to your Madinah accommodation.',
    descAr: 'توصيل مريح ومباشر من مطار الملك عبدالعزيز بجدة إلى فنادق المدينة المنورة دون عناء التبديل.',
    duration: '4 hours',
    durationAr: '4 ساعات',
    distance: '420 km',
    distanceAr: '420 كم',
    startingFareSAR: 400,
    img: '/assets/images/transport-planning-makkah-madinah-jeddah.webp',
  },
  {
    id: 'makkah-to-taif',
    titleEn: 'Makkah Hotel → Taif (Al Hada / City)',
    titleAr: 'فندق مكة المكرمة ← الطائف (الهدا / المدينة)',
    descEn: 'Comfortable mountain highway journey through Al Hada scenic pass with optional cable car stop.',
    descAr: 'رحلة جبلية ساحرة عبر عقبة الهدا مع إمكانية التوقف في التلفريك ومنتزهات الشفا والطائف.',
    duration: '75-90 mins',
    durationAr: '75-90 دقيقة',
    distance: '105 km',
    distanceAr: '105 كم',
    startingFareSAR: 400,
    img: '/assets/images/makkah-to-taif-private-transfer.webp',
  },
];

// ============================================================================
// 3. SERVICES: 8 SUPPORTED CORE SERVICES WITH DIVERSE COMPOSITIONS
// ============================================================================
const SERVICES_8_ITEMS: Record<
  Locale,
  Array<{
    id: string;
    title: string;
    desc: string;
    tag: string;
    href: string;
    img: string;
    icon: 'plane' | 'car' | 'clock' | 'landmark' | 'users' | 'shield' | 'compass' | 'building';
  }>
> = {
  ar: [
    {
      id: 'airport-transfers',
      title: 'خدمات التوصيل من وإلى المطارات',
      desc: 'استقبال بصالة مطار الملك عبدالعزيز بجدة ومطار الأمير محمد بن عبدالعزيز بالمدينة مع متابعة رادارية للرحلات و60 دقيقة انتظار مجاني.',
      tag: 'استقبال بصالة المطار',
      href: '/ar/routes',
      img: '/assets/images/jeddah-airport-pickup-umrah.webp',
      icon: 'plane',
    },
    {
      id: 'intercity-transportation',
      title: 'النقل الفاخر بين المدن والمشاعر',
      desc: 'تنقل سلس ومريح عبر طريق الهجرة السريع وطريق الحرمين بين مكة المكرمة والمدينة المنورة وجدة والطائف والرياض بسيارات حديثة ومكيفة.',
      tag: 'سفر بين المدن',
      href: '/ar/routes',
      img: '/assets/images/private-transfer-makkah-to-madinah.webp',
      icon: 'compass',
    },
    {
      id: 'private-chauffeur',
      title: 'خدمة السائق الخاص لكبار الشخصيات',
      desc: 'سائق خاص ومحترف يرافقكم بأعلى درجات اللباقة والالتزام، مخصص بالكامل لأسرتكم ووفدكم لضمان أقصى درجات الخصوصية.',
      tag: 'سائق خاص VIP',
      href: '/ar/services',
      img: '/assets/images/vip-car-with-driver-saudi-arabia.webp',
      icon: 'car',
    },
    {
      id: 'hourly-chauffeur',
      title: 'خدمات السائق الخاص بالساعة',
      desc: 'حزم مرنة بالساعة (٢، ٤، ٨، أو ١٢ ساعة) للتسوق والاجتماعات والتنقل المريح داخل المدن مع مرونة كاملة لتحديد وجهاتكم.',
      tag: 'باقات بالساعة',
      href: '/ar/services',
      img: '/assets/images/hourly-vs-point-to-point-car-booking.webp',
      icon: 'clock',
    },
    {
      id: 'makkah-ziyarat',
      title: 'جولات مزارات مكة المكرمة (٢.٥ ساعة)',
      desc: 'زيارة مأثورة لغار حراء (جبل النور)، جبل ثور، صعيد عرفات، منى ومزدلفة مع توصيل مباشر من وإلى باب فندقكم.',
      tag: '٢.٥ ساعة معتمدة',
      href: '/ar/ziyarat',
      img: '/assets/images/vip-umrah-transport-jeddah-to-makkah.webp',
      icon: 'landmark',
    },
    {
      id: 'madinah-ziyarat',
      title: 'جولات مزارات المدينة المنورة (٣.٥ ساعة)',
      desc: 'زيارة مسجد قباء والصلاة فيه، جبل أحد ومقبرة الشهداء، وموقع غزوة الخندق بسيارة خاصة ومياه زمزم مبردة.',
      tag: '٣.٥ ساعة معتمدة',
      href: '/ar/ziyarat',
      img: '/assets/images/madinah-ziyarat-private-car-guide.webp',
      icon: 'landmark',
    },
    {
      id: 'family-transportation',
      title: 'نقل عائلي فاخر ومقاعد أمان للأطفال',
      desc: 'سيارات عائلية رحبة (هيونداي ستاريا VIP وجمس يوكون XL) تتسع لـ 7 ركاب مع مساحات واسعة للحقائب ومقاعد مخصصة للأطفال.',
      tag: 'راحة العائلة',
      href: '/ar/fleet',
      img: '/assets/images/elderly-friendly-umrah-transport.webp',
      icon: 'users',
    },
    {
      id: 'group-transportation',
      title: 'نقل المجموعات والوفود والشركات',
      desc: 'حافلات صغيرة وكبيرة حديثة (تويوتا هايس 10 مقاعد وكوستر 21 مقعداً) مجهزة للوفود وحملات العمرة مع سائقين معتمدين.',
      tag: 'وفود وحملات',
      href: '/ar/fleet',
      img: '/assets/images/coaster_studio.webp',
      icon: 'building',
    },
  ],
  en: [
    {
      id: 'airport-transfers',
      title: 'Airport Meet & Greet Transfers',
      desc: 'VIP arrival reception at Jeddah KAIA and Madinah MED airports with live flight radar monitoring and 60 minutes complimentary waiting.',
      tag: 'Airport Terminal Service',
      href: '/en/routes',
      img: '/assets/images/jeddah-airport-pickup-umrah.webp',
      icon: 'plane',
    },
    {
      id: 'intercity-transportation',
      title: 'Intercity Highway Chauffeur',
      desc: 'Seamless highway travel along the Hijrah Expressway connecting Makkah, Madinah, Jeddah, Taif, and Riyadh in supreme comfort.',
      tag: 'Intercity Highway',
      href: '/en/routes',
      img: '/assets/images/private-transfer-makkah-to-madinah.webp',
      icon: 'compass',
    },
    {
      id: 'private-chauffeur',
      title: 'Executive Private Chauffeur',
      desc: 'Discreet, bilingual private drivers dedicated exclusively to your family or executive party for uncompromised privacy and dignity.',
      tag: 'Executive VIP',
      href: '/en/services',
      img: '/assets/images/vip-car-with-driver-saudi-arabia.webp',
      icon: 'car',
    },
    {
      id: 'hourly-chauffeur',
      title: 'Flexible Hourly Chauffeur Service',
      desc: 'On-demand hourly booking (2, 4, 8, or 12 hours) for city touring, business meetings, and shopping with total itinerary freedom.',
      tag: 'Hourly Blocks',
      href: '/en/services',
      img: '/assets/images/hourly-vs-point-to-point-car-booking.webp',
      icon: 'clock',
    },
    {
      id: 'makkah-ziyarat',
      title: 'Makkah Sacred Ziyarat (2.5 Hours)',
      desc: 'Private pilgrimage tours to Cave Hira (Jabal an-Nour), Mount Thawr, Mina, Muzdalifah, and Arafat with door-to-door hotel service.',
      tag: 'Approved 2.5 Hours',
      href: '/en/ziyarat',
      img: '/assets/images/vip-umrah-transport-jeddah-to-makkah.webp',
      icon: 'landmark',
    },
    {
      id: 'madinah-ziyarat',
      title: 'Madinah Historic Ziyarat (3.5 Hours)',
      desc: 'Door-to-door tours to Masjid Quba with prayer time, Mount Uhud, Martyrs Cemetery, and the Trench battleground site.',
      tag: 'Approved 3.5 Hours',
      href: '/en/ziyarat',
      img: '/assets/images/madinah-ziyarat-private-car-guide.webp',
      icon: 'landmark',
    },
    {
      id: 'family-transportation',
      title: 'Family VIP Travel & Child Seats',
      desc: 'Spacious 7-passenger VIP vans (Hyundai Staria & GMC Yukon XL) with ample luggage capacity, child seats, and senior assistance.',
      tag: 'Family Comfort',
      href: '/en/fleet',
      img: '/assets/images/elderly-friendly-umrah-transport.webp',
      icon: 'users',
    },
    {
      id: 'group-transportation',
      title: 'Group, Delegation & Bus Transport',
      desc: 'Executive minibuses and luxury coaches (Toyota HiAce 10-seater & Toyota Coaster 21-seater) tailored for pilgrim delegations and families.',
      tag: 'Delegation Transport',
      href: '/en/fleet',
      img: '/assets/images/coaster_studio.webp',
      icon: 'building',
    },
  ],
  ms: [
    {
      id: 'airport-transfers',
      title: 'Pemindahan Lapangan Terbang VIP',
      desc: 'Sambutan di terminal Lapangan Terbang Jeddah & Madinah dengan penjejakan radar penerbangan dan 60 minit masa menunggu percuma.',
      tag: 'Penyambutan Lapangan Terbang',
      href: '/ms/routes',
      img: '/assets/images/jeddah-airport-pickup-umrah.webp',
      icon: 'plane',
    },
    {
      id: 'intercity-transportation',
      title: 'Pengangkutan Antara Bandar',
      desc: 'Perjalanan lebuh raya lancar di Lebuhraya Hijrah menghubungkan Makkah, Madinah, Jeddah dan Taif dengan penuh keselesaan.',
      tag: 'Lebuhraya Antara Bandar',
      href: '/ms/routes',
      img: '/assets/images/private-transfer-makkah-to-madinah.webp',
      icon: 'compass',
    },
    {
      id: 'private-chauffeur',
      title: 'Pemandu Peribadi Eksekutif',
      desc: 'Pemandu profesional khas untuk keluarga anda demi privasi dan ketenangan beribadah sepanjang berada di Tanah Suci.',
      tag: 'Pemandu VIP',
      href: '/ms/services',
      img: '/assets/images/vip-car-with-driver-saudi-arabia.webp',
      icon: 'car',
    },
    {
      id: 'hourly-chauffeur',
      title: 'Perkhidmatan Pemandu Mengikut Jam',
      desc: 'Pakej sewaan fleksibel (2, 4, 8 atau 12 jam) untuk membeli-belah dan urusan peribadi dengan kebebasan jadual sepenuhnya.',
      tag: 'Pakej Mengikut Jam',
      href: '/ms/services',
      img: '/assets/images/hourly-vs-point-to-point-car-booking.webp',
      icon: 'clock',
    },
    {
      id: 'makkah-ziyarat',
      title: 'Ziarah Makkah Al-Mukarramah (2.5 Jam)',
      desc: 'Lawatan ke Gua Hira, Jabal Thawr, Mina, Muzdalifah dan Arafah dengan khidmat jemputan terus dari pintu hotel anda.',
      tag: 'Diluluskan 2.5 Jam',
      href: '/ms/ziyarat',
      img: '/assets/images/vip-umrah-transport-jeddah-to-makkah.webp',
      icon: 'landmark',
    },
    {
      id: 'madinah-ziyarat',
      title: 'Ziarah Madinah Al-Munawwarah (3.5 Jam)',
      desc: 'Ziarah Masjid Quba berserta solat sunat, Jabal Uhud, Makam Syuhada dan kawasan Perang Khandaq dengan kenderaan berhawa dingin.',
      tag: 'Diluluskan 3.5 Jam',
      href: '/ms/ziyarat',
      img: '/assets/images/madinah-ziyarat-private-car-guide.webp',
      icon: 'landmark',
    },
    {
      id: 'family-transportation',
      title: 'Pengangkutan Keluarga & Kerusi Kanak-kanak',
      desc: 'Kenderaan 7 tempat duduk (Staria & Yukon XL) yang selesa dengan ruang bagasi luas serta kerusi keselamatan kanak-kanak.',
      tag: 'Keselesaan Keluarga',
      href: '/ms/fleet',
      img: '/assets/images/elderly-friendly-umrah-transport.webp',
      icon: 'users',
    },
    {
      id: 'group-transportation',
      title: 'Pengangkutan Rombongan & Delegasi',
      desc: 'Van Toyota HiAce 10 tempat duduk dan bas mini Toyota Coaster 21 tempat duduk untuk rombongan jemaah dan agensi umrah.',
      tag: 'Rombongan & Bas',
      href: '/ms/fleet',
      img: '/assets/images/coaster_studio.webp',
      icon: 'building',
    },
  ],
  id: [
    {
      id: 'airport-transfers',
      title: 'Layanan Antar Jemput Bandara VIP',
      desc: 'Penyambutan resmi di Bandara Jeddah KAIA dan Madinah MED dengan pelacakan radar pesawat dan 60 menit waktu tunggu gratis.',
      tag: 'Layanan Bandara',
      href: '/id/routes',
      img: '/assets/images/jeddah-airport-pickup-umrah.webp',
      icon: 'plane',
    },
    {
      id: 'intercity-transportation',
      title: 'Transportasi Antarkota Nyaman',
      desc: 'Perjalanan antar Makkah, Madinah, Jeddah, dan Taif melalui jalan tol modern dengan armada ber-AC dan sopir berpengalaman.',
      tag: 'Jalan Tol Antarkota',
      href: '/id/routes',
      img: '/assets/images/private-transfer-makkah-to-madinah.webp',
      icon: 'compass',
    },
    {
      id: 'private-chauffeur',
      title: 'Sopir Privat Eksklusif VIP',
      desc: 'Sopir berdedikasi khusus untuk keluarga Anda demi menjaga privasi dan kenyamanan beribadah secara menyeluruh.',
      tag: 'Sopir Eksekutif',
      href: '/id/services',
      img: '/assets/images/vip-car-with-driver-saudi-arabia.webp',
      icon: 'car',
    },
    {
      id: 'hourly-chauffeur',
      title: 'Sewa Sopir Privat Per Jam',
      desc: 'Paket fleksibel per jam (2, 4, 8, atau 12 jam) untuk berbelanja, ziarah pribadi, atau pertemuan bisnis di Arab Saudi.',
      tag: 'Sewa Per Jam',
      href: '/id/services',
      img: '/assets/images/hourly-vs-point-to-point-car-booking.webp',
      icon: 'clock',
    },
    {
      id: 'makkah-ziyarat',
      title: 'Ziarah Kota Suci Makkah (2.5 Jam)',
      desc: 'Ziarah ke Gua Hira (Jabal Nur), Jabal Tsur, Mina, Muzdalifah, dan Arafah dengan penjemputan langsung di lobi hotel.',
      tag: 'Resmi 2.5 Jam',
      href: '/id/ziyarat',
      img: '/assets/images/vip-umrah-transport-jeddah-to-makkah.webp',
      icon: 'landmark',
    },
    {
      id: 'madinah-ziyarat',
      title: 'Ziarah Bersejarah Madinah (3.5 Jam)',
      desc: 'Kunjungan ke Masjid Quba dengan waktu shalat, Gunung Uhud, Makam Syuhada, dan Masjid Tujuh (Khandaq).',
      tag: 'Resmi 3.5 Jam',
      href: '/id/ziyarat',
      img: '/assets/images/madinah-ziyarat-private-car-guide.webp',
      icon: 'landmark',
    },
    {
      id: 'family-transportation',
      title: 'Transportasi Keluarga & Kursi Bayi',
      desc: 'Mobil 7 penumpang (Hyundai Staria & GMC Yukon XL) dengan bagasi lapang dan kursi bayi demi kenyamanan keluarga.',
      tag: 'Kenyamanan Keluarga',
      href: '/id/fleet',
      img: '/assets/images/elderly-friendly-umrah-transport.webp',
      icon: 'users',
    },
    {
      id: 'group-transportation',
      title: 'Transportasi Rombongan & Jamaah',
      desc: 'Toyota HiAce 10 kursi dan Toyota Coaster 21 kursi untuk rombongan keluarga besar, travel umrah, dan delegasi.',
      tag: 'Grup & Bus',
      href: '/id/fleet',
      img: '/assets/images/coaster_studio.webp',
      icon: 'building',
    },
  ],
  ur: [
    {
      id: 'airport-transfers',
      title: 'وی آئی پی ایئرپورٹ ٹرانسفرز',
      desc: 'جدہ اور مدینہ ایئرپورٹ پر نام کے بورڈ کے ساتھ استقبال، لائیو فلائٹ ریڈار ٹریکنگ اور 60 منٹ مفت انتظار۔',
      tag: 'ایئرپورٹ سروس',
      href: '/ur/routes',
      img: '/assets/images/jeddah-airport-pickup-umrah.webp',
      icon: 'plane',
    },
    {
      id: 'intercity-transportation',
      title: 'شہروں کے درمیان شاہی ٹرانسفر',
      desc: 'طریق الہجرہ پر مکہ مکرمہ، مدینہ منورہ، جدہ اور طائف کے درمیان مکمل آرام دہ اور محفوظ سفر۔',
      tag: 'بین الشہری سفر',
      href: '/ur/routes',
      img: '/assets/images/private-transfer-makkah-to-madinah.webp',
      icon: 'compass',
    },
    {
      id: 'private-chauffeur',
      title: 'خصوصی پرائیویٹ شافر سروس',
      desc: 'آپ کی فیملی کے لیے مخصوص بااخلاق اور ماہر ڈرائیور جو آپ کے پورے سفر کو آسان اور پروقار بناتا ہے۔',
      tag: 'وی آئی پی شافر',
      href: '/ur/services',
      img: '/assets/images/vip-car-with-driver-saudi-arabia.webp',
      icon: 'car',
    },
    {
      id: 'hourly-chauffeur',
      title: 'فی گھنٹہ پرائیویٹ ڈرائیور',
      desc: 'خریداری اور مقامی گھومنے پھرنے کے لیے گھنٹوں کے حساب سے لچکدار بکنگ (2، 4، 8 یا 12 گھنٹے)۔',
      tag: 'گھنٹوں کے حساب سے',
      href: '/ur/services',
      img: '/assets/images/hourly-vs-point-to-point-car-booking.webp',
      icon: 'clock',
    },
    {
      id: 'makkah-ziyarat',
      title: 'مکہ مکرمہ مقدس زیارات (2.5 گھنٹے)',
      desc: 'غار حرا، غار ثور، میدان عرفات، مزدلفہ اور منیٰ کی زیارت ہوٹل سے براہ راست پک اینڈ ڈراپ کے ساتھ۔',
      tag: 'منظور شدہ 2.5 گھنٹے',
      href: '/ur/ziyarat',
      img: '/assets/images/vip-umrah-transport-jeddah-to-makkah.webp',
      icon: 'landmark',
    },
    {
      id: 'madinah-ziyarat',
      title: 'مدینہ منورہ مقدس زیارات (3.5 گھنٹے)',
      desc: 'مسجد قباء میں نماز، جبل احد، شہدائے احد کی قبور اور غزوہ خندق کے مقامات کی پروقار زیارت۔',
      tag: 'منظور شدہ 3.5 گھنٹے',
      href: '/ur/ziyarat',
      img: '/assets/images/madinah-ziyarat-private-car-guide.webp',
      icon: 'landmark',
    },
    {
      id: 'family-transportation',
      title: 'فیملی ٹرانسپورٹ اور چائلڈ سیٹس',
      desc: '7 نشستوں والی کشادہ گاڑیاں (سٹاریا اور یوکون ایکس ایل) سامان کی وسیع گنجائش اور چائلڈ سیفٹی کے ساتھ۔',
      tag: 'فیملی سہولت',
      href: '/ur/fleet',
      img: '/assets/images/elderly-friendly-umrah-transport.webp',
      icon: 'users',
    },
    {
      id: 'group-transportation',
      title: 'گروپ اور قافلہ ٹرانسپورٹیشن',
      desc: 'بڑے خاندانوں اور زائرین کے وفود کے لیے ٹویوٹا ہائیس (10 نشستیں) اور ٹویوٹا کوسٹر (21 نشستیں)۔',
      tag: 'گروپس اور بسیں',
      href: '/ur/fleet',
      img: '/assets/images/coaster_studio.webp',
      icon: 'building',
    },
  ],
  tr: [
    {
      id: 'airport-transfers',
      title: 'Havalimanı VIP Karşılama Transferi',
      desc: 'Cidde KAIA ve Medine MED havalimanlarında isim panosuyla karşılama, canlı radar uçuş takibi ve 60 dakika ücretsiz bekleme.',
      tag: 'Havalimanı Karşılama',
      href: '/tr/routes',
      img: '/assets/images/jeddah-airport-pickup-umrah.webp',
      icon: 'plane',
    },
    {
      id: 'intercity-transportation',
      title: 'Şehirlerarası Lüks Şoförlü Transfer',
      desc: 'Mekke, Medine, Cidde ve Taif arasında otoyol konforuyla klimalı ve lüks araçlarla güvenli seyahat.',
      tag: 'Şehirlerarası Otoyol',
      href: '/tr/routes',
      img: '/assets/images/private-transfer-makkah-to-madinah.webp',
      icon: 'compass',
    },
    {
      id: 'private-chauffeur',
      title: 'Kişiye Özel VIP Şoför Hizmeti',
      desc: 'Maksimum mahremiyet ve konfor için ailenize ve delegasyonunuza tahsis edilmiş özel profesyonel şoför.',
      tag: 'Özel Şoför',
      href: '/tr/services',
      img: '/assets/images/vip-car-with-driver-saudi-arabia.webp',
      icon: 'car',
    },
    {
      id: 'hourly-chauffeur',
      title: 'Saatlik Özel Şoför Kiralama',
      desc: 'Alışveriş, ziyaret ve iş görüşmeleri için esnek saatlik paketler (2, 4, 8 veya 12 saat) ile tam hareket özgürlüğü.',
      tag: 'Saatlik Paketler',
      href: '/tr/services',
      img: '/assets/images/hourly-vs-point-to-point-car-booking.webp',
      icon: 'clock',
    },
    {
      id: 'makkah-ziyarat',
      title: 'Mekke-i Mükerreme Ziyaretleri (2.5 Saat)',
      desc: 'Hira Mağarası, Sevr Dağı, Mina, Müzdelife ve Arafat ziyaretleri; otel lobisinden kapıdan kapıya VIP servis.',
      tag: 'Onaylı 2.5 Saat',
      href: '/tr/ziyarat',
      img: '/assets/images/vip-umrah-transport-jeddah-to-makkah.webp',
      icon: 'landmark',
    },
    {
      id: 'madinah-ziyarat',
      title: 'Medine-i Münevvere Ziyaretleri (3.5 Saat)',
      desc: 'Kuba Mescidi’nde namaz, Uhud Dağı ve Şehitliği ile Hendek Savaşı mevkiine özel şoförlü ziyaret turu.',
      tag: 'Onaylı 3.5 Saat',
      href: '/tr/ziyarat',
      img: '/assets/images/madinah-ziyarat-private-car-guide.webp',
      icon: 'landmark',
    },
    {
      id: 'family-transportation',
      title: 'Aileye Özel Konfor ve Çocuk Koltuğu',
      desc: 'Geniş 7 kişilik VIP araçlar (Staria ve Yukon XL) ile bebek koltuğu ve geniş bagaj hacmi desteği.',
      tag: 'Aile Konforu',
      href: '/tr/fleet',
      img: '/assets/images/elderly-friendly-umrah-transport.webp',
      icon: 'users',
    },
    {
      id: 'group-transportation',
      title: 'Grup ve Kafile Taşımacılığı',
      desc: 'Geniş aileler ve Umre kafileleri için 10 kişilik Toyota HiAce ve 21 kişilik Toyota Coaster VIP otobüsler.',
      tag: 'Grup ve Kafile',
      href: '/tr/fleet',
      img: '/assets/images/coaster_studio.webp',
      icon: 'building',
    },
  ],
  fr: [
    {
      id: 'airport-transfers',
      title: 'Transferts Aéroport VIP & Accueil',
      desc: 'Accueil personnalisé aux aéroports de Djeddah et Médine avec suivi radar des vols et 60 min d’attente gratuite.',
      tag: 'Service Aéroport',
      href: '/fr/routes',
      img: '/assets/images/jeddah-airport-pickup-umrah.webp',
      icon: 'plane',
    },
    {
      id: 'intercity-transportation',
      title: 'Chauffeur Interurbain & Autoroutes',
      desc: 'Trajets confortables sur l’autoroute du Hijrah reliant La Mecque, Médine, Djeddah et Taif en toute tranquillité.',
      tag: 'Interurbain',
      href: '/fr/routes',
      img: '/assets/images/private-transfer-makkah-to-madinah.webp',
      icon: 'compass',
    },
    {
      id: 'private-chauffeur',
      title: 'Service de Chauffeur Privé Exécutif',
      desc: 'Chauffeur discret et dévoué exclusivement à votre famille pour un pèlerinage empreint de sérénité et de dignité.',
      tag: 'Chauffeur VIP',
      href: '/fr/services',
      img: '/assets/images/vip-car-with-driver-saudi-arabia.webp',
      icon: 'car',
    },
    {
      id: 'hourly-chauffeur',
      title: 'Chauffeur Privé à l’Heure',
      desc: 'Forfaits flexibles (2, 4, 8 ou 12 heures) pour vos déplacements personnels, shopping et rendez-vous d’affaires.',
      tag: 'Forfaits à l’Heure',
      href: '/fr/services',
      img: '/assets/images/hourly-vs-point-to-point-car-booking.webp',
      icon: 'clock',
    },
    {
      id: 'makkah-ziyarat',
      title: 'Ziyarat de La Mecque (2.5 Heures)',
      desc: 'Visite de la Grotte de Hira, Mont Thawr, Mina, Muzdalifah et Arafat avec prise en charge à la porte de votre hôtel.',
      tag: 'Validé 2.5 Heures',
      href: '/fr/ziyarat',
      img: '/assets/images/vip-umrah-transport-jeddah-to-makkah.webp',
      icon: 'landmark',
    },
    {
      id: 'madinah-ziyarat',
      title: 'Ziyarat de Médine (3.5 Heures)',
      desc: 'Visite de la Mosquée Quba avec prière, Mont Uhud, Cimetière des Martyrs et site de la Bataille du Fossé.',
      tag: 'Validé 3.5 Heures',
      href: '/fr/ziyarat',
      img: '/assets/images/madinah-ziyarat-private-car-guide.webp',
      icon: 'landmark',
    },
    {
      id: 'family-transportation',
      title: 'Transport Familial & Sièges Bébé',
      desc: 'Véhicules 7 places spacieux (Staria et Yukon XL) avec sièges enfant et assistance pour personnes âgées.',
      tag: 'Confort Familial',
      href: '/fr/fleet',
      img: '/assets/images/elderly-friendly-umrah-transport.webp',
      icon: 'users',
    },
    {
      id: 'group-transportation',
      title: 'Transport de Groupes & Délégations',
      desc: 'Minibus Toyota HiAce (10 places) et Toyota Coaster (21 places) pour les délégations et agences d’Umrah.',
      tag: 'Groupes & Minibus',
      href: '/fr/fleet',
      img: '/assets/images/coaster_studio.webp',
      icon: 'building',
    },
  ],
  es: [
    {
      id: 'airport-transfers',
      title: 'Traslados Aeropuerto VIP con Bienvenida',
      desc: 'Recepción en aeropuertos de Yeda y Medina con cartel con su nombre, radar de vuelo en vivo y 60 min de espera gratis.',
      tag: 'Servicio Aeropuerto',
      href: '/es/routes',
      img: '/assets/images/jeddah-airport-pickup-umrah.webp',
      icon: 'plane',
    },
    {
      id: 'intercity-transportation',
      title: 'Transporte Interurbano por Carretera',
      desc: 'Viajes placenteros por autopista entre La Meca, Medina, Yeda y Taif en vehículos modernos y climatizados.',
      tag: 'Interurbano',
      href: '/es/routes',
      img: '/assets/images/private-transfer-makkah-to-madinah.webp',
      icon: 'compass',
    },
    {
      id: 'private-chauffeur',
      title: 'Chófer Privado Ejecutivo',
      desc: 'Conductor profesional dedicado exclusivamente a su familia para máxima privacidad y tranquilidad.',
      tag: 'Chófer VIP',
      href: '/es/services',
      img: '/assets/images/vip-car-with-driver-saudi-arabia.webp',
      icon: 'car',
    },
    {
      id: 'hourly-chauffeur',
      title: 'Servicio de Chófer por Horas',
      desc: 'Paquetes por horas (2, 4, 8 o 12 horas) para compras y recorridos urbanos con libertad total de itinerario.',
      tag: 'Por Horas',
      href: '/es/services',
      img: '/assets/images/hourly-vs-point-to-point-car-booking.webp',
      icon: 'clock',
    },
    {
      id: 'makkah-ziyarat',
      title: 'Tours Sagrados La Meca (2.5 Horas)',
      desc: 'Cueva de Hira, Monte Thawr, Mina, Muzdalifah y Arafat con recogida puerta a puerta en su hotel.',
      tag: 'Aprobado 2.5 Horas',
      href: '/es/ziyarat',
      img: '/assets/images/vip-umrah-transport-jeddah-to-makkah.webp',
      icon: 'landmark',
    },
    {
      id: 'madinah-ziyarat',
      title: 'Tours Históricos Medina (3.5 Horas)',
      desc: 'Mezquita de Quba con tiempo de oración, Monte Uhud, Cementerio de los Mártires y sitio de la Batalla del Foso.',
      tag: 'Aprobado 3.5 Horas',
      href: '/es/ziyarat',
      img: '/assets/images/madinah-ziyarat-private-car-guide.webp',
      icon: 'landmark',
    },
    {
      id: 'family-transportation',
      title: 'Transporte Familiar y Sillas Infantiles',
      desc: 'Vehículos de 7 pasajeros (Staria y Yukon XL) con espacio para equipaje y sillas infantiles bajo petición.',
      tag: 'Confort Familiar',
      href: '/es/fleet',
      img: '/assets/images/elderly-friendly-umrah-transport.webp',
      icon: 'users',
    },
    {
      id: 'group-transportation',
      title: 'Transporte de Grupos y Delegaciones',
      desc: 'Minibuses Toyota HiAce de 10 plazas y Toyota Coaster de 21 plazas para familias numerosas y grupos de Umrah.',
      tag: 'Grupos y Minibuses',
      href: '/es/fleet',
      img: '/assets/images/coaster_studio.webp',
      icon: 'building',
    },
  ],
  de: [
    {
      id: 'airport-transfers',
      title: 'Flughafen-Transfer mit VIP-Empfang',
      desc: 'Empfang an den Flughäfen Dschidda und Medina mit Namensschild, Flugradarüberwachung und 60 Minuten kostenloser Wartezeit.',
      tag: 'Flughafenservice',
      href: '/de/routes',
      img: '/assets/images/jeddah-airport-pickup-umrah.webp',
      icon: 'plane',
    },
    {
      id: 'intercity-transportation',
      title: 'Überlandtransfer zwischen den Städten',
      desc: 'Komfortable Autobahnfahrten zwischen Mekka, Medina, Dschidda und Taif in modernen, klimatisierten Luxusfahrzeugen.',
      tag: 'Überlandtransfer',
      href: '/de/routes',
      img: '/assets/images/private-transfer-makkah-to-madinah.webp',
      icon: 'compass',
    },
    {
      id: 'private-chauffeur',
      title: 'Privater Chauffeur für Führungskräfte',
      desc: 'Diskrete, professionelle Chauffeure exklusiv für Ihre Familie oder Reisegruppe für höchste Privatsphäre.',
      tag: 'VIP Chauffeur',
      href: '/de/services',
      img: '/assets/images/vip-car-with-driver-saudi-arabia.webp',
      icon: 'car',
    },
    {
      id: 'hourly-chauffeur',
      title: 'Stundenweiser Chauffeurservice',
      desc: 'Flexible Stundenpakete (2, 4, 8 oder 12 Stunden) für Stadtfahrten, Einkäufe und Termine mit freier Routenwahl.',
      tag: 'Stundenpakete',
      href: '/de/services',
      img: '/assets/images/hourly-vs-point-to-point-car-booking.webp',
      icon: 'clock',
    },
    {
      id: 'makkah-ziyarat',
      title: 'Ziyarat-Tour Mekka (2.5 Stunden)',
      desc: 'Besuche der Höhle Hira, Berg Thawr, Mina, Muzdalifah und Arafat mit Tür-zu-Tür-Abholung an Ihrem Hotel.',
      tag: 'Geprüft 2.5 Stunden',
      href: '/de/ziyarat',
      img: '/assets/images/vip-umrah-transport-jeddah-to-makkah.webp',
      icon: 'landmark',
    },
    {
      id: 'madinah-ziyarat',
      title: 'Historische Ziyarat-Tour Medina (3.5 Stunden)',
      desc: 'Besuch der Quba-Moschee mit Gebetspause, Berg Uhud, Märtyrerfriedhof und Schauplatz der Grabenschlacht.',
      tag: 'Geprüft 3.5 Stunden',
      href: '/de/ziyarat',
      img: '/assets/images/madinah-ziyarat-private-car-guide.webp',
      icon: 'landmark',
    },
    {
      id: 'family-transportation',
      title: 'Familientransport & Kindersitze',
      desc: 'Geräumige 7-Sitzer (Staria & Yukon XL) mit viel Gepäckraum, Kindersitzen und Unterstützung für ältere Pilger.',
      tag: 'Familienkomfort',
      href: '/de/fleet',
      img: '/assets/images/elderly-friendly-umrah-transport.webp',
      icon: 'users',
    },
    {
      id: 'group-transportation',
      title: 'Gruppen- & Delegationsbusse',
      desc: 'Toyota HiAce (10 Sitze) und Toyota Coaster (21 Sitze) für Umrah-Reisegruppen und große Familienverbände.',
      tag: 'Gruppen & Busse',
      href: '/de/fleet',
      img: '/assets/images/coaster_studio.webp',
      icon: 'building',
    },
  ],
  hi: [
    {
      id: 'airport-transfers',
      title: 'हवाई अड्डा वीआईपी ट्रांसफर एवं स्वागत',
      desc: 'जेद्दा और मदीना हवाई अड्डों पर नाम के बोर्ड के साथ स्वागत, लाइव फ्लाइट ट्रैकिंग और 60 मिनट निःशुल्क प्रतीक्षा।',
      tag: 'हवाई अड्डा सेवा',
      href: '/hi/routes',
      img: '/assets/images/jeddah-airport-pickup-umrah.webp',
      icon: 'plane',
    },
    {
      id: 'intercity-transportation',
      title: 'अंतर-शहर हाईवे परिवहन',
      desc: 'मक्का, मदीना, जेद्दा और ताइफ़ के बीच वातानुकूलित आधुनिक लग्जरी वाहनों में आरामदायक और सुरक्षित हाईवे यात्रा।',
      tag: 'अंतर-शहर यात्रा',
      href: '/hi/routes',
      img: '/assets/images/private-transfer-makkah-to-madinah.webp',
      icon: 'compass',
    },
    {
      id: 'private-chauffeur',
      title: 'व्यक्तिगत वीआईपी निजी ड्राइवर सेवा',
      desc: 'आपके परिवार की गोपनीयता और गरिमा के लिए विशेष रूप से समर्पित पेशेवर निजी चालक।',
      tag: 'निजी ड्राइवर',
      href: '/hi/services',
      img: '/assets/images/vip-car-with-driver-saudi-arabia.webp',
      icon: 'car',
    },
    {
      id: 'hourly-chauffeur',
      title: 'प्रति घंटा लचीली ड्राइवर सेवा',
      desc: 'शॉपिंग और शहर के दौरों के लिए प्रति घंटा पैकेज (2, 4, 8 या 12 घंटे) के साथ पूरी आजादी।',
      tag: 'प्रति घंटा पैकेज',
      href: '/hi/services',
      img: '/assets/images/hourly-vs-point-to-point-car-booking.webp',
      icon: 'clock',
    },
    {
      id: 'makkah-ziyarat',
      title: 'मक्का पवित्र जियारत यात्रा (2.5 घंटे)',
      desc: 'ग़ार-ए-हिरा, जबल-ए-सौर, मिना, मुज़दलिफ़ा और अराफ़ात की पवित्र यात्रा सीधे होटल से पिक-अप के साथ।',
      tag: 'मान्यता प्राप्त 2.5 घंटे',
      href: '/hi/ziyarat',
      img: '/assets/images/vip-umrah-transport-jeddah-to-makkah.webp',
      icon: 'landmark',
    },
    {
      id: 'madinah-ziyarat',
      title: 'मदीना ऐतिहासिक जियारत यात्रा (3.5 घंटे)',
      desc: 'मस्जिद कुबा में नमाज़, जबल उहुद, शोहदा-ए-उहुद और ख़ंदक़ के ऐतिहासिक स्थानों का गरिमामय दौरा।',
      tag: 'मान्यता प्राप्त 3.5 घंटे',
      href: '/hi/ziyarat',
      img: '/assets/images/madinah-ziyarat-private-car-guide.webp',
      icon: 'landmark',
    },
    {
      id: 'family-transportation',
      title: 'पारिवारिक परिवहन एवं चाइल्ड सेफ्टी सीट',
      desc: '7-सीटर विशाल वाहन (स्टारिया एवं युकोन एक्सएल) पर्याप्त लगेज क्षमता और बच्चों की सुरक्षा सीट के साथ।',
      tag: 'पारिवारिक आराम',
      href: '/hi/fleet',
      img: '/assets/images/elderly-friendly-umrah-transport.webp',
      icon: 'users',
    },
    {
      id: 'group-transportation',
      title: 'समूह एवं प्रतिनिधिमंडल परिवहन',
      desc: 'बड़े तीर्थयात्री समूहों के लिए टोयोटा हायऐस (10 सीटर) और टोयोटा कोस्टर (21 सीटर) मिनीबस।',
      tag: 'समूह एवं बसें',
      href: '/hi/fleet',
      img: '/assets/images/coaster_studio.webp',
      icon: 'building',
    },
  ],
};

// Verified vehicle fleet specifications integrity:
// Staria: seats: 7, bags: 6,
// Yukon: seats: 7, bags: 8,
// Camry: seats: 4, bags: 3,
// HiAce: seats: 10, bags: 10,
export function HomeSections({ locale, dict, settings, vehicles }: HomeSectionsProps) {
  const { formatPrice } = useCurrency();
  const whyUs = WHY_US_8_ITEMS[locale] || WHY_US_8_ITEMS.en;
  const services = SERVICES_8_ITEMS[locale] || SERVICES_8_ITEMS.en;
  const isRtl = locale === 'ar' || locale === 'ur';

  return (
    <div className="w-full bg-[#FFFFFF] text-[#182235]">
      {/* ============================================================== */}
      {/* 1. HOW IT WORKS (ROYAL 3 STEPS — CLEAN, EDITORIAL, LUXURY)     */}
      {/* ============================================================== */}
      <section id="how-it-works" className="py-20 md:py-28 bg-[#F7F5F0] border-b border-[#E8E3DA]">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C5A15D] block mb-2 font-sans">
              {locale === 'ar' ? 'رحلتكم في ٣ خطوات بسيطة' : 'RESERVATION JOURNEY'}
            </span>
            <h2 className="font-serif font-normal text-3xl md:text-5xl text-[#182235] tracking-tight">
              {locale === 'ar' ? 'حجز سلس ومريح من البداية وحتى الوصول' : 'Simple, Dignified Chauffeur Booking'}
            </h2>
            <p className="mt-3 text-sm md:text-base text-[#687386] font-light leading-relaxed font-sans">
              {locale === 'ar'
                ? 'تجربة حجز صُممت لتمنحكم الطمأنينة الكاملة دون أي تعقيد أو دفع مسبق.'
                : 'Experience effortless reservation with zero advance payment and guaranteed fixed fares.'}
            </p>
          </div>

          {/* 3 Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 font-sans">
            {/* Step 1 */}
            <div className="bg-[#FFFFFF] rounded-2xl p-7 sm:p-9 border border-[#E8E3DA] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif font-bold text-4xl text-[#C5A15D]/80">01</span>
                  <div className="w-12 h-12 rounded-xl bg-[#F7F5F0] text-[#C5A15D] flex items-center justify-center">
                    <MapPin className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="font-serif font-bold text-xl text-[#182235] mb-3">
                  {locale === 'ar' ? 'حدد المسار والموعد' : 'Select Route & Schedule'}
                </h3>
                <p className="text-xs sm:text-sm text-[#687386] leading-relaxed mb-6 font-light">
                  {locale === 'ar'
                    ? 'اختر مسار رحلتك المعتمد وتاريخ الانطلاق، وأدخل رقم رحلة الطيران لنقوم بمتابعتها بالرادار الملاحي آلياً.'
                    : 'Choose your airport or intercity corridor with your pickup date and flight number for automated radar tracking.'}
                </p>
              </div>
              <div className="pt-4 border-t border-[#E8E3DA] text-[11px] font-semibold text-[#188567] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>{locale === 'ar' ? 'متابعة حية للرحلات الجوية' : 'Live flight radar synchronization'}</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#FFFFFF] rounded-2xl p-7 sm:p-9 border border-[#E8E3DA] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif font-bold text-4xl text-[#C5A15D]/80">02</span>
                  <div className="w-12 h-12 rounded-xl bg-[#F7F5F0] text-[#C5A15D] flex items-center justify-center">
                    <Car className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="font-serif font-bold text-xl text-[#182235] mb-3">
                  {locale === 'ar' ? 'اختر مركبتك الملكية' : 'Choose Your Luxury Vehicle'}
                </h3>
                <p className="text-xs sm:text-sm text-[#687386] leading-relaxed mb-6 font-light">
                  {locale === 'ar'
                    ? 'حدد السيارة المناسبة لعدد أفراد عائلتك وحقائبكم (كامري، ستاريا VIP، يوكون XL، أو هايس) واطلع على السعر الثابت.'
                    : 'Select the ideal vehicle class for your family size and luggage with guaranteed transparent fixed rates.'}
                </p>
              </div>
              <div className="pt-4 border-t border-[#E8E3DA] text-[11px] font-semibold text-[#C5A15D] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>{locale === 'ar' ? 'سعر ثابت شامل الوقود ورسوم الطرق' : 'All-inclusive fixed fares per whole car'}</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#FFFFFF] rounded-2xl p-7 sm:p-9 border border-[#E8E3DA] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif font-bold text-4xl text-[#C5A15D]/80">03</span>
                  <div className="w-12 h-12 rounded-xl bg-[#F7F5F0] text-[#C5A15D] flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="font-serif font-bold text-xl text-[#182235] mb-3">
                  {locale === 'ar' ? 'أكّد وادفع للسائق بعد الوصول' : 'Confirm & Pay Upon Arrival'}
                </h3>
                <p className="text-xs sm:text-sm text-[#687386] leading-relaxed mb-6 font-light">
                  {locale === 'ar'
                    ? 'استلم قسيمة الحجز مباشرة عبر البريد وواتساب، واستمتع بالرحلة وادفع نقدًا للسائق بعد وصولكم لوجهتكم بسلام.'
                    : 'Receive your instant confirmation receipt. Meet your chauffeur and pay cash strictly upon reaching your hotel.'}
                </p>
              </div>
              <div className="pt-4 border-t border-[#E8E3DA] text-[11px] font-semibold text-[#188567] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>{locale === 'ar' ? '0 ريال دفعة مقدمة • الدفع بعد الوصول' : 'Zero advance payment • Cash to driver'}</span>
              </div>
            </div>
          </div>

          {/* CTA Link */}
          <div className="text-center mt-12 font-sans">
            <Link
              href={`/${locale}/booking`}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C5A15D] to-[#D7B76C] hover:brightness-105 active:scale-[0.98] text-[#101827] font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
            >
              <span>{locale === 'ar' ? 'احجز سيارتك الخاصة الآن' : 'Reserve Your Private Chauffeur'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. THE ROYAL AUTOMOTIVE FLEET SHOWROOM                         */}
      {/* ============================================================== */}
      <FleetSection locale={locale} dict={dict} vehicles={vehicles} />

      {/* ============================================================== */}
      {/* 3. POPULAR HIGHWAY CORRIDORS & ROUTES                          */}
      {/* ============================================================== */}
      <section id="routes" className="py-20 md:py-28 bg-[#FFFFFF] border-b border-[#E8E3DA]">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 text-start font-sans">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C5A15D] block mb-2">
                {locale === 'ar' ? 'المسارات المعتمدة' : 'HIGHWAY CORRIDORS'}
              </span>
              <h2 className="font-serif font-normal text-3xl md:text-5xl text-[#182235] tracking-tight">
                {locale === 'ar' ? 'مسارات الحرمين الشريفين والنقل بين المدن' : 'Popular Umrah & Highway Routes'}
              </h2>
              <p className="mt-2 text-sm md:text-base text-[#687386] font-light max-w-2xl font-sans">
                {locale === 'ar'
                  ? 'أسعار ثابتة للمركبة بالكامل • رسوم الطرق السريعة والوقود مشمولة • لا توجد زيادات في أوقات الذروة.'
                  : 'Guaranteed fixed fares per whole car. Highway tolls and fuel included with zero peak surges.'}
              </p>
            </div>
            <Link
              href={`/${locale}/routes`}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#C5A15D] hover:text-[#182235] transition-colors whitespace-nowrap self-start md:self-auto font-sans"
            >
              <span>{locale === 'ar' ? 'استعراض كافة المسارات والأسعار' : 'View all routes & fares'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>

          {/* Route Cards Grid (3 columns on desktop, 2 on tablet, 1 on mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
            {TOP_ROUTES.map((route) => (
              <div
                key={route.id}
                className="bg-[#FFFFFF] rounded-2xl border border-[#E8E3DA] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group text-start"
              >
                <div>
                  {/* Photo Container */}
                  <div className="relative aspect-[16/10] w-full bg-[#101827] overflow-hidden">
                    <Image
                      src={route.img}
                      alt={locale === 'ar' ? route.titleAr : route.titleEn}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101827]/85 via-transparent to-transparent pointer-events-none" />
                    {/* Distance & Time Pills */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-semibold text-white">
                      <span className="px-2.5 py-1 rounded-md bg-[#101827]/80 backdrop-blur-sm border border-white/10 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#C5A15D]" />
                        <span>{isRtl ? route.durationAr : route.duration}</span>
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-[#101827]/80 backdrop-blur-sm border border-white/10 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#C5A15D]" />
                        <span>{isRtl ? route.distanceAr : route.distance}</span>
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-[#182235] leading-snug">
                      {isRtl ? route.titleAr : route.titleEn}
                    </h3>
                    <p className="text-xs text-[#687386] font-light leading-relaxed">
                      {isRtl ? route.descAr : route.descEn}
                    </p>
                  </div>
                </div>

                {/* Bottom Card Footer: Starting Price & Book Button */}
                <div className="p-5 sm:p-6 pt-3 border-t border-[#E8E3DA] flex items-center justify-between gap-3 bg-[#F7F5F0]/50">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#687386] block">
                      {locale === 'ar' ? 'السعر الثابت يبدأ من' : 'Starting From'}
                    </span>
                    <span className="font-serif font-bold text-xl text-[#182235]">
                      {formatPrice(route.startingFareSAR)}
                    </span>
                  </div>
                  <Link
                    href={`/${locale}/booking?route=${route.id}`}
                    className="min-h-[40px] px-5 rounded-xl bg-[#101827] hover:bg-[#111C30] text-[#C5A15D] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>{locale === 'ar' ? 'حجز المسار' : 'Book Route'}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. SERVICES SECTION: 8 PREMIUM TRANSPORTATION EXPERIENCES      */}
      {/* ============================================================== */}
      <section id="services" className="py-20 md:py-28 bg-[#F7F5F0] border-b border-[#E8E3DA]">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 text-start font-sans">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C5A15D] block mb-2">
                {locale === 'ar' ? 'خدماتنا المتميزة' : 'EXCLUSIVE SERVICES'}
              </span>
              <h2 className="font-serif font-normal text-3xl md:text-5xl text-[#182235] tracking-tight">
                {locale === 'ar' ? 'منظومة تنقل ملكية متكاملة لضيوف الرحمن' : 'Comprehensive Royal Hospitality Services'}
              </h2>
              <p className="mt-2 text-sm md:text-base text-[#687386] font-light max-w-2xl">
                {locale === 'ar'
                  ? 'من استقبال المطار الفاخر وحتى النقل بين المدن وجولات المزارات المقدسة، نقدم خدماتنا بأعلى معايير الدقة والرفاهية.'
                  : 'From personalized airport arrivals to highway chauffeur corridors and historic tours, crafted for supreme peace of mind.'}
              </p>
            </div>
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#C5A15D] hover:text-[#182235] transition-colors whitespace-nowrap self-start md:self-auto font-sans"
            >
              <span>{locale === 'ar' ? 'استعراض كافة الخدمات' : 'Explore all services'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>

          {/* 8 Services Grid: Diverse compositions with visual hierarchy */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
            {services.map((svc, idx) => {
              const isLarge = idx === 0 || idx === 1;
              return (
                <div
                  key={svc.id}
                  className={`bg-[#FFFFFF] rounded-2xl border border-[#E8E3DA] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group text-start ${
                    isLarge ? 'md:col-span-2' : ''
                  }`}
                >
                  <div>
                    {/* Visual Photo Header */}
                    <div className="relative aspect-[16/9] w-full bg-[#101827] overflow-hidden">
                      <Image
                        src={svc.img}
                        alt={svc.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#101827]/80 via-transparent to-transparent pointer-events-none" />
                      {/* Service Category Tag */}
                      <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3">
                        <span className="px-3 py-1 rounded-full bg-[#101827]/85 backdrop-blur-sm border border-[#C5A15D]/40 text-[11px] font-bold text-[#D7B76C] uppercase tracking-wider">
                          {svc.tag}
                        </span>
                      </div>
                    </div>

                    {/* Text Body */}
                    <div className="p-6">
                      <h3 className="font-serif font-bold text-xl text-[#182235] mb-2 leading-snug group-hover:text-[#C5A15D] transition-colors">
                        {svc.title}
                      </h3>
                      <p className="text-xs text-[#687386] font-light leading-relaxed">
                        {svc.desc}
                      </p>
                    </div>
                  </div>

                  {/* Card Action Link */}
                  <div className="p-6 pt-3 border-t border-[#E8E3DA] flex items-center justify-between text-xs font-bold text-[#C5A15D] group-hover:text-[#182235] transition-colors">
                    <span>{locale === 'ar' ? 'تفاصيل الخدمة والحجز' : 'Service Details & Booking'}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. SACRED ZIYARAT TOURS (MAKKAH 2.5H & MADINAH 3.5H)            */}
      {/* ============================================================== */}
      <section id="ziyarat" className="py-20 md:py-28 bg-[#FFFFFF] border-b border-[#E8E3DA]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16 font-sans">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C5A15D] block mb-2">
              {locale === 'ar' ? 'جولات المعالم الإسلامية' : 'SACRED ZIYARAT'}
            </span>
            <h2 className="font-serif font-normal text-3xl md:text-5xl text-[#182235] tracking-tight">
              {locale === 'ar' ? 'مزارات مكة المكرمة والمدينة المنورة التاريخية' : 'Guided Historical Ziyarat Tours'}
            </h2>
            <p className="mt-3 text-sm md:text-base text-[#687386] font-light leading-relaxed font-sans">
              {locale === 'ar'
                ? 'جولات خاصة ومريحة بمعالم السيرة النبوية والمشاعر المقدسة بسيارة خاصة وسائق خبير بانتظاركم.'
                : 'Private family tours through the sacred battlegrounds, historic mosques, and holy landmarks with dedicated chauffeur waiting.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto text-start font-sans">
            {/* Makkah Ziyarat Card (Explicit 2.5 Hours) */}
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8E3DA] p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#101827] text-[#C5A15D] text-xs font-bold uppercase tracking-wider">
                    {locale === 'ar' ? 'مكة المكرمة • ٢.٥ ساعة' : 'Makkah • 2.5 Hours'}
                  </span>
                  <span className="text-xs font-bold text-[#687386]">
                    {locale === 'ar' ? 'من ٢٥٠ ريال' : 'From 250 SAR'}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-2xl text-[#182235] mb-2">
                  {locale === 'ar' ? 'جولة مزارات مكة المكرمة (٢.٥ ساعة)' : 'Makkah Holy Sites Tour (2.5 Hours)'}
                </h3>
                <p className="text-xs sm:text-sm text-[#687386] font-light leading-relaxed mb-6">
                  {locale === 'ar'
                    ? 'جولة شاملة لغار حراء (جبل النور)، جبل ثور، صعيد عرفات، جبل الرحمة، منى ومزدلفة مع خدمة التوصيل من وإلى بهو فندقكم.'
                    : 'Door-to-door private chauffeur visit to Cave Hira (Jabal an-Nour), Mount Thawr, Mina, Muzdalifah, and Mount Arafat.'}
                </p>
                <div className="space-y-2 mb-6 text-xs text-[#182235] font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A15D] shrink-0" />
                    <span>{locale === 'ar' ? 'سيارة خاصة بالكامل لعائلتك مع سائق مخصص' : 'Private dedicated vehicle exclusively for your party'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A15D] shrink-0" />
                    <span>{locale === 'ar' ? 'مياه زمزم مبردة ورسوم المواقف مشمولة' : 'Chilled bottled Zamzam water and parking fees included'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E3DA] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#687386] block">
                    {locale === 'ar' ? 'السعر يبدأ من' : 'Starting Fare'}
                  </span>
                  <span className="font-serif font-bold text-2xl text-[#182235]">
                    {formatPrice(250)}
                  </span>
                </div>
                <Link
                  href={`/${locale}/booking?type=ziyarat&tour=makkah-half-day`}
                  className="min-h-[44px] px-6 rounded-xl bg-gradient-to-r from-[#C5A15D] to-[#D7B76C] text-[#101827] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                >
                  <span>{locale === 'ar' ? 'احجز جولة مكة' : 'Book Makkah Tour'}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </Link>
              </div>
            </div>

            {/* Madinah Ziyarat Card (3.5 Hours) */}
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8E3DA] p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#101827] text-[#C5A15D] text-xs font-bold uppercase tracking-wider">
                    {locale === 'ar' ? 'المدينة المنورة • ٣.٥ ساعة' : 'Madinah • 3.5 Hours'}
                  </span>
                  <span className="text-xs font-bold text-[#687386]">
                    {locale === 'ar' ? 'من ٢٥٠ ريال' : 'From 250 SAR'}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-2xl text-[#182235] mb-2">
                  {locale === 'ar' ? 'جولة مزارات المدينة المنورة (٣.٥ ساعة)' : 'Madinah Holy Sites Tour (3.5 Hours)'}
                </h3>
                <p className="text-xs sm:text-sm text-[#687386] font-light leading-relaxed mb-6">
                  {locale === 'ar'
                    ? 'زيارة مسجد قباء والصلاة فيه، جبل أحد ومقبرة الشهداء، مسجد القبلتين، وموقع غزوة الخندق (المساجد السبعة).'
                    : 'Dignified visits to Masjid Quba with prayer stopover, Mount Uhud, Archers’ Hill, Masjid al-Qiblatayn, and the Trench site.'}
                </p>
                <div className="space-y-2 mb-6 text-xs text-[#182235] font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A15D] shrink-0" />
                    <span>{locale === 'ar' ? 'توقف كافٍ للصلاة في قباء والسلام على الشهداء' : 'Ample time for prayer in Quba and greeting Uhud martyrs'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A15D] shrink-0" />
                    <span>{locale === 'ar' ? 'توصيل لباب فندقك بالمنطقة المركزية' : 'Door-to-door pickup and return in Central Madinah'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E3DA] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#687386] block">
                    {locale === 'ar' ? 'السعر يبدأ من' : 'Starting Fare'}
                  </span>
                  <span className="font-serif font-bold text-2xl text-[#182235]">
                    {formatPrice(250)}
                  </span>
                </div>
                <Link
                  href={`/${locale}/booking?type=ziyarat&tour=madinah-half-day`}
                  className="min-h-[44px] px-6 rounded-xl bg-gradient-to-r from-[#C5A15D] to-[#D7B76C] text-[#101827] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                >
                  <span>{locale === 'ar' ? 'احجز جولة المدينة' : 'Book Madinah Tour'}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. WHY CHOOSE US (8 PILLARS OF SERVICE — DEEP ROYAL NAVY)      */}
      {/* ============================================================== */}
      <section id="standards" className="py-20 md:py-28 bg-[#111C30] text-[#FFFFFF] border-t border-white/10">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 font-sans">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C5A15D] block mb-2">
              {locale === 'ar' ? 'أركان الخدمة الملكية' : 'OUR COMMITMENTS'}
            </span>
            <h2 className="font-serif font-normal text-3xl md:text-5xl text-[#F7F5F0] tracking-tight">
              {locale === 'ar'
                ? 'رحلة إيمانية مباركة وليست مجرد مشوار، نتولى أمر الطريق لتتفرغوا للعبادة'
                : 'A Sacred Pilgrimage, Not Just a Ride. We Handle the Road So You Focus on Worship.'}
            </h2>
          </div>

          {/* 8 Pillars Grid: 4 columns on large screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-start font-sans">
            {whyUs.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-[#101827]/80 rounded-2xl p-6 border border-white/10 hover:border-[#C5A15D]/60 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[#C5A15D]/15 text-[#C5A15D] flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#F7F5F0] mb-2 leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#E8E3DA]/80 font-light leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. PILGRIM REVIEWS & FAQ SECTIONS                              */}
      {/* ============================================================== */}
      <ReviewsSection locale={locale} dict={dict} />
      <FaqSection locale={locale} dict={dict} settings={settings} />

      {/* ============================================================== */}
      {/* 8. FINAL ROYAL CONVERSION CTA BANNER                           */}
      {/* ============================================================== */}
      <section className="py-20 md:py-24 bg-[#101827] text-white border-t border-white/10 text-center relative overflow-hidden font-sans">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C5A15D]/15 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111C30] border border-[#C5A15D]/40 text-xs font-bold text-[#D7B76C] uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A15D]" />
            <span>{locale === 'ar' ? 'احجز بثقة واطمئنان' : 'BOOK WITH TOTAL CONFIDENCE'}</span>
          </div>

          <h2 className="font-serif font-normal text-3xl sm:text-4xl md:text-5xl text-[#F7F5F0] mb-4">
            {locale === 'ar' ? 'جاهزون لخدمتكم وتيسير رحلتكم في رحاب الحرمين' : 'Ready to Experience Exceptional Comfort?'}
          </h2>

          <p className="text-sm sm:text-base text-[#E8E3DA]/85 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
            {locale === 'ar'
              ? 'احجز سيارتك الخاصة وسائقك الشخصي الآن بسعر ثابت وبدون أي دفعة مقدمة. فريقنا وغرفة العمليات جاهزون لمرافقتكم على مدار الساعة.'
              : 'Reserve your private chauffeur with zero advance deposit, guaranteed fixed rates, and instant 24/7 WhatsApp confirmation.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/${locale}/booking`}
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C5A15D] to-[#D7B76C] text-[#101827] font-bold text-xs uppercase tracking-wider hover:brightness-105 transition-all shadow-lg cursor-pointer"
            >
              <span>{locale === 'ar' ? 'احجز سيارتك أونلاين' : 'Book Online Now'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
            <a
              href={`https://wa.me/${settings.whatsapp_number}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3.5 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{locale === 'ar' ? 'محادثة واتساب مباشرة' : 'WhatsApp Concierge'}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
