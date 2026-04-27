/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand teal from claude-design-prompts.md — exposed as Tailwind utilities
        // so slides can use bg-brand, text-brand, border-brand consistently.
        brand: {
          DEFAULT: '#00a68f',
          dark: '#008374',
          light: '#33b8a5',
        },
      },
    },
  },
  plugins: [],
}
