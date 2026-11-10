/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  htmlLimitedBots: /.*/,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
      {
        protocol: 'https',
        hostname: 'images-na.ssl-images-amazon.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY', // Anti-Clickjacking: impide que nadie embeba tu web en iframes para robar tráfico o clics
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff', // Anti-MIME sniffing: protege contra inyección de scripts maliciosos
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin', // Referrer seguro para garantizar la atribución en Amazon
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()', // Bloquea acceso a sensores innecesarios
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/regalos-para-mi-novio',
        destination: '/que-regalar-a-mi-novio',
        permanent: true,
      },
      {
        source: '/regalos-novio',
        destination: '/que-regalar-a-mi-novio',
        permanent: true,
      },
      {
        source: '/regalos-para-mi-novia',
        destination: '/que-regalar-a-mi-novia',
        permanent: true,
      },
      {
        source: '/regalos-novia',
        destination: '/que-regalar-a-mi-novia',
        permanent: true,
      },
      {
        source: '/regalos-para-hombres',
        destination: '/que-regalar-a-un-hombre',
        permanent: true,
      },
      {
        source: '/regalos-hombre',
        destination: '/que-regalar-a-un-hombre',
        permanent: true,
      },
      {
        source: '/regalos-para-mujeres',
        destination: '/que-regalar-a-una-mujer',
        permanent: true,
      },
      {
        source: '/regalos-mujer',
        destination: '/que-regalar-a-una-mujer',
        permanent: true,
      },
      {
        source: '/gta-6',
        destination: '/regalos-gta-6',
        permanent: true,
      },
      {
        source: '/gta-vi',
        destination: '/regalos-gta-6',
        permanent: true,
      },
      {
        source: '/regalos-gta-vi',
        destination: '/regalos-gta-6',
        permanent: true,
      },
      {
        source: '/gta6',
        destination: '/regalos-gta-6',
        permanent: true,
      },
      {
        source: '/gtavi',
        destination: '/regalos-gta-6',
        permanent: true,
      },
      {
        source: '/adolescentes-13-a-15-anos',
        destination: '/jovenes-13-a-15-anos',
        permanent: true,
      },
      {
        source: '/votacion-en-grupo',
        destination: '/votar',
        permanent: true,
      },
      {
        source: '/regalos-15-a-30-euros',
        destination: '/regalos-de-15-a-30-euros',
        permanent: true,
      },
      {
        source: '/regalos-30-a-60-euros',
        destination: '/regalos-de-30-a-60-euros',
        permanent: true,
      },
      {
        source: '/regalos-20-a-50-euros',
        destination: '/regalos-de-20-a-50-euros',
        permanent: true,
      },
      {
        source: '/regalos-50-a-100-euros',
        destination: '/regalos-de-50-a-100-euros',
        permanent: true,
      },
      {
        source: '/coches-electricos-infantiles',
        destination: '/coches-electricos-para-ninos',
        permanent: true,
      },
      {
        source: '/:lang(en|en-gb|es-us|de|fr|it|pt|ru|nl|pl|zh|ja|ar|uk|sv|no|da|fi|el|tr|ro|bg|cs|hu|ko|hi)/regalos-15-a-30-euros',
        destination: '/:lang/regalos-de-15-a-30-euros',
        permanent: true,
      },
      {
        source: '/:lang(en|en-gb|es-us|de|fr|it|pt|ru|nl|pl|zh|ja|ar|uk|sv|no|da|fi|el|tr|ro|bg|cs|hu|ko|hi)/regalos-30-a-60-euros',
        destination: '/:lang/regalos-de-30-a-60-euros',
        permanent: true,
      },
      {
        source: '/:lang(en|en-gb|es-us|de|fr|it|pt|ru|nl|pl|zh|ja|ar|uk|sv|no|da|fi|el|tr|ro|bg|cs|hu|ko|hi)/regalos-20-a-50-euros',
        destination: '/:lang/regalos-de-20-a-50-euros',
        permanent: true,
      },
      {
        source: '/:lang(en|en-gb|es-us|de|fr|it|pt|ru|nl|pl|zh|ja|ar|uk|sv|no|da|fi|el|tr|ro|bg|cs|hu|ko|hi)/regalos-50-a-100-euros',
        destination: '/:lang/regalos-de-50-a-100-euros',
        permanent: true,
      },
      {
        source: '/:lang(en|en-gb|es-us|de|fr|it|pt|ru|nl|pl|zh|ja|ar|uk|sv|no|da|fi|el|tr|ro|bg|cs|hu|ko|hi)/coches-electricos-infantiles',
        destination: '/:lang/coches-electricos-para-ninos',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
