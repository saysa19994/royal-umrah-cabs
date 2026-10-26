'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { useCurrency } from '@/context/CurrencyContext';
import { CURRENCIES, CurrencyCode } from '@/i18n/config';
import { CheckCircle2, ArrowRight, MapPin, Sparkles } from 'lucide-react';
import { LOCALIZED_ROUTE_NAMES } from '@/lib/pricing-constants';

interface PricingTableProps {
  locale: Locale;
  dict: Dictionary;
  initialRates?: Record<string, Record<string, number>>;
  taifEnabled?: boolean;
  riyadhEnabled?: boolean;
}

export interface PricingRouteMeta {
  id: string;
  region: 'western' | 'taif' | 'riyadh';
  defCamry: number;
  defStaria: number;
  defYukon: number;
  defHiace: number;
  defCoaster: number;
}

export const ALL_PRICING_ROUTES: PricingRouteMeta[] = [
  // Western Province (Makkah, Madinah, Jeddah)
  { id: 'jeddah-airport-to-makkah', region: 'western', defCamry: 200, defStaria: 260, defYukon: 380, defHiace: 340, defCoaster: 650 },
  { id: 'makkah-to-jeddah-airport', region: 'western', defCamry: 200, defStaria: 260, defYukon: 380, defHiace: 340, defCoaster: 650 },
  { id: 'makkah-to-madinah', region: 'western', defCamry: 450, defStaria: 500, defYukon: 750, defHiace: 650, defCoaster: 1200 },
  { id: 'madinah-to-makkah', region: 'western', defCamry: 450, defStaria: 500, defYukon: 750, defHiace: 650, defCoaster: 1200 },
  { id: 'madinah-airport-to-hotel', region: 'western', defCamry: 150, defStaria: 190, defYukon: 280, defHiace: 250, defCoaster: 550 },
  { id: 'jeddah-to-madinah', region: 'western', defCamry: 680, defStaria: 750, defYukon: 980, defHiace: 850, defCoaster: 1600 },

  // Taif Executive Transfers
  { id: 'makkah-to-taif', region: 'taif', defCamry: 350, defStaria: 450, defYukon: 600, defHiace: 550, defCoaster: 950 },
  { id: 'taif-to-makkah', region: 'taif', defCamry: 350, defStaria: 450, defYukon: 600, defHiace: 550, defCoaster: 950 },
  { id: 'jeddah-to-taif', region: 'taif', defCamry: 550, defStaria: 650, defYukon: 850, defHiace: 800, defCoaster: 1400 },

  // Riyadh VIP Transfers
  { id: 'riyadh-airport-transfer', region: 'riyadh', defCamry: 200, defStaria: 280, defYukon: 450, defHiace: 400, defCoaster: 750 },
  { id: 'riyadh-to-makkah', region: 'riyadh', defCamry: 2200, defStaria: 2600, defYukon: 3500, defHiace: 3200, defCoaster: 5500 },
  { id: 'riyadh-to-madinah', region: 'riyadh', defCamry: 2200, defStaria: 2600, defYukon: 3500, defHiace: 3200, defCoaster: 5500 },
];

const REGION_LABELS: Record<'all' | 'western' | 'taif' | 'riyadh', Record<Locale, string>> = {
  all: {
    en: 'All Routes',
    ar: 'جميع المسارات',
    ms: 'Semua Laluan',
    tr: 'Tüm Güzergahlar',
    id: 'Semua Rute',
    ur: 'تمام راستے',
    fr: 'Tous les itinéraires',
    es: 'Todas las rutas',
    de: 'Alle Routen',
    hi: 'सभी मार्ग',
  },
  western: {
    en: 'Makkah & Madinah',
    ar: 'مكة المكرمة والمدينة',
    ms: 'Makkah & Madinah',
    tr: 'Mekke & Medine',
    id: 'Makkah & Madinah',
    ur: 'مکہ اور مدینہ',
    fr: 'La Mecque & Médine',
    es: 'La Meca y Medina',
    de: 'Mekka & Medina',
    hi: 'मक्का और मदीना',
  },
  taif: {
    en: 'Taif & Miqat',
    ar: 'الطائف والميقات',
    ms: 'Taif & Miqat',
    tr: 'Taif & Mikat',
    id: 'Taif & Miqat',
    ur: 'طائف اور میقات',
    fr: 'Taïf & Miqat',
    es: 'Taif y Miqat',
    de: 'Taif & Miqat',
    hi: 'ताइफ़ और मीक़ात',
  },
  riyadh: {
    en: 'Riyadh VIP',
    ar: 'الرياض (VIP)',
    ms: 'Riyadh Eksekutif',
    tr: 'Riyad VIP',
    id: 'Riyadh Eksekutif',
    ur: 'ریاض ایگزیکٹو',
    fr: 'Riyad VIP',
    es: 'Riad VIP',
    de: 'Riad VIP',
    hi: 'रियाद वीआईपी',
  },
};

