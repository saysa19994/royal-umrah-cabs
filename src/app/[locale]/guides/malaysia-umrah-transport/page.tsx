import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale, getLocalizedAlternates } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { Plane, Compass, Luggage, DollarSign, CheckCircle2, ArrowRight, MessageCircle, HelpCircle } from 'lucide-react';

interface MalaysiaGuideProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata(props: MalaysiaGuideProps): Promise<Metadata> {
  const params = await props.params;

  const {
    locale
  } = params;

  const dict = getDictionary(locale);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://duyufalrahmanvip.com';

  return {
    title: dict.page_guide_malaysia.title,
    description: dict.page_guide_malaysia.subtitle,
    keywords: [
      'teksi umrah jeddah makkah',
      'sewa van umrah staria hiace',
      'tambang teksi jeddah ke makkah 2026',
      'pemandu umrah persendirian malaysia',
      'teksi miqat bir ali madinah ke makkah',
      'pengangkutan jemaah umrah klia',
    ],
    alternates: getLocalizedAlternates(locale, '/guides/malaysia-umrah-transport'),
    openGraph: {
      title: `${dict.page_guide_malaysia.title} | ${dict.meta.brand}`,
      description: dict.page_guide_malaysia.subtitle,
      url: `${baseUrl}/${locale}/guides/malaysia-umrah-transport`,
      locale: locale === 'ms' ? 'ms_MY' : locale === 'ar' ? 'ar_SA' : 'en_US',
      images: [
        {
          url: `${baseUrl}/assets/images/staria_exterior.jpg`,
          width: 1200,
          height: 630,
          alt: 'VIP Umrah Transport for Malaysian Pilgrims',
        },
      ],
    },
  };
}

