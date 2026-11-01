import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Compass, CheckCircle2, ArrowRight } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';
import { Button } from '@/components/ui/Button';

export interface RoyalRouteCardProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  distance: string;
  startingFareSAR: number;
  imageSrc?: string;
  inclusions?: string[];
  locale?: string;
  className?: string;
}

export const RoyalRouteCard: React.FC<RoyalRouteCardProps> = ({
  id,
  title,
  description,
  duration,
  distance,
  startingFareSAR,
  imageSrc,
  inclusions,
  locale = 'en',
  className = '',
}) => {
  const { formatPrice } = useCurrency();
  const isAr = locale === 'ar';

  return (
    <div
      className={`group bg-[#FFFFFF] rounded-2xl sm:rounded-3xl border border-[#E8E3DA] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-start ${className}`}
    >
      <div>
        {imageSrc && (
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#F7F5F0]">
            <Image
              src={imageSrc}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101827]/75 via-transparent to-transparent" />
            <div className="absolute bottom-3 start-3.5 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#101827]/90 text-white text-[11px] font-sans font-semibold backdrop-blur-md">
                <Clock className="w-3 h-3 text-[#C5A15D]" />
                <span>{duration}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#101827]/90 text-white text-[11px] font-sans font-semibold backdrop-blur-md">
                <Compass className="w-3 h-3 text-[#C5A15D]" />
                <span>{distance}</span>
              </span>
            </div>
          </div>
        )}

        <div className="p-5 sm:p-7">
          {!imageSrc && (
            <div className="flex items-center gap-3 mb-3 text-xs font-sans text-[#687386]">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#C5A15D]" />
                <span>{duration}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-[#C5A15D]" />
                <span>{distance}</span>
              </span>
            </div>
          )}

          <h3 className="font-sans font-bold text-xl sm:text-2xl text-[#182235] mb-2 group-hover:text-[#C5A15D] transition-colors leading-tight">
            {title}
          </h3>

          <p className="font-sans text-xs sm:text-sm text-[#687386] font-light leading-relaxed mb-5">
            {description}
          </p>

          {inclusions && inclusions.length > 0 && (
            <div className="space-y-2 mb-6">
              {inclusions.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 font-sans text-xs text-[#182235]">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A15D] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="p-5 sm:p-7 pt-4 border-t border-[#E8E3DA] bg-[#FAF8F5] flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="font-sans text-[10px] uppercase font-bold text-[#687386] block">
            {isAr ? 'السعر يبدأ من' : 'Starting From'}
          </span>
          <span className="font-serif font-bold text-2xl text-[#182235]">
            {formatPrice(startingFareSAR)}
          </span>
        </div>

        <Link href={`/${locale}/booking?route=${id}`}>
          <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
            {isAr ? 'احجز المسار' : 'Book Route'}
          </Button>
        </Link>
      </div>
    </div>
  );
};
