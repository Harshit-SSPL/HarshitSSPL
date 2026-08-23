"use client";

import React, { useEffect, useState } from "react";
import { SmokeyBackground, LoginForm } from "@/components/ui/login-form";

// Custom hook to reactively observe document dark mode class changes
function useIsDarkTheme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      if (typeof document !== "undefined") {
        setIsDark(document.documentElement.classList.contains("dark"));
      }
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    if (typeof document !== "undefined") {
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class", "data-theme"],
      });
    }

    return () => observer.disconnect();
  }, []);

  return isDark;
}

export default function LoginPage() {
  const isDark = useIsDarkTheme();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <main className="relative w-screen min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 overflow-hidden transition-colors duration-300">
      
      {/* WebGL Smokey Shader Background (Red/White in Light Mode, Black/Red in Dark Mode) */}
      <SmokeyBackground
        color="#E11D48"
        isDark={isDark}
        backdropBlurAmount="md"
        className="absolute inset-0"
      />

      {/* Centered Theme-Compatible Glass Login Box (No static photo, No Home button, No SSIL text header, No Google Login) */}
      <div className="relative z-10 flex items-center justify-center w-full max-w-sm">
        <LoginForm />
      </div>

    </main>
  );
}
