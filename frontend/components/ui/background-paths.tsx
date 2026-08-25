"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function FloatingPaths({ position }: { position: number }) {
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        width: 0.8 + i * 0.04,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden scale-x-[-1]">
            <svg
                className="w-full h-full text-ssil-red dark:text-red-500 opacity-90 dark:opacity-100"
                viewBox="0 0 696 316"
                fill="none"
            >
                <title>SSIL Red Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.25 + (path.id % 6) * 0.10}
                        initial={{ pathLength: 0.4, opacity: 0.6 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.4, 0.95, 0.4],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 18 + (path.id % 8) * 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

export interface BackgroundPathsProps {
    className?: string;
    children?: React.ReactNode;
}

export function BackgroundPaths({ className, children }: BackgroundPathsProps) {
    return (
        <div className={cn("relative w-full overflow-hidden", className)}>
            {/* Red Floating Line Animations Backdrop (Mirrored Right -> Down -> Left) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <FloatingPaths position={1} />
                <FloatingPaths position={-1} />
            </div>

            {/* Foreground Content */}
            {children && <div className="relative z-10">{children}</div>}
        </div>
    );
}

export default BackgroundPaths;
