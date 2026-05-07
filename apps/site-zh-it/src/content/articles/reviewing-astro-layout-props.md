---
title: "评审 Astro Layout Props 时，先看它是不是站点级语义"
description: "结合多站点 Astro 项目，讨论 Layout 组件应该接收哪些 Props，哪些应该留在页面里。"
tag: "Architecture"
publishedAt: "2024-05-30"
readingTime: "6 min"
---

Astro Layout 很容易越写越大。最开始只是 `title` 和 `description`，后来加导航、广告、二维码、语言切换、主题色、统计脚本。最后每个页面都要传一堆 Props。

评审 Layout Props 时，我会先问一个问题：这个字段是不是站点级语义？如果只是某个页面的展示细节，就不应该塞进 Layout。

## SEO 字段适合放 Layout

`title`、`description`、`canonical`、`siteName` 这些属于页面基础元信息，由 Layout 统一处理很合理。这样每个页面不用重复写 meta 标签，也能保持结构一致。

但文章摘要、相关推荐、分类颜色，这些更像页面内容。它们应该留在页面或组件里。

## 导航配置要稳定

站点级导航可以放 Layout，但要注意变化频率。如果不同页面导航差异很大，强行塞成 Props 会让 Layout 变复杂。

共享 Layout 更适合稳定的信息架构。中文技术论坛、官方博客、英文内容站，结构不同就应该用不同 Layout，而不是一个超级 Layout 管所有站点。

## Props 数量是边界信号

如果 Layout 需要十几个 Props 才能正常渲染，通常说明职责过多。可以拆成更具体的布局，或者把某些区域交给 slot。

Layout 的价值是提供页面骨架，不是接管所有业务变化。骨架稳，页面才灵活。
