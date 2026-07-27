import { Trophy, Users, Dumbbell } from "lucide-react";
import { Img } from "@/components/Img";
import { Reveal } from "@/components/Reveal";

const facts = [
  { icon: Trophy, label: "4.4★ rated" },
  { icon: Users, label: "Ladies + gents" },
  { icon: Dumbbell, label: "Full equipment" },
];

/**
 * Act II — tight rhythm, asymmetric 12-column grid (7/5 split with a left rail)
 * rather than the symmetric 50/50 it replaces. Denser on purpose: this band is
 * proof, and it should feel like it's moving.
 */
export function About() {
  return (
    <section id="about" className="max-w-7xl mx-auto px-5 py-act-tight">
      <div className="grid lg:grid-cols-12 gap-x-10 gap-y-12 items-center">
        <div className="lg:col-span-7">
          <Reveal>
            <div className="eyebrow text-primary mb-5">About the club</div>
            <h2 className="display-tight text-[clamp(2rem,6vw,4rem)] leading-[0.95]">
              We don't just build bodies.{" "}
              <span className="text-primary">We build confidence.</span>
            </h2>
            {/* AEO summary sentence — carries the full NAP + hours for answer
                engines. Keep the address, postcode and times exact. */}
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              3B Karaitivu Fitness Club is a premier gym at 11 Main Street, Karaitivu (13250),
              Sri Lanka, offering separate Ladies-only and Gents training zones, personal
              coaching, weight and cardio equipment — open daily from 6 AM to 10 AM and 4:30 PM
              to 10 PM.
            </p>
            <p className="mt-4 text-muted-foreground max-w-2xl">
              We built this club so every member — women and men — can train in a space that
              respects their comfort and pushes their limits. Modern equipment, real coaches, and
              a community that shows up for each other, every session.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3 max-w-lg">
              {facts.map((f) => (
                <div key={f.label} className="rounded-2xl border border-border bg-card p-4">
                  <f.icon size={18} className="text-primary mb-2" />
                  <div className="text-sm font-semibold">{f.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={0.15}>
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-border">
                <Img
                  name="about-1"
                  alt="Training floor at 3B Karaitivu Fitness Club, Karaitivu Sri Lanka"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -left-4 rounded-2xl border border-border bg-card/95 backdrop-blur px-4 py-3">
                <div className="font-display font-extrabold text-2xl text-primary">6 AM</div>
                <div className="text-xs text-muted-foreground">Doors open daily</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
