'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Camera, Maximize2, X, Eye } from 'lucide-react';
import { Locale } from '@/i18n/config';

export interface GalleryPhoto {
  src: string;
  title: string;
  titleAr?: string;
  tag: string;
  tagAr?: string;
  type?: 'exterior' | 'interior' | 'detail';
}

// Backwards compatibility alias
export type GalleryImage = GalleryPhoto;

interface VehicleGalleryProps {
  images: GalleryPhoto[];
  vehicleName: string;
  locale: Locale;
}

const GALLERY_I18N: Record<string, Record<Locale, string>> = {
  all: {
    en: 'All Photos',
    ar: 'جميع الصور',
    ms: 'Semua Gambar',
    id: 'Semua Foto',
    ur: 'تمام تصاویر',
    fr: 'Toutes les photos',
    es: 'Todas las fotos',
    de: 'Alle Fotos',
    hi: 'सभी तस्वीरें',
    tr: 'Tüm Fotoğraflar',
  },
  exterior: {
    en: 'Exterior Views',
    ar: 'المظهر الخارجي',
    ms: 'Pandangan Luaran',
    id: 'Tampilan Luar',
    ur: 'بیرونی مناظر',
    fr: 'Vues extérieures',
    es: 'Vistas exteriores',
    de: 'Außenansichten',
    hi: 'बाहरी दृश्य',
    tr: 'Dış Görünümler',
  },
  interior: {
    en: 'VIP Cabin & Comfort',
    ar: 'المقصورة والراحة VIP',
    ms: 'Kabin VIP & Keselesaan',
    id: 'Kabin VIP & Kenyamanan',
    ur: 'وی آئی پی کیبن اور آرام',
    fr: 'Cabine VIP & Confort',
    es: 'Cabina VIP y Confort',
    de: 'VIP-Kabine & Komfort',
    hi: 'वीआईपी केबिन और आराम',
    tr: 'VIP Kabin ve Konfor',
  },
  expand: {
    en: 'View Fullscreen',
    ar: 'عرض بملء الشاشة',
    ms: 'Paparan Skrin Penuh',
    id: 'Lihat Layar Penuh',
    ur: 'فل اسکرین میں دیکھیں',
    fr: 'Plein écran',
    es: 'Ver en pantalla completa',
    de: 'Vollbild anzeigen',
    hi: 'फुलस्क्रीन में देखें',
    tr: 'Tam Ekran Görünüm',
  },
  close: {
    en: 'Close (Esc)',
    ar: 'إغلاق (Esc)',
    ms: 'Tutup (Esc)',
    id: 'Tutup (Esc)',
    ur: 'بند کریں (Esc)',
    fr: 'Fermer (Esc)',
    es: 'Cerrar (Esc)',
    de: 'Schließen (Esc)',
    hi: 'बंद करें (Esc)',
    tr: 'Kapat (Esc)',
  },
  prev: {
    en: 'Previous',
    ar: 'السابق',
    ms: 'Sebelumnya',
    id: 'Sebelumnya',
    ur: 'پچھلا',
    fr: 'Précédent',
    es: 'Anterior',
    de: 'Zurück',
    hi: 'पिछला',
    tr: 'Önceki',
  },
  next: {
    en: 'Next',
    ar: 'التالي',
    ms: 'Seterusnya',
    id: 'Berikutnya',
    ur: 'اگلا',
    fr: 'Suivant',
    es: 'Siguiente',
    de: 'Weiter',
    hi: 'अगला',
    tr: 'Sonraki',
  },
  showcase: {
    en: 'Visual Showcase',
    ar: 'معرض الصور الحصري',
    ms: 'Galeri Visual',
    id: 'Galeri Visual',
    ur: 'تصویری گیلری',
    fr: 'Galerie Visuelle',
    es: 'Galería Visual',
    de: 'Bildergalerie',
    hi: 'विजुअल गैलरी',
    tr: 'Görsel Galeri',
  },
};

