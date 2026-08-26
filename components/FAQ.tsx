"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FAQS } from "@/lib/data";
import Reveal from "./Reveal";

function AccordionItem({
  index,
  q,
  a,
  isOpen,
  onToggle,
}: {
  index: number;
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panelId = `faq-panel-${index}`;
  const triggerId = `faq-trigger-${index}`;

  return (
    <div className="border-b border-white/10 py-2">
      <h3>
        <button
          id={triggerId}
          data-testid={`faq-trigger-${index}`}
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="flex w-full items-center justify-between gap-4 py-4 text-left"
        >
          <span className="text-base font-medium text-white sm:text-lg">{q}</span>
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.25 }}
            aria-hidden="true"
            className="shrink-0 text-2xl font-light text-indigo-400"
          >
            +
          </motion.span>
        </button>
      </h3>

      <motion.div
        id={panelId}
        data-testid={`faq-panel-${index}`}
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <p className="pb-5 pr-8 text-slate-400">{a}</p>
      </motion.div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-slate-950 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Preguntas frecuentes
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Si tienes otra duda, escríbenos y te respondemos en menos de 24 horas.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={faq.q}
              index={i}
              q={faq.q}
              a={faq.a}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
