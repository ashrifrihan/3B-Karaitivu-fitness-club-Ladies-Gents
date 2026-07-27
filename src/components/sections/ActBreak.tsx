import { Img } from "@/components/Img";
import { CLUB } from "@/lib/club";

/**
 * Full-bleed break between Act II (dense proof) and Act III (calm, decide).
 * Its only job is to stop the page reading as an unbroken run of rounded cards
 * on the same background.
 */
export function ActBreak() {
  return (
    <section aria-label="Inside the club" className="relative h-[45vh] min-h-[320px] overflow-hidden">
      <Img
        name="power-zone"
        alt="Free-weights floor at 3B Karaitivu Fitness Club, Karaitivu Sri Lanka"
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-background/65" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      <div className="relative h-full max-w-7xl mx-auto px-5 flex items-center">
        <p className="display-tight text-[clamp(1.5rem,4.5vw,3rem)] leading-[1.02] max-w-3xl">
          Six AM. Sodium lights on.{" "}
          <span className="text-primary">Before {CLUB.locality} wakes up.</span>
        </p>
      </div>
    </section>
  );
}
