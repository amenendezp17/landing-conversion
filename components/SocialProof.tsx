import { LOGOS, STATS } from "@/lib/data";
import Reveal from "./Reveal";
import AnimatedStat from "./AnimatedStat";

export default function SocialProof() {
  return (
    <section className="bg-slate-950 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-center text-sm font-medium text-slate-400">
            Con la confianza de equipos de producto en más de 40 países
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
            {LOGOS.map((logo) => (
              <span
                key={logo}
                className="text-lg font-semibold tracking-tight text-slate-600"
              >
                {logo}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-16 grid grid-cols-1 gap-10 border-t border-white/5 pt-14 sm:grid-cols-3">
            {STATS.map((stat) => (
              <AnimatedStat key={stat.label} {...stat} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
