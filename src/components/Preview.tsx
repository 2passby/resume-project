import { forwardRef } from "react";
import type { ResumeData } from "../types";
import { BasicInfo } from "./preview/BasicInfo";
import { Skills } from "./preview/Skills";
import { Experiences } from "./preview/Experiences";
import { Projects } from "./preview/Projects";
import { Honors } from "./preview/Honors";
import { getResumeStylePreset } from "../resumeStylePresets";

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
  const preset = getResumeStylePreset(theme?.styleId || "modern");
  const styleId = theme?.styleId || preset.id;
  const primaryColor = theme?.primaryColor || preset.theme.primaryColor;
  const highlightColor = theme?.highlightColor || preset.theme.highlightColor;
  const detailFontSize = theme?.detailFontSize || preset.theme.detailFontSize;
  const detailColor = theme?.detailColor || preset.theme.detailColor;
  const previewClassName =
    styleId === "minimal"
      ? "bg-white px-14 py-12 min-h-[1131px] w-[800px] font-sans text-slate-900"
      : styleId === "editorial"
      ? "bg-[#fffdfd] px-12 py-12 min-h-[1131px] w-[800px] font-sans text-slate-800"
      : "bg-white p-12 min-h-[1131px] w-[800px] font-sans text-gray-800";

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
            styleId={styleId}
          />
        );
      case "experiences":
        return (
          <Experiences
            key="experiences"
            experiences={experiences}
            title={sectionTitles?.experiences || "实习经历"}
            isVisible={isVisible("experiences")}
            styleId={styleId}
          />
        );
      case "projects":
        return (
          <Projects
            key="projects"
            projects={projects}
            title={sectionTitles?.projects || "项目经历"}
            isVisible={isVisible("projects")}
            styleId={styleId}
          />
        );
      case "honors":
        return (
          <Honors
            key="honors"
            honors={honors}
            title={sectionTitles?.honors || "荣誉奖项"}
            isVisible={isVisible("honors")}
            styleId={styleId}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={ref}
      className={previewClassName}
      style={
        {
          "--color-primary": primaryColor,
          "--color-highlight": highlightColor,
          "--detail-font-size": detailFontSize,
          "--detail-color": detailColor,
        } as React.CSSProperties
      }
    >
      <BasicInfo
        basicInfo={basicInfo}
        isVisible={isVisible("basicInfo")}
        styleId={styleId}
      />

      {sectionOrder.map((id) => renderSection(id))}
    </div>
  );
});

Preview.displayName = "Preview";

export default Preview;
