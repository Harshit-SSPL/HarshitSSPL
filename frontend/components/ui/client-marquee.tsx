"use client";

import React from "react";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { clientCompanies, ClientCompany } from "@/data/clients";

// Single Gliding Item: Logo Image Top + Company Name Bottom
const MarqueeItem = ({ client }: { client: ClientCompany }) => {
  const [imgError, setImgError] = React.useState(false);

  return (
    <div className="flex flex-col items-center justify-center gap-2 shrink-0 px-2 cursor-default group">
      {/* Top: PNG Sticker Logo in White High-Contrast Card */}
      <div className="h-10 sm:h-12 w-28 sm:w-32 bg-white/95 dark:bg-white/95 rounded-xl p-1.5 shadow-sm border border-white/80 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
        {client.logoUrl && !imgError ? (
          <img
            src={client.logoUrl}
            alt={`${client.name} Logo`}
            className="h-full w-full object-contain max-h-9"
            onError={() => setImgError(true)}
            loading="eager"
          />
        ) : (
          <span className="text-[11px] font-black tracking-wider text-slate-900 uppercase text-center truncate">
            {client.name}
          </span>
        )}
      </div>

      {/* Bottom: Company Name */}
      <span className="text-[11px] sm:text-xs font-extrabold text-white tracking-wider text-center uppercase whitespace-nowrap drop-shadow-xs">
        {client.name}
      </span>
    </div>
  );
};

export const ClientMarquee = () => {
  // Duplicate array for infinite seamless loop
  const duplicatedClients = [...clientCompanies, ...clientCompanies];

  return (
    <section className="relative py-5 sm:py-6 bg-ssil-red dark:bg-ssil-red text-white dark:text-white border-y border-red-700/80 dark:border-red-700/80 transition-colors shadow-sm overflow-hidden">
      
      {/* Edge Gradient Mask Overlays in Red for Smooth Enter/Exit */}
      <div className="absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-ssil-red dark:from-ssil-red to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-ssil-red dark:from-ssil-red to-transparent z-10 pointer-events-none" />

      <div className="group relative m-auto max-w-7xl px-4 sm:px-6 z-0">
        <div className="flex flex-col items-center md:flex-row">
          
          {/* Left Title Label */}
          <div className="md:max-w-48 md:border-r border-white/30 dark:border-white/30 md:pr-6 mb-4 md:mb-0 shrink-0">
            <p className="text-center md:text-end text-xs sm:text-sm font-black uppercase tracking-wider text-white">
              POWERING NATIONAL PROJECTS
            </p>
          </div>

          {/* Gliding Marquee Slider (Logo Top + Name Bottom, Constant Speed = 7) */}
          <div className="relative py-1 md:w-[calc(100%-12rem)] w-full overflow-hidden">
            <InfiniteSlider speed={7} gap={48}>
              {duplicatedClients.map((client, index) => (
                <MarqueeItem key={`${client.id}-${index}`} client={client} />
              ))}
            </InfiniteSlider>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ClientMarquee;
