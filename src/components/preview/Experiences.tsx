import type { ResumeData, ResumeStyle } from "../../types";
import { SectionTitle } from "./SectionTitle";

interface ExperiencesProps {
  experiences: ResumeData["experiences"];
  title: string;
  isVisible: boolean;
  styleId: ResumeStyle;
}

export function Experiences({
  experiences,
  title,
  isVisible,
  styleId,
}: ExperiencesProps) {
  if (!isVisible || experiences.length === 0) return null;

  const headerClassName =
    styleId === "minimal"
      ? "mb-2 flex items-baseline justify-between px-1 pb-2"
      : styleId === "editorial"
      ? "mb-2 flex items-baseline justify-between rounded-2xl px-3 py-2"
      : "mb-1.5 flex items-baseline justify-between rounded-sm px-2 py-1";
  const headerStyle =
    styleId === "modern" || styleId === "editorial"
      ? ({ backgroundColor: "var(--color-highlight)" } as React.CSSProperties)
      : undefined;
  const companyClassName =
    styleId === "minimal"
      ? "flex-1 text-center text-[15px] font-semibold text-slate-900"
      : "flex-1 text-center text-[15px] font-bold";
  const descriptionClassName =
    styleId === "editorial"
      ? "mb-2 px-1 text-[13px] font-medium leading-relaxed text-slate-700"
      : "mb-1.5 px-2 text-[13px] font-medium text-gray-800";
  const listClassName =
    styleId === "minimal" ? "space-y-1.5 pl-0" : "space-y-1 pl-0 px-2";
  const chipClassName =
    styleId === "minimal"
      ? "rounded-full border border-slate-200 px-2 py-0.5 text-[12px]"
      : "rounded px-1.5 py-0.5 text-[12px]";

  return (
    <div className="mb-6">
      <SectionTitle
        title={title}
        subtitle="INTERNSHIP EXPERIENCE"
        styleId={styleId}
      />
      <div className="space-y-5">
        {experiences.map((exp) => (
          <div key={exp.id} data-page-block="item">
            <div className={headerClassName} style={headerStyle}>
              <span className="text-[13px] text-gray-500 font-medium">
                {exp.timePeriod}
              </span>
              <span
                className={companyClassName}
                style={{ color: "var(--color-primary)" }}
              >
                {exp.company}
              </span>
              <span className="text-[13px] font-bold text-gray-800">
                {exp.role}
              </span>
            </div>
            <div className={descriptionClassName}>{exp.description}</div>
            <ul
              className={listClassName}
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
                      className={chipClassName}
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
