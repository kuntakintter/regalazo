import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mejores Regalos para Gamers (2026) | Auriculares, Teclados, Ratones y Setup',
  description:
    'Las mejores ideas de regalo para jugadores de PC, PS5 y Xbox: auriculares HyperX Cloud II, ratones Logitech G502 HERO, barras de luz para monitor y teclados mecánicos. Calidad contrastada en Amazon España.',
  keywords: [
    'regalos para gamers',
    'regalos para setup gamer',
    'auriculares hyperx cloud ii',
    'raton logitech g502 hero',
    'teclado gaming mecanico',
    'barra de luz monitor quntis'
  ],
  alternates: {
    canonical: 'https://unbuenregalo.vercel.app/gaming',
  },
  openGraph: {
    title: 'Mejores Regalos para Gamers (2026) | Un Buen Regalo',
    description:
      'Periféricos eSports, audio envolvente y gadgets de iluminación con garantía directa de Amazon España.',
    url: 'https://unbuenregalo.vercel.app/gaming',
    type: 'website',
    siteName: 'Un Buen Regalo',
    locale: 'es_ES',
  },
};

export default function GamingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
