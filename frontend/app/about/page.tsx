"use client";

import React from "react";
import { HeroSection } from "@/components/ui/hero-section-5";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { motion } from "framer-motion";
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
  Check,
  X,
} from "lucide-react";

const offeringData = [
  {
    num: "01",
    title: "1. Urban Lighting",
    categoryTag: "Municipal & Smart",
    description: "Energy-efficient smart street lights and civic luminaires engineered for municipal roadways and urban thoroughfares.",
    icon: <Lightbulb className="h-6 w-6 sm:h-7 sm:w-7" />,
    offsetClass: "pr-0",
  },
  {
    num: "02",
    title: "2. Architectural Lighting",
    categoryTag: "Facade & Aesthetic",
    description: "Custom facade illuminators, structural highlights, and aesthetic building luminaires for modern commercial architecture.",
    icon: <Building className="h-6 w-6 sm:h-7 sm:w-7" />,
    offsetClass: "pr-4 sm:pr-6",
  },
  {
    num: "03",
    title: "3. Highway & Infrastructural",
    categoryTag: "Expressways & Heavy-Duty",
    description: "Heavy-duty octagonal poles, expressway floodlights, and high-tensile roadway fixtures for state and national highways.",
    icon: <Layers className="h-6 w-6 sm:h-7 sm:w-7" />,
    offsetClass: "pr-1 sm:pr-2",
  },
  {
    num: "04",
    title: "4. Park & Landscape",
    categoryTag: "Outdoor & Green Spaces",
    description: "Decorative bollards, garden pathway illuminators, and eco-friendly outdoor lawn lighting for public parks and resorts.",
    icon: <Trees className="h-6 w-6 sm:h-7 sm:w-7" />,
    offsetClass: "pr-5 sm:pr-8",
  },
  {
    num: "05",
    title: "5. Heritage & Decorative",
    categoryTag: "Classic & Vintage",
    description: "Ornamental vintage poles, cast iron heritage brackets, and royal civic plaza luminaires blending classic charm with modern LEDs.",
    icon: <Landmark className="h-6 w-6 sm:h-7 sm:w-7" />,
    offsetClass: "pr-0",
  },
  {
    num: "06",
    title: "6. High Mast & Sports",
    categoryTag: "Stadiums & High-Output",
    description: "Monumental high mast towers, stadium floodlighting, and multi-fixture high-output masts for sports arenas and industrial hubs.",
    icon: <Zap className="h-6 w-6 sm:h-7 sm:w-7" />,
    offsetClass: "pr-3 sm:pr-5",
  },
  {
    num: "07",
    title: "7. CCTV & Security",
    categoryTag: "Surveillance & IoT",
    description: "Integrated smart poles equipped with surveillance camera mounts, IoT sensors, and civic security infrastructure.",
    icon: <ShieldCheck className="h-6 w-6 sm:h-7 sm:w-7" />,
    offsetClass: "pr-1 sm:pr-3",
  },
  {
    num: "08",
    title: "8. Custom Engineered Structure",
    categoryTag: "Bespoke & Tailored",
    description: "Bespoke flag mast poles, tailored steel brackets, and specialized architectural frameworks manufactured to tender specifications.",
    icon: <Wrench className="h-6 w-6 sm:h-7 sm:w-7" />,
    offsetClass: "pr-4 sm:pr-7",
  },
];

const whySsilData = [
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

// Repeatable Viewport Entrance Animation Variants
const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 45,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: [0.21, 0.47, 0.32, 0.98],
      staggerChildren: 0.08,
    },
  },
};

