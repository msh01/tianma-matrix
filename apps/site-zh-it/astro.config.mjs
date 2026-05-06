import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  output: "static",
  site: "https://it.tianma.example",
  integrations: [tailwind()]
});
