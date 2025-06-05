/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scan all JS/TS/JSX/TSX files in src/
    "./public/index.html", // Optionally scan your HTML entry point
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
