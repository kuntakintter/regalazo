import type { Metadata } from 'next';
import './globals.css';
import CookieBanner from '@/components/CookieBanner';

export const metadata: Metadata = {
  title: 'Regalazo⚡ | Ideas de Regalo para Niños y Jóvenes (0 a 18 Años)',
  description: 'Descubre en Regalazo las mejores ideas de regalo para recién nacidos, niños y adolescentes de 0 a 18 años. Desde tartas de pañales hasta videojuegos de PS5 y estilo emo/aesthetic. Recomendaciones verificadas de Amazon España.',
  keywords: [
    'regalazo',
    'ideas de regalo para ninos',
    'regalos recien nacido originales',
    'tarta de panales personalizada',
    'juguetes montessori',
    'regalos adolescentes 16 anos',
    'juegos ps5 recomendados',
    'regalos emo aesthetic grunge',
    'que regalar a un nino',
    'mejores regalos infantiles amazon'
  ],
  authors: [{ name: 'Regalazo Editorial' }],
  creator: 'Regalazo',
  publisher: 'Regalazo',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://regalazo.vercel.app',
    siteName: 'Regalazo',
    title: 'Regalazo⚡ | Guía de Regalos de 0 a 18 Años',
    description: 'Encuentra el regalo perfecto en segundos con recomendaciones contrastadas de Amazon España.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&h=630&q=80',
        width: 1200,
        height: 630,
        alt: 'Regalazo - Recomendaciones de regalos para niños y jóvenes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Regalazo⚡ | Ideas de Regalo de 0 a 18 Años',
    description: 'Guía definitiva con recomendaciones verificadas de Amazon España.',
  },
  alternates: {
    canonical: 'https://regalazo.vercel.app',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Website JSON-LD Schema
  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Regalazo',
    url: 'https://regalazo.vercel.app',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://regalazo.vercel.app/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <meta name="theme-color" content="#4f46e5" />
      </head>
      <body className="antialiased font-sans selection:bg-indigo-500 selection:text-white">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
