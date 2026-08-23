"use client";

import React from "react";
import Link from "next/link";

export default function TermsOfServicePage() {
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 pt-28 sm:pt-32 md:pt-36 pb-16 md:pb-20">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        
        {/* Single Terms of Service Heading (Exact 1 Heading, Black in Light Mode, White in Dark Mode) */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase mb-6">
          TERMS OF SERVICE
        </h1>

        {/* Thin Horizontal Divider */}
        <div className="border-b border-slate-200 dark:border-slate-800 mb-8 sm:mb-12" />

        {/* Asymmetric Composition: Left Whitespace (4 Cols) + Right-Shifted Content (8 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Side: Intentional Whitespace on Desktop (4 Cols) */}
          <div className="hidden lg:block lg:col-span-4" />

          {/* Right Side: Primary Content Composition (8 Cols) */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-8">
            
            {/* Large Bold Terms Statement */}
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 dark:text-white leading-snug">
              These Terms of Service govern your access to and use of Shiv Shakti India Limited&apos;s website, product catalogs, technical documentation, and commercial inquiry services.
            </p>

            {/* Slightly Emphasized Supporting Statement */}
            <p className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 border-l-2 border-slate-300 dark:border-slate-700 pl-4 py-0.5">
              By accessing or using SSIL&apos;s digital platforms, you agree to comply with and be bound by these Terms of Service.
            </p>

            {/* Compact Legal Sections Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 pt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed border-t border-slate-200/60 dark:border-slate-800/80">
              
              {/* Section 1 — Overview & Agreement */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                  01 Overview
                </h4>
                <p>
                  These Terms apply to all visitors, commercial contractors, municipal representatives, and clients who access Shiv Shakti India Limited (SSIL) digital channels and corporate services.
                </p>
              </div>

              {/* Section 2 — Website Usage */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                  02 Website Usage
                </h4>
                <p>
                  Our website, product specification sheets, and business inquiry features are provided solely for legitimate corporate communication, product evaluation, and project procurement purposes.
                </p>
              </div>

              {/* Section 3 — Product Information */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                  03 Product Information
                </h4>
                <p>
                  SSIL provides technical data regarding LED luminaires, octagonal poles, high mast installations, and solar systems. Product specs may be updated periodically to reflect engineering advancements.
                </p>
              </div>

              {/* Section 4 — Intellectual Property */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                  04 Intellectual Property
                </h4>
                <p>
                  All website content, engineering designs, brand marks, logos, and product graphics are the exclusive intellectual property of SSIL and may not be reproduced without prior written consent.
                </p>
              </div>

              {/* Section 5 — User Responsibilities */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                  05 User Responsibilities
                </h4>
                <p>
                  Users must provide truthful, accurate, and complete information when submitting commercial inquiries, project specifications, tender requirements, or contacting engineering personnel.
                </p>
              </div>

              {/* Section 6 — Limitation of Liability */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                  06 Limitation of Liability
                </h4>
                <p>
                  SSIL strives to ensure precise technical information on its website but shall not be held liable for indirect damages arising from external reliance prior to official commercial contracts.
                </p>
              </div>

              {/* Section 7 — Updates & Contact */}
              <div className="space-y-1.5 sm:col-span-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                  07 Updates &amp; Contact
                </h4>
                <p>
                  SSIL reserves the right to modify these Terms of Service at any time. For questions regarding these terms, please contact our administrative team via the official{" "}
                  <Link href="/contact" className="text-slate-900 dark:text-white font-semibold underline underline-offset-4 hover:text-ssil-red transition-colors">
                    Contact Us
                  </Link>{" "}
                  page.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
