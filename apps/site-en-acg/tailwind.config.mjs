import baseConfig from "../../tailwind.config.base.mjs";

/** @type {import('tailwindcss').Config} */
export default {
  presets: [baseConfig],
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "../../packages/ui-components/src/**/*.{astro,html,js,jsx,ts,tsx}",
    "../../packages/google-ads/src/**/*.{astro,html,js,jsx,ts,tsx}"
  ]
};
