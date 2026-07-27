import { Img } from "@/components/Img";
import { Reveal } from "@/components/Reveal";
import { zones } from "@/lib/club";

/**
 * The four zones as a static grid.
 *
 * The previous version had a Personal Training / Group / Cardio / Recovery tab
 * row whose `active` state only restyled the pills — the cards below never
 * changed. Dead controls are worse than no controls, so the tabs are gone.
 */
export function ServicesGrid() {
  return (
    <section id="zones" className="max-w-7xl mx-auto px-5 sm:px-6 py-act">
      <Reveal>
        <div className="max-w-3xl">
          <div className="eyebrow text-primary mb-5">Our zones</div>
          <h2 className="display text-[clamp(2rem,5.5vw,3.75rem)]">
            Space designed for every kind of training.
          </h2>
        </div>
      </Reveal>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {zones.map((zone, i) => (
          <Reveal key={zone.title} delay={i * 0.08} className="h-full">
            <article className="group relative h-full overflow-hidden rounded-3xl aspect-[3/4] border border-white/8">
              <Img
                name={zone.image}
                alt={`${zone.title} at 3B Karaitivu Fitness Club, Karaitivu Sri Lanka`}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-transparent" />

              <div className="absolute top-4 left-4">
                <span className="glass rounded-full px-3 py-1 eyebrow text-foreground/90">
                  {zone.tag}
                </span>
              </div>

              <div className="absolute bottom-0 inset-x-0 p-5">
                <zone.icon size={17} className="text-primary mb-2.5" />
                <h3 className="text-lg font-medium tracking-tight">{zone.title}</h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{zone.desc}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
