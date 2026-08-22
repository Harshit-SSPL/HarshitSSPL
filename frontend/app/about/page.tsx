"use client";

import React, { useState } from "react";
import { HeroSection } from "@/components/ui/hero-section-5";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { StandardCard } from "@/components/ui/standard-card";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lightbulb,
  Building,
  Layers,
  Zap,
  Flag,
  Sparkles,
  ShieldCheck,
  Wrench,
  Trees,
  Landmark,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const offeringData = [
  {
    title: "1. Urban Lighting",
    categoryTag: "Municipal & Smart",
    description: "Energy-efficient smart street lights and civic luminaires engineered for municipal roadways and urban thoroughfares.",
    icon: <Lightbulb className="h-6 w-6" />,
  },
  {
    title: "2. Architectural Lighting",
    categoryTag: "Facade & Aesthetic",
    description: "Custom facade illuminators, structural highlights, and aesthetic building luminaires for modern commercial architecture.",
    icon: <Building className="h-6 w-6" />,
  },
  {
    title: "3. Highway & Infrastructural",
    categoryTag: "Expressways & Heavy-Duty",
    description: "Heavy-duty octagonal poles, expressway floodlights, and high-tensile roadway fixtures for state and national highways.",
    icon: <Layers className="h-6 w-6" />,
  },
  {
    title: "4. Park & Landscape",
    categoryTag: "Outdoor & Green Spaces",
    description: "Decorative bollards, garden pathway illuminators, and eco-friendly outdoor lawn lighting for public parks and resorts.",
    icon: <Trees className="h-6 w-6" />,
  },
  {
    title: "5. Heritage & Decorative",
    categoryTag: "Classic & Vintage",
    description: "Ornamental vintage poles, cast iron heritage brackets, and royal civic plaza luminaires blending classic charm with modern LEDs.",
    icon: <Landmark className="h-6 w-6" />,
  },
  {
    title: "6. High Mast & Sports",
    categoryTag: "Stadiums & High-Output",
    description: "Monumental high mast towers, stadium floodlighting, and multi-fixture high-output masts for sports arenas and industrial hubs.",
    icon: <Zap className="h-6 w-6" />,
  },
  {
    title: "7. CCTV & Security",
    categoryTag: "Surveillance & IoT",
    description: "Integrated smart poles equipped with surveillance camera mounts, IoT sensors, and civic security infrastructure.",
    icon: <ShieldCheck className="h-6 w-6" />,
  },
  {
    title: "8. Custom Engineered Structure",
    categoryTag: "Bespoke & Tailored",
    description: "Bespoke flag mast poles, tailored steel brackets, and specialized architectural frameworks manufactured to tender specifications.",
    icon: <Wrench className="h-6 w-6" />,
  },
];

