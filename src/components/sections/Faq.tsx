import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Reveal } from "@/components/Reveal";
import { faqs } from "@/lib/club";

/**
 * Act III — open, understated. Phase 4 swaps this hand-rolled disclosure for
 * the Radix-backed accordion in components/ui so keyboard and ARIA behaviour
 * come for free.
 */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="max-w-3xl mx-auto px-5 py-act-open">
      <Reveal>
        <div className="mb-10">
          <div className="eyebrow text-primary mb-4">Questions</div>
          <h2 className="display-tight text-[clamp(2rem,6vw,4rem)] leading-[0.95]">
            Frequently asked.
          </h2>
        </div>
      </Reveal>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <Reveal key={faq.q} delay={i * 0.05}>
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
              >
                <span className="font-semibold">{faq.q}</span>
                <span className="shrink-0 grid place-items-center h-8 w-8 rounded-full border border-border text-primary">
                  {open === i ? <Minus size={14} /> : <Plus size={14} />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-muted-foreground">{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
