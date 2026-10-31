import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '🎅 Carta Mágica a Papá Noel y Reyes Magos | Un Buen Regalo',
  description: 'Crea tu carta mágica a Papá Noel y a los Reyes Magos online. Elige tus juguetes favoritos, pon tu nombre y envíala volando al Polo Norte en un clic.',
  alternates: {
    canonical: 'https://www.unbuenregalo.es/carta-papa-noel',
  },
  openGraph: {
    title: '🎅 Carta Mágica a Papá Noel y Reyes Magos | Un Buen Regalo',
    description: 'Crea tu carta mágica a Papá Noel y a los Reyes Magos online. Elige tus juguetes favoritos y envíala al Polo Norte.',
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
