"use client";

import React, { useEffect, useState } from "react";

export function ScrollBottomBlur() {
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    // Locate the footer element
    const footerEl = document.querySelector("footer") || document.querySelector("[data-footer]");

    if (!footerEl) return;

    // Use IntersectionObserver for zero-cost, high-performance footer detection
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsFooterVisible(entry.isIntersecting);
      },
      {
        root: null,
        threshold: [0, 0.01, 0.05],
      }
    );

    observer.observe(footerEl);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`fixed bottom-0 left-0 right-0 z-40 h-20 sm:h-28 md:h-32 pointer-events-none transition-opacity duration-500 ease-out ${
        isFooterVisible ? "opacity-0" : "opacity-100"
      }`}
      style={{
        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,1) 100%)",
        maskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,1) 100%)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Subtle Ambient Color Softener for Natural Edge Transition */}
      <div className="w-full h-full bg-gradient-to-b from-transparent via-white/20 to-white/60 dark:via-black/20 dark:to-black/60" />
    </div>
  );
}

export default ScrollBottomBlur;
