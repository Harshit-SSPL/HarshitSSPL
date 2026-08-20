"use client";

import React from "react";
import Link from "next/link";
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
  logo?: {
    url: string;
    alt: string;
    title: string;
    subtitle?: string;
  };
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
    title: "About Us",
    url: "/about",
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
  logo = {
    url: "/",
    alt: "Shiv Shakti India Limited Logo",
    title: "SSIL",
    subtitle: "SHIV SHAKTI INDIA LIMITED",
  },
  menu = defaultSsilMenu,
  auth = {
    login: { text: "Inquire Now", url: "/contact" },
    signup: { text: "Catalogue", url: "/products" },
  },
}: Navbar1Props) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur-md">
      <div className="container mx-auto px-4 py-3 md:px-6">
        {/* Desktop Navigation */}
        <nav className="hidden items-center justify-between lg:flex">
          {/* Extreme Left SSIL Logo Branding */}
          <div className="flex items-center gap-8">
            <Link href={logo.url} className="flex items-center gap-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-ssil-red via-ssil-red-600 to-ssil-blue p-2 shadow-sm transition-transform group-hover:scale-105">
                <span className="text-base font-extrabold tracking-widest text-white">SS</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-slate-900 leading-none">
                  SSIL<span className="text-ssil-red">.</span>
                </span>
                <span className="text-[10px] font-bold tracking-wider text-ssil-blue uppercase mt-0.5">
                  {logo.subtitle}
                </span>
              </div>
            </Link>

            <div className="flex items-center ml-4">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button asChild variant="outline" size="sm" className="font-semibold text-slate-700 hover:text-ssil-blue border-slate-300">
              <Link href={auth.signup.url}>{auth.signup.text}</Link>
            </Button>
            <Button asChild size="sm" className="bg-ssil-red hover:bg-ssil-red-600 font-semibold shadow-sm">
              <Link href={auth.login.url}>{auth.login.text}</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link href={logo.url} className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-ssil-red to-ssil-blue p-2">
                <span className="text-xs font-black tracking-widest text-white">SS</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-slate-900 leading-none">
                  SSIL<span className="text-ssil-red">.</span>
                </span>
                <span className="text-[9px] font-bold tracking-wider text-ssil-blue uppercase">
                  SHIV SHAKTI
                </span>
              </div>
            </Link>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="border-slate-200">
                  <Menu className="size-5 text-slate-700" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto bg-white">
                <SheetHeader>
                  <SheetTitle>
                    <Link href={logo.url} className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ssil-red p-2">
                        <span className="text-xs font-black text-white">SS</span>
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-lg font-black text-slate-900 leading-none">
                          SSIL<span className="text-ssil-red">.</span>
                        </span>
                        <span className="text-[9px] font-bold text-ssil-blue uppercase">
                          SHIV SHAKTI INDIA LIMITED
                        </span>
                      </div>
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

                  <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
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
      <NavigationMenuItem key={item.title} className="text-slate-600">
        <NavigationMenuTrigger className="font-semibold text-slate-700 hover:text-ssil-red">{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="w-80 p-3 bg-white">
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
      className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-ssil-red"
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
