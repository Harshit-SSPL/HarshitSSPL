"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
  { title: "Projects", url: "/projects" },
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
          ? "bg-slate-950/75 dark:bg-slate-950/80 backdrop-blur-2xl border-b border-white/20 dark:border-slate-800/60 shadow-xl py-2.5"
          : "bg-slate-950/50 dark:bg-slate-950/60 backdrop-blur-2xl border-b border-white/15 dark:border-slate-800/40 shadow-lg shadow-black/10 py-3.5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Desktop Navigation */}
        <nav className="hidden items-center justify-between lg:flex">
          {/* Extreme Left SSIL Logo in Circular Container */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/95 shadow-sm p-1 border border-white/80 shrink-0 overflow-hidden transition-transform group-hover:scale-105">
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

            <div className="flex items-center gap-1">
              {menu.map((item) => (
                <Link
                  key={item.title}
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10 dark:hover:bg-slate-800/40 hover:text-ssil-red"
                  href={item.url}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button asChild variant="outline" size="sm" className="font-semibold text-white border-white/40 bg-white/15 hover:bg-white/25 shadow-xs">
              <Link href={auth.signup.url}>{auth.signup.text}</Link>
            </Button>
            <Button asChild size="sm" className="bg-ssil-red hover:bg-ssil-red-600 font-semibold shadow-sm text-white">
              <Link href={auth.login.url}>{auth.login.text}</Link>
            </Button>

            {/* Theme Toggle Button Wrapper */}
            <div className="p-1 rounded-xl bg-slate-900/60 dark:bg-slate-800/70 border border-white/20 dark:border-slate-700/60 backdrop-blur-sm">
              <AnimatedThemeToggler />
            </div>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-sm p-1 border border-white/80 shrink-0 overflow-hidden">
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

            <div className="flex items-center gap-2">
              <div className="p-1 rounded-xl bg-slate-900/60 dark:bg-slate-800/70 border border-white/20 dark:border-slate-700/60 backdrop-blur-sm">
                <AnimatedThemeToggler />
              </div>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="border-white/30 text-white bg-slate-900/70 backdrop-blur-sm hover:bg-white/20">
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
                    {menu.map((item) => (
                      <Link
                        key={item.title}
                        href={item.url}
                        className="font-bold text-white hover:text-ssil-red py-2 block"
                      >
                        {item.title}
                      </Link>
                    ))}

                    <div className="flex flex-col gap-3 pt-4 border-t border-slate-800">
                      <Button asChild variant="outline" className="text-white border-white/40 bg-white/10 hover:bg-white/20">
                        <Link href={auth.signup.url}>{auth.signup.text}</Link>
                      </Button>
                      <Button asChild className="bg-ssil-red hover:bg-ssil-red-600 text-white">
                        <Link href={auth.login.url}>{auth.login.text}</Link>
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
