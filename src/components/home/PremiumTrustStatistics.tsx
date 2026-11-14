'use client';

import React from 'react';
import { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { NumberTicker } from '@/components/ui/luxury/NumberTicker';
import {
  Star,
  Banknote,
  Clock,
  Headphones,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface PremiumTrustStatisticsProps {
  locale: Locale;
  dict: Dictionary;
}

const STATS_I18N: Record<Locale, {
  pill: string;
  heading: string;
  headingHighlight: string;
  subtitle: string;
  ratingTitle: string;
  ratingSub: string;
  paymentTitle: string;
  paymentSub: string;
  waitingTitle: string;
  waitingSub: string;
  waitingSuffix: string;
  supportTitle: string;
  supportSub: string;
}> = {
  ar: {
    pill: 'أرقام وحقائق معتمدة',
    heading: 'الثقة المطلقة في',
    headingHighlight: 'كل رحلة',
    subtitle: 'معايير خدمة ملكية والتزامات تشغيلية واضحة وموثقة تضمن لضيوف الرحمن الطمأنينة الكاملة.',
    ratingTitle: 'تقييم ضيوف الرحمن',
    ratingSub: 'بناءً على مراجعات وتجارب حقيقية موثقة',
    paymentTitle: 'سداد نقدي عند الوصول',
    paymentSub: '0% دفعة مقدمة • بدون أي عربون',
    waitingTitle: 'انتظار مجاني بالمطار',
    waitingSub: 'تتبع راداري لرحلات الطيران الدولية',
    waitingSuffix: ' دقيقة',
    supportTitle: 'إشراف وتنسيق مباشر',
    supportSub: 'متابعة لحظية عبر الواتساب على مدار الساعة',
  },
  en: {
    pill: 'Verified Operational Facts',
    heading: 'Uncompromising Trust in',
    headingHighlight: 'Every Journey',
    subtitle: 'Sovereign standards and verified operating commitments ensuring pilgrims travel with total peace of mind.',
    ratingTitle: 'Pilgrim Satisfaction',
    ratingSub: 'Based on verified customer reviews',
    paymentTitle: 'Cash on Arrival',
    paymentSub: '0% Prepayment • Zero Advance Deposit',
    waitingTitle: 'Free Airport Waiting',
    waitingSub: 'Live international flight radar tracking',
    waitingSuffix: ' Mins',
    supportTitle: 'Direct Concierge Dispatch',
    supportSub: '24/7 dedicated real-time WhatsApp coordination',
  },
  ms: {
    pill: 'Fakta Operasi Disahkan',
    heading: 'Kepercayaan Mutlak Dalam',
    headingHighlight: 'Setiap Perjalanan',
    subtitle: 'Piawaian perkhidmatan diraja dan jaminan operasi yang jelas untuk ketenangan jemaah.',
    ratingTitle: 'Penilaian Jemaah',
    ratingSub: 'Berdasarkan ulasan pelanggan yang disahkan',
    paymentTitle: 'Bayaran Tunai Setibanya',
    paymentSub: '0% Pendahuluan • Tiada Deposit Diperlukan',
    waitingTitle: 'Menunggu Percuma di Lapangan Terbang',
    waitingSub: 'Penjejakan radar penerbangan langsung',
    waitingSuffix: ' Minit',
    supportTitle: 'Penyelarasan Terus 24/7',
    supportSub: 'Bantuan segera sepanjang masa melalui WhatsApp',
  },
  id: {
    pill: 'Fakta Operasional Terverifikasi',
    heading: 'Kepercayaan Mutlak dalam',
    headingHighlight: 'Setiap Perjalanan',
    subtitle: 'Standar layanan VIP dan komitmen operasional nyata demi ketenangan ibadah jamaah.',
    ratingTitle: 'Penilaian Jamaah',
    ratingSub: 'Berdasarkan ulasan tamu terverifikasi',
    paymentTitle: 'Bayar Tunai Saat Tiba',
    paymentSub: '0% Uang Muka • Tanpa Deposit Awal',
    waitingTitle: 'Gratis Waktu Tunggu Bandara',
    waitingSub: 'Pelacakan radar penerbangan internasional langsung',
    waitingSuffix: ' Menit',
    supportTitle: 'Koordinasi Langsung 24/7',
    supportSub: 'Pendampingan langsung via WhatsApp setiap saat',
  },
  ur: {
    pill: 'تصدیق شدہ حقائق اور ضمانتیں',
    heading: 'ہر سفر میں',
    headingHighlight: 'مکمل اعتماد اور تحفظ',
    subtitle: 'اعلیٰ شاہی معیار اور واضح ضمانتیں جو حجاج و زائرین کے سفر کو پُرسکون بناتی ہیں۔',
    ratingTitle: 'حجاج کی درجہ بندی',
    ratingSub: 'حقیقی اور تصدیق شدہ جائزوں پر مبنی',
    paymentTitle: 'آمد پر نقد ادائیگی',
    paymentSub: '0% ایڈوانس • بغیر کسی پیشگی رقم کے',
    waitingTitle: 'ایئرپورٹ پر مفت انتظار',
    waitingSub: 'بین الاقوامی پروازوں کی لائیو ٹریکنگ',
    waitingSuffix: ' منٹ',
    supportTitle: 'براہ راست رابطہ اور نگرانی',
    supportSub: 'واٹس ایپ پر 24 گھنٹے فوری معاونت',
  },
  fr: {
    pill: 'Faits Opérationnels Vérifiés',
    heading: 'Une Confiance Absolue à',
    headingHighlight: 'Chaque Trajet',
    subtitle: 'Des standards royaux et des engagements transparents assurant aux pèlerins une sérénité totale.',
    ratingTitle: 'Satisfaction des Pèlerins',
    ratingSub: 'Basé sur des avis clients vérifiés',
    paymentTitle: 'Espèces à l\'Arrivée',
    paymentSub: '0% Acompte • Aucun Paiement Anticipé',
    waitingTitle: 'Attente Gratuite à l\'Aéroport',
    waitingSub: 'Suivi radar des vols en direct',
    waitingSuffix: ' Mins',
    supportTitle: 'Coordination Dédiée 24/7',
    supportSub: 'Assistance directe en temps réel via WhatsApp',
  },
  es: {
    pill: 'Hechos Operativos Verificados',
    heading: 'Confianza Absoluta en',
    headingHighlight: 'Cada Trayecto',
    subtitle: 'Estándares reales y garantías operativas transparentes para la total tranquilidad de los peregrinos.',
    ratingTitle: 'Valoración de Peregrinos',
    ratingSub: 'Basado en opiniones reales verificadas',
    paymentTitle: 'Efectivo a la Llegada',
    paymentSub: '0% Pago Anticipado • Sin Depósito',
    waitingTitle: 'Espera Gratuita en Aeropuerto',
    waitingSub: 'Seguimiento de vuelos en tiempo real',
    waitingSuffix: ' Mins',
    supportTitle: 'Conserjería VIP 24/7',
    supportSub: 'Coordinación inmediata vía WhatsApp',
  },
  de: {
    pill: 'Verifizierte operative Fakten',
    heading: 'Höchstes Vertrauen auf',
    headingHighlight: 'Jeder Fahrt',
    subtitle: 'Königliche Servicestandards und transparente Garantien für die vollkommene Ruhe der Pilger.',
    ratingTitle: 'Pilger-Zufriedenheit',
    ratingSub: 'Basierend auf echten Kundenbewertungen',
    paymentTitle: 'Barzahlung bei Ankunft',
    paymentSub: '0% Vorauszahlung • Keine Anzahlung erforderlich',
    waitingTitle: 'Kostenlose Airport-Wartezeit',
    waitingSub: 'Live-Flugradarüberwachung inklusive',
    waitingSuffix: ' Min.',
    supportTitle: 'Persönliche Betreuung 24/7',
    supportSub: 'Rund um die Uhr WhatsApp-Koordination',
  },
  tr: {
    pill: 'Doğrulanmış Operasyonel Bilgiler',
    heading: 'Her Yolculukta',
    headingHighlight: 'Kusursuz Güven',
    subtitle: 'Misafirlerimizin huzuru için şeffaf VIP hizmet standartları ve doğrulanmış taahhütler.',
    ratingTitle: 'Misafir Memnuniyeti',
    ratingSub: 'Doğrulanmış müşteri değerlendirmelerine göre',
    paymentTitle: 'Varışta Nakit Ödeme',
    paymentSub: '%0 Ön Ödeme • Depozito İstenmez',
    waitingTitle: 'Havalimanında Ücretsiz Bekleme',
    waitingSub: 'Canlı uluslararası uçuş radarı takibi',
    waitingSuffix: ' Dakika',
    supportTitle: '7/24 Kesintisiz VIP Destek',
    supportSub: 'WhatsApp üzerinden anlık canlı koordinasyon',
  },
  hi: {
    pill: 'सत्यापित परिचालन तथ्य',
    heading: 'प्रत्येक यात्रा में',
    headingHighlight: 'अटूट विश्वास',
    subtitle: 'शाही सेवा मानक और पारदर्शी परिचालन गारंटी जो तीर्थयात्रियों को पूर्ण मानसिक शांति प्रदान करते हैं।',
    ratingTitle: 'तीर्थयात्री संतुष्टि',
    ratingSub: 'सत्यापित ग्राहक समीक्षाओं पर आधारित',
    paymentTitle: 'पहुंचने पर नकद भुगतान',
    paymentSub: '0% अग्रिम • शून्य अग्रिम जमा',
    waitingTitle: 'हवाई अड्डे पर निःशुल्क प्रतीक्षा',
    waitingSub: 'उड़ानों की लाइव रडार ट्रैकिंग',
    waitingSuffix: ' मिनट',
    supportTitle: '24/7 सीधा वीआईपी समन्वय',
    supportSub: 'व्हाट्सएप द्वारा चौबीसों घंटे त्वरित सहायता',
  },
};

export function PremiumTrustStatistics({ locale }: PremiumTrustStatisticsProps) {
  const isAr = locale === 'ar';
  const isRtl = isAr || locale === 'ur';
  const t = STATS_I18N[locale] || STATS_I18N.en;

  const stats = [
    {
      id: 'rating',
      icon: <Star className="w-5 h-5 text-[#D6A13A] fill-[#D6A13A]" />,
      valueComponent: (
        <span className="flex items-baseline" dir="ltr">
          <NumberTicker value={5.0} decimalPlaces={1} delay={0.1} className="text-[#D6A13A]" />
          <span className="text-xl sm:text-2xl text-[#AEB7C4] font-light ms-1">/ 5.0</span>
        </span>
      ),
      title: t.ratingTitle,
      subtitle: t.ratingSub,
      accentBorder: 'hover:border-[#D6A13A]',
    },
    {
      id: 'payment',
      icon: <Banknote className="w-5 h-5 text-[#25D366]" />,
      valueComponent: (
        <span className="flex items-baseline text-[#25D366]" dir="ltr">
          <NumberTicker value={100} delay={0.2} className="text-[#25D366]" />
          <span className="text-xl sm:text-2xl font-bold ms-0.5">%</span>
        </span>
      ),
      title: t.paymentTitle,
      subtitle: t.paymentSub,
      accentBorder: 'hover:border-[#25D366]/60',
    },
    {
      id: 'waiting',
      icon: <Clock className="w-5 h-5 text-[#D6A13A]" />,
      valueComponent: (
        <span className="flex items-baseline text-[#F6F3ED]">
          <NumberTicker value={60} delay={0.3} className="text-[#F6F3ED]" />
          <span className="text-sm sm:text-base font-bold text-[#D6A13A] ms-1">{t.waitingSuffix}</span>
        </span>
      ),
      title: t.waitingTitle,
      subtitle: t.waitingSub,
      accentBorder: 'hover:border-[#D6A13A]',
    },
    {
      id: 'support',
      icon: <Headphones className="w-5 h-5 text-[#D6A13A]" />,
      valueComponent: (
        <span className="text-[#D6A13A] font-extrabold tracking-tight">
          24/7
        </span>
      ),
      title: t.supportTitle,
      subtitle: t.supportSub,
      accentBorder: 'hover:border-[#D6A13A]',
    },
  ];

  return (
    <section
      id="trust-statistics"
      className="relative z-10 bg-[#0E1420] py-14 sm:py-20 border-b border-[rgba(255,255,255,0.06)] overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
      aria-label={t.heading}
    >
      {/* Subtle radial gold accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[radial-gradient(ellipse_at_top,rgba(214,161,58,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="rc-container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141D2C] border border-[#D6A13A]/40 text-xs font-bold text-[#D6A13A] uppercase tracking-wider mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D6A13A]" />
            <span>{t.pill}</span>
          </div>

          <h2 className="font-playfair font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#F6F3ED] tracking-tight leading-tight mb-3">
            {t.heading} <span className="text-[#D6A13A] font-light">{t.headingHighlight}</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#AEB7C4] leading-relaxed font-light">
            {t.subtitle}
          </p>
        </div>

        {/* 4 Metrics Cards Grid with Subtle Separators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => (
            <div
              key={stat.id}
              className={`p-6 sm:p-7 rounded-3xl bg-[#101725] border border-[rgba(255,255,255,0.08)] ${stat.accentBorder} transition-all duration-300 flex flex-col items-center text-center shadow-lg hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] group relative`}
            >
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-2xl bg-[#141D2C] border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-[#D6A13A]/60 transition-all duration-300 shadow-sm">
                {stat.icon}
              </div>

              {/* Numerical Typography */}
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight mb-2 flex items-center justify-center">
                {stat.valueComponent}
              </div>

              {/* Title */}
              <h3 className="text-sm sm:text-base font-bold text-[#F6F3ED] mb-1.5 leading-snug">
                {stat.title}
              </h3>

              {/* Subtitle */}
              <p className="text-xs text-[#AEB7C4] font-light leading-relaxed">
                {stat.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
