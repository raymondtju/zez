/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1B1B1B",
      },
      fontFamily: {
        satoshi: ["Satoshi-Variable", "sans-serif"],
        chillax: ["Chillax-Variable", "sans-serif"],
      },
    },
  },
  plugins: [require("prettier-plugin-tailwindcss")],
};
