"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Award } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

const Stats2 = () => {
  return (
    <section className="py-14 bg-slate-50/70 dark:bg-slate-950/80 border-b border-slate-200/60 dark:border-slate-800/80 transition-colors">
      <div className="container mx-auto px-4 md:px-6">
        
        <motion.div
          className="max-w-4xl mx-auto grid gap-5 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
        >
          {/* Card 1: SSIL Blue Ambient Glow */}
          <motion.div
            variants={itemVariants}
            className="group bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex h-44 flex-col justify-between rounded-xl p-5 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.015] hover:border-ssil-blue/60 hover:shadow-[0_14px_32px_-8px_rgba(49,130,206,0.25)]"
          >
            <div className="flex items-center justify-between">
              <span className="text-ssil-blue dark:text-sky-400 font-extrabold text-[11px] tracking-wider uppercase">
                Client Trust &amp; Reach
              </span>
              <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-ssil-blue dark:text-sky-400 transition-transform group-hover:scale-110">
                <Award className="h-4 w-4" />
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                50+
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-xs font-semibold mt-1.5 leading-snug">
                Enterprise, Commercial &amp; Government Tender Clients
              </p>
            </div>
          </motion.div>

          {/* Card 2: SSIL Red Ambient Glow */}
          <motion.div
            variants={itemVariants}
            className="group bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex h-44 flex-col justify-between rounded-xl p-5 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.015] hover:border-ssil-red/60 hover:shadow-[0_14px_32px_-8px_rgba(229,62,62,0.25)]"
          >
            <div className="flex items-center justify-between">
              <span className="text-ssil-red font-extrabold text-[11px] tracking-wider uppercase">
                Engineering Precision
              </span>
              <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-ssil-red transition-transform group-hover:scale-110">
                <ShieldCheck className="h-4 w-4" />
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                99.9%
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-xs font-semibold mt-1.5 leading-snug">
                IP66 Quality &amp; Structural Rigor Compliance
              </p>
            </div>
          </motion.div>

          {/* Card 3: SSIL Blue Ambient Glow */}
          <motion.div
            variants={itemVariants}
            className="group bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex h-44 flex-col justify-between rounded-xl p-5 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.015] hover:border-ssil-blue/60 hover:shadow-[0_14px_32px_-8px_rgba(49,130,206,0.25)]"
          >
            <div className="flex items-center justify-between">
              <span className="text-ssil-blue dark:text-sky-400 font-extrabold text-[11px] tracking-wider uppercase">
                Infrastructure Footprint
              </span>
              <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-ssil-blue dark:text-sky-400 transition-transform group-hover:scale-110">
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                5,000+
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-xs font-semibold mt-1.5 leading-snug">
                Outdoor Lighting Fixtures &amp; Poles Deployed Across India
              </p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export { Stats2 };
