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
  Sun,
  Zap,
  ShieldCheck,
  Cpu,
  Layers,
  Radio,
  Factory,
  Building2,
  Car,
  Landmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnquiryModal } from "@/components/ui/enquiry-modal";
import { fetchApi } from "@/lib/admin-api";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

interface SolarSpecRow {
  parameter: string;
  specification: string;
}

const solarTechnicalSpecs: SolarSpecRow[] = [
  { parameter: "System Configuration", specification: "On-Grid / Hybrid Rooftop & Ground Mounted Solar" },
  { parameter: "Solar PV Modules", specification: "High-Efficiency Monocrystalline & Bifacial Solar Panels" },
  { parameter: "Module Power Range", specification: "High-Yield Modules (Standard Commercial Wattages)" },
  { parameter: "Inverter System", specification: "Grid-Tied Multi-MPPT Inverters (Three-Phase / Single-Phase)" },
  { parameter: "Module Mounting Structure (MMS)", specification: "Hot-Dip Galvanized Structural Steel / Aluminium Racks" },
  { parameter: "Galvanizing Quality", specification: "Hot-Dip Galvanized Coating for Weather Protection" },
  { parameter: "Structural Design", specification: "Heavy-Duty Weather & Wind Resilient Racking" },
  { parameter: "Electrical Protection", specification: "DC/AC Surge Protection Devices (SPD) & Isolation Fuses" },
  { parameter: "Earthing System", specification: "Dedicated Chemical Earthing Pits for AC & DC Safety" },
  { parameter: "Monitoring System", specification: "Standard Remote Web & Mobile Generation Monitoring" },
  { parameter: "Grid Synchronization", specification: "DISCOM Net-Metering Compatible" },
];

