import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mejores Regalos para Ciclistas y Amantes del MTB (2026) | GPS, Luces y Ropa',
  description:
    'Guía experta de regalos para ciclistas de carretera, gravel y montaña: radar Garmin Varia RTL515, ciclocomputadores Edge, multiherramientas Topeak y cera Squirt Lube. Verificado en Amazon España.',
  keywords: [
    'regalos para ciclistas',
    'regalos mtb ciclismo',
    'garmin varia radar luz trasera',
    'ciclocomputador garmin edge',
    'multiherramienta topeak hexus',
    'cera lubricante cadena squirt'
  ],
  alternates: {
    canonical: 'https://unbuenregalo.vercel.app/ciclismo',
  },
  openGraph: {
    title: 'Mejores Regalos para Ciclistas (2026) | Un Buen Regalo',
    description:
      'Radares Garmin, GPS, multiherramientas y accesorios con las mejores valoraciones de Amazon España.',
    url: 'https://unbuenregalo.vercel.app/ciclismo',
    type: 'website',
    siteName: 'Un Buen Regalo',
    locale: 'es_ES',
  },
};

export default function CiclismoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
