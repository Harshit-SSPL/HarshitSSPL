"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Award, CheckCircle2 } from "lucide-react";

export interface NavLink {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface Partner {
  name: string;
  logoUrl?: string;
  href?: string;
}

export interface ResponsiveHeroBannerProps {
  backgroundImageUrl?: string;
  badgeLabel?: string;
  badgeText?: string;
  title?: string;
  titleLine2?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  partnersTitle?: string;
  partners?: Partner[];
}

const defaultPartners: Partner[] = [
  { name: "IndianOil", href: "/projects" },
  { name: "M3M India", href: "/projects" },
  { name: "DAE Government", href: "/projects" },
  { name: "BPTP Infra", href: "/projects" },
  { name: "Mahagun Group", href: "/projects" },
];

export const ResponsiveHeroBanner: React.FC<ResponsiveHeroBannerProps> = ({
  backgroundImageUrl = "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=2000&q=80",
  badgeLabel = "SSIL INDIA",
  badgeText = "Premier Infrastructure & Architectural Lighting Manufacturer",
  title = "Complete Lighting Infrastructure",
  titleLine2 = "Under One Roof",
  description = "SSIL is one of the most equipped and major manufacturers of lighting solution providers in the global market. We are an experienced organization in the field of complete lighting solutions, enclosing all your requirements in a single basket.",
  primaryButtonText = "Explore Product Range",
  primaryButtonHref = "/products",
  secondaryButtonText = "Contact Our Engineers",
  secondaryButtonHref = "/contact",
  partnersTitle = "Trusted by leading infrastructure developers & municipal bodies nationwide",
  partners = defaultPartners,
}) => {
  return (
    <section className="w-full isolate relative min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-center overflow-hidden pt-24 sm:pt-28 pb-12 sm:pb-16 bg-slate-950 text-white transition-colors duration-300">
      
      {/* Background Image with Dark Vignette & Soft Gradient Blur Overlay for Perfect Light/Dark Contrast */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <img
          src={backgroundImageUrl}
          alt="SSIL Architectural & Infrastructure Lighting"
          className="w-full h-full object-cover object-center scale-105 filter brightness-75 contrast-110"
        />
        {/* Layered Gradient Overlay for Dual-Theme Ambient Lighting */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-900/75 to-slate-950/95 dark:from-slate-950/90 dark:via-slate-950/80 dark:to-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-transparent to-slate-950/90" />
        
        {/* Ambient Red Glow Backlight */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-ssil-red/25 rounded-full blur-[120px] pointer-events-none" />
      </div>

      {/* Main Hero Content Area */}
      <div className="z-10 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="mx-auto max-w-3xl text-center">
          
          {/* Badge Pill */}
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full bg-white/10 dark:bg-slate-900/80 px-3 py-1.5 ring-1 ring-white/20 dark:ring-slate-700/80 backdrop-blur-md animate-fade-slide-in-1 shadow-lg">
            <span className="inline-flex items-center text-[11px] font-extrabold text-white bg-ssil-red rounded-full py-0.5 px-2.5 uppercase tracking-wider">
              {badgeLabel}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-100">
              {badgeText}
            </span>
          </div>

          {/* Main Title Lines */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] animate-fade-slide-in-2 drop-shadow-md">
            {title}
            {titleLine2 && (
              <>
                <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
                  {" "}{titleLine2}
                </span>
              </>
            )}
          </h1>

          {/* Description Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-slate-200 animate-fade-slide-in-3 max-w-2xl mt-5 sm:mt-6 mx-auto leading-relaxed font-normal">
            {description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:gap-4 mt-8 sm:mt-10 gap-3.5 items-center justify-center animate-fade-slide-in-4">
            <Link
              href={primaryButtonHref}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-ssil-red hover:bg-red-700 text-white font-extrabold text-sm px-6 py-3.5 shadow-lg shadow-red-900/30 transition-all hover:scale-105"
            >
              <span>{primaryButtonText}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href={secondaryButtonHref}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-extrabold text-sm px-6 py-3.5 ring-1 ring-white/20 backdrop-blur-md transition-all hover:scale-105"
            >
              <span>{secondaryButtonText}</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

        </div>

        {/* Client Partners / Corporate Credentials Marquee Strip */}
        {partners && partners.length > 0 && (
          <div className="mx-auto mt-14 sm:mt-16 max-w-4xl pt-6 border-t border-white/10">
            <p className="animate-fade-slide-in-1 text-xs font-extrabold tracking-wider uppercase text-slate-400 text-center mb-4">
              {partnersTitle}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 animate-fade-slide-in-2 text-slate-300">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xs text-xs font-bold text-slate-200 hover:border-ssil-red/60 hover:text-white transition-colors"
                >
                  {partner.name}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </section>
  );
};

export default ResponsiveHeroBanner;
