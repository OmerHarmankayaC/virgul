/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Space Grotesk", "system-ui", "sans-serif"],
        mono: ["Space Mono", "ui-monospace", "monospace"],
      },
      colors: {
        ink: "#0D0D0D",
        cream: "#F5F0E8",
        "accent-y": "#FFE234",
        "accent-b": "#1A1AFF",
      },
      boxShadow: {
        "brutal":    "4px 4px 0px 0px #0D0D0D",
        "brutal-sm": "3px 3px 0px 0px #0D0D0D",
        "brutal-lg": "6px 6px 0px 0px #0D0D0D",
        "brutal-y":  "4px 4px 0px 0px #FFE234",
      },
    },
  },
  plugins: [],
}
