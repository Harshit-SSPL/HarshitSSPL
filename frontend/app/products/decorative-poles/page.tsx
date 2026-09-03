"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ChevronRight,
  FileText,
  CheckCircle2,
  Sparkles,
  Shield,
  Layers,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/product-card";
import { EnquiryModal } from "@/components/ui/enquiry-modal";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
};

interface PoleSpecRow {
  parameter: string;
  specification: string;
}

const decorativePoleSpecs: PoleSpecRow[] = [
  { parameter: "Pole Structure", specification: "Tubular / Stepped / Octagonal Steel Shaft with Ornamental Base" },
  { parameter: "Base Construction", specification: "Heavy-Duty Cast Iron / Cast Aluminium Decorative Base Casing" },
  { parameter: "Mounting Height Range", specification: "3.0 Metres to 12.0 Metres (Custom Heights on Request)" },
  { parameter: "Luminaire Compatibility", specification: "Single / Multi-Arm Architectural Post-Top & Suspended Lanterns" },
  { parameter: "Shaft Material", specification: "High-Tensile Structural Steel (IS 2062 / BSEN 10025 S355)" },
  { parameter: "Corrosion Protection", specification: "Hot-Dip Galvanized In-House (IS 4759 / ISO 1461 Compliance)" },
  { parameter: "Surface Finish Coating", specification: "Architectural Grade PU / Thermoset Polyester Powder Coating" },
  { parameter: "Ingress Protection", specification: "IP66 Rated Optical Engine & Weatherproof Control Gear" },
  { parameter: "Wind Speed Resilience", specification: "Heavy-Duty Structural Design for Robust Wind Resistance" },
  { parameter: "Foundation Assembly", specification: "Flanged Base Plate with High-Tensile J-Anchor Bolts & Template" },
  { parameter: "Electrical Safety", specification: "Class I Insulation with In-Built Surge Protection Devices (SPD)" },
  { parameter: "Project Applications", specification: "Urban Plazas, Heritage Corridors, Public Parks & Gated Estates" },
];

// Generate exactly 41 products named SSILDP01 to SSILDP41
const decorativeProducts = Array.from({ length: 41 }, (_, i) => {
  const index = (i % 6) + 1;
  const itemNum = String(i + 1).padStart(2, "0");
  return {
    id: `ssildp-${itemNum}`,
    name: `SSILDP${itemNum}`,
    dayImage: `/images/products/homepage/product-0${index}/day.png`,
    nightImage: `/images/products/homepage/product-0${index}/night.png`,
    specs: "IP66 Weatherproof • Custom Engineering • ISO Standards",
  };
});

