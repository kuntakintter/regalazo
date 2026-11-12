import { Currency } from '@/context/CurrencyContext';
import { AmazonRegion } from '@/lib/amazon';
import { AGE_CATEGORIES } from '@/data/products';
import { I18N_SEO_ROUTES, I18nFaqItem } from '@/lib/i18nRoutes';
import { SEO_AGE_ROUTES } from '@/lib/seoRoutes';
import { ALL_STATIC_HUB_SLUGS, SEO_FILTER_ROUTES } from '@/lib/filterRoutes';
import { localizeRoutePath } from '@/lib/localizedSlugs';
import { HubCopy, LangPack, LocaleKey, LocalizedMeta, UiStrings } from '@/lib/i18nTypes';
import { ES_HUBS, ES_PACK, ES_UI, ES_US_HUB_OVERRIDES } from '@/lib/locales/es';
import { EN_GB_UI_OVERRIDES, EN_HUBS, EN_PACK, EN_TERMS, EN_UI } from '@/lib/locales/en';
import { WEST_EUROPE_PACKS } from '@/lib/locales/westEurope';
import { NORTH_EAST_EUROPE_PACKS } from '@/lib/locales/northEastEurope';
import { SOUTH_EAST_EUROPE_TR_PACKS } from '@/lib/locales/southEastEuropeTr';
import { ASIA_ARABIC_PACKS } from '@/lib/locales/asiaArabic';

function mergeHubs(
  base: Record<string, HubCopy>,
  overrides: Partial<Record<string, Partial<HubCopy>>>
): Record<string, HubCopy> {
  const out: Record<string, HubCopy> = { ...base };
  for (const [slug, patch] of Object.entries(overrides)) {
    if (patch && out[slug]) {
      out[slug] = { ...out[slug], ...patch };
    }
  }
  return out;
}

export const ALL_LANG_PACKS: Record<LocaleKey, LangPack> = {
  es: ES_PACK,
  'es-us': {
    ui: {
      ...ES_UI,
      langStoreIntl: '🇺🇸 Amazon Estados Unidos / Global (.com)',
      budgetNoLimitSuffix: '(Sin límite)',
    },
    terms: ES_PACK.terms,
    hubs: mergeHubs(ES_HUBS, ES_US_HUB_OVERRIDES),
  },
  en: EN_PACK,
  'en-gb': {
    ui: { ...EN_UI, ...EN_GB_UI_OVERRIDES },
    terms: EN_TERMS,
    hubs: EN_HUBS,
  },
  ...WEST_EUROPE_PACKS,
  ...NORTH_EAST_EUROPE_PACKS,
  ...SOUTH_EAST_EUROPE_TR_PACKS,
  ...ASIA_ARABIC_PACKS,
};

export const RTL_LOCALES = new Set<LocaleKey>(['ar']);

export function isRtlLocale(localeKey?: string | null): boolean {
  const normalized = normalizeLocaleKey(localeKey);
  return RTL_LOCALES.has(normalized);
}

export function normalizeLocaleKey(slugOrLang?: string | null): LocaleKey {
  if (!slugOrLang) return 'es';
  const clean = slugOrLang.toLowerCase().trim();
  if (clean === 'es' || clean === 'es-es' || clean === 'root') return 'es';
  if (clean === 'es-us') return 'es-us';
  if (clean === 'en-gb') return 'en-gb';
  if (clean in ALL_LANG_PACKS) {
    return clean as LocaleKey;
  }
  const base = clean.split('-')[0];
  if (base in ALL_LANG_PACKS) {
    return base as LocaleKey;
  }
  return 'es';
}

export function getLangPack(localeKey?: string | null): LangPack {
  return ALL_LANG_PACKS[normalizeLocaleKey(localeKey)] || ES_PACK;
}

export function getUiStrings(localeKey?: string | null): UiStrings {
  return getLangPack(localeKey).ui;
}

export function getLocaleCurrency(localeKey?: string | null): {
  currency: Currency;
  currencySymbol: string;
  countryCode: string;
  regionLabel: string;
  ogLocale: string;
  langCode: string;
  hreflang: string;
} {
  const key = normalizeLocaleKey(localeKey);
  if (key === 'es') {
    return {
      currency: 'EUR',
      currencySymbol: '€',
      countryCode: 'ES',
      regionLabel: 'España & Internacional',
      ogLocale: 'es_ES',
      langCode: 'es-ES',
      hreflang: 'es',
    };
  }
  const cfg = I18N_SEO_ROUTES[key];
  if (!cfg) {
    return {
      currency: 'EUR',
      currencySymbol: '€',
      countryCode: 'ES',
      regionLabel: 'Global',
      ogLocale: 'es_ES',
      langCode: 'es-ES',
      hreflang: 'es',
    };
  }
  const countryMap: Record<string, string> = {
    en: 'US',
    'en-gb': 'GB',
    'es-us': 'US',
    de: 'DE',
    fr: 'FR',
    it: 'IT',
    pt: 'PT',
    ru: 'RU',
    nl: 'NL',
    pl: 'PL',
    zh: 'CN',
    ja: 'JP',
    ar: 'SA',
    uk: 'UA',
    sv: 'SE',
    no: 'NO',
    da: 'DK',
    fi: 'FI',
    el: 'GR',
    tr: 'TR',
    ro: 'RO',
    bg: 'BG',
    cs: 'CZ',
    hu: 'HU',
    ko: 'KR',
    hi: 'IN',
  };
  return {
    currency: cfg.currency,
    currencySymbol: cfg.currencySymbol,
    countryCode: countryMap[key] || 'US',
    regionLabel: cfg.nativeName,
    ogLocale: cfg.ogLocale,
    langCode: cfg.langCode,
    hreflang: cfg.hreflang,
  };
}

