'use client';

import React from 'react';

interface ThemeAtmosphereProps {
  theme: 'baby' | 'kids' | 'gamer' | 'emo' | 'tech' | 'classic';
}

export default function ThemeAtmosphere({ theme }: ThemeAtmosphereProps) {
  if (theme === 'baby') {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-60 transition-opacity duration-700">
        {/* Floating clouds and cute bear icons */}
        <div className="absolute top-10 left-5 text-4xl animate-float opacity-40 select-none">🧸</div>
        <div className="absolute top-40 right-10 text-3xl animate-float opacity-30 select-none" style={{ animationDelay: '1.5s' }}>☁️</div>
        <div className="absolute top-96 left-12 text-3xl animate-float opacity-30 select-none" style={{ animationDelay: '3s' }}>⭐</div>
        <div className="absolute bottom-20 right-8 text-4xl animate-float opacity-40 select-none" style={{ animationDelay: '2s' }}>🍼</div>
        <div className="absolute inset-0 bg-radial from-pink-100/40 via-amber-50/20 to-transparent"></div>
      </div>
    );
  }

  if (theme === 'emo') {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-700">
        {/* Dark aesthetic mood with gothic candles and subtle smoke */}
        <div className="absolute inset-0 bg-radial from-rose-950/20 via-neutral-950/40 to-black/70"></div>
        <div className="absolute top-8 left-6 text-3xl animate-flicker opacity-60 select-none">🕯️</div>
        <div className="absolute top-36 right-8 text-2xl animate-flicker opacity-50 select-none" style={{ animationDelay: '1.2s' }}>🕯️</div>
        <div className="absolute top-80 left-10 text-2xl animate-float opacity-40 select-none" style={{ animationDelay: '2.5s' }}>🖤</div>
        <div className="absolute bottom-32 right-12 text-3xl animate-flicker opacity-40 select-none" style={{ animationDelay: '0.8s' }}>🥀</div>
        <div className="absolute top-1/2 left-4 text-xl opacity-20 select-none font-serif text-rose-300">✦ ✧ ✦</div>
      </div>
    );
  }

  if (theme === 'gamer') {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-700">
        {/* Cyberpunk RGB neon pulses */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-8 text-3xl opacity-30 select-none animate-float">🎮</div>
        <div className="absolute bottom-40 left-6 text-2xl opacity-25 select-none animate-float" style={{ animationDelay: '2s' }}>⚡</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"></div>
    </div>
  );
}
