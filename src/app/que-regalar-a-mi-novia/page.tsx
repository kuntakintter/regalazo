import React from 'react';
import type { Metadata } from 'next';
import NoviaClient from './NoviaClient';

export const metadata: Metadata = {
  title: '¿Qué Regalar a mi Novia? 【2026】 Ideas Románticas, Originales y Virales',
  description: '¿No sabes qué regalar a tu novia? Descubre las mejores ideas de regalo para tu pareja: cosmética viral, perfumes de culto, joyería minimalista, bolsos y escapadas en pareja.',
  keywords: [
    'que regalar a mi novia',
    'regalos para mi novia',
    'ideas de regalos para novias',
    'regalos aniversario novia',
    'que regalarle a mi novia en su cumpleanos',
    'regalos originales novia',
    'sorpresas para mi novia',
    'detalles romanticos para mi novia'
  ],
  alternates: {
    canonical: 'https://www.unbuenregalo.es/que-regalar-a-mi-novia',
  },
  openGraph: {
    title: '¿Qué Regalar a mi Novia? 【2026】 Ideas Románticas y Especiales',
    description: 'Guía de regalos para novias: belleza de culto, perfumes virales, joyería fina, hogar acogedor y planes para dos con opiniones verificadas.',
    url: 'https://www.unbuenregalo.es/que-regalar-a-mi-novia',
    siteName: 'Un Buen Regalo',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: 'https://www.unbuenregalo.es/og-cover.png',
        width: 1200,
        height: 630,
        alt: 'Qué Regalar a mi Novia - Un Buen Regalo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '¿Qué Regalar a mi Novia? 【2026】 Ideas Románticas',
    description: 'Ideas de regalos para tu novia en su cumpleaños, aniversario o San Valentín. Precios y opiniones reales en Amazon.',
    images: ['https://www.unbuenregalo.es/og-cover.png'],
  },
};

export default function QueRegalarNoviaPage() {
  return <NoviaClient />;
}
