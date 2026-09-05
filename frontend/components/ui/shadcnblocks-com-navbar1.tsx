"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown, ChevronRight, Sun, Zap, Sparkles } from "lucide-react";
import AnimatedThemeToggler from "@/components/ui/animated-theme-toggler";
import { catalogProducts } from "@/data/products-catalog";

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
  const [solarLightingSubOpen, setSolarLightingSubOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const solarDropdownRef = useRef<HTMLDivElement>(null);
  const solarCloseTimeout = useRef<NodeJS.Timeout | null>(null);
  const solarSubCloseTimeout = useRef<NodeJS.Timeout | null>(null);
  const productsDropdownRef = useRef<HTMLDivElement>(null);
  const productsCloseTimeout = useRef<NodeJS.Timeout | null>(null);
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
        setSolarLightingSubOpen(false);
      }
      if (
        productsDropdownRef.current &&
        !productsDropdownRef.current.contains(event.target as Node)
      ) {
        setProductsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdowns and mobile drawer on route change
  useEffect(() => {
    setSolarDropdownOpen(false);
    setSolarLightingSubOpen(false);
    setProductsDropdownOpen(false);
    setMobileMenuOpen(false);
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
                  src="https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614296/ssil_branding_companylogo_ui.png"
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

                  if (item.title === "Products") {
                    return (
                      <div
                        key={item.title}
                        ref={productsDropdownRef}
                        className="relative"
                        onMouseEnter={() => {
                          if (productsCloseTimeout.current) {
                            clearTimeout(productsCloseTimeout.current);
                          }
                          setProductsDropdownOpen(true);
                        }}
                        onMouseLeave={() => {
                          productsCloseTimeout.current = setTimeout(() => {
                            setProductsDropdownOpen(false);
                          }, 120);
                        }}
                      >
                        <Link
                          className={`inline-flex h-9 items-center justify-center bg-transparent px-3 py-2 text-sm font-semibold transition-colors duration-200 cursor-pointer ${
                            isActive
                              ? "text-ssil-red font-extrabold"
                              : "text-white hover:text-ssil-red font-medium"
                          }`}
                          href={item.url}
                        >
                          {item.title}
                        </Link>

                        {/* Products Curved Dropdown with Partition Lines & Red Accents */}
                        {productsDropdownOpen && (
                          <div
                            className="absolute left-0 top-full pt-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                            onMouseEnter={() => {
                              if (productsCloseTimeout.current) {
                                clearTimeout(productsCloseTimeout.current);
                              }
                              setProductsDropdownOpen(true);
                            }}
                            onMouseLeave={() => {
                              productsCloseTimeout.current = setTimeout(() => {
                                setProductsDropdownOpen(false);
                              }, 120);
                            }}
                          >
                            <div className="w-[720px] rounded-2xl bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl border border-slate-200/90 dark:border-zinc-800 shadow-2xl p-4 overflow-hidden">
                              {/* Top Header Strip with Red Accent */}
                              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-200/80 dark:border-zinc-800/80 px-1">
                                <div className="flex items-center gap-2">
                                  <span className="h-2 w-2 rounded-full bg-ssil-red animate-pulse" />
                                  <span className="text-[11px] font-black uppercase tracking-wider text-ssil-red">
                                    Product Categories &amp; Infrastructure
                                  </span>
                                </div>
                                <Link
                                  href="/products"
                                  onClick={() => setProductsDropdownOpen(false)}
                                  className="text-[11px] font-bold text-slate-500 hover:text-ssil-red dark:text-slate-400 dark:hover:text-ssil-red transition-colors flex items-center gap-1"
                                >
                                  <span>View All (18)</span>
                                  <ChevronRight className="h-3 w-3 text-ssil-red" />
                                </Link>
                              </div>

                              {/* 3 Columns with Vertical Partition Lines */}
                              <div className="grid grid-cols-3 divide-x divide-slate-200/80 dark:divide-zinc-800/80">
                                {[0, 1, 2].map((colIdx) => {
                                  const colProducts = catalogProducts.slice(colIdx * 7, (colIdx + 1) * 7);
                                  return (
                                    <div
                                      key={colIdx}
                                      className={`flex flex-col gap-1 ${
                                        colIdx === 0 ? "pr-3" : colIdx === 1 ? "px-3" : "pl-3"
                                      }`}
                                    >
                                      {colProducts.map((prod) => (
                                        <Link
                                          key={prod.id || prod.slug}
                                          href={`/products/${prod.slug}`}
                                          onClick={() => setProductsDropdownOpen(false)}
                                          className="group flex items-center justify-between px-2.5 py-1.5 rounded-xl text-left text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-ssil-red dark:hover:text-ssil-red hover:bg-ssil-red/10 dark:hover:bg-ssil-red/15 transition-all duration-150"
                                        >
                                          <span className="truncate">{prod.name}</span>
                                          <ChevronRight className="h-3 w-3 text-ssil-red opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all shrink-0 ml-1" />
                                        </Link>
                                      ))}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }

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

                {/* Shiny Glossy Green "Go Green" Nav Item (Hover-triggered with flyout) */}
                <div
                  className="relative"
                  ref={solarDropdownRef}
                  onMouseEnter={() => {
                    if (solarCloseTimeout.current) clearTimeout(solarCloseTimeout.current);
                    setSolarDropdownOpen(true);
                  }}
                  onMouseLeave={() => {
                    solarCloseTimeout.current = setTimeout(() => {
                      setSolarDropdownOpen(false);
                      setSolarLightingSubOpen(false);
                    }, 140);
                  }}
                >
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
                    <div
                      className="absolute left-0 top-full pt-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                      onMouseEnter={() => {
                        if (solarCloseTimeout.current) clearTimeout(solarCloseTimeout.current);
                        setSolarDropdownOpen(true);
                      }}
                      onMouseLeave={() => {
                        solarCloseTimeout.current = setTimeout(() => {
                          setSolarDropdownOpen(false);
                          setSolarLightingSubOpen(false);
                        }, 140);
                      }}
                    >
                      <div className="w-64 rounded-2xl bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl border border-emerald-500/20 dark:border-emerald-500/30 shadow-xl shadow-slate-900/10 dark:shadow-black/70 p-2 relative">
                        {/* Option 1: Solar Lighting with side flyout */}
                        <div
                          className="relative"
                          onMouseEnter={() => {
                            if (solarSubCloseTimeout.current) clearTimeout(solarSubCloseTimeout.current);
                            setSolarLightingSubOpen(true);
                          }}
                          onMouseLeave={() => {
                            solarSubCloseTimeout.current = setTimeout(() => {
                              setSolarLightingSubOpen(false);
                            }, 120);
                          }}
                        >
                          <div
                            className="flex items-center justify-between p-2.5 rounded-xl cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:border-emerald-200/80 dark:hover:border-emerald-800/40 border border-transparent transition-all group/item"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-zinc-700 flex items-center justify-center shrink-0 group-hover/item:scale-105 group-hover/item:bg-emerald-500/20 group-hover/item:text-emerald-500 group-hover/item:border-emerald-500/40 transition-all shadow-xs">
                                <Sun className="h-4 w-4" />
                              </div>
                              <div>
                                <span className="text-xs font-bold text-slate-900 dark:text-white group-hover/item:text-emerald-600 dark:group-hover/item:text-emerald-400 block transition-colors">
                                  Solar Lighting
                                </span>
                                <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">
                                  4 specialized fixtures
                                </span>
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-emerald-500 transition-transform group-hover/item:translate-x-0.5" />
                          </div>

                          {/* Flyout Sub-Dropdown to the right */}
                          {solarLightingSubOpen && (
                            <div
                              className="absolute left-full top-0 ml-2 w-64 rounded-2xl bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl border border-emerald-500/30 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-120"
                              onMouseEnter={() => {
                                if (solarSubCloseTimeout.current) clearTimeout(solarSubCloseTimeout.current);
                                setSolarLightingSubOpen(true);
                              }}
                              onMouseLeave={() => {
                                solarSubCloseTimeout.current = setTimeout(() => {
                                  setSolarLightingSubOpen(false);
                                }, 120);
                              }}
                            >
                              <div className="px-3 py-1.5 border-b border-emerald-500/15 mb-1.5">
                                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-500">
                                  Solar Lighting Range
                                </span>
                              </div>

                              <div className="flex flex-col gap-1">
                                {[
                                  { name: "Solar Street Lights", slug: "solar-street-lights" },
                                  { name: "Solar Bollards", slug: "solar-bollards" },
                                  { name: "Solar Flood Lights", slug: "solar-flood-lights" },
                                  { name: "Solar Pilar Lights", slug: "solar-pillar-lights" },
                                ].map((subItem) => (
                                  <Link
                                    key={subItem.slug}
                                    href={`/products/${subItem.slug}`}
                                    onClick={() => {
                                      setSolarDropdownOpen(false);
                                      setSolarLightingSubOpen(false);
                                    }}
                                    className="px-3 py-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors flex items-center justify-between group/sub"
                                  >
                                    <span>{subItem.name}</span>
                                    <ChevronRight className="h-3 w-3 text-emerald-500 opacity-0 group-hover/sub:opacity-100 -translate-x-1 group-hover/sub:translate-x-0 transition-all" />
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="h-[1px] bg-slate-100 dark:bg-zinc-800/80 my-1 mx-2" />

                        {/* Option 2: Solar Power Plants */}
                        <Link
                          href="/products/solar-power-plants"
                          onClick={() => {
                            setSolarDropdownOpen(false);
                            setSolarLightingSubOpen(false);
                          }}
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
                  src="https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614296/ssil_branding_companylogo_ui.png"
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
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-white hover:text-ssil-red bg-transparent border-0 h-9 w-9 p-0">
                      <Menu className="size-5 text-white" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="overflow-y-auto bg-slate-950/95 text-white backdrop-blur-xl border-slate-800 w-[85vw] max-w-sm p-5">
                    <SheetHeader>
                      <SheetTitle>
                        <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2.5">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm p-1 border border-slate-200">
                            <Image
                              src="https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614296/ssil_branding_companylogo_ui.png"
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
                    <div className="my-5 flex flex-col gap-3">
                      {menu.map((item) => {
                        const isActive =
                          pathname === item.url ||
                          (item.url !== "/" && pathname?.startsWith(item.url));
                        return (
                          <Link
                            key={item.title}
                            href={item.url}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`font-bold py-2.5 px-3 rounded-xl block transition-colors ${
                              isActive ? "bg-ssil-red/20 text-ssil-red" : "text-slate-100 hover:bg-white/10 hover:text-white"
                            }`}
                          >
                            {item.title}
                          </Link>
                        );
                      })}

                      {/* Mobile Go Green Section */}
                      <div className="pt-3 pb-2 border-t border-slate-800/80 space-y-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 block mb-1">
                          Solar Lighting &amp; Clean Energy
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          <Link
                            href="/products/solar-street-lights"
                            onClick={() => setMobileMenuOpen(false)}
                            className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs font-bold text-emerald-300 flex items-center gap-1.5 active:scale-95 transition-transform"
                          >
                            <Sun className="h-3.5 w-3.5 text-amber-300 shrink-0" />
                            <span className="truncate">Solar Street</span>
                          </Link>
                          <Link
                            href="/products/solar-bollards"
                            onClick={() => setMobileMenuOpen(false)}
                            className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs font-bold text-emerald-300 flex items-center gap-1.5 active:scale-95 transition-transform"
                          >
                            <Sun className="h-3.5 w-3.5 text-amber-300 shrink-0" />
                            <span className="truncate">Solar Bollards</span>
                          </Link>
                          <Link
                            href="/products/solar-flood-lights"
                            onClick={() => setMobileMenuOpen(false)}
                            className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs font-bold text-emerald-300 flex items-center gap-1.5 active:scale-95 transition-transform"
                          >
                            <Sun className="h-3.5 w-3.5 text-amber-300 shrink-0" />
                            <span className="truncate">Solar Flood</span>
                          </Link>
                          <Link
                            href="/products/solar-pillar-lights"
                            onClick={() => setMobileMenuOpen(false)}
                            className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs font-bold text-emerald-300 flex items-center gap-1.5 active:scale-95 transition-transform"
                          >
                            <Sun className="h-3.5 w-3.5 text-amber-300 shrink-0" />
                            <span className="truncate">Solar Pillar</span>
                          </Link>
                        </div>

                        <Link
                          href="/products/solar-power-plants"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2.5 p-2.5 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-xs font-bold text-emerald-300 mt-2 active:scale-95 transition-transform"
                        >
                          <Zap className="h-4 w-4 text-emerald-400" />
                          <span>Solar Power Plants</span>
                        </Link>
                      </div>

                      <div className="flex flex-col gap-3 pt-3 border-t border-slate-800/80">
                        <Button
                          asChild
                          onClick={() => setMobileMenuOpen(false)}
                          className="bg-ssil-red hover:bg-red-700 text-white font-extrabold rounded-xl h-11"
                        >
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
