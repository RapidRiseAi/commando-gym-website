/**
 * Build-time image optimizer.
 *
 * Reads source images from `media-src/`, emits responsive WebP variants into
 * `public/img/`, and writes `src/content/image-manifest.json` (intrinsic
 * dimensions + available widths + a tiny blur placeholder per image).
 *
 * Run manually after adding or changing a source image:
 *   node scripts/optimize-images.mjs
 *
 * The generated WebP files are committed and served as static assets, so the
 * site never depends on a runtime image optimizer (the Cloudflare/OpenNext
 * runtime returns originals unchanged when no Images binding is configured).
 */
import sharp from "sharp";
import { readFileSync, writeFileSync, mkdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(root, "media-src");
const OUT = path.join(root, "public", "img");
const MANIFEST = path.join(root, "src", "content", "image-manifest.json");
mkdirSync(OUT, { recursive: true });

// name, source file, output widths, quality, alpha (keep transparency)
const images = [
  { name: "commando-exterior", file: "commando-exterior.jpg", widths: [640, 960, 1280], q: 72 },
  { name: "weights", file: "weights.jpg", widths: [400, 800, 1280], q: 70 },
  { name: "cycling-bike", file: "cycling-bike.jpg", widths: [400, 800, 1280], q: 70 },
  { name: "bench-press", file: "bench-press.jpg", widths: [400, 800, 1280], q: 70 },
  { name: "chest-press", file: "chest-press.jpg", widths: [400, 800, 1280], q: 70 },
  { name: "gym-upper-floor", file: "gym-upper-floor.jpg", widths: [400, 800, 1280], q: 70 },
  { name: "legpress", file: "legpress.jpg", widths: [400, 800, 1280], q: 70 },
  { name: "smith-machine", file: "smith-machine.jpg", widths: [400, 800, 1280], q: 70 },
  { name: "recovery", file: "unsplash-recovery.jpg", widths: [480, 960, 1280], q: 72 },
  { name: "memberships", file: "unsplash-memberships.jpg", widths: [768, 1280], q: 72 },
  { name: "wellness", file: "unsplash-wellness.jpg", widths: [768, 1280, 1600], q: 72 },
  { name: "commando-logo", file: "commando-logo.png", widths: [192, 384], q: 90, alpha: true, keepNative: false }
];

const manifest = {};
let totalBefore = 0;
let totalAfter = 0;
const rows = [];

for (const img of images) {
  const srcPath = path.join(SRC, img.file);
  const beforeBytes = statSync(srcPath).size;
  totalBefore += beforeBytes;

  const meta = await sharp(srcPath).metadata();
  const intrinsicW = meta.width;
  const intrinsicH = meta.height;
  const aspect = intrinsicH / intrinsicW;

  // Always offer the native resolution as the sharpest variant (capped at
  // intrinsic) so retina screens and the lightbox get maximum available detail.
  const candidates = img.keepNative === false ? img.widths : [...img.widths, intrinsicW];
  const widths = [...new Set(candidates.filter((w) => w <= intrinsicW))].sort((a, b) => a - b);
  if (widths.length === 0) widths.push(intrinsicW);

  let largestAfter = 0;
  for (const w of widths) {
    const h = Math.round(w * aspect);
    const outPath = path.join(OUT, `${img.name}-${w}.webp`);
    const pipeline = sharp(srcPath).resize({ width: w, withoutEnlargement: true });
    await pipeline
      .webp({ quality: img.q, alphaQuality: img.alpha ? 100 : undefined, effort: 6 })
      .toFile(outPath);
    const bytes = statSync(outPath).size;
    if (w === widths[widths.length - 1]) largestAfter = bytes;
    void h;
  }
  totalAfter += largestAfter;

  // tiny blur placeholder (16px wide WebP, base64)
  const blurBuf = await sharp(srcPath)
    .resize({ width: 16 })
    .webp({ quality: 40 })
    .toBuffer();
  const blurDataURL = `data:image/webp;base64,${blurBuf.toString("base64")}`;

  manifest[img.name] = {
    width: widths[widths.length - 1],
    height: Math.round(widths[widths.length - 1] * aspect),
    intrinsicWidth: intrinsicW,
    intrinsicHeight: intrinsicH,
    widths,
    alpha: Boolean(img.alpha),
    blurDataURL
  };

  rows.push({
    name: img.name,
    before: (beforeBytes / 1024).toFixed(0) + "KB",
    after: (largestAfter / 1024).toFixed(0) + "KB (largest of " + widths.length + ")"
  });
}

writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");

console.table(rows);
console.log(
  `\nSource total: ${(totalBefore / 1024 / 1024).toFixed(2)}MB  ->  ` +
    `largest-variant total: ${(totalAfter / 1024).toFixed(0)}KB`
);
console.log(`Manifest written: ${path.relative(root, MANIFEST)}`);
