'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Clock,
  Route as RouteIcon,
  ShieldCheck,
  Compass,
  CheckCircle2,
} from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { useCurrency } from '@/context/CurrencyContext';
import type { ExplorerRouteItem } from '@/lib/routes-explorer-mapper';

interface InteractiveRoutesExplorerProps {
  locale: Locale;
  dict: Dictionary;
  routes: ExplorerRouteItem[];
}

function formatDurationText(
  minutes: number | null,
  hrsUnit: string,
  minUnit: string
): string | null {
  if (!minutes || minutes <= 0) return null;
  if (minutes >= 120) {
    const hrs = Math.round((minutes / 60) * 10) / 10;
    return `${hrs} ${hrsUnit}`;
  }
  return `${minutes} ${minUnit}`;
}

export function InteractiveRoutesExplorer({
  locale,
  dict,
  routes,
}: InteractiveRoutesExplorerProps) {
  const { formatPrice } = useCurrency();
  const isRtl = locale === 'ar' || locale === 'ur';
  const dir = isRtl ? 'rtl' : 'ltr';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const PrevIcon = isRtl ? ChevronRight : ChevronLeft;
  const NextIcon = isRtl ? ChevronLeft : ChevronRight;
  const rx = dict.routes_explorer;

  const [activeIndex, setActiveIndex] = useState(0);
  const mobileTrackRef = useRef<HTMLDivElement | null>(null);
  const mobileCardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const touchStartXRef = useRef<number | null>(null);
  const isProgrammaticScrollRef = useRef(false);

  const count = routes.length;

  const selectRoute = useCallback(
    (nextIdx: number, syncMobileScroll = true) => {
      if (count === 0) return;
      const wrapped = ((nextIdx % count) + count) % count;
      setActiveIndex(wrapped);

      if (syncMobileScroll && mobileTrackRef.current && mobileCardRefs.current[wrapped]) {
        const track = mobileTrackRef.current;
        const card = mobileCardRefs.current[wrapped];
        if (card) {
          const reducedMotion =
            typeof window !== 'undefined' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          const cardCenter = card.offsetLeft + card.offsetWidth / 2;
          const targetLeft = cardCenter - track.clientWidth / 2;
          isProgrammaticScrollRef.current = true;
          track.scrollTo({
            left: targetLeft,
            behavior: reducedMotion ? 'auto' : 'smooth',
          });
          setTimeout(() => {
            isProgrammaticScrollRef.current = false;
          }, 420);
        }
      }
    },
    [count]
  );

  const handleNext = useCallback(() => {
    selectRoute(activeIndex + 1);
  }, [activeIndex, selectRoute]);

  const handlePrev = useCallback(() => {
    selectRoute(activeIndex - 1);
  }, [activeIndex, selectRoute]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      // Avoid hijacking arrow keys when user interacts inside nested links if needed; horizontal arrows always navigate
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (isRtl) handlePrev();
        else handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (isRtl) handleNext();
        else handlePrev();
      } else if (e.key === 'Home') {
        e.preventDefault();
        selectRoute(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        selectRoute(count - 1);
      }
    },
    [count, handleNext, handlePrev, isRtl, selectRoute]
  );

  const handleDesktopTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0]?.clientX ?? null;
  };

  const handleDesktopTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const endX = e.changedTouches[0]?.clientX;
    if (typeof endX === 'number') {
      const deltaX = endX - touchStartXRef.current;
      if (Math.abs(deltaX) > 40) {
        if (isRtl) {
          if (deltaX > 0) handleNext();
          else handlePrev();
        } else {
          if (deltaX < 0) handleNext();
          else handlePrev();
        }
      }
    }
    touchStartXRef.current = null;
  };

  // Detect active snapped card on mobile touch swipe without interfering with button taps
  useEffect(() => {
    const track = mobileTrackRef.current;
    if (!track) return;

    let timer: ReturnType<typeof setTimeout> | null = null;
    const onScroll = () => {
      if (isProgrammaticScrollRef.current) return;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        const trackRect = track.getBoundingClientRect();
        const centerViewportX = trackRect.left + trackRect.width / 2;
        let closestIdx = 0;
        let minDistance = Infinity;

        mobileCardRefs.current.forEach((card, idx) => {
          if (!card) return;
          const r = card.getBoundingClientRect();
          const cardCenterX = r.left + r.width / 2;
          const dist = Math.abs(cardCenterX - centerViewportX);
          if (dist < minDistance) {
            minDistance = dist;
            closestIdx = idx;
          }
        });

        setActiveIndex(closestIdx);
      }, 90);
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      track.removeEventListener('scroll', onScroll);
      if (timer) clearTimeout(timer);
    };
  }, [count]);

  if (count === 0) return null;

  const activeRoute = routes[activeIndex] || routes[0];
  const paddedCurrent = String(activeIndex + 1).padStart(2, '0');
  const paddedTotal = String(count).padStart(2, '0');
  const durationDisplay = formatDurationText(
    activeRoute.durationMinutes,
    rx.hrsUnit,
    rx.minUnit
  );

  // Desktop 3-card showcase window: [Active Prominent, Next 1, Next 2]
  const nextOneIdx = (activeIndex + 1) % count;
  const nextTwoIdx = (activeIndex + 2) % count;
  const inactivePreviews: { route: ExplorerRouteItem; index: number; variant: 'mid' | 'far' }[] = [];
  if (count > 1) {
    inactivePreviews.push({ route: routes[nextOneIdx], index: nextOneIdx, variant: 'mid' });
  }
  if (count > 2) {
    inactivePreviews.push({ route: routes[nextTwoIdx], index: nextTwoIdx, variant: 'far' });
  }

  return (
    <section
      id="routes"
      aria-labelledby="routes-explorer-heading"
      aria-roledescription="carousel"
      dir={dir}
      onKeyDown={handleKeyDown}
      className="relative scroll-mt-24 bg-[#F7F5F0] text-[#101827] border-t border-b border-[#E8E3DA] py-14 sm:py-16 lg:py-20 overflow-hidden"
    >
      {/* Subtle Ambient Warm Gold Vignette */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(ellipse_at_top,rgba(169,123,39,0.08)_0%,transparent_75%)]"
        aria-hidden="true"
      />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Polite Screen Reader Announcement on Active Route Change */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {`${activeRoute.title} — ${rx.originLabel}: ${activeRoute.origin}, ${rx.destLabel}: ${activeRoute.destination}${
            activeRoute.startingPriceSAR !== null
              ? `, ${rx.startingFrom} ${formatPrice(activeRoute.startingPriceSAR)}`
              : ''
          }`}
        </div>

        {/* Two-Column Desktop / Ordered Mobile Grid */}
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-10 xl:gap-x-12 lg:gap-y-5 items-start">
          {/* BLOCK 1: Headline + Origin/Destination + Supporting Description (Top on Mobile & Top-Left on Desktop) */}
          <div className="w-full order-1 lg:order-none lg:col-span-5 lg:col-start-1 lg:row-start-1">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5DEC9] shadow-xs text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#8A6114]">
                <RouteIcon className="w-3.5 h-3.5 text-[#A97B27] shrink-0" aria-hidden="true" />
                <span>{rx.sectionPill}</span>
              </span>
              <span dir="ltr" className="tabular-nums text-xs font-bold px-2.5 py-1 rounded-full bg-[#101827]/5 text-[#334155]">
                {paddedCurrent} / {paddedTotal}
              </span>
            </div>

            <h2
              id="routes-explorer-heading"
              className="font-playfair font-serif text-3xl sm:text-4xl xl:text-[2.65rem] font-bold text-[#101827] leading-[1.15] tracking-tight"
            >
              {activeRoute.title}
            </h2>

            {/* Explicit Dynamic Origin -> Destination Trail */}
            <div className="mt-3.5 flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold text-[#101827]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-[#E8E3DA] text-[#101827]">
                <MapPin className="w-3.5 h-3.5 text-[#8A6114] shrink-0" aria-hidden="true" />
                <span className="text-[#64748B] font-normal">{rx.originLabel}:</span>
                <span>{activeRoute.origin}</span>
              </span>
              <ArrowIcon className="w-4 h-4 text-[#A97B27] shrink-0" aria-hidden="true" />
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-[#E8E3DA] text-[#101827]">
                <span className="text-[#64748B] font-normal">{rx.destLabel}:</span>
                <span>{activeRoute.destination}</span>
              </span>
            </div>

            <p className="mt-4 text-sm sm:text-base text-[#334155] leading-relaxed lg:min-h-[4.5rem]">
              {activeRoute.description}
            </p>
          </div>

          {/* BLOCK 2: Destination Cards Stage (2nd on Mobile Horizontal Swipe, Full Right Column on Desktop) */}
          <div
            className="w-full order-2 lg:order-none lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:row-span-2 lg:self-stretch"
            onTouchStart={handleDesktopTouchStart}
            onTouchEnd={handleDesktopTouchEnd}
          >
            {/* Mobile & Tablet Horizontal Scroll-Snap Carousel (<1024px) */}
            <div
              ref={mobileTrackRef}
              className="lg:hidden flex gap-3.5 overflow-x-auto snap-x snap-mandatory scroll-smooth motion-reduce:scroll-auto pb-3 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              role="list"
              aria-label={rx.sectionPill}
            >
              {routes.map((route, idx) => {
                const isActive = idx === activeIndex;
                const cardDuration = formatDurationText(
                  route.durationMinutes,
                  rx.hrsUnit,
                  rx.minUnit
                );
                return (
                  <button
                    key={route.id}
                    ref={(el) => {
                      mobileCardRefs.current[idx] = el;
                    }}
                    type="button"
                    aria-pressed={isActive}
                    aria-label={`${rx.selectRoutePrefix}: ${route.title}`}
                    onClick={() => selectRoute(idx)}
                    className={`snap-center shrink-0 w-[80vw] max-w-[330px] sm:w-[340px] rounded-[22px] p-1.5 bg-white border text-start transition-all duration-300 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A97B27] ${
                      isActive
                        ? 'border-[#A97B27] ring-2 ring-[#A97B27]/30 shadow-[0_18px_40px_rgba(16,24,39,0.16)] opacity-100'
                        : 'border-[#E8E3DA] opacity-85 hover:opacity-100 shadow-[0_8px_20px_rgba(16,24,39,0.06)]'
                    }`}
                  >
                    <div className="relative aspect-[4/4.6] w-full overflow-hidden rounded-[17px] bg-gradient-to-br from-[#0F172A] via-[#131F34] to-[#090E18]">
                      {route.image ? (
                        <Image
                          src={route.image}
                          alt={route.title}
                          fill
                          sizes="(max-width: 639px) 80vw, 340px"
                          loading="eager"
                          priority={idx === 0}
                          className={`object-cover ${route.imagePosition} transition-transform duration-500 ease-out motion-reduce:transition-none motion-reduce:transform-none ${
                            isActive ? 'scale-[1.02]' : 'scale-100'
                          }`}
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-[#F7F5F0]/80">
                          <Compass className="w-10 h-10 text-[#C5A15D] mb-2" aria-hidden="true" />
                          <span className="text-xs font-bold tracking-widest uppercase text-[#D6A13A]">
                            {route.originCode} · {route.destinationCode}
                          </span>
                        </div>
                      )}

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090D15]/95 via-[#090D15]/35 to-transparent" />

                      {/* Top Index & Price Chip */}
                      <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2">
                        <span dir="ltr" className="px-2.5 py-1 rounded-full bg-[#090D15]/75 backdrop-blur-sm border border-white/15 text-[11px] font-bold text-[#F7F5F0] tabular-nums">
                          {String(idx + 1).padStart(2, '0')} / {paddedTotal}
                        </span>
                        {route.startingPriceSAR !== null && (
                          <span className="px-3 py-1 rounded-full bg-[#F7F5F0] text-[#101827] text-xs font-bold shadow-sm tabular-nums">
                            {rx.startingFrom} {formatPrice(route.startingPriceSAR)}
                          </span>
                        )}
                      </div>

                      {/* Bottom Route Metadata */}
                      <div className="absolute inset-x-0 bottom-0 p-4 text-start">
                        <p className="text-[11px] font-semibold text-[#D6A13A] uppercase tracking-wider truncate">
                          {route.origin} {isRtl ? '←' : '→'} {route.destination}
                        </p>
                        <h3 className="mt-1 font-serif text-lg font-bold text-white leading-snug line-clamp-2">
                          {route.title}
                        </h3>
                        {(route.distanceKm !== null || cardDuration) && (
                          <div className="mt-2 flex items-center gap-3 text-[11px] text-[#E2E8F0]">
                            {route.distanceKm !== null && (
                              <span>
                                {route.distanceKm} {rx.kmUnit}
                              </span>
                            )}
                            {route.distanceKm !== null && cardDuration && <span aria-hidden="true">·</span>}
                            {cardDuration && <span>{cardDuration}</span>}
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Desktop Layered Asymmetric Destination Card Showcase (1024px+) */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-5 h-full min-h-[470px] xl:min-h-[510px]">
              {/* Prominent Active Destination Card */}
              <div className="flex-[1.55] min-w-0">
                <div className="group rounded-[24px] bg-white p-2 border border-[#A97B27]/55 shadow-[0_28px_65px_rgba(16,24,39,0.18)] transition-all duration-300 motion-reduce:transition-none">
                  <div className="relative h-[440px] xl:h-[485px] w-full overflow-hidden rounded-[18px] bg-gradient-to-br from-[#0F172A] via-[#131F34] to-[#090E18]">
                    {activeRoute.image ? (
                      <Image
                        key={activeRoute.id}
                        src={activeRoute.image}
                        alt={activeRoute.title}
                        fill
                        sizes="(max-width: 1279px) 36vw, 440px"
                        priority={activeIndex === 0}
                        className={`object-cover ${activeRoute.imagePosition} transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:transform-none`}
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-[#F7F5F0]/80">
                        <Compass className="w-12 h-12 text-[#C5A15D] mb-3" aria-hidden="true" />
                        <span className="text-sm font-bold tracking-widest uppercase text-[#D6A13A]">
                          {activeRoute.originCode} — {activeRoute.destinationCode}
                        </span>
                      </div>
                    )}

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090D15]/95 via-[#090D15]/35 to-transparent" />

                    {/* Top Floating Status Row */}
                    <div className="absolute top-4 inset-x-4 flex items-center justify-between gap-2">
                      <span dir="ltr" className="px-3 py-1 rounded-full bg-[#090D15]/80 backdrop-blur-sm border border-white/15 text-xs font-bold text-[#F7F5F0] tabular-nums">
                        {paddedCurrent} / {paddedTotal}
                      </span>
                      {activeRoute.startingPriceSAR !== null && (
                        <span className="px-3.5 py-1.5 rounded-full bg-[#F7F5F0] text-[#101827] text-xs font-extrabold shadow-md tabular-nums">
                          {rx.startingFrom} {formatPrice(activeRoute.startingPriceSAR)}
                        </span>
                      )}
                    </div>

                    {/* Bottom Card Narrative + Direct Booking Link */}
                    <div className="absolute inset-x-0 bottom-0 p-5 xl:p-6">
                      <p className="text-xs font-semibold text-[#D6A13A] tracking-wide truncate">
                        {activeRoute.origin} {isRtl ? '←' : '→'} {activeRoute.destination}
                      </p>
                      <h3 className="mt-1 font-playfair font-serif text-xl xl:text-2xl font-bold text-white leading-snug line-clamp-2">
                        {activeRoute.title}
                      </h3>

                      <div className="mt-3 pt-3 border-t border-white/15 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 text-xs text-[#E2E8F0]">
                          {activeRoute.distanceKm !== null && (
                            <span className="font-medium">
                              {activeRoute.distanceKm} {rx.kmUnit}
                            </span>
                          )}
                          {activeRoute.distanceKm !== null && durationDisplay && (
                            <span aria-hidden="true" className="text-white/40">
                              ·
                            </span>
                          )}
                          {durationDisplay && <span className="font-medium">{durationDisplay}</span>}
                        </div>

                        <Link
                          href={activeRoute.bookingHref}
                          aria-label={`${rx.bookRouteCta}: ${activeRoute.title}`}
                          className="inline-flex items-center gap-1.5 min-h-[38px] px-4 py-1.5 rounded-full bg-[#D6A13A] hover:bg-[#E5B14B] text-[#090D15] text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        >
                          <span>{rx.bookRouteCta}</span>
                          <ArrowIcon className="w-3.5 h-3.5" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Smaller Supporting Inactive Route Cards */}
              {inactivePreviews.map(({ route, index, variant }) => {
                const heightClass =
                  variant === 'mid' ? 'h-[380px] xl:h-[420px]' : 'h-[325px] xl:h-[360px]';
                const flexClass =
                  variant === 'mid' ? 'flex-[0.72] opacity-90' : 'flex-[0.55] opacity-75';

                return (
                  <button
                    key={route.id}
                    type="button"
                    onClick={() => selectRoute(index)}
                    aria-label={`${rx.selectRoutePrefix}: ${route.title}${
                      route.startingPriceSAR !== null
                        ? ` (${rx.startingFrom} ${formatPrice(route.startingPriceSAR)})`
                        : ''
                    }`}
                    className={`${flexClass} hover:opacity-100 min-w-0 text-start group rounded-[20px] bg-white p-1.5 border border-[#E5DEC9] hover:border-[#A97B27] shadow-[0_14px_34px_rgba(16,24,39,0.10)] transition-all duration-300 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A97B27]`}
                  >
                    <div
                      className={`relative ${heightClass} w-full overflow-hidden rounded-[15px] bg-gradient-to-br from-[#0F172A] via-[#131F34] to-[#090E18]`}
                    >
                      {route.image ? (
                        <Image
                          src={route.image}
                          alt={route.title}
                          fill
                          sizes="220px"
                          loading="eager"
                          className={`object-cover ${route.imagePosition} transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:transform-none`}
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-[#F7F5F0]/75">
                          <Compass className="w-8 h-8 text-[#C5A15D] mb-2" aria-hidden="true" />
                          <span className="text-[11px] font-bold tracking-wider uppercase text-[#D6A13A]">
                            {route.originCode} {isRtl ? '←' : '→'} {route.destinationCode}
                          </span>
                        </div>
                      )}

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090D15]/95 via-[#090D15]/35 to-transparent" />

                      <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-1">
                        <span className="px-2 py-0.5 rounded-full bg-[#090D15]/75 text-[10px] font-bold text-[#F7F5F0] tabular-nums">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        {route.startingPriceSAR !== null && (
                          <span className="px-2 py-0.5 rounded-full bg-[#F7F5F0]/95 text-[#101827] text-[10px] font-bold tabular-nums truncate">
                            {formatPrice(route.startingPriceSAR)}
                          </span>
                        )}
                      </div>

                      <div className="absolute inset-x-0 bottom-0 p-3.5 text-start">
                        <p className="text-[10px] font-semibold text-[#D6A13A] truncate">
                          {route.origin}
                        </p>
                        <p className="mt-0.5 font-serif text-sm font-bold text-white leading-snug line-clamp-2">
                          {route.title}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* BLOCK 3: Specs, Price Chip, Prev/Next Controls & Booking CTA (Below cards on Mobile, Bottom-Left on Desktop) */}
          <div className="w-full order-3 lg:order-none lg:col-span-5 lg:col-start-1 lg:row-start-2 flex flex-col gap-5">
            {/* Key Telemetry & Miqat Strip */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs text-[#1E293B]">
              {activeRoute.distanceKm !== null && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E8E3DA] font-medium">
                  <RouteIcon className="w-3.5 h-3.5 text-[#A97B27]" aria-hidden="true" />
                  <span className="text-[#64748B]">{rx.distanceLabel}:</span>
                  <strong className="font-bold text-[#101827]">
                    {activeRoute.distanceKm} {rx.kmUnit}
                  </strong>
                </div>
              )}

              {durationDisplay && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E8E3DA] font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#A97B27]" aria-hidden="true" />
                  <span className="text-[#64748B]">{rx.durationLabel}:</span>
                  <strong className="font-bold text-[#101827]">{durationDisplay}</strong>
                </div>
              )}

              {activeRoute.miqatStopAllowed && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FBF6EA] border border-[#E5DEC9] text-[#8A6114] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#A97B27]" aria-hidden="true" />
                  <span>{rx.miqatBadge}</span>
                </div>
              )}
            </div>

            {/* Real Starting Price Chip — Strictly Hidden When Unavailable */}
            {activeRoute.startingPriceSAR !== null && (
              <div
                data-route-price-chip="true"
                className="rounded-2xl bg-white border border-[#E5DEC9] px-5 py-4 shadow-[0_10px_28px_rgba(16,24,39,0.05)] flex flex-wrap items-center justify-between gap-3"
              >
                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-[#8A6114]">
                    {rx.startingFrom}
                  </span>
                  <span className="block text-2xl sm:text-3xl font-playfair font-serif font-bold text-[#101827] tabular-nums mt-0.5">
                    {formatPrice(activeRoute.startingPriceSAR)}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-[#475569]">
                  <ShieldCheck className="w-4 h-4 text-[#A97B27] shrink-0" aria-hidden="true" />
                  <span>{rx.perVehicle}</span>
                </div>
              </div>
            )}

            {/* Booking CTAs Row */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={activeRoute.bookingHref}
                className="inline-flex items-center justify-center gap-2.5 min-h-[46px] px-6 py-3 rounded-full bg-[#101827] hover:bg-[#19243B] text-[#F7F5F0] text-xs sm:text-sm font-semibold shadow-[0_12px_28px_rgba(16,24,39,0.18)] transition-all hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A97B27] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F5F0] group"
              >
                <span>{rx.bookRouteCta}</span>
                <ArrowIcon
                  className={`w-4 h-4 text-[#D6A13A] transition-transform motion-reduce:transform-none ${
                    isRtl ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'
                  }`}
                  aria-hidden="true"
                />
              </Link>

              {activeRoute.guideHref && (
                <Link
                  href={activeRoute.guideHref}
                  className="inline-flex items-center justify-center gap-2 min-h-[46px] px-5 py-3 rounded-full border border-[#D8CFBE] hover:border-[#A97B27] bg-white text-[#101827] hover:text-[#8A6114] text-xs sm:text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A97B27] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F5F0]"
                >
                  <span>{rx.routeGuideCta}</span>
                </Link>
              )}
            </div>

            {/* Carousel Controls: Previous / Dots / Next */}
            <div className="pt-2 border-t border-[#E8E3DA] flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label={rx.prevAria}
                  className="w-11 h-11 rounded-full bg-white border border-[#D8CFBE] hover:border-[#101827] hover:bg-[#101827] text-[#101827] hover:text-[#F7F5F0] flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A97B27]"
                >
                  <PrevIcon className="w-5 h-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label={rx.nextAria}
                  className="w-11 h-11 rounded-full bg-white border border-[#D8CFBE] hover:border-[#101827] hover:bg-[#101827] text-[#101827] hover:text-[#F7F5F0] flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A97B27]"
                >
                  <NextIcon className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              {/* Compact Route Progress Indicator Dots */}
              <div className="flex items-center flex-wrap gap-1">
                {routes.map((route, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={route.id}
                      type="button"
                      onClick={() => selectRoute(idx)}
                      aria-label={`${rx.selectRoutePrefix}: ${route.title}`}
                      aria-current={isActive ? 'true' : undefined}
                      className="min-w-[28px] min-h-[44px] flex items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A97B27]"
                    >
                      <span
                        className={`block h-2 rounded-full transition-all duration-300 motion-reduce:transition-none ${
                          isActive
                            ? 'w-6 bg-[#8A6114]'
                            : 'w-2 bg-[#CBD5E1] hover:bg-[#94A3B8]'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
