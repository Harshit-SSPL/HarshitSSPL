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
import { fetchApi } from "@/lib/admin-api";
import { NEUTRAL_BANNER_PLACEHOLDER, NEUTRAL_PRODUCT_PLACEHOLDER } from "@/lib/placeholders";
import Image from "next/image";

interface HighMastSpecRow {
  parameter: string;
  m12: string;
  m12_5: string;
  m16: string;
  m20: string;
  m25: string;
  m30: string;
  m40: string;
  isProductId?: boolean;
}

const highMastSpecifications: HighMastSpecRow[] = [
  {
    parameter: "PRODUCT ID",
    m12: "SSILHM01",
    m12_5: "SSILHM02",
    m16: "SSILHM03",
    m20: "SSILHM04",
    m25: "SSILHM05",
    m30: "SSILHM06",
    m40: "SSILHM07",
    isProductId: true,
  },
  {
    parameter: "Thickness",
    m12: "3, 3 mm",
    m12_5: "3, 3 mm",
    m16: "3, 4 mm",
    m20: "3, 4 mm",
    m25: "3, 4, 4 mm",
    m30: "3, 4, 5 mm",
    m40: "4, 4, 5, 5, 6, 6 mm",
  },
  {
    parameter: "Top & Bottom Dia",
    m12: "150 / 360 mm",
    m12_5: "150 / 360 mm",
    m16: "150 / 360 mm",
    m20: "150 / 410 mm",
    m25: "150 / 460 mm",
    m30: "150 / 500 mm",
    m40: "150 / 700 mm",
  },
  {
    parameter: "Size of Base Plate",
    m12: "540 mm",
    m12_5: "540 mm",
    m16: "540 mm",
    m20: "610 mm",
    m25: "660 mm",
    m30: "700 mm",
    m40: "900 mm",
  },
  {
    parameter: "Base Plate Thickness",
    m12: "16 mm",
    m12_5: "16 mm",
    m16: "20 mm",
    m20: "25 mm",
    m25: "25 mm",
    m30: "30 mm",
    m40: "40 mm",
  },
  {
    parameter: "No. of Foundation Bolts",
    m12: "6 nos",
    m12_5: "6 nos",
    m16: "8 nos",
    m20: "8 nos",
    m25: "12 nos",
    m30: "12 nos",
    m40: "16 nos",
  },
];

interface BlueprintTechSpec {
  property: string;
  value: string;
}

