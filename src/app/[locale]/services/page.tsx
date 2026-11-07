import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale, getLocalizedAlternates } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import {
  Plane,
  Navigation,
  Landmark,
  Building2,
  Users,
  Headphones,
  CheckCircle2,
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
  const isAr = locale === 'ar';
  const isRtl = isAr || locale === 'ur';
  const dict = getDictionary(locale);

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const servicesList = [
    {
      id: 'airport-transfer',
      title: isAr ? 'استقبال وتوصيل المطارات' : 'Airport Transfers',
      desc: isAr ? 'من مطار جدة والمدينة إلى فنادق مكة والمدينة مع تتبع الرحلات' : 'From Jeddah & Madinah to Makkah & Madinah with flight tracking',
      icon: Plane,
      badge: isAr ? 'الأكثر طلباً' : 'Bestseller',
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
      icon: Landmark,
      badge: isAr ? 'روحاني' : 'Spiritual',
      highlights: [
        isAr ? 'مزارات مكة: غار حراء، غار ثور، منى، مزدلفة، عرفات' : 'Makkah: Ghar Hira, Jabal Thawr, Mina, Muzdalifah, Arafat',
        isAr ? 'مزارات المدينة: مسجد قباء، جبل أحد، مسجد القبلتين' : 'Madinah: Masjid Quba, Mount Uhud, Masjid al-Qiblatayn',
        isAr ? 'سائقون محليون على دراية كاملة بتاريخ وتفاصيل المواقع' : 'Knowledgeable local chauffeurs with deep site history',
        isAr ? 'جولات خاصة مرنة تناسب راحة عائلتك' : 'Flexible private tours at your family’s pace',
      ],
    },
    {
      id: 'intercity-travel',
      title: isAr ? 'التنقل بين المدن' : 'Intercity Travel',
      desc: isAr ? 'رحلات مريحة وآمنة بين مكة، المدينة، وجدة عبر الطرق السريعة' : 'Across Saudi Arabia: Makkah, Madinah, and Jeddah expressways',
      icon: Navigation,
      badge: isAr ? 'مميز' : 'Popular',
      highlights: [
        isAr ? 'مكة ⇄ المدينة المنورة عبر طريق الهجرة السريع' : 'Makkah ⇄ Madinah via Hijrah Expressway',
        isAr ? 'جدة ⇄ مكة المكرمة وجدة ⇄ المدينة المنورة' : 'Jeddah ⇄ Makkah & Jeddah ⇄ Madinah',
        isAr ? 'توقف مخصص عند الميقات (ذي الحليفة / يلملم) للإحرام' : 'Dedicated stop at Miqat (Bir Ali) for Ihram',
        isAr ? 'محطات استراحة مريحة للصلاة وتناول القهوة' : 'Comfortable prayer & rest stops included',
      ],
    },
    {
      id: 'hotel-transfers',
      title: isAr ? 'التوصيل الفندقي المباشر' : 'Hotel Transfers',
      desc: isAr ? 'تنقل سلس ومريح بين الفنادق والحرمين الشريفين والأسواق' : 'Comfortable & reliable transfers between hotels, Haram, and malls',
      icon: Building2,
      badge: isAr ? 'مريح' : 'Comfortable',
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
      icon: Users,
      badge: isAr ? 'للعائلات' : 'For Groups',
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
      icon: Headphones,
      badge: isAr ? 'دائم' : 'Always Here',
      highlights: [
        isAr ? 'خط ساخن ومباشر عبر الواتساب على مدار 24 ساعة' : 'Dedicated 24/7 instant WhatsApp and phone hotline',
        isAr ? 'متابعة حية لموقع السيارة وتوقيت الوصول' : 'Live trip tracking and driver dispatch monitoring',
        isAr ? 'مرونة كاملة في تعديل المواعيد وتحديث الرحلات' : 'Full flexibility for schedule adjustments and updates',
        isAr ? 'استجابة فورية بمتوسط أقل من دقيقتين' : 'Instant response time under 2 minutes average',
      ],
    },
  ];

  return (
    <div className="py-12 md:py-20 bg-[#090D15] min-h-screen text-[#F6F3ED]" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141D2C] border border-[#D6A13A]/40 text-xs font-bold text-[#D6A13A] uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAr ? 'حلول النقل المتكاملة' : 'Comprehensive Transportation Solutions'}</span>
          </div>
          <h1 className="font-playfair font-serif font-bold text-3xl sm:text-5xl text-[#F6F3ED] tracking-tight mb-4">
            {isAr ? 'خدمات النقل الفاخرة' : 'Our Services'}
          </h1>
          <p className="text-sm sm:text-base text-[#AEB7C4] leading-relaxed font-light">
            {isAr
              ? 'حلول نقل متكاملة تلبي كافة احتياجات رحلتك الإيمانية وتنقلاتك عبر المملكة'
              : 'Comprehensive transportation solutions for your pilgrimage and travel needs'}
          </p>
        </div>

        {/* 6-Card Luxury Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {servicesList.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="bg-[#101725] rounded-2xl p-6 sm:p-7 border border-white/10 shadow-lg hover:border-[#D6A13A]/50 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#141D2C] border border-[#D6A13A]/40 flex items-center justify-center text-[#D6A13A] group-hover:scale-105 group-hover:border-[#D6A13A] transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#141D2C] text-[#D6A13A] border border-[#D6A13A]/30">
                      {service.badge}
                    </span>
                  </div>

                  <h2 className="font-playfair font-serif text-xl font-bold text-[#F6F3ED] mb-2.5">
                    {service.title}
                  </h2>
                  <p className="text-[#AEB7C4] text-xs leading-relaxed mb-5 font-light">
                    {service.desc}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-white/10">
                    {service.highlights.map((hl, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#AEB7C4]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D6A13A] shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5">
                  <Link
                    href={`/${locale}/booking?service=${service.id}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#D6A13A] hover:text-[#F6F3ED] transition-colors"
                  >
                    <span>{isAr ? 'حجز هذه الخدمة' : 'Book This Service'}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Master CTA Banner */}
        <div className="text-center py-8">
          <Link
            href={`/${locale}/booking`}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#E5B14B] via-[#D6A13A] to-[#A97B27] text-[#090D15] font-extrabold text-sm sm:text-base shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <span>{isAr ? 'احجز رحلتك الآن' : 'Book Your Journey Today'}</span>
            <ArrowIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
