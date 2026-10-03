/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    fontSize: {
      sm: ["14px", "20px"],
      base: ["16px", "24px"],
      lg: ["20px", "28px"],
      xl: ["28px", "34px"],
      "2xl": ["40px", "44px"],
      "3xl": ["64px", "64px"],
    },
    extend: {
      colors: {
        fog: "#EEF1F4",
        surface: "#FFFFFF",
        ink: "#14213D",
        muted: "#55607A",
        line: "#D3D9E0",
        signal: "#F2C230",
        alert: "#B42318",
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "sans-serif"],
        body: ['"DM Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
