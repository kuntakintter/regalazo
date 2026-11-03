import { MetadataRoute } from 'next';
import { SEO_AGE_ROUTES, getSubcategorySlugMap } from '@/lib/seoRoutes';
import { I18N_SEO_ROUTES, getHreflangAlternates } from '@/lib/i18nRoutes';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.unbuenregalo.es';
  const hreflangLanguages = getHreflangAlternates();

  // 1. Root Homepage & Specialized Niche Hubs
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: hreflangLanguages,
      },
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
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/navidad`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/carta-papa-noel`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/regalos-gta-6`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/que-regalar-a-un-hombre`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.98,
    },
    {
      url: `${baseUrl}/que-regalar-a-una-mujer`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.98,
    },
    {
      url: `${baseUrl}/que-regalar-a-mi-novio`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.98,
    },
    {
      url: `${baseUrl}/que-regalar-a-mi-novia`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.98,
    },
    {
      url: `${baseUrl}/regalos-para-los-que-tienen-de-todo`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/regalos-menos-20-euros`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/votar`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // 2. International Language & Currency Landing Pages (/en, /de, /fr, /it, /pt, /ru, /es-us, etc.)
  for (const i18nRoute of Object.values(I18N_SEO_ROUTES)) {
    routes.push({
      url: `${baseUrl}/${i18nRoute.slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
      alternates: {
        languages: hreflangLanguages,
      },
    });
  }

  // 3. Age Landing Pages (e.g. /bebes-0-a-12-meses, /ninos-1-a-3-anos...)
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
