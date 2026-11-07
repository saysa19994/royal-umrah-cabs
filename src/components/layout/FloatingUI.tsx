'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import {
  MessageCircle,
  ArrowUp,
  CalendarDays,
  Car,
  X,
  Compass,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { TurnstileWidget } from '@/components/common/TurnstileWidget';
import { WhatsAppModal } from '@/components/common/WhatsAppModal';
import { BorderBeam } from '@/components/ui/luxury/BorderBeam';

interface FloatingUIProps {
  locale: Locale;
  dict: Dictionary;
  whatsappNumber: string;
}

interface DockTranslations {
  liveStandby: string;
  zeroAdvancePill: string;
  routesLabel: string;
  bookNowLabel: string;
  quickSheetTitle: string;
  quickSheetSubtitle: string;
  routeJeddahMakkah: string;
  routeMakkahMadinah: string;
  routeMakkahZiyarat: string;
  routeMadinahZiyarat: string;
  fromPrice: string;
  cashNotice: string;
  close: string;
}

const DOCK_I18N: Record<Locale, DockTranslations> = {
  ar: {
    liveStandby: 'سائقون متاحون الآن في مكة وجدة',
    zeroAdvancePill: '0% دفعة مقدمة • سداد نقدي',
    routesLabel: 'المسارات',
    bookNowLabel: 'احجز سائقك الخاص',
    quickSheetTitle: 'حجز سريع بلمسة واحدة',
    quickSheetSubtitle: 'اختر مسارك المباشر للانتقال الفوري لمحرك الحجز',
    routeJeddahMakkah: 'مطار جدة (KAIA) ⇄ فنادق مكة',
    routeMakkahMadinah: 'مكة المكرمة ⇄ المدينة المنورة',
    routeMakkahZiyarat: 'جولة مزارات مكة المكرمة النبوية',
    routeMadinahZiyarat: 'جولة مزارات المدينة المنورة (قباء وأحد)',
    fromPrice: 'يبدأ من',
    cashNotice: 'الدفع نقداً بالكامل للسائق عند الوصول بعد إتمام الرحلة (بالريال أو الدولار)',
    close: 'إغلاق',
  },
  en: {
    liveStandby: 'Chauffeurs on standby in Makkah & Jeddah',
    zeroAdvancePill: '0% Advance • Cash on Arrival',
    routesLabel: 'Routes',
    bookNowLabel: 'Reserve Chauffeur',
    quickSheetTitle: 'One-Touch Instant Booking',
    quickSheetSubtitle: 'Select a route to configure your private chauffeur in seconds',
    routeJeddahMakkah: 'Jeddah Airport (KAIA) ⇄ Makkah Hotels',
    routeMakkahMadinah: 'Makkah Hotel ⇄ Madinah Hotel',
    routeMakkahZiyarat: 'Makkah Holy Sites Ziyarat Tour',
    routeMadinahZiyarat: 'Madinah Sanctuary Ziyarat (Quba & Uhud)',
    fromPrice: 'From',
    cashNotice: '100% Cash paid directly to chauffeur after arrival (SAR or USD)',
    close: 'Close',
  },
  ms: {
    liveStandby: 'Pemandu sedia ada di Makkah & Jeddah',
    zeroAdvancePill: '0% Wang Muka • Tunai Semasa Tiba',
    routesLabel: 'Laluan',
    bookNowLabel: 'Tempah Pemandu VIP',
    quickSheetTitle: 'Tempahan Pantas Satu Sentuhan',
    quickSheetSubtitle: 'Pilih laluan untuk terus ke enjin tempahan',
    routeJeddahMakkah: 'Lapangan Terbang Jeddah ⇄ Hotel Makkah',
    routeMakkahMadinah: 'Hotel Makkah ⇄ Hotel Madinah',
    routeMakkahZiyarat: 'Lawatan Ziarah Tempat Suci Makkah',
    routeMadinahZiyarat: 'Lawatan Ziarah Madinah (Quba & Uhud)',
    fromPrice: 'Dari',
    cashNotice: 'Bayaran tunai terus kepada pemandu semasa tiba (SAR / USD)',
    close: 'Tutup',
  },
  id: {
    liveStandby: 'Sopir VIP siap siaga di Makkah & Jeddah',
    zeroAdvancePill: '0% DP • Bayar Tunai Saat Tiba',
    routesLabel: 'Rute',
    bookNowLabel: 'Pesan Sopir Pribadi',
    quickSheetTitle: 'Pemesanan Kilat Sekali Sentuh',
    quickSheetSubtitle: 'Pilih rute untuk langsung menuju formulir pemesanan',
    routeJeddahMakkah: 'Bandara Jeddah ⇄ Hotel Makkah',
    routeMakkahMadinah: 'Hotel Makkah ⇄ Hotel Madinah',
    routeMakkahZiyarat: 'Tur Ziarah Tempat Bersejarah Makkah',
    routeMadinahZiyarat: 'Tur Ziarah Madinah (Quba & Uhud)',
    fromPrice: 'Mulai',
    cashNotice: '100% bayar tunai ke sopir saat tiba di tujuan (SAR / USD)',
    close: 'Tutup',
  },
  ur: {
    liveStandby: 'مکہ اور جدہ میں ڈرائیورز فوری دستیاب ہیں',
    zeroAdvancePill: '0% ایڈوانس • آمد پر نقد ادائیگی',
    routesLabel: 'روٹس',
    bookNowLabel: 'ڈرائیور بک کریں',
    quickSheetTitle: 'ایک کلک پر فوری بکنگ',
    quickSheetSubtitle: 'بکنگ فارم کے لیے فوری طور پر اپنا روٹ منتخب کریں',
    routeJeddahMakkah: 'جدہ ایئرپورٹ ⇄ مکہ ہوٹل',
    routeMakkahMadinah: 'مکہ ہوٹل ⇄ مدینہ ہوٹل',
    routeMakkahZiyarat: 'مکہ مکرمہ مقدس مقامات زیارت',
    routeMadinahZiyarat: 'مدینہ منورہ زیارت ٹور (قبا و احد)',
    fromPrice: 'شروع',
    cashNotice: 'منزل پر پہنچنے کے بعد ڈرائیور کو نقد ادائیگی (ریال یا ڈالر)',
    close: 'بند کریں',
  },
  fr: {
    liveStandby: 'Chauffeurs disponibles à La Mecque et Djeddah',
    zeroAdvancePill: '0% Acompte • Espèces à l’Arrivée',
    routesLabel: 'Trajets',
    bookNowLabel: 'Réserver Chauffeur',
    quickSheetTitle: 'Réservation Instantanée en 1 Clic',
    quickSheetSubtitle: 'Choisissez votre trajet pour réserver immédiatement',
    routeJeddahMakkah: 'Aéroport Djeddah ⇄ Hôtels La Mecque',
    routeMakkahMadinah: 'Hôtel La Mecque ⇄ Hôtel Médine',
    routeMakkahZiyarat: 'Circuit Ziyarat Lieux Saints La Mecque',
    routeMadinahZiyarat: 'Circuit Ziyarat Médine (Quba & Uhud)',
    fromPrice: 'Dès',
    cashNotice: 'Paiement en espèces direct au chauffeur à l’arrivée (SAR / USD)',
    close: 'Fermer',
  },
  es: {
    liveStandby: 'Chóferes disponibles en La Meca y Yeda',
    zeroAdvancePill: '0% Anticipo • Pago al Llegar',
    routesLabel: 'Rutas',
    bookNowLabel: 'Reservar Chofer VIP',
    quickSheetTitle: 'Reserva Instantánea en 1 Toque',
    quickSheetSubtitle: 'Seleccione su ruta para reservar al instante',
    routeJeddahMakkah: 'Aeropuerto Yeda ⇄ Hoteles La Meca',
    routeMakkahMadinah: 'Hotel La Meca ⇄ Hotel Medina',
    routeMakkahZiyarat: 'Tour Ziyarat Lugares Sagrados La Meca',
    routeMadinahZiyarat: 'Tour Ziyarat Medina (Quba y Uhud)',
    fromPrice: 'Desde',
    cashNotice: 'Pago 100% en efectivo directo al chofer al llegar (SAR / USD)',
    close: 'Cerrar',
  },
  de: {
    liveStandby: 'Chauffeure in Mekka & Dschidda einsatzbereit',
    zeroAdvancePill: '0% Anzahlung • Bar bei Ankunft',
    routesLabel: 'Routen',
    bookNowLabel: 'Chauffeur Reservieren',
    quickSheetTitle: '1-Klick-Sofortbuchung',
    quickSheetSubtitle: 'Wählen Sie Ihre Route für sofortige Buchung',
    routeJeddahMakkah: 'Flughafen Dschidda ⇄ Hotels Mekka',
    routeMakkahMadinah: 'Hotel Mekka ⇄ Hotel Medina',
    routeMakkahZiyarat: 'Mekka Heilige Stätten Ziyarat Tour',
    routeMadinahZiyarat: 'Medina Ziyarat Tour (Quba & Uhud)',
    fromPrice: 'Ab',
    cashNotice: 'Zahlung bar direkt beim Fahrer nach Ankunft (SAR / USD)',
    close: 'Schließen',
  },
  tr: {
    liveStandby: 'Mekke ve Cidde’de VIP şoförler hazır',
    zeroAdvancePill: '%0 Ön Ödeme • Varışta Nakit',
    routesLabel: 'Rotalar',
    bookNowLabel: 'VIP Şoför Ayırt',
    quickSheetTitle: 'Tek Dokunuşla Hızlı Rezervasyon',
    quickSheetSubtitle: 'Hızlı rezervasyon için popüler rotayı seçin',
    routeJeddahMakkah: 'Cidde Havalimanı ⇄ Mekke Otelleri',
    routeMakkahMadinah: 'Mekke Otel ⇄ Medine Otel',
    routeMakkahZiyarat: 'Mekke Kutsal Mekanlar Ziyaret Turu',
    routeMadinahZiyarat: 'Medine Ziyaret Turu (Kuba & Uhud)',
    fromPrice: 'Başlayan',
    cashNotice: 'Ödeme yalnızca varışta şoföre nakit yapılır (SAR / USD)',
    close: 'Kapat',
  },
  hi: {
    liveStandby: 'मक्का और जेद्दा में ड्राइवर उपलब्ध हैं',
    zeroAdvancePill: '0% अग्रिम • आगमन पर नकद',
    routesLabel: 'मार्ग',
    bookNowLabel: 'निजी ड्राइवर बुक करें',
    quickSheetTitle: 'वन-टच त्वरित आरक्षण',
    quickSheetSubtitle: 'तुरंत बुकिंग के लिए लोकप्रिय मार्ग चुनें',
    routeJeddahMakkah: 'जेद्दा हवाई अड्डा ⇄ मक्का होटल',
    routeMakkahMadinah: 'मक्का होटल ⇄ मदीना होटल',
    routeMakkahZiyarat: 'मक्का पवित्र स्थल ज़ियारत टूर',
    routeMadinahZiyarat: 'मदीना ज़ियारत टूर (क़ुबा और उहुद)',
    fromPrice: 'से',
    cashNotice: 'पहुंचने पर सीधे ड्राइवर को नकद भुगतान (SAR / USD)',
    close: 'बंद करें',
  },
};

