# 在线简历编辑器

一个基于 React + TypeScript + Vite 的单页简历编辑器，左侧编辑内容，右侧实时预览，支持模块排序、显隐控制、主题配置、本地持久化和打印导出，适合快速生成中文技术简历。

## 项目特点

- 左右分栏编辑体验，输入内容后即时在右侧预览
- 支持编辑基础信息、教育经历、技能、实习经历、项目经历、荣誉奖项
- 支持模块标题自定义、模块显隐切换、模块拖拽排序
- 支持实习经历和项目经历的复制、技术栈标签维护与多条明细描述
- 支持主题色、高亮色、详情字号、详情文字颜色配置
- 使用 localStorage 自动保存数据，刷新后保留上次编辑结果
- 支持打印导出，面向 A4 页面进行分页预览

## 技术栈

- React 19
- TypeScript 5
- Vite 8
- Tailwind CSS 4
- dnd-kit
- lucide-react
- react-to-print
- ESLint

## 适用场景

- 快速整理个人技术简历
- 针对校招、实习、社招进行内容微调
- 需要打印或导出 PDF 的本地简历编辑场景
- 希望在浏览器中完成简历排版预览的轻量工具场景

## 快速开始

推荐使用 pnpm。

```bash
pnpm install
pnpm dev
```

启动后访问终端中显示的本地地址即可。

## 可用脚本

```bash
pnpm dev
pnpm build
pnpm lint
pnpm preview
```

- `pnpm dev`：启动本地开发环境
- `pnpm build`：执行 TypeScript 构建检查并生成生产包
- `pnpm lint`：运行 ESLint
- `pnpm preview`：本地预览生产构建结果

## 功能说明

### 1. 内容编辑

左侧编辑面板提供以下数据维护能力：

- 基础信息：姓名、邮箱、电话、个人站点、教育经历
- 技能：按条目维护技能描述
- 实习经历：时间、公司、岗位、简介、项目细节、技术栈
- 项目经历：名称、简介、项目细节、技术栈
- 荣誉奖项：时间与奖项名称

### 2. 模块管理

- 支持折叠或展开编辑区域
- 支持隐藏指定模块，预览中同步移除
- 支持修改模块标题
- 支持通过拖拽调整技能、实习、项目、荣誉模块顺序

### 3. 主题配置

可配置以下展示样式：

- 主色
- 模块高亮背景色
- 正文字号
- 正文字体颜色

### 4. 数据管理

- 自动保存到浏览器 localStorage
- 支持一键载入示例数据
- 支持清空当前全部数据

### 5. 导出与分页

- 通过打印能力导出简历
- 预览区按 A4 高度进行分页计算
- 当内容超出一页时，可通过上下按钮切换预览页

## 页面结构

项目为单页应用，没有引入路由。页面主结构如下：

- `App.tsx`：负责整体布局、数据状态、本地存储同步、打印导出、分页控制
- `Sidebar.tsx`：负责左侧所有表单编辑、模块配置、拖拽排序
- `Preview.tsx`：负责右侧简历总预览与动态模块渲染
- `src/components/preview/*`：负责各个简历模块的最终展示

## 数据结构

核心数据统一存放在 `ResumeData` 中，主要包括：

```ts
interface ResumeData {
  basicInfo: {
    name: string
    email: string
    phone: string
    website?: string
    educations: Education[]
  }
  skills: Skill[]
  experiences: Experience[]
  projects: Project[]
  honors: Honor[]
  theme: ThemeConfig
  visible: SectionVisibility
  sectionTitles: SectionTitles
  sectionOrder: string[]
}
```

这使得编辑态和预览态共享同一份状态，便于统一维护和持久化。

## 目录结构

```text
resume/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── preview/
│   │   │   ├── BasicInfo.tsx
│   │   │   ├── Experiences.tsx
│   │   │   ├── Honors.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── SectionTitle.tsx
│   │   │   └── Skills.tsx
│   │   ├── Preview.tsx
│   │   └── Sidebar.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── types.ts
│   └── utils.ts
├── eslint.config.js
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## 实现思路概览

### 状态管理

项目没有引入额外状态库，而是直接在 `App.tsx` 中维护整份简历数据，并将 `data` 和 `setData` 透传给左侧编辑器与右侧预览组件。这种方式结构简单，适合当前单页、单数据源的应用形态。

### 本地持久化

初始化时会从 localStorage 中读取 `resume_data`，并与默认数据进行合并，保证新增字段也能获得合理默认值。之后通过 `useEffect` 在数据变化时自动写回本地。

### 预览渲染

右侧预览区根据 `sectionOrder` 动态渲染模块，根据 `visible` 控制显隐，根据 `theme` 通过 CSS 变量注入主题样式。

### 拖拽排序

模块排序使用 dnd-kit 实现，拖拽结果最终映射为 `sectionOrder` 数组的重排。

### 导出打印

导出能力基于 react-to-print，通过引用预览区域 DOM 完成打印或另存为 PDF。

## 当前默认内容

项目内置了一份偏前端方向的中文示例简历，便于开箱即看效果，也可作为填写模板直接修改。

## 后续可扩展方向

- 增加多模板切换能力
- 增加头像、社交链接、求职意向等字段
- 支持导入与导出 JSON 数据
- 支持 PDF 一键下载而非依赖浏览器打印
- 增加国际化和英文简历模板
- 将编辑器拆分为更细粒度的表单组件

## License

仅用于学习、演示与个人项目扩展。
