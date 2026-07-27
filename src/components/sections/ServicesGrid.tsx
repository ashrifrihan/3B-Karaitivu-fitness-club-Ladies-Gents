import { Img } from "@/components/Img";
import { Reveal } from "@/components/Reveal";
import { zones } from "@/lib/club";

/**
 * Act II close — tight rhythm.
 *
 * The four zones render as a static grid. The previous version had a
 * Personal Training / Group / Cardio / Recovery tab row whose `active` state
 * only restyled the pills — the cards below never changed. Dead controls are
 * worse than no controls, so the tabs are gone.
 *
 * The Ladies-only card is toned `lagoon` (teal) rather than pink: the thing
 * being sold is privacy, not gender.
 */
export function ServicesGrid() {
  return (
    <section id="zones" className="max-w-7xl mx-auto px-5 py-act-tight">
      <Reveal>
        <div className="max-w-3xl mb-10">
          <div className="eyebrow text-primary mb-4">Our zones</div>
          <h2 className="display-tight text-[clamp(2rem,6vw,4rem)] leading-[0.95]">
            Space designed for every kind of training.
          </h2>
        </div>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {zones.map((zone, i) => {
          const lagoon = zone.tone === "lagoon";
          return (
            <Reveal key={zone.title} delay={i * 0.08} className="h-full">
              <article
                className={`group relative h-full overflow-hidden rounded-3xl border bg-card aspect-[4/5] transition-colors ${
                  lagoon ? "border-lagoon/45 hover:border-lagoon" : "border-border hover:border-primary/60"
                }`}
              >
                <Img
                  name={zone.image}
                  alt={`${zone.title} at 3B Karaitivu Fitness Club, Karaitivu Sri Lanka`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="absolute inset-0 h-full w-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-transparent" />
                {lagoon && <div className="absolute inset-0 bg-lagoon-deep/25 mix-blend-multiply" />}

                <div className="absolute top-4 left-4">
                  <span
                    className={`rounded-full px-3 py-1 eyebrow ${
                      lagoon
                        ? "bg-lagoon text-primary-foreground"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {zone.tag}
                  </span>
                </div>

                <div className="absolute bottom-0 inset-x-0 p-5">
                  <zone.icon size={18} className={lagoon ? "text-lagoon mb-2" : "text-primary mb-2"} />
                  <h3 className="font-display font-extrabold text-xl leading-tight">{zone.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1.5">{zone.desc}</p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
