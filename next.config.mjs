/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
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
    ];
  },
};

export default nextConfig;
