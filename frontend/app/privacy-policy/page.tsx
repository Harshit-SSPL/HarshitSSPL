"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ShieldCheck,
  Mail,
  ArrowRight,
  ListFilter,
  ArrowUp,
} from "lucide-react";

interface PolicySection {
  id: string;
  num: string;
  title: string;
  shortTitle: string;
  content: React.ReactNode;
}

const policySections: PolicySection[] = [
  {
    id: "sec-01",
    num: "01",
    title: "Overview",
    shortTitle: "Overview",
    content: (
      <p className="leading-relaxed">
        Shiv Shakti India Limited (&quot;SSIL&quot;, &quot;we&quot;, or &quot;us&quot;) respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy concisely outlines how we collect, handle, and safeguard your details when you use our corporate portal and inquiry services.
      </p>
    ),
  },
  {
    id: "sec-02",
    num: "02",
    title: "Information We Collect",
    shortTitle: "Information We Collect",
    content: (
      <div className="space-y-3">
        <p className="leading-relaxed">
          We collect only information voluntarily submitted through our contact and project inquiry forms:
        </p>
        <ul className="list-disc list-inside space-y-1 pl-1 text-slate-600 dark:text-slate-300">
          <li><strong>Contact Details:</strong> First Name, Last Name, Email Address, Phone Number.</li>
          <li><strong>Business &amp; Project Info:</strong> Company Name, project requirements, and technical inquiry notes.</li>
          <li><strong>Essential Technical Data:</strong> Standard server logs (e.g., IP address and browser type) for security auditing.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "sec-03",
    num: "03",
    title: "How We Use Information",
    shortTitle: "How We Use Information",
    content: (
      <div className="space-y-3">
        <p className="leading-relaxed">
          Your information is utilized solely for legitimate operational and customer support purposes:
        </p>
        <ul className="list-disc list-inside space-y-1 pl-1 text-slate-600 dark:text-slate-300">
          <li>Processing and responding to product catalog, pricing, and project inquiries.</li>
          <li>Communicating technical lighting specifications for client requirements.</li>
          <li>Maintaining portal security, preventing abuse, and improving system responsiveness.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "sec-04",
    num: "04",
    title: "Sharing & Security",
    shortTitle: "Sharing & Security",
    content: (
      <div className="space-y-3">
        <p className="leading-relaxed">
          <strong>Information Sharing:</strong> SSIL never sells, rents, or monetizes customer data. Information is disclosed only when required by applicable law or to fulfill verified operational services.
        </p>
        <p className="leading-relaxed">
          <strong>Data Protection &amp; Retention:</strong> We apply appropriate technical and administrative safeguards to protect your records. Information is retained only for as long as necessary to fulfill project inquiries and statutory legal requirements.
        </p>
      </div>
    ),
  },
  {
    id: "sec-05",
    num: "05",
    title: "Cookies & Third-Party Links",
    shortTitle: "Cookies & Links",
    content: (
      <div className="space-y-3">
        <p className="leading-relaxed">
          <strong>Cookies:</strong> We use basic functional storage (such as saving dark/light theme preferences). We do not employ invasive behavioral tracking or third-party marketing cookies.
        </p>
        <p className="leading-relaxed">
          <strong>External Links:</strong> Links to third-party platforms or partner sites operate under their own independent privacy terms.
        </p>
      </div>
    ),
  },
  {
    id: "sec-06",
    num: "06",
    title: "Your Rights & Choices",
    shortTitle: "Your Rights",
    content: (
      <p className="leading-relaxed">
        You may at any time request clarification, review, or removal of inquiry data voluntarily submitted to SSIL. Simply contact our support team to submit a data management request.
      </p>
    ),
  },
  {
    id: "sec-07",
    num: "07",
    title: "Updates & Contact Us",
    shortTitle: "Updates & Contact",
    content: (
      <div className="space-y-4">
        <p className="leading-relaxed">
          This Privacy Policy may be updated periodically to reflect operational improvements. Any revisions will be published here with an updated revision date.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-0.5">
              Have privacy questions?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Reach out directly to our technical and legal communications desk.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-ssil-red hover:bg-red-700 text-white font-extrabold text-xs transition-all shadow-sm hover:shadow-md shrink-0 group"
          >
            <Mail className="h-3.5 w-3.5" />
            <span>Contact Us</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    ),
  },
];

export default function PrivacyPolicyPage() {
  // Accordion state (Section 01 open by default)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "sec-01": true,
  });

  // Active section state for sticky sidebar indicator
  const [activeSection, setActiveSection] = useState<string>("sec-01");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  // Intersection Observer to update active section in sidebar on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0.1 }
    );

    policySections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const scrollToSection = (id: string) => {
    // Ensure the section is expanded when clicked from nav
    setOpenSections((prev) => ({
      ...prev,
      [id]: true,
    }));
    setActiveSection(id);
    setMobileMenuOpen(false);

    const el = document.getElementById(id);
    if (el) {
      const yOffset = -120;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 pt-28 sm:pt-32 md:pt-36 pb-16 md:pb-24">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        
        {/* Page Header */}
        <div className="border-b border-slate-200 dark:border-slate-800/80 pb-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-ssil-red">
              PRIVACY POLICY
            </span>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-200/70 dark:bg-slate-800/80 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
              <ShieldCheck className="h-3.5 w-3.5 text-ssil-red" />
              <span>Last Updated: August 2026</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-2">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            Your privacy matters to us. This Privacy Policy explains how Shiv Shakti India Limited handles information when you interact with our website and services.
          </p>
        </div>

        {/* Mobile Quick Navigation Toggle */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 shadow-xs"
          >
            <span className="flex items-center gap-2">
              <ListFilter className="h-4 w-4 text-ssil-red" />
              <span>ON THIS PAGE ({policySections.find(s => s.id === activeSection)?.shortTitle || "Overview"})</span>
            </span>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileMenuOpen ? "rotate-180" : ""}`} />
          </button>

          {mobileMenuOpen && (
            <div className="mt-2 p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-1">
              {policySections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors ${
                    activeSection === sec.id
                      ? "bg-red-50 dark:bg-slate-800 text-ssil-red font-bold"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <span className="text-[10px] font-mono opacity-70">{sec.num}</span>
                  <span>{sec.shortTitle}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main 2-Column Content Layout */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          
          {/* Left Column: Compact Sticky Sidebar ("ON THIS PAGE") */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-28 self-start space-y-4 pr-2">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 px-2">
                ON THIS PAGE
              </h3>

              <nav className="space-y-1">
                {policySections.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => scrollToSection(sec.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all flex items-center justify-between group ${
                        isActive
                          ? "bg-red-50 dark:bg-slate-800/90 text-ssil-red font-extrabold shadow-2xs border-l-2 border-ssil-red"
                          : "text-slate-600 dark:text-slate-400 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800/40 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <span className={`text-[11px] font-mono ${isActive ? "text-ssil-red" : "text-slate-400 dark:text-slate-500"}`}>
                          {sec.num}
                        </span>
                        <span className="truncate">{sec.shortTitle}</span>
                      </div>
                      <span className={`h-1.5 w-1.5 rounded-full transition-all ${isActive ? "bg-ssil-red scale-100" : "bg-transparent scale-0"}`} />
                    </button>
                  );
                })}
              </nav>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between px-2">
                <button
                  onClick={scrollToTop}
                  className="text-[11px] font-bold text-slate-400 hover:text-ssil-red flex items-center gap-1 transition-colors"
                >
                  <ArrowUp className="h-3 w-3" />
                  <span>Back to top</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Right Column: 7 Compact Expandable Accordion Sections */}
          <main className="lg:col-span-8 space-y-3">
            {policySections.map((sec) => {
              const isOpen = !!openSections[sec.id];
              return (
                <div
                  key={sec.id}
                  id={sec.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700/80 shadow-md"
                      : "bg-white/80 dark:bg-slate-900/60 border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleSection(sec.id)}
                    className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left focus:outline-none group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-red-50 dark:bg-slate-800 text-ssil-red shrink-0">
                        {sec.num}
                      </span>
                      <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white group-hover:text-ssil-red transition-colors">
                        {sec.title}
                      </h3>
                    </div>

                    <div className={`h-7 w-7 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:text-ssil-red transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 bg-red-50 dark:bg-slate-800 text-ssil-red" : ""
                    }`}>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </button>

                  {/* Accordion Collapsible Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm border-t border-slate-100 dark:border-slate-800/80 text-slate-700 dark:text-slate-300 leading-relaxed">
                          {sec.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </main>

        </div>

      </div>
    </div>
  );
}
