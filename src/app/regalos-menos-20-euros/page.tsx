import React from 'react';
import type { Metadata } from 'next';
import Under20Client from './Under20Client';

export const metadata: Metadata = {
  title: 'Un Buen Regalo por Menos de 20€ 【2026】 Ideas de Regalos Baratos y Originales',
  description: '¿Buscas un buen regalo por menos de 20 euros? Descubre nuestra selección de regalos baratos y originales, detalles económicos y sorpresas para amigo invisible.',
  keywords: [
    'un buen regalo por menos de 20 euros',
    'regalo barato menos de 20 euros',
    'regalos por menos de 20 euros',
    'ideas de regalos baratos',
    'detalles amigo invisible 20 euros',
    'regalos economicos',
    'ideas regalo menos 20€',
    'regalos baratos de cumpleaños'
  ],
  alternates: {
    canonical: 'https://www.unbuenregalo.es/regalos-menos-20-euros',
  },
  openGraph: {
    title: 'Un Buen Regalo por Menos de 20€ 【2026】 Ideas de Regalos Baratos y Originales',
    description: 'Selección de regalos originales y económicos con los que triunfar por menos de 20€ en Amazon España.',
    url: 'https://www.unbuenregalo.es/regalos-menos-20-euros',
    siteName: 'Un Buen Regalo',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: 'https://www.unbuenregalo.es/og-cover.png',
        width: 1200,
        height: 630,
        alt: 'Regalos por Menos de 20 Euros en Un Buen Regalo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Un Buen Regalo por Menos de 20€ 【2026】 Ideas Baratas y Originales',
    description: 'Ideas de regalos por menos de 20 euros para cumpleaños, amigo invisible y detalles.',
    images: ['https://www.unbuenregalo.es/og-cover.png'],
  },
};

export default function RegalosMenos20Page() {
  return <Under20Client />;
}
