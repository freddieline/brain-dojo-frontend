/** @type {import('tailwindcss').Config} */


const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,tsx}"
  ],
  darkMode: false, 
  theme: {
    extend: {},
  },
  plugins: [
    flowbite.plugin()
  ],
}

