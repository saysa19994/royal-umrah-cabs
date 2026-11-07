import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Locale, getLocalizedAlternates } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { ZIYARAT_SITES, ZIYARAT_TOURS, ZIYARAT_GUIDES } from '@/data/ziyarat';
import SacredZiyaratExperience from '@/components/ziyarat/SacredZiyaratExperience';
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
    <div className="bg-[#090D15] min-h-screen text-start text-[#F6F3ED] overflow-x-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* 1. CINEMATIC SACRED PROPHETIC HERO */}
      <section className="relative w-full pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b border-white/10">
        {/* Luxury Golden Ambient Illumination */}
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#D6A13A" />

        <div className="absolute inset-0 pointer-events-none select-none z-0">
          <Image
            src="/assets/blueprint/routes/madinah-ziyarat.webp"
            alt={isAr ? 'مزارات مكة والمدينة المنورة' : 'Makkah and Madinah Ziyarat Sites'}
            fill
            priority
            className="object-cover object-center brightness-40 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090D15] via-[#090D15]/85 to-[#090D15]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#090D15]/95 via-transparent to-[#090D15]/95" />
        </div>

        {/* Ambient Gold Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none z-0" />

        <div className="container mx-auto px-4 max-w-6xl relative z-10 text-center">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumbs"
            className="flex items-center justify-center gap-2 text-xs text-[#AEB7C4] mb-6 flex-wrap"
          >
            <Link href={`/${locale}`} className="hover:text-[#D4AF37] transition-colors">
              {isAr ? 'الرئيسية' : 'Home'}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/30 rtl:rotate-180" />
            <span className="text-[#D4AF37] font-semibold">
              {isAr ? 'المزارات المقدسة' : 'Sacred Ziyarat'}
            </span>
          </nav>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#101725]/90 border border-[#D4AF37]/40 text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-4 backdrop-blur-md shadow-lg shadow-[#D4AF37]/5">
            <Compass className="w-3.5 h-3.5" />
            <span>{isAr ? 'رحلات المعالم الإسلامية المقدسة' : 'Sacred Prophetic Geography'}</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight max-w-4xl mx-auto mb-4">
            {isAr ? (
              <>
                جولات مزارات مكة والمدينة{' '}
                <span className="text-[#D4AF37] italic font-serif">بسيارة خاصة وسائق</span>
              </>
            ) : (
              <>
                Private Ziyarat Tours in{' '}
                <span className="text-[#D4AF37] italic font-serif">Makkah &amp; Madinah</span>
              </>
            )}
          </h1>

          <p className="mt-4 text-[#AEB7C4] text-sm md:text-lg leading-relaxed font-light max-w-3xl mx-auto mb-8">
            {isAr
              ? 'استكشف مهبط الوحي ومواضع السيرة النبوية الشريفة بأقصى درجات السكينة والراحة مع عائلتك. سيارات حديثة ومكيفة، سائقون محترفون، وأسعار ثابتة شاملة ساعات الانتظار مع الدفع نقداً عند الوصول.'
              : 'Visit sacred Quranic sanctuaries, prophetic battlefields, and historic mosques in complete family comfort. Professional local chauffeurs, pre-cooled luxury vehicles, and guaranteed fixed pricing with 100% Cash-on-Arrival.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/${locale}/booking?service=ziyarat`}
              className="h-12 sm:h-14 px-8 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38F2B] hover:from-[#E5C158] hover:to-[#C49E34] text-[#090D15] font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg shadow-[#D4AF37]/25 flex items-center gap-2 active:scale-95"
            >
              <Car className="w-4 h-4" />
              <span>{isAr ? 'احجز سيارة للمزارات الآن' : 'Book Private Ziyarat Car'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 sm:h-14 px-7 rounded-xl bg-[#101725]/90 hover:bg-[#141D2C] border border-white/10 hover:border-[#D4AF37]/50 text-[#F6F3ED] hover:text-[#D4AF37] font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2.5 backdrop-blur-md shadow-md active:scale-95"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>{isAr ? 'استفسار عبر واتساب' : 'Inquire via WhatsApp'}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. SACRED ZIYARAT LUXURY EXPERIENCE COMPONENT */}
      <div className="container mx-auto px-4 max-w-6xl py-12 md:py-16">
        <SacredZiyaratExperience locale={locale} initialCity="makkah" />

        {/* 3. PRACTICAL GUIDES */}
        <section className="bg-[#101725] rounded-3xl p-6 sm:p-10 border border-white/10 shadow-xl mb-12">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">
              Pilgrim Knowledge Base
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
              {isAr ? 'أدلة وإرشادات تخطيط الزيارات' : 'Essential Pilgrim Ziyarat Guides'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {guidesList.map((g) => (
              <Link
                key={g.slug}
                href={`/${locale}/ziyarat/guides/${g.slug}`}
                className="p-6 rounded-2xl bg-[#141D2C] border border-white/5 hover:border-[#D4AF37]/50 transition-all block group hover:-translate-y-1 shadow-md"
              >
                <span className="text-[10px] text-[#D4AF37] font-bold block mb-1.5 uppercase tracking-wider">
                  {isAr ? 'دليل معتمد · تحديث 2026' : 'Verified Guide · 2026'}
                </span>
                <h3 className="font-display font-extrabold text-base text-white group-hover:text-[#D4AF37] transition-colors mb-2 line-clamp-1">
                  {isAr ? g.titleAr : g.titleEn}
                </h3>
                <p className="text-xs text-[#AEB7C4] line-clamp-2 font-light leading-relaxed">
                  {isAr ? g.summaryAr : g.summaryEn}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* 4. HOW IT WORKS (3 SIMPLE STEPS) */}
        <section className="bg-[#101725] rounded-3xl p-6 sm:p-10 border border-white/10 shadow-xl mb-12">
          <div className="text-center mb-10">
            <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">
              Seamless Process
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
              {isAr ? 'كيف تعمل خدمة الزيارات الخاصة معنا؟' : 'How Our Private Ziyarat Service Works'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#141D2C] border border-white/5 text-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#B38F2B] text-[#090D15] font-black font-display text-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#D4AF37]/20">
                1
              </div>
              <h3 className="font-display font-extrabold text-base text-white mb-2">
                {isAr ? 'اختر المدينة أو الجولة' : 'Choose City or Tour'}
              </h3>
              <p className="text-xs text-[#AEB7C4] leading-relaxed font-light">
                {isAr
                  ? 'حدد مكة أو المدينة، واختر جولة نصف يوم جاهزة أو حدد المواقع التي تفضل زيارتها.'
                  : 'Select Makkah or Madinah, choose a curated half-day tour or build your custom stops.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#141D2C] border border-white/5 text-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#B38F2B] text-[#090D15] font-black font-display text-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#D4AF37]/20">
                2
              </div>
              <h3 className="font-display font-extrabold text-base text-white mb-2">
                {isAr ? 'استقبال مباشر من باب الفندق' : 'Door-to-Door Hotel Pickup'}
              </h3>
              <p className="text-xs text-[#AEB7C4] leading-relaxed font-light">
                {isAr
                  ? 'يلتقي بكم السائق في بهو الفندق بسيارة مكيفة مسبقاً مع مياه شرب باردة مجهزة.'
                  : 'Your chauffeur greets you at your hotel lobby with a pre-cooled executive vehicle and bottled water.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#141D2C] border border-white/5 text-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#B38F2B] text-[#090D15] font-black font-display text-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#D4AF37]/20">
                3
              </div>
              <h3 className="font-display font-extrabold text-base text-white mb-2">
                {isAr ? 'وقت انتظار مريح والدفع عند الوصول' : 'Unhurried Wait & Pay on Arrival'}
              </h3>
              <p className="text-xs text-[#AEB7C4] leading-relaxed font-light">
                {isAr
                  ? 'ينتظركم السائق في كل موقع للصلاة والدعاء، وتسددون الأجرة نقداً عند العودة للفندق.'
                  : 'Enjoy generous prayer time at each site. Pay your chauffeur directly upon safe return to your hotel.'}
              </p>
            </div>
          </div>
        </section>

        {/* 5. FAQS */}
        <section className="bg-[#101725] rounded-3xl p-6 sm:p-10 border border-white/10 shadow-xl mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-[#141D2C] border border-white/10 text-[#D4AF37] flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
              {isAr ? 'الأسئلة الشائعة حول جولات المزارات' : 'Frequently Asked Questions on Ziyarat'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#AEB7C4] mb-8 font-light">
            {isAr ? 'إجابات واضحة وموثوقة لكافة استفسارات المعتمرين حول جولات المعالم الإسلامية' : 'Clear and verified answers to common questions about sacred historical tours'}
          </p>

          <div className="space-y-4">
            <div className="p-5 sm:p-6 rounded-2xl bg-[#141D2C] border border-white/5 space-y-2">
              <h3 className="font-bold text-sm sm:text-base text-white leading-snug flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
                <span>{isAr ? 'هل يقدم السائق شرحاً تاريخياً وإرشاداً سياحياً مرخصاً؟' : 'Does the chauffeur act as a licensed tour guide?'}</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#AEB7C4] leading-relaxed font-light pl-3.5 rtl:pl-0 rtl:pr-3.5">
                {isAr
                  ? 'خدمتنا هي نقل خاص وتوصيل بسيارة وسائق مخصص لراحتكم اللوجستية والانتظار. سائقونا خبراء بالطرق والمواقع التاريخية ولكنهم ليسوا مرشدين سياحيين مرخصين. إذا كنت تبحث عن مرشد مرخص يمكننا التنسيق مع جهات معتمدة عند الطلب.'
                  : 'Our service is strictly private chauffeur ground transport with vehicle standby. Our chauffeurs know the routes and sites intimately, but are not licensed academic tour guides. We provide written historical guides and coordinate logistics.'}
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-[#141D2C] border border-white/5 space-y-2">
              <h3 className="font-bold text-sm sm:text-base text-white leading-snug flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
                <span>{isAr ? 'هل السعر للشخص الواحد أم للسيارة بالكامل؟' : 'Is the price per person or per vehicle?'}</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#AEB7C4] leading-relaxed font-light pl-3.5 rtl:pl-0 rtl:pr-3.5">
                {isAr
                  ? 'كافة أسعارنا ثابتة ومحددة للسيارة بالكامل متضمنة الوقود والمواقف والانتظار حتى الحد الأقصى لسعة ركاب السيارة المختارة دون أي تكاليف خفية.'
                  : 'All our quoted rates are fixed per vehicle, covering the entire car, chauffeur, waiting time, fuel, and tolls for up to the vehicle seating capacity.'}
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-[#141D2C] border border-white/5 space-y-2">
              <h3 className="font-bold text-sm sm:text-base text-white leading-snug flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
                <span>{isAr ? 'هل تتوفر جولات المزارات أثناء موسم الحج؟' : 'Are Ziyarat tours available during Hajj season?'}</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#AEB7C4] leading-relaxed font-light pl-3.5 rtl:pl-0 rtl:pr-3.5">
                {isAr
                  ? 'المشاعر المقدسة (منى، عرفات، ومزدلفة) تخضع لتنظيمات أمنية صارمة تمنع دخول المركبات غير المصرحة خلال موسم الحج، ويتم تعليق رحلات المشاعر تلقائياً في تلك الأيام لحين فتحها رسمياً.'
                  : 'Hajj sacred grounds (Mina, Arafat, Muzdalifah) are strictly closed to non-licensed transport during the Hajj pilgrimage days. Our booking system automatically restricts tours to those zones during official Hajj dates.'}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