export function getDefaultAmazonRegion(localeKey?: string | null): AmazonRegion {
  return normalizeLocaleKey(localeKey) === 'es' ? 'es' : 'intl';
}

export function getLocaleHref(localeKey: string | null | undefined, path: string): string {
  const key = normalizeLocaleKey(localeKey);
  const raw = (path || '/').trim();
  const withLeading = raw.startsWith('/') ? raw : `/${raw}`;
  const clean = withLeading.length > 1 && withLeading.endsWith('/') ? withLeading.slice(0, -1) : withLeading;

  // Las páginas legales siempre son rutas españolas únicas (con noindex)
  if (
    clean === '/aviso-legal' ||
    clean === '/politica-de-privacidad' ||
    clean === '/politica-de-cookies'
  ) {
    return clean;
  }

  if (key === 'es') {
    return localizeRoutePath('es', clean);
  }

  // Si ya viene con el prefijo del idioma, extraer el resto para localizar los segmentos limpiamente
  const prefix = `/${key}`;
  if (clean === prefix) {
    return prefix;
  }
  if (clean.startsWith(`${prefix}/`)) {
    return localizeRoutePath(key, clean.slice(prefix.length));
  }

  return localizeRoutePath(key, clean);
}

export function applyCurrencyDisplay(text: string, currency: Currency): string {
  if (!text) return text;
  if (currency === 'USD') {
    let out = text;
    // Convertir €15, €30, €100+ -> $15, $30, $100+
    out = out.replace(/€\s*(\d+(?:[.,]\d+)?)/g, (_m, num) => `$${num}`);
    // Convertir +180 €, 30 €, <30 €, 20 € -> +$180, $30, <$30, $20
    out = out.replace(/(\+?)(\d+(?:[.,]\d+)?)\s*€(\+?)/g, (_m, pre, num, post) => `${pre}$${num}${post}`);
    // Convertir "20 Euros", "20 euros", "20 евро", "20 ευρώ", "20 ユーロ" -> "$20 USD"
    out = out.replace(
      /(\d+(?:[.,]\d+)?)\s*(?:euros?|Euros?|евро|євро|ευρώ|ユーロ|欧元|유로|यूरो|يورو)\b/gi,
      (_m, num) => `$${num} USD`
    );
    // Limpiar posibles secuencias $$ o ($20) USD
    out = out.replace(/\$\$/g, '$');
    return out;
  }
  // Para EUR, respetar los textos base que ya usan € o convertir $XX si aparece en overrides USD
  return text.replace(/\$(\d+(?:[.,]\d+)?)\s*(?:USD)?/g, (_m, num) => `${num} €`);
}

// Separa prefijo visual (emojis + espacio) para traducir solo la etiqueta textual limpia
const LEADING_EMOJI_REGEX = /^((?:[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]+)\s+)(.+)$/u;

export function localizeTerm(
  localeKey: string | null | undefined,
  rawTerm: string,
  currency?: Currency
): string {
  const key = normalizeLocaleKey(localeKey);
  const pack = getLangPack(key);
  const targetCurrency = currency || getLocaleCurrency(key).currency;

  const trimmed = (rawTerm || '').trim();
  let leadingEmoji = '';
  let coreText = trimmed;

  const match = trimmed.match(LEADING_EMOJI_REGEX);
  if (match) {
    leadingEmoji = match[1];
    coreText = match[2].trim();
  }

  let translated = trimmed;
  if (pack.terms[trimmed]) {
    translated = pack.terms[trimmed];
  } else if (pack.terms[coreText]) {
    translated = leadingEmoji ? `${leadingEmoji}${pack.terms[coreText]}` : pack.terms[coreText];
  } else if (key !== 'es' && key !== 'es-us' && EN_TERMS[trimmed]) {
    translated = EN_TERMS[trimmed];
  } else if (key !== 'es' && key !== 'es-us' && EN_TERMS[coreText]) {
    translated = leadingEmoji ? `${leadingEmoji}${EN_TERMS[coreText]}` : EN_TERMS[coreText];
  }

  return applyCurrencyDisplay(translated, targetCurrency);
}

