import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-jakarta',
});
import CookieBanner from '@/components/CookieBanner';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { VotingProvider } from '@/context/VotingContext';
import VotingDrawer from '@/components/VotingDrawer';
import FloatingVotingBar from '@/components/FloatingVotingBar';
import AnalyticsAndSeoBooster from '@/components/AnalyticsAndSeoBooster';
import { getHreflangAlternates, I18N_SEO_ROUTES } from '@/lib/i18nRoutes';

export const metadata: Metadata = {
  title: 'Un Buen Regalo 【2026】 ¿Qué Regalar? Ideas y Regalos Originales',
  description: '¿No sabes qué regalar? Descubre en Un Buen Regalo ideas de regalo originales para bebés, niños, jóvenes y adultos con votación en grupo por WhatsApp.',
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
    'los 10 mejores regalos',
    'los 10 mejores productos',
    'comparativa mejores regalos',
    'ranking mejores regalos 2026',
    'top 10 regalos originales',
    'a good gift',
    'top 10 best gifts',
    'best gift ideas',
    'what to gift',
    'original gifts',
    'group gift voting',
    'regalo',
    'regalos',
    'regalar',
    'que regalar',
    'regalazo',
    'regalazos',
    'regalo sorpresa',
    'sorpresa original',
    'detalles originales',
    'obsequios',
    'ideas para regalar',
    'regalos originales',
    'regalos de cumpleanos',
    'regalos amigo invisible',
    'que regalar a un hombre',
    'que regalar a una mujer',
    'que regalar a mi novio',
    'que regalar a mi novia',
    'un buen regalo gta vi',
    'un buen regalo gta 6',
    'regalos gta 6',
    'regalos gta vi',
    'carta a papa noel online',
    'votar regalo en grupo',
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
    'que regalar a un nino'
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
    alternateLocale: ['en_US', 'en_GB', 'es_MX', 'es_AR', 'es_CO', 'fr_FR', 'de_DE', 'it_IT', 'pt_PT'],
    url: 'https://www.unbuenregalo.es',
    siteName: 'Un Buen Regalo | A Good Gift',
    title: '🎁 Un Buen Regalo | ¿Qué Regalar? Ideas y Regalos Originales',
    description: 'Encuentra el regalo perfecto en segundos para cualquier edad y ocasión, con buscador inteligente y votación en grupo por WhatsApp.',
    images: [
      {
        url: 'https://www.unbuenregalo.es/og-cover.png',
        width: 1200,
        height: 630,
        alt: 'Un Buen Regalo - Ideas de Regalo y Comparativas Top 10 (unbuenregalo.es)',
      },
      {
        url: 'https://www.unbuenregalo.es/logo-square.png',
        width: 1024,
        height: 1024,
        alt: 'Logo Oficial Un Buen Regalo (unbuenregalo.es)',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '🎁 Un Buen Regalo | ¿Qué Regalar? Ideas y Regalos Originales',
    description: 'Guía global de ideas de regalo originales para todas las edades y votación en grupo por WhatsApp.',
    images: ['https://www.unbuenregalo.es/og-cover.png'],
  },
  other: {
    thumbnail: 'https://www.unbuenregalo.es/logo-square.png',
    'p:domain_verify': '59f5c86d8219a56b73b7dd6ccedde7c1',
  },
  alternates: {
    canonical: 'https://www.unbuenregalo.es',
    languages: getHreflangAlternates(),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Website, Organization & SiteNavigationElement JSON-LD Schema for Google Sitelinks
  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://www.unbuenregalo.es/#website',
        name: 'Un Buen Regalo',
        alternateName: [
          'A Good Gift',
          'Ein Gutes Geschenk',
          'Un Bon Cadeau',
          'Un Buon Regalo',
          'Um Bom Presente',
          'Хороший Подарок',
          'Een Goed Cadeau',
          'Dobry Prezent',
          '好礼物',
          '良いプレゼント',
          'هدية جيدة',
          '좋은 선물',
          'एक अच्छा उपहार',
          'UnBuenRegalo.es',
          'Qué Regalar',
          'Best Gift Ideas & Group Gift Voting',
        ],
        url: 'https://www.unbuenregalo.es',
        dateModified: new Date().toISOString().split('T')[0],
        inLanguage: ['es', ...Object.values(I18N_SEO_ROUTES).map((r) => r.hreflang)],
        description:
          '¿No sabes qué regalar? Descubre en Un Buen Regalo (A Good Gift) ideas de regalo originales para bebés, niños, jóvenes y adultos en todo el mundo (€ EUR / $ USD).',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://www.unbuenregalo.es/?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        '@id': 'https://www.unbuenregalo.es/#organization',
        name: 'Un Buen Regalo',
        alternateName: ['A Good Gift', 'Regalazo', 'UnBuenRegalo'],
        url: 'https://www.unbuenregalo.es',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.unbuenregalo.es/logo-square.png',
          width: 1024,
          height: 1024,
        },
        image: [
          'https://www.unbuenregalo.es/logo-square.png',
          'https://www.unbuenregalo.es/og-cover.png',
          'https://www.unbuenregalo.es/icon.png',
        ],
        sameAs: [
          'https://www.instagram.com/un_buen_regalo/',
          'https://www.youtube.com/@CosascuriosasXIII',
          'https://es.pinterest.com/unbuenregalo/',
          'https://www.tiktok.com/@unbuenregalo',
        ],
      },
      {
        '@type': 'SiteNavigationElement',
        '@id': 'https://www.unbuenregalo.es/#nav-reacondicionados',
        position: 1,
        name: 'Reacondicionados Amazon (-50%)',
        description: 'iPhones, iPads, portátiles y cafeteras 100% funcionales con 1 año de Garantía Oficial Amazon Renewed.',
        url: 'https://www.unbuenregalo.es/reacondicionados',
      },
      {
        '@type': 'SiteNavigationElement',
        '@id': 'https://www.unbuenregalo.es/#nav-black-friday',
        position: 2,
        name: 'Ofertas Black Friday 2026',
        description: 'Buscador en vivo de chollos reales en Amazon ordenados de mayor a menor porcentaje de descuento.',
        url: 'https://www.unbuenregalo.es/black-friday',
      },
      {
        '@type': 'SiteNavigationElement',
        '@id': 'https://www.unbuenregalo.es/#nav-hombre',
        position: 3,
        name: 'Qué Regalar a un Hombre',
        description: 'Más de 60 ideas de regalo originales para hombres desde 12 €: gadgets, motor, café y experiencias.',
        url: 'https://www.unbuenregalo.es/que-regalar-a-un-hombre',
      },
      {
        '@type': 'SiteNavigationElement',
        '@id': 'https://www.unbuenregalo.es/#nav-mujer',
        position: 4,
        name: 'Qué Regalar a una Mujer',
        description: 'Ideas de regalo originales y sorprendentes para mujeres desde 12 € clasificadas por gustos y presupuesto.',
        url: 'https://www.unbuenregalo.es/que-regalar-a-una-mujer',
      },
      {
        '@type': 'SiteNavigationElement',
        '@id': 'https://www.unbuenregalo.es/#nav-menos20',
        position: 5,
        name: 'Regalos por Menos de 20 Euros',
        description: 'Detalles originales, útiles y divertidos para Amigo Invisible, cumpleaños y Navidad por menos de 20 €.',
        url: 'https://www.unbuenregalo.es/regalos-menos-20-euros',
      },
      {
        '@type': 'SiteNavigationElement',
        '@id': 'https://www.unbuenregalo.es/#nav-navidad',
        position: 6,
        name: 'Navidad y Reyes 2026',
        description: 'Guía oficial de regalos de Navidad, Reyes Magos, calendarios de adviento y decoración navideña.',
        url: 'https://www.unbuenregalo.es/navidad',
      },
      {
        '@type': 'SiteNavigationElement',
        '@id': 'https://www.unbuenregalo.es/#nav-carta',
        position: 7,
        name: 'Carta Oficial a Papá Noel',
        description: 'Escribe, personaliza e imprime gratis la carta interactiva a Papá Noel con más de 370 juguetes.',
        url: 'https://www.unbuenregalo.es/carta-papa-noel',
      },
      {
        '@type': 'SiteNavigationElement',
        '@id': 'https://www.unbuenregalo.es/#nav-votar',
        position: 8,
        name: 'Votar Regalo por WhatsApp',
        description: 'Elige varios regalos candidatos y crea una encuesta gratuita en 1 clic para votar con amigos en WhatsApp.',
        url: 'https://www.unbuenregalo.es/votar',
      },
      {
        '@type': 'SiteNavigationElement',
        '@id': 'https://www.unbuenregalo.es/#nav-competicion',
        position: 9,
        name: 'Mundo de la Competición y F1',
        description: 'Merchandising oficial de Fórmula 1, MotoGP, volantes Simracing, circuitos Scalextric y maquetas.',
        url: 'https://www.unbuenregalo.es/competicion',
      },
      {
        '@type': 'SiteNavigationElement',
        '@id': 'https://www.unbuenregalo.es/#nav-gaming',
        position: 10,
        name: 'Regalos Gaming y Setup',
        description: 'Auriculares, ratones, teclados mecánicos, iluminación RGB y accesorios para PC, PS5 y consolas.',
        url: 'https://www.unbuenregalo.es/gaming',
      },
      {
        '@type': 'SiteNavigationElement',
        '@id': 'https://www.unbuenregalo.es/#nav-motoristas',
        position: 11,
        name: 'Regalos para Motoristas',
        description: 'Cascos, intercomunicadores Bluetooth, guantes homologados y equipamiento para amantes de las motos.',
        url: 'https://www.unbuenregalo.es/motoristas',
      },
      {
        '@type': 'SiteNavigationElement',
        '@id': 'https://www.unbuenregalo.es/#nav-cafe',
        position: 12,
        name: 'Amantes del Café Barista',
        description: 'Cafeteras espresso, molinillos, cafeteras italianas, tazas térmicas y accesorios barista.',
        url: 'https://www.unbuenregalo.es/amantes-del-cafe',
      },
    ],
  };

  const speculationRulesJson = {
    prefetch: [
      {
        where: {
          and: [
            { href_matches: '/*' },
            { not: { href_matches: '/api/*' } },
            { not: { href_matches: '/feed/*' } },
          ],
        },
        eagerness: 'moderate',
      },
    ],
  };

  return (
    <html lang="es" className={`scroll-smooth ${plusJakartaSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://m.media-amazon.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <script
          type="speculationrules"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(speculationRulesJson) }}
        />
        <meta name="theme-color" content="#4f46e5" />
        <meta name="msvalidate.01" content="4AF0EBAFECCF6A3AA51203D44DE90AD6" />
        <meta name="p:domain_verify" content="59f5c86d8219a56b73b7dd6ccedde7c1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon-192.png" type="image/png" sizes="192x192" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={`${plusJakartaSans.className} antialiased font-sans selection:bg-indigo-500 selection:text-white`}>
        {/* Google Analytics 4 (gtag.js) — Automated crawlers, headless browsers and preview bots are excluded so GA4 metrics reflect real human visitors only */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-YVZTK194QQ"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            (function() {
              var ua = (typeof navigator !== 'undefined' && navigator.userAgent) ? navigator.userAgent : '';
              var isAutomatedBot =
                (typeof navigator !== 'undefined' && navigator.webdriver === true) ||
                /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|inspect|gptbot|chatgpt|claudebot|perplexity|facebookexternalhit|pinterest|whatsapp|telegrambot|discordbot|twitterbot|Applebot|bingpreview/i.test(ua);
              if (isAutomatedBot) {
                window['ga-disable-G-YVZTK194QQ'] = true;
                return;
              }
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', 'G-YVZTK194QQ');
            })();
          `}
        </Script>

        <AnalyticsAndSeoBooster />
        <CurrencyProvider>
          <VotingProvider>
            {children}
            <VotingDrawer />
            <FloatingVotingBar />
            <CookieBanner />
          </VotingProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
