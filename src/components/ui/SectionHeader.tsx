"use client";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  className?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`mb-10 max-w-2xl ${className}`}>
      <p className="mb-3 text-xs font-medium uppercase tracking-wider text-sky-400">
        {eyebrow}
      </p>
      <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-base leading-relaxed text-zinc-400">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
