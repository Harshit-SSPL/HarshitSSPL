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

export interface UseResilientImageOptions {
  liveSrc?: string | null;
  keyOptions: FallbackKeyOptions;
  placeholderType?: "product" | "banner" | "logo";
}

export interface ResilientImageResult {
  src: string;
  isFallback: boolean;
  isPlaceholder: boolean;
  onLoad: () => void;
  onError: () => void;
}

/**
 * useResilientImage Hook
 * 
 * Strict 3-Level Priority:
 * Level 1: Live Cloudinary / MongoDB Image
 * Level 2: Deterministic Static Fallback || Last-Known-Good Image
 * Level 3: Neutral Technical SVG Placeholder
 * 
 * Guarantees:
 * - Live source is ALWAYS rendered first without pre-loading fallback (zero flash).
 * - Reactively resets error states whenever liveSrc updates.
 * - Records successful live loads to Last-Known-Good storage.
 * - Handles errors gracefully without loops or layout shifts.
 */
export function useResilientImage({
  liveSrc,
  keyOptions,
  placeholderType = "product",
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
        return {
          src: cleanLive,
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
          isFallback: true,
          isPlaceholder: false,
        };
      }
      // Drop to Level 3
      return {
        src: technicalPlaceholder,
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
        return {
          src: secondarySrc,
          isFallback: true,
          isPlaceholder: false,
        };
      }
      // If Level 2 is identical to failed live source or missing, drop to Level 3
      return {
        src: technicalPlaceholder,
        isFallback: false,
        isPlaceholder: true,
      };
    }

    // LEVEL 3: Neutral Technical Placeholder
    return {
      src: technicalPlaceholder,
      isFallback: false,
      isPlaceholder: true,
    };
  }, [errorLevel, liveSrc, identityKey, placeholderType]);

  const handleLoad = useCallback(() => {
    // Record successfully loaded live asset to Last-Known-Good store
    if (errorLevel === 0 && resolved.src && !resolved.isPlaceholder && !resolved.isFallback) {
      recordLastKnownGood(identityKey, resolved.src);
    }
  }, [errorLevel, identityKey, resolved.src, resolved.isPlaceholder, resolved.isFallback]);

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
    isFallback: resolved.isFallback,
    isPlaceholder: resolved.isPlaceholder,
    onLoad: handleLoad,
    onError: handleError,
  };
}
