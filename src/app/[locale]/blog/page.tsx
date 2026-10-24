import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Locale, getLocalizedAlternates, LOCALES } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { BLOG_POSTS } from '@/data/blog-posts';
import { BookOpen, Clock, Calendar, ArrowRight, Sparkles } from 'lucide-react';

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

  const title =
    locale === 'ar'
      ? 'مدونة نقل المعتمرين وضيوف الرحمن | نصائح وإرشادات السفر'
      : 'Umrah Transport & Pilgrimage Blog | Travel Tips & Insights';

  const description =
    locale === 'ar'
      ? 'مقالات وإرشادات شاملة لضيوف الرحمن: دليلك لاختيار سيارات VIP، استقبال مطار جدة، المقارنة بين وسائل النقل، وأسرار السفر المريح بين مكة والمدينة.'
      : 'Authoritative guides and travel insights for Umrah pilgrims: VIP chauffeur transfers, Jeddah airport arrivals, and seamless journeys between Makkah and Madinah.';

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

  return (
    <div className="py-12 md:py-20 bg-bg min-h-screen text-start">
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
            <span>{locale === 'ar' ? 'مقالات وإرشادات ضيوف الرحمن' : 'Pilgrim Insights & Guides'}</span>
          </div>
          <h1 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl text-ink tracking-tight">
            {locale === 'ar' ? 'مدونة النقل الفاخر لضيوف الرحمن' : 'VIP Umrah Transport Blog'}
          </h1>
          <p className="mt-4 text-base md:text-lg text-ink-muted leading-relaxed font-light">
            {locale === 'ar'
              ? 'أدلة موثوقة ومفصلة ترشدك في كل خطوة من وصولك مطار جدة وحتى أداء مناسكك براحة وطمأنينة.'
              : 'Expert travel guides, vehicle selection benchmarks, and essential advice for an effortless pilgrimage.'}
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
                  alt={post.imageAlt[locale] || post.imageAlt.ar}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3">
                  <span className="inline-block px-3 py-1 rounded-full bg-navy/80 backdrop-blur-md border border-white/20 text-[11px] font-bold text-gold">
                    {post.category[locale] || post.category.ar}
                  </span>
                </div>
              </Link>

              {/* Content Body */}
              <div className="p-6 flex flex-col flex-1 text-start">
                <div className="flex items-center gap-3 text-xs text-ink-muted mb-3">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gold-dark" />
                    {post.readTime[locale] || post.readTime.ar}
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-gold-dark" />
                    {locale === 'ar' ? 'أكتوبر 2026' : 'October 2026'}
                  </span>
                </div>

                <h2 className="font-display font-bold text-lg md:text-xl text-ink leading-snug group-hover:text-gold-dark transition-colors mb-3">
                  <Link href={`/${locale}/blog/${post.slug}`}>
                    {post.title[locale] || post.title.ar}
                  </Link>
                </h2>

                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-light mb-6 flex-1 line-clamp-3">
                  {post.excerpt[locale] || post.excerpt.ar}
                </p>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-gold-dark hover:text-ink transition-colors"
                  >
                    <span>{locale === 'ar' ? 'اقرأ الدليل كاملاً' : 'Read Full Article'}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                  </Link>
                  <span className="text-[11px] text-ink-muted">
                    {post.author[locale] || post.author.ar}
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