export function formatLocalizedBudgetLabel(
  localeKey: string | null | undefined,
  maxPrice: string,
  currency?: Currency
): string {
  const key = normalizeLocaleKey(localeKey);
  const ui = getUiStrings(key);
  const targetCurrency = currency || getLocaleCurrency(key).currency;
  const fmt = (amount: number) => (targetCurrency === 'USD' ? `$${amount}` : `${amount} €`);

  switch (maxPrice) {
    case 'all':
      return ui.budgetAnyUnlimited;
    case '<15':
      return `${ui.budgetUpToPrefix} ${fmt(15)}`;
    case '<20':
      return `${ui.budgetUpToPrefix} ${fmt(20)}`;
    case '15-30':
      return ui.budgetBetweenWord
        ? `${ui.budgetBetweenWord} ${fmt(15)} ${ui.budgetAndWord} ${fmt(30)}`
        : `${fmt(15)} ${ui.budgetAndWord} ${fmt(30)}`.trim();
    case '20-50':
      return ui.budgetBetweenWord
        ? `${ui.budgetBetweenWord} ${fmt(20)} ${ui.budgetAndWord} ${fmt(50)}`
        : `${fmt(20)} ${ui.budgetAndWord} ${fmt(50)}`.trim();
    case '30-60':
      return ui.budgetBetweenWord
        ? `${ui.budgetBetweenWord} ${fmt(30)} ${ui.budgetAndWord} ${fmt(60)}`
        : `${fmt(30)} ${ui.budgetAndWord} ${fmt(60)}`.trim();
    case '50-100':
      return ui.budgetBetweenWord
        ? `${ui.budgetBetweenWord} ${fmt(50)} ${ui.budgetAndWord} ${fmt(100)}`
        : `${fmt(50)} ${ui.budgetAndWord} ${fmt(100)}`.trim();
    case '>60':
      return `${ui.budgetMoreThanPrefix} ${fmt(60)} ${ui.budgetNoLimitSuffix}`;
    case '>100':
      return `${ui.budgetMoreThanPrefix} ${fmt(100)} ${ui.budgetNoLimitSuffix}`;
    case '30':
    case '50':
    case '75':
    case '100':
    case '150':
    case '200':
      return `${ui.budgetUpToPrefix} ${fmt(Number(maxPrice))}`;
    default:
      return ui.budgetAnyUnlimited;
  }
}

export function getLocalizedAgeMeta(
  localeKey: string | null | undefined,
  ageSlug: string,
  currency?: Currency
): LocalizedMeta {
  const key = normalizeLocaleKey(localeKey);
  const { currency: defaultCur, currencySymbol } = getLocaleCurrency(key);
  const targetCurrency = currency || defaultCur;
  const targetSymbol = targetCurrency === 'USD' ? '$' : currencySymbol;
  const ui = getUiStrings(key);

  const ageRoute = SEO_AGE_ROUTES[ageSlug];
  const ageCat = AGE_CATEGORIES.find((c) => c.id === ageRoute?.ageId);

  if (key === 'es' || key === 'es-us') {
    const rawTitle = ageRoute?.title || ageCat?.h1 || 'Un Buen Regalo por Edad';
    const rawDesc = ageRoute?.description || ageCat?.description || '';
    const rawH1 = ageRoute?.h1 || ageCat?.h1 || '';
    return {
      title: applyCurrencyDisplay(rawTitle, targetCurrency),
      socialTitle: applyCurrencyDisplay(rawTitle, targetCurrency),
      description: applyCurrencyDisplay(rawDesc, targetCurrency),
      h1: applyCurrencyDisplay(rawH1, targetCurrency),
      subtitle: applyCurrencyDisplay(ageCat?.tagline || rawDesc, targetCurrency),
      tagline: applyCurrencyDisplay(ageCat?.tagline || '', targetCurrency),
      keywords: ageRoute?.keywords || ageCat?.seoKeywords || [],
      currency: targetCurrency,
      currencySymbol: targetSymbol,
    };
  }

  const baseLabel = localizeTerm(
    key,
    ageCat?.label || (ageSlug === 'fiesta-revelacion-genero' ? 'Fiesta Revelación de Género' : ageSlug),
    targetCurrency
  );
  const label = ageRoute?.specificYear
    ? key === 'en' || key === 'en-gb'
      ? ageRoute.specificYear === 1
        ? 'Gifts for 1-Year-Old Babies & Toddlers'
        : ageRoute.specificYear >= 16
        ? `Gifts for ${ageRoute.specificYear}-Year-Old Teens & Youth`
        : `Gifts for ${ageRoute.specificYear}-Year-Old Kids`
      : `${baseLabel} · ${ageRoute.specificYear}`
    : baseLabel;
  const tagline = `${ui.verifiedCatalogNote} · ${label}`;
  const title = `${label} ${ui.ageTitleSuffix}`;
  const description = applyCurrencyDisplay(
    ui.ageDescTemplate.replace('{label}', label).replace('{tagline}', tagline),
    targetCurrency
  );
  const h1 = `${ui.brandName}: ${label} (${ui.badgeUpdated2026})`;

  return {
    title,
    socialTitle: `🎁 ${label} | ${ui.brandName}`,
    description,
    h1,
    subtitle: tagline,
    tagline,
    keywords: [label, `${label} 2026`, ui.brandName],
    currency: targetCurrency,
    currencySymbol: targetSymbol,
  };
}

