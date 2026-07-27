import { MapPin, Phone, Clock, Instagram, Facebook, MessageCircle } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { CLUB } from "@/lib/club";

const explore = [
  ["Zones", "#zones"],
  ["Gallery", "#gallery"],
  ["Reviews", "#reviews"],
  ["Membership", "#membership"],
  ["FAQ", "#faq"],
];

/** The action point. Deliberately calm — nothing competes with the phone number. */
export function ContactFooter() {
  return (
    <>
      <section id="contact" className="max-w-7xl mx-auto px-5 sm:px-6 py-act">
        <div className="grid lg:grid-cols-2 gap-10">
          <Reveal>
            <div>
              <div className="eyebrow text-primary mb-5">Visit us</div>
              <h2 className="display text-[clamp(2rem,5.5vw,3.75rem)]">Come train with us.</h2>
              <p className="mt-5 text-muted-foreground">
                Walk in during opening hours, or call us to book a tour.
              </p>

              <div className="mt-9 space-y-2.5">
                <a
                  href={CLUB.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-4 rounded-2xl border border-white/8 bg-ink-2/50 p-4 hover:border-primary/50 transition-colors"
                >
                  <MapPin className="text-primary shrink-0" size={20} />
                  <div>
                    <div className="font-medium">{CLUB.street}</div>
                    <div className="text-sm text-muted-foreground">
                      {CLUB.locality} {CLUB.postalCode}, {CLUB.country}
                    </div>
                  </div>
                </a>

                <a
                  href={CLUB.phoneHref}
                  className="flex items-start gap-4 rounded-2xl border border-primary/35 bg-primary/10 p-4 hover:bg-primary/15 transition-colors"
                >
                  <Phone className="text-primary shrink-0" size={20} />
                  <div>
                    <div className="font-medium">{CLUB.phoneDisplay}</div>
                    <div className="text-sm text-muted-foreground">Tap to call</div>
                  </div>
                </a>

                <div className="rounded-2xl border border-white/8 bg-ink-2/50 p-4">
                  <div className="flex items-center gap-3 mb-3.5">
                    <Clock className="text-primary" size={20} />
                    <div className="font-medium">Opening hours · daily</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="rounded-xl bg-ink/60 p-3">
                      <div className="text-xs text-muted-foreground">Morning</div>
                      <div className="font-medium mt-0.5">{CLUB.hours.morning}</div>
                    </div>
                    <div className="rounded-xl bg-ink/60 p-3">
                      <div className="text-xs text-muted-foreground">Evening</div>
                      <div className="font-medium mt-0.5">{CLUB.hours.evening}</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2.5 pt-3">
                  {[Instagram, Facebook, MessageCircle].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      aria-label="Social link"
                      className="grid place-items-center h-11 w-11 rounded-full border border-white/10 hover:border-primary hover:text-primary transition-colors"
                    >
                      <Icon size={17} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="rounded-3xl overflow-hidden border border-white/8 h-full min-h-[420px]">
              <iframe
                title="Map to 3B Karaitivu Fitness Club"
                src="https://www.google.com/maps?q=11+Main+Street+Karaitivu+13250+Sri+Lanka&output=embed"
                className="w-full h-full min-h-[420px]"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-white/8 bg-ink-2/40 pb-20 md:pb-0">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-14 grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Logo className="h-11 w-auto object-contain" />
              <span className="font-medium tracking-tight">{CLUB.shortName}</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Karaitivu's fitness club — separate Ladies &amp; Gents sections, open daily.
            </p>
          </div>
          <div>
            <div className="eyebrow text-muted-foreground mb-4">Explore</div>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {explore.map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="hover:text-foreground transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="eyebrow text-muted-foreground mb-4">Reach us</div>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                {CLUB.street}, {CLUB.locality} {CLUB.postalCode}
              </li>
              <li>
                <a href={CLUB.phoneHref} className="hover:text-foreground transition-colors">
                  {CLUB.phoneDisplay}
                </a>
              </li>
              <li>Daily · 6–10 AM &amp; 4:30–10 PM</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/8">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 py-5 text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-2">
            <div>© {new Date().getFullYear()} 3B Karaitivu Fitness Club. All rights reserved.</div>
            <div>Ladies &amp; Gents · Karaitivu, Sri Lanka</div>
          </div>
        </div>
      </footer>
    </>
  );
}
