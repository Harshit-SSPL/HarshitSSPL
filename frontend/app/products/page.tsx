"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { catalogProducts, CatalogProduct } from "@/data/products-catalog";
import { ProductCard } from "@/components/ui/product-card";
import { ProductFaqSection } from "@/components/ui/product-faq";

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s timeout

        const res = await fetch(`${apiUrl}/products`, { signal: controller.signal });
        clearTimeout(timeoutId);

        const data = await res.json();
        if (data.success && Array.isArray(data.products) && data.products.length > 0) {
          // Merge API data over hardcoded data so all 18 products are always preserved
          const merged = catalogProducts.map((local) => {
            const remote = data.products.find((p: any) => p.slug === local.slug);
            if (remote) {
              return {
                ...local,
                ...remote,
                dayImage: remote.dayImage || local.dayImage,
                nightImage: remote.nightImage || local.nightImage,
              };
            }
            return local;
          });
          setProducts(merged);
        }
      } catch (err) {
        // Fallback to hardcoded catalogProducts on network lag or error
        setProducts(catalogProducts);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-white dark:bg-black text-slate-900 dark:text-white transition-colors duration-300 overflow-hidden">
      
      {/* ============================================================ */}
      {/* 1. FULL-BLEED HERO BANNER */}
      {/* ============================================================ */}
      <section className="relative z-10 w-full h-[52vh] sm:h-[60vh] max-h-[500px] flex items-end overflow-hidden rounded-none pt-24 pb-10 sm:pb-12">
        
        {/* Full-bleed Background Image */}
        <img
          src="/products/products-hero.png"
          alt="SSIL World Street Night Lighting Installation"
          className="absolute inset-0 w-full h-full object-cover object-center rounded-none"
          loading="eager"
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
      {/* 2. OUR PRODUCTS SECTION */}
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

          {/* 18 Official Catalog Products Grid */}
          <div className="mb-8">
            <motion.div
              className="w-full flex flex-wrap justify-center gap-2.5 sm:gap-3 lg:gap-3.5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={containerVariants}
            >
              {products.map((product) => (
                <div
                  key={product.slug || product.id}
                  className="w-full sm:w-[calc((100%-0.75rem)/2)] lg:w-[calc((100%-2.625rem)/4)] flex"
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

    </div>
  );
}
