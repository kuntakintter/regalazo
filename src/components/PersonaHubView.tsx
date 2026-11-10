'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import TopPodium from '@/components/TopPodium';
import SeoFaq from '@/components/SeoFaq';
import { ALL_SITE_PRODUCTS } from '@/data/allCatalogProducts';
import { Product } from '@/data/products';
import { parsePrice } from '@/lib/amazon';
import { matchesPriceFilter } from '@/lib/filterUtils';
import { useActiveLocale } from '@/hooks/useActiveLocale';
import { getLocalizedStaticHubMeta } from '@/lib/i18nContent';
import { getHubLabels, PersonaHubCopy } from '@/lib/hubLabels';
import { generateProductItemListSchema } from '@/lib/schemaProduct';
import { isAdultOrTeenProduct, matchesPersonaCategoryTab } from '@/lib/personaFilter';
import {
  ChevronRight,
  Compass,
  Heart,
  ShieldCheck,
  Sparkles,
  Tag,
  TrendingUp,
  ArrowUpDown,
} from 'lucide-react';

export type PersonaKey = 'hombre' | 'mujer' | 'novio' | 'novia' | 'under20' | 'tienenDeTodo';
export type PersonaHubSlug =
  | 'que-regalar-a-un-hombre'
  | 'que-regalar-a-una-mujer'
  | 'que-regalar-a-mi-novio'
  | 'que-regalar-a-mi-novia'
  | 'regalos-menos-20-euros'
  | 'regalos-para-los-que-tienen-de-todo';

type ThemeAccent = 'indigo' | 'rose' | 'emerald' | 'purple';

interface PersonaHubViewProps {
  hubSlug: PersonaHubSlug;
  personaKey: PersonaKey;
  themeAccent: ThemeAccent;
  parentBreadcrumbSlug?: 'que-regalar-a-un-hombre' | 'que-regalar-a-una-mujer';
  omitSchema?: boolean;
}

const ACCENT_STYLES: Record<
  ThemeAccent,
  {
    heroSection: string;
    heroGlow: string;
    badgePill: string;
    heroGradientText: string;
    countPill: string;
    activeTab: string;
    compassIcon: string;
    cardTint: string;
  }
> = {
  indigo: {
    heroSection:
      'bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 border-indigo-900/50',
    heroGlow: 'bg-indigo-500/15',
    badgePill: 'bg-indigo-500/20 text-indigo-200 border-indigo-400/30',
    heroGradientText:
      'bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-orange-200 to-amber-100',
    countPill: 'text-indigo-900 bg-indigo-50 border-indigo-200',
    activeTab: 'bg-indigo-700 text-white shadow-xs',
    compassIcon: 'text-indigo-600',
    cardTint: 'bg-indigo-50/60 border-indigo-100',
  },
  rose: {
    heroSection:
      'bg-gradient-to-r from-slate-950 via-rose-950/75 to-purple-950 border-rose-900/40',
    heroGlow: 'bg-rose-500/15',
    badgePill: 'bg-rose-500/20 text-rose-200 border-rose-400/30',
    heroGradientText:
      'bg-clip-text text-transparent bg-gradient-to-r from-rose-200 via-pink-100 to-amber-200',
    countPill: 'text-rose-900 bg-rose-50 border-rose-200',
    activeTab: 'bg-rose-700 text-white shadow-xs',
    compassIcon: 'text-rose-600',
    cardTint: 'bg-rose-50/60 border-rose-100',
  },
  emerald: {
    heroSection:
      'bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 border-emerald-800/40',
    heroGlow: 'bg-emerald-500/15',
    badgePill: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30',
    heroGradientText:
      'bg-clip-text text-transparent bg-gradient-to-r from-emerald-200 via-teal-100 to-amber-200',
    countPill: 'text-emerald-900 bg-emerald-50 border-emerald-200',
    activeTab: 'bg-emerald-700 text-white shadow-xs',
    compassIcon: 'text-emerald-700',
    cardTint: 'bg-emerald-50/60 border-emerald-100',
  },
  purple: {
    heroSection:
      'bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-900 border-purple-800/40',
    heroGlow: 'bg-purple-500/15',
    badgePill: 'bg-purple-500/20 text-purple-200 border-purple-400/30',
    heroGradientText:
      'bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-fuchsia-100 to-amber-200',
    countPill: 'text-purple-900 bg-purple-50 border-purple-200',
    activeTab: 'bg-purple-700 text-white shadow-xs',
    compassIcon: 'text-purple-700',
    cardTint: 'bg-purple-50/60 border-purple-100',
  },
};

