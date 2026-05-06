---
title: "TypeScript 工程化配置的最小闭环"
description: "整理 monorepo 项目里 TypeScript 根配置、包级配置、导出边界和严格模式的实用取舍。"
tag: "TypeScript"
publishedAt: "2026-05-04"
readingTime: "6 min"
---

TypeScript 配置最容易走偏。配置太少，项目大了以后全靠约定；配置太多，新人打开项目先被十几个 `tsconfig` 劝退。

我比较喜欢“最小闭环”的思路：不是把所有选项都配满，而是保证几个关键边界清楚。对一个 Astro + monorepo 项目来说，主要就是根配置、包级继承、导出边界和严格模式。

## 根配置只管共识

根目录的 `tsconfig.base.json` 应该放所有包都认同的规则，比如 `target`、`moduleResolution`、`strict`、`resolveJsonModule`。这些是工程共识，不应该每个包自己写一遍。

路径别名也可以放在根配置里，但要克制。别名太多会让依赖关系变得不透明。像 `@tianma/ui-components/*`、`@tianma/google-ads/*` 这种跨包引用还算清楚；如果给每个目录都起别名，后面重构会很痛。

## 包级配置只写差异

每个应用或共享包都可以有自己的 `tsconfig.json`，但它应该尽量短。比如 Astro 应用需要 `types: ["astro/client"]`，工具包需要输出声明文件，这些就是包级差异。

我不建议在包级配置里重新定义一套完全不同的编译规则。除非这个包真的有特殊运行环境，否则差异越多，排查越难。

## 严格模式越早开越好

很多人会说项目早期先别开 strict，快一点。我的经验正好相反：越早开，成本越低。

内容站项目看起来简单，但类型很快会变复杂：文章 frontmatter、SEO Props、广告配置、结构化数据、不同站点的布局参数。如果没有严格模式，字段拼错、日期格式不对、可选参数没处理，往往会在页面生成时才暴露。

类型检查不是为了追求完美，而是为了让低级错误早点出现在终端里。

## 共享包要有明确出口

在 monorepo 里，最怕共享包被随便深层引用。今天有人从 `src/components/Button.astro` 引，明天有人从 `src/internal/theme.ts` 引，过一阵你就不敢改目录了。

`package.json` 的 `exports` 很重要。它相当于告诉其他包：这些是公开 API，其他目录别碰。比如 UI 包只导出 `BaseLayout.astro` 和 `WeChatPromoCard.astro`，广告包只导出 `AdSense.astro` 和 `GoogleAnalytics.astro`。

这个边界会让重构轻松很多。内部怎么整理都行，只要公开出口稳定，下游站点就不会被牵着走。

TypeScript 工程化不是堆配置，而是把项目里容易含糊的地方写清楚。规则少一点没关系，只要每条规则都真正在保护项目。
