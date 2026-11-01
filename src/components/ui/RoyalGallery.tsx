'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';

export interface GalleryImage {
  src: string;
  alt: string;
  label?: string;
  category?: 'exterior' | 'interior' | 'detail';
}

export interface RoyalGalleryProps {
  images: GalleryImage[];
  title?: string;
  locale?: string;
  className?: string;
}

export const RoyalGallery: React.FC<RoyalGalleryProps> = ({
  images,
  title,
  locale = 'en',
  className = '',
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [filter, setFilter] = useState<'all' | 'exterior' | 'interior' | 'detail'>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const touchStartX = useRef<number | null>(null);

  const filteredImages = images.filter((img) =>
    filter === 'all' ? true : img.category === filter
  );

  const activeImage = filteredImages[activeIndex] || filteredImages[0] || images[0];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, filteredImages.length]);

  if (!activeImage) return null;

  const isAr = locale === 'ar';

  return (
    <div className={`w-full ${className}`}>
      {/* Category Filter Pills (Horizontal Scroll on Mobile) */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1 scrollbar-none flex-nowrap">
        {(['all', 'exterior', 'interior', 'detail'] as const).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => {
              setFilter(cat);
              setActiveIndex(0);
            }}
            className={`min-h-[38px] px-4 py-1.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0 ${
              filter === cat
                ? 'bg-[#101827] text-[#D7B76C] border border-[#C5A15D]/40 shadow-xs'
                : 'bg-[#FFFFFF] text-[#687386] border border-[#E8E3DA] hover:border-[#C5A15D]/50 hover:text-[#182235]'
            }`}
          >
            {cat === 'all'
              ? isAr
                ? 'الكل'
                : 'All Photos'
              : cat === 'exterior'
              ? isAr
                ? 'المظهر الخارجي'
                : 'Exterior'
              : cat === 'interior'
              ? isAr
                ? 'المقصورة الملكية'
                : 'Inside VIP'
              : isAr
              ? 'التفاصيل'
              : 'Details'}
          </button>
        ))}
      </div>

      {/* Main Image Display with Touch Swipe Support */}
      <div
        className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#E8E3DA] bg-[#F7F5F0] group shadow-sm select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={activeImage.src}
          alt={activeImage.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 800px"
          className="object-cover transition-all duration-300"
          priority
        />

        {/* Top Floating Badge */}
        {activeImage.label && (
          <div className="absolute top-3.5 start-3.5 px-3 py-1 rounded-full bg-[#101827]/85 backdrop-blur-md text-[#D7B76C] font-sans text-xs font-semibold border border-[#C5A15D]/30 shadow-xs">
            {activeImage.label}
          </div>
        )}

        {/* Lightbox Trigger */}
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="absolute top-3.5 end-3.5 w-10 h-10 rounded-full bg-[#101827]/80 hover:bg-[#101827] text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer border border-white/20"
          aria-label="View Fullscreen"
        >
          <Maximize2 className="w-4 h-4 text-[#C5A15D]" />
        </button>

        {/* Carousel Arrows (min 44px touch targets) */}
        {filteredImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute start-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#FFFFFF]/90 hover:bg-[#FFFFFF] text-[#182235] flex items-center justify-center backdrop-blur-md border border-[#E8E3DA] shadow-md transition-all cursor-pointer hover:scale-105"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute end-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#FFFFFF]/90 hover:bg-[#FFFFFF] text-[#182235] flex items-center justify-center backdrop-blur-md border border-[#E8E3DA] shadow-md transition-all cursor-pointer hover:scale-105"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-5 h-5 rtl:rotate-180" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Strip */}
      {filteredImages.length > 1 && (
        <div className="flex items-center gap-2.5 mt-3 overflow-x-auto pb-2 scrollbar-none">
          {filteredImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                activeIndex === idx
                  ? 'border-[#C5A15D] ring-2 ring-[#C5A15D]/30 scale-105'
                  : 'border-[#E8E3DA] opacity-70 hover:opacity-100 hover:border-[#C5A15D]/60'
              }`}
            >
              <Image src={img.src} alt={img.alt} fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Fullscreen Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#101827]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 end-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20 z-20"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-5xl w-full h-[70vh] sm:h-[80vh] flex items-center justify-center">
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          {filteredImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute start-4 sm:start-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20 z-20"
                aria-label="Previous Photo"
              >
                <ChevronLeft className="w-6 h-6 rtl:rotate-180" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute end-4 sm:end-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20 z-20"
                aria-label="Next Photo"
              >
                <ChevronRight className="w-6 h-6 rtl:rotate-180" />
              </button>
            </>
          )}

          <div className="absolute bottom-6 text-center text-white/90 font-sans text-xs sm:text-sm font-light z-20">
            <span>{activeImage.label || activeImage.alt}</span>
            <span className="ms-3 text-xs text-[#C5A15D]">
              ({activeIndex + 1} / {filteredImages.length})
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
