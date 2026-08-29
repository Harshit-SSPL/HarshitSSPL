"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ChevronRight,
  FileText,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnquiryModal } from "@/components/ui/enquiry-modal";

interface PoleSpec {
  poleType: string;
  height: number;
  topDia: number;
  bottomDia: number;
  sheetThk: number;
  basePlate: string;
  foundationBolt: string;
}

const poleSpecifications: PoleSpec[] = [
  {
    poleType: "SSILOP01",
    height: 3,
    topDia: 70,
    bottomDia: 130,
    sheetThk: 3,
    basePlate: "200x200x12",
    foundationBolt: "4x16x450",
  },
  {
    poleType: "SSILOP02",
    height: 4,
    topDia: 70,
    bottomDia: 130,
    sheetThk: 3,
    basePlate: "200x200x12",
    foundationBolt: "4x16x450",
  },
  {
    poleType: "SSILOP03",
    height: 5,
    topDia: 70,
    bottomDia: 130,
    sheetThk: 3,
    basePlate: "200x200x12",
    foundationBolt: "4x16x450",
  },
  {
    poleType: "SSILOP04",
    height: 6,
    topDia: 70,
    bottomDia: 130,
    sheetThk: 3,
    basePlate: "200x200x12",
    foundationBolt: "4x16x600",
  },
  {
    poleType: "SSILOP05",
    height: 7,
    topDia: 70,
    bottomDia: 130,
    sheetThk: 3,
    basePlate: "220x220x12",
    foundationBolt: "4x20x600",
  },
  {
    poleType: "SSILOP06",
    height: 8,
    topDia: 70,
    bottomDia: 135,
    sheetThk: 3,
    basePlate: "225x225x12",
    foundationBolt: "4x20x700",
  },
  {
    poleType: "SSILOP07",
    height: 9,
    topDia: 70,
    bottomDia: 155,
    sheetThk: 3,
    basePlate: "250x250x12",
    foundationBolt: "4x20x700",
  },
  {
    poleType: "SSILOP08",
    height: 10,
    topDia: 70,
    bottomDia: 155,
    sheetThk: 3,
    basePlate: "250x250x16",
    foundationBolt: "4x24x750",
  },
  {
    poleType: "SSILOP09",
    height: 11,
    topDia: 70,
    bottomDia: 175,
    sheetThk: 3,
    basePlate: "275x275x16",
    foundationBolt: "4x24x750",
  },
  {
    poleType: "SSILOP10",
    height: 12,
    topDia: 70,
    bottomDia: 175,
    sheetThk: 3,
    basePlate: "275x275x16",
    foundationBolt: "4x24x750",
  },
  {
    poleType: "SSILOP11",
    height: 13,
    topDia: 125,
    bottomDia: 270,
    sheetThk: 3,
    basePlate: "340x340x20",
    foundationBolt: "4x24x900",
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.21, 0.47, 0.32, 0.98],
      staggerChildren: 0.08,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export default function OctagonalPolesPage() {
  const [enquiryState, setEnquiryState] = useState<{
    isOpen: boolean;
    productCategory: string;
    productModel: string;
  }>({
    isOpen: false,
    productCategory: "Octagonal Poles",
    productModel: "",
  });

  const openEnquiry = (modelName?: string) => {
    setEnquiryState({
      isOpen: true,
      productCategory: "Octagonal Poles",
      productModel: modelName || "Standard Octagonal Pole (3M-13M)",
    });
  };

  return (
    <div className="relative min-h-screen w-full bg-white dark:bg-black text-slate-900 dark:text-white transition-colors duration-300 overflow-hidden">
      
      {/* ============================================================ */}
      {/* 1. BREADCRUMB NAVIGATION (TIGHT SPACING BELOW NAVBAR) */}
      {/* ============================================================ */}
      <div className="pt-20 pb-2 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-b border-slate-200/80 dark:border-zinc-800/80">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          <Link href="/products" className="hover:text-ssil-red transition-colors flex items-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Products</span>
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400 dark:text-slate-600" />
          <span className="text-slate-900 dark:text-white font-bold">Octagonal Poles</span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. COMPACT HERO SECTION (BALANCED VERTICALLY & CENTERED) */}
      {/* ============================================================ */}
      <motion.section
        className="relative py-8 sm:py-10 lg:py-12 border-b border-slate-200 dark:border-zinc-900"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column (Vertically Centered with Image) */}
            <motion.div variants={childVariants} className="lg:col-span-7 space-y-5 text-left flex flex-col justify-center">
              
              <div className="space-y-3.5">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-[1.05]">
                  GI OCTAGONAL <br />
                  <span className="text-ssil-red">POLES.</span>
                </h1>

                {/* 3 Product-Value Bullet Points */}
                <div className="space-y-2.5 pt-1 max-w-2xl text-left">
                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0 mt-2" />
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                      Precision-engineered hot-dip galvanized octagonal poles designed for high strength, structural reliability, corrosion resistance, and dependable outdoor lighting across modern expressways and municipal corridors.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0 mt-2" />
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                      Built for demanding outdoor environments, SSIL octagonal poles deliver dependable performance across highways, urban roads, public infrastructure, and large-scale development projects.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0 mt-2" />
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                      Designed for long-term reliability and ease of installation, each pole combines precision manufacturing, robust construction, and a clean architectural finish for modern infrastructure.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Button
                  onClick={() => openEnquiry()}
                  size="lg"
                  className="bg-ssil-red hover:bg-ssil-red-600 text-white font-bold px-7 py-3 rounded-full text-xs sm:text-sm shadow-lg shadow-ssil-red/25 hover:shadow-ssil-red/40 transition-all duration-300 hover:scale-105"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Request Technical Quotation
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-slate-300 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-900 font-bold px-6 py-3 rounded-full text-xs sm:text-sm transition-all"
                >
                  <Link href="#technical-data-sheet">
                    <span>View Data Sheet</span>
                  </Link>
                </Button>
              </div>

            </motion.div>

            {/* Right Hero Image Column (Top-Aligned, Full Visibility, Day/Night Crossfade on Hover) */}
            <motion.div variants={childVariants} className="lg:col-span-5">
              <div className="group relative rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-zinc-800 overflow-hidden shadow-lg bg-slate-100 dark:bg-zinc-900 cursor-pointer max-w-[420px] mx-auto lg:max-w-none">
                
                {/* Image Container with Day/Night hover transition */}
                <div className="relative aspect-[4/4.5] sm:aspect-[4/4.8] w-full overflow-hidden">
                  {/* Day Version (Default) */}
                  <img
                    src="/images/products/homepage/product-05/day.png"
                    alt="SSIL Hot-Dip Galvanized Octagonal Pole Daytime"
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Night Version (Smoothly crossfades in on hover) */}
                  <img
                    src="/images/products/homepage/product-05/night.png"
                    alt="SSIL Hot-Dip Galvanized Octagonal Pole Night Illumination"
                    className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out group-hover:scale-105 pointer-events-none"
                  />
                  
                  {/* Subtle Gradient Shadow Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

                  {/* Translucent Glass Caption Pill matching Navbar styling */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between p-3 sm:p-3.5 rounded-xl bg-white/80 dark:bg-black/60 backdrop-blur-md border border-white/30 dark:border-white/10 shadow-lg text-slate-900 dark:text-white transition-all">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-ssil-red block">
                        OCTAGONAL POLE
                      </span>
                      <span className="text-xs sm:text-sm font-black">
                        3M to 13M Height Series
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 bg-slate-100/90 dark:bg-white/10 px-2.5 py-1 rounded-md border border-slate-200/80 dark:border-white/10">
                      HDG Steel
                    </span>
                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </motion.section>

      {/* ============================================================ */}
      {/* 3. PRODUCT OVERVIEW (COMPACT & WITHOUT STATISTIC BOXES) */}
      {/* ============================================================ */}
      <motion.section
        className="py-10 sm:py-12 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border-b border-slate-200 dark:border-zinc-900 transition-colors"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
            
            {/* Header Column */}
            <motion.div variants={childVariants} className="lg:col-span-5 space-y-2 text-left">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-slate-900 dark:text-slate-200 block">
                PRODUCT OVERVIEW
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-[1.1]">
                STRUCTURAL RELIABILITY.<br />
                <span className="text-ssil-red">BUILT TO LAST.</span>
              </h2>
              <div className="w-14 h-1 bg-ssil-red rounded-full mt-2" />
            </motion.div>

            {/* Description Paragraphs Column (No Stat Cards Below) */}
            <motion.div variants={childVariants} className="lg:col-span-7 space-y-3 text-left text-slate-700 dark:text-slate-300 leading-relaxed font-normal text-sm sm:text-base">
              <p>
                We use high-quality raw materials to manufacture hot-dip galvanized octagonal poles designed for strength, stability and long service life.
              </p>
              <p>
                The poles are engineered for outdoor applications and provide excellent corrosion resistance and reliable performance across street lighting, highway illumination, industrial areas, residential townships, commercial complexes and public infrastructure projects.
              </p>
              <p>
                Manufactured with attention to structural reliability, dimensional accuracy and quality, SSIL&apos;s octagonal poles combine functional performance with a clean and professional appearance.
              </p>
            </motion.div>

          </div>

        </div>
      </motion.section>

      {/* ============================================================ */}
      {/* 4. DIMENSION SPECIFICATIONS (COMPLETE 3M–13M TABLE, NO FILTERS) */}
      {/* ============================================================ */}
      <motion.section
        id="technical-data-sheet"
        className="py-12 sm:py-14 md:py-16 bg-white dark:bg-black text-slate-900 dark:text-white border-b border-slate-200 dark:border-zinc-900 transition-colors"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          
          {/* Section Header */}
          <div className="mb-6 pb-4 border-b border-slate-200/90 dark:border-zinc-800/90 text-left">
            <motion.div variants={childVariants} className="max-w-3xl">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-slate-900 dark:text-slate-200 block mb-1">
                DIMENSIONAL SPECIFICATIONS
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-[1.1]">
                TECHNICAL DATA <span className="text-ssil-red">SHEET.</span>
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl">
                SSIL offers high-quality Hot Dip Galvanized (HDG) Octagonal Poles ranging from 3 meters to 13 meters in height. Designed for strength, durability and long service life, the poles are manufactured using quality steel and production processes intended for reliable performance in outdoor environments.
              </p>
            </motion.div>
          </div>

          {/* Full Technical Specifications Table (All 11 Rows Always Visible) */}
          <motion.div
            variants={childVariants}
            className="w-full rounded-2xl border border-slate-200 dark:border-zinc-800 overflow-hidden shadow-lg bg-white dark:bg-zinc-950"
          >
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr className="bg-slate-900 text-white text-xs font-extrabold uppercase tracking-wider border-b border-slate-800">
                    <th className="py-3.5 px-4 sm:px-6">POLE TYPE</th>
                    <th className="py-3.5 px-3 sm:px-4">HEIGHT (Mtr)</th>
                    <th className="py-3.5 px-3 sm:px-4">TOP DIA (mm)</th>
                    <th className="py-3.5 px-3 sm:px-4">BOTTOM DIA (mm)</th>
                    <th className="py-3.5 px-3 sm:px-4">SHEET THICKNESS</th>
                    <th className="py-3.5 px-3 sm:px-4">BASE PLATE LxWxT</th>
                    <th className="py-3.5 px-3 sm:px-4">FOUNDATION BOLT (No.xDiaxmm)</th>
                    <th className="py-3.5 px-4 sm:px-6 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-zinc-800 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                  {poleSpecifications.map((row) => (
                    <tr
                      key={row.poleType}
                      className="group hover:bg-ssil-red/5 dark:hover:bg-zinc-900/80 transition-colors"
                    >
                      <td className="py-3 px-4 sm:px-6 font-black text-slate-900 dark:text-white group-hover:text-ssil-red transition-colors flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                        {row.poleType}
                      </td>
                      <td className="py-3 px-3 sm:px-4 font-bold text-slate-900 dark:text-white">
                        {row.height} M
                      </td>
                      <td className="py-3 px-3 sm:px-4">{row.topDia}</td>
                      <td className="py-3 px-3 sm:px-4">{row.bottomDia}</td>
                      <td className="py-3 px-3 sm:px-4">{row.sheetThk}</td>
                      <td className="py-3 px-3 sm:px-4 font-mono text-[11px] sm:text-xs">
                        {row.basePlate}
                      </td>
                      <td className="py-3 px-3 sm:px-4 font-mono text-[11px] sm:text-xs text-slate-600 dark:text-slate-400">
                        {row.foundationBolt}
                      </td>
                      <td className="py-3 px-4 sm:px-6 text-right">
                        <Button
                          size="sm"
                          onClick={() => openEnquiry(`${row.poleType} (${row.height}M Octagonal Pole)`)}
                          className="bg-slate-100 dark:bg-zinc-800 hover:bg-ssil-red hover:text-white text-slate-900 dark:text-white text-[11px] font-bold px-3.5 py-1.5 rounded-lg border border-slate-300 dark:border-zinc-700 transition-all shadow-xs"
                        >
                          Enquire Now
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer Note */}
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-900/50 border-t border-slate-200 dark:border-zinc-800 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-ssil-red shrink-0" />
                Custom bracket outreaches (Single Arm / Double Arm / Four Arm) available across all pole heights.
              </span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Material Grade: IS 2062 / IS 5986 Steel
              </span>
            </div>
          </motion.div>

        </div>
      </motion.section>

      {/* ============================================================ */}
      {/* 5. ENGINEERING BLUEPRINT / TECHNICAL DRAWING */}
      {/* ============================================================ */}
      <motion.section
        className="py-12 sm:py-14 md:py-16 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border-b border-slate-200 dark:border-zinc-900 transition-colors"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          
          <div className="max-w-4xl mb-6 sm:mb-8 text-left">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-slate-900 dark:text-slate-200 block mb-1">
              ENGINEERING DRAWING
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-[1.1]">
              DRAWING OF GI <br />
              <span className="text-ssil-red">OCTAGONAL POLE.</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl">
              Our detailed Octagonal Pole technical drawing covers poles ranging from 3M to 13M in height. Manufactured from high-quality steel and protected with Hot-Dip Galvanization (HDG), these poles are designed for corrosion resistance, durability and long service life. The drawing includes details relating to the pole structure, base plate, foundation bolts, door opening and civil foundation design.
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
              
              {/* Preserved Visual Engineering Schematic Drawing */}
              <div className="lg:col-span-6 flex items-center justify-center p-5 bg-slate-100/80 dark:bg-black/60 rounded-2xl border border-slate-200 dark:border-zinc-800">
                <svg
                  viewBox="0 0 320 540"
                  className="w-full max-w-[280px] sm:max-w-[320px] h-auto drop-shadow-md text-slate-800 dark:text-slate-200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Luminaire Outreach Bracket */}
                  <path
                    d="M160 80 Q160 30 230 30 L260 30"
                    stroke="#ef4444"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <rect x="250" y="24" width="40" height="12" rx="3" fill="#ef4444" />
                  
                  {/* Top Dia Callout Indicator */}
                  <line x1="140" y1="80" x2="180" y2="80" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3 3" />
                  <text x="75" y="84" fontSize="10" fontWeight="bold" fill="currentColor">Top Dia (70mm)</text>

                  {/* Tapered Octagonal Pole Shaft */}
                  <polygon
                    points="145,80 175,80 190,440 130,440"
                    fill="currentColor"
                    fillOpacity="0.08"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  />

                  {/* Octagonal Facet Lines */}
                  <line x1="152" y1="80" x2="145" y2="440" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" />
                  <line x1="168" y1="80" x2="175" y2="440" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" />

                  {/* Flush Door Opening with Lock */}
                  <rect
                    x="142"
                    y="320"
                    width="36"
                    height="70"
                    rx="4"
                    fill="#ef4444"
                    fillOpacity="0.15"
                    stroke="#ef4444"
                    strokeWidth="2"
                  />
                  <circle cx="160" cy="355" r="3" fill="#ef4444" />
                  <text x="188" y="360" fontSize="10" fontWeight="bold" fill="#ef4444">Flush MCB Door</text>

                  {/* Bottom Dia Callout Indicator */}
                  <line x1="120" y1="440" x2="200" y2="440" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3 3" />
                  <text x="210" y="444" fontSize="10" fontWeight="bold" fill="currentColor">Bottom Dia (130-270mm)</text>

                  {/* Base Plate with Stiffeners */}
                  <rect x="110" y="440" width="100" height="14" rx="2" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="2" />
                  <polygon points="130,440 120,440 130,410" fill="currentColor" fillOpacity="0.3" />
                  <polygon points="190,440 200,440 190,410" fill="currentColor" fillOpacity="0.3" />

                  {/* Foundation J-Bolts */}
                  <path d="M122 454 L122 510 L110 510" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M198 454 L198 510 L210 510" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                  {/* Ground Civil Concrete Level */}
                  <line x1="60" y1="465" x2="260" y2="465" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
                  <text x="20" y="470" fontSize="9" fontWeight="bold" fill="currentColor">G.L. Ground Level</text>
                  <text x="215" y="505" fontSize="9" fontWeight="bold" fill="#10b981">4x Foundation Bolts</text>
                </svg>
              </div>

              {/* Technical Engineering Information beside Drawing */}
              <div className="lg:col-span-6 space-y-3 text-left">
                <div className="p-3.5 rounded-xl bg-slate-100/80 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-800 space-y-1">
                  <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white block">
                    1. Continuous Taper Shaft
                  </span>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Manufactured from single-sheet folded high-tensile steel with single longitudinal submerged arc automated welding.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-100/80 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-800 space-y-1">
                  <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white block">
                    2. Flush Weatherproof Inspection Door
                  </span>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Vandal-resistant door opening with rubber gasket sealing and internal DIN rail for MCB and terminal connection block.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-100/80 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-800 space-y-1">
                  <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white block">
                    3. Base Plate &amp; Civil Anchorage
                  </span>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    High-strength base plate with pre-drilled slotted holes and 4 high-tensile hot-dip galvanized J-bolt foundation anchor assemblies.
                  </p>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </motion.section>

      {/* ============================================================ */}
      {/* 6. PRODUCT SPECIFICATIONS & MANUFACTURING */}
      {/* ============================================================ */}
      <motion.section
        className="py-12 sm:py-14 md:py-16 bg-white dark:bg-black text-slate-900 dark:text-white border-b border-slate-200 dark:border-zinc-900 transition-colors"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          
          <div className="max-w-4xl mb-8 sm:mb-10 text-left">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-slate-900 dark:text-slate-200 block mb-1">
              MANUFACTURING &amp; ENGINEERING
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-[1.08]">
              PRODUCT SPECIFICATIONS &amp;<br />
              <span className="text-ssil-red">MANUFACTURING.</span>
            </h2>
          </div>

          {/* 3 Specification Panels (About Us Visual Language) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-7 text-left">
            
            {/* Card 01 — TECHNICAL */}
            <motion.div
              variants={childVariants}
              whileHover={{ y: -5, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="group p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-50 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 hover:border-ssil-red/60 transition-all duration-300 shadow-md relative overflow-hidden flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-zinc-800">
                  <span className="text-2xl sm:text-3xl font-extralight text-ssil-red">01</span>
                  <span className="text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-300 bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 px-3 py-0.5 rounded-full">
                    TECHNICAL
                  </span>
                </div>

                <div className="space-y-2.5 text-xs sm:text-sm">
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Automated Welding &amp; Bending
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 leading-relaxed">
                      Delivers consistent manufacturing quality and strong structural performance.
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      CNC Cutting &amp; Drilling
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 leading-relaxed">
                      Enables precise shapes and hole placements for installation.
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Surface Treatment
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 leading-relaxed">
                      Corrosion protection through galvanizing and suitable finishing processes.
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Quality Control
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 leading-relaxed">
                      Quality checks focused on strength, coating and dimensional compliance.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 02 — KEY FEATURES */}
            <motion.div
              variants={childVariants}
              whileHover={{ y: -5, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="group p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-50 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 hover:border-ssil-red/60 transition-all duration-300 shadow-md relative overflow-hidden flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-zinc-800">
                  <span className="text-2xl sm:text-3xl font-extralight text-ssil-red">02</span>
                  <span className="text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-300 bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 px-3 py-0.5 rounded-full">
                    KEY FEATURES
                  </span>
                </div>

                <div className="space-y-2.5 text-xs sm:text-sm">
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Custom Heights &amp; Shapes
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 leading-relaxed">
                      Available in different heights and configurations according to project requirements.
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Modular Construction
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 leading-relaxed">
                      Multi-section configurations can support easier transportation and assembly where applicable.
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Mounting Options
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 leading-relaxed">
                      Provision for appropriate brackets, base plates, access doors and crossarms.
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Brand &amp; Manufacturing
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 font-semibold text-ssil-red leading-relaxed">
                      SSIL (Shiv Shakti India Limited)
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 03 — PRODUCT ADVANTAGE */}
            <motion.div
              variants={childVariants}
              whileHover={{ y: -5, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="group p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-50 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 hover:border-ssil-red/60 transition-all duration-300 shadow-md relative overflow-hidden flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-zinc-800">
                  <span className="text-2xl sm:text-3xl font-extralight text-ssil-red">03</span>
                  <span className="text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-300 bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 px-3 py-0.5 rounded-full">
                    PRODUCT ADVANTAGE
                  </span>
                </div>

                <div className="space-y-2.5 text-xs sm:text-sm">
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Durability
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 leading-relaxed">
                      Corrosion-resistant construction and protective treatment support long service life.
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Design Flexibility
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 leading-relaxed">
                      Different heights, configurations and finishing options available as per project needs.
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Cost Efficiency
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 leading-relaxed">
                      Durable construction and practical installation characteristics support long-term value.
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Sustainability
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 leading-relaxed">
                      Long service life and durable materials contribute to lower replacement overheads.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </motion.section>

      {/* ============================================================ */}
      {/* 7. WANT TO SEE OUR OTHER PRODUCTS? (COMPACT & ELEGANT CTA) */}
      {/* ============================================================ */}
      <section className="py-10 sm:py-14 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors relative overflow-hidden">
        
        {/* Subtle Ambient Red Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-ssil-red/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-4xl relative z-10">
          <div className="p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 text-left group hover:border-ssil-red/50 transition-all duration-300">
            
            {/* Red Accent Left Bar */}
            <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-ssil-red" />

            <div className="space-y-1.5 max-w-xl">
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-ssil-red block">
                EXPLORE COMPLETE CATALOGUE
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-tight">
                Want to See Our Other Products?
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
                Explore our complete range of lighting poles and infrastructure solutions.
              </p>
            </div>

            <div className="shrink-0">
              <Button
                asChild
                size="lg"
                className="bg-ssil-red hover:bg-ssil-red-600 font-bold px-7 py-3 rounded-full text-white text-xs sm:text-sm shadow-lg shadow-ssil-red/25 hover:shadow-ssil-red/40 transition-all duration-300 hover:scale-105"
              >
                <Link href="/products" className="flex items-center gap-2">
                  <span>View All Products</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. PRODUCT ENQUIRY MODAL */}
      {/* ============================================================ */}
      <EnquiryModal
        isOpen={enquiryState.isOpen}
        onClose={() => setEnquiryState({ ...enquiryState, isOpen: false })}
        productCategory={enquiryState.productCategory}
        productModel={enquiryState.productModel}
      />

    </div>
  );
}
