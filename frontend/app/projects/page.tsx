"use client";

import React from "react";
import { Building2, Sparkles } from "lucide-react";

export default function ProjectsPage() {
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 pt-32 sm:pt-36 md:pt-40 pb-16 md:pb-24">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl text-center">
        <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-ssil-red block mb-2">
          PROJECT PORTFOLIO
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
          Executed SSIL Infrastructure Projects
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-12">
          Shiv Shakti India Limited has delivered high-impact lighting infrastructure across highways, municipal smart cities, industrial plants, and monumental flag masts.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-left">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-md">
            <Building2 className="h-7 w-7 text-ssil-red mb-3" />
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1.5">
              Highway &amp; Expressways
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Octagonal and High Mast lighting poles engineered for national highway developments.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-md">
            <Sparkles className="h-7 w-7 text-ssil-red mb-3" />
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1.5">
              Urban Smart Lighting
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Ornamental heritage poles and energy-efficient LED luminaires for municipal smart cities.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-md">
            <Building2 className="h-7 w-7 text-ssil-red mb-3" />
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1.5">
              Monumental Flag Masts
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              High-tensile Indian flag poles installed across civic landmarks and government complexes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
