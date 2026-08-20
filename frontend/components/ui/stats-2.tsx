"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Award, Globe, Building2 } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

const metricsData = [
  {
    number: "5,000+",
    label: "Poles & Lighting Installations",
    sublabel: "DEPLOYED FOOTPRINT",
    icon: <Zap className="h-4 w-4" />,
    color: "blue",
    accentClass: "text-ssil-blue dark:text-sky-400",
    glowClass: "hover:border-ssil-blue/60 hover:shadow-[0_14px_32px_-8px_rgba(49,130,206,0.25)]",
  },
  {
    number: "10+",
    label: "Years of Experience",
    sublabel: "ENGINEERING HERITAGE",
    icon: <Award className="h-4 w-4" />,
    color: "red",
    accentClass: "text-ssil-red",
    glowClass: "hover:border-ssil-red/60 hover:shadow-[0_14px_32px_-8px_rgba(229,62,62,0.25)]",
  },
  {
    number: "18+",
    label: "States Served",
    sublabel: "PAN-INDIA REACH",
    icon: <Globe className="h-4 w-4" />,
    color: "blue",
    accentClass: "text-ssil-blue dark:text-sky-400",
    glowClass: "hover:border-ssil-blue/60 hover:shadow-[0_14px_32px_-8px_rgba(49,130,206,0.25)]",
  },
  {
    number: "200+",
    label: "Projects Completed",
    sublabel: "EXECUTED DELIVERIES",
    icon: <Building2 className="h-4 w-4" />,
    color: "red",
    accentClass: "text-ssil-red",
    glowClass: "hover:border-ssil-red/60 hover:shadow-[0_14px_32px_-8px_rgba(229,62,62,0.25)]",
  },
];

const Stats2 = () => {
  return (
    <section className="py-16 md:py-20 bg-slate-50/70 dark:bg-slate-950/80 border-b border-slate-200/60 dark:border-slate-800/80 transition-colors">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="text-xs font-extrabold uppercase tracking-widest text-ssil-red block mb-2">
            LIGHTING SOLUTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Engineered Lighting for Modern Infrastructure
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto mt-3 leading-relaxed font-normal">
            From architectural spaces to highways and large-scale infrastructure, SSIL delivers lighting solutions engineered around performance.
          </p>
        </motion.div>

        {/* 4 Metric Cards Grid */}
        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={containerVariants}
        >
          {metricsData.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`group bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex h-44 flex-col justify-between rounded-xl p-5 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.015] ${item.glowClass}`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-extrabold text-[10px] tracking-wider uppercase ${item.accentClass}`}>
                  {item.sublabel}
                </span>
                <div className={`p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 transition-transform group-hover:scale-110 ${item.accentClass}`}>
                  {item.icon}
                </div>
              </div>

              <div className="mt-2">
                <h3 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                  {item.number}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-wider mt-2.5 leading-snug">
                  {item.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export { Stats2 };
