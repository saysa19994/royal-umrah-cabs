'use client';

import React, { useEffect } from 'react';
import { Locale, LOCALE_CONFIG } from '@/i18n/config';
import { trackEvent } from '@/lib/analytics';
import { MessageCircle, X, ShieldCheck, Headphones, ExternalLink } from 'lucide-react';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
  source: 'booking_card' | 'booking_engine' | 'floating_ui' | 'contact_form' | 'header' | 'hero_cta';
}

const MODAL_I18N: Record<
  Locale,
  {
    close: string;
    modalTitle: string;
    modalSubtitle: string;
    primaryTag: string;
    primaryTitle: string;
    primaryDesc: string;
    secondaryTag: string;
    secondaryTitle: string;
    secondaryDesc: string;
    connectAction: string;
    trustOfficial: string;
    trust247: string;
  }
> = {
  ar: {
    close: 'إغلاق',
    modalTitle: 'محادثة مباشرة عبر واتساب',
    modalSubtitle: 'اختر خط الاتصال المناسب للتواصل الفوري مع الفريق:',
    primaryTag: 'الخط الأساسي • طلب حجز',
    primaryTitle: 'إدارة حجوزات وسائقي VIP',
    primaryDesc: 'استقبال طلب الحجز ومراجعة الرحلة والسيارة قبل التأكيد من فريق الحجوزات',
    secondaryTag: 'خط المساندة • خدمة 24/7',
    secondaryTitle: 'خدمة العملاء ومتابعة الرحلات',
    secondaryDesc: 'متابعة مواعيد رحلات الطيران، استفسارات المطار والمزارات',
    connectAction: 'فتح المحادثة الفورية',
    trustOfficial: 'خصوصية كاملة وأسعار معتمدة',
    trust247: 'خدمة على مدار 24 ساعة',
  },
  en: {
    close: 'Close',
    modalTitle: 'Direct WhatsApp Concierge',
    modalSubtitle: 'Select your preferred line for immediate private assistance:',
    primaryTag: 'Primary Line • Booking Request',
    primaryTitle: 'VIP Chauffeur & Dispatch',
    primaryDesc: 'Send a booking request. Our team reviews availability before confirming your journey.',
    secondaryTag: 'Secondary Line • 24/7 Support',
    secondaryTitle: 'Customer Care & Flight Support',
    secondaryDesc: 'Live flight tracking, airport meeting point assistance & general inquiries',
    connectAction: 'Connect on WhatsApp',
    trustOfficial: '100% Private & Official Rates',
    trust247: '24/7 Availability',
  },
  ms: {
    close: 'Tutup',
    modalTitle: 'Bantuan Langsung WhatsApp VIP',
    modalSubtitle: 'Pilih talian pilihan anda untuk bantuan peribadi segera:',
    primaryTag: 'Talian Utama • Permintaan Tempahan',
    primaryTitle: 'Pemandu & Penghantaran VIP',
    primaryDesc: 'Hantar permintaan tempahan. Pasukan kami menyemak perjalanan sebelum pengesahan.',
    secondaryTag: 'Talian Sokongan • Bantuan 24/7',
    secondaryTitle: 'Khidmat Pelanggan & Sokongan Penerbangan',
    secondaryDesc: 'Penjejakan penerbangan langsung, bantuan titik pertemuan lapangan terbang & pertanyaan umum',
    connectAction: 'Buka WhatsApp Segera',
    trustOfficial: 'Privasi Penuh & Kadar Rasmi',
    trust247: 'Ketersediaan 24/7',
  },
  id: {
    close: 'Tutup',
    modalTitle: 'Layanan Langsung WhatsApp VIP',
    modalSubtitle: 'Pilih jalur komunikasi untuk bantuan privat segera:',
    primaryTag: 'Jalur Utama • Permintaan Pemesanan',
    primaryTitle: 'Pengemudi & Pengiriman VIP',
    primaryDesc: 'Kirim permintaan perjalanan. Tim kami memeriksa ketersediaan sebelum konfirmasi.',
    secondaryTag: 'Jalur Dukungan • Layanan 24/7',
    secondaryTitle: 'Layanan Tamu & Dukungan Penerbangan',
    secondaryDesc: 'Pelacakan penerbangan langsung, titik temu bandara & panduan ziarah',
    connectAction: 'Mulai Chat WhatsApp',
    trustOfficial: '100% Privat & Tarif Resmi',
    trust247: 'Layanan 24/7 Non-stop',
  },
  ur: {
    close: 'بند کریں',
    modalTitle: 'براہ راست واٹس ایپ سروس',
    modalSubtitle: 'فوری اور نجی معاونت کے لیے اپنی پسندیدہ لائن منتخب کریں:',
    primaryTag: 'پرائمری لائن • بکنگ کی درخواست',
    primaryTitle: 'وی آئی پی شافر اور ڈسپیچ',
    primaryDesc: 'اپنی بکنگ کی درخواست بھیجیں۔ ہماری ٹیم دستیابی چیک کرنے کے بعد تصدیق کرے گی۔',
    secondaryTag: 'سپورٹ لائن • 24/7 سروس',
    secondaryTitle: 'کسٹمر کیئر اور پروازوں کی نگرانی',
    secondaryDesc: 'براہ راست پروازوں کی نگرانی، ائیرپورٹ پر ملاقات اور زیارات کی رہنمائی',
    connectAction: 'فوری واٹس ایپ کھولیں',
    trustOfficial: 'مکمل رازداری اور مستند کرائے',
    trust247: '24/7 چوبیس گھنٹے دستیابی',
  },
  fr: {
    close: 'Fermer',
    modalTitle: 'Conciergerie WhatsApp Directe',
    modalSubtitle: 'Sélectionnez votre ligne pour une assistance privée immédiate :',
    primaryTag: 'Ligne Principale • Demande de Réservation',
    primaryTitle: 'Chauffeur VIP et Régulation',
    primaryDesc: 'Envoyez votre demande. Notre équipe vérifiera les disponibilités avant toute confirmation.',
    secondaryTag: 'Ligne d’Assistance • Support 24/7',
    secondaryTitle: 'Service Client & Suivi des Vols',
    secondaryDesc: 'Suivi de vol en direct, accueil à l’aéroport et assistance pèlerinage',
    connectAction: 'Ouvrir sur WhatsApp',
    trustOfficial: '100% Privé & Tarifs Officiels',
    trust247: 'Disponibilité 24h/24 et 7j/7',
  },
  es: {
    close: 'Cerrar',
    modalTitle: 'Conserjería Directa por WhatsApp',
    modalSubtitle: 'Seleccione su línea preferida para asistencia privada inmediata:',
    primaryTag: 'Línea Principal • Solicitud de Reserva',
    primaryTitle: 'Chófer VIP y Asignación',
    primaryDesc: 'Envíe su solicitud. Nuestro equipo verificará la disponibilidad antes de confirmarla.',
    secondaryTag: 'Línea de Soporte • Atención 24/7',
    secondaryTitle: 'Atención al Cliente y Rastreo de Vuelos',
    secondaryDesc: 'Seguimiento de vuelos en tiempo real, punto de encuentro en aeropuerto y consultas',
    connectAction: 'Conectar por WhatsApp',
    trustOfficial: '100% Privado y Tarifas Oficiales',
    trust247: 'Disponibilidad 24/7',
  },
  de: {
    close: 'Schließen',
    modalTitle: 'Direkter WhatsApp-Concierge',
    modalSubtitle: 'Wählen Sie Ihre bevorzugte Rufnummer für sofortige persönliche Betreuung:',
    primaryTag: 'Hauptlinie • Buchungsanfrage',
    primaryTitle: 'VIP-Chauffeur & Disposition',
    primaryDesc: 'Senden Sie Ihre Buchungsanfrage. Unser Team prüft die Verfügbarkeit vor der Bestätigung.',
    secondaryTag: 'Support-Linie • 24/7 Betreuung',
    secondaryTitle: 'Kundenservice & Flugverfolgung',
    secondaryDesc: 'Live-Flugverfolgung, Treffpunkt-Koordination am Flughafen & allgemeine Auskünfte',
    connectAction: 'WhatsApp Chat starten',
    trustOfficial: '100% Privat & Offizielle Tarife',
    trust247: '24/7 Erreichbarkeit',
  },
  tr: {
    close: 'Kapat',
    modalTitle: 'Doğrudan WhatsApp İletişimi',
    modalSubtitle: 'Anında özel destek için tercih ettiğiniz hattı seçin:',
    primaryTag: 'Ana Hat • Rezervasyon Talebi',
    primaryTitle: 'VIP Şoför ve Koordinasyon',
    primaryDesc: 'Rezervasyon talebinizi gönderin. Ekibimiz uygunluğu kontrol ettikten sonra onay verir.',
    secondaryTag: 'Destek Hattı • 7/24 Hizmet',
    secondaryTitle: 'Müşteri Hizmetleri ve Uçuş Takibi',
    secondaryDesc: 'Canlı uçuş takibi, havalimanı karşılama noktası yardımı ve genel danışmanlık',
    connectAction: 'WhatsApp ile Bağlan',
    trustOfficial: '%100 Özel & Resmi Tarifeler',
    trust247: '7/24 Kesintisiz Hizmet',
  },
  hi: {
    close: 'बंद करें',
    modalTitle: 'सीधी व्हाट्सएप दरबान सेवा',
    modalSubtitle: 'तत्काल निजी सहायता के लिए अपनी पसंदीदा लाइन चुनें:',
    primaryTag: 'प्राथमिक लाइन • बुकिंग अनुरोध',
    primaryTitle: 'वीआईपी ड्राइवर और प्रेषण',
    primaryDesc: 'अपना बुकिंग अनुरोध भेजें। हमारी टीम उपलब्धता जाँचकर ही पुष्टि करेगी।',
    secondaryTag: 'सहायता लाइन • 24/7 सेवा',
    secondaryTitle: 'ग्राहक सेवा और उड़ान सहायता',
    secondaryDesc: 'लाइव उड़ान ट्रैकिंग, हवाई अड्डा मीटिंग पॉइंट सहायता और सामान्य पूछताछ',
    connectAction: 'व्हाट्सएप पर चैट शुरू करें',
    trustOfficial: '100% निजी और आधिकारिक दरें',
    trust247: '24/7 चौबीसों घंटे उपलब्धता',
  },
};

