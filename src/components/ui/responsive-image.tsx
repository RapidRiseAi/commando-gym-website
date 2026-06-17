import manifest from "@/content/image-manifest.json";
import { cn } from "@/lib/utils";

type ManifestEntry = {
  width: number;
  height: number;
  intrinsicWidth: number;
  intrinsicHeight: number;
  widths: number[];
  alpha: boolean;
  blurDataURL: string;
};

const images = manifest as Record<string, ManifestEntry>;

export type ImageName = keyof typeof manifest;

type Props = {
  name: ImageName;
  alt: string;
  /** Required: lets the browser pick the right variant (e.g. "(min-width:768px) 33vw, 100vw"). */
  sizes: string;
  className?: string;
  /** Set for the LCP/hero image: eager load + high fetch priority. */
  priority?: boolean;
  /** Show a tiny blur-up background while the image loads (ignored for alpha images). */
  blur?: boolean;
};

/**
 * Renders pre-optimized WebP variants from `public/img` with srcset/sizes.
 * Intrinsic width/height are baked in to prevent layout shift, and everything
 * below the fold is lazy-loaded. No dependency on a runtime image optimizer.
 */
export function ResponsiveImage({ name, alt, sizes, className, priority = false, blur = true }: Props) {
  const entry = images[name as string];
  if (!entry) {
    throw new Error(`ResponsiveImage: unknown image "${String(name)}"`);
  }

  const srcSet = entry.widths.map((w) => `/img/${String(name)}-${w}.webp ${w}w`).join(", ");
  const fallback = `/img/${String(name)}-${entry.widths[entry.widths.length - 1]}.webp`;
  const showBlur = blur && !entry.alpha;

  return (
    // Intentional raw <img>: pre-optimized static WebP is served directly so the
    // site never relies on next/image's runtime optimizer, which is a no-op on
    // Cloudflare/OpenNext without an Images binding.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={fallback}
      srcSet={srcSet}
      sizes={sizes}
      width={entry.intrinsicWidth}
      height={entry.intrinsicHeight}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "auto"}
      className={cn(className)}
      style={
        showBlur
          ? {
              backgroundImage: `url(${entry.blurDataURL})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }
          : undefined
      }
    />
  );
}

/** Returns the manifest entry so pages can build preload links for the LCP image. */
export function getImageMeta(name: ImageName): ManifestEntry {
  return images[name as string];
}
