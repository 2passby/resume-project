import type { ResumeData, ResumeStyle } from "../../types";
import { SectionTitle } from "./SectionTitle";

interface SkillsProps {
  skills: ResumeData["skills"];
  title: string;
  isVisible: boolean;
  styleId: ResumeStyle;
}

export function Skills({ skills, title, isVisible, styleId }: SkillsProps) {
  if (!isVisible || skills.length === 0) return null;

  const listClassName =
    styleId === "minimal"
      ? "mt-1.5 space-y-2 pl-0 text-[13px] leading-relaxed text-slate-800"
      : styleId === "editorial"
        ? "mt-4 space-y-2.5 pl-0 text-[13px] leading-relaxed text-slate-800"
        : "mt-3 space-y-1.5 pl-0 px-2 text-[13px] leading-relaxed text-gray-800";

  return (
    <div className="mb-6">
      <SectionTitle title={title} subtitle="TECH STACK" styleId={styleId} />
      <ul className={listClassName}>
        {skills.map((skill) => (
          <li
            key={skill.id}
            data-page-block="avoid"
            className="flex items-start"
            style={{ breakInside: "avoid-page", pageBreakInside: "avoid" }}
          >
            <span
              className="mr-2 text-[8px] mt-[6px]"
              style={{ color: "var(--color-primary)" }}
            >
              ●
            </span>
            <span className="flex-1">{skill.content}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
