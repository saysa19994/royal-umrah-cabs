import React from 'react';
import './ziyarat-narrative.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale, getLocalizedAlternates } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { ZIYARAT_SITES, ZIYARAT_TOURS, ZIYARAT_GUIDES } from '@/data/ziyarat';
import SacredZiyaratExperience from '@/components/ziyarat/SacredZiyaratExperience';
import {ZiyaratArcGallery} from '@/components/ziyarat/ZiyaratArcGallery';
import ZiyaratPilgrimJournal from '@/components/ziyarat/ZiyaratPilgrimJournal';
import { Spotlight } from '@/components/ui/luxury/Spotlight';
import {
  MapPin,
  Clock,
  ShieldCheck,
  Check,
  ArrowRight,
  MessageCircle,
  Star,
  Compass,
  Car,
  ChevronRight,
  Sparkles,
  HelpCircle,
  BadgeCheck,
} from 'lucide-react';

interface ZiyaratHubPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata(props: ZiyaratHubPageProps): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params;
  const isAr = locale === 'ar';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://duyufalrahmanvip.com';

  return {
    title: isAr
      ? 'جولات مزارات مكة والمدينة بسيارة خاصة وسائق'
      : 'Private Ziyarat Tours Makkah & Madinah with Chauffeur',
    description: isAr
      ? 'احجز جولة مزارات خاصة في مكة المكرمة والمدينة المنورة بسيارة مكيفة وسائق مخصص. غار حراء، ثور، قباء، وأحد بأسعار ثابتة شاملة الانتظار.'
      : 'Book private car Ziyarat tours in Makkah & Madinah with professional chauffeurs. Cave Hira, Mount Thawr, Masjid Quba, & Mount Uhud with fixed fares.',
    alternates: getLocalizedAlternates(locale, '/ziyarat'),
    openGraph: {
      title: isAr
        ? 'جولات مزارات مكة والمدينة بسيارة خاصة وسائق | ضيوف الرحمن VIP'
        : 'Private Ziyarat Tours Makkah & Madinah with Chauffeur | Duyuf Alrahman VIP',
      description: isAr
        ? 'احجز جولة مزارات خاصة في مكة المكرمة والمدينة المنورة بسيارة مكيفة وسائق مخصص.'
        : 'Book private car Ziyarat tours in Makkah & Madinah with professional chauffeurs.',
      url: `${baseUrl}/${locale}/ziyarat`,
      siteName: 'Duyuf Alrahman VIP',
      type: 'website',
    },
  };
}

export default async function ZiyaratHubPage(props: ZiyaratHubPageProps) {
  const params = await props.params;
  const { locale } = params;
  const dict = getDictionary(locale);
  const isAr = locale === 'ar';
  const isRtl = locale === 'ar' || locale === 'ur';
  const guidesList = Object.values(ZIYARAT_GUIDES);

  const whatsappMessage = isAr
    ? 'السلام عليكم، أود الاستفسار عن حجز سيارة خاصة لجولة المزارات في مكة / المدينة.'
    : 'Hello, I would like to inquire about booking a private chauffeur for Ziyarat in Makkah / Madinah.';
  const whatsappUrl = `https://wa.me/966567588261?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="duyuf-ziyarat-narrative bg-bg min-h-screen text-start text-ink overflow-x-hidden transition-colors duration-200" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* 1. EDITORIAL SACRED PROPHETIC HERO */}
      <section className="duyuf-ziyarat-hero relative w-full pt-16 pb-14 md:pt-24 md:pb-20 overflow-hidden border-b border-border bg-bg transition-colors duration-200">
        <div className="duyuf-ziyarat-hero-grid container mx-auto px-4 max-w-6xl relative z-10">
          <div className="duyuf-ziyarat-hero-copy">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumbs"
            className="flex items-center justify-center gap-2 text-xs text-ink-muted mb-6 flex-wrap"
          >
            <Link href={`/${locale}`} className="hover:text-gold-dark transition-colors">
              {isAr ? 'الرئيسية' : 'Home'}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-border rtl:rotate-180" />
            <span className="text-gold-dark font-semibold">
              {isAr ? 'المزارات المقدسة' : 'Sacred Ziyarat'}
            </span>
          </nav>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface border border-border text-xs font-bold text-gold-dark uppercase tracking-widest mb-4 shadow-sm">
            <Compass className="w-3.5 h-3.5" />
            <span>{isAr ? 'رحلات المعالم الإسلامية المقدسة' : 'Sacred Prophetic Geography'}</span>
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-ink tracking-tight leading-tight max-w-4xl mx-auto mb-4">
            {isAr ? (
              <>
                جولات مزارات مكة والمدينة{' '}
                <span className="text-gold-dark italic font-serif">بسيارة خاصة وسائق</span>
              </>
            ) : (
              <>
                Private Ziyarat Tours in{' '}
                <span className="text-gold-dark italic font-serif">Makkah &amp; Madinah</span>
              </>
            )}
          </h1>

          <p className="mt-4 text-ink-muted text-sm md:text-base leading-relaxed font-light max-w-3xl mx-auto mb-8">
            {isAr
              ? 'استكشف مهبط الوحي ومواضع السيرة النبوية الشريفة بأقصى درجات السكينة والراحة مع عائلتك. سيارات حديثة ومكيفة، سائقون محترفون، وأسعار ثابتة شاملة ساعات الانتظار مع الدفع نقداً عند الوصول.'
              : 'Visit sacred Quranic sanctuaries, prophetic battlefields, and historic mosques in complete family comfort. Professional local chauffeurs, pre-cooled luxury vehicles, and guaranteed fixed pricing with 100% Cash-on-Arrival.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/${locale}/booking?type=ziyarat&route=makkah-ziyarat`}
              className="h-12 px-8 rounded-xl bg-gold-dark hover:opacity-90 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md flex items-center gap-2 active:scale-95"
            >
              <Car className="w-4 h-4" />
              <span>{isAr ? 'احجز سيارة للمزارات الآن' : 'Book Private Ziyarat Car'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 px-7 rounded-xl bg-surface hover:bg-bg-alt border border-border text-ink hover:text-gold-dark font-bold text-xs sm:text-sm transition-all flex items-center gap-2.5 shadow-sm active:scale-95"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>{isAr ? 'استفسار عبر واتساب' : 'Inquire via WhatsApp'}</span>
            </a>
          </div>
          </div>
          <div className="duyuf-ziyarat-hero-image duyuf-ziyarat-hero-arc">
            <ZiyaratArcGallery locale={locale} />
          </div>
        </div>
      </section>

      {/* 2. SACRED ZIYARAT LUXURY EXPERIENCE COMPONENT */}
      <div className="duyuf-ziyarat-body container mx-auto px-4 max-w-6xl py-12 md:py-16">
        <SacredZiyaratExperience locale={locale} initialCity="makkah" />

        {/* Editorial reading archive, connected itinerary and transport Q&A */}
        <ZiyaratPilgrimJournal locale={locale} />
      </div>
    </div>
  );
}
