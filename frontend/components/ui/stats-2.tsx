"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Zap, Award, Globe, Building2 } from "lucide-react";

interface CounterProps {
  value: number;
  suffix?: string;
  hasCommas?: boolean;
  duration?: number;
  delay?: number;
  ease?: number[] | string;
}

const Counter = ({
  value,
  suffix = "+",
  hasCommas = false,
  duration = 2.0,
  delay = 0,
  ease = "easeOut",
}: CounterProps) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: false, margin: "-30px" });

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    if (isInView) {
      const controls = animate(0, value, {
        duration: duration,
        delay: delay,
        ease: ease as any,
        onUpdate(latest) {
          const rounded = Math.floor(latest);
          node.textContent = (hasCommas ? rounded.toLocaleString("en-US") : rounded.toString()) + suffix;
        },
      });
      return () => controls.stop();
    } else {
      node.textContent = "0" + suffix;
    }
  }, [isInView, value, suffix, hasCommas, duration, delay, ease]);

  return <span ref={nodeRef}>0{suffix}</span>;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

const defaultMetricsData = [
  {
    targetValue: 20000,
    hasCommas: true,
    suffix: "+",
    duration: 2.6,
    delay: 0,
    ease: "easeOut",
    label: "Poles & Lighting Installations",
    sublabel: "DEPLOYED FOOTPRINT",
    icon: <Zap className="h-4 w-4" />,
  },
  {
    targetValue: 12,
    hasCommas: false,
    suffix: "+",
    duration: 0.6,
    delay: 0.05,
    ease: "easeOut",
    label: "Years of Experience",
    sublabel: "ENGINEERING HERITAGE",
    icon: <Award className="h-4 w-4" />,
  },
  {
    targetValue: 22,
    hasCommas: false,
    suffix: "+",
    duration: 0.9,
    delay: 0.1,
    ease: "easeOut",
    label: "States Served",
    sublabel: "PAN-INDIA REACH",
    icon: <Globe className="h-4 w-4" />,
  },
  {
    targetValue: 500,
    hasCommas: false,
    suffix: "+",
    duration: 1.6,
    delay: 0.15,
    ease: "easeOut",
    label: "Projects Completed",
    sublabel: "EXECUTED DELIVERIES",
    icon: <Building2 className="h-4 w-4" />,
  },
];

export const Stats2 = () => {
  const [metrics, setMetrics] = React.useState(defaultMetricsData);

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const res = await fetch(`${apiUrl}/home/stats`);
        const data = await res.json();
        if (data.success && data.stats) {
          const s = data.stats;
          setMetrics([
            {
              targetValue: s.deployedFootprints?.value ?? 20000,
              hasCommas: true,
              suffix: s.deployedFootprints?.suffix ?? "+",
              duration: 2.6,
              delay: 0,
              ease: "easeOut",
              label: s.deployedFootprints?.label ?? "Poles & Lighting Installations",
              sublabel: s.deployedFootprints?.sublabel ?? "DEPLOYED FOOTPRINT",
              icon: <Zap className="h-4 w-4" />,
            },
            {
              targetValue: s.yearsExperience?.value ?? 12,
              hasCommas: false,
              suffix: s.yearsExperience?.suffix ?? "+",
              duration: 0.6,
              delay: 0.05,
              ease: "easeOut",
              label: s.yearsExperience?.label ?? "Years of Experience",
              sublabel: s.yearsExperience?.sublabel ?? "ENGINEERING HERITAGE",
              icon: <Award className="h-4 w-4" />,
            },
            {
              targetValue: s.statesServed?.value ?? 22,
              hasCommas: false,
              suffix: s.statesServed?.suffix ?? "+",
              duration: 0.9,
              delay: 0.1,
              ease: "easeOut",
              label: s.statesServed?.label ?? "States Served",
              sublabel: s.statesServed?.sublabel ?? "PAN-INDIA REACH",
              icon: <Globe className="h-4 w-4" />,
            },
            {
              targetValue: s.projectsCompleted?.value ?? 500,
              hasCommas: false,
              suffix: s.projectsCompleted?.suffix ?? "+",
              duration: 1.6,
              delay: 0.15,
              ease: "easeOut",
              label: s.projectsCompleted?.label ?? "Projects Completed",
              sublabel: s.projectsCompleted?.sublabel ?? "EXECUTED DELIVERIES",
              icon: <Building2 className="h-4 w-4" />,
            },
          ]);
        }
      } catch (err) {
        // use default fallback
      }
    };
    fetchStats();
  }, []);
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 via-red-50/20 to-slate-50 dark:from-slate-950 dark:via-red-950/10 dark:to-slate-950 border-b border-slate-200/60 dark:border-slate-800/80 transition-colors">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <motion.div
          className="text-center max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="text-sm sm:text-base font-extrabold uppercase tracking-widest text-ssil-red block mb-2.5">
            LIGHTING SOLUTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Lighting Solutions Built for Every Application
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mt-3.5 leading-relaxed font-normal">
            From architectural spaces to highways and large-scale infrastructure, SSIL delivers lighting solutions engineered around performance.
          </p>
        </motion.div>

        {/* 4 Metric Cards Grid with Enhanced Pop-Up & Natural Independent-Finish Counting Animation */}
        <motion.div
          className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-40px" }}
          variants={containerVariants}
        >
          {metrics.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex h-44 flex-col justify-between rounded-xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-2.5 hover:scale-[1.02] hover:border-ssil-red hover:shadow-[0_20px_45px_-8px_rgba(225,29,72,0.35)] dark:hover:shadow-[0_20px_50px_-8px_rgba(225,29,72,0.45)] cursor-pointer overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-ssil-red font-extrabold text-[10px] tracking-wider uppercase">
                  {item.sublabel}
                </span>
                <div className="p-1.5 rounded-lg bg-ssil-red/10 text-ssil-red transition-transform group-hover:scale-110 duration-300">
                  {item.icon}
                </div>
              </div>

              <div className="mt-2">
                <h3 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-none group-hover:text-ssil-red transition-colors duration-300">
                  <Counter
                    value={item.targetValue}
                    suffix={item.suffix}
                    hasCommas={item.hasCommas}
                    duration={item.duration}
                    delay={item.delay}
                    ease={item.ease}
                  />
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-wider mt-2.5 leading-snug">
                  {item.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

