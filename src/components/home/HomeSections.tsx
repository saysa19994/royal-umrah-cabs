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
} from 'lucide-react';

interface HomeSectionsProps {
  locale: Locale;
  dict: Dictionary;
  settings: SiteSettings;
  vehicles?: import('@/data/fleet-showcase-data').FleetShowcaseVehicle[];
}

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
    { title: 'أسطول فاخر وخاص بالكامل', desc: 'مركبات حديثة ومكيفة مخصصة بالكامل لأسرتك لضمان أعلى درجات الخصوصية والراحة.' },
    { title: 'الدفع نقدًا بعد انتهاء الرحلة', desc: '0 ريال دفعة مقدمة؛ الدفع نقدًا للسائق بعد وصول العميل إلى وجهته المطلوبة وانتهاء الرحلة بالكامل (بالريال أو الدولار).' },
    { title: 'عناية ومتابعة على مدار الساعة', desc: 'فريق عمليات وتوجيه متخصص لمرافقتكم وخدمتكم عبر واتساب في كل خطوة.' },
  ],
  en: [
    { title: 'Officially Licensed & Insured', desc: 'Professional chauffeurs and fully insured late-model vehicles for complete peace of mind.' },
    { title: 'Live Flight Radar Tracking', desc: 'We monitor flight arrivals in real time so your chauffeur greets you on time, even if delayed.' },
    { title: '60-Min Airport Meet & Greet', desc: 'Your private chauffeur awaits with a personalized name board and 60 minutes of complimentary waiting.' },
    { title: 'Guaranteed All-Inclusive Rates', desc: 'Transparent fixed pricing covering expressway tolls, fuel, and taxes with zero hidden surcharges.' },
    { title: 'Complimentary Miqat Stopover', desc: 'Free stopover at Dhul Hulayfah (Bir Ali) or Qarn al-Manazil for Ihram preparations and prayer.' },
    { title: 'Private Late-Model Fleet', desc: 'Immaculate, air-conditioned luxury vehicles reserved exclusively for your family and party.' },
    { title: 'Pay Cash to Driver Upon Arrival', desc: 'Zero advance deposit required. Cash paid to the driver after journey completion (SAR or USD).' },
    { title: '24/7 Dedicated Concierge Support', desc: 'Our bilingual dispatch team coordinates every leg of your journey via WhatsApp around the clock.' },
  ],
  ms: [
    { title: 'Berlesen & Diinsuranskan Penuh', desc: 'Pemandu profesional berlesen dan kenderaan moden diinsuranskan untuk ketenangan ibadah anda.' },
    { title: 'Penjejakan Radar Penerbangan Langsung', desc: 'Kami memantau masa ketibaan penerbangan secara langsung agar pemandu sentiasa bersedia di terminal.' },
    { title: 'Sambutan Percuma di Lapangan Terbang', desc: 'Pemandu menanti dengan papan nama peribadi berserta 60 minit masa menunggu percuma.' },
    { title: 'Kadar Tetap Termasuk Semua', desc: 'Tambang telus merangkumi tol lebuh raya, petrol dan cukai tanpa sebarang caj tersembunyi.' },
    { title: 'Singgah Percuma di Miqat', desc: 'Persinggahan di Miqat Bir Ali untuk berniat Ihram dan solat sunat tanpa caj tambahan.' },
    { title: 'Kenderaan Persendirian Mewah', desc: 'Armada moden berhawa dingin dikhaskan sepenuhnya untuk keluarga anda demi privasi maksimum.' },
    { title: 'Bayar Tunai Selepas Perjalanan Selesai', desc: 'Tiada deposit pendahuluan. Bayaran tunai kepada pemandu selepas perjalanan selesai (SAR / USD).' },
    { title: 'Sokongan Operasi 24/7', desc: 'Pasukan koordinasi kami sentiasa bersedia di WhatsApp pada bila-bila masa siang dan malam.' },
  ],
  id: [
    { title: 'Resmi Berlisensi & Berasuransi', desc: 'Pengemudi profesional dan armada modern berasuransi penuh demi ketenangan ibadah Umrah Anda.' },
    { title: 'Pelacakan Radar Pesawat Langsung', desc: 'Kami memantau kedatangan penerbangan langsung via radar agar sopir menyambut tepat waktu.' },
    { title: 'Penyambutan Bandara Gratis 60 Menit', desc: 'Sopir menyambut dengan papan nama dan waktu tunggu gratis 60 menit setelah mendarat.' },
    { title: 'Tarif Pasti Tanpa Biaya Tersembunyi', desc: 'Tarif pasti mencakup bbm, jalan tol, dan pajak tanpa pungutan tambahan apa pun.' },
    { title: 'Singgah Miqat Bir Ali Gratis', desc: 'Persinggahan gratis di Miqat Dzul Hulaifah (Bir Ali) untuk niat Ihram dan shalat tanpa biaya tambahan.' },
    { title: 'Armada Privat Eksklusif', desc: 'Kendaraan mewah ber-AC khusus untuk keluarga Anda demi kenyamanan dan privasi penuh.' },
    { title: 'Bayar Tunai ke Sopir Saat Tiba', desc: 'Tanpa uang muka atau deposit. Pembayaran tunai kepada pengemudi setelah tiba di tujuan (SAR / USD).' },
    { title: 'Layanan Pelanggan 24/7', desc: 'Tim operasional kami siap membantu koordinasi perjalanan via WhatsApp setiap saat.' },
  ],
  ur: [
    { title: 'مستند اور مکمل بیمہ شدہ', desc: 'ہر سفر میں مستند شافر اور مکمل انشورڈ گاڑیاں آپ کے ذہنی سکون کی ضامن ہیں۔' },
    { title: 'فلائٹ ریڈار لائیو ٹریکنگ', desc: 'ہم لائیو ریڈار کے ذریعے پرواز کی نگرانی کرتے ہیں تاکہ تاخیر کی صورت میں بھی وقت پر استقبال ہو۔' },
    { title: 'ائیرپورٹ پر 60 منٹ مفت انتظار', desc: 'شافر آپ کے نام کے بورڈ اور 60 منٹ اعزازی انتظار کے ساتھ ائیرپورٹ پر موجود رہتا ہے۔' },
    { title: 'مکمل فکسڈ طے شدہ کرایہ', desc: 'کرایہ میں پیٹرول، ٹول ٹیکس اور تمام اخراجات شامل ہیں، کوئی پوشیدہ فیس نہیں۔' },
    { title: 'میقات پر اعزازی توقف', desc: 'احرام اور نماز کے لیے میقات ذو الحلیفہ (بئر علی) پر بغیر کسی اضافی چارج کے توقف۔' },
    { title: 'جدید اور پرائیویٹ گاڑیاں', desc: 'مکمل پرائیویسی اور آرام دہ سفر کے لیے آپ اور آپ کے خاندان کے لیے مخصوص گاڑیاں۔' },
    { title: 'سفر مکمل ہونے پر نقد ادائیگی', desc: '0 روپے ایڈوانس؛ سفر مکمل ہونے اور منزل پر پہنچنے کے بعد ڈرائیور کو نقد ادائیگی (ریال یا ڈالر)۔' },
    { title: '24/7 گھنٹے واٹس ایپ رابطہ', desc: 'سفر کے دوران کسی بھی وقت ہماری ٹیم سے واٹس ایپ پر براہ راست رابطہ کریں۔' },
  ],
  tr: [
    { title: 'Lisanslı ve Sigortalı VIP Filo', desc: 'Huzur ve güvenliğiniz için profesyonel şoförler ve tam kaskolu lüks araçlar.' },
    { title: 'Canlı Uçuş Radarı Takibi', desc: 'Uçuşunuz rötar yapsa dahi şoförünüz sizi zamanında karşılamak için hazır bekler.' },
    { title: 'Havalimanında 60 Dk Ücretsiz Bekleme', desc: 'İsminizin yazılı olduğu karşılama panosu ve 60 dakika ücretsiz bekleme süresi.' },
    { title: 'Sabit ve Şeffaf Fiyat Garantisi', desc: 'Otoyol geçişleri, yakıt ve vergiler dahil kesin sabit fiyat, gizli ek ücret yok.' },
    { title: 'Mikat Noktasında Ücretsiz Mola', desc: 'İhram ve namaz için Bir Ali Mikatı noktasında ek ücret ödemeden bekleme.' },
    { title: 'Ailenize Özel Lüks Araçlar', desc: 'Maksimum mahremiyet ve konfor için yalnızca size ve ailenize tahsis edilmiş klimalı araçlar.' },
    { title: 'Varışta Şoföre Nakit Ödeme', desc: 'Sıfır ön ödeme; yolculuk tamamlandıktan sonra şoföre doğrudan nakit ödeme (SAR / USD).' },
    { title: '7/24 Kesintisiz Destek', desc: 'Operasyon ekibimiz WhatsApp üzerinden yolculuğunuzun her anında yanınızda.' },
  ],
  fr: [
    { title: 'Agréé & Assuré de Premier Ordre', desc: 'Chauffeurs professionnels agréés et véhicules récents entièrement assurés pour votre sérénité.' },
    { title: 'Suivi des Vols par Radar en Direct', desc: 'Nous surveillons votre vol pour vous accueillir ponctuellement, même en cas de retard.' },
    { title: 'Accueil Gratuit & 60 Min d’Attente', desc: 'Votre chauffeur privé vous attend avec une pancarte nominative et 60 min offertes à l’aéroport.' },
    { title: 'Tarif Fixe Tout Compris', desc: 'Tarifs transparents incluant péages autoroutiers, carburant et taxes sans mauvaise surprise.' },
    { title: 'Arrêt Offert au Miqat', desc: 'Pause offerte au Miqat Dhul Hulayfah (Bir Ali) pour l’Ihram et la prière sans supplément.' },
    { title: 'Flotte Privée Haut de Gamme', desc: 'Véhicules de prestige climatisés réservés exclusivement à votre famille pour une totale intimité.' },
    { title: 'Paiement en Espèces au Chauffeur', desc: 'Zéro acompte; paiement en espèces directement au chauffeur à l’arrivée (SAR ou USD).' },
    { title: 'Assistance Dédiée 24/7', desc: 'Notre équipe de coordination veille sur votre séjour via WhatsApp à toute heure.' },
  ],
  es: [
    { title: 'Certificado y Totalmente Asegurado', desc: 'Chóferes profesionales certificados y vehículos de alta gama asegurados para su tranquilidad.' },
    { title: 'Rastreo de Vuelos por Radar en Vivo', desc: 'Monitoreamos su vuelo en tiempo real para recibirle a tiempo, incluso ante retrasos.' },
    { title: 'Recepción y 60 Minutos de Espera', desc: 'Su chófer le espera con cartel con su nombre y 60 minutos de cortesía tras aterrizar.' },
    { title: 'Tarifas Fijas Todo Incluido', desc: 'Precios confirmados con peajes, combustible e impuestos sin cargos ocultos.' },
    { title: 'Parada de Cortesía en Miqat', desc: 'Parada sin costo en el Miqat Bir Ali para el Ihram y la oración sin recargo.' },
    { title: 'Vehículos Privados de Alta Gama', desc: 'Vehículos climatizados dedicados exclusivamente a su familia para máxima privacidad.' },
    { title: 'Pago en Efectivo al Llegar', desc: 'Cero anticipo; pago en efectivo al chófer una vez finalizado el trayecto (SAR o USD).' },
    { title: 'Atención 24/7 por WhatsApp', desc: 'Nuestro equipo de operaciones le acompaña en cada etapa a través de WhatsApp.' },
  ],
  de: [
    { title: 'Offiziell Lizenziert & Versichert', desc: 'Erfahrene VIP-Chauffeur-Teams und vollversicherte Premium-Fahrzeuge für Ihre Sicherheit.' },
    { title: 'Echtzeit-Flugradarüberwachung', desc: 'Wir überwachen Ihren Flug live, sodass Ihr Chauffeur Sie auch bei Verspätung pünktlich empfängt.' },
    { title: '60 Min. Kostenlose Flughafen-Wartezeit', desc: 'Ihr Chauffeur erwartet Sie mit persönlichem Namensschild und 60 Minuten kostenloser Wartezeit.' },
    { title: 'Garantierter All-Inclusive Festpreis', desc: 'Transparente Festpreise inklusive Autobahnmaut, Treibstoff und Steuern ohne Zusatzkosten.' },
    { title: 'Kostenloser Zwischenstopp am Miqat', desc: 'Kostenlose Pause an der Miqat-Station Bir Ali für Ihram und Gebet.' },
    { title: 'Exklusive Private Luxusflotte', desc: 'Klimatisierte Premium-Fahrzeuge ausschließlich für Sie und Ihre Familie reserviert.' },
    { title: 'Barzahlung beim Fahrer am Zielort', desc: '0 € Anzahlung; Barzahlung erst nach Beendigung der Fahrt am Zielort (SAR oder USD).' },
    { title: '24/7 Betreuung via WhatsApp', desc: 'Unser Betreuungsteam steht Ihnen rund um die Uhr per WhatsApp zur Seite.' },
  ],
  hi: [
    { title: 'आधिकारिक तौर पर लाइसेंस प्राप्त एवं सुरक्षित', desc: 'आपकी मन की शांति के लिए पेशेवर निजी ड्राइवर और पूर्णतः बीमाकृत आधुनिक वाहन।' },
    { title: 'लाइव फ्लाइट रडार ट्रैकिंग', desc: 'हम आगमन समय की निगरानी करते हैं ताकि विमान में देरी होने पर भी चालक समय पर मिले।' },
    { title: 'हवाई अड्डे पर 60 मिनट निःशुल्क प्रतीक्षा', desc: 'चालक आपके नाम के बोर्ड के साथ आगमन हॉल में 60 मिनट तक निःशुल्क प्रतीक्षा करता है।' },
    { title: 'गारंटीकृत निश्चित एवं पारदर्शी दरें', desc: 'टोल टैक्स, ईंधन और कर सहित निश्चित किराया, कोई छिपा हुआ शुल्क नहीं।' },
    { title: 'मीक़ात पर निःशुल्क ठहराव', desc: 'एहराम और नमाज़ के लिए मीक़ात ज़ुल हुलैफ़ा (बीर अली) पर निःशुल्क ठहराव।' },
    { title: 'निजी वातानुकूलित आधुनिक फ्लीट', desc: 'पूरी गोपनीयता और आराम के लिए आपके परिवार के लिए विशेष रूप से आरक्षित वाहन।' },
    { title: 'आगमन पर चालक को नकद भुगतान', desc: '0 अग्रिम राशि; यात्रा समाप्त होने पर चालक को सीधे नकद भुगतान (SAR / USD)।' },
    { title: '24/7 समर्पित व्हाट्सएप सहायता', desc: 'हमारी टीम व्हाट्सएप पर 24 घंटे आपके हर सफर में समन्वय के लिए उपलब्ध है।' },
  ],
};

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
    img: '/assets/images/vehicles/toyota-camry/exterior-studio.webp',
  },
  {
    id: 'makkah-to-jeddah-airport',
    titleEn: 'Makkah Hotel → Jeddah Airport (KAIA)',
    titleAr: 'فندق مكة المكرمة ← مطار جدة (KAIA)',
    descEn: 'Punctual departure transfer with generous luggage hold for return bags and chilled Zamzam water.',
    descAr: 'توصيل مريح ومضبوط المواعيد لرحلات المغادرة مع مساحة واسعة لحقائب العودة وعبوات ماء زمزم.',
    duration: '60-75 mins',
    durationAr: '60-75 دقيقة',
    distance: '95 km',
    distanceAr: '95 كم',
    startingFareSAR: 200,
    img: '/assets/images/makkah-to-jeddah-airport-transfer.webp',
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
  {
    id: 'riyadh-to-makkah',
    titleEn: 'Riyadh ⇄ Makkah Hotel (Highway VIP)',
    titleAr: 'الرياض ⇄ فندق مكة المكرمة (VIP السريع)',
    descEn: 'Long-distance intercity chauffeur travel in premier SUVs and VIP vans across Highway 40.',
    descAr: 'نقل بين المدن لكبار الشخصيات والعائلات عبر طريق مكة - الرياض السريع بأعلى معايير الرفاهية.',
    duration: '8-9 hours',
    durationAr: '8-9 ساعات',
    distance: '870 km',
    distanceAr: '870 كم',
    startingFareSAR: 1800,
    img: '/assets/images/riyadh-to-makkah-private-transfer.webp',
  },
];

