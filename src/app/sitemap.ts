import { MetadataRoute } from 'next';
import { AGE_CATEGORIES } from '@/data/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://regalaconacierto.es';

  const categoryEntries = AGE_CATEGORIES.map((cat) => ({
    url: `${baseUrl}/#${cat.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    ...categoryEntries,
  ];
}
