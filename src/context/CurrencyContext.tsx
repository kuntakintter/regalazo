'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
import {
  parsePrice,
  AmazonRegion,
  SPAIN_TIMEZONES,
  isSpainClient,
  detectClientAmazonRegion,
  getRegionalAmazonConfig,
  AMAZON_BASE_URL,
  AMAZON_AFFILIATE_TAG_ES,
} from '@/lib/amazon';
import { I18N_SEO_ROUTES } from '@/lib/i18nRoutes';

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

function getRouteDefaults(pathname?: string | null): {
  isLocaleRoute: boolean;
  defaultCurrency: Currency;
  defaultRegion: AmazonRegion;
} {
  const firstSeg = (pathname || '/').replace(/^\/+/, '').split('/')[0]?.toLowerCase() || '';
  const cfg = firstSeg ? I18N_SEO_ROUTES[firstSeg] : undefined;
  if (cfg) {
    return {
      isLocaleRoute: true,
      defaultCurrency: cfg.currency,
      defaultRegion: 'intl',
    };
  }
  return {
    isLocaleRoute: false,
    defaultCurrency: 'EUR',
    defaultRegion: 'es',
  };
}

function detectClientDefaultCurrency(): Currency {
  if (typeof window === 'undefined') return 'EUR';
  try {
    if (isSpainClient()) {
      return 'EUR';
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
  const pathname = usePathname();
  const routeDefaults = getRouteDefaults(pathname);

  const [currency, setCurrencyState] = useState<Currency>(routeDefaults.defaultCurrency);
  const [amazonRegion, setAmazonRegionState] = useState<AmazonRegion>(routeDefaults.defaultRegion);
  const currencyPersistedRef = useRef(false);
  const regionPersistedRef = useRef(false);
  const currencyAppliedRef = useRef(false);
  const regionAppliedRef = useRef(false);

  useEffect(() => {
    try {
      // Limpiar preferencias heredadas de localStorage que forzaban USD/intl en España
      localStorage.removeItem('site_amazon_region');
      localStorage.removeItem('site_currency');

      if (!routeDefaults.isLocaleRoute) {
        // En rutas en español (/ , /votar, /carta-papa-noel, etc.), usar siempre EUR y región de cliente (es en España)
        setAmazonRegionState(detectClientAmazonRegion());
        setCurrencyState(detectClientDefaultCurrency());
      } else {
        // En rutas internacionales (/en/..., /fr/..., etc.): si el visitante está en España, mantener Amazon.es (vapegadgets22-21)
        setAmazonRegionState(isSpainClient() ? 'es' : routeDefaults.defaultRegion);
        setCurrencyState(routeDefaults.defaultCurrency);
      }
    } catch {
      // ignore
    }
  }, [pathname, routeDefaults.isLocaleRoute, routeDefaults.defaultCurrency, routeDefaults.defaultRegion]);

  useEffect(() => {
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
    const currentDefaults = getRouteDefaults(pathname);
    if (!currencyPersistedRef.current) {
      currencyAppliedRef.current = false;
      setCurrencyState(
        currentDefaults.isLocaleRoute
          ? currentDefaults.defaultCurrency
          : detectClientDefaultCurrency()
      );
    }
    if (!regionPersistedRef.current) {
      regionAppliedRef.current = false;
      setAmazonRegionState(
        currentDefaults.isLocaleRoute
          ? currentDefaults.defaultRegion
          : detectClientAmazonRegion()
      );
    }
  }, [pathname]);

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
