"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

export const whySsilData = [
  {
    category: "Engineering Approach",
    ssil: "Custom-engineered solutions tailored for infrastructure, highway & architectural specs.",
    conventional: "Standardized off-the-shelf catalog supply with minimal engineering adaptability.",
  },
  {
    category: "Structural Manufacturing",
    ssil: "In-house heavy-duty octagonal poles, monumental flag masts & cast-iron heritage brackets.",
    conventional: "Basic street poles dependent on third-party structural fabricators.",
  },
  {
    category: "Smart Civic Integration",
    ssil: "IoT-ready smart poles equipped with CCTV mounts, environmental sensors & automated controls.",
    conventional: "Traditional standalone lighting fixtures without smart city connectivity.",
  },
  {
    category: "Corrosion & Durability",
    ssil: "Industrial hot-dip galvanization and weather-sealed coatings built for 25+ year lifespan.",
    conventional: "Standard painted finishes susceptible to rust and environmental degradation.",
  },
  {
    category: "High-Mast & Heavy Infrastructure",
    ssil: "Complete high-mast towers and stadium floodlighting with motorized winch lowering systems.",
    conventional: "Restricted to low-height poles and standard commercial lighting fixtures.",
  },
  {
    category: "End-to-End Project Support",
    ssil: "Full technical design, structural calculations, manufacturing, supply & deployment guidance.",
    conventional: "Material supply only without comprehensive project integration.",
  },
];

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.21, 0.47, 0.32, 0.98],
      staggerChildren: 0.06,
    },
  },
};

const childVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

export function WhySsilSection() {
  return (
    <motion.section
      className="py-10 md:py-14 bg-black text-white border-b border-zinc-900 transition-colors relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        
        {/* Section Header: Eyebrow + 2-Line Title + Right Badge */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-12 gap-4">
          <motion.div variants={childVariants} className="max-w-4xl">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-slate-300 block mb-2">
              WHY SSIL
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1]">
              The difference,<br />
              <span className="text-ssil-red">built for what&apos;s next.</span>
            </h2>
          </motion.div>

          <motion.div variants={childVariants} className="shrink-0 self-start lg:self-end">
            <span className="text-xs sm:text-sm font-extrabold tracking-widest uppercase text-slate-300 border border-zinc-800 px-3.5 py-1.5 rounded-full bg-zinc-900/90 shadow-sm">
              SSIL VS. CONVENTIONAL LIGHTING
            </span>
          </motion.div>
        </div>

        {/* Comparison Table Container */}
        <motion.div
          variants={childVariants}
          className="w-full max-w-7xl mx-auto rounded-2xl sm:rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl backdrop-blur-md overflow-hidden"
        >
          {/* Table Header Row (Desktop & Tablet) */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3.5 bg-zinc-900 border-b border-zinc-800 text-xs font-black uppercase tracking-wider">
            <div className="col-span-4 text-slate-400">
              Feature
            </div>
            <div className="col-span-4 text-white flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-ssil-red inline-block" />
              <span className="text-ssil-red font-black">SSIL Infrastructure</span>
            </div>
            <div className="col-span-4 text-slate-400">
              Conventional Supplier
            </div>
          </div>

          {/* Rows Container */}
          <div className="divide-y divide-zinc-800/90">
            {whySsilData.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="p-3.5 sm:p-5 transition-colors duration-300 hover:bg-zinc-900/70"
              >
                {/* Desktop Grid Layout */}
                <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-4 font-black text-xs sm:text-sm text-white tracking-tight">
                    {item.category}
                  </div>
                  <div className="col-span-4 flex items-start gap-2.5 text-xs sm:text-sm text-slate-100 font-medium leading-relaxed bg-ssil-red/15 p-2.5 sm:p-3 rounded-xl border border-ssil-red/30">
                    <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-ssil-red shrink-0 mt-0.5" />
                    <span>{item.ssil}</span>
                  </div>
                  <div className="col-span-4 flex items-start gap-2.5 text-xs sm:text-sm text-slate-400 font-normal leading-relaxed p-2.5 sm:p-3">
                    <X className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-500 shrink-0 mt-0.5" />
                    <span>{item.conventional}</span>
                  </div>
                </div>

                {/* Mobile Stacked Card Layout */}
                <div className="flex md:hidden flex-col gap-2.5">
                  <span className="font-black text-xs sm:text-sm text-white tracking-tight">
                    {item.category}
                  </span>
                  
                  <div className="flex items-start gap-2 text-xs text-slate-100 font-medium leading-relaxed bg-ssil-red/15 p-2.5 rounded-xl border border-ssil-red/30">
                    <Check className="h-3.5 w-3.5 text-ssil-red shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-black uppercase text-ssil-red block mb-0.5">SSIL:</span>
                      {item.ssil}
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-xs text-slate-400 font-normal leading-relaxed p-2.5 bg-zinc-900/60 rounded-xl border border-zinc-800">
                    <X className="h-3.5 w-3.5 text-slate-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-0.5">Conventional:</span>
                      {item.conventional}
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
}
