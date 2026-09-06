"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface MediaItem {
  id: string;
  title: string;
  videoUrl: string;
  aspectRatio: "9:16" | "16:9";
}

const mediaItems: MediaItem[] = [
  {
    id: "v1",
    title: "SSIL Brand Film - Engineering & Manufacturing",
    videoUrl: "https://res.cloudinary.com/wlgmz8gr/video/upload/v1788665239/ssil_ad_video_1.mp4",
    aspectRatio: "16:9",
  },
  {
    id: "v2",
    title: "Highway & Expressways Lighting Infrastructure",
    videoUrl: "https://res.cloudinary.com/wlgmz8gr/video/upload/v1788665240/ssil_ad_video_2.mp4",
    aspectRatio: "9:16",
  },
  {
    id: "v3",
    title: "High Mast & Stadium Floodlighting Systems",
    videoUrl: "https://res.cloudinary.com/wlgmz8gr/video/upload/v1788665241/ssil_ad_video_3.mp4",
    aspectRatio: "9:16",
  },
  {
    id: "v6",
    title: "Solar Lighting & Institutional Power Plants",
    videoUrl: "https://res.cloudinary.com/wlgmz8gr/video/upload/v1788665245/ssil_ad_video_6.mp4",
    aspectRatio: "16:9",
  },
  {
    id: "v4",
    title: "Smart City IoT Street Poles & Luminaires",
    videoUrl: "https://res.cloudinary.com/wlgmz8gr/video/upload/v1788665243/ssil_ad_video_4.mp4",
    aspectRatio: "9:16",
  },
  {
    id: "v5",
    title: "Heritage Poles & Monumental Flag Installations",
    videoUrl: "https://res.cloudinary.com/wlgmz8gr/video/upload/v1788665244/ssil_ad_video_5.mp4",
    aspectRatio: "9:16",
  },
];

export function MediaShowcaseSection() {
  const [selectedVideo, setSelectedVideo] = useState<MediaItem | null>(null);

  // Duplicate items array for continuous seamless glide
  const marqueeItems = [...mediaItems, ...mediaItems];

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedVideo(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section className="py-10 sm:py-14 md:py-16 bg-slate-950 text-white border-t border-b border-zinc-900 relative overflow-hidden transition-colors">
      
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-ssil-red/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10 mb-6 sm:mb-8">
        
        {/* Top Editorial Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end">
          
          {/* Left Column: Eyebrow + Editorial Headline */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-slate-400 block mb-2">
              OUR MEDIA
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05] uppercase">
              LIGHTING <br />
              <span className="text-ssil-red">IN MOTION.</span>
            </h2>
          </div>

          {/* Right Column: Company Description & Statistics Highlights */}
          <div className="lg:col-span-5 flex flex-col justify-end">
            <p className="text-xs sm:text-sm md:text-base text-slate-300 font-normal leading-relaxed mb-4">
              From engineered lighting systems to landmark infrastructure, SSIL brings design, technology and manufacturing together to illuminate the spaces that shape India.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-800/80">
              <div>
                <span className="text-xl sm:text-2xl font-black text-white block">11+</span>
                <span className="text-[10px] sm:text-xs text-slate-400 font-medium">Years Experience</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black text-white block">12</span>
                <span className="text-[10px] sm:text-xs text-slate-400 font-medium">Product Categories</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black text-ssil-red block">231</span>
                <span className="text-[10px] sm:text-xs text-slate-400 font-medium">Catalogue Designs</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ============================================================ */}
      {/* INFINITE HORIZONTAL VIDEO MARQUEE (RIGHT TO LEFT CONTINUOUS GLIDE) */}
      {/* ============================================================ */}
      <div className="relative w-full overflow-hidden py-3 select-none">
        
        {/* Left & Right Edge Vignette Gradient Overlays */}
        <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-slate-950 to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-slate-950 to-transparent z-20 pointer-events-none" />

        {/* Continuous Gliding Track */}
        <motion.div
          className="flex items-center gap-4 sm:gap-6 w-max will-change-transform transform-gpu"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 35,
            repeat: Infinity,
          }}
        >
          {marqueeItems.map((item, idx) => {
            const isPortrait = item.aspectRatio === "9:16";
            
            return (
              <div
                key={`${item.id}-${idx}`}
                onClick={() => setSelectedVideo(item)}
                className={cn(
                  "group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer border border-zinc-800/80 bg-zinc-900 shadow-xl transition-all duration-300 hover:border-ssil-red/60 hover:scale-[1.015] shrink-0 flex-none",
                  isPortrait
                    ? "h-[320px] sm:h-[370px] md:h-[390px] w-[180px] sm:w-[208px] md:w-[219px]"
                    : "h-[320px] sm:h-[370px] md:h-[390px] w-[569px] sm:w-[658px] md:w-[693px]"
                )}
              >
                {/* Play Icon Badge on Hover */}
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 backdrop-blur-xs pointer-events-none">
                  <div className="h-12 w-12 rounded-full bg-ssil-red text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Play className="h-6 w-6 fill-white ml-0.5" />
                  </div>
                </div>

                {/* Bottom Title Gradient Overlay */}
                <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-4 flex items-end pointer-events-none">
                  <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight drop-shadow-md truncate">
                    {item.title}
                  </h3>
                </div>

                {/* Autoplay Silent Background Video */}
                <video
                  src={item.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover object-center rounded-2xl sm:rounded-3xl transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* ============================================================ */}
      {/* CENTERED ENQUIRE NOW BUTTON */}
      {/* ============================================================ */}
      <div className="mt-8 sm:mt-10 flex justify-center items-center relative z-20">
        <Button
          asChild
          size="lg"
          className="bg-ssil-red hover:bg-ssil-red-600 font-bold px-8 py-3.5 rounded-full text-white text-sm sm:text-base shadow-lg shadow-ssil-red/25 hover:shadow-ssil-red/40 transition-all duration-300 hover:scale-105"
        >
          <Link href="/contact">
            Enquire Now <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        </Button>
      </div>

      {/* ============================================================ */}
      {/* VIDEO LIGHTBOX / GLASS MODAL PLAYER */}
      {/* ============================================================ */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-slate-950/40 backdrop-blur-md"
          >
            {/* Glassmorphic Modal Content Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "relative bg-slate-950/30 dark:bg-slate-950/35 backdrop-blur-2xl border border-white/15 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center max-h-[88vh]",
                selectedVideo.aspectRatio === "9:16"
                  ? "w-full max-w-sm sm:max-w-md aspect-[9/16]"
                  : "w-full max-w-4xl aspect-[16/9]"
              )}
            >
              {/* Close Button Top-Right */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-30 text-white bg-black/60 hover:bg-ssil-red border border-white/20 p-2 rounded-full transition-colors duration-200 shadow-lg focus:outline-none"
                aria-label="Close video player"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Top Title Overlay (SSIL MEDIA badge removed) */}
              <div className="absolute top-0 inset-x-0 z-20 bg-gradient-to-b from-slate-950/80 via-slate-950/30 to-transparent p-4 sm:p-5 pointer-events-none pr-14">
                <h3 className="text-xs sm:text-sm font-extrabold text-white tracking-tight drop-shadow-md">
                  {selectedVideo.title}
                </h3>
              </div>

              {/* Full Interactive Video Player (WITH AUDIO ENABLED) */}
              <video
                src={selectedVideo.videoUrl}
                autoPlay
                controls
                playsInline
                className="w-full h-full object-contain rounded-2xl sm:rounded-3xl bg-black/40"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
