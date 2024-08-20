/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "0",
      sm: "560px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        blue: "#1da5fc",
        purple: "#5a4af4",
        pink: "#b66dff",
        orange: "#e24e00",
        green: "#07ce91",
        "orange-dark": "#e24e00",
        red: "#ff6161",
        "dark-blue": "#121829",
        "gray-dark": "#161313",
        gray: "#40444f",
        "gray-light": "#ffffff",
        greey: "#1d1c1c",
        "button-grey": "#2e2e2e",
        "background-grey": "#161313",
      },
    },
  },
  plugins: [],
};
