"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProductCardProps {
  name: string;
  dayImage: string;
  nightImage?: string;
  href?: string;
  buttonText?: string;
  showArrow?: boolean;
  enableImageCrossfade?: boolean;
  imagePosition?: string;
  onEnquire?: (name: string) => void;
  onImageClick?: (imageSrc: string, name: string) => void;
}

export const cardVariants = {
  hidden: { y: 16, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

const NEUTRAL_PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600'%3E%3Crect width='100%25' height='100%25' fill='%2318181b'/%3E%3Cpath d='M200 270 L200 330 M170 300 L230 300' stroke='%233f3f46' stroke-width='2' stroke-linecap='round'/%3E%3Ctext x='50%25' y='360' dominant-baseline='middle' text-anchor='middle' fill='%2371717a' font-family='sans-serif' font-size='12' font-weight='700'%3ESSIL INFRASTRUCTURE%3C/text%3E%3C/svg%3E";

export const ProductCard = ({
  name,
  dayImage,
  nightImage,
  href = "#",
  buttonText = "View All",
  showArrow = true,
  enableImageCrossfade = true,
  imagePosition = "object-top",
  onEnquire,
  onImageClick,
}: ProductCardProps) => {
  const safeDay = dayImage && !dayImage.startsWith("/images/") ? dayImage : NEUTRAL_PLACEHOLDER;
  const safeNight = nightImage && !nightImage.startsWith("/images/") ? nightImage : (dayImage || NEUTRAL_PLACEHOLDER);

  const [daySrc, setDaySrc] = React.useState<string>(safeDay);
  const [nightSrc, setNightSrc] = React.useState<string>(safeNight);

  React.useEffect(() => {
    if (dayImage && !dayImage.startsWith("/images/")) setDaySrc(dayImage);
    if (nightImage && !nightImage.startsWith("/images/")) setNightSrc(nightImage);
  }, [dayImage, nightImage]);

  const content = (
    <div
      className={cn(
        "group relative w-full aspect-[10/15] rounded-none overflow-hidden cursor-pointer border border-slate-200/90 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900 transition-all duration-300 ease-out",
        "hover:-translate-y-1.5 hover:border-ssil-red dark:hover:border-ssil-red shadow-sm hover:shadow-xl dark:hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8),0_0_24px_-2px_rgba(229,62,62,0.4)]"
      )}
      onClick={(e) => {
        if (onImageClick) {
          e.preventDefault();
          onImageClick(daySrc, name);
        } else if (onEnquire) {
          e.preventDefault();
          onEnquire(name);
        }
      }}
    >
      {enableImageCrossfade ? (
        <>
          {/* Day Image */}
          <img
            src={daySrc}
            alt={`${name} Day`}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105",
              imagePosition || "object-top"
            )}
            loading="lazy"
            decoding="async"
            onError={() => {
              if (daySrc !== NEUTRAL_PLACEHOLDER) setDaySrc(NEUTRAL_PLACEHOLDER);
            }}
          />

          {/* Night Image */}
          <img
            src={nightSrc}
            alt={`${name} Night`}
            className={cn(
              "absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out pointer-events-none",
              imagePosition || "object-top"
            )}
            loading="lazy"
            decoding="async"
            onError={() => {
              if (nightSrc !== NEUTRAL_PLACEHOLDER) setNightSrc(NEUTRAL_PLACEHOLDER);
            }}
          />
        </>
      ) : (
        /* Single Image Mode */
        <img
          src={daySrc}
          alt={name}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105",
            imagePosition || "object-top"
          )}
          loading="lazy"
          decoding="async"
          onError={() => {
            if (daySrc !== NEUTRAL_PLACEHOLDER) setDaySrc(NEUTRAL_PLACEHOLDER);
          }}
        />
      )}

      {/* Bottom Glass Overlay */}
      <div className="absolute bottom-0 inset-x-0 bg-slate-950/50 backdrop-blur-xs border-t border-white/10 px-3.5 py-3 sm:px-4 sm:py-3.5 flex items-center justify-between gap-3 z-10 transition-all duration-300 group-hover:bg-slate-950/70 group-hover:border-white/20">
        <h3 className="text-xs sm:text-sm font-medium text-white tracking-normal leading-snug text-left flex-1 min-w-0">
          {name}
        </h3>

        <button
          type="button"
          onClick={(e) => {
            if (onEnquire) {
              e.stopPropagation();
              e.preventDefault();
              onEnquire(name);
            }
          }}
          className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-white shrink-0 bg-ssil-red hover:bg-ssil-red-600 transition-all duration-200 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md shadow-xs group-hover:scale-[1.02]"
        >
          <span>{buttonText}</span>
          {showArrow && <ChevronRight className="h-3.5 w-3.5 text-white shrink-0" />}
        </button>
      </div>
    </div>
  );

  return (
    <motion.div variants={cardVariants} className="w-full">
      {onEnquire ? (
        content
      ) : (
        <Link href={href} className="block w-full">
          {content}
        </Link>
      )}
    </motion.div>
  );
};
