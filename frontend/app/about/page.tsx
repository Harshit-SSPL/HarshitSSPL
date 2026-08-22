"use client";

import React from "react";
import CopperplateHatch from "@/components/ui/copperplate-hatch";
import {
  Lightbulb,
  Building,
  Layers,
  Zap,
  Flag,
  Sparkles,
  Target,
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
    <div className="flex flex-col gap-0 bg-slate-950 text-slate-100 min-h-screen transition-colors">
      
      {/* ============================================================ */}
      {/* 1. TOP COMPONENT: COPPERPLATE HATCH ANIMATED HERO BANNER */}
      {/* ============================================================ */}
      <section className="relative w-full overflow-hidden bg-slate-950 border-b border-slate-800/80">
        <CopperplateHatch
          className="w-full min-h-[440px] sm:min-h-[500px] flex items-center pt-28 pb-16"
          density={1}
          intensity={1.1}
          speed={1}
          interactive={true}
          accent="#E11D48"
          safeArea={{ x: 0.04, y: 0.15, w: 0.72, h: 0.7 }}
        >
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10 text-left">
            
            {/* Eyebrow Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-900/90 border border-slate-700/80 px-3.5 py-1.5 backdrop-blur-md shadow-lg">
              <span className="h-2 w-2 rounded-full bg-ssil-red animate-pulse" />
              <span className="text-xs font-extrabold uppercase tracking-widest text-slate-200">
                SSIL INDIA &bull; Infrastructure &amp; Architectural Lighting
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mb-4">
              Engineering Infrastructure Lighting Under One Roof
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              Manufactured with high-precision engineering to serve urban infrastructure, highway developments, and commercial projects across India.
            </p>

          </div>
        </CopperplateHatch>
      </section>

      {/* ============================================================ */}
      {/* 2. SECTION 2: ABOUT US & WIDE 6-7 LINE DESCRIPTION */}
      {/* ============================================================ */}
      <section className="py-16 md:py-24 bg-slate-950 text-white border-b border-slate-900">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl text-left">
          
          <span className="text-xs font-extrabold uppercase tracking-widest text-ssil-red block mb-2">
            COMPANY OVERVIEW
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-6">
            ABOUT US
          </h2>

          {/* Wide 6-7 Line Corporate Paragraph */}
          <div className="w-full text-slate-200 text-base sm:text-lg md:text-xl leading-relaxed font-normal space-y-4">
            <p className="max-w-6xl">
              Shiv Shakti India Limited (SSIL) is one of the most equipped and major manufacturers of lighting solution providers in the global market. We are an experienced organization in the field of complete lighting solutions, enclosing all your requirements in a single basket. We are engaged in the export and supply of a wide range of commercial and household products, enclosing outdoor, indoor, solar, decorative LED lights, and solar plants. Engineered for long-lasting durability, SSIL&apos;s infrastructure luminaires, decorative poles, octagonal poles, and high mast installations serve municipal expressways, real estate developments, and public landmarks across India.
            </p>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. SECTION 3: OUR MISSION & WIDE 2-4 LINE STATEMENT */}
      {/* ============================================================ */}
      <section className="py-16 md:py-20 bg-slate-900/60 text-white border-b border-slate-800/80">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl text-left">
          
          <div className="flex items-center gap-3 mb-2">
            <Target className="h-5 w-5 text-ssil-red" />
            <span className="text-xs font-extrabold uppercase tracking-widest text-ssil-red">
              OUR PURPOSE
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-6">
            OUR MISSION
          </h2>

          {/* Wide 2-4 Line Mission Statement */}
          <div className="w-full text-slate-200 text-base sm:text-lg md:text-xl leading-relaxed font-medium">
            <p className="max-w-6xl border-l-4 border-ssil-red pl-5 py-1 text-slate-100">
              To empower nationwide urban development and civic infrastructure through energy-efficient LED luminaires, sustainable solar power systems, and monumental structural lighting solutions engineered to global compliance standards.
            </p>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. SECTION 4: OUR EXPERTISE (6 DIV CONTAINERS) */}
      {/* ============================================================ */}
      <section className="py-16 md:py-24 bg-slate-950 text-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          
          {/* Section Header */}
          <div className="text-left max-w-3xl mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-ssil-red block mb-2">
              CORE CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              OUR EXPERTISE
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
              Comprehensive product and fixture range manufactured with high-precision engineering for civic infrastructure and commercial projects.
            </p>
          </div>

          {/* 6 Expertise Div Containers */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            
            {/* Div 1: Outdoor & Indoor LED Luminaires */}
            <div className="group relative p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-ssil-red/80 hover:shadow-[0_16px_50px_-5px_rgba(225,29,72,0.55)] overflow-hidden">
              <Lightbulb className="h-8 w-8 text-ssil-red mb-4 transition-transform group-hover:scale-110 duration-300" />
              <h3 className="text-lg font-extrabold text-white mb-2 group-hover:text-ssil-red transition-colors">
                Outdoor &amp; Indoor LED Luminaires
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Energy-efficient LED luminaires and lighting fixtures engineered for high performance, commercial facilities, and residential developments.
              </p>
            </div>

            {/* Div 2: Solar Lights & Power Plants */}
            <div className="group relative p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-ssil-red/80 hover:shadow-[0_16px_50px_-5px_rgba(225,29,72,0.55)] overflow-hidden">
              <Zap className="h-8 w-8 text-ssil-red mb-4 transition-transform group-hover:scale-110 duration-300" />
              <h3 className="text-lg font-extrabold text-white mb-2 group-hover:text-ssil-red transition-colors">
                Solar Lights &amp; Power Plants
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Integrated solar lighting systems, standalone solar LED poles, and commercial solar power plant installations for sustainable infrastructure.
              </p>
            </div>

            {/* Div 3: Ornamental & Designer Poles */}
            <div className="group relative p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-ssil-red/80 hover:shadow-[0_16px_50px_-5px_rgba(225,29,72,0.55)] overflow-hidden">
              <Building className="h-8 w-8 text-ssil-red mb-4 transition-transform group-hover:scale-110 duration-300" />
              <h3 className="text-lg font-extrabold text-white mb-2 group-hover:text-ssil-red transition-colors">
                Ornamental &amp; Designer Poles
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Ornamental heritage poles and custom designer poles created for urban beautification, public parks, resorts, and civic plazas.
              </p>
            </div>

            {/* Div 4: Octagonal & High Mast Poles */}
            <div className="group relative p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-ssil-red/80 hover:shadow-[0_16px_50px_-5px_rgba(225,29,72,0.55)] overflow-hidden">
              <Layers className="h-8 w-8 text-ssil-red mb-4 transition-transform group-hover:scale-110 duration-300" />
              <h3 className="text-lg font-extrabold text-white mb-2 group-hover:text-ssil-red transition-colors">
                Octagonal &amp; High Mast Poles
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Heavy-duty octagonal poles, high mast poles, and flag mast poles designed for highways, stadiums, airports, and industrial complexes.
              </p>
            </div>

            {/* Div 5: Indian Flag Poles */}
            <div className="group relative p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-ssil-red/80 hover:shadow-[0_16px_50px_-5px_rgba(225,29,72,0.55)] overflow-hidden">
              <Flag className="h-8 w-8 text-ssil-red mb-4 transition-transform group-hover:scale-110 duration-300" />
              <h3 className="text-lg font-extrabold text-white mb-2 group-hover:text-ssil-red transition-colors">
                Indian Flag Poles
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                High-tensile monumental flag mast poles and custom structural flag installations designed for civic landmarks and government infrastructure.
              </p>
            </div>

            {/* Div 6: Decorative LED Lighting */}
            <div className="group relative p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-ssil-red/80 hover:shadow-[0_16px_50px_-5px_rgba(225,29,72,0.55)] overflow-hidden">
              <Sparkles className="h-8 w-8 text-ssil-red mb-4 transition-transform group-hover:scale-110 duration-300" />
              <h3 className="text-lg font-extrabold text-white mb-2 group-hover:text-ssil-red transition-colors">
                Decorative LED Lighting
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Architectural decorative LED solutions blending aesthetic elegance with industrial durability for modern urban lifestyles.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
