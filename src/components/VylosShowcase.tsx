"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Cpu, LayoutGrid } from "lucide-react";
import { cv, type ArchitectureNode } from "@/data/cv";
import SpotlightCard from "./SpotlightCard";
import SectionHeader from "./ui/SectionHeader";

const overviewTech = [
  "Python",
  "Gemini API",
  "RAG",
  "Ollama",
  "Supabase",
  "SQL",
  "Email Automation",
];

const viewTabs = [
  { id: "overview" as const, label: "Overview", icon: LayoutGrid },
  {
    id: "architecture" as const,
    label: "System Architecture",
    icon: Cpu,
  },
];

function ArchitectureFlow({
  nodes,
  active,
  onSelect,
}: {
  nodes: readonly ArchitectureNode[];
  active: ArchitectureNode | null;
  onSelect: (node: ArchitectureNode | null) => void;
}) {
  return (
    <div>
      <p className="mb-6 text-sm text-zinc-500">
        Click a node to inspect engineering decisions.
      </p>

      <div className="relative">
        <div
          className="pointer-events-none absolute top-[42%] right-[6%] left-[6%] z-0 hidden h-px bg-white/10 lg:block"
          aria-hidden
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.9)]"
              animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 2.6,
                delay: i * 0.85,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {nodes.map((node) => {
            const isActive = active?.id === node.id;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => onSelect(isActive ? null : node)}
                className="relative w-full rounded-xl border border-white/[0.08] bg-zinc-900/50 p-4 text-left transition-colors duration-200 hover:border-white/[0.16] hover:bg-[#18181B]"
              >
                {isActive ? (
                  <motion.span
                    layoutId="arch-active"
                    className="absolute inset-0 rounded-xl border border-sky-400/50 bg-sky-500/[0.05]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                <div className="relative z-10">
                  <p className="font-mono text-xs text-zinc-500">{node.code}</p>
                  <p className="mt-1 text-sm font-medium text-zinc-100">
                    {node.title}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">
                    {node.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-6 rounded-xl border border-white/[0.06] bg-zinc-900/70 p-6">
              <p className="font-mono text-xs text-sky-400">
                {active.code} · {active.title}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                {active.detail}
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function VylosShowcase() {
  const [mode, setMode] = useState<"overview" | "architecture">("overview");
  const [active, setActive] = useState<ArchitectureNode | null>(null);
  const project = cv.project;
  const role = cv.experience[0];

  useEffect(() => {
    const openArchitecture = () => {
      setMode("architecture");
      setActive(null);
    };
    window.addEventListener("open-vylos-xray", openArchitecture);
    return () =>
      window.removeEventListener("open-vylos-xray", openArchitecture);
  }, []);

  return (
    <section id="work" className="scroll-mt-24 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
        >
          <SectionHeader
            className="mb-0"
            eyebrow="Featured Work"
            title={project.name}
            subtitle={`South African Fintech Platform · Beta (${project.period})`}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          <SpotlightCard borderBeam className="p-0">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] bg-white/[0.015] px-6 py-4 sm:px-8">
              <div className="flex min-w-0 flex-wrap items-center gap-2.5">
                <p className="text-sm font-medium text-zinc-200">
                  {role.role}
                </p>
                <span className="rounded-full border border-white/[0.08] bg-zinc-900/80 px-2.5 py-0.5 font-mono text-[11px] text-zinc-400">
                  Beta · {project.period}
                </span>
              </div>

              <div
                role="tablist"
                aria-label="View mode"
                className="relative flex shrink-0 rounded-lg border border-white/[0.08] bg-zinc-950/60 p-1"
              >
                {viewTabs.map((tab) => {
                  const Icon = tab.icon;
                  const selected = mode === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => {
                        setMode(tab.id);
                        setActive(null);
                      }}
                      className={`relative inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors duration-200 ${
                        selected
                          ? "text-zinc-50"
                          : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      {selected ? (
                        <motion.span
                          layoutId="vylosViewTab"
                          className="absolute inset-0 rounded-md border border-white/10 bg-zinc-800 shadow-sm"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      ) : null}
                      <Icon className="relative z-10 h-3.5 w-3.5" />
                      <span className="relative z-10">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {mode === "overview" ? (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="grid gap-10 lg:grid-cols-2"
                  >
                    <div>
                      <p className="text-sm text-sky-400">{role.company}</p>
                      <p className="mt-3 text-base leading-relaxed text-zinc-400">
                        {project.description}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {overviewTech.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md border border-white/[0.08] bg-zinc-900 px-2.5 py-1 font-mono text-xs text-zinc-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <ul className="space-y-4">
                      {project.userView.points.map((point) => (
                        <li key={point} className="flex gap-3">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-500/10 text-sky-400">
                            <Check className="h-3 w-3" />
                          </span>
                          <p className="text-sm leading-relaxed text-zinc-400">
                            {point}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ) : (
                  <motion.div
                    key="architecture"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ArchitectureFlow
                      nodes={project.architecture}
                      active={active}
                      onSelect={setActive}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
}
