"use client";

import { type ReactNode } from "react";

type SurfaceCardProps = {
  children: ReactNode;
  className?: string;
};

export default function SurfaceCard({
  children,
  className = "",
}: SurfaceCardProps) {
  return (
    <div
      className={`rounded-2xl border border-white/[0.08] bg-[#111114] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition-[border-color,background-color] duration-200 ${className}`}
    >
      {children}
    </div>
  );
}
