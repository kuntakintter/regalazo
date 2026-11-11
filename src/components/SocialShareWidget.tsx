'use client';

import React, { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';
import { useActiveLocale } from '@/hooks/useActiveLocale';

interface SocialShareWidgetProps {
  url?: string;
  title?: string;
  className?: string;
  compact?: boolean;
  dark?: boolean;
}

export default function SocialShareWidget({
  url,
  title,
  className = '',
  compact = false,
  dark = false,
}: SocialShareWidgetProps) {
  const { basePath, ui } = useActiveLocale();
  const [copied, setCopied] = useState(false);

  const effectiveUrl = url || `https://www.unbuenregalo.es${basePath === '/' ? '' : basePath}`;
  const effectiveTitle = title || `🎁 ${ui.brandName} · ${ui.badgeUpdated2026}`;

  const encodedUrl = encodeURIComponent(effectiveUrl);
  const encodedTitle = encodeURIComponent(effectiveTitle);

  const shareLinks = [
    {
      name: ui.shareBtnWhatsApp,
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      bg: 'bg-emerald-700 hover:bg-emerald-800 text-white',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.599 2.679-.702c.974.561 1.774.855 2.78.856h.001c3.18 0 5.767-2.586 5.768-5.766 0-3.18-2.587-5.767-5.768-5.767zm7.505 5.767c0 4.137-3.364 7.502-7.505 7.502-1.326 0-2.574-.35-3.666-.96l-4.085 1.071 1.09-3.989c-.689-1.144-1.054-2.47-1.054-3.824 0-4.137 3.365-7.502 7.715-7.502 4.141 0 7.505 3.365 7.505 7.702z" />
        </svg>
      ),
    },
    {
      name: 'X',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      bg: 'bg-black hover:bg-neutral-800 text-white',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'Telegram',
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      bg: 'bg-sky-700 hover:bg-sky-800 text-white',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      bg: 'bg-blue-700 hover:bg-blue-800 text-white',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: 'Pinterest',
      href: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodeURIComponent('https://www.unbuenregalo.es/og-cover.png')}&description=${encodedTitle}`,
      bg: 'bg-rose-700 hover:bg-rose-800 text-white',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.365-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.546.535 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
  ];

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(effectiveUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {!compact && (
        <span
          className={`text-xs font-bold flex items-center gap-1.5 mr-1 ${
            dark ? 'text-slate-200' : 'text-slate-700'
          }`}
        >
          <Share2
            className={`w-3.5 h-3.5 ${dark ? 'text-indigo-300' : 'text-indigo-600'}`}
            aria-hidden="true"
          />
        </span>
      )}

      {shareLinks.map((item) => (
        <a
          key={item.name}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer nofollow"
          title={item.name}
          className={`inline-flex items-center justify-center gap-1.5 min-w-7 min-h-7 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-2xs hover:scale-105 active:scale-95 cursor-pointer ${item.bg}`}
        >
          {item.icon}
          <span className={compact ? 'sr-only' : undefined}>{item.name}</span>
        </a>
      ))}

      <button
        type="button"
        onClick={handleCopy}
        title={ui.shareBtnCopy}
        className="inline-flex items-center justify-center gap-1.5 min-w-7 min-h-7 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-all shadow-2xs hover:scale-105 active:scale-95 cursor-pointer"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-emerald-700 font-bold">{ui.shareBtnCopied}</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 text-slate-600" />
            <span>{ui.shareBtnCopy}</span>
          </>
        )}
      </button>
    </div>
  );
}
