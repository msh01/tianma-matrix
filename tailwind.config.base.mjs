/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f7f7f8",
          100: "#eceef0",
          700: "#333946",
          900: "#111827"
        },
        brand: {
          500: "#0f766e",
          600: "#0d665f"
        },
        accent: {
          500: "#d97706",
          600: "#b45309"
        }
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ]
      },
      boxShadow: {
        soft: "0 16px 50px rgba(17, 24, 39, 0.08)"
      }
    }
  },
  plugins: []
};
