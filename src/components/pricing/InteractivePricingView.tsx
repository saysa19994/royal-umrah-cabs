'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { LocalizedPricingContent } from '@/data/pricing-page-content';
import { useCurrency } from '@/context/CurrencyContext';
import {
  Shield,
  Diamond,
  Headphones,
  Users,
  Luggage,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  MapPin,
  CheckCircle2,
  Clock,
  Handshake,
  Car,
  Plane,
  Plus,
  Minus,
} from 'lucide-react';

interface InteractivePricingViewProps {
  locale: Locale;
  dict: Dictionary;
  content: LocalizedPricingContent;
}

export function InteractivePricingView({
  locale,
  dict,
  content,
}: InteractivePricingViewProps) {
  const router = useRouter();
  const { formatPrice } = useCurrency();
  const isAr = locale === 'ar';
  const isRtl = isAr || locale === 'ur';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // Search Panel State
  const [pickup, setPickup] = useState('jeddah-airport');
  const [destination, setDestination] = useState('makkah');
  const [tripType, setTripType] = useState<'oneway' | 'roundtrip'>('oneway');

  // FAQ Accordion State (items 0, 1, 2)
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  const handleExplorePrices = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      `/${locale}/booking?pickup=${encodeURIComponent(pickup)}&destination=${encodeURIComponent(
        destination
      )}&tripType=${encodeURIComponent(tripType)}`
    );
  };

  // Vehicles list for Choose Your Vehicle section (matching Reference B & A)
  const vehiclesList = [
    {
      id: 'mercedes-s-class',
      name: isAr ? 'مرسيدس الفئة S' : 'Mercedes S-Class',
      sub: isAr ? 'سيدان فاخرة VIP' : 'Luxury Sedan',
      image: '/assets/images/studio-2k/mercedes-s-class-studio-2k.webp',
      passengers: 3,
      bags: 3,
      priceSar: 200,
      isPopular: false,
    },
    {
      id: 'hyundai-staria',
      name: isAr ? 'هيونداي ستاريا VIP' : 'Hyundai Staria',
      sub: isAr ? 'فان عائلي فاخر بمقاعد كابتن' : 'Luxury Family Van',
      image: '/assets/images/studio-2k/hyundai-staria-studio-2k.webp',
      passengers: 7,
      bags: 6,
      priceSar: 260,
      isPopular: true,
      popularLabel: isAr ? 'الأكثر طلباً' : 'Most Popular',
    },
    {
      id: 'toyota-camry',
      name: isAr ? 'تويوتا كامري' : 'Toyota Camry',
      sub: isAr ? 'سيدان تنفيذية مريحة' : 'Executive Sedan',
      image: '/assets/images/studio-2k/toyota-camry-studio-2k.webp',
      passengers: 3,
      bags: 6,
      priceSar: 200,
      isPopular: false,
    },
    {
      id: 'gmc-yukon-xl',
      name: isAr ? 'جي إم سي يوكون XL' : 'GMC Yukon XL',
      sub: isAr ? 'دفع رباعي فاخر للعائلات' : 'Premium Family SUV',
      image: '/assets/images/studio-2k/gmc-yukon-studio-2k.webp',
      passengers: 6,
      bags: 6,
      priceSar: 380,
      isPopular: false,
    },
  ];

  // Route Price Guide items (matching Reference B Section 5)
  const routeGuideItems = [
    {
      id: 'jeddah-airport-to-makkah',
      title: isAr ? 'مطار جدة ➔ مكة المكرمة' : 'Jeddah ➔ Makkah',
      time: isAr ? '60 – 75 دقيقة' : '60 – 75 mins',
      fromPrice: 200,
      bookingRoute: 'jeddah-airport-to-makkah',
    },
    {
      id: 'makkah-to-madinah',
      title: isAr ? 'مكة المكرمة ➔ المدينة المنورة' : 'Makkah ➔ Madinah',
      time: isAr ? '4 – 5 ساعات' : '4 – 5 hours',
      fromPrice: 400,
      bookingRoute: 'makkah-to-madinah',
    },
    {
      id: 'madinah-airport-to-madinah',
      title: isAr ? 'مطار المدينة ➔ فنادق المدينة' : 'Madinah ➔ Hotel',
      time: isAr ? '60 – 90 دقيقة' : '60 – 90 mins',
      fromPrice: 200,
      bookingRoute: 'madinah-airport-to-madinah',
    },
  ];

  // FAQs matching Reference B Section 8
  const faqs = [
    {
      q: isAr ? 'كيف يتم احتساب الأسعار؟' : 'How is the pricing calculated?',
      a: isAr
        ? 'الأسعار ثابتة ومحددة للمركبة بالكامل بسعتها المعتمدة وليست للشخص الواحد، وشاملة للوقود وضريبة القيمة المضافة ورسوم الطرق السريعة.'
        : 'All prices are fixed and strictly per vehicle (never per passenger). Fares include fuel, VAT, and highway tolls.',
    },
    {
      q: isAr ? 'ما هي السيارة الأنسب لاحتياجاتي وعائلتي؟' : 'Which vehicle is right for me?',
      a: isAr
        ? 'للأفراد والأزواج ننصح بتويوتا كامري أو مرسيدس الفئة S. وللعائلات المكونة من 4 إلى 7 أفراد ننصح بهيونداي ستاريا VIP أو جي إم سي يوكون XL لرحابة مقاعدها وحقائبها.'
        : 'For individuals and couples, we recommend the Toyota Camry or Mercedes S-Class. For families of 4-7 with luggage, the Hyundai Staria VIP or GMC Yukon XL offers ultimate space and comfort.',
    },
    {
      q: isAr ? 'هل يمكنني تعديل أو إلغاء الحجز؟' : 'Can I modify my booking?',
      a: isAr
        ? 'نعم، التعديل والإلغاء متاح ومجاني ومرن قبل موعد الرحلة بدون أي رسوم، والدفع يتم نقداً للسائق 100% بعد وصولك بسلام.'
        : 'Yes, modifications and cancellations are 100% free and flexible before the journey. Payment is 100% cash to the chauffeur upon arrival.',
    },
  ];

  return (
    <div className="w-full">
      {/* ─────────────────────────────────────────────────────────────
          SECTION 03: ROUTE SEARCH PANEL (Reference B Mobile & Desktop)
      ────────────────────────────────────────────────────────────── */}
      <section className="relative z-20 -mt-8 sm:-mt-10 px-4 sm:px-6 max-w-4xl mx-auto">
        <form
          onSubmit={handleExplorePrices}
          className="bg-[#101725]/95 backdrop-blur-xl border border-[#D6A13A]/35 rounded-2xl p-4 sm:p-6 shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
            {/* Field 1: Pickup Location */}
            <div className="bg-[#090D15]/80 border border-white/10 rounded-xl px-3.5 py-2.5 flex flex-col justify-center">
              <label className="text-[11px] font-semibold text-[#D6A13A] mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{content.searchPickupLabel || (isAr ? 'موقع الانطلاق' : 'Pickup Location')}</span>
              </label>
              <div className="relative">
                <select
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full bg-transparent text-[#F6F3ED] text-xs sm:text-sm font-semibold focus:outline-none cursor-pointer appearance-none pr-6 rtl:pr-0 rtl:pl-6"
                >
                  <option value="jeddah-airport" className="bg-[#101725] text-white">
                    {isAr ? 'مطار جدة (KAIA)' : 'Jeddah Airport (KAIA)'}
                  </option>
                  <option value="makkah" className="bg-[#101725] text-white">
                    {isAr ? 'مكة المكرمة' : 'Makkah'}
                  </option>
                  <option value="madinah-airport" className="bg-[#101725] text-white">
                    {isAr ? 'مطار المدينة' : 'Madinah Airport'}
                  </option>
                  <option value="madinah" className="bg-[#101725] text-white">
                    {isAr ? 'المدينة المنورة' : 'Madinah'}
                  </option>
                  <option value="taif" className="bg-[#101725] text-white">
                    {isAr ? 'الطائف' : 'Taif'}
                  </option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#D6A13A] absolute top-1/2 -translate-y-1/2 right-0 rtl:right-auto rtl:left-0 pointer-events-none" />
              </div>
            </div>

            {/* Field 2: Destination */}
            <div className="bg-[#090D15]/80 border border-white/10 rounded-xl px-3.5 py-2.5 flex flex-col justify-center">
              <label className="text-[11px] font-semibold text-[#D6A13A] mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{content.searchDestLabel || (isAr ? 'الوجهة' : 'Destination')}</span>
              </label>
              <div className="relative">
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-transparent text-[#F6F3ED] text-xs sm:text-sm font-semibold focus:outline-none cursor-pointer appearance-none pr-6 rtl:pr-0 rtl:pl-6"
                >
                  <option value="makkah" className="bg-[#101725] text-white">
                    {isAr ? 'مكة المكرمة' : 'Makkah'}
                  </option>
                  <option value="madinah" className="bg-[#101725] text-white">
                    {isAr ? 'المدينة المنورة' : 'Madinah'}
                  </option>
                  <option value="jeddah-airport" className="bg-[#101725] text-white">
                    {isAr ? 'مطار جدة (KAIA)' : 'Jeddah Airport (KAIA)'}
                  </option>
                  <option value="madinah-airport" className="bg-[#101725] text-white">
                    {isAr ? 'مطار المدينة' : 'Madinah Airport'}
                  </option>
                  <option value="taif" className="bg-[#101725] text-white">
                    {isAr ? 'الطائف' : 'Taif'}
                  </option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#D6A13A] absolute top-1/2 -translate-y-1/2 right-0 rtl:right-auto rtl:left-0 pointer-events-none" />
              </div>
            </div>

            {/* Field 3: Trip Type Segmented Selector */}
            <div className="bg-[#090D15]/80 border border-white/10 rounded-xl px-3.5 py-2.5 flex flex-col justify-center">
              <label className="text-[11px] font-semibold text-[#D6A13A] mb-1">
                {content.searchTripTypeLabel || (isAr ? 'نوع الرحلة' : 'Trip Type')}
              </label>
              <div className="flex items-center gap-1 bg-[#101725] p-1 rounded-lg border border-white/10">
                <button
                  type="button"
                  onClick={() => setTripType('oneway')}
                  className={`flex-1 py-1.5 px-2 rounded-md text-xs font-bold transition-all ${
                    tripType === 'oneway'
                      ? 'bg-[#D6A13A] text-[#090D15] shadow-xs'
                      : 'text-[#AEB7C4] hover:text-[#F6F3ED]'
                  }`}
                >
                  {content.searchOneWay || (isAr ? 'اتجاه واحد' : 'One Way')}
                </button>
                <button
                  type="button"
                  onClick={() => setTripType('roundtrip')}
                  className={`flex-1 py-1.5 px-2 rounded-md text-xs font-bold transition-all ${
                    tripType === 'roundtrip'
                      ? 'bg-[#D6A13A] text-[#090D15] shadow-xs'
                      : 'text-[#AEB7C4] hover:text-[#F6F3ED]'
                  }`}
                >
                  {content.searchRoundTrip || (isAr ? 'ذهاب وعودة' : 'Round Trip')}
                </button>
              </div>
            </div>
          </div>

          {/* Action Button: Explore Prices */}
          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#E5B869] via-[#D6A13A] to-[#B88523] text-[#090D15] font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_6px_24px_rgba(214,161,58,0.35)] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
          >
            <span>{content.searchExploreBtn || (isAr ? 'استكشف الأسعار' : 'Explore Prices')}</span>
            <ArrowIcon className="w-4 h-4" />
          </button>
        </form>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 04: CHOOSE YOUR VEHICLE (Reference B Horizontal Cards)
      ────────────────────────────────────────────────────────────── */}
      <section className="py-12 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-4 mb-2">
            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#D6A13A]" />
            <h2 className="font-playfair font-serif text-2xl sm:text-3xl font-bold text-[#F6F3ED]">
              {content.chooseVehicleTitle || (isAr ? 'اختر سيارتك الفاخرة' : 'Choose Your Vehicle')}
            </h2>
            <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#D6A13A]" />
          </div>
          <p className="text-xs sm:text-sm text-[#AEB7C4]">
            {content.chooseVehicleSubtitle || (isAr ? 'سافر بأناقة وفخامة مع أسطولنا المتميز' : 'Travel in style with our premium fleet')}
          </p>
        </div>

        {/* Stack of Vehicle Cards */}
        <div className="flex flex-col gap-4">
          {vehiclesList.map((car) => {
            const isFeatured = car.isPopular;
            return (
              <div
                key={car.id}
                className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                  isFeatured
                    ? 'bg-[#101725] border-2 border-[#D6A13A] shadow-[0_0_30px_rgba(214,161,58,0.25)]'
                    : 'bg-[#101725]/85 border border-white/12 hover:border-[#D6A13A]/50'
                }`}
              >
                {/* Most Popular Badge on Top Left */}
                {isFeatured && car.popularLabel && (
                  <div className="absolute top-0 left-4 rtl:left-auto rtl:right-4 z-10 bg-gradient-to-r from-[#D6A13A] to-[#B88523] text-[#090D15] font-extrabold text-[10px] sm:text-xs px-3 py-1 rounded-b-lg uppercase tracking-wider shadow-sm">
                    {car.popularLabel}
                  </div>
                )}

                {/* Card Body: Horizontal split layout */}
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  {/* Left: 2K Studio Vehicle Image */}
                  <div className="w-full sm:w-56 h-36 sm:h-32 relative flex items-center justify-center shrink-0 bg-[#090D15]/50 rounded-xl overflow-hidden p-2">
                    <Image
                      src={car.image}
                      alt={car.name}
                      fill
                      className="object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.85)] hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, 240px"
                    />
                  </div>

                  {/* Right: Info, Specs & Actions */}
                  <div className="w-full sm:flex-1 text-center sm:text-start flex flex-col justify-center">
                    <h3 className="font-bold text-lg sm:text-xl text-[#F6F3ED] mb-1">
                      {car.name}
                    </h3>
                    <p className="text-xs text-[#AEB7C4] mb-3">
                      {car.sub}
                    </p>

                    <div className="flex items-center justify-center sm:justify-start gap-4 text-xs text-[#AEB7C4] mb-4">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#D6A13A]" />
                        <span>{car.passengers} {content.passengersWord || (isAr ? 'ركاب' : 'Passengers')}</span>
                      </div>
                      <span className="text-white/20">•</span>
                      <div className="flex items-center gap-1.5">
                        <Luggage className="w-3.5 h-3.5 text-[#D6A13A]" />
                        <span>{car.bags} {content.bagsWord || (isAr ? 'حقائب' : 'Bags')}</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="w-full sm:w-auto shrink-0 flex flex-col items-center sm:items-end gap-2">
                    <div className="text-xs text-[#AEB7C4]">
                      <span>{content.fromPricePrefix || (isAr ? 'من ' : 'From ')}</span>
                      <strong className="text-base font-bold text-[#D6A13A]">{formatPrice(car.priceSar)}</strong>
                    </div>
                    <Link
                      href={`/${locale}/booking?vehicle=${car.id}&pickup=${encodeURIComponent(
                        pickup
                      )}&destination=${encodeURIComponent(destination)}`}
                      className={`w-full sm:w-auto py-2.5 px-5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                        isFeatured
                          ? 'bg-[#D6A13A] text-[#090D15] hover:bg-[#E5B869] shadow-md'
                          : 'bg-transparent border border-[#D6A13A] text-[#D6A13A] hover:bg-[#D6A13A]/15'
                      }`}
                    >
                      <span>{content.viewRoutePriceBtn || (isAr ? 'عرض سعر المسار' : 'View route price')}</span>
                      <ArrowIcon className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 05: ROUTE PRICE GUIDE (Reference B Comparison Rows)
      ────────────────────────────────────────────────────────────── */}
      <section className="py-10 px-4 sm:px-6 max-w-4xl mx-auto border-t border-white/10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center gap-4 mb-2">
            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#D6A13A]" />
            <h2 className="font-playfair font-serif text-2xl sm:text-3xl font-bold text-[#F6F3ED]">
              {content.routeGuideTitle || (isAr ? 'دليل أسعار المسارات' : 'Route Price Guide')}
            </h2>
            <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#D6A13A]" />
          </div>
          <p className="text-xs sm:text-sm text-[#AEB7C4]">
            {content.routeGuideSubtitle || (isAr ? 'ابحث عن أفضل الأسعار والمسارات المعتمدة لرحلتك' : 'Find the best prices for your journey')}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {routeGuideItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#101725] border border-white/10 rounded-xl p-4 flex items-center justify-between gap-3 shadow-md hover:border-[#D6A13A]/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#D6A13A]/15 border border-[#D6A13A]/30 flex items-center justify-center text-[#D6A13A] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-[#F6F3ED]">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-[#AEB7C4]">
                    <Clock className="w-3 h-3 text-[#D6A13A]" />
                    <span>{item.time}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <span className="text-sm sm:text-base font-extrabold text-[#D6A13A]">
                  {formatPrice(item.fromPrice)}
                </span>
                <Link
                  href={`/${locale}/booking?route=${item.bookingRoute}`}
                  className="text-xs font-bold text-[#AEB7C4] hover:text-[#D6A13A] flex items-center gap-1 transition-colors"
                >
                  <span className="hidden sm:inline">{content.compareVehiclesBtn || (isAr ? 'مقارنة السيارات' : 'Compare Vehicles')}</span>
                  <ArrowIcon className="w-3.5 h-3.5 text-[#D6A13A]" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 06: WHAT'S INCLUDED (Reference B 3 Circular Gold Icons)
      ────────────────────────────────────────────────────────────── */}
      <section className="py-10 px-4 sm:px-6 max-w-4xl mx-auto border-t border-white/10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-4 mb-2">
            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#D6A13A]" />
            <h2 className="font-playfair font-serif text-2xl sm:text-3xl font-bold text-[#F6F3ED]">
              {content.whatsIncludedTitle || (isAr ? 'ما تشمله باقتك' : "What's Included")}
            </h2>
            <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#D6A13A]" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center p-4 rounded-xl bg-[#101725]/50 border border-white/8">
            <div className="w-14 h-14 rounded-full border border-[#D6A13A] bg-[#141D2C] flex items-center justify-center text-[#D6A13A] mb-3 shadow-[0_0_18px_rgba(214,161,58,0.2)]">
              <Shield className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-[#F6F3ED] mb-1">
              {content.incFareDetails || (isAr ? 'تفاصيل الأجرة الشاملة' : 'Clear Fare Details')}
            </h4>
            <p className="text-xs text-[#AEB7C4] leading-relaxed">
              {isAr ? 'السعر يشمل الوقود ورسوم الطرق السريعة وضريبة القيمة المضافة بالكامل.' : 'All taxes, highway toll gates, and fuel fully included in your fixed rate.'}
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4 rounded-xl bg-[#101725]/50 border border-white/8">
            <div className="w-14 h-14 rounded-full border border-[#D6A13A] bg-[#141D2C] flex items-center justify-center text-[#D6A13A] mb-3 shadow-[0_0_18px_rgba(214,161,58,0.2)]">
              <Car className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-[#F6F3ED] mb-1">
              {content.incVehicleInfo || (isAr ? 'مركبة حديثة ومعقمة' : 'Vehicle Information')}
            </h4>
            <p className="text-xs text-[#AEB7C4] leading-relaxed">
              {isAr ? 'أسطول معقم ومكيف مسبقاً مع مقاعد مريحة وعناية كاملة بالأمتعة.' : 'Pristine, sanitized, pre-cooled executive cabin with full luggage assistance.'}
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4 rounded-xl bg-[#101725]/50 border border-white/8">
            <div className="w-14 h-14 rounded-full border border-[#D6A13A] bg-[#141D2C] flex items-center justify-center text-[#D6A13A] mb-3 shadow-[0_0_18px_rgba(214,161,58,0.2)]">
              <Headphones className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-[#F6F3ED] mb-1">
              {content.incBookingSupport || (isAr ? 'دعم وإرشاد الحجز 24/7' : 'Booking Support')}
            </h4>
            <p className="text-xs text-[#AEB7C4] leading-relaxed">
              {isAr ? 'متابعة مباشرة لرقم رحلة الطيران وانتظار مجاني 60 دقيقة في المطار.' : 'Live flight radar tracking with 60 minutes complimentary airport wait time.'}
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 07: WHY TRAVEL WITH US? (Reference B 4 Badges)
      ────────────────────────────────────────────────────────────── */}
      <section className="py-10 px-4 sm:px-6 max-w-4xl mx-auto border-t border-white/10">
        <div className="text-center mb-6">
          <h2 className="font-playfair font-serif text-xl sm:text-2xl font-bold text-[#F6F3ED]">
            {content.whyTravelTitle || (isAr ? 'لماذا السفر مع ضيوف الرحمن VIP؟' : 'Why Travel with Duyuf Al Rahman VIP?')}
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex flex-col items-center text-center p-3 rounded-xl bg-[#101725] border border-white/8">
            <Diamond className="w-6 h-6 text-[#D6A13A] mb-2" />
            <span className="text-xs font-bold text-[#F6F3ED]">
              {content.whyPremiumService || (isAr ? 'خدمة ليموزين فاخرة' : 'Premium Service')}
            </span>
          </div>

          <div className="flex flex-col items-center text-center p-3 rounded-xl bg-[#101725] border border-white/8">
            <Handshake className="w-6 h-6 text-[#D6A13A] mb-2" />
            <span className="text-xs font-bold text-[#F6F3ED]">
              {content.whyTrustedChoice || (isAr ? 'خيار معتمد وموثوق' : 'Trusted Choice')}
            </span>
          </div>

          <div className="flex flex-col items-center text-center p-3 rounded-xl bg-[#101725] border border-white/8">
            <Clock className="w-6 h-6 text-[#D6A13A] mb-2" />
            <span className="text-xs font-bold text-[#F6F3ED]">
              {content.whyOnTime || (isAr ? 'التزام تام بالمواعيد' : 'On-Time Service')}
            </span>
          </div>

          <div className="flex flex-col items-center text-center p-3 rounded-xl bg-[#101725] border border-white/8">
            <MapPin className="w-6 h-6 text-[#D6A13A] mb-2" />
            <span className="text-xs font-bold text-[#F6F3ED]">
              {content.whyNationwide || (isAr ? 'تغطية لكافة مدن المملكة' : 'Nationwide Coverage')}
            </span>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 08: FREQUENTLY ASKED QUESTIONS (Reference B Accordion)
      ────────────────────────────────────────────────────────────── */}
      <section className="py-10 px-4 sm:px-6 max-w-4xl mx-auto border-t border-white/10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center gap-4 mb-2">
            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#D6A13A]" />
            <h2 className="font-playfair font-serif text-2xl sm:text-3xl font-bold text-[#F6F3ED]">
              {content.faqTitle || (isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions')}
            </h2>
            <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#D6A13A]" />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-[#101725] border border-white/10 rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 flex items-center justify-between text-start gap-4 hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <span className="font-bold text-sm sm:text-base text-[#F6F3ED]">{faq.q}</span>
                  <div className="w-7 h-7 rounded-full bg-[#141D2C] border border-[#D6A13A]/30 flex items-center justify-center text-[#D6A13A] shrink-0">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-[#AEB7C4] leading-relaxed border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 09: FINAL CINEMATIC BOOKING CTA (Reference B CTA Card)
      ────────────────────────────────────────────────────────────── */}
      <section className="py-10 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden border border-[#D6A13A]/30 min-h-[220px] sm:min-h-[260px] flex items-center justify-end p-6 sm:p-10">
          <Image
            src="/assets/images/cinematic/home/faq-cta-retina.jpg"
            alt="Duyuf Al Rahman VIP Umrah Chauffeur"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#090D15]/95 via-[#090D15]/75 to-transparent rtl:sm:bg-gradient-to-l" />

          <div className="relative z-10 max-w-md text-center sm:text-start">
            <h3 className="font-playfair font-serif text-2xl sm:text-3xl font-bold text-[#F6F3ED] mb-2">
              {content.readyCardTitle || (isAr ? 'مستعد لرحلتك؟' : 'Ready for Your Journey?')}
            </h3>
            <p className="text-xs sm:text-sm text-[#AEB7C4] mb-5 leading-relaxed">
              {content.readyCardSubtitle || (isAr ? 'احجز وسيلة نقلك الخاصة الآن وسافر بكل طمأنينة ووقار.' : 'Book now and travel with confidence across Saudi Arabia.')}
            </p>
            <Link
              href={`/${locale}/booking?pickup=${encodeURIComponent(pickup)}&destination=${encodeURIComponent(destination)}`}
              className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-[#E5B869] via-[#D6A13A] to-[#B88523] text-[#090D15] font-extrabold text-sm shadow-[0_6px_20px_rgba(214,161,58,0.35)] hover:scale-[1.02] transition-transform"
            >
              <span>{content.bookJourneyBtn || (isAr ? 'احجز رحلتك الآن' : 'Book Your Journey')}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
