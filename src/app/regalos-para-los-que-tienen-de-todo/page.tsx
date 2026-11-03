import React from 'react';
import type { Metadata } from 'next';
import TienenDeTodoClient from './TienenDeTodoClient';

export const metadata: Metadata = {
  title: 'Regalos para los que Tienen de Todo 【2026】 Ideas que Sorprenden',
  description: '¿No sabes qué regalar a quien ya lo tiene todo? Descubre regalos originales, gadgets curiosos, experiencias y sorpresas inolvidables para no fallar jamás.',
  keywords: [
    'regalos para los que tienen de todo',
    'que regalar a quien tiene de todo',
    'regalos originales sorprendentes',
    'ideas regalo para gente dificil',
    'regalos curiosos 2026',
    'regalos para padres que tienen de todo'
  ],
  alternates: {
    canonical: 'https://www.unbuenregalo.es/regalos-para-los-que-tienen-de-todo',
  },
  openGraph: {
    title: 'Regalos para los que Tienen de Todo 【2026】 Ideas que Sorprenden',
    description: 'Guía oficial de regalos insólitos y experiencias para personas que parecen tenerlo todo.',
    url: 'https://www.unbuenregalo.es/regalos-para-los-que-tienen-de-todo',
    siteName: 'Un Buen Regalo',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: 'https://www.unbuenregalo.es/og-cover.png',
        width: 1200,
        height: 630,
        alt: 'Regalos para los que tienen de todo en Un Buen Regalo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Regalos para los que Tienen de Todo 【2026】 Ideas que Sorprenden',
    description: 'Ideas sorprendentes y originales para personas que no necesitan nada.',
    images: ['https://www.unbuenregalo.es/og-cover.png'],
  },
};

export default function RegalosTienenDeTodoPage() {
  return <TienenDeTodoClient />;
}
