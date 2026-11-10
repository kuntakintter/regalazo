import { Currency } from '@/context/CurrencyContext';
import { LocaleKey } from '@/lib/i18nTypes';
import { applyCurrencyDisplay, getLocaleCurrency, normalizeLocaleKey } from '@/lib/i18nContent';
import { HubLocalePack } from '@/lib/hubLocales/types';
import {
  ES_HUB_LOCALE,
  ES_US_HUB_LOCALE,
  EN_HUB_LOCALE,
  EN_GB_HUB_LOCALE,
} from '@/lib/hubLocales/esEn';
import { WEST_EUROPE_HUB_LOCALES } from '@/lib/hubLocales/westEurope';
import { NORTH_EAST_EUROPE_HUB_LOCALES } from '@/lib/hubLocales/northEastEurope';
import { SOUTH_EAST_EUROPE_RU_UK_HUB_LOCALES } from '@/lib/hubLocales/southEastEuropeRuUk';
import { ASIA_ARABIC_HUB_LOCALES } from '@/lib/hubLocales/asiaArabic';

export type {
  HubFaqItem,
  EditorialCard,
  CommonHubLabels,
  NicheHubCopy,
  PersonaHubCopy,
  VotarHubCopy,
  CartaHubCopy,
  FilterLandingCopy,
  HubLocalePack,
} from '@/lib/hubLocales/types';

export const ALL_HUB_LOCALES: Record<LocaleKey, HubLocalePack> = {
  es: ES_HUB_LOCALE,
  'es-us': ES_US_HUB_LOCALE,
  en: EN_HUB_LOCALE,
  'en-gb': EN_GB_HUB_LOCALE,
  ...WEST_EUROPE_HUB_LOCALES,
  ...NORTH_EAST_EUROPE_HUB_LOCALES,
  ...SOUTH_EAST_EUROPE_RU_UK_HUB_LOCALES,
  ...ASIA_ARABIC_HUB_LOCALES,
};

function convertCurrencyRecursive<T>(val: T, currency: Currency): T {
  if (typeof val === 'string') {
    return applyCurrencyDisplay(val, currency) as unknown as T;
  }
  if (Array.isArray(val)) {
    return val.map((item) => convertCurrencyRecursive(item, currency)) as unknown as T;
  }
  if (val && typeof val === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(val as Record<string, unknown>)) {
      out[k] = convertCurrencyRecursive(v, currency);
    }
    return out as T;
  }
  return val;
}

export function getHubLabels(
  localeKey?: string | null,
  currency?: Currency
): HubLocalePack {
  const key = normalizeLocaleKey(localeKey);
  const rawPack = ALL_HUB_LOCALES[key] || EN_HUB_LOCALE;
  const targetCurrency = currency || getLocaleCurrency(key).currency;
  return convertCurrencyRecursive(rawPack, targetCurrency);
}
