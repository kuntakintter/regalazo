import { Metadata } from 'next';
import { HUB_OG_SNIPPETS, buildSocialMetadata } from '@/lib/ogMetadata';

const snippet = HUB_OG_SNIPPETS.halloween;

export const metadata: Metadata = buildSocialMetadata({
  title: snippet.title,
  socialTitle: snippet.socialTitle,
  description: snippet.description,
  canonicalUrl: 'https://www.unbuenregalo.es/halloween',
  imageUrl: snippet.imageUrl,
  imageAlt: snippet.imageAlt,
  keywords: [
    'especial halloween 2026',
    'disfraces halloween',
    'decoracion halloween',
    'mascara led purga halloween',
    'arana gigante telarana exterior',
    'disfraz hinchable halloween',
    'guirnalda luces calabaza halloween',
  ],
});

export default function HalloweenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
