/**
 * Converts every JPEG/PNG in src/assets/ into responsive WebP variants.
 *
 * Re-run this after dropping new photos into src/assets/:
 *   node scripts/images.mjs
 *
 * Output: src/assets/<name>-<width>w.webp for each width that is smaller than
 * the source. Sources are left in place but are not imported by the app.
 */
import { readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIR = "src/assets";
const WIDTHS = [480, 768, 1280, 1920];
const QUALITY = 78;

const files = (await readdir(DIR)).filter((f) => /\.(jpe?g|png)$/i.test(f));

if (files.length === 0) {
  console.log("No source images found in", DIR);
  process.exit(0);
}

let totalIn = 0;
let totalOut = 0;
/** base -> { w, h } of the source, so components can set width/height and avoid CLS. */
const manifest = {};

for (const file of files) {
  const src = path.join(DIR, file);
  const base = file.replace(/\.(jpe?g|png)$/i, "");
  const meta = await sharp(src).metadata();
  totalIn += (await stat(src)).size;

  const targets = WIDTHS.filter((w) => w < meta.width);
  // Always emit the native width so there is a top-end variant.
  if (!targets.includes(meta.width)) targets.push(meta.width);

  const emitted = [];
  for (const w of targets) {
    const out = path.join(DIR, `${base}-${w}w.webp`);
    const info = await sharp(src)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(out);
    totalOut += info.size;
    emitted.push(`${w}w ${(info.size / 1024).toFixed(0)}KB`);
  }
  manifest[base] = { w: meta.width, h: meta.height };
  console.log(`${file} (${meta.width}x${meta.height}) -> ${emitted.join(", ")}`);
}

await writeFile(
  path.join(DIR, "images.json"),
  JSON.stringify(manifest, null, 2) + "\n",
);

console.log(
  `\n${files.length} sources ${(totalIn / 1024).toFixed(0)}KB -> ` +
    `${(totalOut / 1024).toFixed(0)}KB across all WebP variants`,
);
