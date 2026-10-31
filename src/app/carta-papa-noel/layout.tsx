import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '🎅 Carta a Papá Noel 2026 Online: Escribir, Rellenar e Imprimir | Un Buen Regalo',
  description: 'Escribe tu carta mágica a Papá Noel online con buzón mágico al Polo Norte. Catálogo con más de 370 juguetes: LEGO, coches eléctricos, minimotos, quads, patinetes, gaming y cascos de seguridad.',
  keywords: [
    'carta a papa noel online',
    'carta para papa noel para rellenar',
    'carta papa noel para imprimir',
    'escribir carta a papa noel',
    'catalogo de juguetes navidad 2026',
    'juguetes navidad 2026',
    'coches electricos para niños',
    'coches a bateria niños lamborghini mercedes',
    'minimotos infantiles 49cc',
    'pocket bikes',
    'miniquads para niños',
    'patinetes electricos niños',
    'cascos motocross infantil y rodilleras',
    'juegos de mesa navidad',
    'buzon magico polo norte',
  ],
  alternates: {
    canonical: 'https://www.unbuenregalo.es/carta-papa-noel',
  },
  openGraph: {
    title: '🎅 Carta Oficial a Papá Noel 2026: Escribe, Rellena y Envía al Polo Norte',
    description: 'Carta interactiva a Papá Noel con sobre de correo aéreo y catálogo de más de 370 juguetes: coches eléctricos, minimotos, LEGO, patinetes y videojuegos.',
    url: 'https://www.unbuenregalo.es/carta-papa-noel',
    siteName: 'Un Buen Regalo',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: 'https://www.unbuenregalo.es/icon.png',
        width: 512,
        height: 512,
        alt: 'Carta Mágica a Papá Noel Un Buen Regalo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '🎅 Carta Oficial a Papá Noel 2026 | Un Buen Regalo',
    description: 'Escribe y envía tu carta mágica a Laponia con más de 370 juguetes y vehículos sobre ruedas.',
    images: ['https://www.unbuenregalo.es/icon.png'],
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

export default function CartaPapaNoelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdWebApplication = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Carta Mágica a Papá Noel Online - Correo Oficial del Polo Norte',
    url: 'https://www.unbuenregalo.es/carta-papa-noel',
    applicationCategory: 'EntertainmentApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    inLanguage: 'es-ES',
    description: 'Aplicación web interactiva para que los niños redacten su carta manuscrita a Papá Noel, seleccionen sus juguetes del catálogo oficial y la envíen al buzón mágico de Laponia.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
  };

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cómo escribir y enviar la carta a Papá Noel online?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Escribe el nombre del peque, su edad y cómo se ha portado este año directamente en el papel pautado escolar de la carta. Después, explora la revista interactiva con más de 370 juguetes organizados por edades y categorías, pulsa en "Pedir deseo" para pegar los recortes en la carta y pulsa en "Echar mi carta al Buzón Mágico del Polo Norte" para ver la animación de envío a Laponia y recibir la respuesta de Papá Noel.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué tipo de juguetes incluye el catálogo de Navidad 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El catálogo incluye más de 370 juguetes divididos en 11 categorías con 34 productos cada una: Sobre Ruedas & Motor (coches eléctricos Lamborghini y Mercedes con mando, minimotos de cross 49cc, pocket bikes de circuito, quads y patinetes eléctricos), Cascos & Seguridad (cascos de motocross homologados, petos, rodilleras y coderas), LEGO & Construcción, Coches & Pistas Hot Wheels y Scalextric, Muñecas & Peluches, Gaming & Robótica, Juegos de Mesa, Arte & Dibujo, Cuentos & Cómics, Deportes & Aire Libre y Bebés & Montessori.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Se puede imprimir la carta a Papá Noel para dejarla con las galletas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí. Una vez enviada la carta al Polo Norte, se genera un botón oficial para imprimir la carta con los deseos pegados, perfecta para dejarla en el salón la noche de Nochebuena junto al vaso de leche, las galletas y las zanahorias para los renos.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cómo pueden los padres gestionar la lista de deseos en Amazon?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Al completar el envío, aparece una zona discreta exclusiva para padres donde pueden añadir todos los deseos seleccionados en la carta directamente a la cesta de Amazon en un solo clic, o compartir la lista completa por WhatsApp de forma privada.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué vehículos sobre ruedas y medidas de seguridad se recomiendan para niños?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Para niños de 3 a 6 años se recomiendan coches eléctricos con mando parental de 12V y patinetes de 3 ruedas con casco y luces LED. Para niños a partir de 7 años, minimotos de cross infantiles y quads siempre acompañados de su correspondiente equipamiento de seguridad: casco integral homologado de cross, peto protector con espaldera, rodilleras y coderas articuladas con carcasa rígida y guantes antideslizantes.',
        },
      },
    ],
  };

  const jsonLdBreadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: 'https://www.unbuenregalo.es',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Carta a Papá Noel 2026',
        item: 'https://www.unbuenregalo.es/carta-papa-noel',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebApplication) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbs) }}
      />
      {children}
    </>
  );
}
