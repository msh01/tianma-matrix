import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import starlight from "@astrojs/starlight";

export default defineConfig({
  output: "static",
  site: "https://china.tianma.example",
  integrations: [
    starlight({
      title: "Tianma China Notes",
      description: "Plain-English notes on Chinese culture, travel basics, etiquette, food, and everyday life.",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/msh01/tianma-matrix"
        }
      ],
      sidebar: [
        {
          label: "Culture Basics",
          autogenerate: { directory: "culture" }
        },
        {
          label: "Travel Notes",
          autogenerate: { directory: "travel" }
        },
        {
          label: "Everyday China",
          autogenerate: { directory: "everyday" }
        }
      ],
      head: [
        {
          tag: "script",
          attrs: {
            async: true,
            src: "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          }
        },
        {
          tag: "script",
          content:
            "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-XXXXXXXXXX');"
        },
        {
          tag: "script",
          attrs: {
            async: true,
            src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0000000000000000",
            crossorigin: "anonymous"
          }
        }
      ]
    }),
    tailwind()
  ]
});
