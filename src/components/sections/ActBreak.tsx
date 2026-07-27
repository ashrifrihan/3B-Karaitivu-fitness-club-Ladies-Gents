import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Img } from "@/components/Img";

/**
 * Full-bleed cinematic break between the dense middle of the page and the
 * closing sections. Its job is to stop the page reading as an unbroken run of
 * rounded cards, and to give the scroll a beat of pure image.
 */
export function ActBreak() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={ref}
      aria-label="Inside the club"
      className="relative h-[55vh] min-h-[340px] overflow-hidden"
    >
      <motion.div
        style={reduced ? undefined : { y }}
        className="absolute inset-[-10%_0] will-change-transform"
      >
        <Img
          name="power-zone"
          alt="Free-weights floor at 3B Karaitivu Fitness Club, Karaitivu Sri Lanka"
          sizes="100vw"
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-ink/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />
      <div className="relative h-full max-w-7xl mx-auto px-5 sm:px-6 flex items-center">
        <p className="display text-[clamp(1.6rem,4.5vw,3.25rem)] max-w-3xl">
          Six in the morning, every morning.{" "}
          <span className="text-primary">Before the town wakes up.</span>
        </p>
      </div>
    </section>
  );
}
