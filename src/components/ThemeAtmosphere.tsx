'use client';

import React from 'react';

export default function ThemeAtmosphere() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-indigo-200/30 to-purple-200/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-amber-100/30 to-rose-100/15 rounded-full blur-3xl" />
    </div>
  );
}
