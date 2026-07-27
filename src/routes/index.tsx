import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "motion/react";
import {
  Phone, MapPin, Clock, Star, ChevronDown, ArrowRight, X, Menu,
  Dumbbell, Heart, Users, User, Instagram, Facebook, MessageCircle,
  Plus, Minus, Zap, Trophy, Timer
} from "lucide-react";
import heroImg from "@/assets/hero-gym.jpg";
import powerZone from "@/assets/power-zone.jpg";
import cardioZone from "@/assets/cardio-zone.jpg";
import ladiesZone from "@/assets/ladies-zone.jpg";
import personalTraining from "@/assets/personal-training.jpg";
import about1 from "@/assets/about-1.jpg";
import gal1 from "@/assets/gallery-1.jpg";
import gal2 from "@/assets/gallery-2.jpg";
import gal3 from "@/assets/gallery-3.jpg";
import logoImg from "@/assets/logo.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HealthClub",
          name: "3B Karaitivu Fitness Club Ladies & Gents",
          image: "/logo.png",
          logo: "/logo.png",
          address: {
            "@type": "PostalAddress",
            streetAddress: "11 Main Street",
            addressLocality: "Karaitivu",
            postalCode: "13250",
            addressCountry: "LK",
          },
          telephone: "+94672050465",
          aggregateRating: { "@type": "AggregateRating", ratingValue: "4.4", reviewCount: "74" },
          openingHours: ["Mo-Su 06:00-10:00", "Mo-Su 16:30-22:00"],
          priceRange: "$$",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
});

const faqs = [
  { q: "What are 3B Karaitivu Fitness Club's opening hours?", a: "We are open every day from 6:00 AM to 10:00 AM in the morning and from 4:30 PM to 10:00 PM in the evening." },
  { q: "Where is the gym located?", a: "We're at 11 Main Street, Karaitivu 13250, Sri Lanka — right in the heart of Karaitivu, easy to reach on foot or by vehicle." },
  { q: "Do you have a separate ladies-only section?", a: "Yes. 3B Karaitivu Fitness Club has a fully private Ladies-only zone with dedicated equipment, alongside a separate Gents section — both under one roof." },
  { q: "What services and training do you offer?", a: "Weight training, cardio, personal one-on-one coaching, and a dedicated ladies training space. Beginners and experienced members are both welcome." },
  { q: "How can I get membership pricing?", a: "Call us on 0672 050 465 or visit the club at 11 Main Street, Karaitivu. Monthly, quarterly and yearly plans are available." },
];

const services = [
  { tag: "Power Zone", title: "Weight Training", desc: "Full free-weights floor with racks, benches and premium plates.", img: powerZone, icon: Dumbbell },
  { tag: "Cardio Zone", title: "Treadmills & Cycles", desc: "Rows of treadmills, bikes and cross-trainers for every level.", img: cardioZone, icon: Heart },
  { tag: "Ladies Only", title: "Private Training Space", desc: "A dedicated, private zone designed exclusively for our ladies members.", img: ladiesZone, icon: Users },
  { tag: "1-on-1", title: "Personal Training", desc: "Custom programs and hands-on coaching from experienced trainers.", img: personalTraining, icon: User },
];

