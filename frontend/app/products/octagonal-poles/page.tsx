"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Zap,
  Layers,
  Wrench,
  CheckCircle2,
  FileText,
  PhoneCall,
  Download,
  Building,
  Trees,
  Compass,
  ArrowRight,
  Eye,
  Sliders,
  Sun,
  Moon,
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
  category: "urban" | "highway" | "heavy";
}

const poleSpecifications: PoleSpec[] = [
  {
    poleType: "KOP03",
    height: 3,
    topDia: 70,
    bottomDia: 130,
    sheetThk: 3,
    basePlate: "200x200x12",
    foundationBolt: "4x16x450",
    category: "urban",
  },
  {
    poleType: "KOP04",
    height: 4,
    topDia: 70,
    bottomDia: 130,
    sheetThk: 3,
    basePlate: "200x200x12",
    foundationBolt: "4x16x450",
    category: "urban",
  },
  {
    poleType: "KOP05",
    height: 5,
    topDia: 70,
    bottomDia: 130,
    sheetThk: 3,
    basePlate: "200x200x12",
    foundationBolt: "4x16x450",
    category: "urban",
  },
  {
    poleType: "KOP06",
    height: 6,
    topDia: 70,
    bottomDia: 130,
    sheetThk: 3,
    basePlate: "200x200x12",
    foundationBolt: "4x16x600",
    category: "urban",
  },
  {
    poleType: "KOP07",
    height: 7,
    topDia: 70,
    bottomDia: 130,
    sheetThk: 3,
    basePlate: "220x220x12",
    foundationBolt: "4x20x600",
    category: "highway",
  },
  {
    poleType: "KOP08",
    height: 8,
    topDia: 70,
    bottomDia: 135,
    sheetThk: 3,
    basePlate: "225x225x12",
    foundationBolt: "4x20x700",
    category: "highway",
  },
  {
    poleType: "KOP09",
    height: 9,
    topDia: 70,
    bottomDia: 155,
    sheetThk: 3,
    basePlate: "250x250x12",
    foundationBolt: "4x20x700",
    category: "highway",
  },
  {
    poleType: "KOP010",
    height: 10,
    topDia: 70,
    bottomDia: 155,
    sheetThk: 3,
    basePlate: "250x250x16",
    foundationBolt: "4x24x750",
    category: "highway",
  },
  {
    poleType: "KOP011",
    height: 11,
    topDia: 70,
    bottomDia: 175,
    sheetThk: 3,
    basePlate: "275x275x16",
    foundationBolt: "4x24x750",
    category: "heavy",
  },
  {
    poleType: "KOP012",
    height: 12,
    topDia: 70,
    bottomDia: 175,
    sheetThk: 3,
    basePlate: "275x275x16",
    foundationBolt: "4x24x750",
    category: "heavy",
  },
  {
    poleType: "KOP013",
    height: 13,
    topDia: 125,
    bottomDia: 270,
    sheetThk: 3,
    basePlate: "340x340x20",
    foundationBolt: "4x24x900",
    category: "heavy",
  },
];

