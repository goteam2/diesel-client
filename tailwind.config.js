/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      secondary: "#4B4B4B",
      light: "#D9D9D9",
      basegray: "#4B4B4B",
      common: "#2FE436",
      uncommon: "#48B8DB",
      rare: "#DAC612",
      legendary: "#F02525",
    },

    extend: {
      colors: {
        transparent: "#00000000",
        current: "currentColor",
        black: colors.black,
        white: colors.white,
        gray: colors.gray,
        emerald: colors.emerald,
        indigo: colors.indigo,
        yellow: colors.yellow,
        red: colors.red,
        blue: colors.blue,
        green: colors.green,
        zinc: colors.zinc,
      },
      fontFamily: {
        sans: ["nimbus-sans", "sans-serif"],
      },
      screens: {
        ...defaultTheme.screens,
        "3xl": "1920px",
      },
    },
  },
  plugins: [],
};
