import { Metadata } from 'next';
import { HUB_OG_SNIPPETS, buildSocialMetadata } from '@/lib/ogMetadata';

const snippet = HUB_OG_SNIPPETS.navidad;

export const metadata: Metadata = buildSocialMetadata({
  title: snippet.title,
  socialTitle: snippet.socialTitle,
  description: snippet.description,
  canonicalUrl: 'https://www.unbuenregalo.es/navidad',
  imageUrl: snippet.imageUrl,
  imageAlt: snippet.imageAlt,
  keywords: [
    'trenes de navidad para arbol',
    'tren electrico arbol de navidad',
    'tren arbol navidad con humo y sonido',
    'decoracion navideña',
    'decoracion arbol de navidad',
    'villas de navidad con luz y movimiento',
    'luces de navidad arbol amazon',
    'regalos navidad 2026',
    'regalos reyes magos ideas',
    'calendarios adviento 2026',
    'amigo invisible menos de 15 euros',
    'adornos navidenos salon',
  ],
});

export default function NavidadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
