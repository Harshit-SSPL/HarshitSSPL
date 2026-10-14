"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  generateFallbackKey,
  getRegisteredFallback,
  getTechnicalPlaceholder,
  FallbackKeyOptions,
} from "./fallback-registry";
import {
  recordLastKnownGood,
  getLastKnownGood,
} from "./resilience-store";
import {
  getOptimizedCloudinaryUrl,
  getCloudinarySrcSet,
  CloudinaryTransformOptions,
} from "./cloudinary";

export interface UseResilientImageOptions {
  liveSrc?: string | null;
  keyOptions: FallbackKeyOptions;
  placeholderType?: "product" | "banner" | "logo";
  transformOptions?: CloudinaryTransformOptions;
  responsiveWidths?: readonly number[] | number[];
  sizes?: string;
}

export interface ResilientImageResult {
  src: string;
  srcSet?: string;
  sizes?: string;
  isFallback: boolean;
  isPlaceholder: boolean;
  onLoad: () => void;
  onError: () => void;
}

/**
 * useResilientImage Hook with Cloudinary Delivery Optimization
 * 
 * Strict 3-Level Priority:
 * Level 1: Live Cloudinary / MongoDB Image (Optimized with responsive width, f_auto, q_auto)
 * Level 2: Deterministic Static Fallback || Last-Known-Good Image
 * Level 3: Neutral Technical SVG Placeholder
 * 
 * Guarantees:
 * - Live source is ALWAYS rendered first without pre-loading fallback (zero flash).
 * - Delivers lightweight, responsive width-scaled assets to eliminate oversized downloads.
 * - Reactively resets error states whenever liveSrc updates.
 * - Records successful live loads to Last-Known-Good storage.
 * - Handles errors gracefully without loops or layout shifts.
 */
export function useResilientImage({
  liveSrc,
  keyOptions,
  placeholderType = "product",
  transformOptions,
  responsiveWidths,
  sizes,
}: UseResilientImageOptions): ResilientImageResult {
  const [errorLevel, setErrorLevel] = useState<number>(0); // 0 = Live (L1), 1 = Fallback/LKG (L2), 2 = Technical Placeholder (L3)

  // Generate stable deterministic key
  const identityKey = useMemo(() => generateFallbackKey(keyOptions), [
    keyOptions.type,
    keyOptions.slug,
    keyOptions.id,
    keyOptions.variant,
  ]);

  // Reset to Level 1 whenever liveSrc changes
  useEffect(() => {
    setErrorLevel(0);
  }, [liveSrc, identityKey]);

  // Determine current active source based on level
  const resolved = useMemo(() => {
    const technicalPlaceholder = getTechnicalPlaceholder(placeholderType);
    const cleanLive = (liveSrc && typeof liveSrc === "string" && liveSrc.trim() && !liveSrc.startsWith("/images/")) 
      ? liveSrc.trim() 
      : null;

    // LEVEL 1: Primary Live Image
    if (errorLevel === 0) {
      if (cleanLive) {
        const optimizedSrc = transformOptions 
          ? getOptimizedCloudinaryUrl(cleanLive, transformOptions) 
          : cleanLive;
        const generatedSrcSet = responsiveWidths && responsiveWidths.length > 0 
          ? getCloudinarySrcSet(cleanLive, responsiveWidths, transformOptions) 
          : undefined;

        return {
          src: optimizedSrc,
          rawSrc: cleanLive,
          srcSet: generatedSrcSet,
          sizes: generatedSrcSet ? (sizes || "100vw") : undefined,
          isFallback: false,
          isPlaceholder: false,
        };
      }
      // If no live source provided initially, try Level 2
      const registeredFallback = getRegisteredFallback(identityKey);
      const lkg = getLastKnownGood(identityKey);
      const secondarySrc = registeredFallback || lkg;
      if (secondarySrc) {
        return {
          src: secondarySrc,
          rawSrc: secondarySrc,
          srcSet: undefined,
          sizes: undefined,
          isFallback: true,
          isPlaceholder: false,
        };
      }
      // Drop to Level 3
      return {
        src: technicalPlaceholder,
        rawSrc: technicalPlaceholder,
        srcSet: undefined,
        sizes: undefined,
        isFallback: false,
        isPlaceholder: true,
      };
    }

    // LEVEL 2: Fallback / Last-Known-Good
    if (errorLevel === 1) {
      const registeredFallback = getRegisteredFallback(identityKey);
      const lkg = getLastKnownGood(identityKey);
      const secondarySrc = registeredFallback || lkg;
      if (secondarySrc && secondarySrc !== cleanLive) {
        const optimizedSecondary = transformOptions 
          ? getOptimizedCloudinaryUrl(secondarySrc, transformOptions) 
          : secondarySrc;
        return {
          src: optimizedSecondary,
          rawSrc: secondarySrc,
          srcSet: undefined,
          sizes: undefined,
          isFallback: true,
          isPlaceholder: false,
        };
      }
      // If Level 2 is identical to failed live source or missing, drop to Level 3
      return {
        src: technicalPlaceholder,
        rawSrc: technicalPlaceholder,
        srcSet: undefined,
        sizes: undefined,
        isFallback: false,
        isPlaceholder: true,
      };
    }

    // LEVEL 3: Neutral Technical Placeholder
    return {
      src: technicalPlaceholder,
      rawSrc: technicalPlaceholder,
      srcSet: undefined,
      sizes: undefined,
      isFallback: false,
      isPlaceholder: true,
    };
  }, [errorLevel, liveSrc, identityKey, placeholderType, transformOptions, responsiveWidths, sizes]);

  const handleLoad = useCallback(() => {
    // Record successfully loaded raw live asset to Last-Known-Good store
    if (errorLevel === 0 && resolved.rawSrc && !resolved.isPlaceholder && !resolved.isFallback) {
      recordLastKnownGood(identityKey, resolved.rawSrc);
    }
  }, [errorLevel, identityKey, resolved.rawSrc, resolved.isPlaceholder, resolved.isFallback]);

  const handleError = useCallback(() => {
    // Escalate error level safely without infinite loop
    setErrorLevel((prev) => {
      if (prev === 0) return 1; // Live failed -> try Level 2
      if (prev === 1) return 2; // Level 2 failed -> drop to Level 3
      return 2; // Level 3 reached -> terminate escalation
    });
  }, []);

  return {
    src: resolved.src,
    srcSet: resolved.srcSet,
    sizes: resolved.sizes,
    isFallback: resolved.isFallback,
    isPlaceholder: resolved.isPlaceholder,
    onLoad: handleLoad,
    onError: handleError,
  };
}
