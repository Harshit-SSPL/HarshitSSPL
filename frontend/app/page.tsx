import React from "react";
import Image from "next/image";
import Link from "next/link";
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
    <div className="flex flex-col gap-0">
      {/* Primary Hero Section with SSIL Video Background */}
      <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-start overflow-hidden pt-20 pb-16">
        
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

        {/* Contrast Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-slate-950/30 z-10" />

        {/* Hero Text & CTA Content Container */}
        <div className="container mx-auto px-4 md:px-6 relative z-20 text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl leading-[1.1] text-white">
              Architectural &amp; Outdoor <span className="text-ssil-red drop-shadow-sm">Infrastructure</span> Lighting
            </h1>
            <p className="mt-6 text-lg text-slate-200 leading-relaxed font-normal max-w-2xl drop-shadow-sm">
              Shiv Shakti India Limited (SSIL) delivers engineered lighting solutions for highways, municipal corridors, commercial developments, and monumental infrastructure projects across India.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <Button asChild size="lg" className="bg-ssil-red hover:bg-ssil-red-600 font-bold px-8 shadow-md text-white">
                <Link href="/products">
                  Explore Products Catalog <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/40 text-white hover:bg-white/10 font-bold px-8 backdrop-blur-sm">
                <Link href="/projects">
                  View Executed Projects
                </Link>
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8 border-t border-white/15 max-w-2xl">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-ssil-red shrink-0" />
                <span className="text-xs font-semibold text-slate-200">ISO Quality Standards</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-ssil-blue shrink-0" />
                <span className="text-xs font-semibold text-slate-200">IP66 Protection</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-ssil-red shrink-0" />
                <span className="text-xs font-semibold text-slate-200">Custom Engineering</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Component 1: Corporate Stats */}
      <Stats2 />

      {/* Component 2: Sticky Scroll Reveal (SSIL Solutions Showcase) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-10 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-ssil-red">
              LIGHTING INFRASTRUCTURE CATEGORIES
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
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