const RELATED_HUB_LINKS: Record<
  PersonaHubSlug,
  Array<{ slug: string; emoji: string; badgeClass: string }>
> = {
  'que-regalar-a-un-hombre': [
    {
      slug: 'que-regalar-a-mi-novio',
      emoji: '💙',
      badgeClass: 'bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border-indigo-200',
    },
    {
      slug: 'regalos-menos-20-euros',
      emoji: '🏷️',
      badgeClass: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200',
    },
    {
      slug: 'regalos-para-los-que-tienen-de-todo',
      emoji: '✨',
      badgeClass: 'bg-purple-50 hover:bg-purple-100 text-purple-800 border-purple-200',
    },
    {
      slug: 'que-regalar-a-una-mujer',
      emoji: '👩',
      badgeClass: 'bg-rose-50 hover:bg-rose-100 text-rose-800 border-rose-200',
    },
  ],
  'que-regalar-a-una-mujer': [
    {
      slug: 'que-regalar-a-mi-novia',
      emoji: '❤️',
      badgeClass: 'bg-rose-50 hover:bg-rose-100 text-rose-800 border-rose-200',
    },
    {
      slug: 'regalos-menos-20-euros',
      emoji: '🏷️',
      badgeClass: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200',
    },
    {
      slug: 'regalos-para-los-que-tienen-de-todo',
      emoji: '✨',
      badgeClass: 'bg-purple-50 hover:bg-purple-100 text-purple-800 border-purple-200',
    },
    {
      slug: 'que-regalar-a-un-hombre',
      emoji: '👨',
      badgeClass: 'bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border-indigo-200',
    },
  ],
  'que-regalar-a-mi-novio': [
    {
      slug: 'que-regalar-a-un-hombre',
      emoji: '👨',
      badgeClass: 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200',
    },
    {
      slug: 'regalos-menos-20-euros',
      emoji: '🏷️',
      badgeClass: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200',
    },
    {
      slug: 'regalos-para-los-que-tienen-de-todo',
      emoji: '✨',
      badgeClass: 'bg-purple-50 hover:bg-purple-100 text-purple-800 border-purple-200',
    },
    {
      slug: 'que-regalar-a-mi-novia',
      emoji: '❤️',
      badgeClass: 'bg-rose-50 hover:bg-rose-100 text-rose-800 border-rose-200',
    },
  ],
  'que-regalar-a-mi-novia': [
    {
      slug: 'que-regalar-a-una-mujer',
      emoji: '👩',
      badgeClass: 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200',
    },
    {
      slug: 'regalos-menos-20-euros',
      emoji: '🏷️',
      badgeClass: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200',
    },
    {
      slug: 'regalos-para-los-que-tienen-de-todo',
      emoji: '✨',
      badgeClass: 'bg-purple-50 hover:bg-purple-100 text-purple-800 border-purple-200',
    },
    {
      slug: 'que-regalar-a-mi-novio',
      emoji: '💙',
      badgeClass: 'bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border-indigo-200',
    },
  ],
  'regalos-menos-20-euros': [
    {
      slug: 'que-regalar-a-un-hombre',
      emoji: '👨',
      badgeClass: 'bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border-indigo-200',
    },
    {
      slug: 'que-regalar-a-una-mujer',
      emoji: '👩',
      badgeClass: 'bg-rose-50 hover:bg-rose-100 text-rose-800 border-rose-200',
    },
    {
      slug: 'regalos-para-los-que-tienen-de-todo',
      emoji: '✨',
      badgeClass: 'bg-purple-50 hover:bg-purple-100 text-purple-800 border-purple-200',
    },
    {
      slug: 'gaming',
      emoji: '🎮',
      badgeClass: 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200',
    },
  ],
  'regalos-para-los-que-tienen-de-todo': [
    {
      slug: 'que-regalar-a-un-hombre',
      emoji: '👨',
      badgeClass: 'bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border-indigo-200',
    },
    {
      slug: 'que-regalar-a-una-mujer',
      emoji: '👩',
      badgeClass: 'bg-rose-50 hover:bg-rose-100 text-rose-800 border-rose-200',
    },
    {
      slug: 'regalos-menos-20-euros',
      emoji: '🏷️',
      badgeClass: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200',
    },
    {
      slug: 'amantes-del-cafe',
      emoji: '☕',
      badgeClass: 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-200',
    },
  ],
};

