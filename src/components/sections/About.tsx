import { Trophy, Users, Dumbbell } from "lucide-react";
import { Img } from "@/components/Img";
import { Reveal } from "@/components/Reveal";

const facts = [
  { icon: Trophy, label: "4.4★ rated" },
  { icon: Users, label: "Ladies + gents" },
  { icon: Dumbbell, label: "Full equipment" },
];

export function About() {
  return (
    <section id="about" className="max-w-7xl mx-auto px-5 sm:px-6 py-act">
      <div className="grid lg:grid-cols-12 gap-x-12 gap-y-14 items-center">
        <div className="lg:col-span-6">
          <Reveal>
            <div className="eyebrow text-primary mb-5">About the club</div>
            <h2 className="display text-[clamp(2rem,5.5vw,3.75rem)]">
              We don't just build bodies. <span className="text-primary">We build confidence.</span>
            </h2>
            {/* AEO summary sentence — carries the full name, address, postcode and
                hours for answer engines. Keep these values exact. */}
            <p className="mt-7 text-lg text-muted-foreground leading-relaxed">
              3B Karaitivu Fitness Club is a premier gym at 11 Main Street, Karaitivu (13250), Sri
              Lanka, offering separate Ladies-only and Gents training zones, personal coaching,
              weight and cardio equipment — open daily from 6 AM to 10 AM and 4:30 PM to 10 PM.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We built this club so every member — women and men — can train in a space that
              respects their comfort and pushes their limits. Modern equipment, real coaches, and a
              community that shows up for each other, every session.
            </p>
            <div className="mt-9 grid grid-cols-3 gap-3 max-w-lg">
              {facts.map((f) => (
                <div key={f.label} className="rounded-2xl border border-white/8 bg-ink-2/60 p-4">
                  <f.icon size={17} className="text-primary mb-2.5" />
                  <div className="text-sm">{f.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <Reveal delay={0.15}>
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/8">
                <Img
                  name="about-1"
                  alt="Members training together at 3B Karaitivu Fitness Club, Karaitivu Sri Lanka"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
              </div>
              <div className="absolute -bottom-5 -left-4 glass rounded-2xl px-5 py-3.5">
                <div className="display text-3xl text-primary">6 AM</div>
                <div className="text-xs text-muted-foreground mt-0.5">Doors open daily</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
