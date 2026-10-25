'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS, Product } from '@/data/products';
import { getAmazonProductUrl } from '@/lib/amazon';
import { useCurrency } from '@/context/CurrencyContext';
import { ThumbsUp, Check, ExternalLink, Share2, ShieldCheck, Trophy, ArrowRight, Heart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function VotingContent() {
  const searchParams = useSearchParams();
  const { formatPrice } = useCurrency();

  const idsParam = searchParams.get('ids') || '';
  const paraParam = searchParams.get('para') || '';

  const recipientDisplay = paraParam.trim() ? paraParam.trim() : 'nuestro regalo';

  // Find products matching the IDs
  const matchedProducts = useMemo(() => {
    if (!idsParam) return [];
    const idList = idsParam.split(',').map((id) => id.trim()).filter(Boolean);
    return idList
      .map((id) => PRODUCTS.find((p) => p.id === id))
      .filter((p): p is Product => Boolean(p));
  }, [idsParam]);

  // Votes state
  const pollKey = `poll_vote_${idsParam}`;
  const [userVotedId, setUserVotedId] = useState<string | null>(null);
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [copied, setCopied] = useState(false);

  // Initialize votes from localStorage or seed with realistic distribution
  useEffect(() => {
    if (matchedProducts.length === 0) return;

    try {
      const savedUserVote = localStorage.getItem(pollKey);
      if (savedUserVote) {
        setUserVotedId(savedUserVote);
      }

      const savedVotesCount = localStorage.getItem(`${pollKey}_counts`);
      if (savedVotesCount) {
        setVotes(JSON.parse(savedVotesCount));
      } else {
        // Seed initial friendly counts so it looks like a real group poll
        const initial: Record<string, number> = {};
        matchedProducts.forEach((p, idx) => {
          // slight variation for natural feel
          initial[p.id] = (idx === 0 ? 3 : idx === 1 ? 2 : 1);
        });
        setVotes(initial);
      }
    } catch {
      // ignore
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
      // ignore
    }
  };

  const totalVotes = Object.values(votes).reduce((sum, count) => sum + count, 0);

  const handleShareWhatsApp = () => {
    if (typeof window === 'undefined') return;
    const url = window.location.href;
    const text = `🗳️ ¡Vota el regalo para ${recipientDisplay}! Entra aquí y elige tu opción favorita: ${url}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCopy = () => {
    if (typeof window === 'undefined') return;
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (matchedProducts.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center">
        <span className="text-5xl block mb-4">🗳️</span>
        <h1 className="text-2xl font-black text-slate-900 mb-2">
          Votación de Regalos en Grupo
        </h1>
        <p className="text-sm text-slate-600 mb-6">
          Esta encuesta no contiene productos válidos o el enlace está incompleto. Puedes explorar nuestro catálogo y crear tu propia votación en 1 minuto.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm shadow-md transition-all cursor-pointer"
        >
          <span>Ir a la página principal</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
      {/* Hero Header */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4 bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs">
          <span>🗳️ Encuesta de Grupo Oficial</span>
          <span className="text-amber-500">•</span>
          <span>{matchedProducts.length} Finalistas</span>
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-3">
          ¿Qué regalo elegimos para{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-indigo-600">
            {recipientDisplay}?
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
          Vota por tu favorito para ayudar al grupo a decidir. Cuando elijamos el ganador, cualquiera puede comprarlo directamente en Amazon.
        </p>
      </div>

      {/* Voting Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-12 items-stretch">
        {matchedProducts.map((product) => {
          const directUrl = getAmazonProductUrl(product.asin, product.searchQuery || product.title);
          const productVotes = votes[product.id] || 0;
          const percentage = totalVotes > 0 ? Math.round((productVotes / totalVotes) * 100) : 0;
          const isVoted = userVotedId === product.id;

          return (
            <div
              key={product.id}
              className={`flex flex-col justify-between p-4 rounded-3xl bg-white border-2 transition-all relative ${
                isVoted
                  ? 'border-emerald-500 shadow-xl shadow-emerald-500/10 ring-4 ring-emerald-100'
                  : 'border-slate-300 hover:border-slate-400 shadow-md hover:shadow-lg'
              }`}
            >
              {/* Voted Badge */}
              {isVoted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white font-black text-[11px] px-3 py-0.5 rounded-full shadow-md flex items-center gap-1 uppercase tracking-wider z-20">
                  <Check className="w-3 h-3" />
                  <span>Tu Elección</span>
                </div>
              )}

              <div>
                {/* Photo */}
                <div className="relative aspect-square w-full mb-3 bg-slate-50 rounded-2xl overflow-hidden p-2 flex items-center justify-center border border-slate-100">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-contain p-2"
                    unoptimized={product.imageUrl.startsWith('http')}
                  />
                  <span className="absolute bottom-2 right-2 text-[10px] font-bold bg-slate-900/85 text-white px-2 py-0.5 rounded-md backdrop-blur-xs flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    Prime
                  </span>
                </div>

                {/* Subcategory */}
                <span className="text-[11px] text-slate-500 font-medium truncate block mb-1">
                  {product.subcategory || product.category}
                </span>

                {/* Title */}
                <h3 className="font-bold text-sm text-slate-900 line-clamp-2 leading-snug mb-2 min-h-[2.5rem]">
                  {product.title}
                </h3>

                {/* Price */}
                <div className="flex items-baseline justify-between mb-3">
                  <span className="text-xl font-black text-slate-950">
                    {formatPrice(product.priceText)}
                  </span>
                  <span className="text-xs text-amber-500 font-bold">
                    ★ {product.rating}
                  </span>
                </div>
              </div>

              <div>
                {/* Voting Bar & Stats */}
                <div className="mb-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>{productVotes} {productVotes === 1 ? 'voto' : 'votos'}</span>
                    <span className="text-slate-900">{percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        isVoted ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>

                {/* Action Buttons: Vote Button & Amazon Button */}
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => handleVote(product.id)}
                    className={`w-full py-2.5 px-3 rounded-full font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                      isVoted
                        ? 'bg-emerald-600 text-white shadow-emerald-500/25 ring-2 ring-emerald-300'
                        : 'bg-slate-900 hover:bg-slate-800 text-white hover:scale-102 active:scale-98'
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${isVoted ? 'fill-white' : ''}`} />
                    <span>{isVoted ? '¡Has votado por este!' : 'Votar por este regalo'}</span>
                  </button>

                  <a
                    href={directUrl}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className="w-full py-2 px-3 rounded-full text-xs font-semibold text-slate-950 bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f0b800] border border-[#fcd200] shadow-2xs text-center flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>Ir al producto</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Share Box with WhatsApp button */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-amber-500/10 to-orange-500/10 border-2 border-emerald-500/30 text-center max-w-2xl mx-auto mb-12 shadow-sm">
        <h2 className="text-lg sm:text-xl font-black text-slate-900 mb-2">
          ¿Faltan amigos por votar? 📲
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mb-5">
          Reenvía el enlace al grupo de WhatsApp para que nadie se quede sin opinar sobre el regalo de {recipientDisplay}.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-sm flex items-center justify-center gap-2 shadow-md hover:scale-102 active:scale-98 transition-all cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Compartir por WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">¡Enlace copiado!</span>
              </>
            ) : (
              <span>Copiar enlace directo</span>
            )}
          </button>
        </div>
      </div>

      {/* Bottom CTA to explore catalog */}
      <div className="text-center pt-4 border-t border-slate-200">
        <p className="text-xs text-slate-500 mb-3">
          ¿No os convence ninguno? Puedes buscar miles de ideas más clasificadas por edades y gustos.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline"
        >
          <span>Explorar el catálogo completo de Un Buen Regalo</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

export default function VotarPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={
          <div className="py-20 text-center text-slate-400">
            Cargando votación...
          </div>
        }>
          <VotingContent />
        </Suspense>
      </main>
      <Footer currentTheme="classic" />
    </div>
  );
}