function buildPoolForPersona(personaKey: PersonaKey): Product[] {
  return ALL_SITE_PRODUCTS.filter((p) => {
    if (personaKey === 'hombre' || personaKey === 'novio') {
      if (p.gender === 'girl') return false;
      if (!isAdultOrTeenProduct(p)) return false;
      if (p.category === 'Halloween') return false;
      return true;
    }
    if (personaKey === 'mujer' || personaKey === 'novia') {
      if (p.gender === 'boy') return false;
      if (!isAdultOrTeenProduct(p)) return false;
      if (p.category === 'Halloween' || p.category === 'Motoristas' || p.category === 'Automóvil') {
        return false;
      }
      return true;
    }
    if (personaKey === 'under20') {
      const price = parsePrice(p.priceText);
      return price > 0 && price <= 20;
    }
    // tienenDeTodo
    if (!isAdultOrTeenProduct(p)) return false;
    if (p.category === 'Halloween') return false;
    const text = `${p.title} ${p.description || ''} ${p.category || ''} ${p.subcategory || ''}`.toLowerCase();
    return (
      text.includes('smartbox') ||
      text.includes('experiencia') ||
      text.includes('gadget') ||
      text.includes('barista') ||
      text.includes('cafeter') ||
      text.includes('dron') ||
      text.includes('drone') ||
      text.includes('led') ||
      text.includes('retro') ||
      text.includes('lego') ||
      text.includes('juego') ||
      text.includes('altavoz') ||
      text.includes('proyector') ||
      text.includes('termic') ||
      text.includes('térmic') ||
      text.includes('varia') ||
      text.includes('intercomunicador') ||
      text.includes('compresor') ||
      ((p.rating || 0) >= 4.7 && (p.reviewsCount || 0) > 1000)
    );
  });
}

