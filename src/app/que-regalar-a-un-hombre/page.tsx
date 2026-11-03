import React from 'react';
import type { Metadata } from 'next';
import HombreClient from './HombreClient';

export const metadata: Metadata = {
  title: '¿Qué Regalar a un Hombre? 【2026】 Ideas Originales y Sorprendentes',
  description: '¿No sabes qué regalar a un hombre? Descubre las mejores ideas de regalo para hombres: novio, padre, hermano o amigo. Tecnología, gadgets, estilo, motor y regalos únicos.',
  keywords: [
    'que regalar a un hombre',
    'regalos para hombres',
    'ideas de regalos para hombres',
    'que regalar a mi novio',
    'regalos para novio originales',
    'regalos de cumpleanos para hombre',
    'que regalar a mi padre',
    'regalos hombre originales 2026',
    'detalles para hombres'
  ],
  alternates: {
    canonical: 'https://www.unbuenregalo.es/que-regalar-a-un-hombre',
  },
  openGraph: {
    title: '¿Qué Regalar a un Hombre? 【2026】 Ideas Originales y Sorprendentes',
    description: 'Guía definitiva de ideas de regalo para hombres: gadgets virales, tecnología, motor, gaming y detalles con los que acertar seguro.',
    url: 'https://www.unbuenregalo.es/que-regalar-a-un-hombre',
    siteName: 'Un Buen Regalo',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: 'https://www.unbuenregalo.es/og-cover.png',
        width: 1200,
        height: 630,
        alt: 'Qué Regalar a un Hombre - Un Buen Regalo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '¿Qué Regalar a un Hombre? 【2026】 Ideas Originales',
    description: 'Ideas de regalos para hombres: novio, padre, hermano o amigos. Comparativa de precios y valoraciones Amazon.',
    images: ['https://www.unbuenregalo.es/og-cover.png'],
  },
};

export default function QueRegalarHombrePage() {
  return <HombreClient />;
}
