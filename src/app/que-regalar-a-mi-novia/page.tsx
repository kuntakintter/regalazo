import React from 'react';
import type { Metadata } from 'next';
import { getHreflangAlternatesForPath } from '@/lib/filterRoutes';
import NoviaClient from './NoviaClient';

export const metadata: Metadata = {
  title: 'Un Buen Regalo para mi Novia: ¿Qué Regalar? 【2026】 Ideas de Regalos Originales',
  description: '¿Buscas un buen regalo para tu novia? Descubre qué regalarle con ideas de regalos originales y románticos para cumpleaños, aniversario o Navidad.',
  keywords: [
    'un buen regalo para mi novia',
    'regalo para mi novia',
    'que regalar a mi novia',
    'regalos para mi novia',
    'ideas de regalos para novias',
    'regalos aniversario novia',
    'que regalarle a mi novia en su cumpleanos',
    'regalo original novia 2026',
    'sorpresas para mi novia',
    'detalles romanticos para mi novia'
  ],
  alternates: {
    canonical: 'https://www.unbuenregalo.es/que-regalar-a-mi-novia',
    languages: getHreflangAlternatesForPath('/que-regalar-a-mi-novia'),
  },
  openGraph: {
    title: 'Un Buen Regalo para mi Novia: ¿Qué Regalar? 【2026】 Ideas de Regalos Originales',
    description: 'Guía de regalos para novias: belleza de culto, perfumes virales, joyería fina, hogar acogedor y planes para dos con opiniones verificadas.',
    url: 'https://www.unbuenregalo.es/que-regalar-a-mi-novia',
    siteName: 'Un Buen Regalo',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: 'https://www.unbuenregalo.es/og-cover.png',
        width: 1200,
        height: 630,
        alt: 'Qué Regalar a mi Novia - Un Buen Regalo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Un Buen Regalo para mi Novia: ¿Qué Regalar? 【2026】',
    description: 'Ideas de regalos para tu novia en su cumpleaños, aniversario o San Valentín. Precios y opiniones reales en Amazon.',
    images: ['https://www.unbuenregalo.es/og-cover.png'],
  },
};

export default function QueRegalarNoviaPage() {
  return <NoviaClient />;
}
