import React from 'react';
import type { Metadata } from 'next';
import { getHreflangAlternatesForPath } from '@/lib/filterRoutes';
import MujerClient from './MujerClient';

export const metadata: Metadata = {
  title: 'Un Buen Regalo para una Mujer: ¿Qué Regalar? 【2026】 Ideas de Regalos Originales',
  description: '¿Buscas un buen regalo para una mujer? Descubre qué regalar con ideas de regalo para novia, madre, hermana o amiga: cosmética viral, relax, estilo y detalles únicos.',
  keywords: [
    'un buen regalo para una mujer',
    'regalo para una mujer',
    'que regalar a una mujer',
    'regalos para mujeres',
    'ideas de regalos para mujeres',
    'que regalar a mi novia',
    'regalos para novia originales',
    'regalos de cumpleanos para mujer',
    'regalo mujer original 2026',
    'detalles para mujeres'
  ],
  alternates: {
    canonical: 'https://www.unbuenregalo.es/que-regalar-a-una-mujer',
    languages: getHreflangAlternatesForPath('/que-regalar-a-una-mujer'),
  },
  openGraph: {
    title: 'Un Buen Regalo para una Mujer: ¿Qué Regalar? 【2026】 Ideas de Regalos Originales',
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
    title: 'Un Buen Regalo para una Mujer: ¿Qué Regalar? 【2026】',
    description: 'Ideas de regalos para mujeres: novia, madre, hermana o amigas. Comparativa de valoraciones y precios Amazon.',
    images: ['https://www.unbuenregalo.es/og-cover.png'],
  },
};

export default function QueRegalarMujerPage() {
  return <MujerClient />;
}
