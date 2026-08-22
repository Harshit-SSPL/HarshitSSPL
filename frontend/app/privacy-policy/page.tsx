"use client";

import React from "react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
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
        
        {/* Single Privacy Policy Heading (Exact 1 Heading, Black in Light Mode, White in Dark Mode) */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase mb-6">
          PRIVACY POLICY
        </h1>

        {/* Thin Horizontal Divider */}
        <div className="border-b border-slate-200 dark:border-slate-800 mb-8 sm:mb-12" />

        {/* Asymmetric Composition: Left Whitespace (4 Cols) + Right-Shifted Content (8 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Side: Intentional Whitespace on Desktop (4 Cols) */}
          <div className="hidden lg:block lg:col-span-4" />

          {/* Right Side: Primary Content Composition (8 Cols) */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-8">
            
            {/* Large Bold Policy Statement */}
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 dark:text-white leading-snug">
              This Privacy Policy explains how Shiv Shakti India Limited collects, uses, protects, and handles information when you interact with our website, submit an inquiry, or communicate with our business teams.
            </p>

            {/* Slightly Emphasized Supporting Statement */}
            <p className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 border-l-2 border-slate-300 dark:border-slate-700 pl-4 py-0.5">
              Information submitted to SSIL is used only for legitimate business, communication, service, and security purposes.
            </p>

            {/* Four Small Supporting Paragraphs (2-Column Grid on Right Side) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 pt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed border-t border-slate-200/60 dark:border-slate-800/80">
              
              {/* Paragraph 1 — Information We Collect */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                  Information We Collect
                </h4>
                <p>
                  SSIL may collect information voluntarily provided through contact and inquiry forms, including your name, email address, phone number, company details, project requirements, product interests, and other business-related information.
                </p>
              </div>

              {/* Paragraph 2 — How We Use Information */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                  How We Use Information
                </h4>
                <p>
                  We use submitted information to respond to product and project inquiries, provide technical or commercial assistance, communicate with customers and business partners, and improve our website, services, and security.
                </p>
              </div>

              {/* Paragraph 3 — Sharing and Security */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                  Sharing and Security
                </h4>
                <p>
                  SSIL does not sell or rent personal information. Information may be shared only when reasonably necessary for legitimate business, legal, operational, or safety purposes, while reasonable safeguards are used to protect submitted information.
                </p>
              </div>

              {/* Paragraph 4 — Rights and Updates */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                  Rights and Updates
                </h4>
                <p>
                  You may contact SSIL through the official{" "}
                  <Link href="/contact" className="text-slate-900 dark:text-white font-semibold underline underline-offset-4 hover:text-ssil-red transition-colors">
                    Contact Us
                  </Link>{" "}
                  page regarding information you have submitted or questions about this Privacy Policy. We may update this policy when operational, legal, or regulatory requirements change.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
