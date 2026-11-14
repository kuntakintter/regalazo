'use client';

import { useEffect } from 'react';
import { useCurrency, Currency } from '@/context/CurrencyContext';
import { getDefaultAmazonRegion, isRtlLocale } from '@/lib/i18nContent';
import { isSpainClient } from '@/lib/amazon';

interface LocaleAutoInitializerProps {
  langCode: string;
  googleCode?: string;
  currency: Currency;
}

export default function LocaleAutoInitializer({
  langCode,
  currency,
}: LocaleAutoInitializerProps) {
  const { setCurrency, setAmazonRegion, resetLocaleToSavedOrBrowser } = useCurrency();

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = langCode;
      document.documentElement.dir = isRtlLocale(langCode) ? 'rtl' : 'ltr';
    }

    try {
      setCurrency(currency, false);
      setAmazonRegion(isSpainClient() ? 'es' : getDefaultAmazonRegion(langCode), false);
    } catch {
      // ignore storage errors in restricted contexts
    }

    return () => {
      if (typeof document !== 'undefined') {
        document.documentElement.lang = 'es';
        document.documentElement.dir = 'ltr';
      }
      try {
        resetLocaleToSavedOrBrowser();
      } catch {
        // ignore
      }
    };
  }, [langCode, currency, setCurrency, setAmazonRegion, resetLocaleToSavedOrBrowser]);

  return null;
}
