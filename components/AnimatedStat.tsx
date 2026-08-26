"use client";

import CountUp from "react-countup";
import type { Stat } from "@/lib/data";

export default function AnimatedStat({ value, decimals, suffix, label }: Stat) {
  return (
    <div className="text-center">
      <p className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        <CountUp
          end={value}
          decimals={decimals ?? 0}
          decimal=","
          separator="."
          duration={2}
          enableScrollSpy
          scrollSpyOnce
        />
        {suffix}
      </p>
      <p className="mt-2 text-sm text-slate-400">{label}</p>
    </div>
  );
}
