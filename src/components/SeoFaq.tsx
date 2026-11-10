'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: '¿Cuáles son los 10 mejores regalos y productos para regalar en 2026 según nuestra comparativa?',
    answer: 'En nuestra comparativa de los mejores regalos destacan productos con más de 4.7 estrellas. Encontrarás ideas para todas las edades, desde tartas de pañales hasta sets LEGO y periféricos gaming. También incluimos cafeteras espresso, accesorios para motoristas y experiencias de relax. Además, puedes comparar opciones y votar en grupo gratis por WhatsApp.'
  },
  {
    question: '¿Qué regalar cuando no sabes qué comprar a alguien que ya tiene de todo?',
    answer: 'El recomendador de Un Buen Regalo te ayuda a acertar con las personas más difíciles. Puedes filtrar por edad exacta o por aficiones como gaming, café barista o motoristas. También dispones de filtros de precio desde menos de 20 euros. Por último, puedes crear una encuesta por WhatsApp para decidir el regalo entre amigos.'
  },
  {
    question: '¿Qué regalar a un recién nacido que resulte realmente útil para los padres?',
    answer: 'El detalle más útil para padres primerizos son las tartas de pañales de calidad. Los pañales representan el mayor gasto durante el primer año del bebé. Además, se combinan con muselinas de bambú, cremas calmantes y peluches doudou de apego. Es un regalo que une utilidad práctica y emoción familiar.'
  },
  {
    question: '¿Qué ideas de regalo triunfan con adolescentes de 16 a 18 años que buscan estilo propio y personalidad?',
    answer: 'Los adolescentes valoran los regalos con estilo propio y utilidad real. Triunfan las velas WoodWick con mecha crepitante y los cuadernos de cuero vintage. También destacan los auriculares de alta fidelidad, la iluminación LED y los perfumes icónicos. Son detalles modernos que conectan con su personalidad.'
  },
  {
    question: '¿Cuáles son los mejores juegos y accesorios de PS5 para regalar a chicos y chicas?',
    answer: 'Para PlayStation 5, el gran éxito familiar es Marvel\'s Spider-Man 2. Para jugar con amigos destaca EA SPORTS FC 25, y para expertos recomendamos Elden Ring. En accesorios, el mando DualSense Edge y los auriculares con cancelación de ruido marcan la diferencia.'
  },
  {
    question: '¿Por qué elegir juguetes Montessori para niños de 1 a 3 años?',
    answer: 'La filosofía Montessori prioriza materiales nobles como la madera maciza sobre el plástico con luces. Elementos como torres de aprendizaje o bloques sensoriales impulsan la autonomía infantil. De este modo, el niño desarrolla su motricidad fina siendo el protagonista del juego.'
  },
  {
    question: '¿Son seguros los enlaces de recomendación a Amazon y funcionan en otros países?',
    answer: 'Todos los enlaces dirigen de forma oficial a la tienda de Amazon de tu región (Amazon.es en España y Amazon.com con envío internacional para EE. UU., Latinoamérica, Europa y el resto de países). Cuentas con la garantía total de compra, precios en € EUR o $ USD y devoluciones oficiales. El precio es exactamente el mismo para ti y la pequeña comisión nos permite mantener esta guía gratuita.'
  }
];

interface SeoFaqProps {
  currentTheme?: string;
}

export default function SeoFaq({ currentTheme = 'classic' }: SeoFaqProps) {
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
    <section className="rounded-3xl p-6 sm:p-10 mb-12 border border-slate-200 bg-white text-slate-900 shadow-xs">
      {/* Inject JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="flex items-center gap-2 mb-3">
        <HelpCircle className="w-5 h-5 text-indigo-600" />
        <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
          Preguntas Frecuentes y Guía Experta
        </span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-black mb-6 tracking-tight text-slate-900">
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
                  ? 'border-indigo-200 bg-indigo-50/60 shadow-xs'
                  : 'border-slate-200 bg-white hover:bg-slate-50/80 hover:border-slate-300'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFaq(index)}
                className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className={`text-sm sm:text-base font-bold transition-colors ${
                  isOpen ? 'text-indigo-950' : 'text-slate-900'
                }`}>
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-indigo-700' : 'text-slate-600'
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-indigo-100/80 pt-3">
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
