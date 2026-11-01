import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';
import { Button } from '@/components/ui/Button';

export interface PricingTier {
  vehicleName: string;
  category: string;
  capacityPax: number;
  capacityBags: number;
  priceSAR: number;
  bookingUrl: string;
  isPopular?: boolean;
}

export interface RoyalPricingCardProps {
  title: string;
  subtitle?: string;
  startingPriceSAR: number;
  badge?: string;
  tiers: PricingTier[];
  inclusions: string[];
  locale?: string;
  className?: string;
}

export const RoyalPricingCard: React.FC<RoyalPricingCardProps> = ({
  title,
  subtitle,
  startingPriceSAR,
  badge = 'GUARANTEED FIXED RATE',
  tiers,
  inclusions,
  locale = 'en',
  className = '',
}) => {
  const { formatPrice } = useCurrency();
  const isAr = locale === 'ar';

  return (
    <div
      className={`bg-[#FFFFFF] rounded-2xl sm:rounded-3xl border border-[#E8E3DA] p-5 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 text-start flex flex-col justify-between ${className}`}
    >
      <div>
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#101827] text-[#D7B76C] text-[11px] font-sans font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-[#C5A15D]" />
            <span>{badge}</span>
          </span>
          <span className="font-sans text-xs font-bold text-[#687386]">
            {isAr ? 'بدون دفعة مقدمة' : 'Zero Advance Deposit'}
          </span>
        </div>

        <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#182235] mb-2 leading-tight">
          {title}
        </h3>
        {subtitle && (
          <p className="font-sans text-xs sm:text-sm text-[#687386] font-light leading-relaxed mb-6">
            {subtitle}
          </p>
        )}

        {/* Pricing Tiers Table */}
        <div className="space-y-3 mb-6">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`p-3.5 sm:p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 transition-all ${
                tier.isPopular
                  ? 'bg-[#F7F5F0] border-[#C5A15D]/60 shadow-xs ring-1 ring-[#C5A15D]/20'
                  : 'bg-[#FFFFFF] border-[#E8E3DA] hover:border-[#C5A15D]/40'
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-sans font-bold text-sm sm:text-base text-[#182235]">
                    {tier.vehicleName}
                  </span>
                  {tier.isPopular && (
                    <span className="px-2 py-0.5 rounded-full bg-[#C5A15D] text-[#101827] font-sans text-[9px] font-extrabold uppercase">
                      {isAr ? 'الأكثر طلباً' : 'POPULAR'}
                    </span>
                  )}
                </div>
                <span className="font-sans text-xs text-[#687386] block mt-0.5">
                  {tier.capacityPax} {isAr ? 'ركاب' : 'Seats'} • {tier.capacityBags}{' '}
                  {isAr ? 'حقائب' : 'Bags'}
                </span>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E8E3DA]">
                <span className="font-serif font-bold text-lg sm:text-xl text-[#182235]">
                  {formatPrice(tier.priceSAR)}
                </span>
                <Link
                  href={tier.bookingUrl}
                  className="font-sans text-xs font-bold text-[#C5A15D] hover:text-[#B5904C] flex items-center gap-1 shrink-0"
                >
                  <span>{isAr ? 'احجز' : 'Book'}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Key Guarantees */}
        <div className="space-y-2 mb-6 pt-4 border-t border-[#E8E3DA]">
          {inclusions.map((inc, i) => (
            <div key={i} className="flex items-center gap-2 font-sans text-xs text-[#182235]">
              <CheckCircle2 className="w-4 h-4 text-[#C5A15D] shrink-0" />
              <span>{inc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Fare Bar */}
      <div className="pt-4 border-t border-[#E8E3DA] flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="font-sans text-[10px] uppercase font-bold text-[#687386] block">
            {isAr ? 'الأسعار تبدأ من' : 'Starting From'}
          </span>
          <span className="font-serif font-bold text-2xl text-[#182235]">
            {formatPrice(startingPriceSAR)}
          </span>
        </div>

        <Link href={`/${locale}/booking`}>
          <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
            {isAr ? 'احجز الآن' : 'Book Now'}
          </Button>
        </Link>
      </div>
    </div>
  );
};
