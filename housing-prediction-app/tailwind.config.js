/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Scan all files in the app directory for Tailwind classes
    './pageAboutUs/**/*.{js,ts,jsx,tsx}',
    './pageForm/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}', // Scan all components for Tailwind classes
  ],
  theme: {
    extend: {
      // You can add custom theme extensions here if needed
    },
  },
  darkMode: 'class', // Enables class-based dark mode (you can switch using a class)
  plugins: [],
};