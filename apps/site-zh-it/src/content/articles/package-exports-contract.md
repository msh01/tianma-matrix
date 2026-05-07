---
title: "package exports 是共享包的契约，不只是打包配置"
description: "解释 monorepo 里 exports 字段如何保护内部目录，并降低跨包重构成本。"
tag: "TypeScript"
publishedAt: "2024-03-26"
readingTime: "6 min"
---

在 monorepo 里，共享包最怕被随便深层引用。今天应用从 `src/layouts/BaseLayout.astro` 引，明天另一个应用从 `src/utils/internal.ts` 引。时间久了，包内部目录就不敢动了。

`package.json` 的 `exports` 字段可以解决这个问题。它告诉下游：哪些入口是公开 API，其他文件不是契约。

## 公开入口要少而稳

共享 UI 包不需要导出所有组件。真正跨站复用的布局、卡片、工具组件可以导出；还在变化中的内部组件不要急着开放。

入口越多，维护承诺越多。每一个导出路径都可能被别人依赖，后面改名、移动、拆分都要考虑兼容。

## 深层引用会偷走重构自由

如果下游直接引用内部路径，包作者就失去了整理目录的自由。哪怕只是把 `src/components` 改成 `src/ui`，也可能让应用构建失败。

exports 的价值不是防人，而是保护边界。公开入口稳定，内部实现才能演进。

## 类型和运行时要一致

TypeScript 项目里还要确认类型解析和运行时解析一致。只在 tsconfig 里配路径别名，但 package exports 没有对应入口，开发时可能正常，构建或发布后却失败。

共享包的契约应该写在包自身，而不是靠每个消费者猜。

exports 看起来是配置，实际上是架构边界。它越清楚，monorepo 越不容易长成一团。
