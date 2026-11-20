"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { motion } from "framer-motion";

const orbs: {
  className: string;
  style: CSSProperties;
  animate: { x: number[]; y: number[]; scale: number[] };
  duration: number;
}[] = [
  {
    className:
      "absolute h-[42vw] w-[42vw] max-h-[520px] max-w-[520px] rounded-full bg-[rgba(56,189,248,0.16)] blur-[130px]",
    style: { top: "-8%", left: "10%" },
    animate: {
      x: [0, 80, -40, 0],
      y: [0, 50, 90, 0],
      scale: [1, 1.15, 0.95, 1],
    },
    duration: 22,
  },
  {
    className:
      "absolute h-[38vw] w-[38vw] max-h-[480px] max-w-[480px] rounded-full bg-[rgba(99,102,241,0.14)] blur-[130px]",
    style: { top: "20%", right: "-5%" },
    animate: {
      x: [0, -70, 30, 0],
      y: [0, 70, -40, 0],
      scale: [1, 0.9, 1.2, 1],
    },
    duration: 25,
  },
  {
    className:
      "absolute h-[36vw] w-[36vw] max-h-[440px] max-w-[440px] rounded-full bg-[rgba(6,182,212,0.10)] blur-[130px]",
    style: { bottom: "5%", left: "30%" },
    animate: {
      x: [0, 60, -50, 0],
      y: [0, -60, 40, 0],
      scale: [1, 1.1, 0.92, 1],
    },
    duration: 18,
  },
];

const streaks = [
  { delay: 0, left: "18%", duration: 4.5 },
  { delay: 2.2, left: "52%", duration: 5.2 },
  { delay: 4.1, left: "78%", duration: 4.8 },
];

export default function AmbientBackground() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const onMove = (e: PointerEvent) => {
      root.style.setProperty("--mouse-x", `${e.clientX}px`);
      root.style.setProperty("--mouse-y", `${e.clientY}px`);
    };

    root.style.setProperty("--mouse-x", `${window.innerWidth / 2}px`);
    root.style.setProperty("--mouse-y", `${window.innerHeight * 0.3}px`);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#09090B]"
      aria-hidden
    >
      {/* Top hero spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_45%_at_50%_-10%,rgba(56,189,248,0.14),transparent)]" />

      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={orb.className}
          style={orb.style}
          animate={orb.animate}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Base faint dots */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse 75% 65% at 50% 35%, #000 15%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 65% at 50% 35%, #000 15%, transparent 78%)",
        }}
      />

      {/* Cursor-reactive brighter dots */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(rgba(56,189,248,0.7) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(350px circle at var(--mouse-x) var(--mouse-y), #000 0%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(350px circle at var(--mouse-x) var(--mouse-y), #000 0%, transparent 70%)",
        }}
      />

      {/* Shooting light streaks */}
      {streaks.map((streak, i) => (
        <motion.div
          key={i}
          className="absolute top-0 h-[45vh] w-px origin-top bg-gradient-to-b from-transparent via-sky-300/40 to-transparent"
          style={{ left: streak.left, rotate: "18deg" }}
          initial={{ opacity: 0, y: "-20%" }}
          animate={{
            opacity: [0, 0.7, 0],
            y: ["-20%", "80%"],
          }}
          transition={{
            duration: streak.duration,
            delay: streak.delay,
            repeat: Infinity,
            repeatDelay: 3.5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
