import baseConfig from "../../tailwind.config.base.mjs";

/** @type {import('tailwindcss').Config} */
export default {
  presets: [baseConfig],
  darkMode: "class",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"]
};
