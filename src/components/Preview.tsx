import { forwardRef } from "react";
import type { ResumeData } from "../types";
import { BasicInfo } from "./preview/BasicInfo";
import { Skills } from "./preview/Skills";
import { Experiences } from "./preview/Experiences";
import { Projects } from "./preview/Projects";
import { Honors } from "./preview/Honors";

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
  const detailFontSize = theme?.detailFontSize || "13px";
  const detailColor = theme?.detailColor || "#1f2937";

  // Helper function to check if a section should be rendered
  const isVisible = (section: keyof typeof visible) => {
    return visible?.[section] !== false;
  };

  const renderSection = (id: string) => {
    switch (id) {
      case "skills":
        return (
          <Skills
            key="skills"
            skills={skills}
            title={sectionTitles?.skills || "相关技能"}
            isVisible={isVisible("skills")}
          />
        );
      case "experiences":
        return (
          <Experiences
            key="experiences"
            experiences={experiences}
            title={sectionTitles?.experiences || "实习经历"}
            isVisible={isVisible("experiences")}
          />
        );
      case "projects":
        return (
          <Projects
            key="projects"
            projects={projects}
            title={sectionTitles?.projects || "项目经历"}
            isVisible={isVisible("projects")}
          />
        );
      case "honors":
        return (
          <Honors
            key="honors"
            honors={honors}
            title={sectionTitles?.honors || "荣誉奖项"}
            isVisible={isVisible("honors")}
          />
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
          "--detail-font-size": detailFontSize,
          "--detail-color": detailColor,
        } as React.CSSProperties
      }
    >
      {/* Header */}
      <BasicInfo basicInfo={basicInfo} isVisible={isVisible("basicInfo")} />

      {/* Dynamic Sections */}
      {sectionOrder.map((id) => renderSection(id))}
    </div>
  );
});

Preview.displayName = "Preview";

export default Preview;
