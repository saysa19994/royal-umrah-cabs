import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Users, Luggage, ShieldCheck, ArrowRight, Camera, Sparkles } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';
import { Button } from '@/components/ui/Button';

export interface RoyalVehicleCardProps {
  id: string;
  slug: string;
  name: string;
  category: string;
  passengers: number;
  luggage: number;
  startingPriceSAR: number;
  imageSrc: string;
  imageAlt?: string;
  description: string;
  features?: string[];
  locale?: string;
  onOpenGallery?: () => void;
  sampleTag?: string;
  className?: string;
}

export const RoyalVehicleCard: React.FC<RoyalVehicleCardProps> = ({
  id,
  slug,
  name,
  category,
  passengers,
  luggage,
  startingPriceSAR,
  imageSrc,
  imageAlt,
  description,
  features = [],
  locale = 'en',
  onOpenGallery,
  sampleTag,
  className = '',
}) => {
  const { formatPrice } = useCurrency();
  const isAr = locale === 'ar';

  return (
    <div
      className={`group bg-[#FFFFFF] rounded-2xl sm:rounded-3xl border border-[#E8E3DA] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-start ${className}`}
    >
      <div>
        {/* Vehicle Image Container */}
        <div className="relative aspect-[16/10] w-full bg-gradient-to-b from-[#F7F5F0] to-[#FFFFFF] overflow-hidden border-b border-[#E8E3DA]">
          <Image
            src={imageSrc}
            alt={imageAlt || `${name} - Duyuf Alrahman VIP Chauffeur`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          />

          {/* Top Category Badge */}
          <div className="absolute top-3.5 start-3.5 flex flex-wrap gap-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#101827]/90 backdrop-blur-md text-[#D7B76C] text-[10px] font-sans font-bold uppercase tracking-wider border border-[#C5A15D]/30 shadow-xs">
              <Sparkles className="w-3 h-3 text-[#C5A15D]" />
              <span>{category}</span>
            </span>
            {sampleTag && (
              <span className="px-2 py-0.5 rounded-full bg-[#B7791F]/90 text-white text-[9px] font-sans font-bold uppercase tracking-wider">
                {sampleTag}
              </span>
            )}
          </div>

          {/* Gallery Button Pill */}
          {onOpenGallery && (
            <button
              type="button"
              onClick={onOpenGallery}
              className="absolute bottom-3 end-3 px-3 py-1.5 rounded-full bg-[#FFFFFF]/90 hover:bg-[#FFFFFF] text-[#182235] text-xs font-sans font-semibold backdrop-blur-md border border-[#E8E3DA] shadow-xs flex items-center gap-1.5 transition-all cursor-pointer hover:border-[#C5A15D]"
              aria-label="Open Vehicle Gallery"
            >
              <Camera className="w-3.5 h-3.5 text-[#C5A15D]" />
              <span>{isAr ? 'معرض الصور' : 'Gallery'}</span>
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-7">
          <h3 className="font-sans font-bold text-xl sm:text-2xl text-[#182235] mb-2 leading-tight">
            {name}
          </h3>

          {/* Capacity Badges */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 font-sans text-xs text-[#182235] font-semibold bg-[#F7F5F0] px-3 py-1.5 rounded-lg border border-[#E8E3DA]">
              <Users className="w-3.5 h-3.5 text-[#C5A15D]" />
              <span>{passengers} {isAr ? 'ركاب' : 'Seats'}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 font-sans text-xs text-[#182235] font-semibold bg-[#F7F5F0] px-3 py-1.5 rounded-lg border border-[#E8E3DA]">
              <Luggage className="w-3.5 h-3.5 text-[#C5A15D]" />
              <span>{luggage} {isAr ? 'حقائب' : 'Bags'}</span>
            </span>
          </div>

          <p className="font-sans text-xs sm:text-sm text-[#687386] font-light leading-relaxed mb-5 line-clamp-2">
            {description}
          </p>

          {/* Features Checklist */}
          {features.length > 0 && (
            <div className="space-y-2 mb-6">
              {features.slice(0, 3).map((feat, i) => (
                <div key={i} className="flex items-center gap-2 font-sans text-xs text-[#182235]">
                  <ShieldCheck className="w-4 h-4 text-[#C5A15D] shrink-0" />
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer Bar */}
      <div className="p-5 sm:p-7 pt-4 border-t border-[#E8E3DA] bg-[#FAF8F5] flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="font-sans text-[10px] uppercase font-bold text-[#687386] block">
            {isAr ? 'يبدأ من' : 'Starting From'}
          </span>
          <span className="font-serif font-bold text-2xl text-[#182235]">
            {formatPrice(startingPriceSAR)}
          </span>
        </div>

        <Link href={`/${locale}/booking?vehicle=${id}`}>
          <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
            {isAr ? 'احجز السيارة' : 'Reserve'}
          </Button>
        </Link>
      </div>
    </div>
  );
};
