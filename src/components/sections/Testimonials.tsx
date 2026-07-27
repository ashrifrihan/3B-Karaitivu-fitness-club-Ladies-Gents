import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import { Img } from "@/components/Img";
import { Reveal } from "@/components/Reveal";
import { CLUB, reviews } from "@/lib/club";

/**
 * Marquee that only runs while it is actually on screen.
 *
 * The previous version drove this with Motion's `animate={{ x: [...] }}` and
 * `repeat: Infinity`, which kept a rAF loop and compositor work alive for the
 * whole session even with the section far off screen. Now it's a CSS transform
 * animation an IntersectionObserver play/pauses, with a hard stop for
 * reduced-motion (where it becomes a plain scrollable row).
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
      className="border-y border-white/8 bg-ink-2/40 py-act overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <Reveal>
          <div className="max-w-3xl">
            <div className="eyebrow text-primary mb-5">Members say</div>
            <h2 className="display text-[clamp(2rem,5.5vw,3.75rem)]">
              Rated {CLUB.rating}★ by {CLUB.reviewCount} Google reviewers.
            </h2>
          </div>
        </Reveal>
      </div>

      <div className="relative mt-12">
        <div
          ref={trackRef}
          className={
            reducedMotion
              ? "flex gap-3 px-5 overflow-x-auto pb-2 [scrollbar-width:none]"
              : "flex gap-3 w-max animate-[marquee_46s_linear_infinite] [animation-play-state:paused]"
          }
        >
          {(reducedMotion ? reviews : [...reviews, ...reviews]).map((review, i) => (
            <figure
              key={i}
              className="min-w-[280px] sm:min-w-[380px] rounded-3xl border border-white/8 bg-ink p-6"
            >
              <div className="flex gap-0.5 mb-3.5">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star
                    key={k}
                    size={12}
                    className={
                      k < review.stars ? "text-primary fill-primary" : "text-foreground/20"
                    }
                  />
                ))}
              </div>
              <blockquote className="text-sm leading-relaxed text-foreground/85">
                "{review.text}"
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="h-9 w-9 rounded-full overflow-hidden shrink-0">
                  <Img
                    name={review.avatar}
                    alt=""
                    sizes="36px"
                    className="h-full w-full object-cover"
                  />
                </span>
                <span>
                  <span className="block text-sm font-medium">{review.name}</span>
                  <span className="block text-xs text-muted-foreground">{review.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-ink to-transparent" />
      </div>
    </section>
  );
}
