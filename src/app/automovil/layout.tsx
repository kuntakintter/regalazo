import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mejores Regalos para Amantes de los Coches (2026) | Dashcams, Gadgets y Detailing',
  description:
    'Descubre las mejores ideas de regalo para amantes del motor y del automóvil: arrancadores de batería NOCO, cámaras dashcam 70mai, compresores digitales Xiaomi y kits de detailing Meguiar\'s. Catálogo verificado en Amazon España.',
  keywords: [
    'regalos para amantes de los coches',
    'regalos para el coche',
    'gadgets para el coche',
    'arrancador de baterias noco',
    'dashcam coche delantera trasera',
    'compresor de aire portatil xiaomi',
    'kit de limpieza coche detailing'
  ],
  alternates: {
    canonical: 'https://unbuenregalo.vercel.app/automovil',
  },
  openGraph: {
    title: 'Mejores Regalos para Amantes del Automóvil (2026) | Un Buen Regalo',
    description:
      'Arrancadores, dashcams, diagnosis OBD2 y detailing con las mejores opiniones de Amazon España.',
    url: 'https://unbuenregalo.vercel.app/automovil',
    type: 'website',
    siteName: 'Un Buen Regalo',
    locale: 'es_ES',
  },
};

export default function AutomovilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
