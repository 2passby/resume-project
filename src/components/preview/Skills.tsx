import type { ResumeData } from "../../types";
import { SectionTitle } from "./SectionTitle";

interface SkillsProps {
  skills: ResumeData["skills"];
  title: string;
  isVisible: boolean;
}

export function Skills({ skills, title, isVisible }: SkillsProps) {
  if (!isVisible || skills.length === 0) return null;

  return (
    <div className="mb-6">
      <SectionTitle title={title} subtitle="TECH STACK" />
      <ul className="list-none pl-0 text-[13px] space-y-1.5 leading-relaxed text-gray-800 px-2 mt-3">
        {skills.map((skill) => (
          <li key={skill.id} className="flex items-start">
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