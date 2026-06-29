/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Noto Serif KR"', 'serif'],
        sans: ['"Noto Sans KR"', 'sans-serif'],
      },
      colors: {
        navy: '#1a2744',
        gold: '#C9A84C',
        warm: '#F8F6F1',
        border: '#E8E4DC',
      },
    },
  },
  plugins: [],
};
