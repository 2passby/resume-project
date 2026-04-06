import { forwardRef } from "react";
import type { ResumeData } from "../types";

interface PreviewProps {
  data: ResumeData;
}

const Preview = forwardRef<HTMLDivElement, PreviewProps>(({ data }, ref) => {
  const {
    basicInfo,
    skills,
    experiences,
    projects,
    honors,
    theme,
    visible,
    sectionOrder,
    sectionTitles,
  } = data;
  const primaryColor = theme?.primaryColor || "#0ea5e9";
  const highlightColor = theme?.highlightColor || "#f0f9ff";

  // Helper function to check if a section should be rendered
  const isVisible = (section: keyof typeof visible) => {
    return visible?.[section] !== false;
  };

  const renderSection = (id: string) => {
    switch (id) {
      case "skills":
        if (!isVisible("skills") || skills.length === 0) return null;
        return (
          <div key="skills" className="mb-6">
            <SectionTitle
              title={sectionTitles?.skills || "相关技能"}
              subtitle="TECH STACK"
            />
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
      case "experiences":
        if (!isVisible("experiences") || experiences.length === 0) return null;
        return (
          <div key="experiences" className="mb-6">
            <SectionTitle
              title={sectionTitles?.experiences || "实习经历"}
              subtitle="INTERNSHIP EXPERIENCE"
            />
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
                  <ul className="list-none pl-0 text-[13px] space-y-1 leading-relaxed text-gray-800 px-2">
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
                      <span className="font-bold mr-2 text-gray-800">
                        技术栈:
                      </span>
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
      case "projects":
        if (!isVisible("projects") || projects.length === 0) return null;
        return (
          <div key="projects" className="mb-6">
            <SectionTitle
              title={sectionTitles?.projects || "项目经历"}
              subtitle="PROJECTS"
            />
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
                  <ul className="list-none pl-0 text-[13px] space-y-1 leading-relaxed text-gray-800 px-2">
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
      case "honors":
        if (!isVisible("honors") || honors.length === 0) return null;
        return (
          <div key="honors" className="mb-6">
            <SectionTitle
              title={sectionTitles?.honors || "荣誉奖项"}
              subtitle="HONORS & AWARDS"
            />
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
                  <span className="w-24 text-gray-500 font-medium">
                    {honor.date}
                  </span>
                  <span className="font-bold flex-1">{honor.name}</span>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={ref}
      className="bg-white p-12 min-h-[1131px] w-[800px] font-sans text-gray-800"
      style={
        {
          "--color-primary": primaryColor,
          "--color-highlight": highlightColor,
        } as React.CSSProperties
      }
    >
      {/* Header */}
      {isVisible("basicInfo") && (
        <div className="text-center mb-8">
          <h1 className="text-[20px] font-bold text-primary tracking-widest mb-2">
            {basicInfo.name}
          </h1>
          <div className="text-[15px] text-gray-700 mb-3 flex flex-col justify-center items-center gap-1.5">
            {basicInfo.educations.map((edu) => (
              <span key={edu.id}>
                {edu.timePeriod} <span className="mx-1">/</span>{" "}
                <span className="font-bold text-primary">{edu.university}</span>{" "}
                <span className="mx-1">/</span>{" "}
                <span className="font-bold text-primary">{edu.major}</span>
              </span>
            ))}
          </div>
          <div className="text-[13px] text-gray-600 flex justify-center gap-4">
            <span className="flex items-center gap-1">
              📞 {basicInfo.phone}
            </span>
            <span className="flex items-center gap-1">
              ✉️ {basicInfo.email}
            </span>
            {basicInfo.website !== undefined && (
              <span className="flex items-center gap-1">
                🔗 {basicInfo.website}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Dynamic Sections */}
      {sectionOrder.map((id) => renderSection(id))}
    </div>
  );
});

Preview.displayName = "Preview";

function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-baseline border-b border-primary pb-1 mb-3">
      <h2 className="text-[18px] font-bold text-primary mr-2 tracking-wide leading-none">
        {title}
      </h2>
      <span className="text-[12px] text-gray-400 uppercase tracking-wider leading-none">
        {subtitle}
      </span>
    </div>
  );
}

export default Preview;
