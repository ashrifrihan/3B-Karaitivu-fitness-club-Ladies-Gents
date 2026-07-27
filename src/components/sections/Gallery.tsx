import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { Img } from "@/components/Img";
import { Reveal } from "@/components/Reveal";
import { img } from "@/lib/images";

const items = [
  {
    name: "power-zone",
    alt: "Free-weights floor at 3B Karaitivu Fitness Club Sri Lanka",
    cls: "row-span-2",
  },
  { name: "gallery-1", alt: "Kettlebell rack at 3B Karaitivu Fitness Club Sri Lanka", cls: "" },
  { name: "cardio-zone", alt: "Cardio zone at 3B Karaitivu Fitness Club Sri Lanka", cls: "" },
  {
    name: "about-1",
    alt: "Members after a session at 3B Karaitivu Fitness Club Sri Lanka",
    cls: "col-span-2",
  },
  {
    name: "personal-training",
    alt: "Coach correcting form at 3B Karaitivu Fitness Club Sri Lanka",
    cls: "",
  },
  {
    name: "ladies-zone",
    alt: "Private ladies-only zone at 3B Karaitivu Fitness Club Sri Lanka",
    cls: "",
  },
];

/** Code-split from the route so its images and lightbox stay out of the initial bundle. */
export default function Gallery() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section id="gallery" className="max-w-7xl mx-auto px-5 sm:px-6 py-act">
      <Reveal>
        <div className="max-w-2xl">
          <div className="eyebrow text-primary mb-5">Inside the club</div>
          <h2 className="display text-[clamp(2rem,5.5vw,3.75rem)]">A look around the floor.</h2>
        </div>
      </Reveal>

      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] sm:auto-rows-[200px] gap-3">
        {items.map((item, i) => (
          <Reveal key={item.name + i} delay={i * 0.05} className={`h-full ${item.cls}`}>
            <button
              onClick={() => setLightbox(item.name)}
              aria-label={`View larger: ${item.alt}`}
              className="relative overflow-hidden rounded-2xl border border-white/8 h-full w-full group"
            >
              <Img
                name={item.name}
                alt={item.alt}
                sizes="(max-width: 768px) 50vw, 25vw"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-ink/25 group-hover:bg-ink/0 transition-colors duration-500" />
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
            className="fixed inset-0 z-[100] bg-ink/96 backdrop-blur-xl grid place-items-center p-6 cursor-zoom-out"
          >
            <button
              className="absolute top-6 right-6 grid place-items-center h-10 w-10 rounded-full glass"
              onClick={() => setLightbox(null)}
              aria-label="Close"
            >
              <X size={18} />
            </button>
            <motion.img
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              src={img(lightbox).src}
              alt={items.find((i) => i.name === lightbox)?.alt ?? "Gallery preview"}
              className="max-h-[85vh] max-w-full rounded-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
