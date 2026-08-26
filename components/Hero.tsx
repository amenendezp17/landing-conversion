"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import DashboardMockup from "./DashboardMockup";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-slate-950 pt-16 pb-24 sm:pt-24 sm:pb-32"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(99,102,241,0.35), transparent 45%), radial-gradient(circle at 80% 10%, rgba(139,92,246,0.3), transparent 40%)",
        }}
      />

      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-indigo-300">
            Analítica de producto sin fricción
          </span>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Deja de adivinar qué funciona en tu producto.
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-400">
            Flowlytics convierte cada clic en una decisión. Analítica en tiempo real, sin
            ingenieros de datos y sin dashboards que nadie mira.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="#cta"
              data-testid="hero-cta"
              className="rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-7 py-3.5 text-center text-base font-semibold text-white shadow-lg shadow-indigo-950/40 transition-transform hover:scale-105"
            >
              Empieza gratis 14 días
            </Link>
            <Link
              href="#pricing"
              className="rounded-full border border-white/15 px-7 py-3.5 text-center text-base font-medium text-slate-200 transition-colors hover:bg-white/5"
            >
              Ver precios
            </Link>
          </div>

          <p className="mt-4 text-sm text-slate-400">
            Sin tarjeta de crédito. Cancela cuando quieras.
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center lg:justify-end"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <DashboardMockup />
        </motion.div>
      </div>
    </section>
  );
}
