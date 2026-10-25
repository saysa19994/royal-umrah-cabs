'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CURRENCIES, CurrencyCode } from '@/i18n/config';

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (amountSAR: number) => string;
  convertPrice: (amountSAR: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({
  children,
  defaultCurrency = 'SAR',
}: {
  children: React.ReactNode;
  defaultCurrency?: CurrencyCode;
}) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(defaultCurrency);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ruc_preferred_currency') as CurrencyCode;
      // Strictly allow only SAR or USD; if old or unsupported currency found, safely fall back to default
      if (saved && (saved === 'SAR' || saved === 'USD') && CURRENCIES[saved]) {
        setCurrencyState(saved);
      } else {
        setCurrencyState(defaultCurrency);
        if (saved && saved !== 'SAR' && saved !== 'USD') {
          localStorage.removeItem('ruc_preferred_currency');
        }
      }
    } catch {
      setCurrencyState(defaultCurrency);
    }
  }, [defaultCurrency]);

  const setCurrency = (code: CurrencyCode) => {
    if (code === 'SAR' || code === 'USD') {
      setCurrencyState(code);
      try {
        localStorage.setItem('ruc_preferred_currency', code);
      } catch {}
    }
  };

  const convertPrice = (amountSAR: number) => {
    const cfg = CURRENCIES[currency] || CURRENCIES.SAR;
    return Math.round(amountSAR * cfg.rateFromSAR);
  };

  const formatPrice = (amountSAR: number) => {
    const cfg = CURRENCIES[currency] || CURRENCIES.SAR;
    const converted = convertPrice(amountSAR);
    return cfg.isPrefix ? `${cfg.symbol}${converted.toLocaleString()}` : `${converted.toLocaleString()} ${cfg.symbol}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, convertPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
