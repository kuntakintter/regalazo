import { Metadata } from 'next';
import { HUB_OG_SNIPPETS, buildSocialMetadata } from '@/lib/ogMetadata';

const snippet = HUB_OG_SNIPPETS['regalos-gta-6'];

export const metadata: Metadata = buildSocialMetadata({
  title: snippet.title,
  socialTitle: snippet.socialTitle,
  description: snippet.description,
  canonicalUrl: 'https://www.unbuenregalo.es/regalos-gta-6',
  imageUrl: snippet.imageUrl,
  imageAlt: snippet.imageAlt,
  keywords: [
    'un buen regalo gta vi',
    'un buen regalo gta 6',
    'un buen regalo para un fan de gta 6',
    'regalo gta 6',
    'regalos gta 6',
    'regalos gta vi',
    'ideas de regalos gta 6',
    'merchandising gta 6',
    'merchandising gta vi',
    'grand theft auto 6 regalos',
    'ideas regalo fan gta vi',
    'camisetas gta 6 vice city',
    'luces neon vice city setup',
    'mando ps5 gta 6 nova pink',
    'accesorios setup gamer gta 6',
    'tarjetas regalo ps5 gta vi',
    'reserva gta 6 amazon espana',
  ],
});

export default function RegalosGta6Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
