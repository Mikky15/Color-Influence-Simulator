/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#33A900", // Main primary color
          light: "#EEF9F4", // Lighter shade for hover effects
          dark: "#388E3C", // Darker shade for text or emphasis
        },
        secondary: {
          DEFAULT: "#FF5722", // Main secondary color
          light: "#FF8A65", // Lighter shade
          dark: "#D84315", // Darker shade
        },
      },
    },
  },
  plugins: [],
};