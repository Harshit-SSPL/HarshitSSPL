"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ChevronRight,
  FileText,
  ArrowRight,
  CheckCircle2,
  Sun,
  Zap,
  ShieldCheck,
  Cpu,
  Layers,
  Activity,
  Download,
  Building2,
  Factory,
  Car,
  Landmark,
  Radio,
  Gauge,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnquiryModal } from "@/components/ui/enquiry-modal";

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

export default function SolarPowerPlantsPage() {
  const [enquiryState, setEnquiryState] = useState<{
    isOpen: boolean;
    productCategory: string;
    productModel: string;
  }>({
    isOpen: false,
    productCategory: "Solar Power Plants",
    productModel: "Turnkey Solar Power Plant (KWp to MW Scale)",
  });

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

  const architectureSteps = [
    {
      step: "01",
      title: "Solar PV Array",
      desc: "High-efficiency Tier-1 Mono PERC & Bifacial solar panels capturing solar irradiance.",
      icon: Sun,
      spec: "540Wp–660Wp+ Modules • 21.8%+ Efficiency",
    },
    {
      step: "02",
      title: "DC Combiner & SPDs",
      desc: "Weatherproof IP65 DCDB with Class II surge protection and fuse isolation.",
      icon: Layers,
      spec: "1000V/1500V DC Rating • IP65 Weatherproof",
    },
    {
      step: "03",
      title: "Multi-MPPT Inverter",
      desc: "Grid-interactive string/central inverters converting DC into synchronous 3-phase AC.",
      icon: Cpu,
      spec: "98.8%+ Peak Efficiency • Dynamic MPPT Tracking",
    },
    {
      step: "04",
      title: "AC Distribution & LT Panel",
      desc: "Precision switchgear with motorized breakers, power meters, and isolation relays.",
      icon: Zap,
      spec: "415V / 11kV / 33kV Integration • Fault Isolation",
    },
    {
      step: "05",
      title: "Bi-Directional Net Meter",
      desc: "DISCOM-certified bidirectional smart metering logging import and export kWh units.",
      icon: Gauge,
      spec: "Class 0.2s Accuracy • Net Metering Compliant",
    },
    {
      step: "06",
      title: "Facility Load & State Grid",
      desc: "Instant zero-carbon power to facility loads with surplus energy fed back into the grid.",
      icon: Building2,
      spec: "25-Year Guaranteed Yield • Zero-Carbon Energy",
    },
  ];

  const components = [
    {
      title: "High-Efficiency Solar Modules",
      subtitle: "Mono PERC & TOPCon Bifacial Technology",
      desc: "Tier-1 solar photovoltaic panels engineered with anti-reflective PID-resistant tempered glass, delivering consistent power output even in low-light and high-temperature conditions.",
      specs: ["540Wp – 660Wp+ Output", "25-Year Linear Power Warranty", "IP68 Junction Box", "Anti-PID Certified"],
      icon: Sun,
    },
    {
      title: "Smart Multi-MPPT Inverters",
      subtitle: "Grid-Tied, Hybrid & Central Systems",
      desc: "High-performance solar inverters equipped with advanced DSP controllers, real-time MPPT tracking, anti-islanding protection, and harmonic distortion under 3%.",
      specs: ["98.8% Peak Efficiency", "Built-in DC Disconnect", "IP66 Protection Enclosure", "RS485 / Wi-Fi / 4G SCADA"],
      icon: Cpu,
    },
    {
      title: "Engineered Mounting Structures (MMS)",
      subtitle: "In-House Hot-Dip Galvanized Fabrication",
      desc: "Custom-engineered structural steel mounting racks hot-dip galvanized with 80+ microns coating, designed to withstand wind loads up to 170 km/h with optimized tilt angles.",
      specs: ["IS 2062 Grade Steel / Al6005-T5", "Wind Load Rated up to 170 km/h", "80+ Microns HDG Coating", "Custom Tilt & Shadow Optimization"],
      icon: Layers,
    },
    {
      title: "Real-Time SCADA & IoT Telemetry",
      subtitle: "Remote Generation & String Diagnostics",
      desc: "Cloud-connected smart monitoring platform providing live generation metrics, string-level current monitoring, weather station integration, and automatic fault alerts.",
      specs: ["Mobile App & Web Dashboard", "Daily/Monthly Generation Logs", "PR & CUF Telemetry", "Automated SMS/Email Alerts"],
      icon: Radio,
    },
    {
      title: "Safety, Earthing & Lightning Arrester",
      subtitle: "Comprehensive 4-Tier Protection",
      desc: "Dedicated maintenance-free chemical earthing pits for AC, DC, and equipment neutral, paired with Early Streamer Emission (ESE) lightning arrestors.",
      specs: ["< 1 Ohm Earth Resistance", "Class 1 ESE Lightning Arrester", "Type 1+2 DC/AC SPDs", "IS 3043 Earthing Standards"],
      icon: ShieldCheck,
    },
    {
      title: "Turnkey Grid Net-Metering & Liaisoning",
      subtitle: "Seamless DISCOM Approvals",
      desc: "Complete end-to-end statutory approvals, CEIG inspection clearance, grid connectivity agreements, and bidirectional net-meter installation with local power utilities.",
      specs: ["Full DISCOM Liaisoning", "CEIG Safety Clearance", "Subsidy & Tax Benefit Support", "Grid Synchronisation Testing"],
      icon: Zap,
    },
  ];

  const projectApplications = [
    {
      title: "Commercial & Industrial (C&I) Rooftops",
      desc: "Cut factory and commercial facility electricity tariffs by up to 70% with high-capacity rooftop solar arrays designed for RCC and metal sheet roofs.",
      icon: Factory,
    },
    {
      title: "Utility Ground-Mounted Solar Parks",
      desc: "Megawatt-scale ground solar power generation plants engineered with automated tracking or fixed-tilt structures for open land and institutional estates.",
      icon: Landmark,
    },
    {
      title: "Solar Carports & EV Integration",
      desc: "Dual-utility architectural parking canopies providing shaded vehicle protection while generating clean energy integrated with EV charging stations.",
      icon: Car,
    },
    {
      title: "Institutional & Hospital Microgrids",
      desc: "Reliable solar setups for universities, hospitals, and civic headquarters with zero-downtime power continuity and grid synchronization.",
      icon: Building2,
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
          alt="Solar Power Plants SSIL Hero"
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
            <span className="text-ssil-red">Solar Power Plants</span>
          </div>

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
                Turnkey commercial solar power plant installations and grid-interactive solar arrays designed for institutional facilities, manufacturing hubs, and public infrastructure energy independence.
              </p>
            </div>

            {/* Quick Specs Badges */}
            <div className="grid grid-cols-2 gap-3.5 shrink-0 lg:max-w-md w-full">
              <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-none bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-xs">
                <CheckCircle2 className="h-4.5 w-4.5 text-ssil-red shrink-0" />
                <span className="text-[13px] sm:text-[14px] font-bold text-slate-800 dark:text-slate-200">MNRE &amp; ISO Compliant</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-none bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-xs">
                <CheckCircle2 className="h-4.5 w-4.5 text-ssil-red shrink-0" />
                <span className="text-[13px] sm:text-[14px] font-bold text-slate-800 dark:text-slate-200">Tier-1 PV Modules</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-none bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-xs">
                <CheckCircle2 className="h-4.5 w-4.5 text-ssil-red shrink-0" />
                <span className="text-[13px] sm:text-[14px] font-bold text-slate-800 dark:text-slate-200">Custom EPC Engineering</span>
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
            <motion.div variants={childVariants} className="lg:col-span-7 space-y-5 text-left flex flex-col justify-center">
              
              <div className="space-y-3.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-wider">
                  <Sparkles className="h-3.5 w-3.5" />
                  Turnkey Solar EPC Solutions
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-[1.05]">
                  COMMERCIAL SOLAR <br />
                  <span className="text-ssil-red">POWER PLANTS.</span>
                </h1>

                {/* 3 Product-Value Bullet Points */}
                <div className="space-y-2.5 pt-1 max-w-2xl text-left">
                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0 mt-2" />
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                      Complete end-to-end EPC execution spanning 3D shadow analysis, structural CAD engineering, civil foundation setup, and statutory DISCOM net-metering approvals for high-yield power generation.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0 mt-2" />
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                      Equipped with Tier-1 high-efficiency Mono PERC &amp; TOPCon Bifacial solar PV modules paired with smart multi-MPPT inverters to achieve peak generation (kWh/kWp) and maximum system uptime.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0 mt-2" />
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                      In-house precision-fabricated Module Mounting Structures (MMS) with 80+ microns hot-dip galvanizing, engineered to withstand wind velocities up to 170 km/h with 25+ years of structural integrity.
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
                  <Link href="#system-architecture">
                    <span>Explore Architecture Diagram</span>
                  </Link>
                </Button>
              </div>

            </motion.div>

            {/* Right Hero Image Column */}
            <motion.div variants={childVariants} className="lg:col-span-5">
              <div className="group relative rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-zinc-800 overflow-hidden shadow-lg bg-slate-100 dark:bg-zinc-900 cursor-pointer max-w-[420px] mx-auto lg:max-w-none">
                <div className="relative aspect-[4/4.5] sm:aspect-[4/4.8] w-full overflow-hidden">
                  <img
                    src="/images/products/homepage/product-01/day.png"
                    alt="SSIL Commercial Solar Power Plant Daytime"
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="eager"
                  />
                  <img
                    src="/images/products/homepage/product-01/night.png"
                    alt="SSIL Solar Power Plant Illumination"
                    className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out group-hover:scale-105 pointer-events-none"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </motion.section>

      {/* ============================================================ */}
      {/* 4. SYSTEM ARCHITECTURE WORKFLOW DIAGRAM ("The Diagram Thing") */}
      {/* ============================================================ */}
      <section id="system-architecture" className="relative z-10 py-16 sm:py-20 bg-slate-50 dark:bg-zinc-950 border-b border-slate-200 dark:border-zinc-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-ssil-red block mb-2">
              ENGINEERED ENERGY FLOW
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
              Solar Power Plant Architecture Diagram
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 font-medium">
              Synchronized solar energy lifecycle from photovoltaic solar capture to grid synchronization and zero-emission industrial load distribution.
            </p>
          </div>

          {/* Interactive Flow Diagram Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {architectureSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="relative p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all duration-300 hover:border-ssil-red/50 flex flex-col justify-between group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-ssil-red/30 group-hover:text-ssil-red transition-colors">
                      {step.step}
                    </span>
                    <div className="h-10 w-10 rounded-xl bg-ssil-red/10 border border-ssil-red/20 flex items-center justify-center text-ssil-red">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="space-y-2 mb-4 text-left">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                      {step.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-zinc-800/80 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 text-left">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    <span>{step.spec}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

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
              System Components &amp; Technical Capabilities
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
      {/* 7. TECHNICAL DOWNLOADS SECTION */}
      {/* ============================================================ */}
      <section className="relative z-10 py-14 bg-white dark:bg-black border-b border-slate-200 dark:border-zinc-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-3xl bg-slate-900 text-white border border-slate-800">
            <div className="text-left space-y-2 max-w-2xl">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                Technical Documentation &amp; Data
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Download SSIL Solar Power Plant Technical Specifications
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                Access comprehensive module datasheets, inverter engineering parameters, structural MMS drawings, and EPC execution capability reports.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
              <Button
                onClick={() => openEnquiry("Solar Technical Specifications Download")}
                className="w-full sm:w-auto bg-ssil-red hover:bg-red-700 text-white font-bold rounded-full px-6 h-11"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Brochure &amp; Drawings
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. CALL TO ACTION SECTION */}
      {/* ============================================================ */}
      <section className="relative z-10 py-16 bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight uppercase mb-3">
            Plan Your Commercial Solar Power Project With SSIL
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed font-medium">
            Contact our clean energy engineering team for shadow simulation, ROI calculations, and tailored turnkey EPC quotations for your facility.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              onClick={() => openEnquiry()}
              size="lg"
              className="bg-ssil-red hover:bg-ssil-red-600 text-white font-bold px-8 py-3 rounded-full text-xs sm:text-sm shadow-xl shadow-ssil-red/25 hover:scale-105 transition-all"
            >
              <FileText className="mr-2 h-4 w-4" />
              Request Free Feasibility Assessment
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-slate-700 hover:bg-slate-800 text-white font-bold px-8 py-3 rounded-full text-xs sm:text-sm transition-all"
            >
              <Link href="/contact">
                <span>Contact Engineering Team</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
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
