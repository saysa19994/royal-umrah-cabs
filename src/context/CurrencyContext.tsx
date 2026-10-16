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
    const saved = localStorage.getItem('ruc_preferred_currency') as CurrencyCode;
    if (saved && CURRENCIES[saved]) {
      setCurrencyState(saved);
    } else {
      setCurrencyState(defaultCurrency);
    }
  }, [defaultCurrency]);

  const setCurrency = (code: CurrencyCode) => {
    if (CURRENCIES[code]) {
      setCurrencyState(code);
      localStorage.setItem('ruc_preferred_currency', code);
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
