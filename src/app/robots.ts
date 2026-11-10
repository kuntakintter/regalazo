import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/*?categoria=*',
        '/*?cat=*',
        '/*?serie=*',
        '/*?q=*',
        '/*?search=*',
        '/*?query=*',
      ],
    },
    sitemap: 'https://www.unbuenregalo.es/sitemap.xml',
  };
}
