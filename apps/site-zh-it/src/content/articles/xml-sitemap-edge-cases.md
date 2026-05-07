---
title: "Sitemap 生成的边界情况，比 XML 格式本身更容易出错"
description: "整理静态站生成 sitemap 时常见的路径、日期、分页和环境域名问题。"
tag: "SEO"
publishedAt: "2025-07-17"
readingTime: "5 min"
---

Sitemap 的 XML 格式并不难，真正容易出错的是边界情况。路径是否带尾斜杠、域名是否来自生产环境、日期是否稳定、分页是否完整，这些都会影响搜索引擎理解站点。

静态站如果路由生成很多，sitemap 最好从同一份路由数据生成，而不是手写。

## URL 要绝对且稳定

Sitemap 里的 URL 应该是绝对地址。不要把预览域名、localhost 或示例域名混进正式站点地图。

尾斜杠也要统一。如果站点实际 canonical 使用 `/articles/a/`，sitemap 里就不要写 `/articles/a`。两个地址都能访问，不代表应该都出现。

## 日期不要乱填

`lastmod` 应该表达内容最后修改时间。没有可靠更新时间时，宁愿不填，也不要每次构建都写当前时间。否则搜索引擎会以为全站每天都更新。

文章发布时间和更新时间是不同概念。如果只有 `publishedAt`，就用它或省略 lastmod。

## 大站要考虑拆分

页面数量很多时，sitemap 需要拆分，并提供 sitemap index。小站暂时不用复杂化，但生成逻辑最好不要写死只能支持一个文件。

Sitemap 是搜索引擎的导航文件。它不需要花哨，但必须准确、稳定、和页面 canonical 一致。
