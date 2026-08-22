"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function LampDemo() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="text-center text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white"
      >
        About Us
      </motion.h1>
    </LampContainer>
  );
}

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-start overflow-hidden bg-slate-950 w-full rounded-none z-0 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 border-b border-slate-800/80",
        className
      )}
    >
      {/* Red Lamp Light Animation Origin (Positioned cleanly below fixed navbar with 2.5x expanded vertical light reach) */}
      <div className="relative flex w-full h-[280px] sm:h-[340px] md:h-[380px] items-center justify-center isolate z-0 pointer-events-none mt-2 sm:mt-4 md:mt-5">
        {/* Left Conic Red Gradient (Expanded 2.5x reach) */}
        <motion.div
          initial={{ opacity: 0.5, width: "18rem" }}
          whileInView={{ opacity: 1, width: "42rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-80 sm:h-96 overflow-visible w-[42rem] bg-gradient-conic from-red-600 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-[100%] left-0 bg-slate-950 h-48 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-48 h-[100%] left-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        {/* Right Conic Red Gradient (Expanded 2.5x reach) */}
        <motion.div
          initial={{ opacity: 0.5, width: "18rem" }}
          whileInView={{ opacity: 1, width: "42rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-80 sm:h-96 w-[42rem] bg-gradient-conic from-transparent via-transparent to-red-600 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-48 h-[100%] right-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-[100%] right-0 bg-slate-950 h-48 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        {/* Background Blur & Red Glow Layers (2.5x Expanded Radius & Vertical Spread) */}
        <div className="absolute top-1/2 h-64 w-full translate-y-12 scale-x-150 bg-slate-950 blur-3xl"></div>
        <div className="absolute top-1/2 z-50 h-64 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        
        {/* Outer Red Neon Ambient Light Spread */}
        <div className="absolute inset-auto z-50 h-56 sm:h-64 w-[36rem] sm:w-[44rem] -translate-y-1/3 rounded-full bg-red-600/40 opacity-60 blur-[100px]"></div>

        {/* Inner Red Core Lamp Light (2.5x Expanded Core) */}
        <motion.div
          initial={{ width: "10rem" }}
          whileInView={{ width: "24rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-44 sm:h-52 w-80 sm:w-96 -translate-y-[5rem] rounded-full bg-rose-500/50 blur-[70px]"
        ></motion.div>

        {/* Horizontal Red Laser Line */}
        <motion.div
          initial={{ width: "18rem" }}
          whileInView={{ width: "40rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[40rem] -translate-y-[6.5rem] bg-rose-400/90"
        ></motion.div>

        <div className="absolute inset-auto z-40 h-48 w-full -translate-y-[12rem] bg-slate-950"></div>
      </div>

      {/* Children Content Container */}
      <div className="relative z-50 flex flex-col items-center px-4 md:px-6 w-full max-w-6xl mx-auto -translate-y-16 sm:-translate-y-24 md:-translate-y-28">
        {children}
      </div>
    </div>
  );
};
