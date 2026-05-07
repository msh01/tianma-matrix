# site-zh-it

中文 IT 技术站，定位为一个干净、正式、论坛式的信息呈现站。

它属于 `tianma-matrix` 站群矩阵中的中文技术内容站，专注软件开发、前端架构、构建系统、TypeScript、内容工程、SEO 基础和工程流程实践。

## 站点定位

`site-zh-it` 不是个人博客，也不是营销落地页。

它更接近一个静态化的技术论坛：

- 左侧分类与标签导航
- 顶部站点导航
- 中央搜索入口
- 社区公告条
- 最新 / 排行榜 / 热门 / 类别 tab
- 话题列表
- 回复数、浏览量、活动时间
- 帖子详情页

本站不放广告，不做微信公众号引流，不加订阅弹窗，也不承接任何商业转化。

## 内容原则

文章在产品形态上被视为“话题”。

内容应该像有经验的工程师写给同行看的讨论或经验笔记，而不是泛泛的 AI 摘要。

写作要求：

- 使用自然中文
- 给出具体工程场景
- 讨论取舍、反例和失败情况
- 避免空泛总结
- 避免过度营销化标题
- 避免广告、引流和商业 CTA

## 目录结构

```text
apps/site-zh-it/
├── AGENTS.md
├── README.md
├── astro.config.mjs
├── package.json
├── tailwind.config.mjs
├── tsconfig.json
└── src/
    ├── content/
    │   ├── config.ts
    │   └── articles/
    ├── lib/
    │   └── views.ts
    ├── pages/
    │   ├── index.astro
    │   ├── search.astro
    │   ├── articles/
    │   │   └── [slug].astro
    │   └── categories/
    │       ├── index.astro
    │       └── [tag].astro
    └── styles/
        └── global.css
```

## 内容模型

文章存放在：

```text
src/content/articles/
```

每篇文章需要包含 frontmatter：

```yaml
---
title: "文章标题"
description: "文章摘要"
tag: "Frontend"
publishedAt: "2026-05-06"
readingTime: "8 min"
---
```

当前常用标签：

- `Frontend`
- `Build`
- `TypeScript`
- `Architecture`
- `Content`
- `SEO`
- `Process`

## 论坛模拟数据

静态站中使用确定性模拟数据增强论坛感：

- 浏览量：`500 ~ 1500`
- 回复数：由 slug 稳定生成
- 活动时间：由 slug 稳定生成
- 参与者头像：由固定池生成

相关逻辑位于：

```text
src/lib/views.ts
```

这些数据刷新页面不会随机变化。

## 开发

在仓库根目录运行：

```bash
pnpm dev:zh-it
```

访问：

```text
http://localhost:4322/
```

也可以进入当前目录运行：

```bash
pnpm dev
```

## 构建验证

推荐从仓库根目录运行：

```bash
npm run build
```

只验证本站：

```bash
cd apps/site-zh-it
node ../../node_modules/astro/astro.js build
```

## 维护约束

- 保持论坛式信息架构
- 不要改回个人博客式卡片流
- 不要添加广告或引流组件
- 不要添加微信二维码、订阅弹窗或商业 CTA
- 新文章应保持工程实践导向
- 新标签应保持宽泛、稳定、可长期复用

更多面向 agent 的维护规则见：

```text
AGENTS.md
```
