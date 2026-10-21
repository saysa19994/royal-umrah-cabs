'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import type { SiteSettings } from '@/lib/settings';
import { useCurrency } from '@/context/CurrencyContext';
import {
  Calendar,
  Car,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Clock,
  Compass,
  MapPin,
  Users,
  Briefcase,
  Plane,
  Navigation,
  Landmark,
  Plus,
  Minus,
  MessageCircle,
  Star,
  Sparkles,
  Droplet,
  Fuel,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Building2,
  Award,
} from 'lucide-react';

interface HomeSectionsProps {
  locale: Locale;
  dict: Dictionary;
  settings: SiteSettings;
}

export function HomeSections({ locale, dict, settings }: HomeSectionsProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeFleetIndex, setActiveFleetIndex] = useState<number>(0);
  const [fleetView, setFleetView] = useState<Record<string, 'ext' | 'int'>>({});
  const { formatPrice } = useCurrency();

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Section 5: Popular Umrah Routes (Harmain Scenic Cards from Screenshots 6, 7, 9, 10)
  const POPULAR_ROUTES = [
    {
      id: 'jeddah-airport-to-makkah',
      title: locale === 'ar' ? 'مطار جدة (KAIA) ← فندق مكة المكرمة' : locale === 'ms' ? 'Lapangan Terbang Jeddah (KAIA) → Hotel Makkah' : 'Jeddah Airport (KAIA) → Makkah Hotel',
      badge: locale === 'ar' ? 'الأكثر طلباً' : 'MOST BOOKED',
      badgeColor: 'bg-gold text-ink font-bold',
      desc: locale === 'ar' ? 'استقبال من بوابة الصالة وتوصيل مباشر حتى باب فندقك بمكة بعد رحلة طيران مريحة.' : 'Your hotel door, after a flight-tracked pickup at Jeddah Airport.',
      duration: locale === 'ar' ? '75 دقيقة' : '75 mins',
      distance: locale === 'ar' ? '95 كم' : '95 km',
      basePriceSAR: 200,
      img: '/assets/images/yukon_exterior.webp',
    },
    {
      id: 'makkah-to-madinah',
      title: locale === 'ar' ? 'فندق مكة المكرمة ← المدينة المنورة' : locale === 'ms' ? 'Hotel Makkah → Madinah Al-Munawwarah' : 'Makkah Hotel → Madinah Al-Munawwarah',
      badge: locale === 'ar' ? 'بين المدن' : 'INTERCITY',
      badgeColor: 'bg-navy-light text-gold border border-gold/30',
      desc: locale === 'ar' ? 'سائق خاص وسيارة VIP على طريق الهجرة السريع مع توقفات استراحة حسب رغبتك.' : 'A private car from your Makkah hotel to your Madinah hotel with optional stops.',
      duration: locale === 'ar' ? '4.5 ساعات' : '4.5 hours',
      distance: locale === 'ar' ? '440 كم' : '440 km',
      basePriceSAR: 450,
      img: '/assets/images/staria_exterior.webp',
    },
    {
      id: 'madinah-to-makkah',
      title: locale === 'ar' ? 'المدينة المنورة ← مكة المكرمة (ميقات آبار علي)' : locale === 'ms' ? 'Madinah → Makkah (Singgah Miqat Bir Ali)' : 'Madinah Hotel → Makkah (Via Miqat Bir Ali)',
      badge: locale === 'ar' ? 'توقف الميقات' : 'MIQAT STOP',
      badgeColor: 'bg-emerald text-white font-bold',
      desc: locale === 'ar' ? 'توصيل مباشر مع توقف مجاني وانتظار كافٍ في ميقات ذو الحليفة (آبار علي) للإحرام والصلاة.' : 'Direct transfer including a complimentary stop with ample wait at Bir Ali Miqat for Ihram.',
      duration: locale === 'ar' ? '4.5 ساعات' : '4.5 hours',
      distance: locale === 'ar' ? '440 كم' : '440 km',
      basePriceSAR: 450,
      img: '/assets/images/yukon_exterior.webp',
    },
    {
      id: 'makkah-to-jeddah-airport',
      title: locale === 'ar' ? 'فندق مكة المكرمة ← مطار جدة (KAIA)' : locale === 'ms' ? 'Hotel Makkah → Lapangan Terbang Jeddah (KAIA)' : 'Makkah Hotel → Jeddah Airport (KAIA)',
      badge: locale === 'ar' ? 'رحلات العودة' : 'AIRPORT RETURN',
      badgeColor: 'bg-gold-soft text-gold-dark border border-gold-line font-bold',
      desc: locale === 'ar' ? 'انتقال مريح مع مساحة واسعة لحقائب العودة وعبوات ماء زمزم للوصول بالموعد المحدد.' : 'Comfortable departure transfer with ample trunk room for Zamzam water bottles.',
      duration: locale === 'ar' ? '75 دقيقة' : '75 mins',
      distance: locale === 'ar' ? '95 كم' : '95 km',
      basePriceSAR: 200,
      img: '/assets/images/camry_exterior.webp',
    },
    {
      id: 'jeddah-to-madinah',
      title: locale === 'ar' ? 'مطار جدة ← فنادق المدينة المنورة' : locale === 'ms' ? 'Jeddah Airport → Hotel Madinah' : 'Jeddah Airport / City → Madinah Hotel',
      badge: locale === 'ar' ? 'بين المدن' : 'INTERCITY',
      badgeColor: 'bg-navy-light text-gold border border-gold/30',
      desc: locale === 'ar' ? 'نقل مباشر من مطار جدة إلى المدينة المنورة دون الحاجة للمبيت في جدة أو تبديل محطات.' : 'Direct airport-to-hotel journey from Jeddah to Madinah with custom family rest stops.',
      duration: locale === 'ar' ? '4.2 ساعات' : '4.2 hours',
      distance: locale === 'ar' ? '410 كم' : '410 km',
      basePriceSAR: 680,
      img: '/assets/images/staria_exterior.webp',
    },
    {
      id: 'madinah-airport-to-hotel',
      title: locale === 'ar' ? 'مطار المدينة (MED) ← فنادق الحرم' : locale === 'ms' ? 'Lapangan Terbang Madinah (MED) → Hotel Madinah' : 'Madinah Airport (MED) → Central Hotel',
      badge: locale === 'ar' ? 'الأكثر طلباً' : 'MOST BOOKED',
      badgeColor: 'bg-gold text-ink font-bold',
      desc: locale === 'ar' ? 'استقبال سريع بصالة مطار الأمير محمد بن عبدالعزيز وتوصيل لباب فندقك بالمنطقة المركزية.' : 'A captain meets you inside Prince Mohammad bin Abdulaziz Airport with personalized board.',
      duration: locale === 'ar' ? '25 دقيقة' : '25 mins',
      distance: locale === 'ar' ? '22 كم' : '22 km',
      basePriceSAR: 150,
      img: '/assets/images/camry_exterior.webp',
    },
  ];

  // Section 7: Luxury Fleet with "Choose Your Class" Harmain Style (Screenshots 1, 2, 3)
  const FLEET_VEHICLES = [
    {
      id: 'camry',
      name: locale === 'ar' ? 'تويوتا كامري' : 'Toyota Camry',
      category: locale === 'ar' ? 'سيدان تنفيذي' : 'EXECUTIVE SEDAN',
      passengers: 4,
      seats: 4,
      luggage: 3,
      bags: 3,
      startingPriceSAR: 150,
      extImg: '/assets/images/camry_exterior.webp',
      intImg: '/assets/images/camry_interior.webp',
      desc: locale === 'ar' ? 'مثالية للأفراد والأزواج والعائلات الصغيرة مع حقائب قياسية وتكييف فائق الراحة.' : 'A modern, immaculately maintained sedan for solo airport runs and couple pilgrimages.',
      features: [
        { title: locale === 'ar' ? 'مياه نقية' : 'Water', desc: locale === 'ar' ? 'عبوات منعشة' : 'Fresh Bottles', icon: Droplet },
        { title: locale === 'ar' ? 'مقصورة معقمة' : 'Clean Cabin', desc: locale === 'ar' ? 'تنظيف يومي فاخر' : 'Daily Serviced', icon: Sparkles },
        { title: locale === 'ar' ? 'سائق محترف' : 'Pro Driver', desc: locale === 'ar' ? 'خبير بمسارات الحرمين' : 'Route Expert', icon: Award },
        { title: locale === 'ar' ? 'تأمين شامل' : 'Insurance', desc: locale === 'ar' ? 'معتمد نظامياً' : 'Saudi Compliant', icon: ShieldCheck },
      ],
    },
    {
      id: 'staria',
      name: locale === 'ar' ? 'هيونداي ستاريا VIP' : 'Hyundai Staria VIP',
      category: locale === 'ar' ? 'فان عائلي فاخر' : 'PREMIUM FAMILY VAN',
      passengers: 7,
      seats: 7,
      luggage: 6,
      bags: 6,
      startingPriceSAR: 260,
      extImg: '/assets/images/staria_exterior.webp',
      intImg: '/assets/images/staria_interior.webp',
      desc: locale === 'ar' ? 'الخيار المفضل للعائلات بمقاعد كابتن جلدية فاخرة وأبواب منزلقة وسعة رحبة للحقائب.' : 'The executive standard for Umrah families with captain seats and expansive cargo volume.',
      features: [
        { title: locale === 'ar' ? 'مياه نقية' : 'Water', desc: locale === 'ar' ? 'عبوات منعشة' : 'Fresh Bottles', icon: Droplet },
        { title: locale === 'ar' ? 'مقصورة معقمة' : 'Clean Cabin', desc: locale === 'ar' ? 'تنظيف يومي فاخر' : 'Daily Serviced', icon: Sparkles },
        { title: locale === 'ar' ? 'سائق محترف' : 'Pro Driver', desc: locale === 'ar' ? 'خبير بمسارات الحرمين' : 'Route Expert', icon: Award },
        { title: locale === 'ar' ? 'تأمين شامل' : 'Insurance', desc: locale === 'ar' ? 'معتمد نظامياً' : 'Saudi Compliant', icon: ShieldCheck },
      ],
    },
    {
      id: 'yukon',
      name: locale === 'ar' ? 'جي إم سي يوكون XL' : 'GMC Yukon XL VIP',
      category: locale === 'ar' ? 'دفع رباعي فاخر VIP' : 'LUXURY SUV',
      passengers: 7,
      seats: 7,
      luggage: 8,
      bags: 8,
      startingPriceSAR: 380,
      extImg: '/assets/images/yukon_exterior.webp',
      intImg: '/assets/images/yukon_interior.webp',
      desc: locale === 'ar' ? 'قمة الفخامة والوقار لكبار الشخصيات والعائلات مع صندوق أمتعة عملاق يتسع لكافة الحقائب ومياه زمزم.' : 'Ultimate presidential luxury and expansive cargo space designed for VIP delegations and large families.',
      features: [
        { title: locale === 'ar' ? 'مياه نقية' : 'Water', desc: locale === 'ar' ? 'عبوات منعشة' : 'Fresh Bottles', icon: Droplet },
        { title: locale === 'ar' ? 'مقصورة معقمة' : 'Clean Cabin', desc: locale === 'ar' ? 'تنظيف يومي فاخر' : 'Daily Serviced', icon: Sparkles },
        { title: locale === 'ar' ? 'سائق محترف' : 'Pro Driver', desc: locale === 'ar' ? 'خبير بمسارات الحرمين' : 'Route Expert', icon: Award },
        { title: locale === 'ar' ? 'تأمين شامل' : 'Insurance', desc: locale === 'ar' ? 'معتمد نظامياً' : 'Saudi Compliant', icon: ShieldCheck },
      ],
    },
    {
      id: 'hiace',
      name: locale === 'ar' ? 'تويوتا هايس' : 'Toyota HiAce Minibus',
      category: locale === 'ar' ? 'ميني باص عائلي' : 'VIP MINIBUS',
      passengers: 10,
      seats: 10,
      luggage: 10,
      bags: 10,
      startingPriceSAR: 340,
      extImg: '/assets/images/hiace_exterior.webp',
      intImg: '/assets/images/hiace_interior.webp',
      desc: locale === 'ar' ? 'مثالية للمجموعات الكبيرة والأسر الممتدة لتوفير تكلفة سيارتين والسفر معاً براحة تامة.' : 'Spacious group minibus keeping extended families together in air-conditioned comfort.',
      features: [
        { title: locale === 'ar' ? 'مياه نقية' : 'Water', desc: locale === 'ar' ? 'عبوات منعشة' : 'Fresh Bottles', icon: Droplet },
        { title: locale === 'ar' ? 'مقصورة معقمة' : 'Clean Cabin', desc: locale === 'ar' ? 'تنظيف يومي فاخر' : 'Daily Serviced', icon: Sparkles },
        { title: locale === 'ar' ? 'سائق محترف' : 'Pro Driver', desc: locale === 'ar' ? 'خبير بمسارات الحرمين' : 'Route Expert', icon: Award },
        { title: locale === 'ar' ? 'تأمين شامل' : 'Insurance', desc: locale === 'ar' ? 'معتمد نظامياً' : 'Saudi Compliant', icon: ShieldCheck },
      ],
    },
  ];

  const currentCar = FLEET_VEHICLES[activeFleetIndex];
  const isInsideView = fleetView[currentCar.id] === 'int';

  // Section 8: Designed to Exceed Expectations Cards (Screenshot 4 & 5)
  const SERVICE_SHOWCASE = [
    {
      id: 'airport-transfer',
      title: locale === 'ar' ? 'استقبال وتوصيل المطارات' : 'Premium Airport Transfers',
      subtitle: locale === 'ar' ? 'مطار الملك عبدالعزيز ومطار المدينة' : 'KAIA Jeddah & MED Madinah',
      img: '/assets/images/yukon_exterior.webp',
      icon: Plane,
      href: `/${locale}/guides/jeddah-airport-arrival-pickup-guide`,
    },
    {
      id: 'umrah-taxi',
      title: locale === 'ar' ? 'توصيل معتمري بيت الله الحرام' : 'Umrah Taxi Service',
      subtitle: locale === 'ar' ? 'نقل خاص مباشر بين الفنادق والحرمين' : 'Direct Makkah & Madinah Chauffeur',
      img: '/assets/images/staria_exterior.webp',
      icon: Landmark,
      href: `/${locale}/guides/jeddah-airport-to-makkah-taxi-vs-train`,
    },
    {
      id: 'ziyarat-tours',
      title: locale === 'ar' ? 'جولات المزارات الإسلامية' : 'Ziyarat Historical Tours',
      subtitle: locale === 'ar' ? 'غار حراء، ثور، قباء، وأحد بسائق مخصص' : 'Sacred landmarks with chauffeur waiting',
      img: '/assets/images/camry_exterior.webp',
      icon: Compass,
      href: `/${locale}/ziyarat`,
    },
    {
      id: 'executive-corporate',
      title: locale === 'ar' ? 'النقل التنفيذي والبروتوكول' : 'Executive & Protocol Travel',
      subtitle: locale === 'ar' ? 'سيارات VIP فاخرة لرجال الأعمال والوفود' : 'VIP SUVs and hourly chauffeur hire',
      img: '/assets/images/hiace_exterior.webp',
      icon: Building2,
      href: `/${locale}/fleet`,
    },
  ];

  // Section 9: Verified Reviews
  const REVIEWS = [
    {
      name: 'Dr. Tariq Al-Hashimi',
      origin: 'United Kingdom 🇬🇧',
      role: 'Family Umrah Group',
      rating: 5,
      date: 'October 2026',
      comment: locale === 'ar'
        ? 'تجربة استثنائية بكل المقاييس. السائق كان ينتظرنا في صالة مطار جدة بلوحة الاسم، وسيارة يوكون XL كانت نظيفة جداً كأنها جديدة. الدفع تم عند وصولنا للفندق بدون أي زيادة.'
        : 'Outstanding service from start to finish. Our chauffeur was waiting inside KAIA terminal holding our name board. The Yukon XL was immaculate and pay-on-arrival was seamless.',
    },
    {
      name: 'Haji Ahmad Zulkifli',
      origin: 'Malaysia 🇲🇾',
      role: 'Pilgrimage with Elderly Parents',
      rating: 5,
      date: 'October 2026',
      comment: locale === 'ar'
        ? 'حجزنا هيونداي ستاريا لوالدي كبار السن. السيارة مريحة جداً وسهلة الصعود، وتوقف السائق معنا في ميقات آبار علي بكل رحابة صدر وصبر. نوصي بهم بشدة.'
        : 'Booked Hyundai Staria VIP for my elderly parents. Low step-in made boarding easy, and the driver waited patiently at Bir Ali Miqat. Highly recommended.',
    },
    {
      name: 'Mohamed El-Shennawy',
      origin: 'Egypt 🇪🇬',
      role: 'Jeddah to Makkah & Madinah',
      rating: 5,
      date: 'October 2026',
      comment: locale === 'ar'
        ? 'أفضل خدمة نقل تعاملت معها في السعودية. السعر ثابت وشامل رسوم الطريق السريع والبنزين دون أي مفاجآت، والتواصل عبر واتساب سريع واحترافي على مدار الساعة.'
        : 'Best transfer service in Saudi Arabia. Fixed rate with zero toll or luggage surprises. Instant WhatsApp coordination 24/7.',
    },
  ];

  // Section 9: FAQs
  const FAQS = [
    {
      q: locale === 'ar' ? 'كيف أقابل سائقي الخاص في مطار جدة أو المدينة؟' : 'Where and how do I meet my private chauffeur at the airport?',
      a: locale === 'ar'
        ? 'يقوم منسق العمليات بإرسال بيانات السائق ورقم لوحة السيارة عبر واتساب فور هبوط الطائرة. ينتظرك سائقك في صالة القدوم حاملاً لوحة باسمك المكتوب في الحجز ويساعدك في نقل الأمتعة.'
        : 'Our dispatch team sends your driver details and vehicle plate on WhatsApp upon landing. Your chauffeur greets you inside the arrivals hall holding a personalized name board and assists with baggage.',
    },
    {
      q: locale === 'ar' ? 'ماذا لو تأخرت رحلة الطيران أو استغرقت الجوازات وقتاً طويلاً؟' : 'What happens if my flight is delayed or immigration takes time?',
      a: locale === 'ar'
        ? 'نحن نتتبع رقم رحلتك مباشرة عبر رادار الطيران، ويشمل حجزك 90 دقيقة انتظار مجانية كاملة تبدأ بعد هبوط الطائرة الفعلي، مع دعم متواصل عبر واتساب.'
        : 'We track your flight live via international aviation radar. Your reservation includes 90 minutes of complimentary waiting time starting after actual touchdown.',
    },
    {
      q: locale === 'ar' ? 'هل يشمل السعر التوقف في الميقات للإحرام؟' : 'Is a stop at the Miqat included for pilgrims heading to Makkah?',
      a: locale === 'ar'
        ? 'نعم، يشمل مسار المدينة إلى مكة توقفاً مجانياً مع انتظار كامل في ميقات ذو الحليفة (آبار علي) لتمكينك من الاغتسال والإحرام والصلاة دون أي رسوم إضافية.'
        : 'Yes, transfers from Madinah to Makkah include a complimentary stop with generous wait time at Bir Ali Miqat for your Ihram and prayers at no extra cost.',
    },
    {
      q: locale === 'ar' ? 'متى وكيف يتم سداد قيمة الرحلة؟' : 'When and how do I pay for my transfer?',
      a: locale === 'ar'
        ? 'الدفع 100% عند الوصول بعد إتمام الرحلة والوصول سالماً لباب فندقك. يمكنك الدفع نقداً بالريال السعودي أو عبر بطاقات مدى وفيزا وماستركارد مباشرة للسائق.'
        : 'Payment is 100% on arrival after reaching your destination safely. You can settle in cash (SAR) or via Visa, Mastercard, or Mada card directly with the driver.',
    },
    {
      q: locale === 'ar' ? 'هل تتوفر كراسي أطفال أو مساحة للكراسي المتحركة؟' : 'Are child safety seats and folding wheelchair space available?',
      a: locale === 'ar'
        ? 'نعم، نوفر مقاعد الأطفال عند الطلب المسبق، وتتسع سياراتنا من فئة ستاريا ويوكون وهايس للكراسي المتحركة بكل سهولة وأمان.'
        : 'Yes, child car seats are provided upon request. Our Staria, Yukon, and HiAce fleet easily accommodate folding wheelchairs alongside baggage.',
    },
    {
      q: locale === 'ar' ? 'هل الأسعار المعلنة تشمل رسوم الطرق السريعة وضريبة القيمة المضافة؟' : 'Do displayed prices include highway toll fees and taxes?',
      a: locale === 'ar'
        ? 'نعم، جميع الأسعار نهائية وثابتة للمركبة بالكامل وتشمل رسوم الطرق السريعة ومواقف المطار والوقود والضريبة، دون أي رسوم خفية إطلاقاً.'
        : 'Yes, every rate is strictly all-inclusive per whole vehicle, covering highway tolls, airport terminal parking, fuel, and taxes with zero hidden fees.',
    },
  ];

  return (
    <div className="w-full">
      {/* ============================================================== */}
      {/* SECTION 4: TRUST STRIP & 3-STEP "HOW IT WORKS" PROCESS        */}
      {/* ============================================================== */}
      <section id="how-it-works" className="py-16 md:py-24 bg-alabaster border-t border-border text-start">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* HEADER */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
              <span>{locale === 'ar' ? 'خطوات سهلة لحجز مريح' : 'Simple 3-Step Process'}</span>
            </div>
            <h2 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight">
              {locale === 'ar' ? 'كيف تحجز رحلتك مع' : 'How It Works with'}{' '}
              <span className="text-gold-dark italic font-display font-bold">
                {locale === 'ar' ? 'ضيوف الرحمن VIP' : 'Duyuf Alrahman VIP'}
              </span>
            </h2>
            <p className="mt-3 text-ink-muted text-base md:text-lg leading-relaxed font-light">
              {locale === 'ar'
                ? 'ثلاث خطوات يسيرة بدون دفع مسبق أو تعقيد؛ نضمن لك رحلة وقار وراحة من لحظة هبوطك حتى باب فندقك.'
                : 'Reserve your private chauffeur in 60 seconds with zero advance deposit and instant WhatsApp confirmation.'}
            </p>
          </div>

          {/* 3 STEPS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-surface rounded-2xl p-8 border border-border shadow-xs hover:shadow-md transition-all relative group text-start">
              <div className="w-12 h-12 rounded-xl bg-gold/15 text-gold-dark font-display font-bold text-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform border border-gold/30">
                01
              </div>
              <h3 className="font-display font-bold text-xl text-ink mb-2">
                {locale === 'ar' ? 'حدد المسار وموعد الوصول' : 'Select Route & Schedule'}
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed font-light mb-4">
                {locale === 'ar'
                  ? 'اختر مسار رحلتك (من مطار جدة أو المدينة)، وأدخل موعد وصول رحلتك ورقم الطيران لنقوم بتتبعها تلقائياً.'
                  : 'Choose your pickup terminal and destination hotel. Input your flight number for automated radar tracking.'}
              </p>
              <div className="pt-4 border-t border-border text-xs text-gold-dark font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{locale === 'ar' ? 'تتبع فوري بدون رسوم تأخير' : 'Free radar tracking included'}</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-surface rounded-2xl p-8 border border-border shadow-xs hover:shadow-md transition-all relative group text-start">
              <div className="w-12 h-12 rounded-xl bg-gold/15 text-gold-dark font-display font-bold text-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform border border-gold/30">
                02
              </div>
              <h3 className="font-display font-bold text-xl text-ink mb-2">
                {locale === 'ar' ? 'اختر السيارة الفاخرة المناسبة' : 'Choose Your VIP Vehicle'}
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed font-light mb-4">
                {locale === 'ar'
                  ? 'حدد السيارة التي تناسب عدد أفراد أسرتك وحقائب السفر (كامري، ستاريا VIP، يوكون XL، أو هايس) واطلع على السعر الثابت.'
                  : 'Select the ideal vehicle class for your headcount and luggage with 100% transparent fixed rates.'}
              </p>
              <div className="pt-4 border-t border-border text-xs text-gold-dark font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{locale === 'ar' ? 'سعر ثابت شامل الوقود والطرق' : 'Fixed fare per whole car'}</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-surface rounded-2xl p-8 border border-border shadow-xs hover:shadow-md transition-all relative group text-start">
              <div className="w-12 h-12 rounded-xl bg-gold/15 text-gold-dark font-display font-bold text-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform border border-gold/30">
                03
              </div>
              <h3 className="font-display font-bold text-xl text-ink mb-2">
                {locale === 'ar' ? 'تأكيد فوري والدفع عند الوصول' : 'Voucher & Pay on Arrival'}
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed font-light mb-4">
                {locale === 'ar'
                  ? 'استلم قسيمة الحجز وبيانات السائق فوراً عبر واتساب، واستمتع بالرحلة وادفع عند وصولك سالماً لوجهتك نقداً أو بالبطاقة.'
                  : 'Receive your instant confirmation code on WhatsApp. Meet your driver and pay upon arriving at your hotel.'}
              </p>
              <div className="pt-4 border-t border-border text-xs text-emerald-600 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{locale === 'ar' ? 'دفع آمن 100% عند الوصول' : '100% Pay On Arrival Safe'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 5: POPULAR UMRAH ROUTES (Harmain Style from Images)    */}
      {/* ============================================================== */}
      <section id="routes" className="py-16 md:py-24 bg-bg border-t border-border text-start">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-3">
                <Compass className="w-3.5 h-3.5 text-gold-dark" />
                <span>{locale === 'ar' ? 'المسارات المعتمدة' : 'Official Pilgrim Routes'}</span>
              </div>
              <h2 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight">
                {locale === 'ar' ? 'مسارات الحرمين الشريفين والنقل بين المدن' : 'Jeddah, Makkah & Madinah Routes'}
              </h2>
              <p className="mt-2 text-ink-muted text-sm md:text-base font-light">
                {locale === 'ar' ? 'أسعار ثابتة للمركبة بالكامل • رسوم الطرق السريعة مشمولة • لا توجد زيادات في أوقات الذروة' : 'Fixed price per vehicle. Highway tolls and fuel included.'}
              </p>
            </div>
            <Link
              href={`/${locale}/routes`}
              className="inline-flex items-center gap-1.5 text-xs md:text-sm font-bold text-gold-dark hover:underline whitespace-nowrap self-start md:self-auto"
            >
              <span>{locale === 'ar' ? 'عرض جميع المسارات بالتفصيل' : 'View all routes'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>

          {/* SCENIC ROUTE CARDS GRID (From Screenshots 6, 7, 9, 10) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {POPULAR_ROUTES.map((r) => (
              <div
                key={r.id}
                className="bg-surface rounded-2xl border border-border shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* SCENIC IMAGE WITH OVERLAY TEXT */}
                  <div className="relative aspect-[16/10] bg-navy overflow-hidden">
                    <Image
                      src={r.img}
                      alt={r.title}
                      width={480}
                      height={300}
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
                    
                    {/* Badge */}
                    <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3">
                      <span className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded-md shadow-xs ${r.badgeColor}`}>
                        {r.badge}
                      </span>
                    </div>

                    {/* Route Title on Image */}
                    <div className="absolute bottom-3 left-4 right-4 rtl:right-4 rtl:left-4 text-start">
                      <h3 className="font-display font-bold text-lg text-white leading-tight">
                        {r.title}
                      </h3>
                    </div>
                  </div>

                  {/* CARD BODY */}
                  <div className="p-5 text-start">
                    <p className="text-xs text-ink-muted leading-relaxed font-light mb-4 line-clamp-2">
                      {r.desc}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-ink-muted pb-4 border-b border-border">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-gold-dark" />
                        <span>{r.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-gold-dark" />
                        <span>{r.distance}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-emerald-600 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{locale === 'ar' ? 'الرسوم مشمولة' : 'Tolls Included'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CARD FOOTER */}
                <div className="p-5 pt-0 flex items-center justify-between gap-3 text-start">
                  <div>
                    <span className="text-[10px] text-ink-muted uppercase tracking-wider block">
                      {locale === 'ar' ? 'يبدأ من' : 'From'}
                    </span>
                    <span className="font-display font-bold text-xl text-ink">
                      {formatPrice(r.basePriceSAR)}
                    </span>
                    <span className="text-[10px] text-ink-muted block">
                      {locale === 'ar' ? 'للسيارة بالكامل' : 'per vehicle'}
                    </span>
                  </div>

                  <Link
                    href={`/${locale}/booking?route=${r.id}`}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gold hover:bg-gold-dark text-ink font-bold text-xs uppercase tracking-wider transition-all shadow-xs"
                  >
                    <span>{locale === 'ar' ? 'احجز هذا المسار' : 'Reserve this route'}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 6: ALL-INCLUSIVE STANDARDS (ZERO HIDDEN FEES)           */}
      {/* ============================================================== */}
      <section className="py-16 md:py-24 bg-navy text-white border-t border-navy-border text-start relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/30 text-xs font-bold text-gold uppercase tracking-widest mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-gold" />
              <span>{locale === 'ar' ? 'ميثاق الجودة والأمان' : 'All-Inclusive Pilgrim Standards'}</span>
            </div>
            <h2 className="font-display font-semibold text-3xl md:text-5xl text-white tracking-tight">
              {locale === 'ar' ? 'معايير الراحة الكاملة بدون أي رسوم خفية' : 'Zero Hidden Fees • Total Peace of Mind'}
            </h2>
            <p className="mt-3 text-white/80 text-base md:text-lg leading-relaxed font-light">
              {locale === 'ar'
                ? 'نحن نعتبر خدمة ضيوف الرحمن أمانة وشرفاً؛ لذلك نلتزم بأسعار ثابتة وشفافة وخدمة متكاملة من الباب إلى الباب.'
                : 'Serving the Guests of Allah is our sacred trust. Every transfer includes our 6-pillar guarantee.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-navy-light/80 rounded-2xl p-6 border border-navy-border hover:border-gold/40 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-gold/15 text-gold flex items-center justify-center mb-4 border border-gold/30">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">
                {locale === 'ar' ? 'سيارة خاصة 100% لعائلتك' : '100% Private Transfers'}
              </h3>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-light">
                {locale === 'ar'
                  ? 'لا توجد مشاركة مع غرباء إطلاقاً؛ سيارتك وسائقك مخصصان بالكامل لأسرتك لضمان الخصوصية والراحة التامة.'
                  : 'Never shared with other parties. The entire vehicle and dedicated chauffeur are exclusive to your family.'}
              </p>
            </div>

            <div className="bg-navy-light/80 rounded-2xl p-6 border border-navy-border hover:border-gold/40 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-gold/15 text-gold flex items-center justify-center mb-4 border border-gold/30">
                <Plane className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">
                {locale === 'ar' ? 'تتبع آلي لرحلات الطيران' : 'Live Flight Radar Tracking'}
              </h3>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-light">
                {locale === 'ar'
                  ? 'نتابع طائرتك بالرادار الملاحي الدولي. إذا تقدمت أو تأخرت، يتم تعديل موعد وصول السائق تلقائياً بدون قلق.'
                  : 'Automated flight radar tracking ensures your chauffeur is precisely on time even if your flight is delayed.'}
              </p>
            </div>

            <div className="bg-navy-light/80 rounded-2xl p-6 border border-navy-border hover:border-gold/40 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-gold/15 text-gold flex items-center justify-center mb-4 border border-gold/30">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">
                {locale === 'ar' ? '90 دقيقة انتظار مجاني' : '90-Min Free Airport Waiting'}
              </h3>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-light">
                {locale === 'ar'
                  ? 'خذ وقتك في استلام الأمتعة وإنهاء الجوازات وشراء الشرائح؛ السائق ينتظرك حتى 90 دقيقة مجاناً بعد الهبوط.'
                  : 'Generous complimentary wait time allowing you to clear immigration and baggage claim completely stress-free.'}
              </p>
            </div>

            <div className="bg-navy-light/80 rounded-2xl p-6 border border-navy-border hover:border-gold/40 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-gold/15 text-gold flex items-center justify-center mb-4 border border-gold/30">
                <Fuel className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">
                {locale === 'ar' ? 'رسوم الطرق والوقود مشمولة' : 'Tolls & Fuel Included'}
              </h3>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-light">
                {locale === 'ar'
                  ? 'رسوم طريق الحرمين السريع، ومواقف صالات المطار، والوقود، وضريبة القيمة المضافة كلها مشمولة في السعر المعلن.'
                  : 'Every expressway toll charge, airport terminal parking fee, and fuel cost is 100% covered.'}
              </p>
            </div>

            <div className="bg-navy-light/80 rounded-2xl p-6 border border-navy-border hover:border-gold/40 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-gold/15 text-gold flex items-center justify-center mb-4 border border-gold/30">
                <Landmark className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">
                {locale === 'ar' ? 'توقف مجاني بميقات آبار علي' : 'Complimentary Miqat Stop'}
              </h3>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-light">
                {locale === 'ar'
                  ? 'للمتوجهين من المدينة لمكة، نتوقف في ميقات ذو الحليفة (آبار علي) مع انتظار كافٍ للإحرام والصلاة دون رسوم.'
                  : 'Free stopover at Dhul Hulayfah (Bir Ali Miqat) with ample waiting time for your Ihram and Sunnah prayers.'}
              </p>
            </div>

            <div className="bg-navy-light/80 rounded-2xl p-6 border border-navy-border hover:border-gold/40 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-gold/15 text-gold flex items-center justify-center mb-4 border border-gold/30">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">
                {locale === 'ar' ? 'دفع آمن 100% عند الوصول' : '100% Pay On Arrival'}
              </h3>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-light">
                {locale === 'ar'
                  ? 'لا نطلب بطاقة ائتمان أو دفعاً مسبقاً إلزامياً؛ ادفع لسائقك نقداً بالريال أو ببطاقتك البنكية عند الوصول سالماً.'
                  : 'Zero advance deposits required. Settle directly with your driver via cash or bank card upon arriving at your hotel.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 7: LUXURY FLEET "CHOOSE YOUR CLASS" (Screenshots 1,2,3)*/}
      {/* ============================================================== */}
      <section id="fleet" className="py-16 md:py-24 bg-alabaster border-t border-border text-start">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* HEADER */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-3">
              <Car className="w-3.5 h-3.5 text-gold-dark" />
              <span>{locale === 'ar' ? 'أسطول رويال الفاخر' : 'Royal Executive Fleet'}</span>
            </div>
            <h2 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight">
              {locale === 'ar' ? 'اختر فئة سيارتك المفضلة' : 'Choose Your Class'}
            </h2>
            <p className="mt-3 text-ink-muted text-base md:text-lg leading-relaxed font-light">
              {locale === 'ar'
                ? 'أسطول حديث ومصان بأعلى المعايير لكل رحلة — من استقبال المطار الفردي إلى رحلات العائلات الكبيرة والأفواج.'
                : 'A modern, immaculately maintained fleet for every journey — from solo airport runs to family pilgrimages.'}
            </p>
          </div>

          {/* HARMAIN-STYLE FEATURED SHOWCASE CARD (Screenshots 1, 2, 3) */}
          <div className="bg-gradient-to-br from-navy via-navy-light to-navy rounded-3xl border border-gold/30 shadow-2xl p-6 sm:p-10 md:p-12 mb-14 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* LEFT COLUMN: SPECS & FEATURES */}
              <div className="lg:col-span-6 space-y-6 text-start">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-gold/20 border border-gold/40 text-xs font-bold uppercase tracking-wider text-gold mb-3">
                    {currentCar.category}
                  </span>
                  <h3 className="font-display font-bold text-3xl sm:text-4xl text-white">
                    {currentCar.name}
                  </h3>
                  <div className="flex items-center gap-4 text-xs sm:text-sm text-white/80 mt-2">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-gold" />
                      <span>{locale === 'ar' ? `حتى ${currentCar.passengers} ركاب` : `Up to ${currentCar.passengers} Passengers`}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4 text-gold" />
                      <span>{locale === 'ar' ? `حتى ${currentCar.luggage} حقائب` : `Up to ${currentCar.luggage} Luggage Bags`}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                  {currentCar.desc}
                </p>

                {/* 2x2 FEATURES PILLS */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {currentCar.features.map((feat, idx) => {
                    const FeatIcon = feat.icon;
                    return (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3"
                      >
                        <div className="w-8 h-8 rounded-lg bg-gold/15 text-gold flex items-center justify-center shrink-0">
                          <FeatIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white block">
                            {feat.title}
                          </span>
                          <span className="text-[10px] text-white/60 block">
                            {feat.desc}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* STARTING PRICE & ACTIONS */}
                <div className="pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-white/60 block font-semibold">
                      {locale === 'ar' ? 'سعر البداية' : 'STARTING PRICE'}
                    </span>
                    <span className="font-display font-bold text-2xl sm:text-3xl text-gold">
                      {locale === 'ar' ? `من ${formatPrice(currentCar.startingPriceSAR)}` : `From ${formatPrice(currentCar.startingPriceSAR)}`}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href={`/${locale}/booking?vehicle=${currentCar.id}`}
                      className="px-6 py-3 rounded-full bg-gold hover:bg-gold-hover text-ink font-bold text-xs uppercase tracking-wider shadow-gold transition-colors"
                    >
                      {locale === 'ar' ? 'احجز الآن' : 'Book Now'}
                    </Link>
                    <Link
                      href={`/${locale}/fleet/${currentCar.id}`}
                      className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors"
                    >
                      {locale === 'ar' ? 'التفاصيل والمعرض' : 'Details & Gallery'}
                    </Link>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: VEHICLE IMAGE WITH CABIN TOGGLE */}
              <div className="lg:col-span-6 relative">
                <div className="relative aspect-[16/10] bg-navy-card rounded-2xl p-4 flex items-center justify-center overflow-hidden border border-gold/20 shadow-lg">
                  {/* Step Inside VIP Toggle */}
                  <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 z-10 flex items-center bg-navy/90 backdrop-blur-md p-1 rounded-xl border border-gold/40 text-xs">
                    <button
                      type="button"
                      onClick={() => setFleetView((prev) => ({ ...prev, [currentCar.id]: 'ext' }))}
                      className={`px-3 py-1 rounded-lg font-medium transition-all ${
                        !isInsideView
                          ? 'bg-gold text-ink font-bold shadow-xs'
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      {locale === 'ar' ? 'الخارج' : 'Exterior'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setFleetView((prev) => ({ ...prev, [currentCar.id]: 'int' }))}
                      className={`px-3 py-1 rounded-lg font-medium transition-all ${
                        isInsideView
                          ? 'bg-gold text-ink font-bold shadow-xs'
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      {locale === 'ar' ? 'المقصورة VIP' : 'Inside VIP'}
                    </button>
                  </div>

                  <Image
                    src={isInsideView ? currentCar.intImg : currentCar.extImg}
                    alt={`${currentCar.name} ${isInsideView ? 'Interior' : 'Exterior'}`}
                    width={560}
                    height={360}
                    className="w-full h-full object-contain transition-all duration-500"
                  />
                </div>

                {/* SLIDER CONTROLS */}
                <div className="flex items-center justify-between mt-4">
                  {/* Dots */}
                  <div className="flex items-center gap-2">
                    {FLEET_VEHICLES.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActiveFleetIndex(i)}
                        aria-label={`Select vehicle ${i + 1}`}
                        className={`h-2 rounded-full transition-all ${
                          activeFleetIndex === i
                            ? 'w-6 bg-gold'
                            : 'w-2 bg-white/30 hover:bg-white/60'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Arrows */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveFleetIndex((prev) => (prev > 0 ? prev - 1 : FLEET_VEHICLES.length - 1))
                      }
                      aria-label="Previous vehicle"
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveFleetIndex((prev) => (prev < FLEET_VEHICLES.length - 1 ? prev + 1 : 0))
                      }
                      aria-label="Next vehicle"
                      className="w-9 h-9 rounded-full bg-gold hover:bg-gold-hover text-ink flex items-center justify-center transition-colors font-bold shadow-xs"
                    >
                      <ChevronRight className="w-5 h-5 rtl:rotate-180" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ALL 4 VEHICLES COMPARISON GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FLEET_VEHICLES.map((car, idx) => (
              <div
                key={car.id}
                onClick={() => setActiveFleetIndex(idx)}
                className={`bg-surface rounded-2xl p-5 border transition-all cursor-pointer text-start ${
                  activeFleetIndex === idx
                    ? 'border-2 border-gold shadow-md bg-gold-soft/20'
                    : 'border-border hover:border-gold-line shadow-xs'
                }`}
              >
                <div className="relative aspect-[16/10] bg-bg-alt/60 rounded-xl p-3 flex items-center justify-center mb-4">
                  <Image
                    src={car.extImg}
                    alt={car.name}
                    width={280}
                    height={180}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-[10px] font-bold text-gold-dark uppercase tracking-wider block mb-1">
                  {car.category}
                </span>
                <h4 className="font-display font-bold text-base text-ink mb-2">
                  {car.name}
                </h4>
                <div className="flex items-center justify-between text-xs text-ink-muted pt-3 border-t border-border">
                  <span>{locale === 'ar' ? `${car.passengers} ركاب` : `${car.passengers} Pax`}</span>
                  <span className="font-bold text-gold-dark">
                    {locale === 'ar' ? `من ${formatPrice(car.startingPriceSAR)}` : `From ${formatPrice(car.startingPriceSAR)}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 8: DESIGNED TO EXCEED EXPECTATIONS (Screenshots 4, 5)  */}
      {/* ============================================================== */}
      <section id="services" className="py-16 md:py-24 bg-bg border-t border-border text-start">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* HEADER */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-3">
              <Award className="w-3.5 h-3.5 text-gold-dark" />
              <span>{locale === 'ar' ? 'خدمات متميزة لضيوف الرحمن' : 'Executive Services'}</span>
            </div>
            <h2 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight">
              {locale === 'ar' ? 'مصممة لتتجاوز توقعاتك' : 'Designed to Exceed Expectations'}
            </h2>
            <p className="mt-3 text-ink-muted text-base md:text-lg leading-relaxed font-light">
              {locale === 'ar'
                ? 'خدمات نقل خاصة ومخصصة صُممت لتمنح المعتمر وزواره أعلى درجات الراحة والسكينة والتركيز في العبادة.'
                : 'Tailored chauffeur services designed for the comfort, dignity, and spiritual focus of every pilgrim.'}
            </p>
          </div>

          {/* 4 FULL-BLEED PHOTOGRAPHY CARDS (From Screenshots 4 & 5) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {SERVICE_SHOWCASE.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className="group relative rounded-3xl overflow-hidden aspect-[3/4] bg-navy flex flex-col justify-end p-6 border border-border shadow-md hover:shadow-xl transition-all"
                >
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover opacity-60 group-hover:scale-105 group-hover:opacity-75 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />

                  <div className="relative z-10 space-y-2 text-start">
                    <div className="w-10 h-10 rounded-full bg-gold/90 text-ink flex items-center justify-center shadow-md">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-white leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/80 font-light leading-snug">
                      {item.subtitle}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center">
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-btn bg-gold hover:bg-gold-hover text-ink font-bold text-xs uppercase tracking-wider shadow-xs transition-colors"
            >
              <span>{locale === 'ar' ? 'عرض جميع الخدمات' : 'View All Services'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 9: VERIFIED TESTIMONIALS & COMPREHENSIVE FAQS           */}
      {/* ============================================================== */}
      <section className="py-16 md:py-24 bg-alabaster border-t border-border text-start">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* TESTIMONIALS */}
          <div className="mb-20">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-3">
                <Star className="w-3.5 h-3.5 fill-gold-dark text-gold-dark" />
                <span>{locale === 'ar' ? 'تجارب المعتمرين الموثوقة' : 'Verified Pilgrim Experiences'}</span>
              </div>
              <h2 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight">
                {locale === 'ar' ? 'موثوق من آلاف ضيوف الرحمن' : 'Trusted by Thousands of Travelers'}
              </h2>
              <p className="mt-3 text-ink-muted text-base font-light">
                {locale === 'ar'
                  ? 'شهادات حقيقية من معتمرين وزوار من بريطانيا وماليزيا ومصر ودول الخليج.'
                  : 'Real testimonials from pilgrims who experienced our punctual, comfortable VIP service.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {REVIEWS.map((rev, idx) => (
                <div
                  key={idx}
                  className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-1 text-gold mb-4">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-ink-light font-light leading-relaxed mb-6 italic">
                      "{rev.comment}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border flex items-center justify-between">
                    <div>
                      <span className="font-display font-bold text-sm text-ink block">
                        {rev.name}
                      </span>
                      <span className="text-[11px] text-ink-muted block">
                        {rev.origin} • {rev.role}
                      </span>
                    </div>
                    <span className="text-[10px] text-gold-dark font-semibold bg-gold-soft px-2 py-0.5 rounded-md border border-gold-line">
                      Verified
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* COMPREHENSIVE FAQ ACCORDION */}
          <div id="faq" className="max-w-4xl mx-auto pt-8">
            <div className="text-center mb-12">
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-ink">
                {locale === 'ar' ? 'الأسئلة الشائعة لضيوف الرحمن' : 'Frequently Asked Questions'}
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted mt-2 font-light">
                {locale === 'ar'
                  ? 'إجابات واضحة وموثوقة عن إجراءات الاستقبال، وسياسة الدفع، وإلغاء الرحلات.'
                  : 'Clear answers covering airport pickups, payment terms, and Miqat arrangements.'}
              </p>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="bg-surface rounded-2xl border border-border shadow-xs overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="w-full min-h-[56px] px-6 py-4 flex items-center justify-between gap-4 text-start font-display font-bold text-base sm:text-lg text-ink hover:text-gold-dark transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span>{faq.q}</span>
                      <div className="w-8 h-8 rounded-full bg-bg-alt flex items-center justify-center shrink-0 text-ink-muted">
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-ink-muted leading-relaxed font-light border-t border-border/50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* FINAL EXECUTIVE CTA BAND (Screenshot 13 "Book with Confidence")*/}
      {/* ============================================================== */}
      <section className="py-16 md:py-20 bg-navy text-white border-t border-navy-border text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/15 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-xs font-bold text-gold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{locale === 'ar' ? 'احجز بثقة تامة' : 'Book with Confidence'}</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            {locale === 'ar' ? 'جاهز لرحلة عمرة ميسرة ومريحة؟' : 'Ready for a Peaceful & Dignified Umrah?'}
          </h2>

          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
            {locale === 'ar'
              ? 'احجز سيارتك الخاصة الآن بسعر ثابت وبدون أي دفعة مقدمة؛ فريقنا على واتساب جاهز لتأكيد حجزك والإجابة عن أي استفسار.'
              : 'Reserve your private chauffeur with zero advance deposit, guaranteed fixed rates, and instant 24/7 WhatsApp confirmation.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/${locale}/booking`}
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-8 py-3.5 rounded-btn bg-gold text-ink font-bold text-xs uppercase tracking-wider hover:bg-gold-hover hover:text-white transition-all shadow-gold"
            >
              <span>{locale === 'ar' ? 'احجز رحلتك الآن' : 'Book Your Chauffeur'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
            <a
              href={`https://wa.me/${settings.whatsapp_number}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3.5 rounded-btn bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{locale === 'ar' ? 'محادثة وتأكيد واتساب' : 'Book on WhatsApp'}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
