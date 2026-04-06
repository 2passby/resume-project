import type { ResumeData } from "../../types";
import { SectionTitle } from "./SectionTitle";

interface HonorsProps {
  honors: ResumeData["honors"];
  title: string;
  isVisible: boolean;
}

export function Honors({ honors, title, isVisible }: HonorsProps) {
  if (!isVisible || honors.length === 0) return null;

  return (
    <div className="mb-6">
      <SectionTitle title={title} subtitle="HONORS & AWARDS" />
      <div className="space-y-1.5 mt-3 px-2">
        {honors.map((honor) => (
          <div
            key={honor.id}
            className="flex items-center text-[13px] text-gray-800 break-inside-avoid"
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