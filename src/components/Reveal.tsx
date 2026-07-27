import { motion } from "motion/react";

/**
 * Scroll-entrance wrapper: fade + short rise, once, on enter.
 *
 * Deliberately Motion rather than GSAP/ScrollTrigger. Motion is already in the
 * bundle, this is transform/opacity only, and it uses IntersectionObserver
 * under the hood — so adding GSAP would cost ~50KB on a 4GB phone to buy
 * nothing this page actually needs.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
