import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { MessageCircle, Star, Timer, Users } from "lucide-react";
import { CLUB } from "@/lib/club";

const items = [
  { label: "Google reviews", value: Number(CLUB.reviewCount), suffix: "+", icon: MessageCircle },
  { label: "Star rating", value: Number(CLUB.rating), suffix: "★", icon: Star, decimals: 1 },
  { label: "Doors open", value: 6, suffix: " AM", icon: Timer },
  { label: "Sections — ladies & gents", value: 2, suffix: "", icon: Users },
];

/** Phase 3 moves this trigger from useInView to ScrollTrigger. */
function Counter({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {n.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/**
 * Act II opener — tight rhythm. Runs straight into About with no section gap,
 * so Stats/About/Zones read as one dense band rather than three equal beats.
 */
export function StatsCounters() {
  return (
    <section id="stats" className="border-y border-border bg-card/40">
      <div className="max-w-7xl mx-auto px-5 py-10 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8">
        {items.map((it) => (
          <div key={it.label} className="flex flex-col gap-1">
            <it.icon size={16} className="text-primary" />
            <div className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight">
              <Counter to={it.value} suffix={it.suffix} decimals={it.decimals ?? 0} />
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">{it.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
