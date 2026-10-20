import { Metadata } from 'next';
import { HUB_OG_SNIPPETS, buildSocialMetadata } from '@/lib/ogMetadata';

const snippet = HUB_OG_SNIPPETS.mascotas;

export const metadata: Metadata = buildSocialMetadata({
  title: snippet.title,
  socialTitle: snippet.socialTitle,
  description: snippet.description,
  canonicalUrl: 'https://unbuenregalo.vercel.app/mascotas',
  imageUrl: snippet.imageUrl,
  imageAlt: snippet.imageAlt,
  keywords: [
    'regalos para amantes de las mascotas',
    'regalos para perros y gatos',
    'gps perros tractive sumergible',
    'fuente gatos inteligente catit pixi',
    'arnes perro julius k9 idc',
    'cepillo deslanador furminator',
  ],
});

export default function MascotasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
