import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mejores Regalos para Amantes del Café (2026) | Cafeteras, Molinillos y Barista',
  description:
    'Ideas de regalo para baristas y apasionados del café de especialidad: cafeteras italianas Bialetti, molinillos manuales Timemore C3, espumadores de leche y tazas térmicas Stanley. Catálogo verificado en Amazon España.',
  keywords: [
    'regalos para amantes del cafe',
    'regalos barista cafe de especialidad',
    'cafetera moka bialetti express',
    'molinillo cafe timemore c3',
    'taza termica stanley trigger action',
    'espumador de leche severin'
  ],
  alternates: {
    canonical: 'https://unbuenregalo.vercel.app/amantes-del-cafe',
  },
  openGraph: {
    title: 'Mejores Regalos para Amantes del Café (2026) | Un Buen Regalo',
    description:
      'Cafeteras, molinillos de muelas, espumadores y termos con la garantía de Amazon España.',
    url: 'https://unbuenregalo.vercel.app/amantes-del-cafe',
    type: 'website',
    siteName: 'Un Buen Regalo',
    locale: 'es_ES',
  },
};

export default function CafeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
