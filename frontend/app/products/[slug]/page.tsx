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
import { catalogProducts, CatalogProduct, GalleryItem } from "@/data/products-catalog";
import { ProductCard } from "@/components/ui/product-card";
import { EnquiryModal } from "@/components/ui/enquiry-modal";
import { ImagePreviewModal } from "@/components/ui/image-preview-modal";
import { fetchApi } from "@/lib/admin-api";
import { NEUTRAL_BANNER_PLACEHOLDER } from "@/lib/placeholders";
import { useResilientImage } from "@/lib/use-resilient-image";

const ProductHeroBanner = ({ product }: { product: CatalogProduct }) => {
  const resilientHero = useResilientImage({
    liveSrc: product.heroImage,
    keyOptions: {
      type: "hero",
      slug: product.slug,
      variant: "hero",
    },
    placeholderType: "banner",
  });

  return (
    <section className="relative z-10 w-full h-[54vh] sm:h-[62vh] max-h-[540px] flex flex-col justify-between overflow-hidden rounded-none pt-24 pb-10 sm:pb-12 bg-slate-950">
      {/* Full-bleed Background Image */}
      <img
        src={resilientHero.src}
        alt={`${product.name} SSIL Hero`}
        className="absolute inset-0 w-full h-full object-cover object-center rounded-none"
        onLoad={resilientHero.onLoad}
        onError={resilientHero.onError}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-slate-950/20 rounded-none pointer-events-none" />

      {/* Top Breadcrumb Navigation */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 text-left pt-2 sm:pt-4">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-300">
          <Link href="/products" className="hover:text-ssil-red transition-colors flex items-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5" /> Products
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-ssil-red" />
          <span className="text-ssil-red">{product.name}</span>
        </div>
      </div>

      {/* Bottom Content Container */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 text-left flex flex-col items-start">
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
  );
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
    if (lower === "solar-pilar-lights") return "solar-pillar-lights";
    if (lower === "solar-lights" || lower === "solar-lighting") return "solar-street-lights";
    return lower;
  };

  const resolvedSlug = normalizeSlug(slug);
  const fallbackProduct = catalogProducts.find(
    (p) => p.slug === slug || p.slug === resolvedSlug || p.id === slug
  );

  const [apiProduct, setApiProduct] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchProductData = async () => {
      if (!slug) return;
      try {
        const targetSlug = resolvedSlug || slug;
        const data = await fetchApi(`/products/${targetSlug}`);
        if (isMounted && data.success && data.product) {
          setApiProduct(data.product);
        }
      } catch (err) {
        // Fallback to static catalogProduct
      }
    };

    fetchProductData();
    return () => {
      isMounted = false;
    };
  }, [slug, resolvedSlug]);

  const product: CatalogProduct | undefined = React.useMemo(() => {
    if (!fallbackProduct && !apiProduct) return undefined;
    if (!apiProduct) return fallbackProduct;

    let finalGallery: GalleryItem[] = [];
    if (Array.isArray(apiProduct.designs) && apiProduct.designs.length > 0) {
      finalGallery = apiProduct.designs.map((d: any, idx: number) => ({
        id: d._id || d.id || `design-${idx + 1}`,
        name: d.name || `Model ${String(idx + 1).padStart(2, "0")}`,
        dayImage: d.dayImage || "",
        nightImage: d.nightImage || d.dayImage || "",
        specs: d.specs || "IP66 Weatherproof • Custom Engineering • ISO Standards",
      }));
    } else if (fallbackProduct?.galleryImages && fallbackProduct.galleryImages.length > 0) {
      finalGallery = fallbackProduct.galleryImages;
    }

    return {
      ...(fallbackProduct || {}),
      ...apiProduct,
      name: apiProduct.name || fallbackProduct?.name || "Product",
      tagline: apiProduct.tagline || fallbackProduct?.tagline || "",
      description: apiProduct.description || fallbackProduct?.description || "",
      designCount: finalGallery.length || apiProduct.designCount || fallbackProduct?.designCount || 0,
      galleryImages: finalGallery,
      dayImage: apiProduct.dayImage || fallbackProduct?.dayImage || "",
      nightImage: apiProduct.nightImage || fallbackProduct?.nightImage || "",
      heroImage: apiProduct.heroImage || fallbackProduct?.heroImage || NEUTRAL_BANNER_PLACEHOLDER,
    } as CatalogProduct;
  }, [fallbackProduct, apiProduct]);

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

  const openImagePreview = (imageSrc: string, modelName: string) => {
    setPreviewImage({
      isOpen: true,
      imageSrc,
      title: modelName,
      subtitle: `${product.name} Model Specification`,
    });
  };

  const closeImagePreview = () => {
    setPreviewImage((prev) => ({ ...prev, isOpen: false }));
  };


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
      <ProductHeroBanner product={product} />

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
      {/* 3. PRODUCT IMAGE GALLERY */}
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
                  onImageClick={(imgSrc, name) => openImagePreview(imgSrc, name)}
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
      {/* 8. ENQUIRY MODAL & IMAGE PREVIEW LIGHTBOX */}
      {/* ============================================================ */}
      <EnquiryModal
        isOpen={enquiryState.isOpen}
        onClose={closeEnquiry}
        productCategory={enquiryState.productCategory}
        productModel={enquiryState.productModel}
      />

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
