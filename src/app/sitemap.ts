import { MetadataRoute } from 'next';
import { SEO_AGE_ROUTES, getSubcategorySlugMap } from '@/lib/seoRoutes';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://regalazo.vercel.app';

  // 1. Root Homepage
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
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
