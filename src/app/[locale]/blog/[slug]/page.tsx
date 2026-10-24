import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Locale, getLocalizedAlternates, LOCALES, LOCALE_CONFIG } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { BLOG_POSTS } from '@/data/blog-posts';
import { getBlogArticleContent } from '@/data/blog-content';
import { AUTHORITATIVE_TRANSFER_RATES } from '@/lib/pricing-constants';
import { getDbPricesCached } from '@/lib/pricing-db';
import {
  Clock,
  Calendar,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  HelpCircle,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';

interface BlogPostPageProps {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const params: { locale: Locale; slug: string }[] = [];
  for (const locale of LOCALES) {
    for (const post of BLOG_POSTS) {
      params.push({ locale, slug: post.slug });
    }
  }
  return params;
}

export async function generateMetadata(props: BlogPostPageProps): Promise<Metadata> {
  const params = await props.params;
  const { locale, slug } = params;

  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) {
    return { title: 'Article Not Found' };
  }

  const title = post.seoTitle[locale] || post.seoTitle.en;
  const description = post.metaDescription[locale] || post.metaDescription.en;
  const alternates = getLocalizedAlternates(locale, `/blog/${slug}`);

  return {
    title: `${title} | Duyuf Alrahman VIP`,
    description,
    keywords: post.supportingKeywords[locale] || post.supportingKeywords.en,
    alternates,
    openGraph: {
      title,
      description,
      type: 'article',
      url: alternates.canonical,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: ['Duyuf Alrahman VIP Editorial Team'],
      images: [
        {
          url: post.featuredImage,
          width: 1024,
          height: 571,
          alt: post.imageAlt[locale] || post.imageAlt.en,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [post.featuredImage],
    },
  };
}

export default async function BlogPostDetailPage(props: BlogPostPageProps) {
  const params = await props.params;
  const { locale, slug } = params;

  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) {
    notFound();
  }

  const dict = getDictionary(locale);
  const localeMeta = LOCALE_CONFIG[locale] || LOCALE_CONFIG.en;
  const isRtl = localeMeta.dir === 'rtl';

  const dbRates = await getDbPricesCached();
  const isMadinahRoute = slug.includes('makkah-to-madinah');
  const isMakkahToJeddah = slug.includes('makkah-to-jeddah');
  const routeKey = isMadinahRoute
    ? 'makkah-to-madinah'
    : isMakkahToJeddah
    ? 'makkah-to-jeddah-airport'
    : 'jeddah-airport-to-makkah';
  const routePrices = dbRates[routeKey] || AUTHORITATIVE_TRANSFER_RATES[routeKey];

  const pricingCardContent: Record<
    string,
    {
      badge: Record<Locale, string>;
      title: Record<Locale, string>;
      desc: Record<Locale, string>;
      btn: Record<Locale, string>;
    }
  > = {
    'makkah-to-jeddah-airport': {
      badge: {
        ar: 'الأسعار الرسمية المعتمدة لرحلة العودة للمطار',
        en: 'Guaranteed Airport Return Rates',
        ms: 'Kadar Rasmi Dijamin ke Lapangan Terbang',
        id: 'Tarif Resmi Dijamin Menuju Bandara',
        ur: 'جدہ ایئرپورٹ واپسی کے سرکاری و حتمی کرایے',
        fr: 'Tarifs Officiels Garantis Vers l\'Aéroport',
        es: 'Tarifas Oficiales Garantizadas al Aeropuerto',
        de: 'Garantierte Feste Flughafentarife',
        hi: 'हवाई अड्डे के लिए आधिकारिक निर्धारित दरें',
        tr: 'Havalimanı Dönüşü Resmi Sabit Fiyatlar',
      },
      title: {
        ar: 'أسعار سيارات VIP من مكة المكرمة إلى مطار جدة',
        en: 'VIP Vehicle Rates: Makkah to Jeddah Airport',
        ms: 'Kadar Kenderaan VIP: Makkah ke Lapangan Terbang Jeddah',
        id: 'Tarif Kendaraan VIP: Makkah ke Bandara Jeddah',
        ur: 'مکہ مکرمہ سے جدہ ایئرپورٹ وی آئی پی گاڑیوں کے کرایے',
        fr: 'Tarifs Véhicules VIP : La Mecque vers Aéroport de Djeddah',
        es: 'Tarifas Véhicules VIP: La Meca al Aeropuerto de Yeda',
        de: 'VIP-Fahrzeugpreise: Mekka zum Flughafen Dschidda',
        hi: 'वीआईपी वाहन दरें: मक्का से जेद्दा हवाई अड्डा',
        tr: 'VIP Araç Fiyatları: Mekke\'den Cidde Havalimanı\'na',
      },
      desc: {
        ar: 'السعر ثابت للمركبة بالكامل شامل السائق الخاص والوقود ورسوم طريق الحرمين والضرائب. لا دفع مسبق - الدفع للسائق عند الوصول',
        en: 'Fixed rate per entire vehicle including private chauffeur, fuel, road tolls, and taxes. Zero prepayment — pay driver upon arrival.',
        ms: 'Harga tetap bagi sebuah kenderaan termasuk pemandu peribadi, minyak, tol, dan cukai. Tiada bayaran pendahuluan — bayar pemandu semasa tiba.',
        id: 'Harga tetap per kendaraan termasuk sopir pribadi, bensin, tol, dan pajak. Tanpa uang muka — bayar sopir saat tiba.',
        ur: 'گاڑی کا حتمی طے شدہ کرایہ، بمعہ ڈرائیور، ایندھن، ٹول اور ٹیکس۔ کوئی ایڈوانس نہیں — ادائیگی منزل پر ڈرائیور کو۔',
        fr: 'Tarif fixe par véhicule complet incluant chauffeur privé, carburant, péages et taxes. Aucun prépaiement — règlement au chauffeur à l\'arrivée.',
        es: 'Precio fijo por vehículo completo que incluye chofer privado, combustible, peajes e impuestos. Sin pago por adelantado: pague al chofer al llegar.',
        de: 'Festpreis pro Fahrzeug inklusive privatem Chauffeur, Kraftstoff, Maut und Steuern. Keine Vorauszahlung — Bezahlung beim Fahrer bei Ankunft.',
        hi: 'निजी ड्राइवर, ईंधन, टोल और करों सहित पूरे वाहन के लिए निश्चित दर। कोई अग्रिम भुगतान नहीं — आगमन पर ड्राइवर को भुगतान करें।',
        tr: 'Özel şoför, yakıt, otoyol geçişleri ve vergiler dahil sabit fiyat. Ön ödeme yok — varışta şoföre ödeme.',
      },
      btn: {
        ar: 'احجز سيارة من مكة إلى مطار جدة',
        en: 'Book Makkah to Jeddah Airport Car',
        ms: 'Tempah Kenderaan Makkah ke Lapangan Terbang Jeddah',
        id: 'Pesan Mobil Makkah ke Bandara Jeddah',
        ur: 'مکہ سے جدہ ایئرپورٹ کار بک کریں',
        fr: 'Réserver voiture La Mecque vers Aéroport Djeddah',
        es: 'Reservar coche de La Meca al Aeropuerto de Yeda',
        de: 'Auto von Mekka zum Flughafen Dschidda buchen',
        hi: 'मक्का से जेद्दा हवाई अड्डे के लिए कार बुक करें',
        tr: 'Mekke\'den Cidde Havalimanı\'na Araç Rezervasyonu Yap',
      },
    },
    'makkah-to-madinah': {
      badge: {
        ar: 'الأسعار الرسمية المعتمدة لنقل الحرمين',
        en: 'Guaranteed Fixed Intercity Rates',
        ms: 'Kadar Rasmi Dijamin Antara Dua Tanah Haram',
        id: 'Tarif Resmi Dijamin Antar Dua Kota Suci',
        ur: 'حرمین شریفین کے مابین سرکاری و حتمی کرایے',
        fr: 'Tarifs Officiels Garantis Intervilles',
        es: 'Tarifas Oficiales Garantizadas Entre Ciudades',
        de: 'Garantierte Feste Überlandpreise',
        hi: 'दो पवित्र शहरों के बीच आधिकारिक निर्धारित दरें',
        tr: 'İki Harem Arası Resmi Garantili Sabit Fiyatlar',
      },
      title: {
        ar: 'أسعار سيارات VIP من مكة المكرمة إلى المدينة المنورة',
        en: 'VIP Vehicle Rates: Makkah to Madinah Private Transfer',
        ms: 'Kadar Kenderaan VIP: Pemindahan Peribadi Makkah ke Madinah',
        id: 'Tarif Kendaraan VIP: Antar Jemput Pribadi Makkah ke Madinah',
        ur: 'مکہ مکرمہ سے مدینہ منورہ وی آئی پی گاڑیوں کے کرایے',
        fr: 'Tarifs Véhicules VIP : Transfert Privé La Mecque vers Médine',
        es: 'Tarifas Vehículos VIP: Traslado Privado de La Meca a Medina',
        de: 'VIP-Fahrzeugpreise: Privater Transfer von Mekka nach Medina',
        hi: 'वीआईपी वाहन दरें: मक्का से मदीना निजी स्थानांतरण',
        tr: 'VIP Araç Fiyatları: Mekke\'den Medine\'ye Özel Transfer',
      },
      desc: {
        ar: 'السعر ثابت للمركبة بالكامل شامل السائق الخاص والوقود ورسوم طريق الهجرة السريع والضرائب. لا دفع مسبق - الدفع للسائق عند الوصول',
        en: 'Fixed rate per entire vehicle including private chauffeur, fuel, expressway tolls, and taxes. Zero prepayment — pay driver upon arrival.',
        ms: 'Harga tetap bagi sebuah kenderaan termasuk pemandu peribadi, minyak, tol, dan cukai. Tiada bayaran pendahuluan — bayar pemandu semasa tiba.',
        id: 'Harga tetap per kendaraan termasuk sopir pribadi, bensin, tol, dan pajak. Tanpa uang muka — bayar sopir saat tiba.',
        ur: 'گاڑی کا حتمی طے شدہ کرایہ، بمعہ ڈرائیور، ایندھن، ٹول اور ٹیکس۔ کوئی ایڈوانس نہیں — ادائیگی منزل پر ڈرائیور کو۔',
        fr: 'Tarif fixe par véhicule complet incluant chauffeur privé, carburant, péages et taxes. Aucun prépaiement — règlement au chauffeur à l\'arrivée.',
        es: 'Precio fijo por vehículo completo que incluye chofer privado, combustible, peajes e impuestos. Sin pago por adelantado: pague al chofer al llegar.',
        de: 'Festpreis pro Fahrzeug inklusive privatem Chauffeur, Kraftstoff, Maut und Steuern. Keine Vorauszahlung — Bezahlung beim Fahrer bei Ankunft.',
        hi: 'निजी ड्राइवर, ईंधन, टोल और करों सहित पूरे वाहन के लिए निश्चित दर। कोई अग्रिम भुगतान नहीं — आगमन पर ड्राइवर को भुगतान करें।',
        tr: 'Özel şoför, yakıt, otoyol geçişleri ve vergiler dahil sabit fiyat. Ön ödeme yok — varışta şoföre ödeme.',
      },
      btn: {
        ar: 'احجز سيارة خاصة من مكة إلى المدينة',
        en: 'Book Makkah to Madinah Transfer',
        ms: 'Tempah Kenderaan Makkah ke Madinah',
        id: 'Pesan Antar Jemput Makkah ke Madinah',
        ur: 'مکہ سے مدینہ پرائیویٹ کار بک کریں',
        fr: 'Réserver le transfert La Mecque - Médine',
        es: 'Reservar traslado de La Meca a Medina',
        de: 'Transfer Mekka nach Medina buchen',
        hi: 'मक्का से मदीना स्थानांतरण बुक करें',
        tr: 'Mekke - Medine Transferi Rezervasyonu Yap',
      },
    },
    'jeddah-airport-to-makkah': {
      badge: {
        ar: 'الأسعار الرسمية المعتمدة',
        en: 'Guaranteed Fixed Rates',
        ms: 'Kadar Rasmi Dijamin',
        id: 'Tarif Resmi Dijamin',
        ur: 'سرکاری و حتمی منظور شدہ کرایے',
        fr: 'Tarifs Officiels Garantis',
        es: 'Tarifas Oficiales Garantizadas',
        de: 'Garantierte Feste Tarife',
        hi: 'गारंटीकृत निश्चित दरें',
        tr: 'Garantili Sabit Fiyatlar',
      },
      title: {
        ar: 'أسعار سيارات VIP من مطار جدة إلى مكة',
        en: 'VIP Vehicle Rates: Jeddah Airport to Makkah',
        ms: 'Kadar Kenderaan VIP: Lapangan Terbang Jeddah ke Makkah',
        id: 'Tarif Kendaraan VIP: Bandara Jeddah ke Makkah',
        ur: 'جدہ ایئرپورٹ سے مکہ مکرمہ وی آئی پی گاڑیوں کے کرایے',
        fr: 'Tarifs Véhicules VIP : Aéroport de Djeddah vers La Mecque',
        es: 'Tarifas Vehículos VIP: Aeropuerto de Yeda a La Meca',
        de: 'VIP-Fahrzeugpreise: Flughafen Dschidda nach Mekka',
        hi: 'वीआईपी वाहन दरें: जेद्दा हवाई अड्डा से मक्का',
        tr: 'VIP Araç Fiyatları: Cidde Havalimanı - Mekke',
      },
      desc: {
        ar: 'السعر ثابت للمركبة بالكامل شامل السائق الخاص والوقود ورسوم طريق الحرمين والضرائب. لا دفع مسبق - الدفع للسائق عند الوصول',
        en: 'Fixed rate per entire vehicle including private chauffeur, fuel, road tolls, and taxes. Zero prepayment — pay driver upon arrival.',
        ms: 'Harga tetap bagi sebuah kenderaan termasuk pemandu peribadi, minyak, tol, dan cukai. Tiada bayaran pendahuluan — bayar pemandu semasa tiba.',
        id: 'Harga tetap per kendaraan termasuk sopir pribadi, bensin, tol, dan pajak. Tanpa uang muka — bayar sopir saat tiba.',
        ur: 'گاڑی کا حتمی طے شدہ کرایہ، بمعہ ڈرائیور، ایندھن، ٹول اور ٹیکس۔ کوئی ایڈوانس نہیں — ادائیگی منزل پر ڈرائیور کو۔',
        fr: 'Tarif fixe par véhicule complet incluant chauffeur privé, carburant, péages et taxes. Aucun prépaiement — règlement au chauffeur à l\'arrivée.',
        es: 'Precio fijo por vehículo completo que incluye chofer privado, combustible, peajes e impuestos. Sin pago por adelantado: pague al chofer al llegar.',
        de: 'Festpreis pro Fahrzeug inklusive privatem Chauffeur, Kraftstoff, Maut und Steuern. Keine Vorauszahlung — Bezahlung beim Fahrer bei Ankunft.',
        hi: 'निजी ड्राइवर, ईंधन, टोल और करों सहित पूरे वाहन के लिए निश्चित दर। कोई अग्रिम भुगतान नहीं — आगमन पर ड्राइवर को भुगतान करें।',
        tr: 'Özel şoför, yakıt, otoyol geçişleri ve vergiler dahil sabit fiyat. Ön ödeme yok — varışta şoföre ödeme.',
      },
      btn: {
        ar: 'احجز سيارة من مطار جدة إلى مكة',
        en: 'Book Jeddah to Makkah Car',
        ms: 'Tempah Kenderaan Lapangan Terbang Jeddah ke Makkah',
        id: 'Pesan Mobil Bandara Jeddah ke Makkah',
        ur: 'جدہ ایئرپورٹ سے مکہ مکرمہ کار بک کریں',
        fr: 'Réserver voiture Aéroport Djeddah vers La Mecque',
        es: 'Reservar coche del Aeropuerto de Yeda a La Meca',
        de: 'Auto vom Flughafen Dschidda nach Mekka buchen',
        hi: 'जेद्दा हवाई अड्डे से मक्का के लिए कार बुक करें',
        tr: 'Cidde Havalimanı\'ndan Mekke\'ye Araç Rezervasyonu Yap',
      },
    },
  };

  const activePricingMeta = pricingCardContent[routeKey] || pricingCardContent['jeddah-airport-to-makkah'];

  const content = getBlogArticleContent(slug, locale);

  const mainWa = '966567588261';
  const greeting = encodeURIComponent(
    localeMeta.whatsappGreeting + ` ${post.title[locale] || post.title.en}`
  );
  const waUrl = `https://wa.me/${mainWa}?text=${greeting}`;

  // Structured Data JSON-LD
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://duyufalrahmanvip.com/${locale}/blog/${slug}`,
    },
    headline: post.title[locale] || post.title.en,
    description: post.metaDescription[locale] || post.metaDescription.en,
    image: [`https://duyufalrahmanvip.com${post.featuredImage}`],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Organization',
      name: post.author[locale] || post.author.en,
      url: 'https://duyufalrahmanvip.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Duyuf Alrahman VIP',
      logo: {
        '@type': 'ImageObject',
        url: 'https://duyufalrahmanvip.com/icon-192.png',
      },
    },
    inLanguage: locale,
    keywords: (post.supportingKeywords[locale] || []).join(', '),
  };

  const breadcrumbsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: dict.nav.home,
        item: `https://duyufalrahmanvip.com/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: locale === 'ar' ? 'المدونة' : 'Blog',
        item: `https://duyufalrahmanvip.com/${locale}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title[locale] || post.title.en,
        item: `https://duyufalrahmanvip.com/${locale}/blog/${slug}`,
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question[locale] || faq.question.en,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer[locale] || faq.answer.en,
      },
    })),
  };

  return (
    <div className="py-12 md:py-20 bg-bg min-h-screen" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Schema Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="container mx-auto px-4 max-w-4xl">
        {/* BREADCRUMB */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-ink-muted mb-8 overflow-x-auto text-start"
        >
          <Link href={`/${locale}`} className="hover:text-gold-dark transition-colors">
            {dict.nav.home}
          </Link>
          <span>/</span>
          <Link href={`/${locale}/blog`} className="hover:text-gold-dark transition-colors">
            {locale === 'ar' ? 'المدونة' : 'Blog'}
          </Link>
          <span>/</span>
          <span className="text-ink font-medium truncate max-w-xs md:max-w-md">
            {post.category[locale] || post.category.en}
          </span>
        </nav>

        {/* ARTICLE HEADER */}
        <header className="mb-10 text-start">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              {post.category[locale] || post.category.en}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-ink-muted">
              <Clock className="w-3.5 h-3.5 text-gold-dark" />
              {post.readTime[locale] || post.readTime.en}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-ink-muted">
              <Calendar className="w-3.5 h-3.5 text-gold-dark" />
              {locale === 'ar' ? '24 أكتوبر 2026' : 'October 24, 2026'}
            </span>
          </div>

          <h1 className="font-display font-semibold text-2xl sm:text-3xl md:text-5xl text-ink tracking-tight leading-tight">
            {post.title[locale] || post.title.en}
          </h1>

          <p className="mt-4 text-base md:text-lg text-ink-muted font-light leading-relaxed">
            {post.metaDescription[locale] || post.metaDescription.en}
          </p>

          {/* FEATURED IMAGE */}
          <div className="relative w-full aspect-[1024/571] my-8 rounded-2xl overflow-hidden border border-border shadow-md bg-slate-900">
            <Image
              src={post.featuredImage}
              alt={post.imageAlt[locale] || post.imageAlt.en}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>
          <p className="text-xs text-center text-ink-muted italic -mt-5 mb-8">
            {post.imageAlt[locale] || post.imageAlt.en}
          </p>

          {/* KEYWORDS PILL BADGES */}
          <div className="flex flex-wrap items-center gap-2 p-3.5 bg-surface rounded-xl border border-border text-xs mb-8">
            <span className="font-bold text-ink">
              {locale === 'ar' ? 'الكلمات المفتاحية:' : 'Topics:'}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-gold-soft text-gold-dark font-semibold">
              {post.primaryKeyword[locale] || post.primaryKeyword.en}
            </span>
            {(post.supportingKeywords[locale] || []).slice(0, 4).map((kw, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded-md bg-bg text-ink-muted">
                {kw}
              </span>
            ))}
          </div>
        </header>

        {/* AUTHORITATIVE LIVE PRICING CARD & CTA */}
        <section className="bg-surface rounded-2xl p-6 md:p-8 border-2 border-gold-line shadow-xs mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-border border-b text-start">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-gold-dark block mb-1">
                {activePricingMeta.badge[locale] || activePricingMeta.badge.en}
              </span>
              <h2 className="font-display font-bold text-xl md:text-2xl text-ink">
                {activePricingMeta.title[locale] || activePricingMeta.title.en}
              </h2>
              <p className="text-xs text-ink-muted mt-1 font-light">
                {activePricingMeta.desc[locale] || activePricingMeta.desc.en}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/${locale}/booking?route=${routeKey}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold hover:bg-gold-dark text-ink font-bold text-sm shadow-xs transition-colors"
              >
                <span>{activePricingMeta.btn[locale] || activePricingMeta.btn.en}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{locale === 'ar' ? 'تأكيد عبر واتساب' : 'WhatsApp'}</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
            <div className="p-4 rounded-xl bg-bg border border-border text-center">
              <span className="text-xs font-semibold text-ink-muted block">
                {locale === 'ar' ? 'تويوتا كامري' : 'Camry Sedan'}
              </span>
              <span className="text-xs text-ink-muted block mb-1">
                {locale === 'ar' ? 'حتى 3 ركاب' : 'Up to 3 pax'}
              </span>
              <span className="text-xl font-bold text-ink">
                {routePrices.camry} <span className="text-xs font-normal text-gold-dark">SAR</span>
              </span>
            </div>

            <div className="p-4 rounded-xl bg-gold-soft/40 border-2 border-gold-line text-center relative">
              <span className="absolute -top-2.5 right-2 rtl:right-auto rtl:left-2 text-[9px] uppercase font-bold px-2 py-0.5 rounded-full bg-gold text-ink">
                VIP
              </span>
              <span className="text-xs font-semibold text-ink block">
                {locale === 'ar' ? 'هيونداي ستاريا VIP' : 'Staria VIP'}
              </span>
              <span className="text-xs text-ink-muted block mb-1">
                {locale === 'ar' ? 'حتى 7 ركاب' : 'Up to 7 pax'}
              </span>
              <span className="text-xl font-bold text-gold-dark">
                {routePrices.staria} <span className="text-xs font-normal text-gold-dark">SAR</span>
              </span>
            </div>

            <div className="p-4 rounded-xl bg-bg border border-border text-center">
              <span className="text-xs font-semibold text-ink-muted block">
                {locale === 'ar' ? 'جي إم سي يوكون XL' : 'Yukon XL VIP'}
              </span>
              <span className="text-xs text-ink-muted block mb-1">
                {locale === 'ar' ? 'حتى 7 ركاب VIP' : 'Up to 7 VIP'}
              </span>
              <span className="text-xl font-bold text-ink">
                {routePrices.yukon} <span className="text-xs font-normal text-gold-dark">SAR</span>
              </span>
            </div>

            <div className="p-4 rounded-xl bg-bg border border-border text-center">
              <span className="text-xs font-semibold text-ink-muted block">
                {locale === 'ar' ? 'تويوتا هايس' : 'HiAce Minibus'}
              </span>
              <span className="text-xs text-ink-muted block mb-1">
                {locale === 'ar' ? 'حتى 10 ركاب' : 'Up to 10 pax'}
              </span>
              <span className="text-xl font-bold text-ink">
                {routePrices.hiace} <span className="text-xs font-normal text-gold-dark">SAR</span>
              </span>
            </div>
          </div>
        </section>

        {/* FULL LOCALIZED ARTICLE BODY */}
        <article className="prose prose-lg max-w-none text-ink leading-relaxed space-y-10 text-start">
          {/* INTRODUCTION */}
          <div className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-xs">
            <h2 className="font-display font-bold text-xl md:text-2xl text-ink mb-4">
              {content.intro.title}
            </h2>
            {content.intro.paragraphs.map((p, idx) => (
              <p key={idx} className="text-ink-muted text-base md:text-lg leading-relaxed font-light mb-4 last:mb-0">
                {p}
              </p>
            ))}
          </div>

          {/* DYNAMIC SECTIONS */}
          {content.sections.map((section, sIdx) => (
            <div key={sIdx} className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-xs">
              <h2 className="font-display font-bold text-xl md:text-2xl text-ink mb-4">
                {section.title}
              </h2>

              {section.lead && (
                <p className="text-ink-muted text-base leading-relaxed font-light mb-6">
                  {section.lead}
                </p>
              )}

              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-ink-muted text-base leading-relaxed font-light mb-4">
                  {p}
                </p>
              ))}

              {/* CALLOUT (IF PRESENT) */}
              {section.callout && (
                <div
                  className={`p-4 rounded-xl border mb-6 flex items-start gap-3 ${
                    section.callout.type === 'warning'
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200'
                      : 'bg-gold-soft border-gold-line text-ink'
                  }`}
                >
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold mb-1">{section.callout.title}</strong>
                    <p className="text-xs sm:text-sm leading-relaxed">{section.callout.text}</p>
                  </div>
                </div>
              )}

              {/* SUBSECTIONS (WITH CHECK ICONS) */}
              {section.subsections && (
                <div className="space-y-6">
                  {section.subsections.map((sub, subIdx) => (
                    <div key={subIdx}>
                      <h3 className="font-display font-bold text-lg text-ink mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-gold-dark shrink-0" />
                        <span>{sub.title}</span>
                      </h3>
                      <p className="text-ink-muted text-sm md:text-base leading-relaxed font-light">
                        {sub.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* BULLETS */}
              {section.bullets && (
                <div className="space-y-4 mt-4">
                  {section.bullets.map((b, bIdx) => (
                    <div key={bIdx} className="p-4 rounded-xl bg-bg border border-border">
                      <h4 className="font-display font-bold text-base text-ink mb-1">
                        {b.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-light">
                        {b.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* FAQS SECTION */}
          <section className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-xs">
            <h2 className="font-display font-bold text-xl md:text-2xl text-ink mb-2 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-gold-dark" />
              <span>{content.faqTitle}</span>
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted mb-6 font-light">
              {content.faqSubtitle}
            </p>

            <div className="space-y-4">
              {post.faqs.map((faq, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-bg border border-border text-start">
                  <h3 className="font-display font-bold text-base md:text-lg text-ink mb-2">
                    {faq.question[locale] || faq.question.en}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-light">
                    {faq.answer[locale] || faq.answer.en}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* FINAL CTA CONCLUSION */}
          <section className="p-8 md:p-10 bg-charcoal text-cream rounded-2xl border border-gold-dark/40 shadow-lg text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-60 h-60 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-3 text-gold">
              {content.cta.title}
            </h2>
            <p className="text-sm md:text-base text-cream/90 max-w-2xl mx-auto mb-6 font-light leading-relaxed">
              {content.cta.subtitle}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
              {content.cta.badges.map((b, bIdx) => (
                <span
                  key={bIdx}
                  className="px-3 py-1 rounded-full bg-white/10 text-xs text-cream border border-white/15"
                >
                  {b}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href={`/${locale}/booking?route=${routeKey}`}
                className="px-8 py-3.5 rounded-full bg-gold hover:bg-gold-dark text-ink font-bold text-sm md:text-base shadow-md transition-all hover:scale-105"
              >
                <span>{content.cta.primaryBtn}</span>
              </Link>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm md:text-base shadow-md transition-all hover:scale-105 inline-flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{content.cta.secondaryBtn}</span>
              </a>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
