import type { ResumeData } from "../../types";

interface BasicInfoProps {
  basicInfo: ResumeData["basicInfo"];
  isVisible: boolean;
}

export function BasicInfo({ basicInfo, isVisible }: BasicInfoProps) {
  if (!isVisible) return null;

  return (
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
  );
}