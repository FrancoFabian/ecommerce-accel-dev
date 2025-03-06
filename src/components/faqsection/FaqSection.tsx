'use client';
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "¿Qué es Acme?",
    answer: "Acme es un sistema de diseño para construir experiencias web accesibles, hermosas y de alto rendimiento.",
  },
  {
    question: "¿Cómo puedo solicitar el descuento para proyectos de código abierto?",
    answer: "El descuento para código abierto está disponible para quienes desarrollan proyectos open source. Envíe un correo a soporte@acme.com para aplicar.",
  },
  {
    question: "¿Puedo usar Acme para mis proyectos freelance?",
    answer: "Sí, puedes usar Acme en tus proyectos freelance. Puedes adquirir la licencia para freelancers en nuestro sitio web.",
  },
  {
    question: "¿Cuál es su política de reembolsos?",
    answer: "No ofrecemos reembolsos, pero podemos ayudarte con cualquier problema que tengas.",
  },
  {
    question: "¿Puedo cancelar mi suscripción?",
    answer: "Sí, puedes cancelar o renovar tu suscripción en cualquier momento.",
  },
  {
    question: "¿Cómo puedo cambiar de suscripción trimestral a anual?",
    answer: "Puedes cambiar cancelando tu suscripción trimestral y comprando una suscripción anual.",
  },
  {
    question: "¿Ofrecen planes de pago mensuales?",
    answer: "No, no ofrecemos planes de pago mensuales. Puedes adquirir suscripciones trimestrales o anuales.",
  },
  {
    question: "¿Ofrecen descuentos para estudiantes?",
    answer: "Sí, ofrecemos un descuento del 50% para estudiantes. Envíe un correo a soporte@acme.com para aplicar.",
  },
  {
    question: "¿Ofrecen descuentos para startups?",
    answer: "Sí, ofrecemos un descuento del 50% para startups. Envíe un correo a soporte@acme.com para aplicar.",
  },
  {
    question: "¿Con qué frecuencia lanzan actualizaciones?",
    answer: "Lanzamos actualizaciones cada dos semanas.",
  },
];

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:py-32 md:px-6 lg:px-8 lg:py-40">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8">
        <h2 className="w-full max-w-3xl bg-gradient-to-br from-foreground to-foreground-600 bg-clip-text px-2 text-center text-3xl font-bold leading-7 tracking-tight text-transparent md:text-5xl">
          Preguntas frecuentes de Acme
        </h2>
        <div>
          <button className="z-0 group relative inline-flex items-center justify-center px-6 h-12 text-medium gap-3 rounded-large shadow-lg bg-gradient-to-br from-foreground to-foreground-600 font-medium text-background">
            Contáctanos
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              className="iconify iconify--lucide"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m9 18l6-6l-6-6"
              />
            </svg>
          </button>
        </div>
        <div className="px-2 w-full" data-orientation="vertical">
          {faqs.map((faq, index) => (
            <div key={index} className="px-0 md:px-6">
              <h2>
                <button
                  className="flex w-full h-full gap-3 items-center py-6 flex-row-reverse transition-opacity"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                >
                  <div className="flex-1 flex flex-col text-start">
                    <span className="text-foreground text-large font-medium">
                      {faq.question}
                    </span>
                  </div>
                  <span
                    aria-hidden="true"
                    className={`text-default-400 transition-transform rotate-0 ${
                      openIndex === index ? "rotate-[-45deg]" : ""
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="img"
                      className="text-secondary iconify iconify--lucide"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 12h14m-7-7v14"
                      />
                    </svg>
                  </span>
                </button>
              </h2>
              <section
                className={`transition-all duration-300 ${
                  openIndex === index ? "opacity-100 h-auto" : "opacity-0 h-0"
                } overflow-hidden`}
              >
                <div
                  className="py-2 pt-0 pb-6 text-base text-default-500"
                  role="region"
                  aria-labelledby={`faq-${index}`}
                >
                  {faq.answer}
                </div>
              </section>
              {index < faqs.length - 1 && (
                <hr className="shrink-0 bg-divider border-none w-full h-divider" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
