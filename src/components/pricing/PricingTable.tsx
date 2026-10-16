'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { useCurrency } from '@/context/CurrencyContext';
import { CURRENCIES, CurrencyCode } from '@/i18n/config';
import { CheckCircle2, ArrowRight, ShieldCheck, DollarSign } from 'lucide-react';

interface PricingTableProps {
  locale: Locale;
  dict: Dictionary;
}

interface RoutePriceItem {
  id: string;
  title: string;
  camry: number;
  staria: number;
  yukon: number;
  hiace: number;
  coaster: number;
}

const ROUTE_PRICES: RoutePriceItem[] = [
  {
    id: 'jeddah-airport-to-makkah',
    title: 'Jeddah Airport (KAIA) → Makkah Hotel',
    camry: 200,
    staria: 260,
    yukon: 380,
    hiace: 340,
    coaster: 650,
  },
  {
    id: 'makkah-to-jeddah-airport',
    title: 'Makkah Hotel → Jeddah Airport (KAIA)',
    camry: 200,
    staria: 260,
    yukon: 380,
    hiace: 340,
    coaster: 650,
  },
  {
    id: 'makkah-to-madinah',
    title: 'Makkah → Madinah Al-Munawwarah',
    camry: 450,
    staria: 500,
    yukon: 750,
    hiace: 650,
    coaster: 1200,
  },
  {
    id: 'madinah-to-makkah',
    title: 'Madinah → Makkah (With Miqat Bir Ali Stop)',
    camry: 450,
    staria: 500,
    yukon: 750,
    hiace: 650,
    coaster: 1200,
  },
  {
    id: 'madinah-airport-to-hotel',
    title: 'Madinah Airport (MED) → Central Hotel',
    camry: 150,
    staria: 200,
    yukon: 300,
    hiace: 270,
    coaster: 550,
  },
  {
    id: 'jeddah-to-madinah',
    title: 'Jeddah City / Airport → Madinah Hotel',
    camry: 680,
    staria: 750,
    yukon: 1050,
    hiace: 900,
    coaster: 1600,
  },
];

export function PricingTable({ locale, dict }: PricingTableProps) {
  const { currency, setCurrency, formatPrice } = useCurrency();
  const [selectedRoute, setSelectedRoute] = useState<string>('all');

  const filteredRoutes = selectedRoute === 'all'
    ? ROUTE_PRICES
    : ROUTE_PRICES.filter((r) => r.id === selectedRoute);

  return (
    <div className="space-y-8">
      {/* Currency & Route Filters */}
      <div className="bg-surface rounded-2xl p-6 border border-border flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Route Filter */}
        <div className="w-full md:w-auto flex items-center gap-2">
          <label className="text-xs font-bold text-ink shrink-0">
            {dict.page_pricing.colRoute}:
          </label>
          <select
            value={selectedRoute}
            onChange={(e) => setSelectedRoute(e.target.value)}
            className="w-full md:w-72 h-10 px-3 text-xs font-semibold rounded-lg border border-border bg-surface text-ink focus:ring-1 focus:ring-gold-dark cursor-pointer"
          >
            <option value="all">
              {locale === 'ar' ? 'جميع المسارات المتاحة' : locale === 'ms' ? 'Semua Laluan' : 'All Available Routes'}
            </option>
            {ROUTE_PRICES.map((r) => (
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
          <div className="flex flex-wrap items-center gap-1.5">
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

      {/* Main Table */}
      <div className="bg-surface rounded-2xl border border-border shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs border-collapse">
            <thead>
              <tr className="bg-surface-muted border-b border-border text-ink font-bold">
                <th className="py-4 px-5 text-start">{dict.page_pricing.colRoute}</th>
                <th className="py-4 px-4 text-center">{dict.page_pricing.colCamry}</th>
                <th className="py-4 px-4 text-center">{dict.page_pricing.colStaria}</th>
                <th className="py-4 px-4 text-center">{dict.page_pricing.colYukon}</th>
                <th className="py-4 px-4 text-center">{dict.page_pricing.colHiace}</th>
                <th className="py-4 px-4 text-center">{dict.page_pricing.colCoaster}</th>
                <th className="py-4 px-4 text-center">{dict.page_pricing.actionBook}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredRoutes.map((row) => (
                <tr key={row.id} className="hover:bg-gold-soft/20 transition-colors">
                  <td className="py-4 px-5 font-semibold text-ink">
                    <span className="block text-sm">{row.title}</span>
                  </td>
                  <td className="py-4 px-4 text-center font-bold text-ink">
                    {formatPrice(row.camry)}
                  </td>
                  <td className="py-4 px-4 text-center font-bold text-gold-dark">
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
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold-dark hover:bg-gold-hover text-surface font-bold text-xs transition-colors"
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

      {/* Policies & Notes */}
      <div className="bg-surface rounded-2xl p-6 md:p-8 border border-gold-line/60">
        <h3 className="font-display text-xl font-bold text-ink mb-4">
          {dict.page_pricing.noteTitle}
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
