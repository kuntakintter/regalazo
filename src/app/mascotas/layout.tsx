import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mejores Regalos para Amantes de Mascotas (2026) | Perros, Gatos y Gadgets',
  description:
    'Ideas de regalo para dueños de perros y gatos: localizadores GPS Tractive sumergibles, fuentes Catit PIXI inteligentes, arneses antitirones Julius-K9 y cepillos FURminator. Catálogo verificado en Amazon España.',
  keywords: [
    'regalos para amantes de las mascotas',
    'regalos para perros y gatos',
    'gps perros tractive sumergible',
    'fuente gatos inteligente catit pixi',
    'arnes perro julius k9 idc',
    'cepillo deslanador furminator'
  ],
  alternates: {
    canonical: 'https://unbuenregalo.vercel.app/mascotas',
  },
  openGraph: {
    title: 'Mejores Regalos para Amantes de las Mascotas (2026) | Un Buen Regalo',
    description:
      'GPS, fuentes inteligentes, arneses y bienestar animal con garantía de Amazon España.',
    url: 'https://unbuenregalo.vercel.app/mascotas',
    type: 'website',
    siteName: 'Un Buen Regalo',
    locale: 'es_ES',
  },
};

export default function MascotasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
