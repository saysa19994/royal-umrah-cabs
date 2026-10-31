'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Locale } from '@/i18n/config';
import { WhatsAppModal } from '@/components/common/WhatsAppModal';
import { SAUDI_LOCATIONS } from '@/components/home/LocationAutocomplete';
import {
  ArrowRight,
  ShieldCheck,
  Calendar,
  Clock,
  Car,
  ChevronDown,
  Sparkles,
  MapPin,
  CheckCircle2,
} from 'lucide-react';

interface HeroSectionProps {
  locale: Locale;
}

interface HeroI18n {
  badge: string;
  headline: string;
  subheadline: string;
  tabOneWay: string;
  tabHourly: string;
  tabZiyarat: string;
  routeLabel: string;
  selectRoute: string;
  pickupLabel: string;
  dropoffLabel: string;
  dateLabel: string;
  timeLabel: string;
  durationLabel: string;
  hoursSuffix: string;
  ctaBook: string;
  ctaWhatsApp: string;
  guarantee1: string;
  guarantee2: string;
  guarantee3: string;
  guarantee4: string;
}

const HERO_I18N: Record<Locale, HeroI18n> = {
  ar: {
    badge: '★ خدمة النقل الفاخر لضيوف الرحمن',
    headline: 'تجربة تنقل استثنائية في المملكة بأعلى درجات الرفاهية والسكينة',
    subheadline:
      'خدمات السائق الخاص والنقل الفاخر لضيوف الرحمن والعائلات والوفود عبر مكة المكرمة والمدينة المنورة وجدة والطائف والرياض.',
    tabOneWay: 'توصيل بين المدن والمطارات',
    tabHourly: 'سائق خاص بالساعة',
    tabZiyarat: 'جولات المزارات الشريفة',
    routeLabel: 'المسار المطلوب',
    selectRoute: 'اختر مسار الرحلة المعتمد',
    pickupLabel: 'موقع الانطلاق',
    dropoffLabel: 'وجهة الوصول',
    dateLabel: 'تاريخ الرحلة',
    timeLabel: 'وقت الانطلاق',
    durationLabel: 'المدة المطلوبة',
    hoursSuffix: 'ساعات',
    ctaBook: 'استعراض الأسعار والحجز',
    ctaWhatsApp: 'محادثة المساعد الملكي عبر واتساب',
    guarantee1: '0 ريال دفعة مقدمة • الدفع نقدًا للسائق بعد الوصول',
    guarantee2: '60 دقيقة انتظار مجاني بالمطار وتتبع راداري للرحلات',
    guarantee3: 'توقف مجاني للإحرام بميقات آبار علي أو قرن المنازل',
    guarantee4: 'أسعار ثابتة ومعتمدة شاملة الوقود والضريبة ورسوم الطرق',
  },
  en: {
    badge: '★ ROYAL LUXURY CHAUFFEUR & TRANSFERS',
    headline: 'Experience Saudi Arabia in Exceptional Comfort',
    subheadline:
      'Premium private chauffeur and transportation services for Umrah pilgrims, families, and executive travelers across Makkah, Madinah, Jeddah, Taif, and Riyadh.',
    tabOneWay: 'Airport & Intercity Transfer',
    tabHourly: 'Hourly Private Chauffeur',
    tabZiyarat: 'Sacred Ziyarat Tours',
    routeLabel: 'Popular Highway Route',
    selectRoute: 'Select an Authoritative Route',
    pickupLabel: 'Pickup Location',
    dropoffLabel: 'Destination / Hotel',
    dateLabel: 'Pickup Date',
    timeLabel: 'Pickup Time',
    durationLabel: 'Service Duration',
    hoursSuffix: 'Hours',
    ctaBook: 'Explore Fares & Reserve',
    ctaWhatsApp: 'Concierge WhatsApp Chat',
    guarantee1: 'Zero advance payment • Pay cash to driver upon arrival',
    guarantee2: '60-min free airport wait with live flight radar tracking',
    guarantee3: 'Complimentary Miqat prayer stopover included',
    guarantee4: 'All-inclusive fixed fares with fuel, tolls & taxes',
  },
  ms: {
    badge: '★ PERKHIDMATAN PEMANDU DIRAJA VIP',
    headline: 'Alami Pengangkutan Arab Saudi dengan Keselesaan Luar Biasa',
    subheadline:
      'Perkhidmatan pemandu peribadi premium untuk jemaah Umrah, keluarga dan delegasi di seluruh Makkah, Madinah, Jeddah, Taif dan Riyadh.',
    tabOneWay: 'Pemindahan Lapangan Terbang & Antara Bandar',
    tabHourly: 'Pemandu Mengikut Jam',
    tabZiyarat: 'Ziarah Tempat Bersejarah',
    routeLabel: 'Pilihan Laluan Utama',
    selectRoute: 'Pilih Laluan Perjalanan',
    pickupLabel: 'Lokasi Pengambilan',
    dropoffLabel: 'Lokasi Destinasi / Hotel',
    dateLabel: 'Tarikh Pengambilan',
    timeLabel: 'Masa Pengambilan',
    durationLabel: 'Tempoh Perkhidmatan',
    hoursSuffix: 'Jam',
    ctaBook: 'Lihat Tambang & Tempah',
    ctaWhatsApp: 'Sembang WhatsApp Pengendali',
    guarantee1: '0 bayaran pendahuluan • Bayar tunai kepada pemandu',
    guarantee2: '60 minit masa menunggu percuma & penjejakan radar penerbangan',
    guarantee3: 'Singgah percuma di Miqat Bir Ali untuk berniat Ihram',
    guarantee4: 'Kadar tetap termasuk tol lebuh raya, petrol & cukai',
  },
  id: {
    badge: '★ LAYANAN TRANSPORTASI VIP KERAJAAN',
    headline: 'Nikmati Perjalanan Arab Saudi dengan Kenyamanan Paripurna',
    subheadline:
      'Layanan sopir privat premium untuk jamaah Umrah, keluarga, dan delegasi eksekutif di seluruh Makkah, Madinah, Jeddah, Taif, dan Riyadh.',
    tabOneWay: 'Antar Jemput Bandara & Antarkota',
    tabHourly: 'Sopir Sewa Per Jam',
    tabZiyarat: 'Ziarah Tempat Bersejarah',
    routeLabel: 'Pilihan Rute Perjalanan',
    selectRoute: 'Pilih Rute Resmi',
    pickupLabel: 'Titik Penjemputan',
    dropoffLabel: 'Hotel Tujuan / Lokasi',
    dateLabel: 'Tanggal Penjemputan',
    timeLabel: 'Waktu Penjemputan',
    durationLabel: 'Durasi Layanan',
    hoursSuffix: 'Jam',
    ctaBook: 'Lihat Tarif & Pesan Sekarang',
    ctaWhatsApp: 'Hubungi WhatsApp Bantuan',
    guarantee1: 'Tanpa uang muka • Pembayaran tunai ke sopir saat tiba',
    guarantee2: 'Gratis 60 menit tunggu di bandara & pelacakan pesawat radar',
    guarantee3: 'Singgah Miqat Dzul Hulaifah (Bir Ali) gratis tanpa biaya',
    guarantee4: 'Tarif pasti all-in termasuk bbm, tol, dan pajak',
  },
  ur: {
    badge: '★ شاہی پرائیویٹ ٹرانسپورٹیشن سروس',
    headline: 'سعودی عرب میں بے مثال آرام و وقار کے ساتھ سفر کا تجربہ',
    subheadline:
      'حرمین شریفین کے معزز زائرین اور معزز خاندانوں کے لیے مکہ مکرمہ، مدینہ منورہ، جدہ، طائف اور ریاض میں اعلیٰ ترین شافر سروس۔',
    tabOneWay: 'ایئرپورٹ و بین الشہری ٹرانسفر',
    tabHourly: 'فی گھنٹہ پرائیویٹ ڈرائیور',
    tabZiyarat: 'مقدس زیارات',
    routeLabel: 'مقبول ترین روٹ',
    selectRoute: 'روٹ منتخب کریں',
    pickupLabel: 'روانگی کا مقام',
    dropoffLabel: 'منزل / ہوٹل',
    dateLabel: 'روانگی کی تاریخ',
    timeLabel: 'روانگی کا وقت',
    durationLabel: 'ڈرائیور کی مدت',
    hoursSuffix: 'گھنٹے',
    ctaBook: 'کرایہ دیکھیں اور بک کریں',
    ctaWhatsApp: 'واٹس ایپ پر رابطہ کریں',
    guarantee1: '0 روپے ایڈوانس • سفر مکمل ہونے پر ڈرائیور کو نقد ادائیگی',
    guarantee2: 'ایئرپورٹ پر 60 منٹ مفت انتظار اور لائیو فلائٹ ٹریکنگ',
    guarantee3: 'میقات بئر علی پر احرام اور نماز کے لیے اعزازی قیام',
    guarantee4: 'پیٹرول، ٹول ٹیکس اور تمام اخراجات سمیت حتمی طے شدہ کرایہ',
  },
  tr: {
    badge: '★ KRALİYET DÜZEYİNDE VIP ŞOFÖR HİZMETİ',
    headline: "Suudi Arabistan'da Olağanüstü Konforla Özel Şoför Hizmeti",
    subheadline:
      "Mekke, Medine, Cidde, Taif ve Riyad genelinde Umre yolcuları ve aileler için birinci sınıf VIP şoförlü transfer çözümleri.",
    tabOneWay: 'Havalimanı ve Şehirlerarası Transfer',
    tabHourly: 'Saatlik Özel Şoför',
    tabZiyarat: 'Kutsal Ziyaret Turları',
    routeLabel: 'Popüler Otoyol Güzergahı',
    selectRoute: 'Güzergah Seçin',
    pickupLabel: 'Kalkış Noktası',
    dropoffLabel: 'Varış Noktası / Otel',
    dateLabel: 'Tarih',
    timeLabel: 'Saat',
    durationLabel: 'Hizmet Süresi',
    hoursSuffix: 'Saat',
    ctaBook: 'Fiyatları Gör ve Ayırt',
    ctaWhatsApp: "WhatsApp'tan Danışın",
    guarantee1: 'Sıfır ön ödeme • Varışta şoföre nakit ödeme',
    guarantee2: 'Havalimanında 60 dk ücretsiz bekleme ve radar uçuş takibi',
    guarantee3: 'Bir Ali mikatında ihram ve namaz için ücretsiz mola',
    guarantee4: 'Otoyol geçişleri, yakıt ve vergiler dahil kesin sabit fiyat',
  },
  fr: {
    badge: '★ CHAUFFEUR PRIVÉ ROYAL VIP',
    headline: 'Voyagez en Arabie Saoudite dans un Confort Exceptionnel',
    subheadline:
      "Services de chauffeur privé haut de gamme pour les pèlerins de l'Umrah, familles et délégations à La Mecque, Médine, Djeddah, Taif et Riyad.",
    tabOneWay: 'Transfert Aéroport & Interurbain',
    tabHourly: 'Chauffeur à l’Heure',
    tabZiyarat: 'Visites des Lieux Saints (Ziyarat)',
    routeLabel: 'Itinéraire Populaire',
    selectRoute: 'Sélectionnez un itinéraire',
    pickupLabel: 'Lieu de prise en charge',
    dropoffLabel: 'Destination / Hôtel',
    dateLabel: 'Date',
    timeLabel: 'Heure',
    durationLabel: 'Durée',
    hoursSuffix: 'Heures',
    ctaBook: 'Voir les Tarifs & Réserver',
    ctaWhatsApp: 'Concierge WhatsApp',
    guarantee1: '0 € d’acompte • Paiement en espèces au chauffeur à l’arrivée',
    guarantee2: '60 min d’attente offerte à l’aéroport & suivi radar du vol',
    guarantee3: 'Arrêt offert au Miqat Bir Ali pour l’Ihram et la prière',
    guarantee4: 'Tarif fixe garanti incluant péages, carburant et taxes',
  },
  es: {
    badge: '★ SERVICIO DE CHÓFER PRIVADO REAL VIP',
    headline: 'Viva la Experiencia de Arabia Saudita con Máximo Confort',
    subheadline:
      'Transporte privado premium para peregrinos de Umrah, familias y ejecutivos en La Meca, Medina, Yeda, Taif y Riad.',
    tabOneWay: 'Traslados Aeropuerto y Ciudades',
    tabHourly: 'Chófer Privado por Horas',
    tabZiyarat: 'Tours Sagrados Ziyarat',
    routeLabel: 'Ruta Frecuente',
    selectRoute: 'Seleccione su ruta',
    pickupLabel: 'Lugar de recogida',
    dropoffLabel: 'Destino / Hotel',
    dateLabel: 'Fecha',
    timeLabel: 'Hora',
    durationLabel: 'Duración',
    hoursSuffix: 'Horas',
    ctaBook: 'Ver Tarifas y Reservar',
    ctaWhatsApp: 'Atención por WhatsApp',
    guarantee1: 'Sin adelanto • Pago en efectivo al chófer a la llegada',
    guarantee2: '60 min de espera de cortesía en aeropuerto y radar de vuelo',
    guarantee3: 'Parada gratuita en el Miqat Bir Ali para el Ihram y rezo',
    guarantee4: 'Tarifa fija con peajes de autopista, gasolina e impuestos',
  },
  de: {
    badge: '★ KÖNIGLICHER VIP CHAUFFEUR-SERVICE',
    headline: 'Erleben Sie Saudi-Arabien in Außergewöhnlichem Komfort',
    subheadline:
      'Erstklassiger privater Chauffeurservice für Umrah-Pilger, Familien und Reisende in Mekka, Medina, Dschidda, Taif und Riad.',
    tabOneWay: 'Flughafen- & Überlandtransfer',
    tabHourly: 'Chauffeur auf Stundenbasis',
    tabZiyarat: 'Historische Ziyarat-Touren',
    routeLabel: 'Beliebte Fahrtstrecke',
    selectRoute: 'Route auswählen',
    pickupLabel: 'Abholort',
    dropoffLabel: 'Zielort / Hotel',
    dateLabel: 'Datum',
    timeLabel: 'Uhrzeit',
    durationLabel: 'Dauer',
    hoursSuffix: 'Stunden',
    ctaBook: 'Festpreise Sehen & Buchen',
    ctaWhatsApp: 'WhatsApp Betreuung',
    guarantee1: '0 € Anzahlung • Barzahlung beim Fahrer am Zielort',
    guarantee2: '60 Min. Wartezeit am Flughafen & Live-Flugradar',
    guarantee3: 'Kostenlose Miqat-Pause in Bir Ali für Ihram und Gebet',
    guarantee4: 'Garantierter Festpreis inkl. Maut, Kraftstoff und Steuern',
  },
  hi: {
    badge: '★ रॉयल वीआईपी निजी ड्राइवर सेवा',
    headline: 'सऊदी अरब में असाधारण आराम और गरिमा के साथ यात्रा करें',
    subheadline:
      'मक्का, मदीना, जेद्दा, ताइफ़ और रियाद में उमरा तीर्थयात्रियों, परिवारों और यात्रियों के लिए सर्वोत्तम निजी परिवहन सेवा।',
    tabOneWay: 'हवाई अड्डा एवं अंतर-शहर ट्रांसफर',
    tabHourly: 'प्रति घंटा निजी ड्राइवर',
    tabZiyarat: 'पवित्र जियारत यात्राएं',
    routeLabel: 'प्रमुख हाईवे मार्ग',
    selectRoute: 'मार्ग का चयन करें',
    pickupLabel: 'पिक-अप स्थान',
    dropoffLabel: 'गंतव्य / होटल',
    dateLabel: 'तारीख',
    timeLabel: 'समय',
    durationLabel: 'अवधि',
    hoursSuffix: 'घंटे',
    ctaBook: 'किराया देखें और बुक करें',
    ctaWhatsApp: 'व्हाट्सएप सहायता',
    guarantee1: '0 अग्रिम राशि • आगमन पर चालक को नकद भुगतान',
    guarantee2: 'हवाई अड्डे पर 60 मिनट निःशुल्क प्रतीक्षा एवं फ्लाइट ट्रैकिंग',
    guarantee3: 'मीक़ात ज़ुल हुलैफ़ा (बीर अली) पर निःशुल्क ठहराव',
    guarantee4: 'टोल टैक्स, ईंधन और कर सहित गारंटीकृत निश्चित दरें',
  },
};

