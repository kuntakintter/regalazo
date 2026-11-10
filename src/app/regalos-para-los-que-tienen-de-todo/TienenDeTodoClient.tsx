'use client';

import PersonaHubView from '@/components/PersonaHubView';

export default function TienenDeTodoClient({ omitSchema = false }: { omitSchema?: boolean }) {
  return (
    <PersonaHubView
      hubSlug="regalos-para-los-que-tienen-de-todo"
      personaKey="tienenDeTodo"
      themeAccent="purple"
      omitSchema={omitSchema}
    />
  );
}
