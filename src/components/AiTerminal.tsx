"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Send } from "lucide-react";
import { cv } from "@/data/cv";
import SpotlightCard from "./SpotlightCard";

type Line = {
  id: string;
  role: "system" | "user" | "assistant";
  text: string;
};

export default function AiTerminal() {
  const [lines, setLines] = useState<Line[]>([
    {
      id: "boot",
      role: "system",
      text: `Hi — I'm Sahil's AI twin. Ask about Vylos Finance, education, or how the technical and commercial tracks fit together.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines, busy]);

  const ask = async (question: string) => {
    const q = question.trim();
    if (!q || busy) return;

    setBusy(true);
    setInput("");
    setLines((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, role: "user", text: q },
    ]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q }),
      });
      const data = (await res.json()) as { reply?: string };
      setLines((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          text:
            data.reply?.trim() ||
            "I can share details on Vylos Finance, my Eduvos studies, or Shahina Enterprise sales experience — ask me anything about those.",
        },
      ]);
    } catch {
      setLines((prev) => [
        ...prev,
        {
          id: `e-${Date.now()}`,
          role: "assistant",
          text: "I can still help from my CV — ask about Vylos Finance (2026 – Present), Eduvos, or Shahina Enterprise sales.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void ask(input);
  };

  return (
    <section id="ask-ai" className="scroll-mt-24 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45 }}
          >
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-sky-400">
              Digital Twin
            </p>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
              Ask Sahil&apos;s AI Twin
            </h2>
            <p className="mt-3 max-w-md text-base leading-relaxed text-zinc-400">
              Have a question about my work at Vylos Finance, data science
              studies, or commercial background? Ask below for instant answers
              based on my experience.
            </p>

            <div className="mt-8 flex flex-col gap-2.5">
              {cv.terminalPrompts.map((prompt, i) => (
                <motion.button
                  key={prompt}
                  type="button"
                  disabled={busy}
                  onClick={() => void ask(prompt)}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: 0.08 * i, duration: 0.35 }}
                  className="group flex items-start justify-between gap-3 rounded-xl border border-white/[0.08] bg-[#111114]/80 px-4 py-3.5 text-left transition-colors duration-200 hover:border-white/[0.16] hover:bg-[#18181B] disabled:opacity-50"
                >
                  <span className="text-sm leading-snug text-zinc-300 group-hover:text-zinc-100">
                    {prompt}
                  </span>
                  <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600 transition-colors duration-200 group-hover:text-sky-400" />
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.1, duration: 0.45 }}
          >
            <SpotlightCard>
              <div className="overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] px-5 py-3.5">
                  <p className="text-sm font-medium text-zinc-200">
                    Conversation
                  </p>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-zinc-900/80 px-2.5 py-1 text-xs text-zinc-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                    AI Assistant
                  </span>
                </div>

                <div className="min-h-[120px] max-h-[380px] overflow-y-auto">
                  {lines.map((line) => (
                    <motion.div
                      key={line.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border-b border-white/[0.04] px-5 py-4"
                    >
                      {line.role === "system" ? (
                        <p className="text-sm leading-relaxed text-zinc-500">
                          {line.text}
                        </p>
                      ) : line.role === "user" ? (
                        <div>
                          <p className="mb-1 text-xs font-medium text-zinc-500">
                            You
                          </p>
                          <p className="text-sm leading-relaxed text-zinc-200">
                            {line.text}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="mb-1 text-xs font-medium text-sky-400">
                            AI Twin
                          </p>
                          <p className="font-mono text-[13px] leading-relaxed whitespace-pre-wrap text-zinc-300">
                            {line.text}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                  {busy ? (
                    <p className="px-5 py-4 text-sm text-zinc-500">
                      Thinking
                      <span className="terminal-cursor" />
                    </p>
                  ) : null}
                  <div ref={bottomRef} />
                </div>

                <div className="border-t border-white/[0.06] p-4">
                  <form onSubmit={onSubmit} className="flex gap-2">
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask a question…"
                      disabled={busy}
                      className="min-w-0 flex-1 rounded-lg border border-white/[0.08] bg-zinc-900 px-3.5 py-2.5 text-sm text-zinc-200 outline-none transition-colors duration-200 placeholder:text-zinc-600 focus:border-sky-400/40"
                    />
                    <button
                      type="submit"
                      disabled={busy || !input.trim()}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-50 px-4 py-2.5 text-sm font-medium text-zinc-950 transition-colors duration-200 hover:bg-zinc-200 disabled:opacity-40"
                    >
                      <Send className="h-3.5 w-3.5" />
                      Send
                    </button>
                  </form>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
