"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Mail } from "lucide-react";

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
    <div className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 pt-32 sm:pt-36 md:pt-40 pb-16 md:pb-24">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        
        {/* Page Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-8 mb-10">
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-ssil-red block mb-2">
            PRIVACY POLICY
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mb-4">
            Your privacy matters to us. This Privacy Policy explains how Shiv Shakti India Limited collects, uses, protects, and handles information when you interact with our website and services.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/70 dark:bg-slate-800/80 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <ShieldCheck className="h-3.5 w-3.5 text-ssil-red" />
            <span>Last Updated: August 2026</span>
          </div>
        </div>

        {/* Content Area - 12 Document Sections */}
        <div className="space-y-10 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-ssil-red">1.</span> Introduction
            </h2>
            <p>
              Shiv Shakti India Limited (&quot;SSIL&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to respecting your privacy and protecting any personal information you share with us. This Privacy Policy outlines our practices regarding the information we may collect when you visit our website, submit inquiries, or use our digital services.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-ssil-red">2.</span> Information We May Collect
            </h2>
            <p>
              We collect information that you voluntarily provide to us when contacting our technical or sales teams. This includes:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600 dark:text-slate-300">
              <li>Contact details such as your First Name, Last Name, Email Address, and Phone Number.</li>
              <li>Company name and official business designation.</li>
              <li>Project requirements, product specifications, and general inquiry messages.</li>
              <li>Technical details automatically logged during normal website operation, such as IP addresses and browser characteristics for security auditing.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-ssil-red">3.</span> How We Use Information
            </h2>
            <p>
              Information collected through our corporate portal is used exclusively for legitimate business and customer service purposes, including:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600 dark:text-slate-300">
              <li>Responding to product inquiries, quotation requests, and technical communications.</li>
              <li>Evaluating infrastructure project requirements to provide customized lighting solutions.</li>
              <li>Maintaining and improving the functionality, security, and performance of our website.</li>
              <li>Preventing fraudulent activities, unauthorized access, or misuse of our services.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-ssil-red">4.</span> Information Sharing
            </h2>
            <p>
              Shiv Shakti India Limited does not sell, rent, or trade your personal information to third parties. We share information only when necessary for legitimate operational, business, legal, or safety requirements, such as complying with legal obligations or fulfilling requested services through authorized representatives.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-ssil-red">5.</span> Data Security
            </h2>
            <p>
              We implement reasonable administrative, technical, and physical security safeguards designed to protect your information from unauthorized access, alteration, disclosure, or destruction. While we strive to maintain robust security protocols, no internet transmission or electronic storage method can be guaranteed completely immune from risk.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-ssil-red">6.</span> Data Retention
            </h2>
            <p>
              We retain information for as long as reasonably necessary to fulfill the operational purpose for which it was collected, resolve business inquiries, meet statutory requirements, or resolve disputes in compliance with applicable law.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-ssil-red">7.</span> Cookies and Similar Technologies
            </h2>
            <p>
              Our website may utilize essential functional cookies or local storage settings (such as preserving dark/light theme preferences or window scroll positions) to enhance your browsing experience. We do not employ intrusive tracking pixels or third-party behavioral advertising cookies.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-ssil-red">8.</span> Third-Party Links
            </h2>
            <p>
              Our portal may contain links to external websites, corporate profiles, or social media platforms. SSIL is not responsible for the privacy practices, content, or security standards of independent third-party websites. We encourage users to review the privacy policies of external sites before submitting information.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-ssil-red">9.</span> User Rights and Choices
            </h2>
            <p>
              You have the right to inquire about the personal information you have voluntarily submitted to us. If you wish to review, update, or request the deletion of your inquiry details, please contact our team via the official contact channels.
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-ssil-red">10.</span> Children&apos;s Privacy
            </h2>
            <p>
              Shiv Shakti India Limited provides business-to-business (B2B) and industrial infrastructure lighting solutions. Our website is intended for general commercial audiences and is not directed to individuals under 18 years of age.
            </p>
          </section>

          {/* Section 11 */}
          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-ssil-red">11.</span> Changes to This Privacy Policy
            </h2>
            <p>
              We reserve the right to modify or update this Privacy Policy at any time to reflect operational, legal, or regulatory changes. Any updates will be posted on this page with a revised &quot;Last Updated&quot; date.
            </p>
          </section>

          {/* Section 12 */}
          <section className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-ssil-red">12.</span> Contact Us
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              If you have any questions, clarifications, or requests regarding this Privacy Policy or how your information is handled, please visit our official Contact Us page.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-ssil-red hover:bg-red-700 text-white font-extrabold text-sm transition-all shadow-md hover:shadow-lg hover:shadow-red-600/30 group"
              >
                <Mail className="h-4 w-4" />
                <span>Go To Contact Us Page</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
