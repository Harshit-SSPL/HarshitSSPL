"use client";

import React, { useState, useEffect } from "react";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { clientCompanies, ClientCompany } from "@/data/clients";

import { fetchApi } from "@/lib/admin-api";

// Single Gliding Item: Floating 3D PNG Sticker Logo Top + Company Name Bottom
const MarqueeItem = ({ client }: { client: { name: string; logoUrl: string; id?: string; _id?: string } }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center gap-2.5 shrink-0 px-4 cursor-default group">
      {/* Top: Floating 3D PNG Sticker Logo */}
      <div className="h-12 sm:h-14 w-auto flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
        {client.logoUrl && !imgError ? (
          <img
            src={client.logoUrl}
            alt={`${client.name} Logo`}
            width={130}
            height={56}
            className="h-full w-auto max-w-[130px] object-contain filter drop-shadow-md brightness-105 dark:invert-0"
            onError={() => setImgError(true)}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span className="text-xs font-black tracking-wider text-slate-800 dark:text-white uppercase text-center">
            {client.name}
          </span>
        )}
      </div>

      {/* Bottom: Company Name */}
      <span className="text-[11px] sm:text-xs font-extrabold text-slate-800 dark:text-zinc-200 tracking-wider text-center uppercase whitespace-nowrap">
        {client.name}
      </span>
    </div>
  );
};

export const ClientMarquee = () => {
  const [clients, setClients] = useState<any[]>(clientCompanies);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await fetchApi("/national-projects");
        if (data.success && Array.isArray(data.projects) && data.projects.length > 0) {
          setClients(data.projects);
        }
      } catch (err) {
        // use fallback clientCompanies
      }
    };
    fetchProjects();
  }, []);

  // Duplicate array for infinite seamless loop
  const duplicatedClients = [...clients, ...clients];

  return (
    <section className="relative py-5 sm:py-6 bg-white dark:bg-slate-950 text-slate-900 dark:text-white border-y border-slate-200/80 dark:border-slate-800/80 transition-colors shadow-xs overflow-hidden">
      
      {/* Edge Gradient Mask Overlays in White/Deep-Navy for Smooth Enter/Exit */}
      <div className="absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />

      <div className="group relative m-auto max-w-7xl px-4 sm:px-6 z-0">
        <div className="flex flex-col items-center md:flex-row">
          
          {/* Left Title Label */}
          <div className="md:max-w-48 md:border-r border-slate-200 dark:border-slate-800 md:pr-6 mb-4 md:mb-0 shrink-0">
            <p className="text-center md:text-end text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
              POWERING NATIONAL PROJECTS
            </p>
          </div>

          {/* Gliding Marquee Slider (Floating Logo Top + Name Bottom, Constant Speed = 5) */}
          <div className="relative py-1 md:w-[calc(100%-12rem)] w-full overflow-hidden">
            <InfiniteSlider speed={5} gap={56}>
              {duplicatedClients.map((client, index) => (
                <MarqueeItem key={`${client._id || client.id || index}-${index}`} client={client} />
              ))}
            </InfiniteSlider>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ClientMarquee;
