import React from 'react';
import type { Metadata } from 'next';
import { getHreflangAlternatesForPath } from '@/lib/filterRoutes';
import HombreClient from './HombreClient';

export const metadata: Metadata = {
  title: 'Regalos para Hombres 【2026】 ¿Qué Regalar a un Hombre? +60 Ideas Originales (Desde 12€)',
  description: '¿Qué regalar a un hombre que tiene de todo? Ranking con +60 regalos originales para hombres (novio, padre o amigo) desde 12€: gadgets, motor, café, Black Friday y reacondicionados Amazon 4.5★+.',
  keywords: [
    'regalos para hombres',
    'regalos para hombre',
    'regalos hombre',
    'regalos hombres',
    'ideas de regalos para hombres',
    'ideas de regalos de hombre',
    'regalos originales para hombres',
    'que regalar a un hombre',
    'que regalar a un hombre que tiene de todo',
    'un buen regalo para un hombre',
    'regalo para hombre',
    'regalo hombre original 2026',
    'detalles para hombres'
  ],
  alternates: {
    canonical: 'https://www.unbuenregalo.es/que-regalar-a-un-hombre',
    languages: getHreflangAlternatesForPath('/que-regalar-a-un-hombre'),
  },
  openGraph: {
    title: 'Regalos para Hombres 【2026】 ¿Qué Regalar a un Hombre? +60 Ideas Originales (Desde 12€)',
    description: 'Guía definitiva de regalos para hombres: gadgets virales, tecnología, motor, gaming y chollos desde 12€ con valoración 4.5★+ en Amazon.',
    url: 'https://www.unbuenregalo.es/que-regalar-a-un-hombre',
    siteName: 'Un Buen Regalo',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: 'https://www.unbuenregalo.es/og-cover.png',
        width: 1200,
        height: 630,
        alt: 'Regalos para Hombres - Qué Regalar a un Hombre - Un Buen Regalo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Regalos para Hombres 【2026】 ¿Qué Regalar a un Hombre? +60 Ideas Originales',
    description: 'Ideas de regalos originales para hombres: novio, padre, hermano o amigos desde 12€. Comparativa de precios y valoraciones Amazon.',
    images: ['https://www.unbuenregalo.es/og-cover.png'],
  },
};

export default function QueRegalarHombrePage() {
  return <HombreClient />;
}
