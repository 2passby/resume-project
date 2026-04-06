import React from "react";
import type { ResumeData } from "../types";
import { defaultResumeData } from "../types";
import { FileDown, Save, Trash2, LayoutTemplate } from "lucide-react";

interface SidebarProps {
  data: ResumeData;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
  onExport: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ data, setData, onExport }) => {
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

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
        <h1 className="text-3xl font-bold text-center text-primary mb-6">
          Dora's Resume
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
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-gray-800 font-bold text-lg border-b pb-2">
            <span className="text-xl">▾</span> 基本信息
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                姓名
              </label>
              <input
                type="text"
                value={data.basicInfo.name}
                onChange={(e) => handleBasicInfoChange("name", e.target.value)}
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
                onChange={(e) => handleBasicInfoChange("email", e.target.value)}
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
                onChange={(e) => handleBasicInfoChange("phone", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
              />
            </div>
            <div className="col-span-2">
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
            </div>

            {/* Educations */}
            {data.basicInfo.educations.map((edu, idx) => (
              <React.Fragment key={edu.id}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    教育背景
                  </label>
                  <input
                    type="text"
                    value={edu.university}
                    onChange={(e) =>
                      handleEducationChange(idx, "university", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    专业
                  </label>
                  <input
                    type="text"
                    value={edu.major}
                    onChange={(e) =>
                      handleEducationChange(idx, "major", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    起止时间
                  </label>
                  <input
                    type="text"
                    value={edu.timePeriod}
                    onChange={(e) =>
                      handleEducationChange(idx, "timePeriod", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Collapsible Sections Placeholders */}
        {[
          { title: "技术栈", key: "skills" },
          { title: "实习经历", key: "experiences" },
          { title: "项目经历", key: "projects" },
          { title: "荣誉奖项", key: "honors" },
        ].map((section) => (
          <div key={section.key} className="space-y-4">
            <div className="flex items-center justify-between text-gray-800 font-bold text-lg border-b pb-2 cursor-pointer hover:bg-gray-50">
              <div className="flex items-center gap-2">
                <span className="text-xl">▸</span> {section.title}
              </div>
              <span className="text-gray-400">👁</span>
            </div>
            {/* If we were to expand these, we would map over data[section.key] and render inputs similar to educations */}
          </div>
        ))}

        {/* Theme Config Placeholder */}
        <div className="pt-4 border-t border-gray-200 mt-8">
          <h3 className="font-bold text-gray-800 mb-4">主题配置</h3>
          <div className="flex gap-4 items-center text-sm text-gray-600">
            <span>主题色调</span>
            <div className="w-6 h-6 bg-primary rounded cursor-pointer ring-2 ring-offset-1 ring-primary"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
