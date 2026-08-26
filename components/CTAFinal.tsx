"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FORMSPREE_ENDPOINT, PRODUCT_NAME } from "@/lib/data";
import Reveal from "./Reveal";

type Status = "idle" | "loading" | "success" | "error";

export default function CTAFinal() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const form = event.currentTarget;

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="cta" className="relative overflow-hidden bg-slate-950 py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 0%, rgba(99,102,241,0.4), transparent 55%)",
        }}
      />

      <div className="mx-auto max-w-2xl px-6 text-center">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Tu competencia ya está mirando sus métricas en tiempo real.
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Empieza gratis con {PRODUCT_NAME}, sin tarjeta de crédito. Cancela cuando quieras.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.p
                key="success"
                data-testid="cta-success"
                role="status"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-4 text-emerald-300"
              >
                ¡Listo! Revisa tu email para activar tu cuenta gratuita.
              </motion.p>
            ) : (
              <motion.form
                key="form"
                data-testid="cta-form"
                onSubmit={handleSubmit}
                className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
              >
                <input type="hidden" name="producto" value={PRODUCT_NAME} />
                <label htmlFor="cta-email" className="sr-only">
                  Correo electrónico
                </label>
                <input
                  id="cta-email"
                  data-testid="cta-email-input"
                  type="email"
                  name="email"
                  required
                  placeholder="tu@empresa.com"
                  className="w-full flex-1 rounded-full border border-white/15 bg-white/5 px-5 py-3.5 text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none"
                />
                <button
                  type="submit"
                  data-testid="cta-submit"
                  disabled={status === "loading"}
                  className="rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-105 disabled:opacity-60"
                >
                  {status === "loading" ? "Enviando…" : "Crear cuenta gratis"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {status === "error" && (
            <p data-testid="cta-error" role="alert" className="mt-4 text-sm text-rose-400">
              Algo ha fallado. Prueba de nuevo en unos segundos.
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
