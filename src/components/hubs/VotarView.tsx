'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SeoFaq from '@/components/SeoFaq';
import { Product } from '@/data/products';
import { findProductById } from '@/data/allCatalogProducts';
import { getAmazonProductUrl } from '@/lib/amazon';
import { useVoting } from '@/context/VotingContext';
import { useActiveLocale } from '@/hooks/useActiveLocale';
import { getLocalizedStaticHubMeta } from '@/lib/i18nContent';
import { getHubLabels } from '@/lib/hubLabels';
import { trackShareEvent } from '@/lib/analytics';
import {
  ThumbsUp,
  Check,
  ExternalLink,
  Share2,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  Trash2,
  Trophy,
  Copy,
  Vote,
} from 'lucide-react';

interface HubViewProps {
  omitSchema?: boolean;
}

function VotingContent() {
  const {
    localeKey,
    localePath,
    ui,
    activeCurrency,
    amazonRegion,
    amazonSiteName,
    formatPrice,
    tTerm,
  } = useActiveLocale();

  const {
    voteItems,
    recipientName,
    setRecipientName,
    removeItem,
    clearList,
    generateShareUrl,
  } = useVoting();

  const labels = getHubLabels(localeKey, activeCurrency);
  const niche = labels.votar;
  const hubMeta = getLocalizedStaticHubMeta(localeKey, 'votar', activeCurrency);

  const [idsParam, setIdsParam] = useState('');
  const [paraParam, setParaParam] = useState('');

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    setIdsParam(sp.get('ids') || '');
    setParaParam(sp.get('para') || '');
  }, []);

  const matchedProducts = useMemo(() => {
    if (!idsParam) return [];
    const idList = idsParam
      .split(',')
      .map((id) => id.trim())
      .filter(Boolean);
    return idList
      .map((id) => findProductById(id))
      .filter((p): p is Product => Boolean(p));
  }, [idsParam]);

  const pollKey = `poll_vote_${idsParam}`;
  const [userVotedId, setUserVotedId] = useState<string | null>(null);
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (matchedProducts.length === 0) return;
    try {
      const savedUserVote = localStorage.getItem(pollKey);
      if (savedUserVote) setUserVotedId(savedUserVote);

      const savedVotesCount = localStorage.getItem(`${pollKey}_counts`);
      if (savedVotesCount) {
        setVotes(JSON.parse(savedVotesCount));
      } else {
        const initial: Record<string, number> = {};
        matchedProducts.forEach((p, idx) => {
          initial[p.id] = idx === 0 ? 3 : idx === 1 ? 2 : 1;
        });
        setVotes(initial);
      }
    } catch {
      // ignore storage failure
    }
  }, [matchedProducts, pollKey]);

  const handleVote = (productId: string) => {
    const newVotes = { ...votes };
    if (userVotedId && userVotedId !== productId) {
      newVotes[userVotedId] = Math.max(0, (newVotes[userVotedId] || 1) - 1);
    }
    newVotes[productId] = (newVotes[productId] || 0) + 1;
    setVotes(newVotes);
    setUserVotedId(productId);
    try {
      localStorage.setItem(pollKey, productId);
      localStorage.setItem(`${pollKey}_counts`, JSON.stringify(newVotes));
    } catch {
      // ignore storage failure
    }
  };

  const totalVotes = Object.values(votes).reduce((sum, c) => sum + c, 0);
  const maxVotes = Math.max(0, ...Object.values(votes));

  const recipientDisplay =
    paraParam.trim() || recipientName.trim() || hubMeta.breadcrumbLabel;

  const activeShareUrl =
    matchedProducts.length > 0
      ? typeof window !== 'undefined'
        ? window.location.href
        : ''
      : generateShareUrl();

  const handleShareWhatsApp = () => {
    if (typeof window === 'undefined') return;
    const url = matchedProducts.length > 0 ? window.location.href : generateShareUrl();
    const message = niche.whatsappInviteTemplate
      .replace('{recipient}', recipientDisplay)
      .replace('{url}', url);
    trackShareEvent('WhatsApp', 'voting_group', {
      recipient: recipientDisplay,
      source_page: matchedProducts.length > 0 ? 'voting_results' : 'voting_creator',
    });
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCopy = () => {
    if (typeof window === 'undefined' || !navigator.clipboard) return;
    const url = matchedProducts.length > 0 ? window.location.href : generateShareUrl();
    navigator.clipboard.writeText(url);
    setCopied(true);
    trackShareEvent('Copy Link', 'voting_group', {
      recipient: recipientDisplay,
      source_page: matchedProducts.length > 0 ? 'voting_results' : 'voting_creator',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  // Mode 1: Active poll view (?ids=...)
  if (matchedProducts.length > 0) {
    return (
      <div className="max-w-5xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4 bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs">
            <Vote className="w-3.5 h-3.5 text-amber-800" aria-hidden="true" />
            <span>{niche.modeVoterBadge}</span>
            <span className="text-amber-600" aria-hidden="true">•</span>
            <span>
              {totalVotes} {niche.totalVotesLabel}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-3">
            {niche.titlePrefixFor}{' '}
            <span className="text-indigo-700">{recipientDisplay}</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">{hubMeta.subtitle}</p>
        </div>

        {/* Candidates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-12 items-stretch">
          {matchedProducts.map((product) => {
            const directUrl = getAmazonProductUrl(
              product.asin,
              product.searchQuery || product.title,
              amazonRegion
            );
            const productVotes = votes[product.id] || 0;
            const percentage = totalVotes > 0 ? Math.round((productVotes / totalVotes) * 100) : 0;
            const isVoted = userVotedId === product.id;
            const isLeader = maxVotes > 0 && productVotes === maxVotes;

            return (
              <div
                key={product.id}
                className={`flex flex-col justify-between p-4 rounded-3xl bg-white border-2 transition-all relative ${
                  isVoted
                    ? 'border-emerald-700 shadow-xl ring-4 ring-emerald-100'
                    : isLeader
                    ? 'border-amber-400 shadow-lg'
                    : 'border-slate-300 hover:border-slate-400 shadow-md'
                }`}
              >
                {isVoted ? (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-700 text-white font-black text-[11px] px-3 py-0.5 rounded-full shadow-md flex items-center gap-1 uppercase tracking-wider z-20 whitespace-nowrap">
                    <Check className="w-3 h-3" aria-hidden="true" />
                    <span>{niche.votedBtn}</span>
                  </div>
                ) : isLeader ? (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 font-black text-[11px] px-3 py-0.5 rounded-full shadow-md flex items-center gap-1 uppercase tracking-wider z-20 whitespace-nowrap">
                    <Trophy className="w-3 h-3" aria-hidden="true" />
                    <span>{niche.leaderBadge}</span>
                  </div>
                ) : null}

                <div>
                  <div className="relative aspect-square w-full mb-3 bg-slate-50 rounded-2xl overflow-hidden p-2 flex items-center justify-center border border-slate-100">
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-contain p-2"
                      unoptimized={product.imageUrl.startsWith('http')}
                    />
                    <span className="absolute bottom-2 right-2 text-[10px] font-bold bg-slate-900/90 text-white px-2 py-0.5 rounded-md flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" aria-hidden="true" />
                      Prime · {amazonSiteName}
                    </span>
                  </div>

                  <span className="text-[11px] text-slate-600 font-medium truncate block mb-1">
                    {tTerm(product.subcategory || product.category)}
                  </span>

                  <h2 className="font-bold text-sm text-slate-900 line-clamp-2 leading-snug mb-2 min-h-[2.5rem]">
                    {product.title}
                  </h2>

                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-xl font-black text-slate-950">
                      {formatPrice(product.priceText)}
                    </span>
                    <span className="text-xs text-amber-800 font-bold">★ {product.rating}</span>
                  </div>
                </div>

                <div>
                  <div className="mb-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>
                        {productVotes} {niche.votesWord}
                      </span>
                      <span className="text-slate-900">{percentage}%</span>
                    </div>
                    <div
                      role="progressbar"
                      aria-valuenow={percentage}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${product.title}: ${percentage}%`}
                      className="w-full h-2 bg-slate-200 rounded-full overflow-hidden"
                    >
                      <div
                        className={`h-full transition-all duration-500 rounded-full ${
                          isVoted ? 'bg-emerald-700' : 'bg-amber-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => handleVote(product.id)}
                      className={`w-full py-2.5 px-3 rounded-full font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                        isVoted
                          ? 'bg-emerald-700 text-white ring-2 ring-emerald-300'
                          : 'bg-slate-900 hover:bg-slate-800 text-white hover:scale-102 active:scale-98'
                      }`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${isVoted ? 'fill-white' : ''}`} aria-hidden="true" />
                      <span>{isVoted ? niche.votedBtn : niche.voteBtn}</span>
                      <span className="sr-only"> — {product.title}</span>
                    </button>

                    <a
                      href={directUrl}
                      target="_blank"
                      rel="nofollow sponsored noopener noreferrer"
                      className="w-full py-2 px-3 rounded-full text-xs font-semibold text-slate-950 bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f0b800] border border-[#fcd200] shadow-2xs text-center flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <span>{niche.buyBtn}</span>
                      <span className="sr-only"> — {product.title}</span>
                      <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Share Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-amber-500/10 to-orange-500/10 border-2 border-emerald-600/30 text-center max-w-2xl mx-auto mb-12 shadow-sm">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 mb-2">
            {niche.shareWhatsAppBtn}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mb-5">{hubMeta.subtitle}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4" aria-hidden="true" />
              <span>{niche.shareWhatsAppBtn}</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
                  <span className="text-emerald-800">{niche.copiedBtn}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-700" aria-hidden="true" />
                  <span>{niche.copyLinkBtn}</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="text-center pt-4">
          <Link
            href={localePath('/#catalogo-productos')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-900 hover:underline py-1"
          >
            <span>{niche.createYourOwnBtn}</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    );
  }

  // Mode 2: Creator / Empty overview
  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-4 bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs">
          <span>🗳️ {niche.modeCreatorBadge}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
          {hubMeta.h1}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">{hubMeta.subtitle}</p>
      </div>

      {/* User's current draft shortlist from VotingContext */}
      {voteItems.length > 0 ? (
        <div className="bg-white rounded-3xl border-2 border-emerald-600/30 p-6 sm:p-8 shadow-md mb-10 space-y-6">
          <div>
            <label
              htmlFor="voting-recipient-input"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
            >
              {niche.titlePrefixFor}
            </label>
            <input
              id="voting-recipient-input"
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder={niche.recipientPlaceholder}
              className="w-full px-4 py-3 rounded-2xl border border-slate-300 bg-slate-50 text-sm text-slate-900 focus:border-emerald-700 focus:bg-white outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {voteItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      sizes="48px"
                      className="object-contain p-1"
                      unoptimized={item.imageUrl.startsWith('http')}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{item.title}</p>
                    <p className="text-xs font-black text-emerald-800">{formatPrice(item.priceText)}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  aria-label={`${ui.removeFromVote} — ${item.title}`}
                  className="min-w-8 min-h-8 p-1.5 rounded-lg text-slate-600 hover:text-rose-700 hover:bg-rose-50 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>

          {voteItems.length < 2 && (
            <p className="text-xs font-medium text-amber-900 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5">
              {niche.pickMinHint}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex flex-wrap items-center gap-3">
              {voteItems.length >= 2 && (
                <>
                  <button
                    type="button"
                    onClick={handleShareWhatsApp}
                    className="px-5 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-md cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" aria-hidden="true" />
                    <span>{niche.shareWhatsAppBtn}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCopy}
                    disabled={!activeShareUrl}
                    className="px-4 py-3 rounded-2xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-slate-700" aria-hidden="true" />
                    )}
                    <span>{copied ? niche.copiedBtn : niche.copyLinkBtn}</span>
                  </button>
                </>
              )}
              <Link
                href={localePath('/#catalogo-productos')}
                className="px-4 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5"
              >
                <span>{niche.addFromCatalogBtn}</span>
              </Link>
            </div>

            <button
              type="button"
              onClick={clearList}
              className="text-xs font-bold text-slate-600 hover:text-rose-700 underline cursor-pointer"
            >
              {niche.clearPollBtn}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center shadow-xs mb-10">
          <h2 className="text-xl font-black text-slate-900 mb-2">{niche.emptyTitle}</h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto mb-6">{niche.emptyDesc}</p>
          <Link
            href={localePath('/#catalogo-productos')}
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm shadow-md transition-all"
          >
            <span>{niche.emptyCta}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      )}
    </div>
  );
}

export default function VotarView({ omitSchema = false }: HubViewProps) {
  const { localeKey, localePath, ui, activeCurrency, isRtl } = useActiveLocale();
  const labels = getHubLabels(localeKey, activeCurrency);
  const niche = labels.votar;
  const hubMeta = getLocalizedStaticHubMeta(localeKey, 'votar', activeCurrency);

  const pageUrl = `https://www.unbuenregalo.es${localePath('/votar')}`;
  const homeUrl =
    localeKey === 'es'
      ? 'https://www.unbuenregalo.es'
      : `https://www.unbuenregalo.es${localePath('/')}`;

  const webAppSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: hubMeta.h1,
      url: pageUrl,
      applicationCategory: 'LifestyleApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: activeCurrency,
      },
      description: hubMeta.description,
    }),
    [hubMeta.h1, hubMeta.description, pageUrl, activeCurrency]
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
          name: hubMeta.breadcrumbLabel,
          item: pageUrl,
        },
      ],
    }),
    [ui.breadcrumbHome, homeUrl, hubMeta.breadcrumbLabel, pageUrl]
  );

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="min-h-screen bg-[#f8fafc] flex flex-col">
      {!omitSchema && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
          />
        </>
      )}

      <Header currentTheme="classic" />

      <nav
        aria-label="Breadcrumb"
        className="max-w-5xl mx-auto px-4 sm:px-6 pt-4 w-full text-xs text-slate-600 flex items-center gap-1.5"
      >
        <Link href={localePath('/')} className="hover:text-indigo-700 font-medium py-1">
          {ui.breadcrumbHome}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
        <span className="font-bold text-slate-900">{hubMeta.breadcrumbLabel}</span>
      </nav>

      <main className="flex-1">
        <VotingContent />

        {/* Editorial Guide & FAQs */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-8 space-y-8">
          <section className="rounded-3xl p-6 sm:p-10 border border-slate-200 bg-white text-slate-800 shadow-xs">
            <h2 className="text-2xl sm:text-3xl font-black mb-5 tracking-tight text-slate-900">
              {niche.guideTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm leading-relaxed text-slate-600">
              {niche.guideCards.map((card, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                    {card.icon && <span aria-hidden="true">{card.icon}</span>}
                    <span>{card.title}</span>
                  </h3>
                  <p>{card.body}</p>
                </div>
              ))}
            </div>
          </section>

          <SeoFaq
            localeKey={localeKey}
            hubSlug="votar"
            customFaqs={niche.faqs}
            omitSchema={omitSchema}
          />
        </div>
      </main>

      <Footer currentTheme="classic" />
    </div>
  );
}
