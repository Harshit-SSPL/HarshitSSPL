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
import { useResilientImage } from "@/lib/use-resilient-image";
import { IMAGE_PRESETS } from "@/lib/cloudinary";
import Image from "next/image";

interface CameraPoleSpecRow {
  parameter: string;
  m3: string;
  m4: string;
  m5: string;
  m6: string;
  m7: string;
  m8: string;
  m10: string;
  isProductId?: boolean;
}

const cameraPoleSpecifications: CameraPoleSpecRow[] = [
  {
    parameter: "PRODUCT ID",
    m3: "SSILCP01",
    m4: "SSILCP02",
    m5: "SSILCP03",
    m6: "SSILCP04",
    m7: "SSILCP05",
    m8: "SSILCP06",
    m10: "SSILCP07",
    isProductId: true,
  },
  {
    parameter: "Thickness",
    m3: "3 mm",
    m4: "3 mm",
    m5: "3 mm",
    m6: "3, 4 mm",
    m7: "3, 4 mm",
    m8: "4 mm",
    m10: "4, 5 mm",
  },
  {
    parameter: "Top & Bottom Dia",
    m3: "70 / 130 mm",
    m4: "70 / 130 mm",
    m5: "70 / 135 mm",
    m6: "76 / 145 mm",
    m7: "76 / 155 mm",
    m8: "90 / 175 mm",
    m10: "100 / 200 mm",
  },
  {
    parameter: "Camera Arm Outreach",
    m3: "0.5 – 1.0 M",
    m4: "0.5 – 1.2 M",
    m5: "0.8 – 1.5 M",
    m6: "1.0 – 2.0 M",
    m7: "1.0 – 2.5 M",
    m8: "1.5 – 3.0 M",
    m10: "1.5 – 3.5 M",
  },
  {
    parameter: "Size of Base Plate",
    m3: "200 x 200 mm",
    m4: "200 x 200 mm",
    m5: "220 x 220 mm",
    m6: "240 x 240 mm",
    m7: "260 x 260 mm",
    m8: "280 x 280 mm",
    m10: "320 x 320 mm",
  },
  {
    parameter: "Base Plate Thickness",
    m3: "12 mm",
    m4: "12 mm",
    m5: "12 mm",
    m6: "16 mm",
    m7: "16 mm",
    m8: "16 mm",
    m10: "20 mm",
  },
  {
    parameter: "No. of Foundation Bolts",
    m3: "4 nos (M16)",
    m4: "4 nos (M16)",
    m5: "4 nos (M16)",
    m6: "4 nos (M20)",
    m7: "4 nos (M20)",
    m8: "4 nos (M24)",
    m10: "4 nos (M24)",
  },
];

interface BlueprintTechSpec {
  property: string;
  value: string;
}

