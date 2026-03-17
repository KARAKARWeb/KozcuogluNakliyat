"use client";

import dynamic from "next/dynamic";
import type { HTMLMotionProps } from "framer-motion";

const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false }
) as React.ComponentType<HTMLMotionProps<"div">>;

interface FadeInUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
}

export function FadeInUp({ children, delay = 0, className = "", once = true }: FadeInUpProps) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </MotionDiv>
  );
}

export function FadeIn({ children, delay = 0, className = "" }: FadeInUpProps) {
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </MotionDiv>
  );
}

export function StaggerContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <MotionDiv
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ staggerChildren: 0.1 }}
      className={className}
    >
      {children}
    </MotionDiv>
  );
}
