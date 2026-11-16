import { Metadata } from 'next';
import CompeticionView from '@/components/hubs/CompeticionView';
import { buildSocialMetadata, HUB_OG_SNIPPETS } from '@/lib/ogMetadata';

export const metadata: Metadata = buildSocialMetadata({
  title: HUB_OG_SNIPPETS.competicion.title,
  socialTitle: HUB_OG_SNIPPETS.competicion.socialTitle,
  description: HUB_OG_SNIPPETS.competicion.description,
  canonicalUrl: 'https://www.unbuenregalo.es/competicion',
  routePath: '/competicion',
  imageUrl: HUB_OG_SNIPPETS.competicion.imageUrl,
  imageAlt: HUB_OG_SNIPPETS.competicion.imageAlt,
  keywords: [
    'regalos de carreras',
    'regalos competicion',
    'regalos f1',
    'regalos formula 1',
    'regalos motogp',
    'regalos fernando alonso',
    'regalos scalextric',
    'volantes simracing',
    'regalos amantes del motor',
    'merchandising f1 oficial',
    'un buen regalo competicion',
  ],
});

export default function CompeticionPage() {
  return <CompeticionView />;
}
