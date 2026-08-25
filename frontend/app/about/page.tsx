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
    icon: <Lightbulb className="h-5 w-5 sm:h-6 sm:w-6" />,
    offsetClass: "pr-0",
  },
  {
    num: "02",
    title: "2. Architectural Lighting",
    categoryTag: "Facade & Aesthetic",
    description: "Custom facade illuminators, structural highlights, and aesthetic building luminaires for modern commercial architecture.",
    icon: <Building className="h-5 w-5 sm:h-6 sm:w-6" />,
    offsetClass: "pr-4 sm:pr-6",
  },
  {
    num: "03",
    title: "3. Highway & Infrastructural",
    categoryTag: "Expressways & Heavy-Duty",
    description: "Heavy-duty octagonal poles, expressway floodlights, and high-tensile roadway fixtures for state and national highways.",
    icon: <Layers className="h-5 w-5 sm:h-6 sm:w-6" />,
    offsetClass: "pr-1 sm:pr-2",
  },
  {
    num: "04",
    title: "4. Park & Landscape",
    categoryTag: "Outdoor & Green Spaces",
    description: "Decorative bollards, garden pathway illuminators, and eco-friendly outdoor lawn lighting for public parks and resorts.",
    icon: <Trees className="h-5 w-5 sm:h-6 sm:w-6" />,
    offsetClass: "pr-5 sm:pr-8",
  },
  {
    num: "05",
    title: "5. Heritage & Decorative",
    categoryTag: "Classic & Vintage",
    description: "Ornamental vintage poles, cast iron heritage brackets, and royal civic plaza luminaires blending classic charm with modern LEDs.",
    icon: <Landmark className="h-5 w-5 sm:h-6 sm:w-6" />,
    offsetClass: "pr-0",
  },
  {
    num: "06",
    title: "6. High Mast & Sports",
    categoryTag: "Stadiums & High-Output",
    description: "Monumental high mast towers, stadium floodlighting, and multi-fixture high-output masts for sports arenas and industrial hubs.",
    icon: <Zap className="h-5 w-5 sm:h-6 sm:w-6" />,
    offsetClass: "pr-3 sm:pr-5",
  },
  {
    num: "07",
    title: "7. CCTV & Security",
    categoryTag: "Surveillance & IoT",
    description: "Integrated smart poles equipped with surveillance camera mounts, IoT sensors, and civic security infrastructure.",
    icon: <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6" />,
    offsetClass: "pr-1 sm:pr-3",
  },
  {
    num: "08",
    title: "8. Custom Engineered Structure",
    categoryTag: "Bespoke & Tailored",
    description: "Bespoke flag mast poles, tailored steel brackets, and specialized architectural frameworks manufactured to tender specifications.",
    icon: <Wrench className="h-5 w-5 sm:h-6 sm:w-6" />,
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

const processData = [
  {
    num: "01",
    title: "1. Project Requirements & Specs",
    description: "Comprehensive evaluation of site conditions, lighting levels, architectural drawings, and tender technical specifications.",
  },
  {
    num: "02",
    title: "2. Solution Engineering & Design",
    description: "Custom structural calculations, photometrics, pole design, bracket geometry, and luminaire selection tailored to project goals.",
  },
  {
    num: "03",
    title: "3. Precision Manufacturing & Quality",
    description: "In-house production of octagonal poles, high mast towers, heritage brackets, and LED luminaires with strict ISO quality controls.",
  },
  {
    num: "04",
    title: "4. Logistics & Transportation",
    description: "Coordinated fleet freight, protective heavy-duty packaging, and synchronized logistics for safe on-time site arrival.",
  },
  {
    num: "05",
    title: "5. On-Site Deployment & Support",
    description: "Technical supply chain support, erection guidance, and final commissioning verification for civic and industrial infrastructure.",
  },
];

const expertiseData = [
  {
    tag: "01 / 06",
    title: "Outdoor & Indoor LED Luminaires",
    description: "Energy-efficient LED luminaires and lighting fixtures engineered for high performance, commercial facilities, and residential developments.",
    icon: <Lightbulb className="h-6 w-6 text-ssil-red mb-2.5 transition-transform group-hover:scale-105 duration-300" />,
  },
  {
    tag: "02 / 06",
    title: "Solar Lights & Power Plants",
    description: "Integrated solar lighting systems, standalone solar LED poles, and commercial solar power plant installations for sustainable infrastructure.",
    icon: <Zap className="h-6 w-6 text-ssil-red mb-2.5 transition-transform group-hover:scale-105 duration-300" />,
  },
  {
    tag: "03 / 06",
    title: "Ornamental & Designer Poles",
    description: "Ornamental heritage poles and custom designer poles created for urban beautification, public parks, resorts, and civic plazas.",
    icon: <Building className="h-6 w-6 text-ssil-red mb-2.5 transition-transform group-hover:scale-105 duration-300" />,
  },
  {
    tag: "04 / 06",
    title: "Octagonal & High Mast Poles",
    description: "Heavy-duty octagonal poles, high mast poles, and flag mast poles designed for highways, stadiums, airports, and industrial complexes.",
    icon: <Layers className="h-6 w-6 text-ssil-red mb-2.5 transition-transform group-hover:scale-105 duration-300" />,
  },
  {
    tag: "05 / 06",
    title: "Indian Flag Poles",
    description: "High-tensile monumental flag mast poles and custom structural flag installations designed for civic landmarks and government infrastructure.",
    icon: <Flag className="h-6 w-6 text-ssil-red mb-2.5 transition-transform group-hover:scale-105 duration-300" />,
  },
  {
    tag: "06 / 06",
    title: "Decorative LED Lighting",
    description: "Architectural decorative LED solutions blending aesthetic elegance with industrial durability for modern urban lifestyles.",
    icon: <Sparkles className="h-6 w-6 text-ssil-red mb-2.5 transition-transform group-hover:scale-105 duration-300" />,
  },
];

// Repeatable Viewport Entrance Animation Variants
const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.21, 0.47, 0.32, 0.98],
      staggerChildren: 0.06,
    },
  },
};

const childVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
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
      {/* 1. TOP COMPONENT WITH RED BACKGROUND PATHS ANIMATION (UNTOUCHED) */}
      {/* ============================================================ */}
      <BackgroundPaths className="bg-white dark:bg-black w-full">
        <HeroSection />
      </BackgroundPaths>

      {/* ============================================================ */}
      {/* 2. MAIN ABOUT US DESCRIPTION (COMPACT & VIEWPORT OPTIMIZED) */}
      {/* ============================================================ */}
      <motion.section
        className="py-10 md:py-14 bg-white dark:bg-black text-slate-900 dark:text-white border-b border-slate-200/80 dark:border-zinc-900 transition-colors relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl text-left relative z-10">
          
          {/* Main Title: About Us in SSIL Red Color */}
          <motion.h2
            variants={childVariants}
            className="text-2xl sm:text-4xl lg:text-5xl font-black text-ssil-red tracking-tight mb-4"
          >
            About Us
          </motion.h2>

          {/* Corporate Description Paragraph */}
          <motion.div
            variants={childVariants}
            className="w-full text-slate-700 dark:text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed font-normal"
          >
            <p className="max-w-5xl">
              Shiv Shakti India Limited (SSIL) is one of the most equipped and major manufacturers of lighting solution providers in the global market. We are an experienced organization in the field of complete lighting solutions, enclosing all your requirements in a single basket. We are engaged in the export and supply of a wide range of commercial and household products, enclosing outdoor, indoor, solar, decorative LED lights, and solar plants. Engineered for long-lasting durability, SSIL&apos;s infrastructure luminaires, decorative poles, octagonal poles, and high mast installations serve municipal expressways, real estate developments, and public landmarks across India.
            </p>
          </motion.div>

        </div>
      </motion.section>

      {/* ============================================================ */}
      {/* 3. OUR SOLUTIONS / WHAT WE OFFER (COMPACT EDITORIAL ROWS) */}
      {/* ============================================================ */}
      <motion.section
        className="py-10 md:py-14 bg-slate-50 dark:bg-black text-slate-900 dark:text-white border-b border-slate-200/80 dark:border-zinc-900 transition-colors relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          
          {/* Section Header: Editorial Eyebrow + 2-Line High Impact Title */}
          <motion.div variants={childVariants} className="max-w-4xl mb-8 sm:mb-12">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-slate-900 dark:text-slate-200 block mb-2">
              WHAT WE OFFER
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
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
                
                <div
                  tabIndex={0}
                  className="group relative py-4 sm:py-5 px-3 sm:px-5 transition-all duration-300 ease-out flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-6 cursor-pointer overflow-hidden focus-visible:outline-none"
                >
                  {/* Left-to-Right Animated Red Background Fill Layer */}
                  <div className="absolute inset-0 bg-ssil-red origin-left scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-500 ease-out z-0 pointer-events-none" />

                  {/* Left Side: Editorial Index Number & Solution Title */}
                  <div className="relative z-10 flex items-center gap-4 sm:gap-6 lg:gap-8 shrink-0 md:w-5/12 lg:w-5/12">
                    <span className="text-base sm:text-xl font-bold text-slate-400 dark:text-slate-500 group-hover:text-white group-focus-visible:text-white transition-colors duration-300 w-6 sm:w-10 shrink-0">
                      {item.num}
                    </span>
                    <h3 className="text-base sm:text-xl md:text-2xl font-black text-slate-900 dark:text-white group-hover:text-white group-focus-visible:text-white transition-colors duration-300 tracking-tight">
                      {item.title}
                    </h3>
                  </div>

                  {/* Center / Right: Description */}
                  <p className="relative z-10 text-xs sm:text-sm md:text-sm text-slate-600 dark:text-slate-300 group-hover:text-white group-focus-visible:text-white transition-colors duration-300 font-normal leading-relaxed md:w-5/12 lg:w-5/12">
                    {item.description}
                  </p>

                  {/* Far Right: Lucide Icon Asset */}
                  <div className={`relative z-10 shrink-0 flex items-center justify-start md:justify-end md:w-2/12 text-slate-400 dark:text-slate-500 group-hover:text-white group-focus-visible:text-white transition-colors duration-300 ${item.offsetClass}`}>
                    {item.icon}
                  </div>
                </div>
              </React.Fragment>
            ))}

            {/* Bottom Straight Line (Not Touching Screen Edges) */}
            <div className="w-full h-[1px] bg-slate-200/90 dark:bg-slate-800/90" />
          </motion.div>

        </div>
      </motion.section>

      {/* ============================================================ */}
      {/* 4. WHY SSIL / THE SSIL DIFFERENCE (COMPACT COMPARISON TABLE) */}
      {/* ============================================================ */}
      <motion.section
        className="py-10 md:py-14 bg-black text-white border-b border-zinc-900 transition-colors relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          
          {/* Section Header: Eyebrow + 2-Line Title + Right Badge */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-12 gap-4">
            <motion.div variants={childVariants} className="max-w-4xl">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-slate-300 block mb-2">
                WHY SSIL
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1]">
                The difference,<br />
                <span className="text-ssil-red">built for what&apos;s next.</span>
              </h2>
            </motion.div>

            <motion.div variants={childVariants} className="shrink-0 self-start lg:self-end">
              <span className="text-xs sm:text-sm font-extrabold tracking-widest uppercase text-slate-300 border border-zinc-800 px-3.5 py-1.5 rounded-full bg-zinc-900/90 shadow-sm">
                SSIL VS. CONVENTIONAL LIGHTING
              </span>
            </motion.div>
          </div>

          {/* Comparison Table Container */}
          <motion.div
            variants={childVariants}
            className="w-full max-w-6xl mx-auto rounded-2xl sm:rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl backdrop-blur-md overflow-hidden"
          >
            {/* Table Header Row (Desktop & Tablet) */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3.5 bg-zinc-900 border-b border-zinc-800 text-xs font-black uppercase tracking-wider">
              <div className="col-span-4 text-slate-400">
                Feature
              </div>
              <div className="col-span-4 text-white flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-ssil-red inline-block" />
                <span className="text-ssil-red font-black">SSIL Infrastructure</span>
              </div>
              <div className="col-span-4 text-slate-400">
                Conventional Supplier
              </div>
            </div>

            {/* Rows Container */}
            <div className="divide-y divide-zinc-800/90">
              {whySsilData.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="p-3.5 sm:p-5 transition-colors duration-300 hover:bg-zinc-900/70"
                >
                  {/* Desktop Grid Layout */}
                  <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-4 font-black text-xs sm:text-sm text-white tracking-tight">
                      {item.category}
                    </div>
                    <div className="col-span-4 flex items-start gap-2.5 text-xs sm:text-sm text-slate-100 font-medium leading-relaxed bg-ssil-red/15 p-2.5 sm:p-3 rounded-xl border border-ssil-red/30">
                      <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-ssil-red shrink-0 mt-0.5" />
                      <span>{item.ssil}</span>
                    </div>
                    <div className="col-span-4 flex items-start gap-2.5 text-xs sm:text-sm text-slate-400 font-normal leading-relaxed p-2.5 sm:p-3">
                      <X className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-500 shrink-0 mt-0.5" />
                      <span>{item.conventional}</span>
                    </div>
                  </div>

                  {/* Mobile Stacked Card Layout */}
                  <div className="flex md:hidden flex-col gap-2.5">
                    <span className="font-black text-xs sm:text-sm text-white tracking-tight">
                      {item.category}
                    </span>
                    
                    <div className="flex items-start gap-2 text-xs text-slate-100 font-medium leading-relaxed bg-ssil-red/15 p-2.5 rounded-xl border border-ssil-red/30">
                      <Check className="h-3.5 w-3.5 text-ssil-red shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-black uppercase text-ssil-red block mb-0.5">SSIL:</span>
                        {item.ssil}
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-xs text-slate-400 font-normal leading-relaxed p-2.5 bg-zinc-900/60 rounded-xl border border-zinc-800">
                      <X className="h-3.5 w-3.5 text-slate-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-0.5">Conventional:</span>
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
      {/* 5. HOW WE DELIVER / OUR PROCESS (COMPACT PROCESS ROWS) */}
      {/* ============================================================ */}
      <motion.section
        className="py-10 md:py-14 bg-slate-50 dark:bg-black text-slate-900 dark:text-white border-b border-slate-200/80 dark:border-zinc-900 transition-colors relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          
          {/* Section Header: Eyebrow + 2-Line High-Impact Title + Right Badge */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-12 gap-4">
            <motion.div variants={childVariants} className="max-w-4xl">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-slate-900 dark:text-slate-200 block mb-2">
                HOW WE DELIVER
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
                From requirement<br />
                <span className="text-ssil-red">to reality.</span>
              </h2>
            </motion.div>

            <motion.div variants={childVariants} className="shrink-0 self-start lg:self-end">
              <span className="text-xs sm:text-sm font-extrabold tracking-widest uppercase text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-zinc-800 px-3.5 py-1.5 rounded-full bg-slate-100/80 dark:bg-zinc-900/80 shadow-sm">
                END-TO-END LIGHTING INFRASTRUCTURE
              </span>
            </motion.div>
          </div>

          {/* Process Rows Container with Inset Dividers */}
          <motion.div
            variants={childVariants}
            className="w-full max-w-6xl mx-auto"
          >
            {/* Top Divider */}
            <div className="w-full h-[1px] bg-slate-200/90 dark:bg-slate-800/90" />

            {processData.map((item, index) => (
              <React.Fragment key={item.num}>
                {index > 0 && (
                  <div className="w-full h-[1px] bg-slate-200/90 dark:bg-slate-800/90" />
                )}

                <motion.div
                  whileHover={{ x: -8 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="group relative py-6 sm:py-8 px-3 sm:px-5 transition-colors duration-300 ease-out flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 hover:bg-slate-100/70 dark:hover:bg-slate-900/60 cursor-pointer"
                >
                  {/* Process Index Number (Left Column) */}
                  <span className="text-4xl sm:text-6xl lg:text-7xl font-extralight text-ssil-red leading-none min-w-[70px] sm:min-w-[100px] select-none group-hover:brightness-110 transition-all duration-300">
                    {item.num}
                  </span>

                  {/* Process Title (Center Column) */}
                  <h3 className="text-base sm:text-xl md:text-2xl font-black text-slate-900 dark:text-white group-hover:text-ssil-red transition-colors duration-300 tracking-tight md:w-5/12 lg:w-4/12">
                    {item.title}
                  </h3>

                  {/* Description (Right Column) */}
                  <p className="text-xs sm:text-sm md:text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed md:w-5/12 lg:w-5/12">
                    {item.description}
                  </p>
                </motion.div>
              </React.Fragment>
            ))}

            {/* Bottom Divider */}
            <div className="w-full h-[1px] bg-slate-200/90 dark:bg-slate-800/90" />
          </motion.div>

        </div>
      </motion.section>

      {/* ============================================================ */}
      {/* 6. OUR EXPERTISE (COMPACT 3X2 CARDS GRID & HOVER ACCENT) */}
      {/* ============================================================ */}
      <motion.section
        className="py-10 md:py-14 bg-black text-white border-b border-zinc-900 transition-colors relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          
          {/* Left-Aligned Editorial Section Header */}
          <motion.div variants={childVariants} className="max-w-4xl mb-8 sm:mb-10">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-slate-300 block mb-2">
              OUR EXPERTISE
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.12]">
              Engineered for infrastructure,<br />
              <span className="text-ssil-red">built for what comes next.</span>
            </h2>
          </motion.div>

          {/* 3 Columns x 2 Rows Compact Cards Grid */}
          <motion.div variants={childVariants} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {expertiseData.map((card) => (
              <div
                key={card.tag}
                className="group relative p-4.5 sm:p-5 rounded-2xl bg-[#121214] border border-zinc-800/80 transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between shadow-none"
              >
                {/* Top Section: Index Tag, Icon, and Title */}
                <div>
                  <span className="text-xs font-mono text-zinc-500 font-semibold tracking-wider block mb-3 select-none">
                    {card.tag}
                  </span>

                  {card.icon}

                  <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 group-hover:text-ssil-red transition-colors duration-300 tracking-tight">
                    {card.title}
                  </h3>
                </div>

                {/* Bottom Section: Description */}
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal mt-1.5">
                  {card.description}
                </p>

                {/* Bottom Accent Line (Animates Left to Right on Hover) */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-ssil-red origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </div>
            ))}
          </motion.div>

        </div>
      </motion.section>

      {/* ============================================================ */}
      {/* 7. COMPANY REGISTRATION & BACKGROUND (BOTTOM CENTERED) */}
      {/* ============================================================ */}
      <section className="py-8 sm:py-10 bg-slate-100 dark:bg-zinc-950 border-t border-slate-200/80 dark:border-zinc-900 transition-colors">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-zinc-500 block mb-1.5">
            COMPANY REGISTRATION &amp; BACKGROUND
          </span>
          <p className="text-xs sm:text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            Established in the year 2015 in Haryana, India, Shiv Shakti India (SSIL) is a proprietorship-based firm engaged as a foremost manufacturer and provider of ornamental heritage lighting poles, galvanized iron LED street lights, decorative poles, brackets, and infrastructure luminaires.
          </p>
        </div>
      </section>

    </div>
  );
}
