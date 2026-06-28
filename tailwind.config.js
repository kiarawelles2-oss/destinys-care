/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#FFB6D9",
          main: "#FF69B4",
          dark: "#FF1493",
        },
        secondary: {
          light: "#F5F5F5",
          main: "#FFFFFF",
          dark: "#E0E0E0",
        },
        accent: {
          main: "#FFD700",
          light: "#FFED4E",
        },
      },
      fontFamily: {
        sans: ["'Poppins'", "sans-serif"],
      },
    },
  },
  plugins: [],
}