const tabs = ["Personal Training", "Group", "Cardio", "Recovery"] as const;

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
      const eased = 1 - Math.pow(1 - p, 3);
      setN(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{n.toFixed(decimals)}{suffix}</span>;
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    ["Zones", "#zones"], ["Gallery", "#gallery"], ["Pricing", "#pricing"],
    ["Reviews", "#reviews"], ["FAQ", "#faq"], ["Contact", "#contact"],
  ];
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-3 shrink-0 group">
          <img src={logoImg} alt="3B Karaitivu Fitness Club Logo" className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105" />
          <div className="flex flex-col">
            <span className="font-bold text-sm sm:text-base tracking-tight leading-none text-foreground">3B Karaitivu</span>
            <span className="text-[10px] tracking-wider uppercase font-semibold text-primary">Fitness Club</span>
          </div>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {links.map(([l, h]) => (
            <a key={h} href={h} className="hover:text-foreground transition-colors">{l}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="tel:+94672050465" className="hidden sm:inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground">
            <Phone size={14} /> 0672 050 465
          </a>
          <a href="#pricing" className="hidden sm:inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:shadow-[var(--shadow-glow)] transition-shadow">
            Join Now <ArrowRight size={14} />
          </a>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-foreground" aria-label="menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-t border-border"
          >
            <div className="px-5 py-4 flex flex-col gap-3">
              <div className="flex items-center gap-3 pb-3 border-b border-border mb-1">
                <img src={logoImg} alt="3B Karaitivu Fitness Club Logo" className="h-8 w-auto object-contain" />
                <span className="font-bold text-sm">3B Karaitivu Fitness Club</span>
              </div>
              {links.map(([l, h]) => (
                <a key={h} href={h} onClick={() => setOpen(false)} className="py-2 text-foreground/90">{l}</a>
              ))}
              <a href="tel:+94672050465" className="py-2 text-primary flex items-center gap-2"><Phone size={16} /> 0672 050 465</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  return (
    <section ref={ref} id="top" className="relative min-h-screen w-full overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <img src={heroImg} alt="3B Karaitivu Fitness Club dark cinematic gym interior with neon lighting, Karaitivu Sri Lanka" className="w-full h-[120%] object-cover" width={1920} height={1200} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/20 to-transparent" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 max-w-7xl mx-auto px-5 pt-32 sm:pt-40 pb-20 min-h-screen flex flex-col justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="inline-flex items-center gap-2.5 self-start rounded-full border border-border bg-card/70 backdrop-blur-md px-3.5 py-1.5 text-xs sm:text-sm mb-6 shadow-lg">
          <img src={logoImg} alt="3B Karaitivu Fitness Club Logo" className="h-6 w-auto object-contain" />
          <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]" />
          <span>Karaitivu · Ladies & Gents Fitness Club</span>
        </motion.div>

        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight max-w-4xl">
          {["Be Stronger.", "Be Confident.", <span key="l3" className="text-primary">Train Your Way.</span>].map((line, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="block">
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-6 max-w-xl text-base sm:text-lg text-muted-foreground">
          Karaitivu's premier fitness club — with fully separate <span className="text-foreground">Ladies</span> and <span className="text-foreground">Gents</span> sections, powerful equipment, and personal coaches that show up for you.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05 }} className="mt-8 flex flex-wrap items-center gap-3">
          <a href="#pricing" className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3.5 font-semibold hover:shadow-[var(--shadow-glow)] transition-all hover:scale-105">
            Join Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#about" className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 backdrop-blur px-6 py-3.5 font-semibold hover:bg-card/80 transition">
            More About Us
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.25 }} className="mt-12 grid gap-4 sm:flex sm:flex-wrap sm:items-center">
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-card/60 backdrop-blur px-4 py-3">
            <div className="flex -space-x-2">
              {[0,1,2,3].map((i) => (
                <div key={i} className="h-8 w-8 rounded-full border-2 border-card bg-gradient-to-br from-primary/60 to-accent/60" style={{ transform: `scale(${1 - i*0.02})` }} />
              ))}
            </div>
            <div className="text-sm"><span className="font-bold">500+</span> <span className="text-muted-foreground">Happy Members</span></div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-primary/40 bg-primary/10 backdrop-blur px-4 py-3">
            <Clock size={18} className="text-primary" />
            <div className="text-sm"><span className="font-bold">Opens 6 AM</span> <span className="text-muted-foreground">Daily</span></div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-card/60 backdrop-blur px-4 py-3">
            <Star size={18} className="text-primary fill-primary" />
            <div className="text-sm"><span className="font-bold">4.4★</span> <span className="text-muted-foreground">· 74 Reviews</span></div>
          </div>
        </motion.div>
      </motion.div>

      <motion.a href="#stats" animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-muted-foreground">
        <ChevronDown size={28} />
      </motion.a>
    </section>
  );
}

function Stats() {
  const items = [
    { label: "Google Reviews", value: 74, suffix: "+", icon: MessageCircle },
    { label: "Star Rating", value: 4.4, suffix: "★", icon: Star, decimals: 1 },
    { label: "AM Daily Open", value: 6, suffix: " AM", icon: Timer },
    { label: "Sections (Ladies & Gents)", value: 2, suffix: "", icon: Users },
  ];
  return (
    <section id="stats" className="relative border-y border-border bg-card/30">
      <div className="max-w-7xl mx-auto px-5 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((it, i) => (
          <Reveal key={it.label} delay={i * 0.08}>
            <div className="flex flex-col gap-1">
              <it.icon size={18} className="text-primary" />
              <div className="text-3xl sm:text-4xl font-bold tracking-tight">
                <Counter to={it.value} suffix={it.suffix} decimals={it.decimals ?? 0} />
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">{it.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="max-w-7xl mx-auto px-5 py-24 sm:py-32">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs mb-6">
              <Zap size={12} className="text-primary" /> About the Club
            </div>
            <h2 className="text-4xl sm:text-6xl font-bold leading-[1.02] tracking-tight">
              We don't just build bodies. <span className="text-primary">We build confidence.</span>
            </h2>
            {/* AEO summary sentence */}
            <p className="mt-6 text-lg text-muted-foreground">
              3B Karaitivu Fitness Club is a premier gym at 11 Main Street, Karaitivu (13250), Sri Lanka, offering separate Ladies-only and Gents training zones, personal coaching, weight and cardio equipment — open daily from 6 AM to 10 AM and 4:30 PM to 10 PM.
            </p>
            <p className="mt-4 text-muted-foreground">
              We built this club so every member — women and men — can train in a space that respects their comfort and pushes their limits. Modern equipment, real coaches, and a community that shows up for each other, every session.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { icon: Trophy, label: "4.4★ Rated" },
                { icon: Users, label: "Ladies + Gents" },
                { icon: Dumbbell, label: "Full Equipment" },
              ].map((f) => (
                <div key={f.label} className="rounded-2xl border border-border bg-card p-4">
                  <f.icon size={20} className="text-primary mb-2" />
                  <div className="text-sm font-semibold">{f.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-primary/20 blur-3xl" />
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-border">
              <img src={about1} alt="3B Karaitivu Fitness Club member training, Karaitivu Sri Lanka" className="w-full h-full object-cover" loading="lazy" width={1200} height={1400} />
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-2xl border border-border bg-card/90 backdrop-blur p-4 shadow-xl">
              <div className="text-2xl font-bold text-primary">6 AM</div>
              <div className="text-xs text-muted-foreground">Doors open daily</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Zones() {
  const [active, setActive] = useState<typeof tabs[number]>("Personal Training");
  return (
    <section id="zones" className="max-w-7xl mx-auto px-5 py-24 sm:py-32">
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <div className="text-primary text-sm font-semibold mb-3">Our Zones</div>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight max-w-2xl">Space designed for every kind of training.</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button key={t} onClick={() => setActive(t)}
                className={`px-4 py-2 rounded-full text-sm border transition ${
                  active === t ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground"
                }`}>{t}</button>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08}>
            <motion.div whileHover={{ y: -6 }} className="group relative overflow-hidden rounded-3xl border border-border bg-card aspect-[4/5]">
              <img src={s.img} alt={`3B Karaitivu Fitness Club ${s.title} zone, Karaitivu Sri Lanka`} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="rounded-full bg-primary/90 text-primary-foreground px-3 py-1 text-xs font-semibold">{s.tag}</span>
              </div>
              <div className="absolute bottom-0 inset-x-0 p-5">
                <s.icon size={20} className="text-primary mb-2" />
                <h3 className="text-xl font-bold">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Gallery() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const items = [
    { src: powerZone, alt: "Power zone at 3B Karaitivu Fitness Club Sri Lanka", cls: "row-span-2" },
    { src: gal1, alt: "Kettlebell rack at 3B Karaitivu Fitness Club Sri Lanka", cls: "" },
    { src: cardioZone, alt: "Cardio zone at 3B Karaitivu Fitness Club Sri Lanka", cls: "" },
    { src: gal3, alt: "Group class at 3B Karaitivu Fitness Club Sri Lanka", cls: "col-span-2" },
    { src: gal2, alt: "Member training at 3B Karaitivu Fitness Club Sri Lanka", cls: "" },
    { src: ladiesZone, alt: "Ladies-only zone at 3B Karaitivu Fitness Club Sri Lanka", cls: "" },
  ];
  return (
    <section id="gallery" className="max-w-7xl mx-auto px-5 py-24 sm:py-32">
      <Reveal>
        <div className="mb-10">
          <div className="text-primary text-sm font-semibold mb-3">Inside the Club</div>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight">A look around the floor.</h2>
        </div>
      </Reveal>
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] sm:auto-rows-[200px] gap-3">
        {items.map((it, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <motion.button
              onClick={() => setLightbox(it.src)}
              whileHover={{ scale: 1.02 }}
              className={`relative overflow-hidden rounded-2xl border border-border h-full w-full ${it.cls}`}
            >
              <img src={it.src} alt={it.alt} loading="lazy" className="h-full w-full object-cover hover:scale-105 transition-transform duration-700" />
            </motion.button>
          </Reveal>
        ))}
      </div>
      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl grid place-items-center p-6 cursor-zoom-out">
            <button className="absolute top-6 right-6 text-foreground" onClick={() => setLightbox(null)}><X /></button>
            <motion.img initial={{ scale: 0.95 }} animate={{ scale: 1 }} src={lightbox} className="max-h-[85vh] max-w-full rounded-2xl border border-border" alt="Gallery preview" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Pricing() {
  const plans = [
    { name: "Monthly", tagline: "Best to start", features: ["Full gym access", "Ladies or Gents zone", "Both training slots (6am / 4:30pm)", "Locker use"], highlight: false },
    { name: "Quarterly", tagline: "Most popular", features: ["Everything in Monthly", "1 free assessment", "Priority booking", "Guest pass ×1"], highlight: true },
    { name: "Yearly", tagline: "Best value", features: ["Everything in Quarterly", "2 personal training sessions", "Free program review", "Member events"], highlight: false },
  ];
  return (
    <section id="pricing" className="max-w-7xl mx-auto px-5 py-24 sm:py-32">
      <Reveal>
        <div className="text-center mb-14">
          <div className="text-primary text-sm font-semibold mb-3">Membership</div>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight">Plans that fit your rhythm.</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Transparent tiers, no hidden fees. Call us for the latest rates — we'll match you to the plan that fits.</p>
        </div>
      </Reveal>
      <div className="grid md:grid-cols-3 gap-5">
        {plans.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.1}>
            <motion.div whileHover={{ y: -8 }} className={`relative rounded-3xl border p-8 h-full flex flex-col transition-all ${
              p.highlight ? "border-primary bg-card shadow-[var(--shadow-glow)]" : "border-border bg-card hover:border-primary/50"
            }`}>
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary text-primary-foreground px-3 py-1 text-xs font-bold">POPULAR</span>
              )}
              <div className="text-sm text-muted-foreground">{p.tagline}</div>
              <div className="mt-2 text-3xl font-bold">{p.name}</div>
              <div className="mt-2 text-4xl font-bold text-primary">Contact</div>
              <div className="text-xs text-muted-foreground">for pricing</div>
              <ul className="mt-6 space-y-3 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <a href="tel:+94672050465" className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-semibold transition ${
                p.highlight ? "bg-primary text-primary-foreground hover:shadow-[var(--shadow-glow)]" : "border border-border hover:border-primary hover:text-primary"
              }`}>
                <Phone size={16} /> Contact for Pricing
              </a>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    { name: "Kavitha S.", text: "Ladies-only section is exactly what I was looking for. Trainers are respectful and equipment is well-kept.", stars: 5 },
    { name: "Rizwan A.", text: "Best gym in Karaitivu. Been a member for over a year — real progress and a friendly community.", stars: 5 },
    { name: "Nishani P.", text: "Clean, welcoming and the coaches actually care. Morning slots at 6 AM are perfect before work.", stars: 4 },
    { name: "Suresh K.", text: "Solid free-weights setup and great cardio zone. Highly recommend for anyone serious about training.", stars: 5 },
  ];
  return (
    <section id="reviews" className="border-y border-border bg-card/30 py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5">
        <Reveal>
          <div className="mb-12">
            <div className="text-primary text-sm font-semibold mb-3">Members Say</div>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight">Rated 4.4★ by 74 Google reviewers.</h2>
          </div>
        </Reveal>
        <div className="relative">
          <motion.div
            className="flex gap-5"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {[...reviews, ...reviews].map((r, i) => (
              <div key={i} className="min-w-[300px] sm:min-w-[380px] rounded-3xl border border-border bg-background p-6">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} size={14} className={k < r.stars ? "text-primary fill-primary" : "text-muted-foreground/40"} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed">"{r.text}"</p>
                <div className="mt-4 text-sm font-semibold">{r.name}</div>
              </div>
            ))}
          </motion.div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-card/30 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-card/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="max-w-4xl mx-auto px-5 py-24 sm:py-32">
      <Reveal>
        <div className="mb-10 text-center">
          <div className="text-primary text-sm font-semibold mb-3">Questions</div>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight">Frequently asked.</h2>
        </div>
      </Reveal>
      <div className="space-y-3">
        {faqs.map((f, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between gap-4 p-5 text-left">
                <span className="font-semibold">{f.q}</span>
                <span className="shrink-0 grid place-items-center h-8 w-8 rounded-full border border-border">
                  {open === i ? <Minus size={14} /> : <Plus size={14} />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="px-5 pb-5 text-muted-foreground">{f.a}</div>
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

function Contact() {
  return (
    <section id="contact" className="max-w-7xl mx-auto px-5 py-24 sm:py-32">
      <div className="grid lg:grid-cols-2 gap-10">
        <Reveal>
          <div>
            <div className="text-primary text-sm font-semibold mb-3">Visit us</div>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight">Come train with us.</h2>
            <p className="mt-4 text-muted-foreground">Walk in during opening hours, or call us to book a tour.</p>

            <div className="mt-8 space-y-4">
              <a href="https://maps.google.com/?q=11+Main+Street+Karaitivu" target="_blank" rel="noreferrer" className="flex items-start gap-4 rounded-2xl border border-border bg-card p-4 hover:border-primary transition">
                <MapPin className="text-primary shrink-0" />
                <div>
                  <div className="font-semibold">11 Main Street</div>
                  <div className="text-sm text-muted-foreground">Karaitivu 13250, Sri Lanka</div>
                </div>
              </a>
              <a href="tel:+94672050465" className="flex items-start gap-4 rounded-2xl border border-border bg-card p-4 hover:border-primary transition">
                <Phone className="text-primary shrink-0" />
                <div>
                  <div className="font-semibold">0672 050 465</div>
                  <div className="text-sm text-muted-foreground">Tap to call</div>
                </div>
              </a>
              <div className="rounded-2xl border border-border bg-card p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="text-primary" />
                  <div className="font-semibold">Opening Hours · Daily</div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="rounded-xl bg-background/60 p-3">
                    <div className="text-xs text-muted-foreground">Morning</div>
                    <div className="font-semibold">6:00 – 10:00 AM</div>
                  </div>
                  <div className="rounded-xl bg-background/60 p-3">
                    <div className="text-xs text-muted-foreground">Evening</div>
                    <div className="font-semibold">4:30 – 10:00 PM</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                {[Instagram, Facebook, MessageCircle].map((Icon, i) => (
                  <a key={i} href="#" className="grid place-items-center h-11 w-11 rounded-full border border-border hover:border-primary hover:text-primary transition">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="rounded-3xl overflow-hidden border border-border h-full min-h-[400px]">
            <iframe
              title="Map to 3B Karaitivu Fitness Club"
              src="https://www.google.com/maps?q=11+Main+Street+Karaitivu+13250+Sri+Lanka&output=embed"
              className="w-full h-full min-h-[400px] grayscale"
              loading="lazy"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-card/30">
      <div className="max-w-7xl mx-auto px-5 py-14 grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logoImg} alt="3B Karaitivu Fitness Club Logo" className="h-12 w-auto object-contain" />
            <div>
              <div className="font-bold text-base leading-none">3B Karaitivu</div>
              <div className="text-xs text-primary font-semibold tracking-wider uppercase">Fitness Club</div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">Karaitivu's premier fitness club — separate Ladies & Gents sections, open daily.</p>
        </div>
        <div>
          <div className="text-sm font-semibold mb-3">Explore</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[["Zones","#zones"],["Gallery","#gallery"],["Pricing","#pricing"],["FAQ","#faq"],["Contact","#contact"]].map(([l,h]) => (
              <li key={h}><a href={h} className="hover:text-foreground">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold mb-3">Reach us</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>11 Main Street, Karaitivu 13250</li>
            <li><a href="tel:+94672050465" className="hover:text-foreground">0672 050 465</a></li>
            <li>Daily · 6–10 AM & 4:30–10 PM</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-5 py-5 text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>© {new Date().getFullYear()} 3B Karaitivu Fitness Club. All rights reserved.</div>
          <div>Ladies & Gents · Karaitivu, Sri Lanka</div>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Zones />
      <Gallery />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}
