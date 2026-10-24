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
  const routePrices = dbRates['jeddah-airport-to-makkah'] || AUTHORITATIVE_TRANSFER_RATES['jeddah-airport-to-makkah'];

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
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border text-start">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-gold-dark block mb-1">
                {locale === 'ar' ? 'الأسعار الرسمية المعتمدة' : 'Guaranteed Fixed Rates'}
              </span>
              <h2 className="font-display font-bold text-xl md:text-2xl text-ink">
                {locale === 'ar' ? 'أسعار سيارات VIP من مطار جدة إلى مكة' : 'VIP Vehicle Rates: Jeddah Airport to Makkah'}
              </h2>
              <p className="text-xs text-ink-muted mt-1 font-light">
                {locale === 'ar'
                  ? 'السعر ثابت للمركبة بالكامل شامل السائق الخاص والوقود ورسوم طريق الحرمين والضرائب'
                  : 'Fixed rate per entire vehicle including private chauffeur, fuel, road tolls, and taxes'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/${locale}/booking?route=jeddah-airport-to-makkah`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold hover:bg-gold-dark text-ink font-bold text-sm shadow-xs transition-colors"
              >
                <span>{locale === 'ar' ? 'احجز سيارة من مطار جدة إلى مكة' : 'Book Jeddah to Makkah Car'}</span>
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
                href={`/${locale}/booking?route=jeddah-airport-to-makkah`}
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
