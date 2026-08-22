"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface StandardCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  categoryTag?: string;
  className?: string;
}

export function StandardCard({
  icon,
  title,
  description,
  categoryTag,
  className,
}: StandardCardProps) {
  return (
    <div
      className={cn(
        "group relative p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-950 text-slate-900 dark:text-white border border-slate-200/90 dark:border-zinc-800/90 shadow-sm flex flex-col justify-between overflow-hidden min-h-[240px] w-full",
        "transition-all duration-300 ease-in-out cursor-pointer select-none",
        "hover:-translate-y-2 hover:border-ssil-red/80 hover:shadow-[0_18px_45px_-5px_rgba(225,29,72,0.35)] dark:hover:shadow-[0_18px_50px_-5px_rgba(225,29,72,0.5)]",
        className
      )}
    >
      {/* Subtle Ambient Hover Background Glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-40 h-40 bg-ssil-red/10 rounded-full blur-2xl pointer-events-none group-hover:bg-ssil-red/20 transition-all duration-500" />

      <div>
        {/* Top Header Row: Icon + Category Tag */}
        <div className="flex items-center justify-between mb-4">
          <div className="h-11 w-11 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200/80 dark:border-red-900/60 flex items-center justify-center text-ssil-red shrink-0 transition-transform group-hover:scale-110 duration-300">
            {icon}
          </div>
          {categoryTag && (
            <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-slate-100 dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-800">
              {categoryTag}
            </span>
          )}
        </div>

        {/* Card Title */}
        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight group-hover:text-ssil-red transition-colors duration-300 line-clamp-1">
          {title}
        </h3>

        {/* Card Description */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal line-clamp-3">
          {description}
        </p>
      </div>

      {/* Bottom Subtle Accent Bar */}
      <div className="mt-5 pt-3 border-t border-slate-100 dark:border-zinc-900/80 flex items-center justify-between text-xs font-bold text-slate-400 dark:text-zinc-500 group-hover:text-ssil-red transition-colors duration-300">
        <span>SSIL Solutions</span>
        <span className="group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
      </div>
    </div>
  );
}

export default StandardCard;
