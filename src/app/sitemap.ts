import { MetadataRoute } from 'next';
import { SEO_AGE_ROUTES, getSubcategorySlugMap } from '@/lib/seoRoutes';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.unbuenregalo.es';

  // 1. Root Homepage & Specialized Niche Hubs
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/motoristas`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/automovil`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/ciclismo`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/gaming`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/amantes-del-cafe`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/mascotas`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/halloween`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/navidad`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
  ];

  // 2. Age Landing Pages (e.g. /bebes-0-a-12-meses, /ninos-1-a-3-anos...)
  for (const route of Object.values(SEO_AGE_ROUTES)) {
    routes.push({
      url: `${baseUrl}/${route.ageSlug}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    });

    // 3. Subcategory Landing Pages (e.g. /bebes-0-a-12-meses/cochecitos-y-mobiliario-de-bebe)
    const subcategories = getSubcategorySlugMap(route.ageId);
    for (const sub of subcategories) {
      routes.push({
        url: `${baseUrl}/${route.ageSlug}/${sub.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
  }

  // 4. Mandatory Legal and Compliance Pages for Google & Amazon
  const legalPages = ['aviso-legal', 'politica-de-privacidad', 'politica-de-cookies'];
  for (const page of legalPages) {
    routes.push({
      url: `${baseUrl}/${page}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    });
  }

  return routes;
}
