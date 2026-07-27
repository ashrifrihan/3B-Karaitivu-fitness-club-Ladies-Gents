/**
 * Downloads a Higgsfield generation result into src/assets/ under a stable name.
 *
 *   node scripts/fetch-generated.mjs <url> <basename>
 *
 * Then run `node scripts/images.mjs` to emit the responsive WebP variants.
 */
import { writeFile } from "node:fs/promises";

const [url, base] = process.argv.slice(2);
if (!url || !base) {
  console.error("usage: node scripts/fetch-generated.mjs <url> <basename>");
  process.exit(1);
}

const res = await fetch(url);
if (!res.ok) {
  console.error(`fetch failed: ${res.status} ${res.statusText}`);
  process.exit(1);
}
const buf = Buffer.from(await res.arrayBuffer());
const ext = new URL(url).pathname.endsWith(".webp") ? "webp" : "png";
const out = `src/assets/${base}.${ext}`;
await writeFile(out, buf);
console.log(`${out} ${(buf.length / 1024).toFixed(0)}KB`);
