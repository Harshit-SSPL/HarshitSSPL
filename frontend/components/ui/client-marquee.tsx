"use client";

import React from "react";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { clientCompanies, ClientCompany } from "@/data/clients";

// Single Gliding Item: Floating 3D Sticker PNG Logo Top (NO White Box/Border) + Company Name Bottom
const MarqueeItem = ({ client }: { client: ClientCompany }) => {
  const [imgError, setImgError] = React.useState(false);

  return (
    <div className="flex flex-col items-center justify-center gap-2.5 shrink-0 px-4 cursor-default group">
      {/* Top: Floating 3D PNG Sticker Logo */}
      <div className="h-12 sm:h-14 w-auto flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
        {client.logoUrl && !imgError ? (
          <img
            src={client.logoUrl}
            alt={`${client.name} Logo`}
            className="h-full w-auto max-w-[130px] object-contain filter drop-shadow-md brightness-105"
            onError={() => setImgError(true)}
            loading="eager"
          />
        ) : (
          <span className="text-xs font-black tracking-wider text-white uppercase text-center">
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

          {/* Gliding Marquee Slider (Floating Logo Top + Name Bottom, Constant Speed = 7) */}
          <div className="relative py-1 md:w-[calc(100%-12rem)] w-full overflow-hidden">
            <InfiniteSlider speed={7} gap={56}>
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
