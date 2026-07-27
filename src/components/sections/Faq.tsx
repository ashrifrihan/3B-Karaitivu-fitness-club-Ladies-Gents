import { Plus } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Reveal } from "@/components/Reveal";
import { faqs } from "@/lib/club";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="max-w-3xl mx-auto px-5 sm:px-6 py-act">
      <Reveal>
        <div className="text-center">
          <div className="eyebrow text-primary mb-5">Questions</div>
          <h2 className="display text-[clamp(2rem,5.5vw,3.75rem)]">Frequently asked.</h2>
        </div>
      </Reveal>

      <div className="mt-12 space-y-2.5">
        {faqs.map((faq, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={faq.q} delay={i * 0.05}>
              <div className="rounded-2xl border border-white/8 bg-ink-2/50 overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-medium">{faq.q}</span>
                  <span
                    className={`shrink-0 grid place-items-center h-8 w-8 rounded-full border border-white/10 transition-[transform,color] duration-300 ${
                      isOpen ? "rotate-45 text-primary" : "text-muted-foreground"
                    }`}
                  >
                    <Plus size={14} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-muted-foreground leading-relaxed">{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
