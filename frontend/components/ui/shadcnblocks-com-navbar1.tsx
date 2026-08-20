"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Book, Menu, Sunset, Trees, Zap, Lightbulb } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
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
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
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
  {
    title: "About Us",
    url: "/about",
  },
  {
    title: "Products",
    url: "/products",
    items: [
      {
        title: "Bollards",
        description: "Architectural pathway and landscape bollard luminaires",
        icon: <Lightbulb className="size-5 shrink-0 text-ssil-red" />,
        url: "/products/bollards",
      },
      {
        title: "Street Lights",
        description: "High-power LED luminaires for expressways & municipal roads",
        icon: <Zap className="size-5 shrink-0 text-ssil-blue" />,
        url: "/products/street-lights",
      },
      {
        title: "Indian Flag Poles",
        description: "High-mast monument flag poles for national landmarks",
        icon: <Trees className="size-5 shrink-0 text-ssil-red" />,
        url: "/products/indian-flag-poles",
      },
      {
        title: "Solar Lighting",
        description: "Off-grid standalone solar street and garden poles",
        icon: <Sunset className="size-5 shrink-0 text-ssil-blue" />,
        url: "/products/solar-lighting",
      },
    ],
  },
  {
    title: "Projects",
    url: "/projects",
  },
  {
    title: "Contact Us",
    url: "/contact",
  },
];

const Navbar1 = ({
  menu = defaultSsilMenu,
  auth = {
    login: { text: "Inquire Now", url: "/contact" },
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
          ? "bg-white/85 backdrop-blur-lg border-b border-slate-200/80 shadow-md py-2.5"
          : "bg-white/70 backdrop-blur-md border-b border-white/20 shadow-sm py-3.5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Desktop Navigation */}
        <nav className="hidden items-center justify-between lg:flex">
          {/* Extreme Left SSIL Authentic Logo Asset */}
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center shrink-0 transition-opacity hover:opacity-90">
              <Image
                src="/branding/companylogo.png"
                alt="Shiv Shakti India Limited Logo"
                width={200}
                height={55}
                className="h-11 w-auto object-contain"
                priority
              />
            </Link>

            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button asChild variant="outline" size="sm" className="font-semibold text-slate-800 border-slate-300/80 bg-white/80 hover:bg-white hover:text-ssil-blue shadow-xs">
              <Link href={auth.signup.url}>{auth.signup.text}</Link>
            </Button>
            <Button asChild size="sm" className="bg-ssil-red hover:bg-ssil-red-600 font-semibold shadow-sm text-white">
              <Link href={auth.login.url}>{auth.login.text}</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/branding/companylogo.png"
                alt="Shiv Shakti India Limited Logo"
                width={160}
                height={45}
                className="h-9 w-auto object-contain"
                priority
              />
            </Link>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="border-slate-300 bg-white/80 backdrop-blur-sm">
                  <Menu className="size-5 text-slate-800" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto bg-white/95 backdrop-blur-xl">
                <SheetHeader>
                  <SheetTitle>
                    <Link href="/" className="flex items-center">
                      <Image
                        src="/branding/companylogo.png"
                        alt="Shiv Shakti India Limited Logo"
                        width={150}
                        height={40}
                        className="h-8 w-auto object-contain"
                      />
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="my-6 flex flex-col gap-6">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-3 pt-4 border-t border-slate-200">
                    <Button asChild variant="outline">
                      <Link href={auth.signup.url}>{auth.signup.text}</Link>
                    </Button>
                    <Button asChild className="bg-ssil-red hover:bg-ssil-red-600">
                      <Link href={auth.login.url}>{auth.login.text}</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title} className="text-slate-700">
        <NavigationMenuTrigger className="font-semibold text-slate-800 hover:text-ssil-red bg-transparent border-0">{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="w-80 p-3 bg-white/95 backdrop-blur-md shadow-xl border border-slate-100 rounded-lg">
            {item.items.map((subItem) => (
              <li key={subItem.title}>
                <Link
                  className="flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-50 hover:text-ssil-red"
                  href={subItem.url}
                >
                  {subItem.icon}
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      {subItem.title}
                    </div>
                    {subItem.description && (
                      <p className="text-xs leading-snug text-slate-500 mt-1">
                        {subItem.description}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <Link
      key={item.title}
      className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-semibold text-slate-800 transition-colors hover:bg-white/60 hover:text-ssil-red"
      href={item.url}
    >
      {item.title}
    </Link>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="py-2 font-semibold text-slate-800 hover:no-underline hover:text-ssil-red">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2 pl-3">
          {item.items.map((subItem) => (
            <Link
              key={subItem.title}
              className="flex select-none gap-3 rounded-md p-2.5 leading-none outline-none transition-colors hover:bg-slate-50 hover:text-ssil-red"
              href={subItem.url}
            >
              {subItem.icon}
              <div>
                <div className="text-sm font-semibold text-slate-800">{subItem.title}</div>
                {subItem.description && (
                  <p className="text-xs leading-snug text-slate-500 mt-0.5">
                    {subItem.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link key={item.title} href={item.url} className="font-semibold text-slate-800 hover:text-ssil-red py-2 block">
      {item.title}
    </Link>
  );
};

export { Navbar1 };
