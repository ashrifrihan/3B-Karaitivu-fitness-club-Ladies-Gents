import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Phone, X, Menu } from "lucide-react";
import { Logo } from "@/components/Logo";
import { CLUB } from "@/lib/club";

const links = [
  ["Home", "#top"],
  ["Zones", "#zones"],
  ["Gallery", "#gallery"],
  ["Reviews", "#reviews"],
  ["FAQ", "#faq"],
];

/**
 * Floating glass nav: logo left, centred pill of links, phone right.
 *
 * The pill is a fixed overlay rather than a full-width bar so the hero
 * photograph reads edge to edge behind it.
 */
export function Navbar() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-3 shrink-0 group">
          <Logo priority className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105" />
          <span className="flex flex-col leading-tight">
            <span className="text-sm sm:text-base font-bold tracking-tight text-foreground">3B Karaitivu</span>
            <span className="text-[10px] tracking-[0.18em] uppercase text-primary font-semibold">
              Fitness Club
            </span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1 glass rounded-full px-2 py-1.5">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="rounded-full px-4 py-2 text-sm text-foreground/75 hover:text-foreground hover:bg-white/5 transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Visible at every breakpoint — for a walk-in gym the number is the product. */}
          <a
            href={CLUB.phoneHref}
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2.5 text-sm font-medium hover:bg-jade-hi transition-colors"
          >
            <Phone size={14} className="shrink-0" />
            <span className="whitespace-nowrap">{CLUB.phoneDisplay}</span>
          </a>
          <button
            onClick={() => setOpen(true)}
            className="md:hidden grid place-items-center h-10 w-10 rounded-full glass text-foreground"
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 z-50 bg-ink/95"
          >
            <div className="flex items-center justify-between px-4 pt-4">
              <div className="flex items-center gap-2.5">
                <Logo className="h-10 w-auto object-contain" />
                <span className="flex flex-col leading-tight">
                  <span className="text-sm font-bold tracking-tight text-foreground">3B Karaitivu</span>
                  <span className="text-[9px] tracking-[0.18em] uppercase text-primary font-semibold">Fitness Club</span>
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="grid place-items-center h-10 w-10 rounded-full glass"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>
            <nav className="px-6 pt-12 flex flex-col gap-1">
              {links.map(([label, href], i) => (
                <motion.a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
                  className="display text-4xl py-3 border-b border-white/8"
                >
                  {label}
                </motion.a>
              ))}
              <a
                href={CLUB.phoneHref}
                className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-4 font-medium"
              >
                <Phone size={16} /> Call {CLUB.phoneDisplay}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/** Sticky tap-to-call bar, mobile only. */
export function CallBar() {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-white/8 bg-ink/95 backdrop-blur-xl">
      <div className="flex items-stretch gap-2 p-2.5">
        <a
          href={CLUB.phoneHref}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-3 font-medium text-sm"
        >
          <Phone size={16} /> Call {CLUB.phoneDisplay}
        </a>
        <a
          href={CLUB.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-full glass px-5 py-3 text-sm"
        >
          Directions
        </a>
      </div>
    </div>
  );
}
