'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useVoting } from '@/context/VotingContext';
import { useCurrency } from '@/context/CurrencyContext';
import { X, Trash2, Share2, Copy, Check, ExternalLink, ArrowRight, ThumbsUp } from 'lucide-react';

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
  const { formatPrice } = useCurrency();
  const [copied, setCopied] = useState(false);

  if (!isDrawerOpen) return null;

  const shareUrl = generateShareUrl();
  const displayName = recipientName.trim() || 'este regalo';

  const handleCopyLink = () => {
    if (!shareUrl) return;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    if (!shareUrl) return;
    const text = `🗳️ ¡Ayúdame a elegir el regalo para ${displayName}!\nHe preseleccionado estos ${voteItems.length} regalos finalistas.\nVota tu favorito aquí 👇\n${shareUrl}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-gradient-to-r from-amber-50 via-white to-orange-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-lg shadow-xs">
              🗳️
            </div>
            <div>
              <h2 className="font-black text-slate-900 text-base leading-tight">
                Votación en Grupo
              </h2>
              <p className="text-xs text-slate-500">
                {voteItems.length} de 4 productos ideales
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="w-8 h-8 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Cerrar panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* Helper Callout */}
          <div className="p-3 bg-amber-500/10 border border-amber-300/80 rounded-2xl text-xs text-amber-950 flex items-start gap-2.5">
            <ThumbsUp className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>¿Cómo funciona?</strong> Guarda entre 2 y 4 regalos finalistas con el icono del corazón ❤️. Luego comparte el enlace en WhatsApp para que tus amigos voten su favorito.
            </div>
          </div>

          {/* Recipient Name Input */}
          <div>
            <label htmlFor="recipient-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              ¿Para quién es el regalo? (Opcional)
            </label>
            <input
              id="recipient-name"
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="Ej: Cumple de Carlos, Amigo Invisible, Laura..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all"
            />
          </div>

          {/* Selected Products List */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Productos Seleccionados ({voteItems.length})
              </span>
              {voteItems.length > 0 && (
                <button
                  type="button"
                  onClick={clearList}
                  className="text-[11px] text-rose-600 hover:text-rose-700 font-bold hover:underline cursor-pointer"
                >
                  Vaciar lista
                </button>
              )}
            </div>

            {voteItems.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <span className="text-3xl block mb-2">🎁</span>
                <p className="text-sm font-bold text-slate-700 mb-1">
                  Tu lista de votación está vacía
                </p>
                <p className="text-xs text-slate-500 mb-4">
                  Navega por la web y pulsa el corazón ❤️ en los productos que más te gusten para añadirlos aquí.
                </p>
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Explorar regalos
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {voteItems.map((item, idx) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 shadow-2xs transition-all relative group"
                  >
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 font-black text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div className="relative w-14 h-14 bg-slate-50 rounded-lg overflow-hidden shrink-0 border border-slate-100 p-1 flex items-center justify-center">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-contain p-1"
                        unoptimized={item.imageUrl.startsWith('http')}
                      />
                    </div>
                    <div className="flex-1 min-w-0 pr-1">
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1 leading-tight">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-black text-slate-950">
                          {formatPrice(item.priceText)}
                        </span>
                        <span className="text-[10px] text-[#007185] font-bold">✓prime</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer shrink-0"
                      title="Eliminar de la votación"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        {voteItems.length >= 2 ? (
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 space-y-2.5">
            {/* WhatsApp Share Button */}
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-sm flex items-center justify-center gap-2 shadow-md transition-transform hover:scale-102 active:scale-98 cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Compartir votación por WhatsApp</span>
            </button>

            {/* Copy Link Button */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex-1 py-2.5 px-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">¡Enlace copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar enlace</span>
                  </>
                )}
              </button>

              <a
                href={shareUrl}
                target="_blank"
                className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-2xs"
                title="Ver cómo queda la encuesta"
              >
                <span>Probar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ) : voteItems.length === 1 ? (
          <div className="p-4 border-t border-slate-200 bg-amber-50/50 text-center">
            <p className="text-xs font-bold text-amber-900">
              💡 Añade al menos 1 producto más (mínimo 2) para poder crear la votación con tus amigos.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}