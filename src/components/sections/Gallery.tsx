import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { Img } from "@/components/Img";
import { Reveal } from "@/components/Reveal";
import { img } from "@/lib/images";

const items = [
  { name: "power-zone", alt: "Power zone at 3B Karaitivu Fitness Club Sri Lanka", cls: "row-span-2" },
  { name: "gallery-1", alt: "Kettlebell rack at 3B Karaitivu Fitness Club Sri Lanka", cls: "" },
  { name: "cardio-zone", alt: "Cardio zone at 3B Karaitivu Fitness Club Sri Lanka", cls: "" },
  { name: "gallery-3", alt: "Group class at 3B Karaitivu Fitness Club Sri Lanka", cls: "col-span-2" },
  { name: "gallery-2", alt: "Member training at 3B Karaitivu Fitness Club Sri Lanka", cls: "" },
  { name: "ladies-zone", alt: "Ladies-only zone at 3B Karaitivu Fitness Club Sri Lanka", cls: "" },
];

/**
 * Act III opener — open rhythm. Code-split from the route so its lightbox and
 * the six gallery images stay out of the initial bundle.
 */
export default function Gallery() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section id="gallery" className="max-w-7xl mx-auto px-5 py-act-open">
      <Reveal>
        <div className="mb-10 max-w-2xl">
          <div className="eyebrow text-primary mb-4">Inside the club</div>
          <h2 className="display-tight text-[clamp(2rem,6vw,4rem)] leading-[0.95]">
            A look around the floor.
          </h2>
        </div>
      </Reveal>

      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] sm:auto-rows-[200px] gap-3">
        {items.map((item, i) => (
          <Reveal key={item.name + i} delay={i * 0.05} className={`h-full ${item.cls}`}>
            <button
              onClick={() => setLightbox(item.name)}
              aria-label={`View larger: ${item.alt}`}
              className="relative overflow-hidden rounded-2xl border border-border h-full w-full group"
            >
              <Img
                name={item.name}
                alt={item.alt}
                sizes="(max-width: 768px) 50vw, 25vw"
                className="h-full w-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-500"
              />
            </button>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[100] bg-background/96 backdrop-blur-xl grid place-items-center p-6 cursor-zoom-out"
          >
            <button
              className="absolute top-6 right-6 text-foreground"
              onClick={() => setLightbox(null)}
              aria-label="Close"
            >
              <X />
            </button>
            <img
              src={img(lightbox).src}
              alt={items.find((i) => i.name === lightbox)?.alt ?? "Gallery preview"}
              className="max-h-[85vh] max-w-full rounded-2xl border border-border"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