export function WhatsAppModal({ isOpen, onClose, locale, source }: WhatsAppModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const t = MODAL_I18N[locale] || MODAL_I18N.en;

  const numbers = [
    {
      id: 'primary',
      number: '966567588261',
      formatted: '+966 56 758 8261',
      tag: t.primaryTag,
      title: t.primaryTitle,
      desc: t.primaryDesc,
      isPrimary: true,
    },
    {
      id: 'secondary',
      number: '966505316971',
      formatted: '+966 50 531 6971',
      tag: t.secondaryTag,
      title: t.secondaryTitle,
      desc: t.secondaryDesc,
      isPrimary: false,
    },
  ];

  const handleSelectNumber = (num: string, lineId: string) => {
    trackEvent({
      event: 'whatsapp_handoff_initiated',
      source,
      assigned_number: num,
    });

    const greeting = LOCALE_CONFIG[locale]?.whatsappGreeting || LOCALE_CONFIG.en.whatsappGreeting;
    const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
    const refCode = lineId === 'secondary' ? `REF-B-${randomHex}` : `REF-A-${randomHex}`;
    const fullMessage = `${greeting} [${refCode}]`;
    const targetUrl = `https://wa.me/${num}?text=${encodeURIComponent(fullMessage)}`;

    // Analytics are recorded above; do not forge Turnstile tokens to create leads.
    // Only confirmed, verified booking submissions may create server-side leads.

    window.open(targetUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="whatsapp-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[var(--bg-surface)] border border-[var(--border-stone)] rounded-2xl p-6 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.25)] text-[var(--text-primary)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={onClose}
          aria-label={t.close}
          className="absolute top-4 right-4 rtl:right-auto rtl:left-4 w-9 h-9 rounded-full bg-[var(--bg-elevated)] hover:opacity-80 text-[var(--text-primary)] flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-gold"
        >
          <X className="w-5 h-5" />
        </button>

        {/* MODAL HEADER */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-xl bg-[#25d366]/15 border border-[#25d366]/40 flex items-center justify-center text-[#25d366] shrink-0">
            <MessageCircle className="w-7 h-7" />
          </div>
          <div>
            <h3 id="whatsapp-modal-title" className="text-lg sm:text-xl font-bold font-display text-[var(--text-primary)]">
              {t.modalTitle}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              {t.modalSubtitle}
            </p>
          </div>
        </div>

        {/* NUMBERS SELECTION LIST */}
        <div className="flex flex-col gap-3.5">
          {numbers.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelectNumber(item.number, item.id)}
              className="w-full text-start p-4 rounded-xl border border-[var(--border-stone)] bg-[var(--bg-elevated)] hover:border-[var(--accent-primary)] transition-all flex flex-col gap-2 group focus-visible:ring-2 focus-visible:ring-gold relative"
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gold px-2.5 py-0.5 rounded-full bg-gold/10 border border-gold/30">
                  {item.tag}
                </span>
                <span className="text-xs font-mono font-bold text-[var(--text-primary)] group-hover:text-gold transition-colors flex items-center gap-1">
                  {item.formatted}
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                </span>
              </div>

              <div>
                <h4 className="text-sm sm:text-base font-semibold text-[var(--text-primary)] group-hover:text-gold transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5 leading-relaxed">{item.desc}</p>
              </div>

              <div className="pt-2 mt-1 border-t border-[var(--border-stone)] flex items-center justify-between text-xs font-semibold text-[#168954]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#25d366] animate-pulse" />
                  {t.connectAction}
                </span>
                <span className="text-[var(--text-muted)] text-[11px]">Duyuf Alrahman VIP</span>
              </div>
            </button>
          ))}
        </div>

        {/* SECURITY & TRUST FOOTER */}
        <div className="mt-5 pt-4 border-t border-[var(--border-stone)] flex items-center justify-between text-[11px] text-[var(--text-secondary)]">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-gold" />
            {t.trustOfficial}
          </span>
          <span className="flex items-center gap-1.5">
            <Headphones className="w-3.5 h-3.5 text-gold" />
            {t.trust247}
          </span>
        </div>
      </div>
    </div>
  );
}
