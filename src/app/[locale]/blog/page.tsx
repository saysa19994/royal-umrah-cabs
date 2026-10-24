import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Locale, getLocalizedAlternates, LOCALES, LOCALE_CONFIG } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { BLOG_POSTS } from '@/data/blog-posts';
import { Clock, Calendar, ArrowRight, Sparkles } from 'lucide-react';

interface BlogIndexProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata(props: BlogIndexProps): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params;

  const titles: Record<Locale, string> = {
    ar: 'مدونة نقل المعتمرين وضيوف الرحمن | نصائح وإرشادات السفر',
    en: 'VIP Umrah Transport & Pilgrimage Blog | Travel Guides & Insights',
    ms: 'Blog Pengangkutan VIP Umrah | Panduan & Nasihat Perjalanan',
    id: 'Blog Transportasi VIP Umrah | Panduan Perjalanan Tamu Allah',
    ur: 'وی آئی پی عمرہ ٹرانسپورٹ بلاگ | زائرین کے لیے رہنمائی',
    fr: 'Blog Transport VIP Omra | Guides & Conseils pour Pèlerins',
    es: 'Blog de Transporte VIP Umrah | Guías de Viaje para Peregrinos',
    de: 'VIP-Umrah-Transport-Blog | Pilgerreise-Ratgeber & Chauffeur-Tipps',
    hi: 'वीआईपी उमरा परिवहन ब्लॉग | तीर्थयात्रियों के लिए यात्रा गाइड',
    tr: 'VIP Umre Transfer Bloğu | Hac & Umre Seyahat Rehberleri',
  };

  const descriptions: Record<Locale, string> = {
    ar: 'مقالات وإرشادات شاملة لضيوف الرحمن: دليلك لاختيار سيارات VIP، استقبال مطار جدة، المقارنة بين وسائل النقل، وأسرار السفر المريح بين مكة والمدينة.',
    en: 'Authoritative guides and travel insights for Umrah pilgrims: VIP chauffeur transfers, Jeddah airport arrivals, and seamless journeys between Makkah and Madinah.',
    ms: 'Panduan berwibawa dan nasihat perjalanan untuk jemaah Umrah: pemandu peribadi VIP, ketibaan Lapangan Terbang Jeddah, dan perjalanan Makkah ke Madinah.',
    id: 'Panduan lengkap dan terpercaya bagi jamaah Umrah: transfer mobil VIP, penjemputan Bandara Jeddah, dan perjalanan nyaman antara Makkah dan Madinah.',
    ur: 'عمرہ زائرین کے لیے جامع گائیڈز: جدہ ایئرپورٹ پر وی آئی پی استقبالیہ، بہترین گاڑیوں کا انتخاب اور مکہ مکرمہ تا مدینہ منورہ پرسکون سفر۔',
    fr: 'Guides complets pour les pèlerins de la Omra : transferts VIP avec chauffeur, accueil à l’aéroport de Djeddah et trajets entre La Mecque et Médine.',
    es: 'Guías completas para peregrinos de la Umrah: traslados VIP con chofer, recepción en el aeropuerto de Yeda y viajes entre La Meca y Medina.',
    de: 'Umfassende Ratgeber für Umrah-Pilger: VIP-Chauffeurdienste, Empfang am Flughafen Dschidda und entspannte Fahrten zwischen Mekka und Medina.',
    hi: 'उमरा तीर्थयात्रियों के लिए विश्वसनीय गाइड: वीआईपी चौफ़र ट्रांसफर, जेद्दा एयरपोर्ट पिकअप और मक्का-मदीना की आरामदायक यात्रा।',
    tr: 'Umre ziyaretçileri için kapsamlı rehberler: VIP özel şoförlü transfer, Cidde Havalimanı karşılama ve Mekke - Medine arası huzurlu yolculuklar.',
  };

  const title = titles[locale] || titles.en;
  const description = descriptions[locale] || descriptions.en;

  return {
    title: `${title} | Duyuf Alrahman VIP`,
    description,
    alternates: getLocalizedAlternates(locale, '/blog'),
    openGraph: {
      title: `${title} | Duyuf Alrahman VIP`,
      description,
      type: 'website',
      images: [
        {
          url: '/assets/images/vip-umrah-transport-jeddah-to-makkah.jpg',
          width: 1024,
          height: 571,
          alt: title,
        },
      ],
    },
  };
}

