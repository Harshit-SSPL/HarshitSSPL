"use client";

import React from "react";
import { motion } from "framer-motion";
import { clientCompanies, ClientCompany } from "@/data/clients";

// Single Marquee Item Component: LOGO ABOVE NAME
const MarqueeItem = ({ client }: { client: ClientCompany }) => {
  const [imgError, setImgError] = React.useState(false);

  // Extract initials for fallback brand mark emblem
  const initials = client.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 3)
    .toUpperCase();

  return (
    <div className="flex flex-col items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-white/90 dark:bg-slate-900/70 border border-red-200/60 dark:border-red-900/40 shadow-xs hover:border-ssil-red/60 hover:shadow-sm transition-all group shrink-0 min-w-[105px]">
      {/* Top: Actual Brand Logo or Authentic Initial Emblem (Zero Generic Icons) */}
      <div className="h-7 sm:h-8 flex items-center justify-center w-full overflow-hidden">
        {client.logoUrl && !imgError ? (
          <img
            src={client.logoUrl}
            alt={`${client.name} Logo`}
            className="h-full max-h-7 sm:max-h-8 w-auto object-contain max-w-[95px] transition-transform duration-300 group-hover:scale-105"
            onError={() => setImgError(true)}
            loading="eager"
          />
        ) : (
          <div className="h-6 w-10 rounded bg-red-100/80 dark:bg-red-950/60 border border-red-300/60 dark:border-red-800/60 flex items-center justify-center text-[11px] font-black tracking-tighter text-ssil-red uppercase">
            {initials}
          </div>
        )}
      </div>

      {/* Bottom: Concise Company Name */}
      <span className="text-[11px] sm:text-xs font-bold text-slate-800 dark:text-slate-100 tracking-tight text-center whitespace-nowrap group-hover:text-ssil-red transition-colors">
        {client.name}
      </span>
    </div>
  );
};

export const ClientMarquee = () => {
  // Duplicate array for infinite seamless loop
  const duplicatedClients = [...clientCompanies, ...clientCompanies];

  return (
    <section className="relative py-4 sm:py-5 bg-gradient-to-r from-red-50/90 via-rose-50/80 to-red-50/90 dark:from-red-950/30 dark:via-rose-950/20 dark:to-red-950/30 border-y border-red-200/70 dark:border-red-900/50 overflow-hidden transition-colors shadow-inner">
      {/* Section Header Eyebrow */}
      <div className="container mx-auto px-4 md:px-6 mb-2.5 text-center">
        <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-ssil-red/90 dark:text-red-400">
          TRUSTED BY LEADING CORPORATE &amp; INFRASTRUCTURE DEVELOPERS
        </span>
      </div>

      {/* Edge Gradient Mask Overlays for Smooth Enter/Exit */}
      <div className="absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-red-50/90 dark:from-[#0F172A] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-red-50/90 dark:from-[#0F172A] to-transparent z-10 pointer-events-none" />

      {/* Continuous Automatic Right-to-Left Track */}
      <div className="flex w-full overflow-hidden">
        <motion.div
          className="flex items-center gap-4 sm:gap-5 shrink-0"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 35,
            repeat: Infinity,
          }}
        >
          {duplicatedClients.map((client, index) => (
            <MarqueeItem key={`${client.id}-${index}`} client={client} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