export function FloatingUI({ locale, dict }: FloatingUIProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string>('verified_client');
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isQuickSheetOpen, setIsQuickSheetOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingFormVisible, setIsBookingFormVisible] = useState(false);
  const pathname = usePathname() || '';

  const t = DOCK_I18N[locale] || DOCK_I18N.en;
  const isRtl = locale === 'ar' || locale === 'ur';

  // Hide sticky bar on dedicated booking page, confirmation, and admin
  const isExcludedPage =
    pathname.includes('/booking') ||
    pathname.includes('/confirmation') ||
    pathname.startsWith('/admin');

  // Listen to mobile menu custom event
  useEffect(() => {
    const handleMenu = (e: any) => {
      setIsMobileMenuOpen(Boolean(e.detail?.open));
    };
    window.addEventListener('ruc_mobile_menu', handleMenu);
    return () => window.removeEventListener('ruc_mobile_menu', handleMenu);
  }, []);

  // Observe if on-page booking form is currently in view
  useEffect(() => {
    const target =
      document.querySelector('#booking-card-form') ||
      document.querySelector('[data-booking-form="true"]');
    if (!target) {
      setIsBookingFormVisible(false);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsBookingFormVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWhatsAppModalOpen(true);
  };

  return (
    <>
      {/* ============================================================ */}
      {/* 1. DESKTOP & TABLET FLOATING ACTIONS                         */}
      {/* ============================================================ */}
      <aside
        aria-label="Quick Actions"
        className="fixed bottom-6 right-4 rtl:right-auto rtl:left-4 z-40 hidden md:flex flex-col items-center gap-3 pointer-events-auto"
      >
        {/* BACK TO TOP BUTTON */}
        {showBackToTop && (
          <button
            type="button"
            onClick={scrollToTop}
            aria-label={dict.floating.backToTop}
            className="w-11 h-11 rounded-full bg-surface border-2 border-gold text-ink shadow-md flex items-center justify-center hover:bg-gold-soft transition-all duration-200 focus-visible:ring-2 focus-visible:ring-gold"
          >
            <ArrowUp className="w-5 h-5 text-gold-dark" />
          </button>
        )}

        {/* FLOATING WHATSAPP BUTTON WITH SOFT PULSE */}
        <button
          type="button"
          onClick={handleOpenWhatsApp}
          aria-label={dict.floating.whatsappTooltip}
          className="w-14 h-14 rounded-full bg-[#25d366] hover:bg-[#1ebe5d] text-white shadow-[0_4px_25px_rgba(37,211,102,0.45)] items-center justify-center transition-all duration-300 group relative focus-visible:ring-2 focus-visible:ring-[#25d366] animate-pulse-soft-green flex"
        >
          <MessageCircle className="w-7 h-7" />
          <span className="sr-only">{dict.floating.whatsappTooltip}</span>

          {/* TOOLTIP ON HOVER */}
          <span className="hidden group-hover:block absolute right-16 rtl:right-auto rtl:left-16 whitespace-nowrap bg-[#0A1224] border border-gold/30 text-white text-xs px-3 py-1.5 rounded-md shadow-md">
            {dict.floating.whatsappTooltip}
          </span>
        </button>
      </aside>

      {/* ============================================================ */}
      {/* 2. MOBILE CHAUFFEUR LUXURY DOCK (ONE-TOUCH CONVERSION BAR)   */}
      {/* ============================================================ */}
      {!(isExcludedPage || isMobileMenuOpen || isBookingFormVisible) && (
        <div
          aria-label="Mobile Chauffeur Dock"
          style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom, 0px))' }}
          className="md:hidden fixed bottom-2 left-2 right-2 z-40"
        >
          <div className="relative rounded-2xl bg-[#090D15]/95 backdrop-blur-xl border border-[#D6A13A]/40 shadow-[0_12px_40px_rgba(0,0,0,0.85)] p-2.5 overflow-hidden">
            {/* Ambient Golden Border Laser Shimmer */}
            <BorderBeam size={160} duration={10} colorFrom="#D6A13A" colorTo="#F2C94C" borderWidth={1.5} />

            {/* Micro Live Trust Ticker Strip */}
            <div className="flex items-center justify-between text-[10px] px-1 mb-2 font-semibold text-[#AEB7C4]">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>{t.liveStandby}</span>
              </span>
              <span className="text-[#D6A13A]">{t.zeroAdvancePill}</span>
            </div>

            {/* Three Ergonomic Touch Targets */}
            <div className="flex items-center gap-2">
              {/* TARGET 1: VIP WHATSAPP BUTTON */}
              <button
                type="button"
                onClick={handleOpenWhatsApp}
                aria-label="VIP WhatsApp Chauffeur"
                className="min-w-[48px] w-12 min-h-[48px] h-12 rounded-xl bg-[#25d366] text-white flex items-center justify-center shrink-0 shadow-md active:scale-95 transition-transform"
              >
                <MessageCircle className="w-5 h-5" />
              </button>

              {/* TARGET 2: ONE-TOUCH QUICK ROUTE PICKER */}
              <button
                type="button"
                onClick={() => setIsQuickSheetOpen(true)}
                aria-label={t.quickSheetTitle}
                className="min-h-[48px] h-12 px-3.5 rounded-xl bg-[#141D2C] border border-white/10 hover:border-[#D6A13A]/50 text-[#F6F3ED] text-xs font-bold flex items-center gap-1.5 shrink-0 shadow-xs active:scale-95 transition-all"
              >
                <Car className="w-3.5 h-3.5 text-[#D6A13A]" />
                <span>{t.routesLabel}</span>
              </button>

              {/* TARGET 3: PRIMARY BOOKING CTA */}
              <Link
                href={`/${locale}/booking`}
                className="flex-1 min-h-[48px] h-12 rounded-xl bg-gradient-to-r from-[#D6A13A] via-[#F2C94C] to-[#D6A13A] text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[0_4px_16px_rgba(214,161,58,0.4)] active:scale-95 transition-all"
              >
                <CalendarDays className="w-3.5 h-3.5" />
                <span className="truncate">{t.bookNowLabel}</span>
                <ArrowRight className="w-3 h-3 rtl:rotate-180 shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 3. ONE-TOUCH QUICK ROUTE SHEET MODAL                         */}
      {/* ============================================================ */}
      {isQuickSheetOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 backdrop-blur-xs animate-fadeIn md:hidden">
          <div
            className="w-full max-h-[85vh] bg-[#0F172A] border-t-2 border-[#D6A13A] rounded-t-3xl p-5 shadow-2xl space-y-4 overflow-y-auto animate-slideUp text-start"
            dir={isRtl ? 'rtl' : 'ltr'}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="font-display font-extrabold text-base text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D6A13A]" />
                  <span>{t.quickSheetTitle}</span>
                </h3>
                <p className="text-xs text-[#AEB7C4] mt-0.5 font-light">
                  {t.quickSheetSubtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsQuickSheetOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 active:scale-95"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Route Cards */}
            <div className="space-y-2.5">
              {/* Route 1: Jeddah Airport to Makkah */}
              <Link
                href={`/${locale}/booking?route=jeddah-airport-to-makkah`}
                onClick={() => setIsQuickSheetOpen(false)}
                className="p-3.5 rounded-2xl bg-[#141D2C] border border-white/10 hover:border-[#D6A13A] flex items-center justify-between gap-3 active:scale-98 transition-all block group"
              >
                <div>
                  <h4 className="font-bold text-xs text-white group-hover:text-[#D6A13A] transition-colors">
                    {t.routeJeddahMakkah}
                  </h4>
                  <span className="text-[11px] text-[#AEB7C4] block mt-0.5">
                    {t.fromPrice} <strong className="text-[#D6A13A] font-extrabold">200 SAR</strong> • ليموزين خاصة
                  </span>
                </div>
                <span className="w-7 h-7 rounded-full bg-[#D6A13A]/20 text-[#D6A13A] flex items-center justify-center shrink-0">
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </span>
              </Link>

              {/* Route 2: Makkah to Madinah */}
              <Link
                href={`/${locale}/booking?route=makkah-to-madinah`}
                onClick={() => setIsQuickSheetOpen(false)}
                className="p-3.5 rounded-2xl bg-[#141D2C] border border-white/10 hover:border-[#D6A13A] flex items-center justify-between gap-3 active:scale-98 transition-all block group"
              >
                <div>
                  <h4 className="font-bold text-xs text-white group-hover:text-[#D6A13A] transition-colors">
                    {t.routeMakkahMadinah}
                  </h4>
                  <span className="text-[11px] text-[#AEB7C4] block mt-0.5">
                    {t.fromPrice} <strong className="text-[#D6A13A] font-extrabold">400 SAR</strong> • طريق الهجرة السريع
                  </span>
                </div>
                <span className="w-7 h-7 rounded-full bg-[#D6A13A]/20 text-[#D6A13A] flex items-center justify-center shrink-0">
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </span>
              </Link>

              {/* Route 3: Makkah Holy Ziyarat */}
              <Link
                href={`/${locale}/booking?type=ziyarat&pickup=makkah`}
                onClick={() => setIsQuickSheetOpen(false)}
                className="p-3.5 rounded-2xl bg-[#141D2C] border border-white/10 hover:border-[#D6A13A] flex items-center justify-between gap-3 active:scale-98 transition-all block group"
              >
                <div>
                  <h4 className="font-bold text-xs text-white group-hover:text-[#D6A13A] transition-colors">
                    {t.routeMakkahZiyarat}
                  </h4>
                  <span className="text-[11px] text-[#AEB7C4] block mt-0.5">
                    {t.fromPrice} <strong className="text-[#D6A13A] font-extrabold">350 SAR</strong> • غار حراء، ثور، منى، وعرفات
                  </span>
                </div>
                <span className="w-7 h-7 rounded-full bg-[#D6A13A]/20 text-[#D6A13A] flex items-center justify-center shrink-0">
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </span>
              </Link>

              {/* Route 4: Madinah Sanctuary Ziyarat */}
              <Link
                href={`/${locale}/booking?type=ziyarat&pickup=madinah`}
                onClick={() => setIsQuickSheetOpen(false)}
                className="p-3.5 rounded-2xl bg-[#141D2C] border border-white/10 hover:border-[#D6A13A] flex items-center justify-between gap-3 active:scale-98 transition-all block group"
              >
                <div>
                  <h4 className="font-bold text-xs text-white group-hover:text-[#D6A13A] transition-colors">
                    {t.routeMadinahZiyarat}
                  </h4>
                  <span className="text-[11px] text-[#AEB7C4] block mt-0.5">
                    {t.fromPrice} <strong className="text-[#D6A13A] font-extrabold">350 SAR</strong> • مسجد قباء، جبل أحد، والقبلتين
                  </span>
                </div>
                <span className="w-7 h-7 rounded-full bg-[#D6A13A]/20 text-[#D6A13A] flex items-center justify-center shrink-0">
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </span>
              </Link>
            </div>

            {/* Trust Policy Bottom Footer */}
            <div className="pt-2 text-center">
              <p className="text-[11px] text-[#D6A13A] font-semibold flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{t.cashNotice}</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 4. DUAL NUMBER WHATSAPP MODAL                                */}
      {/* ============================================================ */}
      <WhatsAppModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        locale={locale}
        source="floating_ui"
      />

      {/* ============================================================ */}
      {/* 5. BACKGROUND TURNSTILE VERIFICATION                         */}
      {/* ============================================================ */}
      <div className="hidden" aria-hidden="true">
        <TurnstileWidget
          locale={locale}
          onSuccess={(t) => setTurnstileToken(t)}
          onExpire={() => setTurnstileToken('')}
        />
      </div>
    </>
  );
}
