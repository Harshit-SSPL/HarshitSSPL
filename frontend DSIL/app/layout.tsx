import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar1 } from "@/components/ui/shadcnblocks-com-navbar1";
import { Footerdemo } from "@/components/ui/footer-section";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap", preload: true });

export const metadata: Metadata = {
  title: "Dev Shakti India Limited (DSIL) | Outdoor & Infrastructure Lighting Solutions",
  description: "Official digital corporate portal for Dev Shakti India Limited / Dev Shakti Private Limited (DSIL) - Leading manufacturer of street lights, bollards, Indian flag poles, and outdoor infrastructure lighting.",
  icons: {
    icon: [
      { url: "/DSILLogo.jpg", href: "/DSILLogo.jpg" },
    ],
    apple: [
      { url: "/DSILLogo.jpg", href: "/DSILLogo.jpg" },
    ],
    shortcut: "/DSILLogo.jpg",
  },
  openGraph: {
    title: "Dev Shakti India Limited (DSIL)",
    description: "Outdoor Infrastructure & Architectural Lighting Solutions",
    type: "website",
    images: ["/DSILLogo.jpg"],
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