export function getLocalizedSubcategoryMeta(
  localeKey: string | null | undefined,
  ageSlug: string,
  subLabel: string,
  currency?: Currency
): LocalizedMeta {
  const key = normalizeLocaleKey(localeKey);
  const { currency: defaultCur, currencySymbol } = getLocaleCurrency(key);
  const targetCurrency = currency || defaultCur;
  const targetSymbol = targetCurrency === 'USD' ? '$' : currencySymbol;
  const ui = getUiStrings(key);

  const ageMeta = getLocalizedAgeMeta(key, ageSlug, targetCurrency);
  const ageCat = AGE_CATEGORIES.find((c) => c.id === SEO_AGE_ROUTES[ageSlug]?.ageId);
  const ageLabel = localizeTerm(
    key,
    ageCat?.label || (ageSlug === 'fiesta-revelacion-genero' ? 'Fiesta Revelación de Género' : ageSlug),
    targetCurrency
  );
  const subTranslated = localizeTerm(key, subLabel, targetCurrency);
  const year = '2026';

  if (key === 'es' || key === 'es-us') {
    const title = applyCurrencyDisplay(
      `Un Buen Regalo: ${subLabel} 【${year}】 Comparativa y Top 10`,
      targetCurrency
    );
    const h1 = applyCurrencyDisplay(
      `Regalo y Regalos de ${subLabel}: Top 10 y Comparativa ${year}`,
      targetCurrency
    );
    const description = applyCurrencyDisplay(
      `¿Buscas un buen regalo de ${subLabel}? Ranking y comparativa con los mejores regalos (${ageLabel}) verificados en Amazon con envío rápido.`,
      targetCurrency
    );
    return {
      title,
      socialTitle: `🏆 Top 10 ${subLabel} (${year}) | Un Buen Regalo`,
      description,
      h1,
      subtitle: description,
      tagline: ageMeta.tagline,
      keywords: [
        `regalo ${subLabel.toLowerCase()}`,
        `regalos ${subLabel.toLowerCase()}`,
        ageLabel.toLowerCase(),
        `top 10 ${subLabel.toLowerCase()} ${year}`,
      ],
      currency: targetCurrency,
      currencySymbol: targetSymbol,
    };
  }

  const title = applyCurrencyDisplay(
    ui.subcatTitleTemplate.replace('{sub}', subTranslated).replace('{year}', year),
    targetCurrency
  );
  const h1 = applyCurrencyDisplay(
    ui.subcatH1Template.replace('{sub}', subTranslated).replace('{year}', year),
    targetCurrency
  );
  const description = applyCurrencyDisplay(
    ui.subcatDescTemplate.replace('{sub}', subTranslated).replace('{age}', ageLabel),
    targetCurrency
  );

  return {
    title,
    socialTitle: `🏆 ${subTranslated} (${year}) | ${ui.brandName}`,
    description,
    h1,
    subtitle: description,
    tagline: ageLabel,
    keywords: [subTranslated, ageLabel, `${subTranslated} ${year}`, ui.brandName],
    currency: targetCurrency,
    currencySymbol: targetSymbol,
  };
}

const OCCASION_FILTER_LABELS: Record<string, Record<string, string>> = {
  'regalos-amigo-invisible': {
    en: 'Secret Santa Gifts (Under $15 & $20)',
    'en-gb': 'Secret Santa Gifts (Under €15 & €20)',
    fr: 'Cadeaux Secret Santa (Moins de 15 € et 20 €)',
    de: 'Wichtelgeschenke (Unter 15 € & 20 €)',
    it: 'Regali Amico Segreto (Sotto 15 € e 20 €)',
    pt: 'Presentes Amigo Secreto (Menos de 15 € e 20 €)',
    nl: 'Lootjes Trekken & Sinterklaas Cadeaus (<15 €)',
    pl: 'Prezenty na Mikołajki i Secret Santa (<20 €)',
  },
  'regalos-cumpleanos-originales': {
    en: 'Original Birthday Gifts',
    'en-gb': 'Original Birthday Gifts',
    fr: "Cadeaux d'Anniversaire Originaux",
    de: 'Originelle Geburtstagsgeschenke',
    it: 'Regali di Compleanno Originali',
    pt: 'Presentes de Aniversário Originais',
    nl: 'Originele Verjaardagscadeaus',
    pl: 'Oryginalne Prezenty Urodzinowe',
  },
  'regalos-primera-comunion': {
    en: 'First Communion Gifts for Boys & Girls',
    'en-gb': 'First Holy Communion Gifts',
    fr: 'Cadeaux de Première Communion',
    de: 'Geschenke zur Ersten Heiligen Kommunion',
    it: 'Regali Prima Comunione Bambino e Bambina',
    pt: 'Presentes de Primeira Comunhão',
    nl: 'Eerste Communie Cadeaus',
    pl: 'Prezenty na Pierwszą Komunię Świętą',
  },
  'regalos-san-valentin-y-aniversario': {
    en: "Valentine's Day & Anniversary Gifts for Couples",
    'en-gb': "Valentine's Day & Anniversary Gifts",
    fr: 'Cadeaux Saint-Valentin et Anniversaire de Couple',
    de: 'Valentinstag & Jahrestag Geschenke für Paare',
    it: 'Regali San Valentino e Anniversario di Coppia',
    pt: 'Presentes Dia dos Namorados e Aniversário',
    nl: 'Valentijnsdag & Jubileum Cadeaus',
    pl: 'Prezenty na Walentynki i Rocznicę',
  },
  'regalos-dia-del-padre': {
    en: "Father's Day Gifts for Dad",
    'en-gb': "Father's Day Gifts for Dad",
    fr: 'Cadeaux Fête des Pères pour Papa',
    de: 'Vatertagsgeschenke für Papa',
    it: 'Regali Festa del Papà',
    pt: 'Presentes Dia dos Pais para Pai',
    nl: 'Vaderdag Cadeaus voor Papa',
    pl: 'Prezenty na Dzień Ojca dla Taty',
  },
  'regalos-dia-de-la-madre': {
    en: "Mother's Day Gifts for Mom",
    'en-gb': "Mother's Day Gifts for Mum",
    fr: 'Cadeaux Fête des Mères pour Maman',
    de: 'Muttertagsgeschenke für Mama',
    it: 'Regali Festa della Mamma',
    pt: 'Presentes Dia das Mães para Mãe',
    nl: 'Moederdag Cadeaus voor Mama',
    pl: 'Prezenty na Dzień Matki dla Mamy',
  },
  'regalos-para-padres': {
    en: 'Gifts for Dad & Parents',
    'en-gb': 'Gifts for Dad & Parents',
    fr: 'Cadeaux pour Papa et Parents',
    de: 'Geschenke für Väter & Eltern',
    it: 'Regali per Papà e Genitori',
    pt: 'Presentes para Pais',
    nl: 'Cadeaus voor Vader & Ouders',
    pl: 'Prezenty dla Taty i Rodziców',
  },
  'regalos-para-madres': {
    en: 'Gifts for Mom',
    'en-gb': 'Gifts for Mum',
    fr: 'Cadeaux pour Maman',
    de: 'Geschenke für Mütter & Mama',
    it: 'Regali per la Mamma',
    pt: 'Presentes para Mães',
    nl: 'Cadeaus voor Moeder & Mama',
    pl: 'Prezenty dla Mamy',
  },
  'regalos-para-abuelos': {
    en: 'Gifts for Grandparents (Grandma & Grandpa)',
    'en-gb': 'Gifts for Grandparents (Grandad & Grandma)',
    fr: 'Cadeaux pour Grands-Parents (Papi et Mamie)',
    de: 'Geschenke für Großeltern (Oma & Opa)',
    it: 'Regali per i Nonni (Nonno e Nonna)',
    pt: 'Presentes para Avós (Avô e Avó)',
    nl: 'Cadeaus voor Grootouders (Opa & Oma)',
    pl: 'Prezenty dla Dziadków (Babci i Dziadka)',
  },
  'regalos-para-profesores': {
    en: 'Gifts for Teachers & Educators',
    'en-gb': 'End of Term Gifts for Teachers',
    fr: 'Cadeaux pour Professeurs, Maîtres et Maîtresses',
    de: 'Geschenke für Lehrer & Erzieher',
    it: 'Regali per Insegnanti e Maestre di Fine Anno',
    pt: 'Presentes para Professores e Educadores',
    nl: 'Cadeaus voor Meester en Juf',
    pl: 'Prezenty na Dzień Nauczyciela i Koniec Roku',
  },
};

