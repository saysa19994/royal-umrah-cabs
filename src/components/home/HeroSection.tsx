'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import { WhatsAppModal } from '@/components/common/WhatsAppModal';
import { ArrowRight, MessageCircle } from 'lucide-react';

interface HeroSectionProps {
  locale: Locale;
}

interface HeroLocalizedContent {
  badge: string;
  h1: string;
  description: string;
  btnPrimary: string;
  btnSecondary: string;
  trustPay: string;
  trustWait: string;
  trustSupport: string;
}

const HERO_CONTENT: Record<Locale, HeroLocalizedContent> = {
  en: {
    badge: 'Executive VIP Chauffeur Service for Umrah Pilgrims',
    h1: 'Premium Umrah Chauffeur & Luxury Pilgrim Transport',
    description:
      'Private Umrah taxi across Makkah, Madinah and Jeddah. Professional chauffeurs, fixed rates, and comfort for the Guests of Allah.',
    btnPrimary: 'Get Prices & Book',
    btnSecondary: 'Chat on WhatsApp',
    trustPay: 'Pay on arrival',
    trustWait: '60-minute free airport wait',
    trustSupport: '24/7 chauffeur support',
  },
  ar: {
    badge: 'خدمة سائق VIP خاص لضيوف الرحمن والمعتمرين',
    h1: 'خدمة سائق خاص وسيارات فاخرة لنقل ضيوف الرحمن',
    description:
      'توصيل خاص بسيارات حديثة عبر مكة المكرمة والمدينة المنورة وجدة. سائقون محترفون، أسعار ثابتة ومحددة، وراحة تليق بضيوف الرحمن.',
    btnPrimary: 'عرض الأسعار والحجز',
    btnSecondary: 'محادثة عبر واتساب',
    trustPay: 'الدفع عند الوصول',
    trustWait: '60 دقيقة انتظار مجاني بالمطار',
    trustSupport: 'متابعة ودعم 24/7',
  },
  fr: {
    badge: 'Service de Chauffeur VIP Privé pour les Pèlerins de la Omra',
    h1: 'Chauffeur Privé Premium & Transport de Luxe pour la Omra',
    description:
      "Transport privé pour la Omra à La Mecque, Médine et Djeddah. Chauffeurs professionnels, tarifs fixes garantis et confort dédié aux Hôtes d'Allah.",
    btnPrimary: 'Voir les Tarifs & Réserver',
    btnSecondary: 'Discuter sur WhatsApp',
    trustPay: "Paiement à l'arrivée",
    trustWait: "60 min d'attente gratuite à l'aéroport",
    trustSupport: 'Support chauffeur 24h/24 et 7j/7',
  },
  es: {
    badge: 'Servicio de Chofer VIP Privado para Peregrinos de la Umrah',
    h1: 'Chofer Privado Premium y Transporte de Lujo para la Umrah',
    description:
      'Transporte privado para la Umrah en La Meca, Medina y Yeda. Choferes profesionales, tarifas fijas y máxima comodidad para los Huéspedes de Alá.',
    btnPrimary: 'Ver Tarifas y Reservar',
    btnSecondary: 'Contactar por WhatsApp',
    trustPay: 'Pago a la llegada',
    trustWait: '60 min de espera gratuita en aeropuerto',
    trustSupport: 'Soporte de chofer 24/7',
  },
  id: {
    badge: 'Layanan Sopir VIP Privat untuk Jamaah Umrah',
    h1: 'Sopir Privat Premium & Transportasi Mewah Jamaah Umrah',
    description:
      'Taksi privat Umrah melayani Makkah, Madinah, dan Jeddah. Sopir profesional, tarif pasti transparan, dan kenyamanan utama bagi Tamu Allah.',
    btnPrimary: 'Lihat Tarif & Pesan',
    btnSecondary: 'Hubungi via WhatsApp',
    trustPay: 'Bayar saat tiba',
    trustWait: 'Tunggu gratis 60 menit di bandara',
    trustSupport: 'Dukungan sopir 24/7',
  },
  hi: {
    badge: 'उमरा यात्रियों के लिए विशेष वीआईपी निजी चौफर सेवा',
    h1: 'प्रीमियम उमरा चौफर और तीर्थयात्रियों के लिए लक्जरी परिवहन',
    description:
      'मक्का, मदीना और जेद्दा में निजी उमरा टैक्सी। पेशेवर ड्राइवर, निश्चित दरें और अल्लाह के मेहमानों के लिए सर्वोच्च आराम।',
    btnPrimary: 'किराया देखें और बुक करें',
    btnSecondary: 'व्हाट्सएप पर बात करें',
    trustPay: 'पहुंचने पर भुगतान',
    trustWait: 'हवाई अड्डे पर 60 मिनट निःशुल्क प्रतीक्षा',
    trustSupport: '24/7 चौफर सहायता',
  },
  de: {
    badge: 'Exklusiver VIP-Chauffeurservice für Umrah-Pilger',
    h1: 'Premium Umrah-Chauffeur & Luxus-Pilgertransport',
    description:
      'Privater Umrah-Fahrdienst zwischen Mekka, Medina und Dschidda. Professionelle Chauffeure, garantierte Festpreise und maximaler Komfort für die Gäste Allahs.',
    btnPrimary: 'Preise Ansehen & Buchen',
    btnSecondary: 'Auf WhatsApp chatten',
    trustPay: 'Zahlung bei Ankunft',
    trustWait: '60 Min. kostenlose Wartezeit',
    trustSupport: '24/7 Chauffeur-Betreuung',
  },
  ur: {
    badge: 'عمرہ زائرین کے لیے خصوصی وی آئی پی پرائیویٹ ڈرائیور سروس',
    h1: 'پریمیم عمرہ پرائیویٹ ڈرائیور اور زائرین کے لیے لگژری ٹرانسپورٹ',
    description:
      'مکہ مکرمہ، مدینہ منورہ اور جدہ کے درمیان پرائیویٹ عمرہ ٹیکسی۔ پیشہ ور ڈرائیور، طے شدہ کرائے اور ضیوف الرحمن کے لیے پُرسکون سفر۔',
    btnPrimary: 'کرائے دیکھیں اور بک کریں',
    btnSecondary: 'واٹس ایپ پر رابطہ کریں',
    trustPay: 'آمد پر ادائیگی',
    trustWait: 'ایئرپورٹ پر 60 منٹ مفت انتظار',
    trustSupport: '24/7 ڈرائیور معاونت',
  },
  ms: {
    badge: 'Perkhidmatan Pemandu VIP Khas untuk Jemaah Umrah',
    h1: 'Pemandu Umrah Premium & Pengangkutan Mewah Jemaah',
    description:
      'Teksi Umrah peribadi meliputi Makkah, Madinah dan Jeddah. Pemandu profesional, kadar tetap terjamin, dan keselesaan khas untuk Tetamu Allah.',
    btnPrimary: 'Lihat Harga & Tempah',
    btnSecondary: 'Hubungi WhatsApp',
    trustPay: 'Bayar semasa tiba',
    trustWait: 'Menunggu percuma 60 minit di lapangan terbang',
    trustSupport: 'Sokongan pemandu 24/7',
  },
  tr: {
    badge: 'Umre Ziyaretçileri İçin Özel VIP Şoför Hizmeti',
    h1: 'Seçkin Umre Şoförü ve Lüks Ziyaretçi Ulaşımı',
    description:
      "Mekke, Medine ve Cidde arasında özel Umre transferi. Profesyonel şoförler, sabit garantili fiyatlar ve Allah'ın Misafirleri için üstün konfor.",
    btnPrimary: 'Fiyatları Gör ve Rezervasyon Yap',
    btnSecondary: "WhatsApp'tan Yazın",
    trustPay: 'Varışta ödeme',
    trustWait: 'Havalimanında 60 dk ücretsiz bekleme',
    trustSupport: '7/24 şoför desteği',
  },
};

