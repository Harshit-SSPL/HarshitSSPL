"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown, Sun, Zap, Sparkles } from "lucide-react";
import AnimatedThemeToggler from "@/components/ui/animated-theme-toggler";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface MenuItem {
  title: string;
  url: string;
}

interface Navbar1Props {
  menu?: MenuItem[];
  auth?: {
    login: {
      text: string;
      url: string;
    };
    signup: {
      text: string;
      url: string;
    };
  };
}

const defaultSsilMenu: MenuItem[] = [
  { title: "Home", url: "/" },
  { title: "About Us", url: "/about" },
  { title: "Products", url: "/products" },
  { title: "Gallery", url: "/projects" },
  { title: "Contact Us", url: "/contact" },
];

const Navbar1 = ({
  menu = defaultSsilMenu,
  auth = {
    login: { text: "LOGIN", url: "/login" },
    signup: { text: "Catalog", url: "/products" },
  },
}: Navbar1Props) => {
  const [scrolled, setScrolled] = useState(false);
  const [solarDropdownOpen, setSolarDropdownOpen] = useState(false);
  const solarDropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        solarDropdownRef.current &&
        !solarDropdownRef.current.contains(event.target as Node)
      ) {
        setSolarDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setSolarDropdownOpen(false);
  }, [pathname]);

  const isAdminLogin = pathname?.includes("ssil-internal-portal-management-secure-admin-console-2026-auth/login");
  const isAdminConsole = pathname?.includes("ssil-internal-portal-management-secure-admin-console-2026-auth") && !isAdminLogin;

  if (isAdminConsole) {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/20 dark:bg-slate-950/25 backdrop-blur-2xl border-b border-white/10 dark:border-white/10 shadow-md py-2.5"
          : "bg-slate-950/10 dark:bg-slate-950/15 backdrop-blur-xl border-b border-white/10 dark:border-white/10 shadow-none py-3.5"
      }`}
    >
      {/* Full-width Container with Extreme Left & Extreme Right Alignment */}
      <div className="w-full px-3 sm:px-6 md:px-8 lg:px-10">
        {/* Desktop Navigation */}
        <nav className="hidden items-center justify-between lg:flex">
          {/* Extreme Left SSIL Logo */}
          <div className="flex items-center gap-8 lg:gap-10">
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-sm p-1 border border-white/80 shrink-0 overflow-hidden transition-transform group-hover:scale-105">
                <Image
                  src="https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510353/ssil_branding/companylogo-ui.png"
                  alt="Shiv Shakti India Limited Logo"
                  width={160}
                  height={45}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-white leading-none">
                  SSIL<span className="text-ssil-red">.</span>
                </span>
                <span className="text-[9px] font-bold tracking-widest text-slate-300 uppercase mt-0.5">
                  Shiv Shakti India Limited
                </span>
              </div>
            </Link>

            {/* Menu Links: Hidden on admin login page */}
            {!isAdminLogin && (
              <div className="flex items-center gap-2">
                {menu.map((item) => {
                  const isActive =
                    pathname === item.url ||
                    (item.url !== "/" && pathname?.startsWith(item.url));

                  return (
                    <Link
                      key={item.title}
                      className={`inline-flex h-9 items-center justify-center bg-transparent px-3 py-2 text-sm font-semibold transition-colors duration-200 ${
                        isActive
                          ? "text-ssil-red font-extrabold"
                          : "text-white hover:text-ssil-red font-medium"
                      }`}
                      href={item.url}
                    >
                      {item.title}
                    </Link>
                  );
                })}

                {/* Shiny Glossy Green "Go Green" Nav Item (No box/border) */}
                <div className="relative" ref={solarDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setSolarDropdownOpen((prev) => !prev)}
                    className="group inline-flex h-9 items-center justify-center bg-transparent px-3 py-2 text-sm font-black transition-all duration-200 gap-1.5 cursor-pointer border-0 shadow-none outline-none focus:outline-none"
                  >
                    <span className="bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(52,211,153,0.7)] group-hover:drop-shadow-[0_0_12px_rgba(52,211,153,0.9)] tracking-wide font-extrabold group-hover:scale-105 transition-all">
                      Go Green
                    </span>
                    <ChevronDown className={`h-3.5 w-3.5 text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.6)] transition-transform duration-200 ${solarDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* Dropdown Menu (White in Light theme, Black in Dark theme, Green on Hover) */}
                  {solarDropdownOpen && (
                    <div className="absolute left-0 mt-2.5 w-64 rounded-2xl bg-white dark:bg-zinc-950 border border-emerald-500/20 dark:border-emerald-500/30 shadow-xl shadow-slate-900/10 dark:shadow-black/70 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <Link
                        href="/products/solar-lights"
                        onClick={() => setSolarDropdownOpen(false)}
                        className="flex items-center gap-3 p-2.5 rounded-xl text-left hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:border-emerald-200/80 dark:hover:border-emerald-800/40 border border-transparent transition-all group/item"
                      >
                        <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-zinc-700 flex items-center justify-center shrink-0 group-hover/item:scale-105 group-hover/item:bg-emerald-500/20 group-hover/item:text-emerald-500 group-hover/item:border-emerald-500/40 transition-all shadow-xs">
                          <Sun className="h-4 w-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900 dark:text-white group-hover/item:text-emerald-600 dark:group-hover/item:text-emerald-400 block transition-colors">
                            Solar Lights
                          </span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">
                            Autonomous solar street luminaires
                          </span>
                        </div>
                      </Link>

                      <div className="h-[1px] bg-slate-100 dark:bg-zinc-800/80 my-1 mx-2" />

                      <Link
                        href="/products/solar-power-plants"
                        onClick={() => setSolarDropdownOpen(false)}
                        className="flex items-center gap-3 p-2.5 rounded-xl text-left hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:border-emerald-200/80 dark:hover:border-emerald-800/40 border border-transparent transition-all group/item"
                      >
                        <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-zinc-700 flex items-center justify-center shrink-0 group-hover/item:scale-105 group-hover/item:bg-emerald-500/20 group-hover/item:text-emerald-500 group-hover/item:border-emerald-500/40 transition-all shadow-xs">
                          <Zap className="h-4 w-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900 dark:text-white group-hover/item:text-emerald-600 dark:group-hover/item:text-emerald-400 block transition-colors">
                            Solar Power Plants
                          </span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">
                            Commercial turnkey solar arrays
                          </span>
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons & Theme Toggler on Extreme Right Edge */}
          <div className="flex items-center gap-4">
            {!isAdminLogin && (
              <Button
                asChild
                size="sm"
                className="bg-ssil-red hover:bg-red-700 text-white font-extrabold rounded-full px-5 shadow-sm border-0"
              >
                <Link href="/contact">Request Quote</Link>
              </Button>
            )}

            {/* Borderless Theme Toggle Wrapper */}
            <div className="p-0 border-0 bg-transparent flex items-center">
              <AnimatedThemeToggler />
            </div>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-sm p-1 border border-white/80 shrink-0 overflow-hidden">
                <Image
                  src="https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510353/ssil_branding/companylogo-ui.png"
                  alt="Shiv Shakti India Limited Logo"
                  width={150}
                  height={40}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
              <span className="text-base font-black tracking-tight text-white">
                SSIL<span className="text-ssil-red">.</span>
              </span>
            </Link>

            <div className="flex items-center gap-3">
              <div className="p-0 border-0 bg-transparent flex items-center">
                <AnimatedThemeToggler />
              </div>

              {!isAdminLogin && (
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-white hover:text-ssil-red bg-transparent border-0">
                      <Menu className="size-5 text-white" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="overflow-y-auto bg-slate-950/95 text-white backdrop-blur-xl border-slate-800">
                    <SheetHeader>
                      <SheetTitle>
                        <Link href="/" className="flex items-center gap-2.5">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm p-1 border border-slate-200">
                            <Image
                              src="https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510353/ssil_branding/companylogo-ui.png"
                              alt="Shiv Shakti India Limited Logo"
                              width={140}
                              height={35}
                              className="h-full w-full object-contain"
                            />
                          </div>
                          <span className="text-lg font-black text-white leading-none">
                            SSIL<span className="text-ssil-red">.</span>
                          </span>
                        </Link>
                      </SheetTitle>
                    </SheetHeader>
                    <div className="my-6 flex flex-col gap-4">
                      {menu.map((item) => {
                        const isActive =
                          pathname === item.url ||
                          (item.url !== "/" && pathname?.startsWith(item.url));
                        return (
                          <Link
                            key={item.title}
                            href={item.url}
                            className={`font-bold py-2 block transition-colors ${
                              isActive ? "text-ssil-red" : "text-white hover:text-ssil-red"
                            }`}
                          >
                            {item.title}
                          </Link>
                        );
                      })}

                      {/* Mobile Go Green Section */}
                      <div className="pt-3 pb-2 border-t border-slate-800">
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 block mb-2">
                          Go Green Solutions
                        </span>
                        <div className="flex flex-col gap-2">
                          <Link
                            href="/products/solar-lights"
                            className="flex items-center gap-2.5 p-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs font-bold text-emerald-300"
                          >
                            <Sun className="h-4 w-4 text-amber-300" />
                            <span>Solar Lights</span>
                          </Link>
                          <Link
                            href="/products/solar-power-plants"
                            className="flex items-center gap-2.5 p-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs font-bold text-emerald-300"
                          >
                            <Zap className="h-4 w-4 text-emerald-400" />
                            <span>Solar Power Plants</span>
                          </Link>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 pt-4 border-t border-slate-800">
                        <Button asChild className="bg-ssil-red hover:bg-red-700 text-white rounded-full">
                          <Link href="/contact">Request Quote</Link>
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export { Navbar1 };
