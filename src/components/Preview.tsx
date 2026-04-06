import { forwardRef } from "react";
import type { ReactElement } from "react";
import type { ResumeData } from "../types";
import { BasicInfo } from "./preview/BasicInfo";
import { Skills } from "./preview/Skills";
import { Experiences } from "./preview/Experiences";
import { Projects } from "./preview/Projects";
import { Honors } from "./preview/Honors";
import { getResumeStylePreset } from "../resumeStylePresets";
import { A4_PAGE_WIDTH_PX, RESUME_FONT_FAMILY } from "../constants/layout";

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
      ? "relative bg-white px-14 pt-12 pb-14 text-slate-900"
      : styleId === "editorial"
      ? "relative bg-[#fffdfd] px-12 pt-12 pb-14 text-slate-800"
      : "relative bg-white px-12 pt-12 pb-14 text-gray-800";

  const isVisible = (section: keyof typeof visible) => {
    return visible?.[section] !== false;
  };

  const renderSection = (id: string) => {
    switch (id) {
      case "skills":
        if (!isVisible("skills") || skills.length === 0) {
          return null;
        }
        return (
          <Skills
            key="skills"
            skills={skills}
            title={sectionTitles?.skills || "相关技能"}
            isVisible
            styleId={styleId}
          />
        );
      case "experiences":
        if (!isVisible("experiences") || experiences.length === 0) {
          return null;
        }
        return (
          <Experiences
            key="experiences"
            experiences={experiences}
            title={sectionTitles?.experiences || "实习经历"}
            isVisible
            styleId={styleId}
          />
        );
      case "projects":
        if (!isVisible("projects") || projects.length === 0) {
          return null;
        }
        return (
          <Projects
            key="projects"
            projects={projects}
            title={sectionTitles?.projects || "项目经历"}
            isVisible
            styleId={styleId}
          />
        );
      case "honors":
        if (!isVisible("honors") || honors.length === 0) {
          return null;
        }
        return (
          <Honors
            key="honors"
            honors={honors}
            title={sectionTitles?.honors || "荣誉奖项"}
            isVisible
            styleId={styleId}
          />
        );
      default:
        return null;
    }
  };
  const sections = [
    ...(isVisible("basicInfo")
      ? [
          {
            id: "basicInfo",
            content: (
              <BasicInfo basicInfo={basicInfo} isVisible styleId={styleId} />
            ),
          },
        ]
      : []),
    ...sectionOrder.reduce<Array<{ id: string; content: ReactElement }>>(
      (items, id) => {
        const content = renderSection(id);
        if (content) {
          items.push({ id, content });
        }
        return items;
      },
      []
    ),
  ];

  return (
    <div
      ref={ref}
      data-resume-preview="true"
      className={previewClassName}
      style={
        {
          width: `${A4_PAGE_WIDTH_PX}px`,
          fontFamily: RESUME_FONT_FAMILY,
          "--color-primary": primaryColor,
          "--color-highlight": highlightColor,
          "--detail-font-size": detailFontSize,
          "--detail-color": detailColor,
        } as React.CSSProperties
      }
    >
      {sections.map((section, index) => (
        <div
          key={section.id}
          className={
            styleId === "minimal" && index < sections.length - 1
              ? "border-b border-slate-200"
              : undefined
          }
        >
          {section.content}
        </div>
      ))}
    </div>
  );
});

Preview.displayName = "Preview";

export default Preview;
