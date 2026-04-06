import React, { useState } from "react";
import type { ResumeData } from "../types";
import { defaultResumeData } from "../types";
import {
  FileDown,
  Save,
  Trash2,
  LayoutTemplate,
  Plus,
  X,
  Copy,
  Eye,
  EyeOff,
} from "lucide-react";

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

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
        <h1 className="text-3xl font-bold text-center text-primary mb-6">
          Dong's Resume
        </h1>
        <div className="flex justify-center gap-3">
          <button
            onClick={handleExample}
            className="flex items-center gap-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            <LayoutTemplate size={16} /> 示例
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors text-sm font-medium"
          >
            <Trash2 size={16} /> 清空
          </button>
          <button
            onClick={() => alert("保存成功")}
            className="flex items-center gap-1 px-4 py-2 bg-blue-50 text-primary rounded-md hover:bg-blue-100 transition-colors text-sm font-medium"
          >
            <Save size={16} /> 保存
          </button>
          <button
            onClick={onExport}
            className="flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors text-sm font-medium"
          >
            <FileDown size={16} /> 导出
          </button>
        </div>
      </div>

      <div className="p-4 bg-blue-50 text-blue-700 text-xs mx-6 mt-4 rounded border border-blue-100">
        ℹ️ 所有数据仅存于本地浏览器，支持离线编辑。
      </div>

      {/* Form Content */}
      <div className="p-6 overflow-y-auto flex-1 space-y-6">
        {/* Basic Info Section */}
        <div className="space-y-4 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <div
            className="flex items-center justify-between text-gray-800 font-bold text-lg border-b border-gray-100 p-4 cursor-pointer hover:bg-gray-50"
            onClick={() => toggleSection("basicInfo")}
          >
            <div className="flex items-center gap-2">基本信息</div>
            <button
              onClick={(e) => toggleVisibility("basicInfo", e)}
              className={`p-1.5 rounded-md transition-colors ${
                data.visible?.basicInfo !== false
                  ? "text-primary hover:bg-blue-50"
                  : "text-gray-400 hover:bg-gray-100"
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
            <div className="grid grid-cols-2 gap-4 p-4 pt-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  姓名
                </label>
                <input
                  type="text"
                  value={data.basicInfo.name}
                  onChange={(e) =>
                    handleBasicInfoChange("name", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  证件照 (可选)
                </label>
                <button className="w-full p-2 border border-dashed border-gray-300 rounded text-sm text-gray-500 hover:bg-gray-50">
                  ↑ Click to Upload
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  邮箱
                </label>
                <input
                  type="email"
                  value={data.basicInfo.email}
                  onChange={(e) =>
                    handleBasicInfoChange("email", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  联系方式
                </label>
                <input
                  type="text"
                  value={data.basicInfo.phone}
                  onChange={(e) =>
                    handleBasicInfoChange("phone", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                />
              </div>

              {data.basicInfo.website !== undefined ? (
                <div className="col-span-2 relative group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    个人网站
                  </label>
                  <input
                    type="text"
                    value={data.basicInfo.website}
                    onChange={(e) =>
                      handleBasicInfoChange("website", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                  />
                  <button
                    onClick={() => {
                      const newBasicInfo = { ...data.basicInfo };
                      delete newBasicInfo.website;
                      setData((prev) => ({ ...prev, basicInfo: newBasicInfo }));
                    }}
                    className="absolute right-2 top-8 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-50 rounded"
                    title="删除个人网站"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className="col-span-2">
                  <button
                    onClick={() => handleBasicInfoChange("website", "")}
                    className="flex items-center gap-1 text-sm text-primary hover:text-primary-dark"
                  >
                    <Plus size={16} /> 添加个人网站
                  </button>
                </div>
              )}

              {/* Educations */}
              <div className="col-span-2 mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  教育经历
                </label>
                <div className="space-y-3">
                  {data.basicInfo.educations.map((edu, idx) => (
                    <div
                      key={edu.id}
                      className="flex gap-2 items-start bg-gray-50 p-3 rounded-md relative border border-gray-200"
                    >
                      <button
                        onClick={() => removeEducation(idx)}
                        className="absolute -top-2 -right-2 p-1 bg-white text-red-500 hover:bg-red-50 rounded-full border border-gray-200 shadow-sm"
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
                            className="w-full p-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none"
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
                            className="w-full p-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none"
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
                            className="w-full p-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                            placeholder="起止时间 (如: 本科 2021-2025)"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={addEducation}
                  className="mt-3 flex items-center justify-center w-full gap-1 py-1.5 text-xs text-primary bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                >
                  <Plus size={14} /> 添加教育经历
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Collapsible Sections Placeholders */}
        <div className="space-y-4 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <div
            className="flex items-center justify-between text-gray-800 font-bold text-lg border-b border-gray-100 p-4 cursor-pointer hover:bg-gray-50"
            onClick={() => toggleSection("skills")}
          >
            <div className="flex items-center gap-2">相关技能</div>
            <button
              onClick={(e) => toggleVisibility("skills", e)}
              className={`p-1.5 rounded-md transition-colors ${
                data.visible?.skills !== false
                  ? "text-primary hover:bg-blue-50"
                  : "text-gray-400 hover:bg-gray-100"
              }`}
              title={data.visible?.skills !== false ? "点击隐藏" : "点击显示"}
            >
              {data.visible?.skills !== false ? (
                <Eye size={18} />
              ) : (
                <EyeOff size={18} />
              )}
            </button>
          </div>
          {expandedSections.skills && (
            <div className="space-y-3 p-4 pt-2">
              {data.skills.map((skill, idx) => (
                <div key={skill.id} className="flex gap-2 items-start">
                  <textarea
                    value={skill.content}
                    onChange={(e) => handleSkillChange(idx, e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none min-h-[60px] resize-none"
                    placeholder="请输入技能描述..."
                  />
                  <button
                    onClick={() => removeSkill(idx)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded"
                    title="删除此项"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              <button
                onClick={addSkill}
                className="flex items-center gap-1 text-sm text-primary hover:text-primary-dark"
              >
                <Plus size={16} /> 添加技能
              </button>
            </div>
          )}
        </div>

        <div className="space-y-4 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <div
            className="flex items-center justify-between text-gray-800 font-bold text-lg border-b border-gray-100 p-4 cursor-pointer hover:bg-gray-50"
            onClick={() => toggleSection("experiences")}
          >
            <div className="flex items-center gap-2">实习经历</div>
            <button
              onClick={(e) => toggleVisibility("experiences", e)}
              className={`p-1.5 rounded-md transition-colors ${
                data.visible?.experiences !== false
                  ? "text-primary hover:bg-blue-50"
                  : "text-gray-400 hover:bg-gray-100"
              }`}
              title={
                data.visible?.experiences !== false ? "点击隐藏" : "点击显示"
              }
            >
              {data.visible?.experiences !== false ? (
                <Eye size={18} />
              ) : (
                <EyeOff size={18} />
              )}
            </button>
          </div>
          {expandedSections.experiences && (
            <div className="space-y-6 p-4 pt-2">
              {data.experiences.map((exp, idx) => (
                <div
                  key={exp.id}
                  className="p-4 border border-gray-200 rounded-lg space-y-4 bg-gray-50 relative"
                >
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button
                      onClick={() => duplicateExperience(idx)}
                      className="p-1.5 text-blue-500 hover:bg-blue-100 rounded"
                      title="复制此经历"
                    >
                      <Copy size={16} />
                    </button>
                    <button
                      onClick={() => removeExperience(idx)}
                      className="p-1.5 text-red-500 hover:bg-red-100 rounded"
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
                          handleExperienceChange(idx, "company", e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
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
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
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
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
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
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
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
                      className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none min-h-[60px] resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      详细描述
                    </label>
                    <div className="space-y-2">
                      {exp.details.map((detail, detailIdx) => (
                        <div key={detailIdx} className="flex gap-2 items-start">
                          <span className="text-gray-400 mt-2 text-xs">●</span>
                          <textarea
                            value={detail}
                            onChange={(e) =>
                              handleExperienceDetailChange(
                                idx,
                                detailIdx,
                                e.target.value
                              )
                            }
                            className="flex-1 p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none min-h-[60px] resize-none"
                          />
                          <button
                            onClick={() =>
                              removeExperienceDetail(idx, detailIdx)
                            }
                            className="p-1.5 text-red-500 hover:bg-red-100 rounded mt-1"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => addExperienceDetail(idx)}
                      className="mt-2 flex items-center gap-1 text-xs text-primary hover:text-primary-dark"
                    >
                      <Plus size={14} /> 添加描述项
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={addExperience}
                className="w-full py-2 border-2 border-dashed border-gray-300 text-gray-500 rounded-lg hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-1 text-sm"
              >
                <Plus size={16} /> 添加实习经历
              </button>
            </div>
          )}
        </div>

        <div className="space-y-4 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <div
            className="flex items-center justify-between text-gray-800 font-bold text-lg border-b border-gray-100 p-4 cursor-pointer hover:bg-gray-50"
            onClick={() => toggleSection("projects")}
          >
            <div className="flex items-center gap-2">项目经历</div>
            <button
              onClick={(e) => toggleVisibility("projects", e)}
              className={`p-1.5 rounded-md transition-colors ${
                data.visible?.projects !== false
                  ? "text-primary hover:bg-blue-50"
                  : "text-gray-400 hover:bg-gray-100"
              }`}
              title={data.visible?.projects !== false ? "点击隐藏" : "点击显示"}
            >
              {data.visible?.projects !== false ? (
                <Eye size={18} />
              ) : (
                <EyeOff size={18} />
              )}
            </button>
          </div>
          {expandedSections.projects && (
            <div className="space-y-6 p-4 pt-2">
              {data.projects.map((proj, idx) => (
                <div
                  key={proj.id}
                  className="p-4 border border-gray-200 rounded-lg space-y-4 bg-gray-50 relative"
                >
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button
                      onClick={() => duplicateProject(idx)}
                      className="p-1.5 text-blue-500 hover:bg-blue-100 rounded"
                      title="复制此项目"
                    >
                      <Copy size={16} />
                    </button>
                    <button
                      onClick={() => removeProject(idx)}
                      className="p-1.5 text-red-500 hover:bg-red-100 rounded"
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
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
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
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
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
                        handleProjectChange(idx, "description", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none min-h-[60px] resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      详细描述
                    </label>
                    <div className="space-y-2">
                      {proj.details.map((detail, detailIdx) => (
                        <div key={detailIdx} className="flex gap-2 items-start">
                          <span className="text-gray-400 mt-2 text-xs">●</span>
                          <textarea
                            value={detail}
                            onChange={(e) =>
                              handleProjectDetailChange(
                                idx,
                                detailIdx,
                                e.target.value
                              )
                            }
                            className="flex-1 p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none min-h-[60px] resize-none"
                          />
                          <button
                            onClick={() => removeProjectDetail(idx, detailIdx)}
                            className="p-1.5 text-red-500 hover:bg-red-100 rounded mt-1"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => addProjectDetail(idx)}
                      className="mt-2 flex items-center gap-1 text-xs text-primary hover:text-primary-dark"
                    >
                      <Plus size={14} /> 添加描述项
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={addProject}
                className="w-full py-2 border-2 border-dashed border-gray-300 text-gray-500 rounded-lg hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-1 text-sm"
              >
                <Plus size={16} /> 添加项目经历
              </button>
            </div>
          )}
        </div>

        <div className="space-y-4 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <div
            className="flex items-center justify-between text-gray-800 font-bold text-lg border-b border-gray-100 p-4 cursor-pointer hover:bg-gray-50"
            onClick={() => toggleSection("honors")}
          >
            <div className="flex items-center gap-2">荣誉奖项</div>
            <button
              onClick={(e) => toggleVisibility("honors", e)}
              className={`p-1.5 rounded-md transition-colors ${
                data.visible?.honors !== false
                  ? "text-primary hover:bg-blue-50"
                  : "text-gray-400 hover:bg-gray-100"
              }`}
              title={data.visible?.honors !== false ? "点击隐藏" : "点击显示"}
            >
              {data.visible?.honors !== false ? (
                <Eye size={18} />
              ) : (
                <EyeOff size={18} />
              )}
            </button>
          </div>
          {expandedSections.honors && (
            <div className="space-y-3 p-4 pt-2">
              {data.honors.map((honor, idx) => (
                <div key={honor.id} className="flex gap-2 items-start">
                  <input
                    type="text"
                    value={honor.date}
                    onChange={(e) =>
                      handleHonorChange(idx, "date", e.target.value)
                    }
                    className="w-24 p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                    placeholder="时间"
                  />
                  <input
                    type="text"
                    value={honor.name}
                    onChange={(e) =>
                      handleHonorChange(idx, "name", e.target.value)
                    }
                    className="flex-1 p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                    placeholder="奖项名称"
                  />
                  <button
                    onClick={() => removeHonor(idx)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded"
                    title="删除此项"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              <button
                onClick={addHonor}
                className="flex items-center gap-1 text-sm text-primary hover:text-primary-dark"
              >
                <Plus size={16} /> 添加荣誉奖项
              </button>
            </div>
          )}
        </div>

        {/* Theme Config Placeholder */}
        <div className="pt-4 border-t border-gray-200 mt-8">
          <h3 className="font-bold text-gray-800 mb-4">主题配置</h3>
          <div className="flex flex-col gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-4">
              <span className="w-16">主题色调</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={data.theme?.primaryColor || "#0ea5e9"}
                  onChange={(e) =>
                    handleThemeChange("primaryColor", e.target.value)
                  }
                  className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                />
                <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
                  {data.theme?.primaryColor || "#0ea5e9"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="w-16">高亮色</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={data.theme?.highlightColor || "#f0f9ff"}
                  onChange={(e) =>
                    handleThemeChange("highlightColor", e.target.value)
                  }
                  className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                />
                <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
                  {data.theme?.highlightColor || "#f0f9ff"}
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
