/** @type {import('tailwindcss').Config} */
import flowbitePlugin from "flowbite/plugin";


export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,tsx}"
  ],
  darkMode: false, 
  theme: {
    extend: {
      colors: {
        highlight: '#FFD700',
        hoverSelect: '#4682B4',
        wrong: '#FF6347',
        correct: '#32CD32',
        defaultOutline: '#D1D5DB'
      },
    },
  },
  plugins: [flowbitePlugin],
}