export function getLocalizedFilterMeta(
  localeKey: string | null | undefined,
  filterSlug: string,
  currency?: Currency
): LocalizedMeta {
  const key = normalizeLocaleKey(localeKey);
  const { currency: defaultCur, currencySymbol } = getLocaleCurrency(key);
  const targetCurrency = currency || defaultCur;
  const targetSymbol = targetCurrency === 'USD' ? '$' : currencySymbol;
  const ui = getUiStrings(key);

  const routeMeta = SEO_FILTER_ROUTES[filterSlug];
  if (!routeMeta) {
    return {
      title: ui.brandName,
      socialTitle: ui.brandName,
      description: ui.footerTagline,
      h1: ui.brandName,
      subtitle: ui.footerTagline,
      tagline: ui.footerTagline,
      keywords: [ui.brandName],
      currency: targetCurrency,
      currencySymbol: targetSymbol,
    };
  }

  if (key === 'es' || key === 'es-us') {
    return {
      title: applyCurrencyDisplay(routeMeta.title, targetCurrency),
      socialTitle: applyCurrencyDisplay(`${routeMeta.icon} ${routeMeta.title}`, targetCurrency),
      description: applyCurrencyDisplay(routeMeta.description, targetCurrency),
      h1: applyCurrencyDisplay(routeMeta.h1, targetCurrency),
      subtitle: applyCurrencyDisplay(routeMeta.tagline, targetCurrency),
      tagline: applyCurrencyDisplay(routeMeta.tagline, targetCurrency),
      keywords: routeMeta.keywords.map((kw) => applyCurrencyDisplay(kw, targetCurrency)),
      currency: targetCurrency,
      currencySymbol: targetSymbol,
    };
  }

  const occasionOverride = OCCASION_FILTER_LABELS[filterSlug];
  const label = occasionOverride
    ? applyCurrencyDisplay(occasionOverride[key] || occasionOverride.en, targetCurrency)
    : localizeTerm(key, routeMeta.label, targetCurrency);
  const tagline = `${label} · ${ui.verifiedCatalogNote}`;
  const year = '2026';

  const title = applyCurrencyDisplay(
    ui.filterTitleTemplate.replace('{label}', label).replace('{year}', year),
    targetCurrency
  );
  const h1 = applyCurrencyDisplay(ui.filterH1Template.replace('{label}', label), targetCurrency);
  const description = applyCurrencyDisplay(
    ui.filterDescTemplate.replace('{label}', label).replace('{tagline}', tagline),
    targetCurrency
  );

  return {
    title,
    socialTitle: `${routeMeta.icon} ${label} | ${ui.brandName}`,
    description,
    h1,
    subtitle: description,
    tagline,
    keywords: [label, `${label} 2026`, ui.brandName],
    currency: targetCurrency,
    currencySymbol: targetSymbol,
  };
}

