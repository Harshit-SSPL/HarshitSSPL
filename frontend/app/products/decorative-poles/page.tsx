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
import { ImagePreviewModal } from "@/components/ui/image-preview-modal";
import { fetchApi } from "@/lib/admin-api";
import { NEUTRAL_BANNER_PLACEHOLDER } from "@/lib/placeholders";

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

// Generate 41 products named SSILDP01 to SSILDP41
const decorativeProducts = Array.from({ length: 41 }, (_, i) => {
  const itemNum = String(i + 1).padStart(2, "0");
  return {
    id: `ssildp-${itemNum}`,
    name: `SSILDP${itemNum}`,
    dayImage: "",
    nightImage: "",
    specs: "IP66 Weatherproof • Custom Engineering • ISO Standards",
  };
});

export default function LEDDecorativePolesPage() {
  const [bannerImage, setBannerImage] = useState(NEUTRAL_BANNER_PLACEHOLDER);
  const [productsList, setProductsList] = useState(decorativeProducts);
  const [enquiryState, setEnquiryState] = useState<{
    isOpen: boolean;
    productCategory: string;
    productModel: string;
  }>({
    isOpen: false,
    productCategory: "LED Decorative Poles",
    productModel: "SSILDP01",
  });

  React.useEffect(() => {
    let isMounted = true;
    const fetchProductData = async () => {
      try {
        const prodRes = await fetchApi("/products/decorative-poles");
        if (isMounted && prodRes && prodRes.success && prodRes.product) {
          if (prodRes.product.heroImage) {
            setBannerImage(prodRes.product.heroImage);
          }
          if (Array.isArray(prodRes.product.designs) && prodRes.product.designs.length > 0) {
            setProductsList(
              prodRes.product.designs.map((d: any, idx: number) => ({
                id: d._id || d.id || `ssildp-${String(idx + 1).padStart(2, "0")}`,
                name: d.name || `SSILDP${String(idx + 1).padStart(2, "0")}`,
                dayImage: d.dayImage || "",
                nightImage: d.nightImage || d.dayImage || "",
                specs: d.specs || "IP66 Weatherproof • Custom Engineering • ISO Standards",
              }))
            );
          }
        }
      } catch (err) {
        // Fallback to initial defaults
      }
    };
    fetchProductData();
    return () => {
      isMounted = false;
    };
  }, []);

  const [previewImage, setPreviewImage] = useState<{
    isOpen: boolean;
    imageSrc: string;
    title: string;
    subtitle?: string;
  }>({
    isOpen: false,
    imageSrc: "",
    title: "",
    subtitle: "",
  });

  const openImagePreview = (imageSrc: string, modelName: string) => {
    setPreviewImage({
      isOpen: true,
      imageSrc,
      title: modelName,
      subtitle: "LED Decorative Poles Model Specification",
    });
  };

  const closeImagePreview = () => {
    setPreviewImage((prev) => ({ ...prev, isOpen: false }));
  };

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
      <section className="relative z-10 w-full h-[54vh] sm:h-[62vh] max-h-[540px] flex flex-col justify-between overflow-hidden rounded-none pt-24 pb-10 sm:pb-12 bg-slate-950">
        {/* Full-bleed Background Image */}
        <Image
          src={bannerImage}
          alt="LED Decorative Poles SSIL Hero"
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
            <span className="text-ssil-red">LED Decorative Poles</span>
          </div>
        </div>

        {/* Bottom Content Container */}
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 text-left flex flex-col items-start">
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
      {/* 3. AVAILABLE DESIGNS GRID (41 MODELS: SSILDP01 - SSILDP41) */}
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
                Available Designs
              </h2>
            </div>
            
            <span className="text-xs font-bold text-ssil-red uppercase tracking-wider bg-ssil-red/10 border border-ssil-red/20 px-3 py-1.5 rounded-none self-start sm:self-auto">
              {productsList.length} Available Models
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
            {productsList.map((item) => (
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
                  onImageClick={(src, name) => openImagePreview(src, name)}
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
      {/* 7. CALL TO ACTION SECTION */}
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

      {/* Image Preview Lightbox Modal */}
      <ImagePreviewModal
        isOpen={previewImage.isOpen}
        imageSrc={previewImage.imageSrc}
        title={previewImage.title}
        subtitle={previewImage.subtitle}
        onClose={closeImagePreview}
        onEnquire={(model) => openEnquiry(model)}
      />

    </div>
  );
}
