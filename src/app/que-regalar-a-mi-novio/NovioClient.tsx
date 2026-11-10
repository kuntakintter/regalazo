'use client';

import PersonaHubView from '@/components/PersonaHubView';

export default function NovioClient({ omitSchema = false }: { omitSchema?: boolean }) {
  return (
    <PersonaHubView
      hubSlug="que-regalar-a-mi-novio"
      personaKey="novio"
      themeAccent="indigo"
      parentBreadcrumbSlug="que-regalar-a-un-hombre"
      omitSchema={omitSchema}
    />
  );
}
