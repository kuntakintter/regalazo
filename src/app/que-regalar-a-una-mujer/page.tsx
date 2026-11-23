import React from 'react';
import type { Metadata } from 'next';
import { getHreflangAlternatesForPath } from '@/lib/filterRoutes';
import MujerClient from './MujerClient';

export const metadata: Metadata = {
  title: 'Regalos para Mujeres 【2026】 ¿Qué Regalar a una Mujer? +60 Ideas Originales (Desde 12€)',
  description: '¿Qué regalar a una mujer? Ranking con +60 regalos originales para mujeres (novia, madre, hermana o amiga) desde 12€: cosmética viral, perfumes, relax, cámaras Instax y ofertas Amazon 4.5★+.',
  keywords: [
    'regalos para mujeres',
    'regalos para mujer',
    'regalos mujer',
    'ideas de regalos para mujeres',
    'regalos originales para mujeres',
    'que regalar a una mujer',
    'un buen regalo para una mujer',
    'regalo para una mujer',
    'regalos de cumpleanos para mujer',
    'regalo mujer original 2026',
    'detalles para mujeres'
  ],
  alternates: {
    canonical: 'https://www.unbuenregalo.es/que-regalar-a-una-mujer',
    languages: getHreflangAlternatesForPath('/que-regalar-a-una-mujer'),
  },
  openGraph: {
    title: 'Regalos para Mujeres 【2026】 ¿Qué Regalar a una Mujer? +60 Ideas Originales (Desde 12€)',
    description: 'Guía de regalos originales para mujeres: cosmética viral, perfumes top, bienestar, estilo y detalles desde 12€ con valoración 4.5★+.',
    url: 'https://www.unbuenregalo.es/que-regalar-a-una-mujer',
    siteName: 'Un Buen Regalo',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: 'https://www.unbuenregalo.es/og-cover.png',
        width: 1200,
        height: 630,
        alt: 'Regalos para Mujeres - Qué Regalar a una Mujer - Un Buen Regalo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Regalos para Mujeres 【2026】 ¿Qué Regalar a una Mujer? +60 Ideas Originales',
    description: 'Ideas de regalos originales para mujeres: novia, madre, hermana o amigas desde 12€. Comparativa de valoraciones y precios Amazon.',
    images: ['https://www.unbuenregalo.es/og-cover.png'],
  },
};

export default function QueRegalarMujerPage() {
  return <MujerClient />;
}
