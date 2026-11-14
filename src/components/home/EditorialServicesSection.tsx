'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Plane,
  Car,
  Navigation,
  Compass,
  Users,
  Award,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  ShieldCheck,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';

interface EditorialServicesSectionProps {
  locale: Locale;
  dict: Dictionary;
}

interface ServiceChapter {
  id: string;
  number: string;
  tag: string;
  title: string;
  desc: string;
  facts: [string, string];
  cta: string;
  href: string;
  image: string;
  alt: string;
  objectPosition: string;
  icon: 'plane' | 'car' | 'route' | 'compass' | 'users' | 'award';
}

function ServiceIcon({ icon, className }: { icon: ServiceChapter['icon']; className?: string }) {
  switch (icon) {
    case 'plane':
      return <Plane className={className} aria-hidden="true" />;
    case 'car':
      return <Car className={className} aria-hidden="true" />;
    case 'route':
      return <Navigation className={className} aria-hidden="true" />;
    case 'compass':
      return <Compass className={className} aria-hidden="true" />;
    case 'users':
      return <Users className={className} aria-hidden="true" />;
    case 'award':
      return <Award className={className} aria-hidden="true" />;
  }
}

export function EditorialServicesSection({ locale, dict }: EditorialServicesSectionProps) {
  const isRtl = locale === 'ar' || locale === 'ur';
  const dir = isRtl ? 'rtl' : 'ltr';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const es = dict.editorial_services;

  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const chapters: ServiceChapter[] = [
    {
      id: 'airport-transfer',
      number: '01',
      tag: es.srv1Tag,
      title: es.srv1Title,
      desc: es.srv1Desc,
      facts: [es.srv1Fact1, es.srv1Fact2],
      cta: es.srv1Cta,
      href: `/${locale}/booking?service=airport-transfer`,
      image: '/assets/images/routes/jeddah-airport-to-makkah.jpg',
      alt: es.srv1Alt,
      objectPosition: 'object-[50%_55%]',
      icon: 'plane',
    },
    {
      id: 'jeddah-makkah',
      number: '02',
      tag: es.srv2Tag,
      title: es.srv2Title,
      desc: es.srv2Desc,
      facts: [es.srv2Fact1, es.srv2Fact2],
      cta: es.srv2Cta,
      href: `/${locale}/routes/jeddah-airport-to-makkah`,
      image: '/assets/blueprint/blog/vip-umrah-transport-jeddah-to-makkah.webp',
      alt: es.srv2Alt,
      objectPosition: 'object-[68%_45%]',
      icon: 'car',
    },
    {
      id: 'makkah-madinah',
      number: '03',
      tag: es.srv3Tag,
      title: es.srv3Title,
      desc: es.srv3Desc,
      facts: [es.srv3Fact1, es.srv3Fact2],
      cta: es.srv3Cta,
      href: `/${locale}/routes/makkah-to-madinah`,
      image: '/assets/blueprint/blog/private-transfer-makkah-to-madinah.webp',
      alt: es.srv3Alt,
      objectPosition: 'object-center',
      icon: 'route',
    },
    {
      id: 'ziyarat-tours',
      number: '04',
      tag: es.srv4Tag,
      title: es.srv4Title,
      desc: es.srv4Desc,
      facts: [es.srv4Fact1, es.srv4Fact2],
      cta: es.srv4Cta,
      href: `/${locale}/ziyarat`,
      image: '/assets/blueprint/blog/madinah-ziyarat-private-car-guide.webp',
      alt: es.srv4Alt,
      objectPosition: 'object-center',
      icon: 'compass',
    },
    {
      id: 'family-mobility',
      number: '05',
      tag: es.srv5Tag,
      title: es.srv5Title,
      desc: es.srv5Desc,
      facts: [es.srv5Fact1, es.srv5Fact2],
      cta: es.srv5Cta,
      href: `/${locale}/fleet`,
      image: '/assets/blueprint/blog/elderly-friendly-umrah-transport.webp',
      alt: es.srv5Alt,
      objectPosition: 'object-[50%_20%]',
      icon: 'users',
    },
    {
      id: 'vip-chauffeur',
      number: '06',
      tag: es.srv6Tag,
      title: es.srv6Title,
      desc: es.srv6Desc,
      facts: [es.srv6Fact1, es.srv6Fact2],
      cta: es.srv6Cta,
      href: `/${locale}/services`,
      image: '/assets/images/cinematic/services/services-suv-highway.jpg',
      alt: es.srv6Alt,
      objectPosition: 'object-[38%_55%]',
      icon: 'award',
    },
  ];

  // Three curated supporting photographs mapped cleanly to active chapters (intercity, ziyarat, family)
  const supportingIndices = [2, 3, 4] as const;

  const activeChapter = chapters[activeIndex];

  const handleSelectChapter = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleChapterKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      let nextIdx: number | null = null;
      if (e.key === 'ArrowDown' || e.key === (isRtl ? 'ArrowLeft' : 'ArrowRight')) {
        nextIdx = (activeIndex + 1) % chapters.length;
      } else if (e.key === 'ArrowUp' || e.key === (isRtl ? 'ArrowRight' : 'ArrowLeft')) {
        nextIdx = (activeIndex - 1 + chapters.length) % chapters.length;
      } else if (e.key === 'Home') {
        nextIdx = 0;
      } else if (e.key === 'End') {
        nextIdx = chapters.length - 1;
      }

      if (nextIdx !== null) {
        e.preventDefault();
        setActiveIndex(nextIdx);
        tabRefs.current[nextIdx]?.focus();
      }
    },
    [activeIndex, chapters.length, isRtl]
  );

  return (
    <section
      id="services"
      aria-labelledby="editorial-services-heading"
      dir={dir}
      className="relative scroll-mt-24 bg-[#F7F5F0] text-[#101827] border-t border-b border-[#E8E3DA] py-12 sm:py-16 lg:py-16 overflow-hidden"
    >
      {/* Subtle Warm Ivory Editorial Background Glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,rgba(169,123,39,0.08)_0%,transparent_75%)]"
        aria-hidden="true"
      />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Asymmetric Editorial Composition Grid */}
        <div className="flex flex-col gap-6 sm:gap-8 lg:grid lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-8 xl:gap-x-10 lg:gap-y-6 items-start">
          {/* BLOCK 1: Editorial Headline & Intro (1st on Mobile, Top-Left on Desktop) */}
          <div className="w-full lg:col-span-5 lg:col-start-1 lg:row-start-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5DEC9] shadow-xs text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#8A6114] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#A97B27] shrink-0" aria-hidden="true" />
              <span>{dict.services.sectionPill}</span>
            </div>

            <h2
              id="editorial-services-heading"
              className="font-playfair font-serif text-3xl sm:text-4xl xl:text-[2.85rem] font-bold text-[#101827] leading-[1.14] tracking-tight"
            >
              {dict.services.heading}{' '}
              <span className="text-[#8A6114]">{dict.services.headingHighlight}</span>
            </h2>

            <p className="mt-3.5 text-sm sm:text-base text-[#334155] font-normal leading-relaxed">
              {dict.services.subtitle}
            </p>
            <p className="mt-2 text-xs sm:text-sm text-[#475569] leading-relaxed">
              {es.introNote}
            </p>
          </div>

          {/* BLOCK 2: Prominent Main Service Photograph (2nd on Mobile, Center-Right Prominent Frame on Desktop) */}
          <div className="w-full lg:col-span-4 lg:col-start-6 lg:row-start-1 lg:row-span-2 lg:self-stretch">
            <div className="group h-full flex flex-col rounded-[22px] bg-white p-2 border border-[#E5DEC9] shadow-[0_24px_60px_rgba(16,24,39,0.11)]">
              <div className="relative aspect-[4/3.6] sm:aspect-[4/3.2] lg:aspect-auto lg:min-h-[430px] xl:min-h-[460px] lg:flex-1 w-full overflow-hidden rounded-[16px] bg-[#101827]">
                {chapters.map((chapter, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <div
                      key={chapter.id}
                      aria-hidden={!isActive}
                      className={`absolute inset-0 transition-opacity duration-300 ease-out motion-reduce:transition-none ${
                        isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                      }`}
                    >
                      <Image
                        src={chapter.image}
                        alt={chapter.alt}
                        fill
                        sizes="(max-width: 1023px) 92vw, 33vw"
                        priority={idx === 0}
                        className={`object-cover ${chapter.objectPosition} transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:transform-none`}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Clean Architectural Caption Strip Beneath Photo (Zero Overlap on Imagery) */}
              <div className="px-3 sm:px-4 pt-3.5 pb-2 flex items-center justify-between gap-3 bg-white">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-[11px] font-bold tracking-wider uppercase text-[#8A6114]">
                    <span className="tabular-nums">
                      {activeChapter.number} / 0{chapters.length}
                    </span>
                    <span aria-hidden="true" className="text-[#D4CBB8]">
                      ·
                    </span>
                    <span className="truncate">{activeChapter.tag}</span>
                  </div>
                  <p className="mt-0.5 text-sm sm:text-[15px] font-serif font-bold text-[#101827] truncate">
                    {activeChapter.title}
                  </p>
                </div>

                <Link
                  href={activeChapter.href}
                  aria-label={activeChapter.cta}
                  className="shrink-0 w-11 h-11 rounded-full border border-[#E5DEC9] bg-[#F7F5F0] text-[#101827] hover:bg-[#101827] hover:text-[#F7F5F0] hover:border-[#101827] flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A97B27]"
                >
                  <ArrowIcon className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          {/* BLOCK 3: Active Service Spotlight, CTAs & Editorial Chapter Index (3rd on Mobile, Bottom-Left on Desktop) */}
          <div className="w-full lg:col-span-5 lg:col-start-1 lg:row-start-2 flex flex-col gap-5">
            {/* Screen reader polite status announcement when service switches */}
            <div className="sr-only" aria-live="polite">
              {activeChapter.title} — {activeChapter.tag}
            </div>

            {/* Active Editorial Service Story Block */}
            <div className="rounded-2xl bg-white border border-[#E8E3DA] p-5 sm:p-6 shadow-[0_12px_36px_rgba(16,24,39,0.05)]">
              <div className="flex items-center gap-2.5 text-xs font-bold text-[#8A6114]">
                <span className="w-8 h-8 rounded-full bg-[#FBF6EA] border border-[#E5DEC9] flex items-center justify-center text-[#A97B27] shrink-0">
                  <ServiceIcon icon={activeChapter.icon} className="w-4 h-4" />
                </span>
                <span>{activeChapter.tag}</span>
              </div>

              <h3 className="mt-3 font-playfair font-serif text-xl sm:text-2xl font-bold text-[#101827] leading-snug">
                {activeChapter.title}
              </h3>

              <p className="mt-2 text-xs sm:text-sm text-[#334155] leading-relaxed lg:min-h-[4.25rem]">
                {activeChapter.desc}
              </p>

              <ul className="mt-4 pt-3.5 border-t border-[#EFECE4] grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#1E293B]">
                {activeChapter.facts.map((fact, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#A97B27] shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="leading-snug font-medium">{fact}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link
                  href={activeChapter.href}
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full bg-[#101827] hover:bg-[#19243B] text-[#F7F5F0] text-xs sm:text-sm font-semibold shadow-[0_10px_24px_rgba(16,24,39,0.16)] transition-all hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A97B27] focus-visible:ring-offset-2 focus-visible:ring-offset-white group"
                >
                  <span>{activeChapter.cta}</span>
                  <ArrowIcon
                    className={`w-4 h-4 text-[#D6A13A] transition-transform motion-reduce:transform-none ${
                      isRtl ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'
                    }`}
                    aria-hidden="true"
                  />
                </Link>

                <Link
                  href={`/${locale}/services`}
                  className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 py-2.5 rounded-full border border-[#D8CFBE] hover:border-[#A97B27] bg-transparent text-[#101827] hover:text-[#8A6114] text-xs sm:text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A97B27] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  <span>{es.ctaExploreAll}</span>
                </Link>
              </div>
            </div>

            {/* Editorial Hairline Chapter Selector (Non-Card Typographic Navigation) */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#475569] mb-2">
                {es.chapterLabel}
              </p>
              <div
                className="border-t border-[#E8E3DA]"
                onKeyDown={handleChapterKeyDown}
                role="group"
                aria-label={es.chapterLabel}
              >
                {chapters.map((chapter, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={chapter.id}
                      ref={(el) => {
                        tabRefs.current[idx] = el;
                      }}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => handleSelectChapter(idx)}
                      className={`w-full min-h-[44px] py-2 px-3 border-b border-[#E8E3DA] flex items-center justify-between gap-3 text-start transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#A97B27] ${
                        isActive
                          ? 'bg-white border-s-2 border-s-[#A97B27] text-[#101827]'
                          : 'border-s-2 border-s-transparent hover:bg-white/60 text-[#334155]'
                      }`}
                    >
                      <span className="flex items-center gap-3 min-w-0">
                        <span
                          className={`tabular-nums text-[11px] font-bold ${
                            isActive ? 'text-[#8A6114]' : 'text-[#64748B]'
                          }`}
                        >
                          {chapter.number}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold truncate">
                          {chapter.title}
                        </span>
                      </span>
                      <span className="flex items-center gap-2 shrink-0">
                        <span className="hidden sm:inline text-[11px] text-[#64748B]">
                          {chapter.tag}
                        </span>
                        <ArrowIcon
                          className={`w-3.5 h-3.5 transition-opacity motion-reduce:transition-none ${
                            isActive ? 'text-[#8A6114] opacity-100' : 'text-[#94A3B8] opacity-60'
                          }`}
                          aria-hidden="true"
                        />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* BLOCK 4: Supporting Editorial Photographs & Structured Highlights (4th on Mobile, Far-Right Staggered Column on Desktop) */}
          <div className="w-full lg:col-span-3 lg:col-start-10 lg:row-start-1 lg:row-span-2 lg:pt-4 flex flex-col gap-3.5">
            {/* Three Clickable Supporting Editorial Photographs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
              {supportingIndices.map((chapterIndex) => {
                const item = chapters[chapterIndex];
                const isSelected = activeIndex === chapterIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => handleSelectChapter(chapterIndex)}
                    className={`group w-full text-start rounded-2xl bg-white p-1.5 border transition-all duration-300 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A97B27] flex flex-row sm:flex-col items-center sm:items-stretch gap-3 sm:gap-0 ${
                      isSelected
                        ? 'border-[#A97B27] ring-1 ring-[#A97B27]/40 shadow-[0_14px_32px_rgba(169,123,39,0.14)]'
                        : 'border-[#E8E3DA] hover:border-[#A97B27]/70 shadow-[0_8px_22px_rgba(16,24,39,0.06)]'
                    }`}
                  >
                    <div className="relative w-24 h-20 sm:w-full sm:h-auto sm:aspect-[16/10] shrink-0 overflow-hidden rounded-xl bg-[#101827]">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 639px) 96px, (max-width: 1023px) 30vw, 22vw"
                        className={`object-cover ${item.objectPosition} transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:transform-none`}
                      />
                    </div>
                    <div className="flex-1 min-w-0 py-1 pe-2 sm:px-2.5 sm:pt-2.5 sm:pb-1.5">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-[#8A6114] truncate">
                        {item.number} · {item.tag}
                      </span>
                      <span className="mt-0.5 block text-xs sm:text-[13px] font-semibold text-[#101827] leading-snug line-clamp-2">
                        {item.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Small Structured Service Highlights Block */}
            <div className="rounded-2xl bg-white border border-[#E8E3DA] p-4 shadow-[0_8px_24px_rgba(16,24,39,0.04)]">
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#8A6114] mb-3">
                {es.highlightsTitle}
              </p>
              <ul className="space-y-2.5 text-xs text-[#1E293B]">
                <li className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#A97B27] shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="leading-snug font-medium">{es.highlight1}</span>
                </li>
                <li className="flex items-start gap-2.5 pt-2 border-t border-[#F1EDE4]">
                  <ShieldCheck className="w-4 h-4 text-[#A97B27] shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="leading-snug font-medium">{es.highlight2}</span>
                </li>
                <li className="flex items-start gap-2.5 pt-2 border-t border-[#F1EDE4]">
                  <MessageCircle className="w-4 h-4 text-[#A97B27] shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="leading-snug font-medium">{es.highlight3}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
