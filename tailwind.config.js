/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#00ab6b",
        sub: "#0a8557",
        white_0_1: "rgba(255,255,255, .1)",
        black_0_1: "rgba(0,0,0, .1)",
        gray: "#f7f7f7",
        text_gray: "#656f79",
        info: "#0288d1",
        success: "#388e3c",
        warning: "#f57c00",
        error: "#d32f2f",
        dark_menu: "#191b26",
      },
    },
  },
  plugins: [],
};
