import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Phone, X, Menu, ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { CLUB } from "@/lib/club";

const links = [
  ["Zones", "#zones"],
  ["Gallery", "#gallery"],
  ["Reviews", "#reviews"],
  ["Membership", "#membership"],
  ["FAQ", "#faq"],
  ["Visit", "#contact"],
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between gap-3">
        <a href="#top" className="flex items-center gap-2.5 shrink-0">
          <Logo priority className="h-9 sm:h-11 w-auto object-contain" />
          <span className="hidden sm:flex flex-col leading-none">
            <span className="font-display font-extrabold text-base tracking-tight uppercase">
              3B Karaitivu
            </span>
            <span className="eyebrow text-primary mt-0.5">Fitness Club</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="hover:text-foreground transition-colors">
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/*
            Always visible, every breakpoint. This is a walk-in local gym and
            mobile is most of the traffic — the phone number is the product.
          */}
          <a
            href={CLUB.phoneHref}
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-2 text-xs sm:text-sm font-semibold text-primary hover:bg-primary/20 transition-colors"
          >
            <Phone size={14} className="shrink-0" />
            <span className="whitespace-nowrap">{CLUB.phoneDisplay}</span>
          </a>
          <a
            href="#membership"
            className="hidden lg:inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:bg-ember-hi transition-colors"
          >
            Join Now <ArrowRight size={14} />
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-foreground"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="md:hidden bg-background/97 backdrop-blur-xl border-t border-border"
          >
            <div className="px-5 py-4 flex flex-col">
              <div className="flex items-center gap-3 pb-4 mb-1 border-b border-border">
                <Logo className="h-8 w-auto object-contain" />
                <span className="font-display font-extrabold uppercase text-sm">
                  3B Karaitivu Fitness Club
                </span>
              </div>
              {links.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="py-3 border-b border-border/60 last:border-0 font-display font-semibold uppercase tracking-wide text-foreground/90"
                >
                  {label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/**
 * Sticky tap-to-call bar, mobile only. Sits above the fold-independent bottom
 * edge so the primary action is reachable from anywhere on the page.
 */
export function CallBar() {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border bg-background/95 backdrop-blur-xl">
      <div className="flex items-stretch gap-2 p-2.5">
        <a
          href={CLUB.phoneHref}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-3 font-display font-extrabold uppercase tracking-wide text-sm"
        >
          <Phone size={16} /> Call {CLUB.phoneDisplay}
        </a>
        <a
          href={CLUB.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-full border border-border px-4 py-3 text-sm font-semibold text-foreground"
        >
          Directions
        </a>
      </div>
    </div>
  );
}
