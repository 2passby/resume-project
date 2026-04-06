import type { ResumeData } from "../../types";
import { SectionTitle } from "./SectionTitle";

interface ExperiencesProps {
  experiences: ResumeData["experiences"];
  title: string;
  isVisible: boolean;
}

export function Experiences({
  experiences,
  title,
  isVisible,
}: ExperiencesProps) {
  if (!isVisible || experiences.length === 0) return null;

  return (
    <div className="mb-6">
      <SectionTitle title={title} subtitle="INTERNSHIP EXPERIENCE" />
      <div className="space-y-5">
        {experiences.map((exp) => (
          <div key={exp.id} className="break-inside-avoid">
            <div
              className="flex justify-between items-baseline mb-1.5 px-2 py-1 rounded-sm"
              style={{ backgroundColor: "var(--color-highlight)" }}
            >
              <span className="text-[13px] text-gray-500 font-medium">
                {exp.timePeriod}
              </span>
              <span
                className="text-[15px] font-bold flex-1 text-center"
                style={{ color: "var(--color-primary)" }}
              >
                {exp.company}
              </span>
              <span className="text-[13px] font-bold text-gray-800">
                {exp.role}
              </span>
            </div>
            <div className="text-[13px] font-medium text-gray-800 mb-1.5 px-2">
              {exp.description}
            </div>
            <ul
              className="list-none pl-0 space-y-1 leading-relaxed px-2"
              style={{
                fontSize: "var(--detail-font-size)",
                color: "var(--detail-color)",
              }}
            >
              {exp.details.map((detail, idx) => (
                <li key={idx} className="flex items-start">
                  <span
                    className="mr-2 text-[8px] mt-[6px]"
                    style={{ color: "var(--color-primary)" }}
                  >
                    ●
                  </span>
                  <span className="flex-1">{detail}</span>
                </li>
              ))}
            </ul>
            {exp.technologies && exp.technologies.length > 0 && (
              <div className="mt-2 text-[13px] flex items-center px-2">
                <span className="font-bold mr-2 text-gray-800">技术栈:</span>
                <div className="flex gap-2 flex-wrap">
                  {exp.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 py-0.5 rounded text-[12px]"
                      style={{
                        color: "var(--color-primary)",
                        backgroundColor: "var(--color-highlight)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}