export function VehicleGallery({ images, vehicleName, locale }: VehicleGalleryProps) {
  const isAr = locale === 'ar';
  const isRtl = isAr || locale === 'ur';

  const [activeFilter, setActiveFilter] = useState<'all' | 'exterior' | 'interior'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Touch swipe tracking
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Categorize images if type property is set; otherwise infer from tag/src
  const inferType = (img: GalleryPhoto): 'exterior' | 'interior' => {
    if (img.type === 'interior') return 'interior';
    if (img.type === 'exterior') return 'exterior';
    const s = (img.src + ' ' + img.tag).toLowerCase();
    if (s.includes('interior') || s.includes('seat') || s.includes('cabin') || s.includes('dashboard')) {
      return 'interior';
    }
    return 'exterior';
  };

  const filteredImages = images.filter((img) => {
    if (activeFilter === 'all') return true;
    return inferType(img) === activeFilter;
  });

  const total = filteredImages.length;
  const safeIndex = total > 0 ? Math.min(currentIndex, total - 1) : 0;
  const activeImage = filteredImages[safeIndex] || images[0];

  const handlePrev = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  }, [total]);

  const handleNext = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  }, [total]);

  // Keyboard navigation & body lock for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowLeft') {
        if (isRtl) handleNext();
        else handlePrev();
      } else if (e.key === 'ArrowRight') {
        if (isRtl) handlePrev();
        else handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLightboxOpen, handleNext, handlePrev, isRtl]);

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        // Swiped left
        if (isRtl) handlePrev();
        else handleNext();
      } else {
        // Swiped right
        if (isRtl) handleNext();
        else handlePrev();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const t = (key: string): string => {
    return GALLERY_I18N[key]?.[locale] || GALLERY_I18N[key]?.en || key;
  };

  const getTitle = (img: GalleryPhoto) => (isAr && img.titleAr ? img.titleAr : img.title);
  const getTag = (img: GalleryPhoto) => (isAr && img.tagAr ? img.tagAr : img.tag);

  return (
    <section className="mt-8 mb-12" aria-label={t('showcase')}>
      {/* SECTION HEADER: FILTER TABS + IMAGE COUNTER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        {/* TABS */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200/80 w-fit">
          <button
            type="button"
            onClick={() => {
              setActiveFilter('all');
              setCurrentIndex(0);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#101827] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('all')}
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveFilter('exterior');
              setCurrentIndex(0);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeFilter === 'exterior'
                ? 'bg-[#101827] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('exterior')}
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveFilter('interior');
              setCurrentIndex(0);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeFilter === 'interior'
                ? 'bg-[#101827] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('interior')}
          </button>
        </div>

        {/* IMAGE COUNTER & FULLSCREEN BUTTON */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200/90 hover:border-[#C5A15D] text-xs font-bold text-slate-700 hover:text-[#C5A15D] transition-colors shadow-2xs cursor-pointer"
            aria-label={t('expand')}
          >
            <Maximize2 className="w-3.5 h-3.5 text-[#C5A15D]" />
            <span>{t('expand')}</span>
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200/90 text-xs font-black text-slate-800 shadow-2xs">
            <Camera className="w-3.5 h-3.5 text-[#C5A15D]" />
            <span className="text-[#C5A15D] font-extrabold">{safeIndex + 1}</span>
            <span className="text-slate-400">/</span>
            <span>{total}</span>
          </div>
        </div>
      </div>

      {/* MAIN FEATURED IMAGE VIEWPORT */}
      <div
        className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] bg-[#101827] border border-slate-200/90 shadow-md group cursor-pointer select-none"
        onClick={() => setIsLightboxOpen(true)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {activeImage ? (
          <Image
            src={activeImage.src}
            alt={`${vehicleName} - ${getTitle(activeImage)}`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1100px"
            className="object-cover transition-all duration-500 group-hover:scale-[1.01]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
            No image available
          </div>
        )}

        {/* SUBTLE OVERLAY GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/25 pointer-events-none" />

        {/* ACTIVE CAPTION & TAG */}
        {activeImage && (
          <div className="absolute bottom-4 sm:bottom-6 start-4 sm:start-6 end-4 sm:end-6 flex items-end justify-between gap-4 pointer-events-none">
            <div className="text-white max-w-xl">
              <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider bg-[#C5A15D] text-slate-950 mb-1.5 shadow-xs">
                {getTag(activeImage)}
              </span>
              <p className="text-sm sm:text-base font-bold text-white drop-shadow-sm">
                {getTitle(activeImage)}
              </p>
            </div>
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white/90 text-xs font-semibold border border-white/20">
              <Eye className="w-3.5 h-3.5 text-[#C5A15D]" />
              <span>{t('expand')}</span>
            </div>
          </div>
        )}

        {/* PREV / NEXT ARROW BUTTONS */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label={t('prev')}
              className="absolute top-1/2 -translate-y-1/2 start-3 sm:start-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#101827]/75 hover:bg-[#101827] text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all opacity-85 hover:opacity-100 active:scale-95 cursor-pointer shadow-lg z-10"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 rtl:rotate-180" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label={t('next')}
              className="absolute top-1/2 -translate-y-1/2 end-3 sm:end-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#101827]/75 hover:bg-[#101827] text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all opacity-85 hover:opacity-100 active:scale-95 cursor-pointer shadow-lg z-10"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 rtl:rotate-180" />
            </button>
          </>
        )}
      </div>

      {/* THUMBNAIL SELECTOR STRIP */}
      {total > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 sm:gap-3 mt-3 sm:mt-4">
          {filteredImages.map((img, idx) => {
            const isSelected = idx === safeIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`relative rounded-xl overflow-hidden aspect-[16/10] bg-[#101827] border-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#C5A15D] ring-2 ring-[#C5A15D]/40 scale-[1.02] shadow-sm'
                    : 'border-transparent opacity-65 hover:opacity-100'
                }`}
                aria-label={`${getTitle(img)} (${idx + 1}/${total})`}
              >
                <Image
                  src={img.src}
                  alt={getTitle(img)}
                  fill
                  sizes="(max-width: 768px) 25vw, 160px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${vehicleName} Fullscreen Gallery`}
          className="fixed inset-0 z-[100] bg-[#101827]/96 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6 select-none animate-in fade-in duration-200"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* LIGHTBOX TOP BAR */}
          <div className="flex items-center justify-between gap-4 w-full max-w-7xl mx-auto pb-3 border-b border-white/10 text-white">
            <div className="flex items-center gap-3 truncate">
              <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider bg-[#C5A15D] text-slate-950 shrink-0">
                {getTag(activeImage)}
              </span>
              <h3 className="font-display font-bold text-sm sm:text-base text-white truncate">
                {vehicleName} — {getTitle(activeImage)}
              </h3>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-semibold text-slate-300">
                {safeIndex + 1} / {total}
              </span>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label={t('close')}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* LIGHTBOX MAIN VIEWPORT */}
          <div className="relative flex-1 w-full max-w-6xl mx-auto my-3 sm:my-4 flex items-center justify-center">
            {activeImage && (
              <div className="relative w-full h-full max-h-[75vh] flex items-center justify-center">
                <Image
                  src={activeImage.src}
                  alt={`${vehicleName} - ${getTitle(activeImage)}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
            )}

            {/* LIGHTBOX PREV / NEXT ARROWS */}
            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label={t('prev')}
                  className="absolute start-2 sm:start-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all active:scale-95 cursor-pointer shadow-xl"
                >
                  <ChevronLeft className="w-6 h-6 rtl:rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label={t('next')}
                  className="absolute end-2 sm:end-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all active:scale-95 cursor-pointer shadow-xl"
                >
                  <ChevronRight className="w-6 h-6 rtl:rotate-180" />
                </button>
              </>
            )}
          </div>

          {/* LIGHTBOX BOTTOM THUMBNAILS */}
          {total > 1 && (
            <div className="w-full max-w-3xl mx-auto overflow-x-auto pb-2 flex items-center justify-center gap-2">
              {filteredImages.map((img, idx) => {
                const isSelected = idx === safeIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative w-16 sm:w-20 aspect-[16/10] rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      isSelected
                        ? 'border-[#C5A15D] ring-2 ring-[#C5A15D]/40 scale-105'
                        : 'border-white/20 opacity-50 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={getTitle(img)}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
