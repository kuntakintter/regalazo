import { Metadata } from 'next';
import { HUB_OG_SNIPPETS, buildSocialMetadata } from '@/lib/ogMetadata';

const snippet = HUB_OG_SNIPPETS['amantes-del-cafe'];

export const metadata: Metadata = buildSocialMetadata({
  title: snippet.title,
  socialTitle: snippet.socialTitle,
  description: snippet.description,
  canonicalUrl: 'https://www.unbuenregalo.es/amantes-del-cafe',
  imageUrl: snippet.imageUrl,
  imageAlt: snippet.imageAlt,
  keywords: [
    'regalos para amantes del cafe',
    'regalos barista cafe de especialidad',
    'cafetera moka bialetti express',
    'molinillo cafe timemore c3',
    'taza termica stanley trigger action',
    'espumador de leche severin',
  ],
});

export default function CafeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
