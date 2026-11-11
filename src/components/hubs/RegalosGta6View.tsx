'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  GTA_PRODUCTS,
  GTA_CATEGORIES,
  GTA_PRICE_RANGES,
  GtaProduct,
} from '@/data/gtaData';
import { Product } from '@/data/products';
import { getAmazonProductUrl } from '@/lib/amazon';
import { useVoting } from '@/context/VotingContext';
import { useActiveLocale } from '@/hooks/useActiveLocale';
import { getLocalizedStaticHubMeta } from '@/lib/i18nContent';
import { getHubLabels } from '@/lib/hubLabels';
import { generateProductItemListSchema } from '@/lib/schemaProduct';
import {
  Gamepad2,
  Flame,
  Star,
  Heart,
  Share2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  ShoppingBag,
  HelpCircle,
  ChevronRight,
  Zap,
} from 'lucide-react';

interface HubViewProps {
  omitSchema?: boolean;
  initialCategory?: string;
}

export default function RegalosGta6View({
  omitSchema = false,
  initialCategory = 'all',
}: HubViewProps) {
  const {
    localeKey,
    localePath,
    ui,
    langCode,
    activeCurrency,
    countryCode,
    amazonRegion,
    amazonSiteName,
    formatPrice,
    isRtl,
    tTerm,
  } = useActiveLocale();

  const { toggleItem, isItemInList } = useVoting();
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedPrice, setSelectedPrice] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const labels = getHubLabels(localeKey, activeCurrency);
  const niche = labels.gta;
  const hubMeta = getLocalizedStaticHubMeta(localeKey, 'regalos-gta-6', activeCurrency);
  const gamingMeta = getLocalizedStaticHubMeta(localeKey, 'gaming', activeCurrency);

  const filteredProducts = useMemo(() => {
    return GTA_PRODUCTS.filter((prod) => {
      if (selectedCategory !== 'all' && prod.category !== selectedCategory) return false;
      if (selectedPrice !== 'all') {
        if (selectedPrice === '<20' && prod.priceNumeric >= 20) return false;
        if (selectedPrice === '20-50' && (prod.priceNumeric < 20 || prod.priceNumeric > 50)) return false;
        if (selectedPrice === '50-100' && (prod.priceNumeric < 50 || prod.priceNumeric > 100)) return false;
        if (selectedPrice === '>100' && prod.priceNumeric <= 100) return false;
      }
      return true;
    });
  }, [selectedCategory, selectedPrice]);

  const toSiteProduct = (prod: GtaProduct): Product => ({
    id: prod.id,
    asin: prod.asin,
    title: prod.title,
    slug: prod.id,
    category: 'Gaming',
    subcategory: prod.categoryLabel,
    ageRange: '+18',
    gender: 'unisex',
    priceText: prod.priceText,
    priceRange:
      prod.priceNumeric < 20
        ? '<20'
        : prod.priceNumeric <= 50
        ? '20-50'
        : prod.priceNumeric <= 100
        ? '50-100'
        : '>100',
    description: prod.description,
    imageUrl: prod.imageUrl,
    rating: prod.rating,
    reviewsCount: prod.reviewsCount,
    badge: prod.badge,
    searchQuery: prod.searchQuery,
    pros: prod.pros,
    idealFor: prod.idealFor,
    style: 'gamer',
  });

  const schemaProducts: Product[] = useMemo(
    () => GTA_PRODUCTS.map(toSiteProduct),
    []
  );

  const pageUrl = `https://www.unbuenregalo.es${localePath('/regalos-gta-6')}`;
  const gamingUrl = `https://www.unbuenregalo.es${localePath('/gaming')}`;
  const homeUrl =
    localeKey === 'es'
      ? 'https://www.unbuenregalo.es'
      : `https://www.unbuenregalo.es${localePath('/')}`;

  const collectionSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: hubMeta.h1,
      alternateName: ['GTA VI', 'GTA 6', 'Grand Theft Auto VI', 'Grand Theft Auto 6'],
      description: hubMeta.description,
      url: pageUrl,
      inLanguage: langCode,
    }),
    [hubMeta.h1, hubMeta.description, pageUrl, langCode]
  );

  const breadcrumbSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: ui.breadcrumbHome,
          item: homeUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: gamingMeta.breadcrumbLabel,
          item: gamingUrl,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: hubMeta.breadcrumbLabel,
          item: pageUrl,
        },
      ],
    }),
    [
      ui.breadcrumbHome,
      homeUrl,
      gamingMeta.breadcrumbLabel,
      gamingUrl,
      hubMeta.breadcrumbLabel,
      pageUrl,
    ]
  );

  const itemListSchema = useMemo(
    () =>
      generateProductItemListSchema(schemaProducts, hubMeta.h1, {
        currency: activeCurrency,
        countryCode,
        region: amazonRegion,
        brandFallback: ui.brandName,
      }),
    [schemaProducts, hubMeta.h1, activeCurrency, countryCode, amazonRegion, ui.brandName]
  );

  const faqList = niche.faqs || [];
  const faqSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqList.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    }),
    [faqList]
  );

  const handleShare = async (e: React.MouseEvent, prod: GtaProduct) => {
    e.preventDefault();
    e.stopPropagation();
    const url = getAmazonProductUrl(prod.asin, prod.searchQuery || prod.title, amazonRegion);
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `${prod.title} | ${hubMeta.breadcrumbLabel}`,
          text: prod.description,
          url,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedId(prod.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#0a0c16] text-slate-100 selection:bg-[#ff2a85] selection:text-white flex flex-col"
    >
      {!omitSchema && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
          />
          {faqList.length > 0 && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
          )}
        </>
      )}

      <Header currentTheme="gamer" />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-14 border-b border-purple-900/40 bg-gradient-to-b from-[#131127] via-[#0f0e22] to-[#0a0c16]">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 bg-[#ff2a85]/15 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#00f0ff]/15 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-2 text-xs text-slate-300"
          >
            <Link href={localePath('/')} className="hover:text-pink-300 transition-colors py-1">
              {ui.breadcrumbHome}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
            <Link href={localePath('/gaming')} className="hover:text-pink-300 transition-colors py-1">
              {gamingMeta.breadcrumbLabel}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
            <span className="text-pink-300 font-semibold">{hubMeta.breadcrumbLabel}</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 border border-pink-500/40 text-pink-200 font-black text-xs tracking-wider uppercase mb-5 shadow-[0_0_20px_rgba(255,42,133,0.25)]">
            <span aria-hidden="true">🌴</span>
            <span>{hubMeta.eyebrow}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" aria-hidden="true" />
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
            {hubMeta.h1}
          </h1>

          <p className="max-w-3xl text-sm sm:text-base text-slate-200 leading-relaxed mb-8">
            {hubMeta.subtitle}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl pt-2">
            <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center gap-2.5">
              <ShoppingBag className="w-4 h-4 text-pink-400 shrink-0" aria-hidden="true" />
              <span className="text-xs text-slate-200 font-semibold">{ui.amazonPrimeFast}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" aria-hidden="true" />
              <span className="text-xs text-slate-200 font-semibold">
                {labels.common.officialWarranty}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center gap-2.5">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
              <span className="text-xs text-slate-200 font-semibold">{ui.searchLivePrices}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center gap-2.5">
              <Gamepad2 className="w-4 h-4 text-purple-400 shrink-0" aria-hidden="true" />
              <span className="text-xs text-slate-200 font-semibold">{amazonSiteName}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        {/* Category Filters */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-pink-300">
              {niche.filterQuestion}
            </h2>
            <span className="text-xs text-slate-300">
              {filteredProducts.length} {labels.common.ideasUnit} · {amazonSiteName}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {GTA_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-pink-600 to-purple-700 text-white shadow-[0_0_15px_rgba(255,42,133,0.4)] border border-pink-400'
                      : 'bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span aria-hidden="true">{cat.icon}</span>
                  <span>{tTerm(cat.label)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Price Filters */}
        <div className="mb-10 flex flex-wrap items-center gap-2 pb-6 border-b border-slate-800">
          <span className="text-xs text-slate-300 font-medium mr-2">
            {labels.common.priceRangeLabel}:
          </span>
          {GTA_PRICE_RANGES.map((pr) => {
            const isActive = selectedPrice === pr.id;
            return (
              <button
                key={pr.id}
                type="button"
                onClick={() => setSelectedPrice(pr.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/50'
                    : 'bg-slate-900/60 text-slate-300 hover:text-slate-100 border border-slate-800/80'
                }`}
              >
                {pr.id === 'all' ? labels.common.allPrices : tTerm(pr.label)}
              </button>
            );
          })}
        </div>

        {/* Grid de Productos */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
            <p className="text-slate-300 text-sm mb-4">{labels.common.noLocalTitle}</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedPrice('all');
              }}
              className="px-4 py-2 rounded-xl bg-pink-500/20 text-pink-200 font-bold text-xs border border-pink-500/30 hover:bg-pink-500/30 transition-colors cursor-pointer"
            >
              {labels.common.resetFilters}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => {
              const amazonUrl = getAmazonProductUrl(
                prod.asin,
                prod.searchQuery || prod.title,
                amazonRegion
              );
              const isInVote = isItemInList(prod.id);

              return (
                <GtaProductCard
                  key={prod.id}
                  prod={prod}
                  categoryLabel={tTerm(prod.categoryLabel)}
                  amazonUrl={amazonUrl}
                  isInVote={isInVote}
                  isCopied={copiedId === prod.id}
                  onToggleVote={() => toggleItem(toSiteProduct(prod))}
                  onShare={(e) => handleShare(e, prod)}
                  formatPrice={formatPrice}
                  viewLabel={labels.common.viewOnAmazon}
                  copiedLabel={ui.shareBtnCopied}
                  addToVoteLabel={ui.addToVote}
                  removeVoteLabel={ui.removeFromVote}
                  priceSubLabel={amazonSiteName}
                />
              );
            })}
          </div>
        )}

        {/* EDITORIAL BUYING GUIDE */}
        <section className="mt-16 rounded-3xl p-6 sm:p-10 border border-slate-800 bg-slate-900/70 text-slate-200">
          <h2 className="text-2xl sm:text-3xl font-black mb-6 tracking-tight text-white flex items-center gap-2.5">
            <span aria-hidden="true">🌴</span>
            <span>{niche.guideTitle}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm leading-relaxed text-slate-300">
            {niche.guideCards.map((card, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="font-bold text-base text-pink-300 flex items-center gap-2">
                  {card.icon && <span aria-hidden="true">{card.icon}</span>}
                  <span>{card.title}</span>
                </h3>
                <p>{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs SECTION */}
        {faqList.length > 0 && (
          <section className="mt-14 pt-10 border-t border-slate-800">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <span className="text-xs font-black uppercase tracking-wider text-pink-300 mb-2 block">
                  {ui.faqEyebrow}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">{ui.faqTitle}</h2>
              </div>

              <div className="space-y-4">
                {faqList.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800"
                  >
                    <h3 className="text-base font-bold text-pink-300 flex items-center gap-2.5 mb-2">
                      <HelpCircle className="w-4 h-4 text-pink-400 shrink-0" aria-hidden="true" />
                      <span>{faq.question}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed pl-6">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer currentTheme="gamer" />
    </div>
  );
}

function GtaProductCard({
  prod,
  categoryLabel,
  amazonUrl,
  isInVote,
  isCopied,
  onToggleVote,
  onShare,
  formatPrice,
  viewLabel,
  copiedLabel,
  addToVoteLabel,
  removeVoteLabel,
  priceSubLabel,
}: {
  prod: GtaProduct;
  categoryLabel: string;
  amazonUrl: string;
  isInVote: boolean;
  isCopied: boolean;
  onToggleVote: () => void;
  onShare: (e: React.MouseEvent) => void;
  formatPrice: (p: string) => string;
  viewLabel: string;
  copiedLabel: string;
  addToVoteLabel: string;
  removeVoteLabel: string;
  priceSubLabel: string;
}) {
  const [hasImgError, setHasImgError] = useState(false);

  return (
    <div className="group rounded-2xl bg-[#111322] border border-slate-800/80 hover:border-pink-500/50 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,42,133,0.15)] hover:-translate-y-1">
      {/* Image and badges */}
      <div className="relative aspect-square w-full bg-slate-900/90 overflow-hidden p-3 flex items-center justify-center">
        <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full bg-slate-950/95 border border-pink-500/50 text-pink-300 text-[10px] font-black tracking-wide shadow-md flex items-center gap-1 backdrop-blur-xs select-none">
          <Flame className="w-3 h-3 text-pink-400" aria-hidden="true" />
          <span>{prod.badge}</span>
        </div>

        <div className="absolute top-3 right-3 z-20 flex flex-col gap-1.5">
          <button
            type="button"
            onClick={onToggleVote}
            aria-label={isInVote ? `${removeVoteLabel}: ${prod.title}` : `${addToVoteLabel}: ${prod.title}`}
            className={`min-w-8 min-h-8 p-2 rounded-xl flex items-center justify-center transition-all shadow-md cursor-pointer ${
              isInVote
                ? 'bg-pink-600 text-white shadow-pink-500/30'
                : 'bg-slate-950/90 text-slate-200 hover:text-white hover:bg-slate-900 border border-slate-700/60'
            }`}
            title={isInVote ? removeVoteLabel : addToVoteLabel}
          >
            <Heart className={`w-3.5 h-3.5 ${isInVote ? 'fill-white' : ''}`} aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={onShare}
            aria-label={`Share ${prod.title}`}
            className="min-w-8 min-h-8 p-2 rounded-xl bg-slate-950/90 text-slate-200 hover:text-white hover:bg-slate-900 border border-slate-700/60 flex items-center justify-center transition-all shadow-md cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>

        {isCopied && (
          <div className="absolute inset-x-0 bottom-3 mx-auto w-max px-3 py-1 rounded-lg bg-pink-600 text-white text-[11px] font-bold z-30 shadow-lg">
            {copiedLabel}
          </div>
        )}

        <a
          href={amazonUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          aria-label={`${prod.title} — ${viewLabel}`}
          className="relative w-full h-full block cursor-pointer"
        >
          {!hasImgError ? (
            <Image
              src={prod.imageUrl}
              alt={prod.title}
              fill
              unoptimized={prod.imageUrl.startsWith('http')}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              onError={() => setHasImgError(true)}
              className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-pink-950/40 via-purple-950/30 to-slate-950 rounded-xl">
              <Gamepad2 className="w-10 h-10 text-pink-400 mb-2 opacity-80" aria-hidden="true" />
              <span className="text-xs font-bold text-slate-200 line-clamp-2">{prod.title}</span>
              <span className="text-[10px] text-pink-300 mt-1">{viewLabel} →</span>
            </div>
          )}
        </a>
      </div>

      {/* Card body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
              {categoryLabel}
            </span>
            <div className="flex items-center gap-1 text-amber-300 font-bold text-xs">
              <Star className="w-3 h-3 fill-amber-300" aria-hidden="true" />
              <span>{prod.rating}</span>
              <span className="text-slate-300 text-[10px]">
                ({prod.reviewsCount > 1000 ? `${(prod.reviewsCount / 1000).toFixed(1)}k` : prod.reviewsCount})
              </span>
            </div>
          </div>

          <h3 className="font-bold text-sm text-slate-100 group-hover:text-pink-300 transition-colors line-clamp-2 mb-2 leading-snug">
            <a href={amazonUrl} target="_blank" rel="noopener noreferrer sponsored">
              {prod.title}
            </a>
          </h3>

          <p className="text-xs text-slate-300 line-clamp-2 mb-3 leading-relaxed">
            {prod.description}
          </p>

          <ul className="space-y-1 mb-4">
            {prod.pros.slice(0, 2).map((pro, idx) => (
              <li key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-200">
                <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span className="line-clamp-1">{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-slate-300 block">{priceSubLabel}</span>
            <span className="text-lg font-black text-white">{formatPrice(prod.priceText)}</span>
          </div>

          <a
            href={amazonUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-pink-600 via-purple-700 to-cyan-700 hover:from-pink-700 hover:to-cyan-800 text-white font-black text-xs text-center flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer group/btn"
          >
            <span>{viewLabel}</span>
            <span className="sr-only"> — {prod.title}</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
