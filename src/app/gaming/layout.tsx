import { Metadata } from 'next';
import { HUB_OG_SNIPPETS, buildSocialMetadata } from '@/lib/ogMetadata';

const snippet = HUB_OG_SNIPPETS.gaming;

export const metadata: Metadata = buildSocialMetadata({
  title: snippet.title,
  socialTitle: snippet.socialTitle,
  description: snippet.description,
  canonicalUrl: 'https://www.unbuenregalo.es/gaming',
  imageUrl: snippet.imageUrl,
  imageAlt: snippet.imageAlt,
  keywords: [
    'regalos para gamers',
    'regalos para setup gamer',
    'auriculares hyperx cloud ii',
    'raton logitech g502 hero',
    'teclado gaming mecanico',
    'barra de luz monitor quntis',
    'mandos ps5 dualsense edge',
  ],
});

export default function GamingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
