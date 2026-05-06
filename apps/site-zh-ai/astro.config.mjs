import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import starlight from "@astrojs/starlight";

export default defineConfig({
  output: "static",
  site: "https://ai.tianma.example",
  integrations: [
    starlight({
      title: "天马 AI 实验室",
      description: "AI 工具、自动化工作流和内容生产教程知识库。",
      defaultLocale: "root",
      locales: {
        root: {
          label: "简体中文",
          lang: "zh-CN"
        }
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/msh01/tianma-matrix"
        }
      ],
      sidebar: [
        {
          label: "AI 教程",
          autogenerate: { directory: "guides" }
        },
        {
          label: "工作流",
          autogenerate: { directory: "workflows" }
        }
      ]
    }),
    tailwind()
  ]
});
