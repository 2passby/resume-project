export interface Education {
  id: string;
  university: string;
  major: string;
  timePeriod: string;
}

export interface Skill {
  id: string;
  content: string;
}

export interface Experience {
  id: string;
  timePeriod: string;
  company: string;
  role: string;
  description: string;
  details: string[];
  technologies: string[];
}

export interface Project {
  id: string;
  name: string;
  technologies: string[];
  description: string;
  details: string[];
}

export interface Honor {
  id: string;
  date: string;
  name: string;
}

export interface ResumeData {
  basicInfo: {
    name: string;
    email: string;
    phone: string;
    website: string;
    educations: Education[];
  };
  skills: Skill[];
  experiences: Experience[];
  projects: Project[];
  honors: Honor[];
}

export const defaultResumeData: ResumeData = {
  basicInfo: {
    name: "哆啦",
    email: "xxxxxxxxxxx@qq.com",
    phone: "xxxxxxxxxxx",
    website: "https://github.com/zbwer",
    educations: [
      {
        id: "1",
        university: "电子科技大学 (985)",
        major: "计算机科学与技术",
        timePeriod: "本科 2021-2025",
      },
    ],
  },
  skills: [
    {
      id: "1",
      content: "熟悉 HTML/CSS/JavaScript/TypeScript，熟悉 ES6+ 语法新特性。",
    },
    {
      id: "2",
      content:
        "熟悉 Vue3/React 框架与相关生态技术，对 Vue 源码与架构有一定了解。",
    },
    {
      id: "3",
      content:
        "熟练使用 Git 进行代码版本控制与多人协作开发，在 Github 上长期活跃。",
    },
    {
      id: "4",
      content:
        "了解 Vite/Webpack/Rollup 构建工具，具有 Monorepo 实践经验与 npm 发包经验。",
    },
    {
      id: "5",
      content: "了解 Nuxt/Next 等服务端渲染框架，具备基本的 SSR 项目开发能力。",
    },
  ],
  experiences: [
    {
      id: "1",
      timePeriod: "2024.04 - 2024.08",
      company: "腾讯 | PCG 社区产品部",
      role: "前端开发实习生",
      description: "简介：实习过程中主要负责 QQ 频道相关业务模块的开发。",
      details: [
        "完成频道 H5 活动榜单开发与相关性能优化，并封装通用排行榜组件。支持数据的懒加载与虚拟滚动，确保了页面在大量数据下的流畅性能，同时满足了快速迭代和多场景应用的需求。",
        "参与频道详情页项目迁移，成功将原本基于客户端渲染的 Vue3 和 Vuex 技术栈应用迁移至服务端渲染的 Nuxt 框架。显著提高了首屏加载速度，也便于合作方从直出页面中抓取详情数据，为日后频道的搜索推流奠定基础。",
        "参与 QQ 用户关怀平台开发，完成了产品回复页面的移动端适配，支持查看反馈数据趋势，并优化了流水线配置和 Git 工作流，显著提升了运营和开发团队的工作效率和质量控制。",
        "参与 NTQQ 频道模块的开发与维护，完成了快速游戏入口的实现，并解决了表情状态在 Linux 系统下的显示异常问题，积累了丰富的跨平台 (Linux/Mac/Windows) 开发调试经验。",
      ],
      technologies: ["React", "Vue3", "TypeScript", "Monorepo", "Electron"],
    },
  ],
  projects: [
    {
      id: "1",
      name: "NPM 依赖分析工具（字节跳动青训营大项目）",
      technologies: ["Rollup", "TypeScript", "Echarts", "Vitest"],
      description:
        "一款用于分析项目全量依赖关系并可视化展示的命令行工具，旨在帮助开发者更好地理解项目中的依赖关系，如依赖的版本冲突、依赖的安全性等信息。",
      details: [
        "借助 Vitest 进行全面的单元测试，测试覆盖率在 90% 以上。",
        "编写 Rollup 构建脚本，实现生产环境与开发环境的精准区分，并能打包出适应多种环境的代码。",
        "从零自主搭建项目，接入 Eslint + Prettier + husky 工作流程，并利用 precommit 钩子实现代码质量的自动检查。",
        "利用 Echarts 的关系图对生成的依赖数据进行可视化渲染，自定义 formatter 调整节点标签并重写图例切换逻辑。",
      ],
    },
  ],
  honors: [
    {
      id: "1",
      date: "2023.10",
      name: "国家奖学金 (Top 1%)",
    },
    {
      id: "2",
      date: "2022.11",
      name: "全国大学生算法设计竞赛一等奖",
    },
  ],
};
