import type { ResumeData } from "../../types";
import { SectionTitle } from "./SectionTitle";

interface ProjectsProps {
  projects: ResumeData["projects"];
  title: string;
  isVisible: boolean;
}

export function Projects({ projects, title, isVisible }: ProjectsProps) {
  if (!isVisible || projects.length === 0) return null;

  return (
    <div className="mb-6">
      <SectionTitle title={title} subtitle="PROJECTS" />
      <div className="space-y-5">
        {projects.map((proj) => (
          <div key={proj.id} className="break-inside-avoid">
            <div
              className="flex justify-between items-baseline mb-1.5 px-2 py-1 rounded-sm"
              style={{ backgroundColor: "var(--color-highlight)" }}
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
                    className="px-1.5 py-0.5 rounded text-[12px] font-medium"
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
            <div className="text-[13px] font-medium text-gray-800 mb-1.5 px-2">
              {proj.description}
            </div>
            <ul
              className="list-none pl-0 space-y-1 leading-relaxed px-2"
              style={{
                fontSize: "var(--detail-font-size)",
                color: "var(--detail-color)",
              }}
            >
              {proj.details.map((detail, idx) => (
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
          </div>
        ))}
      </div>
    </div>
  );
}