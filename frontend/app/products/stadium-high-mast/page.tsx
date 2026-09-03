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
import Image from "next/image";

interface StadiumMastSpecRow {
  parameter: string;
  m15: string;
  m20: string;
  m25: string;
  m30: string;
  m35: string;
  m40: string;
  isProductId?: boolean;
}

const stadiumMastSpecifications: StadiumMastSpecRow[] = [
  {
    parameter: "PRODUCT ID",
    m15: "SSILSHM01",
    m20: "SSILSHM02",
    m25: "SSILSHM03",
    m30: "SSILSHM04",
    m35: "SSILSHM05",
    m40: "SSILSHM06",
    isProductId: true,
  },
  {
    parameter: "Thickness",
    m15: "3, 4 mm",
    m20: "3, 4 mm",
    m25: "3, 4, 4 mm",
    m30: "3, 4, 5 mm",
    m35: "4, 4, 5, 5 mm",
    m40: "4, 4, 5, 5, 6, 6 mm",
  },
  {
    parameter: "Top & Bottom Dia",
    m15: "150 / 380 mm",
    m20: "150 / 410 mm",
    m25: "150 / 460 mm",
    m30: "150 / 520 mm",
    m35: "150 / 600 mm",
    m40: "150 / 720 mm",
  },
  {
    parameter: "Floodlight Capacity",
    m15: "6 – 12 Fixtures",
    m20: "8 – 16 Fixtures",
    m25: "12 – 24 Fixtures",
    m30: "16 – 32 Fixtures",
    m35: "20 – 36 Fixtures",
    m40: "24 – 48 Fixtures",
  },
  {
    parameter: "Size of Base Plate",
    m15: "560 mm",
    m20: "610 mm",
    m25: "680 mm",
    m30: "750 mm",
    m35: "820 mm",
    m40: "950 mm",
  },
  {
    parameter: "Base Plate Thickness",
    m15: "20 mm",
    m20: "25 mm",
    m25: "25 mm",
    m30: "32 mm",
    m35: "36 mm",
    m40: "45 mm",
  },
  {
    parameter: "No. of Foundation Bolts",
    m15: "8 nos",
    m20: "8 nos",
    m25: "12 nos",
    m30: "12 nos",
    m35: "16 nos",
    m40: "20 nos",
  },
];

interface BlueprintTechSpec {
  property: string;
  value: string;
}

