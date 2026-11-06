import React from 'react';
import type { Metadata } from 'next';
import HombreClient from './HombreClient';

export const metadata: Metadata = {
  title: 'Un Buen Regalo para un Hombre: ¿Qué Regalar? 【2026】 Ideas de Regalos Originales',
  description: '¿Buscas un buen regalo para un hombre? Descubre qué regalar con ideas de regalo y detalles para novio, padre, hermano o amigo: tecnología, gadgets, estilo y motor.',
  keywords: [
    'un buen regalo para un hombre',
    'regalo para un hombre',
    'que regalar a un hombre',
    'regalos para hombres',
    'ideas de regalos para hombres',
    'que regalar a mi novio',
    'regalos para novio originales',
    'regalos de cumpleanos para hombre',
    'regalo hombre original 2026',
    'detalles para hombres'
  ],
  alternates: {
    canonical: 'https://www.unbuenregalo.es/que-regalar-a-un-hombre',
  },
  openGraph: {
    title: 'Un Buen Regalo para un Hombre: ¿Qué Regalar? 【2026】 Ideas de Regalos Originales',
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
    title: 'Un Buen Regalo para un Hombre: ¿Qué Regalar? 【2026】',
    description: 'Ideas de regalos para hombres: novio, padre, hermano o amigos. Comparativa de precios y valoraciones Amazon.',
    images: ['https://www.unbuenregalo.es/og-cover.png'],
  },
};

export default function QueRegalarHombrePage() {
  return <HombreClient />;
}
