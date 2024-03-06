/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        pearl: {
          "50": "#faf8f2",
          "100": "#f4efe0",
          "200": "#ece3cb",
          "300": "#d9c598",
          "400": "#c9a86e",
          "500": "#be9351",
          "600": "#b07e46",
          "700": "#92653c",
          "800": "#765236",
          "900": "#60452e",
          "950": "#332217",
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["lemonade"],
  },
};
