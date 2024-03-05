/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui"), require("tailwind-scrollbar")({ nocompatible: true })],
  darkTheme: "scaffoldEthDark",
  // DaisyUI theme colors
  daisyui: {
    themes: [
      {
        scaffoldEth: {
          primary: "#F00420",
          "primary-content": "#ffffff",
          secondary: "#ffffff",
          "secondary-content": "#212638",
          "secondary-text": "#4A5568",
          accent: "#93BBFB",
          "accent-content": "#212638",
          neutral: "#cbd5e0",
          "neutral-content": "#8f9ba8",
          "base-100": "#ffffff",
          "base-200": "#f4f8ff",
          "base-300": "#F1F4F9",
          "base-400": "#E2Ee33",
          "base-content": "#212638",
          "base-content-100": "#323A43",
          info: "#93BBFB",
          success: "#34EEB6",
          warning: "#F7EAE1",
          "range-error": "#ff0000",
          "warning-content": "#DD6B20",
          error: "#FF8863",

          "--btn-text-case": "none",

          "--rounded-btn": "0.75rem",

          ".tooltip": {
            "--tooltip-tail": "6px",
          },
        },
      },
      {
        scaffoldEthDark: {
          primary: "#212638",
          "primary-content": "#F9FBFF",
          secondary: "#1f2937",
          "secondary-content": "#F9FBFF",
          "secondary-text": "#4A5568",

          accent: "#4969A6",
          "accent-content": "#F9FBFF",
          neutral: "#F9FBFF",
          "neutral-content": "#385183",

          "base-100": "#1A1E23",
          "base-200": "#15171A",
          "base-300": "#212638",
          "base-400": "#E2E8F0",
          "base-content": "#F9FBFF",
          "base-content-100": "#fff",
          info: "#385183",
          success: "#34EEB6",
          warning: "#FFCF72",
          error: "#FF8863",

          "--btn-text-case": "none",

          "--rounded-btn": "0.75rem",

          ".tooltip": {
            "--tooltip-tail": "6px",
            "--tooltip-color": "hsl(var(--p))",
          },
        },
      },
    ],
  },
  theme: {
    extend: {
      colors: {
        lightGray: "#68778D",
        lightBlack: "#202327",
        "secondary-text": "#4A5568",
        customGray: "",
        customWhite: "#E2E8F0",
        customGrayBtn: "#323A43",
        OPlightgray: "#CBD5E0",
        OPblack: "#4d4f52",
        OPred: "#ff0000",
        OPwhite: "#ffffff",
        OPdarkgray: "#68778D",
        OPoffwhite: "#F1F4F9",
        OPlightgreen: "#DEEDDE",
        OPdarkgreen: "#5BA85A",
        OPlightblue: "#D7E6F9",
        OPblue: "#2173DF",
        OPgray: "#a2aab6",
        OPbluegray: "#7f97b0",
        OPextradarkgray: "#47556a",
        twitterBlue: "#1DA1F2",
        purple: "#9104FF",
      },

      boxShadow: {
        center: "0 0 12px -2px rgb(0 0 0 / 0.05)",
      },
      animation: {
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      screens: {
        xs: "480px",
        "b-md": "880px",
        "3xl": "1800px",
      },
    },
  },
};
