"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const PANELS: Record<number, ReactNode> = {
  0: (
    <svg viewBox="0 0 280 120" className="w-full">
      <motion.path
        d="M0 90 L40 70 L80 78 L120 40 L160 55 L200 20 L240 32 L280 10"
        fill="none"
        stroke="url(#lineGrad)"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      />
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
    </svg>
  ),
  1: (
    <div className="flex w-full flex-col gap-2">
      {[100, 68, 41, 22].map((w, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="h-8 flex-1 rounded-md bg-slate-800">
            <motion.div
              className="h-full rounded-md bg-gradient-to-r from-indigo-500 to-violet-500"
              initial={{ width: "0%" }}
              whileInView={{ width: `${w}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <span className="w-10 shrink-0 text-right text-xs text-slate-400">{w}%</span>
        </div>
      ))}
    </div>
  ),
  2: (
    <div className="flex w-full flex-col gap-3">
      {["Conversión bajó 18% en checkout", "Latencia API sobre umbral"].map((msg, i) => (
        <motion.div
          key={msg}
          className="flex items-start gap-3 rounded-lg bg-slate-800/70 p-3"
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.15 }}
        >
          <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-rose-400" />
          <p className="text-sm text-slate-300">{msg}</p>
        </motion.div>
      ))}
    </div>
  ),
  3: (
    <div className="grid w-full grid-cols-3 gap-3">
      {["Web", "iOS", "Android", "Segment", "Stripe", "HubSpot"].map((name, i) => (
        <motion.div
          key={name}
          className="grid aspect-square place-items-center rounded-xl bg-slate-800/70 text-xs font-medium text-slate-300"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.07 }}
        >
          {name}
        </motion.div>
      ))}
    </div>
  ),
};

export default function FeaturePanel({ index }: { index: number }) {
  return (
    <div className="flex aspect-[4/3] w-full items-center justify-center rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/40">
      {PANELS[index % 4]}
    </div>
  );
}
