/**
 * SSIL Cloudinary Delivery & Responsive Optimization Utilities
 * 
 * Dynamically applies optimal Cloudinary transformations (f_auto, q_auto, w_xxx, c_limit)
 * to deliver crisp, high-performance images without oversized downloads.
 * 
 * Preserves the original source assets in MongoDB/Cloudinary while serving
 * device-optimized variants at runtime for web and mobile viewports.
 */

export interface CloudinaryTransformOptions {
  width?: number;
  height?: number;
  quality?: "auto" | "auto:best" | "auto:good" | "auto:eco" | "auto:low" | number;
  format?: "auto" | "webp" | "avif" | "png" | "jpg";
  crop?: "limit" | "fit" | "fill" | "thumb" | "scale";
  dpr?: "auto" | number;
}

/**
 * Transforms any Cloudinary image URL with specified delivery optimizations.
 * Non-Cloudinary URLs, data URIs, or SVG placeholders are returned unmodified.
 */
export function getOptimizedCloudinaryUrl(
  url?: string | null,
  options: CloudinaryTransformOptions = {}
): string {
  if (!url || typeof url !== "string") return "";
  const cleanUrl = url.trim();
  if (!cleanUrl.includes("res.cloudinary.com") || cleanUrl.startsWith("data:")) {
    return cleanUrl;
  }

  const {
    width,
    height,
    quality = "auto",
    format = "auto",
    crop = "limit",
    dpr,
  } = options;

  // Match: https://res.cloudinary.com/<cloud>/image/upload/<transformations>/<version>/<public_id>
  const match = cleanUrl.match(
    /^(https?:\/\/res\.cloudinary\.com\/[^/]+\/(image|video)\/upload\/)(.*)$/
  );
  if (!match) return cleanUrl;

  const prefix = match[1];
  const rest = match[3];

  // Parse existing transformation segments if present
  const parts = rest.split("/");
  let pathRemainder = "";

  if (parts.length > 1 && !parts[0].match(/^v\d+$/) && !parts[0].includes(".")) {
    pathRemainder = parts.slice(1).join("/");
  } else {
    pathRemainder = rest;
  }

  // Build new transformation parameters
  const transformList: string[] = [];
  if (format) transformList.push(`f_${format}`);
  if (quality) transformList.push(`q_${quality}`);
  if (width) transformList.push(`w_${width}`);
  if (height) transformList.push(`h_${height}`);
  if (crop && (width || height)) transformList.push(`c_${crop}`);
  if (dpr) transformList.push(`dpr_${dpr}`);

  const transformString = transformList.join(",");
  return `${prefix}${transformString}/${pathRemainder}`;
}

/**
 * Generates standard responsive `srcset` attribute string for Cloudinary images.
 * Returns empty string for local/non-Cloudinary assets.
 */
export function getCloudinarySrcSet(
  url?: string | null,
  widths: readonly number[] | number[] = [380, 560, 760],
  options: Omit<CloudinaryTransformOptions, "width"> = {}
): string {
  if (!url || typeof url !== "string") return "";
  const cleanUrl = url.trim();
  if (!cleanUrl.includes("res.cloudinary.com") || cleanUrl.startsWith("data:")) {
    return "";
  }

  return widths
    .map((w) => `${getOptimizedCloudinaryUrl(cleanUrl, { ...options, width: w })} ${w}w`)
    .join(", ");
}

/**
 * Standard SSIL UI presets for consistent image delivery
 */
export const IMAGE_PRESETS = {
  // Portrait Product Cards (Displayed at ~300-500px width)
  CARD: {
    defaultWidth: 600,
    widths: [380, 560, 760] as const,
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw",
    transform: { width: 600, quality: "auto", format: "auto", crop: "limit" } as CloudinaryTransformOptions,
  },
  // Full-bleed Hero Banners (Displayed across entire screen)
  HERO: {
    defaultWidth: 1920,
    widths: [640, 1080, 1920] as const,
    sizes: "100vw",
    transform: { width: 1920, quality: "auto", format: "auto", crop: "limit" } as CloudinaryTransformOptions,
  },
  // Showcase Previews & Large Modals
  SHOWCASE: {
    defaultWidth: 900,
    widths: [480, 800, 1200] as const,
    sizes: "(max-width: 768px) 100vw, 50vw",
    transform: { width: 900, quality: "auto", format: "auto", crop: "limit" } as CloudinaryTransformOptions,
  },
  // Brand Logos & Project Badges
  LOGO: {
    defaultWidth: 240,
    widths: [120, 240, 360] as const,
    sizes: "180px",
    transform: { width: 240, quality: "auto", format: "auto", crop: "limit" } as CloudinaryTransformOptions,
  },
  // Small Thumbnails & Indicators
  THUMBNAIL: {
    defaultWidth: 200,
    widths: [150, 300] as const,
    sizes: "100px",
    transform: { width: 200, quality: "auto", format: "auto", crop: "limit" } as CloudinaryTransformOptions,
  },
} as const;
