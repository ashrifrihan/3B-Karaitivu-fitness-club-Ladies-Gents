import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Phone, MapPin, Star } from "lucide-react";
import { Img } from "@/components/Img";
import { CLUB, reviews } from "@/lib/club";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Staggered entrance for the hero stack — plays once, on load, not on scroll. */
function rise(delay: number) {
  return {
    initial: { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: EASE },
  };
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Transform/opacity only — no layout properties, so this stays on the
  // compositor. Travel is capped so it costs almost nothing on a cheap phone.
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-[100svh] w-full overflow-hidden flex flex-col"
    >
      <motion.div
        style={reduced ? undefined : { y: bgY, scale: bgScale }}
        className="absolute inset-0 will-change-transform"
      >
        <Img
          name="hero-gym"
          alt="Member training at 3B Karaitivu Fitness Club, Karaitivu Sri Lanka"
          sizes="100vw"
          priority
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Cinematic grade: darken, cool the shadows, then fade into the page. */}
      <div className="absolute inset-0 bg-ink/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/25 to-ink" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_10%,transparent_35%,oklch(0.145_0.012_225/0.75)_100%)]" />

      <motion.div
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
        /* flex-1 lets the copy take whatever height is left once the review
           band has claimed its own, so the hero is exactly one viewport tall at
           any screen size — no magic padding to keep in sync. */
        className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-5 pt-20 pb-4"
      >
        {/* Social proof chip with member avatars */}
        <motion.div
          {...rise(0.35)}
          className="inline-flex items-center gap-3 glass rounded-full pl-2 pr-4 py-1.5"
        >
          <div className="flex -space-x-2">
            {reviews.slice(0, 4).map((r) => (
              <span
                key={r.avatar}
                className="h-7 w-7 rounded-full overflow-hidden ring-2 ring-ink/70"
              >
                <Img name={r.avatar} alt="" sizes="28px" className="h-full w-full object-cover" />
              </span>
            ))}
          </div>
          <span className="text-xs sm:text-sm text-foreground/85">
            <span className="font-medium">500+</span> training with us in {CLUB.locality}
          </span>
        </motion.div>

        <h1 className="display mt-7 text-[clamp(2.4rem,6.8vw,5rem)] max-w-5xl">
          <motion.span {...rise(0.5)} className="block">
            Train stronger
          </motion.span>
          <motion.span {...rise(0.65)} className="block">
            Train <span className="text-primary">your own way</span>
          </motion.span>
        </h1>

        <motion.p
          {...rise(0.85)}
          className="mt-6 max-w-xl text-base sm:text-lg text-muted-foreground text-balance"
        >
          Karaitivu's fitness club with fully separate Ladies and Gents sections, real equipment,
          and coaches who show up for you. Open from 6 AM, every day.
        </motion.p>

        {/* Glass action row — shaped like the reference's input pill, but it dials
            the club instead of collecting an email. There's no booking flow. */}
        <motion.div {...rise(1)} className="mt-8 w-full max-w-md">
          <div className="glass rounded-full p-1.5 flex items-center gap-2">
            <span className="hidden sm:flex items-center gap-2 pl-4 text-sm text-muted-foreground whitespace-nowrap">
              <Phone size={14} className="text-primary" />
              {CLUB.phoneDisplay}
            </span>
            <a
              href={CLUB.phoneHref}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-medium hover:bg-jade-hi transition-colors"
            >
              Call the club
            </a>
          </div>
          <a
            href={CLUB.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <MapPin size={14} /> {CLUB.street}, {CLUB.locality}
          </a>
        </motion.div>
      </motion.div>

      <HeroReviews />
    </section>
  );
}

/**
 * Review cards sitting over the bottom of the hero photograph. Horizontally
 * scrollable on small screens rather than stacked, so they stay one band.
 */
function HeroReviews() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1.2, ease: EASE }}
      /* pb-28 on mobile keeps the cards clear of the fixed tap-to-call bar. */
      className="relative z-20 shrink-0 pb-28 md:pb-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
          <Star size={13} className="text-primary fill-primary" />
          <span>
            {CLUB.rating}★ from {CLUB.reviewCount} Google reviews
          </span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {reviews.map((review) => (
            <figure
              key={review.name}
              className="glass rounded-2xl p-4 min-w-[250px] sm:min-w-0 sm:flex-1 snap-start"
            >
              <div className="flex gap-0.5 mb-2.5">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star
                    key={k}
                    size={11}
                    className={
                      k < review.stars ? "text-primary fill-primary" : "text-foreground/20"
                    }
                  />
                ))}
              </div>
              <blockquote className="text-sm leading-relaxed text-foreground/85 line-clamp-3">
                "{review.text}"
              </blockquote>
              <figcaption className="mt-3.5 flex items-center gap-2.5">
                <span className="h-8 w-8 rounded-full overflow-hidden shrink-0">
                  <Img
                    name={review.avatar}
                    alt=""
                    sizes="32px"
                    className="h-full w-full object-cover"
                  />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium truncate">{review.name}</span>
                  <span className="block text-xs text-muted-foreground truncate">
                    {review.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
