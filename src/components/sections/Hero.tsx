import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Phone, Clock, Star, ChevronDown, ArrowRight } from "lucide-react";
import { Img } from "@/components/Img";
import { Logo } from "@/components/Logo";
import { CLUB } from "@/lib/club";

/**
 * Act I — Arrive. Open rhythm, full-bleed, oversized compressed display type.
 *
 * Phase 2 swaps the still background for a conditionally-loaded video layer;
 * the poster image stays as the base case, so this markup is the fallback that
 * low-end and reduced-motion visitors always get.
 */
export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const headline = ["Be Stronger.", "Be Confident.", "Train Your Way."];

  return (
    <section ref={ref} id="top" className="relative min-h-[100svh] w-full overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <Img
          name="hero-gym"
          alt="3B Karaitivu Fitness Club dark cinematic gym interior, Karaitivu Sri Lanka"
          sizes="100vw"
          priority
          className="w-full h-[115%] object-cover"
        />
        {/* Warm grade over the still so it sits inside the Six AM palette. */}
        <div className="absolute inset-0 bg-[oklch(0.145_0.012_45)]/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/35 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/25 to-transparent" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-5 pt-32 sm:pt-40 pb-32 md:pb-24 min-h-[100svh] flex flex-col justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-2.5 self-start rounded-full border border-border bg-card/70 backdrop-blur px-3 py-1.5 pl-2 eyebrow text-muted-foreground mb-6"
        >
          <Logo priority className="h-6 w-auto object-contain" />
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span>Karaitivu · Ladies &amp; Gents Fitness Club</span>
        </motion.div>

        <h1 className="display-tight text-[clamp(2.75rem,11vw,7.5rem)] leading-[0.88] max-w-5xl">
          {headline.map((line, i) => (
            <motion.span
              key={line}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className={`block ${i === 2 ? "text-primary" : ""}`}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-7 max-w-xl text-base sm:text-lg text-muted-foreground"
        >
          Karaitivu's premier fitness club — with fully separate{" "}
          <span className="text-foreground">Ladies</span> and{" "}
          <span className="text-foreground">Gents</span> sections, powerful equipment, and
          personal coaches that show up for you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05 }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <a
            href={CLUB.phoneHref}
            className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3.5 font-display font-extrabold uppercase tracking-wide hover:bg-ember-hi transition-colors"
          >
            <Phone size={16} /> Call the Club
          </a>
          <a
            href="#zones"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 backdrop-blur px-6 py-3.5 font-semibold hover:bg-card/80 transition-colors"
          >
            See the Zones <ArrowRight size={16} />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25 }}
          className="mt-12 flex flex-wrap items-center gap-3 text-sm"
        >
          <div className="flex items-center gap-2.5 rounded-full border border-primary/35 bg-primary/10 backdrop-blur px-4 py-2.5">
            <Clock size={16} className="text-primary" />
            <span>
              <span className="font-semibold">Opens 6 AM</span>{" "}
              <span className="text-muted-foreground">daily</span>
            </span>
          </div>
          <div className="flex items-center gap-2.5 rounded-full border border-border bg-card/60 backdrop-blur px-4 py-2.5">
            <Star size={16} className="text-primary fill-primary" />
            <span>
              <span className="font-semibold">{CLUB.rating}★</span>{" "}
              <span className="text-muted-foreground">· {CLUB.reviewCount} reviews</span>
            </span>
          </div>
          <div className="flex items-center gap-2.5 rounded-full border border-lagoon/35 bg-lagoon/10 backdrop-blur px-4 py-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-lagoon" />
            <span className="text-muted-foreground">Private ladies-only zone</span>
          </div>
        </motion.div>
      </motion.div>

      <a
        href="#stats"
        aria-label="Scroll to club details"
        className="absolute bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-10 text-muted-foreground/70"
      >
        <ChevronDown size={26} />
      </a>
    </section>
  );
}
