"use client";

import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import { cv } from "@/data/cv";
import LinkedInIcon from "./icons/LinkedInIcon";

export default function Footer() {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/[0.06] py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-[family-name:var(--font-space-grotesk)] text-sm font-medium text-zinc-50">
            {cv.name}
          </p>
          <p className="group mt-2 inline-flex items-center gap-2 text-sm text-zinc-500">
            <MapPin className="h-4 w-4 shrink-0 text-zinc-400" />
            {cv.location}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2.5 text-sm">
            <a
              href={cv.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-zinc-400 transition-colors duration-200 hover:text-sky-400"
            >
              <LinkedInIcon className="h-4 w-4 shrink-0 text-zinc-400 transition-colors duration-200 group-hover:text-sky-400" />
              LinkedIn
            </a>
            <a
              href={`mailto:${cv.email}`}
              className="group inline-flex items-center gap-2 text-zinc-400 transition-colors duration-200 hover:text-sky-400"
            >
              <Mail className="h-4 w-4 shrink-0 text-zinc-400 transition-colors duration-200 group-hover:text-sky-400" />
              {cv.email}
            </a>
            <a
              href="tel:+27833324673"
              className="group inline-flex items-center gap-2 text-zinc-400 transition-colors duration-200 hover:text-sky-400"
            >
              <Phone className="h-4 w-4 shrink-0 text-zinc-400 transition-colors duration-200 group-hover:text-sky-400" />
              {cv.phone}
            </a>
          </div>
        </div>

        <button
          type="button"
          onClick={scrollTop}
          className="inline-flex items-center gap-2 self-start rounded-lg border border-white/[0.08] bg-zinc-900 px-3.5 py-2 text-sm text-zinc-400 transition-colors duration-200 hover:border-white/[0.16] hover:bg-[#18181B] hover:text-zinc-200 sm:self-auto"
        >
          <ArrowUp className="h-4 w-4" />
          Back to top
        </button>
      </div>
    </footer>
  );
}