const childVariants = {
  hidden: {
    opacity: 0,
    y: 25,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

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
      {/* 1. TOP COMPONENT WITH RED BACKGROUND PATHS ANIMATION */}
      {/* ============================================================ */}
      <BackgroundPaths className="bg-white dark:bg-black">
        <HeroSection />
      </BackgroundPaths>

      {/* ============================================================ */}
      {/* 2. MAIN ABOUT US DESCRIPTION (REPEATABLE ENTRANCE ANIMATION) */}
      {/* ============================================================ */}
      <motion.section
        className="py-16 md:py-24 bg-white dark:bg-black text-slate-900 dark:text-white border-b border-slate-200/80 dark:border-zinc-900 transition-colors relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl text-left relative z-10">
          
          {/* Main Title: About Us in SSIL Red Color */}
          <motion.h2
            variants={childVariants}
            className="text-3xl sm:text-5xl lg:text-6xl font-black text-ssil-red tracking-tight mb-6"
          >
            About Us
          </motion.h2>

          {/* Corporate Description Paragraph */}
          <motion.div
            variants={childVariants}
            className="w-full text-slate-700 dark:text-slate-200 text-base sm:text-lg md:text-xl leading-relaxed font-normal"
          >
            <p className="max-w-6xl">
              Shiv Shakti India Limited (SSIL) is one of the most equipped and major manufacturers of lighting solution providers in the global market. We are an experienced organization in the field of complete lighting solutions, enclosing all your requirements in a single basket. We are engaged in the export and supply of a wide range of commercial and household products, enclosing outdoor, indoor, solar, decorative LED lights, and solar plants. Engineered for long-lasting durability, SSIL&apos;s infrastructure luminaires, decorative poles, octagonal poles, and high mast installations serve municipal expressways, real estate developments, and public landmarks across India.
            </p>
          </motion.div>

        </div>
      </motion.section>

      {/* ============================================================ */}
      {/* 3. OUR SOLUTIONS / WHAT WE OFFER (EDITORIAL HIGH-IMPACT TYPOGRAPHY & SMOOTH GLIDE) */}
      {/* ============================================================ */}
      <motion.section
        className="py-16 md:py-24 bg-slate-50 dark:bg-black text-slate-900 dark:text-white border-b border-slate-200/80 dark:border-zinc-900 transition-colors relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          
          {/* Section Header: Editorial Eyebrow + 2-Line High Impact Title */}
          <motion.div variants={childVariants} className="max-w-4xl mb-14 sm:mb-20">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-slate-900 dark:text-slate-200 block mb-4">
              WHAT WE OFFER
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.08]">
              Complete lighting solutions,<br />
              <span className="text-ssil-red">engineered to last.</span>
            </h2>
          </motion.div>

          {/* Solution Rows Container with Inset Straight Horizontal Lines */}
          <motion.div
            variants={childVariants}
            className="w-full max-w-6xl mx-auto"
          >
            {/* Top Straight Line (Not Touching Screen Edges) */}
            <div className="w-full h-[1px] bg-slate-200/90 dark:bg-slate-800/90" />

            {offeringData.map((item, index) => (
              <React.Fragment key={item.num}>
                {index > 0 && (
                  <div className="w-full h-[1px] bg-slate-200/90 dark:bg-slate-800/90" />
                )}
                
                <motion.div
                  whileHover={{ x: -10 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="group relative py-8 sm:py-10 px-4 sm:px-6 transition-colors duration-300 ease-out flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 hover:bg-slate-100/70 dark:hover:bg-slate-900/60 cursor-pointer"
                >
                  {/* Left Side: Large Editorial Index Number & Solution Title */}
                  <div className="flex items-center gap-5 sm:gap-8 lg:gap-12 shrink-0 md:w-5/12 lg:w-5/12">
                    <span className="text-xl sm:text-2xl font-bold text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors duration-300 w-8 sm:w-12 shrink-0">
                      {item.num}
                    </span>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-white group-hover:text-ssil-red transition-colors duration-300 tracking-tight">
                      {item.title}
                    </h3>
                  </div>

                  {/* Center / Right: Description */}
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed md:w-5/12 lg:w-5/12">
                    {item.description}
                  </p>

                  {/* Far Right: Staggered Lucide Icon Asset */}
                  <div className={`shrink-0 flex items-center justify-start md:justify-end md:w-2/12 text-slate-400 dark:text-slate-500 group-hover:text-ssil-red group-hover:scale-110 transition-all duration-300 ${item.offsetClass}`}>
                    {item.icon}
                  </div>
                </motion.div>
              </React.Fragment>
            ))}

            {/* Bottom Straight Line (Not Touching Screen Edges) */}
            <div className="w-full h-[1px] bg-slate-200/90 dark:bg-slate-800/90" />
          </motion.div>

        </div>
      </motion.section>

      {/* ============================================================ */}
      {/* 4. WHY SSIL / THE SSIL DIFFERENCE (COMPARISON TABLE) */}
      {/* ============================================================ */}
      <motion.section
        className="py-16 md:py-24 bg-white dark:bg-black text-slate-900 dark:text-white border-b border-slate-200/80 dark:border-zinc-900 transition-colors relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          
          {/* Section Header: Eyebrow + 2-Line Title + Right Badge */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 sm:mb-20 gap-6">
            <motion.div variants={childVariants} className="max-w-4xl">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-slate-900 dark:text-slate-200 block mb-4">
                WHY SSIL
              </span>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.08]">
                The difference,<br />
                <span className="text-ssil-red">built for what&apos;s next.</span>
              </h2>
            </motion.div>

            <motion.div variants={childVariants} className="shrink-0 self-start lg:self-end">
              <span className="text-xs sm:text-sm font-extrabold tracking-widest uppercase text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-zinc-800 px-4 py-2 rounded-full bg-slate-100/80 dark:bg-zinc-900/80 shadow-sm">
                SSIL VS. CONVENTIONAL LIGHTING
              </span>
            </motion.div>
          </div>

          {/* Comparison Table Container */}
          <motion.div
            variants={childVariants}
            className="w-full max-w-6xl mx-auto rounded-3xl bg-slate-50/90 dark:bg-zinc-950/80 border border-slate-200/90 dark:border-zinc-800/90 shadow-xl backdrop-blur-md overflow-hidden"
          >
            {/* Table Header Row (Desktop & Tablet) */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-5 bg-slate-100/90 dark:bg-zinc-900/90 border-b border-slate-200/90 dark:border-zinc-800/90 text-xs sm:text-sm font-black uppercase tracking-wider">
              <div className="col-span-4 text-slate-500 dark:text-slate-400">
                Feature
              </div>
              <div className="col-span-4 text-slate-900 dark:text-white flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-ssil-red inline-block" />
                <span className="text-ssil-red font-black">SSIL Infrastructure</span>
              </div>
              <div className="col-span-4 text-slate-400 dark:text-slate-500">
                Conventional Supplier
              </div>
            </div>

            {/* Rows Container */}
            <div className="divide-y divide-slate-200/90 dark:divide-zinc-800/90">
              {whySsilData.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="p-5 sm:p-7 transition-colors duration-300 hover:bg-white/80 dark:hover:bg-zinc-900/60"
                >
                  {/* Desktop Grid Layout */}
                  <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-4 font-black text-sm sm:text-base text-slate-900 dark:text-white tracking-tight">
                      {item.category}
                    </div>
                    <div className="col-span-4 flex items-start gap-3 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed bg-ssil-red/5 dark:bg-ssil-red/10 p-3.5 rounded-xl border border-ssil-red/20">
                      <Check className="h-4 w-4 text-ssil-red shrink-0 mt-0.5" />
                      <span>{item.ssil}</span>
                    </div>
                    <div className="col-span-4 flex items-start gap-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal leading-relaxed p-3.5">
                      <X className="h-4 w-4 text-slate-400 dark:text-slate-600 shrink-0 mt-0.5" />
                      <span>{item.conventional}</span>
                    </div>
                  </div>

                  {/* Mobile Stacked Card Layout */}
                  <div className="flex md:hidden flex-col gap-3">
                    <span className="font-black text-sm text-slate-900 dark:text-white tracking-tight">
                      {item.category}
                    </span>
                    
                    <div className="flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-200 font-medium leading-relaxed bg-ssil-red/5 dark:bg-ssil-red/10 p-3 rounded-xl border border-ssil-red/20">
                      <Check className="h-4 w-4 text-ssil-red shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-black uppercase text-ssil-red block mb-0.5">SSIL:</span>
                        {item.ssil}
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 text-xs text-slate-500 dark:text-slate-400 font-normal leading-relaxed p-3 bg-slate-100/50 dark:bg-zinc-900/50 rounded-xl border border-slate-200/50 dark:border-zinc-800/50">
                      <X className="h-4 w-4 text-slate-400 dark:text-slate-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-extrabold uppercase text-slate-400 dark:text-slate-500 block mb-0.5">Conventional:</span>
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

      {/* ============================================================ */}
      {/* 5. OUR EXPERTISE (REPEATABLE ENTRANCE ANIMATION) */}
      {/* ============================================================ */}
      <motion.section
        className="py-16 md:py-24 bg-white dark:bg-black text-slate-900 dark:text-white border-b border-slate-200/80 dark:border-zinc-900 transition-colors"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          
          {/* Centered Section Header */}
          <motion.div variants={childVariants} className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-ssil-red block mb-2">
              CORE CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              OUR EXPERTISE
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
              Comprehensive product and fixture range manufactured with high-precision engineering to serve urban infrastructure, highway developments, and commercial projects.
            </p>
          </motion.div>

          {/* 6 Expertise Cards */}
          <motion.div variants={childVariants} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            
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

          </motion.div>
        </div>
      </motion.section>

      {/* ============================================================ */}
      {/* 6. COMPANY REGISTRATION & BACKGROUND (BOTTOM CENTERED) */}
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
