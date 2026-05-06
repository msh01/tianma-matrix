import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  output: "static",
  site: "https://ai.tianma.example",
  integrations: [tailwind()]
});