const cameraPoleBlueprintSpecs: BlueprintTechSpec[] = [
  {
    property: "Structure",
    value: "Anti-Vibration Tapered Polygonal / Stepped Mast",
  },
  {
    property: "Camera Bracket Arm",
    value: "Cantilever Outreach / Crossarm / Omni-Directional Mount",
  },
  {
    property: "Camera Compatibility",
    value: "ANPR / PTZ Bullet / 360° Dome / Radar & Speed Sensors",
  },
  {
    property: "Deflection Tolerance",
    value: "Low-Vibration Structural Engineering (<0.5° under high wind)",
  },
  {
    property: "Material Construction",
    value: "BSEN10025 S355 / IS 2062 High-Tensile Steel",
  },
  {
    property: "Height Range",
    value: "3M to 10M (Single Section / Modular Assembly)",
  },
  {
    property: "Cross Sectional Geometry",
    value: "Octagonal / Conical / Stepped Cylindrical",
  },
  {
    property: "Surface Protection Treatment",
    value: "Hot-Dip Galvanized in-house (IS 4759 / IS 2629 / BS EN ISO 1461)",
  },
  {
    property: "Galvanization Thickness",
    value: "Minimum 86 Micron Surface Coating",
  },
  {
    property: "Optional Finish",
    value: "Pure Polyester Powder Coating / UV-Resistant PU Paint",
  },
  {
    property: "Wind Speed Resistance",
    value: "Designed up to 180+ km/h (As Per IS 875 Part 3)",
  },
  {
    property: "Door Compartment",
    value: "Weatherproof Flush Door with Concealed Lock & Earthing Stud",
  },
  {
    property: "Base Plate Design",
    value: "Square Flanged Steel Base with Radial Corner Gussets",
  },
  {
    property: "Civil Anchor Assembly",
    value: "High-Tensile Foundation J-Bolts (IS 2062 Gr. E250A / Gr. 8.8)",
  },
  {
    property: "Internal Cabling Conduit",
    value: "Integrated Smooth Cable Grommets & Internal Wiring Channel",
  },
  {
    property: "Solar Compatibility",
    value: "Accommodates Solar PV Array Bracket & Battery Enclosure",
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

export default function CameraPolesPage() {
  const [bannerImage, setBannerImage] = useState(NEUTRAL_BANNER_PLACEHOLDER);
  const [dayImage, setDayImage] = useState(NEUTRAL_PRODUCT_PLACEHOLDER);
  const [nightImage, setNightImage] = useState(NEUTRAL_PRODUCT_PLACEHOLDER);
  const [enquiryState, setEnquiryState] = useState<{
    isOpen: boolean;
    productCategory: string;
    productModel: string;
  }>({
    isOpen: false,
    productCategory: "Camera Poles",
    productModel: "",
  });

  React.useEffect(() => {
    const fetchProductData = async () => {
      try {
        const data = await fetchApi("/products/camera-poles");
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
      productCategory: "Camera Poles",
      productModel: modelName || "Standard Camera Pole (3M–10M)",
    });
  };

  const resilientHero = useResilientImage({
    liveSrc: bannerImage,
    keyOptions: { type: "hero", slug: "camera-poles", variant: "hero" },
    placeholderType: "banner",
    transformOptions: IMAGE_PRESETS.HERO.transform,
    responsiveWidths: IMAGE_PRESETS.HERO.widths,
    sizes: IMAGE_PRESETS.HERO.sizes,
  });

  const resilientDay = useResilientImage({
    liveSrc: dayImage,
    keyOptions: { type: "product", slug: "camera-poles", variant: "day" },
    placeholderType: "product",
    transformOptions: IMAGE_PRESETS.SHOWCASE.transform,
    responsiveWidths: IMAGE_PRESETS.SHOWCASE.widths,
    sizes: IMAGE_PRESETS.SHOWCASE.sizes,
  });

  const resilientNight = useResilientImage({
    liveSrc: nightImage || dayImage,
    keyOptions: { type: "product", slug: "camera-poles", variant: "night" },
    placeholderType: "product",
    transformOptions: IMAGE_PRESETS.SHOWCASE.transform,
    responsiveWidths: IMAGE_PRESETS.SHOWCASE.widths,
    sizes: IMAGE_PRESETS.SHOWCASE.sizes,
  });

  return (
    <div className="relative min-h-screen w-full bg-white dark:bg-black text-slate-900 dark:text-white transition-colors duration-300 overflow-hidden">
      
      {/* ============================================================ */}
      {/* 1. PRODUCT HERO BANNER */}
      {/* ============================================================ */}
      <section className="relative z-10 w-full h-[54vh] sm:h-[62vh] max-h-[540px] flex flex-col justify-between overflow-hidden rounded-none pt-24 pb-10 sm:pb-12 bg-slate-950">
        {/* Full-bleed Background Image */}
        <img
          src={resilientHero.src}
          srcSet={resilientHero.srcSet}
          sizes={resilientHero.sizes}
          alt="Camera Poles SSIL Hero"
          width={1920}
          height={540}
          className="absolute inset-0 w-full h-full object-cover object-center rounded-none"
          loading="eager"
          decoding="async"
          onLoad={resilientHero.onLoad}
          onError={resilientHero.onError}
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
            <span className="text-ssil-red">Camera Poles</span>
          </div>
        </div>

        {/* Bottom Content Container */}
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 text-left flex flex-col items-start">
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-ssil-red block mb-1">
            SSIL LUMINAIRES &amp; POLES
          </span>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight max-w-4xl drop-shadow-md">
            Camera Poles
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-slate-200 font-medium max-w-2xl leading-relaxed drop-shadow-xs">
            Rigid vibration-resistant smart surveillance and ANPR camera mounting poles.
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
                Custom-built heavy-duty CCTV and traffic surveillance poles engineered with low-vibration deflection, internal cabling channels, and weatherproof junction compartments for smart city monitoring.
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
                  CAMERA <br />
                  <span className="text-ssil-red">POLES.</span>
                </h1>

                {/* 3 Product-Value Bullet Points */}
                <div className="space-y-2.5 pt-1 max-w-2xl text-left">
                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0 mt-2" />
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                      Precision-engineered camera poles designed for reliable surveillance infrastructure across highways, industrial facilities, parking areas, public spaces, commercial properties, and remote monitoring locations. Manufactured for structural stability, corrosion resistance, dependable camera mounting, and long-term outdoor performance.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0 mt-2" />
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                      Designed for stable CCTV and surveillance camera mounting with configurations suitable for different camera types, heights, angles, and monitoring requirements.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0 mt-2" />
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                      Available in standard, solar-compatible, and heavy-duty configurations for urban, industrial, highway, parking, infrastructure, and remote surveillance applications.
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
                    src={resilientDay.src}
                    srcSet={resilientDay.srcSet}
                    sizes={resilientDay.sizes}
                    alt="SSIL Smart Surveillance Camera Pole Daytime"
                    width={600}
                    height={700}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    onLoad={resilientDay.onLoad}
                    onError={resilientDay.onError}
                  />

                  {/* Night Version (Smoothly crossfades in on hover) */}
                  <img
                    src={resilientNight.src}
                    srcSet={resilientNight.srcSet}
                    sizes={resilientNight.sizes}
                    alt="SSIL Smart Surveillance Camera Pole Night Operation"
                    width={600}
                    height={700}
                    className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out group-hover:scale-105 pointer-events-none"
                    loading="lazy"
                    decoding="async"
                    onLoad={resilientNight.onLoad}
                    onError={resilientNight.onError}
                  />
                  
                  {/* Subtle Gradient Shadow Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

                  {/* Translucent Glass Caption Pill matching Navbar styling */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between p-3 sm:p-3.5 rounded-xl bg-white/80 dark:bg-black/60 backdrop-blur-md border border-white/30 dark:border-white/10 shadow-lg text-slate-900 dark:text-white transition-all">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-ssil-red block">
                        CAMERA POLE
                      </span>
                      <span className="text-xs sm:text-sm font-black">
                        3M to 10M Surveillance Series
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
                SMART SURVEILLANCE.<br />
                <span className="text-ssil-red">RIGID LOW-VIBRATION CAMERA POLES.</span>
              </h2>
              <div className="w-14 h-1 bg-ssil-red rounded-full mt-2" />
            </motion.div>

            {/* Description Paragraphs Column */}
            <motion.div variants={childVariants} className="lg:col-span-7 space-y-3 text-left text-slate-700 dark:text-slate-300 leading-relaxed font-normal text-sm sm:text-base">
              <p>
                Shiv Shakti India Limited (SSIL) manufactures rigid, low-deflection Camera Poles engineered specifically for intelligent traffic management systems (ITMS), automatic number plate recognition (ANPR), speed enforcement radars, and 24/7 high-definition smart city surveillance.
              </p>
              <p>
                Engineered to minimize structural vibration and image blur caused by high-velocity wind turbulence and heavy roadway traffic, each pole features optimized wall thickness, aerodynamic polygonal or stepped tapering, and high-strength base anchorage.
              </p>
              <p>
                Supplied with internal conduit channels, tamper-resistant access doors with integrated MCB mounting plates, and full in-house hot-dip galvanizing, SSIL Camera Poles deliver durable, maintenance-free operation across all outdoor surveillance environments.
              </p>
            </motion.div>

          </div>

        </div>
      </motion.section>

      {/* ============================================================ */}
      {/* 4. DIMENSION SPECIFICATIONS (COMPLETE 3M–10M TECHNICAL DATA SHEET) */}
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
                CAMERA POLE <span className="text-ssil-red">TECHNICAL SPECIFICATIONS.</span>
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl">
                Technical parameters across SSIL&apos;s smart CCTV and surveillance camera pole portfolio ranging from 3 Meters to 10 Meters in height. Engineered for zero-vibration camera stability and long-term corrosion resistance.
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
                    <th className="py-3.5 px-3 sm:px-4 text-center">3 MTR</th>
                    <th className="py-3.5 px-3 sm:px-4 text-center">4 MTR</th>
                    <th className="py-3.5 px-3 sm:px-4 text-center">5 MTR</th>
                    <th className="py-3.5 px-3 sm:px-4 text-center">6 MTR</th>
                    <th className="py-3.5 px-3 sm:px-4 text-center">7 MTR</th>
                    <th className="py-3.5 px-3 sm:px-4 text-center">8 MTR</th>
                    <th className="py-3.5 px-4 sm:px-6 text-center">10 MTR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-zinc-800 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                  {cameraPoleSpecifications.map((row, idx) => (
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
                        {row.m3}
                      </td>
                      <td className={`py-3.5 px-3 sm:px-4 text-center font-mono text-[11px] sm:text-xs ${row.isProductId ? "font-black text-slate-900 dark:text-white tracking-wide" : ""}`}>
                        {row.m4}
                      </td>
                      <td className={`py-3.5 px-3 sm:px-4 text-center font-mono text-[11px] sm:text-xs ${row.isProductId ? "font-black text-slate-900 dark:text-white tracking-wide" : ""}`}>
                        {row.m5}
                      </td>
                      <td className={`py-3.5 px-3 sm:px-4 text-center font-mono text-[11px] sm:text-xs ${row.isProductId ? "font-black text-slate-900 dark:text-white tracking-wide" : ""}`}>
                        {row.m6}
                      </td>
                      <td className={`py-3.5 px-3 sm:px-4 text-center font-mono text-[11px] sm:text-xs ${row.isProductId ? "font-black text-slate-900 dark:text-white tracking-wide" : ""}`}>
                        {row.m7}
                      </td>
                      <td className={`py-3.5 px-3 sm:px-4 text-center font-mono text-[11px] sm:text-xs ${row.isProductId ? "font-black text-slate-900 dark:text-white tracking-wide" : ""}`}>
                        {row.m8}
                      </td>
                      <td className={`py-3.5 px-4 sm:px-6 text-center font-mono text-[11px] sm:text-xs font-bold ${row.isProductId ? "font-black text-ssil-red tracking-wide" : "text-ssil-red"}`}>
                        {row.m10}
                      </td>
                    </tr>
                  ))}

                  {/* Action Buttons Row for each Height */}
                  <tr className="bg-slate-100/70 dark:bg-zinc-900/60 border-t-2 border-slate-300 dark:border-zinc-700">
                    <td className="py-3 px-4 sm:px-6 font-extrabold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                      ENQUIRY
                    </td>
                    {[
                      { id: "SSILCP01", height: "3M" },
                      { id: "SSILCP02", height: "4M" },
                      { id: "SSILCP03", height: "5M" },
                      { id: "SSILCP04", height: "6M" },
                      { id: "SSILCP05", height: "7M" },
                      { id: "SSILCP06", height: "8M" },
                      { id: "SSILCP07", height: "10M" },
                    ].map((item) => (
                      <td key={item.id} className="py-3 px-2 sm:px-3 text-center">
                        <Button
                          size="sm"
                          onClick={() => openEnquiry(`${item.id} (${item.height} Surveillance Camera Pole)`)}
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
                Custom camera cantilever arms (single, dual, 4-way, PTZ dome mounts, and solar brackets) manufactured to project specifications.
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
              DRAWING OF <br />
              <span className="text-ssil-red">CAMERA POLE.</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl">
              Structural detailing illustrating the cantilever camera outreach bracket, low-deflection polygonal shaft, weatherproof junction door, and civil foundation anchorage.
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
              
              {/* Preserved Visual Engineering Schematic Drawing for Camera Pole */}
              <div className="lg:col-span-6 flex items-center justify-center p-5 bg-slate-100/80 dark:bg-black/60 rounded-2xl border border-slate-200 dark:border-zinc-800 h-full min-h-[520px]">
                <svg
                  viewBox="0 0 340 580"
                  className="w-full max-w-[300px] sm:max-w-[340px] h-auto drop-shadow-md text-slate-800 dark:text-slate-200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Lightning Finial on Top */}
                  <line x1="160" y1="20" x2="160" y2="45" stroke="#ef4444" strokeWidth="2.5" />
                  <circle cx="160" cy="22" r="3.5" fill="#ef4444" />
                  <text x="175" y="26" fontSize="9" fontWeight="bold" fill="#ef4444">Surveillance Finial</text>

                  {/* Cantilever Camera Outreach Arm */}
                  <path
                    d="M160 55 L240 55 L240 80"
                    stroke="#ef4444"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line x1="160" y1="75" x2="200" y2="55" stroke="#ef4444" strokeWidth="2" />

                  {/* PTZ / Bullet CCTV Camera Unit */}
                  <rect x="226" y="80" width="28" height="18" rx="4" fill="#ef4444" />
                  <circle cx="240" cy="102" r="6" fill="#ef4444" fillOpacity="0.4" stroke="#ef4444" strokeWidth="2" />
                  <circle cx="240" cy="102" r="2.5" fill="#ef4444" />
                  <text x="260" y="92" fontSize="9" fontWeight="bold" fill="#ef4444">PTZ / ANPR Camera</text>

                  {/* Secondary Fixed Dome Camera Mount */}
                  <line x1="160" y1="110" x2="120" y2="110" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
                  <rect x="105" y="106" width="16" height="12" rx="3" fill="#ef4444" />
                  <text x="50" y="115" fontSize="8" fontWeight="bold" fill="#ef4444">Dome CCTV</text>

                  {/* Top Dia Callout */}
                  <line x1="140" y1="135" x2="180" y2="135" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3 3" />
                  <text x="70" y="139" fontSize="10" fontWeight="bold" fill="currentColor">Top Dia (70-100mm)</text>

                  {/* Camera Pole Polygonal Tapered Steel Shaft (Single / Modular Structure) */}
                  <polygon
                    points="148,135 172,135 186,470 134,470"
                    fill="currentColor"
                    fillOpacity="0.08"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  />

                  {/* Polygonal Facet Fold Lines */}
                  <line x1="156" y1="135" x2="150" y2="470" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.35" />
                  <line x1="164" y1="135" x2="170" y2="470" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.35" />

                  {/* Weatherproof Inspection Door with Mechanical Lock & Earthing */}
                  <rect
                    x="144"
                    y="380"
                    width="32"
                    height="68"
                    rx="4"
                    fill="#ef4444"
                    fillOpacity="0.15"
                    stroke="#ef4444"
                    strokeWidth="2"
                  />
                  <circle cx="160" cy="414" r="3" fill="#ef4444" />
                  <text x="184" y="418" fontSize="9" fontWeight="bold" fill="#ef4444">Terminal Door</text>

                  {/* Bottom Dia Callout Indicator */}
                  <line x1="120" y1="470" x2="200" y2="470" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3 3" />
                  <text x="210" y="474" fontSize="10" fontWeight="bold" fill="currentColor">Bottom Dia (130-200mm)</text>

                  {/* Heavy-Duty Base Plate with Corner Gussets */}
                  <rect x="110" y="470" width="100" height="16" rx="2" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="2" />
                  <polygon points="126,470 118,470 126,445" fill="currentColor" fillOpacity="0.3" />
                  <polygon points="194,470 202,470 194,445" fill="currentColor" fillOpacity="0.3" />

                  {/* High-Tensile J-Bolts Foundation Assembly */}
                  <path d="M120 486 L120 545 L108 545" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M200 486 L200 545 L212 545" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

                  {/* Ground Level Civil Concrete Boundary */}
                  <line x1="50" y1="500" x2="270" y2="500" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
                  <text x="10" y="505" fontSize="9" fontWeight="bold" fill="currentColor">G.L. Ground Level</text>
                  <text x="225" y="540" fontSize="9" fontWeight="bold" fill="#10b981">4x Anchor J-Bolts</text>
                </svg>
              </div>

              {/* Right Side: Technical Specification Table */}
              <div className="lg:col-span-6 flex flex-col justify-center text-left">
                <div className="mb-2.5">
                  <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-ssil-red block mb-0.5">
                    CAMERA POLE
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
                          <th className="py-2.5 px-3.5 sm:px-4 w-1/2">Camera Pole Structure</th>
                          <th className="py-2.5 px-3.5 sm:px-4 w-1/2">Technical Specification</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/80 font-medium text-slate-800 dark:text-slate-200">
                        {cameraPoleBlueprintSpecs.map((spec, idx) => (
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
                      Material &amp; Construction
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 leading-relaxed">
                      Manufactured using high-grade mild steel, galvanized iron, or stainless steel depending on application and environmental requirements.
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Height &amp; Dimensions
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 leading-relaxed">
                      Available in standard heights from 3 m to 10 m and tailored outreach configurations to provide optimal camera positioning and surveillance coverage.
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Solar Compatibility
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 leading-relaxed">
                      Solar Camera Pole configurations can accommodate solar panel mounts, battery enclosures, cable routing, and associated equipment for off-grid installations.
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Quality Control
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 leading-relaxed">
                      Manufactured and tested for structural strength, surface protection, dimensional accuracy, and long-term outdoor performance.
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
                      Available in different heights, profiles, and configurations to suit CCTV, surveillance, traffic monitoring, and security applications.
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Modular Design
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 leading-relaxed">
                      Multi-section construction can simplify transportation, installation, and deployment for larger or specialized installations.
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Mounting Options
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 leading-relaxed">
                      Compatible with camera brackets, crossarms, base plates, access doors, and other mounting arrangements according to project requirements.
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Wind Load &amp; Aesthetic Enhancements
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 leading-relaxed">
                      Designed for high wind-loading stability with protective finishes that integrate seamlessly into urban and industrial spaces.
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
                      Built using corrosion-resistant materials and protective finishes for reliable long-term outdoor operation.
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Design Flexibility
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 leading-relaxed">
                      Customizable in height, shape, mounting configuration, finish, and accessories to suit different surveillance requirements.
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Cost Efficiency
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 leading-relaxed">
                      Durable construction and low maintenance requirements help reduce installation and lifecycle costs.
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0" />
                      Sustainability
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 pl-3 leading-relaxed">
                      Solar-compatible configurations support off-grid surveillance installations and can help reduce dependence on conventional power infrastructure.
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
