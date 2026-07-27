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

/**
 * Act III close — the action point. Deliberately calm: address, phone, hours,
 * map. Nothing here should compete with the phone number.
 */
export function ContactFooter() {
  return (
    <>
      <section id="contact" className="max-w-7xl mx-auto px-5 py-act-open">
        <div className="grid lg:grid-cols-2 gap-10">
          <Reveal>
            <div>
              <div className="eyebrow text-primary mb-4">Visit us</div>
              <h2 className="display-tight text-[clamp(2rem,6vw,4rem)] leading-[0.95]">
                Come train with us.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Walk in during opening hours, or call us to book a tour.
              </p>

              <div className="mt-8 space-y-3">
                <a
                  href={CLUB.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-4 rounded-2xl border border-border bg-card p-4 hover:border-primary transition-colors"
                >
                  <MapPin className="text-primary shrink-0" />
                  <div>
                    <div className="font-semibold">{CLUB.street}</div>
                    <div className="text-sm text-muted-foreground">
                      {CLUB.locality} {CLUB.postalCode}, {CLUB.country}
                    </div>
                  </div>
                </a>

                <a
                  href={CLUB.phoneHref}
                  className="flex items-start gap-4 rounded-2xl border border-primary/40 bg-primary/10 p-4 hover:bg-primary/20 transition-colors"
                >
                  <Phone className="text-primary shrink-0" />
                  <div>
                    <div className="font-semibold">{CLUB.phoneDisplay}</div>
                    <div className="text-sm text-muted-foreground">Tap to call</div>
                  </div>
                </a>

                <div className="rounded-2xl border border-border bg-card p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="text-primary" />
                    <div className="font-semibold">Opening hours · daily</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="rounded-xl bg-background/60 p-3">
                      <div className="text-xs text-muted-foreground">Morning</div>
                      <div className="font-semibold">{CLUB.hours.morning}</div>
                    </div>
                    <div className="rounded-xl bg-background/60 p-3">
                      <div className="text-xs text-muted-foreground">Evening</div>
                      <div className="font-semibold">{CLUB.hours.evening}</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  {[Instagram, Facebook, MessageCircle].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      aria-label="Social link"
                      className="grid place-items-center h-11 w-11 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
                    >
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
                className="w-full h-full min-h-[400px]"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-border bg-card/40 pb-20 md:pb-0">
        <div className="max-w-7xl mx-auto px-5 py-14 grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Logo className="h-11 w-auto object-contain" />
              <span className="font-display font-extrabold uppercase tracking-tight">
                {CLUB.shortName}
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Karaitivu's premier fitness club — separate Ladies &amp; Gents sections, open daily.
            </p>
          </div>
          <div>
            <div className="eyebrow text-muted-foreground mb-4">Explore</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
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
            <ul className="space-y-2 text-sm text-muted-foreground">
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
        <div className="border-t border-border">
          <div className="max-w-7xl mx-auto px-5 py-5 text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-2">
            <div>© {new Date().getFullYear()} 3B Karaitivu Fitness Club. All rights reserved.</div>
            <div>Ladies &amp; Gents · Karaitivu, Sri Lanka</div>
          </div>
        </div>
      </footer>
    </>
  );
}
