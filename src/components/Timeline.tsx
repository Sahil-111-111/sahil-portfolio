"use client";

import { motion } from "framer-motion";
import { cv } from "@/data/cv";
import SpotlightCard from "./SpotlightCard";
import SectionHeader from "./ui/SectionHeader";

export default function Timeline() {
  return (
    <section id="experience" className="scroll-mt-24 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
        >
          <SectionHeader
            eyebrow="Background"
            title="Experience & education"
            subtitle="Commercial execution alongside formal data science training."
          />
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <motion.h3
              className="mb-4 text-sm font-medium text-zinc-300"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
            >
              Experience
            </motion.h3>
            <div className="flex flex-col gap-4">
              {cv.experience.map((job, i) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                >
                  <SpotlightCard>
                    <div className="p-6">
                      <p className="font-mono text-xs text-zinc-500">
                        {job.period}
                      </p>
                      <h4 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-base font-semibold tracking-tight text-zinc-50">
                        {job.role}
                      </h4>
                      <p className="mt-0.5 text-sm text-sky-400">{job.company}</p>
                      <ul className="mt-4 space-y-2">
                        {job.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="text-sm leading-relaxed text-zinc-400"
                          >
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <motion.h3
              className="mb-4 text-sm font-medium text-zinc-300"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
            >
              Education
            </motion.h3>
            <div className="flex flex-col gap-4">
              {cv.education.map((edu, i) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                >
                  <SpotlightCard>
                    <div className="p-6">
                      <p className="font-mono text-xs text-zinc-500">
                        {edu.period}
                      </p>
                      <h4 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-base font-semibold tracking-tight text-zinc-50">
                        {edu.degree}
                      </h4>
                      <p className="mt-0.5 text-sm text-sky-400">
                        {edu.institution}
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">{edu.status}</p>
                      <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                        {edu.details}
                      </p>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
