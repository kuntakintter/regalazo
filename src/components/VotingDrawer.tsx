'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useVoting } from '@/context/VotingContext';
import { trackShareEvent, trackAffiliateClick } from '@/lib/analytics';
import { useActiveLocale } from '@/hooks/useActiveLocale';
import { findProductById } from '@/data/allCatalogProducts';
import { buildAmazonRemoteCartUrl, getAmazonProductUrl } from '@/lib/amazon';
import {
  X,
  Copy,
  Check,
  ArrowRight,
  Trash2,
  ShoppingBag,
  ExternalLink,
  Heart,
  MessageCircle,
  Trophy,
  Sparkles,
  Vote,
} from 'lucide-react';

export default function VotingDrawer() {
  const {
    voteItems,
    recipientName,
    setRecipientName,
    removeItem,
    clearList,
    isDrawerOpen,
    setIsDrawerOpen,
    generateShareUrl,
  } = useVoting();
  const { localeKey, ui, formatPrice, isRtl, amazonRegion, amazonTag, amazonSiteName } = useActiveLocale();
  const [copied, setCopied] = useState(false);

  if (!isDrawerOpen) return null;

  const isEs = localeKey === 'es' || localeKey === 'es-us';
  const shareUrl = generateShareUrl();
  const displayName = recipientName.trim() || ui.brandName;

  const handleOpenAmazonCart = () => {
    const asins = voteItems.map(
      (item) => item.asin || findProductById(item.id)?.asin
    );
    const fallbackTitles = voteItems.map((item) => item.searchQuery || item.title);
    const cartUrl = buildAmazonRemoteCartUrl(asins, amazonTag, fallbackTitles, amazonRegion);
    trackAffiliateClick({
      productId: `wishlist-multi-${voteItems.length}`,
      productTitle: `Wishlist Multi-Cart (${voteItems.length} items)`,
      category: 'wishlist_drawer',
      priceText: '',
      destinationUrl: cartUrl,
      placement: 'voting_drawer_multi_cart',
    });
    window.open(cartUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyLink = () => {
    if (!shareUrl) return;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    trackShareEvent('Copy Link', 'voting_group', {
      recipient: displayName,
      product_count: voteItems.length,
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    if (!shareUrl) return;
    const text = isEs
      ? `🗳️ ¡Ayúdame a elegir el regalo para ${displayName}!\nHe preseleccionado estos ${voteItems.length} regalos finalistas.\nVota tu favorito aquí 👇\n${shareUrl}`
      : `🗳️ ${ui.votingDrawerTitle} — ${displayName} (${voteItems.length})\n${shareUrl}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    trackShareEvent('WhatsApp', 'voting_group', {
      recipient: displayName,
      product_count: voteItems.length,
    });
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Drawer Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={ui.votingDrawerTitle}
        className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center shadow-md shrink-0"
              aria-hidden="true"
            >
              <Vote className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <h2 className="font-black text-white text-base sm:text-lg leading-tight truncate">
                {ui.votingDrawerTitle}
              </h2>
              <p className="text-xs font-semibold text-amber-300 line-clamp-1">
                {voteItems.length} {ui.floatingBarCandidates}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsDrawerOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label={ui.navClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {isEs ? (
            <div className="p-3 sm:p-3.5 bg-gradient-to-br from-slate-50 via-white to-amber-50/60 border-2 border-slate-200/90 rounded-2xl shadow-sm">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wide mb-2.5">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-amber-500 text-slate-950 shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />
                </span>
                <span>¿Cómo funciona? En 3 pasos:</span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-center">
                {/* 1. Elige */}
                <div className="p-2 sm:p-2.5 bg-gradient-to-br from-rose-500 via-rose-600 to-pink-600 text-white rounded-2xl border-2 border-rose-400/80 shadow-md hover:shadow-lg transition-all flex flex-col items-center justify-between min-w-0">
                  <div
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white text-rose-600 flex items-center justify-center mb-1.5 shadow-sm ring-2 ring-white/60 shrink-0"
                    aria-hidden="true"
                  >
                    <Heart className="w-4.5 h-4.5 fill-rose-600 stroke-[2.5]" />
                  </div>
                  <strong className="text-xs sm:text-[13px] font-black text-white leading-tight whitespace-nowrap tracking-tight block drop-shadow-xs">
                    1. Elige
                  </strong>
                  <span className="text-[10px] sm:text-[11px] font-bold text-rose-100 leading-tight mt-1">
                    De 2 a 6 regalos
                  </span>
                </div>

                {/* 2. Comparte */}
                <div className="p-2 sm:p-2.5 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 text-white rounded-2xl border-2 border-emerald-400/80 shadow-md hover:shadow-lg transition-all flex flex-col items-center justify-between min-w-0">
                  <div
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white text-emerald-700 flex items-center justify-center mb-1.5 shadow-sm ring-2 ring-white/60 shrink-0"
                    aria-hidden="true"
                  >
                    <MessageCircle className="w-4.5 h-4.5 fill-emerald-700 stroke-[2.5]" />
                  </div>
                  <strong className="text-xs sm:text-[13px] font-black text-white leading-tight whitespace-nowrap tracking-tight block drop-shadow-xs">
                    2. Comparte
                  </strong>
                  <span className="text-[10px] sm:text-[11px] font-bold text-emerald-100 leading-tight mt-1">
                    Por WhatsApp
                  </span>
                </div>

                {/* 3. ¡Votan! */}
                <div className="p-2 sm:p-2.5 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 text-white rounded-2xl border-2 border-indigo-400/80 shadow-md hover:shadow-lg transition-all flex flex-col items-center justify-between min-w-0">
                  <div
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white text-indigo-700 flex items-center justify-center mb-1.5 shadow-sm ring-2 ring-white/60 shrink-0"
                    aria-hidden="true"
                  >
                    <Trophy className="w-4.5 h-4.5 stroke-[2.5]" />
                  </div>
                  <strong className="text-xs sm:text-[13px] font-black text-white leading-tight whitespace-nowrap tracking-tight block drop-shadow-xs">
                    3. ¡Votan!
                  </strong>
                  <span className="text-[10px] sm:text-[11px] font-bold text-indigo-100 leading-tight mt-1">
                    Eligen en 1 clic
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-3.5 sm:p-4 bg-gradient-to-br from-slate-50 via-white to-amber-50/60 border-2 border-slate-200/90 rounded-2xl shadow-sm">
              <p className="text-xs sm:text-sm font-black text-slate-900 mb-1">
                {ui.votingDrawerSubtitle}
              </p>
              <p className="text-xs font-medium text-slate-700 leading-relaxed">
                {ui.onboardingBody}
              </p>
            </div>
          )}

          {/* Recipient Name Input */}
          <div>
            <label htmlFor="recipient-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {ui.votingRecipientLabel}
            </label>
            <input
              id="recipient-name"
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder={ui.votingRecipientPlaceholder}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm text-slate-900 placeholder-slate-500 outline-none transition-all"
            />
          </div>

          {/* Selected Products List */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                {voteItems.length} {ui.floatingBarCandidates}
              </span>
              {voteItems.length > 0 && (
                <button
                  type="button"
                  onClick={clearList}
                  className="text-[11px] text-rose-700 hover:text-rose-800 font-bold hover:underline cursor-pointer"
                >
                  {ui.votingClearBtn}
                </button>
              )}
            </div>

            {voteItems.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <span className="text-3xl block mb-2" aria-hidden="true">🎁</span>
                <p className="text-sm font-bold text-slate-800 mb-1">
                  {ui.votingDrawerEmpty}
                </p>
                <p className="text-xs text-slate-600 mb-4">
                  {ui.votingDrawerEmptyHint}
                </p>
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  {ui.navAllIdeas}
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {voteItems.map((item, idx) => {
                  const resolvedAsin =
                    item.asin || findProductById(item.id)?.asin;
                  const itemAmazonUrl = getAmazonProductUrl(
                    resolvedAsin,
                    item.searchQuery || item.title,
                    amazonRegion
                  );
                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 shadow-2xs transition-all relative group"
                    >
                      <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 font-black text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <a
                        href={itemAmazonUrl}
                        target="_blank"
                        rel="nofollow sponsored noopener noreferrer"
                        className="relative w-14 h-14 bg-slate-50 rounded-lg overflow-hidden shrink-0 border border-slate-100 p-1 flex items-center justify-center"
                      >
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          sizes="56px"
                          className="object-contain p-1"
                          unoptimized={item.imageUrl.startsWith('http')}
                        />
                      </a>
                      <div className="flex-1 min-w-0 pr-1">
                        <a
                          href={itemAmazonUrl}
                          target="_blank"
                          rel="nofollow sponsored noopener noreferrer"
                          className="text-xs font-bold text-slate-900 hover:text-amber-700 line-clamp-1 leading-tight block"
                        >
                          {item.title}
                        </a>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-black text-slate-950">
                            {formatPrice(item.priceText)}
                          </span>
                          <a
                            href={itemAmazonUrl}
                            target="_blank"
                            rel="nofollow sponsored noopener noreferrer"
                            className="text-[10px] text-[#007185] hover:underline font-bold inline-flex items-center gap-0.5"
                          >
                            <span>✓ {amazonSiteName}</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="min-w-7 min-h-7 flex items-center justify-center p-1.5 rounded-lg text-slate-600 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer shrink-0"
                        title={ui.removeFromVote}
                        aria-label={`${ui.removeFromVote}: ${item.title}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        {voteItems.length >= 1 ? (
          <div className="p-3.5 sm:p-4 border-t-2 border-slate-200 bg-gradient-to-b from-slate-50 to-slate-100/90 space-y-2.5">
            {voteItems.length >= 2 ? (
              <>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={handleShareWhatsApp}
                    className="py-3 px-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer border border-emerald-800/20 active:scale-95"
                  >
                    <MessageCircle className="w-4.5 h-4.5 shrink-0 stroke-[2.5]" />
                    <span className="truncate">
                      {isEs ? 'Enviar por WhatsApp' : ui.votingWhatsAppBtn}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleOpenAmazonCart}
                    className="py-3 px-3 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer border border-amber-600/40 active:scale-95"
                  >
                    <ShoppingBag className="w-4.5 h-4.5 shrink-0 stroke-[2.5]" />
                    <span className="truncate">
                      {isEs ? 'Añadir a lista Amazon' : `Add to ${amazonSiteName} List`}
                    </span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="py-2.5 px-3 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-300 text-slate-900 font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs active:scale-95"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4.5 h-4.5 text-emerald-600 shrink-0 stroke-[2.5]" />
                        <span className="text-emerald-700 truncate">{ui.votingCopiedBtn}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4.5 h-4.5 text-slate-700 shrink-0 stroke-[2.2]" />
                        <span className="truncate">{ui.votingCopyBtn}</span>
                      </>
                    )}
                  </button>

                  <a
                    href={shareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95"
                    title={ui.votingOpenPollBtn}
                  >
                    <span className="truncate">{ui.votingOpenPollBtn}</span>
                    <ArrowRight className={`w-4.5 h-4.5 shrink-0 stroke-[2.5] ${isRtl ? 'rotate-180' : ''}`} />
                  </a>
                </div>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleOpenAmazonCart}
                  className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-black text-xs sm:text-[13px] flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer border border-amber-600/40"
                >
                  <ShoppingBag className="w-4 h-4 shrink-0 stroke-[2.5]" />
                  <span>
                    {isEs
                      ? `Añadir a la lista de ${amazonSiteName}`
                      : `Add to ${amazonSiteName} List`}
                  </span>
                </button>
                <p className="text-xs font-bold text-amber-900 text-center pt-0.5">
                  💡 {ui.votingDrawerEmptyHint}
                </p>
              </>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
