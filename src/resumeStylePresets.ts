import type { ResumeStyle, ThemeConfig } from "./types";

export interface ResumeStylePreset {
  id: ResumeStyle;
  label: string;
  description: string;
  theme: ThemeConfig;
}

export const resumeStylePresets: ResumeStylePreset[] = [
  {
    id: "modern",
    label: "现代",
    description: "轻盈蓝色",
    theme: {
      styleId: "modern",
      primaryColor: "#3b82f6",
      highlightColor: "#eff6ff",
      detailFontSize: "13px",
      detailColor: "#334155",
    },
  },
  {
    id: "minimal",
    label: "极简",
    description: "经典黑白",
    theme: {
      styleId: "minimal",
      primaryColor: "#111827",
      highlightColor: "#f8fafc",
      detailFontSize: "13px",
      detailColor: "#475569",
    },
  },
  {
    id: "editorial",
    label: "创意",
    description: "清新粉白",
    theme: {
      styleId: "editorial",
      primaryColor: "#ec4899",
      highlightColor: "#fdf2f8",
      detailFontSize: "14px",
      detailColor: "#4b5563",
    },
  },
];

export const getResumeStylePreset = (styleId: ResumeStyle) =>
  resumeStylePresets.find((preset) => preset.id === styleId) ??
  resumeStylePresets[0];
