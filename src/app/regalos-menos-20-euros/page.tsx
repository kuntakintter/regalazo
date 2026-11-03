import React from 'react';
import type { Metadata } from 'next';
import Under20Client from './Under20Client';

export const metadata: Metadata = {
  title: 'Regalos por Menos de 20 Euros 【2026】 Ideas Baratas y Originales',
  description: '¿Buscas regalos originales por menos de 20 euros? Descubre nuestra selección de detalles económicos, regalos para amigo invisible y sorpresas de gran impacto al mejor precio.',
  keywords: [
    'regalos por menos de 20 euros',
    'regalos baratos originales',
    'detalles amigo invisible 20 euros',
    'regalos economicos',
    'ideas regalo menos 20€',
    'regalos baratos de cumpleaños'
  ],
  alternates: {
    canonical: 'https://www.unbuenregalo.es/regalos-menos-20-euros',
  },
  openGraph: {
    title: 'Regalos por Menos de 20 Euros 【2026】 Ideas Baratas y Originales',
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
    title: 'Regalos por Menos de 20 Euros 【2026】 Ideas Baratas y Originales',
    description: 'Ideas de regalos por menos de 20 euros para cumpleaños, amigo invisible y detalles.',
    images: ['https://www.unbuenregalo.es/og-cover.png'],
  },
};

export default function RegalosMenos20Page() {
  return <Under20Client />;
}
