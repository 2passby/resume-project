import type { ResumeData, ResumeStyle } from "../../types";
import { SectionTitle } from "./SectionTitle";

interface ProjectsProps {
  projects: ResumeData["projects"];
  title: string;
  isVisible: boolean;
  styleId: ResumeStyle;
}

export function Projects({
  projects,
  title,
  isVisible,
  styleId,
}: ProjectsProps) {
  if (!isVisible || projects.length === 0) return null;

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
  const tagClassName =
    styleId === "minimal"
      ? "rounded-full border border-slate-200 px-2 py-0.5 text-[12px] font-medium"
      : "rounded px-1.5 py-0.5 text-[12px] font-medium";
  const descriptionClassName =
    styleId === "editorial"
      ? "mb-2 px-1 text-[13px] font-medium leading-relaxed text-slate-700"
      : "mb-1.5 px-2 text-[13px] font-medium text-gray-800";
  const listClassName =
    styleId === "minimal" ? "space-y-1.5 pl-0" : "space-y-1 pl-0 px-2";

  return (
    <div className="mb-6">
      <SectionTitle title={title} subtitle="PROJECTS" styleId={styleId} />
      <div className="space-y-5">
        {projects.map((proj) => (
          <div key={proj.id}>
            <div
              className={headerClassName}
              style={headerStyle}
              data-page-block="item"
            >
              <span
                className="text-[15px] font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                {proj.name}
              </span>
              <div className="flex gap-2">
                {proj.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className={tagClassName}
                    style={{
                      color: "var(--color-primary)",
                      backgroundColor: "white",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className={descriptionClassName} data-page-block="item">
              {proj.description}
            </div>
            <ul
              className={listClassName}
              style={{
                fontSize: "var(--detail-font-size)",
                color: "var(--detail-color)",
              }}
            >
              {proj.details.map((detail, idx) => (
                <li
                  key={idx}
                  className="flex items-start"
                  data-page-block="item"
                >
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
          </div>
        ))}
      </div>
    </div>
  );
}
