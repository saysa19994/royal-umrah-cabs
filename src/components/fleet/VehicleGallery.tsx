'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Camera, Expand } from 'lucide-react';

export interface GalleryImage {
  src: string;
  title: string;
  titleAr?: string;
  tag: string;
  tagAr?: string;
}

interface VehicleGalleryProps {
  images: GalleryImage[];
  vehicleName: string;
  locale: string;
}

export function VehicleGallery({ images, vehicleName, locale }: VehicleGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isAr = locale === 'ar';
  const total = images.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const activeImage = images[currentIndex] || images[0];

  return (
    <section className="mt-8 mb-12">
      {/* SECTION HEADER WITH IMAGE COUNTER */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-amber-600" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
            {isAr ? `معرض صور ${vehicleName}` : `${vehicleName} Visual Showcase`}
          </h2>
        </div>

        {/* IMAGE COUNTER (e.g., 1/5) */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/90 text-xs font-black text-slate-800 shadow-2xs">
          <span className="text-amber-600 font-extrabold">{currentIndex + 1}</span>
          <span className="text-slate-400">/</span>
          <span>{total}</span>
        </div>
      </div>

      {/* MAIN FEATURED IMAGE VIEWPORT */}
      <div className="relative rounded-3xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] bg-slate-950 border border-slate-200/90 shadow-md group">
        <Image
          src={activeImage.src}
          alt={`${vehicleName} - ${activeImage.title}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1100px"
          className="object-cover transition-all duration-500"
        />

        {/* SUBTLE OVERLAY GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />

        {/* ACTIVE CAPTION & TAG */}
        <div className="absolute bottom-4 sm:bottom-6 start-4 sm:start-6 end-4 sm:end-6 flex items-end justify-between gap-4 pointer-events-none">
          <div className="text-white">
            <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider bg-amber-500 text-slate-950 mb-1.5 shadow-xs">
              {isAr && activeImage.tagAr ? activeImage.tagAr : activeImage.tag}
            </span>
            <p className="text-sm sm:text-base font-bold text-white drop-shadow-sm">
              {isAr && activeImage.titleAr ? activeImage.titleAr : activeImage.title}
            </p>
          </div>
        </div>

        {/* PREV / NEXT ARROW BUTTONS */}
        <button
          onClick={handlePrev}
          aria-label="Previous Image"
          className="absolute top-1/2 -translate-y-1/2 start-3 sm:start-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all opacity-90 hover:opacity-100 active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 rtl:rotate-180" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next Image"
          className="absolute top-1/2 -translate-y-1/2 end-3 sm:end-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all opacity-90 hover:opacity-100 active:scale-95 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 rtl:rotate-180" />
        </button>
      </div>

      {/* 5-IMAGE THUMBNAIL SELECTOR STRIP */}
      <div className="grid grid-cols-5 gap-2.5 sm:gap-4 mt-3 sm:mt-4">
        {images.map((img, idx) => {
          const isSelected = idx === currentIndex;
          return (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative rounded-xl overflow-hidden aspect-[16/10] bg-slate-100 border-2 transition-all cursor-pointer ${
                isSelected
                  ? 'border-amber-500 ring-2 ring-amber-500/30 scale-[1.02]'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={img.src}
                alt={img.title}
                fill
                sizes="(max-width: 768px) 20vw, 150px"
                className="object-cover"
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}
