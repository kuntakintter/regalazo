import React from 'react';
import type { Metadata } from 'next';
import TienenDeTodoClient from './TienenDeTodoClient';

export const metadata: Metadata = {
  title: 'Un Buen Regalo para los que Tienen de Todo 【2026】 Ideas de Regalos que Sorprenden',
  description: '¿Buscas un buen regalo para quien ya lo tiene todo? Descubre regalos originales, gadgets insólitos y sorpresas que nadie se espera.',
  keywords: [
    'un buen regalo para quien tiene de todo',
    'regalo para quien tiene de todo',
    'regalos para los que tienen de todo',
    'ideas de regalos originales',
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
    title: 'Un Buen Regalo para los que Tienen de Todo 【2026】 Ideas de Regalos que Sorprenden',
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
    title: 'Un Buen Regalo para los que Tienen de Todo 【2026】 Ideas que Sorprenden',
    description: 'Ideas sorprendentes y originales para personas que no necesitan nada.',
    images: ['https://www.unbuenregalo.es/og-cover.png'],
  },
};

export default function RegalosTienenDeTodoPage() {
  return <TienenDeTodoClient />;
}
