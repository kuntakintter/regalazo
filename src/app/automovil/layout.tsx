import { Metadata } from 'next';
import { HUB_OG_SNIPPETS, buildSocialMetadata } from '@/lib/ogMetadata';

const snippet = HUB_OG_SNIPPETS.automovil;

export const metadata: Metadata = buildSocialMetadata({
  title: snippet.title,
  socialTitle: snippet.socialTitle,
  description: snippet.description,
  canonicalUrl: 'https://unbuenregalo.vercel.app/automovil',
  imageUrl: snippet.imageUrl,
  imageAlt: snippet.imageAlt,
  keywords: [
    'regalos para amantes de los coches',
    'regalos para el coche',
    'gadgets para el coche',
    'arrancador de baterias noco',
    'dashcam coche delantera trasera',
    'compresor de aire portatil xiaomi',
    'kit de limpieza coche detailing',
  ],
});

export default function AutomovilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