export default function LEDDecorativePolesPage() {
  const [enquiryState, setEnquiryState] = useState<{
    isOpen: boolean;
    productCategory: string;
    productModel: string;
  }>({
    isOpen: false,
    productCategory: "LED Decorative Poles",
    productModel: "SSILDP01",
  });

  const openEnquiry = (modelName?: string) => {
    setEnquiryState({
      isOpen: true,
      productCategory: "LED Decorative Poles",
      productModel: modelName || "LED Decorative Pole Custom Specification",
    });
  };

  const closeEnquiry = () => {
    setEnquiryState((prev) => ({ ...prev, isOpen: false }));
  };

  const keyFeatures = [
    {
      title: "Ornamental Castings & Heritage Motifs",
      desc: "Cast iron and die-cast aluminium base castings crafted with classical fluting, decorative collars, and ornate finials for premium urban aesthetics.",
      icon: Sparkles,
    },
    {
      title: "Hot-Dip Galvanized & Powder Coated",
      desc: "Dual-layer surface barrier protection combining in-house 80+ micron hot-dip galvanizing with UV-resistant thermoset architectural powder coating.",
      icon: Shield,
    },
    {
      title: "Versatile Multi-Arm Configurations",
      desc: "Modular structural bracket designs accommodating single, double, triple, and four-way decorative lantern arms tailored for specific lux distributions.",
      icon: Layers,
    },
    {
      title: "High-Efficiency LED Optical Engines",
      desc: "Equipped with precision secondary lenses, IP66-sealed optical chambers, and high lumen-per-watt efficiency for balanced glare-free illuminance.",
      icon: Award,
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-white dark:bg-black text-slate-900 dark:text-white transition-colors duration-300 overflow-hidden">
      
      {/* ============================================================ */}
      {/* 1. PRODUCT HERO BANNER */}
      {/* ============================================================ */}
      <section className="relative z-10 w-full h-[54vh] sm:h-[62vh] max-h-[540px] flex items-end overflow-hidden rounded-none pt-24 pb-10 sm:pb-12">
        {/* Full-bleed Background Image */}
        <Image
          src="/products/products-hero.png"
          alt="LED Decorative Poles SSIL Hero"
          fill
          priority
          className="object-cover object-center rounded-none"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-slate-950/20 rounded-none pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 text-left flex flex-col items-start">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-3">
            <Link href="/products" className="hover:text-ssil-red transition-colors flex items-center gap-1">
              <ArrowLeft className="h-3.5 w-3.5" /> Products
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-ssil-red" />
            <span className="text-ssil-red">LED Decorative Poles</span>
          </div>

          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-ssil-red block mb-1">
            SSIL ARCHITECTURAL &amp; URBAN LIGHTING
          </span>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight max-w-4xl drop-shadow-md">
            LED Decorative Poles
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-slate-200 font-medium max-w-2xl leading-relaxed drop-shadow-xs">
            Lighting infrastructure designed to elevate civic and urban public spaces.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. PRODUCT OVERVIEW STRIP */}
      {/* ============================================================ */}
      <section className="relative z-10 py-14 sm:py-16 bg-slate-50 dark:bg-zinc-950 border-b border-slate-200/80 dark:border-zinc-800/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            {/* Description Narrative */}
            <div className="max-w-3xl">
              <h2 className="text-xs sm:text-[13px] font-black uppercase tracking-widest text-ssil-red mb-3">
                ENGINEERING &amp; APPLICATION OVERVIEW
              </h2>
              <p className="text-[15px] sm:text-[17px] text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                Aesthetically crafted decorative lighting poles designed for urban beautification, public parks, commercial plazas, and resort walkways, blending structural strength with architectural elegance.
              </p>
            </div>

            {/* Quick Specs Badges */}
            <div className="grid grid-cols-2 gap-3.5 shrink-0 lg:max-w-md w-full">
              <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-none bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-xs">
                <CheckCircle2 className="h-4.5 w-4.5 text-ssil-red shrink-0" />
                <span className="text-[13px] sm:text-[14px] font-bold text-slate-800 dark:text-slate-200">ISO 9001:2015 Quality</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-none bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-xs">
                <CheckCircle2 className="h-4.5 w-4.5 text-ssil-red shrink-0" />
                <span className="text-[13px] sm:text-[14px] font-bold text-slate-800 dark:text-slate-200">IP66 Weather Protection</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-none bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-xs">
                <CheckCircle2 className="h-4.5 w-4.5 text-ssil-red shrink-0" />
                <span className="text-[13px] sm:text-[14px] font-bold text-slate-800 dark:text-slate-200">Custom Engineering</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-none bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-xs">
                <CheckCircle2 className="h-4.5 w-4.5 text-ssil-red shrink-0" />
                <span className="text-[13px] sm:text-[14px] font-bold text-slate-800 dark:text-slate-200">Hot-Dip Galvanized</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. COMPACT HERO SECTION */}
      {/* ============================================================ */}
      <motion.section
        className="relative py-14 sm:py-16 lg:py-20 border-b border-slate-200 dark:border-zinc-900"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <motion.div variants={childVariants} className="lg:col-span-6 space-y-5 text-left flex flex-col justify-center">
              
              <div className="space-y-3.5">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-[1.05]">
                  LED DECORATIVE <br />
                  <span className="text-ssil-red">LIGHTING POLES.</span>
                </h1>

                {/* 3 Product-Value Bullet Points */}
                <div className="space-y-3 pt-1 text-left">
                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0 mt-2" />
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                      Custom-cast decorative base enclosures engineered from high-grade cast aluminium and ductile iron, providing robust structural anchoring and heritage appeal.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0 mt-2" />
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                      In-house precision hot-dip galvanization finished with high-durability polyurethane powder coating for comprehensive corrosion resistance across varied outdoor climates.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0 mt-2" />
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                      Integrated high-efficiency LED luminaires with custom secondary optics, delivering uniform glare-free pedestrian and landscape illumination.
                    </p>
                  </div>
                </div>
              </div>

            </motion.div>

            {/* Right Hero Image Column (Day/Night Hover Crossfade) */}
            <motion.div variants={childVariants} className="lg:col-span-6">
              <div className="group relative rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-zinc-800 overflow-hidden shadow-lg bg-slate-100 dark:bg-zinc-900 cursor-pointer w-full max-w-[560px] mx-auto lg:max-w-none">
                <div className="relative aspect-[12/9] w-full overflow-hidden">
                  {/* Day Image (Default) */}
                  <img
                    src="/images/products/homepage/product-02/day.png"
                    alt="SSIL LED Decorative Pole Daytime"
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="eager"
                  />
                  {/* Night Image (Hover Transition) */}
                  <img
                    src="/images/products/homepage/product-02/night.png"
                    alt="SSIL LED Decorative Pole Night Illumination"
                    className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out group-hover:scale-105 pointer-events-none"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />
                  
                  {/* Glass Caption Pill */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between p-3 sm:p-3.5 rounded-xl bg-white/80 dark:bg-black/60 backdrop-blur-md border border-white/30 dark:border-white/10 shadow-lg text-slate-900 dark:text-white transition-all">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-ssil-red block">
                        LED DECORATIVE POLE
                      </span>
                      <span className="text-xs sm:text-sm font-black">
                        Heritage &amp; Urban Beautification
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 bg-slate-100/90 dark:bg-white/10 px-2.5 py-1 rounded-md border border-slate-200/80 dark:border-white/10">
                      IP66 HDG
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </motion.section>

      {/* ============================================================ */}
      {/* 4. TECHNICAL DRAWING & SPECIFICATION TABLE */}
      {/* ============================================================ */}
      <motion.section
        id="technical-specifications"
        className="py-14 sm:py-16 lg:py-20 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white border-b border-slate-200 dark:border-zinc-800 transition-colors"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          
          {/* Section Header */}
          <div className="mb-8 pb-4 border-b border-slate-200/90 dark:border-zinc-800/90 text-left">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-slate-900 dark:text-slate-200 block mb-1">
              ENGINEERING BLUEPRINT &amp; ARCHITECTURE
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-[1.1]">
              DRAWING OF LED <br />
              <span className="text-ssil-red">DECORATIVE POLE.</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl">
              Structural drawing detailing ornamental cast base enclosure, fluted steel shaft, ornamental bracket arms, luminaire lanterns, and foundation anchor assembly.
            </p>
          </div>

          {/* Technical Drawing Blueprint Representation */}
          <motion.div
            variants={childVariants}
            className="w-full rounded-2xl sm:rounded-3xl border border-slate-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-7 md:p-8 shadow-lg overflow-hidden relative"
          >
            {/* Blueprint Grid Lines Background Accent */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
              
              {/* Preserved Visual Engineering Schematic Drawing for Decorative Pole */}
              <div className="lg:col-span-6 flex items-center justify-center p-5 bg-slate-100/80 dark:bg-black/60 rounded-2xl border border-slate-200 dark:border-zinc-800 h-full min-h-[520px]">
                <svg
                  viewBox="0 0 340 560"
                  className="w-full max-w-[300px] sm:max-w-[340px] h-auto drop-shadow-md text-slate-800 dark:text-slate-200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Decorative Finial Top Cap */}
                  <path d="M170 20 L166 32 L174 32 Z" fill="#ef4444" stroke="#ef4444" strokeWidth="1.5" />
                  <circle cx="170" cy="18" r="3" fill="#ef4444" />
                  <text x="185" y="24" fontSize="8" fontWeight="bold" fill="#ef4444">Ornamental Finial</text>

                  {/* Dual Architectural Bracket Arms */}
                  {/* Left Arm Curve */}
                  <path d="M170 45 C140 45 105 55 95 85" stroke="#ef4444" strokeWidth="2.5" fill="none" />
                  <path d="M170 55 C145 55 115 65 108 90" stroke="#ef4444" strokeWidth="1.5" fill="none" />
                  {/* Left Luminaire Lantern */}
                  <rect x="80" y="85" width="30" height="25" rx="3" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="2" />
                  <polygon points="75,85 115,85 110,75 80,75" fill="#ef4444" />
                  <circle cx="95" cy="98" r="4" fill="#f59e0b" />

                  {/* Right Arm Curve */}
                  <path d="M170 45 C200 45 235 55 245 85" stroke="#ef4444" strokeWidth="2.5" fill="none" />
                  <path d="M170 55 C195 55 225 65 232 90" stroke="#ef4444" strokeWidth="1.5" fill="none" />
                  {/* Right Luminaire Lantern */}
                  <rect x="230" y="85" width="30" height="25" rx="3" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="2" />
                  <polygon points="225,85 265,85 260,75 230,75" fill="#ef4444" />
                  <circle cx="245" cy="98" r="4" fill="#f59e0b" />

                  <text x="245" y="65" fontSize="8" fontWeight="bold" fill="#ef4444">IP66 LED Lantern</text>

                  {/* Center Post-Top Hub */}
                  <rect x="162" y="32" width="16" height="25" rx="2" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2" />

                  {/* Decorative Ring Collar 1 */}
                  <ellipse cx="170" cy="115" rx="14" ry="4" fill="#3b82f6" stroke="#3b82f6" strokeWidth="1.5" />
                  <text x="195" y="118" fontSize="8" fontWeight="bold" fill="#3b82f6">Decorative Collar</text>

                  {/* Fluted / Tapered Upper Shaft */}
                  <polygon
                    points="164,115 176,115 180,240 160,240"
                    fill="currentColor"
                    fillOpacity="0.08"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  />
                  {/* Fluting Vertical Lines */}
                  <line x1="168" y1="115" x2="166" y2="240" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
                  <line x1="172" y1="115" x2="174" y2="240" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />

                  {/* Mid Transition Ring Collar 2 */}
                  <rect x="156" y="240" width="28" height="8" rx="2" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.5" />

                  {/* Lower Steel Shaft Section */}
                  <polygon
                    points="160,248 180,248 186,370 154,370"
                    fill="currentColor"
                    fillOpacity="0.08"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  />
                  <line x1="166" y1="248" x2="162" y2="370" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
                  <line x1="174" y1="248" x2="178" y2="370" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />

                  {/* Heavy-Duty Cast Decorative Base Enclosure */}
                  <path
                    d="M154 370 C140 380 130 400 130 430 L130 470 L210 470 L210 430 C210 400 200 380 186 370 Z"
                    fill="currentColor"
                    fillOpacity="0.18"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  />
                  {/* Decorative Base Ornamental Molding Lines */}
                  <ellipse cx="170" cy="385" rx="24" ry="4" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1" />
                  <ellipse cx="170" cy="460" rx="36" ry="5" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1" />

                  {/* Inspection & Terminal Door */}
                  <rect
                    x="152"
                    y="405"
                    width="36"
                    height="50"
                    rx="4"
                    fill="#ef4444"
                    fillOpacity="0.15"
                    stroke="#ef4444"
                    strokeWidth="1.5"
                  />
                  <circle cx="170" cy="430" r="2.5" fill="#ef4444" />
                  <text x="195" y="433" fontSize="8" fontWeight="bold" fill="#ef4444">Lockable Inspection Door</text>

                  {/* Cast Base Annotation */}
                  <text x="45" y="420" fontSize="8" fontWeight="bold" fill="#3b82f6">Cast Aluminium /</text>
                  <text x="45" y="430" fontSize="8" fontWeight="bold" fill="#3b82f6">Ductile Base</text>

                  {/* Heavy-Duty Flanged Base Plate */}
                  <rect x="120" y="470" width="100" height="16" rx="2" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2" />

                  {/* J-Anchor Bolts Foundation */}
                  <path d="M135 486 L135 535 L125 535" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M205 486 L205 535 L215 535" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M150 486 L150 535 L142 535" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M190 486 L190 535 L198 535" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                  {/* Ground Level Civil Concrete Boundary */}
                  <line x1="45" y1="495" x2="295" y2="495" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
                  <text x="10" y="500" fontSize="8" fontWeight="bold" fill="currentColor">G.L. Ground Level</text>
                  <text x="225" y="530" fontSize="8" fontWeight="bold" fill="#10b981">4–8x Foundation Bolts</text>
                </svg>
              </div>

              {/* Right Side: Technical Specification Table */}
              <div className="lg:col-span-6 flex flex-col justify-center text-left">
                <div className="mb-2.5">
                  <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-ssil-red block mb-0.5">
                    LED DECORATIVE POLE
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                    TECHNICAL SPECIFICATION
                  </h3>
                </div>

                <div className="w-full rounded-xl border border-slate-200 dark:border-zinc-800 overflow-hidden shadow-sm bg-white dark:bg-zinc-950">
                  <div className="overflow-x-auto w-full">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-950 text-white font-black uppercase text-[11px] tracking-wider border-b border-slate-800">
                          <th className="py-3 px-3.5 border-r border-slate-800 w-[42%]">SYSTEM PARAMETER</th>
                          <th className="py-3 px-3.5">TECHNICAL SPECIFICATION</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/80 font-medium">
                        {decorativePoleSpecs.map((row, idx) => (
                          <tr
                            key={idx}
                            className={idx % 2 === 0 ? "bg-slate-50/60 dark:bg-zinc-900/40 hover:bg-slate-100/80 dark:hover:bg-zinc-900" : "bg-white dark:bg-zinc-950 hover:bg-slate-100/80 dark:hover:bg-zinc-900"}
                          >
                            <td className="py-2.5 px-3.5 font-bold text-slate-900 dark:text-white border-r border-slate-200/80 dark:border-zinc-800/80">
                              {row.parameter}
                            </td>
                            <td className="py-2.5 px-3.5 text-slate-700 dark:text-slate-300">
                              {row.specification}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>

        </div>
      </motion.section>

      {/* ============================================================ */}
      {/* 5. AVAILABLE DESIGNS GRID (41 MODELS: SSILDP01 - SSILDP41) */}
      {/* ============================================================ */}
      <section className="relative z-10 py-14 sm:py-20 bg-white dark:bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          {/* Gallery Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-slate-200 dark:border-zinc-800 gap-4 text-left">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 block mb-1">
                PRODUCT CATALOGUE &amp; DESIGNS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
                Available Designs ({decorativeProducts.length})
              </h2>
            </div>
            
            <span className="text-xs font-bold text-ssil-red uppercase tracking-wider bg-ssil-red/10 border border-ssil-red/20 px-3 py-1.5 rounded-none self-start sm:self-auto">
              {decorativeProducts.length} Available Models
            </span>
          </div>

          {/* 4 Images per Row Desktop Grid */}
          <motion.div
            className="w-full flex flex-wrap justify-center gap-2.5 sm:gap-3 lg:gap-3.5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={containerVariants}
          >
            {decorativeProducts.map((item) => (
              <div
                key={item.id}
                className="w-full sm:w-[calc((100%-0.75rem)/2)] lg:w-[calc((100%-2.625rem)/4)] flex"
              >
                <ProductCard
                  name={item.name}
                  dayImage={item.dayImage}
                  buttonText="Enquire Now"
                  showArrow={true}
                  enableImageCrossfade={false}
                  onEnquire={openEnquiry}
                />
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. KEY FEATURES & CRAFTSMANSHIP */}
      {/* ============================================================ */}
      <section className="relative z-10 py-16 bg-slate-50 dark:bg-zinc-950 border-t border-b border-slate-200 dark:border-zinc-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-ssil-red block mb-2">
              ENGINEERING CRAFTSMANSHIP
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
              Decorative Pole Design Capabilities
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyFeatures.map((feat, index) => {
              const FeatIcon = feat.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-left hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="h-10 w-10 rounded-lg bg-ssil-red/10 text-ssil-red flex items-center justify-center mb-4">
                      <FeatIcon className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. CALL TO ACTION SECTION (SPEAK WITH LIGHTING ENGINEER REMOVED) */}
      {/* ============================================================ */}
      <section className="relative z-10 py-16 bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
          <span className="text-xs font-black uppercase tracking-widest text-ssil-red block mb-3">
            NEED A CUSTOM SPECIFICATION?
          </span>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight uppercase mb-4 text-white">
            Looking for Custom LED Decorative Pole Engineering?
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-8 font-medium leading-relaxed">
            Our engineering team designs custom structural calculations, photometric layouts, and tender-compliant manufacturing drawings tailored for your project requirements.
          </p>

          <div className="flex items-center justify-center">
            <Button
              onClick={() => openEnquiry("Custom LED Decorative Pole Tender Specs")}
              size="lg"
              className="bg-ssil-red hover:bg-red-700 text-white font-bold px-8 py-3 rounded-full text-xs sm:text-sm shadow-xl shadow-ssil-red/25 hover:scale-105 transition-all"
            >
              <FileText className="mr-2 h-4 w-4" />
              Request Technical Tender Specs
            </Button>
          </div>
        </div>
      </section>

      {/* Inquiry Modal */}
      <EnquiryModal
        isOpen={enquiryState.isOpen}
        onClose={closeEnquiry}
        productCategory={enquiryState.productCategory}
        productModel={enquiryState.productModel}
      />

    </div>
  );
}
