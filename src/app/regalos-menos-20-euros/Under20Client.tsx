'use client';

import PersonaHubView from '@/components/PersonaHubView';

export default function Under20Client({ omitSchema = false }: { omitSchema?: boolean }) {
  return (
    <PersonaHubView
      hubSlug="regalos-menos-20-euros"
      personaKey="under20"
      themeAccent="emerald"
      omitSchema={omitSchema}
    />
  );
}
