import React from 'react';
import './services-editorial.css';
import {ServiceChapterExplorer} from '@/components/services/ServiceChapterExplorer';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Locale, getLocalizedAlternates } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import {
  Plane,
  Navigation,
  Landmark,
  Building2,
  Users,
  Headphones,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';

interface ServicesPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata(props: ServicesPageProps): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params;
  const dict = getDictionary(locale);

  return {
    title: dict.page_services.title,
    description: dict.page_services.subtitle,
    alternates: getLocalizedAlternates(locale, '/services'),
  };
}

export default async function ServicesPage(props: ServicesPageProps) {
  const params = await props.params;
  const { locale } = params;
  const dict = getDictionary(locale);
  const isAr = locale === 'ar';
  const isRtl = isAr || locale === 'ur';

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const servicesList = [
    {
      id: 'airport-transfer',
      title: isAr ? 'استقبال وتوصيل المطارات' : 'Airport Transfers',
      desc: isAr ? 'من مطار جدة والمدينة إلى فنادق مكة والمدينة مع تتبع الرحلات' : 'From Jeddah & Madinah to Makkah & Madinah with flight tracking',
      image: '/assets/images/routes/jeddah-airport-to-makkah.jpg',
      icon: Plane,
      badge: isAr ? 'الأكثر طلباً' : 'Bestseller',
      locations: isAr ? 'مطار جدة (KAIA)، مطار المدينة (MED)، فنادق مكة والمدينة' : 'Jeddah Airport (KAIA), Madinah Airport (MED), Holy Mosques',
      relatedRoutes: [
        { href: `/${locale}/routes/jeddah-airport-to-makkah`, title: isAr ? 'مطار جدة ➔ مكة' : 'Jeddah ➔ Makkah' },
        { href: `/${locale}/routes/madinah-airport-to-hotel`, title: isAr ? 'مطار المدينة ➔ الفندق' : 'Madinah Airport ➔ Hotel' },
      ],
      highlights: [
        isAr ? 'مطار الملك عبدالعزيز الدولي (جدة صالة 1 والشمالية)' : 'King Abdulaziz International Airport (JED)',
        isAr ? 'مطار الأمير محمد بن عبدالعزيز بالمدينة المنورة (MED)' : 'Prince Mohammad Bin Abdulaziz Airport (MED)',
        isAr ? 'تتبع مسار الرحلات وانتظار مجاني حتى 60 دقيقة' : 'Flight radar tracking & 60 minutes free waiting',
        isAr ? 'استقبال خاص وتوصيل مباشر إلى باب الفندق' : 'Direct hotel lobby drop-off in Makkah & Madinah',
      ],
    },
    {
      id: 'ziyarat-tour',
      title: isAr ? 'جولات المزارات والمعالم' : 'Ziyarat Trips',
      desc: isAr ? 'استكشاف الأماكن التاريخية والمشاعر المقدسة بصحبة سائق خبير' : 'Explore the Holy Sites & historic landmarks in Makkah & Madinah',
      image: '/assets/images/routes/makkah-ziyarat.jpg',
      icon: Landmark,
      badge: isAr ? 'روحاني' : 'Spiritual',
      locations: isAr ? 'غار حراء، ثور، عرفات، مسجد قباء، جبل أحد' : 'Ghar Hira, Thawr, Arafat, Quba Mosque, Mount Uhud',
      relatedRoutes: [
        { href: `/${locale}/ziyarat`, title: isAr ? 'مزارات مكة والمدينة' : 'Makkah & Madinah Ziyarat' },
      ],
      highlights: [
        isAr ? 'مزارات مكة: غار حراء، غار ثور، منى، مزدلفة، عرفات' : 'Makkah: Ghar Hira, Jabal Thawr, Mina, Muzdalifah, Arafat',
        isAr ? 'مزارات المدينة: مسجد قباء، جبل أحد، مسجد القبلتين' : 'Madinah: Masjid Quba, Mount Uhud, Masjid al-Qiblatayn',
        isAr ? 'سائقون على دراية بنقاط الوصول والانتظار في المزارات' : 'Chauffeurs familiar with site pickup and waiting points',
        isAr ? 'جولات خاصة مرنة تناسب راحة عائلتك' : 'Flexible private tours at your family’s pace',
      ],
    },
    {
      id: 'intercity-travel',
      title: isAr ? 'التنقل بين المدن' : 'Intercity Travel',
      desc: isAr ? 'رحلات مريحة وآمنة بين مكة، المدينة، وجدة عبر الطرق السريعة' : 'Across Saudi Arabia: Makkah, Madinah, and Jeddah expressways',
      image: '/assets/images/routes/makkah-to-madinah.jpg',
      icon: Navigation,
      badge: isAr ? 'مميز' : 'Popular',
      locations: isAr ? 'طريق الهجرة، قطار الحرمين، محطات الميقات' : 'Hijrah Highway, Haramain Corridors, Miqat Points',
      relatedRoutes: [
        { href: `/${locale}/routes/makkah-to-madinah`, title: isAr ? 'مكة ➔ المدينة' : 'Makkah ➔ Madinah' },
        { href: `/${locale}/routes/jeddah-to-madinah`, title: isAr ? 'جدة ➔ المدينة' : 'Jeddah ➔ Madinah' },
      ],
      highlights: [
        isAr ? 'مكة ⇄ المدينة المنورة عبر طريق الهجرة السريع' : 'Makkah ⇄ Madinah via Hijrah Expressway',
        isAr ? 'جدة ⇄ مكة المكرمة وجدة ⇄ المدينة المنورة' : 'Jeddah ⇄ Makkah & Jeddah ⇄ Madinah',
        isAr ? 'توقف مجاني عند الميقات على المسارات المؤهلة وفق ترتيبات الرحلة' : 'Complimentary Miqat stop on applicable routes when arranged',
        isAr ? 'محطات استراحة مريحة للصلاة وتناول القهوة' : 'Comfortable prayer & rest stops included',
      ],
    },
    {
      id: 'hotel-transfers',
      title: isAr ? 'التوصيل الفندقي المباشر' : 'Hotel Transfers',
      desc: isAr ? 'تنقل سلس ومريح بين الفنادق والحرمين الشريفين والأسواق' : 'Comfortable & reliable transfers between hotels, Haram, and malls',
      image: '/assets/images/vip-umrah-transport-jeddah-to-makkah.jpg',
      icon: Building2,
      badge: isAr ? 'مريح' : 'Comfortable',
      locations: isAr ? 'أبراج البيت، جبل عمر، فنادق المنطقة المركزية' : 'Abraj Al Bait, Jabal Omar, Central District Hotels',
      relatedRoutes: [
        { href: `/${locale}/routes/jeddah-airport-to-makkah`, title: isAr ? 'جدة ➔ فنادق مكة' : 'Jeddah ➔ Makkah Hotels' },
      ],
      highlights: [
        isAr ? 'نقل سريع ومريح بين فنادق مكة والمدينة' : 'Fast and smooth transfer between Makkah & Madinah hotels',
        isAr ? 'مساعدة كاملة في تحميل وتنزيل الحقائب والأمتعة' : 'Complete luggage loading and unloading assistance',
        isAr ? 'تنسيق مباشر مع موظفي الاستقبال لراحتك' : 'Direct coordination with hotel reception',
        isAr ? 'مركبات مكيفة ونظيفة بأعلى معايير النظافة والتعقيم' : 'Spotless air-conditioned vehicles with premium comfort',
      ],
    },
    {
      id: 'group-travel',
      title: isAr ? 'رحلات المجموعات والعائلات' : 'Group Travel',
      desc: isAr ? 'حافلات وفانات سياحية واسعة للعائلات الكبيرة وحملات العمرة' : 'For families & groups: spacious vans, Hiaces, and luxury buses',
      image: '/assets/images/studio-2k/toyota-coaster-studio-2k.webp',
      icon: Users,
      badge: isAr ? 'للعائلات' : 'For Groups',
      locations: isAr ? 'كافة مطارات ومحطات ومزارات المنطقة الغربية' : 'All Western Region Airports, Stations & Sacred Sites',
      relatedRoutes: [
        { href: `/${locale}/fleet/toyota-coaster`, title: isAr ? 'حافلة كوستر VIP' : 'Toyota Coaster VIP' },
        { href: `/${locale}/fleet/toyota-hiace`, title: isAr ? 'تويوتا هايس عائلي' : 'Toyota HiAce Family' },
      ],
      highlights: [
        isAr ? 'تويوتا هايس (10 ركاب) وتويوتا كوستر (21 راكب)' : 'Toyota Hiace (10 pax) & Toyota Coaster (21 pax)',
        isAr ? 'مساحات واسعة ومخصصة للأمتعة والحقائب الكبيرة' : 'Generous luggage compartments for large baggage',
        isAr ? 'سائقون محترفون ذوو خبرة طويلة في القيادة الآمنة' : 'Professional drivers with extensive group travel experience',
        isAr ? 'تنسيق خاص للمجموعات والرحلات الجماعية' : 'Custom itinerary coordination for pilgrim groups',
      ],
    },
    {
      id: '24-7-support',
      title: isAr ? 'دعم ومتابعة على مدار الساعة' : '24/7 Support',
      desc: isAr ? 'فريق عمليات وخدمة عملاء دائم لمتابعة رحلتك في أي لحظة' : 'Always here: round-the-clock operations and customer assistance',
      image: '/assets/images/cinematic/home/hero-mercedes-kaaba-retina.jpg',
      icon: Headphones,
      badge: isAr ? 'دائم' : 'Always Here',
      locations: isAr ? 'غرفة عمليات مركزية - مكة وجدة والمدينة' : 'Central Dispatch Operations - Makkah, Madinah, Jeddah',
      relatedRoutes: [
        { href: `/${locale}/contact`, title: isAr ? 'اتصل بخدمة العملاء' : 'Contact Support' },
      ],
      highlights: [
        isAr ? 'خط ساخن ومباشر عبر الواتساب على مدار 24 ساعة' : 'Dedicated 24/7 instant WhatsApp and phone hotline',
        isAr ? 'متابعة مواعيد الرحلات الجوية والتنسيق مع السائق' : 'Flight-time monitoring and chauffeur coordination',
        isAr ? 'مرونة كاملة في تعديل المواعيد وتحديث الرحلات' : 'Full flexibility for schedule adjustments and updates',
        isAr ? 'دعم لمتابعة تفاصيل طلب الحجز والرحلة على مدار الساعة' : 'Round-the-clock support for booking and journey arrangements',
      ],
    },
  ];

  return (
    <div className="duyuf-services-editorial bg-bg min-h-screen text-ink" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Service editorial, an asymmetric visual introduction instead of a template heading. */}
        <div className="duyuf-services-intro">
          <div className="duyuf-services-intro-copy">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAr ? 'حلول النقل المتكاملة' : 'Comprehensive Transportation Solutions'}</span>
          </div>
          <h1 className="duyuf-services-title font-display font-semibold text-3xl sm:text-5xl text-ink tracking-tight mb-4">
            {dict.page_services.title}
          </h1>
          <p className="text-sm sm:text-base text-ink-muted leading-relaxed font-light">
            {dict.page_services.subtitle}
          </p>
          <Link href={`/${locale}/booking`} className="duyuf-services-intro-cta">
            <span>{isAr ? 'ابدأ حجز رحلتك' : 'Plan your private transfer'}</span>
            <ArrowIcon size={18} aria-hidden="true" />
          </Link>
          </div>
          <div className="duyuf-services-intro-visual" aria-label={dict.page_services.title} role="img" data-service-photo-atlas>
            <div className="duyuf-services-atlas-main" aria-hidden="true">
              <Image
                src="/assets/homepage-v2/fleet-family.jpg"
                alt=""
                fill
                priority
                sizes="(max-width: 767px) 78vw, 47vw"
              />
            </div>
            <div className="duyuf-services-atlas-arrival" aria-hidden="true">
              <Image
                src="/assets/homepage-v2/chauffeur-welcome.jpg"
                alt=""
                fill
                sizes="(max-width: 767px) 36vw, 23vw"
              />
            </div>
            <div className="duyuf-services-atlas-route" aria-hidden="true">
              <Image
                src="/assets/images/routes/makkah-to-madinah.jpg"
                alt=""
                fill
                sizes="(max-width: 767px) 32vw, 20vw"
              />
            </div>
            <div className="duyuf-services-atlas-edition" aria-hidden="true">
              <span>DUYUF AL RAHMAN VIP</span>
              <span>01 — 06</span>
            </div>
          </div>
        </div>

        {/* Video reference 03, adapted: six services share one interactive chapter,
            so mobile visitors never have to scroll six giant repeated cards. */}
        <ServiceChapterExplorer
          locale={locale}
          services={servicesList.map(({icon,...data})=>data)}
        />


      </div>
    </div>
  );
}