const highMastBlueprintSpecs: BlueprintTechSpec[] = [
  {
    property: "Structure",
    value: "Multi-Section Polygonal Mast",
  },
  {
    property: "Headframe",
    value: "Circular / Symmetric Multi-Fixture Floodlight Crown",
  },
  {
    property: "Raising & Lowering",
    value: "Dual-Drum Motorized / Manual Winch Assembly",
  },
  {
    property: "Wire Rope",
    value: "Stainless Steel (SS 316) Aircraft Grade Cables",
  },
  {
    property: "Trailing Cable",
    value: "Multi-Core EPR/PCP Flame-Retardant Flexible Cable",
  },
  {
    property: "Material Construction",
    value: "BSEN10025 S355 / IS 2062 High-Tensile Steel",
  },
  {
    property: "Height Range",
    value: "12M to 40M (Modular Telescopic Assembly)",
  },
  {
    property: "Number of Cross Sections",
    value: "12 / 16 / 20 Sided Polygonal Geometry",
  },
  {
    property: "Metal Protection Treatment",
    value: "Hot-Dip Galvanized (As Per IS 4759 / IS 2629 / BS EN ISO 1461)",
  },
  {
    property: "Galvanization Thickness",
    value: "Minimum 86 Micron Surface Thickness",
  },
  {
    property: "Wind Speed Resistance",
    value: "Designed up to 180+ km/h (As Per IS 875 Part 3)",
  },
  {
    property: "Door Opening",
    value: "Vandal-Resistant Flush Inspection Door with Mechanical Lock",
  },
  {
    property: "Base Plate Design",
    value: "Heavy-Duty Flanged Base Plate with Radial Stiffeners",
  },
  {
    property: "Foundation Assembly",
    value: "High-Tensile J-Bolts (IS 2062 Gr. E250A / Gr. 8.8)",
  },
  {
    property: "Aviation Obstruction Light",
    value: "Medium / Low Intensity LED Aviation Warning Beacon",
  },
  {
    property: "Lightning Protection",
    value: "Integrated Copper-Tipped Air Termination Rod",
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

export default function HighMastPage() {
  const [bannerImage, setBannerImage] = useState(NEUTRAL_BANNER_PLACEHOLDER);
  const [dayImage, setDayImage] = useState(NEUTRAL_PRODUCT_PLACEHOLDER);
  const [nightImage, setNightImage] = useState(NEUTRAL_PRODUCT_PLACEHOLDER);
  const [enquiryState, setEnquiryState] = useState<{
    isOpen: boolean;
    productCategory: string;
    productModel: string;
  }>({
    isOpen: false,
    productCategory: "High Mast",
    productModel: "",
  });

  React.useEffect(() => {
    const fetchProductData = async () => {
      try {
        const data = await fetchApi("/products/high-mast");
        if (data.success && data.product) {
          if (data.product.heroImage) setBannerImage(data.product.heroImage);
          if (data.product.dayImage) setDayImage(data.product.dayImage);
          if (data.product.nightImage) setNightImage(data.product.nightImage);
        }
      } catch (err) {
        // Fallback
      }
    };
    fetchProductData();
  }, []);

  const openEnquiry = (modelName?: string) => {
    setEnquiryState({
      isOpen: true,
      productCategory: "High Mast",
      productModel: modelName || "Standard High Mast Pole (12M–40M)",
    });
  };

  return (
    <div className="relative min-h-screen w-full bg-white dark:bg-black text-slate-900 dark:text-white transition-colors duration-300 overflow-hidden">
      
      {/* ============================================================ */}
      {/* 1. PRODUCT HERO BANNER */}
      {/* ============================================================ */}
      <section className="relative z-10 w-full h-[54vh] sm:h-[62vh] max-h-[540px] flex flex-col justify-between overflow-hidden rounded-none pt-24 pb-10 sm:pb-12 bg-slate-950">
        {/* Full-bleed Background Image */}
        <Image
          src={bannerImage}
          alt="SSIL High Mast Pole Infrastructure Hero"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-center rounded-none"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-slate-950/20 rounded-none pointer-events-none" />

        {/* Top Breadcrumb Navigation (Just below Navbar) */}
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 text-left pt-2 sm:pt-4">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-300">
            <Link href="/products" className="hover:text-ssil-red transition-colors flex items-center gap-1">
              <ArrowLeft className="h-3.5 w-3.5" /> Products
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-ssil-red" />
            <span className="text-ssil-red">High Mast</span>
          </div>
        </div>

        {/* Bottom Content Container */}
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 text-left flex flex-col items-start">
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-ssil-red block mb-1">
            SSIL LUMINAIRES &amp; POLES
          </span>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight max-w-4xl drop-shadow-md">
            High Mast
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-slate-200 font-medium max-w-2xl leading-relaxed drop-shadow-xs">
            High-output illumination for expansive transport hubs and industrial yards.
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
                Monumental high mast lighting towers equipped with motorized winch lowering systems, multi-fixture floodlight crowns, and wind-load resistance for ports, expressways, and industrial freight yards.
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
      {/* 3. COMPACT HERO SECTION (BALANCED VERTICALLY & CENTERED) */}
      {/* ============================================================ */}
      <motion.section
        className="relative py-14 sm:py-16 lg:py-20 border-b border-slate-200 dark:border-zinc-900"
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
                  GI HIGH MAST <br />
                  <span className="text-ssil-red">POLES.</span>
                </h1>

                {/* 3 Product-Value Bullet Points */}
                <div className="space-y-2.5 pt-1 max-w-2xl text-left">
                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0 mt-2" />
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                      Heavy-duty high mast lighting structures engineered for expansive wide-area illumination across expressways, transport interchanges, airports, shipping ports, and industrial logistics yards.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0 mt-2" />
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                      Manufactured from high-tensile hot-dip galvanized steel with motorized winch lowering mechanisms for effortless ground-level maintenance and long-term structural reliability.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0 mt-2" />
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                      Engineered to withstand extreme wind-load forces and harsh environmental conditions, combining multi-luminaire headframe capacity with precision civil foundation anchorage.
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
                    src={dayImage}
                    alt="SSIL Hot-Dip Galvanized High Mast Pole Daytime"
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Night Version (Smoothly crossfades in on hover) */}
                  <img
                    src={nightImage || dayImage}
                    alt="SSIL Hot-Dip Galvanized High Mast Pole Night Illumination"
                    className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out group-hover:scale-105 pointer-events-none"
                    loading="lazy"
                    decoding="async"
                  />
                  
                  {/* Subtle Gradient Shadow Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

                  {/* Translucent Glass Caption Pill matching Navbar styling */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between p-3 sm:p-3.5 rounded-xl bg-white/80 dark:bg-black/60 backdrop-blur-md border border-white/30 dark:border-white/10 shadow-lg text-slate-900 dark:text-white transition-all">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-ssil-red block">
                        HIGH MAST POLE
                      </span>
                      <span className="text-xs sm:text-sm font-black">
                        12M to 40M Tower Series
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
                WIDE-AREA ILLUMINATION.<br />
                <span className="text-ssil-red">BUILT FOR SCALE.</span>
              </h2>
              <div className="w-14 h-1 bg-ssil-red rounded-full mt-2" />
            </motion.div>

            {/* Description Paragraphs Column (No Stat Cards Below) */}
            <motion.div variants={childVariants} className="lg:col-span-7 space-y-3 text-left text-slate-700 dark:text-slate-300 leading-relaxed font-normal text-sm sm:text-base">
              <p>
                Shiv Shakti India Limited (SSIL) manufactures heavy-duty Hot-Dip Galvanized High Mast Lighting Towers engineered for expansive area coverage, superior structural stability, and extreme environmental resilience.
              </p>
              <p>
                Our high mast systems are custom-engineered for complex highway interchanges, commercial shipping docks, railway freight corridors, container terminals, airports, toll plazas, industrial refineries, and sporting arenas where high-lux uniform distribution and continuous operation are paramount.
              </p>
              <p>
                Equipped with precision-engineered motorized winch lowering mechanisms, SSIL High Mast towers allow lighting fixtures and electrical accessories to be safely lowered to ground level for rapid, zero-risk maintenance without requiring specialized boom lifts or cranes.
              </p>
            </motion.div>

          </div>

        </div>
      </motion.section>

      {/* ============================================================ */}
      {/* 4. DIMENSION SPECIFICATIONS (COMPLETE 12M–40M TECHNICAL DATA SHEET) */}
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
                HIGH MAST POLE <span className="text-ssil-red">TECHNICAL SPECIFICATIONS.</span>
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl">
                Comprehensive technical parameters across SSIL&apos;s modular High Mast tower portfolio ranging from 12 Meters to 40 Meters in height. Fabricated with high-grade steel and hot-dip galvanized in-house for long-term structural dependability.
              </p>
            </motion.div>
          </div>

          {/* Full Technical Specifications Table (All 7 Heights Always Visible) */}
          <motion.div
            variants={childVariants}
            className="w-full rounded-2xl border border-slate-200 dark:border-zinc-800 overflow-hidden shadow-lg bg-white dark:bg-zinc-950"
          >
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-slate-900 text-white text-xs font-extrabold uppercase tracking-wider border-b border-slate-800">
                    <th className="py-3.5 px-4 sm:px-6">TECH DETAIL</th>
                    <th className="py-3.5 px-3 sm:px-4 text-center">12 MTR</th>
                    <th className="py-3.5 px-3 sm:px-4 text-center">12.5 MTR</th>
                    <th className="py-3.5 px-3 sm:px-4 text-center">16 MTR</th>
                    <th className="py-3.5 px-3 sm:px-4 text-center">20 MTR</th>
                    <th className="py-3.5 px-3 sm:px-4 text-center">25 MTR</th>
                    <th className="py-3.5 px-3 sm:px-4 text-center">30 MTR</th>
                    <th className="py-3.5 px-4 sm:px-6 text-center">40 MTR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-zinc-800 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                  {highMastSpecifications.map((row, idx) => (
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
                        {row.m12}
                      </td>
                      <td className={`py-3.5 px-3 sm:px-4 text-center font-mono text-[11px] sm:text-xs ${row.isProductId ? "font-black text-slate-900 dark:text-white tracking-wide" : ""}`}>
                        {row.m12_5}
                      </td>
                      <td className={`py-3.5 px-3 sm:px-4 text-center font-mono text-[11px] sm:text-xs ${row.isProductId ? "font-black text-slate-900 dark:text-white tracking-wide" : ""}`}>
                        {row.m16}
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
                      { id: "SSILHM01", height: "12M" },
                      { id: "SSILHM02", height: "12.5M" },
                      { id: "SSILHM03", height: "16M" },
                      { id: "SSILHM04", height: "20M" },
                      { id: "SSILHM05", height: "25M" },
                      { id: "SSILHM06", height: "30M" },
                      { id: "SSILHM07", height: "40M" },
                    ].map((item) => (
                      <td key={item.id} className="py-3 px-2 sm:px-3 text-center">
                        <Button
                          size="sm"
                          onClick={() => openEnquiry(`${item.id} (${item.height} High Mast Tower)`)}
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
                Custom headframe arrangements (Symmetric / Asymmetric / Floodlight Crown) engineered for up to 32+ LED luminaires.
              </span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Design Standard: BS EN 10025 / IS 875 Structural Compliance
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
              DRAWING OF GI <br />
              <span className="text-ssil-red">HIGH MAST POLE.</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl">
              Precise structural detailing, headframe crown configuration, and electro-mechanical engineering parameters for SSIL High Mast towers ranging from 12M to 40M in height.
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
              
              {/* Preserved Visual Engineering Schematic Drawing for High Mast */}
              <div className="lg:col-span-6 flex items-center justify-center p-5 bg-slate-100/80 dark:bg-black/60 rounded-2xl border border-slate-200 dark:border-zinc-800 h-full min-h-[500px]">
                <svg
                  viewBox="0 0 320 560"
                  className="w-full max-w-[280px] sm:max-w-[320px] h-auto drop-shadow-md text-slate-800 dark:text-slate-200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Lightning Finial & Aviation Beacon on Top */}
                  <line x1="160" y1="20" x2="160" y2="45" stroke="#ef4444" strokeWidth="2.5" />
                  <circle cx="160" cy="22" r="3.5" fill="#ef4444" />
                  <text x="175" y="26" fontSize="9" fontWeight="bold" fill="#ef4444">Aviation Beacon</text>

                  {/* Headframe Pulley Top Cap */}
                  <rect x="145" y="45" width="30" height="12" rx="3" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2" />
                  
                  {/* Multi-Fixture Circular Floodlight Crown Headframe */}
                  <path
                    d="M100 65 L220 65"
                    stroke="#ef4444"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  {/* Symmetric Floodlight Fixtures */}
                  <rect x="90" y="58" width="16" height="14" rx="2" fill="#ef4444" />
                  <rect x="115" y="58" width="16" height="14" rx="2" fill="#ef4444" />
                  <rect x="140" y="58" width="16" height="14" rx="2" fill="#ef4444" />
                  <rect x="164" y="58" width="16" height="14" rx="2" fill="#ef4444" />
                  <rect x="189" y="58" width="16" height="14" rx="2" fill="#ef4444" />
                  <rect x="214" y="58" width="16" height="14" rx="2" fill="#ef4444" />
                  
                  <text x="240" y="70" fontSize="9" fontWeight="bold" fill="#ef4444">Lowering Crown</text>

                  {/* Top Dia Callout */}
                  <line x1="135" y1="85" x2="185" y2="85" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3 3" />
                  <text x="75" y="89" fontSize="10" fontWeight="bold" fill="currentColor">Top Dia (150mm)</text>

                  {/* High Mast Polygonal Telescopic Tapered Shaft (Top Section) */}
                  <polygon
                    points="145,85 175,85 182,210 138,210"
                    fill="currentColor"
                    fillOpacity="0.08"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  />

                  {/* Slip Joint 1 */}
                  <rect x="135" y="206" width="50" height="8" rx="2" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.5" />
                  <text x="195" y="213" fontSize="8" fontWeight="bold" fill="#3b82f6">Telescopic Slip Joint</text>

                  {/* Middle Mast Section */}
                  <polygon
                    points="138,214 182,214 192,340 128,340"
                    fill="currentColor"
                    fillOpacity="0.08"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  />

                  {/* Slip Joint 2 */}
                  <rect x="124" y="336" width="72" height="8" rx="2" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.5" />

                  {/* Bottom Mast Section */}
                  <polygon
                    points="128,344 192,344 208,460 112,460"
                    fill="currentColor"
                    fillOpacity="0.08"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  />

                  {/* Polygonal Longitudinal Fold Facet Lines */}
                  <line x1="153" y1="85" x2="140" y2="460" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" />
                  <line x1="167" y1="85" x2="180" y2="460" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" />

                  {/* Winch Mechanism Flush Door with Mechanical Lock */}
                  <rect
                    x="136"
                    y="380"
                    width="48"
                    height="68"
                    rx="4"
                    fill="#ef4444"
                    fillOpacity="0.15"
                    stroke="#ef4444"
                    strokeWidth="2"
                  />
                  <circle cx="160" cy="414" r="3" fill="#ef4444" />
                  <text x="192" y="418" fontSize="9" fontWeight="bold" fill="#ef4444">Winch Gear Door</text>

                  {/* Bottom Dia Callout Indicator */}
                  <line x1="105" y1="460" x2="215" y2="460" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3 3" />
                  <text x="225" y="464" fontSize="10" fontWeight="bold" fill="currentColor">Bottom Dia (360-700mm)</text>

                  {/* Heavy-Duty Base Plate with Radial Stiffeners */}
                  <rect x="95" y="460" width="130" height="18" rx="3" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="2" />
                  <polygon points="112,460 102,460 112,430" fill="currentColor" fillOpacity="0.3" />
                  <polygon points="208,460 218,460 208,430" fill="currentColor" fillOpacity="0.3" />

                  {/* High-Tensile J-Bolts Foundation Assembly */}
                  <path d="M106 478 L106 535 L94 535" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M214 478 L214 535 L226 535" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M125 478 L125 535 L113 535" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M195 478 L195 535 L207 535" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

                  {/* Ground Level Civil Concrete Boundary */}
                  <line x1="50" y1="490" x2="270" y2="490" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
                  <text x="10" y="495" fontSize="9" fontWeight="bold" fill="currentColor">G.L. Ground Level</text>
                  <text x="235" y="530" fontSize="9" fontWeight="bold" fill="#10b981">6–16x Anchor Bolts</text>
                </svg>
              </div>

              {/* Right Side: Technical Specification Table */}
              <div className="lg:col-span-6 flex flex-col justify-center text-left">
                <div className="mb-2.5">
                  <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-ssil-red block mb-0.5">
                    HIGH MAST
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
                          <th className="py-2.5 px-3.5 sm:px-4 w-1/2">High Mast Structure</th>
                          <th className="py-2.5 px-3.5 sm:px-4 w-1/2">Technical Specification</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/80 font-medium text-slate-800 dark:text-slate-200">
                        {highMastBlueprintSpecs.map((spec, idx) => (
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
                      Seamless Polygonal Construction
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 leading-relaxed">
                      Folded from high-tensile BSEN10025 S355 grade steel plates with robotic submerged arc longitudinal welding.
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Winch-Operated Lowering Mechanism
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 leading-relaxed">
                      Integrated dual-drum motorized winch system with SS 316 wire ropes for effortless ground-level luminaire servicing.
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Hot-Dip Galvanization
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 leading-relaxed">
                      Full internal and external anti-corrosive zinc bath immersion complying with IS 2629, IS 4759 and BS EN ISO 1461.
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Structural &amp; Quality Control
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 leading-relaxed">
                      Rigorous ultrasonic weld testing, zinc thickness validation, and dynamic wind deflection calculations.
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
                      Wide-Area Illumination (12M–40M)
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 leading-relaxed">
                      Engineered heights designed to illuminate vast transport hubs, expressway intersections, and ports uniformly.
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Multi-Luminaire Headframe
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 leading-relaxed">
                      Versatile symmetrical or asymmetrical headframes capable of housing 6 to 32+ high-power LED floodlights.
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Ground-Level Safe Servicing
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 leading-relaxed">
                      Eliminates the danger and expense of aerial bucket trucks through reliable mechanical headframe lowering.
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
                      Extreme Wind &amp; Weather Resilience
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 leading-relaxed">
                      Dynamic polygonal aerodynamics certified to withstand intense wind loads up to 180+ km/h without structural fatigue.
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Maximum Cost &amp; Energy Efficiency
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 leading-relaxed">
                      Replaces multiple smaller street poles with single tower installations, drastically cutting civil and cabling costs.
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      25+ Years Design Service Life
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 leading-relaxed">
                      In-house continuous immersion galvanizing ensures multi-decade structural durability with virtually zero rust maintenance.
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Modular Transportation &amp; Erection
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 leading-relaxed">
                      Telescopic slip-joint sections enable streamlined road transport and quick hydraulic on-site assembly.
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
                Explore our complete range of lighting poles, high masts, and infrastructure solutions.
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
