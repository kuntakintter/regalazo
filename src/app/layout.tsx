import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import CookieBanner from '@/components/CookieBanner';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { VotingProvider } from '@/context/VotingContext';
import VotingDrawer from '@/components/VotingDrawer';

export const metadata: Metadata = {
  title: 'Un Buen Regalo 【Guía 2026】 Ideas de Regalo para Todas las Edades',
  description: '¿No sabes qué regalar? Descubre las mejores ideas de regalo para bebés, niños, jóvenes y adultos con opiniones reales y ofertas de Amazon España. ¡Acierta seguro!',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  keywords: [
    'un buen regalo',
    'ideas de regalo',
    'ideas de regalo para ninos',
    'regalos recien nacido originales',
    'tarta de panales personalizada',
    'juguetes montessori',
    'regalos adolescentes 16 anos',
    'regalos adultos originales',
    'regalos mayores de 18 anos',
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
    url: 'https://www.unbuenregalo.es',
    siteName: 'Un Buen Regalo',
    title: 'Un Buen Regalo | Guía de Regalos de 0 a más de 18 Años',
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
    title: 'Un Buen Regalo | Ideas de Regalo de 0 a más de 18 Años',
    description: 'Guía definitiva con recomendaciones verificadas de Amazon España.',
    images: ['https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&h=630&q=80'],
  },
  alternates: {
    canonical: 'https://www.unbuenregalo.es',
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
    url: 'https://www.unbuenregalo.es',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.unbuenregalo.es/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="es" className="scroll-smooth">
      <head>
        {/* Google Analytics 4 (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-YVZTK194QQ"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YVZTK194QQ');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <meta name="theme-color" content="#4f46e5" />
        <meta name="msvalidate.01" content="4AF0EBAFECCF6A3AA51203D44DE90AD6" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon-192.png" type="image/png" sizes="192x192" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* Google Translate Integration */}
        <Script
          id="google-translate-init"
          strategy="afterInteractive"
        >
          {`
            function googleTranslateElementInit() {
              if (window.google && window.google.translate) {
                new window.google.translate.TranslateElement({
                  pageLanguage: 'es',
                  autoDisplay: false
                }, 'google_translate_element');
              }
            }
          `}
        </Script>
        <Script
          id="google-translate-script"
          strategy="afterInteractive"
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        />
      </head>
      <body className="antialiased font-sans selection:bg-indigo-500 selection:text-white">
        <div id="google_translate_element" style={{ display: 'none' }} />
        <CurrencyProvider>
          <VotingProvider>
            {children}
            <VotingDrawer />
            <CookieBanner />
          </VotingProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
