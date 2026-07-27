import { Img } from "@/components/Img";

/**
 * The club's real logo mark. Sized in CSS by the caller via `className`;
 * `sizes` stays small so the browser picks the 480w WebP variant rather than
 * the 1536w original.
 */
export function Logo({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Img
      name="logo"
      alt="3B Karaitivu Fitness Club logo"
      sizes="300px"
      priority={priority}
      className={className}
    />
  );
}
