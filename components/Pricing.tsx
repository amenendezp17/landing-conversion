"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { PLANS } from "@/lib/data";
import Reveal from "./Reveal";
import AnimatedPrice from "./AnimatedPrice";

type Billing = "monthly" | "annual";

function discountFor(monthly: number, annual: number) {
  return Math.round((1 - annual / (monthly * 12)) * 100);
}

export default function Pricing() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const isAnnual = billing === "annual";

  return (
    <section id="pricing" className="bg-slate-950 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Un plan para cada etapa
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Sin letra pequeña. Cambia de plan o cancela cuando quieras.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 flex w-fit items-center gap-1 rounded-full border border-white/10 bg-slate-900 p-1">
            {(["monthly", "annual"] as Billing[]).map((option) => (
              <button
                key={option}
                data-testid={`billing-${option}`}
                aria-pressed={billing === option}
                onClick={() => setBilling(option)}
                className="relative rounded-full px-5 py-2 text-sm font-medium text-slate-300 transition-colors"
              >
                {billing === option && (
                  <motion.span
                    layoutId="billing-pill"
                    className="absolute inset-0 rounded-full bg-white"
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
                <span className={`relative z-10 ${billing === option ? "text-slate-950" : ""}`}>
                  {option === "monthly" ? "Mensual" : "Anual"}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {PLANS.map((plan, i) => {
            const price = isAnnual ? plan.annual : plan.monthly;
            const discount = discountFor(plan.monthly, plan.annual);

            return (
              <Reveal key={plan.name} delay={i * 0.08}>
                <div
                  data-testid={`plan-card-${plan.name}`}
                  className={`flex h-full flex-col rounded-2xl border p-8 ${
                    plan.highlighted
                      ? "scale-100 border-indigo-400/60 bg-gradient-to-b from-indigo-500/10 to-slate-900 shadow-2xl shadow-indigo-950/50 lg:scale-105"
                      : "border-white/10 bg-slate-900/60"
                  }`}
                >
                  {plan.highlighted && (
                    <span className="mb-4 w-fit rounded-full bg-indigo-500 px-3 py-1 text-xs font-semibold text-white">
                      Más popular
                    </span>
                  )}

                  <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                  <p className="mt-2 text-sm text-slate-400">{plan.description}</p>

                  <div className="mt-6 flex items-end gap-1" data-testid={`price-${plan.name}`}>
                    <span className="text-4xl font-semibold text-white">
                      €<AnimatedPrice value={price} />
                    </span>
                    <span className="pb-1 text-sm text-slate-400">
                      /{isAnnual ? "año" : "mes"}
                    </span>
                  </div>

                  <div className="mt-2 h-5">
                    {isAnnual && (
                      <p
                        className="text-sm font-medium text-emerald-400"
                        data-testid={`discount-${plan.name}`}
                      >
                        Ahorra {discount}% frente al mensual
                      </p>
                    )}
                  </div>

                  <Link
                    href="#cta"
                    data-testid={`plan-cta-${plan.name}`}
                    className={`mt-6 rounded-full px-5 py-3 text-center text-sm font-semibold transition-transform hover:scale-105 ${
                      plan.highlighted
                        ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white"
                        : "bg-white text-slate-950"
                    }`}
                  >
                    Elegir {plan.name}
                  </Link>

                  <ul className="mt-8 flex flex-col gap-3 text-sm text-slate-300">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <span className="mt-1 text-indigo-400">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
