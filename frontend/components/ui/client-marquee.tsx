"use client";

import React from "react";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { clientCompanies } from "@/data/clients";

export const ClientMarquee = () => {
  // Duplicate array for infinite seamless loop
  const duplicatedClients = [...clientCompanies, ...clientCompanies];

  return (
    <section className="relative py-4 sm:py-5 bg-ssil-red dark:bg-ssil-red text-white dark:text-white border-y border-red-700/80 dark:border-red-700/80 transition-colors shadow-sm overflow-hidden">
      
      {/* Edge Gradient Mask Overlays in Red for Smooth Enter/Exit */}
      <div className="absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-ssil-red dark:from-ssil-red to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-ssil-red dark:from-ssil-red to-transparent z-10 pointer-events-none" />

      <div className="group relative m-auto max-w-7xl px-4 sm:px-6 z-0">
        <div className="flex flex-col items-center md:flex-row">
          
          {/* Left Title Label */}
          <div className="md:max-w-48 md:border-r border-white/30 dark:border-white/30 md:pr-6 mb-3 md:mb-0 shrink-0">
            <p className="text-center md:text-end text-xs sm:text-sm font-black uppercase tracking-wider text-white">
              POWERING NATIONAL PROJECTS
            </p>
          </div>

          {/* Gliding Marquee Slider (Half Speed = speed 7, speedOnHover 7 so it stays slow & readable) */}
          <div className="relative py-2 md:w-[calc(100%-12rem)] w-full overflow-hidden">
            <InfiniteSlider speedOnHover={7} speed={7} gap={64}>
              {duplicatedClients.map((client, index) => (
                <div
                  key={`${client.id}-${index}`}
                  className="flex items-center text-sm font-extrabold text-white shrink-0 cursor-default"
                >
                  {client.name}
                </div>
              ))}
            </InfiniteSlider>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ClientMarquee;
