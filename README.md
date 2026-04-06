# 在线简历编辑器

一个基于 React 19、TypeScript 5、Vite 8 与 Tailwind CSS 4 的单页中文简历编辑器。  
左侧负责结构化录入与配置，右侧负责实时预览、分页查看和打印导出，适合快速整理校招、实习、社招场景下的技术简历。

## 功能概览

- 左右分栏编辑，输入后立即在右侧看到排版结果
- 支持基础信息、教育经历、技能、实习经历、项目经历、荣誉奖项的完整维护
- 支持模块显隐、标题自定义、拖拽排序
- 支持主题风格切换与颜色、字号等样式配置
- 支持示例数据载入、全部数据清空、本地自动保存
- 支持 A4 分页预览、缩放查看、打印与另存为 PDF

## 当前能力

### 内容编辑

- 基础信息：姓名、电话、邮箱、个人站点
- 教育经历：时间、学校、专业
- 技能：多条技能描述
- 实习经历：时间、公司、岗位、简介、明细、技术栈
- 项目经历：名称、简介、明细、技术栈
- 荣誉奖项：时间、名称

### 模块管理

- 自定义模块标题
- 按模块显示/隐藏
- 拖拽调整技能、实习、项目、荣誉模块顺序
- 左侧编辑区分组折叠，便于长简历维护

### 主题与样式

- 内置 `modern`、`minimal`、`editorial` 三套预设风格
- 支持配置主色、高亮色、详情字号、详情文字颜色
- 预览组件通过 CSS 变量注入主题值，子模块统一消费

### 分页与导出

- 右侧预览区按 A4 尺寸进行分页展示
- 支持预览缩放与上下页切换
- 打印链路基于 `react-to-print`
- 打印与屏幕预览共用统一字体与 A4 尺寸基准
- 分页逻辑已考虑页顶/页底安全留白，减少页底文字被裁切的情况

## 技术栈

- React 19
- TypeScript 5
- Vite 8
- Tailwind CSS 4
- dnd-kit
- lucide-react
- react-to-print
- ESLint

## 运行环境

- Node.js 20.x
- pnpm 10

## 快速开始

推荐使用 pnpm：

```bash
pnpm install
pnpm dev
```

启动后访问终端输出的本地地址即可。

## 可用脚本

```bash
pnpm dev
pnpm build
pnpm lint
pnpm preview
```

- `pnpm dev`：启动 Vite 开发环境
- `pnpm build`：执行 TypeScript 构建检查并产出生产包
- `pnpm lint`：运行 ESLint
- `pnpm preview`：本地预览生产构建结果

## 项目结构

```text
resume/
├── public/
│   ├── favicon.svg
│   └── icons.svg
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
│   ├── constants/
│   │   └── layout.ts
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── resumeStylePresets.ts
│   ├── types.ts
│   └── utils.ts
├── README.md
├── eslint.config.js
├── index.html
├── package.json
├── pnpm-lock.yaml
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## 核心文件说明

- `src/main.tsx`：应用入口，负责挂载 React 根节点
- `src/App.tsx`：全局状态、分页计算、预览翻页、缩放、打印导出
- `src/components/Sidebar.tsx`：左侧编辑器、模块管理、排序交互
- `src/components/Preview.tsx`：右侧简历总预览与主题变量注入
- `src/components/preview/*`：各模块最终展示实现
- `src/constants/layout.ts`：统一字体、A4 尺寸等布局常量
- `src/resumeStylePresets.ts`：三套风格预设定义
- `src/types.ts`：数据结构与默认示例数据
- `src/utils.ts`：本地存储工具

## 数据模型

应用围绕 `ResumeData` 单一数据源展开，编辑态和预览态共享同一份状态。

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

这套结构使模块排序、显隐、主题配置和本地持久化都可以围绕同一份数据完成。

## 实现说明

### 1. 状态管理

项目没有引入额外状态库，而是在 `App.tsx` 中统一维护 `ResumeData`。  
左侧编辑器通过 `setData` 更新内容，右侧预览通过同一份数据立即重渲染。

### 2. 本地持久化

- 初始化时从 localStorage 读取 `resume_data`
- 与默认数据合并，兼容新增字段
- 数据变化后自动回写本地

这让页面刷新后仍能恢复上一次编辑结果。

### 3. 主题实现

- 风格预设定义在 `src/resumeStylePresets.ts`
- `Preview.tsx` 根据 `theme.styleId` 选择不同布局分支
- 颜色、字号等配置通过 CSS 变量注入，如：
  - `--color-primary`
  - `--color-highlight`
  - `--detail-font-size`
  - `--detail-color`

### 4. 分页预览实现

分页并不是简单地把预览整体截成固定高度，而是结合页面语义块做断点计算：

- `src/constants/layout.ts` 提供统一 A4 宽高
- `App.tsx` 中的分页逻辑会读取带有 `data-page-block` 的节点
- 标题使用 `data-page-block="heading"` 作为优先断点
- 详细条目使用 `data-page-block="item"` 作为更细粒度断点
- 页面容量会扣除页顶/页底安全留白
- 通过 `ResizeObserver` 与字体加载完成后的重算机制保持分页稳定

右侧屏幕预览与离屏打印容器共用同一套分页偏移结果，因此预览页数和打印页数能尽量保持一致。

### 5. 打印导出实现

- 导出能力由 `react-to-print` 提供
- 打印时使用离屏容器逐页渲染
- 每页设置 `breakAfter/pageBreakAfter`
- 屏幕预览和打印都使用同一套字体与 A4 尺寸常量，减少换行与分页漂移

## 当前默认内容

项目内置了一份偏前端方向的中文示例简历，可直接查看排版效果，也可作为个人模板修改。

## 适用场景

- 快速整理中文技术简历
- 针对校招、实习、社招进行内容微调
- 需要浏览器内实时排版预览的本地工具场景
- 需要打印或另存为 PDF 的轻量简历编辑场景

## 已知边界

- 打印导出目前仍依赖浏览器打印能力，不是独立 PDF 渲染引擎
- 分页已经优先避免页底裁切常见文本块，但极端超长的单个块仍可能被继续拆分
- 项目为单页应用，当前没有路由、账号体系和远端存储

## 后续可扩展方向

- 增加更多简历模板与布局方案
- 增加头像、社交链接、求职意向等字段
- 支持导入与导出 JSON 数据
- 增加一键导出 PDF 能力
- 增加英文简历与国际化支持
- 将编辑器进一步拆分为更细粒度的表单组件

## License

仅用于学习、演示与个人项目扩展。
