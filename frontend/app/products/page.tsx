"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { catalogProducts, CatalogProduct } from "@/data/products-catalog";
import { ProductCard } from "@/components/ui/product-card";
import { ProductFaqSection } from "@/components/ui/product-faq";
import { ComingSoonModal } from "@/components/ui/coming-soon-modal";
import { fetchApi } from "@/lib/admin-api";
import { NEUTRAL_BANNER_PLACEHOLDER } from "@/lib/placeholders";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

export default function ProductsPage() {
  // Always initialize with the full hardcoded catalog products
  const [products, setProducts] = useState<CatalogProduct[]>(catalogProducts);
  const [bannerImage, setBannerImage] = useState<string>(NEUTRAL_BANNER_PLACEHOLDER);
  const [comingSoonProduct, setComingSoonProduct] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      try {
        const data = await fetchApi("/products");
        if (isMounted && data.success && Array.isArray(data.products) && data.products.length > 0) {
          const remoteMap = new Map(data.products.map((p: any) => [p.slug, p]));
          const merged: CatalogProduct[] = catalogProducts.map((local) => {
            const remote = remoteMap.get(local.slug);
            if (remote) {
              return {
                ...local,
                name: remote.name || local.name,
                dayImage: remote.dayImage || local.dayImage,
                nightImage: remote.nightImage || local.nightImage,
                description: remote.description || local.description,
                tagline: remote.tagline || local.tagline,
                designCount: remote.designCount !== undefined ? remote.designCount : local.designCount,
              };
            }
            return local;
          });

          // Append newly created products from MongoDB
          data.products.forEach((remote: any) => {
            if (!catalogProducts.some((local) => local.slug === remote.slug)) {
              merged.push({
                id: remote._id || remote.id,
                name: remote.name,
                slug: remote.slug,
                category: remote.category || "General",
                tagline: remote.tagline || "",
                description: remote.description || "",
                dayImage: remote.dayImage || "",
                nightImage: remote.nightImage || remote.dayImage || "",
                designCount: remote.designCount || 0,
                galleryImages: remote.galleryImages || [],
              });
            }
          });

          // Set banner from first product that has a heroImage
          const foundHero = data.products.find((p: any) => p.heroImage);
          if (foundHero && foundHero.heroImage) {
            setBannerImage(foundHero.heroImage);
          }

          setProducts(merged);
        }
      } catch (err) {
        // Fallback to static catalogProducts
      }
    };

    fetchProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  const isSolar = (p: CatalogProduct) =>
    (p.category && p.category.toLowerCase().includes("solar")) ||
    (p.slug && p.slug.toLowerCase().includes("solar")) ||
    (p.name && p.name.toLowerCase().includes("solar"));

  const mainstreamList = products.filter((p) => !isSolar(p));
  const solarList = products.filter((p) => isSolar(p));

  return (
    <div className="relative min-h-screen w-full bg-white dark:bg-black text-slate-900 dark:text-white transition-colors duration-300 overflow-hidden">
      
      {/* ============================================================ */}
      {/* 1. FULL-BLEED HERO BANNER */}
      {/* ============================================================ */}
      <section className="relative z-10 w-full h-[52vh] sm:h-[60vh] max-h-[500px] flex items-end overflow-hidden rounded-none pt-24 pb-10 sm:pb-12 bg-slate-950">
        
        {/* Full-bleed Background Image */}
        <img
          src={bannerImage}
          alt="SSIL Products Overview Hero"
          className="absolute inset-0 w-full h-full object-cover object-center rounded-none"
          loading="eager"
          decoding="sync"
          fetchPriority="high"
        />

        {/* Glass Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/45 to-transparent rounded-none pointer-events-none" />

        {/* Extreme Left Hero Content */}
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 text-left flex flex-col items-start">
          <h1 className="text-[20px] sm:text-[30px] md:text-[36px] font-black text-white tracking-tight leading-snug drop-shadow-md max-w-2xl">
            Engineered Lighting for <span className="text-ssil-red">Modern</span> Infrastructure
          </h1>

          <p className="mt-2 text-xs sm:text-[13px] text-slate-200 font-medium max-w-xl leading-relaxed drop-shadow-xs">
            SSIL designs and delivers customized lighting systems for highways, urban infrastructure, commercial developments, architectural spaces, and large-scale projects.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. MAINSTREAM PRODUCTS SECTION (16 PRODUCTS) */}
      {/* ============================================================ */}
      <section className="relative z-10 py-14 sm:py-20 bg-white dark:bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          {/* Left Slide-In Animated Header */}
          <motion.div
            className="text-left max-w-4xl mb-10 sm:mb-12 border-l-[5px] border-ssil-red pl-4 sm:pl-5"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
              OUR PRODUCTS
            </h2>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 mt-2.5 leading-relaxed font-medium">
              Shiv Shakti India Limited (SSIL) manufactures and supplies complete commercial, municipal, and highway outdoor lighting systems engineered for public landmarks and urban infrastructure across India.
            </p>
          </motion.div>

          {/* 16 Mainstream Products Grid */}
          <div className="mb-8">
            <motion.div
              className="w-full flex flex-wrap justify-center gap-2.5 sm:gap-3 lg:gap-3.5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={containerVariants}
            >
              {mainstreamList.map((product) => {
                const isComingSoon =
                  product.slug === "heritage-brackets" ||
                  product.slug === "wall-lights" ||
                  product.id === "cat-15" ||
                  product.id === "cat-16";

                return (
                  <div
                    key={product.slug || product.id}
                    className="w-full sm:w-[calc((100%-0.75rem)/2)] lg:w-[calc((100%-2.625rem)/4)] flex"
                  >
                    <ProductCard
                      name={product.name}
                      dayImage={product.dayImage}
                      nightImage={product.nightImage}
                      href={`/products/${product.slug}`}
                      buttonText={isComingSoon ? "Launching Soon" : "View All"}
                      showArrow={!isComingSoon}
                      onEnquire={
                        isComingSoon
                          ? () => setComingSoonProduct(product.name)
                          : undefined
                      }
                    />
                  </div>
                );
              })}
            </motion.div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 2.5 GO GREEN & SOLAR INFRASTRUCTURE SECTION (5 PRODUCTS) */}
      {/* ============================================================ */}
      <section className="relative z-10 py-16 bg-slate-50 dark:bg-zinc-950 border-t border-b border-slate-200 dark:border-zinc-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          {/* Green Border Header */}
          <motion.div
            className="text-left max-w-4xl mb-10 sm:mb-12 border-l-[5px] border-emerald-500 pl-4 sm:pl-5"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <span className="text-xs font-black uppercase tracking-widest text-emerald-500 block mb-1">
              CLEAN ENERGY &amp; SUSTAINABLE SOLUTIONS
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
              GO GREEN SOLAR INFRASTRUCTURE
            </h2>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 mt-2.5 leading-relaxed font-medium">
              Explore SSIL&apos;s engineered solar lighting systems and commercial power plants—delivering autonomous, zero-emission illumination and grid-resilient renewable energy.
            </p>
          </motion.div>

          {/* 5 Solar Products: Top 3 + Bottom 2 Centralized */}
          <div className="mb-4 space-y-3.5">
            {/* Top Row: 3 Products */}
            <motion.div
              className="w-full flex flex-wrap justify-center gap-2.5 sm:gap-3 lg:gap-3.5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={containerVariants}
            >
              {solarList.slice(0, 3).map((product) => (
                <div
                  key={product.slug || product.id}
                  className="w-full sm:w-[calc((100%-0.75rem)/2)] lg:w-[calc((100%-1.75rem)/3)] flex"
                >
                  <ProductCard
                    name={product.name}
                    dayImage={product.dayImage}
                    nightImage={product.nightImage}
                    href={`/products/${product.slug}`}
                    buttonText="View All"
                    showArrow={true}
                  />
                </div>
              ))}
            </motion.div>

            {/* Bottom Row: 2 Products Centralized */}
            <motion.div
              className="w-full flex flex-wrap justify-center gap-2.5 sm:gap-3 lg:gap-3.5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={containerVariants}
            >
              {solarList.slice(3, 5).map((product) => (
                <div
                  key={product.slug || product.id}
                  className="w-full sm:w-[calc((100%-0.75rem)/2)] lg:w-[calc((100%-1.75rem)/3)] flex"
                >
                  <ProductCard
                    name={product.name}
                    dayImage={product.dayImage}
                    nightImage={product.nightImage}
                    href={`/products/${product.slug}`}
                    buttonText="View All"
                    showArrow={true}
                  />
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. PRODUCT-RELATED FAQ SECTION */}
      {/* ============================================================ */}
      <ProductFaqSection />

      {/* Coming Soon Glass Modal */}
      <ComingSoonModal
        isOpen={Boolean(comingSoonProduct)}
        onClose={() => setComingSoonProduct(null)}
        productName={comingSoonProduct || "Upcoming Series"}
      />

    </div>
  );
}
