"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Download, MessageSquare } from "lucide-react";
import { cv } from "@/data/cv";

const NeuralGlobe = dynamic(() => import("./NeuralGlobe"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[320px] w-full items-center justify-center text-sm text-zinc-600 sm:h-[400px] lg:h-[440px]">
      Loading…
    </div>
  ),
});

const fadeUp = {
  initial: { opacity: 0, y: 18, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function Hero() {
  const scrollToTerminal = () => {
    document.getElementById("ask-ai")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="pt-28 pb-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-10">
        <div>
          <motion.p
            className="mb-4 text-sm text-zinc-500"
            {...fadeUp}
            transition={{ duration: 0.55 }}
          >
            {cv.hero.eyebrow}
          </motion.p>

          <motion.h1
            className="max-w-xl font-[family-name:var(--font-space-grotesk)] text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-50 sm:text-5xl lg:text-[52px]"
            initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.08 }}
          >
            Building practical{" "}
            <span className="text-shimmer">AI and data systems</span> that ship.
          </motion.h1>

          <motion.p
            className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
          >
            {cv.personalStatement}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
          >
            <a
              href={cv.cvPath}
              download
              className="inline-flex items-center gap-2 rounded-lg bg-zinc-50 px-5 py-2.5 text-sm font-medium text-zinc-950 transition-all duration-300 hover:bg-zinc-200 hover:shadow-[0_0_25px_rgba(56,189,248,0.35)]"
            >
              <Download className="h-4 w-4" />
              Download CV
            </a>
            <button
              type="button"
              onClick={scrollToTerminal}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-zinc-900 px-5 py-2.5 text-sm font-medium text-zinc-200 transition-colors duration-200 hover:bg-zinc-800"
            >
              <MessageSquare className="h-4 w-4" />
              Ask AI Twin
            </button>
          </motion.div>

          <motion.div
            className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-0"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.36 }}
          >
            {cv.hero.stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`sm:px-4 ${i > 0 ? "sm:border-l sm:border-white/[0.08]" : "sm:pl-0"}`}
              >
                <p className="font-mono text-xs text-zinc-500">{stat.label}</p>
                <p className="mt-1 text-sm text-zinc-300">{stat.value}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <NeuralGlobe />
        </motion.div>
      </div>
    </section>
  );
}
