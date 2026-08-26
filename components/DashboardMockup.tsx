"use client";

import { motion } from "framer-motion";

const BARS = [38, 62, 45, 80, 58, 92, 70];
const TILES = [
  { label: "Usuarios activos", value: "8.213", delta: "+12,4%" },
  { label: "Retención D7", value: "64%", delta: "+3,1%" },
];

export default function DashboardMockup() {
  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/80 p-4 shadow-2xl shadow-indigo-950/50 backdrop-blur">
      <div className="mb-4 flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-3 text-xs text-slate-400">flowlytics.app/dashboard</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {TILES.map((tile) => (
          <div key={tile.label} className="rounded-xl bg-slate-800/60 p-3">
            <p className="text-xs text-slate-400">{tile.label}</p>
            <p className="mt-1 text-xl font-semibold text-white">{tile.value}</p>
            <p className="mt-0.5 text-xs font-medium text-emerald-400">{tile.delta}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-xl bg-slate-800/60 p-4">
        <p className="mb-3 text-xs text-slate-400">Eventos por hora</p>
        <div className="flex h-28 items-end gap-2">
          {BARS.map((height, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t-sm bg-gradient-to-t from-indigo-500 to-violet-400"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: height / 100 }}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "bottom", height: "100%" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
