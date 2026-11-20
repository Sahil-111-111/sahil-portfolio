"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { cv, type SkillCategory } from "@/data/cv";
import SpotlightCard from "./SpotlightCard";
import SectionHeader from "./ui/SectionHeader";

const categoryRelated: Record<SkillCategory, SkillCategory[]> = {
  "AI & Systems": ["Data & Engineering", "Business & Commercial"],
  "Data & Engineering": ["AI & Systems", "Core Strengths"],
  "Business & Commercial": ["Core Strengths", "AI & Systems"],
  "Core Strengths": ["Business & Commercial", "Data & Engineering"],
};

export default function SkillMatrix() {
  const categories = Object.keys(cv.skills) as SkillCategory[];
  const [active, setActive] = useState<string>(cv.skills["AI & Systems"][0]);
  const [activeCategory, setActiveCategory] =
    useState<SkillCategory>("AI & Systems");

  const relatedCategories = useMemo(() => {
    return new Set([activeCategory, ...categoryRelated[activeCategory]]);
  }, [activeCategory]);

  const evidence =
    cv.skillEvidence[active] ??
    "Select a skill to see where it was applied in production or coursework.";

  return (
    <section id="skills" className="scroll-mt-24 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
        >
          <SectionHeader
            eyebrow="Capabilities"
            title="Skills"
            subtitle="Interactive matrix mapped to real work at Vylos Finance, Eduvos, and Shahina Enterprise."
          />
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-7">
            {categories.map((category, ci) => {
              const dimmed = !relatedCategories.has(category);
              return (
                <motion.div
                  key={category}
                  className={`transition-opacity duration-200 ${dimmed ? "opacity-40" : "opacity-100"}`}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: ci * 0.08, duration: 0.4 }}
                >
                  <p className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
                    {category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cv.skills[category].map((skill) => {
                      const isActive = active === skill;
                      return (
                        <motion.button
                          key={skill}
                          type="button"
                          whileTap={{ scale: 0.98 }}
                          onMouseEnter={() => {
                            setActive(skill);
                            setActiveCategory(category);
                          }}
                          onFocus={() => {
                            setActive(skill);
                            setActiveCategory(category);
                          }}
                          onClick={() => {
                            setActive(skill);
                            setActiveCategory(category);
                          }}
                          className={`rounded-lg border px-3 py-1.5 font-mono text-xs transition-colors duration-200 ${
                            isActive
                              ? "border-sky-400/50 bg-sky-500/10 text-sky-300"
                              : "border-white/[0.08] bg-zinc-900 text-zinc-400 hover:border-white/[0.16] hover:bg-[#18181B] hover:text-zinc-200"
                          }`}
                        >
                          {skill}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.12, duration: 0.45 }}
          >
            <div className="lg:sticky lg:top-24">
              <SpotlightCard>
                <div className="p-6">
                  <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                    Applied evidence
                  </p>
                  <h3 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-xl font-semibold tracking-tight text-zinc-50">
                    {active}
                  </h3>
                  <span className="mt-3 inline-block rounded-full border border-white/[0.08] bg-zinc-900 px-2.5 py-1 text-xs text-zinc-400">
                    {activeCategory}
                  </span>
                  <p className="mt-5 text-sm leading-relaxed text-zinc-400">
                    {evidence}
                  </p>
                </div>
              </SpotlightCard>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
