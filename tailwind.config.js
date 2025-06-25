/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // scans all your frontend files
  ],
  theme: {
    extend: {
      fontFamily: {
        main: ['"Tanker"', "sans-serif"],
      },
      colors: {
        bg: "var(--bg)",
        text: "var(--text)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
      },
      animation: {
        pulseSlow: "pulse 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