const APPROVED_ROUTES = [
  { id: 'jeddah-airport-to-makkah', label: 'Jeddah Airport (KAIA) → Makkah Hotel (From 200 SAR)', labelAr: 'مطار جدة (KAIA) ← فندق مكة المكرمة (من 200 ريال)' },
  { id: 'makkah-to-jeddah-airport', label: 'Makkah Hotel → Jeddah Airport (KAIA) (From 200 SAR)', labelAr: 'فندق مكة المكرمة ← مطار جدة (KAIA) (من 200 ريال)' },
  { id: 'makkah-to-madinah', label: 'Makkah Hotel → Madinah Hotel (Via Bir Ali) (From 400 SAR)', labelAr: 'فندق مكة المكرمة ← فندق المدينة المنورة (من 400 ريال)' },
  { id: 'madinah-to-makkah', label: 'Madinah Hotel → Makkah Hotel (Via Miqat) (From 400 SAR)', labelAr: 'فندق المدينة المنورة ← فندق مكة المكرمة (من 400 ريال)' },
  { id: 'madinah-airport-to-hotel', label: 'Madinah Airport (MED) → Madinah Hotel (From 200 SAR)', labelAr: 'مطار المدينة (MED) ← فنادق المدينة المنورة (من 200 ريال)' },
  { id: 'jeddah-to-madinah', label: 'Jeddah Airport / City → Madinah Hotel (From 400 SAR)', labelAr: 'مطار جدة / المدينة ← فندق المدينة المنورة (من 400 ريال)' },
  { id: 'makkah-to-taif', label: 'Makkah Hotel → Taif (Al Hada / City) (From 400 SAR)', labelAr: 'فندق مكة المكرمة ← الطائف (الهدا / المدينة) (من 400 ريال)' },
  { id: 'taif-to-makkah', label: 'Taif → Makkah Hotel (Via Miqat) (From 400 SAR)', labelAr: 'الطائف ← فندق مكة المكرمة (عبر الميقات) (من 400 ريال)' },
  { id: 'jeddah-to-taif', label: 'Jeddah Airport (KAIA) → Taif (From 500 SAR)', labelAr: 'مطار جدة (KAIA) ← الطائف (من 500 ريال)' },
  { id: 'riyadh-to-makkah', label: 'Riyadh ⇄ Makkah Hotel (VIP Highway) (From 1,800 SAR)', labelAr: 'الرياض ⇄ فندق مكة المكرمة (من 1,800 ريال)' },
  { id: 'riyadh-to-madinah', label: 'Riyadh ⇄ Madinah Hotel (VIP Highway) (From 2,000 SAR)', labelAr: 'الرياض ⇄ فندق المدينة المنورة (من 2,000 ريال)' },
];

