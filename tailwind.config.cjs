/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        base: "1.25rem", // instead of Tailwind’s default 1rem (16px)
      },
    },
  },
  plugins: [],
}