'use client';

import { useEffect } from 'react';
import { useCurrency, Currency } from '@/context/CurrencyContext';
import { ensureGoogleTranslateLoaded, setGoogleTranslateCookie } from '@/lib/googleTranslate';

interface LocaleAutoInitializerProps {
  langCode: string;
  googleCode: string;
  currency: Currency;
}

export default function LocaleAutoInitializer({
  langCode,
  googleCode,
  currency,
}: LocaleAutoInitializerProps) {
  const { setCurrency, setAmazonRegion, resetLocaleToSavedOrBrowser } = useCurrency();

  useEffect(() => {
    try {
      const hasExplicitCurrency = Boolean(localStorage.getItem('site_currency'));
      const hasExplicitRegion = Boolean(localStorage.getItem('site_amazon_region'));

      if (!hasExplicitCurrency) {
        setCurrency(currency, false);
      }
      if (!hasExplicitRegion) {
        setAmazonRegion(langCode === 'es' ? 'es' : 'intl', false);
      }

      if (googleCode === 'es') {
        setGoogleTranslateCookie('es');
      } else {
        ensureGoogleTranslateLoaded(googleCode);
      }
    } catch {
      // ignore cookie/storage errors in restricted contexts
    }

    return () => {
      try {
        resetLocaleToSavedOrBrowser();
        if (!localStorage.getItem('site_language')) {
          setGoogleTranslateCookie('es');
        }
      } catch {
        // ignore
      }
    };
  }, [langCode, googleCode, currency, setCurrency, setAmazonRegion, resetLocaleToSavedOrBrowser]);

  return null;
}
