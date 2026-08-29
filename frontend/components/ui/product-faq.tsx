"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FaqItem {
  num: string;
  question: string;
  answer: string;
  highlightTag?: string;
}

const faqData: FaqItem[] = [
  {
    num: "01",
    question: "What types of lighting and infrastructure products does SSIL provide?",
    answer:
      "SSIL manufactures and supplies an end-to-end catalogue of 18 official product categories, ranging from LED Street Lights, Flood Lights, and LED Indoor Lights to heavy-duty Octagonal Poles, Decorative & Designer Poles, Stadium High Mast towers, Flag Mast Poles, Bollards, and Solar Power Systems.",
    highlightTag: "18 Official Categories",
  },
  {
    num: "02",
    question: "Do SSIL products support both indoor and outdoor applications?",
    answer:
      "Yes. SSIL engineers specialized luminaires for both environments. Outdoor systems feature IP66 weatherproofing, IK10 vandal resistance, and in-house hot-dip galvanized steel, while indoor solutions deliver high-lumen, flicker-free, and glare-controlled illumination for commercial and industrial facilities.",
    highlightTag: "IP66 & IK10 Rated",
  },
  {
    num: "03",
    question: "Can SSIL customize poles and lighting systems according to project requirements?",
    answer:
      "Absolutely. SSIL provides tailored engineering services including custom bracket geometries, specialized pole heights, multi-fixture arm configurations, tailored photometrics, and aesthetic powder-coated finishes manufactured to exact tender drawings and architectural specifications.",
    highlightTag: "Bespoke Engineering",
  },
  {
    num: "04",
    question: "What types of poles are available for highways, streets and infrastructure projects?",
    answer:
      "SSIL produces a comprehensive range of poles including heavy-duty Octagonal Poles for expressways, smart Camera Poles for CCTV/ANPR traffic surveillance, Decorative & Designer Poles for civic plazas, Heritage Brackets, and Post Top Illuminaries for pedestrian corridors.",
    highlightTag: "Heavy-Duty Poles",
  },
  {
    num: "05",
    question: "Does SSIL provide monumental Flag Mast Poles?",
    answer:
      "Yes. SSIL is an industry leader in monumental high-tensile Flag Mast Poles up to 100+ feet, engineered to withstand extreme wind loads (180+ km/h), equipped with internal motorized winch hoisting systems and 360-degree LED floodlighting crowns.",
    highlightTag: "Public Landmarks",
  },
  {
    num: "06",
    question: "Can SSIL support large-scale municipal, commercial and infrastructure projects?",
    answer:
      "Yes. SSIL regularly executes large-scale public and private infrastructure contracts across India, working alongside government authorities, smart city municipal corporations, national expressways, and premier realty developers with complete manufacturing and logistics support.",
    highlightTag: "Pan-India Execution",
  },
  {
    num: "07",
    question: "Can lighting products be specified according to required wattage, optics and project conditions?",
    answer:
      "Yes. All SSIL LED fixtures can be customized by wattage rating, luminous efficacy, asymmetric or symmetric optical beam angles, color temperatures (3000K to 6500K), and smart Central Management System (CMS) / IoT automated dimming controls.",
    highlightTag: "Custom Optics & CMS",
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.21, 0.47, 0.32, 0.98],
      staggerChildren: 0.08,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export const ProductFaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <motion.section
      className="py-16 sm:py-20 md:py-24 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border-t border-slate-200 dark:border-zinc-900 transition-colors duration-300 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.15 }}
      variants={sectionVariants}
    >
      {/* Subtle Ambient Red Glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-ssil-red/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl relative z-10">
        
        {/* Editorial Section Header matching About Us visual hierarchy */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 sm:mb-14 gap-6 pb-6 border-b border-slate-200/90 dark:border-zinc-800/90">
          <motion.div variants={childVariants} className="max-w-3xl">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-slate-900 dark:text-slate-200 block mb-2">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-[1.08]">
              PRODUCT QUESTIONS.<br />
              <span className="text-ssil-red">ANSWERED.</span>
            </h2>
            <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl">
              Explore common technical questions regarding SSIL&apos;s commercial lighting systems, high-tensile poles, structural specifications, and project customization capabilities.
            </p>
          </motion.div>

          <motion.div variants={childVariants} className="shrink-0 self-start lg:self-end">
            <span className="text-xs sm:text-sm font-extrabold tracking-widest uppercase text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-zinc-800 px-4 py-2 rounded-full bg-white dark:bg-zinc-900 shadow-sm flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-ssil-red shrink-0" />
              SSIL TECHNICAL &amp; TENDER SUPPORT
            </span>
          </motion.div>
        </div>

        {/* Structured Accordion Rows Container (01 to 07) */}
        <motion.div variants={childVariants} className="w-full max-w-5xl mx-auto space-y-3 sm:space-y-3.5">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={item.num}
                className={`group rounded-xl sm:rounded-2xl transition-all duration-300 border overflow-hidden ${
                  isOpen
                    ? "bg-white dark:bg-zinc-900/90 border-ssil-red/60 shadow-lg shadow-ssil-red/5"
                    : "bg-white/80 dark:bg-zinc-900/40 border-slate-200/90 dark:border-zinc-800/80 hover:border-slate-300 dark:hover:border-zinc-700 hover:bg-white dark:hover:bg-zinc-900/70 shadow-xs"
                }`}
              >
                {/* Accordion Header Row */}
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full py-4 sm:py-5 px-5 sm:px-7 flex items-center justify-between gap-4 text-left transition-colors cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5 sm:gap-5 min-w-0 flex-1">
                    {/* Index Number */}
                    <span
                      className={`text-sm sm:text-base font-extrabold transition-colors duration-300 shrink-0 ${
                        isOpen ? "text-ssil-red" : "text-slate-400 dark:text-slate-500 group-hover:text-ssil-red"
                      }`}
                    >
                      {item.num}
                    </span>

                    {/* Question Title */}
                    <h3
                      className={`text-sm sm:text-base md:text-lg font-bold tracking-tight transition-colors duration-300 leading-snug ${
                        isOpen
                          ? "text-slate-900 dark:text-white font-extrabold"
                          : "text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white"
                      }`}
                    >
                      {item.question}
                    </h3>
                  </div>

                  {/* Expand / Collapse Indicator Button */}
                  <div
                    className={`h-8 w-8 sm:h-9 sm:w-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "bg-ssil-red text-white rotate-180 shadow-sm"
                        : "bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-300 group-hover:bg-ssil-red/10 group-hover:text-ssil-red"
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="h-4 w-4 stroke-[2.5]" />
                    ) : (
                      <Plus className="h-4 w-4 stroke-[2.5]" />
                    )}
                  </div>
                </button>

                {/* Collapsible Answer Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-7 pb-5 sm:pb-6 pt-1 border-t border-slate-100 dark:border-zinc-800/60">
                        <div className="flex items-start gap-3 mt-2">
                          <div className="w-1 bg-ssil-red self-stretch rounded-full shrink-0" />
                          <p className="text-xs sm:text-sm md:text-[15px] text-slate-700 dark:text-slate-300 font-normal leading-relaxed">
                            {item.answer}
                          </p>
                        </div>

                        {item.highlightTag && (
                          <div className="mt-3.5 pl-4">
                            <span className="inline-block text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-ssil-red bg-ssil-red/10 border border-ssil-red/20 px-2.5 py-1 rounded-md">
                              {item.highlightTag}
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Card: Be Part of Our Journey -> Redirect to /contact */}
        <motion.div
          variants={childVariants}
          className="w-full max-w-5xl mx-auto mt-8 sm:mt-10 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-ssil-red/50 transition-all duration-300"
        >
          {/* Red Accent Left Bar */}
          <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-ssil-red" />
          
          {/* Background Accent Glow */}
          <div className="absolute top-1/2 right-10 -translate-y-1/2 w-64 h-64 bg-ssil-red/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-2">
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-ssil-red block">
              COLLABORATE WITH SSIL
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-tight">
              Be Part of Our Journey.
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
              Have a custom infrastructure requirement or project tender? Connect with our engineering and lighting design team to discuss technical specifications and execution.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Button
              asChild
              size="lg"
              className="bg-ssil-red hover:bg-ssil-red-600 font-bold px-8 py-3.5 rounded-full text-white text-xs sm:text-sm shadow-lg shadow-ssil-red/25 hover:shadow-ssil-red/40 transition-all duration-300 hover:scale-105"
            >
              <Link href="/contact" className="flex items-center gap-2">
                <span>Contact Us</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
};
