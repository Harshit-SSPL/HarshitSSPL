import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar1 } from "@/components/ui/shadcnblocks-com-navbar1";
import { Footerdemo } from "@/components/ui/footer-section";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap", preload: true });

export const metadata: Metadata = {
  title: "Shiv Shakti India Limited (SSIL) | Outdoor & Infrastructure Lighting Solutions",
  description: "Official digital corporate portal for Shiv Shakti India Limited / Shiv Shakti Private Limited (SSIL) - Leading manufacturer of street lights, bollards, Indian flag poles, and outdoor infrastructure lighting.",
  icons: {
    icon: [
      { url: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788665646/ssil_favicon.png", href: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788665646/ssil_favicon.png" },
      { url: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788665648/ssil_companylogo.png", href: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788665648/ssil_companylogo.png" },
    ],
    apple: [
      { url: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788665648/ssil_companylogo.png", href: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788665648/ssil_companylogo.png" },
    ],
    shortcut: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788665646/ssil_favicon.png",
  },
  openGraph: {
    title: "Shiv Shakti India Limited (SSIL)",
    description: "Outdoor Infrastructure & Architectural Lighting Solutions",
    type: "website",
    images: ["https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788665648/ssil_companylogo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col bg-white text-slate-900 antialiased`}>
        <Navbar1 />
        <main className="flex-1">{children}</main>
        <Footerdemo />
      </body>
    </html>
  );
}
