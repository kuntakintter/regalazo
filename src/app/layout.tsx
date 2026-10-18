import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ideas de Regalo para Niños, Niñas y Adolescentes (0 a 18 Años) | RegalaConAcierto',
  description: 'Encuentra el regalo perfecto para recién nacidos, niños y jóvenes de 0 a 18 años. Desde tartas de pañales originales y juguetes Montessori hasta videojuegos de PS5 y moda emo aesthetic. Recomendaciones verificadas de Amazon España.',
  keywords: [
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
  authors: [{ name: 'RegalaConAcierto Equipo Editorial' }],
  creator: 'RegalaConAcierto',
  publisher: 'RegalaConAcierto',
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
    url: 'https://regalaconacierto.es',
    siteName: 'RegalaConAcierto.es',
    title: 'Guía de Regalos para Bebés, Niños y Jóvenes (0-18 Años)',
    description: 'Recomendaciones curadas y contrastadas de Amazon España para acertar siempre con tu regalo.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&h=630&q=80',
        width: 1200,
        height: 630,
        alt: 'Regalos recomendados para niños y adolescentes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ideas de Regalo para Niños y Jóvenes (0 a 18 Años)',
    description: 'Guía definitiva con recomendaciones verificadas de Amazon España.',
  },
  alternates: {
    canonical: 'https://regalaconacierto.es',
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
    name: 'RegalaConAcierto',
    url: 'https://regalaconacierto.es',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://regalaconacierto.es/?q={search_term_string}',
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
      </body>
    </html>
  );
}
