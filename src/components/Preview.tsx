import { forwardRef } from "react";
import type { ResumeData } from "../types";

interface PreviewProps {
  data: ResumeData;
}

const Preview = forwardRef<HTMLDivElement, PreviewProps>(({ data }, ref) => {
  const { basicInfo, skills, experiences, projects, honors } = data;

  return (
    <div
      ref={ref}
      className="bg-white p-12 min-h-[1131px] w-[800px] font-sans text-gray-800"
    >
      {/* Header */}
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
          <span className="flex items-center gap-1">📞 {basicInfo.phone}</span>
          <span className="flex items-center gap-1">✉️ {basicInfo.email}</span>
          {basicInfo.website !== undefined && (
            <span className="flex items-center gap-1">
              🔗 {basicInfo.website}
            </span>
          )}
        </div>
      </div>

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <SectionTitle title="相关技能" subtitle="TECH STACK" />
          <ul className="list-disc list-inside pl-1 text-[13px] space-y-1.5 leading-relaxed text-gray-800">
            {skills.map((skill) => (
              <li key={skill.id} className="marker:text-primary">
                {skill.content}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <div className="mb-6">
          <SectionTitle title="实习经历" subtitle="INTERNSHIP EXPERIENCE" />
          <div className="space-y-5">
            {experiences.map((exp) => (
              <div key={exp.id} className="break-inside-avoid">
                <div className="flex justify-between items-baseline mb-1.5">
                  <span className="text-[13px] text-gray-500 font-medium">
                    {exp.timePeriod}
                  </span>
                  <span className="text-[15px] font-bold text-primary flex-1 text-center">
                    {exp.company}
                  </span>
                  <span className="text-[13px] font-bold text-gray-800">
                    {exp.role}
                  </span>
                </div>
                <div className="text-[13px] font-medium text-gray-800 mb-1.5">
                  {exp.description}
                </div>
                <ul className="list-none pl-0 text-[13px] space-y-1 leading-relaxed text-gray-800">
                  {exp.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-primary mr-1.5 text-[10px] mt-[5px]">
                        ●
                      </span>
                      <span className="flex-1">{detail}</span>
                    </li>
                  ))}
                </ul>
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="mt-2 text-[13px] flex items-center">
                    <span className="font-bold mr-2 text-gray-800">
                      技术栈:
                    </span>
                    <div className="flex gap-2 flex-wrap">
                      {exp.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-primary bg-blue-50 px-1.5 py-0.5 rounded text-[12px]"
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
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-6">
          <SectionTitle title="项目经历" subtitle="PROJECTS" />
          <div className="space-y-5">
            {projects.map((proj) => (
              <div key={proj.id} className="break-inside-avoid">
                <div className="flex justify-between items-baseline mb-1.5">
                  <span className="text-[15px] font-bold text-gray-800">
                    {proj.name}
                  </span>
                  <div className="flex gap-2">
                    {proj.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-primary text-[12px] bg-blue-50 px-1.5 py-0.5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-[13px] font-medium text-gray-800 mb-1.5">
                  {proj.description}
                </div>
                <ul className="list-none pl-0 text-[13px] space-y-1 leading-relaxed text-gray-800">
                  {proj.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-primary mr-1.5 text-[10px] mt-[5px]">
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
      )}
      {/* Honors */}
      {honors.length > 0 && (
        <div className="mb-6">
          <SectionTitle title="荣誉奖项" subtitle="HONORS & AWARDS" />
          <div className="space-y-1.5 mt-3">
            {honors.map((honor) => (
              <div
                key={honor.id}
                className="flex items-center text-[13px] text-gray-800 break-inside-avoid"
              >
                <span className="text-primary mr-1.5 text-[10px]">●</span>
                <span className="w-24 text-gray-500 font-medium">
                  {honor.date}
                </span>
                <span className="font-bold flex-1">{honor.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
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
