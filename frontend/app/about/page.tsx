"use client";

import React from "react";
import { HeroSection } from "@/components/ui/hero-section-5";
import {
  Lightbulb,
  Building,
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
    <div className="flex flex-col gap-0 bg-white dark:bg-black text-slate-900 dark:text-white min-h-screen transition-colors duration-300">
      
      {/* ============================================================ */}
      {/* 1. TOP COMPONENT: HERO SECTION 5 (DIRECTLY AFTER NAVBAR) */}
      {/* ============================================================ */}
      <HeroSection />

      {/* ============================================================ */}
      {/* 2. MAIN ABOUT US DESCRIPTION (FIRST WORD WRITTEN: ABOUT US) */}
      {/* ============================================================ */}
      <section className="py-16 md:py-24 bg-white dark:bg-black text-slate-900 dark:text-white border-b border-slate-200/80 dark:border-zinc-900 transition-colors">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl text-left">
          
          {/* First Word Written on Page: About Us (Left-Aligned) */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
            About Us
          </h2>

          {/* 5 to 6 Lines Corporate Description (Left-Aligned Wide Paragraph) */}
          <div className="w-full text-slate-700 dark:text-slate-200 text-base sm:text-lg md:text-xl leading-relaxed font-normal">
            <p className="max-w-6xl">
              Shiv Shakti India Limited (SSIL) is one of the most equipped and major manufacturers of lighting solution providers in the global market. We are an experienced organization in the field of complete lighting solutions, enclosing all your requirements in a single basket. We are engaged in the export and supply of a wide range of commercial and household products, enclosing outdoor, indoor, solar, decorative LED lights, and solar plants. Engineered for long-lasting durability, SSIL&apos;s infrastructure luminaires, decorative poles, octagonal poles, and high mast installations serve municipal expressways, real estate developments, and public landmarks across India.
            </p>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. OUR EXPERTISE (CENTERED HEADING & 6 CARDS) */}
      {/* ============================================================ */}
      <section className="py-16 md:py-24 bg-slate-50 dark:bg-black text-slate-900 dark:text-white border-b border-slate-200/80 dark:border-zinc-900 transition-colors">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          
          {/* Centered Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-ssil-red block mb-2">
              CORE CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              OUR EXPERTISE
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
              Comprehensive product and fixture range manufactured with high-precision engineering to serve urban infrastructure, highway developments, and commercial projects.
            </p>
          </div>

          {/* 6 Expertise Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            
            {/* Card 1: Outdoor & Indoor LED Luminaires */}
            <div className="group relative p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-slate-200/90 dark:border-zinc-800/90 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-ssil-red/80 hover:shadow-[0_16px_45px_-5px_rgba(225,29,72,0.35)] dark:hover:shadow-[0_16px_50px_-5px_rgba(225,29,72,0.55)] overflow-hidden">
              <Lightbulb className="h-8 w-8 text-ssil-red mb-4 transition-transform group-hover:scale-110 duration-300" />
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2 group-hover:text-ssil-red transition-colors">
                Outdoor &amp; Indoor LED Luminaires
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Energy-efficient LED luminaires and lighting fixtures engineered for high performance, commercial facilities, and residential developments.
              </p>
            </div>

            {/* Card 2: Solar Lights & Power Plants */}
            <div className="group relative p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-slate-200/90 dark:border-zinc-800/90 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-ssil-red/80 hover:shadow-[0_16px_45px_-5px_rgba(225,29,72,0.35)] dark:hover:shadow-[0_16px_50px_-5px_rgba(225,29,72,0.55)] overflow-hidden">
              <Zap className="h-8 w-8 text-ssil-red mb-4 transition-transform group-hover:scale-110 duration-300" />
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2 group-hover:text-ssil-red transition-colors">
                Solar Lights &amp; Power Plants
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Integrated solar lighting systems, standalone solar LED poles, and commercial solar power plant installations for sustainable infrastructure.
              </p>
            </div>

            {/* Card 3: Ornamental & Designer Poles */}
            <div className="group relative p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-slate-200/90 dark:border-zinc-800/90 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-ssil-red/80 hover:shadow-[0_16px_45px_-5px_rgba(225,29,72,0.35)] dark:hover:shadow-[0_16px_50px_-5px_rgba(225,29,72,0.55)] overflow-hidden">
              <Building className="h-8 w-8 text-ssil-red mb-4 transition-transform group-hover:scale-110 duration-300" />
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2 group-hover:text-ssil-red transition-colors">
                Ornamental &amp; Designer Poles
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Ornamental heritage poles and custom designer poles created for urban beautification, public parks, resorts, and civic plazas.
              </p>
            </div>

            {/* Card 4: Octagonal & High Mast Poles */}
            <div className="group relative p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-slate-200/90 dark:border-zinc-800/90 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-ssil-red/80 hover:shadow-[0_16px_45px_-5px_rgba(225,29,72,0.35)] dark:hover:shadow-[0_16px_50px_-5px_rgba(225,29,72,0.55)] overflow-hidden">
              <Layers className="h-8 w-8 text-ssil-red mb-4 transition-transform group-hover:scale-110 duration-300" />
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2 group-hover:text-ssil-red transition-colors">
                Octagonal &amp; High Mast Poles
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Heavy-duty octagonal poles, high mast poles, and flag mast poles designed for highways, stadiums, airports, and industrial complexes.
              </p>
            </div>

            {/* Card 5: Indian Flag Poles */}
            <div className="group relative p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-slate-200/90 dark:border-zinc-800/90 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-ssil-red/80 hover:shadow-[0_16px_45px_-5px_rgba(225,29,72,0.35)] dark:hover:shadow-[0_16px_50px_-5px_rgba(225,29,72,0.55)] overflow-hidden">
              <Flag className="h-8 w-8 text-ssil-red mb-4 transition-transform group-hover:scale-110 duration-300" />
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2 group-hover:text-ssil-red transition-colors">
                Indian Flag Poles
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                High-tensile monumental flag mast poles and custom structural flag installations designed for civic landmarks and government infrastructure.
              </p>
            </div>

            {/* Card 6: Decorative LED Lighting */}
            <div className="group relative p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-slate-200/90 dark:border-zinc-800/90 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-ssil-red/80 hover:shadow-[0_16px_45px_-5px_rgba(225,29,72,0.35)] dark:hover:shadow-[0_16px_50px_-5px_rgba(225,29,72,0.55)] overflow-hidden">
              <Sparkles className="h-8 w-8 text-ssil-red mb-4 transition-transform group-hover:scale-110 duration-300" />
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
      {/* 4. COMPANY REGISTRATION & BACKGROUND (BOTTOM CENTERED) */}
      {/* ============================================================ */}
      <section className="py-14 bg-slate-100 dark:bg-zinc-950 border-t border-slate-200/80 dark:border-zinc-900 transition-colors">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-zinc-500 block mb-2">
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
