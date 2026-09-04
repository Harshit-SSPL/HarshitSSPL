"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Facebook, Linkedin, Send, Twitter, Phone, Mail, MapPin } from "lucide-react";

import { usePathname } from "next/navigation";
import { ADMIN_BASE_PATH } from "@/lib/admin-api";

export function Footerdemo() {
  const pathname = usePathname();

  // Hide footer completely on admin portal & admin login
  if (pathname?.includes("ssil-internal-portal-management-secure-admin-console-2026-auth")) {
    return null;
  }

  const [footerData, setFooterData] = React.useState({
    corporateOfficeAddress: "Office No- 812A, 814, Puri High Street, Sector 81-121002, Faridabad, Haryana, India",
    factoryAddress: "Plot No. 5, Sector 65, Village Sahupura, Ballabgarh, 121004, Faridabad, Haryana, India",
    phone1: "+91 9999590064",
    phone2: "+91 9999990064",
    email: "ssindia2006@gmail.com",
    gmapsCorporateQuery: "812A%2C+814%2C+Puri+High+Street%2C+Sector+81-121002%2C+Faridabad%2C+Haryana%2C+India",
    gmapsFactoryQuery: "Plot+No.+5%2C+Sector+65%2C+Village+Sahupura%2C+Ballabgarh%2C+121004%2C+Faridabad%2C+Haryana%2C+India",
  });

  React.useEffect(() => {
    const fetchFooter = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const res = await fetch(`${apiUrl}/footer`);
        const data = await res.json();
        if (data.success && data.footer) {
          setFooterData({
            corporateOfficeAddress: data.footer.corporateOfficeAddress || footerData.corporateOfficeAddress,
            factoryAddress: data.footer.factoryAddress || footerData.factoryAddress,
            phone1: data.footer.phone1 || footerData.phone1,
            phone2: data.footer.phone2 || footerData.phone2,
            email: data.footer.email || footerData.email,
            gmapsCorporateQuery: data.footer.gmapsCorporateQuery || footerData.gmapsCorporateQuery,
            gmapsFactoryQuery: data.footer.gmapsFactoryQuery || footerData.gmapsFactoryQuery,
          });
        }
      } catch (e) {
        // use fallback
      }
    };
    fetchFooter();
  }, []);

  const footerPillars = [
    {
      title: "Good For Planet",
      subtitle: "Promoting sustainability through responsible innovation",
      icon: (
        <svg className="w-12 h-12 sm:w-13 sm:h-13 text-white" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <g transform="translate(2, 0)">
            {/* Earth Circle Outline */}
            <circle cx="14" cy="16" r="11" />
            {/* Continent Lines */}
            <path d="M11 6.5c-1.2 2.5-1.2 5 1.2 6.2s3.8 3.8 2.5 6.2-3.8 2.5-5 3.8" />
            <path d="M18 7c.6 1.8 2.5 2.5 2.5 4.4" />
            <path d="M5.5 13.5c1.8 0 2.5-1.2 4.4-1.2" />
            <path d="M12 24.5c1.8-.6 3.1.6 3.8 0" />
            {/* Overlapping Heart on Right */}
            <path
              d="M23 11c-1.5-2-4-1.5-5 0-1-1.5-3.5-2-5 0-2 2.2 0 5.2 5 8.8 5-3.6 7-6.6 5-8.8z"
              transform="translate(1.5, 3.5) scale(0.85)"
              fill="#000"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            {/* Heart Highlight Reflection */}
            <path d="M22 13.5c.8-.5 1.5-.4 1.9.3" stroke="currentColor" strokeWidth="1.4" />
          </g>
        </svg>
      ),
    },
    {
      title: "International Design Standards",
      subtitle: "Precision engineered to global infrastructure benchmarks",
      icon: (
        <svg className="w-12 h-12 sm:w-13 sm:h-13 text-white" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="16" cy="16" r="12" />
          <path d="M4.5 12h23M4.5 20h23" />
          <path d="M15.5 4.2a22 22 0 0 0 0 23.6M16.5 4.2a22 22 0 0 1 0 23.6" />
          <circle cx="16" cy="16" r="4.5" fill="rgba(255,255,255,0.2)" stroke="currentColor" />
        </svg>
      ),
    },
    {
      title: "ISO 9001:2015 Certified",
      subtitle: "ISO 9001:2015 • ISO 14001:2015 • ISO 45001:2018",
      icon: (
        <svg className="w-12 h-12 sm:w-13 sm:h-13 text-white" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="16" cy="16" r="12.5" strokeDasharray="3.5 2.5" />
          <polygon points="16 4 19.5 11.5 27.5 12.5 21.5 18 23 26 16 22 9 26 10.5 18 4.5 12.5 12.5 11.5 16 4" fill="rgba(255,255,255,0.12)" />
          <text x="16" y="17.5" textAnchor="middle" fontSize="6.5" fontWeight="900" fill="currentColor" stroke="none">ISO</text>
        </svg>
      ),
    },
    {
      title: "Solar Energy",
      subtitle: "Clean renewable solar power & high-efficiency LED systems",
      icon: (
        <svg className="w-12 h-12 sm:w-13 sm:h-13 text-white" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="16" cy="16" r="6" fill="rgba(255,255,255,0.18)" />
          <line x1="16" y1="3" x2="16" y2="6.5" strokeWidth="1.8" />
          <line x1="16" y1="25.5" x2="16" y2="29" strokeWidth="1.8" />
          <line x1="3" y1="16" x2="6.5" y2="16" strokeWidth="1.8" />
          <line x1="25.5" y1="16" x2="29" y2="16" strokeWidth="1.8" />
          <line x1="6.8" y1="6.8" x2="9.3" y2="9.3" strokeWidth="1.8" />
          <line x1="22.7" y1="22.7" x2="25.2" y2="25.2" strokeWidth="1.8" />
          <line x1="6.8" y1="25.2" x2="9.3" y2="22.7" strokeWidth="1.8" />
          <line x1="22.7" y1="9.3" x2="25.2" y2="6.8" strokeWidth="1.8" />
        </svg>
      ),
    },
    {
      title: "Built to Last",
      subtitle: "In-house hot-dip galvanizing & high-tensile steel",
      icon: (
        <svg className="w-12 h-12 sm:w-13 sm:h-13 text-white" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 29s10.5-5.2 10.5-13V6.5L16 2.5 5.5 6.5V16c0 7.8 10.5 13 10.5 13z" fill="rgba(255,255,255,0.12)" />
          <path d="m11.5 16 3.2 3.2 6-6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative border-t border-zinc-900 bg-black text-slate-100 transition-colors duration-300">
      
      {/* Top 5 Value Propositions / Trust Badges (Wipro Style) */}
      <div className="border-b border-zinc-900/90 bg-gradient-to-b from-zinc-950 to-black py-10 sm:py-14">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 items-start text-center">
            {footerPillars.map((pillar, idx) => (
              <div
                key={idx}
                className={`group flex flex-col items-center justify-start ${
                  idx === 4 ? "col-span-2 md:col-span-1" : ""
                }`}
              >
                {/* Circular Icon Container */}
                <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full border border-white/25 bg-white/[0.04] backdrop-blur-xs flex items-center justify-center mb-3.5 transition-all duration-300 group-hover:scale-105 group-hover:border-ssil-red/80 group-hover:bg-ssil-red/10 group-hover:shadow-xl group-hover:shadow-ssil-red/20 shadow-xs">
                  {pillar.icon}
                </div>

                {/* Title */}
                <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight leading-snug group-hover:text-ssil-red transition-colors">
                  {pillar.title}
                </h4>

                {/* Subtitle */}
                <p className="text-[10px] sm:text-[11px] text-slate-400 mt-1 max-w-[170px] leading-relaxed font-normal">
                  {pillar.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 sm:py-12 md:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Column 1: SSIL Authentic Logo & Catalog Request */}
          <div className="relative">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm p-1 border border-zinc-700 shrink-0 overflow-hidden">
                <Image
                  src="https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510353/ssil_branding/companylogo-ui.png"
                  alt="Shiv Shakti India Limited Logo"
                  width={160}
                  height={45}
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="text-lg font-black tracking-tight text-white leading-none">
                SSIL<span className="text-ssil-red">.</span>
              </span>
            </div>
            <p className="mb-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Request SSIL&apos;s master technical product catalog and project tender specifications.
            </p>
            <Button
              asChild
              className="w-full h-11 rounded-xl bg-ssil-red hover:bg-ssil-red-600 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-ssil-red/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Link href="/contact">
                <span>Enquire Now</span>
                <Send className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="mb-3 text-xs sm:text-sm font-extrabold tracking-wider uppercase text-white">
              Quick Navigation
            </h3>
            <nav className="space-y-2 text-xs sm:text-sm font-medium text-slate-300">
              <Link href="/" className="block transition-colors hover:text-ssil-red">
                Home
              </Link>
              <Link href="/about" className="block transition-colors hover:text-ssil-red">
                About SSIL
              </Link>
              <Link href="/products" className="block transition-colors hover:text-ssil-red">
                View Products
              </Link>
              <Link href="/projects" className="block transition-colors hover:text-ssil-red">
                Gallery
              </Link>
              <Link href="/contact" className="block transition-colors hover:text-ssil-red">
                Contact &amp; Inquiry
              </Link>
            </nav>
          </div>

          {/* Column 3: Corporate Office & Contact Details */}
          <div>
            <h3 className="mb-3 text-xs sm:text-sm font-extrabold tracking-wider uppercase text-white">
              Corporate Office
            </h3>
            <address className="space-y-3 text-xs sm:text-sm text-slate-300 not-italic">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(footerData.corporateOfficeAddress)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group/addr flex items-start gap-2 text-slate-300 hover:text-ssil-red transition-colors cursor-pointer"
                title="View Corporate Office on Google Maps"
              >
                <MapPin className="h-4 w-4 text-ssil-red shrink-0 mt-0.5 group-hover/addr:scale-110 transition-transform" />
                <p className="leading-snug">{footerData.corporateOfficeAddress}</p>
              </a>

              <div className="pt-1">
                <span className="mb-1 text-[11px] sm:text-xs font-bold tracking-wider uppercase text-slate-400 block">
                  Factory Address
                </span>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(footerData.factoryAddress)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/addr flex items-start gap-2 text-slate-300 hover:text-ssil-red transition-colors cursor-pointer"
                  title="View Factory Location on Google Maps"
                >
                  <MapPin className="h-4 w-4 text-ssil-red shrink-0 mt-0.5 group-hover/addr:scale-110 transition-transform" />
                  <p className="leading-snug">{footerData.factoryAddress}</p>
                </a>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Phone className="h-4 w-4 text-ssil-red shrink-0" />
                <p className="flex flex-wrap items-center gap-1 font-medium">
                  <a href={`tel:${footerData.phone1.replace(/\s+/g, '')}`} className="hover:text-ssil-red transition-colors">{footerData.phone1}</a>
                  {footerData.phone2 && (
                    <>
                      , <a href={`tel:${footerData.phone2.replace(/\s+/g, '')}`} className="hover:text-ssil-red transition-colors">{footerData.phone2}</a>
                    </>
                  )}
                </p>
              </div>

              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${footerData.email}&su=Inquiry%20regarding%20SSIL%20Lighting%20%26%20Infrastructure%20Solutions&body=Hello%20Shiv%20Shakti%20India%20Limited%20Team%2C%0A%0AI%20would%20like%20to%20inquire%20about%20your%20lighting%20products%20and%20infrastructure%20solutions.%0A%0ACompany%20%2F%20Client%20Name%3A%20%0AContact%20Number%3A%20%0AProject%20Location%3A%20%0ARequirement%20Details%3A%20%0A%0AThank%20you.`}
                target="_blank"
                rel="noopener noreferrer"
                className="group/mail flex items-center gap-2 text-slate-300 hover:text-ssil-red transition-colors cursor-pointer"
                title="Compose Email to Shiv Shakti India Limited"
              >
                <Mail className="h-4 w-4 text-ssil-red shrink-0 group-hover/mail:scale-110 transition-transform" />
                <span className="leading-snug">{footerData.email}</span>
              </a>
            </address>
          </div>

          {/* Column 4: Social & Corporate Connect */}
          <div className="relative">
            <h3 className="mb-3 text-xs sm:text-sm font-extrabold tracking-wider uppercase text-white">
              Corporate Connect
            </h3>
            <p className="mb-3 text-xs text-slate-400">
              Connect with Shiv Shakti India Limited on official corporate channels.
            </p>
            <div className="flex space-x-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="h-9 w-9 rounded-full border-zinc-800 bg-zinc-900 text-slate-300 hover:text-ssil-red hover:border-ssil-red">
                      <Facebook className="h-4 w-4" />
                      <span className="sr-only">Facebook</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow SSIL on Facebook</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="h-9 w-9 rounded-full border-zinc-800 bg-zinc-900 text-slate-300 hover:text-ssil-red hover:border-ssil-red">
                      <Twitter className="h-4 w-4" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow SSIL on Twitter</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href="https://www.linkedin.com/company/shiv-shakti-india/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="icon" className="h-9 w-9 rounded-full border-zinc-800 bg-zinc-900 text-slate-300 hover:text-ssil-red hover:border-ssil-red">
                        <Linkedin className="h-4 w-4" />
                        <span className="sr-only">LinkedIn</span>
                      </Button>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Connect with SSIL on LinkedIn</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

        </div>

        {/* Divider & Copyright Row */}
        <div className="mt-8 sm:mt-10 flex flex-col items-center justify-between gap-3 border-t border-zinc-800/80 pt-5 sm:pt-6 text-center md:flex-row">
          <p className="text-xs font-medium text-slate-400">
            © {new Date().getFullYear()} Shiv Shakti India Limited / Shiv Shakti Private Limited. All rights reserved.
          </p>
          <nav className="flex gap-6 text-xs font-semibold text-slate-300">
            <Link href="/privacy-policy" className="transition-colors hover:text-ssil-red">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="transition-colors hover:text-ssil-red">
              Terms of Service
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
