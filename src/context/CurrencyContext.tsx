'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import {
  parsePrice,
  AmazonRegion,
  SPAIN_TIMEZONES,
  detectClientAmazonRegion,
  getRegionalAmazonConfig,
  AMAZON_BASE_URL,
  AMAZON_AFFILIATE_TAG_ES,
} from '@/lib/amazon';

export type Currency = 'EUR' | 'USD';

export const EUR_TO_USD_RATE = 1.08;

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency, persist?: boolean) => void;
  amazonRegion: AmazonRegion;
  setAmazonRegion: (r: AmazonRegion, persist?: boolean) => void;
  resetLocaleToSavedOrBrowser: () => void;
  amazonBaseUrl: string;
  amazonTag: string;
  amazonSiteName: string;
  formatPrice: (priceText?: string) => string;
  currencySymbol: string;
}

function detectClientDefaultCurrency(): Currency {
  if (typeof window === 'undefined') return 'EUR';
  try {
    const savedCurrency = localStorage.getItem('site_currency') as Currency;
    if (savedCurrency === 'EUR' || savedCurrency === 'USD') {
      return savedCurrency;
    }
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz && !tz.startsWith('Europe/') && !SPAIN_TIMEZONES.has(tz)) {
      return 'USD';
    }
  } catch {
    // ignore
  }
  return 'EUR';
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: 'EUR',
  setCurrency: () => {},
  amazonRegion: 'es',
  setAmazonRegion: () => {},
  resetLocaleToSavedOrBrowser: () => {},
  amazonBaseUrl: AMAZON_BASE_URL,
  amazonTag: AMAZON_AFFILIATE_TAG_ES,
  amazonSiteName: 'Amazon.es',
  formatPrice: (p) => p || '',
  currencySymbol: '€',
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('EUR');
  const [amazonRegion, setAmazonRegionState] = useState<AmazonRegion>('es');
  const currencyPersistedRef = useRef(false);
  const regionPersistedRef = useRef(false);
  const currencyAppliedRef = useRef(false);
  const regionAppliedRef = useRef(false);

  useEffect(() => {
    try {
      if (!regionAppliedRef.current) {
        setAmazonRegionState(detectClientAmazonRegion());
      }

      if (!currencyAppliedRef.current) {
        setCurrencyState(detectClientDefaultCurrency());
      }
    } catch {
      // ignore
    }

    // Escuchar eventos de cambio de idioma/moneda/región
    const handleCurrencyChange = (e: Event) => {
      const detail = (e as CustomEvent<Currency>).detail;
      if (detail === 'EUR' || detail === 'USD') {
        currencyPersistedRef.current = true;
        currencyAppliedRef.current = true;
        setCurrencyState(detail);
      }
    };
    const handleRegionChange = (e: Event) => {
      const detail = (e as CustomEvent<AmazonRegion>).detail;
      if (detail === 'es' || detail === 'intl') {
        regionPersistedRef.current = true;
        regionAppliedRef.current = true;
        setAmazonRegionState(detail);
      }
    };
    window.addEventListener('siteCurrencyChange', handleCurrencyChange);
    window.addEventListener('siteAmazonRegionChange', handleRegionChange);
    return () => {
      window.removeEventListener('siteCurrencyChange', handleCurrencyChange);
      window.removeEventListener('siteAmazonRegionChange', handleRegionChange);
    };
  }, []);

  const setCurrency = useCallback((c: Currency, persist: boolean = true) => {
    currencyAppliedRef.current = true;
    if (persist) {
      currencyPersistedRef.current = true;
    }
    setCurrencyState(c);
    try {
      if (persist) {
        localStorage.setItem('site_currency', c);
        window.dispatchEvent(new CustomEvent('siteCurrencyChange', { detail: c }));
      }
    } catch {
      // ignore
    }
  }, []);

  const setAmazonRegion = useCallback((r: AmazonRegion, persist: boolean = true) => {
    regionAppliedRef.current = true;
    if (persist) {
      regionPersistedRef.current = true;
    }
    setAmazonRegionState(r);
    try {
      if (persist) {
        localStorage.setItem('site_amazon_region', r);
        window.dispatchEvent(new CustomEvent('siteAmazonRegionChange', { detail: r }));
      }
    } catch {
      // ignore
    }
  }, []);

  const resetLocaleToSavedOrBrowser = useCallback(() => {
    if (!currencyPersistedRef.current) {
      currencyAppliedRef.current = false;
      setCurrencyState(detectClientDefaultCurrency());
    }
    if (!regionPersistedRef.current) {
      regionAppliedRef.current = false;
      setAmazonRegionState(detectClientAmazonRegion());
    }
  }, []);

  const formatPrice = useCallback(
    (priceText?: string): string => {
      if (!priceText) return '';
      const isSourceUsd = priceText.includes('$');
      if (isSourceUsd) {
        if (currency === 'USD') {
          return priceText;
        }
        const numUsd = parsePrice(priceText);
        if (!numUsd || numUsd <= 0) return priceText;
        const numEur = numUsd / EUR_TO_USD_RATE;
        return `${numEur.toFixed(2).replace('.', ',')} €`;
      }
      if (currency === 'EUR') {
        return priceText;
      }
      // Conversión a Dólares USD ($)
      const numEur = parsePrice(priceText);
      if (!numEur || numEur <= 0) return priceText;
      const numUsd = numEur * EUR_TO_USD_RATE;
      return `$${numUsd.toFixed(2)}`;
    },
    [currency]
  );

  const regionalConfig = getRegionalAmazonConfig(amazonRegion);
  const currencySymbol = currency === 'USD' ? '$' : '€';

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        amazonRegion,
        setAmazonRegion,
        resetLocaleToSavedOrBrowser,
        amazonBaseUrl: regionalConfig.baseUrl,
        amazonTag: regionalConfig.tag,
        amazonSiteName: regionalConfig.siteName,
        formatPrice,
        currencySymbol,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
