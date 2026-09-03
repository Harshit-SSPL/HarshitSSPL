"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ChevronRight,
  CheckCircle2,
  FileText,
  Sparkles,
  Shield,
  Layers,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { catalogProducts, CatalogProduct } from "@/data/products-catalog";
import { ProductCard } from "@/components/ui/product-card";
import { EnquiryModal } from "@/components/ui/enquiry-modal";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
};

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

// Category-specific technical specifications map
const getCategorySpecs = (slug: string, name: string) => {
  const common = [
    { parameter: "Ingress Protection", specification: "IP66 Rated Optical & Gear Chamber" },
    { parameter: "Surface Protection", specification: "Hot-Dip Galvanized / Architectural Powder Coating" },
    { parameter: "Material Grade", specification: "High-Grade Structural Steel / Die-Cast Aluminium" },
    { parameter: "Quality Certifications", specification: "ISO 9001:2015 & MNRE Compliant Standards" },
  ];

  if (slug.includes("designer-pole") || slug.includes("designer")) {
    return [
      { parameter: "Pole Shaft Geometry", specification: "Aerodynamic Stepped / Conical / Octagonal Steel Shaft" },
      { parameter: "Base Construction", specification: "High-Tensile Base Plate with Aesthetic Die-Cast Cover" },
      { parameter: "Height Range", specification: "3.5 Metres to 10.0 Metres (Custom Heights Available)" },
      { parameter: "Luminaire Integration", specification: "Direct-Mounted Symmetrical / Asymmetrical LED Modules" },
      { parameter: "Surface Finish", specification: "In-House 80+ Micron HDG + Thermoset Polyester Powder Coating" },
      { parameter: "Wind Resistance", specification: "Engineered Heavy-Duty Wind & Weather Resilient Structure" },
      { parameter: "Electrical Protection", specification: "Class I Insulation with Built-in Surge Protection (10kV/20kV)" },
      { parameter: "Foundation Anchor", specification: "High-Tensile J-Anchor Foundation Bolt Assembly" },
    ];
  }

  if (slug.includes("bollard")) {
    return [
      { parameter: "Bollard Body", specification: "Heavy-Duty Extruded Aluminium / Stainless Steel Housing" },
      { parameter: "Optics / Diffuser", specification: "Impact-Resistant UV-Stabilized Polycarbonate / Acrylic Optical Lens" },
      { parameter: "Mounting Height", specification: "0.5 Metre to 1.2 Metres Standard Architectural Heights" },
      { parameter: "Light Distribution", specification: "360° Symmetrical Radial / 180° Shielded Pathway Grazing" },
      { parameter: "Corrosion Resistance", specification: "Anodized & Powder Coated Weatherproof Marine Finish" },
      { parameter: "Impact Rating", specification: "IK08 / IK10 High Impact & Vandal Resistant" },
      { parameter: "Electrical Safety", specification: "IP66 In-Grade Driver with Low Power Consumption" },
      { parameter: "Installation", specification: "Direct Surface Anchor Base Flange with Hidden Fasteners" },
    ];
  }

  if (slug.includes("indoor")) {
    return [
      { parameter: "Luminaire Housing", specification: "Slim Profile Extruded Aluminium Heat-Sink Enclosure" },
      { parameter: "Diffuser Technology", specification: "Micro-Prismatic Glare-Free Optical Diffuser (UGR < 19)" },
      { parameter: "Luminous Efficacy", specification: "High Lumen Output (≥ 120 lm/W Efficacy)" },
      { parameter: "Mounting Type", specification: "Recessed / Surface / Suspended Ceiling Mounting" },
      { parameter: "Driver Performance", specification: "High Power Factor (PF ≥ 0.95), Low THD (< 10%) Constant Current" },
      { parameter: "Color Temperature", specification: "3000K (Warm), 4000K (Neutral), 6500K (Cool Daylight)" },
      { parameter: "Lifespan Rating", specification: "50,000+ Burning Hours with Minimal Lumen Depreciation" },
      { parameter: "Applications", specification: "Corporate Offices, Commercial Plazas, Hospitals & Institutions" },
    ];
  }

  if (slug.includes("street")) {
    return [
      { parameter: "Housing Construction", specification: "Pressure Die-Cast Aluminium Alloy with Optimal Thermal Fins" },
      { parameter: "Optical Lens System", specification: "High-Transmission Batwing Lens for Wide Uniform Road Spread" },
      { parameter: "Wattage Range", specification: "Standard Municipal & Highway Commercial Wattage Ratings" },
      { parameter: "Surge Protection", specification: "10kV / 20kV External & Internal Surge Protection Device" },
      { parameter: "Spigot Mounting", specification: "Adjustable 48mm / 60mm Side-Entry Spigot Arm Bracket" },
      { parameter: "Weather Resistance", specification: "IP66 Sealed Gasket with Toughened Front Protective Glass" },
      { parameter: "Efficiency", specification: "High Power Factor (PF ≥ 0.98), High Energy Savings" },
      { parameter: "Road Compliance", specification: "Compliant with National Highway & Municipal Lighting Norms" },
    ];
  }

  if (slug.includes("post-top")) {
    return [
      { parameter: "Luminaire Form", specification: "Architectural Circular / Conical Post-Top Lantern Head" },
      { parameter: "Optics Structure", specification: "360° Symmetrical Reflector with Glare-Cutoff Shielding" },
      { parameter: "Mounting Spigot", specification: "Standard 60mm / 76mm Diameter Pole Top Insertion" },
      { parameter: "Housing Material", specification: "Corrosion-Resistant Die-Cast Aluminium with Silicone Gaskets" },
      { parameter: "Surface Coating", specification: "UV-Resistant Architectural Grade Polyester Powder Finish" },
      { parameter: "Ingress Rating", specification: "IP66 Weatherproof Engine with Built-in Heat Dissipation" },
      { parameter: "Surge Safety", specification: "Multi-Stage Surge Protection Device Integrated" },
      { parameter: "Usage Domains", specification: "Civic Plazas, Campus Walkways, Urban Streetscapes & Promenades" },
    ];
  }

  if (slug.includes("flood")) {
    return [
      { parameter: "Chassis Design", specification: "High-Pressure Die-Cast Aluminium with Heavy Heat Radiator Fins" },
      { parameter: "Optical Beam Angles", specification: "Narrow / Medium / Wide Asymmetric Facade & Area Beams" },
      { parameter: "Impact Resistance", specification: "IK08 Toughened High-Clarity Tempered Front Glass" },
      { parameter: "Mounting Bracket", specification: "Heavy-Duty Rotatable Steel U-Bracket with Angle Protractor" },
      { parameter: "Ingress Protection", specification: "IP66 Complete Water-Jet & Dust-Tight Protection" },
      { parameter: "Driver Safety", specification: "Class I Driver with High Over-Voltage & Surge Protection" },
      { parameter: "Thermal Management", specification: "Direct Thermal Path Conductive Alloy for Long Lifespan" },
      { parameter: "Applications", specification: "Building Facades, Sports Arenas, Industrial Yards & Monuments" },
    ];
  }

  if (slug.includes("bulkhead") || slug.includes("pathway")) {
    return [
      { parameter: "Enclosure Material", specification: "High-Pressure Die-Cast Aluminium Base with Stainless Steel Screws" },
      { parameter: "Diffuser Glass", specification: "High-Impact IK10 Polycarbonate / Frosted Prismatic Glass" },
      { parameter: "Mounting Flexibility", specification: "Wall-Mount / Ceiling-Mount / Surface Low-Level Installation" },
      { parameter: "Weather Resistance", specification: "IP65 / IP66 Weatherproof Seal for Humid and Dusty Environments" },
      { parameter: "Driver Technology", specification: "Integrated Constant Current LED Driver with Surge Immunity" },
      { parameter: "Security Features", specification: "Vandal-Resistant Fasteners and Sturdy Body Profile" },
      { parameter: "Light Spread", specification: "Wide 120° Diffused Forward Throw Illumination" },
      { parameter: "Applications", specification: "Stairwells, Tunnels, Perimeter Pathways & Utility Basements" },
    ];
  }

  if (slug.includes("wall-washer") || slug.includes("wall-washer-and-inground")) {
    return [
      { parameter: "Fixture Architecture", specification: "Linear Anodized Aluminium Extrusion / Stainless Steel Trim" },
      { parameter: "Optical Precision", specification: "Narrow Grazing Lens (10°/15°/30°) for Vertical Facade Wash" },
      { parameter: "Ingress Protection", specification: "IP67 Submersible / Weatherproof Seal for Inground & Outdoor" },
      { parameter: "Mechanical Strength", specification: "Walk-Over / Drive-Over Load-Bearing Tempered Glass Face" },
      { parameter: "Thermal Housing", specification: "High Heat Dissipating Body with Pressure Compensation Valve" },
      { parameter: "Color Output", specification: "Monochromatic (Warm/Cool) & DMX512 Architectural Controlled" },
      { parameter: "Safety Standards", specification: "Low Voltage DC / Standard AC Options with Surge Protection" },
      { parameter: "Deployments", specification: "Architectural Grazing, Bridges, Heritage Monuments & Landscape Beds" },
    ];
  }

  if (slug.includes("solar-light") || slug.includes("solar")) {
    return [
      { parameter: "System Configuration", specification: "Integrated All-in-One / Semi-Integrated Standalone Solar Light" },
      { parameter: "Solar PV Panel", specification: "High-Efficiency Monocrystalline Solar Photovoltaic Module" },
      { parameter: "Battery System", specification: "Long-Life Lithium Iron Phosphate (LiFePO4) Battery Pack" },
      { parameter: "Charge Controller", specification: "Intelligent Dusk-to-Dawn MPPT Smart Solar Charge Controller" },
      { parameter: "Luminaire Housing", specification: "High-Pressure Die-Cast Aluminium with IP66 Weather Sealing" },
      { parameter: "Autonomy Duration", specification: "Multi-Day Rainy / Overcast Weather Power Autonomy" },
      { parameter: "Mounting Structure", specification: "Hot-Dip Galvanized Pole Top Mounting Bracket" },
      { parameter: "Usage Environments", specification: "Rural Roads, Highway Corridors, Perimeter Parks & Remote Facilities" },
    ];
  }

  return [
    { parameter: "Structure Design", specification: "High-Grade Engineered Structural Steel & Alloy Enclosure" },
    { parameter: "Surface Protection", specification: "Hot-Dip Galvanized In-House / Architectural Powder Coating" },
    { parameter: "Ingress Protection", specification: "IP66 Sealed Optical Engine & Weatherproof Housing" },
    { parameter: "Quality Compliance", specification: "ISO 9001:2015 & Industry Engineering Standards" },
    ...common,
  ];
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const normalizeSlug = (s: string) => {
    if (!s) return "";
    const lower = s.toLowerCase();
    if (lower === "led-decorative-poles") return "decorative-poles";
    if (lower === "led-designer-poles") return "designer-poles";
    if (lower === "post-top-luminaries") return "post-top-illuminaries";
    if (lower === "bulkhead-pathways-luminaries") return "bulkhead-pathways";
    if (lower === "wall-washer-inground-lighting" || lower === "wall-washer-and-inground-lighting") return "wall-washer";
    return lower;
  };

  const resolvedSlug = normalizeSlug(slug);
  const fallbackProduct = catalogProducts.find(
    (p) => p.slug === slug || p.slug === resolvedSlug || p.id === slug
  );
  const [product, setProduct] = useState<CatalogProduct | undefined>(fallbackProduct);

  useEffect(() => {
    const fetchProductData = async () => {
      if (!slug) return;
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        const res = await fetch(`${apiUrl}/products/${slug}`, { signal: controller.signal });
        clearTimeout(timeoutId);

        const data = await res.json();
        if (data.success && data.product && fallbackProduct) {
          const apiProd = data.product;
          setProduct({
            ...fallbackProduct,
            ...apiProd,
            name: fallbackProduct.name,
            designCount: fallbackProduct.designCount,
            galleryImages:
              apiProd.designs && apiProd.designs.length > 0
                ? apiProd.designs.map((d: any, idx: number) => ({
                    id: d._id || d.id || `${slug}-${idx}`,
                    name: d.name,
                    dayImage: d.dayImage || fallbackProduct.galleryImages[idx % fallbackProduct.galleryImages.length]?.dayImage,
                    nightImage: d.nightImage,
                    specs: d.specs || "IP66 Weatherproof • Custom Engineering • ISO Standards",
                  }))
                : fallbackProduct.galleryImages,
          });
        }
      } catch (err) {
        if (fallbackProduct) setProduct(fallbackProduct);
      }
    };

    fetchProductData();
  }, [slug]);

  const [enquiryState, setEnquiryState] = useState<{
    isOpen: boolean;
    productCategory: string;
    productModel: string;
  }>({
    isOpen: false,
    productCategory: "",
    productModel: "",
  });

  if (!product) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
          Product Not Found
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md">
          The product category you are looking for does not exist or has been relocated.
        </p>
        <Button asChild className="bg-ssil-red hover:bg-ssil-red-600 text-white font-bold">
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products Catalog
          </Link>
        </Button>
      </div>
    );
  }

  const openEnquiry = (modelName?: string) => {
    setEnquiryState({
      isOpen: true,
      productCategory: product.name,
      productModel: modelName || `${product.name} Custom Engineering Specification`,
    });
  };

  const closeEnquiry = () => {
    setEnquiryState((prev) => ({ ...prev, isOpen: false }));
  };

  const categorySpecs = getCategorySpecs(product.slug, product.name);

  const keyFeatures = [
    {
      title: "Precision Engineering & Tooling",
      desc: "Fabricated using high-grade structural alloys, automated CNC tooling, and quality-tested assembly for dependable long-term outdoor operation.",
      icon: Sparkles,
    },
    {
      title: "Corrosion & Weather Protection",
      desc: "Engineered with dual-layer surface protection including in-house hot-dip galvanizing and UV-resistant thermoset architectural powder coating.",
      icon: Shield,
    },
    {
      title: "High-Efficiency Optical Engine",
      desc: "Equipped with precision optical lenses, high lumen-per-watt efficiency, and uniform glare-free light distribution.",
      icon: Award,
    },
    {
      title: "Versatile Project Integration",
      desc: "Customizable mounting configurations, electrical parameters, and tender-compliant specifications for institutional and civic projects.",
      icon: Layers,
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
          src={product.heroImage || "/products/products-hero.png"}
          alt={`${product.name} SSIL Hero`}
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
            <span className="text-ssil-red">{product.name}</span>
          </div>

          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-ssil-red block mb-1">
            SSIL LUMINAIRES &amp; INFRASTRUCTURE
          </span>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight max-w-4xl drop-shadow-md">
            {product.name}
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-slate-200 font-medium max-w-2xl leading-relaxed drop-shadow-xs">
            {product.tagline}
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
                {product.description}
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
      {/* 3. COMPACT HERO SECTION (DAY/NIGHT HOVER CROSSFADE) */}
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
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-[1.05]">
                  {product.name.split(" ")[0]} <br />
                  <span className="text-ssil-red">{product.name.split(" ").slice(1).join(" ") || "SYSTEMS."}</span>
                </h2>

                {/* 3 Product-Value Bullet Points */}
                <div className="space-y-3 pt-1 text-left">
                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0 mt-2" />
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                      Precision engineered with high-durability structural housing and corrosion-resistant coatings designed for robust outdoor operation.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0 mt-2" />
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                      Equipped with high-efficiency optical systems and thermal management for uniform, glare-controlled lighting performance.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-ssil-red shrink-0 mt-2" />
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                      Designed and manufactured to tender-compliant Indian and international infrastructure quality standards.
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
                    src={product.dayImage}
                    alt={`${product.name} Daytime`}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="eager"
                  />
                  {/* Night Image (Hover Transition) */}
                  <img
                    src={product.nightImage || product.dayImage}
                    alt={`${product.name} Night Illumination`}
                    className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out group-hover:scale-105 pointer-events-none"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />
                  
                  {/* Glass Caption Pill */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between p-3 sm:p-3.5 rounded-xl bg-white/80 dark:bg-black/60 backdrop-blur-md border border-white/30 dark:border-white/10 shadow-lg text-slate-900 dark:text-white transition-all">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-ssil-red block">
                        {product.name}
                      </span>
                      <span className="text-xs sm:text-sm font-black">
                        Commercial &amp; Civic Infrastructure
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 bg-slate-100/90 dark:bg-white/10 px-2.5 py-1 rounded-md border border-slate-200/80 dark:border-white/10">
                      IP66 Standard
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
              TECHNICAL SPECIFICATIONS &amp; <br />
              <span className="text-ssil-red">{product.name} DRAWING.</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl">
              Structural parameters, mechanical tolerances, optical performance, and electrical safety standards engineered by Shiv Shakti India Limited.
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
              <div className="lg:col-span-6 flex items-center justify-center p-5 bg-slate-100/80 dark:bg-black/60 rounded-2xl border border-slate-200 dark:border-zinc-800 h-full min-h-[440px]">
                <svg
                  viewBox="0 0 340 480"
                  className="w-full max-w-[300px] sm:max-w-[340px] h-auto drop-shadow-md text-slate-800 dark:text-slate-200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Top Optical Engine Head */}
                  <rect x="110" y="30" width="120" height="40" rx="6" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="2" />
                  <circle cx="140" cy="50" r="8" fill="#f59e0b" />
                  <circle cx="170" cy="50" r="8" fill="#f59e0b" />
                  <circle cx="200" cy="50" r="8" fill="#f59e0b" />
                  <text x="125" y="22" fontSize="9" fontWeight="bold" fill="#ef4444">IP66 Sealed Optical Engine</text>

                  {/* Heat Dissipation Fins */}
                  <line x1="120" y1="30" x2="120" y2="15" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="140" y1="30" x2="140" y2="15" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="160" y1="30" x2="160" y2="15" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="180" y1="30" x2="180" y2="15" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="200" y1="30" x2="200" y2="15" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="220" y1="30" x2="220" y2="15" stroke="currentColor" strokeWidth="1.5" />

                  {/* Structural Mounting Body */}
                  <polygon
                    points="155,70 185,70 190,280 150,280"
                    fill="currentColor"
                    fillOpacity="0.08"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  />
                  <line x1="165" y1="70" x2="162" y2="280" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
                  <line x1="175" y1="70" x2="178" y2="280" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />

                  {/* Electrical Control Compartment */}
                  <rect x="145" y="290" width="50" height="90" rx="4" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="2" />
                  <circle cx="170" cy="335" r="3" fill="#3b82f6" />
                  <text x="205" y="340" fontSize="8" fontWeight="bold" fill="#3b82f6">Internal Driver / Gear</text>

                  {/* Base Flange Mounting */}
                  <rect x="110" y="390" width="120" height="18" rx="2" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2" />
                  <polygon points="125,390 115,390 125,360" fill="currentColor" fillOpacity="0.3" />
                  <polygon points="215,390 225,390 215,360" fill="currentColor" fillOpacity="0.3" />

                  {/* Foundation J-Bolts */}
                  <path d="M125 408 L125 450 L115 450" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M215 408 L215 450 L225 450" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                  {/* Ground Level Line */}
                  <line x1="45" y1="418" x2="295" y2="418" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
                  <text x="15" y="422" fontSize="8" fontWeight="bold" fill="currentColor">G.L. Ground Level</text>
                  <text x="235" y="445" fontSize="8" fontWeight="bold" fill="#10b981">Foundation Anchor</text>
                </svg>
              </div>

              {/* Right Side: Technical Specification Table */}
              <div className="lg:col-span-6 flex flex-col justify-center text-left">
                <div className="mb-2.5">
                  <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-ssil-red block mb-0.5">
                    {product.name}
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
                        {categorySpecs.map((row, idx) => (
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
      {/* 5. PRODUCT IMAGE GALLERY */}
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
                Available Designs ({product.galleryImages.length})
              </h2>
            </div>
            
            <span className="text-xs font-bold text-ssil-red uppercase tracking-wider bg-ssil-red/10 border border-ssil-red/20 px-3 py-1.5 rounded-none self-start sm:self-auto">
              {product.galleryImages.length} Available Models
            </span>
          </div>

          {/* Launching Soon Glass Banner for Heritage Brackets and Wall Lights */}
          {(product.slug === "heritage-brackets" || product.slug === "wall-lights") && (
            <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl border border-ssil-red/30 shadow-xl text-center max-w-3xl mx-auto">
              <span className="inline-block px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-ssil-red text-white mb-3 shadow-sm">
                Segment Launching Soon
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2">
                {product.name} Collection in Active Development
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto mb-5 leading-relaxed font-medium">
                This category is currently being engineered by our in-house design and fabrication teams. Contact us for advance technical specifications or custom project requirements.
              </p>
              <Button asChild className="bg-ssil-red hover:bg-red-700 text-white font-bold rounded-full px-6 shadow-md">
                <Link href="/contact">Contact Our Team for Advance Inquiries</Link>
              </Button>
            </div>
          )}

          {/* 4 Images per Row Desktop Grid */}
          <motion.div
            className="w-full flex flex-wrap justify-center gap-2.5 sm:gap-3 lg:gap-3.5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={containerVariants}
          >
            {product.galleryImages.map((item) => (
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
              {product.name} Manufacturing Capabilities
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
      {/* 7. CALL TO ACTION SECTION */}
      {/* ============================================================ */}
      <section className="relative z-10 py-16 bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
          <span className="text-xs font-black uppercase tracking-widest text-ssil-red block mb-3">
            NEED A CUSTOM SPECIFICATION?
          </span>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight uppercase mb-4 text-white">
            Looking for Custom {product.name} Engineering?
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-8 font-medium leading-relaxed">
            Our engineering team designs custom structural calculations, photometric layouts, and tender-compliant manufacturing drawings tailored for your project requirements.
          </p>

          <div className="flex items-center justify-center">
            <Button
              onClick={() => openEnquiry(`Custom ${product.name} Tender Specs`)}
              size="lg"
              className="bg-ssil-red hover:bg-red-700 text-white font-bold px-8 py-3 rounded-full text-xs sm:text-sm shadow-xl shadow-ssil-red/25 hover:scale-105 transition-all"
            >
              <FileText className="mr-2 h-4 w-4" />
              Request Technical Tender Specs
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. ENQUIRY MODAL POPUP */}
      {/* ============================================================ */}
      <EnquiryModal
        isOpen={enquiryState.isOpen}
        onClose={closeEnquiry}
        productCategory={enquiryState.productCategory}
        productModel={enquiryState.productModel}
      />

    </div>
  );
}
