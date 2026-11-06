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
    'un buen regalo para un gamer',
    'regalo para gamer barato',
    'que regalar a un gamer',
    'regalo para novio gamer',
    'regalos para gamers',
    'regalos para gamers baratos',
    'ideas de regalos para gamers',
    'regalos setup gamer',
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
