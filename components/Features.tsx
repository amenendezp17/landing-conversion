import { FEATURES } from "@/lib/data";
import Reveal from "./Reveal";
import FeaturePanel from "./FeaturePanel";

export default function Features() {
  return (
    <section id="features" className="bg-slate-950 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Todo lo que necesitas para entender tu producto
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Menos herramientas conectadas a medias, más respuestas cuando las necesitas.
          </p>
        </Reveal>

        <div className="mt-20 flex flex-col gap-24">
          {FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              className={`grid items-center gap-12 lg:grid-cols-2 ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <Reveal>
                <span className="text-sm font-semibold text-indigo-400">{feature.tag}</span>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {feature.title}
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-slate-400">{feature.body}</p>
              </Reveal>

              <Reveal delay={0.1}>
                <FeaturePanel index={i} />
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
