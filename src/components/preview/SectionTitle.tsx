import type { ResumeStyle } from "../../types";

export function SectionTitle({
  title,
  subtitle,
  styleId,
}: {
  title: string;
  subtitle: string;
  styleId: ResumeStyle;
}) {
  const wrapperClassName =
    styleId === "minimal"
      ? "mb-2 flex items-baseline"
      : styleId === "editorial"
      ? "mb-4 flex items-center gap-3 border-b border-primary/15 pb-2"
      : "mb-3 flex items-baseline border-b border-primary/25 pb-2";
  const titleClassName =
    styleId === "minimal"
      ? "mr-2 text-[17px] font-semibold tracking-[0.2em] text-slate-900"
      : styleId === "editorial"
      ? "mr-2 text-[18px] font-bold tracking-[0.28em] text-primary"
      : "mr-2 text-[18px] font-bold tracking-wide text-primary";
  const subtitleClassName =
    styleId === "editorial"
      ? "rounded-full bg-primary/8 px-2 py-1 text-[11px] uppercase tracking-[0.24em] text-primary"
      : "text-[12px] uppercase tracking-wider text-slate-400";

  return (
    <div className={wrapperClassName}>
      <h2 className={titleClassName}>{title}</h2>
      <span className={subtitleClassName}>{subtitle}</span>
    </div>
  );
}