export function HeroSection({ locale }: HeroSectionProps) {
  const router = useRouter();
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [tripType, setTripType] = useState<'transfer' | 'hourly' | 'ziyarat'>('transfer');
  const [selectedRoute, setSelectedRoute] = useState('jeddah-airport-to-makkah');
  const [durationHours, setDurationHours] = useState('4');
  const [ziyaratTour, setZiyaratTour] = useState('makkah-half-day');

  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);
  const tomorrowStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }, []);

  const [pickupDate, setPickupDate] = useState(tomorrowStr);
  const [pickupTime, setPickupTime] = useState('14:00');

  const t = HERO_I18N[locale] || HERO_I18N.en;
  const isRtl = locale === 'ar' || locale === 'ur';

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();

    if (tripType === 'transfer') {
      query.set('route', selectedRoute);
    } else if (tripType === 'hourly') {
      query.set('type', 'hourly');
      query.set('duration', durationHours);
    } else {
      query.set('type', 'ziyarat');
      query.set('tour', ziyaratTour);
    }

    query.set('date', pickupDate);
    query.set('time', pickupTime);

    router.push(`/${locale}/booking?${query.toString()}`);
  };

  return (
    <section className="relative min-h-[92svh] flex flex-col justify-center items-center bg-[#101827] text-white pt-24 pb-16 sm:py-28 overflow-hidden select-none">
      {/* 1. ELEGANT BACKGROUND WITH PHOTOGRAPHIC DEPTH & SOFT AMBIENT VIGNETTE */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/assets/images/haram_hero.webp"
          alt="Duyuf Alrahman VIP - Sacred Saudi Luxury Chauffeur"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%] opacity-35 scale-105 transition-transform duration-1000"
        />
        {/* Soft Radial Ambient Midnight Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#101827] via-[#101827]/75 to-[#101827]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C5A15D]/15 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10 flex flex-col items-center text-center my-auto">
        {/* 2. REFINED ROYAL BADGE */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111C30]/90 border border-[#C5A15D]/50 text-[11px] sm:text-xs font-bold text-[#D7B76C] uppercase tracking-[0.2em] mb-4 backdrop-blur-md shadow-md animate-fadeIn">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A15D]" />
          <span>{t.badge}</span>
        </div>

        {/* 3. HEADLINE IN EDITORIAL LUXURY SERIF */}
        <h1 className="font-serif font-normal text-3xl sm:text-5xl lg:text-6xl text-[#F7F5F0] tracking-tight leading-[1.18] max-w-4xl drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] mb-4">
          {t.headline}
        </h1>

        {/* 4. CONCISE LUXURY SUPPORTING COPY */}
        <p className="text-sm sm:text-base lg:text-lg text-[#E8E3DA]/90 font-light leading-relaxed max-w-2xl mb-8 drop-shadow-sm">
          {t.subheadline}
        </p>

        {/* 5. FLOATING ROYAL LUXURY RESERVATION ENGINE */}
        <div className="w-full max-w-4xl bg-[#FFFFFF] rounded-2xl sm:rounded-3xl border border-[#E8E3DA] p-4 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)] text-[#182235] text-start transition-all">
          {/* SERVICE TABS */}
          <div className="flex items-center gap-2 border-b border-[#E8E3DA] pb-3 mb-4 overflow-x-auto scrollbar-none">
            <button
              type="button"
              onClick={() => setTripType('transfer')}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                tripType === 'transfer'
                  ? 'bg-[#101827] text-[#C5A15D] shadow-sm'
                  : 'bg-transparent text-[#687386] hover:text-[#182235]'
              }`}
            >
              {t.tabOneWay}
            </button>
            <button
              type="button"
              onClick={() => setTripType('ziyarat')}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                tripType === 'ziyarat'
                  ? 'bg-[#101827] text-[#C5A15D] shadow-sm'
                  : 'bg-transparent text-[#687386] hover:text-[#182235]'
              }`}
            >
              {t.tabZiyarat}
            </button>
            <button
              type="button"
              onClick={() => setTripType('hourly')}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                tripType === 'hourly'
                  ? 'bg-[#101827] text-[#C5A15D] shadow-sm'
                  : 'bg-transparent text-[#687386] hover:text-[#182235]'
              }`}
            >
              {t.tabHourly}
            </button>
          </div>

          {/* RESERVATION FORM FIELDS */}
          <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-end">
            {/* FIELD 1: ROUTE OR DURATION SELECTION (md:col-span-6) */}
            <div className="md:col-span-5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#687386] mb-1.5">
                {tripType === 'transfer' ? t.routeLabel : tripType === 'ziyarat' ? t.tabZiyarat : t.durationLabel}
              </label>

              {tripType === 'transfer' ? (
                <div className="relative">
                  <select
                    value={selectedRoute}
                    onChange={(e) => setSelectedRoute(e.target.value)}
                    className="w-full h-12 px-3 pr-8 rtl:pr-3 rtl:pl-8 rounded-xl bg-[#F7F5F0] border border-[#E8E3DA] text-[#182235] text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#C5A15D] cursor-pointer appearance-none truncate"
                  >
                    {APPROVED_ROUTES.map((r) => (
                      <option key={r.id} value={r.id}>
                        {isRtl ? r.labelAr : r.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#C5A15D] pointer-events-none absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2" />
                </div>
              ) : tripType === 'ziyarat' ? (
                <div className="relative">
                  <select
                    value={ziyaratTour}
                    onChange={(e) => setZiyaratTour(e.target.value)}
                    className="w-full h-12 px-3 pr-8 rtl:pr-3 rtl:pl-8 rounded-xl bg-[#F7F5F0] border border-[#E8E3DA] text-[#182235] text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#C5A15D] cursor-pointer appearance-none truncate"
                  >
                    <option value="makkah-half-day">
                      {isRtl ? 'جولة مزارات مكة المكرمة (2.5 ساعة) - من 250 ريال' : 'Makkah Holy Sites Tour (2.5 Hours) - From 250 SAR'}
                    </option>
                    <option value="madinah-half-day">
                      {isRtl ? 'جولة مزارات المدينة المنورة (3.5 ساعة) - من 250 ريال' : 'Madinah Holy Sites Tour (3.5 Hours) - From 250 SAR'}
                    </option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#C5A15D] pointer-events-none absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2" />
                </div>
              ) : (
                <div className="relative">
                  <select
                    value={durationHours}
                    onChange={(e) => setDurationHours(e.target.value)}
                    className="w-full h-12 px-3 pr-8 rtl:pr-3 rtl:pl-8 rounded-xl bg-[#F7F5F0] border border-[#E8E3DA] text-[#182235] text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#C5A15D] cursor-pointer appearance-none truncate"
                  >
                    <option value="2">2 {t.hoursSuffix} (VIP Quick Block)</option>
                    <option value="4">4 {t.hoursSuffix} (Standard Half-Day)</option>
                    <option value="6">6 {t.hoursSuffix}</option>
                    <option value="8">8 {t.hoursSuffix} (Full-Day Executive)</option>
                    <option value="12">12 {t.hoursSuffix} (VIP All-Day Chauffeur)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#C5A15D] pointer-events-none absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2" />
                </div>
              )}
            </div>

            {/* FIELD 2: PICKUP DATE (md:col-span-3) */}
            <div className="md:col-span-3">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#687386] mb-1.5">
                {t.dateLabel}
              </label>
              <div className="relative flex items-center">
                <input
                  type="date"
                  min={todayStr}
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full h-12 px-3 rounded-xl bg-[#F7F5F0] border border-[#E8E3DA] text-[#182235] text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#C5A15D] cursor-pointer"
                />
              </div>
            </div>

            {/* FIELD 3: PICKUP TIME (md:col-span-2) */}
            <div className="md:col-span-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#687386] mb-1.5">
                {t.timeLabel}
              </label>
              <input
                type="time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="w-full h-12 px-3 rounded-xl bg-[#F7F5F0] border border-[#E8E3DA] text-[#182235] text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#C5A15D] cursor-pointer"
              />
            </div>

            {/* FIELD 4: PRIMARY SUBMIT ACTION (md:col-span-2) */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-gradient-to-r from-[#C5A15D] to-[#D7B76C] hover:brightness-105 active:scale-[0.98] text-[#101827] font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <span>{locale === 'ar' ? 'عرض السعر' : 'View Fares'}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </form>
        </div>

        {/* 6. SECONDARY CONCIERGE WHATSAPP ACTION PILL */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setIsWhatsAppModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111C30]/80 hover:bg-[#111C30] border border-[#25D366]/40 text-[#25D366] hover:text-white transition-all shadow-sm cursor-pointer"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
            <span>{t.ctaWhatsApp}</span>
          </button>
        </div>

        {/* 7. ROYAL HOSPITALITY GUARANTEES STRIP */}
        <div className="mt-8 pt-6 border-t border-white/10 w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs text-[#E8E3DA]/80">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#C5A15D] shrink-0" />
            <span>{t.guarantee1}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#C5A15D] shrink-0" />
            <span>{t.guarantee2}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#C5A15D] shrink-0" />
            <span>{t.guarantee3}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#C5A15D] shrink-0" />
            <span>{t.guarantee4}</span>
          </div>
        </div>
      </div>

      {/* WHATSAPP MODAL */}
      <WhatsAppModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        locale={locale}
        source="hero_cta"
      />
    </section>
  );
}
