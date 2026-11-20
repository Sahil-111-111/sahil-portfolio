"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Copy, Search } from "lucide-react";
import { cv } from "@/data/cv";
import LinkedInIcon from "./icons/LinkedInIcon";
import { useToast } from "./Toast";

type NavbarProps = {
  onOpenCommand: () => void;
};

const links = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#ask-ai", label: "Ask AI" },
];

export default function Navbar({ onOpenCommand }: NavbarProps) {
  const { showToast } = useToast();
  const [isMac, setIsMac] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform));
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(cv.email);
      showToast(`Copied ${cv.email}`);
    } catch {
      showToast("Couldn’t copy email — try again");
    }
  };

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-white/[0.06] bg-[#09090B]/80 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-4 px-6">
        <div className="flex min-w-0 items-center gap-3">
          <a
            href="#"
            className="shrink-0 font-[family-name:var(--font-space-grotesk)] text-sm font-medium text-zinc-50"
          >
            {cv.name}
          </a>
          <span className="hidden items-center gap-1.5 rounded-full border border-white/[0.08] bg-zinc-900/80 px-2.5 py-1 text-xs text-zinc-400 sm:inline-flex">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {cv.status}
          </span>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-400 transition-colors duration-200 hover:text-zinc-50"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={onOpenCommand}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-zinc-900 px-2.5 py-1.5 text-xs text-zinc-400 transition-colors duration-200 hover:border-white/[0.16] hover:bg-[#18181B] hover:text-zinc-200"
            aria-label="Open command palette"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden font-mono sm:inline">
              {isMac ? "⌘K" : "Ctrl+K"}
            </span>
          </button>
          <a
            href={cv.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-white/[0.08] bg-zinc-900 p-2 text-zinc-400 transition-colors duration-200 hover:border-white/[0.16] hover:bg-[#18181B] hover:text-zinc-200"
            aria-label="LinkedIn"
          >
            <LinkedInIcon className="h-3.5 w-3.5" />
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-zinc-900 px-2.5 py-1.5 text-xs text-zinc-400 transition-colors duration-200 hover:border-white/[0.16] hover:bg-[#18181B] hover:text-zinc-200"
            aria-label="Copy email"
          >
            <Copy className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Copy Email</span>
          </button>
        </div>
      </div>

      <motion.div
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400"
        style={{ scaleX }}
      />
    </header>
  );
}
