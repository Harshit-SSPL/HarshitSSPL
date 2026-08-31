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
    <footer className="relative border-t border-zinc-900 bg-black text-slate-100 transition-colors duration-300">
      <div className="container mx-auto px-4 py-10 sm:py-12 md:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Column 1: SSIL Authentic Logo & Catalog Request */}
          <div className="relative">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm p-1 border border-zinc-700 shrink-0 overflow-hidden">
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
            <p className="mb-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Request SSIL&apos;s master technical product catalog and project tender specifications.
            </p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="Enter work email..."
                className="pr-12 bg-zinc-900/90 border-zinc-800 text-white placeholder:text-slate-500 focus:border-ssil-red text-xs sm:text-sm"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 h-7 w-7 rounded-full bg-ssil-red text-white transition-transform hover:scale-105 hover:bg-ssil-red-600"
              >
                <Send className="h-3.5 w-3.5" />
                <span className="sr-only">Request Catalog</span>
              </Button>
            </form>
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
                href="https://www.google.com/maps/search/?api=1&query=812A%2C+814%2C+Puri+High+Street%2C+Sector+81-121002%2C+Faridabad%2C+Haryana%2C+India"
                target="_blank"
                rel="noopener noreferrer"
                className="group/addr flex items-start gap-2 text-slate-300 hover:text-ssil-red transition-colors cursor-pointer"
                title="View Corporate Office on Google Maps"
              >
                <MapPin className="h-4 w-4 text-ssil-red shrink-0 mt-0.5 group-hover/addr:scale-110 transition-transform" />
                <p className="leading-snug">Office No- 812A, 814, Puri High Street, Sector 81-121002, Faridabad, Haryana, India</p>
              </a>

              <div className="pt-1">
                <span className="mb-1 text-[11px] sm:text-xs font-bold tracking-wider uppercase text-slate-400 block">
                  Factory Address
                </span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Plot+No.+5%2C+Sector+65%2C+Village+Sahupura%2C+Ballabgarh%2C+121004%2C+Faridabad%2C+Haryana%2C+India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/addr flex items-start gap-2 text-slate-300 hover:text-ssil-red transition-colors cursor-pointer"
                  title="View Factory Location on Google Maps"
                >
                  <MapPin className="h-4 w-4 text-ssil-red shrink-0 mt-0.5 group-hover/addr:scale-110 transition-transform" />
                  <p className="leading-snug">Plot No. 5, Sector 65, Village Sahupura, Ballabgarh, 121004, Faridabad, Haryana, India</p>
                </a>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Phone className="h-4 w-4 text-ssil-red shrink-0" />
                <p className="flex flex-wrap items-center gap-1 font-medium">
                  <a href="tel:+919999590064" className="hover:text-ssil-red transition-colors">+91 9999590064</a>,
                  <a href="tel:+919999990064" className="hover:text-ssil-red transition-colors">+91 9999990064</a>
                </p>
              </div>

              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=ssindia2006@gmail.com&su=Inquiry%20regarding%20SSIL%20Lighting%20%26%20Infrastructure%20Solutions&body=Hello%20Shiv%20Shakti%20India%20Limited%20Team%2C%0A%0AI%20would%20like%20to%20inquire%20about%20your%20lighting%20products%20and%20infrastructure%20solutions.%0A%0ACompany%20%2F%20Client%20Name%3A%20%0AContact%20Number%3A%20%0AProject%20Location%3A%20%0ARequirement%20Details%3A%20%0A%0AThank%20you."
                target="_blank"
                rel="noopener noreferrer"
                className="group/mail flex items-center gap-2 text-slate-300 hover:text-ssil-red transition-colors cursor-pointer"
                title="Compose Email to Shiv Shakti India Limited"
              >
                <Mail className="h-4 w-4 text-ssil-red shrink-0 group-hover/mail:scale-110 transition-transform" />
                <span className="leading-snug">ssindia2006@gmail.com</span>
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
