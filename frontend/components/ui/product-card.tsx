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
  href: string;
  buttonText?: "View All" | "Enquire";
  showArrow?: boolean;
  enableImageCrossfade?: boolean;
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
  href,
  buttonText = "View All",
  showArrow = true,
  enableImageCrossfade = true,
}: ProductCardProps) => {
  return (
    <motion.div variants={cardVariants} className="w-full">
      {/* Product Image Frame with Zero Border Radius (rounded-none) & Smooth Hover Popup */}
      <Link href={href} className="block w-full">
        <div
          className={cn(
            "group relative w-full aspect-[10/14] rounded-none overflow-hidden cursor-pointer shadow-md border border-slate-200/40 dark:border-slate-800/40 transition-all duration-300 ease-out",
            "hover:-translate-y-2 hover:scale-[1.015] hover:shadow-2xl hover:border-ssil-red/50"
          )}
        >
          {enableImageCrossfade ? (
            <>
              {/* Day Image (Default Mode) */}
              <Image
                src={dayImage}
                alt={`${name} Day`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center opacity-100 group-hover:opacity-0 transition-opacity duration-500 ease-in-out"
                priority
              />

              {/* Night Image (Hover Crossfade Mode for /products page) */}
              <Image
                src={nightImage || dayImage}
                alt={`${name} Night`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
              />
            </>
          ) : (
            /* Single Image Mode for Internal Design Pages (No Day/Night Photo Change, Smooth Zoom) */
            <Image
              src={dayImage}
              alt={name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
            />
          )}

          {/* Bottom Glass Overlay: Full Width Translucent Bar matching Transparent Navbar styling */}
          <div className="absolute bottom-0 inset-x-0 bg-slate-950/45 dark:bg-slate-950/50 backdrop-blur-md border-t border-white/10 px-3.5 py-3 sm:px-4 sm:py-3.5 flex items-center justify-between gap-3 z-10 transition-all duration-300 group-hover:bg-slate-950/65 group-hover:border-white/20">
            
            {/* Left Side: Product/Design Name (Full Name Visible, Navbar Medium Weight, Natural 2-Line Wrap) */}
            <h3 className="text-xs sm:text-sm font-medium text-white tracking-normal leading-snug text-left flex-1 min-w-0">
              {name}
            </h3>

            {/* Right Side: Solid SSIL Red Button with White Text */}
            <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium text-white shrink-0 bg-ssil-red hover:bg-ssil-red-600 transition-all duration-200 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md shadow-sm group-hover:scale-[1.03]">
              <span>{buttonText}</span>
              {showArrow && <ChevronRight className="h-3.5 w-3.5 text-white shrink-0" />}
            </span>

          </div>

        </div>
      </Link>
    </motion.div>
  );
};
