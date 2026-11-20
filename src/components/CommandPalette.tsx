"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Copy,
  Download,
  GraduationCap,
  Network,
  Phone,
  Sparkles,
  Terminal,
} from "lucide-react";
import { cv } from "@/data/cv";
import { useToast } from "./Toast";

type Command = {
  id: string;
  label: string;
  hint: string;
  icon: typeof Network;
  run: () => void;
};

type CommandPaletteProps = {
  open: boolean;
  onClose: () => void;
};

export default function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const { showToast } = useToast();
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);

  const commands: Command[] = useMemo(
    () => [
      {
        id: "vylos",
        label: "Jump to Vylos Finance System Architecture",
        hint: "Featured work",
        icon: Network,
        run: () => {
          window.dispatchEvent(new Event("open-vylos-xray"));
          document
            .getElementById("work")
            ?.scrollIntoView({ behavior: "smooth" });
        },
      },
      {
        id: "terminal",
        label: "Jump to AI Twin",
        hint: "Ask a question",
        icon: Terminal,
        run: () => {
          document
            .getElementById("ask-ai")
            ?.scrollIntoView({ behavior: "smooth" });
        },
      },
      {
        id: "skills",
        label: "Jump to Skills",
        hint: "Capability matrix",
        icon: Sparkles,
        run: () => {
          document
            .getElementById("skills")
            ?.scrollIntoView({ behavior: "smooth" });
        },
      },
      {
        id: "timeline",
        label: "Jump to Experience & Education",
        hint: "Background",
        icon: GraduationCap,
        run: () => {
          document
            .getElementById("experience")
            ?.scrollIntoView({ behavior: "smooth" });
        },
      },
      {
        id: "cv",
        label: "Download Sahil_Dhabu_CV.pdf",
        hint: "CV",
        icon: Download,
        run: () => {
          const a = document.createElement("a");
          a.href = cv.cvPath;
          a.download = "Sahil_Dhabu_CV.pdf";
          a.click();
        },
      },
      {
        id: "email",
        label: `Copy Email (${cv.email})`,
        hint: "Clipboard",
        icon: Copy,
        run: async () => {
          await navigator.clipboard.writeText(cv.email);
          showToast(`Copied ${cv.email}`);
        },
      },
      {
        id: "phone",
        label: `Copy Phone (${cv.phone})`,
        hint: "Clipboard",
        icon: Phone,
        run: async () => {
          await navigator.clipboard.writeText(cv.phone);
          showToast(`Copied ${cv.phone}`);
        },
      },
    ],
    [showToast],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) || c.hint.toLowerCase().includes(q),
    );
  }, [commands, query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setIndex(0);
    }
  }, [open]);

  useEffect(() => {
    setIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setIndex((i) => Math.min(i + 1, Math.max(filtered.length - 1, 0)));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const cmd = filtered[index];
        if (cmd) {
          void cmd.run();
          onClose();
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, index, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center bg-black/60 px-4 pt-[15vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/[0.1] bg-[#111114] shadow-2xl shadow-black/50"
          >
            <div className="border-b border-white/[0.08] px-4 py-3">
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command…"
                className="w-full bg-transparent text-sm text-zinc-200 outline-none placeholder:text-zinc-600"
              />
            </div>
            <ul className="max-h-[50vh] overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <li className="px-4 py-8 text-center text-sm text-zinc-500">
                  No matching commands
                </li>
              ) : (
                filtered.map((cmd, i) => {
                  const Icon = cmd.icon;
                  const active = i === index;
                  return (
                    <li key={cmd.id}>
                      <button
                        type="button"
                        onMouseEnter={() => setIndex(i)}
                        onClick={() => {
                          void cmd.run();
                          onClose();
                        }}
                        className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors duration-150 ${
                          active
                            ? "bg-sky-500/10 text-sky-300"
                            : "text-zinc-300 hover:bg-white/[0.03]"
                        }`}
                      >
                        <Icon className="h-4 w-4 shrink-0 opacity-70" />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm">
                            {cmd.label}
                          </span>
                          <span className="text-xs text-zinc-500">
                            {cmd.hint}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
            <div className="border-t border-white/[0.08] px-4 py-2 text-xs text-zinc-600">
              ↑↓ navigate · Enter select · Esc close
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