export function getLocalizedAgeFilterMeta(
  localeKey: string | null | undefined,
  ageSlug: string,
  filterSlug: string,
  currency?: Currency
): LocalizedMeta {
  const key = normalizeLocaleKey(localeKey);
  const { currency: defaultCur, currencySymbol } = getLocaleCurrency(key);
  const targetCurrency = currency || defaultCur;
  const targetSymbol = targetCurrency === 'USD' ? '$' : currencySymbol;
  const ui = getUiStrings(key);

  const routeMeta = SEO_FILTER_ROUTES[filterSlug];
  const ageRoute = SEO_AGE_ROUTES[ageSlug];
  if (!routeMeta || !ageRoute) {
    return getLocalizedFilterMeta(key, filterSlug, targetCurrency);
  }

  const ageCat = AGE_CATEGORIES.find((c) => c.id === ageRoute.ageId);
  const baseAgeLabel = ageRoute.specificYear
    ? `${ageRoute.specificYear} ${ageRoute.specificYear === 1 ? 'Año' : 'Años'}`
    : ageCat?.label ||
      (ageSlug === 'fiesta-revelacion-genero' ? 'Fiesta Revelación de Género' : ageSlug);

  const ageLabel = ageRoute.specificYear
    ? key === 'en' || key === 'en-gb'
      ? `${ageRoute.specificYear}-Year-Old`
      : `${localizeTerm(key, ageCat?.label || baseAgeLabel, targetCurrency)} (${ageRoute.specificYear})`
    : localizeTerm(key, baseAgeLabel, targetCurrency);
  const occasionOverride = OCCASION_FILTER_LABELS[filterSlug];
  const filterLabel = occasionOverride
    ? applyCurrencyDisplay(occasionOverride[key] || occasionOverride.en, targetCurrency)
    : localizeTerm(key, routeMeta.label, targetCurrency);
  const year = '2026';

  if (key === 'es' || key === 'es-us') {
    if (ageRoute.specificYear && (filterSlug === 'regalos-para-el' || filterSlug === 'regalos-para-ella')) {
      const yr = ageRoute.specificYear;
      const isBoy = filterSlug === 'regalos-para-el';
      const personWord =
        yr === 1
          ? isBoy
            ? 'Bebé Niño de 1 Año'
            : 'Bebé Niña de 1 Año'
          : yr >= 16
          ? isBoy
            ? `Chico Adolescente de ${yr} Años`
            : `Chica Adolescente de ${yr} Años`
          : isBoy
          ? `Niño de ${yr} Años`
          : `Niña de ${yr} Años`;
      const altWord = isBoy ? 'niño y chico' : 'niña y chica';
      const title = applyCurrencyDisplay(
        `Un Buen Regalo para ${personWord} 【${year}】 Top 10 Ideas y Juguetes`,
        targetCurrency
      );
      const h1 = applyCurrencyDisplay(
        `Regalo y Regalos para ${personWord}: Top Ideas y Comparativa (${year})`,
        targetCurrency
      );
      const description = applyCurrencyDisplay(
        `¿Qué regalar a un${isBoy ? '' : 'a'} ${personWord.toLowerCase()}? Ranking verificado en Amazon con los mejores regalos, juguetes y detalles originales para ${altWord} de ${yr} ${yr === 1 ? 'año' : 'años'}.`,
        targetCurrency
      );
      const tagline = applyCurrencyDisplay(
        `Selección verificada para ${personWord} · Valoración 4.5+ estrellas`,
        targetCurrency
      );
      return {
        title,
        socialTitle: `${routeMeta.icon} Regalos para ${personWord} | Un Buen Regalo`,
        description,
        h1,
        subtitle: description,
        tagline,
        keywords: [
          `regalo ${isBoy ? 'nino' : 'nina'} ${yr} ${yr === 1 ? 'ano' : 'anos'}`,
          `regalos para ${isBoy ? 'nino' : 'nina'} de ${yr} ${yr === 1 ? 'ano' : 'anos'}`,
          `que regalar a un${isBoy ? '' : 'a'} ${isBoy ? 'chico' : 'chica'} de ${yr} anos`,
          `un buen regalo ${isBoy ? 'nino' : 'nina'} ${yr} anos`,
        ],
        currency: targetCurrency,
        currencySymbol: targetSymbol,
      };
    }

    const title = applyCurrencyDisplay(
      `Un Buen Regalo: ${routeMeta.label} (${baseAgeLabel}) 【${year}】 Top Ideas`,
      targetCurrency
    );
    const h1 = applyCurrencyDisplay(
      `Regalo y Regalos de ${routeMeta.label} para ${baseAgeLabel}`,
      targetCurrency
    );
    const description = applyCurrencyDisplay(
      `${routeMeta.description} Selección específica para ${baseAgeLabel} verificada en Amazon.`,
      targetCurrency
    );
    const tagline = applyCurrencyDisplay(
      `${routeMeta.tagline} · ${baseAgeLabel}`,
      targetCurrency
    );
    return {
      title,
      socialTitle: `${routeMeta.icon} ${routeMeta.label} (${baseAgeLabel}) | Un Buen Regalo`,
      description,
      h1,
      subtitle: description,
      tagline,
      keywords: [
        ...routeMeta.keywords.map((kw) => applyCurrencyDisplay(`${kw} ${baseAgeLabel.toLowerCase()}`, targetCurrency)),
        applyCurrencyDisplay(`${routeMeta.label.toLowerCase()} ${baseAgeLabel.toLowerCase()}`, targetCurrency),
      ],
      currency: targetCurrency,
      currencySymbol: targetSymbol,
    };
  }

  if (
    ageRoute.specificYear &&
    (key === 'en' || key === 'en-gb') &&
    (filterSlug === 'regalos-para-el' || filterSlug === 'regalos-para-ella')
  ) {
    const yr = ageRoute.specificYear;
    const isBoy = filterSlug === 'regalos-para-el';
    const targetNoun =
      yr === 1
        ? isBoy
          ? '1-Year-Old Baby Boy'
          : '1-Year-Old Baby Girl'
        : yr >= 16
        ? isBoy
          ? `${yr}-Year-Old Teen Boy`
          : `${yr}-Year-Old Teen Girl`
        : isBoy
        ? `${yr}-Year-Old Boy`
        : `${yr}-Year-Old Girl`;
    const combinedLabel = `Gifts for ${targetNoun}`;
    const tagline = `${combinedLabel} · ${ui.verifiedCatalogNote}`;
    const title = `${combinedLabel} 【${year}】 Top 10 Toys & Gift Ideas | ${ui.brandName}`;
    const h1 = `Best ${combinedLabel} (${year}): Top-Rated Ideas & Comparison`;
    const description = `Looking for the best gift for a ${targetNoun.toLowerCase()}? Verified Amazon ranking with 4.5+ star toys, games, and original presents.`;
    return {
      title,
      socialTitle: `${routeMeta.icon} ${combinedLabel} | ${ui.brandName}`,
      description,
      h1,
      subtitle: description,
      tagline,
      keywords: [
        `gifts for ${yr} year old ${isBoy ? 'boy' : 'girl'}`,
        `best gift for ${yr} year old ${isBoy ? 'boy' : 'girl'}`,
        `${yr} year old ${isBoy ? 'boy' : 'girl'} birthday gift ideas`,
        ui.brandName,
      ],
      currency: targetCurrency,
      currencySymbol: targetSymbol,
    };
  }

  const combinedLabel = `${filterLabel} (${ageLabel})`;
  const tagline = `${combinedLabel} · ${ui.verifiedCatalogNote}`;
  const title = applyCurrencyDisplay(
    ui.subcatTitleTemplate.replace('{sub}', combinedLabel).replace('{year}', year),
    targetCurrency
  );
  const h1 = applyCurrencyDisplay(
    `${ui.filterH1Template.replace('{label}', filterLabel)} — ${ageLabel}`,
    targetCurrency
  );
  const description = applyCurrencyDisplay(
    ui.subcatDescTemplate.replace('{sub}', filterLabel).replace('{age}', ageLabel),
    targetCurrency
  );

  return {
    title,
    socialTitle: `${routeMeta.icon} ${combinedLabel} | ${ui.brandName}`,
    description,
    h1,
    subtitle: description,
    tagline,
    keywords: [filterLabel, ageLabel, `${filterLabel} ${ageLabel}`, `${combinedLabel} ${year}`, ui.brandName],
    currency: targetCurrency,
    currencySymbol: targetSymbol,
  };
}

