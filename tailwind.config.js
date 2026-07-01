/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        koinxBlue: "#0052FE",
        koinxBlueLight: "#2F80FF",
        appDark: "#0B0D17",
        cardDark: "#151925",
      },
    },
  },
  plugins: [],
};