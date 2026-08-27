"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { galleryProjects } from "@/data/gallery-projects";

// Animation Variants matching Home & About Us design system
const sectionVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.21, 0.47, 0.32, 0.98],
      staggerChildren: 0.08,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export default function GalleryPage() {
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="flex flex-col gap-0 bg-white dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen transition-colors duration-300 overflow-hidden">
      
      {/* ============================================================ */}
      {/* 1. HERO SECTION: FULL-WIDTH BANNER WITH SSIL REAL INFRASTRUCTURE IMAGE */}
      {/* ============================================================ */}
      <section className="relative z-10 w-full h-[55vh] sm:h-[62vh] max-h-[560px] flex items-end overflow-hidden rounded-none pt-28 pb-10 sm:pb-14">
        
        {/* Full-bleed Background Hero Image */}
        <Image
          src="/products/products-hero.png"
          alt="SSIL Real World Infrastructure & Lighting Projects"
          fill
          priority
          className="object-cover object-center rounded-none brightness-90"
        />

        {/* Gradient Overlay matching SSIL dark theme for high contrast readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/30 rounded-none pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />

        {/* Hero Content Container */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-left flex flex-col items-start max-w-7xl">
          
          {/* Eyebrow Label */}
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-ssil-red block mb-2">
            OUR GALLERY • EXECUTED WORK
          </span>

          {/* Main Editorial Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-[1.05] drop-shadow-md max-w-3xl">
            LIGHTING IN THE <br />
            <span className="text-ssil-red">REAL WORLD.</span>
          </h1>

          {/* Subtitle Statement */}
          <p className="mt-3 text-sm sm:text-base md:text-lg text-slate-300 font-medium max-w-2xl leading-relaxed drop-shadow-xs">
            A visual showcase of SSIL&apos;s real-world executed projects, monumental flag masts, highway corridors, urban smart cities, and architectural installations across India.
          </p>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. REAL-WORLD PROJECT CASE STUDIES GALLERY (ALTERNATING RHYTHM) */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-20 md:py-28 bg-white dark:bg-slate-950 text-slate-900 dark:text-white space-y-20 sm:space-y-28 md:space-y-36 transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-20 sm:space-y-28 md:space-y-36">
          
          {galleryProjects.map((project, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={project.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.15 }}
                variants={sectionVariants}
                className="relative group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
              >
                
                {/* -------------------------------------------------- */}
                {/* IMAGE CONTAINER WITH NUMBER ABOVE (ALTERNATES LEFT / RIGHT) */}
                {/* -------------------------------------------------- */}
                <motion.div
                  variants={childVariants}
                  className={`lg:col-span-6 flex flex-col ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  {/* Large Project Index Number Positioned Above the Photo */}
                  <div className="mb-2 sm:mb-3">
                    <span className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none select-none text-ssil-red/25 dark:text-ssil-red/30 group-hover:text-ssil-red transition-colors duration-500 inline-block">
                      {project.number}
                    </span>
                  </div>

                  {/* Image Card Container */}
                  <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 dark:border-zinc-800/90 bg-slate-100 dark:bg-zinc-900 shadow-xl transition-all duration-500 group-hover:border-ssil-red/50 group-hover:shadow-ssil-red/10">
                    <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Gradient Overlay for visual richness */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
                      
                      {/* Floating Category Badge with Navbar-inspired transparency and white text */}
                      <div className="absolute top-4 left-4 z-20">
                        <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-white bg-slate-950/40 dark:bg-slate-950/50 backdrop-blur-xl border border-ssil-red/40 px-3.5 py-1.5 rounded-full shadow-lg inline-block">
                          {project.categoryTag}
                        </span>
                      </div>

                      {/* Bottom Location Indicator */}
                      <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center gap-1.5 text-xs text-slate-200 font-semibold drop-shadow-md">
                        <MapPin className="h-3.5 w-3.5 text-ssil-red shrink-0" />
                        <span className="truncate">{project.location}</span>
                      </div>
                    </div>

                    {/* Red Bottom Hover Accent Bar */}
                    <div className="h-1 w-full bg-ssil-red origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                  </div>
                </motion.div>

                {/* -------------------------------------------------- */}
                {/* PROJECT INFORMATION EDITORIAL AREA */}
                {/* -------------------------------------------------- */}
                <motion.div
                  variants={childVariants}
                  className={`lg:col-span-6 flex flex-col justify-center space-y-5 sm:space-y-6 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  {/* Project Title */}
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-[1.15] group-hover:text-ssil-red transition-colors duration-300">
                    {project.title}
                  </h2>

                  {/* WHAT SSIL PROVIDED BADGE & DESCRIPTION */}
                  <div className="p-5 sm:p-7 rounded-2xl bg-slate-50 dark:bg-zinc-900/90 border border-slate-200/90 dark:border-zinc-800/80 space-y-3 relative overflow-hidden shadow-sm">
                    <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-ssil-red" />

                    <div className="flex items-center gap-2.5 text-xs sm:text-sm font-black uppercase tracking-widest text-ssil-red">
                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-ssil-red shrink-0" />
                      <span>WHAT SSIL PROVIDED</span>
                    </div>

                    <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
                      {project.provided}
                    </p>
                  </div>

                </motion.div>

              </motion.div>
            );
          })}

        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. CLOSING CTA SECTION BEFORE FOOTER */}
      {/* ============================================================ */}
      <section className="py-14 sm:py-18 md:py-24 bg-slate-100 dark:bg-black text-slate-900 dark:text-white border-t border-slate-200 dark:border-zinc-900 relative overflow-hidden transition-colors duration-300">
        
        {/* Background Red Accent Glow */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-ssil-red/15 blur-[140px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl text-center relative z-10">
          
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-ssil-red block mb-3">
            SSIL INFRASTRUCTURE CAPABILITY
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-tight mb-4">
            BUILT FOR THE SPACES <br />
            <span className="text-ssil-red">THAT MATTER.</span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-700 dark:text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed mb-8">
            From individual commercial installations to nationwide expressway infrastructure, SSIL delivers lighting solutions engineered for real-world reliability and long-term performance.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-ssil-red hover:bg-ssil-red-600 font-bold px-8 py-3.5 rounded-full text-white text-sm sm:text-base shadow-lg shadow-ssil-red/25 hover:shadow-ssil-red/40 transition-all duration-300 hover:scale-105"
            >
              <Link href="/contact">
                Enquire for Project Execution <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-900 dark:text-white border border-slate-300 dark:border-zinc-700 hover:border-slate-400 dark:hover:border-zinc-500 font-bold px-8 py-3.5 rounded-full text-sm sm:text-base transition-all duration-300 shadow-sm"
            >
              <Link href="/products">
                <ShieldCheck className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-ssil-red" /> Explore Products
              </Link>
            </Button>
          </div>

        </div>
      </section>

    </div>
  );
}
