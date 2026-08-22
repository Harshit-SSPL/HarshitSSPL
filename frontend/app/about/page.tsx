"use client";

import React from "react";
import {
  Lightbulb,
  Building,
  CheckCircle2,
  Layers,
  Zap,
  Flag,
  Sparkles,
} from "lucide-react";

export default function AboutPage() {
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="flex flex-col gap-0 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* ============================================================ */}
      {/* 1. STAGE 1: SIMPLIFIED & RESTRUCTURED ABOUT US TOP SECTION */}
      {/* ============================================================ */}
      <section className="relative w-full bg-slate-950 text-white pt-28 sm:pt-32 pb-14 sm:pb-16 border-b border-slate-800/80 transition-colors overflow-hidden">
        {/* Subtle Ambient Red Light Effect */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-ssil-red/20 rounded-full blur-[130px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-left relative z-10">
          
          {/* Main Large Title: About Us */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-2">
            About Us
          </h1>

          {/* Eyebrow Label: WHO WE ARE (Slightly Offset to the Right) */}
          <div className="ml-1 sm:ml-3 mb-6">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-ssil-red">
              WHO WE ARE
            </span>
          </div>

          {/* Subheading */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-snug mb-4">
            Global Supply &amp; Specialized Engineering
          </h2>

          {/* Consolidated 3 About SSIL Paragraphs */}
          <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal mb-6">
            <p>
              Shiv Shakti India Limited (SSIL) is one of the most equipped and major manufacturers of lighting solution providers in the global market. We are an experienced organization in the field of complete lighting solutions, enclosing all your requirements in a single basket.
            </p>
            <p>
              We are engaged in the export and supply of a wide range of commercial and household products, enclosing outdoor, indoor, solar, decorative LED lights, and solar plants.
            </p>
            <p>
              Engineered for long-lasting durability, SSIL&apos;s infrastructure luminaires, decorative poles, octagonal poles, and high mast installations serve municipal expressways, real estate developments, and public landmarks across India.
            </p>
          </div>

          {/* Existing Feature Tags */}
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
            <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 shadow-sm">
              <CheckCircle2 className="h-4 w-4 text-ssil-red shrink-0" />
              <span className="text-xs font-bold text-slate-200">Global Export &amp; Supply</span>
            </div>
            <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 shadow-sm">
              <CheckCircle2 className="h-4 w-4 text-ssil-red shrink-0" />
              <span className="text-xs font-bold text-slate-200">End-to-End Solutions</span>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. STAGE 2: OUR EXPERTISE / PRODUCT RANGE (UNCHANGED) */}
      {/* ============================================================ */}
      <section className="pt-12 md:pt-16 pb-16 md:pb-24 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200/60 dark:border-slate-800/80 transition-colors">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-ssil-red block mb-2">
              OUR EXPERTISE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Comprehensive Product &amp; Fixture Range
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
              Manufactured with high-precision engineering to serve urban infrastructure, highway developments, and commercial projects.
            </p>
          </div>

          {/* 6 Product Cards with Red Hover Glow */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            
            {/* Card 1: Outdoor & Indoor LED Luminaires */}
            <div className="group relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-ssil-red/80 hover:shadow-[0_16px_45px_-5px_rgba(225,29,72,0.45)] dark:hover:shadow-[0_16px_50px_-5px_rgba(225,29,72,0.55)] overflow-hidden">
              <Lightbulb className="h-7 w-7 text-ssil-red mb-4 transition-transform group-hover:scale-110 duration-300" />
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2 group-hover:text-ssil-red transition-colors">
                Outdoor &amp; Indoor LED Luminaires
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Energy-efficient LED luminaires and lighting fixtures engineered for high performance, commercial facilities, and residential developments.
              </p>
            </div>

            {/* Card 2: Solar Lights & Power Plants */}
            <div className="group relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-ssil-red/80 hover:shadow-[0_16px_45px_-5px_rgba(225,29,72,0.45)] dark:hover:shadow-[0_16px_50px_-5px_rgba(225,29,72,0.55)] overflow-hidden">
              <Zap className="h-7 w-7 text-ssil-red mb-4 transition-transform group-hover:scale-110 duration-300" />
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2 group-hover:text-ssil-red transition-colors">
                Solar Lights &amp; Power Plants
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Integrated solar lighting systems, standalone solar LED poles, and commercial solar power plant installations for sustainable infrastructure.
              </p>
            </div>

            {/* Card 3: Ornamental & Designer Poles */}
            <div className="group relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-ssil-red/80 hover:shadow-[0_16px_45px_-5px_rgba(225,29,72,0.45)] dark:hover:shadow-[0_16px_50px_-5px_rgba(225,29,72,0.55)] overflow-hidden">
              <Building className="h-7 w-7 text-ssil-red mb-4 transition-transform group-hover:scale-110 duration-300" />
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2 group-hover:text-ssil-red transition-colors">
                Ornamental &amp; Designer Poles
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Ornamental heritage poles and custom designer poles created for urban beautification, public parks, resorts, and civic plazas.
              </p>
            </div>

            {/* Card 4: Octagonal & High Mast Poles */}
            <div className="group relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-ssil-red/80 hover:shadow-[0_16px_45px_-5px_rgba(225,29,72,0.45)] dark:hover:shadow-[0_16px_50px_-5px_rgba(225,29,72,0.55)] overflow-hidden">
              <Layers className="h-7 w-7 text-ssil-red mb-4 transition-transform group-hover:scale-110 duration-300" />
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2 group-hover:text-ssil-red transition-colors">
                Octagonal &amp; High Mast Poles
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Heavy-duty octagonal poles, high mast poles, and flag mast poles designed for highways, stadiums, airports, and industrial complexes.
              </p>
            </div>

            {/* Card 5: Indian Flag Poles */}
            <div className="group relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-ssil-red/80 hover:shadow-[0_16px_45px_-5px_rgba(225,29,72,0.45)] dark:hover:shadow-[0_16px_50px_-5px_rgba(225,29,72,0.55)] overflow-hidden">
              <Flag className="h-7 w-7 text-ssil-red mb-4 transition-transform group-hover:scale-110 duration-300" />
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2 group-hover:text-ssil-red transition-colors">
                Indian Flag Poles
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                High-tensile monumental flag mast poles and custom structural flag installations designed for civic landmarks and government infrastructure.
              </p>
            </div>

            {/* Card 6: Decorative LED Lighting */}
            <div className="group relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-ssil-red/80 hover:shadow-[0_16px_45px_-5px_rgba(225,29,72,0.45)] dark:hover:shadow-[0_16px_50px_-5px_rgba(225,29,72,0.55)] overflow-hidden">
              <Sparkles className="h-7 w-7 text-ssil-red mb-4 transition-transform group-hover:scale-110 duration-300" />
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2 group-hover:text-ssil-red transition-colors">
                Decorative LED Lighting
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Architectural decorative LED solutions blending aesthetic elegance with industrial durability for modern urban lifestyles.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. STAGE 3: COMPANY REGISTRATION & BACKGROUND (UNCHANGED) */}
      {/* ============================================================ */}
      <section className="py-14 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/60 dark:border-slate-800/80">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400 block mb-2">
            COMPANY REGISTRATION &amp; BACKGROUND
          </span>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            Established in the year 2015 in Haryana, India, Shiv Shakti India (SSIL) is a proprietorship-based firm engaged as a foremost manufacturer and provider of ornamental heritage lighting poles, galvanized iron LED street lights, decorative poles, brackets, and infrastructure luminaires.
          </p>
        </div>
      </section>

    </div>
  );
}
