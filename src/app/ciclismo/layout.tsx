import { Metadata } from 'next';
import { HUB_OG_SNIPPETS, buildSocialMetadata } from '@/lib/ogMetadata';

const snippet = HUB_OG_SNIPPETS.ciclismo;

export const metadata: Metadata = buildSocialMetadata({
  title: snippet.title,
  socialTitle: snippet.socialTitle,
  description: snippet.description,
  canonicalUrl: 'https://www.unbuenregalo.es/ciclismo',
  imageUrl: snippet.imageUrl,
  imageAlt: snippet.imageAlt,
  keywords: [
    'un buen regalo para un ciclista',
    'regalo para ciclista',
    'regalos para ciclistas',
    'ideas de regalos ciclismo',
    'regalos mtb ciclismo',
    'garmin varia radar luz trasera',
    'ciclocomputador garmin edge',
    'multiherramienta topeak hexus',
    'cera lubricante cadena squirt',
  ],
});

export default function CiclismoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