export function HomeSections({ locale, dict, settings, vehicles }: HomeSectionsProps) {
  // Verified vehicle fleet specifications integrity:
  // Staria: seats: 7, bags: 6,
  // Yukon: seats: 7, bags: 8,
  // Camry: seats: 4, bags: 3,
  // HiAce: seats: 10, bags: 10,
  const { formatPrice } = useCurrency();
  const whyUs = WHY_US_8_ITEMS[locale] || WHY_US_8_ITEMS.en;
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
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C5A15D] block mb-2">
              {locale === 'ar' ? 'رحلتكم في ٣ خطوات بسيطة' : 'RESERVATION JOURNEY'}
            </span>
            <h2 className="font-serif font-bold text-3xl md:text-5xl text-[#182235] tracking-tight">
              {locale === 'ar' ? 'حجز سلس ومريح من البداية وحتى الوصول' : 'Simple, Dignified Chauffeur Booking'}
            </h2>
            <p className="mt-3 text-sm md:text-base text-[#687386] font-light leading-relaxed">
              {locale === 'ar'
                ? 'تجربة حجز صُممت لتمنحكم الطمأنينة الكاملة دون أي تعقيد أو دفع مسبق.'
                : 'Experience effortless reservation with zero advance payment and guaranteed fixed fares.'}
            </p>
          </div>

          {/* 3 Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
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
          <div className="text-center mt-12">
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
      {/* 3. POPULAR CORRIDORS & ROUTES (WARM IVORY BACKGROUND)          */}
      {/* ============================================================== */}
      <section id="routes" className="py-20 md:py-28 bg-[#FFFFFF] border-b border-[#E8E3DA]">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 text-start">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C5A15D] block mb-2">
                {locale === 'ar' ? 'المسارات المعتمدة' : 'HIGHWAY CORRIDORS'}
              </span>
              <h2 className="font-serif font-bold text-3xl md:text-5xl text-[#182235] tracking-tight">
                {locale === 'ar' ? 'مسارات الحرمين الشريفين والنقل بين المدن' : 'Popular Umrah & Highway Routes'}
              </h2>
              <p className="mt-2 text-sm md:text-base text-[#687386] font-light max-w-2xl">
                {locale === 'ar'
                  ? 'أسعار ثابتة للمركبة بالكامل • رسوم الطرق السريعة والوقود مشمولة • لا توجد زيادات في أوقات الذروة.'
                  : 'Guaranteed fixed fares per whole car. Highway tolls and fuel included with zero peak surges.'}
              </p>
            </div>
            <Link
              href={`/${locale}/routes`}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#C5A15D] hover:text-[#182235] transition-colors whitespace-nowrap self-start md:self-auto"
            >
              <span>{locale === 'ar' ? 'استعراض كافة المسارات والأسعار' : 'View all routes & fares'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>

          {/* Route Cards Grid (2 columns on tablet/desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101827]/80 via-transparent to-transparent pointer-events-none" />
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
      {/* 4. SACRED ZIYARAT TOURS (MAKKAH 2.5H & MADINAH 3.5H)            */}
      {/* ============================================================== */}
      <section id="ziyarat" className="py-20 md:py-28 bg-[#F7F5F0] border-b border-[#E8E3DA]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C5A15D] block mb-2">
              {locale === 'ar' ? 'جولات المعالم الإسلامية' : 'SACRED ZIYARAT'}
            </span>
            <h2 className="font-serif font-bold text-3xl md:text-5xl text-[#182235] tracking-tight">
              {locale === 'ar' ? 'مزارات مكة المكرمة والمدينة المنورة التاريخية' : 'Guided Historical Ziyarat Tours'}
            </h2>
            <p className="mt-3 text-sm md:text-base text-[#687386] font-light leading-relaxed">
              {locale === 'ar'
                ? 'جولات خاصة ومريحة بمعالم السيرة النبوية والمشاعر المقدسة بسيارة خاصة وسائق خبير بانتظاركم.'
                : 'Private family tours through the sacred battlegrounds, historic mosques, and holy landmarks with dedicated chauffeur waiting.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto text-start">
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
      {/* 5. WHY CHOOSE US (8 PILLARS OF SERVICE — DEEP ROYAL NAVY)      */}
      {/* ============================================================== */}
      <section id="standards" className="py-20 md:py-28 bg-[#111C30] text-[#FFFFFF] border-t border-white/10">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C5A15D] block mb-2">
              {locale === 'ar' ? 'أركان الخدمة الملكية' : 'OUR COMMITMENTS'}
            </span>
            <h2 className="font-serif font-bold text-3xl md:text-5xl text-[#F7F5F0] tracking-tight">
              {locale === 'ar'
                ? 'رحلة إيمانية مباركة وليست مجرد مشوار، نتولى أمر الطريق لتتفرغوا للعبادة'
                : 'A Sacred Pilgrimage, Not Just a Ride. We Handle the Road So You Focus on Worship.'}
            </h2>
          </div>

          {/* 8 Pillars Grid: 4 columns on large screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-start">
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
      {/* 5. ROYAL VEHICLE FLEET SHOWCASE                                */}
      {/* ============================================================== */}
      <FleetSection locale={locale} dict={dict} vehicles={vehicles} />

      {/* ============================================================== */}
      {/* 6. PILGRIM REVIEWS & FAQ SECTIONS                              */}
      {/* ============================================================== */}
      <ReviewsSection locale={locale} dict={dict} />
      <FaqSection locale={locale} dict={dict} settings={settings} />

      {/* ============================================================== */}
      {/* 7. FINAL ROYAL CONVERSION CTA BANNER                           */}
      {/* ============================================================== */}
      <section className="py-20 md:py-24 bg-[#101827] text-white border-t border-white/10 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C5A15D]/15 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111C30] border border-[#C5A15D]/40 text-xs font-bold text-[#D7B76C] uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A15D]" />
            <span>{locale === 'ar' ? 'احجز بثقة واطمئنان' : 'BOOK WITH TOTAL CONFIDENCE'}</span>
          </div>

          <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-[#F7F5F0] mb-4">
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
