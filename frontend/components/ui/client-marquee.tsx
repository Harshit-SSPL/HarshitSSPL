"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import { clientCompanies, ClientCompany } from "@/data/clients";

// Single Marquee Item Component
const MarqueeItem = ({ client }: { client: ClientCompany }) => {
  const [imgError, setImgError] = React.useState(false);

  return (
    <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50 shadow-sm shrink-0 hover:border-ssil-red/40 transition-colors">
      {client.logoUrl && !imgError ? (
        // Remote Image Source (Rendered dynamically without local disk storage)
        <img
          src={client.logoUrl}
          alt={`${client.name} Logo`}
          className="h-6 sm:h-7 w-auto object-contain max-w-[100px] shrink-0"
          onError={() => setImgError(true)}
          loading="eager"
        />
      ) : (
        // Corporate Badge Icon Fallback
        <div className="h-6 w-6 rounded-md bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-ssil-red shrink-0">
          <Building2 className="h-3.5 w-3.5" />
        </div>
      )}

      {/* Company Name */}
      <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 whitespace-nowrap tracking-tight">
        {client.name}
      </span>
    </div>
  );
};

export const ClientMarquee = () => {
  // Duplicate array once for seamless infinite loop
  const duplicatedClients = [...clientCompanies, ...clientCompanies];

  return (
    <section className="relative py-5 sm:py-6 bg-slate-50/80 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/60 overflow-hidden transition-colors">
      {/* Container Layout with Eyebrow Header */}
      <div className="container mx-auto px-4 md:px-6 mb-3 text-center">
        <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
          TRUSTED INFRASTRUCTURE CLIENTS &amp; ORGANIZATIONS
        </span>
      </div>

      {/* Edge Gradient Mask Overlays for Smooth Entering/Exiting */}
      <div className="absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />

      {/* Continuous Automatic Right-to-Left Track */}
      <div className="flex w-full overflow-hidden">
        <motion.div
          className="flex items-center gap-4 sm:gap-6 shrink-0"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 38,
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
