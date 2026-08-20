"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Stats2 } from "@/components/ui/stats-2";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { FeatureCardDemo } from "@/components/ui/feature-card";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const stickyContent = [
  {
    title: "Expressway & Municipal Highway Luminaires",
    description: "High-output LED street lights engineered with asymmetric optical lenses for uniform road illumination, thermal management, and surge protection up to 10kV.",
    content: (
      <div className="relative h-full w-full bg-slate-900">
        <Image
          src="https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=800&q=80"
          alt="SSIL Expressway Lighting"
          fill
          className="object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
          <span className="text-xs font-bold text-white uppercase tracking-wider bg-ssil-red px-2.5 py-1 rounded">
            Mathura Expressway Executed Reference
          </span>
        </div>
      </div>
    ),
  },
  {
    title: "Architectural Landscape & Pathway Bollards",
    description: "Extruded aluminum bollards providing controlled downward illumination for residential societies, commercial high streets, and public parks.",
    content: (
      <div className="relative h-full w-full bg-slate-900">
        <Image
          src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
          alt="SSIL Landscape Bollard"
          fill
          className="object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
          <span className="text-xs font-bold text-white uppercase tracking-wider bg-ssil-blue px-2.5 py-1 rounded">
            Omaxe World Street Executed Reference
          </span>
        </div>
      </div>
    ),
  },
  {
    title: "Indian Flag Poles & High-Mast Infrastructure",
    description: "Polygonal high-mast towers and monumental national flag poles constructed with hot-dip galvanized steel for wind-resistance and structural stability.",
    content: (
      <div className="relative h-full w-full bg-slate-900">
        <Image
          src="https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=800&q=80"
          alt="SSIL Indian Flag Poles"
          fill
          className="object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
          <span className="text-xs font-bold text-white uppercase tracking-wider bg-ssil-red px-2.5 py-1 rounded">
            High-Mast Engineering
          </span>
        </div>
      </div>
    ),
  },
  {
    title: "Off-Grid Standalone Solar Street Lighting",
    description: "All-in-one solar street luminaires equipped with high-efficiency PV panels, MPPT controllers, and long-life LiFePO4 battery packs.",
    content: (
      <div className="relative h-full w-full bg-slate-900">
        <Image
          src="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80"
          alt="SSIL Solar Lighting"
          fill
          className="object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
          <span className="text-xs font-bold text-white uppercase tracking-wider bg-ssil-blue px-2.5 py-1 rounded">
            Off-Grid Solar Solutions
          </span>
        </div>
      </div>
    ),
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col gap-0 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Primary Hero Section with SSIL Video Background */}
      <section className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center justify-start overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28 lg:pt-48 lg:pb-32">
        
        {/* Hero Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover z-0"
        >
          <source src="/videos/homepage/hero.mp4" type="video/mp4" />
        </video>

        {/* Lightened Contrast Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/45 to-transparent z-10" />

        {/* Hero Text & CTA Content Container */}
        <div className="container mx-auto px-4 md:px-6 relative z-20 text-white">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight drop-shadow-md">
              Engineered Lighting for <br className="hidden sm:inline" />
              <span className="text-ssil-red drop-shadow-sm">Modern</span> Infrastructure
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-xl drop-shadow-sm">
              SSIL designs and delivers customized lighting systems for highways, urban infrastructure, commercial developments, architectural spaces, and large-scale projects.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <Button asChild size="lg" className="bg-ssil-red hover:bg-ssil-red-600 font-bold px-8 shadow-md text-white">
                <Link href="/products">
                  Explore Products Catalog <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-slate-900/40 hover:bg-white/20 text-white border border-white/40 backdrop-blur-md font-semibold px-8 shadow-sm transition-all duration-200">
                <Link href="/projects">
                  View Executed Projects
                </Link>
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/20 max-w-xl">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-ssil-red shrink-0" />
                <span className="text-xs font-semibold text-slate-200">ISO Quality Standards</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-ssil-blue shrink-0" />
                <span className="text-xs font-semibold text-slate-200">IP66 Protection</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-ssil-red shrink-0" />
                <span className="text-xs font-semibold text-slate-200">Custom Engineering</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compact About SSIL Section */}
      <section className="py-16 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900 transition-colors">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="mb-6 text-left">
              <span className="text-xs font-extrabold uppercase tracking-widest text-ssil-red block mb-1.5">
                ABOUT SSIL
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                About Shiv Shakti India Limited
              </h2>
              <p className="text-base sm:text-lg font-bold text-ssil-blue dark:text-sky-400 mt-1.5">
                Complete Lighting Solutions, Engineered for Modern Infrastructure
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-normal pt-6 border-t border-slate-100 dark:border-slate-800/80">
              <p>
                SSIL is an established lighting solutions provider offering a comprehensive range of outdoor, indoor, solar, decorative and LED lighting solutions for commercial, residential and infrastructure applications.
              </p>
              <p>
                With expertise in lighting fixtures, LED luminaires, decorative and ornamental poles, street lighting, high-mast and flag-mast systems, SSIL combines engineering capability, modern technology and quality-focused manufacturing to deliver customized lighting solutions for diverse project requirements.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Component 1: Corporate Stats & Highlights */}
      <Stats2 />

      {/* Component 2: Sticky Scroll Reveal (SSIL Solutions Showcase) */}
      <section className="py-20 bg-white dark:bg-slate-950 transition-colors">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-10 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-ssil-red">
              LIGHTING INFRASTRUCTURE CATEGORIES
            </span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
              Engineering Excellence Across Environments
            </h2>
          </div>
          <StickyScroll content={stickyContent} />
        </div>
      </section>

      {/* Component 3: Feature Card Process Workflow */}
      <FeatureCardDemo />
    </div>
  );
}
