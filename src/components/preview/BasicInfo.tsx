import type { ResumeData, ResumeStyle } from "../../types";

interface BasicInfoProps {
  basicInfo: ResumeData["basicInfo"];
  isVisible: boolean;
  styleId: ResumeStyle;
}

export function BasicInfo({ basicInfo, isVisible, styleId }: BasicInfoProps) {
  if (!isVisible) return null;

  const wrapperClassName =
    styleId === "minimal"
      ? "mb-5 border-b border-slate-200 pb-4 text-left"
      : styleId === "editorial"
        ? "mb-5 pb-4 text-left"
        : "mb-4 pb-3 text-center";
  const wrapperStyle =
    styleId === "editorial"
      ? ({
          borderBottom: "1px solid color-mix(in srgb, var(--color-primary) 18%, white)",
        } as React.CSSProperties)
      : undefined;
  const titleClassName =
    styleId === "editorial"
      ? "mb-3 text-[28px] font-bold tracking-[0.12em] text-primary"
      : styleId === "minimal"
        ? "mb-2 text-[24px] font-bold tracking-[0.18em] text-slate-900"
        : "mb-2 text-[22px] font-bold tracking-[0.18em] text-primary";
  const educationClassName =
    styleId === "minimal"
      ? "mb-3 flex flex-col gap-1.5 text-[15px] text-slate-700"
      : styleId === "editorial"
        ? "mb-4 flex flex-col gap-2 text-[15px] text-slate-700"
        : "mb-3 flex flex-col items-center justify-center gap-1.5 text-[15px] text-slate-700";
  const contactClassName =
    styleId === "editorial"
      ? "flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-slate-600"
      : styleId === "minimal"
        ? "flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-slate-600"
        : "flex flex-wrap justify-center gap-x-5 gap-y-2 text-[13px] text-slate-600";

  return (
    <div className={wrapperClassName} style={wrapperStyle}>
      <h1 className={titleClassName}>
        {basicInfo.name}
      </h1>
      <div className={educationClassName}>
        {basicInfo.educations.map((edu) => (
          <span key={edu.id}>
            {edu.timePeriod} <span className="mx-1">/</span>{" "}
            <span className="font-bold text-primary">{edu.university}</span>{" "}
            <span className="mx-1">/</span>{" "}
            <span className="font-bold text-primary">{edu.major}</span>
          </span>
        ))}
      </div>
      <div className={contactClassName}>
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
