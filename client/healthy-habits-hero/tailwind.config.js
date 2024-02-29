/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: "#0067AA",
        customYellow: "#FCCC2D",
        customGray: "#898584",
        customOrange: "#FA8644",
        customGreen: "#4caf50",
        customRed: "#FF5757",
        custombblue: "#63C0E8",
        customWhite: "#FBFEFB",
        customGold: "#FBD469",
        customFontGray: "#353535",
      },
      fontFamily: {
        shantell: ["Shantell", "cursive"],
        play: ["Play", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
      },
    },
  },
  plugins: [],
};