export default function SolarPowerPlantsPage() {
  const [bannerImage, setBannerImage] = useState("https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614314/ssil_banner_solar_power_plants.png");
  const [dayImage, setDayImage] = useState("https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614325/ssil_product_solar_day.png");
  const [nightImage, setNightImage] = useState("https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614328/ssil_product_solar_night.png");
  const [enquiryState, setEnquiryState] = useState<{
    isOpen: boolean;
    productCategory: string;
    productModel: string;
  }>({
    isOpen: false,
    productCategory: "Solar Power Plants",
    productModel: "Turnkey Solar Power Plant (KWp to MW Scale)",
  });

  React.useEffect(() => {
    const fetchProductData = async () => {
      try {
        const data = await fetchApi("/products/solar-power-plants");
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
      productCategory: "Solar Power Plants",
      productModel: modelName || "Turnkey Solar EPC Project (Rooftop / Ground Mount)",
    });
  };

  const closeEnquiry = () => {
    setEnquiryState((prev) => ({ ...prev, isOpen: false }));
  };

  const components = [
    {
      title: "High-Efficiency Solar Modules",
      subtitle: "Mono PERC & TOPCon Solar Panels",
      desc: "High-performance solar photovoltaic panels engineered with tempered glass, delivering consistent power output in real-world outdoor operating conditions.",
      specs: ["High Wattage High-Yield Modules", "PID-Resistant Protection", "IP68 Junction Box", "Weatherproof Design"],
      icon: Sun,
    },
    {
      title: "Multi-MPPT Solar Inverters",
      subtitle: "Grid-Tied & Hybrid Systems",
      desc: "High-performance solar inverters equipped with real-time MPPT tracking, anti-islanding safety protection, and high power conversion efficiency.",
      specs: ["High Efficiency Conversion", "Built-in DC Disconnect", "IP65/IP66 Enclosure", "Digital Telemetry"],
      icon: Cpu,
    },
    {
      title: "Engineered Mounting Structures (MMS)",
      subtitle: "In-House Hot-Dip Galvanized Fabrication",
      desc: "Custom-engineered structural steel mounting racks hot-dip galvanized for long-term corrosion resistance with optimized tilt angles.",
      specs: ["IS 2062 Grade Steel / Al Racks", "Heavy-Duty Wind Resilient", "Hot-Dip Galvanized Coating", "Custom Tilt Alignment"],
      icon: Layers,
    },
    {
      title: "Remote Generation Monitoring",
      subtitle: "Web & Mobile Diagnostics",
      desc: "Smart monitoring platform providing live generation metrics, daily/monthly logs, and operational alerts.",
      specs: ["Mobile App & Web Dashboard", "Daily & Monthly Logs", "Generation Diagnostics", "System Health Tracking"],
      icon: Radio,
    },
    {
      title: "Safety, Earthing & Lightning Protection",
      subtitle: "Comprehensive System Protection",
      desc: "Dedicated maintenance-free chemical earthing pits for AC and DC safety, paired with early streamer emission lightning protection.",
      specs: ["Chemical Earthing Pits", "Lightning Arrester Protection", "DC/AC Surge Protection (SPDs)", "Standard Electrical Safety"],
      icon: ShieldCheck,
    },
    {
      title: "Grid Net-Metering & Installation",
      subtitle: "DISCOM Approvals & Synchronization",
      desc: "Complete project execution, grid connectivity coordination, and bidirectional net-meter integration with local power utilities.",
      specs: ["DISCOM Net-Metering Support", "Safe Grid Synchronization", "Standard Testing & Commissioning", "Full EPC Execution"],
      icon: Zap,
    },
  ];

  const projectApplications = [
    {
      title: "Commercial & Industrial (C&I) Rooftops",
      desc: "Reduce commercial and industrial power costs with reliable rooftop solar arrays designed for RCC and metal sheet roofs.",
      icon: Factory,
    },
    {
      title: "Ground-Mounted Solar Installations",
      desc: "Solar power generation systems engineered with sturdy fixed-tilt structures for open premises and institutional estates.",
      icon: Landmark,
    },
    {
      title: "Solar Carports",
      desc: "Dual-utility architectural parking canopies providing shaded vehicle protection while generating clean solar power.",
      icon: Car,
    },
    {
      title: "Institutional & Facility Solar Systems",
      desc: "Reliable solar setups for educational institutions, healthcare complexes, and commercial offices with grid synchronization.",
      icon: Building2,
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-white dark:bg-black text-slate-900 dark:text-white transition-colors duration-300 overflow-hidden">
      
      {/* ============================================================ */}
      {/* 1. PRODUCT HERO BANNER */}
      {/* ============================================================ */}
      <section className="relative z-10 w-full h-[54vh] sm:h-[62vh] max-h-[540px] flex flex-col justify-between overflow-hidden rounded-none pt-24 pb-10 sm:pb-12 bg-slate-950">
        {/* Full-bleed Background Image */}
        <Image
          src={bannerImage}
          alt="Solar Power Plants SSIL Hero"
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
            <span className="text-ssil-red">Solar Power Plants</span>
          </div>
        </div>

        {/* Bottom Content Container */}
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 text-left flex flex-col items-start">
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-emerald-400 block mb-1">
            SSIL CLEAN ENERGY &amp; INFRASTRUCTURE
          </span>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight max-w-4xl drop-shadow-md">
            Solar Power Plants
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-slate-200 font-medium max-w-2xl leading-relaxed drop-shadow-xs">
            Engineered solar power generation systems for sustainable infrastructure.
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
                Commercial solar power plant installations and grid-interactive solar arrays designed for institutional facilities, manufacturing hubs, and public infrastructure energy independence.
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
                <span className="text-[13px] sm:text-[14px] font-bold text-slate-800 dark:text-slate-200">High-Efficiency PV Modules</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-none bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-xs">
                <CheckCircle2 className="h-4.5 w-4.5 text-ssil-red shrink-0" />
                <span className="text-[13px] sm:text-[14px] font-bold text-slate-800 dark:text-slate-200">Custom Engineering</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-none bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-xs">
                <CheckCircle2 className="h-4.5 w-4.5 text-ssil-red shrink-0" />
                <span className="text-[13px] sm:text-[14px] font-bold text-slate-800 dark:text-slate-200">Hot-Dip Galvanized MMS</span>
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
            
            {/* Left Content Column */}
            <motion.div variants={childVariants} className="lg:col-span-6 space-y-5 text-left flex flex-col justify-center">
              
              <div className="space-y-3.5">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-[1.05]">
                  COMMERCIAL SOLAR <br />
                  <span className="text-ssil-red">POWER PLANTS.</span>
                </h1>

                {/* 3 Product-Value Bullet Points */}
                <div className="space-y-3 pt-1 text-left">
                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0 mt-2" />
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                      Complete end-to-end EPC execution spanning site feasibility, structural CAD engineering, civil foundation setup, and statutory DISCOM net-metering approvals for high-yield power generation.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0 mt-2" />
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                      Equipped with high-efficiency Mono PERC &amp; TOPCon solar PV modules paired with smart multi-MPPT inverters to achieve dependable power generation and system uptime.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0 mt-2" />
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                      In-house precision-fabricated Module Mounting Structures (MMS) with hot-dip galvanizing, engineered for high structural durability and long-term outdoor reliability.
                    </p>
                  </div>
                </div>
              </div>

            </motion.div>

            {/* Right Hero Image Column (12:9 Aspect Ratio with Day/Night hover transition) */}
            <motion.div variants={childVariants} className="lg:col-span-6">
              <div className="group relative rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-zinc-800 overflow-hidden shadow-lg bg-slate-100 dark:bg-zinc-900 cursor-pointer w-full max-w-[560px] mx-auto lg:max-w-none">
                <div className="relative aspect-[12/9] w-full overflow-hidden">
                  {/* Day Version (Default) */}
                  <img
                    src={dayImage}
                    alt="SSIL Solar Power Plant Installation Daytime"
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Night Version (Smoothly crossfades in on hover) */}
                  <img
                    src={nightImage || dayImage}
                    alt="SSIL Solar Power Plant Illumination"
                    className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out group-hover:scale-105 pointer-events-none"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />
                  
                  {/* Glass Caption Pill */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between p-3 sm:p-3.5 rounded-xl bg-white/80 dark:bg-black/60 backdrop-blur-md border border-white/30 dark:border-white/10 shadow-lg text-slate-900 dark:text-white transition-all">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-500 block">
                        SOLAR POWER PLANT
                      </span>
                      <span className="text-xs sm:text-sm font-black">
                        Commercial &amp; Industrial Installation
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 bg-slate-100/90 dark:bg-white/10 px-2.5 py-1 rounded-md border border-slate-200/80 dark:border-white/10">
                      Clean Energy
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
              DRAWING OF SOLAR <br />
              <span className="text-ssil-red">POWER PLANT SYSTEM.</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl">
              Engineering schematic detailing the photovoltaic array orientation, hot-dip galvanized mounting structures, multi-MPPT inverters, chemical earthing, and bi-directional net-meter grid synchronization.
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
              
              {/* Visual Engineering Schematic Drawing for Solar Power Plant */}
              <div className="lg:col-span-6 flex items-center justify-center p-5 bg-slate-100/80 dark:bg-black/60 rounded-2xl border border-slate-200 dark:border-zinc-800 h-full min-h-[520px]">
                <svg
                  viewBox="0 0 380 520"
                  className="w-full max-w-[340px] sm:max-w-[380px] h-auto drop-shadow-md text-slate-800 dark:text-slate-200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Sun / Irradiance Source */}
                  <circle cx="65" cy="45" r="18" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="2" />
                  <circle cx="65" cy="45" r="10" fill="#f59e0b" />
                  <path d="M65 18 L65 24 M65 66 L65 72 M38 45 L44 45 M86 45 L92 45 M46 26 L51 31 M79 59 L84 64 M46 64 L51 59 M79 31 L84 26" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
                  <text x="95" y="42" fontSize="10" fontWeight="bold" fill="#f59e0b">Solar Irradiance</text>
                  <text x="95" y="55" fontSize="8" fontWeight="bold" fill="currentColor">1000 W/m² (STC)</text>

                  {/* Irradiance Rays pointing to PV Array */}
                  <path d="M85 65 L140 100" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
                  <path d="M100 65 L170 100" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />

                  {/* Lightning Protection Mast at Corner */}
                  <line x1="330" y1="50" x2="330" y2="180" stroke="#ef4444" strokeWidth="2" />
                  <circle cx="330" cy="50" r="3" fill="#ef4444" />
                  <text x="250" y="46" fontSize="8" fontWeight="bold" fill="#ef4444">ESE Lightning Mast</text>

                  {/* Solar PV Modules Racks (3 Tilted Panels Array) */}
                  {/* Panel 1 */}
                  <polygon
                    points="70,170 180,105 205,115 95,180"
                    fill="#1e3a8a"
                    fillOpacity="0.85"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />
                  {/* Panel 1 Grid lines */}
                  <line x1="125" y1="137" x2="150" y2="147" stroke="#93c5fd" strokeWidth="1" />
                  <line x1="100" y1="152" x2="125" y2="162" stroke="#93c5fd" strokeWidth="1" />
                  <line x1="150" y1="122" x2="175" y2="132" stroke="#93c5fd" strokeWidth="1" />

                  {/* Panel 2 */}
                  <polygon
                    points="110,185 220,120 245,130 135,195"
                    fill="#1e3a8a"
                    fillOpacity="0.85"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />
                  {/* Panel 2 Grid lines */}
                  <line x1="165" y1="152" x2="190" y2="162" stroke="#93c5fd" strokeWidth="1" />
                  <line x1="140" y1="167" x2="165" y2="177" stroke="#93c5fd" strokeWidth="1" />
                  <line x1="190" y1="137" x2="215" y2="147" stroke="#93c5fd" strokeWidth="1" />

                  {/* Panel 3 */}
                  <polygon
                    points="150,200 260,135 285,145 175,210"
                    fill="#1e3a8a"
                    fillOpacity="0.85"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />
                  {/* Panel 3 Grid lines */}
                  <line x1="205" y1="167" x2="230" y2="177" stroke="#93c5fd" strokeWidth="1" />
                  <line x1="180" y1="182" x2="205" y2="192" stroke="#93c5fd" strokeWidth="1" />
                  <line x1="230" y1="152" x2="255" y2="162" stroke="#93c5fd" strokeWidth="1" />

                  <text x="145" y="95" fontSize="9" fontWeight="bold" fill="#3b82f6">Bifacial Mono PERC PV Array</text>

                  {/* Hot-Dip Galvanized MMS Racking Structure */}
                  {/* Front Legs */}
                  <line x1="100" y1="180" x2="100" y2="280" stroke="currentColor" strokeWidth="3" />
                  <line x1="140" y1="195" x2="140" y2="280" stroke="currentColor" strokeWidth="3" />
                  <line x1="180" y1="210" x2="180" y2="280" stroke="currentColor" strokeWidth="3" />

                  {/* Rear High Legs */}
                  <line x1="190" y1="110" x2="190" y2="280" stroke="currentColor" strokeWidth="3" />
                  <line x1="230" y1="125" x2="230" y2="280" stroke="currentColor" strokeWidth="3" />
                  <line x1="270" y1="140" x2="270" y2="280" stroke="currentColor" strokeWidth="3" />

                  {/* Bracing Struts */}
                  <line x1="100" y1="280" x2="190" y2="110" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6" />
                  <line x1="180" y1="280" x2="270" y2="140" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6" />
                  <line x1="100" y1="280" x2="270" y2="280" stroke="currentColor" strokeWidth="2.5" />

                  {/* Tilt Angle Arc & Callout */}
                  <path d="M220 280 A40 40 0 0 0 250 250" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2 2" fill="none" />
                  <text x="255" y="270" fontSize="8" fontWeight="bold" fill="#ef4444">Tilt Angle (15°-25°)</text>

                  {/* MMS Structure Annotation */}
                  <text x="285" y="225" fontSize="9" fontWeight="bold" fill="currentColor">HDG Steel MMS Structure</text>
                  <text x="285" y="238" fontSize="8" fontWeight="bold" fill="#10b981">Weather &amp; Wind Resilient</text>

                  {/* Base Footing Plinths */}
                  <rect x="90" y="280" width="20" height="12" rx="2" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="130" y="280" width="20" height="12" rx="2" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="170" y="280" width="20" height="12" rx="2" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="180" y="280" width="20" height="12" rx="2" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="220" y="280" width="20" height="12" rx="2" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="260" y="280" width="20" height="12" rx="2" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" />

                  {/* DC Cable Routing Line */}
                  <path d="M190 200 L190 320 L95 320 L95 350" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2" fill="none" />
                  <text x="110" y="315" fontSize="8" fontWeight="bold" fill="#ef4444">DC String Cabling</text>

                  {/* Multi-MPPT Inverter Box */}
                  <rect x="60" y="350" width="70" height="60" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                  <rect x="70" y="360" width="50" height="18" rx="2" fill="#10b981" fillOpacity="0.2" />
                  <text x="75" y="373" fontSize="8" fontWeight="bold" fill="#10b981">Solar Inverter</text>
                  <circle cx="75" cy="395" r="3" fill="#10b981" />
                  <circle cx="85" cy="395" r="3" fill="#3b82f6" />
                  <circle cx="95" cy="395" r="3" fill="#f59e0b" />
                  <text x="60" y="425" fontSize="9" fontWeight="bold" fill="currentColor">Grid-Tied Inverter</text>

                  {/* AC Output Line from Inverter to LT Panel / Net Meter */}
                  <path d="M130 380 L190 380 L190 350 L250 350" stroke="#3b82f6" strokeWidth="2.5" fill="none" />
                  <text x="145" y="375" fontSize="8" fontWeight="bold" fill="#3b82f6">3-Phase AC Output</text>

                  {/* Bi-Directional Net-Meter & LT Switchgear Box */}
                  <rect x="250" y="335" width="65" height="50" rx="5" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" />
                  <rect x="260" y="345" width="45" height="14" rx="2" fill="#3b82f6" fillOpacity="0.2" />
                  <text x="265" y="355" fontSize="7" fontWeight="bold" fill="#3b82f6">Bi-Dir Meter</text>
                  <path d="M265 372 L275 372 M270 368 L275 372 L270 376" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M295 372 L285 372 M290 368 L285 372 L290 376" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
                  <text x="245" y="400" fontSize="9" fontWeight="bold" fill="currentColor">DISCOM Net-Meter</text>

                  {/* Power Flow to Facility & Grid */}
                  <path d="M315 350 L360 350 L360 410" stroke="#10b981" strokeWidth="2.5" fill="none" />
                  <text x="315" y="425" fontSize="8" fontWeight="bold" fill="#10b981">Facility Load &amp; Grid</text>

                  {/* Dedicated Chemical Earthing Pit at bottom */}
                  <line x1="95" y1="410" x2="95" y2="475" stroke="#10b981" strokeWidth="2" strokeDasharray="3 2" />
                  <rect x="80" y="475" width="30" height="25" rx="3" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.5" />
                  <path d="M85 487 L105 487 M89 492 L101 492 M93 497 L97 497" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" />
                  <text x="115" y="490" fontSize="8" fontWeight="bold" fill="#10b981">Chemical Earthing Pit</text>
                  <text x="115" y="502" fontSize="7" fontWeight="bold" fill="currentColor">Low Resistance Safety Earth</text>

                  {/* Ground Level Line */}
                  <line x1="20" y1="475" x2="360" y2="475" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
                  <text x="25" y="468" fontSize="8" fontWeight="bold" fill="currentColor">G.L. Ground / Roof Level</text>
                </svg>
              </div>

              {/* Right Side: Technical Specification Table */}
              <div className="lg:col-span-6 flex flex-col justify-center text-left">
                <div className="mb-2.5">
                  <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-ssil-red block mb-0.5">
                    SOLAR POWER PLANT
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
                        {solarTechnicalSpecs.map((row, idx) => (
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
      {/* 5. KEY SYSTEM COMPONENTS SPECIFICATIONS */}
      {/* ============================================================ */}
      <section className="relative z-10 py-16 sm:py-20 bg-white dark:bg-black border-b border-slate-200 dark:border-zinc-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          
          <div className="text-left max-w-4xl mb-12 border-l-[5px] border-ssil-red pl-4 sm:pl-5">
            <span className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 block mb-1">
              ENGINEERING SPECIFICATIONS
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
              System Components &amp; Capabilities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {components.map((c, i) => {
              const Icon = c.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-left flex flex-col justify-between hover:border-slate-300 dark:hover:border-zinc-700 transition-all shadow-xs"
                >
                  <div>
                    <div className="h-12 w-12 rounded-xl bg-ssil-red/10 border border-ssil-red/20 flex items-center justify-center text-ssil-red mb-4">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">
                      {c.title}
                    </h3>
                    <p className="text-xs font-bold text-ssil-red mb-3">
                      {c.subtitle}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium mb-4">
                      {c.desc}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-3 border-t border-slate-200 dark:border-zinc-800">
                    {c.specs.map((s, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] font-bold text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="h-3 w-3 text-ssil-red shrink-0" />
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. PROJECT APPLICATIONS / SECTORS */}
      {/* ============================================================ */}
      <section className="relative z-10 py-16 bg-slate-50 dark:bg-zinc-950 border-b border-slate-200 dark:border-zinc-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-ssil-red block mb-2">
              PROJECT DOMAINS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
              Application Sectors &amp; Deployments
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {projectApplications.map((app, index) => {
              const AppIcon = app.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-left hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="h-10 w-10 rounded-lg bg-ssil-red/10 text-ssil-red flex items-center justify-center mb-4">
                      <AppIcon className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                      {app.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                      {app.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. CALL TO ACTION SECTION */}
      {/* ============================================================ */}
      <section className="relative z-10 py-16 bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight uppercase mb-3">
            PLAN YOUR COMMERCIAL SOLAR POWER PROJECT WITH SSIL
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto mb-6 leading-relaxed font-medium">
            Contact our clean energy team for project consultation, site assessment, and customized turnkey solar quotations for your facility.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              onClick={() => openEnquiry()}
              size="lg"
              className="bg-ssil-red hover:bg-red-700 text-white font-bold px-8 py-3 rounded-full text-xs sm:text-sm shadow-xl shadow-ssil-red/25 hover:scale-105 transition-all"
            >
              <FileText className="mr-2 h-4 w-4" />
              Request Technical Quotation
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
