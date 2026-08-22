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
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        
        {/* Single Privacy Policy Heading (Exact 1 Heading, Black in Light Mode, White in Dark Mode) */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase mb-6">
          PRIVACY POLICY
        </h1>

        {/* Thin Horizontal Divider */}
        <div className="border-b border-slate-200 dark:border-slate-800 mb-8 sm:mb-10 md:mb-12" />

        {/* Compact 4-Paragraph Editorial 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 sm:gap-y-8 md:gap-y-10 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300 font-normal">
          
          {/* Left Column (Paragraph 1 & Paragraph 3) */}
          <div className="space-y-6 sm:space-y-8">
            {/* Paragraph 1 — Privacy Overview */}
            <p>
              Shiv Shakti India Limited (&quot;SSIL&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) respects your privacy and is committed to protecting the information you voluntarily provide when interacting with our website and inquiry services.
            </p>

            {/* Paragraph 3 — How Information Is Used */}
            <p>
              Information is used to respond to inquiries, provide requested product or project information, communicate with customers, improve website functionality and security, and meet applicable legal or business requirements.
            </p>
          </div>

          {/* Right Column (Paragraph 2 & Paragraph 4) */}
          <div className="space-y-6 sm:space-y-8">
            {/* Paragraph 2 — Information We Collect */}
            <p>
              We may collect information such as your name, email address, phone number, company details, project requirements, product inquiries, and other information you voluntarily submit through our contact or inquiry forms.
            </p>

            {/* Paragraph 4 — Security, Sharing & Rights */}
            <p>
              We do not sell or rent personal information. Reasonable security measures are used to protect submitted information, and information may only be shared when necessary for legitimate business, legal, or safety purposes. Users may contact SSIL through the official{" "}
              <Link href="/contact" className="text-slate-900 dark:text-white font-semibold underline underline-offset-4 hover:text-ssil-red transition-colors">
                Contact Us
              </Link>{" "}
              page regarding their submitted information.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
