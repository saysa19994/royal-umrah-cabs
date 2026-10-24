import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Locale, getLocalizedAlternates, LOCALES } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { BLOG_POSTS } from '@/data/blog-posts';
import { AUTHORITATIVE_TRANSFER_RATES } from '@/lib/pricing-constants';
import { getDbPricesCached } from '@/lib/pricing-db';
import {
  Clock,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  HelpCircle,
  Car,
  ChevronRight,
  Plane,
  AlertTriangle,
  MapPin,
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

  const title = post.seoTitle[locale] || post.seoTitle.ar;
  const description = post.metaDescription[locale] || post.metaDescription.ar;
  const alternates = getLocalizedAlternates(locale, `/blog/${slug}`);

  return {
    title: `${title} | Duyuf Alrahman VIP`,
    description,
    keywords: post.supportingKeywords,
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
          alt: post.imageAlt[locale] || post.imageAlt.ar,
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
  const dbRates = await getDbPricesCached();
  const routePrices = dbRates['jeddah-airport-to-makkah'] || AUTHORITATIVE_TRANSFER_RATES['jeddah-airport-to-makkah'];

  const canonicalUrl = `https://duyufalrahmanvip.com/${locale}/blog/${slug}`;

  // Breadcrumbs JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: dict.nav.home || 'Home',
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
        name: post.title[locale] || post.title.ar,
        item: canonicalUrl,
      },
    ],
  };

  // BlogPosting Schema JSON-LD
  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.seoTitle[locale] || post.seoTitle.ar,
    description: post.metaDescription[locale] || post.metaDescription.ar,
    image: `https://duyufalrahmanvip.com${post.featuredImage}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    author: {
      '@type': 'Organization',
      name: 'Duyuf Alrahman VIP',
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
    keywords: [post.primaryKeyword, ...post.supportingKeywords].join(', '),
  };

  // FAQ Schema JSON-LD
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question[locale] || faq.question.ar,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer[locale] || faq.answer.ar,
      },
    })),
  };

  const waNumber = '966567588261';
  const waText = encodeURIComponent(
    locale === 'ar'
      ? `السلام عليكم، قرأت مقال (${post.title.ar}) وأرغب في حجز سيارة VIP من مطار جدة إلى مكة المكرمة.`
      : `Salam, I read your article "${post.title.en}" and would like to inquire about booking a VIP vehicle from Jeddah Airport to Makkah.`
  );
  const waUrl = `https://wa.me/${waNumber}?text=${waText}`;

  return (
    <div className="py-12 md:py-20 bg-bg min-h-screen text-start">
      {/* STRUCTURED DATA SCHEMAS */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="container mx-auto px-4 max-w-4xl">
        {/* BREADCRUMB NAVIGATION */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-ink-muted mb-8">
          <Link href={`/${locale}`} className="hover:text-gold-dark transition-colors">
            {dict.nav.home}
          </Link>
          <span>/</span>
          <Link href={`/${locale}/blog`} className="hover:text-gold-dark transition-colors">
            {locale === 'ar' ? 'المدونة' : 'Blog'}
          </Link>
          <span>/</span>
          <span className="text-ink font-medium truncate max-w-xs md:max-w-md">
            {post.category[locale] || post.category.ar}
          </span>
        </nav>

        {/* ARTICLE HEADER */}
        <header className="mb-10 text-start">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              {post.category[locale] || post.category.ar}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-ink-muted">
              <Clock className="w-3.5 h-3.5 text-gold-dark" />
              {post.readTime[locale] || post.readTime.ar}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-ink-muted">
              <Calendar className="w-3.5 h-3.5 text-gold-dark" />
              {locale === 'ar' ? '24 أكتوبر 2026' : 'October 24, 2026'}
            </span>
          </div>

          <h1 className="font-display font-semibold text-2xl sm:text-3xl md:text-5xl text-ink tracking-tight leading-tight">
            {post.title[locale] || post.title.ar}
          </h1>

          <p className="mt-4 text-base md:text-lg text-ink-muted font-light leading-relaxed">
            {post.metaDescription[locale] || post.metaDescription.ar}
          </p>

          {/* FEATURED IMAGE (PROMINENTLY DISPLAYED BELOW TITLE) */}
          <div className="relative w-full aspect-[1024/571] my-8 rounded-2xl overflow-hidden border border-border shadow-md bg-slate-900">
            <Image
              src={post.featuredImage}
              alt={post.imageAlt[locale] || post.imageAlt.ar}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>
          <p className="text-xs text-center text-ink-muted italic -mt-5 mb-8">
            {post.imageAlt[locale] || post.imageAlt.ar}
          </p>

          {/* KEYWORDS PILL BADGES */}
          <div className="flex flex-wrap items-center gap-2 p-3.5 bg-surface rounded-xl border border-border text-xs mb-8">
            <span className="font-bold text-ink">
              {locale === 'ar' ? 'الكلمات المفتاحية:' : 'Topics:'}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-gold-soft text-gold-dark font-semibold">
              {post.primaryKeyword}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-bg text-ink-muted">
              نقل من مطار جدة إلى مكة
            </span>
            <span className="px-2.5 py-1 rounded-md bg-bg text-ink-muted">
              سيارة VIP إلى مكة
            </span>
            <span className="px-2.5 py-1 rounded-md bg-bg text-ink-muted">
              سائق خاص في مكة
            </span>
          </div>
        </header>

        {/* AUTHORITATIVE LIVE PRICING CARD & CTA */}
        <section className="bg-surface rounded-2xl p-6 md:p-8 border-2 border-gold-line shadow-xs mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border">
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
                  : 'Fixed rate per entire vehicle including chauffeur, fuel, road tolls, and taxes'}
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
                {locale === 'ar' ? 'تويوتا هايس' : 'HiAce Van'}
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

        {/* ARTICLE FULL BODY CONTENT (OVER 1,300 ARABIC WORDS) */}
        <article className="prose prose-lg max-w-none text-ink leading-relaxed space-y-10 text-start">
          {/* INTRODUCTION */}
          <div className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-xs">
            <h2 className="font-display font-bold text-xl md:text-2xl text-ink mb-4">
              مقدمة: ابدأ رحلتك إلى مكة براحة وطمأنينة
            </h2>
            <p className="text-ink-muted text-base md:text-lg leading-relaxed font-light mb-4">
              تبدأ رحلة العمرة بلحظات مليئة بالشوق والترقب، فالوصول إلى المملكة العربية السعودية يمثل بداية تجربة روحانية ينتظرها الكثيرون طويلًا. وبعد الهبوط في مطار الملك عبدالعزيز الدولي بجدة (KAIA)، يأتي السؤال المهم: كيف تصل إلى مكة المكرمة براحة وأمان، خاصة إذا كنت تسافر مع عائلتك أو كبار السن أو تحمل أمتعة كثيرة؟
            </p>
            <p className="text-ink-muted text-base md:text-lg leading-relaxed font-light mb-4">
              هنا تأتي أهمية اختيار خدمة <strong className="text-gold-dark font-semibold">نقل VIP لضيوف الرحمن</strong>، التي تساعدك على ترتيب انتقالك من المطار إلى مكة المكرمة أو إلى وجهتك التالية بطريقة أكثر تنظيمًا وراحة. فبدلًا من الانشغال بالبحث عن وسيلة نقل مناسبة بعد الوصول، يمكنك التخطيط لرحلتك مسبقًا واختيار السيارة التي تناسب عدد المسافرين واحتياجاتهم من خلال{' '}
              <Link href={`/${locale}/booking`} className="text-gold-dark font-semibold hover:underline">
                حجز سيارة من مطار جدة إلى مكة
              </Link>.
            </p>
            <p className="text-ink-muted text-base md:text-lg leading-relaxed font-light">
              في هذا الدليل، سنتعرف على أهم معايير اختيار سيارة خاصة مع سائق، وكيفية ترتيب الاستقبال من المطار، وما الذي ينبغي التأكد منه قبل الحجز، حتى تكون تجربة انتقالك جزءًا مريحًا من رحلتك إلى الأراضي المقدسة.
            </p>
          </div>

          {/* SECTION 1 */}
          <div className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-xs">
            <h2 className="font-display font-bold text-xl md:text-2xl text-ink mb-6">
              لماذا تختار النقل الخاص من مطار جدة إلى مكة؟
            </h2>
            <p className="text-ink-muted text-base leading-relaxed font-light mb-6">
              يصل المسافرون إلى مطار جدة في أوقات مختلفة، وقد يكون بعضهم قادمًا بعد رحلة جوية طويلة أو برفقة أطفال وكبار سن. لذلك، فإن تنظيم وسيلة النقل مسبقًا يمكن أن يوفر قدرًا مهمًا من الراحة والوضوح.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="font-display font-bold text-lg text-ink mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-gold-dark shrink-0" />
                  <span>1. استقبال أكثر تنظيمًا في المطار</span>
                </h3>
                <p className="text-ink-muted text-sm md:text-base leading-relaxed font-light">
                  من أهم مزايا حجز سيارة مسبقًا أنك تستطيع الاتفاق على تفاصيل الاستقبال قبل موعد الوصول. ويشمل ذلك مشاركة بيانات الرحلة، وتحديد عدد الركاب والحقائب، وتأكيد مكان الالتقاء وطريقة التواصل مع السائق. وعند الحجز، احرص على التأكد من تفاصيل خدمة الاستقبال المتاحة، وما إذا كانت تتضمن مقابلة المسافر داخل صالة الوصول أم الالتقاء في نقطة محددة خارجها. فهذه التفاصيل قد تختلف حسب نوع الخدمة والاتفاق المسبق. يساعدك التخطيط على تجنب الارتباك، خاصة إذا كنت تزور المملكة للمرة الأولى أو لا تعرف مداخل المطار ومناطق الالتقاء.
                </p>
              </div>

              <div>
                <h3 className="font-display font-bold text-lg text-ink mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-gold-dark shrink-0" />
                  <span>2. الخصوصية والراحة أثناء الرحلة</span>
                </h3>
                <p className="text-ink-muted text-sm md:text-base leading-relaxed font-light">
                  توفر السيارة الخاصة مساحة أكثر خصوصية مقارنة بوسائل النقل المشتركة. ويمكن أن يكون ذلك مفيدًا للعائلات التي ترغب في السفر معًا، أو للمسافرين الذين يحتاجون إلى مساحة مريحة بعد رحلة طويلة. كما يتيح لك الحجز المسبق اختيار فئة السيارة المناسبة من بين خيارات{' '}
                  <Link href={`/${locale}/fleet`} className="text-gold-dark font-semibold hover:underline">
                    أسطول السيارات الفاخرة
                  </Link>، وفقًا للسيارات المتاحة واحتياجات رحلتك.
                </p>
              </div>

              <div>
                <h3 className="font-display font-bold text-lg text-ink mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-gold-dark shrink-0" />
                  <span>3. وضوح التكلفة قبل الانطلاق</span>
                </h3>
                <p className="text-ink-muted text-sm md:text-base leading-relaxed font-light">
                  يساعد الاتفاق على السعر قبل الرحلة على تخطيط ميزانيتك بصورة أفضل. لذلك، يُفضَّل اختيار خدمة توضح لك التكلفة المتفق عليها، وما إذا كانت تشمل الانتقال من المطار إلى الفندق أو أي رسوم أو خدمات إضافية. عند مقارنة أسعار النقل من مطار جدة إلى مكة، لا تعتمد على السعر وحده؛ بل قارن أيضًا فئة السيارة، وعدد الركاب، وسعة الأمتعة، وتفاصيل الاستقبال، وشروط الانتظار والإلغاء مع مراجعة{' '}
                  <Link href={`/${locale}/pricing`} className="text-gold-dark font-semibold hover:underline">
                    الأسعار الثابتة المعتمدة
                  </Link>.
                </p>
              </div>

              <div>
                <h3 className="font-display font-bold text-lg text-ink mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-gold-dark shrink-0" />
                  <span>4. خدمة تناسب العائلات وكبار السن</span>
                </h3>
                <p className="text-ink-muted text-sm md:text-base leading-relaxed font-light">
                  قد يحتاج بعض المسافرين إلى مركبة واسعة وسهلة الدخول والخروج، خاصة إذا كانوا برفقة كبار السن أو الأطفال. وقد تكون السيارة العائلية أو المركبة الأكبر خيارًا مناسبًا عند وجود عدد كبير من المسافرين أو الحقائب. من الأفضل توضيح هذه الاحتياجات عند الحجز، بدلًا من اكتشاف عدم ملاءمة السيارة بعد وصولك إلى المطار.
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 2 */}
          <div className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-xs">
            <h2 className="font-display font-bold text-xl md:text-2xl text-ink mb-4">
              كيف تختار سيارة VIP مناسبة لرحلتك إلى مكة؟
            </h2>
            <p className="text-ink-muted text-base leading-relaxed font-light mb-6">
              لا تعني خدمة النقل الفاخر بالضرورة اختيار أكبر سيارة أو أغلاها. فالخيار الأفضل هو السيارة التي تناسب احتياجات رحلتك وتوفر مستوى الراحة الذي تبحث عنه.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="font-display font-bold text-lg text-ink mb-2">
                  السيارات العائلية والمركبات الواسعة
                </h3>
                <p className="text-ink-muted text-sm md:text-base leading-relaxed font-light">
                  إذا كنت تسافر مع العائلة، فابدأ بتحديد عدد الركاب وحجم الأمتعة. فقد تكون السيارة العائلية مثل هيونداي ستاريا VIP أو جي إم سي يوكون XL مناسبة لمجموعة صغيرة إلى متوسطة، بينما تحتاج العائلة الكبيرة إلى مركبة متعددة المقاعد مثل تويوتا هايس مع مساحة إضافية للحقائب. تأكد من السؤال عن السعة الفعلية للسيارة، لأن عدد المقاعد وحده لا يكفي للحكم على ملاءمتها. فقد تتسع المركبة لعدد الركاب، لكن لا تتوفر مساحة كافية لجميع حقائبهم.
                </p>
              </div>

              <div>
                <h3 className="font-display font-bold text-lg text-ink mb-2">
                  سيارات رجال الأعمال وكبار الشخصيات
                </h3>
                <p className="text-ink-muted text-sm md:text-base leading-relaxed font-light">
                  إذا كنت تبحث عن تجربة أكثر خصوصية، فقد تناسبك إحدى السيارات التنفيذية المتاحة ضمن أسطول الخدمة. وتوفر هذه الفئة خيارًا مناسبًا للمسافرين الذين يعطون أهمية للخصوصية والراحة والمظهر الاحترافي. ومع ذلك، ينبغي مراجعة فئة السيارة المتاحة ومواصفاتها عند الحجز، وعدم الاكتفاء بوصف عام مثل «VIP» دون معرفة المركبة التي ستُخصص للرحلة.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-bg border border-border">
                <h3 className="font-display font-bold text-base md:text-lg text-ink mb-3">
                  قائمة الأسئلة السريعة لاختيار المركبة المناسبة:
                </h3>
                <ul className="space-y-2 text-sm text-ink-muted list-disc list-inside">
                  <li>كم عدد الأشخاص المسافرين معك في الرحلة؟</li>
                  <li>كم حقيبة كبيرة وصغيرة ستصطحب معك؟</li>
                  <li>هل يوجد أطفال يحتاجون إلى مقاعد أمان مخصصة؟</li>
                  <li>هل يسافر معك شخص من كبار السن يحتاج إلى مساعدة في الدخول والخروج؟</li>
                  <li>هل تحتاج إلى سيارة لرحلة مباشرة أم إلى خدمة بالساعة؟</li>
                  <li>هل لديك احتياجات خاصة للمساحة أو الخصوصية؟</li>
                </ul>
              </div>
            </div>
          </div>

          {/* SECTION 3 */}
          <div className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-xs">
            <h2 className="font-display font-bold text-xl md:text-2xl text-ink mb-4">
              حجز نقل من مطار جدة إلى مكة: ما المعلومات التي ينبغي تجهيزها؟
            </h2>
            <p className="text-ink-muted text-base leading-relaxed font-light mb-6">
              يساعد تقديم المعلومات الصحيحة عند الحجز على تقليل احتمالات سوء الفهم وتسريع ترتيب الرحلة.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="p-4 rounded-xl bg-bg border border-border">
                <h3 className="font-display font-bold text-base text-ink mb-1">
                  1. بيانات الرحلة الجوية
                </h3>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-light">
                  جهّز رقم الرحلة وموعد الوصول المتوقع، مع تحديد ما إذا كانت الرحلة دولية أم داخلية ليقوم السائق بمتابعة الرادار تلقائياً.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-bg border border-border">
                <h3 className="font-display font-bold text-base text-ink mb-1">
                  2. تحديد موقع الوصول والوجهة
                </h3>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-light">
                  وضّح صالة الوصول في مطار جدة، وحدد وجهتك في مكة المكرمة بدقة مثل اسم الفندق أو البرج السكني لتجنب الالتباس.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-bg border border-border">
                <h3 className="font-display font-bold text-base text-ink mb-1">
                  3. عدد الركاب والأمتعة
                </h3>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-light">
                  سجل عدد المسافرين بدقة وعدد الحقائب الكبيرة، مع طلب مقعد الطفل مسبقاً في حال وجود أطفال.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-bg border border-border">
                <h3 className="font-display font-bold text-base text-ink mb-1">
                  4. تأكيد السعر والخدمات المشمولة
                </h3>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-light">
                  تأكد من شمول السعر لكافة الرسوم والضرائب والوقود وسياسة الانتظار المجانية (60 دقيقة) وسياسة الإلغاء.
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 4 */}
          <div className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-xs">
            <h2 className="font-display font-bold text-xl md:text-2xl text-ink mb-4">
              النقل الفاخر بين مكة والمدينة وجدة
            </h2>
            <p className="text-ink-muted text-base leading-relaxed font-light mb-6">
              لا تقتصر احتياجات ضيوف الرحمن على الانتقال من المطار إلى الفندق فحسب، بل تمتد لتشمل التنقلات بين المدن المقدسة وفقاً لبرنامج العمرة والزيارة.
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-bg border border-border">
                <h3 className="font-display font-bold text-base text-ink mb-1">
                  من جدة إلى مكة المكرمة
                </h3>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-light">
                  يختار المسافرون حجز سيارة خاصة مباشرة عبر{' '}
                  <Link href={`/${locale}/routes/jeddah-airport-to-makkah`} className="text-gold-dark font-semibold hover:underline">
                    مسار مطار جدة إلى مكة المكرمة
                  </Link>{' '}
                  للانتقال السريع بدون توقف أو تغيير مركبات، مع مراعاة أوقات الذروة المرورية.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-bg border border-border">
                <h3 className="font-display font-bold text-base text-ink mb-1">
                  من مكة المكرمة إلى المدينة المنورة
                </h3>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-light">
                  عند التخطيط للتنقل بين المدينتين عبر{' '}
                  <Link href={`/${locale}/routes/makkah-to-madinah`} className="text-gold-dark font-semibold hover:underline">
                    مسار مكة إلى المدينة المنورة
                  </Link>، يتيح لك السائق الخاص التوقف في ميقات ذو الحليفة (آبار علي) للإحرام براحة تامة، وتوفير مساحة واسعة لجميع حقائب العائلة.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-bg border border-border">
                <h3 className="font-display font-bold text-base text-ink mb-1">
                  من مكة إلى جدة أو المطار
                </h3>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-light">
                  في رحلة العودة، نسق موعد الانطلاق قبل موعد إقلاع الطائرة بوقت كافٍ (3-4 ساعات للرحلات الدولية) لتفادي أي ازدحام مروري محتمل وإنهاء إجراءات السفر بهدوء.
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 5 */}
          <div className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-xs">
            <h2 className="font-display font-bold text-xl md:text-2xl text-ink mb-4">
              ما الفرق بين الحجز بالرحلة والحجز بالساعة؟
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-bg border border-border">
                <h3 className="font-display font-bold text-base text-gold-dark mb-2">
                  الحجز لرحلة واحدة (Point-to-Point)
                </h3>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-light">
                  مناسب عندما تحتاج إلى الانتقال المباشر من نقطة محددة إلى وجهة واضحة، مثل مطار جدة إلى فندق في مكة المكرمة، أو من الفندق إلى المطار. السعر هنا ثابت ويشمل المسار بالكامل.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-bg border border-border">
                <h3 className="font-display font-bold text-base text-gold-dark mb-2">
                  الحجز بالساعة (Chauffeur by the Hour)
                </h3>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-light">
                  يناسبك إذا كنت ترغب في الاحتفاظ بسيارة وسائق خاص لعدة ساعات متتالية لإنجاز تنقلات متعددة، أو جولات المزارات الشريفة في مكة أو المدينة، أو التسوق وزيارة المعالم الدينية والتاريخية.
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 6 */}
          <div className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-xs">
            <h2 className="font-display font-bold text-xl md:text-2xl text-ink mb-4">
              أخطاء شائعة عند حجز سيارة من المطار وكيف تتجنبها
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-red-50/50 border border-red-100 text-xs sm:text-sm text-ink">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <strong>أولاً: اختيار السيارة بناءً على السعر فقط.</strong> قد لا تتسع السيارة الأرخص لعدد الحقائب الكبيرة، مما يسبب إرباكاً عند بوابة المطار.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-red-50/50 border border-red-100 text-xs sm:text-sm text-ink">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <strong>ثانياً: إدخال بيانات ناقصة.</strong> الخطأ في رقم الرحلة الجوية أو توقيت الهبوط يحرم السائق من تتبع موعد وصولك بدقة.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-red-50/50 border border-red-100 text-xs sm:text-sm text-ink">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <strong>ثالثاً: عدم مراجعة السعر الإجمالي.</strong> تأكد من أن السعر يشمل رسوم مواقف المطار وضريبة القيمة المضافة وبوابات الطرق السريعة.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-red-50/50 border border-red-100 text-xs sm:text-sm text-ink">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <strong>رابعاً: تجاهل سياسة الانتظار.</strong> استوضح مدة الانتظار المجاني؛ ففي الرحلات الدولية يحتاج المعتمر غالباً من 45 إلى 60 دقيقة لإنهاء الجوازات واستلام الحقائب.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-red-50/50 border border-red-100 text-xs sm:text-sm text-ink">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <strong>خامساً: تأجيل الحجز إلى وقت الهبوط.</strong> الاعتماد على إيجاد سيارة عائلية مناسبة فور الوصول قد يعرضك للانتظار الطويل أو الأسعار المتذبذبة خلال مواسم العمرة.
                </div>
              </div>
            </div>
          </div>

          {/* FAQS SECTION */}
          <section className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-xs">
            <h2 className="font-display font-bold text-xl md:text-2xl text-ink mb-6 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-gold-dark" />
              <span>الأسئلة الشائعة حول نقل VIP لضيوف الرحمن</span>
            </h2>

            <div className="space-y-4">
              {post.faqs.map((faq, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-bg border border-border text-start">
                  <h3 className="font-display font-bold text-base md:text-lg text-ink mb-2">
                    {faq.question[locale] || faq.question.ar}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-light">
                    {faq.answer[locale] || faq.answer.ar}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* FINAL CTA CONCLUSION */}
          <section className="p-8 md:p-10 bg-charcoal text-cream rounded-2xl border border-gold-dark/40 shadow-lg text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-60 h-60 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-3 text-gold">
              احجز رحلتك مع ضيوف الرحمن VIP | Royal Umrah Cabs
            </h2>
            <p className="text-sm md:text-base text-cream/90 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
              تستحق رحلتك إلى الأراضي المقدسة أن تبدأ بترتيب مريح وواضح. سواء كنت تحتاج إلى سيارة خاصة من مطار جدة إلى مكة المكرمة، أو إلى تنقل بين مكة والمدينة المنورة، فإن اختيار خدمة نقل تناسب احتياجاتك يساعدك على التركيز على عبادتك بدلًا من الانشغال بتفاصيل الطريق.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href={`/${locale}/booking?route=jeddah-airport-to-makkah`}
                className="px-8 py-3.5 rounded-full bg-gold hover:bg-gold-dark text-ink font-bold text-sm md:text-base shadow-md transition-all hover:scale-105"
              >
                <span>احجز رحلتك الآن</span>
              </Link>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm md:text-base shadow-md transition-all hover:scale-105 inline-flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>تواصل عبر واتساب</span>
              </a>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
