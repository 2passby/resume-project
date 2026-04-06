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
    label: "现代卡片",
    description: "清爽蓝系，层次更轻盈",
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
    label: "极简专业",
    description: "黑白灰为主，适合正式投递",
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
    label: "编辑感",
    description: "白粉蓝混合，更有设计感",
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
