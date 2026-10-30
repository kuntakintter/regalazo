'use client';

import React, { useState } from 'react';
import { Share2, Check, Copy, MessageCircle, Send } from 'lucide-react';
import { trackShareEvent } from '@/lib/analytics';

interface SocialShareBarProps {
  title?: string;
  url?: string;
  currentTheme?: string;
}

export default function SocialShareBar({
  title: initialTitle,
  url: initialUrl,
  currentTheme = 'classic',
}: SocialShareBarProps) {
  const [copied, setCopied] = useState(false);
  const [activeUrl, setActiveUrl] = useState(initialUrl || 'https://www.unbuenregalo.es');
  const [activeTitle, setActiveTitle] = useState(initialTitle || 'Un Buen Regalo | Ideas de Regalos Originales');

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!initialUrl) {
        setActiveUrl(window.location.href);
      }
      if (!initialTitle && document.title) {
        setActiveTitle(document.title);
      }
    }
  }, [initialUrl, initialTitle]);

  const encodedUrl = encodeURIComponent(activeUrl);
  const encodedText = encodeURIComponent(`${activeTitle} - Ideas recomendadas:`);

  const shareLinks = [
    {
      name: 'WhatsApp',
      url: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
      bg: 'bg-[#075E54] hover:bg-[#128C7E] text-white',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.97.581 1.93.89 2.796.89 3.183 0 5.768-2.587 5.769-5.766.001-3.182-2.585-5.777-5.769-5.777zm0 10.428c-.804 0-1.637-.234-2.34-.658l-.168-.101-1.574.412.42-1.534-.11-.176a4.675 4.675 0 0 1-.715-2.605c.001-2.581 2.102-4.68 4.684-4.68 2.582 0 4.682 2.1 4.682 4.68 0 2.582-2.1 4.682-4.689 4.682z" />
        </svg>
      ),
    },
    {
      name: 'Telegram',
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      bg: 'bg-[#006699] hover:bg-[#0088cc] text-white',
      icon: <Send className="w-3.5 h-3.5" />,
    },
    {
      name: 'X (Twitter)',
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
      bg: 'bg-slate-900 hover:bg-black text-white',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      bg: 'bg-blue-700 hover:bg-blue-800 text-white',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeUrl);
      setCopied(true);
      trackShareEvent('Copy Link', 'social_bar', {
        page_url: activeUrl,
        page_title: activeTitle,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="py-4 my-6 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
      <div className="flex items-center gap-2 text-slate-700 font-bold">
        <Share2 className="w-4 h-4 text-indigo-600 shrink-0" />
        <span>Comparte estas ideas con tus amigos o familia:</span>
      </div>

      <div className="flex items-center gap-2 flex-wrap justify-center">
        {shareLinks.map((item) => (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Compartir en ${item.name}`}
            onClick={() => {
              trackShareEvent(item.name as any, 'social_bar', {
                page_url: activeUrl,
                page_title: activeTitle,
              });
            }}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer text-[11px] ${item.bg}`}
          >
            {item.icon}
            <span>{item.name}</span>
          </a>
        ))}

        <button
          onClick={handleCopy}
          aria-label="Copiar enlace"
          className="px-3 py-1.5 rounded-xl font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer text-[11px]"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? '¡Copiado!' : 'Copiar enlace'}</span>
        </button>
      </div>
    </div>
  );
}