export function HeroSection({ locale }: HeroSectionProps) {
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  const content = HERO_CONTENT[locale] || HERO_CONTENT.en;
  const isArabic = locale === 'ar';
  const isUrdu = locale === 'ur';

  useEffect(() => {
    // 1. Force video muted property on DOM node (crucial for Chrome/Edge autoplay policy)
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.play().catch((err) => {
        console.warn('Autoplay attempt caught:', err);
      });
    }

    // 2. Pause video when hero section scrolls off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!video) return;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    // 3. Pause video when browser tab is hidden
    const handleVisibilityChange = () => {
      if (!video) return;
      if (document.hidden) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-[100svh] min-h-[640px] max-h-[1200px] flex flex-col justify-center items-center overflow-hidden bg-[#0a1224] text-white select-none"
    >
      {/* 1) FULL-SCREEN CINEMATIC BACKGROUND VIDEO */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          src="/haram.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/haram.jpg"
          className="w-full h-full object-cover object-[center_38%]"
          aria-label="Masjid al-Haram, Holy Kaaba and Makkah Royal Clock Tower at night - Duyuf Alrahman VIP"
        />

        {/* Dark Navy Gradient Overlays: Well balanced for vibrant video visibility & crisp text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1224] via-[#0a1224]/50 to-[#0a1224]/20 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,18,36,0.35)_0%,rgba(10,18,36,0.75)_100%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#0a1224] to-transparent pointer-events-none" />
      </div>

      {/* 2) SIMPLE, CLASSY, CENTERED CONTENT */}
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl relative z-10 flex flex-col items-center justify-center text-center my-auto pt-20 pb-8">
        {/* SMALL BADGE: Thin gold border, no heavy fill, refined letter-spacing */}
        <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#d4a72c]/40 bg-transparent text-[#d4a72c] text-xs sm:text-[13px] font-medium tracking-[0.14em] uppercase mb-6 sm:mb-8 animate-fadeIn">
          <span>{content.badge}</span>
        </div>

        {/* H1: Large serif headline in Playfair Display, semi-bold, white */}
        <h1
          className={`text-white leading-[1.14] sm:leading-[1.08] tracking-tight max-w-3xl mx-auto text-[clamp(34px,5.4vw,68px)] font-semibold ${
            isArabic ? 'font-arabic font-bold' : isUrdu ? 'font-urdu font-bold' : 'font-display'
          }`}
        >
          {content.h1}
        </h1>

        {/* SHORT PARAGRAPH: Max 2 lines */}
        <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-[#c9d1e3] font-light leading-relaxed max-w-2xl mx-auto line-clamp-2">
          {content.description}
        </p>

        {/* TWO BUTTONS WITH GENEROUS SPACING & SUBTLE LUXURY SHINE */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 mt-7 sm:mt-9">
          {/* Gold "Get Prices & Book" Button */}
          <Link
            href={`/${locale}/pricing`}
            className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 min-h-[48px] h-12 px-8 rounded-[8px] bg-[#d4a72c] text-[#0a1224] font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#e8c766] transition-all shadow-[0_4px_25px_rgba(212,167,44,0.35)] hover:shadow-[0_4px_35px_rgba(212,167,44,0.55)] focus-visible:ring-2 focus-visible:ring-[#d4a72c]"
          >
            <span className="relative z-10">{content.btnPrimary}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180 relative z-10" />
            {/* Subtle luxury shine sweep across the button every ~6s and on hover */}
            <span
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] animate-luxury-shine group-hover:translate-x-full transition-transform duration-700"
            />
          </Link>

          {/* Thin Green-Outline "Chat on WhatsApp" Button */}
          <button
            type="button"
            onClick={() => setIsWhatsAppModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 min-h-[48px] h-12 px-7 rounded-[8px] border border-[#25d366]/60 bg-transparent hover:bg-[#25d366] text-[#25d366] hover:text-white font-semibold text-xs sm:text-sm transition-all focus-visible:ring-2 focus-visible:ring-[#25d366]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{content.btnSecondary}</span>
          </button>
        </div>

        {/* SLIM TRUST ROW: Thin gold hairline divider above 3 trust points */}
        <div className="w-full max-w-2xl mx-auto mt-8 sm:mt-11 pt-6 border-t border-[#d4a72c]/20">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-[#c9d1e3] font-light">
            <span className="flex items-center gap-1.5">
              <span className="text-[#d4a72c] font-bold text-xs">✓</span>
              <span>{content.trustPay}</span>
            </span>
            <span className="hidden sm:inline text-[#d4a72c]/40">•</span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#d4a72c] font-bold text-xs">✓</span>
              <span>{content.trustWait}</span>
            </span>
            <span className="hidden sm:inline text-[#d4a72c]/40">•</span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#d4a72c] font-bold text-xs">✓</span>
              <span>{content.trustSupport}</span>
            </span>
          </div>
        </div>
      </div>

      {/* DUAL NUMBER WHATSAPP MODAL */}
      <WhatsAppModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        locale={locale}
        source="hero_cta"
      />
    </section>
  );
}