const stadiumBlueprintSpecs: BlueprintTechSpec[] = [
  {
    property: "Structure",
    value: "Heavy-Duty Multi-Section Polygonal Mast",
  },
  {
    property: "Headframe Arrangement",
    value: "Multi-Tier Floodlight Matrix / Circular Arena Crown",
  },
  {
    property: "Floodlight Mounting Capacity",
    value: "Customized from 6 up to 48+ High-Power LED Stadium Projectors",
  },
  {
    property: "Maintenance System",
    value: "Motorized Winch Lowering / Fixed Service Platform & Safety Ladder",
  },
  {
    property: "Material Construction",
    value: "BSEN10025 S355 / IS 2062 High-Tensile Steel",
  },
  {
    property: "Height Range",
    value: "15M to 40M (Modular Telescopic Assembly)",
  },
  {
    property: "Cross Sectional Geometry",
    value: "12 / 16 / 20 Sided Aerodynamic Polygonal Shape",
  },
  {
    property: "Surface Protection",
    value: "Hot-Dip Galvanized in-house (IS 4759 / IS 2629 / BS EN ISO 1461)",
  },
  {
    property: "Galvanizing Coating",
    value: "Minimum 86 Micron Surface Thickness",
  },
  {
    property: "Wind Speed Resistance",
    value: "Certified up to 180+ km/h (As Per IS 875 Part 3)",
  },
  {
    property: "Door Compartment",
    value: "Reinforced Flush Weatherproof Door with Internal Lock",
  },
  {
    property: "Base Plate Design",
    value: "High-Strength Circular Flanged Base with Radial Gusset Stiffeners",
  },
  {
    property: "Civil Anchor Assembly",
    value: "High-Tensile Foundation J-Bolts (IS 2062 Gr. E250A / Gr. 8.8)",
  },
  {
    property: "Aviation Safety",
    value: "Twin Medium/Low Intensity LED Aviation Obstruction Beacons",
  },
  {
    property: "Lightning Protection",
    value: "Integrated Copper-Tipped Air Termination Finial",
  },
  {
    property: "Electrical Standards",
    value: "Internal Flame-Retardant EPR/PCP Cabling & Weatherproof Junction Box",
  },
  {
    property: "Brand",
    value: "SSIL",
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

export default function StadiumHighMastPage() {
  const [enquiryState, setEnquiryState] = useState<{
    isOpen: boolean;
    productCategory: string;
    productModel: string;
  }>({
    isOpen: false,
    productCategory: "Stadium High Mast",
    productModel: "",
  });

  const openEnquiry = (modelName?: string) => {
    setEnquiryState({
      isOpen: true,
      productCategory: "Stadium High Mast",
      productModel: modelName || "Standard Stadium High Mast Pole (15M–40M)",
    });
  };

  return (
    <div className="relative min-h-screen w-full bg-white dark:bg-black text-slate-900 dark:text-white transition-colors duration-300 overflow-hidden">
      
      {/* ============================================================ */}
      {/* 1. PRODUCT HERO BANNER */}
      {/* ============================================================ */}
      <section className="relative z-10 w-full h-[54vh] sm:h-[62vh] max-h-[540px] flex items-end overflow-hidden rounded-none pt-24 pb-10 sm:pb-12">
        {/* Full-bleed Background Image */}
        <Image
          src="/products/products-hero.png"
          alt="Stadium High Mast SSIL Hero"
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
            <span className="text-ssil-red">Stadium High Mast</span>
          </div>

          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-ssil-red block mb-1">
            SSIL LUMINAIRES &amp; POLES
          </span>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight max-w-4xl drop-shadow-md">
            Stadium High Mast
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-slate-200 font-medium max-w-2xl leading-relaxed drop-shadow-xs">
            High-output arena floodlighting towers engineered for sports and stadiums.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. PRODUCT OVERVIEW STRIP */}
      {/* ============================================================ */}
      <section className="relative z-10 py-10 bg-slate-50 dark:bg-zinc-950 border-b border-slate-200/80 dark:border-zinc-800/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Description Narrative */}
            <div className="max-w-3xl">
              <h2 className="text-xs font-black uppercase tracking-widest text-ssil-red mb-2">
                ENGINEERING &amp; APPLICATION OVERVIEW
              </h2>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                High-capacity stadium high mast towers engineered to support large multi-fixture LED floodlight headframes, providing uniform high-lux broadcast lighting with dynamic structural calculations.
              </p>
            </div>

            {/* Quick Specs Badges */}
            <div className="grid grid-cols-2 gap-3 shrink-0 lg:max-w-md w-full">
              <div className="flex items-center gap-2.5 p-3 rounded-none bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-xs">
                <CheckCircle2 className="h-4 w-4 text-ssil-red shrink-0" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">ISO 9001:2015 Quality</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-none bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-xs">
                <CheckCircle2 className="h-4 w-4 text-ssil-red shrink-0" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">IP66 Weather Protection</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-none bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-xs">
                <CheckCircle2 className="h-4 w-4 text-ssil-red shrink-0" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Custom Engineering</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-none bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-xs">
                <CheckCircle2 className="h-4 w-4 text-ssil-red shrink-0" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Hot-Dip Galvanized</span>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                  STADIUM HIGH MAST <br />
                  <span className="text-ssil-red">POLES.</span>
                </h1>

                {/* 3 Product-Value Bullet Points */}
                <div className="space-y-2.5 pt-1 max-w-2xl text-left">
                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0 mt-2" />
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                      SSIL Stadium High Mast poles are engineered for large-area sports and stadium illumination, providing high structural strength, reliable performance, customized floodlight mounting, and long-term durability for demanding outdoor environments.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0 mt-2" />
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                      Engineered for large-area stadium illumination with high-capacity headframe arrangements designed for multiple floodlight fixtures.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0 mt-2" />
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                      Custom-engineered heights, headframes, and structural configurations provide reliable lighting coverage and stability for demanding sports and stadium environments.
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
                    alt="SSIL Stadium High Mast Lighting Tower Daytime"
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="eager"
                  />

                  {/* Night Version (Smoothly crossfades in on hover) */}
                  <img
                    src="/images/products/homepage/product-05/night.png"
                    alt="SSIL Stadium High Mast Floodlighting Night Illumination"
                    className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out group-hover:scale-105 pointer-events-none"
                    loading="eager"
                  />
                  
                  {/* Subtle Gradient Shadow Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

                  {/* Translucent Glass Caption Pill matching Navbar styling */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between p-3 sm:p-3.5 rounded-xl bg-white/80 dark:bg-black/60 backdrop-blur-md border border-white/30 dark:border-white/10 shadow-lg text-slate-900 dark:text-white transition-all">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-ssil-red block">
                        STADIUM HIGH MAST POLE
                      </span>
                      <span className="text-xs sm:text-sm font-black">
                        Sports Arena &amp; Stadium Series
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
                STADIUM &amp; SPORTS LIGHTING.<br />
                <span className="text-ssil-red">ENGINEERED FOR HIGH-LUX ARENAS.</span>
              </h2>
              <div className="w-14 h-1 bg-ssil-red rounded-full mt-2" />
            </motion.div>

            {/* Description Paragraphs Column */}
            <motion.div variants={childVariants} className="lg:col-span-7 space-y-3 text-left text-slate-700 dark:text-slate-300 leading-relaxed font-normal text-sm sm:text-base">
              <p>
                Shiv Shakti India Limited (SSIL) designs and manufactures high-capacity Stadium High Mast Towers engineered specifically to support extensive multi-tier LED floodlight arrays across outdoor sports stadiums, cricket grounds, football arenas, athletic complexes, and recreational racecourses.
              </p>
              <p>
                Each stadium mast is custom-calculated to deliver required vertical and horizontal lux uniformity meeting high-definition sports broadcast standards (HD / 4K / Slow-Motion), while structurally handling substantial fixture surface areas and extreme dynamic wind pressures up to 180+ km/h.
              </p>
              <p>
                Featuring precision CNC-cut modular slip-joint sections, versatile headframe matrices, and hot-dip galvanized protective coatings, SSIL Stadium High Masts provide multi-decade structural integrity with minimal maintenance overheads.
              </p>
            </motion.div>

          </div>

        </div>
      </motion.section>

      {/* ============================================================ */}
      {/* 4. DIMENSION SPECIFICATIONS (COMPLETE TECHNICAL DATA SHEET) */}
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
                STADIUM HIGH MAST POLE <span className="text-ssil-red">TECHNICAL SPECIFICATIONS.</span>
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl">
                Technical parameters across SSIL&apos;s heavy-duty Stadium High Mast tower range. Custom engineered for multi-tier floodlight arrays and extreme wind resistance.
              </p>
            </motion.div>
          </div>

          {/* Full Technical Specifications Table */}
          <motion.div
            variants={childVariants}
            className="w-full rounded-2xl border border-slate-200 dark:border-zinc-800 overflow-hidden shadow-lg bg-white dark:bg-zinc-950"
          >
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-slate-900 text-white text-xs font-extrabold uppercase tracking-wider border-b border-slate-800">
                    <th className="py-3.5 px-4 sm:px-6">TECH DETAIL</th>
                    <th className="py-3.5 px-3 sm:px-4 text-center">15 MTR</th>
                    <th className="py-3.5 px-3 sm:px-4 text-center">20 MTR</th>
                    <th className="py-3.5 px-3 sm:px-4 text-center">25 MTR</th>
                    <th className="py-3.5 px-3 sm:px-4 text-center">30 MTR</th>
                    <th className="py-3.5 px-3 sm:px-4 text-center">35 MTR</th>
                    <th className="py-3.5 px-4 sm:px-6 text-center">40 MTR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-zinc-800 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                  {stadiumMastSpecifications.map((row, idx) => (
                    <tr
                      key={row.parameter}
                      className={`group hover:bg-ssil-red/5 dark:hover:bg-zinc-900/80 transition-colors ${
                        row.isProductId
                          ? "bg-slate-100/90 dark:bg-zinc-900/90 font-bold"
                          : idx % 2 === 1
                          ? "bg-slate-50/60 dark:bg-zinc-900/20"
                          : ""
                      }`}
                    >
                      <td className={`py-3.5 px-4 sm:px-6 text-slate-900 dark:text-white group-hover:text-ssil-red transition-colors flex items-center gap-2 ${row.isProductId ? "font-black text-xs sm:text-sm text-ssil-red tracking-wider uppercase" : "font-bold"}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                        {row.parameter}
                      </td>
                      <td className={`py-3.5 px-3 sm:px-4 text-center font-mono text-[11px] sm:text-xs ${row.isProductId ? "font-black text-slate-900 dark:text-white tracking-wide" : ""}`}>
                        {row.m15}
                      </td>
                      <td className={`py-3.5 px-3 sm:px-4 text-center font-mono text-[11px] sm:text-xs ${row.isProductId ? "font-black text-slate-900 dark:text-white tracking-wide" : ""}`}>
                        {row.m20}
                      </td>
                      <td className={`py-3.5 px-3 sm:px-4 text-center font-mono text-[11px] sm:text-xs ${row.isProductId ? "font-black text-slate-900 dark:text-white tracking-wide" : ""}`}>
                        {row.m25}
                      </td>
                      <td className={`py-3.5 px-3 sm:px-4 text-center font-mono text-[11px] sm:text-xs ${row.isProductId ? "font-black text-slate-900 dark:text-white tracking-wide" : ""}`}>
                        {row.m30}
                      </td>
                      <td className={`py-3.5 px-3 sm:px-4 text-center font-mono text-[11px] sm:text-xs ${row.isProductId ? "font-black text-slate-900 dark:text-white tracking-wide" : ""}`}>
                        {row.m35}
                      </td>
                      <td className={`py-3.5 px-4 sm:px-6 text-center font-mono text-[11px] sm:text-xs font-bold ${row.isProductId ? "font-black text-ssil-red tracking-wide" : "text-ssil-red"}`}>
                        {row.m40}
                      </td>
                    </tr>
                  ))}

                  {/* Action Buttons Row for each Height */}
                  <tr className="bg-slate-100/70 dark:bg-zinc-900/60 border-t-2 border-slate-300 dark:border-zinc-700">
                    <td className="py-3 px-4 sm:px-6 font-extrabold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                      ENQUIRY
                    </td>
                    {[
                      { id: "SSILSHM01", height: "15M" },
                      { id: "SSILSHM02", height: "20M" },
                      { id: "SSILSHM03", height: "25M" },
                      { id: "SSILSHM04", height: "30M" },
                      { id: "SSILSHM05", height: "35M" },
                      { id: "SSILSHM06", height: "40M" },
                    ].map((item) => (
                      <td key={item.id} className="py-3 px-2 sm:px-3 text-center">
                        <Button
                          size="sm"
                          onClick={() => openEnquiry(`${item.id} (${item.height} Stadium High Mast)`)}
                          className="bg-white dark:bg-zinc-800 hover:bg-ssil-red hover:text-white text-slate-900 dark:text-white text-[11px] font-bold px-3 py-1 rounded-lg border border-slate-300 dark:border-zinc-700 transition-all shadow-xs"
                        >
                          Enquire Now
                        </Button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Table Footer Note */}
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-900/50 border-t border-slate-200 dark:border-zinc-800 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-ssil-red shrink-0" />
                Custom headframe matrix layouts engineered for 6 up to 48+ high-output stadium floodlights.
              </span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Design Standard: BS EN 10025 / IS 875 Structural &amp; Wind Compliance
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
              ENGINEERING BLUEPRINT
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-[1.1]">
              DRAWING OF STADIUM <br />
              <span className="text-ssil-red">HIGH MAST POLE.</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl">
              Structural drawing detailing the multi-tier arena floodlight matrix crown, modular polygonal shaft sections, and heavy-duty civil foundation anchor assembly.
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
              
              {/* Preserved Visual Engineering Schematic Drawing for Stadium High Mast */}
              <div className="lg:col-span-6 flex items-center justify-center p-5 bg-slate-100/80 dark:bg-black/60 rounded-2xl border border-slate-200 dark:border-zinc-800 h-full min-h-[520px]">
                <svg
                  viewBox="0 0 340 580"
                  className="w-full max-w-[300px] sm:max-w-[340px] h-auto drop-shadow-md text-slate-800 dark:text-slate-200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Lightning Finial & Aviation Obstruction Beacon */}
                  <line x1="170" y1="15" x2="170" y2="40" stroke="#ef4444" strokeWidth="2.5" />
                  <circle cx="170" cy="18" r="3.5" fill="#ef4444" />
                  <text x="185" y="22" fontSize="9" fontWeight="bold" fill="#ef4444">Aviation Beacon</text>

                  {/* Multi-Tier Stadium Floodlight Matrix Headframe Grid */}
                  <rect x="100" y="40" width="140" height="75" rx="3" fill="currentColor" fillOpacity="0.06" stroke="#ef4444" strokeWidth="2" />
                  
                  {/* Floodlight Matrix Cross Bars (3 Tiers x 4 Columns = 12 Projectors) */}
                  <line x1="100" y1="65" x2="240" y2="65" stroke="#ef4444" strokeWidth="1.5" />
                  <line x1="100" y1="90" x2="240" y2="90" stroke="#ef4444" strokeWidth="1.5" />

                  {/* Tier 1 Projectors */}
                  <rect x="108" y="46" width="22" height="14" rx="2" fill="#ef4444" />
                  <rect x="138" y="46" width="22" height="14" rx="2" fill="#ef4444" />
                  <rect x="180" y="46" width="22" height="14" rx="2" fill="#ef4444" />
                  <rect x="210" y="46" width="22" height="14" rx="2" fill="#ef4444" />

                  {/* Tier 2 Projectors */}
                  <rect x="108" y="71" width="22" height="14" rx="2" fill="#ef4444" />
                  <rect x="138" y="71" width="22" height="14" rx="2" fill="#ef4444" />
                  <rect x="180" y="71" width="22" height="14" rx="2" fill="#ef4444" />
                  <rect x="210" y="71" width="22" height="14" rx="2" fill="#ef4444" />

                  {/* Tier 3 Projectors */}
                  <rect x="108" y="96" width="22" height="14" rx="2" fill="#ef4444" />
                  <rect x="138" y="96" width="22" height="14" rx="2" fill="#ef4444" />
                  <rect x="180" y="96" width="22" height="14" rx="2" fill="#ef4444" />
                  <rect x="210" y="96" width="22" height="14" rx="2" fill="#ef4444" />

                  <text x="248" y="78" fontSize="9" fontWeight="bold" fill="#ef4444">Floodlight Matrix</text>

                  {/* Top Dia Callout */}
                  <line x1="145" y1="125" x2="195" y2="125" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3 3" />
                  <text x="75" y="129" fontSize="9" fontWeight="bold" fill="currentColor">Top Dia (150mm)</text>

                  {/* Telescopic Polygonal Mast (Top Section) */}
                  <polygon
                    points="155,125 185,125 192,235 148,235"
                    fill="currentColor"
                    fillOpacity="0.08"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  />

                  {/* Slip Joint 1 */}
                  <rect x="144" y="231" width="52" height="8" rx="2" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.5" />
                  <text x="205" y="238" fontSize="8" fontWeight="bold" fill="#3b82f6">Telescopic Slip Joint</text>

                  {/* Middle Mast Section */}
                  <polygon
                    points="148,239 192,239 204,360 136,360"
                    fill="currentColor"
                    fillOpacity="0.08"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  />

                  {/* Slip Joint 2 */}
                  <rect x="132" y="356" width="76" height="8" rx="2" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.5" />

                  {/* Bottom Mast Section */}
                  <polygon
                    points="136,364 204,364 222,480 118,480"
                    fill="currentColor"
                    fillOpacity="0.08"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  />

                  {/* Polygonal Longitudinal Fold Facet Lines */}
                  <line x1="163" y1="125" x2="148" y2="480" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" />
                  <line x1="177" y1="125" x2="192" y2="480" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" />

                  {/* Winch / Electrical Access Door with Mechanical Lock */}
                  <rect
                    x="144"
                    y="400"
                    width="52"
                    height="70"
                    rx="4"
                    fill="#ef4444"
                    fillOpacity="0.15"
                    stroke="#ef4444"
                    strokeWidth="2"
                  />
                  <circle cx="170" cy="435" r="3" fill="#ef4444" />
                  <text x="205" y="439" fontSize="9" fontWeight="bold" fill="#ef4444">Inspection Door</text>

                  {/* Bottom Dia Callout Indicator */}
                  <line x1="110" y1="480" x2="230" y2="480" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3 3" />
                  <text x="238" y="484" fontSize="9" fontWeight="bold" fill="currentColor">Bottom Dia (380-720mm)</text>

                  {/* Heavy-Duty Base Plate with Radial Stiffeners */}
                  <rect x="100" y="480" width="140" height="20" rx="3" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="2" />
                  <polygon points="118,480 108,480 118,445" fill="currentColor" fillOpacity="0.3" />
                  <polygon points="222,480 232,480 222,445" fill="currentColor" fillOpacity="0.3" />

                  {/* High-Tensile J-Bolts Foundation Assembly */}
                  <path d="M112 500 L112 555 L100 555" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M228 500 L228 555 L240 555" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M132 500 L132 555 L120 555" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M208 500 L208 555 L220 555" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

                  {/* Ground Level Civil Concrete Boundary */}
                  <line x1="45" y1="510" x2="295" y2="510" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
                  <text x="10" y="515" fontSize="9" fontWeight="bold" fill="currentColor">G.L. Ground Level</text>
                  <text x="245" y="550" fontSize="9" fontWeight="bold" fill="#10b981">8–20x Anchor Bolts</text>
                </svg>
              </div>

              {/* Right Side: Technical Specification Table */}
              <div className="lg:col-span-6 flex flex-col justify-center text-left">
                <div className="mb-2.5">
                  <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-ssil-red block mb-0.5">
                    STADIUM HIGH MAST
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                    TECHNICAL SPECIFICATION
                  </h3>
                </div>

                <div className="w-full rounded-xl border border-slate-200 dark:border-zinc-800 overflow-hidden shadow-sm bg-white dark:bg-zinc-950">
                  <div className="overflow-x-auto w-full">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-900 text-white text-[11px] font-extrabold uppercase tracking-wider border-b border-slate-800">
                          <th className="py-2.5 px-3.5 sm:px-4 w-1/2">Stadium Mast Structure</th>
                          <th className="py-2.5 px-3.5 sm:px-4 w-1/2">Technical Specification</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/80 font-medium text-slate-800 dark:text-slate-200">
                        {stadiumBlueprintSpecs.map((spec, idx) => (
                          <tr
                            key={spec.property}
                            className={`transition-colors hover:bg-ssil-red/5 dark:hover:bg-zinc-900/60 ${
                              idx % 2 === 0 ? "bg-transparent" : "bg-slate-50/70 dark:bg-zinc-900/30"
                            }`}
                          >
                            <td className="py-2 px-3.5 sm:px-4 font-bold text-slate-900 dark:text-white text-[11px] sm:text-xs">
                              {spec.property}
                            </td>
                            <td className="py-2 px-3.5 sm:px-4 text-slate-700 dark:text-slate-300 text-[11px] sm:text-xs">
                              {spec.property === "Brand" ? (
                                <span className="font-extrabold text-ssil-red">{spec.value}</span>
                              ) : (
                                spec.value
                              )}
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
                      Built to handle high wind loads and large floodlight fixtures, ensuring strength and reliability in demanding stadium environments.
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      CNC Cutting &amp; Drilling
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 leading-relaxed">
                      Precision-cut for accurate bracket and fixture installation, reducing time and effort during on-site assembly.
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Surface Treatment
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 leading-relaxed">
                      Weather-resistant finishes including hot-dip galvanizing, powder coating, or painting to withstand harsh outdoor conditions.
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Quality Control
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 leading-relaxed">
                      Each Stadium Pole undergoes extensive testing for load endurance, surface treatment quality, and compliance with applicable standards.
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
                      Custom Heights &amp; Designs
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 leading-relaxed">
                      Available in varying heights up to 40 meters, with conical, polygonal, and stepped designs tailored for optimal stadium lighting coverage.
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Heavy-Duty Modular Construction
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 leading-relaxed">
                      Multi-section stadium poles engineered for easy transport, on-site assembly, and enhanced structural performance.
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Wind Load &amp; Safety Compliance
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 leading-relaxed">
                      Built to withstand high wind pressures and designed in accordance with applicable structural safety standards.
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Advanced Surface Treatment
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 leading-relaxed">
                      Hot-dip galvanized and optionally powder coated or painted for maximum corrosion resistance.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 03 — PRODUCT ADVANTAGES */}
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
                    PRODUCT ADVANTAGES
                  </span>
                </div>

                <div className="space-y-2.5 text-xs sm:text-sm">
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Exceptional Durability
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 leading-relaxed">
                      Manufactured with high-grade, corrosion-resistant steel and protective coatings, ensuring superior performance and a long operational lifespan even in extreme weather.
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Tailored Design Flexibility
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 leading-relaxed">
                      Available in various heights, shapes, and finishes — customizable to meet the unique lighting and structural requirements of any stadium.
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Cost-Effective Solutions
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 leading-relaxed">
                      Modular construction reduces transportation and installation costs, while minimal maintenance delivers excellent long-term value.
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      High Load Capacity
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 leading-relaxed">
                      Designed to support multiple high-output stadium floodlights and withstand dynamic wind loads.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </motion.section>

      {/* ============================================================ */}
      {/* 7. WANT TO EXPLORE MORE SSIL PRODUCTS? (COMPACT & ELEGANT CTA) */}
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
                Want to Explore More SSIL Products?
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
                Explore our complete range of engineered poles and infrastructure solutions.
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
