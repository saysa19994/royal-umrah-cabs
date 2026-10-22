import React from 'react';
import type { Metadata } from 'next';
import { Locale, getLocalizedAlternates } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { Compass, ShieldCheck } from 'lucide-react';
import { ExecutiveRouteCard } from '@/components/routes/ExecutiveRouteCard';
import { EXECUTIVE_ROUTES_DATA } from '@/data/executive-routes-data';

interface RoutesPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata(props: RoutesPageProps): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params;
  const dict = getDictionary(locale);

  return {
    title: dict.nav.routes,
    description:
      'Explore all private Umrah and intercity transfer routes between Jeddah, Makkah, Madinah, and Taif with guaranteed fixed pricing in SAR.',
    alternates: getLocalizedAlternates(locale, '/routes'),
  };
}

export default async function RoutesPage(props: RoutesPageProps) {
  const params = await props.params;
  const { locale } = params;
  const dict = getDictionary(locale);
  const isAr = locale === 'ar';

  return (
    <div className="py-12 sm:py-16 md:py-20 bg-slate-50/70 min-h-screen text-start">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* HEADER SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-extrabold text-amber-700 uppercase tracking-widest mb-3">
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            <span>{dict.nav.routes}</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight leading-tight">
            {isAr
              ? 'مسارات الحرمين الشريفين والنقل بين المدن'
              : 'Popular Umrah & Intercity VIP Routes'}
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            {isAr
              ? 'أسعار ثابتة ومعتمدة للمركبة بالكامل • رسوم الطرق السريعة مشمولة • لا توجد زيادات أو رسوم خفية'
              : 'Guaranteed fixed rates per vehicle. Highway tolls and flight tracking included with no prepayment required.'}
          </p>
        </div>

        {/* RESPONSIVE ROUTE CARDS LIST (Horizontal on Desktop, Vertical on Mobile) */}
        <div className="flex flex-col gap-6 sm:gap-8">
          {EXECUTIVE_ROUTES_DATA.map((route) => (
            <ExecutiveRouteCard key={route.slug} route={route} locale={locale} />
          ))}
        </div>
      </div>
    </div>
  );
}
