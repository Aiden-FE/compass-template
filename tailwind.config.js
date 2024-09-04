/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    'index.html',
    './src/**/*.{html,js,ts,jsx,tsx,vue}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
