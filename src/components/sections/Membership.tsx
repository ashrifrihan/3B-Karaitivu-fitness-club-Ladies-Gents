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
    <section id="membership" className="max-w-7xl mx-auto px-5 sm:px-6 py-act">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-ink-2/60 p-8 sm:p-14">
          <div
            aria-hidden
            className="absolute -top-32 -right-24 h-80 w-80 rounded-full bg-primary/12 blur-3xl"
          />
          <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
            <div className="max-w-2xl">
              <div className="eyebrow text-primary mb-5">Membership</div>
              <h2 className="display text-[clamp(1.9rem,5vw,3.25rem)]">
                Monthly, quarterly and yearly.
              </h2>
              <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
                Call for current rates — we'll match you to the plan that fits. No hidden fees, no
                online signup needed.
              </p>
            </div>
            <a
              href={CLUB.phoneHref}
              className="shrink-0 inline-flex items-center justify-center gap-2.5 rounded-full bg-primary text-primary-foreground px-8 py-4 text-lg font-medium hover:bg-jade-hi transition-colors"
            >
              <Phone size={18} /> {CLUB.phoneDisplay}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