const applications = [
  {
    num: "01",
    title: "Expressways & Highways",
    desc: "Engineered to withstand high wind velocity and heavy vibrations for state & national highway corridors.",
    icon: <Layers className="h-5 w-5 sm:h-6 sm:w-6" />,
  },
  {
    num: "02",
    title: "Municipal & Smart City Roads",
    desc: "Clean geometric profiles delivering uniform illumination and integrated cabling channels for urban streets.",
    icon: <Building className="h-5 w-5 sm:h-6 sm:w-6" />,
  },
  {
    num: "03",
    title: "Industrial & Manufacturing Plants",
    desc: "Heavy-duty corrosion-resistant galvanized structures designed for chemical plants, refineries, and freight hubs.",
    icon: <Wrench className="h-5 w-5 sm:h-6 sm:w-6" />,
  },
  {
    num: "04",
    title: "Commercial Complexes & IT Parks",
    desc: "Contemporary architectural octagonal aesthetics blending structural stability with premium perimeter illumination.",
    icon: <Zap className="h-5 w-5 sm:h-6 sm:w-6" />,
  },
  {
    num: "05",
    title: "Residential Townships & Plazas",
    desc: "Vandal-resistant poles providing secure pathway guidance, internal MCB doors, and smart lighting controls.",
    icon: <Trees className="h-5 w-5 sm:h-6 sm:w-6" />,
  },
  {
    num: "06",
    title: "Public Infrastructure & Ports",
    desc: "In-house hot-dip galvanized finish exceeding 86 microns for extreme maritime and coastal atmospheric durability.",
    icon: <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6" />,
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.21, 0.47, 0.32, 0.98],
      staggerChildren: 0.08,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export default function OctagonalPolesPage() {
  const [selectedHeightFilter, setSelectedHeightFilter] = useState<"all" | "urban" | "highway" | "heavy">("all");
  const [isNightModePreview, setIsNightModePreview] = useState(false);
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

  const filteredSpecs = poleSpecifications.filter((spec) => {
    if (selectedHeightFilter === "all") return true;
    return spec.category === selectedHeightFilter;
  });

  return (
    <div className="relative min-h-screen w-full bg-white dark:bg-black text-slate-900 dark:text-white transition-colors duration-300 overflow-hidden">
      
      {/* ============================================================ */}
      {/* 1. BREADCRUMB & TOP NAVIGATION BAR */}
      {/* ============================================================ */}
      <div className="pt-24 pb-4 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-b border-slate-200/80 dark:border-zinc-800/80 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          <Link href="/products" className="hover:text-ssil-red transition-colors flex items-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Products</span>
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400 dark:text-slate-600" />
          <span className="text-slate-900 dark:text-white font-bold">Octagonal Poles</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-ssil-red border border-ssil-red/30 px-3 py-1 rounded-full bg-ssil-red/10">
            OFFICIAL SSIL PRODUCT
          </span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. PRODUCT HERO SECTION */}
      {/* ============================================================ */}
      <motion.section
        className="relative py-12 sm:py-16 lg:py-20 overflow-hidden border-b border-slate-200 dark:border-zinc-900"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content Column */}
            <motion.div variants={childVariants} className="lg:col-span-7 space-y-6 text-left">
              
              <div className="space-y-3">
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-slate-900 dark:text-slate-200 block">
                  HEAVY-DUTY INFRASTRUCTURE
                </span>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-[1.05]">
                  GI OCTAGONAL <br />
                  <span className="text-ssil-red">POLES.</span>
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-2xl">
                  Precision-engineered hot-dip galvanized octagonal poles designed for high strength, structural reliability, corrosion resistance, and dependable outdoor lighting across modern expressways and municipal corridors.
                </p>
              </div>

              {/* Quick Specification Badges Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-100/90 dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                    Height Range
                  </span>
                  <span className="text-sm sm:text-base font-black text-slate-900 dark:text-white mt-0.5 block">
                    3M to 13M
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-100/90 dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                    Coating
                  </span>
                  <span className="text-sm sm:text-base font-black text-slate-900 dark:text-white mt-0.5 block">
                    Hot-Dip (HDG)
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-100/90 dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                    Material Grade
                  </span>
                  <span className="text-sm sm:text-base font-black text-slate-900 dark:text-white mt-0.5 block">
                    High-Tensile
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-100/90 dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                    Wind Resistance
                  </span>
                  <span className="text-sm sm:text-base font-black text-ssil-red mt-0.5 block">
                    180+ km/h
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Button
                  onClick={() => openEnquiry()}
                  size="lg"
                  className="bg-ssil-red hover:bg-ssil-red-600 text-white font-bold px-7 py-3 rounded-full text-xs sm:text-sm shadow-lg shadow-ssil-red/25 hover:shadow-ssil-red/40 transition-all duration-300"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Request Technical Quotation
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-slate-300 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-900 font-bold px-6 py-3 rounded-full text-xs sm:text-sm"
                >
                  <Link href="#technical-data-sheet">
                    <span>View 3M–13M Data Sheet</span>
                  </Link>
                </Button>
              </div>

            </motion.div>

            {/* Right Interactive Image Showcase Column */}
            <motion.div variants={childVariants} className="lg:col-span-5">
              <div className="relative rounded-2xl sm:rounded-3xl border-2 border-slate-200 dark:border-zinc-800 overflow-hidden shadow-2xl bg-slate-900 group">
                
                {/* Day / Night Product Image */}
                <div className="relative aspect-[4/5] w-full">
                  <img
                    src={
                      isNightModePreview
                        ? "/images/products/homepage/product-05/night.png"
                        : "/images/products/homepage/product-05/day.png"
                    }
                    alt="SSIL Hot-Dip Galvanized Octagonal Pole"
                    className="w-full h-full object-cover object-center transition-all duration-700 ease-in-out group-hover:scale-105"
                  />
                  
                  {/* Subtle Gradient Shadow Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                  {/* Day / Night Toggle Pill */}
                  <div className="absolute top-4 right-4 z-20 flex items-center p-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 shadow-lg">
                    <button
                      type="button"
                      onClick={() => setIsNightModePreview(false)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                        !isNightModePreview
                          ? "bg-white text-slate-950 shadow-sm"
                          : "text-slate-300 hover:text-white"
                      }`}
                    >
                      <Sun className="h-3.5 w-3.5 text-amber-500" />
                      <span>Day</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsNightModePreview(true)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                        isNightModePreview
                          ? "bg-ssil-red text-white shadow-sm"
                          : "text-slate-300 hover:text-white"
                      }`}
                    >
                      <Moon className="h-3.5 w-3.5 text-amber-200" />
                      <span>Night</span>
                    </button>
                  </div>

                  {/* Bottom Caption Pill */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between p-3.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 text-white">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-ssil-red block">
                        SSIL INFRASTRUCTURE SERIES
                      </span>
                      <span className="text-xs sm:text-sm font-black">
                        Octagonal Pole (3M to 13M Range)
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-300 bg-white/10 px-2.5 py-1 rounded-md border border-white/10">
                      HDG Galvanized
                    </span>
                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </motion.section>

      {/* ============================================================ */}
      {/* 3. PRODUCT OVERVIEW & ENGINEERING EXCELLENCE */}
      {/* ============================================================ */}
      <motion.section
        className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border-b border-slate-200 dark:border-zinc-900 transition-colors"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Header Column */}
            <motion.div variants={childVariants} className="lg:col-span-5 space-y-3">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-slate-900 dark:text-slate-200 block">
                PRODUCT OVERVIEW
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-[1.1]">
                STRUCTURAL RELIABILITY.<br />
                <span className="text-ssil-red">BUILT TO LAST.</span>
              </h2>
              <div className="w-16 h-1 bg-ssil-red rounded-full mt-2" />
            </motion.div>

            {/* Description Paragraphs Column */}
            <motion.div variants={childVariants} className="lg:col-span-7 space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed font-normal text-sm sm:text-base">
              <p>
                We use high-grade raw steel materials to manufacture hot-dip galvanized octagonal poles engineered for high strength, structural stability, and an extended operational service life.
              </p>
              <p>
                The continuously tapered octagonal geometry provides superior torsional resistance against dynamic wind loading, ensuring structural integrity in expressways, open terrains, and high-wind civic zones.
              </p>
              <p>
                Equipped with flush weatherproof junction doors, internal cable channels, and precision-welded base plates with anchor bolt stiffeners, SSIL&apos;s octagonal poles combine functional excellence with clean, modern architectural aesthetics.
              </p>
            </motion.div>

          </div>

          {/* 4 Architectural Engineering Metrics */}
          <motion.div variants={childVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-200/90 dark:border-zinc-800/90">
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 shadow-sm text-left">
              <span className="text-3xl sm:text-4xl font-black text-ssil-red block">3M–13M</span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mt-1 block">Dimensional Range</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block">Standard &amp; custom lengths</span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 shadow-sm text-left">
              <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white block">86+ µm</span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mt-1 block">Galvanizing Thickness</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block">Exceeds IS 2629 / IS 4759</span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 shadow-sm text-left">
              <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white block">180 km/h</span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mt-1 block">Wind Load Tested</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block">IS 875 wind velocity verified</span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 shadow-sm text-left">
              <span className="text-3xl sm:text-4xl font-black text-ssil-red block">25+ Yrs</span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mt-1 block">Design Service Life</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block">Zero recurring maintenance</span>
            </div>
          </motion.div>

        </div>
      </motion.section>

      {/* ============================================================ */}
      {/* 4. TECHNICAL DATA SHEET (ACCURATE 3M TO 13M TABLE) */}
      {/* ============================================================ */}
      <motion.section
        id="technical-data-sheet"
        className="py-16 sm:py-20 md:py-24 bg-white dark:bg-black text-slate-900 dark:text-white border-b border-slate-200 dark:border-zinc-900 transition-colors"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-10 gap-4 pb-6 border-b border-slate-200/90 dark:border-zinc-800/90">
            <motion.div variants={childVariants} className="max-w-3xl">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-slate-900 dark:text-slate-200 block mb-2">
                DIMENSIONAL SPECIFICATIONS
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-[1.08]">
                TECHNICAL DATA <span className="text-ssil-red">SHEET.</span>
              </h2>
              <p className="mt-2 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl">
                SSIL offers high-quality Hot Dip Galvanized (HDG) Octagonal Poles ranging from 3 meters to 13 meters in height. All dimensions comply strictly with national highway and municipal infrastructure engineering guidelines.
              </p>
            </motion.div>

            {/* Filter Pills */}
            <motion.div variants={childVariants} className="flex flex-wrap items-center gap-1.5 sm:gap-2 self-start lg:self-end">
              <button
                type="button"
                onClick={() => setSelectedHeightFilter("all")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedHeightFilter === "all"
                    ? "bg-ssil-red text-white shadow-sm"
                    : "bg-slate-100 dark:bg-zinc-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-zinc-800"
                }`}
              >
                All 3M–13M ({poleSpecifications.length})
              </button>
              <button
                type="button"
                onClick={() => setSelectedHeightFilter("urban")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedHeightFilter === "urban"
                    ? "bg-ssil-red text-white shadow-sm"
                    : "bg-slate-100 dark:bg-zinc-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-zinc-800"
                }`}
              >
                Urban (3M–6M)
              </button>
              <button
                type="button"
                onClick={() => setSelectedHeightFilter("highway")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedHeightFilter === "highway"
                    ? "bg-ssil-red text-white shadow-sm"
                    : "bg-slate-100 dark:bg-zinc-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-zinc-800"
                }`}
              >
                Highway (7M–10M)
              </button>
              <button
                type="button"
                onClick={() => setSelectedHeightFilter("heavy")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedHeightFilter === "heavy"
                    ? "bg-ssil-red text-white shadow-sm"
                    : "bg-slate-100 dark:bg-zinc-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-zinc-800"
                }`}
              >
                Heavy-Duty (11M–13M)
              </button>
            </motion.div>
          </div>

          {/* Master Technical Specifications Table Container */}
          <motion.div
            variants={childVariants}
            className="w-full rounded-2xl border-2 border-slate-200 dark:border-zinc-800 overflow-hidden shadow-xl bg-white dark:bg-zinc-950"
          >
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr className="bg-slate-900 text-white text-xs font-extrabold uppercase tracking-wider border-b border-slate-800">
                    <th className="py-4 px-4 sm:px-6">POLE TYPE</th>
                    <th className="py-4 px-3 sm:px-4">HEIGHT (Mtr)</th>
                    <th className="py-4 px-3 sm:px-4">TOP DIA (mm)</th>
                    <th className="py-4 px-3 sm:px-4">BOTTOM DIA (mm)</th>
                    <th className="py-4 px-3 sm:px-4">SHEET THK (mm)</th>
                    <th className="py-4 px-3 sm:px-4">BASE PLATE LxWxT (mm)</th>
                    <th className="py-4 px-3 sm:px-4">FOUNDATION BOLT (No.xDiaxmm)</th>
                    <th className="py-4 px-4 sm:px-6 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-zinc-800 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                  {filteredSpecs.map((row, idx) => (
                    <tr
                      key={row.poleType}
                      className="group hover:bg-ssil-red/5 dark:hover:bg-zinc-900/80 transition-colors"
                    >
                      <td className="py-3.5 px-4 sm:px-6 font-black text-slate-900 dark:text-white group-hover:text-ssil-red transition-colors flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                        {row.poleType}
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 font-bold text-slate-900 dark:text-white">
                        {row.height} M
                      </td>
                      <td className="py-3.5 px-3 sm:px-4">{row.topDia} mm</td>
                      <td className="py-3.5 px-3 sm:px-4">{row.bottomDia} mm</td>
                      <td className="py-3.5 px-3 sm:px-4">{row.sheetThk} mm</td>
                      <td className="py-3.5 px-3 sm:px-4 font-mono text-[11px] sm:text-xs">
                        {row.basePlate}
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 font-mono text-[11px] sm:text-xs text-slate-600 dark:text-slate-400">
                        {row.foundationBolt}
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-right">
                        <Button
                          size="sm"
                          onClick={() => openEnquiry(`${row.poleType} (${row.height}M Octagonal Pole)`)}
                          className="bg-slate-100 dark:bg-zinc-800 hover:bg-ssil-red hover:text-white text-slate-900 dark:text-white text-[11px] font-bold px-3 py-1 rounded-full border border-slate-300 dark:border-zinc-700 transition-all"
                        >
                          Enquire
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer Note */}
            <div className="p-4 bg-slate-50 dark:bg-zinc-900/50 border-t border-slate-200 dark:border-zinc-800 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-ssil-red shrink-0" />
                Custom bracket outreaches (Single Arm / Double Arm / Four Arm) available for all pole heights.
              </span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Standard: IS 2062 / IS 5986 Steel Grade
              </span>
            </div>
          </motion.div>

        </div>
      </motion.section>

      {/* ============================================================ */}
      {/* 5. TECHNICAL DRAWING & STRUCTURAL SCHEMATIC */}
      {/* ============================================================ */}
      <motion.section
        className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border-b border-slate-200 dark:border-zinc-900 transition-colors"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          
          <div className="max-w-4xl mb-10 sm:mb-12">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-slate-900 dark:text-slate-200 block mb-2">
              ENGINEERING BLUEPRINT
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-[1.1]">
              DRAWING OF GI <br />
              <span className="text-ssil-red">OCTAGONAL POLE.</span>
            </h2>
            <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl">
              Our comprehensive Octagonal Pole engineering design covers 3M to 13M heights, highlighting structural taper geometry, flush weatherproof door opening, foundation anchor bolts, and civil concrete footing dimensions.
            </p>
          </div>

          {/* Technical Drawing Blueprint Representation */}
          <motion.div
            variants={childVariants}
            className="w-full rounded-2xl sm:rounded-3xl border-2 border-slate-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 md:p-10 shadow-xl overflow-hidden relative"
          >
            {/* Blueprint Grid Lines Background Accent */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Visual Schematic Column */}
              <div className="lg:col-span-6 flex items-center justify-center p-6 bg-slate-100/80 dark:bg-black/60 rounded-2xl border border-slate-200 dark:border-zinc-800">
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

              {/* Technical Blueprint Key Details */}
              <div className="lg:col-span-6 space-y-4 text-left">
                <div className="border-l-4 border-ssil-red pl-4 space-y-1">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-ssil-red">
                    CAD SPECIFICATIONS &amp; GEOMETRY
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    Tapered 8-Sided Structural Cross-Section
                  </h3>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <div className="p-3.5 rounded-xl bg-slate-100/70 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-800 space-y-1">
                    <span className="font-bold text-slate-900 dark:text-white block">
                      1. Continuous Taper Shaft
                    </span>
                    <p className="text-slate-600 dark:text-slate-400">
                      Manufactured from single-sheet folded high-tensile steel with single longitudinal submerged arc automated welding.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-100/70 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-800 space-y-1">
                    <span className="font-bold text-slate-900 dark:text-white block">
                      2. Flush Weatherproof Inspection Door
                    </span>
                    <p className="text-slate-600 dark:text-slate-400">
                      Vandal-resistant door opening with rubber gasket sealing and internal DIN rail for MCB and terminal connection block.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-100/70 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-800 space-y-1">
                    <span className="font-bold text-slate-900 dark:text-white block">
                      3. Base Plate &amp; Civil Anchorage
                    </span>
                    <p className="text-slate-600 dark:text-slate-400">
                      High-strength base plate with pre-drilled slotted holes and 4 high-tensile hot-dip galvanized J-bolt foundation anchor assemblies.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    onClick={() => openEnquiry("Octagonal Pole CAD & Tender Drawing Request")}
                    className="bg-ssil-red hover:bg-ssil-red-600 text-white font-bold px-6 py-2.5 rounded-full text-xs shadow-md"
                  >
                    <Download className="mr-2 h-3.5 w-3.5" />
                    Request Master CAD Drawing
                  </Button>
                </div>

              </div>

            </div>
          </motion.div>

        </div>
      </motion.section>

      {/* ============================================================ */}
      {/* 6. KEY FEATURES & MANUFACTURING (3-CARD ARCHITECTURE FROM ABOUT US) */}
      {/* ============================================================ */}
      <motion.section
        className="py-16 sm:py-20 md:py-24 bg-white dark:bg-black text-slate-900 dark:text-white border-b border-slate-200 dark:border-zinc-900 transition-colors"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          
          <div className="max-w-4xl mb-12 sm:mb-14">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-slate-900 dark:text-slate-200 block mb-2">
              MANUFACTURING &amp; ENGINEERING
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-[1.08]">
              PRODUCT SPECIFICATIONS &amp;<br />
              <span className="text-ssil-red">MANUFACTURING.</span>
            </h2>
          </div>

          {/* 3 Premium Specification Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 text-left">
            
            {/* Card 01 — TECHNICAL */}
            <motion.div
              variants={childVariants}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="group p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-50 dark:bg-zinc-900/80 border-2 border-slate-200 dark:border-zinc-800 hover:border-ssil-red/60 transition-all duration-300 shadow-lg relative overflow-hidden flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-zinc-800">
                  <span className="text-3xl sm:text-4xl font-extralight text-ssil-red">01</span>
                  <span className="text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-300 bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 px-3 py-1 rounded-full">
                    TECHNICAL
                  </span>
                </div>

                <div className="space-y-3.5 text-xs sm:text-sm">
                  <div className="space-y-1">
                    <h4 className="font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Automated Welding &amp; Bending
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3">
                      Delivers consistent manufacturing quality, robotic bending accuracy, and high structural fatigue resistance.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      CNC Cutting &amp; Drilling
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3">
                      Enables precise taper geometry and accurate base plate bolt hole placements for seamless site erection.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Surface Treatment
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3">
                      Heavy-duty hot-dip galvanization (HDG) coating exceeding 86 microns for maximum atmospheric corrosion protection.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Quality Control
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3">
                      Rigorous in-house testing focusing on weld penetration, zinc coating adhesion, and dimensional compliance.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 02 — KEY FEATURES */}
            <motion.div
              variants={childVariants}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="group p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-50 dark:bg-zinc-900/80 border-2 border-slate-200 dark:border-zinc-800 hover:border-ssil-red/60 transition-all duration-300 shadow-lg relative overflow-hidden flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-zinc-800">
                  <span className="text-3xl sm:text-4xl font-extralight text-ssil-red">02</span>
                  <span className="text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-300 bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 px-3 py-1 rounded-full">
                    KEY FEATURES
                  </span>
                </div>

                <div className="space-y-3.5 text-xs sm:text-sm">
                  <div className="space-y-1">
                    <h4 className="font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Custom Heights &amp; Shapes
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3">
                      Available from 3m to 13m in standard modular dimensions according to project tender requirements.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Modular Construction
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3">
                      Single-piece tapered fabrication or multi-section slip joint configurations for efficient transport.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Mounting Provisions
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3">
                      Provisions for single-arm, double-arm, four-way floodlight crossarms, and surveillance camera attachments.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Brand &amp; Origin
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 font-bold text-ssil-red">
                      SSIL (Shiv Shakti India Limited) — Manufactured in India.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 03 — PRODUCT ADVANTAGE */}
            <motion.div
              variants={childVariants}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="group p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-50 dark:bg-zinc-900/80 border-2 border-slate-200 dark:border-zinc-800 hover:border-ssil-red/60 transition-all duration-300 shadow-lg relative overflow-hidden flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-zinc-800">
                  <span className="text-3xl sm:text-4xl font-extralight text-ssil-red">03</span>
                  <span className="text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-300 bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 px-3 py-1 rounded-full">
                    PRODUCT ADVANTAGE
                  </span>
                </div>

                <div className="space-y-3.5 text-xs sm:text-sm">
                  <div className="space-y-1">
                    <h4 className="font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Superior Durability
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3">
                      Zinc metallurgical bonding provides sacrificial cathodic protection against rust and environmental damage.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Design Flexibility
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3">
                      Versatile structural platform adapted across street lighting, security camera poles, and highway luminaires.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Cost Efficiency
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3">
                      Zero recurring painting overheads and fast civil installation maximize lifecycle return on investment.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Sustainability
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3">
                      100% recyclable high-grade structural steel supporting eco-friendly green infrastructure goals.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </motion.section>

      {/* ============================================================ */}
      {/* 7. APPLICATIONS & PROJECT SUITABILITY */}
      {/* ============================================================ */}
      <motion.section
        className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border-b border-slate-200 dark:border-zinc-900 transition-colors"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          
          <div className="max-w-4xl mb-10 sm:mb-12">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-slate-900 dark:text-slate-200 block mb-2">
              PROJECT SUITABILITY
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-[1.1]">
              OCTAGONAL POLE <br />
              <span className="text-ssil-red">APPLICATIONS.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 text-left">
            {applications.map((app) => (
              <motion.div
                key={app.num}
                variants={childVariants}
                className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-3 group hover:border-ssil-red/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-ssil-red font-mono">{app.num}</span>
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 group-hover:bg-ssil-red group-hover:text-white transition-colors">
                    {app.icon}
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
                  {app.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  {app.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </motion.section>

      {/* ============================================================ */}
      {/* 8. CTA SECTION (TALK TO SSIL FOR TENDER & SUPPLY) */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-20 bg-white dark:bg-black text-slate-900 dark:text-white transition-colors relative overflow-hidden">
        
        {/* Ambient Red Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-ssil-red/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-5xl relative z-10">
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 dark:bg-zinc-900 border-2 border-slate-200 dark:border-zinc-800 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8 text-left group hover:border-ssil-red/50 transition-all duration-300">
            
            <div className="absolute top-0 left-0 bottom-0 w-2 bg-ssil-red" />

            <div className="space-y-3 max-w-xl">
              <span className="text-xs font-black uppercase tracking-widest text-ssil-red block">
                PROJECT PROCUREMENT &amp; TENDERS
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-tight">
                Need Octagonal Poles for Your Project?
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
                Talk to SSIL about project-specific heights, custom outreach arm configurations, technical data sheets, and supply requirements across India.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
              <Button
                onClick={() => openEnquiry("Octagonal Pole Project Quotation")}
                size="lg"
                className="bg-ssil-red hover:bg-ssil-red-600 text-white font-bold px-8 py-3.5 rounded-full text-xs sm:text-sm shadow-lg shadow-ssil-red/25 hover:shadow-ssil-red/40 transition-all duration-300"
              >
                <FileText className="mr-2 h-4 w-4" />
                Request a Quote
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-slate-300 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-800 font-bold px-8 py-3.5 rounded-full text-xs sm:text-sm"
              >
                <Link href="/contact" className="flex items-center justify-center gap-2">
                  <span>Contact SSIL Team</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 9. PRODUCT ENQUIRY MODAL */}
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