export default function PersonaHubView({
  hubSlug,
  personaKey,
  themeAccent,
  parentBreadcrumbSlug,
  omitSchema = false,
}: PersonaHubViewProps) {
  const {
    localeKey,
    localePath,
    ui,
    activeCurrency,
    countryCode,
    amazonRegion,
    amazonSiteName,
    isRtl,
    tBudget,
  } = useActiveLocale();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPrice, setSelectedPrice] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [searchQuery, setSearchQuery] = useState('');

  const labels = getHubLabels(localeKey, activeCurrency);
  const personaLabels: PersonaHubCopy = labels[personaKey];
  const hubMeta = getLocalizedStaticHubMeta(localeKey, hubSlug, activeCurrency);
  const parentMeta = parentBreadcrumbSlug
    ? getLocalizedStaticHubMeta(localeKey, parentBreadcrumbSlug, activeCurrency)
    : null;
  const styles = ACCENT_STYLES[themeAccent];

  const poolProducts = useMemo(() => buildPoolForPersona(personaKey), [personaKey]);

  const filteredProducts = useMemo(() => {
    return poolProducts.filter((p) => {
      if (!matchesPersonaCategoryTab(p, selectedCategory)) {
        return false;
      }
      if (selectedPrice !== 'all' && !matchesPriceFilter(p.priceText, selectedPrice)) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const text = `${p.title} ${p.description || ''} ${p.searchQuery || ''} ${p.subcategory || ''}`.toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });
  }, [poolProducts, selectedCategory, selectedPrice, searchQuery]);

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'price-asc') {
      list.sort((a, b) => parsePrice(a.priceText) - parsePrice(b.priceText));
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => parsePrice(b.priceText) - parsePrice(a.priceText));
    } else if (sortBy === 'rating') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else {
      list.sort((a, b) => {
        if (personaKey === 'hombre' || personaKey === 'novio') {
          const aBoy = a.gender === 'boy' ? 1 : 0;
          const bBoy = b.gender === 'boy' ? 1 : 0;
          if (aBoy !== bBoy) return bBoy - aBoy;
        } else if (personaKey === 'mujer' || personaKey === 'novia') {
          const aGirl = a.gender === 'girl' ? 1 : 0;
          const bGirl = b.gender === 'girl' ? 1 : 0;
          if (aGirl !== bGirl) return bGirl - aGirl;
        }
        return (b.reviewsCount || 0) * (b.rating || 1) - (a.reviewsCount || 0) * (a.rating || 1);
      });
    }
    return list;
  }, [filteredProducts, sortBy, personaKey]);

  const itemListSchema = useMemo(
    () =>
      generateProductItemListSchema(sortedProducts, hubMeta.h1, {
        currency: activeCurrency,
        countryCode,
        region: amazonRegion,
        brandFallback: ui.brandName,
      }),
    [sortedProducts, hubMeta.h1, activeCurrency, countryCode, amazonRegion, ui.brandName]
  );

  const breadcrumbSchema = useMemo(() => {
    const homeUrl =
      localeKey === 'es'
        ? 'https://www.unbuenregalo.es'
        : `https://www.unbuenregalo.es${localePath('/')}`;
    const elements: Array<{ '@type': string; position: number; name: string; item: string }> = [
      {
        '@type': 'ListItem',
        position: 1,
        name: ui.breadcrumbHome,
        item: homeUrl,
      },
    ];
    if (parentBreadcrumbSlug && parentMeta) {
      elements.push({
        '@type': 'ListItem',
        position: 2,
        name: parentMeta.breadcrumbLabel,
        item: `https://www.unbuenregalo.es${localePath(`/${parentBreadcrumbSlug}`)}`,
      });
    }
    elements.push({
      '@type': 'ListItem',
      position: elements.length + 1,
      name: hubMeta.breadcrumbLabel,
      item: `https://www.unbuenregalo.es${localePath(`/${hubSlug}`)}`,
    });
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: elements,
    };
  }, [localeKey, localePath, ui.breadcrumbHome, parentBreadcrumbSlug, parentMeta, hubMeta.breadcrumbLabel, hubSlug]);

  const budgetOptions =
    personaKey === 'under20'
      ? [
          { value: 'all', label: labels.common.allPrices, activeClass: 'bg-slate-900 text-white', idleClass: 'bg-slate-100 text-slate-700 hover:bg-slate-200' },
          { value: '<15', label: `🟢 ${tBudget('<15')}`, activeClass: 'bg-emerald-700 text-white', idleClass: 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200' },
        ]
      : [
          { value: 'all', label: labels.common.allPrices, activeClass: 'bg-slate-900 text-white', idleClass: 'bg-slate-100 text-slate-700 hover:bg-slate-200' },
          { value: '<20', label: `🟢 ${tBudget('<20')}`, activeClass: 'bg-emerald-700 text-white', idleClass: 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200' },
          { value: '20-50', label: `🟡 ${tBudget('20-50')}`, activeClass: 'bg-amber-500 text-slate-950', idleClass: 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200' },
          { value: '50-100', label: `🟣 ${tBudget('50-100')}`, activeClass: 'bg-purple-700 text-white', idleClass: 'bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200' },
          { value: '>100', label: `💎 ${tBudget('>100')}`, activeClass: 'bg-indigo-700 text-white', idleClass: 'bg-indigo-50 text-indigo-800 hover:bg-indigo-100 border border-indigo-200' },
        ];

  const relatedLinks = RELATED_HUB_LINKS[hubSlug];
  const HeroIcon = personaKey === 'novio' || personaKey === 'novia' ? Heart : personaKey === 'under20' ? Tag : Sparkles;

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {!omitSchema && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
          />
        </>
      )}

      <Header
        currentTheme="classic"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-4 text-xs text-slate-600 flex flex-wrap items-center gap-1.5">
          <Link href={localePath('/')} className="hover:underline hover:text-slate-900">
            {ui.breadcrumbHome}
          </Link>
          {parentBreadcrumbSlug && parentMeta && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              <Link href={localePath(`/${parentBreadcrumbSlug}`)} className="hover:underline hover:text-slate-900">
                {parentMeta.breadcrumbLabel}
              </Link>
            </>
          )}
          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="font-bold text-slate-900">{hubMeta.breadcrumbLabel}</span>
        </nav>

        {/* HERO BANNER */}
        <section
          className={`${styles.heroSection} text-white rounded-3xl p-6 sm:p-10 mb-8 shadow-xl relative overflow-hidden border`}
        >
          <div className={`absolute top-0 right-0 w-80 h-80 ${styles.heroGlow} rounded-full blur-3xl pointer-events-none`} />

          <div className="max-w-3xl relative z-10 space-y-3">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold border ${styles.badgePill}`}>
              <HeroIcon className="w-3.5 h-3.5" />
              <span>{hubMeta.eyebrow}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
              {hubMeta.h1}
            </h1>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl">
              {hubMeta.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-200 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                {personaLabels.trustBadges[1]} · {amazonSiteName}
              </span>
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                {personaLabels.trustBadges[0]}
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-sky-300" />
                {personaLabels.trustBadges[2]}
              </span>
            </div>
          </div>
        </section>

        {/* TOP 3 PODIUM (localized natively, omitSchema=true since ItemList is emitted above) */}
        <div className="mb-8">
          <TopPodium
            products={poolProducts}
            filterLabel={personaLabels.podiumLabel}
            omitSchema={true}
          />
        </div>

        {/* RELATED CROSSLINKS */}
        <div className="mb-6 p-3.5 bg-white rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-bold text-slate-700 flex items-center gap-1.5">
            <Compass className={`w-4 h-4 ${styles.compassIcon}`} />
            {personaLabels.relatedTitle}:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {relatedLinks.map((item) => {
              const relatedMeta = getLocalizedStaticHubMeta(localeKey, item.slug, activeCurrency);
              return (
                <Link
                  key={item.slug}
                  href={localePath(`/${item.slug}`)}
                  className={`px-3 py-1.5 rounded-xl border font-bold transition-colors ${item.badgeClass}`}
                >
                  {item.emoji} {relatedMeta.breadcrumbLabel} →
                </Link>
              );
            })}
          </div>
        </div>

        {/* CONTROL BAR: CATEGORIES + BUDGET + SORT */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs mb-6 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>{hubMeta.breadcrumbLabel}</span>
                <span className={`text-xs font-bold border px-2.5 py-0.5 rounded-full ${styles.countPill}`}>
                  {sortedProducts.length} {labels.common.ideasUnit}
                </span>
              </h2>
              <p className="text-[11px] text-slate-600">
                {personaLabels.budgetLabel} · {amazonSiteName}
              </p>
            </div>

            {/* Sorting */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-600" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc' | 'rating')}
                aria-label={labels.common.sortLabel}
                className="text-xs font-bold text-slate-800 bg-transparent focus:outline-hidden cursor-pointer"
              >
                <option value="featured">{labels.common.sortFeatured}</option>
                <option value="price-asc">{labels.common.sortPriceAsc}</option>
                <option value="price-desc">{labels.common.sortPriceDesc}</option>
                <option value="rating">{labels.common.sortRating}</option>
              </select>
            </div>
          </div>

          {/* Budget Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs pb-1">
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider shrink-0 mr-1">
              {labels.common.priceRangeLabel}:
            </span>
            {budgetOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setSelectedPrice(opt.value)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedPrice === opt.value ? opt.activeClass : opt.idleClass
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs pt-2 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider shrink-0 mr-1">
              {labels.common.styleLabel}:
            </span>
            {personaLabels.categoryTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
                  selectedCategory === tab.id
                    ? styles.activeTab
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCTS GRID */}
        {sortedProducts.length > 0 ? (
          <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-2.5 lg:gap-3 mb-12">
            {sortedProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                currentTheme="classic"
                rankBadge={sortBy === 'featured' ? (idx === 0 ? 1 : idx === 1 ? 2 : idx === 2 ? 3 : undefined) : undefined}
              />
            ))}
          </section>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 mb-12">
            <p className="text-slate-700 text-sm font-semibold mb-2">{labels.common.noLocalTitle}</p>
            <p className="text-slate-600 text-xs mb-4">{labels.common.noLocalDesc}</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedPrice('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {labels.common.resetFilters}
            </button>
          </div>
        )}

        {/* EDITORIAL BUYING GUIDE */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 mb-10 border border-slate-200 shadow-xs space-y-6">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-600">
              {labels.common.editorialGuideEyebrow}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
              {personaLabels.guideTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs sm:text-sm text-slate-700 leading-relaxed">
            {personaLabels.guideCards.map((card, idx) => (
              <div key={idx} className={`p-4 rounded-2xl border space-y-1.5 ${styles.cardTint}`}>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                  {card.icon && <span>{card.icon}</span>}
                  <span>{card.title}</span>
                </h3>
                <p className="text-xs leading-relaxed text-slate-700">{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ SECTION */}
        <SeoFaq
          localeKey={localeKey}
          hubSlug={hubSlug}
          customFaqs={personaLabels.faqs}
          omitSchema={omitSchema}
        />
      </main>

      <Footer currentTheme="classic" />
    </div>
  );
}
