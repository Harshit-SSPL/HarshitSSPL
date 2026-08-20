"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Layers, Sliders, Truck } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  stepNumber?: string;
  className?: string;
}

export const FeatureCard = ({
  icon,
  title,
  description,
  stepNumber,
  className,
}: FeatureCardProps) => {
  return (
    <div
      className={cn(
        "bg-white text-slate-900 p-8 rounded-xl border border-slate-200 flex flex-col items-center text-center relative",
        "transition-all duration-300 ease-in-out shadow-sm",
        "hover:shadow-md hover:-translate-y-1 hover:border-ssil-red/30",
        className
      )}
    >
      {stepNumber && (
        <span className="absolute top-4 right-4 text-xs font-black tracking-wider text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
          STEP {stepNumber}
        </span>
      )}

      {/* Icon container */}
      <div className="mb-6 bg-slate-50 p-4 rounded-full border border-slate-100 shadow-inner text-ssil-red">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold mb-2.5 tracking-tight text-slate-900">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-slate-600 leading-relaxed font-normal">
        {description}
      </p>
    </div>
  );
};

const ssilFeatures = [
  {
    icon: <Layers className="h-8 w-8 text-ssil-red" />,
    title: "1. Select Infrastructure Design",
    description: "Explore bollards, street lights, high-mast flag poles, and solar lighting categories tailored to project scale.",
    stepNumber: "01",
  },
  {
    icon: <Sliders className="h-8 w-8 text-ssil-blue" />,
    title: "2. Custom Technical Specification",
    description: "Configure wattage, optical distribution, voltage protection, and IP66 ingress protection to municipal standards.",
    stepNumber: "02",
  },
  {
    icon: <Truck className="h-8 w-8 text-ssil-red" />,
    title: "3. Project Execution & Deployment",
    description: "Partner with SSIL for complete manufacturing, supply, site execution, and structural project assurance.",
    stepNumber: "03",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export function FeatureCardDemo() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-ssil-blue">
            SSIL PROJECT ENGAGEMENT PROCESS
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-2">
            From Design Specification to Infrastructure Execution
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto mt-3">
            SSIL works directly with government bodies, municipal contractors, and commercial developers to deliver compliant lighting infrastructure.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {ssilFeatures.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                stepNumber={feature.stepNumber}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