export default async function BlogIndexPage(props: BlogIndexProps) {
  const params = await props.params;
  const { locale } = params;
  const dict = getDictionary(locale);
  const localeMeta = LOCALE_CONFIG[locale] || LOCALE_CONFIG.en;
  const isRtl = localeMeta.dir === 'rtl';

  const badgeLabels: Record<Locale, string> = {
    ar: 'مقالات وإرشادات ضيوف الرحمن',
    en: 'Pilgrim Insights & Guides',
    ms: 'Panduan & Wawasan Jemaah',
    id: 'Panduan & Wawasan Jamaah',
    ur: 'زائرینِ حرم کے لیے رہنمائی',
    fr: 'Guides & Conseils Pèlerins',
    es: 'Guías e Información para Peregrinos',
    de: 'Pilger-Ratgeber & Einblicke',
    hi: 'तीर्थयात्री गाइड एवं जानकारी',
    tr: 'Hacı & Umreci Rehberleri',
  };

  const h1Titles: Record<Locale, string> = {
    ar: 'مدونة النقل الفاخر لضيوف الرحمن',
    en: 'VIP Umrah Transport Blog',
    ms: 'Blog Pengangkutan VIP Umrah',
    id: 'Blog Transportasi VIP Umrah',
    ur: 'وی آئی پی عمرہ ٹرانسپورٹ بلاگ',
    fr: 'Blog du Transport VIP pour la Omra',
    es: 'Blog de Transporte VIP para Umrah',
    de: 'Blog für VIP-Umrah-Transport',
    hi: 'वीआईपी उमरा परिवहन ब्लॉग',
    tr: 'VIP Umre Transfer Bloğu',
  };

  const subTitles: Record<Locale, string> = {
    ar: 'أدلة موثوقة ومفصلة ترشدك في كل خطوة من وصولك مطار جدة وحتى أداء مناسكك براحة وطمأنينة.',
    en: 'Expert travel guides, vehicle selection benchmarks, and essential advice for an effortless pilgrimage.',
    ms: 'Panduan perjalanan pakar, penanda aras kenderaan, dan nasihat penting untuk ibadah yang lancar.',
    id: 'Panduan perjalanan terpercaya, pilihan armada mobil terbaik, dan tips penting untuk ibadah yang khusyuk.',
    ur: 'معیاری معلوماتی گائیڈز، گاڑیوں کے درست انتخاب کے اصول اور باسہولت عبادت کے لیے ضروری رہنمائی۔',
    fr: 'Guides d’experts, comparatifs de véhicules et conseils essentiels pour un pèlerinage fluide et serein.',
    es: 'Guías de viaje expertas, selección de vehículos y consejos esenciales para una peregrinación sin contratiempos.',
    de: 'Fachkundige Reiseleitfäden, Fahrzeugvergleiche und wichtige Ratschläge für eine sorgenfreie Pilgerreise.',
    hi: 'अनुभवी यात्रा गाइड, गाड़ियों के सही चुनाव के मानक और सुगम तीर्थयात्रा के लिए जरूरी सलाह।',
    tr: 'Uzman seyahat rehberleri, araç seçim kriterleri ve huzurlu bir umre için gerekli pratik tavsiyeler.',
  };

  const readMoreLabels: Record<Locale, string> = {
    ar: 'اقرأ الدليل كاملاً',
    en: 'Read Full Guide',
    ms: 'Baca Panduan Penuh',
    id: 'Baca Panduan Lengkap',
    ur: 'مکمل گائیڈ پڑھیں',
    fr: 'Lire le Guide Complet',
    es: 'Leer Guía Completa',
    de: 'Vollständigen Leitfaden Lesen',
    hi: 'पूरी गाइड पढ़ें',
    tr: 'Rehberin Tamamını Oku',
  };

  return (
    <div className="py-12 md:py-20 bg-bg min-h-screen text-start" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 max-w-6xl">
        {/* BREADCRUMB */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-ink-muted mb-8">
          <Link href={`/${locale}`} className="hover:text-gold-dark transition-colors">
            {dict.nav.home}
          </Link>
          <span>/</span>
          <span className="text-ink font-semibold">{locale === 'ar' ? 'المدونة' : 'Blog'}</span>
        </nav>

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
            <span>{badgeLabels[locale] || badgeLabels.en}</span>
          </div>
          <h1 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl text-ink tracking-tight">
            {h1Titles[locale] || h1Titles.en}
          </h1>
          <p className="mt-4 text-base md:text-lg text-ink-muted leading-relaxed font-light">
            {subTitles[locale] || subTitles.en}
          </p>
        </div>

        {/* ARTICLES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="bg-surface rounded-2xl border border-border overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              {/* Featured Image */}
              <Link
                href={`/${locale}/blog/${post.slug}`}
                className="relative block aspect-[16/9] w-full overflow-hidden bg-slate-900"
              >
                <Image
                  src={post.featuredImage}
                  alt={post.imageAlt[locale] || post.imageAlt.en}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3">
                  <span className="inline-block px-3 py-1 rounded-full bg-navy/80 backdrop-blur-md border border-white/20 text-[11px] font-bold text-gold">
                    {post.category[locale] || post.category.en}
                  </span>
                </div>
              </Link>

              {/* Content Body */}
              <div className="p-6 flex flex-col flex-1 text-start">
                <div className="flex items-center gap-3 text-xs text-ink-muted mb-3">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gold-dark" />
                    {post.readTime[locale] || post.readTime.en}
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-gold-dark" />
                    {locale === 'ar' ? 'أكتوبر 2026' : 'October 2026'}
                  </span>
                </div>

                <h2 className="font-display font-bold text-lg md:text-xl text-ink leading-snug group-hover:text-gold-dark transition-colors mb-3">
                  <Link href={`/${locale}/blog/${post.slug}`}>
                    {post.title[locale] || post.title.en}
                  </Link>
                </h2>

                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-light mb-6 flex-1 line-clamp-3">
                  {post.excerpt[locale] || post.excerpt.en}
                </p>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-gold-dark hover:text-ink transition-colors"
                  >
                    <span>{readMoreLabels[locale] || readMoreLabels.en}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                  </Link>
                  <span className="text-[11px] text-ink-muted">
                    {post.author[locale] || post.author.en}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
