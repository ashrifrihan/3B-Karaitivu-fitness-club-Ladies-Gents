import { Phone } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { CLUB } from "@/lib/club";

/**
 * Replaces the old three-card pricing section.
 *
 * That section was ~1,800px tall — 18% of the page — and every card showed
 * "Contact" where the price goes, so it carried no information at all. The real
 * content is one sentence and a phone button.
 */
export function Membership() {
  return (
    <section id="membership" className="max-w-7xl mx-auto px-5 py-act">
      <Reveal>
        <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-card to-background p-8 sm:p-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl">
              <div className="eyebrow text-primary mb-4">Membership</div>
              <h2 className="display-tight text-[clamp(1.75rem,5vw,3.25rem)] leading-[0.98]">
                Monthly, quarterly and yearly.
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Call for current rates — we'll match you to the plan that fits. No hidden fees,
                no online signup needed.
              </p>
            </div>
            <a
              href={CLUB.phoneHref}
              className="shrink-0 inline-flex items-center justify-center gap-2.5 rounded-full bg-primary text-primary-foreground px-7 py-4 font-display font-extrabold uppercase tracking-wide text-lg hover:bg-ember-hi transition-colors"
            >
              <Phone size={18} /> {CLUB.phoneDisplay}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
