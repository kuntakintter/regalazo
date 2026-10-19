'use client';

import React from 'react';

export default function ThemeAtmosphere() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 1. Subtle, Elegant Dot Matrix for Depth */}
      <div 
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: 'radial-gradient(#94a3b8 0.75px, transparent 0.75px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* 2. Top-Right Soft Indigo Glow */}
      <div className="absolute -top-32 right-[-5%] w-[600px] h-[600px] bg-gradient-to-br from-indigo-200/35 via-purple-100/20 to-transparent rounded-full blur-3xl" />

      {/* 3. Center-Left Warm Amber/Peach Glow */}
      <div className="absolute top-[35%] left-[-8%] w-[550px] h-[550px] bg-gradient-to-tr from-amber-100/30 via-rose-100/20 to-transparent rounded-full blur-3xl" />

      {/* 4. Bottom Right Ambient Soft Violet Glow */}
      <div className="absolute -bottom-32 right-[10%] w-[650px] h-[650px] bg-gradient-to-tl from-indigo-100/30 via-sky-100/20 to-transparent rounded-full blur-3xl" />
    </div>
  );
}
