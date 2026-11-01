'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Locale, LOCALES, LOCALE_CONFIG } from '@/i18n/config';
import {
  Button,
  Input,
  Select,
  Label,
  SectionHeader,
  Alert,
  Modal,
  BookingStepper,
  RoyalVehicleCard,
  RoyalRouteCard,
  RoyalPricingCard,
  RoyalGallery,
} from '@/components/ui';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Clock,
  MapPin,
  Car,
  User,
  Phone,
  Mail,
  CheckCircle2,
  Globe,
  Smartphone,
  Tablet,
  Monitor,
} from 'lucide-react';

export default function DesignSystemPage() {
  const params = useParams();
  const locale = (params?.locale as Locale) || 'en';
  const isAr = locale === 'ar';
  const isRtl = isAr || locale === 'ur';

  const [activeStep, setActiveStep] = useState(2);
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');
  const [selectValue, setSelectValue] = useState('jeddah-airport-to-makkah');

  const COLOR_SWATCHES = [
    { name: 'Midnight Navy', hex: '#101827', role: 'Primary Hero, High-Contrast Containers', bg: 'bg-[#101827]', text: 'text-white' },
    { name: 'Deep Navy', hex: '#111C30', role: 'Feature Strips, Secondary Dark Contrast', bg: 'bg-[#111C30]', text: 'text-white' },
    { name: 'Charcoal', hex: '#161B24', role: 'Borders on Dark, Tertiary Dark Accents', bg: 'bg-[#161B24]', text: 'text-white' },
    { name: 'Champagne Gold', hex: '#C5A15D', role: 'Primary CTA, Focus Indicators, Icons', bg: 'bg-[#C5A15D]', text: 'text-[#101827]' },
    { name: 'Warm Gold', hex: '#D7B76C', role: 'Badge Accents, Secondary Highlights', bg: 'bg-[#D7B76C]', text: 'text-[#101827]' },
    { name: 'Warm Ivory', hex: '#F7F5F0', role: 'Primary Page Canvas, Editorial Sections', bg: 'bg-[#F7F5F0]', text: 'text-[#182235]' },
    { name: 'Pure White', hex: '#FFFFFF', role: 'Primary Content Cards, Elevated Surfaces', bg: 'bg-[#FFFFFF]', text: 'text-[#182235]' },
    { name: 'Primary Text', hex: '#182235', role: 'High Readability Body and Headings (Ink)', bg: 'bg-[#182235]', text: 'text-white' },
    { name: 'Secondary Text', hex: '#687386', role: 'Muted Captions, Metadata, Subtitles', bg: 'bg-[#687386]', text: 'text-white' },
    { name: 'Soft Border', hex: '#E8E3DA', role: 'Subtle Warm Hairline Card Dividers', bg: 'bg-[#E8E3DA]', text: 'text-[#182235]' },
    { name: 'Success Emerald', hex: '#188567', role: 'Status Confirmation, Completed Steps', bg: 'bg-[#188567]', text: 'text-white' },
  ];

  const SAMPLE_GALLERY_IMAGES = [
    {
      src: '/assets/images/vehicles/gmc-yukon-xl/exterior-studio.webp',
      alt: 'GMC Yukon XL VIP Studio Profile',
      label: 'Studio Exterior',
      category: 'exterior' as const,
    },
    {
      src: '/assets/images/vehicles/gmc-yukon-xl/interior.webp',
      alt: 'GMC Yukon XL Executive Cabin',
      label: 'VIP Leather Cabin',
      category: 'interior' as const,
    },
    {
      src: '/assets/images/vehicles/gmc-yukon-xl/interior_seats.jpg',
      alt: 'GMC Yukon XL 3-Row Luxury Seats',
      label: '3-Row Seating Detail',
      category: 'detail' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F5F0] py-8 sm:py-12 md:py-16 text-start">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* RESPONSIVE & LOCALE TOOLBAR */}
        <div className="bg-white rounded-2xl border border-[#E8E3DA] p-3 sm:p-4 mb-8 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#C5A15D]" />
            <span className="font-sans font-bold text-xs text-[#182235]">
              {isAr ? 'اللغة الحالية:' : 'Current Locale:'}
            </span>
            <div className="flex flex-wrap gap-1">
              {LOCALES.map((l) => (
                <Link
                  key={l}
                  href={`/${l}/design-system`}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                    locale === l
                      ? 'bg-[#101827] text-[#D7B76C]'
                      : 'bg-[#F7F5F0] text-[#687386] hover:text-[#182235]'
                  }`}
                >
                  {l.toUpperCase()}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs text-[#687386]">
            <span className="flex items-center gap-1 font-semibold text-[#182235]">
              <Smartphone className="w-3.5 h-3.5 text-[#C5A15D]" /> 390px / 515px Mobile
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 font-semibold text-[#182235]">
              <Tablet className="w-3.5 h-3.5 text-[#C5A15D]" /> 768px Tablet
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 font-semibold text-[#182235]">
              <Monitor className="w-3.5 h-3.5 text-[#C5A15D]" /> 1024px+ Desktop
            </span>
          </div>
        </div>

        {/* HERO BANNER */}
        <div className="bg-[#101827] rounded-3xl p-6 sm:p-10 md:p-16 text-center text-white relative overflow-hidden mb-12 sm:mb-16 shadow-xl border border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C5A15D]/20 via-transparent to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111C30] border border-[#C5A15D]/40 text-[11px] sm:text-xs font-bold text-[#D7B76C] uppercase tracking-widest mb-4 sm:mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A15D]" />
              <span>{isAr ? 'نظام التصميم الملكي الفاخر' : 'ROYAL LUXURY DESIGN SYSTEM'}</span>
            </div>
            <h1 className="font-serif font-bold text-2xl sm:text-4xl md:text-5xl text-[#F7F5F0] mb-4 sm:mb-6 leading-tight">
              {isAr ? 'الأساس البصري الملكي لضيوف الرحمن VIP' : 'Duyuf Alrahman VIP Visual Foundation'}
            </h1>
            <p className="font-sans text-xs sm:text-base text-[#E8E3DA]/85 font-light leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-8">
              {isAr
                ? 'توثيق شامل للألوان المعتمدة، التيبوغرافيا التحريرية، المكونات التفاعلية، ومعايير تجربة المستخدم المتوافقة بالكامل مع كافة الشاشات واللغات العشر.'
                : 'Authoritative design tokens, disciplined editorial typography, responsive component patterns, and strict multilingual standards.'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Button
                variant="primary"
                size="md"
                onClick={() => setModalOpen(true)}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {isAr ? 'معاينة نافذة الحجز' : 'Preview Modal Dialog'}
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={() => {
                  const el = document.getElementById('components-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {isAr ? 'استعراض المكونات' : 'Explore Components'}
              </Button>
            </div>
          </div>
        </div>

        {/* 1. OFFICIAL COLOR TOKENS */}
        <section className="mb-14 sm:mb-20">
          <SectionHeader
            badge={isAr ? 'لوحة الألوان الرسمية' : 'OFFICIAL COLOR TOKENS'}
            title={isAr ? 'الألوان المعتمدة للهوية الملكية' : 'Curated Royal Luxury Palette'}
            subtitle={isAr
              ? 'الأبيض النقي والعاجي للغالبية العظمى من المحتوى، والكحلي الملكي للأقسام المرموقة، والذهب الشامبين بإتقان للتأكيد وأزرار التحويل.'
              : 'Pure ivory and white for content readability, midnight navy for executive containers, and champagne gold sparingly for conversion actions.'}
          />
          {/* Responsive 2-column mobile, 3-column tablet, 4-column desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {COLOR_SWATCHES.map((swatch, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E8E3DA] p-3.5 sm:p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`w-full h-16 sm:h-20 rounded-xl ${swatch.bg} border border-[#E8E3DA]/60 mb-3 flex items-center justify-center shadow-inner`}
                  >
                    <span className={`font-mono text-[11px] sm:text-xs font-bold ${swatch.text}`}>
                      {swatch.hex}
                    </span>
                  </div>
                  <h3 className="font-sans font-bold text-xs sm:text-sm text-[#182235] mb-1 leading-tight">
                    {swatch.name}
                  </h3>
                </div>
                <p className="font-sans text-[11px] text-[#687386] font-light leading-snug line-clamp-2">
                  {swatch.role}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 2. TYPOGRAPHY SYSTEM */}
        <section className="mb-14 sm:mb-20" id="components-section">
          <SectionHeader
            badge={isAr ? 'منظومة الخطوط والتيبوغرافيا' : 'TYPOGRAPHY HIERARCHY'}
            title={isAr ? 'تدرج خطوط متزن وتطبيقي' : 'Disciplined Editorial Type Scale'}
            subtitle={isAr
              ? 'العناوين الفاخرة تستخدم خطوط السيريف، بينما النماذج والأزرار ومعلومات الحجز تستخدم خطوطاً عصرية واضحة للقراءة.'
              : 'Display headings use refined serifs, while forms, navigation, specs, and booking info strictly use clear modern sans-serif.'}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Latin Typography */}
            <div className="bg-white rounded-3xl border border-[#E8E3DA] p-6 sm:p-8 shadow-xs">
              <span className="font-sans text-xs font-bold text-[#C5A15D] uppercase tracking-widest block mb-4">
                English & Latin Script (Playfair & Manrope)
              </span>
              <div className="space-y-5">
                <div>
                  <span className="font-sans text-[11px] text-[#687386] block mb-1">Display Hero H1 (Playfair Display Bold)</span>
                  <h1 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-[#182235] leading-tight">
                    Experience Saudi Arabia in Exceptional Comfort
                  </h1>
                </div>
                <div>
                  <span className="font-sans text-[11px] text-[#687386] block mb-1">Section Heading H2 (Playfair Display SemiBold)</span>
                  <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#182235] leading-tight">
                    Simple, Dignified Chauffeur Booking
                  </h2>
                </div>
                <div>
                  <span className="font-sans text-[11px] text-[#687386] block mb-1">Interface & Form Text (Manrope SemiBold / Regular)</span>
                  <div className="p-3 bg-[#F7F5F0] rounded-xl border border-[#E8E3DA] space-y-1">
                    <p className="font-sans font-bold text-sm text-[#182235]">
                      KAIA Terminal 1 → Makkah Clock Tower Hotel
                    </p>
                    <p className="font-sans text-xs text-[#687386] font-light leading-relaxed">
                      7 Passengers • 8 Luggage Bags • Fixed 450 SAR Fare • Cash to Chauffeur
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Arabic Typography */}
            <div className="bg-white rounded-3xl border border-[#E8E3DA] p-6 sm:p-8 shadow-xs" dir="rtl">
              <span className="font-sans text-xs font-bold text-[#C5A15D] uppercase tracking-widest block mb-4">
                Arabic Script (IBM Plex Sans Arabic & Tajawal)
              </span>
              <div className="space-y-5">
                <div>
                  <span className="font-sans text-[11px] text-[#687386] block mb-1">عنوان رئيسي H1 (IBM Plex Sans Arabic عريض)</span>
                  <h1 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-[#182235] leading-tight">
                    تجربة تنقل استثنائية بأعلى درجات الرفاهية والسكينة
                  </h1>
                </div>
                <div>
                  <span className="font-sans text-[11px] text-[#687386] block mb-1">عنوان قسم H2 (خط عربي متزن)</span>
                  <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#182235] leading-tight">
                    حجز سلس ومريح من البداية وحتى الوصول
                  </h2>
                </div>
                <div>
                  <span className="font-sans text-[11px] text-[#687386] block mb-1">نصوص الواجهة والبيانات (عربي عصري للمواصفات)</span>
                  <div className="p-3 bg-[#F7F5F0] rounded-xl border border-[#E8E3DA] space-y-1">
                    <p className="font-sans font-bold text-sm text-[#182235]">
                      مطار جدة (صالة 1) ← فندق برج الساعة بمكة المكرمة
                    </p>
                    <p className="font-sans text-xs text-[#687386] font-light leading-relaxed">
                      ٧ ركاب • ٨ حقائب كبيرة • سعر ثابت ٤٥٠ ريال • الدفع نقدًا بعد الوصول
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. BUTTONS & INTERACTIVE CONTROLS */}
        <section className="mb-14 sm:mb-20">
          <SectionHeader
            badge={isAr ? 'أزرار التحويل والحركة' : 'BUTTON HIERARCHY'}
            title={isAr ? 'تدرج الأزرار وحالات التفاعل' : 'Tactile Conversion Actions'}
            subtitle={isAr
              ? 'أزرار مريحة للّمس على الهواتف مع تدرج ذهب الشامبين، وحالات التحميل والتعطيل.'
              : 'Generous touch targets (>= 48px) with champagne micro-gradients and accessible keyboard rings.'}
          />
          <div className="bg-white rounded-3xl border border-[#E8E3DA] p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h4 className="font-sans text-xs font-bold text-[#687386] uppercase tracking-wider mb-3">
                Variants (Primary, Secondary, Outline, Ghost, WhatsApp)
              </h4>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  {isAr ? 'حجز سيارة خاصة' : 'Reserve Chauffeur'}
                </Button>
                <Button variant="secondary">
                  {isAr ? 'عرض المسارات' : 'Explore Corridors'}
                </Button>
                <Button variant="outline">
                  {isAr ? 'جدول الأسعار' : 'Pricing Matrix'}
                </Button>
                <Button variant="ghost">
                  {isAr ? 'التفاصيل' : 'Learn More'}
                </Button>
                <Button variant="whatsapp">
                  {isAr ? 'واتساب مباشر' : 'WhatsApp Concierge'}
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-sans text-xs font-bold text-[#687386] uppercase tracking-wider mb-3">
                Touch Target Sizes
              </h4>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm" variant="primary">Small (40px)</Button>
                <Button size="md" variant="primary">Standard Touch (48px)</Button>
                <Button size="lg" variant="primary">Hero CTA (56px)</Button>
              </div>
            </div>

            <div>
              <h4 className="font-sans text-xs font-bold text-[#687386] uppercase tracking-wider mb-3">
                Interactive States
              </h4>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" isLoading>Processing...</Button>
                <Button variant="primary" disabled>Disabled State</Button>
              </div>
            </div>
          </div>
        </section>

        {/* 4. FORM ELEMENTS & SELECTORS */}
        <section className="mb-14 sm:mb-20">
          <SectionHeader
            badge={isAr ? 'نماذج الإدخال والحقول' : 'FORM SYSTEM'}
            title={isAr ? 'حقول الإدخال وقوائم الاختيار' : 'Input Fields & Selection Controls'}
            subtitle={isAr
              ? 'حقول مهيأة للقراءة بوضوح بارتفاع 48px وحجم خط يمنع التكبير التلقائي على أجهزة الآيفون.'
              : 'Mobile-first inputs (>= 48px) with 16px font baseline to prevent iOS auto-zoom, leading icons, and validation alerts.'}
          />
          <div className="bg-white rounded-3xl border border-[#E8E3DA] p-6 sm:p-8 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              <Input
                label={isAr ? 'اسم المسافر الكريم' : 'Full Guest Name'}
                placeholder={isAr ? 'مثال: محمد عبدالله' : 'e.g. Sheikh Ahmed'}
                required
                leftIcon={<User className="w-4 h-4" />}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                helperText={isAr ? 'كما يظهر في تذكرة الطيران' : 'As written in your flight reservation'}
              />

              <Input
                label={isAr ? 'رقم الهاتف مع الرمز الدولي' : 'Phone Number'}
                placeholder="+966 50 123 4567"
                required
                leftIcon={<Phone className="w-4 h-4" />}
                error={inputError}
                onChange={(e) => {
                  if (e.target.value.length > 0 && e.target.value.length < 8) {
                    setInputError(isAr ? 'يرجى إدخال رقم هاتف دولي صحيح' : 'Please provide a valid phone number');
                  } else {
                    setInputError('');
                  }
                }}
              />

              <Select
                label={isAr ? 'مسار الرحلة المطلوب' : 'Selected Corridor'}
                required
                leftIcon={<MapPin className="w-4 h-4" />}
                value={selectValue}
                onChange={(e) => setSelectValue(e.target.value)}
                options={[
                  { value: 'jeddah-airport-to-makkah', label: isAr ? 'مطار جدة (KAIA) ← فندق مكة المكرمة' : 'Jeddah Airport (KAIA) → Makkah Hotel' },
                  { value: 'makkah-to-madinah', label: isAr ? 'مكة المكرمة ← المدينة المنورة (عبر الميقات)' : 'Makkah Hotel → Madinah (Via Bir Ali)' },
                  { value: 'madinah-airport-to-hotel', label: isAr ? 'مطار المدينة (MED) ← فنادق الحرم' : 'Madinah Airport (MED) → Madinah Hotel' },
                ]}
              />
            </div>
          </div>
        </section>

        {/* 5. BOOKING STEPPER */}
        <section className="mb-14 sm:mb-20">
          <SectionHeader
            badge={isAr ? 'مؤشر مراحل الحجز' : 'BOOKING PROGRESS'}
            title={isAr ? 'مراحل الحجز المتوافقة مع الشاشات' : 'Responsive Milestone Stepper'}
            subtitle={isAr
              ? 'يتكيف تلقائياً مع الشاشات الصغيرة (390px و 515px) ليمنع تداخل النصوص ويوفر قراءة مريحة.'
              : 'Automatically adapts on small viewports (390px - 515px) with a sleek compact tracker, expanding to full milestone circles on desktop.'}
          />
          <div className="bg-white rounded-3xl border border-[#E8E3DA] p-6 sm:p-8 shadow-xs">
            <BookingStepper
              currentStep={activeStep}
              locale={locale}
              onStepClick={(step) => setActiveStep(step)}
              steps={[
                { id: 1, label: isAr ? 'المسار والموعد' : 'Route & Schedule', description: isAr ? 'الوجهة والتاريخ' : 'Pickup & Date' },
                { id: 2, label: isAr ? 'اختيار السيارة' : 'Select Fleet', description: isAr ? 'الأسطول والسعة' : 'Vehicle & Capacity' },
                { id: 3, label: isAr ? 'بيانات المسافر' : 'Guest Details', description: isAr ? 'الاسم والهاتف' : 'Name & Contact' },
                { id: 4, label: isAr ? 'التأكيد الفوري' : 'Confirmation', description: isAr ? 'الدفع نقدًا' : 'Pay After Trip' },
              ]}
            />
            <div className="mt-6 flex justify-center gap-3">
              <Button
                variant="outline"
                size="sm"
                disabled={activeStep <= 1}
                onClick={() => setActiveStep((p) => Math.max(1, p - 1))}
              >
                {isAr ? 'السابق' : 'Previous'}
              </Button>
              <Button
                variant="primary"
                size="sm"
                disabled={activeStep >= 4}
                onClick={() => setActiveStep((p) => Math.min(4, p + 1))}
              >
                {isAr ? 'التالي' : 'Next'}
              </Button>
            </div>
          </div>
        </section>

        {/* 6. ALERTS & NOTICES */}
        <section className="mb-14 sm:mb-20">
          <SectionHeader
            badge={isAr ? 'التنبيهات والضمانات' : 'ALERTS & ASSURANCES'}
            title={isAr ? 'بطاقات الضمان وسياسات الدفع' : 'Policy Callouts & Trust Assurances'}
            subtitle={isAr
              ? 'تنبيهات أنيقة وواضحة تؤكد سياسة الدفع نقدًا بعد الوصول بدون أي دفع مسبق.'
              : 'Dignified notice callouts emphasizing zero prepayment terms and licensed radar tracking.'}
          />
          <div className="space-y-4 max-w-4xl mx-auto">
            <Alert
              variant="royal"
              title={isAr ? 'سياسة الدفع المعتمدة: 0 ريال دفعة مقدمة' : 'Approved Payment Terms: Zero Advance Deposit'}
            >
              {isAr
                ? 'الدفع نقدًا مباشرة للسائق بعد وصول العميل إلى وجهته المطلوبة وانتهاء الرحلة بالكامل (بالريال السعودي أو الدولار الأمريكي).'
                : 'Payment is 100% cash paid directly to your private chauffeur after journey completion and hotel arrival (SAR or USD).'}
            </Alert>

            <Alert
              variant="success"
              title={isAr ? 'تتبع آلي لرحلات الطيران بالرادار' : 'Automated Radar Flight Tracking Included'}
            >
              {isAr
                ? 'فريق العمليات يتابع موعد هبوط طائرتك بالرادار الملاحي ليتواجد سائقك مع لوحة باسمك مع 60 دقيقة انتظار مجانية.'
                : 'Our dispatch tracks your flight radar in real-time with 60 minutes complimentary wait time after touchdown.'}
            </Alert>
          </div>
        </section>

        {/* 7. ROYAL VEHICLE CARDS (RESPONSIVE GRID) */}
        <section className="mb-14 sm:mb-20">
          <SectionHeader
            badge={isAr ? 'بطاقات الأسطول الفاخر' : 'FLEET SHOWCASE CARDS'}
            title={isAr ? 'عرض مركبات الأسطول الملكي' : 'Royal Automotive Presentation'}
            subtitle={isAr
              ? 'بطاقات متجاوبة تظهر فرادى على الهواتف وبشكل مزدوج على الأجهزة اللوحية وثلاثي على الشاشات الكبيرة لمنع الضيق البصري.'
              : 'Responsive grid (1 card on mobile, 2 on tablet, 3 on desktop) preventing cramped or narrow layouts on 390px and 515px viewports.'}
          />
          {/* Responsive grid: 1 col on mobile, 2 col on md (tablet), 3 col on lg (desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <RoyalVehicleCard
              id="yukon"
              slug="gmc-yukon-xl"
              name="GMC Yukon XL VIP"
              category={isAr ? 'SUV فاخر عائلي' : 'VIP LUXURY SUV'}
              sampleTag={isAr ? 'نموذج تصميم' : 'SAMPLE PREVIEW'}
              passengers={7}
              luggage={8}
              startingPriceSAR={450}
              imageSrc="/assets/images/vehicles/gmc-yukon-xl/exterior-studio.webp"
              description={isAr
                ? 'المفضلة للوفود والعائلات الكبيرة مع سعة فائقة للحقائب ومياه زمزم وتكييف ثلاثي المناطق.'
                : 'The premier choice for large Umrah families with extended chassis, 8 large bags capacity, and tri-zone climate.'}
              features={[
                isAr ? 'تكييف ثلاثي المناطق فائق التبريد' : 'Tri-zone climate control',
                isAr ? 'سعة 8 حقائب كبيرة وصناديق زمزم' : '8 Large luggage bags capacity',
                isAr ? 'سائق خاص محترف بلباس رسمي' : 'Professional suited chauffeur',
              ]}
              locale={locale}
            />

            <RoyalVehicleCard
              id="staria"
              slug="hyundai-staria"
              name="Hyundai Staria VIP"
              category={isAr ? 'فان عائلي فاخر' : 'PREMIUM FAMILY VAN'}
              sampleTag={isAr ? 'نموذج تصميم' : 'SAMPLE PREVIEW'}
              passengers={7}
              luggage={6}
              startingPriceSAR={250}
              imageSrc="/assets/images/vehicles/hyundai-staria/exterior-studio.webp"
              description={isAr
                ? 'مقاعد كابتن فاخرة، عتبة منخفضة ومريحة لكبار السن، وتصميم عصري لرحاب الحرمين.'
                : 'Futuristic exterior with luxury captain chairs, low step-in height ideal for elders, and spacious cabin.'}
              features={[
                isAr ? 'مقاعد كابتن فاخرة مع وضعية استرخاء' : 'Executive captain lounge seats',
                isAr ? 'أبواب كهربائية منزلقة لسهولة الركوب' : 'Electric dual sliding doors',
                isAr ? 'مياه زمزم مبردة وضيافة مجانية' : 'Complimentary bottled Zamzam',
              ]}
              locale={locale}
            />

            <RoyalVehicleCard
              id="camry"
              slug="toyota-camry"
              name="Toyota Camry Executive"
              category={isAr ? 'سيدان تنفيذي' : 'EXECUTIVE SEDAN'}
              sampleTag={isAr ? 'نموذج تصميم' : 'SAMPLE PREVIEW'}
              passengers={4}
              luggage={3}
              startingPriceSAR={200}
              imageSrc="/assets/images/vehicles/toyota-camry/exterior-studio.webp"
              description={isAr
                ? 'خيار اقتصادي فاخر ومريح للأفراد والأزواج مع راحة كاملة وتكييف متطور بين جدة ومكة.'
                : 'Refined, economical VIP comfort for couples and solo pilgrims with silent highway ride and trunk space.'}
              features={[
                isAr ? 'راحة تامة لـ 4 ركاب و 3 حقائب' : 'Optimal for 4 passengers & 3 bags',
                isAr ? 'تكييف قوي هادئ في أشد الأيام حرارة' : 'Powerful dual climate cooling',
                isAr ? 'سعر ثابت شامل الوقود ورسوم الطرق' : 'All-inclusive fixed toll fares',
              ]}
              locale={locale}
            />
          </div>
        </section>

        {/* 8. ROYAL ROUTE & PRICING CARDS */}
        <section className="mb-14 sm:mb-20">
          <SectionHeader
            badge={isAr ? 'مسارات النقل والتسعير' : 'HIGHWAY CORRIDORS & PRICING'}
            title={isAr ? 'بطاقات المسارات والأسعار الثابتة' : 'Fixed-Rate Corridor Presentation'}
            subtitle={isAr
              ? 'مقارنة فئات السيارات وأسعارها الرسمية المعتمدة بوضوح تام بدون أي أخطاء أو نصوص متداخلة.'
              : 'Highway corridor route cards with transparent tiered fares and door-to-door itinerary milestones.'}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            <RoyalRouteCard
              id="jeddah-airport-to-makkah"
              title={isAr ? 'مطار جدة (KAIA) ← فندق مكة المكرمة' : 'Jeddah Airport (KAIA) → Makkah Hotel'}
              duration="60-75 mins"
              distance="95 km"
              startingFareSAR={200}
              imageSrc="/assets/images/jeddah-airport-pickup-umrah.webp"
              description={isAr
                ? 'استقبال مباشر من صالة المطار وتوصيل مباشر حتى باب فندقكم بمكة المكرمة بسيارة خاصة وسائق مخصص.'
                : 'Direct private transfer from King Abdulaziz Airport (Terminal 1 & North) to your Makkah hotel door.'}
              inclusions={[
                isAr ? 'سائق خاص ينتظرك بلوحة ترحيبية باسمك' : 'Meet & greet with your name board',
                isAr ? '60 دقيقة انتظار مجاني بعد هبوط الطائرة' : '60-min complimentary airport waiting',
                isAr ? 'شامل رسوم الطرق السريعة والوقود والضريبة' : 'Includes all toll gates, fuel, and taxes',
              ]}
              locale={locale}
            />

            <RoyalPricingCard
              title={isAr ? 'مطار جدة ← فنادق مكة المكرمة' : 'Jeddah Airport → Makkah Hotels'}
              subtitle={isAr
                ? 'الأسعار الرسمية المعتمدة لأسطول ضيوف الرحمن VIP'
                : 'Authoritative fixed rates across all executive vehicle categories'}
              startingPriceSAR={200}
              locale={locale}
              tiers={[
                { vehicleName: 'Toyota Camry Executive', category: 'Executive Sedan', capacityPax: 4, capacityBags: 3, priceSAR: 200, bookingUrl: `/${locale}/booking?vehicle=camry` },
                { vehicleName: 'Hyundai Staria VIP', category: 'Family Van', capacityPax: 7, capacityBags: 6, priceSAR: 250, bookingUrl: `/${locale}/booking?vehicle=staria`, isPopular: true },
                { vehicleName: 'Toyota HiAce VIP', category: 'Minibus', capacityPax: 10, capacityBags: 10, priceSAR: 280, bookingUrl: `/${locale}/booking?vehicle=hiace` },
                { vehicleName: 'GMC Yukon XL VIP', category: 'Luxury SUV', capacityPax: 7, capacityBags: 8, priceSAR: 450, bookingUrl: `/${locale}/booking?vehicle=yukon` },
              ]}
              inclusions={[
                isAr ? 'صفر دفعة مقدمة • الدفع نقدًا بعد الوصول' : 'Zero advance deposit • Cash after arrival',
                isAr ? 'تتبع آلي لرقم رحلة الطيران بالرادار' : 'Automated flight schedule radar tracking',
                isAr ? 'مياه زمزم مبردة مجانية داخل السيارة' : 'Chilled complimentary Zamzam water',
              ]}
            />
          </div>
        </section>

        {/* 9. IMAGE GALLERY COMPONENT */}
        <section className="mb-14 sm:mb-20">
          <SectionHeader
            badge={isAr ? 'معرض الصور التفاعلي' : 'INTERACTIVE GALLERY'}
            title={isAr ? 'مستعرض الصور والفئات المتجاوب' : 'Responsive Automotive Media Viewer'}
            subtitle={isAr
              ? 'معرض تفاعلي يدعم السحب باللمس على الجوال، وتكبير الصور للشاشة الكاملة، وتصفح المقصورة والمظهر الخارجي.'
              : 'Interactive media viewer supporting touch swiping on mobile, full lightbox expansion, and category filters.'}
          />
          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-[#E8E3DA] p-4 sm:p-8 shadow-xs">
            <RoyalGallery images={SAMPLE_GALLERY_IMAGES} locale={locale} />
          </div>
        </section>
      </div>

      {/* SAMPLE MODAL COMPONENT */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={isAr ? 'تأكيد الحجز الفاخر — ضيوف الرحمن VIP' : 'Reserve VIP Chauffeur — Duyuf Alrahman'}
        description={isAr ? 'مراجعة بيانات الرحلة والضمانات المشمولة' : 'Review your itinerary and hospitality guarantees'}
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>
              {isAr ? 'إلغاء' : 'Close'}
            </Button>
            <Button variant="primary" size="sm" onClick={() => setModalOpen(false)}>
              {isAr ? 'المتابعة للحجز' : 'Proceed to Book'}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Alert variant="royal" title={isAr ? 'ضمان السعر الثابت والدفع بعد الوصول' : 'Guaranteed Rate & Cash on Arrival'}>
            {isAr
              ? 'لا نطلب أية بيانات بنكية أو دفع مسبق؛ الدفع يتم نقدًا للسائق مباشرة بعد انتهاء الرحلة ووصولكم بالسلامة.'
              : 'Zero advance prepayment required. Payment is strictly cash to your chauffeur after arrival at your hotel.'}
          </Alert>

          <div className="p-4 rounded-xl bg-[#F7F5F0] border border-[#E8E3DA] space-y-2 text-xs font-sans">
            <div className="flex justify-between">
              <span className="text-[#687386]">{isAr ? 'المسار المحدد:' : 'Route:'}</span>
              <span className="font-bold text-[#182235]">Jeddah Airport → Makkah Hotel</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#687386]">{isAr ? 'السيارة:' : 'Vehicle:'}</span>
              <span className="font-bold text-[#182235]">GMC Yukon XL VIP (7 Pax / 8 Bags)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#687386]">{isAr ? 'السعر الثابت:' : 'Total Fare:'}</span>
              <span className="font-serif font-bold text-base text-[#182235]">450 SAR</span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
