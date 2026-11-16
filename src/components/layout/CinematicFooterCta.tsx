'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Locale, LOCALE_CONFIG } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import type { SiteSettings } from '@/lib/settings';
import {
  CalendarDays,
  MessageCircle,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface CinematicFooterCtaProps {
  locale: Locale;
  dict: Dictionary;
  settings: SiteSettings;
}

const WHATSAPP_PREFILL: Record<Locale, string> = {
  ar: 'السلام عليكم، أرغب في حجز خدمة نقل خاص VIP من ضيوف الرحمن.',
  en: 'Hello, I would like to reserve a private VIP transfer with Duyuf Alrahman VIP.',
  ms: 'Assalamualaikum, saya ingin menempah pemindahan VIP peribadi bersama Duyuf Alrahman VIP.',
  id: 'Assalamualaikum, saya ingin memesan transportasi VIP pribadi bersama Duyuf Alrahman VIP.',
  ur: 'السلام علیکم، میں ضیوف الرحمن VIP کے ساتھ پرائیویٹ وی آئی پی ٹرانسپورٹ بک کرنا چاہتا ہوں۔',
  fr: 'Bonjour, je souhaite réserver un transfert privé VIP avec Duyuf Alrahman VIP.',
  es: 'Hola, me gustaría reservar un traslado privado VIP con Duyuf Alrahman VIP.',
  de: 'Hallo, ich möchte einen privaten VIP-Transfer bei Duyuf Alrahman VIP buchen.',
  tr: 'Merhaba, Duyuf Alrahman VIP ile özel VIP transfer rezervasyonu yapmak istiyorum.',
  hi: 'नमस्ते, मैं Duyuf Alrahman VIP के साथ प्राइवेट VIP ट्रांसफर बुक करना चाहता हूँ।',
};

export function CinematicFooterCta({
  locale,
  dict,
  settings,
}: CinematicFooterCtaProps) {
  const pathname = usePathname();
  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;
  const localeMeta = LOCALE_CONFIG[locale] || LOCALE_CONFIG.en;
  const dir = localeMeta.dir;
  const isRtl = dir === 'rtl';

  // Exclude CTA on all internal subpages to keep them focused, clean and editorial
  const isSubpage = pathname
    ? /(booking|manage-booking|track-booking|about|contact|services|fleet|blog|ziyarat|privacy|terms|cancellation)/.test(pathname)
    : false;

  if (isSubpage) {
    return null;
  }

  const cleanWa = (settings?.whatsapp_number || '966567588261').replace(/\D/g, '') || '966567588261';
  const waPrefill = WHATSAPP_PREFILL[locale] || WHATSAPP_PREFILL.en;
  const waUrl = `https://wa.me/${cleanWa}?text=${encodeURIComponent(waPrefill)}`;

  const stripPhotos = [
    {
      src: '/assets/images/routes/jeddah-airport-to-makkah.jpg',
      alt: dict.services.airportTitle,
    },
    {
      src: '/assets/images/routes/makkah-to-madinah.jpg',
      alt: dict.services.intercityTitle,
    },
    {
      src: '/assets/images/routes/madinah-airport.jpg',
      alt: dict.miqat_ziyarat.ziyaratMadinahTitle,
    },
    {
      src: '/assets/images/routes/makkah-ziyarat.jpg',
      alt: dict.miqat_ziyarat.ziyaratMakkahTitle,
    },
    {
      src: '/assets/images/vip-umrah-transport-jeddah-to-makkah.jpg',
      alt: dict.services_list.airportTitle,
    },
    {
      src: '/assets/images/routes/makkah-to-taif.jpg',
      alt: `${dict.popular_routes.heading} ${dict.popular_routes.headingHighlight}`,
    },
  ];

  return (
    <section
      aria-labelledby="cinematic-footer-cta-heading"
      dir={dir}
      className="relative bg-[var(--bg-base)] border-t border-[var(--border-stone)] pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-10 overflow-hidden transition-colors duration-200"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10 space-y-6 sm:space-y-8">
        {/* Editorial Luxury Panel */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[var(--border-stone)] bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-xl transition-colors duration-200">
          {/* Photograph Right/End */}
          <div className="relative h-56 sm:h-72 w-full lg:h-auto lg:w-[55%] lg:absolute lg:inset-y-0 lg:end-0 overflow-hidden">
            <Image
              src="/assets/images/haram_hero.webp"
              alt={`${dict.meta.brand} — ${dict.hero.eyebrow}`}
              fill
              sizes="(max-width: 1024px) 100vw, 760px"
              className="object-cover object-[76%_40%] lg:object-[78%_48%]"
            />
            {/* Blends */}
            <div
              className="lg:hidden absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)] via-[var(--bg-surface)]/70 to-transparent"
              aria-hidden="true"
            />
            <div
              className="hidden lg:block absolute inset-0 ltr:bg-gradient-to-r rtl:bg-gradient-to-l from-[var(--bg-surface)] via-[var(--bg-surface)]/80 to-transparent"
              aria-hidden="true"
            />
          </div>

          {/* Content */}
          <div className={`relative z-10 px-6 pb-8 pt-6 sm:px-10 sm:pb-12 lg:px-14 ${isHomePage ? 'lg:py-11 xl:py-12' : 'lg:py-16 xl:py-20'}`}>
            <div className="max-w-xl text-start space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--accent-soft)] border border-[var(--accent-primary)]/30 text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-[var(--accent-primary)]">
                <Sparkles className="w-3.5 h-3.5 text-[var(--accent-primary)] shrink-0" />
                <span>{dict.hero.eyebrow}</span>
              </div>

              <h2
                id="cinematic-footer-cta-heading"
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] leading-[1.25] tracking-tight"
              >
                {dict.cta_band.heading}{' '}
                <span className="text-[var(--accent-primary)]">{dict.cta_band.headingHighlight}</span>
              </h2>

              <p className="text-sm sm:text-base text-[var(--text-secondary)] font-light leading-relaxed max-w-lg">
                {dict.cta_band.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3.5 pt-2">
                <Link
                  href={`/${locale}/booking`}
                  className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-7 py-3.5 rounded-xl bg-[var(--accent-primary)] hover:opacity-90 text-white font-bold text-sm tracking-wide shadow-md transition-all group"
                >
                  <CalendarDays className="w-4 h-4 shrink-0" />
                  <span>{dict.cta_band.buttonPrimary}</span>
                  {isRtl ? (
                    <ArrowLeft className="w-4 h-4 shrink-0 transition-transform group-hover:-translate-x-1" />
                  ) : (
                    <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
                  )}
                </Link>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-6 py-3.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-stone)] text-[var(--text-primary)] hover:border-[var(--accent-primary)] font-semibold text-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                  <span>{dict.cta_band.buttonWhatsApp}</span>
                </a>
              </div>

              <div className="pt-3 flex items-start sm:items-center gap-2 text-xs text-[var(--text-muted)] font-light max-w-lg">
                <ShieldCheck className="w-4 h-4 text-[var(--accent-primary)] shrink-0 mt-0.5 sm:mt-0" />
                <span>{dict.hero.payOnArrivalNotice}</span>
              </div>
            </div>
          </div>
        </div>

        {/* The homepage already features the routes; suppress this repeated image strip there. */}
        {!isHomePage && (
        <div
          className="relative overflow-hidden rounded-xl border border-[var(--border-stone)] bg-[var(--bg-surface)] py-2.5 shadow-xs transition-colors duration-200"
          role="region"
          aria-label={dict.popular_routes.sectionPill}
        >
          <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto px-3 scrollbar-none">
            {stripPhotos.map((photo, idx) => (
              <div
                key={`strip-${idx}`}
                className="relative w-32 sm:w-40 md:w-44 aspect-[16/9] shrink-0 rounded-lg overflow-hidden border border-[var(--border-stone)] bg-[var(--bg-elevated)]"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 128px, 176px"
                  className="object-cover object-center"
                />
              </div>
            ))}
          </div>
        </div>
        )}
      </div>
    </section>
  );
}
