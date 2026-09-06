/**
 * SSIL Production-Grade Fallback Registry
 * 
 * Provides deterministic mapping for offline/resilience fallbacks across all products,
 * models, hero banners, gallery items, and national projects.
 * 
 * Fallback Priority:
 * Level 1: Live Cloudinary / MongoDB asset (Primary)
 * Level 2: Static Fallback Image / Last-Known-Good Cached Asset (Resilience)
 * Level 3: Neutral Technical SVG Placeholder (Safety Net)
 */

import {
  NEUTRAL_PRODUCT_PLACEHOLDER,
  NEUTRAL_BANNER_PLACEHOLDER,
  NEUTRAL_LOGO_PLACEHOLDER,
} from "./placeholders";

export type MediaVariant = "day" | "night" | "hero" | "logo" | "default";

export interface FallbackKeyOptions {
  type: "product" | "design" | "hero" | "project" | "gallery" | "logo";
  slug?: string;
  id?: string;
  variant?: MediaVariant;
}

/**
 * Generates a stable, deterministic identity key for any media asset in the application.
 * Never relies on array indices or DOM position.
 */
export function generateFallbackKey({
  type,
  slug = "generic",
  id,
  variant = "default",
}: FallbackKeyOptions): string {
  const cleanType = type.toLowerCase().trim();
  const cleanSlug = slug.toLowerCase().trim();
  const cleanId = id ? id.toLowerCase().trim() : "";
  const cleanVariant = variant.toLowerCase().trim();

  if (cleanId) {
    return `${cleanType}:${cleanSlug}:${cleanId}:${cleanVariant}`;
  }
  return `${cleanType}:${cleanSlug}:${cleanVariant}`;
}

/**
 * Static Fallback Photo Registry Map
 * 
 * This registry is structurally wired and ready to receive real static photos
 * when provided in subsequent phases (e.g. `/fallback/products/...`).
 * At this phase, unpopulated entries safely return null, allowing Last-Known-Good
 * or Level 3 Technical SVG to provide resilience without inventing dummy photos.
 */
const STATIC_FALLBACK_REGISTRY: Record<string, string> = {
  // Structure is pre-indexed for future static fallback assets:
  // e.g., "design:designer-poles:ssil-dp-01:day": "/fallback/designer-poles/ssil-dp-01-day.webp"
};

/**
 * Retrieves a registered static fallback image if available.
 */
export function getRegisteredFallback(key: string): string | null {
  if (!key) return null;
  return STATIC_FALLBACK_REGISTRY[key] || null;
}

/**
 * Returns Level 3 Neutral Technical SVG Placeholder based on asset type.
 */
export function getTechnicalPlaceholder(
  type: "product" | "banner" | "logo" = "product"
): string {
  switch (type) {
    case "banner":
      return NEUTRAL_BANNER_PLACEHOLDER;
    case "logo":
      return NEUTRAL_LOGO_PLACEHOLDER;
    case "product":
    default:
      return NEUTRAL_PRODUCT_PLACEHOLDER;
  }
}
