import type { Metadata } from 'next';
import './globals.css';
import CookieBanner from '@/components/CookieBanner';

export const metadata: Metadata = {
  title: 'Un Buen Regalo⚡ | Ideas de Regalo para Todas las Edades (0 a +18 Años)',
  description: 'Descubre en Un Buen Regalo las mejores ideas de regalo para recién nacidos, niños, adolescentes y adultos (+18). Desde tartas de pañales hasta videojuegos, robótica, Smartbox y perfumería. Recomendaciones verificadas de Amazon España.',
  keywords: [
    'un buen regalo',
    'ideas de regalo',
    'ideas de regalo para ninos',
    'regalos recien nacido originales',
    'tarta de panales personalizada',
    'juguetes montessori',
    'regalos adolescentes 16 anos',
    'regalos adultos originales',
    'juegos ps5 recomendados',
    'smartbox escapadas',
    'que regalar a un nino',
    'mejores regalos amazon espana'
  ],
  authors: [{ name: 'Un Buen Regalo Editorial' }],
  creator: 'Un Buen Regalo',
  publisher: 'Un Buen Regalo',
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
    url: 'https://unbuenregalo.vercel.app',
    siteName: 'Un Buen Regalo',
    title: 'Un Buen Regalo⚡ | Guía de Regalos de 0 a +18 Años',
    description: 'Encuentra el regalo perfecto en segundos con recomendaciones contrastadas de Amazon España.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&h=630&q=80',
        width: 1200,
        height: 630,
        alt: 'Un Buen Regalo - Recomendaciones de regalos para todas las edades',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Un Buen Regalo⚡ | Ideas de Regalo de 0 a +18 Años',
    description: 'Guía definitiva con recomendaciones verificadas de Amazon España.',
  },
  alternates: {
    canonical: 'https://unbuenregalo.vercel.app',
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
    name: 'Un Buen Regalo',
    url: 'https://unbuenregalo.vercel.app',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://unbuenregalo.vercel.app/?q={search_term_string}',
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
