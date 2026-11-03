import React from 'react';
import type { Metadata } from 'next';
import MujerClient from './MujerClient';

export const metadata: Metadata = {
  title: '¿Qué Regalar a una Mujer? 【2026】 Ideas Originales y Especiales',
  description: '¿No sabes qué regalar a una mujer? Descubre las mejores ideas de regalo para mujeres: novia, madre, hermana o amiga. Belleza viral, estilo, relax, lectura y detalles únicos.',
  keywords: [
    'que regalar a una mujer',
    'regalos para mujeres',
    'ideas de regalos para mujeres',
    'que regalar a mi novia',
    'regalos para novia originales',
    'regalos de cumpleanos para mujer',
    'que regalar a mi madre',
    'regalos mujer originales 2026',
    'detalles para mujeres'
  ],
  alternates: {
    canonical: 'https://www.unbuenregalo.es/que-regalar-a-una-mujer',
  },
  openGraph: {
    title: '¿Qué Regalar a una Mujer? 【2026】 Ideas Originales y Especiales',
    description: 'Guía de regalos para mujeres: cosmética viral, perfumes top, bienestar, estilo, lectura y detalles con los que emocionar.',
    url: 'https://www.unbuenregalo.es/que-regalar-a-una-mujer',
    siteName: 'Un Buen Regalo',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: 'https://www.unbuenregalo.es/og-cover.png',
        width: 1200,
        height: 630,
        alt: 'Qué Regalar a una Mujer - Un Buen Regalo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '¿Qué Regalar a una Mujer? 【2026】 Ideas Originales',
    description: 'Ideas de regalos para mujeres: novia, madre, hermana o amigas. Comparativa de valoraciones y precios Amazon.',
    images: ['https://www.unbuenregalo.es/og-cover.png'],
  },
};

export default function QueRegalarMujerPage() {
  return <MujerClient />;
}
