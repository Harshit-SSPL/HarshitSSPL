"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  ClipboardCheck,
  Compass,
  ShieldCheck,
  Truck,
  CheckCircle2,
} from "lucide-react";

interface ProcessStep {
  stepNum: string;
  num: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ssilProcessSteps: ProcessStep[] = [
  {
    stepNum: "01",
    num: 1,
    title: "Project Requirements & Specs",
    description: "Comprehensive evaluation of site conditions, lighting levels, architectural drawings, and tender technical specifications.",
    icon: <ClipboardCheck className="h-5 w-5 sm:h-6 sm:w-6" />,
  },
  {
    stepNum: "02",
    num: 2,
    title: "Solution Engineering & Design",
    description: "Custom structural calculations, photometrics, pole design, bracket geometry, and luminaire selection tailored to project goals.",
    icon: <Compass className="h-5 w-5 sm:h-6 sm:w-6" />,
  },
  {
    stepNum: "03",
    num: 3,
    title: "Precision Manufacturing & Quality",
    description: "In-house production of octagonal poles, high mast towers, heritage brackets, and LED luminaires with strict ISO quality controls.",
    icon: <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6" />,
  },
  {
    stepNum: "04",
    num: 4,
    title: "Logistics & Transportation",
    description: "Coordinated fleet freight, protective heavy-duty packaging, and synchronized logistics for safe on-time site arrival.",
    icon: <Truck className="h-5 w-5 sm:h-6 sm:w-6" />,
  },
  {
    stepNum: "05",
    num: 5,
    title: "On-Site Deployment & Support",
    description: "Technical supply chain support, erection guidance, and final commissioning verification for civic and industrial infrastructure.",
    icon: <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6" />,
  },
];

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
  hidden: { y: 25, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

export function FeatureCardDemo() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Active progress percentage along the line (0% for step 01 to 100% for step 05)
  const lineFillPercentage = (activeIndex / (ssilProcessSteps.length - 1)) * 100;

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors border-t border-slate-200/80 dark:border-slate-900 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        
        {/* ============================================================ */}
        {/* 1. LEFT-ALIGNED EDITORIAL UPPER CONTENT */}
        {/* ============================================================ */}
        <div className="max-w-4xl mb-12 sm:mb-16 text-left">
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400 block mb-2">
            SSIL PROJECT ENGAGEMENT PROCESS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
            From Design Specification <br />
            <span className="text-ssil-red">to Infrastructure Execution</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl mt-4">
            SSIL works directly with government bodies, municipal contractors, and commercial developers to deliver compliant lighting infrastructure.
          </p>
        </div>

        {/* ============================================================ */}
        {/* 2. CONNECTING PROGRESS LINE & NUMBER TRACK (DESKTOP) */}
        {/* ============================================================ */}
        <div className="hidden md:block relative mb-10 px-8">
          
          {/* Neutral Background Line */}
          <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 absolute top-1/2 -translate-y-1/2 left-0 right-0 z-0 rounded-full" />

          {/* Active Red Progress Line (Terminates at activeIndex) */}
          <div
            className="h-1 bg-ssil-red absolute top-1/2 -translate-y-1/2 left-0 z-0 rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(225,29,72,0.5)]"
            style={{ width: `${lineFillPercentage}%` }}
          />

          {/* 5 Numbered Stage Circles */}
          <div className="relative z-10 flex justify-between items-center w-full">
            {ssilProcessSteps.map((step, idx) => {
              const isActive = idx <= activeIndex;
              const isCurrent = idx === activeIndex;

              return (
                <button
                  key={step.stepNum}
                  onClick={() => setActiveIndex(idx)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={cn(
                    "w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-black text-sm transition-all duration-300 ease-out focus:outline-none select-none",
                    isActive
                      ? "bg-ssil-red text-white scale-110 shadow-[0_0_18px_rgba(225,29,72,0.6)]"
                      : "bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 text-slate-400 hover:border-ssil-red hover:text-ssil-red"
                  )}
                >
                  {step.num}
                </button>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. FIVE PROCESS CARDS GRID */}
        {/* ============================================================ */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 lg:gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={containerVariants}
        >
          {ssilProcessSteps.map((step, idx) => {
            const isActive = idx === activeIndex;

            return (
              <motion.div key={step.stepNum} variants={itemVariants}>
                <div
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    "group relative bg-white dark:bg-slate-900 p-5 rounded-2xl transition-all duration-300 ease-out cursor-pointer flex flex-col justify-between h-full min-h-[220px] select-none",
                    isActive
                      ? "border-2 border-ssil-red shadow-xl -translate-y-2 bg-white dark:bg-slate-900/90"
                      : "border border-slate-200 dark:border-slate-800 shadow-sm hover:-translate-y-1 hover:border-slate-300 dark:hover:border-slate-700"
                  )}
                >
                  {/* Top Active Accent Line */}
                  <div
                    className={cn(
                      "absolute top-0 left-6 right-6 h-0.5 rounded-full transition-opacity duration-300",
                      isActive ? "bg-ssil-red opacity-100" : "bg-transparent opacity-0"
                    )}
                  />

                  {/* Top Section: Step Tag & Icon */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={cn(
                          "text-xs font-black tracking-widest uppercase transition-colors duration-300",
                          isActive ? "text-ssil-red" : "text-slate-400 dark:text-slate-500"
                        )}
                      >
                        STEP {step.stepNum}
                      </span>

                      <div
                        className={cn(
                          "p-2.5 rounded-xl transition-all duration-300",
                          isActive
                            ? "bg-ssil-red text-white shadow-md scale-105"
                            : "bg-slate-100 dark:bg-slate-800 text-ssil-red group-hover:scale-105"
                        )}
                      >
                        {step.icon}
                      </div>
                    </div>

                    {/* Step Title */}
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight mb-2 group-hover:text-ssil-red transition-colors duration-300">
                      {step.title}
                    </h3>
                  </div>

                  {/* Step Description */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal mt-2">
                    {step.description}
                  </p>

                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
