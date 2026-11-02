'use client';

import { useEffect } from 'react';
import { useCurrency, Currency } from '@/context/CurrencyContext';

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
  const { setCurrency } = useCurrency();

  useEffect(() => {
    try {
      setCurrency(currency);
      localStorage.setItem('site_language', langCode);

      const domain = window.location.hostname;
      const rootDomain = domain.replace(/^www\./, '');

      if (googleCode === 'es') {
        const expirePast = 'expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = `googtrans=; ${expirePast}`;
        document.cookie = `googtrans=; domain=${domain}; ${expirePast}`;
        document.cookie = `googtrans=; domain=.${rootDomain}; ${expirePast}`;
        document.cookie = `googtrans=/es/es; path=/; max-age=31536000;`;
      } else {
        const transVal = `/es/${googleCode}`;
        const maxAge = 'max-age=31536000; path=/;';
        document.cookie = `googtrans=${transVal}; ${maxAge}`;
        document.cookie = `googtrans=${transVal}; domain=${domain}; ${maxAge}`;
        document.cookie = `googtrans=${transVal}; domain=.${rootDomain}; ${maxAge}`;

        const applyGoogleCombo = () => {
          const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
          if (select && select.value !== googleCode) {
            select.value = googleCode;
            select.dispatchEvent(new Event('change'));
          }
        };

        applyGoogleCombo();
        const timer = setTimeout(applyGoogleCombo, 900);
        return () => clearTimeout(timer);
      }
    } catch {
      // ignore cookie/storage errors in restricted contexts
    }
  }, [langCode, googleCode, currency, setCurrency]);

  return null;
}