const REGION_BADGES: Record<'western' | 'taif' | 'riyadh', Record<Locale, string>> = {
  western: {
    en: 'Western Province',
    ar: 'الغربية',
    ms: 'Wilayah Barat',
    tr: 'Batı Bölgesi',
    id: 'Wilayah Barat',
    ur: 'مغربی خطہ',
    fr: 'Région Ouest',
    es: 'Región Occidental',
    de: 'Westliche Region',
    hi: 'पश्चिमी क्षेत्र',
  },
  taif: {
    en: 'Taif',
    ar: 'الطائف',
    ms: 'Taif',
    tr: 'Taif',
    id: 'Taif',
    ur: 'طائف',
    fr: 'Taïf',
    es: 'Taif',
    de: 'Taif',
    hi: 'ताइफ़',
  },
  riyadh: {
    en: 'Riyadh',
    ar: 'الرياض',
    ms: 'Riyadh',
    tr: 'Riyad',
    id: 'Riyadh',
    ur: 'ریاض',
    fr: 'Riyad',
    es: 'Riad',
    de: 'Riad',
    hi: 'रियाद',
  },
};

export function PricingTable({
  locale,
  dict,
  initialRates,
  taifEnabled = true,
  riyadhEnabled = true,
}: PricingTableProps) {
  const { currency, setCurrency, formatPrice } = useCurrency();
  const [selectedRegion, setSelectedRegion] = useState<'all' | 'western' | 'taif' | 'riyadh'>('all');
  const [selectedRoute, setSelectedRoute] = useState<string>('all');

  // Filter routes by site-settings availability
  const availableRoutes = ALL_PRICING_ROUTES.filter((r) => {
    if (r.region === 'taif' && !taifEnabled) return false;
    if (r.region === 'riyadh' && !riyadhEnabled) return false;
    return true;
  });

  const routePrices = availableRoutes.map((meta) => {
    const rates = initialRates?.[meta.id];
    const localizedTitle =
      LOCALIZED_ROUTE_NAMES[meta.id]?.[locale] ||
      LOCALIZED_ROUTE_NAMES[meta.id]?.en ||
      meta.id;

    return {
      id: meta.id,
      region: meta.region,
      title: localizedTitle,
      camry: rates?.camry ?? meta.defCamry,
      staria: rates?.staria ?? meta.defStaria,
      yukon: rates?.yukon ?? meta.defYukon,
      hiace: rates?.hiace ?? meta.defHiace,
      coaster: rates?.coaster ?? meta.defCoaster,
    };
  });

  const filteredRoutes = routePrices.filter((r) => {
    if (selectedRegion !== 'all' && r.region !== selectedRegion) return false;
    if (selectedRoute !== 'all' && r.id !== selectedRoute) return false;
    return true;
  });

  const availableRegions: ('all' | 'western' | 'taif' | 'riyadh')[] = ['all', 'western'];
  if (taifEnabled) availableRegions.push('taif');
  if (riyadhEnabled) availableRegions.push('riyadh');

  return (
    <div className="space-y-8">
      {/* Region Tabs & Controls Bar */}
      <div className="bg-surface rounded-2xl p-4 md:p-6 border border-border shadow-xs space-y-4">
        {/* Region Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {availableRegions.map((reg) => (
            <button
              key={reg}
              type="button"
              onClick={() => {
                setSelectedRegion(reg);
                setSelectedRoute('all');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                selectedRegion === reg
                  ? 'bg-gold-dark text-white shadow-xs'
                  : 'bg-surface-muted text-ink-muted hover:text-ink hover:bg-gold-soft/30'
              }`}
            >
              {REGION_LABELS[reg][locale]}
            </button>
          ))}
        </div>

        {/* Route Filter Dropdown & Currency Switcher */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2 border-t border-border/60">
          {/* Specific Route Filter */}
          <div className="w-full md:w-auto flex items-center gap-2">
            <label className="text-xs font-bold text-ink shrink-0">
              {dict.page_pricing.colRoute}:
            </label>
            <select
              value={selectedRoute}
              onChange={(e) => setSelectedRoute(e.target.value)}
              className="w-full md:w-80 h-10 px-3 text-xs font-semibold rounded-lg border border-border bg-surface text-ink focus:ring-1 focus:ring-gold-dark cursor-pointer"
            >
              <option value="all">
                {selectedRegion === 'all'
                  ? REGION_LABELS.all[locale]
                  : `${REGION_LABELS[selectedRegion][locale]} (${REGION_LABELS.all[locale]})`}
              </option>
              {routePrices
                .filter((r) => selectedRegion === 'all' || r.region === selectedRegion)
                .map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.title}
                  </option>
                ))}
            </select>
          </div>

          {/* Currency Switcher */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-xs text-ink-muted">
              {locale === 'ar' ? 'عرض الأسعار بـ:' : locale === 'ms' ? 'Mata Wang:' : 'Display Currency:'}
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full flex-nowrap sm:flex-wrap scrollbar-none">
              {(Object.keys(CURRENCIES) as CurrencyCode[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCurrency(c)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-md border transition-all ${
                    currency === c
                      ? 'bg-gold-dark text-white border-gold-dark shadow-xs'
                      : 'bg-surface text-ink-muted border-border hover:border-gold-dark/50'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-surface rounded-2xl border border-border shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs border-collapse">
            <thead>
              <tr className="bg-surface-muted border-b border-border text-ink font-bold">
                <th className="py-4 px-5 text-start">{dict.page_pricing.colRoute}</th>
                <th className="py-4 px-4 text-center">
                  <span className="block">{dict.page_pricing.colCamry}</span>
                  <span className="text-[10px] text-ink-muted font-normal">Sedan 4 Pax</span>
                </th>
                <th className="py-4 px-4 text-center">
                  <span className="block text-gold-dark">{dict.page_pricing.colStaria}</span>
                  <span className="text-[10px] text-gold-dark/80 font-normal">Van 7 Pax</span>
                </th>
                <th className="py-4 px-4 text-center">
                  <span className="block">{dict.page_pricing.colYukon}</span>
                  <span className="text-[10px] text-ink-muted font-normal">VIP SUV 7 Pax</span>
                </th>
                <th className="py-4 px-4 text-center">
                  <span className="block">{dict.page_pricing.colHiace}</span>
                  <span className="text-[10px] text-ink-muted font-normal">Bus 10 Pax</span>
                </th>
                <th className="py-4 px-4 text-center">
                  <span className="block">{dict.page_pricing.colCoaster}</span>
                  <span className="text-[10px] text-ink-muted font-normal">Coach 21 Pax</span>
                </th>
                <th className="py-4 px-4 text-center">{dict.page_pricing.actionBook}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredRoutes.map((row) => (
                <tr key={row.id} className="hover:bg-gold-soft/20 transition-colors">
                  <td className="py-4 px-5 font-semibold text-ink">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-gold-soft/60 text-gold-dark border border-gold-line/50 shrink-0">
                        {REGION_BADGES[row.region][locale]}
                      </span>
                      <span className="text-sm font-semibold text-ink">{row.title}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center font-bold text-ink">
                    {formatPrice(row.camry)}
                  </td>
                  <td className="py-4 px-4 text-center font-bold text-gold-dark bg-gold-soft/10">
                    {formatPrice(row.staria)}
                  </td>
                  <td className="py-4 px-4 text-center font-bold text-ink">
                    {formatPrice(row.yukon)}
                  </td>
                  <td className="py-4 px-4 text-center font-bold text-ink">
                    {formatPrice(row.hiace)}
                  </td>
                  <td className="py-4 px-4 text-center font-bold text-ink">
                    {formatPrice(row.coaster)}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Link
                      href={`/${locale}/booking?route=${row.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold-dark hover:bg-gold-hover text-surface font-bold text-xs transition-colors shadow-xs"
                    >
                      <span>{dict.page_pricing.actionBook}</span>
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transparent Service Policies & Notes */}
      <div className="bg-surface rounded-2xl p-6 md:p-8 border border-gold-line/60">
        <h3 className="font-display text-xl font-bold text-ink mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-gold-dark" />
          <span>{dict.page_pricing.noteTitle}</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span className="text-xs text-ink-light leading-relaxed">
              {dict.page_pricing.note1}
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span className="text-xs text-ink-light leading-relaxed">
              {dict.page_pricing.note2}
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span className="text-xs text-ink-light leading-relaxed">
              {dict.page_pricing.note3}
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span className="text-xs text-ink-light leading-relaxed">
              {dict.page_pricing.note4}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
