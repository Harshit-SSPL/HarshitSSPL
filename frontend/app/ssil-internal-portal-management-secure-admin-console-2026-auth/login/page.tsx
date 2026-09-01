"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { User, Lock, ArrowRight, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
import { fetchApi, ADMIN_BASE_PATH } from "@/lib/admin-api";
import { useAdminAuth } from "@/context/admin-auth-context";

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

interface RibbonGradientProps {
  color?: string;
  backdropBlurAmount?: string;
  isDark?: boolean;
  className?: string;
}

/**
 * Animated Ribbon Field Gradient Component (21st.dev inspired recipe)
 * - Light Mode: Red & White Palette (#FFFFFF, #FFE4E6, #F43F5E, #E11D48)
 * - Dark Mode: Black & Red Palette (#020617, #450A0A, #991B1B, #E11D48)
 */
function SmokeyBackground({
  color = "#E11D48",
  backdropBlurAmount = "md",
  isDark = true,
  className = "",
}: RibbonGradientProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const startTime = performance.now();

    // Red & White Palette for Light Mode
    const lightColors = ["#FFFFFF", "#FFE4E6", "#F43F5E", color, "#FFFFFF", color];
    // Black & Red Palette for Dark Mode
    const darkColors = ["#020617", "#450A0A", "#991B1B", color, "#020617", color];

    const render = (now: number) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      const elapsed = (now - startTime) / 1000;
      const waveClock = 20.75 + elapsed * 1.2;

      ctx.clearRect(0, 0, width, height);

      // Base Backdrop Fill
      const backdrop = isDark ? "#020617" : "#FFFFFF";
      ctx.fillStyle = backdrop;
      ctx.fillRect(0, 0, width, height);

      const colors = isDark ? darkColors : lightColors;
      const angleRad = (32 * Math.PI) / 180;

      const numStripes = 7;
      const stripeWidth = Math.max(width, height) * 0.28;

      for (let i = 0; i < numStripes; i++) {
        const progress = i / (numStripes - 1);
        const waveOffset = (14 / 100) * 0.35 * Math.sin(progress * 2.4 * Math.PI * 2 + waveClock) * width;
        const sway = Math.sin(elapsed * 0.6) * 0.05;

        ctx.save();
        ctx.translate(width / 2 + waveOffset, height / 2);
        ctx.rotate(angleRad + sway);

        const xPos = (progress - 0.5) * Math.max(width, height) * 1.3;

        const grad = ctx.createLinearGradient(xPos - stripeWidth / 2, 0, xPos + stripeWidth / 2, 0);
        const c1 = colors[i % colors.length];
        const c2 = colors[(i + 1) % colors.length];

        grad.addColorStop(0, c1);
        grad.addColorStop(0.5, c2);
        grad.addColorStop(1, c1);

        ctx.fillStyle = grad;
        ctx.globalAlpha = isDark ? 0.8 : 0.65;
        ctx.fillRect(xPos - stripeWidth / 2, -height * 1.5, stripeWidth, height * 3);
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark, color]);

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
      {/* Dynamic Ribbon Field Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* SVG Grain Noise Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.21'/></svg>")`,
          backgroundSize: "120px 120px",
        }}
      />
      <div className="absolute inset-0 backdrop-blur-md"></div>
    </div>
  );
}

export default function AdminLoginPage() {
  const isDark = useIsDarkTheme();
  const router = useRouter();
  const { login, isAuthenticated } = useAdminAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // When visiting the login page directly, allow user to input credentials
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetchApi("/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      if (res.success && res.token && res.admin) {
        login(res.token, res.admin);
        router.push(ADMIN_BASE_PATH);
      } else {
        setError(res.message || "Invalid admin credentials.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative w-screen min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 overflow-hidden transition-colors duration-300">
      
      {/* WebGL Smokey Shader Background */}
      <SmokeyBackground
        color="#E11D48"
        isDark={isDark}
        backdropBlurAmount="md"
        className="absolute inset-0"
      />

      {/* Centered Theme-Compatible Glass Login Box */}
      <div className="relative z-10 flex items-center justify-center w-full max-w-sm">
        <div className="w-full max-w-sm p-8 space-y-6 bg-white/70 dark:bg-slate-900/65 backdrop-blur-xl rounded-2xl border border-white/60 dark:border-white/15 shadow-2xl transition-colors duration-300">
          
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Welcome Back
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
              Sign in to access corporate portal
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-semibold">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-7">
            
            {/* Username / ID Input with Animated Floating Label */}
            <div className="relative z-0">
              <input
                type="text"
                id="floating_username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-slate-900 dark:text-white bg-transparent border-0 border-b-2 border-slate-300 dark:border-slate-600 appearance-none focus:outline-none focus:ring-0 focus:border-ssil-red dark:focus:border-ssil-red peer font-medium"
                placeholder=" "
                required
                autoComplete="username"
              />
              <label
                htmlFor="floating_username"
                className="absolute text-sm text-slate-600 dark:text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-ssil-red dark:peer-focus:text-ssil-red peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-semibold"
              >
                <User className="inline-block mr-2 -mt-1 text-slate-500 dark:text-slate-400" size={16} />
                Admin Username / ID
              </label>
            </div>

            {/* Password Input with Animated Floating Label and Eye Toggle */}
            <div className="relative z-0">
              <input
                type={showPassword ? "text" : "password"}
                id="floating_password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block py-2.5 pr-8 pl-0 w-full text-sm text-slate-900 dark:text-white bg-transparent border-0 border-b-2 border-slate-300 dark:border-slate-600 appearance-none focus:outline-none focus:ring-0 focus:border-ssil-red dark:focus:border-ssil-red peer font-medium"
                placeholder=" "
                required
                autoComplete="current-password"
              />
              <label
                htmlFor="floating_password"
                className="absolute text-sm text-slate-600 dark:text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-ssil-red dark:peer-focus:text-ssil-red peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-semibold"
              >
                <Lock className="inline-block mr-2 -mt-1 text-slate-500 dark:text-slate-400" size={16} />
                Password
              </label>

              {/* Eye Toggle Icon for Hide/Unhide Password */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-3 text-slate-400 hover:text-slate-700 dark:hover:text-white focus:outline-none transition-colors p-0.5"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-slate-500 dark:text-slate-300" />
                ) : (
                  <Eye className="h-4 w-4 text-slate-500 dark:text-slate-300" />
                )}
              </button>
            </div>

            {/* Submit Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="group w-full flex items-center justify-center py-3 px-4 bg-ssil-red hover:bg-red-700 text-white font-extrabold rounded-xl shadow-lg shadow-red-600/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Authenticating...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

        </div>
      </div>

    </main>
  );
}
