import { img } from "@/lib/images";

type Props = {
  /** Asset base name, e.g. "hero-gym" — see scripts/images.mjs output. */
  name: string;
  alt: string;
  /** `sizes` attribute. Get this right or the browser downloads the 1920w. */
  sizes: string;
  className?: string;
  /** Only the hero should be eager; everything else stays lazy. */
  priority?: boolean;
};

/**
 * Responsive WebP <img> with intrinsic dimensions set, so the box is reserved
 * before bytes arrive and the layout never shifts.
 */
export function Img({ name, alt, sizes, className, priority = false }: Props) {
  const { src, srcSet, width, height } = img(name);
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}
