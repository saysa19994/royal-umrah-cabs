'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import type { SiteSettings } from '@/lib/settings';
import { useCurrency } from '@/context/CurrencyContext';
import { APPROVED_5_FLEET, ApprovedFleetVehicle } from '@/data/approved-fleet-homepage';
import { Users, Briefcase, Check, ShieldCheck, Clock, Phone, MessageCircle, Star, ArrowRight, ArrowLeft } from 'lucide-react';

interface SaudiHospitalityHomepageProps {
  locale: Locale;
  dict: Dictionary;
  settings?: SiteSettings;
  vehicles?: any[];
}

export function SaudiHospitalityHomepage({
  locale,
  dict,
  settings,
}: SaudiHospitalityHomepageProps) {
  const router = useRouter();
  const { formatPrice, currency } = useCurrency();

  const isAr = locale === 'ar';
  const isUr = locale === 'ur';
  const isRtl = isAr || isUr;

  // Booking Form State - Clean unselected placeholders
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [passengers, setPassengers] = useState('');

  // Real Customer Reviews State
  const [customerReviews, setCustomerReviews] = useState<any[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  // Fetch approved published reviews from the customer reviews system
  useEffect(() => {
    fetch('/api/reviews?limit=3&sort=newest')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success && Array.isArray(data.reviews)) {
          setCustomerReviews(data.reviews);
        }
      })
      .catch(() => {})
      .finally(() => setReviewsLoading(false));
  }, []);

  // Interactive UI State
  const [activeCityTab, setActiveCityTab] = useState<'makkah' | 'madinah'>('makkah');
  const [activeFleetIndex, setActiveFleetIndex] = useState(0);
  const [viewCabinInterior, setViewCabinInterior] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showMobileSticky, setShowMobileSticky] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const fleetCarouselRef = useRef<HTMLDivElement>(null);

  // Set min travel date to today
  const minDate = useMemo(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }, []);

  // Handle responsive hero video loading
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const mobileQuery = window.matchMedia('(max-width: 760px)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateVideoSource = () => {
      if (reducedMotionQuery.matches) {
        video.pause();
        return;
      }

      const isMobile = mobileQuery.matches;
      const targetWebm = isMobile
        ? '/assets/homepage-v2/hero-mobile.webm'
        : '/assets/homepage-v2/hero.webm';
      const targetMp4 = isMobile
        ? '/assets/homepage-v2/hero-mobile.mp4'
        : '/assets/homepage-v2/hero.mp4';

      let changed = false;
      const sources = video.querySelectorAll('source');
      sources.forEach((src) => {
        if (src.type === 'video/webm' && src.src !== targetWebm) {
          src.src = targetWebm;
          changed = true;
        } else if (src.type === 'video/mp4' && src.src !== targetMp4) {
          src.src = targetMp4;
          changed = true;
        }
      });

      if (changed) {
        video.load();
        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(() => {});
        }
      }
    };

    updateVideoSource();
    mobileQuery.addEventListener('change', updateVideoSource);
    reducedMotionQuery.addEventListener('change', updateVideoSource);

    return () => {
      mobileQuery.removeEventListener('change', updateVideoSource);
      reducedMotionQuery.removeEventListener('change', updateVideoSource);
    };
  }, []);

  // Context-aware sticky mobile booking action: appears after booking form scrolls away
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth > 760) {
        setShowMobileSticky(false);
        return;
      }
      const bookingEl = document.getElementById('booking');
      const footerEl = document.getElementById('footer');
      const scrollY = window.scrollY;

      if (scrollY < 420) {
        setShowMobileSticky(false);
        return;
      }

      let bookingVisible = false;
      let footerVisible = false;

      if (bookingEl) {
        const rect = bookingEl.getBoundingClientRect();
        bookingVisible = rect.top < window.innerHeight && rect.bottom > 0;
      }
      if (footerEl) {
        const rect = footerEl.getBoundingClientRect();
        footerVisible = rect.top < window.innerHeight && rect.bottom > 0;
      }

      setShowMobileSticky(!bookingVisible && !footerVisible);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pickup === destination) {
      setToastMessage(
        isAr
          ? 'يرجى اختيار نقطة انطلاق ووجهة مختلفتين.'
          : 'Please select two different pickup and destination locations.'
      );
      setTimeout(() => setToastMessage(null), 4500);
      return;
    }

    // Connect to full booking flow with query parameters
    const query = new URLSearchParams({
      pickup,
      destination,
      date: travelDate,
      time: pickupTime,
      passengers,
    });
    router.push(`/${locale}/booking?${query.toString()}`);
  };

  const scrollToFleetItem = (index: number) => {
    setActiveFleetIndex(index);
    if (fleetCarouselRef.current) {
      const items = fleetCarouselRef.current.children;
      if (items[index]) {
        (items[index] as HTMLElement).scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  };

  // Translations
  const t = useMemo(() => {
    return {
      heroKicker: isAr ? 'رحلات خاصة فاخرة • المملكة العربية السعودية' : 'Private luxury journeys • Saudi Arabia',
      heroTitle1: isAr ? 'سكينة ووقار تليق بمقام' : 'Serenity & dignity for',
      heroTitle2: isAr ? 'رحلتكم المباركة.' : 'your blessed journey.',
      heroLead: isAr
        ? 'خدمة نقل وسائق خاص كونسيرج لضيوف الرحمن والعائلات والمسافرين عبر مدن ومطارات المملكة العربية السعودية.'
        : 'Premium private chauffeur transportation for Umrah pilgrims, families and travelers across Saudi Arabia.',
      heroBookBtn: isAr ? 'احجز رحلتك الخاصة الآن' : 'Book your private ride',
      heroFleetBtn: isAr ? 'استكشف أسطولنا الفاخر' : 'Explore our fleet',
      heroNote: isAr
        ? 'أسعار ثابتة شاملة الضريبة • سائقون محترفون • الدفع نقداً عند الوصول'
        : 'Fixed fares • Professional chauffeurs • 100% Cash on arrival',

      // Quick Booking
      bookingEyebrow: isAr ? 'خطط لرحلتك' : 'PLAN YOUR RIDE',
      bookingHeading: isAr ? 'إلى أين ترغب بالتوجه؟' : 'Where would you like to go?',
      bookingDesc: isAr
        ? 'اختر مسارك وتفاصيل سفرك لاستعراض الفئة والسيارة والأسعار المعتمدة لرحلتك.'
        : 'Choose your route and travel details to explore approved vehicles and exact fares.',
      pickupLabel: isAr ? 'نقطة الانطلاق (الاستلام)' : 'Pickup location',
      destLabel: isAr ? 'الوجهة المقصودة' : 'Destination',
      dateLabel: isAr ? 'تاريخ السفر' : 'Travel date',
      timeLabel: isAr ? 'وقت الوصول / الرحلة' : 'Pickup time',
      paxLabel: isAr ? 'عدد الركاب' : 'Passengers',
      submitBtn: isAr ? 'إرسال طلب الحجز' : 'Submit Booking Request',
      placeholderPickup: isAr ? 'اختر نقطة الانطلاق...' : 'Select pickup location...',
      placeholderDest: isAr ? 'اختر الوجهة المقصودة...' : 'Select destination...',
      placeholderDate: isAr ? 'اختر تاريخ السفر' : 'Select travel date',
      placeholderTime: isAr ? 'وقت الوصول / الرحلة' : 'Pickup time',
      placeholderPax: isAr ? 'اختر عدد الركاب...' : 'Select passengers...',

      locJeddahAirport: isAr ? 'مطار جدة (KAIA) صالة 1 والشمالية' : 'Jeddah Airport (KAIA)',
      locMakkahHotel: isAr ? 'فندق مكة المكرمة / الحرم الشريف' : 'Makkah Hotel / Haram',
      locMadinahAirport: isAr ? 'مطار المدينة المنورة (الأمير محمد)' : 'Madinah Airport (AMIA)',
      locMadinahHotel: isAr ? 'فندق المدينة المنورة / المسجد النبوي' : 'Madinah Hotel',
      locTaif: isAr ? 'الطائف / الهدا والشفا' : 'Taif',
      locRiyadh: isAr ? 'الرياض' : 'Riyadh',
      locMakkahZiyarat: isAr ? 'مزارات مكة المكرمة (2.5 ساعة معتمدة)' : 'Makkah Ziyarat (2.5h)',
      locMadinahZiyarat: isAr ? 'مزارات المدينة المنورة (مسار مرن)' : 'Madinah Ziyarat',

      pax1: isAr ? '1–3 ركاب (سيدان تنفيذي)' : '1–3 Passengers (Sedan)',
      pax2: isAr ? '4–5 ركاب (فان عائلي فاخر)' : '4–5 Passengers (Family MPV)',
      pax3: isAr ? '6–7 ركاب (دفع رباعي يوكون XL)' : '6–7 Passengers (Yukon XL)',
      pax4: isAr ? '8–10 ركاب (هايس رويال)' : '8–10 Passengers (HiAce Royal)',
      pax5: isAr ? '11–21 راكب (حافلة كوستر VIP)' : '11–21 Passengers (Coaster VIP)',

      assuranceCash: isAr ? '100% الدفع نقداً للسائق' : '100% Cash to driver',
      assuranceCashSub: isAr ? 'بعد اكتمال الرحلة بالريال أو الدولار' : 'after trip completion (SAR / USD)',
      assuranceTax: isAr ? 'الضريبة والوقود ورسوم الطرق' : 'VAT, fuel & tolls',
      assuranceTaxSub: isAr ? 'مشمولة بالكامل في السعر' : 'fully included in fare',
      assuranceCancel: isAr ? 'إلغاء وتعديل مجاني' : 'Free cancellation',
      assuranceCancelSub: isAr ? 'حتى 24 ساعة قبل الرحلة' : 'up to 24h before',

      // Trust Strip
      trustChauffeurs: isAr ? 'سائقون محترفون ومعتمدون' : 'Verified Chauffeurs',
      trustChauffeursSub: isAr ? 'مرخصون بأعلى معايير اللباقة والأمان' : 'Licensed professional drivers',
      trustFares: isAr ? 'أسعار ثابتة وشفافة' : 'Transparent Fixed Fares',
      trustFaresSub: isAr ? 'تشمل الضريبة والطرق والمواقف' : 'Includes VAT, fuel & road fees',
      trustPay: isAr ? 'الدفع عند الوصول' : 'Pay on Arrival',
      trustPaySub: isAr ? 'نقداً لسائقك بعد نهاية الرحلة' : 'Cash directly to your driver',
      trustFlight: isAr ? 'تتبع مواعيد الطيران' : 'Flight Tracking',
      trustFlightSub: isAr ? 'متابعة مواعيد الهبوط والتأخير' : 'Airport delays accommodated',
      trustWait: isAr ? 'انتظار مجاني بالمطار' : 'Complimentary Wait',
      trustWaitSub: isAr ? '60 دقيقة انتظار مشمولة مجاناً' : '60 mins airport waiting included',

      // How it works
      stepsEyebrow: isAr ? 'حجز سلس وموثوق' : 'Seamless booking',
      stepsTitle: isAr ? 'ثلاث خطوات بسيطة لرحلتك الخاصة' : 'Three simple steps to your private ride.',
      stepsLead: isAr
        ? 'منذ لحظة إرسال طلبك وحتى استقبال سائقك الخاص، نضمن لك وصولاً كريماً ومواعيد دقيقة بدون أي إجهاد.'
        : 'From initial inquiry to meeting your chauffeur, we ensure your Umrah journey is dignified, punctual and stress-free.',
      step1Num: '01',
      step1Title: isAr ? 'حدد مسارك وفئتك المفضلة' : 'Select your route & vehicle',
      step1Desc: isAr ? 'اختر نقطة الاستلام، وجهتك، الموعد وفئة السيارة المناسبة لعدد ركابك وحقائبك.' : 'Choose your pickup, destination, date and preferred vehicle category.',
      step2Num: '02',
      step2Title: isAr ? 'مراجعة وتأكيد الحجز' : 'Review & Confirm Journey',
      step2Desc: isAr ? 'يتم تأكيد تفاصيل رحلتك وسائقك مباشرة بدون أي دفع إلكتروني مسبق أو بطاقة بنكية.' : 'Your chauffeur details and meeting point are confirmed with zero advance payment.',
      step3Num: '03',
      step3Title: isAr ? 'التق بسائقك وسدد بعد الوصول' : 'Meet your chauffeur & pay',
      step3Desc: isAr ? 'استمتع برحلتك الخاصة الفاخرة وسدد التكلفة نقداً لسائقك بعد وصولك سالماً لوجهتك بالريال أو الدولار.' : 'Enjoy your private journey and pay your driver in cash after the trip is completed.',
      startBookingBtn: isAr ? 'ابدأ حجزك الآن' : 'Start your booking',

      // Popular routes
      routesEyebrow: isAr ? 'المسارات الأكثر طلباً' : 'Popular routes',
      routesTitle: isAr ? 'مسارات يسافر بها ضيوفنا بكل طمأنينة' : 'Routes pilgrims travel with confidence.',
      routesLead: isAr
        ? 'استكشف أهم رحلات النقل الخاص بين المطارات والمشاعر المقدسة. الأسعار المعروضة بالريال والدولار لراحتكم.'
        : 'Explore some of our most requested private transfers. Choose your vehicle to see the fare for your exact journey.',
      r1Type: isAr ? 'توصيل مطار' : 'Airport transfer',
      r1Title: isAr ? 'من مطار جدة (KAIA) إلى مكة المكرمة' : 'From Jeddah Airport (KAIA) to Makkah',
      r1Fare: 200,
      r2Type: isAr ? 'بين المدن' : 'Intercity journey',
      r2Title: isAr ? 'من مكة المكرمة إلى المدينة المنورة' : 'From Makkah to Madinah',
      r2Fare: 400,
      r3Type: isAr ? 'توصيل مطار' : 'Airport transfer',
      r3Title: isAr ? 'من مطار المدينة المنورة إلى فنادق المدينة' : 'From Madinah Airport to Madinah Hotels',
      r3Fare: 200,
      fareStarting: isAr ? 'يبدأ من' : 'Starting fare',
      pricingNote: isAr
        ? 'الأسعار المعروضة هي أسعار بداية المسار لفئة السيدان المعتمدة. جميع الأسعار شاملة لضريبة القيمة المضافة، الوقود، ورسوم الطرق السريعة ومواقف المطار.'
        : 'Starting fares shown are for approved sedan category. All fares include VAT, fuel, road tolls and airport parking.',

      // Fleet
      fleetEyebrow: isAr ? 'أسطول ضيوف الرحمن المعتمد' : 'The Duyuf approved fleet',
      fleetTitle: isAr ? 'خمس فئات سيارات معتمدة تلائم كل مسار' : 'Five approved vehicle categories for every need.',
      fleetLead: isAr
        ? 'أسطول متكامل يشمل سيارات السيدان التنفيذية، الفانات العائلية، سيارات الدفع الرباعي الرئاسية، وحافلات المجموعات، بمواصفات حقيقية وسعة ركاب وحقائب دقيقة.'
        : 'From executive sedans and family MPVs to presidential SUVs and group coaches, with accurate passenger and luggage capacities.',
      tabCamry: isAr ? 'تويوتا كامري' : 'Camry',
      tabStaria: isAr ? 'هيونداي ستاريا VIP' : 'Staria VIP',
      tabYukon: isAr ? 'جي إم سي يوكون XL' : 'Yukon XL',
      tabHiAce: isAr ? 'تويوتا هايس' : 'HiAce',
      tabCoaster: isAr ? 'تويوتا كوستر VIP' : 'Coaster VIP',
      fleetBookVehicleBtn: isAr ? 'احجز هذه الفئة الآن' : 'Book this vehicle',
      fleetSpecsPassengers: isAr ? 'الركاب' : 'Passengers',
      fleetSpecsLuggage: isAr ? 'الحقائب' : 'Luggage',
      fleetStartingPrice: isAr ? 'السعر يبدأ من' : 'Starting from',
      toggleExterior: isAr ? 'الهيكل الخارجي' : 'Studio Exterior',
      toggleInterior: isAr ? 'المقصورة الملكية' : 'VIP Interior',

      // Services
      servicesEyebrow: isAr ? 'خدماتنا الخاصة' : 'Our services',
      servicesTitle: isAr ? 'خدمات نقل صُممت خصيصاً لراحتكم' : 'Transportation designed around you.',
      servicesLead: isAr
        ? 'نقل خاص مدروس بعناية لاستقبال المطارات، التنقل بين المدن، وزيارة المعالم الدينية والتاريخية.'
        : 'Private transportation for airport arrivals, journeys between cities and visits across the Holy Cities.',
      s1Num: isAr ? '01 / خدمة' : '01 / SERVICE',
      s1Title: isAr ? 'استقبال وتوصيل المطارات' : 'Airport transfers',
      s1Desc: isAr
        ? 'استقبال كونسيرج خاص في صالات مطار الملك عبد العزيز بجدة ومطار المدينة مع تتبع مجاني للرحلات وانتظار 60 دقيقة.'
        : 'Private meet and greet at Jeddah (KAIA) and Madinah airports with complimentary flight tracking and 60m waiting time.',
      s1Link: isAr ? 'احجز توصيل المطار' : 'Book airport ride',

      s2Num: isAr ? '02 / خدمة' : '02 / SERVICE',
      s2Title: isAr ? 'التنقل بين المدن' : 'Intercity travel',
      s2Desc: isAr
        ? 'رحلات مباشرة من الباب إلى الباب بين مكة المكرمة، المدينة المنورة، جدة، الطائف والرياض عبر أحدث الطرق السريعة.'
        : 'Direct door-to-door private transfers between Makkah, Madinah, Jeddah, Taif and Riyadh on comfortable highways.',
      s2Link: isAr ? 'احجز رحلة بين المدن' : 'Book intercity transfer',

      s3Num: isAr ? '03 / خدمة' : '03 / SERVICE',
      s3Title: isAr ? 'مزارات المشاعر والمدن المقدسة' : 'Holy City Ziyarat',
      s3Desc: isAr
        ? 'جولات خاصة إلى المعالم التاريخية والمساجد العريقة في مكة المكرمة (2.5 ساعة معتمدة) والمدينة المنورة مع سائقين ذوي دراية.'
        : 'Guided private tours to sacred historical sites in Makkah (2.5 hours strictly) and Madinah with knowledgeable local chauffeurs.',
      s3Link: isAr ? 'استكشف جولات المزارات' : 'Explore Ziyarat tours',

      // Ziyarat
      ziyaratEyebrow: isAr ? 'تجارب المزارات الدينية' : 'Ziyarat experiences',
      ziyaratTitle: isAr ? 'معالم مقدسة تزورها بكل سكينة وراحة' : 'Sacred landmarks visited in peace and comfort.',
      ziyaratLead: isAr
        ? 'أثْرِ رحلتك الإيمانية بزيارة خاصة مريحة لأهم المساجد والجبال التاريخية في مكة المكرمة والمدينة المنورة.'
        : 'Enrich your pilgrimage with a private visit to significant historical mosques and mountains in Makkah and Madinah.',
      tabMakkahLabel: isAr ? 'مزارات مكة المكرمة (2.5 ساعة معتمدة)' : 'Makkah Ziyarat (2.5 hrs strictly)',
      tabMadinahLabel: isAr ? 'مزارات المدينة المنورة (مسار مرن)' : 'Madinah Ziyarat (Flexible)',
      bookZiyaratBtn: isAr ? 'احجز جولة المزارات الآن' : 'Book Ziyarat tour',

      // Why choose
      whyEyebrow: isAr ? 'لماذا تختار ضيوف الرحمن' : 'Why choose Duyuf Al Rahman',
      whyTitle: isAr ? 'خدمة رفيعة المستوى لضيوف كرام' : 'Attentive service for distinguished guests.',
      whyLead: isAr
        ? 'نتشرف بالاسم الذي نحمله: خدمة ضيوف الرحمن بأقصى درجات الإكرام، الراحة، التواضع، ودقة المواعيد.'
        : 'We honor our name: serving the guests of the Most Merciful with humility, utmost comfort and punctuality.',
      b1Title: isAr ? 'سائقون محترفون ومخولون' : 'Vetted Professional Drivers',
      b1Desc: isAr ? 'سائقون مهذبون، على دراية تامة بكافة الطرق ومعالم الحرمين، بسجلات قيادة ناصعة.' : 'Courteous, knowledgeable chauffeurs with spotless driving records.',
      b2Title: isAr ? 'أسعار ثابتة وشفافة' : 'Fixed Transparent Fares',
      b2Desc: isAr ? 'لا رسوم مخفية، لا زيادات مفاجئة في أوقات الذروة، ورسوم الطرق والوقود مشمولة.' : 'No hidden surge pricing, toll charges or parking fees.',
      b3Title: isAr ? 'تتبع الطيران وانتظار مجاني' : 'Flight Monitoring & Wait',
      b3Desc: isAr ? 'متابعة مواعيد الطيران في مطاري جدة والمدينة مع نافذة انتظار 60 دقيقة مشمولة مجاناً.' : 'Complimentary 60-minute airport waiting window with active flight tracking.',
      b4Title: isAr ? 'أسطول حديث ومكيف بأعلى كفاءة' : 'Pristine Modern Fleet',
      b4Desc: isAr ? 'تكييف هواء فائق الكفاءة، مقاعد وثيرة ومريحة، وضيافة بماء زمزم المبرد.' : 'High-efficiency dual A/C, reclining seats and complimentary chilled Zamzam.',

      // Reviews
      reviewsEyebrow: isAr ? 'آراء ضيوفنا المعتمدة' : 'Verified Guest Reviews',
      reviewsTitle: isAr ? 'الثقة تُبنى رحلة تلو الأخرى' : 'Trust is built one journey at a time.',
      reviewsLead: isAr
        ? 'نظام التقييمات الموثق لضيوف الرحمن VIP. تقييمات حقيقية من معتمرين ومسافرين بدون أي محتوى مولد أو مصطنع.'
        : 'Authentic feedback from pilgrims and travelers safely transferred across Makkah, Madinah and Jeddah.',
      reviewsHeading: isAr ? 'تقييمات حقيقية.\nموثقة بنسبة 100%.' : 'Authentic journeys.\n100% verified feedback.',
      reviewsDesc: isAr ? 'تخضع تقييماتنا لرقابة الجودة للتأكد من أن كل رأي ينتمي لرحلة تم تنفيذها بنجاح.' : 'Every review belongs to a completed guest journey verified by our dispatch team.',
      reviewsViewAll: isAr ? 'استعرض كافة آراء الضيوف الموثقة' : 'View all verified guest reviews',

      // FAQ
      faqEyebrow: isAr ? 'الأسئلة الشائعة' : 'Frequently asked questions',
      faqTitle: isAr ? 'إجابات واضحة قبل أن تسافر' : 'Answers before you travel.',
      faqLead: isAr ? 'معلومات شفافة حول الأسعار، استقبال المطارات، وسائل الدفع ورحلتكم.' : 'Clear information about fares, airport pickups, payment and your journey.',

      // Final CTA
      ctaEyebrow: isAr ? 'رحلتكم تبدأ هنا' : 'Your journey starts here',
      ctaTitle: isAr ? 'سافر بكل راحة واطمئنان،\nواستمتع برحلتك المباركة.' : 'Travel with comfort.\nArrive with peace of mind.',
      ctaDesc: isAr
        ? 'رتب رحلتك مع سائقك الخاص عبر المملكة العربية السعودية بأسعار واضحة وخدمة كونسيرج شخصية.'
        : 'Arrange your private chauffeur journey across Saudi Arabia with clear fares and attentive service.',
      ctaExploreRoutes: isAr ? 'استكشف أهم المسارات' : 'Explore popular routes',

      // Sticky Mobile Bar
      stickyBarBtn: isAr ? 'احجز رحلتك الخاصة الآن' : 'Book your private ride',
    };
  }, [isAr]);

  // Ziyarat city data
  const cityData = useMemo(() => {
    return {
      makkah: {
        caption: isAr
          ? 'مزارات مكة المكرمة • خدمة معتمدة لمدة 2.5 ساعة محددة'
          : 'Makkah Ziyarat • 2.5-hour strictly approved tour',
        title: isAr ? 'مكة المكرمة' : 'Makkah Al-Mukarramah',
        text: isAr
          ? 'خدمة نقل خاصة لزيارة أهم المعالم والمساجد التاريخية حول المسجد الحرام.'
          : 'Private transportation for visits around the Holy City.',
        image: '/assets/homepage-v2/ziyarat-haram.jpg',
        alt: isAr ? 'المسجد الحرام في مكة المكرمة' : 'Masjid al-Haram in Makkah',
        items: [
          [
            isAr ? 'المسجد الحرام والكعبة المشرفة' : 'Masjid al-Haram',
            isAr ? 'المقصد المركزي وأشرف بقاع الأرض' : 'Central destination in Makkah',
          ],
          [
            isAr ? 'جبل النور وغار حراء' : 'Jabal al-Nour',
            isAr ? 'موقع نزول الوحي الأول في صدر الإسلام' : 'Historic site near Makkah',
          ],
          [
            isAr ? 'جبل ثور وغار ثور' : 'Jabal Thawr',
            isAr ? 'المعلم التاريخي المرتبط بالهجرة النبوية' : 'Historic site associated with the Hijrah',
          ],
          [
            isAr ? 'مسجد عائشة (التنعيم)' : 'Masjid Aisha (Al-Taneem)',
            isAr ? 'ميقات أهل مكة المعتمد للإحرام بالعمرة' : 'Miqat mosque north of Makkah',
          ],
        ],
      },
      madinah: {
        caption: isAr
          ? 'مزارات المدينة المنورة • مسار مريح وجدول مرن'
          : 'Madinah Ziyarat • flexible itinerary',
        title: isAr ? 'المدينة المنورة' : 'Madinah Al-Munawwarah',
        text: isAr
          ? 'نقل خاص لزيارة المعالم المباركة في مدينة المصطفى صلى الله عليه وسلم.'
          : 'Private transportation to significant sites in the city of the Prophet’s Mosque.',
        image: '/assets/homepage-v2/service-madinah.jpg',
        alt: isAr ? 'المسجد النبوي والمعالم في المدينة المنورة' : 'Mosque architecture in Madinah',
        items: [
          [
            isAr ? 'مسجد قباء' : 'Quba Mosque',
            isAr ? 'أول مسجد أسس على التقوى في الإسلام' : 'One of Madinah’s well-known mosques',
          ],
          [
            isAr ? 'جبل أحد ومقبرة الشهداء' : 'Mount Uhud',
            isAr ? 'الجبل التاريخي وموقع معركة أحد' : 'Historic mountain north of Madinah',
          ],
          [
            isAr ? 'مسجد القبلتين' : 'Al-Qiblatayn Mosque',
            isAr ? 'المسجد التاريخي الذي صُليت فيه القبلتان' : 'Historic mosque in Madinah',
          ],
          [
            isAr ? 'موقع غزوة الخندق (المساجد السبعة)' : 'Seven Mosques (Battle of Trench)',
            isAr ? 'معلم غزوة الأحزاب الشاهد على تاريخ الإسلام' : 'Historic sites near Mount Sela',
          ],
        ],
      },
    };
  }, [isAr]);

  const currentZiyarat = cityData[activeCityTab];
  const activeFleet = APPROVED_5_FLEET[activeFleetIndex] || APPROVED_5_FLEET[0];

  return (
    <div className="w-full bg-[#F7F5F0] text-[#101827]">
      {/* Toast Notice */}
      {toastMessage && (
        <div
          role="alert"
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#101827] text-white px-5 py-3 rounded-lg text-sm shadow-xl border border-white/20 animate-fade-in"
        >
          {toastMessage}
        </div>
      )}

      {/* Hero Section with Video */}
      <section className="hero" aria-labelledby="heroTitle">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/homepage-v2/hero-poster.jpg"
          aria-hidden="true"
        >
          <source src="/assets/homepage-v2/hero.webm" type="video/webm" />
          <source src="/assets/homepage-v2/hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-shade"></div>
        <div className="hero-content">
          <p className="hero-kicker">{t.heroKicker}</p>
          <h1 id="heroTitle" className="serif">
            {t.heroTitle1}
            <br />
            {t.heroTitle2}
          </h1>
          <p className="hero-copy">{t.heroLead}</p>
          <div className="hero-actions">
            <a className="btn" href="#booking">
              {t.heroBookBtn} <span aria-hidden="true">{isRtl ? '←' : '→'}</span>
            </a>
            <a className="btn btn--outline" href="#fleet">
              {t.heroFleetBtn}
            </a>
          </div>
          <p className="hero-note">
            <span className="dot"></span> {t.heroNote}
          </p>
        </div>
      </section>

      {/* Quick Route Booking Panel */}
      <div className="booking-shell container" id="booking">
        <div className="booking-heading">
          <p className="eyebrow">{t.bookingEyebrow}</p>
          <h2 className="serif">{t.bookingHeading}</h2>
          <p>{t.bookingDesc}</p>
        </div>
        <form className="booking-panel" id="quickBooking" onSubmit={handleBookingSubmit} noValidate>
          <div className="field">
            <label htmlFor="pickup">{t.pickupLabel}</label>
            <select
              id="pickup"
              name="pickup"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              required
            >
              <option value="" disabled>{t.placeholderPickup}</option>
              <option value="jeddah_airport_t1">{t.locJeddahAirport}</option>
              <option value="makkah_hotel">{t.locMakkahHotel}</option>
              <option value="madinah_airport">{t.locMadinahAirport}</option>
              <option value="madinah_hotel">{t.locMadinahHotel}</option>
              <option value="taif">{t.locTaif}</option>
              <option value="riyadh">{t.locRiyadh}</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="destination">{t.destLabel}</label>
            <select
              id="destination"
              name="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            >
              <option value="" disabled>{t.placeholderDest}</option>
              <option value="makkah_hotel">{t.locMakkahHotel}</option>
              <option value="madinah_hotel">{t.locMadinahHotel}</option>
              <option value="jeddah_airport_t1">{t.locJeddahAirport}</option>
              <option value="madinah_airport">{t.locMadinahAirport}</option>
              <option value="makkah_ziyarat">{t.locMakkahZiyarat}</option>
              <option value="madinah_ziyarat">{t.locMadinahZiyarat}</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="travelDate">{t.dateLabel}</label>
            <input
              type="date"
              id="travelDate"
              name="travelDate"
              value={travelDate}
              min={minDate}
              onChange={(e) => setTravelDate(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="pickupTime">{t.timeLabel}</label>
            <input
              type="time"
              id="pickupTime"
              name="pickupTime"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="passengers">{t.paxLabel}</label>
            <select
              id="passengers"
              name="passengers"
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              required
            >
              <option value="" disabled>{t.placeholderPax}</option>
              <option value="1">{t.pax1}</option>
              <option value="4">{t.pax2}</option>
              <option value="6">{t.pax3}</option>
              <option value="8">{t.pax4}</option>
              <option value="15">{t.pax5}</option>
            </select>
          </div>

          <button type="submit" className="btn booking-submit">
            {t.submitBtn} <span aria-hidden="true">{isRtl ? '←' : '→'}</span>
          </button>
        </form>

        <div className="booking-assurance">
          <span>
            <strong>{t.assuranceCash}</strong> {t.assuranceCashSub}
          </span>
          <span>
            <strong>{t.assuranceTax}</strong> {t.assuranceTaxSub}
          </span>
          <span>
            <strong>{t.assuranceCancel}</strong> {t.assuranceCancelSub}
          </span>
        </div>
      </div>

      {/* Trust Strip */}
      <section className="trust-strip">
        <div className="container trust-grid">
          <div className="trust-item">
            <div className="trust-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div>
              <b>{t.trustChauffeurs}</b>
              <span>{t.trustChauffeursSub}</span>
            </div>
          </div>
          <div className="trust-item">
            <div className="trust-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <div>
              <b>{t.trustFares}</b>
              <span>{t.trustFaresSub}</span>
            </div>
          </div>
          <div className="trust-item">
            <div className="trust-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
            </div>
            <div>
              <b>{t.trustPay}</b>
              <span>{t.trustPaySub}</span>
            </div>
          </div>
          <div className="trust-item">
            <div className="trust-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            </div>
            <div>
              <b>{t.trustFlight}</b>
              <span>{t.trustFlightSub}</span>
            </div>
          </div>
          <div className="trust-item">
            <div className="trust-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div>
              <b>{t.trustWait}</b>
              <span>{t.trustWaitSub}</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section" id="how-it-works">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">{t.stepsEyebrow}</p>
              <h2 className="serif">{t.stepsTitle}</h2>
            </div>
            <p className="lead">{t.stepsLead}</p>
          </div>
          <div className="steps">
            <article className="step">
              <div className="step-top">
                <span className="step-num">{t.step1Num}</span>
                <div className="step-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </div>
              </div>
              <h3 className="serif">{t.step1Title}</h3>
              <p>{t.step1Desc}</p>
            </article>

            <article className="step">
              <div className="step-top">
                <span className="step-num">{t.step2Num}</span>
                <div className="step-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </div>
              </div>
              <h3 className="serif">{t.step2Title}</h3>
              <p>{t.step2Desc}</p>
            </article>

            <article className="step">
              <div className="step-top">
                <span className="step-num">{t.step3Num}</span>
                <div className="step-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M16 8l-8 8"/><path d="M8 8h8v8"/></svg>
                </div>
              </div>
              <h3 className="serif">{t.step3Title}</h3>
              <p>{t.step3Desc}</p>
            </article>
          </div>
          <div className="steps-foot">
            <a className="btn btn--navy" href="#booking">
              {t.startBookingBtn} <span aria-hidden="true">{isRtl ? '←' : '→'}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Popular Routes with Currency Switcher Support */}
      <section className="section section--white" id="routes">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">{t.routesEyebrow}</p>
              <h2 className="serif">{t.routesTitle}</h2>
            </div>
            <p className="lead">{t.routesLead}</p>
          </div>
          <div className="route-grid">
            <Link className="route-card" href={`/${locale}/booking?pickup=jeddah_airport_t1&destination=makkah_hotel`}>
              <div className="route-photo">
                <img
                  src="/assets/homepage-v2/route-jeddah-makkah.jpg"
                  alt={t.r1Title}
                  loading="lazy"
                />
              </div>
              <div className="route-body">
                <div className="route-meta">
                  <span>{t.r1Type}</span>
                  <span>01</span>
                </div>
                <h3 className="serif">{t.r1Title}</h3>
                <div className="route-bottom">
                  <div>
                    <span className="fare-label">{t.fareStarting}</span>
                    <span className="fare">{formatPrice(t.r1Fare)}</span>
                  </div>
                  <span className="round-arrow" aria-hidden="true">
                    {isRtl ? '←' : '→'}
                  </span>
                </div>
              </div>
            </Link>

            <Link className="route-card" href={`/${locale}/booking?pickup=makkah_hotel&destination=madinah_hotel`}>
              <div className="route-photo">
                <img
                  src="/assets/homepage-v2/route-makkah-madinah.jpg"
                  alt={t.r2Title}
                  loading="lazy"
                />
              </div>
              <div className="route-body">
                <div className="route-meta">
                  <span>{t.r2Type}</span>
                  <span>02</span>
                </div>
                <h3 className="serif">{t.r2Title}</h3>
                <div className="route-bottom">
                  <div>
                    <span className="fare-label">{t.fareStarting}</span>
                    <span className="fare">{formatPrice(t.r2Fare)}</span>
                  </div>
                  <span className="round-arrow" aria-hidden="true">
                    {isRtl ? '←' : '→'}
                  </span>
                </div>
              </div>
            </Link>

            <Link className="route-card" href={`/${locale}/booking?pickup=madinah_airport&destination=madinah_hotel`}>
              <div className="route-photo">
                <img
                  src="/assets/homepage-v2/route-madinah-hotel.jpg"
                  alt={t.r3Title}
                  loading="lazy"
                />
              </div>
              <div className="route-body">
                <div className="route-meta">
                  <span>{t.r3Type}</span>
                  <span>03</span>
                </div>
                <h3 className="serif">{t.r3Title}</h3>
                <div className="route-bottom">
                  <div>
                    <span className="fare-label">{t.fareStarting}</span>
                    <span className="fare">{formatPrice(t.r3Fare)}</span>
                  </div>
                  <span className="round-arrow" aria-hidden="true">
                    {isRtl ? '←' : '→'}
                  </span>
                </div>
              </div>
            </Link>
          </div>
          <p className="pricing-note">{t.pricingNote}</p>
        </div>
      </section>

      {/* 5 APPROVED FLEET SHOWCASE */}
      <section className="section" id="fleet">
        <div className="container">
          <div className="fleet-intro">
            <p className="eyebrow">{t.fleetEyebrow}</p>
            <h2 className="serif">{t.fleetTitle}</h2>
            <p className="lead">{t.fleetLead}</p>
          </div>

          {/* Model Selection Tabs */}
          <div className="fleet-tabs-bar" role="tablist" aria-label="Approved Fleet Models">
            {APPROVED_5_FLEET.map((veh, idx) => (
              <button
                key={veh.id}
                type="button"
                role="tab"
                aria-selected={activeFleetIndex === idx}
                onClick={() => scrollToFleetItem(idx)}
                className={`fleet-tab-btn ${activeFleetIndex === idx ? 'is-active' : ''}`}
              >
                <span>{veh.name[locale] || veh.name.ar}</span>
              </button>
            ))}
          </div>

          {/* Active Featured Showcase Panel (Desktop) */}
          <div className="fleet-featured-panel hidden md:grid">
            <div className="fleet-panel-visual">
              <img
                src={viewCabinInterior ? activeFleet.interiorImage : activeFleet.exteriorImage}
                alt={activeFleet.name[locale] || activeFleet.name.ar}
                className="fleet-main-photo"
                loading="lazy"
              />
              <div className="fleet-photo-toggle">
                <button
                  type="button"
                  onClick={() => setViewCabinInterior(false)}
                  className={`toggle-btn ${!viewCabinInterior ? 'active' : ''}`}
                >
                  {t.toggleExterior}
                </button>
                <button
                  type="button"
                  onClick={() => setViewCabinInterior(true)}
                  className={`toggle-btn ${viewCabinInterior ? 'active' : ''}`}
                >
                  {t.toggleInterior}
                </button>
              </div>
            </div>

            <div className="fleet-panel-details">
              <span className="fleet-cat-badge">
                {activeFleet.categoryBadge[locale] || activeFleet.categoryBadge.ar}
              </span>
              <h3 className="serif fleet-detail-title">
                {activeFleet.name[locale] || activeFleet.name.ar}
              </h3>
              <p className="fleet-summary-text">
                {activeFleet.summary[locale] || activeFleet.summary.ar}
              </p>

              <div className="fleet-capacity-row">
                <div className="cap-pill">
                  <Users className="w-4 h-4 text-[#A97B27]" />
                  <span>
                    <strong>{activeFleet.passengers}</strong> {t.fleetSpecsPassengers}
                  </span>
                </div>
                <div className="cap-pill">
                  <Briefcase className="w-4 h-4 text-[#A97B27]" />
                  <span>
                    <strong>{activeFleet.luggage}</strong> {t.fleetSpecsLuggage}
                  </span>
                </div>
              </div>

              <div className="fleet-features-grid">
                {(activeFleet.features[locale] || activeFleet.features.ar).map((feat, fIdx) => (
                  <div key={fIdx} className="fleet-feat-item">
                    <Check className="w-3.5 h-3.5 text-[#A97B27] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="fleet-panel-footer">
                <div className="fleet-price-col">
                  <span className="price-label">{t.fleetStartingPrice}</span>
                  <span className="price-val">{formatPrice(activeFleet.startingPriceSAR)}</span>
                </div>
                <Link
                  className="btn btn--navy fleet-book-btn"
                  href={`/${locale}/booking?vehicle=${activeFleet.bookingParam}`}
                >
                  {t.fleetBookVehicleBtn} <span aria-hidden="true">{isRtl ? '←' : '→'}</span>
                </Link>
              </div>
            </div>
          </div>

          {/* 5-Vehicle Horizontal Snap Carousel (Mobile / Tablet) */}
          <div
            ref={fleetCarouselRef}
            className="fleet-carousel-scroll flex md:hidden"
            tabIndex={0}
            aria-label="5 Fleet Vehicles Carousel"
          >
            {APPROVED_5_FLEET.map((veh, idx) => (
              <div
                key={veh.id}
                className={`fleet-mobile-card ${activeFleetIndex === idx ? 'active-card' : ''}`}
                onClick={() => setActiveFleetIndex(idx)}
              >
                <div className="mobile-card-img">
                  <img
                    src={veh.exteriorImage}
                    alt={veh.name[locale] || veh.name.ar}
                    loading="lazy"
                  />
                  <span className="mobile-badge">
                    {veh.categoryBadge[locale] || veh.categoryBadge.ar}
                  </span>
                </div>
                <div className="mobile-card-body">
                  <h4 className="serif mobile-veh-title">{veh.name[locale] || veh.name.ar}</h4>
                  <div className="mobile-veh-specs">
                    <span>
                      <Users className="w-3.5 h-3.5 inline text-[#A97B27]" /> {veh.passengers} {t.fleetSpecsPassengers}
                    </span>
                    <span>
                      <Briefcase className="w-3.5 h-3.5 inline text-[#A97B27]" /> {veh.luggage} {t.fleetSpecsLuggage}
                    </span>
                  </div>
                  <div className="mobile-card-foot">
                    <span className="mobile-price">{formatPrice(veh.startingPriceSAR)}</span>
                    <Link
                      className="btn btn--navy mobile-book-btn"
                      href={`/${locale}/booking?vehicle=${veh.bookingParam}`}
                    >
                      {t.fleetBookVehicleBtn}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Indicator Dots */}
          <div className="fleet-dots-row flex md:hidden justify-center items-center gap-2 mt-4">
            {APPROVED_5_FLEET.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => scrollToFleetItem(dotIdx)}
                className={`fleet-dot ${activeFleetIndex === dotIdx ? 'is-active' : ''}`}
                aria-label={`Select vehicle ${dotIdx + 1}`}
              />
            ))}
          </div>

          {/* View Full Catalog Link */}
          <div className="fleet-all mt-8">
            <p>
              <strong>
                {isAr
                  ? 'جميع المركبات معقمة ومجهزة بأحدث وسائل الراحة وتخضع للفحص اليومي الدقيق.'
                  : 'All vehicles are fully sanitized, climate-controlled, and inspected daily for supreme reliability.'}
              </strong>
            </p>
            <Link className="btn btn--navy fleet-cta" href={`/${locale}/fleet`}>
              {isAr ? 'استعرض كتالوج الأسطول الكامل' : 'Explore full vehicle showroom'}{' '}
              <span aria-hidden="true">{isRtl ? '←' : '→'}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section section--white" id="services">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">{t.servicesEyebrow}</p>
              <h2 className="serif">{t.servicesTitle}</h2>
            </div>
            <p className="lead">{t.servicesLead}</p>
          </div>
          <div className="service-grid">
            <div className="service-card">
              <span className="service-number">{t.s1Num}</span>
              <div className="service-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <h3 className="serif">{t.s1Title}</h3>
              <p>{t.s1Desc}</p>
              <a className="text-link" href="#booking">
                {t.s1Link} <span aria-hidden="true">{isRtl ? '←' : '→'}</span>
              </a>
            </div>

            <div className="service-card service-card--photo">
              <img
                src="/assets/homepage-v2/service-intercity.jpg"
                alt="Intercity travel"
                loading="lazy"
              />
              <span className="service-number">{t.s2Num}</span>
              <h3 className="serif">{t.s2Title}</h3>
              <p>{t.s2Desc}</p>
              <a className="text-link" href="#booking">
                {t.s2Link} <span aria-hidden="true">{isRtl ? '←' : '→'}</span>
              </a>
            </div>

            <div className="service-card">
              <span className="service-number">{t.s3Num}</span>
              <div className="service-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              </div>
              <h3 className="serif">{t.s3Title}</h3>
              <p>{t.s3Desc}</p>
              <a className="text-link" href="#ziyarat">
                {t.s3Link} <span aria-hidden="true">{isRtl ? '←' : '→'}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Ziyarat Experiences */}
      <section className="section" id="ziyarat">
        <div className="container">
          <div className="ziyarat-layout">
            <div className="ziyarat-copy">
              <p className="eyebrow">{t.ziyaratEyebrow}</p>
              <h2 className="serif">{t.ziyaratTitle}</h2>
              <p className="lead">{t.ziyaratLead}</p>

              <div className="city-tabs" role="tablist">
                <button
                  type="button"
                  role="tab"
                  id="tabMakkah"
                  aria-selected={activeCityTab === 'makkah'}
                  onClick={() => setActiveCityTab('makkah')}
                >
                  {t.tabMakkahLabel}
                </button>
                <button
                  type="button"
                  role="tab"
                  id="tabMadinah"
                  aria-selected={activeCityTab === 'madinah'}
                  onClick={() => setActiveCityTab('madinah')}
                >
                  {t.tabMadinahLabel}
                </button>
              </div>

              <p className="tour-caption">{currentZiyarat.caption}</p>
              <div className="tour-list">
                {currentZiyarat.items.map(([site, note], idx) => (
                  <div key={idx} className="tour-item">
                    <b>{site}</b>
                    <span>{note}</span>
                  </div>
                ))}
              </div>

              <Link
                className="btn btn--navy"
                style={{ marginTop: '24px' }}
                href={`/${locale}/booking?destination=${activeCityTab === 'makkah' ? 'makkah_ziyarat' : 'madinah_ziyarat'}`}
              >
                {t.bookZiyaratBtn} <span aria-hidden="true">{isRtl ? '←' : '→'}</span>
              </Link>
            </div>

            <div className="ziyarat-visual">
              <img
                src={currentZiyarat.image}
                alt={currentZiyarat.alt}
                loading="lazy"
              />
              <div className="ziyarat-caption">
                <b className="serif">{currentZiyarat.title}</b>
                <span>{currentZiyarat.text}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="section section--white" id="about">
        <div className="container why-grid">
          <div className="why-photo">
            <img
              src="/assets/homepage-v2/chauffeur-welcome.jpg"
              alt="Professional chauffeur welcoming guests"
              loading="lazy"
            />
          </div>
          <div className="why-content">
            <p className="eyebrow">{t.whyEyebrow}</p>
            <h2 className="serif">{t.whyTitle}</h2>
            <p className="lead">{t.whyLead}</p>
            <div className="benefit-list">
              <div className="benefit">
                <div className="benefit-mark" aria-hidden="true">✓</div>
                <div>
                  <b>{t.b1Title}</b>
                  <p>{t.b1Desc}</p>
                </div>
              </div>
              <div className="benefit">
                <div className="benefit-mark" aria-hidden="true">✓</div>
                <div>
                  <b>{t.b2Title}</b>
                  <p>{t.b2Desc}</p>
                </div>
              </div>
              <div className="benefit">
                <div className="benefit-mark" aria-hidden="true">✓</div>
                <div>
                  <b>{t.b3Title}</b>
                  <p>{t.b3Desc}</p>
                </div>
              </div>
              <div className="benefit">
                <div className="benefit-mark" aria-hidden="true">✓</div>
                <div>
                  <b>{t.b4Title}</b>
                  <p>{t.b4Desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section (Connected to Real Review System) */}
      <section className="section" id="reviews">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">{t.reviewsEyebrow}</p>
              <h2 className="serif">{t.reviewsTitle}</h2>
            </div>
            <p className="lead">{t.reviewsLead}</p>
          </div>

          {customerReviews && customerReviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {customerReviews.map((rev: any, idx: number) => (
                <div key={rev.id || idx} className="p-6 rounded-2xl bg-[#FBFAF7] border border-[#E7E2D9] shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 mb-3 text-[#A97B27]">
                      {Array.from({ length: 5 }).map((_, sIdx) => (
                        <span key={sIdx} className={sIdx < (rev.rating || 5) ? 'text-[#A97B27]' : 'text-gray-300'}>★</span>
                      ))}
                    </div>
                    <p className="text-sm text-[#101827] leading-relaxed mb-4 italic">“{rev.comment}”</p>
                  </div>
                  <div className="pt-3 border-t border-[#E7E2D9] flex items-center justify-between text-xs text-[#687386]">
                    <strong className="text-[#101827] font-semibold">{rev.customer_name}</strong>
                    <span>{rev.route || (isAr ? 'رحلة عمرة معتمدة' : 'Verified Umrah Transfer')}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="reviews-panel">
              <div>
                <span className="review-mark" aria-hidden="true">“</span>
                <h3 className="serif whitespace-pre-line">{t.reviewsHeading}</h3>
                <p>{t.reviewsDesc}</p>
              </div>
              <div className="review-source">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-5 h-5 text-[#A97B27]" />
                  <strong className="text-base font-bold text-[#101827]">
                    {isAr ? 'نظام المراجعات الموثقة' : 'Verified Review System'}
                  </strong>
                </div>
                <span className="text-sm leading-relaxed text-[#687386]">
                  {isAr
                    ? 'يتم نشر التقييمات حصرياً من قِبل ضيوف الرحمن الذين أتموا رحلاتهم بنجاح مع سائقينا المعتمدين. نرحب بمشاركتكم لتجربتكم المباركة معنا.'
                    : 'Reviews are exclusively published by guests who have completed their sacred journeys with our vetted chauffeurs. We welcome you to share your feedback.'}
                </span>
                <div className="mt-4 pt-3 border-t border-[#E7E3DA]">
                  <Link
                    href={`/${locale}/reviews`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#A97B27] hover:text-[#101827] transition-colors"
                  >
                    <span>{t.reviewsViewAll}</span>
                    <span aria-hidden="true">{isRtl ? '←' : '→'}</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--white" id="faq">
        <div className="container faq-grid">
          <div className="faq-side">
            <p className="eyebrow">{t.faqEyebrow}</p>
            <h2 className="serif">{t.faqTitle}</h2>
            <p className="lead">{t.faqLead}</p>
          </div>
          <div>
            <details>
              <summary>
                {isAr ? 'كيف يتم حجز الرحلة الخاصة مع ضيوف الرحمن؟' : 'How do I book a private transfer?'}
              </summary>
              <p>
                {isAr
                  ? 'اختر نقطة الانطلاق، الوجهة المقصودة، تاريخ ووقت الوصول، وفئة السيارة المناسبة. بعد تقديم بياناتك، تتلقى تأكيداً فورياً لرحلتك مع كافة بيانات السائق والتنسيق.'
                  : 'Choose your pickup, destination, travel date and vehicle, then submit your contact details. Your request is reviewed and confirmed promptly with zero hassle.'}
              </p>
            </details>
            <details>
              <summary>
                {isAr ? 'متى وكيف يتم سداد قيمة الرحلة؟' : 'When do I pay for my journey?'}
              </summary>
              <p>
                {isAr
                  ? 'يتم السداد نقداً بنسبة 100% مباشرة لسائقك الخاص بعد وصولك سالماً لوجهتك النهائية. نقبل الريال السعودي (SAR) والدولار الأمريكي (USD). لا يلزم أي دفع إلكتروني مسبق ولا أي بطاقة ائتمانية.'
                  : 'Payment is made in cash directly to your driver after the journey is completed. You can pay in SAR or USD. No advance payment, online payment or credit card is required.'}
              </p>
            </details>
            <details>
              <summary>
                {isAr ? 'هل تتابعون مواعيد وصول الرحلات الجوية في المطار؟' : 'Do you monitor flight arrivals?'}
              </summary>
              <p>
                {isAr
                  ? 'نعم، نتابع رقم رحلتك الجوية وشركة الطيران بدقة فور وصولها إلى مطار الملك عبد العزيز بجدة أو مطار الأمير محمد بالمدينة، ليتواجد سائقك في الوقت المناسب حتى لو تأخرت الرحلة.'
                  : 'Yes. Share your airline and flight number when booking an airport pickup so our operations team can monitor your arrival and coordinate your seamless pickup.'}
              </p>
            </details>
            <details>
              <summary>
                {isAr ? 'كم مدة الانتظار المجاني المشمولة في المطار؟' : 'How much airport waiting time is included?'}
              </summary>
              <p>
                {isAr
                  ? 'تشمل الخدمة 60 دقيقة انتظار مجاني في المطار منذ هبوط الطائرة الفعلي، مع مرونة كافية لإنهاء إجراءات الجوازات واستلام الأمتعة بهدوء.'
                  : '60 minutes of complimentary airport waiting are included from actual landing time, allowing ample time for immigration and baggage collection.'}
              </p>
            </details>
            <details>
              <summary>
                {isAr ? 'هل تتوفر مقاعد أطفال وكراسي سلامة للرحلات العائلية؟' : 'Can I request a child seat?'}
              </summary>
              <p>
                {isAr
                  ? 'نعم، نوفر مقاعد أطفال معتمدة مجاناً عند الطلب لراحة وأمان أطفالكم أثناء السفر بين المدن والمطارات.'
                  : 'Child seats are available on request at no extra charge. Please mention your requirement when submitting your booking request.'}
              </p>
            </details>
            <details>
              <summary>
                {isAr ? 'هل يمكن التوقف عند الميقات للإحرام أثناء الطريق؟' : 'Can we stop at the Miqat on the way?'}
              </summary>
              <p>
                {isAr
                  ? 'نعم، يشمل المسار توقفاً مجانياً ومريحاً عند الميقات المعتمد (مثل ميقات الجحفة أو السيل الكبير أو ذي الحليفة) لمدة 30–45 دقيقة للإحرام وصلاة ركعتي الإحرام.'
                  : 'A complimentary Miqat stop of approximately 30–45 minutes is included on relevant journeys for donning the Ihram and offering prayer.'}
              </p>
            </details>
            <details>
              <summary>
                {isAr ? 'ما هي سياسة الإلغاء وتعديل المواعيد؟' : 'What is the cancellation policy?'}
              </summary>
              <p>
                {isAr
                  ? 'الإلغاء وتعديل المواعيد متاح مجاناً وبدون أي رسوم حتى 24 ساعة قبل موعد انطلاق الرحلة المجدولة.'
                  : 'Free cancellation and flexible rescheduling are available up to 24 hours before the scheduled journey.'}
              </p>
            </details>
            <details>
              <summary>
                {isAr ? 'ما هي المدن والوجهات التي تشملها خدماتكم؟' : 'Which destinations do you serve?'}
              </summary>
              <p>
                {isAr
                  ? 'نغطي رحلات النقل الخاص في مكة المكرمة، المدينة المنورة، جدة (ومطار الملك عبد العزيز)، الطائف، والرياض، مع خدمات النقل الداخلي والمزارات.'
                  : 'Private transportation is available on selected routes serving Jeddah, Makkah, Madinah, Taif and Riyadh.'}
              </p>
            </details>
            <details>
              <summary>
                {isAr ? 'ما هي خيارات السيارات المعتمدة في الأسطول؟' : 'Which vehicle should I choose?'}
              </summary>
              <p>
                {isAr
                  ? 'يشمل أسطولنا المعتمد: تويوتا كامري VIP (1-3 ركاب)، هيونداي ستاريا VIP (4-5 ركاب)، جي إم سي يوكون XL (6-7 ركاب)، تويوتا هايس رويال (10 ركاب)، وتويوتا كوستر VIP (21 راكب).'
                  : 'Choose from Toyota Camry (1-3 pax), Hyundai Staria (4-5 pax), GMC Yukon XL (6-7 pax), Toyota HiAce (10 pax) and Toyota Coaster (21 pax).' }
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="container cta-grid">
          <div>
            <p className="eyebrow" style={{ color: '#D7B979' }}>
              {t.ctaEyebrow}
            </p>
            <h2 className="serif whitespace-pre-line">{t.ctaTitle}</h2>
            <p>{t.ctaDesc}</p>
            <div className="hero-actions">
              <a className="btn" href="#booking">
                {t.heroBookBtn} <span aria-hidden="true">{isRtl ? '←' : '→'}</span>
              </a>
              <a className="btn btn--outline" href="#routes">
                {t.ctaExploreRoutes}
              </a>
            </div>
          </div>
          <div className="cta-image">
            <img
              src="/assets/homepage-v2/vehicle-interior-cta.jpg"
              alt="Comfortable premium passenger vehicle interior"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Context-Aware Sticky Mobile Booking Bar */}
      <div
        className={`mobile-booking ${showMobileSticky ? 'is-visible' : ''}`}
        id="mobileStickyBar"
      >
        <a className="btn" href="#booking">
          {t.stickyBarBtn} <span aria-hidden="true">{isRtl ? '←' : '→'}</span>
        </a>
      </div>
    </div>
  );
}
