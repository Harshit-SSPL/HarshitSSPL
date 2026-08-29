"use client";

import React from "react";
import Image from "next/image";
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
  onEnquire?: (name: string) => void;
}

export const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

export const ProductCard = ({
  name,
  dayImage,
  nightImage,
  href = "#",
  buttonText = "View All",
  showArrow = true,
  enableImageCrossfade = true,
  onEnquire,
}: ProductCardProps) => {
  const content = (
    <div
      className={cn(
        "group relative w-full aspect-[10/14] rounded-none overflow-hidden cursor-pointer border-2 border-slate-200/80 dark:border-zinc-800 transition-all duration-300 ease-out",
        "hover:-translate-y-2 hover:scale-[1.015] hover:border-ssil-red dark:hover:border-ssil-red shadow-md hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.35),0_0_28px_-2px_rgba(229,62,62,0.5)] dark:hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.9),0_0_35px_0px_rgba(229,62,62,0.6)]"
      )}
      onClick={(e) => {
        if (onEnquire) {
          e.preventDefault();
          onEnquire(name);
        }
      }}
    >
      {enableImageCrossfade ? (
        <>
          {/* Day Image (Default Mode - Always in background) */}
          <img
            src={dayImage}
            alt={`${name} Day`}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            loading="eager"
          />

          {/* Night Image (Hover Crossfade Mode - Smoothly fades in on hover) */}
          <img
            src={nightImage || dayImage}
            alt={`${name} Night`}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out group-hover:scale-105 pointer-events-none"
            loading="eager"
          />
        </>
      ) : (
        /* Single Image Mode for Internal Design Pages */
        <img
          src={dayImage}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          loading="eager"
        />
      )}

      {/* Bottom Glass Overlay: Full Width Translucent Bar matching Transparent Navbar styling */}
      <div className="absolute bottom-0 inset-x-0 bg-slate-950/45 dark:bg-slate-950/50 backdrop-blur-md border-t border-white/10 px-3.5 py-3 sm:px-4 sm:py-3.5 flex items-center justify-between gap-3 z-10 transition-all duration-300 group-hover:bg-slate-950/65 group-hover:border-white/20">
        
        {/* Left Side: Product/Design Name */}
        <h3 className="text-xs sm:text-sm font-medium text-white tracking-normal leading-snug text-left flex-1 min-w-0">
          {name}
        </h3>

        {/* Right Side: Solid SSIL Red Button with White Text & Chevron Right Arrow */}
        <button
          type="button"
          onClick={(e) => {
            if (onEnquire) {
              e.stopPropagation();
              e.preventDefault();
              onEnquire(name);
            }
          }}
          className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium text-white shrink-0 bg-ssil-red hover:bg-ssil-red-600 transition-all duration-200 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md shadow-sm group-hover:scale-[1.03]"
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
