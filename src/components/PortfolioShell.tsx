"use client";

import { useCallback, useEffect, useState } from "react";
import { ToastProvider } from "./Toast";
import Navbar from "./Navbar";
import Hero from "./Hero";
import VylosShowcase from "./VylosShowcase";
import Timeline from "./Timeline";
import SkillMatrix from "./SkillMatrix";
import AiTerminal from "./AiTerminal";
import Footer from "./Footer";
import CommandPalette from "./CommandPalette";

export default function PortfolioShell() {
  const [cmdOpen, setCmdOpen] = useState(false);
  const openCommand = useCallback(() => setCmdOpen(true), []);
  const closeCommand = useCallback(() => setCmdOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <ToastProvider>
      <div className="relative z-10 min-h-screen overflow-x-hidden text-zinc-50">
        <Navbar onOpenCommand={openCommand} />
        <main>
          <Hero />
          <VylosShowcase />
          <Timeline />
          <SkillMatrix />
          <AiTerminal />
        </main>
        <Footer />
        <CommandPalette open={cmdOpen} onClose={closeCommand} />
      </div>
    </ToastProvider>
  );
}
