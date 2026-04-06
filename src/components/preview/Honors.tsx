import type { ResumeData, ResumeStyle } from "../../types";
import { SectionTitle } from "./SectionTitle";

interface HonorsProps {
  honors: ResumeData["honors"];
  title: string;
  isVisible: boolean;
  styleId: ResumeStyle;
}

export function Honors({ honors, title, isVisible, styleId }: HonorsProps) {
  if (!isVisible || honors.length === 0) return null;

  const listClassName =
    styleId === "minimal"
      ? "mt-1.5 space-y-1.5 px-2"
      : styleId === "editorial"
      ? "mt-4 space-y-2.5"
      : "mt-3 space-y-1.5 px-2";
  const rowClassName =
    styleId === "minimal"
      ? "flex items-center break-inside-avoid py-1.5 text-[13px] text-slate-800"
      : styleId === "editorial"
      ? "flex items-center break-inside-avoid rounded-2xl bg-primary/5 px-3 py-2 text-[13px] text-slate-800"
      : "flex items-center break-inside-avoid text-[13px] text-gray-800";

  return (
    <div className="mb-6">
      <SectionTitle
        title={title}
        subtitle="HONORS & AWARDS"
        styleId={styleId}
      />
      <div className={listClassName}>
        {honors.map((honor) => (
          <div
            key={honor.id}
            data-page-block="avoid"
            className={rowClassName}
            style={{ breakInside: "avoid-page", pageBreakInside: "avoid" }}
          >
            <span
              className="mr-2 text-[8px]"
              style={{ color: "var(--color-primary)" }}
            >
              ●
            </span>
            <span className="w-24 text-gray-500 font-medium">{honor.date}</span>
            <span className="font-bold flex-1">{honor.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
