import React from 'react';
import type { Metadata } from 'next';
import NovioClient from './NovioClient';

export const metadata: Metadata = {
  title: '¿Qué Regalar a mi Novio? 【2026】 Ideas Originales de Aniversario y Cumpleaños',
  description: '¿No sabes qué regalar a tu novio? Descubre las mejores ideas de regalo para tu pareja: tecnología, gaming, estilo, accesorios y detalles románticos con los que acertarás seguro.',
  keywords: [
    'que regalar a mi novio',
    'regalos para mi novio',
    'ideas de regalos para novios',
    'regalos aniversario novio',
    'que regalarle a mi novio en su cumpleanos',
    'regalos originales novio',
    'sorpresas para mi novio',
    'detalles para mi novio'
  ],
  alternates: {
    canonical: 'https://www.unbuenregalo.es/que-regalar-a-mi-novio',
  },
  openGraph: {
    title: '¿Qué Regalar a mi Novio? 【2026】 Ideas Originales y Sorprendentes',
    description: 'Selección de regalos para novios: tecnología, gaming, estilo, fragancias y escapadas románticas con opiniones contrastadas en Amazon.',
    url: 'https://www.unbuenregalo.es/que-regalar-a-mi-novio',
    siteName: 'Un Buen Regalo',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: 'https://www.unbuenregalo.es/og-cover.png',
        width: 1200,
        height: 630,
        alt: 'Qué Regalar a mi Novio - Un Buen Regalo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '¿Qué Regalar a mi Novio? 【2026】 Ideas Originales',
    description: 'Ideas de regalos para tu novio en su cumpleaños, aniversario o Navidad. Comparativas de precios y valoraciones.',
    images: ['https://www.unbuenregalo.es/og-cover.png'],
  },
};

export default function QueRegalarNovioPage() {
  return <NovioClient />;
}