export default function AboutPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  // 3 cards visible per view on desktop, max index is 8 - 3 = 5
  const cardsPerPage = 3;
  const maxIndex = offeringData.length - cardsPerPage;

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col gap-0 bg-white dark:bg-black text-slate-900 dark:text-white min-h-screen transition-colors duration-300">
      
      {/* ============================================================ */}
      {/* 1. TOP COMPONENT WITH RED BACKGROUND PATHS ANIMATION */}
      {/* ============================================================ */}
      <BackgroundPaths className="bg-white dark:bg-black">
        <HeroSection />
      </BackgroundPaths>

      {/* ============================================================ */}
      {/* 2. MAIN ABOUT US DESCRIPTION (RED ABOUT US HEADING) */}
      {/* ============================================================ */}
      <section className="py-16 md:py-24 bg-white dark:bg-black text-slate-900 dark:text-white border-b border-slate-200/80 dark:border-zinc-900 transition-colors relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl text-left relative z-10">
          
          {/* Main Title: About Us in SSIL Red Color */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-ssil-red tracking-tight mb-6">
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
      {/* 3. WHAT WE OFFER: 3 RECTANGULAR CARDS CAROUSEL WITH ARROWS */}
      {/* ============================================================ */}
      <section className="py-16 md:py-24 bg-slate-50 dark:bg-black text-slate-900 dark:text-white border-b border-slate-200/80 dark:border-zinc-900 transition-colors relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          
          {/* Header Row: Title & Subtitle + Boundary Arrow Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-3xl">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-ssil-red block mb-2">
                OUR SOLUTIONS
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                What We Offer
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed font-medium">
                Comprehensive architectural, infrastructural, and specialized lighting engineering designed for municipal expressways, urban plazas, and commercial developments.
              </p>
            </div>

            {/* Left / Right Boundary Navigation Arrow Controls */}
            <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                aria-label="Previous Offerings"
                className="h-12 w-12 rounded-full border border-slate-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-center text-slate-900 dark:text-white transition-all duration-200 hover:scale-105 hover:bg-ssil-red hover:text-white hover:border-ssil-red disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-white dark:disabled:hover:bg-zinc-900 disabled:hover:text-slate-900 dark:disabled:hover:text-white disabled:hover:border-slate-300 dark:disabled:hover:border-zinc-800 shadow-sm"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                aria-label="Next Offerings"
                className="h-12 w-12 rounded-full border border-slate-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-center text-slate-900 dark:text-white transition-all duration-200 hover:scale-105 hover:bg-ssil-red hover:text-white hover:border-ssil-red disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-white dark:disabled:hover:bg-zinc-900 disabled:hover:text-slate-900 dark:disabled:hover:text-white disabled:hover:border-slate-300 dark:disabled:hover:border-zinc-800 shadow-sm"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* 3 Rectangular Cards Sliding Window Display */}
          <div className="overflow-hidden">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial={false}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {offeringData
                .slice(currentIndex, currentIndex + cardsPerPage)
                .map((item, index) => (
                  <motion.div
                    key={`${item.title}-${currentIndex + index}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <StandardCard
                      title={item.title}
                      categoryTag={item.categoryTag}
                      description={item.description}
                      icon={item.icon}
                    />
                  </motion.div>
                ))}
            </motion.div>
          </div>

          {/* Progress Indicator Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, dotIndex) => (
              <button
                key={dotIndex}
                onClick={() => setCurrentIndex(dotIndex)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === dotIndex
                    ? "w-8 bg-ssil-red"
                    : "w-2 bg-slate-300 dark:bg-zinc-800 hover:bg-ssil-red/50"
                }`}
                aria-label={`Go to slide ${dotIndex + 1}`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. OUR EXPERTISE (CENTERED HEADING & 6 CARDS) */}
      {/* ============================================================ */}
      <section className="py-16 md:py-24 bg-white dark:bg-black text-slate-900 dark:text-white border-b border-slate-200/80 dark:border-zinc-900 transition-colors">
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
            <div className="group relative p-6 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200/90 dark:border-zinc-800/90 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-ssil-red/80 hover:shadow-[0_16px_45px_-5px_rgba(225,29,72,0.35)] dark:hover:shadow-[0_16px_50px_-5px_rgba(225,29,72,0.55)] overflow-hidden">
              <Lightbulb className="h-8 w-8 text-ssil-red mb-4 transition-transform group-hover:scale-110 duration-300" />
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2 group-hover:text-ssil-red transition-colors">
                Outdoor &amp; Indoor LED Luminaires
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Energy-efficient LED luminaires and lighting fixtures engineered for high performance, commercial facilities, and residential developments.
              </p>
            </div>

            {/* Card 2: Solar Lights & Power Plants */}
            <div className="group relative p-6 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200/90 dark:border-zinc-800/90 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-ssil-red/80 hover:shadow-[0_16px_45px_-5px_rgba(225,29,72,0.35)] dark:hover:shadow-[0_16px_50px_-5px_rgba(225,29,72,0.55)] overflow-hidden">
              <Zap className="h-8 w-8 text-ssil-red mb-4 transition-transform group-hover:scale-110 duration-300" />
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2 group-hover:text-ssil-red transition-colors">
                Solar Lights &amp; Power Plants
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Integrated solar lighting systems, standalone solar LED poles, and commercial solar power plant installations for sustainable infrastructure.
              </p>
            </div>

            {/* Card 3: Ornamental & Designer Poles */}
            <div className="group relative p-6 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200/90 dark:border-zinc-800/90 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-ssil-red/80 hover:shadow-[0_16px_45px_-5px_rgba(225,29,72,0.35)] dark:hover:shadow-[0_16px_50px_-5px_rgba(225,29,72,0.55)] overflow-hidden">
              <Building className="h-8 w-8 text-ssil-red mb-4 transition-transform group-hover:scale-110 duration-300" />
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2 group-hover:text-ssil-red transition-colors">
                Ornamental &amp; Designer Poles
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Ornamental heritage poles and custom designer poles created for urban beautification, public parks, resorts, and civic plazas.
              </p>
            </div>

            {/* Card 4: Octagonal & High Mast Poles */}
            <div className="group relative p-6 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200/90 dark:border-zinc-800/90 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-ssil-red/80 hover:shadow-[0_16px_45px_-5px_rgba(225,29,72,0.35)] dark:hover:shadow-[0_16px_50px_-5px_rgba(225,29,72,0.55)] overflow-hidden">
              <Layers className="h-8 w-8 text-ssil-red mb-4 transition-transform group-hover:scale-110 duration-300" />
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2 group-hover:text-ssil-red transition-colors">
                Octagonal &amp; High Mast Poles
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Heavy-duty octagonal poles, high mast poles, and flag mast poles designed for highways, stadiums, airports, and industrial complexes.
              </p>
            </div>

            {/* Card 5: Indian Flag Poles */}
            <div className="group relative p-6 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200/90 dark:border-zinc-800/90 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-ssil-red/80 hover:shadow-[0_16px_45px_-5px_rgba(225,29,72,0.35)] dark:hover:shadow-[0_16px_50px_-5px_rgba(225,29,72,0.55)] overflow-hidden">
              <Flag className="h-8 w-8 text-ssil-red mb-4 transition-transform group-hover:scale-110 duration-300" />
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2 group-hover:text-ssil-red transition-colors">
                Indian Flag Poles
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                High-tensile monumental flag mast poles and custom structural flag installations designed for civic landmarks and government infrastructure.
              </p>
            </div>

            {/* Card 6: Decorative LED Lighting */}
            <div className="group relative p-6 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200/90 dark:border-zinc-800/90 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-ssil-red/80 hover:shadow-[0_16px_45px_-5px_rgba(225,29,72,0.35)] dark:hover:shadow-[0_16px_50px_-5px_rgba(225,29,72,0.55)] overflow-hidden">
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
      {/* 5. COMPANY REGISTRATION & BACKGROUND (BOTTOM CENTERED) */}
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
