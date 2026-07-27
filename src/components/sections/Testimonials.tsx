import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { CLUB, reviews } from "@/lib/club";

/**
 * Marquee that only runs while it is actually on screen.
 *
 * The previous version drove this with Motion's `animate={{ x: [...] }}` and
 * `repeat: Infinity`, which kept a rAF loop and compositor work alive for the
 * whole session even with the section far off screen — the exact thing our own
 * perf rule forbids. Now it's a CSS transform animation that an
 * IntersectionObserver play/pauses, plus a hard stop for reduced-motion.
 */
export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track || reducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        track.style.animationPlayState = entry.isIntersecting ? "running" : "paused";
      },
      { rootMargin: "100px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="border-y border-border bg-card/40 py-act-open overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5">
        <Reveal>
          <div className="mb-11 max-w-3xl">
            <div className="eyebrow text-primary mb-4">Members say</div>
            <h2 className="display-tight text-[clamp(2rem,6vw,4rem)] leading-[0.95]">
              Rated {CLUB.rating}★ by {CLUB.reviewCount} Google reviewers.
            </h2>
          </div>
        </Reveal>

        <div className="relative">
          <div
            ref={trackRef}
            className={
              reducedMotion
                ? "flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none]"
                : "flex gap-4 w-max animate-[marquee_44s_linear_infinite] [animation-play-state:paused] motion-reduce:animate-none"
            }
          >
            {(reducedMotion ? reviews : [...reviews, ...reviews]).map((review, i) => (
              <figure
                key={i}
                className="min-w-[280px] sm:min-w-[360px] rounded-3xl border border-border bg-background p-6"
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star
                      key={k}
                      size={13}
                      className={
                        k < review.stars ? "text-primary fill-primary" : "text-muted-foreground/35"
                      }
                    />
                  ))}
                </div>
                <blockquote className="text-sm leading-relaxed">"{review.text}"</blockquote>
                <figcaption className="mt-4 text-sm font-semibold">{review.name}</figcaption>
              </figure>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-card to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-card to-transparent" />
        </div>
      </div>
    </section>
  );
}
