"use client";

import {
  useCallback,
  useRef,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  borderBeam?: boolean;
};

export default function SpotlightCard({
  children,
  className = "",
  borderBeam = false,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      style={
        {
          "--x": "50%",
          "--y": "50%",
        } as CSSProperties
      }
      className={`group relative rounded-2xl transition-all duration-300 hover:-translate-y-0.5 ${
        borderBeam ? "p-[1px]" : ""
      } ${className}`}
    >
      {borderBeam ? (
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
          aria-hidden
        >
          <div className="border-beam absolute left-1/2 top-1/2 h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2" />
        </div>
      ) : null}

      <div
        className={`relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111114]/95 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] ${
          borderBeam ? "bg-[#111114]" : ""
        }`}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(450px circle at var(--x) var(--y), rgba(56, 189, 248, 0.12), transparent 80%)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(280px circle at var(--x) var(--y), rgba(56, 189, 248, 0.35), transparent 55%)",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "1px",
          }}
          aria-hidden
        />
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}