export function getHubStrings(localeKey: string | null | undefined, hubSlug: string): HubCopy {
  const key = normalizeLocaleKey(localeKey);
  const pack = getLangPack(key);
  const targetCurrency = getLocaleCurrency(key).currency;
  const fallbackHub = pack.hubs[hubSlug] || EN_HUBS[hubSlug] || ES_HUBS[hubSlug];
  if (!fallbackHub) {
    return {
      title: pack.ui.brandName,
      socialTitle: pack.ui.brandName,
      description: pack.ui.footerTagline,
      eyebrow: pack.ui.badgeUpdated2026,
      h1: pack.ui.brandName,
      subtitle: pack.ui.footerTagline,
      breadcrumbLabel: pack.ui.navHome,
      keywords: [pack.ui.brandName],
    };
  }
  return {
    ...fallbackHub,
    title: applyCurrencyDisplay(fallbackHub.title, targetCurrency),
    socialTitle: applyCurrencyDisplay(fallbackHub.socialTitle, targetCurrency),
    description: applyCurrencyDisplay(fallbackHub.description, targetCurrency),
    h1: applyCurrencyDisplay(fallbackHub.h1, targetCurrency),
    subtitle: applyCurrencyDisplay(fallbackHub.subtitle, targetCurrency),
    breadcrumbLabel: applyCurrencyDisplay(fallbackHub.breadcrumbLabel, targetCurrency),
  };
}

export function getLocalizedStaticHubMeta(
  localeKey: string | null | undefined,
  hubSlug: string,
  currency?: Currency
): LocalizedMeta & HubCopy {
  const key = normalizeLocaleKey(localeKey);
  const { currency: defaultCur, currencySymbol } = getLocaleCurrency(key);
  const targetCurrency = currency || defaultCur;
  const targetSymbol = targetCurrency === 'USD' ? '$' : currencySymbol;
  const hub = getHubStrings(key, hubSlug);

  return {
    ...hub,
    title: applyCurrencyDisplay(hub.title, targetCurrency),
    socialTitle: applyCurrencyDisplay(hub.socialTitle, targetCurrency),
    description: applyCurrencyDisplay(hub.description, targetCurrency),
    h1: applyCurrencyDisplay(hub.h1, targetCurrency),
    subtitle: applyCurrencyDisplay(hub.subtitle, targetCurrency),
    breadcrumbLabel: applyCurrencyDisplay(hub.breadcrumbLabel, targetCurrency),
    tagline: applyCurrencyDisplay(hub.subtitle, targetCurrency),
    currency: targetCurrency,
    currencySymbol: targetSymbol,
  };
}

