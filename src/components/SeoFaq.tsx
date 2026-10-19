'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: '¿Qué regalar a un recién nacido que resulte realmente útil para los padres?',
    answer: 'El regalo más agradecido e indiscutible para los padres primerizos son las tartas de pañales de calidad (como Dodot Sensitive) combinadas con productos de primera necesidad: muselinas de bambú, cremas calmantes de caléndula, doudous de apego y recuerdos como marcos de huellas en arcilla atóxica. Los pañales suponen el mayor gasto mensual durante el primer año, por lo que una presentación bonita y artesanal une utilidad y emoción.'
  },
  {
    question: '¿Qué ideas de regalo triunfan con adolescentes de 16 a 18 años que buscan estilo propio y personalidad?',
    answer: 'Los jóvenes de 16 a 18 años valoran los detalles con personalidad propia: velas aromáticas WoodWick con mecha de madera crujiente, diarios encuadernados en cuero vintage con hojas de pergamino, auriculares de alta fidelidad, iluminación ambiental neón y fragancias icónicas como CK One. Son regalos que conectan de verdad con sus gustos e identidad.'
  },
  {
    question: '¿Cuáles son los mejores juegos y accesorios de PS5 para regalar a chicos y chicas?',
    answer: 'Para PlayStation 5, los grandes referentes son Marvel\'s Spider-Man 2 (aventura y gráficos deslumbrantes para todos los públicos), EA SPORTS FC 25 (el rey de las reuniones con amigos) y obras maestras como Elden Ring para jugadores experimentados. En accesorios, el mando DualSense Edge o unos auriculares inalámbricos 7.1 con cancelación de ruido marcan la diferencia competitiva.'
  },
  {
    question: '¿Por qué elegir juguetes Montessori para niños de 1 a 3 años?',
    answer: 'El método Montessori prioriza materiales nobles como la madera maciza frente al plástico estridente con luces pasivas. Juguetes como la torre de aprendizaje, la tabla curva de equilibrio o los bloques sensoriales fomentan la autonomía, el pensamiento abstracto y la motricidad fina, permitiendo que el niño sea el protagonista activo del juego.'
  },
  {
    question: '¿Son seguros los enlaces de recomendación a Amazon y qué comisiones se aplican?',
    answer: 'Absolutamente. Todos los productos recomendados enlazan de forma directa y oficial a Amazon España (StoreID: vapegadgets22-21). Las compras cuentan con la garantía total de Amazon: devoluciones sin coste, pago seguro cifrado y envíos rápidos con Amazon Prime. El precio para ti es exactamente el mismo (no pagas ni un céntimo de más); la pequeña comisión de afiliado nos ayuda a mantener actualizada y gratuita esta guía de recomendaciones.'
  }
];

interface SeoFaqProps {
  currentTheme: string;
}

export default function SeoFaq({ currentTheme }: SeoFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Structured Data JSON-LD for Google Rich Results
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section className={`rounded-3xl p-6 sm:p-10 mb-12 border transition-all ${
      currentTheme === 'emo'
        ? 'bg-neutral-900/70 border-neutral-800 text-neutral-100'
        : currentTheme === 'gamer'
        ? 'bg-slate-900/70 border-purple-900/50 text-slate-100'
        : currentTheme === 'baby'
        ? 'bg-white/80 border-rose-200 text-rose-950'
        : 'bg-white border-slate-200 text-slate-900'
    }`}>
      {/* Inject JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="flex items-center gap-2 mb-3">
        <HelpCircle className="w-5 h-5 text-indigo-500" />
        <span className="text-xs font-bold uppercase tracking-wider opacity-60">Preguntas Frecuentes y Guía Experta</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-black mb-6 tracking-tight">
        Todo lo que necesitas saber para acertar con tu regalo
      </h2>

      <div className="space-y-3">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all ${
                isOpen
                  ? currentTheme === 'emo'
                    ? 'border-rose-900 bg-neutral-900'
                    : 'border-indigo-200 bg-indigo-50/30 dark:bg-neutral-800'
                  : 'border-black/5 dark:border-white/5 hover:border-black/10'
              }`}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base cursor-pointer"
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-indigo-500' : 'opacity-40'
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm opacity-80 leading-relaxed border-t border-black/5 dark:border-white/5 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
