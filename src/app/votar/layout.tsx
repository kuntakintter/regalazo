import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Un Buen Regalo 🗳️ Votación de Regalos en Grupo por WhatsApp: Elegir Regalo entre Amigos',
  description:
    '¿Caos en el grupo de WhatsApp para decidir qué regalar? Selecciona tus ideas favoritas, comparte el enlace único y votad en tiempo real el regalo ganador. Gratis y sin registro.',
  keywords: [
    'votar regalo en grupo por whatsapp',
    'elegir regalo en grupo por whatsapp',
    'votar regalo en grupo',
    'elegir regalo entre amigos',
    'encuesta regalo cumpleaños whatsapp',
    'regalo conjunto amigos',
    'como decidir regalo en grupo',
    'votacion regalos online',
    'organizar regalo en grupo',
    'encuesta para elegir regalo',
    'regalo en comun amigos',
    'un buen regalo votar',
  ],
  alternates: {
    canonical: 'https://www.unbuenregalo.es/votar',
  },
  openGraph: {
    title: '🗳️ ¡Vota el Regalo en Grupo! Elige tu opción favorita aquí',
    description:
      'Hemos preseleccionado los mejores regalos finalistas. Entra al enlace, mira precios reales y vota tu favorito en 1 clic sin registrarte.',
    url: 'https://www.unbuenregalo.es/votar',
    siteName: 'Un Buen Regalo',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1200&h=630&q=80',
        width: 1200,
        height: 630,
        alt: 'Votación de Regalos en Grupo por WhatsApp - Un Buen Regalo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '🗳️ Votación de Regalos en Grupo por WhatsApp | Un Buen Regalo',
    description:
      'Se acabó discutir en el grupo de WhatsApp: elige candidatos, comparte el link y votad el regalo ganador.',
    images: [
      'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1200&h=630&q=80',
    ],
  },
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
};

export default function VotarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Votación de Regalos en Grupo - Un Buen Regalo',
    url: 'https://www.unbuenregalo.es/votar',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    description:
      'Herramienta gratuita online para crear encuestas de regalos entre amigos, familiares o compañeros de trabajo y votar por WhatsApp sin registro.',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cómo funciona la votación de regalos en grupo por WhatsApp?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Solo tienes que pulsar el icono del corazón o el botón de votar en hasta 6 productos del catálogo de Un Buen Regalo, escribir el nombre del destinatario y pulsar "Compartir en WhatsApp". Tus amigos podrán votar su opción favorita en un clic sin registrarse.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Es gratis crear una encuesta de regalos en grupo?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, es 100% gratuito y no requiere descargar ninguna app ni crear cuentas de usuario.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
