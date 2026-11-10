'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { I18N_SEO_ROUTES } from '@/lib/i18nRoutes';
import {
  formatLocalizedBudgetLabel,
  getDefaultAmazonRegion,
  getLocaleCurrency,
  getLocaleHref,
  getUiStrings,
  isRtlLocale,
  localizeTerm,
  normalizeLocaleKey,
} from '@/lib/i18nContent';
import { LocaleKey } from '@/lib/i18nTypes';
import { useCurrency, Currency } from '@/context/CurrencyContext';

export function resolveLocaleFromPathname(pathname?: string | null): {
  localeKey: LocaleKey;
  basePath: string;
  isLocaleRoute: boolean;
} {
  const cleanPath = (pathname || '/').trim() || '/';
  const segments = cleanPath.replace(/^\/+/, '').split('/').filter(Boolean);
  const firstSeg = segments[0]?.toLowerCase() || '';

  if (firstSeg && firstSeg in I18N_SEO_ROUTES) {
    const rest = segments.slice(1).join('/');
    return {
      localeKey: normalizeLocaleKey(firstSeg),
      basePath: rest ? `/${rest}` : '/',
      isLocaleRoute: true,
    };
  }

  return {
    localeKey: 'es',
    basePath: cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`,
    isLocaleRoute: false,
  };
}

export function useActiveLocale() {
  const pathname = usePathname();
  const {
    currency,
    setCurrency,
    amazonRegion,
    setAmazonRegion,
    amazonBaseUrl,
    amazonTag,
    amazonSiteName,
    formatPrice,
    currencySymbol,
  } = useCurrency();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { localeKey, basePath, isLocaleRoute } = resolveLocaleFromPathname(pathname);
  const ui = getUiStrings(localeKey);
  const localeCurrencyInfo = getLocaleCurrency(localeKey);
  const defaultCurrency: Currency = localeCurrencyInfo.currency;
  const activeCurrency: Currency = mounted ? currency : defaultCurrency;
  const activeCurrencySymbol = activeCurrency === 'USD' ? '$' : '€';
  const defaultRegion = getDefaultAmazonRegion(localeKey);
  const activeAmazonRegion = mounted ? amazonRegion : defaultRegion;
  const activeAmazonSiteName = mounted
    ? amazonSiteName
    : defaultRegion === 'intl'
    ? 'Amazon'
    : 'Amazon.es';
  const isRtl = isRtlLocale(localeKey);

  const localePath = (targetPath: string) => getLocaleHref(localeKey, targetPath);
  const tTerm = (rawTerm: string) => localizeTerm(localeKey, rawTerm, activeCurrency);
  const tBudget = (maxPrice: string) =>
    formatLocalizedBudgetLabel(localeKey, maxPrice, activeCurrency);

  return {
    pathname: pathname || '/',
    localeKey,
    basePath,
    isLocaleRoute,
    langCode: localeCurrencyInfo.langCode,
    hreflang: localeCurrencyInfo.hreflang,
    countryCode: localeCurrencyInfo.countryCode,
    isRtl,
    ui,
    defaultCurrency,
    activeCurrency,
    currencySymbol: activeCurrencySymbol,
    setCurrency,
    amazonRegion: activeAmazonRegion,
    setAmazonRegion,
    amazonBaseUrl,
    amazonTag,
    amazonSiteName: activeAmazonSiteName,
    formatPrice,
    mounted,
    localePath,
    tTerm,
    tBudget,
  };
}