export function getLocalizedPassionHubFilterMeta(
  localeKey: string | null | undefined,
  hubSlug: string,
  filterLabelEs: string,
  filterIcon: string = '🎯',
  currency?: Currency
): LocalizedMeta {
  const key = normalizeLocaleKey(localeKey);
  const { currency: defaultCur, currencySymbol } = getLocaleCurrency(key);
  const targetCurrency = currency || defaultCur;
  const targetSymbol = targetCurrency === 'USD' ? '$' : currencySymbol;
  const ui = getUiStrings(key);

  const hub = getHubStrings(key, hubSlug);
  const filterTranslated = localizeTerm(key, filterLabelEs, targetCurrency);
  const hubLabel = applyCurrencyDisplay(hub.breadcrumbLabel, targetCurrency);
  const year = '2026';

  if (key === 'es' || key === 'es-us') {
    const cleanFilter = applyCurrencyDisplay(filterLabelEs, targetCurrency);
    const title = applyCurrencyDisplay(
      `Un Buen Regalo: ${cleanFilter} (${hubLabel}) 【${year}】 Top Ideas`,
      targetCurrency
    );
    const h1 = applyCurrencyDisplay(
      `Regalo y Regalos de ${cleanFilter} — ${hubLabel}`,
      targetCurrency
    );
    const description = applyCurrencyDisplay(
      `Selección verificada de ${cleanFilter} dentro de nuestra guía especializada de ${hubLabel}. Valoraciones 4.5+ estrellas y envío rápido en Amazon.`,
      targetCurrency
    );
    return {
      title,
      socialTitle: `${filterIcon} ${cleanFilter} (${hubLabel}) | Un Buen Regalo`,
      description,
      h1,
      subtitle: description,
      tagline: `${cleanFilter} · ${hubLabel}`,
      keywords: [
        `regalo ${cleanFilter.toLowerCase()}`,
        `regalos ${cleanFilter.toLowerCase()}`,
        hubLabel.toLowerCase(),
        `${cleanFilter.toLowerCase()} ${year}`,
      ],
      currency: targetCurrency,
      currencySymbol: targetSymbol,
    };
  }

  const combinedLabel = `${filterTranslated} (${hubLabel})`;
  const title = applyCurrencyDisplay(
    ui.subcatTitleTemplate.replace('{sub}', combinedLabel).replace('{year}', year),
    targetCurrency
  );
  const h1 = applyCurrencyDisplay(
    `${ui.filterH1Template.replace('{label}', filterTranslated)} — ${hubLabel}`,
    targetCurrency
  );
  const description = applyCurrencyDisplay(
    ui.subcatDescTemplate.replace('{sub}', filterTranslated).replace('{age}', hubLabel),
    targetCurrency
  );

  return {
    title,
    socialTitle: `${filterIcon} ${combinedLabel} | ${ui.brandName}`,
    description,
    h1,
    subtitle: description,
    tagline: combinedLabel,
    keywords: [filterTranslated, hubLabel, `${filterTranslated} ${hubLabel}`, `${combinedLabel} ${year}`, ui.brandName],
    currency: targetCurrency,
    currencySymbol: targetSymbol,
  };
}

export function getLocalizedFaqs(
  localeKey: string | null | undefined,
  hubOrTopicSlug?: string,
  currency?: Currency
): I18nFaqItem[] {
  const key = normalizeLocaleKey(localeKey);
  const targetCurrency = currency || getLocaleCurrency(key).currency;

  if (hubOrTopicSlug && ALL_STATIC_HUB_SLUGS.includes(hubOrTopicSlug)) {
    const hub = getHubStrings(key, hubOrTopicSlug);
    if (hub.faqs && hub.faqs.length > 0) {
      return hub.faqs.map((f) => ({
        question: applyCurrencyDisplay(f.question, targetCurrency),
        answer: applyCurrencyDisplay(f.answer, targetCurrency),
      }));
    }
  }

  if (key === 'es' || key === 'es-us') {
    const currSym = targetCurrency === 'USD' ? '$ USD' : '€';
    const isUs = targetCurrency === 'USD';
    return [
      {
        question: '¿Cómo elegimos los mejores regalos de cada ranking?',
        answer: `Analizamos únicamente productos verificados en Amazon con valoración media igual o superior a 4.4 estrellas, envío rápido Prime y excelente relación calidad-precio en ${currSym}.`,
      },
      {
        question: '¿Puedo votar el regalo en grupo por WhatsApp sin registrarme?',
        answer:
          'Sí, añade de 2 a 6 opciones con el botón de votación, genera un enlace único en un clic y compártelo en tu grupo de WhatsApp para que amigos o familia elijan al instante.',
      },
      {
        question: '¿Los precios y la disponibilidad se actualizan en tiempo real?',
        answer: isUs
          ? 'Mostramos precios orientativos en $ USD y conectamos en vivo con Amazon (.com y tiendas internacionales) para consultar ofertas y stock al momento.'
          : 'Mostramos precios orientativos en € EUR (con cambio rápido a $ USD) y enlace en directo con Amazon España e Internacional.',
      },
    ];
  }

  const routeCfg = I18N_SEO_ROUTES[key];
  if (routeCfg?.faqItems && routeCfg.faqItems.length > 0) {
    return routeCfg.faqItems.map((item) => ({
      question: applyCurrencyDisplay(item.question, targetCurrency),
      answer: applyCurrencyDisplay(item.answer, targetCurrency),
    }));
  }

  return I18N_SEO_ROUTES.en.faqItems;
}
