# tianma-matrix

内容驱动的自动化站群矩阵，基于 Astro SSG、Turborepo、pnpm workspaces 和 Tailwind CSS。

## 站点规划

| 应用 | 定位 | 变现/引流策略 | 本地端口 |
| --- | --- | --- | --- |
| `apps/site-zh-ai` | 中文 AI 资讯、教程、工具与自动化工作流 | 微信公众号引流 | `4321` |
| `apps/site-zh-it` | 中文 IT、软件开发、工程实践博客 | 纯内容展示，无广告、无引流 | `4322` |
| `apps/site-zh-binggui` | 冰硅网络科技公司官网，面向软件外包与定制开发客户 | 项目咨询与企业获客 | `4325` |
| `apps/site-en-acg` | 英文动漫、ACG 相关内容站 | Google AdSense | `4323` |
| `apps/site-en-china` | 英文中国文化、常识、旅行与生活介绍 | Google AdSense | `4324` |

## 官方主题

| 应用 | Astro 官方主题 | 落地方式 |
| --- | --- | --- |
| `site-zh-ai` | Starlight | 使用 `@astrojs/starlight`，内容位于 `src/content/docs` |
| `site-zh-it` | Forum-style | 参考 linux.do 的技术社区信息架构，使用论坛式话题列表、分类侧栏和帖子详情页 |
| `site-zh-binggui` | Company website | 使用 Astro 单页官网，包含服务能力、交付流程、业务场景和联系入口 |
| `site-en-acg` | Blog | 使用官方 Blog 风格的极简共享布局，并保留 AdSense 占位 |
| `site-en-china` | Starlight | 使用 `@astrojs/starlight`，通过 `head` 注入 GA4 与 AdSense 脚本 |

## 目录结构

```text
tianma-matrix/
├── apps/
│   ├── site-zh-ai/
│   ├── site-zh-it/
│   ├── site-zh-binggui/
│   ├── site-en-acg/
│   └── site-en-china/
├── packages/
│   ├── ui-components/
│   ├── google-ads/
│   └── scraper-utils/
├── scripts/
│   └── build.mjs
├── pnpm-workspace.yaml
├── package.json
├── turbo.json
├── tailwind.config.base.mjs
└── tsconfig.base.json
```

## 共享包

### `@tianma/ui-components`

共享 Astro/Tailwind 组件与布局。

- `BaseLayout.astro`：通用页面布局，支持 SEO Props、canonical、Open Graph，并可通过 `enableAds` 为英文站注入广告与统计组件。
- `WeChatPromoCard.astro`：微信公众号引流卡片，用于中文 AI 站文章末尾。

### `@tianma/google-ads`

共享广告与统计组件。

- `AdSense.astro`：Google AdSense 脚本和广告位组件。
- `GoogleAnalytics.astro`：GA4 统计脚本组件。

默认使用占位 ID，正式上线前需要替换：

```astro
<BaseLayout
  enableAds={true}
  adsenseClientId="ca-pub-xxxxxxxxxxxxxxxx"
  adsenseSlot="xxxxxxxxxx"
  gaMeasurementId="G-XXXXXXXXXX"
>
```

### `@tianma/scraper-utils`

内容解析与结构化数据工具。

- `formatToSchemaFAQ(data)`：生成 Google FAQ JSON-LD 结构化数据。
- `sanitizeHtml(content)`：基础 HTML 清洗，移除脚本、样式、事件属性和 `javascript:` URL。

## 环境要求

- Node.js 20+，当前项目已在 Node.js 24 下验证。
- pnpm 9.x。

安装 pnpm：

```bash
npm install -g pnpm@9.15.4
```

安装依赖：

```bash
pnpm install
```

## 开发命令

在根目录运行：

```bash
pnpm dev:zh-ai
pnpm dev:zh-it
pnpm dev:zh-binggui
pnpm dev:en-acg
pnpm dev:en-china
```

访问地址：

```text
site-zh-ai      http://localhost:4321
site-zh-it      http://localhost:4322
site-zh-binggui http://localhost:4325
site-en-acg     http://localhost:4323
site-en-china   http://localhost:4324
```

也可以直接进入单个站点运行：

```bash
cd apps/site-zh-ai
pnpm dev
```

## 构建

推荐使用根目录构建命令：

```bash
pnpm build
```

该命令会顺序执行：

1. 编译 `packages/scraper-utils`
2. 构建 `site-zh-ai`
3. 构建 `site-zh-it`
4. 构建 `site-zh-binggui`
5. 构建 `site-en-acg`
6. 构建 `site-en-china`

构建产物位于各站点的 `dist/` 目录。

Turborepo 构建命令：

```bash
pnpm build:turbo
```

## Vercel 部署映射

Vercel 上每个站点对应一个独立 Project，但都连接同一个 GitHub 仓库 `msh01/tianma-matrix`，监听 `main` 分支。Project 的 `Root Directory` 保持仓库根目录 `.`，这样远端构建能读取 `pnpm-workspace.yaml`、`pnpm-lock.yaml`、共享 `packages/*` 和根配置文件。

具体站点映射通过 `Build Command` 与 `Output Directory` 完成。例如中文 IT 站：

```text
Build Command: pnpm --filter @tianma/site-zh-it build
Output Directory: apps/site-zh-it/dist
```

也就是说，Vercel 从仓库根目录安装依赖，只构建指定 workspace 包，然后发布该站点的 `dist` 目录。其他站点同理，把 filter 包名和输出目录替换为对应 `apps/site-*` 即可。

## Tailwind 共享配置

根目录的 `tailwind.config.base.mjs` 是共享基础配置。四个子站点的 `tailwind.config.mjs` 都通过 `presets` 继承它，并额外扫描共享组件包：

```js
import baseConfig from "../../tailwind.config.base.mjs";

export default {
  presets: [baseConfig],
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "../../packages/ui-components/src/**/*.{astro,html,js,jsx,ts,tsx}"
  ]
};
```

## 后续建议

- 为每个站点接入 Astro content collections，统一管理文章 schema。
- 为英文站添加真实 AdSense Client ID、广告 slot 和 GA4 Measurement ID。
- 为中文 AI 站替换真实公众号二维码。
- 增加内容生成管线，例如从 Markdown、Notion、飞书文档或爬虫结果自动生成文章。
- 增加 sitemap、RSS、robots.txt 和站点级 SEO 配置。

## License

本项目采用专有授权协议。未经版权持有人事先书面授权，不得将本项目或其衍生作品用于任何商业用途。

详见 [LICENSE](./LICENSE)。
