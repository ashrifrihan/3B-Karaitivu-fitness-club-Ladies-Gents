import manifest from "@/assets/images.json";

/**
 * Responsive WebP lookup for the variants emitted by scripts/images.mjs.
 *
 * Vite has no built-in responsive transform, so the variants are generated
 * ahead of time and collected here with import.meta.glob. Widths come from the
 * filename; intrinsic dimensions come from images.json so every <img> can carry
 * width/height and reserve its box before the bytes land.
 */
const urls = import.meta.glob<string>("../assets/*-*w.webp", {
  eager: true,
  import: "default",
});

type Variant = { url: string; w: number };

const variants = new Map<string, Variant[]>();
for (const [file, url] of Object.entries(urls)) {
  // Keys arrive as "../assets/hero-gym-1920w.webp" — match only the final
  // path segment, or a greedy .+ swallows "assets/" into the base name.
  const match = file.match(/([^/]+)-(\d+)w\.webp$/);
  if (!match) continue;
  const [, base, width] = match;
  const list = variants.get(base) ?? [];
  list.push({ url, w: Number(width) });
  variants.set(base, list);
}
for (const list of variants.values()) list.sort((a, b) => a.w - b.w);

type Dimensions = { w: number; h: number };
const dimensions = manifest as Record<string, Dimensions>;

export type ResponsiveImage = {
  src: string;
  srcSet: string;
  width: number;
  height: number;
};

/**
 * @param base   asset name without extension or width suffix, e.g. "hero-gym"
 * @param sizes  passed straight through to the caller's `sizes` attribute
 */
export function img(base: string): ResponsiveImage {
  const list = variants.get(base);
  if (!list || list.length === 0) {
    throw new Error(
      `No WebP variants for "${base}". Run \`node scripts/images.mjs\` after adding it to src/assets/.`,
    );
  }
  const dim = dimensions[base] ?? { w: list.at(-1)!.w, h: list.at(-1)!.w };
  return {
    src: list.at(-1)!.url,
    srcSet: list.map((v) => `${v.url} ${v.w}w`).join(", "),
    width: dim.w,
    height: dim.h,
  };
}
