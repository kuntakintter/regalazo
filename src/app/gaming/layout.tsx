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
    'regalos para gamers baratos',
    'que regalar a un gamer',
    'ideas de regalos para gamers',
    'regalos setup gamer',
    'regalos para novio gamer',
    'auriculares hyperx cloud ii',
    'raton logitech g502 hero',
    'razer deathadder essential',
    'teclado gaming mecanico',
    'barra de luz monitor quntis',
    'lampara playstation iconos paladone',
    'mandos pc y ps5',
  ],
});

export default function GamingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
