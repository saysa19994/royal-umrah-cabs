import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale, getLocalizedAlternates, LOCALES, LOCALE_CONFIG } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { getSiteSettings } from '@/lib/settings';
import { getManagedEditorialPosts } from '@/lib/blog-editorial-mapper';
import { EditorialBlogExperience } from '@/components/blog/EditorialBlogExperience';
import { Sparkles } from 'lucide-react';

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
  const settings = await getSiteSettings();
  const blogPosts = await getManagedEditorialPosts(locale);
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

  return (
    <div className="py-12 md:py-20 bg-bg min-h-screen text-start text-ink relative overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        {/* BREADCRUMB */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-ink-muted mb-8">
          <Link href={`/${locale}`} className="hover:text-gold-dark transition-colors">
            {dict.nav.home}
          </Link>
          <span>/</span>
          <span className="text-ink font-semibold">{locale === 'ar' ? 'المدونة' : 'Blog'}</span>
        </nav>

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-3 shadow-2xs">
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

        {/* ASYMMETRIC EDITORIAL ARTICLES GRID & INTERACTIVE MODAL */}
        <EditorialBlogExperience
          locale={locale}
          posts={blogPosts}
          whatsappNumber={settings.whatsapp_number}
        />
      </div>
    </div>
  );
}
