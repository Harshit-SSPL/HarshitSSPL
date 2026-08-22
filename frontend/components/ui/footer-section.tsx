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

export function Footerdemo() {
  return (
    <footer className="relative border-t border-slate-700/60 bg-[#1E293B] dark:bg-[#0F172A] text-slate-100 transition-colors duration-300">
      <div className="container mx-auto px-4 py-16 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Column 1: SSIL Authentic Logo & Catalog Request */}
          <div className="relative">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm p-1 border border-slate-200 shrink-0 overflow-hidden">
                <Image
                  src="/branding/companylogo-ui.png"
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
            <p className="mb-6 text-sm text-slate-300 leading-relaxed">
              Request SSIL&apos;s master technical product catalog and project tender specifications.
            </p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="Enter work email..."
                className="pr-12 bg-slate-800/80 border-slate-700 text-white placeholder:text-slate-400 focus:border-ssil-blue"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-ssil-red text-white transition-transform hover:scale-105 hover:bg-ssil-red-600"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Request Catalog</span>
              </Button>
            </form>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="mb-4 text-base font-bold tracking-wide uppercase text-white">
              Quick Navigation
            </h3>
            <nav className="space-y-2.5 text-sm font-medium text-slate-300">
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
                Executed Projects
              </Link>
              <Link href="/contact" className="block transition-colors hover:text-ssil-red">
                Contact &amp; Inquiry
              </Link>
            </nav>
          </div>

          {/* Column 3: Corporate Office & Contact Details */}
          <div>
            <h3 className="mb-4 text-base font-bold tracking-wide uppercase text-white">
              Corporate Office
            </h3>
            <address className="space-y-3.5 text-sm text-slate-300 not-italic">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-ssil-red shrink-0 mt-1" />
                <p className="leading-snug">Office No-812A, Puri High Street, Sector 81-121002, Faridabad, Haryana, India</p>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-ssil-blue shrink-0" />
                <p className="flex flex-wrap items-center gap-1 font-medium">
                  <a href="tel:+919999590064" className="hover:text-ssil-red transition-colors">+91 9999590064</a>,
                  <a href="tel:+919999990064" className="hover:text-ssil-red transition-colors">+91 9999990064</a>
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-ssil-red shrink-0" />
                <a href="mailto:ssindia2006@gmail.com" className="hover:text-ssil-red transition-colors">
                  ssindia2006@gmail.com
                </a>
              </div>
            </address>
          </div>

          {/* Column 4: Social & Compliance */}
          <div className="relative">
            <h3 className="mb-4 text-base font-bold tracking-wide uppercase text-white">
              Corporate Connect
            </h3>
            <p className="mb-4 text-xs text-slate-400">
              Connect with Shiv Shakti India Limited on official corporate channels.
            </p>
            <div className="mb-6 flex space-x-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full border-slate-700 bg-slate-800 text-slate-300 hover:text-ssil-blue hover:border-ssil-blue">
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
                    <Button variant="outline" size="icon" className="rounded-full border-slate-700 bg-slate-800 text-slate-300 hover:text-ssil-blue hover:border-ssil-blue">
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
                      <Button variant="outline" size="icon" className="rounded-full border-slate-700 bg-slate-800 text-slate-300 hover:text-ssil-blue hover:border-ssil-blue">
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
            
            <div className="rounded-lg bg-slate-800/80 p-3 border border-slate-700/80 shadow-sm">
              <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider block">
                Quality Certified
              </span>
              <span className="text-xs text-slate-300">
                IP66 Outdoor Infrastructure &amp; ISO Compliance Standard
              </span>
            </div>
          </div>

        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-700/60 pt-8 text-center md:flex-row">
          <p className="text-xs font-medium text-slate-400">
            © {new Date().getFullYear()} Shiv Shakti India Limited / Shiv Shakti Private Limited. All rights reserved.
          </p>
          <nav className="flex gap-6 text-xs font-semibold text-slate-300">
            <Link href="/privacy-policy" className="transition-colors hover:text-ssil-red">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-ssil-red">
              Terms of Service
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
