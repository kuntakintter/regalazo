import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '🎅 Carta Mágica a Papá Noel Oficial | Un Buen Regalo',
  description: 'Escribe tu carta mágica a Papá Noel online. Elige tus juguetes favoritos, escribe tu nombre y envíala volando al Polo Norte en un clic.',
  alternates: {
    canonical: 'https://www.unbuenregalo.es/carta-papa-noel',
  },
  openGraph: {
    title: '🎅 Carta Mágica a Papá Noel | Un Buen Regalo',
    description: 'Escribe tu carta mágica a Papá Noel online. Elige tus juguetes favoritos y envíala directa al Polo Norte.',
    url: 'https://www.unbuenregalo.es/carta-papa-noel',
    siteName: 'Un Buen Regalo',
    locale: 'es_ES',
    type: 'website',
  },
};

export default function CartaPapaNoelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
