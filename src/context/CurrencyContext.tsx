'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { parsePrice } from '@/lib/amazon';

export type Currency = 'EUR' | 'USD';

export const EUR_TO_USD_RATE = 1.08;

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (priceText?: string) => string;
  currencySymbol: string;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: 'EUR',
  setCurrency: () => {},
  formatPrice: (p) => p || '',
  currencySymbol: '€',
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('EUR');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('site_currency') as Currency;
      if (saved === 'EUR' || saved === 'USD') {
        setCurrencyState(saved);
      }
    } catch {
      // ignore
    }

    // Escuchar eventos de cambio de idioma/moneda
    const handleCurrencyChange = (e: any) => {
      if (e.detail === 'EUR' || e.detail === 'USD') {
        setCurrencyState(e.detail);
      }
    };
    window.addEventListener('siteCurrencyChange', handleCurrencyChange);
    return () => window.removeEventListener('siteCurrencyChange', handleCurrencyChange);
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem('site_currency', c);
      window.dispatchEvent(new CustomEvent('siteCurrencyChange', { detail: c }));
    } catch {
      // ignore
    }
  };

  const formatPrice = (priceText?: string): string => {
    if (!priceText) return '';
    if (currency === 'EUR') {
      return priceText;
    }
    // Conversión a Dólares USD ($)
    const numEur = parsePrice(priceText);
    if (!numEur || numEur <= 0) return priceText;
    const numUsd = numEur * EUR_TO_USD_RATE;
    return `$${numUsd.toFixed(2)}`;
  };

  const currencySymbol = currency === 'USD' ? '$' : '€';

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, currencySymbol }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