export default async function MalaysiaGuidePage(props: MalaysiaGuideProps) {
  const params = await props.params;

  const {
    locale
  } = params;

  const dict = getDictionary(locale);

  const guideFaqs = [
    {
      q: locale === 'ms'
        ? 'Adakah tambang termasuk tol lebuh raya dan cukai?'
        : locale === 'ar'
        ? 'هل تشمل الأسعار رسوم الطرق السريعة والضرائب؟'
        : 'Are highway tolls and taxes included in the fare?',
      a: locale === 'ms'
        ? 'Ya, semua kadar tambang adalah tetap dan muktamad bagi sebuah kenderaan persendirian. Termasuk semua bayaran tol lebuh raya dan tiada sebarang caj tersembunyi.'
        : locale === 'ar'
        ? 'نعم، كافة الأسعار ثابتة ومؤكدة وتشمل جميع رسوم الطرق السريعة دون أي زيادات خفية.'
        : 'Yes, all fares are fixed and private per vehicle, including all expressway tolls with zero hidden extras.',
    },
    {
      q: locale === 'ms'
        ? 'Bolehkah kami singgah di Masjid Miqat Bir Ali untuk berniat ihram?'
        : locale === 'ar'
        ? 'هل يمكن التوقف في مسجد ميقات آبار علي للإحرام؟'
        : 'Can we stop at Masjid Miqat Bir Ali for Ihram prayers?',
      a: locale === 'ms'
        ? 'Sudah tentu. Bagi laluan Madinah ke Makkah, pemandu kami akan membawa anda terus ke Masjid Miqat Dhu al-Hulayfah (Bir Ali) dan memberikan masa yang mencukupi untuk solat sunat ihram dan berniat.'
        : locale === 'ar'
        ? 'بالتأكيد. في مسار المدينة إلى مكة، يتوقف السائق في ميقات ذي الحليفة (آبار علي) ويتيح لكم وقتاً كافياً لأداء الصلاة وعقد النية.'
        : 'Absolutely. On the Madinah to Makkah route, our chauffeur stops at Masjid Miqat Bir Ali, giving your family ample time to pray and make your Niat.',
    },
    {
      q: locale === 'ms'
        ? 'Bagaimana jika penerbangan kami dari KLIA mengalami kelewatan (delay)?'
        : locale === 'ar'
        ? 'ماذا لو تأخرت رحلتنا الجوية القادمة من كوالالمبور؟'
        : 'What happens if our flight from KLIA is delayed?',
      a: locale === 'ms'
        ? 'Pasukan operasi kami memantau nombor penerbangan anda (cth: SV-832, MH-156, OD-705) secara langsung melalui radar penerbangan. Masa menunggu percuma 60 minit hanya bermula selepas pesawat mendarat.'
        : locale === 'ar'
        ? 'نحن نتابع رحلتكم الجوية فورياً عبر رادار الطيران، وتبدأ فترة الانتظار المجانية (60 دقيقة) فقط بعد هبوط الطائرة الفعلي.'
        : 'Our dispatch tracks your flight radar in real-time. The 60-minute complimentary waiting window only begins after your flight officially touches down.',
    },
    {
      q: locale === 'ms'
        ? 'Adakah kami perlu membayar wang pendahuluan (deposit)?'
        : locale === 'ar'
        ? 'هل يجب دفع أي عربون مسبق للحجز؟'
        : 'Do we need to pay a prepayment or credit card deposit?',
      a: locale === 'ms'
        ? 'Tidak perlu sebarang deposit atau kad kredit semasa menempah. Anda hanya membayar terus kepada pemandu secara tunai atau kad semasa tiba di hotel anda di Makkah atau Madinah.'
        : locale === 'ar'
        ? 'لا يلزم أي دفع مسبق. الدفع يتم مباشرة للسائق عند الوصول نقداً أو بالبطاقة.'
        : 'No deposit is required upfront. You pay your chauffeur upon arrival at your hotel in cash or card.',
    },
  ];

  return (
    <div className="py-16 md:py-24 bg-bg min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header Breadcrumb */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-3">
            <span>{dict.page_guide_malaysia.badgeKLIA}</span>
          </div>
          <h1 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight">
            {dict.page_guide_malaysia.title}
          </h1>
          <p className="mt-4 text-ink-muted text-base md:text-lg leading-relaxed font-light">
            {dict.page_guide_malaysia.subtitle}
          </p>
        </div>

        {/* Narrative Section 1: KLIA Arrival */}
        <div className="bg-surface rounded-2xl p-8 md:p-10 border border-border shadow-xs mb-10 text-start space-y-4">
          <div className="flex items-center gap-3 text-gold-dark font-bold text-lg">
            <Plane className="w-6 h-6 shrink-0" />
            <h2 className="font-display text-2xl font-bold text-ink">
              {dict.page_guide_malaysia.section1Title}
            </h2>
          </div>
          <p className="text-ink-light text-sm md:text-base leading-relaxed font-light">
            {dict.page_guide_malaysia.section1Desc}
          </p>
        </div>

        {/* Narrative Section 2: Miqat Bir Ali */}
        <div className="bg-surface rounded-2xl p-8 md:p-10 border border-border shadow-xs mb-10 text-start space-y-4">
          <div className="flex items-center gap-3 text-gold-dark font-bold text-lg">
            <Compass className="w-6 h-6 shrink-0" />
            <h2 className="font-display text-2xl font-bold text-ink">
              {dict.page_guide_malaysia.section2Title}
            </h2>
          </div>
          <p className="text-ink-light text-sm md:text-base leading-relaxed font-light">
            {dict.page_guide_malaysia.section2Desc}
          </p>
        </div>

        {/* Narrative Section 3: Luggage & Zamzam */}
        <div className="bg-surface rounded-2xl p-8 md:p-10 border border-border shadow-xs mb-10 text-start space-y-4">
          <div className="flex items-center gap-3 text-gold-dark font-bold text-lg">
            <Luggage className="w-6 h-6 shrink-0" />
            <h2 className="font-display text-2xl font-bold text-ink">
              {dict.page_guide_malaysia.section3Title}
            </h2>
          </div>
          <p className="text-ink-light text-sm md:text-base leading-relaxed font-light">
            {dict.page_guide_malaysia.section3Desc}
          </p>
        </div>

        {/* Narrative Section 4: Transparent Ringgit Pricing */}
        <div className="bg-surface rounded-2xl p-8 md:p-10 border border-gold-line/60 shadow-xs mb-16 text-start space-y-4">
          <div className="flex items-center gap-3 text-gold-dark font-bold text-lg">
            <DollarSign className="w-6 h-6 shrink-0" />
            <h2 className="font-display text-2xl font-bold text-ink">
              {dict.page_guide_malaysia.section4Title}
            </h2>
          </div>
          <p className="text-ink-light text-sm md:text-base leading-relaxed font-light">
            {dict.page_guide_malaysia.section4Desc}
          </p>
        </div>

        {/* Vehicle Recommendations for Malaysian Families */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-surface rounded-2xl p-6 border border-border shadow-xs text-start">
            <span className="text-xs font-bold text-gold-dark uppercase tracking-widest block mb-1">
              {locale === 'ms' ? 'Pilihan Keluarga 4-7 Orang' : 'Family 4-7 Pax'}
            </span>
            <h3 className="font-display text-xl font-bold text-ink mb-2">
              Hyundai Staria VIP (7 Seats)
            </h3>
            <p className="text-xs text-ink-muted mb-4 font-light">
              {locale === 'ms'
                ? 'Van eksekutif moden dengan penghawa dingin berkuasa tinggi, kerusi kapten boleh laras, dan ruang luas untuk 6 bagasi besar jemaah.'
                : 'Executive modern MPV with captain reclining seats, powerful rear AC, and room for up to 6 large suitcases.'}
            </p>
            <Link
              href={`/${locale}/booking?vehicle=staria`}
              className="inline-flex items-center gap-2 text-xs font-bold text-gold-dark hover:underline"
            >
              <span>{dict.page_guide_malaysia.ctaBookVan}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </Link>
          </div>

          <div className="bg-surface rounded-2xl p-6 border border-border shadow-xs text-start">
            <span className="text-xs font-bold text-gold-dark uppercase tracking-widest block mb-1">
              {locale === 'ms' ? 'Pilihan Rombongan 8-11 Orang' : 'Group 8-11 Pax'}
            </span>
            <h3 className="font-display text-xl font-bold text-ink mb-2">
              Toyota HiAce Minibus (11 Seats)
            </h3>
            <p className="text-xs text-ink-muted mb-4 font-light">
              {locale === 'ms'
                ? 'Pilihan utama rombongan keluarga besar dengan ruang simpanan bagasi yang sangat luas untuk 10 beg pakaian dan kotak Zamzam.'
                : 'Ideal for large extended families, carrying up to 10 large luggage bags and Zamzam boxes comfortably.'}
            </p>
            <Link
              href={`/${locale}/booking?vehicle=hiace`}
              className="inline-flex items-center gap-2 text-xs font-bold text-gold-dark hover:underline"
            >
              <span>{dict.page_guide_malaysia.ctaBookVan}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </Link>
          </div>
        </div>

        {/* FAQs for Malaysian Pilgrims */}
        <div className="bg-surface rounded-2xl p-8 md:p-10 border border-border shadow-xs mb-16 text-start">
          <div className="flex items-center gap-2 text-gold-dark font-bold text-xl mb-6">
            <HelpCircle className="w-5 h-5" />
            <h3 className="font-display text-2xl font-bold text-ink">
              {dict.page_guide_malaysia.faqTitle}
            </h3>
          </div>
          <div className="space-y-6">
            {guideFaqs.map((faq, idx) => (
              <div key={idx} className="pb-4 border-b border-border last:border-0 last:pb-0">
                <h4 className="font-semibold text-sm text-ink mb-2">
                  {faq.q}
                </h4>
                <p className="text-xs text-ink-muted leading-relaxed font-light">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Band */}
        <div className="bg-surface rounded-2xl p-8 border border-gold-line text-center space-y-4">
          <h3 className="font-display text-2xl font-bold text-ink">
            {locale === 'ms'
              ? 'Bersedia Untuk Memulakan Perjalanan Ibadah Anda?'
              : locale === 'ar'
              ? 'هل أنت مستعد لبدء رحلة العمرة المباركة؟'
              : 'Ready to Begin Your Sacred Journey?'}
          </h3>
          <p className="text-xs text-ink-muted max-w-xl mx-auto font-light">
            {locale === 'ms'
              ? 'Tempah sekarang dalam beberapa saat tanpa sebarang bayaran deposit. Pasukan operasi kami sedia membantu anda melalui WhatsApp.'
              : 'Book now in seconds with zero deposit. Our dispatch team is ready to assist you on WhatsApp 24/7.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href={`/${locale}/booking`}
              className="px-8 py-3.5 rounded-xl bg-gold-dark hover:bg-gold-hover text-surface font-bold text-xs shadow-md transition-all"
            >
              {dict.hero.ctaBook}
            </Link>
            <a
              href={`https://wa.me/966567588261?text=${encodeURIComponent(
                'Salam, saya jemaah dari Malaysia ingin bertanyakan tentang sewa kenderaan umrah.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp (+966 56 758 8261)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
