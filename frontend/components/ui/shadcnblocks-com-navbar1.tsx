"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
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
                  src="/branding/companylogo-ui.png"
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
                <span className="text-[9px] font-bold tracking-wider text-slate-200 uppercase mt-0.5">
                  SHIV SHAKTI INDIA
                </span>
              </div>
            </Link>

            {/* Menu Links: Active Route is SSIL Red, Hover is SSIL Red (NO Background Box) */}
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
            </div>
          </div>

          {/* Action Buttons & Theme Toggler on Extreme Right Edge */}
          <div className="flex items-center gap-4">
            <Button
              asChild
              size="sm"
              className="bg-ssil-red hover:bg-red-700 text-white font-extrabold rounded-full px-5 shadow-sm border-0"
            >
              <Link href="/contact">Request Quote</Link>
            </Button>

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
                  src="/branding/companylogo-ui.png"
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
                            src="/branding/companylogo-ui.png"
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

                    <div className="flex flex-col gap-3 pt-4 border-t border-slate-800">
                      <Button asChild className="bg-ssil-red hover:bg-red-700 text-white rounded-full">
                        <Link href="/contact">Request Quote</Link>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export { Navbar1 };
