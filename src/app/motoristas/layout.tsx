import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mejores Regalos para Motoristas (2026) | Cascos, Chaquetas, Guantes y Accesorios',
  description:
    'Guía experta de regalos para moteros: cascos modulares e integrales ECE 22.06, chaquetas Alpinestars y Dainese, guantes térmicos, intercomunicadores Cardo y candados antirrobo con alarma. Catálogo verificado en Amazon España.',
  keywords: [
    'regalos para motoristas',
    'regalos moteros',
    'cascos de moto para regalar',
    'casco moto modular doble visera',
    'chaquetas moto impermeables alpinestars',
    'guantes moto homologados dainese',
    'intercomunicador moto bluetooth cardo',
    'candado disco moto alarma',
  ],
  alternates: {
    canonical: 'https://unbuenregalo.vercel.app/motoristas',
  },
  openGraph: {
    title: 'Mejores Regalos para Motoristas (2026) | Un Buen Regalo',
    description:
      'Cascos, chaquetas, guantes homologados, intercomunicadores y candados antirrobo con las mejores opiniones de Amazon España.',
    url: 'https://unbuenregalo.vercel.app/motoristas',
    type: 'website',
    siteName: 'Un Buen Regalo',
    locale: 'es_ES',
  },
};

export default function MotoristasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
