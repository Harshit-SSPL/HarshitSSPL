"use client";

import React from "react";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { clientCompanies } from "@/data/clients";

export const ClientMarquee = () => {
  return (
    <section className="relative py-4 sm:py-5 bg-ssil-red dark:bg-black text-white dark:text-white border-y border-red-700/80 dark:border-zinc-800/80 transition-colors shadow-sm overflow-hidden">
      <div className="group relative m-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center md:flex-row">
          
          {/* Left Title Label */}
          <div className="md:max-w-48 md:border-r border-white/30 dark:border-zinc-800 md:pr-6 mb-3 md:mb-0">
            <p className="text-center md:text-end text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white dark:text-zinc-400">
              POWERING NATIONAL PROJECTS
            </p>
          </div>

          {/* Gliding Marquee Slider (Comfortable Speed = 18, Gentle Hover = 24 for 100% Legibility) */}
          <div className="relative py-2 md:w-[calc(100%-12rem)] w-full overflow-hidden">
            <InfiniteSlider speedOnHover={24} speed={18} gap={64}>
              {clientCompanies.map((client, index) => (
                <div
                  key={`${client.id}-${index}`}
                  className="flex items-center text-sm font-extrabold text-white dark:text-zinc-200 shrink-0 hover:scale-105 transition-transform cursor-default"
                >
                  {client.name}
                </div>
              ))}
            </InfiniteSlider>

            {/* Edge Fade Progressive Blur */}
            <ProgressiveBlur
              className="pointer-events-none absolute left-0 top-0 h-full w-16"
              direction="left"
              blurIntensity={1}
            />
            <ProgressiveBlur
              className="pointer-events-none absolute right-0 top-0 h-full w-16"
              direction="right"
              blurIntensity={1}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default ClientMarquee;
