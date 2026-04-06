import React, { useState } from "react";
import type { ResumeData } from "../types";
import { defaultResumeData } from "../types";
import {
  FileDown,
  Save,
  Trash2,
  LayoutTemplate,
  Info,
  Plus,
  X,
  Copy,
  Eye,
  EyeOff,
  GripVertical,
} from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { resumeStylePresets } from "../resumeStylePresets";

interface SidebarProps {
  data: ResumeData;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
  onExport: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ data, setData, onExport }) => {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    basicInfo: true,
    skills: false,
    experiences: false,
    projects: false,
    honors: false,
  });

  const sectionCardClassName =
    "overflow-hidden rounded-[28px] border border-white/80 bg-white/88 shadow-[0_20px_45px_rgba(15,23,42,0.08)] backdrop-blur-sm";
  const sectionHeaderClassName =
    "flex items-center justify-between border-b border-slate-100/90 px-5 py-4 text-slate-800";
  const sectionBodyClassName = "space-y-4 px-5 pb-5 pt-3";
  const fieldClassName =
    "w-full rounded-2xl border border-slate-200/90 bg-white/90 px-3 py-2.5 text-sm text-slate-700 shadow-[0_1px_2px_rgba(15,23,42,0.04)] outline-none transition focus:border-primary/70 focus:ring-4 focus:ring-primary/10";
  const compactFieldClassName =
    "w-full rounded-2xl border border-slate-200/90 bg-white/90 px-3 py-2 text-xs text-slate-700 shadow-[0_1px_2px_rgba(15,23,42,0.04)] outline-none transition focus:border-primary/70 focus:ring-4 focus:ring-primary/10";
  const textareaClassName = `${fieldClassName} min-h-[88px] resize-none`;
  const compactTextareaClassName = `${compactFieldClassName} min-h-[84px] resize-none`;
  const actionButtonClassName =
    "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition-all duration-200";
  const subtleButtonClassName =
    "inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900";
  const deleteButtonClassName =
    "rounded-2xl p-2 text-rose-500 transition-colors hover:bg-rose-50";
  const duplicateButtonClassName =
    "rounded-2xl p-2 text-primary transition-colors hover:bg-primary/10";
  const itemCardClassName =
    "relative space-y-4 rounded-[24px] border border-slate-200/80 bg-slate-50/85 p-4";

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleVisibility = (
    section: keyof typeof defaultResumeData.visible,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    setData((prev) => ({
      ...prev,
      visible: { ...prev.visible, [section]: !prev.visible[section] },
    }));
  };

  const handleReset = () => {
    if (window.confirm("确定要清空所有数据吗？")) {
      setData({
        basicInfo: {
          name: "",
          email: "",
          phone: "",
          website: "",
          educations: [],
        },
        skills: [],
        experiences: [],
        projects: [],
        honors: [],
        theme: defaultResumeData.theme,
        visible: defaultResumeData.visible,
        sectionTitles: defaultResumeData.sectionTitles,
        sectionOrder: defaultResumeData.sectionOrder,
      });
    }
  };

  const handleExample = () => {
    setData(defaultResumeData);
  };

  const handleBasicInfoChange = (field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      basicInfo: { ...prev.basicInfo, [field]: value },
    }));
  };

  const handleEducationChange = (
    index: number,
    field: string,
    value: string
  ) => {
    setData((prev) => {
      const newEdu = [...prev.basicInfo.educations];
      newEdu[index] = { ...newEdu[index], [field]: value };
      return { ...prev, basicInfo: { ...prev.basicInfo, educations: newEdu } };
    });
  };

  const addEducation = () => {
    setData((prev) => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        educations: [
          ...prev.basicInfo.educations,
          {
            id: Date.now().toString(),
            university: "",
            major: "",
            timePeriod: "",
          },
        ],
      },
    }));
  };

  const removeEducation = (index: number) => {
    setData((prev) => {
      const newEdu = [...prev.basicInfo.educations];
      newEdu.splice(index, 1);
      return { ...prev, basicInfo: { ...prev.basicInfo, educations: newEdu } };
    });
  };

  const handleSkillChange = (index: number, value: string) => {
    setData((prev) => {
      const newSkills = [...prev.skills];
      newSkills[index] = { ...newSkills[index], content: value };
      return { ...prev, skills: newSkills };
    });
  };

  const addSkill = () => {
    setData((prev) => ({
      ...prev,
      skills: [...prev.skills, { id: Date.now().toString(), content: "" }],
    }));
  };

  const removeSkill = (index: number) => {
    setData((prev) => {
      const newSkills = [...prev.skills];
      newSkills.splice(index, 1);
      return { ...prev, skills: newSkills };
    });
  };

  const handleExperienceChange = (
    index: number,
    field: string,
    value: string | string[]
  ) => {
    setData((prev) => {
      const newExp = [...prev.experiences];
      newExp[index] = { ...newExp[index], [field]: value };
      return { ...prev, experiences: newExp };
    });
  };

  const handleExperienceDetailChange = (
    expIndex: number,
    detailIndex: number,
    value: string
  ) => {
    setData((prev) => {
      const newExp = [...prev.experiences];
      const newDetails = [...newExp[expIndex].details];
      newDetails[detailIndex] = value;
      newExp[expIndex] = { ...newExp[expIndex], details: newDetails };
      return { ...prev, experiences: newExp };
    });
  };

  const addExperienceDetail = (expIndex: number) => {
    setData((prev) => {
      const newExp = [...prev.experiences];
      newExp[expIndex] = {
        ...newExp[expIndex],
        details: [...newExp[expIndex].details, ""],
      };
      return { ...prev, experiences: newExp };
    });
  };

  const removeExperienceDetail = (expIndex: number, detailIndex: number) => {
    setData((prev) => {
      const newExp = [...prev.experiences];
      const newDetails = [...newExp[expIndex].details];
      newDetails.splice(detailIndex, 1);
      newExp[expIndex] = { ...newExp[expIndex], details: newDetails };
      return { ...prev, experiences: newExp };
    });
  };

  const addExperience = () => {
    setData((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        {
          id: Date.now().toString(),
          timePeriod: "",
          company: "",
          role: "",
          description: "",
          details: [""],
          technologies: [],
        },
      ],
    }));
  };

  const removeExperience = (index: number) => {
    setData((prev) => {
      const newExp = [...prev.experiences];
      newExp.splice(index, 1);
      return { ...prev, experiences: newExp };
    });
  };

  const duplicateExperience = (index: number) => {
    setData((prev) => {
      const newExp = [...prev.experiences];
      const itemToCopy = newExp[index];
      const clonedItem = {
        ...itemToCopy,
        id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
        details: [...itemToCopy.details],
        technologies: [...itemToCopy.technologies],
      };
      newExp.splice(index + 1, 0, clonedItem);
      return { ...prev, experiences: newExp };
    });
  };

  const handleProjectChange = (
    index: number,
    field: string,
    value: string | string[]
  ) => {
    setData((prev) => {
      const newProj = [...prev.projects];
      newProj[index] = { ...newProj[index], [field]: value };
      return { ...prev, projects: newProj };
    });
  };

  const handleProjectDetailChange = (
    projIndex: number,
    detailIndex: number,
    value: string
  ) => {
    setData((prev) => {
      const newProj = [...prev.projects];
      const newDetails = [...newProj[projIndex].details];
      newDetails[detailIndex] = value;
      newProj[projIndex] = { ...newProj[projIndex], details: newDetails };
      return { ...prev, projects: newProj };
    });
  };

  const addProjectDetail = (projIndex: number) => {
    setData((prev) => {
      const newProj = [...prev.projects];
      newProj[projIndex] = {
        ...newProj[projIndex],
        details: [...newProj[projIndex].details, ""],
      };
      return { ...prev, projects: newProj };
    });
  };

  const removeProjectDetail = (projIndex: number, detailIndex: number) => {
    setData((prev) => {
      const newProj = [...prev.projects];
      const newDetails = [...newProj[projIndex].details];
      newDetails.splice(detailIndex, 1);
      newProj[projIndex] = { ...newProj[projIndex], details: newDetails };
      return { ...prev, projects: newProj };
    });
  };

  const addProject = () => {
    setData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: Date.now().toString(),
          name: "",
          description: "",
          details: [""],
          technologies: [],
        },
      ],
    }));
  };

  const removeProject = (index: number) => {
    setData((prev) => {
      const newProj = [...prev.projects];
      newProj.splice(index, 1);
      return { ...prev, projects: newProj };
    });
  };

  const duplicateProject = (index: number) => {
    setData((prev) => {
      const newProj = [...prev.projects];
      const itemToCopy = newProj[index];
      const clonedItem = {
        ...itemToCopy,
        id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
        details: [...itemToCopy.details],
        technologies: [...itemToCopy.technologies],
      };
      newProj.splice(index + 1, 0, clonedItem);
      return { ...prev, projects: newProj };
    });
  };

  const handleHonorChange = (index: number, field: string, value: string) => {
    setData((prev) => {
      const newHonors = [...prev.honors];
      newHonors[index] = { ...newHonors[index], [field]: value };
      return { ...prev, honors: newHonors };
    });
  };

  const handleThemeChange = (
    field: keyof typeof defaultResumeData.theme,
    value: string
  ) => {
    setData((prev) => ({
      ...prev,
      theme: { ...prev.theme, [field]: value },
    }));
  };

  const handleStylePresetChange = (
    presetId: (typeof resumeStylePresets)[number]["id"]
  ) => {
    const preset = resumeStylePresets.find((item) => item.id === presetId);
    if (!preset) return;

    setData((prev) => ({
      ...prev,
      theme: {
        ...prev.theme,
        ...preset.theme,
      },
    }));
  };

  const addHonor = () => {
    setData((prev) => ({
      ...prev,
      honors: [
        ...prev.honors,
        {
          id: Date.now().toString(),
          date: "",
          name: "",
        },
      ],
    }));
  };

  const removeHonor = (index: number) => {
    setData((prev) => {
      const newHonors = [...prev.honors];
      newHonors.splice(index, 1);
      return { ...prev, honors: newHonors };
    });
  };

  const handleTitleChange = (
    field: keyof typeof defaultResumeData.sectionTitles,
    value: string
  ) => {
    setData((prev) => ({
      ...prev,
      sectionTitles: { ...prev.sectionTitles, [field]: value },
    }));
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setData((prev) => {
        const oldIndex = prev.sectionOrder.indexOf(active.id as string);
        const newIndex = prev.sectionOrder.indexOf(over.id as string);
        return {
          ...prev,
          sectionOrder: arrayMove(prev.sectionOrder, oldIndex, newIndex),
        };
      });
    }
  };

  // Use local state for title input to prevent focus loss during typing
  const TitleInput = ({
    sectionKey,
    value,
    placeholder,
  }: {
    sectionKey: keyof typeof defaultResumeData.sectionTitles;
    value: string;
    placeholder: string;
  }) => {
    const [localValue, setLocalValue] = useState(value);

    // Sync with external value if it changes from outside
    React.useEffect(() => {
      setLocalValue(value);
    }, [value]);

    const handleBlur = () => {
      handleTitleChange(sectionKey, localValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.currentTarget.blur();
      }
    };

    return (
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
        className="w-36 rounded-xl border border-transparent bg-transparent px-2 py-1 text-lg font-bold text-slate-800 outline-none transition focus:border-primary/20 focus:bg-primary/5 focus:ring-4 focus:ring-primary/10"
        placeholder={placeholder}
      />
    );
  };

  const renderSection = (
    id: string,
    dragProps?: {
      attributes: Record<string, unknown>;
      listeners: Record<string, unknown>;
    }
  ) => {
    switch (id) {
      case "skills":
        return (
          <div key="skills" className={sectionCardClassName}>
            <div
              {...dragProps?.attributes}
              {...dragProps?.listeners}
              className={`${sectionHeaderClassName} cursor-grab active:cursor-grabbing transition-colors hover:bg-slate-50/80`}
              onClick={() => toggleSection("skills")}
            >
              <div className="flex items-center gap-2 flex-1">
                <GripVertical
                  size={18}
                  className="text-slate-300 outline-none"
                />
                <TitleInput
                  sectionKey="skills"
                  value={data.sectionTitles?.skills ?? "相关技能"}
                  placeholder="相关技能"
                />
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => toggleVisibility("skills", e)}
                  onPointerDown={(e) => e.stopPropagation()}
                  className={`rounded-2xl p-2 transition-colors ${
                    data.visible?.skills !== false
                      ? "text-primary hover:bg-primary/10"
                      : "text-slate-400 hover:bg-slate-100"
                  }`}
                  title={
                    data.visible?.skills !== false ? "点击隐藏" : "点击显示"
                  }
                >
                  {data.visible?.skills !== false ? (
                    <Eye size={18} />
                  ) : (
                    <EyeOff size={18} />
                  )}
                </button>
              </div>
            </div>
            {expandedSections.skills && (
              <div className={sectionBodyClassName}>
                {data.skills.map((skill, idx) => (
                  <div key={skill.id} className="flex items-start gap-2">
                    <textarea
                      value={skill.content}
                      onChange={(e) => handleSkillChange(idx, e.target.value)}
                      className={`flex-1 ${textareaClassName}`}
                      placeholder="请输入技能描述..."
                    />
                    <button
                      onClick={() => removeSkill(idx)}
                      className={deleteButtonClassName}
                      title="删除此项"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                <button onClick={addSkill} className={subtleButtonClassName}>
                  <Plus size={16} /> 添加技能
                </button>
              </div>
            )}
          </div>
        );
      case "experiences":
        return (
          <div key="experiences" className={sectionCardClassName}>
            <div
              {...dragProps?.attributes}
              {...dragProps?.listeners}
              className={`${sectionHeaderClassName} cursor-grab active:cursor-grabbing transition-colors hover:bg-slate-50/80`}
              onClick={() => toggleSection("experiences")}
            >
              <div className="flex items-center gap-2 flex-1">
                <GripVertical
                  size={18}
                  className="text-slate-300 outline-none"
                />
                <TitleInput
                  sectionKey="experiences"
                  value={data.sectionTitles?.experiences ?? "实习经历"}
                  placeholder="实习经历"
                />
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => toggleVisibility("experiences", e)}
                  onPointerDown={(e) => e.stopPropagation()}
                  className={`rounded-2xl p-2 transition-colors ${
                    data.visible?.experiences !== false
                      ? "text-primary hover:bg-primary/10"
                      : "text-slate-400 hover:bg-slate-100"
                  }`}
                  title={
                    data.visible?.experiences !== false
                      ? "点击隐藏"
                      : "点击显示"
                  }
                >
                  {data.visible?.experiences !== false ? (
                    <Eye size={18} />
                  ) : (
                    <EyeOff size={18} />
                  )}
                </button>
              </div>
            </div>
            {expandedSections.experiences && (
              <div className={sectionBodyClassName}>
                {data.experiences.map((exp, idx) => (
                  <div key={exp.id} className={itemCardClassName}>
                    <div className="absolute top-2 right-2 flex gap-1">
                      <button
                        onClick={() => duplicateExperience(idx)}
                        className={duplicateButtonClassName}
                        title="复制此经历"
                      >
                        <Copy size={16} />
                      </button>
                      <button
                        onClick={() => removeExperience(idx)}
                        className={deleteButtonClassName}
                        title="删除此经历"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          公司
                        </label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) =>
                            handleExperienceChange(
                              idx,
                              "company",
                              e.target.value
                            )
                          }
                          className={fieldClassName}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          职位
                        </label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) =>
                            handleExperienceChange(idx, "role", e.target.value)
                          }
                          className={fieldClassName}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          时间
                        </label>
                        <input
                          type="text"
                          value={exp.timePeriod}
                          onChange={(e) =>
                            handleExperienceChange(
                              idx,
                              "timePeriod",
                              e.target.value
                            )
                          }
                          className={fieldClassName}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          技术栈 (用逗号分隔)
                        </label>
                        <input
                          type="text"
                          value={exp.technologies?.join(", ")}
                          onChange={(e) =>
                            handleExperienceChange(
                              idx,
                              "technologies",
                              e.target.value
                                .split(",")
                                .map((t) => t.trim())
                                .filter(Boolean)
                            )
                          }
                          className={fieldClassName}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        简介
                      </label>
                      <textarea
                        value={exp.description}
                        onChange={(e) =>
                          handleExperienceChange(
                            idx,
                            "description",
                            e.target.value
                          )
                        }
                        className={textareaClassName}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        详细描述
                      </label>
                      <div className="space-y-2">
                        {exp.details.map((detail, detailIdx) => (
                          <div
                            key={detailIdx}
                            className="flex gap-2 items-start"
                          >
                            <span className="text-gray-400 mt-2 text-xs">
                              ●
                            </span>
                            <textarea
                              value={detail}
                              onChange={(e) =>
                                handleExperienceDetailChange(
                                  idx,
                                  detailIdx,
                                  e.target.value
                                )
                              }
                              className={`flex-1 ${compactTextareaClassName}`}
                            />
                            <button
                              onClick={() =>
                                removeExperienceDetail(idx, detailIdx)
                              }
                              className={`${deleteButtonClassName} mt-1`}
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => addExperienceDetail(idx)}
                        className={`${subtleButtonClassName} mt-1 px-0 py-0 text-xs`}
                      >
                        <Plus size={14} /> 添加描述项
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={addExperience}
                  className="flex w-full items-center justify-center gap-2 rounded-[24px] border border-dashed border-primary/25 bg-primary/5 py-3 text-sm font-semibold text-primary transition-colors hover:border-primary/45 hover:bg-primary/10"
                >
                  <Plus size={16} /> 添加实习经历
                </button>
              </div>
            )}
          </div>
        );
      case "projects":
        return (
          <div key="projects" className={sectionCardClassName}>
            <div
              {...dragProps?.attributes}
              {...dragProps?.listeners}
              className={`${sectionHeaderClassName} cursor-grab active:cursor-grabbing transition-colors hover:bg-slate-50/80`}
              onClick={() => toggleSection("projects")}
            >
              <div className="flex items-center gap-2 flex-1">
                <GripVertical
                  size={18}
                  className="text-slate-300 outline-none"
                />
                <TitleInput
                  sectionKey="projects"
                  value={data.sectionTitles?.projects ?? "项目经历"}
                  placeholder="项目经历"
                />
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => toggleVisibility("projects", e)}
                  onPointerDown={(e) => e.stopPropagation()}
                  className={`rounded-2xl p-2 transition-colors ${
                    data.visible?.projects !== false
                      ? "text-primary hover:bg-primary/10"
                      : "text-slate-400 hover:bg-slate-100"
                  }`}
                  title={
                    data.visible?.projects !== false ? "点击隐藏" : "点击显示"
                  }
                >
                  {data.visible?.projects !== false ? (
                    <Eye size={18} />
                  ) : (
                    <EyeOff size={18} />
                  )}
                </button>
              </div>
            </div>
            {expandedSections.projects && (
              <div className={sectionBodyClassName}>
                {data.projects.map((proj, idx) => (
                  <div key={proj.id} className={itemCardClassName}>
                    <div className="absolute top-2 right-2 flex gap-1">
                      <button
                        onClick={() => duplicateProject(idx)}
                        className={duplicateButtonClassName}
                        title="复制此项目"
                      >
                        <Copy size={16} />
                      </button>
                      <button
                        onClick={() => removeProject(idx)}
                        className={deleteButtonClassName}
                        title="删除此项目"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          项目名称
                        </label>
                        <input
                          type="text"
                          value={proj.name}
                          onChange={(e) =>
                            handleProjectChange(idx, "name", e.target.value)
                          }
                          className={fieldClassName}
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          技术栈 (用逗号分隔)
                        </label>
                        <input
                          type="text"
                          value={proj.technologies?.join(", ")}
                          onChange={(e) =>
                            handleProjectChange(
                              idx,
                              "technologies",
                              e.target.value
                                .split(",")
                                .map((t) => t.trim())
                                .filter(Boolean)
                            )
                          }
                          className={fieldClassName}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        简介
                      </label>
                      <textarea
                        value={proj.description}
                        onChange={(e) =>
                          handleProjectChange(
                            idx,
                            "description",
                            e.target.value
                          )
                        }
                        className={textareaClassName}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        详细描述
                      </label>
                      <div className="space-y-2">
                        {proj.details.map((detail, detailIdx) => (
                          <div
                            key={detailIdx}
                            className="flex gap-2 items-start"
                          >
                            <span className="text-gray-400 mt-2 text-xs">
                              ●
                            </span>
                            <textarea
                              value={detail}
                              onChange={(e) =>
                                handleProjectDetailChange(
                                  idx,
                                  detailIdx,
                                  e.target.value
                                )
                              }
                              className={`flex-1 ${compactTextareaClassName}`}
                            />
                            <button
                              onClick={() =>
                                removeProjectDetail(idx, detailIdx)
                              }
                              className={`${deleteButtonClassName} mt-1`}
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => addProjectDetail(idx)}
                        className={`${subtleButtonClassName} mt-1 px-0 py-0 text-xs`}
                      >
                        <Plus size={14} /> 添加描述项
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={addProject}
                  className="flex w-full items-center justify-center gap-2 rounded-[24px] border border-dashed border-primary/25 bg-primary/5 py-3 text-sm font-semibold text-primary transition-colors hover:border-primary/45 hover:bg-primary/10"
                >
                  <Plus size={16} /> 添加项目经历
                </button>
              </div>
            )}
          </div>
        );
      case "honors":
        return (
          <div key="honors" className={sectionCardClassName}>
            <div
              {...dragProps?.attributes}
              {...dragProps?.listeners}
              className={`${sectionHeaderClassName} cursor-grab active:cursor-grabbing transition-colors hover:bg-slate-50/80`}
              onClick={() => toggleSection("honors")}
            >
              <div className="flex items-center gap-2 flex-1">
                <GripVertical
                  size={18}
                  className="text-slate-300 outline-none"
                />
                <TitleInput
                  sectionKey="honors"
                  value={data.sectionTitles?.honors ?? "荣誉奖项"}
                  placeholder="荣誉奖项"
                />
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => toggleVisibility("honors", e)}
                  onPointerDown={(e) => e.stopPropagation()}
                  className={`rounded-2xl p-2 transition-colors ${
                    data.visible?.honors !== false
                      ? "text-primary hover:bg-primary/10"
                      : "text-slate-400 hover:bg-slate-100"
                  }`}
                  title={
                    data.visible?.honors !== false ? "点击隐藏" : "点击显示"
                  }
                >
                  {data.visible?.honors !== false ? (
                    <Eye size={18} />
                  ) : (
                    <EyeOff size={18} />
                  )}
                </button>
              </div>
            </div>
            {expandedSections.honors && (
              <div className={sectionBodyClassName}>
                {data.honors.map((honor, idx) => (
                  <div
                    key={honor.id}
                    className="flex items-start gap-2 rounded-[22px] border border-slate-200/80 bg-slate-50/75 p-2.5"
                  >
                    <input
                      type="text"
                      value={honor.date}
                      onChange={(e) =>
                        handleHonorChange(idx, "date", e.target.value)
                      }
                      className="w-28 rounded-2xl border border-slate-200/90 bg-white/90 px-3 py-2 text-sm text-slate-700 shadow-[0_1px_2px_rgba(15,23,42,0.04)] outline-none transition focus:border-primary/70 focus:ring-4 focus:ring-primary/10"
                      placeholder="时间"
                    />
                    <input
                      type="text"
                      value={honor.name}
                      onChange={(e) =>
                        handleHonorChange(idx, "name", e.target.value)
                      }
                      className="flex-1 rounded-2xl border border-slate-200/90 bg-white/90 px-3 py-2 text-sm text-slate-700 shadow-[0_1px_2px_rgba(15,23,42,0.04)] outline-none transition focus:border-primary/70 focus:ring-4 focus:ring-primary/10"
                      placeholder="奖项名称"
                    />
                    <button
                      onClick={() => removeHonor(idx)}
                      className={deleteButtonClassName}
                      title="删除此项"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                <button onClick={addHonor} className={subtleButtonClassName}>
                  <Plus size={16} /> 添加荣誉奖项
                </button>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const SortableSection = ({ id }: { id: string }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      zIndex: isDragging ? 1 : 0,
      position: "relative" as const,
    };

    return (
      <div ref={setNodeRef} style={style}>
        {renderSection(id, {
          attributes: attributes as unknown as Record<string, unknown>,
          listeners: listeners as unknown as Record<string, unknown>,
        })}
      </div>
    );
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[34px] border border-white/70 bg-white/72 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl">
      <div className="sticky top-0 z-10 border-b border-white/70 bg-white/78 px-6 pb-5 pt-6 backdrop-blur-xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/8 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-primary uppercase">
              Resume Studio
            </span>
            <div className="space-y-1">
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Dong's Resume
              </h1>
              <p className="max-w-xs text-sm leading-6 text-slate-500">
                更快整理经历，实时预览效果，全新的简历体验
              </p>
            </div>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-[linear-gradient(135deg,rgba(244,114,182,0.18),rgba(96,165,250,0.2))] text-sm font-bold text-slate-700 shadow-inner shadow-white/80">
            CV
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleExample}
            className={`${actionButtonClassName} border border-slate-200 bg-slate-100/85 text-slate-700 hover:bg-slate-200/80`}
          >
            <LayoutTemplate size={16} /> 示例
          </button>
          <button
            onClick={handleReset}
            className={`${actionButtonClassName} border border-rose-100 bg-rose-50 text-rose-600 hover:bg-rose-100`}
          >
            <Trash2 size={16} /> 清空
          </button>
          <button
            onClick={() => alert("保存成功")}
            className={`${actionButtonClassName} border border-primary/10 bg-primary/8 text-primary hover:bg-primary/12`}
          >
            <Save size={16} /> 保存
          </button>
          <button
            onClick={onExport}
            className={`${actionButtonClassName} bg-primary text-white shadow-[0_12px_24px_rgba(59,130,246,0.24)] hover:bg-primary-dark`}
          >
            <FileDown size={16} /> 导出
          </button>
        </div>
      </div>

      <div className="mx-6 mt-5 flex items-center gap-3 rounded-[24px] border border-primary/10 bg-gradient-to-r from-sky-50 via-white/95 to-pink-50 px-4 py-3 text-sm text-slate-600">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-primary shadow-[0_8px_20px_rgba(59,130,246,0.14)]">
          <Info size={18} />
        </div>
        <div>
          <div className="font-semibold text-slate-800">本地优先编辑</div>
          <div className="text-xs text-slate-500">
            所有数据仅存于当前浏览器，离线也能继续修改。
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto px-6 pb-6 pt-5">
        <div className={sectionCardClassName}>
          <div
            className={`${sectionHeaderClassName} cursor-pointer transition-colors hover:bg-slate-50/80`}
            onClick={() => toggleSection("basicInfo")}
          >
            <div className="flex items-center gap-2 text-lg font-bold">
              基本信息
            </div>
            <button
              onClick={(e) => toggleVisibility("basicInfo", e)}
              className={`rounded-2xl p-2 transition-colors ${
                data.visible?.basicInfo !== false
                  ? "text-primary hover:bg-primary/10"
                  : "text-slate-400 hover:bg-slate-100"
              }`}
              title={
                data.visible?.basicInfo !== false ? "点击隐藏" : "点击显示"
              }
            >
              {data.visible?.basicInfo !== false ? (
                <Eye size={18} />
              ) : (
                <EyeOff size={18} />
              )}
            </button>
          </div>

          {expandedSections.basicInfo && (
            <div className="grid grid-cols-2 gap-4 px-5 pb-5 pt-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  姓名
                </label>
                <input
                  type="text"
                  value={data.basicInfo.name}
                  onChange={(e) =>
                    handleBasicInfoChange("name", e.target.value)
                  }
                  className={fieldClassName}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  证件照 (可选)
                </label>
                <button className="flex w-full items-center justify-center rounded-2xl border border-dashed border-primary/25 bg-primary/5 px-3 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/10">
                  上传照片
                </button>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  邮箱
                </label>
                <input
                  type="email"
                  value={data.basicInfo.email}
                  onChange={(e) =>
                    handleBasicInfoChange("email", e.target.value)
                  }
                  className={fieldClassName}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  联系方式
                </label>
                <input
                  type="text"
                  value={data.basicInfo.phone}
                  onChange={(e) =>
                    handleBasicInfoChange("phone", e.target.value)
                  }
                  className={fieldClassName}
                />
              </div>

              {data.basicInfo.website !== undefined ? (
                <div className="col-span-2 relative group">
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    个人网站
                  </label>
                  <input
                    type="text"
                    value={data.basicInfo.website}
                    onChange={(e) =>
                      handleBasicInfoChange("website", e.target.value)
                    }
                    className={fieldClassName}
                  />
                  <button
                    onClick={() => {
                      const newBasicInfo = { ...data.basicInfo };
                      delete newBasicInfo.website;
                      setData((prev) => ({ ...prev, basicInfo: newBasicInfo }));
                    }}
                    className="absolute right-3 top-9 rounded-xl p-1 text-rose-500 opacity-0 transition-opacity hover:bg-rose-50 group-hover:opacity-100"
                    title="删除个人网站"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className="col-span-2">
                  <button
                    onClick={() => handleBasicInfoChange("website", "")}
                    className={subtleButtonClassName}
                  >
                    <Plus size={16} /> 添加个人网站
                  </button>
                </div>
              )}

              <div className="col-span-2 mt-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  教育经历
                </label>
                <div className="space-y-3">
                  {data.basicInfo.educations.map((edu, idx) => (
                    <div
                      key={edu.id}
                      className="relative flex items-start gap-2 rounded-[24px] border border-slate-200/80 bg-slate-50/80 p-3"
                    >
                      <button
                        onClick={() => removeEducation(idx)}
                        className="absolute -right-2 -top-2 rounded-full border border-slate-200 bg-white p-1 text-rose-500 shadow-[0_8px_20px_rgba(15,23,42,0.08)] transition-colors hover:bg-rose-50"
                        title="删除此项"
                      >
                        <X size={14} />
                      </button>
                      <div className="grid grid-cols-2 gap-2 flex-1">
                        <div className="col-span-2">
                          <input
                            type="text"
                            value={edu.university}
                            onChange={(e) =>
                              handleEducationChange(
                                idx,
                                "university",
                                e.target.value
                              )
                            }
                            className={compactFieldClassName}
                            placeholder="学校名称 (如: 电子科技大学 (985))"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            value={edu.major}
                            onChange={(e) =>
                              handleEducationChange(
                                idx,
                                "major",
                                e.target.value
                              )
                            }
                            className={compactFieldClassName}
                            placeholder="专业"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            value={edu.timePeriod}
                            onChange={(e) =>
                              handleEducationChange(
                                idx,
                                "timePeriod",
                                e.target.value
                              )
                            }
                            className={compactFieldClassName}
                            placeholder="起止时间 (如: 本科 2021-2025)"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={addEducation}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-[20px] bg-primary/8 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/12"
                >
                  <Plus size={14} /> 添加教育经历
                </button>
              </div>
            </div>
          )}
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={data.sectionOrder}
            strategy={verticalListSortingStrategy}
          >
            {data.sectionOrder.map((id) => (
              <SortableSection key={id} id={id} />
            ))}
          </SortableContext>
        </DndContext>

        <div className="mt-2 rounded-[28px] border border-white/80 bg-white/88 px-5 py-5 shadow-[0_20px_45px_rgba(15,23,42,0.08)] backdrop-blur-sm">
          <h3 className="mb-4 text-lg font-bold text-slate-800">主题配置</h3>
          <div className="flex flex-col gap-4 text-sm text-slate-600">
            <div className="flex flex-col gap-3">
              <span className="font-medium text-slate-700">简历风格</span>
              <div className="grid grid-cols-3 gap-3">
                {resumeStylePresets.map((preset) => {
                  const isActive = data.theme?.styleId === preset.id;

                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleStylePresetChange(preset.id)}
                      className={`rounded-[20px] border px-3 py-3 text-left transition ${
                        isActive
                          ? "border-primary/35 bg-primary/8 shadow-[0_12px_24px_rgba(59,130,246,0.08)]"
                          : "border-slate-200 bg-white hover:border-primary/20 hover:bg-slate-50"
                      }`}
                    >
                      <div className="mb-2 flex items-center gap-2">
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: preset.theme.primaryColor }}
                        />
                        <span className="text-sm font-semibold text-slate-800">
                          {preset.label}
                        </span>
                      </div>
                      <div className="text-xs leading-5 text-slate-500">
                        {preset.description}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="w-20">主题色调</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={data.theme?.primaryColor || "#3b82f6"}
                  onChange={(e) =>
                    handleThemeChange("primaryColor", e.target.value)
                  }
                  className="h-10 w-10 cursor-pointer rounded-xl border-0 bg-transparent p-0"
                />
                <span className="rounded-xl bg-slate-100 px-2 py-1 text-xs font-mono text-slate-600">
                  {data.theme?.primaryColor || "#3b82f6"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="w-20">高亮色</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={data.theme?.highlightColor || "#eff6ff"}
                  onChange={(e) =>
                    handleThemeChange("highlightColor", e.target.value)
                  }
                  className="h-10 w-10 cursor-pointer rounded-xl border-0 bg-transparent p-0"
                />
                <span className="rounded-xl bg-slate-100 px-2 py-1 text-xs font-mono text-slate-600">
                  {data.theme?.highlightColor || "#eff6ff"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="w-20">详情字号</span>
              <div className="flex items-center gap-2">
                <select
                  value={data.theme?.detailFontSize || "13px"}
                  onChange={(e) =>
                    handleThemeChange("detailFontSize", e.target.value)
                  }
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 outline-none transition focus:border-primary/70 focus:ring-4 focus:ring-primary/10"
                >
                  <option value="12px">12px (极小)</option>
                  <option value="13px">13px (标准)</option>
                  <option value="14px">14px (中等)</option>
                  <option value="15px">15px (偏大)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="w-20">详情字体色</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={data.theme?.detailColor || "#334155"}
                  onChange={(e) =>
                    handleThemeChange("detailColor", e.target.value)
                  }
                  className="h-10 w-10 cursor-pointer rounded-xl border-0 bg-transparent p-0"
                />
                <span className="rounded-xl bg-slate-100 px-2 py-1 text-xs font-mono text-slate-600">
                  {data.theme?.detailColor || "#334155"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
